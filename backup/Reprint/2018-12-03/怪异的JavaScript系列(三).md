---
title: '怪异的JavaScript系列(三)' 
date: 2018-12-03 2:30:08
hidden: true
slug: qlklprwhgc
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> JavaScript有很多坑，经常一不小心就要写bug。</p>
<ul>
<li>原文: <a href="https://github.com/denysdovhan/wtfjs" rel="nofollow noreferrer">What the f*ck JavaScript?</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p>JavaScript是一门伟大的语言，它拥有非常简洁的语法，庞大的生态系统，以及最重要的：有一个伟大的社区支撑着。同时，我们也知道JavaScript是一个充满技巧性的语言。有些坑足以让我们崩溃，也有些奇淫技巧让我们觉得很有趣。本文的思想源自于<a href="https://twitter.com/brianleroux" rel="nofollow noreferrer">Brian Leroux</a>在dotJS2012上的演讲<a href="https://www.youtube.com/watch?v=et8xNAc2ic8" rel="nofollow noreferrer">“WTFJS” at dotJS 2012</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bV7w5y?w=480&amp;h=360" src="https://static.alili.tech/img/bV7w5y?w=480&amp;h=360" alt="clipboard.png" title="clipboard.png"></span></p>
<p>我收集这些例子的主要目的是将它们整理并清楚理解它们的原理。从中学到很多以前不懂的知识是一件很有趣的事情。如果你是初学者，你可以通过学习这些笔记深入理解JavaScript；如果你是一个专业的开发者，那么可以将这些笔记作为一个不错的引用资料。不管怎样，只要读下去，你就会学到新东西的。</p>
<h3>return</h3>
<p>下面的函数返回的结果竟然不是对象<code>{b:10}</code>：</p>
<pre><code class="js">(function () {
  return
  {
    b : 10
  }
})() // -&gt; undefined</code></pre>
<p>不过，如果稍微改写一下，就不一样了：</p>
<pre><code class="js">(function () {
  return {
    b : 10
  }
})() // -&gt; { b: 10 }</code></pre>
<p>这主要是因为有一个<strong>自动行尾加分号</strong>的机制在作怪，会自动在很多新行的行尾添加分号。在第一个例子中，实际上是在return后面添加了分号。</p>
<pre><code class="js">(function () {
  return ;
  {
    b : 10
  }
})() // -&gt; undefined</code></pre>
<p>JavaScript坑很多，赶紧使用<a href="https://www.fundebug.com" rel="nofollow noreferrer">fundebug</a>扶一扶！</p>
<h3>0.1+0.2=?</h3>
<p>一个众所周知的笑话就是0.1加上0.2竟然不等于0.3。</p>
<pre><code class="js">0.1 + 0.2 // -&gt; 0.30000000000000004
(0.1 + 0.2) === 0.3 // -&gt; false</code></pre>
<p>在StackOverflow上有关提到这样的问题“<a href="https://stackoverflow.com/questions/588004/is-floating-point-math-broken" rel="nofollow noreferrer">浮点数加法运算坏了(Is floating point math broken?)</a>”：</p>
<blockquote>你的程序中0.2和0.3会在底层用相近的数据表达。double类型数据中离0.2最近的数要比0.2大一点点。离0.3最近的double类型数据又刚好比0.3小一点点。所以，结果就是0.1+0.2的结果比0.3大。</blockquote>
<p>这个问题非常出名，以至于有一个专门的网站<a href="http://0.30000000000000004.com/" rel="nofollow noreferrer">0.30000000000000004.com</a>。在所有使用浮点计算的语言中都有这个问题，不止JavaScript。</p>
<h3>神奇的加法操作</h3>
<pre><code class="js">999999999999999  // -&gt; 999999999999999
9999999999999999 // -&gt; 10000000000000000

10000000000000000       // -&gt; 10000000000000000
10000000000000000 + 1   // -&gt; 10000000000000000
10000000000000000 + 1.1 // -&gt; 10000000000000002</code></pre>
<p>这个是依据IEEE 754-2008标准确定的二进制浮点运算。当数值大到这个程度，它会取整到最近的偶数。参考：</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types-number-type" rel="nofollow noreferrer">6.1.6 The Number Type</a></li>
<li><a href="https://en.wikipedia.org/wiki/IEEE_754" rel="nofollow noreferrer">IEEE 754 on Wikipedia</a></li>
</ul>
<h3>为Number自定义</h3>
<p>你可以为<code>Number</code>和<code>String</code>添加自定义函数：</p>
<pre><code class="js">Number.prototype.isOne = function () {
  return Number(this) === 1
}

1.0.isOne() // -&gt; true
1..isOne()  // -&gt; true
2.0.isOne() // -&gt; false
(7).isOne() // -&gt; false</code></pre>
<p>你可以想操纵其它对象一样去扩展Number对象。不过，如果定义的函数不在它本身的定义规范(Specification)中，那么不建议这么做。这里是一个参考列表：</p>
<ul><li><a href="https://www.ecma-international.org/ecma-262/#sec-number-objects" rel="nofollow noreferrer">20.1 Number Objects</a></li></ul>
<h3>3个number比较</h3>
<pre><code class="js">1 &lt; 2 &lt; 3 // -&gt; true
3 &gt; 2 &gt; 1 // -&gt; false</code></pre>
<p>我们来看看具体的执行过程就明白了：</p>
<pre><code class="js">1 &lt; 2 &lt; 3 // 1 &lt; 2 -&gt; true
true  &lt; 3 // true -&gt; 1
1     &lt; 3 // -&gt; true

3 &gt; 2 &gt; 1 // 3 &gt; 2 -&gt; true
true  &gt; 1 // true -&gt; 1
1     &gt; 1 // -&gt; false</code></pre>
<h3>有趣的数学</h3>
<pre><code class="js">3  - 1  // -&gt; 2
 3  + 1  // -&gt; 4
'3' - 1  // -&gt; 2
'3' + 1  // -&gt; '31'

'' + '' // -&gt; ''
[] + [] // -&gt; ''
{} + [] // -&gt; 0
[] + {} // -&gt; '[object Object]'
{} + {} // -&gt; '[object Object][object Object]'

'222' - -'111' // -&gt; 333

[4] * [4]       // -&gt; 16
[] * []         // -&gt; 0
[4, 4] * [4, 4] // NaN</code></pre>
<p>到底是为什么呢？ 下面有一个表供快速参考：</p>
<pre><code class="js">Number  + Number  -&gt; addition
Boolean + Number  -&gt; addition
Boolean + Boolean -&gt; addition
Number  + String  -&gt; concatenation
String  + Boolean -&gt; concatenation
String  + String  -&gt; concatenation</code></pre>
<p>那么其他例子呢？对于<code>[]</code>和<code>{}</code>，toPrimitive和toString方法会在加法操作前被隐式地调用。</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus" rel="nofollow noreferrer">12.8.3 The Addition Operator (+)</a></li>
<li>[7.1.1 ToPrimitive(input [,PreferredType])](<a href="https://www.ecma-international.org/ecma-262/#sec-toprimitive)" rel="nofollow noreferrer">https://www.ecma-internationa...</a>
</li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-tostring" rel="nofollow noreferrer">7.1.12 ToString(argument)</a></li>
</ul>
<h3>正则也可以做加法？</h3>
<pre><code class="js">// Patch a toString method
RegExp.prototype.toString = function() {
  return this.source
}

/7/ - /5/ // -&gt; 2</code></pre>
<p>参考: <a href="https://www.ecma-international.org/ecma-262/#sec-get-regexp.prototype.source" rel="nofollow noreferrer">21.2.5.10 get RegExp.prototype.source</a></p>
<h3>箭头函数</h3>
<pre><code class="js">let f = () =&gt; 10
f() // -&gt; 10</code></pre>
<p>好的，但是下面这个呢：</p>
<pre><code class="js">let f = () =&gt; {}
f() // -&gt; undefined</code></pre>
<p>你也许期待着返回<code>{}</code>，而不是undefined。着主要是因为大括号也是函数定义语法的一部分。如果你真想返回大括号，可以这么写：</p>
<pre><code class="js">let f = () =&gt; ({})
f() // -&gt; {}</code></pre>
<h3>Math.max()比Math.min()小</h3>
<pre><code class="js">Math.min(1,4,7,2)  // -&gt; 1
Math.max(1,4,7,2) // -&gt; 7
Math.min() // -&gt; Infinity
Math.max() // -&gt; -Infinity
Math.min() &gt; Math.max() // -&gt; true</code></pre>
<p>原因: <a href="https://charlieharvey.org.uk/page/why_math_max_is_less_than_math_min" rel="nofollow noreferrer">Why is Math.max() less than Math.min()? by Charlie Harvey</a></p>
<h3>String不是String的实例</h3>
<pre><code class="js">'str' // -&gt; 'str'
typeof 'str' // -&gt; 'string'
'str' instanceof String // -&gt; false</code></pre>
<p>构造函数<code>String</code>返回一个字符串：</p>
<pre><code class="js">typeof String('str')   // -&gt; 'string'
String('str')          // -&gt; 'str'
String('str') == 'str' // -&gt; true</code></pre>
<p>如果我们用new来构建的话:</p>
<pre><code class="js">new String('str') == 'str' // -&gt; true
typeof new String('str')   // -&gt; 'object'</code></pre>
<p>竟然变成了一个对象！</p>
<pre><code class="js">new String('str') // -&gt; [String: 'str']</code></pre>
<p>参考: <a href="https://www.ecma-international.org/ecma-262/#sec-string-constructor" rel="nofollow noreferrer">21.1.1 The String Constructor</a></p>
<h3>往期参考</h3>
<ul>
<li><a href="https://blog.fundebug.com/2018/04/03/javascript-werid-series-1/" rel="nofollow noreferrer">Fundebug博客 - 怪异的JavaScript系列(一)</a></li>
<li><a href="https://blog.fundebug.com/2018/04/12/javascript-werid-series-2/" rel="nofollow noreferrer">Fundebug博客 - 怪异的JavaScript系列(二)</a></li>
</ul>
<h3>关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了6亿+错误事件，得到了Google、360、金山软件等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhe1G?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" alt="图片描述" title="图片描述"></span></p>
<h3>版权声明</h3>
<p>转载时请注明作者<a href="https://www.fundebug.com/" rel="nofollow noreferrer">Fundebug</a>以及本文地址：<br><a href="https://blog.fundebug.com/2018/04/16/javascript-werid-series-3/" rel="nofollow noreferrer">https://blog.fundebug.com/2018/04/16/javascript-werid-series-3/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怪异的JavaScript系列(三)

## 原文链接
[https://segmentfault.com/a/1190000014600655](https://segmentfault.com/a/1190000014600655)

