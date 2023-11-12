# 一个简单的博客

这个博客是基于Nextjs编写，支持将`MD`内容生成文章；也支持`MDX`，在Markdown中写JSX。还在开发和完善中...

## 功能
- [x] 支持明暗主题 - 使用Tailwind定制
- [x] 支持`MD`、`MDX` - 支持普通的Markdown，也支持在Markdown中写JSX
- [x] 自动生成文档目录 - 根据标题自动生成目录
- [x] 支持数学公式 - 基于`KaTeX`语法的数学公式
- [x] 自动添加文章更新时间 - 代码提交是自动更新`updatedOn`
- [ ] 支持文章标签 - 未实现
- [ ] SEO 优化 - 未实现
- [ ] CI/CD 自动化部署
- [ ] 正在构思...

## 快速启动

### 安装

```bash
npm install
```

### 运行

```bash
npm run dev
```

用浏览器打开 [http://localhost:3000](http://localhost:3000)；修改`app\pages.tsx`实时显示首页内容的修改。

## 定制

`config/siteMetadata.ts` - 包含大部分网站相关信息，自行修改。

`data/posts`-  用来渲染的Markdown源文件。

`public/static`- 存储资产，例如图像和网站图标。

`tailwind.config.js` 包含`Tailwind`样式表，可以对其进行修改以改变网站的整体外观。

`css/prism.css`- 代码块高亮样式；可以定制喜欢的 prismjs 主题。

`components/MDXComponents.js`- 定义需要在`.mdx`文件中使用的React组件。

`next.config.js`- 与 Next.js 相关的配置。如果你想从其他域加载脚本、图像等。