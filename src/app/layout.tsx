import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Home from './(pages)/home/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniAgenda',
  description: 'Created by Gabriel Paulo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Home>
          {children}
        </Home>
      </body>
    </html>
  )
}
