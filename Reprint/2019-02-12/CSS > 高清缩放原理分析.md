---
title: 'CSS > 高清缩放原理分析' 
date: 2019-02-12 2:30:12
hidden: true
slug: boc2ogtdlrv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近在研究 Retina 屏的适配问题，在具体方案讨论之前，陆续做了一些理解笔记，现归纳如下。具体方案的讨论将另作文章。</p></blockquote>
<ol>
<li><p><code>&lt;meta name="viewport"&gt;</code> 中的 <code>viewport</code> 是布局视口</p></li>
<li><p><code>initial-scale</code> 等的缩放是基于理想视口的</p></li>
<li><p>理想视口由设备各自提供，理想视口的宽度也是设备的独立像素</p></li>
<li><p>所谓“独立”是说这个设备独立像素和像素密度无关</p></li>
<li><p>Retina屏增加了设备像素（物理像素），所以物理像素是有密度变化的</p></li>
<li><p>dpr = 物理像素/设备独立像素 = 设备像素个数/设备理想视口宽度</p></li>
<li><p>dpr 在 JavaScript 中可以通过 <code>window.devicePixelRatio</code> 获取，在 CSS Media Query 中的名称是 <code>device-pixel-ratio</code></p></li>
<li><p>CSS像素和物理像素有区别，当1个CSS像素跨越更多物理像素时，就模糊了，反之则清晰，CSS像素被用在布局视口上</p></li>
<li>
<p>缩放可以调整CSS像素和物理像素之间的比例关系。高清屏的缩放方案就是：如将布局视口扩大为理想视口的2倍，即理想视口缩放比例为1/2，那么CSS像素将比以前跨越更少的物理像素，从而保证清晰度</p>
<ul>
<li><p>布局视口/理想视口 = CSS像素/设备独立像素 = 1/缩放比例</p></li>
<li><p>物理像素/设备独立像素 = dpr</p></li>
<li><p>页面清晰要求 —— CSS像素/物理像素 = 1</p></li>
<li><p>故 —— 缩放比例 = 1/dpr</p></li>
</ul>
</li>
</ol>
<p>从以下的关系比中来认知：</p>
<ol>
<li><p>布局视口(CSS像素) : 设备独立像素(理想视口) : 物理像素</p></li>
<li>
<p>设备独立像素可以被看做一个中间件：</p>
<ul>
<li><p>当 dpr=1 时，设 initial-scale=1.0，布局视口等于设备独立像素，设备独立像素等于物理像素，故布局视口等于物理像素，1CSS像素跨1物理像素</p></li>
<li><p>当 dpr=2 时，设 initial-scale=1.0，布局视口等于设备独立像素，设备独立像素是物理像素的一半，故布局视口是物理像素的一半，1CSS像素跨4物理像素</p></li>
<li><p>当 dpr=2 时，设 initial-scale=0.5，布局视口是设备独立像素的两倍，设备独立像素是物理像素的一半，故布局视口等于设备像素，1CSS像素跨1物理像素</p></li>
</ul>
</li>
<li>
<p>再来研究高清屏，以下均设：设备独立像素是 375px，dpr=2，物理像素则是 750px，元素DIV <code>div{width: 375px}</code>：</p>
<ul>
<li><p>initial-scale=1.0 时，1CSS像素跨越4物理像素，故 DIV 是满屏的</p></li>
<li><p>initial-scale=0.5 时，1CSS像素跨越1物理像素，故 DIV 只占屏幕的一半，要想同样保持全屏，就需要把 DIV 改为 <code>div{width: 750px}</code></p></li>
<li><p>所以，对于图来说，第一种情况下普通图片就会拉伸，从而模糊；第二种情况，就是使用高清图</p></li>
</ul>
</li>
<li>
<p>为不同屏幕的元素设置不同的像素单位过于麻烦，开发者就需要考虑是否有跨屏幕的尺寸单位解决方案</p>
<ul>
<li><p>rem：当普通屏时，设 <code>:root{font-size: 10px}</code>，则 37.5rem 是 375px；高清屏时，设 <code>:root{font-size: 20px}</code>，则 37.5rem 是 750px，因此，我们在 DIV 元素上只需要设置一个 37.5rem，在不同屏幕下更改根元素的字体大小，就可以兼容所有屏幕了</p></li>
<li><p>vw 和 wh：相对于布局视口大小计算尺寸，普通屏布局视口是 375px，高清屏是 750px，无论怎么变，vw/vh 单位的最后结果都会相应变化</p></li>
</ul>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS > 高清缩放原理分析

## 原文链接
[https://segmentfault.com/a/1190000004885833](https://segmentfault.com/a/1190000004885833)

