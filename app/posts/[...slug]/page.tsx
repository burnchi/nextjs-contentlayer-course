import { allPosts } from 'contentlayer/generated'
import RelaPost from '@/components/RelaPost'
import TocLayout from '@/components/TocLayout'
import RenderMdx from '@/components/RenderMdx'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }))
}

export async function generateMetadata({ params }) {
  const decodeSlug = decodeURI(params.slug.join("/"))
  const blog = allPosts.find(blog => blog._raw.flattenedPath === decodeSlug)
  if (!blog) {
    return;
  }
  return {
    title: blog.title,
  }
}

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slugPath = params.slug.join('/')
  const post = allPosts.find((post) => post._raw.flattenedPath === decodeURI(slugPath))
  const suitablePost = allPosts.filter((post) => post._raw.sourceFileDir === decodeURI(params.slug[0]))

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <div className='w-full h-full  grid grid-cols-12 p-10 gap-x-8'>
      {/* 目录 */}
      <div className='col-span-3 sticky top-[10vh] max-h-[80vh] overflow-auto'>
        <TocLayout post={post}></TocLayout>
      </div>
      {/* 文章主体 */}
      <article className="col-span-7  min-h-[100vh]">
        <RenderMdx post={post}></RenderMdx>
      </article>
      {/* 相关文章栏 */}
      <div className='col-span-2 sticky top-[10vh] max-h-[80vh] overflow-auto'>
        <RelaPost suitablePost={suitablePost} post={post}></RelaPost>
      </div>
    </div>
  )
}

export default PostLayout