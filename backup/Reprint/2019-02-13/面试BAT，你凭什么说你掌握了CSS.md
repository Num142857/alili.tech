---
title: '面试BAT，你凭什么说你掌握了CSS' 
date: 2019-02-13 2:31:22
hidden: true
slug: 47htq10t8wj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>项目已经开源：<a href="https://github.com/nanhupatar/FEGuide/blob/master/CSS%E9%97%AE%E9%A2%98/css.md" rel="nofollow noreferrer" target="_blank">https://github.com/nanhupatar...</a> 欢迎PR</p>
<h2 id="articleHeader1">推荐</h2>
<p>关注我们的公众号</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016655887?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000016655887?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">display: none; 与 visibility: hidden; 的区别</h3>
<p>相同： 它们都能让元素不可见</p>
<p>区别：</p>
<ul>
<li>display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见</li>
<li>display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility:hidden;是继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式</li>
<li>修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会造成本元素的重绘</li>
<li>读屏器不会读取 display: none;元素内容；会读取 visibility: hidden 元素内容</li>
</ul>
<h3 id="articleHeader3">css hack 原理及常用 hack</h3>
<p>原理：利用不同浏览器对 CSS 的支持和解析结果不一样编写针对特定浏览器样式。常见的 hack 有 1）属性 hack。2）选择器 hack。3）IE 条件注释</p>
<p>IE 条件注释：适用于[IE5, IE9]常见格式如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--[if IE 6]>
Special instructions for IE 6 here
<![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--[if IE 6]&gt;
Special instructions for IE 6 here
&lt;![endif]--&gt;</span></code></pre>
<p>选择器 hack：不同浏览器对选择器的支持不一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/***** Selector Hacks ******/

/* IE6 and below */
* html #uno  { color: red }

/* IE7 */
*:first-child+html #dos { color: red }

/* IE7, FF, Saf, Opera  */
html>body #tres { color: red }

/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
html>/**/body #cuatro { color: red }

/* Opera 9.27 and below, safari 2 */
html:first-child #cinco { color: red }

/* Safari 2-3 */
html[xmlns*=&quot;&quot;] body:last-child #seis { color: red }

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:nth-of-type(1) #siete { color: red }

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:first-of-type #ocho {  color: red }

/* saf3+, chrome1+ */
@media screen and (-webkit-min-device-pixel-ratio:0) {
 #diez  { color: red  }
}

/* iPhone / mobile webkit */
@media screen and (max-device-width: 480px) {
 #veintiseis { color: red  }
}

/* Safari 2 - 3.1 */
html[xmlns*=&quot;&quot;]:root #trece  { color: red  }

/* Safari 2 - 3.1, Opera 9.25 */
*|html[xmlns*=&quot;&quot;] #catorce { color: red  }

/* Everything but IE6-8 */
:root *> #quince { color: red  }

/* IE7 */
*+html #dieciocho {  color: red }

/* Firefox only. 1+ */
#veinticuatro,  x:-moz-any-link  { color: red }

/* Firefox 3.0+ */
#veinticinco,  x:-moz-any-link, x:default  { color: red  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">/***** Selector Hacks ******/</span>

<span class="hljs-comment">/* IE6 and below */</span>
* <span class="hljs-selector-tag">html</span> <span class="hljs-selector-id">#uno</span>  { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* IE7 */</span>
*<span class="hljs-selector-pseudo">:first-child+html</span> <span class="hljs-selector-id">#dos</span> { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* IE7, FF, Saf, Opera  */</span>
<span class="hljs-selector-tag">html</span>&gt;<span class="hljs-selector-tag">body</span> <span class="hljs-selector-id">#tres</span> { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* IE8, FF, Saf, Opera (Everything but IE 6,7) */</span>
<span class="hljs-selector-tag">html</span>&gt;<span class="hljs-comment">/**/</span><span class="hljs-selector-tag">body</span> <span class="hljs-selector-id">#cuatro</span> { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* Opera 9.27 and below, safari 2 */</span>
<span class="hljs-attribute">html</span>:first-child #cinco { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* Safari 2-3 */</span>
<span class="hljs-selector-tag">html</span><span class="hljs-selector-attr">[xmlns*=""]</span> <span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">:last-child</span> <span class="hljs-selector-id">#seis</span> { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* safari 3+, chrome 1+, opera9+, ff 3.5+ */</span>
<span class="hljs-attribute">body</span>:nth-of-type(<span class="hljs-number">1</span>) #siete { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* safari 3+, chrome 1+, opera9+, ff 3.5+ */</span>
<span class="hljs-attribute">body</span>:first-of-type #ocho {  <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* saf3+, chrome1+ */</span>
<span class="hljs-keyword">@media</span> screen and (<span class="hljs-attribute">-webkit-min-device-pixel-ratio</span>:<span class="hljs-number">0</span>) {
 <span class="hljs-selector-id">#diez</span>  { <span class="hljs-attribute">color</span>: red  }
}

<span class="hljs-comment">/* iPhone / mobile webkit */</span>
<span class="hljs-keyword">@media</span> screen and (<span class="hljs-attribute">max-device-width</span>: <span class="hljs-number">480px</span>) {
 <span class="hljs-selector-id">#veintiseis</span> { <span class="hljs-attribute">color</span>: red  }
}

<span class="hljs-comment">/* Safari 2 - 3.1 */</span>
<span class="hljs-selector-tag">html</span><span class="hljs-selector-attr">[xmlns*=""]</span><span class="hljs-selector-pseudo">:root</span> <span class="hljs-selector-id">#trece</span>  { <span class="hljs-attribute">color</span>: red  }

<span class="hljs-comment">/* Safari 2 - 3.1, Opera 9.25 */</span>
*|<span class="hljs-selector-tag">html</span><span class="hljs-selector-attr">[xmlns*=""]</span> <span class="hljs-selector-id">#catorce</span> { <span class="hljs-attribute">color</span>: red  }

<span class="hljs-comment">/* Everything but IE6-8 */</span>
<span class="hljs-selector-pseudo">:root</span> *&gt; <span class="hljs-selector-id">#quince</span> { <span class="hljs-attribute">color</span>: red  }

<span class="hljs-comment">/* IE7 */</span>
*+<span class="hljs-selector-tag">html</span> <span class="hljs-selector-id">#dieciocho</span> {  <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* Firefox only. 1+ */</span>
<span class="hljs-selector-id">#veinticuatro</span>,  <span class="hljs-selector-tag">x</span><span class="hljs-selector-pseudo">:-moz-any-link</span>  { <span class="hljs-attribute">color</span>: red }

<span class="hljs-comment">/* Firefox 3.0+ */</span>
<span class="hljs-selector-id">#veinticinco</span>,  <span class="hljs-selector-tag">x</span><span class="hljs-selector-pseudo">:-moz-any-link</span>, <span class="hljs-selector-tag">x</span><span class="hljs-selector-pseudo">:default</span>  { <span class="hljs-attribute">color</span>: red  }</code></pre>
<p>属性 hack：不同浏览器解析 bug 或方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* IE6 */
#once { _color: blue }

/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }

/* Everything but IE6 */
#diecisiete { color/**/: blue }

/* IE6, IE7, IE8 */
#diecinueve { color: blue\9; }

/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }

/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/* IE6 */</span>
<span class="hljs-selector-id">#once</span> { _color: blue }

<span class="hljs-comment">/* IE6, IE7 */</span>
<span class="hljs-selector-id">#doce</span> { *<span class="hljs-attribute">color</span>: blue; <span class="hljs-comment">/* or #color: blue */</span> }

<span class="hljs-comment">/* Everything but IE6 */</span>
<span class="hljs-selector-id">#diecisiete</span> { <span class="hljs-attribute">color</span><span class="hljs-comment">/**/</span>: blue }

<span class="hljs-comment">/* IE6, IE7, IE8 */</span>
<span class="hljs-selector-id">#diecinueve</span> { <span class="hljs-attribute">color</span>: blue\<span class="hljs-number">9</span>; }

<span class="hljs-comment">/* IE7, IE8 */</span>
<span class="hljs-selector-id">#veinte</span> { <span class="hljs-attribute">color</span><span class="hljs-comment">/*\**/</span>: blue\<span class="hljs-number">9</span>; }

<span class="hljs-comment">/* IE6, IE7 -- acts as an !important */</span>
<span class="hljs-selector-id">#veintesiete</span> { <span class="hljs-attribute">color</span>: blue !ie; } <span class="hljs-comment">/* string after ! can be anything */</span></code></pre>
<h3 id="articleHeader4">link 与 @import 的区别</h3>
<ul>
<li>link 是 HTML 方式， @import 是 CSS 方式</li>
<li>link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC</li>
<li>link 可以通过 rel="alternate stylesheet" 指定候选样式</li>
<li>浏览器对 link 支持早于@import ，可以使用 @import 对老浏览器隐藏样式</li>
<li>@import 必须在样式规则之前，可以在 css 文件中引用其他文件</li>
<li>总体来说：link 优于@import</li>
</ul>
<h3 id="articleHeader5">CSS 有哪些继承属性</h3>
<ul>
<li>
<p>关于文字排版的属性如：</p>
<ul>
<li>font</li>
<li>word-break</li>
<li>letter-spacing</li>
<li>text-align</li>
<li>text-rendering</li>
<li>word-spacing</li>
<li>white-space</li>
<li>text-indent</li>
<li>text-transform</li>
<li>text-shadow</li>
</ul>
</li>
<li>line-height</li>
<li>color</li>
<li>visibility</li>
<li>cursor</li>
</ul>
<h3 id="articleHeader6">display,float,position 的关系</h3>
<ul>
<li>如果 display 为 none，那么 position 和 float 都不起作用，这种情况下元素不产生框</li>
<li>否则，如果 position 值为 absolute 或者 fixed，框就是绝对定位的，float 的计算值为 none，display 根据下面的表格进行调整</li>
<li>否则，如果 float 不是 none，框是浮动的，display 根据下表进行调整</li>
<li>否则，如果元素是根元素，display 根据下表进行调整</li>
<li>其他情况下 display 的值为指定值 总结起来：绝对定位、浮动、根元素都需要调整 display</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016655888?w=664&amp;h=203" src="https://static.alili.tech/img/remote/1460000016655888?w=664&amp;h=203" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">外边距折叠(collapsing margins)</h3>
<p>外边距重叠就是 margin-collapse</p>
<p>相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距</p>
<p>折叠结果遵循下列计算规则：</p>
<ul>
<li>两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值</li>
<li>两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值</li>
<li>两个外边距一正一负时，折叠结果是两者的相加的和</li>
</ul>
<h3 id="articleHeader8">介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？</h3>
<ul>
<li>有两种， IE 盒子模型、W3C 盒子模型；</li>
<li>盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；</li>
<li>标准(W3C)盒模型：元素宽度 = width + padding + border + margin</li>
<li>怪异(IE)盒模型：元素宽度 = width + margin</li>
<li>区 别： IE 的 content 部分把 border 和 padding 计算了进去;</li>
<li>标准浏览器通过设置 css3 的 box-sizing: border-box 属性，触发“怪异模式”解析计算宽高</li>
</ul>
<h3 id="articleHeader9">CSS 选择符有哪些？</h3>
<ul>
<li>id 选择器（ # myid）</li>
<li>类选择器（.myclassname）</li>
<li>标签选择器（div, h1, p）</li>
<li>相邻选择器（h1 + p）</li>
<li>子选择器（ul &gt; li）</li>
<li>后代选择器（li a）</li>
<li>通配符选择器（ * ）</li>
<li>属性选择器（a[rel = "external"]）</li>
<li>伪类选择器（a:hover, li:nth-child）</li>
</ul>
<h3 id="articleHeader10">CSS3 新增伪类有那些？</h3>
<ul>
<li>p:first-of-type 选择属于其父元素的首个 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</li>
<li>p:last-of-type 选择属于其父元素的最后 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</li>
<li>p:only-of-type 选择属于其父元素唯一的 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</li>
<li>p:only-child 选择属于其父元素的唯一子元素的每个 &lt;p&gt; 元素。</li>
<li>p:nth-child(2) 选择属于其父元素的第二个子元素的每个 &lt;p&gt; 元素。</li>
<li>:after 在元素之前添加内容,也可以用来做清除浮动。</li>
<li>:before 在元素之后添加内容</li>
<li>:enabled 选择器匹配每个已启用的元素（大多用在表单元素上）。</li>
<li>:disabled 控制表单控件的禁用状态。</li>
<li>:checked 单选框或复选框被选中</li>
</ul>
<h3 id="articleHeader11">如何居中 div？如何居中一个浮动元素？如何让绝对定位的 div 居中？</h3>
<p>如果需要居中的元素为常规流中 inline 元素，为父元素设置 text-align: center;即可实现</p>
<p>如果需要居中的元素为常规流中 block 元素，1）为元素设置宽度，2）设置左右 margin 为 auto。3）IE6 下需在父元素上设置 text-align: center;,再给子元素恢复需要的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;content&quot;>
    aaaaaa aaaaaa a a a a a a a a
    </div>
</body>

<style>
    body {
        background: #DDD;
        text-align: center; /* 3 */
    }
    .content {
        width: 500px;      /* 1 */
        text-align: left;  /* 3 */
        margin: 0 auto;    /* 2 */

        background: purple;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    aaaaaa aaaaaa a a a a a a a a
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#DDD</span>;
        <span class="hljs-attribute">text-align</span>: center; <span class="hljs-comment">/* 3 */</span>
    }
    <span class="hljs-selector-class">.content</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;      <span class="hljs-comment">/* 1 */</span>
        <span class="hljs-attribute">text-align</span>: left;  <span class="hljs-comment">/* 3 */</span>
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;    <span class="hljs-comment">/* 2 */</span>

        <span class="hljs-attribute">background</span>: purple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如果需要居中的元素为浮动元素，1）为元素设置宽度，2）position: relative;，3）浮动方向偏移量（left 或者 right）设置为 50%，4）浮动方向上的 margin 设置为元素宽度一半乘以-1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;content&quot;>
    aaaaaa aaaaaa a a a a a a a a
    </div>
</body>

<style>
    body {
        background: #DDD;
    }
    .content {
        width: 500px;         /* 1 */
        float: left;

        position: relative;   /* 2 */
        left: 50%;            /* 3 */
        margin-left: -250px;  /* 4 */

        background-color: purple;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    aaaaaa aaaaaa a a a a a a a a
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#DDD</span>;
    }
    <span class="hljs-selector-class">.content</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;         <span class="hljs-comment">/* 1 */</span>
        <span class="hljs-attribute">float</span>: left;

        <span class="hljs-attribute">position</span>: relative;   <span class="hljs-comment">/* 2 */</span>
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;            <span class="hljs-comment">/* 3 */</span>
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">250px</span>;  <span class="hljs-comment">/* 4 */</span>

        <span class="hljs-attribute">background-color</span>: purple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如果需要居中的元素为绝对定位元素，1）为元素设置宽度，2）偏移量设置为 50%，3）偏移方向外边距设置为元素宽度一半乘以-1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;content&quot;>
    aaaaaa aaaaaa a a a a a a a a
    </div>
</body>

<style>
    body {
        background: #DDD;
        position: relative;
    }
    .content {
        width: 800px;

        position: absolute;
        left: 50%;
        margin-left: -400px;

        background-color: purple;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    aaaaaa aaaaaa a a a a a a a a
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#DDD</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.content</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;

        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">400px</span>;

        <span class="hljs-attribute">background-color</span>: purple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如果需要居中的元素为绝对定位元素，1）为元素设置宽度，2）设置左右偏移量都为 0,3）设置左右外边距都为 auto</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;content&quot;>
    aaaaaa aaaaaa a a a a a a a a
    </div>
</body>

<style>
    body {
        background: #DDD;
        position: relative;
    }
    .content {
        width: 800px;

        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;

        background-color: purple;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    aaaaaa aaaaaa a a a a a a a a
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#DDD</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.content</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;

        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;

        <span class="hljs-attribute">background-color</span>: purple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader12">如何竖直居中一个元素</h3>
<ul>
<li>绝对定位居中</li>
<li>如果居中的是行内元素，可以设置父级 height 与 line-height 相等</li>
<li>设置 margin/padding 居中</li>
<li>相对位置偏移居中</li>
<li>flex 居中 设置 align-items:center 即可</li>
</ul>
<h3 id="articleHeader13">display 有哪些值？说明他们的作用</h3>
<ul>
<li>block 象块类型元素一样显示。</li>
<li>none 缺省值。象行内元素类型一样显示。</li>
<li>inline-block 象行内元素一样显示，但其内容象块类型元素一样显示。</li>
<li>list-item 象块类型元素一样显示，并添加样式列表标记。</li>
<li>table 此元素会作为块级表格来显示</li>
<li>inherit 规定应该从父元素继承 display 属性的值</li>
</ul>
<h3 id="articleHeader14">position 有哪些值 relative 和 absolute 定位原点是？</h3>
<ul>
<li>absolute 生成绝对定位的元素，相对于值不为 static 的第一个父元素进行定位。</li>
<li>fixed （老 IE 不支持） 生成绝对定位的元素，相对于浏览器窗口进行定位。</li>
<li>relative 生成相对定位的元素，相对于其正常位置进行定位。</li>
<li>static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。</li>
<li>inherit 规定从父元素继承 position 属性的值</li>
</ul>
<h3 id="articleHeader15">CSS3 有哪些新特性？</h3>
<ul>
<li>新增选择器 p:nth-child(n){color: rgba(255, 0, 0, 0.75)}</li>
<li>弹性盒模型 display: flex;</li>
<li>多列布局 column-count: 5;</li>
<li>媒体查询 @media (max-width: 480px) {.box: {column-count: 1;"}}"</li>
<li>个性化字体 @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}</li>
<li>颜色透明度 color: rgba(255, 0, 0, 0.75);</li>
<li>圆角 border-radius: 5px;</li>
<li>渐变 background:linear-gradient(red, green, blue);</li>
<li>阴影 box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);</li>
<li>倒影 box-reflect: below 2px;</li>
<li>文字装饰 text-stroke-color: red;</li>
<li>文字溢出 text-overflow:ellipsis;</li>
<li>背景效果 background-size: 100px 100px;</li>
<li>边框效果 border-image:url(bt_blue.png) 0 10;</li>
<li>平滑过渡 transition: all .3s ease-in .1s;</li>
<li>动画 @keyframes anim-1 {50% {border-radius: 50%;"}}" animation: anim-1 1s;</li>
<li>
<p>转换</p>
<ul>
<li>旋转 transform: rotate(20deg);</li>
<li>倾斜 transform: skew(150deg, -10deg);</li>
<li>位移 transform: translate(20px, 20px);</li>
<li>缩放 transform: scale(.5);</li>
</ul>
</li>
</ul>
<h3 id="articleHeader16">用纯 CSS 创建一个三角形的原理是什么？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把上、左、右三条边隐藏掉（颜色设为 transparent）
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// 把上、左、右三条边隐藏掉（颜色设为 <span class="hljs-built_in">transparent</span>）
#<span class="hljs-built_in">demo</span> {
  <span class="hljs-built_in">width</span>: <span class="hljs-number">0</span>;
  <span class="hljs-built_in">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>: 20px;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">style</span>: solid;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> red <span class="hljs-built_in">transparent</span>;
}</code></pre>
<h3 id="articleHeader17">一个满屏品字布局如何设计?</h3>
<p>简单的方式：</p>
<ul>
<li>上面的 div 宽 100%，</li>
<li>下面的两个 div 分别宽 50%，</li>
<li>然后用 float 或者 inline 使其不换行即可</li>
</ul>
<h3 id="articleHeader18">经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧 ？</h3>
<ul>
<li>png24 位的图片在 iE6 浏览器上出现背景，解决方案是做成 PNG8.</li>
<li>浏览器默认的 margin 和 padding 不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一</li>
<li>IE 下,可以使用获取常规属性的方法来获取自定义属性,也可以使用 getAttribute()获取自定义属性;</li>
<li>Firefox 下,只能使用 getAttribute()获取自定义属性。解决方法:统一通过 getAttribute()获取自定义属性</li>
<li>IE 下,even 对象有 x,y 属性,但是没有 pageX,pageY 属性</li>
<li>Firefox 下,event 对象有 pageX,pageY 属性,但是没有 x,y 属性</li>
</ul>
<h3 id="articleHeader19">li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？(也称幽灵字符)</h3>
<p>行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了</p>
<h3 id="articleHeader20">display:inline-block 间隙问题怎么解决？(携程)</h3>
<p>移除空格、使用 margin 负值、使用 font-size:0、letter-spacing、word-spacing</p>
<h3 id="articleHeader21">display:inline-block 什么时候会显示间隙？</h3>
<ul>
<li>相邻的 inline-block 元素之间有换行或空格分隔的情况下会产生间距</li>
<li>非 inline-block 水平元素设置为 inline-block 也会有水平间距</li>
<li>可以借助 vertical-align:top; 消除垂直间隙</li>
<li>可以在父级加 font-size：0; 在子元素里设置需要的字体大小，消除垂直间隙</li>
<li>把 li 标签写到同一行可以消除垂直间隙，但代码可读性差</li>
</ul>
<h3 id="articleHeader22">css 定义的权重</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下/// 例子是演示各种定义的权重值：

//权重为1
div{}

//权重为10
.class1{}

//权重为100
#id1{}

//权重为100+1=101
#id1 div{}

//权重为10+1=11
.class1 div{}

//权重为10+10+1=21
.class1 .class2 div{}

// 如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下/// 例子是演示各种定义的权重值：</span>

<span class="hljs-comment">//权重为1</span>
div{}

<span class="hljs-comment">//权重为10</span>
.class1{}

<span class="hljs-comment">//权重为100</span>
#id1{}

<span class="hljs-comment">//权重为100+1=101</span>
<span class="hljs-selector-id">#id1</span> div{}

<span class="hljs-comment">//权重为10+1=11</span>
<span class="hljs-selector-class">.class1</span> div{}

<span class="hljs-comment">//权重为10+10+1=21</span>
<span class="hljs-selector-class">.class1</span> <span class="hljs-selector-class">.class2</span> div{}

<span class="hljs-comment">// 如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现</span></code></pre>
<h3 id="articleHeader23">CSS 优先级算法如何计算？</h3>
<ul>
<li>优先级就近原则，同权重情况下样式定义最近者为准</li>
<li>载入样式以最后载入的为准</li>
<li>优先级为: !important &gt; id &gt; class &gt; tag important 比 内联优先级高</li>
</ul>
<h3 id="articleHeader24">谈谈浮动和清除浮动</h3>
<p>浮动的框可以向左或向右移动，直到他的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流的块框表现得就像浮动框不存在一样。浮动的块框会漂浮在文档普通流的块框上</p>
<p>解决方法</p>
<ol><li>父级 div 定义伪类：after 和 zoom (推荐使用，建议定义公共类，以减少 CSS 代码)</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   .clearfloat:after{
       display:block;
       clear:both;
       content:&quot;&quot;;
       visibility:hidden;
       height:0}

   .clearfloat{zoom:1}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>   <span class="hljs-selector-class">.clearfloat</span><span class="hljs-selector-pseudo">:after</span>{
       <span class="hljs-attribute">display</span>:block;
       <span class="hljs-attribute">clear</span>:both;
       <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
       <span class="hljs-attribute">visibility</span>:hidden;
       <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>}

   <span class="hljs-selector-class">.clearfloat</span>{<span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>}</code></pre>
<ol><li>在结尾处添加空 div 标签 clear:both</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>Left</div>
    <div class=&quot;right&quot;>Right</div>
    <div class=&quot;clearfloat&quot;></div>
</div>

.left {float:left}
.clearfloat{clear:both}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;Left&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;Right&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"clearfloat"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

.left {float:left}
.clearfloat{clear:both}</code></pre>
<ol>
<li>父级 div 定义 height</li>
<li>父级 div 定义 overflow:auto</li>
<li>父级 div 定义 overflow:hidden</li>
<li>父级 div 也一起浮动</li>
<li>父级 div 定义 display:table</li>
<li>结尾处加 br 标签 clear:both</li>
</ol>
<p>参考链接<a href="https://www.cnblogs.com/nxl0908/p/7245460.html" rel="nofollow noreferrer" target="_blank">几种常用的清除浮动方法</a></p>
<h3 id="articleHeader25">box-sizing 常用的属性有哪些？分别有什么作用？</h3>
<ul>
<li>box-sizing: content-box; // 默认的标准(W3C)盒模型元素效果</li>
<li>box-sizing: border-box; // 触发怪异(IE)盒模型元素的效果</li>
<li>box-sizing: inherit; // 继承父元素 box-sizing 属性的值</li>
</ul>
<h3 id="articleHeader26">请列举几种隐藏元素的方法</h3>
<ul>
<li>visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在</li>
<li>opacity: 0; CSS3 属性，设置 0 可以使一个元素完全透明</li>
<li>position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外</li>
<li>display: none; 元素会变得不可见，并且不会再占用文档的空间。</li>
<li>transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留</li>
<li>&lt;div hidden="hidden"&gt; HTML5 属性,效果和 display:none;相同，但这个属性用于记录一个元素的状态</li>
<li>height: 0; 将元素高度设为 0 ，并消除边框</li>
<li>filter: blur(0); CSS3 属性，将一个元素的模糊度设置为 0，从而使这个</li>
</ul>
<h3 id="articleHeader27">rgba() 和 opacity 的透明效果有什么不同？</h3>
<ul>
<li>opacity 作用于元素以及元素内的所有内容（包括文字）的透明度</li>
<li>rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果</li>
</ul>
<h3 id="articleHeader28">css 属性 content 有什么作用？</h3>
<p>content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式</p>
<h3 id="articleHeader29">请解释一下 CSS3 的 Flexbox（弹性盒布局模型）以及适用场景？</h3>
<p>Flexbox 用于不同尺寸屏幕中创建可自动扩展和收缩布局</p>
<h3 id="articleHeader30">请写出多种等高布局</h3>
<ul>
<li>在列的父元素上使用这个背景图进行 Y 轴的铺放，从而实现一种等高列的假像</li>
<li>模仿表格布局等高列效果：兼容性不好，在 ie6-7 无法正常运行</li>
<li>css3 flexbox 布局： .container{display: flex; align-items: stretch;}</li>
</ul>
<h3 id="articleHeader31">圣杯布局的实现原理？</h3>
<p>要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽</p>
<p>好处：重要的内容放在文档流前面可以优先渲染</p>
<p>原理：利用相对定位、浮动、负边距布局，而不添加额外标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .container {
      padding-left: 150px;
      padding-right: 190px;
  }
  .main {
      float: left;
      width: 100%;
  }
  .left {
      float: left;
      width: 190px;
      margin-left: -100%;
      position: relative;
      left: -150px;
  }
  .right {
      float: left;
      width: 190px;
      margin-left: -190px;
      position: relative;
      right: -190px;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-class">.container</span> {
      <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">150px</span>;
      <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">190px</span>;
  }
  <span class="hljs-selector-class">.main</span> {
      <span class="hljs-attribute">float</span>: left;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  }
  <span class="hljs-selector-class">.left</span> {
      <span class="hljs-attribute">float</span>: left;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
      <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
      <span class="hljs-attribute">position</span>: relative;
      <span class="hljs-attribute">left</span>: -<span class="hljs-number">150px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
      <span class="hljs-attribute">float</span>: left;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
      <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">190px</span>;
      <span class="hljs-attribute">position</span>: relative;
      <span class="hljs-attribute">right</span>: -<span class="hljs-number">190px</span>;
  }</code></pre>
<h3 id="articleHeader32">什么是双飞翼布局？实现原理？</h3>
<p>双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局</p>
<p>原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    /*padding-left:150px;*/
    /*padding-right:190px;*/
}
.main-wrap {
    width: 100%;
    float: left;
}
.main {
    margin-left: 150px;
    margin-right: 190px;
}
.left {
    float: left;
    width: 150px;
    margin-left: -100%;
    /*position: relative;*/
    /*left:-150px;*/
}
.right {
    float: left;
    width: 190px;
    margin-left: -190px;
    /*position:relative;*/
    /*right:-190px;*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-comment">/*padding-left:150px;*/</span>
    <span class="hljs-comment">/*padding-right:190px;*/</span>
}
<span class="hljs-selector-class">.main-wrap</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.main</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">190px</span>;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
    <span class="hljs-comment">/*position: relative;*/</span>
    <span class="hljs-comment">/*left:-150px;*/</span>
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">190px</span>;
    <span class="hljs-comment">/*position:relative;*/</span>
    <span class="hljs-comment">/*right:-190px;*/</span>
}</code></pre>
<h3 id="articleHeader33">在 CSS 样式中常使用 px、em 在表现上有什么区别？</h3>
<ul>
<li>px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能</li>
<li>em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级 font-size</li>
</ul>
<h3 id="articleHeader34">为什么要初始化 CSS 样式？</h3>
<ul>
<li>不同浏览器对有些标签样式的默认值解析不同</li>
<li>不初始化 CSS 会造成各现浏览器之间的页面显示差异</li>
<li>可以使用 reset.css 或 Normalize.css 做 CSS 初始化</li>
</ul>
<h3 id="articleHeader35">reset.css 和 Normalize.css 理解</h3>
<p>reset.css 意为重置默认样式。HTML 中绝大部分标签元素在网页显示中都有一个默认属性值，通常为了避免重复定义元素样式，需要进行重置默认样式</p>
<p>Eric Meyer（CSS Reset）推荐</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
/* remember to define focus styles! */
:focus {
    outline: 0;
}
/* remember to highlight inserts somehow! */
ins {
    text-decoration: none;
}
del {
    text-decoration: line-through;
}
/* tables still need ‘cellspacing=”0″‘ in the markup */
table {
    border-collapse: collapse;
    border-spacing: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">div</span>, <span class="hljs-selector-tag">span</span>, applet, <span class="hljs-selector-tag">object</span>, <span class="hljs-selector-tag">iframe</span>,
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">blockquote</span>, pre,
<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">abbr</span>, acronym, <span class="hljs-selector-tag">address</span>, big, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">code</span>,
<span class="hljs-selector-tag">del</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-attribute">font</span>, img, ins, kbd, q, s, samp,
small, strike, <span class="hljs-selector-tag">strong</span>, sub, <span class="hljs-selector-tag">sup</span>, tt, <span class="hljs-selector-tag">var</span>,
<span class="hljs-selector-tag">b</span>, u, <span class="hljs-selector-tag">i</span>, center,
<span class="hljs-selector-tag">dl</span>, <span class="hljs-selector-tag">dt</span>, <span class="hljs-selector-tag">dd</span>, <span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">li</span>,
<span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">form</span>, <span class="hljs-selector-tag">label</span>, <span class="hljs-selector-tag">legend</span>,
<span class="hljs-selector-tag">table</span>, <span class="hljs-selector-tag">caption</span>, <span class="hljs-selector-tag">tbody</span>, <span class="hljs-selector-tag">tfoot</span>, <span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tr</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">vertical-align</span>: baseline;
    <span class="hljs-attribute">background</span>: transparent;
}
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">list-style</span>: none;
}
<span class="hljs-selector-tag">blockquote</span>, <span class="hljs-selector-tag">q</span> {
    <span class="hljs-attribute">quotes</span>: none;
}
<span class="hljs-selector-tag">blockquote</span>:before, <span class="hljs-selector-tag">blockquote</span>:after,
<span class="hljs-selector-tag">q</span>:before, <span class="hljs-selector-tag">q</span>:after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">content</span>: none;
}
<span class="hljs-comment">/* remember to define focus styles! */</span>
:focus {
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-comment">/* remember to highlight inserts somehow! */</span>
<span class="hljs-selector-tag">ins</span> {
    <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-tag">del</span> {
    <span class="hljs-attribute">text-decoration</span>: line-through;
}
<span class="hljs-comment">/* tables still need ‘cellspacing=”0″‘ in the markup */</span>
<span class="hljs-selector-tag">table</span> {
    <span class="hljs-attribute">border-collapse</span>: collapse;
    <span class="hljs-attribute">border-spacing</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>Normalize.css 只是一个很小的 css 文件,但它在默认的 HTML 元素样式上提供了跨浏览器的高度一致性。相比于传统的 css reset，Normalize.css 是一种现代的，为 HTML5 准备的优质替代方案。</p>
<p>Normalize.css 是一种 CSS reset 的替代方案。经过@necolas 和@jon neal 花了几百个小时来努力研究不同浏览器的默认样式的差异，这个项目终于变成了现在这样。</p>
<p>我们创造 normalize.css 有下几个目的：</p>
<ul>
<li>保护有用的浏览器默认样式而不是完全去掉它们</li>
<li>一般化的样式：为大部分 HTML 元素提供</li>
<li>修复浏览器自身的 bug 并保证各浏览器的一致性</li>
<li>优化 CSS 可用性：用一些小技巧</li>
<li>解释代码：用注释和详细的文档来</li>
</ul>
<h3 id="articleHeader36">什么是 FOUC(Flash of Unstyled Content)？ 如何来避免 FOUC？</h3>
<ul>
<li>当使用 @import 导入 CSS 时，会导致某些页面在 IE 出现奇怪的现象： 没有样式的页面内容显示瞬间闪烁，这种现象称为“文档样式短暂失效”，简称为 FOUC</li>
<li>产生原因：当样式表晚于结构性 html 加载时，加载到此样式表时，页面将停止之前的渲染。</li>
<li>等待此样式表被下载和解析后，再重新渲染页面，期间导致短暂的花屏现象。</li>
<li>解决方法：使用 link 标签将样式表放在文档 head</li>
</ul>
<h3 id="articleHeader37">介绍使用过的 CSS 预处理器？</h3>
<ul>
<li>CSS 预处理器基本思想：为 CSS 增加了一些编程的特性（变量、逻辑判断、函数等）</li>
<li>开发者使用这种语言进行进行 Web 页面样式设计，再编译成正常的 CSS 文件使用</li>
<li>使用 CSS 预处理器，可以使 CSS 更加简洁、适应性更强、可读性更佳，无需考虑兼容性</li>
<li>最常用的 CSS 预处理器语言包括：Sass（SCSS）和 LESS</li>
</ul>
<h3 id="articleHeader38">CSS 优化、提高性能的方法有哪些？</h3>
<ul>
<li>多个 css 合并，尽量减少 HTTP 请求</li>
<li>将 css 文件放在页面最上面</li>
<li>移除空的 css 规则</li>
<li>避免使用 CSS 表达式</li>
<li>选择器优化嵌套，尽量避免层级过深</li>
<li>充分利用 css 继承属性，减少代码量</li>
<li>抽象提取公共样式，减少代码量</li>
<li>属性值为 0 时，不加单位</li>
<li>属性值为小于 1 的小数时，省略小数点前面的 0</li>
<li>css 雪碧图</li>
</ul>
<h3 id="articleHeader39">浏览器是怎样解析 CSS 选择器的？</h3>
<p>浏览器解析 CSS 选择器的方式是从右到左</p>
<h3 id="articleHeader40">在网页中的应该使用奇数还是偶数的字体？</h3>
<p>在网页中的应该使用“偶数”字体：</p>
<ul>
<li>偶数字号相对更容易和 web 设计的其他部分构成比例关系</li>
<li>使用奇数号字体时文本段落无法对齐</li>
<li>宋体的中文网页排布中使用最多的就是 12 和 14</li>
</ul>
<h3 id="articleHeader41">margin 和 padding 分别适合什么场景使用？</h3>
<ul>
<li>需要在 border 外侧添加空白，且空白处不需要背景（色）时，使用 margin</li>
<li>需要在 border 内测添加空白，且空白处需要背景（色）时，使用 padding</li>
</ul>
<h3 id="articleHeader42">抽离样式模块怎么写，说出思路？</h3>
<p>CSS 可以拆分成 2 部分：公共 CSS 和 业务 CSS：</p>
<ul>
<li>网站的配色，字体，交互提取出为公共 CSS。这部分 CSS 命名不应涉及具体的业务</li>
<li>对于业务 CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的 CSS</li>
</ul>
<h3 id="articleHeader43">元素竖向的百分比设定是相对于容器的高度吗？</h3>
<p>元素竖向的百分比设定是相对于容器的宽度，而不是高度</p>
<h3 id="articleHeader44">全屏滚动的原理是什么？ 用到了 CSS 的那些属性？</h3>
<ul>
<li>原理类似图片轮播原理，超出隐藏部分，滚动时显示</li>
<li>可能用到的 CSS 属性：overflow:hidden; transform:translate(100%, 100%); display:none;</li>
</ul>
<h3 id="articleHeader45">什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？</h3>
<ul>
<li>响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本</li>
<li>基本原理是利用 CSS3 媒体查询，为不同尺寸的设备适配不同样式</li>
<li>对于低版本的 IE，可采用 JS 获取屏幕宽度，然后通过 resize 方法来实现兼容：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).resize(function () {
    screenRespond();
});

screenRespond();

function screenRespond(){

    var screenWidth = $(window).width();

    if(screenWidth <= 1800){
        $(&quot;body&quot;).attr(&quot;class&quot;, &quot;w1800&quot;);
    }

    if(screenWidth <= 1400){
        $(&quot;body&quot;).attr(&quot;class&quot;, &quot;w1400&quot;);
    }

    if(screenWidth > 1800){
        $(&quot;body&quot;).attr(&quot;class&quot;, &quot;&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    screenRespond();
});

screenRespond();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">screenRespond</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">var</span> screenWidth = $(<span class="hljs-built_in">window</span>).width();

    <span class="hljs-keyword">if</span>(screenWidth &lt;= <span class="hljs-number">1800</span>){
        $(<span class="hljs-string">"body"</span>).attr(<span class="hljs-string">"class"</span>, <span class="hljs-string">"w1800"</span>);
    }

    <span class="hljs-keyword">if</span>(screenWidth &lt;= <span class="hljs-number">1400</span>){
        $(<span class="hljs-string">"body"</span>).attr(<span class="hljs-string">"class"</span>, <span class="hljs-string">"w1400"</span>);
    }

    <span class="hljs-keyword">if</span>(screenWidth &gt; <span class="hljs-number">1800</span>){
        $(<span class="hljs-string">"body"</span>).attr(<span class="hljs-string">"class"</span>, <span class="hljs-string">""</span>);
    }
}</code></pre>
<h3 id="articleHeader46">什么是视差滚动效果，如何给每页做不同的动画？</h3>
<ul>
<li>视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，具有非常出色的视觉体验</li>
<li>一般把网页解剖为：背景层、内容层和悬浮层。当滚动鼠标滚轮时，各图层以不同速度移动，形成视差的</li>
</ul>
<p>实现原理</p>
<ul>
<li>以 “页面滚动条” 作为 “视差动画进度条”</li>
<li>以 “滚轮刻度” 当作 “动画帧度” 去播放动画的</li>
<li>监听 mousewheel 事件，事件被触发即播放动画，实现“翻页”效果</li>
</ul>
<h3 id="articleHeader47">a 标签上四个伪类的执行顺序是怎么样的？</h3>
<p>link &gt; visited &gt; hover &gt; active</p>
<h3 id="articleHeader48">伪元素和伪类的区别和作用？</h3>
<p>伪元素:在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p::before {content:&quot;第一章：&quot;;}
p::after {content:&quot;Hot!&quot;;}
p::first-line {background:red;}
p::first-letter {font-size:30px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::before</span> {<span class="hljs-attribute">content</span>:<span class="hljs-string">"第一章："</span>;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::after</span> {<span class="hljs-attribute">content</span>:<span class="hljs-string">"Hot!"</span>;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-line</span> {<span class="hljs-attribute">background</span>:red;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-letter</span> {<span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;}</code></pre>
<p>伪类: 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a:hover {color: #FF00FF}
p:first-child {color: red}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {<span class="hljs-attribute">color</span>: <span class="hljs-number">#FF00FF</span>}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:first-child</span> {<span class="hljs-attribute">color</span>: red}</code></pre>
<h3 id="articleHeader49">::before 和 :after 中双冒号和单冒号有什么区别？</h3>
<ul>
<li>在 CSS 中伪类一直用 : 表示，如 :hover, :active 等</li>
<li>伪元素在 CSS1 中已存在，当时语法是用 : 表示，如 :before 和 :after</li>
<li>后来在 CSS3 中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪类</li>
<li>由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素</li>
<li>综上所述：::before 是 CSS3 中写伪元素的新语法； :after 是 CSS1 中存在的、兼容 IE 的老语法</li>
</ul>
<h3 id="articleHeader50">如何修改 Chrome 记住密码后自动填充表单的黄色背景？</h3>
<ul>
<li>产生原因：由于 Chrome 默认会给自动填充的 input 表单加上 input:-webkit-autofill 私有属性造成的</li>
<li>解决方案 1：在 form 标签上直接关闭了表单的自动填充：autocomplete="off"</li>
<li>解决方案 2：input:-webkit-autofill { background-color: transparent; }</li>
</ul>
<p>input [type=search] 搜索框右侧小图标如何美化？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=&quot;search&quot;]::-webkit-search-cancel-button{
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background:url(&quot;images/searchicon.png&quot;) no-repeat 0 0;
  background-size: 15px 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-cancel-button</span>{
  <span class="hljs-attribute">-webkit-appearance</span>: none;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"images/searchicon.png"</span>) no-repeat <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-size</span>: <span class="hljs-number">15px</span> <span class="hljs-number">15px</span>;
}</code></pre>
<h3 id="articleHeader51">网站图片文件，如何点击下载？而非点击预览？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;logo.jpg&quot; download>下载</a> <a href=&quot;logo.jpg&quot; download=&quot;网站LOGO&quot; >下载</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"logo.jpg"</span> <span class="hljs-attr">download</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"logo.jpg"</span> <span class="hljs-attr">download</span>=<span class="hljs-string">"网站LOGO"</span> &gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader52">iOS safari 如何阻止“橡皮筋效果”？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $(document).ready(function(){
      var stopScrolling = function(event) {
          event.preventDefault();
      }
      document.addEventListener('touchstart', stopScrolling, false);
      document.addEventListener('touchmove', stopScrolling, false);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> stopScrolling = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
          event.preventDefault();
      }
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, stopScrolling, <span class="hljs-literal">false</span>);
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, stopScrolling, <span class="hljs-literal">false</span>);
  });</code></pre>
<h3 id="articleHeader53">你对 line-height 是如何理解的？</h3>
<ul>
<li>line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离</li>
<li>如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的</li>
<li>一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容</li>
<li>把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中</li>
<li>line-height 和 height 都能撑开一个高度，height 会触发 haslayout，而 line-height 不会</li>
</ul>
<h3 id="articleHeader54">line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）</h3>
<ul>
<li>带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高</li>
<li>纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px</li>
<li>百分比：将计算后的值传递给后代</li>
</ul>
<h3 id="articleHeader55">设置元素浮动后，该元素的 display 值会如何变化？</h3>
<p>设置元素浮动后，该元素的 display 值自动变成 block</p>
<h3 id="articleHeader56">怎么让 Chrome 支持小于 12px 的文字？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .shrink{
    -webkit-transform:scale(0.8);
    -o-transform:scale(1);
    display:inline-block;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-class">.shrink</span>{
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">scale</span>(0.8);
    <span class="hljs-attribute">-o-transform</span>:<span class="hljs-built_in">scale</span>(1);
    <span class="hljs-attribute">display</span>:inline-block;
  }</code></pre>
<h3 id="articleHeader57">让页面里的字体变清晰，变细用 CSS 怎么做？（IOS 手机浏览器字体齿轮设置）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  -webkit-font-smoothing: antialiased;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;">  -webkit-<span class="hljs-attribute">font</span>-smoothing: antialiased;</code></pre>
<h3 id="articleHeader58">font-style 属性 oblique 是什么意思？</h3>
<p>font-style: oblique; 使没有 italic 属性的文字实现倾斜</p>
<h3 id="articleHeader59">如果需要手动写动画，你认为最小时间间隔是多久？</h3>
<p>16.7ms 多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔: 1s / 60 * 1000 ＝ 16.7ms</p>
<h3 id="articleHeader60">overflow: scroll 时不能平滑滚动的问题怎么处理？</h3>
<p>监听滚轮事件，然后滚动到一定距离时用 jquery 的 animate 实现平滑效果。</p>
<h3 id="articleHeader61">一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度</h3>
<ul>
<li>方案 1： .sub { height: calc(100%-100px); }</li>
<li>方案 2： .container { position:relative; } .sub { position: absolute; top: 100px; bottom: 0; }</li>
<li>方案 3： .container { display:flex; flex-direction:column; } .sub { flex:1; }</li>
</ul>
<h3 id="articleHeader62">CSS 中类 class 和 id 的区别</h3>
<p>对于 CSS 而言，id 和 class 都是选择器，唯一不同的地方在于权重不同。如果只说 CSS，上面那一句话就讲完了。拓展出来，对于 html 而言，id 和 class 都是 dom 元素的属性值。不同的地方在于 id 属性的值是唯一的，而 class 属性值可以重复。id 还一个老特性是锚点功能，当浏览器地址栏有一个#xxx，页面会自动滚动到 id=xxx 的元素上面。</p>
<p>更直接的：id 给 js 用，class 给 css 用（趋势）</p>
<h3 id="articleHeader63">如何优化网页的打印样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; media=&quot;screen&quot; href=&quot;xxx.css&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code style="word-break: break-word; white-space: initial;">&lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/css"</span> media=<span class="hljs-string">"screen"</span> href=<span class="hljs-string">"xxx.css"</span> /&gt;</code></pre>
<p>其中 media 指定的属性就是设备，显示器上就是 screen，打印机则是 print，电视是 tv，投影仪是 projection。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; media=&quot;print&quot; href=&quot;yyy.css&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code style="word-break: break-word; white-space: initial;"> &lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/css"</span> media=<span class="hljs-string">"print"</span> href=<span class="hljs-string">"yyy.css"</span> /&gt;</code></pre>
<p>但打印样式表也应有些注意事项：</p>
<ul>
<li>打印样式表中最好不要用背景图片，因为打印机不能打印 CSS 中的背景。如要显示图片，请使用 html 插入到页面中。</li>
<li>最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用 pt 和 cm。</li>
<li>隐藏掉不必要的内容。（@print div{display:none;}）</li>
<li>打印样式表中最好少用浮动属性，因为它们会消失。</li>
</ul>
<h3 id="articleHeader64">请问为何要使用 transform 而非 absolute positioning，或反之的理由？为什么？</h3>
<ul>
<li>使用 transform 或 position 实现动画效果时是有很大差别。</li>
<li>使用 transform 时，可以让 GPU 参与运算，动画的 FPS 更高。</li>
<li>使用 position 时，最小的动画变化的单位是 1px，而使用 transform 参与时，可以做到更小（动画效果更加平滑）</li>
<li>功能都一样。但是 translate 不会引起浏览器的重绘和重排，这就相当 nice 了。</li>
</ul>
<p>反之</p>
<ul>
<li>tranform 改变 fixed 子元素的定位对象</li>
<li>transform 改变元素层叠顺序<br><a href="http://imweb.io/topic/5a23e1f1a192c3b460fce26e" rel="nofollow noreferrer" target="_blank">transform 的副作用</a>
</li>
</ul>
<h3 id="articleHeader65">请解释 CSS sprites，以及你要如何在页面或网站中实现它</h3>
<ul>
<li>CSS Sprites 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position 可以用数字能精确的定位出背景图片的位置。</li>
<li>CSS Sprites 为一些大型的网站节约了带宽，让提高了用户的加载速度和用户体验，不需要加载更多的图片。</li>
</ul>
<h3 id="articleHeader66">你熟悉 SVG 样式的书写吗？</h3>
<table>
<thead><tr>
<th>SVG</th>
<th>等效的 CSS</th>
</tr></thead>
<tbody>
<tr>
<td>fill</td>
<td>background-color 或 color</td>
</tr>
<tr>
<td>fill-opacity</td>
<td>background-color 或 color 设置 rgba/hsla</td>
</tr>
<tr>
<td>opacity</td>
<td>opacity</td>
</tr>
<tr>
<td>stroke</td>
<td>border-color</td>
</tr>
<tr>
<td>stroke-width</td>
<td>border-thickness</td>
</tr>
<tr>
<td>stroke-opacity</td>
<td>border-color 设置 rgba</td>
</tr>
<tr>
<td>rx, ry</td>
<td>border-radius</td>
</tr>
</tbody>
</table>
<p>下面的属性在 SVG 和 CSS 中是一样的，只是在 SVG 的 transformations 和 dimensions 中稍有区别：</p>
<ul>
<li>font-family, font-size, font-style, font-variant 和 font-weight</li>
<li>width 和 height</li>
<li>scale, rotate, skew</li>
</ul>
<p>参考链接： <a href="http://justcode.ikeepstudying.com/2016/08/%E5%9F%BA%E6%9C%AC%E7%9A%84svg%E6%A0%B7%E5%BC%8F%E5%B1%9E%E6%80%A7/" rel="nofollow noreferrer" target="_blank">基本的 SVG 样式属性</a></p>
<h3 id="articleHeader67">如果设计中使用了非标准的字体，你该如何去实现？</h3>
<ul>
<li>用图片代替</li>
<li>web fonts 在线字库</li>
<li>@font-face</li>
</ul>
<p>参考链接：<a href="https://blog.csdn.net/xujie_0311/article/details/42368371" rel="nofollow noreferrer" target="_blank">如果设计中使用了非标准的字体，你该如何去实现？</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试BAT，你凭什么说你掌握了CSS

## 原文链接
[https://segmentfault.com/a/1190000016655884](https://segmentfault.com/a/1190000016655884)

