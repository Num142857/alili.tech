---
title: '如何用CSS3画出懂你的3D魔方？' 
date: 2019-02-14 2:30:37
hidden: true
slug: 8w6loa8m1f3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbisvY?w=1008&amp;h=298" src="https://static.alili.tech/img/bVbisvY?w=1008&amp;h=298" alt="每周动画一点点——CSS3画出懂你的3D魔方" title="每周动画一点点——CSS3画出懂你的3D魔方" style="cursor: pointer; display: inline;"></span></p>
<blockquote>作者：<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">首席填坑官∙苏南</a><br>公众号：<code>honeyBadger8</code>，群：912594095，本文原创，著作权归作者所有，转载请注明原链接及出处。</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>　　最近在写《<a href="https://honeybadger8.github.io/blog/#/frontends/series/animation-sequence" rel="nofollow noreferrer" target="_blank">每周动画点点系列</a>》文章，上一期分享了<a href="https://segmentfault.com/a/1190000016732240">&lt; 手把手教你如何绘制一辆会跑车 &gt;</a>，本期给大家带来是结合CSS3画出来的一个<code>立体3d魔方</code>，结合了<code>js</code>让你随心所欲想怎么转，就怎么转，这里是 <a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">@IT·平头哥联盟</a>，我是<code>首席填坑官</code>∙<a href="https://github.com/meibin08" rel="nofollow noreferrer" target="_blank">苏南</a>(South·Su)，我们先来看看效果，然后再分解它的实现过程吧</p>
<p><span class="img-wrap"><img data-src="/img/bVbiswr?w=360&amp;h=240" src="https://static.alili.tech/img/bVbiswr?w=360&amp;h=240" alt="每周动画一点点之CSS3画出懂你的3D魔方,由@IT·平头哥联盟-首席填坑官∙苏南分享" title="每周动画一点点之CSS3画出懂你的3D魔方,由@IT·平头哥联盟-首席填坑官∙苏南分享" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">绘制过程：</h2>
<p>　　好吧，gif图看着好像有点不是很清晰，想在线预览的同学，可点击<a href="https://codepen.io/meibin08/pen/MPXZXp" rel="nofollow noreferrer" target="_blank">在线预览 👈</a><button class="btn btn-xs btn-default ml10 preview" data-url="meibin08/pen/MPXZXp" data-typeid="3">点击预览</button>，废话不多扯了，先来分析一下，看如何实现这个功能吧。</p>
<h5>∙ API预热 ：</h5>
<ul><li>本次示例是一个立体的正方形，既然有立体效果，肯定少不了CSS3中的 <code>-webkit-perspective</code>-透视、<code>preserve-3d</code>-三维空间，这个两个是重点哦，当然还有<code>transform-origin</code>、<code>transition</code>、<code>transform</code>等，先来回故一下 <strong>API</strong> 怎么是讲的吧：</li></ul>
<blockquote>
<p>perspective <strong>取值</strong> :</p>
<ul>
<li>
<strong>none</strong> ：不指定透视 ;</li>
<li>
<strong>length</strong> ：指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生<code>透视效果</code>。「z&gt;0」的三维元素比正常大，而「z&lt;0」时则比正常小，大小程度由该属性的值决定，不允许负值。</li>
</ul>
<p>transform-style <strong>取值</strong> ：</p>
<ul>
<li>
<strong>flat</strong> ：指定子元素位于此元素所在平面内;</li>
<li>
<strong>preserve-3d</strong> ：指定子元素定位在三维空间内,当该属性值为 <code>preserve-3</code>d时，元素将会创建局部堆叠上下文;</li>
<li>
</li>
</ul>
<p><strong>小结</strong> ：决定一个变换元素看起来是处在三维空间还是平面内，需要该元素的父元素上定义 &lt;' transform-style '&gt; 属性，也就是说想某元素有三维效果，需要设定它的父级有 <code>preserve-3d </code>。</p>
<p>transform-origin <strong>取值</strong> ：</p>
<ul>
<li>percentage：用百分比指定坐标值。可以为负值;</li>
<li>length：用长度值指定坐标值。可以为负值;</li>
<li>left：指定原点的横坐标为left;</li>
<li>center①：指定原点的横坐标为center;</li>
<li>right：指定原点的横坐标为right;</li>
<li>top：指定原点的纵坐标为top;</li>
<li>center②：指定原点的纵坐标为center;</li>
<li>bottom：指定原点的纵坐标为bottom;</li>
<li>
</li>
</ul>
<p>transform、transition等，就不介绍了</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* perspective 使用示例：*/
div{
    -webkit-perspective:600px;
    perspective:600px;
}

/*transform-style 使用示例：*/
.preserve{
    transform-style:preserve-3d;
    -webkit-transform-style:preserve-3d;
}

  /*transform-origin 使用示例：*/
.preserve{
    -webkit-transform-origin:50% 50% -100px; or 
    -webkit-transform-origin:bottom; or
    -webkit-transform-origin:top;
    …………
}
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* perspective 使用示例：*/</span>
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">-webkit-perspective</span>:<span class="hljs-number">600px</span>;
    <span class="hljs-attribute">perspective</span>:<span class="hljs-number">600px</span>;
}

<span class="hljs-comment">/*transform-style 使用示例：*/</span>
<span class="hljs-selector-class">.preserve</span>{
    <span class="hljs-attribute">transform-style</span>:preserve-<span class="hljs-number">3</span>d;
    <span class="hljs-attribute">-webkit-transform-style</span>:preserve-<span class="hljs-number">3</span>d;
}

  <span class="hljs-comment">/*transform-origin 使用示例：*/</span>
<span class="hljs-selector-class">.preserve</span>{
    <span class="hljs-attribute">-webkit-transform-origin</span>:<span class="hljs-number">50%</span> <span class="hljs-number">50%</span> -<span class="hljs-number">100px</span>; or 
    <span class="hljs-attribute">-webkit-transform-origin</span>:bottom; or
    <span class="hljs-attribute">-webkit-transform-origin</span>:top;
    …………
}
  
</code></pre>
<h5>∙ 绘制6个面 ：</h5>
<ul>
<li>是的，我没有说错，就是6个面：上、正面、下、背面、左、右，</li>
<li>上面API讲了这么多，来实践试一下吧，写6个div,结构大概是这样的，也是接下来的魔方需要的结构：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div class=&quot;cube&quot;>
    <div class=&quot;cube-inner running&quot;>
        <p class=&quot;single-side s1&quot;><span>最</span></p>
        <p class=&quot;single-side s2&quot;><span>懂</span></p>
        <p class=&quot;single-side s3&quot;><span>你</span></p>
        <p class=&quot;single-side s4&quot;><span>的</span></p>
        <p class=&quot;single-side s5&quot;><span>魔</span></p>
        <p class=&quot;single-side s6&quot;><span>方</span></p>
    </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-inner running"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>最<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>懂<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s3"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>你<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>的<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s5"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>魔<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single-side s6"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>方<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswx?w=2436&amp;h=970" src="https://static.alili.tech/img/bVbiswx?w=2436&amp;h=970" alt="每周动画一点点之 perspective的演示" title="每周动画一点点之 perspective的演示" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiswD?w=592&amp;h=590" src="https://static.alili.tech/img/bVbiswD?w=592&amp;h=590" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南分享" title="本文由@IT·平头哥联盟-首席填坑官∙苏南分享" style="cursor: pointer;"></span></p>
<ul>
<li>！！！发生了什么？？是不是很吃惊？？说好的值越大，透视效果越强的呢？后面明明藏了个妹子，怎么看没有透视出来？</li>
<li>开始我也是跟你一样吃惊的，但瞬间就悟透了，少了<code>rotate</code>,加个它再来看看效果吧：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbiswH?w=360&amp;h=240" src="https://static.alili.tech/img/bVbiswH?w=360&amp;h=240" alt="每周动画一点点之 transform的演示" title="每周动画一点点之 transform的演示" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.cube{
    width:200px;
    height:200px;
    margin:10px auto;
    padding:260px;
    position:relative;
    -webkit-perspective:600px;
    perspective:600px;
    transition: .5s ;

}
.cube-inner{
    width:200px;
    height:200px;
    position:relative;
    -webkit-transform-style:preserve-3d;
    transition:.3s; 
    -webkit-transform-origin:50% 50% -100px;
    transform: rotateX(45deg);
}
.cube:hover{
    /*鼠标经过时，把 perspective 过渡到100 */
    -webkit-perspective:100px;
    perspective:100px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.cube</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> auto;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">260px</span>;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">-webkit-perspective</span>:<span class="hljs-number">600px</span>;
    <span class="hljs-attribute">perspective</span>:<span class="hljs-number">600px</span>;
    <span class="hljs-attribute">transition</span>: .<span class="hljs-number">5s</span> ;

}
<span class="hljs-selector-class">.cube-inner</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">-webkit-transform-style</span>:preserve-<span class="hljs-number">3</span>d;
    <span class="hljs-attribute">transition</span>:.<span class="hljs-number">3s</span>; 
    <span class="hljs-attribute">-webkit-transform-origin</span>:<span class="hljs-number">50%</span> <span class="hljs-number">50%</span> -<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(45deg);
}
<span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-comment">/*鼠标经过时，把 perspective 过渡到100 */</span>
    <span class="hljs-attribute">-webkit-perspective</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">perspective</span>:<span class="hljs-number">100px</span>;
}
</code></pre>
<ul>
<li>既然API有效，那么拉下来我们就画出6个面吧，按：上、正面、下、背面、左、右，这个顺序来设置吧;</li>
<li>首先，我们要指定它们是在三维空间内的<code>preserve-3d</code>，也就是6个面的父级要设置 <code>transform-style</code> 样式;</li>
<li>以上都设置好后，再来看看6个面吧，为了便于区分，给它们每个都设置了不同颜色(用了css3的渐变 <code>radial-gradient</code>)——不想手写的同学<a href="http://www.colorzilla.com/gradient-editor/" rel="nofollow noreferrer" target="_blank">推荐一个网站</a>可在线设置你要的效果，复制样式即可，先来一睹风采,为了便于观察，整体角度旋转了10deg：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbiswI?w=2852&amp;h=920" src="https://static.alili.tech/img/bVbiswI?w=2852&amp;h=920" alt="每周动画一点点之 6个面的元素的演示" title="每周动画一点点之 6个面的元素的演示" style="cursor: pointer; display: inline;"></span></p>
<ul><li>说到渐变，偶然之间发现了一个有意思的东西<code>hue-rotate</code>，它能在你初始的颜色基础上旋转元素的色调及其内容，从而达到不同的效果。<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate" rel="nofollow noreferrer" target="_blank">了解更多</a>
</li></ul>
<blockquote>
<strong>hue-rotate</strong> : The hue-rotate() CSS function rotates the hue of an element and its contents. Its result is a &lt;filter-function&gt;.</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbiswK?w=360&amp;h=240" src="https://static.alili.tech/img/bVbiswK?w=360&amp;h=240" alt="每周动画一点点之hue-rotate" title="每周动画一点点之hue-rotate" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<strong> 上 </strong>  - "<code>最</code>"：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-inner .single-side.s1{
    /*s1顶部*/
    left:0;top:-200px;
    background: radial-gradient(circle, rgba(255,255,255,.88), #00adff);
    background: -webkit-radial-gradient(circle, rgba(255,255,255,.88), #00adff);
    transform-origin:bottom;
    -webkit-transform-origin:bottom;
    transform:rotateX(90deg);
    -webkit-transform:rotateX(90deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-inner</span> <span class="hljs-selector-class">.single-side</span><span class="hljs-selector-class">.s1</span>{
    <span class="hljs-comment">/*s1顶部*/</span>
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:-<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#00adff</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#00adff</span>);
    <span class="hljs-attribute">transform-origin</span>:bottom;
    <span class="hljs-attribute">-webkit-transform-origin</span>:bottom;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateX</span>(90deg);
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">rotateX</span>(90deg);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswM?w=2666&amp;h=812" src="https://static.alili.tech/img/bVbiswM?w=2666&amp;h=812" alt="每周动画一点点之 6个面的元素之上,本文由@IT·平头哥联盟-首席填坑官∙苏南分享" title="每周动画一点点之 6个面的元素之上,本文由@IT·平头哥联盟-首席填坑官∙苏南分享" style="cursor: pointer;"></span></p>
<ul>
<li>
<p><strong> 正面 </strong>  - "<code>懂</code>"：</p>
<ul><li>下面就是默认的，什么都不用设置，所以就不展示了 ;</li></ul>
</li>
<li>
<p><strong> 下面 </strong> - "<code>你</code>"：</p>
<ul><li>即底部，底部的设置，正好跟顶部它是相反的，一个origin 以 bottom为基准为坐标，一个以top为基准为坐标;</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-inner .single-side.s3{
    /*s3底部*/
    left:0;top:200px;
    background: radial-gradient(circle, rgba(255,255,255,.88), #100067);
    background: -webkit-radial-gradient(circle, rgba(255,255,255,.88), #100067);
    transform-origin:top;
    -webkit-transform-origin:top;
    transform:rotateX(-90deg);
    -webkit-transform:rotateX(-90deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-inner</span> <span class="hljs-selector-class">.single-side</span><span class="hljs-selector-class">.s3</span>{
    <span class="hljs-comment">/*s3底部*/</span>
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#100067</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#100067</span>);
    <span class="hljs-attribute">transform-origin</span>:top;
    <span class="hljs-attribute">-webkit-transform-origin</span>:top;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateX</span>(-90deg);
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">rotateX</span>(-90deg);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswN?w=2616&amp;h=788" src="https://static.alili.tech/img/bVbiswN?w=2616&amp;h=788" alt="每周动画一点点之 6个面的元素之底部" title="每周动画一点点之 6个面的元素之底部" style="cursor: pointer;"></span></p>
<ul><li>
<p><strong> 背面 </strong> - "<code>的</code>"：</p>
<ul>
<li>即正面的后边，整体旋转了 135deg，让背面更直观能看到;</li>
<li>translateZ 、rotateX 同时移动，形成透视的关系，让它看起来，在正面面的后面;</li>
<li>下图二，把默认的正面，设置了透明度，可以看出，背面的透视效果;</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-inner .single-side.s4{
    /*s4背部*/
    z-index:2;
    left:0;top:0;
    background: radial-gradient(circle, rgba(255,255,255,.88), #F0C);
    background: -webkit-radial-gradient(circle, rgba(255,255,255,.88), #F0C);
    transform:translateZ(-200px) rotateX(180deg) ; 
    -webkit-transform:translateZ(-200px) rotateX(180deg) ; /*rotateZ(-180deg) 左右旋转的时候，Z轴旋转180°，因为字是倒着的*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-inner</span> <span class="hljs-selector-class">.single-side</span><span class="hljs-selector-class">.s4</span>{
    <span class="hljs-comment">/*s4背部*/</span>
    <span class="hljs-attribute">z-index</span>:<span class="hljs-number">2</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#F0C</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#F0C</span>);
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateZ</span>(-200px) <span class="hljs-built_in">rotateX</span>(180deg) ; 
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">translateZ</span>(-200px) <span class="hljs-built_in">rotateX</span>(180deg) ; <span class="hljs-comment">/*rotateZ(-180deg) 左右旋转的时候，Z轴旋转180°，因为字是倒着的*/</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswQ?w=2742&amp;h=800" src="https://static.alili.tech/img/bVbiswQ?w=2742&amp;h=800" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南分享" title="本文由@IT·平头哥联盟-首席填坑官∙苏南分享" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiswR?w=2670&amp;h=756" src="https://static.alili.tech/img/bVbiswR?w=2670&amp;h=756" alt="每周动画一点点之 6个面的元素之背面" title="每周动画一点点之 6个面的元素之背面" style="cursor: pointer;"></span></p>
<ul><li>
<p><strong> 左侧面 </strong> - "<code>魔</code>"：</p>
<ul><li>origin以right为基准，left负元素的宽度，rotateY轴旋转90deg;</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-inner .single-side.s5{
    /*s5左侧*/
    left:-200px;top:0;
    background: radial-gradient(circle, rgba(255,255,255,.88),rgba(33,33,33,1));
    background: -webkit-radial-gradient(circle, rgba(255,255,255,.88),rgba(33,33,33,1));
    transform-origin:right;
    -webkit-transform-origin:right;
    transform:rotateY(-90deg)
    -webkit-transform:rotateY(-90deg)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-inner</span> <span class="hljs-selector-class">.single-side</span><span class="hljs-selector-class">.s5</span>{
    <span class="hljs-comment">/*s5左侧*/</span>
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">200px</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, rgba(255,255,255,.88),<span class="hljs-built_in">rgba</span>(33,33,33,1));
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-radial-gradient</span>(circle, rgba(255,255,255,.88),<span class="hljs-built_in">rgba</span>(33,33,33,1));
    <span class="hljs-attribute">transform-origin</span>:right;
    <span class="hljs-attribute">-webkit-transform-origin</span>:right;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateY</span>(-90deg)
    -webkit-transform:<span class="hljs-built_in">rotateY</span>(-90deg)
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswV?w=2704&amp;h=720" src="https://static.alili.tech/img/bVbiswV?w=2704&amp;h=720" alt="每周动画一点点之 6个面的元素之左侧面" title="每周动画一点点之 6个面的元素之左侧面" style="cursor: pointer;"></span></p>
<ul><li>
<p><strong> 右侧面 </strong> - "<code>方</code>"：</p>
<ul><li>同理右侧，与左侧正好相反;</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-inner .single-side.s6{
    /*s6右侧*/
    right:-200px;top:0;
    transform-origin:left;
    -webkit-transform-origin:left;
    background: radial-gradient(circle, rgba(255,255,255,.88), #f00);
    background: -webkit-radial-gradient(circle, rgba(255,255,255,.88), #f00);
    transform:rotateY(90deg);
    -webkit-transform:rotateY(90deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-inner</span> <span class="hljs-selector-class">.single-side</span><span class="hljs-selector-class">.s6</span>{
    <span class="hljs-comment">/*s6右侧*/</span>
    <span class="hljs-attribute">right</span>:-<span class="hljs-number">200px</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>:left;
    <span class="hljs-attribute">-webkit-transform-origin</span>:left;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#f00</span>);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-radial-gradient</span>(circle, rgba(255,255,255,.88), <span class="hljs-number">#f00</span>);
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateY</span>(90deg);
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">rotateY</span>(90deg);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiswW?w=2784&amp;h=842" src="https://static.alili.tech/img/bVbiswW?w=2784&amp;h=842" alt="每周动画一点点之 6个面的元素之左侧面" title="每周动画一点点之 6个面的元素之左侧面" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<strong>小结</strong> ： 嗯,以上魔方的6个面的绘制过程，基本已经完成，主要在在于<code>transform-origin</code>、<code>rotate</code>、<code>translate</code>等属性的应用，但为了让它更炫酷一些，我们还要给边角加一些光感。</blockquote>
<h5>∙ 添加高光 ：</h5>
<ul>
<li>细心的宝宝，前面的布局应该已经发现了，每一行布局的<code>p</code>标签里，都多套了一层<code>span</code>，就是为高光光感，埋下的伏笔，一个平面正方形有四个边，after、before只有两，那么肯定要再套一层，当然方法很多，比如直接用border也是可以的，但比较麻烦，我就选择了现在要讲的这种：</li>
<li>after、before设置1px的边框，设置一个线性渐变，中间是白色，两断是过渡到透明的，这样高光就有了，来看一组图吧：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbisw0?w=2800&amp;h=531" src="https://static.alili.tech/img/bVbisw0?w=2800&amp;h=531" alt="每周动画一点点之 6个面的元素高光感" title="每周动画一点点之 6个面的元素高光感" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbisw7?w=360&amp;h=240" src="https://static.alili.tech/img/bVbisw7?w=360&amp;h=240" alt="每周动画一点点之 6个面的元素鼠标经过" title="每周动画一点点之 6个面的元素鼠标经过" style="cursor: pointer;"></span></p>
<h5>∙ CSS 360°旋转 ：</h5>
<ul>
<li>上面是一个鼠标经过的过渡动画，可以看出立体效果是已经有了，接下来就写一个CSS <code>animation</code>的动画，让它360度旋转，每个角都能看到，这样会显的很666;</li>
<li>animation 配合 <code>keyframes</code> 使用，请看代码示例：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube .cube-inner{ 
    /*-webkit-transform:rotateX(180deg) rotateY(0deg) ;*/
    animation: elfCube 10s infinite ease-in-out;
    -webkit-animation: elfCube 10s infinite ease alternate;
}

@keyframes elfCube {
    0% { 
        transform: rotateX(0deg) rotateY(0deg); 
    }
    50% { 
        transform: rotateX(360deg) rotateY(360deg); 
    }
    100% { 
        transform: rotateX(0deg) rotateY(0deg); 
    }
}
@-webkit-keyframes elfCube {
    0% {
     -webkit-transform: rotateX(0deg) rotateY(0deg); 
    }
    50% {
     -webkit-transform: rotateX(360deg) rotateY(360deg); 
    }
    100% { 
        transform: rotateX(0deg) rotateY(0deg); 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.cube-inner</span>{ 
    <span class="hljs-comment">/*-webkit-transform:rotateX(180deg) rotateY(0deg) ;*/</span>
    <span class="hljs-attribute">animation</span>: elfCube <span class="hljs-number">10s</span> infinite ease-in-out;
    <span class="hljs-attribute">-webkit-animation</span>: elfCube <span class="hljs-number">10s</span> infinite ease alternate;
}

@<span class="hljs-keyword">keyframes</span> elfCube {
    0% { 
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(0deg) <span class="hljs-built_in">rotateY</span>(0deg); 
    }
    50% { 
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(360deg) <span class="hljs-built_in">rotateY</span>(360deg); 
    }
    100% { 
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(0deg) <span class="hljs-built_in">rotateY</span>(0deg); 
    }
}
@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> elfCube {
    0% {
     <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateX</span>(0deg) <span class="hljs-built_in">rotateY</span>(0deg); 
    }
    50% {
     <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateX</span>(360deg) <span class="hljs-built_in">rotateY</span>(360deg); 
    }
    100% { 
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(0deg) <span class="hljs-built_in">rotateY</span>(0deg); 
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisw9?w=360&amp;h=240" src="https://static.alili.tech/img/bVbisw9?w=360&amp;h=240" alt="每周动画一点点之 6个面的元素之360度旋转" title="每周动画一点点之 6个面的元素之360度旋转" style="cursor: pointer;"></span></p>
<h5>∙ 跟随鼠标旋转 ：</h5>
<ul>
<li>说好的随着鼠标旋转呢？？</li>
<li>
<p>别慌，接下来就是带你装逼，带你飞的时候，</p>
<ul>
<li>首先我们要了解，鼠标在容器内所在的位置，X = e.pageX - ele.offsetLeft, Y = e.pageY - ele.offsetTop;</li>
<li>同时要知道元素内的中心点：centerX = width/2,centerY =height/2;</li>
<li>然后得出值：axisX = X - centerX，axisY = Y - centerY;</li>
<li>
<strong>PS</strong> ： 开始尝试想的是鼠标从哪个方向进入，得到它的角度，但发现旋转效果不明显 ，有兴趣的同学可以尝试一下：(((Math.atan2(Y, X) * (180 / Math.PI)) + 180) / 90)，参考司徒大神的<a href="https://www.cnblogs.com/rubylouvre/archive/2012/11/06/2757175.html" rel="nofollow noreferrer" target="_blank">JS判断鼠标从什么方向进入一个容器</a>;</li>
<li>最后，给容器绑上事件：<code>mouseover</code>、<code>mousemove</code>、<code>mouseout</code>，鼠标进入时，暂停css的动画，不然会相互打架哦！</li>
</ul>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbisxc?w=360&amp;h=240" src="https://static.alili.tech/img/bVbisxc?w=360&amp;h=240" alt="每周动画一点点之 6个面的元素之360度旋转" title="每周动画一点点之 6个面的元素之360度旋转" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ……
getAxisX(e){
    let left = this.cubeEle.offsetLeft;
    return e.pageX - left - (this.cubeW/2) * (this.cubeW>this.cubeH ? this.cubeH/this.cubeW : 1);
}
getAxisY(e){
    let top = this.cubeEle.offsetTop;
    return e.pageY - top - (this.cubeH/2) * (this.cubeH>this.cubeW ? this.cubeW/this.cubeH : 1);
}
 …………
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> ……
getAxisX(e){
    <span class="hljs-keyword">let</span> left = <span class="hljs-keyword">this</span>.cubeEle.offsetLeft;
    <span class="hljs-keyword">return</span> e.pageX - left - (<span class="hljs-keyword">this</span>.cubeW/<span class="hljs-number">2</span>) * (<span class="hljs-keyword">this</span>.cubeW&gt;<span class="hljs-keyword">this</span>.cubeH ? <span class="hljs-keyword">this</span>.cubeH/<span class="hljs-keyword">this</span>.cubeW : <span class="hljs-number">1</span>);
}
getAxisY(e){
    <span class="hljs-keyword">let</span> top = <span class="hljs-keyword">this</span>.cubeEle.offsetTop;
    <span class="hljs-keyword">return</span> e.pageY - top - (<span class="hljs-keyword">this</span>.cubeH/<span class="hljs-number">2</span>) * (<span class="hljs-keyword">this</span>.cubeH&gt;<span class="hljs-keyword">this</span>.cubeW ? <span class="hljs-keyword">this</span>.cubeW/<span class="hljs-keyword">this</span>.cubeH : <span class="hljs-number">1</span>);
}
 …………
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" …………
run(){
    this.cubeEle.addEventListener('mouseover',(e)=>this.hoverOut(e),false);
    this.cubeEle.addEventListener('mousemove',(e)=>this.move(e),false);
    this.cubeEle.addEventListener('mouseout',(e)=>this.hoverOut(e),false);
}
hoverOut(e){
    //进入/离开
    e.preventDefault();
    this.axisX = this.getAxisX(e),
    this.axisY = this.getAxisY(e);

    if(e.type == 'mouseout'){ //离开
        this.axisX=0;
        this.axisY = 0;
        console.log(&quot;离开&quot;)
        this.cubeInner.className=&quot;cube-inner running&quot;;
    }else{
        this.cubeInner.className=&quot;cube-inner&quot;;
        console.log(&quot;进入&quot;)
    };
    let rotate = `rotateX(${-this.axisY}deg) rotateY(${-this.axisX}deg)`;
    this.cubeInner.style.WebkitTransform = this.cubeInner.style.transform = rotate;
}
 ……" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> …………
run(){
    <span class="hljs-keyword">this</span>.cubeEle.addEventListener(<span class="hljs-string">'mouseover'</span>,(e)=&gt;<span class="hljs-keyword">this</span>.hoverOut(e),<span class="hljs-literal">false</span>);
    <span class="hljs-keyword">this</span>.cubeEle.addEventListener(<span class="hljs-string">'mousemove'</span>,(e)=&gt;<span class="hljs-keyword">this</span>.move(e),<span class="hljs-literal">false</span>);
    <span class="hljs-keyword">this</span>.cubeEle.addEventListener(<span class="hljs-string">'mouseout'</span>,(e)=&gt;<span class="hljs-keyword">this</span>.hoverOut(e),<span class="hljs-literal">false</span>);
}
hoverOut(e){
    <span class="hljs-comment">//进入/离开</span>
    e.preventDefault();
    <span class="hljs-keyword">this</span>.axisX = <span class="hljs-keyword">this</span>.getAxisX(e),
    <span class="hljs-keyword">this</span>.axisY = <span class="hljs-keyword">this</span>.getAxisY(e);

    <span class="hljs-keyword">if</span>(e.type == <span class="hljs-string">'mouseout'</span>){ <span class="hljs-comment">//离开</span>
        <span class="hljs-keyword">this</span>.axisX=<span class="hljs-number">0</span>;
        <span class="hljs-keyword">this</span>.axisY = <span class="hljs-number">0</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"离开"</span>)
        <span class="hljs-keyword">this</span>.cubeInner.className=<span class="hljs-string">"cube-inner running"</span>;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.cubeInner.className=<span class="hljs-string">"cube-inner"</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"进入"</span>)
    };
    <span class="hljs-keyword">let</span> rotate = <span class="hljs-string">`rotateX(<span class="hljs-subst">${-<span class="hljs-keyword">this</span>.axisY}</span>deg) rotateY(<span class="hljs-subst">${-<span class="hljs-keyword">this</span>.axisX}</span>deg)`</span>;
    <span class="hljs-keyword">this</span>.cubeInner.style.WebkitTransform = <span class="hljs-keyword">this</span>.cubeInner.style.transform = rotate;
}
 ……</code></pre>
<h2 id="articleHeader2">结尾：</h2>
<ul>
<li>-webkit-perspective，</li>
<li>-webkit-transform-style，</li>
<li>-webkit-transform-origin，</li>
<li>radial-gradient、linear-gradient，</li>
<li>transform：rotate、translate、scale，</li>
<li>transition，</li>
<li>animation;</li>
<li>以上就是今天为大家带来的分享，以及使用到的知识点API，如文章中有不对之处，烦请各位大神斧正，想学习更多前端知识，记得关注我的<code>公众号</code>哦</li>
<li><a href="https://github.com/honeybadger8/blog-resource" rel="nofollow noreferrer" target="_blank">文章源码获取-&gt; blog-resource 👈</a></li>
<li><a href="https://codepen.io/meibin08/pen/MPXZXp" rel="nofollow noreferrer" target="_blank">想直接在线预览 👈</a><button class="btn btn-xs btn-default ml10 preview" data-url="meibin08/pen/MPXZXp" data-typeid="3">点击预览</button></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbiLDH?w=600&amp;h=336" src="https://static.alili.tech/img/bVbiLDH?w=600&amp;h=336" alt="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮，公众号：honeyBadger8，!本文由@IT·平头哥联盟-首席填坑官∙苏南分享,@IT·平头哥联盟 主要分享前端、测试 等领域的积累，文章来源于(自己/群友)工作中积累的经验、填过的坑，希望能尽绵薄之力 助其他同学少走一些弯路" title="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮，公众号：honeyBadger8，!本文由@IT·平头哥联盟-首席填坑官∙苏南分享,@IT·平头哥联盟 主要分享前端、测试 等领域的积累，文章来源于(自己/群友)工作中积累的经验、填过的坑，希望能尽绵薄之力 助其他同学少走一些弯路" style="cursor: pointer;"></span></p>
<blockquote>作者：苏南 - <a href="https://github.com/meibin08/" rel="nofollow noreferrer" target="_blank">首席填坑官</a><br>交流群：912594095，公众号：<code>honeyBadger8</code><br>本文原创，著作权归作者所有。商业转载请联系<code>@IT·平头哥联盟</code>获得授权，非商业转载请注明原链接及出处。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用CSS3画出懂你的3D魔方？

## 原文链接
[https://segmentfault.com/a/1190000016753587](https://segmentfault.com/a/1190000016753587)

