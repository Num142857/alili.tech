---
title: 'CSS行高（line-height）及文本垂直居中原理' 
date: 2019-02-10 2:30:42
hidden: true
slug: cnr6qahve3w
categories: [reprint]
---

{{< raw >}}

                    
<p>在CSS中，line-height 属性设置两段段文本之间的距离，也就是行高，如果我们把一段文本的line-height设置为父容器的高度就可以实现文本垂直居中了，比如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
       <meta charset=&quot;UTF-8&quot;>
       <title>Document</title>
       <style>
       div {
           width: 300px;
           height: 200px;
           border: 1px solid red;
       }
       span {
           line-height: 200px;
       }
      </style>
</head>
<body>
   <div>
       <span>文本垂直居中原理</span>
   </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
       <span class="hljs-selector-tag">div</span> {
           <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
           <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
           <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
       }
       <span class="hljs-selector-tag">span</span> {
           <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
       }
      </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>文本垂直居中原理<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这样，span标签中的文字就相对于div垂直方向居中了，想要文本水平居中设置text-align：center即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVvEHR" src="https://static.alili.tech/img/bVvEHR" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么，它怎么就垂直居中了？为了弄清楚它，下面我们先来看几个概念。</p>
<h3 id="articleHeader0">1. 行框</h3>
<p>在浏览器中，会将给每一段文本生成一个<strong>行框</strong>，行框的高度就是行高。行框由上间距、文本高度、下间距组成，上间距的距离与下间距的距离是相等的。</p>
<p><span class="img-wrap"><img data-src="/img/bVvEHT" src="https://static.alili.tech/img/bVvEHT" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>默认情况下一行文本的行高分为：上间距，文本的高度，下间距，并且上间距是等于下间距的，所以文字默认在这一行中是垂直居中的。</p>
<h3 id="articleHeader1">2. 文本中的几条线</h3>
<p><span class="img-wrap"><img data-src="/img/bVvEHU" src="https://static.alili.tech/img/bVvEHU" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>几条线与行高的关系图解：</p>
<p><span class="img-wrap"><img data-src="/img/bVvEHV" src="https://static.alili.tech/img/bVvEHV" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>文本的行高也可以看成是基线到基线的距离。</p>
<p><span class="img-wrap"><img data-src="/img/bVvEHX" src="https://static.alili.tech/img/bVvEHX" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果一段文本的高度为16px，如果给他设置line-height的高度为200，那么相当于，文本的上下间距的高度增加了，但是文本本身的高度依然是16是不变的，并且一直默认在行框中垂直居中，而上间距和下间距平分了200px的高度并且减去文本本身的高度。所以，容器被这一行文本占满，而本身文字在自己的一行中是垂直居中的，所以看起来就像是在容器中垂直居中。</p>
<h3 id="articleHeader2">3. Chrome浏览器的默认值</h3>
<p>谷歌浏览器字体的默认大小是：16px，字体的最小值为：12px，默认行高为：18px；默认情况下如果没有给div设置高度，那么这个div的高度会比其中文本的大小大一点（这个大多少现在没有办法确定）</p>
<h3 id="articleHeader3">4. 行高的单位</h3>
<p><strong>px(像素)</strong><br>设置起来是最直接的，同时也最方便的。</p>
<p><strong>%(百分号)</strong><br>如果line-height单位设置为%，那么将来在计算的时候，基数是当前标签中的文本的字体的大小。<br>如果是%,%之前的数据一定是整数 ：150% ，200%</p>
<p><strong>em</strong><br>效果跟%是一样一样的。<br>注意：一行em的大小相当于是当前标签中的font-size的大小。<br>如果是em,em之前的数据一定是：1.2em ,1.5em ,2em</p>
<p><strong>不带单位</strong><br>如果不涉及到继承，那么带不带单位（em）都是一样的效果，但是如果涉及到继承的话，那么就有很大的区别了：</p>
<ul>
<li><p>如果单位是em，那么将来在继承的时候，我们的浏览器会先将行高对应的具体的数值计算出来以后再继承。</p></li>
<li><p>如果没有单位，那么将来在继承的时候，我们的浏览器会先将line-height这个属性继承给子元素，再在子元素的font-size来计算。line-height: 1.5;</p></li>
</ul>
<h3 id="articleHeader4">5. 行高可以被继承</h3>
<p>我们知道，CSS的三大特性是继承、层叠、优先级。line-height也是可以被继承的，如下面的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <style>
    span {
        display: inline-block;
    }
    </style>
</head>
<body>
    <div>
        <span>中国人</span>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">display</span>: inline-block;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>中国人<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在不给div设置行高的情况下，span标签的文字行高默认为18</p>
<p><span class="img-wrap"><img data-src="/img/bVvEH1" src="https://static.alili.tech/img/bVvEH1" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接着我们给div设置一个行高等于20px</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    line-height: 20px;
}
span {
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p>我们再来看看span标签的的变化</p>
<p><span class="img-wrap"><img data-src="/img/bVvEH4" src="https://static.alili.tech/img/bVvEH4" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>而且，不管我们给行高设置什么单位（px、%、em、不带单位）都可以被继承。</p>
<h3 id="articleHeader5">6. 行高计算的基数</h3>
<p>如果行高的单位不是px，那么将来行高要进行计算：这个计算需要一个基数，这个基数是当前标签的字体大小，而不是浏览器默认字体大小。以上面的例子为例，我们并没有设置任何字体大小，此时我们把line-height设置为150%，那么文字行高将变为24px（16px*1.5=24）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
       line-height: 150%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
       <span class="hljs-attribute">line-height</span>: <span class="hljs-number">150%</span>;
}</code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVvEH6" src="https://static.alili.tech/img/bVvEH6" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时我们在给div设置一个font-size等于20px：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
   line-height: 150%;
   font-size:20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">line-height</span>: <span class="hljs-number">150%</span>;
   <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
}</code></pre>
<p>那么文字行高将会变成30px，20px*1.5=30px;</p>
<p><span class="img-wrap"><img data-src="/img/bVvEH7" src="https://static.alili.tech/img/bVvEH7" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS行高（line-height）及文本垂直居中原理

## 原文链接
[https://segmentfault.com/a/1190000005122321](https://segmentfault.com/a/1190000005122321)

