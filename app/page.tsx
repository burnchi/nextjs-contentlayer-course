import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function Home({ searchParams }) {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8  min-h-[100vh] flex flex-col">

      <PostCard posts={posts} params={searchParams}></PostCard>
      <Suspense>
        <Pagination posts={posts}></Pagination>
      </Suspense>
    </div>
  )
}