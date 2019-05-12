---
title: '阻止微信浏览器下拉滑动效果（ios11.3 橡皮筋效果）' 
date: 2018-12-07 2:30:10
hidden: true
slug: oxpbdur5ixq
categories: [reprint]
---

{{< raw >}}

                    
<p>在升级到 ios11.3 系统后，发现之前阻止页面滚动的代码e.preventDefault代码失效了。于是自己折腾了一番，找到了解决办法，分享给大家。</p>
<h1 id="articleHeader0">一、前言</h1>
<p>浏览器在移动端有一个默认触摸滚动的效果，让我们感触最深的莫过于微信浏览器里面，下拉时自带橡皮筋的效果。</p>
<p>然而在开发的时候我们经常需要阻止此效果。</p>
<p>在此先直接给一个方案，直接加上下面的代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false}); //passive 参数不能省略，用来兼容ios和android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  e.preventDefault(); <span class="hljs-comment">//阻止默认的处理方式(阻止下拉滑动的效果)</span>
}, {<span class="hljs-attr">passive</span>: <span class="hljs-literal">false</span>}); <span class="hljs-comment">//passive 参数不能省略，用来兼容ios和android</span></code></pre>
<p>如果不加<code>passive:false</code>,在 ios 上是不能起作用的。</p>
<h1 id="articleHeader1">二、解释</h1>
<p>微信在 Android 端和 IOS 端使用的不是同样的浏览器内核：</p>
<ul>
<li>Android 版 微信浏览器 ：QQ浏览器 X5内核（相当于使用的 Chrome）</li>
<li>IOS 版 微信浏览器 ：WKWebView（相当于使用的Safari）</li>
</ul>
<p>所以下面分别使用 Chrome 和 Safari 来分析。</p>
<blockquote>关于浏览器内核问题，有兴趣的可以看看这个：<a href="https://www.cnblogs.com/jesse131/p/4888857.html" rel="nofollow noreferrer" target="_blank">浏览器内核总结</a>
</blockquote>
<h2 id="articleHeader2">1. Chrome 默认的事件监听参数：</h2>
<p><span class="img-wrap"><img data-src="/img/bV7smC?w=180&amp;h=104" src="https://static.alili.tech/img/bV7smC?w=180&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>useCapture:false</code> 表示事件采用冒泡机制（capture 译为 捕获），浏览器默认就是false；<br><code>passive:false</code> 表示我现在主动告诉浏览器该监听器将使用<code>e.preventDefault()</code>来阻止浏览器默认的滚动行为（可以提高运行速度）。</p>
<h2 id="articleHeader3">2. Safari 默认的事件监听参数：</h2>
<p>在 Safari 中，有一个<a href="https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_11_1.html" rel="nofollow noreferrer" target="_blank">更新</a>：</p>
<blockquote>Updated root document touch event listeners to use passive mode improving scrolling performance and reducing crashes<br>更新了根文档触摸事件侦听器，默认使用<code>passive:true</code>提高滚动性能并减少崩溃</blockquote>
<p>所以Safari 中默认使用了<code>passive:true</code>，告诉浏览器，此监听事件中，不会阻止默认的页面滚动。这将导致设置的<code>e.preventDefault()</code>代码失效。</p>
<p>所以 Safari 默认是不会阻止滚动的。</p>
<h2 id="articleHeader4">3. 结论</h2>
<p>我们通过 e.preventDefault(); 阻止默认的下拉滑动的效果，通过添加 passive:false 参数来兼容各个浏览器。即可实现阻止移动页面滚动的功能。</p>
<h1 id="articleHeader5">三、关于 passive 参数</h1>
<p>关于 passive 在事件监听中的作用，推荐大家看这篇文章：<a href="https://www.cnblogs.com/ziyunfei/p/5545439.html" rel="nofollow noreferrer" target="_blank">passive 的事件监听器</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
阻止微信浏览器下拉滑动效果（ios11.3 橡皮筋效果）

## 原文链接
[https://segmentfault.com/a/1190000014134234](https://segmentfault.com/a/1190000014134234)

