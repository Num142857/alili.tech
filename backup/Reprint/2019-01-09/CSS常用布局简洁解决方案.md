---
title: 'CSS常用布局简洁解决方案' 
date: 2019-01-09 2:30:12
hidden: true
slug: y9t6y1kyktd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">相关基础知识</h2>
<p><strong>1.内部与外部尺寸模型</strong>：（w3c草案）亲测google可支持。（<a href="http://w3.org/TR/css3-sizing" rel="nofollow noreferrer" target="_blank">http://w3.org/TR/css3-sizing</a> ）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="基于原有CSS尺寸特性，可以使CSS更容易描述内容自适应以及适应固定上下文的盒模型：

*min-content*:解析为这个容器内 部最大的不可断行元素的宽度(即最宽的单词、图片或具有固定宽度的盒元 素)；

*max-content*:类似于我们在前面看到的display: inline- block ；

*fit-content*:行为与浮动元素是相同的 。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>基于原有CSS尺寸特性，可以使CSS更容易描述内容自适应以及适应固定上下文的盒模型：

*<span class="hljs-built_in">min</span>-<span class="hljs-built_in">content</span>*:解析为这个容器内 部最大的不可断行元素的宽度(即最宽的单词、图片或具有固定宽度的盒元 素)；

*<span class="hljs-built_in">max</span>-<span class="hljs-built_in">content</span>*:类似于我们在前面看到的<span class="hljs-built_in">display</span>: inline- <span class="hljs-built_in">block</span> ；

*fit-<span class="hljs-built_in">content</span>*:行为与浮动元素是相同的 。
</code></pre>
<p><strong>2.可控表格布局：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*table-layout* （CSS2.1）属性:
默认值是 auto：其行为模式被称作自动表格布局算法，也就是我们最 为熟悉的表格布局行为 ；

*fixed：*固定表格布局算法，这个值的行为要明显可控一些。它把更多的控制权交给了网页开 发者，只把较少的控制权留给渲染引擎 ；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-strong">*table-layout*</span> （CSS2.1）属性:
默认值是 auto：其行为模式被称作自动表格布局算法，也就是我们最 为熟悉的表格布局行为 ；

<span class="hljs-strong">*fixed：*</span>固定表格布局算法，这个值的行为要明显可控一些。它把更多的控制权交给了网页开 发者，只把较少的控制权留给渲染引擎 ；
</code></pre>
<hr>
<h2 id="articleHeader1">常见布局的实现</h2>
<p><strong>1.满幅背景定宽内容：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*常用办法：*
footer {
background: #333;
}
 .wrapper {
max-width: 900px;
margin: 1em auto;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*常用办法：*
<span class="hljs-selector-tag">footer</span> {
<span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
}
 <span class="hljs-selector-class">.wrapper</span> {
<span class="hljs-attribute">max-width</span>: <span class="hljs-number">900px</span>;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> auto;
} 
</code></pre>
<p><em>如何避免使用两层结构来实现；</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="footer {
    padding: 1em ;//向下兼容不支持calc的浏览器
    //max-width: 900px;
    padding: 1em calc(50% - 450px);
    background: #333;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">footer</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span> ;<span class="hljs-comment">//向下兼容不支持calc的浏览器</span>
    <span class="hljs-comment">//max-width: 900px;</span>
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span> calc(<span class="hljs-number">50%</span> - <span class="hljs-number">450px</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
}
</code></pre>
<p><em>解释：</em></p>
<p>CSS 值与单位(第三版)(<a href="http://w3.org/TR/css-values-3/#calc)" rel="nofollow noreferrer" target="_blank">http://w3.org/TR/css-values-3...</a>定义了 个 calc() 函数，它允许我们在 CSS 中直接以这种简单的算式来指定属性的值。 在这里可以取代内层里margin:auto的效果。</p>
<p><strong>2.水平居中</strong></p>
<ul>
<li><p>如果它是一个行内元素， 就对它的父元素应用text-align: center ；</p></li>
<li><p>如果它是一个块级元素，就对 它自身应用margin:auto。</p></li>
</ul>
<p><strong>3.垂直居中</strong></p>
<p>两种不太理想的方法：表格布局法、行内块法。这里不详细说，想了解可参看：<br><a href="http://css-tricks.com/centering-in-the-unknown" rel="nofollow noreferrer" target="_blank">http://css-tricks.com/centeri...</a> 。</p>
<p>以如下结构为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<main>
<h1>Am I centered yet?</h1>
<p>Center me, please!</p>
</main> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Am I centered yet?<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Center me, please!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span> 
</code></pre>
<p><em>推荐方法：</em></p>
<ul><li>
<p>基于绝对定位的解决方案：</p>
<p>对于固定宽高的元素进行居中处理：<br>main {<br>position: absolute; top: calc(50% - 3em); </p>
<p>left: calc(50% - 9em); width: 18em;<br>height: 6em;<br>}</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*解释*：特点在与解决如何根据内部元素自身的宽高来计算移动比例。

对于绝大多数 CSS 属性(包括 margin)来说， 百分比都是以其父元素的尺寸为基准进行解析的 ；
translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度 为基准进行换算和移动的；
解决方法：
    main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    } 
存在问题：
 需要绝对定位，而且如果需要居中的元素已经在高度上超过了视口，那它的顶部会被视 口裁切掉 
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*解释*：特点在与解决如何根据内部元素自身的宽高来计算移动比例。

对于绝大多数 <span class="hljs-selector-tag">CSS</span> 属性(包括 <span class="hljs-selector-tag">margin</span>)来说， 百分比都是以其父元素的尺寸为基准进行解析的 ；
<span class="hljs-selector-tag">translate</span>() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度 为基准进行换算和移动的；
解决方法：
    <span class="hljs-selector-tag">main</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
    } 
存在问题：
 需要绝对定位，而且如果需要居中的元素已经在高度上超过了视口，那它的顶部会被视 口裁切掉 
 
</code></pre>
<ul><li>
<p>基于适口单位的解决方案：</p>
<p>CSS 值 与 单 位( 第 三 版 )(<a href="http://w3.org/TR/css-values-3/#viewport-" rel="nofollow noreferrer" target="_blank">http://w3.org/TR/css-values-3...</a> relative-lengths)定义了一套新的单位，称为视口相关的长度单位 ：<br>vw 是与视口宽度相关的。与常人的直觉不符的是，1vw 实际上表示 视口宽度的 1%，而不是 100%。 <br>与 vw 类似，1vh 表示视口高度的 1%。<br>当视口宽度小于高度时，1vmin 等于 1vw，否则等于 1vh。 <br>当视口宽度大于高度时，1vmax 等于 1vw，否则等于 1vh。</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" main {
    width: 18em;
    padding: 1em 1.5em;
    margin: 50vh auto 0; transform: translateY(-50%);
    } 
    
存在问题：它只适用于在视口中居中的场景 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">main</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">18em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span> <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50vh</span> auto <span class="hljs-number">0</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
    } 
    
存在问题：它只适用于在视口中居中的场景 

</code></pre>
<ul><li>
<p>基于flexbox的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Flexbox(伸缩盒)(http://w3.org/ TR/css-flexbox)是专门针对这类需求所设计的 。
*解决方法：*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Flexbox</span><span class="hljs-params">(伸缩盒)</span><span class="hljs-params">(http://w3.org/ TR/css-flexbox)</span></span>是专门针对这类需求所设计的 。
*解决方法：*</code></pre>
<p>body {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: flex;
min-height: 100vh;
margin: 0; }
main {
margin: auto;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">display</span>: flex;
<span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>; }
main {
<span class="hljs-attribute">margin</span>: auto;</code></pre>
<p>}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*解释：*
当我们使用 Flexbox 时，margin: auto 不仅在水平方向上将元 素居中，垂直方向上也是如此。 
存在问题：兼容性不如前两种广泛。
未来可能将会普遍试用的方式：盒对齐模型http://w3.org/TR/css-align-3) 
对于简单的居中不需要特殊的布局模式，只需要align-self:center;就够了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>*解释：*
当我们使用 Flexbox 时，<span class="hljs-keyword">margin: </span>auto 不仅在水平方向上将元 素居中，垂直方向上也是如此。 
存在问题：兼容性不如前两种广泛。
未来可能将会普遍试用的方式：盒对齐模型http://w3.org/TR/css-<span class="hljs-meta">align</span>-<span class="hljs-number">3</span>) 
对于简单的居中不需要特殊的布局模式，只需要<span class="hljs-meta">align</span>-<span class="hljs-keyword">self:center;就够了。
</span></code></pre>
</li></ul>
<p>小科普：W3C标准从提起到正式写入规范的流程：<br><a href="https://www.zhihu.com/question/23179689" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS常用布局简洁解决方案

## 原文链接
[https://segmentfault.com/a/1190000010124579](https://segmentfault.com/a/1190000010124579)

