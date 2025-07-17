import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Food Voucher App',
  description: 'Created by Vica & Lufu',
  generator: 'v1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
