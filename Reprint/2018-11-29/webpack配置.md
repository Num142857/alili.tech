---
title: 'webpack配置' 
date: 2018-11-29 9:34:56
hidden: true
slug: 37kkml4eopd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack配置</h1>
<blockquote>查看所有文档页面：<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/" rel="nofollow noreferrer" target="_blank">全栈开发</a>，获取更多信息。<p>原文链接：<a href="http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/" rel="nofollow noreferrer" target="_blank">第2章 配置</a>，原文广告模态框遮挡，阅读体验不好，所以整理成本文，方便查找。</p>
</blockquote>
<p>配置 Webpack 的方式有两种：</p>
<ol>
<li>通过一个 JavaScript 文件描述配置，例如使用 <code>webpack.config.js</code> 文件里的配置；</li>
<li>执行 Webpack 可执行文件时通过命令行参数传入，例如 <code>webpack --devtool source-map</code>。</li>
</ol>
<p>这两种方式可以相互搭配，例如执行 Webpack 时通过命令 <code>webpack --config webpack-dev.config.js</code> 指定配置文件，再去 <code>webpack-dev.config.js</code> 文件里描述部分配置。</p>
<p>按照配置<strong>所影响的功能</strong>来划分，可分为：</p>
<ul>
<li>
<strong>Entry</strong> 配置模块的入口；</li>
<li>
<strong>Output</strong> 配置如何输出最终想要的代码；</li>
<li>
<strong>Module</strong> 配置处理模块的规则；</li>
<li>
<strong>Resolve</strong> 配置寻找模块的规则；</li>
<li>
<strong>Plugins</strong> 配置扩展插件；</li>
<li>
<strong>DevServer</strong> 配置 DevServer；</li>
<li>
<strong>其它配置项</strong> 其它零散的配置项；</li>
<li>
<strong>整体配置结构</strong> 整体地描述各配置项的结构；</li>
<li>
<strong>多种配置类型</strong> 配置文件不止可以返回一个 Object，还有其他返回形式；</li>
<li>
<strong>配置总结</strong> 寻找配置 Webpack 的规律，减少思维负担。</li>
</ul>
<h2 id="articleHeader1">Entry</h2>
<p>Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。</p>
<p>如果想改变 context 的默认配置，可以在配置文件里设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  context: path.resolve(__dirname, 'app')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  context: path.resolve(__dirname, <span class="hljs-string">'app'</span>)
}
</code></pre>
<p>注意， context 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 <code>webpack --context</code> 来设置 context。</p>
<h3 id="articleHeader2">Chunk 名称</h3>
<p>Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：</p>
<ul>
<li>如果 entry 是一个 <code>string</code> 或 <code>array</code>，就只会生成一个 Chunk，这时 Chunk 的名称是 <code>main</code>；</li>
<li>如果 entry 是一个 <code>object</code>，就可能会出现多个 Chunk，这时 Chunk 的名称是 <code>object</code> 键值对里键的名称。</li>
</ul>
<h3 id="articleHeader3">配置动态 Entry</h3>
<p>假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 同步函数
entry: () => {
  return {
    a:'./pages/a',
    b:'./pages/b',
  }
};
// 异步函数
entry: () => {
  return new Promise((resolve)=>{
    resolve({
       a:'./pages/a',
       b:'./pages/b',
    });
  });
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> 同步函数
entry: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    a:<span class="hljs-string">'./pages/a'</span>,
    b:<span class="hljs-string">'./pages/b'</span>,
  }
};
<span class="hljs-regexp">//</span> 异步函数
entry: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span>=&gt;</span>{
    resolve({
       a:<span class="hljs-string">'./pages/a'</span>,
       b:<span class="hljs-string">'./pages/b'</span>,
    });
  });
};
</code></pre>
<h2 id="articleHeader4">Output</h2>
<p><code>output</code> 配置如何输出最终想要的代码。<code>output</code> 是一个 <code>object</code>，里面包含一系列配置项：</p>
<h3 id="articleHeader5">filename</h3>
<p><code>output.filename</code> 配置输出文件的名称，为 string 类型。 如果只有一个输出文件，则可以把它写成静态不变的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filename: 'bundle.js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">filename:</span> <span class="hljs-string">'bundle.js'</span>
</code></pre>
<p>但是在有多个 Chunk 要输出时，就需要借助模版和变量了。前面说到 Webpack 会为每个 Chunk取一个名称，可以根据 Chunk 的名称来区分输出的文件名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filename: '[name].js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">filename:</span> <span class="hljs-string">'[name].js'</span>
</code></pre>
<p>代码里的 <code>[name]</code> 代表用内置的 <code>name</code> 变量去替换<code>[name]</code>，这时你可以把它看作一个字符串模块函数， 每个要输出的 Chunk 都会通过这个函数去拼接出输出的文件名称。</p>
<table>
<thead><tr>
<th>变量名</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td>id</td>
<td align="left">Chunk 的唯一标识，从0开始</td>
</tr>
<tr>
<td>name</td>
<td align="left">Chunk 的名称</td>
</tr>
<tr>
<td>hash</td>
<td align="left">Chunk 的唯一标识的 Hash 值</td>
</tr>
<tr>
<td>chunkhash</td>
<td align="left">Chunk 内容的 Hash 值</td>
</tr>
</tbody>
</table>
<p>其中 <code>hash</code> 和 <code>chunkhash</code> 的长度是可指定的，<code>[hash:8]</code> 代表取8位 Hash 值，默认是20位。</p>
<blockquote>注意 ExtractTextWebpackPlugin 插件是使用 <code>contenthash</code> 来代表哈希值而不是 <code>chunkhash</code>， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。</blockquote>
<h3 id="articleHeader6">chunkFilename</h3>
<p><code>output.chunkFilename</code> 配置无入口的 Chunk 在输出时的文件名称。 <code>chunkFilename</code> 和上面的 <code>filename</code> 非常类似，但 chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。 常见的会在运行时生成 Chunk 场景有在使用 <code>CommonChunkPlugin</code>、使用 <code>import('path/to/module')</code> 动态加载等时。 chunkFilename 支持和 filename 一致的内置变量。</p>
<p><strong>path</strong></p>
<p><code>output.path</code> 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 <code>path</code> 模块去获取绝对路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path: path.resolve(__dirname, 'dist_[hash]')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-built_in">path</span>: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'dist_[hash]'</span>)
</code></pre>
<h3 id="articleHeader7">publicPath</h3>
<p>在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。</p>
<p><code>output.publicPath</code> 配置发布到线上资源的 URL 前缀，为string 类型。 默认值是空字符串 <code>''</code>，即使用相对路径。</p>
<p>把构建出的资源文件上传到 CDN 服务上，以利于加快页面的打开速度。配置代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filename:'[name]_[chunkhash:8].js'
publicPath: 'https://cdn.example.com/assets/'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">filename:</span><span class="hljs-string">'[name]_[chunkhash:8].js'</span>
<span class="hljs-string">publicPath:</span> <span class="hljs-string">'https://cdn.example.com/assets/'</span>
</code></pre>
<p>这时发布到线上的 HTML 在引入 JavaScript 文件时就需要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src='https://cdn.example.com/assets/a_12345678.js'></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'https://cdn.example.com/assets/a_12345678.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>使用该配置项时要小心，稍有不慎将导致资源加载404错误。</p>
<p><code>output.path</code> 和 <code>output.publicPath</code> 都支持字符串模版，内置变量只有一个：<code>hash</code> 代表一次编译操作的 Hash 值。</p>
<h3 id="articleHeader8">crossOriginLoading</h3>
<p>Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 <code>JSONP</code> 方式实现的。 <code>JSONP</code> 的原理是动态地向 HTML 中插入一个 <code>&lt;script src="url"&gt;&lt;/script&gt;</code> 标签去加载异步资源。</p>
<p><code>output.crossOriginLoading</code> 则是用于配置这个异步插入的标签的 <code>crossorigin</code> 值。</p>
<p>script 标签的 <code>crossorigin</code> 属性可以取以下值：</p>
<ul>
<li>
<code>false</code>(默认) 在加载此脚本资源时不会带上用户的 Cookies；</li>
<li>
<code>use-credentials</code> 在加载此脚本资源时会带上用户的 Cookies。</li>
</ul>
<p>通常用设置 <code>crossorigin</code> 来获取异步加载的脚本执行时的详细错误信息。</p>
<h3 id="articleHeader9">libraryTarget 和 library</h3>
<p>当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。</p>
<ul>
<li>
<code>output.libraryTarget</code> 配置以何种方式导出库。</li>
<li>
<code>output.library</code> 配置导出库的名称。</li>
</ul>
<p>假如配置了 <code>output.library='LibraryName'</code>，则输出和使用的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack 输出的代码
var LibraryName = lib_code;

// 使用库的方法
LibraryName.doSomething();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Webpack 输出的代码</span>
<span class="hljs-keyword">var</span> LibraryName = lib_code;

<span class="hljs-comment">// 使用库的方法</span>
LibraryName.doSomething();
</code></pre>
<p>假如 <code>output.library</code> 为空，则将直接输出：<code>lib_code</code></p>
<blockquote>其中 <code>lib_code</code> 代指导出库的代码内容，是有返回值的一个自执行函数。</blockquote>
<p>它们通常搭配在一起使用。</p>
<p><code>output.libraryTarget</code> 是字符串的枚举类型，支持以下配置。</p>
<h3 id="articleHeader10">var (默认)</h3>
<p>编写的库将通过 <code>var</code> 被赋值给通过 <code>library</code> 指定名称的变量。</p>
<h3 id="articleHeader11">commonjs</h3>
<p>编写的库将通过 CommonJS2 规范导出，输出和使用的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack 输出的代码
module.exports = lib_code;

// 使用库的方法
require('library-name-in-npm').doSomething();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// Webpack 输出的代码</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = lib_code;

<span class="hljs-comment">// 使用库的方法</span>
require(<span class="hljs-string">'library-name-in-npm'</span>).doSomething();
</code></pre>
<blockquote>CommonJS2 和 CommonJS 规范很相似，差别在于 CommonJS 只能用 <code>exports</code> 导出，而 CommonJS2 在 CommonJS 的基础上增加了 <code>module.exports</code> 的导出方式。</blockquote>
<p>在 <code>output.libraryTarget</code> 为 commonjs2 时，配置 <code>output.library</code> 将没有意义。</p>
<h3 id="articleHeader12">this</h3>
<p>编写的库将通过 <code>this</code> 被赋值给通过 <code>library</code> 指定的名称，输出和使用的代码如下：</p>
<p>// Webpack 输出的代码<br>this['LibraryName'] = lib_code;</p>
<p>// 使用库的方法<br>this.LibraryName.doSomething();</p>
<h3 id="articleHeader13">window</h3>
<p>编写的库将通过 <code>window</code> 被赋值给通过 <code>library</code> 指定的名称，即把库挂载到 <code>window</code> 上，输出和使用的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack 输出的代码
window['LibraryName'] = lib_code;

// 使用库的方法
window.LibraryName.doSomething();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// Webpack 输出的代码</span>
<span class="hljs-built_in">window</span>[<span class="hljs-string">'LibraryName'</span>] = lib_code;

<span class="hljs-comment">// 使用库的方法</span>
<span class="hljs-built_in">window</span>.LibraryName.doSomething();
</code></pre>
<h3 id="articleHeader14">global</h3>
<p>编写的库将通过 <code>global</code> 被赋值给通过 <code>library</code> 指定的名称，即把库挂载到 <code>global</code> 上，输出和使用的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Webpack 输出的代码
global['LibraryName'] = lib_code;

// 使用库的方法
global.LibraryName.doSomething();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>
<span class="hljs-comment">// Webpack 输出的代码</span>
<span class="hljs-keyword">global</span>[<span class="hljs-string">'LibraryName'</span>] = lib_code;

<span class="hljs-comment">// 使用库的方法</span>
<span class="hljs-keyword">global</span>.LibraryName.doSomething();
</code></pre>
<h3 id="articleHeader15">libraryExport</h3>
<p><code>output.libraryExport</code> 配置要导出的模块中哪些子模块需要被导出。 它只有在 <code>output.libraryTarget</code> 被设置成 <code>commonjs</code> 或者 <code>commonjs2</code> 时使用才有意义。</p>
<p>假如要导出的模块源代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const a=1;
export default b=2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> a=<span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> b=<span class="hljs-number">2</span>;
</code></pre>
<p>现在想让构建输出的代码只导出其中的 <code>a</code>，可以把 <code>output.libraryExport</code> 设置成 <code>a</code>，那么构建输出的代码和使用方法将变成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack 输出的代码
module.exports = lib_code['a'];

// 使用库的方法
require('library-name-in-npm')===1;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// Webpack 输出的代码</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = lib_code[<span class="hljs-string">'a'</span>];

<span class="hljs-comment">// 使用库的方法</span>
require(<span class="hljs-string">'library-name-in-npm'</span>)===<span class="hljs-number">1</span>;
</code></pre>
<h2 id="articleHeader16">Module</h2>
<h3 id="articleHeader17">配置 Loader</h3>
<p><code>rules</code> 配置模块的读取和解析规则，通常用来配置 <code>Loader</code>。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 <code>rules</code> 时大致通过以下方式：</p>
<ol>
<li>
<strong>条件匹配</strong>：通过 <code>test</code> 、 <code>include</code> 、 <code>exclude</code> 三个配置项来命中 Loader 要应用规则的文件。</li>
<li>
<strong>应用规则</strong>：对选中后的文件通过 <code>use</code> 配置项来应用 Loader，可以只应用一个 Loader 或者按照<strong>从后往前</strong>的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。</li>
<li>
<strong>重置顺序</strong>：一组 Loader 的执行顺序<strong>默认是从右到左执行</strong>，通过 <code>enforce</code> 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ['babel-loader?cacheDirectory'],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, 'src')
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ['file-loader'],
    },
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>module: {
  rules: [
    {
      <span class="hljs-comment">// 命中 JavaScript 文件</span>
      test: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-comment">// 用 babel-loader 转换 JavaScript 文件</span>
      <span class="hljs-comment">// ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度</span>
      use: [<span class="hljs-string">'babel-loader?cacheDirectory'</span>],
      <span class="hljs-comment">// 只命中src目录里的js文件，加快 Webpack 搜索速度</span>
      <span class="hljs-keyword">include</span>: path.resolve(__dirname, <span class="hljs-string">'src'</span>)
    },
    {
      <span class="hljs-comment">// 命中 SCSS 文件</span>
      test: <span class="hljs-regexp">/\.scss$/</span>,
      <span class="hljs-comment">// 使用一组 Loader 去处理 SCSS 文件。</span>
      <span class="hljs-comment">// 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。</span>
      use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>],
      <span class="hljs-comment">// 排除 node_modules 目录下的文件</span>
      <span class="hljs-keyword">exclude</span>: path.resolve(__dirname, <span class="hljs-string">'node_modules'</span>),
    },
    {
      <span class="hljs-comment">// 对非文本文件采用 file-loader 加载</span>
      test: <span class="hljs-regexp">/\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/</span>,
      use: [<span class="hljs-string">'file-loader'</span>],
    },
  ]
}</code></pre>
<p>在 Loader 需要传入很多参数时，你还可以通过一个 <code>Object</code> 来描述，例如在上面的 <code>babel-loader</code> 配置中有如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use: [
  {
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce:'post'
  },
  // 省略其它 Loader
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">use</span>: [
  {
    <span class="hljs-attribute">loader</span>:<span class="hljs-string">'babel-loader'</span>,
    <span class="hljs-attribute">options</span>:{
      <span class="hljs-attribute">cacheDirectory</span>:true,
    },
    <span class="hljs-comment">// enforce:'post' 的含义是把该 Loader 的执行顺序放到最后</span>
    <span class="hljs-comment">// enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面</span>
    <span class="hljs-attribute">enforce</span>:<span class="hljs-string">'post'</span>
  },
  <span class="hljs-comment">// 省略其它 Loader</span>
]
</code></pre>
<p>上面的例子中 <code>test include exclude</code> 这三个命中文件的配置项只传入了一个字符串或正则，其实它们还都支持数组类型，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test:[
    /\.jsx?$/,
    /\.tsx?$/
  ],
  include:[
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'tests'),
  ],
  exclude:[
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'bower_modules'),
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>:[
    /\.jsx?$/,
    /\.tsx?$/
  ],
  include:[
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'src'</span>),
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'tests'</span>),
  ],
  exclude:[
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'node_modules'</span>),
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'bower_modules'</span>),
  ]
}
</code></pre>
<p>数组里的每项之间是<strong>或</strong>的关系，即文件路径符合数组中的任何一个条件就会被命中。</p>
<h3 id="articleHeader18">noParse</h3>
<p><code>noParse</code> 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。</p>
<p><code>noParse</code> 是可选配置项，类型需要是 <code>RegExp</code>、<code>[RegExp]</code>、<code>function</code> 其中一个。</p>
<p>例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> 使用正则表达式
noParse: <span class="hljs-regexp">/jquery|chartjs/</span>

<span class="hljs-regexp">//</span> 使用函数，从 Webpack <span class="hljs-number">3.0</span><span class="hljs-number">.0</span> 开始支持
noParse: <span class="hljs-function"><span class="hljs-params">(content)</span>=&gt;</span> {
  <span class="hljs-regexp">//</span> content 代表一个模块的文件路径
  <span class="hljs-regexp">//</span> 返回 <span class="hljs-literal">true</span> <span class="hljs-keyword">or</span> <span class="hljs-literal">false</span>
  <span class="hljs-keyword">return</span> <span class="hljs-regexp">/jquery|chartjs/</span>.test(content);
}
</code></pre>
<blockquote>注意被忽略掉的文件里不应该包含 <code>import</code> 、 <code>require</code> 、 <code>define</code> 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。</blockquote>
<h3 id="articleHeader19">parser</h3>
<p>因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 <code>AMD</code>、<code>CommonJS</code>、<code>SystemJS</code>、<code>ES6</code>。 </p>
<p><code>parser</code> 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 <code>noParse</code> 配置项的区别在于 <code>parser</code> 可以精确到语法层面， 而 <code>noParse</code> 只能控制哪些文件不被解析。 <code>parser</code> 使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES6 import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用 browserify
      requireJs: false, // 禁用 requirejs
      }
    },
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  rules:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      test:</span> <span class="hljs-string">/\.js$/,</span>
<span class="hljs-attr">      use:</span> <span class="hljs-string">['babel-loader'],</span>
<span class="hljs-attr">      parser:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      amd:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">AMD</span>
<span class="hljs-attr">      commonjs:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">CommonJS</span>
<span class="hljs-attr">      system:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">SystemJS</span>
<span class="hljs-attr">      harmony:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">ES6</span> <span class="hljs-string">import/export</span>
<span class="hljs-attr">      requireInclude:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">require.include</span>
<span class="hljs-attr">      requireEnsure:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">require.ensure</span>
<span class="hljs-attr">      requireContext:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">require.context</span>
<span class="hljs-attr">      browserify:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">browserify</span>
<span class="hljs-attr">      requireJs:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">禁用</span> <span class="hljs-string">requirejs</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">}</span>
</code></pre>
<h2 id="articleHeader20">Resolve</h2>
<p>Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，<code>Resolve</code> 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。</p>
<h3 id="articleHeader21">alias</h3>
<p><code>resolve.alias</code> 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack alias 配置
resolve:{
  alias:{
    components: './src/components/'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// Webpack alias 配置</span>
<span class="hljs-attribute">resolve</span>:{
  <span class="hljs-attribute">alias</span>:{
    <span class="hljs-attribute">components</span>: <span class="hljs-string">'./src/components/'</span>
  }
}
</code></pre>
<p>当你通过 <code>import Button from 'components/button'</code> 导入时，实际上被 <code>alias</code> 等价替换成了 <code>import Button from './src/components/button'</code>。</p>
<p>以上 <code>alias</code> 配置的含义是把导入语句里的 <code>components</code> 关键字替换成 <code>./src/components/</code>。</p>
<p>这样做可能会命中太多的导入语句，<code>alias</code> 还支持 <code>$</code> 符号来缩小范围到只命中以关键字结尾的导入语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve:{
  alias:{
    'react$': '/path/to/react.min.js'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>:{
  <span class="hljs-attribute">alias</span>:{
    <span class="hljs-string">'react$'</span>: <span class="hljs-string">'/path/to/react.min.js'</span>
  }
}
</code></pre>
<p><code>react$</code> 只会命中以 <code>react</code> 结尾的导入语句，即只会把 <code>import 'react'</code> 关键字替换成 <code>import '/path/to/react.min.js'</code>。</p>
<h3 id="articleHeader22">mainFields</h3>
<p>有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 <code>package.json</code> 文件里，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;jsnext:main&quot;: &quot;es/index.js&quot;,// 采用 ES6 语法的代码入口文件
  &quot;main&quot;: &quot;lib/index.js&quot; // 采用 ES5 语法的代码入口文件
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
  <span class="hljs-string">"jsnext:main"</span>: <span class="hljs-string">"es/index.js"</span>,<span class="hljs-comment">// 采用 ES6 语法的代码入口文件</span>
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"lib/index.js"</span> <span class="hljs-comment">// 采用 ES5 语法的代码入口文件</span>
}
</code></pre>
<p>Webpack 会根据 <code>mainFields</code> 的配置去决定优先采用哪份代码，<code>mainFields</code> 默认如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainFields: ['browser', 'main']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">mainFields:</span> [<span class="hljs-string">'browser'</span>, <span class="hljs-string">'main'</span>]
</code></pre>
<p>Webpack 会按照数组里的顺序去 <code>package.json</code> 文件里寻找，只会使用找到的第一个。</p>
<p>假如你想优先采用 ES6 的那份代码，可以这样配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainFields: ['jsnext:main', 'browser', 'main']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">mainFields:</span> [<span class="hljs-string">'jsnext:main'</span>, <span class="hljs-string">'browser'</span>, <span class="hljs-string">'main'</span>]
</code></pre>
<h3 id="articleHeader23">extensions</h3>
<p>在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 <code>resolve.extensions</code> 用于配置在尝试过程中用到的后缀列表，默认是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions: ['.js', '.json']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">extensions:</span> [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>]
</code></pre>
<h3 id="articleHeader24">modules</h3>
<p><code>resolve.modules</code> 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 <code>node_modules</code> 目录下寻找。 </p>
<p>有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 <code>import '../../../components/button'</code> 这时你可以利用 <code>modules</code> 配置项优化，假如那些被大量导入的模块都在 <code>./src/components</code> 目录下，把 <code>modules</code> 配置成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules:['./src/components','node_modules']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">modules:</span>[<span class="hljs-string">'./src/components'</span>,<span class="hljs-string">'node_modules'</span>]
</code></pre>
<p>后，你可以简单通过 <code>import 'button'</code> 导入。</p>
<h3 id="articleHeader25">descriptionFiles</h3>
<p><code>resolve.descriptionFiles</code> 配置描述第三方模块的文件名称，也就是 <code>package.json</code> 文件。默认如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="descriptionFiles: ['package.json']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">descriptionFiles:</span> [<span class="hljs-string">'package.json'</span>]
</code></pre>
<h3 id="articleHeader26">enforceExtension</h3>
<p><code>resolve.enforceExtension</code> 如果配置为 <code>true</code> 所有导入语句都必须要带文件后缀， 例如开启前 <code>import './foo'</code> 能正常工作，开启后就必须写成 <code>import './foo.js'</code>。</p>
<h3 id="articleHeader27">enforceModuleExtension</h3>
<p><code>enforceModuleExtension</code> 和 <code>enforceExtension</code> 作用类似，但 <code>enforceModuleExtension</code> 只对 <code>node_modules</code> 下的模块生效。 </p>
<p><code>enforceModuleExtension</code> 通常搭配 <code>enforceExtension</code> 使用，在 <code>enforceExtension:true</code> 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 <code>enforceModuleExtension:false</code> 来兼容第三方模块。</p>
<h2 id="articleHeader28">Plugins</h2>
<p>Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。</p>
<h3 id="articleHeader29">配置 Plugin</h3>
<p>Plugin 的配置很简单，<code>plugins</code> 配置项接受一个数组，数组里每一项都是一个要使用的 Plugin 的实例，Plugin 需要的参数通过<strong>构造函数</strong>传入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码块中
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),
  ]
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> CommonsChunkPlugin = require(<span class="hljs-string">'webpack/lib/optimize/CommonsChunkPlugin'</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    <span class="hljs-comment">// 所有页面都会用到的公共代码提取到 common 代码块中</span>
    <span class="hljs-keyword">new</span> CommonsChunkPlugin({
      name: <span class="hljs-string">'common'</span>,
      chunks: [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>]
    }),
  ]
};
</code></pre>
<p>使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如何在 Webpack 中接入 Plugin。</p>
<h2 id="articleHeader30">DevServer</h2>
<p>要配置 DevServer ，除了在配置文件里通过 <code>devServer</code> 传入参数外，还可以通过命令行参数传入。 注意只有在通过 <code>DevServer</code> 去启动 Webpack 时配置文件里 <code>devServer</code> 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 <code>devServer</code> 配置项。</p>
<h3 id="articleHeader31">hot</h3>
<p><code>devServer.hot</code> 配置是否启用模块热替换功能。 </p>
<p><code>DevServer</code> 默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。</p>
<h3 id="articleHeader32">inline</h3>
<p>DevServer 的实时预览功能依赖一个注入到页面里的代理客户端去接受来自 DevServer 的命令和负责刷新网页的工作。 </p>
<p><code>devServer.inline</code> 用于配置是否自动注入这个代理客户端到将运行在页面里的 Chunk 里去，默认是会自动注入。 DevServer 会根据你是否开启 <code>inline</code> 来调整它的自动刷新策略：</p>
<ul>
<li>如果开启 <code>inline</code>，DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷新。</li>
<li>如果关闭 <code>inline</code>，DevServer 将无法直接控制要开发的网页。这时它会通过 <code>iframe</code> 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 <code>iframe</code> 来实现实时预览。</li>
</ul>
<p>如果你想使用 DevServer 去自动刷新网页实现实时预览，最方便的方法是直接开启 <code>inline</code>。</p>
<h3 id="articleHeader33">historyApiFallback</h3>
<p><code>devServer.historyApiFallback</code> 用于方便的开发使用了 HTML5 History API 的单页应用。 </p>
<p>这类单页应用要求服务器在针对任何命中的路由时都返回一个对应的 HTML 文件，例如在访问 <code>http://localhost/user</code> 和 <code>http://localhost/home</code> 时都返回 <code>index.html</code> 文件， 浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。</p>
<p>配置 <code>historyApiFallback</code> 最简单的做法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="historyApiFallback: true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">historyApiFallback:</span> <span class="hljs-literal">true</span>
</code></pre>
<p>这会导致任何请求都会返回 <code>index.html</code> 文件，这只能用于只有一个 HTML 文件的应用。    </p>
<p>如果你的应用由多个单页应用组成，这就需要 DevServer 根据不同的请求来返回不同的 HTML 文件，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="historyApiFallback: {
  // 使用正则匹配命中路由
  rewrites: [
    // /user 开头的都返回 user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // 其它的都返回 index.html
    { from: /./, to: '/index.html' },
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">historyApiFallback</span>: {
  <span class="hljs-comment">// 使用正则匹配命中路由</span>
  <span class="hljs-attribute">rewrites</span>: [
    <span class="hljs-comment">// /user 开头的都返回 user.html</span>
    { <span class="hljs-attribute">from</span>: /^\/user/, <span class="hljs-attribute">to</span>: <span class="hljs-string">'/user.html'</span> },
    { <span class="hljs-attribute">from</span>: /^\/game/, <span class="hljs-attribute">to</span>: <span class="hljs-string">'/game.html'</span> },
    <span class="hljs-comment">// 其它的都返回 index.html</span>
    { <span class="hljs-attribute">from</span>: /./, <span class="hljs-attribute">to</span>: <span class="hljs-string">'/index.html'</span> },
  ]
}
</code></pre>
<h3 id="articleHeader34">contentBase</h3>
<p><code>devServer.contentBase</code> 配置 DevServer HTTP 服务器的文件根目录。 默认情况下为当前执行目录，通常是项目根目录，所有一般情况下你不必设置它，除非你有额外的文件需要被 DevServer 服务。 例如你想把项目根目录下的 <code>public</code> 目录设置成 DevServer 服务器的文件根目录，你可以这样配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
  contentBase: path.join(__dirname, 'public')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>:{
  <span class="hljs-attribute">contentBase</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'public'</span>)
}
</code></pre>
<p>这里需要指出可能会让你疑惑的地方，DevServer 服务器通过 HTTP 服务暴露出的文件分为两类：</p>
<ul>
<li>暴露本地文件。</li>
<li>暴露 Webpack 构建出的结果，由于构建出的结果交给了 DevServer，所以你在使用了 DevServer 时在本地找不到构建出的文件。</li>
</ul>
<p><code>contentBase</code> 只能用来配置暴露本地文件的规则，你可以通过 <code>contentBase:false</code> 来关闭暴露本地文件。</p>
<h3 id="articleHeader35">headers</h3>
<p><code>devServer.headers</code> 配置项可以在 HTTP 响应中注入一些 HTTP 响应头，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
  headers: {
    'X-foo':'bar'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>:{
  <span class="hljs-attribute">headers</span>: {
    <span class="hljs-string">'X-foo'</span>:<span class="hljs-string">'bar'</span>
  }
}
</code></pre>
<h3 id="articleHeader36">host</h3>
<p><code>devServer.host</code> 配置项用于配置 DevServer 服务监听的地址。 </p>
<p>例如你想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 <code>--host 0.0.0.0</code>。 <code>host</code> 的默认值是 <code>127.0.0.1</code> 即只有本地可以访问 DevServer 的 HTTP 服务。</p>
<h3 id="articleHeader37">port</h3>
<p><code>devServer.port</code> 配置项用于配置 DevServer 服务监听的端口，默认使用 <code>8080</code> 端口。 如果 <code>8080</code> 端口已经被其它程序占有就使用 <code>8081</code>，如果 <code>8081</code> 还是被占用就使用 <code>8082</code>，以此类推。</p>
<h3 id="articleHeader38">allowedHosts</h3>
<p><code>devServer.allowedHosts</code> 配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="allowedHosts: [
  // 匹配单个域名
  'host.com',
  'sub.host.com',
  // host2.com 和所有的子域名 *.host2.com 都将匹配
  '.host2.com'
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">allowedHosts:</span> [
  <span class="hljs-comment">// 匹配单个域名</span>
  <span class="hljs-string">'host.com'</span>,
  <span class="hljs-string">'sub.host.com'</span>,
  <span class="hljs-comment">// host2.com 和所有的子域名 *.host2.com 都将匹配</span>
  <span class="hljs-string">'.host2.com'</span>
]
</code></pre>
<h3 id="articleHeader39">disableHostCheck</h3>
<p><code>devServer.disableHostCheck</code> 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 </p>
<p>DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 <code>--host 0.0.0.0</code> 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。</p>
<h3 id="articleHeader40">https</h3>
<p>DevServer 默认使用 HTTP 协议服务，它也能通过 HTTPS 协议服务。 有些情况下你必须使用 HTTPS，例如 HTTP2 和 Service Worker 就必须运行在 HTTPS 之上。 要切换成 HTTPS 服务，最简单的方式是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
  https: true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>:{
  <span class="hljs-attribute">https</span>: true
}
</code></pre>
<p>DevServer 会自动的为你生成一份 HTTPS 证书。</p>
<p>如果你想用自己的证书可以这样配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
  https: {
    key: fs.readFileSync('path/to/server.key'),
    cert: fs.readFileSync('path/to/server.crt'),
    ca: fs.readFileSync('path/to/ca.pem')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>:{
  <span class="hljs-attribute">https</span>: {
    key: fs.<span class="hljs-built_in">readFileSync</span>(<span class="hljs-string">'path/to/server.key'</span>),
    cert: fs.<span class="hljs-built_in">readFileSync</span>(<span class="hljs-string">'path/to/server.crt'</span>),
    ca: fs.<span class="hljs-built_in">readFileSync</span>(<span class="hljs-string">'path/to/ca.pem'</span>)
  }
}
</code></pre>
<h3 id="articleHeader41">clientLogLevel</h3>
<p><code>devServer.clientLogLevel</code> 配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容。 </p>
<p><code>clientLogLevel</code> 是<strong>枚举类型</strong>，可取如下之一的值 <code>none | error | warning | info</code>。 默认为 <code>info</code> 级别，即输出所有类型的日志，设置成 <code>none</code> 可以不输出任何日志。</p>
<h3 id="articleHeader42">compress</h3>
<p><code>devServer.compress</code> 配置是否启用 gzip 压缩。<code>boolean</code> 为类型，默认为 <code>false</code>。</p>
<h3 id="articleHeader43">open</h3>
<p><code>devServer.open</code> 用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 <code>devServer.openPage</code> 配置项用于打开指定 URL 的网页。</p>
<h2 id="articleHeader44">其它配置项</h2>
<h3 id="articleHeader45">Target</h3>
<p><code>target</code> 配置项可以让 Webpack 构建出针对不同运行环境的代码。 target 可以是以下之一：</p>
<table>
<thead><tr>
<th>target值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>web</td>
<td>针对浏览器 <strong>(默认)</strong>，所有代码都集中在一个文件里</td>
</tr>
<tr>
<td>node</td>
<td>针对 Node.js，使用 <code>require</code> 语句加载 Chunk 代码</td>
</tr>
<tr>
<td>async-node</td>
<td>针对 Node.js，异步加载 Chunk 代码</td>
</tr>
<tr>
<td>webworker</td>
<td>针对 WebWorker</td>
</tr>
<tr>
<td>electron-main</td>
<td>针对 <a href="https://electronjs.org/" rel="nofollow noreferrer" target="_blank">Electron</a> 主线程</td>
</tr>
<tr>
<td>electron-renderer</td>
<td>针对 Electron 渲染线程</td>
</tr>
</tbody>
</table>
<p>例如当你设置 <code>target:'node'</code> 时，源代码中导入 Node.js 原生模块的语句 <code>require('fs')</code> 将会被保留，<code>fs</code> 模块的内容不会打包进 Chunk 里。</p>
<h3 id="articleHeader46">Devtool</h3>
<p><code>devtool</code> 配置 Webpack 如何生成 Source Map，默认值是 <code>false</code> 即不生成 Source Map，想为构建出的代码生成 Source Map 以方便调试，可以这样配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  devtool: 'source-map'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">export</span> = {
  devtool: <span class="hljs-string">'source-map'</span>
}
</code></pre>
<h3 id="articleHeader47">Watch 和 WatchOptions</h3>
<p>前面介绍过 Webpack 的监听模式，它支持监听文件更新，在文件发生变化时重新编译。在使用 Webpack 时监听模式默认是关闭的，想打开需要如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  watch: true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">export</span> = {
  watch: <span class="hljs-literal">true</span>
}
</code></pre>
<p>在使用 DevServer 时，监听模式默认是开启的。</p>
<p>除此之外，Webpack 还提供了 <code>watchOptions</code> 配置项去更灵活的控制监听模式，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时，才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms  
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每1000豪秒去问1次
    poll: 1000
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.export = {
  <span class="hljs-comment">// 只有在开启监听模式时，watchOptions 才有意义</span>
  <span class="hljs-comment">// 默认为 false，也就是不开启</span>
<span class="hljs-symbol">  watch:</span> true,
  <span class="hljs-comment">// 监听模式运行时的参数</span>
  <span class="hljs-comment">// 在开启监听模式时，才有意义</span>
<span class="hljs-symbol">  watchOptions:</span> {
    <span class="hljs-comment">// 不监听的文件或文件夹，支持正则匹配</span>
    <span class="hljs-comment">// 默认为空</span>
<span class="hljs-symbol">    ignored:</span> /node_modules/,
    <span class="hljs-comment">// 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高</span>
    <span class="hljs-comment">// 默认为 300ms  </span>
<span class="hljs-symbol">    aggregateTimeout:</span> <span class="hljs-number">300</span>,
    <span class="hljs-comment">// 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的</span>
    <span class="hljs-comment">// 默认每1000豪秒去问1次</span>
<span class="hljs-symbol">    poll:</span> <span class="hljs-number">1000</span>
  }
}
</code></pre>
<h3 id="articleHeader48">Externals</h3>
<p>Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。</p>
<p>有些 JavaScript 运行环境可能内置了一些全局变量或者模块，例如在你的 HTML HEAD 标签里通过以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;path/to/jquery.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>引入 jQuery 后，全局变量 <code>jQuery</code> 就会被注入到网页的 JavaScript 运行环境里。</p>
<p>如果想在使用模块化的源代码里导入和使用 jQuery，可能需要这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery';
$('.my-element');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
$(<span class="hljs-string">'.my-element'</span>);
</code></pre>
<p>构建后你会发现输出的 Chunk 里包含的 jQuery 库的内容，这导致 jQuery 库出现了2次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。</p>
<p>Externals 配置项就是为了解决这个问题。</p>
<p>通过 <code>externals</code> 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。 要解决以上问题，可以这样配置 <code>externals</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">export</span> = {
  externals: {
    <span class="hljs-comment">// 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery</span>
    jquery: <span class="hljs-string">'jQuery'</span>
  }
}
</code></pre>
<h3 id="articleHeader49">ResolveLoader</h3>
<p>ResolveLoader 用来告诉 Webpack 如何去寻找 Loader，因为在使用 Loader 时是通过其包名称去引用的， Webpack 需要根据配置的 Loader 包名去找到 Loader 的实际代码，以调用 Loader 去处理源文件。</p>
<p>ResolveLoader 的默认配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolveLoader:{
    // 去哪个目录下寻找 Loader
    modules: ['node_modules'],
    // 入口文件的后缀
    extensions: ['.js', '.json'],
    // 指明入口文件位置的字段
    mainFields: ['loader', 'main']
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolveLoader:{
    <span class="hljs-comment">// 去哪个目录下寻找 Loader</span>
    modules: [<span class="hljs-string">'node_modules'</span>],
    <span class="hljs-comment">// 入口文件的后缀</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">// 指明入口文件位置的字段</span>
    mainFields: [<span class="hljs-string">'loader'</span>, <span class="hljs-string">'main'</span>]
  }
}
</code></pre>
<p>该配置项常用于加载本地的 Loader。</p>
<h2 id="articleHeader50">整体配置结构</h2>
<p>之前的章节分别讲述了每个配置项的具体含义，但没有描述它们所处的位置和数据结构，下面通过一份代码来描述清楚：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = {
    // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
    // 类型可以是 string | object | array
    entry: './app/entry', // 只有1个入口，入口只有1个文件
    entry: ['./app/entry1', './app/entry2'], // 只有1个入口，入口有2个文件
    entry: { // 有2个入口
        a: './app/entry-a',
        b: ['./app/entry-b1', './app/entry-b2']
    },

    // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
    output: {
        // 输出文件存放的目录，必须是 string 类型的绝对路径。
        path: path.resolve(__dirname, 'dist'),

        // 输出文件的名称
        filename: 'bundle.js', // 完整的名称
        filename: '[name].js', // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
        filename: '[chunkhash].js', // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件

        // 发布到线上的所有资源的 URL 前缀，string 类型
        publicPath: '/assets/', // 放到指定目录下
        publicPath: '', // 放到根目录下
        publicPath: 'https://cdn.example.com/', // 放到 CDN 上去

        // 导出库的名称，string 类型
        // 不填它时，默认输出格式是匿名的立即执行函数
        library: 'MyLibrary',

        // 导出库的类型，枚举类型，默认是 var
        // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，
        libraryTarget: 'umd',

        // 是否包含有用的文件路径信息到生成的代码里去，boolean 类型
        pathinfo: true,

        // 附加 Chunk 的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',

        // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',

        // 生成的 Source Map 文件名称
        sourceMapFilename: '[file].map',

        // 浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

        // 异步加载跨域的资源时使用的方式
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,
    },

    // 配置模块相关
    module: {
        rules: [ // 配置 Loader
            {
                test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
                include: [ // 只会命中这里面的文件
                    path.resolve(__dirname, 'app')
                ],
                exclude: [ // 忽略这里面的文件
                    path.resolve(__dirname, 'app/demo-files')
                ],
                use: [ // 使用那些 Loader，有先后次序，从后往前执行
                    'style-loader', // 直接使用 Loader 的名称
                    {
                        loader: 'css-loader',
                        options: { // 给 html-loader 传一些参数
                        }
                    }
                ]
            },
        ],
        noParse: [ // 不用解析和处理的模块
            /special-library\.js$/  // 用正则匹配
        ],
    },

    // 配置插件
    plugins: [],

    // 配置寻找模块的规则
    resolve: {
        modules: [ // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
        alias: { // 模块别名配置，用于映射模块
            // 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'
            'module': 'new-module',
            // 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，
            // 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'
            'only-module$': 'new-module',
        },
        alias: [ // alias 还支持使用数组来更详细的配置
            {
                name: 'module', // 老的模块
                alias: 'new-module', // 新的模块
                // 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射
                onlyModule: true,
            }
        ],
        symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
        descriptionFiles: ['package.json'], // 模块的描述文件
        mainFields: ['main'], // 模块的描述文件里的描述入口的文件的字段名称
        enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
    },

    // 输出文件性能检查配置
    performance: {
        hints: 'warning', // 有性能问题时输出警告
        hints: 'error', // 有性能问题时输出错误
        hints: false, // 关闭性能检查
        maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
        maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
        assetFilter: function (assetFilename) { // 过滤要检查的文件
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    devtool: 'source-map', // 配置 source-map 类型

    context: __dirname, // Webpack 使用的根目录，string 类型必须是绝对路径

    // 配置输出代码的运行环境
    target: 'web', // 浏览器，默认
    target: 'webworker', // WebWorker
    target: 'node', // Node.js，使用 `require` 语句加载 Chunk 代码
    target: 'async-node', // Node.js，异步加载 Chunk 代码
    target: 'node-webkit', // nw.js
    target: 'electron-main', // electron, 主线程
    target: 'electron-renderer', // electron, 渲染线程

    externals: { // 使用来自 JavaScript 运行环境提供的全局变量
        jquery: 'jQuery'
    },

    stats: { // 控制台输出日志控制
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },

    devServer: { // DevServer 相关的配置
        proxy: { // 代理到后端服务接口
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // 配置 DevServer HTTP 服务器的文件根目录
        compress: true, // 是否开启 gzip 压缩
        historyApiFallback: true, // 是否开发 HTML5 History API 网页
        hot: true, // 是否开启模块热替换功能
        https: false, // 是否开启 HTTPS 模式
    },

    profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

    cache: false, // 是否启用缓存提升构建速度

    watch: true, // 是否开始
    watchOptions: { // 监听模式选项
        // 不监听的文件或文件夹，支持正则匹配。默认为空
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
        poll: 1000
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">// entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。</span>
    <span class="hljs-comment">// 类型可以是 string | object | array</span>
    entry: <span class="hljs-string">'./app/entry'</span>, <span class="hljs-comment">// 只有1个入口，入口只有1个文件</span>
    entry: [<span class="hljs-string">'./app/entry1'</span>, <span class="hljs-string">'./app/entry2'</span>], <span class="hljs-comment">// 只有1个入口，入口有2个文件</span>
    entry: { <span class="hljs-comment">// 有2个入口</span>
        a: <span class="hljs-string">'./app/entry-a'</span>,
        <span class="hljs-attr">b</span>: [<span class="hljs-string">'./app/entry-b1'</span>, <span class="hljs-string">'./app/entry-b2'</span>]
    },

    <span class="hljs-comment">// 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。</span>
    output: {
        <span class="hljs-comment">// 输出文件存放的目录，必须是 string 类型的绝对路径。</span>
        path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),

        <span class="hljs-comment">// 输出文件的名称</span>
        filename: <span class="hljs-string">'bundle.js'</span>, <span class="hljs-comment">// 完整的名称</span>
        filename: <span class="hljs-string">'[name].js'</span>, <span class="hljs-comment">// 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称</span>
        filename: <span class="hljs-string">'[chunkhash].js'</span>, <span class="hljs-comment">// 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件</span>

        <span class="hljs-comment">// 发布到线上的所有资源的 URL 前缀，string 类型</span>
        publicPath: <span class="hljs-string">'/assets/'</span>, <span class="hljs-comment">// 放到指定目录下</span>
        publicPath: <span class="hljs-string">''</span>, <span class="hljs-comment">// 放到根目录下</span>
        publicPath: <span class="hljs-string">'https://cdn.example.com/'</span>, <span class="hljs-comment">// 放到 CDN 上去</span>

        <span class="hljs-comment">// 导出库的名称，string 类型</span>
        <span class="hljs-comment">// 不填它时，默认输出格式是匿名的立即执行函数</span>
        library: <span class="hljs-string">'MyLibrary'</span>,

        <span class="hljs-comment">// 导出库的类型，枚举类型，默认是 var</span>
        <span class="hljs-comment">// 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，</span>
        libraryTarget: <span class="hljs-string">'umd'</span>,

        <span class="hljs-comment">// 是否包含有用的文件路径信息到生成的代码里去，boolean 类型</span>
        pathinfo: <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// 附加 Chunk 的文件名称</span>
        chunkFilename: <span class="hljs-string">'[id].js'</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">'[chunkhash].js'</span>,

        <span class="hljs-comment">// JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用</span>
        jsonpFunction: <span class="hljs-string">'myWebpackJsonp'</span>,

        <span class="hljs-comment">// 生成的 Source Map 文件名称</span>
        sourceMapFilename: <span class="hljs-string">'[file].map'</span>,

        <span class="hljs-comment">// 浏览器开发者工具里显示的源码模块名称</span>
        devtoolModuleFilenameTemplate: <span class="hljs-string">'webpack:///[resource-path]'</span>,

        <span class="hljs-comment">// 异步加载跨域的资源时使用的方式</span>
        crossOriginLoading: <span class="hljs-string">'use-credentials'</span>,
        <span class="hljs-attr">crossOriginLoading</span>: <span class="hljs-string">'anonymous'</span>,
        <span class="hljs-attr">crossOriginLoading</span>: <span class="hljs-literal">false</span>,
    },

    <span class="hljs-comment">// 配置模块相关</span>
    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">rules</span>: [ <span class="hljs-comment">// 配置 Loader</span>
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>, <span class="hljs-comment">// 正则匹配命中要使用 Loader 的文件</span>
                include: [ <span class="hljs-comment">// 只会命中这里面的文件</span>
                    path.resolve(__dirname, <span class="hljs-string">'app'</span>)
                ],
                <span class="hljs-attr">exclude</span>: [ <span class="hljs-comment">// 忽略这里面的文件</span>
                    path.resolve(__dirname, <span class="hljs-string">'app/demo-files'</span>)
                ],
                <span class="hljs-attr">use</span>: [ <span class="hljs-comment">// 使用那些 Loader，有先后次序，从后往前执行</span>
                    <span class="hljs-string">'style-loader'</span>, <span class="hljs-comment">// 直接使用 Loader 的名称</span>
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
                        <span class="hljs-attr">options</span>: { <span class="hljs-comment">// 给 html-loader 传一些参数</span>
                        }
                    }
                ]
            },
        ],
        <span class="hljs-attr">noParse</span>: [ <span class="hljs-comment">// 不用解析和处理的模块</span>
            /special-library\.js$/  <span class="hljs-comment">// 用正则匹配</span>
        ],
    },

    <span class="hljs-comment">// 配置插件</span>
    plugins: [],

    <span class="hljs-comment">// 配置寻找模块的规则</span>
    resolve: {
        <span class="hljs-attr">modules</span>: [ <span class="hljs-comment">// 寻找模块的根目录，array 类型，默认以 node_modules 为根目录</span>
            <span class="hljs-string">'node_modules'</span>,
            path.resolve(__dirname, <span class="hljs-string">'app'</span>)
        ],
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.css'</span>], <span class="hljs-comment">// 模块的后缀名</span>
        alias: { <span class="hljs-comment">// 模块别名配置，用于映射模块</span>
            <span class="hljs-comment">// 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'</span>
            <span class="hljs-string">'module'</span>: <span class="hljs-string">'new-module'</span>,
            <span class="hljs-comment">// 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，</span>
            <span class="hljs-comment">// 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'</span>
            <span class="hljs-string">'only-module$'</span>: <span class="hljs-string">'new-module'</span>,
        },
        <span class="hljs-attr">alias</span>: [ <span class="hljs-comment">// alias 还支持使用数组来更详细的配置</span>
            {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'module'</span>, <span class="hljs-comment">// 老的模块</span>
                alias: <span class="hljs-string">'new-module'</span>, <span class="hljs-comment">// 新的模块</span>
                <span class="hljs-comment">// 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射</span>
                onlyModule: <span class="hljs-literal">true</span>,
            }
        ],
        <span class="hljs-attr">symlinks</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否跟随文件软链接去搜寻模块的路径</span>
        descriptionFiles: [<span class="hljs-string">'package.json'</span>], <span class="hljs-comment">// 模块的描述文件</span>
        mainFields: [<span class="hljs-string">'main'</span>], <span class="hljs-comment">// 模块的描述文件里的描述入口的文件的字段名称</span>
        enforceExtension: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否强制导入语句必须要写明文件后缀</span>
    },

    <span class="hljs-comment">// 输出文件性能检查配置</span>
    performance: {
        <span class="hljs-attr">hints</span>: <span class="hljs-string">'warning'</span>, <span class="hljs-comment">// 有性能问题时输出警告</span>
        hints: <span class="hljs-string">'error'</span>, <span class="hljs-comment">// 有性能问题时输出错误</span>
        hints: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 关闭性能检查</span>
        maxAssetSize: <span class="hljs-number">200000</span>, <span class="hljs-comment">// 最大文件大小 (单位 bytes)</span>
        maxEntrypointSize: <span class="hljs-number">400000</span>, <span class="hljs-comment">// 最大入口文件大小 (单位 bytes)</span>
        assetFilter: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">assetFilename</span>) </span>{ <span class="hljs-comment">// 过滤要检查的文件</span>
            <span class="hljs-keyword">return</span> assetFilename.endsWith(<span class="hljs-string">'.css'</span>) || assetFilename.endsWith(<span class="hljs-string">'.js'</span>);
        }
    },

    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'source-map'</span>, <span class="hljs-comment">// 配置 source-map 类型</span>

    context: __dirname, <span class="hljs-comment">// Webpack 使用的根目录，string 类型必须是绝对路径</span>

    <span class="hljs-comment">// 配置输出代码的运行环境</span>
    target: <span class="hljs-string">'web'</span>, <span class="hljs-comment">// 浏览器，默认</span>
    target: <span class="hljs-string">'webworker'</span>, <span class="hljs-comment">// WebWorker</span>
    target: <span class="hljs-string">'node'</span>, <span class="hljs-comment">// Node.js，使用 `require` 语句加载 Chunk 代码</span>
    target: <span class="hljs-string">'async-node'</span>, <span class="hljs-comment">// Node.js，异步加载 Chunk 代码</span>
    target: <span class="hljs-string">'node-webkit'</span>, <span class="hljs-comment">// nw.js</span>
    target: <span class="hljs-string">'electron-main'</span>, <span class="hljs-comment">// electron, 主线程</span>
    target: <span class="hljs-string">'electron-renderer'</span>, <span class="hljs-comment">// electron, 渲染线程</span>

    externals: { <span class="hljs-comment">// 使用来自 JavaScript 运行环境提供的全局变量</span>
        jquery: <span class="hljs-string">'jQuery'</span>
    },

    <span class="hljs-attr">stats</span>: { <span class="hljs-comment">// 控制台输出日志控制</span>
        assets: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">errorDetails</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
    },

    <span class="hljs-attr">devServer</span>: { <span class="hljs-comment">// DevServer 相关的配置</span>
        proxy: { <span class="hljs-comment">// 代理到后端服务接口</span>
            <span class="hljs-string">'/api'</span>: <span class="hljs-string">'http://localhost:3000'</span>
        },
        <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">'public'</span>), <span class="hljs-comment">// 配置 DevServer HTTP 服务器的文件根目录</span>
        compress: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否开启 gzip 压缩</span>
        historyApiFallback: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否开发 HTML5 History API 网页</span>
        hot: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否开启模块热替换功能</span>
        https: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否开启 HTTPS 模式</span>
    },

    <span class="hljs-attr">profile</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳</span>

    cache: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否启用缓存提升构建速度</span>

    watch: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否开始</span>
    watchOptions: { <span class="hljs-comment">// 监听模式选项</span>
        <span class="hljs-comment">// 不监听的文件或文件夹，支持正则匹配。默认为空</span>
        ignored: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-comment">// 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高</span>
        <span class="hljs-comment">// 默认为300ms</span>
        aggregateTimeout: <span class="hljs-number">300</span>,
        <span class="hljs-comment">// 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次</span>
        poll: <span class="hljs-number">1000</span>
    },
};</code></pre>
<h2 id="articleHeader51">多种配置类型</h2>
<p>除了通过导出一个 Object 来描述 Webpack 所需的配置外，还有其它更灵活的方式，以简化不同场景的配置。</p>
<h3 id="articleHeader52">导出一个 Function</h3>
<p>在大多数时候你需要从同一份源代码中构建出多份代码，例如一份用于开发时，一份用于发布到线上。</p>
<p>如果采用导出一个 Object 来描述 Webpack 所需的配置的方法，需要写两个文件。 一个用于开发环境，一个用于线上环境。再在启动时通过 <code>webpack --config webpack.config.js</code> 指定使用哪个配置文件。</p>
<p>采用导出一个 Function 的方式，能通过 JavaScript 灵活的控制配置，做到只写一个配置文件就能完成以上要求。</p>
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
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
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
};</code></pre>
<p>在运行 Webpack 时，会给这个函数传入2个参数，分别是：</p>
<ol>
<li>
<code>env</code>：当前运行时的 Webpack 专属环境变量，<code>env</code> 是一个 Object。读取时直接访问 Object 的属性，设置它需要在启动 Webpack 时带上参数。例如启动命令是 <code>webpack --env.production --env.bao=foo</code> 时，则 <code>env</code> 的值是 <code>{"production":"true","bao":"foo"}</code>。</li>
<li>
<code>argv</code>：代表在启动 Webpack 时所有通过命令行传入的参数，例如 <code>--config、--env、--devtool</code>，可以通过 <code>webpack -h</code> 列出所有 Webpack 支持的命令行参数。</li>
</ol>
<p>就以上配置文件而言，在开发时执行命令 webpack 构建出方便调试的代码，在需要构建出发布到线上的代码时执行 <code>webpack --env.production</code> 构建出压缩的代码。</p>
<h3 id="articleHeader53">导出一个返回 Promise 的函数</h3>
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
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">env = {}, argv</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve({
        <span class="hljs-comment">// ...</span>
      })
    }, <span class="hljs-number">5000</span>)
  })
}
</code></pre>
<h3 id="articleHeader54">导出多份配置</h3>
<p>除了只导出一份配置外，Webpack 还支持导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建。</p>
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
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = [
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
]
</code></pre>
<p>以上配置会导致 Webpack 针对这三份配置执行三次不同的构建。</p>
<p>这特别适合于用 Webpack 构建一个要上传到 Npm 仓库的库，因为库中可能需要包含多种模块化格式的代码，例如 CommonJS、UMD。</p>
<h2 id="articleHeader55">配置总结</h2>
<p>从前面的配置看来选项很多，Webpack 内置了很多功能。 </p>
<p>你不必都记住它们，只需要大概明白 Webpack 原理和核心概念去判断选项大致属于哪个大模块下，再去查详细的使用文档。</p>
<p>通常你可用如下经验去判断如何配置 Webpack：</p>
<ul>
<li>想让<strong>源文件</strong>加入到构建流程中去被 Webpack 控制，配置 <code>entry</code>。</li>
<li>想自定义<strong>输出文件的位置和名称</strong>，配置 <code>output</code>。</li>
<li>想自定义<strong>寻找依赖模块时的策略</strong>，配置 <code>resolve</code>。</li>
<li>想自定义<strong>解析和转换文件的策略</strong>，配置 <code>module</code>，通常是配置 <code>module.rules</code> 里的 Loader。</li>
<li>其它的大部分需求可能要通过 Plugin 去实现，配置 <code>plugin</code>。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack配置

## 原文链接
[https://segmentfault.com/a/1190000014982619](https://segmentfault.com/a/1190000014982619)

