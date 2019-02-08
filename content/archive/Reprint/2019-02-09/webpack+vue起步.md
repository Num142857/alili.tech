---
title: 'webpack+vue起步' 
date: 2019-02-09 2:30:59
hidden: true
slug: 957bsgd0at
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="http://mrzhang123.github.io/2016/05/31/webpack-vue-2/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2016/05/31/webpack-vue-2/</a></p>
<h3 id="articleHeader0">本文基于<code>vue1.x</code>
</h3>
<h3 id="articleHeader1">基于<code>vue2.x&amp;webpack2.x</code>请移步至</h3>
<p><a href="https://segmentfault.com/a/1190000008279436">Vue2.x踩坑与总结</a><br><a href="https://segmentfault.com/a/1190000008279459" target="_blank">Webpack2.x踩坑与总结</a></p>
<blockquote><p>记得第一次知道Vue.js是在勾三股四大大的微博，那时候他开始翻译vue的文档，从那时候开始到现在，看了几次vue的教程，每次都有更深的理解，因为之前并没有研究过angular等框架，所以对MVVM并不是很了解，但是经过这段时间对vuejs的一些研究，越来越懂了，这篇文章，只是对vuejs和webpack配合的非常基础的文章，我想随着我对vue的深入理解，会对组件化，模块化，MVVM有更深入的理解。</p></blockquote>
<h2 id="articleHeader2">项目的创建</h2>
<p>1.新建项目文件夹，并在其中建立<code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir [project name]
$ cd [project name]
$ npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ mkdir [project name]
$ cd [project name]
$ npm init</code></pre>
<p>2.在项目目录下新建<code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Vue example</title>
</head>
<body>
    <div>"{{"message"}}"</div>
    <script src=&quot;dist/build.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue example<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>src文件夹，并在该文件夹下建立<code>main.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
new Vue({
    el:'body',
    data:{
        message:'test success!'
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'body'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">message</span>:<span class="hljs-string">'test success!'</span>
    }
});</code></pre>
<h2 id="articleHeader3">设置webpack</h2>
<h3 id="articleHeader4">1.安装webpack，webpack-dev-server以及相关的loaders</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装webpack，webpack-dev-server
$ npm install -g webpack
$ npm install -g webpack-dev-server
# 为项目安装其他依赖
$ npm i webpack-merge css-loader style-loader file-loader url-loader babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0 babel-runtime vue vue-loader vue-html-loader vue-style-loader vue-hot-reload-api -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment"># 全局安装webpack，webpack-dev-server</span>
$ npm install -g webpack
$ npm install -g webpack-dev-server
<span class="hljs-comment"># 为项目安装其他依赖</span>
$ npm i webpack-merge css-loader style-loader file-loader url-loader babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage<span class="hljs-number">-0</span> babel-runtime vue vue-loader vue-html-loader vue-style-loader vue-hot-reload-api -D</code></pre>
<p>webpack-merge：开发环境和生产环节的webpaak配置文件的配置合并&lt;br/&gt;<br>css-loader：编译写入css&lt;br/&gt;<br>style-loader：把编译后的css整合进html&lt;br/&gt;<br>file-loader：编译写入文件，默认情况下生成文件的文件名是文件名与MD5哈希值的组合&lt;br/&gt;<br>vue：vue主程序&lt;br/&gt;<br>vue-laoder：编译写入.vue文件&lt;br/&gt;<br>vue-html-loader：编译vue的template部分&lt;br/&gt;<br>vue-style-loader：编译vue的样式部分&lt;br/&gt;<br>vue-hot-reload-api：webpack对vue实现热替换&lt;br/&gt;<br>babel-core：ES2015编译核心&lt;br/&gt;<br>babel-loader：编译写入ES2015文档&lt;br/&gt;<br>babel-preset-es2015：ES2015语法&lt;br/&gt;<br>babel-preset-stage-0：开启测试功能&lt;br/&gt;<br>babel-runtime：babel执行环境&lt;br/&gt;</p>
<h4>url-loader</h4>
<p>这里介绍下url-loader，这个loader实际上是对file-loader的封装<a href="https://github.com/webpack/url-loader" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/url-loader</a><br>比如CSS文件中有时候会这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo{
    background-image: url('a.png');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.demo</span>{
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'a.png'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module:{
    loaders:[
        {test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>:{
    <span class="hljs-attr">loaders</span>:[
        {<span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.(png|jpg)$/</span>,<span class="hljs-attr">loader</span>:<span class="hljs-string">'url-loader?limit=8192'</span>}
    ]
}</code></pre>
<p>经过以上配置，当a.png小于8K就会自动将图片转换成base64编码，如果不小于，则不会转换。<br><strong>这里顺便提一句，在module配置的时候，loader的写法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module:{
    loaders:[
        {test:/\.jade$/,loader:'jade'}
        //这里配置了让webpack识别jade的loader，其他类似，比如.vue
        //用于css文件的loader有两种写法
        {test:/\.css$/,loader:'style!css'}
        {test:/\.css$/,loaders:['style','css']}
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>:{
    <span class="hljs-attr">loaders</span>:[
        {<span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.jade$/</span>,<span class="hljs-attr">loader</span>:<span class="hljs-string">'jade'</span>}
        <span class="hljs-comment">//这里配置了让webpack识别jade的loader，其他类似，比如.vue</span>
        <span class="hljs-comment">//用于css文件的loader有两种写法</span>
        {<span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.css$/</span>,<span class="hljs-attr">loader</span>:<span class="hljs-string">'style!css'</span>}
        {<span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.css$/</span>,<span class="hljs-attr">loaders</span>:[<span class="hljs-string">'style'</span>,<span class="hljs-string">'css'</span>]}
    ]
}</code></pre>
<h3 id="articleHeader5">2.配置<code>webpack.config.js</code>
</h3>
<p>在根目录下建立webpack.config.js，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
module.exports = {
  entry: './src/main.js',
  //定义webpack输出的文件，我们在这里设置了
  让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    path: './dist',
    publicPath:'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader:'url-loader?limit=8192'
      }
    ]
  },
  //这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了
  babel: {
     presets: ['es2015','stage-0'],
     plugins: ['transform-runtime']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main.js'</span>,
  <span class="hljs-comment">//定义webpack输出的文件，我们在这里设置了</span>
  让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist'</span>,
    <span class="hljs-attr">publicPath</span>:<span class="hljs-string">'dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-comment">//转化ES6语法</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      <span class="hljs-comment">//图片转化，小于8K自动转化为base64的编码</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
        <span class="hljs-attr">loader</span>:<span class="hljs-string">'url-loader?limit=8192'</span>
      }
    ]
  },
  <span class="hljs-comment">//这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了</span>
  babel: {
     <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'stage-0'</span>],
     <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'transform-runtime'</span>]
  }
}</code></pre>
<p><strong>特别说明</strong><br>如果要在.babelrc下配置babel，则需要在根目录下新建该文件，windows环境下，不能新建该txt文件然后改后缀，需要通过dos命令建立：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo>.babelrc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">echo</span>&gt;.babelrc</code></pre>
<p>通过该命令就可以建立babelde配置文件，用编辑器打开，修改里面的内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-0&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-0"</span>],
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p>完成该配置我们在命令中运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ webpack</code></pre>
<p>打开<code>index.html</code>就可以看到浏览器中看到我们刚刚写的文字<br>至此我们实现了最基本的利用webpack打包vue，下一篇将讲解<a href="https://segmentfault.com/a/1190000005616974">如何利用webpack+vue真正实现组件化</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue起步

## 原文链接
[https://segmentfault.com/a/1190000005614864](https://segmentfault.com/a/1190000005614864)

