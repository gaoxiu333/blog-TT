'use client'
import styled, { keyframes } from 'styled-components'

const animateGradientTextFade1: any = keyframes`
    0%, 16.667%, 100%{
        opacity: 1;
    }
    33.333%, 83.333%{
        opacity: 0;
    }
`
const animateGradientTextFade2: any = keyframes`
    0%, 100%{
        opacity: 0;
    }
    33.333%, 50%{
        opacity: 1;
    }
    16.667%, 66.667%{
        opacity: 0;
    }
`
const animateGradientTextFade3: any = keyframes`
    0%, 50%, 100%{
        opacity: 0;
    }
    66.667%, 83.333%{
        opacity: 1;
    }
`

const Wraper = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 64px;
    font-weight: 600;
    line-height: 2;
    cursor: pointer;
`
const Outer: any = styled.span`
   position: relative;
   display: block;
   user-select: none;
   &:before{
    content: ${(props: any) => props?.text ? `'${props?.text}'` : "' '"};
    position: absolute;
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: -10px;
    /* background: currentColor; */
    background:transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: .05em;
    padding-right:.05em;
   }
`
const Inner: any = styled.span`
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: .05em;
    padding-right:.05em;
    background-image: linear-gradient(90deg,${(props: any) => props?.startColor},${(props: any) => props?.endColor});
    position: relative;
    z-index: 1;
    animation: ${(props: any) => props?.timer ?? '4s'} ${(props: any) => props?.animate} infinite;
`

export default function AnimateGradientTextFade(props: any) {
    const { texts, className } = props || {}
    const [f, s, t] = texts || []
    const color1 = {
        text: f,
        startColor: "#f20089",
        endColor: "#d100d1",
        animate: animateGradientTextFade1,
    }
    const color2 = {
        text: s,
        startColor: "#d100d1",
        endColor: "#a100f2",
        animate: animateGradientTextFade2,
    }
    const color3 = {
        text: t,
        startColor: "#a100f2",
        endColor: "#2d00f7",
        animate: animateGradientTextFade3,
    }
    return (
        <>
            <Wraper className={`text-black dark:text-white ${className}`}>
                <Outer {...color1} >
                    <Inner {...color1} >{f}</Inner>
                </Outer>
                <Outer {...color2} >
                    <Inner {...color2} >{s}</Inner>
                </Outer>
                <Outer {...color3} >
                    <Inner {...color3} >{t}</Inner>
                </Outer>
            </Wraper>
        </>
    )
}