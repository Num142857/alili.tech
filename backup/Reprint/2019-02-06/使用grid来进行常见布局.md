---
title: '使用grid来进行常见布局' 
date: 2019-02-06 2:30:09
hidden: true
slug: 8uomdkdmf0j
categories: [reprint]
---

{{< raw >}}

                    
<p><code>grid</code> 布局是W3C提出的一个二维布局系统，通过 <code>display: grid</code> 来设置使用，对于以前一些复杂的布局能够得到更简单的解决。本篇文章通过几个布局来对对 <code>grid</code> 布局进行一个简单的了解。目前，<code>grid</code> 仅仅只有 <code>Edge</code>使用前缀能够支持，为了更好地体验，可以使用 Chrome 浏览器，在 <code>chrome://flags</code> 开启 <code> #enable-experimental-web-platform-features</code> 选项。<br>另外，更多的例子可以前往 <a href="http://gridbyexample.com/examples/" rel="nofollow noreferrer" target="_blank">Grid by examples</a>, 更多的用法可以前往 <a href="https://www.w3.org/TR/css3-grid-layout/" rel="nofollow noreferrer" target="_blank">W3 Specification</a>,也可以前往 <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" rel="nofollow noreferrer" target="_blank">A Complete Guide to Grid</a></p>
<p><a href="https://shfshanyue.github.io/blog/grid-layout/" rel="nofollow noreferrer" target="_blank">Live Demo</a></p>
<h2 id="articleHeader0">左右固定中间自适应</h2>
<p>以前，这需要使用 <code>negative margin</code>，<code>float</code>, <code>position</code> 解决，圣杯布局是一个比较好的解决方案。后来，<code>flex</code>横空出世，使用 <code>flex-grow</code> 与 <code>flex-basis</code> 完成自适应布局。<code>grid</code> 布局相比 <code>flex</code> 布局更加简单，只需要在 <code>container</code> 上设置 <code>grid-template-columns: 100px auto 100px</code>。<br><span class="img-wrap"><img data-src="/img/remote/1460000015067069" src="https://static.alili.tech/img/remote/1460000015067069" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: 100px auto 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">200px</span>;
}</code></pre>
<h2 id="articleHeader1">三等分</h2>
<p>以前的方法可以设置 <code>float: left; width: 33.33333333</code>，使用 <code>flex</code> 可以设置 <code>flex-basis: 33.33333333</code>。在 grid 中只需要设置 <code>grid-template-columns: 1fr 1fr 1fr</code><br><span class="img-wrap"><img data-src="/img/remote/1460000015067070" src="https://static.alili.tech/img/remote/1460000015067070" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
  background-color: #feb;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#feb</span>;
}</code></pre>
<h2 id="articleHeader2">三七分</h2>
<p>在 grid 中设置 container 为十等分，可以使用 <code>grid-template-columns: repeat(10, 1fr)</code>。<br><code>repeat</code> 为重复10次 <code>1fr</code>。<code>grid-column</code> 为 <code>grid-column-start</code> 与 <code>grid-column-end</code> 的缩写，表示起止的 <code>line</code>。使用 grid 进行栅格系统的布局也是很简单。<br><span class="img-wrap"><img data-src="/img/remote/1460000015067071" src="https://static.alili.tech/img/remote/1460000015067071" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.column-3 {
  grid-column: 1 / 4;
}

.column-7 {
  grid-column: 4 / 11;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(10, 1fr);
}

<span class="hljs-selector-class">.column-3</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.column-7</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">4</span> / <span class="hljs-number">11</span>;
}</code></pre>
<h2 id="articleHeader3">复杂布局</h2>
<p>以上几个例子，均是单向布局，<code>flex</code> 就能很好的解决，而如下几个布局，均是二维布局，传统布局有些困难。以下示例图，可以在 <code>container</code> 上使用 <code>grid-template-areas</code>，在 <code>item</code> 上设置 <code>grid-area</code> 属性来设置复杂布局。<br><span class="img-wrap"><img data-src="/img/remote/1460000015067072" src="https://static.alili.tech/img/remote/1460000015067072" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;grid-layout&quot;>
  <div class=&quot;header&quot;>header</div>
  <div class=&quot;left&quot;>left</div>
  <div class=&quot;main&quot;>main</div>
  <div class=&quot;right&quot;>right</div>
  <div class=&quot;footer&quot;>footer</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid-layout"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 40px 300px 50px;
  grid-template-areas: &quot;header header header&quot;
                       &quot;left main right&quot;
                       &quot;footer footer footer&quot;;
}

.container .header {
  grid-area: header;
}

.container .footer {
  grid-area: footer;
}

.container .left {
  grid-area: left;
}

.container .right {
  grid-area: right;
}

.container .main {
  grid-area: main;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">40px</span> <span class="hljs-number">300px</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"header header header"</span>
                       <span class="hljs-string">"left main right"</span>
                       <span class="hljs-string">"footer footer footer"</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">grid-area</span>: header;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">grid-area</span>: footer;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">grid-area</span>: left;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">grid-area</span>: right;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">grid-area</span>: main;
}</code></pre>
<h2 id="articleHeader4">九宫格</h2>
<p>在传统布局中就比较有困难。在 grid 中设置三行三列等宽，并使用 <code>grid-gap</code> 设置间隙。<br>&lt;img src="<a href="https://shfshanyue.github.io/blog/grid-layout/images/5.png&amp;quot" rel="nofollow noreferrer" target="_blank">https://shfshanyue.github.io/...</a>; width="300" height="300"&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 8px;
  border: 1px solid #fac;
  padding: 8px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fac</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
}</code></pre>
<h2 id="articleHeader5">参考</h2>
<ul>
<li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" rel="nofollow noreferrer" target="_blank">A Complete Guide to Grid</a></li>
<li><a href="https://www.w3.org/TR/css3-grid-layout/" rel="nofollow noreferrer" target="_blank">W3 Specification</a></li>
<li><a href="http://gridbyexample.com/examples/" rel="nofollow noreferrer" target="_blank">Grid by examples</a></li>
<li><a href="http://caniuse.com/" rel="nofollow noreferrer" target="_blank">caniuse</a></li>
<li><a href="https://github.com/FremyCompany/css-grid-polyfill/" rel="nofollow noreferrer" target="_blank">Grid polyfill</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用grid来进行常见布局

## 原文链接
[https://segmentfault.com/a/1190000006045888](https://segmentfault.com/a/1190000006045888)

