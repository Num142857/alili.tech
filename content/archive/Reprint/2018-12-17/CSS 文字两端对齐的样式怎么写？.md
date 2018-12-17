---
title: 'CSS 文字两端对齐的样式怎么写？' 
date: 2018-12-17 2:30:06
hidden: true
slug: 65rhejkqvpq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这是一个很短的文章，内容也不多，目的其实在于吐槽MDN文档。</p>
<h2 id="articleHeader1">需求</h2>
<p>实现下图中的样式：  </p>
<p><span class="img-wrap"><img data-src="/img/bV2kaN?w=170&amp;h=123" src="https://static.alili.tech/img/bV2kaN?w=170&amp;h=123" alt="文字两端对齐" title="文字两端对齐" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">实现</h2>
<p>文档结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>你好</p>
<p>我爱中国</p>
<p>我是谁</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>你好<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我爱中国<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是谁<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader3">第一次尝试</h3>
<p>很简单嘛，使用text-align:justify不就好了？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{
    position:relative;
    width:6em;
    text-align:justify;
}
p:after{
  content:&quot;:&quot;;
  position:absolute;
  right:-4px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">6em</span>;
    <span class="hljs-attribute">text-align</span>:justify;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">content</span>:<span class="hljs-string">":"</span>;
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">right</span>:-<span class="hljs-number">4px</span>;
}</code></pre>
<p>看看效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV2kdn?w=155&amp;h=140" src="https://static.alili.tech/img/bV2kdn?w=155&amp;h=140" alt="第一次尝试，失败。" title="第一次尝试，失败。" style="cursor: pointer; display: inline;"></span></p>
<p>纳尼？让我来看看<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align" rel="nofollow noreferrer" target="_blank">文档</a>：</p>
<blockquote>justify:The inline contents are justified. Text should be spaced to line up its left and right edges to the left and right edges of the line box, except for the last line.</blockquote>
<p>这里提醒一句，MDN上的text-align不要看中文版，英文原版要详细。</p>
<p>看文档的意思，justify属性值不能作用在最后一行嘛。难怪没有起作用。</p>
<h3 id="articleHeader4">第二次尝试</h3>
<p>之前说了看英文原版的文档，好的，我发现了一个很不错的属性值：justify-all。</p>
<blockquote>justify-all:Same as justify, but also forces the last line to be justified.</blockquote>
<p>好东西啊好东西，在justify的基础上新增了对最后一行的作用。赶紧试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{
    width:6em;
    text-align:justify-all;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">6em</span>;
    <span class="hljs-attribute">text-align</span>:justify-all;
}</code></pre>
<p>这下应该可以了吧，来看看效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV2kdn?w=155&amp;h=140" src="https://static.alili.tech/img/bV2kdn?w=155&amp;h=140" alt="第一次尝试，失败。" title="第一次尝试，失败。" style="cursor: pointer; display: inline;"></span></p>
<p>蛤，怎么又没用？F12检查看看：</p>
<p><span class="img-wrap"><img data-src="/img/bV2kgO?w=188&amp;h=70" src="https://static.alili.tech/img/bV2kgO?w=188&amp;h=70" alt="属性值无效" title="属性值无效" style="cursor: pointer; display: inline;"></span></p>
<p>这又是什么操作？属性值居然无效。我又仔细看了看文档，翻到最后无语了：</p>
<p><span class="img-wrap"><img data-src="/img/bV2khW?w=1001&amp;h=385" src="https://static.alili.tech/img/bV2khW?w=1001&amp;h=385" alt="所有浏览器都不支持justify-all属性值" title="所有浏览器都不支持justify-all属性值" style="cursor: pointer; display: inline;"></span></p>
<p>大哥，你这啥浏览器都不能用的属性值写了干嘛……当然，我只是发发牢骚，这个属性应该是CSS3规范里有但是浏览器没实现而已。</p>
<h3 id="articleHeader5">解决方法</h3>
<p>折腾了一会儿，最后还是要解决问题的。我发现了一个属性叫text-align-last，它可以控制最后一行的文字对齐。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{
  position:relative;
  width:6em;
  text-align:justify;
  text-align-last:justify;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">6em</span>;
  <span class="hljs-attribute">text-align</span>:justify;
  <span class="hljs-attribute">text-align-last</span>:justify;
}</code></pre>
<p>效果就是文章最开始的图片。</p>
<h2 id="articleHeader6">总结</h2>
<p>写这篇文章就是想记录一下text-align-last属性及其应用，同时吐槽一下MDN文档。除了文章里说的“废物”justify-all，还有中文版里直接省略justify-all这一不严谨的行为，而且还多了个string属性。</p>
<p><span class="img-wrap"><img data-src="/img/bV2kkY?w=1237&amp;h=294" src="https://static.alili.tech/img/bV2kkY?w=1237&amp;h=294" alt="文档中英文不一致" title="文档中英文不一致" style="cursor: pointer; display: inline;"></span></p>
<p>emmmm，我觉得英文版可信度更高吧。所以我在中文版中新增了justify-all，string我没敢删……</p>
<p>最后，文章中若有错误，还请不吝赐教，非常感谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 文字两端对齐的样式怎么写？

## 原文链接
[https://segmentfault.com/a/1190000012908928](https://segmentfault.com/a/1190000012908928)

