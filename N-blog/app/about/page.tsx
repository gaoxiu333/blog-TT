'use client'
import Header from "@/components/Header/Header"
import TypewriterText from "@/components/TypewriterText"
import ContentWrapper from "@/layouts/ContentWrapper"
import { useTheme } from "next-themes"

const About = () => {
    const { theme } = useTheme()
    // const { text } = useTypewriterEffect({ innerText: '我是前端开发！' })
    return (
        <>
            <Header />
            <ContentWrapper>
                <div className="reset dark:reset-dark">
                    <h2>关于这个博客</h2>
                    <p>这个博客创建于2023年5月；除了记录之后，写这个博客也是为了学习Next.js。</p>
                    <p>我的第一个博客是2019年搭建的，用的Gatsby；但是Gatsby也只只适合博客。中间也没怎么维护，所以就有了现在Next.js搭建的新博客。</p>
                    <h2>关于我</h2>
                    <TypewriterText innerText='未完待续...' />
                </div>
            </ContentWrapper>
        </>
    )
}

export default About