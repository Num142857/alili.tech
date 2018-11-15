---
title: 在JavaScript中为什么应该用map和filter替换forEach？
hidden: true
categories: reprint
slug: e3f771f8
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><em>当你需要拷贝一个数组的全部或者部分到一个新数组的时候，优先使用map和filter而不是forEach。</em></p>
<p>咨询工作的好处之一是我可以看到无数的项目。这些项目在规模、使用的编程语言和开发人员的能力方面差别很大。虽然有很多我觉得应该废弃的模式，但是在JavaScript中，我觉得最应该废弃的是使用forEach创建新的数组。事实上，这个模式非常简单，看起来如下所示：</p>
<pre><code class="hljs inform7">const kids = <span class="hljs-comment">[]</span>;
people.forEach(<span class="hljs-keyword">person</span> =&gt; {
  if (<span class="hljs-keyword">person</span>.age &lt; 15) {
    kids.push({ id: <span class="hljs-keyword">person</span>.id, name: <span class="hljs-keyword">person</span>.name });
  }
});


</code></pre><p>上面代码做的操作就是处理包含所有人的数组，并找出年龄小于15的人。然后把每一个符合条件的’孩子‘的部分属性组成的新对象添加到kids数组中。</p>
<p>虽然可以满足需求，但是有一种势在必行的编码方式(查看<a href="https://en.wikipedia.org/wiki/Programming_paradigm">编程范式</a>)。所以，你可能会想哪里出了问题？要理解这一点，让我们先熟悉两个”朋友“：map和filter。</p>
<h2>map &amp; filter</h2>
<p>map和filter是在2015年作为ES6特征集的一部分引入到JavaScript中的。它们是数组的方法，允许在JavaScript中使用更函数式的编码风格。和在函数式编程的世界里一样，这两个方法也不会修改原数组，而是返回一个新数组。它们都接受一个类型是函数的单一变量。然后，这个函数会在原数组的每一项上被调用去产生最终结果。让我们看下这两个方法做了什么：</p>
<ul>
<li><p>map：每一项调用函数的返回结果会放在这个方法返回的新数组里。</p>
</li>
<li><p>filter：每一项调用函数的返回结果决定这一项是否会被该方法返回的数组包含。</p>
</li>
</ul>
<p>类似的还有一个方法，只是很少被用到，也就是<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">reduce</a>。</p>
<p>以下是查看实际操作的简单例子：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> doubled = numbers.map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> <span class="hljs-built_in">number</span> * <span class="hljs-number">2</span>); <span class="hljs-comment">// [2, 4, 6, 8, 10]</span>
<span class="hljs-keyword">const</span> even = numbers.filter(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> <span class="hljs-built_in">number</span> % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>); <span class="hljs-comment">// [2, 4]</span>

</code></pre><p>现在我们知道map和filter是干什么的了，接下来我们会看到一个例子，在这个例子中会展示我更偏向于怎么写前面的例子：</p>
<pre><code class="hljs inform7">const kids = people
  .filter(<span class="hljs-keyword">person</span> =&gt; <span class="hljs-keyword">person</span>.age &lt; 15)
  .map(<span class="hljs-keyword">person</span> =&gt; ({ id: <span class="hljs-keyword">person</span>.id, name: <span class="hljs-keyword">person</span>.name }));


</code></pre><p>如果你想了解用在map方法里面的lambda表达式的语法，查看这个<a href="https://stackoverflow.com/a/28770578/1744702">Stack Overflow回答</a>了解详情。</p>
<p>所以，这种实现方式的好处如下：</p>
<ul>
<li><p>关注点分离：过滤和改变数据的格式是两个不相关的关注点，对两个关注点分别使用各自的方法可以达到关注点分离的目的。</p>
</li>
<li><p>易于测试：两种目的都使用了简单的<a href="https://en.wikipedia.org/wiki/Pure_function">纯函数</a>，使得各种行为的单元测试变得简单。值得一提的是最初的实现版本并不是纯粹的，因为依赖一些作用域外边的状态（keys数组）。</p>
</li>
<li><p>可读性：因为这两个方法有明确的目的，一个是过滤数据，一个是改变数据的格式，所以很容易看出对数据做了哪些处理。尤其是像reduce这样的同类函数。</p>
</li>
<li><p>异步编程：forEach和async/await不能很好地结合在一起。但是map提供了一种有用的模式，可以和promises和async/await一起使用。更多关于这一点的内容会在下一篇博客中介绍。</p>
</li>
</ul>
<p>同样值得注意的是，当你想产生副作用的时候，比如修改全局状态，不要使用map。尤其是当map方法的返回值并不会被保存或者使用的时候。</p>
<h2>总结</h2>
<p>使用map和filter有很多好处，比如关注点分离、易于测试、可读性和异步编程的支持。因此，对我来说这是一个明智的选择。但是，我经常遇到使用forEach的开发人员。虽然函数式编程可能有点儿吓人，但是这些方法并没有什么好害怕的，即使它们有一些函数式编程的特征。map和filter在<a href="https://en.wikipedia.org/wiki/Reactive_programming">响应式编程</a>中也被大量的用到。由于<a href="http://reactivex.io/rxjs/">RxJS</a>，现在响应式编程在JavaScript中被越来越多的用到。但请注意，它们可能会永久地改变你的编码方式。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/why-you-should-replace-foreach-with-map-and-filter-in-javascript](https://www.zcfy.cc/article/why-you-should-replace-foreach-with-map-and-filter-in-javascript)
原文标题: 在JavaScript中为什么应该用map和filter替换forEach？
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
