---
title: 'CSS3 border-image 彻底明白' 
date: 2019-01-02 2:30:09
hidden: true
slug: gtah5reudx
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong> border-image用于给border（边框）贴上背景图像</strong></h2>
<blockquote>
<p>类似于CSS中的background（背景）属性。 例如：background:url(xx.jpg) 27px no-repeat;指的是图片(url(xx.jpg))，位置(27px)，重复性(no-repeat)。</p>
<p>border-image与此类似，border-image包括图片，剪裁位置（与background位置一样，也是数值，也支持百分值），重复性。<br>例如：border-image:url(border.png) 27 repeat; 指的就是图片(url(border.png))，剪裁位置(27)，重复方式(repeat)。<br><span class="img-wrap"><img data-src="/img/bVUgue?w=392&amp;h=166" src="https://static.alili.tech/img/bVUgue?w=392&amp;h=166" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="下面我们将border-image的复合写法分解描述，

border-image的主要参数就是上面提到的三个：图片，剪裁位置，重复性。
其实还有另外两个，文章最后面再讲。更好理解
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>下面我们将<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>的复合写法分解描述，

<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>的主要参数就是上面提到的三个：图片，剪裁位置，重复性。
其实还有另外两个，文章最后面再讲。更好理解
</code></pre>
<h2 id="articleHeader1">1、图片(border-image-source)</h2>
<ul><li>border-image的背景图使用url()调用，图片可以是相对路径或是绝对路径，也可以不使用图片，即border-image:none;</li></ul>
<h2 id="articleHeader2">2、图片剪裁位置(border-image-slice)</h2>
<ul><li>没有单位，默认单位就是像素(px)。例如：border-image:url(border.png) 27 repeat;这里的27专指27px。</li></ul>
<hr>
<ul><li>支持百分比值，百分比值大小是相对于边框图片的大小，假设边框图片大小为400px*300px，则20%的实际效果就是剪裁了图片的60px 80px 60px 80px的四边大小。</li></ul>
<hr>
<ul><li>剪裁特性。类似于CSS中的clip属性。其有1~4个参数，代表上右下左四个方位的剪裁，符合CSS普遍的方位规则（与margin，padding等或border-width一致），举个简单的例子，前面提到，支持百分比宽度，所以这里“30% 35% 40% 30%”的示意可以用下图表示：<br><span class="img-wrap"><img data-src="/img/bVUaSf?w=180&amp;h=191" src="https://static.alili.tech/img/bVUaSf?w=180&amp;h=191" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>
</li></ul>
<p><em>距离图片上部30%的地方，距离右边35%，距离底部40%，左边30%的地方各剪裁一下。也就是对图片进行了“四刀切”，形成了九个分离的区域，这就是九宫格，这是下面深入讲解border-image的基础。</em></p>
<h2 id="articleHeader3">3、重复性(border-image-repeat)</h2>
<p>取值为repeat（重复）只是其中之一，其余两个是round（平铺）和stretch（拉伸）。其中，stretch是默认值。</p>
<p>参数0~2个，0则使用默认值 – stretch，例如：border-image:url(border.png) 30% 40%;就等同于border-image:url(border.png) 30% 40% stretch stretch;；1则表示水平方向及垂直方向均使用此参数；2个参数的话则第一个参数表水平方向，第二个参数表示垂直方向。例如：border-image:url(border.png) 30% 40% round repeat;表示水平方向round（平铺），垂直方向repeat（重复）。</p>
<p>关于round 和repeat 的区别。<br><strong> round会凑整填充（进行了适度的拉伸）。repeat不进行拉伸，不凑整。</strong> 具体效果看文章后边的例子。</p>
<h2 id="articleHeader4">4、实际渲染规则</h2>
<p>通过裁切属性值，将边框背景图切出了“九宫格”的模型，那这张背景图怎么对应地贴在div的边框上呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVUbpI?w=81&amp;h=81" src="https://static.alili.tech/img/bVUbpI?w=81&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>  &lt;————————&gt; <span class="img-wrap"><img data-src="/img/bVUbqb?w=81&amp;h=81" src="https://static.alili.tech/img/bVUbqb?w=81&amp;h=81" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVUbyB?w=337&amp;h=338" src="https://static.alili.tech/img/bVUbyB?w=337&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul>
<li><strong>如图 在border-image中的橙红色的四个边角只会呆在border的四个角,并且水平和垂直方向均被拉伸来填充border的四个角。 </strong></li>
<li>如图 上下区域即border-top-image和border-bottom-image受到第一个参数——水平方向效果影响：如果为repeat，则此区域被水平重复(round水平平铺，stretch水平拉伸)来填充对应的上下border<strong>【该区域在垂直方向上首先会按所对应的border-image-width的值等比缩放，然后再按参数设置在边框水平方向上进行重复或平铺或拉伸】</strong>
</li>
<li>左右区域border-left-image和border-right-image 的作用效果亦然<strong>【该区域在水平方向上首先会按所对应的border-image-width的值等比缩放，然后再按参数设置在边框垂直方向上进行重复或平铺或拉伸】</strong>
</li>
</ul>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVUm4X?w=800&amp;h=382" src="https://static.alili.tech/img/bVUm4X?w=800&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<hr>
<p>我们用下图<strong>(27×3)px *(27×3)px</strong>png 做实验，我给不同部位加了一个序号做标志，便于观察。<br><span class="img-wrap"><img data-src="/img/bVUbhS?w=81&amp;h=81" src="https://static.alili.tech/img/bVUbhS?w=81&amp;h=81" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 加一个蓝色背景的父级，便于我们分析效果。
    .border_image {
        width: 400px;
        height: 115px;
        border: 3em double orange;
        -webkit-border-image: url(border.png) 27 round;
        border-image: url(border.png) 27 round;
    }
    .box {
        background: blue;
    }

    <div class=&quot;box&quot;>
        <div class=&quot;border_image&quot;></div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    // 加一个蓝色背景的父级，便于我们分析效果。
    .border_image {
        <span class="hljs-built_in">width</span>: 400px;
        <span class="hljs-built_in">height</span>: 115px;
        <span class="hljs-built_in">border</span>: 3em double orange;
        -webkit-<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> <span class="hljs-built_in">round</span>;
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> <span class="hljs-built_in">round</span>;
    }
    .<span class="hljs-built_in">box</span> {
        <span class="hljs-built_in">background</span>: blue;
    }

    &lt;div class=<span class="hljs-string">"box"</span>&gt;
        &lt;div class=<span class="hljs-string">"border_image"</span>&gt;&lt;/div&gt;
    &lt;/div&gt;</code></pre>
<p>效果如下<br><span class="img-wrap"><img data-src="/img/bVUbm2?w=655&amp;h=275" src="https://static.alili.tech/img/bVUbm2?w=655&amp;h=275" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //去掉重复属性，即默认都为stretch
   border-image: url(border.png) 27;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>   <span class="hljs-comment">//去掉重复属性，即默认都为stretch</span>
   <span class="hljs-attribute">border-image</span>: url(<span class="hljs-string">border.png</span>) <span class="hljs-number">27</span>;
</code></pre>
<p>效果如下<br><span class="img-wrap"><img data-src="/img/bVUbni?w=720&amp;h=262" src="https://static.alili.tech/img/bVUbni?w=720&amp;h=262" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //使用repeat
  border-image: url(border.png) 27 repeat;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">//使用repeat</span>
  <span class="hljs-attribute">border-image</span>: url(<span class="hljs-string">border.png</span>) <span class="hljs-number">27</span> repeat;</code></pre>
<p>效果如下<br><span class="img-wrap"><img data-src="/img/bVUbnK?w=541&amp;h=246" src="https://static.alili.tech/img/bVUbnK?w=541&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //边框宽度改变
    border-image: url(border.png) 27 repeat stretch;
    border-width: 3rem 1rem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    //边框宽度改变
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> repeat stretch;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>: 3<span class="hljs-built_in">rem</span> 1<span class="hljs-built_in">rem</span>;</code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVUbMp?w=506&amp;h=254" src="https://static.alili.tech/img/bVUbMp?w=506&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<hr>
<h2 id="articleHeader5">5、(边框背景宽度)border-image-width</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这个属性默认是边框的宽度，用来限制相应区域背景图的范围，
首先相应背景区域的图像会根据这个属性值进行缩放。然后再重复或平铺或拉伸。

在复合写法中应该位于 slice属性 和repeat属性中间 用“/”间隔
如：border-image:url(border.png) 27 / 6rem / repeat;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>这个属性默认是边框的宽度，用来限制相应区域背景图的范围，
首先相应背景区域的图像会根据这个属性值进行缩放。然后再重复或平铺或拉伸。

在复合写法中应该位于 slice属性 和repeat属性中间 用“/”间隔
如：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>:url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> / 6<span class="hljs-built_in">rem</span> / repeat;
</code></pre>
<p>语法：border-image-width: [ &lt;length&gt; | &lt;percentage&gt; | &lt;number&gt; | auto ]{1,4}</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="length 带 px, em, in … 单位的尺寸值
percentage 百分比
number 不带单位的数字；它表示 border-width 的倍数
auto 使用 auto， border-image-width 将会使用 border-image-slice 的值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">length</span> 带 px, em, <span class="hljs-keyword">in</span> … 单位的尺寸值
percentage 百分比
number 不带单位的数字；它表示 <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span> 的倍数
auto 使用 auto， <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span> 将会使用 <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-slice 的值
</code></pre></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    border: 3em double orange;
    border-image: url(border.png) 27 round;
    border-image-width: 6rem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">border</span>: 3em double orange;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> <span class="hljs-built_in">round</span>;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span>: 6<span class="hljs-built_in">rem</span>;</code></pre>
<p>效果如下<br>（白框为border）<br><span class="img-wrap"><img data-src="/img/bVUetX?w=682&amp;h=260" src="https://static.alili.tech/img/bVUetX?w=682&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    border-image-width: 1.5rem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span>;</code></pre>
<p>效果如下<br>（白框为border）<br><span class="img-wrap"><img data-src="/img/bVUeuW?w=659&amp;h=255" src="https://static.alili.tech/img/bVUeuW?w=659&amp;h=255" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    border: 3em double orange;
    border-image: url(border.png) 27 round;
    border-image-width: 6rem 1.5rem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">border</span>: 3em double orange;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> <span class="hljs-built_in">round</span>;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span>: 6<span class="hljs-built_in">rem</span> <span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span>;</code></pre>
<p>效果如下<br>（白框为border）<br><span class="img-wrap"><img data-src="/img/bVUeCn?w=753&amp;h=281" src="https://static.alili.tech/img/bVUeCn?w=753&amp;h=281" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">6、（边框背景扩散）border-image-outset</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：border-image-outset: [ <length> | <number> ]{1,4}
相当于把原来的贴图位置向外延伸。不能为负值，试一下就知道。

在复合写法中应该位于 border-image-width 后面，用“/”间隔
如：border-image:url(border.png) 27 / 6rem / 1.5rem /repeat;
向外延伸1.5rem再贴图。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>语法：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-outset: [ &lt;<span class="hljs-built_in">length</span>&gt; | &lt;number&gt; ]{<span class="hljs-number">1</span>,<span class="hljs-number">4</span>}
相当于把原来的贴图位置向外延伸。不能为负值，试一下就知道。

在复合写法中应该位于 <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span> 后面，用“/”间隔
如：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>:url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> / 6<span class="hljs-built_in">rem</span> / <span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span> /repeat;
向外延伸<span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span>再贴图。。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    border: 3em double orange;
    border-image: url(border.png) 27 round;
    border-image-width: 1.5rem;
    border-image-outset: 1.5rem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">border</span>: 3em double orange;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-built_in">border</span>.png) <span class="hljs-number">27</span> <span class="hljs-built_in">round</span>;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span>;
    <span class="hljs-built_in">border</span>-<span class="hljs-built_in">image</span>-outset: <span class="hljs-number">1.</span>5<span class="hljs-built_in">rem</span>;</code></pre>
<p>效果如下：<br>（白框为border）<br><span class="img-wrap"><img data-src="/img/bVUewz?w=777&amp;h=325" src="https://static.alili.tech/img/bVUewz?w=777&amp;h=325" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>ps 部分资料来源网络</p>
<p>亲们，看懂没？不懂请留言，帮你解答。。保会。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3 border-image 彻底明白

## 原文链接
[https://segmentfault.com/a/1190000010969367](https://segmentfault.com/a/1190000010969367)

