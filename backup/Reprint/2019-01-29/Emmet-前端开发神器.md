---
title: 'Emmet-前端开发神器' 
date: 2019-01-29 2:30:10
hidden: true
slug: r5b6g4133jh
categories: [reprint]
---

{{< raw >}}

                    
<p>Emmet是一款编辑器插件，支持多种编辑器支持。在前端开发中，Emmet 使用<strong>缩写语法</strong>快速编写 HTML、CSS 以及实现其他的功能，极大的提高前端开发效率。</p>
<p>下载地址<a href="http://emmet.io/download/" rel="nofollow noreferrer" target="_blank">http://emmet.io/download/</a></p>
<h2 id="articleHeader0"><strong>缩写</strong></h2>
<p>Emmet使用特殊的表达式<strong>Abbreviations</strong>，也就是缩写：这种特殊的表达式会被Emmet解析并转义成结构化的代码块。Emmet使用类似CSS选择器的语法来描述元素在DOM树节点的位置和属性。</p>
<p>例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#page>div.logo+ul#navigation>li*5>a{Item $}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">#page</span>&gt;div.logo+ul<span class="hljs-symbol">#navigation</span>&gt;li*<span class="hljs-number">5</span>&gt;a{<span class="hljs-type">Item</span> <span class="hljs-string">$}</span></code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;page&quot;>
    <div class=&quot;logo&quot;></div>
    <ul id=&quot;navigation&quot;>
        <li><a href=&quot;&quot;>Item 1</a></li>
        <li><a href=&quot;&quot;>Item 2</a></li>
        <li><a href=&quot;&quot;>Item 3</a></li>
        <li><a href=&quot;&quot;>Item 4</a></li>
        <li><a href=&quot;&quot;>Item 5</a></li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"navigation"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Item 5<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader1"><strong>HTML元素</strong></h2>
<p>在Emmet中可以使用元素名例如 <strong>div</strong> 或 <strong>p</strong> 生成HTML标签。Emmet没有预设任何标签名，所以可以使用任何可用名称来生成HTML标签：<strong>div → &lt;div&gt;&lt;/div&gt;</strong> 或 <strong>foo → &lt;foo&gt;&lt;/foo&gt;</strong></p>
<h2 id="articleHeader2"><strong>嵌套操作符</strong></h2>
<p>嵌套操作用来生成元素的DOM树中的兄弟节点或子节点</p>
<h4><strong>child：&gt;</strong></h4>
<blockquote><p>使用 <strong>&gt;</strong> 生成元素子节点</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    div>ul>li" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">div</span>&gt;ul&gt;li</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <ul>
        <li></li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;ul&gt;</span>
        <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;/ul&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span></code></pre>
<h4><strong>Sibling: +</strong></h4>
<blockquote><p>使用 <strong> + </strong> 生成元素兄弟节点</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div+p+bq" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">div</span>+p+bq</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<p></p>
<blockquote></blockquote>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;p&gt;</span><span class="hljs-section">&lt;/p&gt;</span>
<span class="hljs-section">&lt;blockquote&gt;</span><span class="hljs-section">&lt;/blockquote&gt;</span></code></pre>
<h4><strong>Climb-up: ^</strong></h4>
<blockquote><p>使用<strong> ^ </strong>在元素父节点生成新的元素节点</p></blockquote>
<p>操作符<strong> ^ </strong>的作用和<strong> &gt; </strong>刚好相反</p>
<p>用<strong> &gt; </strong>可以在子级生成新的节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div+div>p>span+em " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">div</span>+<span class="hljs-keyword">div</span>&gt;p&gt;span+em </code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<div>
    <p><span></span><em></em></p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;p&gt;</span><span class="hljs-section">&lt;span&gt;</span><span class="hljs-section">&lt;/span&gt;</span><span class="hljs-section">&lt;em&gt;</span><span class="hljs-section">&lt;/em&gt;</span><span class="hljs-section">&lt;/p&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span></code></pre>
<p>用<strong> ^ </strong>可以在父级生成新的节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div+div>p>span+em^bq" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">div</span>+<span class="hljs-keyword">div</span>&gt;p&gt;span+em^bq</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;p&gt;</span><span class="hljs-section">&lt;span&gt;</span><span class="hljs-section">&lt;/span&gt;</span><span class="hljs-section">&lt;em&gt;</span><span class="hljs-section">&lt;/em&gt;</span><span class="hljs-section">&lt;/p&gt;</span>
    <span class="hljs-section">&lt;blockquote&gt;</span><span class="hljs-section">&lt;/blockquote&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span></code></pre>
<p>用n个<strong> ^ </strong>，就可以在第n父级生成新的节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div+div>p>span+em^^^bq" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">div</span>+<span class="hljs-keyword">div</span>&gt;p&gt;span+em^^^bq</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;p&gt;</span><span class="hljs-section">&lt;span&gt;</span><span class="hljs-section">&lt;/span&gt;</span><span class="hljs-section">&lt;em&gt;</span><span class="hljs-section">&lt;/em&gt;</span><span class="hljs-section">&lt;/p&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;blockquote&gt;</span><span class="hljs-section">&lt;/blockquote&gt;</span></code></pre>
<h4><strong>Multiplication: * </strong></h4>
<blockquote><p>使用<strong> * </strong>生成多个相同元素</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ul&gt;li*<span class="hljs-number">5</span></code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;ul&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
<span class="hljs-section">&lt;/ul&gt;</span></code></pre>
<h4><strong>Grouping: ()</strong></h4>
<blockquote><p>圆括号<strong> () </strong>是Emmet的高级用法，用来实现比较复杂的DOM结构</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div>(header>ul>li*2>a)+footer>p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">div&gt;<span class="hljs-comment">(header&gt;ul&gt;li*2&gt;a)</span>+footer&gt;p</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <header>
        <ul>
            <li><a href=&quot;&quot;></a></li>
            <li><a href=&quot;&quot;></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>还可以嵌套使用圆括号<strong> () </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(div>dl>(dt+dd)*3)+footer>p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-keyword">div</span>&gt;<span class="hljs-built_in">dl</span>&gt;(<span class="hljs-built_in">dt</span>+<span class="hljs-built_in">dd</span>)*<span class="hljs-number">3</span>)+footer&gt;p</code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;dl&gt;</span>
        <span class="hljs-section">&lt;dt&gt;</span><span class="hljs-section">&lt;/dt&gt;</span>
        <span class="hljs-section">&lt;dd&gt;</span><span class="hljs-section">&lt;/dd&gt;</span>
        <span class="hljs-section">&lt;dt&gt;</span><span class="hljs-section">&lt;/dt&gt;</span>
        <span class="hljs-section">&lt;dd&gt;</span><span class="hljs-section">&lt;/dd&gt;</span>
        <span class="hljs-section">&lt;dt&gt;</span><span class="hljs-section">&lt;/dt&gt;</span>
        <span class="hljs-section">&lt;dd&gt;</span><span class="hljs-section">&lt;/dd&gt;</span>
    <span class="hljs-section">&lt;/dl&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;footer&gt;</span>
    <span class="hljs-section">&lt;p&gt;</span><span class="hljs-section">&lt;/p&gt;</span>
<span class="hljs-section">&lt;/footer&gt;</span></code></pre>
<h2 id="articleHeader3"><strong>属性操作符</strong></h2>
<p>属性操作符用来修改元素的属性</p>
<h4><strong>ID 和 CLASS</strong></h4>
<blockquote><p>Emmet给元素添加ID和CLASS的方法和CSS的语法类似</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div#header+div.page+div#footer.class1.class2.class3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">div#header+<span class="hljs-selector-tag">div</span>.page+div<span class="hljs-selector-id">#footer</span><span class="hljs-selector-class">.class1</span><span class="hljs-selector-class">.class2</span><span class="hljs-selector-class">.class3</span></code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;header&quot;></div>
<div class=&quot;page&quot;></div>
<div id=&quot;footer&quot; class=&quot;class1 class2 class3&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"header"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"page"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"footer"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"class1 class2 class3"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h4><strong>自定义属性</strong></h4>
<blockquote><p>使用<strong>[attr]</strong>标记来添加自定义属性</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="td[title=&quot;Hello world!&quot; colspan=3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">td[title</span>=<span class="hljs-string">"Hello world!"</span> colspan=<span class="hljs-number">3</span>]</code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td title=&quot;Hello world!&quot; colspan=&quot;3&quot;></td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Hello world!"</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<h4><strong>元素编号</strong></h4>
<blockquote><p>使用<strong> $ </strong>操作符可以对重复元素进行有序编号</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li.item$*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">ul&gt;<span class="hljs-selector-tag">li</span>.item$*<span class="hljs-number">5</span></code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li class=&quot;item1&quot;></li>
    <li class=&quot;item2&quot;></li>
    <li class=&quot;item3&quot;></li>
    <li class=&quot;item4&quot;></li>
    <li class=&quot;item5&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item2"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item3"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item4"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item5"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>还可以用多个<strong> $ </strong>定义编号的格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li.item$$$*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">ul&gt;li.item<span class="hljs-variable">$$</span><span class="hljs-variable">$*</span><span class="hljs-number">5</span></code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li class=&quot;item001&quot;></li>
    <li class=&quot;item002&quot;></li>
    <li class=&quot;item003&quot;></li>
    <li class=&quot;item004&quot;></li>
    <li class=&quot;item005&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item001"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item002"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item003"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item004"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item005"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<h4><strong>更灵活的编号方式</strong></h4>
<blockquote><p>使用<strong> @ </strong>修饰符可以改变编号的格式</p></blockquote>
<p>例如：</p>
<p>在<strong> $ </strong>后面添加<strong> @- </strong>可以改变编号顺序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li.item$@-*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">ul&gt;<span class="hljs-selector-tag">li</span>.item$@-*<span class="hljs-number">5</span></code></pre>
<p>会被转义成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li class=&quot;item5&quot;></li>
    <li class=&quot;item4&quot;></li>
    <li class=&quot;item3&quot;></li>
    <li class=&quot;item2&quot;></li>
    <li class=&quot;item1&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item4"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item3"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item2"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item1"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>在<strong> $ </strong>后面添加<strong> <a href="/u/nbinghagengchang">@N</a> </strong>可以改变编号基数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li.item$@3*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ul&gt;li.item$@<span class="hljs-number">3</span>*<span class="hljs-number">5</span></code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li class=&quot;item3&quot;></li>
    <li class=&quot;item4&quot;></li>
    <li class=&quot;item5&quot;></li>
    <li class=&quot;item6&quot;></li>
    <li class=&quot;item7&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item4"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item5"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item6"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item7"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>还可以组合使用上面的修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul>li.item$@-3*5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ul&gt;li.item$@<span class="hljs-number">-3</span>*<span class="hljs-number">5</span></code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li class=&quot;item7&quot;></li>
    <li class=&quot;item6&quot;></li>
    <li class=&quot;item5&quot;></li>
    <li class=&quot;item4&quot;></li>
    <li class=&quot;item3&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item7"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item6"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item5"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item4"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item3"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<h2 id="articleHeader4"><strong>文本操作符</strong></h2>
<p>Emmet使用<strong> Text:{} </strong>给元素添加文本内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a{Click me}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">a{Click <span class="hljs-keyword">me</span>}</code></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;&quot;>Click me</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p><strong>注意：</strong> {text} 在Emmet中是被当成单独的元素来解析的，但当和其他元素结合使用时会有特殊的含义</p>
<p>例如：<br><strong> a{click} </strong> 和<strong> a&gt;{click </strong><br>会输出相同的结果，但<br><strong> a{click}+b{here} </strong>和<strong> a&gt;{click}+b{here} </strong><br>输出的结果则不一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- a{click}+b{here} -->
<a href=&quot;&quot;>click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href=&quot;&quot;>click<b>here</b></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!-- a</span></span><span class="hljs-template-variable">{click}</span><span class="xml"><span class="hljs-comment">+b</span></span><span class="hljs-template-variable">{here}</span><span class="xml"><span class="hljs-comment"> --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>click<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>here<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>

<span class="hljs-comment">&lt;!-- a&gt;</span></span><span class="hljs-template-variable">{click}</span><span class="xml"><span class="hljs-comment">+b</span></span><span class="hljs-template-variable">{here}</span><span class="xml"><span class="hljs-comment"> --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>click<span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>here<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span></code></pre>
<p>在<strong> a&gt;{click}+b{here} </strong>中，<strong> &lt;b&gt; </strong>元素是<strong>&lt;a&gt;</strong>元素的子节点。这个就是区别：当<strong> {text} </strong>直接写在元素后面时，并不会改变父元素的上下文。</p>
<p>下面是一个更复杂的案例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p>{Click }+a{here}+{ to continue}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml">p&gt;</span><span class="hljs-template-variable">{Click }</span><span class="xml">+a</span><span class="hljs-template-variable">{here}</span><span class="xml">+</span><span class="hljs-template-variable">{ to continue}</span></code><span class="xml"></span></pre>
<p>会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>Click <a href=&quot;&quot;>here</a> to continue</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Click <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>here<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> to continue<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>而</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{Click }+a{here}+{ to continue}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml">p</span><span class="hljs-template-variable">{Click }</span><span class="xml">+a</span><span class="hljs-template-variable">{here}</span><span class="xml">+</span><span class="hljs-template-variable">{ to continue}</span></code><span class="xml"></span></pre>
<p>则会被转义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>Click </p>
<a href=&quot;&quot;>here</a> to continue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Click <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>here<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> to continue</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Emmet-前端开发神器

## 原文链接
[https://segmentfault.com/a/1190000007812543](https://segmentfault.com/a/1190000007812543)

