---
title: 'JavaScript 异步和回调函数' 
date: 2018-12-26 2:30:13
hidden: true
slug: d8geise2nvm
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript语言的执行环境是单线程的，即是一次只能完成一个任务，其他任务排队等候执行。只有当前一个任务完成时，才能开始进行下一个任务。</p>
<p>这种模式的执行环境简单，若是遇到一个耗时较长的任务，将会拖延整个程序的执行。</p>
<p>为了解决这个问题，我们有同步和异步两种任务的执行模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="同步模式即上述所说的单线程模式；
异步模式：每个任务都有回调函数（callback），
前一个任务结束后，不是执行后一个任务，而是执行回调函数，
后一个任务则是不等前一个任务结束就执行，
所以程序的执行顺序与任务的排列顺序是不一致的、异步的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>同步模式即上述所说的单线程模式；
异步模式：每个任务都有回调函数（<span class="hljs-keyword">callback</span>），
前一个任务结束后，不是执行后一个任务，而是执行回调函数，
后一个任务则是不等前一个任务结束就执行，
所以程序的执行顺序与任务的排列顺序是不一致的、异步的。
</code></pre>
<p>小剧场：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="顾客1（打电话）：
    老板，我要买本小黄书，你有吗？
老板：
    我找找，一会儿给你回电话。（ 老板干其他事情。）
顾客2（打电话）：
    老板，我要买本红包书，你有吗？
老板：
    我找找，一会儿给你回电话。（ 老板干其他事情。）
                …………
找到书，老板回电话。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>顾客<span class="hljs-number">1</span>（打电话）：
    老板，我要买本小黄书，你有吗？
老板：
    我找找，一会儿给你回电话。（ 老板干其他事情。）
顾客<span class="hljs-number">2</span>（打电话）：
    老板，我要买本红包书，你有吗？
老板：
    我找找，一会儿给你回电话。（ 老板干其他事情。）
                …………
找到书，老板回电话。
</code></pre>
<p>剧场说明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="其中回电话就是我们的回调函数，而找书就是任务。
异步：
    找到书（前一个任务完成）就回电话（执行回调函数），
    而后一个任务（找书）不管前一个任务是否完成都会开始。
同步：
    老板接了电话就开始找书（保持通话状态），
    直到书找到满足顾客1的需求，
    顾客2的电话才能打得进来。 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>其中回电话就是我们的回调函数，而找书就是任务。
异步：
    找到书（前一个任务完成）就回电话（执行回调函数），
    而后一个任务（找书）不管前一个任务是否完成都会开始。
同步：
    老板接了电话就开始找书（保持通话状态），
    直到书找到满足顾客<span class="hljs-number">1</span>的需求，
    顾客<span class="hljs-number">2</span>的电话才能打得进来。 
</code></pre>
<p>回调函数:<br>   回调函数是实现异步编程的最基本的方法。我们假设有两个函数f1()和f2(),f1()执行完成后才能执行f2()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   f1();
   f2();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>   f1()<span class="hljs-comment">;</span>
   f2()<span class="hljs-comment">;</span></code></pre>
<p>假设f1()是一个很耗时的任务，那么我们可以考虑异步机制，改写f1(),将f2改写为f1()的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function f1 (callback) {
    
    setTimeout(function () {
    callback()},1000);
    
    }
    
    f1(f2);
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span> <span class="hljs-params">(callback)</span> </span>{
    
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    callback()},<span class="hljs-number">1000</span>);
    
    }
    
    f1(f2);
    </code></pre>
<p>采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序的运行，也就是说我们先执行程序的主要逻辑，将耗时的操作推迟执行。</p>
<p>欢迎讨论和指出不足^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 异步和回调函数

## 原文链接
[https://segmentfault.com/a/1190000011999257](https://segmentfault.com/a/1190000011999257)

