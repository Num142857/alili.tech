---
title: '理解 JavaScript: new 关键字' 
date: 2019-01-19 2:30:10
hidden: true
slug: grn0hn7quxd
categories: [reprint]
---

{{< raw >}}

            <p>由于存在海量的库和工具，以及各种各样简化你开发的玩意儿，很多程序员开始在不深入了解底层的情况下开发应用。JavaScript就是这种现象的代言人。JavaScript作为一种最复杂的且流传最广泛的语言，很多的开发者被高层次库的使用吸引，同时将糟粕抽离。</p>
<p>尽管你在不深入了解的情况下仍可以开发值得称道的应用，但深入JavaScript绝对让你收益。对“怪异部分”的理解可以让高级开发者在芸芸众生中脱颖而出，另外，虽然JS的生态日新月异，但对“怪异部分”的理解依旧是所有其他工具的基础。理解了这些就会拓展你的视野，并且改变你看待开发过程的方式。</p>
<p>在我 <a href="https://hackernoon.com/understanding-javascript-the-this-keyword-4de325d77f68">之前的文章</a> 中稍微提到过<code>new</code>关键字，它创建了一个对<code>this</code>的绑定。在面向对象语言中，<code>new</code>关键字总是用于实例化一个类。</p>
<pre><code class="hljs haxe"><span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> <span class="hljs-type">Dog</span>();
</code></pre><p>原理是类的构造函数被调用，并且实例化了新的对象。尽管JavaScript的语法非常相同，但使用<code>new</code>在底层还是会引发不同行为</p>
<h3>没有构造函数</h3>
<p>首先，我们并不是必须要用一个类来生成对象。在JavaScript中我们可以用函数就能实现此目标。构造函数只不过是在调用时<code>new</code>关键字放在其前面的普通函数而已。你可以说没有构造函数-只有构造函数调用，因为实际上所有的函数都可以被调用去创建对象。这并不是对象或者类或者任何特殊定义方式的一部分。</p>
<p>这里有几个<strong>构造函数调用</strong>经历的步骤，但我们只关注现在讨论的事项：</p>
<p>1.一个新对象被创建
2.<code>this</code>被绑定到新对象上面
3.除非函数返回它自己的对象，否则调用将返回已构造的对象</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Alex"</span>)
<span class="hljs-built_in">console</span>.log(person.name) <span class="hljs-comment">// Alex</span>
</code></pre><h3>总结</h3>
<p>总结一下，这并不是一个难懂的概念。要点就是要始终记得，任何函数都可以像构造函数一样被调用，并且会创建一个<code>this</code>的绑定。</p>
<p>非常感谢阅读，期待你的反馈。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解 JavaScript: new 关键字

## 原文链接
[https://www.zcfy.cc/article/understanding-javascript-new-keyword](https://www.zcfy.cc/article/understanding-javascript-new-keyword)

