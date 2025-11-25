---
title: 'React 实践项目 （一）' 
date: 2019-01-10 2:30:08
hidden: true
slug: lezt7ytb91
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>React在Github上已经有接近70000的 star 数了，是目前最热门的前端框架。而我学习React也有一段时间了，现在就开始用 React+Redux 进行实战！</p></blockquote>
<p>文章地址：<a href="https://github.com/DigAg/digag-pc-react/issues/2" rel="nofollow noreferrer" target="_blank">https://github.com/DigAg/diga...</a><br>项目代码地址：<a href="https://github.com/DigAg/digag-pc-react" rel="nofollow noreferrer" target="_blank">https://github.com/DigAg/diga...</a></p>
<ul><li><h3 id="articleHeader0">首先，我们开始构建一个基础项目。</h3></li></ul>
<p>我们使用<a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>创建项目，不需要安装或配置W​​ebpack或Babel等工具。它们被预先配置和隐藏，以便我们可以专注于代码。</p>
<ul><li><p>在本地全局安装create-react-app（需要安装<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js</a>且版本 &gt;= 6，也可使用 <a href="https://yarnpkg.com/zh-Hans/" rel="nofollow noreferrer" target="_blank">yarn</a> 代替 npm）</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g create-react-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">create</span>-react-app</code></pre>
<ul><li><p>创建项目</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create-react-app digag 
cd digag " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">digag </span>
<span class="hljs-string">cd </span><span class="hljs-string">digag </span></code></pre>
<ul><li><p>检查是否成功创建digag文件夹与相关文件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="digag
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>digag
├── README<span class="hljs-selector-class">.md</span>
├── node_modules
├── package<span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-class">.gitignore</span>
├── public
│   └── favicon<span class="hljs-selector-class">.ico</span>
│   └── index<span class="hljs-selector-class">.html</span>
│   └── manifest<span class="hljs-selector-class">.json</span>
└── src
    └── App<span class="hljs-selector-class">.css</span>
    └── App<span class="hljs-selector-class">.js</span>
    └── App<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    └── index<span class="hljs-selector-class">.css</span>
    └── index<span class="hljs-selector-class">.js</span>
    └── logo<span class="hljs-selector-class">.svg</span>
    └── registerServiceWorker.js</code></pre>
<ul><li><p>在开发模式下运行应用程序,访问<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">localhost:3000</a>在浏览器中查看。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start 
or 
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm <span class="hljs-literal">start</span> 
<span class="hljs-keyword">or</span> 
yarn <span class="hljs-literal">start</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这样我们就成功创建好一个可以直接运行的React项目了！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>这样我们就成功创建好一个可以直接运行的React项目了！
</code></pre>
<ul>
<li><h3 id="articleHeader1">接下来，开始编写代码了！</h3></li>
<li><p>首先我们打开 <strong>src</strong> 目录下的 <strong>App.js</strong> 文件，删除掉默认生成的代码。输入以下代码：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by Yuicon on 2017/6/25.
 */
import React, { Component } from 'react';
import Header from &quot;../../components/Index/Header&quot;;
import './App.css';

export default class App extends Component {

  componentDidMount() {
    console.log(this.props.users)
  }

  render(){
    return(
      <div className=&quot;App&quot;>
        <div className=&quot;App-header&quot;>
          <Header/>
        </div>
        <div className=&quot;App-body&quot;>
          <div className=&quot;welcome-view&quot;>
            <div className=&quot;category-nav&quot;>
              <div>1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd</div>
            </div>
            <div className=&quot;main&quot;>
              21adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd
            </div>
            <div className=&quot;sidebar&quot;>
              31adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd
            </div>
          </div>
        </div>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * Created by Yuicon on 2017/6/25.
 */</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">"../../components/Index/Header"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  componentDidMount() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.props.users)
  }

  render(){
    <span class="hljs-keyword">return</span>(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Header</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-body"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"welcome-view"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"category-nav"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"main"</span>&gt;</span>
              21adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"sidebar"</span>&gt;</span>
              31adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>同样，编辑 <strong>App.css</strong> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
  font-size: 12px;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
  text-rendering: optimizeLegibility;
  background-color: #f4f5f5;
  color: #333;
  word-break: break-all;
}

.App {
  text-align: center;
}

.App-header {
  position: relative;
  height: 5rem;
}

.main-header {
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: 5rem;
  z-index: 250;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all .2s;
}

.main-header .visible {
  transform: translateZ(0);
}

.container {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  width: 100%;
}

.main-header .container {
  max-width: 960px;
  min-width: 960px;
  margin: auto;
}

.logo {
  margin-right: 2rem;
}

.logo-img {
  border-style: none;
}

.nav-menu ul{
  background-color: white;
}

.nav-menu ul li{
  font-size: 1.33rem;
}

.nav-menu ul li:hover{
  border-bottom: 0 solid white !important;
  background-color: white !important;
}

.nav-menu button{
  margin-left: 0 !important;
  font-weight: 500;
  font-size: 1.3rem;
}

.contribute {

}

.contribute:after{
  content: &quot;|&quot;;
  position: absolute;
  top: 24px;
  left: 100%;
  color: hsla(0,0%,59%,.4);
}

.login-btn {

}

.login-btn:after {
  content: &quot;\B7&quot;;
  margin: 0 .4rem;
}

.register-dialog {
  padding: 2rem;
  width: 26.5rem !important;
  max-width: 100%;
  font-size: 1.167rem;
  box-sizing: border-box;
}

.App-body {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  height: 100vh;
}

.welcome-view {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 1.767rem;
}

.category-nav {
  background-color: #db1f00;
  width: 140px;
  position: fixed;
  top: 6.66rem;
}

.main {
  background-color: #08c6a7;
  width: 560px;
  margin-left: 13rem;
}

.sidebar {
  background-color: #e3e001;
  width: 19.2rem;
  box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">font-family</span>: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
  <span class="hljs-attribute">text-rendering</span>: optimizeLegibility;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f4f5f5</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">word-break</span>: break-all;
}

<span class="hljs-selector-class">.App</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.App-header</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">5rem</span>;
}

<span class="hljs-selector-class">.main-header</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#f1f1f1</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#909090</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">5rem</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">250</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">2s</span>;
}

<span class="hljs-selector-class">.main-header</span> <span class="hljs-selector-class">.visible</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(0);
}

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.main-header</span> <span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">min-width</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">margin</span>: auto;
}

<span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">2rem</span>;
}

<span class="hljs-selector-class">.logo-img</span> {
  <span class="hljs-attribute">border-style</span>: none;
}

<span class="hljs-selector-class">.nav-menu</span> <span class="hljs-selector-tag">ul</span>{
  <span class="hljs-attribute">background-color</span>: white;
}

<span class="hljs-selector-class">.nav-menu</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.33rem</span>;
}

<span class="hljs-selector-class">.nav-menu</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span>{
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">0</span> solid white <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">background-color</span>: white <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.nav-menu</span> <span class="hljs-selector-tag">button</span>{
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">500</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.3rem</span>;
}

<span class="hljs-selector-class">.contribute</span> {

}

<span class="hljs-selector-class">.contribute</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">"|"</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">24px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">hsla</span>(0,0%,59%,.4);
}

<span class="hljs-selector-class">.login-btn</span> {

}

<span class="hljs-selector-class">.login-btn</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">"\B7"</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> .<span class="hljs-number">4rem</span>;
}

<span class="hljs-selector-class">.register-dialog</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">2rem</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">26.5rem</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.167rem</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}

<span class="hljs-selector-class">.App-body</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
}

<span class="hljs-selector-class">.welcome-view</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-between;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1.767rem</span>;
}

<span class="hljs-selector-class">.category-nav</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#db1f00</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">6.66rem</span>;
}

<span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#08c6a7</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">13rem</span>;
}

<span class="hljs-selector-class">.sidebar</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e3e001</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">19.2rem</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>可能已经有同学注意到了，我们在 <strong>App.js</strong> 里导入了一个目前还不存在的组件。现在，我们来创建它：</p>
<ul><li><p>首先，创建 <strong>src/components/Index</strong> 目录，在该目录下创建 <strong>Header.js</strong> 。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="digag
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── components
        └── Index
            └── Header.js
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>digag
├── README<span class="hljs-selector-class">.md</span>
├── node_modules
├── package<span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-class">.gitignore</span>
├── public
│   └── favicon<span class="hljs-selector-class">.ico</span>
│   └── index<span class="hljs-selector-class">.html</span>
│   └── manifest<span class="hljs-selector-class">.json</span>
└── src
    └── components
        └── Index
            └── Header<span class="hljs-selector-class">.js</span>
    └── App<span class="hljs-selector-class">.css</span>
    └── App<span class="hljs-selector-class">.js</span>
    └── App<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    └── index<span class="hljs-selector-class">.css</span>
    └── index<span class="hljs-selector-class">.js</span>
    └── logo<span class="hljs-selector-class">.svg</span>
    └── registerServiceWorker.js</code></pre>
<p>编辑 <strong>Header.js</strong> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by Yuicon on 2017/6/25.
 */
import React, {Component} from 'react';
import {Button, Input, Menu} from &quot;element-react&quot;;

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleSelect = (index) => {
    console.log(index);
  };

  handleIconClick = () => {
    console.log('handleIconClick', this.state.searchInput);
  };

  render() {
    return (
      <header className=&quot;main-header visible&quot;>
        <div className=&quot;container&quot;>
          <a href=&quot;/&quot; className=&quot;logo&quot;>
            <img src=&quot;//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg&quot; alt=&quot;掘金&quot; className=&quot;logo-img&quot;/>
          </a>
          <div className=&quot;nav-menu&quot;>
            <Menu defaultActive=&quot;1&quot; mode=&quot;horizontal&quot; onSelect={this.handleSelect}>
              <Menu.Item index=&quot;1&quot;>首页</Menu.Item>
              <Menu.Item index=&quot;2&quot;>专栏</Menu.Item>
              <Menu.Item index=&quot;3&quot;>收藏集</Menu.Item>
              <Menu.Item index=&quot;4&quot;>发现</Menu.Item>
              <Menu.Item index=&quot;5&quot;>标签</Menu.Item>
              <Menu.Item index=&quot;6&quot;>
                <Input
                  size=&quot;small&quot;
                  icon=&quot;search&quot;
                  placeholder=&quot;搜索掘金&quot;
                  onIconClick={this.handleIconClick}
                  onChange={(value) => this.setState({searchInput: value})}
                />
              </Menu.Item>
              <Menu.Item index=&quot;7&quot;>
                <Button type=&quot;text&quot; icon=&quot;edit&quot; className=&quot;contribute&quot;>投稿</Button>
              </Menu.Item>
              <Menu.Item index=&quot;8&quot;>
                <Button type=&quot;text&quot; className=&quot;login-btn&quot;
                        onClick={ () => console.log('登录') }>登录</Button>
                <Button type=&quot;text&quot; onClick={ () => console.log('注册') }>注册</Button>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </header>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>/**
 * Created by Yuicon on 2017/6/25.
 */
import React, {Component} from 'react';
import {Button, Input, Menu} from "element-react";

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleSelect = (index) =&gt; {
    console.log(index);
  };

  handleIconClick = () =&gt; {
    console.log('handleIconClick', this.state.searchInput);
  };

  render() {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"main-header visible"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"logo"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"掘金"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"logo-img"</span>/&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"nav-menu"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Menu</span> <span class="hljs-attr">defaultActive</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"horizontal"</span> <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{this.handleSelect}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2"</span>&gt;</span>专栏<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"3"</span>&gt;</span>收藏集<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"4"</span>&gt;</span>发现<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"5"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"6"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Input</span>
                  <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span>
                  <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span>
                  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"搜索掘金"</span>
                  <span class="hljs-attr">onIconClick</span>=<span class="hljs-string">{this.handleIconClick}</span>
                  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(value)</span> =&gt;</span> this.setState({searchInput: value})}
                /&gt;
              <span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"7"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"edit"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"contribute"</span>&gt;</span>投稿<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"8"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"login-btn"</span>
                        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> () =&gt;</span> console.log('登录') }&gt;登录<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> () =&gt;</span> console.log('注册') }&gt;注册<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Menu</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    )
  }
}</code></pre>
<ul><li><p>我们在 <strong>Header.js</strong> 文件里导入了 <strong>element-react</strong> UI库的组件， 所以需要在 <strong>package.json</strong> 文件里添加依赖。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//省略部分代码
&quot;dependencies&quot;: {
     &quot;element-react&quot;: &quot;^1.0.11&quot;,
     &quot;element-theme-default&quot;: &quot;^1.3.7&quot;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//省略部分代码</span>
<span class="hljs-string">"dependencies"</span>: {
     <span class="hljs-string">"element-react"</span>: <span class="hljs-string">"^1.0.11"</span>,
     <span class="hljs-string">"element-theme-default"</span>: <span class="hljs-string">"^1.3.7"</span>
    },</code></pre>
<p>运行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install 
or 
yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> 
<span class="hljs-keyword">or</span> 
yarn <span class="hljs-keyword">install</span></code></pre>
<p>根据 <a href="https://eleme.github.io/element-react/#/zh-CN/quick-start" rel="nofollow noreferrer" target="_blank"><strong>element-react</strong></a> 文档，在 <strong>index.js</strong> 文件中导入样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'element-theme-default';
//省略部分代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'element</span>-theme-<span class="hljs-keyword">default</span>';
<span class="hljs-comment">//省略部分代码</span></code></pre>
<ul><li><p>现在再重新运行项目，我们可以看到这样的页面：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010005730" src="https://static.alili.tech/img/remote/1460000010005730" alt="index" title="index" style="cursor: pointer;"></span></p>
<p><strong>是的没错，这就是编写一个属于自己的掘金教程。</strong></p>
<p><strong>下篇教程会加入 Redux 进行登录注册操作</strong></p>
<p>项目代码地址：<a href="https://github.com/DigAg/digag-pc-react" rel="nofollow noreferrer" target="_blank">https://github.com/DigAg/diga...</a><br>vue2版项目代码地址：<a href="https://github.com/DigAg/digag-pc-vue2" rel="nofollow noreferrer" target="_blank">https://github.com/DigAg/diga...</a><br>相应后端项目代码地址：<a href="https://github.com/DigAg/digag-server" rel="nofollow noreferrer" target="_blank">https://github.com/DigAg/diga...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 实践项目 （一）

## 原文链接
[https://segmentfault.com/a/1190000010005725](https://segmentfault.com/a/1190000010005725)

