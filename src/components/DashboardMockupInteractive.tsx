'use client'

import { useState, useEffect } from 'react'
import DashboardMockup from './DashboardMockup'

export default function DashboardMockupInteractive() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpanded])

  useEffect(() => {
    if (!isExpanded) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [isExpanded])

  function handleBackdropClick() {
    setIsExpanded(false)
  }

  function handleMockupClick(e: React.MouseEvent) {
    e.stopPropagation()
  }

  return (
    <>
      {/* Default mode: preview with hover effect and Interact button */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)'
              : '0 0 60px rgba(0,0,0,0.3), 0 24px 48px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          <DashboardMockup />
        </div>

        {/* Interact button overlay — only visible when cursor is hovering */}
        {!isExpanded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              pointerEvents: isHovered ? 'auto' : 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(true)
              }}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              Interact
            </button>
          </div>
        )}
      </div>

      {/* Expanded mode: darkened backdrop + enlarged mockup */}
      {isExpanded && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer',
            }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 flex items-center justify-center p-6"
            style={{ pointerEvents: 'none', zIndex: 51 }}
          >
            <div
              className="max-h-[90vh] overflow-hidden rounded-2xl flex items-center justify-center p-4"
              style={{
                maxWidth: 'min(1280px, 95vw)',
                width: 'min(1280px, 95vw)',
                aspectRatio: '16 / 10',
                pointerEvents: 'auto',
                cursor: 'default',
                filter: 'brightness(0.85) contrast(1.05)',
              }}
              onClick={handleMockupClick}
            >
              <div
                className="flex items-center justify-center w-full h-full"
                style={{
                  transform: 'scale(0.92)',
                  transformOrigin: 'center center',
                }}
              >
                <div style={{ width: 900, maxWidth: '100%' }}>
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
