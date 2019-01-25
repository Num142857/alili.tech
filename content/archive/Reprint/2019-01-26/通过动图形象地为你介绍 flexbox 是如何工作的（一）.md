---
title: '通过动图形象地为你介绍 flexbox 是如何工作的（一）' 
date: 2019-01-26 2:30:18
hidden: true
slug: w4cd2jlg05p
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：Scott Domes &lt;br/&gt;<br>编译：<a href="https://www.zhihu.com/people/hu-zi-da-ha/activities" rel="nofollow noreferrer" target="_blank">胡子大哈</a> </p>
<p>翻译原文：<a href="http://huziketang.com/blog/posts/detail?postId=58aaadb2fc5b7f63e8c23f69" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58aaadb2fc5b7f63e8c23f69</a> &lt;br/&gt;<br>英文原文：<a href="https://medium.freecodecamp.com/an-animated-guide-to-flexbox-d280cf6afc35#.dhxg49o40" rel="nofollow noreferrer" target="_blank">How Flexbox works — explained with big, colorful, animated gifs</a></p>
<p><strong> 转载请注明出处，保留原文链接以及作者信息</strong></p>
<hr>
<h1 id="articleHeader0">通过动图形象地为你介绍 flexbox 是如何工作的</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414815?w=1000&amp;h=500" src="https://static.alili.tech/img/remote/1460000008414815?w=1000&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>flexbox 承诺将我们从万恶的纯 CSS 中拯救出来（如垂直对齐）。</p>
<p>flexbox 也正在实现它的这一目标，但是用户掌握这一新的模型也将会是个挑战。</p>
<p>因此在这里，我们将会用动图介绍 flexbox 是如何工作的，使得我们可以用它来做更好的布局。</p>
<p>flexbox 的潜在原则是使得布局更加灵活和直观。</p>
<p>为了完成这一目标，它允许容器自己来决定如何均匀地分布其中的元素——包括他们的尺寸和他们之间的间距。</p>
<p>这理论上来讲，听起来很美好。但是让我们来看一下实践中会发生什么。</p>
<p>在这篇文章中，我们会钻研5个通用 flexbox 原则。会探索它们都做了什么？你可以如何使用它们？以及它们的结果是什么样的？</p>
<h2 id="articleHeader1">属性1：display: flex</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414816?w=1000&amp;h=444" src="https://static.alili.tech/img/remote/1460000008414816?w=1000&amp;h=444" alt="" title="" style="cursor: pointer;"></span></p>
<p>在一个灰色背景的容器<code>div</code>里面，有四个颜色不同、尺寸不同的子<code>div</code>，此时每个<code>div</code>有默认的<code>display: block</code>，每一个的宽度也占满了一整行。</p>
<p>为了使用 flexbox，需要将你的<strong>容器</strong>放在 <strong>flex 容器中</strong> ，见如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: flex;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: flex;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414817?w=1000&amp;h=431" src="https://static.alili.tech/img/remote/1460000008414817?w=1000&amp;h=431" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到，发生了一点变化。你的四个<code>div</code>显示到了一行上，但也就仅此而已。可是你要知道，在这背后，你做了一件很有 power 的事情。<strong>你赋予了你的 div 一个叫做</strong> <em>flex上下文</em> <strong>的东西</strong>。</p>
<p>你现在可以把它应用在你的上下文中了，是不是比传统的 CSS 简单很多！</p>
<h2 id="articleHeader2">属性2：flex-direction</h2>
<p>一个 flexbox 容器有两个坐标轴：<strong>主轴</strong>和<strong>交叉轴</strong>，直观的来看如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000008414818?w=800&amp;h=450" src="https://static.alili.tech/img/remote/1460000008414818?w=800&amp;h=450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>默认情况下，元素都是从左到右地分布在主轴上</strong>。这就是为什么当你应用<code>display: flex</code>的时候，形状默认水平分布的原因。</p>
<p><code>flex-direction</code>，可以使你的主轴旋转。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: flex;
  flex-direction: column;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414819?w=1000&amp;h=431" src="https://static.alili.tech/img/remote/1460000008414819?w=1000&amp;h=431" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里有一个很重要的区别：<code>flex-direction: column</code>并不是把你的形状分布在交叉轴上。<strong>而是使主轴自身发生了旋转，从水平方向旋转到了垂直方向</strong>。</p>
<p>还有一些其他的<code>flex-direction</code>可选项，如：<code>row-reverse</code>和<code>column-reverse</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414820?w=1000&amp;h=431" src="https://static.alili.tech/img/remote/1460000008414820?w=1000&amp;h=431" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">属性3：justify-content</h2>
<p><em>justify-content</em>控制的是你在主轴上如何对齐元素。</p>
<p>这里我们需要对主轴和交叉轴的区别有更深一点的理解。首先让我们回到<code>flex-firection: row</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: row;
  <span class="hljs-attribute">justify-content</span>: flex-start;
}
</code></pre>
<p>使用 <em>justify-content</em>，你有五个选择：</p>
<ol>
<li><p>flex-start</p></li>
<li><p>flex-end</p></li>
<li><p>center</p></li>
<li><p>space-between</p></li>
<li><p>space-around</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414821?w=1000&amp;h=224" src="https://static.alili.tech/img/remote/1460000008414821?w=1000&amp;h=224" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>space-around</code>和<code>space-between</code>是最直观的。<strong><code>space-between</code>使每个元素之间有相同的距离，但是不包含元素和容器之间的距离。</strong></p>
<p><code>space-around</code>让每个元素块的两侧有相同的空隙距离。这就意味着<strong>最外层的元素和容器之间的距离，是两个元素之间距离的一半</strong>（每个元素块的左右两侧都贡献了一个不重叠的等距离，因此是两倍的间隙）。</p>
<p>最后小结：记住<strong><code>justify-content</code>是沿着主轴的，<code>flex-direction</code>是转换主轴的</strong>。这对你以后移动元素很关键。</p>
<h2 id="articleHeader4">属性4：align-items</h2>
<p>如果你已经消化了<code>justify-content</code>，那么<code>align-items</code>对你俩讲将是轻而易举的事了。</p>
<p><code>justify-content</code>是沿着主轴的，而<code>align-items</code>是应用到交叉轴上的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414822?w=800&amp;h=450" src="https://static.alili.tech/img/remote/1460000008414822?w=800&amp;h=450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>调整<code>flex-direction</code>，使得坐标轴看起来和上面的图一样。</p>
<p>接下来，我们一起看一下<code>align-items</code>命令。</p>
<ol>
<li><p>flex-start</p></li>
<li><p>flex-end</p></li>
<li><p>center</p></li>
<li><p>stretch</p></li>
<li><p>baseline</p></li>
</ol>
<p>前三个和<code>justify-content</code>没什么区别，后两个则有一些不同。</p>
<p><code>stretch</code>你的元素将会被拉伸充满整个交叉轴。<br><code>baseline</code>则会使你的文字底部对齐。见图知意。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414823?w=1000&amp;h=350" src="https://static.alili.tech/img/remote/1460000008414823?w=1000&amp;h=350" alt="" title="" style="cursor: pointer;"></span></p>
<p>（注意：如果用<code>align-items: stretch</code>，你必须要将元素的<code>height</code>设置成<code>auto</code>，否则<code>height</code>属性将会覆盖<code>stretch</code>）</p>
<p>对于<code>baseline</code>要意识到，如果你把文字标签拿掉，那么将会用元素的底部对齐来替代原来的效果，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414824?w=1000&amp;h=319" src="https://static.alili.tech/img/remote/1460000008414824?w=1000&amp;h=319" alt="" title="" style="cursor: pointer;"></span></p>
<p>为了更好的展示主轴和交叉轴，我们结合<code>justify-content</code>和<code>align-items</code>来看一下两个<code>flex-direction</code>的核心不同。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414825?w=1000&amp;h=522" src="https://static.alili.tech/img/remote/1460000008414825?w=1000&amp;h=522" alt="" title="" style="cursor: pointer;"></span></p>
<p>用<code>row</code>，元素被分布在水平主轴上。<br>用<code>column</code>，被分布在垂直主轴上。</p>
<p>在这两个 case 中，不论垂直还是水平方向，四个元素都是被居中的，但是这两种情况是绝对不能互相替换的。</p>
<h2 id="articleHeader5">属性5：align-self</h2>
<p><em><code>align-self</code></em>允许你手动操作一个特定元素的对齐方式。</p>
<p>对于一个元素而言，它基本上是对<code>align-items</code>的覆盖。尽管<code>align-self</code>默认值设成了<code>auto</code>，但是它和<code>align-items</code>所有的属性都是一样的，这也使得这个元素继承了容器的<code>align-items</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
#container {
  align-items: flex-start;
}
.square#one {
  align-self: center;
}
// 只有这个形状会居中。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
<span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">align-items</span>: flex-start;
}
.square<span class="hljs-selector-id">#one</span> {
  <span class="hljs-attribute">align-self</span>: center;
}
<span class="hljs-comment">// 只有这个形状会居中。</span>
</code></pre>
<p>我们来看一下它设置的结果是什么样的。对前两个形状设置不同的<code>align-self</code>，其他元素设置为<code>align-items: center</code>和<code>flex-direction: row</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008414826?w=1000&amp;h=314" src="https://static.alili.tech/img/remote/1460000008414826?w=1000&amp;h=314" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">结论</h2>
<p>尽管我们仅仅讲了 flexbox 的皮毛，但是这些命令应该也足够你应付很多基本布局了。</p>
<p>如果你还想看到更多的 GIF flexbox 教程，或者这篇教程对你有所帮助，请在下面给我点赞吧，或者给我留言。</p>
<p>感谢你的阅读！</p>
<hr>
<p>我最近正在写一本<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过动图形象地为你介绍 flexbox 是如何工作的（一）

## 原文链接
[https://segmentfault.com/a/1190000008414812](https://segmentfault.com/a/1190000008414812)

