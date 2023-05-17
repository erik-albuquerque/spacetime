import '../styles/globals.css'

import { ReactNode } from 'react'
import { roboto, baiJamjuree } from '@/fonts'

export const metadata = {
  title: 'Create Next App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
