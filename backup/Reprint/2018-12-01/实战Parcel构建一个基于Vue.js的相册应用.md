---
title: '实战Parcel构建一个基于Vue.js的相册应用' 
date: 2018-12-01 2:30:12
hidden: true
slug: 7rgz4kb5cci
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://dunizb.b0.upaiyun.com/article/201805/parcel/banner.png" src="https://static.alili.techhttps://dunizb.b0.upaiyun.com/article/201805/parcel/banner.png" alt="" title=""></span></p>
<p>前段时间发了一篇<a href="https://blog.dunizb.com/2018/04/23/%E5%89%8D%E7%AB%AF%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7%E5%8F%91%E5%B1%95%E5%8F%8A%E5%85%B6%E6%AF%94%E8%BE%83/" rel="nofollow noreferrer">《前端构建工具发展及其比较》</a>，回顾了前端构建工具的发展历程和进化，其中最新出来的零配置打包工具<a href="https://parceljs.org/" rel="nofollow noreferrer">Parcel</a>我一直很好奇，它到底怎么零配置了？众所周知此前 Webpack 的配置简有点让人茫然和无措，虽然现在 Webpack 4 也号称零配置，但也是相对的，依然需要配置一些东西，而我使用了 Parcel 后我有点惊讶，这货居然连个配置文件也不需要。不像 Webpack 需要一个<code>webpack.config.js</code>这样的文件，Parcel真正是不需要配置，不需要指定什么入口、出口、插件配置之类的，看起来这货真的是个零配置工具。</p>
<h2>实例介绍</h2>
<p>Parcel有个中文网站：<a href="https://parceljs.org/" rel="nofollow noreferrer">https://parceljs.org/</a>，非常简洁，文档也比较清晰，但感觉也有点简陋吧，不然就不会那么简洁了。具体就不多说了，看一看官网就知道了。</p>
<p>我以这两天做的一<a href="https://photo.dunizb.com" rel="nofollow noreferrer">个人相册</a>应用为例子，这是一个Parcel结合Vue.js+VueRouter实现的一个简单应用，主要功能是展示相册列表，让后点击某个相册进入照片瀑布流布局页面，展示该相册下的所有照片。<strong>全部源码戳<a href="https://github.com/dunizb/parceljs-vue-photo" rel="nofollow noreferrer">这里</a></strong></p>
<p>对着官网文档搭建环境到跑起来，硬是花了我几个小时消化，试错，搜索等。下面是相册应用的整体目录：<br><span class="img-wrap"><img data-src="https://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_0.png" src="https://static.alili.techhttps://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_0.png" alt="整体目录" title="整体目录"></span></p>
<p>这个目录结构大家做过<code>Vue.js</code>项目的应该很清楚吧，就把一一介绍是什么了。</p>
<h2>开始</h2>
<h3>安装依赖</h3>
<p>首先在你正在使用的项目目录下创建一个 <code>package.json</code> 文件，然后安装<code>npm install parcel-bundler --save</code>这个包，这是使用Parcel必须的，注意使用 Vue 需要安装<code>parcel-plugin-vue</code>，而不是直接安装vue，<code>parcel-bundler</code>是主要的工具，对于vue结尾的单文件，需要单独处理文件类型。使用vue-router安装<code>vue-router</code>，如果你需要使用 Less 或 Sass 安装相应包即可，这里我使用 Sass 安装<code>node-sass</code>。</p>
<h3>配置babel，postcss</h3>
<p>添加<code>postcss.config.js</code>文件：</p>
<pre><code class="js">module.exports = {
    plugins: [
      require('autoprefixer')({ 
        browsers: [
          'last 20 versions',
          'IE 9',
          'iOS &gt;= 8'
        ]
      })
    ]
  }</code></pre>
<p>添加<code>.babelrc</code>文件：</p>
<pre><code class="js">{
  "presets": [
    ["env"]
  ]
}</code></pre>
<h3>新建html</h3>
<p>在根目录添加 index.html，只需有一个 #root 节点，然后引入<code>./src/index.js</code>即可。</p>
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name=viewport content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"&gt;
  &lt;link href="//blog.dunizb.com/favicon.ico" rel="shotcut icon"&gt;
  &lt;title&gt;我的相册&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="root"&gt;&lt;/div&gt;
  &lt;script src="./src/index.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>添加脚本</h3>
<p>在 package.json 的 scripts 中添加<code>dev</code>和<code>build</code>两个命令</p>
<pre><code class="js">"scripts": {
    "dev": "parcel index.html",
    "build": "parcel build index.html --public-url /",
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },</code></pre>
<p>只需要执行<code>npm run dev</code> 和 <code>npm run build</code> 就可以进行开发和构建，<code>public-url</code>就相当于资源的引用路径。</p>
<h2>配置Vue和VueRouter</h2>
<p>在 src 下的 index.js 中配置即可</p>
<pre><code class="js">import Vue from 'vue'
import VueRouter from 'vue-router'
import createRouter from './config/router.js'
import App from './app.vue'
import './assets/styles/global.css'
Vue.use(VueRouter)
const router = createRouter()
new Vue({
  el: '#root',
  router,
  render: (h) =&gt; h(App)
});</code></pre>
<p>config 目录下是 Router 的配置</p>
<p>router.js，这是 router 的主文件</p>
<pre><code>import Router from 'vue-router'
import routes from './routers.js'
export default () =&gt; {
  return new Router({
    routes
  })
}</code></pre>
<p>routers.js，这是具体路由的配置</p>
<pre><code class="js">import Index from '../views/index.vue'
import List from '../views/list.vue'
export default [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/list/:id',
    props: true,
    component: List,
  }
]</code></pre>
<p>到这里环境搭建就算完成了，写好vue页面后，就可以执行<code>npm run dev</code>了，Parcel会自动读取脚本里的配置进行打包，然后会在根目录生成一个<code>dist</code>文件夹，里面的代码就是打包后的文件了，并且自动做了压缩操作。</p>
<p>并且Parcel的输出也是很美观<br><span class="img-wrap"><img data-src="https://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_1.jpg" src="https://static.alili.techhttps://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_1.jpg" alt="" title=""></span><br><span class="img-wrap"><img data-src="https://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_2.png" src="https://static.alili.techhttps://dunizb.b0.upaiyun.com/article/201805/parcel/parcel_2.png" alt="" title=""></span></p>
<h2>后记</h2>
<p>全程没有配置什么插件啊，转换器啊，对于vue文件我们也只是安装了一个包而已，没有类似<code>parcel.config.js</code>这样的文件，是不是很酷？对于简单的项目是很好的选择。</p>
<p>为什么说适合简单的项目？因为没有配置，意味着可控性不可控，人类对于不可控的东西是怀有很大的恐惧的，Webpack配置多了让人抓狂，Pacel了配置少了同样会让人抓狂，当然也许这个实例太简单还没用到什么高级的东西....</p>
<p>喜欢折腾个人项目的，还不快来试试？</p>
<h2>源码</h2>
<p><a href="#">全部源码：https://github.com/dunizb/parceljs-vue-photo</a></p>
<blockquote>本文首发于<a href="https://www.dunizb.com" rel="nofollow noreferrer">https://www.dunizb.com</a><br>原文链接：<a href="https://blog.dunizb.com/2018/05/08/Parcel-Vue/" rel="nofollow noreferrer">https://blog.dunizb.com/2018/05/08/Parcel-Vue/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Parcel构建一个基于Vue.js的相册应用

## 原文链接
[https://segmentfault.com/a/1190000014824997](https://segmentfault.com/a/1190000014824997)

