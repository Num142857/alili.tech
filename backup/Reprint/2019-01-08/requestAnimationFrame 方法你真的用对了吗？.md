---
title: 'requestAnimationFrame 方法你真的用对了吗？' 
date: 2019-01-08 2:30:11
hidden: true
slug: g4pfny6qfml
categories: [reprint]
---

{{< raw >}}

                    
<p><code>requestAnimationFrame</code> 方法让我们可以在下一帧开始时调用指定函数。但是很多人可能不知道，不管三七二十一直接在 <code>requestAnimationFrame</code> 的回调函数里绘制动画会有一个问题。是什么问题呢？要理解这个问题，我们先要了解 <code>requestAnimationFrame</code> 的一个知识点。</p>
<h2 id="articleHeader0">requestAnimationFrame 不管理回调函数</h2>
<p>这个知识点就是 <code>requestAnimationFrame</code> 不管理回调函数。这一点在 <a href="https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe" rel="nofollow noreferrer" target="_blank">w3c</a> 中明确说明了。</p>
<blockquote><p>Also note that multiple calls to requestAnimationFrame with the same callback (before callbacks are invoked and the list is cleared) will result in multiple entries being in the list with that same callback, and thus will result in that callback being invoked more than once for the animation frame.  <br>— <a href="https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe" rel="nofollow noreferrer" target="_blank">w3c</a></p></blockquote>
<p>即在回调被执行前，多次调用带有同一回调函数的 <code>requestAnimationFrame</code>，会导致回调在同一帧中执行多次。我们可以通过一个简单的例子模拟在同一帧内多次调用 <code>requestAnimationFrame</code> 的场景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const animation = timestamp => console.log('animation called at', timestamp)

window.requestAnimationFrame(animation)
window.requestAnimationFrame(animation)
// animation called at 320.7559999991645
// animation called at 320.7559999991645" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> animation = <span class="hljs-function"><span class="hljs-params">timestamp</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'animation called at'</span>, timestamp)

<span class="hljs-built_in">window</span>.requestAnimationFrame(animation)
<span class="hljs-built_in">window</span>.requestAnimationFrame(animation)
<span class="hljs-comment">// animation called at 320.7559999991645</span>
<span class="hljs-comment">// animation called at 320.7559999991645</span></code></pre>
<p>我们用连续调用两次 <code>requestAnimationFrame</code> 模拟在同一帧中调用两次 <code>requestAnimationFrame</code>。</p>
<p>例子中的 <code>timestamp</code> 是由 <code>requestAnimationFrame</code> 传给回调函数的，表示回调队列被触发的时间。由输出可知，<code>animation</code> 函数在同一帧内被执行了两次，即绘制了两次动画。然而在同一帧绘制两次动画很明显是多余的，相当于画了一幅画，然后再在这幅画上再画上同样的一幅画。</p>
<h2 id="articleHeader1">问题</h2>
<p>那么什么场景下，<code>requestAnimationFrame</code> 会在一帧内被多次调用呢？熟悉事件的同学应该马上能想到 <code>mousemove</code>, <code>scroll</code> 这类事件。</p>
<p>所以前面我们提到的问题就是：因为 <code>requestAnimationFrame</code> 不管理回调函数，在滚动、触摸这类<em>高触发频率</em>的事件回调里，如果调用 <code>requestAnimationFrame</code> 然后绘制动画，可能会造成多余的计算和绘制。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('scroll', e => {
    window.requestAnimationFrame(timestamp => {
        animation(timestamp)
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, e =&gt; {
    <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">timestamp</span> =&gt;</span> {
        animation(timestamp)
    })
})</code></pre>
<p>在上面代码中，<code>scroll</code> 事件可能在一帧内多次触发，所以 <code>animation</code> 函数可能会在一帧内重复绘制，造成不必要的计算和渲染。</p>
<h2 id="articleHeader2">解决方法</h2>
<p>对于这种高频发事件，一般的解决方法是使用节流函数。但是在这里使用节流函数并不能完美解决问题。因为节流函数是通过时间管理队列的，而 <code>requestAnimationFrame</code> 的触发时间是不固定的，在高刷新频率的显示屏上时间会小于 16.67ms，页面如果被推入后台，时间可能大于 16.67ms。</p>
<p>完美的解决方案是通过 <code>requestAnimationFrame</code> 来管理队列，其思路就是保证 <code>requestAnimationFrame</code> 的队列里，同样的回调函数只有一个。示意代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const onScroll = e => {
    if (scheduledAnimationFrame) { return }

    scheduledAnimationFrame = true
    window.requestAnimationFrame(timestamp => {
        scheduledAnimationFrame = false
        animation(timestamp)
    })
}
window.addEventListener('scroll', onScroll)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> onScroll = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (scheduledAnimationFrame) { <span class="hljs-keyword">return</span> }

    scheduledAnimationFrame = <span class="hljs-literal">true</span>
    <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">timestamp</span> =&gt;</span> {
        scheduledAnimationFrame = <span class="hljs-literal">false</span>
        animation(timestamp)
    })
}
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, onScroll)</code></pre>
<p>但是每次都要写这么一堆代码，也有点麻烦。所以我开源了 <a href="https://github.com/weiying-shenzhen/raf-plus" rel="nofollow noreferrer" target="_blank">raf-plus</a> 库用于解决这个问题，有需要的的同学可以用用~</p>
<h2 id="articleHeader3">结论</h2>
<p><code>requestAnimationFrame</code> 不管理回调函数队列，而滚动、触摸这类高触发频率事件的回调可能会在同一帧内触发多次。所以正确使用 <code>requestAnimationFrame</code> 的姿势是，在同一帧内可能调用多次 <code>requestAnimationFrame</code> 时，要管理回调函数，防止重复绘制动画。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
requestAnimationFrame 方法你真的用对了吗？

## 原文链接
[https://segmentfault.com/a/1190000010229232](https://segmentfault.com/a/1190000010229232)

