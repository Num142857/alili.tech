---
title: 'window.devicePixelRatio 独立像素比（经典文章+原创）' 
date: 2019-02-09 2:30:59
hidden: true
slug: 2xqtorzid0w
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>设备像素/物理像素</strong><br>设备像素也被称为物理像素,他是显示设备中一个最微小的物理部件。<br><strong>屏幕密度</strong><br>通常以每英寸有多少物理像素来计算（PPI）。<br><strong>独立像素/CSS像素</strong><br>CSS像素是一个抽象的单位，主要使用在浏览器上，用来精确的度量（确定）Web页面上的内容。<br>一般情况下，CSS像素被称为与设备无关的像素（device-independent像素），简称为“DIPs”。在一个<strong>标准的显示</strong>密度下，一个CSS像素对应着一个设备像素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;width:320px; height：320px;background-color:blue;&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"width:320px; height：320px;background-color:blue;"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>就拿上面的代码来说（在头部没有加入&lt;meta name="viewport" content="width=device-width"&gt;），在电脑端和手机端显示，结果是</p>
<p><span class="img-wrap"><img data-src="/img/bVxTwO" src="https://static.alili.tech/img/bVxTwO" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVxTwJ" src="https://static.alili.tech/img/bVxTwJ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>出现这样的原因是因为电脑端显示设备的物理像素（液晶显示管）比较大，而手机的比较小，（生活中你可以发现电脑和手机都要存放很多液晶显示管，区别就是电脑的屏幕大，手机屏幕小）所以结果是同样要用200个物理像素结果就不一样了。<br>以上两张图片显示的结果是css样式的结果。</p>
<p><strong>独立像素比/window.devicePixelRatio</strong><br>window.devicePixelRatio=物理像素/独立像素。<br>通过计算你会发现刚才的两种手机的结果分别是1或者2（当然还有其它手机屏幕结果有些差别）</p>
<p><strong>呵呵........</strong><br>接下讨论一下，要想让手机显示上显示的结果和电脑一样大怎么办，所谓的一样大是，就是你用一把尺子量一下，电脑上长度和宽度各是200，手机上长度和宽度也各是200，也就是给人的视觉效果是一样大。</p>
<p><strong>手机屏幕分为：</strong><br>一：非视网膜屏幕（物理像素320，该设备的独立像素（视区宽度）<strong>也是</strong>320）<br>二：视网膜屏幕（物理像素640，该设备的独立像素（视区宽度）<strong>还是</strong>320，刚才手机显示的结果用的就是用的这个手机）</p>
<p><strong>&lt;meta name="viewport" content="width=device-width"&gt;</strong><br>这个代码的作用就是让视图区域撑满手机物理屏幕。</p>
<p>html文件头部加上这个代码后，手机显示的大小和电脑显示的大小尺寸大小就一样了。<br>但是手机上显示的图片就模糊了，这是因为你要显示同样的物理大小，视网膜屏幕就要用双倍的物理像素来显示（一个一像素的图片，如果用浏览器4个像素（即放大了一倍）来看会变模糊和失真，所以在给手机做图片的时候，要放大一倍，就是在手机上显示的图片是100乘以100，那ps做图片要做成200乘以200这样才会清晰）。</p>
<p><strong>哈哈.....</strong><br>欢迎指正。<br>看到网上很多的文章看的我好晕，还说如果觉得文章就给他打赏，我他妈的看的头昏眼花还没有叫他赔钱呢。<br>大家如果觉得我的文章写到你的痛点了，或者有用请打赏。微信:youronglang  或者买点我自家代理的酒 关注微博：<a href="http://weibo.com/3480172835/profile?topnav=1&amp;wvr=6&amp;is_all=1" rel="nofollow noreferrer" target="_blank">匠心酒</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
window.devicePixelRatio 独立像素比（经典文章+原创）

## 原文链接
[https://segmentfault.com/a/1190000005656849](https://segmentfault.com/a/1190000005656849)

