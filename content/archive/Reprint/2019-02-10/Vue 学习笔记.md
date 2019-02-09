---
title: 'Vue 学习笔记' 
date: 2019-02-10 2:30:42
hidden: true
slug: 07wjd9mvng4g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue 简介</h2>
<blockquote><p><strong>提醒</strong>：Vuejs 如今正处在快速发展中，很多资源随时都有可能过时（outdated），记得查看最新文档，使用最新资源。</p></blockquote>
<h3 id="articleHeader1">Vue 的<a href="https://vuejs.org.cn/guide/overview.html" rel="nofollow noreferrer" target="_blank">官方说明</a>
</h3>
<blockquote><p>数据驱动的组件，为现代化的 Web 界面而生。<br>Vue.js（读音 /vjuː/, 类似于 view）是一个构建数据驱动的 web 界面的库。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。<br>Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。</p></blockquote>
<h3 id="articleHeader2">关于 Vue 的作者</h3>
<p>尤雨溪 / 昵称：<a href="http://weibo.com/arttechdesign" rel="nofollow noreferrer" target="_blank">尤小右</a> / 英文名：<a href="http://evanyou.me/" rel="nofollow noreferrer" target="_blank">Evan You</a></p>
<p>是个介于设计师和程序员之间的大牛，设计能力比程序员好，编程能力比设计师（和普通程序员）好太多！<br>如今辞了工作，专心投入到了 Vuejs 的发展和推广中。</p>
<blockquote><p>工作信息： <br>Meteor (2014 - 2016)  <br>地区：海外 ，美国 <br>职位：Core dev <br>Google (2012 - 2014)<br>地区：海外 ，美国 <br>职位：Creative Lab</p></blockquote>
<p><strong>相关信息</strong>：<br><a href="http://teahour.fm/2015/08/16/vuejs-creator-evan-you.html" rel="nofollow noreferrer" target="_blank">和 Vue.js 框架的作者聊聊前端框架开发背后的故事 | Teahour.fm</a></p>
<h2 id="articleHeader3">Vue 的基本用法</h2>
<blockquote><p>Vue 相比于 React 和 Angular 容易上手多了，因此我对 Vue 的学习主要以文档为主，视频为辅（只有像我这种菜鸟才看视频教程，真正的牛人文档瞄几眼就会了(-_-#)）。</p></blockquote>
<h3 id="articleHeader4">下载使用（两种方式）</h3>
<ol><li><p>直接下载并用 <code>&lt;script&gt;</code> 标签引入，<code>Vue</code> 会被注册为一个全局变量。</p></li></ol>
<blockquote><p>平时对于 Dom 操作比较频繁的小项目可以直接这样使用。</p></blockquote>
<ol><li><p>Vue.js 提供一个<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">官方命令行工具</a>，可用于<a href="https://vuejs.org.cn/guide/application.html" rel="nofollow noreferrer" target="_blank">快速搭建大型单页应用</a>。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需一分钟即可启动带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：</p></li></ol>
<blockquote><p>针对单页应用的构建推荐使用这种方式，可以更好的体验到 vue 所提供的组件化功能 （<a href="https://vuejs.org.cn/guide/application.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">单文件组件</a>），顺带着享受到 webpack 带来的流畅的自动化开发体验。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
$ npm install -g vue-cli
# 创建一个基于 &quot;webpack&quot; 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 全局安装 vue-cli</span>
<span class="hljs-variable">$ </span>npm install -g vue-cli
<span class="hljs-comment"># 创建一个基于 "webpack" 模板的新项目</span>
<span class="hljs-variable">$ </span>vue init webpack my-project
<span class="hljs-comment"># 安装依赖，走你</span>
<span class="hljs-variable">$ </span>cd my-project
<span class="hljs-variable">$ </span>npm install
<span class="hljs-variable">$ </span>npm run dev</code></pre>
<h3 id="articleHeader5">Vue 的使用教程</h3>
<p>废话不多说，大家直接看<a href="https://vuejs.org.cn/guide/" rel="nofollow noreferrer" target="_blank">官方文档</a>，已经写得非常棒了。<br>页面上的搜索功能可以快速帮助你定位到相关文档说明，非常方便。</p>
<p><strong>针对相关问题的解决方法</strong>：</p>
<hr>
<p><strong>问题</strong>：Vue 还未实例化前， HTML 模板中的 ""{{" "}}""( Mustache 标签) 会暴露在用户界面上，也就是说页面有那么一瞬间会将所有的 ""{{" "}}"" 都显示出来，如何解决？<br><strong>解决</strong>：<br><em>方法一</em>：使用 <code>v-cloak</code> 指令，这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 <code>[v-cloak] { display: none }</code> 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。<br><a href="http://vuejs.org.cn/api/#v-cloak" rel="nofollow noreferrer" target="_blank">v-cloak 文档说明</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak] { 
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[v-cloak]</span> { 
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-cloak>
  "{{" message "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-cloak</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><em>方法二</em>：使用 <code>v-text</code><br><a href="http://vuejs.org.cn/api/#v-text" rel="nofollow noreferrer" target="_blank">v-text 文档说明</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-text=&quot;msg&quot;></span>
<!-- same as -->
<span>"{{"msg"}}"</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-comment">&lt;!-- same as --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<hr>
<p><strong>问题</strong>：新增的 data 数据没法同步响应到页面？<br><strong>解决</strong>：认真阅读官方文档里的<a href="http://vuejs.org.cn/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">深入响应式原理</a>。</p>
<p>在实例创建之后添加属性并且让它是响应的:</p>
<p>对于 Vue 实例，可以使用 $set(key, value) 实例方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$set('b', 2)
// `vm.b` 和 `data.b` 现在是响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>vm.$set('b', <span class="hljs-number">2</span>)
// `vm.b` 和 `data.b` 现在是响应的</code></pre>
<p>对于普通数据对象，可以使用全局方法 Vue.set(object, key, value)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.set(data, 'c', 3)
// `vm.c` 和 `data.c` 现在是响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>Vue.set(data, 'c', <span class="hljs-number">3</span>)
// `vm.c` 和 `data.c` 现在是响应的</code></pre>
<hr>
<p><strong>注意事项</strong>：</p>
<ul>
<li><p>注意如果 <a href="http://vuejs.org.cn/guide/components.html#Props" rel="nofollow noreferrer" target="_blank">prop</a> 是一个对象或数组，是按引用传递。在子组件内修改它会影响父组件的状态，不管是使用哪种绑定类型</p></li>
<li><p>针对同一个元素的后一个 watch 会覆盖前一个 watch，无论是不是 deep</p></li>
<li><p>自定义指令内部可以通过 this.vm.someKey 来访问到组件的数据</p></li>
<li><p>自定义指令名不要有大写，props 命名也不要有大写</p></li>
</ul>
<h2 id="articleHeader6">Vue 的组件化实践</h2>
<blockquote><p><a href="https://vuejs.org.cn/guide/components.html" rel="nofollow noreferrer" target="_blank">组件</a>（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 <code>is</code> 特性扩展。</p></blockquote>
<p>使用上文提到的<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">官方命令行工具</a>：<br>目前可供使用的模板包括（模板名-说明）：</p>
<ul>
<li><p><a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> - A full-featured Webpack + vue-loader setup with hot reload, linting, testing &amp; css extraction.（全功能的 Webpack + vue-loader 设置，包括热加载，静态检测，测试，css 提取）</p></li>
<li><p><a href="https://github.com/vuejs-templates/webpack-simple" rel="nofollow noreferrer" target="_blank">webpack-simple</a> - A simple Webpack + vue-loader setup for quick prototyping.（一个简易的 Webpack + vue-loader 设置，以便于快速开始）</p></li>
<li><p><a href="https://github.com/vuejs-templates/browserify" rel="nofollow noreferrer" target="_blank">browserify</a> - A full-featured Browserify + vueify setup with hot-reload, linting &amp; unit testing.（全功能的 Browserify + vueify 设置，包括热加载，静态检测，单元测试）</p></li>
<li><p><a href="https://github.com/vuejs-templates/browserify-simple" rel="nofollow noreferrer" target="_blank">browserify-simple</a> - A simple Browserify + vueify setup for quick prototyping.（一个简易的 Browserify + vueify 设置，以便于快速开始）</p></li>
<li><p><a href="https://github.com/vuejs-templates/simple" rel="nofollow noreferrer" target="_blank">simple</a> - The simplest possible Vue setup in a single HTML file</p></li>
</ul>
<p><strong>相关阅读：</strong><br><a href="http://vuejs.org/2015/12/28/vue-cli/" rel="nofollow noreferrer" target="_blank">Announcing vue-cli</a><br><a href="https://segmentfault.com/a/1190000004267935">（译）Vuejs 自己的构建工具 vue-cli</a></p>
<h3 id="articleHeader7">Webpack 基础入门</h3>
<blockquote><p><strong>webpack</strong>&nbsp;is a&nbsp;<strong>module bundler</strong>.<br>webpack takes modules with dependencies and generates static assets representing those modules.<br>Webpack 将项目中用到的一切静态资源都视之为模块，模块之间可以互相依赖。Webpack 对它们进行统一的管理以及打包发布。</p></blockquote>
<p>Webpack 主要特性如下：</p>
<ul>
<li><p>同时支持 <a href="http://wiki.commonjs.org/wiki/Modules/1.1" rel="nofollow noreferrer" target="_blank">CommonJS</a> 和 <a href="https://github.com/amdjs/amdjs-api/wiki/AMD" rel="nofollow noreferrer" target="_blank">AMD</a> 模块（对于新项目，推荐直接使用 CommonJS）；</p></li>
<li><p>串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对 CoffeeScript、ES6 的支持；</p></li>
<li><p>可以基于配置或者智能分析打包成多个文件，实现公共模块或者按需加载；</p></li>
<li><p>支持对 CSS，图片等资源进行打包，从而无需借助 Grunt 或 Gulp；</p></li>
<li><p>开发时在内存中完成打包，性能更快，完全可以支持开发过程的实时打包需求；</p></li>
<li><p>对 sourcemap 有很好的支持，易于调试。</p></li>
</ul>
<p>Webpack 一般作为全局的 npm 模块安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g webpack</code></pre>
<p>安装成功后，在命令行输入 webpack -h 即可查看当前安装的版本信息，以及可以使用的指令。直接执行 webpack 命令会默认使用当前目录的 webpack.config.js 作为配置文件。如果要指定另外的配置文件，可以执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack —config webpack.custom.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">webpack —config webpack<span class="hljs-selector-class">.custom</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>Webpack 可以通过直接命令行来指定参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 命令 入口文件 生成文件
webpack entry.js bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code># 命令 入口文件 生成文件
<span class="hljs-selector-tag">webpack</span> <span class="hljs-selector-tag">entry</span><span class="hljs-selector-class">.js</span> <span class="hljs-selector-tag">bundle</span><span class="hljs-selector-class">.js</span></code></pre>
<p>但我们通常会将所有相关参数定义在配置文件中，配置文件通常放在项目根目录之下，其本身也是一个标准的 CommonJS 模块。一个最简单的 Webpack 配置文件 webpack.config.js 如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry:[
    './app/entry.js'
  ],
  output: {
    path: __dirname + '/assets/',
    publicPath: &quot;/assets/&quot;,
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry:[
    <span class="hljs-string">'./app/entry.js'</span>
  ],
  output: {
    path: __dirname + <span class="hljs-string">'/assets/'</span>,
    publicPath: <span class="hljs-string">"/assets/"</span>,
    filename: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<p>其中 entry 参数定义了打包的入口文件，数组中的所有文件会按顺序打包。每个文件进行依赖的递归查找，直到所有相关模块都被打包。output 参数定义了输出文件的位置，其中常用的参数包括：</p>
<ul>
<li><p>path: 打包文件存放的绝对路径</p></li>
<li><p>publicPath: 网站运行时的访问路径</p></li>
<li><p>filename: 打包后的文件名</p></li>
</ul>
<p>Webpack 会分析<strong>入口文件</strong>，解析包含依赖关系的各个文件。这些文件（模块）都打包到 <code>bundle.js</code>（打包后的文件名） 。Webpack 会给每个模块分配一个唯一的 id 并通过这个 id 索引和访问模块。在页面启动时，会先执行 <code>entry.js</code> 中的代码，其它模块会在运行依赖引入（require / import）代码的时候再执行。</p>
<p>官网首页的说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack is a module bundler
// This means webpack takes modules with dependencies
//   and emits static assets representing those modules.

// dependencies can be written in CommonJs
var commonjs = require(&quot;./commonjs&quot;);
// or in AMD
define([&quot;amd-module&quot;, &quot;../file&quot;], function(amdModule, file) {
    // while previous constructs are sync
    // this is async
    require([&quot;big-module/big/file&quot;], function(big) {
         // for async dependencies webpack splits
         //  your application into multiple &quot;chunks&quot;.
         // This part of your application is
         //  loaded on demand (Code Splitting)
        var stuff = require(&quot;../my/stuff&quot;);
        // &quot;../my/stuff&quot; is also loaded on demand
        //  because it's in the callback function
        //  of the AMD require
    });
});


require(&quot;coffee!./cup.coffee&quot;);
// &quot;Loaders&quot; can be used to preprocess files.
// &quot;Loaders&quot; 可以用来对文件进行预处理
// They can be prefixed in the require call
// 可以写在 require 代码中
//  or configured in the configuration.
// 也可以在配置文件中进行配置
require(&quot;./cup&quot;);
// This does the same when you add &quot;.coffee&quot; to the extensions
//  and configure the &quot;coffee&quot; loader for /\.coffee$/


function loadTemplate(name) {
    return require(&quot;./templates/&quot; + name + &quot;.jade&quot;);
    // many expressions are supported in require calls
    // a clever parser extracts information and concludes
    //  that everything in &quot;./templates&quot; that matches
    //  /\.jade$/ should be included in the bundle, as it
    //  can be required.
}


// ... and you can combine everything
function loadTemplateAsync(name, callback) {
    require([&quot;bundle?lazy!./templates/&quot; + name + &quot;.jade&quot;], 
      function(templateBundle) {
        templateBundle(callback);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack is a module bundler</span>
<span class="hljs-comment">// This means webpack takes modules with dependencies</span>
<span class="hljs-comment">//   and emits static assets representing those modules.</span>

<span class="hljs-comment">// dependencies can be written in CommonJs</span>
<span class="hljs-keyword">var</span> commonjs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./commonjs"</span>);
<span class="hljs-comment">// or in AMD</span>
define([<span class="hljs-string">"amd-module"</span>, <span class="hljs-string">"../file"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">amdModule, file</span>) </span>{
    <span class="hljs-comment">// while previous constructs are sync</span>
    <span class="hljs-comment">// this is async</span>
    <span class="hljs-built_in">require</span>([<span class="hljs-string">"big-module/big/file"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">big</span>) </span>{
         <span class="hljs-comment">// for async dependencies webpack splits</span>
         <span class="hljs-comment">//  your application into multiple "chunks".</span>
         <span class="hljs-comment">// This part of your application is</span>
         <span class="hljs-comment">//  loaded on demand (Code Splitting)</span>
        <span class="hljs-keyword">var</span> stuff = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../my/stuff"</span>);
        <span class="hljs-comment">// "../my/stuff" is also loaded on demand</span>
        <span class="hljs-comment">//  because it's in the callback function</span>
        <span class="hljs-comment">//  of the AMD require</span>
    });
});


<span class="hljs-built_in">require</span>(<span class="hljs-string">"coffee!./cup.coffee"</span>);
<span class="hljs-comment">// "Loaders" can be used to preprocess files.</span>
<span class="hljs-comment">// "Loaders" 可以用来对文件进行预处理</span>
<span class="hljs-comment">// They can be prefixed in the require call</span>
<span class="hljs-comment">// 可以写在 require 代码中</span>
<span class="hljs-comment">//  or configured in the configuration.</span>
<span class="hljs-comment">// 也可以在配置文件中进行配置</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./cup"</span>);
<span class="hljs-comment">// This does the same when you add ".coffee" to the extensions</span>
<span class="hljs-comment">//  and configure the "coffee" loader for /\.coffee$/</span>


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadTemplate</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">"./templates/"</span> + name + <span class="hljs-string">".jade"</span>);
    <span class="hljs-comment">// many expressions are supported in require calls</span>
    <span class="hljs-comment">// a clever parser extracts information and concludes</span>
    <span class="hljs-comment">//  that everything in "./templates" that matches</span>
    <span class="hljs-comment">//  /\.jade$/ should be included in the bundle, as it</span>
    <span class="hljs-comment">//  can be required.</span>
}


<span class="hljs-comment">// ... and you can combine everything</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadTemplateAsync</span>(<span class="hljs-params">name, callback</span>) </span>{
    <span class="hljs-built_in">require</span>([<span class="hljs-string">"bundle?lazy!./templates/"</span> + name + <span class="hljs-string">".jade"</span>], 
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">templateBundle</span>) </span>{
        templateBundle(callback);
    });
}</code></pre>
<p>更多信息可以参考 webpack 的<a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">官方网站</a>。 </p>
<p><strong>相关阅读：</strong></p>
<blockquote><p>以下四篇文章看完并跟着操作就能对 webpack 有个最起码的理解，了解其最基本的使用方式。<br><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（一）不是开始的开始</a><br><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-02-deploy/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（二）loader入门</a><br><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-03-config/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（三）webpack.config入门</a><br><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-04-custom/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（四）扬帆起航</a></p></blockquote>
<p><a href="http://www.infoq.com/cn/articles/react-and-webpack#anch124673" rel="nofollow noreferrer" target="_blank">深入浅出React（二）：React开发神器Webpack</a></p>
<h3 id="articleHeader8">.vue file</h3>
<blockquote><p>以 <code>.vue</code> 为后缀的文件 - 单文件组件<br>推荐使用 <a href="https://github.com/vuejs-templates/webpack-simple" rel="nofollow noreferrer" target="_blank">vue-webpack-simple-boilerplate</a> 这个模板来进行 vuejs 的组件化开发的学习。</p></blockquote>
<p>命令行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
npm install -g vue-cli
# 模板名为 webpack-simple（目前官方有 5 个模板可供选择，见上文） 
# 项目名为 my-project （自定义）
# 下面命令执行后会出现几个问题，用于配置你的项目信息，可以一路回车（即采用默认值）
vue init webpack-simple my-project
# 进入项目目录
cd my-project
# 执行模块的下载安装，所需模块的配置信息在 package.json 中
npm install
# 执行 dev 脚本（也在 package.json 中），即项目开发模式
npm run dev
# npm run build 执行 build 脚本，项目文件打包生成" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 全局安装 vue-cli</span>
npm install -g vue-cli
<span class="hljs-meta"># 模板名为 webpack-simple（目前官方有 5 个模板可供选择，见上文） </span>
<span class="hljs-meta"># 项目名为 my-project （自定义）</span>
<span class="hljs-meta"># 下面命令执行后会出现几个问题，用于配置你的项目信息，可以一路回车（即采用默认值）</span>
vue init webpack-simple my-project
<span class="hljs-meta"># 进入项目目录</span>
cd my-project
<span class="hljs-meta"># 执行模块的下载安装，所需模块的配置信息在 package.json 中</span>
npm install
<span class="hljs-meta"># 执行 dev 脚本（也在 package.json 中），即项目开发模式</span>
npm run dev
<span class="hljs-meta"># npm run build 执行 build 脚本，项目文件打包生成</span></code></pre>
<ul>
<li><p><code>npm run dev</code>: Webpack + <code>vue-loader</code> with proper config for source maps &amp; hot-reload.</p></li>
<li><p><code>npm run build</code>: Production build with HTML/CSS/JS minification.</p></li>
</ul>
<blockquote><p><strong>提醒</strong>：要是执行命令 <code>npm run dev</code> 后出现错误，有可能是 node 版本导致的，请将 node 更新到最新版，对于 win 用户来说，直接官网再下载一个最新版本的安装包来安装即可。</p></blockquote>
<p>接下去每次要对项目进行开发时，就到项目根目录，右键+Shift 键，选择 <code>在此处打开命令窗口</code>，然后执行命令 <code>npm run dev</code>，即可在 <code>localhost:8080</code> 地址上看到运行的项目，修改代码并保存后页面还会自行更新（使用了热加载技术 <code>webpack-dev-server --inline --hot</code> ）。</p>
<blockquote>
<p><strong>Automatic Refresh</strong><br>The webpack-dev-server supports multiple modes to automatic refresh the page:</p>
<ul>
<li><p>Iframe mode (page is embedded in an iframe and reloaded on change)</p></li>
<li><p><strong>Inline mode</strong> (a small webpack-dev-server client entry is added to the bundle which refresh the page on change)</p></li>
</ul>
<p>Each mode also supports Hot Module Replacement in which the bundle is notified that a change happened instead of a full page reload. A Hot Module Replacement runtime could then <strong>load the updated modules and inject them into the running app</strong>.</p>
</blockquote>
<p><strong>相关阅读：</strong><br><a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a> - a Node.js based server that supports live reloading and is used for development of webpack powered applications.<br><a href="http://guowenfh.github.io/2016/03/25/vue-webpack-05-vue/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（五）加载 vue 单文件组件</a></p>
<h3 id="articleHeader9">vue-loader</h3>
<blockquote><p>vue-loader 用于 webpack 中，用来对以 <code>.vue</code> （单文件组件）结尾的文件进行处理。</p></blockquote>
<h3 id="articleHeader10">vue-router</h3>
<blockquote><p><code>vue-router</code> - 单页面应用路由<br>使用 Vue.js 和 vue-router 创建单页应用非常的简单，使用 Vue.js 开发，整个应用已经被拆分成了独立的组件。在使用 vue-router 时，我们需要做的就是把路由映射到各个组件，vue-router 会把各个组件渲染到正确的地方。</p></blockquote>
<p>阅读 <a href="http://vuejs.github.io/vue-router/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router 文档</a></p>
<p><strong>相关阅读：</strong><br><a href="http://guowenfh.github.io/2016/03/28/vue-webpack-06-router/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（六）配合 vue-router 实现 SPA</a></p>
<h2 id="articleHeader11">Vuex</h2>
<p>阅读 <a href="http://vuejs.github.io/vuex/en/index.html" rel="nofollow noreferrer" target="_blank">Vuex 文档</a>，中文版的过时了，尽量阅读英文版的。</p>
<h2 id="articleHeader12">Vue 2.0</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008072226" src="https://static.alili.tech/img/remote/1460000008072226" alt="一张脑图带你认识 Vue 2.0( 来源微博@勾三股四 )" title="一张脑图带你认识 Vue 2.0( 来源微博@勾三股四 )" style="cursor: pointer;"></span></p>
<p><a href="https://medium.com/the-vue-point/announcing-vue-js-2-0-8af1bde7ab9#.vas0znnlf" rel="nofollow noreferrer" target="_blank">Announcing Vue.js 2.0</a><br><a href="https://zhuanlan.zhihu.com/p/20814761?hmsr=toutiao.io&amp;utm_medium=toutiao.io&amp;utm_source=toutiao.io" rel="nofollow noreferrer" target="_blank">（译）Announcing Vue.js 2.0</a><br><a href="http://jiongks.name/blog/code-review-for-vue-next/" rel="nofollow noreferrer" target="_blank">Code Review for Vue 2.0 Preview</a><br><a href="http://jimliu.net/2016/04/29/a-brief-look-at-vue-2-reactivity/" rel="nofollow noreferrer" target="_blank">Vue 2.0 数据绑定实现一瞥</a></p>
<h2 id="articleHeader13">框架对比</h2>
<p><a href="https://vuejs.org.cn/guide/comparison.html" rel="nofollow noreferrer" target="_blank">对比其它框架</a></p>
<h2 id="articleHeader14">Vue 视频教程（需科学上网）</h2>
<ol>
<li><p><a href="https://www.youtube.com/watch?v=DsuTwV0jwaY" rel="nofollow noreferrer" target="_blank">Vue JS Intro</a><br>最轻松简单的入门教程，可以初步对 Vuejs 的使用有个概念。</p></li>
<li><p><a href="https://www.youtube.com/watch?v=Oqs3Iuid8-8&amp;ebc=ANyPxKrCplDh5ZJbFbDw-emYcLBqjCKa7XrKyeTPU6s8yEqnasaRXiFfqG3ZV8-jVLfM66jNBw8HWo9tS7G-AGMulNniaKSkZg" rel="nofollow noreferrer" target="_blank">An Introduction into Vue.js: Building an Example App</a> <br><a href="https://bitbucket.org/alex_sterling/vue.js-demonstration" rel="nofollow noreferrer" target="_blank">Repository</a>（该视频教程的代码资源文件）很棒的视频教程，可以最大化的接触到 Vuejs 所能做到的事情，是我当时看到的对我来说最好的 Vuejs 相关视频教程。</p></li>
<li><p><a href="https://www.youtube.com/playlist?list=PLZU0qJlzY07UBea4c6ctFd_WJn95MP1mE" rel="nofollow noreferrer" target="_blank">Vue Js Tutorial Intro with TodoList</a><br> 就是对文档里展示的 <a href="http://cn.vuejs.org/guide/index.html#%E7%BB%BC%E5%90%88" rel="nofollow noreferrer" target="_blank">Todolist</a> 的视频化演示，文档理解了就没必要再看了。</p></li>
<li><p><a href="https://www.youtube.com/watch?v=Ila5hl27a9A" rel="nofollow noreferrer" target="_blank">Weather app with VueJS &amp; OpenWeatherMap</a><br> 随便看看。</p></li>
<li><p><a href="https://laracasts.com/series/learning-vue-step-by-step" rel="nofollow noreferrer" target="_blank">Learning Vue 1.0: Step By Step</a><br>没看过，但看目录好像不错，很多值得看一下，免得自己思路不清晰乱踩坑（而且视频是免费的）。</p></li>
</ol>
<h2 id="articleHeader15">名词解释</h2>
<h3 id="articleHeader16">hot-reload（热加载）</h3>
<blockquote><p><strong>Hot Reloading</strong><br>The idea behind hot reloading is to keep the app running and to inject new versions of the files that you edited at runtime. This way, you don't lose any of your state which is especially useful if you are tweaking the UI.<br>在项目运行过程中，将修改的文件的新版本注入到页面中，只更新相应的模块，这样的话，你不会丢失页面的状态信息，这一点在你微调 UI 的时候尤其有用。</p></blockquote>
<p><strong>相关信息：</strong><br><a href="https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html" rel="nofollow noreferrer" target="_blank">Introducing Hot Reloading</a></p>
<h2 id="articleHeader17">资源</h2>
<p><a href="https://vuejs.org.cn/guide/join.html#u793E_u533A" rel="nofollow noreferrer" target="_blank">加入 Vue 社区</a> - 社区、第三方资源、参与 Vue 开发（参与规则，Vue 的主要组件）<br><a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools</a> - Chrome devtools extension for debugging Vue.js applications.<br><a href="https://github.com/vuejs/awesome-vue#podcasts" rel="nofollow noreferrer" target="_blank">Awesome Vue.js</a> - A curated list of awesome things related to Vue.js<br><a href="https://coligo.io/" rel="nofollow noreferrer" target="_blank">coligo.io</a> - 在学习 vuejs 的同学，可以看看这个网站，上面都是些 vuejs 不错的案例教程</p>
<blockquote><p><a href="http://www.jianshu.com/p/06be98001dc3" rel="nofollow noreferrer" target="_blank">简书传送门</a>，欢迎关注我的简书博客哦~</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 学习笔记

## 原文链接
[https://segmentfault.com/a/1190000005118942](https://segmentfault.com/a/1190000005118942)

