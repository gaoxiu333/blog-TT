'use client'
import styled from "styled-components"
import AnimateGradientTextFade from "./AnimateGradientTextFade"
import { motion } from "framer-motion"
import { useState } from "react"
import StarButton from "../StarButton"
import ContentWrapper from "@/layouts/ContentWrapper"
import PetSpeak from "./PetSpeak"

const Wrapper = styled.section`
    height: 350px;
`

const HomePanel = () => {
    const texts = ['不！', '要！', '点！']
    const [active, setActive] = useState(false)
    const [btnActive, setBtnActive] = useState(false)

    const handleSpeakEnd = () => {
        setBtnActive(true)
    }

    return (
        <ContentWrapper>
            <div className=" h-16 bg-white dark:bg-black sticky top-0"></div>
            {active
                ? <Wrapper className="flex flex-col">
                    <PetSpeak speakEnd={handleSpeakEnd} />
                    {btnActive &&
                        <div className="flex items-center justify-center flex-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                <StarButton />
                            </motion.div>
                        </div>
                    }
                </Wrapper>
                : <a className=" cursor-pointer" onClick={() => setActive(true)}>
                    <Wrapper className="flex items-center justify-center">
                        <AnimateGradientTextFade className='-mt-20' texts={texts} />
                    </Wrapper>
                </a>
            }
        </ContentWrapper>
    )
}

export default HomePanel