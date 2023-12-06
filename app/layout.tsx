import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import HomeHeader from '@/components/HomeHeader'
import Footer from '@/components/Footer'
import {Providers} from "./providers";
import { twMerge } from 'tailwind-merge'

export const metadata: Metadata = {
  title: 'Nextjs博客',
  description: '欢迎大家',
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
    <html lang="en" className='dark' suppressHydrationWarning>
      <body className={twMerge(myFont.className,'text-foreground bg-background')} >
      <Providers>

        <HomeHeader></HomeHeader>
        {children}
        <Footer></Footer>
      </Providers>
      </body>
    </html>
  )
}
