'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 24, fontFamily: 'system-ui, sans-serif', background: '#0C0C12', color: '#EEEEF5' }}>
        <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 12 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 14, color: '#7A7A96', marginBottom: 24 }}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: '#00C2FF',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
