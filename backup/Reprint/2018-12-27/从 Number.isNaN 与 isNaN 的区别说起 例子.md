---
title: '从 Number.isNaN 与 isNaN 的区别说起 例子' 
date: 2018-12-27 2:30:12
hidden: true
slug: 3n2g17cntpp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">例子</h1>
<p>大家先看一看下面这个例子，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN(NaN);

isNaN('A String');

isNaN(undefined);

isNaN({});

Number.isNaN(NaN);

Number.isNaN('A String');

Number.isNaN(undefined);

Number.isNaN({});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">NaN</span>);

<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'A String'</span>);

<span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">undefined</span>);

<span class="hljs-built_in">isNaN</span>({});

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>);

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'A String'</span>);

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">undefined</span>);

<span class="hljs-built_in">Number</span>.isNaN({});
</code></pre>
<p>如果你能很清楚答案，那么这篇文章你可以略过。<br>不清楚的朋友，我们来慢慢来分析。</p>
<p>答案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN(NaN); // true

isNaN('A String'); // true

isNaN(undefined); // true

isNaN({}); // true

Number.isNaN(NaN); // true

Number.isNaN('A String'); // false

Number.isNaN(undefined); // false

Number.isNaN({}); // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'A String'</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>({}); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'A String'</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Number</span>.isNaN({}); <span class="hljs-comment">// false</span>
</code></pre>
<p>为什么看起来同样的函数，得出的结果为什么不同呢？</p>
<h1 id="articleHeader1">NaN 是什么？</h1>
<p>在解释 NaN 之前，我想先解释下 type/value/variable 这个几个容易混淆的概念，已经很清楚的朋友可以跳过这一小节</p>
<h2 id="articleHeader2">type / value / variable 是什么</h2>
<p>在 JavaScript 中，value一共有七种type</p>
<ol>
<li>null</li>
<li>undefined</li>
<li>boolean</li>
<li>number</li>
<li>string</li>
<li>object</li>
<li>symbol (ES6新增)</li>
</ol>
<p>那么，variable是什么呢？就是我们平时 <code>var</code> 之后的声明的那个东西。</p>
<p>type, value, variable 之间的关系可以这么说：variable是存放value的容器，而value是有着type概念的，但是容器variable是没有type的概念的，举个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var a = 'foo';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> a = <span class="hljs-string">'foo'</span>;
</code></pre>
<p>容器 variable <code>a</code> 装着 value <code>'foo'</code>, value <code>'foo'</code> 的type是string</p>
<h2 id="articleHeader3">NaN</h2>
<p>MDN里面这么描述</p>
<blockquote><p>The global NaN property is a value representing Not-A-Number.</p></blockquote>
<p>意思是是说：<code>NaN</code>是一个放在 global（浏览器里是window）对象里的一个value，是一个代表<code>Not-A-Number</code>的value.</p>
<p>意思还是很含糊。</p>
<p>那么我们在看神书《You Don't Know JS》里的描述</p>
<blockquote><p>NaN literally stands for "not a number", though this label/description is very poor and misleading, It would be much more accurate to think of NaN as being "invalid number," "failed number," or even "bad number," than to think of it as "not a number."</p></blockquote>
<p>根据上一个小结的知识，我们知道了，NaN是一个 value, 这个 value 的 type 是 number。</p>
<p>但是跟普通的type是number的value不一样的是，NaN 代表 'Not a number' 这一意义。</p>
<p>那么问题来了，怎么判断一个 value 是不是 NaN 呢?</p>
<h1 id="articleHeader4">isNaN()</h1>
<p>也许有人会说，判断还不容易吗？直接比较不就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span></code></pre>
<p>NaN 跟它自己比较会返回false。</p>
<p>所以，我们就需要一个特殊的函数来判断一个value是不是NaN了。</p>
<p><code>isNaN()</code> 就横空出世了。 </p>
<p>我们再回头看一看上面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN(NaN); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span></code></pre>
<p>OK, 成功了，看似很完美，但是接着看以下例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN('A String'); // true

isNaN(undefined); // true

isNaN({}); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'A String'</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>({}); <span class="hljs-comment">// true</span></code></pre>
<p>会发现，很明显不是 NaN 的 value 也被误判成 NaN 了。</p>
<p>这个BUG已经存在了20年，从JavaScript最开始就一直存在。很明显当初的设计者，在设计isNaN()的时候，局限了在 "Not a Number" 这一字面意思上了：只要不是number就会返回 true。</p>
<p>于是 ES6 为了弥补这一BUG（而不是修正，因为isNaN存在时间太长，有可能很多功能都是基于这个BUG之上的）引入了 <code>Number.isNaN()</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isNaN(NaN); // true

Number.isNaN('A String'); // false

Number.isNaN(undefined); // false

Number.isNaN({}); // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'A String'</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Number</span>.isNaN({}); <span class="hljs-comment">// false</span>
</code></pre>
<p>回头看上面的例子，就明白了修复了什么问题。</p>
<h1 id="articleHeader5">Number.isNaN() 的 polyfill</h1>
<p>没有ES6的情况下，可以采用以下polyfill</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return (
      typeof n === &quot;number&quot; &amp;&amp;
      window.isNaN( n )
    );
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Number</span>.isNaN) {
  <span class="hljs-built_in">Number</span>.isNaN = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">return</span> (
      <span class="hljs-keyword">typeof</span> n === <span class="hljs-string">"number"</span> &amp;&amp;
      <span class="hljs-built_in">window</span>.isNaN( n )
    );
  };
}</code></pre>
<p>简单来看，就是在原有 isNaN() 的基础上增加了一个 type 的判断，因为 NaN 的 type 是 number。</p>
<p>还有一种更加简单的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Number</span>.isNaN) {
    <span class="hljs-built_in">Number</span>.isNaN = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
        <span class="hljs-keyword">return</span> n !== n;
    };
}</code></pre>
<p>利用了只有 NaN 不跟自己相等的特性。</p>
<p>顺便吐槽一下MDN的解释，他是这么解释 <code>isNaN()</code> 的</p>
<blockquote><p>You could think of isNaN as:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isNaN = function(value) {
    return Number.isNaN(Number(value));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> <span class="hljs-built_in">isNaN</span> = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-built_in">Number</span>(value));
}</code></pre>
<p>他是在ES6新函数<code>Number.isNaN()</code>的基础上，去解释旧函数<code>isNaN()</code>的。</p>
<p>不过我们可以通过以上方式来解释判断 <code>isNaN()</code> 为什么会出现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN('A String'); // true

isNaN(undefined); // true

isNaN({}); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'A String'</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">isNaN</span>({}); <span class="hljs-comment">// true</span></code></pre>
<p>这样的情况了。</p>
<p><a href="https://www.weibo.com/u/5890721762/" rel="nofollow noreferrer" target="_blank">作者微博</a></p>
<p><a href="https://nicholaslee119.github.io" rel="nofollow noreferrer" target="_blank">作者博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 Number.isNaN 与 isNaN 的区别说起 例子

## 原文链接
[https://segmentfault.com/a/1190000011800831](https://segmentfault.com/a/1190000011800831)

