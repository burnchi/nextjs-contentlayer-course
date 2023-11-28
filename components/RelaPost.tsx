import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const RelaPost = ({ suitablePost, post }) => {

    const path = usePathname()
    // console.log(post.url);

    // console.log(path);


    return (
        <div className='flex flex-col gap-y-3'>
            <h1 className=' text-xl font-semibold'>相关文章</h1>
            <div className='flex flex-col'>
                {
                    suitablePost.length !== 0 ?
                    suitablePost.map((post, inx) => <Link href={post.url} key={inx}
                        className={decodeURI(path) === post.url ? ' text-orange-400' : null}
                    >
                        {post.title}
                    </Link>)
                    :
                    <div>暂无相关文章</div>
                }
            </div>
        </div>
    )
}

export default RelaPost