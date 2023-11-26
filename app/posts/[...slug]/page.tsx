import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import type { MDXComponents } from 'mdx/types'
import Video from '@/components/Video'
import Pre from '@/components/Pre'

const mdxComponents: MDXComponents = {
  Video,
  pre: Pre
}



const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  // console.log(params.slug);
  const slugPath = params.slug.join('/')
  // console.log(slugPath);


  const post = allPosts.find((post) => post._raw.flattenedPath === decodeURI(slugPath))


  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className='w-full h-full border grid grid-cols-12 p-10'>
      {/* 目录 */}
      <div className='col-span-3 sticky top-10 max-h-[80vh] overflow-auto'>
        <ul className='text-base  js-toc' >
          {
            post.toc.length != 0 ?
              post.toc.map((heading: { slug: string; level: string; text: string }) => {
                return (
                  <li key={`#${heading.slug}`} className='flex pb-1 hover:text-orange-500'>
                    <a data-level={heading.level} className='
          data-[level=one]:pl-0  data-[level=one]:font-semibold
          data-[level=two]:pl-[5px]  data-[level=two]:font-medium
          data-[level=three]:pl-[10px]
          data-[level=four]:pl-[15px]
          data-[level=five]:pl-[20px]
           flex-1 inline-block cursor-pointer
          '
                      // 这里给a标签加的id值
                      id={`#${heading.slug}`}
                      
                    >
                      {heading.text}
                    </a>
                  </li>
                )
              })
              :
              <div className='font-semibold'>
                暂时没有标题
              </div>
          }
        </ul>
      </div>
      <article className="col-span-9 ">
        <div className="mb-8 ">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <div className='prose
      prose-a:bg-purple-200
      prose-blockquote:bg-purple-200 prose-blockquote:border-purple-700
      prose-blockquote:p-5 prose-blockquote:text-xl prose-blockquote:font-semibold
      prose-strong:text-xl
      '>

          <MDXContent components={mdxComponents} />
        </div>
      </article>
    </div>


  )
}

export default PostLayout