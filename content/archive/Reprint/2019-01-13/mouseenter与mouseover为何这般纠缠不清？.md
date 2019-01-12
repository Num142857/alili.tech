---
title: 'mouseenter与mouseover为何这般纠缠不清？' 
date: 2019-01-13 2:30:11
hidden: true
slug: zcwkwo1l45q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><a href="https://github.com/qianlongo/zepto-analysis/issues/1" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p><a href="https://github.com/qianlongo/zepto-analysis" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<blockquote><p>不知道大家在面试或者工作过程中有没有被<code>mouseover</code>和<code>mouseenter</code>(对应的是<code>mouseout</code>和<code>mouseleave</code>)事件所困扰。自己之前在面试的时候就有被问到诸如mouseover和mouseenter事件的异同之类的问题？当时没有答出来，一直也对这两个事件有点模糊不清，趁着最近正在读<a href="https://github.com/qianlongo/zepto-analysis" rel="nofollow noreferrer" target="_blank">zepto源码</a>，准备写一篇这方面的文章，如果有错误，请大家指正。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667408?w=1563&amp;h=879" src="https://static.alili.tech/img/remote/1460000009667408?w=1563&amp;h=879" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&lt;!--more--&gt;</p>
<h2 id="articleHeader1">mouseenter与mouseover的异同？</h2>
<blockquote><p>要说清楚mouseenter与mouseover有什么不同，也许可以从两方面去讲。</p></blockquote>
<ol>
<li><p>是否支持冒泡</p></li>
<li><p>事件的触发时机</p></li>
</ol>
<p>先来看一张图,对这两个事件有一个简单直观的感受。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667409?w=1518&amp;h=1076" src="https://static.alili.tech/img/remote/1460000009667409?w=1518&amp;h=1076" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>再看看官网对mouseenter的解释</strong></p>
<p><a href="https://msdn.microsoft.com/en-us/library/ms536945(v=vs.85" rel="nofollow noreferrer" target="_blank">mouseenter | onmouseenter event</a>.aspx)</p>
<blockquote><p>The event fires only if the mouse pointer is outside the boundaries of the object and the user moves the mouse pointer inside the boundaries of the object. If the mouse pointer is currently inside the boundaries of the object, for the event to fire, the user must move the mouse pointer outside the boundaries of the object and then back inside the boundaries of the object.</p></blockquote>
<p>大概意思是说：当鼠标从元素的边界之外移入元素的边界之内时，事件被触发。而当鼠标本身在元素边界内时，要触发该事件，必须先将鼠标移出元素边界外，再次移入才能触发。(英语比较渣?，凑合看哈)</p>
<blockquote><p>Unlike the onmouseover event, the onmouseenter event does not bubble.</p></blockquote>
<p>大概意思是：和mouseover不同的是，mouseenter不支持事件冒泡 (英语比较渣?，凑合看哈)</p>
<p><strong>由于mouseenter不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其mouseover和mouseout事件，但是却不会触发mouseenter和mouseleave事件</strong></p>
<p>我们用一张动图来看看他们的区别(<a href="https://qianlongo.github.io/zepto-analysis/example/event/mouseEnter-mouseOver.html" rel="nofollow noreferrer" target="_blank">或者点击该链接体验</a>)。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667410?w=1219&amp;h=493" src="https://static.alili.tech/img/remote/1460000009667410?w=1219&amp;h=493" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们给左右两边的ul分别添加了<code>mouseover</code>和<code>mouseenter</code>事件，当鼠标进入左右两边的ul时，<code>mouseover</code>和<code>mouseenter</code>事件都触发了，但是当移入各自的子元素li的时候，触发了左边ul上的mouseover事件，然而右边ul的mouseenter事件没有被触发。</p>
<p>造成以上现象本质上是<code>mouseenter</code>事件不支持冒泡所致。</p>
<h2 id="articleHeader2">如何模拟mouseenter事件。</h2>
<blockquote><p>可见mouseover事件因其具有冒泡的性质，在子元素内移动的时候，频繁被触发，如果我们不希望如此，可以使用mouseenter事件代替之，但是早期只有ie浏览器支持该事件，虽然现在大多数高级浏览器都支持了mouseenter事件，但是难免会有些兼容问题，所以如果可以自己手动模拟，那就太好了。</p></blockquote>
<p>关键因素: <strong>relatedTarget</strong> 要想手动模拟mouseenter事件，需要对mouseover事件触发时的事件对象event属性relatedTarget了解。</p>
<ol>
<li><p>relatedTarget事件属性返回与事件的目标节点相关的节点。</p></li>
<li><p>对于mouseover事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。</p></li>
<li><p>对于mouseout事件来说，该属性是离开目标时，鼠标指针进入的节点。</p></li>
<li><p>对于其他类型的事件来说，这个属性没有用。</p></li>
</ol>
<p>重新回顾一下文章最初的那张图，根据上面的解释，对于ul上添加的mouseover事件来说，relatedTarget只可能是</p>
<ol>
<li><p>ul的父元素wrap(移入ul时,此时也是触发mouseenter事件的时候, <strong>其实不一定，后面会说明</strong>)，</p></li>
<li><p>或者ul元素本身(在其子元素上移出时)，</p></li>
<li><p>又或者是子元素本身(直接从子元素A移动到子元素B)。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667411?w=1680&amp;h=1156" src="https://static.alili.tech/img/remote/1460000009667411?w=1680&amp;h=1156" alt="relatedTarget" title="relatedTarget" style="cursor: pointer; display: inline;"></span></p>
<p>根据上面的描述，我们可以对relatedTarget的值进行判断：如果值不是目标元素，也不是目标元素的子元素，就说明鼠标已移入目标元素而不是在元素内部移动。</p>
<p>条件1： <strong>不是目标元素</strong>很好判断<code>e.relatedTarget !== target(目标元素)</code></p>
<p>条件2：不是目标元素的子元素，这个应该怎么判断呢？</p>
<h2 id="articleHeader3">ele.contains</h2>
<blockquote><p>这里需要介绍一个新的api [node.contains(otherNode)</p></blockquote>
<p>](<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)," rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a> 表示传入的节点是否为该节点的后代节点, 如果 otherNode 是 node 的后代节点或是 node 节点本身.则返回true , 否则返回 false</p>
<p><strong>用法案例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<ul class=&quot;list&quot;>
  <li class=&quot;item&quot;>1</li>
  <li>2</li>
</ul>
<div class=&quot;test&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let $list = document.querySelector('.list')
let $item = document.querySelector('.item')
let $test = document.querySelector('.test')

$list.contains($item) // true
$list.contains($test) // false
$list.contains($list) // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> $list = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.list'</span>)
<span class="hljs-keyword">let</span> $item = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.item'</span>)
<span class="hljs-keyword">let</span> $test = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test'</span>)

$list.contains($item) <span class="hljs-comment">// true</span>
$list.contains($test) <span class="hljs-comment">// false</span>
$list.contains($list) <span class="hljs-comment">// true</span>
</code></pre>
<p>那么利用contains这个api我们便可以很方便的验证条件2，接下来我们封装一个<code>contains(parent, node)</code>函数，专门用来判断<code>node</code>是不是<code>parent</code>的子节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let contains = function (parent, node) {
  return parent !== node &amp;&amp; parent.contains(node)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> contains = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, node</span>) </span>{
  <span class="hljs-keyword">return</span> parent !== node &amp;&amp; parent.contains(node)
}

</code></pre>
<p>用我们封装过后的<code>contains</code>函数再去试试上面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="contains($list, $item) // true
contains($list, $test) // false
contains($list, $list) // false (主要区别在这里)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">contains($list, $item) <span class="hljs-comment">// true</span>
contains($list, $test) <span class="hljs-comment">// false</span>
contains($list, $list) <span class="hljs-comment">// false (主要区别在这里)</span>
</code></pre>
<p>这个方法很方便地帮助我们解决了模拟mouseenter事件中的条件2，但是悲催的<code>ode.contains(otherNode)</code>,具有浏览器兼容性，在一些低级浏览器中是不支持的，为了做到兼容我们再来改写一下contains方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let contains = docEle.contains ? function (parent, node) {
  return parent !== node &amp;&amp; parent.contains(node)
} : function (parent, node) {
  let result = parent !== node

  if (!result) { // 排除parent与node传入相同的节点
    return result
  }

  if (result) {
    while (node &amp;&amp; (node = node.parentNode)) {
      if (parent === node) {
        return true
      }
    }
  }

  return false
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> contains = docEle.contains ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, node</span>) </span>{
  <span class="hljs-keyword">return</span> parent !== node &amp;&amp; parent.contains(node)
} : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, node</span>) </span>{
  <span class="hljs-keyword">let</span> result = parent !== node

  <span class="hljs-keyword">if</span> (!result) { <span class="hljs-comment">// 排除parent与node传入相同的节点</span>
    <span class="hljs-keyword">return</span> result
  }

  <span class="hljs-keyword">if</span> (result) {
    <span class="hljs-keyword">while</span> (node &amp;&amp; (node = node.parentNode)) {
      <span class="hljs-keyword">if</span> (parent === node) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
</code></pre>
<p>说了这么多，我们来看看用<code>mouseover</code>事件模拟<code>mouseenter</code>的最终代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// callback表示如果执行mouseenter事件时传入的回调函数

let emulateEnterOrLeave = function (callback) {
  return function (e) {
    let relatedTarget = e.relatedTarget
    if (relatedTarget !== this &amp;&amp; !contains(this, relatedTarget)) {
      callback.apply(this, arguments)
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// callback表示如果执行mouseenter事件时传入的回调函数</span>

<span class="hljs-keyword">let</span> emulateEnterOrLeave = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">let</span> relatedTarget = e.relatedTarget
    <span class="hljs-keyword">if</span> (relatedTarget !== <span class="hljs-keyword">this</span> &amp;&amp; !contains(<span class="hljs-keyword">this</span>, relatedTarget)) {
      callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
    }
  }
}
</code></pre>
<p><strong>模拟mouseenter与原生mouseenter事件效果对比</strong></p>
<p><code>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrap&quot;>
  wrap, mouseenter
  <ul class=&quot;mouseenter list&quot;>
    count: <span class=&quot;count&quot;></span>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>

<div class=&quot;wrap&quot;>
  wrap, emulate mouseenter,用mouseover模拟实现mouseenter
  <ul class=&quot;emulate-mouseenter list&quot;>
    count: <span class=&quot;count&quot;></span>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
  wrap, mouseenter
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouseenter list"</span>&gt;</span>
    count: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
  wrap, emulate mouseenter,用mouseover模拟实现mouseenter
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emulate-mouseenter list"</span>&gt;</span>
    count: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><code>css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap{
  width: 50%;
  box-sizing: border-box;
  float: left;
}

.wrap, .list{
  border: solid 1px green;
  padding: 30px;
  margin: 30px 0;
}

.list{
  border: solid 1px red;
}

.list li{
  border: solid 1px blue;
  padding: 10px;
  margin: 10px;
}

.count{
  color: red;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="s"><span class="hljs-selector-class">.wrap</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">float</span>: left;
}

<span class="hljs-selector-class">.wrap</span>, <span class="hljs-selector-class">.list</span>{
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> green;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.list</span>{
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
}

<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span>{
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> blue;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.count</span>{
  <span class="hljs-attribute">color</span>: red;
}
</code></pre>
<p><code>javascript</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let $mouseenter = document.querySelector('.mouseenter')
let $emulateMouseenter = document.querySelector('.emulate-mouseenter')
let $enterCount = document.querySelector('.mouseenter .count')
let $emulateMouseenterCounter = document.querySelector('.emulate-mouseenter .count')

let addCount = function (ele, start) {
  return function () {
    ele.innerHTML = ++start
  }
}

let docEle = document.documentElement
  let contains = docEle.contains ? function (parent, node) {
    return parent !== node &amp;&amp; parent.contains(node)
  } : function (parent, node) {
  let result = parent !== node

  if (!result) {
    return result
  }

  if (result) {
    while (node &amp;&amp; (node = node.parentNode)) {
      if (parent === node) {
        return true
      }
    }
  }

  return false
}

let emulateMouseenterCallback = addCount($emulateMouseenterCounter, 0)
  
let emulateEnterOrLeave = function (callback) {
  return function (e) {
    let relatedTarget = e.relatedTarget
    if (relatedTarget !== this &amp;&amp; !contains(this, relatedTarget)) {
      callback.apply(this, arguments)
    }
  }
}

$mouseenter.addEventListener('mouseenter', addCount($enterCount, 0), false)
$emulateMouseenter.addEventListener('mouseover', emulateEnterOrLeave(emulateMouseenterCallback), false)  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> $mouseenter = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.mouseenter'</span>)
<span class="hljs-keyword">let</span> $emulateMouseenter = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.emulate-mouseenter'</span>)
<span class="hljs-keyword">let</span> $enterCount = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.mouseenter .count'</span>)
<span class="hljs-keyword">let</span> $emulateMouseenterCounter = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.emulate-mouseenter .count'</span>)

<span class="hljs-keyword">let</span> addCount = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ele, start</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ele.innerHTML = ++start
  }
}

<span class="hljs-keyword">let</span> docEle = <span class="hljs-built_in">document</span>.documentElement
  <span class="hljs-keyword">let</span> contains = docEle.contains ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, node</span>) </span>{
    <span class="hljs-keyword">return</span> parent !== node &amp;&amp; parent.contains(node)
  } : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, node</span>) </span>{
  <span class="hljs-keyword">let</span> result = parent !== node

  <span class="hljs-keyword">if</span> (!result) {
    <span class="hljs-keyword">return</span> result
  }

  <span class="hljs-keyword">if</span> (result) {
    <span class="hljs-keyword">while</span> (node &amp;&amp; (node = node.parentNode)) {
      <span class="hljs-keyword">if</span> (parent === node) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

<span class="hljs-keyword">let</span> emulateMouseenterCallback = addCount($emulateMouseenterCounter, <span class="hljs-number">0</span>)
  
<span class="hljs-keyword">let</span> emulateEnterOrLeave = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">let</span> relatedTarget = e.relatedTarget
    <span class="hljs-keyword">if</span> (relatedTarget !== <span class="hljs-keyword">this</span> &amp;&amp; !contains(<span class="hljs-keyword">this</span>, relatedTarget)) {
      callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
    }
  }
}

$mouseenter.addEventListener(<span class="hljs-string">'mouseenter'</span>, addCount($enterCount, <span class="hljs-number">0</span>), <span class="hljs-literal">false</span>)
$emulateMouseenter.addEventListener(<span class="hljs-string">'mouseover'</span>, emulateEnterOrLeave(emulateMouseenterCallback), <span class="hljs-literal">false</span>)  
</code></pre>
<p><strong>效果预览</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009670770?w=1217&amp;h=493" src="https://static.alili.tech/img/remote/1460000009670770?w=1217&amp;h=493" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/qianlongo/zepto-analysis/blob/master/example/event/emlateMouseenter.html" rel="nofollow noreferrer" target="_blank">详细代码点击</a></p>
<p><a href="https://qianlongo.github.io/zepto-analysis/example/event/emlateMouseenter.html" rel="nofollow noreferrer" target="_blank">代码示例点击</a></p>
<p><strong>好了，我们已经通过mouseove事件完整的模拟了mouseenter事件，但是反过头来看看</strong></p>
<p>对于ul上添加的mouseover事件来说，relatedTarget只可能是</p>
<ol>
<li><p>ul的父元素wrap(移入ul时,此时也是触发mouseenter事件的时候, <strong>其实不一定，后面会说明</strong>)，</p></li>
<li><p>或者ul元素本身(在其子元素上移出时)，</p></li>
<li><p>又或者是子元素本身(直接从子元素A移动到子元素B)。</p></li>
</ol>
<p>我们通过排查2和3，最后只留下1，也就是mouseenter与mouseover事件一起触发的时机。既然这样我们为什么不像这样判断呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.addEventListener('mouseover', function (e) {
  if (e.relatedTarget === this.parentNode) {
    // 执行mouseenter的回调要做的事情  
  }
}, false)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">target.addEventListener(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (e.relatedTarget === <span class="hljs-keyword">this</span>.parentNode) {
    <span class="hljs-comment">// 执行mouseenter的回调要做的事情  </span>
  }
}, <span class="hljs-literal">false</span>)

</code></pre>
<p>这样不是更加简单吗？，何必要折腾通过排查2和3来做？</p>
<p>原因是，target的父元素有一定的占位空间的时后，我们这样写是没有太大问题的，但是反之，这个时候<code>e.relatedTarget</code>就可能是target元素的父元素，又祖先元素中的某一个。我们无法准确判断e.relatedTarget到底是哪个元素。所以通过排除2和3应该是个更好的选择。</p>
<h2 id="articleHeader4">用mouseout模拟mouseleave事件</h2>
<blockquote><p>当mouseout被激活时，relatedTarget表示鼠标离开目标元素时，进入了哪个元素，我们同样可以对relatedTarget的值进行判断：如果值不是目标元素，也不是目标元素的子元素，就说明鼠标已移出目标元素</p></blockquote>
<p>我们同样可以用上面封装的函数完成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// callback表示如果执行mouseenter事件时传入的回调函数

let emulateEnterOrLeave = function (callback) {
  return function (e) {
    let relatedTarget = e.relatedTarget
    if (relatedTarget !== this &amp;&amp; !contains(this, relatedTarget)) {
      callback.apply(this, arguments)
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// callback表示如果执行mouseenter事件时传入的回调函数</span>

<span class="hljs-keyword">let</span> emulateEnterOrLeave = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">let</span> relatedTarget = e.relatedTarget
    <span class="hljs-keyword">if</span> (relatedTarget !== <span class="hljs-keyword">this</span> &amp;&amp; !contains(<span class="hljs-keyword">this</span>, relatedTarget)) {
      callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
    }
  }
}
</code></pre>
<p><a href="https://github.com/qianlongo/zepto-analysis/blob/master/example/event/mouseEnter-mouseOver.html" rel="nofollow noreferrer" target="_blank">详细代码点击</a></p>
<p><a href="https://qianlongo.github.io/zepto-analysis/example/event/mouseEnter-mouseOver.html" rel="nofollow noreferrer" target="_blank">代码示例点击</a></p>
<h2 id="articleHeader5">结尾</h2>
<blockquote><p>文中也许有些观点不够严谨，欢迎大家拍砖。</p></blockquote>
<p><a href="https://github.com/qianlongo/zepto-analysis/issues/1" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p><a href="https://github.com/qianlongo/zepto-analysis" rel="nofollow noreferrer" target="_blank">项目地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mouseenter与mouseover为何这般纠缠不清？

## 原文链接
[https://segmentfault.com/a/1190000009667405](https://segmentfault.com/a/1190000009667405)

