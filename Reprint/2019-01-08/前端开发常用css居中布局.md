---
title: '前端开发常用css居中布局' 
date: 2019-01-08 2:30:11
hidden: true
slug: s5w524bophc
categories: [reprint]
---

{{< raw >}}

                    
<p>在前端开发中，经常会碰到布局需要左右居中，上下居中的情况，在现代浏览器中实现居中还是挺方便的，本文只考虑在高版本现代浏览器中的情况，不考虑IE.</p>
<h2 id="articleHeader0">1.文本居中属性 text-align</h2>
<p>这是常用的水平居中图片，按钮，文字等行内元素的方法，但不能上下居中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;css&quot;>
    .parent {
        width: 100%;
        height: 800px;
        background: green;
    }
    
    .sub {
        width: 200px;
        height: 200px;
        background: red;
        text-align: center;
    }
</style>

<body>
    <div class=&quot;parent&quot;>
        <div class=&quot;sub&quot;>
            abcedd
        </div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">background</span>: green;
    }
    
    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: red;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>
            abcedd
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>实现效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000010168123" src="https://static.alili.tech/img/remote/1460000010168123" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.自动居中 margin:auto</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="此方法也只能实现水平居中，具体用法为：margin:0 auto
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>此方法也只能实现水平居中，具体用法为：margin:<span class="hljs-number">0</span> <span class="hljs-keyword">auto</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .sub {
        width: 200px;
        height: 200px;
        background: red;
        margin: 0 auto;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: red;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }</code></pre>
<p>实现效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000010168124" src="https://static.alili.tech/img/remote/1460000010168124" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3. 用line-height实现文字上下居中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .sub {
        width: 200px;
        height: 200px;
        background: #ccc;
        margin: 0 auto;
        line-height: 200px;
        text-align: center;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010168125" src="https://static.alili.tech/img/remote/1460000010168125" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">4.表格居中</h2>
<p>如果使用表格居中的话，用表格属性 td(也可能会用到 th)元素的 align="center" 以及 valign="middle" 就可以实现左右上下居中了</p>
<h2 id="articleHeader4">5.使用display:table-cell来居中</h2>
<p>对于不是表格的元素，可以使用display:table-cell模拟表格，实现居中的目的。这种情况下，父级容器要指定宽度，用百分比的话达不到左右居中的目的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010168126" src="https://static.alili.tech/img/remote/1460000010168126" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;css&quot;>
    .parent {
        width: 800px;
        height: 800px;
        display: table-cell;
        vertical-align: middle;
    }
    
    .sub {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background: #ccc;
    }
</style>

<body>
    <div class=&quot;parent&quot;>
        <div class=&quot;sub&quot;>
        </div>
    </div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">display</span>: table-cell;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
    
    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<h2 id="articleHeader5">6.使用定位position</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;css&quot;>
    .parent {
        width: 800px;
        height: 800px;
        position: relative;
    }
    
    .sub {
        width: 200px;
        height: 200px;
        background: #ccc;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: auto;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;parent&quot;>
        <div class=&quot;sub&quot;>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"sub"</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>要注意的是。margin:auto必不可少，这是其一，还有一种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;css&quot;>
    .parent {
        width: 100%;
        height: 800px;
        position: relative;
    }
    
    .sub {
        width: 200px;
        height: 200px;
        background: #ccc;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -100px;
    }
</style>

<body>
    <div class=&quot;parent&quot;>
        <div class=&quot;sub&quot;>
        </div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.parent</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-class">.sub</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>这些都是常用的居中方式，在css3中，还可以使用弹性布局来居中元素，下篇文章在详细说明。</p>
<p>转自：<a href="http://dawns.me/2017/07/04/html-css-center/" rel="nofollow noreferrer" target="_blank">http://dawns.me/2017/07/04/ht...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端开发常用css居中布局

## 原文链接
[https://segmentfault.com/a/1190000010168118](https://segmentfault.com/a/1190000010168118)

