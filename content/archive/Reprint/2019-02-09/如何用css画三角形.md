---
title: '如何用css画三角形' 
date: 2019-02-09 2:30:58
hidden: true
slug: szu5sx35dh
categories: [reprint]
---

{{< raw >}}

                    
<p>在设计稿中，经常会出现好多三角形，如果将三角形变成图片，通过img标签的src或者background中的url来访问，从前端性能方面来看这并不好。那问题来了，如何用css来画三角形呢？别着急，先来看看我所遇到过的三角形。如下图，有实心三角形，空心的，还有可以归为三角形的小箭头。</p>
<p><span class="img-wrap"><img data-src="/img/bVx8UW" src="https://static.alili.tech/img/bVx8UW" alt="三角形举例" title="三角形举例" style="cursor: pointer; display: inline;"></span></p>
<p>先来说说实心的三角形。</p>
<p>画一个三角形，首先想到的是如何画三角形的形状，然后给一个背景颜色。但是在写div时，会发现，div是的边框是直线。那么，我想到，要是给div的高和宽设置为0，然后设置四个border不同的颜色，那么这个颜色会重叠覆盖么？ps：当然会想到设置padding或者margin值，但是这两种属性无法设置颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#triangle02{
    width: 0;
    height: 0;
    border-top: 50px solid blue;
    border-right: 50px solid red;
    border-bottom: 50px solid green;
    border-left: 50px solid yellow;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#triangle02</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid blue;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid green;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">50px</span> solid yellow;
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVx8Ve" src="https://static.alili.tech/img/bVx8Ve" alt="四个三角形图片" title="四个三角形图片" style="cursor: pointer; display: inline;"></span></p>
<p>因为我们只想要一个三角形，如果把其他三个三角形的颜色变白，那就只剩下一个，等等，如果背景颜色不是白色呢？css中有这样一个属性，transparent，背景透明。这样便可以达到我们的目的了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#triangle03{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 50px solid blue;
    }
#triangle04{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-right: 50px solid red;
    }
#triangle05{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 50px solid green;
    }
#triangle06{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-left: 50px solid yellow;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#triangle03</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid blue;
    }
<span class="hljs-selector-id">#triangle04</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid red;
    }
<span class="hljs-selector-id">#triangle05</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid green;
    }
<span class="hljs-selector-id">#triangle06</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">50px</span> solid yellow;
    }</code></pre>
<p>上面的代码就可以实现，四个不同方向的三角形了。</p>
<p><span class="img-wrap"><img data-src="/img/bVx8RR" src="https://static.alili.tech/img/bVx8RR" alt="不同方向的四个三角形" title="不同方向的四个三角形" style="cursor: pointer; display: inline;"></span></p>
<p>设计稿中可能还会出现高和底长度有限制的三角形，这里以第三个绿色三角形为例。看上面的代码，我们可以发现，三角形的底为border的两倍，border-bottom为三角形的高。来看下面这组三角形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#my01{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 50px solid green;
    }
#my02{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 80px solid green;
    }
#my03{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 100px solid green;
    }
#my04{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 150px solid green;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#my01</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid green;
    }
<span class="hljs-selector-id">#my02</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">80px</span> solid green;
    }
<span class="hljs-selector-id">#my03</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid green;
    }
<span class="hljs-selector-id">#my04</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">150px</span> solid green;
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVx8Uk" src="https://static.alili.tech/img/bVx8Uk" alt="等底三角形" title="等底三角形" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#my11{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 100px solid green;
    }
#my12{
    width: 0;
    height: 0;
    border: 70px solid transparent;
    border-bottom: 100px solid green;
    }
#my13{
    width: 0;
    height: 0;
    border: 90px solid transparent;
    border-bottom: 100px solid green;
    }
#my14{
    width: 0;
    height: 0;
    border: 110px solid transparent;
    border-bottom: 100px solid green;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#my11</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid green;
    }
<span class="hljs-selector-id">#my12</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">70px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid green;
    }
<span class="hljs-selector-id">#my13</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">90px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid green;
    }
<span class="hljs-selector-id">#my14</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">110px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">100px</span> solid green;
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVx8Uz" src="https://static.alili.tech/img/bVx8Uz" alt="等高三角形" title="等高三角形" style="cursor: pointer; display: inline;"></span></p>
<p>够详细吧~</p>
<p>那个小箭头的三角形，主要运用了css3的transform中的rotate()，我们后续再介绍吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用css画三角形

## 原文链接
[https://segmentfault.com/a/1190000005715074](https://segmentfault.com/a/1190000005715074)

