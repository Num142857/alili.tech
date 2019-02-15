---
title: 'CSS单位em是相对于父元素还是当前元素的字体大小？' 
date: 2019-02-15 2:30:44
hidden: true
slug: dfejr0q89no
categories: [reprint]
---

{{< raw >}}

                    
<p>em是CSS中一个比较常用的<strong>相对单位</strong>，因此有必要注意一些坑点。</p>
<h1 id="articleHeader0">1em等于当前元素的字体大小，除非你在设置font-size</h1>
<p>有很多文章说1em是等于<strong>父元素</strong>的字体大小！这种说法实际上是不准确的。看以下例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <style>
        body {
            font-size: 16px;
        }
        div {
            font-size: 32px;
            padding-bottom: 2em;
            background-color: aquamarine;
        }
    </style>
</head>

<body>
    <div></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        }
        <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">32px</span>;
            <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">2em</span>;
            <span class="hljs-attribute">background-color</span>: aquamarine;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>&lt;div&gt;</code>会被<code>padding-bottom</code>撑开，而<code>padding-bottom</code>的高度是64px，而不是32px！这证明了<strong>1em等于当前元素的字体大小</strong>（只有一个例外，下面会讲）。</p>
<blockquote>字体大小和长度有什么关系呢？字体不是一个方块吗？实际上，字体大小被定义为<code>M</code>的宽度。</blockquote>
<p>为什么有人误认为1em等于父元素的字体大小呢？这是因为如果在设置<code>font-size</code>的时候使用em单位，此时<code>font-size</code>还是默认值<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/inherit" rel="nofollow noreferrer" target="_blank">inherit</a>，因此此时1em还等于<strong>父元素</strong>的字体大小。这是在设置<code>font-size</code>时才有的特例！这个特例很好理解，毕竟我正在设置当前元素的字体大小呢！总不能使用此刻正在设置的字体大小作为单位吧！这不是悖论吗！</p>
<blockquote>举个例子，如果这个悖论真的发生了，就会出现以下情况：水果店老板对你说：“你要多少斤橘子，我给你装起来”，而你却对老板说：“我要的数量是我最终要的数量的2倍”。这个时候水果店老板估计就要崩溃了，他到底要给你装多少橘子呢？<br>为了避免这种事情发生，在你指定数量的时候如果使用<strong>相对单位</strong>，那这个单位必定不能相对于你此刻所指定的数量。你可以对老板这样说：“我要的数量是上一个顾客买的2倍”（类比于设置<code>font-size: 2em</code>）。当你买完橘子以后，又可以对老板这样说：“我还要一些苹果，数量是刚才买的橘子的2倍”（类比于设置<code>padding-bottom: 2em</code>）。</blockquote>
<p>除了这个特例以外，当设置其他css属性的时候，1em就等于<strong>当前元素</strong>的字体大小。</p>
<p>在上面的例子中，设置<code>font-size</code>的时候使用em，就能证明这个特例的存在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <style>
        body {
            font-size: 16px;
        }
        div {
            font-size: 2em;  /* 仅仅这一行改变了！ */
            padding-bottom: 2em;
            background-color: aquamarine;
        }
    </style>
</head>

<body>
    <div></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        }
        <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;  <span class="hljs-comment">/* 仅仅这一行改变了！ */</span>
            <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">2em</span>;
            <span class="hljs-attribute">background-color</span>: aquamarine;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>最终高度依然是64px，因为在设置font-size的时候，1em == 16px；在设置padding-bottom的时候，1em 就等于 32px 了。</p>
<p>如果在根元素上的<code>font-size</code>使用em会怎么样呢？它没有父元素了啊！没关系，对于inherited properties（其中就包括<code>font-size</code>），<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value" rel="nofollow noreferrer" target="_blank">在根元素上的默认值为initial</a>，对于大部分浏览器，font-size的initial值就是16px。因此在设置根元素上的<code>font-size</code>时，它的值还是16px，1em也就等于16px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <style>
        html {
            /* 2*16px=32px */
            font-size: 2em;
        }
        div {
            /* 2*32px=64px */
            font-size: 2em;
            /* 2*64px=128px */
            padding-bottom: 2em;
            background-color: aquamarine;
        }
    </style>
</head>

<body>
    <div></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span> {
            <span class="hljs-comment">/* 2*16px=32px */</span>
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
        }
        <span class="hljs-selector-tag">div</span> {
            <span class="hljs-comment">/* 2*32px=64px */</span>
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
            <span class="hljs-comment">/* 2*64px=128px */</span>
            <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">2em</span>;
            <span class="hljs-attribute">background-color</span>: aquamarine;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h1 id="articleHeader1">参考资料</h1>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#Ems" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li>
<li><a href="https://www.w3cplus.com/css/rem-vs-em.html" rel="nofollow noreferrer" target="_blank">https://www.w3cplus.com/css/r...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS单位em是相对于父元素还是当前元素的字体大小？

## 原文链接
[https://segmentfault.com/a/1190000016788019](https://segmentfault.com/a/1190000016788019)

