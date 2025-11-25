---
title: 'JavaScript 社区由一个库引发的“smoosh门”事件到底怎么回事？' 
date: 2018-12-10 2:30:07
hidden: true
slug: xz2hx411uvi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文: <a href="https://developers.google.com/web/updates/2018/03/smooshgate" rel="nofollow noreferrer" target="_blank">#SmooshGate FAQ</a><br>作者：<a href="https://developers.google.com/web/resources/contributors/mathiasbynens" rel="nofollow noreferrer" target="_blank">Mathias Bynens</a>
</blockquote>
<h2 id="articleHeader0">
<strong>smoosh</strong>？！发生了什么？！</h2>
<p>一项名为 JavaScript 功能的<a href="https://tc39.github.io/proposal-flatMap/" rel="nofollow noreferrer" target="_blank">提案</a> <code>Array.prototype.flatten</code> 证明与 Web 不兼容。在 Firefox Nightly 中发布该功能会导致<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1443630" rel="nofollow noreferrer" target="_blank">至少一个受欢迎的网站</a>中断。鉴于有问题的代码是广泛使用的 MooTools 库的一部分，很可能会有更多网站受到影响。（尽管 MooTools 在 2018 年并不常用于新网站，但它曾经非常流行，并且仍然存在于许多已经正在运行的网站上。）</p>
<p>该提案笔者开玩笑地建议<a href="https://github.com/tc39/proposal-flatMap/pull/56" rel="nofollow noreferrer" target="_blank">把 <code>flatten</code> 重命名为 <code>smoosh</code></a>，以避免兼容性问题。</p>
<p>但是，并非所有人都知道这是一个笑话，有些人开始错误地认为这个新名字已经被确定，并且事情迅速升级。</p>
<h2 id="articleHeader1">
<code>Array.prototype.flatten</code> 是什么？</h2>
<p><code>Array.prototype.flatten</code> 递归地将数组展按照指定的 <code>depth</code> 进行展平，<code>depth</code> 的默认值为 <code>1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Flatten one level:
const array = [1, [2, [3]]];
array.flatten();
// → [1, 2, [3]]

// Flatten recursively until the array contains no more nested arrays:
array.flatten(Infinity);
// → [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Flatten one level:</span>
<span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [<span class="hljs-number">3</span>]]];
array.flatten();
<span class="hljs-comment">// → [1, 2, [3]]</span>

<span class="hljs-comment">// Flatten recursively until the array contains no more nested arrays:</span>
array.flatten(<span class="hljs-literal">Infinity</span>);
<span class="hljs-comment">// → [1, 2, 3]</span></code></pre>
<p>同样的提议还包括 <code>Array.prototype.flatMap</code>，如同 <code>Array.prototype.map</code> 一样，可以在参数里面传递一个回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[2, 3, 4].flatMap((x) => [x, x * 2]);
// → [2, 4, 3, 6, 4, 8]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].flatMap(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> [x, x * <span class="hljs-number">2</span>]);
<span class="hljs-comment">// → [2, 4, 3, 6, 4, 8]</span></code></pre>
<h2 id="articleHeader2">MooTools 导致了什么问题？</h2>
<p>MooTools 定义了他们自己的非标准版本 <code>Array.prototype.flatten</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.flatten = /* non-standard implementation */;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.prototype.flatten = <span class="hljs-comment">/* non-standard implementation */</span>;</code></pre>
<p>MooTools 的 <code>flatten</code> 实现与建议的标准不同。但是，这并不是问题！当浏览器提供了原生的 <code>Array.prototype.flatten</code> 时，MooTools 会覆盖原生实现。这可确保依赖 MooTools 的代码按预期运行，无论原生 <code>flatten</code> 是否可用。到现在为止还挺好！</p>
<p>不幸的是，发生了其他事情。MooTools 将其所有自定义数组方法复制到 <code>Elements.prototype</code>（<code>Elements</code> 是 MooTools 特定的 API）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var key in Array.prototype) {
  Elements.prototype[key] = Array.prototype[key];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> <span class="hljs-built_in">Array</span>.prototype) {
  Elements.prototype[key] = <span class="hljs-built_in">Array</span>.prototype[key];
}</code></pre>
<p><code>for</code>-<code>in</code> 遍历“可枚举”属性，其中不包括像原生方法 <code>Array.prototype.sort</code>，而是包括自定义的属性<code>Array.prototype.foo = whatever</code>。但是 - 背锅开始了 - 如果你覆盖了一个非枚举属性，例如 <code>Array.prototype.sort = whatever</code>，那么这个属性仍然是不可枚举的。</p>
<p>目前，<code>Array.prototype.flatten = mooToolsFlattenImplementation</code> 创建一个枚举 <code>flatten</code> 属性，所以它以后会被复制到 <code>Elements</code>。但是，如果我们发布原生版本的 <code>flatten</code>，它将变得不可枚举，并且不会被复制到 <code>Elements</code>。<strong>现在，任何使用 MooTools 并依赖于 <code>Elements.prototype.flatten</code> 的代码都被破坏了</strong>。</p>
<p>尽管将原生 <code>Array.prototype.flatten</code> 变为可枚举可能会解决问题，但它可能会导致更多的兼容性问题。每个依赖于 <code>for</code>-<code>in</code> 遍历数组（这是一个糟糕的做法，但它经常被使用）的网站会突然得到该 <code>flatten</code> 属性的循环迭代。</p>
<p>这里更大的底层问题是修改内置对象。现在扩展本地原型通常被认为是一种不好的做法，因为它不能很好地与其他库和第三方代码结合。不要修改不属于你的对象！</p>
<h2 id="articleHeader3">我们为什么不保留现有名称并打破网络？</h2>
<p>1996 年，在 CSS 广泛传播之前，早在“HTML5”之前，<a href="https://www.warnerbros.com/archive/spacejam/movie/jam.htm" rel="nofollow noreferrer" target="_blank">Space Jam 网站</a>就已经开始运行了。今天，该网站已经顺利运行 22年了。</p>
<p>这是怎么做到的呢？这些年有没有人维护该网站，每次浏览器供应商发布新功能时都会更新它？</p>
<p>事实证明，“不要打破网络”是 HTML，CSS，JavaScript 和 Web 任何标准上都广泛使用的头号<a href="https://www.w3.org/TR/html-design-principles/#support-existing-content" rel="nofollow noreferrer" target="_blank">设计原则</a>。如果发布新的浏览器功能导致现有网站停止工作，那对每个人都不利：</p>
<ul>
<li>受影响网站的访问者突然得到一个破坏的用户体验;</li>
<li>网站所有者从一个完美的网站变成了一个没有功能的网站，而网站所有者却并没有改变任何东西;</li>
<li>用户看到“只支持 XXX 浏览器”之后切换浏览器，因此推出新功能的浏览器供应商失去了市场份额。</li>
<li>一旦知道兼容性问题，其他浏览器供应商拒绝实现此特性。导致某特性的规范与实际实现情况不符（“<a href="https://www.webstandards.org/2009/05/13/interview-with-ian-hickson-editor-of-the-html-5-specification/#about-browsers" rel="nofollow noreferrer" target="_blank">只是虚构的作品</a>”），这对标准化过程不利。</li>
</ul>
<p>当然，回想起来 MooTools 做错了一件事 - 但是打破网络并不惩罚它们（MooTools），而是会惩罚用户。这些用户不知道 MooTools 是什么。</p>
<p>或者，我们可以找到另一种解决方案，用户可以继续使用网络。</p>
<h2 id="articleHeader4">这是否意味着无法从 Web 平台中删除不好的 API？</h2>
<p>在极少数情况下，<a href="https://whatwg.org/faq#removing-bad-ideas" rel="nofollow noreferrer" target="_blank">可以从网络中删除不良的功能</a>。即使仅仅弄清楚是否可以删除一个功能也是非常棘手的工作，需要大量的遥测来量化有多少网页会改变他们的行为。但是，如果功能足够不安全，对用户有害，或者很少使用，则可以完成此操作。</p>
<p><code>&lt;applet&gt;</code>，<code>&lt;keygen&gt;</code> 和 <a href="https://dev.opera.com/blog/showmodaldialog/" rel="nofollow noreferrer" target="_blank"><code>showModalDialog()</code></a> 都是从 Web 平台成功删除的错误 API 的示例。</p>
<h2 id="articleHeader5">为什么不修复 MooTools？</h2>
<p>修补 MooTools 以便它不再扩展内置对象是个不错的主意。但是，它并没有解决手头的问题。即使 MooTools 发布补丁版本，所有使用它的现有网站也必须更新，这样兼容性问题才能消失。</p>
<h2 id="articleHeader6">能不能只更新网站中使用的 MooTools 副本？</h2>
<p>在理想情况下 MooTools 会发布一个补丁，每个使用 MooTools 的网站都会在第二天神奇地更新。问题解决了，对吧？！</p>
<p>不幸的是，这是不现实的。即使有人以某种方式识别了整套受影响的网站，也可以设法找到每一个网站的联系信息，成功地与所有网站所有者联系并说服他们全部执行更新（这可能意味着重构他们的网站完整的代码库），整个过程最多需要几年的时间。</p>
<p>请记住，这些网站很多都是旧的，可​​能无法维护。即使维护人员仍然在身边，也可能他们不是像您一样的高技能 Web 开发人员。由于网络兼容性问题，我们不能指望每个人都去改变他们已经运行了七八年的网站。</p>
<h2 id="articleHeader7">TC39 的工作流程是什么样的？</h2>
<p>JavaScript 语言基于 ECMAScript 标准，TC39 是负责 JavaScript 语言更新发展的委员会</p>
<p>“Smoosh门”事件使得一些人误认为“TC39 想要把 <code>flatten</code> 重新命名为 <code>smoosh</code>”，但这是一个没有很好沟通的笑话。重命名提案等重大决策不会被轻视，不会被单个人采纳，并且绝对不会在 GitHub 的评论上完成。</p>
<p>TC39 对于功能提案有着清晰得分级过程。ECMAScript 提案及其任何重大变更（包括方法更新）在 TC39 会议期间进行讨论，并且需要整个委员会批准后方可正式提交。在这种情况下 <code>Array.prototype.flatten</code> 提案已经经历了好几个阶段的讨论，一直到 Stage 3，表明该功能已准备好在 Web 浏览器中实现。实施过程中出现其他规范问题很常见。在这种情况下，最重要的反馈意见是在试图发布它之后才有的：该特性在当前状态下打破了 Web。即使浏览器发布新功能后 TC39 的流程并没有结束，就是因为这些难以预测的问题。</p>
<p>TC39 以协商一致的方式运作，这意味着委员会必须就任何新的变化达成一致。即使 <code>smoosh</code> 是一个严肃的建议，委员会成员似乎也可能会反对，而是赞成使用更常见的名称，例如 <code>compact</code> 或 <code>chain</code>。</p>
<p>把 <code>flatten</code> 重命名为 <code>smoosh</code>（即使它不是一个笑话）从未在 TC39 会议上讨论。因此，关于这个问题的官方 TC39 立场目前是未知的。在下次会议达成共识之前，没有任何一个人可以代表所有 TC39 发言。</p>
<p>TC39 会议通常由具有高度多样化背景的人士出席：一些人拥有多年的编程语言设计经验，另一些人使用浏览器或 JavaScript 引擎工作，越来越多的 JavaScript 开发人员社区参与者。</p>
<h2 id="articleHeader8">接下来发生什么？</h2>
<p>下一次 TC39 会议将于本周举行。<a href="https://github.com/tc39/agendas/blob/master/2018/03.md" rel="nofollow noreferrer" target="_blank">议程中</a>有一项讨论 <code>flatten</code> 及其网络兼容性问题。希望在会议结束后我们会更多地了解下一步。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 社区由一个库引发的“smoosh门”事件到底怎么回事？

## 原文链接
[https://segmentfault.com/a/1190000013855516](https://segmentfault.com/a/1190000013855516)

