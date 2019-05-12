---
title: 'React入门看这篇就够了' 
date: 2018-12-17 2:30:06
hidden: true
slug: 687byy4txe
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">react - JSX</h1>
<h2 id="articleHeader1">React 背景介绍</h2>
<ul><li><a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">React 入门实例教程</a></li></ul>
<p>React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 <a href="https://www.instagram.com/" rel="nofollow noreferrer" target="_blank">Instagram</a> 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。</p>
<h2 id="articleHeader2">什么是React</h2>
<ul>
<li>
<p>A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES</p>
<ul>
<li>用来构建UI的 JavaScript库</li>
<li>React 不是一个 MVC 框架，仅仅是视图（V）层的库</li>
</ul>
</li>
<li><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React 官网</a></li>
<li><a href="https://doc.react-china.org/" rel="nofollow noreferrer" target="_blank">React 中文文档</a></li>
</ul>
<h3 id="articleHeader3">特点</h3>
<ul>
<li>1 使用 JSX语法 创建组件，实现组件化开发，<strong>为函数式的 UI 编程方式打开了大门</strong>
</li>
<li>2 性能高的让人称赞：通过 <code>diff算法</code> 和 <code>虚拟DOM</code> 实现视图的高效更新</li>
<li>3 HTML仅仅是个开始</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> JSX --TO--> EveryThing

- JSX --> HTML
- JSX --> native ios或android中的组件（XML）
- JSX --> VR
- JSX --> 物联网" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">&gt; JSX --TO--&gt; EveryThing

- JSX --&gt; HTML
- JSX --&gt; native ios或android中的组件（XML）
- JSX --&gt; VR
- JSX --&gt; 物联网</code></pre>
<h2 id="articleHeader4">为什么要用React</h2>
<ul>
<li>1 使用<code>组件化</code>开发方式，符合现代Web开发的趋势</li>
<li>2 技术成熟，社区完善，配件齐全，适用于大型Web项目（生态系统健全）</li>
<li>3 由Facebook专门的团队维护，技术支持可靠</li>
<li>4 ReactNative - Learn once, write anywhere: Build mobile apps with React</li>
<li>5 使用方式简单，性能非常高，支持服务端渲染</li>
<li>6 React非常火，从技术角度，可以满足好奇心，提高技术水平；从职业角度，有利于求职和晋升，有利于参与潜力大的项目</li>
</ul>
<h2 id="articleHeader5">React中的核心概念</h2>
<ul>
<li>1 虚拟DOM（Virtual DOM）</li>
<li>2 Diff算法（虚拟DOM的加速器，提升React性能的法宝）</li>
</ul>
<h2 id="articleHeader6">虚拟DOM（Vitural DOM）</h2>
<blockquote>React将DOM抽象为虚拟DOM，虚拟DOM其实就是用一个对象来描述DOM，通过对比前后两个对象的差异，最终只把变化的部分重新渲染，提高渲染的效率<p>为什么用虚拟dom，当dom反生更改时需要遍历 而原生dom可遍历属性多大231个 且大部分与渲染无关 更新页面代价太大</p>
</blockquote>
<ul>
<li><a href="https://github.com/livoras/blog/issues/13" rel="nofollow noreferrer" target="_blank">如何实现一个 Virtual DOM 算法</a></li>
<li><a href="https://www.zhihu.com/question/31809713" rel="nofollow noreferrer" target="_blank">理解 Virtual DOM</a></li>
</ul>
<h3 id="articleHeader7">VituralDOM的处理方式</h3>
<ul>
<li>1 用 JavaScript 对象结构表示 DOM 树的结构，然后用这个树构建一个真正的 DOM 树，插到文档当中</li>
<li>2 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异</li>
<li>3 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了</li>
</ul>
<h2 id="articleHeader8">Diff算法</h2>
<ul>
<li><a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">Reconciliation diff</a></li>
<li><a href="https://doc.react-china.org/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">diff算法 - 中文文档</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/20346379" rel="nofollow noreferrer" target="_blank">不可思议的 react diff</a></li>
<li><a href="https://github.com/zmmbreeze/blog/issues/9" rel="nofollow noreferrer" target="_blank">React diff 算法</a></li>
</ul>
<blockquote>当你使用React的时候，在某个时间点 render() 函数创建了一棵React元素树，<br>在下一个state或者props更新的时候，render() 函数将创建一棵新的React元素树，<br>React将对比这两棵树的不同之处，计算出如何高效的更新UI（只更新变化的地方）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 了解：

有一些解决将一棵树转换为另一棵树的最小操作数算法问题的通用方案。然而，树中元素个数为n，最先进的算法 的时间复杂度为O(n3) 。
如果直接使用这个算法，在React中展示1000个元素则需要进行10亿次的比较。这操作太过昂贵，相反，React基于两点假设，实现了一个O(n)算法，提升性能： -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 了解：

有一些解决将一棵树转换为另一棵树的最小操作数算法问题的通用方案。然而，树中元素个数为n，最先进的算法 的时间复杂度为O(n3) 。
如果直接使用这个算法，在React中展示1000个元素则需要进行10亿次的比较。这操作太过昂贵，相反，React基于两点假设，实现了一个O(n)算法，提升性能： --&gt;</span></code></pre>
<ul><li>
<p>React中有两种假定：</p>
<ul>
<li>1 <strong>两个不同类型的元素会产生不同的树(根元素不同结构树一定不同)</strong>
</li>
<li>2 <strong>开发者可以通过key属性指定不同树中没有发生改变的子元素</strong>
</li>
</ul>
</li></ul>
<h3 id="articleHeader9">Diff算法的说明 - 1</h3>
<ul><li>如果两棵树的根元素类型不同，React会销毁旧树，创建新树</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧树
<div>
  <Counter />
</div>

// 新树
<span>
  <Counter />
</span>

执行过程：destory Counter -> insert Counter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 旧树</span>
&lt;div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-comment">// 新树</span>
&lt;span&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>

执行过程：destory Counter -&gt; insert Counter</code></pre>
<h3 id="articleHeader10">Diff算法的说明 - 2</h3>
<ul>
<li>对于类型相同的React DOM 元素，React会对比两者的属性是否相同，只更新不同的属性</li>
<li>当处理完这个DOM节点，React就会递归处理子节点。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧
<div className=&quot;before&quot; title=&quot;stuff&quot; />
// 新
<div className=&quot;after&quot; title=&quot;stuff&quot; />
只更新：className 属性

// 旧
<div style="{{"color: 'red', fontWeight: 'bold'"}}" />
// 新
<div style="{{"color: 'green', fontWeight: 'bold'"}}" />
只更新：color属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 旧</span>
&lt;div className=<span class="hljs-string">"before"</span> title=<span class="hljs-string">"stuff"</span> /&gt;
<span class="hljs-comment">// 新</span>
&lt;div className=<span class="hljs-string">"after"</span> title=<span class="hljs-string">"stuff"</span> /&gt;
只更新：className 属性

<span class="hljs-comment">// 旧</span>
&lt;div style="{{"<span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>, <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>"}}" /&gt;
<span class="hljs-comment">// 新</span>
&lt;div style="{{"<span class="hljs-attr">color</span>: <span class="hljs-string">'green'</span>, <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>"}}" /&gt;
只更新：color属性</code></pre>
<h3 id="articleHeader11">Diff算法的说明 - 3</h3>
<ul><li>1 当在子节点的后面添加一个节点，这时候两棵树的转化工作执行的很好</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 新
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>

执行过程：
React会匹配新旧两个<li>first</li>，匹配两个<li>second</li>，然后添加 <li>third</li> tree" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 旧</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li&gt;second&lt;<span class="hljs-regexp">/li&gt;
&lt;/u</span>l&gt;

<span class="hljs-comment">// 新</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li&gt;second&lt;<span class="hljs-regexp">/li&gt;
  &lt;li&gt;third&lt;/</span>li&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>

执行过程：
React会匹配新旧两个&lt;li&gt;first&lt;<span class="hljs-regexp">/li&gt;，匹配两个&lt;li&gt;second&lt;/</span>li&gt;，然后添加 &lt;li&gt;third&lt;<span class="hljs-regexp">/li&gt; tree</span></code></pre>
<ul><li>2 但是如果你在开始位置插入一个元素，那么问题就来了：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

// 新
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

在没有key属性时执行过程：
React将改变每一个子删除重新创建，而非保持 <li>Duke</li> 和 <li>Villanova</li> 不变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 旧</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Duke<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li&gt;Villanova&lt;<span class="hljs-regexp">/li&gt;
&lt;/u</span>l&gt;

<span class="hljs-comment">// 新</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Connecticut<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li&gt;Duke&lt;<span class="hljs-regexp">/li&gt;
  &lt;li&gt;Villanova&lt;/</span>li&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>

在没有key属性时执行过程：
React将改变每一个子删除重新创建，而非保持 &lt;li&gt;Duke&lt;<span class="hljs-regexp">/li&gt; 和 &lt;li&gt;Villanova&lt;/</span>li&gt; 不变</code></pre>
<h3 id="articleHeader12">key 属性</h3>
<blockquote>为了解决以上问题，React提供了一个 key 属性。当子节点带有key属性，React会通过key来匹配原始树和后来的树。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧
<ul>
  <li key=&quot;2015&quot;>Duke</li>
  <li key=&quot;2016&quot;>Villanova</li>
</ul>

// 新
<ul>
  <li key=&quot;2014&quot;>Connecticut</li>
  <li key=&quot;2015&quot;>Duke</li>
  <li key=&quot;2016&quot;>Villanova</li>
</ul>
执行过程：
现在 React 知道带有key '2014' 的元素是新的，对于 '2015' 和 '2016' 仅仅移动位置即可 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 旧</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"2015"</span>&gt;</span>Duke<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li key=<span class="hljs-string">"2016"</span>&gt;Villanova&lt;<span class="hljs-regexp">/li&gt;
&lt;/u</span>l&gt;

<span class="hljs-comment">// 新</span>
&lt;ul&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"2014"</span>&gt;</span>Connecticut<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;li key=<span class="hljs-string">"2015"</span>&gt;Duke&lt;<span class="hljs-regexp">/li&gt;
  &lt;li key="2016"&gt;Villanova&lt;/</span>li&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
执行过程：
现在 React 知道带有key <span class="hljs-string">'2014'</span> 的元素是新的，对于 <span class="hljs-string">'2015'</span> 和 <span class="hljs-string">'2016'</span> 仅仅移动位置即可 </code></pre>
<ul>
<li>说明：key属性在React内部使用，但不会传递给你的组件</li>
<li>推荐：在遍历数据时，推荐在组件中使用 key 属性：<code>&lt;li key={item.id}&gt;{item.name}&lt;/li&gt;</code>
</li>
<li>注意：<strong>key只需要保持与他的兄弟节点唯一即可，不需要全局唯一</strong>
</li>
<li>注意：<strong>尽可能的减少数组index作为key，数组中插入元素的等操作时，会使得效率底下</strong>
</li>
</ul>
<h2 id="articleHeader13">React的基本使用</h2>
<ul>
<li>安装：<code>npm i -S react react-dom</code>
</li>
<li>
<code>react</code>：react 是React库的入口点</li>
<li>
<code>react-dom</code>：提供了针对DOM的方法，比如：把创建的虚拟DOM，渲染到页面上</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 导入 react
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 创建 虚拟DOM
// 参数1：元素名称  参数2：元素属性对象(null表示无)  参数3：当前元素的子元素string||createElement() 的返回值
const divVD = React.createElement('div', {
  title: 'hello react'
}, 'Hello React！！！')

// 3. 渲染
// 参数1：虚拟dom对象  参数2：dom对象表示渲染到哪个元素内 参数3：回调函数
ReactDOM.render(divVD, document.getElementById('app'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1. 导入 react</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>

<span class="hljs-comment">// 2. 创建 虚拟DOM</span>
<span class="hljs-comment">// 参数1：元素名称  参数2：元素属性对象(null表示无)  参数3：当前元素的子元素string||createElement() 的返回值</span>
<span class="hljs-keyword">const</span> divVD = React.createElement(<span class="hljs-string">'div'</span>, {
  <span class="hljs-attr">title</span>: <span class="hljs-string">'hello react'</span>
}, <span class="hljs-string">'Hello React！！！'</span>)

<span class="hljs-comment">// 3. 渲染</span>
<span class="hljs-comment">// 参数1：虚拟dom对象  参数2：dom对象表示渲染到哪个元素内 参数3：回调函数</span>
ReactDOM.render(divVD, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))</code></pre>
<h3 id="articleHeader14">createElement()的问题</h3>
<ul><li>说明：<code>createElement()</code>方式，代码编写不友好，太复杂</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dv = React.createElement(
  &quot;div&quot;,
  { className: &quot;shopping-list&quot; },
  React.createElement(
    &quot;h1&quot;,
    null,
    &quot;Shopping List for &quot;
  ),
  React.createElement(
    &quot;ul&quot;,
    null,
    React.createElement(
      &quot;li&quot;,
      null,
      &quot;Instagram&quot;
    ),
    React.createElement(
      &quot;li&quot;,
      null,
      &quot;WhatsApp&quot;
    )
  )
)
// 渲染
ReactDOM.render(dv, document.getElementById('app'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> dv = React.createElement(
  <span class="hljs-string">"div"</span>,
  { <span class="hljs-attr">className</span>: <span class="hljs-string">"shopping-list"</span> },
  React.createElement(
    <span class="hljs-string">"h1"</span>,
    <span class="hljs-literal">null</span>,
    <span class="hljs-string">"Shopping List for "</span>
  ),
  React.createElement(
    <span class="hljs-string">"ul"</span>,
    <span class="hljs-literal">null</span>,
    React.createElement(
      <span class="hljs-string">"li"</span>,
      <span class="hljs-literal">null</span>,
      <span class="hljs-string">"Instagram"</span>
    ),
    React.createElement(
      <span class="hljs-string">"li"</span>,
      <span class="hljs-literal">null</span>,
      <span class="hljs-string">"WhatsApp"</span>
    )
  )
)
<span class="hljs-comment">// 渲染</span>
ReactDOM.render(dv, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))</code></pre>
<h3 id="articleHeader15">JSX 的基本使用</h3>
<ul>
<li>注意：JSX语法，最终会被编译为 createElement() 方法</li>
<li>推荐：<strong>使用 JSX 的方式创建组件</strong>
</li>
<li>JSX - JavaScript XML</li>
<li>安装：<code>npm i -D babel-preset-react</code> （依赖与：babel-core/babel-loader）</li>
</ul>
<blockquote>注意：JSX的语法需要通过 babel-preset-react 编译后，才能被解析执行</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 1 在 .babelrc 开启babel对 JSX 的转换 */
{
  &quot;presets&quot;: [
    &quot;env&quot;, &quot;react&quot;
  ]
}

/* 2 webpack.config.js */
module: [
  rules: [
    { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
  ]
]

/* 3 在 js 文件中 使用 JSX */
const dv = (
  <div title=&quot;标题&quot; className=&quot;cls container&quot;>Hello JSX!</div>
)

/* 4 渲染 JSX 到页面中 */
ReactDOM.render(dv, document.getElementById('app'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 1 在 .babelrc 开启babel对 JSX 的转换 */</span>
{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"env"</span>, <span class="hljs-string">"react"</span>
  ]
}

<span class="hljs-comment">/* 2 webpack.config.js */</span>
<span class="hljs-built_in">module</span>: [
  rules: [
    { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-attr">use</span>: <span class="hljs-string">'babel-loader'</span>, <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span> },
  ]
]

<span class="hljs-comment">/* 3 在 js 文件中 使用 JSX */</span>
<span class="hljs-keyword">const</span> dv = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标题"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"cls container"</span>&gt;</span>Hello JSX!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-comment">/* 4 渲染 JSX 到页面中 */</span>
ReactDOM.render(dv, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))</code></pre>
<h2 id="articleHeader16">JSX的注意点</h2>
<ul>
<li>
<p>注意 1: 如果在 JSX 中给元素添加类, 需要使用 <code>className</code> 代替 class</p>
<ul><li>类似：label 的 for属性，使用<code>htmlFor</code>代替</li></ul>
</li>
<li>注意 2：在 JSX 中可以直接使用 JS代码，直接在 JSX 中通过 {} 中间写 JS代码即可</li>
<li>注意 3：在 JSX 中<strong>只能使用表达式</strong>，但是不能出现 语句！！！</li>
<li>注意 4：在 JSX 中注释语法：<code>{/* 中间是注释的内容 */}</code>
</li>
</ul>
<h2 id="articleHeader17">React组件</h2>
<blockquote>React 组件可以让你把UI分割为独立、可复用的片段，并将每一片段视为相互独立的部分。</blockquote>
<ul>
<li>组件是由一个个的HTML元素组成的</li>
<li>概念上来讲, 组件就像JS中的函数。它们接受用户输入（<code>props</code>），并且<strong>返回</strong>一个React对象，用来描述展示在页面中的内容</li>
</ul>
<h3 id="articleHeader18">React创建组件的两种方式</h3>
<ul>
<li>1 通过 JS函数 创建（无状态组件）</li>
<li>2 通过 class 创建（有状态组件）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="函数式组件 和 class 组件的使用场景说明：
1 如果一个组件仅仅是为了展示数据，那么此时就可以使用 函数组件
2 如果一个组件中有一定业务逻辑，需要操作数据，那么就需要使用 class 创建组件，因为，此时需要使用 state" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">函数式组件 和 class 组件的使用场景说明：
1 如果一个组件仅仅是为了展示数据，那么此时就可以使用 函数组件
2 如果一个组件中有一定业务逻辑，需要操作数据，那么就需要使用 class 创建组件，因为，此时需要使用 state</code></pre>
<h4>JavaScript函数创建</h4>
<ul>
<li>注意：1 函数名称必须为大写字母开头，React通过这个特点来判断是不是一个组件</li>
<li>注意：2 函数必须有返回值，返回值可以是：JSX对象或<code>null</code>
</li>
<li>注意：3 返回的JSX，必须有<em>一个</em>根元素</li>
<li>注意：4 组件的返回值使用<code>()</code>包裹，避免换行问题</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props) {
  return (
    // 此处注释的写法 
    <div className=&quot;shopping-list&quot;>
      {/* 此处 注释的写法 必须要{}包裹 */}
      <h1>Shopping List for {props.name}</h1>
      <ul>
        <li>Instagram</li>
        <li>WhatsApp</li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <Welcome name=&quot;jack&quot; />,
  document.getElementById('app')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-comment">// 此处注释的写法 </span>
    &lt;div className=<span class="hljs-string">"shopping-list"</span>&gt;
      {<span class="hljs-comment">/* 此处 注释的写法 必须要{}包裹 */</span>}
      &lt;h1&gt;Shopping List <span class="hljs-keyword">for</span> {props.name}&lt;<span class="hljs-regexp">/h1&gt;
      &lt;ul&gt;
        &lt;li&gt;Instagram&lt;/</span>li&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>WhatsApp<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
      &lt;<span class="hljs-regexp">/ul&gt;
    &lt;/</span>div&gt;
  )
}

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Welcome</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"jack"</span> /&gt;</span>,
  document.getElementById('app')
)</span></code></pre>
<h4>class创建</h4>
<blockquote>在es6中class仅仅是一个语法糖，不是真正的类，本质上还是构造函数+原型 实现继承</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6中class关键字的简单使用

// - **ES6中的所有的代码都是运行在严格模式中的**
// - 1 它是用来定义类的，是ES6中实现面向对象编程的新方式
// - 2 使用`static`关键字定义静态属性
// - 3 使用`constructor`构造函数，创建实例属性
// - [参考](http://es6.ruanyifeng.com/#docs/class)

// 语法：
class Person {
  // 实例的构造函数 constructor
  constructor(age){
    // 实例属性
    this.age = age
  }
  // 在class中定义方法 此处为实例方法 通过实例打点调用
  sayHello () {
    console.log('大家好，我今年' + this.age + '了');
  }

  // 静态方法 通过构造函数打点调用 Person.doudou()
  static doudou () {
    console.log('我是小明，我新get了一个技能，会暖床');
  }
}
// 添加静态属性
Person.staticName = '静态属性'
// 实例化对象
const p = new Person(19)
 
 
// 实现继承的方式
 
class American extends Person {
  constructor() {
    // 必须调用super(), super表示父类的构造函数
    super()
    this.skin = 'white'
    this.eyeColor = 'white'
  }
}

// 创建react对象
// 注意：基于 `ES6` 中的class，需要配合 `babel` 将代码转化为浏览器识别的ES5语法
// 安装：`npm i -D babel-preset-env`
 
//  react对象继承字React.Component
class ShoppingList extends React.Component {
  constructor(props) { 
    super(props)
  }
  // class创建的组件中 必须有rander方法 且显示return一个react对象或者null
  render() {
    return (
      <div className=&quot;shopping-list&quot;>
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
        </ul>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES6中class关键字的简单使用</span>

<span class="hljs-comment">// - **ES6中的所有的代码都是运行在严格模式中的**</span>
<span class="hljs-comment">// - 1 它是用来定义类的，是ES6中实现面向对象编程的新方式</span>
<span class="hljs-comment">// - 2 使用`static`关键字定义静态属性</span>
<span class="hljs-comment">// - 3 使用`constructor`构造函数，创建实例属性</span>
<span class="hljs-comment">// - [参考](http://es6.ruanyifeng.com/#docs/class)</span>

<span class="hljs-comment">// 语法：</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-comment">// 实例的构造函数 constructor</span>
  <span class="hljs-keyword">constructor</span>(age){
    <span class="hljs-comment">// 实例属性</span>
    <span class="hljs-keyword">this</span>.age = age
  }
  <span class="hljs-comment">// 在class中定义方法 此处为实例方法 通过实例打点调用</span>
  sayHello () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'大家好，我今年'</span> + <span class="hljs-keyword">this</span>.age + <span class="hljs-string">'了'</span>);
  }

  <span class="hljs-comment">// 静态方法 通过构造函数打点调用 Person.doudou()</span>
  <span class="hljs-keyword">static</span> doudou () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是小明，我新get了一个技能，会暖床'</span>);
  }
}
<span class="hljs-comment">// 添加静态属性</span>
Person.staticName = <span class="hljs-string">'静态属性'</span>
<span class="hljs-comment">// 实例化对象</span>
<span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-number">19</span>)
 
 
<span class="hljs-comment">// 实现继承的方式</span>
 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">American</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// 必须调用super(), super表示父类的构造函数</span>
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.skin = <span class="hljs-string">'white'</span>
    <span class="hljs-keyword">this</span>.eyeColor = <span class="hljs-string">'white'</span>
  }
}

<span class="hljs-comment">// 创建react对象</span>
<span class="hljs-comment">// 注意：基于 `ES6` 中的class，需要配合 `babel` 将代码转化为浏览器识别的ES5语法</span>
<span class="hljs-comment">// 安装：`npm i -D babel-preset-env`</span>
 
<span class="hljs-comment">//  react对象继承字React.Component</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ShoppingList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) { 
    <span class="hljs-keyword">super</span>(props)
  }
  <span class="hljs-comment">// class创建的组件中 必须有rander方法 且显示return一个react对象或者null</span>
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"shopping-list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Shopping List for {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Instagram<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>WhatsApp<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<h2 id="articleHeader19">给组件传递数据 - 父子组件传递数据</h2>
<ul>
<li>组件中有一个 <code>只读的对象</code> 叫做 <code>props</code>，无法给props添加属性</li>
<li>获取方式：函数参数 <code>props</code>
</li>
<li>作用：将传递给组件的属性转化为 <code>props</code> 对象中的属性</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props){
  // props ---> { username: 'zs', age: 20 }
  return (
    <div>
      <div>Welcome React</div>
      <h3>姓名：{props.username}----年龄是：{props.age}</h3>
    </div>
  )
}

// 给 Hello组件 传递 props：username 和 age(如果你想要传递numb类型是数据 就需要向下面这样)
ReactDOM.reander(<Hello username=&quot;zs&quot; age={20}></Hello>, ......)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>)</span>{
  <span class="hljs-comment">// props ---&gt; { username: 'zs', age: 20 }</span>
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome React<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>姓名：{props.username}----年龄是：{props.age}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}

<span class="hljs-comment">// 给 Hello组件 传递 props：username 和 age(如果你想要传递numb类型是数据 就需要向下面这样)</span>
ReactDOM.reander(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">username</span>=<span class="hljs-string">"zs"</span> <span class="hljs-attr">age</span>=<span class="hljs-string">{20}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Hello</span>&gt;</span></span>, ......)</code></pre>
<h2 id="articleHeader20">封装组件到独立的文件中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建Hello2.js组件文件
// 1. 引入React模块
// 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先拿到React。
import React from 'react'

// 2. 使用function构造函数创建组件
function Hello2(props){
  return (
    <div>
      <div>这是Hello2组件</div>
      <h1>这是大大的H1标签，我大，我骄傲！！！</h1>
      <h6>这是小小的h6标签，我小，我傲娇！！！</h6>
    </div>
  )
}
// 3. 导出组件
export default Hello2

// app.js中   使用组件：
import Hello2 from './components/Hello2'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建Hello2.js组件文件</span>
<span class="hljs-comment">// 1. 引入React模块</span>
<span class="hljs-comment">// 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先拿到React。</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-comment">// 2. 使用function构造函数创建组件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Hello2</span>(<span class="hljs-params">props</span>)</span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是Hello2组件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这是大大的H1标签，我大，我骄傲！！！<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>这是小小的h6标签，我小，我傲娇！！！<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
<span class="hljs-comment">// 3. 导出组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Hello2

<span class="hljs-comment">// app.js中   使用组件：</span>
<span class="hljs-keyword">import</span> Hello2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello2'</span></code></pre>
<h2 id="articleHeader21">props和state</h2>
<h3 id="articleHeader22">props</h3>
<ul>
<li>作用：<strong>给组件传递数据，一般用在父子组件之间</strong>
</li>
<li>说明：React把传递给组件的属性转化为一个对象并交给 <code>props</code>
</li>
<li>特点：<code>props</code>是只读的，无法给<code>props</code>添加或修改属性</li>
<li>
<p><code>props.children</code>：获取组件的内容，比如：</p>
<ul><li>
<code>&lt;Hello&gt;组件内容&lt;/Hello&gt;</code> 中的 <code>组件内容</code>
</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// props 是一个包含数据的对象参数，不要试图修改 props 参数
// 返回值：react元素
function Welcome(props) {
  // 返回的 react元素中必须只有一个根元素
  return <div>hello, {props.name}</div>
}

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// props 是一个包含数据的对象参数，不要试图修改 props 参数</span>
<span class="hljs-comment">// 返回值：react元素</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-comment">// 返回的 react元素中必须只有一个根元素</span>
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  }
}</code></pre>
<h3 id="articleHeader23">state</h3>
<blockquote>状态即数据</blockquote>
<ul>
<li>作用：用来给组件提供<code>组件内部</code>使用的数据</li>
<li>注意：只有通过<code>class</code>创建的组件才具有状态</li>
<li>注意：<strong>状态是私有的，完全由组件来控制</strong>
</li>
<li>
<p>注意：不要在 <code>state</code> 中添加 <code>render()</code> 方法中不需要的数据，会影响渲染性能！</p>
<ul><li>可以将组件内部使用但是不渲染在视图中的内容，直接添加给 this</li></ul>
</li>
<li>
<p>注意：不要在 <code>render()</code> 方法中调用 setState() 方法来修改<code>state</code>的值</p>
<ul><li>但是可以通过 <code>this.state.name = 'rose'</code> 方式设置state（不推荐!!!!）</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例：
class Hello extends React.Component {
  constructor() {
    // es6继承必须用super调用父类的constructor
    super()

    this.state = {
      gender: 'male'
    }
  }

  render() {
    return (
      <div>性别：{ this.state.gender }</div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 例：</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// es6继承必须用super调用父类的constructor</span>
    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">gender</span>: <span class="hljs-string">'male'</span>
    }
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>性别：{ this.state.gender }<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<h2 id="articleHeader24">JSX语法转化过程</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1、JSX
const element = (
  <h1 className=&quot;greeting&quot;>
    Hello, world!
  </h1>
)

// 2、JSX -> createElement
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
)

// React elements: 使用对象的形式描述页面结构
// Note: 这是简化后的对象结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
  },
  children: ['Hello, world']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1、JSX</span>
<span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
    Hello, world!
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
)

<span class="hljs-comment">// 2、JSX -&gt; createElement</span>
<span class="hljs-keyword">const</span> element = React.createElement(
  <span class="hljs-string">'h1'</span>,
  {<span class="hljs-attr">className</span>: <span class="hljs-string">'greeting'</span>},
  <span class="hljs-string">'Hello, world!'</span>
)

<span class="hljs-comment">// React elements: 使用对象的形式描述页面结构</span>
<span class="hljs-comment">// Note: 这是简化后的对象结构</span>
<span class="hljs-keyword">const</span> element = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">'h1'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">className</span>: <span class="hljs-string">'greeting'</span>,
  },
  <span class="hljs-attr">children</span>: [<span class="hljs-string">'Hello, world'</span>]
}</code></pre>
<h2 id="articleHeader25">评论列表案例</h2>
<ul>
<li>巩固有状态组件和无状态组件的使用</li>
<li>两个组件：<code>&lt;CommentList&gt;&lt;/CommentList&gt;</code> 和 <code>&lt;Comment&gt;&lt;/Comment&gt;</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { user: '张三', content: '哈哈，沙发' },
  { user: '张三2', content: '哈哈，板凳' },
  { user: '张三3', content: '哈哈，凉席' },
  { user: '张三4', content: '哈哈，砖头' },
  { user: '张三5', content: '哈哈，楼下山炮' }
]

// 属性扩展
<Comment {...item} key={i}></Comment>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
  { <span class="hljs-attr">user</span>: <span class="hljs-string">'张三'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'哈哈，沙发'</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">'张三2'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'哈哈，板凳'</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">'张三3'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'哈哈，凉席'</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">'张三4'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'哈哈，砖头'</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">'张三5'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'哈哈，楼下山炮'</span> }
]

<span class="hljs-comment">// 属性扩展</span>
&lt;Comment {...item} key={i}&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">Comment</span>&gt;</span></span></code></pre>
<h2 id="articleHeader26">style样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 直接写行内样式：
<li style="{{"border:'1px solid red', fontSize:'12px'"}}"></li>

// 2. 抽离为对象形式
var styleH3 = {color:'blue'}
var styleObj = {
  liStyle:{border:'1px solid red', fontSize:'12px'},
  h3Style:{color:'green'}
}

<li style={styleObj.liStyle}>
  <h3 style={styleObj.h3Style}>评论内容：{props.content}</h3>
</li>

// 3. 使用样式表定义样式：
import '../css/comment.css'
<p className=&quot;pUser&quot;>评论人：{props.user}</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1. 直接写行内样式：</span>
&lt;li style="{{"<span class="hljs-attr">border</span>:<span class="hljs-string">'1px solid red'</span>, <span class="hljs-attr">fontSize</span>:<span class="hljs-string">'12px'</span>"}}"&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>

<span class="hljs-comment">// 2. 抽离为对象形式</span>
<span class="hljs-keyword">var</span> styleH3 = {<span class="hljs-attr">color</span>:<span class="hljs-string">'blue'</span>}
<span class="hljs-keyword">var</span> styleObj = {
  <span class="hljs-attr">liStyle</span>:{<span class="hljs-attr">border</span>:<span class="hljs-string">'1px solid red'</span>, <span class="hljs-attr">fontSize</span>:<span class="hljs-string">'12px'</span>},
  <span class="hljs-attr">h3Style</span>:{<span class="hljs-attr">color</span>:<span class="hljs-string">'green'</span>}
}

&lt;li style={styleObj.liStyle}&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styleObj.h3Style}</span>&gt;</span>评论内容：{props.content}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/li&gt;

/</span><span class="hljs-regexp">/ 3. 使用样式表定义样式：
import '../</span>css/comment.css<span class="hljs-string">'
&lt;p className="pUser"&gt;评论人：{props.user}&lt;/p&gt;</span></code></pre>
<h2 id="articleHeader27">相关文章</h2>
<ul>
<li><a href="http://www.cnblogs.com/tim100/p/6050514.html" rel="nofollow noreferrer" target="_blank">React数据流和组件间的沟通总结</a></li>
<li><a href="https://segmentfault.com/q/1010000005876655/a-1020000005876751">单向数据流和双向绑定各有什么优缺点？</a></li>
<li><a href="https://www.zhihu.com/question/29504639?sort=created" rel="nofollow noreferrer" target="_blank">怎么更好的理解虚拟DOM?</a></li>
<li><a href="https://discountry.github.io/react/" rel="nofollow noreferrer" target="_blank">React中文文档</a></li>
<li><a href="http://blog.csdn.net/yczz/article/details/49886061" rel="nofollow noreferrer" target="_blank">React 源码剖析系列 － 不可思议的 react diff</a></li>
<li><a href="http://www.infoq.com/cn/articles/react-dom-diff?from=timeline&amp;isappinstalled=0" rel="nofollow noreferrer" target="_blank">深入浅出React（四）：虚拟DOM Diff算法解析</a></li>
</ul>
<h2 id="articleHeader28">组件的生命周期</h2>
<ul><li>简单说：<strong>一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期</strong>
</li></ul>
<p>组件生命周期函数的定义：从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，那么这些事件，统称为组件的生命周期函数！</p>
<ul>
<li>通过这个函数，能够让开发人员的代码，参与到组件的生命周期中。也就是说，通过钩子函数，就可以控制组件的行为</li>
<li><a href="https://doc.react-china.org/docs/react-component.html" rel="nofollow noreferrer" target="_blank">react component</a></li>
<li><a href="http://www.race604.com/react-native-component-lifecycle/" rel="nofollow noreferrer" target="_blank">React Native 中组件的生命周期</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/20312691?refer=purerender" rel="nofollow noreferrer" target="_blank">React 生命周期的管理艺术</a></li>
<li><a href="http://www.jianshu.com/p/9e427e04135e" rel="nofollow noreferrer" target="_blank">智能组件和木偶组件</a></li>
</ul>
<h3 id="articleHeader29">组件生命周期函数总览</h3>
<ul>
<li>组件的生命周期包含三个阶段：创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）</li>
<li>Mounting：</li>
</ul>
<blockquote>constructor()  <br>componentWillMount()  <br>render()  <br>componentDidMount()</blockquote>
<ul><li>Updating</li></ul>
<blockquote>componentWillReceiveProps()  <br>shouldComponentUpdate()  <br>componentWillUpdate()  <br>render()  <br>componentDidUpdate()</blockquote>
<ul><li>Unmounting</li></ul>
<blockquote>componentWillUnmount()</blockquote>
<h3 id="articleHeader30">组件生命周期 - 创建阶段(Mounting)</h3>
<ul><li>特点：该阶段的函数只执行一次</li></ul>
<h4>constructor()</h4>
<ul>
<li>作用：1 获取props 2 初始化state</li>
<li>说明：通过 <code>constructor()</code> 的参数<code>props</code>获取</li>
<li><a href="https://doc.react-china.org/docs/react-without-es6.html" rel="nofollow noreferrer" target="_blank">设置state和props</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extends React.Component {
  constructor(props) {
    // 获取 props
    super(props)
    // 初始化 state
    this.state = {
      count: props.initCount
    }
  }
}

// 初始化 props
// 语法：通过静态属性 defaultProps 来初始化props
Greeting.defaultProps = {
  initCount: 0
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-comment">// 获取 props</span>
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-comment">// 初始化 state</span>
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: props.initCount
    }
  }
}

<span class="hljs-comment">// 初始化 props</span>
<span class="hljs-comment">// 语法：通过静态属性 defaultProps 来初始化props</span>
Greeting.defaultProps = {
  <span class="hljs-attr">initCount</span>: <span class="hljs-number">0</span>
};</code></pre>
<h4>componentWillMount()</h4>
<ul>
<li>说明：组件被挂载到页面之前调用，其在render()之前被调用，因此在这方法里<code>同步</code>地设置状态将不会触发重渲染</li>
<li>注意：无法获取页面中的DOM对象</li>
<li>注意：可以调用 <code>setState()</code> 方法来改变状态值</li>
<li>用途：发送ajax请求获取数据</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillMount() {
  console.warn(document.getElementById('btn')) // null
  this.setState({
    count: this.state.count + 1
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentWillMount() {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>)) <span class="hljs-comment">// null</span>
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>
  })
}</code></pre>
<h4>render()</h4>
<ul>
<li>作用：渲染组件到页面中，无法获取页面中的DOM对象</li>
<li>
<p>注意：<strong>不要在render方法中调用 <code>setState()</code> 方法，否则会递归渲染</strong></p>
<ul><li>原因说明：状态改变会重新调用<code>render()</code>，<code>render()</code>又重新改变状态</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  console.warn(document.getElementById('btn')) // null

  return (
    <div>
      <button id=&quot;btn&quot; onClick={this.handleAdd}>打豆豆一次</button>
      {
        this.state.count === 4
        ? null
        : <CounterChild initCount={this.state.count}></CounterChild>
      }
    </div>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">render() {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>)) <span class="hljs-comment">// null</span>

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleAdd}</span>&gt;</span>打豆豆一次<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {
        this.state.count === 4
        ? null
        : <span class="hljs-tag">&lt;<span class="hljs-name">CounterChild</span> <span class="hljs-attr">initCount</span>=<span class="hljs-string">{this.state.count}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CounterChild</span>&gt;</span>
      }
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}</code></pre>
<h4>componentDidMount()</h4>
<ul>
<li>1 组件已经挂载到页面中</li>
<li>2 可以进行DOM操作，比如：获取到组件内部的DOM对象</li>
<li>3 可以<strong>发送请求</strong>获取数据</li>
<li>4 可以通过 <code>setState()</code> 修改状态的值</li>
<li>注意：在这里修改状态会重新渲染</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
  // 此时，就可以获取到组件内部的DOM对象
  console.warn('componentDidMount', document.getElementById('btn'))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidMount() {
  <span class="hljs-comment">// 此时，就可以获取到组件内部的DOM对象</span>
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'componentDidMount'</span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>))
}</code></pre>
<h3 id="articleHeader31">组件生命周期 - 运行阶段（Updating）</h3>
<ul>
<li>特点：该阶段的函数执行多次</li>
<li>说明：每当组件的<code>props</code>或者<code>state</code>改变的时候，都会触发运行阶段的函数</li>
</ul>
<h4>componentWillReceiveProps()</h4>
<ul>
<li>说明：组件接受到新的<code>props</code>前触发这个方法</li>
<li>参数：当前组件<code>props</code>值</li>
<li>可以通过 <code>this.props</code> 获取到上一次的值</li>
<li>使用：若你需要响应属性的改变，可以通过对比<code>this.props</code>和<code>nextProps</code>并在该方法中使用<code>this.setState()</code>处理状态改变</li>
<li>注意：修改<code>state</code>不会触发该方法</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
  console.warn('componentWillReceiveProps', nextProps)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentWillReceiveProps(nextProps) {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'componentWillReceiveProps'</span>, nextProps)
}</code></pre>
<h4>shouldComponentUpdate()</h4>
<ul>
<li>作用：根据这个方法的返回值决定是否重新渲染组件，返回<code>true</code>重新渲染，否则不渲染</li>
<li>优势：通过某个条件渲染组件，降低组件渲染频率，提升组件性能</li>
<li>说明：如果返回值为<code>false</code>，那么，后续<code>render()</code>方法不会被调用</li>
<li>注意：<strong>这个方法必须返回布尔值！！！</strong>
</li>
<li>场景：根据随机数决定是否渲染组件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// - 参数：
//   - 第一个参数：最新属性对象
//   - 第二个参数：最新状态对象
shouldComponentUpdate(nextProps, nextState) {
  console.warn('shouldComponentUpdate', nextProps, nextState)

  return nextState.count % 2 === 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// - 参数：</span>
<span class="hljs-comment">//   - 第一个参数：最新属性对象</span>
<span class="hljs-comment">//   - 第二个参数：最新状态对象</span>
shouldComponentUpdate(nextProps, nextState) {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'shouldComponentUpdate'</span>, nextProps, nextState)

  <span class="hljs-keyword">return</span> nextState.count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>
}</code></pre>
<h4>componentWillUpdate()</h4>
<ul>
<li>作用：组件将要更新</li>
<li>参数：最新的属性和状态对象</li>
<li>注意：不能修改状态 否则会循环渲染</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillUpdate(nextProps, nextState) {
  console.warn('componentWillUpdate', nextProps, nextState)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentWillUpdate(nextProps, nextState) {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'componentWillUpdate'</span>, nextProps, nextState)
}</code></pre>
<h4>render() 渲染</h4>
<ul>
<li>作用：重新渲染组件，与<code>Mounting</code>阶段的<code>render</code>是同一个函数</li>
<li>注意：这个函数能够执行多次，只要组件的属性或状态改变了，这个方法就会重新执行</li>
</ul>
<h4>componentDidUpdate()</h4>
<ul>
<li>作用：组件已经被更新</li>
<li>参数：旧的属性和状态对象</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(prevProps, prevState) {
  console.warn('componentDidUpdate', prevProps, prevState)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidUpdate(prevProps, prevState) {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'componentDidUpdate'</span>, prevProps, prevState)
}</code></pre>
<h3 id="articleHeader32">组件生命周期 - 卸载阶段（Unmounting）</h3>
<ul>
<li>组件销毁阶段：组件卸载期间，函数比较单一，只有一个函数，这个函数也有一个显著的特点：组件一辈子只能执行依次！</li>
<li>使用说明：只要组件不再被渲染到页面中，那么这个方法就会被调用（ 渲染到页面中 -&gt; 不再渲染到页面中 ）</li>
</ul>
<h4>componentWillUnmount()</h4>
<ul><li>
<p>作用：在卸载组件的时候，执行清理工作，比如</p>
<ul>
<li>1 清除定时器</li>
<li>2 清除<code>componentDidMount</code>创建的DOM对象</li>
</ul>
</li></ul>
<hr>
<h2 id="articleHeader33">React - createClass（不推荐）</h2>
<ul>
<li><strong><code>React.createClass({})</code> 方式，创建有状态组件，该方式已经被废弃！！！</strong></li>
<li>通过导入 <code>require('create-react-class')</code>，可以在不适用ES6的情况下，创建有状态组件</li>
<li>getDefaultProps() 和 getInitialState() 方法：是 <code>createReactClass()</code> 方式创建组件中的两个函数</li>
<li><a href="https://reactjs.org/docs/react-without-es6.html#declaring-default-props" rel="nofollow noreferrer" target="_blank">React without ES6</a></li>
<li><a href="https://doc.react-china.org/docs/react-without-es6.html" rel="nofollow noreferrer" target="_blank">React 不适用ES6</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  // 初始化 props
  getDefaultProps: function() {
    console.log('getDefaultProps');
    return {
      title: 'Basic counter!!!'
    }
  },

  // 初始化 state
  getInitialState: function() {
    console.log('getInitialState');
    return {
      count: 0
    }
  },

  render: function() {
    console.log('render');
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.count}</div>
        <input type='button' value='+' onClick={this.handleIncrement} />
      </div>
    );
  },

  handleIncrement: function() {
    var newCount = this.state.count + 1;
    this.setState({count: newCount});
  },

  propTypes: {
    title: React.PropTypes.string
  }
});

ReactDOM.render(
  React.createElement(Greeting),
  document.getElementById('app')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> createReactClass = <span class="hljs-built_in">require</span>(<span class="hljs-string">'create-react-class'</span>);
<span class="hljs-keyword">var</span> Greeting = createReactClass({
  <span class="hljs-comment">// 初始化 props</span>
  getDefaultProps: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getDefaultProps'</span>);
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Basic counter!!!'</span>
    }
  },

  <span class="hljs-comment">// 初始化 state</span>
  getInitialState: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getInitialState'</span>);
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'render'</span>);
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{this.props.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'button'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'+'</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleIncrement}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  },

  handleIncrement: function() {
    var newCount = this.state.count + 1;
    this.setState({count: newCount});
  },

  propTypes: {
    title: React.PropTypes.string
  }
});

ReactDOM.render(
  React.createElement(Greeting),
  document.getElementById('app')
);</span></code></pre>
<h2 id="articleHeader34">state和setState</h2>
<ul>
<li>注意：使用 <code>setState()</code> 方法修改状态，状态改变后，React会重新渲染组件</li>
<li>注意：不要直接修改state属性的值，这样不会重新渲染组件！！！</li>
<li>使用：1 初始化state 2 setState修改state</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改state（不推荐使用）
// https://facebook.github.io/react/docs/state-and-lifecycle.html#do-not-modify-state-directly
this.state.test = '这样方式，不会重新渲染组件';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 修改state（不推荐使用）</span>
<span class="hljs-comment">// https://facebook.github.io/react/docs/state-and-lifecycle.html#do-not-modify-state-directly</span>
<span class="hljs-keyword">this</span>.state.test = <span class="hljs-string">'这样方式，不会重新渲染组件'</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
  super(props)

  // 正确姿势！！！
  // -------------- 初始化 state --------------
  this.state = {
    count: props.initCount
  }
}

componentWillMount() {
  // -------------- 修改 state 的值 --------------
  // 方式一：
  this.setState({
    count: this.state.count + 1
  })

  this.setState({
    count: this.state.count + 1
  }, function(){
    // 由于 setState() 是异步操作，所以，如果想立即获取修改后的state
    // 需要在回调函数中获取
    // https://doc.react-china.org/docs/react-component.html#setstate
  });

  // 方式二：
  this.setState(function(prevState, props) {
    return {
      counter: prevState.counter + props.increment
    }
  })

  // 或者 - 注意： => 后面需要带有小括号，因为返回的是一个对象
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(props) {
  <span class="hljs-keyword">super</span>(props)

  <span class="hljs-comment">// 正确姿势！！！</span>
  <span class="hljs-comment">// -------------- 初始化 state --------------</span>
  <span class="hljs-keyword">this</span>.state = {
    <span class="hljs-attr">count</span>: props.initCount
  }
}

componentWillMount() {
  <span class="hljs-comment">// -------------- 修改 state 的值 --------------</span>
  <span class="hljs-comment">// 方式一：</span>
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>
  })

  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 由于 setState() 是异步操作，所以，如果想立即获取修改后的state</span>
    <span class="hljs-comment">// 需要在回调函数中获取</span>
    <span class="hljs-comment">// https://doc.react-china.org/docs/react-component.html#setstate</span>
  });

  <span class="hljs-comment">// 方式二：</span>
  <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prevState, props</span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">counter</span>: prevState.counter + props.increment
    }
  })

  <span class="hljs-comment">// 或者 - 注意： =&gt; 后面需要带有小括号，因为返回的是一个对象</span>
  <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ({
    <span class="hljs-attr">counter</span>: prevState.counter + props.increment
  }))
}</code></pre>
<h2 id="articleHeader35">组件绑定事件</h2>
<ul>
<li>1 通过React事件机制 <code>onClick</code> 绑定</li>
<li>
<p>2 JS原生方式绑定（通过 <code>ref</code> 获取元素）</p>
<ul>
<li>注意：<code>ref</code> 是React提供的一个特殊属性</li>
<li>
<code>ref</code>的使用说明：<a href="https://discountry.github.io/react/docs/refs-and-the-dom.html" rel="nofollow noreferrer" target="_blank">react ref</a>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader36">React中的事件机制 - 推荐</h3>
<ul>
<li>注意：事件名称采用驼峰命名法</li>
<li>例如：<code>onClick</code> 用来绑定单击事件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;触发单击事件&quot;
  onClick={this.handleCountAdd}
  onMouseEnter={this.handleMouseEnter}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"触发单击事件"</span>
  onClick={<span class="hljs-keyword">this</span>.handleCountAdd}
  onMouseEnter={<span class="hljs-keyword">this</span>.handleMouseEnter}
/&gt;</code></pre>
<h3 id="articleHeader37">JS原生方式 - 知道即可</h3>
<ul><li>说明：给元素添加 <code>ref</code> 属性，然后，获取元素绑定事件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JSX
// 将当前DOM的引用赋值给 this.txtInput 属性
<input ref={ input => this.txtInput = input } type=&quot;button&quot; value=&quot;我是豆豆&quot; />

componentDidMount() {
  // 通过 this.txtInput 属性获取元素绑定事件
  this.txtInput.addEventListener(() => {
    this.setState({
      count:this.state.count + 1
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// JSX</span>
<span class="hljs-comment">// 将当前DOM的引用赋值给 this.txtInput 属性</span>
&lt;input ref={ input =&gt; <span class="hljs-keyword">this</span>.txtInput = input } type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"我是豆豆"</span> /&gt;

componentDidMount() {
  <span class="hljs-comment">// 通过 this.txtInput 属性获取元素绑定事件</span>
  <span class="hljs-keyword">this</span>.txtInput.addEventListener(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>:<span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>
    })
  })
}</code></pre>
<h2 id="articleHeader38">事件绑定中的this</h2>
<ul>
<li>1 通过 <code>bind</code> 绑定</li>
<li>2 通过 <code>箭头函数</code> 绑定</li>
</ul>
<h3 id="articleHeader39">通过bind绑定</h3>
<ul>
<li>原理：<code>bind</code>能够调用函数，改变函数内部this的指向，并返回一个新函数</li>
<li>说明：<code>bind</code>第一个参数为返回函数中this的指向，后面的参数为传给返回函数的参数</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 自定义方法：
handleBtnClick(arg1, arg2) {
  this.setState({
    msg: '点击事件修改state的值' + arg1 + arg2
  })
}

render() {
  return (
    <div>
      <button onClick={
        // 无参数
        // this.handleBtnClick.bind(this)

        // 有参数
        this.handleBtnClick.bind(this, 'abc', [1, 2])
      }>事件中this的处理</button>
      <h1>{this.state.msg}</h1>
    </div>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 自定义方法：</span>
handleBtnClick(arg1, arg2) {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">msg</span>: <span class="hljs-string">'点击事件修改state的值'</span> + arg1 + arg2
  })
}

render() {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span>
        // 无参数
        // <span class="hljs-attr">this.handleBtnClick.bind</span>(<span class="hljs-attr">this</span>)

        // 有参数
        <span class="hljs-attr">this.handleBtnClick.bind</span>(<span class="hljs-attr">this</span>, '<span class="hljs-attr">abc</span>', [<span class="hljs-attr">1</span>, <span class="hljs-attr">2</span>])
      }&gt;</span>事件中this的处理<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{this.state.msg}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}</code></pre>
<ul><li>在构造函数中使用<code>bind</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() {
  super()

  this.handleBtnClick = this.handleBtnClick.bind(this)
}

// render() 方法中：
<button onClick={ this.handleBtnClick }>事件中this的处理</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>() {
  <span class="hljs-keyword">super</span>()

  <span class="hljs-keyword">this</span>.handleBtnClick = <span class="hljs-keyword">this</span>.handleBtnClick.bind(<span class="hljs-keyword">this</span>)
}

<span class="hljs-comment">// render() 方法中：</span>
&lt;button onClick={ <span class="hljs-keyword">this</span>.handleBtnClick }&gt;事件中<span class="hljs-keyword">this</span>的处理&lt;<span class="hljs-regexp">/button&gt;</span></code></pre>
<h3 id="articleHeader40">通过箭头函数绑定</h3>
<ul><li>原理：<code>箭头函数</code>中的this由所处的环境决定，自身不绑定this</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;在构造函数中绑定this并传参&quot; onClick={
  () => { this.handleBtnClick('参数1', '参数2') }
} />

handleBtnClick(arg1, arg2) {
  this.setState({
    msg: '在构造函数中绑定this并传参' + arg1 + arg2
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"在构造函数中绑定this并传参"</span> onClick={
  () =&gt; { <span class="hljs-keyword">this</span>.handleBtnClick(<span class="hljs-string">'参数1'</span>, <span class="hljs-string">'参数2'</span>) }
} /&gt;

handleBtnClick(arg1, arg2) {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">msg</span>: <span class="hljs-string">'在构造函数中绑定this并传参'</span> + arg1 + arg2
  });
}</code></pre>
<h2 id="articleHeader41">受控组件</h2>
<ul>
<li><a href="https://doc.react-china.org/docs/forms.html" rel="nofollow noreferrer" target="_blank">表单和受控组件</a></li>
<li><a href="https://doc.react-china.org/docs/uncontrolled-components.html" rel="nofollow noreferrer" target="_blank">非受控组件</a></li>
</ul>
<blockquote>在HTML当中，像<code>input</code>,<code>textarea</code>和<code>select</code>这类表单元素会维持自身状态，并根据用户输入进行更新。<br>在React中，可变的状态通常保存在组件的<code>state</code>中，并且只能用 <code>setState()</code> 方法进行更新.  <br>React根据初始状态渲染表单组件，接受用户后续输入，改变表单组件内部的状态。<br>因此，将那些值由React控制的表单元素称为：受控组件。</blockquote>
<ul>
<li>
<p>受控组件的特点：</p>
<ul>
<li>1 表单元素</li>
<li>2 由React通过JSX渲染出来</li>
<li>3 由React控制值的改变，也就是说想要改变元素的值，只能通过React提供的方法来修改</li>
</ul>
</li>
<li>注意：<strong>只能通过setState来设置受控组件的值</strong>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模拟实现文本框数据的双向绑定
<input type=&quot;text&quot; value={this.state.msg} onChange={this.handleTextChange}/>

// 当文本框内容改变的时候，触发这个事件，重新给state赋值
handleTextChange = event => {
  console.log(event.target.value)

  this.setState({
    msg: event.target.value
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 模拟实现文本框数据的双向绑定</span>
&lt;input type=<span class="hljs-string">"text"</span> value={<span class="hljs-keyword">this</span>.state.msg} onChange={<span class="hljs-keyword">this</span>.handleTextChange}/&gt;

<span class="hljs-comment">// 当文本框内容改变的时候，触发这个事件，重新给state赋值</span>
handleTextChange = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(event.target.value)

  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">msg</span>: event.target.value
  })
}</code></pre>
<h2 id="articleHeader42">评论列表案例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {name: '小明', content: '沙发！！！'},
  {name: '小红', content: '小明，居然是你'},
  {name: '小刚', content: '小明，放学你别走！！！'},
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
  {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'沙发！！！'</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">'小红'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'小明，居然是你'</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">'小刚'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'小明，放学你别走！！！'</span>},
]</code></pre>
<h2 id="articleHeader43">props校验</h2>
<ul>
<li>作用：通过类型检查，提高程序的稳定性</li>
<li>命令：<code>npm i -S prop-types</code>
</li>
<li><a href="https://doc.react-china.org/docs/typechecking-with-proptypes.html" rel="nofollow noreferrer" target="_blank">类型校验文档</a></li>
<li>使用：给类提供一个静态属性 <code>propTypes</code>（对象），来约束<code>props</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入模块
import PropTypes from 'prop-types'

// ...以下代码是类的静态属性：
// propTypes 静态属性的名称是固定的！！！
static propTypes = {
  initCount: PropTypes.number, // 规定属性的类型
  initAge: PropTypes.number.isRequired // 规定属性的类型，且规定为必传字段
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入模块</span>
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-comment">// ...以下代码是类的静态属性：</span>
<span class="hljs-comment">// propTypes 静态属性的名称是固定的！！！</span>
<span class="hljs-keyword">static</span> propTypes = {
  <span class="hljs-attr">initCount</span>: PropTypes.number, <span class="hljs-comment">// 规定属性的类型</span>
  initAge: PropTypes.number.isRequired <span class="hljs-comment">// 规定属性的类型，且规定为必传字段</span>
}</code></pre>
<h2 id="articleHeader44">React 单向数据流</h2>
<ul>
<li><strong>React 中采用单项数据流</strong></li>
<li>数据流动方向：自上而下，也就是只能由父组件传递到子组件</li>
<li>数据都是由父组件提供的，子组件想要使用数据，都是从父组件中获取的</li>
<li>如果多个组件都要使用某个数据，最好将这部分共享的状态提升至他们最近的父组件当中进行管理</li>
<li><a href="https://discountry.github.io/react/docs/state-and-lifecycle.html" rel="nofollow noreferrer" target="_blank">单向数据流</a></li>
<li><a href="https://discountry.github.io/react/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">状态提升</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react中的单向数据流动：
1 数据应该是从上往下流动的，也就是由父组件将数据传递给子组件
2 数据应该是由父组件提供，子组件要使用数据的时候，直接从子组件中获取

在我们的评论列表案例中：数据是由CommentList组件（父组件）提供的
子组件 CommentItem 负责渲染评论列表，数据是由 父组件提供的
子组件 CommentForm 负责获取用户输入的评论内容，最终也是把用户名和评论内容传递给了父组件，由父组件负责处理这些数据（ 把数据交给 CommentItem 由这个组件负责渲染 ）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">react中的单向数据流动：
1 数据应该是从上往下流动的，也就是由父组件将数据传递给子组件
2 数据应该是由父组件提供，子组件要使用数据的时候，直接从子组件中获取

在我们的评论列表案例中：数据是由CommentList组件（父组件）提供的
子组件 CommentItem 负责渲染评论列表，数据是由 父组件提供的
子组件 CommentForm 负责获取用户输入的评论内容，最终也是把用户名和评论内容传递给了父组件，由父组件负责处理这些数据（ 把数据交给 CommentItem 由这个组件负责渲染 ）</code></pre>
<h3 id="articleHeader45">组件通讯</h3>
<ul>
<li>父 -&gt; 子：<code>props</code>
</li>
<li>子 -&gt; 父：父组件通过props传递回调函数给子组件，子组件调用函数将数据作为参数传递给父组件</li>
<li>兄弟组件：因为React是单向数据流，因此需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的props</li>
<li>React中的状态管理：  flux（提出状态管理的思想） -&gt; Redux -&gt; mobx</li>
<li>Vue中的状态管理：    Vuex</li>
<li>简单来说，就是统一管理了项目中所有的数据，让数据变的可控</li>
<li><a href="https://segmentfault.com/a/1190000006831820">组件通讯</a></li>
</ul>
<h3 id="articleHeader46">Context特性</h3>
<ul>
<li>
<p>注意：<strong>如果不熟悉React中的数据流，不推荐使用这个属性</strong></p>
<ul><li>这是一个实验性的API，在未来的React版本中可能会被更改</li></ul>
</li>
<li>作用：跨级传递数据（爷爷给孙子传递数据），避免向下每层手动地传递<code>props</code>
</li>
<li>说明：需要配合<code>PropTypes</code>类型限制来使用</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Grandfather extends React.Component {
  // 类型限制（必须），静态属性名称固定
  static childContextTypes = {
    color: PropTypes.string.isRequired
  }

  // 传递给孙子组件的数据
  getChildContext() {
    return {
      color: 'red'
    }
  }

  render() {
    return (
      <Father></Father>
    )
  }
}

class Child extends React.Component {
  // 类型限制，静态属性名字固定
  static contextTypes = {
    color: PropTypes.string
  }

  render() {
    return (
      // 从上下文对象中获取爷爷组件传递过来的数据
      <h1 style="{{" color: this.context.color "}}">爷爷告诉文字是红色的</h1>
    )
  }
}

class Father extends React.Component {
  render() {
    return (
      <Child></Child>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Grandfather</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 类型限制（必须），静态属性名称固定</span>
  <span class="hljs-keyword">static</span> childContextTypes = {
    <span class="hljs-attr">color</span>: PropTypes.string.isRequired
  }

  <span class="hljs-comment">// 传递给孙子组件的数据</span>
  getChildContext() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>
    }
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Father</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Father</span>&gt;</span></span>
    )
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 类型限制，静态属性名字固定</span>
  <span class="hljs-keyword">static</span> contextTypes = {
    <span class="hljs-attr">color</span>: PropTypes.string
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">// 从上下文对象中获取爷爷组件传递过来的数据</span>
      &lt;h1 style="{{" <span class="hljs-attr">color</span>: <span class="hljs-keyword">this</span>.context.color "}}"&gt;爷爷告诉文字是红色的&lt;<span class="hljs-regexp">/h1&gt;
    )
  }
}

class Father extends React.Component {
  render() {
    return (
      &lt;Child&gt;&lt;/</span>Child&gt;
    )
  }
}</code></pre>
<h2 id="articleHeader47">react-router</h2>
<ul>
<li><a href="https://reacttraining.com/react-router/" rel="nofollow noreferrer" target="_blank">react router 官网</a></li>
<li><a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">react router github</a></li>
<li>安装：<code>npm i -S react-router-dom</code>
</li>
</ul>
<h3 id="articleHeader48">基本概念说明</h3>
<ul><li>
<code>Router</code>组件本身只是一个容器，真正的路由要通过<code>Route组件</code>定义</li></ul>
<h3 id="articleHeader49">使用步骤</h3>
<ul>
<li>1 导入路由组件</li>
<li>
<p>2 使用 <code>&lt;Router&gt;&lt;/Router&gt;</code> 作为根容器，包裹整个应用（JSX）</p>
<ul><li>在整个应用程序中，只需要使用一次</li></ul>
</li>
<li>3 使用 <code>&lt;Link to="/movie"&gt;&lt;/Link&gt;</code> 作为链接地址，并指定<code>to</code>属性</li>
<li>4 使用 <code>&lt;Route path="/" compoent={Movie}&gt;&lt;/Route&gt;</code> 展示路由内容</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1 导入组件
import {
  HashRouter as Router,
  Link, Route
} from 'react-router-dom'

// 2 使用 <Router>
<Router>

    // 3 设置 Link
    <Menu.Item key=&quot;1&quot;><Link to=&quot;/&quot;>首页</Link></Menu.Item>
    <Menu.Item key=&quot;2&quot;><Link to=&quot;/movie&quot;>电影</Link></Menu.Item>
    <Menu.Item key=&quot;3&quot;><Link to=&quot;/about&quot;>关于</Link></Menu.Item>

    // 4 设置 Route
    // exact 表示：绝对匹配（完全匹配，只匹配：/）
    <Route exact path=&quot;/&quot; component={HomeContainer}></Route>
    <Route path=&quot;/movie&quot; component={MovieContainer}></Route>
    <Route path=&quot;/about&quot; component={AboutContainer}></Route>

</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1 导入组件</span>
<span class="hljs-keyword">import</span> {
  HashRouter <span class="hljs-keyword">as</span> Router,
  Link, Route
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>

<span class="hljs-comment">// 2 使用 &lt;Router&gt;</span>
&lt;Router&gt;

    <span class="hljs-comment">// 3 设置 Link</span>
    &lt;Menu.Item key=<span class="hljs-string">"1"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>&lt;/Menu.Item&gt;
    &lt;Menu.Item key="2"&gt;&lt;Link to="/movie"&gt;电影&lt;/Link&gt;&lt;/Menu.Item&gt;
    &lt;Menu.Item key="3"&gt;&lt;Link to="/about"&gt;关于&lt;/Link&gt;&lt;/Menu.Item&gt;

    // 4 设置 Route
    // exact 表示：绝对匹配（完全匹配，只匹配：/）
    &lt;Route exact path="/" component={HomeContainer}&gt;&lt;/Route&gt;
    &lt;Route path="/movie" component={MovieContainer}&gt;&lt;/Route&gt;
    &lt;Route path="/about" component={AboutContainer}&gt;&lt;/Route&gt;

&lt;/Router&gt;</code></pre>
<h3 id="articleHeader50">注意点</h3>
<ul>
<li>
<code>&lt;Router&gt;&lt;/Router&gt;</code>：作为整个组件的根元素，是路由容器，只能有一个唯一的子元素</li>
<li>
<code>&lt;Link&gt;&lt;/Link&gt;</code>：类似于vue中的<code>&lt;router-link&gt;&lt;/router-link&gt;</code>标签，<code>to</code> 属性指定路由地址</li>
<li>
<code>&lt;Route&gt;&lt;/Route&gt;</code>：类似于vue中的<code>&lt;router-view&gt;&lt;/router-view&gt;</code>，指定路由内容（组件）展示位置</li>
</ul>
<h3 id="articleHeader51">路由参数</h3>
<ul>
<li>配置：通过<code>Route</code>中的path属性来配置路由参数</li>
<li>获取：<code>this.props.match.params</code> 获取</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置路由参数
<Route path=&quot;/movie/:movieType&quot;></Route>

// 获取路由参数
const type = this.props.match.params.movieType" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 配置路由参数</span>
&lt;Route path=<span class="hljs-string">"/movie/:movieType"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></span>

<span class="hljs-comment">// 获取路由参数</span>
<span class="hljs-keyword">const</span> type = <span class="hljs-keyword">this</span>.props.match.params.movieType</code></pre>
<h3 id="articleHeader52">路由跳转</h3>
<ul>
<li><a href="https://reacttraining.com/react-router/web/api/history" rel="nofollow noreferrer" target="_blank">react router - history</a></li>
<li>
<code>history.push()</code> 方法用于在JS中实现页面跳转</li>
<li>
<code>history.go(-1)</code> 用来实现页面的前进（1）和后退(-1)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.props.history.push('/movie/movieDetail/' + movieId)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.props.history.push(<span class="hljs-string">'/movie/movieDetail/'</span> + movieId)</code></pre>
<h2 id="articleHeader53">fetch</h2>
<ul>
<li>作用：Fetch 是一个现代的概念, 等同于 XMLHttpRequest。它提供了许多与XMLHttpRequest相同的功能，但被设计成更具可扩展性和高效性。</li>
<li>
<code>fetch()</code> 方法返回一个<code>Promise</code>对象</li>
</ul>
<h3 id="articleHeader54">fetch 基本使用</h3>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Response" rel="nofollow noreferrer" target="_blank">fetch Response</a></li>
<li><a href="http://www.jianshu.com/p/ccf99a12faf1" rel="nofollow noreferrer" target="_blank">fetch 介绍</a></li>
<li><a href="http://www.jianshu.com/p/063f7e490e9a" rel="nofollow noreferrer" target="_blank">Javascript 中的神器——Promise</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  通过fetch请求回来的数据，是一个Promise对象.
  调用then()方法，通过参数response，获取到响应对象
  调用 response.json() 方法，解析服务器响应数据
  再次调用then()方法，通过参数data，就获取到数据了
*/
fetch('/api/movie/' + this.state.movieType)
  // response.json() 读取response对象，并返回一个被解析为JSON格式的promise对象
  .then((response) => response.json())
  // 通过 data 获取到数据
  .then((data) => {
    console.log(data);
    this.setState({
      movieList: data.subjects,
      loaing: false
    })
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
  通过fetch请求回来的数据，是一个Promise对象.
  调用then()方法，通过参数response，获取到响应对象
  调用 response.json() 方法，解析服务器响应数据
  再次调用then()方法，通过参数data，就获取到数据了
*/</span>
fetch(<span class="hljs-string">'/api/movie/'</span> + <span class="hljs-keyword">this</span>.state.movieType)
  <span class="hljs-comment">// response.json() 读取response对象，并返回一个被解析为JSON格式的promise对象</span>
  .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> response.json())
  <span class="hljs-comment">// 通过 data 获取到数据</span>
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">movieList</span>: data.subjects,
      <span class="hljs-attr">loaing</span>: <span class="hljs-literal">false</span>
    })
  })</code></pre>
<h2 id="articleHeader55">跨域获取数据的三种常用方式</h2>
<ul>
<li>1 JSONP</li>
<li>2 代理</li>
<li>3 CORS</li>
</ul>
<h3 id="articleHeader56">JSONP</h3>
<ul>
<li>安装：<code>npm i -S fetch-jsonp</code>
</li>
<li>利用<code>JSONP</code>实现跨域获取数据，只能获取GET请求</li>
<li><code>fetch-jsonp</code></li>
<li><a href="https://github.com/camsong/fetch-jsonp" rel="nofollow noreferrer" target="_blank">fetch-jsonp</a></li>
<li>限制：1 只能发送GET请求 2 需要服务端支持JSONP请求</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* movielist.js */
fetchJsonp('https://api.douban.com/v2/movie/in_theaters')
  .then(rep => rep.json())
  .then(data => { console.log(data) })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* movielist.js */</span>
fetchJsonp(<span class="hljs-string">'https://api.douban.com/v2/movie/in_theaters'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">rep</span> =&gt;</span> rep.json())
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(data) })</code></pre>
<h3 id="articleHeader57">代理</h3>
<ul>
<li>
<code>webpack-dev-server</code> 代理配置如下：</li>
<li>问题：webpack-dev-server 是开发期间使用的工具，项目上线了就不再使用 webpack-dev-server</li>
<li>解决：项目上线后的代码，也是会部署到一个服务器中，这个服务器配置了代理功能即可（要求两个服务器中配置的代理规则相同）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack-dev-server的配置
devServer: {
  // https://webpack.js.org/configuration/dev-server/#devserver-proxy
  // https://github.com/chimurai/http-proxy-middleware#http-proxy-options
  // http://www.jianshu.com/p/3bdff821f859
  proxy: {
    // 使用：/api/movie/in_theaters
    // 访问 ‘/api/movie/in_theaters’ ==> 'https://api.douban.com/v2/movie/in_theaters'
    '/api': {
      // 代理的目标服务器地址
      target: 'https://api.douban.com/v2',
      // https请求需要该设置
      secure: false,
      // 必须设置该项
      changeOrigin: true,
      // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
      pathRewrite: {&quot;^/api&quot; : &quot;&quot;}
    }
  }
}

/* movielist.js */
fetch('/api/movie/in_theaters')
  .then(function(data) {
    // 将服务器返回的数据转化为 json 格式
    return data.json()
  })
  .then(function(rep) {
    // 获取上面格式化后的数据
    console.log(rep);
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack-dev-server的配置</span>
devServer: {
  <span class="hljs-comment">// https://webpack.js.org/configuration/dev-server/#devserver-proxy</span>
  <span class="hljs-comment">// https://github.com/chimurai/http-proxy-middleware#http-proxy-options</span>
  <span class="hljs-comment">// http://www.jianshu.com/p/3bdff821f859</span>
  proxy: {
    <span class="hljs-comment">// 使用：/api/movie/in_theaters</span>
    <span class="hljs-comment">// 访问 ‘/api/movie/in_theaters’ ==&gt; 'https://api.douban.com/v2/movie/in_theaters'</span>
    <span class="hljs-string">'/api'</span>: {
      <span class="hljs-comment">// 代理的目标服务器地址</span>
      target: <span class="hljs-string">'https://api.douban.com/v2'</span>,
      <span class="hljs-comment">// https请求需要该设置</span>
      secure: <span class="hljs-literal">false</span>,
      <span class="hljs-comment">// 必须设置该项</span>
      changeOrigin: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'</span>
      pathRewrite: {<span class="hljs-string">"^/api"</span> : <span class="hljs-string">""</span>}
    }
  }
}

<span class="hljs-comment">/* movielist.js */</span>
fetch(<span class="hljs-string">'/api/movie/in_theaters'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 将服务器返回的数据转化为 json 格式</span>
    <span class="hljs-keyword">return</span> data.json()
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">rep</span>) </span>{
    <span class="hljs-comment">// 获取上面格式化后的数据</span>
    <span class="hljs-built_in">console</span>.log(rep);
  })</code></pre>
<h3 id="articleHeader58">CORS - 服务器端配合</h3>
<ul>
<li>示例：NodeJS设置跨域</li>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解 - 阮一峰</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过Express的中间件来处理所有请求
app.use('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');

  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Accept,X-Requested-With');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'POST,GET');
  // next()方法表示进入下一个路由
  next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 通过Express的中间件来处理所有请求</span>
app.use(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-comment">// 设置请求头为允许跨域</span>
  res.header(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>);

  <span class="hljs-comment">// 设置服务器支持的所有头信息字段</span>
  res.header(<span class="hljs-string">'Access-Control-Allow-Headers'</span>, <span class="hljs-string">'Content-Type,Content-Length, Authorization,Accept,X-Requested-With'</span>);
  <span class="hljs-comment">// 设置服务器支持的所有跨域请求的方法</span>
  res.header(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'POST,GET'</span>);
  <span class="hljs-comment">// next()方法表示进入下一个路由</span>
  next();
});</code></pre>
<h2 id="articleHeader59">redux</h2>
<ul><li>状态管理工具，用来管理应用中的数据</li></ul>
<h3 id="articleHeader60">核心</h3>
<ul>
<li>
<p>Action：行为的抽象，视图中的每个用户交互都是一个action</p>
<ul><li>比如：点击按钮</li></ul>
</li>
<li>
<p>Reducer：行为响应的抽象，也就是：根据action行为，执行相应的逻辑操作，更新state</p>
<ul>
<li>比如：点击按钮后，添加任务，那么，添加任务这个逻辑放到 Reducer 中</li>
<li>1 创建State</li>
</ul>
</li>
<li>
<p>Store：</p>
<ul>
<li>1 <strong>Redux应用只能有一个store</strong>
</li>
<li>2 <code>getState()</code>：获取state</li>
<li>3 <code>dispatch(action)</code>：更新state</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* action */

// 在 redux 中，action 就是一个对象
// action 必须提供一个：type属性，表示当前动作的标识
// 其他的参数：表示这个动作需要用到的一些数据
{ type: 'ADD_TODO', name: '要添加的任务名称' }

// 这个动作表示要切换任务状态
{ type: 'TOGGLE_TODO', id: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* action */</span>

<span class="hljs-comment">// 在 redux 中，action 就是一个对象</span>
<span class="hljs-comment">// action 必须提供一个：type属性，表示当前动作的标识</span>
<span class="hljs-comment">// 其他的参数：表示这个动作需要用到的一些数据</span>
{ <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'要添加的任务名称'</span> }

<span class="hljs-comment">// 这个动作表示要切换任务状态</span>
{ <span class="hljs-attr">type</span>: <span class="hljs-string">'TOGGLE_TODO'</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* reducer */

// 第一个参数：表示状态（数据），我们需要给初始状态设置默认值
// 第二个参数：表示 action 行为
function todo(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      state.push({ id: Math.random(), name: action.name, completed: false })
      return state
    case 'TOGGLE_TODO':
      for(var i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          state[i].completed = !state[i].completed
          break
        }
      }
      return state
    default:
      return state
  }
}

// 要执行 ADD_TODO 这个动作：
dispatch( { type: 'ADD_TODO', name: '要添加的任务名称' } )

// 内部会调用 reducer
todo(undefined, { type: 'ADD_TODO', name: '要添加的任务名称' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* reducer */</span>

<span class="hljs-comment">// 第一个参数：表示状态（数据），我们需要给初始状态设置默认值</span>
<span class="hljs-comment">// 第二个参数：表示 action 行为</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todo</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      state.push({ <span class="hljs-attr">id</span>: <span class="hljs-built_in">Math</span>.random(), <span class="hljs-attr">name</span>: action.name, <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> })
      <span class="hljs-keyword">return</span> state
    <span class="hljs-keyword">case</span> <span class="hljs-string">'TOGGLE_TODO'</span>:
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; state.length; i++) {
        <span class="hljs-keyword">if</span> (state[i].id === action.id) {
          state[i].completed = !state[i].completed
          <span class="hljs-keyword">break</span>
        }
      }
      <span class="hljs-keyword">return</span> state
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">// 要执行 ADD_TODO 这个动作：</span>
dispatch( { <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'要添加的任务名称'</span> } )

<span class="hljs-comment">// 内部会调用 reducer</span>
todo(<span class="hljs-literal">undefined</span>, { <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'要添加的任务名称'</span> })</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React入门看这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000012921279](https://segmentfault.com/a/1190000012921279)

