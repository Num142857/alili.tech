---
title: '解剖CSS布局原理' 
date: 2019-01-16 2:30:08
hidden: true
slug: mxhzauc5mcj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本文将带你重新认识CSS布局，带你解剖布局原理，前提是你要有基础！本文将解除你在布局方面的疑惑。认识每个布局元素，了解他们的特性，你才知道为什么会是这样的结果。本文内容纯属个人理解，不代表官方。</p>
<p>此文主要为理论部分，实际例子可以看我另外一篇文章 <a href="https://segmentfault.com/a/1190000012257390">PC端CSS布局汇总</a></p>
<h1 id="articleHeader1">学习CSS布局前你需要了解这些</h1>
<p>首先了解下盒子模型</p>
<p><span class="img-wrap"><img data-src="/img/bVMotQ?w=191&amp;h=206" src="https://static.alili.tech/img/bVMotQ?w=191&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图是一个盒子模型，每个html标签都会转化成一个盒子模型，每个盒子都有自己的<code>position</code>、<code>margin</code>、<code>border</code>、<code>padding</code>、<code>width</code>、<code>height</code>，这些属性决定着盒子的大小和位置。盒子的大小由<code>border</code>、<code>padding</code>、<code>width</code>、<code>height</code>共同决定。盒子的位置是我们接下来要探讨的问题。</p>
<p>浏览器审查元素都能看到每一个标签的盒子模型。看盒子模型有些要注意的</p>
<ul>
<li>图中的数值都是<code>px</code>单位的，其他单位都会换算成<code>px</code>。填横线<code>-</code>的表示默认值，有可能是<code>0</code>，也有可能是<code>auto</code>；</li>
<li>图中的蓝色区域<code>820 x 26</code>表示<code>宽度 x 高度</code>，是最终计算出来的实际宽高，而<code>不是css里设置的width和height</code>。如果设置了<code>box-sizing:border-box</code>，系统会自动减去<code>padding</code>和<code>border</code>的大小，计算后的显示在蓝色区域，这个区域是实际可用空间。</li>
<li>图中的<code>position</code>表示<code>top</code>、<code>bottom</code>、<code>left</code>、<code>right</code>的值，定位元素才有这项。</li>
</ul>
<p>html的标签结构是属于树形结构，转化成盒子模型就变成一个套一个，最外层是<code>document</code>，再往里一层是<code>&lt;html&gt;</code>，<code>&lt;html&gt;</code>里面放置两个盒子<code>head</code>和<code>body</code>，以此类推。CSS布局就是在探究盒子在父容器（上一级盒子）里的放置位置。</p>
<p>盒子的放置位置与盒子大小、盒子之间的间距有关，也就是盒子模型上的那几个属性有关。每种标签对盒子模型的处理方式有些差异，我把这些盒子归为这几类：内联元素、块级元素、内联块元素、表格元素、弹性盒子元素、浮动元素、定位元素。这些元素我统称他们为布局元素。</p>
<p>盒子的放置位置还与盒子的排列方式有关，是从左到右排呢？还是从右到左排呢？是否允许重叠？盒子的排列方式就是所谓的文档流，文档流一般分为三种：常规文档流、BFC、脱离文档流。</p>
<p>以下将对布局元素和文档流进行详细讲解。</p>
<h1 id="articleHeader2">布局元素</h1>
<p>CSS把这些布局元素分为三大类，分别用<code>display</code>、<code>float</code>、<code>position</code>来声明。其中<code>display</code>用来声明：内联元素、块级元素、内联块元素、表格元素、弹性盒子元素。<code>float</code>用来声明浮动元素。<code>position</code>用来声明定位元素。这三大类可以混合使用，其中<code>display</code>为必须项，你不设置它也有默认值。</p>
<h2 id="articleHeader3">1. 内联（行内）元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: inline;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>;
</code></pre>
<p>宽高大小由子元素决定，不能手动修改宽高，子元素一般放置文本元素，与其他内联元素并排在同一行</p>
<p><span class="img-wrap"><img data-src="/img/bVLZCM?w=243&amp;h=96" src="https://static.alili.tech/img/bVLZCM?w=243&amp;h=96" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>内联元素不能改变宽高，导致有些属性无效，比如：<code>width</code>系列、<code>height</code>系列、<code>margin-top</code>、<code>margin-bottom</code>、<code>padding-top</code>、<code>padding-bottom</code>、<code>line-height</code>。</p>
<p>常用的内联标签：<code>&lt;span&gt;</code>、<code>&lt;img&gt;</code>、<code>&lt;em&gt;</code>、<code>&lt;strong&gt;</code>、<code>&lt;i&gt;</code></p>
<p>使用内联元素你可能会遇到这种情况，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <span style=&quot;background: #ccf&quot;>内联元素</span>
    <span style=&quot;background: #fcc&quot;>内联元素</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #ccf"</span>&gt;</span>内联元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #fcc"</span>&gt;</span>内联元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLZH9?w=200&amp;h=84" src="https://static.alili.tech/img/bVLZH9?w=200&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>内联元素之间有空白区域</p>
<p>空白区域的形成是因为<code>&lt;span&gt;</code>之间有回车，在html中，空格、制表符、回车都属于空白符，多个空白符都会视为一个空格，空格的大小由父级<code>&lt;div&gt;</code>的<code>font-size</code>决定。<br><code>注意：只有内联(内联块)与内联(内联块)之间的空白符才会形成一个空格，文本元素(除空白符)也是属于内联元素。</code></p>
<p>解决空白区域的方案有以下四种</p>
<ul>
<li>给<code>&lt;div&gt;</code>设置<code>font-size: 0;</code>，在<code>&lt;span&gt;</code>上把<code>font-size</code>设置回去</li>
<li>将空白符注释掉</li>
<li>把span排列在同一行，并紧贴在一起</li>
<li>使用浮动<code>float</code>，有些场合不允许使用浮动，这条就不适用</li>
</ul>
<h2 id="articleHeader4">2. 块级(区块)元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: block;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">display</span>: <span class="hljs-built_in">block</span>;
</code></pre>
<p>默认高度等于子元素高度，宽充满父级元素，块级元素之间纵向排列</p>
<p><span class="img-wrap"><img data-src="/img/bVL1Mf?w=280&amp;h=107" src="https://static.alili.tech/img/bVL1Mf?w=280&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>常用的块级标签：<code>&lt;div&gt;</code>、<code>&lt;h1&gt; to &lt;h6&gt;</code>、<code>&lt;p&gt;</code>、<code>&lt;ul&gt; ~ &lt;li&gt;</code>、<code>&lt;dl&gt; ~ &lt;dt&gt; &lt;dd&gt;</code></p>
<p>块级元素之间如果不浮动或定位，永远是纵向排列，不管宽度多少。</p>
<p>块级元素宽高默认为<code>auto</code>,有自适应伸缩的特性。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;float: left; background: #ccf&quot;>浮动元素</div>
<div style=&quot;height: 40px; background: #fcc&quot;>块级元素</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"float: left; background: #ccf"</span>&gt;浮动元素&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"height: 40px; background: #fcc"</span>&gt;块级元素&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVL5xi?w=351&amp;h=89" src="https://static.alili.tech/img/bVL5xi?w=351&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>块级元素的文档流不被破坏的情况下，宽度为<code>auto</code>时会永远充满容器宽度，遇到有东西挡住，文本流会自动往后移，但实际区域没变，只是被遮住了。可以借助这个特性做图文排版，或者做自适应宽度布局。<code>注意：块级元素一旦脱离的文档流，这个特性将会失效</code></p>
<p>块级元素还有另一大特性，文档流不被破坏的情况下，外边距<code>margin</code>会自动填充横向剩余部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;width: 80px; height: 40px; background: #fcc&quot;>块级元素</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 80px; height: 40px; background: #fcc"</span>&gt;</span>块级元素<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMheJ?w=331&amp;h=115" src="https://static.alili.tech/img/bVMheJ?w=331&amp;h=115" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>橙色部分表示<code>margin</code>，<code>margin</code>默认是<code>0</code>，却能充满剩余部分，这就解释了为什么块级元素永远是纵向排列。如果<code>margin</code>的值设置为<code>auto</code>，它就会左右平分掉，形成了区块横向居中的现象。</p>
<p>块级元素处理盒子模型较为灵活，通常优先使用块级元素布局，块级元素无法实现的情况才采用其他元素布局，它擅长于处理自身与父元素和兄弟元素之间的布局，不擅长对子元素布局</p>
<h2 id="articleHeader5">3. 内联块元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
display: inline-block;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>
<span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
</code></pre>
<p>与内联元素一样，默认宽高由子元素决定，但它可以设置宽高、边距。内联块之间横向排列</p>
<p><span class="img-wrap"><img data-src="/img/bVL2k7?w=370&amp;h=121" src="https://static.alili.tech/img/bVL2k7?w=370&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>内联块元素是内联元素与块级元素的结合体，拥有内联元素的特和块级元素的灵活性，但它没有块级元素的特性。它也会有元素间出现空白区域的问题，解决方案一样。</p>
<p>内联块元素有自己的一大特性，就是它可以将自身(包括子元素)当成一个文本元素去操作，像操作文本一样去操作一块区域，如下例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;box&quot;></div>
    <div class=&quot;box&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    width: 400px;
    height: 80px;
    font-size: 0;            /* 防止空白区域 */
    text-align: center;
    text-indent: -40px;      /* 文本缩进 */
    letter-spacing: 30px;    /* 文字之间的间距 */
    background: #ccc;
}
.box {
    display: inline-block;
    width: 100px;
    height: 80px;
    background: #fcc;
    font-size: 16px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;            <span class="hljs-comment">/* 防止空白区域 */</span>
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">40px</span>;      <span class="hljs-comment">/* 文本缩进 */</span>
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">30px</span>;    <span class="hljs-comment">/* 文字之间的间距 */</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVL3Fq?w=473&amp;h=157" src="https://static.alili.tech/img/bVL3Fq?w=473&amp;h=157" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>给文本设置居中，设置文本向左缩进40px，文字间距30px。这些都是对文字的设置，但内联块却生效了，两个内联块被看成两个单词，所以间距才会生效。</p>
<p>有了这个特性，就能完成一些很细微的布局操作，在实际开发中也是挺常用的，通常被当成一个容器结合其他元素一起使用。</p>
<h2 id="articleHeader6">4. 表格元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: table;      /*对应<table>*/
display: table-cell; /*对应<td>*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">table</span>;      <span class="hljs-comment">/*对应&lt;table&gt;*/</span>
<span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">table-cell</span>; <span class="hljs-comment">/*对应&lt;td&gt;*/</span></code></pre>
<p>与标签<code>&lt;table&gt;</code>系列一样，<code>&lt;tr&gt;</code>的宽度会充满<code>&lt;table&gt;</code>,而<code>&lt;td&gt;</code>宽度会平分<code>&lt;tr&gt;</code>，<code>&lt;td&gt;</code>内容超出宽度默认会撑开。当然你也可以设置让它不撑开。</p>
<p>使用CSS定义可以将普通的标签变成表格元素，<code>tr</code>不能设置<code>width</code>，所以一般不使用<code>tr</code>，也就是CSS中的<code>table-row</code>，所以通常使用<code>table</code>和<code>td</code>，不需要<code>tr</code>，<code>td</code>也是可以平分<code>table</code>宽度的，结构关系一定要是父子关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='parent'>
    <div class=&quot;child child1&quot;>1111</div>
    <div class=&quot;child child2&quot;>2222</div>
    <div class=&quot;child child3&quot;>3333</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'parent'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child1"</span>&gt;</span>1111<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child2"</span>&gt;</span>2222<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child3"</span>&gt;</span>3333<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display: table;
    width: 200px;
    height: 40px;
    background: #ccc;
}
.child {
    display: table-cell;
}
.child1 { background: #0cc; }
.child2 { background: #c0c; }
.child3 { background: #cc0; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.child1</span> { <span class="hljs-attribute">background</span>: <span class="hljs-number">#0cc</span>; }
<span class="hljs-selector-class">.child2</span> { <span class="hljs-attribute">background</span>: <span class="hljs-number">#c0c</span>; }
<span class="hljs-selector-class">.child3</span> { <span class="hljs-attribute">background</span>: <span class="hljs-number">#cc0</span>; }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMhg5?w=297&amp;h=117" src="https://static.alili.tech/img/bVMhg5?w=297&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>子元素并没有设置宽高，却能填充高度，平分宽度，这就是表格元素的一大特性。用过table布局的人应该都清楚，如果<code>td</code>内容太多，宽度会自动撑开，占用周围的<code>td</code>宽度，<code>table-cell</code>也一样，不过不想让它自动撑开，就在<code>table</code>层设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="table-layout: fixed;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs capnproto"><code>table-layout: <span class="hljs-keyword">fixed</span>;
</code></pre>
<p>表格元素比较擅长于做居中布局，因为<code>table-cell</code>元素支持<code>vertical-align</code>和<code>text-align</code>这两个属性，对子元素进行横向纵向居中，把子类设置为<code>inline-block</code>就可以区域居中，而且不需要知道子类宽高。</p>
<p>表格元素也可以让自身横向居中，设置方式跟块级元素一样，设置<code>margin: 0 auto</code>，不同的是表格元素不需要知道宽度。</p>
<h2 id="articleHeader7">5. 弹性盒子元素</h2>
<p>弹性盒子是CSS3引入布局方式，它将更加有效的对一个容器中的元素进行排列、对齐和分配空白空间。本文章的讲解不涉及弹性盒子元素，因为其他布局能做的，弹性盒子元素绝大部分都能做，只是兼容性较差，不适用于PC端，有人已经做了详细讲解，推荐看这篇文章 <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">阮一峰Flex布局教程</a></p>
<h2 id="articleHeader8">6. 浮动元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="float: none;   /* 取消浮动 */
float: left;   /* 左浮动 */
float: right;  /* 右浮动 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">float</span>: <span class="hljs-selector-tag">none</span>;   <span class="hljs-comment">/* 取消浮动 */</span>
<span class="hljs-selector-tag">float</span>: <span class="hljs-selector-tag">left</span>;   <span class="hljs-comment">/* 左浮动 */</span>
<span class="hljs-selector-tag">float</span>: <span class="hljs-selector-tag">right</span>;  <span class="hljs-comment">/* 右浮动 */</span></code></pre>
<p><code>float</code>不为<code>none</code>的属于浮动元素</p>
<p>浮动元素强制让元素向左或向右贴近，如果同一个方向有多个元素，则会横向排列，并紧贴在一起，若空间不够，则会换行，如下图所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVMjtF?w=416&amp;h=120" src="https://static.alili.tech/img/bVMjtF?w=416&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVMlff?w=416&amp;h=120" src="https://static.alili.tech/img/bVMlff?w=416&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVMlfm?w=416&amp;h=140" src="https://static.alili.tech/img/bVMlfm?w=416&amp;h=140" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>浮动元素会让元素脱离文档流，其他元素将无视浮动元素，把浮动元素的位置给占了，如下例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child child1&quot;>浮动元素</div>    
    <div class=&quot;child child2&quot;>浮动元素</div>
</div>
<div class=&quot;box&quot;>块级元素</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child1"</span>&gt;</span>浮动元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child2"</span>&gt;</span>浮动元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>块级元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child{
    float: left;
    width: 100px;
    height: 40px;
}
.child1 {background: #fcc;}
.child2 {background: #ccf;}

.box{
    height: 60px;
    background: #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.child1</span> {<span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;}
<span class="hljs-selector-class">.child2</span> {<span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;}

<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMjyK?w=381&amp;h=104" src="https://static.alili.tech/img/bVMjyK?w=381&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>脱离文档流的元素的层级会比较高，会叠在上面。</p>
<p>浮动元素脱离文档脱离的不够彻底，属于部分脱离，可以将它拉回文档流，让<code>.box</code>位于<code>.child</code>下面。有两种方式：</p>
<p>第一种是使用清除浮动<code>clear</code>，有的人可能会在<code>.box</code>上写<code>clear: both</code>来清除浮动，这样是可以达到效果，但会引起一个问题，<code>margin-top</code>无效。应该在<code>.box</code>之前插入一个空元素，使用一个空元素专门用来清除浮动，这个空元素可以使用CSS伪元素代替。所以清除浮动的代码应该是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent:after {
    content: '';
    display: table;
    clear: both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">clear</span>: both;
}</code></pre>
<p>第二种方式是将浮动元素的父元素转化为BFC，BFC是什么后面会讲解，现在先看看实现代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>一般使用最多的是第一种，因为在空元素设置不会受到任何影响。在PC端清除浮动较为常用，一般会把清除浮动的代码放在<code>.clearfix</code>上，页面上需要清除浮动再使用这个<code>class</code>，或者<code>sass</code>继承。</p>
<p>浮动元素在PC端非常受欢迎，它可以将块级元素横向排列。书写简单，只要一个<code>float: left</code>就好</p>
<p>浮动元素最大的特点是它可以让一个元素单独居左或居右，而不影响其他元素。而且还能保持文档流，这是其他元素做不到的。</p>
<h2 id="articleHeader9">7. 定位元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position: static;    /* 取消定位 */
position: relative;  /* 相对定位 */
position: absolute;  /* 绝对定位 */
position: fixed;     /* 固定定位 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">static</span>;    <span class="hljs-comment">/* 取消定位 */</span>
<span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">relative</span>;  <span class="hljs-comment">/* 相对定位 */</span>
<span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">absolute</span>;  <span class="hljs-comment">/* 绝对定位 */</span>
<span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">fixed</span>;     <span class="hljs-comment">/* 固定定位 */</span></code></pre>
<p><code>position</code>不为<code>static</code>的属于定位元素。定位元素分为三种：相对定位、绝对定位、固定定位。三种都有<code>top</code>、<code>bottom</code>、<code>left</code>、<code>right</code>、<code>z-index</code>属性，都是基于某个参照物进行定位，不同的是定位参照物不同和文档流不同，以下是各自的特点和用法。</p>
<p>相对定位属于常规文档流的，与块级元素一样的排列，它的定位参照物是自身，设置<code>left</code>就会向右移，设置<code>bottom</code>会向上移，<code>right</code>和<code>top</code>同理，它不像<code>margin</code>，它位移只对自身有影响，不会影响其他元素，所以可能会导致覆盖其他元素的现象。相对定位可以用来设置定位参照物，方便绝对定位操作。</p>
<p>绝对定位是脱离文档流的，而且脱离得很彻底，跟浮动元素不一样，它无法拉回文档流，它也属于BFC。它的定位参照物不固定，如果父元素是个定位元素，就优先使用父元素作为定位参照物，不是定位元素就往上一级找，直到检测到定位元素，如果到达<code>&lt;html&gt;</code>还是没有，就以浏览器第一视口作为定位参照物。</p>
<p><span class="img-wrap"><img data-src="/img/bVMk90?w=1162&amp;h=666" src="https://static.alili.tech/img/bVMk90?w=1162&amp;h=666" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>浏览器视口指蓝色区域区域，浏览器第一视口指滚动条置顶状态下的视口。</p>
<p>固定定位跟绝对定位一样，唯一的差别是固定定位的定位参照物固定是浏览器视口。</p>
<p>绝对定位和固定定位有个特性，设置<code>left</code>和<code>right</code>，会锁定这两点之间的空间。如果没设置<code>width</code>或<code>width: auto</code>，就会填充这个空间。如果设置了<code>width</code>，<code>margin</code>为<code>auto</code>就会生效，会在锁定空间内居中。这个特性在纵向的<code>height</code>、<code>top</code>、<code>bottom</code>会有同样的效果。</p>
<h1 id="articleHeader10">文档流</h1>
<h2 id="articleHeader11">常规文档流</h2>
<p>从左到右一个一个盒子以指定间距排列，排不下就跳到下一行继续排列。此文档流的特性将在BFC进行对比详解。</p>
<h2 id="articleHeader12">BFC</h2>
<p>BFC全称<strong>块级格式化上下文</strong>(Block Formatting Context)，属于常规文档流的改进版，在此文档流下的盒子将是一个独立的盒子，什么意思？难道常规文档流还能共享盒子不成？还真是了。其实我们用的最多的是BFC，如果你不了解BFC，实际开发中可能会一不小心用了常规文档流，出现了某些的现象会觉得是bug，其实那是文档流的特性。接下来列举几个常规文档流现象：</p>
<p>1. <strong>边距折叠</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box1&quot;>box1</div>
<div class=&quot;box2&quot;>box2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span>box1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span>box2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box1 {
    height: 60px;
    background: #fcc;
    margin-bottom: 10px;
}
.box2 {
    height: 60px;
    background: #ccf;
    margin-top: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box1</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.box2</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMqWZ?w=365&amp;h=175" src="https://static.alili.tech/img/bVMqWZ?w=365&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>大多时候，我们要的是<code>30px</code>的间距，但实际却是<code>20px</code>，那是因为边距被折叠了，只会取最大的边距。这种的情况解决方案是把他们放在不同的BFC内，这个这样改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrap&quot;>
    <div class=&quot;box1&quot;>box1</div>
</div>
<div class=&quot;box2&quot;>box2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span>box1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span>box2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap {
    overflow: hidden;
}
.box1 {
    height: 60px;
    background: #fcc;
    margin-bottom: 10px;
}
.box2 {
    height: 60px;
    background: #ccf;
    margin-top: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrap</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.box1</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.box2</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>BFC是独立的盒子，自身的<code>margin</code>不会与其他盒子融合，所以外边距只会叠加，不会折叠。</p>
<p>2. <strong>边距侧漏</strong></p>
<p>常规文档流里的块级元素会有这样的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;box&quot;>box</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>box<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    height: 60px;
    background: #ccf;
}
.box {
    margin-top: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
}
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>这段代码应该是把文字把往下移20像素，结果应该是这样的<br><span class="img-wrap"><img data-src="/img/bVMruR?w=302&amp;h=120" src="https://static.alili.tech/img/bVMruR?w=302&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然而并不是，其实结果是这样<br><span class="img-wrap"><img data-src="/img/bVMruH?w=300&amp;h=120" src="https://static.alili.tech/img/bVMruH?w=300&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>块级元素的第一个子元素的<code>margin-top</code>会穿过父元素的屏障，漏出去了，变成是父元素的<code>margin-top</code>。你可能会想到给父元素加一层屏障，设置<code>border-top</code>，但这样会无故多出一个边框的空间。最好的方式是把父元素转化为BFC，这样这样改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    height: 60px;
    background: #ccf;
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>BFC内部元素怎么折腾怎么改都不会影响父容器。</p>
<p>BFC除了纠正常规文档流的问题外，还有一些对浮动元素的纠正。</p>
<p>3. <strong>清除浮动</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child child1&quot;>浮动元素</div>    
    <div class=&quot;child child2&quot;>浮动元素</div>
</div>
<div class=&quot;box&quot;>块级元素</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child1"</span>&gt;</span>浮动元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child child2"</span>&gt;</span>浮动元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>块级元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child{
    float: left;
    width: 100px;
    height: 40px;
}
.child1 {background: #fcc;}
.child2 {background: #ccf;}

.box{
    height: 60px;
    background: #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.child1</span> {<span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;}
<span class="hljs-selector-class">.child2</span> {<span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;}

<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
}</code></pre>
<p>还是拿之前浮动元素的例子来讲，当时没讲为什么BFC可以清除浮动，现在来讲下原理。细心的同学应该可以发现，<code>.child</code>有设置宽高，可身为父元素的<code>.parent</code>却没有高度，所以才导致<code>.box</code>无视浮动元素占了它的位置。如果<code>.parent</code>能得到子元素的高度就符合了常规文档流，就达到清除浮动浮动的效果。给<code>.parent</code>设置为BFC就能做到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>因为BFC的子元素怎么变化都不会影响父容器，子元素做了浮动，那是子元素的事，你所占有的宽高还是会把父容器撑开。</p>
<p>4. <strong>防止文字环绕</strong></p>
<p>有些场合并不想让它文字环绕，如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;float&quot;></div>
<div class=&quot;text&quot;>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"float"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".float {
    width: 50px;
    height: 50px;
    float: left;
    background: #fcc;
}
.text {
    height: 100px;
    background: #ccf;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.float</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
}
<span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMrVc?w=316&amp;h=130" src="https://static.alili.tech/img/bVMrVc?w=316&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>把<code>.text</code>设置为BFC可以防止文字环绕</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    height: 100px;
    background: #ccf;
    overfloat: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccf</span>;
    <span class="hljs-attribute">overfloat</span>: hidden;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMrVY?w=316&amp;h=130" src="https://static.alili.tech/img/bVMrVY?w=316&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>以上是BFC常见的运用场合，可能有些人没遇到这些场合，因为你们正无形中在使用BFC，上面的例子都是用<code>overflow:hidden</code>设置BFC，其实设置方式有很多，满足以下条件的任何一条都是BFC</p>
<ul>
<li>
<code>float</code>不为<code>none</code>
</li>
<li>
<code>position</code> 的值不为 <code>static</code> 或者 <code>relative</code>
</li>
<li>
<code>display</code> 的值为 <code>table-cell</code> , <code>table-caption</code> , <code>inline-block</code> , <code>flex</code> , 或者 <code>inline-flex</code> 中的其中一个</li>
<li>
<code>overflow</code> 的值不为 <code>visible</code>
</li>
</ul>
<p>除了BFC外其他都是常规文档流。</p>
<h2 id="articleHeader13">脱离文档流</h2>
<p>脱离文档流是基于BFC进行改造去除一些常规文档流的东西。脱离文档流又分为两种：部分脱离和完全脱离。</p>
<p>部分脱离是对常规文档流的排列顺序进行改造，不再只是从左到右排列，还可以从右到左，也可以一左一右，为了不影响常规文档流的排列，默认会脱离文档流，但还是会受父容器束缚。属于部分分离的是<code>float:left</code>和<code>float:right</code>。</p>
<p>完全脱离是完全放弃常规文档流，不受任何束缚，根据<code>left</code>、<code>right</code>、<code>top</code>、<code>bottom</code>去定位。属于完全脱离的是<code>position:absolute</code>和<code>position:fixed</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解剖CSS布局原理

## 原文链接
[https://segmentfault.com/a/1190000009139500](https://segmentfault.com/a/1190000009139500)

