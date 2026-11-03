"""Slice the icon sheets in public/ into individual transparent PNGs.

  public/assets.png   (10x8) -> public/assets/<name>.png
  public/assets-2.png (12x9) -> public/assets/set2/<name>.png
  public/assets-3.png (11/12 per row x7) -> public/assets/set3/<name>.png

Run: python scripts/slice-assets.py
Each blob of ink goes whole to the grid cell its centre falls in, so no icon (or its little sparkle strokes) is ever cut through.
"""
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

SHEETS = {
    'assets.png': ('', 8, 10, """
laptop-code cursor terminal braces layers cloud-upload cloud-download server database chip
ai-chip robot brain sparkles lightning gear wrench screwdriver rocket lightbulb
browser-text git-branch github git-diamond infinity cube cubes docker kubernetes cloud-network
laptop-chart bar-growth pie-chart line-chart browser-layout mobile-code tablet-check api-cloud shield-check lock
developer team chat headset globe wifi antenna monitor-pulse docs-check folder
video image cloud-image text-box pen-tool figma diamond cards toggle ab-test
shield-leaf sprout green-server vr-headset cube-scan quantum-chip circuit data-lake code-sparkle devices
iot-chip smartwatch heart-pulse stethoscope wifi-chip connected-car drone smart-factory wind-turbine solar-panel
"""),
    'assets-3.png': ('set3', 7, [11, 11, 12, 12, 12, 12, 12], """
laptop-code terminal browser cursor braces code-box layers cloud-upload cloud-download database server
ai-chip ml-chip robot chat brain neural-net bar-growth pie-chart search-analytics lightbulb target
crm erp team contact-card funnel calendar clipboard-check cart storefront package delivery-truck rocket
react nextjs typescript python fastapi postgresql docker kubernetes github git figma vscode
solidity api-browser cloud-gear infinity containers cube stack gear terminal-2 code-browser mobile-code devices
website globe image video document code-file data-lake shield-lock fingerprint key users hierarchy
iot-chip smartwatch cloud-network chip speedometer growth-chart sprout vr-headset stack-sparkle cube-scan cloud-circuit email
"""),
    'assets-2.png': ('set2', 9, 12, """
laptop-code browser cursor braces terminal layers cloud-upload cloud-download database server ai-chip sparkles
robot chat-dots brain neural-net bar-growth pie-chart search-analytics lightbulb target clipboard-check calendar bell
crm team funnel contact-card growth-chart erp cubes gear org-chart kanban report badge-check
website globe mobile-code mobile-apps stack box cart credit-card storefront delivery-truck package map-pin
ml-chip line-chart data-lake cloud-gear infinity docker kubernetes git sync code-gear rocket shield-check
support-agent chat-bubbles translate soundwave microphone video-camera image document pdf excel powerpoint word
devices browser-layout design-edit figma diamond ux ui ab-test sliders palette cards text-box
shield-lock fingerprint key user-shield users hierarchy api-cloud plug puzzle share-nodes email megaphone
iot-chip smartwatch cctv factory sprout eco-globe speedometer laptop-chart vr-headset stack-sparkle cube-scan cloud-network
"""),
}
SIZE, PAD = 160, 8
root = Path(__file__).resolve().parent.parent


def bands(profile, count, slack):
    """Split [0, len) into `count` bands, cutting at the least-inked line within ±slack of each even grid boundary
    (some neighbouring icons touch, so there isn't always a clean white gap)."""
    n = len(profile)
    cuts = [0]
    for k in range(1, count):
        guess = round(k * n / count)
        lo, hi = max(guess - slack, cuts[-1] + 1), min(guess + slack, n - 1)
        window = profile[lo:hi + 1]
        # Among the least-inked positions, cut in the middle of the widest such run: a narrow gap between
        # the bars of one icon (e.g. a soundwave) must lose to the real gutter between two icons.
        low = np.flatnonzero(window == window.min())
        runs = np.split(low, np.flatnonzero(np.diff(low) > 1) + 1)
        widest = max(runs, key=len)
        cuts.append(lo + int(widest[len(widest) // 2]))
    cuts.append(n)
    return [(a, b - 1) for a, b in zip(cuts, cuts[1:])]


def to_alpha(rgb):
    """White-to-alpha: keeps the exact look over white, transparent elsewhere."""
    a = (255 - rgb).max(axis=2) / 255
    safe = np.where(a > 0, a, 1)[..., None]
    color = (rgb - 255 * (1 - a[..., None])) / safe
    return np.dstack([np.clip(color, 0, 255), a * 255]).astype(np.uint8)


def slice_sheet(sheet, subdir, rows_n, cols_n, names):
    """cols_n: one number for a regular grid, or a list with the icon count of each row."""
    names = names.split()
    per_row = cols_n if isinstance(cols_n, list) else [cols_n] * rows_n
    first = np.cumsum([0] + per_row[:-1])  # index of each row's first icon
    assert len(per_row) == rows_n and len(names) == sum(per_row), f'{sheet}: {len(names)} names for {sum(per_row)} cells'
    src = np.asarray(Image.open(root / 'public' / sheet).convert('RGB')).astype(np.float32)
    ink = (255 - src.min(axis=2)) > 40  # anything noticeably darker than paper
    out = root / 'public/assets' / subdir
    out.mkdir(parents=True, exist_ok=True)
    labels, count = ndimage.label(ndimage.binary_dilation(ink, iterations=2))
    centres = ndimage.center_of_mass(ink, labels, range(1, count + 1))
    rows = bands(ink.sum(axis=1), rows_n, 40)
    slack = 60 if isinstance(cols_n, list) else 40  # ragged sheets are also unevenly spaced: search wider for the gutter
    cols = [bands(ink[y0:y1 + 1].sum(axis=0), per_row[r], slack) for r, (y0, y1) in enumerate(rows)]
    owner = np.full(count + 1, -1)
    for i, (cy, cx) in enumerate(centres, start=1):
        r = next(k for k, (a, b) in enumerate(rows) if a <= cy < b + 1)
        owner[i] = first[r] + next(k for k, (a, b) in enumerate(cols[r]) if a <= cx < b + 1)
    for idx, name in enumerate(names):
        mask = np.isin(labels, np.flatnonzero(owner == idx))
        ys, xs = np.flatnonzero(mask.any(axis=1)), np.flatnonzero(mask.any(axis=0))
        top, bottom, left, right = ys[0], ys[-1], xs[0], xs[-1]
        crop = src[top:bottom + 1, left:right + 1].copy()
        crop[~mask[top:bottom + 1, left:right + 1]] = 255  # neighbours' ink inside this box becomes paper
        tile = Image.fromarray(to_alpha(crop), 'RGBA')
        tile.thumbnail((SIZE - 2 * PAD, SIZE - 2 * PAD), Image.LANCZOS)
        canvas = Image.new('RGBA', (SIZE, SIZE))
        canvas.paste(tile, ((SIZE - tile.width) // 2, (SIZE - tile.height) // 2))
        canvas.save(out / f'{name}.png', optimize=True)
    print(f'{sheet}: wrote {len(names)} icons to {out}')


for sheet, args in SHEETS.items():
    slice_sheet(sheet, *args)
