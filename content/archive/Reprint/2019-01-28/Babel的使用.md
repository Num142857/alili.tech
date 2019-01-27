---
title: 'Babel的使用' 
date: 2019-01-28 2:30:09
hidden: true
slug: 2ntreaawhov
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Babel介绍</h2>
<p>Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。</p>
<blockquote><p>15 年 11 月，Babel 发布了 6.0 版本。相较于前一代 Babel 5，新一代 Babel 更加模块化， 将所有的转码功能以插件的形式分离出去，默认只提供 babel-core。原本只需要装一个 babel ，现在必须按照自己的需求配置，灵活性提高的同时也提高了使用者的学习成本。</p></blockquote>
<p><strong>npm i babel</strong><br>已经弃用，你能下载到的仅仅是一段 console.warn，告诉你 babel 6 不再以大杂烩的形式提供转码功能了。</p>
<p>例如，Babel 能够将新的 ES2015 箭头函数语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fun = () => console.log('babel')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> fun = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'babel'</span>)</code></pre>
<p>转译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
var fun = function fun() {
  return console.log('babel');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">var</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'babel'</span>);
};</code></pre>
<p>不过 Babel 的用途并不止于此，它支持语法扩展，能支持像 React 所用的 JSX 语法，更重要的是，Babel 的一切都是简单的插件，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。<br>再进一步，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。</p>
<h2 id="articleHeader1">使用 Babel</h2>
<h3 id="articleHeader2"><code>babel-cli</code></h3>
<p>Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。</p>
<p>让我们先全局安装它来学习基础知识。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --global babel-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> babel-cli</code></pre>
<p>我们可以这样来编译我们的第一个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ babel my-file.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">$ babel <span class="hljs-keyword">my</span>-<span class="hljs-built_in">file</span>.js</code></pre>
<p>这将把编译后的结果直接输出至终端。使用 --out-file 或着 -o 可以将结果写入到指定的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ babel example.js --out-file compiled.js
# 或
$ babel example.js -o compiled.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ <span class="hljs-keyword">babel </span>example.<span class="hljs-keyword">js </span>--out-file compiled.<span class="hljs-keyword">js
</span><span class="hljs-comment"># 或</span>
$ <span class="hljs-keyword">babel </span>example.<span class="hljs-keyword">js </span>-o compiled.<span class="hljs-keyword">js</span></code></pre>
<p>如果我们想要把一个目录整个编译成一个新的目录，可以使用 --out-dir 或者 -d。.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ babel src --out-dir lib
# 或
$ babel src -d lib" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>$ babel src --<span class="hljs-keyword">out</span>-dir <span class="hljs-class"><span class="hljs-keyword">lib</span></span>
<span class="hljs-comment"># 或</span>
$ babel src -d <span class="hljs-class"><span class="hljs-keyword">lib</span></span></code></pre>
<h3 id="articleHeader3"><code>babel-core</code></h3>
<p>如果你需要以编程的方式来使用 Babel，可以使用 babel-core 这个包。</p>
<p>babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。<br>首先安装 babel-core。.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-core" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> babel-core</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var babel = require(&quot;babel-core&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">var</span> <span class="hljs-keyword">babel </span>= <span class="hljs-meta">require</span>(<span class="hljs-string">"babel-core"</span>)<span class="hljs-comment">;</span></code></pre>
<p>字符串形式的 JavaScript 代码可以直接使用 babel.transform 来编译。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel.transform(&quot;code();&quot;, options);
// => { code, map, ast }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">babel.transform("code();", </span>options)<span class="hljs-comment">;</span>
// =&gt; { <span class="hljs-meta">code</span>, <span class="hljs-meta">map</span>, ast }</code></pre>
<p>如果是文件的话，可以使用异步 api：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel.transformFile(&quot;filename.js&quot;, options, function(err, result) {
  result; // => { code, map, ast }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">babel.transformFile(<span class="hljs-string">"filename.js"</span>, options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
  result; <span class="hljs-comment">// =&gt; { code, map, ast }</span>
});</code></pre>
<p>或者是同步 api：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel.transformFileSync(&quot;filename.js&quot;, options);
// => { code, map, ast }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">babel.transformFileSync("filename.js", </span>options)<span class="hljs-comment">;</span>
// =&gt; { <span class="hljs-meta">code</span>, <span class="hljs-meta">map</span>, ast }</code></pre>
<h3 id="articleHeader4">其他用法</h3>
<p>还可以通过<code>babel-register</code>和<code>babel-node</code>使用Babel，但由于这两种用法不适合生产环境故省略。</p>
<h2 id="articleHeader5">配置 Babel</h2>
<p>你或许已经注意到了，目前为止通过运行 Babel 自己我们并没能“翻译”代码，而仅仅是把代码从一处拷贝到了另一处。原因就是从Babel 6以后, 默认的插件被移除, 如果没有指定一个插件，Babel将会原样输出, 不会进行编译。</p>
<p>你可以通过安装<strong>插件</strong>（plugins）或<strong>预设</strong>（presets，也就是一组插件）来指示 Babel 去做什么事情。</p>
<p>插件只是单一的功能，例如</p>
<ul>
<li><p>es2015-arrow-functions</p></li>
<li><p>es2015-classes</p></li>
<li><p>es2015-for-of</p></li>
<li><p>es2015-spread</p></li>
</ul>
<p>以下是安装箭头函数的插件方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-plugin-transform-es2015-arrow-functions" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev babel-plugin-<span class="hljs-built_in">transform</span>-es2015-arrow-<span class="hljs-built_in">functions</span></code></pre>
<p>如果我们一个一个引人功能单一的插件的话显得特别麻烦，通常我们用的更多的是预设。插件和预设通常写入到配置文件中。可以将配置写入<code>package.json</code>的‘babel’属性里，或者是一个单独的<code>.babelrc</code>文件。</p>
<h3 id="articleHeader6"><code>.babelrc</code></h3>
<p>在我们告诉 Babel 该做什么之前，你需要做的就是在项目的根路径下创建 <code>.babelrc</code> 文件。然后输入以下内容作为开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [],
  &quot;plugins&quot;: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [],
  <span class="hljs-attr">"plugins"</span>: []
}</code></pre>
<p>这个文件就是用来让 Babel 做你要它做的事情的配置文件。</p>
<h4><code>babel-preset-es2015</code></h4>
<p>预设 babel-preset 系列打包了一组插件，类似于餐厅的套餐。如 <code>babel-preset-es2015</code> 打包了 es6 的特性，<code>babel-preset-stage-0</code> 打包处于 strawman 阶段的语法</p>
<p>我们需要安装 "es2015" Babel 预设：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev babel-preset-es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-es2015</code></pre>
<p>我们修改 <code>.babelrc</code> 来包含这个预设。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [
+     &quot;es2015&quot;
    ],
    &quot;plugins&quot;: []
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"presets"</span>: [
+     <span class="hljs-string">"es2015"</span>
    ],
    <span class="hljs-attr">"plugins"</span>: []
  }</code></pre>
<p>同样的，还有<code>babel-preset-2016</code>，<code>babel-preset-2017</code>。</p>
<h4><code>babel-preset-latest</code></h4>
<p>latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）。即总是包含最新的编译插件。</p>
<h4><code>babel-preset-env</code></h4>
<p>上面提到的各种preset的问题就是: 它们都太”重”了, 即包含了过多在某些情况下不需要的功能. 比如, 现代的浏览器大多支持ES6的generator, 但是如果你使用babel-preset-es2015, 它会将generator函数编译为复杂的ES5代码, 这是没有必要的。但使用babel-preset-env, 我们可以声明环境, 然后该preset就会只编译包含我们所声明环境缺少的特性的代码，因此也是比较<strong>推荐</strong>的方式。</p>
<p>安装<code>babel-preset-env</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-preset-env --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install babel-preset-env --save-dev</code></pre>
<p>添加配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>]
}</code></pre>
<p>当没有添加任何的配置选项时，<code>babel-preset-env</code>默认行为是和<code>babel-preset-latest</code>是一样的。<br>下面我们通过一些例子来看<code>babel-preset-env</code>的配置是如何使用的：</p>
<ul><li><p>指定支持主流浏览器最新的两个版本以及IE 7+:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;presets&quot;: [
    [
      &quot;env&quot;,
      {
        &quot;targets&quot;: {
          &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;ie >= 7&quot;]
        }
      }
    ]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"presets"</span>: [
    [
      <span class="hljs-string">"env"</span>,
      {
        <span class="hljs-attr">"targets"</span>: {
          <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"ie &gt;= 7"</span>]
        }
      }
    ]
  ]
}</code></pre>
<ul><li><p>支持超过市场份额5%的浏览器:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;targets&quot;: {
  &quot;browsers&quot;: &quot;> 5%&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"targets"</span>: {
  <span class="hljs-attr">"browsers"</span>: <span class="hljs-string">"&gt; 5%"</span>
}</code></pre>
<ul><li><p>某个固定版本的浏览器:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;targets&quot;: {
  &quot;chrome&quot;: 56
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"targets"</span>: {
  <span class="hljs-attr">"chrome"</span>: <span class="hljs-number">56</span>
}</code></pre>
<p>更多的配置请查看官方<a href="http://babeljs.io/docs/plugins/preset-env/" rel="nofollow noreferrer" target="_blank">文档</a></p>
<h4><code>babel-preset-stage-x</code></h4>
<blockquote><p>官方预设(preset), 有两种，一个是按年份(babel-preset-2017)，一个是按阶段(babel-preset-stage-0)。 这主要是根据TC39 委员会ECMASCRPIT 发布流程来制定的。TC39 委员会决定，从2016年开始，每年都会发布一个版本，它包括每年期限内完成的所有功能，同时ECMAScript的版本号也按年份编制，就有了ES2016, ES2017。所以也就有了babel-present-2016, babel-preset-2017， 对每一年新增的语法进行转化。babel-preset-latest 就是把所有es2015, es2016, es2017 全部包含在一起了。</p></blockquote>
<p>最终在阶段 4 被标准正式采纳。<br>以下是4 个不同阶段的（打包的）预设：</p>
<ul>
<li><p><code>babel-preset-stage-0</code></p></li>
<li><p><code>babel-preset-stage-1</code></p></li>
<li><p><code>babel-preset-stage-2</code></p></li>
<li><p><code>babel-preset-stage-3</code></p></li>
</ul>
<blockquote><p>注意 stage-4 预设是不存在的因为它就是上面的 <code>es2017</code> 预设。</p></blockquote>
<p>以上每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。也就是说这些stage包含的特性是比latest更新的特性但还未被写入标准进行发布。</p>
<p>使用的时候只需要安装你想要的阶段就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev babel-preset-stage-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-stage<span class="hljs-number">-2</span></code></pre>
<p>然后添加进你的 <code>.babelrc</code> 配置文件。但是要注意如果没有提供es2017相关的预设，preset-stage-X 这种阶段性的预设也不能用。</p>
<h2 id="articleHeader7">执行 Babel 生成的代码</h2>
<p>Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。</p>
<p>为了达成使用这些新API的目的，社区又有2个实现流派：babel-polyfill和babel-runtime+babel-plugin-transform-runtime。</p>
<p>这两个模块功能几乎相同，就是转码新增 api，模拟 es6 环境，但实现方法完全不同。babel-polyfill 的做法是将全局对象通通污染一遍，比如想在 node 0.10 上用 Promise，调用 babel-polyfill 就会往 global 对象挂上 Promise 对象。对于普通的业务代码没有关系，但如果用在模块上就有问题了，会把模块使用者的环境污染掉。</p>
<p>babel-runtime 的做法是自己手动引入 helper 函数，还是上面的例子，const Promise = require('babel-runtime/core-js/promise') 就可以引入 Promise。</p>
<p>但 babel-runtime 也有问题，第一，很不方便，第二，在代码中中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码。所以，babel 又开发了 babel-plugin-transform-runtime，这个模块会将我们的代码重写，如将 Promise 重写成 _Promise（只是打比方），然后引入_Promise helper 函数。这样就避免了重复打包代码和手动引入模块的痛苦。</p>
<h3 id="articleHeader8"><code>babel-polyfill</code></h3>
<p>为了解决这个问题，我们使用一种叫做 Polyfill（代码填充，也可译作兼容性补丁） 的技术。 简单地说，polyfill即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。能让你提前使用还不可用的 APIs，<code>Array.from</code> 就是一个例子。<br>Babel 用了优秀的 core-js 用作 polyfill，并且还有定制化的 regenerator 来让 generators（生成器）和 async functions（异步函数）正常工作。<br>要使用 Babel polyfill，首先用 npm 安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save babel-polyfill" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-polyfill</span></code></pre>
<p>然后只需要在文件顶部导入 polyfill 就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;babel-polyfill&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">"babel-polyfill"</span>;</code></pre>
<h3 id="articleHeader9"><code>babel-runtime</code></h3>
<p>与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。只不过，babel-polyfill 是针对全局环境的，引入它，我们的浏览器就好像具备了规范里定义的完整的特性 – 虽然原生并未实现。<br>babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 require(‘babel-runtime/core-js/promise’) ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。<br>通过安装 <code>babel-plugin-transform-runtime</code> 和 <code>babel-runtime</code> 来开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save-dev babel-plugin-transform-runtime</span>
$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-runtime</span></code></pre>
<p>然后更新 <code>.babelrc</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
    &quot;plugins&quot;: [
      &quot;transform-runtime&quot;,
      &quot;transform-es2015-classes&quot;
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>    {
    <span class="hljs-attr">"plugins"</span>: [
      <span class="hljs-string">"transform-runtime"</span>,
      <span class="hljs-string">"transform-es2015-classes"</span>
    ]
  }</code></pre>
<p>现在，Babel 会把这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Foo {
  method() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  method() {}
}</code></pre>
<p>编译成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _classCallCheck from &quot;babel-runtime/helpers/classCallCheck&quot;;
import _createClass from &quot;babel-runtime/helpers/createClass&quot;;

let Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: &quot;method&quot;,
    value: function method() {}
  }]);

  return Foo;
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> _classCallCheck <span class="hljs-keyword">from</span> <span class="hljs-string">"babel-runtime/helpers/classCallCheck"</span>;
<span class="hljs-keyword">import</span> _createClass <span class="hljs-keyword">from</span> <span class="hljs-string">"babel-runtime/helpers/createClass"</span>;

<span class="hljs-keyword">let</span> Foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Foo);
  }

  _createClass(Foo, [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"method"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">method</span>(<span class="hljs-params"></span>) </span>{}
  }]);

  <span class="hljs-keyword">return</span> Foo;
}();</code></pre>
<p>这样就不需要把 <code>_classCallCheck</code> 和 <code>_createClass</code> 这两个助手方法放进每一个需要的文件里去了。</p>
<p>那什么时候用 <code>babel-polyfill</code> 什么时候用 <code>babel-runtime</code> 呢？如果你不介意污染全局变量（如上面提到的业务代码），放心大胆地用 <code>babel-polyfill</code> ；而如果你在写模块，为了避免污染使用者的环境，没的选，只能用 <code>babel-runtime</code> + <code>babel-plugin-transform-runtime</code>。</p>
<h3 id="articleHeader10"><code>options</code></h3>
<p>很多预设和插件都有选项用于配置他们自身的行为。 例如，很多转换器都有“宽松”模式，通过放弃一些标准中的行为来生成更简化且性能更好的代码。</p>
<p>要为插件添加选项，只需要做出以下更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
      &quot;transform-runtime&quot;,
-     &quot;transform-es2015-classes&quot;,
+     [&quot;transform-es2015-classes&quot;, { &quot;loose&quot;: true }]
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"plugins"</span>: [
      <span class="hljs-string">"transform-runtime"</span>,
-     <span class="hljs-string">"transform-es2015-classes"</span>,
+     [<span class="hljs-string">"transform-es2015-classes"</span>, { <span class="hljs-string">"loose"</span>: <span class="hljs-literal">true</span> }]
    ]
}</code></pre>
<p>plugins/presets排序:</p>
<ul>
<li><p>具体而言，plugins优先于presets进行编译。</p></li>
<li><p>plugins按照数组的index增序(从数组第一个到最后一个)进行编译。</p></li>
<li><p>presets按照数组的index倒序(从数组最后一个到第一个)进行编译。因为作者认为大部分会把presets写成["es2015", "stage-0"]。具体细节可以看这个。</p></li>
</ul>
<h2 id="articleHeader11">webpack 中定义 babel-loader</h2>
<p>很少有大型项目仅仅需要 babel，一般都是 babel 配合着 webpack 或 glup 等编译工具一起上的。<br>为了显出 babel 的能耐，我们分别配个用 <code>babel-polyfill</code> 和 <code>babel-runtime</code> 、支持 react 的webpack.config.js<br>先来配使用 <code>babel-runtime</code> 的：<br>首先安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-plugin-transform-runtime </span>webpack --save-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-runtime --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-runtime </span>--save</code></pre>
<p>然后配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      plugins: ['transform-runtime'],
      presets: [
        [&quot;env&quot;, {
          &quot;targets&quot;: {
            &quot;chrome&quot;: 52
          },
          &quot;modules&quot;: false,
          &quot;loose&quot;: true
        }],
        'stage-2',
        'react'
      ],
    }
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [{
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
    <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>),
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'transform-runtime'</span>],
      <span class="hljs-attr">presets</span>: [
        [<span class="hljs-string">"env"</span>, {
          <span class="hljs-string">"targets"</span>: {
            <span class="hljs-string">"chrome"</span>: <span class="hljs-number">52</span>
          },
          <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-string">"loose"</span>: <span class="hljs-literal">true</span>
        }],
        <span class="hljs-string">'stage-2'</span>,
        <span class="hljs-string">'react'</span>
      ],
    }
  }]
}</code></pre>
<p>需要注意的是，<code>babel-runtime</code> 虽然没有出现在配置里，但仍然需要安装，因为 <code>transform-runtime</code> 依赖它。<br>再来个 <code>babel-polyfill</code> 的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [
  'babel-polyfill',
  'src/index.jsx',
],

module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      presets: [
        [&quot;env&quot;, {
          &quot;targets&quot;: {
            &quot;chrome&quot;: 52
          },
          &quot;modules&quot;: false,
          &quot;loose&quot;: true
        }],
        'stage-2',
        'react',
      ],
    }
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: [
  <span class="hljs-string">'babel-polyfill'</span>,
  <span class="hljs-string">'src/index.jsx'</span>,
],

<span class="hljs-attr">module</span>: {
  <span class="hljs-attr">loaders</span>: [{
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
    <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>),
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">presets</span>: [
        [<span class="hljs-string">"env"</span>, {
          <span class="hljs-string">"targets"</span>: {
            <span class="hljs-string">"chrome"</span>: <span class="hljs-number">52</span>
          },
          <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-string">"loose"</span>: <span class="hljs-literal">true</span>
        }],
        <span class="hljs-string">'stage-2'</span>,
        <span class="hljs-string">'react'</span>,
      ],
    }
  }]
}</code></pre>
<blockquote><p>参考文档：<br><a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">http://babeljs.io/</a><br><a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md" rel="nofollow noreferrer" target="_blank">https://github.com/thejamesky...</a><br><a href="https://excaliburhan.com/post/babel-preset-and-plugins.html" rel="nofollow noreferrer" target="_blank">https://excaliburhan.com/post...</a><br><a href="https://icyfish.me/2017/05/18/babel-preset-env/" rel="nofollow noreferrer" target="_blank">https://icyfish.me/2017/05/18...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Babel的使用

## 原文链接
[https://segmentfault.com/a/1190000008159877](https://segmentfault.com/a/1190000008159877)

