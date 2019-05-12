---
title: '现代浏览器性能优化-CSS篇' 
date: 2018-12-19 2:30:08
hidden: true
slug: 9mq5amrcino
categories: [reprint]
---

{{< raw >}}

                    
<p>我来填坑了，CSS篇终于写出来了，如果你没看过前面的JS篇，可以<a href="https://github.com/GeoffZhu/geoffzhu.github.io/issues/2" rel="nofollow noreferrer" target="_blank">在这里观看</a>。</p>
<blockquote>众所周知，CSS的加载会阻塞浏览器渲染或是引起浏览器重绘，目前业界普遍推荐把CSS放到<code>&lt;head&gt;</code>中，防止在CSS还没加载完，DOM就已经绘制出来了，造成CSS加载完成后的重绘。那在现代浏览器中我们有没有办法提高首屏渲染速度那？</blockquote>
<p>你是不是经常在第一次打开某个网站的时候看到这种情况，本来的页面是这样的<br><span class="img-wrap"><img data-src="/img/remote/1460000012643588?w=1574&amp;h=698" src="https://static.alili.tech/img/remote/1460000012643588?w=1574&amp;h=698" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>实际上刚加载出来的是这样的<br><span class="img-wrap"><img data-src="/img/remote/1460000012643589" src="https://static.alili.tech/img/remote/1460000012643589" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>字体文件没加载出来，或者加载的太慢了</p>
<h2 id="articleHeader0">理解CSS解析过程</h2>
<p>以下面这段HTML为例，解释一遍CSS加载解析的过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <!-- headStyle.css中存在字体文件webfont.woff2 -->
  <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;/headStyle.css&quot;>
</head>
<body>
  <p>Text</p>
  <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;/bodyEndStyle.css&quot;>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- headStyle.css中存在字体文件webfont.woff2 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/headStyle.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/bodyEndStyle.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>浏览器自上而下读取HTML文档，当发现headStyle.css的时候，停止Parser HTML，开始下载headStyle.css，解析headStyle.css的过程中发现字体文件webfont.woff2，开始下载webfont.woff2，并继续解析css生成CSSStyleSheet。解析完毕后，继续Parser HTML，当发现p标签时，会将p标签结合当前的CSSStyleSheet展示出来，此时用户屏幕中已经有p标签的内容了。当浏览器发现bodyEndStyle.css时，就会下载headStyle.css，解析CSS，然后更新CSSStyleSheet，这时会引起一次重绘。当字体下载完毕的时候也会引起一次重绘。</p>
<p>这个过程中，有两个非常严重的问题。一、如果headStyle.css文件很大，浏览器需要解析很多行CSS后才能还有个字体文件需要下载，其实此时已经很晚了，字体下载时间稍长一点，就会出现我前面截图提到的问题。二、bodyEndStyle.css中如果存在p标签对应的样式，那p标签的样式会在bodyEndStyle.css解析完成后，改变一次样式，很影响体验。</p>
<p>如何解决这些问题那？其中也会用到一些JS篇中提到的点，如果没看过，建议先看看。</p>
<h2 id="articleHeader1">优化核心依旧是减少下载时间</h2>
<p>JS篇中的预先解析DNS（dns-prefetch）依旧适用，提前解析CSS文件所在域名的DNS。</p>
<h4>Preload</h4>
<p>因为CSS已经在head中，我们不需要为css加preload属性了，但是css中用到的字体文件，一定要在所有css之前proload上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;preload&quot; href=&quot;/webfont.woff2&quot; as=&quot;font&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/webfont.woff2"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"font"</span>&gt;</span></code></pre>
<h4>首页CSS内联，非必要CSS异步加载</h4>
<p>首页用到的CSS内联写在<code>&lt;head&gt;</code>中，其余CSS均采用异步加载，可以采用这种自己实现的加载CSS的方法，在合适的需要时加载需要的css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LoadStyle(url) {
  try {
    document.createStyleSheet(url)
  } catch(e) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LoadStyle</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">document</span>.createStyleSheet(url)
  } <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-keyword">var</span> cssLink = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'link'</span>);
    cssLink.rel = <span class="hljs-string">'stylesheet'</span>;
    cssLink.type = <span class="hljs-string">'text/css'</span>;
    cssLink.href = url;
    <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
    head.appendChild(cssLink)
  }
}</code></pre>
<p>如果你使用webpack，那就更轻松了，使用import函数，大致如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在a.js模块中直接引入css
import 'style.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在a.js模块中直接引入css</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'style.css'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在需要a.js模块的地方
improt('path-of-a.js').then(module => {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在需要a.js模块的地方</span>
improt(<span class="hljs-string">'path-of-a.js'</span>).then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> {})</code></pre>
<p>webpack打包后，其实是把style.css打包进了a.js，在异步加载a.js的时候，会将style.css中的代码插入<code>haed</code>标签中。</p>
<h2 id="articleHeader2">终极完美结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Faster</title>
  <link rel=&quot;dns-prefetch&quot; href=&quot;//cdn.cn/&quot;>

  <link rel=&quot;preload&quot; href=&quot;//cdn.cn/webfont.woff2&quot; as=&quot;font&quot;>
  <link rel=&quot;preload&quot; href=&quot;//cdn.cn/Page1-A.js&quot; as=&quot;script&quot;>
  <link rel=&quot;preload&quot; href=&quot;//cdn.cn/Page1-B.js&quot; as=&quot;script&quot;>
  
  <link rel=&quot;prefetch&quot; href=&quot;//cdn.cn/Page2.js&quot;>
  <link rel=&quot;prefetch&quot; href=&quot;//cdn.cn/Page3.js&quot;>
  <link rel=&quot;prefetch&quot; href=&quot;//cdn.cn/Page4.js&quot;>

  <style type=&quot;text/css&quot;>
    /* 首页用到的CSS内联 */
  </style>
</head>
<body>

<script type=&quot;text/javascript&quot; src=&quot;//cdn.cn/Page1-A.js&quot; defer></script>
<script type=&quot;text/javascript&quot; src=&quot;//cdn.cn/Page1-B.js&quot; defer></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Faster<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/webfont.woff2"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"font"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/Page1-A.js"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"script"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/Page1-B.js"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"script"</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/Page2.js"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/Page3.js"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.cn/Page4.js"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-comment">/* 首页用到的CSS内联 */</span>
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.cn/Page1-A.js"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.cn/Page1-B.js"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在<a href="#">JS篇</a>)中，我已经解释过这套结构中JS的执行顺序了，本篇只是加入了CSS和字体。至此，我心中终极完美的页面HTML结构就是这样了。</p>
<p>如果你对异步加载CSS的方案感兴趣，欢迎留言与我讨论！</p>
<h2 id="articleHeader3">扩展阅读</h2>
<ul>
<li><a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Webkit_CSS_parser" rel="nofollow noreferrer" target="_blank">浏览器的工作原理</a></li>
<li><a href="http://www.jianshu.com/p/24ffa6d45087" rel="nofollow noreferrer" target="_blank">关于Preload, 你应该知道些什么？</a></li>
<li><a href="https://juejin.im/post/58e8acf10ce46300585a7a42" rel="nofollow noreferrer" target="_blank">Preload，Prefetch 和它们在 Chrome 之中的优先级</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
现代浏览器性能优化-CSS篇

## 原文链接
[https://segmentfault.com/a/1190000012643583](https://segmentfault.com/a/1190000012643583)

