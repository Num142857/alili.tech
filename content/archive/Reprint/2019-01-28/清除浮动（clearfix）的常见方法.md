---
title: '清除浮动（clearfix）的常见方法' 
date: 2019-01-28 2:30:09
hidden: true
slug: eybzx82fnmq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>当一个父元素包含的子元素都设置为float的时候，父元素的高度会出现坍塌的现象（见下图）。此时可能会对周围的布局产生影响，所以清除浮动，显得十分重要。<br><span class="img-wrap"><img data-src="/img/bVHMwU?w=512&amp;h=222" src="https://static.alili.tech/img/bVHMwU?w=512&amp;h=222" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">主要的方法</h2>
<h3 id="articleHeader2">一、使用clear属性</h3>
<h4>1.添加伪元素</h4>
<p>通过在父元素后面添加一个伪元素，设置为 block并清除左右浮动解决问题。目前这个方法是最新的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container::after {
    content:&quot; &quot;;
    display:block;
    clear:both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>:<span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">clear</span>:both;
}</code></pre>
<p>可能有些代码有添加<code>::before</code>,且<code>display：table</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container::after,.container::before{
    content:&quot; &quot;;
    display:table;
}   
.container::after{
    clear:both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::after</span>,<span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::before</span>{
    <span class="hljs-attribute">content</span>:<span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>:table;
}   
<span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">clear</span>:both;
}</code></pre>
<p>实际上添加的部分跟浮动并没有关系，他们的作用是防止子元素的margin-top发生重叠。<br>但添加::before就必须将display设置为table。主要原理：display设置为table时会出现一个匿名表格单元格（anonymous table-cell），从而创建一个新的BFC（下文会提及），根据BFC的布局规则，会使margin-top不重叠。这里只是解释说明有些代码出现这种写法的原因，如果没有防止重叠的需求，完全可以精简代码，使用上一种写法。</p>
<p>有时还会在代码的最后写上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    zoom:1; /* For IE 6/7 (trigger hasLayout) */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>; <span class="hljs-comment">/* For IE 6/7 (trigger hasLayout) */</span>
}</code></pre>
<p>这里主要是为了兼容IE6/7.</p>
<p>还有一种相似的做法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .clearfix:after{
    display: block;
    clear: both;
    content: &quot;&quot;;
    visibility: hidden;
    height: 0;
}
.clearfix{
    zoom:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.clearfix</span>{
    <span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>;
}</code></pre>
<p>将display设置为block是因为<code>:after</code>是伪元素，要想获得clear属性必须将他转换为block。添加<code>visibility: hidden;height: 0;</code>是让包含块末端看起来不那么乱，所以就直接隐藏起来。</p>
<h4>2、添加标签</h4>
<p>最简单除粗暴的方法就是直接在包含块末端添加一个标签，并且使用clear属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<br style=&quot;clear:both&quot; /> <!-- So dirty! -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">br</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"clear:both"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- So dirty! --&gt;</span></code></pre>
<p>但这种做法在HTML中语义不明确，一旦代码量增加，后期比较难维护。慎用！</p>
<h3 id="articleHeader3">二、触发浮动元素父元素的BFC（什么是BFC？之前写的另一篇文章<a href="https://segmentfault.com/a/1190000007998953">视觉格式化模型之BFC</a>）</h3>
<h4>1、使用overflow属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    overflow: hidden; /* Clearfix! */
    zoom: 1;  /* Triggering &quot;hasLayout&quot; in IE */
    display: block; /* Element must be a block to wrap around contents. Unnecessary if only using block-level elements. */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* Clearfix! */</span>
    <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;  <span class="hljs-comment">/* Triggering "hasLayout" in IE */</span>
    <span class="hljs-attribute">display</span>: block; <span class="hljs-comment">/* Element must be a block to wrap around contents. Unnecessary if only using block-level elements. */</span>
}</code></pre>
<p>这里主要是将overflow设置为非visible值，建立一个BFC，根据BFC的布局规则将浮动子元素包含进来。需要注意的是，container 里面的内容是否有溢出的风险。</p>
<h4>2、使用float属性</h4>
<p>直接将包含块设置为float。即可建立BFC。但这种做法不推荐，因为整体浮动会影响其他的布局。</p>
<h2 id="articleHeader4">总结</h2>
<p>如上所述，清除浮动有两大方法，使用clear属性和建立BFC。围绕这两方面可以使用很多小技巧。这里只是罗列几个常见的方法，并详细解释每条语句的作用，虽然有点啰嗦，但重在理解。如果有更好的方法也欢迎补充。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
清除浮动（clearfix）的常见方法

## 原文链接
[https://segmentfault.com/a/1190000008012247](https://segmentfault.com/a/1190000008012247)

