---
title: '我理解的关于Vue.nextTick()的正确使用' 
date: 2019-01-25 2:30:23
hidden: true
slug: st3zqi4mdmf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">关于作者</h3>
<blockquote>
<p>程序开发人员，不拘泥于语言与技术，目前主要从事PHP和前端开发，使用Laravel和VueJs，App端使用Apicloud混合式开发。合适和够用是最完美的追求。</p>
<p>个人网站：<a href="http://www.linganmin.cn" rel="nofollow noreferrer" target="_blank">http://www.linganmin.cn</a></p>
<p>最近刚写了一个手机在线播放的H5电影站：<a href="http://www.ifilm.ltd" rel="nofollow noreferrer" target="_blank">http://www.ifilm.ltd</a></p>
</blockquote>
<h3 id="articleHeader1">什么是Vue.nextTick()</h3>
<p>官方文档解释如下：</p>
<blockquote><p>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。</p></blockquote>
<p>我理解的官方文档的这句话的侧重点在最后那半句<code>获取更新后的DOM</code>，获取更新后的DOM言外之意就是什么操作需要用到了更新后的DOM而不能使用之前的DOM或者使用更新前的DOM或出问题，所以就衍生出了这个<code>获取更新后的DOM</code>的Vue方法。所以放在<code>Vue.nextTick()</code>回调函数中的执行的应该是会对DOM进行操作的 js代码，比如<code>Swiper</code>扩展包的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false
                });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> swiper = <span class="hljs-keyword">new</span> Swiper(<span class="hljs-string">'.swiper-container'</span>, {
                    <span class="hljs-attr">pagination</span>: <span class="hljs-string">'.swiper-pagination'</span>,
                    <span class="hljs-attr">nextButton</span>: <span class="hljs-string">'.swiper-button-next'</span>,
                    <span class="hljs-attr">prevButton</span>: <span class="hljs-string">'.swiper-button-prev'</span>,
                    <span class="hljs-attr">paginationClickable</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">spaceBetween</span>: <span class="hljs-number">30</span>,
                    <span class="hljs-attr">centeredSlides</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">autoplay</span>: <span class="hljs-number">2500</span>,
                    <span class="hljs-attr">autoplayDisableOnInteraction</span>: <span class="hljs-literal">false</span>
                });</code></pre>
<h3 id="articleHeader2">什么时候需要用的Vue.nextTick()</h3>
<ol>
<li><p>你在Vue生命周期的<code>created()</code>钩子函数进行的DOM操作一定要放在<code>Vue.nextTick()</code>的回调函数中。原因是什么呢，原因是在<code>created()</code>钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进<code>Vue.nextTick()</code>的回调函数中。与之对应的就是<code>mounted</code>钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。</p></li>
<li><p>在数据变化后要执行的<code>某个操作</code>，而这个<code>操作</code>需要使用随数据改变而改变的DOM结构的时候，这个<code>操作</code>都应该放进<code>Vue.nextTick()</code>的回调函数中。</p></li>
</ol>
<p>原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。<br>当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。</p>
<p><a href="http://www.linganmin.cn/" rel="nofollow noreferrer" target="_blank">安小下同学</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我理解的关于Vue.nextTick()的正确使用

## 原文链接
[https://segmentfault.com/a/1190000008570874](https://segmentfault.com/a/1190000008570874)

