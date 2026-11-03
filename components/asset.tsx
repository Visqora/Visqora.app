import Image from 'next/image'

// Hand-drawn icons sliced from public/assets*.png by scripts/slice-assets.py (160×160, transparent).
// scripts/check-assets.mjs fails if any of them isn't used somewhere on the site.
// Replaced by the real logos in set3: braces, layers, terminal, laptop-code, code-sparkle, docker, kubernetes, github, git-branch, figma.
// Left out on purpose (hardware/industry art, off-brand for a software company; PNGs still in public/assets):
// heart-pulse, stethoscope, smartwatch, iot-chip, wifi-chip, connected-car, drone, smart-factory, wind-turbine, solar-panel, shield-leaf, green-server, vr-headset, quantum-chip, circuit
export const ASSETS = [
  'cursor', 'cloud-upload', 'cloud-download', 'server', 'database', 'chip',
  'ai-chip', 'robot', 'brain', 'sparkles', 'lightning', 'gear', 'wrench', 'screwdriver', 'rocket', 'lightbulb',
  'browser-text', 'git-diamond', 'infinity', 'cube', 'cubes', 'cloud-network',
  'laptop-chart', 'bar-growth', 'pie-chart', 'line-chart', 'browser-layout', 'mobile-code', 'tablet-check', 'api-cloud', 'shield-check', 'lock',
  'developer', 'team', 'chat', 'headset', 'globe', 'wifi', 'antenna', 'monitor-pulse', 'docs-check', 'folder',
  'video', 'image', 'cloud-image', 'text-box', 'pen-tool', 'diamond', 'cards', 'toggle', 'ab-test',
  'sprout', 'cube-scan', 'data-lake', 'devices',
  // Second sheet (public/assets-2.png -> public/assets/set2). Its copies of icons already above, and its hardware row, are left out.
  'set2/badge-check', 'set2/bell', 'set2/box', 'set2/browser', 'set2/calendar', 'set2/cart', 'set2/chat-bubbles', 'set2/chat-dots',
  'set2/clipboard-check', 'set2/cloud-gear', 'set2/code-gear', 'set2/contact-card', 'set2/credit-card', 'set2/crm', 'set2/delivery-truck', 'set2/design-edit',
  'set2/document', 'set2/email', 'set2/erp', 'set2/excel', 'set2/fingerprint', 'set2/funnel', 'set2/git', 'set2/growth-chart',
  'set2/hierarchy', 'set2/kanban', 'set2/key', 'set2/map-pin', 'set2/megaphone', 'set2/microphone', 'set2/ml-chip', 'set2/mobile-apps',
  'set2/neural-net', 'set2/org-chart', 'set2/package', 'set2/palette', 'set2/pdf', 'set2/plug', 'set2/powerpoint', 'set2/puzzle',
  'set2/report', 'set2/search-analytics', 'set2/share-nodes', 'set2/shield-lock', 'set2/sliders', 'set2/soundwave', 'set2/speedometer', 'set2/stack',
  'set2/stack-sparkle', 'set2/storefront', 'set2/support-agent', 'set2/sync', 'set2/target', 'set2/translate', 'set2/ui', 'set2/user-shield',
  'set2/users', 'set2/ux', 'set2/video-camera', 'set2/website', 'set2/word',
  // Third sheet (public/assets-3.png -> public/assets/set3): the real tech logos, via lib/tech.ts.
  'set3/react', 'set3/nextjs', 'set3/typescript', 'set3/python', 'set3/fastapi', 'set3/postgresql', 'set3/docker', 'set3/kubernetes', 'set3/github', 'set3/git', 'set3/figma', 'set3/vscode', 'set3/solidity', 'set3/ml-chip',
] as const

export type AssetName = (typeof ASSETS)[number]

export function Asset({ name, className = 'h-12 w-12', alt = '' }: { name: AssetName; className?: string; alt?: string }) {
  return <Image src={`/assets/${name}.png`} alt={alt} width={160} height={160} draggable={false} className={`select-none object-contain ${className}`} />
}
