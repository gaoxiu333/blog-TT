'use client'
import { useState, useEffect } from 'react'

import HeaderNav from './HeaderNav'
import HeaderTools from './HeaderTools/HeaderTools'
import Logo from './Logo/Logo'

const Header = () => {
    const [mounted, setMounted] = useState(false)

    // 修复报错问题： https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <header className="sticky top-0 z-40 overflow-x-hidden bg-transparent py-5" >
            <div className='mx-auto flex space-x-12 max-w-3xl items-center justify-between px-5 xl:max-w-5xl'>
                <div>
                    <Logo />
                </div>
                <div className='flex-auto'>
                    <HeaderNav />
                </div>
                <div className='hidden sm:block '>
                    <HeaderTools />
                </div>
            </div>
        </header>
    )
}
export default Header