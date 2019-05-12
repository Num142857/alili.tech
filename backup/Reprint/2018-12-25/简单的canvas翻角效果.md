---
title: '简单的canvas翻角效果' 
date: 2018-12-25 2:30:11
hidden: true
slug: 4mfu8fkswc9
categories: [reprint]
---

{{< raw >}}

                    
<p>由于工作需求 , 需要写一个翻角效果;<br><span class="img-wrap"><img data-src="/img/bVYVm4?w=135&amp;h=127" src="https://static.alili.tech/img/bVYVm4?w=135&amp;h=127" alt="翻角效果图" title="翻角效果图" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://jsbin.com/rereqes" rel="nofollow noreferrer" target="_blank">demo链接</a></p>
<p>右上角需要从无的状态撕开一个标记 , 且有动画过程 , 上图是实现的效果图 , 不是gif</p>
<p>对这个翻角效果的难点在于没有翻开的时候露出的是dom下面的内容 , 实现角度来说 纯dom + css动画的设计方案并没有相出一个好的对策 ; 于是捡起了好久之前学的入门级别的canvas;</p>
<p>下面说一下实现思路:</p>
<ol><li><p>动画拆分 :<br>将此动画分解成两部分 , 一部分是翻页出现的黑色三角区域 , 另一个是露出的橘色展示内容<br>对于橘色的展示内容区域相对好一些 , 因为是一个规则图形 , 而黑色区域相对较难;</p></li></ol>
<p>先从基础canvas使用方法说起 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <canvas class=&quot;myCanvas&quot; width=&quot;100&quot; height=&quot;100&quot;></canvas>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container"</span>&gt;
    &lt;<span class="hljs-selector-tag">canvas</span> class=<span class="hljs-string">"myCanvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"100"</span> height=<span class="hljs-string">"100"</span>&gt;&lt;/canvas&gt;
&lt;/div&gt;
</code></pre>
<p>布局如上 , 这里要说一点踩过的坑是 , canvas必须要设置上width 与 height , 此处并非为css中的width与height;而是写在dom上的属性 ; <strong>因为dom上的width与height标识了canvas的分辨率(个人理解)</strong>; 所以此canvas画布分辨率为100*100 , 而展示尺寸是可以通过css控制;</p>
<p>js中首先要做的是获取canvas对象 ,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.querySelector('.myCanvas'); //获取canvas对应dom
var ctx = canvas.getContext('2d'); //此方法较为基础 , 意为获取canvas绘画2d内容的工具(上下文)
var cw = 100; //分辨率 , 其实直接从dom上获取可能更好些
var ch = 100; //分辨率 , 其实直接从dom上获取可能更好些
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.myCanvas'</span>); <span class="hljs-comment">//获取canvas对应dom</span>
<span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>); <span class="hljs-comment">//此方法较为基础 , 意为获取canvas绘画2d内容的工具(上下文)</span>
<span class="hljs-keyword">var</span> cw = <span class="hljs-number">100</span>; <span class="hljs-comment">//分辨率 , 其实直接从dom上获取可能更好些</span>
<span class="hljs-keyword">var</span> ch = <span class="hljs-number">100</span>; <span class="hljs-comment">//分辨率 , 其实直接从dom上获取可能更好些</span>
</code></pre>
<p>ctx这个绘画上下文在这个教程中起到的作用至关重要 ;  它提供了非常强大的api , 比如用于画线 , 填充 , 写文字等 , 这样看来理解为画笔会更为简明一些;</p>
<p>此处效果需要用到的api如下 ( 不做详细解释 , 可w3c自行查询 );</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.save() //保存上下文状态 (比如画笔尺寸 颜色 旋转角度)
ctx.restore() //返回上次保存的上下文状态
ctx.moveTo(x,y) //上下文移动到具体位置
ctx.lineTo(x,y) //上下文以划线的形式移动到某位置
ctx.stroke() // 画线动作
ctx.quadraticCurveTo() //上下文(画笔)按贝塞尔曲线移动(简单理解为可控的曲线即可)
ctx.arc() //画圆
ctx.beginPath() //开启新的画笔路径
ctx.closePath() //关闭当前画笔路径
ctx.createLinearGradient() //创建canvas渐变对象
ctx.fill() //对闭合区域进行填充
ctx.globalCompositeOperation //画笔的重叠模式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.save</span>() <span class="hljs-comment">//保存上下文状态 (比如画笔尺寸 颜色 旋转角度)</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.restore</span>() <span class="hljs-comment">//返回上次保存的上下文状态</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.moveTo</span>(x,y) <span class="hljs-comment">//上下文移动到具体位置</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.lineTo</span>(x,y) <span class="hljs-comment">//上下文以划线的形式移动到某位置</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.stroke</span>() <span class="hljs-comment">// 画线动作</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.quadraticCurveTo</span>() <span class="hljs-comment">//上下文(画笔)按贝塞尔曲线移动(简单理解为可控的曲线即可)</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.arc</span>() <span class="hljs-comment">//画圆</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.beginPath</span>() <span class="hljs-comment">//开启新的画笔路径</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.closePath</span>() <span class="hljs-comment">//关闭当前画笔路径</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.createLinearGradient</span>() <span class="hljs-comment">//创建canvas渐变对象</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.fill</span>() <span class="hljs-comment">//对闭合区域进行填充</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.globalCompositeOperation</span> <span class="hljs-comment">//画笔的重叠模式</span>
</code></pre>
<p>可能方法列举的不够详尽 , 见谅.</p>
<p>首先是绘制黑色翻出的部分 , 图形分解为如下几部分(请根据上图脑补)</p>
<ol>
<li><p>左上角向右下的半弧 ╮</p></li>
<li><p>然后是竖直向下的竖线 |</p></li>
<li><p>然后是向右的半圆   ╰</p></li>
<li><p>再然后是向右的横线</p></li>
<li><p>接着还是向右下的半弧 ╮</p></li>
<li><p>最后是将线连接会起点</p></li>
</ol>
<p>于是第一步 我们要先将画笔移动到 起始位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   ctx.moveTo(50,0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">   ctx.moveTo(<span class="hljs-number">50</span>,<span class="hljs-number">0</span>);</code></pre>
<p>然后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.quadraticCurveTo(55 , 5 , 55 , 25); // 可以理解为从(50,0)这个点划线到(55,25)这个点 , 中间会受到(55,5)这个点将直线想磁铁一样&quot;吸&quot;成曲线;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ctx.quadraticCurveTo(<span class="hljs-number">55</span> , <span class="hljs-number">5</span> , <span class="hljs-number">55</span> , <span class="hljs-number">25</span>); <span class="hljs-comment">// 可以理解为从(50,0)这个点划线到(55,25)这个点 , 中间会受到(55,5)这个点将直线想磁铁一样"吸"成曲线;</span></code></pre>
<p>于是第一个向右下的半弧完成 , 此时canvas上没有任何绘制内容 , 因为还没有执行过绘制方法例如stroke或fill,</p>
<p>接下来直线向下就是简单的移动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.lineTo(55 , 40);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ctx.lineTo(<span class="hljs-number">55</span> , <span class="hljs-number">40</span>);</code></pre>
<p>这个时候我们接下来应该画向右的半圆 ,  这个时候再用贝塞尔曲线绘制 实在有些不太合适 , 因为从图上来看 , 这里完全是1/4的圆 , 所以要使用canvas提供的画圆的api</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.arc(60 , 40 , 5 , Math.PI , Math.PI / 2 , true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ctx.arc(<span class="hljs-number">60</span> , <span class="hljs-number">40</span> , <span class="hljs-number">5</span> , Math.<span class="hljs-literal">PI</span> , Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span> , true);</code></pre>
<p>上述画圆的代码意为 : 以(60,40)点为圆心 , 5为半径 , 逆时针从 180度绘制到90度 , 180度就是圆心的水平向左 到达点(55,40) , 与上一步连接上 , 然后又因为屏幕向下为正 , 90度在圆心正下方 , 所以绘制出此半圆</p>
<p>于是按照相同的步骤 水平向右</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.lineTo(75 , 45);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.lineTo(<span class="hljs-number">75</span> , <span class="hljs-number">45</span>);
</code></pre>
<p>然后再次使用贝塞尔曲线用第一步的思路画出向右下的弧;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.quadraticCurveTo( 95 , 45 , 100 , 50 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ctx.quadraticCurveTo( <span class="hljs-number">95</span> , <span class="hljs-number">45</span> , <span class="hljs-number">100</span> , <span class="hljs-number">50</span> );</code></pre>
<p>同理 上述贝塞尔曲线可以理解为一条从( 75 , 45 ) 到 ( 100 , 50 )的线被 ( 95 , 45 )"吸"成曲线</p>
<p>最后链接起点 , 闭合绘画区域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.lineTo(50 , 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">ctx.lineTo(<span class="hljs-number">50</span> , <span class="hljs-number">0</span>);</code></pre>
<p>这个时候黑色区域的翻页就画完了 , 然后此时开始填充颜色 ;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gradient = ctx.createLinearGradient(50 , 50 , 75 , 75);
gradient.addColorStop(0 , '#ccc');
gradient.addColorStop(0.7 , '#111');
gradient.addColorStop(1 , '#000');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var gradient = ctx.createLinearGradient(<span class="hljs-number">50</span> , <span class="hljs-number">50</span> , <span class="hljs-number">75</span> , <span class="hljs-number">75</span>);
gradient.addColorStop(<span class="hljs-number">0</span> , '#ccc');
gradient.addColorStop(<span class="hljs-number">0.7</span> , '#<span class="hljs-number">111</span>');
gradient.addColorStop(<span class="hljs-number">1</span> , '#<span class="hljs-number">000</span>');
</code></pre>
<p>我们通过上述代码创建一个 从( 50 , 50 )点到(75 , 75)点的线性渐变 , 颜色从 #ccc 到 #111 到 #000 ; 创建高光效果;<br>然后填充:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.fillStyle = gradient;
ctx.fill();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>ctx.fillStyle = gradient<span class="hljs-comment">;</span>
ctx.fill()<span class="hljs-comment">;</span>
</code></pre>
<p>于是翻页效果的一半就算完成了。</p>
<p>至此 , 我要说一点我领悟的canvas的绘画"套路";</p>
<p>对于上述教程中 , 有一步我们使用了一个词叫做 闭合 , 闭合的概念在canvas中是真是存在的 , 对于fill方法来说 填充的区间是有一个空间尺寸才可以的 , 比如我们绘画的这个黑色的三角形 , 加入我们最后没有将终点与起点相连接 , 同样canvas会自动帮我们链接最后一笔绘画的位置到起点 , 强制行程闭合空间 , 而这样我们想再多画几个新的闭合空间就麻烦了 , 所以canvas提供了如下api 新建闭合路径:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath(); //新建路径
ctx.closePath(); //闭合路径
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.beginPath</span>(); <span class="hljs-comment">//新建路径</span>
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.closePath</span>(); <span class="hljs-comment">//闭合路径</span>
</code></pre>
<p>所以对于我们接下来要绘制右上角橘色区域来说 , 我们在绘制黑色区域之前首先要做的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath();
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>ctx.<span class="hljs-keyword">begin</span>Path();
...</code></pre>
<p>然后在fill之前 我们应该</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.closePath();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>ctx.closePath()<span class="hljs-comment">;</span>
</code></pre>
<p>也就是说beginPath 到 closePath之间标识着我们自己的一个完整的绘画阶段.</p>
<p>那么接下来绘制右上角的橘色区域就简单很多了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath();
ctx.moveTo(50,0);
ctx.lineTo(100,50);
ctx.lineTo(100,0);
ctx.lineTo(50,0);
ctx.closePath();
ctx.fillStyle = '#ff6600';
ctx.fill();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.beginPath();
ctx.moveTo(<span class="hljs-number">50</span>,<span class="hljs-number">0</span>);
ctx.lineTo(<span class="hljs-number">100</span>,<span class="hljs-number">50</span>);
ctx.lineTo(<span class="hljs-number">100</span>,<span class="hljs-number">0</span>);
ctx.lineTo(<span class="hljs-number">50</span>,<span class="hljs-number">0</span>);
ctx.closePath();
ctx.fillStyle = '#ff6600';
ctx.fill();</code></pre>
<p>于是右上角的橘色区域我们就绘制完成了;</p>
<p>文字绘制</p>
<p>接下来绘制"new" , 实际上是使用canvas简单的文本绘制 , 代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deg = Math.PI / 180;
ctx.globalCompositeOperation = 'source-atop'; //canvas层叠模式
ctx.beginPath();
ctx.font = '14px Arial'; //设置字体大小 字体
ctx.textAlign = 'center'; // 字体对齐方式
ctx.translate(78 , 22);  // 移动canvas画布圆点
ctx.rotate(45 * deg);    // 旋转画布
ctx.fillStyle = '#fff';  // 设置文字颜色
ctx.fillText('NEW' , 0 , 0); //文字绘制动作
ctx.closePath();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var deg = Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">180</span>;
ctx.globalCompositeOperation = <span class="hljs-string">'source-atop'</span>; <span class="hljs-comment">//canvas层叠模式</span>
ctx.beginPath();
ctx.font = <span class="hljs-string">'14px Arial'</span>; <span class="hljs-comment">//设置字体大小 字体</span>
ctx.<span class="hljs-built_in">textAlign</span> = <span class="hljs-string">'center'</span>; <span class="hljs-comment">// 字体对齐方式</span>
ctx.<span class="hljs-built_in">translate</span>(<span class="hljs-number">78</span> , <span class="hljs-number">22</span>);  <span class="hljs-comment">// 移动canvas画布圆点</span>
ctx.<span class="hljs-built_in">rotate</span>(<span class="hljs-number">45</span> * deg);    <span class="hljs-comment">// 旋转画布</span>
ctx.fillStyle = <span class="hljs-string">'#fff'</span>;  <span class="hljs-comment">// 设置文字颜色</span>
ctx.fillText(<span class="hljs-string">'NEW'</span> , <span class="hljs-number">0</span> , <span class="hljs-number">0</span>); <span class="hljs-comment">//文字绘制动作</span>
ctx.closePath();
</code></pre>
<p>对于上述代码中 , 文字的相关api是属于没有难度的 , 只是设置而已 , 需要理解的部分在于 translate和rotate,</p>
<p>这两个方法中 translate的意思为移动canvas画布的( 0 , 0 )点到 (78,22),然后旋转45度, 再将文字渲染在原点 , 实际就是 ( 78 , 22 ) 这个点上, 此时我们对canvas的画笔做出了非常大的修改 </p>
<p>比如我们修改了旋转角度以及画布圆点 , 这种操作或许只在我们需要绘制倾斜的new 的时候需要 , 后期可能就不需要使用了 ,</p>
<p>还好canvas的画笔是存在"状态"的, 通过ctx.save();可以保存当前画笔的状态 , 通过ctx.restore();可以恢复到上次画笔保存的状态.</p>
<p>于是我个人理解到 , 在开发canvas动画时 , 一个较好的习惯就是 , 在beginPath之前先ctx.save();保存画笔状态 , 在closePath后ctx.restore();恢复之前的画笔状态 , 这样我们的每一个绘制阶段对于画笔的修改都将是不会有影响的.( 个人经验 )</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.globalCompositeOperation = 'source-atop'; //canvas层叠模式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ctx.globalCompositeOperation = <span class="hljs-string">'source-atop'</span>; <span class="hljs-comment">//canvas层叠模式</span>
</code></pre>
<p>代码中这部分是指 我们绘制的文字new 与 橘色三角形区域的重叠关系 , 此方法取值较多 , 此处不做过多介绍 , source-atop值可以使重叠区域保留 , 新绘制的内容在重叠区域以外的部分消失 , 以此达到new在里面的效果</p>
<p>到这里我们就开发好了翻角效果的完全展示的状态 , 那么如何让这个区域动起来呢?</p>
<p>此处需要使用h5提供的用于刷帧的函数 requestAnimationFrame ;</p>
<p>此方法可简单理解为 16毫秒的定时器 , 但是厉害的是可以再各个环境中自动匹配到可达到的相对顺畅的帧率 , 实际并不是定时器哈~</p>
<p>我们需要在这个循环执行的函数中 , 将上述的绘制内容重复绘制 , 例如 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    drawMethod(); //绘制三角等内容
    window.requestAnimationFrame(function(){
        draw();
    })
}
function drawMethod(){
    //...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    drawMethod(); <span class="hljs-comment">//绘制三角等内容</span>
    <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        draw();
    })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawMethod</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//...</span>
}
</code></pre>
<p>这样我们就可以达到刷帧的效果了 , 于是接着我们要做的就是控制绘制时各个数值的参数.</p>
<p>比如我们是以 (50,0)为起点 , ( 100 , 50 )为终点这样的两个移动点为绘制标记的 , 如果我们将两个点进行存储 , 并且每次执行drawMethod的时候更新点的位置 , 然后清空canvas ,再绘制新的点 那么就可以达到canvas动起来的目的了;</p>
<p><a href="http://jsbin.com/rereqes" rel="nofollow noreferrer" target="_blank">实际效果链接在这里</a></p>
<p>在上面的demo链接中 , 自己定义了一个速度与加速度的关系 , 比如每次绘制一次canvas后 , 将存储的点坐标进行增加一个speed值 , 然后speed值也增加 , 这样speed对应的概念就是速度 , 而speed的增加值对应的就是加速度. 所以就呈现了一种加速运动的状态;</p>
<p>以上内容纯属个人理解内容 , 若果有哪里理解错了 欢迎各位大大指点 , 另demo链接失效可私信.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单的canvas翻角效果

## 原文链接
[https://segmentfault.com/a/1190000012101315](https://segmentfault.com/a/1190000012101315)

