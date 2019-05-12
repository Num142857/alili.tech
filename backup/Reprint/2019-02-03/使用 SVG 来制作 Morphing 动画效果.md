---
title: '使用 SVG 来制作 Morphing 动画效果' 
date: 2019-02-03 2:30:40
hidden: true
slug: bkmzdr7lr29
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">何为Morphing动画</h3>
<p>开始之前，先来了解下什么是Morphing动画。所谓Morphing动画是表示，同一个模型，从一个形状变到另一个形状。如下图所示，从形状1渐变到形状2，再从形状2渐变到形状3，最后从形状3渐变到形状1，以此循环往复。</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/80fb7cd1de3afec1.gif" src="https://static.alili.techhttp://i2.buimg.com/567571/80fb7cd1de3afec1.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看到像这样的Morphing动画简直是为SVG量身定制的，因为SVG中的路径原本就是由很多的坐标点构成的（点连成线），做一些形状变化只要移动坐标点就可以了。</p>
<p>简单的来说，在SVG要实现Morphing动画，主要是靠移动形状路径上的坐标点从而达到从一个形状变到另一个形状的动画效果。并且由于这个形状是从一个形状变化而来，所以路径上的坐标数量要完全相同，不同的只是坐标的位置不同而已。</p>
<h3 id="articleHeader1">如何制作Morphing动画</h3>
<p>要制作Morphing动画，首先得用矢量编辑软件比如Adobe Illustrator或者是Inscape来设计好相关的形状并得到相关路径（path）的数据信息。</p>
<p>比如，如果你要做如下图所示的两个形状之间变化的Morphing动画，就需要在设计软件中先设计好两个形状。当然这里要注意一点的事是，两个图形的坐标数量要一样，只是位置不同而已。了解<br>Adobe Illustrator的应该会明白，一般在设计好基本的形状的时候，使用贝赛尔曲线工具，可以做很多的变化，从而使用一个基本的形状可以做出不同形状的变化。</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/a8cc448256e1e1ac.gif" src="https://static.alili.techhttp://i2.buimg.com/567571/a8cc448256e1e1ac.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">实战Morphing动画</h3>
<p>下面我们来小小的练习一下，实现上图中的效果。</p>
<p>首先在设计软件中，这里使用的是Adobe Illustrator来设计一个基本的形状，如下图所示：</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/4a9cdf493fd560af.png" src="https://static.alili.techhttp://i2.buimg.com/567571/4a9cdf493fd560af.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后复制一份新建一个文档，在它基础上使用贝赛尔曲线工具，稍微对几个坐标点做下变化得到下面的图形：</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/031f5ad8f4050a06.png" src="https://static.alili.techhttp://i2.buimg.com/567571/031f5ad8f4050a06.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这就得到了两个矢量图形，然后分别导出SVG格式，得到Path的信息：</p>
<h4><strong>path1</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M200,51.75A51.75,51.75,0,0,0,99.2,35.27a83,83,0,1,0,65.13,65.67A51.76,51.76,0,0,0,200,51.75Z&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dns"><code style="word-break: break-word; white-space: initial;">&lt;path d="M<span class="hljs-number">200,51.75A51</span>.<span class="hljs-number">75,51.75,0</span>,<span class="hljs-number">0,0,99.2</span>,<span class="hljs-number">35.27a83,83</span>,<span class="hljs-number">0,1,0,65</span>.<span class="hljs-number">13,65.67A51</span>.<span class="hljs-number">76,51.76,0</span>,<span class="hljs-number">0,0,200,51</span>.<span class="hljs-number">75</span>Z" /&gt;</code></pre>
<h4><strong>path2</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<path d=&quot;M140,51.75A51.75,51.75,0,0,0,99.2,35.27a83,83,0,1,0,65.13,65.67A51.76,51.76,0,0,0,140,51.75Z&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dns"><code style="word-break: break-word; white-space: initial;">&lt;path d="M<span class="hljs-number">140,51.75A51</span>.<span class="hljs-number">75,51.75,0</span>,<span class="hljs-number">0,0,99.2</span>,<span class="hljs-number">35.27a83,83</span>,<span class="hljs-number">0,1,0,65</span>.<span class="hljs-number">13,65.67A51</span>.<span class="hljs-number">76,51.76,0</span>,<span class="hljs-number">0,0,140,51</span>.<span class="hljs-number">75</span>Z" /&gt;</code></pre>
<p>得到path信息之后，接下来就是来实现动画效果来。</p>
<p>这里我们需要借助于一个小小的轻量级的js动画库<a href="https://github.com/juliangarnier/anime" rel="nofollow noreferrer" target="_blank">anime</a>，这个库非常的小，而且没有任何的依赖，才几百行。是一款功能强大的Javascript动画库插件。anime.js可以和CSS3属性，SVG，DOM元素和JS对象一起工作，制作出各种高性能，平滑过渡的动画效果。</p>
<p>具体的使用方法就不详细介绍，可以去<a href="https://github.com/juliangarnier/anime" rel="nofollow noreferrer" target="_blank">官网</a>看相关实例。</p>
<p>下面就针对SVG来介绍下使用<strong>anime</strong>来实现Morphing动画。根据Morphing动画原理，我们现在是要实现从<strong>path1</strong>形状平滑的过度到<strong>path2</strong>的动画效果。</p>
<h4><strong>anime api</strong></h4>
<p><strong>获取目标元素</strong></p>
<p>在<strong>anime</strong>中要来编写动画效果，首先是选择你要运动的元素，这里使用浏览器默认的方法来得到目标元素：</p>
<table>
<thead><tr>
<th>选择器</th>
<th>示例</th>
</tr></thead>
<tbody><tr>
<td>DOM元素</td>
<td>document.getElementsByTagName("path")[0]]</td>
</tr></tbody>
</table>
<p><strong>参数</strong></p>
<p>这里简单介绍下，我们将要使用的一些参数</p>
<table>
<thead><tr>
<th>名字</th>
<th>默认值</th>
<th>类型</th>
</tr></thead>
<tbody>
<tr>
<td>delay(动画延迟)</td>
<td>0</td>
<td>数字</td>
</tr>
<tr>
<td>duration(动画运行时间)</td>
<td>1000</td>
<td>数字</td>
</tr>
<tr>
<td>autoplay(是否自动开始)</td>
<td>ture</td>
<td>布尔值</td>
</tr>
<tr>
<td>easing(缓动曲线)</td>
<td>easeOutElastic</td>
<td>使用console log anime.easings可以输出它支持的一些欢动曲线方法</td>
</tr>
<tr>
<td>loop(是否循环播放)</td>
<td>false</td>
<td>布尔值或者是具体的整数</td>
</tr>
</tbody>
</table>
<p>具体到我们这个效果，其实我们要改变的就是SVG中Path路径的值，使用anime结合上面介绍的方法可以很轻松的来实现这个效果，如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="anime({
  targets: [document.getElementsByTagName(&quot;path&quot;)[0]],
  d: &quot;M140,51.75A51.75,51.75,0,0,0,99.2,35.27a83,83,0,1,0,65.13,65.67A51.76,51.76,0,0,0,140,51.75Z&quot;,
  duration: 1000,
  loop: true,
  direction: &quot;alternate&quot;,
  easing: &quot;linear&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">anime</span>({
  <span class="hljs-attribute">targets</span>: [document.<span class="hljs-built_in">getElementsByTagName</span>(<span class="hljs-string">"path"</span>)[<span class="hljs-number">0</span>]],
  d: <span class="hljs-string">"M140,51.75A51.75,51.75,0,0,0,99.2,35.27a83,83,0,1,0,65.13,65.67A51.76,51.76,0,0,0,140,51.75Z"</span>,
  duration: <span class="hljs-number">1000</span>,
  loop: true,
  direction: <span class="hljs-string">"alternate"</span>,
  easing: <span class="hljs-string">"linear"</span>
});</code></pre>
<p>上面的代码中，<strong>d</strong>就是我们要改变的属性的值。这里注意下<strong>duration</strong>这个参数，它是用来指定动画运行的方向的，主要是三个值<strong>normal</strong>、<strong>reverse</strong>和<strong>alternate</strong>，这里选择是<strong>alternate</strong>即动画动画轮流反向播放。</p>
<p>OK，就这么简单我们就实现了一个简单Morphing动画。充分发挥你的想象力，我们可以实现更有趣的Morphing动画。</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/a8cc448256e1e1ac.gif" src="https://static.alili.techhttp://i2.buimg.com/567571/a8cc448256e1e1ac.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>最近做了一个关于SVG的应用的技术分享网站<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">svgtrick.com</a>，会同步一些文章到这里来，更多的关于SVG方面的技术知识可以去<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">网站</a>看看。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 SVG 来制作 Morphing 动画效果

## 原文链接
[https://segmentfault.com/a/1190000006940953](https://segmentfault.com/a/1190000006940953)

