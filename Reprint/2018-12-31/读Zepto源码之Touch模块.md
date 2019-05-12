---
title: '读Zepto源码之Touch模块' 
date: 2018-12-31 2:30:29
hidden: true
slug: uxg2f7jwqjs
categories: [reprint]
---

{{< raw >}}

                    
<p>大家都知道，因为历史原因，移动端上的点击事件会有 <code>300ms</code> 左右的延迟，<code>Zepto</code> 的 <code>touch</code> 模块解决的就是移动端点击延迟的问题，同时也提供了滑动的 <code>swipe</code> 事件。</p>
<p>读 Zepto 源码系列文章已经放到了github上，欢迎star: <a href="https://github.com/yeyuqiudeng/reading-zepto" rel="nofollow noreferrer" target="_blank">reading-zepto</a></p>
<h2 id="articleHeader0">源码版本</h2>
<p>本文阅读的源码为 <a href="https://github.com/madrobby/zepto/tree/v1.2.0" rel="nofollow noreferrer" target="_blank">zepto1.2.0</a></p>
<h2 id="articleHeader1">GitBook</h2>
<p>《<a href="https://yeyuqiudeng.gitbooks.io/reading-zepto/content/" rel="nofollow noreferrer" target="_blank">reading-zepto</a>》</p>
<h2 id="articleHeader2">实现的事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
  'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
  $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;[<span class="hljs-string">'swipe'</span>, <span class="hljs-string">'swipeLeft'</span>, <span class="hljs-string">'swipeRight'</span>, <span class="hljs-string">'swipeUp'</span>, <span class="hljs-string">'swipeDown'</span>,
  <span class="hljs-string">'doubleTap'</span>, <span class="hljs-string">'tap'</span>, <span class="hljs-string">'singleTap'</span>, <span class="hljs-string">'longTap'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventName</span>)</span>{
  $.fn[eventName] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on(eventName, callback) }
})</code></pre>
<p>从上面的代码中可以看到，<code>Zepto</code> 实现了以下的事件：</p>
<ul>
<li>swipe: 滑动事件</li>
<li>swipeLeft: 向左滑动事件</li>
<li>swipeRight: 向右滑动事件</li>
<li>swipeUp: 向上滑动事件</li>
<li>swipeDown: 向下滑动事件</li>
<li>doubleTap: 屏幕双击事件</li>
<li>tap: 屏幕点击事件，比 <code>click</code> 事件响应更快</li>
<li>singleTap: 屏幕单击事件</li>
<li>longTap: 长按事件</li>
</ul>
<p>并且为每个事件都注册了快捷方法。</p>
<h2 id="articleHeader3">内部方法</h2>
<h3 id="articleHeader4">swipeDirection</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swipeDirection</span>(<span class="hljs-params">x1, x2, y1, y2</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.abs(x1 - x2) &gt;=
    <span class="hljs-built_in">Math</span>.abs(y1 - y2) ? (x1 - x2 &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'Left'</span> : <span class="hljs-string">'Right'</span>) : (y1 - y2 &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'Up'</span> : <span class="hljs-string">'Down'</span>)
}</code></pre>
<p>返回的是滑动的方法。</p>
<p><code>x1</code> 为 <code>x轴</code> 起点坐标， <code>x2</code> 为 <code>x轴</code> 终点坐标， <code>y1</code> 为 <code>y轴</code> 起点坐标， <code>y2</code> 为 <code>y轴</code> 终点坐标。</p>
<p>这里有多组三元表达式，首先对比的是 <code>x轴</code> 和 <code>y轴</code> 上的滑动距离，如果 <code>x轴</code> 的滑动距离比 <code>y轴</code> 大，则为左右滑动，否则为上下滑动。</p>
<p>在 <code>x轴</code> 上，如果起点位置比终点位置大，则为向左滑动，返回 <code>Left</code> ，否则为向右滑动，返回 <code>Right</code> 。</p>
<p>在 <code>y轴</code> 上，如果起点位置比终点位置大，则为向上滑动，返回 <code>Up</code> ，否则为向下滑动，返回 <code>Down</code> 。</p>
<h3 id="articleHeader5">longTap</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture
function longTap() {
  longTapTimeout = null
  if (touch.last) {
    touch.el.trigger('longTap')
    touch = {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = <span class="hljs-number">750</span>,
    gesture
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longTap</span>(<span class="hljs-params"></span>) </span>{
  longTapTimeout = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">if</span> (touch.last) {
    touch.el.trigger(<span class="hljs-string">'longTap'</span>)
    touch = {}
  }
}</code></pre>
<p>触发长按事件。</p>
<p><code>touch</code> 对象保存的是触摸过程中的信息。</p>
<p>在触发 <code>longTap</code> 事件前，先将保存定时器的变量 <code>longTapTimeout</code> 释放，如果 <code>touch</code> 对象中存在 <code>last</code> ，则触发 <code>longTap</code> 事件， <code>last</code> 保存的是最后触摸的时间。最后将 <code>touch</code> 重置为空对象，以便下一次使用。</p>
<h3 id="articleHeader6">cancelLongTap</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cancelLongTap() {
  if (longTapTimeout) clearTimeout(longTapTimeout)
  longTapTimeout = null
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancelLongTap</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (longTapTimeout) clearTimeout(longTapTimeout)
  longTapTimeout = <span class="hljs-literal">null</span>
}</code></pre>
<p>撤销 <code>longTap</code> 事件的触发。</p>
<p>如果有触发 <code>longTap</code> 的定时器，清除定时器即可阻止 <code>longTap</code> 事件的触发。</p>
<p>最后同样需要将 <code>longTapTimeout</code> 变量置为 <code>null</code> ，等待垃圾回收。</p>
<h3 id="articleHeader7">cancelAll</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cancelAll() {
  if (touchTimeout) clearTimeout(touchTimeout)
  if (tapTimeout) clearTimeout(tapTimeout)
  if (swipeTimeout) clearTimeout(swipeTimeout)
  if (longTapTimeout) clearTimeout(longTapTimeout)
  touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
  touch = {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancelAll</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (touchTimeout) clearTimeout(touchTimeout)
  <span class="hljs-keyword">if</span> (tapTimeout) clearTimeout(tapTimeout)
  <span class="hljs-keyword">if</span> (swipeTimeout) clearTimeout(swipeTimeout)
  <span class="hljs-keyword">if</span> (longTapTimeout) clearTimeout(longTapTimeout)
  touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = <span class="hljs-literal">null</span>
  touch = {}
}</code></pre>
<p>清除所有事件的执行。</p>
<p>其实就是清除所有相关的定时器，最后将 <code>touch</code> 对象设置为 <code>null</code> 。</p>
<h3 id="articleHeader8">isPrimaryTouch</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPrimaryTouch(event){
  return (event.pointerType == 'touch' ||
          event.pointerType == event.MSPOINTER_TYPE_TOUCH)
  &amp;&amp; event.isPrimary
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPrimaryTouch</span>(<span class="hljs-params">event</span>)</span>{
  <span class="hljs-keyword">return</span> (event.pointerType == <span class="hljs-string">'touch'</span> ||
          event.pointerType == event.MSPOINTER_TYPE_TOUCH)
  &amp;&amp; event.isPrimary
}</code></pre>
<p>是否为主触点。</p>
<p>当 <code>pointerType</code> 为 <code>touch</code> 并且 <code>isPrimary</code> 为 <code>true</code> 时，才为主触点。 <code>pointerType</code> 可为 <code>touch</code> 、 <code>pen</code> 和 <code>mouse</code> ，这里只处理手指触摸的情况。</p>
<h3 id="articleHeader9">isPointerEventType</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPointerEventType(e, type){
  return (e.type == 'pointer'+type ||
          e.type.toLowerCase() == 'mspointer'+type)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPointerEventType</span>(<span class="hljs-params">e, type</span>)</span>{
  <span class="hljs-keyword">return</span> (e.type == <span class="hljs-string">'pointer'</span>+type ||
          e.type.toLowerCase() == <span class="hljs-string">'mspointer'</span>+type)
}</code></pre>
<p>触发的是否为 <code>pointerEvent</code> 。</p>
<p>在低版本的移动端 IE 浏览器中，只实现了 <code>PointerEvent</code> ，并没有实现 <code>TouchEvent</code> ，所以需要这个来判断。</p>
<h2 id="articleHeader10">事件触发</h2>
<h3 id="articleHeader11">整体分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    $(document)
      .bind('MSGestureEnd', function(e){
        ...
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        ...
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        ...
      })
      .on('touchend MSPointerUp pointerup', function(e){
        ...
      })
      
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    $(window).on('scroll', cancelAll)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> now, delta, deltaX = <span class="hljs-number">0</span>, deltaY = <span class="hljs-number">0</span>, firstTouch, _isPointerType

    $(<span class="hljs-built_in">document</span>)
      .bind(<span class="hljs-string">'MSGestureEnd'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        ...
      })
      .on(<span class="hljs-string">'touchstart MSPointerDown pointerdown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        ...
      })
      .on(<span class="hljs-string">'touchmove MSPointerMove pointermove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        ...
      })
      .on(<span class="hljs-string">'touchend MSPointerUp pointerup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        ...
      })
      
      .on(<span class="hljs-string">'touchcancel MSPointerCancel pointercancel'</span>, cancelAll)

    $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, cancelAll)</code></pre>
<p>先来说明几个变量，<code>now</code> 用来保存当前时间， <code>delta</code> 用来保存两次触摸之间的时间差， <code>deltaX</code> 用来保存 <code>x轴</code> 上的位移， <code>deltaY</code> 来用保存 <code>y轴</code> 上的位移， <code>firstTouch</code> 保存初始触摸点的信息， <code>_isPointerType</code> 保存是否为 <code>pointerEvent</code> 的判断结果。</p>
<p>从上面可以看到， <code>Zepto</code> 所触发的事件，是从 <code>touch</code> 、 <code>pointer</code> 或者 IE 的 <code>guesture</code> 事件中，根据不同情况计算出来的。这些事件都绑定在 <code>document</code> 上。</p>
<h3 id="articleHeader12">IE Gesture 事件的处理</h3>
<p><code>IE</code> 的手势使用，需要经历三步：</p>
<ol>
<li>创建手势对象</li>
<li>指定目标元素</li>
<li>指定手势识别时需要处理的指针</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('MSGesture' in window) {
  gesture = new MSGesture()
  gesture.target = document.body
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-string">'MSGesture'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) {
  gesture = <span class="hljs-keyword">new</span> MSGesture()
  gesture.target = <span class="hljs-built_in">document</span>.body
}</code></pre>
<p>这段代码包含了前两步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on('touchstart MSPointerDown pointerdown', function(e){
  ...
  if (gesture &amp;&amp; _isPointerType) gesture.addPointer(e.pointerId)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">on(<span class="hljs-string">'touchstart MSPointerDown pointerdown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  ...
  if (gesture &amp;&amp; _isPointerType) gesture.addPointer(e.pointerId)
}</code></pre>
<p>这段是第三步，用 <code>addPointer</code> 的方法，指定需要处理的指针。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bind('MSGestureEnd', function(e){
  var swipeDirectionFromVelocity =
      e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null
  if (swipeDirectionFromVelocity) {
    touch.el.trigger('swipe')
    touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">bind(<span class="hljs-string">'MSGestureEnd'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">var</span> swipeDirectionFromVelocity =
      e.velocityX &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">'Right'</span> : e.velocityX &lt; <span class="hljs-number">-1</span> ? <span class="hljs-string">'Left'</span> : e.velocityY &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">'Down'</span> : e.velocityY &lt; <span class="hljs-number">-1</span> ? <span class="hljs-string">'Up'</span> : <span class="hljs-literal">null</span>
  <span class="hljs-keyword">if</span> (swipeDirectionFromVelocity) {
    touch.el.trigger(<span class="hljs-string">'swipe'</span>)
    touch.el.trigger(<span class="hljs-string">'swipe'</span>+ swipeDirectionFromVelocity)
  }
})</code></pre>
<p>接下来就是分析手势了，<code>Gesture</code> 里只处理 <code>swipe</code> 事件。</p>
<p><code>velocityX</code> 和 <code>velocityY</code> 分别为 <code>x轴</code> 和 <code>y轴</code> 上的速率。这里以 <code>1</code>  或 <code>-1</code> 为临界点，判断 <code>swipe</code> 的方向。</p>
<p>如果 <code>swipe</code> 的方向存在，则触发 <code>swipe</code> 事件，同时也触发带方向的 <code>swipe</code> 事件。</p>
<h3 id="articleHeader13">start</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on('touchstart MSPointerDown pointerdown', function(e){
  if((_isPointerType = isPointerEventType(e, 'down')) &amp;&amp;
     !isPrimaryTouch(e)) return
  firstTouch = _isPointerType ? e : e.touches[0]
  if (e.touches &amp;&amp; e.touches.length === 1 &amp;&amp; touch.x2) {
    touch.x2 = undefined
    touch.y2 = undefined
  }
  now = Date.now()
  delta = now - (touch.last || now)
  touch.el = $('tagName' in firstTouch.target ?
               firstTouch.target : firstTouch.target.parentNode)
  touchTimeout &amp;&amp; clearTimeout(touchTimeout)
  touch.x1 = firstTouch.pageX
  touch.y1 = firstTouch.pageY
  if (delta > 0 &amp;&amp; delta <= 250) touch.isDoubleTap = true
  touch.last = now
  longTapTimeout = setTimeout(longTap, longTapDelay)
  if (gesture &amp;&amp; _isPointerType) gesture.addPointer(e.pointerId)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">on(<span class="hljs-string">'touchstart MSPointerDown pointerdown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'down'</span>)) &amp;&amp;
     !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
  firstTouch = _isPointerType ? e : e.touches[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">if</span> (e.touches &amp;&amp; e.touches.length === <span class="hljs-number">1</span> &amp;&amp; touch.x2) {
    touch.x2 = <span class="hljs-literal">undefined</span>
    touch.y2 = <span class="hljs-literal">undefined</span>
  }
  now = <span class="hljs-built_in">Date</span>.now()
  delta = now - (touch.last || now)
  touch.el = $(<span class="hljs-string">'tagName'</span> <span class="hljs-keyword">in</span> firstTouch.target ?
               firstTouch.target : firstTouch.target.parentNode)
  touchTimeout &amp;&amp; clearTimeout(touchTimeout)
  touch.x1 = firstTouch.pageX
  touch.y1 = firstTouch.pageY
  <span class="hljs-keyword">if</span> (delta &gt; <span class="hljs-number">0</span> &amp;&amp; delta &lt;= <span class="hljs-number">250</span>) touch.isDoubleTap = <span class="hljs-literal">true</span>
  touch.last = now
  longTapTimeout = setTimeout(longTap, longTapDelay)
  <span class="hljs-keyword">if</span> (gesture &amp;&amp; _isPointerType) gesture.addPointer(e.pointerId)
})</code></pre>
<h4>过滤掉非触屏事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if((_isPointerType = isPointerEventType(e, 'down')) &amp;&amp;
   !isPrimaryTouch(e)) return
firstTouch = _isPointerType ? e : e.touches[0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'down'</span>)) &amp;&amp;
   !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
firstTouch = _isPointerType ? e : e.touches[<span class="hljs-number">0</span>]</code></pre>
<p>这里还将 <code>isPointerEventType</code> 的判断结果保存到了 <code>_isPointerType</code> 中，用来判断是否为 <code>PointerEvent</code> 。</p>
<p>这里的判断其实就是只处理 <code>PointerEvent</code> 和 <code>TouchEvent</code> ，并且 <code>TouchEvent</code> 的 <code>isPrimary</code> 必须为 <code>true</code> 。</p>
<p>因为 <code>TouchEvent</code> 支持多点触碰，这里只取触碰的第一点存入 <code>firstTouch</code> 变量。</p>
<h4>重置终点坐标</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (e.touches &amp;&amp; e.touches.length === 1 &amp;&amp; touch.x2) {
  touch.x2 = undefined
  touch.y2 = undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (e.touches &amp;&amp; e.touches.length === <span class="hljs-number">1</span> &amp;&amp; touch.x2) {
  touch.x2 = <span class="hljs-literal">undefined</span>
  touch.y2 = <span class="hljs-literal">undefined</span>
}</code></pre>
<p>如果还需要记录，终点坐标是需要更新的。</p>
<p>正常情况下，<code>touch</code> 对象会在 <code>touchEnd</code> 或者 <code>cancel</code> 的时候清空，但是如果用户自己调用了 <code>preventDefault</code> 等，就可能会出现没有清空的情况。</p>
<p>这里有一点不太明白，为什么只会在 <code>touches</code> 单点操作的时候才清空呢？多个触碰点的时候不需要清空吗？</p>
<h4>记录触碰点的信息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="now = Date.now()
delta = now - (touch.last || now)
touch.el = $('tagName' in firstTouch.target ?
             firstTouch.target : firstTouch.target.parentNode)
touchTimeout &amp;&amp; clearTimeout(touchTimeout)
touch.x1 = firstTouch.pageX
touch.y1 = firstTouch.pageY" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">now = <span class="hljs-built_in">Date</span>.now()
delta = now - (touch.last || now)
touch.el = $(<span class="hljs-string">'tagName'</span> <span class="hljs-keyword">in</span> firstTouch.target ?
             firstTouch.target : firstTouch.target.parentNode)
touchTimeout &amp;&amp; clearTimeout(touchTimeout)
touch.x1 = firstTouch.pageX
touch.y1 = firstTouch.pageY</code></pre>
<p><code>now</code> 用来保存当前时间。</p>
<p><code>delta</code> 用来保存两次点击时的时间间隔，用来处理双击事件。</p>
<p><code>touch.el</code> 用来保存目标元素，这里有个判断，如果 <code>target</code> 不是标签节点时，取父节点作为目标元素。这会在点击伪类元素时出现。</p>
<p>如果 <code>touchTimeout</code> 存在，则清除定时器，避免重复触发。</p>
<p><code>touch.x1</code> 和 <code>touch.y1</code> 分别保存 <code>x轴</code> 坐标和 <code>y轴</code> 坐标。</p>
<h4>双击事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (delta > 0 &amp;&amp; delta <= 250) touch.isDoubleTap = true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (delta &gt; <span class="hljs-number">0</span> &amp;&amp; delta &lt;= <span class="hljs-number">250</span>) touch.isDoubleTap = <span class="hljs-literal">true</span></code></pre>
<p>可以很清楚地看到， <code>Zepto</code> 将两次点击的时间间隔小于 <code>250ms</code> 时，作为 <code>doubleTap</code> 事件处理，将 <code>isDoubleTap</code> 设置为 <code>true</code> 。</p>
<h4>长按事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch.last = now
longTapTimeout = setTimeout(longTap, longTapDelay)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">touch.last = now
longTapTimeout = setTimeout(longTap, longTapDelay)</code></pre>
<p>将 <code>touch.last</code> 设置为当前时间。这样就可以记录两次点击时的时间差了。</p>
<p>同时开始长按事件定时器，从上面的代码可以看到，长按事件会在 <code>750ms</code> 后触发。</p>
<h3 id="articleHeader14">move</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on('touchmove MSPointerMove pointermove', function(e){
  if((_isPointerType = isPointerEventType(e, 'move')) &amp;&amp;
     !isPrimaryTouch(e)) return
  firstTouch = _isPointerType ? e : e.touches[0]
  cancelLongTap()
  touch.x2 = firstTouch.pageX
  touch.y2 = firstTouch.pageY

  deltaX += Math.abs(touch.x1 - touch.x2)
  deltaY += Math.abs(touch.y1 - touch.y2)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">on(<span class="hljs-string">'touchmove MSPointerMove pointermove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'move'</span>)) &amp;&amp;
     !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
  firstTouch = _isPointerType ? e : e.touches[<span class="hljs-number">0</span>]
  cancelLongTap()
  touch.x2 = firstTouch.pageX
  touch.y2 = firstTouch.pageY

  deltaX += <span class="hljs-built_in">Math</span>.abs(touch.x1 - touch.x2)
  deltaY += <span class="hljs-built_in">Math</span>.abs(touch.y1 - touch.y2)
})</code></pre>
<p><code>move</code> 事件处理了两件事，一是记录终点坐标，一是计算起点到终点之间的位移。</p>
<p>要注意这里还调用了 <code>cancelLongTap</code> 清除了长按定时器，避免长按事件的触发。因为有移动，肯定就不是长按了。</p>
<h3 id="articleHeader15">end</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on('touchend MSPointerUp pointerup', function(e){
  if((_isPointerType = isPointerEventType(e, 'up')) &amp;&amp;
     !isPrimaryTouch(e)) return
  cancelLongTap()

  if ((touch.x2 &amp;&amp; Math.abs(touch.x1 - touch.x2) > 30) ||
      (touch.y2 &amp;&amp; Math.abs(touch.y1 - touch.y2) > 30))

    swipeTimeout = setTimeout(function() {
      if (touch.el){
        touch.el.trigger('swipe')
        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
      }
      touch = {}
    }, 0)

  else if ('last' in touch)
  
    if (deltaX < 30 &amp;&amp; deltaY < 30) {
    
      tapTimeout = setTimeout(function() {
        
        var event = $.Event('tap')
        event.cancelTouch = cancelAll
        
        if (touch.el) touch.el.trigger(event)

        if (touch.isDoubleTap) {
          if (touch.el) touch.el.trigger('doubleTap')
          touch = {}
        }

        else {
          touchTimeout = setTimeout(function(){
            touchTimeout = null
            if (touch.el) touch.el.trigger('singleTap')
            touch = {}
          }, 250)
        }
      }, 0)
    } else {
      touch = {}
    }
  deltaX = deltaY = 0

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">on(<span class="hljs-string">'touchend MSPointerUp pointerup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'up'</span>)) &amp;&amp;
     !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
  cancelLongTap()

  <span class="hljs-keyword">if</span> ((touch.x2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.x1 - touch.x2) &gt; <span class="hljs-number">30</span>) ||
      (touch.y2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.y1 - touch.y2) &gt; <span class="hljs-number">30</span>))

    swipeTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (touch.el){
        touch.el.trigger(<span class="hljs-string">'swipe'</span>)
        touch.el.trigger(<span class="hljs-string">'swipe'</span> + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
      }
      touch = {}
    }, <span class="hljs-number">0</span>)

  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">'last'</span> <span class="hljs-keyword">in</span> touch)
  
    <span class="hljs-keyword">if</span> (deltaX &lt; <span class="hljs-number">30</span> &amp;&amp; deltaY &lt; <span class="hljs-number">30</span>) {
    
      tapTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        
        <span class="hljs-keyword">var</span> event = $.Event(<span class="hljs-string">'tap'</span>)
        event.cancelTouch = cancelAll
        
        <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(event)

        <span class="hljs-keyword">if</span> (touch.isDoubleTap) {
          <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(<span class="hljs-string">'doubleTap'</span>)
          touch = {}
        }

        <span class="hljs-keyword">else</span> {
          touchTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            touchTimeout = <span class="hljs-literal">null</span>
            <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(<span class="hljs-string">'singleTap'</span>)
            touch = {}
          }, <span class="hljs-number">250</span>)
        }
      }, <span class="hljs-number">0</span>)
    } <span class="hljs-keyword">else</span> {
      touch = {}
    }
  deltaX = deltaY = <span class="hljs-number">0</span>

})</code></pre>
<h4>swipe</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cancelLongTap()
if ((touch.x2 &amp;&amp; Math.abs(touch.x1 - touch.x2) > 30) ||
    (touch.y2 &amp;&amp; Math.abs(touch.y1 - touch.y2) > 30))

  swipeTimeout = setTimeout(function() {
    if (touch.el){
      touch.el.trigger('swipe')
      touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
    }
    touch = {}
  }, 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cancelLongTap()
<span class="hljs-keyword">if</span> ((touch.x2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.x1 - touch.x2) &gt; <span class="hljs-number">30</span>) ||
    (touch.y2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.y1 - touch.y2) &gt; <span class="hljs-number">30</span>))

  swipeTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (touch.el){
      touch.el.trigger(<span class="hljs-string">'swipe'</span>)
      touch.el.trigger(<span class="hljs-string">'swipe'</span> + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
    }
    touch = {}
  }, <span class="hljs-number">0</span>)</code></pre>
<p>进入 <code>end</code> 时，立刻清除 <code>longTap</code> 定时器的执行。</p>
<p>可以看到，起点和终点的距离超过 <code>30</code> 时，会被判定为 <code>swipe</code> 滑动事件。</p>
<p>在触发完 <code>swipe</code> 事件后，立即触发对应方向上的 <code>swipe</code> 事件。</p>
<p>注意，<code>swipe</code> 事件并不是在 <code>end</code> 系列事件触发时立即触发的，而是设置了一个 <code>0ms</code> 的定时器，让事件异步触发，这个有什么用呢？后面会讲到。</p>
<h4>tap</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if ('last' in touch)
  
  if (deltaX < 30 &amp;&amp; deltaY < 30) {

    tapTimeout = setTimeout(function() {

      var event = $.Event('tap')
      event.cancelTouch = cancelAll

      if (touch.el) touch.el.trigger(event)

    }, 0)
  } else {
    touch = {}
  }
deltaX = deltaY = 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">'last'</span> <span class="hljs-keyword">in</span> touch)
  
  <span class="hljs-keyword">if</span> (deltaX &lt; <span class="hljs-number">30</span> &amp;&amp; deltaY &lt; <span class="hljs-number">30</span>) {

    tapTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

      <span class="hljs-keyword">var</span> event = $.Event(<span class="hljs-string">'tap'</span>)
      event.cancelTouch = cancelAll

      <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(event)

    }, <span class="hljs-number">0</span>)
  } <span class="hljs-keyword">else</span> {
    touch = {}
  }
deltaX = deltaY = <span class="hljs-number">0</span></code></pre>
<p>终于看到重点了，首先判断 <code>last</code> 是否存在，从 <code>start</code> 中可以看到，如果触发了 <code>start</code> ， <code>last</code> 肯定是存在的，但是如果触发了长按事件，<code>touch</code> 对象会被清空，这时不会再触发 <code>tap</code> 事件。</p>
<p>如果不是 <code>swipe</code> 事件，也不存在 <code>last</code> ，则只将 <code>touch</code> 清空，不触发任何事件。</p>
<p>在最后会将 <code>deltaX</code> 和 <code>deltaY</code> 重置为 <code>0</code> 。</p>
<p>触发 <code>tap</code> 事件时，会在 <code>event</code> 中加了 <code>cancelTouch</code> 方法，外界可以通过这个方法取消所有事件的执行。</p>
<p>这里同样用了 <code>setTimeout</code> 异步触发事件。</p>
<h4>doubleTap</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (touch.isDoubleTap) {
  if (touch.el) touch.el.trigger('doubleTap')
  touch = {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (touch.isDoubleTap) {
  <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(<span class="hljs-string">'doubleTap'</span>)
  touch = {}
}</code></pre>
<p>这个 <code>isDoubleTap</code> 在 <code>start</code> 时确定的，上面已经分析过了，在 <code>end</code> 的时候触发 <code>doubleTap</code> 事件。</p>
<p>因此，可以知道，在触发 <code>doubleTap</code> 事件之前会触发两次 <code>tap</code> 事件。</p>
<h4>singleTap</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touchTimeout = setTimeout(function(){
  touchTimeout = null
  if (touch.el) touch.el.trigger('singleTap')
  touch = {}
}, 250)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">touchTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  touchTimeout = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(<span class="hljs-string">'singleTap'</span>)
  touch = {}
}, <span class="hljs-number">250</span>)</code></pre>
<p>如果不是 <code>doubleTap</code> ，会在 <code>tap</code> 事件触发的 <code>250ms</code> 后，触发 <code>singleTap</code> 事件。</p>
<h3 id="articleHeader16">cancel</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".on('touchcancel MSPointerCancel pointercancel', cancelAll)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">.on(<span class="hljs-string">'touchcancel MSPointerCancel pointercancel'</span>, cancelAll)</code></pre>
<p>在接受到 <code>cancel</code> 事件时，调用 <code>cancelAll</code> 方法，取消所有事件的触发。</p>
<h3 id="articleHeader17">scroll</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).on('scroll', cancelAll)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">$(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, cancelAll)</code></pre>
<p>从前面的分析可以看到，所有的事件触发都是异步的。</p>
<p>因为在 <code>scroll</code> 的时候，肯定是只想响应滚动的事件，异步触发是为了在 <code>scroll</code> 的过程中和外界调用 <code>cancelTouch</code> 方法时， 可以将事件取消。</p>
<h2 id="articleHeader18">系列文章</h2>
<ol>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之代码结构</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%86%85%E9%83%A8%E6%96%B9%E6%B3%95.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之内部方法</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之工具函数</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E7%A5%9E%E5%A5%87%E7%9A%84%24.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之神奇的$</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E5%85%83%E7%B4%A0%E6%9F%A5%E6%89%BE.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合元素查找</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%93%8D%E4%BD%9CDOM.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之操作DOM</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%A0%B7%E5%BC%8F%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之样式操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B1%9E%E6%80%A7%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之属性操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BEvent%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Event模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BIE%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之IE模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BCallbacks%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Callbacks模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BDeferred%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Deferred模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BAjax%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Ajax模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8Bassets%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Assets模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BSelector%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Selector模块</a></li>
</ol>
<h2 id="articleHeader19">参考</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000005882908">zepto touch 库源码分析</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent" rel="nofollow noreferrer" target="_blank">PointerEvent</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events" rel="nofollow noreferrer" target="_blank">Pointer events</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" rel="nofollow noreferrer" target="_blank">TouchEvent</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch" rel="nofollow noreferrer" target="_blank">Touch</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent" rel="nofollow noreferrer" target="_blank">GestureEvent</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/MSGestureEvent" rel="nofollow noreferrer" target="_blank">MSGestureEvent</a></li>
<li><a href="https://zrysmt.github.io/2017/04/28/%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5DIY%20zepto%E5%BA%93%EF%BC%8C%E7%A0%94%E7%A9%B6zepto%E6%BA%90%E7%A0%818--touch%E6%A8%A1%E5%9D%97/" rel="nofollow noreferrer" target="_blank">一步一步DIY zepto库，研究zepto源码8--touch模块</a></li>
<li><a href="https://www.bbsmax.com/A/Vx5M9nPv5N/" rel="nofollow noreferrer" target="_blank">zepto源码学习-06 touch</a></li>
<li><a href="http://blog.h5min.cn/u013055396/article/details/76606048" rel="nofollow noreferrer" target="_blank">zepto源码之touch.js</a></li>
<li>
<a href="https://msdn.microsoft.com/en-us/library/hh968251(v=vs.85" rel="nofollow noreferrer" target="_blank">addPointer method</a>.aspx)</li>
</ul>
<h2 id="articleHeader20">License</h2>
<p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0)</a></p>
<p>最后，所有文章都会同步发送到微信公众号上，欢迎关注,欢迎提意见：  <span class="img-wrap"><img data-src="/img/remote/1460000009735938?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000009735938?w=430&amp;h=430" alt="" title="" style="cursor: pointer;"></span></p>
<p>作者：对角另一面</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读Zepto源码之Touch模块

## 原文链接
[https://segmentfault.com/a/1190000011268249](https://segmentfault.com/a/1190000011268249)

