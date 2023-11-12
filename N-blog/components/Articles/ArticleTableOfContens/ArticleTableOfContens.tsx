'use client'
import React from "react"
import styled from "styled-components"

import { formatTitle, throttle } from "@/lib/utils/format"

const ArticleTableOfContents = ({ headings }: any) => {

    const largeEnoughHeadings = headings.filter((h: any) => h.depth <= 3)
    const headingsWithIds = largeEnoughHeadings.map((h: any) => ({
        ...h,
        id: h.url
    }))
    const activeHeadingId = useActiveHeading(headingsWithIds)

    return (
        headingsWithIds.length < 1
            ? null
            : <Aside>
                <TocHeading >
                    目录
                </TocHeading>
                {headingsWithIds.map((heading: any, index: any) => (
                    <ContentLinkHeading
                        key={index}
                        href={`${heading.id}`}
                        className={activeHeadingId === heading.id ? 'text-primary' : 'text-black dark:text-white'}
                        style={{
                            fontSize: '14px',
                            lineHeight: 1.8,
                            paddingLeft: `${(heading.depth - 2) * 18}px`
                        }}

                    >
                        {heading.value}
                    </ContentLinkHeading>
                ))}
            </Aside>
    )
}

const useActiveHeading = (headings: any) => {
    const [activeHeadingId, setActiveHeading] = React.useState(null)
    React.useEffect(() => {
        const handleScroll = throttle(() => {

            if (window.pageYOffset === 0) {
                return setActiveHeading(null)
            }


            let headingBoxes = headings.map(({ id }: any) => {
                const elem: any = document.querySelector(`${id}`)
                return { id: id, box: elem.getBoundingClientRect() }
            })


            const TOP_OFFSET = 120
            let firstHeadingInViewport = headingBoxes.find(({ box }: any) => {
                return box.bottom > TOP_OFFSET && box.top < window.innerHeight
            })


            if (!firstHeadingInViewport) {
                const reversedBoxes = [...headingBoxes].reverse()

                firstHeadingInViewport = reversedBoxes.find(({ box }) => {
                    return box.bottom < TOP_OFFSET
                })
            }

            if (!firstHeadingInViewport) {
                setActiveHeading(null)
            } else if (firstHeadingInViewport.id !== activeHeadingId) {
                setActiveHeading(firstHeadingInViewport.id)
            }
        }, 500)

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [activeHeadingId, headings])

    return activeHeadingId
}

const TocHeading = styled.h3`
              margin-bottom: 16px;
              `

const ContentLinkHeading = styled.a`
              display: block;
              opacity: 0.7;
              text-decoration: none;
              transition: opacity 500ms;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover,
              &:focus {
              opacity: 1;
              transition: opacity 0ms;
            }
              `
const Aside = styled.aside`
    width: 230px;
    padding-left: 20px;
    position: sticky;
    top: 80px;
    max-height: calc(100vh - 120px);
    overflow: auto;
`
export default ArticleTableOfContents
