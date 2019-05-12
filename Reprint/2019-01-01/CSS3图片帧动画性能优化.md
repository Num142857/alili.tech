---
title: 'CSS3图片帧动画性能优化' 
date: 2019-01-01 2:30:07
hidden: true
slug: 6tldylgso5i
categories: [reprint]
---

{{< raw >}}

                    
<p>有的复杂动画效果我们没办法用CSS3直接完成，设计师会给出图片序列帧，我们合成雪碧图，通过steps改变background-position的方式来实现动画，如Demo: <a href="http://jianxiujiucan.cn/test/ani/ani-bg.html" rel="nofollow noreferrer" target="_blank">http://jianxiujiucan.cn/test/...</a><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ico-vip{width: 44px;height: 30px;overflow: hidden;position: relative;background: url(spr-vip.png) no-repeat;animation: aniVip 1.5s steps(34) infinite;}
@keyframes aniVip {
    0%{background-position: 0 0;}  
    100%{background-position: -1564px 0}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ico-vip</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">44px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;<span class="hljs-attribute">overflow</span>: hidden;<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(spr-vip.png) no-repeat;<span class="hljs-attribute">animation</span>: aniVip <span class="hljs-number">1.5s</span> <span class="hljs-built_in">steps</span>(34) infinite;}
@<span class="hljs-keyword">keyframes</span> aniVip {
    0%{<span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;}  
    100%{<span class="hljs-attribute">background-position</span>: -<span class="hljs-number">1564px</span> <span class="hljs-number">0</span>}
}</code></pre>
<p>但是使用这种写法会导致<strong>配置比较差</strong>的电脑CPU消耗比较明显。在Chrome按shift+esc查看任务管理器，可以看到CPU的占用会变化，这个值的最高点还是比较高的。<br><span class="img-wrap"><img data-src="/img/remote/1460000011058300" src="https://static.alili.tech/img/remote/1460000011058300" alt="cpu" title="cpu" style="cursor: pointer;"></span><br>background-position不断的改变会造成浏览器不断重绘而导致CPU上升，可以点开Chrome开发者工具中的Layers看到，绘制一直在不断地改变：<br><span class="img-wrap"><img data-src="/img/remote/1460000011057418" src="https://static.alili.tech/img/remote/1460000011057418" alt="layer" title="layer" style="cursor: pointer;"></span></p>
<p>在网上查了一下，有同学建议不要用background-position，可以用translate来代替。于是尝试了一下：<a href="http://jianxiujiucan.cn/test/ani/ani.html" rel="nofollow noreferrer" target="_blank">http://jianxiujiucan.cn/test/...</a><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ico-vip{width: 44px;height: 30px;overflow: hidden;}
.ico-vip:after{content:''; width: 1564px;height: 30px;background: url(spr-vip.png) no-repeat;animation: aniVip 1.5s steps(34) infinite;display: block;}
@keyframes aniVip {
    0%{transform: translate3d(0,0,0)}  
    100%{transform: translate3d(-1564px,0,0)}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ico-vip</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">44px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;<span class="hljs-attribute">overflow</span>: hidden;}
<span class="hljs-selector-class">.ico-vip</span><span class="hljs-selector-pseudo">:after</span>{<span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">1564px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(spr-vip.png) no-repeat;<span class="hljs-attribute">animation</span>: aniVip <span class="hljs-number">1.5s</span> <span class="hljs-built_in">steps</span>(34) infinite;<span class="hljs-attribute">display</span>: block;}
@<span class="hljs-keyword">keyframes</span> aniVip {
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0)}  
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-1564px,0,0)}
}</code></pre>
<p>这种写法不会导致重绘，可以减少CPU的消耗。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011058301" src="https://static.alili.tech/img/remote/1460000011058301" alt="cpu" title="cpu" style="cursor: pointer;"></span></p>
<p>测试在比较差的机器上测试，CPU可以从20%减少到4%，这个方法还是比较可用的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3图片帧动画性能优化

## 原文链接
[https://segmentfault.com/a/1190000011057044](https://segmentfault.com/a/1190000011057044)

