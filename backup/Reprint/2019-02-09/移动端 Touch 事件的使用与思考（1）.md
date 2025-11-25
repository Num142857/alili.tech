---
title: '移动端 Touch 事件的使用与思考（1）' 
date: 2019-02-09 2:30:59
hidden: true
slug: xdkzaqfqquj
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>本文主要介绍 TouchEvent 相关的一些对象与属性如 Touch, TouchList, touhces, targetTouches 等，以及使用的注意点和误区。</strong></p>
<p>触摸事件有以下几种类型：<code>touchstart</code>,<code>touchmove</code>,<code>touchend</code>这三种用的比较多，还有不常用的<code>touchcancel</code>事件。当然 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent#%E8%A7%A6%E6%91%B8%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%B1%BB%E5%9E%8B" rel="nofollow noreferrer" target="_blank">MDN</a>上还介绍了<code>touchenter</code>,<code>touchleave</code>事件，具体适用的场景及兼容性如何还未做测试，感兴趣的可自行研究。</p>
<p>js中不同的事件类型，<code>event</code>对象包含的属性也有所差异。我们先了解几个<code>TouchEvent</code>涉及的对象。</p>
<p><em>提示：文中的demo都是在 chrome 模拟器，iPhone6s(iOS9.3.2) safari，iOS微信上运行，安卓的兼容性未做测试</em></p>
<h2 id="articleHeader0">Touch</h2>
<p><code>Touch</code>对象代表一个触点，可以通过<code>event.touches[0]获取，</code>每个触点包含位置，大小，形状，压力大小，和目标 element属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    screenX: 511, 
    screenY: 400,//触点相对于屏幕左边沿的Y坐标
    clientX: 244.37899780273438, 
    clientY: 189.3820037841797,//相对于可视区域
    pageX: 244.37, 
    pageY: 189.37,//相对于HTML文档顶部，当页面有滚动的时候与clientX=Y 不等
    force: 1,//压力大小，是从0.0(没有压力)到1.0(最大压力)的浮点数
    identifier: 1036403715,//一次触摸动作的唯一标识符
    radiusX: 37.565673828125, //能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径
    radiusY: 37.565673828125,
    rotationAngle: 0,//它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面
    target: {} // 此次触摸事件的目标element
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">screenX</span>: <span class="hljs-number">511</span>, 
    <span class="hljs-attr">screenY</span>: <span class="hljs-number">400</span>,<span class="hljs-comment">//触点相对于屏幕左边沿的Y坐标</span>
    clientX: <span class="hljs-number">244.37899780273438</span>, 
    <span class="hljs-attr">clientY</span>: <span class="hljs-number">189.3820037841797</span>,<span class="hljs-comment">//相对于可视区域</span>
    pageX: <span class="hljs-number">244.37</span>, 
    <span class="hljs-attr">pageY</span>: <span class="hljs-number">189.37</span>,<span class="hljs-comment">//相对于HTML文档顶部，当页面有滚动的时候与clientX=Y 不等</span>
    force: <span class="hljs-number">1</span>,<span class="hljs-comment">//压力大小，是从0.0(没有压力)到1.0(最大压力)的浮点数</span>
    identifier: <span class="hljs-number">1036403715</span>,<span class="hljs-comment">//一次触摸动作的唯一标识符</span>
    radiusX: <span class="hljs-number">37.565673828125</span>, <span class="hljs-comment">//能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径</span>
    radiusY: <span class="hljs-number">37.565673828125</span>,
    <span class="hljs-attr">rotationAngle</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面</span>
    target: {} <span class="hljs-comment">// 此次触摸事件的目标element</span>
}</code></pre>
<p><code>identifier</code><br>这个属性大家可能有疑惑，使用 Chrome 的模拟器发现多次触摸动作，值始终不变。用真机测试则不会有问题(我这里用的safari连接mac调试)。每次触摸包括start,move,end这整个过程，标志符都不变。下一次触摸动作开始，标志符就会变化。</p>
<p><code>screenY</code> <code>clientY</code><br>在 safari 中 <code>screenY</code>与<code>clientY</code>值是相等的，在iOS微信中两个数值不等，但单位应该也不一样。</p>
<p><code>radiusX</code> <code>radiusY</code> <code>rotationAngle</code><br>测试过程中safari及微信内置浏览器都不支持这些属性，chrome模拟器可以。</p>
<h2 id="articleHeader1">TouchList</h2>
<p>由<code>Touch</code>对象构成的数组，通过<code>event.touches</code>取到。一个<code>Touch</code>对象代表一个触点，当有多个手指触摸屏幕时，<code>TouchList</code>就会存储多个<code>Touch</code>对象，前面说到的<code>identifier</code>就用来区分每个手指对应的<code>Touch</code>对象。</p>
<h2 id="articleHeader2">TouchEvent</h2>
<p><code>TouchEvent</code>就是用来描述手指触摸屏幕的状态变化事件，除了一般DOM事件中<code>event</code>对像具备的属性，还有一些特有的属性。</p>
<h2 id="articleHeader3">touches</h2>
<p>一个<code>TouchList</code>对象，包含当前所有<strong>接触屏幕</strong>的触点的<code>Touch</code>对象，不论 touchstart 事件从哪个elment上触发。</p>
<h2 id="articleHeader4">targetTouches</h2>
<p>也是一个<code>TouchList</code>对象，包含了如下触点的 Touch 对象：touchstart从当前事件的目标element上触发</p>
<p><strong>这里大家可能产生了疑惑，这两个对象到底有什么区别？尤其是我们使用chrome模拟器中运行 demo,打印两个对象发现他们其实是一样的。</strong><br>这两个对象的区别可以类比<code>event.target</code>与<code>event.currentTarget</code> 的区别，如果以前没留意，自行 js 高级程序设计。</p>
<p>我们先看一个 demo2，来了解 touch 事件的特性。<br>在线编辑： <a href="http://jsrun.net/3XKKp" rel="nofollow noreferrer" target="_blank">http://jsrun.net/3XKKp</a><br>预览地址： <a href="http://jsrun.net/rtd/3XKKp" rel="nofollow noreferrer" target="_blank">http://jsrun.net/rtd/3XKKp</a></p>
<p>大家进行以下两个操作，观察控制台发现了什么？<br>操作一：一根手指触摸蓝色<code>box</code>，并滑动，继续滑动出蓝色<code>box</code><br>操作二：一根手指触摸非蓝色<code>box</code>区域，然后慢慢滑动到蓝色<code>box</code></p>
<blockquote><p>大家会发现：操作一中即使滑出蓝色<code>box</code>，而<code>touchmove</code>，<code>touchend</code>事件会继续触发，<code>touches</code>,<code>targetTouches</code>存储着相同的 Touch 对象，touchmove事件的目标元素仍然是box。<br>操作二中相关的 touch 事件都不会触发。很神奇的是 touchmove 事件，明明在 box 上滑动，却不会触发 touchmove 事件。</p></blockquote>
<p>我们可以猜测，touch相关的事件是一个整体，一开始touchstart不可能被触发，则后续touch事件也不会被触发。当然你可以不监听 touchstart 事件，按照操作一 touchmove，touchend 还是可以触发的。</p>
<p>再看下面这个demo2<br>在线编辑：<a href="http://jsrun.net/XXKKp" rel="nofollow noreferrer" target="_blank">http://jsrun.net/XXKKp</a><br>访问地址：<a href="http://jsrun.net/rtd/XXKKp" rel="nofollow noreferrer" target="_blank">http://jsrun.net/rtd/XXKKp</a></p>
<p>这里我们对白色区域<code>body</code>也添加了 touch 事件的监听，继续上述 demo1中的两个操作。<br>我们可以发现：</p>
<blockquote><p>操作一可以发现：touch 相关的事件可以冒泡，触发了 <code>box</code>,<code>body</code>的touch事件。操作二只能触发 body 的touch 事件，和demo1同理。</p></blockquote>
<p>我们可以观察下操作一的两个对象<code>TouchEvent.targetTouches</code>,<code>TouchEvent.touches</code>，无论是<code>box</code>还是<code>body</code>触发的 touch 事件，他们的存储的 Touch对象都是相同的，而且 target 都是 box。<br>接下来进行操作三：</p>
<blockquote><p>用两根手指，一根手指触摸蓝色<code>box</code>，另一根触摸白色区域，然后滑动。</p></blockquote>
<p>然后再次比较下<code>targetTouches</code>和<code>touches</code>，就可以发现他们的不同。</p>
<h2 id="articleHeader5">changedTouches</h2>
<p>也是一个 TouchList 对象，对于 touchstart 事件, 这个 TouchList 对象列出在此次事件中新增加的触点。对于 touchmove 事件，列出和上一次事件相比较，发生了变化的触点。对于 touchend ，列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）。</p>
<p><code>touchend</code>这里要特别注意，touches和targetTouches只存储接触屏幕的触点，要获取触点最后离开的状态要使用changedTouches。</p>
<p>之前也经常用<code>touches[0]</code>来获取Touch 对象，如果知道了 touches，targetTouches,changedTouches 的不同之处。在编写代码时可以更好的选择使用，程序也可以更严谨。</p>
<p>续篇想研究的问题：</p>
<ol>
<li><p>touchmove的触发频率问题</p></li>
<li><p>如何判定用户是快速滑动(swipe事件)</p></li>
<li><p>如何实现Tap</p></li>
<li><p>一些使用总结或最佳实践</p></li>
</ol>
<h2 id="articleHeader6">参考资料</h2>
<ul>
<li><p>MDN: <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent</a></p></li>
<li><p>js高级程序设计</p></li>
</ul>
<p>文中如理解有误，还请多多指出！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端 Touch 事件的使用与思考（1）

## 原文链接
[https://segmentfault.com/a/1190000005609334](https://segmentfault.com/a/1190000005609334)

