---
title: '21 分钟精通前端 Polyfill 方案' 
date: 2019-01-09 2:30:12
hidden: true
slug: pvf9fxzdsk
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010107624" src="https://static.alili.tech/img/remote/1460000010107624" alt="dataTable" title="dataTable" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.sitixi.com/blog/14994835126345.html" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<p>今天是 2017 年 7 月 7 日，es2015 正式发布已经两年了。但最新的浏览器们逼近 100% 的支持率对我们好像并没有什么卵用，为了少数用户的体验，我们很可能需要兼容 IE9。感谢 babel 的编译，让我们完美的提前使用上了 const，let 和 arrow function。可也许你还是面对着不敢直接使用 <code>fetch</code> 或是 <code>Object.assign</code> 的难题？</p>
<h2 id="articleHeader0">babel 和 polyfill</h2>
<p>刚接触 babel 的同学一开始可能都认为在使用了 babel 后就可以无痛的使用 es2015 了，之后被各种 undefined 的报错无情打脸。一句话概括, babel 的编译不会做 polyfill。那么 polyfill 是指什么呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = (a, b) => {
    return Object.assign(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign(a, b);
};</code></pre>
<p>当我们写出上面这样的代码，交给 babel 编译时，我们得到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var foo = function foo(a, b) {
    return Object.assign(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign(a, b);
};</code></pre>
<p>arrow function 被编译成了普通的函数，但仔细一看 <code>Object.assign</code> 还牢牢的站在那里，而它作为 es2015 的新方法，并不能运行在相当多的浏览器上。为什么不把 <code>Object.assign</code> 编译成 <code>(Object.assign||function() { /*...*/})</code> 这样的替代方法呢？好问题！编译为了保证正确的语义，只能转换语法而不是去增加或修改原有的属性和方法。所以 babel 不处理 <code>Object.assign</code> 反倒是最正确的做法。而处理这些方法的方案则被称为 polyfill。</p>
<h2 id="articleHeader1">babel-plugin-transform-xxx</h2>
<p>解决这个问题最原始的思路是缺什么补什么，babel 提供了一系列 transform 的插件来解决这个问题，例如针对 <code>Object.assign</code>，我们可以使用 babel-plugin-transform-object-assign：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add babel-plugin-transform-object-assign

# in .babelrc
{
  &quot;presets&quot;: [&quot;latest&quot;],
  &quot;plugins&quot;: [&quot;transform-object-assign&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">yarn <span class="hljs-keyword">add</span><span class="bash"> babel-plugin-transform-object-assign
</span>
<span class="hljs-comment"># in .babelrc</span>
{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"latest"</span>],
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-object-assign"</span>]
}</code></pre>
<p>方便你尝试，这里准备了一些测试的<a href="https://github.com/stonexer/babel-polyfill-test" rel="nofollow noreferrer" target="_blank">代码</a>。编译之前的代码，我们得到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foo = exports.foo = function foo(a, b) {
  return _extends(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{ <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) { <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i]; <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) { <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } <span class="hljs-keyword">return</span> target; };

<span class="hljs-keyword">var</span> foo = exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> _extends(a, b);
};</code></pre>
<p>babel-plugin-transform-object-assign 在 module 之前替换了我们用到的 Object.assign 方法。看上去效果不错，但细细考究一下会发现这样的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// another.js
export const bar = (a, b) => Object.assign(a, b);

// index.js
import { bar } from './another';

export const foo = (a, b) => Object.assign(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// another.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> bar = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.assign(a, b);

<span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> { bar } <span class="hljs-keyword">from</span> <span class="hljs-string">'./another'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> foo = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.assign(a, b);</code></pre>
<p>被编译成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

&quot;use strict&quot;;

Object.defineProperty(exports, &quot;__esModule&quot;, {
  value: true
});
exports.foo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _another = __webpack_require__(212);

var foo = exports.foo = function foo(a, b) {
  return _extends(a, b);
};

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

&quot;use strict&quot;;

Object.defineProperty(exports, &quot;__esModule&quot;, {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var bar = exports.bar = function bar(a, b) {
  return _extends(a, b);
};

/***/ })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/***/</span> <span class="hljs-number">211</span>:
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
"use strict"</span>;

<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">"__esModule"</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
});
exports.foo = <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{ <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) { <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i]; <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) { <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } <span class="hljs-keyword">return</span> target; };

<span class="hljs-keyword">var</span> _another = __webpack_require__(<span class="hljs-number">212</span>);

<span class="hljs-keyword">var</span> foo = exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> _extends(a, b);
};

<span class="hljs-comment">/***/</span> }),

<span class="hljs-comment">/***/</span> <span class="hljs-number">212</span>:
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
"use strict"</span>;

<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">"__esModule"</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{ <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) { <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i]; <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) { <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } <span class="hljs-keyword">return</span> target; };

<span class="hljs-keyword">var</span> bar = exports.bar = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> _extends(a, b);
};

<span class="hljs-comment">/***/</span> })</code></pre>
<p>transform 的引用是 module 级别的，这意味着在多个 module 使用时会带来重复的引用，这在多文件的项目里可能带来灾难。另外，你可能也并不想一个个的去添加自己要用的 plugin，如果能自动引入该多好。</p>
<h2 id="articleHeader2">babel-runtime &amp; babel-plugin-transform-runtime</h2>
<p>前面提到问题主要在于方法的引入方式是内联的，直接插入了一行代码从而无法优化。鉴于这样的考虑，babel 提供了 babel-plugin-transform-runtime，从一个统一的地方 <a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank">core-js</a> <strong>自动</strong>引入对应的方法。</p>
<p>安装和使用的方法同样不复杂：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add -D babel-plugin-transform-runtime
yarn add babel-runtime

# .babelrc
{
  &quot;presets&quot;: [&quot;latest&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">yarn <span class="hljs-keyword">add</span><span class="bash"> -D babel-plugin-transform-runtime
</span>yarn <span class="hljs-keyword">add</span><span class="bash"> babel-runtime
</span>
<span class="hljs-comment"># .babelrc</span>
{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"latest"</span>],
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p>首先需要安装开发时的依赖 <code>babel-plugin-transform-runtime</code>。同时还需要安装生产环境的依赖 <code>babel-runtime</code>。是否要在生产环境也依赖它取决于你发布代码的方式，简单点直接放在 dependency 里总没错。一切就绪，编译时它会自动引入你用到的方法。但自动就意味着不一定精确：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const foo = (a, b) => Object.assign(a, b);

export const bar = (a, b) => {
    const o = Object;
    const c = [1, 2, 3].includes(3);
    return c &amp;&amp; o.assign(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> foo = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.assign(a, b);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> bar = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>;
    <span class="hljs-keyword">const</span> c = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">return</span> c &amp;&amp; o.assign(a, b);
};</code></pre>
<p>会编译成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _assign = __webpack_require__(214);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }

var foo = exports.foo = function foo(a, b) {
    return (0, _assign2.default)(a, b);
};

var bar = exports.bar = function bar(a, b) {
    var o = Object;
    var c = [1, 2, 3].includes(3);
    return c &amp;&amp; o.assign(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _assign = __webpack_require__(<span class="hljs-number">214</span>);

<span class="hljs-keyword">var</span> _assign2 = _interopRequireDefault(_assign);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }

<span class="hljs-keyword">var</span> foo = exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-number">0</span>, _assign2.default)(a, b);
};

<span class="hljs-keyword">var</span> bar = exports.bar = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-built_in">Object</span>;
    <span class="hljs-keyword">var</span> c = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">return</span> c &amp;&amp; o.assign(a, b);
};</code></pre>
<p>foo 中的 assign 会被替换成 require 来的方法，而 bar 中这样非直接调用的方式则无能为力了。同时，因为 babel-plugin-transform-runtime 依然不是全局生效的，因此实例化的对象方法则不能被 polyfill，比如 <code>[1,2,3].includes</code> 这样依赖于全局 <code>Array.prototype.includes</code> 的调用依然无法使用。</p>
<h2 id="articleHeader3">babel-polyfill</h2>
<p>上面两种 polyfill 方案共有的缺陷在于作用域。因此 babel 直接提供了通过改变全局来兼容 es2015 所有方法的 <a href="https://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">babel-polyfill</a>，安装 <code>babel-polyfill</code> 后你只需要在所有代码的最前面加一句 <code>import 'babel-polyfill'</code> 便可引入它，如果使用了 webpack 也可以直接在 entry 中添加 babel-polyfill 的入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill';

export const foo = (a, b) => Object.assign(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> foo = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.assign(a, b);</code></pre>
<p>加入 babel-polyfill 后，打包好的 pollyfill.js 一下子增加到了 251kb（未压缩），（建议感兴趣的同学把代码拉下来运行一下，之后提到的所有方式也都可以看到打包结果）搜索一下 polyfill.js 不难找到这样的全局修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//polyfill
`$export($export.S + $export.F, 'Object', {assign: __webpack_require__(79)});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//polyfill</span>
`$<span class="hljs-keyword">export</span>($<span class="hljs-keyword">export</span>.S + $<span class="hljs-keyword">export</span>.F, <span class="hljs-string">'Object'</span>, {assign: __webpack_require__(<span class="hljs-number">79</span>)});</code></pre>
<p>babel-polyfill 在项目代码前插入所有的 polyfill 代码，为你的程序打造一个完美的 es2015 运行环境。babel 建议在网页应用程序里使用 babel-polyfill，只要不在意它略有点大的体积（min 后 86kb），直接用它肯定是最稳妥的。值得注意的是，因为 babel-polyfill 带来的改变是全局的，所以无需多次引用，也有可能因此产生冲突，所以最好还是把它抽成一个 common module，放在项目 的 vendor 里，或者干脆直接抽成一个文件放在 cdn 上。</p>
<p>如果你是在开发一个库或者框架，那么 babel-polyfill 的体积就有点大了，尤其是在你实际使用的只有一个 <code>Object.assign</code> 的情况下。更可怕的是对于一个库来说，改变全局环境是使不得的。谁也不希望使用了你的库，还附带了一家老小的 polyfill 改变了全局对象。这时不污染全局环境的 babel-plugin-transform-runtime 才是最合适的。</p>
<h2 id="articleHeader4">babel-preset-env</h2>
<p>回到应用开发。通过自动识别代码引入 polyfill 来优化看来是不太靠谱的，那是不是就无从优化了呢？并不是。还记得 babel 推荐使用的 babel-preset-env 么？它可以根据指定目标环境判断需要做哪些编译。而在张克炎大神的<a href="https://github.com/babel/babel-preset-env/issues/20" rel="nofollow noreferrer" target="_blank">建议</a>下，babel-preset-env 也支持针对指定目标环境选择需要的 polyfill 了，只需引入 babel-polyfill，并在 babelrc 中声明 useBuiltIns，babel 会将引入的 babel-polyfill 自动替换为所需的 polyfill。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .babelrc
{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;IE >= 9&quot;]
      },
      &quot;useBuiltIns&quot;: true
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"># .babelrc
{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"IE &gt;= 9"</span>]
      },
      <span class="hljs-attr">"useBuiltIns"</span>: <span class="hljs-literal">true</span>
    }]
  ]
}</code></pre>
<p>对比 "IE &gt;= 9" 和 "chrome &gt;= 59" 环境下编译后的文件大小:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="               Asset     Size  Chunks           
         polyfill.js   252 kB       0  [emitted]  [big]
              ie9.js   189 kB       1  [emitted]
           chrome.js  30.5 kB       2  [emitted]
transform-runtime.js  17.3 kB       3  [emitted]
transform-plugins.js  3.48 kB       4  [emitted]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>               <span class="hljs-selector-tag">Asset</span>     <span class="hljs-selector-tag">Size</span>  <span class="hljs-selector-tag">Chunks</span>           
         <span class="hljs-selector-tag">polyfill</span><span class="hljs-selector-class">.js</span>   252 <span class="hljs-selector-tag">kB</span>       0  <span class="hljs-selector-attr">[emitted]</span>  <span class="hljs-selector-attr">[big]</span>
              <span class="hljs-selector-tag">ie9</span><span class="hljs-selector-class">.js</span>   189 <span class="hljs-selector-tag">kB</span>       1  <span class="hljs-selector-attr">[emitted]</span>
           <span class="hljs-selector-tag">chrome</span><span class="hljs-selector-class">.js</span>  30<span class="hljs-selector-class">.5</span> <span class="hljs-selector-tag">kB</span>       2  <span class="hljs-selector-attr">[emitted]</span>
<span class="hljs-selector-tag">transform-runtime</span><span class="hljs-selector-class">.js</span>  17<span class="hljs-selector-class">.3</span> <span class="hljs-selector-tag">kB</span>       3  <span class="hljs-selector-attr">[emitted]</span>
<span class="hljs-selector-tag">transform-plugins</span><span class="hljs-selector-class">.js</span>  3<span class="hljs-selector-class">.48</span> <span class="hljs-selector-tag">kB</span>       4  <span class="hljs-selector-attr">[emitted]</span></code></pre>
<p>在目前 IE9 的需求下能节省到将近 30%，但想不到浏览器之神 chrome 也还需要 30kb 的 polyfill，可能是为了修正那些 v8 的一些细小的规范问题吧。（当我尝试调大浏览器范围时，发现始终停留在 189kb 以内，还没细究相比完整的 polyfill 少掉了什么，如果有高手知道的欢迎解答）</p>
<h2 id="articleHeader5">polyfill.io</h2>
<p>以上这样对你来说应该已经够用了，但本质上还是让那些愿意使用最新浏览器的优质用户们做了牺牲。聪明的你可能已经想到了一种优化方案，针对浏览器来选择 polyfill。没错！<a href="https://polyfill.io/v2/docs/" rel="nofollow noreferrer" target="_blank">polyfill.io</a> 便是基于这个思路给出的一项服务。</p>
<p>你可以尝试在不同的浏览器下请求 <code>https://cdn.polyfill.io/v2/polyfill.js</code> 这个文件，服务器会判断浏览器 UA 返回不同的 polyfill 文件，你所要做的仅仅是在页面上引入这个文件，polyfill 这件事就自动以最优雅的方式解决了。更加让人喜悦的是，polyfill.io 不旦提供了 cdn 的服务，也开源了自己的实现方案 <a href="https://github.com/Financial-Times/polyfill-service" rel="nofollow noreferrer" target="_blank">polyfill-service</a>。简单配置一下，便可拥有自己的 polyfill service 了。</p>
<p>看上去一切都很美好，但在使用之前还请你多考虑一下。polyfill.io 面对国内奇葩的浏览器环境能不能把 UA 算准，如果缺失了 polyfill 还有没有什么补救方案，也许都是你需要考虑的。但无论如何，这是个优秀的想法和方案，我想未来也会有更多的网站采用 polyfill.io 的思路的。比如 <a href="https://www.theguardian.com/international" rel="nofollow noreferrer" target="_blank">theguardian</a> 和 <a href="https://github.com/facebookincubator/create-react-app/issues/1104" rel="nofollow noreferrer" target="_blank">redux 作者 Dan 在 create-react-app 上的提议</a>（虽然没被接受哈~）。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
21 分钟精通前端 Polyfill 方案

## 原文链接
[https://segmentfault.com/a/1190000010106158](https://segmentfault.com/a/1190000010106158)

