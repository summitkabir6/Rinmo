'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-1)' }}>
      <div className="max-w-site mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Image
            src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
            alt="Rinmo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>rinmo.ai</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
          {[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Security', href: '/security' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-xs transition-colors hover:opacity-100" style={{ color: 'var(--text-muted)' }}>
              {l.label}
            </Link>
          ))}
          <a href="mailto:hello@rinmo.ai" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>
            hello@rinmo.ai
          </a>
        </nav>

        <p className="text-xs text-center md:text-right" style={{ color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Rinmo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
