---
title: '深入理解css之line-height' 
date: 2018-11-29 9:34:56
hidden: true
slug: bpr2m2yxaqp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>行高，顾名思义是一行文字的高度，而从规范上来说则是两行文字基线之间的距离。行高是作用在每一个行框盒子(line-box)上的，而行框盒子则是由内联盒子组成，因此，行高与内联元素可以说是非常紧密，行高直接决定了内联元素的高度（注意：这里的内联元素不包括替换元素）；对于块级元素和替换元素，行高是无法决定最终高度的，只能决定行框盒子的最小高度。</p>
<h3 id="articleHeader1">x、x-height以及ex</h3>
<p>字母x在css里面扮演着一个很重要的角色，因为字母x的下边缘就是基线所在的位置。而x-height指的就是字母x的高度，ex是一个尺寸单位，其大小是相对字母x的来计算的，即1ex就表示1个字母x的高度。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaPLE?w=604&amp;h=180" src="https://static.alili.tech/img/bVbaPLE?w=604&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们在平时的开发中很少用到ex，因为ex是个相对单位。对于相对的东西，我们总是感觉很难控制，但这并不表明ex就一点用处都没有。我们可以利用ex就是一个x-height的特性来实现图标与文字的垂直居中，这样如论字体大小如何变化，都不会影响垂直居中的效果。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(down.png) no-repeat center;
    background-size: contain;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.icon-arrow</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1ex</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(down.png) no-repeat center;
    <span class="hljs-attribute">background-size</span>: contain;
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <span>我是一段文本</span>
    <i class=&quot;icon-arrow&quot;></i>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>我是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-arrow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaPLF?w=246&amp;h=58" src="https://static.alili.tech/img/bVbaPLF?w=246&amp;h=58" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">line-height的属性值</h3>
<ul>
<li>normal</li>
<li>数字</li>
<li>长度</li>
<li>百分比</li>
</ul>
<h4>normal</h4>
<p>normal为line-height的默认值，但并不是一个固定的值，而是会受font-family的影响，对于“微软雅黑”，其值为1.32；而对于“宋体”，其值为1.141。由于不同操作系统，不同浏览器所使用的字体不一样，所以最终line-height的具体值会不一样，因此这个属性作用不大。</p>
<h4>数字</h4>
<p>我们可以设置line-height: 1.5。其意思是说line-height的最终大小为 1.5* font-size，一般建议使用该值来设置line-height。</p>
<h4>长度</h4>
<p>长度用的最多的就是px与em，em跟数字一样，都是相对于font-size来计算的。</p>
<h4>百分比</h4>
<p>百分比也是相对于font-size来计算的。</p>
<p>相信细心的小伙伴已经发现了，数字，em以及百分比都是相对于font-size来计算的，既然这样，为什么还要多此一举设置另外两个属性呢。原因就在于它们的继承方式是不一样的。对于数字，父元素设置了1.5，则子元素也是会继承1.5。但如果父元素设置的是1.5em，假设父元素font-size是20px，则父元素line-height是30px，同时子元素的line-height也是30px，也就是说子元素继承的是父元素计算后的line-height值。因此，这也是为什么上面推荐使用数字而不是em或百分比的原因了。</p>
<h3 id="articleHeader3">行距与半行距</h3>
<p>很多开发人员开还原设计图的时候，往往没有考虑到行距的影响，因此开发出来的页面很多时候都与设计图不符合，总会差那么几个像素。那么什么是行距呢，我们可以想象一下在文字排版的时候，如果行与行之间的间距为0，则文字是会紧紧贴在一起的，因此，行距就是用来协助排版的。行距的计算为：line-height - em-box，em-box指的是1em的大小，因此行距可以表示为：line-height - font-size，假设line-height为1.5，font-size为20，则行距为：<br>1.5*20 - 20 = 10，则最终行距为10，而这个行距会平均作用于文字的上边和下边。但em-box我们是无法感知这个盒子在哪的，而内容区域我们则可以理解为我们选中文字后的背景色所在区域，而当字体是宋体的时候，内容区域和em-box是等高的，因此我们可以利用此揪出ex-box的藏身之处。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaPLG?w=752&amp;h=376" src="https://static.alili.tech/img/bVbaPLG?w=752&amp;h=376" alt="![ex](/images/posts/css/line-height/line-space.png){:width=&quot;350px&quot;}" title="![ex](/images/posts/css/line-height/line-space.png){:width=&quot;350px&quot;}" style="cursor: pointer; display: inline;"></span></p>
<p>正是因为行距的存在，我们给元素设置margin值时，要减去相应的半行距值，这样才能比较精确地还原设计图。</p>
<h3 id="articleHeader4">line-height的应用</h3>
<p>大部分时候，我们设置line-height，都是为了垂直居中对齐。但这里的居中，只能说是近似居中，从上面的图可以看出：行距是上下均分的，但是内容区域不是，一般来说，文字都是偏下的。我们平时设置字体一般都是12-20像素，这么小的像素值，给出line-height值后，由于上下相差不大，因此感觉上是垂直居中的。line-height除了可以作为单行文本的居中对齐外，多行文本也是可以的，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.box {
    width: 400px;
    line-height: 400px;
    padding: 0 10px;
    border: 1px solid #ccc;

}
.text {
    display: inline-block;
    line-height: 1.3;
    font-size: 14px;
    vertical-align: middle;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;

}
<span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.3</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<p class=&quot;box&quot;>
    <span class=&quot;text&quot;>这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字</span>
</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字，这是一段很长很长的文字<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaPLH?w=870&amp;h=848" src="https://static.alili.tech/img/bVbaPLH?w=870&amp;h=848" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>前面的文章有说过，每一个行框盒子前面都有一个看不见的，规范称之为“strut”的东西。我们给.box设置了line-height为400px，则这个“strut”的line-height也会继承为400px。然后我们给.text设置inline-block，这样我们就可以重置.box设置的line-height，又因为ineline-block保持了内联特性，因此我们可以设置vertical-align以及产生“strut”，从而实现近似垂直居中对齐。</p>
<h3 id="articleHeader5">总结</h3>
<ul>
<li>介绍了字母x在css中的地位以及ex的应用</li>
<li>line-height各种不同的属性值以及数字、em和百分比的不同之处</li>
<li>行距在line-height的作用</li>
<li>line-height实现单行垂直居中和多行垂直居中</li>
</ul>
<p>参考：<br>《css世界》<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height" rel="nofollow noreferrer" target="_blank"></a><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解css之line-height

## 原文链接
[https://segmentfault.com/a/1190000014936270](https://segmentfault.com/a/1190000014936270)

