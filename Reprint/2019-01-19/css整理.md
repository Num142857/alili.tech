---
title: 'css整理' 
date: 2019-01-19 2:30:10
hidden: true
slug: 27ybxk2s5ip
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">移动端Retina屏幕图片模糊</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//图标icon.png是16x16, 设备是2x的Retina屏，那么你得准备一个icon@2x.png，分辨率是32x32，这么写
.demo{
  background-image: url(images/icon.png);
}

@media only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2) {
  .demo {
    background-image: url(images/icon@2x.png);
    background-size: 16px 16px; //这个也很关键--设置2倍图为1倍图大小
  }
//或者
<img src=&quot;image-128.png&quot; srcset=&quot;image-256.png 2x&quot; />
//上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>//图标icon.png是<span class="hljs-number">16</span><span class="hljs-keyword">x</span><span class="hljs-number">16</span>, 设备是<span class="hljs-number">2</span><span class="hljs-keyword">x</span>的Retina屏，那么你得准备一个icon<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png，分辨率是<span class="hljs-number">32</span><span class="hljs-keyword">x</span><span class="hljs-number">32</span>，这么写
.demo{
  background-image: url(images/icon.png)<span class="hljs-comment">;
</span>}

<span class="hljs-title">@media</span> only screen <span class="hljs-keyword">and</span> (-webkit-<span class="hljs-keyword">min</span>-device-pixel-ratio: <span class="hljs-number">2</span>),only screen <span class="hljs-keyword">and</span> (<span class="hljs-keyword">min</span>--moz-device-pixel-ratio: <span class="hljs-number">2</span>),only screen <span class="hljs-keyword">and</span> (-o-<span class="hljs-keyword">min</span>-device-pixel-ratio: <span class="hljs-number">2</span>/<span class="hljs-number">1</span>),only screen <span class="hljs-keyword">and</span> (<span class="hljs-keyword">min</span>-device-pixel-ratio: <span class="hljs-number">2</span>) {
  .demo {
    background-image: url(images/icon<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png)<span class="hljs-comment">;
</span>    background-size: <span class="hljs-number">16</span>px <span class="hljs-number">16</span>px<span class="hljs-comment">; //这个也很关键--设置2倍图为1倍图大小
</span>  }
//或者
&lt;img src=<span class="hljs-string">"image-128.png"</span> srcset=<span class="hljs-string">"image-256.png 2x"</span> /&gt;
//上面的代码，就能实现在屏幕密度为<span class="hljs-number">1</span><span class="hljs-keyword">x</span>的情况下加载image<span class="hljs-number">-128</span>.png, 屏幕密度为<span class="hljs-number">2</span><span class="hljs-keyword">x</span>时加载image<span class="hljs-number">-256</span>.png。</code></pre>
<h2 id="articleHeader1">让图文不可复制</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-user-select: none; 
-ms-user-select: none;
-moz-user-select: none;
-khtml-user-select: none;
user-select: none;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>-webkit-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>; 
-ms-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
-moz-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
-khtml-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;</code></pre>
<h2 id="articleHeader2">去除苹果手机自带样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*强制去除表单自带的样式*/ 
input,button,select,textarea{outline:none;-webkit-appearance:none;}

/*强制去除textarea自带的样式*/
textarea{resize:none;-webkit-appearance:none;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*强制去除表单自带的样式*/</span> 
<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">select</span>,<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">outline</span>:none;<span class="hljs-attribute">-webkit-appearance</span>:none;}

<span class="hljs-comment">/*强制去除textarea自带的样式*/</span>
<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">resize</span>:none;<span class="hljs-attribute">-webkit-appearance</span>:none;}</code></pre>
<h2 id="articleHeader3">清除浮动，兼容ie6</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix{
  zoom: 1;
}
.clearfix:after{
    clear: both;
    content: ' ';
    display: block;
    font-size: 0;
    line-height: 0;
    visibility: hidden;
    width: 0;
    height: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.clearfix</span>{
  <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">' '</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}</code></pre>
<h2 id="articleHeader4">垂直水平居中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">transform</span>: translate(-<span class="hljs-number">50%</span>, -<span class="hljs-number">50%</span>);</code></pre>
<h2 id="articleHeader5">内容垂直居中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    min-height: 6.5em;
    display: table-cell;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">6.5em</span>;
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<hr>
<h2 id="articleHeader6">CSS3全屏背景</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html { 
    background: url('images/bg.jpg') no-repeat center center fixed; 
    background-size: cover;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> { 
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'images/bg.jpg'</span>) no-repeat center center fixed; 
    <span class="hljs-attribute">background-size</span>: cover;
}</code></pre>
<h2 id="articleHeader7">ie hack</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector { 
    property: value; /* 所有浏览器 */ 
    property: value\9; /* 所有IE浏览器 */ 
    property: value\0; /* IE8 */ 
    +property: value; /* IE7 */ 
    _property: value; /* IE6 */ 
    *property: value; /* IE6-7 */ 
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-title">selector</span> { 
    <span class="hljs-keyword">property</span><span class="hljs-string"></span>: value; <span class="hljs-comment">/* 所有浏览器 */</span> 
    <span class="hljs-keyword">property</span><span class="hljs-string"></span>: value\<span class="hljs-number">9</span>; <span class="hljs-comment">/* 所有IE浏览器 */</span> 
    <span class="hljs-keyword">property</span><span class="hljs-string"></span>: value\<span class="hljs-number">0</span>; <span class="hljs-comment">/* IE8 */</span> 
    +<span class="hljs-keyword">property</span><span class="hljs-string"></span>: value; <span class="hljs-comment">/* IE7 */</span> 
    <span class="hljs-attribute">_property</span>: value; <span class="hljs-comment">/* IE6 */</span> 
    *<span class="hljs-keyword">property</span><span class="hljs-string"></span>: value; <span class="hljs-comment">/* IE6-7 */</span> 
}    </code></pre>
<h2 id="articleHeader8">使用ie最高版本内核渲染</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=Edge&quot;>
//或者
<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=8; IE=9&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;meta <span class="hljs-keyword">http</span>-equiv=<span class="hljs-string">"X-UA-Compatible"</span> content=<span class="hljs-string">"IE=Edge"</span>&gt;<span class="hljs-comment">
//或者</span>
&lt;meta <span class="hljs-keyword">http</span>-equiv=<span class="hljs-string">"X-UA-Compatible"</span> content=<span class="hljs-string">"IE=8; IE=9"</span>&gt;</code></pre>
<hr>
<h2 id="articleHeader9">兼容ie6的圆角</h2>
<p><span class="img-wrap"><img data-src="/img/bVKjD4?w=215&amp;h=70" src="https://static.alili.tech/img/bVKjD4?w=215&amp;h=70" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".t{
    width: 200px;
    border:3px solid;
    border-color: transparent transparent green;
}
.tcon{
    width: 206px;
    height: 50px;
    background-color: green;
}
.tb{
    width: 200px;
    border:3px solid;
    border-color: green transparent transparent;
}

<div class=&quot;tbox&quot;>
    <div class=&quot;t&quot;></div>
    <div class=&quot;tcon&quot;></div>
    <div class=&quot;tb&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.t{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">3px</span> solid;
    <span class="hljs-attribute">border-color</span>: transparent transparent green;
}
.tcon{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">206px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background-color</span>: green;
}
.tb{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">3px</span> solid;
    <span class="hljs-attribute">border-color</span>: green transparent transparent;
}

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"tbox"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"t"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"tcon"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"tb"</span>&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<h2 id="articleHeader10">css省略号</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//单行
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//单行</span>
<span class="hljs-attribute">overflow</span>: hidden;
<span class="hljs-attribute">text-overflow</span>: ellipsis;
<span class="hljs-attribute">white-space</span>: nowrap;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//宽度不固定 多行
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//宽度不固定 多行</span>
<span class="hljs-attribute">overflow</span>: hidden;
<span class="hljs-attribute">text-overflow</span>: ellipsis;
<span class="hljs-attribute">display</span>: -webkit-box;
-webkit-line-clamp: <span class="hljs-number">3</span>;
-webkit-box-orient: vertical;
</code></pre>
<h2 id="articleHeader11">自定义文本选中样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只能修改这两个属性 字体颜色 选中背景颜色
element::selection{
  color: green;
  background-color: pink;
}
element::-moz-selection{
  color: green;
  background-color: pink;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 只能修改这两个属性 字体颜色 选中背景颜色</span>
element::selection{
  <span class="hljs-built_in">color</span>: <span class="hljs-built_in">green</span>;
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: pink;
}
element::-moz-selection{
  <span class="hljs-built_in">color</span>: <span class="hljs-built_in">green</span>;
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: pink;
}</code></pre>
<h2 id="articleHeader12">小三角</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".triangle{
  /* 基础样式 */
  border:solid 10px transparent;
}
/*下*/
.triangle.bottom{
 border-top-color: green;
}
/*上*/
.triangle.top{
 border-bottom-color: green;
}
/*左*/
.triangle.top{
 border-right-color: green;
}
/*右*/
.triangle.top{
 border-left-color: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.triangle</span>{
  <span class="hljs-comment">/* 基础样式 */</span>
  <span class="hljs-attribute">border</span>:solid <span class="hljs-number">10px</span> transparent;
}
<span class="hljs-comment">/*下*/</span>
<span class="hljs-selector-class">.triangle</span><span class="hljs-selector-class">.bottom</span>{
 <span class="hljs-attribute">border-top-color</span>: green;
}
<span class="hljs-comment">/*上*/</span>
<span class="hljs-selector-class">.triangle</span><span class="hljs-selector-class">.top</span>{
 <span class="hljs-attribute">border-bottom-color</span>: green;
}
<span class="hljs-comment">/*左*/</span>
<span class="hljs-selector-class">.triangle</span><span class="hljs-selector-class">.top</span>{
 <span class="hljs-attribute">border-right-color</span>: green;
}
<span class="hljs-comment">/*右*/</span>
<span class="hljs-selector-class">.triangle</span><span class="hljs-selector-class">.top</span>{
 <span class="hljs-attribute">border-left-color</span>: green;
}</code></pre>
<h2 id="articleHeader13">鼠标手型</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//一般情况下，我们希望在以下元素身上添加鼠标手型
a[href],
input[type='submit'],
input[type='image'],
input[type='button'],
label[for], 
select, 
button {
  cursor: pointer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//一般情况下，我们希望在以下元素身上添加鼠标手型</span>
<span class="hljs-selector-tag">a</span>[href],
<span class="hljs-selector-tag">input</span>[type=<span class="hljs-string">'submit'</span>],
<span class="hljs-selector-tag">input</span>[type=<span class="hljs-string">'image'</span>],
<span class="hljs-selector-tag">input</span>[type=<span class="hljs-string">'button'</span>],
<span class="hljs-selector-tag">label</span>[<span class="hljs-keyword">for</span>], 
select, 
<span class="hljs-selector-tag">button</span> {
  <span class="hljs-attribute">cursor</span>: pointer;
}</code></pre>
<h2 id="articleHeader14">论文页面的卷曲效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul.box {
    position: relative;
    z-index: 1; /* prevent shadows falling behind containers with backgrounds */
    overflow: hidden;
    list-style: none;
    margin: 0;
    padding: 0; 
}
ul.box li {
    position: relative;
    float: left;
    width: 250px;
    height: 150px;
    padding: 0;
    border: 1px solid #efefef;
    margin: 0 30px 30px 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset; 
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset; 
}
ul.box li:before,
ul.box li:after {
    content: '';
    z-index: -1;
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 70%;
    max-width: 300px; /* avoid rotation causing ugly appearance at large container widths */
    max-height: 100px;
    height: 55%;
    -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    -webkit-transform: skew(-15deg) rotate(-6deg);
    -moz-transform: skew(-15deg) rotate(-6deg);
    -ms-transform: skew(-15deg) rotate(-6deg);
    -o-transform: skew(-15deg) rotate(-6deg);
    transform: skew(-15deg) rotate(-6deg); 
}
ul.box li:after {
    left: auto;
    right: 10px;
    -webkit-transform: skew(15deg) rotate(6deg);
    -moz-transform: skew(15deg) rotate(6deg);
    -ms-transform: skew(15deg) rotate(6deg);
    -o-transform: skew(15deg) rotate(6deg);
    transform: skew(15deg) rotate(6deg); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/* prevent shadows falling behind containers with backgrounds */</span>
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>; 
}
<span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#efefef</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">30px</span> <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.27), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.06) inset;
    <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.27), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.06) inset; 
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.27), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.06) inset; 
}
<span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70%</span>;
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">300px</span>; <span class="hljs-comment">/* avoid rotation causing ugly appearance at large container widths */</span>
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">55%</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">16px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">16px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">16px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(-15deg) <span class="hljs-built_in">rotate</span>(-6deg);
    <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">skew</span>(-15deg) <span class="hljs-built_in">rotate</span>(-6deg);
    <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">skew</span>(-15deg) <span class="hljs-built_in">rotate</span>(-6deg);
    <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">skew</span>(-15deg) <span class="hljs-built_in">rotate</span>(-6deg);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(-15deg) <span class="hljs-built_in">rotate</span>(-6deg); 
}
<span class="hljs-selector-tag">ul</span><span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">left</span>: auto;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">skew</span>(15deg) <span class="hljs-built_in">rotate</span>(6deg);
    <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">skew</span>(15deg) <span class="hljs-built_in">rotate</span>(6deg);
    <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">skew</span>(15deg) <span class="hljs-built_in">rotate</span>(6deg);
    <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">skew</span>(15deg) <span class="hljs-built_in">rotate</span>(6deg);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(15deg) <span class="hljs-built_in">rotate</span>(6deg); 
}</code></pre>
<h2 id="articleHeader15">double</h2>
<p><span class="img-wrap"><img data-src="/img/bVKjvS?w=125&amp;h=106" src="https://static.alili.tech/img/bVKjvS?w=125&amp;h=106" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".double {
    border-bottom: 20px solid blue;
    border-top: 60px double red;
    height: 20px;
    width: 120px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.double</span> {
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">20px</span> solid blue;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">60px</span> double red;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
}</code></pre>
<h2 id="articleHeader16">border-color继承color的颜色</h2>
<p><span class="img-wrap"><img data-src="/img/bVKjEm?w=212&amp;h=213" src="https://static.alili.tech/img/bVKjEm?w=212&amp;h=213" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*border-color继承color的颜色*/
.add{
    display: block;
    width: 200px;
    height: 200px;
    position: relative;
    transition: color .5s .1s;

    color: #ccc;
    border: 1px solid;
}
.add:before{
    content: '';
    border-top:10px solid;
    width: 90%;
    position: absolute;
    left: 5%;
    top: 95px;
}
.add:after{
    content: '';
    border-left:10px solid;
    height: 90%;
    position: absolute;
    left: 95px;
    top: 5%;
}
.add:hover{
    color:#f60;//一行实现颜色变化
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/*border-color继承color的颜色*/</span>
<span class="hljs-selector-class">.add</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">transition</span>: color .<span class="hljs-number">5s</span> .<span class="hljs-number">1s</span>;

    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}
<span class="hljs-selector-class">.add</span>:before{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">border-top</span>:<span class="hljs-number">10px</span> solid;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">5%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">95px</span>;
}
<span class="hljs-selector-class">.add</span>:after{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">border-left</span>:<span class="hljs-number">10px</span> solid;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">90%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">95px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5%</span>;
}
<span class="hljs-selector-class">.add</span>:hover{
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#f60</span>;<span class="hljs-comment">//一行实现颜色变化</span>
}</code></pre>
<h2 id="articleHeader17">移动端可点击元素去处默认边框</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-tap-highlight-color: rgba(255,255,255,0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">webkit-tap-highlight-<span class="hljs-symbol">color:</span> rgba(<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">0</span>);
</span></code></pre>
<h2 id="articleHeader18">屏蔽Webkit移动浏览器中元素高亮效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>-webkit-touch-callout: none;
-webkit-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
-khtml-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
-moz-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
-ms-user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;
user-<span class="hljs-keyword">select</span>: <span class="hljs-keyword">none</span>;</code></pre>
<h2 id="articleHeader19">给 “默认” 链接定义样式：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a[href]:not([class]) {
  color: #008000;
  text-decoration: underline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[class]</span>) {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#008000</span>;
  <span class="hljs-attribute">text-decoration</span>: underline;
}</code></pre>
<h2 id="articleHeader20">逗号分隔列表</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul > li:not(:last-child)::after {
  content: &quot;,&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:last-child)</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">","</span>;
}</code></pre>
<h2 id="articleHeader21">使用负的 nth-child 可以选择 1 至 n 个元素。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li {
  display: none;
}
/* 选择第 1 至第 3 个元素并显示出来 */
li:nth-child(-n+3) {
  display: block;
}

//或者

/* 选择第 1 至第 3 个元素并显示出来 */
li:not(:nth-child(-n+3)) {
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-comment">/* 选择第 1 至第 3 个元素并显示出来 */</span>
<span class="hljs-selector-tag">li</span>:nth-child(-n+3) {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-comment">//或者</span>

<span class="hljs-comment">/* 选择第 1 至第 3 个元素并显示出来 */</span>
<span class="hljs-selector-tag">li</span>:not(:nth-child(-n+3)) {
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<h2 id="articleHeader22">利用属性选择器来选择空链接</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a[href^=&quot;http&quot;]:empty::before { 
    content: attr(href); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^="http"]</span><span class="hljs-selector-pseudo">:empty</span><span class="hljs-selector-pseudo">::before</span> { 
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(href); 
}</code></pre>
<h2 id="articleHeader23">设置全局的CSS样式，避免图中的长按弹出菜单与选中文本的行为</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 禁止长按链接与图片弹出菜单 */
a, img { -webkit-touch-callout: none; } 

/* 禁止选中文本（如无文本选中需求，此为必选项）*/
html, body { 
-webkit-user-select: none;  
user-select: none; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 禁止长按链接与图片弹出菜单 */</span>
<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">-webkit-touch-callout</span>: none; } 

<span class="hljs-comment">/* 禁止选中文本（如无文本选中需求，此为必选项）*/</span>
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> { 
<span class="hljs-attribute">-webkit-user-select</span>: none;  
<span class="hljs-attribute">user-select</span>: none; 
}</code></pre>
<h2 id="articleHeader24">改变placeholder的字体颜色大小</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:14px;
    color: #333;
} 
input:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    font-size:14px;
    color: #333;
} 
input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:14px;
    color: #333;
} 
input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:14px;
    color: #333;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span> { 
    <span class="hljs-comment">/* WebKit browsers */</span> 
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
} 
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:-moz-placeholder</span> { 
    <span class="hljs-comment">/* Mozilla Firefox 4 to 18 */</span> 
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
} 
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::-moz-placeholder</span> { 
    <span class="hljs-comment">/* Mozilla Firefox 19+ */</span> 
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
} 
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:-ms-input-placeholder</span> { 
    <span class="hljs-comment">/* Internet Explorer 10+ */</span> 
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
}</code></pre>
<h2 id="articleHeader25">美化input框</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*在IE10+浏览器中, 使用css即可隐藏input文本输入框右侧的叉号*/
input[type=text]::-ms-clear,::-ms-reveal{display:none;}
input::-ms-clear,::-ms-reveal{display:none;}
input{
  /*去除点击出现轮廓颜色*/
  outline: none;
  /*padding已在重置样式中去除，如果没有去除，记得有padding哦*/    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*在IE10+浏览器中, 使用css即可隐藏input文本输入框右侧的叉号*/</span>
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=text]</span><span class="hljs-selector-pseudo">::-ms-clear</span>,<span class="hljs-selector-pseudo">::-ms-reveal</span>{<span class="hljs-attribute">display</span>:none;}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::-ms-clear</span>,<span class="hljs-selector-pseudo">::-ms-reveal</span>{<span class="hljs-attribute">display</span>:none;}
<span class="hljs-selector-tag">input</span>{
  <span class="hljs-comment">/*去除点击出现轮廓颜色*/</span>
  <span class="hljs-attribute">outline</span>: none;
  <span class="hljs-comment">/*padding已在重置样式中去除，如果没有去除，记得有padding哦*/</span>    
}</code></pre>
<h2 id="articleHeader26">美化select</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
select {
  /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
  border: solid 1px #333;

  /*将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;

  /*在选择框的最右侧中间显示小箭头图片*/
  background: url(&quot;小箭头图片路径&quot;) no-repeat right center transparent;

  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 14px;

  /*去除点击出现轮廓颜色*/
  outline: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*清除ie的默认选择框样式清除，隐藏下拉箭头*/</span>
<span class="hljs-selector-tag">select</span><span class="hljs-selector-pseudo">::-ms-expand</span> { <span class="hljs-attribute">display</span>: none; }
<span class="hljs-selector-tag">select</span> {
  <span class="hljs-comment">/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/</span>
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-number">#333</span>;

  <span class="hljs-comment">/*将默认的select选择框样式清除*/</span>
  <span class="hljs-attribute">appearance</span>:none;
  <span class="hljs-attribute">-moz-appearance</span>:none;
  <span class="hljs-attribute">-webkit-appearance</span>:none;

  <span class="hljs-comment">/*在选择框的最右侧中间显示小箭头图片*/</span>
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"小箭头图片路径"</span>) no-repeat right center transparent;

  <span class="hljs-comment">/*为下拉小箭头留出一点位置，避免被文字覆盖*/</span>
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">14px</span>;

  <span class="hljs-comment">/*去除点击出现轮廓颜色*/</span>
  <span class="hljs-attribute">outline</span>: none;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css整理

## 原文链接
[https://segmentfault.com/a/1190000008615592](https://segmentfault.com/a/1190000008615592)

