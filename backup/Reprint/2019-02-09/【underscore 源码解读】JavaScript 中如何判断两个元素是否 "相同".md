---
title: '【underscore 源码解读】JavaScript 中如何判断两个元素是否 "相同"' 
date: 2019-02-09 2:30:59
hidden: true
slug: cdp8lnjwcp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Why underscore</h1>
<p>最近开始看 underscore.js 源码，并将 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">underscore.js 源码解读</a> 放在了我的 2016 计划中。</p>
<p>阅读一些著名框架类库的源码，就好像和一个个大师对话，你会学到很多。为什么是 underscore？最主要的原因是 underscore 简短精悍（约 1.5k 行），封装了 100 多个有用的方法，耦合度低，非常适合逐个方法阅读，适合楼主这样的 JavaScript 初学者。从中，你不仅可以学到用 void 0 代替 undefined 避免 undefined 被重写等一些小技巧 ，也可以学到变量类型判断、函数节流&amp;函数去抖等常用的方法，还可以学到很多浏览器兼容的 hack，更可以学到作者的整体设计思路以及 API 设计的原理（向后兼容）。</p>
<p>之后楼主会写一系列的文章跟大家分享在源码阅读中学习到的知识。</p>
<ul>
<li><p>underscore-1.8.3 源码解读项目地址 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis</a></p></li>
<li><p>underscore-1.8.3 源码全文注释 <a href="https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js</a></p></li>
<li><p>underscore-1.8.3 源码解读系列文章 <a href="https://github.com/hanzichi/underscore-analysis/issues" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/issues</a></p></li>
</ul>
<p>欢迎围观~ （<strong>如果有兴趣，欢迎 star &amp; watch~</strong>）您的关注是楼主继续写作的动力</p>
<h1 id="articleHeader1">_.isEqual</h1>
<p>本文跟大家聊聊 JavaScript 中如何判断两个参数 "相同"，即 underscore 源码中的 _.isEqual 方法。这个方法可以说是 underscore 源码中实现最复杂的方法（用了百来行），几乎没有之一。</p>
<p>那么，我说的 "相同" 到底是什么意思？举个栗子，<code>1</code> 和 <code>new Number(1)</code> 被认为是 equal，<code>[1]</code> 和 <code>[1]</code> 被认为是 equal（尽管它们的引用并不相同），当然，两个引用相同的对象肯定是 equal 的了。</p>
<p>那么，如何设计这个 _.isEqual 函数呢？我们跟着 underscore 源码，一步步来看它的实现。后文中均假设比较的两个参数为 a 和 b。</p>
<p>首先我们判断 <code>a === b</code>，为 true 的情况有两种，其一是 a 和 b 都是基本类型，那么就是两个基本类型的值相同，其二就是两个引用类型，那么就是引用类型的引用相同。那么如果 <code>a === b</code> 为 true，是否就是说 a 和 b 是 equal 的呢？事实上，99% 的情况是这样的，还得考虑 0 和 -0 这个 special case，<code>0 === -0</code> 为 true，而 0 和 -0 被认为是 unequal，至于原因，可以参考 <a href="http://wiki.ecmascript.org/doku.php?id=harmony:egal" rel="nofollow noreferrer" target="_blank">http://wiki.ecmascript.org/doku.php?id=harmony:egal</a>。</p>
<p>这部分代码可以这样表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Identical objects are equal. `0 === -0`, but they aren't identical.
// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
// a === b 时
// 需要注意 `0 === -0` 这个 special case
// 0 和 -0 不相同
// 至于原因可以参考上面的链接
if (a === b) return a !== 0 || 1 / a === 1 / b;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Identical objects are equal. `0 === -0`, but they aren't identical.</span>
<span class="hljs-comment">// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).</span>
<span class="hljs-comment">// a === b 时</span>
<span class="hljs-comment">// 需要注意 `0 === -0` 这个 special case</span>
<span class="hljs-comment">// 0 和 -0 不相同</span>
<span class="hljs-comment">// 至于原因可以参考上面的链接</span>
<span class="hljs-keyword">if</span> (a === b) <span class="hljs-keyword">return</span> a !== <span class="hljs-number">0</span> || <span class="hljs-number">1</span> / a === <span class="hljs-number">1</span> / b;</code></pre>
<p>接下去的情况，也就是 <code>a !== b</code> 的情况了。</p>
<p>如果 a 和 b 中有一个是 null 或者 undefined，那么可以特判下，不用继续比较了。源码实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A strict comparison is necessary because `null == undefined`.
// 如果 a 和 b 有一个为 null（或者 undefined）
// 判断 a === b
if (a == null || b == null) return a === b;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// A strict comparison is necessary because `null == undefined`.</span>
<span class="hljs-comment">// 如果 a 和 b 有一个为 null（或者 undefined）</span>
<span class="hljs-comment">// 判断 a === b</span>
<span class="hljs-keyword">if</span> (a == <span class="hljs-literal">null</span> || b == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> a === b;</code></pre>
<p>个人觉得这里写的有点多余，因为根据上面的判断过滤，a === b 肯定是返回 false 的。</p>
<p>ok，我们继续，接下来我们可以先根据 a 和 b 的类型来判断，如果类型不一样，那么就没必要继续判断了。如何获取变量类型？没错，就是神奇的 <code>Object.prototype.toString.call</code>！</p>
<p>如果类型是 RegExp 和 String，我们可以将 a 和 b 分别转为字符串进行比较（如果是 String 就已经是字符串了），举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = /a/;
var b = new RegExp(&quot;a&quot;);

console.log(_.isEqual(a, b));  // => true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-regexp">/a/</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"a"</span>);

<span class="hljs-built_in">console</span>.log(_.isEqual(a, b));  <span class="hljs-comment">// =&gt; true</span></code></pre>
<p>其实它在 underscore 内部是这样判断的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = /a/;
var b = new RegExp(&quot;a&quot;);

var _a = '' + a; // => /a/
var _b = '' + b; // => /a/

console.log(_a === _b); // => true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-regexp">/a/</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"a"</span>);

<span class="hljs-keyword">var</span> _a = <span class="hljs-string">''</span> + a; <span class="hljs-comment">// =&gt; /a/</span>
<span class="hljs-keyword">var</span> _b = <span class="hljs-string">''</span> + b; <span class="hljs-comment">// =&gt; /a/</span>

<span class="hljs-built_in">console</span>.log(_a === _b); <span class="hljs-comment">// =&gt; true</span></code></pre>
<p>如果是 Number 类型呢？这里又有个 special case，就是 NaN！这里规定，NaN 仅和 NaN 相同，与别的 Number 类型均 unequal。这里我们将引用类型均转为基本类型，看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Number(1);
console.log(+a); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(+a); <span class="hljs-comment">// 1</span></code></pre>
<p>没错，加个 <code>+</code> 就解决了，其他的不难理解，都在注释里了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// `NaN`s are equivalent, but non-reflexive.
// Object(NaN) is equivalent to NaN
// 如果 +a !== +a 
// 那么 a 就是 NaN
// 判断 b 是否也是 NaN 即可
if (+a !== +a) return +b !== +b;

// An `egal` comparison is performed for other numeric values.
// 排除了 NaN 干扰
// 还要考虑 0 的干扰
// 用 +a 将 Number() 形式转为基本类型
// 如果 a 为 0，判断 1 / +a === 1 / b
// 否则判断 +a === +b
return +a === 0 ? 1 / +a === 1 / b : +a === +b;

// 如果 a 为 Number 类型
// 要注意 NaN 这个 special number
// NaN 和 NaN 被认为 equal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// `NaN`s are equivalent, but non-reflexive.</span>
<span class="hljs-comment">// Object(NaN) is equivalent to NaN</span>
<span class="hljs-comment">// 如果 +a !== +a </span>
<span class="hljs-comment">// 那么 a 就是 NaN</span>
<span class="hljs-comment">// 判断 b 是否也是 NaN 即可</span>
<span class="hljs-keyword">if</span> (+a !== +a) <span class="hljs-keyword">return</span> +b !== +b;

<span class="hljs-comment">// An `egal` comparison is performed for other numeric values.</span>
<span class="hljs-comment">// 排除了 NaN 干扰</span>
<span class="hljs-comment">// 还要考虑 0 的干扰</span>
<span class="hljs-comment">// 用 +a 将 Number() 形式转为基本类型</span>
<span class="hljs-comment">// 如果 a 为 0，判断 1 / +a === 1 / b</span>
<span class="hljs-comment">// 否则判断 +a === +b</span>
<span class="hljs-keyword">return</span> +a === <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> / +a === <span class="hljs-number">1</span> / b : +a === +b;

<span class="hljs-comment">// 如果 a 为 Number 类型</span>
<span class="hljs-comment">// 要注意 NaN 这个 special number</span>
<span class="hljs-comment">// NaN 和 NaN 被认为 equal</span></code></pre>
<p>接下来我们看 Date 和 Boolean 两个类型。跟 Number 类型相似，它们也可以用 <code>+</code> 转化为基本类型的数字！看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Date();
var b = true;
var c = new Boolean(false);

console.log(+a); // 1464180857222
console.log(+b); // 1
console.log(+c); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> b = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">false</span>);

<span class="hljs-built_in">console</span>.log(+a); <span class="hljs-comment">// 1464180857222</span>
<span class="hljs-built_in">console</span>.log(+b); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(+c); <span class="hljs-comment">// 0</span></code></pre>
<p>非常简单，其实 +new Date() （或者也可以写成 +new Date）获取的正是当前时间和 1970 年 1 月 1 日 0 点的毫秒数（millisecond），可能你听说过时间戳，其实时间戳就是这个数据除以 1000，也就是秒数。在用 canvas 做动画时，我经常用 +new Date 来当时间戳。</p>
<p>so，如果 a 和 b 均是 Date 类型或者 Boolean 类型，我们可以用 <code>+a === +b</code> 来判断是否 equal。</p>
<p>程序接着走，我们接着看，似乎还有两类重要的类型没有判断？没错，Array 和 Object！underscore 对此采用递归方法展开来比较。</p>
<p>还是举个栗子吧，举例比较直观。</p>
<p>假设 a，b 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {name: &quot;hanzichi&quot;, loveCity: [{cityName: &quot;hangzhou&quot;, province: &quot;zhenjiang&quot;}], age: 30};
var b = {name: &quot;hanzichi&quot;, loveCity: [{cityName: &quot;hangzhou&quot;, province: &quot;zhenjiang&quot;}], age: 25};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">name</span>: <span class="hljs-string">"hanzichi"</span>, <span class="hljs-attr">loveCity</span>: [{<span class="hljs-attr">cityName</span>: <span class="hljs-string">"hangzhou"</span>, <span class="hljs-attr">province</span>: <span class="hljs-string">"zhenjiang"</span>}], <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>};
<span class="hljs-keyword">var</span> b = {<span class="hljs-attr">name</span>: <span class="hljs-string">"hanzichi"</span>, <span class="hljs-attr">loveCity</span>: [{<span class="hljs-attr">cityName</span>: <span class="hljs-string">"hangzhou"</span>, <span class="hljs-attr">province</span>: <span class="hljs-string">"zhenjiang"</span>}], <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>};</code></pre>
<p>首先 a，b 是对象，我们可以分别比较其键值对，如果有一个键值对不同（或者说一个键值对 a 和 b 有一个没有），则 a 和 b unequal。如果是数组呢？那就一个一个元素比较喽。因为数组可能嵌套对象，对象的 value 又可能是数组，所以这里用了递归。</p>
<p>还是以上面的例子，我们可以把它拆成三次比较，分别比较三个 key 的 value 值是否相同。对于 loveCity 这个 key 的 value，因为其 value 又是个数组，所以我们将这个 value 传入比较函数，通过这个比较的结果，来判断最后的比较结果。递归就是这样，可以将大的东西，拆成一个个小的，根据小的结果，来汇总得到大的结果。</p>
<p>最后，给出代码位置。关于 _.isEqual 方法的源码，大家可以参考 <a href="https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L1094-L1190" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L1094-L1190</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【underscore 源码解读】JavaScript 中如何判断两个元素是否 "相同"

## 原文链接
[https://segmentfault.com/a/1190000005347766](https://segmentfault.com/a/1190000005347766)

