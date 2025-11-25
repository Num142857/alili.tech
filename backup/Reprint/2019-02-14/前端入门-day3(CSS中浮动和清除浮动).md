---
title: '前端入门-day3(CSS中浮动和清除浮动)' 
date: 2019-02-14 2:30:37
hidden: true
slug: 5iqoyvhs8oa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>浮动是CSS中一个相对比较麻烦的属性，与之伴随的通常是清除浮动。今天我们一起来搞定浮动。</p>
<h2 id="articleHeader1">常见的用法</h2>
<p>事实上，当我们将一个元素设置成浮动时，达到的效果如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016811450" src="https://static.alili.tech/img/remote/1460000016811450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这种版式相信大家都见过，很多杂志都会采用这种左边或者右边插图，文字环绕的效果。</p>
<p>另一种常见的浮动的用法如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016811451" src="https://static.alili.tech/img/remote/1460000016811451" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>即在某一行内，使某一部分右对齐，通常不会用margin实现，而是使用浮动。</p>
<h2 id="articleHeader2">浮动带来的问题</h2>
<p><strong>浮动的元素无法撑开父元素，即导致高度坍塌！！</strong></p>
<p>来看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;son1&quot;></div>
  <div class=&quot;son2&quot;></div>
</div>

.container {
  background-color: lightblue;
  font-size: 0;
}
.son1 {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: orange;
}
.son2 {
  width: 100px;
  height: 100px;
  float: right;
  background-color: lightgray;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container"</span>&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son1"</span>&gt;&lt;/div&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son2"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">background-color</span>: lightblue;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.son1</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>: orange;
}
<span class="hljs-selector-class">.son2</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">background-color</span>: lightgray;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016811452?w=691&amp;h=120" src="https://static.alili.tech/img/remote/1460000016811452?w=691&amp;h=120" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当较大的方块浮动时，我们可以看到他无法撑开父元素。通常情况下这不是我们想要的结果，因为这会导致布局混乱。当父元素内的子元素全部浮动时尤其明显，父元素的高度会坍塌为0。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016811453?w=540&amp;h=182" src="https://static.alili.tech/img/remote/1460000016811453?w=540&amp;h=182" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">清除浮动</h2>
<p>因此，当我们用到了浮动，又不想出现这种情况的时候，就需要清除浮动。</p>
<p>清除浮动的方式可能有很多种，但是现在比较流行，我个人比较喜欢的方式如下：</p>
<p>首先，添加以下CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:after {
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'.'</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">clear</span>: both;
}</code></pre>
<p>然后，在<strong>父容器上</strong>添加<strong>clearfix</strong>类，最后代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container clearfix&quot;>
  <div class=&quot;son1&quot;></div>
  <div class=&quot;son2&quot;></div>
</div>

.container {
  background-color: lightblue;
  font-size: 0;
}
.son1 {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: orange;
}
.son2 {
  width: 100px;
  height: 100px;
  float: right;
  background-color: lightgray;
}
.clearfix:after {
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container clearfix"</span>&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son1"</span>&gt;&lt;/div&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son2"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">background-color</span>: lightblue;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.son1</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>: orange;
}
<span class="hljs-selector-class">.son2</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">background-color</span>: lightgray;
}
<span class="hljs-selector-class">.clearfix</span>:after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'.'</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">clear</span>: both;
}</code></pre>
<p>得到的效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016811454?w=680&amp;h=110" src="https://static.alili.tech/img/remote/1460000016811454?w=680&amp;h=110" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>浮动的元素就可以撑开父容器的高度啦！</p>
<h2 id="articleHeader4">总结</h2>
<ul>
<li>浮动的元素无法撑开父容器的高度，所以需要清除浮动</li>
<li>浮动可以很简单的实现右对齐。</li>
<li>浮动可以很简单的实现文字环绕效果。</li>
</ul>
<p>因此，注意浮动的使用场景，并且在需要的时候清除浮动，就可以很好的控制浮动啦~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端入门-day3(CSS中浮动和清除浮动)

## 原文链接
[https://segmentfault.com/a/1190000016811447](https://segmentfault.com/a/1190000016811447)

