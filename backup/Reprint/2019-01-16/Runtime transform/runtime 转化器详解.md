---
title: 'Runtime transform/runtime 转化器详解' 
date: 2019-01-16 2:30:08
hidden: true
slug: myr5wgoeqj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Runtime transform 运行时编译es6</h1>
<p><strong>入口文件引用作为辅助和内建，自动添加垫片到你的当前代码模块而非全局</strong></p>
<p>这个插件建议放在 library/tool中</p>
<p><strong>注意：</strong><br>实例方法，例如<code>"foobar".includes("foo")</code>将不能够使用，因为它将修正内置的垫片。</p>
<h2 id="articleHeader1">为什么使用它 why</h2>
<p>Babel对常用的函数使用非常小的辅助（内置的垫片比较少），例如<code>_extend</code>。默认情况下它将会添加到每个引用的文件。这种重复有时候是非常没必要的。特别是你的应用分散在很多文件中。</p>
<p>这是<code>transform-runtime</code>插件之所以产生的原因：所有的这些辅助（垫片）将会引用<code>babel-runtime</code>来避免编译时重复。runtime将会编译到你的build中。</p>
<p>另一个目的是，这个转换器为你的代码创建了一个沙盒环境。如果你使用<code>babel-polyfill</code>并且把它内置提供<code>promise</code>,<code>set</code>,<code>map</code>这样的对象或功能，他们将会污染全局环境。也许在一个应用中或者命令行工具中没问题，但是如果你的代码是个库，你想发布给其他人使用，因为使用的人可能在各种各样的执行环境中，所以可能导致错误，不能执行。</p>
<p>转换器<code>transformer</code>会将这些内置（垫片）设置别名到<code>core-js</code>中，因此你可以不使用<code>require</code>来无缝的使用（垫片中的对象和方法）。</p>
<p>如何生效和工作，请看<a href="http://babeljs.io/docs/plugins/transform-runtime/#technical-details" rel="nofollow noreferrer" target="_blank">技术细节</a></p>
<h1 id="articleHeader2">安装</h1>
<p><strong>注意：生产版本(Production) vs 开发版本(development)依赖</strong></p>
<p>在大多数情况下，你需要安装<code>babel-plugin-transform-runtime</code>作为开发版本的依赖（设置--save-dev）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-plugin-transform-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev babel-plugin-<span class="hljs-built_in">transform</span>-runtime</code></pre>
<p>并且<code>babel-runtime</code>作为生产版本依赖（设置 --save）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save babel-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-runtime</span></code></pre>
<p>转换器插件一般只用在开发时，而里面的实际垫片(runtime itself)的代码在你部署或发布库时是需要放到其中的。</p>
<p>请看下面的例子</p>
<hr>
<h1 id="articleHeader3">用法</h1>
<h2 id="articleHeader4">通过<code>.babelrc</code>（推荐）</h2>
<p>把下面的代码添加到你的<code>babelrc</code>文件中（这里说的是两种情况）：</p>
<p><code>默认设置选项时的写法</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p><code>使用自己设置设置</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [
    [&quot;transform-runtime&quot;, {
      &quot;helpers&quot;: false,
      &quot;polyfill&quot;: false,
      &quot;regenerator&quot;: true,
      &quot;moduleName&quot;: &quot;babel-runtime&quot;
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"plugins"</span>: [
    [<span class="hljs-string">"transform-runtime"</span>, {
      <span class="hljs-attr">"helpers"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">"polyfill"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">"regenerator"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">"moduleName"</span>: <span class="hljs-string">"babel-runtime"</span>
    }]
  ]
}</code></pre>
<h2 id="articleHeader5">通过命令行(CLI)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel --plugins transform-runtime script.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">babel <span class="hljs-comment">--plugins transform-runtime script.js</span></code></pre>
<h2 id="articleHeader6">通过Node 接口 (Node API)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-core&quot;).transform(&quot;code&quot;,{
    plugins:[&quot;transform-runtime&quot;]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"babel-core"</span>)</span></span>.<span class="hljs-attribute">transform</span>(<span class="hljs-string">"code"</span>,{
    plugins:[<span class="hljs-string">"transform-runtime"</span>]
})</code></pre>
<h1 id="articleHeader7">选项/设置</h1>
<h2 id="articleHeader8">辅助(helpers)</h2>
<p>默认值是:<code>true</code></p>
<p>表示是否开启内联的babel helpers(即babel或者环境本来的存在的垫片或者某些对象方法函数)(<code>clasCallCheck</code>,<code>extends</code>,etc)在调用模块名字(<code>moduleName</code>)时将被替换名字。</p>
<p>查看<a href="http://babeljs.io/docs/plugins/transform-runtime/#helper-aliasing" rel="nofollow noreferrer" target="_blank">详情</a></p>
<h2 id="articleHeader9">垫片/polyfill</h2>
<p>默认值是:`true'</p>
<p>表示是否把内置的东西(<code>Promise</code>,<code>Set</code>,<code>Map</code>,tec)转换成非全局污染垫片。<br>查看<a href="http://babeljs.io/docs/plugins/transform-runtime/#core-js-aliasing" rel="nofollow noreferrer" target="_blank">详情</a></p>
<h2 id="articleHeader10">重新生成/regenerator</h2>
<p>默认值是:<code>true</code></p>
<p>是否开启<code>generator</code>函数转换成使用<code>regenerator runtime</code>来避免污染全局域。</p>
<p>查看<a href="http://babeljs.io/docs/plugins/transform-runtime/#regenerator-aliasing" rel="nofollow noreferrer" target="_blank">详情</a></p>
<h2 id="articleHeader11">模块名字/moduleName</h2>
<p>默认值:<code>babel-runtime</code></p>
<p>当调用辅助（内置垫片）设置模块（module）名字/路径.</p>
<p>例子：<br><code>json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;moduleName&quot;: &quot;flavortown/runtime&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"moduleName"</span>: <span class="hljs-string">"flavortown/runtime"</span>
}</code></pre>
<p><code>javascript</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import extends from 'flavortown/runtime/helpers/extends';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs capnproto"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-keyword">extends</span> <span class="hljs-keyword">from</span> 'flavortown/runtime/helpers/<span class="hljs-keyword">extends</span>';</code></pre>
<h1 id="articleHeader12">技术细节/Techincal details</h1>
<p><code>runtime</code>转换器插件主要做了三件事：</p>
<ul>
<li><p>当你使用generators/async方法、函数时自动调用<code>babel-runtime/regenerator</code></p></li>
<li><p>当你使用ES6 的Map或者内置的东西时自动调用<code>babel-runtime/core-js</code></p></li>
<li><p>移除内联babel helpers并替换使用<code>babel-runtime/helpers</code>来替换</p></li>
</ul>
<p>总的来说一句话，你可以使用内置的一些东西例如<code>Promise</code>,<code>Set</code>,<code>Symbol</code>等，就像使用无缝的使用<code>polyfill</code>,来使用babel 特性，并且无全局污染、极高代码库适用性。</p>
<h1 id="articleHeader13">再生器别名 Regenerator aliasing</h1>
<p>无论你什么时候使用generator函数或者异步函数（async function).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* foo(){

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{

}</code></pre>
<p>下面的将被生成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var _marked = [foo].map(regeneratorRuntime.mark);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
      case &quot;end&quot;:
        return _context.stop();
    }
  }, _marked[0], this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> _marked = [foo].map(regeneratorRuntime.mark);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo$</span>(<span class="hljs-params">_context</span>) </span>{
    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) <span class="hljs-keyword">switch</span> (_context.prev = _context.next) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
        <span class="hljs-keyword">return</span> _context.stop();
    }
  }, _marked[<span class="hljs-number">0</span>], <span class="hljs-keyword">this</span>);
}</code></pre>
<p>这种是不太理想的。因为你regenerator运行时会污染全局域的。<br>作为替代你需要<code>runtime</code>转换器来编译成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var _regenerator = require(&quot;babel-runtime/regenerator&quot;);

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }

var _marked = [foo].map(_regenerator2.default.mark);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
      case &quot;end&quot;:
        return _context.stop();
    }
  }, _marked[0], this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> _regenerator = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-runtime/regenerator"</span>);

<span class="hljs-keyword">var</span> _regenerator2 = _interopRequireDefault(_regenerator);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }

<span class="hljs-keyword">var</span> _marked = [foo].map(_regenerator2.default.mark);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo$</span>(<span class="hljs-params">_context</span>) </span>{
    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) <span class="hljs-keyword">switch</span> (_context.prev = _context.next) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
        <span class="hljs-keyword">return</span> _context.stop();
    }
  }, _marked[<span class="hljs-number">0</span>], <span class="hljs-keyword">this</span>);
}</code></pre>
<p>这意味着在使用regenerator时不会污染当前的全局环境。</p>
<h1 id="articleHeader14">core-js的别名化/core-js aliasing</h1>
<p>有时你想去使用内置的的东西(<code>Promise</code>,<code>Set</code>,<code>Map</code>,etc)。通常情况下你会使用一个全局的垫片。<br><code>runtime</code>转换器所做的是转换成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sym = Symbol();

var promise = new Promise;

console.log(arr[Symbol.iterator]());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>var sym = Symbol();

var promise = new Promise;

console.log(arr[<span class="hljs-string">Symbol.iterator</span>](<span class="hljs-link"></span>));</code></pre>
<p>添加到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var _getIterator2 = require(&quot;babel-runtime/core-js/get-iterator&quot;);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require(&quot;babel-runtime/core-js/promise&quot;);

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require(&quot;babel-runtime/core-js/symbol&quot;);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }

var sym = (0, _symbol2.default)();

var promise = new _promise2.default();

console.log((0, _getIterator3.default)(arr));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> _getIterator2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-runtime/core-js/get-iterator"</span>);

<span class="hljs-keyword">var</span> _getIterator3 = _interopRequireDefault(_getIterator2);

<span class="hljs-keyword">var</span> _promise = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-runtime/core-js/promise"</span>);

<span class="hljs-keyword">var</span> _promise2 = _interopRequireDefault(_promise);

<span class="hljs-keyword">var</span> _symbol = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-runtime/core-js/symbol"</span>);

<span class="hljs-keyword">var</span> _symbol2 = _interopRequireDefault(_symbol);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }

<span class="hljs-keyword">var</span> sym = (<span class="hljs-number">0</span>, _symbol2.default)();

<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> _promise2.default();

<span class="hljs-built_in">console</span>.log((<span class="hljs-number">0</span>, _getIterator3.default)(arr));</code></pre>
<p>这意味着你可以无缝的使用本地内置的方法而不用考虑是来自垫片还是本地。。<br><strong>警告,实例方法将不能使用，例如"foobar".includes('foo')</strong></p>
<h1 id="articleHeader15">辅助重命名 / Helper aliasing</h1>
<p>通常babel会把辅助放在文件的顶部做一些常用任务来避免重复导入。<br>有时这些辅助的体积有点大并且不需要的没有用的东西也在其中。<code>runtime</code>转换器把所有的辅助转换到一个模块中（按他的意思是说只是把用到的转换到其中）。</p>
<p>如下演示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
}</code></pre>
<p>一般的转化成（即不是用runtime）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(&quot;Cannot call a class as a function&quot;); } }

var Person = function Person() {
  _classCallCheck(this, Person);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{ <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Cannot call a class as a function"</span>); } }

<span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
  _classCallCheck(<span class="hljs-keyword">this</span>, Person);
};</code></pre>
<p><code>runtime</code>转化器转化成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var _classCallCheck2 = require(&quot;babel-runtime/helpers/classCallCheck&quot;);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> _classCallCheck2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-runtime/helpers/classCallCheck"</span>);

<span class="hljs-keyword">var</span> _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }

<span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
  (<span class="hljs-number">0</span>, _classCallCheck3.default)(<span class="hljs-keyword">this</span>, Person);
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Runtime transform/runtime 转化器详解

## 原文链接
[https://segmentfault.com/a/1190000009065987](https://segmentfault.com/a/1190000009065987)

