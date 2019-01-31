---
title: 'H5打造3d场景不完全攻略（二）: Amazing CSS3D' 
date: 2019-02-01 2:30:10
hidden: true
slug: if1i2hs28ah
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>对的，本文就是着重介绍如何使用CSS3中的3D变换打造出H5中的3D效果。灵感来源于造物节团队的3d引擎，因为使用方法比较复杂，也没有开源的API文档，于是想自己另外造个轮子，便开始了相关内容的学习和实践。<br>众所周知，目前市面上的H5 3D类库（如Three）、引擎（Egret）、构建工具（kpano、720云）都或存在体积太大、不开源、非免费、学习成本高等问题。对于我们较为熟悉的CSS3，为什么就不对它好好利用一把呢？诚然，CSS3存在我们比较清楚的短板，CSS对平面的渲染能力高，但是对3D建模方面便力不从心了。</p>
<p>我们知道3D的表现形式即让我们通过平面可从不同角度看到真实物体的展示效果。</p>
<blockquote>
<p>在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，三个不在一条直线上的点就能够组成一个三角形面，无数三角形面就能够组成各种形状的物体，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVAdbj?w=400&amp;h=321" src="https://static.alili.tech/img/bVAdbj?w=400&amp;h=321" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们通常把这种网格模型叫做Mesh模型。给物体贴上皮肤，或者专业点就叫做纹理，那么这个物体就活灵活现了。最后无数的物体就组成了我们的3D世界。</p>
</blockquote>
<p>Three中模型解析器的原理是将顶点数组将模型的顶点用数组储存起来，再利用three中的face函数取得定点数组中的三个或四个顶点的索引构成空间平面。如此反复，模型就被完整构造出来了。</p>
<p>于是，越复杂的物体就需要越多的网面拼接。而css中是不存在根据坐标建立空间平面的能力的。</p>
<p>（插个题外话，其实css有一个属性与坐标有关，那就是clip-path。这个属性的特性赋予了css3一定的建模能力。实现方法可参考这篇文章 <a href="http://www.tuicool.com/articles/ZfQzy2v" rel="nofollow noreferrer" target="_blank">纯clip-path打造的3D模型渲染器</a>）</p>
<h2 id="articleHeader1">CSS3实现3D全景</h2>
<p>。上篇文章介绍了Web3D的一些表现形式，这里着重谈谈怎么以CSS3实现3D全景。下面会探索Three实现全景的方案，因为WebGL门槛和学习成本还是比较高的，不适于用于快速开发。造物节的CSS3d全景已有文章对其进行了技术探秘，但都未深入谈及具体实现方式。</p>
<p>要清晰理解实现方式，必须对CSS3的transform、perspective有一定的认识。<br>原理方面的东西我就不深入讲了，大家可以先看看这篇文章，对CSS3D有一个大致的概念。<br><a href="http://www.oxxostudio.tw/articles/201506/css-3d.html" rel="nofollow noreferrer" target="_blank">玩轉 CSS 3D - 原理篇</a></p>
<p>CSS全景可通过建立柱形或者立方体再通过贴图方式实现。也许会有人问，球体行不行？实际上是不行的，球体模型由无数个极小的平面拼接构成连贯曲面，而CSS缺乏使平面扭曲的属性。球体模型我们可以使用上文提过的Clip-3d建造出，但是，贴图问题就解决不了了。</p>
<h3 id="articleHeader2">天空盒子</h3>
<p>相信很多打造过或有了解过3d全景的同行们都知道这个概念。实际上Skybox就是一个立方体，通过给六个面贴上不同的，边缘可以无缝贴合的图片，再将视角伸入盒子内部。可以想象成我们自己站入了一个巨型立方体盒子内部，移动视角便能看到不同的场景。</p>
<p><span class="img-wrap"><img data-src="/img/bVAetN?w=590&amp;h=417" src="https://static.alili.tech/img/bVAetN?w=590&amp;h=417" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>1、贴图<br>来看一张天空盒子的贴图，剪头指向的边缘代表需要无缝贴合的边。<br><span class="img-wrap"><img data-src="/img/bVAd8L?w=564&amp;h=422" src="https://static.alili.tech/img/bVAd8L?w=564&amp;h=422" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>从上图可以看出只要相互贴合的两个面上的图像能够无缝拼接，那么再通过对各个面进行一定的旋转变换，天空盒子就能被打造出来了。</p>
<p>那么问题来了，怎么去拍摄制作这样的图片呢？这就需要通过一些专业软件了，比如pano2vr，max等。其实，需要用到这些专业工具打造的全景对画质和拼合度的要求都非常高了，而单纯依靠CSS3中的变化给不了它们很好的体验。</p>
<p>但我们今天讨论的是某些运营活动H5打造的全景，此全景不一定真实存在，或者是和真实场景有一定的比例差距。例如星空、海底。对于这类贴合度可人为改变的全景图的打造，我们可以采用现有的高清图片，再经由PS转换成六面全景图。<br>贴一篇文章 <a href="http://www.interlopers.net/tutorials/28841" rel="nofollow noreferrer" target="_blank">Create a Skybox From Photos</a><br>其实主要思想是<br>在一张大图上勾画出六个面的选取 &gt;<br>选择大图中某个面的相邻面将其旋转到需要拼合的盒子的某个面上，使他们完美贴合 &gt;<br>得到最合理的六面贴图后，观察有无创造出新的边缘，通过蒙版等工具使他们自然融合。</p>
<p>2、构造<br>贴图完成就可以创建立方体了。首先将创建好的六个面切割出来，以front、back、left、right…命名标记位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .sence {
      -webkit-perspective: 1000px;
    }
    .cube {
      width: 500px;
      height: 500px;
      margin: 100px auto;
      transform-style: preserve-3d;
    }
    .cube img {
      width: 130px;
      height: 130px;
      position: absolute;
    }
    .cube img:nth-child(1) {

    }
    .cube img:nth-child(2) {
      transform:  rotateY(180deg);
    }
    .cube img:nth-child(3) {
      transform:  rotateY(90deg);
    }
    .cube img:nth-child(4) {
      transform:  rotateY(-90deg);
    }
    .cube img:nth-child(5) {
      transform:  rotateX(90deg);
    }
    .cube img:nth-child(6) {
      transform:  rotateX(-90deg);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.sence</span> {
      <span class="hljs-attribute">-webkit-perspective</span>: <span class="hljs-number">1000px</span>;
    }
    <span class="hljs-selector-class">.cube</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
      <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">130px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
      <span class="hljs-attribute">position</span>: absolute;
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {

    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
      <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">rotateY</span>(180deg);
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
      <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">rotateY</span>(90deg);
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
      <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">rotateY</span>(-90deg);
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
      <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">rotateX</span>(90deg);
    }
    <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
      <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">rotateX</span>(-90deg);
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;sence&quot;>
    <div class=&quot;cube&quot;>
      <img src=&quot;img/skybox/front.jpg&quot; alt=&quot;&quot; />
      <img src=&quot;img/skybox/back.jpg&quot; alt=&quot;&quot; />
      <img src=&quot;img/skybox/left.jpg&quot; alt=&quot;&quot; />
      <img src=&quot;img/skybox/right.jpg&quot; alt=&quot;&quot; />
      <img src=&quot;img/skybox/top.jpg&quot; alt=&quot;&quot; />
      <img src=&quot;img/skybox/bottom.jpg&quot; alt=&quot;&quot; />
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"sence"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"cube"</span>&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/front.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/back.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/left.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/right.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/top.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
      &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"img/skybox/bottom.jpg"</span> alt=<span class="hljs-string">""</span> /&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
<p>准备好6个面，载入贴图。通过旋转，使得每个面旋转到相印的位置。如左边的面由原本面朝我们的图片绕Y轴逆时针旋转90°得到。（注意Y轴逆时针旋转是正数）</p>
<p>此时会得到下图这样的效果：<br><span class="img-wrap"><img data-src="/img/bVAfbj?w=168&amp;h=158" src="https://static.alili.tech/img/bVAfbj?w=168&amp;h=158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是由于每个面的旋转中心都在其正中位置，因此还不能形成正方体。于是我们需要让每个面产生一定的位移。</p>
<p>贴一张坐标系图以助于大家理解。<br><span class="img-wrap"><img data-src="/img/bVAfeM?w=368&amp;h=402" src="https://static.alili.tech/img/bVAfeM?w=368&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在首先让front位移到应该到的位置，由于全景图的镜头在立方体内部，因此，可以想象一下，我们需要将图片往后移动。移动距离很明显为立方体边长的一半。在这里是65px。得到下图结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube img:nth-child(1) {
      transform: translateZ(-65px);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-65px);
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVAfd0?w=195&amp;h=175" src="https://static.alili.tech/img/bVAfd0?w=195&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>照这样看，是不是back位移为<code>translateZ(65px)</code>，left为<code>translateX(-65px)</code>，top <code>translateY(-65px)</code>呢？但结果并不是我们想要的。<br><span class="img-wrap"><img data-src="/img/bVAffd?w=137&amp;h=237" src="https://static.alili.tech/img/bVAffd?w=137&amp;h=237" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>重新看回上文空间坐标系的那张贴图，我们会发现，平面旋转后，其对应的三个轴的位置也改变了。如图片绕Y旋转后，Z轴指向为屏幕的水平方向。绕X旋转后，Z轴指向垂直方向。因此我们很容易发现，其实要将贴面移动到正确的位置，都只需要让他们<code>translateZ(-width/2px)</code>就可以了。</p>
<p><span class="img-wrap"><img data-src="/img/bVAfgF?w=188&amp;h=176" src="https://static.alili.tech/img/bVAfgF?w=188&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>为了让大家容易理解，我这里设置了一个较大的perspective。要想得到全景的效果，我们将镜头拉近让它进入到box里面就可以了。</p>
<p><span class="img-wrap"><img data-src="/img/bVAfjj?w=1687&amp;h=430" src="https://static.alili.tech/img/bVAfjj?w=1687&amp;h=430" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>接下来绑定手势，就可以让它动起来啦。</p>
<p>部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="viewer.on('touchstart', function(e) {
    x1 = e.targetTouches[0].pageX; - $(this).offset().left;
    y1 = e.targetTouches[0].pageY; - $(this).offset().top;
});

viewer.on('touchmove',function(){
    var dist_x = x2 - x1,
        dist_y = y2 - y1,
        deg_x = Math.atan2(dist_y, perspective) / Math.PI * 180,
        deg_y = -Math.atan2(dist_x, perspective) / Math.PI * 180,
        i,
        c_x_deg += deg_x;
        c_y_deg += deg_y;
        
    cube.css('transform', 'rotateX(' + deg_x + 'deg) rotateY(' + deg_y + 'deg)');
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>viewer.on(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    x1 = e.targetTouches[<span class="hljs-number">0</span>].pageX; - $(<span class="hljs-keyword">this</span>).offset().left;
    y1 = e.targetTouches[<span class="hljs-number">0</span>].pageY; - $(<span class="hljs-keyword">this</span>).offset().top;
});

viewer.on(<span class="hljs-string">'touchmove'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> dist_x = x2 - x1,
        dist_y = y2 - y1,
        deg_x = <span class="hljs-built_in">Math</span>.atan2(dist_y, perspective) / <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">180</span>,
        deg_y = -<span class="hljs-built_in">Math</span>.atan2(dist_x, perspective) / <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">180</span>,
        i,
        c_x_deg += deg_x;
        c_y_deg += deg_y;
        
    cube.css(<span class="hljs-string">'transform'</span>, <span class="hljs-string">'rotateX('</span> + deg_x + <span class="hljs-string">'deg) rotateY('</span> + deg_y + <span class="hljs-string">'deg)'</span>);
})
</code></pre>
<p>Math.atan2(y,x) 方法：得到从 x 轴到点 (x,y) 之间的角度。对于空间左边系比较难理解，大家可以想象成一张以空间Z轴为Y轴的平面绕X轴正方向旋转的角度即为cube绕空间Y轴旋转的角度。</p>
<h3 id="articleHeader3">柱形</h3>
<p>柱形全景也不算复杂。关于圆柱形的打造方法，大家可以参考下这篇文章<a href="http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201502061338.html" rel="nofollow noreferrer" target="_blank">CSS3 3D transforms系列教程-3D旋转木马</a><br>有了这个基础，我们可以写一段函数快速构造柱形全景。</p>
<p>先来看下页面结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  body {
    height: 100%;
    overflow: hidden;
  }
    .scene {
      width: 100%;
      height: 1170px;
      transform: translateX(-50%) translateY(-50%);
      top: 50%;
      left: 50%;
      position: absolute;
    }
    .cube {
      transform-style: preserve-3d;
      height: 100%;
      width: 100%;
      margin: 0px auto;
    }
    .cube_bg {
      transform-style: preserve-3d;
      height: 100%;
      width: 128px;
      margin: 0px auto;
    }
    .cube_bg div {
      height: 100%;
      
      /* 这里为圆柱形的每个面都设定了同样的背景图 那么在建造柱形时不再需要手动切图 */
      background-image: url(&quot;img/zao/zao.png&quot;);
      
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
    }
</style>

<body>
  <div class=&quot;scene&quot;>
    <div class=&quot;cube&quot;>
      <div class=&quot;cube_bg&quot;>
        <!--
        这里是柱形全景背景贴图
        -->
      </div>
      <div class=&quot;cube_item&quot;>
        <!--
        这里是柱形全景中的小元件
        -->
      </div>
    </div>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
  }
    <span class="hljs-selector-class">.scene</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">1170px</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%) <span class="hljs-built_in">translateY</span>(-50%);
      <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">position</span>: absolute;
    }
    <span class="hljs-selector-class">.cube</span> {
      <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span> auto;
    }
    <span class="hljs-selector-class">.cube_bg</span> {
      <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">128px</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span> auto;
    }
    <span class="hljs-selector-class">.cube_bg</span> <span class="hljs-selector-tag">div</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      
      <span class="hljs-comment">/* 这里为圆柱形的每个面都设定了同样的背景图 那么在建造柱形时不再需要手动切图 */</span>
      <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"img/zao/zao.png"</span>);
      
      <span class="hljs-attribute">background-repeat</span>: no-repeat;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"scene"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube_bg"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--
        这里是柱形全景背景贴图
        --&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube_item"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--
        这里是柱形全景中的小元件
        --&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function creCylinder(lenZ,pieceWid,angle,slice){

    /* 
    pieceWid 表示单个柱形块状宽度
    angle表示柱形内角
    slice表示有多少个面拼接 
    slice越多，拼合的面越接近曲面
    */
    
  var l = pieceWid*slice; // 画布全长
  var ag = angle/slice // 旋转角度

  var html = '';

  /*
    设置每个面的旋转角度和位移 因为要分割成多个面，所以应该为每个面的背景图设置不同的`background-position`
    */

  for(var i=0,len=slice;i<len;i++){
    html+='<div style=&quot;transform: rotateY(-'+ag*i+'deg) '+
          'translateZ('+lenZ+'px);'+
          'width:'+(pieceWid)+'px;'+
          'background-position: -'+(i*pieceWid)+'px 0;'+
          'background-size: '+(l)+'px 100%;&quot;></div>';
  }

    return html;
}

function renderPano(pieceWid,angle,slice){

    var vw = $(window).width();

    var RADIAN = 0.017453293; // 弧度制 将角度转成弧度

    var innerAngle = angle/(2*slice); //内角，用来计算translateZ

    // 这里的原理和上文旋转木马链接一致
    var lenZ = -(pieceWid/2)*Math.tan((90-innerAngle)*RADIAN);

    /*  
        因为默认是由画布的最左端开始旋转 所以处于我们面前的是画布的最左端和最右端及其连接处
        要想画布中央显示再我们面前，这里需要给cube_bg加上一定的绕Y旋转角度
    */
    var rotate = ((angle/slice)*(slice-1))/2,
        perspective = -lenZ-5;

    var cube_bg = $('.cube_bg'),
        scene = $('.scene');

    var cylinder = creCylinder(lenZ,pieceWid,angle,slice);

    cube_bg.html(cylinder).css('transform','rotateY('+rotate+'deg)');
    scence.css('-webkit-perspective',perspective+'px');
    
    //最后调用一下
    renderPano(128,360,20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creCylinder</span>(<span class="hljs-params">lenZ,pieceWid,angle,slice</span>)</span>{

    <span class="hljs-comment">/* 
    pieceWid 表示单个柱形块状宽度
    angle表示柱形内角
    slice表示有多少个面拼接 
    slice越多，拼合的面越接近曲面
    */</span>
    
  <span class="hljs-keyword">var</span> l = pieceWid*slice; <span class="hljs-comment">// 画布全长</span>
  <span class="hljs-keyword">var</span> ag = angle/slice <span class="hljs-comment">// 旋转角度</span>

  <span class="hljs-keyword">var</span> html = <span class="hljs-string">''</span>;

  <span class="hljs-comment">/*
    设置每个面的旋转角度和位移 因为要分割成多个面，所以应该为每个面的背景图设置不同的`background-position`
    */</span>

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=slice;i&lt;len;i++){
    html+=<span class="hljs-string">'&lt;div style="transform: rotateY(-'</span>+ag*i+<span class="hljs-string">'deg) '</span>+
          <span class="hljs-string">'translateZ('</span>+lenZ+<span class="hljs-string">'px);'</span>+
          <span class="hljs-string">'width:'</span>+(pieceWid)+<span class="hljs-string">'px;'</span>+
          <span class="hljs-string">'background-position: -'</span>+(i*pieceWid)+<span class="hljs-string">'px 0;'</span>+
          <span class="hljs-string">'background-size: '</span>+(l)+<span class="hljs-string">'px 100%;"&gt;&lt;/div&gt;'</span>;
  }

    <span class="hljs-keyword">return</span> html;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderPano</span>(<span class="hljs-params">pieceWid,angle,slice</span>)</span>{

    <span class="hljs-keyword">var</span> vw = $(<span class="hljs-built_in">window</span>).width();

    <span class="hljs-keyword">var</span> RADIAN = <span class="hljs-number">0.017453293</span>; <span class="hljs-comment">// 弧度制 将角度转成弧度</span>

    <span class="hljs-keyword">var</span> innerAngle = angle/(<span class="hljs-number">2</span>*slice); <span class="hljs-comment">//内角，用来计算translateZ</span>

    <span class="hljs-comment">// 这里的原理和上文旋转木马链接一致</span>
    <span class="hljs-keyword">var</span> lenZ = -(pieceWid/<span class="hljs-number">2</span>)*<span class="hljs-built_in">Math</span>.tan((<span class="hljs-number">90</span>-innerAngle)*RADIAN);

    <span class="hljs-comment">/*  
        因为默认是由画布的最左端开始旋转 所以处于我们面前的是画布的最左端和最右端及其连接处
        要想画布中央显示再我们面前，这里需要给cube_bg加上一定的绕Y旋转角度
    */</span>
    <span class="hljs-keyword">var</span> rotate = ((angle/slice)*(slice<span class="hljs-number">-1</span>))/<span class="hljs-number">2</span>,
        perspective = -lenZ<span class="hljs-number">-5</span>;

    <span class="hljs-keyword">var</span> cube_bg = $(<span class="hljs-string">'.cube_bg'</span>),
        scene = $(<span class="hljs-string">'.scene'</span>);

    <span class="hljs-keyword">var</span> cylinder = creCylinder(lenZ,pieceWid,angle,slice);

    cube_bg.html(cylinder).css(<span class="hljs-string">'transform'</span>,<span class="hljs-string">'rotateY('</span>+rotate+<span class="hljs-string">'deg)'</span>);
    scence.css(<span class="hljs-string">'-webkit-perspective'</span>,perspective+<span class="hljs-string">'px'</span>);
    
    <span class="hljs-comment">//最后调用一下</span>
    renderPano(<span class="hljs-number">128</span>,<span class="hljs-number">360</span>,<span class="hljs-number">20</span>);</code></pre>
<p>这里解释一下perspective为什么要设成 <code>-lenZ-5</code><br>看一张图，上面的<code>lenZ</code>即<code>translateZ</code>值，为负值。<br>perspective为镜头到屏幕的距离，因为此时镜头在柱体内部，因此不能看到柱体后面的图像。<br>当perspective值为-lenZ值时，正好柱体back面能与镜头在同一平面上，为了避免它有一定的机率遮挡镜头，我们可以将镜头拉近一些。便设成了<code>-lenZ-5</code>。这个时候就能保证镜头处于柱体内部，同时也能更广角度地观察到柱体全景。</p>
<p><span class="img-wrap"><img data-src="/img/bVAgcM?w=346&amp;h=342" src="https://static.alili.tech/img/bVAgcM?w=346&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>大家可以复制代码体验一下。这里的背景图我选用的是自己拼合成的造物节背景图。</p>
<h3 id="articleHeader4">优劣势对比</h3>
<p>相信大家也有体会，天空盒制造起来会相对的简单，并且天空和地面都能被考虑进去。但是由于面面间的贴合角度太大，若物体正好处于相互贴合的两个面，会给人一种被拦腰折断的感觉。而柱形图对这种情况有了比较好的解决，但是天空和地面的贴图就比较困难了，一般情况下只能通过给scene添加背景图片模拟。</p>
<p>未完待续…</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5打造3d场景不完全攻略（二）: Amazing CSS3D

## 原文链接
[https://segmentfault.com/a/1190000007262754](https://segmentfault.com/a/1190000007262754)

