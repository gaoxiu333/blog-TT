'use client'
import Header from "@/components/Header/Header"
import HoverCard from "@/components/HoverCard"
import TypewriterText from "@/components/TypewriterText"
import ContentWrapper from "@/layouts/ContentWrapper"
import Image from "@/components/Image"
import catSrc from '@/public/images/cat.webp'
import dogSrc from '@/public/images/dog.jpeg'
import { useTheme } from "next-themes"

const Pets = () => {
    const { theme } = useTheme()

    return (
        <>
            <Header />
            <ContentWrapper>
                <HoverCard>
                    {theme === 'dark'
                        ? <Image src={catSrc} alt="cat" />
                        : <Image src={dogSrc} alt="dog" />
                    }
                </HoverCard>
                <div>
                    {
                        theme === 'dark'
                            ? <TypewriterText innerText='我是嘻嘻猫，没头没脑的嘻嘻猫。不喜欢思考，但热爱生活。' />
                            : <TypewriterText innerText='我是哈哈狗。我最喜欢的动物是小猫。因为他也是四条腿和一只尾巴，和我一样。有一天，我遇到了猪猪。可是我发现我不喜欢猪猪。所以我知道，这不是我喜欢小猫的原因。' />
                    }

                </div>
            </ContentWrapper>
        </>
    )
}

export default Pets