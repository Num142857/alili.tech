---
title: 'canvas入门实战--邀请卡生成与下载' 
date: 2018-12-22 2:30:10
hidden: true
slug: e3mmurbrij
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>写了很多的javascript和css3的文章，是时候写一篇canvas的了。canvas是html5提供的一个新的功能！至于作用，就是一个画布。然后画笔就是javascript。canvas的用途非常的广，特别是html5游戏以及数据可视化这两个方面。现在canvas给我的感觉就和css3一样，可以不用太厉害，但是必须要会基础的用法。但是以后对canvas的需求，肯定会越来越大。所以canvas很值得学习，而且学好canvas，就是很好的一个加分项。对于这篇文章，我也是以canvas初学者的角度写的，会有很多改善的地方。如果大家觉得我有什么可以改善的，或者建议，欢迎指点迷津！代码已上传github，需要的欢迎star(<a href="https://github.com/chenhuiYj/demos/tree/master/html5-demos/downloadImg" rel="nofollow noreferrer" target="_blank">downloadImg</a>)。</p>
<blockquote>大家看这篇文章之前，要了解javascript的一些基础，也要看着了解一些canvas的api（<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial" rel="nofollow noreferrer" target="_blank">canvas-MSN教程</a>，<a href="http://www.runoob.com/html/html5-canvas.html" rel="nofollow noreferrer" target="_blank">canvas菜鸟教程</a>）</blockquote>
<h2 id="articleHeader1">2.邀请卡实例</h2>
<p>邀请卡自动生成这个会有的，毕竟有时候，很多邀请卡都是一样的，就是被邀请的人不一样而已，也就是说，整个邀请卡，就是一个名字不一样，那么下面。就写一套代码，根据名字生成邀请卡！</p>
<h3 id="articleHeader2">2-1.运行效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVZWJs?w=952&amp;h=743" src="https://static.alili.tech/img/bVZWJs?w=952&amp;h=743" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>html代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>下载图片</title>
    <style>
        .set-option {
            float: left;
            width: 400px;
        }

        .set-option .text {
            width: 200px;
            height: 40px;
            padding-left: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .set-option td {
            padding: 10px 0;
        }

        .set-option td:first-child {
            text-align: right;
            padding-right: 10px;
        }

        .set-option p {
            margin: 0;
            line-height: 16px;
        }

        .check-box {
            width: 16px;
            height: 16px;
            margin: 0;
            vertical-align: top;
        }

        button {
            width: 200px;
            height: 50px;
            border: none;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            display: block;
            margin: 10px auto;
        }

        button:hover {
            opacity: .9;
        }

        .btn-all {
            background: #f90;
        }

        .btn-save {
            background: #09f;
        }

        .btn-download {
            background: #4CAF50;
        }
    </style>
</head>
<body>
<div>
    <div class=&quot;set-option&quot;>
        <table>
            <tr>
                <td>画布尺寸</td>
                <td><input type=&quot;text&quot; class=&quot;text&quot; id=&quot;size&quot;/></td>
            </tr>
            <tr>
                <td>背景图片</td>
                <td><input type=&quot;file&quot; id=&quot;file&quot;/></td>
            </tr>
            <tr>
                <td>用户名</td>
                <td>
                    <input type=&quot;text&quot; class=&quot;text&quot; id=&quot;user-name&quot;/>
                </td>
            </tr>
            <tr>
                <td>用户名x坐标</td>
                <td>
                    <input type=&quot;number&quot; class=&quot;text&quot; id=&quot;text-option-x&quot;/></br>
                    <p><input type=&quot;checkbox&quot; class=&quot;check-box&quot; value=&quot;1&quot; id=&quot;is-center-x&quot;>居中显示</p>
                </td>
            </tr>
            <tr>
                <td>用户名y坐标</td>
                <td>
                    <input type=&quot;number&quot; class=&quot;text&quot; id=&quot;text-option-y&quot;/></br>
                    <p><input type=&quot;checkbox&quot; class=&quot;check-box&quot; value=&quot;1&quot; id=&quot;is-center-y&quot;>居中显示</p>
                </td>
            </tr>
            <tr>
                <td>用户名字体大小</td>
                <td><input type=&quot;number&quot; class=&quot;text&quot; id=&quot;text-size&quot;/></td>
            </tr>
            <tr>
                <td>文字颜色</td>
                <td><input type=&quot;text&quot; class=&quot;text&quot; id=&quot;text-color&quot;/></td>
            </tr>
            <tr>
                <td>图片类型</td>
                <td>
                    <select type=&quot;text&quot; class=&quot;text&quot; id=&quot;img-type&quot;>
                        <option value=&quot;jpg&quot;>jpg</option>
                        <option value=&quot;png&quot;>png</option>
                    </select>
                </td>
            </tr>
        </table>
        <button id=&quot;save-image&quot; class=&quot;btn-save&quot;>效果预览</button>
        <button id=&quot;download-img&quot; class=&quot;btn-download&quot;>下载当前图片</button>
        <button id=&quot;download-all&quot; class=&quot;btn-all&quot;>批量导出</button>
    </div>
    <div class=&quot;show-canvas&quot;>
        <canvas width=200 height=200 id=&quot;thecanvas&quot;></canvas>
    </div>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>下载图片<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.set-option</span> {
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        }

        <span class="hljs-selector-class">.set-option</span> <span class="hljs-selector-class">.text</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        }

        <span class="hljs-selector-class">.set-option</span> <span class="hljs-selector-tag">td</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.set-option</span> <span class="hljs-selector-tag">td</span><span class="hljs-selector-pseudo">:first-child</span> {
            <span class="hljs-attribute">text-align</span>: right;
            <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">10px</span>;
        }

        <span class="hljs-selector-class">.set-option</span> <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">16px</span>;
        }

        <span class="hljs-selector-class">.check-box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">vertical-align</span>: top;
        }

        <span class="hljs-selector-tag">button</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> auto;
        }

        <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">9</span>;
        }

        <span class="hljs-selector-class">.btn-all</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
        }

        <span class="hljs-selector-class">.btn-save</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }

        <span class="hljs-selector-class">.btn-download</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#4CAF50</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"set-option"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>画布尺寸<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"size"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>背景图片<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"file"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>用户名<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user-name"</span>/&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>用户名x坐标<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-option-x"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">br</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"check-box"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"is-center-x"</span>&gt;</span>居中显示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>用户名y坐标<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-option-y"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">br</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"check-box"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"is-center-y"</span>&gt;</span>居中显示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>用户名字体大小<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-size"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>文字颜色<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-color"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>图片类型<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img-type"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"jpg"</span>&gt;</span>jpg<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"png"</span>&gt;</span>png<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"save-image"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-save"</span>&gt;</span>效果预览<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"download-img"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-download"</span>&gt;</span>下载当前图片<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"download-all"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-all"</span>&gt;</span>批量导出<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show-canvas"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">200</span> <span class="hljs-attr">height</span>=<span class="hljs-string">200</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"thecanvas"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>效果如图，那么大家细想一下，关于一张邀请卡，有什么东西是需要改变的！看到上图相比不难发现！有如下需要改变的属性：图片的大小，图片，用户名，用户名的坐标（x,y,x轴是否居中，y轴是否居中），用户名字体的大小，用户名字体的颜色，以及下载图片的类型。</p>
<p>这样就得到了如下的参数（大家看到有些参数是有值的，可以想成默认值就行了）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var option = {
    img: '111.jpg',
    width: 500,
    height: 350,
    fontSize: &quot;20px Microsoft YaHei&quot;,
    color: &quot;black&quot;,
    text: '守候',
    imgType: 'jpg',
    x: 30,
    y: 30,
    xCenter: false,
    yCenter: false,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">option</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    img:</span> <span class="hljs-string">'111.jpg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    width:</span> <span class="hljs-number">500</span><span class="hljs-string">,</span>
<span class="hljs-attr">    height:</span> <span class="hljs-number">350</span><span class="hljs-string">,</span>
<span class="hljs-attr">    fontSize:</span> <span class="hljs-string">"20px Microsoft YaHei"</span><span class="hljs-string">,</span>
<span class="hljs-attr">    color:</span> <span class="hljs-string">"black"</span><span class="hljs-string">,</span>
<span class="hljs-attr">    text:</span> <span class="hljs-string">'守候'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    imgType:</span> <span class="hljs-string">'jpg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">    y:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">    xCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    yCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-string">};</span></code></pre>
<h3 id="articleHeader3">2-2.步骤</h3>
<h4>1.初步效果</h4>
<p>根据上面的参数，先初步画一个效果，代码基本都是一个写法，没什么技巧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//画图
function draw(obj) {
    var canvas = document.getElementById(&quot;thecanvas&quot;);
    //画布大小
    canvas.width = obj.width;
    canvas.height = obj.height;
    //设置图片
    var img = new Image();
    img.src = obj.img;
    var ctx = canvas.getContext(&quot;2d&quot;);
    //设置字体的坐标
    var _x = obj.x, _y = obj.y;
    //是否居中显示
    if (obj.xCenter) {
        _x = obj.width / 2;
    }
    if (obj.yCenter) {
        _y = obj.height / 2;
    }
    //图片加载后
    img.onload = function () {
        //先画图片
        ctx.drawImage(img, 0, 0);
        //设置文字的大小
        ctx.font = obj.fontSize;
        //设置文字的颜色
        ctx.fillStyle = obj.color;
        //设置文字坐标
        if (obj.xCenter) {
            ctx.textAlign = &quot;center&quot;;
        }
        //画文字
        ctx.fillText(obj.text, _x, _y);
    };
}

window.onload = function () {
    draw(option);
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//画图</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"thecanvas"</span>);
    <span class="hljs-comment">//画布大小</span>
    canvas.width = obj.width;
    canvas.height = obj.height;
    <span class="hljs-comment">//设置图片</span>
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
    img.src = obj.img;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">"2d"</span>);
    <span class="hljs-comment">//设置字体的坐标</span>
    <span class="hljs-keyword">var</span> _x = obj.x, _y = obj.y;
    <span class="hljs-comment">//是否居中显示</span>
    <span class="hljs-keyword">if</span> (obj.xCenter) {
        _x = obj.width / <span class="hljs-number">2</span>;
    }
    <span class="hljs-keyword">if</span> (obj.yCenter) {
        _y = obj.height / <span class="hljs-number">2</span>;
    }
    <span class="hljs-comment">//图片加载后</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//先画图片</span>
        ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
        <span class="hljs-comment">//设置文字的大小</span>
        ctx.font = obj.fontSize;
        <span class="hljs-comment">//设置文字的颜色</span>
        ctx.fillStyle = obj.color;
        <span class="hljs-comment">//设置文字坐标</span>
        <span class="hljs-keyword">if</span> (obj.xCenter) {
            ctx.textAlign = <span class="hljs-string">"center"</span>;
        }
        <span class="hljs-comment">//画文字</span>
        ctx.fillText(obj.text, _x, _y);
    };
}

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    draw(option);
}

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZWJs?w=952&amp;h=743" src="https://static.alili.tech/img/bVZWJs?w=952&amp;h=743" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>2.动态改变参数</h4>
<p>看到图已经画好了，工作其实已经完成一半了！</p>
<p>下面就是动态改变参数！这一步其实很简单。<br>首先，改变画布的尺寸</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//画布尺寸
//获取按钮
var size = document.getElementById(&quot;size&quot;);
size.addEventListener(&quot;blur&quot;, function () {
    //根据空格，区分高宽
    var _width = parseInt(size.value.replace(/(^\s*)|(\s*$)/g, &quot;&quot;).split(/\s+/)[0]),
        _height = parseInt(size.value.replace(/(^\s*)|(\s*$)/g, &quot;&quot;).split(/\s+/)[1]);
    //把参数的width和height改掉
    option.width = _width || 100;
    option.height = _height || 100;
    //重新画图
    draw(option);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//画布尺寸</span>
<span class="hljs-comment">//获取按钮</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"size"</span>);
<span class="hljs-built_in">size</span>.addEventListener(<span class="hljs-string">"blur"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//根据空格，区分高宽</span>
    <span class="hljs-built_in">var</span> _width = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">size</span>.value.replace(<span class="hljs-regexp">/(^\s*)|(\s*$)/g</span>, <span class="hljs-string">""</span>).split(<span class="hljs-regexp">/\s+/</span>)[<span class="hljs-number">0</span>]),
        _height = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">size</span>.value.replace(<span class="hljs-regexp">/(^\s*)|(\s*$)/g</span>, <span class="hljs-string">""</span>).split(<span class="hljs-regexp">/\s+/</span>)[<span class="hljs-number">1</span>]);
    <span class="hljs-comment">//把参数的width和height改掉</span>
    option.width = _width || <span class="hljs-number">100</span>;
    option.height = _height || <span class="hljs-number">100</span>;
    <span class="hljs-comment">//重新画图</span>
    draw(option);
});</code></pre>
<p>上面代码设置了，只要输入框失去了焦点，就会改变画布的大小，下面来运行下，看下效果（gif图差强人意，大家看懂就好）</p>
<p><span class="img-wrap"><img data-src="/img/bVZUkv?w=949&amp;h=703" src="https://static.alili.tech/img/bVZUkv?w=949&amp;h=703" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>canvas没有层级的说法，只要改canvas，都要重绘。哪怕就是一个字移动一个像素。</blockquote>
<p>做好了这个，下面做选择图片的功能！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//选择图片
//获取图片控件
var file = document.getElementById(&quot;file&quot;), imagesFile, imageData;
file.addEventListener('change', function (e) {
    //获取图片
    imagesFile = e.target.files[0];
    //把图片转base64
    var reader = new FileReader();
    reader.readAsDataURL(imagesFile);
    //图片加载后
    reader.onload = function (e) {
        //设置option的img属性，再冲洗年绘制
        imageData = this.result;
        option.img = imageData;
        draw(option);
    }
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//选择图片</span>
<span class="hljs-comment">//获取图片控件</span>
<span class="hljs-keyword">var</span> file = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"file"</span>), imagesFile, imageData;
file.addEventListener(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//获取图片</span>
    imagesFile = e.target.files[<span class="hljs-number">0</span>];
    <span class="hljs-comment">//把图片转base64</span>
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.readAsDataURL(imagesFile);
    <span class="hljs-comment">//图片加载后</span>
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">//设置option的img属性，再冲洗年绘制</span>
        imageData = <span class="hljs-keyword">this</span>.result;
        option.img = imageData;
        draw(option);
    }
});

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZX7E?w=991&amp;h=797" src="https://static.alili.tech/img/bVZX7E?w=991&amp;h=797" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面开始改文字，用户名这个有点不一样，我以空格分割。如果输入多个用户名，以第一个用户名重绘。下面代码，注释就不写了，还是和上面的逻辑一样！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用户名
var userName = document.getElementById(&quot;user-name&quot;);
userName.addEventListener(&quot;blur&quot;, function () {
    var _text = userName.value.replace(/(^\s*)|(\s*$)/g, &quot;&quot;).split(/\s+/);
    option.text = _text[0];
    draw(option);
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//用户名</span>
<span class="hljs-keyword">var</span> userName = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"user-name"</span>);
userName.addEventListener(<span class="hljs-string">"blur"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _text = userName.value.replace(<span class="hljs-regexp">/(^\s*)|(\s*$)/g</span>, <span class="hljs-string">""</span>).split(<span class="hljs-regexp">/\s+/</span>);
    option.text = _text[<span class="hljs-number">0</span>];
    draw(option);
});

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZUnM?w=949&amp;h=703" src="https://static.alili.tech/img/bVZUnM?w=949&amp;h=703" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面开始用户名的坐标，代码方面，也是改option的相关属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    optionXCenter.addEventListener(&quot;change&quot;, function () {
        if (optionXCenter.checked) {
            option.xCenter = true;
        }
        else {
            option.xCenter = false;
            option.x = parseInt(optionX.value);
        }
        draw(option);
    });
    //纵坐标
    var optionY = document.getElementById(&quot;text-option-y&quot;);
    optionY.value = option.y;
    var optionYCenter = document.getElementById(&quot;is-center-y&quot;);
    optionY.addEventListener(&quot;input&quot;, function () {
        if (optionYCenter.checked) {
            option.yCenter = true;
        }
        else {
            option.yCenter = false;
            option.y = parseInt(optionY.value);
        }
        draw(option);
    });
    //是否垂直居中显示
    optionYCenter.addEventListener(&quot;change&quot;, function () {
        if (optionYCenter.checked) {
            option.yCenter = true;
        }
        else {
            option.yCenter = false;
            option.y = parseInt(optionY.value);
        }
        draw(option);
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    optionXCenter.addEventListener(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (optionXCenter.checked) {
            option.xCenter = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">else</span> {
            option.xCenter = <span class="hljs-literal">false</span>;
            option.x = <span class="hljs-built_in">parseInt</span>(optionX.value);
        }
        draw(option);
    });
    <span class="hljs-comment">//纵坐标</span>
    <span class="hljs-keyword">var</span> optionY = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text-option-y"</span>);
    optionY.value = option.y;
    <span class="hljs-keyword">var</span> optionYCenter = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"is-center-y"</span>);
    optionY.addEventListener(<span class="hljs-string">"input"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (optionYCenter.checked) {
            option.yCenter = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">else</span> {
            option.yCenter = <span class="hljs-literal">false</span>;
            option.y = <span class="hljs-built_in">parseInt</span>(optionY.value);
        }
        draw(option);
    });
    <span class="hljs-comment">//是否垂直居中显示</span>
    optionYCenter.addEventListener(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (optionYCenter.checked) {
            option.yCenter = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">else</span> {
            option.yCenter = <span class="hljs-literal">false</span>;
            option.y = <span class="hljs-built_in">parseInt</span>(optionY.value);
        }
        draw(option);
    });
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZUnV?w=949&amp;h=703" src="https://static.alili.tech/img/bVZUnV?w=949&amp;h=703" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>是否水平居中显示</p>
<p><span class="img-wrap"><img data-src="/img/bVZUnU?w=949&amp;h=703" src="https://static.alili.tech/img/bVZUnU?w=949&amp;h=703" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>其他的属性，字体大小和颜色，基本是一样的代码，运行的效果图我不放了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//字体颜色
var textColor = document.getElementById(&quot;text-color&quot;);
textColor.addEventListener(&quot;blur&quot;, function () {
    textColor.value === &quot;&quot; ? option.color = &quot;#fff&quot; : option.color = '#' + textColor.value;
    draw(option);
});
//字体大小
var textSize = document.getElementById(&quot;text-size&quot;);
textSize.addEventListener(&quot;input&quot;, function () {
    textSize.value === &quot;&quot; ? option.fontSize = '20px Microsoft YaHei' : option.fontSize = textSize.value + 'px Microsoft YaHei';
    draw(option);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//字体颜色</span>
<span class="hljs-keyword">var</span> textColor = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text-color"</span>);
textColor.addEventListener(<span class="hljs-string">"blur"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    textColor.value === <span class="hljs-string">""</span> ? option.color = <span class="hljs-string">"#fff"</span> : option.color = <span class="hljs-string">'#'</span> + textColor.value;
    draw(option);
});
<span class="hljs-comment">//字体大小</span>
<span class="hljs-keyword">var</span> textSize = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text-size"</span>);
textSize.addEventListener(<span class="hljs-string">"input"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    textSize.value === <span class="hljs-string">""</span> ? option.fontSize = <span class="hljs-string">'20px Microsoft YaHei'</span> : option.fontSize = textSize.value + <span class="hljs-string">'px Microsoft YaHei'</span>;
    draw(option);
});
</code></pre>
<h4>3.按钮操作</h4>
<p><strong>效果预览</strong></p>
<p>就是预览当前canvas的一个效果，这个就很简单了，就是新开一个窗口，然后把图片写进去而已</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//预览图片
function saveImageInfo() {
    var mycanvas = document.getElementById(&quot;thecanvas&quot;);
    //生成图片
    var image = mycanvas.toDataURL(&quot;image/png&quot;);
    var w = window.open('about:blank', 'image from canvas');
    //把图片新进新的窗口
    w.document.write(&quot;<img src='&quot; + image + &quot;' alt='from canvas'/>&quot;);
}
var saveButton = document.getElementById(&quot;save-image&quot;);
saveButton.addEventListener('click', saveImageInfo);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//预览图片</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveImageInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> mycanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"thecanvas"</span>);
    <span class="hljs-comment">//生成图片</span>
    <span class="hljs-keyword">var</span> image = mycanvas.toDataURL(<span class="hljs-string">"image/png"</span>);
    <span class="hljs-keyword">var</span> w = <span class="hljs-built_in">window</span>.open(<span class="hljs-string">'about:blank'</span>, <span class="hljs-string">'image from canvas'</span>);
    <span class="hljs-comment">//把图片新进新的窗口</span>
    w.document.write(<span class="hljs-string">"&lt;img src='"</span> + image + <span class="hljs-string">"' alt='from canvas'/&gt;"</span>);
}
<span class="hljs-keyword">var</span> saveButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"save-image"</span>);
saveButton.addEventListener(<span class="hljs-string">'click'</span>, saveImageInfo);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZX8z?w=991&amp;h=797" src="https://static.alili.tech/img/bVZX8z?w=991&amp;h=797" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>下载当前图片</strong></p>
<p>下载图片这个，基本也是写法的，都是些记忆的东西</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//图片类型
var imgType = document.getElementById(&quot;img-type&quot;);
imgType.addEventListener(&quot;change&quot;,function () {
    option.imgType=this.value;
});
//下载图片
function downloadImg(fileName) {
    //获取canvas
    var myCanvas = document.getElementById(&quot;thecanvas&quot;);
    //设置图片类型
    var image = myCanvas.toDataURL(&quot;image/&quot; + option.imgType).replace(&quot;image/&quot; + option.imgType, &quot;image/octet-stream&quot;);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = image;
    //设置下载图片的名称
    save_link.download = fileName + '.' + option.imgType;
    //下载图片
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//图片类型</span>
<span class="hljs-keyword">var</span> imgType = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"img-type"</span>);
imgType.addEventListener(<span class="hljs-string">"change"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    option.imgType=<span class="hljs-keyword">this</span>.value;
});
<span class="hljs-comment">//下载图片</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">downloadImg</span>(<span class="hljs-params">fileName</span>) </span>{
    <span class="hljs-comment">//获取canvas</span>
    <span class="hljs-keyword">var</span> myCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"thecanvas"</span>);
    <span class="hljs-comment">//设置图片类型</span>
    <span class="hljs-keyword">var</span> image = myCanvas.toDataURL(<span class="hljs-string">"image/"</span> + option.imgType).replace(<span class="hljs-string">"image/"</span> + option.imgType, <span class="hljs-string">"image/octet-stream"</span>);
    <span class="hljs-keyword">var</span> save_link = <span class="hljs-built_in">document</span>.createElementNS(<span class="hljs-string">'http://www.w3.org/1999/xhtml'</span>, <span class="hljs-string">'a'</span>);
    save_link.href = image;
    <span class="hljs-comment">//设置下载图片的名称</span>
    save_link.download = fileName + <span class="hljs-string">'.'</span> + option.imgType;
    <span class="hljs-comment">//下载图片</span>
    <span class="hljs-keyword">var</span> event = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'MouseEvents'</span>);
    event.initMouseEvent(<span class="hljs-string">'click'</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-built_in">window</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);
    save_link.dispatchEvent(event);
}

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZX9j?w=1000&amp;h=947" src="https://static.alili.tech/img/bVZX9j?w=1000&amp;h=947" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>批量下载图片</strong></p>
<p>这个复杂一点，但也不难，下面一步一步来！</p>
<p>1.首先批量导出，那么用户名我这里是使用空格分割，那么现在我在option里面，弄一个字段textAll，所有文字的集合。all代表是否是批量下载。fn属性代表回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//批量导出
var downloadAll = document.getElementById(&quot;download-all&quot;);
downloadAll.addEventListener('click', function () {
    var _text = userName.value.replace(/(^\s*)|(\s*$)/g, &quot;&quot;).split(/\s+/);
    option.textAll = _text;
    option.all = true;
    option.fn = downloadImg;
    draw(option);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//批量导出</span>
<span class="hljs-keyword">var</span> downloadAll = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"download-all"</span>);
downloadAll.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _text = userName.value.replace(<span class="hljs-regexp">/(^\s*)|(\s*$)/g</span>, <span class="hljs-string">""</span>).split(<span class="hljs-regexp">/\s+/</span>);
    option.textAll = _text;
    option.all = <span class="hljs-literal">true</span>;
    option.fn = downloadImg;
    draw(option);
});
</code></pre>
<p>2.然后修改绘制的函数draw，判断是否是全部绘制的情况！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function draw(obj) {
    var canvas = document.getElementById(&quot;thecanvas&quot;);
    //画布大小
    canvas.width = obj.width;
    canvas.height = obj.height;
    //设置图片
    var img = new Image();
    img.src = obj.img;
    var ctx = canvas.getContext(&quot;2d&quot;);
    //设置字体的坐标
    var _x = obj.x, _y = obj.y;
    //是否居中显示
    if (obj.xCenter) {
        _x = obj.width / 2;
    }
    if (obj.yCenter) {
        _y = obj.height / 2;
    }
    //图片加载后
    img.onload = function () {
        //是否是全部打印
        if(obj.all){
            //遍历textAll
            for(var i=0;i<obj.textAll.length;i++){
                //绘制图片
                ctx.drawImage(img,0,0);
                //设置字体大小
                ctx.font=obj.fontSize;
                //设置字体颜色
                ctx.fillStyle=obj.color;
                //是否居中显示
                if(obj.xCenter){
                    ctx.textAlign=&quot;center&quot;;
                }
                //绘制文字
                ctx.fillText(obj.textAll[i], _x,_y);
                //是否回调
                if(obj.fn){
                    obj.fn(obj.textAll[i]);
                }
            }
            //最后取消全部批量下载
            defult.all=false;
        }
        else{
            ctx.drawImage(img,0,0);
            ctx.font=obj.fontSize;
            ctx.fillStyle=obj.color;
            if(obj.xCenter){
                ctx.textAlign=&quot;center&quot;;
            }
            ctx.fillText(obj.text, _x,_y);
        }
    };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"thecanvas"</span>);
    <span class="hljs-comment">//画布大小</span>
    canvas.width = obj.width;
    canvas.height = obj.height;
    <span class="hljs-comment">//设置图片</span>
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
    img.src = obj.img;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">"2d"</span>);
    <span class="hljs-comment">//设置字体的坐标</span>
    <span class="hljs-keyword">var</span> _x = obj.x, _y = obj.y;
    <span class="hljs-comment">//是否居中显示</span>
    <span class="hljs-keyword">if</span> (obj.xCenter) {
        _x = obj.width / <span class="hljs-number">2</span>;
    }
    <span class="hljs-keyword">if</span> (obj.yCenter) {
        _y = obj.height / <span class="hljs-number">2</span>;
    }
    <span class="hljs-comment">//图片加载后</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//是否是全部打印</span>
        <span class="hljs-keyword">if</span>(obj.all){
            <span class="hljs-comment">//遍历textAll</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;obj.textAll.length;i++){
                <span class="hljs-comment">//绘制图片</span>
                ctx.drawImage(img,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
                <span class="hljs-comment">//设置字体大小</span>
                ctx.font=obj.fontSize;
                <span class="hljs-comment">//设置字体颜色</span>
                ctx.fillStyle=obj.color;
                <span class="hljs-comment">//是否居中显示</span>
                <span class="hljs-keyword">if</span>(obj.xCenter){
                    ctx.textAlign=<span class="hljs-string">"center"</span>;
                }
                <span class="hljs-comment">//绘制文字</span>
                ctx.fillText(obj.textAll[i], _x,_y);
                <span class="hljs-comment">//是否回调</span>
                <span class="hljs-keyword">if</span>(obj.fn){
                    obj.fn(obj.textAll[i]);
                }
            }
            <span class="hljs-comment">//最后取消全部批量下载</span>
            defult.all=<span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">else</span>{
            ctx.drawImage(img,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
            ctx.font=obj.fontSize;
            ctx.fillStyle=obj.color;
            <span class="hljs-keyword">if</span>(obj.xCenter){
                ctx.textAlign=<span class="hljs-string">"center"</span>;
            }
            ctx.fillText(obj.text, _x,_y);
        }
    };
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZX4k?w=991&amp;h=943" src="https://static.alili.tech/img/bVZX4k?w=991&amp;h=943" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZX42?w=366&amp;h=184" src="https://static.alili.tech/img/bVZX42?w=366&amp;h=184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">3.小结</h2>
<p>关于canvas入门的第一篇文章，就写到这里了。写完之后，也发现自己对canvas的也是有很多的不懂！上文的这例子，知识canvas很简单的一个入门实例。canvas如果深入学习，能做到很多让人惊讶的效果，这个得以后要加强学习，如果发现些值得记录的知识，我也会写文章。canvas是一个非常值得学习的知识，也是很有趣的一个知识。期待与大家有更多的交流和学习！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas入门实战--邀请卡生成与下载

## 原文链接
[https://segmentfault.com/a/1190000012418898](https://segmentfault.com/a/1190000012418898)

