---
title: '【技巧】歪脑筋优化flexbox瀑布流布局方案' 
date: 2019-01-01 2:30:07
hidden: true
slug: gsokjpp6abm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">效果先行</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016220721?w=1836&amp;h=875" src="https://static.alili.tech/img/remote/1460000016220721?w=1836&amp;h=875" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">需求</h1>
<p><span class="img-wrap"><img data-src="/img/bVUjQz?w=1033&amp;h=450" src="https://static.alili.tech/img/bVUjQz?w=1033&amp;h=450" alt="示意图" title="示意图" style="cursor: pointer; display: inline;"></span><br>在大量“不定宽”元素并排的布局模式下，上图是我们想要的最佳布局<br>但是FlexBox布局虽然枪弹但并不能完全呈现以上布局，于是我们需要结合FlexBox作下小的改动即可实现。</p>
<h1 id="articleHeader2">css现成的布局方式</h1>
<p>Flex布局，具有等分布局的能力，如图<br><span class="img-wrap"><img data-src="/img/bVUjQE?w=1014&amp;h=429" src="https://static.alili.tech/img/bVUjQE?w=1014&amp;h=429" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">问题</h1>
<p>但是底部我们并不想如此等分，我们更希望可以同上一排对齐</p>
<h1 id="articleHeader4">方案</h1>
<p>其实很简单，我们只要在后面加入一些等宽但是占高为0等隐藏元素即可轻松实现。<br>如图：<br><span class="img-wrap"><img data-src="/img/bVUjQG?w=1019&amp;h=459" src="https://static.alili.tech/img/bVUjQG?w=1019&amp;h=459" alt="" title="" style="cursor: pointer; display: inline;"></span><br>至于【empty】元素的数量需要不小于单行最多元素的数量即可，<br>最后我们将empty设置隐藏即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".empty {
    visibility: hidden; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.empty</span> {
    <span class="hljs-attribute">visibility</span>: hidden; 
}</code></pre>
<h2 id="articleHeader5">完整demo代码</h2>
<p>【JSFiddle地址】<br><a href="https://jsfiddle.net/zwwill/43qnjxyL/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/zwwill/43qnjxyL/</a><button class="btn btn-xs btn-default ml10 preview" data-url="zwwill/43qnjxyL/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>并排等分，单排靠左最齐布局</title>
    <style type=&quot;text/css&quot;>
        * {
            margin: 0;
            padding: 0;
        }
        .main {
            display: flex;
            width: 1000px;
            flex-flow: row wrap;
            justify-content: space-between;
            margin: 50px auto;
            background-color: #ccc;
            align-content: baseline;
        }
        .main span {
            width: 132px;
            height: 200px;
            display: inline-block;
            background-color: #666;
            margin: 4px;
        }
        .main .emp{
            height: 0;
            border: none;
            margin-top: 0;
            margin-bottom: 0;
            visibility: hidden;
        }
    </style>
</head>
<body>
    <div class=&quot;main&quot;>
        <span style=&quot;&quot;>1</span>
        <span style=&quot;&quot;>2</span>
        <span style=&quot;&quot;>3</span>
        <span style=&quot;&quot;>4</span>
        <span style=&quot;&quot;>5</span>
        <span style=&quot;&quot;>6</span>
        <span style=&quot;&quot;>7</span>
        <span style=&quot;&quot;>8</span>
        <span style=&quot;&quot;>9</span>
        <span style=&quot;&quot;>10</span>
        <span style=&quot;&quot;>11</span>
        <span style=&quot;&quot;>12</span>  
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
        <span class=&quot;emp&quot; >empty</span>
    </div>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>并排等分，单排靠左最齐布局<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.main</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">flex-flow</span>: row wrap;
            <span class="hljs-attribute">justify-content</span>: space-between;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">align-content</span>: baseline;
        }
        <span class="hljs-selector-class">.main</span> <span class="hljs-selector-tag">span</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">132px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#666</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">4px</span>;
        }
        <span class="hljs-selector-class">.main</span> <span class="hljs-selector-class">.emp</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">visibility</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>11<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span>&gt;</span>12<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"emp"</span> &gt;</span>empty<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【技巧】歪脑筋优化flexbox瀑布流布局方案

## 原文链接
[https://segmentfault.com/a/1190000011007357](https://segmentfault.com/a/1190000011007357)

