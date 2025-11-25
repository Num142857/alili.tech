---
title: '微信小程序新单位rpx与自适应布局' 
date: 2019-02-02 2:30:10
hidden: true
slug: 7fi9v4z9vuv
categories: [reprint]
---

{{< raw >}}

                    
<p>rpx是微信小程序新推出的一个单位，按官方的定义，rpx可以<strong>根据屏幕宽度进行自适应</strong>，在rpx出现之前，web页面的自适应布局已经有了多种解决方案，为什么微信还捣鼓出新的rpx单位？在解释这个单位前，我们先简单了解一下目前的主流的自适应布局解决方案：</p>
<ol>
<li><p>响应式（<a href="https://en.wikipedia.org/wiki/Responsive_web_design" rel="nofollow noreferrer" target="_blank">Responsive web design</a>)</p></li>
<li><p>rem</p></li>
<li><p>流式布局</p></li>
<li><p>scale伸缩布局</p></li>
</ol>
<h3 id="articleHeader0">响应式</h3>
<p>响应式布局的问题在于需要维护多个样式文件，维护成本太大，一般的移动H5页面都不会优先考虑。</p>
<h3 id="articleHeader1">rem</h3>
<p>rem是近几年比较流行的方案，淘宝移动web端就是采用此方案，由于1rem=根元素font-size，所以rem布局的本质就是<strong>通过rem把页面按比例分割</strong>达到自适应的效果，因为rem是相对根路径font-size尺寸，不同的页面设置不同的font-size尺寸，即可达到自适应的效果。为了方便理解，我写了一个简单的<a href="http://babyzone2004.github.io/demo/unit/rem.html" rel="nofollow noreferrer" target="_blank">rem布局demo</a>，通过设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.style.fontSize = window.innerWidth + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.documentElement.style.fontSize = <span class="hljs-built_in">window</span>.innerWidth + <span class="hljs-string">'px'</span>;</code></pre>
<p>然后设置<code>&lt;div class="box"&gt;&lt;/div&gt;</code>的宽高等于1rem，就可以使box的宽高自适应各种设备尺寸。因为box的单位1em是跟页面设备的宽对应的，所以能做到自适应各种尺寸。</p>
<h3 id="articleHeader2">流式布局</h3>
<p>流式布局需要用到百分比或者flex，即宽度永远铺满页面宽度，但高度和其他单位仍然用px。我个人比较推荐用流式布局，因为流式布局不需要像rem那样额外通过js动态调整根元素的字体尺寸。虽然某些大屏幕下，无法100%还原设计稿，但这也是流式布局的精髓，它的字体精度可以保持跟设备系统一致（dpi）。</p>
<h3 id="articleHeader3">scale伸缩布局</h3>
<p>scale伸缩布局顾名思义，就是通过拉伸缩小页面来达到自适应。有两种方法，一是通过js更改viewport的initial-scale，这种方法比较麻烦，另一种是直接写死viewport的宽度，例如：<code>&lt;meta name="viewport" content="width=360, user-scalable=no"&gt;</code>，意思就是告诉浏览器：这个页面我要一直用360px的宽度处理，在不同的尺寸上，麻烦伸缩一下。假如在320的iphone上，放大到360，在375的iphone上，缩小到360。这样我只需要以360这个尺寸出设计稿就行，页面会伸缩适应。实际效果可以通过手机访问：<a href="http://babyzone2004.github.io/demo/unit/dpi.html" rel="nofollow noreferrer" target="_blank">scale伸缩demo</a>。scale伸缩的问题在于，不能显式设置minimum-scale=1.0，否则就达不到效果。而这个值是chromium37以上的webview触发gpu raster的一个条件，所以用这种方法就没法利用gpu raster硬件加速。</p>
<h3 id="articleHeader4">rpx布局</h3>
<p>上面四个方法，各有优缺点，现在回头看看微信的rpx，相信大家已经有所启发，rpx实际上就是系统级的rem（把页面按比例分割750份，1rpx=window.innerWidth/750），或者scale伸缩布局的<code>width=750</code>。也就是说，微信小程序的rpx布局帮大家把rem布局的js设置根元素字体尺寸这步省了，或者减少了scale伸缩布局不能开启gpu raster的问题。</p>
<p>通过rpx，大家只需要根据750的设计稿写代码即可，不必担心它在各个平台的适配情况，实际上在各个平台都会长得一样，从此妈妈再也不用担心我的页面适配问题啦。</p>
<p>参考链接：</p>
<ol>
<li><p><a href="https://www.chromium.org/developers/design-documents/chromium-graphics/how-to-get-gpu-rasterization" rel="nofollow noreferrer" target="_blank">https://www.chromium.org/deve...</a></p></li>
<li><p><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/debu...</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序新单位rpx与自适应布局

## 原文链接
[https://segmentfault.com/a/1190000007220703](https://segmentfault.com/a/1190000007220703)

