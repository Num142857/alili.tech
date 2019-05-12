---
title: '如何使用CSS创建巧妙的动画提示框' 
date: 2019-01-10 2:30:08
hidden: true
slug: 9e2kuf0wl4t
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://webdesign.tutsplus.com/zh-hans/tutorials/css-tooltip-magic--cms-28082" rel="nofollow noreferrer" target="_blank">https://webdesign.tutsplus.co...</a><br>原作：<a href="https://tutsplus.com/authors/jase-smith?_ga=2.114028039.1683965200.1498629520-1306042811.1484034514" rel="nofollow noreferrer" target="_blank">Jase Smith</a><br>翻译：<a href="https://tutsplus.com/authors/stypstive?_ga=2.114028039.1683965200.1498629520-1306042811.1484034514" rel="nofollow noreferrer" target="_blank">Stypstive</a></p>
<p>当你的用户需要漂亮的图标给出额外的文字信息时，亦或是当他们在点击了按钮之后需要确认自己没点错时，又或是带图片和字幕的复活节彩蛋，提示框是用来增强用户界面的绝佳手段。现在，让我们来做几个动画提示框，没有别的，只有HTML和CSS。</p>
<h3 id="articleHeader0">样例</h3>
<p>这是我们之后要做的：</p>
<p><a href="http://jsfiddle.net/kcschaefer/qLuecz8m/1/embedded/result,css,html/dark/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/kcschaefe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="kcschaefer/qLuecz8m/1/embedded/result,css,html/dark/" data-typeid="0">点击预览</button></p>
<p>在我们沉浸在写代码的过程中之前，让我们先来看看我们的意图是什么。主要目的是为了获得一种简单的添加提示框的方法，这样一来，我们之后就能够通过增加一个自定义的 <code>tooltip</code> 属性来做到这一点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <span tooltip=&quot;message&quot;>visible text or icon, etc.</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="htmlbars hljs"><code class="htmlbars" style="word-break: break-word; white-space: initial;"><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">"message"</span>&gt;</span>visible text or icon, etc.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<h3 id="articleHeader1">关于可访问性和功能的记注</h3>
<p>如果你在寻找兼容508的提示框，或者需要带容器冲突侦测和/或HTML内容 vs 纯文本的智能提示框，有许多实用第三方脚本的解决方案能满足你的要求。</p>
<blockquote><p>"用JavaScript来做完全可访问的交互组件是命令式的" - Sara Soueidan, 打造一个完全可访问的帮助提示框...比你想的要难</p></blockquote>
<p>这篇教程不会特地解决可访问性的需求。你了解你的用户，知道他们需要什么，所以有关这方面，也要记得考虑他们的需求。</p>
<h3 id="articleHeader2">让我们设定几个预期</h3>
<ul>
<li><p>不需要JavaScript</p></li>
<li><p>我们将会使用属性选择器（而不是类名），以及CSS内建的模式匹配</p></li>
<li><p>加到现有的DOM元素（你的标签中不需要新的元素）</p></li>
<li><p>代码例子中是没有前缀的（如有需要，为你的目标浏览器加上供应商前缀）</p></li>
<li><p>假设通过 mouseover/hover 来触发提示框</p></li>
<li><p>仅仅是纯文本提示框（HTML，图片等等都不支持）</p></li>
<li><p>当唤起提示框时，有巧妙的动画</p></li>
</ul>
<h3 id="articleHeader3">好了，老司机要开车了！</h3>
<p>哦，等等。我们还要先处理一个问题，是关于"不需要额外标签"的。毕竟，这很巧妙。 我们的提示框真的不需要额外的DOM元素，因为它们完全是基于伪元素的（<code>::before</code> 和 <code>::after</code>），我们可以通过CSS来控制。</p>
<p>如果你已经在其它样式集中使用了一个元素的伪元素，又希望在这个元素是加一个提示框，那么你可能需要稍稍做一些重构。</p>
<h3 id="articleHeader4">没什么比得上来一场提示框盛会了！</h3>
<p>等等。小坏蛋！还有一个警告：CSS定位。为了提示框正常运作，它们的父元素（我们把提示框添加在它后面）需要是</p>
<ul>
<li><p><code>position: relative</code>，或者</p></li>
<li><p><code>position: absolute</code>，或</p></li>
<li><p><code>position: fixed</code></p></li>
</ul>
<p>基本上，什么都行，只要不是 <code>position: static</code> — 这是浏览器赋给几乎所有元素的默认定位模式。提示框是绝对定位的，所以它们需要知道它们的绝对值在什么边界内是有意义的。 默认的定位指令 static 不会声明它的边界，也不会给我们的提示框以上下文来进行相对定位。所以提示框会使用之后，最近的，有声明边界的父元素。</p>
<p>你还需要根据你如何使用提示框来决定哪个定位指令最为合适。这篇教程假设父元素是 <code>postion: relative</code>  如果你的UI依靠一个绝对定位的元素，那么在那个元素上部署一个提示框，也会需要一些重构（额外的标签）。</p>
<p>让我们开始吧。</p>
<h1 id="articleHeader5">属性选择器：快速回顾</h1>
<p>大多数CSS规则印象中都是用类名写的，比如 <code>.this-thing</code> ,但是CSS有几个类型的选择器。我们巧妙的提示框打算使用属性选择器——也就是方括号表示法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    [foo] {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">    <span class="hljs-selector-attr">[foo]</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<p>当浏览器看到诸如此类的东西时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span foo>Check it out!</span>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="htmlbars hljs"><code class="htmlbars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">foo</span>&gt;</span>Check it out!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</span></code></pre>
<p>浏览器会知道，它需要应用 <code>[foo]</code> 规则了，因为 <code>&lt;span&gt;</code> 标签有一个叫做 foo 的属性。在这个例子中，span自身会有一个半透明的黑色背景，以及白色文字。</p>
<p>HTML元素有着各种各样的内置属性，但是我们也可以给出我们自己的属性。比如 <code>foo</code> ，又或者是 <code>tooltip</code> 。默认情况下，HTML不知道这些东西是什么意思，但是有了CSS，我们可以告诉HTML这些自定义属性是什么意思。</p>
<h3 id="articleHeader6">为什么用属性选择器？</h3>
<p>我们后面会使用属性选择器，主要是出于侧重分离的目的。使用属性而不是类名，并不会让我们在详细程度上获得更多益处，类和属性在详细程度上是相同的。 然而，通过使用属性，我们可以把我们的内容放在一块儿，因为HTML属性可以有值，而类名没有值。</p>
<p>在这个例子的代码中，来权衡一下类名 <code>.tooltip</code> 对比属性 <code>[tooltip]</code> 。类名是 [class] 属性的值中的一个，而tooltip属性可以存放一个值，它就是我们要显示的文字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;tooltip another-classname&quot;>lorem ipsum</span>
 
<span tooltip=&quot;sit dolar amet&quot;>lorem ipsum</span>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="htmlbars hljs"><code class="htmlbars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tooltip another-classname"</span>&gt;</span>lorem ipsum<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">"sit dolar amet"</span>&gt;</span>lorem ipsum<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</span></code></pre>
<h1 id="articleHeader7">现在让我们来看看提示框炼金术</h1>
<p>我们的提示框会使用两种不同的属性：</p>
<ul>
<li><p><code>tooltip</code>: 这个属性存放了提示框的内容（一个纯文本字符串）</p></li>
<li><p><code>flow</code>: 可选；这个属性允许我们控制如何显示提示框。我们可以支持很多方位，但是我们会覆盖4各常用方位：上，左，右，下</p></li>
</ul>
<p>现在，让我们为所有的提示框做好准备工作。步骤1-5的规则会应用到所有的提示框上，无论我们给 flow 属性什么值。步骤6-7对于不同的 <code>flow</code> 值会有所区分。</p>
<h1 id="articleHeader8">1) 相对性</h1>
<p>这是用在提示框的父元素上的。让我们来给定一个定位指令，这样提示框的组成部分（即<code>::before</code> 和 <code>::after</code> 伪元素）的绝对定位就可以以父元素做参照进行定位，而不是以整个页面或祖父元素或DOM树上方的其它外围元素作为参照进行定位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip] {
  position: relative;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span> {
  <span class="hljs-attribute">position</span>: relative;
}
</code></pre>
<h1 id="articleHeader9">2) 伪元素准备时间</h1>
<p>是时候准备伪元素了。在这里，我们要对 <code>::before</code> 和 <code>::after</code> 设置常用属性。content 属性是真正让伪元素工作的属性，不过我们稍后再讨论它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]::before,
[tooltip]::after {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    display: none;
    opacity: 0;
 
    /* opinions */
    text-transform: none; 
    font-size: .9em;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">pointer-events</span>: none;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">display</span>: none;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
 
    <span class="hljs-comment">/* opinions */</span>
    <span class="hljs-attribute">text-transform</span>: none; 
    <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">9em</span>;
}
</code></pre>
<h1 id="articleHeader10">3) 丁克帽</h1>
<p>我不知道丁克帽是不是说得通，我只是一直这么叫它。它是一个尖尖的小三角形，通过指向它的调用者，为提示框提供对话气泡的感觉。 注意到我们在边界颜色这一块，使用了 <code>tranparent</code> ；由于上色要根据提示框的 flow 值来，所以之后再加上颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]::before {
    content: '';
    z-index: 1001;
    border: 5px solid transparent;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1001</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid transparent;
}
</code></pre>
<p><code>content: '';</code>声明中的值是一个空字符串，这并不是笔误。字符串里面，我们不想要任何东西，但是我们需要这个属性，使得伪元素得以存在。</p>
<p>为了生成一个三角形，我们定义了一个实现边框，在空的盒子（没有内容）上加了一些厚度，而不设定盒子的宽度和高度，仅仅对盒子的每一条边都给一个边框颜色。</p>
<h1 id="articleHeader11">4) 气泡！</h1>
<p>这里是重点了。注意到 <code>content: attr(tooltip)</code> 这一部分是说：“这个伪类应该使用 <code>tooltip</code> 属性的值作为这个伪类的内容。”这也是为什么使用属性而不是类名会这么赞的原因。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]::after {
    content: attr(tooltip); /* magic! */
    z-index: 1000;
     
    /* most of the rest of this is opinion */
    font-family: Helvetica, sans-serif;
    text-align: center;
     
    /* 
    Let the content set the size of the tooltips 
    but this will also keep them from being obnoxious
    */
    min-width: 3em;
    max-width: 21em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
     
    /* visible design of the tooltip bubbles */
    padding: 1ch 1.5ch;
    border-radius: .3ch;
    box-shadow: 0 1em 2em -.5em rgba(0, 0, 0, 0.35);
    background: #333;
    color: #fff;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(tooltip); <span class="hljs-comment">/* magic! */</span>
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;
     
    <span class="hljs-comment">/* most of the rest of this is opinion */</span>
    <span class="hljs-attribute">font-family</span>: Helvetica, sans-serif;
    <span class="hljs-attribute">text-align</span>: center;
     
    <span class="hljs-comment">/* 
    Let the content set the size of the tooltips 
    but this will also keep them from being obnoxious
    */</span>
    <span class="hljs-attribute">min-width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">21em</span>;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
     
    <span class="hljs-comment">/* visible design of the tooltip bubbles */</span>
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1ch</span> <span class="hljs-number">1.5ch</span>;
    <span class="hljs-attribute">border-radius</span>: .<span class="hljs-number">3ch</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1em</span> <span class="hljs-number">2em</span> -.<span class="hljs-number">5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.35);
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
</code></pre>
<p>注意看丁克帽和气泡的 <code>z-index</code> 值。这些值可以是任意的。但是要记住，<code>z-index</code> 值是相对的。 解释：一个z-index值为1001的元素，在一个z-index为3的元素内部。仅仅意味着，z-index: 3 容器内部，1001元素是最顶层的元素。</p>
<p>气泡的<code>z-index</code>应该至少比丁克帽的<code>z-index</code>低一档。如果它和丁克的一样高，或更高的话，如果你提示框使用了 <code>box-shadow</code> 的话，结果在丁克帽上回得到不一致的颜色效果。</p>
<h1 id="articleHeader12">5）交互动作</h1>
<p>我们的提示框是通过把鼠标移动到带提示框的元素上面，来激活的。差不多是这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]:hover::before,
[tooltip]:hover::after {
    display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>如果你回顾在第2不中的样式部分，你会看到我们对提示框的组成部分，使用了 <code>opacity: 0;</code> 以及 <code>display: none;</code> 。我们这么做是为了当提示框显示和隐藏时，可以使用CSS动画效果。 </p>
<p><code>display</code>属性是不能做成动画的，但是<code>opacity</code>属性可以！我们留到最后来处理动画的问题。如果你对动画提示框没兴趣，只要把第2步中的 <code>opacity: 0;</code> 删掉，无视第7步即可。</p>
<p>最后一件要应用到所有提示框上的是，如果提示框没有内容，能有一个方法来抑制提示框。如果你使用某种动态系统（Vue.js, Angular, 或者 React, PHP等等）来生成提示框的话，我们就不需要笨笨的空白气泡了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* don't show empty tooltips */
[tooltip='']::before,
[tooltip='']::after {
    display: none !important;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* don't show empty tooltips */</span>
<span class="hljs-selector-attr">[tooltip='']</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip='']</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">display</span>: none <span class="hljs-meta">!important</span>;
}</code></pre>
<h1 id="articleHeader13">6) 流控制</h1>
<p>这一步会变得更加复杂，因为我们会使用一些不那么常见的选择器，来帮助我们的提示框基于 <code>flow</code> 值（或没有flow属性）来确定位置。</p>
<blockquote><p>“奇怪的东西出现在了 Circle-K 的门口” — Ted Theodore Logan</p></blockquote>
<p>在我们写样式之前，让我们看看将要用到一些选择器模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]:not([flow])::before,
[tooltip][flow^=&quot;up&quot;]::before {
    /* ...
    properties: values
    ... */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-comment">/* ...
    properties: values
    ... */</span>
}</code></pre>
<p>这是在告诉浏览器：“对于所有带有 <code>tooltip</code> 属性来说，其中没有 <code>flow</code> 属性的元素，或者有<code>flow</code>元素，但它的值是以'up'开头的：将这些样式套用到这类元素的<code>::before</code>伪元素上。”</p>
<p>我们在这里使用了一个模式，这样一来，这些东西可以扩展到其它流上，而步需要重复这么多的CSS。这个模式 <code>flow^="up"</code> 使用了 <code>^=</code> （开头）匹配符。 如果你想增加其它流控制的话，通过这个模式，也可以将样式应用在 up-right 和 up-left 方向上（代码中）。我们在这里不会讨论这些流控制，不过你可以<a href="https://codepen.io/jasesmith/pen/RoVmNZ" rel="nofollow noreferrer" target="_blank">在CodePen上，我原来的提示框演示中</a><button class="btn btn-xs btn-default ml10 preview" data-url="jasesmith/pen/RoVmNZ" data-typeid="3">点击预览</button>看到如何使用它们。</p>
<p>以下是教程中所讲到的4个流所对应的CSS代码块。</p>
<h3 id="articleHeader14">上</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ONLY the ::before */
[tooltip]:not([flow])::before,
[tooltip][flow^=&quot;up&quot;]::before {
    bottom: 100%;
    border-bottom-width: 0;
    border-top-color: #333;
}
 
/* ONLY the ::after */
[tooltip]:not([flow])::after,
[tooltip][flow^=&quot;up&quot;]::after {
    bottom: calc(100% + 5px);
}
 
/* Both ::before &amp; ::after */
[tooltip]:not([flow])::before,
[tooltip]:not([flow])::after,
[tooltip][flow^=&quot;up&quot;]::before,
[tooltip][flow^=&quot;up&quot;]::after {
    left: 50%;
    transform: translate(-50%, -.5em);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* ONLY the ::before */</span>
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-bottom-width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top-color</span>: <span class="hljs-number">#333</span>;
}
 
<span class="hljs-comment">/* ONLY the ::after */</span>
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(100% + 5px);
}
 
<span class="hljs-comment">/* Both ::before &amp; ::after */</span>
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -.5em);
}</code></pre>
<h3 id="articleHeader15">下</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip][flow^=&quot;down&quot;]::before {
    top: 100%;
    border-top-width: 0;
    border-bottom-color: #333;
}
 
[tooltip][flow^=&quot;down&quot;]::after {
    top: calc(100% + 5px);
}
 
[tooltip][flow^=&quot;down&quot;]::before,
[tooltip][flow^=&quot;down&quot;]::after {
    left: 50%;
    transform: translate(-50%, .5em);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-top-width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom-color</span>: <span class="hljs-number">#333</span>;
}
 
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(100% + 5px);
}
 
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, .5em);
}</code></pre>
<h3 id="articleHeader16">左</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip][flow^=&quot;left&quot;]::before {
    top: 50%;
    border-right-width: 0;
    border-left-color: #333;
    left: calc(0em - 5px);
    transform: translate(-.5em, -50%);
}
 
[tooltip][flow^=&quot;left&quot;]::after {
    top: 50%;
    right: calc(100% + 5px);
    transform: translate(-.5em, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="left"]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-right-width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-left-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(0em - 5px);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-.5em, -50%);
}
 
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="left"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-built_in">calc</span>(100% + 5px);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-.5em, -50%);
}</code></pre>
<h3 id="articleHeader17">右</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip][flow^=&quot;right&quot;]::before {
    top: 50%;
    border-left-width: 0;
    border-right-color: #333;
    right: calc(0em - 5px);
    transform: translate(.5em, -50%);
}
 
[tooltip][flow^=&quot;right&quot;]::after {
    top: 50%;
    left: calc(100% + 5px);
    transform: translate(.5em, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="right"]</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-built_in">calc</span>(0em - 5px);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(.5em, -50%);
}
 
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="right"]</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(100% + 5px);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(.5em, -50%);
}</code></pre>
<h1 id="articleHeader18">7) 让一切都动起来</h1>
<p>动画是很神奇的。动画可以做到：</p>
<ul>
<li><p>让用户感觉舒服</p></li>
<li><p>让用户感受到你的用户界面的空间感</p></li>
<li><p>注意到该看到的东西</p></li>
<li><p>让用户界面中本来非黑即白的生硬效果变得柔和</p></li>
</ul>
<p>我们的提示框属于最后那一种。如果仅仅是让一个文字泡泡出现然后突然消失，效果是不令人满意的，我们可以让它更柔和一些。</p>
<h3 id="articleHeader19">关键帧 (@keyframes)</h3>
<p>我们需要两个关键帧 (<code>@keyframe</code>) 动画。向上/向下提示框要用到<code>tooltips-vert</code>关键帧，而向左/向右提示框使用<code>tooltips-horz</code>关键帧。 注意，在这些关键帧中，我们只定义了提示框所需的终止状态。我们并不需要知道它们从何处来 (提示框本身就有状态信息)。我们只想控制它们要到哪儿去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes tooltips-vert {
  to {
    opacity: .9;
    transform: translate(-50%, 0);
  }
}
 
@keyframes tooltips-horz {
  to {
    opacity: .9;
    transform: translate(0, -50%);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> tooltips-vert {
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">9</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0);
  }
}
 
@<span class="hljs-keyword">keyframes</span> tooltips-horz {
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">9</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
  }
}</code></pre>
<p>现在，当一个用户的鼠标移到触发元素 (具有<code>[tooltip]</code>属性的元素) 上时，我们需要将这些关键帧应用到提示框上。因为我们采用了不同的流来控制提示框的显示方式，我们需要在样式中对它们进行定义。</p>
<h3 id="articleHeader20">使用:hover将控制传递给动画</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[tooltip]:not([flow]):hover::before,
[tooltip]:not([flow]):hover::after,
[tooltip][flow^=&quot;up&quot;]:hover::before,
[tooltip][flow^=&quot;up&quot;]:hover::after,
[tooltip][flow^=&quot;down&quot;]:hover::before,
[tooltip][flow^=&quot;down&quot;]:hover::after {
    animation: 
        tooltips-vert 
        300ms 
        ease-out
        forwards;
}
 
[tooltip][flow^=&quot;left&quot;]:hover::before,
[tooltip][flow^=&quot;left&quot;]:hover::after,
[tooltip][flow^=&quot;right&quot;]:hover::before,
[tooltip][flow^=&quot;right&quot;]:hover::after {
    animation: 
        tooltips-horz 
        300ms 
        ease-out 
        forwards;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[flow]</span>)<span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="up"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="down"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: 
        tooltips-vert 
        <span class="hljs-number">300ms</span> 
        ease-out
        forwards;
}
 
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="left"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="left"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="right"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-attr">[tooltip]</span><span class="hljs-selector-attr">[flow^="right"]</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: 
        tooltips-horz 
        <span class="hljs-number">300ms</span> 
        ease-out 
        forwards;
}</code></pre>
<p>我们不能对display属性进行动画，但是可以通过操作opacity属性，在提示框上加上淡入效果。我们也可以动画transform属性，它可以给提示框加上微妙的动作，触发的元素就像飞入某点的一样。</p>
<p>主要forward关键词在动画的声明中，这告诉动画当完成时不重置，而是继续停留在结束。</p>
<h1 id="articleHeader21">结论</h1>
<p>棒极了！我们在这个教程里已经覆盖了很多，一堆提示框效果。</p>
<p><a href="http://jsfiddle.net/kcschaefer/qLuecz8m/1/embedded/result,css,html/dark/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/kcschaefe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="kcschaefer/qLuecz8m/1/embedded/result,css,html/dark/" data-typeid="0">点击预览</button></p>
<p>我们仅仅摸索了用css做提示框的表面。好好享受它们，继续试验，调制出你自己的方子！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用CSS创建巧妙的动画提示框

## 原文链接
[https://segmentfault.com/a/1190000009964781](https://segmentfault.com/a/1190000009964781)

