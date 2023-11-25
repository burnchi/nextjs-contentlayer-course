import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    describe: { type: 'string',  },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))


const options = {
  theme: 'github-dark',
  defaultLang: {
    block: 'bash',
    inline: 'plaintext',
  },
}

export default makeSource(
  { 
    contentDirPath: 'posts', 
    documentTypes: [Post],
    mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, options]],
    }
  
  }
  
  )