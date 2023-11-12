import LightSVG from './light.svg'
import DarkSVG from './dark.svg'

const ThemeSwitch = ({ mode }: any) => {
    return (
        <>
            {mode === "dark" ? <DarkSVG /> : <LightSVG />}
        </>
    )
}

export default ThemeSwitch