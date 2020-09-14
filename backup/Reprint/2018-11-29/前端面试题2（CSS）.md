---
title: '前端面试题2（CSS）' 
date: 2018-11-29 9:34:56
hidden: true
slug: mz7t5dnkrim
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前端面试之CSS</h3>
<hr>
<p><strong>display: none; 与 visibility: hidden; 的区别</strong></p>
<ul>
<li>联系：它们都能让元素不可见</li>
<li>
<p>区别：</p>
<ul>
<li>
<code>display:none</code>;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；<code>visibility: hidden</code>;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见</li>
<li>
<code>display: none</code>;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；<code>visibility:hidden</code>;是继承属性，子孙节点消失由于继承了<code>hidden</code>，通过设置<code>visibility: visible</code>;可以让子孙节点显式</li>
<li>修改常规流中元素的<code>display</code>通常会造成文档重排。修改<code>visibility</code>属性只会造成本元素的重绘</li>
<li>读屏器不会读取<code>display: none;</code>元素内容；会读取<code>visibility: hidden</code>元素内容</li>
</ul>
</li>
</ul>
<p><strong>css hack原理及常用hack</strong></p>
<ul>
<li>原理：利用不同浏览器对CSS的支持和解析结果不一样编写针对特定浏览器样式。</li>
<li>
<p>常见的hack有</p>
<ul>
<li>属性hack</li>
<li>选择器hack</li>
<li>IE条件注释</li>
</ul>
</li>
</ul>
<p><strong>link 与 @import 的区别</strong></p>
<ul>
<li>
<code>link</code> 是<code>HTML</code>方式， <code>@import</code> 是<code>CSS</code>方式</li>
<li>
<code>link </code>最大限度支持并行下载，<code> @import</code> 过多嵌套导致串行下载，出现FOUC</li>
<li>
<code>link</code> 可以通过 <code>rel="alternate stylesheet"</code> 指定候选样式</li>
<li>浏览器对 <code>link</code> 支持早于<code> @import</code> ，可以使用 <code>@import</code> 对老浏览器隐藏样式</li>
<li>
<code>@import</code> 必须在样式规则之前，可以在<code>css</code>文件中引用其他文件</li>
<li>总体来说：<code>link</code>优于<code>@import</code>
</li>
</ul>
<p><strong>CSS有哪些继承属性</strong></p>
<ul><li>
<p>关于文字排版的属性如：</p>
<ul>
<li>
<p><code>font</code></p>
<ul>
<li><code>word-break</code></li>
<li><code>letter-spacing</code></li>
<li><code>text-align</code></li>
<li><code>text-rendering</code></li>
<li><code>word-spacing</code></li>
<li><code>white-space</code></li>
<li><code>text-indent</code></li>
<li><code>text-transform</code></li>
<li><code>text-shadow</code></li>
</ul>
</li>
<li><code>line-height</code></li>
<li><code>color</code></li>
<li><code>visibility</code></li>
<li><code>cursor</code></li>
</ul>
</li></ul>
<p><strong>外边距折叠(collapsing margins)</strong></p>
<ul><li>
<p>毗邻的两个或多个 <code>margin</code> 会合并成一个<code>margin</code>，叫做外边距折叠。规则如下：</p>
<ul>
<li>两个或多个毗邻的普通流中的块元素垂直方向上的<code>margin</code>会折叠</li>
<li>浮动元素或<code>inline-block</code>元素或绝对定位元素的<code>margin</code>不会和垂直方向上的其他元素的margin折叠</li>
<li>创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠</li>
<li>元素自身的<code>margin-bottom</code>和<code>margin-top</code>相邻时也会折</li>
</ul>
</li></ul>
<p><strong>介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？</strong></p>
<ul>
<li>有两种， IE 盒子模型、W3C 盒子模型；</li>
<li>盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；</li>
<li>区  别： IE的content部分把 border 和 padding计算了进去;</li>
</ul>
<p><strong>CSS选择符有哪些？哪些属性可以继承？</strong></p>
<ul>
<li>id选择器（ # myid）</li>
<li>类选择器（.myclassname）</li>
<li>标签选择器（div, h1, p）</li>
<li>相邻选择器（h1 + p）</li>
<li>子选择器（ul &gt; li）</li>
<li>后代选择器（li a）</li>
<li>通配符选择器（ * ）</li>
<li>属性选择器（a[rel = "external"]）</li>
<li>伪类选择器（a:hover, li:nth-child）</li>
<li>可继承的样式： <code>font-size font-family color, UL LI DL DD DT</code>
</li>
<li>不可继承的样式：<code>border padding margin width height </code>
</li>
</ul>
<p><strong>CSS优先级算法如何计算？</strong></p>
<ul>
<li>优先级就近原则，同权重情况下样式定义最近者为准</li>
<li>载入样式以最后载入的定位为准</li>
<li>优先级为: <code>!important &gt;  id &gt; class &gt; tag</code> important 比 内联优先级高</li>
</ul>
<p><strong>CSS3新增伪类有那些？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。

:after          在元素之前添加内容,也可以用来做清除浮动。
:before         在元素之后添加内容
:enabled        
:disabled       控制表单控件的禁用状态。
:checked        单选框或复选框被选中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>p:first-<span class="hljs-keyword">of</span>-<span class="hljs-class"><span class="hljs-keyword">type</span> 选择属于其父元素的首个 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</span>
p:last-<span class="hljs-keyword">of</span>-<span class="hljs-class"><span class="hljs-keyword">type</span>  选择属于其父元素的最后 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</span>
p:only-<span class="hljs-keyword">of</span>-<span class="hljs-class"><span class="hljs-keyword">type</span>  选择属于其父元素唯一的 &lt;p&gt; 元素的每个 &lt;p&gt; 元素。</span>
p:only-child        选择属于其父元素的唯一子元素的每个 &lt;p&gt; 元素。
p:nth-child(<span class="hljs-number">2</span>)  选择属于其父元素的第二个子元素的每个 &lt;p&gt; 元素。

:after          在元素之前添加内容,也可以用来做清除浮动。
:before         在元素之后添加内容
:enabled        
:disabled       控制表单控件的禁用状态。
:checked        单选框或复选框被选中</code></pre>
<p><strong>如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？</strong></p>
<ul><li>给<code>div</code>设置一个宽度，然后添加<code>margin:0 auto</code>属性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    width:200px;
    margin:0 auto;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
 }</code></pre>
<ul><li>居中一个浮动元素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//确定容器的宽高 宽500 高 300 的层
//设置层的外边距

 .div {
      width:500px ; height:300px;//高度可以不设
      margin: -150px 0 0 -250px;
      position:relative;         //相对定位
      background-color:pink;     //方便看效果
      left:50%;
      top:50%;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//确定容器的宽高 宽500 高 300 的层</span>
<span class="hljs-comment">//设置层的外边距</span>

 <span class="hljs-selector-class">.div</span> {
      <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span> ; <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;<span class="hljs-comment">//高度可以不设</span>
      <span class="hljs-attribute">margin</span>: -<span class="hljs-number">150px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">250px</span>;
      <span class="hljs-attribute">position</span>:relative;         <span class="hljs-comment">//相对定位</span>
      <span class="hljs-attribute">background-color</span>:pink;     <span class="hljs-comment">//方便看效果</span>
      <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
      <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
 }</code></pre>
<ul><li>让绝对定位的div居中</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  position: absolute;
  width: 1200px;
  background: none;
  margin: 0 auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
  <span class="hljs-attribute">background</span>: none;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;</code></pre>
<p><strong>display有哪些值？说明他们的作用</strong></p>
<ul>
<li>block         象块类型元素一样显示。</li>
<li>none          缺省值。象行内元素类型一样显示。</li>
<li>inline-block  象行内元素一样显示，但其内容象块类型元素一样显示。</li>
<li>list-item     象块类型元素一样显示，并添加样式列表标记。</li>
<li>table         此元素会作为块级表格来显示</li>
<li>inherit       规定应该从父元素继承 display 属性的值</li>
</ul>
<p><strong>position的值relative和absolute定位原点是？</strong></p>
<ul>
<li>
<p>absolute</p>
<ul><li>生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。</li></ul>
</li>
<li>
<p>fixed （老IE不支持）</p>
<ul><li>生成绝对定位的元素，相对于浏览器窗口进行定位。</li></ul>
</li>
<li>
<p>relative</p>
<ul><li>生成相对定位的元素，相对于其正常位置进行定位。</li></ul>
</li>
<li>
<p>static</p>
<ul><li>默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。</li></ul>
</li>
<li>
<p>inherit</p>
<ul><li>规定从父元素继承 position 属性的值</li></ul>
</li>
</ul>
<p><strong>CSS3有哪些新特性？</strong></p>
<ul>
<li>新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点）</li>
<li>圆角           （border-radius:8px）</li>
<li>多列布局        （multi-column layout）</li>
<li>阴影和反射        （ShadowReflect）</li>
<li>文字特效      （text-shadow、）</li>
<li>文字渲染      （Text-decoration）</li>
<li>线性渐变      （gradient）</li>
<li>旋转          （transform）</li>
<li>增加了旋转,缩放,定位,倾斜,动画，多背景</li>
<li><code>transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:</code></li>
</ul>
<p><strong>用纯CSS创建一个三角形的原理是什么？</strong></p>
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
<p><strong>一个满屏 品 字布局 如何设计?</strong></p>
<ul><li>
<p>简单的方式：</p>
<ul>
<li>上面的div宽100%，</li>
<li>下面的两个div分别宽50%，</li>
<li>然后用float或者inline使其不换行即可</li>
</ul>
</li></ul>
<p><strong>经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？</strong></p>
<ul>
<li>png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.</li>
<li>浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一</li>
<li>IE下,可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性;</li>
<li>
<p>Firefox下,只能使用getAttribute()获取自定义属性。</p>
<ul><li>解决方法:统一通过getAttribute()获取自定义属性</li></ul>
</li>
<li>IE下,even对象有x,y属性,但是没有pageX,pageY属性</li>
<li>Firefox下,event对象有pageX,pageY属性,但是没有x,y属性</li>
</ul>
<p><strong>li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？</strong></p>
<ul><li>行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了</li></ul>
<p><strong>为什么要初始化CSS样式</strong></p>
<ul><li>因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异</li></ul>
<p><strong>对BFC规范(块级格式化上下文：block formatting context)的理解？</strong></p>
<ul>
<li>一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型</li>
<li>不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响</li>
</ul>
<p><strong>css定义的权重</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下/// 例子是演示各种定义的权重值：

/*权重为1*/
div{
}
/*权重为10*/
.class1{
}
/*权重为100*/
#id1{
}
/*权重为100+1=101*/
#id1 div{
}
/*权重为10+1=11*/
.class1 div{
}
/*权重为10+10+1=21*/
.class1 .class2 div{
}

// 如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下/// 例子是演示各种定义的权重值：</span>

<span class="hljs-comment">/*权重为1*/</span>
div{
}
<span class="hljs-comment">/*权重为10*/</span>
.class1{
}
<span class="hljs-comment">/*权重为100*/</span>
#id1{
}
<span class="hljs-comment">/*权重为100+1=101*/</span>
<span class="hljs-selector-id">#id1</span> div{
}
<span class="hljs-comment">/*权重为10+1=11*/</span>
<span class="hljs-selector-class">.class1</span> div{
}
<span class="hljs-comment">/*权重为10+10+1=21*/</span>
<span class="hljs-selector-class">.class1</span> <span class="hljs-selector-class">.class2</span> div{
}

<span class="hljs-comment">// 如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现</span></code></pre>
<p><strong>display:inline-block 什么时候会显示间隙？(携程)</strong></p>
<ul><li>移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing</li></ul>
<p><strong>谈谈浮动和清除浮动</strong></p>
<ul><li>浮动的框可以向左或向右移动，直到他的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流的块框表现得就像浮动框不存在一样。浮动的块框会漂浮在文档普通流的块框上</li></ul>
<p><strong>介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？</strong></p>
<ul>
<li>盒子模型构成：内容(content)、内填充(padding)、 边框(border)、外边距(margin)</li>
<li>IE8及其以下版本浏览器，未声明 DOCTYPE，内容宽高会包含内填充和边框，称为怪异盒模型(IE盒模型)</li>
<li>标准(W3C)盒模型：元素宽度 = width + padding + border + margin</li>
<li>怪异(IE)盒模型：元素宽度 = width + margin</li>
<li>标准浏览器通过设置 css3 的 box-sizing: border-box 属性，触发“怪异模式”解析计算宽高</li>
</ul>
<p><strong>box-sizing 常用的属性有哪些？分别有什么作用？</strong></p>
<ul>
<li>box-sizing: content-box;  // 默认的标准(W3C)盒模型元素效果</li>
<li>box-sizing: border-box;   // 触发怪异(IE)盒模型元素的效果</li>
<li>box-sizing: inherit;      //  继承父元素 box-sizing 属性的值</li>
</ul>
<p><strong>CSS选择器有哪些？</strong></p>
<ul>
<li>id选择器        #id</li>
<li>类选择器        .class</li>
<li>标签选择器      div, h1, p</li>
<li>相邻选择器      h1 + p</li>
<li>子选择器        ul &gt; li</li>
<li>后代选择器      li a</li>
<li>通配符选择器    *</li>
<li>属性选择器      a[rel='external']</li>
<li>伪类选择器      a:hover, li:nth-child</li>
</ul>
<p><strong>CSS哪些属性可以继承？哪些属性不可以继承？</strong></p>
<ul>
<li>可以继承的样式：font-size、font-family、color、list-style、cursor</li>
<li>不可继承的样式：width、height、border、padding、margin、background</li>
</ul>
<p><strong>CSS如何计算选择器优先？</strong></p>
<ul>
<li>相同权重，定义最近者为准：行内样式 &gt; 内部样式 &gt; 外部样式</li>
<li>含外部载入样式时，后载入样式覆盖其前面的载入的样式和内部样式</li>
<li>选择器优先级: 行内样式[1000] &gt; id[100] &gt; class[10] &gt; Tag[1]</li>
<li>在同一组属性设置中，!important 优先级最高，高于行内样式</li>
</ul>
<p><strong>CSS3新增伪类有哪些？</strong></p>
<ul>
<li>:root           选择文档的根元素，等同于 html 元素</li>
<li>:empty          选择没有子元素的元素</li>
<li>:target         选取当前活动的目标元素</li>
<li>:not(selector)  选择除 selector 元素意外的元素</li>
<li>:enabled        选择可用的表单元素</li>
<li>:disabled       选择禁用的表单元素</li>
<li>:checked        选择被选中的表单元素</li>
<li>:after          在元素内部最前添加内容</li>
<li>:before         在元素内部最后添加内容</li>
<li>:nth-child(n)      匹配父元素下指定子元素，在所有子元素中排序第n</li>
<li>:nth-last-child(n) 匹配父元素下指定子元素，在所有子元素中排序第n，从后向前数</li>
<li>:nth-child(odd)</li>
<li>:nth-child(even)</li>
<li>:nth-child(3n+1)</li>
<li>:first-child</li>
<li>:last-child</li>
<li>:only-child</li>
<li>:nth-of-type(n)      匹配父元素下指定子元素，在同类子元素中排序第n</li>
<li>:nth-last-of-type(n) 匹配父元素下指定子元素，在同类子元素中排序第n，从后向前数</li>
<li>:nth-of-type(odd)</li>
<li>:nth-of-type(even)</li>
<li>:nth-of-type(3n+1)</li>
<li>:first-of-type</li>
<li>:last-of-type</li>
<li>:only-of-type</li>
<li>::selection     选择被用户选取的元素部分</li>
<li>:first-line     选择元素中的第一行</li>
<li>:first-letter   选择元素中的第一个字符</li>
</ul>
<p><strong>请列举几种隐藏元素的方法</strong></p>
<ul>
<li>visibility: hidden;   这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在</li>
<li>opacity: 0;           CSS3属性，设置0可以使一个元素完全透明</li>
<li>position: absolute;   设置一个很大的 left 负值定位，使元素定位在可见区域之外</li>
<li>display: none;        元素会变得不可见，并且不会再占用文档的空间。</li>
<li>transform: scale(0);  将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留</li>
<li>
<code>&lt;div hidden="hidden"&gt;</code> HTML5属性,效果和display:none;相同，但这个属性用于记录一个元素的状态</li>
<li>height: 0;            将元素高度设为 0 ，并消除边框</li>
<li>filter: blur(0);      CSS3属性，将一个元素的模糊度设置为0，从而使这个元素“消失”在页面中</li>
</ul>
<p><strong>rgba() 和 opacity 的透明效果有什么不同？</strong></p>
<ul>
<li>opacity 作用于元素以及元素内的所有内容（包括文字）的透明度</li>
<li>rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果</li>
</ul>
<p><strong>css 属性 content 有什么作用？</strong></p>
<ul><li>content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式</li></ul>
<p><strong>CSS3有哪些新特性？</strong></p>
<ul>
<li>新增选择器     p:nth-child(n){color: rgba(255, 0, 0, 0.75)}</li>
<li>弹性盒模型     display: flex;</li>
<li>多列布局       column-count: 5;</li>
<li>媒体查询       @media (max-width: 480px) {.box: {column-count: 1;"}}"</li>
<li>个性化字体     @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}</li>
<li>颜色透明度     color: rgba(255, 0, 0, 0.75);</li>
<li>圆角           border-radius: 5px;</li>
<li>渐变           background:linear-gradient(red, green, blue);</li>
<li>阴影           box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);</li>
<li>倒影           box-reflect: below 2px;</li>
<li>文字装饰       text-stroke-color: red;</li>
<li>文字溢出       text-overflow:ellipsis;</li>
<li>背景效果       background-size: 100px 100px;</li>
<li>边框效果       border-image:url(bt_blue.png) 0 10;</li>
<li>
<p>转换</p>
<ul>
<li>旋转          transform: rotate(20deg);</li>
<li>倾斜          transform: skew(150deg, -10deg);</li>
<li>位移          transform: translate(20px, 20px);</li>
<li>缩放          transform: scale(.5);</li>
</ul>
</li>
<li>平滑过渡       transition: all .3s ease-in .1s;</li>
<li>动画           @keyframes anim-1 {50% {border-radius: 50%;"}}" animation: anim-1 1s;</li>
</ul>
<p><strong>请解释一下 CSS3 的 Flexbox（弹性盒布局模型）以及适用场景？</strong></p>
<ul><li>Flexbox 用于不同尺寸屏幕中创建可自动扩展和收缩布局</li></ul>
<p><strong>经常遇到的浏览器的JS兼容性有哪些？解决方法是什么？</strong></p>
<ul>
<li>当前样式：getComputedStyle(el, null) VS el.currentStyle</li>
<li>事件对象：e VS window.event</li>
<li>鼠标坐标：e.pageX, e.pageY VS window.event.x, window.event.y</li>
<li>按键码：e.which VS event.keyCode</li>
<li>文本节点：el.textContent VS el.innerText</li>
</ul>
<p><strong>请写出多种等高布局</strong></p>
<ul>
<li>在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假像</li>
<li>模仿表格布局等高列效果：兼容性不好，在ie6-7无法正常运行</li>
<li>css3 flexbox 布局： .container{display: flex; align-items: stretch;}</li>
</ul>
<p><strong>css垂直居中的方法有哪些？</strong></p>
<ul><li>如果是单行文本, line-height 设置成和 height 值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vertical {
      height: 100px;
      line-height: 100px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.vertical</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    }</code></pre>
<ul><li>已知高度的块级子元素，采用绝对定位和负边距</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  position: relative;
}
.vertical {
  height: 300px;  /*子元素高度*/
  position: absolute;
  top:50%;  /*父元素高度50%*/
  margin-top: -150px; /*自身高度一半*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.vertical</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;  <span class="hljs-comment">/*子元素高度*/</span>
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;  <span class="hljs-comment">/*父元素高度50%*/</span>
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">150px</span>; <span class="hljs-comment">/*自身高度一半*/</span>
}</code></pre>
<ul>
<li>未知高度的块级父子元素居中，模拟表格布局</li>
<li>缺点：IE67不兼容，父级 overflow：hidden 失效</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
      display: table;
    }
    .content {
      display: table-cell;
      vertical-align: middle;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
      <span class="hljs-attribute">display</span>: table;
    }
    <span class="hljs-selector-class">.content</span> {
      <span class="hljs-attribute">display</span>: table-cell;
      <span class="hljs-attribute">vertical-align</span>: middle;
    }
</code></pre>
<ul><li>
<p>新增 inline-block 兄弟元素，设置 vertical-align</p>
<ul><li>缺点：需要增加额外标签，IE67不兼容</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.container {
  height: 100%;/*定义父级高度，作为参考*/
}
.extra .vertical{
  display: inline-block;  /*行内块显示*/
  vertical-align: middle; /*垂直居中*/
}
.extra {
  height: 100%; /*设置新增元素高度为100%*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;<span class="hljs-comment">/*定义父级高度，作为参考*/</span>
}
<span class="hljs-selector-class">.extra</span> <span class="hljs-selector-class">.vertical</span>{
  <span class="hljs-attribute">display</span>: inline-block;  <span class="hljs-comment">/*行内块显示*/</span>
  <span class="hljs-attribute">vertical-align</span>: middle; <span class="hljs-comment">/*垂直居中*/</span>
}
<span class="hljs-selector-class">.extra</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; <span class="hljs-comment">/*设置新增元素高度为100%*/</span>
}</code></pre>
<ul><li>绝对定位配合 CSS3 位移</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vertical {
  position: absolute;
  top:50%;  /*父元素高度50%*/
  transform:translateY(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.vertical</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;  <span class="hljs-comment">/*父元素高度50%*/</span>
  <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateY</span>(-50%, -50%);
}</code></pre>
<ul><li>CSS3弹性盒模型</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display:flex;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">justify-content</span>: center; <span class="hljs-comment">/*子元素水平居中*/</span>
  <span class="hljs-attribute">align-items</span>: center; <span class="hljs-comment">/*子元素垂直居中*/</span>
}</code></pre>
<p><strong>圣杯布局的实现原理？</strong></p>
<ul><li>
<p>要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽</p>
<ul>
<li>好处：重要的内容放在文档流前面可以优先渲染</li>
<li>原理：利用相对定位、浮动、负边距布局，而不添加额外标签</li>
</ul>
</li></ul>
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
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-class">.container</span> {
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
<p><strong>什么是双飞翼布局？实现原理？</strong></p>
<ul>
<li>双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局</li>
<li>原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。</li>
</ul>
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
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
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
<p><strong>在CSS样式中常使用 px、em 在表现上有什么区别？</strong></p>
<ul>
<li>px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能</li>
<li>em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级font-size</li>
</ul>
<p><strong>解释下什么是浮动和它的工作原理？</strong></p>
<ul><li>非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。</li></ul>
<p>此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）。</p>
<ul><li>
<p>工作原理：</p>
<ul>
<li>浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）</li>
<li>浮动元素碰到包含它的边框或者其他浮动元素的边框停留</li>
</ul>
</li></ul>
<p><strong>浮动元素引起的问题？</strong></p>
<ul>
<li>父元素的高度无法被撑开，影响与父元素同级的元素</li>
<li>与浮动元素同级的非浮动元素会跟随其后</li>
</ul>
<p><strong>列举几种清除浮动的方式？</strong></p>
<ul>
<li>添加额外标签，例如 <code>&lt;div style="clear:both"&gt;&lt;/div&gt;</code>
</li>
<li>使用 br 标签和其自身的 clear 属性，例如 <code>&lt;br clear="all" /&gt;</code>
</li>
<li>父元素设置 overflow：hidden; 在IE6中还需要触发 hasLayout，例如zoom：1;</li>
<li>父元素也设置浮动</li>
<li>使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1 触发 hasLayout</li>
</ul>
<p><strong>清除浮动最佳实践（after伪元素闭合浮动）：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:after{
    content: &quot;\200B&quot;;
    display: table; 
    height: 0;
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.clearfix</span>:after{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\200B"</span>;
    <span class="hljs-attribute">display</span>: table; 
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>: both;
  }
  <span class="hljs-selector-class">.clearfix</span>{
    *zoom: <span class="hljs-number">1</span>;
  }</code></pre>
<p><strong>什么是 FOUC(Flash of Unstyled Content)？ 如何来避免 FOUC？</strong></p>
<ul><li>当使用 @import 导入 CSS 时，会导致某些页面在 IE 出现奇怪的现象：</li></ul>
<p>没有样式的页面内容显示瞬间闪烁，这种现象称为“文档样式短暂失效”，简称为FOUC</p>
<ul>
<li>产生原因：当样式表晚于结构性html加载时，加载到此样式表时，页面将停止之前的渲染。</li>
<li>等待此样式表被下载和解析后，再重新渲染页面，期间导致短暂的花屏现象。</li>
<li>解决方法：使用 link 标签将样式表放在文档 head</li>
</ul>
<p><strong>介绍使用过的 CSS 预处理器？</strong></p>
<ul>
<li>CSS 预处理器基本思想：为 CSS 增加了一些编程的特性（变量、逻辑判断、函数等）</li>
<li>开发者使用这种语言进行进行 Web 页面样式设计，再编译成正常的 CSS 文件使用</li>
<li>使用 CSS 预处理器，可以使 CSS 更加简洁、适应性更强、可读性更佳，无需考虑兼容性</li>
<li>最常用的 CSS 预处理器语言包括：Sass（SCSS）和 LESS</li>
</ul>
<p><strong>CSS优化、提高性能的方法有哪些？</strong></p>
<ul>
<li>多个css合并，尽量减少HTTP请求</li>
<li>将css文件放在页面最上面</li>
<li>移除空的css规则</li>
<li>避免使用CSS表达式</li>
<li>选择器优化嵌套，尽量避免层级过深</li>
<li>充分利用css继承属性，减少代码量</li>
<li>抽象提取公共样式，减少代码量</li>
<li>属性值为0时，不加单位</li>
<li>属性值为小于1的小数时，省略小数点前面的0</li>
<li>css雪碧图</li>
</ul>
<p><strong>浏览器是怎样解析CSS选择器的？</strong></p>
<ul><li>浏览器解析 CSS 选择器的方式是从右到左</li></ul>
<p><strong>在网页中的应该使用奇数还是偶数的字体？</strong></p>
<ul><li>
<p>在网页中的应该使用“偶数”字体：</p>
<ul>
<li>偶数字号相对更容易和 web 设计的其他部分构成比例关系</li>
<li>使用奇数号字体时文本段落无法对齐</li>
<li>宋体的中文网页排布中使用最多的就是 12 和 14</li>
</ul>
</li></ul>
<p><strong>margin和padding分别适合什么场景使用？</strong></p>
<ul>
<li>需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin</li>
<li>需要在border内测添加空白，且空白处需要背景（色）时，使用 padding</li>
</ul>
<p><strong>抽离样式模块怎么写，说出思路？</strong></p>
<ul><li>
<p>CSS可以拆分成2部分：公共CSS 和 业务CSS：</p>
<ul>
<li>网站的配色，字体，交互提取出为公共CSS。这部分CSS命名不应涉及具体的业务</li>
<li>对于业务CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的CSS</li>
</ul>
</li></ul>
<p><strong>元素竖向的百分比设定是相对于容器的高度吗？</strong></p>
<ul><li>元素竖向的百分比设定是相对于容器的宽度，而不是高度</li></ul>
<p><strong>全屏滚动的原理是什么？ 用到了CSS的那些属性？</strong></p>
<ul>
<li>原理类似图片轮播原理，超出隐藏部分，滚动时显示</li>
<li>可能用到的CSS属性：overflow:hidden; transform:translate(100%, 100%); display:none;</li>
</ul>
<p><strong>什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？</strong></p>
<ul>
<li>响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本</li>
<li>基本原理是利用CSS3媒体查询，为不同尺寸的设备适配不同样式</li>
<li>对于低版本的IE，可采用JS获取屏幕宽度，然后通过resize方法来实现兼容：</li>
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
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
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
<p><strong>什么是视差滚动效果，如何给每页做不同的动画？</strong></p>
<li><ul>
<li>视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，具有非常出色的视觉体验</li>
<li>一般把网页解剖为：背景层、内容层和悬浮层。当滚动鼠标滚轮时，各图层以不同速度移动，形成视差的</li>
</ul></li>
<ul><li>
<p>实现原理</p>
<ul>
<li>以 “页面滚动条” 作为 “视差动画进度条”</li>
<li>以 “滚轮刻度” 当作 “动画帧度” 去播放动画的</li>
<li>监听 mousewheel 事件，事件被触发即播放动画，实现“翻页”效果</li>
</ul>
</li></ul>
<p><strong>a标签上四个伪类的执行顺序是怎么样的？</strong></p>
<p><code>link &gt; visited &gt; hover &gt; active</code></p>
<ul><li>L-V-H-A love hate 用喜欢和讨厌两个词来方便记忆</li></ul>
<p><strong>伪元素和伪类的区别和作用？</strong></p>
<ul>
<li>伪元素 -- 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。</li>
<li>它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p::before {content:&quot;第一章：&quot;;}
p::after {content:&quot;Hot!&quot;;}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::before</span> {<span class="hljs-attribute">content</span>:<span class="hljs-string">"第一章："</span>;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::after</span> {<span class="hljs-attribute">content</span>:<span class="hljs-string">"Hot!"</span>;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-line</span> {<span class="hljs-attribute">background</span>:red;}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-letter</span> {<span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;}
</code></pre>
<ul><li>伪类 -- 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a:hover {color: #FF00FF}
p:first-child {color: red}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {<span class="hljs-attribute">color</span>: <span class="hljs-number">#FF00FF</span>}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:first-child</span> {<span class="hljs-attribute">color</span>: red}</code></pre>
<p><strong>::before 和 :after 中双冒号和单冒号有什么区别？</strong></p>
<ul>
<li>在 CSS 中伪类一直用 : 表示，如 :hover, :active 等</li>
<li>伪元素在CSS1中已存在，当时语法是用 : 表示，如 :before 和 :after</li>
<li>后来在CSS3中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪类</li>
<li>由于低版本IE对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素</li>
<li>综上所述：::before 是 CSS3 中写伪元素的新语法； :after 是 CSS1 中存在的、兼容IE的老语法</li>
</ul>
<p><strong>如何修改Chrome记住密码后自动填充表单的黄色背景？</strong></p>
<ul>
<li>产生原因：由于Chrome默认会给自动填充的input表单加上 input:-webkit-autofill 私有属性造成的</li>
<li>解决方案1：在form标签上直接关闭了表单的自动填充：autocomplete="off"</li>
<li>解决方案2：input:-webkit-autofill { background-color: transparent; }</li>
</ul>
<p><strong>input [type=search] 搜索框右侧小图标如何美化？</strong></p>
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
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-cancel-button</span>{
  <span class="hljs-attribute">-webkit-appearance</span>: none;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"images/searchicon.png"</span>) no-repeat <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-size</span>: <span class="hljs-number">15px</span> <span class="hljs-number">15px</span>;
}</code></pre>
<p><strong>网站图片文件，如何点击下载？而非点击预览？</strong></p>
<p><code>&lt;a href="logo.jpg" download&gt;下载&lt;/a&gt;</code><br><code>&lt;a href="logo.jpg" download="网站LOGO" &gt;下载&lt;/a&gt;</code></p>
<p><strong>iOS safari 如何阻止“橡皮筋效果”？</strong></p>
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
      </div><pre class="javascript hljs"><code class="javascript">  $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> stopScrolling = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
          event.preventDefault();
      }
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, stopScrolling, <span class="hljs-literal">false</span>);
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, stopScrolling, <span class="hljs-literal">false</span>);
  });</code></pre>
<p><strong>你对 line-height 是如何理解的？</strong></p>
<ul>
<li>line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离</li>
<li>如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的</li>
<li>一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容</li>
<li>把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中</li>
<li>line-height 和 height 都能撑开一个高度，height 会触发 haslayout，而 line-height 不会</li>
</ul>
<p><strong>line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）</strong></p>
<ul>
<li>带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高</li>
<li>纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px</li>
<li>百分比：将计算后的值传递给后代</li>
</ul>
<p><strong>设置元素浮动后，该元素的 display 值会如何变化？</strong></p>
<ul><li>设置元素浮动后，该元素的 display 值自动变成 block</li></ul>
<p><strong>怎么让Chrome支持小于12px 的文字？</strong></p>
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
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-class">.shrink</span>{
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">scale</span>(0.8);
    <span class="hljs-attribute">-o-transform</span>:<span class="hljs-built_in">scale</span>(1);
    <span class="hljs-attribute">display</span>:inline-block;
  }</code></pre>
<p><strong>让页面里的字体变清晰，变细用CSS怎么做？（IOS手机浏览器字体齿轮设置）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  -webkit-font-smoothing: antialiased;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">  <span class="hljs-selector-tag">-webkit-font-smoothing</span>: <span class="hljs-selector-tag">antialiased</span>;</code></pre>
<p><strong>font-style 属性 oblique 是什么意思？</strong></p>
<ul><li>font-style: oblique; 使没有 italic 属性的文字实现倾斜</li></ul>
<p><strong>如果需要手动写动画，你认为最小时间间隔是多久？</strong></p>
<ul><li>16.7ms 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔: 1s / 60 * 1000 ＝ 16.7ms</li></ul>
<p><strong>display:inline-block 什么时候会显示间隙？</strong></p>
<ul>
<li>相邻的 inline-block 元素之间有换行或空格分隔的情况下会产生间距</li>
<li>非 inline-block 水平元素设置为 inline-block 也会有水平间距</li>
<li>可以借助 vertical-align:top; 消除垂直间隙</li>
<li>可以在父级加 font-size：0; 在子元素里设置需要的字体大小，消除垂直间隙</li>
<li>把 li 标签写到同一行可以消除垂直间隙，但代码可读性差</li>
</ul>
<p><strong>overflow: scroll 时不能平滑滚动的问题怎么处理？</strong></p>
<ul><li>监听滚轮事件，然后滚动到一定距离时用 jquery 的 animate 实现平滑效果。</li></ul>
<p><strong>一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度</strong></p>
<ul>
<li>方案1：<br><code>.sub { height: calc(100%-100px); }</code>
</li>
<li>方案2：<br><code>.container { position:relative; }</code><br><code>.sub { position: absolute; top: 100px; bottom: 0; }</code>
</li>
<li>方案3：<br><code>.container { display:flex; flex-direction:column; }</code><br><code>.sub { flex:1; }</code>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题2（CSS）

## 原文链接
[https://segmentfault.com/a/1190000014994892](https://segmentfault.com/a/1190000014994892)

