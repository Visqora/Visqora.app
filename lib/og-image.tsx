import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #0b1437 0%, #101d4e 55%, #16306e 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 20, height: 20, borderRadius: 9999, background: '#13b8e0' }} />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>VISQORA TECHNOLOGIES</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', color: '#13b8e0' }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 36 ? 60 : 76, fontWeight: 800, lineHeight: 1.1, maxWidth: 1020 }}>
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: 'rgba(255,255,255,.6)' }}>
          <div>visqora.app</div>
          <div>Vision at the core.</div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
