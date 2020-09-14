---
title: '【译】22个必备的CSS小技巧' 
date: 2019-02-08 2:30:40
hidden: true
slug: a9cnw2yjs37
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="http://ipestov.com/22-essential-css-recipes/" rel="nofollow noreferrer" target="_blank">22 Essential CSS Recipes</a><br>更多译文将陆续推出，欢迎点赞+收藏+关注<a href="https://segmentfault.com/blog/jrain">我的专栏</a>，未完待续……</p></blockquote>
<hr>
<p>大家好，今天我们将会介绍一些非常实用的CSS小技巧，让我们开始吧！</p>
<h2 id="articleHeader0">混合模式</h2>
<p><span class="img-wrap"><img data-src="/img/bVyLrB" src="https://static.alili.tech/img/bVyLrB" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>不久之前Firefox和Safari浏览器已经开始支持类似Photoshop的混合模式，但是在Chrome和Opera浏览器中需要添加前缀。举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 你也可以尝试不同的样式

.blend {
    background: #fff;
}
.blend img {
    mix-blend-mode: darken; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// 你也可以尝试不同的样式</span>

.<span class="hljs-class">blend </span>{
<span class="hljs-symbol">    background:</span> <span class="hljs-meta">#fff;</span>
}
.blend <span class="hljs-class">img </span>{
    mix-blend-mode: darken; 
}</code></pre>
<p><a href="http://ilyashubin.github.io/FilterBlend/" rel="nofollow noreferrer" target="_blank">在线体验地址</a></p>
<h2 id="articleHeader1">渐变边框</h2>
<p><span class="img-wrap"><img data-src="/img/bVyLsh" src="https://static.alili.tech/img/bVyLsh" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>现在，你甚至可以在边框中使用渐变。<br>要使用渐变边框非常简单，只需要设置一个更低<code>z-index</code>的伪元素即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  margin: 80px 30px;
  width: 200px;
  height: 200px;
  position: relative;
  background: #fff;
  float: left;
}
.box:before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 220px;
      height: 220px;
      top: -10px;
      left: -10px;
      background-image: linear-gradient(90deg, yellow, gold);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">80px</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">:before</span> {
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">220px</span>;
      <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">left</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(90deg, yellow, gold);
}</code></pre>
<p>具体的例子可以看<a href="https://jsfiddle.net/4qypuono/" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="4qypuono/" data-typeid="0">点击预览</button>，或者看<a href="http://codepen.io/anon/pen/jEOGJe" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="anon/pen/jEOGJe" data-typeid="3">点击预览</button>使用的是<code>background-clip</code>和<code>background-origin</code>属性。在不久的将来，也许所有浏览器都将支持<code>border-image</code>属性，最终的代码会和下面一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    border-image: linear-gradient(to bottom, #000000 0%, #FFFFFF 100%); 
    border-image-slice: 1; /* set internal offset */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">border-image</span>: <span class="hljs-built_in">linear-gradient</span>(to bottom, #000000 0%, #FFFFFF 100%); 
    <span class="hljs-attribute">border-image-slice</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/* set internal offset */</span>
}</code></pre>
<h2 id="articleHeader2">z-index的过渡</h2>
<p><span class="img-wrap"><img data-src="/img/bVyLs1" src="https://static.alili.tech/img/bVyLs1" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>也许你不知道<code>z-index</code>同样支持过渡！在过渡的每一步中，它的值都不发生改变，所以你以为它不支持过渡——但其实它支持。<br><a href="http://zomigi.com/demo/z-index_transition.html" rel="nofollow noreferrer" target="_blank">举个栗子</a></p>
<h2 id="articleHeader3">currentColor</h2>
<p>我们可以使用这个方法来侦测当前的颜色，以避免经常地重复定义它。<br>这个方法在使用SVG图标的时候非常有用，因为它们的颜色由其父元素决定。通常我们是这么做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
  color: black;
}
.button:hover {
  color: red;
}
.button:active {
  color: green;
}

.button svg {
  fill: black;
}
.button:hover svg {
  fill: red;
}
.button:active svg {
  fill: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.button</span> {
  <span class="hljs-attribute">color</span>: black;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:active</span> {
  <span class="hljs-attribute">color</span>: green;
}

<span class="hljs-selector-class">.button</span> <span class="hljs-selector-tag">svg</span> {
  <span class="hljs-attribute">fill</span>: black;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">svg</span> {
  <span class="hljs-attribute">fill</span>: red;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:active</span> <span class="hljs-selector-tag">svg</span> {
  <span class="hljs-attribute">fill</span>: green;
}</code></pre>
<p>但我们可以使用<code>currentColor</code>这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="svg {  
  fill: currentColor;
}

.button {
  color: black;
  border: 1px solid currentColor;
}
.button:hover {
  color: red;
}
.button:active {
  color: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">svg</span> {  
  <span class="hljs-attribute">fill</span>: currentColor;
}

<span class="hljs-selector-class">.button</span> {
  <span class="hljs-attribute">color</span>: black;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid currentColor;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-pseudo">:active</span> {
  <span class="hljs-attribute">color</span>: green;
}</code></pre>
<p>附上其它带有伪元素的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a {  
  color: #000;
}
a:hover {  
  color: #333;
}
a:active {  
  color: #666;
}

a:after,  
a:hover:after,  
a:active:after {  
  background: currentColor;
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span> {  
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}
<span class="hljs-selector-tag">a</span>:hover {  
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-tag">a</span>:active {  
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
}

<span class="hljs-selector-tag">a</span>:after,  
<span class="hljs-selector-tag">a</span>:hover:after,  
<span class="hljs-selector-tag">a</span>:active:after {  
  <span class="hljs-attribute">background</span>: currentColor;
  ...
}</code></pre>
<h2 id="articleHeader4">Object Fit</h2>
<p>你是否还记得为了解决一些问题而给一幅背景图设置<code>background-size</code>属性的时刻呢？现在你可以使用<code>object-fit</code>属性啦，webkit浏览器都支持它，Firefox也将在近期予以支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".image__contain {
  object-fit: contain; 
} 
.image__fill {
  object-fit: fill; 
}
.image__cover {
  object-fit: cover; 
}
.image__scale-down {
  object-fit: scale-down;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.image__contain</span> {
  <span class="hljs-attribute">object-fit</span>: contain; 
} 
<span class="hljs-selector-class">.image__fill</span> {
  <span class="hljs-attribute">object-fit</span>: fill; 
}
<span class="hljs-selector-class">.image__cover</span> {
  <span class="hljs-attribute">object-fit</span>: cover; 
}
<span class="hljs-selector-class">.image__scale-down</span> {
  <span class="hljs-attribute">object-fit</span>: scale-down;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLvK" src="https://static.alili.tech/img/bVyLvK" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><a href="http://codepen.io/CSSKing/pen/XJEZeG" rel="nofollow noreferrer" target="_blank">举个栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="CSSKing/pen/XJEZeG" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader5">单选框和复选框的样式</h2>
<p>让我们一起不使用图片来设置复选框的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<input type=&quot;checkbox&quot; id=&quot;check&quot; name=&quot;check&quot; />
<label for=&quot;check&quot;>Checkbox</label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"check"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"check"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"check"</span>&gt;</span>Checkbox<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -->
input[type=checkbox] {display: none;}

input[type=checkbox] + label:before {  
    content: &quot;&quot;;
    border: 1px solid #000;
    font-size: 11px;    
    line-height: 10px;
    margin: 0 5px 0 0;
    height: 10px;
    width: 10px;
    text-align: center;
    vertical-align: middle;
}

input[type=checkbox]:checked + label:before {  
    content: &quot;\2713&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">css</span> <span class="hljs-selector-tag">--</span>&gt;
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span> {<span class="hljs-attribute">display</span>: none;}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">11px</span>;    
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">vertical-align</span>: middle;
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\2713"</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLvZ" src="https://static.alili.tech/img/bVyLvZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>正如你所看见的，我们隐藏了原有的复选框，改为使用伪元素和伪类<code>:checked</code>（IE9+）来表现它。当它被选中时，一个设置在<code>content</code>里的Unicode编码的字符将会显示出来。</p>
<blockquote><p>值得注意的是，Unicode编码在CSS和HTML中的写法是不一样的。在CSS中它是一个以反斜杠为开始的十六进制数，而在HTML中它是十进制的，比如<code>&amp;#10003;</code>。<br>接着为我们的复选框添加一些动画效果：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- checkbox -->
input[type=checkbox] + label:before {  
    content: &quot;\2713&quot;;
    color: transparent;
    transition: color ease .3s;
}
input[type=checkbox]:checked + label:before {  
    color: #000;
}

<!-- radio -->
input[type=radio] + label:before {  
    content: &quot;\26AB&quot;;
    border: 1px solid #000;
    border-radius: 50%;
    font-size: 0;    
    transition: font-size ease .3s;
}
input[type=radio]:checked + label:before {  
    font-size: 10px;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">checkbox</span> <span class="hljs-selector-tag">--</span>&gt;
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\2713"</span>;
    <span class="hljs-attribute">color</span>: transparent;
    <span class="hljs-attribute">transition</span>: color ease .<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}

&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">radio</span> <span class="hljs-selector-tag">--</span>&gt;
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=radio]</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\26AB"</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;    
    <span class="hljs-attribute">transition</span>: font-size ease .<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:before</span> {  
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;    
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLwH" src="https://static.alili.tech/img/bVyLwH" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><a href="http://unicode-table.com/en/" rel="nofollow noreferrer" target="_blank">这里</a>是所有的Unicode编码，以及可以在<a href="http://codepen.io/anon/pen/CdzwB" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="anon/pen/CdzwB" data-typeid="3">点击预览</button>进行体验。</p>
<h2 id="articleHeader6">CSS中的计数器</h2>
<p>总所周知CSS中是可以使用计数器的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<ol class=&quot;list&quot;>  
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ol>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>  </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -->
.list {
    counter-reset: i; //reset conunter
}
.list > li {
    counter-increment: i; //counter ID
}
.list li:after {
    content: &quot;[&quot; counter(i) &quot;]&quot;; //print the result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;!-- css --&gt;
<span class="hljs-selector-class">.list</span> {
    <span class="hljs-attribute">counter-reset</span>: i; <span class="hljs-comment">//reset conunter</span>
}
<span class="hljs-selector-class">.list</span> &gt; <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">counter-increment</span>: i; <span class="hljs-comment">//counter ID</span>
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span>:after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"["</span> counter(i) <span class="hljs-string">"]"</span>; <span class="hljs-comment">//print the result</span>
}</code></pre>
<p>我们定义了一个ID在<code>counter-reset</code>属性中作为初始值（默认为0）。你可以设置另一个值在<code>counter-increment</code>属性中作为每一步的递增值。</p>
<h2 id="articleHeader7">高级CSS计数器</h2>
<p>你可以计算出有多少个复选框被用户勾选了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<div class=&quot;languages&quot;>  
  <input id=&quot;c&quot; type=&quot;checkbox&quot;><label for=&quot;c&quot;>C</label>
  <input id=&quot;C++&quot; type=&quot;checkbox&quot;><label for=&quot;C++&quot;>C++</label>
  <input id=&quot;C#&quot; type=&quot;checkbox&quot;><label for=&quot;C#&quot;>C#</label>
  <input id=&quot;Java&quot; type=&quot;checkbox&quot;><label for=&quot;Java&quot;>Java</label>
  <input id=&quot;JavaScript&quot; type=&quot;checkbox&quot;><label for=&quot;JavaScript&quot;>JavaScript</label>
  <input id=&quot;PHP&quot; type=&quot;checkbox&quot;><label for=&quot;PHP&quot;>PHP</label>
  <input id=&quot;Python&quot; type=&quot;checkbox&quot;><label for=&quot;Python&quot;>Python</label>
  <input id=&quot;Ruby&quot; type=&quot;checkbox&quot;><label for=&quot;Ruby&quot;>Ruby</label>
</div>  
<p class=&quot;total&quot;>  
  Total selected:
</p>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;!-- <span class="hljs-selector-tag">html</span> --&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"languages"</span>&gt;  
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"c"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"c"</span>&gt;C&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"C++"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"C++"</span>&gt;C++&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"C#"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"C#"</span>&gt;C#&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"Java"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"Java"</span>&gt;Java&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"JavaScript"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"JavaScript"</span>&gt;JavaScript&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"PHP"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"PHP"</span>&gt;PHP&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"Python"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"Python"</span>&gt;Python&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"Ruby"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"Ruby"</span>&gt;Ruby&lt;/label&gt;
&lt;/div&gt;  
&lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"total"</span>&gt;  
  Total selected:
&lt;/p&gt;  </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -->
.languages {
  counter-reset: characters;
}
input:checked {  
  counter-increment: characters;
}
.total:after {
  content: counter(characters);
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">css</span> <span class="hljs-selector-tag">--</span>&gt;
<span class="hljs-selector-class">.languages</span> {
  <span class="hljs-attribute">counter-reset</span>: characters;
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked</span> {  
  <span class="hljs-attribute">counter-increment</span>: characters;
}
<span class="hljs-selector-class">.total</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-built_in">counter</span>(characters);
} </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLxr" src="https://static.alili.tech/img/bVyLxr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>你也可以制作一个简单的计算器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<div class=&quot;numbers&quot;>  
  <input id=&quot;one&quot; type=&quot;checkbox&quot;><label for=&quot;one&quot;>1</label>
  <input id=&quot;two&quot; type=&quot;checkbox&quot;><label for=&quot;two&quot;>2</label>
  <input id=&quot;three&quot; type=&quot;checkbox&quot;><label for=&quot;three&quot;>3</label>
  <input id=&quot;four&quot; type=&quot;checkbox&quot;><label for=&quot;four&quot;>4</label>
  <input id=&quot;five&quot; type=&quot;checkbox&quot;><label for=&quot;five&quot;>5</label>
  <input id=&quot;one-hundred&quot; type=&quot;checkbox&quot;><label for=&quot;one-hundred&quot;>100</label>
</div>  
<p class=&quot;sum&quot;>  
  Sum 
</p>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;!-- <span class="hljs-selector-tag">html</span> --&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"numbers"</span>&gt;  
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"one"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"one"</span>&gt;<span class="hljs-number">1</span>&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"two"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"two"</span>&gt;<span class="hljs-number">2</span>&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"three"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"three"</span>&gt;<span class="hljs-number">3</span>&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"four"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"four"</span>&gt;<span class="hljs-number">4</span>&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"five"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"five"</span>&gt;<span class="hljs-number">5</span>&lt;/label&gt;
  &lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"one-hundred"</span> type=<span class="hljs-string">"checkbox"</span>&gt;&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"one-hundred"</span>&gt;<span class="hljs-number">100</span>&lt;/label&gt;
&lt;/div&gt;  
&lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"sum"</span>&gt;  
  Sum 
&lt;/p&gt;  </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -->
.numbers {
  counter-reset: sum;
}

#one:checked { counter-increment: sum 1; }
#two:checked { counter-increment: sum 2; }
#three:checked { counter-increment: sum 3; }
#four:checked { counter-increment: sum 4; }
#five:checked { counter-increment: sum 5; }
#one-hundred:checked { counter-increment: sum 100; }

.sum::after {
  content: '= ' counter(sum);
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">css</span> <span class="hljs-selector-tag">--</span>&gt;
<span class="hljs-selector-class">.numbers</span> {
  <span class="hljs-attribute">counter-reset</span>: sum;
}

<span class="hljs-selector-id">#one</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">1</span>; }
<span class="hljs-selector-id">#two</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">2</span>; }
<span class="hljs-selector-id">#three</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">3</span>; }
<span class="hljs-selector-id">#four</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">4</span>; }
<span class="hljs-selector-id">#five</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">5</span>; }
<span class="hljs-selector-id">#one-hundred</span><span class="hljs-selector-pseudo">:checked</span> { <span class="hljs-attribute">counter-increment</span>: sum <span class="hljs-number">100</span>; }

<span class="hljs-selector-class">.sum</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">'= '</span> <span class="hljs-built_in">counter</span>(sum);
} </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLxD" src="https://static.alili.tech/img/bVyLxD" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>它同样得以运行，请看具体的<a href="http://codepen.io/CSSKing/pen/vEeMey" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="CSSKing/pen/vEeMey" data-typeid="3">点击预览</button>和<a href="http://codersblock.com/blog/fun-times-with-css-counters/" rel="nofollow noreferrer" target="_blank">文章</a>。</p>
<h2 id="articleHeader8">不使用图片的菜单图标</h2>
<p>你记得你有多么经常被迫需要一个“汉堡”图标吗？<br><span class="img-wrap"><img data-src="/img/bVyLxP" src="https://static.alili.tech/img/bVyLxP" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>这里有至少3个方式去实现它：<br>1、 Shadows</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadow-icon {
  position: relative;
}
.shadow-icon:after {
  content: &quot;&quot;;
  position: absolute;
  left: 0;
  top: -50px;
  height: 100%;
  width: 100%;
  box-shadow: 0 5px 0 #000, 0 15px 0 #fff, 0 25px 0 #000, 0 35px 0 #fff, 0 45px 0 #000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.shadow-icon</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.shadow-icon</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">#000</span>, <span class="hljs-number">0</span> <span class="hljs-number">15px</span> <span class="hljs-number">0</span> <span class="hljs-number">#fff</span>, <span class="hljs-number">0</span> <span class="hljs-number">25px</span> <span class="hljs-number">0</span> <span class="hljs-number">#000</span>, <span class="hljs-number">0</span> <span class="hljs-number">35px</span> <span class="hljs-number">0</span> <span class="hljs-number">#fff</span>, <span class="hljs-number">0</span> <span class="hljs-number">45px</span> <span class="hljs-number">0</span> <span class="hljs-number">#000</span>;
}</code></pre>
<p>2、 Gradient</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".gradient-icon {
    background: linear-gradient(to bottom, #000 0%, #000 20%, transparent 20%, transparent 40%, #000 40%, #000 60%, transparent 60%, transparent 80%, #000 80%, #000 100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>.gradient-icon {
    background: linear-gradient(to bottom, #<span class="hljs-number">000</span> <span class="hljs-number">0</span>%, #<span class="hljs-number">000</span> <span class="hljs-number">20</span>%, transparent <span class="hljs-number">20</span>%, transparent <span class="hljs-number">40</span>%, #<span class="hljs-number">000</span> <span class="hljs-number">40</span>%, #<span class="hljs-number">000</span> <span class="hljs-number">60</span>%, transparent <span class="hljs-number">60</span>%, transparent <span class="hljs-number">80</span>%, #<span class="hljs-number">000</span> <span class="hljs-number">80</span>%, #<span class="hljs-number">000</span> <span class="hljs-number">100</span>%);
}</code></pre>
<p>3、 UTF-8<br>你可以直接使用标准符号：☰ (Unicode: U+2630, HTML: ☰)。你也可以像其他元素那样灵活设置它的颜色或大小。看<a href="http://codepen.io/CSSKing/pen/cozBq" rel="nofollow noreferrer" target="_blank">例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="CSSKing/pen/cozBq" data-typeid="3">点击预览</button>。<br>你也可以使用SVG，字体图标，或者通过伪元素设置的<code>border</code>边框。</p>
<h2 id="articleHeader9">@Supports</h2>
<p>这是一个新的叫做<code>supports</code>的CSS表达式。顾名思义，它可以检测某些设定是否被浏览器所支持，并非所有的浏览器都支持它，但是你仍然可以使用它作为基本的检测手段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@supports (display: flex) {
    div { display: flex; }
}

/*You can check prefixes*/
@supports (display: -webkit-flex) or (display: -moz-flex) or (display: flex) {
    section {
        display: -webkit-flex;
        display: -moz-flex;
        display: flex;
        float: none;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">supports</span> (display: flex) {
    <span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">display</span>: flex; }
}

<span class="hljs-comment">/*You can check prefixes*/</span>
@<span class="hljs-keyword">supports</span> (display: -webkit-flex) or (display: -moz-flex) or (display: flex) {
    <span class="hljs-selector-tag">section</span> {
        <span class="hljs-attribute">display</span>: -webkit-flex;
        <span class="hljs-attribute">display</span>: -moz-flex;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">float</span>: none;
    }
}</code></pre>
<h2 id="articleHeader10">visibility: visible</h2>
<p>依你估计，把一个设置为<code>visibility: visible</code>的元素放在一个设置为<code>visibility: hidden</code>的元素里面，会发生什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hidden {
  visibility: hidden;
}
.hidden .visible {
  visibility: visible;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.hidden</span> {
  <span class="hljs-attribute">visibility</span>: hidden;
}
<span class="hljs-selector-class">.hidden</span> <span class="hljs-selector-class">.visible</span> {
  <span class="hljs-attribute">visibility</span>: visible;
}</code></pre>
<p>你可能会认为两个元素都不显示——然而事实上整个父元素都被隐藏了，而子元素不会。请看<a href="http://codepen.io/CSSKing/pen/lxBfk" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="CSSKing/pen/lxBfk" data-typeid="3">点击预览</button>。</p>
<h2 id="articleHeader11">position: sticky</h2>
<p><span class="img-wrap"><img data-src="/img/bVyLyJ" src="https://static.alili.tech/img/bVyLyJ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>我们发现了一个新的特性，你可以新建一个<code>sticky</code>属性的元素。它的运行效果和<code>fixed</code>相同，但不会挡住任何元素。你最好看看<a href="http://codepen.io/CSSKing/pen/yyMGPJ" rel="nofollow noreferrer" target="_blank">例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="CSSKing/pen/yyMGPJ" data-typeid="3">点击预览</button><br>只有Mozilla和Safari浏览器支持这一属性，但你也可以像下面那样使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sticky {
  position: static;
  position: sticky;
  top: 0px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.sticky</span> {
  <span class="hljs-attribute">position</span>: static;
  <span class="hljs-attribute">position</span>: sticky;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
}</code></pre>
<p>我们将会在支持的浏览器中得到一个<code>sticky</code>属性的元素，而在不支持的浏览器中它将会是一个普通的元素。这在你需要建立一个不可替代的，可以移动的元素的移动端页面的时候非常实用。</p>
<h2 id="articleHeader12">新的尺寸单位</h2>
<p>不久之前，一些新的用以描述不同元素大小的尺寸单位问世了，它们是：</p>
<ul>
<li><p>vw (viewport width) - 浏览器窗口宽度的1%。</p></li>
<li><p>vh (viewport height) - 同上，只不过用来描述高度。</p></li>
<li><p>vmin and vmax 设置介于vh和vw之间的最大最小值。</p></li>
</ul>
<p>有趣的是，几乎所有的现代浏览器都能很好地支持它们，所以你可以放心地使用。<br>为什么我们需要这些新的单位？因为它们可以让不同的尺寸更容易被定义，你不要为父元素指定任何的百分比或者别的什么，请看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".some-text {
    font-size: 100vh;
    line-height: 100vh;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.some-text</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100vh</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G6l.gif" src="https://static.alili.techhttps://imgly.net/img/G6l.gif" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>或者你可以设置一个漂亮的弹出框在屏幕中间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blackSquare {
    background: black;
    position: fixed;
    height: 50vh;
    width: 50vw;
    left: 25vw;
    top: 25vh;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.blackSquare</span> {
    <span class="hljs-attribute">background</span>: black;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50vh</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50vw</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">25vw</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">25vh</span>;
}</code></pre>
<p>这看起来酷毙了，看看在codepen的<a href="http://codepen.io/CrocoDillon/pen/fBJxu" rel="nofollow noreferrer" target="_blank">例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="CrocoDillon/pen/fBJxu" data-typeid="3">点击预览</button>吧~<br>但是目前仍然有一些关于这些新单位的不足之处：</p>
<ul>
<li><p>IE9应该用vm而不是vmin。</p></li>
<li><p>iOS7在使用vh的时候可能会有bug。</p></li>
<li><p>vmax至今并未得到全面的支持。</p></li>
</ul>
<h2 id="articleHeader13">文字修饰</h2>
<p>我们可以通过几行代码修改文字被选中时的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*::selection {
    color: #fff;
    background: #000;
}
*::-moz-selection {    
    /*Only Firefox still needs a prefix*/
    color: #fff;
    background: #000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*<span class="hljs-selector-pseudo">::selection</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
}
*<span class="hljs-selector-pseudo">::-moz-selection</span> {    
    <span class="hljs-comment">/*Only Firefox still needs a prefix*/</span>
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
}</code></pre>
<p>你不仅可以定义文字被选中时的颜色，还能定义阴影或者背景颜色。</p>
<h2 id="articleHeader14">触摸屏当中的元素滚动</h2>
<p>如果你需要在触摸屏当中为一些元素设置内滚动，那么你不仅需要<code>overflow: scroll / auto </code>，还需要<code>-webkit-overflow-scrolling: touch;</code><br>实际上，移动端浏览器在某些时候并不能正确执行<code>overflow: scroll / auto </code>，它可能会滚动整个页面而不是你想要的那部分。<code>-webkit-overflow-scrolling</code>解决了这个问题，你可以在你的实际项目中体验一下。</p>
<h2 id="articleHeader15">使用硬件加速</h2>
<p>有时候动画可能会导致用户的电脑卡顿，你可以在特定元素中使用硬件加速来避免这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block {
    transform: translateZ(0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.block</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(0);
}</code></pre>
<p>你并不会察觉有什么不同，但浏览器会为这个元素进行3D硬件加速，在<code>will-change</code>这个特殊属性未被全面支持之前，这个方法还是很有用的。</p>
<h2 id="articleHeader16">Unicode Classes</h2>
<p>你可以用Unicode符号明名class：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".❤ {
    ...
}
.☢ {
    ...
}
.☭ {
    ...
}
.★ {
    ...
}
.☯ {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>.❤ {
    ...
}
.☢ {
    ...
}
.☭ {
    ...
}
.★ {
    ...
}
.☯ {
    ...
}</code></pre>
<p>但这其实是用来搞笑的，千万不要在大型项目中使用，因为不是所有的电脑都支持Unicode符号。</p>
<h2 id="articleHeader17">垂直方向的百分比边距</h2>
<p>实际上垂直方向的排列计算是基于父元素的宽度而不是高度。定义两个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->

<div class=&quot;parent&quot;>  
    <div class=&quot;child&quot;></div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- html --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css -->

.parent {
    height: 400px;
    width: 200px;
}
.child {
    height: 50%;
    padding-top: 25%;
    padding-bottom: 25%;
    width: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;!<span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">css</span> <span class="hljs-selector-tag">--</span>&gt;

<span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p>理论上，子元素的高会是父元素高的一半，但是看看我们实际得到的情况：<br><span class="img-wrap"><img data-src="/img/bVyLCw" src="https://static.alili.tech/img/bVyLCw" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>记住，子元素的百分比是相对于父元素的宽度。</p>
<h2 id="articleHeader18">火狐浏览器的按钮边距</h2>
<p>Firefox用它自己的方式去计算按钮的边距。这听起来有点奇怪，但它会自动地添加一些边距进去：<br><span class="img-wrap"><img data-src="/img/bVyLC0" src="https://static.alili.tech/img/bVyLC0" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以用以下方法来修复这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="button::-moz-focus-inner,  
input[type=&quot;reset&quot;]::-moz-focus-inner,  
input[type=&quot;button&quot;]::-moz-focus-inner,  
input[type=&quot;submit&quot;]::-moz-focus-inner {  
    border: none;
    padding:0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-symbol">button:</span><span class="hljs-symbol">:-moz-focus-inner</span>,  
input[type=<span class="hljs-string">"reset"</span>]<span class="hljs-symbol">:</span><span class="hljs-symbol">:-moz-focus-inner</span>,  
input[type=<span class="hljs-string">"button"</span>]<span class="hljs-symbol">:</span><span class="hljs-symbol">:-moz-focus-inner</span>,  
input[type=<span class="hljs-string">"submit"</span>]<span class="hljs-symbol">:</span><span class="hljs-symbol">:-moz-focus-inner</span> {  
    <span class="hljs-symbol">border:</span> none;
    <span class="hljs-symbol">padding:</span><span class="hljs-number">0</span>;
}</code></pre>
<h2 id="articleHeader19">Color + Border = <code>Border-Color</code>
</h2>
<p>很少人知道，定义了一个元素的文字颜色，意味着这个元素的边框颜色也被定义了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=&quot;text&quot;] {  
    color: red;
    border: 1px solid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="text"]</span> {  
    <span class="hljs-attribute">color</span>: red;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyLDm" src="https://static.alili.tech/img/bVyLDm" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader20">古老浏览器的彩蛋</h2>
<p>如果你仍需要适配IE7或者类似的古老浏览器，你可以在定义hack的时候使用笑脸符号，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {  
    :) background: pink;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">body </span>{  
    :) <span class="hljs-keyword">background: </span>pink<span class="hljs-comment">;</span>
}</code></pre>
<p>是不是很有趣？</p>
<hr>
<blockquote><p>如果你觉得我翻译得不错，请点赞收藏并关注<a href="https://segmentfault.com/blog/jrain">我的专栏</a>，我会陆续推出更多精彩的内容。如发现任何的错漏欢迎指正，我们下次见！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】22个必备的CSS小技巧

## 原文链接
[https://segmentfault.com/a/1190000005863953](https://segmentfault.com/a/1190000005863953)

