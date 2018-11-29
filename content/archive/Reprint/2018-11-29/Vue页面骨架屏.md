---
title: 'Vue页面骨架屏' 
date: 2018-11-29 9:34:56
hidden: true
slug: 0ec7mfot4uat
categories: [reprint]
---

{{< raw >}}

                    
<p>在开发webapp的时候总是会受到首屏加载时间过长的影响，主流的解决方法是在载入完成之前显示loading图效果，而一些大公司会配置一套服务端渲染的架构来解决这个问题。考虑到ssr所要解决的一系列问题，越来越多的APP采用了“骨架屏”的方式去提升用户体验。</p>
<p>小米商城：<br><span class="img-wrap"><img data-src="/img/bVbaWLM?w=390&amp;h=851" src="https://static.alili.tech/img/bVbaWLM?w=390&amp;h=851" alt="小米商城" title="小米商城" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、分析Vue页面的内容加载过程</h2>
<p>vue项目中的入口index.html只有简单的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-CN&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=UTF-8&quot;>
    <title>Document</title>
</head>
<body>
    <div id=&quot;root&quot;>        
    </div>
    <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script></body>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-CN"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html;charset=UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>当js执行完之后，会用vue渲染成的dom将<code>div#root</code>完全替换掉。<br>我们在<code>div#root</code>中加入模拟骨架屏，在Chrome开发者工具调整网速：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
    这里是骨架屏
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"root"</span>&gt;
    这里是骨架屏
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbaWCN?w=1203&amp;h=706" src="https://static.alili.tech/img/bVbaWCN?w=1203&amp;h=706" alt="" title="" style="cursor: pointer; display: inline;"></span><br>由此可知，将骨架屏内容直接插入<code>div#root</code>中即可实现骨架屏。</p>
<h2 id="articleHeader1">二、使用vue-server-renderer来实现骨架屏</h2>
<p>我们需要骨架屏也是一个单独的<code>.vue</code>文件，因此我们需要用到<code>vue-server-renderer</code>。对vue服务端渲染有所了解的同学一定知道，这个插件能够将vue项目在node端打包成一个bundle，然后由bundle生成对应的html。<br>首先是生成项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── build
│   ├── webpack.config.client.js
│   └── webpack.config.server.js
├── src
│   └── views
│        ├── index
│        │   └── index.vue
│        ├── skeleton
│        │   └── skeleton.vue
│        ├── app.vue
│        ├── index.js
│        └── skeleton-entry.js
├── index.html
└── skeleton.js
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── build
│   ├── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.client</span><span class="hljs-selector-class">.js</span>
│   └── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.js</span>
├── src
│   └── views
│        ├── index
│        │   └── index<span class="hljs-selector-class">.vue</span>
│        ├── skeleton
│        │   └── skeleton<span class="hljs-selector-class">.vue</span>
│        ├── app<span class="hljs-selector-class">.vue</span>
│        ├── index<span class="hljs-selector-class">.js</span>
│        └── skeleton-entry<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html</span>
└── skeleton<span class="hljs-selector-class">.js</span>
└── package.json</code></pre>
<p>vue的服务端渲染一般会用<code>vue-server-renderer</code>将整个项目在node端打包成一份bundle，而这里我们只要一份有骨架屏的html，所以会有一个单独的骨架屏入口文件<code>skeleton-entry.js</code>,一个骨架屏打包webpack配置<code>webpack.config.server.js</code>，而<code>skeleton.js</code>作用是将webpack打包出来的bundle写入到<code>index.html</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//skeleton-entry.js
import Vue from 'vue'
import Skeleton from './views/skeleton/skeleton.vue'

export default new Vue({
  components: {
    Skeleton
  },
  template: '<skeleton />'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//skeleton-entry.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Skeleton <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/skeleton/skeleton.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">components</span>: {
    Skeleton
  },
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;skeleton /&gt;'</span>
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.server.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: path.join(__dirname, '../src/skeleton-entry.js'),
  output: {
    path: path.join(__dirname, '../server-dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }    
    ]
  },
  externals: Object.keys(require('../package.json').dependencies),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRServerPlugin({
      filename: 'skeleton.json'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.server.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> { VueLoaderPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-loader'</span>)
<span class="hljs-keyword">const</span> VueSSRServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer/server-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  mode: process.env.NODE_ENV,
  target: <span class="hljs-string">'node'</span>,
  entry: path.join(__dirname, <span class="hljs-string">'../src/skeleton-entry.js'</span>),
  output: {
    path: path.join(__dirname, <span class="hljs-string">'../server-dist'</span>),
    filename: <span class="hljs-string">'server.bundle.js'</span>,
    libraryTarget: <span class="hljs-string">'commonjs2'</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>
      },
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: [
          <span class="hljs-string">'vue-style-loader'</span>,
          <span class="hljs-string">'css-loader'</span>
        ]
      }    
    ]
  },
  externals: <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>).dependencies),
  resolve: {
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
    }
  },
  plugins: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin(),
    <span class="hljs-keyword">new</span> VueSSRServerPlugin({
      filename: <span class="hljs-string">'skeleton.json'</span>
    })
  ]
}</code></pre>
<p>其中骨架屏的webpack配置因为是node端，所以需要<code>target: 'node'</code> <code>libraryTarget: 'commonjs2'</code>。在<code>VueSSRServerPlugin</code>中，指定了其输出的json文件名。当执行webpack会在/server-dist目录下生成一个<code>skeleton.json</code>文件,这个文件记载了骨架屏的内容和样式，会提供给<code>vue-server-renderer</code>使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//skeleton.js
const fs = require('fs')
const path = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

// 读取`skeleton.json`，以`index.html`为模板写入内容
const renderer = createBundleRenderer(path.join(__dirname, './server-dist/skeleton.json'), {
  template: fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')
})

// 把上一步模板完成的内容写入（替换）`index.html`
renderer.renderToString({}, (err, html) => {
  fs.writeFileSync('index.html', html, 'utf-8')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//skeleton.js</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> createBundleRenderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer'</span>).createBundleRenderer

<span class="hljs-comment">// 读取`skeleton.json`，以`index.html`为模板写入内容</span>
<span class="hljs-keyword">const</span> renderer = createBundleRenderer(path.join(__dirname, <span class="hljs-string">'./server-dist/skeleton.json'</span>), {
  template: fs.readFileSync(path.join(__dirname, <span class="hljs-string">'./index.html'</span>), <span class="hljs-string">'utf-8'</span>)
})

<span class="hljs-comment">// 把上一步模板完成的内容写入（替换）`index.html`</span>
renderer.renderToString({}, <span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
  fs.writeFileSync(<span class="hljs-string">'index.html'</span>, html, <span class="hljs-string">'utf-8'</span>)
})</code></pre>
<blockquote>
<p>注意，作为模板的html文件，需要在被写入内容的位置添加&lt;!--vue-ssr-outlet--&gt;占位符，本例子在div#root里写入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
 <!--vue-ssr-outlet-->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
 <span class="hljs-comment">&lt;!--vue-ssr-outlet--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</blockquote>
<p>最后执行<code>node skeleton</code>就能实现vue的骨架屏。<br>最终的<code>index.html</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-CN&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=UTF-8&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;>
    <title>Document</title>
<style data-vue-ssr-id=&quot;a7049cb4:0&quot;>
.skeleton[data-v-61761ff8] {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav[data-v-61761ff8] {
  height: 45px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-swiper[data-v-61761ff8] {
  height: 160px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-tabs[data-v-61761ff8] {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item[data-v-61761ff8] {
  width: 25%;
  height: 55px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
.skeleton-tabs-item span[data-v-61761ff8] {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #eee;
}
.skeleton-banner[data-v-61761ff8] {
  height: 60px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-productions[data-v-61761ff8] {
  height: 20px;
  margin-bottom: 15px;
  background: #eee;
}
</style></head>
<body>
    <div id=&quot;root&quot;>
        <div data-server-rendered=&quot;true&quot; class=&quot;skeleton page&quot; data-v-61761ff8><div class=&quot;skeleton-nav&quot; data-v-61761ff8></div> <div class=&quot;skeleton-swiper&quot; data-v-61761ff8></div> <ul class=&quot;skeleton-tabs&quot; data-v-61761ff8><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li><li class=&quot;skeleton-tabs-item&quot; data-v-61761ff8><span data-v-61761ff8></span></li></ul> <div class=&quot;skeleton-banner&quot; data-v-61761ff8></div> <div class=&quot;skeleton-productions&quot; data-v-61761ff8></div><div class=&quot;skeleton-productions&quot; data-v-61761ff8></div><div class=&quot;skeleton-productions&quot; data-v-61761ff8></div><div class=&quot;skeleton-productions&quot; data-v-61761ff8></div><div class=&quot;skeleton-productions&quot; data-v-61761ff8></div><div class=&quot;skeleton-productions&quot; data-v-61761ff8></div></div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-CN"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html;charset=UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-vue-ssr-id</span>=<span class="hljs-string">"a7049cb4:0"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.skeleton</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.skeleton-nav</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">45px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-swiper</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">list-style</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> -<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-class">.skeleton-banner</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-productions</span><span class="hljs-selector-attr">[data-v-61761ff8]</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-server-rendered</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton page"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-nav"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-swiper"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-tabs-item"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-banner"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-productions"</span> <span class="hljs-attr">data-v-61761ff8</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>看下效果：<br><span class="img-wrap"><img data-src="/img/bVbaWKs?w=1203&amp;h=706" src="https://static.alili.tech/img/bVbaWKs?w=1203&amp;h=706" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>效果还是阔以的。</p>
<h1 id="articleHeader2">尾声</h1>
<p>文章开头小米商城手机页面就是用的这样的方法，不同的是它的骨架屏是一个base64的图片。</p>
<p>更多关于<code>vue-server-renderer</code>内容请戳<a href="https://cn.vuejs.org/v2/guide/ssr.html" rel="nofollow noreferrer" target="_blank">vue-ssr</a></p>
<blockquote>文章相关代码已经同步到<a href="https://github.com/RThong/vue-skeleton" rel="nofollow noreferrer" target="_blank">Github</a>，欢迎查阅~</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue页面骨架屏

## 原文链接
[https://segmentfault.com/a/1190000014963269](https://segmentfault.com/a/1190000014963269)

