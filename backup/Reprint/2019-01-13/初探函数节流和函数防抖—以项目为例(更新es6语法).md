---
title: '初探函数节流和函数防抖—以项目为例(更新es6语法)' 
date: 2019-01-13 2:30:11
hidden: true
slug: hkkbaq006k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 项目需求</h1>
<p>最近在做一些小的练手代码的时候，碰到了一个很常见的问题，当在搜索框中进行搜索的时候，如果快速输入很多字符的话，搜索框的监听回调函数会执行很多次，如果回调业务较复杂的话，可能会导致页面运行缓慢甚至是奔溃，那么我们如何解决这个问题呢，<strong>让输入框在不在输入的情况下执行回调，或者每间隔一段时间执行一次回调都可以解决这一问题</strong>。而上述两种方法，就叫做函数的节流和防抖。<span class="img-wrap"><img data-src="/img/bVOKoe?w=1214&amp;h=874" src="https://static.alili.tech/img/bVOKoe?w=1214&amp;h=874" alt="项目需求" title="项目需求" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">二 函数节流和函数防抖</h1>
<h1 id="articleHeader2">2.1 函数节流</h1>
<p>函数节流：函数节流是让这个函数在间隔某一段时间执行一次。以输入框为例，假设你想查询xxxx,你想实现当我开始输入多少秒之后，执行查询操作。（并不一定要输入完毕）<br>想看效果请点击<a href="http://xiongzixiao.com/JavaScript30/day4/index2.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h1 id="articleHeader3">2.2 函数防抖</h1>
<p>函数防抖：函数防抖是让这个函数在执行上一次之后过了你规定的时间再执行的一种方法。以输入框为例，假设你要查询xxxx，你想实现当我输完了xxxx之后，再进行查询操作，那么你就需要用到函数防抖。<br>经典的函数防抖实践如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(method,context){
  clearTimeout(method.tId)
  method.tId = setTimeout(function(){
    method.call(context) 
   },1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">method,context</span>)</span>{
  clearTimeout(method.tId)
  method.tId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    method.call(context) 
   },<span class="hljs-number">1000</span>)
}</code></pre>
<p>想看效果请点击<a href="http://xiongzixiao.com/JavaScript30/day4/index1.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h1 id="articleHeader4">三 最佳实践</h1>
<p>通过上叙的描述，我们对于函数防抖和函数节流有了一定的认识。在这个项目中，我认为函数节流和函数防抖都能很好的解决问题。所以这里把函数节流和函数防抖封装在了一个函数里，通过第三个参数切换模式。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const throttle = function(fn, delay, isDebounce) {
  let timer
  let lastCall = 0
  return function (...args) {
    if (isDebounce) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    } else {
      const now = new Date().getTime()
      if (now - lastCall < delay) return
      lastCall = now
      fn(...args)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, delay, isDebounce</span>) </span>{
  <span class="hljs-keyword">let</span> timer
  <span class="hljs-keyword">let</span> lastCall = <span class="hljs-number">0</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) </span>{
    <span class="hljs-keyword">if</span> (isDebounce) {
      <span class="hljs-keyword">if</span> (timer) clearTimeout(timer)
      timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        fn(...args)
      }, delay)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
      <span class="hljs-keyword">if</span> (now - lastCall &lt; delay) <span class="hljs-keyword">return</span>
      lastCall = now
      fn(...args)
    }
  }
}</code></pre>
<p>通过第三个参数，可以控制到底使用函数防抖还是函数节流。</p>
<h1 id="articleHeader5">四 总结</h1>
<p>函数防抖实现的核心在于每次都去clear一个延时器，然后每次执行函数的时候，都去clear以前的延时器。只有当你中断输入的时候，才会去执行相应回调。而函数节流的核心是去判断当前时间和开始时间的间隔是否到达了设置的delay值，如果达到了，就执行一次回调。没有则不执行。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初探函数节流和函数防抖—以项目为例(更新es6语法)

## 原文链接
[https://segmentfault.com/a/1190000009675191](https://segmentfault.com/a/1190000009675191)

