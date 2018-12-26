---
title: '最全面的水平垂直居中方案与flexbox布局' 
date: 2018-12-27 2:30:12
hidden: true
slug: 6b5pjgt1z89
categories: [reprint]
---

{{< raw >}}

                    
<p>最近又遇到许多垂直居中的问题，这是Css布局当中十分常见的一个问题，诸如定长定宽或不定长宽的各类容器的垂直居中，其实都有很多种解决方案。而且在Css3的flexbox出现之后，解决各类居中问题变得更加容易了。搜了搜园子内关于flexbox的文章觉得很多不够详尽，故想借介绍flexbox的同时好好总结一番各类垂直居中的方法。</p>
<p>由简至繁：</p>
<h2 id="articleHeader0">行内元素的水平居中</h2>
<p>要实现行内元素（&lt;span&gt;、&lt;a等）的水平居中，只需把行内元素包裹在块级父层元素（&lt;div&gt;、&lt;li&gt;、&lt;p&gt;等）中，并且在父层元素CSS设置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #container{
        text-align:center;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-id">#container</span>{
        <span class="hljs-attribute">text-align</span>:center;
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="并且适用于文字，链接，及其inline或者inline-block、inline-table和inline-flex。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>并且适用于文字，链接，及其inline或者inline-block、inline-<span class="hljs-selector-tag">table</span>和inline-<span class="hljs-attribute">flex</span>。
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDCp?w=837&amp;h=150" src="https://static.alili.tech/img/bVXDCp?w=837&amp;h=150" alt="前端学习交流群：461593224" title="前端学习交流群：461593224" style="cursor: pointer;"></span></p>
<p>Demo</p>
<h3 id="articleHeader1">块状元素的水平居中</h3>
<p>要实现块状元素（display:block）的水平居中，我们只需要将它的左右外边距margin-left和margin-right设置为auto，即可实现块状元素的居中，要水平居中的块状元素CSS设置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#center{
    margin:0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#center</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDCF?w=837&amp;h=150" src="https://static.alili.tech/img/bVXDCF?w=837&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Demo</p>
<h3 id="articleHeader2">多个块状元素的水平居中</h3>
<p>要实现多个水平排列的块状元素的水平居中，传统的方法是将要水平排列的块状元素设为display:inline-block，然后在父级元素上设置text-align:center，达到与上面的行内元素的水平居中一样的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    text-align:center;
}

#center{
    display:inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">text-align</span>:center;
}

<span class="hljs-selector-id">#center</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDCV?w=837&amp;h=150" src="https://static.alili.tech/img/bVXDCV?w=837&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>Demo</p>
<p><strong>使用flexbox实现多个块状元素的水平居中</strong></p>
<p>在使用之前，首先介绍一下flexbox。</p>
<p>Flexbox布局（Flexible Box)模块旨在提供一个更加有效的方式制定、调整和分布一个容器里的项目布局，即使他们的大小是未知或者是动态的。是CSS3 中一个新的布局模式，为了现代网络中更为复杂的网页需求而设计。</p>
<p>Flexbox 已经被浏览器快速支持。Chrome 22+, Opera 12.1+, 和 Opera Mobile 12.1+ ，firefox18+已经支持了本文中所描述的 Flexbox。</p>
<p>　　</p>
<p><strong>学会使用flexbox</strong></p>
<p>要为元素设置flexbox布局，只需将display属性值设置为flex。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 #container {
2     display: flex;
3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>#container {
<span class="hljs-symbol">2 </span>    display: flex;
<span class="hljs-symbol">3 </span>}</code></pre>
<p>flexbox的默认为一个块级元素，如果需要定义为一个行内级的元素，同理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 #container {
2     display: inline-flex;
3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>#container {
<span class="hljs-symbol">2 </span>    display: inline-flex;
<span class="hljs-symbol">3 </span>}</code></pre>
<p>flexbox由伸缩容器和伸缩项目组成。通过设置元素的display属性为flex或者inline-flex可以得到一个伸缩容器。设置为flex的容器被渲染为一个块级元素，而设置为inline-flex的容器则渲染为一个行内元素。而每一个被设置为flex的容器，它的内部元素都将变成一个flex项目，即是一个伸缩项目。简单的说，flex 定义了伸缩容器内伸缩项目该如何布局。</p>
<p>回到正题，利用flexbox实现多块状元素的水平居中，只需要将父级容器的Css设置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 #container{
2     justify-content:center;
3     display:flex;
4 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>#container{
<span class="hljs-symbol">2 </span>    justify-content:center;
<span class="hljs-symbol">3 </span>    display:flex;
<span class="hljs-symbol">4 </span>}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDDe?w=837&amp;h=150" src="https://static.alili.tech/img/bVXDDe?w=837&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Demo</p>
<h3 id="articleHeader3">已知高度宽度元素的水平垂直居中</h3>
<p><strong>法一.</strong></p>
<p>绝对定位与负边距实现。</p>
<p>利用绝对定位，将元素的top和left属性都设为50%，再利用margin边距，将元素回拉它本身高宽的一半，实现垂直居中。核心CSS代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    position:relative;
}

#center{
    width:100px;
    height:100px;
    position:absolute;
    top:50%;
    left:50%;
    margin:-50px 0 0 -50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">position</span>:relative;
}

<span class="hljs-selector-id">#center</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin</span>:-<span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">50px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDDt?w=661&amp;h=250" src="https://static.alili.tech/img/bVXDDt?w=661&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Demo</p>
<p><strong>法二.</strong></p>
<p>绝对定位与margin。</p>
<p>这种方法也是利用绝对定位与margin，但是无需知道被垂直居中元素的高和宽。核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    position:relative;
}

#center{
    position:absolute;
    margin:auto;
    top:0;
    bottom:0;
    left:0;
    right:0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">position</span>:relative;
}

<span class="hljs-selector-id">#center</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">margin</span>:auto;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
}</code></pre>
<p>Demo</p>
<h3 id="articleHeader4">未知高度和宽度元素的水平垂直居中</h3>
<p><strong>法一.  当要被居中的元素是inline或者inline-block元素</strong></p>
<p>当要被居中的元素是inline或者inline-block的时候，可以巧妙的将父级容器设置为display:table-cell，配合text-align:center和vertical-align:middle即可以实现水平垂直居中。</p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}

#center{

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">display</span>:table-cell;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">vertical-align</span>:middle;
}

<span class="hljs-selector-id">#center</span>{

}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDDS?w=620&amp;h=319" src="https://static.alili.tech/img/bVXDDS?w=620&amp;h=319" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>Demo</p>
<p><strong>法二. Css3显威力</strong></p>
<p>利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。</p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    position:relative;
}

#center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">position</span>:relative;
}

<span class="hljs-selector-id">#center</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDDV?w=663&amp;h=250" src="https://static.alili.tech/img/bVXDDV?w=663&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>Demo</p>
<p><strong>法三. flex布局轻松解决</strong></p>
<p>使用flex布局，无需绝对定位等改变布局的操作，可以轻松实现元素的水平垂直居中。</p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    display:flex;
    justify-content:center;
    align-items: center;
}

#center{

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">justify-content</span>:center;
    <span class="hljs-attribute">align-items</span>: center;
}

<span class="hljs-selector-id">#center</span>{

}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXDD3?w=836&amp;h=317" src="https://static.alili.tech/img/bVXDD3?w=836&amp;h=317" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Demo</p>
<p><strong>一些总结</strong>    </p>
<p>CSS3的transform和flex固然好用，但在项目的实际运用中必须考虑兼容问题，大量的hack代码可能会导致得不偿失。</p>
<p>某些浏览器仍需使用前缀写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 .flexboxtest{
2   display: flex;
3   display: -webkit-flex; //Safari仍旧需要使用特定的浏览器前缀
4 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>.flexboxtest{
<span class="hljs-symbol">2 </span>  display: flex;
<span class="hljs-symbol">3 </span>  display: -webkit-flex; //Safari仍旧需要使用特定的浏览器前缀
<span class="hljs-symbol">4 </span>}</code></pre>
<p>文中介绍的flex用法只是一小部分，flex还有着其他强大的功能。</p>
<blockquote><p><strong>学习前端的同学注意了</strong>！！！<br>学习过程中遇到什么问题或者想获取学习资源的话，欢迎加入<strong>前端学习交流群461593224</strong>，我们一起学前端！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最全面的水平垂直居中方案与flexbox布局

## 原文链接
[https://segmentfault.com/a/1190000011791428](https://segmentfault.com/a/1190000011791428)

