---
title: 'iOS Safari浏览器上overflow: scroll元素无法滑动bug解决方法整理' 
date: 2018-12-18 2:30:11
hidden: true
slug: gmpvcmwa2gi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">描述</h2>
<p>此bug出现需要条件：父元素需使用绝对定位absolute或固定定位fixed，使用overflow: scroll / auto（或overflow-y: scroll / auto)，内部子元素是动态大小（例如较大的svg document，近似为内嵌iframe，等等）。</p>
<p>bug出现原因：没有相关官方文档描述该bug。在查阅文档及自己测试的时候总结：<strong>iOS safari 会将overflow：scroll的元素识别为一个单独的 ScrollView，并予以一个 -webkit-overflow-scrolling 属性为auto。而safari中的网页本身就是一个大的ScrollView，在脱离文档流的定位时，子元素的高度如果没有在ScrollView建立之前确定，就不会触发内部滑动，而会触发外部滑动。</strong></p>
<p>关于 -webkit-overflow-scrolling：Safari CSS Reference官方是这样描述的：</p>
<blockquote>Specifies whether to use native-style scrolling in an overflow:scroll element.</blockquote>
<p>即该属性会让overflow：scroll的元素拥有像iOS原生一样顺滑的滑动效果。为了实现此目标，safari将所有overflow：scroll的元素用原生创建一个ScrollView，当-webkit-overflow-scrolling属性为touch时，启用硬件加速，出现顺滑效果。</p>
<h2 id="articleHeader1">分析</h2>
<ol>
<li>父元素不脱离文档流时，无此bug。</li>
<li>父元素在不指定 -webkit-overflow-scrolling：touch时必定出现无法滑动的问题。</li>
<li>当内部元素为正常的html元素时，无此bug。</li>
<li>当为父元素重新设置overflow属性时，可能会导致safari重建ScrollView而bug消失。（之前版本的实验室用这种方法解决的，但新海外版不能用这种方法fix，所以是可能）</li>
</ol>
<h2 id="articleHeader2">解决方法：</h2>
<p>据以上分析以及大量测试得出完美解决方法为：</p>
<ol>
<li>必须为所有在移动端的overflow: scroll元素增加属性 -webkit-overflow-scrolling: touch。</li>
<li>当父元素可不脱离文档流时不要脱离文档流。</li>
<li>在子元素iframe加载完成后可异步将父元素的overflow: scroll属性重写（此方法可能不成功）。</li>
<li>如以上没有解决，则给予子元素一个min-height，大小不限（略大于效果最好），帮助safari建立ScrollView（亲测最有效）。</li>
</ol>
<h2 id="articleHeader3">更新</h2>
<p>此问题的深层原因找到了，详情请见：<a href="https://segmentfault.com/a/1190000016408566">iOS safari浏览器上overflow: scroll元素无法滚动bug深究</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iOS Safari浏览器上overflow: scroll元素无法滑动bug解决方法整理

## 原文链接
[https://segmentfault.com/a/1190000012761272](https://segmentfault.com/a/1190000012761272)

