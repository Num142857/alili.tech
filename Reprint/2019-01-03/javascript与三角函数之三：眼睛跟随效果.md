---
title: 'javascript与三角函数之三：眼睛跟随效果' 
date: 2019-01-03 2:30:11
hidden: true
slug: 2chzsg1ih69
categories: [reprint]
---

{{< raw >}}

                    
<h4>我们先看下最后的效果</h4>
<p><span class="img-wrap"><img data-src="/img/bVTp6V?w=1106&amp;h=924" src="https://static.alili.tech/img/bVTp6V?w=1106&amp;h=924" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>实现思路</h4>
<p><span class="img-wrap"><img data-src="/img/bVTqsv?w=598&amp;h=471" src="https://static.alili.tech/img/bVTqsv?w=598&amp;h=471" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>要实现眼睛随鼠标一起运动，我们必须先求出眼睛的坐标，也就是它的left和top值</li>
<li>为了取到left和top值，我们只要知道α角的内三角形的对边和邻边的长度即可</li>
<li>为了取到对边和邻边，我们只需要知道α角的弧度即可</li>
<li>α角的弧度，我们可能通过图中a边和b边，再使用<code>arctan(a/b)</code>，即可求得</li>
<li>a边的长度为：鼠标y轴的坐标 - （offsetY + r）</li>
<li>b边的长度为：鼠标x轴的坐标 - （offsetX + r）</li>
</ul>
<h4>部分实现</h4>
<blockquote><p>计算offsetX和offsetY</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旋转轨道的left和top值，也就是图中offsetX和offsetY
var wLeft = $('.wrap').offset().left
var wTop = $('.wrap').offset().top
// 旋转轨道的半径
var r = 12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 旋转轨道的left和top值，也就是图中offsetX和offsetY</span>
<span class="hljs-selector-tag">var</span> wLeft = $(<span class="hljs-string">'.wrap'</span>).offset()<span class="hljs-selector-class">.left</span>
<span class="hljs-selector-tag">var</span> wTop = $(<span class="hljs-string">'.wrap'</span>).offset()<span class="hljs-selector-class">.top</span>
<span class="hljs-comment">// 旋转轨道的半径</span>
<span class="hljs-selector-tag">var</span> r = <span class="hljs-number">12</span></code></pre>
<blockquote><p>计算a边和b边的长度</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// b边的长度
var diffX = ev.pageX - (wLeft + r)
// a边的长度
var diffY = ev.pageY - (wTop + r)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// b边的长度</span>
<span class="hljs-selector-tag">var</span> diffX = ev<span class="hljs-selector-class">.pageX</span> - (wLeft + r)
<span class="hljs-comment">// a边的长度</span>
<span class="hljs-selector-tag">var</span> diffY = ev<span class="hljs-selector-class">.pageY</span> - (wTop + r)</code></pre>
<blockquote><p>计算α</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 弧度α
var deg = Math.atan(Math.abs(diffY) / Math.abs(diffX))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 弧度α</span>
<span class="hljs-keyword">var</span> deg = <span class="hljs-built_in">Math</span>.atan(<span class="hljs-built_in">Math</span>.abs(diffY) / <span class="hljs-built_in">Math</span>.abs(diffX))</code></pre>
<blockquote><p>计算内三角形的对边和邻边</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 内三角形的邻边
var x = Math.cos(deg) * r
// 内三角形的对边
var y = Math.sin(deg) * r" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 内三角形的邻边</span>
<span class="hljs-keyword">var</span> x = Math.<span class="hljs-built_in">cos</span>(deg) * <span class="hljs-built_in">r</span>
<span class="hljs-comment">// 内三角形的对边</span>
<span class="hljs-keyword">var</span> y = Math.<span class="hljs-built_in">sin</span>(deg) * <span class="hljs-built_in">r</span></code></pre>
<blockquote><p>计算出眼睛的left值和top值</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var left = (r + x) + 'px'
var top = (r + y) + 'px'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-attribute">left</span> = (r + x) + <span class="hljs-string">'px'</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-attribute">top</span> = (r + y) + <span class="hljs-string">'px'</span></code></pre>
<h4>四象限角度问题</h4>
<p>上面我们获取了left值和top值，但是这只限于0~90度，也就是第四象限是可以了，关于四象限，我们上一张图</p>
<p><span class="img-wrap"><img data-src="/img/bVTqRD?w=900&amp;h=900" src="https://static.alili.tech/img/bVTqRD?w=900&amp;h=900" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当鼠标落在第三象限的时候，计算出来的角度应该是90~180度，我们得出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deg = Math.PI - deg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">deg</span> = Math.<span class="hljs-built_in">PI</span> - <span class="hljs-built_in">deg</span></code></pre>
<p>当鼠标落在第二象限的时候，计算出来的角度应该是180~270度，我们得出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deg = Math.PI + deg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">deg</span> = Math.<span class="hljs-built_in">PI</span> + <span class="hljs-built_in">deg</span></code></pre>
<p>当鼠标落在第一象限的时候，计算出来的角度应该是270~360度，我们得出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deg = 2 * Math.PI - deg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">deg</span> = <span class="hljs-number">2</span> * Math.<span class="hljs-built_in">PI</span> - <span class="hljs-built_in">deg</span></code></pre>
<h5>要查看最终效果以及具体实现，请<a href="https://github.com/sunhaikuo/triangle/blob/master/eye.html" rel="nofollow noreferrer" target="_blank">用力点我</a>
</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript与三角函数之三：眼睛跟随效果

## 原文链接
[https://segmentfault.com/a/1190000010789088](https://segmentfault.com/a/1190000010789088)

