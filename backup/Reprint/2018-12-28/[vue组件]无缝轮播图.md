---
title: '[vue组件]无缝轮播图' 
date: 2018-12-28 2:30:11
hidden: true
slug: c9rdlw7bkum
categories: [reprint]
---

{{< raw >}}

                    
<p>该文章请对应源码阅读，<a href="https://github.com/lfyfly/vue-basic-components/blob/master/src/components/carousel/vue-carousel.vue" rel="nofollow noreferrer" target="_blank">github源码地址</a>，<a href="https://github.com/lfyfly/vue-basic-components/blob/master/src/components/demos/carousel/vue-carousel-demo.vue" rel="nofollow noreferrer" target="_blank">DEMO使用地址</a>，<a href="http://lfyfly.gitee.io/vue-basic-components/live-demos/#/vue-carousel" rel="nofollow noreferrer" target="_blank">线上DEOM展示</a>。</p>
<p>做一个vue基础组件系列，使用vue以最简洁的方式实现常用组件，可用于快速二次定制化开发。</p>
<p><strong>(๑•̀ㅂ•́)و✧不定时更新，欢迎 star，讨论，指教。</strong></p>
<h1 id="articleHeader0">实现原理</h1>
<h2 id="articleHeader1">1.  无缝滚动预处理</h2>
<p>为了无缝滚动，在传进来的imgs数组首部增加末尾元素，在尾部追加首元素,看图1</p>
<p><span class="img-wrap"><img data-src="/img/bVWPsv?w=853&amp;h=357" src="https://static.alili.tech/img/bVWPsv?w=853&amp;h=357" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">2. 数据绑定视图</h2>
<p>（1）activeIndex为当前显示的轮播图索引，然后只需要对activeIndex进行操作，watch监听activeIndex的变化，一旦到达了边界就重置activeIndex，显示出对应的图片。过渡动画则由css3的transition属性完成。<br>（2）isResetIndex为watch监听的activeIndex变化时，判断此次变化是否activeIndex已经到达了边界，如果是则为true，同时需要重置activeIndex（且此过程为瞬间完成，无过渡动画，详情见图2），反之false</p>
<p><span class="img-wrap"><img data-src="/img/bVWPsw?w=816&amp;h=198" src="https://static.alili.tech/img/bVWPsw?w=816&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">3.边界变化的两种情况</h2>
<p><span class="img-wrap"><img data-src="/img/bVWPs6?w=649&amp;h=572" src="https://static.alili.tech/img/bVWPs6?w=649&amp;h=572" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vue组件]无缝轮播图

## 原文链接
[https://segmentfault.com/a/1190000011584322](https://segmentfault.com/a/1190000011584322)

