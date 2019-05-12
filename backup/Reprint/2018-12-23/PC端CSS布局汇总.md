---
title: 'PC端CSS布局汇总' 
date: 2018-12-23 2:30:07
hidden: true
slug: amt5hbezsj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>此文章是 <a href="https://segmentfault.com/a/1190000009139500">解剖CSS布局原理</a> 的续集，之前那篇文章讲的都是理论，本文章讲具体的实例，根据自己对布局的理解与开发经验分为以下几类。</p>
<p>因为PC端和移动端布局差异较大，所以我将两端布局分开讲，本文章将针对PC端的布局进行讲解，以下代码只写关键代码。如果你发现你写了关键打代码还达不到效果，请检查是否写了不该写的样式。</p>
<p>为了提高网页性能，考虑到repaint/reflow，表格元素尽量少用，有其他选择的情况尽量用其他布局。</p>
<h1 id="articleHeader1">居中布局</h1>
<h2 id="articleHeader2">一、单个元素水平居中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;box&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader3">1. 宽度固定</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257393?w=501&amp;h=201" src="https://static.alili.tech/img/remote/1460000012257393?w=501&amp;h=201" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>方法一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  width: 300px;
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>比较常用的方法</p>
<p><strong>方法二：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  position: relative;
}
.box {
  width: 100px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>此方法适用于定位时的居中方式</p>
<h3 id="articleHeader4">2. 宽度不固定</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257394?w=500&amp;h=201" src="https://static.alili.tech/img/remote/1460000012257394?w=500&amp;h=201" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>方法一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  display: table;
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>缺点：设置为表格元素，内部元素的布局有可能收到影响</p>
<p><strong>方法二：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  position: relative;
}
.box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<p>缺点：要用到 <code>transform</code> ，兼容性较差</p>
<p><strong>方法三：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: table-cell;   // 这属性在这可加可不加
  text-align: center;
}
.box {
  display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: table-cell;   // 这属性在这可加可不加
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p>缺点：需要涉及到父类的样式</p>
<h2 id="articleHeader5">二、单个元素垂直居中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;box&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader6">高度固定</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257395?w=500&amp;h=200" src="https://static.alili.tech/img/remote/1460000012257395?w=500&amp;h=200" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>方法一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  position: relative;
}
.box {
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: auto <span class="hljs-number">0</span>;
}</code></pre>
<p>缺点：要用到定位，脱离文档流</p>
<p><strong>方法二：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  height: 400px;
  line-height: 400px;
}
.box {
  display: inline-block;
  height: 50px;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">400px</span>;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p>注意，父容器设置了行高，子类要记得重置行高</p>
<h3 id="articleHeader7">高度不固定</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257396?w=501&amp;h=200" src="https://static.alili.tech/img/remote/1460000012257396?w=501&amp;h=200" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>方法一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p>缺点：要用到 <code>transform</code> ，兼容性较差</p>
<p><strong>方法二：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: table-cell;
  verticle-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">verticle-align</span>: middle;
}</code></pre>
<p>缺点：由父类控制是否居中</p>
<h2 id="articleHeader8">三、多个元素水平居中</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257397?w=301&amp;h=151" src="https://static.alili.tech/img/remote/1460000012257397?w=301&amp;h=151" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  width: 200px;
  height: 100px;
  background: #ccc;
  text-align: center;
}
span {
  display: inline-block;
  background: #9fc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-tag">span</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#9fc</span>;
}</code></pre>
<h2 id="articleHeader9">四、多个元素垂直居中</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257398?w=301&amp;h=152" src="https://static.alili.tech/img/remote/1460000012257398?w=301&amp;h=152" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  height: 200px;
  display: table-cell;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<h1 id="articleHeader10">单行多列布局</h1>
<h2 id="articleHeader11">一、等宽排列</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257399?w=457&amp;h=223" src="https://static.alili.tech/img/remote/1460000012257399?w=457&amp;h=223" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;box box1&quot;></div>
  <div class=&quot;box box2&quot;></div>
  <div class=&quot;box box3&quot;></div> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: table;
  table-layout: fixed;
}
.box {
  display: table-cell;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">table-layout</span>: fixed;
}
<span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">display</span>: table-cell;
}</code></pre>
<h2 id="articleHeader12">二、两列布局</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;left&quot;></div>
  <div class=&quot;right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader13">1. 一列定宽，一列自适应，高度各自自适应</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257400?w=502&amp;h=258" src="https://static.alili.tech/img/remote/1460000012257400?w=502&amp;h=258" alt="" title="" style="cursor: pointer;"></span></p>
<p>左列定宽：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
  float: left;
  width: 100px;
}
.right {
  margin-left: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>右列定宽：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  padding-right: 100px;
  overflow: hidden;
}
.left {
  float: left;
  width: 100%;
}
.right {
  position: relative;
  float: left;
  width: 100px;
  right: -100px;
  margin-left: -100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>;
}</code></pre>
<h3 id="articleHeader14">2. 一列定宽，一列自适应，高度相同取两者最大值</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257401?w=501&amp;h=226" src="https://static.alili.tech/img/remote/1460000012257401?w=501&amp;h=226" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  display: table;
  table-layout: fixed;
}
.left,
.right {
  display: table-cell;
}
.right {
  width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">table-layout</span>: fixed;
}
<span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>需要定宽的那列设置宽度</p>
<h3 id="articleHeader15">3、一列不定宽，一列自适应</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257402?w=502&amp;h=246" src="https://static.alili.tech/img/remote/1460000012257402?w=502&amp;h=246" alt="" title="" style="cursor: pointer;"></span></p>
<p>右列自适应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;left&quot;></div>
  <div class=&quot;right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
  float: left;
}
.right {
  overflow: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">overflow</span>: auto;
}</code></pre>
<p>左列自适应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;right&quot;></div>
  <div class=&quot;left&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
  overflow: auto;
}
.right {
  float: right;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">overflow</span>: auto;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">float</span>: right;
}</code></pre>
<h2 id="articleHeader16">三、三列布局</h2>
<h3 id="articleHeader17">1、两侧定宽，中间自适应，高度各种自适应</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257403?w=678&amp;h=234" src="https://static.alili.tech/img/remote/1460000012257403?w=678&amp;h=234" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>方法一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;left&quot;>定宽</div>
  <div class=&quot;center&quot;>自适应</div>
  <div class=&quot;right&quot;>定宽</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,
.right {
  position: absolute;
  top: 0;
}
.left {
  left: 0;
  width: 150px;
}
.center {
  margin: 0 80px 0 150px;
}
.right {
  right: 0;
  width: 80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">80px</span> <span class="hljs-number">0</span> <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
}</code></pre>
<p><strong>方法二：圣杯布局</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;left&quot;>定宽</div>
  <div class=&quot;center&quot;>自适应</div>
  <div class=&quot;right&quot;>定宽</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  padding: 0 8px 0 150;
}
.left,
.center,
.right {
  position: relative;
  float: left;
}
.left {
  width: 150px;
  left: -150px;
  margin-right: -100%;
}
.center {
  width: 100%;
  height: 200px;
}
.right {
  width: 80px;
  right: -80px;
  margin-left: -80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">0</span> <span class="hljs-number">150</span>;
}
<span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.center</span>,
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">150px</span>;
  <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">80px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">80px</span>;
}</code></pre>
<p><strong>方法三：双飞翼布局</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;wrap&quot;>
    <div class=&quot;center&quot;>自适应</div>
  </div>
  <div class=&quot;left&quot;>定宽</div>
  <div class=&quot;right&quot;>定宽</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,
.wrap,
.right {
  float: left;
}
.left {
  width: 150px;
  margin-left: -100%;
}
.wrap {
  width: 100%;
}
.center {
  margin: 0 80px 0 150px;
}
.right {
  width: 80px;
  margin-left: -80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.wrap</span>,
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.wrap</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">80px</span> <span class="hljs-number">0</span> <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">80px</span>;
}</code></pre>
<h3 id="articleHeader18">2、两列定宽，中间自适应，高度相同取两者最大值</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257404?w=678&amp;h=234" src="https://static.alili.tech/img/remote/1460000012257404?w=678&amp;h=234" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
  <div class=&quot;left&quot;>定宽</div>
  <div class=&quot;center&quot;>自适应</div>
  <div class=&quot;right&quot;>定宽</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container {
  width: 100%;
  display: table;
}
.left,
.right,
.center {
  display: table-cell;
}
.left {
  width: 150px;
}
.right {
  width: 80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: table;
}
<span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.right</span>,
<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
}</code></pre>
<h1 id="articleHeader19">多行多列布局</h1>
<h2 id="articleHeader20">一、图文并茂</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257405?w=297&amp;h=142" src="https://static.alili.tech/img/remote/1460000012257405?w=297&amp;h=142" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;article&quot;>
  <img src=&quot;../img/icon.png&quot;>随着HTML的成长，为了满足页面设计者的要求，HTML添加了很多显示功能。但是随着这些功能的增加，HTML变的越来越杂乱，而且HTML页面也越来越臃肿。于是CSS便诞生了。
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/icon.png"</span>&gt;</span>随着HTML的成长，为了满足页面设计者的要求，HTML添加了很多显示功能。但是随着这些功能的增加，HTML变的越来越杂乱，而且HTML页面也越来越臃肿。于是CSS便诞生了。
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img {
  float: left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
}</code></pre>
<h2 id="articleHeader21">二、均衡分布</h2>
<h3 id="articleHeader22">1、相同间距</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257406?w=539&amp;h=307" src="https://static.alili.tech/img/remote/1460000012257406?w=539&amp;h=307" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list&quot;>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p><strong>方法一：用浮动</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list {
  width: 500px;
  height: 260px;
}
.list li {
  float: left;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-top: 20px;
  background: #c9f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">260px</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#c9f</span>;
}</code></pre>
<p>通过 <code>margin</code> 来达到等距效果，根据父容器宽高和子类宽高与个数，算出 <code>margin-left</code> 和 <code>margin-top</code> 的值</p>
<p><strong>方法二：用内联块</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list {
  width: 500px;
  height: 260px;
  font-size: 0;
}
.list li {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-top: 20px;
  background: #c9f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">260px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#c9f</span>;
}</code></pre>
<p>用内联块的话，如果子类有文本，要记得设置 <code>font-size</code></p>
<h3 id="articleHeader23">2. 去除边界间距</h3>
<p>在上一个例子下去除边界间距</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257407?w=510&amp;h=286" src="https://static.alili.tech/img/remote/1460000012257407?w=510&amp;h=286" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list {
  width: 460px;
  height: 220px;
}
.list li {
  float: left;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-top: 20px;
  background: #c9f;
}
.list li:nth-of-type(4n+1) { margin-left: 0 }
.list li:nth-of-type(-n+4) { margin-top: 0 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">460px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">220px</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#c9f</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(4n+1)</span> { <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0</span> }
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(-n+4)</span> { <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span> }</code></pre>
<p>若要兼容IE8，则在对应的标签上加类名，单独处理</p>
<h2 id="articleHeader24">三、瀑布流布局</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257408?w=642&amp;h=825" src="https://static.alili.tech/img/remote/1460000012257408?w=642&amp;h=825" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上图，所谓的瀑布流布局就是一系列盒子或图片的等宽不等高布局。</p>
<p>真正的瀑布流布局是这样：</p>
<ol><li>给每张图片设置相同的宽度，第一行全部置顶，顺序排列</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257409?w=633&amp;h=404" src="https://static.alili.tech/img/remote/1460000012257409?w=633&amp;h=404" alt="" title="" style="cursor: pointer;"></span></p>
<ol><li>从第二行开始寻找最低高度的那一列作为下一张图片的排列位置，这时很显然第二列高度最低，就把第四张图片放在第二列下面</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257410?w=628&amp;h=495" src="https://static.alili.tech/img/remote/1460000012257410?w=628&amp;h=495" alt="" title="" style="cursor: pointer;"></span></p>
<ol><li>这时第一列和第三列高度相同，我们优先选择左边那列，把第五张图片放在第一列下面</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257411?w=625&amp;h=496" src="https://static.alili.tech/img/remote/1460000012257411?w=625&amp;h=496" alt="" title="" style="cursor: pointer;"></span></p>
<ol><li>这时第三列高度最低，第六张图片放在第三列下面，以此类推。</li></ol>
<p>网上有人说用多列浮动布局、用CSS3布局、用flexbox，其实实现的都是假的瀑布流，都有可能出现三列的高度差异较大的情况，真正的瀑布流是三列高度相差不大的。以下的瀑布流的具体实现</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot;>
  <img src=&quot;../img/1.jpg&quot; class=&quot;img1&quot;>
  <img src=&quot;../img/2.jpg&quot; class=&quot;img2&quot;>
  <img src=&quot;../img/3.jpg&quot; class=&quot;img3&quot;>
  <img src=&quot;../img/4.jpg&quot; class=&quot;img4&quot;>
  <img src=&quot;../img/5.jpg&quot; class=&quot;img5&quot;>
  <img src=&quot;../img/6.jpg&quot; class=&quot;img6&quot;>
  <img src=&quot;../img/7.jpg&quot; class=&quot;img7&quot;>
  <img src=&quot;../img/8.jpg&quot; class=&quot;img8&quot;>
  <img src=&quot;../img/9.jpg&quot; class=&quot;img9&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/1.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/2.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/3.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img3"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/4.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img4"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/5.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img5"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/6.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img6"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/7.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img7"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/8.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/9.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img9"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list {
  position: relative;
  width: 600px;
}
.list img {
  position: absolute;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">position</span>: absolute;
}
</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('DOMContentLoaded', function () {
  var listDOM = document.querySelector('.list');
  var imgsDOM = listDOM.querySelectorAll('img');
  
  waterfallFlowLayout(listDOM, imgsDOM, 3);
})

/**
 * 瀑布流布局
 * 
 * @param {DOM object} listDOM  存放图片列表的容器DOM
 * @param {DOM object} imgsDOM  图片DOM
 * @param {number} colsCount    列数
 */
function waterfallFlowLayout (listDOM, imgsDOM, colsCount) {
  colsCount = colsCount || 3;   // 默认3列

  var currHeightArr = []; // 存放当前每列的总高度
  var imgWidth = listDOM.offsetWidth / colsCount

  // 遍历所有图片DOM元素
  for (var i = 0; i < imgsDOM.length; i++) {
    var imgDOM = imgsDOM[i];
    imgDOM.style.width = imgWidth + 'px';  // 设置各个图片的宽度

    // 如果是第一行的就直接存高度，并设置top和left
    if (i < colsCount) {
      currHeightArr.push(imgDOM.offsetHeight);
      imgDOM.style.left = (i % colsCount) * imgWidth + 'px';
      imgDOM.style.top = 0;
    }
    // 否则
    else {
      var minNum = Math.min.apply(Math, currHeightArr);     // 获取最小值
      var index = currHeightArr.indexOf(minNum);            // 获取最小值的下标

      // 根据最小值下标得到对应的DOM，获取它的left赋给当前的left
      imgDOM.style.left = imgsDOM[index].offsetLeft + 'px'; 
      imgDOM.style.top = minNum + 'px'; // 使用最小值作为当前的top

      // 更新每列的总高度
      currHeightArr[index] += imgDOM.offsetHeight;
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> listDOM = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.list'</span>);
  <span class="hljs-keyword">var</span> imgsDOM = listDOM.querySelectorAll(<span class="hljs-string">'img'</span>);
  
  waterfallFlowLayout(listDOM, imgsDOM, <span class="hljs-number">3</span>);
})

<span class="hljs-comment">/**
 * 瀑布流布局
 * 
 * @param {DOM object} listDOM  存放图片列表的容器DOM
 * @param {DOM object} imgsDOM  图片DOM
 * @param {number} colsCount    列数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waterfallFlowLayout</span> (<span class="hljs-params">listDOM, imgsDOM, colsCount</span>) </span>{
  colsCount = colsCount || <span class="hljs-number">3</span>;   <span class="hljs-comment">// 默认3列</span>

  <span class="hljs-keyword">var</span> currHeightArr = []; <span class="hljs-comment">// 存放当前每列的总高度</span>
  <span class="hljs-keyword">var</span> imgWidth = listDOM.offsetWidth / colsCount

  <span class="hljs-comment">// 遍历所有图片DOM元素</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; imgsDOM.length; i++) {
    <span class="hljs-keyword">var</span> imgDOM = imgsDOM[i];
    imgDOM.style.width = imgWidth + <span class="hljs-string">'px'</span>;  <span class="hljs-comment">// 设置各个图片的宽度</span>

    <span class="hljs-comment">// 如果是第一行的就直接存高度，并设置top和left</span>
    <span class="hljs-keyword">if</span> (i &lt; colsCount) {
      currHeightArr.push(imgDOM.offsetHeight);
      imgDOM.style.left = (i % colsCount) * imgWidth + <span class="hljs-string">'px'</span>;
      imgDOM.style.top = <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">// 否则</span>
    <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> minNum = <span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-built_in">Math</span>, currHeightArr);     <span class="hljs-comment">// 获取最小值</span>
      <span class="hljs-keyword">var</span> index = currHeightArr.indexOf(minNum);            <span class="hljs-comment">// 获取最小值的下标</span>

      <span class="hljs-comment">// 根据最小值下标得到对应的DOM，获取它的left赋给当前的left</span>
      imgDOM.style.left = imgsDOM[index].offsetLeft + <span class="hljs-string">'px'</span>; 
      imgDOM.style.top = minNum + <span class="hljs-string">'px'</span>; <span class="hljs-comment">// 使用最小值作为当前的top</span>

      <span class="hljs-comment">// 更新每列的总高度</span>
      currHeightArr[index] += imgDOM.offsetHeight;
    }
  }
}
</code></pre>
<h1 id="articleHeader25">全屏布局</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012257412?w=627&amp;h=439" src="https://static.alili.tech/img/remote/1460000012257412?w=627&amp;h=439" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;head&quot;>头部</div>
<div class=&quot;sidebar&quot;>侧边导航</div>
<div class=&quot;main&quot;>主体内容</div>
<div class=&quot;foot&quot;>底部</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head"</span>&gt;</span>头部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sidebar"</span>&gt;</span>侧边导航<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>主体内容<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foot"</span>&gt;</span>底部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head,
.foot,
.sidebar,
.main {
  position: absolute;
}
.head {
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
}
.foot {
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
}
.sidebar {
  top: 80px;
  bottom: 60px;
  left: 0;
  width: 100px;
}
.main {
  top: 80px;
  bottom: 60px;
  left: 100px;
  right: 0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span>,
<span class="hljs-selector-class">.foot</span>,
<span class="hljs-selector-class">.sidebar</span>,
<span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">position</span>: absolute;
}
<span class="hljs-selector-class">.head</span> {
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
}
<span class="hljs-selector-class">.foot</span> {
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.sidebar</span> {
  <span class="hljs-attribute">top</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">top</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PC端CSS布局汇总

## 原文链接
[https://segmentfault.com/a/1190000012257390](https://segmentfault.com/a/1190000012257390)

