---
title: 'CSS中一些利用伪类、伪元素和相邻元素选择器的技巧' 
date: 2019-02-02 2:30:10
hidden: true
slug: vbm4p9jyc3
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天遇到一个页面需求是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVEhXm?w=600&amp;h=741" src="https://static.alili.tech/img/bVEhXm?w=600&amp;h=741" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>一个评论框，后面的按钮有点赞或者发送评论两种状态，其中发送按钮有根据输入框中是否有字分为可点击和不可点击两种状态。</p>
<p>需求：<br>没有文字，没有聚焦——点赞<br>没有文字，聚焦——灰色发送<br>有文字——红色发送</p>
<p>如果用JS实现，需要监听输入框的change和focus事件，比较麻烦。但是用CSS中的伪类就可以实现相近效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; class=&quot;input&quot; required>
<div class=&quot;like&quot;>点赞</div>
<div class=&quot;send&quot;>发送</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"input"</span> required&gt;
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"like"</span>&gt;点赞&lt;/div&gt;
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"send"</span>&gt;发送&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".send {
  display: none;
}

.input:focus ~ .send {
  display: block;
}

.input:valid ~ .send {
  display: block;
  color: red;
}


.input:focus ~ .like, .input:valid ~ .like {
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.send</span> {
  <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-selector-class">.input</span><span class="hljs-selector-pseudo">:focus</span> ~ <span class="hljs-selector-class">.send</span> {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-class">.input</span><span class="hljs-selector-pseudo">:valid</span> ~ <span class="hljs-selector-class">.send</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">color</span>: red;
}


<span class="hljs-selector-class">.input</span><span class="hljs-selector-pseudo">:focus</span> ~ <span class="hljs-selector-class">.like</span>, <span class="hljs-selector-class">.input</span><span class="hljs-selector-pseudo">:valid</span> ~ <span class="hljs-selector-class">.like</span> {
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<p>（如果评论框用<code>contenteditable</code>属性的<code>div</code>元素实现，可以用<code>:empty</code>伪类代替<code>:valid</code>。）</p>
<p>所以CSS3中的伪类和伪元素非常多，其中一些如果用的巧妙，可以实现很多原本需要JS才可以实现的效果。</p>
<h3 id="articleHeader0">
<code>contenteditable</code>属性的<code>div</code>的placeholder</h3>
<p>因为一些原因，我们有时候用带有<code>contenteditable</code>属性的<code>div</code>而不是<code>input</code>或者<code>textarea</code>来作为输入框。比如，<code>div</code>可以根据内容自动调整高度。但是<code>div</code>元素不支持<code>placeholder</code>属性。怎么在<code>div</code>内容为空的时候显示一个默认文字呢？可以利用<code>:empty</code>伪类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;input&quot; contenteditable placeholder=&quot;请输入文字&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"input"</span> contenteditable placeholder=<span class="hljs-string">"请输入文字"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".input:empty::before {
  content: attr(placeholder);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.input</span><span class="hljs-selector-pseudo">:empty</span><span class="hljs-selector-pseudo">::before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(placeholder);
}</code></pre>
<h3 id="articleHeader1">画格子</h3>
<p>这个是在美团的移动端页面上看到的：</p>
<p><span class="img-wrap"><img data-src="/img/bVEh29?w=363&amp;h=320" src="https://static.alili.tech/img/bVEh29?w=363&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们需要在城市列表这个区域画一个格子。我们当然首先想到的是用<code>border</code>属性，但是设计师有个要求是，如果最后一行只有一个或者两个城市，为了美观后面也要有空白的格子。像这样子：</p>
<p><span class="img-wrap"><img data-src="/img/bVEh3v?w=352&amp;h=161" src="https://static.alili.tech/img/bVEh3v?w=352&amp;h=161" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>美团的页面中，格子的竖线是怎么画的呢？是用<code>::after</code>和<code>::before</code>元素画的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".table:before {
  content: '';
  position: absolute;
  width: 25%;
  left: 25%;
  height: 100%;
  border-left: 1px solid #ddd8ce;
  border-right: 1px solid #ddd8ce;
}

.table:after {
  content: '';
  position: absolute;
  width: 10%;
  left: 75%;
  height: 100%;
  border-left: 1px solid #ddd8ce;
  border-right: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.table</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd8ce</span>;
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd8ce</span>;
}

<span class="hljs-selector-class">.table</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">10%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">75%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd8ce</span>;
  <span class="hljs-attribute">border-right</span>: none;
}</code></pre>
<p>分别创造了两个高度为100%的伪元素，利用它们的边框作为表格的竖线。这种方案可以实现设计师的要求，又不会增加空白的页面元素，破坏语义。但是局限性就是最多只能画四条竖线，也就是说表格最多有5列。</p>
<h3 id="articleHeader2">Tab切换</h3>
<p>纯CSS实现Tab切换也是可以的。主要是利用了单选框元素的<code>:checked</code>伪类和相邻选择器。因为是单选框，所以保证了同一时间只有一个tab处于激活状态。如果不要求更复杂的效果，这样纯CSS实现的tab切换效果，要比JS简单可靠很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <input id=&quot;tab1&quot; type=&quot;radio&quot; name=&quot;tabs&quot; checked>
  <label for=&quot;tab1&quot;>TAB1</label>
  <input id=&quot;tab2&quot; type=&quot;radio&quot; name=&quot;tabs&quot;>
  <label for=&quot;tab2&quot;>TAB2</label>

  <div id=&quot;content1&quot; class=&quot;tab-content&quot;>CONTENT1<div>  
  <div id=&quot;content2&quot; class=&quot;tab-content&quot;>CONTENT2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>  &lt;input <span class="hljs-built_in">id</span>=<span class="hljs-string">"tab1"</span> type=<span class="hljs-string">"radio"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"tabs"</span> checked&gt;
  &lt;label <span class="hljs-keyword">for</span>=<span class="hljs-string">"tab1"</span>&gt;TAB1&lt;/label&gt;
  &lt;input <span class="hljs-built_in">id</span>=<span class="hljs-string">"tab2"</span> type=<span class="hljs-string">"radio"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"tabs"</span>&gt;
  &lt;label <span class="hljs-keyword">for</span>=<span class="hljs-string">"tab2"</span>&gt;TAB2&lt;/label&gt;

  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"content1"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tab-content"</span>&gt;CONTENT1&lt;<span class="hljs-keyword">div</span>&gt;  
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"content2"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tab-content"</span>&gt;CONTENT2&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  input, .tab-content{
    display: none;
  }
  #tab1:checked ~ #content1,
  #tab2:checked ~ #content2 {
    display: block;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-class">.tab-content</span>{
    <span class="hljs-attribute">display</span>: none;
  }
  <span class="hljs-selector-id">#tab1</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-id">#content1</span>,
  <span class="hljs-selector-id">#tab2</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-id">#content2</span> {
    <span class="hljs-attribute">display</span>: block;
  }</code></pre>
<p>另外利用表单元素的伪类，可以<code>label</code>元素来代替单选框、复选框等表单元素的本身，因为为表单元素本身定义样式十分困难。</p>
<h3 id="articleHeader3">感知子元素的个数</h3>
<p>这个是我看过的最复杂的一个技巧之一，来自<a href="https://www.smashingmagazine.com/2015/07/quantity-ordering-with-css/" rel="nofollow noreferrer" target="_blank">这篇文章</a>，不依靠JS实现了根据子元素的个数来应用不同的样式。</p>
<p>比如这样的CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list li:nth-last-child(n+4) ~ li,
.list li:nth-last-child(n+4):first-child {
  color: red
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span>:nth-last-child(n+<span class="hljs-number">4</span>) ~ <span class="hljs-selector-tag">li</span>,
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span>:nth-last-child(n+<span class="hljs-number">4</span>):first-child {
  <span class="hljs-attribute">color</span>: red
}</code></pre>
<p>可以实现这样的效果：如果<code>.list</code>里面<code>li</code>元素个数大于等于4，则显示为红色。</p>
<p>这是怎么实现的呢？</p>
<p><code>:nth-last-child(n+4)</code>这一个选择器的意思就是倒数第四个以及之前的元素，后面加了<code>~ li</code>，就是表示符合前面条件的元素之后的<code>li</code>元素。</p>
<p>如果元素总数不足4，则不会存在符合<code>:nth-last-child(n+4)</code>的元素（一共没有四个，也就不存在倒数第四个），那么<code>li:nth-last-child(n+4) ~ li</code>就不会选择任何的元素了。</p>
<p>但是如果只用<code>~ li</code>，是不会匹配到第一个<code>li</code>的，所以又加上了<code>li:nth-last-child(n+4):first-child</code>。</p>
<p>这样也就实现了根据元素个数的多少来应用不同的样式。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS中一些利用伪类、伪元素和相邻元素选择器的技巧

## 原文链接
[https://segmentfault.com/a/1190000007180315](https://segmentfault.com/a/1190000007180315)

