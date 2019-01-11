---
title: '「CSS3」ImageMagick - 从gif建立雪碧图动画 - Sprite Sheet Animation' 
date: 2019-01-12 2:30:24
hidden: true
slug: uuile3nljgn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ImageMagick</h2>
<p>ImageMagick 是当前非常流行的一个图像处理库，一些大型的公司，例如Facebook、雅虎等都在使用 ImageMagick 对用户上传的图像进行处理。</p>
<p>ImageMagick 基本上可以支持所有的基础图像处理，例如尺寸、亮度、灰度的改变，滤镜和特效的添加，图片格式转换，制作gif或者扁平化gif...基本上你所能想到的所有基础图片操作，它都能做到。</p>
<p>ImageMagick 对平台和语言的支持都十分完善，基本上支持现在流行的所有语言，即使不支持你现在所使用的语言，直接通过命令行调用 <code>magick</code> 命令也是非常方便的。</p>
<p>安装ImageMagick的步骤我就不赘述了，大家根据自己的平台来下载相应的二进制包，<a href="http://www.imagemagick.org/script/download.php" rel="nofollow noreferrer" target="_blank">-&gt;传送门&lt;-</a></p>
<h2 id="articleHeader1">雪碧图动画</h2>
<p>雪碧图动画指的是，将一个动画所需要的所有帧平铺（或横或竖）排列在一张图片上，当动画运行时，较短时间内改变其容器的 <code>background-position</code>，得到动画播放的效果。</p>
<p>下图是bilibili点击收藏按钮的动画效果及其雪碧图（GIF是笔者根据雪碧图来进行合成的）</p>
<p><span class="img-wrap"><img data-src="/img/bVOPum?w=60&amp;h=60" src="https://static.alili.tech/img/bVOPum?w=60&amp;h=60" alt="GIF" title="GIF" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVOPup?w=1800&amp;h=60" src="https://static.alili.tech/img/bVOPup?w=1800&amp;h=60" alt="雪碧图" title="雪碧图" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>GIF图大小为27KB，雪碧图大小为53KB</p></blockquote>
<p>雪碧图稍大的体积绝对配的上它的优点：</p>
<ul>
<li>暂停播放</li>
<li>方便控制播放速度和播放速度的时间函数</li>
<li>控制播放顺序和次数</li>
</ul>
<p>如果你需要对动画效果进行控制的话，使用雪碧图不失为一种好方法，否则还是使用gif降低图片体积。</p>
<h2 id="articleHeader2">ImageMagick 将gif转换为png</h2>
<p><code>$ convert star.gif -coalesce +append star.practice.png</code></p>
<p>就是如上一条指令，接下来解释一下上面的指令：</p>
<ul>
<li>
<code>-coalesce</code> 表示将gif每一帧都补全为完整的一副图。由于为了压缩体积，gif每一帧的数据都是在前一帧的数据上进行增量覆盖。所以如果直接提取出每一帧的话，则会得到一组残缺不全的图片，大家可以去掉该参数试一试。</li>
<li>
<code>+append</code> 表示将提取出来的一组图片按照水平方式拼接起来，<code>-append</code> 则是按照垂直方式拼接起来。</li>
</ul>
<blockquote><p>由于图片是根据一定的方式进行编码的，有的时候对于同一幅gif图片，垂直拼接和水平拼接后的图片体积可能会差异比较大，最好都生成一幅，然后进行选定</p></blockquote>
<p>素材及DEMO地址：<a href="https://github.com/JasonKid/fezone/tree/master/CSS/CSS3/ImageMagick" rel="nofollow noreferrer" target="_blank">https://github.com/JasonKid/f...</a></p>
<h2 id="articleHeader3">DEMO</h2>
<p>最后附上雪碧图动画的运行DEMO，有CSS和CSS3两种方式，并可以进行暂停、加速、减速、反向操作</p>
<p>戳-&gt; <a href="https://github.com/JasonKid/fezone/tree/master/CSS/CSS3/ImageMagick" rel="nofollow noreferrer" target="_blank">Github: JasonKid fezone ImageMagick</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「CSS3」ImageMagick - 从gif建立雪碧图动画 - Sprite Sheet Animation

## 原文链接
[https://segmentfault.com/a/1190000009789225](https://segmentfault.com/a/1190000009789225)

