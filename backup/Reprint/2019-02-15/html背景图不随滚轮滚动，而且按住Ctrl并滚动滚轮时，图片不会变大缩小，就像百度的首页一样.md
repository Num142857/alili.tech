---
title: 'html背景图不随滚轮滚动，而且按住Ctrl并滚动滚轮时，图片不会变大缩小，就像百度的首页一样' 
date: 2019-02-15 2:30:44
hidden: true
slug: r754yedzjv
categories: [reprint]
---

{{< raw >}}

                    
<p>之前在百度知道我提问过这一个问题，后来解决了。不过好多人来问我时怎么解决的，源码。<br>其实很简单。这里我贴一下代码。有需要的小伙伴不用再加我qq了，直接来这里取吧。</p>
<p>里面的图片是我随便找的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <style>
    html,
    body {
        height: 100%;
    }

    body {
        margin: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-image: url(http://pic1.win4000.com/wallpaper/b/589d687069ed9.jpg);
    }

    h1{
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        color:#fff;
        background-color: rgba(0,0,0,0.5);
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
</head>

<body>
    <h1>按住Ctrl+滚动滚轮：可以看到文字缩放，背景不动</h1>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">background-repeat</span>: no-repeat;
        <span class="hljs-attribute">background-size</span>: cover;
        <span class="hljs-attribute">background-position</span>: center;
        <span class="hljs-attribute">background-attachment</span>: fixed;
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(http://pic1.win4000.com/wallpaper/b/589d687069ed9.jpg);
    }

    <span class="hljs-selector-tag">h1</span>{
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0.5);
        <span class="hljs-attribute">display</span>: -webkit-flex;
        <span class="hljs-attribute">display</span>: -moz-flex;
        <span class="hljs-attribute">display</span>: -ms-flex;
        <span class="hljs-attribute">display</span>: -o-flex;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">justify-content</span>: center;
        <span class="hljs-attribute">align-items</span>: center;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>按住Ctrl+滚动滚轮：可以看到文字缩放，背景不动<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html背景图不随滚轮滚动，而且按住Ctrl并滚动滚轮时，图片不会变大缩小，就像百度的首页一样

## 原文链接
[https://segmentfault.com/a/1190000016788803](https://segmentfault.com/a/1190000016788803)

