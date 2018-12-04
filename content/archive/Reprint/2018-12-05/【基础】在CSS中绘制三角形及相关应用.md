---
title: '【基础】在CSS中绘制三角形及相关应用' 
date: 2018-12-05 2:30:09
hidden: true
slug: rnkapw09x6m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>本文简要阐述了用CSS边框的方法在页面上绘制三角形，包括几种典型的三角形绘制，还介绍了几个简单的应用场景。利用边框绘制三角形方法只是众多方案中的一种，大家根据项目实际，选用最适宜项目的方案。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387719?w=700&amp;h=190" src="https://static.alili.tech/img/remote/1460000014387719?w=700&amp;h=190" alt="CSS与三角形" title="CSS与三角形" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">1 基本原理</h2>
<p>在CSS中，我们可以利用border-top、border-left、border-bottom、border-left四个属性来绘制三角形。实现的基本原理参见下面的演示代码及其运行结果。</p>
<h4>核心代码：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width: 50px;
    height: 50px;
    border-top: 50px solid red;
    border-left:50px solid blue;
    border-right: 50px solid green;
    border-bottom: 50px solid yellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-left</span>:<span class="hljs-number">50px</span> solid blue;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid green;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid yellow;
}</code></pre>
<h4>运行结果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387720?w=690&amp;h=184" src="https://static.alili.tech/img/remote/1460000014387720?w=690&amp;h=184" alt="边框基本原理" title="边框基本原理" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/108" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>从以上代码及运行结果不难想出绘制三角形的办法，我们只要将 <code>.box</code> 的长度和宽度都设成0，就可以得到四个等腰三角形。再将不想保留的三角形边框颜色设置成透明色（即：<code>border-color : transparent</code>）就可以隐藏掉不想保留的三角形。从而完成三角形的绘制。</p>
<h2 id="articleHeader2">2 绘制三角形</h2>
<h3 id="articleHeader3">2.1 等边三角形</h3>
<p>等边三角形（又称正三边形），为三边相等的三角形，其三个内角相等，均为60°，它是锐角三角形的一种。等边三角形也是最稳定的结构。</p>
<h4>2.1.1 尖角向上：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-up {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 57.735px solid transparent;
    border-right: 57.735px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-up</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">57.735px</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">57.735px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387721?w=691&amp;h=132" src="https://static.alili.tech/img/remote/1460000014387721?w=691&amp;h=132" alt="尖角向上等边三角形" title="尖角向上等边三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/109" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.1.2 尖角向下：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-down {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 57.735px solid transparent;
    border-right: 57.735px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-down</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">57.735px</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">57.735px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387722?w=691&amp;h=132" src="https://static.alili.tech/img/remote/1460000014387722?w=691&amp;h=132" alt="尖角向下等边三角形" title="尖角向下等边三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/110" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.1.3 尖角向左：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-left {
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-top: 57.735px solid transparent;
    border-bottom: 57.735px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-left</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">57.735px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">57.735px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387723?w=690&amp;h=146" src="https://static.alili.tech/img/remote/1460000014387723?w=690&amp;h=146" alt="尖角向左等边三角形" title="尖角向左等边三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/111" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.1.4 尖角向右：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-right {
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 57.735px solid transparent;
    border-bottom: 57.735px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-right</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">57.735px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">57.735px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387724?w=692&amp;h=145" src="https://static.alili.tech/img/remote/1460000014387724?w=692&amp;h=145" alt="尖角向右等边三角形" title="尖角向右等边三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/112" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader4">2.2 等腰直角三角形</h3>
<p>等腰直角三角形是特殊的等腰三角形，它的两底角相等，都是45°；它的两腰长度相等。</p>
<h4>2.2.1 左上直角：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-top-left{
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-top-left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">100px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387725?w=690&amp;h=137" src="https://static.alili.tech/img/remote/1460000014387725?w=690&amp;h=137" alt="左上直角等腰直角三角形" title="左上直角等腰直角三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/113" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.2.2 右上直角：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-top-right {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-top-right</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">100px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387726?w=692&amp;h=135" src="https://static.alili.tech/img/remote/1460000014387726?w=692&amp;h=135" alt="右上直角等腰直角三角形" title="右上直角等腰直角三角形" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/114" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.2.3 左下直角：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-bottom-left{
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-bottom-left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">100px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387727?w=691&amp;h=137" src="https://static.alili.tech/img/remote/1460000014387727?w=691&amp;h=137" alt="左下直角等腰直角三角形" title="左下直角等腰直角三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/115" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.2.4 右下直角：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle-bottom-right {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.triangle-bottom-right</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">100px</span> solid transparent;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387728?w=691&amp;h=136" src="https://static.alili.tech/img/remote/1460000014387728?w=691&amp;h=136" alt="右下直角等腰直角三角形" title="右下直角等腰直角三角形" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/116" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader5">3 相关应用</h2>
<h3 id="articleHeader6">3.1 弹出框(popover)组件</h3>
<p>弹出框(popover)或提示框(tooltip)一般都会用到三角形，三角形明确并加强了指向作用。类似于Bootstrap的Popover和Tooltip组件都用到了边框三角形的实现方式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387729?w=689&amp;h=147" src="https://static.alili.tech/img/remote/1460000014387729?w=689&amp;h=147" alt="弹出框(popover)组件" title="弹出框(popover)组件" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/117" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>上述演示只是实现了顶部弹出框，其它方向弹出框参考上述实现方式即可。</p>
<h3 id="articleHeader7">3.2 视频播放按钮</h3>
<p>视频播放按钮(Play button)可以采用边框三角形的实现方式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014387730" src="https://static.alili.tech/img/remote/1460000014387730" alt="视频播放按钮组件" title="视频播放按钮组件" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/118" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>三角形的应用场景还有很多，比如下拉菜单(dropdown menu)中，或者是“顶”及“踩”按钮等。</p>
<p>边框实现三角形只是众多方案之一，大家可以根据项目实际，选择小图标方案或选用SVG方案。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【基础】在CSS中绘制三角形及相关应用

## 原文链接
[https://segmentfault.com/a/1190000014387714](https://segmentfault.com/a/1190000014387714)

