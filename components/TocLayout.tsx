"use client"
import React, { useEffect } from 'react'

const Toclayout = ({ post }) => {
    const scrollTOtop = (heading: string) => {
        console.log(heading);
        const headingTag = document.getElementById(heading)
        window.scrollTo({
            behavior: 'smooth',
            top: headingTag.offsetTop
        })
        return
    }


    useEffect(() => {
        // 目录链接自动高亮
        if (post.toc.length != 0) {
            const TableOfContents = {
                container: document.querySelector('.js-toc'),
                links: null,
                headings: null,
                intersectionOptions: {
                    rootMargin: '0px',
                    threshold: 1
                },
                previousSection: null,
                observer: null,

                init() {
                    this.handleObserver = this.handleObserver.bind(this)
                    this.setUpObserver()
                    this.findLinksAndHeadings()
                    this.observeSections()

                },

                observeSections() {
                    this.headings.forEach(heading => {
                        this.observer.observe(heading)
                    })
                },

                findLinksAndHeadings() {
                    this.links = [...this.container.querySelectorAll('a')]
                    this.headings = [...document.querySelectorAll('#blogdiv h1, #blogdiv h2, #blogdiv h3,#blogdiv h4,#blogdiv h5') as NodeListOf<HTMLElement>];
                    // console.log(this.links);
                    // console.log(this.headings);
                },
                setUpObserver() {
                    this.observer = new IntersectionObserver(
                        this.handleObserver,
                        this.intersectionOptions
                    )
                },

                handleObserver(entries, observer) {
                    entries.forEach(entry => {
                        let href = `#${entry.target.getAttribute('id')}`
                        let link = this.links.find(l => l.getAttribute('id') === href)
                        if (link) {

                            if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                                link.classList.add('is-visible')
                                this.previousSection = entry.target.getAttribute('id')
                                // console.log(this.previousSection);

                            } else {
                                link.classList.remove('is-visible')
                            }

                            this.highlightFirstActive()
                        }
                    })
                },

                //使用观察者会匹配同一屏幕的多个元素，只有is-active才会有高亮
                highlightFirstActive() {
                    // 只选择第一个
                    let firstVisibleLink = this.container.querySelector('.is-visible')

                    this.links.forEach(link => {
                        link.classList.remove('is-active')
                    })

                    if (firstVisibleLink) {
                        firstVisibleLink.classList.add('is-active')
                    }

                    if (!firstVisibleLink && this.previousSection) {
                        this.container.querySelector(
                            `a[id="#${this.previousSection}"]`
                        ).classList.add('is-active')
                    }
                },

            }

            TableOfContents.init()
        }
        // return ()=> {delete TableOfContents}
    }, [post.toc.length])

    return (
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
                                    onClick={() => scrollTOtop(heading.slug)}
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
    )
}

export default Toclayout