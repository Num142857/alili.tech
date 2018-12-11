---
title: 'vuejs实现spa页面组件滑动特效' 
date: 2018-12-11 2:30:10
hidden: true
slug: 1pekfx88nim
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vuejs实现spa页面组件滑动特效</h1>
<h2 id="articleHeader1">写在前面的一些废话</h2>
<p>其实通过vuejs非常容易实现spa中路由的过渡效果，网上也有不少教程。但是考虑一下以下需求</p>
<ol>
<li>即将离开的组件和将要进入的组合同时出现在页面中</li>
<li>用手指拖动页面可以切换路由，而不仅仅是点击链接</li>
<li>结合以上两点，拖动过程中同时显示两个组件，手指离开屏幕后执行切换路由或者返回</li>
</ol>
<p>好像<del>也不是</del>很简单<br>最近几个<del>月</del>天在仿DiDi应用写一个web app，写到“顺风车”组件的时候发现在其组件下的两个子组件：<em>乘客组件</em>以及<em>车主组件</em>，他们的切换方式正是满足上面3点要求。好几番尝试后终于写出了满足要求的代码，来和小伙伴分享~</p>
<h2 id="articleHeader2">我是正文</h2>
<p>首先简单的过渡效果我就不多做介绍了。通过<code>vue</code>提供的<code>transition</code>组件，我们可以很容易的实现一个普通的动画效果。具体的可以参考<a href="https://cn.vuejs.org/v2/guide/transitions.html" rel="nofollow noreferrer" target="_blank">vuejs官方文档</a>。</p>
<h3 id="articleHeader3">Step 0</h3>
<p>我们先大致了解一下html结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content-wrapper&quot;>
  <!-- router-view指向组件driver和passenger -->
  <router-view class=&quot;content&quot;></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-wrapper"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- router-view指向组件driver和passenger --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader4">Step 1</h3>
<p>来实现第一个需求。<br>这个需求不难，分别给2个组件定义不同<code>transition</code>动画即可。<br>对于左边的passenger组件，他是从左边进入/离开的，相应的代码为<code>transform: translateX(-100%)</code>,同理对于右边的driver组件，相应代码为<code>transform: translateX(100%)</code>。<br>特别注意的是，需要对<code>router-view</code>添加一行css代码（写在<code>.content</code>中）<code>position: absolute</code>来使driver组件元素和passenger组件元素脱离文档流，否则达不到2个组件同时出现在页面中的效果。<br>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000013604311?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000013604311?w=376&amp;h=668" alt="效果图1" title="效果图1" style="cursor: pointer; display: inline;"></span><br>上一个touch事件完成后，已滑动距离。实际在这个设计里，因为我们手指离开后，页面不会停留在中间，不是滑过去切换路由，就是滑回去恢复原样。所以<code>currentDistance</code>并没有什么卵用，但是如果要<em>即停即走</em>，这个变量不可少。</p>
<h3 id="articleHeader5">Step 2</h3>
<p>对于移动端，肯定少不了手指滑动效果。在左右滑动页面的时候，理应也能切换到对应的路由。滴滴app就是这样。如何滑动？实现思路就是以3个touch事件：<code>touchstart</code>,<code>touchmove</code>,<code>touchend</code>是核心，配合<code>transform: translate</code>来实现。额外要求：松手后判断滑动距离，达到一定距即进行路由的切换，否则页面“滑”回去。<br>如何让元素跟着你的指尖走？我们以<code>driver</code>组件为例，先了解一下组件中各项数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    touch: {}, // 保存着起始位置x1和变化的位置x2
    touchStartTime: 0, // touch开始
    touchEndTime: 0, // touch结束时间
    currentDistance: 0 // 上一个touch事件完成后，已滑动距离。实际在这个设计里，因为我们手指离开后， 页面不会停留在中间，不是滑过去切换路由，就是滑回去恢复原样。所以这个变量并没有什么卵用，但是如果要*即停即走*，这个变量不可少。
    totalDiff: 0 // 总滑动距离
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data() {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">touch</span>: {}, <span class="hljs-comment">// 保存着起始位置x1和变化的位置x2</span>
    touchStartTime: <span class="hljs-number">0</span>, <span class="hljs-comment">// touch开始</span>
    touchEndTime: <span class="hljs-number">0</span>, <span class="hljs-comment">// touch结束时间</span>
    currentDistance: <span class="hljs-number">0</span> <span class="hljs-comment">// 上一个touch事件完成后，已滑动距离。实际在这个设计里，因为我们手指离开后， 页面不会停留在中间，不是滑过去切换路由，就是滑回去恢复原样。所以这个变量并没有什么卵用，但是如果要*即停即走*，这个变量不可少。</span>
    totalDiff: <span class="hljs-number">0</span> <span class="hljs-comment">// 总滑动距离</span>
  }
},</code></pre>
<p>首先，我们在监听元素的touchstart事件，在用户touch页面的时候记录下位置信息，因为我们是左右滑动，所以只关心x轴方向。回调函数如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function touchStart(ev) {
  let touch = ev.changedTouches[0]
  this.touch.x1 = touch.pageX // 本文中所有this指向vue组件实例
                                                          // 这里是driver组件或是passenger
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">touchStart</span>(<span class="hljs-params">ev</span>) </span>{
  <span class="hljs-keyword">let</span> touch = ev.changedTouches[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">this</span>.touch.x1 = touch.pageX <span class="hljs-comment">// 本文中所有this指向vue组件实例</span>
                                                          <span class="hljs-comment">// 这里是driver组件或是passenger</span>
}</code></pre>
<p>然后，也是重点，监听touchmove事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function touchMove(ev) {
  let touch = ev.changedTouches[0]
  this.touch.x2 = touch.pageX
  let diff = this.touch.x2 - this.touch.x1 // 差值，表示手指移动的距离
  this.totalDiff = diff + this.currentDistance // 总差值，表示手指移动的距离，正表示右滑，负左滑
  if (this.totalDiff < 0) { // driver组件是右滑，所以totalDiff不能小于0
    this.totalDiff = 0
  } else if (this.totalDiff > this.maxMoveDistance) { // 这里maxMoveDistance为屏幕宽度
    this.totalDiff = this.maxMoveDistance
  }
  let el = ev.currentTarget
  translate(el, this.totalDiff, 0) // 对组件进行滑动
  translate(this.leftEl, this.totalDiff, 0) // leftEl后面再做解释
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">touchMove</span>(<span class="hljs-params">ev</span>) </span>{
  <span class="hljs-keyword">let</span> touch = ev.changedTouches[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">this</span>.touch.x2 = touch.pageX
  <span class="hljs-keyword">let</span> diff = <span class="hljs-keyword">this</span>.touch.x2 - <span class="hljs-keyword">this</span>.touch.x1 <span class="hljs-comment">// 差值，表示手指移动的距离</span>
  <span class="hljs-keyword">this</span>.totalDiff = diff + <span class="hljs-keyword">this</span>.currentDistance <span class="hljs-comment">// 总差值，表示手指移动的距离，正表示右滑，负左滑</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.totalDiff &lt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// driver组件是右滑，所以totalDiff不能小于0</span>
    <span class="hljs-keyword">this</span>.totalDiff = <span class="hljs-number">0</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.totalDiff &gt; <span class="hljs-keyword">this</span>.maxMoveDistance) { <span class="hljs-comment">// 这里maxMoveDistance为屏幕宽度</span>
    <span class="hljs-keyword">this</span>.totalDiff = <span class="hljs-keyword">this</span>.maxMoveDistance
  }
  <span class="hljs-keyword">let</span> el = ev.currentTarget
  translate(el, <span class="hljs-keyword">this</span>.totalDiff, <span class="hljs-number">0</span>) <span class="hljs-comment">// 对组件进行滑动</span>
  translate(<span class="hljs-keyword">this</span>.leftEl, <span class="hljs-keyword">this</span>.totalDiff, <span class="hljs-number">0</span>) <span class="hljs-comment">// leftEl后面再做解释</span>
}</code></pre>
<p>关于translate函数，具体实现如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 简单的移动函数
 * @param {HTML Object} el 目标节点
 * @param {number} x 水平方向的移动
 * @param {number} y 垂直方向的移动
 * @param {Object} options 可选参数
 * @param {Boolean} options.useTransfrom 是否通过transfrom来移动元素
 * @param {Boolean} options.transitionTimingFunction transition的timingFunction
 * @param {String} options.transitionDuration transition时间
 */
function translate(el, x, y, options) {
  const defaultOptions = {
    useTransfrom: true,
    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    transitionDuration: '0s'
  }
  for (let option in options) {
    defaultOptions[option] = options[option]
  }
  if (defaultOptions.useTransfrom) {
    el.style.transform = `translate3d(${x}px,${y}px,0)`
    el.style.transitionProperty = 'transform'
    el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
    el.style.transitionDuration = defaultOptions.transitionDuration
  } else {
    el.style.left = x
    el.style.top = y
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 简单的移动函数
 * @param {HTML Object} el 目标节点
 * @param {number} x 水平方向的移动
 * @param {number} y 垂直方向的移动
 * @param {Object} options 可选参数
 * @param {Boolean} options.useTransfrom 是否通过transfrom来移动元素
 * @param {Boolean} options.transitionTimingFunction transition的timingFunction
 * @param {String} options.transitionDuration transition时间
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">translate</span>(<span class="hljs-params">el, x, y, options</span>) </span>{
  <span class="hljs-keyword">const</span> defaultOptions = {
    <span class="hljs-attr">useTransfrom</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">transitionTimingFunction</span>: <span class="hljs-string">'cubic-bezier(0.165, 0.84, 0.44, 1)'</span>,
    <span class="hljs-attr">transitionDuration</span>: <span class="hljs-string">'0s'</span>
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> option <span class="hljs-keyword">in</span> options) {
    defaultOptions[option] = options[option]
  }
  <span class="hljs-keyword">if</span> (defaultOptions.useTransfrom) {
    el.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${x}</span>px,<span class="hljs-subst">${y}</span>px,0)`</span>
    el.style.transitionProperty = <span class="hljs-string">'transform'</span>
    el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
    el.style.transitionDuration = defaultOptions.transitionDuration
  } <span class="hljs-keyword">else</span> {
    el.style.left = x
    el.style.top = y
  }
}</code></pre>
<p>接下来就是<code>touchend</code>事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function touchEnd(ev) {
  let touch = ev.changedTouches[0]
  this.touch.x2 = touch.pageX
  let diff = this.touch.x2 - this.touch.x1
  this.touchEndTime = Date.now()
  this.totalDiff = diff + this.currentDistance
  this.currentDistance = this.totalDiff
  let el = ev.currentTarget
  let touchTime = this.touchEndTime - this.touchStartTime
  // 当滑动距离超过一半或者快速滑动一段距离时，就进行完整的滑动，否则回弹
  // 快速滑动的数据是自己尝试的，体验可能不是很好^ ^
  if (this.totalDiff > this.maxMoveDistance / 2 || (touchTime < 150 &amp;&amp; this.totalDiff > this.maxMoveDistance / 10)) {
    translate(el, this.maxMoveDistance, 0, {
      transitionTimingFunction: 'linear',
      transitionDuration: '.1s'
    })
    translate(this.leftEl, this.maxMoveDistance, 0, {
      transitionTimingFunction: 'linear',
      transitionDuration: '.1s'
    })
    this.$emit('dragedSlide') // 通知父组件进行路由切换
  } else {
    this.totalDiff = this.currentDistance = 0
    translate(el, this.totalDiff, 0)
    translate(this.leftEl, this.totalDiff, 0)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">touchEnd</span>(<span class="hljs-params">ev</span>) </span>{
  <span class="hljs-keyword">let</span> touch = ev.changedTouches[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">this</span>.touch.x2 = touch.pageX
  <span class="hljs-keyword">let</span> diff = <span class="hljs-keyword">this</span>.touch.x2 - <span class="hljs-keyword">this</span>.touch.x1
  <span class="hljs-keyword">this</span>.touchEndTime = <span class="hljs-built_in">Date</span>.now()
  <span class="hljs-keyword">this</span>.totalDiff = diff + <span class="hljs-keyword">this</span>.currentDistance
  <span class="hljs-keyword">this</span>.currentDistance = <span class="hljs-keyword">this</span>.totalDiff
  <span class="hljs-keyword">let</span> el = ev.currentTarget
  <span class="hljs-keyword">let</span> touchTime = <span class="hljs-keyword">this</span>.touchEndTime - <span class="hljs-keyword">this</span>.touchStartTime
  <span class="hljs-comment">// 当滑动距离超过一半或者快速滑动一段距离时，就进行完整的滑动，否则回弹</span>
  <span class="hljs-comment">// 快速滑动的数据是自己尝试的，体验可能不是很好^ ^</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.totalDiff &gt; <span class="hljs-keyword">this</span>.maxMoveDistance / <span class="hljs-number">2</span> || (touchTime &lt; <span class="hljs-number">150</span> &amp;&amp; <span class="hljs-keyword">this</span>.totalDiff &gt; <span class="hljs-keyword">this</span>.maxMoveDistance / <span class="hljs-number">10</span>)) {
    translate(el, <span class="hljs-keyword">this</span>.maxMoveDistance, <span class="hljs-number">0</span>, {
      <span class="hljs-attr">transitionTimingFunction</span>: <span class="hljs-string">'linear'</span>,
      <span class="hljs-attr">transitionDuration</span>: <span class="hljs-string">'.1s'</span>
    })
    translate(<span class="hljs-keyword">this</span>.leftEl, <span class="hljs-keyword">this</span>.maxMoveDistance, <span class="hljs-number">0</span>, {
      <span class="hljs-attr">transitionTimingFunction</span>: <span class="hljs-string">'linear'</span>,
      <span class="hljs-attr">transitionDuration</span>: <span class="hljs-string">'.1s'</span>
    })
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'dragedSlide'</span>) <span class="hljs-comment">// 通知父组件进行路由切换</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.totalDiff = <span class="hljs-keyword">this</span>.currentDistance = <span class="hljs-number">0</span>
    translate(el, <span class="hljs-keyword">this</span>.totalDiff, <span class="hljs-number">0</span>)
    translate(<span class="hljs-keyword">this</span>.leftEl, <span class="hljs-keyword">this</span>.totalDiff, <span class="hljs-number">0</span>)
  }
}</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000013604312?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000013604312?w=376&amp;h=668" alt="效果图2" title="效果图2" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">Step 3</h3>
<p>在拖动时，左右都是“白边”，难看。怎么处理？也不难。<br>我们<del>都</del>写过或者了解过轮播图，其中一种写法就是在第一张图(元素)的左边插入最后一张图(元素)，最后一张图的右边插入第一张。在拖动当前元素时，同时拖动其左/右的元素(也就是Step 2中代码里的<code>leftEl</code>，当然还有righEl)，来达到我们要的效果。所以现在我们的html结构是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content-wrapper&quot;>
    <passenger class=&quot;out_of_screen out_of_screen-left&quot;/>
    <!-- router-view指向组件driver和passenger -->
    <router-view class=&quot;content&quot;/>
    <driver class=&quot;out_of_screen out_of_screen-right&quot;/>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">passenger</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_of_screen out_of_screen-left"</span>/&gt;</span>
    <span class="hljs-comment">&lt;!-- router-view指向组件driver和passenger --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">driver</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_of_screen out_of_screen-right"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>到这里好像就大功告成了？看一下效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000013604313?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000013604313?w=376&amp;h=668" alt="效果图3" title="效果图3" style="cursor: pointer;"></span><br>等等，是你撸多了吗？怎么有两个动画？<br>其实是因为路由切换后会自动触发组件本身的transition，再加上自己写的<code>translate(this.leftEl, ...)</code>，就有2个啦。<br>知道原因就很好处理了，去掉其中一个动画即可。我的选择是去掉组件本身的过渡效果。<br>具体做法就是给组件动态绑定<code>transition</code>的<code>name</code>属性，来选择性的使组件开启/关闭过渡效果。同时对左右插入的元素监听其<code>transitionend</code>事件，配合上父组件的<code>dragedSlide</code>事件，来实现动态过渡，上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content-wrapper&quot;>
  <passenger class=&quot;out_of_screen out_of_screen-left&quot; @transitionend.native=&quot;updateRouter($event, 'passenger')/>
  <!-- router-view指向组件driver和passenger -->
  <router-view class=&quot;content&quot; 
    @dragedSlide=&quot;confirmDragSlide&quot;
    :transitionName=&quot;transitionName&quot;
  />
  <driver class=&quot;out_of_screen out_of_screen-right&quot; @transitionend.native=&quot;updateRouter($event, 'passenger')/>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">passenger</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_of_screen out_of_screen-left"</span> @<span class="hljs-attr">transitionend.native</span>=<span class="hljs-string">"updateRouter($event, 'passenger')/&gt;
  &lt;!-- router-view指向组件driver和passenger --&gt;
  &lt;router-view class="</span><span class="hljs-attr">content</span>" 
    @<span class="hljs-attr">dragedSlide</span>=<span class="hljs-string">"confirmDragSlide"</span>
    <span class="hljs-attr">:transitionName</span>=<span class="hljs-string">"transitionName"</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">driver</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_of_screen out_of_screen-right"</span> @<span class="hljs-attr">transitionend.native</span>=<span class="hljs-string">"updateRouter($event, 'passenger')/&gt;
&lt;/div&gt;</span></span></code></pre>
<p>父组件js部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  beforeRouteUpdate(to, from, next) {
    this.transitionName = this.isDragedSlide ? '' : 'slide'
    next()
  },
 data() {
    return {
      transitionName: 'slide',
      isDragedSlide: false
    }
  },
  methods: {
        // ...
    // 是否通过手指拖动触发滑屏
    confirmDragSlide() {
      this.isDragedSlide = true
    },
    updateRouter(ev, routeName) {
      if (this.isDragedSlide) {
        let el = ev.target
        this.$router.push(routeName)
        el.style.transform = ''
        el.style.transitionDuration = '0s'
        this.isDragedSlide = false
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  beforeRouteUpdate(to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-keyword">this</span>.transitionName = <span class="hljs-keyword">this</span>.isDragedSlide ? <span class="hljs-string">''</span> : <span class="hljs-string">'slide'</span>
    next()
  },
 data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">transitionName</span>: <span class="hljs-string">'slide'</span>,
      <span class="hljs-attr">isDragedSlide</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
        <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// 是否通过手指拖动触发滑屏</span>
    confirmDragSlide() {
      <span class="hljs-keyword">this</span>.isDragedSlide = <span class="hljs-literal">true</span>
    },
    updateRouter(ev, routeName) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isDragedSlide) {
        <span class="hljs-keyword">let</span> el = ev.target
        <span class="hljs-keyword">this</span>.$router.push(routeName)
        el.style.transform = <span class="hljs-string">''</span>
        el.style.transitionDuration = <span class="hljs-string">'0s'</span>
        <span class="hljs-keyword">this</span>.isDragedSlide = <span class="hljs-literal">false</span>
      }
    }
  }
}</code></pre>
<p>最终效果<br><span class="img-wrap"><img data-src="/img/remote/1460000013604314?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000013604314?w=376&amp;h=668" alt="效果图4" title="效果图4" style="cursor: pointer;"></span></p>
<hr>
<p><a href="https://segmentfault.com/a/1190000014303454">这里有内容更新</a></p>
<hr>
<h2 id="articleHeader7">End</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs实现spa页面组件滑动特效

## 原文链接
[https://segmentfault.com/a/1190000013604306](https://segmentfault.com/a/1190000013604306)

