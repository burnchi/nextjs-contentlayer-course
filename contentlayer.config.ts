import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code';
import {visit} from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
    toc: {
      type: "json",
      resolve: async (doc) => {
        const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const codeExp = /```[\s\S]*?```/g;
        const slugger = new GithubSlugger();
        // console.log(doc.body.raw.replace(codeExp,''))
        const headings = Array.from(doc.body.raw.replace(codeExp, '').matchAll(regulrExp)).map(({ groups },index) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            id: index,
            level: flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : flag?.length == 3 ? 'three' : flag?.length == 4 ? "four" : "five",
            text: content,
            slug: content ? slugger.slug(content) : undefined
          }
        })

        return headings
      }
    },
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
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings,{behavior:"append"}],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;
              if (codeEl.tagName !== "code") return;
              node.raw = codeEl.children?.[0].value;
              // console.log(node.raw);
            }
          });
        },
        [rehypePrettyCode, options],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "div") {
              if (!("data-rehype-pretty-code-fragment" in node.properties)) {
                return;
              }
  
              for (const child of node.children) {
                if (child.tagName === "pre") {
                  child.properties["raw"] = node.raw;
                }
              }
            }
          });
        },
      
      
      ],
    }
  
  }
  
  )