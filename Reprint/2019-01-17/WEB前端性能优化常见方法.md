---
title: 'WEB前端性能优化常见方法' 
date: 2019-01-17 2:30:25
hidden: true
slug: t3hi4duhnk
categories: [reprint]
---

{{< raw >}}

                    
<p>web前端是应用服务器处理之前的部分，前端主要包括：HTML,CSS,javascript,image等各种资源，针对不同的资源有不同的优化方式。</p>
<ul>
<li>
<p>内容优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)减少HTTP请求数:这条策略是最重要最有效的，因为一个完整的请求要经过DNS寻址，与服务器建立连接，发送数据，等待服务器响应，接收数据这样一个消耗时间成本和资源成本的复杂的过程。常见方法：合并多个CSS文件和js文件，利用CSS Sprites整合图像，Inline Images(使用 data：URL scheme在实际的页面嵌入图像数据 )，合理设置HTTP缓存等。
(2)减少DNS查找
(3)避免重定向
(4)使用Ajax缓存
(5)延迟加载组件,预加载组件
(6)减少DOM元素数量:页面中存在大量DOM元素,会导致javascript遍历DOM的效率变慢。
(7)最小化iframe的数量：iframes 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。但其创建速度比其他包括JavaScript和CSS的DOM元素的创建慢了1-2个数量级。
(8)避免404：HTTP请求时间消耗是很大的，因此使用HTTP请求来获得一个没有用处的响应（例如404没有找到页面）是完全没有必要的，它只会降低用户体验而不会有一点好处。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>(<span class="hljs-number">1</span>)减少HTTP请求数:这条策略是最重要最有效的，因为一个完整的请求要经过DNS寻址，与服务器建立连接，发送数据，等待服务器响应，接收数据这样一个消耗时间成本和资源成本的复杂的过程。常见方法：合并多个CSS文件和<span class="hljs-keyword">js文件，利用CSS </span>Sprites整合图像，Inline Images(使用 data：URL <span class="hljs-keyword">scheme在实际的页面嵌入图像数据 </span>)，合理设置HTTP缓存等。
(<span class="hljs-number">2</span>)减少DNS查找
(<span class="hljs-number">3</span>)避免重定向
(<span class="hljs-number">4</span>)使用Ajax缓存
(<span class="hljs-number">5</span>)延迟加载组件,预加载组件
(<span class="hljs-number">6</span>)减少DOM元素数量:页面中存在大量DOM元素,会导致<span class="hljs-keyword">javascript遍历DOM的效率变慢。
</span>(<span class="hljs-number">7</span>)最小化iframe的数量：iframes 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。但其创建速度比其他包括<span class="hljs-keyword">JavaScript和CSS的DOM元素的创建慢了1-2个数量级。
</span>(<span class="hljs-number">8</span>)避免<span class="hljs-number">404</span>：HTTP请求时间消耗是很大的，因此使用HTTP请求来获得一个没有用处的响应（例如<span class="hljs-number">404</span>没有找到页面）是完全没有必要的，它只会降低用户体验而不会有一点好处。</code></pre>
</li>
<li>
<p>服务器优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)使用内容分发网络（CDN）：把网站内容分散到多个、处于不同地域位置的服务器上可以加快下载速度。
(2)GZIP压缩
(3)设置ETag：ETags（Entity tags，实体标签）是web服务器和浏览器用于判断浏览器缓存中的内容和服务器中的原始内容是否匹配的一种机制。
(4)提前刷新缓冲区
(5)对Ajax请求使用GET方法
(6)避免空的图像src" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span>)使用内容分发网络（CDN）：把网站内容分散到多个、处于不同地域位置的服务器上可以加快下载速度。
(<span class="hljs-number">2</span>)GZIP压缩
(<span class="hljs-number">3</span>)设置ETag：ETags（Entity tags，实体标签）是web服务器和浏览器用于判断浏览器缓存中的内容和服务器中的原始内容是否匹配的一种机制。
(<span class="hljs-number">4</span>)提前刷新缓冲区
(<span class="hljs-number">5</span>)对Ajax请求使用GET方法
(<span class="hljs-number">6</span>)避免空的图像src</code></pre>
</li>
<li>
<p>Cookie优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)减小Cookie大小
(2)针对Web组件使用域名无关的Cookie" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">(1)</span>减小Cookie大小
<span class="hljs-comment">(2)</span>针对Web组件使用域名无关的Cookie</code></pre>
</li>
<li>
<p>CSS优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)将CSS代码放在HTML页面的顶部
(2)避免使用CSS表达式
(3)使用<link>来代替@import
(4)避免使用Filters" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span>)将CSS代码放在HTML页面的顶部
(<span class="hljs-number">2</span>)避免使用CSS表达式
(<span class="hljs-number">3</span>)使用&lt;link&gt;来代替@import
(<span class="hljs-number">4</span>)避免使用Filters</code></pre>
</li>
<li>
<p>javascript优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)将JavaScript脚本放在页面的底部。
(2)将JavaScript和CSS作为外部文件来引用：在实际应用中使用外部文件可以提高页面速度，因为JavaScript和CSS文件都能在浏览器中产生缓存。
(3)缩小JavaScript和CSS
(4)删除重复的脚本
(5)最小化DOM的访问：使用JavaScript访问DOM元素比较慢。
(6)开发智能的事件处理程序
(7)javascript代码注意：谨慎使用with,避免使用eval Function函数,减少作用域链查找。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span>)将JavaScript脚本放在页面的底部。
(<span class="hljs-number">2</span>)将JavaScript和CSS作为外部文件来引用：在实际应用中使用外部文件可以提高页面速度，因为JavaScript和CSS文件都能在浏览器中产生缓存。
(<span class="hljs-number">3</span>)缩小JavaScript和CSS
(<span class="hljs-number">4</span>)删除重复的脚本
(<span class="hljs-number">5</span>)最小化DOM的访问：使用JavaScript访问DOM元素比较慢。
(<span class="hljs-number">6</span>)开发智能的事件处理程序
(<span class="hljs-number">7</span>)javascript代码注意：谨慎使用with,避免使用eval Function函数,减少作用域链查找。</code></pre>
</li>
<li>
<p>图像优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)优化图片大小
(2)通过CSS Sprites优化图片
(3)不要在HTML中使用缩放图片
(4)favicon.ico要小而且可缓存
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span>)优化图片大小
(<span class="hljs-number">2</span>)通过CSS Sprites优化图片
(<span class="hljs-number">3</span>)不要在HTML中使用缩放图片
(<span class="hljs-number">4</span>)favicon.ico要小而且可缓存
</code></pre>
<p>本文仅用来记录自己在学习中的总结和思考。参考：<a href="http://developer.yahoo.com/performance/rules.html" rel="nofollow noreferrer" target="_blank">http://developer.yahoo.com/pe...</a></p>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB前端性能优化常见方法

## 原文链接
[https://segmentfault.com/a/1190000008829958](https://segmentfault.com/a/1190000008829958)

