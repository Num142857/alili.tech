---
title: 'js 函数节流和防抖' 
date: 2019-02-13 2:31:22
hidden: true
slug: q5lazkp6kes
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">js 函数节流和防抖</h1>
<h2 id="articleHeader1">throttle 节流</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="事件触发到结束后只执行一次。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">事件触发到结束后只执行一次。</code></pre>
<h3 id="articleHeader2">应用场景</h3>
<ul>
<li>触发<code>mousemove</code>事件的时候， 如鼠标移动。</li>
<li>触发<code>keyup</code>事件的情况， 如搜索。</li>
<li>触发<code>scroll</code>事件的时候， 譬如鼠标向下滚动停止时触发加载数据。</li>
</ul>
<h3 id="articleHeader3">coding</h3>
<h5>方法1  防抖</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// function resizehandler(fn, delay){
//   clearTimeout(fn.timer);
//   fn.timer = setTimeout(() => {
//      fn();
//   }, delay);
// }
// window.onresize = () => resizehandler(fn, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> <span class="hljs-keyword">function</span> resizehandler(fn, delay){
<span class="hljs-regexp">//</span>   clearTimeout(fn.timer);
<span class="hljs-regexp">//</span>   fn.timer = setTimeout(() =&gt; {
<span class="hljs-regexp">//</span>      fn();
<span class="hljs-regexp">//</span>   }, delay);
<span class="hljs-regexp">//</span> }
<span class="hljs-regexp">//</span> window.onresize = () =&gt; resizehandler(fn, <span class="hljs-number">1000</span>);</code></pre>
<h5>方法2 闭包  防抖</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resizehandler(fn, delay){
    let timer = null;
    return function() {
      const context = this;
      const args=arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
         fn.apply(context,args);
      }, delay);
    }
 }
 window.onresize = resizehandler(fn, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resizehandler</span>(<span class="hljs-params">fn, delay</span>)</span>{
    <span class="hljs-keyword">let</span> timer = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">const</span> args=<span class="hljs-built_in">arguments</span>;
      clearTimeout(timer);
      timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
         fn.apply(context,args);
      }, delay);
    }
 }
 <span class="hljs-built_in">window</span>.onresize = resizehandler(fn, <span class="hljs-number">1000</span>);</code></pre>
<h2 id="articleHeader4">debounce 防抖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="事件出发后一定的事件内执行一次。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">事件出发后一定的事件内执行一次。</code></pre>
<h3 id="articleHeader5">应用场景</h3>
<ul>
<li>window 变化触发<code>resize</code>事件是， 只执行一次。</li>
<li>电话号码输入的验证， 只需停止输入后进行一次。</li>
</ul>
<h3 id="articleHeader6">coding</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resizehandler(fn, delay, duration) {
        let timer = null;
        let beginTime = +new Date();
        return function() {
          const context = this;
          const args = arguments;
          const currentTime = +new Date();
          timer &amp;&amp; clearTimeout(timer);
          if ((currentTime - beginTime) >= duration) {
            fn.call(context, args);
            beginTime = currentTime;
           } else {
             timer = setTimeout(() => {
               fn.call(context, args)
             }, delay);
           }
        }
      }

        window.onresize = resizehandler(fn, 1000, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resizehandler</span>(<span class="hljs-params">fn, delay, duration</span>) </span>{
        <span class="hljs-keyword">let</span> timer = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">let</span> beginTime = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">this</span>;
          <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">arguments</span>;
          <span class="hljs-keyword">const</span> currentTime = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
          timer &amp;&amp; clearTimeout(timer);
          <span class="hljs-keyword">if</span> ((currentTime - beginTime) &gt;= duration) {
            fn.call(context, args);
            beginTime = currentTime;
           } <span class="hljs-keyword">else</span> {
             timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
               fn.call(context, args)
             }, delay);
           }
        }
      }

        <span class="hljs-built_in">window</span>.onresize = resizehandler(fn, <span class="hljs-number">1000</span>, <span class="hljs-number">1000</span>);</code></pre>
<p><em>Demo</em><br><a href="https://codepen.io/toringo/pen/gBvjRy?editors=1001" rel="nofollow noreferrer" target="_blank">CodePen-demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="toringo/pen/gBvjRy" data-typeid="3">点击预览</button></p>
<blockquote>参考文章  <br><a href="http://www.alloyteam.com/2012/11/javascript-throttle/#prettyPhoto" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.alloyteam.com/2012/11/javascript-throttle/#prettyPhoto" rel="nofollow noreferrer" target="_blank">http://www.alloyteam.com/2012...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 函数节流和防抖

## 原文链接
[https://segmentfault.com/a/1190000016733028](https://segmentfault.com/a/1190000016733028)

