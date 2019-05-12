---
title: 'CSS: hover选择器的使用' 
date: 2018-12-24 2:30:07
hidden: true
slug: f5kje3z4jq
categories: [reprint]
---

{{< raw >}}

                    
<p>有些时候需要用到mouseover和mouseout这两个鼠标事件，但是写js又比较麻烦，还要添加监听事件，所以能用css解决的东西尽量yongcss解决，这样可以提高性能，下面说一下我对:hover 的了解:<br>之前在学计算机应用的时候，老师教我们使用了:hover选择器来完成下拉菜单，之前只知道怎么使用，并不知道为什么要这么用，现在记下怎么使用吧</p>
<h2 id="articleHeader0">定义和用法</h2>
<p><strong>定义：</strong><br>:hover 选择器用于选择鼠标指针浮动在上面的元素。<br>:hover 选择器适用于所有元素</p>
<p><strong>用法1：</strong><br>这个表示的是：当鼠标悬浮在a这个样式上的时候，a的背景颜色设置为黄色</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a:hover
    { 
        background-color:yellow;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>
    { 
        <span class="hljs-attribute">background-color</span>:yellow;
    }</code></pre>
<p>这个是最普通的用法了，只是通过a改变了style<br><strong>用法2:</strong><br>使用a 控制其他块的样式：</p>
<ul><li>使用a控制a的子元素 b：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .a:hover .b {
            background-color:blue;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.b</span> {
            <span class="hljs-attribute">background-color</span>:blue;
        }</code></pre>
<ul><li>使用a控制a的兄弟元素 c(同级元素)：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .a:hover + .c {
            color:red;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.a</span><span class="hljs-selector-pseudo">:hover</span> + <span class="hljs-selector-class">.c</span> {
            <span class="hljs-attribute">color</span>:red;
        }</code></pre>
<ul><li>使用a控制a的就近元素d：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .a:hover ~ .d {
            color:pink;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.a</span><span class="hljs-selector-pseudo">:hover</span> ~ <span class="hljs-selector-class">.d</span> {
            <span class="hljs-attribute">color</span>:pink;
        }</code></pre>
<p><strong>总结一下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 中间什么都不加  控制子元素；
2. ‘+’ 控制同级元素（兄弟元素）；
3. ‘～’ 控制就近元素；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>中间什么都不加  控制子元素；
<span class="hljs-bullet">2. </span>‘+’ 控制同级元素（兄弟元素）；
<span class="hljs-bullet">3. </span>‘～’ 控制就近元素；
</code></pre>
<hr>
<h2 id="articleHeader1">实例</h2>
<p>用一个按钮控制一个盒子的运动状态，当鼠标移到按钮上方时，盒子停止运动，鼠标移开时，盒子继续运动</p>
<p><strong>body代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <body>
        <div class=&quot;btn stop&quot;>stop</div>
        <div class=&quot;animation&quot;></div>
    </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    &lt;body&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn stop"</span>&gt;</span>stop<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"animation"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/body&gt;</span></code></pre>
<p><strong>css样式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .animation {
            width: 100px;
            height: 100px;
            background-color: pink;
            margin: 100px auto;
            animation: move 2s infinite alternate;
            -webkit-animation: move 2s infinite alternate;
        }
        @keyframes move {
            0% {
                transform: translate(-100px, 0);
            }
            100% {
                transform: translate(100px, 0);
            }
        }
        .btn {
            padding: 20px 50px;
            background-color: pink;
            color: white;
            display: inline-block;
        }
        .stop:hover ~ .animation {
            -webkit-animation-play-state: paused;
            animation-play-state: paused;
        }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.animation</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: pink;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
            <span class="hljs-attribute">animation</span>: move <span class="hljs-number">2s</span> infinite alternate;
            <span class="hljs-attribute">-webkit-animation</span>: move <span class="hljs-number">2s</span> infinite alternate;
        }
        @<span class="hljs-keyword">keyframes</span> move {
            0% {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100px, 0);
            }
            100% {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(100px, 0);
            }
        }
        <span class="hljs-selector-class">.btn</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background-color</span>: pink;
            <span class="hljs-attribute">color</span>: white;
            <span class="hljs-attribute">display</span>: inline-block;
        }
        <span class="hljs-selector-class">.stop</span><span class="hljs-selector-pseudo">:hover</span> ~ <span class="hljs-selector-class">.animation</span> {
            <span class="hljs-attribute">-webkit-animation-play-state</span>: paused;
            <span class="hljs-attribute">animation-play-state</span>: paused;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong>实现效果：</strong>    <br><span class="img-wrap"><img data-src="/img/bVZodO?w=561&amp;h=345" src="https://static.alili.tech/img/bVZodO?w=561&amp;h=345" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS: hover选择器的使用

## 原文链接
[https://segmentfault.com/a/1190000012208780](https://segmentfault.com/a/1190000012208780)

