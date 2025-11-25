---
title: 'vertical-align和baseline的关系' 
date: 2018-12-18 2:30:11
hidden: true
slug: rckkb34wo9
categories: [reprint]
---

{{< raw >}}

                    
<p>如何让一段文字居中，在人类看来如此简单的问题，在css界却变成了多年令人头疼的问题，关于居中的文字如汗牛充栋，但每到用时还是会有问题。单单一个『中』是什么，在<code>css</code>里就有两种不同的称呼：<code>center</code>和<code>middle</code>，水平居中要用<code>center</code>，垂直居中要用<code>middle</code>（到了<code>css3</code>时代引入了更多混乱，flex布局里垂直居中也可以用<code>center</code>了）。</p>
<p>水平居中相对简单，而垂直居中的问题如果没有透彻理解的话，即使这一次做出来了，下一次情况稍加不同，又变得无所适从。</p>
<p>关于垂直居中，<code>css</code>中最基本的一个属性就是<code>vertical-align</code>，要了解<code>vertical-align</code>，首先要了解<code>基线</code>(<code>baseline</code>)，因为<code>vertical-align</code>的缺省值就是<code>baseline</code>。<a href="http://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp" rel="nofollow noreferrer" target="_blank">MDN的文档</a>中只说了一句：<code>baseline: 默认。元素放置在父元素的基线上</code>。</p>
<p>那么这个<code>父元素的基线</code>到底是个什么鬼？怎么才能决定父元素的基线在哪里呢？</p>
<p>先来看一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li class=&quot;container&quot;>
    <div class=&quot;aaa&quot;>
      aaa<br>bbb<br>ccc<br>ddd<br>eee<br>fff
    </div>
    <img src=&quot;https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png&quot;>
  </li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"aaa"</span>&gt;</span>
      aaa<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>bbb<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>ccc<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>ddd<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>eee<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>fff
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>相关<code>css</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  border: 1px solid green;
}
.container img {
  width: 300px;
  border: 1px solid red;
  vertical-align: baseline;
}
.aaa {
  display: inline-block;
  border: 1px solid red;
  vertical-align: baseline;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid green;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">vertical-align</span>: baseline;
}
<span class="hljs-selector-class">.aaa</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">vertical-align</span>: baseline;
}
</code></pre>
<p>为了清楚起见，我们给每一个元素都加上边框，并且写明<code>vertical-align: baseline</code>，然后我们来看一看效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV1SBj?w=764&amp;h=324" src="https://static.alili.tech/img/bV1SBj?w=764&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>注意最左侧那个黑点，我们特意要留着它。在这里，可以很清楚地看到，当我们指定<code>vertical-align</code>为<code>baseline</code>的时候，文字是贴着底边的，但图片并没有贴底，而是位于最下面一行文字的中间。也就是说，对于图片来说，所谓的『父元素的基线』其实指的是<strong>最下面一行文字的中间</strong>。</p>
<p>这是文字多的情况，那么文字少的情况呢？也是一样，图片的底边始终等于我们最下面一行文字的中间：</p>
<p><span class="img-wrap"><img data-src="/img/bV1SCQ?w=770&amp;h=264" src="https://static.alili.tech/img/bV1SCQ?w=770&amp;h=264" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在我们只改动一行代码，让<code>img</code>的<code>vertical-align</code>等于<code>middle</code>，这时候，诡异的情况发生了：</p>
<p><span class="img-wrap"><img data-src="/img/bV1SFk?w=768&amp;h=266" src="https://static.alili.tech/img/bV1SFk?w=768&amp;h=266" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>因为我们最左侧的文字部分的<code>vertical-align</code>还是<code>baseline</code>，而只有右边的<code>img</code>的<code>vertical-align</code>改成了<code>middle</code>，所以整个父元素的基线向上漂移了，现在文字部分依然对齐向上漂的父元素的基线，而图片是以自己的中线对齐父元素的基线，这就是<code>middle</code>的作用。</p>
<p>那如果我们倒过来看一下，图片依然<code>vertical-align: baseline</code>，而文字<code>vertical-align: middle</code>呢？</p>
<p><span class="img-wrap"><img data-src="/img/bV1SGW?w=754&amp;h=276" src="https://static.alili.tech/img/bV1SGW?w=754&amp;h=276" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>不出所料，父元素的基线向上漂移，文字元素以自己的中间对齐父元素的基线，而图片以自己的下边缘对齐父元素的基线。</p>
<p>最后，我们把文字和图片的<code>vertical-align</code>都设置为<code>middle</code>：</p>
<p><span class="img-wrap"><img data-src="/img/bV1SI6?w=758&amp;h=252" src="https://static.alili.tech/img/bV1SI6?w=758&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>一般来讲，这个才是我们真正想要的结果。</p>
<p>所以结论是说，如果我们想要在父级元素里对两个或更多行内元素做垂直居中的话，是需要分别给所有元素设置<code>vertical-align: middle</code>的，因为这个属性不能继承，所以在<code>container</code>上设置没有用，需要给每个子元素设置。</p>
<p>感兴趣的同学可以来我的<a href="https://codepen.io/fengerzh/pen/LedqgB" rel="nofollow noreferrer" target="_blank">Codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="fengerzh/pen/LedqgB" data-typeid="3">点击预览</button>里玩一玩，看看是不是这么回事。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vertical-align和baseline的关系

## 原文链接
[https://segmentfault.com/a/1190000012803061](https://segmentfault.com/a/1190000012803061)

