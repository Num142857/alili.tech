---
title: 'debounce(防抖)和throttle(节流)' 
date: 2019-02-07 2:30:15
hidden: true
slug: berwgkwh2b6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">防抖和节流</h1>
<p>窗口的<code>resize</code>、<code>scroll</code>，输入框内容校验等操作时，如果这些操作处理函数较为复杂或页面频繁重渲染等操作时，如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少触发的频率，同时又不影响实际效果。</p>
<h2 id="articleHeader1">debounce 防抖</h2>
<p>debounce（防抖），简单来说就是防止抖动。</p>
<p><span class="img-wrap"><img data-src="/img/bVy1VN" src="https://static.alili.tech/img/bVy1VN" alt="debounce 防抖" title="debounce 防抖" style="cursor: pointer; display: inline;"></span></p>
<p>从上图中我们可以看到，当持续触发事件时，<strong>debounce</strong>会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件～ 一起来实现个简单的debounce：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(fn, delay) {
  var ctx;
  var args;
  var timer = null;

  var later = function () {
    fn.apply(ctx, args);
    // 当事件真正执行后，清空定时器
    timer = null;
  };

  return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(later, delay);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn, delay</span>) </span>{
  <span class="hljs-keyword">var</span> ctx;
  <span class="hljs-keyword">var</span> args;
  <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">var</span> later = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    fn.apply(ctx, args);
    <span class="hljs-comment">// 当事件真正执行后，清空定时器</span>
    timer = <span class="hljs-literal">null</span>;
  };

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ctx = <span class="hljs-keyword">this</span>;
    args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-comment">// 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器</span>
    <span class="hljs-keyword">if</span> (timer) {
      clearTimeout(timer);
      timer = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// 重新设置事件触发的定时器</span>
    timer = setTimeout(later, delay);
  };
}</code></pre>
<p><strong>效果图:</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVy1VP" src="https://static.alili.tech/img/bVy1VP" alt="sample debounce" title="sample debounce" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">throttle 节流</h2>
<p>throttle（节流），当持续触发事件时，保证隔间时间触发一次事件。</p>
<p><span class="img-wrap"><img data-src="/img/bVy1VS" src="https://static.alili.tech/img/bVy1VS" alt="throttle 节流" title="throttle 节流" style="cursor: pointer; display: inline;"></span></p>
<p>上图中绿色块表示触发一次事件，持续触发事件时，<strong>throttle</strong>会合并一定时间内的事件，并在该时间结束时真正去触发一次事件～ 一起来看看throttle的简单实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(fn, delay) {
  var ctx;
  var args;
  // 记录上次触发事件
  var previous = Date.now();

  var later = function () {
    fn.apply(ctx, args);
  };

  return function () {
    ctx = this;
    args = arguments;
    var now = Date.now();
    // 本次事件触发与上一次的时间比较
    var diff = now - previous - delay;

    // 如果隔间时间超过设定时间，即再次设置事件触发的定时器
    if (diff >= 0) {
      // 更新最近事件触发的时间
      previous = now;
      setTimeout(later, delay);
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn, delay</span>) </span>{
  <span class="hljs-keyword">var</span> ctx;
  <span class="hljs-keyword">var</span> args;
  <span class="hljs-comment">// 记录上次触发事件</span>
  <span class="hljs-keyword">var</span> previous = <span class="hljs-built_in">Date</span>.now();

  <span class="hljs-keyword">var</span> later = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    fn.apply(ctx, args);
  };

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ctx = <span class="hljs-keyword">this</span>;
    args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">var</span> now = <span class="hljs-built_in">Date</span>.now();
    <span class="hljs-comment">// 本次事件触发与上一次的时间比较</span>
    <span class="hljs-keyword">var</span> diff = now - previous - delay;

    <span class="hljs-comment">// 如果隔间时间超过设定时间，即再次设置事件触发的定时器</span>
    <span class="hljs-keyword">if</span> (diff &gt;= <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// 更新最近事件触发的时间</span>
      previous = now;
      setTimeout(later, delay);
    }
  };
}</code></pre>
<p><strong>效果图:</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVy1VX" src="https://static.alili.tech/img/bVy1VX" alt="sample throttle" title="sample throttle" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">总结</h2>
<p>根据实际业务场景，合理的利用debounce（防抖）和throttle（节流）可以优化性能和提高用户体验。两者间的核心区别就在于持续触发事件时，前者合并事件并在最后时间去触发事件，而后者则是隔间时间触发一次～</p>
<h2 id="articleHeader4">关键知识点</h2>
<blockquote>
<p><a href="http://www.w3school.com.cn/jsref/met_win_settimeout.asp" rel="nofollow noreferrer" target="_blank">setTimeout 定时器</a></p>
<blockquote><p>w3school</p></blockquote>
<p><a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html" rel="nofollow noreferrer" target="_blank">Closure 闭包</a></p>
<blockquote><p>ruanyifeng</p></blockquote>
</blockquote>
<h2 id="articleHeader5">资源</h2>
<h3 id="articleHeader6"><a href="http://ipluser.github.io/speechless/public/view/js/debounce-throttle.html" rel="nofollow noreferrer" target="_blank">在线测试</a></h3>
<h3 id="articleHeader7"><a href="https://github.com/ipluser/speechless/blob/gh-pages/public/view/js/debounce-throttle.html" rel="nofollow noreferrer" target="_blank">源代码</a></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
debounce(防抖)和throttle(节流)

## 原文链接
[https://segmentfault.com/a/1190000005926579](https://segmentfault.com/a/1190000005926579)

