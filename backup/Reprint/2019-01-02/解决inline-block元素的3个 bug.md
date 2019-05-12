---
title: '解决inline-block元素的3个 bug' 
date: 2019-01-02 2:30:09
hidden: true
slug: 7euugcip813
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>在使用inline-block时，有时候出现的效果莫名奇妙，例如：</p>
<ul>
<li>两个inline-block 元素之间如果有空格、回车、tab，那么在页面上就有一个空隙</li>
<li>两个不同高度的 inline-block 元素顶部无法对齐，或者使用inline-block下面无缘无故多出几像素</li>
</ul>
</blockquote>
<h2 id="articleHeader0">例子1,出现空隙</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    div{
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  <div></div>
  <div></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>效果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934933" src="https://static.alili.tech/img/remote/1460000010934933" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>解决方法</h4>
<p><strong>1.去掉空格</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    div{
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  <div></div><div></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>2. 添加父元素，将父元素的 font-size 设置为0，然后在 inline-block 元素中将 font-size 设置为 14px</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    .parent{
      font-size:0;
    }
    .child{
      font-size:14px;
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  <div class=&quot;parent&quot;>
    <div class=&quot;child&quot;></div>
    <div class=&quot;child&quot;></div>
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
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span>{
      <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>3. 使用<code>margin-right</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    .child{
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
      margin-right:-5px;
    }
  </style>
</head>

<body>
  <div class=&quot;child&quot;></div>
  <div class=&quot;child&quot;></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
      <span class="hljs-attribute">margin-right</span>:-<span class="hljs-number">5px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>4. 添加父元素，使用letter-spacing（该属性增加或减少字符间的空白（字符间距））</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    .parent{
      letter-spacing:-5px;
    }
    .child{
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  <div class=&quot;parent&quot;>
    <div class=&quot;child&quot;></div>
    <div class=&quot;child&quot;></div>
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
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span>{
      <span class="hljs-attribute">letter-spacing</span>:-<span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>5. 使用word-spacing （该属性增加或减少单词间的空白（即字间隔））</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    .parent{
      word-spacing:-5px;
    }
    .child{
      display: inline-block;
      width:100px;
      height: 100px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  <div class=&quot;parent&quot;>
    <div class=&quot;child&quot;></div>
    <div class=&quot;child&quot;></div>
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
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span>{
      <span class="hljs-attribute">word-spacing</span>:-<span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>解决效果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934934" src="https://static.alili.tech/img/remote/1460000010934934" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">例子2，设置inline-block 后，莫名其妙出现一些空白</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>span设为inline-block之后下面的空白</title>
  <style>
    div{
      border:solid 1px rgb(202, 43, 43);
      width:250px;
    }
    span{
      display:inline-block;
      width:200px;
      height:200px;
      background-color:rgb(109, 195, 252);
      
    }
  </style>
</head>

<body>
  <div>
    <span></span>
  </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>span设为inline-block之后下面的空白<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
      <span class="hljs-attribute">border</span>:solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgb</span>(202, 43, 43);
      <span class="hljs-attribute">width</span>:<span class="hljs-number">250px</span>;
    }
    <span class="hljs-selector-tag">span</span>{
      <span class="hljs-attribute">display</span>:inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">background-color</span>:<span class="hljs-built_in">rgb</span>(109, 195, 252);
      
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934935" src="https://static.alili.tech/img/remote/1460000010934935" alt="" title="" style="cursor: pointer;"></span></p>
<h4>解决方法</h4>
<p><strong>使用vertical-align</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>span设为inline-block之后下面的空白</title>
  <style>
    div{
      border:solid 1px rgb(202, 43, 43);
      width:250px;
    }
    span{
      display:inline-block;
      width:200px;
      height:200px;
      background-color:rgb(109, 195, 252);
      vertical-align:top;//新增
    }
  </style>
</head>

<body>
  <div>
    <span></span>
  </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>span设为inline-block之后下面的空白<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    div{
      border:solid 1px rgb(202, 43, 43);
      width:250px;
    }
    span{
      display:inline-block;
      width:200px;
      height:200px;
      background-color:rgb(109, 195, 252);
      vertical-align:top;//新增
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>解决效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934936" src="https://static.alili.tech/img/remote/1460000010934936" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">例子3，两个不同高度的 inline-block 元素顶部无法对齐</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    
    .child1{
      display: inline-block;
      width:100px;
      height: 100px;
      
      background-color: rgb(109, 195, 252);
    }
    .child2{
      display: inline-block;
      width:100px;
      height: 120px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  
    <div class=&quot;child1&quot;></div>
    <div class=&quot;child2&quot;></div>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    
    <span class="hljs-selector-class">.child1</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(109, 195, 252);
    }
    <span class="hljs-selector-class">.child2</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934937" src="https://static.alili.tech/img/remote/1460000010934937" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>解决方法</h4>
<p><strong>还是使用vertical-align</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
  <style>
    
    .child1{
      display: inline-block;
      width:100px;
      height: 100px;
      vertical-align:top;//新增
      background-color: rgb(109, 195, 252);
    }
    .child2{
      display: inline-block;
      width:100px;
      height: 120px;
      background-color: rgb(233, 148, 148);
    }
  </style>
</head>

<body>
  
    <div class=&quot;child1&quot;></div>
    <div class=&quot;child2&quot;></div>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    
    .child1{
      display: inline-block;
      width:100px;
      height: 100px;
      vertical-align:top;//新增
      background-color: rgb(109, 195, 252);
    }
    .child2{
      display: inline-block;
      width:100px;
      height: 120px;
      background-color: rgb(233, 148, 148);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>解决效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010934938" src="https://static.alili.tech/img/remote/1460000010934938" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决inline-block元素的3个 bug

## 原文链接
[https://segmentfault.com/a/1190000010934928](https://segmentfault.com/a/1190000010934928)

