---
title: '从零搭建React全家桶框架教程' 
date: 2019-01-02 2:30:09
hidden: true
slug: scyesvxiw7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从零搭建React全家桶框架教程</h1>
<p>源码地址：<a href="https://github.com/brickspert/react-family" rel="nofollow noreferrer" target="_blank">https://github.com/brickspert/react-family</a> 欢迎star<br>提问反馈：<a href="https://github.com/brickspert/blog/issues/1" rel="nofollow noreferrer" target="_blank">blog</a></p>
<p><strong>原文地址:<a href="https://github.com/brickspert/blog/issues/1" rel="nofollow noreferrer" target="_blank">https://github.com/brickspert/blog/issues/1</a>(github这里我会不断更新教程的)</strong></p>
<p><strong>此处不更新，github上会一直更新</strong></p>
<h1 id="articleHeader1">写在前面</h1>
<p>当我第一次跟着项目做<code>react</code>项目的时候，由于半截加入的，对框架了解甚少，只能跟着别人的样板写。对整个框架没有一点了解。</p>
<p>做项目，总是要解决各种问题的，所以每个地方都需要去了解，但是对整个框架没有一个整体的了解，实在是不行。</p>
<p>期间，我也跟着别人的搭建框架的教程一步一步的走，但是经常因为自己太菜，走不下去。在经过各种蹂躏之后，对整个框架也有一个大概的了解，<br>我就想把他写下来，让后来的菜鸟能跟着我的教程对<code>react</code>全家桶有一个全面的认识。</p>
<p>我的这个教程，从新建根文件夹开始，到成型的框架，每个文件为什么要建立？建立了干什么？每个依赖都是干什么的？一步一步写下来，供大家学习。</p>
<p>当然，这个框架我以后会一直维护的，<strong>也希望大家能一起来完善这个框架</strong>，如果您有任何建议，欢迎留言，欢迎<code>fork</code>。</p>
<p>在完善本框架的同时，我准备再新建一个兼容<code>ie8</code>的框架<code>react-family-ie8</code>，当然是基于该框架改造的。</p>
<h1 id="articleHeader2">说明</h1>
<ol><li>每个命令行块都是以<strong>根目录</strong>为基础的。例如下面命令行块，都是基于根目录的。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages
mkdir Home" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/pages
mkdir Home</code></pre>
<ol><li>技术栈均是目前最新的。</li></ol>
<ul>
<li>react 15.6.1</li>
<li>react-router-dom 4.2.2</li>
<li>redux 3.7.2</li>
<li>webpack 3.5.5</li>
</ul>
<ol><li>目录说明</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  .babelrc                          #babel配置文件
│  package-lock.json
│  package.json
│  README.MD
│  webpack.config.js                 #webpack生产配置文件
│  webpack.dev.config.js             #webpack开发配置文件
│  
├─dist
├─public                             #公共资源文件
└─src                                #项目源码
    │  index.html                    #index.html模板
    │  index.js                      #入口文件
    │  
    ├─component                      #组建库
    │  └─Hello
    │          Hello.js
    │          
    ├─pages                          #页面目录
    │  ├─Counter
    │  │      Counter.js
    │  │      
    │  ├─Home
    │  │      Home.js
    │  │      
    │  ├─Page1
    │  │  │  Page1.css                #页面样式
    │  │  │  Page1.js
    │  │  │  
    │  │  └─images                    #页面图片
    │  │          brickpsert.jpg
    │  │          
    │  └─UserInfo
    │          UserInfo.js
    │          
    ├─redux
    │  │  reducers.js
    │  │  store.js
    │  │  
    │  ├─actions
    │  │      counter.js
    │  │      userInfo.js
    │  │      
    │  ├─middleware
    │  │      promiseMiddleware.js
    │  │      
    │  └─reducers
    │          counter.js
    │          userInfo.js
    │          
    └─router                        #路由文件
            Bundle.js
            router.js
            
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">│  .babelrc                          #babel配置文件
│  package-lock.json
│  package.json
│  README.MD
│  webpack.config.js                 #webpack生产配置文件
│  webpack.dev.config.js             #webpack开发配置文件
│  
├─dist
├─public                             #公共资源文件
└─src                                #项目源码
    │  index.html                    #index.html模板
    │  index.js                      #入口文件
    │  
    ├─component                      #组建库
    │  └─Hello
    │          Hello.js
    │          
    ├─pages                          #页面目录
    │  ├─Counter
    │  │      Counter.js
    │  │      
    │  ├─Home
    │  │      Home.js
    │  │      
    │  ├─Page1
    │  │  │  Page1.css                #页面样式
    │  │  │  Page1.js
    │  │  │  
    │  │  └─images                    #页面图片
    │  │          brickpsert.jpg
    │  │          
    │  └─UserInfo
    │          UserInfo.js
    │          
    ├─redux
    │  │  reducers.js
    │  │  store.js
    │  │  
    │  ├─actions
    │  │      counter.js
    │  │      userInfo.js
    │  │      
    │  ├─middleware
    │  │      promiseMiddleware.js
    │  │      
    │  └─reducers
    │          counter.js
    │          userInfo.js
    │          
    └─router                        #路由文件
            Bundle.js
            router.js
            
</code></pre>
<h1 id="articleHeader3">init项目</h1>
<ol>
<li>
<p>创建文件夹并进入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`mkdir react-family &amp;&amp; cd react-family`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`mkdir react-family &amp;&amp; cd react-family`
</code></pre>
</li>
<li>
<p>init npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`npm init` 按照提示填写项目基本信息
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`npm init` 按照提示填写项目基本信息
</code></pre>
</li>
</ol>
<h1 id="articleHeader4">webpack</h1>
<ol>
<li>安装 <code>webpack</code><p><code>npm install --save-dev webpack</code></p>
<p>Q: 什么时候用<code>--save-dev</code>，什么时候用<code>--save</code>？</p>
<p>A:  <code>--save-dev</code> 是你开发时候依赖的东西，<code>--save</code> 是你发布之后还依赖的东西。看<a href="https://segmentfault.com/q/1010000005163089">这里</a></p>
</li>
<li>
<p>根据<a href="https://doc.webpack-china.org/guides/getting-started" rel="nofollow noreferrer" target="_blank">webpack文档</a>编写最基础的配置文件</p>
<p>新建<code>webpack</code>开发配置文件 <code>touch webpack.dev.config.js</code> </p>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = {
 
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
 
    <span class="hljs-comment">/*入口*/</span>
    entry: path.join(__dirname, <span class="hljs-string">'src/index.js'</span>),
    
    <span class="hljs-comment">/*输出到dist文件夹，输出文件名字为bundle.js*/</span>
    output: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
    }
};</code></pre>
</li>
<li>学会使用<code>webpack</code>编译文件<p>新建入口文件</p>
<p><code>mkdir src &amp;&amp; touch ./src/index.js</code></p>
<p><code>src/index.js</code> 添加内容</p>
<p><code>document.getElementById('app').innerHTML = "Webpack works"</code></p>
<p>现在我们执行命令 <code>webpack --config webpack.dev.config.js</code></p>
<p>我们可以看到生成了<code>dist</code>文件夹和<code>bundle.js</code>。</p>
</li>
<li>
<p>现在我们测试下~</p>
<p><code>dist</code>文件夹下面新建一个<code>index.html</code></p>
<p><code>touch ./dist/index.html</code></p>
<p><code>dist/index.html</code>填写内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
</head>
<body>
<div id=&quot;app&quot;></div>
<script type=&quot;text/javascript&quot; src=&quot;./bundle.js&quot; charset=&quot;utf-8&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./bundle.js"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>用浏览器打开<code>index.html</code>,可以看到<code>Webpack works</code>!</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981893" src="https://static.alili.tech/img/remote/1460000010981893" alt="webpack" title="webpack" style="cursor: pointer;"></span></p>
<p>现在回头看下，我们做了什么或者说<code>webpack</code>做了什么。</p>
<p>把入口文件 <code>index.js</code> 经过处理之后，生成 <code>bundle.js</code>。就这么简单。</p>
</li>
</ol>
<h1 id="articleHeader5">babel</h1>
<blockquote><p>Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。</p></blockquote>
<p>通俗的说，就是我们可以用ES6, ES7等来编写代码，Babel会把他们统统转为ES5。</p>
<ul>
<li>
<a href="https://github.com/babel/babel/tree/master/packages/babel-core" rel="nofollow noreferrer" target="_blank">babel-core</a> 调用Babel的API进行转码</li>
<li><a href="https://github.com/babel/babel-loader" rel="nofollow noreferrer" target="_blank">babel-loader</a></li>
<li>
<a href="https://github.com/babel/babel/tree/master/packages/babel-preset-es2015" rel="nofollow noreferrer" target="_blank">babel-preset-es2015</a> 用于解析 ES6</li>
<li>
<a href="https://github.com/babel/babel/tree/master/packages/babel-preset-react" rel="nofollow noreferrer" target="_blank">babel-preset-react</a> 用于解析 JSX</li>
<li>
<a href="https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0" rel="nofollow noreferrer" target="_blank">babel-preset-stage-0</a> 用于解析 ES7 提案</li>
</ul>
<p><code>npm install --save-dev babel-core  babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0</code></p>
<p>新建<code>babel</code>配置文件<code>.babelrc</code></p>
<p><code>touch .babelrc</code></p>
<p><code>.babelrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;presets&quot;: [
     &quot;es2015&quot;,
     &quot;react&quot;,
     &quot;stage-0&quot;
   ],
   &quot;plugins&quot;: []
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> {
   <span class="hljs-attr">"presets"</span>: [
     <span class="hljs-string">"es2015"</span>,
     <span class="hljs-string">"react"</span>,
     <span class="hljs-string">"stage-0"</span>
   ],
   <span class="hljs-attr">"plugins"</span>: []
 }
</code></pre>
<p>修改<code>webpack.dev.config.js</code>，增加<code>babel-loader</code>！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
 module: {
     rules: [{
         test: /\.js$/,
         use: ['babel-loader?cacheDirectory=true'],
         include: path.join(__dirname, 'src')
     }]
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
 module: {
     rules: [{
         test: /\.js$/,
         use: ['babel-loader?cacheDirectory=<span class="hljs-literal">true</span>'],
         include: path.join(__dirname, 'src')
     }]
 }</code></pre>
<p>现在我们简单测试下，是否能正确转义ES6~</p>
<p>修改 <code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /*使用es6的箭头函数*/
 var func = str => {
     document.getElementById('app').innerHTML = str;
 };
 func('我现在在使用Babel!');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">/*使用es6的箭头函数*/</span>
 <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> {
     <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).innerHTML = str;
 };
 func(<span class="hljs-string">'我现在在使用Babel!'</span>);</code></pre>
<p>执行打包命令<code>webpack --config webpack.dev.config.js</code></p>
<p>浏览器打开<code>index.html</code>，我们看到正确输出了<code>我现在在使用Babel!</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981894" src="https://static.alili.tech/img/remote/1460000010981894" alt="babel" title="babel" style="cursor: pointer;"></span></p>
<p>然后我们打开打包后的<code>bundle.js</code>,翻页到最下面,可以看到箭头函数被转换成普通函数了！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981895" src="https://static.alili.tech/img/remote/1460000010981895" alt="babel-bundle.png" title="babel-bundle.png" style="cursor: pointer;"></span></p>
<p>Q: <code>babel-preset-state-0</code>,<code>babel-preset-state-1</code>,<code>babel-preset-state-2</code>,<code>babel-preset-state-3</code>有什么区别？</p>
<p>A: 每一级包含上一级的功能，比如 <code>state-0</code>包含<code>state-1</code>的功能，以此类推。<code>state-0</code>功能最全。具体可以看这篇文章：<a href="https://www.vanadis.cn/2017/03/18/babel-stage-x/" rel="nofollow noreferrer" target="_blank">babel配置-各阶段的stage的区别</a></p>
<p>参考地址：</p>
<ol>
<li><a href="https://segmentfault.com/a/1190000008159877">https://segmentfault.com/a/11...</a></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p></li>
</ol>
<h1 id="articleHeader6">react</h1>
<p><code>npm install --save react react-dom</code></p>
<p>修改 <code>src/index.js</code>使用<code>react</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    <div>Hello React!</div>, document.getElementById('app'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

ReactDom.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));</code></pre>
<p>执行打包命令<code>webpack --config webpack.dev.config.js</code></p>
<p>打开<code>index.html</code> 看效果。</p>
<p>我们简单做下改进，把<code>Hello React</code>放到组件里面。体现组件化~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
mkdir component
cd component
mkdir Hello
cd Hello
touch Hello.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src
mkdir component
cd component
mkdir Hello
cd Hello
touch Hello.js</code></pre>
<p>按照React语法，写一个Hello组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div>
                Hello,React!
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                Hello,React!
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>然后让我们修改<code>src/index.js</code>，引用<code>Hello</code>组件！</p>
<p><code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';
import Hello from './component/Hello/Hello';

ReactDom.render(
    <Hello/>, document.getElementById('app'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./component/Hello/Hello'</span>;

ReactDom.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));</code></pre>
<p>在<strong>根目录</strong>执行打包命令</p>
<p><code>webpack --config webpack.dev.config.js</code></p>
<p>打开<code>index.html</code>看效果咯~</p>
<h1 id="articleHeader7">命令优化</h1>
<p>Q：每次打包都得在根目录执行这么一长串命令<code>webpack --config webpack.dev.config.js</code>,能不打这么长吗？</p>
<p>A：修改<code>package.json</code>里面的<code>script</code>，增加<code>dev-build</code>。</p>
<p><code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;dev-build&quot;: &quot;webpack --config webpack.dev.config.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"dev-build"</span>: <span class="hljs-string">"webpack --config webpack.dev.config.js"</span>
  }</code></pre>
<p>现在我们打包只需要执行<code>npm start-build</code>就可以啦！</p>
<p>参考地址：</p>
<p><a href="http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>
<h1 id="articleHeader8">react-router</h1>
<p><code>npm install  --save react-router-dom</code></p>
<p>新建<code>router</code>文件夹和组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
mkdir router &amp;&amp; touch router/router.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">cd</span> src
<span class="hljs-built_in">mkdir</span> router &amp;&amp; touch router/router.js</code></pre>
<p>按照<code>react-router</code><a href="http://reacttraining.cn/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">文档</a>编辑一个最基本的<code>router.js</code>。包含两个页面<code>home</code>和<code>page1</code>。</p>
<p><code>src/router/router.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Page1 from '../pages/Page1/Page1';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to=&quot;/&quot;>首页</Link></li>
                <li><Link to=&quot;/page1&quot;>Page1</Link></li>
            </ul>
            <Switch>
                <Route exact path=&quot;/&quot; component={Home}/>
                <Route path=&quot;/page1&quot; component={Page1}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {BrowserRouter <span class="hljs-keyword">as</span> Router, Route, Switch, Link} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/Home/Home'</span>;
<span class="hljs-keyword">import</span> Page1 <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/Page1/Page1'</span>;


<span class="hljs-keyword">const</span> getRouter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    &lt;Router&gt;
        &lt;div&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;Link to="/"&gt;首页&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/page1"&gt;Page1&lt;/Link&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;Switch&gt;
                &lt;Route exact path="/" component={Home}/&gt;
                &lt;Route path="/page1" component={Page1}/&gt;
            &lt;/Switch&gt;
        &lt;/div&gt;
    &lt;/Router&gt;
);

export default getRouter;</code></pre>
<p>新建页面文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
mkdir pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">cd</span> src
<span class="hljs-built_in">mkdir</span> pages</code></pre>
<p>新建两个页面 <code>Home</code>,<code>Page1</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages
mkdir Home &amp;&amp; touch Home/Home.js
mkdir Page1 &amp;&amp; touch Page1/Page1.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">cd</span> src/pages
<span class="hljs-built_in">mkdir</span> Home &amp;&amp; touch Home/Home.js
<span class="hljs-built_in">mkdir</span> Page1 &amp;&amp; touch Page1/Page1.js</code></pre>
<p>填充内容：</p>
<p><code>src/pages/Home/Home.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                this is home~
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                this is home~
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>Page1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

export default class Page1 extends Component {
    render() {
        return (
            <div>
                this is Page1~
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                this is Page1~
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>现在路由和页面建好了，我们在入口文件<code>src/index.js</code>引用Router。</p>
<p>修改<code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

ReactDom.render(
    getRouter(), document.getElementById('app'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">import</span> getRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/router'</span>;

ReactDom.render(
    getRouter(), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));</code></pre>
<p>现在执行打包命令<code>npm start-build</code>。打开<code>index.html</code>查看效果啦！</p>
<p>那么问题来了~我们发现点击‘首页’和‘Page1’没有反应。不要惊慌，这是正常的。</p>
<p>我们之前一直用这个路径访问<code>index.html</code>，类似这样：<code>file:///F:/react/react-family/dist/index.html</code>。<br>这种路径了，不是我们想象中的路由那样的路径<code>http://localhost:3000</code>~我们需要配置一个简单的WEB服务器，指向<br><code>index.html</code>~有下面两种方法来实现</p>
<ol>
<li>
<code>Nginx</code>, <code>Apache</code>, <code>IIS</code>等配置启动一个简单的的WEB服务器。</li>
<li>使用<code>webpack-dev-server</code>来配置启动WEB服务器。</li>
</ol>
<p>下一节，我们来使用第二种方法启动服务器。这一节的DEMO，先放这里。</p>
<p>参考地址</p>
<ol>
<li><a href="http://www.jianshu.com/p/e3adc9b5f75c" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/e3ad...</a></li>
<li><a href="http://reacttraining.cn/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">http://reacttraining.cn/web/g...</a></li>
</ol>
<h1 id="articleHeader9">webpack-dev-server</h1>
<p>简单来说，<code>webpack-dev-server</code>就是一个小型的静态文件服务器。使用它，可以为<code>webpack</code>打包生成的资源文件提供Web服务。</p>
<p><code>npm install webpack-dev-server --save-dev</code></p>
<p>修改<code>webpack.dev.config.js</code>,增加<code>webpack-dev-server</code>的配置。</p>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    devServer: {
        contentBase: path.join(__dirname, './dist')
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    devServer: {
        <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>)
    }</code></pre>
<p>现在执行</p>
<p><code>webpack-dev-server --config webpack.dev.config.js</code></p>
<p>浏览器打开<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>，OK,现在我们可以点击<code>首页</code>,<code>Page1</code>了，<br>看URL地址变化啦！我们看到<code>react-router</code>已经成功了哦。</p>
<p>Q: <code>--content-base</code>是什么？</p>
<p>A：<code>URL的根目录。如果不设定的话，默认指向项目根目录。</code></p>
<p>**重要提示：webpack-dev-server编译后的文件，都存储在内存中，我们并不能看见的。你可以删除之前遗留的文件<code>dist/bundle.js</code>，<br>仍然能正常打开网站！**</p>
<p>每次执行<code>webpack-dev-server --config webpack.dev.config.js</code>,要打很长的命令，我们修改<code>package.json</code>，增加<code>script-&gt;start</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;dev-build&quot;: &quot;webpack --config webpack.dev.config.js&quot;,
    &quot;start&quot;: &quot;webpack-dev-server --config webpack.dev.config.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"dev-build"</span>: <span class="hljs-string">"webpack --config webpack.dev.config.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.dev.config.js"</span>
  }</code></pre>
<p>下次执行<code>npm start</code>就可以了。</p>
<p>既然用到了<code>webpack-dev-server</code>，我们就看看<a href="https://doc.webpack-china.org/configuration/dev-server" rel="nofollow noreferrer" target="_blank">它的其他的配置项</a>。<br>看了之后，发现有几个我们可以用的。</p>
<ul>
<li>color（CLI only） <code>console</code>中打印彩色日志</li>
<li>historyApiFallback 任意的<code>404</code>响应都被替代为<code>index.html</code>。有什么用呢？你现在运行<br><code>npm start</code>，然后打开浏览器，访问<code>http://localhost:8080</code>,然后点击<code>Page1</code>到链接<code>http://localhost:8080/page1</code>，</li>
</ul>
<p>然后刷新页面试试。是不是发现刷新后<code>404</code>了。为什么？<code>dist</code>文件夹里面并没有<code>page1.html</code>,当然会<code>404</code>了，所以我们需要配置<br><code>historyApiFallback</code>，让所有的<code>404</code>定位到<code>index.html</code>。</p>
<ul>
<li>host 指定一个<code>host</code>,默认是<code>localhost</code>。如果你希望服务器外部可以访问，指定如下：<code>host: "0.0.0.0"</code>。比如你用手机通过IP访问。</li>
<li>hot 启用<code>Webpack</code>的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。</li>
<li>port 配置要监听的端口。默认就是我们现在使用的<code>8080</code>端口。</li>
<li>proxy 代理。比如在 <code>localhost:3000</code> 上有后端服务的话，你可以这样启用代理：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxy: {
      &quot;/api&quot;: &quot;http://localhost:3000&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    proxy: {
      <span class="hljs-string">"/api"</span>: <span class="hljs-string">"http://localhost:3000"</span>
    }</code></pre>
<ul><li>progress（CLI only） 将编译进度输出到控制台。</li></ul>
<p>根据这几个配置，修改下我们的<code>webpack-dev-server</code>的配置~</p>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    devServer: {
        <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">host</span>: <span class="hljs-string">'0.0.0.0'</span>
    }</code></pre>
<p><code>CLI ONLY</code>的需要在命令行中配置</p>
<p><code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;webpack-dev-server --config webpack.dev.config.js --color --progress&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.dev.config.js --color --progress"</span></code></pre>
<p>现在我们执行<code>npm start</code> 看看效果。是不是看到打包的时候有百分比进度？在<code>http://localhost:8080/page1</code>页面刷新是不是没问题了？<br>用手机通过局域网IP是否可以访问到网站？</p>
<p>参考地址：</p>
<ol>
<li><a href="https://segmentfault.com/a/1190000006670084">https://segmentfault.com/a/11...</a></li>
<li><a href="https://webpack.js.org/guides/development/#using-webpack-dev-server" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides...</a></li>
</ol>
<h1 id="articleHeader10">模块热替换（Hot Module Replacement）</h1>
<p>到目前，当我们修改代码的时候，浏览器会自动刷新，不信你可以去试试。（如果你的不会刷新，看看这个<a href="#editor">调整文本编辑器</a>）</p>
<p>我相信看这个教程的人，应该用过别人的框架。我们在修改代码的时候，浏览器不会刷新，只会更新自己修改的那一块。我们也要实现这个效果。</p>
<p>我们看下<a href="https://doc.webpack-china.org/guides/hot-module-replacement" rel="nofollow noreferrer" target="_blank">webpack模块热替换</a>教程。</p>
<p>我们接下来要这么修改</p>
<p><code>package.json</code> 增加 <code>--hot</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;webpack-dev-server --config webpack.dev.config.js --color --progress --hot&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.dev.config.js --color --progress --hot"</span></code></pre>
<p><code>src/index.js</code> 增加<code>module.hot.accept()</code>,如下。当模块更新的时候，通知<code>index.js</code>。</p>
<p><code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    getRouter(), document.getElementById('app'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">import</span> getRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/router'</span>;

<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept();
}

ReactDom.render(
    getRouter(), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>
<p>现在我们执行<code>npm start</code>，打开浏览器，修改<code>Home.js</code>,看是不是不刷新页面的情况下，内容更新了？惊不惊喜？意不意外？</p>
<p><strong>做模块热替换，我们只改了几行代码，非常简单的。纸老虎一个~</strong></p>
<p>现在我需要说明下我们命令行使用的<code>--hot</code>，可以通过配置<code>webpack.dev.config.js</code>来替换，<br>向文档上那样,修改下面三处。但我们还是用<code>--hot</code>吧。下面的方式我们知道一下就行，我们不用。同样的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

devServer: {
    hot: true
}

plugins:[
     new webpack.HotModuleReplacementPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

devServer: {
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
}

plugins:[
     <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
]</code></pre>
<p><code>HRM</code>配置其实有两种方式，一种<code>CLI</code>方式，一种<code>Node.js API</code>方式。我们用到的就是<code>CLI</code>方式，比较简单。<br><code>Node.js API</code>方式，就是建一个<code>server.js</code>等等，网上大部分教程都是这种方式，这里不做讲解了。</p>
<p>你以为模块热替换到这里就结束了？no~no~no~</p>
<p>上面的配置对<code>react</code>模块的支持不是很好哦。</p>
<p>例如下面的<code>demo</code>，当模块热替换的时候，<code>state</code>会重置，这不是我们想要的。</p>
<p>修改<code>Home.js</code>,增加计数<code>state</code></p>
<p><code>src/pages/Home/Home.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                this is home~<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
        }
    }

    _handleClick() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">count</span>: ++<span class="hljs-keyword">this</span>.state.count
        });
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                this is home~<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
                当前计数：{this.state.count}<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this._handleClick()}&gt;自增<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>你可以测试一下，当我们修改代码的时候，<code>webpack</code>在更新页面的时候，也把<code>count</code>初始为0了。</p>
<p>为了在<code>react</code>模块更新的同时，能保留<code>state</code>等页面中其他状态，我们需要引入<a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">react-hot-loader</a>~</p>
<p>Q:　请问<code>webpack-dev-server</code>与<code>react-hot-loader</code>两者的热替换有什么区别？</p>
<p>A:  区别在于<code>webpack-dev-serve</code>r自己的<code>--hot</code>模式只能即时刷新页面，但状态保存不住。因为<code>React</code>有一些自己语法(JSX)是<code>HotModuleReplacementPlugin</code>搞不定的。<br>而<code>react-hot-loader</code>在<code>--hot</code>基础上做了额外的处理，来保证状态可以存下来。（来自<a href="https://segmentfault.com/q/1010000005612845">segmentfault</a>）</p>
<p>下面我们来加入<code>react-hot-loader v3</code>,</p>
<p>安装依赖</p>
<p><code>npm install react-hot-loader@next --save-dev</code></p>
<p>根据<a href="https://gaearon.github.io/react-hot-loader/getstarted/" rel="nofollow noreferrer" target="_blank">文档</a>，<br>我们要做如下几个修改~</p>
<ol><li>
<code>.babelrc</code> 增加 <code>react-hot-loader/babel</code>
</li></ol>
<p><code>.babelrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;es2015&quot;,
    &quot;react&quot;,
    &quot;stage-0&quot;
  ],
  &quot;plugins&quot;: [
    &quot;react-hot-loader/babel&quot;
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"stage-0"</span>
  ],
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"react-hot-loader/babel"</span>
  ]
}
</code></pre>
<ol><li>
<code>webpack.dev.config.js</code>入口增加<code>react-hot-loader/patch</code>
</li></ol>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    entry: [
        <span class="hljs-string">'react-hot-loader/patch'</span>,
        path.join(__dirname, <span class="hljs-string">'src/index.js'</span>)
    ]</code></pre>
<ol><li>
<code>src/index.js</code>修改如下</li></ol>
<p><code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import getRouter from './router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {AppContainer} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-hot-loader'</span>;

<span class="hljs-keyword">import</span> getRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/router'</span>;

<span class="hljs-comment">/*初始化*/</span>
renderWithHotReload(getRouter());

<span class="hljs-comment">/*热更新*/</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'./router/router'</span>, () =&gt; {
        <span class="hljs-keyword">const</span> getRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./router/router'</span>).default;
        renderWithHotReload(getRouter());
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderWithHotReload</span>(<span class="hljs-params">RootElement</span>) </span>{
    ReactDom.render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContainer</span>&gt;</span>
            {RootElement}
        <span class="hljs-tag">&lt;/<span class="hljs-name">AppContainer</span>&gt;</span></span>,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
    )
}
</code></pre>
<p>现在，执行<code>npm start</code>，试试。是不是修改页面的时候，<code>state</code>不更新了？</p>
<p>参考文章：</p>
<ol><li><a href="https://github.com/gaearon/react-hot-loader/issues/243" rel="nofollow noreferrer" target="_blank">https://github.com/gaearon/re...</a></li></ol>
<h1 id="articleHeader11">文件路径优化</h1>
<p>做到这里，我们简单休息下。做下优化~</p>
<p>在之前写的代码中，我们引用组件，或者页面时候，写的是相对路径~</p>
<p>比如<code>src/router/router.js</code>里面，引用<code>Home.js</code>的时候就用的相对路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from '../pages/Home/Home';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/Home/Home'</span>;</code></pre>
<p>webpack提供了一个别名配置，就是我们无论在哪个路径下，引用都可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from 'pages/Home/Home';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Home/Home'</span>;</code></pre>
<p>下面我们来配置下，修改<code>webpack.dev.config.js</code>，增加别名~</p>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">pages</span>: path.join(__dirname, <span class="hljs-string">'src/pages'</span>),
            <span class="hljs-attr">component</span>: path.join(__dirname, <span class="hljs-string">'src/component'</span>),
            <span class="hljs-attr">router</span>: path.join(__dirname, <span class="hljs-string">'src/router'</span>)
        }
    }</code></pre>
<p>然后我们把之前使用的绝对路径统统改掉。</p>
<p><code>src/router/router.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Home/Home'</span>;
<span class="hljs-keyword">import</span> Page1 <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Page1/Page1'</span>;</code></pre>
<p><code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import getRouter from 'router/router';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> getRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'router/router'</span>;</code></pre>
<p>我们这里约定，下面，我们会默认配置需要的别名路径，不再做重复的讲述哦。</p>
<h1 id="articleHeader12">redux</h1>
<p>接下来，我们就要就要就要集成<code>redux</code>了。</p>
<p>要对<code>redux</code>有一个大概的认识，可以阅读阮一峰前辈的<a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html" rel="nofollow noreferrer" target="_blank">Redux 入门教程（一）：基本用法</a></p>
<p>如果要对<code>redux</code>有一个非常详细的认识，我推荐阅读<a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">中文文档</a>，写的非常好。读了这个教程，有一个非常深刻的感觉，<code>redux</code>并没有任何魔法。</p>
<p><strong>不要被各种关于 reducers, middleware, store 的演讲所蒙蔽 ---- Redux 实际是非常简单的。</strong></p>
<p>当然，我这篇文章是写给新手的，如果看不懂上面的文章，或者不想看，没关系。先会用，多用用就知道原理了。</p>
<p>开始整代码！我们就做一个最简单的计数器。自增，自减，重置。</p>
<p>先安装<code>redux</code> <code>npm install --save redux</code></p>
<p>初始化目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
mkdir redux
cd redux
mkdir actions
mkdir reducers
touch reducers.js
touch store.js
touch actions/counter.js
touch reducers/counter.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src
mkdir redux
cd redux
mkdir actions
mkdir reducers
touch reducers.js
touch store.js
touch actions/counter.js
touch reducers/counter.js</code></pre>
<p>先来写<code>action</code>创建函数。<strong>通过<code>action</code>创建函数，可以创建<code>action</code>~</strong><br><code>src/redux/actions/counter.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*action*/

export const INCREMENT = &quot;counter/INCREMENT&quot;;
export const DECREMENT = &quot;counter/DECREMENT&quot;;
export const RESET = &quot;counter/RESET&quot;;

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*action*/</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREMENT = <span class="hljs-string">"counter/INCREMENT"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DECREMENT = <span class="hljs-string">"counter/DECREMENT"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> RESET = <span class="hljs-string">"counter/RESET"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">type</span>: INCREMENT}
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decrement</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">type</span>: DECREMENT}
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reset</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">type</span>: RESET}
}</code></pre>
<p>再来写<code>reducer</code>,<strong><code>reducer</code>是一个纯函数，接收<code>action</code>和旧的<code>state</code>,生成新的<code>state</code>.</strong></p>
<p><code>src/redux/reducers/counter.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {INCREMENT, DECREMENT, RESET} from '../actions/counter';

/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {INCREMENT, DECREMENT, RESET} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/counter'</span>;

<span class="hljs-comment">/*
* 初始化state
 */</span>

<span class="hljs-keyword">const</span> initState = {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
};
<span class="hljs-comment">/*
* reducer
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state = initState, action</span>) </span>{
    <span class="hljs-keyword">switch</span> (action.type) {
        <span class="hljs-keyword">case</span> INCREMENT:
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">count</span>: state.count + <span class="hljs-number">1</span>
            };
        <span class="hljs-keyword">case</span> DECREMENT:
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">count</span>: state.count - <span class="hljs-number">1</span>
            };
        <span class="hljs-keyword">case</span> RESET:
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">count</span>: <span class="hljs-number">0</span>};
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> state
    }
}
</code></pre>
<p>一个项目有很多的<code>reducers</code>,我们要把他们整合到一起</p>
<p><code>src/redux/reducers.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import counter from './reducers/counter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> counter <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/counter'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">state = {}, action</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: counter(state.counter, action)
    }
}</code></pre>
<p>到这里，我们必须再理解下一句话。</p>
<p><strong><code>reducer</code>就是纯函数，接收<code>state</code> 和 <code>action</code>，然后返回一个新的 <code>state</code>。</strong></p>
<p>看看上面的代码，无论是<code>combineReducers</code>函数也好，还是<code>reducer</code>函数也好，都是接收<code>state</code>和<code>action</code>，<br>返回更新后的<code>state</code>。区别就是<code>combineReducers</code>函数是处理整棵树，<code>reducer</code>函数是处理树的某一点。</p>
<p>接下来，我们要创建一个<code>store</code>。</p>
<p>前面我们可以使用 <code>action</code> 来描述“发生了什么”，使用<code>action</code>创建函数来返回<code>action</code>。</p>
<p>还可以使用 <code>reducers</code> 来根据 <code>action</code> 更新 <code>state</code> 。</p>
<p>那我们如何提交<code>action</code>？提交的时候，怎么才能触发<code>reducers</code>呢？</p>
<p><code>store</code> 就是把它们联系到一起的对象。<code>store</code> 有以下职责：</p>
<ul>
<li>维持应用的 <code>state</code>；</li>
<li>提供 <code>getState()</code> 方法获取 <code>state</code>；</li>
<li>提供 <code>dispatch(action)</code> 触发<code>reducers</code>方法更新 <code>state</code>；</li>
<li>通过<code> subscribe(listener)</code> 注册监听器;</li>
<li>通过 <code>subscribe(listener)</code> 返回的函数注销监听器。</li>
</ul>
<p><code>src/redux/store.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore} from 'redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);

export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> combineReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers.js'</span>;

<span class="hljs-keyword">let</span> store = createStore(combineReducers);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<p>到现在为止，我们已经可以使用<code>redux</code>了~</p>
<p>下面我们就简单的测试下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
cd redux
touch testRedux.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src
cd redux
touch testRedux.js</code></pre>
<p><code>src/redux/testRedux.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {increment, decrement, reset} from './actions/counter';

import store from './store';

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

// 发起一系列 action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {increment, decrement, reset} <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions/counter'</span>;

<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>;

<span class="hljs-comment">// 打印初始状态</span>
<span class="hljs-built_in">console</span>.log(store.getState());

<span class="hljs-comment">// 每次 state 更新时，打印日志</span>
<span class="hljs-comment">// 注意 subscribe() 返回一个函数用来注销监听器</span>
<span class="hljs-keyword">let</span> unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-built_in">console</span>.log(store.getState())
);

<span class="hljs-comment">// 发起一系列 action</span>
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

<span class="hljs-comment">// 停止监听 state 更新</span>
unsubscribe();</code></pre>
<p>当前文件夹执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack testRedux.js build.js

node build.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>webpack testRedux.js build.js

<span class="hljs-keyword">node</span> <span class="hljs-title">build</span>.js</code></pre>
<p>是不是看到输出了<code>state</code>变化？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ counter: { count: 0 } }
{ counter: { count: 1 } }
{ counter: { count: 0 } }
{ counter: { count: 0 } }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ <span class="hljs-attribute">counter</span>: { count: <span class="hljs-number">0</span> } }
{ <span class="hljs-attribute">counter</span>: { count: <span class="hljs-number">1</span> } }
{ <span class="hljs-attribute">counter</span>: { count: <span class="hljs-number">0</span> } }
{ <span class="hljs-attribute">counter</span>: { count: <span class="hljs-number">0</span> } }
</code></pre>
<p>做这个测试，就是为了告诉大家，<code>redux</code>和<code>react</code>没关系，虽说他俩能合作。</p>
<p>到这里，我建议你再理下<code>redux</code>的数据流，看看<a href="http://cn.redux.js.org/docs/basics/DataFlow.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<ol>
<li>调用<code>store.dispatch(action)</code>提交<code>action</code>。</li>
<li>
<code>redux store</code>调用传入的<code>reducer</code>函数。把当前的<code>state</code>和<code>action</code>传进去。</li>
<li>根 <code>reducer</code> 应该把多个子 <code>reducer</code> 输出合并成一个单一的 <code>state</code> 树。</li>
<li>
<code>Redux store</code> 保存了根 <code>reducer</code> 返回的完整 <code>state</code> 树。</li>
</ol>
<p>就是酱紫~~</p>
<p>这会<code>webpack.dev.config.js</code>路径别名增加一下，后面好写了。</p>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        alias: {
            ...
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            redux: path.join(__dirname, 'src/redux')
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">        alias: {
            ...
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            redux: path.join(__dirname, 'src/redux')
        }
</code></pre>
<p>把前面的相对路径都改改。</p>
<p>下面我们开始搭配<code>react</code>使用。</p>
<p>写一个<code>Counter</code>页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages
mkdir Counter
touch Counter/Counter.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">cd</span> src/pages
<span class="hljs-built_in">mkdir</span> Counter
touch Counter/Counter.js</code></pre>
<p><code>src/pages/Counter/Counter.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

export default class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={() => {
                    console.log('调用自增函数');
                "}}">自增
                </button>
                <button onClick={() => {
                    console.log('调用自减函数');
                "}}">自减
                </button>
                <button onClick={() => {
                    console.log('调用重置函数');
                "}}">重置
                </button>
            </div>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>当前计数为(显示redux计数)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    console.log('调用自增函数');
                "}}"&gt;自增
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    console.log('调用自减函数');
                "}}"&gt;自减
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    console.log('调用重置函数');
                "}}"&gt;重置
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
</code></pre>
<p>修改路由，增加<code>Counter</code></p>
<p><code>src/router/router.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to=&quot;/&quot;>首页</Link></li>
                <li><Link to=&quot;/page1&quot;>Page1</Link></li>
                <li><Link to=&quot;/counter&quot;>Counter</Link></li>
            </ul>
            <Switch>
                <Route exact path=&quot;/&quot; component={Home}/>
                <Route path=&quot;/page1&quot; component={Page1}/>
                <Route path=&quot;/counter&quot; component={Counter}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {BrowserRouter <span class="hljs-keyword">as</span> Router, Route, Switch, Link} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Home/Home'</span>;
<span class="hljs-keyword">import</span> Page1 <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Page1/Page1'</span>;
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Counter/Counter'</span>;

<span class="hljs-keyword">const</span> getRouter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    &lt;Router&gt;
        &lt;div&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;Link to="/"&gt;首页&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/page1"&gt;Page1&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/counter"&gt;Counter&lt;/Link&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;Switch&gt;
                &lt;Route exact path="/" component={Home}/&gt;
                &lt;Route path="/page1" component={Page1}/&gt;
                &lt;Route path="/counter" component={Counter}/&gt;
            &lt;/Switch&gt;
        &lt;/div&gt;
    &lt;/Router&gt;
);

export default getRouter;</code></pre>
<p><code>npm start</code>看看效果。</p>
<p>下一步，我们让<code>Counter</code>组件和<code>Redux</code>联合起来。使<code>Counter</code>能获得到<code>Redux</code>的<code>state</code>，并且能发射<code>action</code>。</p>
<p>当然我们可以使用刚才测试<code>testRedux</code>的方法，手动监听~手动引入<code>store</code>~但是这肯定很麻烦哦。</p>
<p><code>react-redux</code>提供了一个方法<code>connect</code>。</p>
<blockquote><p>容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。</p></blockquote>
<p><code>connect</code>接收两个参数，一个<code>mapStateToProps</code>,就是把<code>redux</code>的<code>state</code>，转为组件的<code>Props</code>，还有一个参数是<code>mapDispatchToprops</code>,<br>就是把发射<code>actions</code>的方法，转为<code>Props</code>属性函数。</p>
<p>先来安装<code>react-redux</code></p>
<p><code>npm install --save react-redux</code></p>
<p><code>src/pages/Counter/Counter.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {increment, decrement, reset} from 'actions/counter';

import {connect} from 'react-redux';

class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {increment, decrement, reset} <span class="hljs-keyword">from</span> <span class="hljs-string">'actions/counter'</span>;

<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>当前计数为{this.props.counter.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.props.increment()}&gt;自增
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.props.decrement()}&gt;自减
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.props.reset()}&gt;重置
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: state.counter
    }
};

<span class="hljs-keyword">const</span> mapDispatchToProps = <span class="hljs-function">(<span class="hljs-params">dispatch</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            dispatch(increment())
        },
        <span class="hljs-attr">decrement</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            dispatch(decrement())
        },
        <span class="hljs-attr">reset</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            dispatch(reset())
        }
    }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(Counter);</code></pre>
<p>下面我们要传入<code>store</code></p>
<blockquote>
<p>所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。</p>
<p>建议的方式是使用指定的 React Redux 组件 &lt;Provider&gt; 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。</p>
</blockquote>
<p><code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

import getRouter from 'router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {AppContainer} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-hot-loader'</span>;
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./redux/store'</span>;

<span class="hljs-keyword">import</span> getRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'router/router'</span>;

<span class="hljs-comment">/*初始化*/</span>
renderWithHotReload(getRouter());

<span class="hljs-comment">/*热更新*/</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'./router/router'</span>, () =&gt; {
        <span class="hljs-keyword">const</span> getRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'router/router'</span>).default;
        renderWithHotReload(getRouter());
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderWithHotReload</span>(<span class="hljs-params">RootElement</span>) </span>{
    ReactDom.render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContainer</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
                {RootElement}
            <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">AppContainer</span>&gt;</span></span>,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
    )
}
</code></pre>
<p>到这里我们就可以执行<code>npm start</code>，打开<a>localhost:8080/counter</a>看效果了。</p>
<p><strong>但是你发现<code>npm start</code>一直报错</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in ./node_modules/react-redux/es/connect/mapDispatchToProps.js
Module not found: Error: Can't resolve 'redux' in 'F:\Project\react\react-family\node_modules\react-redux\es\connect'

ERROR in ./src/redux/store.js
Module not found: Error: Can't resolve 'redux' in 'F:\Project\react\react-family\src\redux'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ERROR <span class="hljs-keyword">in</span> ./node_modules/react-redux/es/connect/mapDispatchToProps.js
Module not found: <span class="hljs-built_in">Error</span>: Can<span class="hljs-string">'t resolve '</span>redux<span class="hljs-string">' in '</span>F:\Project\react\react-family\node_modules\react-redux\es\connect<span class="hljs-string">'

ERROR in ./src/redux/store.js
Module not found: Error: Can'</span>t resolve <span class="hljs-string">'redux'</span> <span class="hljs-keyword">in</span> <span class="hljs-string">'F:\Project\react\react-family\src\redux'</span></code></pre>
<p>WTF？这个错误困扰了半天。我说下为什么造成这个错误。我们引用<code>redux</code>的时候这样用的</p>
<p><code>import {createStore} from 'redux'</code></p>
<p>然而，我们在<code>webapck.dev.config.js</code>里面这样配置了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        alias: {
            ...
            redux: path.join(__dirname, 'src/redux')
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    resolve: {
        <span class="hljs-attr">alias</span>: {
            ...
            redux: path.join(__dirname, <span class="hljs-string">'src/redux'</span>)
        }
    }</code></pre>
<p>然后<code>webapck</code>编译的时候碰到<code>redux</code>都去<code>src/redux</code>去找了。但是找不到啊。所以我们把<code>webpack.dev.config.js</code>里面<code>redux</code>这一行删除了，就好了。<br>并且把使用我们自己使用<code>redux</code>文件夹的地方改成相对路径哦。</p>
<p>现在你可以<code>npm start</code>去看效果了。</p>
<p>这里我们再缕下（可以读<a href="http://taobaofed.org/blog/2016/08/18/react-redux-connect/" rel="nofollow noreferrer" target="_blank">React 实践心得：react-redux 之 connect 方法详解</a>）</p>
<ol>
<li>
<code>Provider</code>组件是让所有的组件可以访问到<code>store</code>。不用手动去传。也不用手动去监听。</li>
<li>
<code>connect</code>函数作用是从 <code>Redux state</code> 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递<code>dispatch(action)</code>函数到<code>props</code>。</li>
</ol>
<p>接下来，我们要说异步<code>action</code></p>
<p>参考地址： <a href="http://cn.redux.js.org/docs/advanced/AsyncActions.html" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/docs/a...</a></p>
<p>想象一下我们调用一个异步<code>get</code>请求去后台请求数据：</p>
<ol>
<li>请求开始的时候，界面转圈提示正在加载。<code>isLoading</code>置为<code>true</code>。</li>
<li>请求成功，显示数据。<code>isLoading</code>置为<code>false</code>,<code>data</code>填充数据。</li>
<li>请求失败，显示失败。<code>isLoading</code>置为<code>false</code>，显示错误信息。</li>
</ol>
<p>下面，我们以向后台请求用户基本信息为例。</p>
<ol><li>我们先创建一个<code>user.json</code>，等会请求用，相当于后台的API接口。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd dist
mkdir api
cd api
touch user.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd dist
mkdir api
cd api
touch user.json</code></pre>
<p><code>dist/api/user.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;brickspert&quot;,
  &quot;intro&quot;: &quot;please give me a star&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"brickspert"</span>,
  <span class="hljs-string">"intro"</span>: <span class="hljs-string">"please give me a star"</span>
}</code></pre>
<ol><li>创建必须的<code>action</code>创建函数。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/redux/actions
touch userInfo.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/redux/actions
touch userInfo.js</code></pre>
<p><code>src/redux/actions/getUserInfo.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const GET_USER_INFO_REQUEST = &quot;userInfo/GET_USER_INFO_REQUEST&quot;;
export const GET_USER_INFO_SUCCESS = &quot;userInfo/GET_USER_INFO_SUCCESS&quot;;
export const GET_USER_INFO_FAIL = &quot;userInfo/GET_USER_INFO_FAIL&quot;;

function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_REQUEST = <span class="hljs-string">"userInfo/GET_USER_INFO_REQUEST"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_SUCCESS = <span class="hljs-string">"userInfo/GET_USER_INFO_SUCCESS"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_FAIL = <span class="hljs-string">"userInfo/GET_USER_INFO_FAIL"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfoRequest</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_USER_INFO_REQUEST
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfoSuccess</span>(<span class="hljs-params">userInfo</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_USER_INFO_SUCCESS,
        <span class="hljs-attr">userInfo</span>: userInfo
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfoFail</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_USER_INFO_FAIL
    }
}</code></pre>
<p>我们创建了请求中，请求成功，请求失败三个<code>action</code>创建函数。</p>
<ol><li>创建<code>reducer</code>
</li></ol>
<p>再强调下，<code>reducer</code>是根据<code>state</code>和<code>action</code>生成新<code>state</code>的<strong>纯函数</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/redux/reducers
touch userInfo.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/redux/reducers
touch userInfo.js</code></pre>
<p><code>src/redux/reducers/userInfo.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from 'actions/userInfo';


const initState = {
    isLoading: false,
    userInfo: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.userInfo,
                errorMsg: ''
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} <span class="hljs-keyword">from</span> <span class="hljs-string">'actions/userInfo'</span>;


<span class="hljs-keyword">const</span> initState = {
    <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">userInfo</span>: {},
    <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">''</span>
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state = initState, action</span>) </span>{
    <span class="hljs-keyword">switch</span> (action.type) {
        <span class="hljs-keyword">case</span> GET_USER_INFO_REQUEST:
            <span class="hljs-keyword">return</span> {
                ...state,
                <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">userInfo</span>: {},
                <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">''</span>
            };
        <span class="hljs-keyword">case</span> GET_USER_INFO_SUCCESS:
            <span class="hljs-keyword">return</span> {
                ...state,
                <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">userInfo</span>: action.userInfo,
                <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">''</span>
            };
        <span class="hljs-keyword">case</span> GET_USER_INFO_FAIL:
            <span class="hljs-keyword">return</span> {
                ...state,
                <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">userInfo</span>: {},
                <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">'请求错误'</span>
            };
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> state;
    }
}</code></pre>
<p><strong>这里的<code>...state</code>语法，是和别人的<code>Object.assign()</code>起同一个作用，合并新旧state。我们这里是没效果的，但是我建议都写上这个哦</strong></p>
<p>组合<code>reducer</code></p>
<p><code>src/redux/reducers.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action),
        userInfo: userInfo(state.userInfo, action)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> counter <span class="hljs-keyword">from</span> <span class="hljs-string">'reducers/counter'</span>;
<span class="hljs-keyword">import</span> userInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'reducers/userInfo'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">state = {}, action</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: counter(state.counter, action),
        <span class="hljs-attr">userInfo</span>: userInfo(state.userInfo, action)
    }
}</code></pre>
<ol><li>
<p>现在有了<code>action</code>，有了<code>reducer</code>，我们就需要调用把<code>action</code>里面的三个<code>action</code>函数和网络请求结合起来。</p>
<ul>
<li>请求中 <code>dispatch getUserInfoRequest</code>
</li>
<li>请求成功 <code>dispatch getUserInfoSuccess</code>
</li>
<li>请求失败 <code>dispatch getUserInfoFail</code>
</li>
</ul>
</li></ol>
<p><code>src/redux/actions/userInfo.js</code>增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getUserInfo() {
    return function (dispatch) {
        dispatch(getUserInfoRequest());

        return fetch('http://localhost:8080/api/user.json')
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    dispatch(getUserInfoSuccess(json))
                }
            ).catch(
                () => {
                    dispatch(getUserInfoFail());
                }
            )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        dispatch(getUserInfoRequest());

        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'http://localhost:8080/api/user.json'</span>)
            .then((<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-keyword">return</span> response.json()
            }))
            .then(<span class="hljs-function">(<span class="hljs-params">json</span>) =&gt;</span> {
                    dispatch(getUserInfoSuccess(json))
                }
            ).catch(
                <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    dispatch(getUserInfoFail());
                }
            )
    }
}</code></pre>
<p>我们这里发现，别的<code>action</code>创建函数都是返回<code>action</code>对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{type: xxxx}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">type</span>: xxxx}</code></pre>
<p>但是我们现在的这个<code>action</code>创建函数 <code>getUserInfo</code>则是返回函数了。</p>
<p>为了让<code>action</code>创建函数除了返回<code>action</code>对象外，还可以返回函数，我们需要引用<code>redux-thunk</code>。</p>
<p><code>npm install --save redux-thunk</code></p>
<p>这里涉及到<code>redux</code>中间件<code>middleware</code>，我后面会讲到的。你也可以读这里<a href="http://cn.redux.js.org/docs/advanced/Middleware.html" rel="nofollow noreferrer" target="_blank">Middleware</a>。</p>
<p>简单的说，中间件就是<code>action</code>在到达<code>reducer</code>，先经过中间件处理。我们之前知道<code>reducer</code>能处理的<code>action</code>只有这样的<code>{type:xxx}</code>，所以我们使用中间件来处理<br>函数形式的<code>action</code>，把他们转为标准的<code>action</code>给<code>reducer</code>。这是<code>redux-thunk</code>的作用。<br>使用<code>redux-thunk</code>中间件</p>
<p>我们来引入<code>redux-thunk</code>中间件</p>
<p><code>src/redux/store.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';

let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {createStore, applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> combineReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers.js'</span>;

<span class="hljs-keyword">let</span> store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<p>到这里，<code>redux</code>这边OK了，我们来写个组件验证下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages
mkdir UserInfo
cd UserInfo
touch UserInfo.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/pages
mkdir UserInfo
cd UserInfo
touch UserInfo.js</code></pre>
<p><code>src/pages/UserInfo/UserInfo.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from &quot;actions/userInfo&quot;;

class UserInfo extends Component {

    render() {
        const {userInfo, isLoading, errorMsg} = this.props.userInfo;
        return (
            <div>
                {
                    isLoading ? '请求信息中......' :
                        (
                            errorMsg ? errorMsg :
                                <div>
                                    <p>用户信息：</p>
                                    <p>用户名：{userInfo.name}</p>
                                    <p>介绍：{userInfo.intro}</p>
                                </div>
                        )
                }
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}

export default connect((state) => ({userInfo: state.userInfo}), {getUserInfo})(UserInfo);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> {getUserInfo} <span class="hljs-keyword">from</span> <span class="hljs-string">"actions/userInfo"</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserInfo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

    render() {
        <span class="hljs-keyword">const</span> {userInfo, isLoading, errorMsg} = <span class="hljs-keyword">this</span>.props.userInfo;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {
                    isLoading ? '请求信息中......' :
                        (
                            errorMsg ? errorMsg :
                                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>用户信息：<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>用户名：{userInfo.name}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>介绍：{userInfo.intro}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        )
                }
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.props.getUserInfo()}&gt;请求用户信息<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({<span class="hljs-attr">userInfo</span>: state.userInfo}), {getUserInfo})(UserInfo);

</code></pre>
<p>这里你可能发现<code>connect</code>参数写法不一样了，<code>mapStateToProps</code>函数用了<code>es6</code>简写，<code>mapDispatchToProps</code>用了<code>react-redux</code>提供的简单写法。</p>
<p>增加路由<br><code>src/router/router.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';
import UserInfo from 'pages/UserInfo/UserInfo';

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to=&quot;/&quot;>首页</Link></li>
                <li><Link to=&quot;/page1&quot;>Page1</Link></li>
                <li><Link to=&quot;/counter&quot;>Counter</Link></li>
                <li><Link to=&quot;/userinfo&quot;>UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path=&quot;/&quot; component={Home}/>
                <Route path=&quot;/page1&quot; component={Page1}/>
                <Route path=&quot;/counter&quot; component={Counter}/>
                <Route path=&quot;/userinfo&quot; component={UserInfo}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {BrowserRouter <span class="hljs-keyword">as</span> Router, Route, Switch, Link} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Home/Home'</span>;
<span class="hljs-keyword">import</span> Page1 <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Page1/Page1'</span>;
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/Counter/Counter'</span>;
<span class="hljs-keyword">import</span> UserInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'pages/UserInfo/UserInfo'</span>;

<span class="hljs-keyword">const</span> getRouter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    &lt;Router&gt;
        &lt;div&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;Link to="/"&gt;首页&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/page1"&gt;Page1&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/counter"&gt;Counter&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/userinfo"&gt;UserInfo&lt;/Link&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;Switch&gt;
                &lt;Route exact path="/" component={Home}/&gt;
                &lt;Route path="/page1" component={Page1}/&gt;
                &lt;Route path="/counter" component={Counter}/&gt;
                &lt;Route path="/userinfo" component={UserInfo}/&gt;
            &lt;/Switch&gt;
        &lt;/div&gt;
    &lt;/Router&gt;
);

export default getRouter;</code></pre>
<p>现在你可以执行<code>npm start</code>去看效果啦！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981896" src="https://static.alili.tech/img/remote/1460000010981896" alt="redux" title="redux" style="cursor: pointer;"></span></p>
<p>到这里<code>redux</code>集成基本告一段落了，后面我们还会有一些优化。</p>
<h2 id="articleHeader13">combinReducers优化</h2>
<p><code>redux</code>提供了一个<code>combineReducers</code>函数来合并<code>reducer</code>，不用我们自己合并哦。写起来简单，但是意思和我们<br>自己写的<code>combinReducers</code>也是一样的。</p>
<p><code>src/redux/reducers.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {combineReducers} from &quot;redux&quot;;

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';


export default combineReducers({
    counter,
    userInfo
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {combineReducers} <span class="hljs-keyword">from</span> <span class="hljs-string">"redux"</span>;

<span class="hljs-keyword">import</span> counter <span class="hljs-keyword">from</span> <span class="hljs-string">'reducers/counter'</span>;
<span class="hljs-keyword">import</span> userInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'reducers/userInfo'</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
    counter,
    userInfo
});</code></pre>
<h1 id="articleHeader14">devtool优化</h1>
<p>现在我们发现一个问题，代码哪里写错了，浏览器报错只报在<code>build.js</code>第几行。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981897" src="https://static.alili.tech/img/remote/1460000010981897" alt="错误图片" title="错误图片" style="cursor: pointer;"></span></p>
<p>这让我们分析错误无从下手。看<a href="https://doc.webpack-china.org/configuration/devtool" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>我们增加<code>webpack</code>配置<code>devtool</code>！</p>
<p><code>src/webpack.dev.config.js</code>增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devtool: 'inline-source-map'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">devtool: <span class="hljs-string">'inline-source-map'</span></code></pre>
<p>这次看错误信息是不是提示的很详细了？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981898" src="https://static.alili.tech/img/remote/1460000010981898" alt="错误图片" title="错误图片" style="cursor: pointer;"></span></p>
<p>同时，我们在<code>srouce</code>里面能看到我们写的代码，也能打断点调试哦~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981899" src="https://static.alili.tech/img/remote/1460000010981899" alt="错误图片" title="错误图片" style="cursor: pointer;"></span></p>
<h1 id="articleHeader15">编译css</h1>
<p>先说这里为什么不用<code>scss</code>，因为<code>Windows</code>使用<code>node-sass</code>，需要先安装<a href="https://www.microsoft.com/en-us/download/details.aspx?id=8279" rel="nofollow noreferrer" target="_blank"> Microsoft Windows SDK for Windows 7 and .NET Framework 4</a>。<br>我怕有些人copy这份代码后，没注意，运行不起来。所以这里不用<code>scss</code>了，如果需要，自行编译哦。</p>
<p><code>npm install css-loader style-loader --save-dev</code></p>
<p><code>css-loader</code>使你能够使用类似<code>@import</code> 和 <code>url(...)</code>的方法实现 <code>require()</code>的功能； </p>
<p><code>style-loader</code>将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入<code>webpack</code>打包后的JS文件中。</p>
<p><code>webpack.dev.config.js</code> <code>rules</code>增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   test: /\.css$/,
   use: ['style-loader', 'css-loader']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
   <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
   <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
}</code></pre>
<p>我们用<code>Page1</code>页面来测试下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages/Page1
touch Page1.css" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/pages/Page1
touch Page1.css</code></pre>
<p><code>src/pages/Page1/Page1.css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".page-box {
    border: 1px solid red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.page-box {
    <span class="hljs-attr">border</span>: <span class="hljs-number">1</span>px solid red;
}</code></pre>
<p><code>src/pages/Page1/Page1.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

import './Page1.css';

export default class Page1 extends Component {
    render() {
        return (
            <div className=&quot;page-box&quot;>
                this is page1~
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">'./Page1.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page-box"</span>&gt;</span>
                this is page1~
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>好了，现在<code>npm start</code>去看效果吧。</p>
<h1 id="articleHeader16">编译图片</h1>
<p><code>npm install --save-dev url-loader file-loader</code></p>
<p><code>webpack.dev.config.js</code> <code>rules</code>增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
    <span class="hljs-attr">use</span>: [{
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>
        }
    }]
}</code></pre>
<p><code>options limit 8192</code>意思是，小于等于8K的图片会被转成<code>base64</code>编码，直接插入HTML中，减少<code>HTTP</code>请求。</p>
<p>我们来用<code>Page1</code> 测试下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/pages/Page1
mkdir images" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/pages/Page1
mkdir images</code></pre>
<p>给<code>images</code>文件夹放一个图片。</p>
<p>修改代码，引用图片</p>
<p><code>src/pages/Page1/Page1.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

import './Page1.css';

import image from './images/brickpsert.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className=&quot;page-box&quot;>
                this is page1~
                <img src={image}/>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">'./Page1.css'</span>;

<span class="hljs-keyword">import</span> image <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/brickpsert.jpg'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page-box"</span>&gt;</span>
                this is page1~
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{image}/</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )
    }
}</span></code></pre>
<p>可以去看看效果啦。</p>
<h1 id="articleHeader17">按需加载</h1>
<p>为什么要实现按需加载？</p>
<p>我们现在看到，打包完后，所有页面只生成了一个<code>build.js</code>,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的<code>js</code>了哦。</p>
<p>如果每个页面都打包了自己单独的JS，在进入自己页面的时候才加载对应的js，那首屏加载就会快很多哦。</p>
<p>在 <code>react-router 2.0</code>时代， 按需加载需要用到的最关键的一个函数，就是<code>require.ensure()</code>，它是按需加载能够实现的核心。</p>
<p>在4.0版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式。</p>
<p><a href="https://reacttraining.com/react-router/web/guides/code-splitting" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<p>根据官方示例，我们开搞</p>
<ol>
<li><code>npm install bundle-loader --save-dev</code></li>
<li>新建<code>bundle.js</code>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/router
touch Bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/router
touch Bundle.js</code></pre>
<p><code>src/router/Bundle.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react'

class Bundle extends Component {
    state = {
        // short for &quot;module&quot; but that's a keyword in js, so &quot;mod&quot;
        mod: null
    };

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.props.children(this.state.mod)
    }
}

export default Bundle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bundle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    state = {
        <span class="hljs-comment">// short for "module" but that's a keyword in js, so "mod"</span>
        mod: <span class="hljs-literal">null</span>
    };

    componentWillMount() {
        <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.props)
    }

    componentWillReceiveProps(nextProps) {
        <span class="hljs-keyword">if</span> (nextProps.load !== <span class="hljs-keyword">this</span>.props.load) {
            <span class="hljs-keyword">this</span>.load(nextProps)
        }
    }

    load(props) {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">mod</span>: <span class="hljs-literal">null</span>
        });
        props.load(<span class="hljs-function">(<span class="hljs-params">mod</span>) =&gt;</span> {
            <span class="hljs-keyword">this</span>.setState({
                <span class="hljs-comment">// handle both es imports and cjs</span>
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.mod)
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Bundle;</code></pre>
<ol><li>改造路由器</li></ol>
<p><code>src/router/router.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&amp;name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&amp;name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&amp;name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&amp;name=userInfo!pages/UserInfo/UserInfo';

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => () => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component/> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to=&quot;/&quot;>首页</Link></li>
                <li><Link to=&quot;/page1&quot;>Page1</Link></li>
                <li><Link to=&quot;/counter&quot;>Counter</Link></li>
                <li><Link to=&quot;/userinfo&quot;>UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path=&quot;/&quot; component={createComponent(Home)}/>
                <Route path=&quot;/page1&quot; component={createComponent(Page1)}/>
                <Route path=&quot;/counter&quot; component={createComponent(Counter)}/>
                <Route path=&quot;/userinfo&quot; component={createComponent(UserInfo)}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {BrowserRouter <span class="hljs-keyword">as</span> Router, Route, Switch, Link} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">import</span> Bundle <span class="hljs-keyword">from</span> <span class="hljs-string">'./Bundle'</span>;

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy&amp;name=home!pages/Home/Home'</span>;
<span class="hljs-keyword">import</span> Page1 <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy&amp;name=page1!pages/Page1/Page1'</span>;
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy&amp;name=counter!pages/Counter/Counter'</span>;
<span class="hljs-keyword">import</span> UserInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy&amp;name=userInfo!pages/UserInfo/UserInfo'</span>;

<span class="hljs-keyword">const</span> Loading = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
};

<span class="hljs-keyword">const</span> createComponent = <span class="hljs-function">(<span class="hljs-params">component</span>) =&gt;</span> () =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Bundle</span> <span class="hljs-attr">load</span>=<span class="hljs-string">{component}</span>&gt;</span>
        {
            (Component) =&gt; Component ? <span class="hljs-tag">&lt;<span class="hljs-name">Component</span>/&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">Loading</span>/&gt;</span>
        }
    <span class="hljs-tag">&lt;/<span class="hljs-name">Bundle</span>&gt;</span></span>
);

<span class="hljs-keyword">const</span> getRouter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    &lt;Router&gt;
        &lt;div&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;Link to="/"&gt;首页&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/page1"&gt;Page1&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/counter"&gt;Counter&lt;/Link&gt;&lt;/li&gt;
                &lt;li&gt;&lt;Link to="/userinfo"&gt;UserInfo&lt;/Link&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;Switch&gt;
                &lt;Route exact path="/" component={createComponent(Home)}/&gt;
                &lt;Route path="/page1" component={createComponent(Page1)}/&gt;
                &lt;Route path="/counter" component={createComponent(Counter)}/&gt;
                &lt;Route path="/userinfo" component={createComponent(UserInfo)}/&gt;
            &lt;/Switch&gt;
        &lt;/div&gt;
    &lt;/Router&gt;
);

export default getRouter;</code></pre>
<p>现在你可以<code>npm start</code>，打开浏览器，看是不是进入新的页面，都会加载自己的JS的~</p>
<p>但是你可能发现，名字都是<code>0.bundle.js</code>这样子的，这分不清楚是哪个页面的<code>js</code>呀！</p>
<p>我们修改下<code>webpack.dev.config.js</code>,加个<code>chunkFilename</code>。<code>chunkFilename</code>是除了<code>entry</code>定义的入口<code>js</code>之外的<code>js</code>~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].js'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    output: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">'[name].js'</span>
    }</code></pre>
<p>现在你运行发现名字变成<code>home.js</code>,这样的了。棒棒哒！</p>
<p>那么问题来了<code>home</code>是在哪里设置的？<code>webpack</code>怎么知道他叫<code>home</code>？</p>
<p>其实在这里我们定义了，<code>router.js</code>里面</p>
<p><code>import Home from 'bundle-loader?lazy&amp;name=home!pages/Home/Home';</code></p>
<p>看到没。这里有个<code>name=home</code>。嘿嘿。</p>
<p>参考地址：</p>
<ol>
<li><a href="http://www.jianshu.com/p/8dd98a7028e0" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/8dd9...</a></li>
<li><a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md" rel="nofollow noreferrer" target="_blank">https://github.com/ReactTrain...</a></li>
<li><a href="https://segmentfault.com/a/1190000007949841">https://segmentfault.com/a/11...</a></li>
<li><a href="http://react-china.org/t/webpack-react-router/10123" rel="nofollow noreferrer" target="_blank">http://react-china.org/t/webp...</a></li>
<li><a href="https://juejin.im/post/58f9717e44d9040069d06cd6" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/58f971...</a></li>
</ol>
<h1 id="articleHeader18">缓存</h1>
<p>想象一下这个场景~</p>
<p>我们网站上线了，用户第一次访问首页，下载了<code>home.js</code>，第二次访问又下载了<code>home.js</code>~</p>
<p>这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次<code>home.js</code>后，第二次就不下载了。</p>
<p>有一天，我们更新了<code>home.js</code>，但是用户不知道呀，用户还是使用本地旧的<code>home.js</code>。出问题了~</p>
<p>怎么解决？每次代码更新后，打包生成的名字不一样。比如第一次叫<code>home.a.js</code>，第二次叫<code>home.b.js</code>。</p>
<p>文档<a href="https://doc.webpack-china.org/guides/caching" rel="nofollow noreferrer" target="_blank">看这里</a></p>
<p>我们照着文档来</p>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    output: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[hash].js'</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>
    }</code></pre>
<p>每次打包都用增加<code>hash</code>~</p>
<p>现在我们试试，是不是修改了文件，打包后相应的文件名字就变啦？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981900" src="https://static.alili.tech/img/remote/1460000010981900" alt="package" title="package" style="cursor: pointer;"></span></p>
<p>但是你可能发现了，网页打开报错了~因为你<code>dist/index.html</code>里面引用<code>js</code>名字还是<code>bundle.js</code>老名字啊,改成新的名字就可以啦。</p>
<p>啊~那岂不是我每次编译打包，都得去改一下js名字？欲知后事如何，且看下节分享。</p>
<h1 id="articleHeader19">HtmlWebpackPlugin</h1>
<p>这个插件，每次会自动把js插入到你的模板<code>index.html</code>里面去。</p>
<p><code>npm install html-webpack-plugin --save-dev</code></p>
<p>新建模板<code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src
touch index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src
touch index.html</code></pre>
<p><code>src/index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
</head>
<body>
<div id=&quot;app&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;!doctype html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>修改<code>webpack.dev.config.js</code>，增加<code>plugin</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HtmlWebpackPlugin = require('html-webpack-plugin');

    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    })]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);

    plugins: [<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
        <span class="hljs-attr">template</span>: path.join(__dirname, <span class="hljs-string">'src/index.html'</span>)
    })],</code></pre>
<p><code>npm start</code>运行项目，看看是不是能正常访问啦。~</p>
<p>说明一下：<code>npm start</code>打包后的文件存在内存中，你看不到的。~ 你可以把遗留<code>dist/index.html</code>删除掉了。</p>
<h1 id="articleHeader20">提取公共代码</h1>
<p>想象一下，我们的主文件，原来的<code>bundle.js</code>里面是不是包含了<code>react</code>,<code>redux</code>,<code>react-router</code>等等<br>这些代码？？这些代码基本上不会改变的。但是，他们合并在<code>bundle.js</code>里面，每次项目发布，重新请求<code>bundle.js</code>的时候，相当于重新请求了<br><code>react</code>等这些公共库。浪费了~</p>
<p>我们把<code>react</code>这些不会改变的公共库提取出来，用户缓存下来。从此以后，用户再也不用下载这些库了，无论是否发布项目。嘻嘻。</p>
<p><code>webpack</code>文档给了教程，<a href="https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-" rel="nofollow noreferrer" target="_blank">看这里</a></p>
<p><code>webpack.dev.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var webpack = require('webpack');

    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    }
    
        /*plugins*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

    entry: {
        <span class="hljs-attr">app</span>: [
            <span class="hljs-string">'react-hot-loader/patch'</span>,
            path.join(__dirname, <span class="hljs-string">'src/index.js'</span>)
        ],
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-router-dom'</span>, <span class="hljs-string">'redux'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'react-redux'</span>]
    }
    
        <span class="hljs-comment">/*plugins*/</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>
        })</code></pre>
<p>把<code>react</code>等库生成打包到<code>vendor.hash.js</code>里面去。</p>
<p>但是你现在可能发现编译生成的文件<code>app.[hash].js</code>和<code>vendor.[hash].js</code>生成的<code>hash</code>一样的，这里是个问题，因为呀，你每次修改代码,都会导致<code>vendor.[hash].js</code>名字改变，那我们提取出来的意义也就没了。其实文档上写的很清楚，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js', //这里应该用chunkhash替换hash
        chunkFilename: '[name].[chunkhash].js'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   output: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[hash].js'</span>, <span class="hljs-comment">//这里应该用chunkhash替换hash</span>
        chunkFilename: <span class="hljs-string">'[name].[chunkhash].js'</span>
    }</code></pre>
<p>但是无奈，如果用<code>chunkhash</code>，会报错。和<code>webpack-dev-server --hot</code>不兼容，具体<a href="https://github.com/webpack/webpack-dev-server/issues/377" rel="nofollow noreferrer" target="_blank">看这里</a>。</p>
<p>现在我们在配置开发版配置文件，就向<code>webpack-dev-server</code>妥协，因为我们要用他。问题先放这里，等会我们配置正式版<code>webpack.config.js</code>的时候要解决这个问题。</p>
<h1 id="articleHeader21">生产坏境构建</h1>
<blockquote><p>开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。</p></blockquote>
<p>文档<a href="https://doc.webpack-china.org/guides/production" rel="nofollow noreferrer" target="_blank">看这里</a></p>
<p>我们要开始做了~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">touch webpack.config.js</code></pre>
<p>在<code>webpack.dev.config.js</code>的基础上先做以下几个修改~</p>
<ol>
<li>先删除<code>webpack-dev-server</code>相关的东西~</li>
<li>
<code>devtool</code>的值改成<code>cheap-module-source-map</code>
</li>
<li>刚才说的<code>hash</code>改成<code>chunkhash</code>
</li>
</ol>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'cheap-module-source-map'</span>,
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">app</span>: [
            path.join(__dirname, <span class="hljs-string">'src/index.js'</span>)
        ],
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-router-dom'</span>, <span class="hljs-string">'redux'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'react-redux'</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">use</span>: [<span class="hljs-string">'babel-loader'</span>],
            <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>)
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
            <span class="hljs-attr">use</span>: [{
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>
                }
            }]
        }]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">template</span>: path.join(__dirname, <span class="hljs-string">'src/index.html'</span>)
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>
        })
    ],

    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">pages</span>: path.join(__dirname, <span class="hljs-string">'src/pages'</span>),
            <span class="hljs-attr">component</span>: path.join(__dirname, <span class="hljs-string">'src/component'</span>),
            <span class="hljs-attr">router</span>: path.join(__dirname, <span class="hljs-string">'src/router'</span>),
            <span class="hljs-attr">actions</span>: path.join(__dirname, <span class="hljs-string">'src/redux/actions'</span>),
            <span class="hljs-attr">reducers</span>: path.join(__dirname, <span class="hljs-string">'src/redux/reducers'</span>)
        }
    }
};</code></pre>
<p>在<code>package.json</code>增加打包脚本</p>
<p><code>"build":"webpack --config webpack.config.js"</code></p>
<p>然后执行<code>npm run build</code>~看看<code>dist</code>文件夹是不是生成了我们发布要用的所有文件哦？</p>
<p>接下来我们还是要优化正式版配置文件~</p>
<h1 id="articleHeader22">文件压缩</h1>
<p><code>webpack</code>使用<code>UglifyJSPlugin</code>来压缩生成的文件。</p>
<p><code>npm i --save-dev uglifyjs-webpack-plugin</code></p>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJSPlugin()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> UglifyJSPlugin()
  ]
}</code></pre>
<p><code>npm run build</code>发现打包文件大小减小了好多。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981901" src="https://static.alili.tech/img/remote/1460000010981901" alt="uglify" title="uglify" style="cursor: pointer;"></span></p>
<h1 id="articleHeader23">指定环境</h1>
<blockquote><p>许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：</p></blockquote>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: [
       new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
       })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
       <span class="hljs-keyword">new</span> webpack.DefinePlugin({
          <span class="hljs-string">'process.env'</span>: {
              <span class="hljs-string">'NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
           }
       })
  ]
}</code></pre>
<p><code>npm run build</code>后发现<code>vendor.[hash].js</code>又变小了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981902" src="https://static.alili.tech/img/remote/1460000010981902" alt="uglify" title="uglify" style="cursor: pointer;"></span></p>
<h1 id="articleHeader24">优化缓存</h1>
<p>刚才我们把<code>[name].[hash].js</code>变成<code>[name].[chunkhash].js</code>后，<code>npm run build</code>后，<br>发现<code>app.xxx.js</code>和<code>vendor.xxx.js</code>不一样了哦。</p>
<p>但是现在又有一个问题了。</p>
<p>你随便修改代码一处，例如<code>Home.js</code>，随便改变个字，你发现<code>home.xxx.js</code>名字变化的同时，<br><code>vendor.xxx.js</code>名字也变了。这不行啊。这和没拆分不是一样一样了吗？我们本意是<code>vendor.xxx.js</code><br>名字永久不变，一直缓存在用户本地的。~</p>
<p><a href="https://doc.webpack-china.org/guides/caching" rel="nofollow noreferrer" target="_blank">官方文档</a>推荐了一个插件<a href="https://doc.webpack-china.org/plugins/hashed-module-ids-plugin" rel="nofollow noreferrer" target="_blank">HashedModuleIdsPlugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    plugins: [
        new webpack.HashedModuleIdsPlugin()
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    plugins: [
        <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin()
    ]</code></pre>
<p>现在你打包，修改代码再试试，是不是名字不变啦？错了，现在打包，我发现名字还是变了，经过比对文档，我发现还要加一个<code>runtime</code>代码抽取，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>
})</code></pre>
<p>加上这句话就好了~为什么呢？看下<a href="https://doc.webpack-china.org/concepts/manifest" rel="nofollow noreferrer" target="_blank">解释</a>。</p>
<p><strong>注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。</strong></p>
<h1 id="articleHeader25">public path</h1>
<p>想象一个场景，我们的静态文件放在了单独的静态服务器上去了，那我们打包的时候，如何让静态文件的链接定位到静态服务器呢？</p>
<p>看文档<a href="https://doc.webpack-china.org/guides/public-path" rel="nofollow noreferrer" target="_blank">Public Path</a></p>
<p><code>webpack.config.js</code> <code>output</code> 中增加一个<code>publicPath</code>，我们当前用<code>/</code>，相对于当前路径，如果你要改成别的<code>url</code>，就改这里就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    output: {
        publicPath : '/'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    output: {
        <span class="hljs-attr">publicPath</span> : <span class="hljs-string">'/'</span>
    }</code></pre>
<h1 id="articleHeader26">打包优化</h1>
<p>你现在打开<code>dist</code>，是不是发现好多好多文件，每次打包后的文件在这里混合了？我们希望每次打包前自动清理下<code>dist</code>文件。</p>
<p><code>npm install clean-webpack-plugin --save-dev</code></p>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CleanWebpackPlugin = require('clean-webpack-plugin');


plugins: [
    new CleanWebpackPlugin(['dist'])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);


plugins: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>])
]</code></pre>
<p>现在<code>npm run bundle</code>试试，是不是之前的都清空了。当然我们之前的<code>api</code>文件夹也被清空了，不过没关系哦~本来就是测试用的。</p>
<h1 id="articleHeader27">抽取css</h1>
<p>目前我们的<code>css</code>是直接打包进<code>js</code>里面的，我们希望能单独生成<code>css</code>文件。</p>
<p>我们使用<a href="https://github.com/webpack-contrib/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>来实现。</p>
<p><code>npm install --save-dev extract-text-webpack-plugin</code></p>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: &quot;style-loader&quot;,
          use: &quot;css-loader&quot;
        })
      }
    ]
  },
  plugins: [
     new ExtractTextPlugin({
         filename: '[name].[contenthash:5].css',
         allChunks: true
     })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
          <span class="hljs-attr">use</span>: <span class="hljs-string">"css-loader"</span>
        })
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
     <span class="hljs-keyword">new</span> ExtractTextPlugin({
         <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[contenthash:5].css'</span>,
         <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>
     })
  ]
}</code></pre>
<p><code>npm run build</code>后发现单独生成了<code>css</code>文件哦</p>
<h1 id="articleHeader28">使用<code>axios</code>和<code>middleware</code>优化API请求</h1>
<p>先安装下<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a></p>
<p><code>npm install --save axios</code></p>
<p>我们之前项目的一次API请求是这样写的哦~</p>
<p><code>action</code>创建函数是这样的。比我们现在写的<code>fetch</code>简单多了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getUserInfo() {
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.get(`http://localhost:8080/api/user.json`)
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        otherData:otherData
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">types</span>: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        <span class="hljs-attr">promise</span>: <span class="hljs-function"><span class="hljs-params">client</span> =&gt;</span> client.get(<span class="hljs-string">`http://localhost:8080/api/user.json`</span>)
        afterSuccess:<span class="hljs-function">(<span class="hljs-params">dispatch,getState,response</span>)=&gt;</span>{
            <span class="hljs-comment">/*请求成功后执行的函数*/</span>
        },
        <span class="hljs-attr">otherData</span>:otherData
    }
}</code></pre>
<p>然后在dispatch(getUserInfo())后，通过<code>redux</code>中间件来处理请求逻辑。</p>
<p>中间件的教程看<a href="http://cn.redux.js.org/docs/advanced/Middleware.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p>我们想想中间件的逻辑</p>
<ol>
<li>请求前<code>dispatch</code> <code>REQUEST</code>请求。</li>
<li>成功后<code>dispatch</code> <code>SUCCESS</code>请求，如果定义了<code>afterSuccess()</code>函数，调用它。</li>
<li>失败后<code>dispatch</code> <code>FAIL</code>请求。</li>
</ol>
<p>来写一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd src/redux
mkdir middleware
cd middleware
touch promiseMiddleware.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd src/redux
mkdir middleware
cd middleware
touch promiseMiddleware.js</code></pre>
<p><code>src/redux/middleware/promiseMiddleware.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';

export default  store => next => action => {
    const {dispatch, getState} = store;
    /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
    if (typeof action === 'function') {
        action(dispatch, getState);
    }
    /*解析action*/
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action;

    /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/
    if (!action.promise) {
        return next(action);
    }

    /*解析types*/
    const [REQUEST,
        SUCCESS,
        FAILURE] = types;

    /*开始请求的时候，发一个action*/
    next({
        ...rest,
        type: REQUEST
    });
    /*定义请求成功时的方法*/
    const onFulfilled = result => {
        next({
            ...rest,
            result,
            type: SUCCESS
        });
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
    };
    /*定义请求失败时的方法*/
    const onRejected = error => {
        next({
            ...rest,
            error,
            type: FAILURE
        });
    };

    return promise(axios).then(onFulfilled, onRejected).catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        onRejected(error)
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>  store =&gt; <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">const</span> {dispatch, getState} = store;
    <span class="hljs-comment">/*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
        action(dispatch, getState);
    }
    <span class="hljs-comment">/*解析action*/</span>
    <span class="hljs-keyword">const</span> {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action;

    <span class="hljs-comment">/*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/</span>
    <span class="hljs-keyword">if</span> (!action.promise) {
        <span class="hljs-keyword">return</span> next(action);
    }

    <span class="hljs-comment">/*解析types*/</span>
    <span class="hljs-keyword">const</span> [REQUEST,
        SUCCESS,
        FAILURE] = types;

    <span class="hljs-comment">/*开始请求的时候，发一个action*/</span>
    next({
        ...rest,
        <span class="hljs-attr">type</span>: REQUEST
    });
    <span class="hljs-comment">/*定义请求成功时的方法*/</span>
    <span class="hljs-keyword">const</span> onFulfilled = <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        next({
            ...rest,
            result,
            <span class="hljs-attr">type</span>: SUCCESS
        });
        <span class="hljs-keyword">if</span> (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
    };
    <span class="hljs-comment">/*定义请求失败时的方法*/</span>
    <span class="hljs-keyword">const</span> onRejected = <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        next({
            ...rest,
            error,
            <span class="hljs-attr">type</span>: FAILURE
        });
    };

    <span class="hljs-keyword">return</span> promise(axios).then(onFulfilled, onRejected).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'MIDDLEWARE ERROR:'</span>, error);
        onRejected(error)
    })
}
</code></pre>
<p>修改<code>src/redux/store.js</code>来应用这个中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {createStore, applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> combineReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers.js'</span>;

<span class="hljs-keyword">import</span> promiseMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'./middleware/promiseMiddleware'</span>

<span class="hljs-keyword">let</span> store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<p>修改<code>src/redux/actions/userInfo.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const GET_USER_INFO_REQUEST = &quot;userInfo/GET_USER_INFO_REQUEST&quot;;
export const GET_USER_INFO_SUCCESS = &quot;userInfo/GET_USER_INFO_SUCCESS&quot;;
export const GET_USER_INFO_FAIL = &quot;userInfo/GET_USER_INFO_FAIL&quot;;

export function getUserInfo() {
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.get(`http://localhost:8080/api/user.json`)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_REQUEST = <span class="hljs-string">"userInfo/GET_USER_INFO_REQUEST"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_SUCCESS = <span class="hljs-string">"userInfo/GET_USER_INFO_SUCCESS"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GET_USER_INFO_FAIL = <span class="hljs-string">"userInfo/GET_USER_INFO_FAIL"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">types</span>: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        <span class="hljs-attr">promise</span>: <span class="hljs-function"><span class="hljs-params">client</span> =&gt;</span> client.get(<span class="hljs-string">`http://localhost:8080/api/user.json`</span>)
    }
}</code></pre>
<p>是不是简单清新很多啦？</p>
<p>修改<code>src/redux/reducers/userInfo.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.result.data,
                errorMsg: ''
            };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">        <span class="hljs-keyword">case</span> GET_USER_INFO_SUCCESS:
            <span class="hljs-keyword">return</span> {
                ...state,
                <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">userInfo</span>: action.result.data,
                <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">''</span>
            };</code></pre>
<p><code>action.userInfo</code>修改成了<code>action.result.data</code>。你看中间件，请求成功，会给<code>action</code>增加一个<code>result</code>字段来存储响应结果哦~不用手动传了。</p>
<p><code>npm start</code>看看我们的网络请求是不是正常哦。</p>
<h1 id="articleHeader29">调整文本编辑器</h1>
<p>使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，可能会影响重新编译。</p>
<p>要在一些常见的编辑器中禁用此功能，请查看以下列表：</p>
<ul>
<li>Sublime Text 3 - 在用户首选项(user preferences)中添加 atomic_save: "false"。</li>
<li>IntelliJ - 在首选项(preferences)中使用搜索，查找到 "safe write" 并且禁用它。</li>
<li>Vim - 在设置(settings)中增加 :set backupcopy=yes。</li>
<li>WebStorm - 在 Preferences &gt; Appearance &amp; Behavior &gt; System Settings 中取消选中 Use "safe write"。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零搭建React全家桶框架教程

## 原文链接
[https://segmentfault.com/a/1190000010981888](https://segmentfault.com/a/1190000010981888)

