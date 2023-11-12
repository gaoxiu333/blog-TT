import Github from './github.svg'

// 流行品牌SVG库 https://simpleicons.org/

const components: any = {
  github: Github
}

const SocialIcon = ({ kind, href, size = 8 }: any) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = Github

  return (
    <a
      className="text-sm"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current currentColor h-5 w-5`}
      />
    </a>
  )
}

export default SocialIcon