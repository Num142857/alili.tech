---
title: 'CSS水平垂直居中总结' 
date: 2019-01-30 2:30:23
hidden: true
slug: fu7a86e9uyh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">CSS水平居中、垂直居中、水平垂直居中方法总结</h2>
<p>文字的水平居中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="text-align:center;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">text</span>-<span class="hljs-keyword">align</span>:center;</code></pre>
<p>单行文字的垂直居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="line-height:30px;
height:30px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">line-height</span>:<span class="hljs-number">30px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;</code></pre>
<p>让有宽度的div水平居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin: 0 auto;
width:300px;//必须要有宽度，margin:0 auto才能让它居中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
<span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;<span class="hljs-comment">//必须要有宽度，margin:0 auto才能让它居中</span></code></pre>
<p>让绝对定位的div垂直居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position:absolute;
top:0;
bottom:0;
margin:auto 0;  //垂直方向的auto 发挥的作用
width:300px;
height:300px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">position</span>:absolute;
<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">margin</span>:auto <span class="hljs-number">0</span>;  <span class="hljs-comment">//垂直方向的auto 发挥的作用</span>
<span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;</code></pre>
<p>同理，让绝对定位的div水平和垂直方向都居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position:absolute;
top:0;
left: 0;
right:0;
bottom:0;
margin:auto; 
width:300px;
height:300px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">position</span>:absolute;
<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">margin</span>:auto; 
<span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;</code></pre>
<p>已知宽高的容器的水平垂直方向居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width: 300px;
height:300px;
position: absolute;
top:50%;
left:50%;
margin-top: -150px; //自身高度的一半
margin-left:-150px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
<span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
<span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">150px</span>; <span class="hljs-comment">//自身高度的一半</span>
<span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">150px</span>;</code></pre>
<p>未知宽高的容器的水平垂直方向居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width:300px;
height:300px;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;
<span class="hljs-attribute">position</span>:absolute;
<span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
<span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
<span class="hljs-attribute">transform</span>:translate(-<span class="hljs-number">50%</span>,-<span class="hljs-number">50%</span>);</code></pre>
<p>*注：transform属性，低版本浏览器不兼容，例如IE8</p>
<p>水平垂直居中记得要想到flexbox:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.container .div{
//whatever
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.div</span>{
<span class="hljs-comment">//whatever</span>
}</code></pre>
<p>此时.div无论是否已知宽高，都能两个方向居中。</p>
<p>垂直居中（表格布局法）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  display: table;
}
.container .div{
  display: table-cell;
  vertical-align:middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">display</span>: table;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.div</span>{
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>:middle;
}</code></pre>
<h2 id="articleHeader1">为什么height=line-height就能垂直居中？</h2>
<p>拜读了张鑫旭大神的文章：</p>
<ul>
<li><p>行高指的是什么？<br>行高指的是文本行的基线间的距离。</p></li>
<li><p>什么是基线？<br>基线不是文字的下端沿。是英文字母X的下端沿。</p></li>
</ul>
<p>文字有顶线，底线，基线和中线，用以确定文字行的位置。</p>
<ul>
<li><p>什么是行距？<br>行高与字体尺寸之间的差。</p></li>
<li><p>还要理解一个概念 -- 行内框<br>&nbsp; &nbsp; &nbsp;行内元素会生成一个行内框。它无法显示出来，但是又确实存在。</p></li>
</ul>
<p>&nbsp; &nbsp; &nbsp;在没有其他因素影响的时候，行内框等于内容区域。<br>&nbsp; &nbsp; &gt;&nbsp;设定行高可以增加或者减少行内框的高度，即：将行距的值（行高-字体尺寸）除以2，分别加到内容区域的上下两边。<strong>这是理解的关键</strong>，也就是内容区域的上面和下面均等增加一个距离。可以在一段文字上进行调试看看，发现增加减小line-height时，文字是整体上下缩进的，而非第一行不动，后面的向上靠拢。</p>
<p>行内框具有垂直居中性。即行内框占据的空间按与文字内容公用水平中垂线。（张鑫旭）</p>
<p>关于vertical-align:middle属性，也很神奇，可以好好再拜读下大神的文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS水平垂直居中总结

## 原文链接
[https://segmentfault.com/a/1190000007765664](https://segmentfault.com/a/1190000007765664)

