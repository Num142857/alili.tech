---
title: 'CSS基础篇--快速使用CSS Grid布局，实现响应式设计' 
date: 2018-12-08 2:30:30
hidden: true
slug: khd23tt0ym
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">常用Grid布局属性介绍</h2>
<p>下面从一个简单Grid布局例子说起。</p>
<p><code>CSS Grid</code> 布局由两个核心组成部分是<code> wrapper</code>（父元素）和<code> items</code>（子元素）。 <code>wrapper</code> 是实际的<code> grid(网格</code>)，<code>items</code> 是<code> grid(网格) </code>内的内容。</p>
<p>下面是一个 wrapper 元素，内部包含6个 items ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrapper"</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">5</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-number">6</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>要把<code> wrapper </code>元素变成一个<code> grid</code>(网格)，只要简单地把其<code> display </code>属性设置为<code> grid </code>即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV7cCw?w=444&amp;h=185" src="https://static.alili.tech/img/bV7cCw?w=444&amp;h=185" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">Columns(列) 和 rows(行)</h3>
<p>为了使其成为二维的网格容器，我们需要定义列和行。让我们创建3列和2行。我们将使用<code>grid-template-row</code>和<code>grid-template-column</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">50px</span> <span class="hljs-number">50px</span>;
}</code></pre>
<p><code>grid-template-columns</code>的3个值表示三列，相应的数值表示<strong><code>列宽</code></strong>即都为100px。<br><code>grid-template-rows</code>的2个值表示两行，相应的数值表示<strong><code>行高</code></strong>即都为50px</p>
<p>得到的结果如下：<br><span class="img-wrap"><img data-src="/img/bV7cGa?w=439&amp;h=157" src="https://static.alili.tech/img/bV7cGa?w=439&amp;h=157" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们可以变化一下行高跟列宽的值看下效果，代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
    grid-template-columns: 200px 50px 100px;
    grid-template-rows: 100px 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">100px</span> <span class="hljs-number">30px</span>;
}</code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bV7jqC?w=388&amp;h=148" src="https://static.alili.tech/img/bV7jqC?w=388&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">放置 items(子元素)</h3>
<p>我们使用与之前相同的 HTML 标记，为了帮助我们更好的理解，我们在每个 items(子元素) 加上了单独的 class ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
  <div class=&quot;item1&quot;>1</div>
  <div class=&quot;item2&quot;>2</div>
  <div class=&quot;item3&quot;>3</div>
  <div class=&quot;item4&quot;>4</div>
  <div class=&quot;item5&quot;>5</div>
  <div class=&quot;item6&quot;>6</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrapper"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item1"</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item2"</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item3"</span>&gt;<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item4"</span>&gt;<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item5"</span>&gt;<span class="hljs-number">5</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item6"</span>&gt;<span class="hljs-number">6</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>创建一个 3×3 的 grid(网格)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
}</code></pre>
<p>得到如下效果：<br><span class="img-wrap"><img data-src="/img/bV7cJc?w=333&amp;h=224" src="https://static.alili.tech/img/bV7cJc?w=333&amp;h=224" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们只在页面上看到 3×2 的 grid(网格)，而我们定义的是 3×3 的 grid(网格)。这是因为我们只有 6 个 items(子元素) 来填满这个网格。如果我们再加3个 items(子元素)，那么最后一行也会被填满。</p>
<p>要<strong>定位和调整 items(子元素) 大小</strong>，我们将使用 <strong><code>grid-column</code></strong> 和<strong><code> grid-row</code></strong> 属性来设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-column-start: 1;
    grid-column-end: 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-column-end</span>: <span class="hljs-number">4</span>;
}</code></pre>
<p>当然可以有简写方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-column: 1 / 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}</code></pre>
<p>上面代码意思就是： item1 占据从第一条网格线开始，到第四条网格线结束。显示效果如下：<br><span class="img-wrap"><img data-src="/img/bV7cLS?w=287&amp;h=285" src="https://static.alili.tech/img/bV7cLS?w=287&amp;h=285" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你不明白我们设置的只有 3 列，为什么有4条网格线呢？看看下面这个图像，黑色的列网格线你就明白了：<br><span class="img-wrap"><img data-src="/img/bV7cMy?w=470&amp;h=304" src="https://static.alili.tech/img/bV7cMy?w=470&amp;h=304" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果上面的看懂了，来个复杂点的巩固下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-column-start: 1;
    grid-column-end: 3;
}
.item3 {
    grid-row-start: 2;
    grid-row-end: 4;
}
.item4 {
    grid-column-start: 2;
    grid-column-end: 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-column-end</span>: <span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.item3</span> {
    <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row-end</span>: <span class="hljs-number">4</span>;
}
<span class="hljs-selector-class">.item4</span> {
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-column-end</span>: <span class="hljs-number">4</span>;
}</code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bV7cNs?w=294&amp;h=290" src="https://static.alili.tech/img/bV7cNs?w=294&amp;h=290" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">响应式布局例子</h3>
<p>实现如图效果：<br><span class="img-wrap"><img data-src="/img/bV7cRe?w=732&amp;h=398" src="https://static.alili.tech/img/bV7cRe?w=732&amp;h=398" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>结构布局</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.container {
    display: grid;    
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 350px 50px;
    grid-gap: 5px;
}
</style>
<div class=&quot;container&quot;>
  <div class=&quot;header&quot;>HEADER</div>
  <div class=&quot;menu&quot;>MENU</div>
  <div class=&quot;content&quot;>CONTENT</div>
  <div class=&quot;footer&quot;>FOOTER</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: grid;    
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(12, 1fr);
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">50px</span> <span class="hljs-number">350px</span> <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">5px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span>&gt;</span>MENU<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>使用<code> grid-template-columns</code> 属性创建一个 12 列的网格，每个列都是一个单位宽度（总宽度的 1/12 ）。（愚人码头注：其中，<code> repeat(12, 1fr)</code> 意思是 12 个重复的 1fr 值。 <code>fr</code> 是网格容器剩余空间的等分单位。）</p>
<p>使用 <code>grid-template-rows</code> 属性创建 3 行，第一行高度是 50px ，第二行高度是 350px 和第三行高度是 50px。</p>
<p>使用<code> grid-gap</code> 属性在网格中的网格项之间添加一个<code>间隙</code>。</p>
<h4>添加 grid-template-areas</h4>
<p>这个属性被称为<code>网格区域</code>，也叫<code>模板区域</code>，能够让我们轻松地进行布局实验。</p>
<p>要将它添加到网格中，我们只需给网格容器加一个<code> grid-template-areas </code>属性即可。 语法可能有点奇怪，因为它不像其他的 CSS 语法。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: grid;
    grid-gap: 5px;    
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 350px 50px;
    grid-template-areas:
        &quot;h h h h h h h h h h h h&quot;
        &quot;m m c c c c c c c c c c&quot;
        &quot;f f f f f f f f f f f f&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">5px</span>;    
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(12, 1fr);
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">50px</span> <span class="hljs-number">350px</span> <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">grid-template-areas</span>:
        <span class="hljs-string">"h h h h h h h h h h h h"</span>
        <span class="hljs-string">"m m c c c c c c c c c c"</span>
        <span class="hljs-string">"f f f f f f f f f f f f"</span>;
}</code></pre>
<p>上面代码创建3行12列，上面<code>grid-template-areas</code>属性中的值，每行代表一行，用网格术语来说是 网格轨道(Grid Track) ，每个字符（<code> h，m，c，f</code>）代表一个网格单元格。愚人码头注：其实是 网格区域(Grid Area) 名称，你可以使用<code>任意名称</code>。   </p>
<p>你可能已经猜到，我选择了字符 h，m，c，f，是因为他们是 header, menu, content 和 footer 的首字母。 当然，我可以把它们叫做任何想要的名称，但是使用他们所描述的东西的第一个字符更加容易让人理解。</p>
<h4>给网格项设定网格区域名称</h4>
<p>现在我们需要将这些字符与网格中的网格项建立对应的连接。 要做到这一点，我们将在网格项使用<code> grid-area </code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header {
    grid-area: h;
}
.menu {
    grid-area: m;
}
.content {
    grid-area: c;
}
.footer {
   grid-area: f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.header</span> {
    <span class="hljs-attribute">grid-area</span>: h;
}
<span class="hljs-selector-class">.menu</span> {
    <span class="hljs-attribute">grid-area</span>: m;
}
<span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">grid-area</span>: c;
}
<span class="hljs-selector-class">.footer</span> {
   <span class="hljs-attribute">grid-area</span>: f;
}</code></pre>
<p>这样就实现了上面的布局效果。</p>
<h4>尝试其它布局</h4>
<p><strong>1.把 menu 移到右边</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-template-areas:
        “h h h h h h h h h h h h”
        &quot;c c c c c c c c c c m m”
        “f f f f f f f f f f f f”;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>grid-template-areas:
        “h h h h h h h h h h h h”
        <span class="hljs-string">"c c c c c c c c c c m m”</span>
        “f f f f f f f f f f f f”;</code></pre>
<p>实现后的效果：<br><span class="img-wrap"><img data-src="/img/bV7jlb?w=715&amp;h=422" src="https://static.alili.tech/img/bV7jlb?w=715&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2.使用点<code> . </code>来创建空白的网格单元格</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-template-areas:
        “. h h h h h h h h h h .”
        &quot;c c c c c c c c c c m m”
        “. f f f f f f f f f f .”;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>grid-template-areas:
        “. h h h h h h h h h h .”
        <span class="hljs-string">"c c c c c c c c c c m m”</span>
        “. f f f f f f f f f f .”;</code></pre>
<p>实现效果：<br><span class="img-wrap"><img data-src="/img/bV7jlI?w=722&amp;h=447" src="https://static.alili.tech/img/bV7jlI?w=722&amp;h=447" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>3.真正的响应式布局</strong><br>假设你想在移动设备上查看的是：标题旁边是菜单。那么你可以简单地这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (max-width: 640px) {
    .container {
        grid-template-areas:
            &quot;m m m m m m h h h h h h&quot;
            &quot;c c c c c c c c c c c c&quot;
            &quot;f f f f f f f f f f f f&quot;;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">640px</span>) {
    <span class="hljs-selector-class">.container</span> {
        <span class="hljs-attribute">grid-template-areas</span>:
            <span class="hljs-string">"m m m m m m h h h h h h"</span>
            <span class="hljs-string">"c c c c c c c c c c c c"</span>
            <span class="hljs-string">"f f f f f f f f f f f f"</span>;
    }
}</code></pre>
<p>可以看到如下效果：<br><span class="img-wrap"><img data-src="/img/bV7jn2?w=800&amp;h=372" src="https://static.alili.tech/img/bV7jn2?w=800&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>注：所有这些更改都是使用纯 CSS 完成的，不需要修改 HTML 。这被称为结构和表现分离， Grid(网格) 布局真正做到了这点。</blockquote>
<h2 id="articleHeader4">浏览器兼容</h2>
<p>如图所示：<br><span class="img-wrap"><img data-src="/img/bV7lXh?w=1226&amp;h=278" src="https://static.alili.tech/img/bV7lXh?w=1226&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">参考地址</h2>
<ul>
<li><a href="http://www.css88.com/archives/8506" rel="nofollow noreferrer" target="_blank">5分钟学会 CSS Grid 布局</a></li>
<li><a href="http://www.css88.com/archives/8512" rel="nofollow noreferrer" target="_blank">如何使用 CSS Grid 快速而又灵活的布局</a></li>
<li><a href="http://www.css88.com/archives/8510" rel="nofollow noreferrer" target="_blank">CSS Grid 布局完全指南(图解 Grid 详细教程)</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS基础篇--快速使用CSS Grid布局，实现响应式设计

## 原文链接
[https://segmentfault.com/a/1190000014096932](https://segmentfault.com/a/1190000014096932)

