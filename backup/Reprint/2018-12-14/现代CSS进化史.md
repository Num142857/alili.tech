---
title: '现代CSS进化史' 
date: 2018-12-14 2:30:11
hidden: true
slug: jzqzhbug08
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>英文：<a href="https://medium.com/actualize-network/modern-css-explained-for-dinosaurs-5226febe3525" rel="nofollow noreferrer" target="_blank">https://medium.com/actualize-...</a><br>编译：缪斯</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV3vCJ?w=1129&amp;h=735" src="https://static.alili.tech/img/bV3vCJ?w=1129&amp;h=735" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>CSS一直被web开发者认为是最简单也是最难的一门奇葩语言。它的入门确实非常简单——你只需为元素定义好样式属性和值，看起来似乎需要做的工作也就这样嘛！然而在一些大型工程中CSS的组织是一件复杂和凌乱的事情，你更改页面上任意一个元素的一行CSS样式都有可能影响到其他页面上的元素。</p>
<p>为了解决CSS错综复杂的继承问题，开发者建立了各种不同的最佳实践，问题是哪一个最佳实践是最好的目前尚无定论，而且有些实践相互之间是完全矛盾的。如果你第一次尝试学习CSS，这对于你来说是相当迷惑的。</p>
<p>这篇文章的目的是通过回顾CSS的历史背景，介绍下时至2018年的今天CSS发展过程中的一些设计模式和工具的演变。通过对这些背景的理解，你将会更轻松的理解每个设计思想并且学以致用。接下来让我们开始吧！</p>
<h2 id="articleHeader0">CSS基本样式使用</h2>
<p>我们从一个最简单的网页index.html 开始，这个文件中包含一个独立的样式文件index.css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Modern CSS</title>
  <link rel=&quot;stylesheet&quot; href=&quot;index.css&quot;>
</head>
<body>
  <header>This is the header.</header>
  <main>
    <h1>This is the main content.</h1>
    <p>...</p>
  </main>
  <nav>
    <h4>This is the navigation section.</h4>
    <p>...</p>
  </nav>
  <aside>
    <h4>This is an aside section.</h4>
    <p>...</p>
  </aside>
  <footer>This is the footer.</footer>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Modern CSS<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"index.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>This is the header.<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is the main content.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>This is the navigation section.<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>This is an aside section.<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>This is the footer.<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>上面的HTML标签中没用使用任何class或者id。<br>在没有任何CSS样式的情况下，我们的网站看起来是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vEb?w=1600&amp;h=1031" src="https://static.alili.tech/img/bV3vEb?w=1600&amp;h=1031" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><a href="https://codepen.io/peterxjang/pen/qxbxwK?editors" rel="nofollow noreferrer" target="_blank">点击查看在线demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/qxbxwK" data-typeid="3">点击预览</button></p>
<p>功能可用，但看起来不好看，我们可以继续在index.css加点CSS美化下排版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* BASIC TYPOGRAPHY                       */
/* from https://github.com/oxalorg/sakura */
html {
  font-size: 62.5%;
  font-family: serif;
}
body {
  font-size: 1.8rem;
  line-height: 1.618;
  max-width: 38em;
  margin: auto;
  color: #4a4a4a;
  background-color: #f9f9f9;
  padding: 13px;
}
@media (max-width: 684px) {
  body {
    font-size: 1.53rem;
  }
}
@media (max-width: 382px) {
  body {
    font-size: 1.35rem;
  }
}
h1, h2, h3, h4, h5, h6 {
  line-height: 1.1;
  font-family: Verdana, Geneva, sans-serif;
  font-weight: 700;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
h1 {
  font-size: 2.35em;
}
h2 {
  font-size: 2em;
}
h3 {
  font-size: 1.75em;
}
h4 {
  font-size: 1.5em;
}
h5 {
  font-size: 1.25em;
}
h6 {
  font-size: 1em;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* BASIC TYPOGRAPHY                       */</span>
<span class="hljs-comment">/* from https://github.com/oxalorg/sakura */</span>
<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>;
  <span class="hljs-attribute">font-family</span>: serif;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.8rem</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.618</span>;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">38em</span>;
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#4a4a4a</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f9f9f9</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">13px</span>;
}
@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">684px</span>) {
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.53rem</span>;
  }
}
@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">382px</span>) {
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.35rem</span>;
  }
}
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.1</span>;
  <span class="hljs-attribute">font-family</span>: Verdana, Geneva, sans-serif;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">700</span>;
  <span class="hljs-attribute">overflow-wrap</span>: break-word;
  <span class="hljs-attribute">word-wrap</span>: break-word;
  <span class="hljs-attribute">-ms-word-break</span>: break-all;
  <span class="hljs-attribute">word-break</span>: break-word;
  <span class="hljs-attribute">-ms-hyphens</span>: auto;
  <span class="hljs-attribute">-moz-hyphens</span>: auto;
  <span class="hljs-attribute">-webkit-hyphens</span>: auto;
  <span class="hljs-attribute">hyphens</span>: auto;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.35em</span>;
}
<span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
}
<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.75em</span>;
}
<span class="hljs-selector-tag">h4</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5em</span>;
}
<span class="hljs-selector-tag">h5</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.25em</span>;
}
<span class="hljs-selector-tag">h6</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1em</span>;
}
</code></pre>
<p>这地方大部分都是关于排版（字体、行高等）样式的定义，也包含一些颜色和一个layout居中设置。为了让每个属性有个合理的值你需要学习点设计理论，但是这个地方我们用到的CSS本身并不复杂，你可以直接定义，结果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vFM?w=1600&amp;h=1019" src="https://static.alili.tech/img/bV3vFM?w=1600&amp;h=1019" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><a href="https://codepen.io/peterxjang/pen/oEbERP?editors" rel="nofollow noreferrer" target="_blank">Click here to see a live example</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/oEbERP" data-typeid="3">点击预览</button></p>
<p>有所变化了吧！正如CSS许诺的一样——用一种简单的方式给文档添加上样式，不需要编程或者复杂的业务逻辑。不幸的是，实际情况会复杂的很多，我们不单单使用的是CSS的排版和颜色这种简单的样式定义。</p>
<h2 id="articleHeader1">CSS的布局使用</h2>
<p>在20世纪90年代，CSS还未广泛普及之前，对于页面的布局没有太多的选择。HTML最初是被设计为创建纯文本的一门语言，并不是包含侧边栏、列等布局的动态页面。早期的时候，页面布局通常使用的是HTML表格，在行和列中组织内容，这种方式虽然有效，但是把内容和表现杂糅在一块了，如果你想改变网页的布局就得需要修改大量的HTML代码。</p>
<p>CSS的出现推动了内容（写在HTML中）和表现（写在CSS中）的分离，人们开始把所有的布局代码从HTML中移除放入到CSS中，需要注意的是，和HTML一样CSS的设计也不是用来做网页内容布局的，所以早期的时候试图解决这种分离设计是很困难的。</p>
<p>我们来用个实际例子来看下如何实现布局，在我们定义CSS布局前先重置下padding和margin（会影响布局的计算），不同的区域我们定义不同的颜色（不要太在意好看不好看只要不同区域间足够醒目就可以）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* RESET LAYOUT AND ADD COLORS */
body {
  margin: 0;
  padding: 0;
  max-width: inherit;
  background: #fff;
  color: #4a4a4a;
}
header, footer {
  font-size: large;
  text-align: center;
  padding: 0.3em 0;
  background-color: #4a4a4a;
  color: #f9f9f9;
}
nav {
  background: #eee;
}
main {
  background: #f9f9f9;
}
aside {
  background: #eee;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* RESET LAYOUT AND ADD COLORS */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">max-width</span>: inherit;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#4a4a4a</span>;
}
<span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">font-size</span>: large;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.3em</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4a4a4a</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#f9f9f9</span>;
}
<span class="hljs-selector-tag">nav</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f9f9f9</span>;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
</code></pre>
<p>现在页面应该看起来如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vGT?w=1600&amp;h=1048" src="https://static.alili.tech/img/bV3vGT?w=1600&amp;h=1048" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><a href="https://codepen.io/peterxjang/pen/jZWzEV?editors" rel="nofollow noreferrer" target="_blank">Click here to see a live example</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/jZWzEV" data-typeid="3">点击预览</button></p>
<p>接下来我们用CSS来布局下页面内容，我们将按照时间顺序采用三种不同的方式，先从最经典的浮动布局开始吧。</p>
<h3 id="articleHeader2">基于浮动的布局</h3>
<p>CSS浮动属性最初是为了将图片浮动在一列文本的左侧或者右侧（报纸上经常看到）。早在21世纪初，web开发者将这个属性的优势扩展到了任意的元素，这意味着你可以通过div的内容浮动创建出行和列的错觉。同样，浮动也不是基于这样的目的设计的，所以兼容性上会有很多问题。</p>
<p>2006年，A List Apart上发表了一篇热门文章<a href="https://alistapart.com/article/holygrail" rel="nofollow noreferrer" target="_blank">In Search of the Holy Grail</a>，文章概述了实现圣杯布局的详细方法——一个头部、三列内容和一个底部，你一定觉得一个简单的布局被称为圣杯布局很疯狂吧，但是在当时纯CSS的时代这的确很难实现。</p>
<p>下面是一个基于浮动布局的例子，用到了我们文章中提到的一些技术点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* FLOAT-BASED LAYOUT */
body {
  padding-left: 200px;
  padding-right: 190px;
  min-width: 240px;
}
header, footer {
  margin-left: -200px;
  margin-right: -190px;   
}
main, nav, aside {
  position: relative;
  float: left;
}
main {
  padding: 0 20px;
  width: 100%;
}
nav {
  width: 180px;
  padding: 0 10px;
  right: 240px;
  margin-left: -100%;
}
aside {
  width: 130px;
  padding: 0 10px;
  margin-right: -100%;
}
footer {
  clear: both;
}
* html nav {
  left: 150px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* FLOAT-BASED LAYOUT */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">190px</span>;
  <span class="hljs-attribute">min-width</span>: <span class="hljs-number">240px</span>;
}
<span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;
  <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">190px</span>;   
}
<span class="hljs-selector-tag">main</span>, <span class="hljs-selector-tag">nav</span>, <span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">nav</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">240px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">130px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">clear</span>: both;
}
* <span class="hljs-selector-tag">html</span> <span class="hljs-selector-tag">nav</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">150px</span>;
}
</code></pre>
<p>仔细看下CSS代码，这里面为了让它工作包含一些必须的hack方式（负边距、clear: both、硬编码的宽度计算等），稍后我们会对这些细节做详细的解释。最终的结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vJi?w=1600&amp;h=1066" src="https://static.alili.tech/img/bV3vJi?w=1600&amp;h=1066" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><a href="https://codepen.io/peterxjang/pen/VQeXYg?editors" rel="nofollow noreferrer" target="_blank">Click here to see a live example</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/VQeXYg" data-typeid="3">点击预览</button></p>
<p>看起来不错了，但是通过三列的颜色可以看出来他们的高度不一样，页面的高度也没有填充满屏幕。这些问题是浮动布局导致的，所有的浮动只是将内容放在某一区块的左边或者右边，但是没法知道其他区块的高度。这个问题一直没有个好的解决方案，直到Flexbox布局的出现。</p>
<h3 id="articleHeader3">基于Flexbox的布局</h3>
<p>flexbox CSS属性实在2009年第一次提出来的，但直到2015年才得到浏览器的广泛支持。Flexbox被设计为定义一个空间在行或者列上如何分布的，这让它比浮动更适合用来做布局，这意味在使用浮动布局十多年后，web开发者终于不再使用带有hack的浮动布局方式了。</p>
<p>下面是一个基于Flexbox布局的例子。注意为了让flexbox生效我们需要在三列的外面额外包装一个div:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Modern CSS</title>
  <link rel=&quot;stylesheet&quot; href=&quot;index.css&quot;>
</head>
<body>
  <header>This is the header.</header>
  <div class=&quot;container&quot;>
    <main>
      <h1>This is the main content.</h1>
      <p>...</p>
    </main>
    <nav>
      <h4>This is the navigation section.</h4>
      <p>...</p>
    </nav>
    <aside>
      <h4>This is an aside section.</h4>
      <p>...</p>
    </aside>
  </div>
  <footer>This is the footer.</footer>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Modern CSS<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"index.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>This is the header.<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is the main content.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>This is the navigation section.<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>This is an aside section.<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>This is the footer.<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>下面是flexbox布局的CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* FLEXBOX-BASED LAYOUT */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex: 1;
}
main {
  flex: 1;
  padding: 0 20px;
}
nav {
  flex: 0 0 180px;
  padding: 0 10px;
  order: -1;
}
aside {
  flex: 0 0 130px;
  padding: 0 10px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* FLEXBOX-BASED LAYOUT */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-tag">nav</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">180px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">order</span>: -<span class="hljs-number">1</span>;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">130px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
</code></pre>
<p>这种方式和浮动布局相比更加紧凑了，虽然flexbox一些属性和值初看起来有些困惑，但是好歹不需要像浮动布局那样负边距的hack方案了，这是个巨大的进步。最终结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vLk?w=1600&amp;h=1047" src="https://static.alili.tech/img/bV3vLk?w=1600&amp;h=1047" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><a href="https://codepen.io/peterxjang/pen/xYZWGz?editors" rel="nofollow noreferrer" target="_blank">Click here for a live example</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/xYZWGz" data-typeid="3">点击预览</button></p>
<p>效果好多了！所有的列高度都相同，并且占据了整个页面的高度。从某种意义上来说这似乎是完美的了，但是这个方式也有些小问题，其中一个就是浏览器的兼容性——主流的现代浏览器都支持flexbox，但是一些旧的浏览器不兼容。幸运的是浏览器厂商也正在尽最大努力终止对旧版本浏览器的支持，为web开发者提供更一致的开发体验。另一个问题是我们需要<code>&lt;div class="container"&gt;</code>包裹HTML内容标签，如果能避免会更完美。理想状态下，任何CSS布局都不需要改变HTML标签的。</p>
<p>最大的缺点是CSS代码本身——flexbox虽然去掉了浮动的Hack，但是代码的可读性上变得更差了。你很难去理解flexbox的CSS，并且不知道页面上是如何去布局所有元素的。在写flexbox布局代码的时，有很多时候靠的是大量的猜测和尝试。</p>
<p>特别需要注意的是，flexbox被设计用来在单行或者单列中分割元素的——它不是设计用来给整个页面做布局的！尽管它能很好的实现（相对于浮动布局好很多）。另一种不同的规范是用来处理多行或者多列布局的，我们称之为CSS 网格。</p>
<h3 id="articleHeader4">基于Grid的布局</h3>
<p>CSS网格最早在2011年提出的（比flexbox提案晚不了多久），但是花了好长时间才在浏览器上普及起来。截止2018年初，大多数现代浏览器都已经支持CSS grid（这比一两年前有巨大的进步了）<br>下面我们看一下基于网格布局的例子，注意在这个例子中我们摆脱了flexbox布局中必须使用<code>&lt;div class="container"&gt;</code>的限制，我们可以简单的使用原始的HTML，先看下CSS文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* GRID-BASED LAYOUT */
body {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: min-content 1fr min-content;
}
header {
  grid-row: 1;
  grid-column: 1 / 4;
}
nav {
  grid-row: 2;
  grid-column: 1 / 2;
  padding: 0 10px;
}
main {
  grid-row: 2;
  grid-column: 2 / 3;
  padding: 0 20px;
}
aside {
  grid-row: 2;
  grid-column: 3 / 4;
  padding: 0 10px;
}
footer {
  grid-row: 3;
  grid-column: 1 / 4;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* GRID-BASED LAYOUT */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">1</span>fr <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: min-content <span class="hljs-number">1</span>fr min-content;
}
<span class="hljs-selector-tag">header</span> {
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}
<span class="hljs-selector-tag">nav</span> {
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">2</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span> / <span class="hljs-number">4</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}
</code></pre>
<p>虽然结果看起来和基于flexbox的布局一样，但是CSS在很大程度上得到了改进，它清晰地表达出了期望的布局方式。行和列的大小和形状在body选择器中定义，每一项item直接通过他们所在行和列的位置定义。</p>
<p><code>grid-column</code> 这个属性你可能觉得不太好理解，它定义了列的起点和终点。这个地方让你觉得困惑的可能是明明有3列，却为什么定义的范围是1到4，通过下面的图片你就能理解了：</p>
<p><span class="img-wrap"><img data-src="/img/bV3vNr?w=1600&amp;h=1047" src="https://static.alili.tech/img/bV3vNr?w=1600&amp;h=1047" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><a href="https://codepen.io/peterxjang/pen/vdLROM?editors" rel="nofollow noreferrer" target="_blank">Click here to see a live example</a><button class="btn btn-xs btn-default ml10 preview" data-url="peterxjang/pen/vdLROM" data-typeid="3">点击预览</button></p>
<p>第一列是从1到2，第二列是从2到3，第三列从3到4，所以头部的<code>grid-column</code>是从1到4占据整个页面，导航的<code>grid-column</code>是从1到2占据第一列等等</p>
<p>一旦你习惯了grid语法，你会觉得它是一种非常理想的CSS布局方式。唯一缺点就是浏览器支持，幸运的是过去一年中浏览器的支持又得到了进一步的提高。作为专为CSS设计的第一款真正的布局工具很难描绘它的重要性，从某种意义上来说，由于现有的工具需要太多的hack和变通方式去实现，因此web设计者过去对于布局的创意上一直很保守，CSS网格的出现有可能会激发出一批从未有过的创意布局设计——想想还是挺激动人心的！</p>
<p><span class="img-wrap"><img data-src="/img/bV3vO6?w=1600&amp;h=559" src="https://static.alili.tech/img/bV3vO6?w=1600&amp;h=559" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">使用CSS预处理器扩展CSS语法</h2>
<p>到目前为止，我们介绍了CSS的基本样式和布局，现在我们再来看下那些帮助CSS提升语言本身体验的工具，先从CSS预处理器开始吧。</p>
<p>CSS预处理器允许你使用不同的语言来定义样式，最终会帮你转换为浏览器可以解释的CSS，这一点在当今浏览器对新特性支持缓慢的情况下很有价值。第一个主流的CSS预处理器是2006年发布的Sass，它提供了一个新的更简洁的语法（缩进代替大括号，没有分号等等），同时增加了一些CSS缺失的高级特性，像变量、工具方法还有计算。下面我们使用Sass变量实现下前面例子中带颜色的区域定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$dark-color: #4a4a4a
$light-color: #f9f9f9
$side-color: #eee
body
  color: $dark-color
  
header, footer
  background-color: $dark-color
  color: $light-color
  
main
  background: $light-color
nav, aside
  background: $side-color
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-variable">$dark</span>-<span class="hljs-attribute">color</span>: <span class="hljs-number">#4a4a4a</span>
<span class="hljs-variable">$light</span>-<span class="hljs-attribute">color</span>: <span class="hljs-number">#f9f9f9</span>
<span class="hljs-variable">$side</span>-<span class="hljs-attribute">color</span>: <span class="hljs-number">#eee</span>
<span class="hljs-selector-tag">body</span>
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$dark</span>-color
  
<span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">footer</span>
  <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$dark</span>-color
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$light</span>-color
  
main
  <span class="hljs-attribute">background</span>: <span class="hljs-variable">$light</span>-color
<span class="hljs-selector-tag">nav</span>, <span class="hljs-selector-tag">aside</span>
  <span class="hljs-attribute">background</span>: <span class="hljs-variable">$side</span>-color
</code></pre>
<p>注意我们用<code>$</code>定义了可复用的变量，省略了大括号和分号，语法看起来更加清晰了。简洁的语法让Sass看起来很棒，但变量这样的特性出现在当时来说意义更大，这为编写整洁可维护的CSS代码开辟了新的可能性。<br>使用Sass你需要安装Ruby(<a href="https://www.ruby-lang.org/en/documentation/installation/" rel="nofollow noreferrer" target="_blank">Ruby</a>)，这门语言主要是让Sass编译成正常的CSS，同时你需要安装<a href="http://sass-lang.com/install" rel="nofollow noreferrer" target="_blank">Sass gem</a>，之后你就可以通过命令行把你的.sass文件转成.css文件了，我们先看一个使用命令行的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sass --watch index.sass index.css
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>sass --watch index<span class="hljs-selector-class">.sass</span> index<span class="hljs-selector-class">.css</span>
</code></pre>
<p>这个命令定期把<code>index.sass</code>中的Sass代码转为CSS写入到<code>index.css</code>文件中（<code>--watch</code>参数设定后会实时监听.sass文件改动并执行编译，非常方便）</p>
<p>这个过程被称为构建步骤。这在2006年的时候是非常大的一个障碍，如果你对Ruby这样的编程语言熟悉的话，这个过程非常简单。但是当时很多前端开发者只用HTML和CSS，他们不需要类似这样的工具。因此，为了使用CSS预编译的功能而让一个人学习整个生态系统是很大的一个要求了。</p>
<p>2009年的时候，Less CSS预编译器发布。它也是Ruby写的，并且提供了类似于Sass的功能，关键不同点是它的语法设计上更接近CSS。这意味着任何CSS代码都是合法的Less代码，同样我们看一个用Less语法的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@dark-color: #4a4a4a;
@light-color: #f9f9f9;
@side-color: #eee;
body {
  color: @dark-color;
}
  
header, footer {
  background-color: @dark-color;
  color: @light-color;
}
  
main {
  background: @light-color;
}
nav, aside {
  background: @side-color;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@dark-color:</span> <span class="hljs-number">#4a4a4a</span>;
<span class="hljs-variable">@light-color:</span> <span class="hljs-number">#f9f9f9</span>;
<span class="hljs-variable">@side-color:</span> <span class="hljs-number">#eee</span>;
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">@dark-color</span>;
}
  
<span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">@dark-color</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">@light-color</span>;
}
  
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-variable">@light-color</span>;
}
<span class="hljs-selector-tag">nav</span>, <span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-variable">@side-color</span>;
}
</code></pre>
<p>语法上几乎是相同的（变量的定义使用<code>@</code>替代了<code>$</code>），但是Less和CSS一样带有大括号和分号，没有Sass例子的代码看起来漂亮。然而，和CSS相近的特性反而让开发者更容易接受它，在2012年，Less使用了JavaScript（Node.js）重写了替换了Ruby，性能上比Ruby编译更快了，并且很多在工作中使用了Node.js的人更容易上手了。</p>
<p>把这段代码转化为标准的CSS，你需要安装<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">Node.js</a> 和 <a href="http://lesscss.org/#using-less-installation" rel="nofollow noreferrer" target="_blank">Less</a>，执行的命令行如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lessc index.less index.css
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>lessc index<span class="hljs-selector-class">.less</span> index<span class="hljs-selector-class">.css</span>
</code></pre>
<p>这个命令把<code>index.less</code>文件中的Lessz代码转化为标准的CSS代码写入到<code>index.css</code>文件中，注意lessc命令不能监听文件的变化（和sass不一样），这意味着你需要安装其他自动监听和编译的组件来实现该功能，增加了流程的复杂性。同样，对于程序员来说使用命令行的方式并不难，但是对于其他只想使用CSS预编译器的人来说还是个非常大的障碍。</p>
<p>汲取了Less的经验，Sass开发者在2010年发布了一个新的语法叫SCSS（与Less类似的一个CSS超集），同时发布了LibSass，一个基于C++扩展的Ruby引擎，让编译更快并且适配于多种语言。<br>另外一个CSS预处理器是2010年发布的<a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">Stylus</a>，使用Node.js编写，和Sass或者Less相比更注重于清晰的语法。通常主流的CSS预编译器就这三种（Sass，Less，Stylus），他们在功能方面非常相似，所以你不必担心选择哪一个会是错误的。</p>
<p>然而，有些人认为使用CSS预处理器开始变得越来越没必要，因为浏览器最终会慢慢实现这些功能（像变量和计算）。此外，还有一种称为CSS后处理器的方法，有可能会让CSS预处理器过时（显然这存在些争议），我们在后面会详细介绍下。</p>
<h2 id="articleHeader6">使用CSS后处理器的转换功能</h2>
<p>CSS后处理器使用JavaScript分析并转换你的CSS为合法CSS，从这方面来看和CSS预处理器很相似，你可以认为是解决同一个问题的不同方式。关键的不同点是CSS预处理器使用特殊的语法来标记需要转换的地方，而CSS后处理器可以解析转换标准的CSS，并不需要任何特殊的语法。举一个例子来说明下，我们用最初定义的header标签样式来看一下吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1, h2, h3, h4, h5, h6 {
  **-ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;**
  hyphens: auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
  **-ms-<span class="hljs-attribute">hyphens</span>: auto;
  -moz-<span class="hljs-attribute">hyphens</span>: auto;
  -webkit-<span class="hljs-attribute">hyphens</span>: auto;**
  <span class="hljs-attribute">hyphens</span>: auto;
}
</code></pre>
<p>粗体部分的属性成为厂商前缀，厂商前缀是浏览器厂商对CSS新功能的实验和测试使用的，在正式实现前提供给开发者使用CSS新属性的一种方式。<code>-ms</code>代表IE浏览器，<code>-moz</code>是火狐浏览器，<code>-webkit</code>是基于webkit内核的浏览器。</p>
<p>定义这些不同浏览器厂商的前缀属性是非常烦人的，尽量使用生成工具自动添加厂商前缀。我们可以使用CSS预处理器来完成这个功能，例如，我们可以用SCSS来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin hyphens($value) {
  -ms-hyphens: $value;
  -moz-hyphens: $value;
  -webkit-hyphens: $value;
  hyphens: $value;
}
h1, h2, h3, h4, h5, h6 {
  @include hyphens(auto);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>@mixin <span class="hljs-attribute">hyphens</span>(<span class="hljs-variable">$value</span>) {
  -ms-<span class="hljs-attribute">hyphens</span>: <span class="hljs-variable">$value</span>;
  -moz-<span class="hljs-attribute">hyphens</span>: <span class="hljs-variable">$value</span>;
  -webkit-<span class="hljs-attribute">hyphens</span>: <span class="hljs-variable">$value</span>;
  <span class="hljs-attribute">hyphens</span>: <span class="hljs-variable">$value</span>;
}
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
  @include <span class="hljs-attribute">hyphens</span>(auto);
}
</code></pre>
<p>这个地方使用了Sass的 <code>mixin</code> 功能，你可以定义一个CSS代码块然后在其他任何地方重用，当这个文件被编译成标准的CSS的时候，所有的<code>@include</code>语句都被替换成与之匹配的<code>@mixin</code>中的CSS。总体来说，这个解决方案也不差，但是你仍然要为每个需要厂商前缀的的CSS属性定义一个mixin，这些mixin的定义将需要不断的维护，比如当浏览器支持了某个CSS属性后你就要在你的定义中移除掉该属性。</p>
<p>比起写mixin的方式，直接正常写CSS然后由工具自动识别添加需要厂商前缀的属性的方式显然更优雅些。CSS后处理器就恰好能完成这样的功能。比如，如果你使用 <a href="http://postcss.org/" rel="nofollow noreferrer" target="_blank">PostCSS</a> 和 <a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">autoprefixer</a> 插件，你就可以直接写正常的CSS并不需要指定浏览器厂商前缀，剩下的工作全交给后置处理器去处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1, h2, h3, h4, h5, h6 {
  hyphens: auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
  <span class="hljs-attribute">hyphens</span>: auto;
}
</code></pre>
<p>当你使用CSS后处理器运行这段代码的时候<code>hyphens: auto;</code> 将被替换成包含所有浏览器厂商前缀的属性，这意味着你可以正常写CSS不用担心各种浏览器兼容性问题，岂不是很棒！<br>除了PostCSS的<code>autoprefixer</code>插件还有很多有意思的插件，<a href="http://cssnext.io/" rel="nofollow noreferrer" target="_blank">cssnext</a> 插件可以让你体验下一些实验性质的CSS新功能，<a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">CSS modules</a> 可以自动改变class的名字避免名称冲突，<a href="https://stylelint.io/" rel="nofollow noreferrer" target="_blank">stylelint</a> 能检查出你CSS代码中一些定义错误和不符合规范的写法。这些工具在过去一两年里开始流行起来，给开发者提供了从未有过的工程化流程。</p>
<p>然而，进程的发展总是有代价的，安装和使用CSS后处理比CSS预处理器更复杂。你不仅要安装、执行命令行，还需要安装配置各个插件并且定义好各种复杂的规则（比如你的目标浏览器等）。很多开发者不再直接使用命令行运行PostCSS了，而是通过配置一些构建系统，像<a href="https://github.com/postcss/postcss#runners" rel="nofollow noreferrer" target="_blank">Grunt</a> 、<a href="https://github.com/postcss/postcss#gulp" rel="nofollow noreferrer" target="_blank">Gulp</a> 、<a href="https://github.com/postcss/postcss#webpack" rel="nofollow noreferrer" target="_blank">webpack</a>，他们可以帮助你管理前端开发工作中需要的各种构建工具。</p>
<p>值得注意的是对于CSS后处理器存在些争议，有人认为这个术语有些让人迷惑（一种说法是建议都应该叫CSS预处理器，还有一种说法是应该都简称CSS处理器，等等），有人认为有了CSS后处理器完全可以不需要CSS预处理器，有人则主张两者一起使用。不管怎么说，去了解下CSS后处理器的使用还是非常值得的。</p>
<p><span class="img-wrap"><img data-src="/img/bV3vQy?w=1600&amp;h=544" src="https://static.alili.tech/img/bV3vQy?w=1600&amp;h=544" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">使用CSS设计模式</h2>
<p>CSS预处理器和CSS后处理器让CSS开发体验有了巨大的提升，但是单靠这些工具还不足以解决维护大型项目CSS代码的问题。为了解决这个问题，人们编写了一些关于如何写CSS的指导方针，通常被称为CSS规范。</p>
<p>在我们深入分析CSS规范前，首先要搞清楚是什么让CSS随着时间推移变得更加难维护，关键点是CSS是全局性的——你定义的每个样式都会全局应用到页面的每个部分，用一个命名约定来保证class名称的唯一性或者有特殊的规则来决定指定样式应用到指定元素。CSS规范提供了一个有组织性的方式来避免大量代码时出现的这些问题，让我们按照时间顺序来看看主流的一些规范吧</p>
<h3 id="articleHeader8">OOCSS</h3>
<p><a href="https://github.com/stubbornella/oocss/wiki" rel="nofollow noreferrer" target="_blank">OOCSS</a>（面向对象的CSS）是在2009年首次提出的，它是围绕两个原则建立的规范。第一个原则是结构和样式分离，这意味着定义结构（布局）的CSS不应该和定义样式（颜色、字体等）的CSS混杂在一起，这样我们就可以很简单的为一个应用定义新的皮肤了；第二个原则是容器和内容分离，把元素看成是一个可重用的对象，关键核心点是一个对象不管用在页面的任何位置都应该看起来是相同的。</p>
<p>OOCSS提供了成熟的指导规范，但是对于具体的执行规范并没有明确指出。后来出现的SMACSS采用了它的核心概念，并且添加了更多的细节，使用起来更简单了。</p>
<h3 id="articleHeader9">SMACSS</h3>
<p><a href="https://smacss.com/" rel="nofollow noreferrer" target="_blank">SMACSS</a>（可扩展模块化架构的CSS）是在2011年出现的一种设计模式，它将CSS分为5个不同的类别——基本规范、布局规范、模块、状态规范和样式规范。SMACSS也有一些推荐的命名规则，对于布局规范使用<code>l- </code>或者<code>layout-</code> 作为前缀；对于状态规范，使用<code>is-hidden</code> 或者<code>is-collapsed</code> 作为前缀。</p>
<p>相比OOCSS，SMACSS有了更多细节上的规范，但是CSS规则该划分为哪一类别的规范中，这是个需要仔细考虑的问题。后来出现的BEM对这一方面进行了改进，让它更易使用了。</p>
<h3 id="articleHeader10">BEM</h3>
<p><a href="https://en.bem.info/" rel="nofollow noreferrer" target="_blank">BEM</a> (块, 元素, 修饰符)是在2010年出现的规范，它的思想主要是围绕把用户界面切分成独立的块。块是一个可重用的组件（举个例子像表单搜索，可以这样定义<code>&lt;form class="search-form"&gt;&lt;/form&gt;</code>），元素是块的一部分不能单独重用（比如表单搜索中的button，<code>&lt;button class="search-form__button"&gt;Search&lt;/button&gt;</code>），修饰符是定义了块或者元素外观、状态或者行为的实体（比如禁用搜索按钮，定义为<code>&lt;button class="search-form__button search-form__button--disabled"&gt;Search&lt;/button&gt;</code>）。</p>
<p>BEM的规范很容易理解，对于新手来说命名规则上也很友好，缺点就是可能会导致class名字非常长，并且没有遵循传统的命名规范。后来出现的Atomic CSS又把这个非传统方式带到了一个新的高度。</p>
<h3 id="articleHeader11">Atomic CSS</h3>
<p><a href="https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/" rel="nofollow noreferrer" target="_blank">Atomic CSS</a> (也称为 功能性CSS)是2014年出现的一个规范，它的思想是基于可视化的方法创建小而功能单一化的class。这种规范与OOCSS、SMACSS和BEM完全相反——它并不是把页面上的元素看做是可重用的对象，Atomic CSS忽略掉了这些对象，每一个元素使用了可重用的单一功能的class样式集合。因此像<code>&lt;button class="search-form__button"&gt;Search&lt;/button&gt; </code>就被替换成这样的写法了<code>&lt;button class="f6 br3 ph3 pv2 white bg-purple hover-bg-light-purple"&gt;Search&lt;/button&gt;</code></p>
<p>如果你看到这个例子第一反应是被吓的退缩了，没关系你并不是唯一有这想法的人——很多人认为这种方式完全违背了CSS的最佳实践，但是，关于这个有争议的规范在不同场景下的应用也产出了一系列精彩的讨论。<a href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/" rel="nofollow noreferrer" target="_blank">这篇文章</a>很清晰的分析了传统的分离思想是CSS依赖于HTML创建（即使使用像BEM这类的规范），而Atomic的方式是HTML依赖于CSS创建，两者都没错，但是仔细想想你会发现CSS和HTML彻底分离的想法是实现不了的。</p>
<p>其他的CSS设计模式，像CSS in JS其实也包含了CSS和HTML相互依赖的思想，这也成为了一个饱受争议的设计规范之一。</p>
<h3 id="articleHeader12">CSS in JS</h3>
<p><a href="http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html" rel="nofollow noreferrer" target="_blank">CSS in JS</a> 是2014年推出的一种设计模式，它的核心思想是把CSS直接写到各自组件中，而不是单独的样式文件里。这种方式在React框架中引入的，最早是使用内联样式，后来又进化成了使用JavaScript生成CSS然后插入到页面的style标签中的方式。</p>
<p>CSS in JS再一次违背了CSS中关于分离的最佳实践，主要原因是web随着时间推移发生了很大的变化。最初web大部分都是静态网站——这种情况下HTML内容和CSS表现分离是很有意义的，但现在大部分应用都是动态web构建——这种情况下可重用的组件更加有意义了。</p>
<p>CSS in JS设计的目标是定义边界清晰包含自己HTML/CSS/JS的独立组件，并且不受其他组件的影响。React是最早采用这种思想的框架，后续也影响到了其他框架像Angular、Ember和Vue.js。需要注意的是CSS in JS的模式相对来说比较新的，开发人员正在不断的尝试开发web应用组件时的一些CSS最佳实践。</p>
<p>五花八门的设计模式很容易让你不知所措，最重要的记住一点——没有银弹。</p>
<h2 id="articleHeader13">结论</h2>
<p>简而言之这就是现代CSS。我们介绍了CSS基本排版样式，浮动布局、flexbox和grid布局，了解了CSS预处理器为CSS提供的新语法，比如变量和mixins，还了解了CSS后处理器的转换功能，像给CSS添加厂商前缀，并且使用CSS的一些设计模式克服了全局CSS的一些问题。在这里我们没有时间去挖掘更多CSS其他功能了，CSS覆盖面太广了——任何一个说它简单的人可能只是对它一知半解吧！</p>
<p>现代CSS的多变和快速发展多少让人感到有些沮丧，但是重要的是要记住web随着时间推移进化的历史背景，并且有一群聪明的人愿意为CSS向更好的方向的进化去创建一些工具和指导规范。作为一名开发者是一件幸运的事情，我希望这篇文章提供的信息能作为一个路线图帮助你更好的畅行在CSS路程中！</p>
<p><span class="img-wrap"><img data-src="/img/bV3vRJ?w=1600&amp;h=530" src="https://static.alili.tech/img/bV3vRJ?w=1600&amp;h=530" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
现代CSS进化史

## 原文链接
[https://segmentfault.com/a/1190000013191860](https://segmentfault.com/a/1190000013191860)

