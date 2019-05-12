---
title: '[译]HTML&CSS Lesson8: 列表' 
date: 2019-02-15 2:30:44
hidden: true
slug: q9fv1d0byys
categories: [reprint]
---

{{< raw >}}

                    
<p>列表清单是我们日常生活的一部分。未办事项清单确认我们接下来要做什么，行车导航提供路线列表，食谱提供成分列表和说明列表。几乎所有的东西都有列表，这就很容易理解为什么它们在网上这么受欢迎。</p>
<p>若我们想在网站上创建列表，HTML提供了三种类型的列表：<br>无序列表、有序列表和描述列表。选择哪种列表——或者是否使用列表——归结于要显示的内容以及语义上最符合当前内容的标签选项。</p>
<p>除了HTML中提供了三种不同的列表，我们还可以在CSS中用多种方法实现这些列表。例如我们可以选择在列表中使用哪种列表项标记。这个标记可以是方形、圆形、数字、字母或者将它隐藏。另外，我们还可以设置列表是纵向展示或横向展示。所有这些选择在页面渲染中都扮演着重要的角色。</p>
<h1 id="articleHeader0">无序列表</h1>
<p>无序列表就是一个内容相关但顺序无关紧要的列表。用HTML创建无序列表，使用无序列表块状元素<code>&lt;ul&gt;</code>，无序列表中的每一项都单独使用列表项元素<code>&lt;li&gt;</code>标记。</p>
<p>默认情况下，大部分的浏览器都会为<code>&lt;ul&gt;</code>元素添加纵向的<code>margin</code>和左边的<code>padding</code>，为<code>&lt;li&gt;</code>元素设置一个前置的圆点标记。这些标记被称为列表项标记，它可以用CSS修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Orange</li>
  <li>Green</li>
  <li>Blue</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbh862?w=614&amp;h=138" src="https://static.alili.tech/img/bVbh862?w=614&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">有序列表</h1>
<p>有序列表元素<code>&lt;ol&gt;</code>与无序列表使用方式相同，列表项元素的创建也相同。它们的主要不同在于，对于有序列表来说，呈现列表项的顺序非常重要。</p>
<p>因为是有序的，所以列表项标记默认为数字，为非圆点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol>
  <li>Head north on N Halsted St</li>
  <li>Turn right on W Diversey Pkwy</li>
  <li>Turn left on N Orchard St</li>
</ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Head north on N Halsted St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn right on W Diversey Pkwy<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn left on N Orchard St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbh87u?w=582&amp;h=134" src="https://static.alili.tech/img/bVbh87u?w=582&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">
<code>start</code> 属性</h2>
<p><code>start</code>属性定义列表项标记的数字从哪个值开始。默认情况下数字从<code>1</code>开始。但有可能列表需要从<code>30</code>或其他值开始。在<code>&lt;ol&gt;</code>元素上使用<code>start</code>属性就可以定义有序列表开始计数的值。</p>
<p><code>start</code>属性只接受整数值，即便有序列表可以使用不同类型的数字编号，例如罗马数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol start=&quot;30&quot;>
  <li>Head north on N Halsted St</li>
  <li>Turn right on W Diversey Pkwy</li>
  <li>Turn left on N Orchard St</li>
</ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">start</span>=<span class="hljs-string">"30"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Head north on N Halsted St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn right on W Diversey Pkwy<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn left on N Orchard St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbh88N?w=602&amp;h=134" src="https://static.alili.tech/img/bVbh88N?w=602&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">
<code>reversed</code> 属性</h2>
<p>当我们在<code>&lt;ol&gt;</code>元素上使用<code>reversed</code>属性，表示列表倒序显示。若一个有序列表有五个列表项<code>1</code>到<code>5</code>,将会按倒序<code>5</code>到<code>1</code>显示。</p>
<p><code>reversed</code>属性是一个布尔值（<code>true</code>或者<code>false</code>），除此之外它不接受任何其他值。<code>false</code>为默认值；当值为<code>true</code>时，<code>&lt;ol&gt;</code>元素的列表项将会按倒序显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol reversed>
  <li>Head north on N Halsted St</li>
  <li>Turn right on W Diversey Pkwy</li>
  <li>Turn left on N Orchard St</li>
</ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">reversed</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Head north on N Halsted St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn right on W Diversey Pkwy<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn left on N Orchard St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbh89q?w=566&amp;h=126" src="https://static.alili.tech/img/bVbh89q?w=566&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">
<code>value</code>属性</h2>
<p><code>value</code>属性可以使用在有序列表的<code>&lt;li&gt;</code>元素上，用以修改列表的标记值。使用了<code>value</code>值及其以下的所有列表项的数字标记将会按照<code>value</code>值重新计数。</p>
<p>例如，我们在第二个列表项添加<code>value</code>值为<code>9</code>，那么这个列表项标记的数字显示为<code>9</code>， 同时所有随后的列表项标记都会从<code>9</code>以后开始计数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol>
  <li>Head north on N Halsted St</li>
  <li value=&quot;9&quot;>Turn right on W Diversey Pkwy</li>
  <li>Turn left on N Orchard St</li>
</ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Head north on N Halsted St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"9"</span>&gt;</span>Turn right on W Diversey Pkwy<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Turn left on N Orchard St<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbh9aG?w=596&amp;h=130" src="https://static.alili.tech/img/bVbh9aG?w=596&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">描述列表</h2>
<p>线上还有一种描述列表（但它没有像无序列表和有序列表那么常见）。 描述列表常用于列出多个术语和描述，例如术语表。</p>
<p>HTML创建描述列表使用描述列表元素<code>&lt;dl&gt;</code>。描述列表不再需要<code>&lt;li&gt;</code>元素标记列表项，而是用另外两个块状元素代替：列表项术语元素<code>&lt;dt&gt;</code>和描述元素<code>&lt;dd&gt;</code>。</p>
<p>描述列表可能包含了多个一对一的术语和描述。除此之外，也可能是多个术语对应一个描述或者多个描述对应一个术语。一个术语可能有多种含义和解释。相对的，一个描述也可能适用于多个术语。</p>
<p>当我们添加描述时，需要注意<code>&lt;dt&gt;</code>元素需要定义在<code>&lt;dd&gt;</code>元素之前。定义的术语和描述需彼此对应；所以这些元素的顺序非常重要。</p>
<p>默认情况下，<code>&lt;dl&gt;</code>元素与<code>&lt;ul&gt;</code>和<code>&lt;ol&gt;</code>元素一样，带有纵向外边距。此外，<code>&lt;dd&gt;</code>元素也有一个默认的左外边距。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dl>
  <dt>study</dt>
  <dd>The devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books</dd>
  <dt>design</dt>
  <dd>A plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is built or made</dd>
  <dd>Purpose, planning, or intention that exists or is thought to exist behind an action, fact, or material object</dd>
  <dt>business</dt>
  <dt>work</dt>
  <dd>A person's regular occupation, profession, or trade</dd>
</dl>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>study<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span>The devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books<span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>design<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span>A plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is built or made<span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span>Purpose, planning, or intention that exists or is thought to exist behind an action, fact, or material object<span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>business<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>work<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span>A person's regular occupation, profession, or trade<span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dl</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbizmP?w=1210&amp;h=500" src="https://static.alili.tech/img/bVbizmP?w=1210&amp;h=500" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">列表嵌套</h1>
<p>使列表极为强大的一个特性是它们嵌套的能力。每个列表都可以嵌套在另一个列表里；它们可以连续地嵌套。但这种无限嵌套的功能并不合适随意使用。列表还是需要应用在最适合它们语义的地方。</p>
<p>嵌套列表的一个目的是便于识别列表的起始位置以及每个列表和列表项。拿无序列表和有序列表来说，嵌套列表时，<code>&lt;ul&gt;</code>元素和<code>&lt;ol&gt;</code>元素的直接子元素是<code>&lt;li&gt;</code>元素。再重复一遍，<code>&lt;ul&gt;</code>元素和<code>&lt;ol&gt;</code>元素的直接子元素只能是<code>&lt;li&gt;</code>元素。</p>
<p>也就是说，在<code>&lt;li&gt;</code>元素内可以添加任何标准的元素标签，包括<code>&lt;ul&gt;</code>或<code>&lt;ol&gt;</code>元素。</p>
<p>若要在列表项中嵌套一个列表，需要新建列表。嵌套列表完成后，闭合包裹的列表项并继续在原列表项中操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol>
  <li>Walk the dog</li>
  <li>Fold laundry</li>
  <li>
    Go to the grocery and buy:
    <ul>
      <li>Milk</li>
      <li>Bread</li>
      <li>Cheese</li>
    </ul>
  </li>
  <li>Mow the lawn</li>
  <li>Make dinner</li>
</ol>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Walk the dog<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Fold laundry<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    Go to the grocery and buy:
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Milk<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Bread<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Cheese<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Mow the lawn<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Make dinner<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbizqP?w=942&amp;h=310" src="https://static.alili.tech/img/bVbizqP?w=942&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为嵌套列表有点复杂——如果写错样式会错乱—— 我们来快速回顾一下。<code>&lt;ul&gt;</code>和<code>&lt;ol&gt;</code>元素只能包含<code>&lt;li&gt;</code>元素。<code>&lt;li&gt;</code>元素可以包含任何普通的元素；但<code>&lt;li&gt;</code>元素本身只能是<code>&lt;ul&gt;</code>或<code>&lt;ol&gt;</code>元素的子元素。</p>
<p>值得注意的是，嵌套列表的项标记会根据嵌套的深度改变。在上面的例子中，无序列表在有序列表内以空心圆而非实心圆作为项标记。这是因为无序列表是有序列表的一级嵌套列表。</p>
<p>幸运的是，我们可以控制任何级别的列表项标记，下面我们来看看。</p>
<h1 id="articleHeader7">列表样式</h1>
<p>无序和有序列表都有默认的项标记，无序列表通常是实心圆，而有序列表是数字。项标记的样式和定位都可以通过CSS来调整。</p>
<h2 id="articleHeader8">
<code>list-style-type</code>属性</h2>
<p><code>list-style-type</code>属性用于设置项标记的内容。从正方形和十进制数一直到亚美尼亚编号都属<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type" rel="nofollow noreferrer" target="_blank">可用值</a>范围。这个样式可以写在<code>&lt;ul&gt;</code>、<code>&lt;ol&gt;</code>或者<code>&lt;li&gt;</code>元素上</p>
<p>任何<code>list-style-type</code>属性值都可以添加到无序或者有序列表中。这一功能，可以在无序列表中使用数列项标记，在有序列表使用非数字项标记。</p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Orange</li>
  <li>Green</li>
  <li>Blue</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
  list-style-type: square;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style-type</span>: square;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiGlM?w=546&amp;h=140" src="https://static.alili.tech/img/bVbiGlM?w=546&amp;h=140" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">
<code>list-style-type</code>属性值</h3>
<p>前面提到了<code>list-style-type</code>属性有一些不同的值。这里罗列出了这些值及其意义。</p>
<table>
<tbody><tr>
<th>
<code>list-style-type</code>值</th>
        <th>备注</th>
    </tr>
<tr>
<td> none </td>
        <td>无标记</td>
    </tr>
<tr>
<td> disc </td>
        <td>实心圆</td>
    </tr>
<tr>
<td> circle </td>
        <td>空心圆</td>
    </tr>
<tr>
<td> square </td>
        <td>实心正方形</td>
    </tr>
<tr>
<td> decimal </td>
        <td>十进制数</td>
    </tr>
<tr>
<td> decimal-leading-zero </td>
        <td>初始值为0的十进制数</td>
    </tr>
<tr>
<td> lower-roman </td>
        <td>小写罗马数字</td>
    </tr>
<tr>
<td> upper-roman </td>
        <td>大写罗马数字</td>
    </tr>
<tr>
<td> lower-greek </td>
        <td>小写古希腊语</td>
    </tr>
<tr>
<td> lower-alpha / lower-latin </td>
        <td>小写ASCII字母</td>
    </tr>
<tr>
<td> upper-alpha / upper-latin     </td>
        <td>大写ASCII字母</td>
    </tr>
<tr>
<td> armenian </td>
        <td>亚美尼亚语</td>
    </tr>
<tr>
<td> georgian </td>
        <td>传统格鲁吉亚编号</td>
    </tr>
</tbody></table>
<h3 id="articleHeader10">图片项标记</h3>
<p>我们总会碰到<code>list-style-type</code>属性值不够使用的时候，这时候我们就希望能够自定义项标记。达到此目的最常用方法是为<code>&lt;li&gt;</code>元素设置背景图。</p>
<p>移除默认的<code>list-style-type</code>属性值，然后在<code>&lt;li&gt;</code>元素设置背景图和内边距。</p>
<p>详细一点来说，就是将<code>list-style-type</code>属性值设为<code>none</code>就可以移除项标记。使用<code>background</code>属性定义一张背景图，如有必要还可以为其设置定位和重复属性。接下来设置一个左内边距为背景图留出足够空间。代码如下所示：</p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Orange</li>
  <li>Green</li>
  <li>Blue</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li {
  background: url(&quot;arrow.png&quot;) 0 50% no-repeat;
  list-style-type: none;
  padding-left: 12px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"arrow.png"</span>) <span class="hljs-number">0</span> <span class="hljs-number">50%</span> no-repeat;
  <span class="hljs-attribute">list-style-type</span>: none;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">12px</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiGrB?w=642&amp;h=142" src="https://static.alili.tech/img/bVbiGrB?w=642&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">
<code>list-style-position</code>属性</h3>
<p>默认情况下项标记位于<code>&lt;li&gt;</code>元素左侧，此时<code>list-style-position</code>属性的值为<code>outside</code>，表示元素所有内容都显示在项标记右侧。使用<code>list-style-position</code>属性可以将默认值<code>outside</code>改为<code>inside</code>或<code>inherit</code>。</p>
<p>属性值<code>outside</code>表示项标记位于<code>&lt;li&gt;</code>元素左侧，并且不允许元素内容在项标记下环绕显示。属性值<code>inside</code>（非常少见）使项标记显示在<code>&lt;li&gt;</code>元素第一行，并且允许其他内容在项标记下环绕显示。</p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Cupcakes...</li>
  <li>Sprinkles...</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Cupcakes...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Sprinkles...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
  list-style-position: inside;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style-position</span>: inside;
}
</code></pre>
<h3 id="articleHeader12">简写列表样式属性</h3>
<p>我们之前介绍的列表样式属性<code>list-style-type</code>和<code>list-style-position</code>可以简写成一个属性值<code>list-style</code>。使用<code>list-style</code>属性可以一次性设置一个或多个列表样式属性。简写值的顺序为先设置<code>list-style-type</code>，后设置<code>list-style-position</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
  list-style: circle inside;
}
ol {
  list-style: lower-roman;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style</span>: circle inside;
}
<span class="hljs-selector-tag">ol</span> {
  <span class="hljs-attribute">list-style</span>: lower-roman;
}
</code></pre>
<h1 id="articleHeader13">横向列表</h1>
<p>偶尔我们也想要展示横向列表。也许我们想将列表分成多列，来构建一个导航列表，或者将一些列表项放在一行中。基于内容和所需布局，有几种不同的方法可以将列表设置为单行显示，例如将<code>&lt;li&gt;</code>元素的<code>display</code>属性设置为<code>inline</code>或<code>inline-block</code>，或者为元素设置浮动。</p>
<h2 id="articleHeader14">
<code>display</code>属性</h2>
<p>将列表设置为单行显示最便捷快速的方法就是把<code>&lt;li&gt;</code>的<code>display</code>属性设置为<code>inline</code>或<code>inline-block</code>。设置后所有<code>&lt;li&gt;</code>元素会间隔一个空格，单行排列显示。</p>
<p>如果不需要每个<code>&lt;li&gt;</code>元素间的空格，可以根据第五课 <a href="https://segmentfault.com/a/1190000011296916">定位</a> 所学，移除元素间的空格。</p>
<p>多半我们都会用<code>inline-block</code>而非<code>inline</code>属性值。<code>inline-block</code>属性值允许我们简单快速地为元素添加纵向外边距和<code>&lt;li&gt;</code>元素间的距离，这些是<code>inline</code>属性值不能做到的。</p>
<p>当我们将<code>display</code>属性值改为<code>inline</code>或<code>inline-block</code>，列表项标记，如圆点、数字或者其他的样式都会被移除。</p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Orange</li>
  <li>Green</li>
  <li>Blue</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li {
  display: inline-block;
  margin: 0 10px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiSXP?w=634&amp;h=94" src="https://static.alili.tech/img/bVbiSXP?w=634&amp;h=94" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>float</code>属性</p>
<p>修改<code>display</code>属性值为<code>inline</code>或<code>inline-block</code>确实很简单快捷；但是这种方法移除了列表项标记。如果列表项标记是必须的，那么为<code>&lt;li&gt;</code>元素设置浮动比修改<code>display</code>属性更合适。</p>
<p>将<code>&lt;li&gt;</code>元素的<code>float</code>属性设置为<code>left</code>，所有<code>&lt;li&gt;</code>元素都会水平无间隙的排列显示。当我们为<code>&lt;li&gt;</code>元素设置浮动后，列表项标记默认显示，并位于相邻<code>&lt;li&gt;</code>元素上。为避免列表项标记与<code>&lt;li&gt;</code>元素显示重叠，需要添加横向的<code>margin</code>或<code>padding</code></p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Orange</li>
  <li>Green</li>
  <li>Blue</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li {
  float: left;
  margin: 0 20px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiS0h?w=616&amp;h=140" src="https://static.alili.tech/img/bVbiS0h?w=616&amp;h=140" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>为任何元素设置浮动，都破坏了页面的流布局。所以我们必须要记得清除浮动——最常用的是clearfix方法——使页面回到正常的流布局中。</p>
<h2 id="articleHeader15">导航列表示例</h2>
<p>我们常用无序列表开发导航菜单栏。这些菜单栏通常使用以上提到的两种方法实现水平布局。下面是一个将<code>display</code>属性设置为<code>inline-block</code>的无序列表实现的水平菜单栏示例。</p>
<p><em><a>HTML</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav class=&quot;navigation&quot;>
  <ul>
    <li><a href=&quot;#&quot;>Profile</a></li><!--
    --><li><a href=&quot;#&quot;>Settings</a></li><!--
    --><li><a href=&quot;#&quot;>Notifications</a></li><!--
    --><li><a href=&quot;#&quot;>Logout</a></li>
  </ul>
</nav>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navigation"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Notifications<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
</code></pre>
<p><em><a>CSS</a></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".navigation ul {
  font: bold 11px &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
}
.navigation li {
  display: inline-block;
}
.navigation a {
  background: #395870;
  background: linear-gradient(#49708f, #293f50);
  border-right: 1px solid rgba(0, 0, 0, .3);
  color: #fff;
  padding: 12px 20px;
  text-decoration: none;
}
.navigation a:hover {
  background: #314b60;
  box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, .3);
}
.navigation li:first-child a {
  border-radius: 4px 0 0 4px;
}
.navigation li:last-child a {
  border-right: 0;
  border-radius: 0 4px 4px 0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">font</span>: bold <span class="hljs-number">11px</span> <span class="hljs-string">"Helvetica Neue"</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">text-transform</span>: uppercase;
}
<span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#395870</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#49708f, #293f50);
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(0, 0, 0, .3);
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">12px</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#314b60</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .3);
}
<span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span>;
}
<span class="hljs-selector-class">.navigation</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:last-child</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiS2o?w=914&amp;h=144" src="https://static.alili.tech/img/bVbiS2o?w=914&amp;h=144" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader16">练习</h1>
<p>现在我们知道了如何使用HTML和CSS创建列表，我们回到样式讨论会网站，看看如何使用列表。</p>
<ul>
<li>目前我们页面中所有<code>&lt;header&gt;</code>和<code>&lt;footer&gt;</code>元素内的菜单栏都由超链接元素组成。我们可以使用无序列表使这些元素更有条理。</li>
<li>使用无序列表（<code>&lt;ul&gt;</code>元素）和列表项（<code>&lt;li&gt;</code>元素）优化我们菜单栏的结构后，这些新的元素会使菜单栏纵向排列。</li>
<li>为了使元素水平排列，我们将<code>&lt;li&gt;</code>元素的<code>display</code>属性值改为<code>inline-block</code>，但完成后<code>&lt;li&gt;</code>元素间会留有间隙。回想第五课 <a href="https://segmentfault.com/a/1190000011296916">定位</a> 的内容，我们知道可以通过在<code>&lt;li&gt;</code>元素的开始标签和结束标签之间添加注释来消除空格。</li>
<li>完成后，<code>&lt;header&gt;</code>元素中的菜单栏代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav class=&quot;nav primary-nav&quot;>
  <ul>
    <li><a href=&quot;index.html&quot;>Home</a></li><!--
    --><li><a href=&quot;speakers.html&quot;>Speakers</a></li><!--
    --><li><a href=&quot;schedule.html&quot;>Schedule</a></li><!--
    --><li><a href=&quot;venue.html&quot;>Venue</a></li><!--
    --><li><a href=&quot;register.html&quot;>Register</a></li>
  </ul>
</nav>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav primary-nav"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"index.html"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"speakers.html"</span>&gt;</span>Speakers<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"schedule.html"</span>&gt;</span>Schedule<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"venue.html"</span>&gt;</span>Venue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"register.html"</span>&gt;</span>Register<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
</code></pre>
<ul><li>同理，<code>&lt;footer&gt;</code>元素中的菜单栏修改后代码如下所示：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav class=&quot;nav&quot;>
  <ul>
    <li><a href=&quot;index.html&quot;>Home</a></li><!--
    --><li><a href=&quot;speakers.html&quot;>Speakers</a></li><!--
    --><li><a href=&quot;schedule.html&quot;>Schedule</a></li><!--
    --><li><a href=&quot;venue.html&quot;>Venue</a></li><!--
    --><li><a href=&quot;register.html&quot;>Register</a></li>
  </ul>
</nav>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"index.html"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"speakers.html"</span>&gt;</span>Speakers<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"schedule.html"</span>&gt;</span>Schedule<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"venue.html"</span>&gt;</span>Venue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"register.html"</span>&gt;</span>Register<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
</code></pre>
<ul>
<li>别忘了在所有HTML文件中修改这部分代码</li>
<li>写好无序列表后，我们需要清除列表项的一些样式，并将其设置为水平布局。 我们可以使用class <code>nav</code>来帮我们完成。</li>
<li>我们将所有class为<code>nav</code>的元素内的<code>&lt;li&gt;</code>元素的<code>display</code>属性设置为<code>inline-block</code>，设置一些外边距<code>margin</code>，并将垂直属性<code>vertical-align</code>设置为上对齐<code>top</code>。</li>
<li>除此之外，我们使用伪类选择器<code>:last-child</code>将最后一个<code>&lt;li&gt;</code>元素的右外边距<code>margin</code>设为<code>0</code>。这是为了确保<code>&lt;li&gt;</code>元素与父元素间的水平间隙都被移除。</li>
<li>我们在<code>main.css</code>文件的导航样式下，添加我们需要的样式：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nav li {
  display: inline-block;
  margin: 0 10px;
  vertical-align: top;
}
.nav li:last-child {
  margin-right: 0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">vertical-align</span>: top;
}
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:last-child</span> {
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<ul>
<li>你也许很疑惑为什么无序列表没有项标记或别的默认样式。这是因为这些样式都在我们的样式表中被重置了。如果去查看下重置的样式，就会发现<code>&lt;ul&gt;</code>，<code>&lt;ol&gt;</code>，和<code>&lt;li&gt;</code>元素都设置了<code>margin</code>和<code>padding</code>为<code>0</code>。<code>&lt;ul&gt;</code>和<code>&lt;ol&gt;</code>元素还设置了<code>list-style</code>为<code>none</code>
</li>
<li>我们的菜单栏不是唯一使用列表的地方，我们也将其应用到别的页面中，例如Speakers页面。 下面让我们来给讨论会添加演讲者信息。</li>
<li>在<code>speakers.html</code>文件的引导区块下，添加一个新的区块用来展示我们的演讲者信息。我们可以复用一些现有的样式，使用class属性值为<code>row</code>的<code>&lt;section&gt;</code>元素包裹演讲者信息，可以直接应用到白色背景和内边距。在<code>&lt;section&gt;</code>元素中添加class属性为<code>grid</code>的<code>&lt;div&gt;</code>元素用以集中展示我们的演讲者信息</li>
<li>到此为止，添加的HTML如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;row&quot;>
  <div class=&quot;grid&quot;>

  </div>
</section>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<ul>
<li>在<code>&lt;div&gt;</code>元素中，每个演讲者的信息都有独立的<code>&lt;secion&gt;</code>元素，元素内有两列。第一列由<code>&lt;div&gt;</code>元素标记，占用<code>&lt;section&gt;</code>元素2/3的空间，第二列由<code>&lt;aside&gt;</code>元素标记，占用<code>&lt;section&gt;</code>元素剩余的1/3空间，这里的内容展示演讲者一些次要的或特定的信息。</li>
<li>我们可以使用现有的class <code>col-2-3</code>和<code>col-1-3</code>来设置，完成后代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section id=&quot;shay-howe&quot;>

  <div class=&quot;col-2-3&quot;>
    ...
  </div><!--

  --><aside class=&quot;col-1-3&quot;>
    ...
  </aside>

</section>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shay-howe"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2-3"</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--

  --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1-3"</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<ul>
<li>这里有一些需要注意的点。首先，每个演讲者的<code>&lt;section&gt;</code>元素都有独立的<code>id</code>属性，并用演讲者的名字作为属性值。当我们为讨论会创建日程表，这个id就会被当作锚点链接到演讲者信息。</li>
<li>另外，<code>&lt;div&gt;</code>元素的结束标签和<code>&lt;aside&gt;</code>元素的开始标签之前添加了HTML注释。因为这俩元素的<code>display</code>属性值为<code>inline-block</code>，我们需要清除他们之间的间隙。</li>
<li>在占有2/3空间的<code>&lt;div&gt;</code>元素中，我们会使用标题和段落标签，用来展示演讲者的名字，演讲内容的标题和摘要，以及一小段传记。</li>
<li>以上内容的代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section id=&quot;shay-howe&quot;>

  <div class=&quot;col-2-3&quot;>

    <h2>Shay Howe</h2>
    <h5>Less Is More: How Constraints Cultivate Growth</h5>
    
    <p>By setting constraints, we force ourselves...</p>
    
    <h5>About Shay</h5>

    <p>As a designer and front-end developer, Shay...</p>
  
  </div><!--
  --><aside class=&quot;col-1-3&quot;>
    ...
  </aside>
</section>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shay-howe"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2-3"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Shay Howe<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>Less Is More: How Constraints Cultivate Growth<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>By setting constraints, we force ourselves...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>About Shay<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>As a designer and front-end developer, Shay...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--
  --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1-3"</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<ul>
<li>在占有1/3空间的<code>&lt;aside&gt;</code>元素中，我们将添加一个class为<code>speaker-info</code>的<code>&lt;div&gt;</code>元素。使用<code>&lt;div&gt;</code>元素是因为我们很快会为这个元素添加样式。</li>
<li>在设置样式之前，我们先在这个<code>&lt;div&gt;</code>元素中添加一个无序列表，并在列表项中引用一些跟演讲者相关的链接</li>
<li>目前为止，这部分的HTML代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section id=&quot;shay-howe&quot;>

  <div class=&quot;col-2-3&quot;>

    <h2>Shay Howe</h2>
    <h5>Less Is More: How Constraints Cultivate Growth</h5>

    <p>By setting constraints, we force ourselves...</p>

    <h5>About Shay</h5>

    <p>As a designer and front-end developer, Shay...</p>

  </div><!--

  --><aside class=&quot;col-1-3&quot;>
    <div class=&quot;speaker-info&quot;>

      <ul>
        <li><a href=&quot;https://twitter.com/shayhowe&quot;>@shayhowe</a></li>
        <li><a href=&quot;http://learn.shayhowe.com/&quot;>learn.shayhowe.com</a></li>
      </ul>
    </div>
  </aside>
</section>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shay-howe"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2-3"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Shay Howe<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>Less Is More: How Constraints Cultivate Growth<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>By setting constraints, we force ourselves...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>About Shay<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>As a designer and front-end developer, Shay...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--

  --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1-3"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"speaker-info"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://twitter.com/shayhowe"</span>&gt;</span>@shayhowe<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://learn.shayhowe.com/"</span>&gt;</span>learn.shayhowe.com<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<ul>
<li>class为<code>speaker-info</code>的<code>&lt;div&gt;</code>元素准备完成后，我们为它添加一些样式。</li>
<li>首先我们在<code>main.css</code>文件中分出一个新的Speakers区块用来添加speakers页面的样式。再来我们为属性值为<code>speaker-info</code>的class添加<code>1px</code>的灰色实线外边框和<code>5px</code>的圆角。</li>
<li>接下来，我们添加属性<code>margin-top</code>值为<code>88px</code>，使元素定位在与演讲描述第一段相同的垂直线上，再添加纵向<code>padding</code>为<code>22px</code>给嵌套的无序列表提供空间</li>
<li>最后将此元素内的的文本设置为居中</li>
<li>CSS 完成后代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  ========================================
  Speakers
  ========================================
*/
  
.speaker-info {
  border: 1px solid #dfe2e5;
  border-radius: 5px;
  margin-top: 88px;
  padding: 22px 0;
  text-align: center;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*
  ========================================
  Speakers
  ========================================
*/</span>
  
<span class="hljs-selector-class">.speaker-info</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#dfe2e5</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">88px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">22px</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
</code></pre>
<ul>
<li>让我们花一分钟时间回顾下为什么我们要在这里使用<code>&lt;div&gt;</code>元素并设置相关样式</li>
<li>我们在class为<code>col-1-3</code>的<code>&lt;aside&gt;</code>元素中添加<code>&lt;div&gt;</code>元素是因为我们我们想继承class <code>col-1-3</code>的<code>padding</code>值，使之在<code>&lt;div&gt;</code>元素的边框外展示。之后还会在<code>&lt;div&gt;</code>元素内添加一张图片放在无序列表旁边。因此我们创建了一个<code>&lt;div&gt;</code>元素而非把这些样式直接应用在<code>&lt;ul&gt;</code>元素上。</li>
<li>随着演讲者越来越多，我们需要确认它们之间的纵向间距相等。为此我们创建了一个class <code>speaker</code>，并为其添加下外边距<code>margin-bottom</code>为<code>44px</code>，如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".speaker {
  margin-bottom: 44px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.speaker</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">44px</span>;
}
</code></pre>
<ul><li>我们将这个class添加在每个演讲者的<code>&lt;section&gt;</code>元素上，除却最后一个。我们在最后一个演讲者元素上省略它是因为我们不希望在<code>&lt;footer&gt;</code>元素前生成不必要的边距。多个演讲者的布局如下所示：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;row&quot;>
  <div class=&quot;grid&quot;>

    <section class=&quot;speaker&quot; id=&quot;chris-mills&quot;>

      <div class=&quot;col-2-3&quot;>
        ...
      </div><!--

      --><aside class=&quot;col-1-3&quot;>
        ...
      </aside>

    </section>
    
    <section id=&quot;shay-howe&quot;>
    
      <div class=&quot;col-2-3&quot;>
        ...
      </div><!--
    
      --><aside class=&quot;col-1-3&quot;>
        ...
      </aside>
    
    </section>
    
  </div>
</section>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"speaker"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"chris-mills"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2-3"</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--

      --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1-3"</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shay-howe"</span>&gt;</span>
    
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2-3"</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--
    
      --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1-3"</span>&gt;</span>
        ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<ul><li>此处留意下，第一个演讲者 Chris Mills 的<code>&lt;section&gt;</code>元素添加了class属性值<code>speaker</code>生成了纵向边距，使之与作者 Shay Howe 的<code>&lt;section&gt;</code>元素分开。而最后一个演讲者的<code>&lt;section&gt;</code>元素，还是作者 Shay Howe 的，并没有添加class属性值<code>speaker</code>，使之与<code>&lt;footer&gt;</code>元素之间保持了合适的距离。</li></ul>
<p>到此我们的导航菜单已经完成，演讲者speakers页面也已成形。</p>
<p><span class="img-wrap"><img data-src="/img/bVbi8ey?w=1198&amp;h=1658" src="https://static.alili.tech/img/bVbi8ey?w=1198&amp;h=1658" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader17">演示源代码</h1>
<p>这是练习的源代码。<a href="https://learn.shayhowe.com/practice/creating-lists/index.html" rel="nofollow noreferrer" target="_blank">在线预览</a> 或 <a href="https://learn.shayhowe.com/practice/creating-lists.zip" rel="nofollow noreferrer" target="_blank">点击下载</a></p>
<h1 id="articleHeader18">总结</h1>
<p>列表元素在HTML中使用相当普遍，常用在不是很起眼的地方。使用它们的关键是尽可能语义化地使用它们并放在最合适的位置。</p>
<p>我们来总结一下这节课所学：</p>
<ul>
<li>如何创建无序列表，有序列表和描述列表。</li>
<li>如何正确的在列表中嵌套其他列表</li>
<li>如何改变列表项标记的样式和位置</li>
<li>如何使用背景图代替列表项标记</li>
<li>如何水平显示或浮动列表</li>
</ul>
<p>现在我们学会了如何在页面中添加列表，接下来我们将学习如果在页面中添加媒体，下节课我们将深入学习可嵌入媒体，如图片、音频和视频。</p>
<h1 id="articleHeader19">文章来源</h1>
<p><a href="https://learn.shayhowe.com/html-css/creating-lists/" rel="nofollow noreferrer" target="_blank">https://learn.shayhowe.com/ht...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]HTML&CSS Lesson8: 列表

## 原文链接
[https://segmentfault.com/a/1190000016914005](https://segmentfault.com/a/1190000016914005)

