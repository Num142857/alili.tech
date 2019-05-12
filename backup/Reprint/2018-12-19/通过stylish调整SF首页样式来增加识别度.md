---
title: '通过stylish调整SF首页样式来增加识别度' 
date: 2018-12-19 2:30:07
hidden: true
slug: k8z15s0li8
categories: [reprint]
---

{{< raw >}}

                    
<p>SF 的首页改版之后，我不知道大家的感受是怎么样的，我个人还是不太习惯，感觉有点杂乱，所有的类别都放在一起了。</p>
<p><span class="img-wrap"><img data-src="/img/bV1mwf?w=1922&amp;h=1526" src="https://static.alili.tech/img/bV1mwf?w=1922&amp;h=1526" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为了让自己舒服一点，于是我又一次打开了 stylish 这个小玩意，修改了一下样式，最后就是这样了。</p>
<p><span class="img-wrap"><img data-src="/img/bV1mvB?w=1926&amp;h=1690" src="https://static.alili.tech/img/bV1mvB?w=1926&amp;h=1690" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我不知道别人会不会觉得舒服一点，但是我自己觉得舒服了一点了，识别度至少是清楚了。</p>
<p>不过整个的时候，发现有 SF 首页有一个地方的 CSS 属性不知道是做什么用的。</p>
<p><span class="img-wrap"><img data-src="/img/bV1mwV?w=976&amp;h=362" src="https://static.alili.tech/img/bV1mwV?w=976&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>因为要通过不同类型的的 tag 来处理样式，而最外层的父级元素并没有一个特别标识的类名，这个特别标识的类名是在最里层，所以只有通过定位方式来处理。</p>
<ul>
<li>专栏：<code>#407600</code> =&gt; <code>.middle .news-list .news-item .text-live</code>
</li>
<li>问答：<code>#8C5825</code> =&gt; <code>.middle .news-list .news-item .text-qa</code>
</li>
<li>专栏：<code>#468ee5</code> =&gt; <code>.middle .news-list .news-item .text-article</code>
</li>
<li>头条：<strong>没有颜色，也没有类名</strong>
</li>
</ul>
<p>找到这几个之后，再把这里的 a 标签增加一个 <code>:after</code> 定位一下，撑满外层列表元素的背景就好了。不过因为这个 a 标签的父级元素问题，需要增加改变一下定位属性值。</p>
<p><span class="img-wrap"><img data-src="/img/bV1my9?w=2440&amp;h=1376" src="https://static.alili.tech/img/bV1my9?w=2440&amp;h=1376" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后再把最外层的元素增加一个定位特性，这样就可以让 a 标签的 <code>:after</code> 定位在一个列表的位置上的。不过呢，有一个问题就是，当 a 标签的 <code>:after</code> 定位之后，会覆盖在内容之后，因此需要增加 <code>z-index: -1;</code>，让背景到内容底部去，但是定位好像有点怪怪的，算了，不管，反正这个 <code>:after</code> 是不需要点击的，那么就再来一个 <code>pointer-events: none;</code>。</p>
<p>嗯，现在这样就差不多了。所以最后的代码就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".middle .news-list .news-item {position: relative;}
.middle .news-list .news-item .news__item-info .news__item-meta {position: static;}
.middle .news-list .news-item .text-article:after,
.middle .news-list .news-item .text-live:after,
.middle .news-list .news-item .text-qa:after {content:&quot;&quot;;position: absolute;top:0;left:0;right:0;bottom:0;background-color:#468ee512;pointer-events:none;}
.middle .news-list .news-item .text-live:after {background-color:#40760012;}
.middle .news-list .news-item .text-qa:after {background-color:#8C582512;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> {<span class="hljs-attribute">position</span>: relative;}
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.news__item-info</span> <span class="hljs-selector-class">.news__item-meta</span> {<span class="hljs-attribute">position</span>: static;}
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.text-article</span><span class="hljs-selector-pseudo">:after</span>,
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.text-live</span><span class="hljs-selector-pseudo">:after</span>,
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.text-qa</span><span class="hljs-selector-pseudo">:after</span> {<span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#468ee512</span>;<span class="hljs-attribute">pointer-events</span>:none;}
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.text-live</span><span class="hljs-selector-pseudo">:after</span> {<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#40760012</span>;}
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.news-list</span> <span class="hljs-selector-class">.news-item</span> <span class="hljs-selector-class">.text-qa</span><span class="hljs-selector-pseudo">:after</span> {<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#8C582512</span>;}</code></pre>
<p>因为只是首页，所以 stylish 中记得加一下域名控制，然后就 OK 了。</p>
<p><span class="img-wrap"><img data-src="/img/bV1mAo?w=1944&amp;h=852" src="https://static.alili.tech/img/bV1mAo?w=1944&amp;h=852" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果好奇 <code>background-color:#8C582512;</code> 这里的颜色值为什么这么长，我只想说，因为我一般情况下是用 Chrome 的，然后又有更新癖好，所以，目前是最新版的 Chrome，这个颜色值的最后两位是透明度。</p>
<p><span class="img-wrap"><img data-src="/img/bV1mA6?w=760&amp;h=726" src="https://static.alili.tech/img/bV1mA6?w=760&amp;h=726" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>哦了，搞定，上班……</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过stylish调整SF首页样式来增加识别度

## 原文链接
[https://segmentfault.com/a/1190000012679190](https://segmentfault.com/a/1190000012679190)

