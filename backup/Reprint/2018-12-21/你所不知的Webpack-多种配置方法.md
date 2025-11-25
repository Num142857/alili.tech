---
title: '你所不知的Webpack-多种配置方法' 
date: 2018-12-21 2:30:11
hidden: true
slug: 6ox5rl6htw6
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://webpack.wuhaolin.cn/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012444693?w=1348&amp;h=845" src="https://static.alili.tech/img/remote/1460000012444693?w=1348&amp;h=845" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p>除了通过最常见的导出一个 Object 来描述 Webpack 所需的配置外，还有其它更灵活的方式，以简化不同场景的配置。<br>下面来一一介绍它们。</p>
<h2 id="articleHeader0">导出一个 Function</h2>
<p>在大多数时候你需要从同一份源代码中构建出多份代码，例如一份用于开发时，一份用于发布到线上。</p>
<p>如果采用导出一个 Object 来描述 Webpack 所需的配置的方法，需要写量个文件。<br>一个用于开发环境，一个用于线上环境。再在启动时通过 <code>webpack --config webpack.config.js</code> 指定使用哪个配置文件。</p>
<p>采用导出一个 Function 的方式，能通过 JavaScript 灵活的控制配置，做到只用写一个配置文件就能完成以上要求。</p>
<p>导出一个 Function 的使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = function (env = {}, argv) {
  const plugins = [];

  const isProduction = env['production'];

  // 在生成环境才压缩
  if (isProduction) {
    plugins.push(
      // 压缩输出的 JS 代码
      new UglifyJsPlugin()
    )
  }

  return {
    plugins: plugins,
    // 在生成环境不输出 Source Map
    devtool: isProduction ? undefined : 'source-map',
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack/lib/optimize/UglifyJsPlugin'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">env = {}, argv</span>) </span>{
  <span class="hljs-keyword">const</span> plugins = [];

  <span class="hljs-keyword">const</span> isProduction = env[<span class="hljs-string">'production'</span>];

  <span class="hljs-comment">// 在生成环境才压缩</span>
  <span class="hljs-keyword">if</span> (isProduction) {
    plugins.push(
      <span class="hljs-comment">// 压缩输出的 JS 代码</span>
      <span class="hljs-keyword">new</span> UglifyJsPlugin()
    )
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">plugins</span>: plugins,
    <span class="hljs-comment">// 在生成环境不输出 Source Map</span>
    devtool: isProduction ? <span class="hljs-literal">undefined</span> : <span class="hljs-string">'source-map'</span>,
  };
}</code></pre>
<p>在运行 Webpack 时，会给这个函数传入2个参数，分别是：</p>
<ol>
<li>
<code>env</code>：当前运行时的 Webpack 专属环境变量，<code>env</code> 是一个 Object。读取时直接访问 Object 的属性，设置它需要在启动 Webpack 时带上参数。例如启动命令是 <code>webpack --env.production --env.bao=foo</code>时，则 <code>env</code> 的值是 <code>{"production":"true","bao":"foo"}</code>。</li>
<li>
<code>argv</code>：代表在启动 Webpack 时所有通过命令行传入的参数，例如 <code>--config</code>、<code>--env</code>、<code>--devtool</code>，可以通过 <code>webpack -h</code> 列出所有 Webpack 支持的命令行参数。</li>
</ol>
<p>就以上配置文件而言，在开发时执行命令 <code>webpack</code> 构建出方便调试的代码，在需要构建出发布到线上的代码时执行 <code>webpack --env.production</code> 构建出压缩的代码。</p>
<blockquote>本实例 <a href="http://webpack.wuhaolin.cn/2-9" rel="nofollow noreferrer" target="_blank">提供项目完整代码</a>
</blockquote>
<h2 id="articleHeader1">导出一个返回 Promise 的函数</h2>
<p>在有些情况下你不能以同步的方式返回一个描述配置的 Object，Webpack 还支持导出一个返回 Promise 的函数，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(env = {}, argv) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        // ...
      })
    }, 5000)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">env = {}, argv</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve({
        <span class="hljs-comment">// ...</span>
      })
    }, <span class="hljs-number">5000</span>)
  })
}</code></pre>
<h2 id="articleHeader2">导出多份配置</h2>
<p>除了只导出一份配置外，Webpack 还支持导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建。</p>
<blockquote>注意本特性从 Webpack 3.1.0 版本才开始支持。</blockquote>
<p>使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [
  // 采用 Object 描述的一份配置
  {
    // ...
  },
  // 采用函数描述的一份配置
  function() {
    return {
      // ...
    }
  },
  // 采用异步函数描述的一份配置
  function() {
    return Promise();
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = [
  <span class="hljs-comment">// 采用 Object 描述的一份配置</span>
  {
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// 采用函数描述的一份配置</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// ...</span>
    }
  },
  <span class="hljs-comment">// 采用异步函数描述的一份配置</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>();
  }
]</code></pre>
<p>以上配置会导致 Webpack 针对这三份配置执行三次不同的构建。</p>
<p>这特别适合于用 Webpack 构建一个要上传到 Npm 仓库的库，因为库中可能需要包含多种模块化格式的代码，例如 CommonJS、UMD。</p>
<p><a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-9%E5%A4%9A%E7%A7%8D%E9%85%8D%E7%BD%AE%E7%B1%BB%E5%9E%8B.html" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你所不知的Webpack-多种配置方法

## 原文链接
[https://segmentfault.com/a/1190000012501430](https://segmentfault.com/a/1190000012501430)

