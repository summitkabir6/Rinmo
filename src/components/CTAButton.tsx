'use client'

import Link from 'next/link'
import { track } from '@/lib/analytics'

interface CTAButtonProps {
  href: string
  source: string
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
}

export default function CTAButton({ href, source, children, fullWidth, className }: CTAButtonProps) {
  function handleClick() {
    track('early_access_cta_click', { source })
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={[
        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
        'hover:opacity-90 hover:shadow-lg active:scale-[0.98]',
        fullWidth ? 'w-full' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        background: 'var(--accent)',
        color: '#000',
        boxShadow: '0 0 20px var(--accent-glow)',
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7h10M7 2l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
