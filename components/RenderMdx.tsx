"use client"
import React from 'react'
import { format, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import type { MDXComponents } from 'mdx/types'
import Video from '@/components/Video'
import Pre from '@/components/Pre'
import Image from 'next/image'

const mdxComponents: MDXComponents = {
    Video,
    pre: Pre,
    Image
  }
  
const RenderMdx = ({post}) => {

    const MDXContent = useMDXComponent(post.body.code)
    return (
        <>
            <div className="mb-8 ">
                <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <div className='prose  max-w-full  text-foreground/90
      prose-a:bg-purple-200
      prose-blockquote:bg-purple-200 prose-blockquote:border-purple-700
      prose-blockquote:p-5 prose-blockquote:text-xl prose-blockquote:font-semibold
      prose-strong:text-xl
      prose-headings:text-foreground
      prose-li:marker:text-primary-600
      prose-strong:text-foreground
      '
                id="blogdiv"
            >
                <MDXContent components={mdxComponents} />
            </div>
        </>
    )
}

export default RenderMdx