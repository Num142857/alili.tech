---
title: 'CSS-清除浮动' 
date: 2019-02-12 2:30:12
hidden: true
slug: 0g9rpf8p14g6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是CSS清除浮动？</h2>
<blockquote><p>在非IE浏览器（如Firefox）下，当容器的高度为auto，且容器的内容中有浮动（float为left或right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。</p></blockquote>
<p><strong>引用W3C的例子，news容器没有包围浮动的元素。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }
<div class=&quot;news&quot;>
<img src=&quot;news-pic.jpg&quot; />
<p>some text</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.news</span> {
  <span class="hljs-attribute">background-color</span>: gray;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> black;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">float</span>: right;
  }
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"news"</span>&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"news-pic.jpg"</span> /&gt;
&lt;p&gt;some text&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="http://images.cnitblog.com/blog/349636/201310/23224343-9668661a8f63445699e0a8c24a64662b.jpg" src="https://static.alili.techhttp://images.cnitblog.com/blog/349636/201310/23224343-9668661a8f63445699e0a8c24a64662b.jpg" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span>;</p>
<h2 id="articleHeader1">清除浮动方法</h2>
<p><strong>方法一：使用带clear属性的空元素</strong></p>
<p>在浮动元素后使用一个空元素如<code>&lt;div class="clear"&gt;&lt;/div&gt;</code>，并在CSS中赋予<code>.clear{clear:both;}</code>属性即可清理浮动。亦可使用<code>&lt;br class="clear" /&gt;或&lt;hr class="clear" /&gt;</code>来进行清理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.clear {
  clear: both;
  }

<div class=&quot;news&quot;>
<img src=&quot;news-pic.jpg&quot; />
<p>some text</p>
<div class=&quot;clear&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.news</span> {
  <span class="hljs-attribute">background-color</span>: gray;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> black;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">float</span>: right;
  }

<span class="hljs-selector-class">.clear</span> {
  <span class="hljs-attribute">clear</span>: both;
  }

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"news"</span>&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"news-pic.jpg"</span> /&gt;
&lt;p&gt;some text&lt;/p&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"clear"</span>&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><strong>优点：简单，代码少，浏览器兼容性好。</strong><br><strong>缺点：需要添加大量无语义的html元素，代码不够优雅，后期不容易维护。</strong></p>
<p><strong>方法二：使用CSS的overflow属性</strong></p>
<p>给浮动元素的容器添加<code>overflow:hidden;</code>或<code>overflow:auto;</code>可以清除浮动，另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。在添加overflow属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".news {
  background-color: gray;
  border: solid 1px black;
  overflow: hidden;
  *zoom: 1;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

<div class=&quot;news&quot;>
<img src=&quot;news-pic.jpg&quot; />
<p>some text</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>.<span class="hljs-class">news </span>{
  background-color: gray;
<span class="hljs-symbol">  border:</span> solid <span class="hljs-number">1</span>px black;
<span class="hljs-symbol">  overflow:</span> hidden;
  *zoom: <span class="hljs-number">1</span>;
  }

.news <span class="hljs-class">img </span>{
<span class="hljs-symbol">  float:</span> left;
  }

.news <span class="hljs-class">p </span>{
<span class="hljs-symbol">  float:</span> right;
  }

<span class="hljs-params">&lt;div class="news"&gt;</span>
<span class="hljs-params">&lt;img src="news-pic.jpg" /&gt;</span>
<span class="hljs-params">&lt;p&gt;</span>some text<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span></code></pre>
<p><strong>方法三：给浮动的元素的容器添加浮动</strong></p>
<p>给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。</p>
<p><strong>方法四：使用邻接元素处理</strong></p>
<p>什么都不做，给浮动元素后面的元素添加clear属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.content{
  clear:both;
  }

<div class=&quot;news&quot;>
<img src=&quot;news-pic.jpg&quot; />
<p>some text</p>
<div class=&quot;content&quot;>***</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.news</span> {
  <span class="hljs-attribute">background-color</span>: gray;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> black;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
  }

<span class="hljs-selector-class">.news</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">float</span>: right;
  }

.<span class="hljs-attribute">content</span>{
  <span class="hljs-attribute">clear</span>:both;
  }

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"news"</span>&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"news-pic.jpg"</span> /&gt;
&lt;p&gt;some text&lt;/p&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"content"</span>&gt;***&lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>注意这里的div.content有内容。</p>
<p><strong>方法五：使用CSS的:after伪元素</strong></p>
<p>结合 :after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器，这里的 IEhack 指的是触发 hasLayout。<br>给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after伪元素实现元素末尾添加一个看不见的块元素（Block element）清理浮动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.clearfix:after{
  content: &quot;020&quot;; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }

<div class=&quot;news clearfix&quot;>
<img src=&quot;news-pic.jpg&quot; />
<p>some text</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>.<span class="hljs-class">news </span>{
  background-color: gray;
<span class="hljs-symbol">  border:</span> solid <span class="hljs-number">1</span>px black;
  }

.news <span class="hljs-class">img </span>{
<span class="hljs-symbol">  float:</span> left;
  }

.news <span class="hljs-class">p </span>{
<span class="hljs-symbol">  float:</span> right;
  }

.clearfix:after{
<span class="hljs-symbol">  content:</span> <span class="hljs-string">"020"</span>; 
<span class="hljs-symbol">  display:</span> block; 
<span class="hljs-symbol">  height:</span> <span class="hljs-number">0</span>; 
<span class="hljs-symbol">  clear:</span> both; 
<span class="hljs-symbol">  visibility:</span> hidden;  
  }

.<span class="hljs-class">clearfix </span>{
  <span class="hljs-comment">/* 触发 hasLayout */</span> 
<span class="hljs-symbol">  zoom:</span> <span class="hljs-number">1</span>; 
  }

<span class="hljs-params">&lt;div class="news clearfix"&gt;</span>
<span class="hljs-params">&lt;img src="news-pic.jpg" /&gt;</span>
<span class="hljs-params">&lt;p&gt;</span>some text<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span></code></pre>
<p>通过CSS伪元素在容器的内部元素最后添加了一个看不见的空格"020"或点"."，并且赋予clear属性来清除浮动。需要注意的是为了IE6和IE7浏览器，要给clearfix这个class添加一条zoom:1;触发haslayout。</p>
<h2 id="articleHeader2">总结</h2>
<p>通过上面的例子，我们不难发现清除浮动的方法可以分成两类：</p>
<p>一是利用 clear 属性，包括在浮动元素末尾添加一个带有 clear: both 属性的空 div 来闭合元素，其实利用 :after 伪元素的方法也是在元素末尾添加一个内容为一个点并带有 clear: both 属性的元素实现的。</p>
<p>二是触发浮动元素父元素的 BFC (Block Formatting Contexts, 块级格式化上下文)，使到该父元素可以包含浮动元素，关于这一点。</p>
<p>在网页主要布局时使用:after伪元素方法并作为主要清理浮动方式；在小模块如ul里使用overflow:hidden;（留意可能产生的隐藏溢出元素问题）；如果本身就是浮动元素则可自动清除内部浮动，无需格外处理；正文中使用邻接元素清理之前的浮动。</p>
<p>最后可以使用相对完美的:after伪元素方法清理浮动，文档结构更加清晰。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS-清除浮动

## 原文链接
[https://segmentfault.com/a/1190000004865198](https://segmentfault.com/a/1190000004865198)

