---
title: 'JavaScript:(a==1 && a==2 && a==3)能输出ture么？' 
date: 2018-12-17 2:30:06
hidden: true
slug: 2jn5bi4s0jc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>如果你能确切的答出可以，那恭喜你，你可以绕道了</blockquote>
<h3 id="articleHeader0">前言</h3>
<p>有人会说，这个问题好奇葩，放在别的语言里，这要是能输出true，估计是见鬼了，但是你别说，放在js中好真有可能。最近在一个人的推特上提了一个问题：</p>
<ul>
<li>问题：Can (a==1 &amp;&amp; a==2 &amp;&amp; a==3) ever evaluate to true?</li>
<li>答案：yes</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012921119?w=498&amp;h=527" src="https://static.alili.tech/img/remote/1460000012921119?w=498&amp;h=527" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这篇文章中，我将解释这段代码的原理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = {
  num: 0,
  valueOf: function() {
    return this.num += 1
  }
};
const equality = (a==1 &amp;&amp; a==2 &amp;&amp; a==3);
console.log(equality); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> a = {
  <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num += <span class="hljs-number">1</span>
  }
};
<span class="hljs-keyword">const</span> equality = (a==<span class="hljs-number">1</span> &amp;&amp; a==<span class="hljs-number">2</span> &amp;&amp; a==<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(equality); <span class="hljs-comment">// true</span></code></pre>
<p>你可以打开chorme浏览器，然后打开开发者模式，在console中输入这段代码，你就可以看到输出结果([windows]: Ctrl + Shift + J [mac]: Cmd + Opt + J)</p>
<h3 id="articleHeader1">有什么窍门呢？</h3>
<p>其实也没有，能有的就是js中的两个概念：</p>
<ul>
<li>隐式转换</li>
<li>object的valueOf函数</li>
</ul>
<h3 id="articleHeader2">隐式转换</h3>
<p>注意：这题里面我们用的是==而不是===，在js中==代表的是等于而不是全等，那么就存在变量的隐式转化问题。这就意味着结果会比我们所期望的更多的可能性。对于js的隐式转化，真的有很多文章，我推荐一下以下几篇博客，如果你想要了解，可以点进去：</p>
<p><a href="https://github.com/jawil/blog/issues/1" rel="nofollow noreferrer" target="_blank">推荐博客</a></p>
<h3 id="articleHeader3">valueOf</h3>
<p>JavaScript提供了一种将对象转化为原始值的方法：Object.prototype.valueOf()，默认情况下，返回正在被调用的对象。</p>
<p>我们举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = {
  num: 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> a = {
  <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
}</code></pre>
<p>我们可以对上述对象使用valueOf方法，他会返回一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.valueOf();
// {num: 0}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a.valueOf();
<span class="hljs-comment">// {num: 0}</span></code></pre>
<p>是不是很酷，我们可以用typeOf来检测一下这个输出结果的类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof a.valueOf();
// &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> a.valueOf();
<span class="hljs-comment">// "object"</span></code></pre>
<p>为了让valueOf可以更方便将一个对象转化成原始值，我们可以重写他，换种说法就是我们可以通过valueOf来返回一个字符串、数字、布尔值等来代替一个对象，我们可以看以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.valueOf = function() {
  return this.num;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num;
}</code></pre>
<p>我们已经重写了原生的valueOf()方法，当我们调用valueOf的时候，他会返回a.num。那我们现在运行以下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.valueOf();
// 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a.valueOf();
<span class="hljs-comment">// 0</span></code></pre>
<p>我们得到0了，这很合理，因为0就是赋给a.num的值。那我们可以来做几个测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof a.valueOf();
// &quot;number&quot;

a.num == a.valueOf()
// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> a.valueOf();
<span class="hljs-comment">// "number"</span>

a.num == a.valueOf()
<span class="hljs-comment">// true</span></code></pre>
<p>很好，<strong>但为什么这个很重要呢？</strong></p>
<p>这很重要，因为当你两种不同类型的遇到相等操作符的时候，js会对其进行类型转化——它企图将操作数的类型转化为类似的。</p>
<p>在我们的问题中：<code>(a==1 &amp;&amp; a==2 &amp;&amp; a==3)</code>JavaScript会企图将对象转化成数字的类型，进行比较。<strong>当要转化的是一个Object的时候，JavaScript会调用valueOf()方法。</strong></p>
<p>自从我们改变了valueOf()方法之后，我们能不能做到以下几点呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a == 0

// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a == <span class="hljs-number">0</span>

<span class="hljs-comment">// true</span></code></pre>
<p>我们做到了，异常轻松。</p>
<p><strong>现在我们需要做的的一点是：当我们每次去调用a的值的时候，能改变它。</strong></p>
<p>幸运的是，在JavaScript中有<code>+=</code>符号。</p>
<p><code>+=</code>这个运算符可以轻松的去改变一个的值，我们可以举个简单的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let b = 1
console.log(b+=1); // 2
console.log(b+=1); // 3
console.log(b+=1); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> b = <span class="hljs-number">1</span>
<span class="hljs-built_in">console</span>.log(b+=<span class="hljs-number">1</span>); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(b+=<span class="hljs-number">1</span>); <span class="hljs-comment">// 3</span>
<span class="hljs-built_in">console</span>.log(b+=<span class="hljs-number">1</span>); <span class="hljs-comment">// 4</span></code></pre>
<p>正如你所见的，我们每次使用加法赋值运算符，可以让我们的变量增加。</p>
<p>所以我们可以将这个观念用到valueOf()中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.valueOf = function() {
  return this.num += 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num += <span class="hljs-number">1</span>;
}</code></pre>
<p>当我们每次调用valueOf的时候，他会将变量增加1返回给我们。</p>
<p>随着这个改变，我们来运行下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const equality = (a==1 &amp;&amp; a==2 &amp;&amp; a==3);
console.log(equality); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> equality = (a==<span class="hljs-number">1</span> &amp;&amp; a==<span class="hljs-number">2</span> &amp;&amp; a==<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(equality); <span class="hljs-comment">// true</span></code></pre>
<p>这就是它的工作原理。</p>
<p><strong>记住下面两点:</strong></p>
<ul>
<li>使用相等操作符，js会做强制类型转化</li>
<li>我们的对象每次调用valueOf()它的值会增加1</li>
</ul>
<p>所以比较的时候我们每次都能得到true。</p>
<ul><li>补充第二点的运算过程</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a                     == 1   -> 
a.valueOf()           == 1   -> 
a.num += 1            == 1   -> 
0     += 1            == 1   ->
1                     == 1   -> true
a                     == 2   -> 
a.valueOf()           == 2   -> 
a.num += 1            == 2   -> 
1     += 1            == 2   ->
2                     == 2   -> true
a                     == 3   -> 
a.valueOf()           == 3   -> 
a.num += 1            == 3   -> 
2     += 1            == 3   ->
3                     == 3   -> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a                     == <span class="hljs-number">1</span>   -&gt; 
a.valueOf()           == <span class="hljs-number">1</span>   -&gt; 
a.num += <span class="hljs-number">1</span>            == <span class="hljs-number">1</span>   -&gt; 
<span class="hljs-number">0</span>     += <span class="hljs-number">1</span>            == <span class="hljs-number">1</span>   -&gt;
<span class="hljs-number">1</span>                     == <span class="hljs-number">1</span>   -&gt; <span class="hljs-literal">true</span>
a                     == <span class="hljs-number">2</span>   -&gt; 
a.valueOf()           == <span class="hljs-number">2</span>   -&gt; 
a.num += <span class="hljs-number">1</span>            == <span class="hljs-number">2</span>   -&gt; 
<span class="hljs-number">1</span>     += <span class="hljs-number">1</span>            == <span class="hljs-number">2</span>   -&gt;
<span class="hljs-number">2</span>                     == <span class="hljs-number">2</span>   -&gt; <span class="hljs-literal">true</span>
a                     == <span class="hljs-number">3</span>   -&gt; 
a.valueOf()           == <span class="hljs-number">3</span>   -&gt; 
a.num += <span class="hljs-number">1</span>            == <span class="hljs-number">3</span>   -&gt; 
<span class="hljs-number">2</span>     += <span class="hljs-number">1</span>            == <span class="hljs-number">3</span>   -&gt;
<span class="hljs-number">3</span>                     == <span class="hljs-number">3</span>   -&gt; <span class="hljs-literal">true</span></code></pre>
<h3 id="articleHeader4">总结</h3>
<p>谢谢你观看这个小实验，希望你能从中学到东西，有兴趣的朋友也可以去我的<a href="https://github.com/laihuamin/JS-total" rel="nofollow noreferrer" target="_blank">github</a>点个star，你的支持是我持续输出的动力，谢谢！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript:(a==1 && a==2 && a==3)能输出ture么？

## 原文链接
[https://segmentfault.com/a/1190000012921114](https://segmentfault.com/a/1190000012921114)

