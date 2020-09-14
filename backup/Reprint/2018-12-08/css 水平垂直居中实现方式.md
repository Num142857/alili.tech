---
title: 'css 水平垂直居中实现方式' 
date: 2018-12-08 2:30:30
hidden: true
slug: wgo6m8wtak
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">css 水平垂直居中实现方式</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="css中有好多实现居中的方式，在项目中经常不知道使用哪种方式会比较好，所以记录下来。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>css中有好多实现居中的方式，在项目中经常不知道使用哪种方式会比较好，所以记录下来。
</code></pre>
<p>水平垂直居中包括行内元素居中，以及块级元素居中</p>
<p>行内元素html结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;outer&quot;>
    <span class=&quot;inner&quot;></span>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"outer"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>块级元素结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;outer&quot;>
    <div class=&quot;inner&quot;></div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"outer"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>基础样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.outer {
    width: 400px;
    height: 400px;
    border: 1px solid red;
}
.outer .inner {
    width: 50px;
    height: 50px;
    border: 1px solid blue;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader1">水平居中</h2>
<h3 id="articleHeader2">1-行内元素（最简单 text-align: center）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<h3 id="articleHeader3">1-块级元素（margin: auto）</h3>
<p>当使用这种方式时，内部元素必须定义宽度，不然margin属性会无效</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer .inner {
    margin: auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">margin</span>: auto;
}
</code></pre>
<h3 id="articleHeader4">2-块级元素（margin: auto + display: table）</h3>
<p>前面这种方式需要为内部元素定义宽度，如果不想定义宽度，可以设置内部元素的display 为 table，它的宽度会由内部元素来撑开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer .inner {
    margin: auto;
    display: table;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">display</span>: table;
}</code></pre>
<h3 id="articleHeader5">3-块级元素（display: inline）</h3>
<p>为内部元素设置display 为inline，将它转换为行内元素，再对父元素使用text-align: center 可以实现水平居中，缺点就是内部元素无法设置宽度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    text-align: center;
}
.outer .inner {
    display: inline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">display</span>: inline;
}</code></pre>
<h3 id="articleHeader6">4-块级元素（display: inline-block）</h3>
<p>方案三无法为内部元素设置宽度，但是采用inline-block，则可以为内部元素设置宽度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    text-align: center;
}
.outer .inner {
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<h3 id="articleHeader7">5-块级元素（float: left + transform）</h3>
<p>这种方式不需要知道内部元素宽度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer .inner {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<h3 id="articleHeader8">6-块级元素（负边距+绝对定位）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    position: relative;
}
.outer .inner {
    position: absolute;
    left: 50%;
    margin-left: -25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">25px</span>;
}</code></pre>
<h3 id="articleHeader9">7-块级元素（flexbox）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用的最多的方式，但低版本浏览器会有兼容问题" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">用的最多的方式，但低版本浏览器会有兼容问题</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    display: flex;
    justify-content: center;  // 主轴上居中
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;  <span class="hljs-comment">// 主轴上居中</span>
}</code></pre>
<h2 id="articleHeader10">垂直居中</h2>
<h3 id="articleHeader11">1-行内元素（line-height）</h3>
<p>外部元素设置line-height</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    line-height: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<h3 id="articleHeader12">1-块级元素（absolute + top + margin-top）</h3>
<p>使用绝对定位将内部元素的顶部定位在中间，再通过margin-top 负值拉回高度，需要提前知道内部元素的高度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    position: relative;
}
.outer .inner {
    position: absolute;
    top: 50%;
    margin-top: -25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">25px</span>;
}</code></pre>
<h3 id="articleHeader13">2-块级元素（absolute + margin:auto）</h3>
<p>这种方式不需要知道内部元素的高度，兼容性也很好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    position: relative;
}
.outer .inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}
</code></pre>
<h3 id="articleHeader14">3-块级元素（relative + transform）</h3>
<p>前面水平居中的时候也出现过这种方式，也可以使用position: absolute方式，但要对应地将外部元素设置成position: relative</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer .inner {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<h3 id="articleHeader15">4-块级元素（vertical-align + table-cell）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    display: table-cell;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<h3 id="articleHeader16">5-块级元素（vertical-align + inline-block）</h3>
<p>原理是新建一个inner的兄弟元素，高度撑开整个容器，再对inner使用vertical-align: middle 使元素居中，不需要知道内部元素的高度</p>
<p>html结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;outer&quot;>
    <div class=&quot;inner&quot;></div>
    <div class=&quot;sibling&quot;></div>
  </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"outer"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"sibling"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer .inner {
    vertical-align: middle;
    display: inline-block;
}
.outer .slibing {
    height: 400px;
    display: inline-block;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.outer</span> <span class="hljs-selector-class">.slibing</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<h3 id="articleHeader17">5-块级元素（伪元素）</h3>
<p>原理和上面的方式一样，只是通过伪元素去撑开高度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inner {
    display: inline-block;
    vertical-align: middle;
}
.outer::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.outer</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<h3 id="articleHeader18">6-块级元素（flexbox）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    display: flex;
    align=items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>.<span class="hljs-class">outer </span>{
<span class="hljs-symbol">    display:</span> flex;
    align=items: center;
}</code></pre>
<p>欢迎继续补充~</p>
<p>如果喜欢请关注我的<a href="https://github.com/louzhedong/blog" rel="nofollow noreferrer" target="_blank">Blog</a>，给个<a href="https://github.com/louzhedong/blog" rel="nofollow noreferrer" target="_blank">Star</a>吧，会定期分享一些JS中的知识，^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css 水平垂直居中实现方式

## 原文链接
[https://segmentfault.com/a/1190000014048464](https://segmentfault.com/a/1190000014048464)

