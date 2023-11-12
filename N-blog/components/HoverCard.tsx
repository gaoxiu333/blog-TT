'use client'
import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    perspective: 1500px;
`
const Card = styled.div`
    font-weight: bold;
    text-align: right;
    color: #181a1a;
    overflow: hidden;
    width: 300px;
    height: 400px;
    box-shadow: 0 1px 5px #00000099;

    border-radius: 10px;

    position: relative;

    transition-duration: 300ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-out;
    transform: rotate3d(0);
    &:hover{
        transition-duration: 150ms;
        box-shadow: 0 5px 20px 5px #00000044;
    }
`
const Glow = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    /* background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f); */
`

export default function HoverCard({ children }: any) {
    let bounds;
    const inputRef: any = useRef();
    const glowRef: any = useRef();
    const rotateToMouse = (e: any) => {
        bounds = inputRef.current.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        inputRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
    };
    const removeListener = (e: any) => {
        inputRef.current.style.transform = '';
        inputRef.current.style.background = '';
    };
    return (
        <Wrapper>
            <Card ref={inputRef}
                onMouseLeave={removeListener}
                onMouseMove={rotateToMouse}>
                {children}
                <Glow ref={glowRef} />
            </Card>
        </Wrapper>

    );
}
