---
title: 'WEB移动端粘黏吸顶效果的解决方案' 
date: 2019-01-26 2:30:18
hidden: true
slug: 5h931n16414
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接: <a href="http://fyerl.me/Web%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%B2%98%E9%BB%8F%E5%90%B8%E9%A1%B6%E6%95%88%E6%9E%9C%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" rel="nofollow noreferrer" target="_blank">Fyerl's Blog</a></p>
<p><span class="img-wrap"><img data-src="/img/bVJMAs?w=360&amp;h=240" src="https://static.alili.tech/img/bVJMAs?w=360&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>一般的header吸顶，通常是给上一个fixed定位便可实现，而类似于上图这样的“粘黏吸顶”，也是一个比较常见的需求</p>
<p>“粘黏吸顶”大概的思路是这样：首先，给吸顶栏一个absolute或者relative定位，通过js去监听scroll事件触发一个判断吸顶栏高度的函数，当吸顶栏的高度距离可视区域顶部小于等于0时，将其定位方式替换成fixed，大于0时再替换回absolute或者relative</p>
<p>以上的思路在PC端和安卓端均是可行的，但在iOS上，判断高度的函数却并不会随着scroll事件每次都触发，而是在滑动停止后才去触发这个函数</p>
<p>google一下“iOS onscroll event delay”得知，这是iOS8作出的改变，<strong>在web页面滚动时，不触发和执行js</strong><br><a href="http://developer.telerik.com/featured/scroll-event-change-ios-8-big-deal/" rel="nofollow noreferrer" target="_blank">http://developer.telerik.com/...</a></p>
<p>这里我只是需要实现一个吸顶效果，不涉及其他逻辑代码，如果一定要通过scroll触发的话，只能使用iSroll等其他第三方库来取代iOS的原生滚动</p>
<p>回到吸顶问题，为了一个效果引入一个第三方库的成本有点大，于是又寻找了一下，发现了一个知道但是没有重视过的position属性sticky，顾名思义，这个属性的作用就是粘黏，理论上是不需要通过js就能实现“粘黏吸顶”的，但是这个属性在PC端以及安卓移动端的表现不尽人意，兼容性还是差了点，然而，在iOS端的表现却非常出色，iOS6.1以上的系统均支持</p>
<p><span class="img-wrap"><img data-src="/img/bVJMHb?w=714&amp;h=904" src="https://static.alili.tech/img/bVJMHb?w=714&amp;h=904" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>所以最后的解决方案就是：<br>首先判断当前系统，如果是Android，就通过常规的监听scroll事件并使用fixed定位；iOS便使用sticky定位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Android
.tab-box-fixed {
  position: fixed;
  z-index: 5;
}
//iOS
.tab-box-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//Android</span>
<span class="hljs-selector-class">.tab-box-fixed</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
}
<span class="hljs-comment">//iOS</span>
<span class="hljs-selector-class">.tab-box-sticky</span> {
  <span class="hljs-attribute">position</span>: -webkit-sticky;
  <span class="hljs-attribute">position</span>: sticky;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB移动端粘黏吸顶效果的解决方案

## 原文链接
[https://segmentfault.com/a/1190000008489692](https://segmentfault.com/a/1190000008489692)

