import { motion } from "framer-motion"
import Link from "next/link"
import Image from "@/components/Image"
import { useTheme } from "next-themes"

import catSrc from '@/public/images/cat_1f408.png'
import dogSrc from '@/public/images/dog_1f415.png'
import MenuToggle from "../MenuToggle"
import { useState } from "react"
import useMenuAnimation from "@/hooks/menuAnimation"
import styled from "styled-components"
import HeaderTools from "../HeaderTools/HeaderTools"
// primary items-center text-base leading-5
import siteMetadata from '@/config/siteMetadata'
import ThemeSwitch from "@/components/theme/ThemeSwitch"


const MobileNav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
    padding-top: 100px;
    transform: translateX(-100%);
    will-change: transform;
    z-index: 1;
    text-align: left;
`

const HeaderNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    const scope = useMenuAnimation(isOpen);
    return <>
        <nav className='hidden sm:block text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'>
            <ul className='flex space-x-8 '>
                <li className='cursor-pointer'>
                    <Link href='/articles'>博客文章</Link>
                </li>
                <li className='cursor-pointer'>
                    <Link href='/about'>
                        关于
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link href='/pets'>
                        <motion.div whileHover={{ scale: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Image src={theme === 'dark' ? catSrc : dogSrc} alt='link' height={22} width={22} unoptimized />
                        </motion.div>
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="sm:hidden text-right" ref={scope} >
            <a onClick={() => toggleTheme()}>
                <ThemeSwitch mode={theme} />
            </a>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
            <MobileNav className=' bg-white dark:bg-black text-2xl leading-6 px-5 font-semibold text-slate-700 dark:text-slate-200'>
                <ul className='flex space-y-11 flex-col '>
                    <li className='cursor-pointer'>
                        <Link href='/articles'>博客文章</Link>
                    </li>
                    <li className='cursor-pointer'>
                        <Link href='/about'>
                            关于
                        </Link>
                    </li>
                    <li className='cursor-pointer'>
                        <Link href='/pets'>
                            <Image src={theme === 'dark' ? catSrc : dogSrc} alt='link' height={36} width={36} unoptimized />
                        </Link>
                    </li>
                </ul>
                <div className=" absolute bottom-10">
                    <HeaderTools />
                </div>
            </MobileNav>
        </div>
    </>
}

export default HeaderNav