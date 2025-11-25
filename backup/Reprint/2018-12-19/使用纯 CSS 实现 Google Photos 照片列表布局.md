---
title: '使用纯 CSS 实现 Google Photos 照片列表布局' 
date: 2018-12-19 2:30:07
hidden: true
slug: 70xamv6b0fk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">使用纯 CSS 实现 Google Photos 照片列表布局</h2>
<p>文章太长，因为介绍了如何一步一步进化到最后接近完美的效果的，不想读的同学可以直接跳到最后一个大标题之后看代码、demo 及原理就好，或者也可以直接看下面这个链接的源代码。</p>
<p>不过还是建议顺序读下去，因为后面的原理需要前面的内容做为铺垫，主要是在处理边角问题上。</p>
<p>先看下效果吧，要不然各位可能没动力读下去了，实在是有点长，可以试着 resize 或者 zoom 一下看看效果： <a href="https://xieranmaya.github.io/images/cats/cats.html" rel="nofollow noreferrer" target="_blank">https://xieranmaya.github.io/...</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012691485?w=1928&amp;h=1026" src="https://static.alili.tech/img/remote/1460000012691485?w=1928&amp;h=1026" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>另外后面一些 demo 为了方便展示源代码用了 jsbin，但 jsbin 偶尔抽风会显示不出效果，试着在源代码编辑框里不改变代码意思的情况下编辑一下（比如在最后打一下回车）应该就可以了，或者查看一下你浏览器的翻墙设置，因为里面引入了 Google CDN 上的文件，有可能是因为 js 加载不成功导致的。</p>
<p>好了，正文开始。</p>
<h3 id="articleHeader1">对比三种比较常见图片布局差异</h3>
<p>开始之前，先对比一下三种比较常见的图片布局的差异</p>
<ol>
<li>
<p><a href="http://huaban.com/boards/20002009/" rel="nofollow noreferrer" target="_blank">花瓣</a>：</p>
<ul>
<li>此种布局为比较常见的等宽布局，所有图片的宽度是一样的</li>
<li>由于图片是等比拉伸（<strong>等比拉伸的意思是图片的宽和高变化相同的比例，也就是图片展示的宽高比与原始宽高比一致</strong>），而每张图片的宽度又是一样的，所以图片的高度就必然不一样了</li>
<li>这种布局的缺点是，由于每张图片展示的高度的不一致，图片不是按一般的阅读顺序展示的，因为可能连续的多张图片顶部的高度不一样，而人眼又习惯于水平扫描，所以用户就有可能漏看某些照片</li>
<li>图片瀑布的底部一般是对不齐的</li>
<li>虽然底部很难完全对齐，但使用 JS 对图片顺序进行重排能够让底部尽量对齐，所以此种布局在 reflow 的时候（比如resize，zoom）必然要有 JS 的参与</li>
</ul>
</li>
<li>
<p>Google Photos，<a href="https://500px.com/popular" rel="nofollow noreferrer" target="_blank">500px</a>，图虫等，以 Google Photos 为代表的即不等宽也不等高的图片布局有如下特点：</p>
<ul>
<li>图片也没有被非等比拉伸</li>
<li>每行的图片在水平方向上也占满了屏幕，没有多余的空白</li>
<li>因为以上两个条件，所以每行的图片高度必然会不一样，否则无法做到图片在水平方向上占满屏幕</li>
<li>图片是按顺序展示的，比较符合人眼阅读顺序，Google Photos 因为照片有拍摄时间这个属性，必须满足这个条件</li>
<li>底部是对齐的</li>
<li>Google Photos 的布局中，当某几个日期的照片太少时，多个日期的照片会合并展示在同一行，当然这不是本文讨论的重点</li>
</ul>
</li>
<li>
<p>Instangram</p>
<ul><li>正方形图片布局，就不多说了。。。</li></ul>
</li>
</ol>
<p>以上介绍的前两种布局都有一个共同点，那就是图片没有经过非等比拉伸，也就是说图片里的内容没有变形，也没有被裁剪，只是放大或者缩小，这是目前图片类应用在展示图片上的一个趋势，应该说，很少有专做图片的网站会把照片非等比拉伸显示（变形拉伸真的给人一种杀马特的感觉。。。），最次的也就是把图片等比拉伸后展示在一个正方形的区域里，类似于正方形容器的 background-size: cover; 的效果。</p>
<p>另外，在花瓣的布局中，比较宽的图片展示区域会比较小；而在第二种布局中，则是比较高的图片展示区域会比较小。</p>
<p>但是，在第一种布局中，因为宽度是定死了的，所以<strong>高宽比</strong>小到一定程度的图片，显示区域会非常小。而在第二种布局中，因为不同行的高度是不一样的，如果比较高的图片出现在比较高的行，还是有可能展示的稍大些的。</p>
<p>总体来说，以 Google Photos 为代表的图片布局，在显示效果上更优。关于如何使用 JS 来完成 Google Photos / 500px 布局的算法，这里就不讨论了，读者可以自己思考一下~</p>
<h3 id="articleHeader2">图片布局优劣标准</h3>
<p>下面根据上面的分析稍微总结一下评判图片布局优劣的一些标准：</p>
<ol>
<li>是否能尽量按原始列表中的顺序输出</li>
<li>能否按人眼的扫描顺序输出，即行高相同</li>
<li>图片能否按照原始比例展示，或者尽量按原始比例展示</li>
<li>每张图片的展示面积能否尽量接近，实际上在想完全展示照片的布局中，这一条是很难达成的</li>
<li>图片不被非等比拉伸，内容不变形，内容展示完全</li>
</ol>
<p>第一次看到类似 Google Photos 照片列表的布局已经不记得是在哪里了，当时只是觉得这种布局肯定需要 JS 参与，因为每行图片高度相同的情况下不可能那么恰到好处的在容器两端对齐，且所有图片之间的间距大小也一样(如果间距大小不一样但两端对齐，可以使用 inline 的图片加上 text-justify 来实现，在图片较小的时候(比如搜索引擎的图片结果)也不失为一种选择)，通过观察，发现每行的高度并不相同，就确认了必然需要 JS 参与才能完成那样的布局。</p>
<p>然而当越来越多的开始网站使用这样的布局时，做为一个热衷于能用 CSS 实现就不用 JS 的前端工程师，我就在考虑，能否仅用 CSS 实现这样的布局呢，尤其是不要在 resize 时重新计算布局？</p>
<p>在经过一些尝试后，我发现可在一定程度上用纯 CSS 实现类似的布局，<strong>这里说的一定程度上仅使用 CSS 实现布局，我的意思是，布局一但渲染完成，布局后序的 resize，zoom 都可以在没有 JS 参与的情况下保持稳定，也就是说，首次的渲染甚至可以通过服务器完成，整个过程可以没有 JS 参与，所以说是用纯 CSS 实现也不过分。</strong></p>
<h3 id="articleHeader3">使用 CSS 实现非等高布局</h3>
<p>下面就来介绍一下我是如何只通过 CSS 一步一步实现的这个布局的</p>
<p>一开始，我们将图片设置为相同的高度:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  img {
    height: 200px;
  }
</style>
<div>
   <img src=&quot;&quot; />
   <img src=&quot;&quot; />
   <img src=&quot;&quot; />
   <img src=&quot;&quot; />
   <img src=&quot;&quot; />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这样并不能让图片在水平方向上占满窗口，于是我想到了 flex-grow 这个属性，让 img 元素在水平方向变大占满容器，整个布局也变成了 flex 的了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  display: flex;
  flex-wrap: wrap;
}
img {
  height: 200px;
  flex-grow: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>把 flex container 的 flex-wrap 设置为 wrap，这样一行放不下时会自动折行，每行的图片图片因为 grow 的关系会在水平方向上占满屏幕，效果看上去已经很接近我们想要的了，但每张图片都会有不同程度的非等比拉伸，图片的内容会变形，这个好办，可以用 <code>object-fit: cover;</code> 来解决，但这么一来图片又会被裁剪一部分。</p>
<p>最终 demo: <a href="http://jsbin.com/tisaluy/1/edit?html,css,js,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/1/ed...</a></p>
<p>不过上述的 DOM 结构显然是没办法在实际中使用的:</p>
<ul>
<li>不支持 object-fit 的浏览器下图片会变形，因为图片没有容器，所以也没办法用 background-size 来解决这个问题</li>
<li>用了 object-fit 的浏览器下，图片会被裁剪一部分，这两条前面已经说过</li>
<li>没办法跟图片一起展示一些相关的信息，因为是 img 裸标签</li>
<li>另外就是在真实的网络环境中，图片的加载都是比较比较慢的，如果指望用图片自己来把布局撑开，用户肯定会看到非常多的闪烁，demo 里的闪烁应该已经非常明显了</li>
</ul>
<p>所以我们上面的这个布局事实上是没办法用于任何生产环境的。</p>
<p>接下来我们把 DOM 结构改成下面这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section>
   <div>
      <img src=&quot;&quot;/>
   </div>
   <div>
      <img src=&quot;&quot;/>
   </div>
   <div>
      <img src=&quot;&quot;/>
   </div>
   <div>
      <img src=&quot;&quot;/>
   </div>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>/&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>/&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>/&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>/&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>我们为图片增加了一个容器。依然把图片设置为定高，如此一来，每个 div 将被图片撑大，这时如果我们给 div 设置一个 flex-grow: 1; ，每个 div 将平分每行剩余的空间，div 会变宽，于是图片宽度并没有占满 div，如果我们将 img 的 width 设置为 100% 的话，在 IE 和 FF 下，div 已经 grow 的空间将不会重新分配（<strong>我觉得这是个很有意思的现象，图片先把 div 撑大，div grow 之后又把图片拉大</strong>），但在 Chrome 下，为 img 设置了 width: 100%; 之后，grow 的空间将被重新分配（我并没有深究具体是如何重新分配的），会让每个容器的宽度更加接近，这并不是我们想要的。试了几种样式组合后，我发现把 img 标签的 min-width 和 max-width 都设置为 100% 的话，在 Chrome 下的显示效果就跟 IE 和 FF 一样了。最后我们将 img 的 object-fit 属性设置为 cover，图片就被等比拉伸并占满容器了，不过与前一种布局一样，每行的高度是一样的，另外图片只显示了一部分，上下两边都被裁剪掉了一些。</p>
<p>上面布局完整的 demo: <a href="http://jsbin.com/tisaluy/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/2/ed...</a></p>
<p>在这种布局下，如果图片高度设置的比较小，布局已经没有什么大碍，因为图片越小就意味着每行图片越多而且剩余的空间越小并且剩余空间被更多的图片瓜分，那每个容器的宽高比就越接近图片的真实宽高比，多数图片都能显示出其主要部分。</p>
<p>唯一的问题是最后一行，当最后一行图片太少的时候，比如只有一张，因为 grow 的关系，它将占满一整行，而高度又只有我们设置的 200px，这时图片被展示出来的部分可能是非常少的，更不用说如果图片本身上比较高，而展示区域又非常宽的情况了。</p>
<p>针对这种情况，我们可以让列表最后的几张图片不 grow，这样就不至于出现太大的变形，我们可以算出每行的平均图片数量，然后用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div:nth-last-child(5),
div:nth-last-child(4),
div:nth-last-child(3),
div:nth-last-child(2),
div:nth-last-child(1){
  flex-grow: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(5)</span>,
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(4)</span>,
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(3)</span>,
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(2)</span>,
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(1)</span>{
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>然后配合 media query，在屏幕不同宽度时，让"最后一行"的元素个数在窗口宽度变化时也动态变化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media (max-width: 1000px) and (min-width: 900px) {
  div:nth-last-child(5),
  div:nth-last-child(4),
  div:nth-last-child(3),
  div:nth-last-child(2),
  div:nth-last-child(1){
    flex-grow: 0;
  }
}
@media (max-width: 1100px) and (min-width: 1000px) {
  div:nth-last-child(7),
  div:nth-last-child(6),
  div:nth-last-child(5),
  div:nth-last-child(4),
  div:nth-last-child(3),
  div:nth-last-child(2),
  div:nth-last-child(1){
    flex-grow: 0;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">1000px</span>) and (min-width: <span class="hljs-number">900px</span>) {
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(5)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(4)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(3)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(2)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(1)</span>{
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">0</span>;
  }
}
@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">1100px</span>) and (min-width: <span class="hljs-number">1000px</span>) {
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(7)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(6)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(5)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(4)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(3)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(2)</span>,
  <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(1)</span>{
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">0</span>;
  }
}</code></pre>
<p>上面的代码写起来是相当麻烦的，因为每个屏幕宽度范围内又要写多个 nth-last-child 选择器，虽然我们可以用预处理器来循环迭代出这些代码，但最终生成出来的代码还是有不少重复。</p>
<p>有没有办法只指定最后多少个元素就行了，而不是写若干个 nth-last-child 选择器呢？其实办法也是有的，想必大家应该还记得 CSS 的 <code>~</code> 操作符吧，<code>a ~ b</code> 将选择在 <code>a</code> 后面且跟 <code>a</code> 同辈的所有匹配 <code>b</code> 的元素，于是我们可以这么写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div:nth-last-child(8),
div:nth-last-child(8) ~ div{
  flex-grow: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(8)</span>,
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-last-child(8)</span> ~ <span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>先选中倒数第 8 个元素，然后选中倒数第 8 个元素后面的所有同辈结点，这样，就选中了最后的 8 个元素，进一步，我们可以直接将选择器改写为<code>div:nth-last-child(9) ~ div</code>，就可以只用一个选择器选择最后的 8 个元素了。</p>
<p>上面的几种选择尾部一些元素的不同选择器，实际上效果是不太一样的：</p>
<ul>
<li>
<code>div:nth-last-child</code> 的选择方法能保证倒数的 n 张图片一定被选中</li>
<li>
<code>div:nth-last-child(n), div:nth-last-child(n) ~ div</code> 只能保证当 div 元素至少有 n 个时才能选中最后的 n 个元素，因为如果 <code>:nth-last-child(n)</code> 不存在，这个选择器就无效了</li>
<li>
<code>div:nth-last-child(n+1) ~ div</code> 则需要保证 div 元素至少有 n+1 个时才能选中最后的 n 个元素，原理同上</li>
</ul>
<p>选择最后若干张图片这种方式还是不够完美，因为你无法确定你选择的 flex item 一定在最后一行，万一最后一行只有一张图片呢，这时倒数第二行的前几张图片就会 grow 的很厉害（因为后面几张不 grow），或者最后两行图片的数量都没有这么多张，那倒数第二行就没有元素 grow 了，就占不满这一行了，布局就会错乱。</p>
<p>那么有没有办法只让最后一行的元素不 grow 呢？一开始我也了很多，甚至在想有没有一个 :last-line 伪类什么的（因为有个 :first-line），始终没有找到能让最后一行不 grow 的方法，然而最后竟然在搜索一个其它话题时找到了办法：</p>
<p>那就是在最后一个元素的后面再加一个元素，让其 flex-grow 为一个非常大的值比如说 999999999，这样最后一行的剩余空间就基本全被这一个元素的 grow 占掉了，其它元素相当于没有 grow，更进一步，我们可以用伪元素来做这件事（不过 IE 浏览器的伪元素是不支持 flex 属性的，所以还是得用一个真实的元素做 placeholder）:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section::after {
  content: '';
  flex-grow: 999999999;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">999999999</span>;
}</code></pre>
<p>到这里，我们基本解决这个布局遇到的所有问题。</p>
<p>Demo，resize 或者 zoom 然后观察最后一行的图片：<a href="http://jsbin.com/tisaluy/3/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/3/ed...</a></p>
<p>但还有最后一个问题，同前一种布局一样，如果你在线上去加载使用这种方式布局的网页，你会发现页面闪动非常厉害，因为图片在下载之前是不知道宽高的，我们并不能指望图片加载完成后让它把容器撑大，用户会被闪瞎眼。其实真正被闪瞎的可能是我们自己，毕竟开发时要刷新一万零八百遍。</p>
<p>所以，我们必须预先渲染出图片的展示区域（实际上几乎所有图片类网站都是这么做的），所以这里还是要小用一些 js，这些工作也可以在服务器端做，或者是用任何一个模板引擎(下面的代码使用了 angular 的模板语法)。</p>
<p>这个布局一旦吐出来，后续对页面所有的动作(resize，zoom)都不会使布局错乱，同时也不需要 JS 参与，符合前文所说的用纯 CSS 实现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  section {
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    &amp;::after {
      content: '';
      flex-grow: 999999999;
    }
  }
  div {
    margin: 2px;
    position: relative;
    height: 200px;
    flex-grow: 1;
    background-color: violet;
    img {
      max-width: 100%;
      min-width: 100%;
      height: 200px;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
</style>
<section>
    // 下一行的**表达式**是计算当图片以 200 的高度等比拉伸展示时宽度的值
    <div ng-repeat=&quot;img in imgs&quot; style=&quot;width:"{{"img.width*200/img.height"}}"px;&quot;></div>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  section {
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    &amp;::after {
      content: '';
      flex-grow: 999999999;
    }
  }
  div {
    margin: 2px;
    position: relative;
    height: 200px;
    flex-grow: 1;
    background-color: violet;
    img {
      max-width: 100%;
      min-width: 100%;
      height: 200px;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
    // 下一行的**表达式**是计算当图片以 200 的高度等比拉伸展示时宽度的值
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"img in imgs"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:"{{"img.width*200/img.height"}}"px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>到这里，我们才算实现了图片的非等宽布局。</p>
<p>Demo，注意 html 模板里计算宽度的表达式：<a href="http://jsbin.com/tisaluy/4/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/4/ed...</a></p>
<p>那么这个布局的展示效果究竟如何呢？</p>
<p>实际上我专门写了代码计算每张图片被展示出来的比例到底有多少：在图片高度为 150px 左右时，约有三分之一的图片展示比例在 99% 以上。最差的图片展示比例一般在 70% 左右浮动，平均每张图片展示比例在 90% 以上。图片越矮，展示效果会越好；图片越高，展示效果就越差。</p>
<p>因为这种方案最后也被我抛弃了，所以就不放计算展示比例的 demo 了。</p>
<h4>看到这里，你应该是觉得被坑了，因为这并没有实现标题中说的 Google Photos 照片列表的布局</h4>
<p>因为<strong>每行的高度是一样的</strong>，就必然导致大部分图片没有完全展示，跟 Google Photos / 500px 那些高大上的布局根本就不一样！</p>
<p>可是正文从现在才正式开始，下面介绍的方式也是我在实现了上面的布局后很久才想出来的，前面的内容只是介绍一些解决边角问题用的。</p>
<p>可以看到，前面的实现方式并没有让每张图片的内容全部都显示出来，因为每行的高度是一样的，而想要实现 500px 的布局，每行图片的高度很多时候是不一样的。</p>
<p>一开始我觉得，CSS 也就只能实现到这种程度了吧，直到我遇到了另一个需求:</p>
<p>我想用一个正方形的容器展示内容，并且希望无论浏览器窗口多宽，这些正方形的容器总是能铺满窗口的水平宽度而不留多余的空间(除了元素之间的空白)，乍一看这个需求可能需要 JS 参与：读出当前浏览器窗口的宽度，然后计算正方形容器的 size，然后渲染。</p>
<p>可以看这个 demo，试着拉动一下窗口宽度然后看效果：<br><a href="http://jsbin.com/tomipun/4/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tomipun/4/ed...</a></p>
<p>拉动过程中可以看到，正方形的容器会实时变大，大到一定程度后又变小让每行多出一个正方形容器。 如果只看这一个 demo，可能各位不一定能一下子想到如何实现的，但如果只有一个正方形容器，它的边长总是浏览器宽度的一半，想必很多人都知道的，<strong>长宽比固定的容器</strong>要怎么实现吧？</p>
<p>我们知道(事实上很多人都不确定，所以这可以做为一个面试题)，margin 和 padding 的值如果取为百分比的话，这个百分比是相对于<strong>父元素的宽度</strong>的，也就是说，如果我给一个 block 元素设置 padding-bottom(当然，也完全可以是 padding-top，甚至可以两个一起用~)为 100% 的话，元素本身高度指定为 0，那么这个元素将始终是一个正方形，并且会随着容器宽度的变化而变化，想要改变正方形的大小，只需要改变父容器的宽度就可以了：</p>
<p>看这个的 demo:<br><a href="http://jsbin.com/lixece/1/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/lixece/1/edi...</a><br>拉动窗口可以看到色块会变大，但始终保持正方形。当然，如果参照物是浏览器窗口，那么在现代浏览中，这个效果可以用 vw / vh 实现；但如果参照物不是浏览器窗口，就只能用垂直 padding 来实现了。</p>
<p>于是我就想到，如果不给 flex item 的元素设置高度，而是让其被一个子元素撑开，并且这个子元素的宽度是100%，padding-bottom 也是 100%，那么 flex item 及这个用来撑大父元素的子元素就会同时保持为正方形了，于是就实现了上面的那种正方形阵列布局。</p>
<p>但仅仅这样还不够，最后一行又会出问题，如果最后一行的元素个数跟前面的行不一样的话，它们虽然会保持正方形，但是因为 grow 的关系，会比较大，那如何保证最后一行的元素也跟前面的行大小相同呢，这时使用一个元素并设置很大的 flex-grow 让其占满最后一行剩余空间的做法已经不可行了，因为我们需要让最后一行的元素<strong>恰到好处</strong>的跟前面行的元素 grow 时多出一样的空间。</p>
<p>其实解决方案也很简单，把最后一行不当最后一行就行了！此话怎讲呢？</p>
<p>在最后添加多个占位符，保证可见的最后一个元素永远处于视觉上的最后一行，而让占位符占据真正的最后一行，然后把这些占位符的高度设置为 0 。具体添加多少个占位符呢？显然是一行最多能显示多少个元素，就添加多少个了，比如前面的 demo 就添加了 8 个占位符，你可以在源代码里面看一下。另外为了更好的语义，其实可以用其它的标签当做占位符。</p>
<p>这样一来，始终能占满水平宽度的正方形阵列布局也实现了。</p>
<p>本来我以为，到这里就结束了，即使用上最先进的 flexbox 布局，CSS 也无法实现图片不裁减的完美布局。</p>
<h3 id="articleHeader4">- FAKE EOF -</h3>
<p>4 月 2 号的早上我醒来的时候，突然想到，既然可以让一个容器始终保持正方形，那岂不是也可以让这个容器始终保持任何比例？显然是可以的，只要我们把用于撑大父元素的那个元素的 padding-bottom 设置为一个我们想要的值就可以了！这样一来，说不定可以实现图片布局中，所有图片都完全展示且占满水平宽度的布局（也就是 Google Photos / 500px 的布局）！</p>
<p>当然，前面提到过，由于图片加载缓慢，图片布局往往都会提前知道图片的宽高来进行容器的预渲染，然后图片加载完成后直接放进去。</p>
<p>所以这里我们仍然需要用 JS 或者服务器来计算一下图片的宽高比例，然后设置到 padding-bottom 上面去，以保证容器的宽高比始终是其内部图片的宽高比。</p>
<p>我们先让所有图片以 200px 的高度展示，写出如下模板代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;display:flex;flex-wrap:wrap;&quot;>
  <div ng-repeat=&quot;img in imgs&quot; style=&quot;width:"{{"img.width*200/img.height"}}"px;&quot;>这个公式计算了图片高度为200时的宽度的值
    <div style=&quot;padding-bottom:"{{"img.height/img.width*100"}}"%&quot;></div>这个公式让此元素及其父元素的比例与图片原始比例相同，因为是垂直方向的 padding，所以是高度除以宽度
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:flex;flex-wrap:wrap;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"img in imgs"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:"{{"img.width*200/img.height"}}"px;"</span>&gt;</span>这个公式计算了图片高度为200时的宽度的值
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding-bottom:"{{"img.height/img.width*100"}}"%"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>这个公式让此元素及其父元素的比例与图片原始比例相同，因为是垂直方向的 padding，所以是高度除以宽度
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>在上面布局中，因为 flex-wrap 的关系，每一行不够放的时候后面的内容就会折行，并且留出一些空白，每个容器的宽高比都是跟未来放入其内部的图片的宽高比是一样的，为了便于展示，我将图片大小设置为容器大小的四分之一，应该明显可以看出图片的右下角处于容器的中心位置。</p>
<p>Demo: <a href="http://jsbin.com/tisaluy/5/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/5/ed...</a></p>
<p>下一步，我们只需要让所有的元素 grow 就可以了，那么是把所有的元素的 flex-grow 设置为 1 吗?</p>
<p>实际上如果设置了并看了效果，我们会发现并不是，因为我们希望每行元素在 grow 的时候，保持原有比例且高度相同。</p>
<p>Demo：<a href="http://jsbin.com/tisaluy/6/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/6/ed...</a><br>可以看到如果给所有的 flex item 设置 flex-grow: 1; 的话，容器跟图片的比例并不一致，这里我将图片宽度设置了为容器的宽度以便观察。</p>
<p>通过一些简单的计算我们会发现，每行图片高度一致的时候，每张图片在水平方向上占用的宽度正好是其宽度在这一行所有图片宽度之和中所占的比例。</p>
<p>在前面不 grow 的情况下，每张图片的容器的宽度已经是按比例分配了，而每行的剩余空间，我们希望它仍然按照目前容器宽度所占的比例来分配，于是，每个容器的 grow 的值，正好就是它的宽度，只不过不要 px 这个单位。</p>
<p>最终的代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>flex，wrap
  //实际上因为 flex-grow 是按比例分配，所以第二个公式里的 *200 可以不要，这要我们就只需要改前一个 200 了
  <div style=&quot;width:"{{"img.width*200/img.height"}}"px;flex-grow:"{{"img.width*200/img.height"}}"&quot; ng-repeat=&quot;img in imgs&quot;>
    <div style=&quot;padding-bottom:"{{"img.height/img.width*100"}}"%&quot;></div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>flex，wrap
  //实际上因为 flex-grow 是按比例分配，所以第二个公式里的 *200 可以不要，这要我们就只需要改前一个 200 了
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:"{{"img.width*200/img.height"}}"px;flex-grow:"{{"img.width*200/img.height"}}""</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"img in imgs"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding-bottom:"{{"img.height/img.width*100"}}"%"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这样一来，容器会占满当前行，并且保持与未来内部所放入的图片相同的宽高比：</p>
<p>Demo: <a href="http://jsbin.com/tisaluy/8/edit?html,css,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tisaluy/8/ed...</a></p>
<p>至于最后一行怎么处理，前面已经介绍过了，用一个 flex-grow 极大的元素占满剩余空间就可以了。</p>
<p>这种布局在渲染完成后，你可以放心的 resize 和 zoom，布局都不会错乱，而且没有 JS 的参与。</p>
<p>到这里，我们终于实现了类似 Google Photos / 500px 网站的图片布局。</p>
<p>总结一下这个方案的原理：</p>
<ol>
<li>padding（以及 margin）为百分比时是以容器的宽度为参照的</li>
<li>使用 flex-grow 来按图片宽度所占的比例分配水平空间</li>
<li>使用宽高比固定的子元素撑大带有指定比例 flex-grow 的 flex item 以实现不同行高度不一样并保持宽高比</li>
</ol>
<p>这种布局的优点：</p>
<ul>
<li>不需要特殊的算法去计算每张图片渲染之后的宽高等信息</li>
<li>不需要在 resize，room 时重新计算布局</li>
<li>CSS 的方案容易跟任何框架集成</li>
</ul>
<p>最后说一下这种方案的一些缺点：</p>
<ul>
<li>很明显，我们只能指定每行图片的最低高度，然后等着它 grow，并没有办法指定每行高度的上限是多少。虽然我们可以设置一下容器的 max-height，这样一来被 max-height 影响的那些容器里面的图片就展示不完全了。实际上只要图片的比例都在一个正常的范围，是不会出现某一行的高度过高的</li>
<li>在遇到比例超出某个范围的图片时可以只用我们允许的最大比例展示这张图片，比如说遇到了一张 1:5 的图片，我们只以 1:3 的区域来展示它。或者也可以调整一下图片的顺序，但这就需要 JS 参与了。 <a href="https://500px.com/search?q=bread+making+is+an+art&amp;type=photos&amp;sort=relevance" rel="nofollow noreferrer" target="_blank">500px 的这个搜索结果页面</a>貌似就是这么做的，试着把窗口宽度调小，会发现第一张后面的图片展示不完全，因为如果展示完全的话，单张图片就占用了太大的屏幕面积，所以它限定了高度。</li>
<li>另外，最后一行的图片如果几乎要占满那一行时，因为占位符的存在，并不会占满，会显得不太理想（读者可以调整窗口宽度观察上面的完整 demo）。这种情况如果是使用 JS 计算的话，是可以避免的：在发现最后一行几乎要占满时，直接让其占满最后一行。</li>
<li>我们在提到评价图片布局优劣的标准时候说到，每张图片展示区域越接近，评分应该也越高。理论上如果使用 JS 来计算布局，可以在算法上做如下优化：如果一行中比较高的图片比较多，那么这一行就少放些图片，留出更多的空间用来放大图片，这样就能让高图和宽图显示面积更接近一些了。而用 CSS 的方案如果不改变图片顺序就没法做这种优化了。不过如果不改变图片顺序，即使算法做了这些优化，出现在高图比较多的行里的宽图，展示面积会更大，会出现一种比例失调的情况，也不够完美。</li>
</ul>
<h3 id="articleHeader5">关于降级</h3>
<p>由于 IE 9 都是不支持 flexbox 的，所以这个方案必然需要优雅降级，在不支持的浏览器上，让图片都以正方形展示应该也不会太差，然后用 float 或者 inline-block 来折行，这里就不细说了。</p>
<p>最后，多个这种布局 float 一下，就可以实现 Google Photos 那种某几个连续日期的图片太少时，展示在同一行的效果。读者可以自行试一下，就不放 demo 了。</p>
<h3 id="articleHeader6">我的公开课</h3>
<p>最近，我在社区 - 讲堂里开了第一节免费公开课，主题为：<strong><a href="https://segmentfault.com/l/1500000012666812">带你彻底掌握 CSS 浮动</a></strong>，感兴趣的老铁们可以收看~</p>
<p><span class="img-wrap"><img data-src="/img/bV1v0w?w=1000&amp;h=1720" src="https://static.alili.tech/img/bV1v0w?w=1000&amp;h=1720" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h5>本文到此结束，谢谢围观！文中如有纰漏之处，还请各位大神留言指正</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用纯 CSS 实现 Google Photos 照片列表布局

## 原文链接
[https://segmentfault.com/a/1190000012691480](https://segmentfault.com/a/1190000012691480)

