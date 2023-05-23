import '@/common/styles/globals.css'
import { ReactNode } from 'react'
import { roboto, baiJamjuree } from '@/common/fonts'
import { cn } from '@/common/utils'

import { useAuth } from '@/hooks'

import {
  Profile,
  EmptyProfile,
  Logo,
  Copyright,
  NewMemoryButton,
} from '@/components'

export const metadata = {
  title: 'Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

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
          {/* Section left */}
          <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* Section blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Section Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {/* Section Profile - Sign in */}
            {isAuthenticated ? <Profile /> : <EmptyProfile />}

            {/* Section Hero */}
            <div className="space-y-5">
              {/* Section Logo */}
              <Logo />

              {/* Section Content */}
              <div className="max-w-[420px] space-y-4">
                <h1 className="text-5xl font-bold leading-tight text-gray-50">
                  Sua cápsula do tempo
                </h1>

                <p className="text-lg leading-relaxed">
                  Colecione momentos marcantes da sua jornada e compartilhe (se
                  quiser) com o mundo!
                </p>
              </div>

              <NewMemoryButton />
            </div>

            <Copyright />
          </section>

          {/* Section right */}
          <section className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
