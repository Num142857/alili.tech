---
title: 'React 渲染机制解析' 
date: 2019-01-05 2:30:11
hidden: true
slug: qjy55u75wel
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">React渲染过程</h3>
<p>我们都知道使用React可以使得网页的性能有很大的提高，本文具体探究它是通过什么样的渲染机制做到的。</p>
<p>在页面一开始打开的时候，React会调用render函数构建一棵Dom树，在state/props发生改变的时候，render函数会被再次调用渲染出另外一棵树，接着，React会用对两棵树进行对比，找到需要更新的地方批量改动。</p>
<h3 id="articleHeader1">Diff 算法</h3>
<p>这个过程中，比较两棵Dom tree高效找出需要更新的地方是很重要的。React基于两个假设：</p>
<ul>
<li><p>两个相同的组件产生类似的DOM结构，不同组件产生不同DOM结构</p></li>
<li><p>对于同一层次的一组子节点，它们可以通过唯一的id区分</p></li>
</ul>
<p>发明了一种叫Diff的算法，它极大的优化了这个比较的过程，将算法复杂度从O(n^3)降低到O(n)。</p>
<p>同时，基于第一点假设，我们可以推论出，Diff算法只会对同层的节点进行比较。如图，它只会对颜色相同的节点进行比较。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010522785" src="https://static.alili.tech/img/remote/1460000010522785" alt="" title="" style="cursor: pointer;"></span></p>
<p>也就是说如果父节点不同，React将不会在去对比子节点。因为不同的组件DOM结构会不相同，所以就没有必要在去对比子节点了。这也提高了对比的效率。</p>
<p>下面，我们具体看下Diff算法是怎么做的，这里分为两种情况考虑</p>
<ul>
<li><p>节点类型不同</p></li>
<li><p>节点类型相同，但是属性不同</p></li>
</ul>
<h3 id="articleHeader2">不同节点类型</h3>
<p>对于不同的节点类型，react会基于第一条假设，直接删去旧的节点，新建一个新的节点。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<A>
  <C/>
</A>
// 由shape1到shape2
<B>
  <C/>
</B>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;A&gt;</span>
  <span class="hljs-params">&lt;C/&gt;</span>
<span class="hljs-params">&lt;/A&gt;</span>
<span class="hljs-comment">// 由shape1到shape2</span>
<span class="hljs-params">&lt;B&gt;</span>
  <span class="hljs-params">&lt;C/&gt;</span>
<span class="hljs-params">&lt;/B&gt;</span>
</code></pre>
<p>React会直接删掉A节点（包括它所有的子节点）,然后新建一个B节点插入。</p>
<p>为了验证这一点，我打印出了从shape1到shape2节点的生命周期，gitbub链接：<br><a href="https://github.com/hhhuangqiong/reconciliation" rel="nofollow noreferrer" target="_blank">https://github.com/hhhuangqio...</a></p>
<p>感兴趣的可以自己跑一跑代码~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Shape1 :
A is created 
A render
C is created
C render
C componentDidMount
A componentDidMount

Shape2 :
A componentWillUnmount
C componentWillUnmount
B is created
B render
C is created
C render
C componentDidMount
B componentDidMount" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code>Shape1 :
A is created 
A render
<span class="hljs-keyword">C</span> is created
<span class="hljs-keyword">C</span> render
<span class="hljs-keyword">C</span> componentDidMount
A componentDidMount

Shape2 :
A componentWillUnmount
<span class="hljs-keyword">C</span> componentWillUnmount
B is created
B render
<span class="hljs-keyword">C</span> is created
<span class="hljs-keyword">C</span> render
<span class="hljs-keyword">C</span> componentDidMount
B componentDidMount</code></pre>
<p>由此可以看出，A与其子节点C会被直接删除，然后重新建一个B，C插入。</p>
<h3 id="articleHeader3">相同节点类型</h3>
<p>当对比相同的节点类型比较简单，react会对比它们的属性，只改变需要改变的属性</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;before&quot; title=&quot;stuff&quot; />

<div className=&quot;after&quot; title=&quot;stuff&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">"before"</span> title=<span class="hljs-string">"stuff"</span> /&gt;

&lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">"after"</span> title=<span class="hljs-string">"stuff"</span> /&gt;</code></pre>
<p>这两个div中，react会只更新className的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style="{{"color: 'red', fontWeight: 'bold'"}}" />

<div style="{{"color: 'green', fontWeight: 'bold'"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> style="{{"<span class="hljs-attribute">color</span>: <span class="hljs-string">'red'</span>, fontWeight: <span class="hljs-string">'bold'</span>"}}" /&gt;

&lt;<span class="hljs-selector-tag">div</span> style="{{"<span class="hljs-attribute">color</span>: <span class="hljs-string">'green'</span>, fontWeight: <span class="hljs-string">'bold'</span>"}}" /&gt;</code></pre>
<p>这两个div中，react只会去更新color的值</p>
<h3 id="articleHeader4">列表比较</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <A />
  <B />
</div>
// 列表一到列表二
<div>
  <A />
  <C />
  <B />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;div&gt;</span>
  <span class="hljs-params">&lt;A /&gt;</span>
  <span class="hljs-params">&lt;B /&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-comment">// 列表一到列表二</span>
<span class="hljs-params">&lt;div&gt;</span>
  <span class="hljs-params">&lt;A /&gt;</span>
  <span class="hljs-params">&lt;C /&gt;</span>
  <span class="hljs-params">&lt;B /&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span></code></pre>
<p>从列表一到列表二，只是在中间插入了一个C，但是如果没有key的时候，react会把B删去，新建一个C放在B的位置，然后重新建一个节点B放在尾部。</p>
<p>你说什么就是什么咯？！不信的话，我们还是跑一边代码，看看生命周期验证一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="列表一：
A is created
A render
B is created
B render
A componentDidMount
B componentDidMount

列表二：
A render
B componentWillUnmount
C is created
C render
B is created
B render
A componentDidUpdate
C componentDidMount
B componentDidMount" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>列表一：
A is created
A render
<span class="hljs-keyword">B </span>is created
<span class="hljs-keyword">B </span>render
A componentDidMount
<span class="hljs-keyword">B </span>componentDidMount

列表二：
A render
<span class="hljs-keyword">B </span>componentWillUnmount
C is created
C render
<span class="hljs-keyword">B </span>is created
<span class="hljs-keyword">B </span>render
A componentDidUpdate
C componentDidMount
<span class="hljs-keyword">B </span>componentDidMount</code></pre>
<p>当节点很多的时候，这样做是非常低效的，所以我们需要给每个节点配一个key，让react可以识别出来哪些节点是一样的，不需要重新创建。<br>配上key之后，在跑一遍代码看看，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A render
C is created
C render
B render
A componentDidUpdate
C componentDidMount
B componentDidUpdate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code>A render
<span class="hljs-keyword">C</span> is created
<span class="hljs-keyword">C</span> render
B render
A componentDidUpdate
<span class="hljs-keyword">C</span> componentDidMount
B componentDidUpdate</code></pre>
<p>果然，配上key之后，列表二的生命周期就如我所愿，只在指定的位置创建C节点插入。<br>这里要注意的一点是，key值必须是稳定（所以我们不能用Math.random()去创建key），可预测，并且唯一的。</p>
<h2 id="articleHeader5">小结</h2>
<p>React整个的渲染机制就是在state/props发生改变的时候，重新渲染所有的节点，构造出新的虚拟Dom tree跟原来的Dom tree用Diff算法进行比较，得到需要更新的地方在批量造作在真实的Dom上，由于这样做就减少了对Dom的频繁操作，从而提升的性能。</p>
<h2 id="articleHeader6">探索性能优化</h2>
<p>但是，是不是真的需要对所有的节点都重新渲染一遍呢？<br>下一篇文章，我们将继续探讨这个问题~ </p>
<p>参考文档：</p>
<p><a href="http://www.infoq.com/cn/articles/react-dom-diff" rel="nofollow noreferrer" target="_blank">http://www.infoq.com/cn/artic...</a></p>
<p><a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/re...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 渲染机制解析

## 原文链接
[https://segmentfault.com/a/1190000010522782](https://segmentfault.com/a/1190000010522782)

