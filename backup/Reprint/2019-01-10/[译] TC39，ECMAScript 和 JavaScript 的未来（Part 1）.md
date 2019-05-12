---
title: '[译] TC39，ECMAScript 和 JavaScript 的未来（Part 1）' 
date: 2019-01-10 2:30:08
hidden: true
slug: 3nc5lecdaly
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript#stage-0" rel="nofollow noreferrer" target="_blank">TC39, ECMAScript, and the Future of JavaScript</a><br>作者：<a href="https://ponyfoo.com/contributors/ponyfoo" rel="nofollow noreferrer" target="_blank">Nicolás Bevacqua</a></p>
<hr>
<h2 id="articleHeader0">译者序</h2>
<p>很荣幸能够和 Nicolás Bevacqua 同台分享。Nicolás Bevacqua 分享了《the Future of Writing JavaScript 》，我在其后分享了《面向前端开发者的V8性能优化》。如果想了解更多 V8 知识可以关注我的专栏：<a href="https://zhuanlan.zhihu.com/v8core" rel="nofollow noreferrer" target="_blank">V8 引擎</a>。</p>
<p>由于 Nicolás Bevacqua 是英文分享，现场由很多听众都没有太明白，会后我联系了 Nicolás Bevacqua 争得大神同意后将其文章翻译为中文。</p>
<p><span class="img-wrap"><img data-src="/img/bVP9I5?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVP9I5?w=1080&amp;h=1920" alt="Nicolás Bevacqua justjavac" title="Nicolás Bevacqua justjavac" style="cursor: pointer; display: inline;"></span></p>
<p>大神微信玩的很溜，很快就学会了抢红包。</p>
<p>再次感谢 Nicolás Bevacqua 的精彩分享。</p>
<hr>
<p>译文：</p>
<blockquote><p>上周，我在中国深圳的<a href="http://tfc.alloyteam.com/" rel="nofollow noreferrer" target="_blank">腾讯前端大会</a>上发表了与本文同名的<a href="https://ponyfoo.com/presentations/tc39-ecmascript-and-the-future-of-javascript" rel="nofollow noreferrer" target="_blank">演讲</a>。在这篇文章中，我根据 PonyFoo 网站的格式重新编辑了一遍。我希望你喜欢它！</p></blockquote>
<h2 id="articleHeader1">TC39 是什么？</h2>
<p>TC39 指的是技术委员会（Technical Committee）第 39 号。它是 ECMA 的一部分，ECMA 是 “ECMAScript” 规范下的 JavaScript 语言标准化的机构。</p>
<p>ECMAScript 规范定义了 JavaScript 如何一步一步的进化、发展。其中规定了：</p>
<ul>
<li><p>字符串 <code>'A'</code> 为什么是 <code>NaN</code></p></li>
<li><p>字符串 <code>'A'</code> 为什么<strong>不等于</strong> <code>NaN</code></p></li>
<li><p><code>NaN</code> 为什么是 <code>NaN</code>，但却<strong>不等于</strong> <code>NaN</code></p></li>
<li><p>并介绍了为什么 <code>Number.isNaN</code> 是一个很好的 idea ...</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN(NaN) // true
isNaN('A') // true
'A' == NaN // false
'A' === NaN // false
NaN === NaN // false

// … 解决方案!

Number.isNaN('A') // false
Number.isNaN(NaN) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">isNaN</span>(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'A'</span>) <span class="hljs-comment">// true</span>
<span class="hljs-string">'A'</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>
<span class="hljs-string">'A'</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>
<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>

<span class="hljs-comment">// … 解决方案!</span>

<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'A'</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span></code></pre>
<p>它还解释了正零与负零什么情况下相等，什么情况下不相等。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+0 == -0 // true
+0 === -0 // true
1/+0 === 1 / -0 // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">+<span class="hljs-number">0</span> == <span class="hljs-number">-0</span> <span class="hljs-comment">// true</span>
+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span> <span class="hljs-comment">// true</span>
<span class="hljs-number">1</span>/+<span class="hljs-number">0</span> === <span class="hljs-number">1</span> / <span class="hljs-number">-0</span> <span class="hljs-comment">// false</span></code></pre>
<p>而且 js 中还有很多奇技淫巧，例如只使用感叹号、小括号、方括号和加号来编码任何有效的 JavaScript 表达式。可以在 <a href="http://jsfuck.com/" rel="nofollow noreferrer" target="_blank">JSFuck</a> 网站了解更多关于如何只使用 <code>+!()[]</code> 编写 JavaScript 代码的技巧。</p>
<p>不论如何，TC39 所做的不懈努力是<strong>难能可贵</strong>的。</p>
<p>TC39 遵循的原则是：分阶段加入不同的语言特性。一旦提案成熟，TC39 会根据提案中的变动来更新规范。直到最近，TC39 依然依赖基于 Microsoft Word 的比较传统的工作流程。但 ES3 出来之后，他们花了<strong>十年时间，几乎没有任何改变</strong>，使其达到规范。之后，ES6 又花了四年才能实现。</p>
<hr>
<p>显然，他们的流程必须改善。</p>
<hr>
<p>自 ES6 出来之后，他们精简了提案的修订过程，以满足现代化开发的需求。新流程使用 HTML 的超集来格式化提案。他们使用 <a href="https://github.com/tc39/proposals" rel="nofollow noreferrer" target="_blank">GitHub pull requests</a>，这有助于增加社区的参与，并且提出的提案数量也增加了。这个规范现在是一个 <a href="https://tc39.github.io/ecma262" rel="nofollow noreferrer" target="_blank">living standard</a>，这意味着提案会更快，而且我们也不用等待新版本的规范出来。</p>
<p>新流程涉及四个不同的 Stage。一个提案越成熟，越有可能最终将其纳入规范。</p>
<h2 id="articleHeader2">Stage 0</h2>
<p>任何尚未提交作为正式提案的讨论、想法变更或者补充都被认为是第 0 阶段的“稻草人”提案。只有 TC39 的成员可以创建这些提案，而且今天就有若干活跃的“稻草人”提案。</p>
<p>目前在 Stage 0 的提案包括异步操作的 <a href="https://github.com/tc39/proposal-cancellation" rel="nofollow noreferrer" target="_blank">cancellation tokens </a>， <a href="https://github.com/domenic/zones" rel="nofollow noreferrer" target="_blank">Zones</a> 作为 Angular 团队的一员，提供了很多建议。Stage 0 包括了很多一直没有进入 Stage 1 的提案。</p>
<p>在这篇文章的后面，我们将仔细分析一部分提案。</p>
<h2 id="articleHeader3">Stage 1</h2>
<p>在 Stage 1，提案已经被正式化，并期望解决此问题，还需要观察与其他提案的相互影响。在这个阶段的提案确定了一个分散的问题，并为这个问题提供了具体的解决方案。</p>
<p>Stage 1 提议通常包括高阶 API 描述（high level AP），使用示例以及内部语义和算法的讨论。这些建议在通过这一过程时可能会发生重大变化。</p>
<p>Stage 1 目前提案的例子包括：<a href="https://ponyfoo.com/articles/observables-coming-to-ecmascript" rel="nofollow noreferrer" target="_blank">Observable</a>、<a href="https://ponyfoo.com/articles/proposal-statements-as-expressions-using-do" rel="nofollow noreferrer" target="_blank">do</a> 表达式、生成器箭头函数、<a href="https://github.com/tc39/proposal-promise-try" rel="nofollow noreferrer" target="_blank">Promise.try</a>。</p>
<h2 id="articleHeader4">Stage 2</h2>
<p>Stage 2 的提案应提供规范初稿。</p>
<p>此时，语言的实现者开始观察 runtime 的具体实现是否合理。该实现可以使用 polyfill 的方式，以便使代码可在 runtime 中的行为负责规范的定义; javascript 引擎的实现为提案提供了原生支持; 或者可以 Babel 这样的编译时编译器来支持。</p>
<p>目前 Stage 2 阶段的提案有 <a href="https://github.com/tc39/proposal-class-fields" rel="nofollow noreferrer" target="_blank">public class fields</a>、<a href="https://medium.com/the-thinkmill/javascripts-new-private-class-fields-93106e37647a" rel="nofollow noreferrer" target="_blank">private class fields</a>、<a href="https://ponyfoo.com/articles/javascript-decorators-proposal" rel="nofollow noreferrer" target="_blank">decorators</a>、<a href="https://github.com/tc39/proposal-promise-finally" rel="nofollow noreferrer" target="_blank">Promise#finally</a>、等等。</p>
<h2 id="articleHeader5">Stage 3</h2>
<p>Stage 3 提案是建议的候选提案。在这个高级阶段，规范的编辑人员和评审人员必须在最终规范上签字。Stage 3 的提案不会有太大的改变，在对外发布之前只是修正一些问题。</p>
<p>语言的实现者也应该对此提案感兴趣 - 如果只是提案却没有具体实现去支持这个提案，那么这个提案早就胎死腹中了。事实上，提案至少具有一个浏览器实现、友好的 polyfill或者由像 Babel 这样的构建时编译器支持。</p>
<p>Stage 3 由很多令人兴奋的功能，如<a href="https://github.com/tc39/proposal-object-rest-spread" rel="nofollow noreferrer" target="_blank">对象的解析与剩余</a>，<a href="https://ponyfoo.com/articles/javascript-asynchronous-iteration-proposal" rel="nofollow noreferrer" target="_blank">异步迭代器</a>，<a href="https://github.com/tc39/proposal-dynamic-import" rel="nofollow noreferrer" target="_blank">import()</a> 方法和<a href="https://ponyfoo.com/articles/regular-expressions-post-es6" rel="nofollow noreferrer" target="_blank">更好的 Unicode 正则表达式支持</a>。</p>
<h2 id="articleHeader6">Stage 4</h2>
<p>最后，当规范的实现至少通过两个验收测试时，提案进入 Stage 4。</p>
<p>进入 Stage 4 的提案将包含在 ECMAScript 的下一个修订版中。</p>
<p><a href="https://ponyfoo.com/articles/understanding-javascript-async-await" rel="nofollow noreferrer" target="_blank">异步函数</a>，<a href="https://github.com/tc39/Array.prototype.includes/" rel="nofollow noreferrer" target="_blank">Array#includes</a> 和 <a href="https://github.com/rwaldron/exponentiation-operator" rel="nofollow noreferrer" target="_blank">幂运算符</a> 是 Stage 4 的一些特性。</p>
<h2 id="articleHeader7">保持最新 Staying Up To Date</h2>
<p>我(原文作者)创建了一个网站，用来展示当前提案的列表。它描述了他们在什么阶段，并链接到每个提案，以便您可以更多地了解它们。</p>
<p>网址为 <a href="https://prop-tc39.now.sh/" rel="nofollow noreferrer" target="_blank">proptt39.now.sh</a>。</p>
<p>目前，每年都有新的正式规范版本，但精简的流程也意味着正式版本变得越来越不相关。现在重点放在提案阶段，我们可以预测，在 ES6 之后，对该标准的具体修订的引用将变得不常见。</p>
<h2 id="articleHeader8">提案 Proposals</h2>
<p>我们来看一些目前正在开发的最有趣的提案。</p>
<h2 id="articleHeader9">Array#includes （Stage 4）</h2>
<p>在介绍 <code>Array#includes</code> 之前，我们不得不依赖 <code>Array#indexOf</code> 函数，并检查索引是否超出范围，以确定元素是否属于数组。</p>
<p>随着 <code>Array#includes</code> 进入 Stage 4，我们可以使用 <code>Array#includes</code> 来代替。它补充了 ES6 的 <code>Array#find</code> 和 <code>Array#findIndex</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2].indexOf(2) !== -1 // true
[1, 2].indexOf(3) !== -1 // false
[1, 2].includes(2) // true
[1, 2].includes(3) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].indexOf(<span class="hljs-number">2</span>) !== <span class="hljs-number">-1</span> <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].indexOf(<span class="hljs-number">3</span>) !== <span class="hljs-number">-1</span> <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].includes(<span class="hljs-number">2</span>) <span class="hljs-comment">// true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].includes(<span class="hljs-number">3</span>) <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader10">异步函数（Stage 4）</h2>
<p>当我们使用 Promise 时，我们经常考虑执行线程。我们有一个异步任务 <code>fetch</code>，其他任务依赖于 <code>fetch</code> 的响应，但在收到该数据之前程序时阻塞的。</p>
<p>在下面的例子中，我们从 API 中获取产品列表，该列表返回一个 <code>Promise</code>。当 fetch 相应之后，Promise 被 resolve。然后，我们将响应流作为 JSON 读取，并使用响应中的数据更新视图。如果在此过程中发生任何错误，我们可以将其记录到控制台，以了解发生了什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    updateView(data)
  })
  .catch(err => {
    console.log('Update failed', err)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/api/products'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    updateView(data)
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Update failed'</span>, err)
  })</code></pre>
<p>异步函数提供了语法糖，可以用来改进我们基于 <code>Promise</code> 的代码。我们开始逐行改变以上基于 Promise 的代码。我们可以使用 <code>await</code> 关键字。当我们 <code>await</code> 一个 Promise 时，我们得到 Promise 的 fulled 状态的值。</p>
<p>Promise 代码的意思是：“我想执行这个操作，然后(then)在其他操作中使用它的结果”。</p>
<p>同时，<code>await</code> 有效地反转了这个意思，使得它更像：“我想要取得这个操作的结果”。我喜欢，因为它听起来更简单。</p>
<p>在我们的示例中，响应对象是我们之后获取的，所以我们将等待(<code>await</code>)获取(<code>fetch</code>)操作的结果，并赋值给 <code>response</code> 变量，而不是使用 <code>promise</code> 的 <code>then</code>。</p>
<p>原文：we’ll flip things over and assigned the result of <code>await</code> <code>fetch</code> to the <code>response</code> variable</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ const response = await fetch('/api/products')
- fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      updateView(data)
    })
    .catch(err => {
      console.log('Update failed', err)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+ const response = await fetch('/api/products')</span>
<span class="hljs-deletion">- fetch('/api/products')</span>
    .then(response =&gt; response.json())
    .then(data =&gt; {
      updateView(data)
    })
    .catch(err =&gt; {
      console.log('Update failed', err)
    })</code></pre>
<p>我们给 <code>response.json()</code> 同样的待遇。我们 <code>await</code> 上一次的操作并将其赋值给 <code>data</code> 变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const response = await fetch('/api/products')
+ const data = await response.json()
-   .then(response => response.json())
    .then(data => {
      updateView(data)
    })
    .catch(err => {
      console.log('Update failed', err)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  const response = await fetch('/api/products')
<span class="hljs-addition">+ const data = await response.json()</span>
<span class="hljs-deletion">-   .then(response =&gt; response.json())</span>
    .then(data =&gt; {
      updateView(data)
    })
    .catch(err =&gt; {
      console.log('Update failed', err)
    })</code></pre>
<p>既然 <code>then</code> 链已经消失了，我们就可以直接调用 <code>updateView</code> 语句了，因为我们已经到了之前代码中的 Promise then 链的尽头，我们不需要等待任何其他的 Promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const response = await fetch('/api/products')
  const data = await response.json()
+ updateView(data)
-   .then(data => {
-     updateView(data)
-   })
    .catch(err => {
      console.log('Update failed', err)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">  const response = await fetch('/api/products')
  const data = await response.json()
<span class="hljs-addition">+ updateView(data)</span>
<span class="hljs-deletion">-   .then(data =&gt; {</span>
<span class="hljs-deletion">-     updateView(data)</span>
<span class="hljs-deletion">-   })</span>
    .catch(err =&gt; {
      console.log('Update failed', err)
    })</code></pre>
<p>现在我们可以使用 <code>try/catch</code> 块，而不是 <code>.catch</code>，这使得我们的代码更加语义化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ try {
    const response = await fetch('/api/products')
    const data = await response.json()
    updateView(data)
+ } catch(err) {
- .catch(err => {
    console.log('Update failed', err)
+ }
- )}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+ try {</span>
    const response = await fetch('/api/products')
    const data = await response.json()
    updateView(data)
<span class="hljs-addition">+ } catch(err) {</span>
<span class="hljs-deletion">- .catch(err =&gt; {</span>
    console.log('Update failed', err)
<span class="hljs-addition">+ }</span>
<span class="hljs-deletion">- )}</span></code></pre>
<p>一个限制是 <code>await</code> 只能在异步函数内使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ async function run() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      updateView(data)
    } catch(err) {
      console.log('Update failed', err)
    }
+ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+ async function run() {</span>
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      updateView(data)
    } catch(err) {
      console.log('Update failed', err)
    }
<span class="hljs-addition">+ }</span></code></pre>
<p>但是，我们可以将异步函数转换为自调用函数表达式。如果我们将顶级代码包在这样的表达式中，我们可以在代码中的任何地方使用 <code>await</code> 表达式。</p>
<p>一些社区希望原生支持顶级块作用于的 <code>await</code>，而另外一些人则认为这会对用户造成负面影响，因为一些库可能会阻塞异步加载，从而大大减缓了我们应用程序的加载时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ (async () => {
- async function run() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      updateView(data)
    } catch(err) {
      console.log('Update failed', err)
    }
+ })()
- }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+ (async () =&gt; {</span>
<span class="hljs-deletion">- async function run() {</span>
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      updateView(data)
    } catch(err) {
      console.log('Update failed', err)
    }
<span class="hljs-addition">+ })()</span>
<span class="hljs-deletion">- }</span></code></pre>
<p>就个人而言，我认为在 JavaScript 性能中已经有足够的空间来应对这种愚蠢的事情，来优化初始化的库使用 <code>await</code> 的行为。</p>
<p>请注意，您也可以在 non-promise 的值前面使用 <code>await</code>，甚至编写代码 <code>await (2 + 3)</code>。在这种情况下，<code>(2 + 3)</code> 表达的结果会被包在 Promise 中，作为 Promise 的最终值。<code>5</code> 成为这个 <code>await</code> 表达式的结果。</p>
<p>请注意，<code>await</code> 加上任何 JavaScript 表达式也是一个表达式。这意味着我们不限制 <code>await</code> 语句的赋值操作，而且我们也可以把 <code>await</code> 函数调用作为模板文字插值的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`Price: ${ await getPrice() }`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-string">`Price: <span class="hljs-subst">${ <span class="hljs-keyword">await</span> getPrice() }</span>`</span></code></pre>
<p>或作为另一个函数调用的一部分...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderView(await getPrice())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">renderView(<span class="hljs-keyword">await</span> getPrice())</code></pre>
<p>甚至作为数学表达式的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 * (await getPrice())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-number">2</span> * (<span class="hljs-keyword">await</span> getPrice())</code></pre>
<p>最后，不管它们的内容如何，​​异步函数<strong>总是返回一个 Promise</strong>。这意味着我们可以添加 <code>.then</code> 或 <code>.catch</code> 等异步功能，也可以使用 <code>await</code> 获取最终的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = delay => new Promise(resolve =>
  setTimeout(resolve, delay)
)

const slowLog = async (...terms) => {
  await sleep(2000)
  console.log(...terms)
}

slowLog('Well that was underwhelming')
  .then(() => console.log('Nailed it!'))
  .catch(reason => console.error('Failed', reason))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sleep = <span class="hljs-function"><span class="hljs-params">delay</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span>
  setTimeout(resolve, delay)
)

<span class="hljs-keyword">const</span> slowLog = <span class="hljs-keyword">async</span> (...terms) =&gt; {
  <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">2000</span>)
  <span class="hljs-built_in">console</span>.log(...terms)
}

slowLog(<span class="hljs-string">'Well that was underwhelming'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Nailed it!'</span>))
  .catch(<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed'</span>, reason))</code></pre>
<p>正如您所期望的那样，返回的 Promise 与 <code>async</code> 函数返回的值进行运算，或者被 catch 函数来处理任何未捕获的异常。</p>
<h2 id="articleHeader11">异步迭代器（Stage 3）</h2>
<p>异步迭代器已经进入了 Stage 3。在了解异步迭代器之前，让我们简单介绍一下 ES6 中引入的迭代。迭代可以是任何遵循迭代器协议的对象。</p>
<p>为了使对象可以迭代，我们定义一个 <code>Symbol.iterator</code> 方法。迭代器方法应该返回一个具有 <code>next</code> 方法的对象。这个对象描述了我们的 <code>iterable</code> 的顺序。当对象被迭代时，每当我们需要读取序列中的下一个元素时，将调用 <code>next</code> 方法。<code>value</code> 用来获取序列中每一个对象的值。当返回的对象被标记为 <code>done</code>，序列结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = {
  [Symbol.iterator]() {
    let i = 0
    return {
      next: () => ({
        value: i++,
        done: i > 5
      })
    }
  }
}
[...list]
// <- [0, 1, 2, 3, 4]
Array.from(list)
// <- [0, 1, 2, 3, 4]
for (const i of list) {
  // <- 0, 1, 2, 3, 4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = {
  [<span class="hljs-built_in">Symbol</span>.iterator]() {
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
        <span class="hljs-attr">value</span>: i++,
        <span class="hljs-attr">done</span>: i &gt; <span class="hljs-number">5</span>
      })
    }
  }
}
[...list]
<span class="hljs-comment">// &lt;- [0, 1, 2, 3, 4]</span>
<span class="hljs-built_in">Array</span>.from(list)
<span class="hljs-comment">// &lt;- [0, 1, 2, 3, 4]</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> i <span class="hljs-keyword">of</span> list) {
  <span class="hljs-comment">// &lt;- 0, 1, 2, 3, 4</span>
}</code></pre>
<p>可以使用 <code>Array.from</code> 或使用扩展操作符使用 <code>Iterables</code> 。它们也可以通过使用 <code>for..of</code> 循环来遍历元素序列。</p>
<p>异步迭代器只有一点点不同。在这个提议下，一个对象通过 <code>Symbol.asyncIterator</code> 来表示它们是异步迭代的。异步迭代器的方法签名与常规迭代器的约定略有不同：该 <code>next</code> 方法需要返回 包装了 <code>{ value, done }</code> 的 <code>Promise</code>，而不是 <code>{ value, done }</code> 直接返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = {
  [Symbol.asyncIterator]() {
    let i = 0
    return {
      next: () => Promise.resolve({
        value: i++,
        done: i > 5
      })
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = {
  [<span class="hljs-built_in">Symbol</span>.asyncIterator]() {
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve({
        <span class="hljs-attr">value</span>: i++,
        <span class="hljs-attr">done</span>: i &gt; <span class="hljs-number">5</span>
      })
    }
  }
}</code></pre>
<p>这种简单的变化非常优雅，因为 Promise 可以很容易地代表序列的最终元素。</p>
<p>异步迭代不能与数组扩展运算符、<code>Array.from</code>、<code>for..of</code> 一起使用，因为这三个都专门用于同步迭代。</p>
<p>这个提案也引入了一个新的 <code>for await..of</code> 结构。它可以用于在异步迭代序列上语义地迭代。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for await (const i of items) {
  // <- 0, 1, 2, 3, 4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> i <span class="hljs-keyword">of</span> items) {
  <span class="hljs-comment">// &lt;- 0, 1, 2, 3, 4</span>
}</code></pre>
<p>请注意，该 <code>for await..of</code> 结构只能在异步函数中使用。否则我们会得到语法错误。就像任何其他异步函数一样，我们也可以在我们的循环周围或内部使用 <code>try/catch</code> 块 <code>for await..of</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function readItems() {
  for await (const i of items) {
    // <- 0, 1, 2, 3, 4
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readItems</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> i <span class="hljs-keyword">of</span> items) {
    <span class="hljs-comment">// &lt;- 0, 1, 2, 3, 4</span>
  }
}</code></pre>
<p>更进一步。还有异步生成器函数。与普通生成器函数有些相似，异步生成器函数不仅支持 <code>async</code> <code>await</code> 语义，还允许 <code>await</code> 语句以及 <code>for await..of</code>。</p>
<p>（原文第一段：The rabbit hole goes deeper of course. 这是爱丽丝梦游仙境的梗吗？）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function* getProducts(categoryUrl) {
  const listReq = await fetch(categoryUrl)
  const list = await listReq.json()
  for (const product of list) {
    const productReq = await product.url
    const product = await productReq.json()
    yield product
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getProducts</span>(<span class="hljs-params">categoryUrl</span>) </span>{
  <span class="hljs-keyword">const</span> listReq = <span class="hljs-keyword">await</span> fetch(categoryUrl)
  <span class="hljs-keyword">const</span> list = <span class="hljs-keyword">await</span> listReq.json()
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> product <span class="hljs-keyword">of</span> list) {
    <span class="hljs-keyword">const</span> productReq = <span class="hljs-keyword">await</span> product.url
    <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> productReq.json()
    <span class="hljs-keyword">yield</span> product
  }
}</code></pre>
<p>在异步生成器函数中，我们可以使用 <code>yield*</code> 与其他异步发生器和普通的发生器一起使用。当调用时，异步生成器函数返回异步生成器对象，其方法返回包裹了 <code>{ value, done }</code> 的 Promise，而不是 <code>{ value, done }</code>。</p>
<p>最后，异步生成器对象可以被使用在 <code>for await..of</code>，就像异步迭代一样。这是因为异步生成器对象是异步迭代，就像普通生成器对象是普通的迭代。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function readProducts() {
  const g = getProducts(category)
  for await (const product of g) {
    // use product details
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readProducts</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> g = getProducts(category)
  <span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> product <span class="hljs-keyword">of</span> g) {
    <span class="hljs-comment">// use product details</span>
  }
}</code></pre>
<h2 id="articleHeader12">对象解构与剩余（Stage 3）</h2>
<p>从 ES6 开始，我们使用 <code>Object.assign</code> 将属性从一个或多个源对象复制到一个目标对象上。在下一个例子中，我们将一些属性复制到一个空的对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(
 {},
 { a: 'a' },
 { b: 'b' },
 { a: 'c' }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.assign(
 {},
 { <span class="hljs-attr">a</span>: <span class="hljs-string">'a'</span> },
 { <span class="hljs-attr">b</span>: <span class="hljs-string">'b'</span> },
 { <span class="hljs-attr">a</span>: <span class="hljs-string">'c'</span> }
)</code></pre>
<p>对象解构（spread）提议允许我们使用纯语法编写等效的代码。我们从一个空对象开始，<code>Object.assign</code> 隐含在语法中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 ...{ a: 'a' },
 ...{ b: 'b' },
 ...{ a: 'c' }
}
// <- { a: 'c', b: 'b' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
 ...{ <span class="hljs-attr">a</span>: <span class="hljs-string">'a'</span> },
 ...{ <span class="hljs-attr">b</span>: <span class="hljs-string">'b'</span> },
 ...{ <span class="hljs-attr">a</span>: <span class="hljs-string">'c'</span> }
}
<span class="hljs-comment">// &lt;- { a: 'c', b: 'b' }</span></code></pre>
<p>和对象解构相反的还有对象剩余，类似数组的剩余参数。当对对象进行解构时，我们可以使用对象扩展运算符将模式中未明确命名的属性重建为另一个对象。</p>
<p>在以下示例中，id 显式命名，不会包含在剩余对象中。对象剩余（rest）可以从字面上读取为“所有其他属性都转到一个名为 rest 的对象”，当然，变量名称供您选择。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const item = {
 id: '4fe09c27',
 name: 'Banana',
 amount: 3
}
const { id, ...rest } = item
// <- { name: 'Banana', amount: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> item = {
 <span class="hljs-attr">id</span>: <span class="hljs-string">'4fe09c27'</span>,
 <span class="hljs-attr">name</span>: <span class="hljs-string">'Banana'</span>,
 <span class="hljs-attr">amount</span>: <span class="hljs-number">3</span>
}
<span class="hljs-keyword">const</span> { id, ...rest } = item
<span class="hljs-comment">// &lt;- { name: 'Banana', amount: 3 }</span></code></pre>
<p>在函数参数列表中解析对象时，我们也可以使用对象剩余属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print({ id, ...rest }) {
  console.log(rest)
}
print({ id: '4fe09c27', name: 'Banana' })
// <- { name: 'Banana' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">{ id, ...rest }</span>) </span>{
  <span class="hljs-built_in">console</span>.log(rest)
}
print({ <span class="hljs-attr">id</span>: <span class="hljs-string">'4fe09c27'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Banana'</span> })
<span class="hljs-comment">// &lt;- { name: 'Banana' }</span></code></pre>
<h2 id="articleHeader13">动态 import()（Stage 3）</h2>
<p>ES6 引入了原生 JavaScript 模块。与 CommonJS 类似，JavaScript 模块选择了静态语法。这样开发工具有更简单的方式从静态源码中分析和构建依赖树，这使它成为一个很好的默认选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import markdown from './markdown'
// …
export default compile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> markdown <span class="hljs-keyword">from</span> <span class="hljs-string">'./markdown'</span>
<span class="hljs-comment">// …</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> compile</code></pre>
<p>然而，作为开发人员，我们并不总是知道我们需要提前导入的模块。对于这些情况，例如，当我们依赖本地化来加载具有用户语言的字符串的模块时，Stage 3 的动态 <code>import()</code> 提案就很有用了。</p>
<p><code>import()</code> 运行时动态加载模块。它为模块的命名空间对象返回 Promise，当获取该对象时，系统将解析和执行所请求的模块及其所有依赖项。如果模块加载失败，Promise 将被拒绝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import(`./i18n.${ navigator.language }.js`)
  .then(module => console.log(module.messages))
  .catch(reason => console.error(reason))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span>(<span class="hljs-string">`./i18n.<span class="hljs-subst">${ navigator.language }</span>.js`</span>)
  .then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.messages))
  .catch(<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(reason))</code></pre>
<p><strong>未完。。。。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] TC39，ECMAScript 和 JavaScript 的未来（Part 1）

## 原文链接
[https://segmentfault.com/a/1190000010008098](https://segmentfault.com/a/1190000010008098)

