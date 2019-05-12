---
title: '利用webpack和vue实现组件化' 
date: 2019-02-09 2:30:59
hidden: true
slug: 97jv67q41s
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="http://mrzhang123.github.io/2016/06/02/webpack-vue-3/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2016/06/02/webpack-vue-3/</a></p>
<h3 id="articleHeader0">本文基于<code>vue1.x</code>
</h3>
<h3 id="articleHeader1">基于<code>vue2.x&amp;webpack2.x</code>请移步至</h3>
<p><a href="https://segmentfault.com/a/1190000008279436">Vue2.x踩坑与总结</a><br><a href="https://segmentfault.com/a/1190000008279459" target="_blank">Webpack2.x踩坑与总结</a></p>
<blockquote><p>上一篇<a href="https://segmentfault.com/a/1190000005614864">webpack+vue起步</a>我们实现了用webpack打包vue的最基本用法，这篇我们将利用webpack+vue实现组件化</p></blockquote>
<p>在vue中实现组件化用到了vue特有的文件格式.vue，在每一个.vue文件就是一个组件，在组件中我们将html，css，js全部写入，然后在webpack中配置vue-loader就可以了。</p>
<h2 id="articleHeader2">建立vue组件</h2>
<p>在src目录下建立<code>components</code>文件夹，并在其中建立app.vue文件，这样我们项目的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--dist             //webpack打包后生成的文件夹
|   |--build.js
|--node_modules     //项目的依赖所在的文件夹
|--src              //文件入口
|   |--components   //组件存放文件夹
|       |--app.vue  //组件
|   |--main.js      //主js文件
|--index.html       //主html文件
|--package.json
|--webpack.config.js //webpack配置文件       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--dist             <span class="hljs-comment">//webpack打包后生成的文件夹</span>
|   |--build.js
|--node_modules     <span class="hljs-comment">//项目的依赖所在的文件夹</span>
|--src              <span class="hljs-comment">//文件入口</span>
|   |--components   <span class="hljs-comment">//组件存放文件夹</span>
|       |--app.vue  <span class="hljs-comment">//组件</span>
|   |--main.js      <span class="hljs-comment">//主js文件</span>
|--index.html       <span class="hljs-comment">//主html文件</span>
|--package.json
|--webpack.config.js <span class="hljs-comment">//webpack配置文件       </span></code></pre>
<p>首先在index.hmtl中写入代码：</p>
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
    <app></app>
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
    <span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在编辑器中打开app.vue文件，写入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;message&quot;>"{{"msg"}}"</div>    
</template>
<script>
export default {
  data () {
    return {
      msg: 'Hello from vue-loader'
    }
  }
}
</script>
<style>
.message{
    color:red;
    font-size:36px;
    font-weight:blod;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"message"</span>&gt;</span>"{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello from vue-loader'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.message</span>{
    <span class="hljs-attribute">color</span>:red;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">36px</span>;
    <span class="hljs-attribute">font-weight</span>:blod;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>在main.js中写入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './components/app.vue'

new Vue({
  el: 'body',
  components:{App}
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/app.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'body'</span>,
  <span class="hljs-attr">components</span>:{App}
});
</code></pre>
<p>这样运行命令webpack就可以看到效果了<br>这里用到了ES6的模块儿---<code>import</code>，<code>export</code></p>
<h4>
<code>export</code>命令</h4>
<p><code>export</code>命令用于规定模块的对外接口。一个模块就是一个独立文件。该文件内的所有变量外部都无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用<code>export</code>关键字对外暴露出该变量。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//export.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//export.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> firstName = <span class="hljs-string">'Michael'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> lastName = <span class="hljs-string">'Jackson'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> year = <span class="hljs-number">1958</span>;</code></pre>
<p>这样就可以对外输出三个变量。</p>
<h4>
<code>import</code>命令</h4>
<p>使用<code>export</code>对外暴露了接口后，其他js文件通过<code>import</code>命令加载这个模块文件。上面暴露的三个变量在另一个js文件中引入如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//import.js
import {firstName,lastName,year} from './export';
function setName(element){
    element.textContent = firstName + ' ' + lastName;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//import.js</span>
<span class="hljs-keyword">import</span> {firstName,lastName,year} <span class="hljs-keyword">from</span> <span class="hljs-string">'./export'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setName</span>(<span class="hljs-params">element</span>)</span>{
    element.textContent = firstName + <span class="hljs-string">' '</span> + lastName;
}</code></pre>
<h2 id="articleHeader3">webpack的hot-reload</h2>
<p>前端自动刷新现在已经很常见了，即改变页面后，浏览器自动刷新，但是这个功能在我们做单页面应用时候会很不好用，所以，webpack支持hot-reload(热替换)，当我们修改模块时候不会页面不会刷新，会直接在页面中生效。</p>
<h3 id="articleHeader4">hot-reload的基础---webpack-dev-server</h3>
<p>webpack-dev-server支持两种模式的自动刷新页面：</p>
<ul>
<li><p>iframe模式（页面嵌入一个iframe并在其中呈现页面的变化）</p></li>
<li><p>inline模式（一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面）</p></li>
</ul>
<h4>iframe模式</h4>
<p>使用iframe模式无需额外的配置，在终端输入命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php" style="word-break: break-word; white-space: initial;">$ webpack-dev-server</code></pre>
<p>在浏览器中输入 <a href="http://loacalhost:8080/webpack-dev-server/index.html" rel="nofollow noreferrer" target="_blank">http://loacalhost:8080/webpack-dev-server/index.html</a></p>
<h4>inline模式</h4>
<p>在dos下输入命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php" style="word-break: break-word; white-space: initial;">$ webpack-dev-server --inline --hot</code></pre>
<p>启动服务器，在浏览器中打开 <a href="http://loacalhost:8080" rel="nofollow noreferrer" target="_blank">http://loacalhost:8080</a> 就可以看到我们的页面，此时修改app.vue中的css，以及html中的文字，都可以看到在浏览器中立马呈现。<br>关于webpack-dev-server的详细说明，可以参考<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">官方文档</a>或者<a href="http://www.jianshu.com/p/941bfaf13be1" rel="nofollow noreferrer" target="_blank">博客WEBPACK DEV SERVER</a>。</p>
<h3 id="articleHeader5"><strong>这里有一个问题需要说明下</strong></h3>
<p>在很多文章中都说，修改app.vue文件中<code>script</code>标签中的msg文字，会在浏览器中立即呈现效果，但是事实上我在做demo的时候并没有出现这个效果，Google了很多，找到了答案，尤大说：“data是初始值，但热更新的时候会保留当前状态”，<a href="https://forum.vuejs.org/topic/915/vue-webpack%E7%83%AD%E4%BB%A3%E7%A0%81%E6%9B%BF%E6%8D%A2%E4%BF%AE%E6%94%B9script%E4%B8%AD%E7%9A%84%E5%86%85%E5%AE%B9%E9%A1%B5%E9%9D%A2%E4%B8%8D%E8%83%BD%E8%87%AA%E5%8A%A8%E6%9B%B4%E6%96%B0/5" rel="nofollow noreferrer" target="_blank">原问题及答案链接</a>。</p>
<p>至此，关于webpack+vue的基本结束，虽然简单，但是由于在这个过程中也遇到一些坑，所以总结下，关于对vue的研究，这才只是个开始...</p>
<h2 id="articleHeader6">附：</h2>
<p>我的webpack配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath:'dist/',
    filename: 'build.js'
  },
  //配置自动刷新,如果打开会使浏览器刷新而不是热替换
  /*devServer: {
    historyApiFallback: true,
    hot: false,
    inline: true,
    grogress: true
  },*/
  module: {
    loaders: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      //解析.vue文件
      {
        test:/\.vue$/,
        loader:'vue'
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader:'url-loader?limit=8192'
      }
    ]
  },
  vue:{
    loaders:{
      js:'babel'
    }
  },
  resolve: {
        // require时省略的扩展名，如：require('app') 不需要app.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist'</span>,
    <span class="hljs-attr">publicPath</span>:<span class="hljs-string">'dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-comment">//配置自动刷新,如果打开会使浏览器刷新而不是热替换</span>
  <span class="hljs-comment">/*devServer: {
    historyApiFallback: true,
    hot: false,
    inline: true,
    grogress: true
  },*/</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-comment">//转化ES6语法</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      <span class="hljs-comment">//解析.vue文件</span>
      {
        <span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>:<span class="hljs-string">'vue'</span>
      },
      <span class="hljs-comment">//图片转化，小于8K自动转化为base64的编码</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
        <span class="hljs-attr">loader</span>:<span class="hljs-string">'url-loader?limit=8192'</span>
      }
    ]
  },
  <span class="hljs-attr">vue</span>:{
    <span class="hljs-attr">loaders</span>:{
      <span class="hljs-attr">js</span>:<span class="hljs-string">'babel'</span>
    }
  },
  <span class="hljs-attr">resolve</span>: {
        <span class="hljs-comment">// require时省略的扩展名，如：require('app') 不需要app.js</span>
        extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>],
        <span class="hljs-comment">// 别名，可以直接使用别名来代表设定的路径以及其他</span>
        alias: {
            <span class="hljs-attr">filter</span>: path.join(__dirname, <span class="hljs-string">'./src/filters'</span>),
            <span class="hljs-attr">components</span>: path.join(__dirname, <span class="hljs-string">'./src/components'</span>)
        }
    }    
}</code></pre>
<p>package.json文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpackvue&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;vue.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.9.1&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.4&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;^6.5.0&quot;,
    &quot;babel-runtime&quot;: &quot;^6.9.2&quot;,
    &quot;css-loader&quot;: &quot;^0.23.1&quot;,
    &quot;file-loader&quot;: &quot;^0.8.5&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;url-loader&quot;: &quot;^0.5.7&quot;,
    &quot;vue&quot;:&quot;^1.0.24&quot;,
    &quot;vue-router&quot;:&quot;^0.7.13&quot;,
    &quot;vue-hot-reload-api&quot;: &quot;^1.3.2&quot;,
    &quot;vue-html-loader&quot;: &quot;^1.2.2&quot;,
    &quot;vue-loader&quot;: &quot;^8.5.2&quot;,
    &quot;vue-style-loader&quot;: &quot;^1.0.0&quot;,
    &quot;webpack&quot;: &quot;^1.13.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.14.1&quot;,
    &quot;webpack-merge&quot;: &quot;^0.13.0&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"webpackvue"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"vue.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.9.1"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.4"</span>,
    <span class="hljs-attr">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-stage-0"</span>: <span class="hljs-string">"^6.5.0"</span>,
    <span class="hljs-attr">"babel-runtime"</span>: <span class="hljs-string">"^6.9.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.23.1"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^0.8.5"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>,
    <span class="hljs-attr">"vue"</span>:<span class="hljs-string">"^1.0.24"</span>,
    <span class="hljs-attr">"vue-router"</span>:<span class="hljs-string">"^0.7.13"</span>,
    <span class="hljs-attr">"vue-hot-reload-api"</span>: <span class="hljs-string">"^1.3.2"</span>,
    <span class="hljs-attr">"vue-html-loader"</span>: <span class="hljs-string">"^1.2.2"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^8.5.2"</span>,
    <span class="hljs-attr">"vue-style-loader"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.1"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.14.1"</span>,
    <span class="hljs-attr">"webpack-merge"</span>: <span class="hljs-string">"^0.13.0"</span>
  }
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用webpack和vue实现组件化

## 原文链接
[https://segmentfault.com/a/1190000005616974](https://segmentfault.com/a/1190000005616974)

