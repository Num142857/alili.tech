---
title: '使用 CSS Flexbox 创建等高的价目表（Pricing Table）' 
date: 2019-01-24 2:30:11
hidden: true
slug: 1tckfm7yg0h
categories: [reprint]
---

{{< raw >}}

            <h1>使用 CSS Flexbox 创建等高的价目表（Pricing Table）</h1>
<p><em><strong>作者：</strong> Guest Post by Jon Muller | Feb 4th, 2018</em></p>
<p>在我看来，价目表是让潜在顾客一眼就能快速捕捉并获得你的服务和优点的最简洁有效的方法。最近，我正在为我的网站寻找一种好的价目表，然后发现几乎这些所有价目表都有一个问题——它们不是垂直响应式的。我的意思是价目表的每一列都有属于它自己基于里面内容数量的高度。我需要一种所有列高度都一样的等高价目表，不使用表格。我的解决方案？<a href="http://www.javascriptkit.com/dhtmltutors/css-flexbox.shtml">CSS Flexbox</a>.</p>
<p>这里有一个我将展示给你，通过使用 CSS Flexbox 创建的等高价目表的例子。注意每一列的高度是如何与兄弟列相等的，即使每一列都有它们自己不同行数的内容。此外，用来放点击按钮的最后一个 LI 也总是底部对齐的：</p>
<p>例子请看：<a href="https://codepen.io/georgec/pen/vdLwQV/">Equal Height Pricing Table using CSS Flexbox</a>.</p>
<p>这里是两条创建等高价目表的关键 CSS 样式：</p>
<p><img src="http://www.javascriptkit.com/dhtmltutors/equal-height-pricing-table-css.png" alt="image"></p>
<h2>HTML  标记</h2>
<p>让我从 HTML 标记开始，我希望能尽量干净简洁。为此，每一个价目表我都只是简单的使用了一个 UL 列表， 然后把它们用一个 DIV 容器包裹起来：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>2nd Place<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>Herman Miler<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Weight:<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> 55 lbs<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Max Weight:<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> 330 lbs<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> Check Out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>1st Place<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>Argomax Chair<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Material:<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> Nylon w/ Breathable Glass Fiber<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Head Rest:<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> Yes<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        "
        "
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> Check Out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>3rd Place<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>Eurotech Mesh<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Dimensions:<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> 24.8W x 47.3H<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        "
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> Check Out<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>正如你所见，每一个  <code>UL.theplan</code> 元素都包含了不同数量的 LI 条目。目标是让每一个 UL 的高度都一样， 并且每条价格计划的最后一条 LI 条目都排在最底部。</p>
<p>我找到了实现这种效果的最简方式？使用 CSS Flexbox 并且给每个 UL  设置<code>flex-direction:column</code> 以便它们垂直的排列来适配最长 flex 子元素的高度。下面我会更详细的解释。</p>
<h2>The CSS</h2>
<p>这里是等高价目表的 CSS。我移除了不重要的部分，因此你可以集中那些重要的部分：</p>
<pre><code class="hljs yaml"><span class="hljs-string">.pricingdiv{</span>
<span class="hljs-attr">    display:</span> <span class="hljs-string">flex;</span>
<span class="hljs-attr">    flex-wrap:</span> <span class="hljs-string">wrap;</span>
<span class="hljs-attr">    justify-content:</span> <span class="hljs-string">center;</span>
<span class="hljs-string">}</span>

<span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan{</span>
<span class="hljs-attr">    list-style:</span> <span class="hljs-string">none;</span>
<span class="hljs-attr">    margin:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">    padding:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">    display:</span> <span class="hljs-string">flex;</span>
<span class="hljs-attr">    flex-direction:</span> <span class="hljs-string">column;</span>
<span class="hljs-attr">    width:</span> <span class="hljs-number">260</span><span class="hljs-string">px;</span> <span class="hljs-string">/*</span> <span class="hljs-string">width</span> <span class="hljs-string">of</span> <span class="hljs-string">each</span> <span class="hljs-string">table</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">    margin-right:</span> <span class="hljs-number">20</span><span class="hljs-string">px;</span> <span class="hljs-string">/*</span> <span class="hljs-string">spacing</span> <span class="hljs-string">between</span> <span class="hljs-string">tables</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">    margin-bottom:</span> <span class="hljs-number">1</span><span class="hljs-string">em;</span>
<span class="hljs-attr">    border:</span> <span class="hljs-number">1</span><span class="hljs-string">px</span> <span class="hljs-string">solid</span> <span class="hljs-string">gray;</span>
<span class="hljs-attr">    transition:</span> <span class="hljs-string">all</span> <span class="hljs-number">.5</span><span class="hljs-string">s;</span>
<span class="hljs-string">}</span>

<span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan:hover{</span> <span class="hljs-string">/*</span> <span class="hljs-string">when</span> <span class="hljs-string">mouse</span> <span class="hljs-string">hover</span> <span class="hljs-string">over</span> <span class="hljs-string">pricing</span> <span class="hljs-string">table</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">    transform:</span> <span class="hljs-string">scale(1.05);</span>
<span class="hljs-attr">    transition:</span> <span class="hljs-string">all</span> <span class="hljs-number">.5</span><span class="hljs-string">s;</span>
<span class="hljs-attr">    z-index:</span> <span class="hljs-number">100</span><span class="hljs-string">;</span>
<span class="hljs-attr">    box-shadow:</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10</span><span class="hljs-string">px</span> <span class="hljs-string">gray;</span>
<span class="hljs-string">}</span>

<span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan:last-of-type{</span> <span class="hljs-string">/*</span> <span class="hljs-string">remove</span> <span class="hljs-string">right</span> <span class="hljs-string">margin</span> <span class="hljs-string">in</span> <span class="hljs-string">very</span> <span class="hljs-string">last</span> <span class="hljs-string">table</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">    margin-right:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-string">}</span>

<span class="hljs-string">/\*very</span> <span class="hljs-string">last</span> <span class="hljs-string">LI</span> <span class="hljs-string">within</span> <span class="hljs-string">each</span> <span class="hljs-string">pricing</span> <span class="hljs-string">UL</span> <span class="hljs-string">\*/</span>
<span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan</span> <span class="hljs-attr">li:last-of-type{</span>
<span class="hljs-attr">    text-align:</span> <span class="hljs-string">center;</span>
<span class="hljs-attr">    margin-top:</span> <span class="hljs-string">auto;</span> <span class="hljs-string">/\*align</span> <span class="hljs-string">last</span> <span class="hljs-string">LI</span> <span class="hljs-string">(price</span> <span class="hljs-string">botton</span> <span class="hljs-string">li)</span> <span class="hljs-string">to</span> <span class="hljs-string">the</span> <span class="hljs-string">very</span> <span class="hljs-string">bottom</span> <span class="hljs-string">of</span> <span class="hljs-string">UL</span> <span class="hljs-string">\*/</span>
<span class="hljs-string">}</span>  


<span class="hljs-string">@media</span> <span class="hljs-string">only</span> <span class="hljs-string">screen</span> <span class="hljs-string">and</span> <span class="hljs-string">(max-width:</span> <span class="hljs-number">600</span><span class="hljs-string">px)</span> <span class="hljs-string">{</span>
    <span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan{</span>
<span class="hljs-attr">        border-radius:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">100</span><span class="hljs-string">%;</span>
<span class="hljs-attr">        margin-right:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
    <span class="hljs-string">}</span>

    <span class="hljs-string">.pricingdiv</span> <span class="hljs-string">ul.theplan:hover{</span>
<span class="hljs-attr">        transform:</span> <span class="hljs-string">none;</span>
<span class="hljs-attr">        box-shadow:</span> <span class="hljs-string">none;</span>
    <span class="hljs-string">}</span>

    <span class="hljs-string">.pricingdiv</span> <span class="hljs-string">a.pricebutton{</span>
<span class="hljs-attr">        display:</span> <span class="hljs-string">block;</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
</code></pre>
<p>我通过给父 DIV 容器设置 <code>display:flex</code> 开始，并且允许子 flex 元素换行并水平居中，使用 <code>flex-wrap: wrap</code> 和 <code>justify-content: center</code>。所有子 UL 元素都是 flex 元素。</p>
<p>每一个由 UL 元素组成的价目表，都设置了 <code>flex-direction:column</code>。默认情况下，flex 子元素（flex children）都在水平轴展现。通过设置 <code>flex-direction:column</code>，我强制所有 flex 子元素的默认行为都作用在垂直面，包括黄金奖（golden prize）—— <strong>默认等高的flex 子元素</strong>。</p>
<h2>每一个 UL 价目表的最后一个 LI 元素底部对齐</h2>
<p>这样，每个在 DIV 里的价目表，现在高度都一样了。但是仍然有需要改进的地方让一切看起来更精致。我想让包含在每个 UL 的最后一个 LI 中的动作按钮与表格的最底部对齐。</p>
<p>我们需要两步来实现。首先，我通过 <code>display: flex</code> 把每个 UL 价目表也设置为 flexbox 容器。一旦这样做了，我可以使用 <code>margin</code> 属性来对齐一个和兄弟元素不同的特殊的子元素，比如左或者右对齐的水平 flex 子元素，或者这种情况下的垂直 flex 子元素，上面或者底部。 </p>
<p>要让每个最后一个 LI 元素底部对齐，需要给这些元素添加点魔法原料 <code>margin-top: auto</code>：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.pricingdiv</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.theplan</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:last-of-type</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">margin-top</span>: auto; <span class="hljs-comment">/* align last LI (price botton li) to the very bottom of UL */</span>
}
</code></pre>
<p>如果你不熟悉使用 <code>margin</code> 让一个 flex 子元素和其他子元素对齐的技巧，请看 <a href="http://www.javascriptkit.com/dhtmltutors/css-flexbox.shtml#margin">this very helpful section on aligning CSS flex children elements</a>。</p>
<h2>结论</h2>
<p>正如你所看到的，CSS Flexbox可以创建高度相等，响应式，甚至咋页面居中的元素。它帮助我解决了我见过的许多CSS定价表的问题。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 CSS Flexbox 创建等高的价目表（Pricing Table）

## 原文链接
[https://www.zcfy.cc/article/creating-an-equal-height-pricing-table-using-css-flexbox](https://www.zcfy.cc/article/creating-an-equal-height-pricing-table-using-css-flexbox)

