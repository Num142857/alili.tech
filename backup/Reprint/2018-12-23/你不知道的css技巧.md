---
title: '你不知道的css技巧' 
date: 2018-12-23 2:30:07
hidden: true
slug: 4pczvpxa0dp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">css黑科技</h2>
<p><strong>currentColor当前颜色</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;##&quot; class=&quot;link&quot;><i class=&quot;icon&quot;></i>返回</a>
.icon {
  display: inline-block;
  width: 16px; 
  height: 20px;
  background-image: url(http:jartto.wang/test.png);
  background-color: currentColor; /* 该颜色控制图标的颜色 */
  background-position: 0 0;
}
.link:hover {
  color: #333; /* 虽然改变的是文字颜色，但是图标颜色也一起变化了 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;a href=<span class="hljs-string">"##"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"link"</span>&gt;&lt;i <span class="hljs-keyword">class</span>=<span class="hljs-string">"icon"</span>&gt;&lt;/i&gt;返回&lt;/a&gt;
.icon {
  <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
  <span class="hljs-built_in">width</span>: <span class="hljs-number">16</span>px; 
  <span class="hljs-built_in">height</span>: <span class="hljs-number">20</span>px;
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(http:jartto.wang/test.png);
  <span class="hljs-built_in">background</span>-color: currentColor; <span class="hljs-comment">/* 该颜色控制图标的颜色 */</span>
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
.link:hover {
  color: #<span class="hljs-number">333</span>; <span class="hljs-comment">/* 虽然改变的是文字颜色，但是图标颜色也一起变化了 */</span>
}</code></pre>
<p><strong>vh、vw、vmin、vmax单位</strong><br>浏览器的视口的宽、高被分为100份，1vh相当于浏览器高度的百分之一，即浏览器的高度为800px,则1vh=8px。<br>vw宽度同理。vh、vw支持calc算法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
  height: calc(100vh - 50px);
}
h1 {
  font-size: 8vw;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100vh - 50px);
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">8vw</span>;
}</code></pre>
<p>vmin和vmax是与这次宽度和高度的最大值或最小值有关，取决于哪个更大和更小。例如，如果浏览器设置为<br>1100px宽、700px高，1vmin会是7px,1vmax为11px。然而，如果宽度设置为800px，高度设置为1080px，<br>1vmin将会等于8px而1vmax将会是10.8px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
  height: calc(100vmax - 50px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100vmax - 50px);
}</code></pre>
<p><strong>边框多个颜色</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    border-style:solid;
    border-color:red green blue pink;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">border-style</span>:solid;
    <span class="hljs-attribute">border-color</span>:red green blue pink;
}</code></pre>
<p>必须设置border-style才会有效果</p>
<p><strong>css画小箭头</strong><br>使用border和transparent属性实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*箭头向上*/
.arrow-up {
  width:0;
  height:0;
  border-left:30px solid transparent;
  border-right:30px solid transparent;
  border-bottom:30px solid #fff;
}
/*箭头向下*/
.arrow-down {
  width:0;
  height:0;
  border-left:20px solid transparent;
  border-right:20px solid transparent;
  border-top:20px solid #0066cc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*箭头向上*/</span>
<span class="hljs-selector-class">.arrow-up</span> {
  <span class="hljs-attribute">width</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-left</span>:<span class="hljs-number">30px</span> solid transparent;
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">30px</span> solid transparent;
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">30px</span> solid <span class="hljs-number">#fff</span>;
}
<span class="hljs-comment">/*箭头向下*/</span>
<span class="hljs-selector-class">.arrow-down</span> {
  <span class="hljs-attribute">width</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-left</span>:<span class="hljs-number">20px</span> solid transparent;
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">20px</span> solid transparent;
  <span class="hljs-attribute">border-top</span>:<span class="hljs-number">20px</span> solid <span class="hljs-number">#0066cc</span>;
}</code></pre>
<p><strong>图片滤镜效果</strong><br>使用filter属性可以实现各种各样的图片效果，包括以下属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grayscale 灰度
sepia 褐色
saturate 饱和度
hue-rotate 色相旋转
invert 反色
opacity 透明度
brightness 亮度
contrast 对比度
blur 模糊
drop-shadow 阴影" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>grayscale 灰度
sepia 褐色
saturate 饱和度
hue-rotate 色相旋转
invert 反色
opacity 透明度
<span class="hljs-keyword">brightness </span>亮度
contrast 对比度
<span class="hljs-keyword">blur </span>模糊
drop-<span class="hljs-keyword">shadow </span>阴影</code></pre>
<p><strong>浏览器滚动条美化（仅支持webkit内核浏览器）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*滚动条 start*/
::-webkit-scrollbar {
  width: 1px;
  height: 4px;
  background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background: #fff ;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  // background-color:rgba(7, 170, 247, 0.7);
  background-color: transparent;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:rgba(7, 170, 247, 1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/*滚动条 start*/</span>
::-webkit-scrollbar {
  width: <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F5F5F5</span>;
}
<span class="hljs-comment">/*定义滚动条轨道 内阴影+圆角*/</span>
::-webkit-scrollbar-track {
  box-shadow: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.3</span>);
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span> ;
}
<span class="hljs-comment">/*定义滑块 内阴影+圆角*/</span>
::-webkit-scrollbar-thumb {
  border-radius: <span class="hljs-number">3px</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">3</span>);
  <span class="hljs-comment">// background-color:rgba(7, 170, 247, 0.7);</span>
  <span class="hljs-attribute">background-color</span>: transparent;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: <span class="hljs-number">3px</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">3</span>);
  <span class="hljs-attribute">background-color</span>:rgba(<span class="hljs-number">7</span>, <span class="hljs-number">170</span>, <span class="hljs-number">247</span>, <span class="hljs-number">1</span>);
}</code></pre>
<p><strong>使用 :not() 在菜单上应用/取消应用边框</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nav li:not(:last-child) {
  border-right: 1px solid #666;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:last-child)</span> {
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#666</span>;
}</code></pre>
<p><strong>浏览器默认行高line-height一般为1.15倍，可以给body设置line-height:1来设置行高为1.0倍</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
      line-height: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
      <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p><strong>使用负的 nth-child 选择项目</strong><br>在CSS中使用负的 nth-child 选择项目1到项目n。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li {
  display: none;
}
li:nth-child(-n+3) {
  display: block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(-n+3)</span> {
  <span class="hljs-attribute">display</span>: block;
}</code></pre>
<p><strong>禁用鼠标事件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".disabled {
    pointer-events: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.disabled</span> {
    <span class="hljs-attribute">pointer-events</span>: none;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的css技巧

## 原文链接
[https://segmentfault.com/a/1190000012296249](https://segmentfault.com/a/1190000012296249)

