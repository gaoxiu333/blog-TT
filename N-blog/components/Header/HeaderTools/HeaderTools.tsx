import SocialIcon from "@/components/social-icons"
import ThemeSwitch from "@/components/theme/ThemeSwitch"
import siteMetadata from '@/config/siteMetadata'
import { useTheme } from "next-themes"


const HeaderTools = () => {

    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }
    return <>
        <ul className='flex align-middle space-x-8 '>
            <li className='cursor-pointer'>
                <a onClick={() => toggleTheme()}>
                    <ThemeSwitch mode={theme} />
                </a>
            </li>
            <li className='cursor-pointer'>
                <SocialIcon kind="github" href={siteMetadata.github} size="6" />
            </li>
        </ul>
    </>
}
export default HeaderTools