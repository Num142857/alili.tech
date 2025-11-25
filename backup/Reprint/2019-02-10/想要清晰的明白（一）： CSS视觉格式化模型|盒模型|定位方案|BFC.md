---
title: '想要清晰的明白（一）： CSS视觉格式化模型|盒模型|定位方案|BFC' 
date: 2019-02-10 2:30:42
hidden: true
slug: byr6r8kamla
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">视觉格式化模型</h1>
<p>页面(文档树)可以想象成是由一个个的Box组合而成的，而视觉格式化模型(Visual formatting model)是一套规则，将这些框布局成访问者看到的样子。</p>
<h3 id="articleHeader1">哪些因素控制了这些布局</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. 盒的尺寸和类型
    2. 定位体系 Positioning Scheme （常规流，浮动和绝对定位）
    3. 文档树中元素之间的关系
    4. 外部信息（如：视口大小，图片的固有尺寸等）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span> 盒的尺寸和类型
    <span class="hljs-number">2.</span> 定位体系 Positioning Scheme （常规流，浮动和绝对定位）
    <span class="hljs-number">3.</span> 文档树中元素之间的关系
    <span class="hljs-number">4.</span> 外部信息（如：视口大小，图片的固有尺寸等）
</code></pre>
<p>下文讲针对性的解释这些影响布局的因素，先来解释些概念~</p>
<h3 id="articleHeader2">元素框</h3>
<blockquote><p>css假设每个元素都会生成一个或者多个Box，称为元素框，元素框中心有内容区，内容区外周围包括了padding，border，margin，盒模型就是用来处理这些内容的一个模型</p></blockquote>
<h3 id="articleHeader3">包含块</h3>
<blockquote><p>每个元素都是相对于包含块摆放，包含块就是一个元素的“布局上下文”,</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div><p>p的包含块是div</p><div>
    //div的包含块是body
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;body&gt;</span>
    <span class="hljs-params">&lt;div&gt;</span><span class="hljs-params">&lt;p&gt;</span>p的包含块是div<span class="hljs-params">&lt;/p&gt;</span><span class="hljs-params">&lt;div&gt;</span>
    <span class="hljs-comment">//div的包含块是body</span>
<span class="hljs-params">&lt;/body&gt;</span></code></pre>
<h3 id="articleHeader4">替换/非替换元素</h3>
<blockquote><p>替换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容。<br>通过 CSS content 属性来插入的对象 被称作&nbsp;匿名可替换元素<br>如果元素的内容包含在文档之中，则为非替换元素<br>非替换元素的所有规则同样适用于替换元素，只有一个例外，width如果是auto,元素的高宽就是内容的固有高宽，比如img就是图片的原始大</p></blockquote>
<p>例如浏览器会根据<code>&lt;img&gt;</code>标签的<code>src</code>属性的值来读取图片信息并显示出来，查看HTML代码，则看不到图片的实际内容；<code>&lt;input&gt;</code>标签的<code>type</code>属性来决定是显示输入框，还是单选按钮等。HTML中的<code>&lt;img&gt;、&lt;input&gt;、&lt;textarea&gt;、&lt;select&gt;、&lt;object&gt;</code>都是替换元素。<br>这些元素往往没有实际的内容，即是一个空元素,例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=”cat.jpg” />
<input type=&quot;submit&quot; name=&quot;Submit&quot; value=&quot;提交&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">img</span> src=”cat.jpg” /&gt;
&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"submit"</span> name=<span class="hljs-string">"Submit"</span> value=<span class="hljs-string">"提交"</span> /&gt;
</code></pre>
<p>浏览器会根据元素的标签类型和属性来显示这些元素。可替换元素也在其显示中生成了框。</p>
<h1 id="articleHeader5">CSS Box(盒模型/框模型)</h1>
<blockquote><p>CSS 框模型 (Box Model) 规定了元素框处理元素内容、内边距、边框 和 外边距 的方式，我们常见的盒模型大致有两种，一种是块级的盒子（Block Box），一种是行级的盒子（Line Box）</p></blockquote>
<p>详细盒子的规则见下篇<a href="https://segmentfault.com/a/1190000005155084">想要清晰的明白（二）CSS 盒模型Block box与Line box</a>，但是我们至少可以知道盒子模型，在整个视觉模型中做到的是一个什么角色，盒子模型是处理盒子本身内部属性，像比如边距，边框的，而视觉格式化模型是来处理这些盒子摆放的</p>
<h3 id="articleHeader6">Block Box</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display ： block 、 list-item 以及 table 会让一个元素成为块级元素。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">display </span>： <span class="hljs-string">block </span>、 <span class="hljs-built_in">list-item</span> 以及 <span class="hljs-string">table </span>会让一个元素成为块级元素。
</code></pre>
<h3 id="articleHeader7">Line Box</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="每一行称为一条Line Box，它又是由这一行的许多inline-box组成
display：inline会让一个元素称为行内元素
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>每一行称为一条Line Box，它又是由这一行的许多inline-box组成
<span class="hljs-attribute">display</span>：inline会让一个元素称为行内元素
</code></pre>
<h3 id="articleHeader8">inline-block</h3>
<blockquote><p>将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。</p></blockquote>
<h1 id="articleHeader9">Formatting context</h1>
<blockquote><p>每个元素，或者说每个Box会根据设置的display值，去选择渲染它的方式，不同的display有不同层级：block-level box（块级）inline-level box(行级)，run-in box(插入型框 css3)，不同的层级会参与不同的环境（formatting context）去渲染</p></blockquote>
<p>上文提到的环境就是这个Formatting context（格式化上下文），他是一个有渲染规则的渲染区域，不同的层级有不同的渲染规则，比如BFC和IFC</p>
<h1 id="articleHeader10">BFC</h1>
<h3 id="articleHeader11">什么是BFC</h3>
<p>块级格式化上下文，Block formatting context(简称BFC)，规定了块级盒子的渲染布局方式，他在计算盒子高度，margin值计算等地方有区别于其他环境。<br><span class="img-wrap"><img data-src="/img/bVvB1q?w=850&amp;h=351" src="https://static.alili.tech/img/bVvB1q?w=850&amp;h=351" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">BFC有什么特点</h3>
<blockquote><ol>
<li><p>内部盒子会在垂直方向排列</p></li>
<li><p>同一个BFC中的元素可能会发生margin collapse；</p></li>
<li><p>BFC就是页面上的一个隔离的独立容器，里外互相不影响</p></li>
<li><p>计算BFC的高度时，考虑BFC所包含的所有子元素，连浮动元素也参与计算；</p></li>
<li><p>当元素不是BFC的子元素的时候，浮动元素高度不参与BFC计算（既是常见的盒子塌陷问题）</p></li>
</ol></blockquote>
<h3 id="articleHeader13">什么元素会触发产生一个新的BFC</h3>
<blockquote><ol>
<li><p>根元素 &lt;html&gt;</p></li>
<li><p>float属性不为none</p></li>
<li><p>position为absolute或fixed</p></li>
<li><p>display为inline-block, table-cell, table-caption, flex, inline-flex</p></li>
<li><p>overflow不为visible</p></li>
</ol></blockquote>
<h3 id="articleHeader14">再认真理解下这张图</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
html{background-color: #009a61}
.a{
  width: 100%;
  height: 80px;
  background-color: #f3f3f3;
  margin-bottom: 30px;
}
.b{
  width: 100%;
  background-color: #f3f3f3;
  height:40px;
  margin-bottom: 80px;

}
.c{
  float: left;
  width: 80%;
  height: 80px;
  background-color: #333333;
}
.d{
  margin-top: 80px;
  width: 100%;
  background-color: #f3f3f3;
  overflow: hidden;
}
</style>
<body >
    <div class=&quot;a&quot;></div>
    <div class=&quot;b&quot;>
        <div class=&quot;c&quot;> </div>
    </div>
  <div class=&quot;d&quot;>
      <div class=&quot;c&quot;></div>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#009a61</span>}
<span class="hljs-selector-class">.a</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f3f3f3</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.b</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f3f3f3</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">80px</span>;

}
<span class="hljs-selector-class">.c</span>{
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333333</span>;
}
<span class="hljs-selector-class">.d</span>{
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f3f3f3</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"b"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"d"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvB1q?w=850&amp;h=351" src="https://static.alili.tech/img/bVvB1q?w=850&amp;h=351" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVvB1p?w=737&amp;h=289" src="https://static.alili.tech/img/bVvB1p?w=737&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">我们可以用BFC来干嘛</h3>
<ol>
<li><p>清除浮动</p></li>
<li><p>阻止边距折叠</p></li>
<li><p>用于布局，什么两栏自适应高度之类的</p></li>
</ol>
<h3 id="articleHeader16">BFC兼容性</h3>
<p>IE6-7不支持BFC，而是使用私有属性hasLayout。表现上来看hasLayout和BFC相似，触发hasLayout条件与BFC相似，另外需要为元素设置IE特有的CSS属性zoom:1; zoom用于设置或检索元素的缩放比例，值为1即使用元素实际尺寸，使用zoom既可以触发hasLayout又不会对元素产生其他影响，相对来说更加方便</p>
<h1 id="articleHeader17">CSS定位方案</h1>
<blockquote><p>css布局宏观上来说是受定位方案影响，定位方案包括普通流，浮动，定位</p></blockquote>
<h3 id="articleHeader18">普通流</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="元素按照其在 HTML 中的位置顺序决定排布的过程。并且这种过程遵循标准的描述
只要不是float和绝对定位方式布局的，都在普通流里面。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>元素按照其在 HTML 中的位置顺序决定排布的过程。并且这种过程遵循标准的描述
只要不是<span class="hljs-keyword">float</span>和绝对定位方式布局的，都在普通流里面。</code></pre>
<h3 id="articleHeader19">浮动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="浮动框不在文档的普通流中，浮动的流会漂浮在普通的流上面。
浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>浮动框不在文档的普通流中，浮动的流会漂浮在普通的流上面。
浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。</code></pre>
<h3 id="articleHeader20">定位</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. 相对定位在普通流之中，是相对于它在普通流中的位置中进行移动，元素占据原来位置
 2. 绝对定位脱离普通流，不占据空间相对于距离它最近的那个已定位的祖先(相对/绝对)元素决定的。
 3. 固定定位，相对于浏览器窗口定位，脱离普通流，不占据空间
 
 剩下的下篇见！！！(*￣3￣)╭
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> 相对定位在普通流之中，是相对于它在普通流中的位置中进行移动，元素占据原来位置
 <span class="hljs-number">2.</span> 绝对定位脱离普通流，不占据空间相对于距离它最近的那个已定位的祖先(相对/绝对)元素决定的。
 <span class="hljs-number">3.</span> 固定定位，相对于浏览器窗口定位，脱离普通流，不占据空间
 
 剩下的下篇见！！！(*￣<span class="hljs-number">3</span>￣)╭
</code></pre>
<h1 id="articleHeader21">参考资料</h1>
<ol>
<li><p><a href="http://www.caopeng.net/2011/02/what-is-the-normal-flow-of-css-standard-streams/" rel="nofollow noreferrer" target="_blank">caopen.net</a></p></li>
<li><p><a href="http://blog.csdn.net/chelen_jak/article/details/41961087" rel="nofollow noreferrer" target="_blank">CSS三种基本定位机制</a></p></li>
<li><p><a href="http://www.html-js.com/article/1866" rel="nofollow noreferrer" target="_blank">css之BFC详解</a></p></li>
<li><p><a href="http://ued.taobao.org/blog/2012/08/inline-block/" rel="nofollow noreferrer" target="_blank">inline-boxd的前世今生</a></p></li>
<li><p>《<a href="http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/" rel="nofollow noreferrer" target="_blank">CSS.The.Definitive.Guide</a>》</p></li>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/" rel="nofollow noreferrer" target="_blank">CSS float浮动的深入研究、详解及拓展</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
想要清晰的明白（一）： CSS视觉格式化模型|盒模型|定位方案|BFC

## 原文链接
[https://segmentfault.com/a/1190000005116275](https://segmentfault.com/a/1190000005116275)

