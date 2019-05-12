---
title: 'CSS魔法堂：hasLayout原来是这样的！' 
date: 2019-02-12 2:30:12
hidden: true
slug: 0gyhgfm62ego
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>过去一直听说旧版本IE下很多诡异bug均由一个神秘角色引起的，那就是hasLayout。趁着最近突然发神经打算好好学习CSS，顺便解答多年来的疑惑。</p>
<h2 id="articleHeader1">hasLayout到底是何方神圣？</h2>
<p>hasLayout可以简单看作是IE5.5/6/7中的BFC(Block Formatting Context)。也就是<strong>一个元素要么自己对自身内容进行组织和尺寸计算(即可通过width/height来设置自身的宽高)，要么由其containing block来组织和尺寸计算。</strong>而IFC（即没有拥有布局）而言，则是<strong>元素无法对自身内容进行组织和尺寸计算，而是由自身内容来决定其尺寸（即仅能通过line-height设置内容行距，通过行距来支撑元素的高度；也无法通过width设置元素宽度，仅能由内容来决定而已）</strong><br>  当hasLayout为true时(就是所谓的"拥有布局")，相当于元素产生新BFC，元素自己对自身内容进行组织和尺寸计算;<br>  当hasLayout为false时(就是所谓的"不拥有布局")，相当于元素不产生新BFC，元素由其所属的containing block进行组织和尺寸计算。<br>  和产生新BFC的特性一样，hasLayout无法通过CSS属性直接设置，而是通过某些CSS属性间接开启这一特性。不同的是某些CSS属性是以不可逆方式间接开启hasLayout为true。并且默认产生新BFC的只有<code>html</code>元素，而默认hasLayout为true的元素就不只有<code>html</code>元素了。<br>  另外我们可以通过<code>object.currentStyle.hasLayout</code>属性来判断元素是否开启了hasLayout特性。</p>
<p>到这里我们应该了解到若要理解hasLayout则必须理解BFC，因此这里可参考<a href="http://www.cnblogs.com/fsjohnhuang/p/5259121.html" rel="nofollow noreferrer" target="_blank">CSS魔法堂：重新认识Box Model、IFC、BFC和Collapsing margins</a></p>
<h3 id="articleHeader2">默认<code>hasLayout==true</code>的元素</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>, <body>
<table>, <tr>, <th>, <td>
<img>,<hr>
<input>, <button>, <select>, <textarea>, <fieldset>, <legend>
<iframe>, <embed>, <object>, <applet>,<marquee>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span>&gt;</span>,<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">embed</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">object</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">applet</span>&gt;</span>,<span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span></code></pre>
<h3 id="articleHeader3">触发<code>hasLayout==true</code>的方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: inline-block
height: (除 auto 外任何值)
width: (除 auto 外任何值)
float: (left 或 right)
position: absolute
writing-mode: tb-rl
zoom: (除 normal 外任意值)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block
<span class="hljs-built_in">height</span>: (除 <span class="hljs-keyword">auto</span> 外任何值)
<span class="hljs-built_in">width</span>: (除 <span class="hljs-keyword">auto</span> 外任何值)
<span class="hljs-keyword">float</span>: (left 或 right)
<span class="hljs-built_in">position</span>: absolute
writing-mode: tb-rl
zoom: (除 normal 外任意值)</code></pre>
<p>IE7 还有一些额外的属性(不完全列表)可以触发 hasLayout ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="min-height: (任意值)
min-width: (任意值)
max-height: (除 none 外任意值)
max-width: (除 none 外任意值)
overflow: (除 visible 外任意值，仅用于块级元素)
overflow-x: (除 visible 外任意值，仅用于块级元素)
overflow-y: (除 visible 外任意值，仅用于块级元素)
position: fixed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">min</span>-<span class="hljs-built_in">height</span>: (任意值)
<span class="hljs-built_in">min</span>-<span class="hljs-built_in">width</span>: (任意值)
<span class="hljs-built_in">max</span>-<span class="hljs-built_in">height</span>: (除 none 外任意值)
<span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span>: (除 none 外任意值)
<span class="hljs-built_in">overflow</span>: (除 visible 外任意值，仅用于块级元素)
<span class="hljs-built_in">overflow</span>-x: (除 visible 外任意值，仅用于块级元素)
<span class="hljs-built_in">overflow</span>-y: (除 visible 外任意值，仅用于块级元素)
<span class="hljs-built_in">position</span>: fixed</code></pre>
<p>IE6 以前的版本（也包括 IE6 及以后所有版本的混杂模式，其实这种混杂模式在渲染方面就相当于 IE 5.5）， 通过设置任何元素的 'width' 或 'height'（非auto）都可以触发 hasLayout ； 但在 IE6 和 IE7 的标准模式中的行内元素上却不行，设置 'display:inline-block' 才可以。<br>其中通过<code>display:inline-block</code>或<code>min-width:0</code>或<code>min-height:0</code>将不可逆地启用hasLayout特性。而在没有其他属性启用hasLayout时，可通过以下方式关闭hasLayout</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="max-width, max-height (设为 &quot;none&quot;)(在IE7中)
position (设为 &quot;static&quot;)
float (设为 &quot;none&quot;)
overflow (设为 &quot;visible&quot;) (在IE7中)
zoom (设为 &quot;normal&quot;)
writing-mode (从 &quot;tb-rl&quot; 设为 &quot;lr-t&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">max-width</span>, <span class="hljs-selector-tag">max-height</span> (设为 <span class="hljs-string">"none"</span>)(在IE7中)
<span class="hljs-selector-tag">position</span> (设为 <span class="hljs-string">"static"</span>)
<span class="hljs-selector-tag">float</span> (设为 <span class="hljs-string">"none"</span>)
<span class="hljs-selector-tag">overflow</span> (设为 <span class="hljs-string">"visible"</span>) (在IE7中)
<span class="hljs-selector-tag">zoom</span> (设为 <span class="hljs-string">"normal"</span>)
<span class="hljs-selector-tag">writing-mode</span> (从 <span class="hljs-string">"tb-rl"</span> 设为 <span class="hljs-string">"lr-t"</span>)</code></pre>
<p>而产生新BFC的CSS属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position:absolute/fixed
float:left/right
display:inline-block/table-cell/table-caption/flex/inline-flex
overflow:(除visible外任意值)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">position</span>:absolute/fixed
<span class="hljs-keyword">float</span>:left/right
<span class="hljs-built_in">display</span>:<span class="hljs-keyword">inline</span>-block/table-cell/table-caption/flex/<span class="hljs-keyword">inline</span>-flex
<span class="hljs-built_in">overflow</span>:(除visible外任意值)</code></pre>
<p>可以看到导致产生新BFC的方式和触发<code>hasLayout==true</code>的方式不完全重叠。因此hasLayout==true所引发的问题，很大程度可以理解为在不应该的或没有预料到的地方产生新的BFC导致的。</p>
<h2 id="articleHeader4"><a href="http://www.w3help.org/zh-cn/causes/RM8002" rel="nofollow noreferrer" target="_blank">如何兼容？</a></h2>
<p>仅当一个元素即在 IE 早期版本中触发了 hasLayout，又在其他浏览器中创建了 block formatting context 时，才能避免上述问题的发生。即同时启用上述两者以保证各浏览器的兼容，或者相反，两者皆不启用。</p>
<ol>
<li><p>使元素即生成了 block formatting context，又触发了 hasLayout<br>对于触发 hasLayout 的元素，通过 CSS 设置，使它产生 block formatting context；</p></li>
<li><p>生成 block formatting context 但是没有触发 hasLayout 的元素，通过设置 'zoom:1'，使其触发 hasLayout。</p></li>
<li><p>使元素即没有触发 hasLayout，又没有创建 block formatting context。</p></li>
</ol>
<h2 id="articleHeader5">总结</h2>
<p>虽然我现在已经不用再适配IE5.5/6/7了，但理解hasLayout还是很有必要的。其实可以理解为从另一个角度学习BFC吧！<br>  尊重原创，转载请注明来自：肥仔john^_^</p>
<h2 id="articleHeader6">感谢</h2>
<p><a href="https://segmentfault.com/a/1190000004621361">谈谈BFC与ie特有属性hasLayout</a><br><a href="http://www.w3help.org/zh-cn/causes/RM8002" rel="nofollow noreferrer" target="_blank">RM8002: 不能同时在 IE6 IE7 IE8(Q) 中触发 hasLayout 并在其他浏览器中创建 Block Formatting Context 的元素在各浏览器中的表现会有差异</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：hasLayout原来是这样的！

## 原文链接
[https://segmentfault.com/a/1190000004632071](https://segmentfault.com/a/1190000004632071)

