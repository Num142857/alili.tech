---
title: 'vue+node+mysql搭建个人博客（一）' 
date: 2018-12-24 2:30:07
hidden: true
slug: tcnuahcdele
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>学习笔记...<br>在线地址：<a>cl8023.com</a>    <a href="https://github.com/Moon-Future/Vue-Node-Blog" rel="nofollow noreferrer" target="_blank">github</a>
</blockquote>
<h1 id="articleHeader0">准备工作</h1>
<h2 id="articleHeader1">安装node，这是必须的</h2>
<p>新版node自带npm，安装Node.js时会一起安装，npm的作用就是对Node.js依赖的包进行管理，也可以理解为用来安装/卸载Node.js需要装的东西。<br>验证是否安装成功：  <br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/cmder%E9%AA%8C%E8%AF%81node_npm_vue.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/cmder%E9%AA%8C%E8%AF%81node_npm_vue.jpg" alt="验证是否安装成功" title="验证是否安装成功" style="cursor: pointer; display: inline;"></span><br>推荐windows下终端工具：<a href="http://cmder.net/" rel="nofollow noreferrer" target="_blank">cmder</a></p>
<h2 id="articleHeader2">npm安装vue-cli</h2>
<p>使用npm下载依赖包是可能有些慢，所以这里可以换上淘宝的镜像cnpm。  <br>打开终端(可以在任何位置)，输入  <br><code>npm install cnpm -g --registry=https://registry.npm.taobao.org</code>   <br>cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。  <br>现在来安装vue-cli：输入  <br><code>npm install -g vue-cli</code> 或者 <code>cnpm install -g vue-cli</code>  <br>命令中 -g 表示全局安装，会安装到node安装目录下的node_modules文件夹下，看看里面是不是多了vue-cli文件夹，如果没有，看看npm模块的安装路径<br><code>npm config ls</code> <br>可以查看模块的安装路径 prefix，具体设置请自行百度。<br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/npm%E6%A8%A1%E5%9D%97%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/npm%E6%A8%A1%E5%9D%97%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84.jpg" alt="npm模块安装路径" title="npm模块安装路径" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">vue-cli快速构建项目</h2>
<ul>
<li>选定一个你喜欢的文件夹，进入该文件夹下，之后创建的项目目录就在文件夹下</li>
<li>打开终端，进入目标文件夹，以 D: 为例，使用webpack模板构建项目，输入</li>
</ul>
<p><code>vue init webpack my-blog</code>  <br>此时会自动从github下载文件目录到目标文件夹，上不了github的只能想办法了，从别处把构建好的文件全部拷过来也是可以的。</p>
<h2 id="articleHeader4">运行项目</h2>
<ul>
<li>1、进入my-blog文件夹，首先可以看到文件夹下有一个package.json文件，这个文件很重要，里面记录的项目的一些信息和运行成功运行项目必须的一些依赖包，之后安装的一些包也要记录到里面，方便别人拷贝过来你的项目时安装依赖，顺利运行。</li>
<li>2、新版本的 vue-cli 在执行 <code>vue init webpack my-blog</code> 第9步时会有一个选择：<br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/npm%20i%20for%20pro.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/npm%20i%20for%20pro.jpg" alt="npm i for pro" title="npm i for pro" style="cursor: pointer;"></span><br>   如果选择了Yes，则可跳过步骤3，如果选择了No，则按照步骤3进入文件夹安装依赖。</li>
<li>3、终端输入（要在此文件夹下）输入：<code>cnpm install</code> install可以简写为 i 即 <code>cnpm i</code>，cnpm安装应该挺快的，安装完成后会看到文件夹下多了个node_modules文件夹，里面就是运行项目所需要的一些依赖包，可以看到此文件夹虽然不大，但是里面文件个数有上千个，所以拷贝起来也是挺麻烦的，所以把依赖包记录到package.json里面，别人只要重新下载安装一下就好了，上传到github上也方便。</li>
<li>
<p>4、启动项目：输入 <code>npm run dev</code>，等待浏览器自动打开。  <br>npm run dev 执行的命令即是package.json里 scripts下的dev：node build/dev-server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
        &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,
        &quot;start&quot;: &quot;npm run dev&quot;,
        &quot;build&quot;: &quot;node build/build.js&quot;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
        <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"</span>,
        <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
        <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
    },</code></pre>
<p><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/vue%20init%20webpack.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/vue%20init%20webpack.jpg" alt="构建项目" title="构建项目" style="cursor: pointer; display: inline;"></span></p>
<p>默认端口为8080，若此时8080端口被占用则会出错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
> Starting dev server...
events.js:160
throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE :::8080  
....." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>...
&gt; Starting dev server...
events.js:160
throw er; // Unhandled 'error' event
      ^
<span class="hljs-keyword">Error: </span>listen EADDRINUSE :::8080  
.....</code></pre>
<p>可以在D:\my-blog\config\index.js里修改端口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-



    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">dev</span>: {

<span class="yaml">    <span class="hljs-string">//</span> <span class="hljs-string">Paths</span>
<span class="hljs-attr">    assetsSubDirectory:</span> <span class="hljs-string">'static'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    assetsPublicPath:</span> <span class="hljs-string">'/'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    proxyTable:</span> <span class="hljs-string">{},</span>

    <span class="hljs-string">//</span> <span class="hljs-string">Various</span> <span class="hljs-string">Dev</span> <span class="hljs-string">Server</span> <span class="hljs-string">settings</span>
<span class="hljs-attr">    host:</span> <span class="hljs-string">'localhost'</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">can</span> <span class="hljs-string">be</span> <span class="hljs-string">overwritten</span> <span class="hljs-string">by</span> <span class="hljs-string">process.env.HOST</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8080</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">can</span> <span class="hljs-string">be</span> <span class="hljs-string">overwritten</span> <span class="hljs-string">by</span> <span class="hljs-string">process.env.PORT,</span> <span class="hljs-string">if</span> <span class="hljs-string">port</span> <span class="hljs-string">is</span> <span class="hljs-string">in</span> <span class="hljs-string">use,</span> <span class="hljs-string">a</span> <span class="hljs-string">free</span> <span class="hljs-string">one</span> <span class="hljs-string">will</span> <span class="hljs-string">be</span> <span class="hljs-string">determined</span>
<span class="hljs-attr">    autoOpenBrowser:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    errorOverlay:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    notifyOnErrors:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    poll:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-attr">https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-</span>



    <span class="hljs-string">//</span> <span class="hljs-attr">https://webpack.js.org/configuration/devtool/#development</span>
<span class="hljs-attr">    devtool:</span> <span class="hljs-string">'cheap-module-eval-source-map'</span><span class="hljs-string">,</span>

    <span class="hljs-string">//</span> <span class="hljs-string">If</span> <span class="hljs-string">you</span> <span class="hljs-string">have</span> <span class="hljs-string">problems</span> <span class="hljs-string">debugging</span> <span class="hljs-string">vue-files</span> <span class="hljs-string">in</span> <span class="hljs-string">devtools,</span>
    <span class="hljs-string">//</span> <span class="hljs-string">set</span> <span class="hljs-string">this</span> <span class="hljs-string">to</span> <span class="hljs-literal">false</span> <span class="hljs-bullet">-</span> <span class="hljs-string">it</span> <span class="hljs-string">*may*</span> <span class="hljs-string">help</span>
    <span class="hljs-string">//</span> <span class="hljs-attr">https://vue-loader.vuejs.org/en/options.html#cachebusting</span>
<span class="hljs-attr">    cacheBusting:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>

<span class="hljs-attr">    cssSourceMap:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">},</span></span></code></pre>
<p>启动成功后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ...
 DONE  Compiled successfully in 2597ms                                                          
 I  Your application is running here: http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> ...
 DONE  Compiled successfully <span class="hljs-keyword">in</span> <span class="hljs-number">2597</span>ms                                                          
 I  Your application is running <span class="hljs-string">here:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//localhost:8080</span></code></pre>
<p><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/17-7-28/73659113.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/17-7-28/73659113.jpg" alt="启动成功" title="启动成功" style="cursor: pointer;"></span></p>
</li>
</ul>
<h1 id="articleHeader5">安装需要用到的包</h1>
<p>首先安装项目要用到的一些组件，也可以之后遇到什么需要的再安装</p>
<ul>
<li>element-ui：饿了么前段组件库，可以帮助快速建立起前段页面，少些很多样式</li>
<li>vuex：vue状态管理</li>
<li>axios：基于Promise 用于浏览器和 nodejs 的 HTTP 客户端</li>
<li>mysql：连接mysql数据库</li>
<li>express：</li>
<li>body-parser：</li>
<li>node-sass：sass-loader依赖</li>
<li>sass-loader：解析sass/scss文件</li>
</ul>
<p>可以依次安装( npm 安装很慢的可以使用 cnpm )：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install element-ui --save  （回车）
npm install vuex --save  （回车）
npm install axios --save  （回车）
npm install mysql --save  （回车）
npm install express --save  （回车）
npm install body-parser --save  （回车）
npm install node-sass --save-dev  （回车）
npm install sass-loader --save-dev  （回车）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">element</span>-ui <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> vuex <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> axios <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> mysql <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> express <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">body</span>-parser <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> node-sass <span class="hljs-comment">--save-dev  （回车）</span>
npm <span class="hljs-keyword">install</span> sass-loader <span class="hljs-comment">--save-dev  （回车）</span></code></pre>
<p>也可以一起安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install element-ui vuex axios mysql express body-parser --save  （回车）
npm install node-sass sass-loader --save-dev  （回车）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">element</span>-ui vuex axios mysql express <span class="hljs-keyword">body</span>-parser <span class="hljs-comment">--save  （回车）</span>
npm <span class="hljs-keyword">install</span> node-sass sass-loader <span class="hljs-comment">--save-dev  （回车）</span></code></pre>
<p>--save 意思就是将依赖记录在 package.json 里的 dependencies 下，之后生产环境也是需要这些包的，--sava-dev 是将依赖记录在 package.json 里的 devDependencies 下，只是开发环境需要这些包，方便开发调试，而生产环境不需要。（-S 是 --save 的缩写，-D 是 --save-dev 的缩写）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;axios&quot;: &quot;^0.18.0&quot;,
    &quot;body-parser&quot;: &quot;^1.18.3&quot;,
    &quot;element-ui&quot;: &quot;^2.3.9&quot;,
    &quot;express&quot;: &quot;^4.16.3&quot;,
    &quot;mysql&quot;: &quot;^2.15.0&quot;,
    &quot;vue&quot;: &quot;^2.5.2&quot;,  // 项目构建完就有了
    &quot;vue-router&quot;: &quot;^3.0.1&quot;,  // 项目构建完就有了 当时&quot;Install vue-router&quot;选了Yes
    &quot;vuex&quot;: &quot;^3.0.1&quot;
  },
  &quot;devDependencies&quot;: {
    ...
    &quot;node-sass&quot;: &quot;^4.9.0&quot;,
    &quot;sass-loader&quot;: &quot;^7.0.1&quot;,
    ...
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"axios"</span>: <span class="hljs-string">"^0.18.0"</span>,
    <span class="hljs-string">"body-parser"</span>: <span class="hljs-string">"^1.18.3"</span>,
    <span class="hljs-string">"element-ui"</span>: <span class="hljs-string">"^2.3.9"</span>,
    <span class="hljs-string">"express"</span>: <span class="hljs-string">"^4.16.3"</span>,
    <span class="hljs-string">"mysql"</span>: <span class="hljs-string">"^2.15.0"</span>,
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.5.2"</span>,  <span class="hljs-comment">// 项目构建完就有了</span>
    <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^3.0.1"</span>,  <span class="hljs-comment">// 项目构建完就有了 当时"Install vue-router"选了Yes</span>
    <span class="hljs-string">"vuex"</span>: <span class="hljs-string">"^3.0.1"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    ...
    <span class="hljs-string">"node-sass"</span>: <span class="hljs-string">"^4.9.0"</span>,
    <span class="hljs-string">"sass-loader"</span>: <span class="hljs-string">"^7.0.1"</span>,
    ...
  },</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用scss/sass前必须先安装node-sass、sass-loader，否则运行npm run dev时会报错
<style lang=&quot;scss&quot; scoped>
    $bgColor: #F90;
    .blog-home {
        background: $bgColor
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">使用scss/sass前必须先安装node-sass、sass-loader，否则运行npm run dev时会报错
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
    $bgColor: #F90;
    .blog-home </span></span><span class="hljs-template-variable">{
        background: $bgColor
    }</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h1 id="articleHeader6">调用后台接口 ajax 请求数据</h1>
<p>1、打开入口js文件main.js，引入element-ui组件来搭建页面 <a href="http://element.eleme.io/#/zh-CN/component/installation" rel="nofollow noreferrer" target="_blank">element-ui 查看官网文档</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// The Vue build version to load with the `import` command</span>
<span class="hljs-comment">// (runtime-only or standalone) has been set in webpack.base.conf with an alias.</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>
Vue.use(ElementUI);
Vue.prototype.$http = axios;

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    router,
    components: { App },
    template: <span class="hljs-string">'&lt;App/&gt;'</span>
})</code></pre>
<p>其中 axios 用来完成 ajax 请求，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
axios.get('/', function() {});
axios.post('/', function() {});

// 将 axios 添加的 Vue 原型上后就不需要再在每个需要使用它的页面引入了
Vue.prototype.$http = axios;
$http.get('/', function() {});
$http.post('/', function() {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>import axios from <span class="hljs-string">'axios'</span>
axios.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{});
axios.post(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{});

<span class="hljs-comment">// 将 axios 添加的 Vue 原型上后就不需要再在每个需要使用它的页面引入了</span>
Vue.prototype.$http = axios;
$http.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{});
$http.post(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{});</code></pre>
<p>2、每个页面都相当于一个组件，文件以.vue结尾，第一次启动成功时看到的页面就是组件Hello.vue，路径src/components/Hello.vue。路由地址在 src/router/index.js 中配置，打开修改我们待会自己要用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/pages/Home'
import Blog from '@/components/pages/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/', // http://localhost:8080/#/
      name: 'Home',
      component: Home
    },
    {
      path: '/blog', // http://localhost:8080/#/blog
      name: 'Blog',
      component: Blog
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/pages/Home'</span>
<span class="hljs-keyword">import</span> Blog <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/pages/Blog'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    <span class="hljs-comment">// {</span>
    <span class="hljs-comment">//   path: '/',</span>
    <span class="hljs-comment">//   name: 'HelloWorld',</span>
    <span class="hljs-comment">//   component: HelloWorld</span>
    <span class="hljs-comment">// },</span>
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-comment">// http://localhost:8080/#/</span>
      name: <span class="hljs-string">'Home'</span>,
      <span class="hljs-attr">component</span>: Home
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/blog'</span>, <span class="hljs-comment">// http://localhost:8080/#/blog</span>
      name: <span class="hljs-string">'Blog'</span>,
      <span class="hljs-attr">component</span>: Blog
    }
  ]
})</code></pre>
<p>上面引入了三个组件HelloWorld.vue(默认)，Home.vue，Blog.vue。<br>path是页面地址，name可以随便写，component 是 import 的组件名。</p>
<p>3、在 scr/components 下新建文件夹 pages，在 pages 下新建文件 Home.vue，Blog.vue，里面按规则要求写好内容，运行工程打开页面 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/#/、<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/#/blog 即可看到相应的内容。<br>在 Blog.vue 中输入下面内容用来后面测试调用接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;&quot;>
    <el-button type=&quot;primary&quot; @click=&quot;getArticle&quot;>调用后台接口</el-button>
    <el-input v-model=&quot;inpContent&quot;></el-input>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data() {
    return {
      inpContent: 'Blog'
    }
  },
  methods: {
    getArticle() {
      this.$http.get('/api/getArticle')
        .then( (res) => {
          console.log('res', res);
          this.inpContent = res.data.data;
        })
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getArticle"</span>&gt;</span>调用后台接口<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inpContent"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'blog'</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">inpContent</span>: <span class="hljs-string">'Blog'</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    getArticle() {
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/api/getArticle'</span>)
        .then( <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'res'</span>, res);
          <span class="hljs-keyword">this</span>.inpContent = res.data.data;
        })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>4、后端使用Express做服务端提供数据接口，不了解的可以先去官网文档大致了解一下 <a href="http://expressjs.com/en/starter/installing.html" rel="nofollow noreferrer" target="_blank">Express官网</a>，在根目录my-blog下创建文件夹server用来存放后端数据库配置数据和相关方法api。  <br>server文件夹下创建文件：index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const express = require('express');
const app = express();

app.get('/api/getArticle', (req, res, next) => {
  res.json({
      data: '后台返回结果 getArticle'
    })
})

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();

app.get(<span class="hljs-string">'/api/getArticle'</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  res.json({
      data: <span class="hljs-string">'后台返回结果 getArticle'</span>
    })
})

<span class="hljs-comment">// 监听端口</span>
app.listen(<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success listen at port:3000......'</span>);</code></pre>
<p>另开一个 CMD 窗口，进入目录 D:my-blogserver</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\my-blog\server
$ node index.js
success listen at port:3000......" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>D:\my-blog\server
$ node index.js
<span class="hljs-keyword">success </span>listen at port:3000......</code></pre>
<p>5、打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/#/blog 点击按钮"调用后台接口"，会发现控制台报错  <br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/%E8%B0%83%E5%90%8E%E5%8F%B0%E6%8E%A5%E5%8F%A3%E6%8A%A5%E9%94%99_%E8%B7%A8%E5%9F%9F.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/%E8%B0%83%E5%90%8E%E5%8F%B0%E6%8E%A5%E5%8F%A3%E6%8A%A5%E9%94%99_%E8%B7%A8%E5%9F%9F.jpg" alt="调后台接口报错_跨域" title="调后台接口报错_跨域" style="cursor: pointer;"></span><br>这是因为我们工程运行的端口是8080，而后端程序运行的端口是3000，所以是跨域请求，要想请求成功，就要先在配置里设置一下代理</p>
<p>6、打开文件 /config/index.js，将 proxyTable 项设置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api': {
    target: 'http://localhost:3000/api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000/api'</span>,
    <span class="hljs-attribute">changeOrigin</span>: true,
    <span class="hljs-attribute">pathRewrite</span>: {
      <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
    }
  }
}
</code></pre>
<ul>
<li>'/api': 表示所有以 /api 为开头的请求，如我们的请求 this.$http.get('/api/getArticle')</li>
<li>target: 将所有以 /api 为开头请求转发到 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/api</li>
<li>changeOrigin: true/false, Default: false，本地会虚拟一个服务端接收你的请求并代你发送该请求(不太明白，false 试了也可以)</li>
<li>
<p>pathRewrite: 重写地址。 '^/api': '' 表示将以 /api 开头的请求的地址中的 '/api' 替换为 ''，  <br>即 path = path.replace(/^/api/, '')  <br>eg: this.&amp;dollar;http.get('/api/getArticle')  <br>path = '/api/getArticle'  <br>path = path.replace(/^/api/, '') = '/getArticle'  <br>这样目标请求就变成了 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/api/getArticle ,<br>如果不写 pathRewrite， 请求则为 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/api/api/getArticle  所以也可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000'</span>,
    <span class="hljs-attribute">changeOrigin</span>: true,
  }
}</code></pre>
<p>最后请求同样转发为 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/api/getArticle , 总之要和后台的接口路径对应上，不过还是建议加上 pathRewrite，方便同类方法调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server/index.js
const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();

app.use('/add', router);
app.use('/del', router);

router.get('/getArticle1', (req, res, next) => {
  api.getArticle(req, res, next);
})
router.get('/getArticle2', (req, res, next) => {
  api.getArticle(req, res, next);
})

router.get('/delArticle1', (req, res, next) => {
  api.getArticle(req, res, next);
})
router.get('/delArticle2', (req, res, next) => {
  api.getArticle(req, res, next);
})

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

----------------------------------------------

// congif/index.js
proxyTable: {
  '/add': {
    target: 'http://localhost:3000/add',
    changeOrigin: true,
    pathRewrite: {
        '^/add': ''
      }
  },
  '/del': {
    target: 'http://localhost:3000/del',
    changeOrigin: true,
    pathRewrite: {
        '^/del': ''
      }
  },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>// server/index.js
const path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
const express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
const router = express.Router();
const app = express();

app.use(<span class="hljs-string">'/add'</span>, router);
app.use(<span class="hljs-string">'/del'</span>, router);

router.get(<span class="hljs-string">'/getArticle1'</span>, <span class="hljs-function"><span class="hljs-params">(req, res, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  api.getArticle(req, res, <span class="hljs-built_in">next</span>);
})
router.get(<span class="hljs-string">'/getArticle2'</span>, <span class="hljs-function"><span class="hljs-params">(req, res, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  api.getArticle(req, res, <span class="hljs-built_in">next</span>);
})

router.get(<span class="hljs-string">'/delArticle1'</span>, <span class="hljs-function"><span class="hljs-params">(req, res, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  api.getArticle(req, res, <span class="hljs-built_in">next</span>);
})
router.get(<span class="hljs-string">'/delArticle2'</span>, <span class="hljs-function"><span class="hljs-params">(req, res, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  api.getArticle(req, res, <span class="hljs-built_in">next</span>);
})

// 监听端口
app.listen(<span class="hljs-number">3000</span>);
console.log(<span class="hljs-string">'success listen at port:3000......'</span>);

<span class="hljs-comment">----------------------------------------------</span>

// congif/index.js
<span class="hljs-name">proxyTable</span>: {
  <span class="hljs-string">'/add'</span>: {
    <span class="hljs-name">target</span>: <span class="hljs-string">'http://localhost:3000/add'</span>,
    <span class="hljs-name">changeOrigin</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-name">pathRewrite</span>: {
        <span class="hljs-string">'^/add'</span>: <span class="hljs-string">''</span>
      }
  },
  <span class="hljs-string">'/del'</span>: {
    <span class="hljs-name">target</span>: <span class="hljs-string">'http://localhost:3000/del'</span>,
    <span class="hljs-name">changeOrigin</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-name">pathRewrite</span>: {
        <span class="hljs-string">'^/del'</span>: <span class="hljs-string">''</span>
      }
  },
},</code></pre>
</li>
</ul>
<p>7、正确返回数据<br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/%E5%90%8E%E5%8F%B0%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/%E5%90%8E%E5%8F%B0%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">数据库存取数据（Mysql）</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mysql可视化工具我用的是Navicat For Mysql，新建连接，数据库，数据表，查询等都可在其中完成，当然熟悉命令的都可以在cmd中命令完成 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">Mysql可视化工具我用的是Navicat For Mysql，新建连接，数据库，数据表，查询等都可在其中完成，当然熟悉命令的都可以在<span class="hljs-keyword">cmd</span><span class="bash">中命令完成 </span></code></pre>
<h3 id="articleHeader8">Mysql 新建连接</h3>
<p><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/%E6%96%B0%E5%BB%BA%E6%95%B0%E6%8D%AE%E5%BA%93Mysql.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/%E6%96%B0%E5%BB%BA%E6%95%B0%E6%8D%AE%E5%BA%93Mysql.jpg" alt="新建数据库" title="新建数据库" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">连接数据库</h3>
<p>在 src/server 下新建文件 db.js，写入下面代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mysql = require('mysql');

const mysqlConfig = {
  host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
  user: 'root', 
  password: '8023', // root 密码
  database: 'myBlog', // 数据库名
  port: '3306'
}
const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
  multipleStatements: true    // 多语句查询
});

var setValue = function() {
  pool.getConnection((err, connection) => {
    var sql = 'INSERT INTO test(id, name) VALUES (1, &quot;blog&quot;)'
    connection.query(sql, (err, result) => {
        console.log(result);
        connection.release();
    })
  })
}

setValue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);

<span class="hljs-keyword">const</span> mysqlConfig = {
  <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,  <span class="hljs-comment">// 新建数据库连接时的 主机名或ID地址 内容</span>
  user: <span class="hljs-string">'root'</span>, 
  <span class="hljs-attr">password</span>: <span class="hljs-string">'8023'</span>, <span class="hljs-comment">// root 密码</span>
  database: <span class="hljs-string">'myBlog'</span>, <span class="hljs-comment">// 数据库名</span>
  port: <span class="hljs-string">'3306'</span>
}
<span class="hljs-keyword">const</span> pool = mysql.createPool({
  <span class="hljs-attr">host</span>: mysqlConfig.host,
  <span class="hljs-attr">user</span>: mysqlConfig.user,
  <span class="hljs-attr">password</span>: mysqlConfig.password,
  <span class="hljs-attr">database</span>: mysqlConfig.database,
  <span class="hljs-attr">port</span>: mysqlConfig.port,
  <span class="hljs-attr">multipleStatements</span>: <span class="hljs-literal">true</span>    <span class="hljs-comment">// 多语句查询</span>
});

<span class="hljs-keyword">var</span> setValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'INSERT INTO test(id, name) VALUES (1, "blog")'</span>
    connection.query(sql, (err, result) =&gt; {
        <span class="hljs-built_in">console</span>.log(result);
        connection.release();
    })
  })
}

setValue();</code></pre>
<p>引入包 mysql，创建连接池 mysql.createPool，sql语法和在命令中使用的形同，拼成字符串即可，在 server 目录下运行 db.js 文件，刷新数据库<br><span class="img-wrap"><img data-src="http://otr9a8wg0.bkt.clouddn.com/dbSetValue.jpg" src="https://static.alili.techhttp://otr9a8wg0.bkt.clouddn.com/dbSetValue.jpg" alt="添加数据" title="添加数据" style="cursor: pointer;"></span></p>
<p>同理可增删查改数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 查询数据，？ 的值填入 connection.jquery 的第二个参数（数组）中
// WHERE id = ? AND name = ? ---> connetion.query(sql, [1, &quot;blog&quot;], () => )
var getValue = function() {
  pool.getConnection((err, connection) => {
    var sql = 'SELECT * FROM test WHERE id = ?'
    connection.query(sql, [1], (err, result) => {
        console.log(result);
        connection.release();
    })
  })
}
getValue();

/*
$ node db.js
[ RowDataPacket { id: '1', name: 'blog' } ]
*/

// 更新数据
var updValue = function() {
  pool.getConnection((err, connection) => {
    var sql = 'UPDATE test SET name = ? WHERE id = ?'
    connection.query(sql, [22, 1], (err, result) => {
        console.log(result);
        connection.release();
    })
  })
}
updValue();

// 删除数据
var delValue = function() {
  pool.getConnection((err, connection) => {
    var sql = 'DELETE FROM test WHERE id = ?'
    connection.query(sql, [1], (err, result) => {
        console.log(result);
        connection.release();
    })
  })
}
delValue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 查询数据，？ 的值填入 connection.jquery 的第二个参数（数组）中</span>
<span class="hljs-comment">// WHERE id = ? AND name = ? ---&gt; connetion.query(sql, [1, "blog"], () =&gt; )</span>
<span class="hljs-keyword">var</span> getValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'SELECT * FROM test WHERE id = ?'</span>
    connection.query(sql, [<span class="hljs-number">1</span>], (err, result) =&gt; {
        <span class="hljs-built_in">console</span>.log(result);
        connection.release();
    })
  })
}
getValue();

<span class="hljs-comment">/*
$ node db.js
[ RowDataPacket { id: '1', name: 'blog' } ]
*/</span>

<span class="hljs-comment">// 更新数据</span>
<span class="hljs-keyword">var</span> updValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'UPDATE test SET name = ? WHERE id = ?'</span>
    connection.query(sql, [<span class="hljs-number">22</span>, <span class="hljs-number">1</span>], (err, result) =&gt; {
        <span class="hljs-built_in">console</span>.log(result);
        connection.release();
    })
  })
}
updValue();

<span class="hljs-comment">// 删除数据</span>
<span class="hljs-keyword">var</span> delValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'DELETE FROM test WHERE id = ?'</span>
    connection.query(sql, [<span class="hljs-number">1</span>], (err, result) =&gt; {
        <span class="hljs-built_in">console</span>.log(result);
        connection.release();
    })
  })
}
delValue();</code></pre>
<p>结合前面的 ajax 请求数据，我们便可以轻松的对数据库中的数据进行操作了，下面来模块化这些操作。</p>
<h3 id="articleHeader10">模块化后端代码</h3>
<p>在 /server 下创建文件</p>
<ul>
<li>db.js 数据库连接配置</li>
<li>api.js 连接数据库，各种方法实现</li>
<li>sqlMap.js sql语句</li>
<li>router.js 后端 express 路由配置</li>
<li>index.js 后端入口文件，启动后端服务</li>
</ul>
<p>1、db.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数据库连接配置
module.exports = {
  mysql: {
    host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
    user: 'root', 
    password: '8023', // root 密码
    database: 'myBlog', // 数据库名
    port: '3306'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 数据库连接配置</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">mysql</span>: {
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,  <span class="hljs-comment">// 新建数据库连接时的 主机名或ID地址 内容</span>
    user: <span class="hljs-string">'root'</span>, 
    <span class="hljs-attr">password</span>: <span class="hljs-string">'8023'</span>, <span class="hljs-comment">// root 密码</span>
    database: <span class="hljs-string">'myBlog'</span>, <span class="hljs-comment">// 数据库名</span>
    port: <span class="hljs-string">'3306'</span>
  }
}</code></pre>
<p>2、api.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  setValue(req, res, next) {
    console.log(req.body);
    var id = req.body.id, name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);
<span class="hljs-keyword">const</span> dbConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./db'</span>);
<span class="hljs-keyword">const</span> sqlMap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./sqlMap'</span>);

<span class="hljs-keyword">const</span> pool = mysql.createPool({
  <span class="hljs-attr">host</span>: dbConfig.mysql.host,
  <span class="hljs-attr">user</span>: dbConfig.mysql.user,
  <span class="hljs-attr">password</span>: dbConfig.mysql.password,
  <span class="hljs-attr">database</span>: dbConfig.mysql.database,
  <span class="hljs-attr">port</span>: dbConfig.mysql.port,
  <span class="hljs-attr">multipleStatements</span>: <span class="hljs-literal">true</span>    <span class="hljs-comment">// 多语句查询</span>
});

<span class="hljs-built_in">module</span>.exports = {
  getValue(req, res, next) {
    <span class="hljs-keyword">var</span> id = req.query.id;
    pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
      <span class="hljs-keyword">var</span> sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) =&gt; {
          res.json(result);
          connection.release();
      })
    })
  },
  setValue(req, res, next) {
    <span class="hljs-built_in">console</span>.log(req.body);
    <span class="hljs-keyword">var</span> id = req.body.id, name = req.body.name;
    pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
      <span class="hljs-keyword">var</span> sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) =&gt; {
          res.json(result);
          connection.release();
      })
    })
  }
}
</code></pre>
<p>3、sqlMap.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sqlMap = {
  getValue: 'SELECT * FROM test WHERE id = ?',
  setValue: 'UPDATE test SET name = ? WHERE id = ?'
}

module.exports = sqlMap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sqlMap = {
  <span class="hljs-attr">getValue</span>: <span class="hljs-string">'SELECT * FROM test WHERE id = ?'</span>,
  <span class="hljs-attr">setValue</span>: <span class="hljs-string">'UPDATE test SET name = ? WHERE id = ?'</span>
}

<span class="hljs-built_in">module</span>.exports = sqlMap;</code></pre>
<p>4、router.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> router = express.Router();
<span class="hljs-keyword">const</span> api = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./api'</span>);

router.get(<span class="hljs-string">'/getValue'</span>, (req, res, next) =&gt; {
  api.getValue(req, res, next);
});

router.post(<span class="hljs-string">'/setValue'</span>, (req, res, next) =&gt; {
  api.setValue(req, res, next);
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<p>5、index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const app = express();

app.use(bodyParser.json());

// 后端api路由
app.use('/api', routerApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routerApi = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./router'</span>);
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>); <span class="hljs-comment">// post 数据是需要</span>
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();

app.use(bodyParser.json());

<span class="hljs-comment">// 后端api路由</span>
app.use(<span class="hljs-string">'/api'</span>, routerApi);

<span class="hljs-comment">// 监听端口</span>
app.listen(<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success listen at port:3000......'</span>);</code></pre>
<p>在 /scr/components/pages/Blog.vue 文件中写入下面代码测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;&quot;>
    <el-input v-model=&quot;inpContent&quot;></el-input>
    <el-button type=&quot;primary&quot; @click=&quot;getValue&quot;>获取数据</el-button>
    <el-button type=&quot;primary&quot; @click=&quot;setValue&quot;>添加数据</el-button>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data() {
    return {
      inpContent: ''
    }
  },
  methods: {
    getValue() {
      // axios.get('/', {params: ''})
      this.$http.get('/api/getValue', {
        params: {id: 1}
      }).then( (res) => {
        console.log('res', res);
        this.inpContent = res.data[0].name;
      })
    },
    setValue() {
      // axios.post('/', {})
      this.$http.post('/api/setValue', {
        id: 1, name: this.inpContent
      }).then( (res) => {
        console.log('res', res);
      })
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
  &lt;div class=""&gt;
    &lt;el-input v-model="inpContent"&gt;&lt;/el-input&gt;
    &lt;el-button type="primary" @click="getValue"&gt;获取数据&lt;/el-button&gt;
    &lt;el-button type="primary" @click="setValue"&gt;添加数据&lt;/el-button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'blog',
  data() {
    return {
      inpContent: ''
    }
  },
  methods: {
    getValue() {
      // axios.get('/', {params: ''})
      this.$http.get('/api/getValue', {
        params: {id: 1}
      }).then( (res) =&gt; {
        console.log('res', res);
        this.inpContent = res.data[0].name;
      })
    },
    setValue() {
      // axios.post('/', {})
      this.$http.post('/api/setValue', {
        id: 1, name: this.inpContent
      }).then( (res) =&gt; {
        console.log('res', res);
      })
    }
  }
}
&lt;/script&gt;</code></pre>
<ul>
<li>get：第二个参数（可选）是一个对象，以 params 为属性，将条件数据传到后台，后台通过 req.query 可以获得 params 对应的值</li>
<li>post：第二个参数（可选）也是一个对象，属性任意，将提交数据传到后台，后台通过 req.body 可以获得这个对象，req.body 数据的解析需要用到包 body-parser，在 index.js 中引入 use 即可。</li>
</ul>
<p>打开两个命令窗口分别运行工程，运行后端服务，即可进行测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\my-blog
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">D:\my-blog
$ npm run dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\my-blog\server
$ node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">D:\my-blog\server
$ node index.js</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+node+mysql搭建个人博客（一）

## 原文链接
[https://segmentfault.com/a/1190000012186439](https://segmentfault.com/a/1190000012186439)

