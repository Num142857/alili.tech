---
title: '哀悼日网站全站变灰CSS代码' 
date: 2019-01-30 2:30:22
hidden: true
slug: uo00jfm9kqo
categories: [reprint]
---

{{< raw >}}

                    
<p>今天是2016.12.13是南京大屠杀公祭日。不少相关站点都将网站全部变为灰色，以表示哀悼。</p>
<p>为了更多的小伙伴可以达成这种效果，在哀悼日可以表达一份哀悼。我们今天也来给出相关方法。</p>
<p>看下腾讯大苏网</p>
<p><span class="img-wrap"><img data-src="/img/bVGOuS?w=1290&amp;h=971" src="https://static.alili.tech/img/bVGOuS?w=1290&amp;h=971" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这种效果是用纯CSS来实现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filter: grayscale(100%);
-webkit-filter: grayscale(100%);
-moz-filter: grayscale(100%);
-ms-filter: grayscale(100%);
-o-filter: grayscale(100%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">filter</span>: grayscale(<span class="hljs-number">100</span>%);
-webkit-<span class="hljs-keyword">filter</span>: grayscale(<span class="hljs-number">100</span>%);
-moz-<span class="hljs-keyword">filter</span>: grayscale(<span class="hljs-number">100</span>%);
-ms-<span class="hljs-keyword">filter</span>: grayscale(<span class="hljs-number">100</span>%);
-o-<span class="hljs-keyword">filter</span>: grayscale(<span class="hljs-number">100</span>%);</code></pre>
<p>如果你想全站变灰，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-moz-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-o-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
}</code></pre>
<p>如果你想只对于网站图片来实现灰度，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-moz-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-o-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
}</code></pre>
<p>如果只想针对部分图片，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*这段代码只会对于class位grey的图片*/
img.grey{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*这段代码只会对于class位grey的图片*/</span>
<span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.grey</span>{
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-moz-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
    <span class="hljs-attribute">-o-filter</span>: <span class="hljs-built_in">grayscale</span>(100%);
}</code></pre>
<p>这是互联网行业的哀悼方式。</p>
<p>12.13大屠杀逝者安息</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
哀悼日网站全站变灰CSS代码

## 原文链接
[https://segmentfault.com/a/1190000007781619](https://segmentfault.com/a/1190000007781619)

