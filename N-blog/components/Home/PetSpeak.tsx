import { useTheme } from "next-themes"

import Image from "../Image"

import catSrc from '@/public/images/cat_1f408.png'
import dogSrc from '@/public/images/dog_1f415.png'
import TypewriterText from "../TypewriterText"


const PetSpeak = ({speakEnd}:any) => {
    const { theme } = useTheme()

    return <div className="flex items-center">
        <Image src={theme === 'dark' ? catSrc : dogSrc} alt='link' height={22} width={22} unoptimized/>：
        <TypewriterText innerText='谢谢你看到这里，给个star吧！' stop={speakEnd} />
    </div>
}

export default PetSpeak