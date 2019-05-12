---
title: '谈谈像素以及微信小程序的 rpx' 
date: 2019-01-14 2:30:07
hidden: true
slug: r2a8et9gmim
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎来我的博客阅读：<a href="http://huang-jerryc.com/2017/05/21/talk-about-pixel-and-rpx/" rel="nofollow noreferrer" target="_blank">「谈谈像素以及微信小程序的 rpx」</a></p></blockquote>
<h1 id="articleHeader0">前言</h1>
<p>最近在负责有赞的某个业务的微信小程序开发，这是我第一次着手微信小程序的开发，这个过程中发现微信小程序所定义的一套 WXSS (WeiXin Style Sheets) 中有一个有趣的长度单位 <code>rpx</code>，即 responsive pixel。<br>根据官方的描述：</p>
<blockquote><p>rpx（responsive pixel）， 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。</p></blockquote>
<p>平时我们一般会用 <code>em</code> 或者 <code>rem</code> 来做屏幕适配，而在微信小程序中，可以方便的借助 <code>rpx</code> 来完成这项工作。</p>
<p>那么怎么理解 <code>rpx</code>，还有它与 <code>px</code> 之间什么关系？什么是物理像素？<br>为了更好理解 <code>rpx</code>，我打算聊聊下面的一些概念：</p>
<ol>
<li>像素 (Pixel)</li>
<li>PPI (Pixels per inch 每英尺像素)</li>
<li>DPR (Device pixel ratio)</li>
</ol>
<h1 id="articleHeader1">像素</h1>
<p>像素，英文单词：pixel，是英语单词 「picture」 的简写 「pix」，加上 「element」 的简写 「el」，合成的词汇，表示「图像元素」的意思。 <br>一个像素只能表达一个色块，是显示的最小的一个单元。</p>
<p>而在我们写代码的时候，可以把像素分为两种：</p>
<ol>
<li>物理像素 Physical pixels</li>
<li>逻辑像素 Logical pixels</li>
</ol>
<h2 id="articleHeader2">物理像素</h2>
<p>也被称为设备像素 (Device independent pixels)，即设备在出厂的时候就已经固定了像素。</p>
<p>我们来看一下 iPhone6 (左图) 与 iPhone6 plus (右图) 的官方显示屏的规格说明：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009497007?w=1012&amp;h=434" src="https://static.alili.tech/img/remote/1460000009497007?w=1012&amp;h=434" alt="iPhone6 &amp; iPhone6 plus 规格" title="iPhone6 &amp; iPhone6 plus 规格" style="cursor: pointer; display: inline;"></span></p>
<p>iPhone6 是 <code>1334px x 750px</code> 的像素分辨率，意思是当手机竖放的时候，横向有 750 个物理像素，纵向有 1334 个物理像素。</p>
<h2 id="articleHeader3">逻辑像素</h2>
<p>在 CSS 中也被称为 CSS 像素 (CSS pixels)，是为 Web 开发者创造的，在 CSS 和 JavaScript 中使用的一个抽象的层，每一个 CSS 声明和几乎所有的 Javascript 属性都使用 CSS 像素。</p>
<p>例如我们平时使用 Chrome 的设备调试工具的时候，iPhone6 是高 <code>667px</code>，宽是 <code>375px</code>，与苹果官方的 <code>1334px x 750px</code>，长宽分别少了 2 倍，那么面积就少了 4 倍。这就是经常说的 Retina 屏幕用四个(物理)像素表示一个(逻辑)像素。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009497008?w=683&amp;h=450" src="https://static.alili.tech/img/remote/1460000009497008?w=683&amp;h=450" alt="Chrome 下 iPhone6 逻辑像素" title="Chrome 下 iPhone6 逻辑像素" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">PPI</h1>
<p>Pixels per inch，每英寸像素，也被称为像素密度，意思是一英寸中有多少个物理像素。<br>其中 1英寸 (inch) = 2.54厘米 (cm)。</p>
<p>回顾一下上面的 iPhone6 和 iPhone6 plus 的官方规格说明图，其中有 <code>ppi</code> 这一项，iPhone6 是 <code>326ppi</code>，iphone6 plus 是 <code>401ppi</code>。</p>
<h2 id="articleHeader5">PPI 怎么算出来的？</h2>
<p>要计算显示器的每英寸像素值，首先要确定屏幕的尺寸和分辨率。<br>PPI 计算公式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009497009?w=361&amp;h=81" src="https://static.alili.tech/img/remote/1460000009497009?w=361&amp;h=81" alt="PPI 计算公式" title="PPI 计算公式" style="cursor: pointer;"></span></p>
<p>其中，</p>
<ul>
<li>dp (device pixel) 为屏幕对角线的分辨率</li>
<li>wp (width pixel) 为屏幕横向分辨率</li>
<li>hp (height piexl) 为屏幕纵向分辨率</li>
<li>di (device inch) 为屏幕对角线的长度(单位为英寸)。</li>
</ul>
<p>以 iPhone6 为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009497010?w=643&amp;h=81" src="https://static.alili.tech/img/remote/1460000009497010?w=643&amp;h=81" alt="iPhone6 PPI 计算" title="iPhone6 PPI 计算" style="cursor: pointer; display: inline;"></span></p>
<p>四舍五入那便是 <code>326ppi</code> 了。</p>
<h2 id="articleHeader6">物理像素有多大？</h2>
<p>「物理像素」是有特定长度的，这取决于 ppi 值。</p>
<p>那么如何求出一个设备的物理像素的长度？<br>因为绝大多数设备的物理像素都是方形的，我们可以假设当前设备的像素是方形的。<br>那么，</p>
<ul>
<li>iPhone6 中每个像素长度：1inch / 326ppi ≈ 0.003 inch = 0.0762mm</li>
<li>iPhone6 plus 中每个像素长度：1inch / 401ppi ≈ 0.002 inch = 0.0508mm</li>
</ul>
<p>可以看出 iPhone6 plus 的屏幕制作工艺更加精细。<br>因为像素越小，那么单位面积内像素点就越多，显示的效果人眼就越难看出毛刺。<br>用来显示一份图像的像素越多，效果就越接近现实。</p>
<p>和物理像素不同，「逻辑像素」没有特定的物理长度的，只是表示显示设备中最小的显示单元，优秀的显示设备完全可以把显示单元做的更加小，已达到更好的显示效果。</p>
<h1 id="articleHeader7">DPR</h1>
<p>Device Pixel Ratio，设备像素比。</p>
<p>在早先的移动设备中，并没有 DPR 的概念。随着技术的发展，移动设备的屏幕像素密度越来越高。<br>从 iPhone4 开始，苹果公司推出了所谓的 Retina 视网膜屏幕。之所以叫做视网膜屏幕，是因为屏幕的 PPI 太高，人的视网膜无法分辨出屏幕上的像素点。<br>iPhone4 的分辨率提高了一倍，但屏幕尺寸却没有变化，这意味着同样大小的屏幕上，像素多了一倍，于是 <code>dpr = 2</code>。</p>
<p>在 Chrome 浏览器可以通过以下代码获取设备的 DPR：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let dpr = window.devicePixelRatio;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let dpr</span> = window.devicePixelRatio;</code></pre>
<p>而通过下面的代码可以获取设备的逻辑像素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let logicalHeight = screen.height;
let logicalWidth = screen.width;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">let logicalHeight</span> = screen.height;
<span class="hljs-attribute">let logicalWidth</span> = screen.width;</code></pre>
<p>那么很多人看到这里，就会认为：<code>物理像素 = 逻辑像素 * dpr</code><br>但实际情况并不是这样，<br>留意一下 iPhone6 plus 的物理像素和逻辑像素：</p>
<ul>
<li>物理像素：<code>1080px x 1920px</code>
</li>
<li>逻辑像素：<code>414px x 736px</code>
</li>
</ul>
<p>而官方声称 iPhone6 plus 的 <code>dpr = 3</code>，按理应该是：</p>
<ul><li>
<code>414px x 736px</code> → 乘以 3 倍 dpr → <code>1242px x 2208px</code>
</li></ul>
<p>那么 iPhone6 plus 只有 <code>1080px x 1920px</code>，怎么去展示 <code>1241px x 2208px</code> 的分辨率呢？</p>
<p>原来 iPhone6 plus 对逻辑像素做了缩小处理，以适应物理像素，也就是<br><code>1241px x 2208px</code> 除以 <code>115%</code> ，得到 <code>1080px x 1920px</code>。</p>
<p>换句话来说，本来 iPhone6 plus 的 <code>dpr = 2.6</code>，但是通过虚拟技术把物理像素放大 115% ，以达到 <code>dpr = 3</code> 的效果。</p>
<p>所以说是假 3 倍 dpr，其实我们开发和设计的时候也不用管这个，当作它就是 3 倍 dpr 就好了。</p>
<h1 id="articleHeader8">回到 rpx</h1>
<p>根据官方给出的 rpx 换算 px 的实例：<br><span class="img-wrap"><img data-src="/img/remote/1460000009497011?w=834&amp;h=245" src="https://static.alili.tech/img/remote/1460000009497011?w=834&amp;h=245" alt="rpx 换算 px" title="rpx 换算 px" style="cursor: pointer; display: inline;"></span></p>
<p>三款机器的逻辑像素：</p>
<ul>
<li>iPhone5 : <code>320px x 568px</code>
</li>
<li>iPhone6 : <code>375px x 667px</code>
</li>
<li>iPhone6 plus : <code>414px x 736px</code>
</li>
</ul>
<p>rpx 转换成 px 是需要乘以一个系数的：</p>
<ul><li><code>px = rpx * n</code></li></ul>
<p>其中系数 n，是跟着设备改变的：</p>
<ul>
<li>iPhone5: <code>n = 2.34</code>
</li>
<li>iPhone6: <code>n = 2</code>
</li>
<li>iPhone6 plus: <code>n = 1.81</code>
</li>
</ul>
<p>所以 rpx 只是定义一个绝对值 750 宽度，然后简单的根据不同设备的逻辑像素来进行 rpx 到 px 的换算。</p>
<p>精明的观众可能发现了， rpx 压根就不需要关心 DPR 和 PPI 的概念。<br>呃，其实我就是在理解 rpx 的过程中，拦不住思维的发散，了解了一大堆概念，然后顺道给你们分享一下罢了。</p>
<h1 id="articleHeader9">参考</h1>
<p><a href="https://www.wikiwand.com/zh-sg/%E5%83%8F%E7%B4%A0" rel="nofollow noreferrer" target="_blank">Wiki - 像素</a><br><a href="https://www.wikiwand.com/zh-sg/%E6%AF%8F%E8%8B%B1%E5%AF%B8%E5%83%8F%E7%B4%A0" rel="nofollow noreferrer" target="_blank">Wiki - 每英寸像素</a><br><a href="https://www.paintcodeapp.com/news/iphone-6-screens-demystified" rel="nofollow noreferrer" target="_blank">iPhone 6 Screens Demystified</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈像素以及微信小程序的 rpx

## 原文链接
[https://segmentfault.com/a/1190000009497004](https://segmentfault.com/a/1190000009497004)

