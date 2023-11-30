import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'

export default function Home({searchParams}) {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
      
      <PostCard posts={posts}  params={searchParams}></PostCard>
      <Pagination posts={posts}></Pagination>
    </div>
  )
}