---
title: 'visual viewport和layout viewport' 
date: 2019-02-06 2:30:09
hidden: true
slug: 7xayuq02em
categories: [reprint]
---

{{< raw >}}

                    
<p>首先了解几个概念:</p>
<ul>
<li><p>物理像素：买手机的时候会有一个<code> n x m </code>的分辨率，那是屏幕的<code>n x m</code>个呈像的点，一个点（小方格）为一个物理像素。它是屏幕能显示的最小粒度.</p></li>
<li><p>CSS像素：就是CSS里的Px，上面已经讲了是viewport中的一个小方格。</p></li>
<li><p>像素密度：即dpi或ppi，屏幕每英寸所占的物理像素点。</p></li>
</ul>
<p><a href="http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml" rel="nofollow noreferrer" target="_blank">像素密度如何去计算请戳我</a></p>
<p>本文主要是说明<code>layout viewport</code>和<code>visual viewport</code>两者的区别和在移动端上得表现。</p>
<p>当你在写移动端页面的时候，经常会看到这样一个元素信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no&quot; >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"</span> &gt;</code></pre>
<p>其中<code>name</code>属性声明了这个meta标签元素想要声明的内容的名称,<code>content</code>就是声明的具体内容了。</p>
<p>这也是这篇文章想要探讨的一些问题。</p>
<p>不管你是用PC端还是移动端的浏览器去访问一个页面的时候。你所看到的浏览器的窗口就是你<code>visual viewport</code>（通过<code>window.innerWidth/height</code>获取），对于移动端来说，就是你通过浏览器所看到的那部分大小，它的度量单位是px(css中的像素)。这个<code>visual viewport</code>通常是可以变化的，例如你对屏幕进行缩放，这样就可以改变<code>visual viewport</code>的大小，或者你移动屏幕的滚轮，这样就可以改变<code>visual viewport</code>的位置。</p>
<p>和<code>visual viewport</code>相对应的另外一个<code>viewport</code>叫<code>layout viewport</code>。它就相当于一个大的<code>box</code>，所有的内容都要在这个<code>box</code>里面显示。你通过<code>visual viewport</code>所看到的内容就是<code>layout viewport</code>上的部分内容。</p>
<h2 id="articleHeader0">
<code>visual viewport</code>和<code>layout viewport</code>到底又有什么区别和联系呢?</h2>
<blockquote><p>把layout viewport想像成为一张不会变更大小或者形状的大图。现在想像你有一个小一些的框架，你通过它来看这张大图。（译者：可以理解为「管中窥豹」）这个小框架的周围被不透明的材料所环绕，这掩盖了你所有的视线，只留这张大图的一部分给你。你通过这个框架所能看到的大图的部分就是visual viewport。当你保持框架（缩小）来看整个图片的时候，你可以不用管大图，或者你可以靠近一些（放大）只看局部。你也可以改变框架的方向，但是大图（layout viewport）的大小和形状永远不会变。</p></blockquote>
<p>当你进行页面缩放的时，你可以想象你拿着这个小框架离这张大图越来越近了，那么你所看到的大图的内容也越来越少了。原本在未缩放的页面上看起来很小的尺寸，现在通过viewport看上去变大了，事实上这部分的css的px值并没有变化，仅仅是因为进行放大后，css的1px的值所占的屏幕分辨率的值变大了。</p>
<p>同理，当你缩小整个页面的时候，看到大图的内容也越来越多，同时，原本看起来很大的尺寸，现在再通过viewport看上去的时候又变小了。同理,css的1px的值并没有发生变化,但是1px值所占的屏幕分辨率的值变小了。</p>
<p><strong>在放大和缩小的过程中，<code>visual viewport</code>和<code>layout viewport</code>的宽，高都没发生任何的变化,变化的仅仅就像是用户拿着这个<code>visual viewport</code>去远离或者靠近<code>layout viewport</code>，在远离或者靠近的过程中，就会呈现出缩放的效果来。</strong></p>
<h2 id="articleHeader1">那么<code>layout viewport</code>到底有多宽呢？</h2>
<p>初始状态：<br><span class="img-wrap"><img data-src="/img/bVzCUt" src="https://static.alili.tech/img/bVzCUt" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>例如chrome下，初始<code>layout viewport</code>的宽度是980px，这个时候整个页面是处于完全缩小的状态下，通过<code>visual viewport</code>是可以看到<code>layout viewport</code>中的所有内容的，就好像你拿着<code>visual viewport</code>，离<code>layout viewport</code>到正好可以看到<code>layout viewport</code>所有内容的距离为止。</p>
<p>即在初始状态下,没有设置<strong>&lt;meta name="viewport"&gt;</strong>的情况下，<code>layout viewport</code>依据不同浏览器的特性，有一个初始值，并处于完全缩小的状态。例如 <a href="http://www.12306.cn/mormhweb/" rel="nofollow noreferrer" target="_blank">12306官网</a></p>
<p><span class="img-wrap"><img data-src="/img/bVzCUu" src="https://static.alili.tech/img/bVzCUu" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>声明了&lt; meta name="viewport"&gt;的状态下：</p>
<p>当通过<code>meta</code>标签申明了<code>viewport</code>的宽度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta name=&quot;viewport&quot; content=&quot;width=300&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=300"</span>&gt;</code></pre>
<p><code>layout viewport</code>初始化的宽度就是<code>300px</code>,并处于完全适应于<code>visual viewport</code>的状态。即通过<code>visual viewport</code>可以看到<code>layout viewport</code>中所有的内容(不存在滚轮的情况下)。</p>
<p><span class="img-wrap"><img data-src="/img/bVzCUT" src="https://static.alili.tech/img/bVzCUT" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当你拿着手机屏幕进行翻转的时候：</p>
<ul>
<li><p>如果<code>visual viewport</code> 的宽度 &gt; <code>layout viewport</code> 的宽度，那么<code>viewport</code>需要<code>zoom in</code>,以适应<code>visual viewport</code>的宽度</p></li>
<li><p>如果<code>visual viewport</code> 的宽度 &lt; <code>layout viewport</code>的宽度，那么<code>viewport</code>需要<code>zoom out</code>，以适应<code>visual viewport</code>的宽度</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta name=&quot;viewport&quot; content=&quot;width:device-width&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width:device-width"</span>&gt;</code></pre>
<p>device-width会将<code>手机横向物理像素/转化系统</code>(<a href="http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml" rel="nofollow noreferrer" target="_blank">具体的换算见请戳我</a>)作为其值，并重置相应的<code>layout viewport</code>的值，并适应<code>visual viewport</code>。</p>
<p>此时，不管手机屏幕是否翻转时，<code>visual viewport</code> 都和 <code>layout viewport</code>的值相同。而不会出现缩放的情况。不过用户是可以通过进行缩放操作的。</p>
<p>如果设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"</span>&gt;</code></pre>
<p>此时用户不能对网页进行缩放。</p>
<p>参考文章：</p>
<ul>
<li><p><a href="http://weizhifeng.net/viewports.html" rel="nofollow noreferrer" target="_blank">两个viewport的故事</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004538413">移动适配(二)</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004524243" target="_blank">移动适配(一)</a></p></li>
<li><p><a href="http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml" rel="nofollow noreferrer" target="_blank">深入了解viewport和px</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag" rel="nofollow noreferrer" target="_blank">在移动浏览器中使用viewport元标签控制布局</a></p></li>
<li><p><a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW19" rel="nofollow noreferrer" target="_blank">Safari Web Content Guide</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
visual viewport和layout viewport

## 原文链接
[https://segmentfault.com/a/1190000006068808](https://segmentfault.com/a/1190000006068808)

