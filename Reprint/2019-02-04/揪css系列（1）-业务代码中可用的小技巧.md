---
title: '揪css系列（1）-业务代码中可用的小技巧' 
date: 2019-02-04 2:30:58
hidden: true
slug: 5otcos3ulco
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎提issues 斧正： <a href="https://github.com/xiaohuazheng/twbm/issues/3" rel="nofollow noreferrer" target="_blank">css小技巧</a></p>
<h2 id="articleHeader0">业务代码中可用的CSS技巧</h2>
<h3 id="articleHeader1">兼容chrome下的10px字体</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    font-size: 10px;
    -webkit-transform: scale(.83);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(.83);
}</code></pre>
<p>此方法在前端页面需要展示更小字体，兼容浏览器时非常有用。</p>
<h3 id="articleHeader2">文本溢出显示省略号...</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    display:block;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">white-space</span>:nowrap; 
    <span class="hljs-attribute">overflow</span>:hidden; 
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
}</code></pre>
<p>此方法对前端页面容错非常有效，因为一个元素里的内容太多，就会导致显示不完，省略号让用户体验更好。如果元素宽高没限制，内容太多会导致文本溢出，严重影响用户体验。</p>
<h3 id="articleHeader3">给元素增加hover渐变效果</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    width:200px;
    height:200px;
    transition: box-shadow .5s;
    -moz-transition: box-shadow .5s;
    -webkit-transition: box-shadow .5s;
    -o-transition: box-shadow .5s;
}
div:hover {
    box-shadow: 0 14px 20px #666;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">transition</span>: box-shadow .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">-moz-transition</span>: box-shadow .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">-webkit-transition</span>: box-shadow .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">-o-transition</span>: box-shadow .<span class="hljs-number">5s</span>;
}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">14px</span> <span class="hljs-number">20px</span> <span class="hljs-number">#666</span>;
}</code></pre>
<p>鼠标经过会有阴影效果，鼠标离开恢复。</p>
<h3 id="articleHeader4">居中div</h3>
<p>常用margin方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div { 
    width:200px;
    margin:0 auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> { 
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}
</code></pre>
<p>1/2宽高的margin，50%的left、top方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {        
    Width:500px ; 
    height:300px;      
    Margin: -150px 0 0 -250px;        
    position:relative;       
    background-color:pink;      
    left:50%;
    top:50%;     
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {        
    <span class="hljs-attribute">Width</span>:<span class="hljs-number">500px</span> ; 
    <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;      
    <span class="hljs-attribute">Margin</span>: -<span class="hljs-number">150px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">250px</span>;        
    <span class="hljs-attribute">position</span>:relative;       
    <span class="hljs-attribute">background-color</span>:pink;      
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;     
}</code></pre>
<p>LTRB值为0的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div { 
    width: 400px;
    height: 300px; 
    margin:auto;
    position: absolute; 
    left: 0; 
    top: 0; 
    right: 0; 
    bottom: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> { 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>; 
    <span class="hljs-attribute">margin</span>:auto;
    <span class="hljs-attribute">position</span>: absolute; 
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>transform方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}
</code></pre>
<p>带文本元素的话，外面包一层div，让里面的line-height = height：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    height:30px;
    line-height:30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">30px</span>;
}</code></pre>
<p>flex弹性盒子布局居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    display: flex;
    flex-flow: row wrap;
    width: 408px; 
    align-items: center; 
    justify-content: center;
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: row wrap;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">408px</span>; 
    <span class="hljs-attribute">align-items</span>: center; 
    <span class="hljs-attribute">justify-content</span>: center;
} </code></pre>
<h3 id="articleHeader5">默认继承</h3>
<p>默认继承： font-size font-family color等, 元素有UL LI DL DD DT等;    <br>不可继承： border padding margin width height 等表现元素大小的属性。</p>
<h3 id="articleHeader6">清除浮动</h3>
<p>结尾处使用div空标签清除浮动(非div需要display:block)，不过这种方式向DOM添加了不必要的元素，使用不是很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clear{clear:both;} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.clear</span>{<span class="hljs-attribute">clear</span>:both;} 
</code></pre>
<p>利用overflow属性。必须定义width或zoom:1，同时不能定义height，应用值为hidden或auto的overflow属性有一个有用的副作用，这会自动清理包含的任何浮动元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    float:none;
    overflow:hidden; 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">float</span>:none;
    <span class="hljs-attribute">overflow</span>:hidden; 
} </code></pre>
<p>给父级div定义伪类：after和zoom(zoom为IE6.7专属)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:after{
    content:'';
    height:0;
    display:block;
    visibility:hidden;
    clear:both
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">visibility</span>:hidden;
    <span class="hljs-attribute">clear</span>:both
}</code></pre>
<h3 id="articleHeader7">最大最小宽度高度兼容</h3>
<p>当使用height:auto 时应考虑到元素最大或最小的宽度高度，以便容错。、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    min-height:500px;
    height:auto;
    max-width:500px;
    width:auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">min-height</span>:<span class="hljs-number">500px</span>;
    <span class="hljs-attribute">height</span>:auto;
    <span class="hljs-attribute">max-width</span>:<span class="hljs-number">500px</span>;
    <span class="hljs-attribute">width</span>:auto;
}</code></pre>
<h3 id="articleHeader8">cursor 属性（禁点）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;mailto:xzavierhua@gmail.com&quot; &quot;email me&quot;>email me</a>
a {cursor:not-allowed;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"mailto:xzavierhua@gmail.com"</span> <span class="hljs-string">"email me"</span>&gt;email me&lt;/a&gt;
<span class="hljs-selector-tag">a</span> {<span class="hljs-attribute">cursor</span>:not-allowed;}
</code></pre>
<p>cursor其他常用属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="default    默认光标（通常是一个箭头）
auto       默认。浏览器设置的光标。
crosshair  光标呈现为十字线。
pointer    光标呈现为指示链接的指针（一只手）
move       此光标指示某对象可被移动。
text       此光标指示文本。
wait       此光标指示程序正忙（通常是一只表或沙漏）。
help       此光标指示可用的帮助（通常是一个问号或一个气球）。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>default    默认光标（通常是一个箭头）
<span class="hljs-attribute">auto</span>       默认。浏览器设置的光标。
crosshair  光标呈现为十字线。
pointer    光标呈现为指示链接的指针（一只手）
move       此光标指示某对象可被移动。
text       此光标指示文本。
wait       此光标指示程序正忙（通常是一只表或沙漏）。
help       此光标指示可用的帮助（通常是一个问号或一个气球）。</code></pre>
<h3 id="articleHeader9">window font &amp;&amp; mac font 兼容</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    font-family: &quot;PingFang SC&quot;,&quot;microsoft yahei&quot;,Arial,Helvetica,sans-serif;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>* {
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"PingFang SC"</span>,<span class="hljs-string">"microsoft yahei"</span>,Arial,Helvetica,sans-serif;
}</code></pre>
<p>'PingFang SC'是mac下和微软雅黑接近的字体，'microsoft yahei'同'微软雅黑'，不过有些网站不兼容中文(GB2312)的字符还是用英文的比较好，Arial主要用于文字中的数字。</p>
<h3 id="articleHeader10">阻止事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;mailto:xzavierhua@gmail.com&quot; &quot;email me&quot;>email me</a>
a {pointer-events:none;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"mailto:xzavierhua@gmail.com"</span> <span class="hljs-string">"email me"</span>&gt;email me&lt;/a&gt;
<span class="hljs-selector-tag">a</span> {<span class="hljs-attribute">pointer-events</span>:none;}
</code></pre>
<h3 id="articleHeader11">禁止选中文本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    -moz-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>* {
    <span class="hljs-attribute">-moz-user-select</span>:none;
    <span class="hljs-attribute">-webkit-user-select</span>:none;
    <span class="hljs-attribute">-ms-user-select</span>:none;
    <span class="hljs-attribute">user-select</span>:none;
}</code></pre>
<h3 id="articleHeader12">a标签hover</h3>
<p>被点击访问过的超链接样式不在具有hover和active的样式了,解决方法是改变CSS属性的排列顺序: <br><code>L-V-H-A（link,visited,hover,active）</code></p>
<h3 id="articleHeader13">CSS写一个简单的幻灯片效果</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
      width:480px;
      height:320px;
      margin:50px auto;
      overflow: hidden;
      box-shadow:0 0 5px rgba(0,0,0,1);
      background-size: cover;
      background-position: center;
      -webkit-animation-name: &quot;loops&quot;;
      -webkit-animation-duration: 20s;
      -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes &quot;loops&quot; {
    0% {background:url(0.jpg) no-repeat;}
    25% {background:url(1.jpg) no-repeat;}
    50% {background:url(2.jpg) no-repeat;}
    75% {background:url(3.jpg) no-repeat;}
    100% {background:url(4.jpg) no-repeat;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
      <span class="hljs-attribute">width</span>:<span class="hljs-number">480px</span>;
      <span class="hljs-attribute">height</span>:<span class="hljs-number">320px</span>;
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> auto;
      <span class="hljs-attribute">overflow</span>: hidden;
      <span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(0,0,0,1);
      <span class="hljs-attribute">background-size</span>: cover;
      <span class="hljs-attribute">background-position</span>: center;
      <span class="hljs-attribute">-webkit-animation-name</span>: <span class="hljs-string">"loops"</span>;
      <span class="hljs-attribute">-webkit-animation-duration</span>: <span class="hljs-number">20s</span>;
      <span class="hljs-attribute">-webkit-animation-iteration-count</span>: infinite;
}
@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> <span class="hljs-string">"loops"</span> {
    0% {<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(0.jpg) no-repeat;}
    25% {<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(1.jpg) no-repeat;}
    50% {<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(2.jpg) no-repeat;}
    75% {<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(3.jpg) no-repeat;}
    100% {<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(4.jpg) no-repeat;}
}</code></pre>
<h3 id="articleHeader14">rgba()和opacity</h3>
<p>rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度 ;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    opacity:0.5;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.5</span>;
}
</code></pre>
<p>而rgba()只作用于元素的颜色或其背景色。设置rgba透明的元素的子元素不会继承透明效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    background: rgba(255,255,0,0.8);
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(255,255,0,0.8);
  }
</code></pre>
<h3 id="articleHeader15">使用圆角</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {  
    -moz-border-radius: 5px;  
    -webkit-border-radius: 5px;  
    border-radius: 5px;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {  
    <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">5px</span>;  
    <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">5px</span>;  
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;  
}</code></pre>
<h3 id="articleHeader16">!important</h3>
<p>css优先级为:   !important &gt; 内联样式 &gt;  id &gt; class &gt; tag      <br>所以，使用!important时需要小心。</p>
<h3 id="articleHeader17">伪类使用</h3>
<p>p:first-of-type 选择属于其父元素的首个p元素。     <br>p:last-of-type  选择属于其父元素的最后p元素。     <br>p:only-of-type  选择属于其父元素唯一的p元素。     <br>p:only-child    选择属于其父元素的唯一子元素。     <br>p:nth-child(n)  选择属于其父元素的第n个子元素。     <br>:enabled :disabled 控制表单控件的禁用状态。     <br>:checked 单选框或复选框被选中<br>::selection  匹配被用户选取的选取是部分</p>
<h3 id="articleHeader18">position的relative和absolute</h3>
<p>position参考文章：<a href="https://segmentfault.com/a/1190000000680773">详解css相对定位和绝对定位</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child&quot;></div>
</div>

.parent{
    position: absolute;  //变换这段代码做测试
    border: 1px solid #ccc;
    height: 200px;
    width: 200px;
}
.child{
    position: relative;  //变换这段代码做测试
    left: 100px;
    top:100px;
    background: blue;
    height: 50px;
    width: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"child"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

.parent{
    <span class="hljs-attribute">position</span>: absolute;  <span class="hljs-comment">//变换这段代码做测试</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
.child{
    <span class="hljs-attribute">position</span>: relative;  <span class="hljs-comment">//变换这段代码做测试</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: blue;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<p>relative：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果设定TRBL，并且父级没有设定position属性，仍旧以父级的左上角为原点进行定位。
如果设定TRBL，并且父级设定position属性，则以父级的左上角为原点进行定位，位置由TRBL决定。如果父级有Padding属性，那么就以内容区域的左上角为原点，进行定位。
相对定位总是以父级左上角为原点进行定位的，如果父级不存在，则以浏览器左上角进行定位。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>如果设定TRBL，并且父级没有设定<span class="hljs-attribute">position</span>属性，仍旧以父级的左上角为原点进行定位。
如果设定TRBL，并且父级设定<span class="hljs-attribute">position</span>属性，则以父级的左上角为原点进行定位，位置由TRBL决定。如果父级有<span class="hljs-attribute">Padding</span>属性，那么就以内容区域的左上角为原点，进行定位。
相对定位总是以父级左上角为原点进行定位的，如果父级不存在，则以浏览器左上角进行定位。

</code></pre>
<p>absolute：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果设定TRBL，并且父级没有设定position属性，那么当前的absolute则以浏览器左上角为原始点进行定位，位置将由TRBL决定。    
如果设定TRBL，并且父级设定position属性，则以父级的左上角为原点进行定位，位置由TRBL决 定。只以父级左上角为原点进行定位，父级的padding对其根本没有影响。    
使用绝对定位的盒子以它的“最近”的一个“已经定位”的“祖先元素”为基准进行定位。如果没有已经定位的祖先元素，那么会以浏览器窗口为基准进行定位。
绝对定位的框从标准流中脱离，这意味着他们对其后的兄弟盒子的定位没有影响，其他的盒子好像就好像这个盒子不存在一样。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>如果设定TRBL，并且父级没有设定<span class="hljs-attribute">position</span>属性，那么当前的absolute则以浏览器左上角为原始点进行定位，位置将由TRBL决定。    
如果设定TRBL，并且父级设定<span class="hljs-attribute">position</span>属性，则以父级的左上角为原点进行定位，位置由TRBL决 定。只以父级左上角为原点进行定位，父级的<span class="hljs-attribute">padding</span>对其根本没有影响。    
使用绝对定位的盒子以它的“最近”的一个“已经定位”的“祖先元素”为基准进行定位。如果没有已经定位的祖先元素，那么会以浏览器窗口为基准进行定位。
绝对定位的框从标准流中脱离，这意味着他们对其后的兄弟盒子的定位没有影响，其他的盒子好像就好像这个盒子不存在一样。
</code></pre>
<h3 id="articleHeader19">使用新特性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="盒子阴影（box-shadow）
文本阴影（text-shadow、）    
transform:rotate(9deg)scale(0.85,0.90)translate(0px,-30px)skew(-9deg,0deg);// 旋转,缩放,定位,倾斜
媒体查询 @media (min-width: 1280px)
border-image 嵌入图片形式的边框 border-image: url(border.png) 27/27px round;
线性渐变（gradient） linear-gradient 线性渐变  radial-gradient 径向渐变 等等
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>盒子阴影（<span class="hljs-built_in">box</span>-shadow）
文本阴影（<span class="hljs-built_in">text</span>-shadow、）    
transform:<span class="hljs-built_in">rotate</span>(<span class="hljs-number">9</span>deg)<span class="hljs-built_in">scale</span>(<span class="hljs-number">0.85</span>,<span class="hljs-number">0.90</span>)<span class="hljs-built_in">translate</span>(<span class="hljs-number">0</span>px,<span class="hljs-number">-30</span>px)skew(<span class="hljs-number">-9</span>deg,<span class="hljs-number">0</span>deg);<span class="hljs-comment">// 旋转,缩放,定位,倾斜</span>
媒体查询 @media (<span class="hljs-built_in">min</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">1280</span>px)
border-<span class="hljs-built_in">image</span> 嵌入图片形式的边框 border-<span class="hljs-built_in">image</span>: url(border.png) <span class="hljs-number">27</span>/<span class="hljs-number">27</span>px <span class="hljs-built_in">round</span>;
线性渐变（gradient） linear-gradient 线性渐变  radial-gradient 径向渐变 等等
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
揪css系列（1）-业务代码中可用的小技巧

## 原文链接
[https://segmentfault.com/a/1190000006739376](https://segmentfault.com/a/1190000006739376)

