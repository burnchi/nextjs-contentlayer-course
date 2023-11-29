import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import Navbar from '@/components/Navbar'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const myFont = localFont({
  src: '../public/font/NotoSansSC-Regular.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
