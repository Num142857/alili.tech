---
title: 'RxJS 实战篇（一）拖拽' 
date: 2019-01-11 2:30:08
hidden: true
slug: wkvrs78zbb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文最初发布于我的个人博客：<a href="http://jerryzou.com/posts/vscode-debug-guide/" rel="nofollow noreferrer" target="_blank">咀嚼之味</a></p></blockquote>
<p>面对交互性很强、数据变化复杂的场景，传统的前端开发方式往往存在一些共有的问题：<strong>1).</strong> UI 状态与数据难以追踪；<strong>2).</strong> 写出的代码可读性很差，逻辑代码分布离散。</p>
<p>相比之下，响应式编程（Reactive Programming）在解决此类问题上有着得天独厚的优势。Vue、Mobx、RxJS 这些库都是响应式编程思想的结晶。</p>
<p>很多人在接触到 RxJS 后会有一个共同的感觉：这个库虽然很强大，但奈何各种各样的 operators 太多了，在实际场景中根本不知道怎么运用！所以本文并不旨在阐释响应式编程的优越性，而是通过循序渐进的实例来展示 RxJS 常用 operators 的使用场景。如果你尚未入门 RxJS，推荐你可以先看看一位来自台湾的前端工程师 Jerry Hong 写的 <a href="http://ithelp.ithome.com.tw/articles/10186103" rel="nofollow noreferrer" target="_blank">30 天精通 RxJS 系列</a>。不要被三十天这个标题给吓到啦，如果你有一些函数式编程的经验的话，周末花一天时间就能看完。当然要加深对 RxJS 的理解还是得多多实战。毕竟实践出真知嘛！</p>
<p>本文不适合 <strong>未入门的新手</strong> 与 <strong>已精通的高手</strong>。如果你觉得你对 RxJS 有了初步的认识，但掌握程度不高，可能这篇文章就比较适合你了。你可以尝试跟着本文的三个实例自己先做做看，再对比一下本文给出的解决方案，相信你能对 RxJS 有更深入的理解。注意，本文给出的解决方案并不一定是最优的解决方案，如果你有什么改进的建议，可以在文末留言，谢谢！</p>
<h2 id="articleHeader0">1. 简单的拖拽</h2>
<blockquote><p><strong>需求</strong>：给定一个小方块，实现简单的拖拽功能，要求鼠标在小方块上按下后能够拖着小方块进行移动；鼠标放开后，则运动停止。</p></blockquote>
<p>要实现一个简单的拖拽，需要对 <code>mousedown</code>, <code>mousemove</code>, <code>mouseup</code> 等多个事件进行观察，并相应地改变小方块的位置。</p>
<p>首先分析一下，为了相应地移动小方块，我们需要知道的信息有：<strong>1).</strong> 小方块被拖拽时的初始位置；<strong>2).</strong> 小方块在被拖拽着移动时，需要移动到的新位置。通过 Marble Diagram 来描述一下我们的原始流与想要得到的流，其中最下面这个流就是我们想要用于更新小方块位置的流。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown   : --d----------------------d---------
mousemove   : -m--m-m-m--m--m---m-m-------m-m-m--
mouseup     : ---------u---------------------u---

dragUpdate  : ----m-m-m-------------------m-m----" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">mousedown</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
<span class="hljs-comment">mousemove</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
<span class="hljs-comment">mouseup</span>     <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">u</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">u</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>

<span class="hljs-comment">dragUpdate</span>  <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span></code></pre>
<p>简而言之，就是在一次 <code>mousedown</code> 和 <code>mouseup</code> 之间触发 <code>mousemove</code> 时，更新小方块的位置。要做到这一点，最重要的操作符是 <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil" rel="nofollow noreferrer" target="_blank"><strong>takeUntil</strong></a>，相关的伪代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown.switchMap(() => mousemove.takeUntil(mouseup))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">mousedown.switchMap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> mousemove.takeUntil(mouseup))</code></pre>
<p>将 <strong>switchMap</strong> 和 <strong>takeUntil</strong> 加入上面的 Marble Diagram：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown  : --d----------------------d---------
mousemove  : -m--m-m-m--m--m---m-m-------m-m-m--
mouseup    : ---------u---------------------u---
     
   stream1$ = mousedown.map(() => mousemove.takeUntil(mouseup))

stream1$   : --d----------------------d---------
                \                      \
                 m-m-m|                 -m-m|
   
   dragUpdate = stream1$.switch()

dragUpdate : ----m-m-m-------------------m-m----" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">mousedown</span>  <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
<span class="hljs-comment">mousemove</span>  <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
<span class="hljs-comment">mouseup</span>    <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">u</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">u</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
     
   <span class="hljs-comment">stream1$</span> <span class="hljs-comment">=</span> <span class="hljs-comment">mousedown</span><span class="hljs-string">.</span><span class="hljs-comment">map(()</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">mousemove</span><span class="hljs-string">.</span><span class="hljs-comment">takeUntil(mouseup))</span>

<span class="hljs-comment">stream1$</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
                <span class="hljs-comment">\</span>                      <span class="hljs-comment">\</span>
                 <span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m|</span>                 <span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m|</span>
   
   <span class="hljs-comment">dragUpdate</span> <span class="hljs-comment">=</span> <span class="hljs-comment">stream1$</span><span class="hljs-string">.</span><span class="hljs-comment">switch()</span>

<span class="hljs-comment">dragUpdate</span> <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span></code></pre>
<p>其实 <strong>switchMap</strong> 就是 <strong>map + switch</strong> 组合的简写形式。当然，我们还需要同时记录一下初始位置并根据鼠标移动的距离来更新小方块的位置，实际的实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const box = document.getElementById('box')
const mouseDown$ = Rx.Observable.fromEvent(box, 'mousedown')
const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')

mouseDown$.map((event) => ({
  pos: getTranslate(box),
  event,
}))
.switchMap((initialState) => {
  const initialPos = initialState.pos
  const { clientX, clientY } = initialState.event
  return mouseMove$.map((moveEvent) => ({
    x: moveEvent.clientX - clientX + initialPos.x,
    y: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$)
})
.subscribe((pos) => {
  setTranslate(box, pos)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>)
<span class="hljs-keyword">const</span> mouseDown$ = Rx.Observable.fromEvent(box, <span class="hljs-string">'mousedown'</span>)
<span class="hljs-keyword">const</span> mouseMove$ = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">'mousemove'</span>)
<span class="hljs-keyword">const</span> mouseUp$ = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">'mouseup'</span>)

mouseDown$.map(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> ({
  <span class="hljs-attr">pos</span>: getTranslate(box),
  event,
}))
.switchMap(<span class="hljs-function">(<span class="hljs-params">initialState</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> initialPos = initialState.pos
  <span class="hljs-keyword">const</span> { clientX, clientY } = initialState.event
  <span class="hljs-keyword">return</span> mouseMove$.map(<span class="hljs-function">(<span class="hljs-params">moveEvent</span>) =&gt;</span> ({
    <span class="hljs-attr">x</span>: moveEvent.clientX - clientX + initialPos.x,
    <span class="hljs-attr">y</span>: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$)
})
.subscribe(<span class="hljs-function">(<span class="hljs-params">pos</span>) =&gt;</span> {
  setTranslate(box, pos)
})</code></pre>
<p>其中，<code>getTranslate</code> 和 <code>setTranslate</code> 主要作用就是获取和更新小方块的位置。具体实现可以参见 <a href="https://codepen.io/jerryzou/pen/XgppaN" rel="nofollow noreferrer" target="_blank">Codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="jerryzou/pen/XgppaN" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">2. 添加初始延迟</h2>
<blockquote><p><strong>需求</strong>：在拖拽的实际应用中，有时会希望有个初始延迟。就像手机屏幕上的诸多 App 图标，在你想要拖拽它们进行排序时，通常需要按住图标一小段时间，比如 <strong>200ms</strong>（如下图所示），这时该如何操作呢？</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVPFMT?w=187&amp;h=333" src="https://static.alili.tech/img/bVPFMT?w=187&amp;h=333" alt="iPhone-drag" title="iPhone-drag" style="cursor: pointer; display: inline;"></span></p>
<p>为了演示方便，这里我们先定义一个简单的动画，当用户鼠标按下超过一定时间后，播放一个闪烁动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blink {
  animation: 0.4s linear blinking;
}

@keyframes blinking {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.blink</span> {
  <span class="hljs-attribute">animation</span>: <span class="hljs-number">0.4s</span> linear blinking;
}

@<span class="hljs-keyword">keyframes</span> blinking {
  0% { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; }
  50% { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; }
  100% { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; }
}</code></pre>
<p>此处我们只做一个简单的实现：在用户鼠标按下时间超过 200ms 且在这 200ms 的时间内没有发生鼠标移动时，认为拖拽开始。伪代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown.switchMap(() => $$.delay(200).takeUntil(mousemove))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">mousedown.switchMap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $$.delay(<span class="hljs-number">200</span>).takeUntil(mousemove))</code></pre>
<p>其中，上面的 <code>$$</code> 指的是一个新创建的流。为了得到更直观的理解，使用多个 Marble Diagram 来分段理解之前的伪代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown   : --d----------------------d---------
mousemove   : -m---m----m--------m-------------m-

   stream1$ = mousedown.map(() => $$.delay(200).takeUntil(mousemove))

stream1$    : --d----------------------d---------
                 \                      \
                  -|                     ----s|

   dragStart = mousedown.switchMap(() => $$.delay(200).takeUntil(mousemove))

dragStart   : -------------------------------s----" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">mousedown</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
<span class="hljs-comment">mousemove</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span>

   <span class="hljs-comment">stream1$</span> <span class="hljs-comment">=</span> <span class="hljs-comment">mousedown</span><span class="hljs-string">.</span><span class="hljs-comment">map(()</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">$$</span><span class="hljs-string">.</span><span class="hljs-comment">delay(200)</span><span class="hljs-string">.</span><span class="hljs-comment">takeUntil(mousemove))</span>

<span class="hljs-comment">stream1$</span>    <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
                 <span class="hljs-comment">\</span>                      <span class="hljs-comment">\</span>
                  <span class="hljs-literal">-</span><span class="hljs-comment">|</span>                     <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">s|</span>

   <span class="hljs-comment">dragStart</span> <span class="hljs-comment">=</span> <span class="hljs-comment">mousedown</span><span class="hljs-string">.</span><span class="hljs-comment">switchMap(()</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">$$</span><span class="hljs-string">.</span><span class="hljs-comment">delay(200)</span><span class="hljs-string">.</span><span class="hljs-comment">takeUntil(mousemove))</span>

<span class="hljs-comment">dragStart</span>   <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">s</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span></code></pre>
<p>在第一次鼠标按下的 200ms 内，触发了 <code>mousemove</code> 事件，所以第一次 <code>mousedown</code> 并没有触发一次 <strong>dragStart</strong>，而在第二次鼠标按下的 200ms 内，并没有触发 <code>mousemove</code> 事件，所以最后就引起了一次 <strong>dragStart</strong>。</p>
<p>结合之前的简单拖拽的实现，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mouseDown$.switchMap((event) => {
  return Rx.Observable.of({
    pos: getTranslate(box),
    event,
  })
  .delay(200)
  .takeUntil(mouseMove$)
})
.switchMap((initialState) => {
  const initialPos = initialState.pos
  const { clientX, clientY } = initialState.event
  box.classList.add('blink')
  return mouseMove$.map((moveEvent) => ({
    x: moveEvent.clientX - clientX + initialPos.x,
    y: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$.do(() => box.classList.remove('blink')))
})
.subscribe((pos) => {
  setTranslate(box, pos)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mouseDown$.switchMap(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> Rx.Observable.of({
    <span class="hljs-attr">pos</span>: getTranslate(box),
    event,
  })
  .delay(<span class="hljs-number">200</span>)
  .takeUntil(mouseMove$)
})
.switchMap(<span class="hljs-function">(<span class="hljs-params">initialState</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> initialPos = initialState.pos
  <span class="hljs-keyword">const</span> { clientX, clientY } = initialState.event
  box.classList.add(<span class="hljs-string">'blink'</span>)
  <span class="hljs-keyword">return</span> mouseMove$.map(<span class="hljs-function">(<span class="hljs-params">moveEvent</span>) =&gt;</span> ({
    <span class="hljs-attr">x</span>: moveEvent.clientX - clientX + initialPos.x,
    <span class="hljs-attr">y</span>: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$.<span class="hljs-keyword">do</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> box.classList.remove(<span class="hljs-string">'blink'</span>)))
})
.subscribe(<span class="hljs-function">(<span class="hljs-params">pos</span>) =&gt;</span> {
  setTranslate(box, pos)
})</code></pre>
<p>其中，多了两句操作 <code>#box</code> 的 classname 的代码，主要就是用于触发动画的。完整代码见 <a href="https://codepen.io/jerryzou/pen/bRgOdN?editors=0110" rel="nofollow noreferrer" target="_blank">Codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="jerryzou/pen/bRgOdN" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader2">3. 拖拽接龙</h2>
<blockquote><p>需求：给定 n 个小方块，要求拖拽第一个小方块进行移动，后续的小方块能够以间隔 0.1s 的时间跟着之前的小方块进行延迟模仿运动。</p></blockquote>
<p>此例中，我们不再要求“初始延迟”，因此针对正在拖拽着的红色小方块，只要沿用第一个例子中的简单拖拽的方法，即可获取我们需要改变方块位置的事件流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown.switchMap(() => mousemove.takeUntil(mouseup))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">mousedown.switchMap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> mousemove.takeUntil(mouseup))</code></pre>
<p>然而我们该如何依次修改多个方块的位置呢？首先，可以先构造一个流来按延迟时间依次取得我们想要改变的小方块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取所有小方块，图示的例子中给出的是 7 个小方块
const boxes = document.getElementsByClassName('box')

// 使用 zip 操作符构造一个由 boxes 组成的流
const boxes$ = Rx.Observable.from([].slice.call(boxes, 0))
const delayBoxes$ = boxes$.zip(Rx.Observable.interval(100).startWith(0), (box) => box)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取所有小方块，图示的例子中给出的是 7 个小方块</span>
<span class="hljs-keyword">const</span> boxes = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'box'</span>)

<span class="hljs-comment">// 使用 zip 操作符构造一个由 boxes 组成的流</span>
<span class="hljs-keyword">const</span> boxes$ = Rx.Observable.from([].slice.call(boxes, <span class="hljs-number">0</span>))
<span class="hljs-keyword">const</span> delayBoxes$ = boxes$.zip(Rx.Observable.interval(<span class="hljs-number">100</span>).startWith(<span class="hljs-number">0</span>), (box) =&gt; box)</code></pre>
<p>假定 7 个 boxes 在 Marble Diagram 中分别表示为 <code>a</code>, <code>b</code>, <code>c</code>, <code>d</code>, <code>e</code>, <code>f</code>, <code>g</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="boxes$          : (abcdefg)|
interval(100)   : 0---0---1---2---3---4---5---6---7---8---

   delayBoxes$ = boxes$.zip(Rx.Observable.interval(100).startWith(0), (box) => box)

delayBoxes$     : a---b---c---d---e---f---g|" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">boxes$</span>          <span class="hljs-comment">:</span> <span class="hljs-comment">(abcdefg)|</span>
<span class="hljs-comment">interval(100)</span>   <span class="hljs-comment">:</span> <span class="hljs-comment">0</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">0</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">1</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">2</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">3</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">4</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">5</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">6</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">7</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">8</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>

   <span class="hljs-comment">delayBoxes$</span> <span class="hljs-comment">=</span> <span class="hljs-comment">boxes$</span><span class="hljs-string">.</span><span class="hljs-comment">zip(Rx</span><span class="hljs-string">.</span><span class="hljs-comment">Observable</span><span class="hljs-string">.</span><span class="hljs-comment">interval(100)</span><span class="hljs-string">.</span><span class="hljs-comment">startWith(0)</span><span class="hljs-string">,</span> <span class="hljs-comment">(box)</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">box)</span>

<span class="hljs-comment">delayBoxes$</span>     <span class="hljs-comment">:</span> <span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span></code></pre>
<p>只要将原本用于修改方块位置的 mousemove 事件流 mergeMap 到上面例子中的 delayBoxes$ 上，即可完成“拖拽接龙”。伪代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mousedown.switchMap(() => mousemove.takeUntil(mouseup))
  .mergeMap(() => delayBoxes$.do(() => { /* 此处更新各个小方块的位置 */ }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mousedown.switchMap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> mousemove.takeUntil(mouseup))
  .mergeMap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> delayBoxes$.<span class="hljs-keyword">do</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* 此处更新各个小方块的位置 */</span> }))</code></pre>
<p>让我们继续着眼于 Marble Diagram：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delayBoxes$     : ---a---b---c---d---e---f---g|
dragUpdate$     : -----m--------m----------m-------

   stream1$ = dragUpdate$.map(() => delayBoxes$)

stream1$        : -----m-------m----------m-------
                        \       \          \
                         \       \          a---b---c---d---e---f---g|
                          \       a---b---c---d---e---f---g|
                           a---b---c---d---e---f---g|

   result$ = dragUpdate$.mergeMap(() => delayBoxes$)

result$         : ---------a---b--ac--bd--cea-dfb-egc-f-d-g-e---f---g|" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">delayBoxes$</span>     <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span>
<span class="hljs-comment">dragUpdate$</span>     <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>

   <span class="hljs-comment">stream1$</span> <span class="hljs-comment">=</span> <span class="hljs-comment">dragUpdate$</span><span class="hljs-string">.</span><span class="hljs-comment">map(()</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">delayBoxes$)</span>

<span class="hljs-comment">stream1$</span>        <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">m</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
                        <span class="hljs-comment">\</span>       <span class="hljs-comment">\</span>          <span class="hljs-comment">\</span>
                         <span class="hljs-comment">\</span>       <span class="hljs-comment">\</span>          <span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span>
                          <span class="hljs-comment">\</span>       <span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span>
                           <span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span>

   <span class="hljs-comment">result$</span> <span class="hljs-comment">=</span> <span class="hljs-comment">dragUpdate$</span><span class="hljs-string">.</span><span class="hljs-comment">mergeMap(()</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">delayBoxes$)</span>

<span class="hljs-comment">result$</span>         <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">a</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">b</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ac</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">bd</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">cea</span><span class="hljs-literal">-</span><span class="hljs-comment">dfb</span><span class="hljs-literal">-</span><span class="hljs-comment">egc</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-comment">d</span><span class="hljs-literal">-</span><span class="hljs-comment">g</span><span class="hljs-literal">-</span><span class="hljs-comment">e</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">f</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">g|</span></code></pre>
<p>正如上面 Marble Diagram 所示，我们可以借助流的力量从容地在合适的时机修改对应的小方块的位置。具体的实现代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const headBox = document.getElementById('head')
const boxes = document.getElementsByClassName('box')
const mouseDown$ = Rx.Observable.fromEvent(headBox, 'mousedown')
const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')
const delayBoxes$ = Rx.Observable.from([].slice.call(boxes, 0))
  .zip(Rx.Observable.interval(100).startWith(0), (box) => box)

mouseDown$.map((e) => {
  const pos = getTranslate(headBox)
  return {
    pos,
    event: e,
  }
})
.switchMap((initialState) => {
  const initialPos = initialState.pos
  const { clientX, clientY } = initialState.event
  return mouseMove$.map((moveEvent) => ({
    x: moveEvent.clientX - clientX + initialPos.x,
    y: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$)
})
.mergeMap((pos) => {
  return delayBoxes$.do((box) => {
    setTranslate(box, pos)
  })
})
.subscribe()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> headBox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'head'</span>)
<span class="hljs-keyword">const</span> boxes = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'box'</span>)
<span class="hljs-keyword">const</span> mouseDown$ = Rx.Observable.fromEvent(headBox, <span class="hljs-string">'mousedown'</span>)
<span class="hljs-keyword">const</span> mouseMove$ = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">'mousemove'</span>)
<span class="hljs-keyword">const</span> mouseUp$ = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">'mouseup'</span>)
<span class="hljs-keyword">const</span> delayBoxes$ = Rx.Observable.from([].slice.call(boxes, <span class="hljs-number">0</span>))
  .zip(Rx.Observable.interval(<span class="hljs-number">100</span>).startWith(<span class="hljs-number">0</span>), (box) =&gt; box)

mouseDown$.map(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> pos = getTranslate(headBox)
  <span class="hljs-keyword">return</span> {
    pos,
    <span class="hljs-attr">event</span>: e,
  }
})
.switchMap(<span class="hljs-function">(<span class="hljs-params">initialState</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> initialPos = initialState.pos
  <span class="hljs-keyword">const</span> { clientX, clientY } = initialState.event
  <span class="hljs-keyword">return</span> mouseMove$.map(<span class="hljs-function">(<span class="hljs-params">moveEvent</span>) =&gt;</span> ({
    <span class="hljs-attr">x</span>: moveEvent.clientX - clientX + initialPos.x,
    <span class="hljs-attr">y</span>: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$)
})
.mergeMap(<span class="hljs-function">(<span class="hljs-params">pos</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> delayBoxes$.<span class="hljs-keyword">do</span>(<span class="hljs-function">(<span class="hljs-params">box</span>) =&gt;</span> {
    setTranslate(box, pos)
  })
})
.subscribe()</code></pre>
<p>完整的实现代码见 <a href="https://codepen.io/jerryzou/pen/MoJpam?editors=0110" rel="nofollow noreferrer" target="_blank">Codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="jerryzou/pen/MoJpam" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader3">小结</h2>
<ul>
<li>
<p>这篇文章介绍了关于拖拽的三个实际场景：</p>
<ul>
<li><p>在简单拖拽的实例中，使用到了 <code>takeUntil</code>, <code>switchMap</code> 操作符；</p></li>
<li><p>需要添加初始延迟时，我们额外使用到 <code>delay</code> 操作符；</p></li>
<li><p>在最后的拖拽接龙实例中，<code>mergeMap</code> 操作符和 <code>zip + interval</code> 的组合发挥了很大的作用</p></li>
</ul>
</li>
<li><p>相信看完本文以后，你们能够深刻体会到：结合 <strong>Marble Diagram</strong> 来理解 RxJS 的流是一个非常棒的方法！</p></li>
</ul>
<p>最后大家可以思考一下：在第三个例子中，如果把 <code>mergeMap</code> 改为 <code>switchMap</code> 或者 <code>concatMap</code> 会发生什么？这是课后作业。下课！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJS 实战篇（一）拖拽

## 原文链接
[https://segmentfault.com/a/1190000009893235](https://segmentfault.com/a/1190000009893235)

