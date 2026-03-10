'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
        Something went wrong
      </h2>
      <p className="text-sm mb-6 text-center max-w-md" style={{ color: 'var(--text-muted)' }}>
        We encountered an unexpected error. Try refreshing the page.
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: 'var(--accent)', color: '#000' }}
      >
        Try again
      </button>
    </div>
  )
}
