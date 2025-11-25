---
title: 'Vue2.0 新手完全填坑攻略—从环境搭建到发布——Jinkey 原创' 
date: 2019-02-02 2:30:11
hidden: true
slug: g9ywrikwdxo
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124473" src="https://static.alili.tech/img/remote/1460000007124473" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>本文作者 Jinkey（微信公众号 jinkey-love，官网 <a href="https://jinkey.ai" rel="nofollow noreferrer" target="_blank">https://jinkey.ai</a>）<br>文章允许非篡改署名转载，删除或修改本段版权信息转载的，视为侵犯知识产权，我们保留追求您法律责任的权利，特此声明！<br>感谢 <a href="https://github.com/showonne" rel="nofollow noreferrer" target="_blank">showonne</a>、<a href="https://github.com/yubang" rel="nofollow noreferrer" target="_blank">yubang</a> 技术指导<br><strong>Demo 地址:</strong><br><a href="http://demo.jinkey.io/vue2" rel="nofollow noreferrer" target="_blank">http://demo.jinkey.io/vue2</a><br><strong>源码:</strong><br><a href="https://github.com/Jinkeycode/vue2-example" rel="nofollow noreferrer" target="_blank">https://github.com/Jinkeycode/vue2-example</a><br><strong>原文链接</strong><br><a href="https://jinkey.ai/post/tech/vue2.0-xin-shou-wan-quan-tian-keng-gong-lue-cong-huan-jing-da-jian-dao-fa-bu" rel="nofollow noreferrer" target="_blank">https://jinkey.ai/post/tech/vue2.0-xin-shou-wan-quan-tian-keng-gong-lue-cong-huan-jing-da-jian-dao-fa-bu</a></p></blockquote>
<h1 id="articleHeader0">什么是 Vue</h1>
<p>Vue 是一个前端框架，特点是<br><strong>数据绑定</strong></p>
<blockquote><p>比如你改变一个输入框 Input 标签的值，会<strong>自动同步</strong>更新到页面上其他绑定该输入框的组件的值</p></blockquote>
<p>￼<br><span class="img-wrap"><img data-src="/img/remote/1460000007124474" src="https://static.alili.tech/img/remote/1460000007124474" alt="数据绑定" title="数据绑定" style="cursor: pointer;"></span></p>
<p><strong>组件化</strong></p>
<blockquote><p>页面上小到一个按钮都可以是一个单独的文件.vue，这些小组件直接可以像乐高积木一样通过互相引用而组装起来</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124475" src="https://static.alili.tech/img/remote/1460000007124475" alt="组件化" title="组件化" style="cursor: pointer;"></span><br>￼</p>
<h1 id="articleHeader1">Vue2.0 推荐开发环境</h1>
<p>￼<br><span class="img-wrap"><img data-src="/img/remote/1460000007124476" src="https://static.alili.tech/img/remote/1460000007124476" alt="开发环境解释" title="开发环境解释" style="cursor: pointer;"></span></p>
<p>Homebrew 1.0.6(Mac)、Node.js 6.7.0、npm 3.10.3、webpack 1.13.2、vue-cli 2.4.0、Atom 1.10.2</p>
<h1 id="articleHeader2">安装环境</h1>
<p>打开终端运行以下命令</p>
<h2 id="articleHeader3">安装brew</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/usr/bin/ruby -e &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">/usr/</span>bin<span class="hljs-regexp">/ruby -e "$(curl -fsSL https:/</span><span class="hljs-regexp">/raw.githubusercontent.com/</span>Homebrew<span class="hljs-regexp">/install/m</span>aster<span class="hljs-regexp">/install)"</span></code></pre>
<h2 id="articleHeader4">安装 nodejs</h2>
<blockquote><p>brew install nodejs</p></blockquote>
<p>用 npm install npm@3.10.3 更新 npm 版本报错:</p>
<blockquote><p>(node:42) fs: re-evaluating native module sources is not supported.</p></blockquote>
<p>解决办法:<br>在官网下载6.70的安装包再安装一次(刚刚相当于帮你配置好环境变量，现在再安装一次升级到最新的 npm)</p>
<blockquote><ul><li><p>好像以前官网的安装包不会自动配置环境变量的，由于我电脑上之前安装过 nodejs 所以环境变量已经配置好了，不知道现在的安装包会不会自动配置环境变量。</p></li></ul></blockquote>
<p>Windows 下直接下载安装包即可</p>
<h2 id="articleHeader5">获取nodejs模块安装目录访问权限</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo chmod -R 777 /usr/local/lib/node_modules/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">sudo chmod -R <span class="hljs-number">777</span> /usr/local/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node_modules</span>/</span></code></pre>
<h2 id="articleHeader6">安装淘宝镜像</h2>
<blockquote><p>npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a></p></blockquote>
<h2 id="articleHeader7">安装webpack</h2>
<blockquote><p>cnpm install webpack -g</p></blockquote>
<h2 id="articleHeader8">安装vue脚手架</h2>
<blockquote><p>npm install vue-cli -g</p></blockquote>
<h2 id="articleHeader9">在硬盘上找一个文件夹放工程用的，在终端中进入该目录</h2>
<p>Mac</p>
<blockquote><p>cd 目录路径</p></blockquote>
<h2 id="articleHeader10">根据模板创建项目</h2>
<blockquote><p>vue init webpack-simple 工程名字&lt;工程名字不能用中文&gt;</p></blockquote>
<p>或者创建 vue1.0 的项目</p>
<blockquote><p>vue init webpack-simple#1.0 工程名字&lt;工程名字不能用中文&gt;</p></blockquote>
<p>会有一些初始化的设置，如下输入:<br><code>Target directory exists. Continue? (Y/n) </code>直接回车默认(然后会下载 vue2.0模板，这里可能需要连代理)<br><code>Project name (vue-test) </code>直接回车默认<br><code>Project description (A Vue.js project)</code>  直接回车默认<br><code>Author</code> 写你自己的名字</p>
<h2 id="articleHeader11">cd 命令进入创建的工程目录</h2>
<p>工程目录如图所示:<br><span class="img-wrap"><img data-src="/img/remote/1460000007124477" src="https://static.alili.tech/img/remote/1460000007124477" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader12">安装项目依赖</h1>
<p>一定要从官方仓库安装，npm 服务器在国外所以这一步安装速度会很慢。</p>
<blockquote><p>npm install</p></blockquote>
<p><strong>不要从国内镜像cnpm安装</strong>(会导致后面缺了很多依赖库)</p>
<blockquote><p>cnpm install</p></blockquote>
<h2 id="articleHeader13">安装 vue 路由模块<code>vue-router</code>和网络请求模块<code>vue-resource</code>
</h2>
<blockquote><p>cnpm install vue-router vue-resource --save</p></blockquote>
<h2 id="articleHeader14">启动项目</h2>
<blockquote><p>npm run dev</p></blockquote>
<h3 id="articleHeader15"><strong>填坑(以下坑可能由于 vue2.0 导致其他相关编译打包工具没更新导致的)</strong></h3>
<blockquote><p><strong>【重点】后来发现这些坑是由于 npm 不是最新的版本3.10.2， 用 npm 3.9.5就会出现以下坑</strong><br>解决办法: 请运行以下命令<br><strong>npm update -g</strong></p></blockquote>
<p>报错</p>
<blockquote><p>Error: Cannot find module 'opn'<br>Error: Cannot find module 'webpack-dev-middleware'<br>Error: Cannot find module 'express'<br>Error: Cannot find module 'compression'<br>Error: Cannot find module 'sockjs'<br>Error: Cannot find module 'spdy'<br>Error: Cannot find module 'http-proxy-middleware'<br>Error: Cannot find module 'serve-index'</p></blockquote>
<p>如果你用的是老版本的 vue-cli 还可能报其他错误，需要更新一下 vue-cli</p>
<blockquote><p>npm update vue-cli</p></blockquote>
<p>然后可以查看一下当前全局 vue-cli 的版本</p>
<blockquote><p>npm view vue-cli</p></blockquote>
<p>安装一下这个依赖到工程开发环境</p>
<blockquote><p>cnpm install opn --save-dev<br>cnpm install webpack-dev-middleware --save-dev<br>cnpm install express --save-dev<br>cnpm install compression --save-dev<br>cnpm install sockjs --save-dev<br>cnpm install spdy --save-dev<br>cnpm install http-proxy-middleware --save-dev<br>cnpm install serve-index --save-dev<br>cnpm install connect-history-api-fallback --save-dev</p></blockquote>
<p>再启动项目，报错</p>
<blockquote><p>ERROR in ./src/main.js</p></blockquote>
<p>Module build failed: Error: Cannot find module 'babel-runtime/helpers/typeof'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="at Function.Module._resolveFilename (module.js:440:15)
at Function.Module._load (module.js:388:25)
at Module.require (module.js:468:17)
at require (internal/module.js:20:19)
at Object.<anonymous> (/Volumes/MacStorage/Coding/Web/vue-test/node_modules/.6.17.0@babel-core/lib/transformation/file/index.js:6:16)
at Module._compile (module.js:541:32)
at Object.Module._extensions..js (module.js:550:10)
at Module.load (module.js:458:32)
at tryModuleLoad (module.js:417:12)
at Function.Module._load (module.js:409:3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>at Function<span class="hljs-selector-class">.Module</span>._resolveFilename (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">440</span>:<span class="hljs-number">15</span>)
at Function<span class="hljs-selector-class">.Module</span>._load (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">388</span>:<span class="hljs-number">25</span>)
at Module<span class="hljs-selector-class">.require</span> (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">468</span>:<span class="hljs-number">17</span>)
at require (internal/module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">20</span>:<span class="hljs-number">19</span>)
at Object.&lt;anonymous&gt; (/Volumes/MacStorage/Coding/Web/vue-test/node_modules/.<span class="hljs-number">6.17</span>.<span class="hljs-number">0</span>@babel-core/lib/transformation/file/index<span class="hljs-selector-class">.js</span>:<span class="hljs-number">6</span>:<span class="hljs-number">16</span>)
at Module._compile (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">541</span>:<span class="hljs-number">32</span>)
at Object<span class="hljs-selector-class">.Module</span>._extensions.<span class="hljs-selector-class">.js</span> (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">550</span>:<span class="hljs-number">10</span>)
at Module<span class="hljs-selector-class">.load</span> (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">458</span>:<span class="hljs-number">32</span>)
at tryModuleLoad (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">417</span>:<span class="hljs-number">12</span>)
at Function<span class="hljs-selector-class">.Module</span>._load (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">409</span>:<span class="hljs-number">3</span>)</code></pre>
<p>@ multi main<br>ERROR in ./~/.2.1.0-beta.8@webpack-dev-server/client/socket.js<br>Module not found: Error: Can't resolve 'sockjs-client' in '/Volumes/MacStorage/Coding/Web/vue-test/node_modules/.2.1.0-beta.8@webpack-dev-server/client'<br> @ ./~/.2.1.0-beta.8@webpack-dev-server/client/socket.js 1:13-37<br> @ ./~/.2.1.0-beta.8@webpack-dev-server/client?<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a><br> @ multi main</p>
<p>安装一下 babel-runtime</p>
<blockquote><p>cnpm install babel-helpers --save-dev</p></blockquote>
<p>启动项目，再次报错</p>
<blockquote><p>Module build failed: Error: Cannot find module 'babel-helpers'<br>Module build failed: Error: Cannot find module 'babel-traverse'<br>Module build failed: Error: Cannot find module 'json5'<br>Module build failed: Error: Cannot find module 'babel-generator'<br>Module build failed: Error: Cannot find module 'detect-indent'<br>Module build failed: Error: Cannot find module 'jsesc'</p></blockquote>
<p>找不到依赖那就再安装一下</p>
<blockquote><p>cnpm install babel-helpers --save-dev<br>cnpm install babel-traverse --save-dev<br>cnpm install json5 --save-dev<br>.<strong>..不写了，请把全部把旧的环境全部清除，更新到最新版本</strong></p></blockquote>
<h3 id="articleHeader16">解决办法概述</h3>
<p>遇到</p>
<blockquote><p>Module build failed: Error: Cannot find module '模块名'</p></blockquote>
<p>那就安装</p>
<blockquote><p>cnpm install 模块名 --save-dev(关于环境的，表现为npm run dev 启动不了)<br>cnpm install 模块名 --save(关于项目的，比如main.js，表现为npm run dev 成功之后控制台报错)</p></blockquote>
<p>比如escape-string-regexp、strip-ansi、has-ansi、is-finite、emojis-list</p>
<h3 id="articleHeader17">终于可以启动项目了</h3>
<p>输入完命令会自动启动浏览器，如果默认打开 IE 不行</p>
<blockquote><p>npm run dev</p></blockquote>
<p>自动启动浏览器就会看到这 帅帅的界面了。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124478" src="https://static.alili.tech/img/remote/1460000007124478" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader18">开始 Vue 之旅</h1>
<h2 id="articleHeader19">打开 IDE</h2>
<p>推荐 Atom 打开项目，需要安装 Vue 语法高亮的插件<br><span class="img-wrap"><img data-src="/img/remote/1460000007124479" src="https://static.alili.tech/img/remote/1460000007124479" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader20">使用官网文档学习基础</h2>
<p>我们来看官网的一个例子，(中文文档请自行上网搜索)<br>￼<span class="img-wrap"><img data-src="/img/remote/1460000007124480" src="https://static.alili.tech/img/remote/1460000007124480" alt="" title="" style="cursor: pointer;"></span></p>
<p>打开 工程目录下的 App.vue<br>template 写 html，script写 js，style写样式<br><span class="img-wrap"><img data-src="/img/remote/1460000007124481" src="https://static.alili.tech/img/remote/1460000007124481" alt="" title="" style="cursor: pointer;"></span></p>
<p>为了方便叙述，我们把官网例子写在同一个组件内<br>这里有两个坑:<br><strong>第一</strong>。一个组件下只能有一个并列的 div，可以这么写，所以复制官网示例的时候只要复制 div 里面的内容就好。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124482" src="https://static.alili.tech/img/remote/1460000007124482" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是不能这样写:<br>￼<span class="img-wrap"><img data-src="/img/remote/1460000007124483" src="https://static.alili.tech/img/remote/1460000007124483" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>第二</strong>。数据要写在 return 里面而不是像文档那样子写<br><span class="img-wrap"><img data-src="/img/remote/1460000007124484" src="https://static.alili.tech/img/remote/1460000007124484" alt="" title="" style="cursor: pointer;"></span></p>
<p>错误的写法:<br><span class="img-wrap"><img data-src="/img/remote/1460000007124485" src="https://static.alili.tech/img/remote/1460000007124485" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样子可以自己啃完官网文档组件之前的部分了。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124486" src="https://static.alili.tech/img/remote/1460000007124486" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader21">来玩玩组件</h2>
<p>前面讲得基本上都是各种常用组件的数据绑定，下面还得说说的是 Vue 的组件的使用。<br>在工程目录<code>/src</code>下创建<code>component</code>文件夹，并在<code>component</code>文件夹下创建一个 <code>firstcomponent.vue</code>并写仿照 App.vue 的格式和前面学到的知识写一个组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;firstcomponent&quot;>
    <h1>I am a title.</h1>
    <a> written by "{{" author "}}" </a>
  </div>
</template>

<script type=&quot;text/javascript&quot;>
export default {
  data () {
    return {
      author: &quot;微信公众号 jinkey-love&quot;
    }
  }
}
</script>

<style>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"firstcomponent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>I am a title.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span> written by "{{" author "}}" <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">author</span>: <span class="hljs-string">"微信公众号 jinkey-love"</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>duang... 不能按官网文档那样子叫我做就做，我得先试试再告诉你，我做完效果是这样子的，希望观众做完也是这样子。(迷之微笑 )<br><span class="img-wrap"><img data-src="/img/remote/1460000007124487" src="https://static.alili.tech/img/remote/1460000007124487" alt="" title="" style="cursor: pointer;"></span></p>
<p>然后在 App.vue 使用组件 ( 因为在 <code>index.html</code> 里面定义了&lt;div id="app"&gt;&lt;/div&gt;所以就以这个组件作为主入口，方便 )<br><strong>第一步，引入</strong>。在<code>&lt;script&gt;&lt;/script&gt;</code>标签内的第一行写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import firstcomponent from './component/firstcomponent.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> firstcomponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./component/firstcomponent.vue'</span></code></pre>
<p><strong>第二步，注册</strong>。在<code>&lt;script&gt;&lt;/script&gt;</code>标签内的 data 代码块后面加上 components: { firstcomponent }。<strong>记得中间加英文逗号!!!</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  components: { firstcomponent }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello Vue!'</span>
    }
  },
  <span class="hljs-attr">components</span>: { firstcomponent }
}</code></pre>
<p><strong>第三步，使用</strong>。<br>在<code>&lt;template&gt;&lt;/template&gt;</code>内加上&lt;firstcomponent&gt;&lt;/firstcomponent&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <h1>"{{" msg "}}"</h1>
    <firstcomponent></firstcomponent>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">firstcomponent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">firstcomponent</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>完成后的代码：<br><span class="img-wrap"><img data-src="/img/remote/1460000007124488" src="https://static.alili.tech/img/remote/1460000007124488" alt="" title="" style="cursor: pointer;"></span></p>
<p>这时候看看浏览器上的 <code>http://localhost:8080/</code> 页面(之前打开过就会自动刷新)，如果你没看到效果是因为你没有对 <code>App.vue</code> 和 <code>firstcomponent.vue</code> 进行保存操作，保存后页面会自动刷新。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124489" src="https://static.alili.tech/img/remote/1460000007124489" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader22">使用路由搭建单页应用</h2>
<p>之前已经通过命令安装了vue-router</p>
<blockquote><p>cnpm install vue-router --save</p></blockquote>
<p>在<code>webpack.config.js</code>加入别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">resolve: {
    <span class="hljs-attr">alias</span>: {<span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.js'</span>}
  }</code></pre>
<p>为什么要加 alias 配置项？其作用可以在文档中有相应的描述: <br><span class="img-wrap"><img data-src="/img/remote/1460000007124490" src="https://static.alili.tech/img/remote/1460000007124490" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>修改完之后的<code>webpack.config.js</code>是这样子的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\\.vue$/,
        loader: 'vue'
      },
      {
        test: /\\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '&quot;production&quot;'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-attr">resolveLoader</span>: {
    <span class="hljs-attr">root</span>: path.join(__dirname, <span class="hljs-string">'node_modules'</span>),
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(png|jpg|gif|svg)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'[name].[ext]?[hash]'</span>
        }
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {<span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.js'</span>}
  },
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#eval-source-map'</span>
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  <span class="hljs-built_in">module</span>.exports.devtool = <span class="hljs-string">'#source-map'</span>
  <span class="hljs-comment">// http://vue-loader.vuejs.org/en/workflow/production.html</span>
  <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    })
  ])
}</code></pre>
<p>再按之前的方法写一个组件 secondcomponent.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;secondcomponent&quot;>
    <h1>I am another page</h1>
    <a> written by "{{" author "}}" </a>
    <p> 感谢 <a href=&quot;https://github.com/showonne&quot;>showonne</a>大神的技术指导</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: &quot;微信公众号 jinkey-love&quot;,
      articles: [],
    }
  }
  }
}
</script>

<style>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"secondcomponent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>I am another page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span> written by "{{" author "}}" <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> 感谢 <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/showonne"</span>&gt;</span>showonne<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>大神的技术指导<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">author</span>: <span class="hljs-string">"微信公众号 jinkey-love"</span>,
      <span class="hljs-attr">articles</span>: [],
    }
  }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这时候修改 main.js，引入并注册 <code>vue-router</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueRouter from &quot;vue-router&quot;;
Vue.use(VueRouter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-router"</span>;
Vue.use(VueRouter);</code></pre>
<p>并且配置路由规则和 app 启动配置项加上 router，旧版的 router.map 方法在 <code>vue-router 2.0</code> 已经不能用了。修改后的<code>main.js</code>如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'
import VueRouter from &quot;vue-router&quot;;
import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
import secondcomponent from './component/secondcomponent.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/first',
      component: First
    },
    {
      path: '/second',
      component: secondcomponent
    }
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-router"</span>;
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

<span class="hljs-comment">//开启debug模式</span>
Vue.config.debug = <span class="hljs-literal">true</span>;

Vue.use(VueRouter);
Vue.use(VueResource);

<span class="hljs-comment">// 定义组件, 也可以像教程之前教的方法从别的文件引入</span>
<span class="hljs-keyword">const</span> First = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;h2&gt;我是第 1 个子页面&lt;/h2&gt;&lt;/div&gt;'</span> }
<span class="hljs-keyword">import</span> secondcomponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./component/secondcomponent.vue'</span>

<span class="hljs-comment">// 创建一个路由器实例</span>
<span class="hljs-comment">// 并且配置路由规则</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">base</span>: __dirname,
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/first'</span>,
      <span class="hljs-attr">component</span>: First
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/second'</span>,
      <span class="hljs-attr">component</span>: secondcomponent
    }
  ]
})

<span class="hljs-comment">// 现在我们可以启动应用了！</span>
<span class="hljs-comment">// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">router</span>: router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>这样子改完再打开浏览器看看。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124491" src="https://static.alili.tech/img/remote/1460000007124491" alt="" title="" style="cursor: pointer;"></span></p>
<p>点击那两个链接试试，会发现<code>&lt;router-view class="view"&gt;&lt;/router-view&gt;</code>的内容已经展示出来，同时注意<strong>浏览器地址已经变更</strong>。<br><span class="img-wrap"><img data-src="/img/remote/1460000007124492" src="https://static.alili.tech/img/remote/1460000007124492" alt="" title="" style="cursor: pointer;"></span></p>
<p>另外，也可以把 App.vue 的内容写在 main.js 也是可以的不过不建议这么做<br><span class="img-wrap"><img data-src="/img/remote/1460000007124493" src="https://static.alili.tech/img/remote/1460000007124493" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果你使用 vue1.0和0.7版本的 vue-router，请参照下面这个教程, 他整个系列都不错的，当然仅限于 vue1.0 :</p>
<blockquote><p><a href="http://guowenfh.github.io/2016/03/28/vue-webpack-06-router/" rel="nofollow noreferrer" target="_blank">http://guowenfh.github.io/201...</a></p></blockquote>
<h2 id="articleHeader23">给页面加点动态数据</h2>
<p>这时候的页面都是静态的(数据在写程序的时候已经固定了不能修改)，而每个应用基本上都会请求外部数据以动态改变页面内容。对应有一个库叫 <code>vue-resource</code> 帮我们解决这个问题。<br>使用命令行安装</p>
<blockquote><p>cnpm install vue-resource --save</p></blockquote>
<p>在 main.js 引入并注册 <code>vue-resource</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueResource from 'vue-resource'
Vue.use(VueResource);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
Vue.use(VueResource);</code></pre>
<p>我们在 secondcomponent.vue 上来动态加载数据<br>添加一个列表:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
      <li v-for=&quot;article in articles&quot;>
        "{{"article.title"}}"
      </li>
    </ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"article in articles"</span>&gt;</span>
        "{{"article.title"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>在 data 里面加入数组 articles 并赋值为[]<br>然后在 data 后面加入加入钩子函数 <code>mounted</code>(详细请参照官方文档关于 vue 生命周期的解析)，<strong>data 和 mount 中间记得记得加逗号</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted: function() {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {

        },
        emulateJSON: true
    }).then(function(response) {
      // 这里是处理正确的回调

        this.articles = response.data.subjects
        // this.articles = response.data[&quot;subjects&quot;] 也可以

    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mounted: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-string">'https://api.douban.com/v2/movie/top250?count=10'</span>, {}, {
        <span class="hljs-attr">headers</span>: {

        },
        <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-comment">// 这里是处理正确的回调</span>

        <span class="hljs-keyword">this</span>.articles = response.data.subjects
        <span class="hljs-comment">// this.articles = response.data["subjects"] 也可以</span>

    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
        <span class="hljs-comment">// 这里是处理错误的回调</span>
        <span class="hljs-built_in">console</span>.log(response)
    });
  }</code></pre>
<p>这里使用的是豆瓣的公开 GET 接口，如果接口是跨域的 POST 请求，则需要在服务器端配置:</p>
<blockquote><p>Access-Control-Allow-Origin: *</p></blockquote>
<p>这时候运行看看。等一会接口返回数据，咦，数据加载出来了，棒棒哒 !<br><span class="img-wrap"><img data-src="/img/remote/1460000007124494" src="https://static.alili.tech/img/remote/1460000007124494" alt="" title="" style="cursor: pointer;"></span></p>
<p>更多 <code>vue-router</code> 的使用方法可以看</p>
<blockquote><p><strong>vue-router 0.7</strong><br><a href="http://m.doc00.com/doc/1001004eg" rel="nofollow noreferrer" target="_blank">http://m.doc00.com/doc/1001004eg</a><br><strong>vue-router 2.0</strong><br><a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn...</a></p></blockquote>
<h2 id="articleHeader24">来拯救如此难看的界面</h2>
<p>组件、双向绑定、路由、数据请求等基本特性都能用了，写到这里一个单页应用基本上成型了。但是，这几面也太 TM 难看了吧。自己写 UI 框架太费劲？那就上网找一个吧。<br>本来想给大家介绍 Vux 的，因为他用的是微信的 WeUI 设计规范，对于开发微信小程序或者微信内的网页非常和谐，但由于写这篇文章的时候 Vux 还不支持 vue2.0，只能用别的框架了。<br>命令行安装 ElementUI (此处某公司的人应该发红包了...)</p>
<blockquote><p>cnpm install element-ui@next -S</p></blockquote>
<p>然后在 main.js 引入并注册</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Element <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
Vue.use(Element)</code></pre>
<p>保存，这时候程序报错</p>
<blockquote><p>Uncaught Error: Module parse failed: /Users/**/Desktop/vue2/node_modules/.1.0.0-rc.5@element-ui/lib/theme-default/index.css Unexpected character '@' (1:0)</p></blockquote>
<p>You may need an appropriate loader to handle this file type.</p>
<p>官网文档又有坑了，安装教程也不跟我们说这一步，当我们都是高手了...<br>报错是由于我们引入了<code>index.css</code>这个 CSS 文件，但是 webpack 打包的时候无法识别并转换成 js，所以就需要配置才能读取 css 和字体文件，运行命令安装下面三个东西(如果之前安装过就不需要了)</p>
<blockquote><p>cnpm install style-loader --save-dev<br>cnpm install css-loader --save-dev<br>cnpm install file-loader --save-dev</p></blockquote>
<p>在 <code>webpack.config.js</code> 中的 loaders 数组加入以下配置，<strong>记得该加逗号的地方加逗号!</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\\.css$/,
    loader: &quot;style!css&quot;
},
{
    test: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
    loader: &quot;file&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.css$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">"style!css"</span>
},
{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(eot|woff|woff2|ttf)([\\?]?.*)$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">"file"</span>
}</code></pre>
<p>修改完的 <code>webpack.config.js</code> 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\\.vue$/,
        loader: 'vue'
      },
      {
        test: /\\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
          test: /\\.css$/,
          loader: &quot;style!css&quot;
      },
      {
        test: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
        loader: &quot;file&quot;
      },
      {
        test: /\\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '&quot;production&quot;'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-attr">resolveLoader</span>: {
    <span class="hljs-attr">root</span>: path.join(__dirname, <span class="hljs-string">'node_modules'</span>),
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.css$/</span>,
          <span class="hljs-attr">loader</span>: <span class="hljs-string">"style!css"</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(eot|woff|woff2|ttf)([\\?]?.*)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"file"</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(png|jpg|gif|svg)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'[name].[ext]?[hash]'</span>
        }
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {<span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.js'</span>}
  },
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#eval-source-map'</span>
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  <span class="hljs-built_in">module</span>.exports.devtool = <span class="hljs-string">'#source-map'</span>
  <span class="hljs-comment">// http://vue-loader.vuejs.org/en/workflow/production.html</span>
  <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    })
  ])
}</code></pre>
<p>给豆瓣的电影列表套个衣服(样式) :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-card class=&quot;box-card&quot;>
      <div slot=&quot;header&quot; class=&quot;clearfix&quot;>
        <h1 style=&quot;line-height: 36px; color: #20A0FF&quot;>豆瓣电影排行榜</h2>
      </div>
      <div v-for=&quot;article in articles&quot; class=&quot;text item&quot;>
        "{{"article.title"}}"
      </div>
</el-card>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">el-card</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-card"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"line-height: 36px; color: #20A0FF"</span>&gt;</span>豆瓣电影排行榜<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"article in articles"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text item"</span>&gt;</span>
        "{{"article.title"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-card</span>&gt;</span></code></pre>
<p>打开浏览器,输入网址:</p>
<blockquote><p><a href="http://localhost:8080/second" rel="nofollow noreferrer" target="_blank">http://localhost:8080/second</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124495" src="https://static.alili.tech/img/remote/1460000007124495" alt="" title="" style="cursor: pointer;"></span></p>
<p>￼<br>列表比之前漂亮多了，你还可以参照 ElementUI 的文档使用更多组件样式</p>
<blockquote><p><a href="http://element.eleme.io/#/component/layout" rel="nofollow noreferrer" target="_blank">http://element.eleme.io/#/com...</a></p></blockquote>
<h1 id="articleHeader25">编译</h1>
<blockquote><p>npm run build</p></blockquote>
<p>又报错了...orz</p>
<blockquote><p>ERROR in build.js from UglifyJs</p></blockquote>
<p>SyntaxError: Unexpected token punc «(», expected punc «:» [build.js:32001,6]<br>把node_modules/.bin/cross-env里的</p>
<blockquote><p>require('../dist')(process.argv.slice(2));</p></blockquote>
<p>后来发现直接运行 webpack 命令就可以打包了</p>
<blockquote><p>webpack --color --progress</p></blockquote>
<p>接着把 index.html 和整个 dist 目录丢到服务器就可以了。</p>
<p>填坑不易,打赏一下呗<br><span class="img-wrap"><img data-src="/img/bVD3zN?w=628&amp;h=640" src="https://static.alili.tech/img/bVD3zN?w=628&amp;h=640" alt="0?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" title="0?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 新手完全填坑攻略—从环境搭建到发布——Jinkey 原创

## 原文链接
[https://segmentfault.com/a/1190000007124470](https://segmentfault.com/a/1190000007124470)

