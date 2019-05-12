---
title: 'JS 获取屏幕、浏览器、页面的高度宽度' 
date: 2019-01-06 2:30:10
hidden: true
slug: o1al63hwi7t
categories: [reprint]
---

{{< raw >}}

                    
<p>（草稿）</p>
<h2 id="articleHeader0">屏幕信息</h2>
<ul>
<li><p><code>screen.height</code> ：屏幕高度。</p></li>
<li><p><code>screen.width</code> ：屏幕宽度。</p></li>
<li><p><code>screen.availHeight</code> ：屏幕可用高度。即屏幕高度减去上下任务栏后的高度，可表示为软件最大化时的高度。</p></li>
<li><p><code>screen.availWidth</code> ：屏幕可用宽度。即屏幕宽度减去左右任务栏后的宽度，可表示为软件最大化时的宽度。</p></li>
</ul>
<p><strong>任务栏高/宽度</strong> ：可通过屏幕高/宽度 减去 屏幕可用高/宽度得出。如：<code>任务栏高度</code> = <code>screen.height - screen.availHeight</code></p>
<h2 id="articleHeader1">浏览器信息</h2>
<ul>
<li><p><code>window.outerHeight</code> ：浏览器高度。</p></li>
<li><p><code>window.outerWidth</code> ：浏览器宽度。</p></li>
<li><p><code>window.innerHeight</code> ：浏览器内页面可用高度；此高度包含了水平滚动条的高度(若存在)。可表示为浏览器当前高度去除浏览器边框、工具条后的高度。</p></li>
<li><p><code>window.innerWidth</code> ：浏览器内页面可用宽度；此宽度包含了垂直滚动条的宽度(若存在)。可表示为浏览器当前宽度去除浏览器边框后的宽度。</p></li>
</ul>
<p><strong>工具栏高/宽度</strong> ：包含了地址栏、书签栏、浏览器边框等范围。如：高度，可通过浏览器高度 - 页面可用高度得出，即：<code>window.outerHeight - window.innerHeight</code>。</p>
<h2 id="articleHeader2">页面信息</h2>
<ul>
<li><p><code>body.offsetHeight</code> ：body总高度。</p></li>
<li><p><code>body.offsetWidth</code> ：body总宽度。</p></li>
<li><p><code>body.clientHeight</code> ：body展示的高度；表示body在浏览器内显示的区域高度。</p></li>
<li><p><code>body.clientWidth</code> ：body展示的宽度；表示body在浏览器内显示的区域宽度。</p></li>
</ul>
<p><strong>滚动条高度/宽度</strong> ：如高度，可通过浏览器内页面可用高度 - body展示高度得出，即<code>window.innerHeight - body.clientHeight</code></p>
<p>参见：<a href="http://www.cnblogs.com/polk6/p/5051935.html" rel="nofollow noreferrer" target="_blank">HTML 获取屏幕、浏览器、页面的高度宽度</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 获取屏幕、浏览器、页面的高度宽度

## 原文链接
[https://segmentfault.com/a/1190000010443608](https://segmentfault.com/a/1190000010443608)

