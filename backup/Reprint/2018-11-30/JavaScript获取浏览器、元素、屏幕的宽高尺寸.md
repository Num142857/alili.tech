---
title: 'JavaScript获取浏览器、元素、屏幕的宽高尺寸' 
date: 2018-11-30 2:30:11
hidden: true
slug: jp1i04e358
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014929763" src="https://static.alili.tech/img/remote/1460000014929763" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">版权声明</h2>
<blockquote>
<strong>转载请告知并注明来源作者</strong>  <br><code>作者</code>：<code>唐金健</code>  <br><code>网络昵称</code>：<code>御焱</code>  <br><a href="https://juejin.im/user/5ad0cef9f265da23970749f9/posts" rel="nofollow noreferrer" target="_blank"><code>掘金</code></a><a href="https://zhuanlan.zhihu.com/c_185793043" rel="nofollow noreferrer" target="_blank"><code>知乎</code></a><a href="https://segmentfault.com/blog/elegant-front-end"><code>思否</code></a><code>专栏</code>：<code>优雅的前端</code>
</blockquote>
<h2 id="articleHeader1">前言</h2>
<blockquote>有时候在获取浏览器、元素、屏幕的尺寸，傻傻分不清。为了让自己清晰认识，能够快速确定自己需要哪个属性，现在把这些尺寸属性整理了一下。</blockquote>
<h2 id="articleHeader2">一、浏览器视口的宽高</h2>
<h3 id="articleHeader3">Window.innerWidth、Window.innerHeight</h3>
<blockquote>浏览器视口（viewport）宽度（单位：像素），如果存在滚动条则包括它。</blockquote>
<h3 id="articleHeader4">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> viewportWidth = <span class="hljs-built_in">window</span>.innerWidth;
<span class="hljs-keyword">let</span> viewportHeight = <span class="hljs-built_in">window</span>.innerHeight;</code></pre>
<h3 id="articleHeader5">备注</h3>
<p><code>window.innerWidth</code>和<code>window.innerHeight</code>是只读属性，无默认值。</p>
<p>如果HTML中添加了以下内容，则页面在移动端访问的时候，视口宽高始终与逻辑分辨率一致。  <br>否则，移动端浏览器会在一个通常比屏幕更宽的虚拟”窗口“（视口）中渲染页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"</span> /&gt;</span></code></pre>
<h2 id="articleHeader6">二、浏览器的宽高</h2>
<h3 id="articleHeader7">Window.outerWidth、Window.outerHeight</h3>
<blockquote>整个浏览器窗口的高度（单位：像素），包括侧边栏（如果存在）、窗口镶边（window chrome）和窗口调正边框（window resizing borders/handles）。</blockquote>
<h3 id="articleHeader8">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let outerWidth = window.outerWidth;
let outerHeight = window.outerHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> outerWidth = <span class="hljs-built_in">window</span>.outerWidth;
<span class="hljs-keyword">let</span> outerHeight = <span class="hljs-built_in">window</span>.outerHeight;</code></pre>
<h3 id="articleHeader9">备注</h3>
<p><code>window.outerWidth</code>和<code>window.outerHeight</code>是只读属性，无默认值。  <br>在使用桌面端浏览器的模拟移动设备查看网页时，这两个属性，依然指的是桌面端浏览器窗口的宽高。</p>
<h2 id="articleHeader10">三、元素内部的宽高</h2>
<h3 id="articleHeader11">Element.clientWidth、Element.clientHeight</h3>
<blockquote>元素内部宽 = width + padding-left + padding-right - 竖直滚动条宽度  <br>元素内部高 = height + padding-top + padding-bottom - 横向滚动条高度</blockquote>
<h3 id="articleHeader12">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let clientWidth = element.clientWidth;
let clientHeight = element.clientHight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> clientWidth = element.clientWidth;
<span class="hljs-keyword">let</span> clientHeight = element.clientHight;</code></pre>
<h3 id="articleHeader13">示例</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014929764" src="https://static.alili.tech/img/remote/1460000014929764" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader14">四、元素的布局宽高</h2>
<h3 id="articleHeader15">Element.offsetWidth、Element.offsetHight</h3>
<blockquote>元素布局宽 = width + padding-left + padding-right + 竖直滚动条宽度 + border-left + border-right  <br>元素布局高 = height + padding-top + padding-bottom + 横向滚动条高度 + border-top + border-bottom</blockquote>
<h3 id="articleHeader16">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let offsetWidth = element.offsetWidth;
let offsetHight = element.offsetHight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> offsetWidth = element.offsetWidth;
<span class="hljs-keyword">let</span> offsetHight = element.offsetHight;</code></pre>
<h3 id="articleHeader17">示例</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014929765" src="https://static.alili.tech/img/remote/1460000014929765" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">五、元素的内容宽高</h2>
<h3 id="articleHeader19">Element.scrollWidth、Element.scrollHeight</h3>
<blockquote>元素的内容宽高，包括由于溢出导致内容在屏幕上下不可见的内容。</blockquote>
<h3 id="articleHeader20">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let scrollWidth = element.scrollWidth;
let scrollHeight = element.scrollHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> scrollWidth = element.scrollWidth;
<span class="hljs-keyword">let</span> scrollHeight = element.scrollHeight;</code></pre>
<h3 id="articleHeader21">示例</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014929766" src="https://static.alili.tech/img/remote/1460000014929766" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader22">六、屏幕的宽高</h2>
<h3 id="articleHeader23">Screen.width、Screen.height</h3>
<blockquote>屏幕分辨率宽高。如果是移动设备，则返回逻辑分辨率宽高。</blockquote>
<h3 id="articleHeader24">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let screenWidth = window.screen.width;
let screenHeight = window.screen.height;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> screenWidth = <span class="hljs-built_in">window</span>.screen.width;
<span class="hljs-keyword">let</span> screenHeight = <span class="hljs-built_in">window</span>.screen.height;</code></pre>
<h2 id="articleHeader25">七、屏幕的可用宽高</h2>
<h3 id="articleHeader26">Screen.availWidth、Screen.availHeight</h3>
<blockquote>减去比如Windows的任务栏等界面特性的屏幕的可用宽高。如果是移动设备，则返回逻辑分辨率宽高。</blockquote>
<h3 id="articleHeader27">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let availWidth = window.screen.availWidth;
let availHeight = window.screen.availHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> availWidth = <span class="hljs-built_in">window</span>.screen.availWidth;
<span class="hljs-keyword">let</span> availHeight = <span class="hljs-built_in">window</span>.screen.availHeight;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript获取浏览器、元素、屏幕的宽高尺寸

## 原文链接
[https://segmentfault.com/a/1190000014929758](https://segmentfault.com/a/1190000014929758)

