---
title: 'CSS标题线（删除线贯穿线效果）实现之一二' 
date: 2019-02-12 2:30:12
hidden: true
slug: zywoz0p27h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">缘起</h2>
<p>其实看到这个问题，心里已经默默把代码已经码好了~，不就想下面这样嘛：<br><a href="http://output.jsbin.com/paqajep/" rel="nofollow noreferrer" target="_blank">JSBIN代码示例</a></p>
<p>嗯，是的，我们日常确实基本上就是用的这种方式，也没啥问题呀~，来个背景色定下位就欧拉欧拉的了。</p>
<p>不过，因为一次问题需要，发现还是有需要多了解下的。</p>
<hr>
<p>来，请看下图，这个需求是这样子的，实现这样子的效果（可以先构思下实现代码，看下思路是不是差不多的呢？）</p>
<p><span class="img-wrap"><img data-src="/img/bVtQXT" src="https://static.alili.tech/img/bVtQXT" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，这个线后面有背景图，随着屏幕尺寸渐宽时，会盖到背景图上，缩小时，则不会盖在背景图上，这就不能使用我们平常的填充背景色的写法了，只能另寻他路（想到有什么好的方法实现了么？）</p>
<p>所以这个问题是：<em>因屏幕的伸展收缩会导致内容区所能容纳的内容不一，从而导致高度不一，各个元素也是随着屏幕时高时底，背景色的用法无法生效，有何好的解决办法？</em></p>
<p>当然，你有可能会说这是特例，可以直接上图，固然这种方式可以，但是，有很多这样的区块，难道就全部都直接上图么？肯定不行啦~，能懒就懒，如能找到一劳永逸的办法肯定比直接上图，结果发现弄完发现文案有问题，要改字就蛋疼了。</p>
<h2 id="articleHeader1">方法</h2>
<p>好了，开始想办法解决上面的问题了。</p>
<p>先从<code>float</code>下手，两条线各浮动在两侧，其实我们可以理解为常见的网页三栏布局，可是问题是，不能定宽度呀，定了还怎么去自适应呢？所以这条pass</p>
<p>既然<code>float</code>不行了，那想想别的，这回就用<code>position</code>吧~开头的用法也是这种，不过是有背景色的而已，这回我们不许用背景色，看如何处理这个问题。</p>
<p>首先，基本结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;title&quot;>
    <span class=&quot;caption&quot;>Headling</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"title"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"caption"</span>&gt;</span>Headling<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>我们可以用伪类<code>:before</code>、<code>:after</code>来生成一些无关紧要的东西，不过为了能让大家看的清楚些，直接用标签了，<br>这是改进后的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;title&quot;>
    <span class=&quot;caption&quot;><span class=&quot;line line-l&quot;></span>Headling<span class=&quot;line line-r&quot;></span></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"title"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"caption"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line line-l"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>Headling<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line line-r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>接着给样式（答案就在里面噢）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title { position: relative; z-index: 2; font-size: 16px; line-height: 24px; text-align: center; color: #999; overflow: hidden; }
.title .caption { position: relative; display: inline-block; }
.title .caption .line { position: absolute; top: 11px; width: 600px; height: 1px; background-color: #ddd; }
.title .caption .line-l { right: 100%; margin-right: 15px; }
.title .caption .line-r { left: 100%; margin-left: 15px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.title</span> { <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">24px</span>; <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>; <span class="hljs-attribute">overflow</span>: hidden; }
<span class="hljs-selector-class">.title</span> <span class="hljs-selector-class">.caption</span> { <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">display</span>: inline-block; }
<span class="hljs-selector-class">.title</span> <span class="hljs-selector-class">.caption</span> <span class="hljs-selector-class">.line</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">top</span>: <span class="hljs-number">11px</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ddd</span>; }
<span class="hljs-selector-class">.title</span> <span class="hljs-selector-class">.caption</span> <span class="hljs-selector-class">.line-l</span> { <span class="hljs-attribute">right</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">15px</span>; }
<span class="hljs-selector-class">.title</span> <span class="hljs-selector-class">.caption</span> <span class="hljs-selector-class">.line-r</span> { <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">15px</span>; }</code></pre>
<p>看了上面的样式有没看出些端倪呢？解释下这个实现细节：</p>
<ul>
<li><p>首先，将<code>.caption</code>设为行内框，相对定位</p></li>
<li><p>接着，两根线的定位是被<code>.caption</code>所包含的，接着将它们推向它们各自的地方（<code>left: 100%</code>、<code>right: 100%</code>），应该知道这100%是基于谁算的吧？（没错，就是第一步里的<code>.caption</code>，结果你应该猜到了？）</p></li>
<li><p>最后再用<code>margin-left/right</code>隔出间隙，就满足了我们的需求啦</p></li>
</ul>
<p>我们可以将<code>.line</code>的宽度设的超长，<code>overflow</code>掉即可，这样就可以做到自适应了，下面提个小问题：</p>
<p><span class="img-wrap"><img data-src="/img/bVtQ0z" src="https://static.alili.tech/img/bVtQ0z" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>用以上的方法，解决这个线的问题~</p>
<h2 id="articleHeader2">最后</h2>
<p>这个问题还有别的解决方式，比如<code>line-gradient</code>这些~</p>
<h2 id="articleHeader3">参考</h2>
<p><a href="https://css-tricks.com/line-on-sides-headers/" rel="nofollow noreferrer" target="_blank">Line-On-Sides Headers</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS标题线（删除线贯穿线效果）实现之一二

## 原文链接
[https://segmentfault.com/a/1190000004692817](https://segmentfault.com/a/1190000004692817)

