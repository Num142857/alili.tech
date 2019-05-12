---
title: 'CSS：BFC 最熟悉的陌生人' 
date: 2018-12-31 2:30:30
hidden: true
slug: 2l5z5iq2j1z
categories: [reprint]
---

{{< raw >}}

                    
<p>BFC，你也许听过这个词，但是你可能不是很有底气地解释清楚。<br>写样式的时候，往往加了一个样式或者改了一个属性，就能达到你期望的效果，一切都是如此地神奇。<br>BFC就是神奇之一，它也是最熟悉的陌生人，因为你一不小心就会触发它然而你并没有意识到它正在神奇地发挥作用。</p>
<h2 id="articleHeader0">一、初探BFC</h2>
<p>我们先看看CSS布局的基本单位：</p>
<ul>
<li>
<strong>block-level box</strong>: display 属性为 block, list-item, table 的元素，会生成 block-level box，并且参与 <strong>block formatting context</strong>
</li>
<li>
<strong>inline-level box</strong>: display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box，并且参与 <strong>inline formatting context</strong>
</li>
</ul>
<p>那这个formatting context又是什么玩意儿？</p>
<p>它是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。也就是说我们平时在布局的时候，它默默地提供了一个环境，使得HTML元素在这个环境中按照一定规则进行布局。</p>
<p>最常见的formatting context有Block Formatting Context(BFC)和Inline Formatting Context(IFC)，CSS3中还增加了GridLayout Formatting Context(GFC)和Flex Formatting Context(FFC)，这里就不深入研究了。</p>
<p><strong>BFC定义</strong>：它是一个独立的渲染区域，只有block-level box参与，其中的元素按照规定的渲染规则进行布局，并且这个区域与外部毫不相干。</p>
<h2 id="articleHeader1">二、BFC的布局规则与触发规则</h2>
<p>刚才我们说到BFC中的元素有一套规定的<strong>布局规则</strong>：</p>
<ul>
<li>内部的元素会在垂直方向一个接一个地放置</li>
<li>元素垂直方向的距离由margin决定，属于同一个BFC的两个相邻元素的margin会发生重叠</li>
<li>每个元素的左外边距与包含块的左边界相接触(对于从左往右，否则相反)，即使存在浮动也是如此</li>
<li>BFC的区域不会与float元素重叠</li>
<li>计算BFC的高度时，浮动元素也参与计算</li>
<li>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此</li>
</ul>
<p>刚才我们又提到BFC是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，这些由生成BFC的元素来决定，CSS2.1中规定满足下列CSS声明的元素便会生成BFC（<strong>触发规则</strong>）：</p>
<ul>
<li>根元素</li>
<li>float的值不为none</li>
<li>overflow的值不为visible</li>
<li>position的值为absolute或fixed</li>
<li>display的值为inline-block, table-cell, table-caption, flex, inline-flex<br>注：display: table也认为可以生成BFC，主要原因是table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC</li>
</ul>
<p>上面这些CSS声明的元素生成了BFC，而它们本身并不是BFC，这一点需要区分。</p>
<h2 id="articleHeader2">三、BFC的应用</h2>
<p>说了这么多有用没用的，我们平时布局的时候到底怎么应用呢：</p>
<p><strong>1.防止垂直margin重叠</strong></p>
<p>有点布局经验的朋友都知道margin collapse，也就是相邻的垂直元素同时设置了margin后，实际margin值会塌陷到其中较大的那个值。其根本原理就是它们处于同一个BFC，符合“属于同一个BFC的两个相邻元素的margin会发生重叠”的规则。</p>
<p>我们可以在其中一个元素外面包裹一层容器，并触发该容器生成一个BFC。那么两个元素便属于不同的BFC，就不会发生margin重叠了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .wrap{
        overflow: hidden;
    }
    p{
        width: 200px;
        line-height: 100px;
        margin: 100px;
        background: #000;
        color: #fff;
        text-align: center;
    }
</style>

<body>
    <p>我属于一个BFC</p>
    <div class=&quot;wrap&quot;>
        <p>我属于另一个BFC</p>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.wrap</span>{
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-tag">p</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我属于一个BFC<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我属于另一个BFC<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVcIa?w=416&amp;h=814" src="https://static.alili.tech/img/bVVcIa?w=416&amp;h=814" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如果是我的话会直接设置200px，或者只设置其中一个元素的margin（懒可以偷，但原理需知道）</p>
<p><strong>2.防止浮动子元素高度塌陷</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .parent{
        width: 300px;
        border: 3px solid #000;
        overflow: hidden;
    }
    .child{
        float: left;
        width: 100px;
        height: 100px;
        border: 3px solid #f00;
        color: #f00;
    }
</style>

<body>
    <div class=&quot;parent&quot;>
        <div class=&quot;child&quot;>float: left</div>
        <div class=&quot;child&quot;>float: left</div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-class">.child</span>{
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f00</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#f00</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>float: left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>float: left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVcKb?w=632&amp;h=244" src="https://static.alili.tech/img/bVVcKb?w=632&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们将.parent元素的overflow: hidden去掉，那么.parent元素就获取不到浮动元素的高度了。但是加上overflow属性后触发了BFC，计算BFC的高度时，浮动元素也参与了计算。</p>
<p><strong>3.防止文字（或其他元素）环绕</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .parent{
        width: 300px;
        border: 3px solid #000;
    }
    .child{
        float: left;
        width: 100px;
        height: 100px;
        border: 3px solid #f00;
        color: #f00;
    }
    .text{
        overflow: hidden;
    }
</style>

<body>
    <div class=&quot;parent&quot;>
        <div class=&quot;child&quot;>float: left</div>
        <div class=&quot;text&quot;>我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕</div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#000</span>;
    }
    <span class="hljs-selector-class">.child</span>{
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f00</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#f00</span>;
    }
    <span class="hljs-selector-class">.text</span>{
        <span class="hljs-attribute">overflow</span>: hidden;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>float: left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕我只是文字但我不会环绕<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVcL6?w=628&amp;h=470" src="https://static.alili.tech/img/bVVcL6?w=628&amp;h=470" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>正常情况下，如果一个块级元素设置成了float，那么他的兄弟元素会环绕其布局。这里我们给.text加上overflow，文字所在的区域就产生了BFC，元素的左边总是触碰到容器的左边，即使存在浮动也是如此。</p>
<p>这里举例了几个比较经典的应用，我们在以后的布局中也可以慢慢探索其中的奥秘之处，做一个能写一手好样式还能懂原理的前端er。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS：BFC 最熟悉的陌生人

## 原文链接
[https://segmentfault.com/a/1190000011211625](https://segmentfault.com/a/1190000011211625)

