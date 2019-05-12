---
title: '用webpack2.0构建vue2.0超详细精简版' 
date: 2019-01-08 2:30:10
hidden: true
slug: rgawcuf5ygf
categories: [reprint]
---

{{< raw >}}

                    
<p><code>npm init -y</code> 初始化项目</p>
<p><strong>安装各种依赖项</strong></p>
<p><code>npm install --save vue</code> 安装vue2.0</p>
<p><code>npm install --save-dev webpack@^2.1.0-beta.25 webpack-dev-server@^2.1.0-beta.9</code> 安装webpack以及webpack测试服务器，默认安装是1.0版本的，所以必须指定版本号</p>
<p><code>npm install --save-dev babel-core babel-loader babel-preset-es2015</code> 安装babel，一般的浏览器是不认识es6语法的，babel的作用是将es6的语法编译成浏览器认识的语法</p>
<p><code>npm install --save-dev vue-loader vue-template-compiler</code> 用来解析vue的组件，.vue后缀的文件</p>
<p><code>npm install --save-dev css-loader file-loader</code> 用来解析css</p>
<p><strong>编写页面</strong></p>
<p>新建目录src，里面新建App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 简单写个title和一个循环 -->
<template>
    <div id=&quot;example&quot;>
        <h1>"{{" msg "}}"</h1>
        <ul>
            <li v-for=&quot;n in 5&quot;>"{{" n "}}"</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello World!'
        }
    }
}
</script>

<style scoped>
#example {
    background: red;
    height: 100vh;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 简单写个title和一个循环 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"n in 5"</span>&gt;</span></span><span class="hljs-template-variable">"{{" n "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello World!'</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#example</span> {
    <span class="hljs-attribute">background</span>: red;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>在src目录下新建main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 引入vue和主页 */
import Vue from 'vue'
import App from './App.vue'

/* 实例化一个vue */
new Vue({
  el: '#app',
  render: h => h(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* 引入vue和主页 */</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

<span class="hljs-comment">/* 实例化一个vue */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})</code></pre>
<p><strong>配置webpack</strong></p>
<p>在根目录下新建webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 引入操作路径模块和webpack */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    /* 输入文件 */
    entry: './src/main.js',
    output: {
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/dist/',
        /* 文件名 */
        filename: 'build.js'
    },
    module: {
        rules: [
            /* 用来解析vue后缀的文件 */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            /* 用babel来解析js文件并把es6的语法转换成浏览器认识的语法 */
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/* 引入操作路径模块和webpack */</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">/* 输入文件 */</span>
    entry: <span class="hljs-string">'./src/main.js'</span>,
    output: {
        <span class="hljs-comment">/* 输出目录，没有则新建 */</span>
        path: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
        <span class="hljs-comment">/* 静态目录，可以直接从这里取文件 */</span>
        publicPath: <span class="hljs-string">'/dist/'</span>,
        <span class="hljs-comment">/* 文件名 */</span>
        filename: <span class="hljs-string">'build.js'</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [
            <span class="hljs-comment">/* 用来解析vue后缀的文件 */</span>
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue-loader'</span>
            },
            <span class="hljs-comment">/* 用babel来解析js文件并把es6的语法转换成浏览器认识的语法 */</span>
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                loader: <span class="hljs-string">'babel-loader'</span>,
                <span class="hljs-comment">/* 排除模块安装目录的文件 */</span>
                exclude: <span class="hljs-regexp">/node_modules/</span>
            }
        ]
    }
}</code></pre>
<p><strong>打包项目</strong></p>
<p><code>npm install -g webpack@^2.1.0-beta.25</code> 全局安装webpack，以便使用webpack命令</p>
<p><code>webpack</code> 用webpack命令打包项目，这是目录下会多出一个dist文件夹，查看里面会有build.js，发觉里面的es6语法已经被转化了</p>
<p>最终项目目录如图所示<br><span class="img-wrap"><img data-src="/img/bVIqvL?w=263&amp;h=150" src="https://static.alili.tech/img/bVIqvL?w=263&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在根目录下新建index.html，引入build.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0&quot;>
<title>vue-webpack</title>
</head>
<body>
    <section id=&quot;app&quot;></section>
    <script src=&quot;./dist/build.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-webpack<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>页面如图所示<br><span class="img-wrap"><img data-src="/img/bVIqwM?w=412&amp;h=156" src="https://static.alili.tech/img/bVIqwM?w=412&amp;h=156" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样就算打包完成了，但是每修改一次都要重新打包这样显然没有任何效率，于是需要线上的热重载</p>
<p><code>npm install -g webpack-dev-server@^2.1.0-beta.9</code> 全局安装webpack-dev-server，以便使用webpack-dev-server命令</p>
<p><code>webpack-dev-server</code> 等待程序运行完毕</p>
<p>在浏览器输入<a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a>查看页面</p>
<p>这时修改页面的代码，不用刷新浏览器直接更改<br><span class="img-wrap"><img data-src="/img/bVIqw2?w=412&amp;h=156" src="https://static.alili.tech/img/bVIqw2?w=412&amp;h=156" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用webpack2.0构建vue2.0超详细精简版

## 原文链接
[https://segmentfault.com/a/1190000008166081](https://segmentfault.com/a/1190000008166081)

