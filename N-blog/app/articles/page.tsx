import ArticleList from "@/components/Articles/ArticleList"
import Header from "@/components/Header/Header"
import ContentWrapper from "@/layouts/ContentWrapper"

const ArticlesPage = () => {
    return <>
        <Header />
        <ContentWrapper>
            {/* @ts-expect-error Async Server Component */}
            <ArticleList />
        </ContentWrapper>
    </>
}

export default ArticlesPage