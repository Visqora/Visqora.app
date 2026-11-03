'use client'

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0b1437', color: '#fff', fontFamily: 'sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
          <div>
            <title>Something went wrong — Visqora Technologies</title>
            <h1>Something went wrong.</h1>
            <p>Please try loading Visqora again.</p>
            <button onClick={retry} style={{ minHeight: 44, border: 0, borderRadius: 999, padding: '12px 20px', fontWeight: 700 }}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  )
}