---
title: '利用CSS中input制作开关、轮播图' 
date: 2018-12-06 2:30:09
hidden: true
slug: 669h79k8bdu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.利用input制作开关</h2>
<p>&lt;input type="checkbox" name="hobby"&gt;吃饭<br>&lt;input type="checkbox" name="hobby"&gt;睡觉<br>&lt;input type="checkbox" name="hobby"&gt;打豆豆</p>
<p>以上是常用的input<strong>复选框</strong>用法。<br>我们可以利用复选框<strong>点击—选中，再点击-不选中</strong>的特点制作开关。<br><a href="https://codepen.io/Liang_zhi_fang/pen/dmaWdm" rel="nofollow noreferrer" target="_blank">开关效果，里面不仅有效果图，也有代码，左上角的html和css可以点击查看喔！！！！</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/dmaWdm" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">2.利用input制作轮播图</h2>
<p>&lt;input type="radio" name="gender"&gt;男<br>&lt;input type="radio" name="gender"&gt;女</p>
<p>以上是常用的input<strong>单选框</strong>用法。<br>我们可以利用单选框<strong>只能选中其中一个</strong>制作轮播图。</p>
<p><a href="https://codepen.io/Liang_zhi_fang/pen/jzdGXb" rel="nofollow noreferrer" target="_blank">轮播图效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/jzdGXb" data-typeid="3">点击预览</button><br>由于代码比较长，就粘贴下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <style>
        input{
            display: none;
        }
        ul{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #box{
            width: 500px;
            height: 500px;
            margin: 0 auto;
            border:5px solid black;
            /*超出部分隐藏*/
            overflow: hidden;
            position: relative;
            text-align: center;
        }
        .list{
            /*让ul横着排放超出box*/
            width: 400%;
            /*利用position：absolute不占位*/
            position: absolute;
            /*过渡执行时间为1s*/
            transition:1s;
        }
        .list li{
            float:left;
            width: 500px;
            height: 500px;
        }
        label{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 5px solid white;
            position: absolute;
            bottom:40px;
            z-index: 2;
        }
        /*设置每个圆圈的位置*/
        label:nth-of-type(1){
            left:180px;
        }
        label:nth-of-type(2){
            left:220px;
        }
        label:nth-of-type(3){
            left:260px;
        }
        label:nth-of-type(4){
            left:300px;
        }
        input:checked+label{
            background:black;
        }
        /*选中移动ul*/
        input:nth-of-type(1):checked~ul{
            left:0;
        }
        input:nth-of-type(2):checked~ul{
            left:-100%;
        }
        input:nth-of-type(3):checked~ul{
            left:-200%;
        }
        input:nth-of-type(4):checked~ul{
            left:-300%;
        }
    </style>
</head>
<body>
<div id=&quot;box&quot;>
    <input checked type=&quot;radio&quot; name=&quot;pic&quot; id=&quot;one&quot;>
    <label for=&quot;one&quot;></label>
    <input type=&quot;radio&quot; name=&quot;pic&quot; id=&quot;two&quot;>
    <label for=&quot;two&quot;></label>
    <input type=&quot;radio&quot; name=&quot;pic&quot; id=&quot;three&quot;>
    <label for=&quot;three&quot;></label>
    <input type=&quot;radio&quot; name=&quot;pic&quot; id=&quot;four&quot;>
    <label for=&quot;four&quot;></label>
    <ul class=&quot;list&quot;>
        <li style=&quot;background: red;&quot;></li>
        <li style=&quot;background: blue;&quot;></li>
        <li style=&quot;background: yellow;&quot;></li>
        <li style=&quot;background: brown&quot;></li>
    </ul>
</div>
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
        <span class="hljs-selector-tag">input</span>{
            <span class="hljs-attribute">display</span>: none;
        }
        <span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">list-style</span>: none;
        }
        <span class="hljs-selector-id">#box</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid black;
            <span class="hljs-comment">/*超出部分隐藏*/</span>
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">text-align</span>: center;
        }
        <span class="hljs-selector-class">.list</span>{
            <span class="hljs-comment">/*让ul横着排放超出box*/</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">400%</span>;
            <span class="hljs-comment">/*利用position：absolute不占位*/</span>
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-comment">/*过渡执行时间为1s*/</span>
            <span class="hljs-attribute">transition</span>:<span class="hljs-number">1s</span>;
        }
        <span class="hljs-selector-class">.list</span> <span class="hljs-selector-tag">li</span>{
            <span class="hljs-attribute">float</span>:left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        }
        <span class="hljs-selector-tag">label</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid white;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>:<span class="hljs-number">40px</span>;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        }
        <span class="hljs-comment">/*设置每个圆圈的位置*/</span>
        <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-of-type(1)</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">180px</span>;
        }
        <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-of-type(2)</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">220px</span>;
        }
        <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">260px</span>;
        }
        <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-of-type(4)</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span>{
            <span class="hljs-attribute">background</span>:black;
        }
        <span class="hljs-comment">/*选中移动ul*/</span>
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:nth-of-type(1)</span><span class="hljs-selector-pseudo">:checked</span>~<span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:nth-of-type(2)</span><span class="hljs-selector-pseudo">:checked</span>~<span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">left</span>:-<span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span><span class="hljs-selector-pseudo">:checked</span>~<span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">left</span>:-<span class="hljs-number">200%</span>;
        }
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:nth-of-type(4)</span><span class="hljs-selector-pseudo">:checked</span>~<span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">left</span>:-<span class="hljs-number">300%</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">checked</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"one"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"two"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"three"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"four"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"four"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: red;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: blue;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: yellow;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: brown"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用CSS中input制作开关、轮播图

## 原文链接
[https://segmentfault.com/a/1190000014287837](https://segmentfault.com/a/1190000014287837)

