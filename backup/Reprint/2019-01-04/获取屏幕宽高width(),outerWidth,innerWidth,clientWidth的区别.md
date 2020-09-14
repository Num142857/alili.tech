---
title: '获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别' 
date: 2019-01-04 2:30:10
hidden: true
slug: wps6ztik5ir
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基本介绍</h2>
<h3 id="articleHeader1">$(window).width()与$(window).height()</h3>
<p><code>$(window).width()</code>与<code>$(window).height()</code>：获得的是屏幕可视区域的宽高，不包括滚动条与工具条。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).width() = width + padding
$(window).height() = height + padding" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>$(window).<span class="hljs-built_in">width</span>() = <span class="hljs-built_in">width</span> + padding
$(window).<span class="hljs-built_in">height</span>() = <span class="hljs-built_in">height</span> + padding</code></pre>
<h3 id="articleHeader2">document.documentElement.clientWidth与document.documentElement.clientHeight</h3>
<p><code>document.documentElement.clientWidth</code>与<code>document.documentElement.clientHeight</code>：获得的是屏幕可视区域的宽高，不包括滚动条与工具条，跟jquery的(window).width()与(window).height()获得的结果是一样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.clientWidth = width + padding
document.documentElement.clientHeight = height + padding" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span> = <span class="hljs-attribute">width</span> + padding
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span> = <span class="hljs-attribute">height</span> + padding</code></pre>
<h3 id="articleHeader3">window.innerWidth与window.innerHeight</h3>
<p><code>window.innerWidth</code>与<code>window.innerHeight</code>：获得的是可视区域的宽高，但是window.innerWidth宽度包含了纵向滚动条的宽度，window.innerHeight高度包含了横向滚动条的高度(IE8以及低版本浏览器不支持)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.innerWidth = width + padding + border + 纵向滚动条宽度
window.innerHeight = height + padding + border + 横向滚动条高度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>window<span class="hljs-selector-class">.innerWidth</span> = <span class="hljs-attribute">width</span> + padding + border + 纵向滚动条宽度
window<span class="hljs-selector-class">.innerHeight</span> = <span class="hljs-attribute">height</span> + padding + border + 横向滚动条高度</code></pre>
<h3 id="articleHeader4">window.outerWidth与window.outerHeight</h3>
<p><code>window.outerWidth</code>与<code>window.outerHeight</code>：获得的是加上工具条与滚动条窗口的宽度与高度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.outerWidth = width + padding + border + 纵向滚动条宽度
window.outerHeight = height + padding + border + 横向滚动条高度 + 工具条高度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>window<span class="hljs-selector-class">.outerWidth</span> = <span class="hljs-attribute">width</span> + padding + border + 纵向滚动条宽度
window<span class="hljs-selector-class">.outerHeight</span> = <span class="hljs-attribute">height</span> + padding + border + 横向滚动条高度 + 工具条高度</code></pre>
<h3 id="articleHeader5">document.body.clientWidth与document.body.clientHeight</h3>
<p><code>document.body.clientWidth</code>与<code>document.body.clientHeight</code>：document.body.clientWidth获得的也是可视区域的宽度，但是document.body.clientHeight获得的是body内容的高度，如果内容只有200px，那么这个高度也是200px,如果想通过它得到屏幕可视区域的宽高，需要样式设置，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
height: 100%;
overflow: hidden;
}
body, div, p, ul {
margin: 0;
padding: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
<span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">div</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">ul</span> {
<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>最关键的是：body的height:100%影响document.body.clientHeight的值。<br>body的margin:0,padding:0影响document.body.clientWidth的值。</p>
<h3 id="articleHeader6">offsetWidth &amp; offsetHeight</h3>
<p>返回本身的宽高 + padding + border + 滚动条</p>
<h3 id="articleHeader7">offsetLeft &amp; offsetTop</h3>
<p>所有HTML元素拥有offsetLeft和offsetTop属性来返回元素的X和Y坐标</p>
<blockquote>
<p>1.相对于已定位元素的后代元素和一些其他元素（表格单元），这些属性返回的坐标是相对于祖先元素<br>2.一般元素，则是相对于文档，返回的是文档坐标</p>
<p>offsetParent属性指定这些属性所相对的父元素，如果offsetParent为null，则这些属性都是文档坐标</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用offsetLeft和offsetTop来计算e的位置
function getElementPosition(e){
    var x = 0,y = 0;
    while(e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {
        x : x,
        y : y
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//用offsetLeft和offsetTop来计算e的位置</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementPosition</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">0</span>,y = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(e != <span class="hljs-literal">null</span>) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    <span class="hljs-keyword">return</span> {
        x : x,
        y : y
    };
}</code></pre>
<h3 id="articleHeader8">scrollWidth &amp; scrollHeight</h3>
<p>这两个属性是元素的内容区域加上内边距，在加上任何溢出内容的尺寸.</p>
<p>因此，如果没有溢出时，这些属性与clientWidth和clientHeight是相等的。</p>
<h3 id="articleHeader9">scrollLeft &amp; scrollTop</h3>
<p>指定的是元素的滚动条的位置</p>
<p>scrollLeft和scrollTop都是可写的属性，通过设置它们来让元素中的内容滚动。</p>
<h2 id="articleHeader10">兼容性</h2>
<p>1.window innerWidth 和 innerHeight 属性与outerWidth和outerHeight属性IE8以及以下不支持。</p>
<p>2.测试浏览器IE，火狐，谷歌，360浏览器，Safari都支持document.documentElement.clientWidth与document.documentElement.clientHeight。</p>
<h2 id="articleHeader11">结论</h2>
<p>获取屏幕的可视区域的宽高可使用jquery的方式获得，也可以使用原生js获得，即：</p>
<p>document.documentElement.clientWidth与document.documentElement.clientHeight</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别

## 原文链接
[https://segmentfault.com/a/1190000010746091](https://segmentfault.com/a/1190000010746091)

