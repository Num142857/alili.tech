---
title: '一起理解 Virtual DOM' 
date: 2019-01-30 2:30:23
hidden: true
slug: l48db4nszu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>React 好像已经火了很久很久，以致于我们对于 Virtual DOM 这个词都已经很熟悉了，网上也有非常多的介绍 React、Virtual DOM 的文章。但是直到前不久我专门花时间去学习 Virtual DOM，才让我对 Virtual DOM 有了一定的理解，以致于要怀疑起很久之前看过的那些文章来。倒不是这些文章讲得不对，而是现在在我看来角度不太好，说得越多，越说不清。</p>
<p>让我能够有所开窍（自认为）的，是这篇文章：</p>
<hr>
<p><strong>Change And Its Detection In JavaScript Frameworks</strong><br>Monday Mar 2, 2015 by Tero Parviainen<br><a href="http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html" rel="nofollow noreferrer" target="_blank">http://teropa.info/blog/2015/...</a></p>
<hr>
<p>作者看问题的角度很棒，从数据变更与UI同步的角度来介绍各个典型框架，特别是对于 React 的 Virtual DOM，从这个角度理解起来更容易些。</p>
<p>感兴趣的同学，如果没有读过这篇文章，推荐去看一看，不感兴趣就算了。不过接下来我要讲的东西，部分整理自这篇文章，特别是从这篇文章中引用的图片，非常棒。当然还有我自己的一些思考，以及一些对于目前 Virtual DOM 实现的开源库的分析。</p>
<p>如果读了上面推荐的这篇文章，我倒是不介意你不再继续把本文读下去，因为有些东西你已经领会到了。当然，也不反对。</p>
<h2 id="articleHeader1">变化这件事</h2>
<p>谈论页面的变化之前，咱们先看下数据和页面（视觉层面的页面）的关系。数据是隐藏在页面底下，通过渲染展示给用户。同样的数据，按照不同的页面设计和实现，会以不同形式、样式的页面呈现出来。有时候在一个页面内的不同位置，也会有相同数据的不同表现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694391" src="https://static.alili.tech/img/remote/1460000007694391" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>Web 的早期，这些页面通常是静态的，页面内容不会变化。而如果数据发生了变化，通常需要重新请求页面，得到基于新的数据渲染出的新的页面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694392" src="https://static.alili.tech/img/remote/1460000007694392" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>至少，这个模式理解起来挺简单不是吗。</p>
<p>直到 Web 应用复杂起来，开发者们开始关注用户体验，开始将大量的处理向前端迁移，页面变得动态、灵活起来。一个显著的特征是，数据发生变化之后，不再需要刷新页面就能看到页面上的内容随之更新了。</p>
<p>前端需要做的事情变得多了起来，前端工程师们也就修炼了起来，各种前端技术也就出现了。</p>
<p>首先，聪明的工程师们发现既然是在前端渲染页面，如果只是部分数据发生了变化，就要把页面整体或一大块区域重新渲染就有点笨了。为什么不把事情做得更极致些，只更新变化的数据对应的页面的内容呢？</p>
<p>怎么做呢？操作 DOM 呗。DOM 就是浏览器提供给开发者用于操作页面的模型嘛，直接通过脚本来调用 DOM 的各种接口就 OK 了。而且我们还有了像 jQuery 这样的棒棒的工具，操作 DOM 变得 so easy。</p>
<p>然而，页面越来越复杂，聪明的工程师们发现数据变化之后，老是需要手动编码去操作对应的 DOM 节点执行更新，有点烦，不够懒啊。于是各种框架如雨后春笋般出现了，纷纷表示可以简化这个过程。</p>
<p>稍微早期的框架有这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694393" src="https://static.alili.tech/img/remote/1460000007694393" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>开发者借助框架，监听数据的变更，在数据变更后更新对应的 DOM 节点。虽然还是要写一些代码，但是写出来的代码好像很有条理的样子，至少更容易理解和维护了，也不错嘛。</p>
<p>更进一步，MVVM 框架出现了，以 AngularJS 为代表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694394" src="https://static.alili.tech/img/remote/1460000007694394" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>仍然是数据变化后更新对应 DOM 节点的方式，但是建立这种绑定关系的过程被框架所处理，开发者要写的代码变少了，而且代码更易读和维护了。</p>
<p>再然后呢，大家就在这个棒棒的模式上继续深耕，纷纷表示还可以在性能上做得更好，前端领域一片繁荣。</p>
<p>再后来 React 出现了，它不仅不是 MVVM 框架，甚至连 MV<em> 框架都不是。这年头，不是个 MV</em> 框架还好意思出门？可 React 还真的带来了新的思路！</p>
<p>什么思路呢？</p>
<p>就是回到过去，回到那个简单而美好的时候。具体而言，就是每次数据发生变化，就重新执行一次整体渲染。的确这样更简单，不用去琢磨到底是数据的哪一部分变化了，需要更新页面的哪一部分。但是坏处太明显，体验不好啊。而 React 给出了解决方案，就是 Virtual DOM。</p>
<p>Virtual DOM 概况来讲，就是在数据和真实 DOM 之间建立了一层缓冲。对于开发者而言，数据变化了就调用 React 的渲染方法，而 React 并不是直接得到新的 DOM 进行替换，而是先生成 Virtual DOM，与上一次渲染得到的 Virtual DOM 进行比对，在渲染得到的 Virtual DOM 上发现变化，然后将变化的地方更新到真实 DOM 上。</p>
<p>简单来说，React 在提供给开发者简单的开发模式的情况下，借助 Virtual DOM 实现了性能上的优化，以致于敢说自己“不慢”。</p>
<h2 id="articleHeader2">Virtual DOM</h2>
<p>React 基于 Virtual DOM 的数据更新与UI同步机制：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694395" src="https://static.alili.tech/img/remote/1460000007694395" alt="React - 初始渲染" title="React - 初始渲染" style="cursor: pointer;"></span></p>
<p>初始渲染时，首先将数据渲染为 Virtual DOM，然后由 Virtual DOM 生成 DOM。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007694396" src="https://static.alili.tech/img/remote/1460000007694396" alt="React - 数据更新" title="React - 数据更新" style="cursor: pointer; display: inline;"></span></p>
<p>数据更新时，渲染得到新的 Virtual DOM，与上一次得到的 Virtual DOM 进行 diff，得到所有需要在 DOM 上进行的变更，然后在 patch 过程中应用到 DOM 上实现UI的同步更新。</p>
<p>Virtual DOM 作为数据结构，需要能准确地转换为真实 DOM，并且方便进行对比。除了 Virtual DOM 外，React 还实现了其他的特性，为了专注于 Virtual DOM，我另外找了两个比较 Virtual DOM 来学习：</p>
<ul>
<li><p><a href="https://github.com/Matt-Esch/virtual-dom" rel="nofollow noreferrer" target="_blank">virtual-dom</a></p></li>
<li><p><a href="https://github.com/paldepind/snabbdom" rel="nofollow noreferrer" target="_blank">Snabbdom</a></p></li>
</ul>
<p>这里也推荐给感兴趣且还没有读过两个库源码的同学。</p>
<p>由于只关注 Virtual DOM，通过阅读两个库的源码，对于 Virtual DOM 的定位有了更深一步的理解。</p>
<p>首先看数据结构。</p>
<p><strong> Virtual DOM 数据结构 </strong></p>
<p>DOM 通常被视为一棵树，元素则是这棵树上的节点（node），而 Virtual DOM 的基础，就是 Virtual Node 了。</p>
<p>在 virtual-dom 中，给 Virtual Node 声明了对应的类 <a href="https://github.com/Matt-Esch/virtual-dom/blob/master/vnode/vnode.js" rel="nofollow noreferrer" target="_blank">VirtualNode</a>，基本是用于存储数据，包括：</p>
<ul>
<li><p><strong>tagName</strong></p></li>
<li><p><strong>properties</strong></p></li>
<li><p><strong>children</strong></p></li>
<li><p>key</p></li>
<li><p>namespace</p></li>
<li><p>count</p></li>
<li><p>hasWidgets</p></li>
<li><p>hasThunks</p></li>
<li><p>hooks</p></li>
<li><p>descendantHooks</p></li>
</ul>
<p>Snabbdom 的 Virtual Node 则是纯数据对象，通过 <a href="https://github.com/snabbdom/snabbdom/blob/master/vnode.js" rel="nofollow noreferrer" target="_blank">vnode</a> 模块来创建，对象属性包括：</p>
<ul>
<li><p><strong>sel</strong></p></li>
<li><p><strong>data</strong></p></li>
<li><p><strong>children</strong></p></li>
<li><p><strong>text</strong></p></li>
<li><p>elm</p></li>
<li><p>key</p></li>
</ul>
<p>虽然有所差别，除去实现上的差别和库本身的额外特性，可以看到 Virtual Node 用于创建真实节点的数据包括：</p>
<ul>
<li><p>元素类型</p></li>
<li><p>元素属性</p></li>
<li><p>元素的子节点</p></li>
</ul>
<p>有了这些其实就可以创建对应的真实节点了。</p>
<p><strong>创建 Virtual DOM</strong></p>
<p>嵌套 Virtual Node 就可以得到一棵树了。virtual-dom 和 Snabbdom 都提供了函数调用的方式来创建 Virtual Tree，这个过程就是渲染了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vTree = h('div', [
  h('span', 'hello'),
  h('span', 'world')
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> vTree = h(<span class="hljs-string">'div'</span>, [
  h(<span class="hljs-string">'span'</span>, <span class="hljs-string">'hello'</span>),
  h(<span class="hljs-string">'span'</span>, <span class="hljs-string">'world'</span>)
])</code></pre>
<p>React 提供 JSX 这颗糖，使得我们可以用类似 HTML 的语法来编写，不过编译后实质还是通过函数调用来得到一棵嵌套的 Virtual Tree。而且这对于理解 Virtual DOM 机制来说不是特别重要，先不管这个。</p>
<p><strong>使用 Virtual DOM</strong></p>
<p>首先来看初始化，virtual-dom 提供了 <a href="https://github.com/Matt-Esch/virtual-dom/blob/master/vdom/create-element.js#L12" rel="nofollow noreferrer" target="_blank">createElement</a> 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rootNode = createElement(tree)
document.body.appendChild(rootNode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> rootNode = createElement(tree)
<span class="hljs-built_in">document</span>.body.appendChild(rootNode)</code></pre>
<p>根据 Virtual Node 创建真实 DOM 元素，然后再追加到页面上。</p>
<p>再来看更新。virtual-dom 有明确的两步操作，首先 diff，然后 patch：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newTree = render(count)
var patches = diff(tree, newTree)
rootNode = patch(rootNode, patches)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newTree = render(count)
<span class="hljs-keyword">var</span> patches = diff(tree, newTree)
rootNode = patch(rootNode, patches)</code></pre>
<p>而 Snabbdom 则简单些，只有一个 patch 函数，内部在进行比对的同时将更新应用到了真实 DOM 上，而且初始化也是用的 patch 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vnode = render(data)
var container = document.getElementById('container')
patch(container, vnode)

// after data changed
var newVnode = render(data)
patch(vnode, newVnode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> vnode = render(data)
<span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
patch(container, vnode)

<span class="hljs-comment">// after data changed</span>
<span class="hljs-keyword">var</span> newVnode = render(data)
patch(vnode, newVnode)</code></pre>
<p><strong>性能优化</strong></p>
<p>关于性能优化，除了 Virtual DOM 机制本身提供的特性以外，再就是不同的 Virtual DOM 库自身的优化方案了，这个可以看上面两个库的文档，不再赘述。</p>
<p>其实提到 Virtual DOM 的差异比对，有人会对其内部如何处理数组感兴趣。的确，如果数组元素的位置发生了改变，这个要识别起来是有点麻烦。为此，上面两个库和 React 其实都在 Virtual Node 上额外记录了一个属性“<strong>key</strong>”，就是用来辅助进行 Virtual Node 的比对的。</p>
<p>简单来说，如果两个 Virtual Node 的位置不同，但是 key 属性相同，那么会将这两个节点视为由相同数据渲染得到的，然后进一步进行差异分析。所以，并不是仅仅按照位置进行比对，具体的实现可以查看各个库的源码。</p>
<h2 id="articleHeader3">小结</h2>
<p>OK，以上就是我要讲的全部所有内容了。</p>
<p>相信很多同学之前对 Virtual DOM 已经很熟悉了，比我理解得更深入的同学相信也不会少。不过从“数据变化与UI同步更新”这个角度来理解 Virtual DOM，在我看来是比较好的，所以整理在这里了。</p>
<p>有个问题挺常见，AngularJS 和 React 哪个更好？</p>
<p>如果说各有千秋的话，估计大家就“呵呵”了。但是这两个框架/库从“数据变化与UI同步更新”的角度来看，的确都解决了问题，而且解决问题的方式大家都挺认可（至少在喜欢它们的同学眼里是这样的）。</p>
<p>而且，如果大家关注 Vue 的话，可以看到，这个 MVVM 框架已经发布了 2.0，其中就采用了 Virtual DOM 实现其UI同步更新！所以，这的确不矛盾啊。</p>
<p>第二个而且，技术本身不是目的，能够更好地解决问题才是王道嘛。</p>
<hr>
<p>原文：<a href="http://www.jianshu.com/p/bef1c1ee5a0e" rel="nofollow noreferrer" target="_blank">一起理解 Virtual DOM</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一起理解 Virtual DOM

## 原文链接
[https://segmentfault.com/a/1190000007694388](https://segmentfault.com/a/1190000007694388)

