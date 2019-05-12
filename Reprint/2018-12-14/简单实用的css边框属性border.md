---
title: '简单实用的css边框属性border' 
date: 2018-12-14 2:30:11
hidden: true
slug: 3qcmh9xupou
categories: [reprint]
---

{{< raw >}}

                    
<p>本文主要讲述利用border属性做出不同的几何形状从而适用于比较好看的视觉样式。</p>
<blockquote>预备知识</blockquote>
<p>border相关属性</p>
<ul>
<li>border-width 边框的宽度</li>
<li>border-style 边框的样式</li>
<li>border-color 边框的颜色</li>
</ul>
<blockquote>案例举例</blockquote>
<p>为了更加通俗易懂，demo用的是最简单的dom元素和css属性</p>
<p><span class="img-wrap"><img data-src="/img/bV3qOJ?w=582&amp;h=125" src="https://static.alili.tech/img/bV3qOJ?w=582&amp;h=125" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;border&quot;>
    <div class=&quot;border-left&quot;>商品介绍</div>
    <div class=&quot;border-icon&quot;></div>
    <div class=&quot;border-right&quot;>商品评价</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"border"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"border-left"</span>&gt;商品介绍&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"border-icon"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"border-right"</span>&gt;商品评价&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border{
    margin: 50px auto;
    width: 540px;
    font-size:18px;
    line-height: 40px;
    text-align: center;
}
.border-left{
    width: 260px;
    height: 40px;
    background: #f3941d;
    float: left;
    color: #fff;
}
.border-icon{
    width: 0px;
    height: 0;
    border-width: 40 20 0 0;
    border-style: solid;
    border-color: #f3941d #f5d7b7 #f3941d #f3941d;
    float: left;
}
.border-right{
    width: 260px;
    height: 40px;
    float: right;
    background: #f5d7b7;
    color: #aaa;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.border</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">540px</span>;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.border-left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f3941d</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.border-icon</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">40</span> <span class="hljs-number">20</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#f3941d</span> <span class="hljs-number">#f5d7b7</span> <span class="hljs-number">#f3941d</span> <span class="hljs-number">#f3941d</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.border-right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5d7b7</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#aaa</span>;
}</code></pre>
<p>上面的css代码重点在于左边较深颜色与右边较浅颜色中间有一个三角形<strong>.border-icon</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3qOY?w=593&amp;h=122" src="https://static.alili.tech/img/bV3qOY?w=593&amp;h=122" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content&quot;>
    <div class=&quot;border&quot;>
        <div class=&quot;small-triangle&quot;></div>
        <div class=&quot;text&quot;>介绍</div>
        <div class=&quot;big-triangle&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"content"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"border"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"small-triangle"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"text"</span>&gt;介绍&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"big-triangle"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content{
    margin: 60px auto;
    width: 540px;
    height: auto;
    position: relative;
    border-top: 1px solid #ddd;
}
.border{
    position: absolute;
    margin-top: -15px;
    margin-left: 20px;
}
.text{
    background: #e14340;
    height: 70px;
    width: 60px;
    line-height: 80px;
    color: #fff;
    text-align: center;
}
.small-triangle{
    position: absolute;
    width: 0;
    height: 0;
    border-width: 15px 10px 0px 0px;
    border-style: solid;
    border-color: #fff #c33a37 #ccc #ddd;
    margin-left: -10px;
}
.big-triangle{
    width: 0;
    height: 0;
    border-width: 8px 30px;
    border-style: solid;
    border-color: #e14340 #e14340 #fff #e14340;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">60px</span> auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">540px</span>;
    <span class="hljs-attribute">height</span>: auto;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
}
<span class="hljs-selector-class">.border</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">15px</span>;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.text</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#e14340</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">70px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.small-triangle</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">15px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#fff</span> <span class="hljs-number">#c33a37</span> <span class="hljs-number">#ccc</span> <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.big-triangle</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">8px</span> <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#e14340</span> <span class="hljs-number">#e14340</span> <span class="hljs-number">#fff</span> <span class="hljs-number">#e14340</span>;
}</code></pre>
<p>上面的css代码重点在于左边较深颜色的小三角<strong>.small-triangle</strong>和底部的三角<strong>.big-triangle</strong></p>
<blockquote>原理解析</blockquote>
<p>那么border属性是如何变化出不同的几何形状呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border1{
    width:0; 
    height:0; 
    border-width:20px 20px 20px 20px; 
    border-style:solid; 
    border-color:#aaa #bbb #ccc #ddd;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.border1</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">0</span>; 
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>; 
    <span class="hljs-attribute">border-width</span>:<span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span>; 
    <span class="hljs-attribute">border-style</span>:solid; 
    <span class="hljs-attribute">border-color</span>:<span class="hljs-number">#aaa</span> <span class="hljs-number">#bbb</span> <span class="hljs-number">#ccc</span> <span class="hljs-number">#ddd</span>;
}</code></pre>
<p>看看上述样式产生的是一个什么样子的内容<br><span class="img-wrap"><img data-src="/img/bV3rxq?w=573&amp;h=93" src="https://static.alili.tech/img/bV3rxq?w=573&amp;h=93" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们通过<strong>border-width</strong> <strong>border-color</strong>可以任意变化每一条变的宽高，和颜色。<br>任意组合就能组成不同的由三角形组成的其它几何形状了。</p>
<blockquote>更多内容可关注微信公众号：有一个姑娘在coding<br>好好学习，快乐编码</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单实用的css边框属性border

## 原文链接
[https://segmentfault.com/a/1190000013175008](https://segmentfault.com/a/1190000013175008)

