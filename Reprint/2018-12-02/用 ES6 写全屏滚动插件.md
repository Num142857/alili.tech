---
title: '用 ES6 写全屏滚动插件' 
date: 2018-12-02 2:30:15
hidden: true
slug: numg0r662kd
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章将介绍如何使用原生 JS （主要使用 ES6 语法）实现全屏滚动插件，兼容 IE 10+、手机触屏，Mac 触摸板优化，支持自定义页面动画，压缩后 gzip 文件只有 2.15KB。完整源码在这 <a href="https://github.com/xiaogliu/pure_full_page" rel="nofollow noreferrer" target="_blank">pure_full_page</a>，点这查看 <a href="https://xiaogliu.github.io/pure_full_page/index.html" rel="nofollow noreferrer" target="_blank">demo</a>。</p>
<h2 id="articleHeader0">1）前面的话</h2>
<p>现在已经有很多全屏滚动插件了，比如著名的 <a href="https://github.com/alvarotrigo/fullPage.js" rel="nofollow noreferrer" target="_blank">fullPage</a>，那为什么还要自己造轮子呢？</p>
<p>现有轮子有以下问题：</p>
<ul>
<li>首先，最大的问题是最流行的几个插件都依赖 jQuery，这意味着在使用 React 或者 Vue 的项目中使用他们是一件十分蛋疼的事：我只需要一个全屏滚动功能，却还需要把 jQuery 引入，有种杀鸡使用宰牛刀的感觉；</li>
<li>其次，现有的很多全屏滚动插件功能往往都十分丰富，这在前几年是优势，但现在（2018-5）可以看作是劣势：前端开发已经发生了很大变化，其中很重要的一个变化是 ES6 原生支持模块化开发，模块化开发最大的特点是一个模块最好只专注做好一件事，然后再拼成一个完整的系统，从这个角度看，大而全的插件有悖模块化开发的原则。</li>
</ul>
<p>对比之下，通过原生语言造轮子有以下好处：</p>
<ul>
<li>使用原生语言编写的插件，自身不会受依赖的插件的使用场景而影响自身的使用（现在依赖 jQuery 的插件非常不适合开发单页面应用），所以使用上更加灵活；</li>
<li>搭配模块化开发，使用原生语言开发的插件可以只专注一个功能，所以代码量可以很少；</li>
<li>最后，随着 JS/CSS/HTML 的发展以及浏览器不断迭代更新，现在使用原生语言编写插件的开发成本越来越低，那为什么不呢？</li>
</ul>
<h2 id="articleHeader1">2）实现原理及代码架构</h2>
<h3 id="articleHeader2">2.1 实现原理</h3>
<p>实现原理见下图：容器及容器内的页面取当前可视区高度，同时容器的父级元素 <code>overflow</code> 属性值设为 <code>hidden</code>，通过更改容器 <code>top</code> 值实现全屏滚动效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014684363?w=562&amp;h=559" src="https://static.alili.tech/img/remote/1460000014684363?w=562&amp;h=559" alt="全屏滚动实现原理" title="全屏滚动实现原理" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">2.2 代码架构</h3>
<p>代码编写的思路是通过 class 定义全屏滚动类，使用时通过 <code>new PureFullPage().init()</code> 使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 全屏滚动类
 */
class PureFullPage {
  // 构造函数
  constructor() {}

  // 原型方法
  methods() {}

  // 初始化函数
  init() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 全屏滚动类
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PureFullPage</span> </span>{
  <span class="hljs-comment">// 构造函数</span>
  <span class="hljs-keyword">constructor</span>() {}

  <span class="hljs-comment">// 原型方法</span>
  methods() {}

  <span class="hljs-comment">// 初始化函数</span>
  init() {}
}</code></pre>
<h2 id="articleHeader4">3）html 结构</h2>
<p>鉴于上述实现原理，对于 html 的结构有特定要求，如下：页面容器为 <code>#pureFullPageContainer</code>，所有的页面为其直接子元素，这里为了方便，直接取 <code>body</code> 为其直接父元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div id=&quot;pureFullPageContainer&quot;>
    <div class=&quot;page&quot;></div>
    <div class=&quot;page&quot;></div>
    <div class=&quot;page&quot;></div>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pureFullPageContainer"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader5">4）css 设置</h2>
<p>首先，容器及容器内的页面取当前可视区高度，为每次切换都显示一个完整的页面做准备；</p>
<p>第二，容器的父级元素（此处是 <code>body</code>） <code>overflow</code> 属性值定为 <code>hidden</code>，这样可以保证每次只会显示一个页面，其他页面被隐藏。</p>
<p>经过上述设置，对容器 <code>top</code> 值，每次更改一个可视区高度的距离，便实现了页面间的切换，部分代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  /* body 为容器直接的父元素 */
  overflow: hidden;
}

#pureFullPage {
  /* 只有当 position 的值不是 static 时，top 值才有效 */
  position: relative;
  /* 设置初始值 */
  top: 0;
}
.page {
  /* 此处不能为 100vh，后面详述 */
  /* 其父元素，也就是 #pureFullPage 的高度，通过 js 动态设置*/
  height: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-comment">/* body 为容器直接的父元素 */</span>
  <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-id">#pureFullPage</span> {
  <span class="hljs-comment">/* 只有当 position 的值不是 static 时，top 值才有效 */</span>
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-comment">/* 设置初始值 */</span>
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.page</span> {
  <span class="hljs-comment">/* 此处不能为 100vh，后面详述 */</span>
  <span class="hljs-comment">/* 其父元素，也就是 #pureFullPage 的高度，通过 js 动态设置*/</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p>Notice：</p>
<ul>
<li>容器的 <code>position</code> 属性值需要设置为 <code>relative</code>，因为 <code>top</code> 只有在 <code>position</code> 属性值不为 <code>static</code> 时才有效；</li>
<li>页面高度需设置为当前可视区高度，但不能直接设置为 <code>100vh</code>，因为 safari 手机浏览器把地址栏算进去计算 <code>100vh</code>，但地址栏下面的不应该算做“可视区”，毕竟实际上是“看不见”的区域。这会导致 <code>100vh</code> 对应的像素值比 <code>document.documentElement.clientHeight</code> 获取的像素值大。这样在切换 <code>top</code> 值时就不是全屏切换了，实际上，这种情况下切换的高度小于页面的高度。</li>
<li>解决 safari 手机浏览器可视区高度问题：既然通过 js 获取的 <code>document.documentElement.clientHeight</code> 值是符合预期的可视区高度（不包括顶部地址栏和底部工具栏），那就<strong>将该值通过 js 设置为容器的高度，同时，容器内的页面高度设置为 <code>100%</code></strong>，这样就可以保证容器及页面的高度和切换 <code>top</code> 值相同了，也就保证了全屏切换。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 伪代码
'#pureFullPage'.style.height = document.documentElement.clientHeight + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 伪代码</span>
<span class="hljs-string">'#pureFullPage'</span>.style.height = <span class="hljs-built_in">document</span>.documentElement.clientHeight + <span class="hljs-string">'px'</span>;</code></pre>
<h2 id="articleHeader6">5）监控滚动/滑动事件</h2>
<p>这里的滚动/滑动事件包括鼠标滚动、触摸板滑动以及手机屏幕上下滑动。</p>
<h3 id="articleHeader7">5.1 PC 端</h3>
<p>PC 端主要解决的问题是获取鼠标滚动或触摸板滑动方向，触摸板上下滑动和鼠标滚动绑定的是同一个事件：</p>
<ul>
<li>firefox 是 <code>DOMMouseScroll</code> 事件，对应的滚轮信息（向前滚还是向后滚）存储在 <code>detail</code> 属性中，向前滚，这个属性值是 3 的倍数，反之，是 -3 的倍数；</li>
<li>firefox 之外的其他浏览器是 <code>mousewheel</code> 事件，对应的滚轮信息存储在 <code>wheelDelta</code> 属性中，向前滚，这个属性值是 -120 的倍数，反之， 120 的倍数。</li>
</ul>
<blockquote>macOS 如此，windows 相反？</blockquote>
<p>所以，可以通过 <code>detail</code> 或 <code>wheelDelta</code> 的值判断鼠标的滚动方向，进而控制页面是向上还是向下滚动。在这里我们只关心正负，不关心具体值的大小，为了便于使用，下面基于这两个事件封装了一个函数：如果鼠标往前滚动，返回负数，反之，返回正数，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 鼠标滚轮事件
getWheelDelta(event) {
  if (event.wheelDelta) {
    return event.wheelDelta;
  } else {
    // 兼容火狐
    return -event.detail;
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 鼠标滚轮事件</span>
getWheelDelta(event) {
  <span class="hljs-keyword">if</span> (event.wheelDelta) {
    <span class="hljs-keyword">return</span> event.wheelDelta;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 兼容火狐</span>
    <span class="hljs-keyword">return</span> -event.detail;
  }
},</code></pre>
<p>有了滚动事件，就可以据此编写页面向上或者向下滚动的回调函数了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 鼠标滚动逻辑（全屏滚动关键逻辑）
scrollMouse(event) {
  let delta = utils.getWheelDelta(event);
  // delta < 0，鼠标往前滚动，页面向下滚动
  if (delta < 0) {
    this.goDown();
  } else {
    this.goUp();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 鼠标滚动逻辑（全屏滚动关键逻辑）</span>
scrollMouse(event) {
  <span class="hljs-keyword">let</span> delta = utils.getWheelDelta(event);
  <span class="hljs-comment">// delta &lt; 0，鼠标往前滚动，页面向下滚动</span>
  <span class="hljs-keyword">if</span> (delta &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">this</span>.goDown();
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.goUp();
  }
}</code></pre>
<p><code>goDown</code>、<code>goUp</code> 是页面滚动的逻辑代码，需要特别说明的是必须 <strong>判断滚动边界，保证容器中显示的始终是页面内容</strong>：</p>
<ul>
<li>上边界容易确定，为 1 个页面（也即可视区）的高度，即如果容器当前的上外边框距离整个页面顶部的距离（这里此值正是容器的 <code>offsetTop</code> 值的绝对值，因为它父元素的 <code>offsetTop</code> 值都是 <code>0</code>）大于等于当前可视区高度时，才允许向上滚动，不然，就证明上面已经没有页面了，不允许继续向上滚动；</li>
<li>下边界为 <code>n - 2</code>（n 表示全屏滚动的页面数） 个可视区的高度，当容器的 <code>offsetTop</code> 值的绝对值小于等于 <code>n - 2</code> 个可视区的高度时，表示还可以向下滚动一个页面。</li>
</ul>
<p>具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="goUp() {
  // 只有页面顶部还有页面时页面向上滚动
  if (-this.container.offsetTop >= this.viewHeight) {
    // 重新指定当前页面距视图顶部的距离 currentPosition，实现全屏滚动，
    // currentPosition 为负值，越大表示超出顶部部分越少
    this.currentPosition = this.currentPosition + this.viewHeight;

    this.turnPage(this.currentPosition);
  }
}
goDown() {
  // 只有页面底部还有页面时页面向下滚动
  if (-this.container.offsetTop <= this.viewHeight * (this.pagesNum - 2)) {
    // 重新指定当前页面距视图顶部的距离 currentPosition，实现全屏滚动，
    // currentPosition 为负值，越小表示超出顶部部分越多
    this.currentPosition = this.currentPosition - this.viewHeight;

    this.turnPage(this.currentPosition);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">goUp() {
  <span class="hljs-comment">// 只有页面顶部还有页面时页面向上滚动</span>
  <span class="hljs-keyword">if</span> (-<span class="hljs-keyword">this</span>.container.offsetTop &gt;= <span class="hljs-keyword">this</span>.viewHeight) {
    <span class="hljs-comment">// 重新指定当前页面距视图顶部的距离 currentPosition，实现全屏滚动，</span>
    <span class="hljs-comment">// currentPosition 为负值，越大表示超出顶部部分越少</span>
    <span class="hljs-keyword">this</span>.currentPosition = <span class="hljs-keyword">this</span>.currentPosition + <span class="hljs-keyword">this</span>.viewHeight;

    <span class="hljs-keyword">this</span>.turnPage(<span class="hljs-keyword">this</span>.currentPosition);
  }
}
goDown() {
  <span class="hljs-comment">// 只有页面底部还有页面时页面向下滚动</span>
  <span class="hljs-keyword">if</span> (-<span class="hljs-keyword">this</span>.container.offsetTop &lt;= <span class="hljs-keyword">this</span>.viewHeight * (<span class="hljs-keyword">this</span>.pagesNum - <span class="hljs-number">2</span>)) {
    <span class="hljs-comment">// 重新指定当前页面距视图顶部的距离 currentPosition，实现全屏滚动，</span>
    <span class="hljs-comment">// currentPosition 为负值，越小表示超出顶部部分越多</span>
    <span class="hljs-keyword">this</span>.currentPosition = <span class="hljs-keyword">this</span>.currentPosition - <span class="hljs-keyword">this</span>.viewHeight;

    <span class="hljs-keyword">this</span>.turnPage(<span class="hljs-keyword">this</span>.currentPosition);
  }
}</code></pre>
<p>最后添加滚动事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 鼠标滚轮监听，火狐鼠标滚动事件不同其他
if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
  document.addEventListener('mousewheel', scrollMouse);
} else {
  document.addEventListener('DOMMouseScroll', scrollMouse);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 鼠标滚轮监听，火狐鼠标滚动事件不同其他</span>
<span class="hljs-keyword">if</span> (navigator.userAgent.toLowerCase().indexOf(<span class="hljs-string">'firefox'</span>) === <span class="hljs-number">-1</span>) {
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousewheel'</span>, scrollMouse);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMMouseScroll'</span>, scrollMouse);
}</code></pre>
<h3 id="articleHeader8">5.2 移动端</h3>
<p>移动端需要判断是向上还是向下滑动，可以结合 <code>touchstart</code>（手指开始接触屏幕时触发） 和 <code>touchend</code>（手指离开屏幕时触发） 两个事件实现判断：分别获取两个事件开始触发时的 <code>pageY</code> 值，如果触摸结束时的 <code>pageY</code> 大于触摸开始时的 <code>pageY</code>，表示手指向下滑动，对应页面向上滚动，反之亦然。</p>
<p>此处我们需要触摸事件跟踪触摸的属性：</p>
<ul>
<li>
<code>touches</code>：当前跟踪的触摸操作的 Touch 对象的数组，用于获取触摸开始时的 <code>pageY</code> 值；</li>
<li>
<code>changeTouches</code>：自上次触摸以来发生了改变的 Touch 对象的数组，用于获取触摸触摸结束时的 <code>pageY</code> 值。</li>
</ul>
<p>相关代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 手指接触屏幕
document.addEventListener('touchstart', event => {
  this.startY = event.touches[0].pageY;
});
//手指离开屏幕
document.addEventListener('touchend', event => {
  let endY = event.changedTouches[0].pageY;
  if (endY - this.startY < 0) {
    // 手指向上滑动，对应页面向下滚动
    this.goDown();
  } else {
    // 手指向下滑动，对应页面向上滚动
    this.goUp();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 手指接触屏幕</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, event =&gt; {
  <span class="hljs-keyword">this</span>.startY = event.touches[<span class="hljs-number">0</span>].pageY;
});
<span class="hljs-comment">//手指离开屏幕</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchend'</span>, event =&gt; {
  <span class="hljs-keyword">let</span> endY = event.changedTouches[<span class="hljs-number">0</span>].pageY;
  <span class="hljs-keyword">if</span> (endY - <span class="hljs-keyword">this</span>.startY &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 手指向上滑动，对应页面向下滚动</span>
    <span class="hljs-keyword">this</span>.goDown();
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 手指向下滑动，对应页面向上滚动</span>
    <span class="hljs-keyword">this</span>.goUp();
  }
});</code></pre>
<p>为了避免下拉刷新，可以阻止 <code>touchmove</code> 事件的默认行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 阻止 touchmove 下拉刷新
document.addEventListener('touchmove', event => {
  event.preventDefault();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 阻止 touchmove 下拉刷新</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, event =&gt; {
  event.preventDefault();
});</code></pre>
<h2 id="articleHeader9">6）PC 端滚动事件性能优化</h2>
<h3 id="articleHeader10">6.1 防抖函数和截流函数介绍</h3>
<p>优化主要从两方便入手：</p>
<ul>
<li>更改页面大小时，通过防抖动（debounce）函数限制 <code>resize</code> 事件触发频率；</li>
<li>滚动/滑动事件触发时，通过截流（throttle）函数限制滚动/滑动事件触发频率。</li>
</ul>
<p>既然都是限制触发频率（都通过定时器实现），那这两者有什么区别？</p>
<p>首先，防抖动函数工作时，如果在指定的延迟时间内，某个事件连续触发，那么绑定在这个事件上的回调函数永远不会触发，只有在延迟时间内，这个事件没再触发，对应的回调函数才会执行。防抖动函数非常适合改变窗口大小这一事件，这也符合 <em>拖动到位以后再触发事件，如果一直拖个不停，始终不触发事件</em> 这一直觉。</p>
<p>而截流函数是在延迟时间内，绑定到事件上的回调函数能且只能触发一次，这和截流函数不同，即便是在延迟时间内连续触发事件，也不会阻止在延迟时间内有一个回调函数执行。并且截流函数允许我们指定回调函数是在延迟时间开始时还是结束时执行。</p>
<p>鉴于截流函数的上述两个特性，尤其适合优化滚动/滑动事件：</p>
<ul>
<li>可以限制频率；</li>
<li>不会因为滚动/滑动事件太灵敏（在延迟时间内不断触发）导致注册在事件上的回调函数无法执行；</li>
<li>可以设置在延迟时间开始时触发回调函数，从而避免用户感到操作之后的短暂延时。</li>
</ul>
<p>这里不介绍防抖动函数和截流函数的实现原理，感兴趣的可以看<a href="https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf" rel="nofollow noreferrer" target="_blank">Throttling and Debouncing in JavaScript</a>，下面是实现的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 防抖动函数，method 回调函数，context 上下文，event 传入的时间，delay 延迟函数
debounce(method, context, event, delay) {
  clearTimeout(method.tId);
  method.tId = setTimeout(() => {
    method.call(context, event);
  }, delay);
},

// 截流函数，method 回调函数，context 上下文，delay 延迟函数，
// 这里没有提供是在延迟时间开始还是结束的时候执行回调函数的选项，
// 直接在延迟时间开始的时候执行回调
throttle(method, context, delay) {
  let wait = false;
  return function() {
    if (!wait) {
      method.apply(context, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 防抖动函数，method 回调函数，context 上下文，event 传入的时间，delay 延迟函数</span>
debounce(method, context, event, delay) {
  clearTimeout(method.tId);
  method.tId = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    method.call(context, event);
  }, delay);
},

<span class="hljs-comment">// 截流函数，method 回调函数，context 上下文，delay 延迟函数，</span>
<span class="hljs-comment">// 这里没有提供是在延迟时间开始还是结束的时候执行回调函数的选项，</span>
<span class="hljs-comment">// 直接在延迟时间开始的时候执行回调</span>
throttle(method, context, delay) {
  <span class="hljs-keyword">let</span> wait = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!wait) {
      method.apply(context, <span class="hljs-built_in">arguments</span>);
      wait = <span class="hljs-literal">true</span>;
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        wait = <span class="hljs-literal">false</span>;
      }, delay);
    }
  };
},</code></pre>
<blockquote>《JavaScript 高级程序设计 - 第三版》 22.33.3 节中介绍的 throttle 函数和此处定义的不同，高程中定义的 throttle 函数对应此处的 debounce 函数，但网上大多数文章都和高程中的不同，比如 lodash 中定义的 <a href="https://lodash.com/docs/4.17.10#debounce" rel="nofollow noreferrer" target="_blank">debounce</a>。</blockquote>
<h3 id="articleHeader11">6.2 改造 PC 端滚动事件</h3>
<p>通过上述说明，我们已经知道截流函数可以通过限定滚动事件触发频率提升性能，同时，设置在<strong>延迟时间开始阶段立即调用滚动事件的回调函数</strong>并不会牺牲用户体验。</p>
<p>截流函数上文已经定义好，使用起来就很简单了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置截流函数
let handleMouseWheel = utils.throttle(this.scrollMouse, this, this.DELAY, true);

// 鼠标滚轮监听，火狐鼠标滚动事件不同其他
if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
  document.addEventListener('mousewheel', handleMouseWheel);
} else {
  document.addEventListener('DOMMouseScroll', handleMouseWheel);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 设置截流函数</span>
<span class="hljs-keyword">let</span> handleMouseWheel = utils.throttle(<span class="hljs-keyword">this</span>.scrollMouse, <span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.DELAY, <span class="hljs-literal">true</span>);

<span class="hljs-comment">// 鼠标滚轮监听，火狐鼠标滚动事件不同其他</span>
<span class="hljs-keyword">if</span> (navigator.userAgent.toLowerCase().indexOf(<span class="hljs-string">'firefox'</span>) === <span class="hljs-number">-1</span>) {
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousewheel'</span>, handleMouseWheel);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMMouseScroll'</span>, handleMouseWheel);
}</code></pre>
<p>上面这部分代码是写在 class 的 <code>init</code> 方法中，所以截流函数的上下文（context）传入的是 <code>this</code>，表示当前 class 实例。</p>
<h2 id="articleHeader12">7）其他</h2>
<h3 id="articleHeader13">7.1 导航按钮</h3>
<p>为了简化 html 结构，导航按钮通过 js 创建。这里的难点在于<strong>如何实现点击不同按钮实现对应页面的跳转并更新对应按钮的样式</strong>。</p>
<p>解决的思路是：</p>
<ul>
<li>页面跳转：页面个数和导航按钮的个数一致，所以点击第 i 个按钮也就是跳转到第 i 个页面，而第 i 个页面对应的容器 <code>top</code> 值恰好是 <code>-(i * this.viewHeight)</code>
</li>
<li>更改样式：更改样式即先删除所有按钮的选中样式，然后给当前点击的按钮添加选中样式。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建右侧点式导航
createNav() {
  const nav = document.createElement('div');
  nav.className = 'nav';
  this.container.appendChild(nav);
  // 有几页，显示几个点
  for (let i = 0; i < this.pagesNum; i++) {
    nav.innerHTML += '<p class=&quot;nav-dot&quot;><span></span></p>';
  }
  const navDots = document.querySelectorAll('.nav-dot');
  this.navDots = Array.prototype.slice.call(navDots);
  // 添加初始样式
  this.navDots[0].classList.add('active');
  // 添加点式导航点击事件
  this.navDots.forEach((el, i) => {
    el.addEventListener('click', event => {
      // 页面跳转
      this.currentPosition = -(i * this.viewHeight);
      this.turnPage(this.currentPosition);
      // 更改样式
      this.navDots.forEach(el => {
        utils.deleteClassName(el, 'active');
      });
      event.target.classList.add('active');
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建右侧点式导航</span>
createNav() {
  <span class="hljs-keyword">const</span> nav = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
  nav.className = <span class="hljs-string">'nav'</span>;
  <span class="hljs-keyword">this</span>.container.appendChild(nav);
  <span class="hljs-comment">// 有几页，显示几个点</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.pagesNum; i++) {
    nav.innerHTML += <span class="hljs-string">'&lt;p class="nav-dot"&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;'</span>;
  }
  <span class="hljs-keyword">const</span> navDots = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.nav-dot'</span>);
  <span class="hljs-keyword">this</span>.navDots = <span class="hljs-built_in">Array</span>.prototype.slice.call(navDots);
  <span class="hljs-comment">// 添加初始样式</span>
  <span class="hljs-keyword">this</span>.navDots[<span class="hljs-number">0</span>].classList.add(<span class="hljs-string">'active'</span>);
  <span class="hljs-comment">// 添加点式导航点击事件</span>
  <span class="hljs-keyword">this</span>.navDots.forEach(<span class="hljs-function">(<span class="hljs-params">el, i</span>) =&gt;</span> {
    el.addEventListener(<span class="hljs-string">'click'</span>, event =&gt; {
      <span class="hljs-comment">// 页面跳转</span>
      <span class="hljs-keyword">this</span>.currentPosition = -(i * <span class="hljs-keyword">this</span>.viewHeight);
      <span class="hljs-keyword">this</span>.turnPage(<span class="hljs-keyword">this</span>.currentPosition);
      <span class="hljs-comment">// 更改样式</span>
      <span class="hljs-keyword">this</span>.navDots.forEach(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
        utils.deleteClassName(el, <span class="hljs-string">'active'</span>);
      });
      event.target.classList.add(<span class="hljs-string">'active'</span>);
    });
  });
}</code></pre>
<h3 id="articleHeader14">7.2 自定义参数</h3>
<p>得当的自定义参数可以增加插件的灵活性。</p>
<p>参数通过构造函数传入，并通过 <code>Object.assign()</code> 进行参数合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(options) {
  // 默认配置
  const defaultOptions = {
    isShowNav: true,
    delay: 150,
    definePages: () => {},
  };
  // 合并自定义配置
  this.options = Object.assign(defaultOptions, options);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(options) {
  <span class="hljs-comment">// 默认配置</span>
  <span class="hljs-keyword">const</span> defaultOptions = {
    <span class="hljs-attr">isShowNav</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">delay</span>: <span class="hljs-number">150</span>,
    <span class="hljs-attr">definePages</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
  };
  <span class="hljs-comment">// 合并自定义配置</span>
  <span class="hljs-keyword">this</span>.options = <span class="hljs-built_in">Object</span>.assign(defaultOptions, options);
}</code></pre>
<h3 id="articleHeader15">7.3 窗口尺寸改变时更新数据</h3>
<p>浏览器窗口尺寸改变的时候，需要重新获取可视区、页面元素高度，并重新确定容器当前的 <code>top</code> 值。</p>
<p>同时，为了避免不必要的性能开支，这里使用了防抖动函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// window resize 时重新获取位置
getNewPosition() {
  this.viewHeight = document.documentElement.clientHeight;
  this.container.style.height = this.viewHeight + 'px';
  let activeNavIndex;
  this.navDots.forEach((e, i) => {
    if (e.classList.contains('active')) {
      activeNavIndex = i;
    }
  });
  this.currentPosition = -(activeNavIndex * this.viewHeight);
  this.turnPage(this.currentPosition);
}

handleWindowResize(event) {
  // 设置防抖动函数
  utils.debounce(this.getNewPosition, this, event, this.DELAY);
}

// 窗口尺寸变化时重置位置
window.addEventListener('resize', this.handleWindowResize.bind(this));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// window resize 时重新获取位置</span>
getNewPosition() {
  <span class="hljs-keyword">this</span>.viewHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight;
  <span class="hljs-keyword">this</span>.container.style.height = <span class="hljs-keyword">this</span>.viewHeight + <span class="hljs-string">'px'</span>;
  <span class="hljs-keyword">let</span> activeNavIndex;
  <span class="hljs-keyword">this</span>.navDots.forEach(<span class="hljs-function">(<span class="hljs-params">e, i</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (e.classList.contains(<span class="hljs-string">'active'</span>)) {
      activeNavIndex = i;
    }
  });
  <span class="hljs-keyword">this</span>.currentPosition = -(activeNavIndex * <span class="hljs-keyword">this</span>.viewHeight);
  <span class="hljs-keyword">this</span>.turnPage(<span class="hljs-keyword">this</span>.currentPosition);
}

handleWindowResize(event) {
  <span class="hljs-comment">// 设置防抖动函数</span>
  utils.debounce(<span class="hljs-keyword">this</span>.getNewPosition, <span class="hljs-keyword">this</span>, event, <span class="hljs-keyword">this</span>.DELAY);
}

<span class="hljs-comment">// 窗口尺寸变化时重置位置</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, <span class="hljs-keyword">this</span>.handleWindowResize.bind(<span class="hljs-keyword">this</span>));</code></pre>
<h3 id="articleHeader16">7.4 兼容性</h3>
<p>这里的兼容性主要指两个方面：一是不同浏览器对同一行为定义了不同 API，比如上文提到的获取鼠标滚动信息的 API Firefox 和其他浏览器不一样；第二点就是 ES6 新语法、新 API 的兼容处理。</p>
<p>对于 class、箭头函数这类新语法的转换，通过 babel 就可完成，鉴于本插件代码量很小，都处于可控的状态，并没有引入 babel 提供的 polyfill 方案，因为新 API 只有 <code>Object.assign()</code> 需要做兼容处理，单独写个 polyfill 就好，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// polyfill Object.assign
polyfill() {
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        let to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          let nextSource = arguments[index];
          if (nextSource != null) {
            for (let nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// polyfill Object.assign</span>
polyfill() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.assign != <span class="hljs-string">'function'</span>) {
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">Object</span>, <span class="hljs-string">'assign'</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assign</span>(<span class="hljs-params">target, varArgs</span>) </span>{
        <span class="hljs-keyword">if</span> (target == <span class="hljs-literal">null</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot convert undefined or null to object'</span>);
        }
        <span class="hljs-keyword">let</span> to = <span class="hljs-built_in">Object</span>(target);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">1</span>; index &lt; <span class="hljs-built_in">arguments</span>.length; index++) {
          <span class="hljs-keyword">let</span> nextSource = <span class="hljs-built_in">arguments</span>[index];
          <span class="hljs-keyword">if</span> (nextSource != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> nextKey <span class="hljs-keyword">in</span> nextSource) {
              <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        <span class="hljs-keyword">return</span> to;
      },
      <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    });
  }
},</code></pre>
<p>引用自：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill" rel="nofollow noreferrer" target="_blank">MDN-Object.assign()</a></p>
<blockquote>因为本插件只兼容到 IE10，所以不打算对事件做兼容处理，毕竟 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Browser_compatibility" rel="nofollow noreferrer" target="_blank">IE9 都支持</a> <code>addEventListener</code> 了。</blockquote>
<h3 id="articleHeader17">7.5 通过惰性载入进一步优化性能</h3>
<p>在 5.1 中写的 <code>getWheelDelta</code> 函数每次执行都需要检测是否支持 <code>event.wheelDelta</code>，实际上，浏览器只需在第一次加载时检测，如果支持，接下来都会支持，再做检测是没必要的。</p>
<p>并且这个检测在页面的生命周期中会执行很多次，这种情况下可以通过 <em>惰性载入</em> 技巧进行优化，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getWheelDelta(event) {
  if (event.wheelDelta) {
    // 第一次调用之后惰性载入，无需再做检测
    this.getWheelDelta = event => event.wheelDelta;
    // 第一次调用使用
    return event.wheelDelta;
  } else {
    // 兼容火狐
    this.getWheelDelta = event => -event.detail;
    return -event.detail;
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getWheelDelta(event) {
  <span class="hljs-keyword">if</span> (event.wheelDelta) {
    <span class="hljs-comment">// 第一次调用之后惰性载入，无需再做检测</span>
    <span class="hljs-keyword">this</span>.getWheelDelta = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> event.wheelDelta;
    <span class="hljs-comment">// 第一次调用使用</span>
    <span class="hljs-keyword">return</span> event.wheelDelta;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 兼容火狐</span>
    <span class="hljs-keyword">this</span>.getWheelDelta = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> -event.detail;
    <span class="hljs-keyword">return</span> -event.detail;
  }
},</code></pre>
<p>完整源码在这 <a href="https://github.com/xiaogliu/pure_full_page" rel="nofollow noreferrer" target="_blank">pure_full_page</a>，点这查看 <a href="https://xiaogliu.github.io/pure_full_page/index.html" rel="nofollow noreferrer" target="_blank">demo</a>。</p>
<h2 id="articleHeader18">参考资料</h2>
<p><a href="https://blog.csdn.net/tangdou5682/article/details/52351404" rel="nofollow noreferrer" target="_blank">纯 JS 全屏滚动 / 整屏翻页</a>  <br><a href="https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf" rel="nofollow noreferrer" target="_blank">Throttling and Debouncing in JavaScript</a>  <br><a href="https://css-tricks.com/debouncing-throttling-explained-examples/" rel="nofollow noreferrer" target="_blank">Debouncing and Throttling Explained Through Examples</a>  <br><a href="https://davidwalsh.name/javascript-debounce-function" rel="nofollow noreferrer" target="_blank">JavaScript Debounce Function</a>  <br><a href="https://stackoverflow.com/questions/27078285/simple-throttle-in-js" rel="nofollow noreferrer" target="_blank">Simple throttle in js</a>  <br><a href="https://jsfiddle.net/jonathansampson/m7G64/" rel="nofollow noreferrer" target="_blank">Simple throttle in js - jsfiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="jonathansampson/m7G64/" data-typeid="0">点击预览</button>  <br><a href="https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html" rel="nofollow noreferrer" target="_blank">Viewport height is taller than the visible part of the document in some mobile browsers</a>  <br><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill" rel="nofollow noreferrer" target="_blank">MDN-Object.assign()</a>  <br><a href="https://www.zhihu.com/question/49382420" rel="nofollow noreferrer" target="_blank">Babel 编译出来还是 ES 6？难道只能上 polyfill？- Henry 的回答</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 ES6 写全屏滚动插件

## 原文链接
[https://segmentfault.com/a/1190000014683917](https://segmentfault.com/a/1190000014683917)

