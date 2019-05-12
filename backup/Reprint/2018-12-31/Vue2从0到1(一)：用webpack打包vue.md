---
title: 'Vue2从0到1(一)：用webpack打包vue' 
date: 2018-12-31 2:30:29
hidden: true
slug: wd89fvrk9o
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">webpack-vue</h3>
<h4>0.项目初始化</h4>
<blockquote><p>cd 'to/your/path' npm init</p></blockquote>
<h4>1.安装 webpack</h4>
<p>分为全局安装和项目内安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install webpack -g
    npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>    npm <span class="hljs-keyword">install</span> webpack -g
    npm <span class="hljs-keyword">install</span> webpack <span class="hljs-comment">--save-dev</span></code></pre>
<h4>2.配置webpack.config.js文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     const path = require('path');

     module.exports = {
         entry: './Script/main.js', //项目入口文件
         output:{                    //输出编译后文件地址及文件名
             path: path.resolve(__dirname, 'dist'),
             filename: 'js/bundle.js'
         }
     };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>     <span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);

     <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
         entry: <span class="hljs-string">'./Script/main.js'</span>, <span class="hljs-comment">//项目入口文件</span>
         output:{                    <span class="hljs-comment">//输出编译后文件地址及文件名</span>
             path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
             filename: <span class="hljs-string">'js/bundle.js'</span>
         }
     };</code></pre>
<p>命令行里面执行 webpack 命令即可看到编译后的文件</p>
<h4>3安装webpack-html-plugin</h4>
<p>npm install html-webpack-plugin --save-dev</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ...
    plugins:[
        ...
        new HtmlWebpackPlugin({
            title:'react 学习',
            inject:'body',
            filename:'index.html',
            template:path.resolve(__dirname, &quot;index.html&quot;)
        }),
        ...
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>    const HtmlWebpackPlugin = <span class="hljs-keyword">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
    <span class="hljs-params">...</span>
    plugins:<span class="hljs-meta">[</span>
        <span class="hljs-params">...</span>
        <span class="hljs-literal">new</span> HtmlWebpackPlugin({
            title:<span class="hljs-string">'react 学习'</span>,
            inject:<span class="hljs-string">'body'</span>,
            filename:<span class="hljs-string">'index.html'</span>,
            template:path.resolve(__dirname, <span class="hljs-string">"index.html"</span>)
        }),
        <span class="hljs-params">...</span>
    <span class="hljs-meta">]</span></code></pre>
<p>再次执行webpack命令可看到多了一个index.html文件<br>这个文件是根据模板生成的并自动引入打包生成的js文件<br>运行打包后的index.html即可看到效果。</p>
<h4>4.安装Vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   npm install vue -save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">   npm <span class="hljs-keyword">install</span> vue -<span class="hljs-keyword">save</span></code></pre>
<p>修改main.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Vue from  'vue';

    var MainCtrl = new Vue({
        el:'#main',
        data:{
            message:'Hello world'
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span>  <span class="hljs-string">'vue'</span>;

    <span class="hljs-keyword">var</span> MainCtrl = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>:<span class="hljs-string">'#main'</span>,
        <span class="hljs-attr">data</span>:{
            <span class="hljs-attr">message</span>:<span class="hljs-string">'Hello world'</span>
        }
    })</code></pre>
<p>修改index.html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <div id=&quot;main&quot;>
      <h3>"{{"message"}}"</h3>
   </div>   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   </span></code></pre>
<p>执行webpack打包运行index.html(打包的文件)报错，经查在webpack.config.js里面配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    resolve: { alias: { 'vue': 'vue/dist/vue.js' } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    ...
    <span class="hljs-selector-tag">resolve</span>: { <span class="hljs-attribute">alias</span>: { <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.js'</span> } }</code></pre>
<p>再次运行即可看到效果<br><span class="img-wrap"><img data-src="/img/bVVuOQ?w=1347&amp;h=422" src="https://static.alili.tech/img/bVVuOQ?w=1347&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>5.安装webpack-dev-server热更新</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install webpack-dev-server -g
    npm install webpack-dev-server --save-dev
    npm install vue-hot-reload-api --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>    npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -g
    npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> <span class="hljs-comment">--save-dev</span>
    npm <span class="hljs-keyword">install</span> vue-hot-reload-api <span class="hljs-comment">--save-dev</span></code></pre>
<p>配置webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    devServer: {
        historyApiFallback: true,
    },
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    ...
    <span class="hljs-selector-tag">devServer</span>: {
        <span class="hljs-attribute">historyApiFallback</span>: true,
    },
    ...</code></pre>
<p>配置package.json里面命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;start&quot;:&quot;webpack-dev-server --hot --inline --progress --open&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-comment">"start":"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">open"</span></code></pre>
<p>执行 npm start 浏览器自动打开页面，更改文件后即可看到页面实时更新</p>
<h4>6.安装babel</h4>
<p>在使用.vue文件之前先要安装babel(将es6语法转化为es5)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install babel-core babel-loader babel-plugin-transform-runtime --save-dev 
    npm install babel-preset-stage-0 babel-runtime babel-preset-es2015 --save-dev " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>    npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-plugin-transform-runtime </span>--save-dev 
    npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-preset-stage-0 </span><span class="hljs-keyword">babel-runtime </span><span class="hljs-keyword">babel-preset-es2015 </span>--save-dev </code></pre>
<p>项目根目录新建.babelrc文件、配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
    &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-0&quot;],
    &quot;plugins&quot;: [&quot;transform-runtime&quot;]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>    {
    <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-0"</span>],
    <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
    }</code></pre>
<h4>7.安装vue-loader处理.vue的文件</h4>
<p>安装loader 处理.css,.vue文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install css-loader style-loader vue-loader vue-html-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> css-loader <span class="hljs-keyword">style</span>-loader vue-loader vue-html-loader <span class="hljs-comment">--save-dev</span></code></pre>
<p>配置webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   ...
   module:{
       loaders: [
           {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
           {test: /\.vue$/,loader: 'vue-loader'}]
        },
    //vue: {loaders: {js: 'babel'"}}"
   ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>   ...
<span class="hljs-symbol">   module:</span>{
<span class="hljs-symbol">       loaders:</span> [
           {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>,<span class="hljs-string">loader:</span> <span class="hljs-string">'babel-loader'</span>,<span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>},
           {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.vue$/</span>,<span class="hljs-string">loader:</span> <span class="hljs-string">'vue-loader'</span>}]
        },
    <span class="hljs-comment">//vue: {loaders: {js: 'babel'"}}"</span>
   ...</code></pre>
<p>配置完运行报错：Cannot find module 'vue-template-compiler'<br>安装vue-template-compiler</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vue-template-compiler --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">template</span>-compiler <span class="hljs-comment">--save-dev</span></code></pre>
<p>修改index.html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <body>
   <div id=&quot;main&quot;>
      <app></app>   
   </div>
  </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span>   
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>新建src/index.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <div class=&quot;message&quot;>"{{" msg "}}"</div>
  </template>

    <script>
        export default {
        data () {
            return {
            msg: 'Hello from vue-loader!'
            }
        }
        }
    </script>

    <style>
        .message {
        color: blue;
        }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"message"</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello from vue-loader!'</span>
            }
        }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.message</span> {
        <span class="hljs-attribute">color</span>: blue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>修改main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    import App from './src/index.vue';

    new Vue({
        el: '#main',
        components: { App }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    ...
    <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/index.vue'</span>;

    new Vue({
        el: <span class="hljs-string">'#main'</span>,
        components: { App }
    })</code></pre>
<p>保存后运行 npm start 即可看到效果<br><span class="img-wrap"><img data-src="/img/bVVuPG?w=618&amp;h=246" src="https://static.alili.tech/img/bVVuPG?w=618&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>修改代码，即可看到更新后的效果</p>
<h4>后面将持续更新vue-router，vuex的内容。代码托管在<a href="https://github.com/liubin915249126/vue2-study" rel="nofollow noreferrer" target="_blank">github</a>上 欢迎star</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2从0到1(一)：用webpack打包vue

## 原文链接
[https://segmentfault.com/a/1190000011280912](https://segmentfault.com/a/1190000011280912)

