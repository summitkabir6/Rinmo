'use client'

import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'

export default function HeroLogo() {
  const { theme } = useTheme()

  return (
    <Image
      src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
      alt="Rinmo"
      width={56}
      height={56}
      className="mb-3 rounded-lg"
    />
  )
}
