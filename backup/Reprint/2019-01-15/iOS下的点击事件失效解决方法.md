---
title: 'iOS下的点击事件失效解决方法' 
date: 2019-01-15 2:30:12
hidden: true
slug: r09faqj1cye
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">iOS下的点击事件失效解决方法</h1>
<hr>
<h2 id="articleHeader1">问题描述</h2>
<hr>
<p>当委托给一个元素添加click事件时，如果事件是委托到 <code>document</code> 或 <code>body</code> 上，并且委托的元素是默认不可点击的(如 div, span 等)，此时 click 事件会失效。</p>
<p>demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!DOCTYPE html>
<html lang=&quot;en&quot;>
  <head>
    <title></title>
    <meta charset=&quot;UTF-8&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;/>
    <meta name=&quot;robots&quot; content=&quot;index,follow&quot;/>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no&quot;>
    <meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot;/>
    <meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;>
    <meta name=&quot;format-detection&quot; content=&quot;telphone=no, email=no&quot;>
    <meta name=&quot;renderer&quot; content=&quot;webkit&quot;>
    <meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-siteapp&quot; />
    <meta name=&quot;HandheldFriendly&quot; content=&quot;true&quot;>
    <meta name=&quot;MobileOptimized&quot; content=&quot;320&quot;>
    <meta name=&quot;screen-orientation&quot; content=&quot;portrait&quot;>
    <meta name=&quot;x5-orientation&quot; content=&quot;portrait&quot;>
    <meta name=&quot;full-screen&quot; content=&quot;yes&quot;>
    <meta name=&quot;x5-fullscreen&quot; content=&quot;true&quot;>
    <meta name=&quot;browsermode&quot; content=&quot;application&quot;>
    <meta name=&quot;x5-page-mode&quot; content=&quot;app&quot;>
    <meta name=&quot;msapplication-tap-highlight&quot; content=&quot;no&quot;>
    <meta http-equiv=&quot;Expires&quot; content=&quot;0&quot;>
    <meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot;>
    <meta http-equiv=&quot;Cache-control&quot; content=&quot;no-cache&quot;>
    <meta http-equiv=&quot;Cache&quot; content=&quot;no-cache&quot;>
  </head>
  <body>
    <div class=&quot;container&quot;></div>
      <div class=&quot;target&quot;>点击我!</div>
    </div>
    <script src=&quot;https://cdn.bootcss.com/jquery/2.2.4/jquery.js&quot;></script>
    <script>
      $(function () {
        // $(document).on('click', '.target', function () {})
        $('body').on('click', '.target', function () {
          alert('我被点击了！！！');
        });
      });
    </script>
  </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"robots"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"index,follow"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telphone=no, email=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"renderer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"webkit"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-siteapp"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"HandheldFriendly"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"MobileOptimized"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"320"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"screen-orientation"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"portrait"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-orientation"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"portrait"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"full-screen"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-fullscreen"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"browsermode"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"application"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-page-mode"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-tap-highlight"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"target"</span>&gt;</span>点击我!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/2.2.4/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      $(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// $(document).on('click', '.target', function () {})</span>
        $(<span class="hljs-string">'body'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-string">'.target'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          alert(<span class="hljs-string">'我被点击了！！！'</span>);
        });
      });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h2 id="articleHeader2">解决办法</h2>
<hr>
<p>解决办法有6种：</p>
<ul>
<li><p>将 <code>click</code> 事件直接绑定到目标元素(即 <code>.target</code> ) 上</p></li>
<li><p>将目标元素换成 <code>&lt;a&gt;</code> 或者 <code>&lt;button&gt;</code> 等可点击的元素</p></li>
<li><p>给目标元素添加一个空的 <code>onclick=""</code>(&lt;div class="target" onclick=""&gt;点击我!&lt;/div&gt;)</p></li>
<li><p>把 <code>click</code> 改成 <code>touchend</code> 或 <code>touchstart</code>（注意加上preventDefault）</p></li>
<li><p>将 <code>click</code> 元素委托到非 <code>document</code> 或 <code>body</code> 的父级元素上</p></li>
<li><p>给目标元素加一条样式规则 <code>cursor: pointer;</code> (cursor: pointer; -webkit-tap-highlight-color: transparent;)</p></li>
</ul>
<p>推荐后两种。推测在 Safari 中，不可点击元素的点击事件是不会冒泡到父级元素的。通过添加 <code>cursor: pointer;</code> 使得元素变成了可点击的了。</p>
<h2 id="articleHeader3">补充</h2>
<hr>
<h3 id="articleHeader4">问题</h3>
<hr>
<p>iOS系统 <code>input</code> 及 input内元素 <code>cursor: pointer;</code> 失效，使得在 iOS系统 上需要借助 <code>cursor</code> 属性才能生效的 <code>click</code> 事件无法触发</p>
<h3 id="articleHeader5">解决办法</h3>
<ul>
<li><p>设置 font-size: 0;</p></li>
<li><p>把 <code>click</code> 改成 <code>touchend</code> （注意加上preventDefault）</p></li>
</ul>
<h2 id="articleHeader6">参考文档</h2>
<ul>
<li><p><a href="https://github.com/facebook/react/issues/134" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/react/issues/134</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/5421659/html-label-command-doesnt-work-in-iphone-browser/6472181#6472181" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/5421659/html-label-command-doesnt-work-in-iphone-browser/6472181#6472181</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iOS下的点击事件失效解决方法

## 原文链接
[https://segmentfault.com/a/1190000009231024](https://segmentfault.com/a/1190000009231024)

