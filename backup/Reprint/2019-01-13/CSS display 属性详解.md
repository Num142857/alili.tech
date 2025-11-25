---
title: 'CSS display 属性详解' 
date: 2019-01-13 2:30:11
hidden: true
slug: uqnpq990kf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<code>http://zhanfang.github.io/2016/07/22/display属性详解</code><br>转载请注明地址及作者: <code>zhanfang</code></p></blockquote>
<p>最近瞎忙了好长一段时间，一直没时间写文章，想深入学习一下css的相关属性，所以有了这篇文章，如有错误请指针。</p>
<h2 id="articleHeader0">display的所有属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS 1 */
display: none;
display: inline;
display: block;
display: list-item;

/* CSS 2.1 */
display: inline-block;

display: table;
display: inline-table;
display: table-cell;
display: table-column;
display: table-column-group;
display: table-footer-group;
display: table-header-group;
display: table-row;
display: table-row-group;
display: table-caption;
/* CSS 2.1 */

/* CSS 3 */
display: inline-list-item;
display: flex;
display: box;
display: inline-flex;

display: grid;
display: inline-grid;

display: ruby;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;
/* CSS 3 */

/* Experimental values */
display: contents;
display: run-in;
/* Experimental values */

/* Global values */
display: inherit;
display: initial;
display: unset;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* CSS 1 */</span>
<span class="hljs-attribute">display</span>: none;
<span class="hljs-attribute">display</span>: inline;
<span class="hljs-attribute">display</span>: block;
<span class="hljs-attribute">display</span>: list-item;

<span class="hljs-comment">/* CSS 2.1 */</span>
<span class="hljs-attribute">display</span>: inline-block;

<span class="hljs-attribute">display</span>: table;
<span class="hljs-attribute">display</span>: inline-table;
<span class="hljs-attribute">display</span>: table-cell;
<span class="hljs-attribute">display</span>: table-column;
<span class="hljs-attribute">display</span>: table-column-group;
<span class="hljs-attribute">display</span>: table-footer-group;
<span class="hljs-attribute">display</span>: table-header-group;
<span class="hljs-attribute">display</span>: table-row;
<span class="hljs-attribute">display</span>: table-row-group;
<span class="hljs-attribute">display</span>: table-caption;
<span class="hljs-comment">/* CSS 2.1 */</span>

<span class="hljs-comment">/* CSS 3 */</span>
<span class="hljs-attribute">display</span>: inline-list-item;
<span class="hljs-attribute">display</span>: flex;
<span class="hljs-attribute">display</span>: box;
<span class="hljs-attribute">display</span>: inline-flex;

<span class="hljs-attribute">display</span>: grid;
<span class="hljs-attribute">display</span>: inline-grid;

<span class="hljs-attribute">display</span>: ruby;
<span class="hljs-attribute">display</span>: ruby-base;
<span class="hljs-attribute">display</span>: ruby-text;
<span class="hljs-attribute">display</span>: ruby-base-container;
<span class="hljs-attribute">display</span>: ruby-text-container;
<span class="hljs-comment">/* CSS 3 */</span>

<span class="hljs-comment">/* Experimental values */</span>
<span class="hljs-attribute">display</span>: contents;
<span class="hljs-attribute">display</span>: run-in;
<span class="hljs-comment">/* Experimental values */</span>

<span class="hljs-comment">/* Global values */</span>
<span class="hljs-attribute">display</span>: inherit;
<span class="hljs-attribute">display</span>: initial;
<span class="hljs-attribute">display</span>: unset;</code></pre>
<p>下面就display的重要属性进行讲解，并配合一些相关的例子</p>
<h2 id="articleHeader1">基本属性</h2>
<h3 id="articleHeader2">display: none</h3>
<p>none 是 CSS 1 就提出来的属性，将元素设置为none的时候既不会占据空间，也无法显示，相当于该元素不存在。</p>
<p>该属性可以用来改善重排与重绘，同时我也经常用它来做模态窗等效果。</p>
<h3 id="articleHeader3">display: inline</h3>
<p>inline也是 CSS 1 提出的属性，它主要用来设置行内元素属性，设置了该属性之后设置高度、宽度都无效，同时text-align属性设置也无效，但是设置了line-height会让inline元素居中</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006783589" src="https://static.alili.tech/img/remote/1460000006783589" alt="Alt" title="Alt" style="cursor: pointer;"></span></p>
<p>同时从上图可以看到两个inline标签之间出现了奇怪的间隔，改间隔的原因是div换行产生的换行空白，解决办法</p>
<ul><li><p>将两个inline标签写到一行</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div class=&quot;test&quot;>123</div><div class=&quot;test&quot;>123</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;body&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"test"</span>&gt;<span class="hljs-number">123</span>&lt;/<span class="hljs-keyword">div</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"test"</span>&gt;<span class="hljs-number">123</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/body&gt;</code></pre>
<ul><li><p>或者使用一点技巧</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
  <div class=&quot;main&quot;>
    <div class=&quot;test&quot;>zhan</div>
    <div class=&quot;test&quot;>123</div>
  </div>

</body>
</html>


html{
  -webkit-text-size-adjust:none;/* 使用webkit的私有属性，让字体大小不受设备终端的调整，可定义字体大小小于12px */
}
.main{
  font-size:0;
  *word-spacing:-1px;/* 使用word-spacing 修复 IE6、7 中始终存在的 1px 空隙，减少单词间的空白（即字间隔） */
}
.test{
  display:inline;
  width: 10000px;
  height:10000px;
  border:1px solid;
  font-size:12px;

  letter-spacing: normal;/* 设置字母、字间距为0 */ 
  word-spacing: normal; /* 设置单词、字段间距为0 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>zhan<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>


html{
  -webkit-text-size-adjust:none;/* 使用webkit的私有属性，让字体大小不受设备终端的调整，可定义字体大小小于12px */
}
.main{
  font-size:0;
  *word-spacing:-1px;/* 使用word-spacing 修复 IE6、7 中始终存在的 1px 空隙，减少单词间的空白（即字间隔） */
}
.test{
  display:inline;
  width: 10000px;
  height:10000px;
  border:1px solid;
  font-size:12px;

  letter-spacing: normal;/* 设置字母、字间距为0 */ 
  word-spacing: normal; /* 设置单词、字段间距为0 */
}</code></pre>
<p>实测chome49浏览器只用设置父元素的font-size为0即可。</p>
<blockquote><p>目前有很多原生的元素都是inline的，span、a、label、input、 img、 strong 和em就是典型的行内元素元素。<br>链接：<a href="http://www.css88.com/archives/646" rel="nofollow noreferrer" target="_blank">http://www.css88.com/archives...</a></p></blockquote>
<h3 id="articleHeader4">display: block</h3>
<p>设置元素为块状元素，如果不指定宽高，默认会继承父元素的宽度，并且独占一行，即使宽度有剩余也会独占一行，高度一般以子元素撑开的高度为准，当然也可以自己设置宽度和高度。</p>
<blockquote><p>在设计的过程中有时需要设计一个div宽高都是整个屏幕，整个时候宽度很好设置，可是高度一般很难设置，因为页面一般都是可以滚动的，所以高度一般可变，所以这个时候可以使用一个小技巧，如下。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
  <div class=&quot;main&quot;>
  </div>
</body>
</html>

html{
  height: 100%;
}
body{
  height: 100%;
  padding: 0;
  margin:0;
}
.main{
  background: red;
  width: 100%;
  height: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

html{
  height: 100%;
}
body{
  height: 100%;
  padding: 0;
  margin:0;
}
.main{
  background: red;
  width: 100%;
  height: 100%;
}</code></pre>
<blockquote><p>基本原理：div继承的是父元素body的高度，body是继承html的高度，html是继承的浏览器屏幕的高度。</p></blockquote>
<h3 id="articleHeader5">display: list-item</h3>
<p>此属性默认会把元素作为列表显示，要完全模仿列表的话还需要加上 <code>list-style-position</code>，<code>list-style-type</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
<div>
  <span>111111</span>
  <span>222222</span>
  <span>333333</span>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>222222<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>333333<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
  padding-left:30px;
}

span{ 
  display:list-item;
  list-style:disc outside none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">padding-left</span>:<span class="hljs-number">30px</span>;
}

<span class="hljs-selector-tag">span</span>{ 
  <span class="hljs-attribute">display</span>:list-item;
  <span class="hljs-attribute">list-style</span>:disc outside none;
}</code></pre>
<p>效果图如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000006047877" src="https://static.alili.tech/img/remote/1460000006047877" alt="Alt" title="Alt" style="cursor: pointer;"></span></p>
<p>通过上面样式设置，就能仿出一个类似的列表，一定要在div上加padding，因为默认的列表之前的·在box外面</p>
<h3 id="articleHeader6">display: inline-block</h3>
<p>inline-block为 CSS 2.1 新增的属性。 <strong>inline-block既具有block的宽高特性又具有inline的同行元素特性。</strong> 通过inline-block结合<code>text-align: justify</code> 还可以实现固定宽高的列表两端对齐布局，如下例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
<div class=&quot;main&quot;>
  <div class=&quot;col col1&quot;>111111</div>
  <div class=&quot;col col2&quot;>222222</div>
  <div class=&quot;col col3&quot;>333333</div>
  <div class=&quot;col col1&quot;>111111</div>
  <div class=&quot;col col2&quot;>222222</div>
  <div class=&quot;col col3&quot;>333333</div>
  <div class=&quot;col fix&quot;>&amp;nbsp;</div>
  <div class=&quot;col fix&quot;>&amp;nbsp;</div>
  <div class=&quot;col fix&quot;>&amp;nbsp;</div>
  <div class=&quot;col fix&quot;>&amp;nbsp;</div>
  <div class=&quot;col fix&quot;>&amp;nbsp;</div>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col1"</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col2"</span>&gt;</span>222222<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col3"</span>&gt;</span>333333<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col1"</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col2"</span>&gt;</span>222222<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col col3"</span>&gt;</span>333333<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col fix"</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col fix"</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col fix"</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col fix"</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col fix"</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
  margin:0;
  padding:0; 
}
.main{
  text-align:justify;
}
.col{ 
  display: inline-block;
  margin-top:10px;
  width:100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.col1{
  background: red;
}
.col2{
  background: green;
}
.col3{
  background: blue;
}
.fix{
  height:0; 
  padding:0; 
  overflow:hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; 
}
<span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">text-align</span>:justify;
}
<span class="hljs-selector-class">.col</span>{ 
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.col1</span>{
  <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.col2</span>{
  <span class="hljs-attribute">background</span>: green;
}
<span class="hljs-selector-class">.col3</span>{
  <span class="hljs-attribute">background</span>: blue;
}
<span class="hljs-selector-class">.fix</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>; 
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; 
  <span class="hljs-attribute">overflow</span>:hidden;
}</code></pre>
<p>效果图如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000006047879" src="https://static.alili.tech/img/remote/1460000006047879" alt="Alt" title="Alt" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p><code>text-align: justify</code> 属性会使行内元素两端对齐，但是要求这些行内元素总宽度至少占满一行，所以在总宽度不足一行的时候这个属性没用，因此在最后需要加上一些占位符。</p></blockquote>
<p>详情可以查看 <a href="http://www.zhangxinxu.com/wordpress/2011/03/displayinline-blocktext-alignjustify%E4%B8%8B%E5%88%97%E8%A1%A8%E7%9A%84%E4%B8%A4%E7%AB%AF%E5%AF%B9%E9%BD%90%E5%B8%83%E5%B1%80/" rel="nofollow noreferrer" target="_blank">张鑫旭老师的博客</a></p>
<p><strong>Tip: inline-block会形成一个BFC</strong></p>
<h3 id="articleHeader7">display: table</h3>
<p>table 此元素会作为块级表格来显示（类似table），表格前后带有换行符。CSS表格能够解决所有那些我们在使用绝对定位和浮动定位进行多列布局时所遇到的问题。例如，<code>display:table</code>的CSS声明能够让一个HTML元素和它的子节点像table元素一样。使用基于表格的CSS布局，使我们能够轻松定义一个单元格的边界、背景等样式， <strong>而不会产生因为使用了table那样的制表标签所导致的语义化问题。</strong></p>
<p>利用table的特性，我们能够轻易的实现三栏布局，并且能够兼容IE8，如下是使用table属性，实现三栏布局的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
<div class=&quot;main&quot;>
  <div class=&quot;tr tr1&quot;>
    <div class=&quot;td&quot;>head1</div>
    <div class=&quot;td&quot;>head2</div>
    <div class=&quot;td&quot;>head3</div>
  </div>
  <div class=&quot;tr tr2&quot;>
    <div class=&quot;td&quot;>123</div>
    <div class=&quot;td&quot;>123</div>
    <div class=&quot;td&quot;>123</div>
  </div>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tr tr1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>head1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>head2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>head3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tr tr2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main{
  display: table;
  width:100%;
  border-collapse: collapse;/*为表格设置合并边框模型：*/
}
.tr{
  display: table-row;
  border-color: inherit;
}
.tr1 .td{
  height:50px;
  vertical-align: middle;
}
.td{
  display: table-cell;
  border: 1px solid;
}
.td:nth-of-type(1){
  width: 100px;
}
.td:nth-of-type(3){
  width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border-collapse</span>: collapse;<span class="hljs-comment">/*为表格设置合并边框模型：*/</span>
}
<span class="hljs-selector-class">.tr</span>{
  <span class="hljs-attribute">display</span>: table-row;
  <span class="hljs-attribute">border-color</span>: inherit;
}
<span class="hljs-selector-class">.tr1</span> <span class="hljs-selector-class">.td</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.td</span>{
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}
<span class="hljs-selector-class">.td</span><span class="hljs-selector-pseudo">:nth-of-type(1)</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.td</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>效果如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000006047881" src="https://static.alili.tech/img/remote/1460000006047881" alt="Alt" title="Alt" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>CSS2.1表格模型中的元素，可能不会全部包含在除HTML之外的文档语言中。这时，那些“丢失”的元素会被模拟出来，从而使得表格模型能够正常工作。所有的表格元素将会自动在自身周围生成所需的匿名table对象，使其符合table/inline-table、table-row、table-cell的三层嵌套关系。</p></blockquote>
<p>所以在一般情况下我们也可以不写外面的table-row元素以及table元素。</p>
<h3 id="articleHeader8">display: inline-list-item</h3>
<p>我在MDN上面看到有这个属性，但是我实际尝试发现这个属性是不能使用的，在 <a href="http://caniuse.com/#search=inline-list-item" rel="nofollow noreferrer" target="_blank">http://caniuse.com/#search=in...</a> 上面也没有找到这个元素的兼容性，所以应该是不能使用的，支持度全无。</p>
<h3 id="articleHeader9">display: flex</h3>
<p>flex是一种弹性布局属性<br><strong>注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。</strong><br>主要属性有两大类：容器属性和项目的属性</p>
<h4>容器属性</h4>
<ul>
<li><p>flex-direction: 属性决定主轴的方向（即项目的排列方向）。</p></li>
<li><p>flex-wrap: 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。</p></li>
<li><p>flex-flow: 属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。</p></li>
<li><p>justify-content: 属性定义了项目在主轴上的对齐方式。</p></li>
<li><p>align-items: 属性定义项目在交叉轴上如何对齐。</p></li>
<li><p>align-content: 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p></li>
</ul>
<h4>项目属性</h4>
<ul>
<li><p>order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p></li>
<li><p>flex-grow: 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。</p></li>
<li><p>flex-shrink: 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。</p></li>
<li><p>flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。</p></li>
<li><p>flex: 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。</p></li>
<li><p>align-self: 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。</p></li>
</ul>
<p>以上关于flex的基础知识基本是从阮一峰老师那copy过来的，有兴趣的同学，可以到阮一峰老师的博客深入阅读</p>
<p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br><a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>
<h4>实例：实现一个固定宽度但内容可变的列表</h4>
<p>目前我有一个需求，有一个列表页，左侧固定，右侧固定，总宽度固定，但是左侧的内容可能会增加，右侧的内容也可能会增加，要求平时一行展示，增加的时候两行展示，左侧两行，右侧还是一行，并且都居中。</p>
<p>先上效果图，不然可能会迷糊：<br><span class="img-wrap"><img data-src="/img/remote/1460000006047883" src="https://static.alili.tech/img/remote/1460000006047883" alt="Alt" title="Alt" style="cursor: pointer; display: inline;"></span></p>
<p>为了实现上述效果，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
  <div class=&quot;main&quot;>
    <ul>
      <li>
        <span class=&quot;col1&quot;>累积的分为：123</span>
        <div class=&quot;col2&quot;>
          <span>123</span>
          <span>x 10</span>
          <button>submit</button>
        </div>
      </li>
      <li>
        <span class=&quot;col1&quot;>累积的分为：1234</span>
        <div class=&quot;col2&quot;>
          <img src=&quot;http://7xltvd.com1.z0.glb.clouddn.com/css1.png&quot; alt=&quot;&quot;>
          <span class=&quot;col2-span&quot;>x 10</span>
          <button>submit</button>
        </div>
      </li>
    </ul>
  </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col1"</span>&gt;</span>累积的分为：123<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col2"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>x 10<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col1"</span>&gt;</span>累积的分为：1234<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col2"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://7xltvd.com1.z0.glb.clouddn.com/css1.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col2-span"</span>&gt;</span>x 10<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main{
  height: 200px;
  width: 300px;
  border: 1px solid;
}
ul{
  padding: 0px;
  margin-top: 10px;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border: 1px solid;
}
button{
  height: 20px;
  vertical-align: middle;
  border:0;
  background: green;
  outline:none;
}
img{
  width:30px;
  vertical-align: middle;
}
.col2-span{
  vertical-align: middle;
}
.col1{
  width: 130px;
  padding-left:8px;
}
.col2{
  padding-right: 8px;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}
<span class="hljs-selector-tag">ul</span>{
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">li</span>{
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-between;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}
<span class="hljs-selector-tag">button</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">background</span>: green;
  <span class="hljs-attribute">outline</span>:none;
}
<span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.col2-span</span>{
  <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.col1</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">130px</span>;
  <span class="hljs-attribute">padding-left</span>:<span class="hljs-number">8px</span>;
}
<span class="hljs-selector-class">.col2</span>{
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<h4>display: -webkit-box</h4>
<p>由于某X5浏览器某些版本还不支持最新版的flex布局，所以为了保证良好的运行，建议还是使用<code>display: box</code>，box和flex布局的主要差别如下:</p>
<h5>容器属性</h5>
<ul>
<li><p>display: box<br>该显示样式的新值可将此元素及其直系子代加入弹性框模型中。Flexbox 模型只适用于直系子代。</p></li>
<li><p>box-orient<br>值：horizontal | vertical | inherit</p></li>
</ul>
<p>框的子代是如何排列的？还有两个值：inline-axis（真正的默认值）和 block-axis，但是它们分别映射到水平和垂直方向。</p>
<ul><li><p>box-pack<br>值：start | end | center | justify</p></li></ul>
<p>设置沿 box-orient 轴的框排列方式。因此，如果 box-orient 是水平方向，就会选择框的子代的水平排列方式，反之亦然。</p>
<ul><li><p>box-align<br>值：start | end | center | baseline | stretch</p></li></ul>
<p>基本上而言是 box-pack 的同级属性。设置框的子代在框中的排列方式。如果方向是水平的，该属性就会决定垂直排列，反之亦然。</p>
<h5>项目属性</h5>
<ul><li><p>box-flex<br>值：0 | 任意整数</p></li></ul>
<p>该子代的弹性比。弹性比为 1 的子代占据父代框的空间是弹性比为 2 的同级属性的两倍。其默认值为 0，也就是不具有弹性。</p>
<h5>用box改造上述例子</h5>
<p>基本只修改了容器元素li的属性，如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li{
  display: -webkit-box;
  -webkit-box-orient:horizontal;
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border: 1px solid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">li</span>{
  <span class="hljs-attribute">display</span>: -webkit-box;
  <span class="hljs-attribute">-webkit-box-orient</span>:horizontal;
  <span class="hljs-attribute">-webkit-box-pack</span>: justify;
  <span class="hljs-attribute">-webkit-box-align</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}</code></pre>
<h3 id="articleHeader10">display: inline-flex</h3>
<p>我发现在chrome条件下设置了inline-flex，其子元素全部变成了inline模式，设置flex并没有什么用，不知道是不是我写的有问题，目前没找到这个属性的用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
  <div class=&quot;main&quot;>
    <div class=&quot;sp1&quot;>123</div>
    <div class=&quot;sp1&quot;>123</div>
  </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sp1"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sp1"</span>&gt;</span>123<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main{
  display: -webkit-inline-flex;
  justify-content: center;
}
.sp1{
  flex:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">display</span>: -webkit-inline-flex;
  <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.sp1</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}</code></pre>
<h3 id="articleHeader11">其他</h3>
<p>以下属性是实验性质的，支持度都很低，不建议使用，知道就行。</p>
<ul>
<li><p>run-in: 此元素会根据上下文作为块级元素或内联元素显示；</p></li>
<li><p>grid: 栅格模型，类似block</p></li>
<li><p>inline-grid: 栅格模型，类似inline-block</p></li>
<li><p>ruby, ruby-base, ruby-text, ruby-base-container, ruby-text-container</p></li>
<li><p>contents</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS display 属性详解

## 原文链接
[https://segmentfault.com/a/1190000006047872](https://segmentfault.com/a/1190000006047872)

