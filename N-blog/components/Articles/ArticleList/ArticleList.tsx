import Link from 'next/link'

import { getAllFilesFrontMatter } from '@/lib/mdx'
// import Tags from '@/components/Tags'

export default async function ArticleList() {
    const posts: any = await getAllFilesFrontMatter('posts') || []

    return (
        <>
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                {!posts.length && 'No posts found.'}
                {
                    posts.map((frontMatter: any) => {
                        const { slug, publishedOn, readingTime, title, summary, tags } = frontMatter
                        console.log('frontMatter', frontMatter)

                        return (
                            <li key={slug} className="py-12">
                                <article>
                                    <Link href={`/posts/${slug}`}>
                                        <h2 >{title}</h2>
                                        {/* <h4 className='line-clamp-2 text-gray-400 dark:text-while' >{summary}12312331</h4> */}
                                        <p className='text-gray-400 text-xs'> {publishedOn} · {readingTime}</p>
                                        {/* {tags && <Tags tags={tags} />} */}
                                    </Link>
                                </article>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )

}
/**
 * 标题
 * 描述
 * 作者/日期
 * 标签
 */