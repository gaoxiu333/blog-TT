# qiankun 踩坑记

实际开发中，往往会遇到老旧项目技术栈七零八落；也有新项目要集成老项目的部分或者全部模块；通常用 iframe 嵌入解决，简单省事儿，iframe 天然提供 JS/CSS 沙箱隔离；但是 iframe 也有很多痛点，比如：iframe 弹窗问题、全屏问题、加载问题导致加载慢（和主页共享链接池）等问题。

### 前言

刚好接收的项目需要集合老项目提供给新项目使用，当然是想到了 iframe 的解决方案，然后是 qiankun 等其他微前端解决方案。

**对于 iframe：**

- 上手简单易用，遇到问题解决方案也很多。
- 体验不好：页面加载问题很难解决，每次切换重新加载，和主应用共享连接池，并行加载有限制。
- UI 问题：弹窗位置和遮罩全屏的问题很难解决，如果在主应用上做，这样耦合程度过高，主应用和子应用都要开发，增加成本。
- 通讯问题：iframe 和主应用或者其他 iframe 通讯有很多种解决方案，比如 postMessage，耦合程度也比较高，而且改造也不小
- 路由问题：url 在浏览器刷新后丢失，相应的浏览器前进后退按钮无法使

**对于 qiankun：**

开始考虑使用 qiankun 之前调用了其他技术方案，比如 wujie、Web Components 和更早的微前端方案 single-spa:

- Web Components: 只有样式隔离，并且对老项目的改造成本过高，很快就被舍弃了
- wujie：wujie 很强大，适配了最新的技术栈，比如子应用支持 vite 打包工具；但是需要用的微前端技术的新业务，为什么不统一技术栈，使用库的形式不更好么？放弃 wujie 是因为它只支持打包成 Web Components 的方式。
- single-spa：没有沙箱机制也很久被舍弃了，使用过程中可能需要面对学习曲线和构建复杂性等挑
- qiankun：基于 single-spa 的解决方案，也是目前遇到比较完美的结局方案，在 B 端业务面前，足够用。

综合考虑最终是敲定了 qiankun：“没有最牛的架构方案，只有最适合具体业务的架构方案”

## qiankun

`qiankun` 是蚂蚁金服开源的一款框架，但它也是基于 `single-spa`之上开发的，实现了开箱即用，除一些必要的修改外，子项目只需要做很少的改动，就能很容易的接入。如果说 `single-spa` 是自行车的话，`qiankun` 就是个汽车。

**使用 `qiankun` 的好处：**

- `qiankun` 自带 `js/css` 沙箱功能，`singles-spa` 可以解决 `css` 污染，但是需要子项目配合

- `single-spa` 方案只支持 `JS entry` 的特点，限制了它只能支持 `vue` 、 `react` 、 `angular` 等技术开发的项目，对一些 `jQuery` 老项目则无能为力。`qiankun` 则没有限制

- `qiankun` 支持子项目预请求功能。

### 搭建基座

官方提供的示例使用的是 HTML 搭建的基座，我这里选用了 vite + React 搭建基座。原因只是开发环境更友好一点；实际项目中是以依赖包的形式提供给主应用（打包成 npm 包提供给主应用）。

首先是子应用配置

```js
// micro-apps.js
const microApps = [
  {
    name: "micro-vue", 
    container: "#micro-vue-viewport", 
    entry: 'http://localhost:8080',
    activeRule: "/micro-vue"
  },
  {
    name: "micro-react", 
    container: "#micro-react-viewport", 
    entry: 'http://localhost:7788/',
    activeRule: "/micro-react"
  },
];


export default microApps;

```

然后是注册微应用并启动，这里的主应用有自己的路由，通过简单的配置，切换路由的时候，可以切换加载不同的子应用模块。

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import microApps from "./micro-app";
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";

import Root from './routes/Nav.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <App /> },
      {
        path: "/micro-vue/*",
        element: <div id='micro-vue-viewport'></div>,
      },
      {
        path: "/micro-react/*",
        element: <div id='micro-react-viewport'></div>,
      },
      {
        path: "/micro-both/*",
        element: <div id=''></div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>
);

registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log("before load app.name====>>>>>", app.name);
  },
  beforeMount: [
    app => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    }
  ],
  afterMount: [
    app => {
      console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
    }
  ],
  afterUnmount: [
    app => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    }
  ]
});
start();

```

## 子应用配置

子应用配置遇到了一些坑，比如：vite 等流行工具还没有得到官方支持，webpack 5 的配置也需要查看 webpack 5 的文档修复出现的错误，这里简单记录一下：

#### 通过 create-react-app 生成 React 18 的子应用配置

使用`@craco/craco` 替换官方推荐的 `@rescripts/cli` 修改 webpack  配置，官方推荐的包已经停止维护，不支持最新版本`create-react-app`生成的项目。

添加 `craco.config.js` 文件

```js
const { name } = require('./package');

module.exports = {
    // ...
    webpack: {

        configure: (config, { env, paths }) => {
            config.output.library = `${name}-[name]`;
            config.output.libraryTarget = 'umd';
            config.output.chunkLoadingGlobal = `webpackJsonp_${name}`; // api 变动旧版为 jsonpFunction
            config.output.globalObject = 'window';

            return config;
        },
    },
    devServer: (_) => {
        const config = _;

        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        config.historyApiFallback = true;
        config.hot = false;
        // config.static = false;
        config.liveReload = false;

        return config;
    },
};
```

package.json 修改 scripts，将 react-scripts 修改为 craco

```json
 "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "craco eject"
  },
```

#### 通过 Vue CLI 生成的 Vue 子应用配置

Vue 项目在改造时没有遇到太大的问题，只是修改了几个大包的 API ，将旧版的 `jsonpFunction` 改为了 `chunkLoadingGlobal`。

## DEMO

[项目参考地址](https://github.com/gaoxiu333/qiankun-example)

- 主应用配置路由，通过路由切换子应用
- 子应用也可以切换路由
- 多个子应用出现时，只能有一个子应用可以切换路由，不支持多个子引用同时切换

## 参考链接：

[qiankun 技术圆桌](https://www.yuque.com/kuitos/gky7yw/rhduwc)

[官方 example](https://github.com/zhangbinzhbb/qiankun-vue/tree/master)

[微前端实践到落地](https://www.yuque.com/web-developer/wzf1mp/fnccy3#R6J4Y)

[qiankun 微前端方案实践及总结](https://juejin.cn/post/6844904185910018062)

[qiankun常见问题](https://qiankun.umijs.org/zh/faq)

[qiankun Discussions](https://github.com/umijs/qiankun/discussions)

[qiankun Issues](