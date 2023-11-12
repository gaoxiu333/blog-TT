import ContentWrapper from "@/layouts/ContentWrapper";

export default function ArticlePanel({ frontMatter }: any) {
    const { title, publishedOn } = frontMatter || {}
    // console.log('publishedOn', frontMatter)
    return (
        <div className="reset dark:reset-dark bg-sky-100 dark:bg-sky-950" style={{ maxWidth: 'none', height: '200px' }} >
            <div className="bg-sky-100 sticky top-0 dark:bg-sky-950" style={{ height: '64px' }}></div>
            <ContentWrapper className='flex justify-center items-center' >
                <div>
                    <h1 style={{ margin: 0 }}>{title}</h1>
                    <p className=" text-center" style={{ margin: 0 }}><small>{publishedOn}</small></p>
                </div>
            </ContentWrapper>
        </div >
    )
}