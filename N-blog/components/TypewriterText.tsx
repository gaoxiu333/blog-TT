import useTypewriterEffect from "@/hooks/typewriterEffect"
import styled, { keyframes } from "styled-components"

const animatBlink = keyframes`
    0%,100%{
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
`

const Text = styled.span`
    &::after{
        content: '|';
        animation:${animatBlink} 1s step-end infinite;
    }
`

const TypewriterText = ({ innerText, stop }: any) => {
    console.log('stop', stop)
    const { text, typing }: any = useTypewriterEffect({ innerText, stop })
    if (typing === 'isStop' && stop) {
        stop()
    }
    return (<Text>{text}</Text>)
}

export default TypewriterText