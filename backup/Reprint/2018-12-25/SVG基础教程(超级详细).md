---
title: 'SVG基础教程(超级详细)' 
date: 2018-12-25 2:30:11
hidden: true
slug: pvf3acqr888
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、内置图形:</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rect(矩形)    
circle(圆)  
ellipse(椭圆)   
line(直线)   
polyline(折线)  
polygon(多边形)  
path(路径)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">rect</span><span class="hljs-params">(矩形)</span></span>    
<span class="hljs-function"><span class="hljs-title">circle</span><span class="hljs-params">(圆)</span></span>  
<span class="hljs-function"><span class="hljs-title">ellipse</span><span class="hljs-params">(椭圆)</span></span>   
<span class="hljs-function"><span class="hljs-title">line</span><span class="hljs-params">(直线)</span></span>   
<span class="hljs-function"><span class="hljs-title">polyline</span><span class="hljs-params">(折线)</span></span>  
<span class="hljs-function"><span class="hljs-title">polygon</span><span class="hljs-params">(多边形)</span></span>  
<span class="hljs-function"><span class="hljs-title">path</span><span class="hljs-params">(路径)</span></span></code></pre>
<h2 id="articleHeader1">二、内置图形的html属性或(css样式):</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fill(填充颜色)   
fill-opacity(填充透明度)
stroke(边框颜色)   
stroke-width(边框宽度)   
stroke-opacity(边框透明度)   
stroke-dasharray(创建虚线)
transform(变换)
filter(滤镜)(url[#滤镜id)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">fill</span><span class="hljs-params">(填充颜色)</span></span>   
<span class="hljs-function"><span class="hljs-title">fill-opacity</span><span class="hljs-params">(填充透明度)</span></span>
<span class="hljs-function"><span class="hljs-title">stroke</span><span class="hljs-params">(边框颜色)</span></span>   
<span class="hljs-function"><span class="hljs-title">stroke-width</span><span class="hljs-params">(边框宽度)</span></span>   
<span class="hljs-function"><span class="hljs-title">stroke-opacity</span><span class="hljs-params">(边框透明度)</span></span>   
<span class="hljs-function"><span class="hljs-title">stroke-dasharray</span><span class="hljs-params">(创建虚线)</span></span>
<span class="hljs-function"><span class="hljs-title">transform</span><span class="hljs-params">(变换)</span></span>
<span class="hljs-function"><span class="hljs-title">filter</span><span class="hljs-params">(滤镜)</span><span class="hljs-params">(url[#滤镜id)</span></span>]</code></pre>
<h2 id="articleHeader2">三、常见图形用法</h2>
<h3 id="articleHeader3">1、矩形</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;100&quot; height=&quot;100&quot; fill=&quot;#f06&quot;/> 
<!--x表示横坐标，y表示纵坐标，width表示宽，height表示高-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#f06"</span>/&gt;</span> 
<span class="hljs-comment">&lt;!--x表示横坐标，y表示纵坐标，width表示宽，height表示高--&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqC8?w=109&amp;h=107" src="https://static.alili.tech/img/bVbhqC8?w=109&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<rect x=&quot;50&quot; y=&quot;20&quot; width=&quot;150&quot; height=&quot;150&quot;
      style=&quot;fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9&quot;/>
 
<rect x=&quot;50&quot; y=&quot;20&quot; width=&quot;150&quot; height=&quot;150&quot;
      fill=&quot;red&quot; stroke=&quot;blue&quot; stroke-width=&quot;20&quot; fill-opacity=&quot;1&quot; stroke-opacity=&quot;0.1&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"20"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"150"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"150"</span>
      style=<span class="hljs-string">"fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"</span>/&gt;
 
&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"20"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"150"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"150"</span>
      <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"blue"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"20"</span> <span class="hljs-built_in">fill</span>-opacity=<span class="hljs-string">"1"</span> <span class="hljs-built_in">stroke</span>-opacity=<span class="hljs-string">"0.1"</span>/&gt;</code></pre>
<h3 id="articleHeader4">2、圆</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<circle cx=&quot;100&quot; cy=&quot;50&quot; r=&quot;100&quot; fil='#f06'/>            
<!-- cx表示圆心横坐标，cy表示圆心纵坐标，r表示半径 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">fil</span>=<span class="hljs-string">'#f06'</span>/&gt;</span>            
<span class="hljs-comment">&lt;!-- cx表示圆心横坐标，cy表示圆心纵坐标，r表示半径 --&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqDl?w=129&amp;h=115" src="https://static.alili.tech/img/bVbhqDl?w=129&amp;h=115" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<circle cx=&quot;100&quot; cy=&quot;50&quot; r=&quot;40&quot; 
        style=&quot;stroke:blue;stroke-width:10;fill:pink&quot;/>
 
<circle cx=&quot;100&quot; cy=&quot;50&quot; r=&quot;40&quot; 
        stroke=&quot;black&quot; stroke-width=&quot;2&quot; fill=&quot;red&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"100"</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"40"</span> 
        style=<span class="hljs-string">"stroke:blue;stroke-width:10;fill:pink"</span>/&gt;
 
&lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"100"</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"40"</span> 
        <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"black"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"2"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span>/&gt;</code></pre>
<h3 id="articleHeader5">3、椭圆</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ellipse cx=&quot;300&quot; cy=&quot;80&quot; rx=&quot;150&quot; ry=&quot;100&quot; fill='#f06'/>  
<!-- cx表示圆心横坐标，cy表示圆心纵坐标，rx表示横向半径，ry表示纵向半径 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ellipse</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"80"</span> <span class="hljs-attr">rx</span>=<span class="hljs-string">"150"</span> <span class="hljs-attr">ry</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">'#f06'</span>/&gt;</span>  
<span class="hljs-comment">&lt;!-- cx表示圆心横坐标，cy表示圆心纵坐标，rx表示横向半径，ry表示纵向半径 --&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqDA?w=173&amp;h=120" src="https://static.alili.tech/img/bVbhqDA?w=173&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ellipse cx=&quot;300&quot; cy=&quot;80&quot; rx=&quot;100&quot; ry=&quot;50&quot; 
         style=&quot;fill:yellow;stroke:purple;stroke-width:2&quot; />
 
<ellipse cx=&quot;300&quot; cy=&quot;80&quot; rx=&quot;100&quot; ry=&quot;50&quot; 
         fill=&quot;pink&quot; stroke=&quot;red&quot; stroke-width=&quot;2&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>&lt;<span class="hljs-built_in">ellipse</span> cx=<span class="hljs-string">"300"</span> cy=<span class="hljs-string">"80"</span> rx=<span class="hljs-string">"100"</span> ry=<span class="hljs-string">"50"</span> 
         style=<span class="hljs-string">"fill:yellow;stroke:purple;stroke-width:2"</span> /&gt;
 
&lt;<span class="hljs-built_in">ellipse</span> cx=<span class="hljs-string">"300"</span> cy=<span class="hljs-string">"80"</span> rx=<span class="hljs-string">"100"</span> ry=<span class="hljs-string">"50"</span> 
         <span class="hljs-built_in">fill</span>=<span class="hljs-string">"pink"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"2"</span>/&gt;</code></pre>
<h3 id="articleHeader6">4、直线</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<line x1=&quot;0&quot; y1=&quot;100&quot; x2=&quot;100&quot; y2=&quot;0&quot;/>    
<!-- x1起点横坐标，y1表示起点纵坐标，x2表示终点横坐标，y2表示终点纵坐标 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">line</span> <span class="hljs-attr">x1</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y1</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">x2</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">y2</span>=<span class="hljs-string">"0"</span>/&gt;</span>    
<span class="hljs-comment">&lt;!-- x1起点横坐标，y1表示起点纵坐标，x2表示终点横坐标，y2表示终点纵坐标 --&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqDE?w=167&amp;h=141" src="https://static.alili.tech/img/bVbhqDE?w=167&amp;h=141" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<line x1=&quot;0&quot; y1=&quot;0&quot; x2=&quot;200&quot; y2=&quot;200&quot;
      style=&quot;stroke:rgb(255,0,0);stroke-width:2&quot;/>
 
<line x1=&quot;0&quot; y1=&quot;0&quot; x2=&quot;200&quot; y2=&quot;200&quot; 
      stroke=&quot;red&quot; stroke-width=&quot;10&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">line</span> x1=<span class="hljs-string">"0"</span> y1=<span class="hljs-string">"0"</span> x2=<span class="hljs-string">"200"</span> y2=<span class="hljs-string">"200"</span>
      style=<span class="hljs-string">"stroke:rgb(255,0,0);stroke-width:2"</span>/&gt;
 
&lt;<span class="hljs-built_in">line</span> x1=<span class="hljs-string">"0"</span> y1=<span class="hljs-string">"0"</span> x2=<span class="hljs-string">"200"</span> y2=<span class="hljs-string">"200"</span> 
      <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"10"</span>/&gt;</code></pre>
<h3 id="articleHeader7">5、多边形</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<polygon points=&quot;50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40&quot; fill='#f06'/>         
<!-- 200,10为第一个点   250,190为第二个点  160,210为第三个点 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">polygon</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">'#f06'</span>/&gt;</span>         
<span class="hljs-comment">&lt;!-- 200,10为第一个点   250,190为第二个点  160,210为第三个点 --&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqDJ?w=131&amp;h=114" src="https://static.alili.tech/img/bVbhqDJ?w=131&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>扩展坐标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<polygon points=&quot;200,10 250,190 160,210&quot; 
         style=&quot;fill:lime;stroke:purple;stroke-width:1&quot; />

<polygon points=&quot;200,10 250,190 160,210&quot;
         fill=&quot;red&quot; stroke=&quot;blue&quot; stroke-width=&quot;1&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;<span class="hljs-built_in">polygon</span> <span class="hljs-built_in">points</span>=<span class="hljs-string">"200,10 250,190 160,210"</span> 
         <span class="hljs-built_in">style</span>=<span class="hljs-string">"fill:lime;stroke:purple;stroke-width:1"</span> /&gt;

&lt;<span class="hljs-built_in">polygon</span> <span class="hljs-built_in">points</span>=<span class="hljs-string">"200,10 250,190 160,210"</span>
         fill=<span class="hljs-string">"red"</span> stroke=<span class="hljs-string">"blue"</span> stroke-<span class="hljs-built_in">width</span>=<span class="hljs-string">"1"</span> /&gt;</code></pre>
<p>第一个点和最后一个点会连接起来，形成闭合的图形</p>
<h3 id="articleHeader8">6、折线</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<polyline points=&quot;50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40&quot; fill='#f06'/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dns"><code style="word-break: break-word; white-space: initial;">&lt;polyline points="<span class="hljs-number">50,0 60,40</span> <span class="hljs-number">100,50 60,60</span> <span class="hljs-number">50,100 40,60</span> <span class="hljs-number">0,50 40,40</span>" fill='#f06'/&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbhqDS?w=139&amp;h=116" src="https://static.alili.tech/img/bVbhqDS?w=139&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<polyline points=&quot;0,40 40,40 40,80 80,80 80,120 120,120 120,160&quot; 
          style=&quot;fill:none;stroke:red;stroke-width:4&quot; /> 
<!--此处将fill设置为none，可以仅仅画曲线，而如果fill有值，则会形成由曲线围城的多边形-->
    
<polyline points=&quot;0,40 40,40 40,80 80,80 80,120 120,120 120,160&quot; 
          style=&quot;fill:blue;stroke:red;stroke-width:4&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">polyline</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"0,40 40,40 40,80 80,80 80,120 120,120 120,160"</span> 
          <span class="hljs-attr">style</span>=<span class="hljs-string">"fill:none;stroke:red;stroke-width:4"</span> /&gt;</span> 
<span class="hljs-comment">&lt;!--此处将fill设置为none，可以仅仅画曲线，而如果fill有值，则会形成由曲线围城的多边形--&gt;</span>
    
<span class="hljs-tag">&lt;<span class="hljs-name">polyline</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"0,40 40,40 40,80 80,80 80,120 120,120 120,160"</span> 
          <span class="hljs-attr">style</span>=<span class="hljs-string">"fill:blue;stroke:red;stroke-width:4"</span> /&gt;</span></code></pre>
<p>第一个点不会和最后一个点连起来，不会闭合</p>
<h3 id="articleHeader9">7、路径</h3>
<blockquote>路径是svg中最强大的图形</blockquote>
<p>路径是由一系列命令所组成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="命令            名称                        参数
 M           moveto  移动到                (x y)+
 Z          closepath  关闭路径            (none)
 L           lineto  画线到                (x y)+
 H          horizontal lineto  水平线到      x+
 V          vertical lineto  垂直线到        y+
 A        elliptical arc椭圆弧             (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
 C        curveto 三次贝塞尔曲线到          (x1 y1 x2 y2 x y)+
 S     smooth curveto光滑三次贝塞尔曲线到   (x2 y2 x y)+
 Q        Bézier curveto二次贝塞尔曲线到    (x1 y1 x y)+
 T     smooth Bézier curveto光滑二次贝塞尔曲线到  (x y)+
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>命令            名称                        参数
 M           moveto  移动到                (<span class="hljs-keyword">x</span> y)+
 Z          closepath  关闭路径            (none)
 L           lineto  画线到                (<span class="hljs-keyword">x</span> y)+
 H          horizontal lineto  水平线到      <span class="hljs-keyword">x</span>+
 V          vertical lineto  垂直线到        y+
 A        elliptical arc椭圆弧             (rx ry <span class="hljs-keyword">x</span>-axis-rotation large-arc-flag sweep-flag <span class="hljs-keyword">x</span> y)+
 C        curveto 三次贝塞尔曲线到          (<span class="hljs-keyword">x</span><span class="hljs-number">1</span> y<span class="hljs-number">1</span> <span class="hljs-keyword">x</span><span class="hljs-number">2</span> y<span class="hljs-number">2</span> <span class="hljs-keyword">x</span> y)+
 S     smooth curveto光滑三次贝塞尔曲线到   (<span class="hljs-keyword">x</span><span class="hljs-number">2</span> y<span class="hljs-number">2</span> <span class="hljs-keyword">x</span> y)+
 Q        Bézier curveto二次贝塞尔曲线到    (<span class="hljs-keyword">x</span><span class="hljs-number">1</span> y<span class="hljs-number">1</span> <span class="hljs-keyword">x</span> y)+
 T     smooth Bézier curveto光滑二次贝塞尔曲线到  (<span class="hljs-keyword">x</span> y)+
</code></pre>
<p>如果指令字母是大写的，例如M, 则表示坐标位置是绝对位置；如果指令字母小写的，例如m, 则表示坐标位置是相对位置。</p>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M150 0 L75 200 L225 200 Z&quot; />      
<!-- d属性中包含所有路径的点，最后起点和终点连接起来形成闭合图形 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M150 0 L75 200 L225 200 Z"</span> /&gt;</span>      
<span class="hljs-comment">&lt;!-- d属性中包含所有路径的点，最后起点和终点连接起来形成闭合图形 --&gt;</span></code></pre>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M150 0 L75 200 L225 200 Z&quot; 
      fill=&quot;red&quot; stroke=&quot;blue&quot; stroke-width=&quot;10&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;path d=<span class="hljs-string">"M150 0 L75 200 L225 200 Z"</span> 
      <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"blue"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"10"</span>/&gt;</code></pre>
<p>图片描述</p>
<h4>7.1、贝塞尔曲线(CSQT简称“厕所切图”)</h4>
<p>(1)、三次贝塞尔曲线</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cx1 y1, x2 y2, x y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code style="word-break: break-word; white-space: initial;">Cx<span class="hljs-number">1</span> y<span class="hljs-number">1</span>, <span class="hljs-keyword">x</span><span class="hljs-number">2</span> y<span class="hljs-number">2</span>, <span class="hljs-keyword">x</span> y</code></pre>
<p>x1,y1 和x2，y2分别为控制点1和2，而x，y为曲线上的关键点<br>图片描述<br>下面为曲线上的点随着时间的变化而变化的过程。<br><span class="img-wrap"><img data-src="/img/bVYOo5?w=375&amp;h=211" src="https://static.alili.tech/img/bVYOo5?w=375&amp;h=211" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M20 20 C90 140,130 140,200 25&quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">&lt;path d=<span class="hljs-string">"M20 20 C90 140,130 140,200 25"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;</code></pre>
<p>(2)、光滑三次贝塞尔曲线</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sx2 y2, x y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code style="word-break: break-word; white-space: initial;">Sx<span class="hljs-number">2</span> y<span class="hljs-number">2</span>, <span class="hljs-keyword">x</span> y</code></pre>
<p>S指令跟在C指令或S指令后面补刀，它会自动在C、S基础上生成一个对称点，所以S指令只需要两个点就可以。<br><span class="img-wrap"><img data-src="/img/bVYOpB?w=345&amp;h=291" src="https://static.alili.tech/img/bVYOpB?w=345&amp;h=291" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M20 80 C90 140, 130 140, 180 80 S250 60, 280 120&quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>
<path d=&quot;M20 80 C90 140, 130 140, 180 80 S250 60, 280 120 S380 150, 450 80&quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>
<path d=&quot;M20 80 S80 150, 150 80&quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;path d=<span class="hljs-string">"M20 80 C90 140, 130 140, 180 80 S250 60, 280 120"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;
&lt;path d=<span class="hljs-string">"M20 80 C90 140, 130 140, 180 80 S250 60, 280 120 S380 150, 450 80"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;
&lt;path d=<span class="hljs-string">"M20 80 S80 150, 150 80"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;</code></pre>
<p>(3)、二次贝塞尔曲线</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Qx1 y1, x y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code style="word-break: break-word; white-space: initial;">Qx<span class="hljs-number">1</span> y<span class="hljs-number">1</span>, <span class="hljs-keyword">x</span> y</code></pre>
<p>(x1,y1)是控制点，(x,y)表示的是曲线的终点。<br><span class="img-wrap"><img data-src="/img/bVYOqe?w=409&amp;h=275" src="https://static.alili.tech/img/bVYOqe?w=409&amp;h=275" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>下面为曲线上的点随着时间的变化而变化的过程。<br><span class="img-wrap"><img data-src="/img/bVYOqj?w=355&amp;h=197" src="https://static.alili.tech/img/bVYOqj?w=355&amp;h=197" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M20 80 Q90 140, 130 80&quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">&lt;path d=<span class="hljs-string">"M20 80 Q90 140, 130 80"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;</code></pre>
<p>(4)、光滑二次贝塞尔曲线</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tx y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Tx y</span></code></pre>
<p>T指令和S指令类似，是给Q、T指令补刀的，T指令只有一个曲线终点，没有控制点(由Q的对称点自动生成)；<br>也可以单独使用，当单独使用时，是一条直线；<br><span class="img-wrap"><img data-src="/img/bVYOqx?w=400&amp;h=337" src="https://static.alili.tech/img/bVYOqx?w=400&amp;h=337" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M20 80 Q90 140, 130 80 T250 140 T350 40 &quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>
<path d=&quot;M20 80 T350 140 &quot; stroke=&quot;#000000&quot; fill=&quot;none&quot; style=&quot;stroke-width: 2px;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;path d=<span class="hljs-string">"M20 80 Q90 140, 130 80 T250 140 T350 40 "</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;
&lt;path d=<span class="hljs-string">"M20 80 T350 140 "</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> style=<span class="hljs-string">"stroke-width: 2px;"</span>/&gt;</code></pre>
<h4>7.2、圆弧</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A rx ry x-deg large-arc sweep-flag x y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code style="word-break: break-word; white-space: initial;">A rx ry <span class="hljs-keyword">x</span>-deg large-arc sweep-flag <span class="hljs-keyword">x</span> y</code></pre>
<p>rx ry表示x轴半径和y轴半径，x-deg表示x轴旋转角度，large-arc表示大于180度还是小于180度(0为小，1为大)，sweep-flag表示弧线方向(0为沿逆时针，1为沿顺时针)，x y为最终坐标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M80 80 A45 45, 0, 0, 0, 125 125&quot; fill=&quot;green&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">&lt;path d=<span class="hljs-string">"M80 80 A45 45, 0, 0, 0, 125 125"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"green"</span> /&gt;</code></pre>
<h3 id="articleHeader10">8、文本</h3>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<text x=&quot;10&quot; y=&quot;15&quot;>I love SVG</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-built_in">text</span> x=<span class="hljs-string">"10"</span> y=<span class="hljs-string">"15"</span>&gt;I love SVG&lt;/<span class="hljs-built_in">text</span>&gt;</code></pre>
<p>扩展用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<text x=&quot;0&quot; y=&quot;15&quot; 
      fill=&quot;red&quot; transform=&quot;rotate(30 20,40)&quot;>I love SVG</text>

<a xlink:href=&quot;http://www.w3schools.com/svg/&quot; target=&quot;_blank&quot;>
    <text x=&quot;0&quot; y=&quot;15&quot; fill=&quot;red&quot;>I love SVG</text>
</a>

<text x=&quot;200&quot; y=&quot;150&quot; dx=&quot;-5&quot; dy=&quot;5&quot; rotate=&quot;180&quot; textLength=&quot;90&quot;>
    i LOVE d3
</text>  
<!-- dx，dy表示平移的距离 -->

<text x=&quot;200&quot; y=&quot;150&quot; dx=&quot;-5&quot; dy=&quot;5&quot; rotate=&quot;180&quot; textLength=&quot;90&quot;>
    I LOVE <tspan fill=&quot;red&quot;>D3</tspan>      
</text>
<!-- 使用tspan对文本中的部分特殊定义 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"15"</span> 
      <span class="hljs-attr">fill</span>=<span class="hljs-string">"red"</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"rotate(30 20,40)"</span>&gt;</span>I love SVG<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"http://www.w3schools.com/svg/"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"15"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"red"</span>&gt;</span>I love SVG<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"150"</span> <span class="hljs-attr">dx</span>=<span class="hljs-string">"-5"</span> <span class="hljs-attr">dy</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">rotate</span>=<span class="hljs-string">"180"</span> <span class="hljs-attr">textLength</span>=<span class="hljs-string">"90"</span>&gt;</span>
    i LOVE d3
<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>  
<span class="hljs-comment">&lt;!-- dx，dy表示平移的距离 --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"150"</span> <span class="hljs-attr">dx</span>=<span class="hljs-string">"-5"</span> <span class="hljs-attr">dy</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">rotate</span>=<span class="hljs-string">"180"</span> <span class="hljs-attr">textLength</span>=<span class="hljs-string">"90"</span>&gt;</span>
    I LOVE <span class="hljs-tag">&lt;<span class="hljs-name">tspan</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"red"</span>&gt;</span>D3<span class="hljs-tag">&lt;/<span class="hljs-name">tspan</span>&gt;</span>      
<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 使用tspan对文本中的部分特殊定义 --&gt;</span></code></pre>
<p>沿path方向排列文本textPath</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path id=&quot;wavyPath&quot; d=&quot;M75,100 a50,25 0 1,0 50,25&quot; fill=&quot;none&quot; />
<text x=&quot;50&quot; y=&quot;50&quot; font-size=&quot;14&quot;>
    <textPath xlink:href=&quot;#wavyPath&quot;>
            Text travels along any path that you define for it.
    </textPath>
</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;path <span class="hljs-built_in">id</span>=<span class="hljs-string">"wavyPath"</span> d=<span class="hljs-string">"M75,100 a50,25 0 1,0 50,25"</span> fill=<span class="hljs-string">"none"</span> /&gt;
&lt;<span class="hljs-built_in">text</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"50"</span> font-size=<span class="hljs-string">"14"</span>&gt;
    &lt;textPath xlink:href=<span class="hljs-string">"#wavyPath"</span>&gt;
            Text travels along any path <span class="hljs-keyword">that</span> you define <span class="hljs-keyword">for</span> <span class="hljs-keyword">it</span>.
    &lt;/textPath&gt;
&lt;/<span class="hljs-built_in">text</span>&gt;</code></pre>
<h3 id="articleHeader11">9、渐变</h3>
<p>分为线形渐变和径向渐变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs>
    <linearGradient id=&quot;myGradient&quot; x1=&quot;0%&quot; y1=&quot;0%&quot; x2=&quot;100%&quot; y2=&quot;0%&quot;>  <!--x1,y1 x2,y2用来定义径向渐变的方向，此处为向右-->
        <stop offset=&quot;0%&quot; stop-color=&quot;blue&quot;>
        <stop offset=&quot;100%&quot; stop-color=&quot;red&quot;>
    </linearGradient>
    <radialGradient id=&quot;irisGradient&quot;>
        <stop offset=&quot;25%&quot; stop-color=&quot;green&quot; />
        <stop offset=&quot;100%&quot; stop-color=&quot;dodgerblue&quot; />
    </radialGradient>
</defs>
<rect fill=&quot;url(#myGradient)&quot; x1=&quot;10&quot; y1=&quot;10&quot; width=&quot;300&quot; height=&quot;100&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">linearGradient</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myGradient"</span> <span class="hljs-attr">x1</span>=<span class="hljs-string">"0%"</span> <span class="hljs-attr">y1</span>=<span class="hljs-string">"0%"</span> <span class="hljs-attr">x2</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">y2</span>=<span class="hljs-string">"0%"</span>&gt;</span>  <span class="hljs-comment">&lt;!--x1,y1 x2,y2用来定义径向渐变的方向，此处为向右--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">stop</span> <span class="hljs-attr">offset</span>=<span class="hljs-string">"0%"</span> <span class="hljs-attr">stop-color</span>=<span class="hljs-string">"blue"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">stop</span> <span class="hljs-attr">offset</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">stop-color</span>=<span class="hljs-string">"red"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">linearGradient</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">radialGradient</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"irisGradient"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">stop</span> <span class="hljs-attr">offset</span>=<span class="hljs-string">"25%"</span> <span class="hljs-attr">stop-color</span>=<span class="hljs-string">"green"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">stop</span> <span class="hljs-attr">offset</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">stop-color</span>=<span class="hljs-string">"dodgerblue"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">radialGradient</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"url(#myGradient)"</span> <span class="hljs-attr">x1</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">y1</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"100"</span>/&gt;</span></code></pre>
<h3 id="articleHeader12">10、定义和分组</h3>
<p>定义可重用部件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs></defs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;defs&gt;</span><span class="hljs-section">&lt;/defs&gt;</span></code></pre>
<p>使用g分组，或定义统一的样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g></g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;g&gt;</span><span class="hljs-section">&lt;/g&gt;</span></code></pre>
<p>使用&lt;use xlink:href="#lens" /&gt;引用在defs中定义的元素，还可在use上设置fill，stroke等属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;600&quot; height=&quot;600&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
    <defs>
        <polygon id=&quot;lens&quot; points=&quot;65,50 185,50 185,75, 150,100 100,100 65,75&quot; fill=&quot;red&quot; stroke=&quot;purple&quot; stroke-width=&quot;4&quot; />
        <radialGradient id=&quot;irisGradient&quot;>
            <stop offset=&quot;25%&quot; stop-color=&quot;green&quot; />
            <stop offset=&quot;100%&quot; stop-color=&quot;dodgerblue&quot; />
        </radialGradient>
        <g id=&quot;eye&quot;>
            <ellipse cy=&quot;50&quot; rx=&quot;50&quot; ry=&quot;25&quot; fill=&quot;none&quot; stroke=&quot;black&quot; />
            <circle cy=&quot;50&quot; r=&quot;25&quot; />
            <circle cy=&quot;50&quot; r=&quot;10&quot; fill=&quot;black&quot; />
        </g>
    </defs>
    <g stroke=&quot;red&quot; stroke-width=&quot;3&quot;>
        <ellipse cx=&quot;125&quot; cy=&quot;50&quot; rx=&quot;50&quot; ry=&quot;25&quot; fill=&quot;none&quot; stroke=&quot;black&quot; />
        <circle cx=&quot;125&quot; cy=&quot;50&quot; r=&quot;25&quot; fill=&quot;url(#irisGradient)&quot; />
        <circle cx=&quot;125&quot; cy=&quot;50&quot; r=&quot;10&quot; fill=&quot;black&quot; />
        <use xlink:href=&quot;#eye&quot; x=&quot;250&quot; fill=&quot;dodgerblue&quot; />
    </g>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;svg <span class="hljs-built_in">width</span>=<span class="hljs-string">"600"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"600"</span> xmlns=<span class="hljs-string">"http://www.w3.org/2000/svg"</span>&gt;
    &lt;defs&gt;
        &lt;polygon id=<span class="hljs-string">"lens"</span> points=<span class="hljs-string">"65,50 185,50 185,75, 150,100 100,100 65,75"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"purple"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"4"</span> /&gt;
        &lt;radialGradient id=<span class="hljs-string">"irisGradient"</span>&gt;
            &lt;<span class="hljs-built_in">stop</span> offset=<span class="hljs-string">"25%"</span> <span class="hljs-built_in">stop</span>-color=<span class="hljs-string">"green"</span> /&gt;
            &lt;<span class="hljs-built_in">stop</span> offset=<span class="hljs-string">"100%"</span> <span class="hljs-built_in">stop</span>-color=<span class="hljs-string">"dodgerblue"</span> /&gt;
        &lt;/radialGradient&gt;
        &lt;g id=<span class="hljs-string">"eye"</span>&gt;
            &lt;ellipse cy=<span class="hljs-string">"50"</span> rx=<span class="hljs-string">"50"</span> ry=<span class="hljs-string">"25"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"black"</span> /&gt;
            &lt;<span class="hljs-built_in">circle</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"25"</span> /&gt;
            &lt;<span class="hljs-built_in">circle</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"10"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"black"</span> /&gt;
        &lt;/g&gt;
    &lt;/defs&gt;
    &lt;g <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"3"</span>&gt;
        &lt;ellipse cx=<span class="hljs-string">"125"</span> cy=<span class="hljs-string">"50"</span> rx=<span class="hljs-string">"50"</span> ry=<span class="hljs-string">"25"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"black"</span> /&gt;
        &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"125"</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"25"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"url(#irisGradient)"</span> /&gt;
        &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"125"</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"10"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"black"</span> /&gt;
        &lt;use xlink:href=<span class="hljs-string">"#eye"</span> x=<span class="hljs-string">"250"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"dodgerblue"</span> /&gt;
    &lt;/g&gt;
&lt;/svg&gt;</code></pre>
<h3 id="articleHeader13">11、动画和交互性</h3>
<p>动画被弃用，请使用css animations或者web animations代替</p>
<h3 id="articleHeader14">12、事件</h3>
<p>最常用的是 onclick、onactivate、onmousedown、onmouseup、onmouseover、onmousemove、onmouseout、onload、onresize、 onunload 和 onrepeat。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot;
     xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; 
     width=&quot;120&quot; height=&quot;120&quot; viewBox=&quot;0 0 120 120&quot;
     version=&quot;1.1&quot;>
        <polygon points=&quot;60,30 90,90 30,90&quot; id=&quot;svg_polygon&quot;>
            <animateTransform attributeName=&quot;transform&quot; attributeType=&quot;XML&quot; type=&quot;rotate&quot; from=&quot;0 60 70&quot; to=&quot;360 60 70&quot; dur=&quot;10s&quot; repeatCount=&quot;indefinite&quot;/>
        </polygon>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span>
     <span class="hljs-attr">xmlns:xlink</span>=<span class="hljs-string">"http://www.w3.org/1999/xlink"</span> 
     <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"120"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 120 120"</span>
     <span class="hljs-attr">version</span>=<span class="hljs-string">"1.1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">polygon</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"60,30 90,90 30,90"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"svg_polygon"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">animateTransform</span> <span class="hljs-attr">attributeName</span>=<span class="hljs-string">"transform"</span> <span class="hljs-attr">attributeType</span>=<span class="hljs-string">"XML"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"rotate"</span> <span class="hljs-attr">from</span>=<span class="hljs-string">"0 60 70"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"360 60 70"</span> <span class="hljs-attr">dur</span>=<span class="hljs-string">"10s"</span> <span class="hljs-attr">repeatCount</span>=<span class="hljs-string">"indefinite"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">polygon</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    //svg_hexagon为path的id
    document.getElementById(&quot;svg_polygon&quot;).addEventListener(&quot;click&quot;, function() {
        //todo
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//svg_hexagon为path的id</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"svg_polygon"</span>).addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//todo</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader15">四、好用的svg库</h2>
<h3 id="articleHeader16">1、<a href="http://svgjs.com/" rel="nofollow noreferrer" target="_blank">svg.js</a>
</h3>
<p>svg.js更加接近原生svg语法，可以直观的操作svg。svg.js更快，兼容性好，上手更方便。</p>
<h3 id="articleHeader17">2、<a href="http://snapsvg.io/" rel="nofollow noreferrer" target="_blank">Snap.svg</a>
</h3>
<p>Snap.svg更接近jquery的语法，来操作svg。Snap.svg更全，功能丰富。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SVG基础教程(超级详细)

## 原文链接
[https://segmentfault.com/a/1190000012071386](https://segmentfault.com/a/1190000012071386)

