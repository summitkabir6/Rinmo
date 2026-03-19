'use client'

import { useState } from 'react'

type FAQItem = {
  q: string
  a: string
}

export default function FAQDropdown({ items }: { items: FAQItem[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="max-w-2xl space-y-0 border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {items.map((item, i) => {
        const isExpanded = expandedIndex === i
        return (
          <div
            key={item.q}
            style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border)' : undefined }}
          >
            <button
              type="button"
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 hover:bg-[var(--pain-card-hover)] transition-colors border-0 bg-transparent cursor-pointer"
            >
              <span className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                {item.q}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="flex-shrink-0 transition-transform duration-200"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'var(--text-dim)',
                }}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.25s ease',
              }}
            >
              <div className="overflow-hidden">
                <p
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
