---
title: '使用SVG + CSS实现动态霓虹灯文字效果' 
date: 2019-01-02 2:30:09
hidden: true
slug: y3ogrk0nwid
categories: [reprint]
---

{{< raw >}}

                    
<p>早上无意间进入一个网站，看到他们的LOGO效果略屌，如图：<br><span class="img-wrap"><img data-src="/img/bVT9At?w=420&amp;h=172" src="https://static.alili.tech/img/bVT9At?w=420&amp;h=172" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>刚开始以为是gif动画之类的，审查元素发现居然是用SVG + CSS3动画实现的，顿时激起了我的(hao)欲(qi)望(xin)，决定要一探究竟，查看代码之后，发现原理居然是如此简单：<strong>多个SVG描边动画使用不同的animation-delay即可！</strong></p>
<hr>
<p>对于一个形状SVG元素或文本SVG元素，可以使用stroke-dasharray来控制描边的间隔样式，并且可以用stroke-dashoffset来控制描边的偏移量，借此可以实现描边动画效果，更具体的资料可以看看张大神的《<a href="http://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/" rel="nofollow noreferrer" target="_blank">纯CSS实现帅气的SVG路径描边动画效果</a>》</p>
<p>我们先实现一个简单的文字描边动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;100%&quot; height=&quot;100&quot;>
    <text text-anchor=&quot;middle&quot; x=&quot;50%&quot; y=&quot;50%&quot; class=&quot;text&quot;>
        segmentfault.com
    </text>
</svg> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"100"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>
        segmentfault.com
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span> </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text{
    font-size: 64px;
    font-weight: bold;
    text-transform: uppercase;
    fill: none;
    stroke: #3498db;
    stroke-width: 2px;
    stroke-dasharray: 90 310;
    animation: stroke 6s infinite linear;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">64px</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">fill</span>: none;
    <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#3498db</span>;
    <span class="hljs-attribute">stroke-width</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">stroke-dasharray</span>: <span class="hljs-number">90</span> <span class="hljs-number">310</span>;
    <span class="hljs-attribute">animation</span>: stroke <span class="hljs-number">6s</span> infinite linear;
}
@<span class="hljs-keyword">keyframes</span> stroke {
  100% {
    <span class="hljs-attribute">stroke-dashoffset</span>: -<span class="hljs-number">400</span>;
  }
}</code></pre>
<p>演示地址：<a href="http://output.jsbin.com/demiculoqe" rel="nofollow noreferrer" target="_blank">http://output.jsbin.com/demic...</a></p>
<p>然后我们同时使用多个描边动画，并设置不同的animation-delay：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;100%&quot; height=&quot;100&quot;>
    <text text-anchor=&quot;middle&quot; x=&quot;50%&quot; y=&quot;50%&quot; class=&quot;text text-1&quot;>
        segmentfault.com
    </text>
    <text text-anchor=&quot;middle&quot; x=&quot;50%&quot; y=&quot;50%&quot; class=&quot;text text-2&quot;>
        segmentfault.com
    </text>
    <text text-anchor=&quot;middle&quot; x=&quot;50%&quot; y=&quot;50%&quot; class=&quot;text text-3&quot;>
        segmentfault.com
    </text>
    <text text-anchor=&quot;middle&quot; x=&quot;50%&quot; y=&quot;50%&quot; class=&quot;text text-4&quot;>
        segmentfault.com
    </text>
</svg> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"100"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text text-1"</span>&gt;</span>
        segmentfault.com
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text text-2"</span>&gt;</span>
        segmentfault.com
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text text-3"</span>&gt;</span>
        segmentfault.com
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text text-4"</span>&gt;</span>
        segmentfault.com
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span> </code></pre>
<p>注意：要使用多少种颜色，就放多少个text</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text{
    font-size: 64px;
    font-weight: bold;
    text-transform: uppercase;
    fill: none;
    stroke-width: 2px;
    stroke-dasharray: 90 310;
    animation: stroke 6s infinite linear;
}
.text-1{
    stroke: #3498db;
    text-shadow: 0 0 5px #3498db;
    animation-delay: -1.5s;
}
.text-2{
    stroke: #f39c12;
    text-shadow: 0 0 5px #f39c12;
    animation-delay: -3s;
}
.text-3{
    stroke: #e74c3c;
    text-shadow: 0 0 5px #e74c3c;
    animation-delay: -4.5s;
}
.text-4{
    stroke: #9b59b6;
    text-shadow: 0 0 5px #9b59b6;
    animation-delay: -6s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">64px</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">fill</span>: none;
    <span class="hljs-attribute">stroke-width</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">stroke-dasharray</span>: <span class="hljs-number">90</span> <span class="hljs-number">310</span>;
    <span class="hljs-attribute">animation</span>: stroke <span class="hljs-number">6s</span> infinite linear;
}
<span class="hljs-selector-class">.text-1</span>{
    <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#3498db</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#3498db</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">1.5s</span>;
}
<span class="hljs-selector-class">.text-2</span>{
    <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#f39c12</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#f39c12</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-class">.text-3</span>{
    <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#e74c3c</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#e74c3c</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">4.5s</span>;
}
<span class="hljs-selector-class">.text-4</span>{
    <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#9b59b6</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#9b59b6</span>;
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">6s</span>;
}

@<span class="hljs-keyword">keyframes</span> stroke {
  100% {
    <span class="hljs-attribute">stroke-dashoffset</span>: -<span class="hljs-number">400</span>;
  }
}</code></pre>
<p>大功告成，演示地址：<a href="http://output.jsbin.com/vuyuvojiro" rel="nofollow noreferrer" target="_blank">http://output.jsbin.com/vuyuv...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVUadG?w=419&amp;h=85" src="https://static.alili.tech/img/bVUadG?w=419&amp;h=85" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>需要注意的几个点：</p>
<ol>
<li>各个元素的animation-delay与animation的总时长的设置要协调</li>
<li>stroke-dashoffset与stroke-dasharray的设置要协调</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用SVG + CSS实现动态霓虹灯文字效果

## 原文链接
[https://segmentfault.com/a/1190000010963326](https://segmentfault.com/a/1190000010963326)

