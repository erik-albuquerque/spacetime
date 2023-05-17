import '@/common/styles/globals.css'

import { ReactNode } from 'react'
import { roboto, baiJamjuree } from '@/common/fonts'
import { cn } from '@/common/utils'

export const metadata = {
  title: 'Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans',
          'bg-gray-900 text-gray-100',
          roboto.variable,
          baiJamjuree.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
