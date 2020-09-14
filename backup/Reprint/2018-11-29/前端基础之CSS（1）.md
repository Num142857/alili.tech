---
title: '前端基础之CSS（1）' 
date: 2018-11-29 9:34:56
hidden: true
slug: 8888ci8m3pg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.css3的新特性有哪些</h2>
<p>（1）CSS3选择器（基本、属性、伪类具体见下）<br> （2）CSS3边框与圆角</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     圆角border-radius  
     属性：border-top-left-radius 左上角 border-top-right-radius
     右上角 border-bottom-right-radius 右下角 border-bottom-left-radius 左下角
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>     圆角<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>  
     属性：<span class="hljs-built_in">border</span>-top-left-<span class="hljs-built_in">radius</span> 左上角 <span class="hljs-built_in">border</span>-top-right-<span class="hljs-built_in">radius</span>
     右上角 <span class="hljs-built_in">border</span>-bottom-right-<span class="hljs-built_in">radius</span> 右下角 <span class="hljs-built_in">border</span>-bottom-left-<span class="hljs-built_in">radius</span> 左下角
</code></pre>
<p>（3）CSS3背景与渐变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 可以设置多个背景图片，图片大小，位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 可以设置多个背景图片，图片大小，位置</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbaMmz?w=740&amp;h=292" src="https://static.alili.tech/img/bVbaMmz?w=740&amp;h=292" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="线性渐变
background: linear-gradient(direction, color-stop1, color-stop2, ...);
direction也可以换成edge
径向渐变
background: radial-gradient(center, shape size, start-color, ..., last-color);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>线性渐变
<span class="hljs-built_in">background</span>: <span class="hljs-built_in">linear</span>-gradient(direction, <span class="hljs-built_in">color</span>-stop1, <span class="hljs-built_in">color</span>-stop2, ...);
direction也可以换成edge
径向渐变
<span class="hljs-built_in">background</span>: radial-gradient(<span class="hljs-built_in">center</span>, shape size, start-<span class="hljs-built_in">color</span>, ..., <span class="hljs-built_in">last</span>-<span class="hljs-built_in">color</span>);
</code></pre>
<p>（4）CSS3过渡</p>
<p><span class="img-wrap"><img data-src="/img/bVbaMi7?w=746&amp;h=240" src="https://static.alili.tech/img/bVbaMi7?w=746&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br> （5）CSS3变换<br>2D变换<br><span class="img-wrap"><img data-src="/img/bVbaMHK?w=748&amp;h=538" src="https://static.alili.tech/img/bVbaMHK?w=748&amp;h=538" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   3D变换<br>兼容性了解一下<br><span class="img-wrap"><img data-src="/img/bVbaMIJ?w=750&amp;h=343" src="https://static.alili.tech/img/bVbaMIJ?w=750&amp;h=343" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbaMLi?w=746&amp;h=633" src="https://static.alili.tech/img/bVbaMLi?w=746&amp;h=633" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br> （6）CSS3动画<br>在style中给动画一个名字，就是规定动画，使用@keyframes<br><span class="img-wrap"><img data-src="/img/bVbaMOp?w=742&amp;h=480" src="https://static.alili.tech/img/bVbaMOp?w=742&amp;h=480" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://segmentfault.com/a/1190000010936764">这篇文章写的比较有条理，看完可以知道大概，但是每个特性具体如何使用，还需要再找资料深入的看</a></p>
<h2 id="articleHeader1">2.垂直居中</h2>
<ol>
<li>margin：auto的垂直居中，需配合position：absolute一起使用，因为margin：auto不识别上下，只识别左右</li>
<li>translate的垂直居中移动-50%，也需要position定位，因为要根据坐标</li>
</ol>
<p><a href="https://segmentfault.com/a/1190000014620028" target="_blank">这篇文章总结的很好，没错没错，就是我写的啦o(<em>////▽////</em>)q，凑表要脸</a></p>
<h2 id="articleHeader2">3.flex</h2>
<p>一方面是在父容器的几个属性，另一些就是子元素的属性<br>容器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    flex-direction                 子元素排列方向
    flex-wrap                      如果一条轴线排不下，如何换行
    flex-flow                      flex-direction属性和flex-wrap属性的简写形式
    justify-content                在主轴上的对齐方式
    align-items                    在交叉轴上如何对齐
    align-content                  多根轴线的对齐方式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>    <span class="hljs-attribute">flex-direction</span>                 子元素排列方向
    <span class="hljs-attribute">flex-wrap</span>                      如果一条轴线排不下，如何换行
    <span class="hljs-attribute">flex-flow</span>                      <span class="hljs-attribute">flex-direction</span>属性和<span class="hljs-attribute">flex-wrap</span>属性的简写形式
    <span class="hljs-attribute">justify-content</span>                在主轴上的对齐方式
    <span class="hljs-attribute">align-items</span>                    在交叉轴上如何对齐
    <span class="hljs-attribute">align-content</span>                  多根轴线的对齐方式
</code></pre>
<p>设置在具体的每一项上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    order             排列顺序。数值越小，排列越靠前，默认为0
    flex-grow         项目的放大比例，默认为0，即如果存在剩余空间，也不放大
    flex-shrink       缩小比例，默认为1，即如果空间不足，该项目将缩小
    flex-basis        在分配多余空间之前，项目占据的主轴空间（main size）
    flex              flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
    align-self        允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>    <span class="hljs-attribute">order</span>             排列顺序。数值越小，排列越靠前，默认为0
    <span class="hljs-attribute">flex-grow</span>         项目的放大比例，默认为0，即如果存在剩余空间，也不放大
    <span class="hljs-attribute">flex-shrink</span>       缩小比例，默认为1，即如果空间不足，该项目将缩小
    <span class="hljs-attribute">flex-basis</span>        在分配多余空间之前，项目占据的主轴空间（main size）
    <span class="hljs-attribute">flex</span>              <span class="hljs-attribute">flex-grow</span>, <span class="hljs-attribute">flex-shrink</span> 和 <span class="hljs-attribute">flex-basis</span>的简写，默认值为0 1 <span class="hljs-attribute">auto</span>
    <span class="hljs-attribute">align-self</span>        允许单个项目有与其他项目不一样的对齐方式，可覆盖<span class="hljs-attribute">align-items</span>属性
</code></pre>
<p><a href="http://www.runoob.com/w3cnote/flex-grammar.html" rel="nofollow noreferrer" target="_blank">菜鸟教程上的就写很好，简单易懂</a><br><a href="https://blog.csdn.net/mr_lp/article/details/50966842" rel="nofollow noreferrer" target="_blank">这篇讲的很全，包括实际例子，还包括布局</a></p>
<h2 id="articleHeader3">4.如何理解css预处理，less,sass 到底有什么好处，或者是优于css的一些特点。</h2>
<p>预处理器：在写css的时候，为了兼容各种浏览器，我们往往需要写很多代码，css预处理器就是为了解决这一问题的，最常用的预处理器有sass、less和styuls</p>
<p>CSS有具体以下几个缺点：</p>
<ul>
<li>语法不够强大，比如无法嵌套书写，导致模块化开发中需要书写很多重复的选择器；</li>
<li>没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。这就导致了我们在工作中无端增加了许多工作量。而使用CSS预处理器，提供 CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性。大大提高了我们的开发效率。</li>
</ul>
<blockquote>但是，CSS预处理器也不是万金油，CSS的好处在于简便、随时随地被使用和调试。预编译CSS步骤的加入，让我们开发工作流中多了一个环节，调试也变得更麻烦了。更大的问题在于，预编译很容易造成后代选择器的滥用。所以我们在实际项目中衡量预编译方案时，还是得想想，比起带来的额外维护开销，CSS预处理器有没有解决更大的麻烦。</blockquote>
<p>Sass</p>
<ul>
<li>变量。通过 $ 符号来定义，通过变量名称实现多处重复引用。</li>
<li>嵌套。支持选择器及属性嵌套，但如果想要在嵌套的选择器里边应用一个类似于：hover的伪类，就需要用到 &amp; 这个连接父选择器的标识符。</li>
<li>代码重用之继承。使用选择器的继承，要使用关键词@extend，后面紧跟需要继承的选择器。</li>
<li>代码重用之Mixin混合器。使用@mixin声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的@mixin通过@include+minxin名称来调用。如果一个参数可以有多组值，如box-shadow、transition等，那么参数则需要在变量后加三个点表示，如$variables...。小栗子，带参数的：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin left($value: 10px) {
    float: left;
    margin-left: $value;
}
div {
    @include left(66px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>@<span class="hljs-keyword">mixin</span> left(<span class="hljs-variable">$value</span>: 10px) {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-variable">$value</span>;
}
<span class="hljs-selector-tag">div</span> {
    @<span class="hljs-keyword">include</span> left(<span class="hljs-number">66px</span>);
}</code></pre>
<ul>
<li>颜色函数。lighten darken</li>
<li>@import引入。Sass中的@import会在生成CSS文件时就把引入的所有文件先导入进来，也就是所有相关的样式会被编译到同一个CSS文件中，无需发起额外的请求。</li>
</ul>
<p><a href="https://www.cnblogs.com/roashley/p/7731865.html" rel="nofollow noreferrer" target="_blank">less和sass的区别，less简单，sass强大</a><br><a href="https://www.jianshu.com/p/da1e1ceeae1a" rel="nofollow noreferrer" target="_blank">less和sass也经常会问到</a><br><a href="https://www.jianshu.com/p/bd1a152f3ca1" rel="nofollow noreferrer" target="_blank">sass的使用方法</a></p>
<h2 id="articleHeader4">5.css3选择器</h2>
<p><a href="https://www.w3cplus.com/css3/basic-selectors" rel="nofollow noreferrer" target="_blank">基本选择器</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="空格（后代选择器，可以是爷孙）/>（子元素选择器）/+（手拉手，相邻兄弟选择器）/~（通用兄弟选择器）/,（群组选择器） " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">空格（后代选择器，可以是爷孙）<span class="hljs-regexp">/&gt;（子元素选择器）/</span>+（手拉手，相邻兄弟选择器）<span class="hljs-regexp">/~（通用兄弟选择器）/</span>,（群组选择器） </code></pre>
<p><a href="https://www.w3cplus.com/css3/attribute-selectors" rel="nofollow noreferrer" target="_blank">属性选择器</a><br><a href="https://www.w3cplus.com/css3/pseudo-class-selector" rel="nofollow noreferrer" target="_blank">伪类选择器</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="动态伪类：:hover”,&quot;:active&quot;和&quot;:focus&quot;

:first-child选择某个元素的第一个子元素；
:last-child选择某个元素的最后一个子元素；
:nth-child()选择某个元素的一个或多个特定的子元素；
:nth-last-child()选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；
:nth-of-type()选择指定的元素；
:nth-last-of-type()选择指定的元素，从元素的最后一个开始计算；
:first-of-type选择一个上级元素下的第一个同类子元素；
:last-of-type选择一个上级元素的最后一个同类子元素；
:only-child选择的元素是它的父元素的唯一一个了元素；
:only-of-type选择一个元素是它的上级元素的唯一一个相同类型的子元素；
:empty选择的元素里面没有任何内容。


否定：not
伪元素：
：:first-line,:first-letter,:before,:after;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>动态伪类：<span class="hljs-symbol">:hover</span>”,<span class="hljs-string">":active"</span>和<span class="hljs-string">":focus"</span>

<span class="hljs-symbol">:first-child</span>选择某个元素的第一个子元素；
<span class="hljs-symbol">:last-child</span>选择某个元素的最后一个子元素；
<span class="hljs-symbol">:nth-child</span>()选择某个元素的一个或多个特定的子元素；
<span class="hljs-symbol">:nth-last-child</span>()选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；
<span class="hljs-symbol">:nth-of-type</span>()选择指定的元素；
<span class="hljs-symbol">:nth-last-of-type</span>()选择指定的元素，从元素的最后一个开始计算；
<span class="hljs-symbol">:first-of-type</span>选择一个上级元素下的第一个同类子元素；
<span class="hljs-symbol">:last-of-type</span>选择一个上级元素的最后一个同类子元素；
<span class="hljs-symbol">:only-child</span>选择的元素是它的父元素的唯一一个了元素；
<span class="hljs-symbol">:only-of-type</span>选择一个元素是它的上级元素的唯一一个相同类型的子元素；
<span class="hljs-symbol">:empty</span>选择的元素里面没有任何内容。


否定：<span class="hljs-keyword">not</span>
伪元素：
：<span class="hljs-symbol">:first-line</span>,<span class="hljs-symbol">:first-letter</span>,<span class="hljs-symbol">:before</span>,<span class="hljs-symbol">:after</span>;

</code></pre>
<h2 id="articleHeader5">6.DOM</h2>
<h2 id="articleHeader6">7.盒模型</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="content-box和border-box：content-box(w3c)的width和height不包含border和padding，padding不是marginborder-box包含(ie)。默认是content-box" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>和<span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>：<span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>(w3c)的<span class="hljs-built_in">width</span>和<span class="hljs-built_in">height</span>不包含<span class="hljs-built_in">border</span>和padding，padding不是marginborder-<span class="hljs-built_in">box</span>包含(ie)。默认是<span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span></code></pre>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing" rel="nofollow noreferrer" target="_blank">box-sizing 来自mdn</a><br><a href="https://www.cnblogs.com/chengzp/p/cssbox.html" rel="nofollow noreferrer" target="_blank">边距重叠</a></p>
<blockquote>在网页的顶部加上 doctype 声明。假如不加 doctype 声明，那么各个浏览器会根据自己的行为去理解网页，即 ie 浏览器会采用 ie 盒子模型去解释你的盒子，而 ff 会采用标准 w3c 盒子模型解释你的盒子，所以网页在不同的浏览器中就显示的不一样了。反之，假如加上了 doctype 声明，那么所有浏览器都会采用标准 w3c 盒子模型去解释你的盒子，网页就能在各个浏览器中显示一致了。</blockquote>
<h2 id="articleHeader7">8.行元素和块元素的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="行元素：a、span、strong、input 、label
块元素：div、p、h1到h6，table、td、tr、ul、li" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>行元素：a、span、strong、<span class="hljs-keyword">input</span> 、<span class="hljs-keyword">label</span>
块元素：div、p、h1到h6，<span class="hljs-keyword">table</span>、td、tr、ul、<span class="hljs-keyword">li</span></code></pre>
<p><a href="https://blog.csdn.net/Intlgj/article/details/7052698" rel="nofollow noreferrer" target="_blank">行元素和块元素有哪些</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display：inline-block展示为块级元素但又不独占一行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">display</span>：inline-block展示为块级元素但又不独占一行</code></pre>
<p>行元素的特点：（img和input可以设置宽高）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="设置宽度width   无效。
设置高度height  无效，可以通过line-height来设置。
设置margin 只有左右margin有效，上下无效。
设置padding 只有左右padding有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>设置宽度<span class="hljs-attribute">width</span>   无效。
设置高度<span class="hljs-attribute">height</span>  无效，可以通过<span class="hljs-attribute">line-height</span>来设置。
设置<span class="hljs-attribute">margin</span> 只有左右<span class="hljs-attribute">margin</span>有效，上下无效。
设置<span class="hljs-attribute">padding</span> 只有左右<span class="hljs-attribute">padding</span>有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。</code></pre>
<p><a href="https://www.jianshu.com/p/59cc8cb9889e" rel="nofollow noreferrer" target="_blank">为何img，input内联元素可以设置宽和高？</a><br>img和input属于行内替换元素<br><a href="https://www.cnblogs.com/annie211/p/5933522.html" rel="nofollow noreferrer" target="_blank">如果上一篇没看懂，来看这一篇</a></p>
<h2 id="articleHeader8">9.自适应和媒体查询</h2>
<ol>
<li>页面中的宽度都用百分比来做</li>
<li>页面所有的尺寸用rem单位来设置</li>
</ol>
<p><a href="https://www.cnblogs.com/yewenxiang/p/6087583.html" rel="nofollow noreferrer" target="_blank">实现自适应的其他方法 百分比 rem </a><br><a href="http://www.zhaoan.org/1586.html" rel="nofollow noreferrer" target="_blank">@media如何使用</a><br>其中2倍那个没有看懂</p>
<h2 id="articleHeader9">10.常见的浏览器兼容性问题</h2>
<p>常见的浏览器及内核：</p>
<ol>
<li>IE浏览器内核：Trident内核，也是俗称的IE内核；</li>
<li>Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；</li>
<li>Firefox浏览器内核：Gecko内核，俗称Firefox内核；</li>
<li>Safari浏览器内核：Webkit内核；</li>
<li>Opera浏览器内核：最初是自己的Presto内核，后来是Webkit，现在是Blink内核；</li>
<li>360浏览器、猎豹浏览器内核：IE+Chrome双内核；</li>
<li>搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；</li>
</ol>
<p>浏览器css前缀：</p>
<ol>
<li>-o-transform:rotate(7deg); // Opera</li>
<li>-ms-transform:rotate(7deg); // IE</li>
<li>-moz-transform:rotate(7deg); // Firefox</li>
<li>-webkit-transform:rotate(7deg); // Chrome</li>
</ol>
<p>transform:rotate(7deg); // 统一标识语句<br>css的兼容性：<br>js的（常用）：</p>
<ol>
<li>标准的addEventListener,而IE使用的是attachEvent</li>
<li>获得DOM节点的方法有所差异，其获得子节点方法不一致。IE：parentElementparentElement.children<br>   Firefox：parentNode  parentNode.childNodes<br>   childNodes的下标的含义在IE和Firefox中不同，Firefox使用DOM规范，childNodes中会插入空白文本节点。一般可以通过node.getElementsByTagName()来回避这个问题。</li>
</ol>
<p><a href="https://blog.csdn.net/u598975767/article/details/5124296" rel="nofollow noreferrer" target="_blank">点我</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/25123086?refer=dreawer" rel="nofollow noreferrer" target="_blank">这个兼容性问题真的是难受，难道我要一个一个记？一万年记不住系列</a><br><a href="https://blog.csdn.net/xkweiguang/article/details/54907748" rel="nofollow noreferrer" target="_blank">常用的手机端的兼容性 这个要记住 虽然我现在还记不住</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础之CSS（1）

## 原文链接
[https://segmentfault.com/a/1190000014963052](https://segmentfault.com/a/1190000014963052)

