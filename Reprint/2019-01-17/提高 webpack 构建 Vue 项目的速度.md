---
title: '提高 webpack 构建 Vue 项目的速度' 
date: 2019-01-17 2:30:25
hidden: true
slug: c3ej954y6u9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近有人给我的 <a href="https://github.com/lin-xin/vue-manage-system" rel="nofollow noreferrer" target="_blank">Vue2 后台管理系统解决方案</a> 提了 issue ，说执行 npm run build 构建项目的时候极其慢，然后就引起我的注意了。在项目中，引入了比较多的第三方库，导致项目大，而每次修改，都不会去修改到这些库，构建却都要再打包这些库，浪费了不少时间。所以，把这些不常变动的第三方库都提取出来，下次 build 的时候不再构建这些库，这样既可大大缩短构建时间。那么要怎么去实现呢？</p>
<h2 id="articleHeader1">解决方案</h2>
<h3 id="articleHeader2">DllPlugin 和 DllReferencePlugin</h3>
<p>查找了一下资料，发现我们可以利用 webpack 的插件 DllPlugin 和 DllReferencePlugin 来实现我们要的功能。</p>
<p>DllPlugin 可以把我们需要打包的第三方库打包成一个 js 文件和一个 json 文件，这个 json 文件中会映射每个打包的模块地址和 id，DllReferencePlugin 通过读取这个json文件来使用打包的这些模块。</p>
<p>接下来就看如何实现。</p>
<h3 id="articleHeader3">配置文件</h3>
<p>在 build 文件夹中新建 webpack.dll.config.js (项目基于 vue-cli 的)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['vue/dist/vue.common.js','vue-router', 'babel-polyfill','axios','vue-echarts-v3']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'vue/dist/vue.common.js'</span>,<span class="hljs-string">'vue-router'</span>, <span class="hljs-string">'babel-polyfill'</span>,<span class="hljs-string">'axios'</span>,<span class="hljs-string">'vue-echarts-v3'</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../static/js'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].dll.js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_library'</span>       <span class="hljs-comment">// vendor.dll.js中暴露出的全局变量名</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'.'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_library'</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    })
  ]
};</code></pre>
<p>然后在 package.json 中配置命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    ...
    &quot;build:dll&quot;: &quot;webpack --config build/webpack.dll.conf.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
    ...
    <span class="hljs-string">"build:dll"</span>: <span class="hljs-string">"webpack --config build/webpack.dll.conf.js"</span>
}</code></pre>
<p>执行 npm run build:dll 命令来生成 vendor.dll.js 和 vendor-manifest.json</p>
<p>需要在 index.html 引入 vendor.dll.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div id=&quot;app&quot;></div>
    <script src=&quot;./static/js/vendor.dll.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./static/js/vendor.dll.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>vendor-manifest.json 的内容大概如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vendor_library&quot;,
  &quot;content&quot;: {
    &quot;./node_modules/core-js/modules/_export.js&quot;: {
      &quot;id&quot;: 0,
      &quot;meta&quot;: {}
    },
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"vendor_library"</span>,
  <span class="hljs-string">"content"</span>: {
    <span class="hljs-string">"./node_modules/core-js/modules/_export.js"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">0</span>,
      <span class="hljs-string">"meta"</span>: {}
    },
    ...
}</code></pre>
<p>接下来就在 webpack.base.config.js 中通过 DLLReferencePlugin 来使用 DllPlugin 生成的 DLL Bundle</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    module: {
        ...
    }
    // 添加DllReferencePlugin插件
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./vendor-manifest.json')
        }),
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">app</span>: [<span class="hljs-string">'./src/main.js'</span>]
    },
    <span class="hljs-attr">module</span>: {
        ...
    }
    <span class="hljs-comment">// 添加DllReferencePlugin插件</span>
    plugins: [
        <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
            <span class="hljs-attr">context</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>),
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vendor-manifest.json'</span>)
        }),
    ]
}</code></pre>
<p>原先 build 需要 95446ms，配置之后执行 build 只需 14360ms，减少了 75% 的时间。</p>
<p>但是存在一个问题，当把太多的第三方依赖都打包到 vendor.dll.js 中去，该文件太大也会影响首屏加载时间。所以要权衡利弊，可以异步加载的插件就没有必要打包进来了，不要一味的把所有都打包到这里面来获取构建时的快感。</p>
<h3 id="articleHeader4">示例地址：<a href="https://github.com/lin-xin/vue-manage-system" rel="nofollow noreferrer" target="_blank">vue-manage-system</a>
</h3>
<h3 id="articleHeader5">个人博客：<a href="https://github.com/lin-xin/blog" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
提高 webpack 构建 Vue 项目的速度

## 原文链接
[https://segmentfault.com/a/1190000008944846](https://segmentfault.com/a/1190000008944846)

