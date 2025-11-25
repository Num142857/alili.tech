---
title: 'CSS入门指南-2：盒子模型、浮动和清除' 
date: 2019-01-08 2:30:11
hidden: true
slug: 4uq0cjv3s1i
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这是CSS设计指南的读书笔记，用于加深学习效果。</blockquote>
<p>上一篇介绍了css 的工作原理，这一篇主要介绍<code>盒子模型</code>和<code>浮动</code>。</p>
<h2 id="articleHeader0">盒子模型</h2>
<blockquote>所谓盒子模型，就是浏览器为页面中的每个HTML元素生成的矩形盒子。这些盒子们都要按照可见版式模型在页面上排布。</blockquote>
<p>可见的页面版式主要由三个属性控制：position、display和float。</p>
<ul>
<li>position：控制页面上元素的位置关系</li>
<li>display：控制元素是堆叠、并排还是不在页面出现</li>
<li>float：提供控制的方式，以便吧元素组成多栏布局</li>
</ul>
<p>元素盒子的属性可以分成三组：</p>
<ul>
<li>边框(board)。可以甚至边框的宽窄、样式和颜色</li>
<li>内边距(padding)。可以甚至盒子内容区与边框的间距</li>
<li>外边距(margin)。可以设置盒子与相邻元素的间距</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262637" src="https://static.alili.tech/img/remote/1460000010262637" alt="盒模型示意图展示了HTML元素的边框、内边距和外边距之间的关系" title="盒模型示意图展示了HTML元素的边框、内边距和外边距之间的关系" style="cursor: pointer; display: inline;"></span></p>
<p>元素盒子还有一个背景层，可以改变颜色，也可以添加图片。</p>
<h3 id="articleHeader1">简写样式</h3>
<p>CSS为边框、内边距和外边距分别规定了简写属性，每个简写声明中，属性值得顺序都是上、右、下、左。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  margin-top: 5px; 
  margin-right: 10px;
  margin-bottom: 12px; 
  margin-left: 8px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">5px</span>; 
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">12px</span>; 
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">8px</span>;
}</code></pre>
<p>使用简写则为这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    margin: 12px 10px 12px 8px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">12px</span> <span class="hljs-number">10px</span> <span class="hljs-number">12px</span> <span class="hljs-number">8px</span>;
}</code></pre>
<p>如果有一个值没写，那么则使用对边的值。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{margin: 12px 10px 12px;}
/*等同于*/
{
    margin: 12px 10px 12px 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{<span class="hljs-attribute">margin</span>: <span class="hljs-number">12px</span> <span class="hljs-number">10px</span> <span class="hljs-number">12px</span>;}
<span class="hljs-comment">/*等同于*/</span>
{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">12px</span> <span class="hljs-number">10px</span> <span class="hljs-number">12px</span> <span class="hljs-number">10px</span>;
}</code></pre>
<p>如果只写一个值，则4个边都取这个值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{margin: 12px;}
/*等同于*/
{margin: 12px 12px 12px 12px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{<span class="hljs-attribute">margin</span>: <span class="hljs-number">12px</span>;}
<span class="hljs-comment">/*等同于*/</span>
{<span class="hljs-attribute">margin</span>: <span class="hljs-number">12px</span> <span class="hljs-number">12px</span> <span class="hljs-number">12px</span> <span class="hljs-number">12px</span>;}</code></pre>
<p>另外每个盒子的属性也分三个粒度，这三个粒度从一般到特殊分别举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    border: 2px dashed red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> dashed red;
}</code></pre>
<p>混合使用三种粒度的简写属性达成设计目标是很常见的。比如，想为盒子的上边和下边添加4像素的红色边框，为左边添加1像素宽的红色边框，而右边没有。可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{border: 4px solid red;} /* 先给4条边设置相同的样式*/
{border-left-width: 1px;} /* 修改左边框宽度*/
{border-right: none;} /*移出右边框*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{<span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid red;} <span class="hljs-comment">/* 先给4条边设置相同的样式*/</span>
{<span class="hljs-attribute">border-left-width</span>: <span class="hljs-number">1px</span>;} <span class="hljs-comment">/* 修改左边框宽度*/</span>
{<span class="hljs-attribute">border-right</span>: none;} <span class="hljs-comment">/*移出右边框*/</span></code></pre>
<h3 id="articleHeader2">盒子边框</h3>
<p>border 有三个相关属性。</p>
<ul>
<li>宽度（border-width)。可以使用thin、medium和thick等文本值，也可以使用除百分比和负值之外的任何绝对值。</li>
<li>样式（border-style)。有none、hidden、dotted、dashed等文本值。</li>
<li>颜色（border-color）。可以使用任意颜色值，包括RGB、HSL、十六进制颜色值和颜色关键字。</li>
</ul>
<h3 id="articleHeader3">盒子内边距</h3>
<p>内边距是盒子内容区与盒子边框之间的距离。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262638" src="https://static.alili.tech/img/remote/1460000010262638" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图的样式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    font: 16px helvetica, sans-serif; 
    width: 220px; 
    border: 2px solid red; 
    background-color: #caebff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">font</span>: <span class="hljs-number">16px</span> helvetica, sans-serif; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>; 
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid red; 
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#caebff</span>;
}</code></pre>
<p>可以看到在没有设定内边距的情况下，内容紧挨着边框。</p>
<p>设定边框后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    font: 16px helvetica, arial, sans-serif; 
    width: 220px; 
    border: 2px solid red; 
    background-color: #caebff; 
    padding: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">font</span>: <span class="hljs-number">16px</span> helvetica, arial, sans-serif; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>; 
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid red; 
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#caebff</span>; 
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>效果如下，可以看到样式舒服了很多：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262639" src="https://static.alili.tech/img/remote/1460000010262639" alt="添加内边距后的效果图" title="添加内边距后的效果图" style="cursor: pointer; display: inline;"></span></p>
<blockquote>内边距在盒子的内部，所以也会取得盒子背景。也就是说，多出来的内边距并没有挤压文本内容，实际是加在了声明的盒子宽度之上。</blockquote>
<h3 id="articleHeader4">盒子外边距</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262640" src="https://static.alili.tech/img/remote/1460000010262640" alt="外边距的例子" title="外边距的例子" style="cursor: pointer; display: inline;"></span></p>
<p>上图的例子中，第一组是默认情况，第二组是在第一组基础上添加了边框，第三组是把第二组的外边距设置为了0，标题和段落全紧挨在一起了。</p>
<blockquote>推荐大家吧这条规则作为样式表的第一条规则：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {margin: 0; padding: 0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">* {<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;}</code></pre>
<p>这条规则是把所有元素默认的外边距和内边距都设定为0。这样，我们可以为那些真正需要添加边距的元素设定边距。</p>
<h3 id="articleHeader5">叠加外边距</h3>
<p>比如下边这个样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    height: 50px;
    border: 1px solid #000;
    backgroundcolor: #fff;
    margin-top: 50px;
    margin-bottom: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">backgroundcolor</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>如果我们把这个样式应用到3个前后相接的段落上，由于上边距和下边距相邻，<code>你可能会认为他们之间的外边距是80（50+30）像素，但是实际上是50像素</code>，这就是边距叠加。</p>
<blockquote>垂直方向上外边距会叠加 水平方向的不会<br><code>外边距单位</code> 根据经验，水平边距可以使用像素，以便该段文本始终与包含元素边界保持固定间距，不受自豪变大或变小的影响。而对于上下外边距，已<code>em</code> 为单位则可以让段间距随字号变化而相应增大或缩小。</blockquote>
<h3 id="articleHeader6">盒子有多大</h3>
<h3 id="articleHeader7">没有宽度的盒子</h3>
<p>如果没有显式的设置元素的 <code>width</code> 属性，我们就称这个盒子没有宽度。<br>如果没有设定 width， 那么这个属性的默认值是 auto，会让元素的宽度扩展到与父元素同宽。</p>
<p>我们看个例子?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<p> 这个元素没有设置宽度</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> 这个元素没有设置宽度<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>设置样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    font-family: helvetica, arial, sans-serif;
    size: 1em;
    marging: 0px;
    background-color: #caebff;
}

p {
    margin: 0;
    background-color: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-family</span>: helvetica, arial, sans-serif;
    <span class="hljs-attribute">size</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">marging</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#caebff</span>;
}

<span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262641" src="https://static.alili.tech/img/remote/1460000010262641" alt="不设置宽度的样式" title="不设置宽度的样式" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，不给段落设置宽度，段落会填满 body 元素。</p>
<p>为了更加明显，我给段落左右分别加一个边框，再加一个外边距。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    margin:0 30px; 
    background-color:#fff; 
    padding:0 20px; 
    border: solid red; 
    border-width: 0 6px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">30px</span>; 
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#fff</span>; 
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">20px</span>; 
    <span class="hljs-attribute">border</span>: solid red; 
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262642" src="https://static.alili.tech/img/remote/1460000010262642" alt="段落添加左右边框" title="段落添加左右边框" style="cursor: pointer;"></span></p>
<p>这时段落内容区域变成了 288像素（我把浏览器宽度手动调成了400px，400-(20+6+30)x2）。</p>
<blockquote>
<code>结论</code>：没有宽度的元素始终会扩展到填满其父元素的宽度为止。添加水平边框、内边距和外边距会导致内容宽度减少，减少量等于水平边框、内边距和外边距的和。</blockquote>
<h3 id="articleHeader8">有宽度的盒子</h3>
<p>还是上边的例子，我们先把外边距去掉，固定宽度400px；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    width:400px; 
    margin:0; 
    padding:0 20px;  
    border:solid red;  
    border-width: 0 6px  0 6px;  
    background-color:#fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>; 
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; 
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">20px</span>;  
    <span class="hljs-attribute">border</span>:solid red;  
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span>  <span class="hljs-number">0</span> <span class="hljs-number">6px</span>;  
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#fff</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262643" src="https://static.alili.tech/img/remote/1460000010262643" alt="设定宽度、内边距、边框的样式" title="设定宽度、内边距、边框的样式" style="cursor: pointer;"></span></p>
<p>可以看到，盒子的宽度并不是400px，而是452像素（400+(20+6)*2）。</p>
<p>再给盒子加上外边距：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    width:400px; 
    margin:0 30px; 
    padding:0 20px;  
    border:solid red;  
    border-width: 0 6px  0 6px;  
    background-color:#fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>; 
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">30px</span>; 
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">20px</span>;  
    <span class="hljs-attribute">border</span>:solid red;  
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span>  <span class="hljs-number">0</span> <span class="hljs-number">6px</span>;  
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#fff</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262644" src="https://static.alili.tech/img/remote/1460000010262644" alt="设定宽度、内边距、外边距、边框的样式" title="设定宽度、内边距、外边距、边框的样式" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，这时总宽度达到了512像素（30+6+20+400+20+6+30=512）</p>
<blockquote>
<code>结论</code>: 为设定了宽度的盒子添加边框、内边距和外边距，会导致盒子更宽。实际上盒子的 width 属性设定的只是盒子内容区的宽度，而非盒子整体的宽度</blockquote>
<h2 id="articleHeader9">浮动与清除</h2>
<h3 id="articleHeader10">浮动</h3>
<p>css 设计 float（浮动）属性的主要目的是为了实现文本绕排图片的效果，这个属性也是创建多栏布局最简单的方式。<br>我们先看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img .../>
<p>..the paragraph text...</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">...</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>..the paragraph text...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>css 规则如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    margin: 0;
    border: 1px solid red;
}
img {
    float: left;
    margin: 0 4px 4px 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
}
<span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>这个例子的样式如图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000010262645" src="https://static.alili.tech/img/remote/1460000010262645" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>这里我们给图片加了 <code>float: left</code> 样式，这时浏览器就会把图片向上推，直到它碰到父元素的内边界（也就是body）。后面的内容不再认为浮动元素在它的前边，所以它会占据父元素左上角的位置。不过，它的内容会绕开浮动的图片。</blockquote>
<h3 id="articleHeader11">创建分栏</h3>
<p>在上面的基初上如何使内容分栏呢？<br>只要再用一<code>float</code> 属性就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    float: left; /* 加上这两行*/
    width: 200px;
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">float</span>: left; <span class="hljs-comment">/* 加上这两行*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    ...
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262646" src="https://static.alili.tech/img/remote/1460000010262646" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样同时浮动图片和有宽度的段落，会使图片绕排效果消失，而浮动的段落也向左向上移动。变成了多栏的效果。</p>
<h3 id="articleHeader12">围住浮动元素</h3>
<p>看下这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section>
    <img src=&quot;images/rubber_duck2.jpg&quot;>
    <p>It's fun to float.</p>
</section>
<footer>Here is the footer element that runs across</footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/rubber_duck2.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>It's fun to float.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>Here is the footer element that runs across<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<p>应用样式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section {
    border: 1px solid blue;
    margin: 0 0 10px 0;
}
p {
    marging: 0;
}
footer {
    border: 1px solid red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">marging</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">footer</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
}</code></pre>
<p>效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262647" src="https://static.alili.tech/img/remote/1460000010262647" alt="浮动图片后标题跑到了右边，但父元素section也收缩到只包含文本的高度" title="浮动图片后标题跑到了右边，但父元素section也收缩到只包含文本的高度" style="cursor: pointer; display: inline;"></span></p>
<p>但这并不是我们想要的，我们并不想让footer 被提到上边。<br>浮动元素脱离了原来的文档流，不受父元素的控制。如果我们想让父元素还包含浮动的子元素，怎么做呢？<br>有三种方法：</p>
<h4>为父元素应用 <code>overflow: hidden</code>
</h4>
<p>只需要在 <code>section</code> 加上这个样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section {
    overflow: hidden;
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
    ...
}</code></pre>
<p>现在效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262648" src="https://static.alili.tech/img/remote/1460000010262648" alt="section 又包围了浮动的图片" title="section 又包围了浮动的图片" style="cursor: pointer;"></span></p>
<blockquote>实际上，<code>overflow: hidden</code> 声明凯真正用途是防止包含元素被超大内容撑大。也就是说应用上这个之后，包含元素（父元素）会保持其设定的宽度，如果子元素过大，会被截掉。</blockquote>
<h4>浮动父元素</h4>
<p>第二种方法是让父元素和子元素同时浮动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section {
    float: left;
    width: 100%;
    border: 1px solid blue;
}
img {
    float: left;
}
footer {
    border: 1px solid red;
    clear: left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
}
<span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-tag">footer</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
    <span class="hljs-attribute">clear</span>: left;
}</code></pre>
<p>浮动section 后，不管其子元素是否浮动，都会被包围。因此需要用 <code>width: 100%</code> 让section 与浏览器同宽。由于section 也浮动，所以footer 会往它旁边挤，这时需要使用 <code>clear: left</code> 以保证不会被提升到浮动的元素旁边。</p>
<h4>在父元素内容的末尾添加浮动元素，可以直接在标记中加，也可以通过给父元素添加clearfix 类来加。</h4>
<p>第三种方法是给父元素添加一个非浮动的子元素，然后清除该子元素。</p>
<blockquote>这种方式可以生效是因为父元素一定会包围非浮动子元素，且清除会让这个子元素处于最下。</blockquote>
<p>这里我们使用神奇的 <code>clearfix</code> 规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:after {
     content: &quot;.&quot;;
     display: block;
     height: 0;
     clear: both;
     visibility: hidden;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
     <span class="hljs-attribute">content</span>: <span class="hljs-string">"."</span>;
     <span class="hljs-attribute">display</span>: block;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
     <span class="hljs-attribute">clear</span>: both;
     <span class="hljs-attribute">visibility</span>: hidden;
    }</code></pre>
<p>这个 <code>clearfix</code> 规则最早是由程序员 <code>Tony Aslett</code> 发明的，它只添加了一个清除的包含句点作为非浮动元素（必须有内容，句点是最小的内容）。规则中其他生命是为了确保这个伪元素没有高度，而且不可见。</p>
<blockquote>
<code>after</code> 会在元素内容（而不是元素后插入一个伪元素）<br>使用clear: both 意味着 section 中新增的子元素会被清除左右浮动元素。</blockquote>
<p>我们看了三种方法围住浮动元素的方式。</p>
<p>那如果没有父元素，如果清除浮动呢？</p>
<p>比如下边这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section>
    <img src=&quot;images/rubber_duck3.jpg&quot;>
    <p>This text sits next to the image and because the text extends below the bottom of the image, the next image positions itself correctly under the previous image.</p>
    <img src=&quot;images/beach_ball.jpg&quot;>
    <p>This text is short, so the next image can float up beside this one.</p>
    <img src=&quot;images/yellow_float.jpg&quot;>
    <p>Because the previous image's text does not extend below it, this image and text move up next to the previous image. This problem can be solved by the use of the clear property.</p>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/rubber_duck3.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This text sits next to the image and because the text extends below the bottom of the image, the next image positions itself correctly under the previous image.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/beach_ball.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This text is short, so the next image can float up beside this one.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/yellow_float.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Because the previous image's text does not extend below it, this image and text move up next to the previous image. This problem can be solved by the use of the clear property.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>样式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section {
    width:300px; b
    order:1px solid red;
}
img {
    float:left; 
    margin:0 4px 4px 0;
}
p {
    font-family:helvetica, arial, sans-serif; 
    margin:0 0 5px 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>; b
    <span class="hljs-attribute">order</span>:<span class="hljs-number">1px</span> solid red;
}
<span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">float</span>:left; 
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">font-family</span>:helvetica, arial, sans-serif; 
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>效果如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262649" src="https://static.alili.tech/img/remote/1460000010262649" alt="" title="" style="cursor: pointer;"></span></p>
<p>由于第二张图下方有空间，所以第三张图及说明文字会上浮到第二张图片右侧，这并不是我们想要的结果。</p>
<p>我们想要的效果是如下图这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010262650" src="https://static.alili.tech/img/remote/1460000010262650" alt="" title="" style="cursor: pointer;"></span></p>
<p>那怎么实现呢？ 还是应用 <code>clearfix</code> 规则。为每个段落加上clearfix 类。通过<code>clearfix</code>类清除元素后，布局就是我们希望的了。</p>
<p>这一篇主要介绍了盒子模型，浮动和清除。下一篇介绍css 布局。</p>
<hr>
<p>最后，感谢女朋友支持。</p>
<table>
<thead><tr>
<th>&gt;欢迎关注(April_Louisa)</th>
<th>&gt;请我喝芬达</th>
</tr></thead>
<tbody><tr>
<td><span class="img-wrap"><img data-src="/img/remote/1460000009873993?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000009873993?w=430&amp;h=430" alt="欢迎关注" title="欢迎关注" style="cursor: pointer; display: inline;"></span></td>
<td><span class="img-wrap"><img data-src="/img/remote/1460000009873994?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000009873994?w=425&amp;h=425" alt="请我喝芬达" title="请我喝芬达" style="cursor: pointer; display: inline;"></span></td>
</tr></tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS入门指南-2：盒子模型、浮动和清除

## 原文链接
[https://segmentfault.com/a/1190000010262634](https://segmentfault.com/a/1190000010262634)

