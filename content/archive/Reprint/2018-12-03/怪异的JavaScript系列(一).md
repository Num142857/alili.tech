---
title: '怪异的JavaScript系列(一)' 
date: 2018-12-03 2:30:08
hidden: true
slug: 2g2fd0j8ex9
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
<p>&lt;div style="text-align: center;"&gt;<br>&lt;img style="width:80%;" src="javascript-werid-series-1/brian.jpeg" /&gt;<br>&lt;/div&gt;</p>
<p>我收集这些例子的主要目的是将它们整理并清楚理解它们的原理。从中学到很多以前不懂的知识是一件很有趣的事情。如果你是初学者，你可以通过学习这些笔记深入理解JavaScript；如果你是一个专业的开发者，那么可以将这些笔记作为一个不错的引用资料。不管怎样，只要读下去，你就会学到新东西的。</p>
<h2>[]等于![]</h2>
<pre><code class="js">[ ] == ![ ] // -&gt; true</code></pre>
<p>相等(==)判断操作会将两边的类型都转换为数字(number)，然后再比较。因为<code>[]</code>和<code>![]</code>都会转换为<code>0</code>。我们可以理解<code>[]</code>是一个数组，只不过为空而已，那么为true。右侧<code>![]</code>则为false。false然后转换为数字0。左侧<code>[]</code>直接转换为数字，因为空数组会转换为<code>0</code>，所以尽管我们认为<code>[]</code>为true，这里却变成了<code>0</code>。</p>
<p>下面是简化的计算过程:</p>
<pre><code class="js">+[] == +![]
0 == +false
0 == 0
true</code></pre>
<p>参考:</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-logical-not-operator" rel="nofollow noreferrer">12.5.9 Logical NOT Operator (!)</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison" rel="nofollow noreferrer">7.2.13 Abstract Equality Comparison</a></li>
</ul>
<h2>true 是 false</h2>
<pre><code class="js">!!'false' ==  !!'true'  // -&gt; true
!!'false' === !!'true' // -&gt; true</code></pre>
<p>true是一个真值，用1表示；字符串的<code>“true”</code>则为NaN。</p>
<pre><code class="js">true == 'true'    // -&gt; false
false == 'false'  // -&gt; false</code></pre>
<p>'false'是一个有意义的字符串。</p>
<pre><code class="js">!!'false' // -&gt; true
!!'true'  // -&gt; true</code></pre>
<p>参考:<a href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison" rel="nofollow noreferrer">7.2.13 Abstract Equality Comparison</a></p>
<h2>baNaNa</h2>
<pre><code class="js">'b' + 'a' + + 'a' + 'a' // -&gt; baNaNa</code></pre>
<p>这是一个旧笑话，不过改进过的。原始的长这样：</p>
<pre><code class="js">'foo' + + 'bar' // -&gt; 'fooNaN'</code></pre>
<p>该表达式以<code>'foo' + (+'bar')</code>的形式计算，因为<code>bar</code>不是数字，所以转换为NaN。</p>
<p>参考:</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus" rel="nofollow noreferrer">12.8.3 The Addition Operator (+)</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-unary-plus-operator" rel="nofollow noreferrer">12.5.6 Unary + Operator</a></li>
</ul>
<h2>NaN不等于NaN</h2>
<pre><code class="js">NaN === NaN // -&gt; false</code></pre>
<p>根据<code>===</code>的算法，我们可以容易理解为什么为false。</p>
<blockquote>
<p>如果typeof(x)和typeof(y)不同，那么返回false.<br>否则，如果typeof(x)是Number，那么</p>
<ol>
<li>如果x是NaN，那么返回false；</li>
<li>如果y是NaN，那么返回false；</li>
<li>...</li>
</ol>
</blockquote>
<p>由此可以得出值为false的结论。</p>
<h2>fail</h2>
<pre><code class="js">(![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]] // -&gt; fail</code></pre>
<p>如果我们仔细观察序列的规律，会发现下面的模式出现很多次：</p>
<pre><code class="js">(![]+[]) // -&gt; 'false'
![]      // -&gt; false</code></pre>
<p>因此，我们尝试将[]和false相加。但是根据内部一些列函数的计算(binary + Operator -&gt; ToPrimitive -&gt; [[DefaultValue]])，右侧的[]最终转换为string：</p>
<pre><code class="js">(![]+[].toString()) // 'false'</code></pre>
<p>对于一个字符串，我们就可以通过下标来获取对应的字符：</p>
<pre><code class="js">'false'[0] // -&gt; 'f'</code></pre>
<p>剩下的都很直观，除了<code>i</code>很取巧。<code>fail</code>中的<code>i</code>是通过在<code>falseundefined</code>中获取第十个下标对应的字符而得到。</p>
<h2>[]包含值，但不是true</h2>
<p>空数组不等于true。(An array is a truthy value, however, it's not equal to true.)</p>
<pre><code class="js">!![]       // -&gt; true
[] == true // -&gt; false</code></pre>
<p>参考:</p>
<ul>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-logical-not-operator" rel="nofollow noreferrer">12.5.9 Logical NOT Operator (!)</a></li>
<li><a href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison" rel="nofollow noreferrer">7.2.13 Abstract Equality Comparison</a></li>
</ul>
<h2>null不等于false</h2>
<p>尽管null是一个false的值，但是null不等于false。</p>
<pre><code class="js">!!null        // -&gt; false
null == false // -&gt; false</code></pre>
<p>不过，如果和其它false的值比较，那么他们又是相等的。</p>
<pre><code class="js">0 == false  // -&gt; true
'' == false // -&gt; true</code></pre>
<p>参考: <a href="https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison" rel="nofollow noreferrer">7.2.13 Abstract Equality Comparison</a></p>
<p>JavaScript坑很多，赶紧使用<a href="https://www.fundebug.com" rel="nofollow noreferrer">fundebug</a>扶一扶！</p>
<h2>document.all是一个对象，不过是undefined</h2>
<p>⚠️这个是前端浏览器API，在Nodejs环境无法使用。</p>
<p>尽管document.all可以返回一个像数组一样的对象，可以用来访问DOM节点。但是呢，通过typeof查看document.all，你会惊讶地发现类型是<code>undefined</code>。</p>
<pre><code class="js">document.all instanceof Object // -&gt; true
typeof document.all // -&gt; 'undefined'</code></pre>
<p>而且，document.all并不等于undefined。</p>
<pre><code class="js">document.all === undefined // -&gt; false
document.all === null // -&gt; false</code></pre>
<p>而且，更惊讶的是：</p>
<pre><code class="js">document.all == null // -&gt; true</code></pre>
<p>document.all是一个过去常用的获取DOM元素的方法，特别是老版本的IE。但是从未进入标准，尽管广泛使用在过去的JS代码中。当新的API突出来(比如document.getElementById)后，document.all就被淘汰了。标准委员会不得不觉得怎么处理它。可是因为它已经被广泛使用，所以委员会觉得保留它，但是违背了JavaScript的规范。</p>
<p>参考:</p>
<ul>
<li><a href="https://html.spec.whatwg.org/multipage/obsolete.html#dom-document-all" rel="nofollow noreferrer"> Obsolete features - document.all</a></li>
<li><a href="https://github.com/getify/You-Dont-Know-JS/blob/0d79079b61dad953bbfde817a5893a49f7e889fb/types%20%26%20grammar/ch4.md#falsy-objects" rel="nofollow noreferrer"> Chapter 4 - ToBoolean - Falsy values</a></li>
</ul>
<h2>最小值比0还大</h2>
<p><code>Number.MIN_VALUE</code>是最小的数，但是它比0还大。</p>
<pre><code class="js">Number.MIN_VALUE &gt; 0 // -&gt; true</code></pre>
<p>因为<code>Number.MIN_VALUE</code>是<code>5e-324</code>。也就是说即使最小的值也可以用浮点数表示出来，虽然离0很接近，但是依然比0大。其实最小的数是<code>Number.NEGATIVE_INFINITY</code>，尽管它不是一个实际存在的数。</p>
<p>在StackOverflow有相关问题:<a href="https://stackoverflow.com/questions/26614728/why-is-0-less-than-number-min-value-in-javascript" rel="nofollow noreferrer">Why is 0 less than Number.MIN_VALUE in JavaScript?</a>。</p>
<p>参考: <a href="https://www.ecma-international.org/ecma-262/#sec-number.min_value" rel="nofollow noreferrer">20.1.2.9 Number.MIN_VALUE</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怪异的JavaScript系列(一)

## 原文链接
[https://segmentfault.com/a/1190000014555328](https://segmentfault.com/a/1190000014555328)

