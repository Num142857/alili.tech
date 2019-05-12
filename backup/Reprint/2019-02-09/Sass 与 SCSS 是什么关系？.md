---
title: 'Sass 与 SCSS 是什么关系？' 
date: 2019-02-09 2:30:59
hidden: true
slug: k8a4x58upm
categories: [reprint]
---

{{< raw >}}

                    
<p>我最近写了很多 Sass 代码，但是最近发现并不是每一个人都知道 Sass 具体是什么。下面是一个简短的说明：</p>
<p>当我们说起 Sass ，我们经常指的是两种事物：一种 css 预处理器和一种语言。我们经常这样说，“我们正在使用 Sass”，或者 “这是一个 Sass mixin”。同时，Sass （预处理器）有两种不同的语法：</p>
<ul>
<li><p><strong>Sass</strong>,一种缩进语法</p></li>
<li><p><strong>SCSS</strong>,一种 CSS-like 语法</p></li>
</ul>
<h2 id="articleHeader0">历史</h2>
<p>最开始，Sass 是<a>Haml</a>的一部分，Haml 是一种预处理器，由 Ruby 开发者设计和开发。因为这样，Sass 使用类似 Ruby的语法，没有花括号，没有分号，具有严格的缩进，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Variable
!primary-color= hotpink

// Mixin
=border-radius(!radius)
    -webkit-border-radius= !radius
    -moz-border-radius= !radius
    border-radius= !radius

.my-element
    color= !primary-color
    width= 100%
    overflow= hidden

.my-other-element
    +border-radius(5px)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// Variable
!primary-<span class="hljs-built_in">color</span>= hotpink

// Mixin
=<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>(!<span class="hljs-built_in">radius</span>)
    -webkit-<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>= !<span class="hljs-built_in">radius</span>
    -moz-<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>= !<span class="hljs-built_in">radius</span>
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>= !<span class="hljs-built_in">radius</span>

.my-element
    <span class="hljs-built_in">color</span>= !primary-<span class="hljs-built_in">color</span>
    <span class="hljs-built_in">width</span>= <span class="hljs-number">100</span><span class="hljs-symbol">%</span>
    overflow= hidden

.my-other-element
    +<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>(5px)</code></pre>
<p>你可以就看到，这和CSS代码有很大的区别！即使你是一个 Sass（预处理器） 用户，你也会发现这和你正在使用的有很大的差别。变量的标志用 <code>!</code>，而不是<code>$</code>,分配符是<code>=</code>而不是<code>:</code>。非常怪异。</p>
<p>但是在2010年五月之前，Sass 就是这个样子的。2010年5月，官方推出了一个全新的语法，被叫做 SCSS，意思是 Sassy CSS。这个语法带来了对 CSS 友好的语法，试图弥合 Sass 和 CSS 之间的鸿沟。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Variable
$primary-color: hotpink;

// Mixin
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}

.my-element {
    color: $primary-color;
    width: 100%;
    overflow: hidden;
}

.my-other-element {
    @include border-radius(5px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// Variable</span>
<span class="hljs-variable">$primary-color</span>: hotpink;

<span class="hljs-comment">// Mixin</span>
@<span class="hljs-keyword">mixin</span> border-radius(<span class="hljs-variable">$radius</span>) {
    -webkit-<span class="hljs-attribute">border-radius</span>: <span class="hljs-variable">$radius</span>;
    -moz-<span class="hljs-attribute">border-radius</span>: <span class="hljs-variable">$radius</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-variable">$radius</span>;
}

<span class="hljs-selector-class">.my-element</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-variable">$primary-color</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.my-other-element</span> {
    @<span class="hljs-keyword">include</span> border-radius(<span class="hljs-number">5px</span>);
}</code></pre>
<p>SCSS 和 Sass 相比更加贴近 CSS 语法。也就是说，Sass 维护者做了大量的工作，把缩进语法中的<code>!</code>和<code>=</code>换成了 SCSS 中的 <code>$</code> 和 <code>:</code>。</p>
<p>现在，在开始一个新项目时，你也许疑惑要用哪种语法。让我们来看看两种语法的优劣。</p>
<h2 id="articleHeader1">Sass缩进语法的优劣</h2>
<p>虽然语法看起来怪异，但是缩进语法有很多有趣的点。首先，它 <strong>更短并且更易于书写</strong>。没有花括号，没有分号，你完全不需要这些东西。更好的是，你甚至不需要<code>@mixin</code> 或者 <code>@include</code>, 一个字符就足够了：<code>=</code> 和 <code>+</code>。</p>
<p>同时 Sass 通过严格的缩进来强制 <strong>clean coding standards</strong>。因为一个错误的缩进就会破坏整个<code>.sass</code>文件，这使得整个代码总是clean 和格式良好的。只有一种写 Sass 代码的方式：正确的方式。</p>
<p>但是请注意！缩进在 Sass 中是有意义的。当你缩进了一个元素，这意味这你将它变为了之前元素的子元素。比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".element-a
    color: hotpink

    .element-b
        float: left" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.element-a</span>
    <span class="hljs-attribute">color</span>: hotpink

    <span class="hljs-selector-class">.element-b</span>
        <span class="hljs-attribute">float</span>: left</code></pre>
<p>以上会输出下面的 CSS 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".element-a {
    color: hotpink;
}

.element-a .element-b {
    float: left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.element-a</span> {
    <span class="hljs-attribute">color</span>: hotpink;
}

<span class="hljs-selector-class">.element-a</span> <span class="hljs-selector-class">.element-b</span> {
    <span class="hljs-attribute">float</span>: left;
}</code></pre>
<p>将 <code>.element-b</code> 向右一格以为着它变成了 <code>.element-a</code> 的子元素，改变了输出 CSS 代码的结果。所以一定要小心你的代码缩进。</p>
<p>另外，我觉得基于缩进的语法适合于 Ruby/Python 团队，而不适合 PHP/Java 团队。（这是值得商榷的，我也希望听到不同的声音）</p>
<h2 id="articleHeader2">SCSS语法的优劣</h2>
<p>对于初学者，SCSS 是完全和 CSS 兼容的，这意味着几乎为零的学习曲线。SCSS语法即是：它只是加了一些功能的 CSS。当你和没经验的开发者一起工作时这很重要：他们可以很快开始编码而不需要首先去学习Sass。</p>
<p>此外，SCSS 还是 <strong>易于阅读</strong> 的，因为它是有语义的，而不是用符号表示。当你读到 <code>@mixin</code>，你就会知道这是一个 mixin 声明；当你看到 <code>@include</code> ，你就是在引用一个 mixin。他并没有用任何缩写，当你大声读出来时所有的都很明了。</p>
<p>还有，现在几乎所有 Sass 的工具，插件和 demo 都是基于 SCSS语法来开发的。随着时间过去，SCSS 会变成大家首选的选择。比如，你现在很难找到一个 Sass 缩进语法的高亮插件，通常都只有 SCSS 的可以用。</p>
<h2 id="articleHeader3">总结</h2>
<p>如何选择取决于你，但是除非你有很好的理由一定要使用缩进的语法，我强烈推荐使用 SCSS 。不仅仅它很简单，同时他也很方便。</p>
<p>最后请注意 Sass 从来没有大写过，无论你指的是语法或者这个语言。同时， SCSS 一直是大写的。甚至有一个<a>网站</a>专门来提醒你这件事!</p>
<blockquote><p>翻译自<a>What’s the Difference Between Sass and SCSS?</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Sass 与 SCSS 是什么关系？

## 原文链接
[https://segmentfault.com/a/1190000005646206](https://segmentfault.com/a/1190000005646206)

