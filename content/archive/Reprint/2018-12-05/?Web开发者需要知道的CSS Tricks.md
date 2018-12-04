---
title: '?Web开发者需要知道的CSS Tricks' 
date: 2018-12-05 2:30:09
hidden: true
slug: mkcxr12qu6l
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV8leu?w=2700&amp;h=1500" src="https://static.alili.tech/img/bV8leu?w=2700&amp;h=1500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>作为一名Web开发者，CSS是必备技能之一，我一直以为自己对CSS的掌握已经够用了，直到读Lea Verou的《CSS揭秘》时，我发现自己充其量就算个会打CS的选手，书中针对我们常见的网页设计难题从不同的角度提出了多种实用又优雅的解决方案，在这里强烈的推荐给每一位从事前端相关的开发者，相信你一定会有所收获。</p>
<p>为了以后可以更爽的复制粘贴，笔者把自己的收获和工作中常用的一些CSS小样式总结成这份文档，一共包含43个CSS的小样式（持续更新…）。文档还有很多不足的地方，还请各位多多指教，如果觉得对你有一点帮助，欢迎大家一起来完善?~</p>
<h2 id="articleHeader0">What's included</h2>
<h3 id="articleHeader1">边框与背景</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/translucent-borders" rel="nofollow noreferrer" target="_blank">半透明边框</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/multiple-borders" rel="nofollow noreferrer" target="_blank">多重边框</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/inner-rounding" rel="nofollow noreferrer" target="_blank">边框内圆角</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/extended-bg-position" rel="nofollow noreferrer" target="_blank">背景定位</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/stripes-background" rel="nofollow noreferrer" target="_blank">条纹背景</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/one-pixel-line" rel="nofollow noreferrer" target="_blank">1px 线/边</a></li>
</ul>
<h3 id="articleHeader2">常见形状</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/ellipse" rel="nofollow noreferrer" target="_blank">圆与椭圆</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/parallelogram" rel="nofollow noreferrer" target="_blank">平行四边形</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/bevel-corners" rel="nofollow noreferrer" target="_blank">切角效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/pie-chart" rel="nofollow noreferrer" target="_blank">简易饼图</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/poptip" rel="nofollow noreferrer" target="_blank">提示气泡</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/polygon" rel="nofollow noreferrer" target="_blank">其他多边形</a></li>
</ul>
<h3 id="articleHeader3">视觉效果</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/single-projection" rel="nofollow noreferrer" target="_blank">常见投影</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/irregular-projection" rel="nofollow noreferrer" target="_blank">不规则投影</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/frosted-glass" rel="nofollow noreferrer" target="_blank">毛玻璃效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/zebra-stripes" rel="nofollow noreferrer" target="_blank">斑马条纹</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/text-effects" rel="nofollow noreferrer" target="_blank">文字特效</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/circular-text" rel="nofollow noreferrer" target="_blank">环形文字</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/line-breaks" rel="nofollow noreferrer" target="_blank">插入换行</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/image-slider" rel="nofollow noreferrer" target="_blank">图片对比控件</a></li>
</ul>
<h3 id="articleHeader4">用户体验</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/mouse-cursor" rel="nofollow noreferrer" target="_blank">选择合适的鼠标光标</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/extend-hit-area" rel="nofollow noreferrer" target="_blank">扩大可点击区域</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/custom-checkbox" rel="nofollow noreferrer" target="_blank">自定义复选框</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/custom-radio" rel="nofollow noreferrer" target="_blank">自定义单选框</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/input-align" rel="nofollow noreferrer" target="_blank">输入框完美居中</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/shadow-weaken-background" rel="nofollow noreferrer" target="_blank">通过阴影弱化背景</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/blurry-weaken-background" rel="nofollow noreferrer" target="_blank">通过模糊弱化背景</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/text-underline" rel="nofollow noreferrer" target="_blank">自定义文字下划线</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/scrollbar" rel="nofollow noreferrer" target="_blank">自定义scroll滚动条</a></li>
</ul>
<h3 id="articleHeader5">结构布局</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/fluid-fixed" rel="nofollow noreferrer" target="_blank">全背景等宽内容居中</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/sticky-footer" rel="nofollow noreferrer" target="_blank">绝对底部</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/centering-known" rel="nofollow noreferrer" target="_blank">水平垂直居中</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/holy-grail-layout?v=1" rel="nofollow noreferrer" target="_blank">圣杯布局</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/double-wing-layout?v=1" rel="nofollow noreferrer" target="_blank">双飞翼布局</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/class-order-layout" rel="nofollow noreferrer" target="_blank">类订单布局</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/flexbox-layout" rel="nofollow noreferrer" target="_blank">Flex 布局</a></li>
</ul>
<h3 id="articleHeader6">动画过渡</h3>
<ul>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/bounce" rel="nofollow noreferrer" target="_blank">弹跳效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/elastic" rel="nofollow noreferrer" target="_blank">弹性过度</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/blink" rel="nofollow noreferrer" target="_blank">闪烁效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/typing" rel="nofollow noreferrer" target="_blank">打字效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/shake" rel="nofollow noreferrer" target="_blank">抖动效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/smooth" rel="nofollow noreferrer" target="_blank">无缝平滑效果</a></li>
<li><a href="https://lhammer.cn/You-need-to-know-css/#/circular-smooth" rel="nofollow noreferrer" target="_blank">延轨迹平滑效果</a></li>
</ul>
<p>文档中代码支持实时调试预览，若有疑问或者建议请直接在文档下方留言，如果你有更有趣更实用的技巧，欢迎PR~</p>
<p>文档：<a href="https://lhammer.cn/You-need-to-know-css/#/" rel="nofollow noreferrer" target="_blank">You-need-to-know-css</a></p>
<p>Github：<a href="https://github.com/l-hammer/You-need-to-know-css" rel="nofollow noreferrer" target="_blank">LHammer/You-need-to-know-css</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
?Web开发者需要知道的CSS Tricks

## 原文链接
[https://segmentfault.com/a/1190000014416211](https://segmentfault.com/a/1190000014416211)

