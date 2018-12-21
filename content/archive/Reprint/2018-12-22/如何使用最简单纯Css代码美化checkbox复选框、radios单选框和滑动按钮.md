---
title: '如何使用最简单纯Css代码美化checkbox复选框、radios单选框和滑动按钮' 
date: 2018-12-22 2:30:11
hidden: true
slug: 2kgpyb62oy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">最简洁的代码美化复选框、单选框和滑动按钮</h2>
<h3 id="articleHeader1">效果预览</h3>
<p><span class="img-wrap"><img data-src="/img/bV0dUt?w=261&amp;h=66" src="https://static.alili.tech/img/bV0dUt?w=261&amp;h=66" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1. 复选框</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>

<head>
    <style type=&quot;text/css&quot;>
        .switch {
            margin: 20px 20px 0 0;
            display: flex;
            align-items: center;
            width: auto;
        }
        .checkbox-input {
            display: none
        }
        .checkbox {
            -webkit-transition: background-color 0.3s;
            transition: background-color 0.3s;
            background-color: #fff;
            border: 1px solid #d7d7d7;
            border-radius: 3px;
            width: 16px;
            height: 16px;
            vertical-align:middle;
            margin: 0 5px;
        }
        .checkbox-input:checked+.checkbox {
            background-color: #57ad68;
        }
        .checkbox-input:checked+.checkbox:after {
            content: &quot;\2714&quot;;
            display: inline-block;
            height: 100%;
            width: 100%;
            color: #fff;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            box-shadow: 0 0 4px #57ad68;
        }
    </style>
</head>

<body>
    <label class=&quot;switch&quot;>
        <input class=&quot;checkbox-input&quot; id=&quot;checkbox&quot; type=&quot;checkbox&quot; name=&quot;demo-checkbox1&quot;>
        <label class=&quot;checkbox&quot; for=&quot;checkbox&quot;></label>
        <span>Hello</span>
    </label>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.switch</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">align-items</span>: center;
            <span class="hljs-attribute">width</span>: auto;
        }
        <span class="hljs-selector-class">.checkbox-input</span> {
            <span class="hljs-attribute">display</span>: none
        }
        <span class="hljs-selector-class">.checkbox</span> {
            <span class="hljs-attribute">-webkit-transition</span>: background-color <span class="hljs-number">0.3s</span>;
            <span class="hljs-attribute">transition</span>: background-color <span class="hljs-number">0.3s</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#d7d7d7</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">vertical-align</span>:middle;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span>;
        }
        <span class="hljs-selector-class">.checkbox-input</span><span class="hljs-selector-pseudo">:checked+.checkbox</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#57ad68</span>;
        }
        <span class="hljs-selector-class">.checkbox-input</span><span class="hljs-selector-pseudo">:checked+.checkbox</span><span class="hljs-selector-pseudo">:after</span> {
            <span class="hljs-attribute">content</span>: <span class="hljs-string">"\2714"</span>;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">#57ad68</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkbox-input"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"demo-checkbox1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader3">2. 单选框</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>

<head>
    <style type=&quot;text/css&quot;>
        .switch {
            display: flex;
            align-items: center;
            width: auto;
            float: left;
        }
        .radio-beauty-container .radio-beauty {
            width: 16px;
            height: 16px;
            box-sizing: border-box;
            display: inline-block;
            border: 1px solid #d7d7d7;
            margin: 0 5px;
            border-radius: 50%;
            transition: 0.2s;
        }
        .radio-beauty-container input[type=&quot;radio&quot;]:checked+.radio-beauty {
            border: solid 1px green;
            padding: 3px;
            background-color: green;
            background-clip: content-box;
            box-shadow: inset 0 0 1px rgba(0,128,0, 0.2), 0 0 3px green;
        }
    </style>
</head>

<body>
    <div class=&quot;radio-beauty-container&quot;>
        <label class=&quot;switch&quot;>
            <span class=&quot;radio-name&quot;>radio2</span>
            <input type=&quot;radio&quot; name=&quot;radioName&quot; id=&quot;radioName2&quot; hidden/>
            <label for=&quot;radioName2&quot; class=&quot;radio-beauty&quot;></label>
        </label>
        <label class=&quot;switch&quot;>
            <span class=&quot;radio-name&quot;>radio3</span>
            <input type=&quot;radio&quot; name=&quot;radioName&quot; id=&quot;radioName3&quot; hidden/>
            <label for=&quot;radioName3&quot; class=&quot;radio-beauty&quot;></label>
        </label>
    </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.switch</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">align-items</span>: center;
            <span class="hljs-attribute">width</span>: auto;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.radio-beauty-container</span> <span class="hljs-selector-class">.radio-beauty</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">box-sizing</span>: border-box;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#d7d7d7</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.2s</span>;
        }
        <span class="hljs-selector-class">.radio-beauty-container</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="radio"]</span><span class="hljs-selector-pseudo">:checked+.radio-beauty</span> {
            <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> green;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">3px</span>;
            <span class="hljs-attribute">background-color</span>: green;
            <span class="hljs-attribute">background-clip</span>: content-box;
            <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,128,0, 0.2), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3px</span> green;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-beauty-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-name"</span>&gt;</span>radio2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radioName"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"radioName2"</span> <span class="hljs-attr">hidden</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"radioName2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-beauty"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-name"</span>&gt;</span>radio3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radioName"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"radioName3"</span> <span class="hljs-attr">hidden</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"radioName3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-beauty"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader4">3. 滑动按钮</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>

<head>
    <style type=&quot;text/css&quot;>
        .switch-slide-label {
            display: block;
            width: 34px;
            height: 18px;
            background: #ccc;
            border-radius: 30px;
            cursor: pointer;
            position: relative;
            -webkit-transition: 0.3s ease;
            transition: 0.3s ease;
        }
        
        .switch-slide-label:after {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            position: absolute;
            left: 1px;
            top: 1px;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-transition:0.3s ease;
            transition:0.3s ease;
        }
        
        .switch-slide input:checked+label {
            background: #34bf49;
            transition: 0.3s ease;
        }
        .switch-slide input:checked+label:after {
            left: 17px;
        }

    </style>
</head>

<body>
    <div class=&quot;radio-beauty-container&quot;>
            <label class=&quot;switch-slide&quot;>
                <input type=&quot;checkbox&quot; id=&quot;menu-right&quot; hidden>
                <label for=&quot;menu-right&quot; class=&quot;switch-slide-label&quot;></label>
            </label>
    </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.switch-slide-label</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">34px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">18px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">-webkit-transition</span>: <span class="hljs-number">0.3s</span> ease;
            <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span> ease;
        }
        
        <span class="hljs-selector-class">.switch-slide-label</span><span class="hljs-selector-pseudo">:after</span> {
            <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .1);
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">1px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">1px</span>;
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateZ</span>(0);
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(0);
            <span class="hljs-attribute">-webkit-transition</span>:<span class="hljs-number">0.3s</span> ease;
            <span class="hljs-attribute">transition</span>:<span class="hljs-number">0.3s</span> ease;
        }
        
        <span class="hljs-selector-class">.switch-slide</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#34bf49</span>;
            <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span> ease;
        }
        <span class="hljs-selector-class">.switch-slide</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span><span class="hljs-selector-pseudo">:after</span> {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">17px</span>;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-beauty-container"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-slide"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"menu-right"</span> <span class="hljs-attr">hidden</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"menu-right"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-slide-label"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用最简单纯Css代码美化checkbox复选框、radios单选框和滑动按钮

## 原文链接
[https://segmentfault.com/a/1190000012407216](https://segmentfault.com/a/1190000012407216)

