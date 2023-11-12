---
title: 使用 Nextjs 13 自建博客踩坑记
publishedOn: '2023/5/15 20:55:03'
updatedOn: '2023/5/15 20:55:03'
# title: How I Built My Blog
# seoTitle: How I Built my Blog using MDX, Next.js, and React
# abstract: An in-depth look at the technical structure for my blog.
# isPublished: true
# publishedOn: 2021-04-20T09:15:00-0400
# layout: Article

---


### 前言

第一次接触博客选择对比后，我使用 Hexo 搭建了第一个博客，受限于时代背景 Hexo 使用 EJS 或者 Pug 开发主题，不能使用更现代化的技术栈；很快就被我用 Gatsby 重构了，Gatsby 依托 React 强大的生态，有着丰富的主题和插件；但是需要接受 GraphQL 作为数据的理念，优点是所有的数据在构建时已经创建好了，有利于提高加载速度。缺点也很明显，所有的数据和页面在构建时准备，随着页面和数据越来越多，构建速度越来越慢。这个弊端对写博客来说，影响不大，对博客数量寥寥无几的我来说，几乎没有影响。但是我还是还是选择了 Nextjs 重新自建一个博客，也是为了练手。

### 为什么选择 Nextjs？

现在的前端越来越卷，总要掌握新的技术， Gatsby 很难在企业级应用上推广，尤其在国内，Gatsby 只是一个静态站点生成器（SSG），擅长创建内容变更不频繁的静态网站，比如博客；而 Nextjs 可以构建出复杂交互的网站。这篇文章会记录我使用 Nextjs 搭建博客踩到的坑。

### 构思博客功能

- 首先要支持 Markdown，因为我之前的博客都是 `.md` 格式
- UI要简洁易拓展，使用 React 生态构建 UI 部分
- 支持切换 暗/亮 主题模式

暂时就这样，对博客要求不是很高，以后想到再慢慢完善，比如 Live code 等功能；

### 开始 Nextjs 搭建

在我搭建博客时 Nextjs 刚刚升级到了`13.4.0`，官方文档也刚刚更新为推荐 App Router 的最新文档；通过对 App Router 和 Pages Router 简单的比较后使用了 App Router；Pages Router 相对来说比较简单，获取数据的方式基于 Nextjs 提供的几个 API （如：`getStaticProps`、`getServerSideProps`）在组件内获取到你想要的数据。基于尝鲜的想法，我选择了 App Router 的路由模式开始搭建博客。

```bash
npx create-next-app@latest
```

最基本的 Nextjs 模版已经创建好了，接下来是增加功能了。

### TailwindCSS VS styled-component

在我浏览 Nextjs 的教程时看到很多推荐 TailwindCSS 的项目，于是就在博客项目里体验了一番。

- TailwindCSS - 是一个 CSS  样式库，理念是语义化 CSS 类名，类似于颗粒度更小的 Bootstrap ，但是定制化程度更高，功能也更强。
- styled-component - 是一个 CSS in JS 类库，可以帮助你在 React 组件中编写原生 CSS，很方便的使用 props 传递 CSS 变量。

使用感受上，TailwindCSS 为了减少打包体积，打包时会移除没有使用的类名，经常导致动态传入组件的类名的样式会丢失。加上前期需要记类名，前期负担还是很重，后面再慢慢研究 TailwindCSS 打包的优化机制；

后面还是引入了 styled-component 编写样式，用起来也更顺手。唯一缺点是只能在客户端组件内使用。

### 支持 Markdown

想要把一个`.md`格式到文档在 Nextjs 中渲染成一个博客文章，有以下几种方式：

- [@next/mdx](https://www.npmjs.com/package/@next/mdx) - 官方推荐的方式，但不支持 frontmatter 等元数据
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - 支持元数据，数据来源不限于 解析 Markdown 文件，也可以是服务端获取的数据。
- [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) - 不仅支持 `next-mdx-remote` 支持的功能，而且还支持 `.mdx` 内自动导入 React 组件。

以上三种，都是基于 [MDX](https://mdxjs.com/) ，`mdx-bundler` 功能最强大，相应的打包后体积也会更大；一开始我选择的是 `next-mdx-remote` ，为了遵循打包体积最小化；但是当我看到 MDX 文档时，MDX 刚刚发布了 MDX2，`next-mdx-remote`使用的还是 MDX，最终选择了 `mdx-bundler`，支持 MDX2 新增特性，方便以后功能的拓展，我又重新编写了解析逻辑。

### 总结

目前遇到坑的就这两个，先记录下来；博客的最基本功能已经完成了，新的功能还在构思和摸索中，本着学习 Nextjs 的目的，慢慢折腾。如果你也有搭建博客或者学习 Nextjs 欢迎交流～

### 博客地址

- [预览](https://next-blog-template-omega.vercel.app/)
- [源码](https://github.com/gaoxiu333/next-blog-template)























