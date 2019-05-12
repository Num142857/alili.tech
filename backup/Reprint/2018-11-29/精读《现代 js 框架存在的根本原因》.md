---
title: '精读《现代 js 框架存在的根本原因》' 
date: 2018-11-29 9:34:56
hidden: true
slug: wt311x9vsu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 引言</h2>
<p>深入思考为何前端需要框架，以及 web components 是否可以代替前端框架？</p>
<p><a href="https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445" rel="nofollow noreferrer" target="_blank">原文地址</a>，建议先阅读原文，或者阅读概述。</p>
<h2 id="articleHeader1">2 概述</h2>
<p>现在前端框架非常多了，如果让我们回答 “为什么要用前端框架” 这个问题，你觉得是下面这些原因吗？</p>
<ul>
<li>组件化。</li>
<li>拥有强大的开源社区。</li>
<li>拥有大量第三方库解决大部分问题。</li>
<li>拥有大量现成的第三方组件。</li>
<li>拥有浏览器拓展/工具帮助快速 debug。</li>
<li>友好的支持单页应用。</li>
</ul>
<p>不，这些都不是根本原因，最多算前端框架的营销手段。作者给出的最根本原因是：</p>
<p><strong>解决 UI 与状态同步的难题。</strong></p>
<p>作者假设了一个没有前端框架的项目，就像 Jquery 时代，我们需要手动同步状态与 UI。就像下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addAddress(address) {
  // state logic
  const id = String(Dat.now())
  this.state = this.state.concat({ address, id })

  // UI logic
  this.updateHelp()

  const li = document.createElement('li')
  const span = document.createElement('span')
  const del = document.createElement('a')
  span.innerText = address
  del.innerText = 'delete'
  del.setAttribute('data-delete-id', id)

  this.ul.appendChild(li)
  li.appendChild(del)
  li.appendChild(span)
  this.items[id] = li
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">addAddress(address) {
  <span class="hljs-comment">// state logic</span>
  <span class="hljs-keyword">const</span> id = <span class="hljs-built_in">String</span>(Dat.now())
  <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">this</span>.state.concat({ address, id })

  <span class="hljs-comment">// UI logic</span>
  <span class="hljs-keyword">this</span>.updateHelp()

  <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
  <span class="hljs-keyword">const</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
  <span class="hljs-keyword">const</span> del = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
  span.innerText = address
  del.innerText = <span class="hljs-string">'delete'</span>
  del.setAttribute(<span class="hljs-string">'data-delete-id'</span>, id)

  <span class="hljs-keyword">this</span>.ul.appendChild(li)
  li.appendChild(del)
  li.appendChild(span)
  <span class="hljs-keyword">this</span>.items[id] = li
}</code></pre>
<p>首先更新效率是个问题，最大问题还是同步问题。试想多次与服务器交互，在同步过程中漏执行了一步，会导致之后的 UI 与状态逐渐脱节。</p>
<p>因为我们只能一步步同步状态与 UI，却无法保证每个瞬间 UI 与状态是完全同步的，任何一个疏忽都会导致 UI 与状态脱节，而我们除了不断检查 UI 与数据是否对应，毫无办法。</p>
<p>所以现代框架最重要的帮助是保持 UI 与状态的同步。</p>
<h3 id="articleHeader2">如何做到</h3>
<p>有两种思路：</p>
<ol>
<li>组件级重渲染：比如 React，当状态改版后，映射出改变后的虚拟 DOM，最终改变当前组件映射的真实 DOM，这个过程被称为 reconciliation。</li>
<li>监听修改：比如 Angluar 和 Vue.js，状态改变直接触发对应 DOM 节点中 value 值的变化。</li>
</ol>
<p>这里稍微说明下，React 虽然是整体渲染，但在虚拟 DOM 作用下，效率不比 observable 低。observable 在值不能完整映射 UI 时，也需要做更大范围的 rerender。另外，Vue.js 与 Angluar 也早已采用了虚拟 DOM。</p>
<p>这三个框架已经融会贯通，作者提到的两种思路现在已经是一种混合技术了。</p>
<h3 id="articleHeader3">那 web components 呢？</h3>
<p>大家经常会拿 React, Angluar, Vue.js 与 <a href="https://www.webcomponents.org/" rel="nofollow noreferrer" target="_blank">web components</a> 做比较，可 web components 最大的问题就是，没有解决 UI 与状态同步。</p>
<p>web components 只提供了模版语法，自定义标签解决 html 的问题，并没有给出一套状态与 UI 同步的方法。</p>
<p>所以就算使用 web components，我们可能还需要一个框架做 UI 同步，比如 Vue.js 或者 <a href="https://stenciljs.com/" rel="nofollow noreferrer" target="_blank">stenciljs</a>。</p>
<p>作者还提供了一段简短的 UI 状态同步实例，这里略过。</p>
<p>最后给出了四点总结：</p>
<ul>
<li><strong>现代 js 框架主要在解决 UI 与状态同步的问题。</strong></li>
<li>仅使用原生 js 难以写出复杂、高效、又容易维护的 UI 代码。</li>
<li>Web components 没有解决这个主要问题。</li>
<li>虽然使用虚拟 DOM 库很容易造一个解决问题的框架，但不建议你真的这么做！</li>
</ul>
<h2 id="articleHeader4">3 精读</h2>
<p>作者的核心观点是，现代前端框架主要解决 UI 与状态同步的问题，这是毫无疑问的，也提到了包括 web components 也依然没有解决这个问题。</p>
<p>这可能是 web 开发最核心的问题了。</p>
<p>最初开发者的精力都在前端标准化上，诞生了一系列解决标准化问题的库，最有知名度的是 jquery。当前端进入 react 时代后，可以看到精力从解决标准化到解决 web 规范与实践的冲突，这个冲突正是作者说的问题。</p>
<h3 id="articleHeader5">前端三剑客</h3>
<p>问题就出现在 html、js、css 三者分离上。</p>
<p>html、css、js 各是一套独立的体系，但 js 又能同时控制 html 与 css，<strong>那为了解决同步问题，最好将控制权全部交给 js</strong>。</p>
<p>这样 web components 的问题也就好理解了，web components 解决的是 html 问题，注定与 js 无关。</p>
<p>html 官方规范估计很难出现现代框架的设计了，因为官方设计中前端三剑客是相互分离的方案，为了解决现阶段前端框架的问题，html 必须由 js 完全接管，这几乎就是 jsx，或者支持 template 语法的 html，可这与最初网页设计思路是违背的。</p>
<p>html 是独立的，甚至可以不依赖 js 运行，这天然导致了 UI 与状态同步这个难题。</p>
<h3 id="articleHeader6">为什么一定要用 js</h3>
<p>html 不依赖 js 的设计可能已经跟不上前端发展步伐了，也许 jsx 或者 template 才是真正的未来。</p>
<p>诚然，html 现在的设计可以在不支持 js 的浏览器执行，但就在最近，所有现代浏览器都支持了 service worker，它是凌驾于 html 执行时机之上的 js 脚本，甚至可以拦截 html 请求。一个不支持 js 的浏览器，可能也无法支持 service worker，禁用 js 的坚持可能只剩下安全性保护。</p>
<p>而实际上现代 web 页面都使用了 js 完全主导网页渲染，所以这已经从技术问题上升到了社会问题，如今禁用 js 的浏览器还有多少网页可以正常访问？除了某些超大型网站对禁用 js 状态做了特殊优化以外，现在几乎没有前端项目会考虑禁用 js 的情况了，因为我们不会假设 React、Angluar、Vue.js 框架代码无法运行。</p>
<h3 id="articleHeader7">所以为什么不融合 html 与 js 呢？</h3>
<p>既然事实上 UI 已经与 js 绑定了，那 w3c 为何不将 jsx 或者 template 列为标准呢？也许为了向前兼容，规范永远也迈不出这一步吧。</p>
<p>幸运的是，这并不妨碍现代前端框架的大量普及，而且势不可挡。</p>
<h2 id="articleHeader8">4 总结</h2>
<p>也许 UI 与状态同步的问题是前端发展的最大阻力，虽然现代化框架已经解决了这个问题，但 w3c 标准却一直无法往这个方向发力，导致 web 的下一个发展方向难以依靠标准规范来推动。前端日新月异的发展，很大一部分是规范的发展带来的，而现在我们进入了一个由工业化领导的时代，规范很可能永远也跟不上来，随之而来的是工业化社区也难以做进一步突破。</p>
<p>前端不仅是 web，或者也许下一个突破并不在 web，而是 ar/vr 或者下一个人机交互场景。同样，web 也不仅是前端三剑客，如果认为 React、Angluar、Vue.js 带来的工业化规范就是新的规范，前端才有动力向后发展，比如基于虚拟 DOM 的新框架、新语言。</p>
<p>所以笔者推导出现代前端开发的本质，是将 js、html 的平行关系变成了 js 包含 html 的关系，正如上面所说，这可能背离了 w3c 的初衷，但这就是现在的潮流。</p>
<p>最后总结一下观点：</p>
<ol>
<li>也是原作者的，<strong>现代 js 框架主要在解决 UI 与状态同步的问题。</strong>
</li>
<li>传统的前端三剑客正面临着进一步发展乏力的危机。</li>
<li>现代前端框架正在告诉我们新的三剑客：js（虚拟 dom、虚拟 css）。</li>
</ol>
<h2 id="articleHeader9">5 更多讨论</h2>
<blockquote>讨论地址是：<a href="https://github.com/dt-fe/weekly/issues/84" rel="nofollow noreferrer" target="_blank">精读《现代 js 框架存在的根本原因》 · Issue #84 · dt-fe/weekly</a>
</blockquote>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，周末或周一发布。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《现代 js 框架存在的根本原因》

## 原文链接
[https://segmentfault.com/a/1190000014947677](https://segmentfault.com/a/1190000014947677)

