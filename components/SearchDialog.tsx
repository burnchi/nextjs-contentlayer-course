"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci"
import { allPosts } from '@/.contentlayer/generated'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import ThemeSwitchBtn from './ThemeSwitchBtn'

const SearchDialog = () => {
    const [inputValue, setinputValue] = useState("")
    const [open, setOpen] = useState(false)

    let posts = []
    if (inputValue.length !== 0 ) {
        
        posts = allPosts.filter(post => post.title.toUpperCase().includes(inputValue.toUpperCase()))
    }
    const handleChange = (e) => {
        setinputValue(e.target.value)
        // console.log(inputValue);
    }

    const handleClick = () => {
        setOpen(false) 
    }
    
    return (
        <div className=' absolute right-[8vw] top-1/2  -translate-y-1/2'>
            <Dialog  open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className='inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors ease duration-500  border shadow-sm hover:bg-accent/60 dark:hover:bg-accentDark  h-9 px-4 py-2 relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64 '
                    >
                        <span className='hidden lg:inline-flex'>搜索文章</span>
                        <span className='inline-flex lg:hidden'>搜索...</span>
                        <div className='pointer-events-none absolute right-1.5 top-1.5 hidden  select-none items-center gap-1 rounded border  px-1.5  text-[10px] font-semibold opacity-100 sm:flex'>
                            <span className="text-xs">⌘</span>
                            <span>k</span>
                        </div>
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <div className='flex h-full w-full flex-col overflow-hidden rounded-md text-popover-foreground'>
                        <div className='flex items-center border-b px-3'>
                            <CiSearch size={25} />
                            <Input placeholder="搜索文章名" type='text' className='text-base' id='searchPostInput'
                                value={inputValue} onChange={handleChange}
                            />
                        </div>
                        <ScrollArea className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">

                            {
                                posts.map(post => <div key={post._id}>
                                    <Link href={post.url} 
                                    onClick={handleClick}
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                                )
                            }
                        </ScrollArea>


                    </div>

                </DialogContent>
            </Dialog>

            <ThemeSwitchBtn></ThemeSwitchBtn>
        </div>
    )
}

export default SearchDialog