---
title: 'zepto touch 库源码分析' 
date: 2019-02-07 2:30:16
hidden: true
slug: kty1js1h3ed
categories: [reprint]
---

{{< raw >}}

                    
<p>所谓 zepto 的 touch 其实就是指<a href="https://github.com/madrobby/zepto/blob/master/src/touch.js" rel="nofollow noreferrer" target="_blank">这个文件</a>啦,可以看到区区 165 行（包括注释）就完成了 swipe 和 tap 相关的事件实现。在正式开始分析源码之前，我们先说说 touch 相关的几个事件，因为无论是 tap 还是 swipe 都是基于他们的。</p>
<h2 id="articleHeader0">touch 相关事件</h2>
<ol>
<li><p>touchstart 触摸屏幕的瞬间</p></li>
<li><p>touchmove 手指在屏幕上的移动过程一直触发</p></li>
<li><p>touchend 离开屏幕的瞬间</p></li>
<li><p>touchcancel 触摸取消（取决于浏览器实现，并不常用）</p></li>
</ol>
<p>触摸屏下事件触发顺序是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touchstart -> touchmove -> touchend -> click" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">touchstart</span> -&gt;</span> <span class="hljs-function"><span class="hljs-title">touchmove</span> -&gt;</span> <span class="hljs-function"><span class="hljs-title">touchend</span> -&gt;</span> click</code></pre>
<h2 id="articleHeader1">引入 touch 的背景</h2>
<p>click事件在移动端上会有 300ms 的延迟，同时因为需要 <code>长按</code>，<code>双触击</code> 等富交互，所以我们通常都会引入类似 zepto 这样的库。zepto 实现了<code>'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'</code> 这样一些功能。</p>
<h2 id="articleHeader2">zepto touch 源码</h2>
<p>我们直接看到 touch 源码的 49 行，从这里开始就是上述事件的实现了。不难想到 MSGesture 是对 mobile ie 的实现，本文不做讨论。往下面看到 66 行，<code>$(document).on('touchstart MSPointerDown pointerdown')</code> 开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断事件类型是否为 touch
if((_isPointerType = isPointerEventType(e, 'down')) &amp;&amp;
  !isPrimaryTouch(e)) return
// touches 是触摸点的数量
firstTouch = _isPointerType ? e : e.touches[0]
if (e.touches &amp;&amp; e.touches.length === 1 &amp;&amp; touch.x2) {
  touch.x2 = undefined
  touch.y2 = undefined
}
// 记录第一次触摸的时间
now = Date.now()
// 计算本次触摸与最后一次的时间差
delta = now - (touch.last || now)
// 查找 touch 事件的 dom 
touch.el = $('tagName' in firstTouch.target ?
  firstTouch.target : firstTouch.target.parentNode)
// 如果 touchTimeout 存在就清理掉
touchTimeout &amp;&amp; clearTimeout(touchTimeout)
// 记录当前坐标
touch.x1 = firstTouch.pageX
touch.y1 = firstTouch.pageY
// 触摸时间差小于 250ms 则为 DoubleTap
if (delta > 0 &amp;&amp; delta <= 250) touch.isDoubleTap = true
// 记录执行后的时间
touch.last = now
// 留一个长触摸，如果 touchmove 会把这个清理掉
longTapTimeout = setTimeout(longTap, longTapDelay)  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//判断事件类型是否为 touch</span>
<span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'down'</span>)) &amp;&amp;
  !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
<span class="hljs-comment">// touches 是触摸点的数量</span>
firstTouch = _isPointerType ? e : e.touches[<span class="hljs-number">0</span>]
<span class="hljs-keyword">if</span> (e.touches &amp;&amp; e.touches.length === <span class="hljs-number">1</span> &amp;&amp; touch.x2) {
  touch.x2 = <span class="hljs-literal">undefined</span>
  touch.y2 = <span class="hljs-literal">undefined</span>
}
<span class="hljs-comment">// 记录第一次触摸的时间</span>
now = <span class="hljs-built_in">Date</span>.now()
<span class="hljs-comment">// 计算本次触摸与最后一次的时间差</span>
delta = now - (touch.last || now)
<span class="hljs-comment">// 查找 touch 事件的 dom </span>
touch.el = $(<span class="hljs-string">'tagName'</span> <span class="hljs-keyword">in</span> firstTouch.target ?
  firstTouch.target : firstTouch.target.parentNode)
<span class="hljs-comment">// 如果 touchTimeout 存在就清理掉</span>
touchTimeout &amp;&amp; clearTimeout(touchTimeout)
<span class="hljs-comment">// 记录当前坐标</span>
touch.x1 = firstTouch.pageX
touch.y1 = firstTouch.pageY
<span class="hljs-comment">// 触摸时间差小于 250ms 则为 DoubleTap</span>
<span class="hljs-keyword">if</span> (delta &gt; <span class="hljs-number">0</span> &amp;&amp; delta &lt;= <span class="hljs-number">250</span>) touch.isDoubleTap = <span class="hljs-literal">true</span>
<span class="hljs-comment">// 记录执行后的时间</span>
touch.last = now
<span class="hljs-comment">// 留一个长触摸，如果 touchmove 会把这个清理掉</span>
longTapTimeout = setTimeout(longTap, longTapDelay)  </code></pre>
<p>接下来是 <code>$(document).on('touchmove MSPointerMove pointermove')</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断事件类型是否为 move
if((_isPointerType = isPointerEventType(e, 'move')) &amp;&amp;
          !isPrimaryTouch(e)) return
firstTouch = _isPointerType ? e : e.touches[0]
// 一旦进入 move 就会清理掉 LongTap
cancelLongTap()
// 当前手指坐标
touch.x2 = firstTouch.pageX
touch.y2 = firstTouch.pageY
// x 轴和 y 轴的变化量 Math.abs 是取绝对值的意思
deltaX += Math.abs(touch.x1 - touch.x2)
deltaY += Math.abs(touch.y1 - touch.y2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//判断事件类型是否为 move</span>
<span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'move'</span>)) &amp;&amp;
          !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
firstTouch = _isPointerType ? e : e.touches[<span class="hljs-number">0</span>]
<span class="hljs-comment">// 一旦进入 move 就会清理掉 LongTap</span>
cancelLongTap()
<span class="hljs-comment">// 当前手指坐标</span>
touch.x2 = firstTouch.pageX
touch.y2 = firstTouch.pageY
<span class="hljs-comment">// x 轴和 y 轴的变化量 Math.abs 是取绝对值的意思</span>
deltaX += <span class="hljs-built_in">Math</span>.abs(touch.x1 - touch.x2)
deltaY += <span class="hljs-built_in">Math</span>.abs(touch.y1 - touch.y2)</code></pre>
<p>最后当然就是 <code>$(document).on('touchend MSPointerUp pointerup')</code> 了，这个也是整个 touch 最为复杂的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if((_isPointerType = isPointerEventType(e, 'up')) &amp;&amp;
          !isPrimaryTouch(e)) return
        cancelLongTap()

    // 如果是 swipe，x 轴或者 y 轴移动超过 30px
    if ((touch.x2 &amp;&amp; Math.abs(touch.x1 - touch.x2) > 30) ||
        (touch.y2 &amp;&amp; Math.abs(touch.y1 - touch.y2) > 30))

      swipeTimeout = setTimeout(function() {
        touch.el.trigger('swipe')
        // swipeDirection 是判断 swipe 方向的
        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
        touch = {}
      }, 0)

    // tap 事件
    else if ('last' in touch)
      if (deltaX < 30 &amp;&amp; deltaY < 30) {
         // tapTimeout 是为了 scroll 的时候方便清除
        tapTimeout = setTimeout(function() {
          // 创建 tap 事件，并增加 cancelTouch 方法
          var event = $.Event('tap')
          event.cancelTouch = cancelAll
          touch.el.trigger(event)

          // 触发 DoubleTap
          if (touch.isDoubleTap) {
            if (touch.el) touch.el.trigger('doubleTap')
            touch = {}
          }

          // singleTap （这个概念是相对于 DoubleTap 的，可以看看我们在最初的那段源码解析中有这样一段 if (delta > 0 &amp;&amp; delta <= 250) touch.isDoubleTap = true ，所以 250 ms 之后没有二次触摸的就算是 singleTap 了 
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
      deltaX = deltaY = 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>((_isPointerType = isPointerEventType(e, <span class="hljs-string">'up'</span>)) &amp;&amp;
          !isPrimaryTouch(e)) <span class="hljs-keyword">return</span>
        cancelLongTap()

    <span class="hljs-comment">// 如果是 swipe，x 轴或者 y 轴移动超过 30px</span>
    <span class="hljs-keyword">if</span> ((touch.x2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.x1 - touch.x2) &gt; <span class="hljs-number">30</span>) ||
        (touch.y2 &amp;&amp; <span class="hljs-built_in">Math</span>.abs(touch.y1 - touch.y2) &gt; <span class="hljs-number">30</span>))

      swipeTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        touch.el.trigger(<span class="hljs-string">'swipe'</span>)
        <span class="hljs-comment">// swipeDirection 是判断 swipe 方向的</span>
        touch.el.trigger(<span class="hljs-string">'swipe'</span> + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
        touch = {}
      }, <span class="hljs-number">0</span>)

    <span class="hljs-comment">// tap 事件</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">'last'</span> <span class="hljs-keyword">in</span> touch)
      <span class="hljs-keyword">if</span> (deltaX &lt; <span class="hljs-number">30</span> &amp;&amp; deltaY &lt; <span class="hljs-number">30</span>) {
         <span class="hljs-comment">// tapTimeout 是为了 scroll 的时候方便清除</span>
        tapTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// 创建 tap 事件，并增加 cancelTouch 方法</span>
          <span class="hljs-keyword">var</span> event = $.Event(<span class="hljs-string">'tap'</span>)
          event.cancelTouch = cancelAll
          touch.el.trigger(event)

          <span class="hljs-comment">// 触发 DoubleTap</span>
          <span class="hljs-keyword">if</span> (touch.isDoubleTap) {
            <span class="hljs-keyword">if</span> (touch.el) touch.el.trigger(<span class="hljs-string">'doubleTap'</span>)
            touch = {}
          }

          <span class="hljs-comment">// singleTap （这个概念是相对于 DoubleTap 的，可以看看我们在最初的那段源码解析中有这样一段 if (delta &gt; 0 &amp;&amp; delta &lt;= 250) touch.isDoubleTap = true ，所以 250 ms 之后没有二次触摸的就算是 singleTap 了 </span>
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
      deltaX = deltaY = <span class="hljs-number">0</span></code></pre>
<p>整个读下来其实就是对 touchstart, touchmove, touchend 做了一些封装和判断，然后通过 zepto 自己的事件体系来注册和触发。</p>
<h2 id="articleHeader3">fastclick 对比 zepto</h2>
<p>我们在聊到移动端 js 方案的时候很容易听到这两者，但我个人认为这两者是无法对比的。原因如下：zepto 是一个移动端的 js 库，而 fastclick 专注于 click 在移动端的触发问题。fastclick 的 github 主页上有一句话是“Polyfill to remove click delays on browsers with touch UIs”，翻译过来就是干掉移动端 click 延时的补丁。这个延时就是我们在引入 touch 的背景里提到过。</p>
<h2 id="articleHeader4">fastclick 源码分析</h2>
<p>不愿意下代码的可以直接点这里<a href="https://github.com/ftlabs/fastclick" rel="nofollow noreferrer" target="_blank">github地址</a>首先赞一下 fastclick 的代码注释，非常全。</p>
<p>fastclick 的使用非常简单，直接 <code>FastClick.attach(document.body);</code> 一句话搞定。所以源码分析就从 attach 方法来看吧，824 行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    FastClick.attach = function(layer, options) {
        // 返回 FastClick 实例 layer 是一个 element 通常是 document.body ，options 自然就是配置了
        return new FastClick(layer, options);
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    FastClick.attach = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">layer, options</span>) </span>{
        <span class="hljs-comment">// 返回 FastClick 实例 layer 是一个 element 通常是 document.body ，options 自然就是配置了</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> FastClick(layer, options);
    };</code></pre>
<p>接下来回到 23 行看到 FastClick 构造函数，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 方法绑定，兼容老版本的安卓
function bind(method, context) {
    return function() { return method.apply(context, arguments); };
}

var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
var context = this;
for (var i = 0, l = methods.length; i < l; i++) {
    context[methods[i]] = bind(context[methods[i]], context);
}
 // 事件处理绑定部分
if (deviceIsAndroid) {
    layer.addEventListener('mouseover', this.onMouse, true);
    layer.addEventListener('mousedown', this.onMouse, true);
    layer.addEventListener('mouseup', this.onMouse, true);
}

layer.addEventListener('click', this.onClick, true);
layer.addEventListener('touchstart', this.onTouchStart, false);
layer.addEventListener('touchmove', this.onTouchMove, false);
layer.addEventListener('touchend', this.onTouchEnd, false);
layer.addEventListener('touchcancel', this.onTouchCancel, false);

 // stopImmediatePropagation 的兼容
 
 if (!Event.prototype.stopImmediatePropagation) {
    layer.removeEventListener = function(type, callback, capture) {
        var rmv = Node.prototype.removeEventListener;
        if (type === 'click') {
            rmv.call(layer, type, callback.hijacked || callback, capture);
        } else {
            rmv.call(layer, type, callback, capture);
        }
    };

    layer.addEventListener = function(type, callback, capture) {
        var adv = Node.prototype.addEventListener;
        if (type === 'click') {
            adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                if (!event.propagationStopped) {
                    callback(event);
                }
            }), capture);
        } else {
            adv.call(layer, type, callback, capture);
        }
    };
}

// 如果 layer 有 onclick ，就把 onclick 转换为 addEventListener 的方式
if (typeof layer.onclick === 'function') {
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function(event) {
        oldOnClick(event);
    }, false);
    layer.onclick = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">// 方法绑定，兼容老版本的安卓</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bind</span>(<span class="hljs-params">method, context</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> method.apply(context, <span class="hljs-built_in">arguments</span>); };
}

<span class="hljs-keyword">var</span> methods = [<span class="hljs-string">'onMouse'</span>, <span class="hljs-string">'onClick'</span>, <span class="hljs-string">'onTouchStart'</span>, <span class="hljs-string">'onTouchMove'</span>, <span class="hljs-string">'onTouchEnd'</span>, <span class="hljs-string">'onTouchCancel'</span>];
<span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = methods.length; i &lt; l; i++) {
    context[methods[i]] = bind(context[methods[i]], context);
}
 <span class="hljs-comment">// 事件处理绑定部分</span>
<span class="hljs-keyword">if</span> (deviceIsAndroid) {
    layer.addEventListener(<span class="hljs-string">'mouseover'</span>, <span class="hljs-keyword">this</span>.onMouse, <span class="hljs-literal">true</span>);
    layer.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-keyword">this</span>.onMouse, <span class="hljs-literal">true</span>);
    layer.addEventListener(<span class="hljs-string">'mouseup'</span>, <span class="hljs-keyword">this</span>.onMouse, <span class="hljs-literal">true</span>);
}

layer.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick, <span class="hljs-literal">true</span>);
layer.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-keyword">this</span>.onTouchStart, <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.onTouchMove, <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchend'</span>, <span class="hljs-keyword">this</span>.onTouchEnd, <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchcancel'</span>, <span class="hljs-keyword">this</span>.onTouchCancel, <span class="hljs-literal">false</span>);

 <span class="hljs-comment">// stopImmediatePropagation 的兼容</span>
 
 <span class="hljs-keyword">if</span> (!Event.prototype.stopImmediatePropagation) {
    layer.removeEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, callback, capture</span>) </span>{
        <span class="hljs-keyword">var</span> rmv = Node.prototype.removeEventListener;
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'click'</span>) {
            rmv.call(layer, type, callback.hijacked || callback, capture);
        } <span class="hljs-keyword">else</span> {
            rmv.call(layer, type, callback, capture);
        }
    };

    layer.addEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, callback, capture</span>) </span>{
        <span class="hljs-keyword">var</span> adv = Node.prototype.addEventListener;
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'click'</span>) {
            adv.call(layer, type, callback.hijacked || (callback.hijacked = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
                <span class="hljs-keyword">if</span> (!event.propagationStopped) {
                    callback(event);
                }
            }), capture);
        } <span class="hljs-keyword">else</span> {
            adv.call(layer, type, callback, capture);
        }
    };
}

<span class="hljs-comment">// 如果 layer 有 onclick ，就把 onclick 转换为 addEventListener 的方式</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> layer.onclick === <span class="hljs-string">'function'</span>) {
    oldOnClick = layer.onclick;
    layer.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        oldOnClick(event);
    }, <span class="hljs-literal">false</span>);
    layer.onclick = <span class="hljs-literal">null</span>;
}</code></pre>
<p>FastClick.prototype.onTouchStart 和 zepto 一样做了一些参数的纪录，所以我这里就直接跳到 FastClick.prototype.onTouchEnd 看 fastclick 的核心。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FastClick.prototype.onTouchEnd = function(event) {
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

    if (!this.trackingClick) {
        return true;
    }
    // 防止 double tap 的时间间隔内 click 触发
    if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
        this.cancelNextClick = true;
        return true;
    }
    // 超出 longtap 的时间
    if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
        return true;
    }

    this.cancelNextClick = false;
    // 纪录当前时间
    this.lastClickTime = event.timeStamp;

    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;

    if (deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }
    // 获取 targetTagName 上面的一段是 targetTagName 兼容性
    targetTagName = targetElement.tagName.toLowerCase();
    // 解决 label for
    if (targetTagName === 'label') {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (deviceIsAndroid) {
                return false;
            }

            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) {
        if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS &amp;&amp; window.top !== window &amp;&amp; targetTagName === 'input')) {
            this.targetElement = null;
            return false;
        }
        // 解决 input focus 
        this.focus(targetElement);
        // 触发 sendClick
        this.sendClick(targetElement, event);

        if (!deviceIsIOS || targetTagName !== 'select') {
            this.targetElement = null;
            event.preventDefault();
        }

        return false;
    }

    if (deviceIsIOS &amp;&amp; !deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent &amp;&amp; scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            return true;
        }
    }
    // 最后就来触发 sendClick 了
    if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event);
    }

    return false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">FastClick.prototype.onTouchEnd = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = <span class="hljs-keyword">this</span>.targetElement;

    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.trackingClick) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">// 防止 double tap 的时间间隔内 click 触发</span>
    <span class="hljs-keyword">if</span> ((event.timeStamp - <span class="hljs-keyword">this</span>.lastClickTime) &lt; <span class="hljs-keyword">this</span>.tapDelay) {
        <span class="hljs-keyword">this</span>.cancelNextClick = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">// 超出 longtap 的时间</span>
    <span class="hljs-keyword">if</span> ((event.timeStamp - <span class="hljs-keyword">this</span>.trackingClickStart) &gt; <span class="hljs-keyword">this</span>.tapTimeout) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-keyword">this</span>.cancelNextClick = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// 纪录当前时间</span>
    <span class="hljs-keyword">this</span>.lastClickTime = event.timeStamp;

    trackingClickStart = <span class="hljs-keyword">this</span>.trackingClickStart;
    <span class="hljs-keyword">this</span>.trackingClick = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.trackingClickStart = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">if</span> (deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[<span class="hljs-number">0</span>];
        targetElement = <span class="hljs-built_in">document</span>.elementFromPoint(touch.pageX - <span class="hljs-built_in">window</span>.pageXOffset, touch.pageY - <span class="hljs-built_in">window</span>.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = <span class="hljs-keyword">this</span>.targetElement.fastClickScrollParent;
    }
    <span class="hljs-comment">// 获取 targetTagName 上面的一段是 targetTagName 兼容性</span>
    targetTagName = targetElement.tagName.toLowerCase();
    <span class="hljs-comment">// 解决 label for</span>
    <span class="hljs-keyword">if</span> (targetTagName === <span class="hljs-string">'label'</span>) {
        forElement = <span class="hljs-keyword">this</span>.findControl(targetElement);
        <span class="hljs-keyword">if</span> (forElement) {
            <span class="hljs-keyword">this</span>.focus(targetElement);
            <span class="hljs-keyword">if</span> (deviceIsAndroid) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }

            targetElement = forElement;
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.needsFocus(targetElement)) {
        <span class="hljs-keyword">if</span> ((event.timeStamp - trackingClickStart) &gt; <span class="hljs-number">100</span> || (deviceIsIOS &amp;&amp; <span class="hljs-built_in">window</span>.top !== <span class="hljs-built_in">window</span> &amp;&amp; targetTagName === <span class="hljs-string">'input'</span>)) {
            <span class="hljs-keyword">this</span>.targetElement = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">// 解决 input focus </span>
        <span class="hljs-keyword">this</span>.focus(targetElement);
        <span class="hljs-comment">// 触发 sendClick</span>
        <span class="hljs-keyword">this</span>.sendClick(targetElement, event);

        <span class="hljs-keyword">if</span> (!deviceIsIOS || targetTagName !== <span class="hljs-string">'select'</span>) {
            <span class="hljs-keyword">this</span>.targetElement = <span class="hljs-literal">null</span>;
            event.preventDefault();
        }

        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">if</span> (deviceIsIOS &amp;&amp; !deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;
        <span class="hljs-keyword">if</span> (scrollParent &amp;&amp; scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }
    <span class="hljs-comment">// 最后就来触发 sendClick 了</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.needsClick(targetElement)) {
        event.preventDefault();
        <span class="hljs-keyword">this</span>.sendClick(targetElement, event);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};</code></pre>
<p>看完上面的代码，我们马上来解读 FastClick.prototype.sendClick</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FastClick.prototype.sendClick = function(targetElement, event) {
    var clickEvent, touch;
    // 拿触摸的第一个手指
    touch = event.changedTouches[0];
    // 自定义 clickEvent 事件
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    // 触发 clickEvent 事件
    targetElement.dispatchEvent(clickEvent);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">FastClick.prototype.sendClick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">targetElement, event</span>) </span>{
    <span class="hljs-keyword">var</span> clickEvent, touch;
    <span class="hljs-comment">// 拿触摸的第一个手指</span>
    touch = event.changedTouches[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// 自定义 clickEvent 事件</span>
    clickEvent = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'MouseEvents'</span>);
    clickEvent.initMouseEvent(<span class="hljs-keyword">this</span>.determineEventType(targetElement), <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-built_in">window</span>, <span class="hljs-number">1</span>, touch.screenX, touch.screenY, touch.clientX, touch.clientY, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);
    clickEvent.forwardedTouchEvent = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// 触发 clickEvent 事件</span>
    targetElement.dispatchEvent(clickEvent);
};</code></pre>
<p>到此 fastclick 主要的东西我们就看得差不多了，代码当中不难看到 fastclick 的兼容性做的很好。它的主要目的是解决 click 在触摸屏下的使用，引入之后再初始化一次就好了，很适合复用代码的情景。</p>
<h2 id="articleHeader5">扩展讲一下 touchEvent</h2>
<p>本文中 zepto 和 fastclick 都有用到 touchEvent，但是 zepto 当中用的是 <code>e.touches</code> 而 fastclick 却用的是 <code>e.targetTouches</code>。这两者的差异我们来一点一点地扒。</p>
<p>TouchEvent 是一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件。这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等。</p>
<p>属性：</p>
<ol>
<li><p><code>TouchEvent.changedTouches</code> 一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，状态发生了改变的触点的 Touch 对象。</p></li>
<li><p><code>TouchEvent.targetTouches</code> 一个 TouchList 对象，是包含了如下触点的 Touch 对象：触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点.</p></li>
<li><p><code>TouchEvent.touches</code> 一个 TouchList 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化。</p></li>
<li><p><code>TouchEvent.type</code> 此次触摸事件的类型，可能值为 touchstart, touchmove, touchend 等等</p></li>
<li><p><code>TouchEvent.target</code> 触摸事件的目标 element，这个目标元素对应 <code>TouchEvent.changedTouches</code> 中的触点的起始元素。</p></li>
<li><p><code>TouchEvent.altKey, TouchEvent.ctrlKey, TouchEvent.metaKey, TouchEvent.shiftKey</code> 触摸事件触发时，键盘对应的键（例如 alt ）是否被按下。</p></li>
</ol>
<h3 id="articleHeader6">TouchList 与 Touch</h3>
<p>TouchList 就是一系列的 Touch，通过 <code>TouchList.length</code> 可以知道当前有几个触点，<code>TouchList[0]</code> 或者 <code>TouchList.item(0)</code> 用来访问第一个触点。</p>
<p>属性</p>
<ol>
<li><p><code>Touch.identifier</code>：touch 的唯一标志，整个 touch 过程中（也就是 end 之前）不会改变</p></li>
<li><p><code>Touch.screenX</code> 和 <code>Touch.screenY</code>：坐标原点为屏幕左上角</p></li>
<li><p><code>Touch.clientX</code> 和 <code>Touch.clientY</code>：坐标原点在当前可视区域左上角，这两个值不包含滚动偏移</p></li>
<li><p><code>Touch.pageX</code> 和 <code>Touch.pageY</code>：坐标原点在HTML文档左上角，这两个值包含了水平滚动的偏移</p></li>
<li><p><code>Touch.radiusX</code> 和 <code>Touch.radiusY</code>：触摸平面的最小椭圆的水平轴(X轴)半径和垂直轴(Y轴)半径</p></li>
<li><p><code>Touch.rotationAngle</code>：触摸平面的最小椭圆与水平轴顺时针夹角</p></li>
<li><p><code>Touch.force</code>：压力值 0.0-1.0</p></li>
<li><p><code>Touch.target</code>：Touch相关事件触发时的 element 不会随 move 变化。如果 move 当中该元素被删掉，这个 target 依然会不变，但不会冒泡。最佳实践是将触摸事件的监听器绑定到这个元素本身, 防止元素被移除后, 无法再从它的上一级元素上侦测到从该元素冒泡的事件。</p></li>
</ol>
<p>希望本文能解答一些大家在移动端开发当中的一些问题，本文行文匆忙如有不正确的地方希望能回复告知。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
zepto touch 库源码分析

## 原文链接
[https://segmentfault.com/a/1190000005882908](https://segmentfault.com/a/1190000005882908)

