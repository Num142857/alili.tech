---
title: 'SVG 动画精髓' 
date: 2019-01-14 2:30:07
hidden: true
slug: mxax4qbcjii
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">TL;DR</h2>
<p>本文主要是讲解关于 SVG 的一些高级动画特效，比如 SVG 动画标签，图形渐变，路径动画，线条动画，SVG 裁剪等。</p>
<p>例如：路径动画</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378884?w=600&amp;h=377" src="https://static.alili.tech/img/remote/1460000009378884?w=600&amp;h=377" alt="gif" title="gif" style="cursor: pointer; display: inline;"></span></p>
<p>图形渐变：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378885?w=112&amp;h=108" src="https://static.alili.tech/img/remote/1460000009378885?w=112&amp;h=108" alt="fig" title="fig" style="cursor: pointer; display: inline;"></span></p>
<p>线条动画：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378886?w=583&amp;h=187" src="https://static.alili.tech/img/remote/1460000009378886?w=583&amp;h=187" alt="test.gif-388.2kB" title="test.gif-388.2kB" style="cursor: pointer; display: inline;"></span></p>
<p>以及，相关的动画的矩阵知识，这个也是现在 CSS 动画里面最重要，同时也是最为欠缺的知识点：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378887?w=454&amp;h=105" src="https://static.alili.tech/img/remote/1460000009378887?w=454&amp;h=105" alt="image.png-7.1kB" title="image.png-7.1kB" style="cursor: pointer;"></span></p>
<p>文章会先从基本语法入手，然后，慢慢深入。介绍一些动画基本原理和对应的数学原理知识点。并且文章后面，还附有相关语法的介绍，当你在遇到不熟悉语法的时候可以参考参考。</p>
<p><a href="https://www.villainhr.com/page/2017/04/17/SVG%20%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8" rel="nofollow noreferrer" target="_blank">前面一篇文章</a>，主要介绍了一些 SVG 的基本概念和基本图形。接下来我们需要了解一下，SVG 处理矢量这个特性之外，还有啥内容吸引我们，能让 SVG 现在普及度这么高？</p>
<p>原文参考：<a href="https://www.villainhr.com/page/2017/05/01/SVG%20%E5%8A%A8%E7%94%BB%E7%B2%BE%E9%AB%93" rel="nofollow noreferrer" target="_blank">前端小吉米</a></p>
<h2 id="articleHeader1">SVG Animation</h2>
<p>在 SVG 中，如果我们想实现一个动画效果，可以使用 CSS，JS，或者直接使用 SVG 中自带的 <code>animate</code> 元素添加动画。</p>
<p>使用 CSS 的话，有两种选择一种是通过 <code>style</code> 直接内联在里面，另外是直接使用相关的动画属性-- <code>transform</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <use id=&quot;star&quot; class=&quot;starStyle&quot; xlink:href=&quot;#starDef&quot;
       transform=&quot;translate(100, 100)&quot;
       style=&quot;fill: #008000; stroke: #008000&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> &lt;use <span class="hljs-built_in">id</span>=<span class="hljs-string">"star"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"starStyle"</span> xlink:href=<span class="hljs-string">"#starDef"</span>
       transform=<span class="hljs-string">"translate(100, 100)"</span>
       style=<span class="hljs-string">"fill: #008000; stroke: #008000"</span>/&gt;</code></pre>
<p>而使用 SVG 中自定的 <code>animate</code> 主要还是 SVG 自己的东西，比较好用。如果想用 CSS 的动画，这都无所谓。</p>
<p>先看一个 SVG animate DEMO:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<rect x=&quot;10&quot; y=&quot;10&quot; width=&quot;200&quot; height=&quot;20&quot; stroke=&quot;black&quot; fill=&quot;none&quot;>
  <animate
    attributeName=&quot;width&quot;
    attributeType=&quot;XML&quot;
    from=&quot;200&quot; to=&quot;20&quot;
    begin=&quot;0s&quot; dur=&quot;5s&quot;
    fill=&quot;freeze&quot; />
</rect>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"10"</span> y=<span class="hljs-string">"10"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"20"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"black"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"none"</span>&gt;
  &lt;animate
    attributeName=<span class="hljs-string">"width"</span>
    attributeType=<span class="hljs-string">"XML"</span>
    from=<span class="hljs-string">"200"</span> to=<span class="hljs-string">"20"</span>
    <span class="hljs-built_in">begin</span>=<span class="hljs-string">"0s"</span> dur=<span class="hljs-string">"5s"</span>
    <span class="hljs-built_in">fill</span>=<span class="hljs-string">"freeze"</span> /&gt;
&lt;/<span class="hljs-built_in">rect</span>&gt;</code></pre>
<p>通过将 animate 标签嵌套在指定的图形里面，即可实现变换的效果。另外，还有 animateTransform，它主要是用来做变形动画的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<rect x=&quot;-10&quot; y=&quot;-10&quot; width=&quot;20&quot; height=&quot;20&quot;
    style=&quot;fill: #ff9; stroke: black;&quot;>
    <animateTransform attributeType=&quot;XML&quot;
      attributeName=&quot;transform&quot; type=&quot;scale&quot;
      from=&quot;1&quot; to=&quot;4 2&quot;
      begin=&quot;0s&quot; dur=&quot;4s&quot; fill=&quot;freeze&quot;/>
</rect>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"-10"</span> y=<span class="hljs-string">"-10"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"20"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"20"</span>
    style=<span class="hljs-string">"fill: #ff9; stroke: black;"</span>&gt;
    &lt;animateTransform attributeType=<span class="hljs-string">"XML"</span>
      attributeName=<span class="hljs-string">"transform"</span> type=<span class="hljs-string">"scale"</span>
      from=<span class="hljs-string">"1"</span> to=<span class="hljs-string">"4 2"</span>
      <span class="hljs-built_in">begin</span>=<span class="hljs-string">"0s"</span> dur=<span class="hljs-string">"4s"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"freeze"</span>/&gt;
&lt;/<span class="hljs-built_in">rect</span>&gt;</code></pre>
<p>简单来说：</p>
<ul>
<li><p>animate: 相当于 CSS 中的 transition</p></li>
<li><p>animateTransform: 相当于 CSS 中的 transform</p></li>
</ul>
<p>里面一些技术细节我们这里就不过多讲解了。这里，主要想介绍一下 animate 中的 morph 的效果。</p>
<h3 id="articleHeader2">animate morph</h3>
<p>该效果主要做的就是图形内部的渐变。如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378885?w=112&amp;h=108" src="https://static.alili.tech/img/remote/1460000009378885?w=112&amp;h=108" alt="fig" title="fig" style="cursor: pointer;"></span></p>
<p>这种动画是怎么实现呢？</p>
<p>直接看代码吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path fill=&quot;#1EB287&quot;>
    <animate 
             attributeName=&quot;d&quot; 
             dur=&quot;1440ms&quot; 
             repeatCount=&quot;indefinite&quot;
             keyTimes=&quot;0;
                       .0625;
                       .208333333;
                       .3125;
                       .395833333;
                       .645833333;
                       .833333333;
                       1&quot;
             calcMode=&quot;spline&quot; 
             keySplines=&quot;0,0,1,1;
                         .42,0,.58,1;
                         .42,0,1,1;
                         0,0,.58,1;
                         .42,0,.58,1;
                         .42,0,.58,1;
                         .42,0,.58,1&quot;
             values=&quot;M 0,0 
                     C 50,0 50,0 100,0
                     100,50 100,50 100,100
                     50,100 50,100 0,100
                     0,50 0,50 0,0
                     Z;

                     M 0,0 
                     C 50,0 50,0 100,0
                     100,50 100,50 100,100
                     50,100 50,100 0,100
                     0,50 0,50 0,0
                     Z;

                     M 50,0 
                     C 75,25 75,25 100,50 
                     75,75 75,75 50,100
                     25,75 25,75 0,50
                     25,25 25,25 50,0
                     Z;

                     M 25,50 
                     C 37.5,25 37.5,25 50,0 
                     75,50 75,50 100,100
                     50,100 50,100 0,100
                     12.5,75 12.5,75 25,50
                     Z;

                     M 25,50 
                     C 37.5,25 37.5,25 50,0 
                     75,50 75,50 100,100
                     50,100 50,100 0,100
                     12.5,75 12.5,75 25,50
                     Z;

                     M 50,0
                     C 77.6,0 100,22.4 100,50 
                     100,77.6 77.6,100 50,100
                     22.4,100, 0,77.6, 0,50
                     0,22.4, 22.4,0, 50,0
                     Z;
                     
                     M 50,0
                     C 77.6,0 100,22.4 100,50 
                     100,77.6 77.6,100 50,100
                     22.4,100, 0,77.6, 0,50
                     0,22.4, 22.4,0, 50,0
                     Z;
                     
                     M 100,0 
                     C 100,50 100,50 100,100
                     50,100 50,100 0,100
                     0,50 0,50 0,0
                     50,0 50,0 100,0
                     Z;&quot;/>
  </path>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dns"><code>&lt;path fill="#<span class="hljs-number">1</span>EB287"&gt;
    &lt;animate 
             attributeName="d" 
             dur="<span class="hljs-number">1440m</span>s" 
             repeatCount="indefinite"
             keyTimes="<span class="hljs-number">0</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">0625</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">208333333</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">3125</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">395833333</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">645833333</span><span class="hljs-comment">;</span>
                       .<span class="hljs-number">833333333</span><span class="hljs-comment">;</span>
                       <span class="hljs-number">1</span>"
             calcMode="spline" 
             keySplines="<span class="hljs-number">0,0,1,1</span><span class="hljs-comment">;</span>
                         .<span class="hljs-number">42</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">58</span>,<span class="hljs-number">1</span><span class="hljs-comment">;</span>
                         .<span class="hljs-number">42,0,1,1</span><span class="hljs-comment">;</span>
                         <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">58</span>,<span class="hljs-number">1</span><span class="hljs-comment">;</span>
                         .<span class="hljs-number">42</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">58</span>,<span class="hljs-number">1</span><span class="hljs-comment">;</span>
                         .<span class="hljs-number">42</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">58</span>,<span class="hljs-number">1</span><span class="hljs-comment">;</span>
                         .<span class="hljs-number">42</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">58</span>,<span class="hljs-number">1</span>"
             values="M <span class="hljs-number">0</span>,<span class="hljs-number">0</span> 
                     C <span class="hljs-number">50,0 50,0</span> <span class="hljs-number">100</span>,<span class="hljs-number">0</span>
                     <span class="hljs-number">100,50 100,50</span> <span class="hljs-number">100,100</span>
                     <span class="hljs-number">50,100 50,100</span> <span class="hljs-number">0</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">0,50 0,50</span> <span class="hljs-number">0</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;</span>

                     M <span class="hljs-number">0</span>,<span class="hljs-number">0</span> 
                     C <span class="hljs-number">50,0 50,0</span> <span class="hljs-number">100</span>,<span class="hljs-number">0</span>
                     <span class="hljs-number">100,50 100,50</span> <span class="hljs-number">100,100</span>
                     <span class="hljs-number">50,100 50,100</span> <span class="hljs-number">0</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">0,50 0,50</span> <span class="hljs-number">0</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;</span>

                     M <span class="hljs-number">50</span>,<span class="hljs-number">0</span> 
                     C <span class="hljs-number">75,25 75,25</span> <span class="hljs-number">100</span>,<span class="hljs-number">50</span> 
                     <span class="hljs-number">75,75 75,75</span> <span class="hljs-number">50</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">25,75 25,75</span> <span class="hljs-number">0</span>,<span class="hljs-number">50</span>
                     <span class="hljs-number">25,25 25,25</span> <span class="hljs-number">50</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;</span>

                     M <span class="hljs-number">25</span>,<span class="hljs-number">50</span> 
                     C <span class="hljs-number">37.5,25 37</span>.<span class="hljs-number">5,25 50,0</span> 
                     <span class="hljs-number">75,50 75,50</span> <span class="hljs-number">100,100</span>
                     <span class="hljs-number">50,100 50,100</span> <span class="hljs-number">0</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">12.5,75 12</span>.<span class="hljs-number">5,75 25,50</span>
                     Z<span class="hljs-comment">;</span>

                     M <span class="hljs-number">25</span>,<span class="hljs-number">50</span> 
                     C <span class="hljs-number">37.5,25 37</span>.<span class="hljs-number">5,25 50,0</span> 
                     <span class="hljs-number">75,50 75,50</span> <span class="hljs-number">100,100</span>
                     <span class="hljs-number">50,100 50,100</span> <span class="hljs-number">0</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">12.5,75 12</span>.<span class="hljs-number">5,75 25,50</span>
                     Z<span class="hljs-comment">;</span>

                     M <span class="hljs-number">50</span>,<span class="hljs-number">0</span>
                     C <span class="hljs-number">77.6,0 100</span>,<span class="hljs-number">22.4 100,50</span> 
                     <span class="hljs-number">100,77.6 77</span>.<span class="hljs-number">6,100 50,100</span>
                     <span class="hljs-number">22.4,100</span>, <span class="hljs-number">0</span>,<span class="hljs-number">77</span>.<span class="hljs-number">6</span>, <span class="hljs-number">0</span>,<span class="hljs-number">50</span>
                     <span class="hljs-number">0</span>,<span class="hljs-number">22</span>.<span class="hljs-number">4</span>, <span class="hljs-number">22</span>.<span class="hljs-number">4</span>,<span class="hljs-number">0</span>, <span class="hljs-number">50</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;</span>
                     
                     M <span class="hljs-number">50</span>,<span class="hljs-number">0</span>
                     C <span class="hljs-number">77.6,0 100</span>,<span class="hljs-number">22.4 100,50</span> 
                     <span class="hljs-number">100,77.6 77</span>.<span class="hljs-number">6,100 50,100</span>
                     <span class="hljs-number">22.4,100</span>, <span class="hljs-number">0</span>,<span class="hljs-number">77</span>.<span class="hljs-number">6</span>, <span class="hljs-number">0</span>,<span class="hljs-number">50</span>
                     <span class="hljs-number">0</span>,<span class="hljs-number">22</span>.<span class="hljs-number">4</span>, <span class="hljs-number">22</span>.<span class="hljs-number">4</span>,<span class="hljs-number">0</span>, <span class="hljs-number">50</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;</span>
                     
                     M <span class="hljs-number">100</span>,<span class="hljs-number">0</span> 
                     C <span class="hljs-number">100,50 100,50</span> <span class="hljs-number">100,100</span>
                     <span class="hljs-number">50,100 50,100</span> <span class="hljs-number">0</span>,<span class="hljs-number">100</span>
                     <span class="hljs-number">0,50 0,50</span> <span class="hljs-number">0</span>,<span class="hljs-number">0</span>
                     <span class="hljs-number">50,0 50,0</span> <span class="hljs-number">100</span>,<span class="hljs-number">0</span>
                     Z<span class="hljs-comment">;"/&gt;</span>
  &lt;/path&gt;</code></pre>
<p>这么多，是不是感觉有点懵逼。不过，我们细分来看一下其实很简单。里面主要是利用 <code>animate</code> 中的 <code>keyTimes</code>，<code>calcMode</code>，<code>keySplines</code>，以及 <code>values</code> 这几个属性。不急，我们一个一个来解释一下。</p>
<ul>
<li><p>keyTimes: 这其实和 CSS 中定义的 <code>@keyframes</code> 一样。通过 0-1 之间的值，定义每段动画完成的时间。格式为：<code>value;value...</code>。例如 <code>0;.0625;.208333333;.3125;.395833333;.645833333;.833333333;1</code>。从第一个动画，到第二个动画经历的时间比例为 6.25%。并且，keyTimes 需要和 values 里面定义的帧数一致。</p></li>
<li><p>calcMode: 用来定义动画具体的插值模型。取值有: <code>discrete | linear[default] | paced | spline</code>。具体可以参考 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/calcMode" rel="nofollow noreferrer" target="_blank">MDN</a>。这里我们主要介绍一下 spline。该值表示每个动画间使用自定的贝塞尔变换曲线。如果没有特殊要求，使用 linear 其实已经足够了，这样就不用麻烦去定义下面的 <code>keySplines</code> 属性。</p></li>
<li><p>keySplines：该值用来具体定义动画执行时的 <a href="http://cubic-bezier.com/#.17,.67,.83,.67" rel="nofollow noreferrer" target="_blank">贝塞尔曲线</a>。使用格式是通过 <code>;</code> 来分隔每一个值。即，<code>cubic-bezier(.31,.57,.93,.46)</code> 为一组。使用 keySplines 表达，则为：<code>keySplines = ".31,.57,.93,.46;"</code>。当然，里面的贝塞尔曲线组数为 <code>整个动画帧数 - 1</code>。</p></li>
</ul>
<p>而 values 就很简单了。它是直接结合 <code>attributeName</code> 属性，来设置具体的值，每个值之间使用 <code>;</code> 进行分隔。</p>
<p>像上面那样，可以在指定元素里面嵌套多个 animate，既实现了形状的改变，又实现了颜色的改变。Morph 比较常用于数字的更迭，比如，<a href="http://codepen.io/felixhornoiu/pen/dovub" rel="nofollow noreferrer" target="_blank">倒数 10s 的相关动画</a><button class="btn btn-xs btn-default ml10 preview" data-url="felixhornoiu/pen/dovub" data-typeid="3">点击预览</button>。到这里，Morpah 相关的知识点就结束了。</p>
<p>接着，让我们来看一下 SVG 中，另外一非常重要的标签 -- <code>animateMotion</code>。</p>
<p>该标签可以让指定的元素，绕着指定的路径进行运动。所以这对于复杂的路径来说非常有用，因为我们很难使用 transform 去模拟复杂的变换路径。看一个 DEMO</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378884?w=600&amp;h=377" src="https://static.alili.tech/img/remote/1460000009378884?w=600&amp;h=377" alt="gif" title="gif" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">animateMotion</h3>
<p>animateMotion 大致的属性和 <code>animate</code> 差不多，不过，它还拥有自己特有的属性，比如 <code>keyPoints</code>、<code>rotate</code>、<code>path</code> 等。不过，calcMode 在 AM(animateMotion) 中的默认属性由，<code>linear</code> 变为 <code>paced</code>。</p>
<p>这些属性，我们慢慢介绍，先从最简单的开始吧。首先，我们来看一个  DEMO：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g>
  <rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;fill: #ccc;&quot;/>
  <circle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;15&quot; style=&quot;fill: #cfc; stroke: green;&quot;/>
  <animateMotion from=&quot;0,0&quot; to=&quot;60,30&quot; dur=&quot;4s&quot; fill=&quot;freeze&quot;/>
</g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;g&gt;
  &lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"0"</span> y=<span class="hljs-string">"0"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"30"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"30"</span> style=<span class="hljs-string">"fill: #ccc;"</span>/&gt;
  &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"30"</span> cy=<span class="hljs-string">"30"</span> r=<span class="hljs-string">"15"</span> style=<span class="hljs-string">"fill: #cfc; stroke: green;"</span>/&gt;
  &lt;animateMotion from=<span class="hljs-string">"0,0"</span> to=<span class="hljs-string">"60,30"</span> dur=<span class="hljs-string">"4s"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"freeze"</span>/&gt;
&lt;/g&gt;</code></pre>
<ul>
<li><p>from，to：指定两点的位置，位置参数是以元素的坐标为原点的。</p></li>
<li><p>dur：执行渲染时间</p></li>
<li><p>fill：指定动画结束后停留的装填。有 <code>freeze</code> 和 <code>remove</code> 效果。remove 表示回到动画开始的位置，freeze 表示停留在动画结束的位置。</p></li>
</ul>
<p>如果，你想要更复杂的路径，可以直接使用 <code>path</code> 属性来指定路径。用法和 <code>path</code> 标签中 <code>d</code> 属性是一样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;fill: #ccc;&quot;>
    <animateMotion
    path=&quot;M50,125 C 100,25 150,225, 200, 125&quot;
    dur=&quot;6s&quot; fill=&quot;freeze&quot;/>
</rect>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"0"</span> y=<span class="hljs-string">"0"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"30"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"30"</span> style=<span class="hljs-string">"fill: #ccc;"</span>&gt;
    &lt;animateMotion
    path=<span class="hljs-string">"M50,125 C 100,25 150,225, 200, 125"</span>
    dur=<span class="hljs-string">"6s"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"freeze"</span>/&gt;
&lt;/<span class="hljs-built_in">rect</span>&gt;</code></pre>
<p>或者使用 <code>mpath</code> 标签，引用外部的 <code>path</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <path d=&quot;M10,110 A120,120 -45 0,1 110 10 A120,120 -45 0,1 10,110&quot;
      stroke=&quot;lightgrey&quot; stroke-width=&quot;2&quot; 
      fill=&quot;none&quot; id=&quot;theMotionPath&quot;/>
  <circle cx=&quot;10&quot; cy=&quot;110&quot; r=&quot;3&quot; fill=&quot;lightgrey&quot;  />
  <circle cx=&quot;110&quot; cy=&quot;10&quot; r=&quot;3&quot; fill=&quot;lightgrey&quot;  />

  <!-- Red circle which will be moved along the motion path. -->
  <circle cx=&quot;&quot; cy=&quot;&quot; r=&quot;5&quot; fill=&quot;red&quot;>

    <!-- Define the motion path animation -->
    <animateMotion dur=&quot;6s&quot; repeatCount=&quot;indefinite&quot;>
      <mpath xlink:href=&quot;#theMotionPath&quot;/>
    </animateMotion>
  </circle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M10,110 A120,120 -45 0,1 110 10 A120,120 -45 0,1 10,110"</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">"lightgrey"</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"2"</span> 
      <span class="hljs-attr">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"theMotionPath"</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"110"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"lightgrey"</span>  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"110"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"lightgrey"</span>  /&gt;</span>

  <span class="hljs-comment">&lt;!-- Red circle which will be moved along the motion path. --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">""</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">""</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"red"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Define the motion path animation --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">animateMotion</span> <span class="hljs-attr">dur</span>=<span class="hljs-string">"6s"</span> <span class="hljs-attr">repeatCount</span>=<span class="hljs-string">"indefinite"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mpath</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#theMotionPath"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">animateMotion</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">circle</span>&gt;</span></code></pre>
<p>动画效果为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378888?w=362&amp;h=276" src="https://static.alili.tech/img/remote/1460000009378888?w=362&amp;h=276" alt="tuiche.gif-17.8kB" title="tuiche.gif-17.8kB" style="cursor: pointer;"></span></p>
<p>所以，一般而言我们在定义 AM 的路径的时候，只用一种方式定义即可，否则会发生相应的覆盖：<code>mpath</code>&gt;<code>path</code>&gt;<code>values</code>&gt;<code>from/to</code>。</p>
<p>在 AM 运动中，还有一个很重要的概念就是旋转角。默认情况下，运动物体的角度是按照它和坐标轴的初始角度确定的。例如：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378889?w=194&amp;h=80" src="https://static.alili.tech/img/remote/1460000009378889?w=194&amp;h=80" alt="test.gif-23.7kB" title="test.gif-23.7kB" style="cursor: pointer;"></span></p>
<p>这样看起来确实有些别扭，那能不能让物体垂直于路径进行运动呢？</p>
<p>有的，根据 <code>rotate</code> 属性值，一共有 3 个值可供选择。</p>
<ul><li><p>auto：让物体垂直于路径的切线方向运动。不过，如果你的路径是闭合曲线的话，需要注意起始点的位置。</p></li></ul>
<p>例如：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378890?w=194&amp;h=91" src="https://static.alili.tech/img/remote/1460000009378890?w=194&amp;h=91" alt="test.gif-22.4kB" title="test.gif-22.4kB" style="cursor: pointer;"></span></p>
<ul><li><p>auto-reverse：让物体垂直于路径的切线方向并 + 180°。也就是和 auto 运动关于切线对称。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378891?w=194&amp;h=116" src="https://static.alili.tech/img/remote/1460000009378891?w=194&amp;h=116" alt="test.gif-27.8kB" title="test.gif-27.8kB" style="cursor: pointer;"></span></p>
<ul><li><p>Number：让物体以固定的旋转角度运动。这个就相当于使用 transform:rotate(deg) 进行控制。</p></li></ul>
<p>在动画设置标签中，还有一个更简单的--<code>set</code>。</p>
<h3 id="articleHeader4">set</h3>
<p>该标签也是用来模拟 <code>transition</code> 效果的。它和 <code>animate</code> 的主要区别是，它仅仅需要 <code>to</code> 的指定属性，而不需要其他的参考属性，比如 <code>from</code>，<code>by</code> 等。那它有啥特别的存在意义吗？</p>
<p>有的，因为 set 针对于所有属性，甚至包括 style 里面的相关 CSS 属性。所以，可以靠它来很好描述一些非 <code>number</code> 的属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<text text-anchor=&quot;middle&quot; x=&quot;60&quot; y=&quot;60&quot; style=&quot;visibility: hidden;&quot;>
  <set attributeName=&quot;visibility&quot; attributeType=&quot;CSS&quot;
    to=&quot;visible&quot; begin=&quot;4.5s&quot; dur=&quot;1s&quot; fill=&quot;freeze&quot;/>
  All gone!
</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>&lt;<span class="hljs-literal">text</span> <span class="hljs-literal">text</span>-anchor=<span class="hljs-string">"middle"</span> x=<span class="hljs-string">"60"</span> y=<span class="hljs-string">"60"</span> style=<span class="hljs-string">"visibility: hidden;"</span>&gt;
  &lt;set attributeName=<span class="hljs-string">"visibility"</span> attributeType=<span class="hljs-string">"CSS"</span>
    <span class="hljs-keyword">to</span>=<span class="hljs-string">"visible"</span> <span class="hljs-keyword">begin</span>=<span class="hljs-string">"4.5s"</span> dur=<span class="hljs-string">"1s"</span> fill=<span class="hljs-string">"freeze"</span>/&gt;
  <span class="hljs-keyword">All</span> gone!
&lt;/<span class="hljs-literal">text</span>&gt;</code></pre>
<h2 id="articleHeader5">矩阵动画</h2>
<p>上面差不多简单阐述了关于 SVG 一些比较有特点的动画。当然，还有比较重要的线条动画，这个我们放到后面进行讲解。这里先来看一下所有动画中，非常重要的矩阵原理。线性代数应该是大学里面来说，最容易学的一门科目，MD。。。还记得，大学线代期末考试的时候，100 分的同学应该说是如韭菜地般，一抓一大片（对不起，我没能和他们同流合污。）</p>
<p>那矩阵是如何在动画中使用的呢？</p>
<p>简单的说，矩阵中的每个元素其实可以等价代换为每个因式里面的系数：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378892?w=173&amp;h=76" src="https://static.alili.tech/img/remote/1460000009378892?w=173&amp;h=76" alt="image.png-6kB" title="image.png-6kB" style="cursor: pointer;"></span></p>
<p>上面也叫作 三维矩阵。即，它涉及到 x,y,z 轴的计算。那对于我们平面 2D 变换来说，那么此时矩阵又是哪种形式呢？</p>
<p>很简单，只要将 z 轴永远置为一个常数就 OK。这里，惯例上是直接取 0 0 1 来设置。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378893?w=51&amp;h=60" src="https://static.alili.tech/img/remote/1460000009378893?w=51&amp;h=60" alt="image.png-1.7kB" title="image.png-1.7kB" style="cursor: pointer;"></span></p>
<p>不信的话，大家只要代进去乘以乘，应该就可以得到结果了。所以，在二维中，具体变换方式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378887?w=454&amp;h=105" src="https://static.alili.tech/img/remote/1460000009378887?w=454&amp;h=105" alt="image.png-7.1kB" title="image.png-7.1kB" style="cursor: pointer;"></span></p>
<p>后面，我们也会依据这个公式进行相关的变形操作。那矩阵变换是怎么运用到 CSS/SVG 当中呢？</p>
<p>在 CSS 中，是直接使用 <code>transform</code> 中的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform: matrix(a,b,c,d,e,f);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">transform</span>: <span class="hljs-built_in">matrix</span>(a,b,c,d,e,f);</code></pre>
<p>当然，在 SVG 中也是一样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g transform=&quot;matrix(1,2,3,4,5,6)&quot;>
    <line x1=&quot;10&quot; y1=&quot;20&quot; x2=&quot;30&quot; y2=&quot;40&quot; style=&quot;stroke-width: 10px; stroke: blue;&quot;/>
  </g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"matrix(1,2,3,4,5,6)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">line</span> <span class="hljs-attr">x1</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">y1</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">x2</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">y2</span>=<span class="hljs-string">"40"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"stroke-width: 10px; stroke: blue;"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span></code></pre>
<p>所以，我们主要的重点就是讲解一下 <code>matrix</code> 这个属性。它的格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="matrix(a,b,c,d,e,f);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">matrix<span class="hljs-comment">(a,b,c,d,e,f)</span>;</code></pre>
<p>对应于我们上面的公式有：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378894?w=145&amp;h=96" src="https://static.alili.tech/img/remote/1460000009378894?w=145&amp;h=96" alt="image.png-2.5kB" title="image.png-2.5kB" style="cursor: pointer;"></span></p>
<p>在接触 <code>transform</code> 的时候，大家应该了解到 <code>transform</code> 里面有很多固定的动画属性：</p>
<ul>
<li><p>translate()</p></li>
<li><p>rotate()</p></li>
<li><p>scale()</p></li>
<li><p>skew()</p></li>
</ul>
<p>实际上，在底层还是使用 matrix 实现的变换。就拿 translate 举个例子吧。</p>
<p>translate 的格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="translate(dx,dy)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">translate</span><span class="hljs-params">(dx,dy)</span></span></code></pre>
<p>相当于参考当前原点，在 x/y 轴上移动 dx/dy 的距离。那么映射到矩阵，应该如何表示呢？</p>
<p>很简单，它等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="matrix(1 0 0 1 dx dy);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">matrix(<span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span> dx dy);</code></pre>
<p>使用代数证明一下：</p>
<p>假设有 <code>matrix(1 0 0 1 20 30)</code></p>
<p>变为矩阵为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378895?w=99&amp;h=65" src="https://static.alili.tech/img/remote/1460000009378895?w=99&amp;h=65" alt="image.png-3.2kB" title="image.png-3.2kB" style="cursor: pointer;"></span></p>
<p>根据，上面的表达式有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="X = x'*1 + y'*0 + 20 = x' + 20
Y = x'*0 + y'*0 + 30 = y' + 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>X = x'*<span class="hljs-number">1</span> + y'*<span class="hljs-number">0</span> + <span class="hljs-number">20</span> = x' + <span class="hljs-number">20</span>
Y = x'*<span class="hljs-number">0</span> + y'*<span class="hljs-number">0</span> + <span class="hljs-number">30</span> = y' + <span class="hljs-number">30</span></code></pre>
<p>所以，就是 X 在原有 X 轴坐标上向右移动 20 的距离，Y 相对于原有移动 30 的距离。</p>
<p>那么其他几个属性呢？也是怎么变化的吗？</p>
<p>恩，类似。只是里面取值不一样：</p>
<ul>
<li><p>scale(x,y): 放大 X/Y 轴，矩阵的表达为 matrix(x 0 0 y 0 0)。</p></li>
<li><p>rotate(θ): 坐标旋转，矩阵的表达为 matrix(cosθ sinθ -sinθ cosθ 0 0)。</p></li>
<li><p>skew(θx,θy): X/Y 轴拉伸，矩阵的表达为 matrix(1 tanθx tanθy 1 0 0)。</p></li>
</ul>
<p>注意，上面三个都会改变原有物体的坐标系！！！ 这点很重要，换句话说，后面每次变换都是基于前面一个的变换结果的。</p>
<p>详情看图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378896?w=771&amp;h=275" src="https://static.alili.tech/img/remote/1460000009378896?w=771&amp;h=275" alt="image.png-49.6kB" title="image.png-49.6kB" style="cursor: pointer;"></span></p>
<p>详情可以参考：<a href="https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform" rel="nofollow noreferrer" target="_blank">MDN matrix</a></p>
<p>不过，这并不是我们使用 matrix 的重点，也不是它的优势。它的优势在于可计算，即，能够将复杂的动画集合到一个表达式中，并且，后续的变换可以直接基于当前的 matrix。</p>
<p>我们先来了解一下，如果多个变换动画一起使用，matrix 应该如何表达呢？</p>
<p><strong>只需要找到我们变换动画对应的矩阵，然后相乘即可。</strong>例如，先旋转 45°，然后放大 1.5 倍，则有变换动画为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform: rotate(45deg) scale(1.5,1.5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">transform: rotate(45deg) scale(1.5,1.5);</code></pre>
<p>注意，虽然，你定义动画是分开的，但此时的动画是同时进行的。为啥？因为，这两个动画实际上可以整合成为一个变换矩阵：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378897?w=626&amp;h=116" src="https://static.alili.tech/img/remote/1460000009378897?w=626&amp;h=116" alt="image.png-7.4kB" title="image.png-7.4kB" style="cursor: pointer;"></span></p>
<p>并且，位置是不可以调换的。比如，<code>transform: scale(2,2) translate(20px,30px)</code>。即，你先放大两倍，然后移动 20,30 的距离。注意，这里移动的 20,30 相对的是已经放大过后的坐标，相对于原坐标而言就是 40,60 了。 如果，你调换位置，即 <code>transform: translate(20px,30px) scale(2,2)</code>。就变成现在原坐标移动 20,30，然后再放大两倍。</p>
<p>而上面强调的顺序关系，实际上就可以理解为<strong>矩阵不满足交换律的原则</strong>。因为一旦交换，结果很可能不一样。</p>
<h3 id="articleHeader6">矩阵高级用法</h3>
<p>上面的内容只是简单的描述了关于矩阵的概念。在实际中，矩阵可以说是真正利器。</p>
<p>假设现在有一个动画，要求你将一个物体从一个点通过抛物线的方式移动到另外一个点，那么此时要求 JS/CSS 随你挑。此时，你会不会感觉，呼吸急促，头脑发热呢？</p>
<p>恩，matrix 可以治，而且包治百病。不过，matrix 有一个限制点，它只能用于一次线性动画表达式。即，针对于抛物线，椭圆曲线这类复杂曲线来说，不太合适。那么有什么办法吗？</p>
<p>有的，微分思想。每一段动画其实都可以通过一定范围内的直线拼接而成，那么这样，我们就可以将一段抛物线拆分为由几段线段构成的曲线。当然，如果你分的越细，拟合度就越高。这里我们不打算过度你和，我们简单的将一段抛物线分为 5段。</p>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378898?w=340&amp;h=276" src="https://static.alili.tech/img/remote/1460000009378898?w=340&amp;h=276" alt="image.png-12.9kB" title="image.png-12.9kB" style="cursor: pointer;"></span></p>
<p>那么接下来就是抠细节。这里，依次取倾角为 45°，30°，0°，-45°，-30° 这 5 段直线。每段分配的时间比例为 20%、25%、10%、25%、20% 这主要是用于 keyframe 的设定。现在，用数学来分析一下，这个动画到底该怎么弄。</p>
<p>现在，已知两点之间的距离为 100px。那么我们同样根据上述比例分，则有 20px, 25px, 10px, 25px, 20px。</p>
<p>这里我们以 45° 倾角为参考点，则终点坐标为 (20,20); 。那么，该段的矩阵为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注意 Y 轴需要取负值！

 1 0 20
 0 1 -20
 0 0 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 注意 Y 轴需要取负值！</span>

 <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">20</span>
 <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">-20</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span></code></pre>
<p>CSS 中的变形动画为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform: matrix(1,0,0,1,20,-20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">transform</span>: <span class="hljs-built_in">matrix</span>(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">20</span>,-<span class="hljs-number">20</span>);</code></pre>
<p>然后，第二段就为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 0 25
0 1 -14.4
0 0 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span><span class="hljs-number">0</span> <span class="hljs-number">25</span>
<span class="hljs-symbol">0 </span><span class="hljs-number">1</span> -<span class="hljs-number">14.4</span>
<span class="hljs-symbol">0 </span><span class="hljs-number">0</span> <span class="hljs-number">1</span></code></pre>
<p>使用矩阵的乘法法，则有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1 0 45
 0 1 -34.4
 0 0 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">45</span>
 <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">-34.4</span>
 <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span></code></pre>
<p>变形动画为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform: matrix(1,0,0,1,45,-34.4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">transform</span>: <span class="hljs-built_in">matrix</span>(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">45</span>,-<span class="hljs-number">34.4</span>);</code></pre>
<p>剩余几段也是这样的做法。最终，整个 keyframe 就应该表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframe Parabola{
    20%{
        transform: matrix(1,0,0,1,20,-20);
    }
    45%{
        transform: matrix(1,0,0,1,45,-34.4);
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframe</span> Parabola{
    20%{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">matrix</span>(1,0,0,1,20,-20);
    }
    45%{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">matrix</span>(1,0,0,1,45,-34.4);
    }
    ...
}</code></pre>
<p>整个动画过程差不多都是这样。当然，矩阵也不仅仅局限于这几个动画，凭借着高度定制化和灵活性的特点，这它还常常用于进行回弹，弹跳等动画中。如果大家有兴趣，后期也可以对这类动画进行简单的讲解。</p>
<p>后面，我们最后来了解一下 SVG 中很重要的线条动画。</p>
<h2 id="articleHeader7">线条动画</h2>
<p>SVG 中的线条动画常常用作过渡屏（splash screen）中。例如：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378899?w=194&amp;h=116" src="https://static.alili.tech/img/remote/1460000009378899?w=194&amp;h=116" alt="test.gif-35.7kB" title="test.gif-35.7kB" style="cursor: pointer; display: inline;"></span></p>
<p>或者，一些比较炫酷的 LOGO 中，比如 AllowTeam 的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378900?w=785&amp;h=592" src="https://static.alili.tech/img/remote/1460000009378900?w=785&amp;h=592" alt="AT" title="AT" style="cursor: pointer; display: inline;"></span></p>
<p>看到这些炫酷的效果，大家有没有动心想学一学，看看自己到底能否做的这么好呢？</p>
<p>OK，我们现在来正式介绍一下线条动画。在 SVG 中，最长用到的线条标签就是 <code>Path</code>。这里我<a href="https://www.villainhr.com/page/2017/04/17/SVG%20%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8" rel="nofollow noreferrer" target="_blank">前面一篇文章</a>已经做了介绍，我这里就不赘述了。</p>
<p>而在具体变化当中用到的是关于 <code>stroke</code> 的相关属性：（下面的属性都可以直接用在 CSS 当中！）</p>
<ul>
<li><p>stroke*：定义笔触的颜色。例如：<code>stroke="green"</code></p></li>
<li><p>stroke-dasharray*：定义 dash 和 gap 的长度。它主要是通过使用 <code>,</code> 来分隔 <strong>实线</strong> 和 <strong>间隔</strong> 的值。例如：<code>stroke-dasharray="5, 5"</code> 表示，按照 实线为 5，间隔为 5 的排布重复下去。如下图：</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378901?w=188&amp;h=24" src="https://static.alili.tech/img/remote/1460000009378901?w=188&amp;h=24" alt="image.png-0.2kB" title="image.png-0.2kB" style="cursor: pointer;"></span></p>
<p>放大看有：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378902?w=622&amp;h=199" src="https://static.alili.tech/img/remote/1460000009378902?w=622&amp;h=199" alt="image.png-5.3kB" title="image.png-5.3kB" style="cursor: pointer;"></span></p>
<p>另外，stroke-dasharray 并不局限于只能设置两个值，要知道，它本身的含义是设置最小重复单元，即，<code>dash,gap,dash,gap...</code>。比如，我定义 <code>stroke-dasharray="15, 10, 5" </code> 则相当于，[15,10,5] 为一段。则有：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378903?w=181&amp;h=19" src="https://static.alili.tech/img/remote/1460000009378903?w=181&amp;h=19" alt="image.png-0.3kB" title="image.png-0.3kB" style="cursor: pointer;"></span></p>
<p>放大看则有：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378904?w=946&amp;h=262" src="https://static.alili.tech/img/remote/1460000009378904?w=946&amp;h=262" alt="image.png-7.7kB" title="image.png-7.7kB" style="cursor: pointer;"></span></p>
<ul>
<li><p>stroke-dashoffset*: 用来设置 dasharray 定义其实 dash 线条开始的位置。值可以为 <code>number || percentage</code>。百分数是相对于 SVG 的 viewport。通常结合 dasharray 可以实现线条的运动。</p></li>
<li><p>stroke-linecap: 线条的端点样式。</p></li>
<li><p>stroke-linejoin: 线条连接的样式</p></li>
<li><p>stroke-miterlimit: 一个比较复杂的概念，如果我们只是画一些一般的线段，使用上面 linejoin 即可。如果涉及对边角要求比较高的，则可以使用该属性进行定义。它的值，其实就是角长度比上线宽：</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378905?w=158&amp;h=159" src="https://static.alili.tech/img/remote/1460000009378905?w=158&amp;h=159" alt="image.png-5.4kB" title="image.png-5.4kB" style="cursor: pointer;"></span></p>
<p>而实际理解的话，就是假设当 width 为 1。此时比例为 2。那么 miter = 2。那么超过 2 的 miter 部分则会被 cut 掉。可以参照：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378906?w=287&amp;h=321" src="https://static.alili.tech/img/remote/1460000009378906?w=287&amp;h=321" alt="image.png-15.6kB" title="image.png-15.6kB" style="cursor: pointer;"></span></p>
<p>他主要是配合 <code>linejoin</code> 一起使用。因为 linejoin 默认取值就是 <code>miter</code>。所以，默认情况下就可以使用该标签属性。它默认值为 4。其余的大家下去实践一下即可。详细可以参考: <a href="http://www.oxxostudio.tw/articles/201409/svg-16-storke-miterlimit.html" rel="nofollow noreferrer" target="_blank">miter</a></p>
<ul>
<li><p>stroke-opacity：线段的透明度</p></li>
<li><p>stroke-width：线的粗细。</p></li>
</ul>
<p>OK，介绍完关于 path 的所有 stroke 属性之后，我们就要开始动手写一下让线条动起来的代码。简单来说，就是通过 <code>stroke-dashoffset</code> 和 <code>stroke-dasharray</code> 来做。整个动画可以分为两个过程：</p>
<ul>
<li><p>通过 dasharray 将实线部分隐藏，空余为全线段长。然后，将实线部分增加至全长。比如：<code>dasharray: 0,1000</code> 变为 <code>dasharray: 1000,1000</code>。</p></li>
<li><p>同时，通过 dashoffset 来移动新增的实线部分，造成线段移动的效果。有: <code>dashoffset:0</code>，变为 <code>dashoffset:1000</code>。</p></li>
</ul>
<p>不过，这里我们不打算使用 Path 来做啥复杂的动画，这主要考虑到手头没有一些 SVG 生成工具。所以，这里我们就以 Text 来做吧（因为做起来真的简单）。</p>
<p>这里，先以 IV-WEB 这段文字来做动画。</p>
<p>先给大家看一下最终结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378907?w=258&amp;h=116" src="https://static.alili.tech/img/remote/1460000009378907?w=258&amp;h=116" alt="test.gif-61.9kB" title="test.gif-61.9kB" style="cursor: pointer;"></span></p>
<p>那么这种动画是怎么做的呢？</p>
<p>这里，我主要介绍一下关于 CSS 相关，SVG 就一个 Text 我直接贴代码了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg viewBox=&quot;0 0 1320 300&quot;>

  <!-- Symbol -->
  <symbol id=&quot;s-text&quot;>
    <text text-anchor=&quot;middle&quot;
          x=&quot;50%&quot; y=&quot;50%&quot; dy=&quot;.35em&quot;>
      IV-WEB
    </text>
  </symbol>  

  <!-- Duplicate symbols -->
  <use xlink:href=&quot;#s-text&quot; class=&quot;text&quot;
       ></use>
  <use xlink:href=&quot;#s-text&quot; class=&quot;text&quot;
       ></use>
  <use xlink:href=&quot;#s-text&quot; class=&quot;text&quot;
       ></use>
 

</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 1320 300"</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Symbol --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s-text"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span>
          <span class="hljs-attr">x</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50%"</span> <span class="hljs-attr">dy</span>=<span class="hljs-string">".35em"</span>&gt;</span>
      IV-WEB
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>  

  <span class="hljs-comment">&lt;!-- Duplicate symbols --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#s-text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>
       &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#s-text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>
       &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#s-text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>
       &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
 

<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>上面是通过创建一个居中定位的字体，然后使用 3 个 text 重叠。具体 CSS 我们下面来说一下。首先，我们营造的效果是从无到有，就需要使用 <code>dasharray</code> 将 gap 设置的足够大。这里我取 300 即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stroke-dasharray: 0 300;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">stroke</span>-dasharray: <span class="hljs-number">0</span> <span class="hljs-number">300</span>;</code></pre>
<p>然后，通过 <code>nth-child</code> 选择器，给每一个文字使用不同的颜色值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text:nth-child(3n + 1) {
  stroke: #F60A0A;
}
.text:nth-child(3n + 2) {
  stroke: #F2FF14;
}

.text:nth-child(3n + 3) {
  stroke: #FB9505;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:nth-child(3n</span> + 1) {
  <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#F60A0A</span>;
}
<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:nth-child(3n</span> + 2) {
  <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#F2FF14</span>;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:nth-child(3n</span> + 3) {
  <span class="hljs-attribute">stroke</span>: <span class="hljs-number">#FB9505</span>;
}</code></pre>
<p>下面才是重点内容。此时，这 3 个 text 的起始点重合。我现在既要他们在运行时不完全重合，又要他们的线条能进行滚动。不啰嗦了，直接看代码吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes stroke {
  100% {
    stroke-dashoffset: 1000;
    stroke-dasharray: 80 160;
  }
}

@keyframes stroke1 {
  100% {
    stroke-dashoffset: 1080;
    stroke-dasharray: 80 160;
  }
}


@keyframes stroke2 {
  100% {
    stroke-dashoffset: 1160;
    stroke-dasharray: 80 160;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> stroke {
  100% {
    <span class="hljs-attribute">stroke-dashoffset</span>: <span class="hljs-number">1000</span>;
    <span class="hljs-attribute">stroke-dasharray</span>: <span class="hljs-number">80</span> <span class="hljs-number">160</span>;
  }
}

@<span class="hljs-keyword">keyframes</span> stroke1 {
  100% {
    <span class="hljs-attribute">stroke-dashoffset</span>: <span class="hljs-number">1080</span>;
    <span class="hljs-attribute">stroke-dasharray</span>: <span class="hljs-number">80</span> <span class="hljs-number">160</span>;
  }
}


@<span class="hljs-keyword">keyframes</span> stroke2 {
  100% {
    <span class="hljs-attribute">stroke-dashoffset</span>: <span class="hljs-number">1160</span>;
    <span class="hljs-attribute">stroke-dasharray</span>: <span class="hljs-number">80</span> <span class="hljs-number">160</span>;
  }
}</code></pre>
<p>这就是上面 3 个不同的 text 运用的动画。<code>dashoffet</code> 由 0 到 1000。这完成了滚动的目的。同时，为了让字体不重合，我还需要在对应字体的 <code>dashoffset</code> 上，加上不同的间隔距离。比如，第一个字体 offset 为 1000。那么第二个字体，我需要加上前一个字体 dash 的长度，即，80。所以，第二个字体就变为 <code>1080</code>。那么第三个就是加上前两个的 dash 长度，即 <code>1160</code>。</p>
<p>大致过程就是这样，详情可以查看： <a href="https://codepen.io/JimmyVV/pen/oWWzdB" rel="nofollow noreferrer" target="_blank">IVWEB 线条动画</a><button class="btn btn-xs btn-default ml10 preview" data-url="JimmyVV/pen/oWWzdB" data-typeid="3">点击预览</button>。</p>
<blockquote><p>这里再给大家布置一个练习作业，如何实现无线连续的分段动画呢？</p></blockquote>
<p>具体效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378886?w=583&amp;h=187" src="https://static.alili.tech/img/remote/1460000009378886?w=583&amp;h=187" alt="test.gif-388.2kB" title="test.gif-388.2kB" style="cursor: pointer;"></span></p>
<p>给点提示：</p>
<blockquote><p>将多个文字重叠，取不同的 offset 和 array 即可。动画的终止位置一般取一个 gap + dash 的周期长即可。</p></blockquote>
<p>后面看看这篇文章反响如何，到时候再决定是否再写一篇续集，介绍该作业的原理。</p>
<h2 id="articleHeader8">SVG 文字</h2>
<p>在 SVG 中定义文字直接使用 <code>text</code> 标签即可。关于文字来说，一般而言需要注意的点就那么即可，文字的排列，间距等等。这些都可以直接使用 CSS 进行控制。不过，有几个属性比较特殊，这里需要额外提一下。</p>
<h3 id="articleHeader9">text-anchor</h3>
<p>用来定义参考点和实际字符之间的定位关系。格式为：</p>
<ul><li><p>text-anchor: start | middle | end | inherit</p></li></ul>
<p>直接看代码解释吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Anchors in action -->
    <text text-anchor=&quot;start&quot;
          x=&quot;60&quot; y=&quot;40&quot;>A</text>

    <text text-anchor=&quot;middle&quot;
          x=&quot;60&quot; y=&quot;75&quot;>A</text>

    <text text-anchor=&quot;end&quot;
          x=&quot;60&quot; y=&quot;110&quot;>A</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Anchors in action --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"start"</span>
          <span class="hljs-attr">x</span>=<span class="hljs-string">"60"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"40"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"middle"</span>
          <span class="hljs-attr">x</span>=<span class="hljs-string">"60"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"75"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">text-anchor</span>=<span class="hljs-string">"end"</span>
          <span class="hljs-attr">x</span>=<span class="hljs-string">"60"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"110"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span></code></pre>
<p>第一个 A，参考的是 (60,40) 的点，定义为 <code>start</code> ，那么参考点应该在字符的前面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378908?w=97&amp;h=43" src="https://static.alili.tech/img/remote/1460000009378908?w=97&amp;h=43" alt="image.png-1kB" title="image.png-1kB" style="cursor: pointer;"></span></p>
<p>而剩下两个也是同样的道理：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378909?w=79&amp;h=105" src="https://static.alili.tech/img/remote/1460000009378909?w=79&amp;h=105" alt="image.png-1.9kB" title="image.png-1.9kB" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">tspan</h3>
<p>现在，假如我们想在 text 里面添加一些特殊的字符效果，比如斜体，加粗等。由于，text 标签不能实现嵌套，所以，为了解决这个痛点，提出了 <code>tspan</code> 的标签。它其实就是一个可以嵌套的 text 标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<text x=&quot;10&quot; y=&quot;30&quot; style=&quot;font-size:12pt;&quot;>
  Switch among
  <tspan style=&quot;font-style:italic&quot;>italic</tspan>, normal,
  and <tspan style=&quot;font-weight:bold&quot;>bold</tspan> text.
</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:12pt;"</span>&gt;</span>
  Switch among
  <span class="hljs-tag">&lt;<span class="hljs-name">tspan</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-style:italic"</span>&gt;</span>italic<span class="hljs-tag">&lt;/<span class="hljs-name">tspan</span>&gt;</span>, normal,
  and <span class="hljs-tag">&lt;<span class="hljs-name">tspan</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-weight:bold"</span>&gt;</span>bold<span class="hljs-tag">&lt;/<span class="hljs-name">tspan</span>&gt;</span> text.
<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span></code></pre>
<p>tspan 里面同样可以自定义相关的自身属性。详细的可以参考 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan" rel="nofollow noreferrer" target="_blank">tspan</a> 我这里就不详述了。</p>
<h3 id="articleHeader11">在 Path 展示 text</h3>
<p>Text 一般可以横放，竖放。那有没有啥办法让文字可以按照一定的路径任意排放呢？</p>
<p>有的，这里可以使用 <code>textPath</code> 标签，来定义具体参考路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path id=&quot;sharp-corner&quot;
    d=&quot;M 30 110 100 110 100 160&quot;
    style=&quot;stroke: gray; fill: none;&quot;/>

<text>
    <textPath xlink:href=&quot;#sharp-corner&quot;>
    Making a quick turn
    </textPath>
</text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sharp-corner"</span>
    <span class="hljs-attr">d</span>=<span class="hljs-string">"M 30 110 100 110 100 160"</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"stroke: gray; fill: none;"</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textPath</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#sharp-corner"</span>&gt;</span>
    Making a quick turn
    <span class="hljs-tag">&lt;/<span class="hljs-name">textPath</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span></code></pre>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378910?w=161&amp;h=117" src="https://static.alili.tech/img/remote/1460000009378910?w=161&amp;h=117" alt="image.png-11kB" title="image.png-11kB" style="cursor: pointer;"></span></p>
<p>具体细节我这里就不多说了。</p>
<h2 id="articleHeader12">Clip</h2>
<p>在 DOM 中如果想展示一个图片的部分，或者以某种形状展示图片的部分，一般是通过一个 cover div 来实现的。不过，如果涉及到不规则图形的话，那么 DOM 就有天生缺陷了（当然使用 CSS 里的 <code>clip-path</code> 可以完成，不过兼容性不太好）。而在 SVG 中，提供了 <code>clipPath</code> 标签，能够让我们自定义裁剪图片的范围和形状。</p>
<p>clipPath 里面可以接任何图形，比如，path,rect 甚至是 text。使用的时候，直接在 style 中，指定 <code>clip-path</code> 即可，或者直接使用 <code>clip-path</code> 属性指定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs>
  <clipPath id=&quot;textClip&quot;>
    <text id=&quot;text1&quot; x=&quot;20&quot; y=&quot;20&quot; transform=&quot;rotate(60)&quot;
      style=&quot;font-family: 'Liberation Sans';
        font-size: 48pt; stroke: black; fill: none;&quot;>
CLIP
    </text>
  </clipPath>
 </defs>
 
 <use transform=&quot;translate(100, 0)&quot;
  xlink:href=&quot;#shapes&quot; style=&quot;clip-path: url(#textClip);&quot;/>
  
   <use transform=&quot;translate(100, 0)&quot;
  xlink:href=&quot;#shapes&quot; clip-path=&quot;url(#textClip);&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">clipPath</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"textClip"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text1"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"rotate(60)"</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"font-family: 'Liberation Sans';
        font-size: 48pt; stroke: black; fill: none;"</span>&gt;</span>
CLIP
    <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">clipPath</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>
 
 <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"translate(100, 0)"</span>
  <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#shapes"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"clip-path: url(#textClip);"</span>/&gt;</span>
  
   <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"translate(100, 0)"</span>
  <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#shapes"</span> <span class="hljs-attr">clip-path</span>=<span class="hljs-string">"url(#textClip);"</span>/&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378911?w=381&amp;h=269" src="https://static.alili.tech/img/remote/1460000009378911?w=381&amp;h=269" alt="image.png-66.6kB" title="image.png-66.6kB" style="cursor: pointer;"></span></p>
<p>或者说，如果我们想画一个圆的裁剪区域的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs>
     <clipPath id=&quot;circularPath&quot; clipPathUnits=&quot;objectBoundingBox&quot;>
     <circle cx=&quot;0.5&quot; cy=&quot;0.5&quot; r=&quot;0.5&quot;/>
    </clipPath>
</defs>

<use xlink:href=&quot;#shapes&quot; style=&quot;clip-path: url(#circularPath);&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">clipPath</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circularPath"</span> <span class="hljs-attr">clipPathUnits</span>=<span class="hljs-string">"objectBoundingBox"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"0.5"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"0.5"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"0.5"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">clipPath</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#shapes"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"clip-path: url(#circularPath);"</span> /&gt;</span></code></pre>
<h2 id="articleHeader13">Appendix 参考标签</h2>
<h3 id="articleHeader14">g</h3>
<p>分组标签应该毫无意外排第一，因为其实作为绘制图形中最常和最基本的标签。前面一篇文章也主要介绍过了，这里做点补充。</p>
<p>每一个分组标签都带有 <code>id</code> 属性，唯一标识该分组，为什么呢？</p>
<p>因为，后面我们可以使用该 id 标签添加动画，重用该分组等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g id=&quot;demo&quot; stroke=&quot;green&quot; fill=&quot;white&quot; stroke-width=&quot;5&quot;>
     <circle cx=&quot;25&quot; cy=&quot;25&quot; r=&quot;15&quot;/>
     <circle cx=&quot;40&quot; cy=&quot;25&quot; r=&quot;15&quot;/>
     <circle cx=&quot;55&quot; cy=&quot;25&quot; r=&quot;15&quot;/>
     <circle cx=&quot;70&quot; cy=&quot;25&quot; r=&quot;15&quot;/>
   </g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;g id=<span class="hljs-string">"demo"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"green"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"white"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"5"</span>&gt;
     &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"25"</span> cy=<span class="hljs-string">"25"</span> r=<span class="hljs-string">"15"</span>/&gt;
     &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"40"</span> cy=<span class="hljs-string">"25"</span> r=<span class="hljs-string">"15"</span>/&gt;
     &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"55"</span> cy=<span class="hljs-string">"25"</span> r=<span class="hljs-string">"15"</span>/&gt;
     &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"70"</span> cy=<span class="hljs-string">"25"</span> r=<span class="hljs-string">"15"</span>/&gt;
   &lt;/g&gt;</code></pre>
<p>每个分组里面可以含有一些描述标签，比如 <code>desc</code>。 这些描述内容是不会被渲染的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g id=&quot;demo&quot; stroke=&quot;green&quot; fill=&quot;white&quot; stroke-width=&quot;5&quot;>
    <desc>Just Demo</desc>
     <circle cx=&quot;25&quot; cy=&quot;25&quot; r=&quot;15&quot;/>
   </g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;g id=<span class="hljs-string">"demo"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"green"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"white"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"5"</span>&gt;
    &lt;desc&gt;Just Demo&lt;/desc&gt;
     &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"25"</span> cy=<span class="hljs-string">"25"</span> r=<span class="hljs-string">"15"</span>/&gt;
   &lt;/g&gt;</code></pre>
<h3 id="articleHeader15">use</h3>
<p>该标签就是结合 <code>g</code> 标签一起使用，作用是可以复用 g 分组的样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g id=&quot;Port&quot;>
      <circle style=&quot;fill: inherit;&quot; r=&quot;10&quot;/>
</g>
<use x=&quot;50&quot; y=&quot;30&quot; xlink:href=&quot;#Port&quot; class=&quot;classA&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;g id=<span class="hljs-string">"Port"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"fill: inherit;"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"10"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span></span>
&lt;use x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"30"</span> xlink:href=<span class="hljs-string">"#Port"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"classA"</span>/&gt;</code></pre>
<p>里面使用 <code>xlink:href</code> 加上指定 group 的 id，然后通过 <code>x</code>，<code>y</code> 属性指定副本放置的位置。不过，有一个限制，use 标签的 style 属性，并不能覆盖点原始的 group style 样式。而且，有时候，我们只是想使用一些模板，即，图形并未被解析，只有代码存在。这时候，就需要使用 <code>defs</code> 来包裹了。</p>
<h3 id="articleHeader16">defs</h3>
<p>用来保存一些代码，使其不会被浏览器解析。并且里面的分组可以被 use 属性的 style 样式所覆盖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs>
    <g id=&quot;Port&quot;>
      <circle style=&quot;fill: inherit;&quot; r=&quot;10&quot;/>
    </g>
  </defs>

 <use x=&quot;50&quot; y=&quot;50&quot; xlink:href=&quot;#Port&quot; style=&quot;fill: blue;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"Port"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"fill: inherit;"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"10"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>

 <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#Port"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"fill: blue;"</span>/&gt;</span></code></pre>
<h3 id="articleHeader17">symbol</h3>
<p>该标签和 <code>g</code> 标签类似，也是用来进行分组。不过，它有个特点，即，不会被浏览器所渲染。那它不和 <code>defs</code> 差不多吗？</p>
<p>恩，确实。不过，defs 是官方推荐，用来包裹一些模板 svg 代码而创造出来，用来增加可读性的标签。而 symbol 是存粹的作为一个模板。它可以独立于 svg 的 viewbox 来自定义子 viewbox 和 preserveAspectRatio。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<symbol id=&quot;sym01&quot; viewBox=&quot;0 0 150 110&quot;>
  <circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;40&quot; stroke-width=&quot;8&quot;
      stroke=&quot;red&quot; fill=&quot;red&quot;/>
  <circle cx=&quot;90&quot; cy=&quot;60&quot; r=&quot;40&quot; stroke-width=&quot;8&quot;
      stroke=&quot;green&quot; fill=&quot;white&quot;/>
</symbol>

<use href=&quot;#sym01&quot;
     x=&quot;0&quot; y=&quot;0&quot; width=&quot;100&quot; height=&quot;50&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;symbol id=<span class="hljs-string">"sym01"</span> viewBox=<span class="hljs-string">"0 0 150 110"</span>&gt;
  &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"50"</span> cy=<span class="hljs-string">"50"</span> r=<span class="hljs-string">"40"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"8"</span>
      <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"red"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span>/&gt;
  &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"90"</span> cy=<span class="hljs-string">"60"</span> r=<span class="hljs-string">"40"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"8"</span>
      <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"green"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"white"</span>/&gt;
&lt;/symbol&gt;

&lt;use href=<span class="hljs-string">"#sym01"</span>
     x=<span class="hljs-string">"0"</span> y=<span class="hljs-string">"0"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"100"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"50"</span>/&gt;</code></pre>
<p>同样使用该模板，也是使用 <code>use</code> 标签来完成。</p>
<h3 id="articleHeader18">image</h3>
<p>既然 <code>use</code> 可以重用 SVG 代码，那么 SVG 里面能不能重用已经画好的 png/jpg 的图片呢？</p>
<p>这时候，就需要用到 <code>image</code> 标签。其可以用来加载外部的 PNG, JPEG 图片，注意，官方规定是前两种，其它图片支持不支持官方没做答复。即，如果你使用 GIF 图片，并不能保证所有的浏览器都能正常显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<image xlink:href=&quot;kwanghwamun.jpg&quot;
  x=&quot;72&quot; y=&quot;92&quot;
  width=&quot;160&quot; height=&quot;120&quot;/>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">image</span> xlink:href=<span class="hljs-string">"kwanghwamun.jpg"</span>
  x=<span class="hljs-string">"72"</span> y=<span class="hljs-string">"92"</span>
  <span class="hljs-built_in">width</span>=<span class="hljs-string">"160"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"120"</span>/&gt;
&lt;/svg&gt;</code></pre>
<p>同样，该 <code>image</code> 标签也具有自定义 preserveAspectRatio 的效果。</p>
<ul>
<li><p>x: 定义水平位置</p></li>
<li><p>y: 定义垂直位置</p></li>
<li><p>width: 图片渲染的宽度，必须有。</p></li>
<li><p>height: 图片渲染的高度，必须有。</p></li>
<li><p>preserveAspectRatio: 控制图片的缩放</p></li>
</ul>
<h3 id="articleHeader19">marker</h3>
<p>marker 一般是用来画箭头或者线段始末的标识图形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<defs>
    <marker id=&quot;Triangle&quot; viewBox=&quot;0 0 10 10&quot; refX=&quot;1&quot; refY=&quot;5&quot;
        markerWidth=&quot;6&quot; markerHeight=&quot;6&quot; orient=&quot;auto&quot;>
      <path d=&quot;M 0 0 L 10 5 L 0 10 z&quot; />
    </marker>
  </defs>

  <polyline points=&quot;10,90 50,80 90,20&quot; fill=&quot;none&quot; stroke=&quot;black&quot; 
      stroke-width=&quot;2&quot; marker-end=&quot;url(#Triangle)&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">marker</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"Triangle"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 10 10"</span> <span class="hljs-attr">refX</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">refY</span>=<span class="hljs-string">"5"</span>
        <span class="hljs-attr">markerWidth</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">markerHeight</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">orient</span>=<span class="hljs-string">"auto"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M 0 0 L 10 5 L 0 10 z"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">marker</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">polyline</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"10,90 50,80 90,20"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">"black"</span> 
      <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">marker-end</span>=<span class="hljs-string">"url(#Triangle)"</span> /&gt;</span></code></pre>
<p>如图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378912?w=124&amp;h=95" src="https://static.alili.tech/img/remote/1460000009378912?w=124&amp;h=95" alt="image.png-1.5kB" title="image.png-1.5kB" style="cursor: pointer; display: inline;"></span></p>
<p>这里我们只需要里了解即可，因为在实际画的时候，直接使用相关工具生成更加方便。</p>
<h3 id="articleHeader20">a</h3>
<p>这里的 a 标签和我们直接在 HTML 使用的超链接 a 标签类似。也是用来定义一个外链的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a xlink:href=&quot;https://developer.mozilla.org/en-US/docs/SVG&quot;
      target=&quot;_blank&quot;>
    <rect height=&quot;30&quot; width=&quot;120&quot; y=&quot;0&quot; x=&quot;0&quot; rx=&quot;15&quot;/>
    <text fill=&quot;white&quot; text-anchor=&quot;middle&quot; 
          y=&quot;21&quot; x=&quot;60&quot;>SVG on MDN</text>
  </a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;a xlink:href=<span class="hljs-string">"https://developer.mozilla.org/en-US/docs/SVG"</span>
      target=<span class="hljs-string">"_blank"</span>&gt;
    &lt;<span class="hljs-built_in">rect</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"30"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"120"</span> y=<span class="hljs-string">"0"</span> x=<span class="hljs-string">"0"</span> rx=<span class="hljs-string">"15"</span>/&gt;
    &lt;<span class="hljs-built_in">text</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"white"</span> <span class="hljs-built_in">text</span>-anchor=<span class="hljs-string">"middle"</span> 
          y=<span class="hljs-string">"21"</span> x=<span class="hljs-string">"60"</span>&gt;SVG on MDN&lt;/<span class="hljs-built_in">text</span>&gt;
  &lt;/a&gt;</code></pre>
<h2 id="articleHeader21">个人公众号</h2>
<p>更多内容，可以关注我的公众号：前端小吉米。</p>
<blockquote><p>分享吉米的前端路，后面也会定期推出当前热门的前端技术~ 比如，直播，VR</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009378913?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000009378913?w=258&amp;h=258" alt="image.png-43.2kB" title="image.png-43.2kB" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SVG 动画精髓

## 原文链接
[https://segmentfault.com/a/1190000009378881](https://segmentfault.com/a/1190000009378881)

