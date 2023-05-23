import '@/common/styles/globals.css'

import { ReactNode } from 'react'

import { roboto, baiJamjuree } from '@/common/fonts'
import { cn } from '@/common/utils'

import { SideContentLeft } from '@/components'

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
        <main className="grid min-h-screen grid-cols-2">
          <SideContentLeft />

          {/* Section right */}
          <section className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
