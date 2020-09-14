---
title: '谈谈css伪类与伪元素' 
date: 2018-12-24 2:30:07
hidden: true
slug: od6ddgbr4m
categories: [reprint]
---

{{< raw >}}

                    
<p>css选择器常见包括id（#id）、标签（tag）、class（.class）、属性[attr=attrval]等，还包括伪元素和伪类选择器。正确的利用伪元素和伪类能够让我们的html结构更清晰合理，也能在一定程度上减少js对dom的操作！</p>
<h2 id="articleHeader0">定义</h2>
<p><strong>伪类</strong>包含两种：<strong>状态伪类</strong>和<strong>结构性伪类</strong>。</p>
<p><strong><em>状态伪类</em></strong>是基于元素当前状态进行选择的。在与用户的交互过程中元素的状态是动态变化的，因此该元素会根据其状态呈现不同的样式。当元素处于某状态时会呈现该样式，而进入另一状态后，该样式也会失去。常见的状态伪类主要包括：</p>
<p>:link 应用于未被访问过的链接；</p>
<p>:hover 应用于鼠标悬停到的元素；</p>
<p>:active 应用于被激活的元素；</p>
<p>:visited 应用于被访问过的链接，与:link互斥。</p>
<p>:focus 应用于拥有键盘输入焦点的元素。</p>
<p><strong><em>结构性伪类</em></strong>是css3新增选择器，利用dom树进行元素过滤，通过文档结构的互相关系来匹配元素，能够减少class和id属性的定义，使文档结构更简洁。常见的包括：</p>
<p>:first-child 选择某个元素的第一个子元素；</p>
<p>:last-child 选择某个元素的最后一个子元素；</p>
<p>:nth-child() 选择某个元素的一个或多个特定的子元素；</p>
<p>:nth-last-child() 选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；</p>
<p>:nth-of-type() 选择指定的元素；</p>
<p>:nth-last-of-type() 选择指定的元素，从元素的最后一个开始计算；</p>
<p>:first-of-type 选择一个上级元素下的第一个同类子元素；</p>
<p>:last-of-type 选择一个上级元素的最后一个同类子元素；</p>
<p>:only-child 选择的元素是它的父元素的唯一一个子元素；</p>
<p>:only-of-type 选择一个元素是它的上级元素的唯一一个相同类型的子元素；</p>
<p>:empty 选择的元素里面没有任何内容。</p>
<p><strong>伪元素</strong>是对元素中的特定内容进行操作，而不是描述状态。它的操作层次比伪类更深一层，因此动态性比伪类低很多。实际上，伪元素就是选取某些元素前面或后面这种普通选择器无法完成的工作。控制的内容和元素是相同的，但它本身是基于元素的抽象，并不存在于文档结构中！常见的伪元素选择器包括：</p>
<p>:first-letter 选择元素文本的第一个字（母）。</p>
<p>:first-line 选择元素文本的第一行。</p>
<p>:before 在元素内容的最前面添加新内容。</p>
<p>:after 在元素内容的最后面添加新内容。</p>
<h2 id="articleHeader1">注意事项</h2>
<p>有时你会发现伪类元素使用了两个冒号 (::) 而不是一个冒号 (:)，这是 CSS3 规范中的一部分要求，目的是为了区分伪类和伪元素，大多数浏览器都支持这两种表示方式。单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。对于 CSS2 中已经有的伪元素，例如 :before，单冒号和双冒号的写法 ::before 作用是一样的。</p>
<p>所以，如果你的网站只需要兼容 webkit、firefox、opera 等浏览器，建议对于伪元素采用双冒号的写法，如果不得不兼容 IE 浏览器，还是用 CSS2 的单冒号写法比较安全。</p>
<h2 id="articleHeader2">伪元素的应用</h2>
<p>（1） 清除浮动</p>
<p>如果父元素的所有子元素都是浮动的，父元素的高度则无法撑开。可以通过对父元素添加after伪类撑开父元素高度，因为after就是其最后一个子元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clear:after {
    content: '';
    display: block;
    clear: both;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.clear</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">clear</span>: both;
}</code></pre>
<p>(2) 画分割线</p>
<p>画一条如下的分割线：</p>
<p><span class="img-wrap"><img data-src="/img/bVZaHM?w=480&amp;h=23" src="https://static.alili.tech/img/bVZaHM?w=480&amp;h=23" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    * {
      padding: 0;
      margin: 0;
    }
    .spliter::before, .spliter::after {
      content: '';
      display: inline-block;
      border-top: 1px solid black;
      width: 200px;
      margin: 5px;
    }
  </style>
</head>
<body>
  <p class=&quot;spliter&quot;>分割线</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.spliter</span><span class="hljs-selector-pseudo">::before</span>, <span class="hljs-selector-class">.spliter</span><span class="hljs-selector-pseudo">::after</span> {
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid black;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"spliter"</span>&gt;</span>分割线<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>（3）计数器</p>
<p>用js做个计数器是比较常见的，但我css也能实现！用到的属性有：</p>
<p>1&gt; counter-reset: 属性设置某个选择器出现次数的计数器的值。默认为 0。</p>
<p>2&gt; counter-increment: 属性设置某个选取器每次出现的计数器增量。默认增量是 1。</p>
<p>3&gt; content: 插入生成内容。<br><span class="img-wrap"><img data-src="/img/bVZaHY?w=416&amp;h=86" src="https://static.alili.tech/img/bVZaHY?w=416&amp;h=86" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .chooses {
      counter-reset: letters;
    }
    .chooses input:checked {
      counter-increment: letters;
    }

    .choose span:after {
      content: counter(letters);
    }
  </style>
</head>
<body>
  <div class=&quot;chooses&quot;>
    <input type=&quot;checkbox&quot;>a
    <input type=&quot;checkbox&quot;>b
    <input type=&quot;checkbox&quot;>c
    <input type=&quot;checkbox&quot;>d
    <input type=&quot;checkbox&quot;>e
    <input type=&quot;checkbox&quot;>f
    <input type=&quot;checkbox&quot;>g
    <input type=&quot;checkbox&quot;>h
    <input type=&quot;checkbox&quot;>i
    <input type=&quot;checkbox&quot;>j
  </div>
  <p class=&quot;choose&quot;>我选择了<span></span>个字母</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style&gt;
    <span class="hljs-selector-class">.chooses</span> {
      <span class="hljs-attribute">counter-reset</span>: letters;
    }
    <span class="hljs-selector-class">.chooses</span> <span class="hljs-selector-tag">input</span>:checked {
      <span class="hljs-attribute">counter-increment</span>: letters;
    }

    <span class="hljs-selector-class">.choose</span> <span class="hljs-selector-tag">span</span>:after {
      <span class="hljs-attribute">content</span>: counter(letters);
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"chooses"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;<span class="hljs-selector-tag">a</span>
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;<span class="hljs-selector-tag">b</span>
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;c
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;d
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;e
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;f
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;g
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;h
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;<span class="hljs-selector-tag">i</span>
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"checkbox"</span>&gt;j
  &lt;/div&gt;
  &lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"choose"</span>&gt;我选择了&lt;span&gt;&lt;/span&gt;个字母&lt;/p&gt;
&lt;/body&gt;</code></pre>
<p>（4）形变</p>
<p>通过伪元素实现如下透视形变：</p>
<p><span class="img-wrap"><img data-src="/img/bVZce1?w=580&amp;h=352" src="https://static.alili.tech/img/bVZce1?w=580&amp;h=352" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".transform{
      position: absolute;
      top:50%;
      left: 50%;
      transform:translate(-50%,-50%);
      width: 160px;
      padding: 60px;
      text-align: center;
      color: white;
      font-size: 200%;
    }
    .transform::before{
      content:&quot;&quot;;
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      transform:perspective(40px) scaleY(1.3) rotateX(5deg);
      transform-origin: bottom;
      background:rgb(255, 145, 20);
      z-index:-1;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.transform</span>{
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%);
      <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">60px</span>;
      <span class="hljs-attribute">text-align</span>: center;
      <span class="hljs-attribute">color</span>: white;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">200%</span>;
    }
    <span class="hljs-selector-class">.transform</span><span class="hljs-selector-pseudo">::before</span>{
      <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">perspective</span>(40px) <span class="hljs-built_in">scaleY</span>(1.3) <span class="hljs-built_in">rotateX</span>(5deg);
      <span class="hljs-attribute">transform-origin</span>: bottom;
      <span class="hljs-attribute">background</span>:<span class="hljs-built_in">rgb</span>(255, 145, 20);
      <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">1</span>;
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZcfE?w=654&amp;h=586" src="https://static.alili.tech/img/bVZcfE?w=654&amp;h=586" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rhombus{
      position: absolute;
      top:50%;left: 50%;
      transform:translate(-50%,-50%);
      width: 200px;line-height:200px;
      text-align: center;
      color: white;
      font-size: 200%;
    }
    .rhombus:before{
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color:rgb(20, 255, 255);
      z-index:-1;
      transform: rotateZ(45deg);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.rhombus</span>{
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%);
      <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;<span class="hljs-attribute">line-height</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">text-align</span>: center;
      <span class="hljs-attribute">color</span>: white;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">200%</span>;
    }
    <span class="hljs-selector-class">.rhombus</span><span class="hljs-selector-pseudo">:before</span>{
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">background-color</span>:<span class="hljs-built_in">rgb</span>(20, 255, 255);
      <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">1</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateZ</span>(45deg);
    }</code></pre>
<p>(5) 增大点击热区</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn::before {
      content:&quot;&quot;;
      position:absolute;
      top:-10px;
      right:-10px;
      bottom:-10px;
      left:-10px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.btn</span><span class="hljs-selector-pseudo">::before</span> {
      <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
      <span class="hljs-attribute">position</span>:absolute;
      <span class="hljs-attribute">top</span>:-<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">right</span>:-<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">bottom</span>:-<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">left</span>:-<span class="hljs-number">10px</span>;
    }</code></pre>
<h2 id="articleHeader3">总结</h2>
<p>伪元素的本质是在不增加dom结构的基础上添加的一个元素，在用法上跟真正的dom无本质区别。普通元素能实现的效果，伪元素都可以。有些用伪元素效果更好，代码更精简。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈css伪类与伪元素

## 原文链接
[https://segmentfault.com/a/1190000012156828](https://segmentfault.com/a/1190000012156828)

