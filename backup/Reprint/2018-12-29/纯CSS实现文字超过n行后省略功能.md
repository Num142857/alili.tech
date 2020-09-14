---
title: '纯CSS实现文字超过n行后省略功能' 
date: 2018-12-29 2:30:10
hidden: true
slug: wi59thasg1m
categories: [reprint]
---

{{< raw >}}

                    
<p>在切图阶段，经常会遇到，设计稿要求超出n行后剩余文字省略，并用<code>...</code>代替的需求。类似于下图</p>
<p><span class="img-wrap"><img data-src="/img/bVWoOD?w=938&amp;h=100" src="https://static.alili.tech/img/bVWoOD?w=938&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">单行文字</h2>
<p>单行文字时实现比较容易，使用<code>overflow: hidden</code>和<code>text-overflow: ellipsis</code>即可，其中<code>ellipsis</code>即省略号的意思，使用<code>width: 10em</code>限制横向字符数量。</p>
<h2 id="articleHeader1">多行文字</h2>
<p>多行文字主要使用的CSS属性如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  display:box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">text-overflow</span>: ellipsis;
  <span class="hljs-attribute">display</span>:-webkit-box;
  <span class="hljs-attribute">display</span>:box;
  -webkit-line-clamp: <span class="hljs-number">2</span>; 
  -webkit-box-orient: vertical;</code></pre>
<p>其中，<code>clamp</code>即夹子的意思，也就是说限制两行，把内容从中间夹住。<code>box-orient</code>属性设置盒子的摆放方向。有点类似于<code>flexbox</code>中的<code>row &amp; coloum</code></p>
<h2 id="articleHeader2">demo</h2>
<p>链接<a href="https://jsbin.com/gugekes/edit?html,css,output" rel="nofollow noreferrer" target="_blank">https://jsbin.com/gugekes/edi...</a></p>
<p>其中，HTML为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
  <title>JS Bin</title>
</head>
<body>
  <p>demo1：单行文字限制字数，并将多出字符用“...”代替</p>
  <div class=&quot;demo1&quot;>
    春江潮水连海平，
    海上明月共潮生。  
    滟滟随波千万里，  
    何处春江无月明!
  </div>
  
  <p>demo2：多行文字限制字数，并将多出字符用“...”代替</p>
  <div class=&quot;demo2&quot;>
    春江潮水连海平，
    海上明月共潮生。  
    滟滟随波千万里，  
    何处春江无月明！  
    江流宛转绕芳甸，  
    月照花林皆似霰；  
    空里流霜不觉飞，  
    汀上白沙看不见。  
    江天一色无纤尘，
    皎皎空中孤月轮。 
    江畔何人初见月？  
    江月何年初照人？  
    人生代代无穷已，  
    江月年年望相似。  
    不知江月待何人，  
    但见长江送流水。  
    白云一片去悠悠，  
    青枫浦上不胜愁。 　 
    谁家今夜扁舟子？
    何处相思明月楼？
    可怜楼上月徘徊，
    应照离人妆镜台。
    玉户帘中卷不去，
    捣衣砧上指还来。
    此时相望不相闻，
    愿逐月华流照君。
    鸿雁长飞光不度， 
    鱼龙潜跃水成文。
    昨夜闲潭梦落花
  </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo1：单行文字限制字数，并将多出字符用“...”代替<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo1"</span>&gt;</span>
    春江潮水连海平，
    海上明月共潮生。  
    滟滟随波千万里，  
    何处春江无月明!
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo2：多行文字限制字数，并将多出字符用“...”代替<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo2"</span>&gt;</span>
    春江潮水连海平，
    海上明月共潮生。  
    滟滟随波千万里，  
    何处春江无月明！  
    江流宛转绕芳甸，  
    月照花林皆似霰；  
    空里流霜不觉飞，  
    汀上白沙看不见。  
    江天一色无纤尘，
    皎皎空中孤月轮。 
    江畔何人初见月？  
    江月何年初照人？  
    人生代代无穷已，  
    江月年年望相似。  
    不知江月待何人，  
    但见长江送流水。  
    白云一片去悠悠，  
    青枫浦上不胜愁。 　 
    谁家今夜扁舟子？
    何处相思明月楼？
    可怜楼上月徘徊，
    应照离人妆镜台。
    玉户帘中卷不去，
    捣衣砧上指还来。
    此时相望不相闻，
    愿逐月华流照君。
    鸿雁长飞光不度， 
    鱼龙潜跃水成文。
    昨夜闲潭梦落花
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>CSS为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo1 {
  width: 10em;
  border: 1px solid red;
  white-space:nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}

.demo2 {
  border: 1px solid red;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  display:box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.demo1</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">white-space</span>:nowrap;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">text-overflow</span>:ellipsis;
}

<span class="hljs-selector-class">.demo2</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">text-overflow</span>: ellipsis;
  <span class="hljs-attribute">display</span>:-webkit-box;
  <span class="hljs-attribute">display</span>:box;
  <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
}</code></pre>
<p>实现的效果</p>
<p><span class="img-wrap"><img data-src="/img/bVWoSR?w=952&amp;h=348" src="https://static.alili.tech/img/bVWoSR?w=952&amp;h=348" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>[update]<br>Firefox有兼容性问题，不过可以通过设置<code>max-height</code>加<code>overflow: hidden;</code>来达到超出隐藏效果，只是没有省略号了。算是弥补兼容问题吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯CSS实现文字超过n行后省略功能

## 原文链接
[https://segmentfault.com/a/1190000011496338](https://segmentfault.com/a/1190000011496338)

