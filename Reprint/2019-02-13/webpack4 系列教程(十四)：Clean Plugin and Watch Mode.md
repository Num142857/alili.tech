---
title: 'webpack4 系列教程(十四)：Clean Plugin and Watch Mode' 
date: 2019-02-13 2:31:23
hidden: true
slug: 3mleuktjl8e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>作者按：因为教程所示图片使用的是 github 仓库图片，网速过慢的朋友请移步<a href="https://godbmw.com/passage/73" rel="nofollow noreferrer" target="_blank">《webpack4 系列教程(十四)：Clean Plugin and Watch Mode》原文地址</a>。更欢迎来我的小站看更多原创内容：<a href="https://godbmw.com/" rel="nofollow noreferrer" target="_blank">godbmw.com</a>，进行“姿势”交流 ♪(^∇^*)</blockquote>
<h2 id="articleHeader0">0. 课程介绍和资料</h2>
<ul>
<li><a href="https://github.com/dongyuanxin/webpack-demos/tree/master/demo14" rel="nofollow noreferrer" target="_blank">&gt;&gt;&gt;本节课源码</a></li>
<li><a href="https://github.com/dongyuanxin/webpack-demos" rel="nofollow noreferrer" target="_blank">&gt;&gt;&gt;所有课程源码</a></li>
</ul>
<p>本节课的代码目录如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754443" src="https://static.alili.tech/img/remote/1460000016754443" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>本节课用的 plugin 和 loader 的配置文件<code>package.json</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;devDependencies&quot;: {
    &quot;clean-webpack-plugin&quot;: &quot;^0.1.19&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,
    &quot;webpack&quot;: &quot;^4.16.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"clean-webpack-plugin"</span>: <span class="hljs-string">"^0.1.19"</span>,
    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^3.2.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^4.16.1"</span>
  }
}</code></pre>
<h2 id="articleHeader1">1. 什么是<code>Clean Plugin</code>和<code>Watch Mode</code>？</h2>
<p>在实际开发中，由于需求变化，会经常改动代码，然后用 webpack 进行打包发布。由于改动过多，我们<code>/dist/</code>目录中会有很多版本的代码堆积在一起，乱七八糟。</p>
<p>为了让打包目录更简洁，<strong>这时候需要<code>Clean Plugin</code>，在每次打包前，自动清理<code>/dist/</code>目录下的文件。</strong></p>
<p>除此之外，借助 webpack 命令本身的命令参数，<strong>可以开启<code>Watch Mode</code>：监察你的所有文件,任一文件有所变动,它就会立刻重新自动打包。</strong></p>
<h2 id="articleHeader2">2. 编写入口文件和 js 脚本</h2>
<p>入口文件<code>app.js</code>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;This is entry js&quot;);

// ES6
import sum from &quot;./vendor/sum&quot;;
console.log(&quot;sum(1, 2) = &quot;, sum(1, 2));

// CommonJs
var minus = require(&quot;./vendor/minus&quot;);
console.log(&quot;minus(1, 2) = &quot;, minus(1, 2));

// AMD
require([&quot;./vendor/multi&quot;], function(multi) {
  console.log(&quot;multi(1, 2) = &quot;, multi(1, 2));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"This is entry js"</span>);

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">import</span> sum <span class="hljs-keyword">from</span> <span class="hljs-string">"./vendor/sum"</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"sum(1, 2) = "</span>, sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));

<span class="hljs-comment">// CommonJs</span>
<span class="hljs-keyword">var</span> minus = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./vendor/minus"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"minus(1, 2) = "</span>, minus(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));

<span class="hljs-comment">// AMD</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">"./vendor/multi"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">multi</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"multi(1, 2) = "</span>, multi(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>));
});</code></pre>
<p><code>vendor/sum.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function(a, b) {
  return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<p><code>vendor/multi.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require, factory) {
  &quot;use strict&quot;;
  return function(a, b) {
    return a * b;
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, factory</span>) </span>{
<span class="hljs-meta">  "use strict"</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a * b;
  };
});</code></pre>
<p><code>vendor/minus.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(a, b) {
  return a - b;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a - b;
};</code></pre>
<h2 id="articleHeader3">3. 编写 webpack 配置文件</h2>
<p><code>CleanWebpackPlugin</code>参数传入数组，其中每个元素是每次需要清空的文件目录。</p>
<p>需要注意的是：<strong>应该把<code>CleanWebpackPlugin</code>放在<code>plugin</code>配置项的最后一个</strong>，因为 webpack 配置是倒序的（最后配置的最先执行）。以保证每次正式打包前，先清空原来遗留的打包文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&quot;webpack&quot;);
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);
const CleanWebpackPlugin = require(&quot;clean-webpack-plugin&quot;);

const path = require(&quot;path&quot;);

module.exports = {
  entry: {
    app: &quot;./app.js&quot;
  },
  output: {
    publicPath: __dirname + &quot;/dist/&quot;, // js引用路径或者CDN地址
    path: path.resolve(__dirname, &quot;dist&quot;), // 打包文件的输出目录
    filename: &quot;[name]-[hash:5].bundle.js&quot;,
    chunkFilename: &quot;[name]-[hash:5].chunk.js&quot;
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: &quot;index.html&quot;,
      template: &quot;./index.html&quot;,
      chunks: [&quot;app&quot;]
    }),
    new CleanWebpackPlugin([&quot;dist&quot;])
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"clean-webpack-plugin"</span>);

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">"./app.js"</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">publicPath</span>: __dirname + <span class="hljs-string">"/dist/"</span>, <span class="hljs-comment">// js引用路径或者CDN地址</span>
    path: path.resolve(__dirname, <span class="hljs-string">"dist"</span>), <span class="hljs-comment">// 打包文件的输出目录</span>
    filename: <span class="hljs-string">"[name]-[hash:5].bundle.js"</span>,
    <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"[name]-[hash:5].chunk.js"</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">"./index.html"</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">"app"</span>]
    }),
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">"dist"</span>])
  ]
};</code></pre>
<p>执行<code>webpack</code>打包，在控制台会首先输出一段关于相关文件夹已经清空的的提示，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754444" src="https://static.alili.tech/img/remote/1460000016754444" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">4. 开启<code>Watch Mode</code>
</h2>
<p>直接在<code>webpack</code>命令后加上<code>--watch</code>参数即可：<code>webpack --watch</code>。</p>
<p>控制台会提示用户“开启 watch”。我改动了一次文件，改动被 webpack 侦听到，就会自动重新打包。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754445" src="https://static.alili.tech/img/remote/1460000016754445" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果想看到详细的打包过程，可以使用：<code>webpack -w --progress --display-reasons --color</code>。控制台就会以花花绿绿的形式展示出打包过程，看起来比较酷炫：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016754446" src="https://static.alili.tech/img/remote/1460000016754446" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 系列教程(十四)：Clean Plugin and Watch Mode

## 原文链接
[https://segmentfault.com/a/1190000016754440](https://segmentfault.com/a/1190000016754440)

