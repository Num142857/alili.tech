---
title: '移动web前端meta通用设置' 
date: 2019-02-08 2:30:41
hidden: true
slug: evguyfuhy59
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接:<a href="http://www.maoyupeng.com/web-app-common-meta.html" rel="nofollow noreferrer" target="_blank">http://www.maoyupeng.com/web-app-common-meta.html</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 页面字符编码 -->
<meta charset=&quot;utf-8&quot;>

<!-- 避免IE使用兼容模式 -->
<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;>

<!-- 启用360浏览器的极速模式(webkit) -->
<meta name=&quot;renderer&quot; content=&quot;webkit&quot;>

<!-- 微软的老式浏览器 -->
<meta name=&quot;MobileOptimized&quot; content=&quot;320&quot;>

<!-- 关键字描述 -->
<meta name=&quot;keywords&quot; content=&quot;&quot;>
<meta name=&quot;description&quot; content=&quot;&quot;>

<!-- 设置移动端视图 -->
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, user-scalable=no&quot; />

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name=&quot;HandheldFriendly&quot; content=&quot;true&quot;>

<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; />

<!-- 设置苹果工具栏颜色 -->
<meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot; />

<!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<meta name=&quot;format-detection&quot; content=&quot;telphone=no, email=no&quot; />

<!-- uc强制竖屏 -->
<meta name=&quot;screen-orientation&quot; content=&quot;portrait&quot;>

<!-- QQ强制竖屏 -->
<meta name=&quot;x5-orientation&quot; content=&quot;portrait&quot;>

<!-- UC强制全屏 -->
<meta name=&quot;full-screen&quot; content=&quot;yes&quot;>

<!-- QQ强制全屏 -->
<meta name=&quot;x5-fullscreen&quot; content=&quot;true&quot;>

<!-- UC应用模式 -->
<meta name=&quot;browsermode&quot; content=&quot;application&quot;>

<!-- QQ应用模式 -->
<meta name=&quot;x5-page-mode&quot; content=&quot;app&quot;>

<!-- windows phone 点击无高光 -->
<meta name=&quot;msapplication-tap-highlight&quot; content=&quot;no&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 页面字符编码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 避免IE使用兼容模式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 启用360浏览器的极速模式(webkit) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"renderer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"webkit"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 微软的老式浏览器 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"MobileOptimized"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"320"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 关键字描述 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 设置移动端视图 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, user-scalable=no"</span> /&gt;</span>

<span class="hljs-comment">&lt;!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"HandheldFriendly"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"true"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 删除苹果默认的工具栏和菜单栏 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> /&gt;</span>

<span class="hljs-comment">&lt;!-- 设置苹果工具栏颜色 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> /&gt;</span>

<span class="hljs-comment">&lt;!-- 忽略页面中的数字识别为电话，忽略email识别 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telphone=no, email=no"</span> /&gt;</span>

<span class="hljs-comment">&lt;!-- uc强制竖屏 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"screen-orientation"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"portrait"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- QQ强制竖屏 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-orientation"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"portrait"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- UC强制全屏 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"full-screen"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- QQ强制全屏 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-fullscreen"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"true"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- UC应用模式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"browsermode"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"application"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- QQ应用模式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"x5-page-mode"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"app"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- windows phone 点击无高光 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-tap-highlight"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no"</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动web前端meta通用设置

## 原文链接
[https://segmentfault.com/a/1190000005781663](https://segmentfault.com/a/1190000005781663)

