import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const navItems = [
        {
            title:'首页',
            link:'/'
        },
        {
            title:'随笔',
            link:'/notes'
        },
        {
            title:'相册',
            link:'/photos'
        },
        {
            title:'关于',
            link:'/about'
        },
    ]
  return (
    <div className='w-full flex  justify-center  h-[8vh] sticky top-0 bg-white '>
        {
            navItems.map( item => <Link href={item.link} key={item.title}
            className='group hover:bg-orange-400 p-3  flex items-center justify-center
             transition-all ease duration-500 relative
            '
            >
                <span>{item.title}</span>
                <span className='w-full absolute h-[5px] bottom-0 group-hover:bg-orange-500
                transition-all ease duration-500
                '></span>
            </Link>
            )
        }
    </div>
  )
}

export default Navbar