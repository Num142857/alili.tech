---
title: '[译] box-shadow 属性' 
date: 2019-02-09 2:30:59
hidden: true
slug: m6yr69wy1u
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<a href="https://bitsofco.de/the-box-shadow-property" rel="nofollow noreferrer" target="_blank">https://bitsofco.de/the-box-shadow-property</a></p></blockquote>
<p>PS：非直译。有翻译不当的地方，请指出。</p>
<p><a href="http://zicai.github.io/lessons/2016/05/24/the-box-shadow-property" rel="nofollow noreferrer" target="_blank"> </a></p>
<p>CSS3 引入的 <code>box-shadow</code> 属性用来创建阴影效果。阴影效果给我们的二维平面增加了深度的感觉。</p>
<h2 id="articleHeader0">语法</h2>
<p><code>box-shadow</code> 属性值由五部分组成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-shadow: offset-x offset-y blur spread color position;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">box</span>-shadow: offset-x offset-y blur spread <span class="hljs-built_in">color</span> <span class="hljs-built_in">position</span>;</code></pre>
<p>一定要注意顺序。</p>
<h3 id="articleHeader1">offset-x</h3>
<p>offset-x 用来声明阴影的水平偏移，即阴影在 X 轴上的位置。当值为正数，阴影位于元素的右侧，若值为负数，阴影位于元素的左侧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.5) }

.right { box-shadow: -20px 0px 10px 0px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006777322" src="https://static.alili.tech/img/remote/1460000006777322" alt="Demo of offset-x positive and negative values" title="Demo of offset-x positive and negative values" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">offset-y</h3>
<p>offset-y 用来声明阴影的垂直偏移，即阴影在 Y 轴上的位置。当值为正数，阴影位于元素的下面，若值为负数，阴影位于元素的上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 0px 20px 10px 0px rgba(0,0,0,0.5) }

.right { box-shadow: 0px -20px 10px 0px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> -<span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340705" src="https://static.alili.tech/img/remote/1460000005340705" alt="Demo of offset-y positive and negative values" title="Demo of offset-y positive and negative values" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">blur</h3>
<p>blur 表示阴影的模糊半径。效果与设计软件中使用的高斯模糊滤镜一样。值为 0 意味着阴影完全不模糊。blur 值越大，边角越不锋利，阴影越朦胧。不允许负值，负值等同于 0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.5) }

.middle { box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5) }

.right { box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.middle</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">50px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340709" src="https://static.alili.tech/img/remote/1460000005340709" alt="Demo of blur value at 0px, 20px and 50px" title="Demo of blur value at 0px, 20px and 50px" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">spread</h3>
<p>spread 表示阴影的大小。也可以把这个值看做阴影与元素之间的距离。当值为正数，阴影会向四周扩展。若值为负数，阴影会收缩，小于元素尺寸。默认值 0 会保持阴影和元素尺寸一致。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5) }

.middle { box-shadow: 0px 0px 20px 20px rgba(0,0,0,0.5) }

.right { box-shadow: 0px 50px 20px -20px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.middle</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">50px</span> <span class="hljs-number">20px</span> -<span class="hljs-number">20px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340711" src="https://static.alili.tech/img/remote/1460000005340711" alt="Demo of spread value at 0px, 20px and -20px" title="Demo of spread value at 0px, 20px and -20px" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">color</h3>
<p>color 表示阴影的颜色。可以是任何颜色单位。参见：<a href="https://bitsofco.de/working-with-colour-in-css/" rel="nofollow noreferrer" target="_blank">working with colour in css</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 0px 0px 20px 10px #67b3dd }

.right { box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">#67b3dd</span> }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340713" src="https://static.alili.tech/img/remote/1460000005340713" alt="Demo of color value " title="Demo of color value " style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">position</h3>
<p>position 表示阴影的位置，可选项。默认为外部阴影。可以通过使用 inset 关键字来制作内部阴影。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left { box-shadow: 20px 20px 10px 0px rgba(0,0,0,0.5) inset }

.right { box-shadow: 20px 20px 10px 0px rgba(0,0,0,0.5) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) inset }

<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340715" src="https://static.alili.tech/img/remote/1460000005340715" alt="Demo of position values as inset of default" title="Demo of position values as inset of default" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">多重阴影</h3>
<p>一个元素的 <code>box-shadow</code> 属性可以接受多个阴影声明，组成一个逗号分隔的列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".foo { 
    box-shadow: 20px 20px 10px 0px rgba(0,0,0,0.5) inset, /* inner shadow */
                20px 20px 10px 0px rgba(0,0,0,0.5); /* outer shadow */
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.foo</span> { 
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5) inset, <span class="hljs-comment">/* inner shadow */</span>
                <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5); <span class="hljs-comment">/* outer shadow */</span>
}    </code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340717" src="https://static.alili.tech/img/remote/1460000005340717" alt="Demo of multiple box shadows" title="Demo of multiple box shadows" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">圆角阴影</h3>
<p><code>box-shadow</code> 属性的 border-radius 由同一个元素的 <code>border-radius</code> 属性来控制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".foo { 
    box-shadow: 20px 20px 10px 0px rgba(0,0,0,0.5);
    border-raduis: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.foo</span> { 
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5);
    <span class="hljs-attribute">border-raduis</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340719" src="https://static.alili.tech/img/remote/1460000005340719" alt="Demo of rounded shadow" title="Demo of rounded shadow" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">组合起来</h2>
<p>把上面各部分组合起来，我们可以用 <code>box-shadow</code> 来创建一些惊人的效果。</p>
<h3 id="articleHeader10">Non-Layout-Blocking 边框的另一种选择</h3>
<p>用 <code>box-shadow</code> 模拟边框，不会影响盒模型以及页面其余部分的布局。利用多重阴影，可以使元素有不同颜色的边框。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".simple {
    box-shadow: 0px 0px 0px 40px indianred;
}

.multiple {
    box-shadow: 20px 20px 0px 20px lightcoral,
                -20px -20px 0px 20px mediumvioletred,
                0px 0px 0px 40px rgb(200,200,200);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.simple</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">40px</span> indianred;
}

<span class="hljs-selector-class">.multiple</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> lightcoral,
                -<span class="hljs-number">20px</span> -<span class="hljs-number">20px</span> <span class="hljs-number">0px</span> <span class="hljs-number">20px</span> mediumvioletred,
                <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">40px</span> <span class="hljs-built_in">rgb</span>(200,200,200);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340723" src="https://static.alili.tech/img/remote/1460000005340723" alt="Border using the box-shadow property" title="Border using the box-shadow property" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">pop-up 效果</h3>
<p>通过对 <code>box-shadow</code> (&amp; <code>transform</code>) 属性进行变换，可以模拟元素靠近和远离用户的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".popup {
    transform: scale(1);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s, transform 0.5s;
}
.popup:hover {
    transform: scale(1.3);
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s, transform 0.5s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.popup</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">transition</span>: box-shadow <span class="hljs-number">0.5s</span>, transform <span class="hljs-number">0.5s</span>;
}
<span class="hljs-selector-class">.popup</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.3);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">50px</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">transition</span>: box-shadow <span class="hljs-number">0.5s</span>, transform <span class="hljs-number">0.5s</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340721" src="https://static.alili.tech/img/remote/1460000005340721" alt="Pop-up effect using the box-shadow property" title="Pop-up effect using the box-shadow property" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">floating 效果</h3>
<p>给 <code>:after</code> 伪元素添加 <code>box-shadow</code>。在元素下方创建阴影，来模拟升起和下降。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".floating {
    position: relative;
    
    transform: translateY(0);
    transition: transform 1s;
}
.floating:after {
    content: &quot;&quot;;
    display: block;
    position: absolute;
    bottom: -30px;
    left: 50%;
    height: 8px;
    width: 100%;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);

    transform: translate(-50%, 0);
    transition: transform 1s;
}

/* Hover States */
.floating:hover {
    transform: translateY(-40px);
    transition: transform 1s;
}
.floating:hover:after {
    transform: translate(-50%, 40px) scale(0.75);
    transition: transform 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.floating</span> {
    <span class="hljs-attribute">position</span>: relative;
    
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.floating</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2);

    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
}

<span class="hljs-comment">/* Hover States */</span>
<span class="hljs-selector-class">.floating</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-40px);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.floating</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 40px) <span class="hljs-built_in">scale</span>(0.75);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005340725" src="https://static.alili.tech/img/remote/1460000005340725" alt="Floating effect using the box-shadow property" title="Floating effect using the box-shadow property" style="cursor: pointer; display: inline;"></span></p>
<p><code>box-shadow</code> 不单单是一个创建阴影的工具，使用它还可以创建很多其它复杂的效果。例如：<a href="http://codepen.io/haibnu/pen/FxGsI" rel="nofollow noreferrer" target="_blank">纸张效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="haibnu/pen/FxGsI" data-typeid="3">点击预览</button>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] box-shadow 属性

## 原文链接
[https://segmentfault.com/a/1190000005340697](https://segmentfault.com/a/1190000005340697)

