---
title: '从零开始的 webpack4 + vue2.x' 
date: 2018-12-06 2:30:09
hidden: true
slug: eyebhyhrekl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">新建文件夹 webpack-vue</h2>
<h2 id="articleHeader1">安装依赖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn init  //初始化package.json
yarn add webpack webpack-cli   //添加webpack、webpack-cli

//ps:不知那个版本开始就需要安装webpack-cli了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>yarn init  //初始化package.json
yarn <span class="hljs-keyword">add</span> webpack webpack-<span class="hljs-keyword">cli</span>   //添加webpack、webpack-<span class="hljs-keyword">cli</span>

//ps:不知那个版本开始就需要安装webpack-<span class="hljs-keyword">cli</span>了</code></pre>
<h2 id="articleHeader2">新建index.html</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>webpack v4</title>
</head>
<body>
    <div id=&quot;root&quot;></div>
    <script src=&quot;dist/main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack v4<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader3">新建文件夹src，在src下新建index.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index.js
console.log('hello webpack v4');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// src/index.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello webpack v4'</span>);</code></pre>
<h2 id="articleHeader4">第一次打包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
webpack</code></pre>
<p>你会发现目录底下多了dist文件夹里面有main.js，打开index.html 可以看到console里已经打印出了hello webpack v4,<br>在终端会有一个警告提示，大致意思是 没有设置mode将会使用生产模式，需要指定开发环境或者生产环境，打开dist/main.js，发现js确实是被压缩过的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//console
hello webpack v4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//console</span>
hello webpack v4</code></pre>
<h3 id="articleHeader5">package.json</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
...
&quot;scripts&quot;:{
    &quot;start&quot;:&quot;--mode development&quot;,
    &quot;build&quot;: &quot;--mode production&quot;
 }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//package.json</span>
...
<span class="hljs-string">"scripts"</span>:{
    <span class="hljs-string">"start"</span>:<span class="hljs-string">"--mode development"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"--mode production"</span>
 }
...</code></pre>
<h2 id="articleHeader6">第二次打包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn start   //开发环境
yarn build   //生产环境（压缩）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>yarn <span class="hljs-built_in">start</span>  <span class="hljs-comment"> //开发环境</span>
yarn build  <span class="hljs-comment"> //生产环境（压缩）</span></code></pre>
<h3 id="articleHeader7">webpack-dev-server</h3>
<p>手动打开浏览器太麻烦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn add webpack-dev-server   //添加webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//终端</span>
yarn add webpack-dev-<span class="hljs-keyword">server</span>   <span class="hljs-comment">//添加webpack-dev-server</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改index.html
<script src=&quot;main.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//修改index.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改package.json
...
&quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --mode development --open&quot;,
    &quot;build&quot;: &quot;webpack --mode production&quot;
  }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//修改package.json</span>
...
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --mode development --open"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --mode production"</span>
  }
...</code></pre>
<h2 id="articleHeader8">第三次打包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-literal">start</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="自动打开浏览器了，
修改index.js试试
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>自动打开浏览器了，
修改<span class="hljs-keyword">index</span>.js试试
</code></pre>
<h3 id="articleHeader9">加入Vue</h3>
<p>我们将一个一个解决问题，不会一次安装所有依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add vue  //添加依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span> vue  <span class="hljs-comment">//添加依赖</span></code></pre>
<h4>在src下面新建文件夹pages,在pages里面新建app.vue文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue
<template>
    <section class=&quot;main&quot;>
        <p>我来了"{{"name"}}"</p>
    </section>
</template>

<script>
export default {
    data () {
        return {
            name:&quot;vue + webpack&quot;
        }
    }
}
</script>

<style>
.main>p{
    color: #000;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//app.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我来了</span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">name</span>:<span class="hljs-string">"vue + webpack"</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.main</span>&gt;<span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h4>修改index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './pages/app.vue'

new Vue({
    el:&quot;#root&quot;,
    render:h=>h(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./pages/app.vue'</span>

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#root"</span>,
    <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-params">h</span>=&gt;</span>h(App)
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
yarn start</code></pre>
<p>这时候可预见的报错来了，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
//翻译：模块解析失败，您可能需要一个适当的加载程序来处理这个文件类型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>Uncaught <span class="hljs-keyword">Error</span>: Module <span class="hljs-keyword">parse</span> failed: Unexpected <span class="hljs-keyword">token</span> (1:0)
You may need <span class="hljs-keyword">an</span> appropriate loader to handle this <span class="hljs-keyword">file</span> <span class="hljs-keyword">type</span>.
<span class="hljs-comment">//翻译：模块解析失败，您可能需要一个适当的加载程序来处理这个文件类型</span></code></pre>
<p>看报错，我们一个个解决<br>搜索关键词，很容易发现是没有安装vue-loader,新建webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
module.exports = {
    module:{
        rules:[
            {test:/\.vue$/,use:'vue-loader'}
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
    <span class="hljs-function"><span class="hljs-keyword">module</span>:{</span>
        rules:[
            {test:/\.vue$/,<span class="hljs-keyword">use</span>:'vue-loader'}
        ]
    }
}</code></pre>
<p>vue-loader在15之后需要在webpack.config.js中当插件引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> VueLoaderPlugin = require(<span class="hljs-string">'vue-loader/lib/plugin'</span>)

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// ...</span>
  plugins: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin()
  ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
yarn start</code></pre>
<p>再次报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught Error: Module build failed: Error: Cannot find module 'vue-template-compiler'
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>Uncaught <span class="hljs-keyword">Error</span>: <span class="hljs-keyword">Module</span> build failed: <span class="hljs-keyword">Error</span>: Cannot find <span class="hljs-keyword">module</span> <span class="hljs-comment">'vue-template-compiler'</span>
...</code></pre>
<p>很明显，要你安装vue-template-compiler</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add vue-template-compiler" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> vue-template-compiler</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
yarn start</code></pre>
<p>继续报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Module not found: Error: Can't resolve 'css-loader'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Module</span> <span class="hljs-keyword">not</span> found: <span class="hljs-keyword">Error</span>: Can<span class="hljs-comment">'t resolve 'css-loader'</span></code></pre>
<p>提示安装css-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> css-loader</span></code></pre>
<p>bingo! webpack4+vue2第一个项目成功运行</p>
<h2 id="articleHeader10">从js中分离css</h2>
<p>这时候细心的你发现css被塞到head里面，我们来把css分离出来。使用webpack的插件extract-text-webpack-plugin@next</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add extract-text-webpack-plugin@next" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> extract-text-webpack-plugin@next</span></code></pre>
<h3 id="articleHeader11">在webpack.config.js中添加插件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');  //引入插件

module.exports = {
    module:{
        rules:[
            { 
                test: /\.vue$/, 
                loader: 'vue-loader',
                options: { 
                    loaders: { 
                        css: ExtractTextWebapckPlugin.extract({ use: 'css-loader' }) 
                    }
                }
            }
        ]
    },
    plugins:[
        new ExtractTextWebapckPlugin('style.css')
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-keyword">const</span> ExtractTextWebapckPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);  <span class="hljs-comment">//引入插件</span>

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>:{
        rules:[
            { 
                test: <span class="hljs-regexp">/\.vue$/</span>, 
                loader: <span class="hljs-string">'vue-loader'</span>,
                options: { 
                    loaders: { 
                        css: ExtractTextWebapckPlugin.extract({ use: <span class="hljs-string">'css-loader'</span> }) 
                    }
                }
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> ExtractTextWebapckPlugin(<span class="hljs-string">'style.css'</span>)
    ]
}</code></pre>
<h3 id="articleHeader12">index.html引入css</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>webpack v4</title>
    <link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;>
</head>
<body>
    <div id=&quot;root&quot;></div>
    <script src=&quot;main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack v4<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"style.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
yarn build</code></pre>
<p>打包完成后dist目录里面出现了main.js和style.css</p>
<h2 id="articleHeader13">处理图片</h2>
<p>新建文件夹img,用来放图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue
<template>
    <section class=&quot;main&quot;>
        <p>我来了"{{"name"}}"</p>
        <img src=&quot;../img/1.jpg&quot; alt=&quot;&quot;>
    </section>
</template>

<script>
export default {
    data () {
        return {
            name:&quot;vue + webpack&quot;
        }
    }
}
</script>

<style>
.main>p{
    color: #000;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//app.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我来了</span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">name</span>:<span class="hljs-string">"vue + webpack"</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.main</span>&gt;<span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//终端
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//终端</span>
yarn start</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//报错
./src/img/1.jpg
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//报错</span>
./src/img/<span class="hljs-number">1</span>.jpg
Module parse failed: Unexpected character <span class="hljs-string">'�'</span> (<span class="hljs-number">1</span>:<span class="hljs-number">0</span>)
You may need an appropriate loader <span class="hljs-keyword">to</span> handle this <span class="hljs-keyword">file</span> <span class="hljs-keyword">type</span>.</code></pre>
<p>基本可以看出来是图片有问题，没有loader处理图片</p>
<h3 id="articleHeader14">file-loader与url-loader</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add file-loader url-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> file-loader url-loader</span></code></pre>
<p>修改webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
...
rule:[
    ...
    { 
        test: /\.(png|jpg|gif)$/, 
        use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
    }
    ...
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//webpack.config.js</span>
...
<span class="hljs-string">rule:</span>[
    ...
    { 
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>, 
<span class="hljs-symbol">        use:</span> [{ <span class="hljs-string">loader:</span> <span class="hljs-string">'url-loader'</span>,<span class="hljs-string">options:</span> { <span class="hljs-string">limit:</span> <span class="hljs-number">8192</span> } }] 
    }
    ...
]
...</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-literal">start</span></code></pre>
<p>打包成功...</p>
<h3 id="articleHeader15">webpack其余一些配置</h3>
<p>resolve，watchOptions，devServer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.css']
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    },
    devServer:{
        inline: true,
        compress: true,
        host: '127.0.0.1',
        port: 2500,
        historyApiFallback: true
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//webpack.config.js</span>
    <span class="hljs-attribute">resolve</span>: {  <span class="hljs-comment">//导入的时候不用写拓展名</span>
        <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">' '</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.scss'</span>, <span class="hljs-string">'.css'</span>]
    },
    <span class="hljs-attribute">watchOptions</span>: {
        <span class="hljs-attribute">ignored</span>: /node_modules/,
        <span class="hljs-attribute">aggregateTimeout</span>: <span class="hljs-number">300</span>,<span class="hljs-comment">//防止重复保存频繁重新编译,300ms内重复保存不打包</span>
        <span class="hljs-attribute">poll</span>: <span class="hljs-number">1000</span>  <span class="hljs-comment">//每秒询问的文件变更的次数</span>
    },
    <span class="hljs-attribute">devServer</span>:{
        <span class="hljs-attribute">inline</span>: true,
        <span class="hljs-attribute">compress</span>: true,
        <span class="hljs-attribute">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
        <span class="hljs-attribute">port</span>: <span class="hljs-number">2500</span>,
        <span class="hljs-attribute">historyApiFallback</span>: true
    }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始的 webpack4 + vue2.x

## 原文链接
[https://segmentfault.com/a/1190000014251654](https://segmentfault.com/a/1190000014251654)

