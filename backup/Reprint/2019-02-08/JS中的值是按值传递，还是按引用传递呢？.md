---
title: 'JS中的值是按值传递，还是按引用传递呢？' 
date: 2019-02-08 2:30:41
hidden: true
slug: pkl88vozu67
categories: [reprint]
---

{{< raw >}}

                    
<p>最近遇到个有趣的问题：“JS中的值是按值传递，还是按引用传递呢？”</p>
<p>在分析这个问题之前，我们需了解什么是按值传递(call by value)，什么是按引用传递(call by reference)。在计算机科学里，这个部分叫求值策略(Evaluation Strategy)。它决定变量之间、函数调用时实参和形参之间值是如何传递的。</p>
<h3 id="articleHeader0">按值传递 VS. 按引用传递</h3>
<p>按值传递(call by value)是最常用的求值策略：函数的形参是被调用时所传实参的副本。修改形参的值并不会影响实参。</p>
<p>按引用传递(call by reference)时，函数的形参接收实参的隐式引用，而不再是副本。这意味着函数形参的值如果被修改，实参也会被修改。同时两者指向相同的值。</p>
<p>按引用传递会使函数调用的追踪更加困难，有时也会引起一些微妙的BUG。</p>
<p>按值传递由于每次都需要克隆副本，对一些复杂类型，性能较低。两种传值方式都有各自的问题。</p>
<h3 id="articleHeader1">探究JS值的传递方式</h3>
<p>JS的基本类型，是按值传递的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function foo(x) {
    x = 2;
}
foo(a);
console.log(a); // 仍为1, 未受x = 2赋值所影响
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(x)</span> <span class="hljs-comment">{
    x = 2;
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(a)</span>;</span>
console.log(a); <span class="hljs-comment">// 仍为1, 未受x = 2赋值所影响</span>
</code></pre>
<p>再来看对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var obj = {x : 1};
function foo(o) {
    o.x = 3;
}
foo(obj);
console.log(obj.x); // 3, 被修改了!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>
<span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{x : 1}</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(o)</span> <span class="hljs-comment">{
    o.x = 3;
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(obj)</span>;</span>
console.log(obj.x); <span class="hljs-comment">// 3, 被修改了!</span></code></pre>
<p>说明o和obj是同一个对象，o不是obj的副本。所以不是按值传递。 但这样是否说明JS的对象是按引用传递的呢？</p>
<p>我们再看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {x : 1};
function foo(o) {
    o = 100;
}
foo(obj);
console.log(obj.x); // 仍然是1, obj并未被修改为100." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{x : 1}</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(o)</span> <span class="hljs-comment">{
    o = 100;
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(obj)</span>;</span>
console.log(obj.x); <span class="hljs-comment">// 仍然是1, obj并未被修改为100.</span></code></pre>
<p>如果是按引用传递，修改形参o的值，应该影响到实参才对。但这里修改o的值并未影响obj。 因此JS中的对象并不是按引用传递。那么究竟对象的值在JS中如何传递的呢？</p>
<h3 id="articleHeader2">按共享传递 call by sharing</h3>
<p>准确的说，JS中的基本类型按值传递，对象类型按共享传递的(call by sharing，也叫按对象传递、按对象共享传递)。最早由Barbara Liskov. 在1974年的GLU语言中提出。该求值策略被用于Python、Java、Ruby、JS等多种语言。</p>
<p>该策略的重点是：调用函数传参时，函数接受对象实参引用的副本(既不是按值传递的对象副本，也不是按引用传递的隐式引用)。 它和按引用传递的不同在于：在共享传递中对函数形参的赋值，不会影响实参的值。如下面例子中，不可以通过修改形参o的值，来修改obj的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {x : 1};
function foo(o) {
    o = 100;
}
foo(obj);
console.log(obj.x); // 仍然是1, obj并未被修改为100." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{x : 1}</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(o)</span> <span class="hljs-comment">{
    o = 100;
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(obj)</span>;</span>
console.log(obj.x); <span class="hljs-comment">// 仍然是1, obj并未被修改为100.</span></code></pre>
<p>然而，虽然引用是副本，引用的对象是相同的。它们共享相同的对象，所以修改形参对象的属性值，也会影响到实参的属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {x : 1};
function foo(o) {
    o.x = 3;
}
foo(obj);
console.log(obj.x); // 3, 被修改了!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{x : 1}</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(o)</span> <span class="hljs-comment">{
    o.x = 3;
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(obj)</span>;</span>
console.log(obj.x); <span class="hljs-comment">// 3, 被修改了!</span></code></pre>
<p>对于对象类型，由于对象是可变(mutable)的，修改对象本身会影响到共享这个对象的引用和引用副本。而对于基本类型，由于它们都是不可变的(immutable)，按共享传递与按值传递(call by value)没有任何区别，所以说JS基本类型既符合按值传递，也符合按共享传递。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1; // 1是number类型，不可变 var b = a; b = 6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>; <span class="hljs-comment">// 1是number类型，不可变 var b = a; b = 6;</span></code></pre>
<p>据按共享传递的求值策略，a和b是两个不同的引用(b是a的引用副本)，但引用相同的值。由于这里的基本类型数字1不可变，所以这里说按值传递、按共享传递没有任何区别。</p>
<h3 id="articleHeader3">基本类型的不可变(immutable)性质</h3>
<p>基本类型是不可变的(immutable)，只有对象是可变的(mutable). 例如数字值100, 布尔值true, false，修改这些值(例如把1变成3, 把true变成100)并没有什么意义。比较容易误解的，是JS中的string。有时我们会尝试“改变”字符串的内容，但在JS中，任何看似对string值的”修改”操作，实际都是创建新的string值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;abc&quot;;
str[0]; // &quot;a&quot;
str[0] = &quot;d&quot;;
str; // 仍然是&quot;abc&quot;;赋值是无效的。没有任何办法修改字符串的内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span> = <span class="hljs-string">"abc"</span>;
<span class="hljs-keyword">str</span>[<span class="hljs-number">0</span>]; <span class="hljs-comment">// "a"</span>
<span class="hljs-keyword">str</span>[<span class="hljs-number">0</span>] = <span class="hljs-string">"d"</span>;
<span class="hljs-keyword">str</span>; <span class="hljs-comment">// 仍然是"abc";赋值是无效的。没有任何办法修改字符串的内容</span></code></pre>
<p>而对象就不一样了，对象是可变的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {x : 0};
obj.x = 100;
var o = obj;
o.x = 1;
obj.x; // 1, 被修改
o = true;
obj.x; // 1, 不会因o = true改变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>var <span class="hljs-attr">obj</span> = {x : <span class="hljs-number">0</span>};
obj.<span class="hljs-attr">x</span> = <span class="hljs-number">100</span>;
var <span class="hljs-attr">o</span> = obj;
o.<span class="hljs-attr">x</span> = <span class="hljs-number">1</span>;
obj.x; // <span class="hljs-number">1</span>, 被修改
<span class="hljs-attr">o</span> = <span class="hljs-literal">true</span>;
obj.x; // <span class="hljs-number">1</span>, 不会因<span class="hljs-attr">o</span> = <span class="hljs-literal">true</span>改变</code></pre>
<p>这里定义变量obj，值是object，然后设置obj.x属性的值为100。而后定义另一个变量o，值仍然是这个object对象，此时obj和o两个变量的值指向同一个对象（共享同一个对象的引用）。所以修改对象的内容，对obj和o都有影响。但对象并非按引用传递，通过o = true修改了o的值，不会影响obj。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中的值是按值传递，还是按引用传递呢？

## 原文链接
[https://segmentfault.com/a/1190000005794070](https://segmentfault.com/a/1190000005794070)

