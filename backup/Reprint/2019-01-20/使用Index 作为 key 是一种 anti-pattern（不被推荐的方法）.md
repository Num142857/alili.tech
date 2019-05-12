---
title: '使用Index 作为 key 是一种 anti-pattern（不被推荐的方法）' 
date: 2019-01-20 2:30:11
hidden: true
slug: e12sdtyslgf
categories: [reprint]
---

{{< raw >}}

            <p>很多时候，我看到开发人员在呈现列表时使用项目的<em>index</em>作为其<em>key</em>。</p>
<pre><code class="hljs clojure">{todos.map((<span class="hljs-name">todo</span>, index) =&gt;  )}
</code></pre><p>它看起来优雅，它确实摆脱了警告（这是'real'的问题，对吧？）。但是这么做有什么危险？</p>
<blockquote>
<p>它可能会破坏你的应用程序并显示错误的数据</p>
</blockquote>
<p>让我解释一下，<em>key</em>是React用来识别DOM元素的唯一东西。如果你将一个项目推入列表或删除中间的东西会发生什么？如果<em>key</em>与之前的相同，则React假定DOM元素表示与以前相同的组件，但这是不对的。</p>
<p><img src="https://p0.ssl.qhimg.com/t01609657d8b165e48f.png" alt=""></p>
<p>为了演示潜在的危险，我创建了<a href="http://output.jsbin.com/wohima">一个简单的示例</a>（<a href="http://jsbin.com/wohima/edit?js,output">源码地址</a>）。</p>
<p><img src="https://p0.ssl.qhimg.com/t017bc9279001a277ae.jpg" alt=""></p>
<p>事实证明，当没有任何东西传递时，React使用<em>index</em>作为<em>key</em>，因为这是目前最好的猜测。此外，它会警告你，它是不理想的（它说，有点混乱的话，是的）。如果你自己提供它，React只会认为你知道你在做什么 - 记住这个例子 - 可能会导致不可预知的结果。</p>
<h4>更好</h4>
<p>每个这样的项目应该有一个<em>永久性</em> 和 _独特_ 的属性。理想情况下，应在创建项目时分配它。当然，我正在谈论一个_id_。然后我们可以通过以下方式使用它：</p>
<pre><code class="hljs clojure">{todos.map((<span class="hljs-name">todo</span>) =&gt;  )}
</code></pre><blockquote>
<p><strong>注意:</strong> 首先查看项目的现有属性。他们已经有可以用作_id_的东西了。.</p>
</blockquote>
<p>一种方法是将抽象中的编号移动一步。使用全局索引确保任何两个项目都有不同的_id_s。</p>
<pre><code class="hljs abnf"><span class="hljs-attribute">todoCounter</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
</code></pre><pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNewTodo</span>(<span class="hljs-params">text</span>) </span>{  <span class="hljs-keyword">return</span> {    <span class="hljs-attribute">completed</span>: <span class="hljs-literal">false</span>,    <span class="hljs-attribute">id:</span><span class="hljs-string"> todoCounter</span>++,    text  "}}"
</code></pre><h4>更好的解决方法</h4>
<p>生产解决方案应该使用更强大的方法来处理物品的分布式创建。为此，我建议使用 <a href="https://www.npmjs.com/package/shortid">shortid</a>。它很快产生'hort non-sequential url-friendly unique'ID。代码可能如下所示：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var shortid</span> = require(<span class="hljs-string">'shortid'</span>);
</code></pre><pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNewTodo</span>(<span class="hljs-params">text</span>) </span>{  <span class="hljs-keyword">return</span> {    <span class="hljs-attribute">completed</span>: <span class="hljs-literal">false</span>,    <span class="hljs-attribute">id:</span><span class="hljs-string"> shortid.generate</span>(),    text  "}}"
</code></pre><blockquote>
<p><strong>TL;DR:</strong>为每个项目生成一个唯一的_id_，并在呈现列表时将其用作<em>key</em>。</p>
</blockquote>
<h4>更新：来自规则的例外</h4>
<p>许多人问他们是否总是需要生成ID。其他人建议使用<em>index</em>作为<em>key</em>的用例似乎是合理的。</p>
<p>确实，有时产生新的ID是多余的并且可以避免。例如翻译许可条款或贡献者名单。</p>
<p>为了帮助您做出决定，我将这三个例子的共同点放在一起：</p>
<ol>
<li>列表和项目是静态的 - 它们不被计算并且不改变;</li>
<li>列表中的项目没有ID;</li>
<li>该列表从不重新排序或过滤。</li>
</ol>
<p>当 <em>以上条件</em> 都满足时，你可以<strong>安全地使用索引作为关键。</strong></p>
<p>#### 
更新2：React，Preact和*React</p>
<p>虽然在这篇文章中我写了关于React的问题，但问题不是排它的。在像Preact这样的类似的库中，危险也存在。但是，效果可能会有所不同。</p>
<p>请参阅以下StackOverflow问题，其中最后一个元素消失。另请注意Preact创建者提供的答案中的解释t, <a href="https://medium.com/@developit">Jason Miller</a>.</p>
<h4>参考文献和相关文章</h4>
<ul>
<li><a href="https://facebook.github.io/react/docs/multiple-components.html#dynamic-children">Dynamic Children</a> and <a href="https://facebook.github.io/react/docs/create-fragment.html">Keyed Fragments</a> in React Docs</li>
<li><a href="https://github.com/facebook/react/issues/1342#issuecomment-39230939">Explanation from Paul O’Shannessy</a></li>
<li><a href="https://coderwall.com/p/jdybeq/the-importance-of-component-keys-in-react-js">The importance of component keys in React.js</a></li>
<li><a href="http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/">React.js and Dynamic Children — Why the Keys are Important</a></li>
<li><a href="http://unitstep.net/blog/2015/03/03/using-react-animations-to-transition-between-ui-states/">React animations for a single component</a>, section <em>The key is using key</em></li>
<li><a href="https://paulgray.net/keys-in-react/">Why you need keys for collections in React</a> by <a href="https://medium.com/@pfgray">Paul Gray</a></li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Index 作为 key 是一种 anti-pattern（不被推荐的方法）

## 原文链接
[https://www.zcfy.cc/article/index-as-a-key-is-an-anti-pattern](https://www.zcfy.cc/article/index-as-a-key-is-an-anti-pattern)

