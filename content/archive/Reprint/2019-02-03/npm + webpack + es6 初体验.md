---
title: 'npm + webpack + es6 初体验' 
date: 2019-02-03 2:30:40
hidden: true
slug: dxwtyzhrfik
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">准备</h2>
<ol>
<li><p>下载Node.js和npm</p></li>
<li><p>一个命令行工具（我的是git bash）。不是必须的，用自带的命令行也可以。</p></li>
<li><p>创建一个文件夹，作为根目录，比如 npm-webpack-es6</p></li>
</ol>
<p>这时，你将看到一个空文件夹</p>
<h2 id="articleHeader1">开始</h2>
<ol>
<li><p>命令行打开至根目录</p></li>
<li><p>键入 npm init,一路确定到yes   ————————创建一个package.json。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVDnep?w=607&amp;h=171" src="https://static.alili.tech/img/bVDnep?w=607&amp;h=171" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>  文件夹如左</p>
<p><span class="img-wrap"><img data-src="/img/bVDner?w=616&amp;h=309" src="https://static.alili.tech/img/bVDner?w=616&amp;h=309" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>  package.json 内部如左</p>
<h2 id="articleHeader2">安装webpack</h2>
<p><strong>安装webpack前，先附上几个常用的npm命令</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
npm init      这个指令会引导你创建一个package.json，包括版本作者等信息，有助于你发包。后面安装的包的依赖关系也会在package.json里有体现。
npm install     直接执行这个命令，会按照当前目录下的package.json的配置去安装各个依赖的包。
npm install [module]    在当前目录安装这个模块。会去检测该模块是否存在于node_module文件夹中，存在了就不安装了。 
npm install [module] -g    在全局进行模块安装。全局模式下安装的包，会自动注册到系统变量 path里的。
npm install [module] --save-dev    在当前目录下安装这个模块，但是仅在开发时使用。在package的&quot;devDependencies&quot;下，表示仅在开发的时候使用。

有一些包是需要用命令行的，这些需要注册系统变量，因此像supervisor等包，一定要安装在全局。否则就不能用它的命令行指令。
有一些包是在js中使用的，那么这些包安装到当前目录就可以了。
webpack 一般建议全局安一个，当前目录安一个。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">npm</span> init      这个指令会引导你创建一个package.json，包括版本作者等信息，有助于你发包。后面安装的包的依赖关系也会在package.json里有体现。
<span class="hljs-built_in">npm</span> install     直接执行这个命令，会按照当前目录下的package.json的配置去安装各个依赖的包。
<span class="hljs-built_in">npm</span> install [<span class="hljs-built_in">module</span>]    在当前目录安装这个模块。会去检测该模块是否存在于node_module文件夹中，存在了就不安装了。 
<span class="hljs-built_in">npm</span> install [<span class="hljs-built_in">module</span>] -g    在全局进行模块安装。全局模式下安装的包，会自动注册到系统变量 path里的。
<span class="hljs-built_in">npm</span> install [<span class="hljs-built_in">module</span>] --save-dev    在当前目录下安装这个模块，但是仅在开发时使用。在package的<span class="hljs-string">"devDependencies"</span>下，表示仅在开发的时候使用。

有一些包是需要用命令行的，这些需要注册系统变量，因此像supervisor等包，一定要安装在全局。否则就不能用它的命令行指令。
有一些包是在js中使用的，那么这些包安装到当前目录就可以了。
webpack 一般建议全局安一个，当前目录安一个。
</code></pre>
<p>我们刚才已经使用了npm init创建了一个package.json，接下来我们开始安装webpack。</p>
<p><strong>首先在全局安装一个webpack</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="执行 npm install webpack -g         （已经全局安装webpack 的可以跳过这一步）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>执行 npm <span class="hljs-keyword">install</span> webpack -g         （已经全局安装webpack 的可以跳过这一步）
</code></pre>
<p><strong>然后在当前目录下安装一个webpack</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="执行 npm install webpack --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">执行 npm <span class="hljs-keyword">install</span> webpack <span class="hljs-comment">--save</span></code></pre>
<p>你会发现当前目录下新增了一个文件夹node_module，在里头有着webpack的包</p>
<p><strong>检验下，webpack 安装成功了没</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="执行  webpack -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">执行  webpack -v</code></pre>
<p>如果webpack安装成功了，就会在命令行打印出webpack的版本和帮助。<br>如果失败了，检测一下有没有在全局安装webpack。</p>
<p>当你执行到这步，你的文件夹长这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   --npm-webpack-es6
        --package.json
        --node_module
            --webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>   -<span class="ruby">-npm-webpack-es6
</span>        -<span class="ruby">-package.json
</span>        -<span class="ruby">-node_module
</span>            -<span class="ruby">-webpack</span></code></pre>
<p>package.json长这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;npm-webpack-es6&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^1.13.2&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"npm-webpack-es6"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.2"</span>
  }
}
</code></pre>
<h2 id="articleHeader3">使用webpack来组织文件</h2>
<p>在直接介绍使用es6模块化语言来组织文件之前，我们先了解一下webpack的使用。<br>  webpack会将我们用模块化语言语法写成的源文件，编译成浏览器可识别的文件。也就是有从源文件→线上文件的过程。</p>
<p>我们来实践一下：</p>
<ul>
<li><p>首先在根目录下创建一个文件夹src来放源文件；</p></li>
<li><p>再创建一个文件夹dist来放编译后文件；</p></li>
<li><p>新建一个html文件来放html文件</p></li>
<li><p>最后创建一个webpack.config.js。 （先创个空的，待会儿加内容）</p></li>
</ul>
<p>这时你的目录结构将如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVDozM?w=941&amp;h=296" src="https://static.alili.tech/img/bVDozM?w=941&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>webpack.config.js是webpack的配置文件。<br><strong>要搞懂webpack其实就是要懂得怎么来配置 webpack.config.js。</strong><br>本文介绍一个基础的配置，完整的配置教程请参照官网文档——<a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">webpack官网文档</a>。</p>
<p><strong>接下来：</strong></p>
<ul><li>
<p>在src中新建一个文件—— sourceFile.js</p>
<p>文件内容，随意点：</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sourceFile.js
console.log('我是superman')；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//sourceFile.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是superman'</span>)；</code></pre>
<ul><li><p>配置 webpack.config.js （关键一步）</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:{
        bundle : __dirname + '/src/sourceFile.js' 
    },
    output:{
        path: __dirname + '/dist',
        filename: '[name].js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports = {
    entry:{
        bundle : __dirname + <span class="hljs-string">'/src/sourceFile.js'</span> 
    },
    output:{
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    }
}</code></pre>
<p>这个文件仅有entry和output，应该是最简单的配置文件了。</p>
<ol>
<li><p>module.exports 是CommonJS的写法，这个是Node.js的规范</p></li>
<li><p>__dirname 代表当前目录,Node.js会去识别</p></li>
<li><p>entry中，值为一个路径，代表源文件的存放位置。键，则可以随便取，在我的配置中，编译后文件的名字就是这里的键。</p></li>
<li><p>output中，path为编译后的文件存放的文件夹。 filename 为编译后文件夹名字。 其中[name]代表了entry中的键。也就是说上面是什么名字，编译后就是什么名字。可以自己试验下。</p></li>
</ol>
<hr>
<ul><li>
<p>使用webpack进行编译</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在命令行键入 webpack -w            
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>在命令行键入 webpack -w            
</code></pre>
</li></ul>
<p>成功编译的话，命令行的显示</p>
<p><span class="img-wrap"><img data-src="/img/bVDoEU?w=584&amp;h=126" src="https://static.alili.tech/img/bVDoEU?w=584&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>同时在dist中会新出现一个 bundle.js, 代码长这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};

/******/     // The require function
/******/     function __webpack_require__(moduleId) {

/******/         // Check if module is in cache
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;

/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };

/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/         // Flag the module as loaded
/******/         module.loaded = true;

/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }


/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;

/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;

/******/     // __webpack_public_path__
/******/     __webpack_require__.p = &quot;&quot;;

/******/     // Load entry module and return exports
/******/     return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

    console.log('我是superman');

/***/ }
/******/ ]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> (function(modules) { <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedModules = {};

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The require function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     function __webpack_require__(moduleId) {

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedModules[moduleId])
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> module = installedModules[moduleId] = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             exports: {},
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             id: moduleId,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             loaded: <span class="hljs-keyword">false</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         module.loaded = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">return</span> module.exports;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     }


<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.m = modules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.c = installedModules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// __webpack_public_path__</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.p = <span class="hljs-string">""</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Load entry module and return exports</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> })
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports) {

    console.log(<span class="hljs-string">'我是superman'</span>);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ]);</code></pre>
<p>可以看到编译后的js多了很多额外的内容，所以如果项目小的话是不需要模块化的。模块化是用来构建中大型项目的。</p>
<p><strong>来看看效果</strong></p>
<ul><li><p>在html文件夹下新建一个 test.html</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>看看我们编译后的js可不可以用</title>
</head>
<body>
    <script src = &quot;../dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>看看我们编译后的js可不可以用<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span> = <span class="hljs-string">"../dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在浏览器打开test.html，你会看到浏览器的console中：</p>
<p><span class="img-wrap"><img data-src="/img/bVDoGj?w=289&amp;h=89" src="https://static.alili.tech/img/bVDoGj?w=289&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>说明我们将源文件sourceFile.js编译后生成的bundle.js，是可以正常使用的。</p>
<p><strong>疑惑</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 这样子做的话，和html中直接引用源文件效果是一样的啊。话说为什么要编译啊？这样不是更麻烦吗？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 这样子做的话，和html中直接引用源文件效果是一样的啊。话说为什么要编译啊？这样不是更麻烦吗？</code></pre>
<p>这是我刚接触webpack的感受。后来，我逐步理解了，编译其实是为了实现模块化。基于AMD/CMD/CommonJS/es6的语法，浏览器是无法识别的。这些规范的语法，你可以感受一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //AMD
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC)
{
    alert('加载成功');
});

//CMD
seajs.use(&quot;../static/hello/src/main&quot;)

//CommonJS
module.export = {
    name:'rouwan'
}

//es6模块
import {module1, module2} form './module.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">//AMD</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'moduleA'</span>, <span class="hljs-string">'moduleB'</span>, <span class="hljs-string">'moduleC'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">moduleA, moduleB, moduleC</span>)
</span>{
    alert(<span class="hljs-string">'加载成功'</span>);
});

<span class="hljs-comment">//CMD</span>
seajs.use(<span class="hljs-string">"../static/hello/src/main"</span>)

<span class="hljs-comment">//CommonJS</span>
<span class="hljs-built_in">module</span>.export = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">'rouwan'</span>
}

<span class="hljs-comment">//es6模块</span>
<span class="hljs-keyword">import</span> {module1, module2} form <span class="hljs-string">'./module.js'</span>;</code></pre>
<p>这些规范使用的语法，浏览器是不能识别的。不信你试一下，立马报错。除非未来几年，浏览器支持es2015的import和export。因此，需要由webpack来编译，编译后的文件，浏览器能够识别。</p>
<p>现在,我们开始使用es6模块语法来组织模块吧</p>
<h2 id="articleHeader4">使用es6模块语法</h2>
<p>webpack可以支持es6语法。这个也是为什么webpack强大的原因。用es6a ,想想就爽。<br> 当然，我们需要先下载配置babel</p>
<p><strong>下载和配置babel</strong><br>下载babel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-loader babel-core babel-preset-es2015  //下载babel的webpack加载器
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> install --save-dev <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015 </span> //下载<span class="hljs-keyword">babel的webpack加载器
</span></code></pre>
<p>下载完了，要去webpack.config.js进行配置，配置完的文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:{
        bundle : __dirname + '/src/sourceFile.js'
    },
    output:{
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module:{
        loaders:[{
            test: /\.js$/,
            loader: 'babel?presets=es2015'
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports = {
    entry:{
        bundle : __dirname + <span class="hljs-string">'/src/sourceFile.js'</span>
    },
    output:{
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    },
    module:{
        loaders:[{
            test: /\.js$/,
            loader: <span class="hljs-string">'babel?presets=es2015'</span>
        }]
    }
}</code></pre>
<p>可以看到，和之前的webpack.config.js相比，增加了一个loaders的配置。<br>大致意思是：所有的js文件，使用babel加载器来翻译一下<br>具体配置原理可查官网文档 <a href="http://webpack.github.io/docs/loaders.html" rel="nofollow noreferrer" target="_blank">loader的api</a></p>
<p>怎么看自己是否配置好呢？待会儿webpack编译时看有没有报错，浏览器端有没有识别es6语法就知道了。</p>
<p><strong>开始使用es6模块</strong><br>在src文件夹下新建一个文件——moduleTest.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//moduleTest.js
function say(){
    console.log('我引用了一个模块')
}

export {say}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//moduleTest.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我引用了一个模块'</span>)
}

<span class="hljs-keyword">export</span> {say}</code></pre>
<p>将sourceFile.js的内容改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sourceFile.js
import {say} from './moduleTest.js';
say();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">//sourceFile.js</span>
import {<span class="hljs-built_in">say</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleTest.js'</span>;
<span class="hljs-built_in">say</span>();</code></pre>
<p>在命令行运行webpack编译指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack -w" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack -w</span></code></pre>
<p>如果没有报错，先开心一下。嘿嘿。<br>别急，先去打开test.html看看，如果你看到了命令行成功打印</p>
<p><span class="img-wrap"><img data-src="/img/bVDoSg?w=289&amp;h=50" src="https://static.alili.tech/img/bVDoSg?w=289&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么，恭喜你，这个demo完整地跑完了。</p>
<h2 id="articleHeader5">结语</h2>
<p>前端工程化是大势所趋，我们将不再人工去实现 依赖管理，代码压缩混淆，测试，上线等开发流程，转而交由工具去完成。这些工具中，npm作为优秀的包管理工具，节省了我们在搜索各个库的官网下载库的时间，方便我们进行包的下载，更新，和依赖管理；webpack作为优秀的模块化构建工具，支持多种模块化规范，并能将css/字体/图片作为模块管理，编译各类js方言，有着丰富的插件，已经超出了一个模块加载器的范围，成为了一款强大的前端构建工具。</p>
<p>本文仅仅介绍了一个最简单的demo，因为我也正在学习中。详细的资料，还是要去看文档并实践，这里给出几个传送门以便大家详细了解npm/webpack/es6模块的知识。</p>
<p><a href="http://www.cnblogs.com/linjiqin/p/3765772.html" rel="nofollow noreferrer" target="_blank">npm常用指令</a><br><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">webpack官方文档</a><br><a href="http://es6.ruanyifeng.com/#docs/module" rel="nofollow noreferrer" target="_blank">阮一峰的ECMA6入门——es6模块</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
npm + webpack + es6 初体验

## 原文链接
[https://segmentfault.com/a/1190000006968235](https://segmentfault.com/a/1190000006968235)

