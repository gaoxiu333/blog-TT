import { getFileBySlug } from '@/lib/mdx'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import ArticlePanel from '@/components/Articles/ArticlePanel'
import Header from '@/components/Header/Header'
import ArticleTableOfContents from '@/components/Articles/ArticleTableOfContens'
import ContentWrapper from '@/layouts/ContentWrapper'

const PostPage = async ({ params, }: any) => {

    const post = getFileBySlug('posts', params.slug)
    const { code, toc, frontMatter } = await post as any

    return (
        <>
            <Header />
            <div className='bg-sky-100 dark:bg-sky-950' style={{ height: '100px', marginTop: '-100px' }} ></div>
            <ArticlePanel frontMatter={frontMatter} />
            <ContentWrapper>
                <div className="bg-white sticky top-0 dark:bg-black" style={{ height: '64px' }}></div>
                <section className='flex justify-between space-x-28'>
                    <section className='reset dark:reset-dark flex-auto' style={{ width:'100%', maxWidth: 'none', marginTop: '100px' }}>
                        <MDXLayoutRenderer code={code} />
                    </section>
                    <section className='hidden sm:block' style={{ marginTop: '100px', width: '200px' }}>
                        <ArticleTableOfContents headings={toc} />
                    </section>
                </section>
            </ContentWrapper>
        </>
    )
}


export default PostPage
