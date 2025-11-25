---
title: '✌️ 基于 vue2 + vuex + vue-router 构建的移动端微应用' 
date: 2019-01-05 2:30:10
hidden: true
slug: z0fuh7kjsip
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-mobile-starter</h1>
<p><a href="https://github.com/JohnsenZhou/vue-mobile-starter/blob/master/README_en.md" rel="nofollow noreferrer" target="_blank">View README in English</a></p>
<blockquote><p>基于 vue2 + vuex + vue-router 构建的移动端单页微应用，适合于vue2、vuex、vue-router核心概念的理解与掌握。</p></blockquote>
<h2 id="articleHeader1">前言</h2>
<p>做这个项目的初衷其实很简单，我司之前一直用angular、react进行PC端项目的开发，但是最近新开展了一些项目打算用vue来做移动端的开发(紧跟大厂的步伐?)。无奈之前只是看了看vue的语法，没有vue项目开发的实际经验，只能去找资料开始自学，这个项目就是一段时间来自学总结的成果。</p>
<p>由于对 <strong>angular、react</strong> 的掌握程度不错，vue 的语法以及常用的<code>api</code>很快就看的差不多了。还有 <strong>vue-router</strong>，接触过<strong>angular-ui-router</strong>和<strong>react-router</strong> 人在看vue-router文档的时候会有这样的感受： 这三个简直是 ‘孪生兄弟’ 啊。 <strong>vuex</strong> 对于初学者而言可能是三个之中最难理解的，不过对于之前有接触过 <strong>redux</strong> 的人来说，大体的概念可以说是一致的。</p>
<p>开始也找了不少素材，官方的<strong>examples</strong>以及<strong>GitHub</strong>上star较多的开源项目，写的都很不错。不过呢官方的<strong>examples</strong>写的太过于精简，初学者看完会有种看不太够的感觉，而<strong>GitHub</strong>上一些不错的vue开源项目，比如说<strong>vue2-elm</strong>（一个模仿饿了么的项目）。不过如果让一个初学者去模仿这么大体量的项目，或许真的会望洋兴叹啊 ???</p>
<p>本项目虽说是一个十来个页面的小型项目，不过却涉及到<strong>vue</strong>模块的全局和局部应用配置、第三方UI组件的使用、<strong>vuex stroe</strong>的合理化配置、<strong>vue-router</strong>编程式的导航，路由子路由配置，路由信息对象等。非常适合于新手对<strong>vue</strong>核心开发理念的掌握。</p>
<blockquote>
<p>之后会做一版 <strong>react + redux</strong> 的版本，感兴趣的同学可以持续关注哦。 <strong> <a href="https://github.com/JohnsenZhou/react-mobile-starter" rel="nofollow noreferrer" target="_blank">React 版本</a> </strong></p>
<p>觉得此项目对您有帮助，可以点右上角 <strong>star</strong> 支持一下?</p>
</blockquote>
<h2 id="articleHeader2">开源技术支持</h2>
<ol>
<li><p><strong><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue全家桶</a></strong>：vue2 + vuex + vue-router + vue-cli</p></li>
<li><p><strong><a href="http://jsonplaceholder.typicode.com" rel="nofollow noreferrer" target="_blank">jsonplaceholder</a></strong>：一个简单的在线模拟REST API服务器</p></li>
<li><p><strong><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a></strong>：基于Promise 的 HTTP 请求客户端,可同时在浏览器和 node.js 中使用</p></li>
<li><p><strong><a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">muse-ui</a></strong>：基于 Vue 2.0 和 Material Desigin 的 UI 组件库</p></li>
<li><p><strong><a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">express</a></strong>：基于 Node.js 平台的 web 应用开发框架</p></li>
<li><p><strong><a href="http://pm2.keymetrics.io/" rel="nofollow noreferrer" target="_blank">pm2</a></strong>：Node应用进程管理器</p></li>
</ol>
<h2 id="articleHeader3">如何开发</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 克隆本仓库
git clone https://github.com/JohnsenZhou/vue-mobile-starter.git

# 进入仓库目录
cd vue-mobile-starter

# 安装依赖
npm install

# 启动项目，本地浏览地址 => localhost:8080
npm run dev

# 打包压缩
npm run build
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 克隆本仓库</span>
git <span class="hljs-built_in">clone</span> https://github.com/JohnsenZhou/vue-mobile-starter.git

<span class="hljs-comment"># 进入仓库目录</span>
<span class="hljs-built_in">cd</span> vue-mobile-starter

<span class="hljs-comment"># 安装依赖</span>
npm install

<span class="hljs-comment"># 启动项目，本地浏览地址 =&gt; localhost:8080</span>
npm run dev

<span class="hljs-comment"># 打包压缩</span>
npm run build
</code></pre>
<h2 id="articleHeader4">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md            // README文件
├── build                // vue-cli生成的配置文件
├── config               // vue-cli生成的配置文件
├── config.dev.json      // 部署配置文件
├── config.prod.json     // 部署配置文件
├── index.html           // index入口文件
├── node_modules         
├── npm-shrinkwrap.json  // 依赖版本锁定
├── package.json         // npm 配置文件
├── pm2.json             // pm2 配置文件
├── server.js            // node 部署服务文件配置
├── src                  // 项目开发目录
│&nbsp;&nbsp; ├── App.vue          // 项目主组件
│&nbsp;&nbsp; ├── assets           // 资源文件夹
│&nbsp;&nbsp; ├── components       // vue通用组件
│&nbsp;&nbsp; ├── main.js          // vue实例入口文件
│&nbsp;&nbsp; ├── router           // vue-router配置文件
│&nbsp;&nbsp; ├── services         // 接口文件
│&nbsp;&nbsp; ├── store            // vuex配置文件
│&nbsp;&nbsp; ├── utils            // js通用工具组件
│&nbsp;&nbsp; └── views            // vue视图页面
└── static               // 静态资源文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── README<span class="hljs-selector-class">.md</span>            <span class="hljs-comment">// README文件</span>
├── build                <span class="hljs-comment">// vue-cli生成的配置文件</span>
├── config               <span class="hljs-comment">// vue-cli生成的配置文件</span>
├── config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.json</span>      <span class="hljs-comment">// 部署配置文件</span>
├── config<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.json</span>     <span class="hljs-comment">// 部署配置文件</span>
├── index<span class="hljs-selector-class">.html</span>           <span class="hljs-comment">// index入口文件</span>
├── node_modules         
├── npm-shrinkwrap<span class="hljs-selector-class">.json</span>  <span class="hljs-comment">// 依赖版本锁定</span>
├── package<span class="hljs-selector-class">.json</span>         <span class="hljs-comment">// npm 配置文件</span>
├── pm2<span class="hljs-selector-class">.json</span>             <span class="hljs-comment">// pm2 配置文件</span>
├── server<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// node 部署服务文件配置</span>
├── src                  <span class="hljs-comment">// 项目开发目录</span>
│&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>          <span class="hljs-comment">// 项目主组件</span>
│&nbsp;&nbsp; ├── assets           <span class="hljs-comment">// 资源文件夹</span>
│&nbsp;&nbsp; ├── components       <span class="hljs-comment">// vue通用组件</span>
│&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>          <span class="hljs-comment">// vue实例入口文件</span>
│&nbsp;&nbsp; ├── router           <span class="hljs-comment">// vue-router配置文件</span>
│&nbsp;&nbsp; ├── services         <span class="hljs-comment">// 接口文件</span>
│&nbsp;&nbsp; ├── store            <span class="hljs-comment">// vuex配置文件</span>
│&nbsp;&nbsp; ├── utils            <span class="hljs-comment">// js通用工具组件</span>
│&nbsp;&nbsp; └── views            <span class="hljs-comment">// vue视图页面</span>
└── static               <span class="hljs-comment">// 静态资源文件</span>
</code></pre>
<h2 id="articleHeader5">效果演示</h2>
<p><a href="http://47.94.102.32:8001" rel="nofollow noreferrer" target="_blank"><strong>在线浏览Demo请戳这里</strong></a></p>
<blockquote><ol>
<li><p>项目通过阿里云部署</p></li>
<li><p>想了解详细部署过程的同学请浏览 <a href="https://github.com/JohnsenZhou/NodeApp-Deploy" rel="nofollow noreferrer" target="_blank"><strong>此文档</strong></a></p></li>
</ol></blockquote>
<h3 id="articleHeader6">手机浏览请扫描下方二维码</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010594497" src="https://static.alili.tech/img/remote/1460000010594497" alt="在线浏览" title="在线浏览" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">License</h2>
<p><a href="https://github.com/epicmaxco/vuestic-admin/blob/master/LICENSE" rel="nofollow noreferrer" target="_blank">MIT</a> license.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
✌️ 基于 vue2 + vuex + vue-router 构建的移动端微应用

## 原文链接
[https://segmentfault.com/a/1190000010594492](https://segmentfault.com/a/1190000010594492)

