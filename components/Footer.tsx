import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'


const TimeCounter = dynamic(() => import('./TimeCounter'), { ssr: false })

const Footer = () => {
    return (
        <footer className='w-full flex justify-between p-5  h-[8vh]   shadow-box'>
            <div>
                @2023 Chris
            </div>
            <div>
                <Link href="sitemap-0.xml">sitemap</Link>
            </div>
            <TimeCounter></TimeCounter>
        </footer>
    )
}

export default Footer