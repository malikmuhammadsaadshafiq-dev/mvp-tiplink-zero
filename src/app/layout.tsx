import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TipLink Zero - Zero-Fee Crypto Tipping',
  description: 'Zero-fee crypto tipping platform for creators with instant USDC settlement and on-chain reputation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}