---
title: 'Web图片资源的加载与渲染时机' 
date: 2019-01-10 2:30:08
hidden: true
slug: 93mr2t7cheg
categories: [reprint]
---

{{< raw >}}

                    
<p>此文研究页面中的图片资源的加载和渲染时机，使得我们能更好的管理图片资源，避免不必要的流量和提高用户体验。</p>
<h2 id="articleHeader0">浏览器的工作流程</h2>
<p>要研究图片资源的加载和渲染，我们先要了解浏览器的工作原理。以<strong>Webkit</strong>引擎的工作流程为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010032506" src="https://static.alili.tech/img/remote/1460000010032506" alt="webkitflow" title="webkitflow" style="cursor: pointer;"></span></p>
<p>从上图可看出，浏览器加载一个HTML页面后进行如下操作：</p>
<ul>
<li><p>解析HTML —&gt; 构建DOM树</p></li>
<li><p>加载样式 —&gt; 解析样式 —&gt; 构建样式规则树</p></li>
<li><p>加载javascript —&gt; 执行javascript代码</p></li>
<li><p>把DOM树和样式规则树匹配构建渲染树</p></li>
<li><p>计算元素位置进行布局</p></li>
<li><p>绘制</p></li>
</ul>
<p>从上图我们不能很直观的看出图片资源从什么时候开始加载，下图标出图片加载和渲染的时机：</p>
<ul>
<li><p>解析HTML【遇到<code>&lt;img&gt;</code>标签加载图片】 —&gt; 构建DOM树</p></li>
<li><p>加载样式 —&gt; 解析样式【遇到背景图片链接不加载】 —&gt; 构建样式规则树</p></li>
<li><p>加载javascript —&gt; 执行javascript代码</p></li>
<li><p>把DOM树和样式规则树匹配构建渲染树【遍历DOM树时加载对应样式规则上的背景图片】</p></li>
<li><p>计算元素位置进行布局</p></li>
<li><p>绘制【开始渲染图片】</p></li>
</ul>
<h2 id="articleHeader1">图片加载与渲染规则</h2>
<p>页面中不是所有的<code>&lt;img&gt;</code>标签图片和样式表背景图片都会加载。</p>
<h3 id="articleHeader2"><strong>display:none</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.img-purple {
    background-image: url(../image/purple.png);
}
</style>
<img src=&quot;../image/pink.png&quot; style=&quot;display:none&quot;>
<div class=&quot;img-purple&quot; style=&quot;display:none&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.img-purple</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/purple.png);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/pink.png"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-purple"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032507" src="https://static.alili.tech/img/remote/1460000010032507" alt="display-none" title="display-none" style="cursor: pointer;"></span></p>
<p>设置了<code>display:none</code>属性的元素，图片不会渲染出来，但会加载。</p>
<p><strong>原理</strong></p>
<p>把DOM树和样式规则树匹配构建渲染树时，只会把可见元素和它对应的样式规则结合一起产出到渲染树，这就意味有不可见元素，当匹配DOM树和样式规则树时，若发现一个元素的对应的样式规则上有<code>display:none</code>，浏览器会认为该元素是不可见的，因此不会把该元素产出到渲染树上。</p>
<p>上面代码中，当解析HTML时会加载<code>&lt;img&gt;</code>标签元素上的图片。</p>
<p>当把DOM树和样式规则树匹配构建渲染树时，遍历DOM树上的元素，发现元素对应的样式规则上有<code>background-image</code>属性时会加载背景图片，但是因为这个元素是不可见元素（对应的样式规则上有<code>diaplay:none</code>），不会把该元素和它对应的样式规则产出到渲染树。</p>
<p>当绘制时因为渲染树上没有该元素，因此不会绘制该元素的背景图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.img-yellow {
    background-image: url(../image/yellow.png);
}
</style>
<div style=&quot;display:none&quot;>
    <img src=&quot;../image/red.png&quot;>
    <div class=&quot;img-yellow&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.img-yellow</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/yellow.png);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/red.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-yellow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032508" src="https://static.alili.tech/img/remote/1460000010032508" alt="display-none" title="display-none" style="cursor: pointer; display: inline;"></span></p>
<p>设置了<code>display:none</code>属性元素的子元素，样式表中的背景图片不会渲染出来，也不会加载；而<code>&lt;img&gt;</code>标签的图片不会渲染出来，但会加载。</p>
<p><strong>原理</strong></p>
<p>正如上面所说的，当匹配DOM树和样式规则树时，若发现元素的对应的样式规则上有<code>display:none</code>，浏览器会认为该元素的子元素是不可见的，因此不会把该元素的子元素产出到渲染树上。</p>
<p>当构建渲染树遇到了设置了<code>display:none</code>属性的不可见元素时，不会继续遍历不可见元素的子元素，因此不会加载该元素中子元素的背景图片。</p>
<p>当绘制时也因为渲染树上没有设置了<code>display:none</code>属性元素，也没有改元素的子元素，因此该元素中子元素的背景图片不会渲染出来。</p>
<h3 id="articleHeader3">重复图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-blue {
    background-image: url(../image/blue.png);
}
<div class=&quot;img-blue&quot;></div>
<img src=&quot;../image/blue.png&quot;>
<img src=&quot;../image/blue.png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>.img-blue {
    background-image: url(../image/blue.png);
}
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"img-blue"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;img src=<span class="hljs-string">"../image/blue.png"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/blue.png"</span>&gt;</span></span></code></pre>
<p>图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032509" src="https://static.alili.tech/img/remote/1460000010032509" alt="repeat-image" title="repeat-image" style="cursor: pointer; display: inline;"></span></p>
<p>页面中多个<code>&lt;img&gt;</code>标签或样式表中的背景图片图片路径是同一个，图片只加载一次。</p>
<p><strong>原理</strong></p>
<p>浏览器请求资源时，都会先判断是否有缓存，若有缓存且未过期则会从缓存中读取，不会再次请求。先加载的图片会存储到浏览器缓存中，后面再次请求同路径图片时会直接读取缓存中的图片。</p>
<h3 id="articleHeader4">不存在元素的背景图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-blue {
    background-image: url(../image/blue.png);
}
.img-orange{
    background-image: url(../image/orange.png);
}
<div class=&quot;img-orange&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>.img-<span class="hljs-built_in">blue</span> {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(../<span class="hljs-built_in">image</span>/<span class="hljs-built_in">blue</span>.png);
}
.img-orange{
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(../<span class="hljs-built_in">image</span>/orange.png);
}
&lt;div class=<span class="hljs-string">"img-orange"</span>&gt;&lt;/div&gt;</code></pre>
<p>图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032510" src="https://static.alili.tech/img/remote/1460000010032510" alt="no-image" title="no-image" style="cursor: pointer;"></span></p>
<p>不存在元素的背景图片不会加载。</p>
<p><strong>原理</strong></p>
<p>不存在的元素不会产出到DOM树上，构建渲染树过程中遍历DOM树时无法遍历不存在的元素，因此不会加载图片，也不会产出到渲染树上。当解析渲染树时无法解析不存在的元素，不存在的元素自然也不会渲染。</p>
<h3 id="articleHeader5">伪类的背景图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-green {
    background-image: url(../image/green.png);
}
.img-green:hover{
    background-image: url(../image/red.png);
}
<div class=&quot;img-green&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>.img-<span class="hljs-built_in">green</span> {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(../<span class="hljs-built_in">image</span>/<span class="hljs-built_in">green</span>.png);
}
.img-<span class="hljs-built_in">green</span>:hover{
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(../<span class="hljs-built_in">image</span>/<span class="hljs-built_in">red</span>.png);
}
&lt;div class=<span class="hljs-string">"img-green"</span>&gt;&lt;/div&gt;</code></pre>
<p>触发hover前的图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032511" src="https://static.alili.tech/img/remote/1460000010032511" alt="class-image" title="class-image" style="cursor: pointer; display: inline;"></span></p>
<p>触发hover后的图片资源请求如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010032512" src="https://static.alili.tech/img/remote/1460000010032512" alt="class-image" title="class-image" style="cursor: pointer; display: inline;"></span></p>
<p>当触发伪类的时候，伪类样式上的背景图片才会加载。</p>
<p><strong>原理</strong></p>
<p>触发hover前，构建渲染树过程中，遍历DOM树时，该元素匹配的样式规则是无hover状态选择器<code>.img-green</code>的样式，因此加载无hover状态选择器<code>.img-green</code>的样式上<em>green.png</em>图片。该元素是可见元素，因此会被产出到渲染树上，绘制时渲染的也是<em>green.png</em>。</p>
<p>触发hover后，因为<code>.img-green:hover</code>的优先级比较高，构建新的渲染树过程中，该元素匹配的是有hover状态选择器，因此加载有hover状态选择器<code>.img-green:hover</code>的样式上的<em>red.png</em>图片。该元素是可见元素，因此会被产出到渲染树上，绘制时渲染的也是<em>red.png</em>。</p>
<h2 id="articleHeader6">应用</h2>
<h3 id="articleHeader7">占位图</h3>
<p>当使用样式表中的背景图片作为占位符时，要把背景图片转为base64格式。这是因为背景图片加载的顺序在<code>&lt;img&gt;</code>标签后面，背景图片可能会在<code>&lt;img&gt;</code>标签图片加载完成后才开始加载，达不到想要的效果。</p>
<h3 id="articleHeader8">预加载</h3>
<p>很多场景里图片是在改变或触发状态后才显示出来的，例如点击一个Tab后，一个设置<code>display:none</code>隐藏的父元素变为显示，这个父元素里的子元素图片会在父元素显示后才开始加载；又如当鼠标hover到图标后，改变图标图片，图片会在hover上去后才开始加载，导致出现闪一下这种不友好的体验。</p>
<p>在这种场景下，我们就需要把图片预加载，预加载有很多种方式:</p>
<ol>
<li><p>若是小图标，可以合并成雪碧图，在改变状态前就把所有图标都一起加载了。</p></li>
<li><p>使用上文讲到的，设置了display:none属性的元素，图片不会渲染出来，但会加载。把要预加载的图片加到设置了<code>display:none</code>的元素背景图或<code>&lt;img&gt;</code>标签里。</p></li>
<li><p>在javascript创建img对象，把图片url设置到img对象的src属性里。</p></li>
</ol>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000010032501" target="_blank">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web图片资源的加载与渲染时机

## 原文链接
[https://segmentfault.com/a/1190000010032501](https://segmentfault.com/a/1190000010032501)

