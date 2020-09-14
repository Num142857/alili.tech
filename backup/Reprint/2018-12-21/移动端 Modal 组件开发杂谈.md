---
title: '移动端 Modal 组件开发杂谈' 
date: 2018-12-21 2:30:11
hidden: true
slug: dcyz88e783t
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://www.youzanyun.com/zanui/vant" rel="nofollow noreferrer" target="_blank">Vant</a> 是有赞开发的一套基于 <code>Vue 2.0</code> 的 <code>Mobile</code> 组件库，在开发的过程中也踩了很多坑，今天我们就来聊一聊开发一个移动端 Modal 组件（在有赞该组件被称为 <code>Popup</code> ）需要注意的一些<code>坑</code>。</p>
<p>在任何一个合格的UI组件库中，<code>Modal</code> 组件应该是必备的组件之一。它一般用于用户处理事物，但又不希望跳转页面时，可以使用 <code>Modal</code> 在当前页面中打开一个浮层，承载对应的操作。相比PC端，移动端的 <code>Modal</code> 组件坑会更多，比如滚动穿透问题就不像PC端在 <code>body</code> 上添加 <code>overflow: hidden</code> 那么简单。</p>
<h2 id="articleHeader0">目录</h2>
<p>一、API定义<br><br>二、水平垂直居中的方案<br><br>三、可恶的滚动穿透<br><br>四、<code>position: fixed</code> 失效</p>
<h2 id="articleHeader1">一、API定义</h2>
<p>任何一个组件开始编码前都需要首先将API先定义好，才好根据API来提供对应的功能。<code>Modal</code> 组件提供了以下API：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012506056?w=1303&amp;h=360" src="https://static.alili.tech/img/remote/1460000012506056?w=1303&amp;h=360" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>更具体的 Api 介绍可以访问该链接查看：<a href="https://www.youzanyun.com/zanui/vant#/zh-CN/component/popup" rel="nofollow noreferrer" target="_blank">Popup</a></p>
<h2 id="articleHeader2">二、水平垂直居中方案</h2>
<p>垂直居中的方案网上谷歌一下就能找到很多种，主流的方案有：</p>
<ol>
<li>absolute(fixed) + 负边距</li>
<li>absolute(fixed) + transform</li>
<li>flex</li>
<li>table + vertical-align</li>
</ol>
<p>首先说一下我们选择的是第二种：<code>absolute(fixed) + transform</code>，它是以上方案中最简单最方便的方案，代码实现量也很少。实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.modal</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p>但是 <code>transform</code> 会导致一个巨大的<code>坑</code>，这个<code>坑</code>的具体细节会在下面的章节中详细讲到。</p>
<p>说完了我们选择的方案，再来说说为啥不选择其他的方案呢？</p>
<p><strong>absolute(fixed) + 负边距</strong></p>
<p>只能适合定高的场景，果断抛弃。如果要实现不定高度就要通过JS来计算了，增加了实现的复杂度。</p>
<p><strong>flex</strong></p>
<p><code>flex</code> 布局一是在某些老版本的安卓浏览器上还不是很兼容，还有就是需要包裹一个父级才能水平垂直居中。</p>
<p><strong>table + vertical-middle</strong></p>
<p>在 <code>CSS2</code> 时代用这个方案来实现垂直居中是比较常见的方案，不足的地方就是代码实现量相对较大。</p>
<h2 id="articleHeader3">三、可恶的滚动穿透</h2>
<p>开发过移动端UI组件的都知道，在移动端有个可恶的滚动穿透问题。这个问题可以描述为：在弹窗上滑动会导致下层的页面跟着滚动。</p>
<p>网上谷歌一下<code>滚动穿透</code>关键字其实可以发现很多种解决方案，每个方案也各有优缺点，但我们选择的解决方案是团队的一姐一篇移动端体验优化的博文中得到的启示（博文地址：<a href="http://www.wytiny.com/2016/12/15/%E8%8A%B1%E5%BC%8F%E6%8F%90%E5%8D%87%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BA%A4%E4%BA%92%E4%BD%93%E9%AA%8C/" rel="nofollow noreferrer" target="_blank">花式提升移动端交互体验 | TinySymphony</a>）。</p>
<p>具体的思路是：当容器可以滑动时，若已经在顶部，禁止下滑；若在底部，禁止上滑；容器无法滚动时，禁止上下滑。实现的方式就是在 <code>document</code> 上监听 <code>touchstart</code> 和 <code>touchmove</code> 事件，如滑动时，祖先元素并没有可滑动元素，直接阻止冒泡即可；否则判断手指滑动的方向，若向下滑动，判断是否滑动到了滑动元素的底部，若已经到达底部，阻止冒泡，向上滑动也类似。具体的代码实现可以看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require('src/util')
export default function (option) {
  const scrollSelector = option.scroll || '.scroller'
  const pos = {
    x: 0,
    y: 0
  }

  function stopEvent (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function recordPosition (e) {
    pos.x = e.touches[0].clientX
    pos.y = e.touches[0].clientY
  }

  function watchTouchMove (e) {
    const target = e.target
    const parents = _.parents(target, scrollSelector)
    let el = null
    if (target.classList.contains(scrollSelector)) el = target
    else if (parents.length) el = parents[0]
    else return stopEvent(e)
    const dx = e.touches[0].clientX - pos.x
    const dy = e.touches[0].clientY - pos.y
    const direction = dy > 0 ? '10' : '01'
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const offsetHeight = el.offsetHeight
    const isVertical = Math.abs(dx) < Math.abs(dy)
    let status = '11'
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01'
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10'
    }
    if (status !== '11' &amp;&amp; isVertical &amp;&amp; !(parseInt(status, 2) &amp; parseInt(direction, 2))) return stopEvent(e)
  }
  document.addEventListener('touchstart', recordPosition, false)
  document.addEventListener('touchmove', watchTouchMove, false)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'src/util'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">option</span>) </span>{
  <span class="hljs-keyword">const</span> scrollSelector = option.scroll || <span class="hljs-string">'.scroller'</span>
  <span class="hljs-keyword">const</span> pos = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopEvent</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault()
    e.stopPropagation()
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recordPosition</span> (<span class="hljs-params">e</span>) </span>{
    pos.x = e.touches[<span class="hljs-number">0</span>].clientX
    pos.y = e.touches[<span class="hljs-number">0</span>].clientY
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watchTouchMove</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">const</span> target = e.target
    <span class="hljs-keyword">const</span> parents = _.parents(target, scrollSelector)
    <span class="hljs-keyword">let</span> el = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">if</span> (target.classList.contains(scrollSelector)) el = target
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (parents.length) el = parents[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> stopEvent(e)
    <span class="hljs-keyword">const</span> dx = e.touches[<span class="hljs-number">0</span>].clientX - pos.x
    <span class="hljs-keyword">const</span> dy = e.touches[<span class="hljs-number">0</span>].clientY - pos.y
    <span class="hljs-keyword">const</span> direction = dy &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'10'</span> : <span class="hljs-string">'01'</span>
    <span class="hljs-keyword">const</span> scrollTop = el.scrollTop
    <span class="hljs-keyword">const</span> scrollHeight = el.scrollHeight
    <span class="hljs-keyword">const</span> offsetHeight = el.offsetHeight
    <span class="hljs-keyword">const</span> isVertical = <span class="hljs-built_in">Math</span>.abs(dx) &lt; <span class="hljs-built_in">Math</span>.abs(dy)
    <span class="hljs-keyword">let</span> status = <span class="hljs-string">'11'</span>
    <span class="hljs-keyword">if</span> (scrollTop === <span class="hljs-number">0</span>) {
      status = offsetHeight &gt;= scrollHeight ? <span class="hljs-string">'00'</span> : <span class="hljs-string">'01'</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (scrollTop + offsetHeight &gt;= scrollHeight) {
      status = <span class="hljs-string">'10'</span>
    }
    <span class="hljs-keyword">if</span> (status !== <span class="hljs-string">'11'</span> &amp;&amp; isVertical &amp;&amp; !(<span class="hljs-built_in">parseInt</span>(status, <span class="hljs-number">2</span>) &amp; <span class="hljs-built_in">parseInt</span>(direction, <span class="hljs-number">2</span>))) <span class="hljs-keyword">return</span> stopEvent(e)
  }
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, recordPosition, <span class="hljs-literal">false</span>)
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, watchTouchMove, <span class="hljs-literal">false</span>)
}</code></pre>
<h2 id="articleHeader4">四、<code>position: fixed</code> 失效</h2>
<p>在前端工程师的世界观里，<code>position: fixed</code> 一直是相对浏览器视口来定位的。有一天，你在固定定位元素的父元素上应用了 <code>transform</code> 属性，当你刷新浏览器想看看最新的页面效果时，你竟然发现固定定位的元素竟然相对于父元素来定位了。是不是感觉人生观都崩塌了。</p>
<p>这个问题，目前只在Chrome浏览器/FireFox浏览器下有。也有人给 <code>Chrome</code> 提bug：<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=20574&amp;desc=2" rel="nofollow noreferrer" target="_blank">Fixed-position element uses transformed ancestor as the container</a>，但至今尚未解决。</p>
<p>例如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  body {
    padding: 50px;
  }
  .demo {
    background: #ccc;
    height: 100px;
    transform: scale(1);
  }
  .fixed-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>

<div class=&quot;demo&quot;>
  <div class=&quot;fixed-box&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span>;
  }
  <span class="hljs-selector-class">.demo</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
  }
  <span class="hljs-selector-class">.fixed-box</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: red;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fixed-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>垂直居中方案 <code>position: fixed + transform</code> 的选择导致了 <code>Modal</code> 组件使用上的一个坑。当我们在 <code>Modal</code> 组件里面嵌套了一个 <code>Modal</code> 时，内层的<code>Modal</code> 就是相对外层的 <code>Modal</code> 来定位，而不是浏览器的 viewport。这也限制了我们 <code>Modal</code> 的使用场景，如果你想实现嵌套的 <code>Modal</code>，就要选择其他的垂直居中方案了，有舍必有得嘛。</p>
<p>关于 <code>position: fixed</code> 失效的更多细节可以参考以下几篇博文：</p>
<ul>
<li><a href="http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/" rel="nofollow noreferrer" target="_blank">Eric’s Archived Thoughts:   Un-fixing Fixed Elements with CSS Transforms</a></li>
<li><a href="http://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/" rel="nofollow noreferrer" target="_blank">CSS3 transform对普通元素的N多渲染影响</a></li>
</ul>
<h2 id="articleHeader5">总结</h2>
<p>开发组件库不易，开发移动端组件库更不易。移动端组件库相对PC端会有更多的奇葩的坑。当遇到坑，肯定是要选择跨越它，而不是逃避它，因此也才有了我们这篇文章，后续我们也还会有一些介绍 <a href="https://www.youzanyun.com/zanui/vant" rel="nofollow noreferrer" target="_blank">Vant</a> 组件库开发过程中遇到的坑，或者一些优化相关的文章，敬请期待。</p>
<p>如果觉得这篇文章讲的还不够，完整源代码实现请移步Github：<a href="https://github.com/youzan/vant/tree/dev/packages/popup" rel="nofollow noreferrer" target="_blank">popup</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端 Modal 组件开发杂谈

## 原文链接
[https://segmentfault.com/a/1190000012506051](https://segmentfault.com/a/1190000012506051)

