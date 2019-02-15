---
title: 'JavaScript: 什么是纯函数以及为什么要用纯函数?' 
date: 2019-02-15 2:30:44
hidden: true
slug: qpsy2j0ebq
categories: [reprint]
---

{{< raw >}}

            <p><img src="https://p1.ssl.qhimg.com/t01fb57cd048e10f825.png" alt=""></p>
<p>当我第一次听到 “纯函数 (Pure Function)” 这个术语的时候我很疑惑。常规的函数做错了什么？为什么要变纯？ 为什么我需要纯的函数？</p>
<p>除非你已经知道什么是纯函数，否则你可能会问同样的疑惑。不过这个概念其实很简单。我们可以花个 5 分钟一起来看以下。</p>
<h3>什么函数是纯的？</h3>
<p>纯函数的定义是：</p>
<ol>
<li><p>如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。</p>
</li>
<li><p>该函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变（mutation）。</p>
</li>
</ol>
<p>这就是纯的函数。 如果一个函数符合上述 2 个要求，它就是纯函数。 你可能在过去甚至无意地情况下编写过纯函数。</p>
<p>在我们研究一个函数一个纯或不纯之前，让我们先讨论一下可怕的“副作用”。</p>
<h3>什么是可观察的副作用？</h3>
<p>一个可以被观察的副作用是在函数内部与其外部的<strong>任意</strong>交互。这可能是在函数内修改外部的变量，或者在函数里调用另外一个函数等。</p>
<p><strong>注:</strong> 如果纯函数调用纯函数，则不产生副作用依旧是纯函数。</p>
<p>副作用来自，但不限于：</p>
<ul>
<li><p>进行一个 HTTP 请求</p>
</li>
<li><p>Mutating data</p>
</li>
<li><p>输出数据到屏幕或者控制台</p>
</li>
<li><p>DOM 查询/操作</p>
</li>
<li><p>Math.random()</p>
</li>
<li><p>获取的当前时间</p>
</li>
</ul>
<p>副作用本身并不是毒药，某些时候往往是必需的。 但是，对于要保持纯粹的函数，它不能包含任何副作用。当然，并非所有函数都需要是纯函数。 我将在稍后讨论这个情况。</p>
<p>不过首先，让我们来看一些纯的和不纯的函数对比的例子......</p>
<h3><strong>纯函数的例子</strong></h3>
<p>以下是一个计算产品税后价格（英国税率是20%）的纯函数的例子：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">priceAfterTax</span>(productPrice) { <span class="hljs-keyword">return</span> <span class="hljs-type">(productPrice</span> * <span class="hljs-number">0.20</span>) + productPrice;}

</code></pre><p>它符合我们所说的两条纯函数的定义。不依赖于任何外部输入，不改变任何外部数据、没有副作用。</p>
<p>即使你用同样的输入运行运行这个函数 100,000,000 次它<strong>依旧产生同样的结果</strong>。</p>
<h3><strong>非纯函数</strong></h3>
<p>我们已经看了纯函数的例子，现在一起来看一个非纯函数（Impure function）的 JavaScript 例子:</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var tax</span> = 20;

</code></pre><pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">calculateTax</span>(productPrice) { <span class="hljs-keyword">return</span> <span class="hljs-type">(productPrice</span> * (tax/<span class="hljs-number">100</span>)) + productPrice;
}

</code></pre><p>暂停片刻，看看你是否能看出为什么这个函数不纯。</p>
<p>其中函数的计算结果取决于外部 tax 变量，而纯函数不能依赖外部变量。它没有满足定义中的第一个要求，因此这个函数是不纯的。</p>
<h3>为什么说纯函数在 JavaScript 很重要？</h3>
<p>纯函数在函数式编程中被大量使用。而且诸如 <a href="https://facebook.github.io/react/docs/components-and-props.html">ReactJS</a> 和 <a href="http://redux.js.org/docs/introduction/ThreePrinciples.html">Redux</a> 等优质的库都需要使用纯函数。</p>
<p>不过，纯函数也可以用在平常的 JavaScript 开发中使用，不一定要限死在某个编程范例中。 你可以混合纯的和不纯的函数，这完全没问题。</p>
<p>并非所有函数都需要是纯的。 例如，操作 DOM 的按钮按下的事件处理程序就不适合纯函数。 不过，这种事件处理函数可以调用其他纯函数来处理，以此减少项目中不纯函数的数量。</p>
<h4>可测试性和重构</h4>
<p>另一个使用纯函数的原因是测试以及重构。</p>
<p>使用纯函数的一个主要好处是它们可以直接测。 如果传入相同的参数，它们将始终产生相同的结果。</p>
<p>同时纯函数还使得维护和重构代码变得更加容易。你可以放心地重构一个纯函数，不必操心没注意到的副作用搞乱了整个应用而导致终调试地狱。（译注：如果项目中充斥着副作用，那么函数/模块之间的逻辑可能互相交织耦合，在后期新增逻辑时可能由于依赖复杂而难以重构，更常见的是开发为了应付需求而不断的引入新的副作用到原本的逻辑上从而导致代码变得越来越糟糕。）</p>
<p>正确地使用纯函数可以产生更加高质量的代码。并且也是一种更加干净的编码方式。</p>
<p>此外，纯函数不不是 JavaScript 的专利。想要了解更多内容可以参见 <a href="https://en.wikipedia.org/wiki/Pure_function">Wiki</a>。同时也推荐阅读 <a href="https://drboolean.gitbooks.io/mostly-adequate-guide/ch3.html">开发建议手册</a> 以及 <a href="https://toddmotto.com/pure-versus-impure-functions">纯函数 vs. 非纯函数</a>.</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript: 什么是纯函数以及为什么要用纯函数?

## 原文链接
[https://www.zcfy.cc/article/javascript-what-are-pure-functions-and-why-use-them](https://www.zcfy.cc/article/javascript-what-are-pure-functions-and-why-use-them)

