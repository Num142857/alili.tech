---
title: '希望做浏览器长缓存？关于Webpack生成的Hash，你应该知道这些' 
date: 2018-12-26 2:30:14
hidden: true
slug: bjrz1gl2tmr
categories: [reprint]
---

{{< raw >}}

                    
<p>童鞋，你看到这篇文章的时候很可能你只是在找一篇webpack的配置文章教学，但是听老哥说一句，别去搜什么<em>startkit</em>或者<em>best practice</em>文章，特别是中文的，如果你找到了，也记得看一下文章啥时候写的，超过半年的文章就别看了，百分之92.6里面的内容已经过期了。你想学webpack相关的姿势，最好的办法就是：<strong>看文档</strong></p>
<p>言归正传，这篇文章并不教你怎么配置webpack，内容全部都是关于webpack生成文件的<code>hash</code>的。在打包出来的文件名上加上文件内容的<code>hash</code>是目前最常见的有效使用浏览器长缓存的方法，js文件如果有内容更新，<code>hash</code>就会更新，浏览器请求路径变化所以更新缓存，如果js内容不变，<code>hash</code>不变，直接用缓存，<strong>PERFECT！</strong>所以所有的问题就留给如何更好得控制文件的<code>hash</code>了。</p>
<h2 id="articleHeader0">基本</h2>
<p>首先我们弄一个最简单的webpack配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/foo.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">'src/foo.js'</span>)
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>)
  }
}</code></pre>
<p>而我们foo.js如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
console.log(React.toString())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-built_in">console</span>.log(React.toString())</code></pre>
<p>注意这里的<code>output.filename</code>你也可以用<code>[hash]</code>而不是<code>[chunkhash]</code>，但是这两种生成的hash码是不一样的<br>使用hash如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.03700a98484e0f02c914.js  70.4 kB       0  [emitted]  app
   [6] ./src/foo.js 55 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt">app<span class="hljs-number">.03700</span>a98484e0f02c914.js  <span class="hljs-number">70.4</span> kB       <span class="hljs-number">0</span>  [emitted]  app
   [<span class="hljs-number">6</span>] ./src/foo.js <span class="hljs-number">55</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>使用chunkhash如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.f2f78b37e74027320ebf.js  70.4 kB       0  [emitted]  app
   [6] ./src/foo.js 55 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt">app.f2f78b37e74027320ebf.js  <span class="hljs-number">70.4</span> kB       <span class="hljs-number">0</span>  [emitted]  app
   [<span class="hljs-number">6</span>] ./src/foo.js <span class="hljs-number">55</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>对于单个entry来说用哪个都没有问题，做例子期间使用的是<code>webpack@3.8.1</code>版本，这个版本webpack对于源码没有改动的情况，已经修复了hash串会变的问题。但是在之前的版本有可能会出现<strong>对于同一份没有修改的代码进行修改，hash不一致的问题</strong>，所以不管你使用的版本会不会有问题，都建议使用接下去的配置。<strong>之后的配置都是用chunkhash</strong>作为hash生成</p>
<h2 id="articleHeader1">hash vs chunkhash</h2>
<p>因为webpack要处理不同模块的依赖关系，所以他内置了一个js模板用来处理依赖关系（后面称为runtime），这段js因此也会被打包的我们最后bundle里面。在实际项目中我们常常需要将这部分代码分离出来，比如我们要把类库分开打包的情况，如果不单独给runtime单独生成一个js，那么他会和类库一起打包，而这部分代码会随着业务代码改变而改变，导致类库的hash也每次都改变，那么我们分离出类库就没有意义了。所以这里我们需要给runtime单独提供一个js。</p>
<p>修改配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    app: path.join(__dirname, 'src/foo.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">'src/foo.js'</span>)
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>
    })
  ]
}</code></pre>
<p>webpack的文档中说明，如果给<code>webpack.optimize.CommonsChunkPlugin</code>的name指定一个在entry中没有声明的名字，那么他会把runtime代码打包到这个文件中，所以你这里可以任意指定你喜欢的name (ゝ∀･)b</p>
<p>那么现在打包出来会是神马样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.aed80e077eb0a6c42e65.js    68 kB       0  [emitted]  app
runtime.ead626e4060b3a0ecb1f.js  5.82 kB       1  [emitted]  runtime
   [6] ./src/foo.js 55 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt">app.aed80e077eb0a6c42e65.js    <span class="hljs-number">68</span> kB       <span class="hljs-number">0</span>  [emitted]  app
runtime.ead626e4060b3a0ecb1f.js  <span class="hljs-number">5.82</span> kB       <span class="hljs-number">1</span>  [emitted]  runtime
   [<span class="hljs-number">6</span>] ./src/foo.js <span class="hljs-number">55</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>我们可以看到，app和runtime的hash是不一样的。那么如果我们使用hash而不是chunkhash呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.357eff03ae011d688ac3.js    68 kB       0  [emitted]  app
runtime.357eff03ae011d688ac3.js  5.81 kB       1  [emitted]  runtime
   [6] ./src/foo.js 55 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt">app<span class="hljs-number">.357</span>eff03ae011d688ac3.js    <span class="hljs-number">68</span> kB       <span class="hljs-number">0</span>  [emitted]  app
runtime<span class="hljs-number">.357</span>eff03ae011d688ac3.js  <span class="hljs-number">5.81</span> kB       <span class="hljs-number">1</span>  [emitted]  runtime
   [<span class="hljs-number">6</span>] ./src/foo.js <span class="hljs-number">55</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>从这里就可以看出hash和chunkhash的区别了，chunkhash会包含每个chunk的区别（chunk可以理解为每个entry），而hash则是所有打包出来的文件都是一样的，所以一旦你的打包输出有多个文件，你势必需要使用chunkhash。</p>
<h2 id="articleHeader2">类库文件单独打包</h2>
<p>在一般的项目中，我们的类库文件都不会经常更新，比如react，更多的时候我们更新的是业务代码。那么我们肯定希望类库代码能够尽可能长的在浏览器进行缓存，这就需要我们单独给类库文件打包了，怎么做呢？</p>
<p>修改配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    app: path.join(__dirname, 'src/foo.js'),
    vendor: ['react']  // 所有类库都可以在这里声明
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    // 单独打包，app中就不会出现类库代码
    // 必须放在runtime之前
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">'src/foo.js'</span>),
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>]  <span class="hljs-comment">// 所有类库都可以在这里声明</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// 单独打包，app中就不会出现类库代码</span>
    <span class="hljs-comment">// 必须放在runtime之前</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>
    })
  ]
}</code></pre>
<p>然后我们来执行以下打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" vendor.72d208b8e74b753cf09c.js    67.7 kB       0  [emitted]  vendor
    app.fdc2c0fe8694c1690cb3.js  494 bytes       1  [emitted]  app
runtime.035d95805255d39272ba.js    5.85 kB       2  [emitted]  runtime
   [7] ./src/foo.js 55 bytes {1} [built]
  [12] multi react 28 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt"> vendor<span class="hljs-number">.72</span>d208b8e74b753cf09c.js    <span class="hljs-number">67.7</span> kB       <span class="hljs-number">0</span>  [emitted]  vendor
    app.fdc2c0fe8694c1690cb3.js  <span class="hljs-number">494</span> bytes       <span class="hljs-number">1</span>  [emitted]  app
runtime<span class="hljs-number">.035</span>d95805255d39272ba.js    <span class="hljs-number">5.85</span> kB       <span class="hljs-number">2</span>  [emitted]  runtime
   [<span class="hljs-number">7</span>] ./src/foo.js <span class="hljs-number">55</span> bytes {<span class="hljs-number">1</span>} [built]
  [<span class="hljs-number">12</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>vendor和app分开了，而且hash都不一样，看上去很美好是不是？高兴太早了年轻人。我们再新建一个文件，叫<code>bar.js</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

export default function() {
  console.log(React.toString())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(React.toString())
}</code></pre>
<p>然后修改<code>foo.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bar from './bar.js'
console.log(bar())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'./bar.js'</span>
<span class="hljs-built_in">console</span>.log(bar())</code></pre>
<p>从这个修改中可以看出，我们并没有修改类库相关的内容，我们的vendor中应该依然只有<code>react</code>，那么vendor的hash应该是不会变的，那么结果如我们所愿吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vendor.424ef301d6c78a447180.js    67.7 kB       0  [emitted]  vendor
    app.0dfe0411d4a47ce89c61.js  845 bytes       1  [emitted]  app
runtime.e90ad557ba577934a75f.js    5.85 kB       2  [emitted]  runtime
   [7] ./src/foo.js 45 bytes {1} [built]
   [8] ./src/bar.js 88 bytes {1} [built]
  [13] multi react 28 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt">vendor<span class="hljs-number">.424</span>ef301d6c78a447180.js    <span class="hljs-number">67.7</span> kB       <span class="hljs-number">0</span>  [emitted]  vendor
    app<span class="hljs-number">.0</span>dfe0411d4a47ce89c61.js  <span class="hljs-number">845</span> bytes       <span class="hljs-number">1</span>  [emitted]  app
runtime.e90ad557ba577934a75f.js    <span class="hljs-number">5.85</span> kB       <span class="hljs-number">2</span>  [emitted]  runtime
   [<span class="hljs-number">7</span>] ./src/foo.js <span class="hljs-number">45</span> bytes {<span class="hljs-number">1</span>} [built]
   [<span class="hljs-number">8</span>] ./src/bar.js <span class="hljs-number">88</span> bytes {<span class="hljs-number">1</span>} [built]
  [<span class="hljs-number">13</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>很遗憾，webpack狠狠打了我们的脸╮(╯_╰)╭</p>
<p>这是什么原因呢？这是因为我们多加入了一个文件，对于webpack来说就是多了一个模块，<strong>默认情况下webpack的模块都是以一个有序数列命名的，也就是<code>[0,1,2....]</code></strong>，我们中途加了一个模块导致每个模块的顺序变了，vendor里面的模块的模块id变了，所以hash也就变了。总结一下：</p>
<ol>
<li>app变化是因为内容发生了变化</li>
<li>vendor变化时因为他的module.id发生了变化</li>
<li>runtime变化时因为它本身就是维护模块依赖关系的</li>
</ol>
<p>那么怎么解决呢？</p>
<h2 id="articleHeader3">NamedModulePlugin和HashedModuleIdsPlugin</h2>
<p>这两个plugin让webpack不再使用数字给我们的模块进行命名，这样每个模块都会有一个独有的名字，也就不会出现增删模块导致模块id变化引起最终的hash变化了。如何使用？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),
    <span class="hljs-comment">// new webpack.HashedModuleIdsPlugin(),</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>
    })
  ]
}</code></pre>
<p>NamedModulePlugin一般用在开发时，能让我们看到模块的名字，可读性更高，但是性能相对较差。HashedModuleIdsPlugin更建议在正式环境中使用。</p>
<p>我们来看一下使用这个插件后，两次打包的结果，修改前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" vendor.91148d0e2f4041ef2280.js      69 kB       0  [emitted]  vendor
    app.0228a43edf0a32a59426.js  551 bytes       1  [emitted]  app
runtime.8ed369e8c4ff541ad301.js    5.85 kB       2  [emitted]  runtime
[./src/foo.js] ./src/foo.js 56 bytes {1} [built]
   [0] multi react 28 bytes {0} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt"> vendor<span class="hljs-number">.91148</span>d0e2f4041ef2280.js      <span class="hljs-number">69</span> kB       <span class="hljs-number">0</span>  [emitted]  vendor
    app<span class="hljs-number">.0228</span>a43edf0a32a59426.js  <span class="hljs-number">551</span> bytes       <span class="hljs-number">1</span>  [emitted]  app
runtime<span class="hljs-number">.8</span>ed369e8c4ff541ad301.js    <span class="hljs-number">5.85</span> kB       <span class="hljs-number">2</span>  [emitted]  runtime
[./src/foo.js] ./src/foo.js <span class="hljs-number">56</span> bytes {<span class="hljs-number">1</span>} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>修改后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" vendor.91148d0e2f4041ef2280.js      69 kB       0  [emitted]  vendor
    app.f64e232e4b6d6a59e617.js  917 bytes       1  [emitted]  app
runtime.c12d50e9a1902f12a9f4.js    5.85 kB       2  [emitted]  runtime
[./src/bar.js] ./src/bar.js 88 bytes {1} [built]
   [0] multi react 28 bytes {0} [built]
[./src/foo.js] ./src/foo.js 43 bytes {1} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="txt"> vendor<span class="hljs-number">.91148</span>d0e2f4041ef2280.js      <span class="hljs-number">69</span> kB       <span class="hljs-number">0</span>  [emitted]  vendor
    app.f64e232e4b6d6a59e617.js  <span class="hljs-number">917</span> bytes       <span class="hljs-number">1</span>  [emitted]  app
runtime.c12d50e9a1902f12a9f4.js    <span class="hljs-number">5.85</span> kB       <span class="hljs-number">2</span>  [emitted]  runtime
[./src/bar.js] ./src/bar.js <span class="hljs-number">88</span> bytes {<span class="hljs-number">1</span>} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">0</span>} [built]
[./src/foo.js] ./src/foo.js <span class="hljs-number">43</span> bytes {<span class="hljs-number">1</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>可以看到vendor的hash没有变化，HashedModuleIdsPlugin也是一样的效果。貌似世界变得更和谐了d(`･∀･)b，是吗？哈哈，<strong>并不是！</strong></p>
<h2 id="articleHeader4">async module</h2>
<p>随着我们的系统变得越来越大，模块变得很多，如果所有模块一次性打包到一起，那么首次加载就会变得很慢。这时候我们会考虑做异步加载，webpack原生支持异步加载，用起来很方便。</p>
<p>我们再创建一个js叫做<code>async-bar.js</code>，在<code>foo.js</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import('./async-bar').then(a => console.log(a))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span>(<span class="hljs-string">'./async-bar'</span>).then(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))</code></pre>
<p>打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      0.1415eebc42d74a3dc01d.js  131 bytes       0  [emitted]
 vendor.19a637337ab59d16fb34.js      69 kB       1  [emitted]  vendor
    app.f7e5ecde27458097680e.js    1.04 kB       2  [emitted]  app
runtime.c4caa7f9859faa94b02e.js    5.88 kB       3  [emitted]  runtime
[./src/async-bar.js] ./src/async-bar.js 32 bytes {0} [built]
[./src/bar.js] ./src/bar.js 88 bytes {2} [built]
   [0] multi react 28 bytes {1} [built]
[./src/foo.js] ./src/foo.js 92 bytes {2} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">      <span class="hljs-number">0.1415</span>eebc42d74a3dc01d.js  <span class="hljs-number">131</span> bytes       <span class="hljs-number">0</span>  [emitted]
 vendor<span class="hljs-number">.19</span>a637337ab59d16fb34.js      <span class="hljs-number">69</span> kB       <span class="hljs-number">1</span>  [emitted]  vendor
    app.f7e5ecde27458097680e.js    <span class="hljs-number">1.04</span> kB       <span class="hljs-number">2</span>  [emitted]  app
runtime.c4caa7f9859faa94b02e.js    <span class="hljs-number">5.88</span> kB       <span class="hljs-number">3</span>  [emitted]  runtime
[./src/<span class="hljs-keyword">async</span>-bar.js] ./src/<span class="hljs-keyword">async</span>-bar.js <span class="hljs-number">32</span> bytes {<span class="hljs-number">0</span>} [built]
[./src/bar.js] ./src/bar.js <span class="hljs-number">88</span> bytes {<span class="hljs-number">2</span>} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">1</span>} [built]
[./src/foo.js] ./src/foo.js <span class="hljs-number">92</span> bytes {<span class="hljs-number">2</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>恩，这时候我们已经看到，我们的vendor变了，但是更可怕的还在后头，我们再建了一个模块叫<code>async-baz.js</code>，一样的在<code>foo.js</code>引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import('./async-baz').then(a => console.log(a))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span>(<span class="hljs-string">'./async-baz'</span>).then(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))</code></pre>
<p>然后再打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      0.eb2218a5fc67e9cc73e4.js  131 bytes       0  [emitted]
      1.61c2f5620a41b50b31eb.js  131 bytes       1  [emitted]
 vendor.1eada47dd979599cc3e5.js      69 kB       2  [emitted]  vendor
    app.1f82033832b8a5dd6e3b.js    1.17 kB       3  [emitted]  app
runtime.615d429d080c11c1979f.js     5.9 kB       4  [emitted]  runtime
[./src/async-bar.js] ./src/async-bar.js 32 bytes {1} [built]
[./src/async-baz.js] ./src/async-baz.js 32 bytes {0} [built]
[./src/bar.js] ./src/bar.js 88 bytes {3} [built]
   [0] multi react 28 bytes {2} [built]
[./src/foo.js] ./src/foo.js 140 bytes {3} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>      <span class="hljs-number">0.</span>eb2218a5fc67e9cc73e4.js  <span class="hljs-number">131</span> bytes       <span class="hljs-number">0</span>  [emitted]
      <span class="hljs-number">1.61</span>c2f5620a41b50b31eb.js  <span class="hljs-number">131</span> bytes       <span class="hljs-number">1</span>  [emitted]
 vendor<span class="hljs-number">.1</span>eada47dd979599cc3e5.js      <span class="hljs-number">69</span> kB       <span class="hljs-number">2</span>  [emitted]  vendor
    app<span class="hljs-number">.1</span>f82033832b8a5dd6e3b.js    <span class="hljs-number">1.17</span> kB       <span class="hljs-number">3</span>  [emitted]  app
runtime<span class="hljs-number">.615</span>d429d080c11c1979f.js     <span class="hljs-number">5.9</span> kB       <span class="hljs-number">4</span>  [emitted]  runtime
[./src/async-bar.js] ./src/async-bar.js <span class="hljs-number">32</span> bytes {<span class="hljs-number">1</span>} [built]
[./src/async-baz.js] ./src/async-baz.js <span class="hljs-number">32</span> bytes {<span class="hljs-number">0</span>} [built]
[./src/bar.js] ./src/bar.js <span class="hljs-number">88</span> bytes {<span class="hljs-number">3</span>} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {<span class="hljs-number">2</span>} [built]
[./src/foo.js] ./src/foo.js <span class="hljs-number">140</span> bytes {<span class="hljs-number">3</span>} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>恩，我能说脏话吗？不能？(╯‵□′)╯︵┻━┻</p>
<p>为啥每个模块的hash都变了啊？！！为啥模块又变成数字ID了啊？！！</p>
<p>好吧，言归正传，决绝办法还是有的，那就是NamedChunksPlugin，之前是用来处理每个chunk名字的，似乎在最新的版本中不需要这个也能正常打包普通模块的名字。但是这里我们可以用来处理异步模块的名字，在webpack的plugins中加入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.NamedChunksPlugin((chunk) => { 
  if (chunk.name) { 
    return chunk.name; 
  } 
  return chunk.mapModules(m => path.relative(m.context, m.request)).join(&quot;_&quot;); 
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.NamedChunksPlugin(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> { 
  <span class="hljs-keyword">if</span> (chunk.name) { 
    <span class="hljs-keyword">return</span> chunk.name; 
  } 
  <span class="hljs-keyword">return</span> chunk.mapModules(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> path.relative(m.context, m.request)).join(<span class="hljs-string">"_"</span>); 
}),</code></pre>
<p>再执行打包，两次结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         app.5faeebb6da84bedaac0a.js    1.11 kB           app  [emitted]  app
async-bar.js.457b1711c7e8c6b6914c.js  144 bytes  async-bar.js  [emitted]
     runtime.f263e4cd58ad7b17a4bf.js     5.9 kB       runtime  [emitted]  runtime
      vendor.05493d3691191b049e65.js      69 kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar.js 32 bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar.js 88 bytes {app} [built]
   [0] multi react 28 bytes {vendor} [built]
[./src/foo.js] ./src/foo.js 143 bytes {app} [built]
    + 11 hidden modules


         app.55e3f40adacf95864a96.js     1.2 kB           app  [emitted]  app
async-bar.js.457b1711c7e8c6b6914c.js  144 bytes  async-bar.js  [emitted]
async-baz.js.a85440cf862a8ad3a984.js  144 bytes  async-baz.js  [emitted]
     runtime.deeb657e46f5f7c0da42.js    5.94 kB       runtime  [emitted]  runtime
      vendor.05493d3691191b049e65.js      69 kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar.js 32 bytes {async-bar.js} [built]
[./src/async-baz.js] ./src/async-baz.js 32 bytes {async-baz.js} [built]
[./src/bar.js] ./src/bar.js 88 bytes {app} [built]
   [0] multi react 28 bytes {vendor} [built]
[./src/foo.js] ./src/foo.js 140 bytes {app} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="txt">         app.<span class="hljs-number">5</span>faeebb6da84bedaac0a<span class="hljs-selector-class">.js</span>    <span class="hljs-number">1.11</span> kB           app  [emitted]  app
async-bar<span class="hljs-selector-class">.js</span>.<span class="hljs-number">457</span>b1711c7e8c6b6914c<span class="hljs-selector-class">.js</span>  <span class="hljs-number">144</span> bytes  async-bar<span class="hljs-selector-class">.js</span>  [emitted]
     runtime<span class="hljs-selector-class">.f263e4cd58ad7b17a4bf</span><span class="hljs-selector-class">.js</span>     <span class="hljs-number">5.9</span> kB       runtime  [emitted]  runtime
      vendor.<span class="hljs-number">05493</span>d3691191b049e65<span class="hljs-selector-class">.js</span>      <span class="hljs-number">69</span> kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">88</span> bytes {app} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {vendor} [built]
[./src/foo.js] ./src/foo<span class="hljs-selector-class">.js</span> <span class="hljs-number">143</span> bytes {app} [built]
    + <span class="hljs-number">11</span> hidden modules


         app.<span class="hljs-number">55</span>e3f40adacf95864a96<span class="hljs-selector-class">.js</span>     <span class="hljs-number">1.2</span> kB           app  [emitted]  app
async-bar<span class="hljs-selector-class">.js</span>.<span class="hljs-number">457</span>b1711c7e8c6b6914c<span class="hljs-selector-class">.js</span>  <span class="hljs-number">144</span> bytes  async-bar<span class="hljs-selector-class">.js</span>  [emitted]
async-baz<span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.a85440cf862a8ad3a984</span><span class="hljs-selector-class">.js</span>  <span class="hljs-number">144</span> bytes  async-baz<span class="hljs-selector-class">.js</span>  [emitted]
     runtime<span class="hljs-selector-class">.deeb657e46f5f7c0da42</span><span class="hljs-selector-class">.js</span>    <span class="hljs-number">5.94</span> kB       runtime  [emitted]  runtime
      vendor.<span class="hljs-number">05493</span>d3691191b049e65<span class="hljs-selector-class">.js</span>      <span class="hljs-number">69</span> kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {async-bar.js} [built]
[./src/async-baz.js] ./src/async-baz<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {async-baz.js} [built]
[./src/bar.js] ./src/bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">88</span> bytes {app} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {vendor} [built]
[./src/foo.js] ./src/foo<span class="hljs-selector-class">.js</span> <span class="hljs-number">140</span> bytes {app} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>可以看到结果都是用名字而不是id了，而且不改改变的地方也都没有改变</p>
<blockquote><p>注意生成chunk名字的逻辑代码你可以根据自己的需求去改</p></blockquote>
<p>使用上面的方式会有一些问题，比如使用.vue文件开发模式，m.request是一大串vue-loader生成的代码，所以打包会报错。当然大家可以自己找对应的命名方式，在这里我推荐一个webpack原生支持的方式，在使用import的时候，写如下注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import(/* webpackChunkName: &quot;views-home&quot; */ '../views/Home')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "views-home" */</span> <span class="hljs-string">'../views/Home'</span>)</code></pre>
<p>然后配置文件只要使用<code>new NamedChunksPlugin()</code>就可以了，不需要自己再拼写名字，因为这个时候我们的异步chunk已经有名字了。</p>
<p>所以到这就结束了是吗？真的，求你快结束吧，我想去吃我两小时前买的烤鸭了。</p>
<p>好<del>~</del>~~的吧，我们还得搞点事情</p>
<h2 id="articleHeader5">增加更多的entry</h2>
<p>修改<code>webpack.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...
  entry: {
    app: path.join(__dirname, 'src/foo.js'),
    vendor: ['react'],
    two: path.join(__dirname, 'src/foo-two.js')
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  ...
  entry: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">'src/foo.js'</span>),
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>],
    <span class="hljs-attr">two</span>: path.join(__dirname, <span class="hljs-string">'src/foo-two.js'</span>)
  },
  ...
}</code></pre>
<p>增加的enrty如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bar from './bar.js'
console.log(bar)

import('./async-bar').then(a => console.log(a))
// import('./async-baz').then(a => console.log(a))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'./bar.js'</span>
<span class="hljs-built_in">console</span>.log(bar)

<span class="hljs-keyword">import</span>(<span class="hljs-string">'./async-bar'</span>).then(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))
<span class="hljs-comment">// import('./async-baz').then(a =&gt; console.log(a))</span></code></pre>
<p>是的跟<code>foo.js</code>一模一样，当然你可以改逻辑，只需要记得引用<code>bar.js</code>就可以。</p>
<p>然后我们打包，结果会让你想再次(╯‵□′)╯︵┻━┻</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         app.77b13a56bbc0579ca35c.js  612 bytes           app  [emitted]  app
async-bar.js.457b1711c7e8c6b6914c.js  144 bytes  async-bar.js  [emitted]
     runtime.bbe8e813f5e886e7134a.js    5.93 kB       runtime  [emitted]  runtime
         two.9e4ce5a54b4f73b2ed60.js  620 bytes           two  [emitted]  two
      vendor.8ad1e07bfa18dd78ad0f.js    69.5 kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar.js 32 bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar.js 88 bytes {vendor} [built]
   [0] multi react 28 bytes {vendor} [built]
[./src/foo-two.js] ./src/foo-two.js 143 bytes {two} [built]
[./src/foo.js] ./src/foo.js 143 bytes {app} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>         app.<span class="hljs-number">77</span>b13a56bbc0579ca35c<span class="hljs-selector-class">.js</span>  <span class="hljs-number">612</span> bytes           app  [emitted]  app
async-bar<span class="hljs-selector-class">.js</span>.<span class="hljs-number">457</span>b1711c7e8c6b6914c<span class="hljs-selector-class">.js</span>  <span class="hljs-number">144</span> bytes  async-bar<span class="hljs-selector-class">.js</span>  [emitted]
     runtime<span class="hljs-selector-class">.bbe8e813f5e886e7134a</span><span class="hljs-selector-class">.js</span>    <span class="hljs-number">5.93</span> kB       runtime  [emitted]  runtime
         two.<span class="hljs-number">9</span>e4ce5a54b4f73b2ed60<span class="hljs-selector-class">.js</span>  <span class="hljs-number">620</span> bytes           two  [emitted]  two
      vendor.<span class="hljs-number">8</span>ad1e07bfa18dd78ad0f<span class="hljs-selector-class">.js</span>    <span class="hljs-number">69.5</span> kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">88</span> bytes {vendor} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {vendor} [built]
[./src/foo-two.js] ./src/foo-two<span class="hljs-selector-class">.js</span> <span class="hljs-number">143</span> bytes {two} [built]
[./src/foo.js] ./src/foo<span class="hljs-selector-class">.js</span> <span class="hljs-number">143</span> bytes {app} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>为毛所有文件的hash都变化了啊？！！！逗我玩呢？</p>
<p>好吧，原因是vendor作为common chunk并不只是包含我们在entry中声明的部分，他还会包含每个entry中引用的公共代码，有些时候你可能希望这样的结果，但在我们这里，这就是我要解决的一个问题啊ლ(ﾟдﾟლ)</p>
<p>所以这里怎么做呢，在CommonsChunkPlugin里面有一个参数，可以用来告诉webpack我们的vendor真的只想包含我们声明的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    ...
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">plugins</span>: [
    ...
    new webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
  ]
}</code></pre>
<p>这个参数的意思是尽可能少的把公用代码包含到vendor里面。于是我们又打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         app.5faeebb6da84bedaac0a.js    1.13 kB           app  [emitted]  app
async-bar.js.457b1711c7e8c6b6914c.js  144 bytes  async-bar.js  [emitted]
     runtime.b0406822caa4d1898cb8.js    5.93 kB       runtime  [emitted]  runtime
         two.9be2d4a28265bfc9d947.js    1.13 kB           two  [emitted]  two
      vendor.05493d3691191b049e65.js      69 kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar.js 32 bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar.js 88 bytes {app} {two} [built]
   [0] multi react 28 bytes {vendor} [built]
[./src/foo-two.js] ./src/foo-two.js 143 bytes {two} [built]
[./src/foo.js] ./src/foo.js 143 bytes {app} [built]
    + 11 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>         app.<span class="hljs-number">5</span>faeebb6da84bedaac0a<span class="hljs-selector-class">.js</span>    <span class="hljs-number">1.13</span> kB           app  [emitted]  app
async-bar<span class="hljs-selector-class">.js</span>.<span class="hljs-number">457</span>b1711c7e8c6b6914c<span class="hljs-selector-class">.js</span>  <span class="hljs-number">144</span> bytes  async-bar<span class="hljs-selector-class">.js</span>  [emitted]
     runtime<span class="hljs-selector-class">.b0406822caa4d1898cb8</span><span class="hljs-selector-class">.js</span>    <span class="hljs-number">5.93</span> kB       runtime  [emitted]  runtime
         two.<span class="hljs-number">9</span>be2d4a28265bfc9d947<span class="hljs-selector-class">.js</span>    <span class="hljs-number">1.13</span> kB           two  [emitted]  two
      vendor.<span class="hljs-number">05493</span>d3691191b049e65<span class="hljs-selector-class">.js</span>      <span class="hljs-number">69</span> kB        vendor  [emitted]  vendor
[./src/async-bar.js] ./src/async-bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {async-bar.js} [built]
[./src/bar.js] ./src/bar<span class="hljs-selector-class">.js</span> <span class="hljs-number">88</span> bytes {app} {two} [built]
   [<span class="hljs-number">0</span>] multi react <span class="hljs-number">28</span> bytes {vendor} [built]
[./src/foo-two.js] ./src/foo-two<span class="hljs-selector-class">.js</span> <span class="hljs-number">143</span> bytes {two} [built]
[./src/foo.js] ./src/foo<span class="hljs-selector-class">.js</span> <span class="hljs-number">143</span> bytes {app} [built]
    + <span class="hljs-number">11</span> hidden modules</code></pre>
<p>恩，熟悉的味道。</p>
<p>到这里我们跟webpack的<strong>hash变化之战</strong>算是告一段落，大部分webpack打包出现问题的原因是模块命名的问题，所以解决办法其实也就是给每个模块一个固定的名字。</p>
<p>最后我们的配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/foo.js'),
    vendor: ['react'],
    two: path.join(__dirname, 'src/foo-two.js')
  },
  externals: {
    jquery: 'jQuery'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.NamedChunksPlugin((chunk) => { 
      if (chunk.name) { 
        return chunk.name; 
      } 
      return chunk.mapModules(m => path.relative(m.context, m.request)).join(&quot;_&quot;); 
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: path.join(__dirname, <span class="hljs-string">'src/foo.js'</span>),
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>],
    <span class="hljs-attr">two</span>: path.join(__dirname, <span class="hljs-string">'src/foo-two.js'</span>)
  },
  <span class="hljs-attr">externals</span>: {
    <span class="hljs-attr">jquery</span>: <span class="hljs-string">'jQuery'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.NamedChunksPlugin(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> { 
      <span class="hljs-keyword">if</span> (chunk.name) { 
        <span class="hljs-keyword">return</span> chunk.name; 
      } 
      <span class="hljs-keyword">return</span> chunk.mapModules(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> path.relative(m.context, m.request)).join(<span class="hljs-string">"_"</span>); 
    }),
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),
    <span class="hljs-comment">// new webpack.HashedModuleIdsPlugin(),</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>
    })
  ]
}</code></pre>
<p>如果你遇到了其他问题，你可以给我留言，我会去尝试解决，希望大家看完能有一些收获( σ՞ਊ ՞)σ </p>
<p>参考文章：</p>
<ol>
<li><a href="https://webpack.js.org/guides/caching/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides/caching/</a></li>
<li><a href="https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31" rel="nofollow noreferrer" target="_blank">一篇牛逼的blog</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
希望做浏览器长缓存？关于Webpack生成的Hash，你应该知道这些

## 原文链接
[https://segmentfault.com/a/1190000011980729](https://segmentfault.com/a/1190000011980729)

