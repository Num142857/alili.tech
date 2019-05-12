---
title: '安卓文本居中——关于css，字体和line-box的笔记' 
date: 2018-12-27 2:30:12
hidden: true
slug: zfeub4j94xg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文主要探索在安卓系统下浏览器中小字号中文居中的实现以及在混排时的对齐处理。本文是受《<a href="http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align" rel="nofollow noreferrer" target="_blank">Deep dive CSS: font metrics, line-height and vertical-align</a>》(以下简称为《Deep》)所启发，并以此为基础所写，建议先阅读前文，您也可以选择阅读大漠老师或方应杭老师的翻译版。<a href="https://www.w3cplus.com/css/css-font-metrics-line-height-and-vertical-align.html" rel="nofollow noreferrer" target="_blank">大漠版</a> <a href="https://zhuanlan.zhihu.com/p/25808995" rel="nofollow noreferrer" target="_blank">方应杭版</a></p>
<p>一直以来前端最简单的文字垂直居中方式就是line-height=height,浏览器会自动将line-height大于font-size的部分平分在文字上下，实现居中效果。但是，当网页中存在中文特别是10-12px的小字号中文时，在部分安卓机器上出现字符上飘，甚至超出容器的情况。<br>对于这种现象，网上流传着多种解决方案，比如tabel-cell法，flex法等。但是这类方法总是时灵时不灵，原因就在于这类方法只解决了将line-box相对外层容器居中的问题，必须要配合line-height:normal实现文字在line-box内居中才能解决问题。下文将对line-height:normal的生效原理和副作用处理进行研究。</p>
<h2 id="articleHeader1">神奇的安卓字体</h2>
<p>根据《Deep》所述，文字中从小到大可以划出三个区域，分别是em-square，content-area和virtual-area。一般情况下，前一个区域大致居中与后一个区域，而文字本身也大致居中于这个区域。因此无论是采用哪种line-height,文字居中于line-box看起来都是一件理所当然的事。<br>但是，对于部分安卓系统的默认字体而言却不是这样。</p>
<p>下图的两个字的font-size和height都是10px，左边一个line-height为1即等于font-size，右边一个则为normal(由于DPR的原因，这里看到的像素点是实际上的三倍)。由于line-height属性不同。左边的line-box大小等于ex-square，右边的line-box大小等于virtual-area=content-area+line-gap<br>下图左侧红框内的淡灰色区域为em-square，高10px，深灰色区域为content-area高11px，右侧红框内的淡灰色区域为virtual-area高14px。可以看出，此时em-square位于content-area底部，字形则位于content-area顶部，所以字形完全没有居中于ex-square。<br>而右侧的行为则与《Deep》所述不同，virtual-area相对content-area多出来的3px大小的line-gap并不是平均分配与上下，而是全部堆在了顶部。因此恰好看起来文字居中于virtual-area。<br><span class="img-wrap"><img data-src="/img/bVXNwQ?w=1120&amp;h=520" src="https://static.alili.tech/img/bVXNwQ?w=1120&amp;h=520" alt="demo1" title="demo1" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">应用</h2>
<p>综上，line-height:normal可以使文字在那些奇怪的安卓机器上实现垂直居中。当然，这条样式会带来一个问题，即高度line-box的高度不可控，此时就需要前文所说的flex或tabel-cell将line-box<br>相对于外层容器居中，然后在外层容器设置高度即可。</p>
<p>下面是使用实例，起作用的样式是display: flex;align-items: center两条。创建一个弹性容器，然后将该容器的子元素居中，这样virtual-area多出来的部分就溢出到边框之外，而不会影响布局了。<br>图中红框内的浅灰色区域为高度12px的容器，深灰色为高度16px的line-box和virtual-area。最终实现了将12px大小的文字居中于12px大小的容器中的目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span style=&quot;border:1px solid red;height:12px;font-size:12px;color: black;display: flex;align-items: center;&quot;>国</span>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:1px solid red;height:12px;font-size:12px;color: black;display: flex;align-items: center;"</span>&gt;</span>国<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXQAW?w=220&amp;h=200" src="https://static.alili.tech/img/bVXQAW?w=220&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">总结</h2>
<p>回顾我们以前的做法。我们通常会为line-height设置一个具体的高度该高度就是line-box的高度。而浏览器会将字体的em-square居中于line-box中。对于大多数正常字体这么操作就可以实现垂直居中。<br>但是，部分安卓机器字体的字形不居中于em-square，却居中于virtual-area。此时通过line-height:normal样式使得virtual-area撑满line-box。从而实现文字居中于line-box。最后通过固定外层容器大小然后居中line-box的方式，消除前面的样式造成的line-box大小不可控的副作用。</p>
<p>PS:这种方案应用于多行文本的时，无法手动控制行间距，只能使用字体设计师决定的默认行间距。在需要手动控制行间距时，还是建议放弃此方案，反正对于多行文本，1~2px的偏移对整体视觉展现不会有太大的影响<br>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
安卓文本居中——关于css，字体和line-box的笔记

## 原文链接
[https://segmentfault.com/a/1190000011833307](https://segmentfault.com/a/1190000011833307)

