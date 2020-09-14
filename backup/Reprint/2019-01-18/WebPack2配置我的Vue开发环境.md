---
title: 'WebPack2配置我的Vue开发环境' 
date: 2019-01-18 2:30:35
hidden: true
slug: 3o4ybmkw7s4
categories: [reprint]
---

{{< raw >}}

                    
<p>首先已经全局安装了node/vue/webpack;</p>
<h2 id="articleHeader0">新建文件夹demo4并初始化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd demo4
npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> demo4
npm init -<span class="hljs-built_in">y</span></code></pre>
<p>这是页面会生成一个package.json文件。</p>
<h2 id="articleHeader1">安装webpack及相关插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader vue-hot-reload-api babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-runtime@5 --save-dev
npm install html-webpack-plugin --save-dev
npm install vue --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> webpack webpack-dev-<span class="hljs-keyword">server</span> vue-loader vue-html-loader css-loader vue-<span class="hljs-keyword">style</span>-loader vue-hot-reload-api babel-loader babel-core babel-<span class="hljs-keyword">plugin</span>-transform-runtime babel-preset-es2015 babel-runtime@<span class="hljs-number">5</span> <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">install</span> vue <span class="hljs-comment">--save</span></code></pre>
<p><code>webpack-dev-server</code>: <a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a>是一款小型的Node.js Express服务器，我们使用它主要是为了实现代码的热重载，具体使用方法可参见<a href="https://segmentfault.com/a/1190000006670084">webpack-dev-server使用方法，看完还不会的来找我~</a><br><code>vue-loader/vue-html-loader/css-loader/vue-style-loader...</code>: webpack中loader的作用不多讲，用法看文档<br>vue-hot-reload-api: <a href="http://npm.taobao.org/package/vue-hot-reload-api" rel="nofollow noreferrer" target="_blank">vue-hot-reload-api</a>顾名思义，亦为实现vue热重载<br>此时<code>package.json</code>中的<code>devDependencies</code>和<code>dependencies</code>应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.23.1&quot;,
    &quot;babel-loader&quot;: &quot;^6.4.0&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.23.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.22.0&quot;,
    &quot;babel-runtime&quot;: &quot;^5.8.38&quot;,
    &quot;css-loader&quot;: &quot;^0.26.4&quot;,
    &quot;vue-hot-reload-api&quot;: &quot;^2.0.11&quot;,
    &quot;vue-html-loader&quot;: &quot;^1.2.4&quot;,
    &quot;vue-loader&quot;: &quot;^11.1.4&quot;,
    &quot;vue-style-loader&quot;: &quot;^2.0.3&quot;,
    &quot;webpack&quot;: &quot;^2.2.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.4.1&quot;
  },
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.2.2&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.23.1"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^6.4.0"</span>,
    <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.23.0"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.22.0"</span>,
    <span class="hljs-string">"babel-runtime"</span>: <span class="hljs-string">"^5.8.38"</span>,
    <span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.26.4"</span>,
    <span class="hljs-string">"vue-hot-reload-api"</span>: <span class="hljs-string">"^2.0.11"</span>,
    <span class="hljs-string">"vue-html-loader"</span>: <span class="hljs-string">"^1.2.4"</span>,
    <span class="hljs-string">"vue-loader"</span>: <span class="hljs-string">"^11.1.4"</span>,
    <span class="hljs-string">"vue-style-loader"</span>: <span class="hljs-string">"^2.0.3"</span>,
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^2.2.1"</span>,
    <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.4.1"</span>
  },
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.2.2"</span>
  }</code></pre>
<h2 id="articleHeader2">建立文件目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="demo4
    |__dist
    |   |__js
    |__src
    |   |__index.html
    |   |__js
    |   |    |__index.js
    |   |__components
    |      |__hello.vue
    |__node_modules
    |__package.json
    |__webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>demo4
    |<span class="hljs-string">__dist
    </span>|<span class="hljs-string">   </span>|__js
    |<span class="hljs-string">__src
    </span>|<span class="hljs-string">   </span>|<span class="hljs-string">__index.html
    </span>|<span class="hljs-string">   </span>|__js
    |<span class="hljs-string">   </span>|<span class="hljs-string">    </span>|<span class="hljs-string">__index.js
    </span>|<span class="hljs-string">   </span>|__components
    |<span class="hljs-string">      </span>|<span class="hljs-string">__hello.vue
    </span>|__node_modules
    |<span class="hljs-string">__package.json
    </span>|<span class="hljs-string">__webpack.config.js</span></code></pre>
<p>dist: 存放生成的文件<br>src: 存放编辑的文件模板等<br>components: 存放components组件</p>
<ul><li><p>src/index.html</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Vue</title>
</head>
<body>
<div id=&quot;test&quot;>
    <Hello></Hello>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Hello</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li><p>src/js/index.js</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Hello from &quot;../components/Hello.vue&quot;;

new Vue({
    el: &quot;#test&quot;,
    template: '<Hello/>',
    components: { Hello }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">"../components/Hello.vue"</span>;

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">"<span class="hljs-subst">#test</span>"</span>,
    template: <span class="hljs-string">'&lt;Hello/&gt;'</span>,
    components: { Hello }
})</code></pre>
<ul><li><p>src/components/Hello.vue</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>"{{"msg"}}"</div>
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

<style>
    html {
        background: green;
        color: #fff;
        font-size: 20px;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">background</span>: green;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<ul><li><p>webpack.config.js</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query:{
                  presets: 'es2015'  
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            hash: true
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> htmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
    entry: path.resolve(__dirname, <span class="hljs-string">'./src/js/index.js'</span>),
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
        filename: <span class="hljs-string">'./js/[name].js'</span>
    },
    <span class="hljs-keyword">module</span>: {
        loaders: [
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue-loader'</span>
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                loader: <span class="hljs-string">'babel-loader'</span>,
                query:{
                  presets: <span class="hljs-string">'es2015'</span>  
                },
                exclude: <span class="hljs-regexp">/node_modules/</span>
            }
        ]
    },
    plugins: [
        <span class="hljs-keyword">new</span> htmlWebpackPlugin({
            template: <span class="hljs-string">'./src/index.html'</span>,
            hash: <span class="hljs-literal">true</span>
        })
    ]
}</code></pre>
<p>命令行运行<code>webpack</code>命令， 此时在dist文件目录下分别生成了js/index.js和index.html，在页面中打开index.html发现页面有报错： <code>[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.</code>  这是因为此时使用的是vue.runtime.common.js，这里可以阅读以下官方文档中的<a href="http://cn.vuejs.org/v2/guide/installation.html#%E7%8B%AC%E7%AB%8B%E6%9E%84%E5%BB%BA-vs-%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9E%84%E5%BB%BA" rel="nofollow noreferrer" target="_blank">独立构建VS运行时构建</a>；<strong>简单理解就是独立构建可以自己将字符串模板（template）编译为渲染函数（render），然后再运行时再调用编译好的渲染函数，而运行时构建是在Vue2开始后，为了实现在服务端渲染，不依赖与浏览器端的DOM接口，而不允许使用template模板，因此运行时构建比独立构建要小，但是不能使用template模板，而官方文档中也有说明。npm包中导出的默认是运行时构建</strong>。如果希望使用独立构建，可以添加以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack中
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">webpack</span>中
<span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">alias</span>: {
    <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.common.js'</span>
  }
}</code></pre>
<p>这句话是添加到webpack.config.js中的，当然，我们也可以打开node_modules/vue/package.json文件，将其中的<code>main</code>指向"<code>dist/vue.runtime.common.js</code>"改为<code>'vue/dist/vue.common.js'</code>。</p>
<p>此时再重新运行webpack命令，可能还会报错： <code>Cannot find module 'vue-template-compiler'</code> ，此时在命令行中运行<code>npm install vue-template-compiler</code>即可。<br>在运行webpack命令，在浏览器中打开dist/index.html文件就可以看到代码完美运行了。我们只需要在src/下修改我们的Hello.vue或者是index.js以及index.html文件，然后运行webpack然后刷新页面即可看到代码的改动效果。<br>当然，我们期待的是只修改代码，不用重新运行webpack命令，甚至不需要刷新浏览器即看到代码的改动效果，这时候需要新的插件来配置实现vue的热重载。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebPack2配置我的Vue开发环境

## 原文链接
[https://segmentfault.com/a/1190000008678236](https://segmentfault.com/a/1190000008678236)

