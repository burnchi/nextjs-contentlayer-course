"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({posts}) => {
    const path = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const { replace } = useRouter()
    const postPerPage = 2
    const pageCount = Math.ceil(posts.length / postPerPage)
    const pageButtons = Array.from({ length: pageCount }, (_, index) => index );

    const handleClick = (item) => {
        params.set('page',String(item+1))
        replace(`${path}?${params}`)
    }
  return (
    <div className=' flex justify-center gap-x-2'>
        {
            pageButtons.map( item => <button key={item}
            className='p-2 bg-orange-400 hover:bg-orange-500'
            onClick={() => handleClick(item)}
            >
                {item + 1}
            </button>)
        }
        
    </div>
  )
}

export default Pagination