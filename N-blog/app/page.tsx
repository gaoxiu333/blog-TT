import ArticleList from '@/components/Articles/ArticleList'
import Header from '@/components/Header/Header'
import HomePanel from '@/components/Home/HomePanel'
import ContentWrapper from '@/layouts/ContentWrapper'

export default function Home() {
  return (
    <>
      <Header />
      <HomePanel />
      <ContentWrapper>
        {/* @ts-expect-error Async Server Component */}
        <ArticleList />
      </ContentWrapper>
    </>
  )
}
