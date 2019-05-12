---
title: '怪异的JavaScript系列(二)' 
date: 2018-12-03 2:30:08
hidden: true
slug: 75bk47vtef9
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
<h2>函数不是函数？</h2>
<blockquote>⚠️ 这是一个低版本的bug，V8(&lt;=5.5)，或则Node.js(&lt;=7)。</blockquote>
<pre><code class="js">// Declare a class which extends null
class Foo extends null {}
// -&gt; [Function: Foo]

new Foo instanceof null
// &gt; TypeError: function is not a function
// &gt;     at … … …</code></pre>
<p>备注：经测试高版本(Node.js, v8.1.1)不会出现这个bug。如果你还没升级到高版本，不妨试一下看看？</p>
<h2>数组相加</h2>
<p>如果我们将两个数组相加，结果会怎样？</p>
<pre><code class="js">[1, 2, 3] + [4, 5, 6]  // -&gt; '1,2,34,5,6'</code></pre>
<p>实际上是做了拼接操作，我们来一步一步解释：</p>
<pre><code class="js">[1, 2, 3] + [4, 5, 6]
// 调用 toString()
[1, 2, 3].toString() + [4, 5, 6].toString()
// 字符串拼接
'1,2,3' + '4,5,6'
// -&gt;
'1,2,34,5,6'</code></pre>
<h2>数组中分号的去除</h2>
<p>我们创建一个4个空元素的数组。结果呢，该数组实际上只有3个元素，因为最后一个分号被去掉了。</p>
<pre><code class="js">let a = [,,,]
a.length     // -&gt; 3
a.toString() // -&gt; ',,'</code></pre>
<blockquote>末尾分号(Trailing commas)(又叫做final commas)在添加新元素、参数或则属性时候很有用。如果你想增加一个新的属性，并且前一行末尾有使用分号，你可以直接在新的一行添加而不用修改前一行。这可以让版本控制的diff操作更加清晰，代码更少出问题。-  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas" rel="nofollow noreferrer">Trailing commas at MDN</a>
</blockquote>
<h2>数组相等匹配非常恐怖</h2>
<p>请看：</p>
<pre><code class="js">[] == ''   // -&gt; true
[] == 0    // -&gt; true
[''] == '' // -&gt; true
[0] == 0   // -&gt; true
[0] == ''  // -&gt; false
[''] == 0  // -&gt; true

[null] == ''      // true
[null] == 0       // true
[undefined] == '' // true
[undefined] == 0  // true

[[]] == 0  // true
[[]] == '' // true

[[[[[[]]]]]] == '' // true
[[[[[[]]]]]] == 0  // true

[[[[[[ null ]]]]]] == 0  // true
[[[[[[ null ]]]]]] == '' // true

[[[[[[ undefined ]]]]]] == 0  // true
[[[[[[ undefined ]]]]]] == '' // true</code></pre>
<p>具体请参考<a href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison" rel="nofollow noreferrer">7.2.13 Abstract Equality Comparison</a></p>
<h2>undefined和Number</h2>
<p>如果不给Number构造函数传入任何参数，那么返回0。如果传入undefined作为参数，会返回NaN。</p>
<pre><code class="js">Number()          // -&gt; 0
Number(undefined) // -&gt; NaN</code></pre>
<p>根据规范：</p>
<ol>
<li>如果没有参数传入，那么n=0；</li>
<li>否则，n= ToNumber(value)；</li>
<li>如果value为undefined，那么ToNumnber(undefined)为NaN。</li>
</ol>
<p>参考：</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-number-constructor" rel="nofollow noreferrer">20.1.1 The Number Constructor</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-tonumber" rel="nofollow noreferrer">7.1.3 ToNumber(argument)</a></li>
</ul>
<p>JavaScript坑很多，赶紧使用<a href="https://www.fundebug.com" rel="nofollow noreferrer">fundebug</a>扶一扶！</p>
<h2>parseInt也不是个好东西</h2>
<p>parseInt因为它奇怪的行为而出名：</p>
<pre><code class="js">parseInt('f*ck');     // -&gt; NaN
parseInt('f*ck', 16); // -&gt; 15</code></pre>
<p>这是因为parseInt一个字符一个字符去分析，知道遇到无法处理的字符。<code>f</code>对应的16进制数为15。</p>
<p><code>Infinity</code>可以转换为对应的数字：</p>
<pre><code class="js">//
parseInt('Infinity', 10) // -&gt; NaN
// ...
parseInt('Infinity', 18) // -&gt; NaN...
parseInt('Infinity', 19) // -&gt; 18
// ...
parseInt('Infinity', 23) // -&gt; 18...
parseInt('Infinity', 24) // -&gt; 151176378
// ...
parseInt('Infinity', 29) // -&gt; 385849803
parseInt('Infinity', 30) // -&gt; 13693557269
// ...
parseInt('Infinity', 34) // -&gt; 28872273981
parseInt('Infinity', 35) // -&gt; 1201203301724
parseInt('Infinity', 36) // -&gt; 1461559270678...
parseInt('Infinity', 37) // -&gt; NaN</code></pre>
<p>小心参数为null的情况：</p>
<pre><code class="js">parseInt(null, 24) // -&gt; 23</code></pre>
<blockquote>首先，null被翻译为字符串"null"。"n"在24进制中对于23。-- 更多请参考<a href="https://stackoverflow.com/questions/6459758/parseintnull-24-23-wait-what" rel="nofollow noreferrer"> “parseInt(null, 24) === 23… wait, what?” at StackOverflow</a>。</blockquote>
<pre><code class="js">parseInt('n', 24) // -&gt; 23</code></pre>
<p>不要忘记了8进制：</p>
<pre><code class="js">parseInt('06'); // 6
parseInt('08'); // 8 if support ECMAScript 5
parseInt('08'); // 0 if not support ECMAScript 5</code></pre>
<p>如果输入的字符串以0开始，那么为8进制或则10进制。到底是哪一个，要看实现。如果是ECMAScript5，则为10进制。但并不是所有浏览器都支持。因此最安全的方法是调用parseInt的时候指定进制。</p>
<p>parseInt总是将输入转换为字符串。</p>
<pre><code class="js">parseInt({ toString: () =&gt; 2, valueOf: () =&gt; 1 }) // -&gt; 2
Number({ toString: () =&gt; 2, valueOf: () =&gt; 1 })   // -&gt; 1</code></pre>
<h2>true和false的数学运算</h2>
<pre><code class="js">true + true // -&gt; 2
(true + true) * (true + true) - true // -&gt; 3</code></pre>
<p>我们把true转换为Number来看看就明白了：</p>
<pre><code class="js">Number(true) // -&gt; 1</code></pre>
<p>一元加号运算会尝试将参数转换为number。它会将字符串形式的整数转换为float，非字符串的true，false，和null也会被转换。对于不能转换的值，返回NaN。因此，我们有了一个更加简单的转换方法:</p>
<pre><code class="js">+true // -&gt; 1</code></pre>
<p>当你使用加法或则乘法的时候，ToNumber函数会被调用。根据定义：</p>
<blockquote>如果参数为true，返回1. 如果参数为false，返回+0.<br>这就是为什么我们布尔类型的值(true，false)可以和数字相加。</blockquote>
<p>参考：</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-unary-plus-operator" rel="nofollow noreferrer">12.5.6 Unary + Operator</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus" rel="nofollow noreferrer">12.8.3 The Addition Operator (+)</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-tonumber" rel="nofollow noreferrer">7.1.3 ToNumber(argument)</a></li>
</ul>
<h2>JavaScript中可以使用HTML的评论方式</h2>
<p>在JavaScript中，使用<code>&lt;!--</code>是一个有效的评论方式。</p>
<pre><code class="js">// valid comment
&lt;!-- valid comment too</code></pre>
<p>支持HTML的评论方式的目的是允许那些不支持<code>&lt;script&gt;</code>标签的浏览器可以优雅地降级。而浏览器主要指Netscape 1.x系列，其实已经没有必要支持这个特性了。</p>
<p>Node.js也是基于V8实现，所以在Node.js中也可以使用。</p>
<p>参考：<a href="https://www.ecma-international.org/ecma-262/#sec-html-like-comments" rel="nofollow noreferrer">B.1.3 HTML-like Comments</a></p>
<h2>NaN是Number</h2>
<p>NaN的类型是'number'：</p>
<pre><code class="js">typeof NaN // -&gt; 'number'</code></pre>
<p>如果想了解typeof和instanceof如何工作，参考：</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-typeof-operator" rel="nofollow noreferrer">12.5.5 The typeof Operator</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-instanceofoperator" rel="nofollow noreferrer">12.10.4 Runtime Semantics: InstanceofOperator(O,C)</a></li>
</ul>
<h2>[]和null是对象</h2>
<pre><code class="js">typeof []   // -&gt; 'object'
typeof null // -&gt; 'object'

// 但是
null instanceof Object // false</code></pre>
<p>根据typeof的定义，对于null，作为一个没有实现<code>[[Call]]</code>的对象，返回"object"。</p>
<p>你可以用toString函数来检查对象的具体(Array, Date, Null)类型：</p>
<pre><code class="js">Object.prototype.toString.call([])
// -&gt; '[object Array]'

Object.prototype.toString.call(new Date)
// -&gt; '[object Date]'

Object.prototype.toString.call(null)
// -&gt; '[object Null]'</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怪异的JavaScript系列(二)

## 原文链接
[https://segmentfault.com/a/1190000014577895](https://segmentfault.com/a/1190000014577895)

