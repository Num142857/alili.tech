---
title: '手把手带你走进下一代的ES6模块打包工具—Rollup' 
date: 2018-12-21 2:30:11
hidden: true
slug: mpvu45m355t
categories: [reprint]
---

{{< raw >}}

                    
<p>本文一共七个例子，由浅入深带你熟悉Rollup。首先把 <a href="https://github.com/qiqihaobenben/rollup-demos" rel="nofollow noreferrer" target="_blank">rollup-demos</a> 这个示例仓库下载到本地</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir rollup
cd rollup
git clone git@github.com:qiqihaobenben/rollup-demos.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>mkdir rollup
cd rollup
git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@github.com:qiqihaobenben/rollup-demos.git</code></pre>
<p><strong>准备就绪，正文开始</strong></p>
<hr>
<h2 id="articleHeader0">简介</h2>
<p>以下内容基于Webpack和Rollup这两个打包工具来展开。  </p>
<p>工具的使用是分场景的，Rollup的使用场景是，你的代码基于 ES6 模块编写，并且你做的东西是准备给他人使用的。  </p>
<p>有一句经验之谈：<strong>在开发应用时使用 Webpack，开发库时使用 Rollup。</strong></p>
<p>例如：React、Vue、Ember、Preact、D3、Three.js、Moment 等众多知名项目都使用了 Rollup</p>
<blockquote>优点</blockquote>
<ul>
<li>编译运行出来的代码内容格式可读性好。</li>
<li>几乎没什么多余代码，除了必要的cjs, umd头外，bundle代码基本和源码没什么差异，没有奇怪的<code>__webpack_require__</code>, <code>Object.defineProperty</code>
</li>
<li>相比Webpack，Rollup拥有无可比拟的性能优势，这是由依赖处理方式决定的，编译时依赖处理（Rollup）自然比运行时依赖处理（Webpack）性能更好,而且没什么多余代码，如上文提到的，webpack bundle不仅体积大，非业务代码（<code>__webpack_require__</code>, <code>Object.defineProperty</code>）执行耗时也不容小视。Rollup没有生成这些额外的东西，执行耗时主要在于<code>Compile Script</code> 和 <code>Evaluate Script</code> 上，其余部分可以忽略不计</li>
<li>支持ES6模块和IIFE格式。</li>
<li>对于<strong>ES6模块</strong>依赖库，Rollup会静态分析代码中的 import，并将排除任何未实际使用的代码。(Tree-shaking)</li>
</ul>
<blockquote>缺点</blockquote>
<ul><li>插件生态相对较弱，一些常见需求无法满足</li></ul>
<p>比如打包多个依赖库，把公共依赖项提出来（Webpack的CommonsChunkPlugin）还有HMR(模块热替换)</p>
<ul><li>文档相对较少，遇到问题无法快速解决</li></ul>
<h3 id="articleHeader1">安装</h3>
<p><code>npm install -g rollup</code></p>
<h3 id="articleHeader2">全部指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Usage: rollup [options] <entry file>

Basic options:

-v, --version               Show version number
-h, --help                  Show this help message
-c, --config                Use this config file (if argument is used but value
                              is unspecified, defaults to rollup.config.js)
-w, --watch                 Watch files in bundle and rebuild on changes
-i, --input                 Input (alternative to <entry file>)
-o, --output.file <output>  Output (if absent, prints to stdout)
-f, --output.format [es]    Type of output (amd, cjs, es, iife, umd)
-e, --external              Comma-separate list of module IDs to exclude
-g, --globals               Comma-separate list of `module ID:Global` pairs
                              Any module IDs defined here are added to external
-n, --name                  Name for UMD export
-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
-l, --legacy                Support IE8
--amd.id                    ID for AMD module (default is anonymous)
--amd.define                Function to use in place of `define`
--no-strict                 Don't emit a `&quot;use strict&quot;;` in the generated modules.
--no-indent                 Don't indent result
--environment <values>      Settings passed to config file (see example)
--no-conflict               Generate a noConflict method for UMD globals
--no-treeshake              Disable tree-shaking
--silent                    Don't print warnings
--intro                     Content to insert at top of bundle (inside wrapper)
--outro                     Content to insert at end of bundle (inside wrapper)
--banner                    Content to insert at top of bundle (outside wrapper)
--footer                    Content to insert at end of bundle (outside wrapper)
--interop                   Include interop block (true by default)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">Usage</span>: rollup [options] &lt;entry file&gt;

<span class="haml">Basic options:

-<span class="ruby">v, --version               Show version number
</span>-<span class="ruby">h, --help                  Show this help message
</span>-<span class="ruby">c, --config                Use this config file (<span class="hljs-keyword">if</span> argument is used but value
</span>                              is unspecified, defaults to rollup.config.js)
-<span class="ruby">w, --watch                 Watch files <span class="hljs-keyword">in</span> bundle <span class="hljs-keyword">and</span> rebuild on changes
</span>-<span class="ruby">i, --input                 Input (alternative to &lt;entry file&gt;)
</span>-<span class="ruby">o, --output.file &lt;output&gt;  Output (<span class="hljs-keyword">if</span> absent, prints to stdout)
</span>-<span class="ruby">f, --output.format [es]    Type of output (amd, cjs, es, iife, umd)
</span>-<span class="ruby">e, --external              Comma-separate list of <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">IDs</span> <span class="hljs-title">to</span> <span class="hljs-title">exclude</span></span>
</span>-<span class="ruby">g, --globals               Comma-separate list of <span class="hljs-string">`module ID:Global`</span> pairs
</span>                              Any module IDs defined here are added to external
-<span class="ruby">n, --name                  Name <span class="hljs-keyword">for</span> UMD export
</span>-<span class="ruby">m, --sourcemap             Generate sourcemap (<span class="hljs-string">`-m inline`</span> <span class="hljs-keyword">for</span> inline map)
</span>-<span class="ruby">l, --legacy                Support IE8
</span>-<span class="ruby">-amd.id                    ID <span class="hljs-keyword">for</span> AMD <span class="hljs-class"><span class="hljs-keyword">module</span> (<span class="hljs-title">default</span> <span class="hljs-title">is</span> <span class="hljs-title">anonymous</span>)</span>
</span>-<span class="ruby">-amd.define                Function to use <span class="hljs-keyword">in</span> place of <span class="hljs-string">`define`</span>
</span>-<span class="ruby">-no-strict                 Don<span class="hljs-string">'t emit a `"use strict";` in the generated modules.
</span></span>-<span class="ruby"><span class="hljs-string">-no-indent                 Don'</span>t indent result
</span>-<span class="ruby">-environment &lt;values&gt;      Settings passed to config file (see example)
</span>-<span class="ruby">-no-conflict               Generate a noConflict method <span class="hljs-keyword">for</span> UMD globals
</span>-<span class="ruby">-no-treeshake              Disable tree-shaking
</span>-<span class="ruby">-silent                    Don<span class="hljs-string">'t print warnings
</span></span>-<span class="ruby"><span class="hljs-string">-intro                     Content to insert at top of bundle (inside wrapper)
</span></span>-<span class="ruby"><span class="hljs-string">-outro                     Content to insert at end of bundle (inside wrapper)
</span></span>-<span class="ruby"><span class="hljs-string">-banner                    Content to insert at top of bundle (outside wrapper)
</span></span>-<span class="ruby"><span class="hljs-string">-footer                    Content to insert at end of bundle (outside wrapper)
</span></span>-<span class="ruby"><span class="hljs-string">-interop                   Include interop block (true by default)</span></span></span></code></pre>
<h3 id="articleHeader3">配置文件细则</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 核心选项</span>
  <span class="hljs-keyword">input</span>,     <span class="hljs-comment">// 必须</span>
  external,
  plugins,

  <span class="hljs-comment">// 额外选项</span>
  onwarn,

  <span class="hljs-comment">// danger zone</span>
  acorn,
  <span class="hljs-keyword">context</span>,
  moduleContext,
  legacy

  <span class="hljs-keyword">output</span>: {  <span class="hljs-comment">// 必须 (如果要输出多个，可以是一个数组)</span>
    <span class="hljs-comment">// 核心选项</span>
    file,    <span class="hljs-comment">// 必须</span>
    format,  <span class="hljs-comment">// 必须</span>
    name,
    globals,

    <span class="hljs-comment">// 额外选项</span>
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    <span class="hljs-comment">// 高危选项</span>
    exports,
    amd,
    indent
    strict
  },
};</code></pre>
<h3 id="articleHeader4">简单实例</h3>
<blockquote>生成浏览器可用</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//打包main.js到bundle.js 打包格式是立即执行函数
rollup main.js -o bundle.js -f iife" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是立即执行函数</span>
rollup main<span class="hljs-selector-class">.js</span> -o bundle<span class="hljs-selector-class">.js</span> -f iife</code></pre>
<blockquote>生成Node.js可用</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//打包main.js到bundle.js 打包格式是commonjs。
rollup main.js -o bundle.js -f cjs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是commonjs。</span>
rollup main<span class="hljs-selector-class">.js</span> -o bundle<span class="hljs-selector-class">.js</span> -f cjs</code></pre>
<blockquote>Node.js和浏览器都可用</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//打包main.js到bundle.js 打包格式是UMD,这个格式需要一个模块名
rollup main.js -o bundle.js -f umd --name &quot;myBundle&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是UMD,这个格式需要一个模块名</span>
rollup main<span class="hljs-selector-class">.js</span> -o bundle<span class="hljs-selector-class">.js</span> -f umd --name <span class="hljs-string">"myBundle"</span></code></pre>
<blockquote>运行配置文件</blockquote>
<p><code>rollup -c</code></p>
<h2 id="articleHeader5">实际操作</h2>
<h3 id="articleHeader6">example1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/example1/main.js
import one from './module1.js';
export default function () {
    console.log(one);
}

// src/example1/module1.js
export default 'hello world!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// src/example1/main.js</span>
<span class="hljs-keyword">import</span> one <span class="hljs-keyword">from</span> <span class="hljs-string">'./module1.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(one);
}

<span class="hljs-comment">// src/example1/module1.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'hello world!'</span></code></pre>
<p>在<strong>项目根目录</strong>(之后Rollup运行会默认这个目录)运行  <br><code>rollup src/example1/main.js -o dist/example1/bundle.js -f cjs</code>  </p>
<p><em>解析：</em>   <br><code>-f</code> 选项（ <code>--output.format</code> 的缩写）指定了所创建 bundle 的类型，打包时必须要有的选项，否则会报错。  <br>输出的格式有amd, cjs, es, iife, umd,可以把命令行中 <code>-f</code> 后面的 <code>cjs</code> 改为其他的，看一下生成的bundle.js的内容有什么不一样。对于模块不熟悉的可以看一下 <a href="https://segmentfault.com/a/1190000012464333?_ea=3022967">很全很全的JavaScript的模块讲解</a>  </p>
<p><code>-o</code> 是 <code>--output.file</code> 的缩写，如果不写会默认输出到命令行终端（标准输出）。</p>
<h3 id="articleHeader7">example2</h3>
<p>如果添加更多的选项，上面这种命令行的方式就显得麻烦了，就得需要 <strong>使用配置文件</strong> 了。  </p>
<p>在项目 <code>src/example2</code> 文件夹下，新建一个 <code>rollup.config.js</code> 文件，写入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    input: 'src/example2/main.js',
    output: {
        file: 'dist/example2/bundle.js',
        format: 'cjs'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">input</span>: <span class="hljs-string">'src/example2/main.js'</span>,
    output: {
        file: <span class="hljs-string">'dist/example2/bundle.js'</span>,
        format: <span class="hljs-string">'cjs'</span>
    }
}</code></pre>
<p>新建一个<code>main.js</code> 和 <code>module2.js</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/example2/main.js
import one from './module2.js';
export default function () {
    console.log(one);
}

// src/example1/module2.js
export default 'hello config!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// src/example2/main.js</span>
<span class="hljs-keyword">import</span> one <span class="hljs-keyword">from</span> <span class="hljs-string">'./module2.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(one);
}

<span class="hljs-comment">// src/example1/module2.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'hello config!'</span></code></pre>
<p>接下来就是运行命令，<code>rollup.config.js</code>本来是Rollup默认运行的配置文件，如果我们的<code>rollup.config.js</code>是放在根目录下的，可以直接运行<code>rollup -c</code>，不用任何选项，但是我们是放在<code>src/module2</code>文件夹下的，所以要加上配置文件的路径  <br><code>rollup -c src/module2/rollup.config.js</code>  </p>
<p><strong>注意</strong></p>
<ol><li>同样的命令行选项将会覆盖配置文件中的选项，例如:</li></ol>
<p><code>rollup -c src/module2/rollup.config.js -o dist/example2/bundle2.js</code> 那么打包好的文件名就是<code>bundle2.js</code></p>
<ol><li>Rollup 本身会处理配置文件，所以可以使用 <code>export default</code> 语法——代码不会经过 <code>Babel</code> 等类似工具编译，所以只能使用支持 ES2015(ES6) 语法的 Node.js 版本。</li></ol>
<h3 id="articleHeader8">example3</h3>
<p>随着构建更复杂的 bundle，我们需要加入插件(plugins)。  </p>
<p>使用 <a href="https://github.com/rollup/rollup-plugin-json" rel="nofollow noreferrer" target="_blank">rollup-plugin-json</a>，令 Rollup 从 JSON 文件中读取数据。  <br>将 rollup-plugin-json 安装为开发依赖，因为代码实际执行时不依赖这个插件——只是在打包时使用，所以用的是<code>--save-dev</code> 而不是 <code>--save</code>  </p>
<p><code>npm i -D rollup-plugin-json</code> 或者 <code>npm install --save-dev rollup-plugin-json</code>  </p>
<p><code>src/example3</code>文件夹下新建 <code>main.js</code> 和 <code>rollup.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import { version} from '../../package.json';

export default function () {
    console.log(`version is ${version}`);
}

// rollup.config.js
import json from 'rollup-plugin-json';

export default {
    input: 'src/example3/main.js',
    output: {
        file: 'dist/example3/bundle.js',
        format: 'cjs'
    },
    plugins: [
        json()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> { version} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../package.json'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`version is <span class="hljs-subst">${version}</span>`</span>);
}

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> json <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-json'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example3/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example3/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        json()
    ]
}</code></pre>
<p>运行命令 <code>rollup -c src/example3/rollup.config.js</code>  </p>
<p><em>扩展：</em> json函数可以传入 <code>include</code>指定包含文件、<code>exclude</code>指定排除文件，<code>preferConst</code>如果为<code>true</code>,用const接受输出，如果为<code>false</code>，用 <code>var</code>接收输出。  </p>
<p><strong>注意：</strong> tree-shaking的作用，可以看到打包好bundle.js中只有version输入，package.json 中的其它数据被忽略了。</p>
<h3 id="articleHeader9">example4</h3>
<p>Rollup 不知道怎么处理依赖于从 npm 安装到你的 <code>node_modules</code> 文件夹中的软件包。  </p>
<p>例如，添加一个简单的依赖 <a href="https://www.npmjs.com/package/the-answer" rel="nofollow noreferrer" target="_blank">the-answer</a>，它输出对生活、宇宙及其它一切的答案，这个简单的包是用来演示如何将npm包汇总到Rollup包中。特别是, 此包在<code>package.json</code>中添加了 "main" (UMD 格式) 和 "模块" (ES2015 格式)这个两个选项。</p>
<p>看一下，按照普通流程引入 <code>the-answer</code> 模块会是什么结果。  <br><code>npm install the-answer</code>  <br>在 <code>src/example4</code> 文件夹下新增 <code>main.js</code> 和 <code>rollup.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import answer from 'the-answer';

export default function () {
    console.log('the answer is ' + answer);
}


// rollup.config.js
export default {
    input: 'src/example4/main.js',
    output: {
        file: 'dist/example4/bundle.js',
        format: 'cjs'
    },
    plugins: [
        // 没有加入任何插件
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + answer);
}


<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example4/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example4/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-comment">// 没有加入任何插件</span>
    ]
}</code></pre>
<p>运行： <code>rollup -c src/example4/rollup.config.js</code> 会有一个警告 <code>Unresolved dependencies</code> ,我们看一下 打包好的<code>dist/example4/bundle.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 截取dist/example4/bundle.js`
function _interopDefault (ex) { return (ex &amp;&amp; (typeof ex === 'object') &amp;&amp; 'default' in ex) ? ex['default'] : ex; }

var answer = _interopDefault(require('the-answer'));

// 可以看到the-answer并没有打包进来，还得用node的require去请求，然后经过函数转化才能拿到the-answer的输出值
// 我们可以看一下 node_modules 下的 the-answer 模块暴露出的内容

var index = 42;
export default index;

// 这样也可以看出，如果the-answer如果打包进来，应该是：
var answer = 42;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 截取dist/example4/bundle.js`</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopDefault</span> (<span class="hljs-params">ex</span>) </span>{ <span class="hljs-keyword">return</span> (ex &amp;&amp; (<span class="hljs-keyword">typeof</span> ex === <span class="hljs-string">'object'</span>) &amp;&amp; <span class="hljs-string">'default'</span> <span class="hljs-keyword">in</span> ex) ? ex[<span class="hljs-string">'default'</span>] : ex; }

<span class="hljs-keyword">var</span> answer = _interopDefault(<span class="hljs-built_in">require</span>(<span class="hljs-string">'the-answer'</span>));

<span class="hljs-comment">// 可以看到the-answer并没有打包进来，还得用node的require去请求，然后经过函数转化才能拿到the-answer的输出值</span>
<span class="hljs-comment">// 我们可以看一下 node_modules 下的 the-answer 模块暴露出的内容</span>

<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> index;

<span class="hljs-comment">// 这样也可以看出，如果the-answer如果打包进来，应该是：</span>
<span class="hljs-keyword">var</span> answer = <span class="hljs-number">42</span>;</code></pre>
<p><strong>现在我们需要一个插件 <a href="https://github.com/rollup/rollup-plugin-node-resolve" rel="nofollow noreferrer" target="_blank">rollup-plugin-node-resolve </a> 来告诉 Rollup 如何查找外部模块</strong>  </p>
<p><code>npm i -D rollup-plugin-node-resolve</code>  </p>
<p>将插件加入配置文件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/example4/main.js',
    output: {
        file: 'dist/example4/bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    input: <span class="hljs-string">'src/example4/main.js'</span>,
    output: {
        file: <span class="hljs-string">'dist/example4/bundle.js'</span>,
        format: <span class="hljs-string">'cjs'</span>
    },
    plugins: [
        resolve()
    ]
}</code></pre>
<p>再次运行<code>rollup -c src/example4/rollup.config.js</code> 没有警告 ,我们看一下打包好的<code>dist/example4/bundle.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

// the-answer的输出已经打包进来了
var index = 42;

function main () {
    console.log('the answer is ' + index);
}

module.exports = main;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// the-answer的输出已经打包进来了</span>
<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + index);
}

<span class="hljs-built_in">module</span>.exports = main;</code></pre>
<h3 id="articleHeader10">example5</h3>
<p>类似 <code>the-answer</code> 一些库因为 <code>package.json</code>里的module选项可以让我们正常导入的ES6模块。 但是目前，npm中的大多数包都是以CommonJS模块的形式出现的。 在它们更改之前，我们需要将CommonJS模块转换为 ES2015 供 Rollup 处理。  </p>
<p><a href="https://github.com/rollup/rollup-plugin-commonjs" rel="nofollow noreferrer" target="_blank">rollup-plugin-commonjs</a> 插件就是用来将 CommonJS 转换成 ES2015 模块的。通常，这个插件会跟 <code>rollup-plugin-node-resolve</code>配合使用，这样就能打包 <code>node_modules</code>依赖中的CommonJS。  <br><code>rollup-plugin-commonjs</code> 应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测。  </p>
<p>安装：<code>npm i -D rollup-plugin-commonjs</code>  </p>
<p>在 <code>src/example5</code>文件夹下新建 <code>main.js</code> 和 <code>module5.js</code> <code>rollup.config.js</code>， 用来验证插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// module5.js
exports.named = 'cfangxu';
//module.exports = {named: 'cfangxu'} 这个会报错，但是插件文档里说是好的，给他提一个issues

// main.js
import { named } from './module5.js';
export default function () {
   console.log(named);
}

// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
   input: 'src/example5/main.js',
   output: {
       file: 'dist/example5/bundle.js',
       format: 'cjs'
   },
   plugins: [
       resolve({
           jsnext: true,
           main: true
       }),
       commonjs()
   ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// module5.js</span>
exports.named = <span class="hljs-string">'cfangxu'</span>;
<span class="hljs-comment">//module.exports = {named: 'cfangxu'} 这个会报错，但是插件文档里说是好的，给他提一个issues</span>

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> { named } <span class="hljs-keyword">from</span> <span class="hljs-string">'./module5.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(named);
}

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
   <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example5/main.js'</span>,
   <span class="hljs-attr">output</span>: {
       <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example5/bundle.js'</span>,
       <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
   },
   <span class="hljs-attr">plugins</span>: [
       resolve({
           <span class="hljs-attr">jsnext</span>: <span class="hljs-literal">true</span>,
           <span class="hljs-attr">main</span>: <span class="hljs-literal">true</span>
       }),
       commonjs()
   ]
}</code></pre>
<p><strong>注意：</strong> 如果引入的是 <code>node_modules</code>里的模块  <br>例如：<code>import { named } from 'my-lib';</code>  <br>要启用 <code>namedExports</code> 选项显示的指定命名输出。当然你也可以整体都引入  <br>即： <code>import all from 'my-lib';</code></p>
<h3 id="articleHeader11">example6</h3>
<p>external 接受一个模块名称的数组或一个接受模块名称的函数(如果它被视为外部引用（externals）则返回true)  </p>
<p>安装 <code>lodash</code>： <code>npm i -S lodash</code>  </p>
<p>在 <code>src/example6</code> 文件夹中新建 <code>main.js</code> 和 <code>rollup.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import answer from 'the-answer';
import _ from 'lodash';

// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/example6/main.js',
    output: {
        file: 'dist/example6/bundle.js',
        format: 'umd',
        name: 'example6'
    },
    plugins: [
        resolve()
    ],
    external: ['lodash']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;

export <span class="hljs-keyword">default</span> {
    input: <span class="hljs-string">'src/example6/main.js'</span>,
    output: {
        <span class="hljs-keyword">file</span>: <span class="hljs-string">'dist/example6/bundle.js'</span>,
        format: <span class="hljs-string">'umd'</span>,
        name: <span class="hljs-string">'example6'</span>
    },
    plugins: [
        resolve()
    ],
    external: [<span class="hljs-string">'lodash'</span>]
}</code></pre>
<p>配置文件中加入 <code>external</code> 就不会把第三方的库打包进我们最后的文件了。可以在 <code>src/example5/rollup.config.js</code> 中把 <code>external</code> 注释掉看看打包后的文件，会把整个 <code>lodsh</code> 打包进来。  <br><em>扩展：</em> 如果用到 <code>lodsh</code> ，可以使用  <a href="https://github.com/lodash/babel-plugin-lodash" rel="nofollow noreferrer" target="_blank">babel-plugin-lodash</a> 来最优选择lodash模块。</p>
<h3 id="articleHeader12">example7</h3>
<p>我们在项目中有很大概率用到 <code>babel</code> ，使用 Babel 和 Rollup 的最简单方法是使用 <a href="https://github.com/rollup/rollup-plugin-babel" rel="nofollow noreferrer" target="_blank">rollup-plugin-babel</a>  </p>
<p>安装： <code>npm i -D rollup-plugin-babel</code>  </p>
<p>在 <code>src/example7</code>文件夹下新建 <code>main.js</code> <code>.babelrc</code> <code>rollup.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import answer from 'the-answer';

export default function () {
    console.log(`the answer is ${answer}`);
}

//.babelrc
{
    &quot;presets&quot;: [
        [&quot;env&quot;,{
            &quot;modules&quot;: false
        }]
    ],
    &quot;plugins&quot;: [
        &quot;external-helpers&quot;
    ]
}

//rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/example7/main.js',
    output: {
        file: 'dist/example7/bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: true
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`the answer is <span class="hljs-subst">${answer}</span>`</span>);
}

<span class="hljs-comment">//.babelrc</span>
{
    <span class="hljs-string">"presets"</span>: [
        [<span class="hljs-string">"env"</span>,{
            <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>
        }]
    ],
    <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"external-helpers"</span>
    ]
}

<span class="hljs-comment">//rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example7/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example7/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        resolve(),
        babel({
            <span class="hljs-attr">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
            <span class="hljs-attr">externalHelpers</span>: <span class="hljs-literal">true</span>
        })
    ]
}</code></pre>
<p>安装： <code>npm i -D babel-core babel-preset-env babel-plugin-external-helpers</code></p>
<p>运行：<code>rollup -c src/example7/rollup.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// dist/example7/bundle.js
'use strict';

var index = 42;

function main () {
    // 转成了ES5的语法了
    console.log('the answer is ' + index);
}

module.exports = main;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// dist/example7/bundle.js</span>
<span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 转成了ES5的语法了</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + index);
}

<span class="hljs-built_in">module</span>.exports = main;
</code></pre>
<p><em>说明</em></p>
<ul><li>
<code>babel-plugin-external-helpers</code> 这个模块是在 <code>.babelrc</code> 文件中体现，目的是让babel转义出来的帮助性代码只在该文件的头部出现一次，而不会再每个引入的模块中加入，如果不想把这些帮助性的代码打包进你的文件，需要在rollup的配置文件中加入 <code>externalHelpers: true</code>，这样就会引用一个全局的<code>babelHelpers</code> 对象</li></ul>
<h3 id="articleHeader13">推荐资料</h3>
<ul>
<li><a href="http://www.rollupjs.com/" rel="nofollow noreferrer" target="_blank">rollup.js 中文文档</a></li>
<li><a href="https://github.com/rollup/rollup/wiki/Plugins" rel="nofollow noreferrer" target="_blank">Rollup 插件列表</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手带你走进下一代的ES6模块打包工具—Rollup

## 原文链接
[https://segmentfault.com/a/1190000012515648](https://segmentfault.com/a/1190000012515648)

