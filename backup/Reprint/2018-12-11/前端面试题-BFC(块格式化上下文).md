---
title: '前端面试题-BFC(块格式化上下文)' 
date: 2018-12-11 2:30:10
hidden: true
slug: wgztj5n8qyd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、BFC 的概念</h2>
<h3 id="articleHeader1">1.规范解释</h3>
<blockquote>块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。</blockquote>
<h3 id="articleHeader2">2.通俗理解</h3>
<ul>
<li>BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且<strong>不会影响其它环境中的物品</strong>。</li>
<li><strong>如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。</strong></li>
<li>浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以<strong>两个浮动元素之间是互不影响的</strong>。</li>
</ul>
<h2 id="articleHeader3">二、创建 BFC</h2>
<ol>
<li>根元素或包含根元素的元素</li>
<li>浮动元素 float ＝ left | right 或 inherit<strong>（≠ none）</strong>
</li>
<li>绝对定位元素 position ＝ absolute 或 fixed</li>
<li>display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption</li>
<li>overflow ＝ hidden | auto 或 scroll<strong> (≠ visible)</strong>
</li>
</ol>
<h2 id="articleHeader4">三、BFC 的特性</h2>
<ol>
<li>BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。</li>
<li>盒子从顶端开始垂直地一个接一个地排列，盒子之间垂直的间距是由 margin 决定的。</li>
<li>在同一个 BFC 中，两个相邻的块级盒子的<strong>垂直外边距</strong>会发生重叠。</li>
<li><strong>BFC 区域不会和 float box 发生重叠。</strong></li>
<li><strong>BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了。</strong></li>
</ol>
<h2 id="articleHeader5">四、BFC 的作用</h2>
<h3 id="articleHeader6">1.包含浮动元素（清除浮动）</h3>
<ul>
<li>浮动元素会脱离文档流(绝对定位元素也会脱离文档流)，导致无法计算准确的高度，这种问题称为<strong>高度塌陷</strong>。</li>
<li>解决高度塌陷问题的前提是能够识别并包含浮动元素，也就是<strong>清除浮动</strong>。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVm2qT" src="https://static.alili.tech/img/bVm2qT" alt="清除浮动" title="清除浮动" style="cursor: pointer; display: inline;"></span></p>
<p>问题举例：如上左图所示，容器（container）没有高度或者 height = auto ,并且其子元素（sibling）是浮动元素，所以该容器的高度是不会被撑开的，即高度塌陷。</p>
<p>解决方法：<strong>在容器（container）中创建 BFC。</strong></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
        <div class=&quot;Sibling&quot;></div>
        <div class=&quot;Sibling&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"container"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"Sibling"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"Sibling"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container { 
        overflow: hidden; /* creates block formatting context */ 
        background-color: green; 
} 
.container .Sibling { 
        float: left; 
        margin: 10px;
        background-color: lightgreen;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> { 
        <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* creates block formatting context */</span> 
        <span class="hljs-attribute">background-color</span>: green; 
} 
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.Sibling</span> { 
        <span class="hljs-attribute">float</span>: left; 
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">background-color</span>: lightgreen;  
}</code></pre>
<p>特别提示：</p>
<ul>
<li>通过 overflow:hidden 创建 BFC，固然可以解决高度塌陷的问题，但是大范围应用在布局上肯定<strong>不是最合适的</strong>，毕竟 overflow:hidden 会造成溢出隐藏的问题，尤其是与 JS 的交互效果会有影响。</li>
<li>我们可以使用 <strong>clearfix</strong> 实现清除浮动，这里就不多介绍了，想要了解的可以阅读<a href="https://segmentfault.com/a/1190000013664630">前端面试题-clearfix（清除浮动）</a>。</li>
</ul>
<h3 id="articleHeader7">2.导致外边距折叠</h3>
<p><strong>相邻</strong>的两个盒子（可能是兄弟关系也可能是祖先关系）的垂直边距相遇时， 它们将形成一个外边距。这个外边距的高度等于两个发生折叠的外边距的高度中的<strong>较大者</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV5GnA?w=700&amp;h=250" src="https://static.alili.tech/img/bV5GnA?w=700&amp;h=250" alt="导致外边距折叠" title="导致外边距折叠" style="cursor: pointer; display: inline;"></span></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;Container&quot;> 
    <p>Sibling 1</p> 
    <p>Sibling 2</p> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Container"</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".Container { 
    background-color: red; 
    overflow: hidden; /* creates a block formatting context */ 
} 
p { 
    background-color: lightgreen; 
    margin: 10px 0; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.Container</span> { 
    <span class="hljs-attribute">background-color</span>: red; 
    <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* creates a block formatting context */</span> 
} 
<span class="hljs-selector-tag">p</span> { 
    <span class="hljs-attribute">background-color</span>: lightgreen; 
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>; 
}</code></pre>
<p>如上图所示：红色盒子（Container）中包含两个绿色的兄弟元素（P），并且红色盒子设置 overflow: hidden; 则一个BFC 已经被创建,即导致外边距折叠。</p>
<p>理论上两个兄弟元素之间的边距应该是两个元素的边距之和（20px），但实际是 10px。这就是外边距折叠导致的。</p>
<p>2.1 折叠外边距的值</p>
<ul>
<li>两个相邻的外边距都是 <strong>正数</strong> 时，折叠外边距是两者中较大的值。</li>
<li>两个相邻的外边距都是 <strong>负数</strong> 时，折叠外边距是两者中绝对值较大的值。</li>
<li>两个相邻的外边距是 <strong>一正一负</strong> 时，折叠外边距是两者相加的和。</li>
</ul>
<p>2.2 <strong>外边距折叠的条件是 margin 必须相邻!</strong></p>
<h3 id="articleHeader8">3.避免外边距折叠</h3>
<p>这一听起来可能有些困惑，因为我们在前面讨论了 BFC 导致外边距折叠的问题。但我们必须记住的是<strong>外边距折叠（Margin collapsing）只会发生在属于同一BFC的块级元素之间</strong>。如果它们属于不同的 BFC，它们之间的外边距则不会折叠。所以通过<strong>创建一个不同的 BFC</strong> ，就可以避免外边距折叠。</p>
<p>修改前面的例子并添加第三个兄弟元素，CSS不变。</p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;Container&quot;> 
        <p>Sibling 1</p> 
        <p>Sibling 2</p> 
        <p>Sibling 3</p> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Container"</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>结果不会改变，还会折叠外边距，三个兄弟元素（P）将会以垂直距离为 10px 的距离分开。原因是三个兄弟元素都属于同一个 BFC。</p>
<p>创建一个不同的 BFC ，就可以避免外边距折叠。</p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;Container&quot;> 
        <p>Sibling 1</p> 
        <p>Sibling 2</p> 
        <div class=&quot;newBFC&quot;> 
            <p>Sibling 3</p> 
        </div> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Container"</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"newBFC"</span>&gt;</span> 
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Sibling 3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".Container { 
            background-color: red; 
            overflow: hidden; /* creates a block formatting context */ 
} 
p { 
            background-color: lightgreen; 
            margin: 10px 0; 
}
.newBFC { 
            overflow: hidden; /* creates new block formatting context */ 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.Container</span> { 
            <span class="hljs-attribute">background-color</span>: red; 
            <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* creates a block formatting context */</span> 
} 
<span class="hljs-selector-tag">p</span> { 
            <span class="hljs-attribute">background-color</span>: lightgreen; 
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>; 
}
<span class="hljs-selector-class">.newBFC</span> { 
            <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* creates new block formatting context */</span> 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV5GGS?w=568&amp;h=583" src="https://static.alili.tech/img/bV5GGS?w=568&amp;h=583" alt="避免外边距折叠" title="避免外边距折叠" style="cursor: pointer; display: inline;"></span></p>
<p>当第二和第三个兄弟元素属于不同的 BFC 时，它们之间就没有外边距折叠。</p>
<p><a href="https://segmentfault.com/u/webing123" target="_blank">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-BFC(块格式化上下文)

## 原文链接
[https://segmentfault.com/a/1190000013647777](https://segmentfault.com/a/1190000013647777)

