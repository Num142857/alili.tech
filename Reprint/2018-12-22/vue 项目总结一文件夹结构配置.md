---
title: 'vue 项目总结一文件夹结构配置' 
date: 2018-12-22 2:30:11
hidden: true
slug: sxc9z06ryjc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>之前一段时间都在使用 vue 开发后台管理系统，在摸索的过程中对 vue 本身和模块化、规范化开发有了更深的认知，现在记录下来，希望对其他需要开发项目的人有帮助。</blockquote>
<h2 id="articleHeader0">项目配置</h2>
<p>首先，在确定好使用的框架和组件库后，先要大致了解它们，做到文档基本熟悉。本次开发使用到的有： vue ， vuex ， axios ， elementUI 。 </p>
<p>然后可以按官方指引，使用 vue-cli 搭建 vue 的项目，在项目里按照上面的文档尝试修改，加深理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装依赖库，建议指定 vue 和 element 版本，避免版本升级带来意料之外的 bug

$ npm install vue@2.1.6  element-ui@1.4.6 vuex axios

#全局安装脚手架

$ npm install -g vue-cli 

# 创建一个基于 webpack 模板的新项目my-project

$ vue init webpack my-project

# 进入项目目录

$ cd my-project

# 安装依赖

$ npm install

# 运行项目

$ npm run dev

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 安装依赖库，建议指定 vue 和 element 版本，避免版本升级带来意料之外的 bug</span>

<span class="hljs-variable">$ </span>npm install vue<span class="hljs-variable">@2</span>.<span class="hljs-number">1.6</span>  element-ui<span class="hljs-variable">@1</span>.<span class="hljs-number">4.6</span> vuex axios

<span class="hljs-comment">#全局安装脚手架</span>

<span class="hljs-variable">$ </span>npm install -g vue-cli 

<span class="hljs-comment"># 创建一个基于 webpack 模板的新项目my-project</span>

<span class="hljs-variable">$ </span>vue init webpack my-project

<span class="hljs-comment"># 进入项目目录</span>

<span class="hljs-variable">$ </span>cd my-project

<span class="hljs-comment"># 安装依赖</span>

<span class="hljs-variable">$ </span>npm install

<span class="hljs-comment"># 运行项目</span>

<span class="hljs-variable">$ </span>npm run dev

</code></pre>
<p>运行之后，看到以下页面表明项目环境搭建成功：</p>
<p><span class="img-wrap"><img data-src="/img/bVZ9Rq?w=700&amp;h=575" src="https://static.alili.tech/img/bVZ9Rq?w=700&amp;h=575" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1">项目结构</h2>
<p>搭建成功后，使用编辑器打开项目目录，大致是这样的结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVZ9TA?w=262&amp;h=392" src="https://static.alili.tech/img/bVZ9TA?w=262&amp;h=392" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>相关文件和文件夹的含义：</p>
<p><strong>build 文件夹</strong>: 里面是对 webpack 开发和打包的相关设置，包括入口文件、输出文件、使用的模块等；</p>
<p><strong>config 文件夹</strong>: 主要是指定开发和打包中的静态资源路径、要压缩的文件类型、开发使用的端口号、开发使用虚拟服务器跨域请求 api 等。</p>
<p><strong>node_modules</strong>: 项目的依赖库；</p>
<p><strong>src 文件夹</strong>： 我们主要操作的地方，组件的增加修改等都在这个文件夹里操作，下文会有详细介绍；</p>
<p><strong>static 文件夹</strong>: 静态资源文件夹，放置不会变动的资源，直接被复制到最终的打包目录（默认是dist/static）下；</p>
<p><strong>.babelrc</strong>: 使用 babel 的配置文件，用来设置转码规则和插件；</p>
<p><strong>.editorconfig</strong>: 代码的规范文件，规定使用空格或 tab 缩进，缩进的长度是两位还是四位之类的代码风格，使用的话需要在编辑器里下载对应的插件；</p>
<p><strong>.eslintignore</strong>: 指定 eslint 忽略的文件；</p>
<p><strong>.eslintrc</strong>: 配置 eslint 的检测规则，强制按照规则书写代码；</p>
<p><strong>.gitignore</strong>: 指定 git 忽略的文件，所有 git 操作均不会对其生效；</p>
<p><strong>.postcssrc</strong>: 指定使用的 css 预编译器，里面默认配置了 autoprefixer ，自动补全浏览器前缀；</p>
<p><strong>favicon.ico</strong>: 浏览器标签页 title 旁边的小图标，这是需要我们自己粘贴过来的；</p>
<p><strong>index.html</strong>: 首页文件，项目运行的时候，会自动将我们在 src 文件夹里生成的组件插入这个文件里；</p>
<p><strong>LICENSE</strong>: 项目声明的 license；</p>
<p><strong>package-lock.jso</strong>n: 当 node_modules 或 package.json 发生变化时自动生成的文件。这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新；</p>
<p><strong>package.json</strong>: 指定项目开发和生成环境中需要使用的依赖库；</p>
<p><strong>README.md</strong>: 相当于是一个备注文件，对项目开发过程中需要注意的地方进行一些说明。</p>
<hr>
<h2 id="articleHeader2">src 文件夹结构</h2>
<p>src 文件夹里的文件夹设置是灵活的，可以根据自己的习惯进行，不必雷同。下面是这次项目的结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVZ9U3?w=260&amp;h=223" src="https://static.alili.tech/img/bVZ9U3?w=260&amp;h=223" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>assets</strong>: 放置静态资源，包括公共的 css 文件、 js 文件、iconfont 字体文件、img 图片文件 以及其他资源类文件。之所以强调是公共的 css 文件，是因为要在组件的 css 标签里加入 ‘scoped‘ 标记，将其作用范围限制在此组件以及调用它的父级组件中，避免污染全局样式；</p>
<p><strong>components</strong>: 放置通用模块组件。项目里总会有一些复用的组件，例如弹出框、发送手机验证码、图片上传等，将它们作为通用组件，避免重复工作；</p>
<p><strong>http</strong>: 放置与后台 api 相关的文件。这里面有 axios 库的实例配置文件、使用配置的 axios 实例接入 api 获取数据的函数的集合的文件；</p>
<p><strong>mixins</strong>: 放置混合选项的文件。具体来说，相当于是公用函数的集合，在组件中引用时，可以作用于组件而不必书写重复的方法；</p>
<p><strong>pages</strong>: 放置主要页面的组件。例如登录页、用户信息页等。通常是这里的组件本身写入一些结构，再引入通用模块组件，形成完整的页面；</p>
<p><strong>router</strong>: 放置路由设置文件，指定路由对应的组件；</p>
<p><strong>store</strong>: 放置 vuex 需要的状态关联文件，设置公共的 state、mutations 等；</p>
<p><strong>App.vue</strong>: 入口组件，pages 里的组件会被插入此组件中，此组件再插入 index.html 文件里，形成单页面应用；</p>
<p><strong>main.js</strong>: 入口 js 文件，影响全局，作用是引入全局使用的库、公共的样式和方法、设置路由等。</p>
<hr>
<blockquote>对文件夹配置的总结先到此为止，下一篇文章会是对 src 文件夹里具体文件的配置和例子总结，有需要的可以去 <a href="https://segmentfault.com/a/1190000012410259?_ea=2993723">https://segmentfault.com/a/11...</a> 看看。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 项目总结一文件夹结构配置

## 原文链接
[https://segmentfault.com/a/1190000012392160](https://segmentfault.com/a/1190000012392160)

