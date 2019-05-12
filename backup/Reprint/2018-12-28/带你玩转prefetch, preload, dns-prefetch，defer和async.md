---
title: '带你玩转prefetch, preload, dns-prefetch，defer和async' 
date: 2018-12-28 2:30:11
hidden: true
slug: yw9fy3sgrdj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">现代浏览器性能优化-JS篇</h1>
<blockquote>众所周知，JS的加载和执行会阻塞浏览器渲染，所以目前业界普遍推荐把script放到&lt;/body&gt;之前，以解决js执行时找不到dom等问题。但随着现代浏览器的普及，浏览器为我们提供了更多强大的武器，合理利用，方可大幅提高页面加载速度。</blockquote>
<h2 id="articleHeader1">理解渲染过程（HTML Parser）</h2>
<p>首先我们从浏览器的角度解释一下从输入URL到页面展示经历了些什么，以如下html文档举例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;/style.css&quot;>
    <script type=&quot;text/javascript&quot; src=&quot;/header.js&quot;></script>
</head>
<body>
  <p>Text</p>
  <script type=&quot;text/javascript&quot; src=&quot;/main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/style.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/header.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>浏览器自上而下读取html文档（此过程叫html parser），当发现style.css文件时，浏览器parser停下来去搞css，等style.css下载并解析完毕，浏览器继续parser。紧接着发现header.js， 于是html parser又停了，浏览器下载并执行完header.js，继续parser。此时屏幕上还什么都没有。...parser，发现&lt;p&gt;，遂将p中文字展示了出来。紧接着又发现main.js，浏览器又停下parser，下载并执行完main.js才继续parser，直到页面渲染完毕。</p>
<p>我们假设header.js中只有一行代码<code>console.log('header')</code>， 但服务器响应很慢，要10秒才能把它返回给浏览器，浏览器执行这段代码需要1ms，那在这 10s+1ms 内，页面将一直空白。浏览器执行JS的时间取决于代码质量和硬件，并不是前端工程师随便可以优化的，所以优化的重点在JS的下载时间。</p>
<h2 id="articleHeader2">核心：减少JS下载时间</h2>
<h4>预先解析DNS</h4>
<p>非常简单，效果立竿见影，加快页面加载时间，多用于预解析CDN的地址的DNS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--在head标签中，越早越好-->
<link rel=&quot;dns-prefetch&quot; href=&quot;//example.com&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--在head标签中，越早越好--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//example.com"</span>&gt;</span></code></pre>
<h4>Preload</h4>
<p>浏览器会在遇到如下link标签时，立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句。<br>只有当遇到script标签加载的也是main.js的时候，浏览器才会直接将预先加载的JS执行掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;preload&quot; href=&quot;/main.js&quot; as=&quot;script&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;link <span class="hljs-built_in">rel</span>=<span class="hljs-string">"preload"</span> href=<span class="hljs-string">"/main.js"</span> <span class="hljs-keyword">as</span>=<span class="hljs-string">"script"</span>&gt;</code></pre>
<h4>Prefetch</h4>
<p>浏览器会在空闲的时候，下载main.js, 并缓存到disk。当有页面使用的时候，直接从disk缓存中读取。其实就是把决定是否和什么时间加载这个资源的决定权交给浏览器。</p>
<p>如果prefetch还没下载完之前，浏览器发现script标签也引用了同样的资源，浏览器会再次发起请求，这样会严重影响性能的，加载了两次，，所以不要在当前页面马上就要用的资源上用prefetch，要用preload。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link href=&quot;main.js&quot; rel=&quot;prefetch&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"main.js"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prefetch"</span>&gt;</span></code></pre>
<h2 id="articleHeader3">JS在什么时候执行的（defer和async）</h2>
<p>上面我们的例子中，script标签都是在没有多余属性的情况下执行的，只要下载过程结束，浏览器就会将JS执行掉。<br>defer和async是script标签的两个属性，用于在不阻塞页面文档解析的前提下，控制脚本的下载和执行。</p>
<p>defer，async与下载时机也有关，具体看这张图。<br><span class="img-wrap"><img data-src="http://segmentfault.com/img/bVcQV0" src="https://static.alili.techhttp://segmentfault.com/img/bVcQV0" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>defer的执行时间是在所有元素解析完成之后，DOMContentLoaded 事件触发之前。</p>
<p>async的执行时间是在当前JS脚本下载完成后，所以多个async script是执行顺序是不固定的。async只能用于加载一些独立无依赖的代码，比如Google Analysis之类。</p>
<h2 id="articleHeader4">完美的结构</h2>
<p>前面两节帮我们弄懂了JS的下载和执行时机，那什么样的页面才是完美符合现代浏览器的那？其实关键在于的preload和prefetch！提前告知浏览器，我们的网站马上要用的是什么，以后可能要用的是什么，浏览器才能更快的渲染页面。下面是一段实例代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Faster</title>
  <link rel=&quot;dns-prefetch&quot; href=&quot;//cdn.com/&quot;>
  <link rel=&quot;preload&quot; href=&quot;//js.cdn.com/currentPage-part1.js&quot; as=&quot;script&quot;>
  <link rel=&quot;preload&quot; href=&quot;//js.cdn.com/currentPage-part2.js&quot; as=&quot;script&quot;>
  <link rel=&quot;preload&quot; href=&quot;//js.cdn.com/currentPage-part3.js&quot; as=&quot;script&quot;>

  <link rel=&quot;prefetch&quot; href=&quot;//js.cdn.com/prefetch.js&quot;>
</head>
<body>

<script type=&quot;text/javascript&quot; src=&quot;//js.cdn.com/currentPage-part1.js&quot; defer></script>
<script type=&quot;text/javascript&quot; src=&quot;//js.cdn.com/currentPage-part2.js&quot; defer></script>
<script type=&quot;text/javascript&quot; src=&quot;//js.cdn.com/currentPage-part3.js&quot; defer></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Faster<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.com/"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part1.js"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"script"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part2.js"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"script"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part3.js"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"script"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//js.cdn.com/prefetch.js"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part1.js"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part2.js"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//js.cdn.com/currentPage-part3.js"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>首先，Parser在遇到head中preload时开始下载JS，读到script标签的时候，如果已经下载完了，直接按顺序执行之。如果没下载完，则会等到下载完再执行。这样就可以在刚进入页面时开始非阻塞的下载JS代码了。</p>
<p>其次，页面会在空闲时，加载prefetch的JS，如果之后页面发生跳转，跳转的目标页面引入了prefetch.js，浏览器会直接从disk缓存中读取执行。</p>
<p>将script标签依然放在&lt;/body&gt;之前，并增加defer标签，确保老浏览器兼容，并在所有DOM元素解析完成之后执行其中的代码。</p>
<p>至此，完美的HTML结构出炉了。</p>
<p>CSS的下载和解析一样会阻塞渲染，造成白屏，CSS中的字体文件更是影响首屏渲染关键因素之一，下一篇幅我会结合preload和prefetch，带你一起优化CSS，告诉你什么是最适合现代浏览器的CSS加载策略，期待的话，点个赞吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你玩转prefetch, preload, dns-prefetch，defer和async

## 原文链接
[https://segmentfault.com/a/1190000011577248](https://segmentfault.com/a/1190000011577248)

