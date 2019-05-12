---
title: '前端面试之CSS3新特性' 
date: 2019-01-09 2:30:12
hidden: true
slug: 8rpbz2l30t7
categories: [reprint]
---

{{< raw >}}

                    
<p>除了html5的新特性，CSS3的新特性也是面试中经常被问到的。</p>
<h1 id="articleHeader0">选择器</h1>
<p>CSS3中新添加了很多选择器，解决了很多之前需要用javascript才能解决的布局问题。</p>
<ol>
<li><p>element1~element2: 选择前面有element1元素的每个element2元素。</p></li>
<li>
</li>
<li>
</li>
<li>
</li>
<li><p>E:first-of-type: 选择属于其父元素的首个E元素的每个E元素。</p></li>
<li><p>E:last-of-type: 选择属于其父元素的最后E元素的每个E元素。</p></li>
<li><p>E:only-of-type: 选择属于其父元素唯一的E元素的每个E元素。</p></li>
<li><p>E:only-child: 选择属于其父元素的唯一子元素的每个E元素。</p></li>
<li><p>E:nth-child(n): 选择属于其父元素的第n个子元素的每个E元素。</p></li>
<li><p>E:nth-last-child(n): 选择属于其父元素的倒数第n个子元素的每个E元素。</p></li>
<li><p>E:nth-of-type(n): 选择属于其父元素第n个E元素的每个E元素。</p></li>
<li><p>E:nth-last-of-type(n): 选择属于其父元素倒数第n个E元素的每个E元素。</p></li>
<li><p>E:last-child: 选择属于其父元素最后一个子元素每个E元素。</p></li>
<li><p>:root: 选择文档的根元素。</p></li>
<li><p>E:empty: 选择没有子元素的每个E元素（包括文本节点)。</p></li>
<li><p>E:target: 选择当前活动的E元素。</p></li>
<li><p>E:enabled: 选择每个启用的E元素。</p></li>
<li><p>E:disabled: 选择每个禁用的E元素。</p></li>
<li><p>E:checked: 选择每个被选中的E元素。</p></li>
<li><p>E:not(selector): 选择非selector元素的每个元素。</p></li>
<li><p>E::selection: 选择被用户选取的元素部分。</p></li>
</ol>
<h1 id="articleHeader1">Transition,Transform和Animation</h1>
<p>这三个特性是CSS3新增的和动画相关的特性。</p>
<h2 id="articleHeader2">Transition</h2>
<p>Transition可以在当元素从一种样式变换为另一种样式时为元素添加效果，而不用使用Flash动画或JavaScript。<br>Transition有如下属性：</p>
<ol>
<li><p>transition-property: 规定应用过渡的CSS属性的名称。</p></li>
<li><p>transition-duration: 规定完成过渡效果需要多长时间。</p></li>
<li><p>transition-delay: 规定过渡效果何时开始，默认是0。</p></li>
<li><p>transition-timing-function: 规定过渡效果的时间曲线，默认是"ease"，还有linear、ease-in、ease-out、ease-in-out和cubic-bezier等过渡类型。</p></li>
<li><p>transition: 简写属性，用于在一个属性中设置四个过渡属性。</p></li>
</ol>
<p>在一个例子中使用所有过渡属性如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    transition-property: width;
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
    /* Firefox 4 */
    -moz-transition-property:width;
    -moz-transition-duration:1s;
    -moz-transition-timing-function:linear;
    -moz-transition-delay:2s;
    /* Safari 和 Chrome */
    -webkit-transition-property:width;
    -webkit-transition-duration:1s;
    -webkit-transition-timing-function:linear;
    -webkit-transition-delay:2s;
    /* Opera */
    -o-transition-property:width;
    -o-transition-duration:1s;
    -o-transition-timing-function:linear;
    -o-transition-delay:2s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">transition-property</span>: width;
    <span class="hljs-attribute">transition-duration</span>: <span class="hljs-number">1s</span>;
    <span class="hljs-attribute">transition-timing-function</span>: linear;
    <span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Firefox 4 */</span>
    <span class="hljs-attribute">-moz-transition-property</span>:width;
    <span class="hljs-attribute">-moz-transition-duration</span>:<span class="hljs-number">1s</span>;
    <span class="hljs-attribute">-moz-transition-timing-function</span>:linear;
    <span class="hljs-attribute">-moz-transition-delay</span>:<span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Safari 和 Chrome */</span>
    <span class="hljs-attribute">-webkit-transition-property</span>:width;
    <span class="hljs-attribute">-webkit-transition-duration</span>:<span class="hljs-number">1s</span>;
    <span class="hljs-attribute">-webkit-transition-timing-function</span>:linear;
    <span class="hljs-attribute">-webkit-transition-delay</span>:<span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Opera */</span>
    <span class="hljs-attribute">-o-transition-property</span>:width;
    <span class="hljs-attribute">-o-transition-duration</span>:<span class="hljs-number">1s</span>;
    <span class="hljs-attribute">-o-transition-timing-function</span>:linear;
    <span class="hljs-attribute">-o-transition-delay</span>:<span class="hljs-number">2s</span>;
}</code></pre>
<p>使用transition属性简写如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    transition: width 1s linear 2s;
    /* Firefox 4 */
    -moz-transition:width 1s linear 2s;
    /* Safari and Chrome */
    -webkit-transition:width 1s linear 2s;
    /* Opera */
    -o-transition:width 1s linear 2s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">transition</span>: width <span class="hljs-number">1s</span> linear <span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Firefox 4 */</span>
    <span class="hljs-attribute">-moz-transition</span>:width <span class="hljs-number">1s</span> linear <span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Safari and Chrome */</span>
    <span class="hljs-attribute">-webkit-transition</span>:width <span class="hljs-number">1s</span> linear <span class="hljs-number">2s</span>;
    <span class="hljs-comment">/* Opera */</span>
    <span class="hljs-attribute">-o-transition</span>:width <span class="hljs-number">1s</span> linear <span class="hljs-number">2s</span>;
}</code></pre>
<h2 id="articleHeader3">Transform</h2>
<p>Transform用来向元素应用各种2D和3D转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜等操作。使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    transform:rotate(7deg);
    -ms-transform:rotate(7deg);     /* IE 9 */
    -moz-transform:rotate(7deg);    /* Firefox */
    -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    -o-transform:rotate(7deg);  /* Opera */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(7deg);
    <span class="hljs-attribute">-ms-transform</span>:<span class="hljs-built_in">rotate</span>(7deg);     <span class="hljs-comment">/* IE 9 */</span>
    <span class="hljs-attribute">-moz-transform</span>:<span class="hljs-built_in">rotate</span>(7deg);    <span class="hljs-comment">/* Firefox */</span>
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">rotate</span>(7deg); <span class="hljs-comment">/* Safari 和 Chrome */</span>
    <span class="hljs-attribute">-o-transform</span>:<span class="hljs-built_in">rotate</span>(7deg);  <span class="hljs-comment">/* Opera */</span>
}</code></pre>
<h3 id="articleHeader4">变换类型</h3>
<p>transform可以有各种变换类型，即属性值：</p>
<ol>
<li><p>none: 定义不进行转换。</p></li>
<li><p>matrix(n,n,n,n,n,n): 定义2D转换，使用六个值的矩阵。</p></li>
<li><p>matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n): 定义3D转换，使用16个值的4x4矩阵。</p></li>
<li><p>translate(x,y): 定义2D位移转换。</p></li>
<li><p>translate3d(x,y,z): 定义3D位移转换。</p></li>
<li><p>translateX(x): 定义位移转换，只是用X轴的值。</p></li>
<li><p>translateY(y): 定义位移转换，只是用Y轴的值。</p></li>
<li><p>translateZ(z): 定义3D位移转换，只是用Z轴的值。</p></li>
<li><p>scale(x,y): 定义2D缩放转换。</p></li>
<li><p>scale3d(x,y,z): 定义3D缩放转换。</p></li>
<li><p>scaleX(x): 通过设置X轴的值来定义缩放转换。</p></li>
<li><p>scaleY(y): 通过设置Y轴的值来定义缩放转换。</p></li>
<li><p>scaleZ(z): 通过设置Z轴的值来定义3D缩放转换。</p></li>
<li><p>rotate(angle): 定义2D旋转，在参数中规定角度。</p></li>
<li><p>rotate3d(x,y,z,angle): 定义3D旋转。</p></li>
<li><p>rotateX(angle): 定义沿着X轴的3D旋转。</p></li>
<li><p>rotateY(angle): 定义沿着Y轴的3D旋转。</p></li>
<li><p>rotateZ(angle): 定义沿着Z轴的3D旋转。</p></li>
<li><p>skew(x-angle,y-angle): 定义沿着X和Y轴的2D倾斜转换。</p></li>
<li><p>skewX(angle): 定义沿着X轴的2D倾斜转换。</p></li>
<li><p>skewY(angle): 定义沿着Y轴的2D倾斜转换。</p></li>
<li><p>perspective(n): 为3D转换元素定义透视视图。</p></li>
</ol>
<h3 id="articleHeader5">浏览器支持</h3>
<p>Internet Explorer 10、Firefox、Opera 支持 transform 属性。    <br>Internet Explorer 9 支持替代的 -ms-transform 属性（仅适用于 2D 转换）。      <br>Safari 和 Chrome 支持替代的 -webkit-transform 属性（3D 和 2D 转换）。      <br>Opera 只支持 2D 转换。</p>
<h2 id="articleHeader6">Animation</h2>
<p>Animation让CSS拥有了可以制作动画的功能。使用CSS3的Animation制作动画我们可以省去复杂的js代码。使用方法大概如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@-webkit-keyframes anim1 { 
   0% { 
        opacity: 0; 
        font-size: 12px; 
   } 
   100% { 
        opacity: 1; 
        font-size: 24px; 
   } 
} 
.anim1Div { 
   -webkit-animation-name: anim1 ; 
   -webkit-animation-duration: 1.5s; 
   -webkit-animation-iteration-count: 4; 
   -webkit-animation-direction: alternate; 
   -webkit-animation-timing-function: ease-in-out; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> anim1 { 
   0% { 
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; 
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>; 
   } 
   100% { 
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; 
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>; 
   } 
} 
<span class="hljs-selector-class">.anim1Div</span> { 
   <span class="hljs-attribute">-webkit-animation-name</span>: anim1 ; 
   <span class="hljs-attribute">-webkit-animation-duration</span>: <span class="hljs-number">1.5s</span>; 
   <span class="hljs-attribute">-webkit-animation-iteration-count</span>: <span class="hljs-number">4</span>; 
   <span class="hljs-attribute">-webkit-animation-direction</span>: alternate; 
   <span class="hljs-attribute">-webkit-animation-timing-function</span>: ease-in-out; 
}</code></pre>
<p>具体用法可以参考教程：<a href="http://www.w3cplus.com/content/css3-animation" rel="nofollow noreferrer" target="_blank">CSS3 Animation</a>。</p>
<h1 id="articleHeader7">边框</h1>
<p>CSS3新增了三个边框属性，分别是border-radius、box-shadow和border-image。border-radius可以创建圆角边框，box-shadow可以为元素添加阴影，border-image可以使用图片来绘制边框。IE9+支持border-radius和box-shadow属性。Firefox、Chrome以及Safari支持所有新的边框属性。</p>
<h1 id="articleHeader8">背景</h1>
<p>CSS3新增了几个关于背景的属性，分别是background-clip、background-origin、background-size和background-break。</p>
<h2 id="articleHeader9">background-clip</h2>
<p>background-clip属性用于确定背景画区，有以下几种可能的属性：</p>
<ul>
<li><p>background-clip: border-box; 背景从border开始显示</p></li>
<li><p>background-clip: padding-box; 背景从padding开始显示</p></li>
<li><p>background-clip: content-box; 背景显content区域开始显示</p></li>
<li><p>background-clip: no-clip; 默认属性，等同于border-box</p></li>
</ul>
<p>通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围。</p>
<h2 id="articleHeader10">background-clip</h2>
<p>background-clip属性用于确定背景的位置，它通常与background-position联合使用，可以从 border、padding、content来计算background-position（就像background-clip）。</p>
<ul>
<li><p>background-origin: border-box; 从border开始计算background-position</p></li>
<li><p>background-origin: padding-box; 从padding开始计算background-position</p></li>
<li><p>background-origin: content-box; 从content开始计算background-position</p></li>
</ul>
<h2 id="articleHeader11">background-size</h2>
<p>background-size属性常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：</p>
<ul>
<li><p>background-size: contain; 缩小图片以适合元素（维持像素长宽比）</p></li>
<li><p>background-size: cover; 扩展元素以填补元素（维持像素长宽比）</p></li>
<li><p>background-size: 100px 100px; 缩小图片至指定的大小</p></li>
<li><p>background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸</p></li>
</ul>
<h2 id="articleHeader12">background-break</h2>
<p>CSS3中，元素可以被分成几个独立的盒子（如使内联元素span跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示。</p>
<ul>
<li><p>background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）</p></li>
<li><p>background-break: bounding-box; 把盒之间的距离计算在内；</p></li>
<li><p>background-break: each-box; 为每个盒子单独重绘背景。</p></li>
</ul>
<h1 id="articleHeader13">文字效果</h1>
<h2 id="articleHeader14">word-wrap</h2>
<p>CSS3中，word-wrap属性允许您允许文本强制文本进行换行，即这意味着会对单词进行拆分。所有主流浏览器都支持 word-wrap 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    word-wrap:break-word;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">word-wrap</span>:break-word;
}</code></pre>
<h2 id="articleHeader15">text-overflow</h2>
<p>它与word-wrap是协同工作的，word-wrap设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow则设置或检索当当前行超过指定容器的边界时如何显示。对于“text-overflow”属性，有“clip”和“ellipsis”两种可供选择。</p>
<h2 id="articleHeader16">text-shadow</h2>
<p>CSS3中，text-shadow可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1{
    text-shadow: 5px 5px 5px #FF0000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">5px</span> <span class="hljs-number">5px</span> <span class="hljs-number">5px</span> <span class="hljs-number">#FF0000</span>;
}</code></pre>
<h2 id="articleHeader17">text-decoration</h2>
<p>CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：</p>
<ol>
<li><p>text-fill-color: 设置文字内部填充颜色</p></li>
<li><p>text-stroke-color: 设置文字边界填充颜色</p></li>
<li><p>text-stroke-width: 设置文字边界宽度</p></li>
</ol>
<h1 id="articleHeader18">渐变</h1>
<p>CSS3新增了渐变效果，包括linear-gradient(线性渐变)和radial-gradient(径向渐变)。具体用法参考教程：<a href="http://www.w3cplus.com/content/css3-gradient" rel="nofollow noreferrer" target="_blank">CSS3 Gradient</a></p>
<h1 id="articleHeader19">@font-face特性</h1>
<p>在CSS3之前，web设计师必须使用已在用户计算机上安装好的字体。通过CSS3，web设计师可以使用他们喜欢的任意字体。当您您找到或购买到希望使用的字体时，可将该字体文件存放到web服务器上，它会在需要时被自动下载到用户的计算机上。字体是在 CSS3 @font-face 规则中定义的。Firefox、Chrome、Safari以及Opera支持 .ttf(True Type Fonts)和 .otf(OpenType Fonts)类型的字体。IE9+ 支持新的@font-face规则，但是仅支持 .eot类型的字体(Embedded OpenType)。</p>
<p>在新的@font-face规则中，必须首先定义字体的名称（比如myFont），然后指向该字体文件。<br>如需为HTML元素使用字体，请通过font-family属性来引用字体的名称 (myFont)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {
    font-family: myFirstFont;
    src: url('Sansation_Light.ttf'),
         url('Sansation_Light.eot'); /* IE9+ */
}
div{
    font-family:myFirstFont;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">font-face</span> {
    <span class="hljs-attribute">font-family</span>: myFirstFont;
    <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'Sansation_Light.ttf'</span>),
         <span class="hljs-built_in">url</span>(<span class="hljs-string">'Sansation_Light.eot'</span>); <span class="hljs-comment">/* IE9+ */</span>
}
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">font-family</span>:myFirstFont;
}</code></pre>
<h1 id="articleHeader20">多列布局</h1>
<p>通过CSS3，能够创建多个列来对文本进行布局，IE10和Opera支持多列属性。Firefox 需要前缀-moz-，Chrome和Safari需要前缀-webkit-。主要有如下三个属性：</p>
<ol>
<li><p>column-count: 规定元素应该被分隔的列数。</p></li>
<li><p>column-gap: 规定列之间的间隔。</p></li>
<li><p>column-rule: 设置列之间的宽度、样式和颜色规则</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    -moz-column-count:3;    /* Firefox */
    -webkit-column-count:3; /* Safari 和 Chrome */
    column-count:3;
    -moz-column-gap:40px;       /* Firefox */
    -webkit-column-gap:40px;    /* Safari 和 Chrome */
    column-gap:40px;
    -moz-column-rule:3px outset #ff0000;    /* Firefox */
    -webkit-column-rule:3px outset #ff0000; /* Safari and Chrome */
    column-rule:3px outset #ff0000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">-moz-column-count</span>:<span class="hljs-number">3</span>;    <span class="hljs-comment">/* Firefox */</span>
    <span class="hljs-attribute">-webkit-column-count</span>:<span class="hljs-number">3</span>; <span class="hljs-comment">/* Safari 和 Chrome */</span>
    <span class="hljs-attribute">column-count</span>:<span class="hljs-number">3</span>;
    <span class="hljs-attribute">-moz-column-gap</span>:<span class="hljs-number">40px</span>;       <span class="hljs-comment">/* Firefox */</span>
    <span class="hljs-attribute">-webkit-column-gap</span>:<span class="hljs-number">40px</span>;    <span class="hljs-comment">/* Safari 和 Chrome */</span>
    <span class="hljs-attribute">column-gap</span>:<span class="hljs-number">40px</span>;
    <span class="hljs-attribute">-moz-column-rule</span>:<span class="hljs-number">3px</span> outset <span class="hljs-number">#ff0000</span>;    <span class="hljs-comment">/* Firefox */</span>
    <span class="hljs-attribute">-webkit-column-rule</span>:<span class="hljs-number">3px</span> outset <span class="hljs-number">#ff0000</span>; <span class="hljs-comment">/* Safari and Chrome */</span>
    <span class="hljs-attribute">column-rule</span>:<span class="hljs-number">3px</span> outset <span class="hljs-number">#ff0000</span>;
}</code></pre>
<h1 id="articleHeader21">用户界面</h1>
<p>CSS3中，新的用户界面特性包括重设元素尺寸、盒尺寸以及轮廓等。Firefox、Chrome以及Safari 支持resize属性。IE、Chrome、Safari以及Opera支持box-sizing属性。Firefox需要前缀-moz-。<br>所有主流浏览器都支持outline-offset属性，除了IE。</p>
<h2 id="articleHeader22">resize</h2>
<p>resize 属性规定是否可由用户调整元素尺寸。如果希望此属性生效，需要设置元素的 overflow 属性，值可以是 auto、hidden 或 scroll。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    resize:both; /* none|both|horizontal|vertical; */
    overflow:auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">resize</span>:both; <span class="hljs-comment">/* none|both|horizontal|vertical; */</span>
    <span class="hljs-attribute">overflow</span>:auto;
}</code></pre>
<h2 id="articleHeader23">box-sizing</h2>
<p>box-sizing属性可设置的值有content-box、border-box和inherit。</p>
<ol>
<li><p>content-box: padding和border不被包含在定义的width和height之内。对象的实际宽度等于设置的width值和border、padding之和，即 (Element width = width + border + padding)，此属性表现为标准模式下的盒模型。</p></li>
<li><p>border-box: padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 (Element width = width)，此属性表现为怪异模式下的盒模型。</p></li>
</ol>
<h2 id="articleHeader24">outline-offset</h2>
<p>outline-offset属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试之CSS3新特性

## 原文链接
[https://segmentfault.com/a/1190000010089434](https://segmentfault.com/a/1190000010089434)

