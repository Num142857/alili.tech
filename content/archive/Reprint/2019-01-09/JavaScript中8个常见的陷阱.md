---
title: 'JavaScript中8个常见的陷阱' 
date: 2019-01-09 2:30:11
hidden: true
slug: rmz7lxiazm
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按:</strong> 漫漫编程路，总有一些坑让你泪流满面。</p>
<p>原文: <a href="https://hackernoon.com/who-said-javascript-easy-f4a1d5b399b8" rel="nofollow noreferrer" target="_blank">Who said javascript was easy ?</a></p>
<p>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a></p>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习</strong>。</p>
<p>这里我们针对JavaScript初学者给出一些技巧和列出一些陷阱。如果你已经是一个砖家，也可以读一读。</p>
<h3 id="articleHeader0">1. 你是否尝试过对数组元素进行排序？</h3>
<p>JavaScript默认使用字典序(alphanumeric)来排序。因此，<code>[1,2,5,10].sort()</code>的结果是<code>[1, 10, 2, 5]</code>。</p>
<p>如果你想正确的排序，应该这样做：<code>[1,2,5,10].sort((a, b) =&gt; a - b)</code></p>
<h3 id="articleHeader1">2. new Date() 十分好用</h3>
<p><code>new Date()</code>的使用方法有：</p>
<ul>
<li><p>不接收任何参数：返回当前时间；</p></li>
<li><p>接收一个参数<code>x</code>: 返回1970年1月1日 + <code>x</code>毫秒的值。</p></li>
<li><p><code>new Date(1, 1, 1)</code>返回1901年2月1号。</p></li>
<li><p>然而....，<code>new Date(2016, 1, 1)</code>不会在1900年的基础上加2016，而只是表示2016年。</p></li>
</ul>
<h3 id="articleHeader2">3. 替换函数没有真的替换？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s = &quot;bob&quot;
const replaced = s.replace('b', 'l')
replaced === &quot;lob&quot; // 只会替换掉第一个b
s === &quot;bob&quot; // 并且s的值不会变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> s = <span class="hljs-string">"bob"</span>
<span class="hljs-keyword">const</span> replaced = s.replace(<span class="hljs-string">'b'</span>, <span class="hljs-string">'l'</span>)
replaced === <span class="hljs-string">"lob"</span> <span class="hljs-comment">// 只会替换掉第一个b</span>
s === <span class="hljs-string">"bob"</span> <span class="hljs-comment">// 并且s的值不会变</span></code></pre>
<p>如果你想把所有的b都替换掉，要使用正则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;bob&quot;.replace(/b/g, 'l') === 'lol'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"bob"</span>.replace(<span class="hljs-regexp">/b/g</span>, <span class="hljs-string">'l'</span>) === <span class="hljs-string">'lol'</span></code></pre>
<h3 id="articleHeader3">4. 谨慎对待比较运算</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这些可以
'abc' === 'abc' // true
1 === 1         // true
// 然而这些不行
[1,2,3] === [1,2,3] // false
{a: 1} === {a: 1}   // false
{} === {}           // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 这些可以</span>
<span class="hljs-string">'abc'</span> === <span class="hljs-string">'abc'</span> <span class="hljs-comment">// true</span>
<span class="hljs-number">1</span> === <span class="hljs-number">1</span>         <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 然而这些不行</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] === [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] <span class="hljs-comment">// false</span>
{<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>} === {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}   <span class="hljs-comment">// false</span>
{} === {}           <span class="hljs-comment">// false</span></code></pre>
<p>因为[1,2,3]和[1,2,3]是两个不同的数组，只是它们的元素碰巧相同。因此，不能简单的通过<code>===</code>来判断。</p>
<h3 id="articleHeader4">5. 数组不是基础类型</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof {} === 'object'  // true
typeof 'a' === 'string' // true
typeof 1 === number     // true
// 但是....
typeof [] === 'object'  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> {} === <span class="hljs-string">'object'</span>  <span class="hljs-comment">// true</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-string">'a'</span> === <span class="hljs-string">'string'</span> <span class="hljs-comment">// true</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span> === number     <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 但是....</span>
<span class="hljs-keyword">typeof</span> [] === <span class="hljs-string">'object'</span>  <span class="hljs-comment">// true</span></code></pre>
<p>如果要判断一个变量<code>var</code>是否是数组，你需要使用<code>Array.isArray(var)</code>。</p>
<h3 id="articleHeader5">6. 闭包</h3>
<p>这是一个经典的JavaScript面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Greeters = []
for (var i = 0 ; i < 10 ; i++) {
  Greeters.push(function () { return console.log(i) })
}
Greeters[0]() // 10
Greeters[1]() // 10
Greeters[2]() // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Greeters = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; <span class="hljs-number">10</span> ; i++) {
  Greeters.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(i) })
}
Greeters[<span class="hljs-number">0</span>]() <span class="hljs-comment">// 10</span>
Greeters[<span class="hljs-number">1</span>]() <span class="hljs-comment">// 10</span>
Greeters[<span class="hljs-number">2</span>]() <span class="hljs-comment">// 10</span></code></pre>
<p>虽然期望输出0,1,2,...，然而实际上却不会。知道如何Debug嘛？<br>  有两种方法：</p>
<ul>
<li><p>使用<code>let</code>而不是<code>var</code>。备注：可以参考Fundebug的另一篇博客<a href="https://blog.fundebug.com/2017/05/04/why-you-should-not-use-var/" rel="nofollow noreferrer" target="_blank">  ES6之"let"能替代"var"吗?</a></p></li>
<li>
<p>使用<code>bind</code>函数。备注：可以参考Fundebug的另一篇博客<a href="https://blog.fundebug.com/2017/05/17/javascript-this-for-beginners/" rel="nofollow noreferrer" target="_blank">  JavaScript初学者必看“this”</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Greeters.push(console.log.bind(null, i))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Greeters.push(<span class="hljs-built_in">console</span>.log.bind(<span class="hljs-literal">null</span>, i))</code></pre>
<p>当然，还有很多解法。这两种是我最喜欢的！</p>
</li>
</ul>
<h3 id="articleHeader6">7. 关于<code>bind</code>
</h3>
<p>下面这段代码会输出什么结果？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Foo {
  constructor (name) {
    this.name = name
  }
  greet () {
    console.log('hello, this is ', this.name)
  }
  someThingAsync () {
    return Promise.resolve()
  }
  asyncGreet () {
    this.someThingAsync()
    .then(this.greet)
  }
}
new Foo('dog').asyncGreet()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  <span class="hljs-keyword">constructor</span> (name) {
    <span class="hljs-keyword">this</span>.name = name
  }
  greet () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello, this is '</span>, <span class="hljs-keyword">this</span>.name)
  }
  someThingAsync () {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
  }
  asyncGreet () {
    <span class="hljs-keyword">this</span>.someThingAsync()
    .then(<span class="hljs-keyword">this</span>.greet)
  }
}
<span class="hljs-keyword">new</span> Foo(<span class="hljs-string">'dog'</span>).asyncGreet()</code></pre>
<p>如果你说程序会崩溃，并且报错：Cannot read property 'name' of undefined。<br>  因为第16行的<code>geet</code>没有在正确的环境下执行。当然，也有很多方法解决这个BUG！</p>
<ul>
<li>
<p>我喜欢使用<code>bind</code>函数来解决问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncGreet () {
  this.someThingAsync()
  .then(this.greet.bind(this))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">asyncGreet () {
  <span class="hljs-keyword">this</span>.someThingAsync()
  .then(<span class="hljs-keyword">this</span>.greet.bind(<span class="hljs-keyword">this</span>))
}</code></pre>
<p>这样会确保<code>greet</code>会被Foo的实例调用，而不是局部的函数的<code>this</code>。</p>
</li>
<li>
<p>如果你想要<code>greet</code>永远不会绑定到错误的作用域，你可以在构造函数里面使用<code>bind</code>来绑  。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Foo {
  constructor (name) {
    this.name = name
    this.greet = this.greet.bind(this)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  <span class="hljs-keyword">constructor</span> (name) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.greet = <span class="hljs-keyword">this</span>.greet.bind(<span class="hljs-keyword">this</span>)
  }
}</code></pre>
</li>
<li>
<p>你也可以使用箭头函数(=&gt;)来防止作用域被修改。备注：可以参考Fundebug的另一篇博客<a href="https://blog.fundebug.com/2017/05/25/arrow-function-for-beginner/" rel="nofollow noreferrer" target="_blank">  JavaScript初学者必看“箭头函数”</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncGreet () {
  this.someThingAsync()
  .then(() => {
    this.greet()
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">asyncGreet () {
  <span class="hljs-keyword">this</span>.someThingAsync()
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.greet()
  })
}</code></pre>
</li>
</ul>
<h3 id="articleHeader7">8. <a href="https://zhuanlan.zhihu.com/p/22481953" rel="nofollow noreferrer" target="_blank">Math.min()比Math.max()大</a>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.min() < Math.max() // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.min() &lt; <span class="hljs-built_in">Math</span>.max() <span class="hljs-comment">// false</span></code></pre>
<p>因为Math.min() 返回 Infinity, 而 Math.max()返回 -Infinity。</p>
<p>欢迎加入<a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">我们Fundebug</a>的<strong>全栈BUG监控交流群: 622902485</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVNPvB?w=270&amp;h=370" src="https://static.alili.tech/img/bVNPvB?w=270&amp;h=370" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2017/06/28/who-said-js-was-easy/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/06/28/who-said-js-was-easy/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中8个常见的陷阱

## 原文链接
[https://segmentfault.com/a/1190000010136950](https://segmentfault.com/a/1190000010136950)

