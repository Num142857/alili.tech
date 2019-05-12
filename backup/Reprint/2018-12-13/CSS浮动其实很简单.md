---
title: 'CSS浮动其实很简单' 
date: 2018-12-13 2:30:07
hidden: true
slug: y07bd6t1txm
categories: [reprint]
---

{{< raw >}}

                    
<p>其实CSS浮动原理就三句话，不像网上的某些文章说的天花乱坠！</p>
<blockquote><ol>
<li>浮动必会脱离文档流</li>
<li>浮动会失去块级作用</li>
<li>浮动只在自己所在位置那行向左或者向右浮动</li>
</ol></blockquote>
<p>请仔细理解上面这三句话，下面我们来验证。</p>
<h3 id="articleHeader0">实验1.  最基本测验：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>css浮动</title>
    <style type=&quot;text/css&quot;>
        .one {
            width: 100px;
            height: 100px;
            background: #f00;
        }
        .two {
            width: 110px;
            height: 110px;
            background: #ff0;
        }
        .three {
            width: 120px;
            height: 120px;
            background: #0f0;
        }
    </style>
</head>
<body>
<div class=&quot;one&quot;></div>
<div class=&quot;two&quot;></div>
<div class=&quot;three&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>css浮动<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.one</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
        }
        <span class="hljs-selector-class">.two</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
        }
        <span class="hljs-selector-class">.three</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#0f0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>实验1对应结果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013330099?w=2528&amp;h=1614" src="https://static.alili.tech/img/remote/1460000013330099?w=2528&amp;h=1614" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>实验1结果分析：</h4>
<p>因为div为块标签，而且处于同一文档流当中，固会向下排列。</p>
<h3 id="articleHeader1">实验2 我让div1、div2、div3全部浮动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>css浮动</title>
    <style type=&quot;text/css&quot;>
        .one {
            width: 100px;
            height: 100px;
            background: #f00;
            float: left;
        }
        .two {
            width: 110px;
            height: 110px;
            background: #ff0;
            float: left;
        }
        .three {
            width: 120px;
            height: 120px;
            background: #0f0;
            float: left;
        }
    </style>
</head>
<body>
<div class=&quot;one&quot;></div>
<div class=&quot;two&quot;></div>
<div class=&quot;three&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>css浮动<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.one</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.two</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.three</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#0f0</span>;
            <span class="hljs-attribute">float</span>: left;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>实验2对应结果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013330100?w=2528&amp;h=1614" src="https://static.alili.tech/img/remote/1460000013330100?w=2528&amp;h=1614" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>实验2结果分析：</h4>
<p>因为div1、div2、div3都添加了浮动属性，所以会失去块级作用，所以他们会排列在第一行，并且是在标准文档流之上。因为浮动只能在自己所在位置那行向左或者向右浮动，又因为浮动都在标准文档流之上，所以会依次排列。</p>
<h3 id="articleHeader2">实验3 我让div1浮动，div2不浮动，div3浮动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>css浮动</title>
    <style type=&quot;text/css&quot;>
        .one {
            width: 100px;
            height: 100px;
            background: #f00;
            float: left;
        }
        .two {
            width: 110px;
            height: 110px;
            background: #ff0;
        }
        .three {
            width: 120px;
            height: 120px;
            background: #0f0;
            float: left;
        }
    </style>
</head>
<body>
<div class=&quot;one&quot;></div>
<div class=&quot;two&quot;></div>
<div class=&quot;three&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>css浮动<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.one</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.two</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
        }
        <span class="hljs-selector-class">.three</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#0f0</span>;
            <span class="hljs-attribute">float</span>: left;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>实验3结果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013330101?w=2528&amp;h=1614" src="https://static.alili.tech/img/remote/1460000013330101?w=2528&amp;h=1614" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>实验3结果分析：</h4>
<p>div1浮动，所以div1失去块级作用，并且脱离标准文档流，因此div1在第一行。<br>div2不浮动，因为div1浮动了，脱离了标准文档流，所以div2会在第一行的位置，并且在div1的下面。<br>div3浮动，因为div2不浮动，仍然是块级作用域，所以div3不可能跑到第一行去了，只能在第二行位置，因为浮动只能在自己所在行的位置向左或向右浮动，所以div3在第二行，并且脱离文档流。</p>
<h3 id="articleHeader3">实验4 div1左浮动，div2右浮动，div3左浮动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>css浮动</title>
    <style type=&quot;text/css&quot;>
        .one {
            width: 100px;
            height: 100px;
            background: #f00;
            float: left;
        }
        .two {
            width: 110px;
            height: 110px;
            background: #ff0;
            float: right
        }
        .three {
            width: 120px;
            height: 120px;
            background: #0f0;
            float: left;
        }
    </style>
</head>
<body>
<div class=&quot;one&quot;></div>
<div class=&quot;two&quot;></div>
<div class=&quot;three&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>css浮动<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.one</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.two</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
            <span class="hljs-attribute">float</span>: right
        }
        <span class="hljs-selector-class">.three</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#0f0</span>;
            <span class="hljs-attribute">float</span>: left;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>实验4结果：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013330102?w=2528&amp;h=1614" src="https://static.alili.tech/img/remote/1460000013330102?w=2528&amp;h=1614" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>实验4结果分析：</h4>
<p>div1左浮动，所以div1失去块级作用，并且脱离标准文档流，因此div1在第一行最左边。<br>div2右浮动，所以div2失去块级作用，并且脱离标准文档流，又因为div1失去了块级作用，所以div2在第一行最右边。<br>div3左浮动，所以div3失去块级作用，并且脱离标准文档流，因为div1、div2都浮动了，所以div3会占到第一行的位置的下面，因为div3也具有浮动，而且左浮动，所以会在div1的右边位置。</p>
<h3 id="articleHeader4">清除浮动</h3>
<p>清除浮动包括清除左浮动、清除右浮动、清除左右浮动<br>clear: left    让该标签的左边不能有其他标签，如果有，则他会跑到下一行<br>clear: right  让该标签的右边不能有其他标签，如果有，则他会跑到下一行<br>clear: both  让该标签的左右均不能有其他标签，如果有，则他会跑到下一行</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS浮动其实很简单

## 原文链接
[https://segmentfault.com/a/1190000013330094](https://segmentfault.com/a/1190000013330094)

