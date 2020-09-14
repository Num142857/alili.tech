---
title: '你不知道的javascript事件' 
date: 2018-12-25 2:30:11
hidden: true
slug: wp66ha6xjmq
categories: [reprint]
---

{{< raw >}}

                    
<p>事件流描述的是从页面中接受事件的顺序。然而ie和netscape分别提出了完全相反的的概念：事件冒泡和事件捕获。下面就说说这两种事件流：</p>
<h2 id="articleHeader0">事件冒泡</h2>
<p>事件冒泡，就是说时间开始时由具体的元素接受，然后逐级向上传播到较为不具体的节点。看看下面的图就比较清楚了：<br><span class="img-wrap"><img data-src="/img/bVYi6Y?w=435&amp;h=368" src="https://static.alili.tech/img/bVYi6Y?w=435&amp;h=368" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>比如说在图中的&lt;div&gt;元素中添加一个click事件，那么这个&lt;div&gt;元素就是我们的单击事件，然后click事件就会沿DOM树向上传播，在每一级节点上都会发生，直到传播到document对象。看看下面的实例：</p>
<p>在理解实例事前先说说实例用到的核心操作：addEventListener(),这是DOM2事件定义的方法，用于处理添加指定事件处理程序的操作，有添加的方法当然也就会有删除事件处理程序的方法removeEventListener()。所有的DOM节点中包含了这两个方法，它们都接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。如果布尔值参数是false，表示在冒泡阶段调用事件处理程序；如果是true，表示在捕获阶段调用事件处理程序(稍后会说到事件捕获)，布尔值默认参数是false。</p>
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
        *{
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }

        body{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .box{
            width: 200px;
            height: 200px;
            background-color: green;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .inner{
            width: 100px;
            height: 100px;
            background-color: blue;
            align-self: flex-end;
        }
        .box3{
            width: 50px;
            height: 50px;
            background-color: red;
            align-self: flex-end;
        }
    </style>
</head>
<body>
    <div class=&quot;box&quot;> 外部盒
        <div class=&quot;inner&quot;>inner
            <div class=&quot;box3&quot;>box3
            </div>
        </div>
    </div>
    <script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(e){
            console.log('点击了外部盒子');
        },false);
        oInner.addEventListener('click',function(e){
            console.log('点击了inner');
        },false);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(e){
            console.log('点击了box3');
        },false);  
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">justify-content</span>: center;
            <span class="hljs-attribute">align-items</span>: center;
        }
        <span class="hljs-selector-class">.box</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: green;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">align-items</span>: center;
            <span class="hljs-attribute">justify-content</span>: center;
        }
        <span class="hljs-selector-class">.inner</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: blue;
            <span class="hljs-attribute">align-self</span>: flex-end;
        }
        <span class="hljs-selector-class">.box3</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background-color</span>: red;
            <span class="hljs-attribute">align-self</span>: flex-end;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span> 外部盒
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner"</span>&gt;</span>inner
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box3"</span>&gt;</span>box3
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">false</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>);
        },<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">false</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>浏览器效果：<br><span class="img-wrap"><img data-src="/img/bVYDtD?w=234&amp;h=208" src="https://static.alili.tech/img/bVYDtD?w=234&amp;h=208" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>现在就说说实例中触发事件的执行顺序，挺有意思的，容易被绕进去：</p>
<ul><li><p>点击绿色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDD7?w=330&amp;h=126" src="https://static.alili.tech/img/bVYDD7?w=330&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>输出的值也就是一个了。</p>
<ul><li><p>点击蓝色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDGM?w=291&amp;h=135" src="https://static.alili.tech/img/bVYDGM?w=291&amp;h=135" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>输出的值有两个，这个为什么呢，原因很简单，蓝色区域是在绿色区域内，蓝色区域触发click事件，在冒泡阶段调用事件处理程序，点击蓝色区域，click事件沿DOM树向上传播，由类属性为inner的元素的向上传播到类属性为box的元素，再依次向上传播，故输出的值为两个。注意其输出的顺序：先输出自身元素触发事件中的值，然后再是父元素事件中的值。由内向外，这也就是事件冒泡的核心内容了。</p>
<ul><li><p>点击红色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDLb?w=280&amp;h=160" src="https://static.alili.tech/img/bVYDLb?w=280&amp;h=160" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>输出的值有三个，原因就不再解释了，原因和上面的一样，同时也要注意下它们的输出顺序。通过这个实例对事件冒泡有了解了，接下来我们来深入下：</p>
<p>在我们实际开发中，是很不愿意事件在DOM层次中的传播，很影响体验效果，如上实例，触发红色区域的元素，我只想输出一个值，然而偏偏输出了三个值，是不是很烦啊？？？这个还是有解决方案的，stopPropagation()方法用于立即停止事件在DOM层次中的传播，即取消进一步的事件冒泡或捕获。看下面的例子（html代码与上面实例一样）：</p>
<ol><li><p>红色区域停止传播</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            console.log('点击了外部盒子');
        },false);
        oInner.addEventListener('click',function(event){
            console.log('点击了inner'); 
        },false);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){
            event.stopPropagation();
            console.log('点击了box3');
        },false);  
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">false</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            event.stopPropagation();
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">false</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>先说说上面的代码中涉及到的一个局部变量event，相信很多人对这个变量都不是很理解，我刚接触的时候也不是很理解这个变量，为什么会有这个变量，这个变量干嘛用的，怎么还可以调用方法和属性，好神奇啊！！！现在我就来说说这个局部变量，这个变量就是事件对象，在触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含了所有与事件有关的信息，包括了导致事件的元素、事件的类型以及其它与特定事件相关的信息。例如，鼠标操作导致的事件对象中，会包含鼠标位置的信息。</p>
<ul><li><p>点击红色区域：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDXV?w=289&amp;h=144" src="https://static.alili.tech/img/bVYDXV?w=289&amp;h=144" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在红色区域的click事件中加了stopPropagation()，这就立即停止了事件在DOM层次中的传播，也就是取消进一步的事件冒泡，输出的值也就只有一个了。</p>
<ul><li><p>分别点击蓝色区域、绿色区域：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYD1Y?w=273&amp;h=178" src="https://static.alili.tech/img/bVYD1Y?w=273&amp;h=178" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYD2a?w=291&amp;h=156" src="https://static.alili.tech/img/bVYD2a?w=291&amp;h=156" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从输出可以看出，这两部分没有加stopPropagation()，事件依旧在DOM层次中的传播，同时注意它们的输出顺序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.蓝色区域停止传播" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">2.</span>蓝色区域停止传播</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            console.log('点击了外部盒子');
        },false);
        oInner.addEventListener('click',function(event){
            event.stopPropagation();
            console.log('点击了inner'); 
        },false);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){
            console.log('点击了box3');
        },false);  
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">false</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            event.stopPropagation();
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">false</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><p>点击蓝色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYEaz?w=293&amp;h=140" src="https://static.alili.tech/img/bVYEaz?w=293&amp;h=140" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>成功取消了事件冒泡，输出的值是一个即本身触发输出，而不是两个值。</p>
<ul><li><p>点击红色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYEbB?w=240&amp;h=144" src="https://static.alili.tech/img/bVYEbB?w=240&amp;h=144" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个输出了两个值，不是三个值，或许会感到很好奇，我取消的是蓝色区域的事件捕获，为什么click红色区域只输出两个，其实正因为你在蓝色区域内调用了stopPropagation()方法，其事件就会被停止冒泡，即使你点击的是红色区域，事件冒泡最终停留在蓝色区域，传播不到绿色区域，即输出的值为两个。</p>
<ul><li><p>点击绿色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDD7?w=330&amp;h=126" src="https://static.alili.tech/img/bVYDD7?w=330&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>因为绿色区域是三个颜色区域最外层区域，其子元素的取消事件冒泡对自己没有影响，再者其父元素没有做任何事件监听，故输出的值仅仅是其自身事件触发得到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.绿色区域停止传播
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3.</span>绿色区域停止传播
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            event.stopPropagation();
            console.log('点击了外部盒子');
        },false);
        oInner.addEventListener('click',function(event){
            
            console.log('点击了inner'); 
        },false);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){    
            console.log('点击了box3');
        },false);  
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            event.stopPropagation();
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">false</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{    
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">false</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><p>分别点击绿色区域，蓝色区域，红色区域：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDD7?w=330&amp;h=126" src="https://static.alili.tech/img/bVYDD7?w=330&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYDGM?w=291&amp;h=135" src="https://static.alili.tech/img/bVYDGM?w=291&amp;h=135" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYDLb?w=280&amp;h=160" src="https://static.alili.tech/img/bVYDLb?w=280&amp;h=160" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>得到的效果和没有做停止事件在DOM层中的传播是一样的，因为绿色区域是三个颜色区域最外层区域，其做取消事件冒泡，其子元素的事件冒泡对此没有影响，再者其父元素没有做任何事件监听，故输出的值和没有做停止事件在DOM层中的传播。</p>
<h2 id="articleHeader1">事件捕获</h2>
<p>事件捕获是不太具体的节点应该更早接受到事件，而具体的节点应该最后接受到事件。看看下面的图：<br><span class="img-wrap"><img data-src="/img/bVYi7V?w=394&amp;h=324" src="https://static.alili.tech/img/bVYi7V?w=394&amp;h=324" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如图中，div元素增加一个click事件，在事件捕获中，document对象首先接受到click事件，然后事件沿DOM树依次向下，一直传播到事件的实际目标，即div元素。看看下面的实例：</p>
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
        *{
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }

        body{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .box{
            width: 200px;
            height: 200px;
            background-color: green;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .inner{
            width: 100px;
            height: 100px;
            background-color: blue;
            align-self: flex-end;
        }
        .box3{
            width: 50px;
            height: 50px;
            background-color: red;
            align-self: flex-end;
        }
    </style>
</head>
<body>
    <div class=&quot;box&quot;> 外部盒
        <div class=&quot;inner&quot;>inner
            <div class=&quot;box3&quot;>box3
            </div>
        </div>
    </div>
    <script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            console.log('点击了外部盒子');
        },true);
        oInner.addEventListener('click',function(event){
            
            console.log('点击了inner'); 
        },true);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){    
            console.log('点击了box3');
        },true);  
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">justify-content</span>: center;
            <span class="hljs-attribute">align-items</span>: center;
        }
        <span class="hljs-selector-class">.box</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: green;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">align-items</span>: center;
            <span class="hljs-attribute">justify-content</span>: center;
        }
        <span class="hljs-selector-class">.inner</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: blue;
            <span class="hljs-attribute">align-self</span>: flex-end;
        }
        <span class="hljs-selector-class">.box3</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background-color</span>: red;
            <span class="hljs-attribute">align-self</span>: flex-end;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span> 外部盒
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner"</span>&gt;</span>inner
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box3"</span>&gt;</span>box3
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">true</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">true</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{    
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">true</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这份代码与冒泡事件的代码大致相同，有变化的就是添加事件处理程序的操作addEventListener(),其中的第三个参数改为了true，表示在捕获阶段调用事件处理程序。</p>
<ul><li><p>分别点击绿色区域、蓝色区域、红色区域时执行顺序：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYGFF?w=200&amp;h=128" src="https://static.alili.tech/img/bVYGFF?w=200&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVYGFH?w=253&amp;h=143" src="https://static.alili.tech/img/bVYGFH?w=253&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVYGFJ?w=251&amp;h=151" src="https://static.alili.tech/img/bVYGFJ?w=251&amp;h=151" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>输出的原因相信大家都很清楚了，在这就不再解释了，需要注意的是控制台值得输出顺序，和冒泡事件输出顺序相反的。</p>
<p>接下来再讲讲捕获事件中停止事件在DOM层次中的传播，取消进一步的事件捕获，这和冒泡事件的很不一样，主要原因在于它们的传播顺序刚好相反，大家需要认真的思考，不要搞混淆了，现在就讲讲其中的一种比较容易出错的，其它的大家可以自行思考，完整代码已经贴出来了，大家看看下面的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            console.log('点击了外部盒子');
        },true);
        oInner.addEventListener('click',function(event){
            event.stopPropagation();
            console.log('点击了inner'); 
        },true);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){    
            console.log('点击了box3');
        },true);  
 </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">true</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            event.stopPropagation();
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">true</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{    
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">true</span>);  
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>蓝色区域的click事件中添加了stopPropagation()方法，取消进一步的事件捕获，分别点击不同区域，会产生什么效果呢？？？大家往下看：</p>
<ul><li><p>点击绿色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYGFF?w=200&amp;h=128" src="https://static.alili.tech/img/bVYGFF?w=200&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个原因就不再解释了，大家都懂！！！</p>
<ul><li><p>点击蓝色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYGFH?w=253&amp;h=143" src="https://static.alili.tech/img/bVYGFH?w=253&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>输出的值有两个，这个大家容易搞错，在蓝色区域的click事件中添加了stopPropagation()方法，取消了事件捕获，不应该只出现“点击了inner”的吗，怎么还出现了“点击了外部盒子”呢？？？这就又可能和事件冒泡搞混淆了，事件捕获是由不太具体的节点应该更早接受到事件，而具体的节点应该最后接受到事件。简单点来说是由外向内传播。蓝色区域的click事件中添加了stopPropagation()方法，只是该节点不会再向下传播，该节点的父元素还是会传播到该节点的，所以输出的值会有两个，而不是一个。</p>
<ul><li><p>点击红色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYGFH?w=253&amp;h=143" src="https://static.alili.tech/img/bVYGFH?w=253&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>输出的值有两个，这个的原因和上面的差不多，思想是一样的，蓝色区域的click事件中添加了stopPropagation()方法，该节点不会再向下传播，点击红色区域，捕获事件只能做到蓝色区域就停止了。</p>
<h2 id="articleHeader2">事件流</h2>
<p>“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的是事件捕获阶段，为截获事件提供了机会。然后是实际的目标接收事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。<br><span class="img-wrap"><img data-src="/img/bVYGNN?w=506&amp;h=307" src="https://static.alili.tech/img/bVYGNN?w=506&amp;h=307" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在DOM事件流中，实际的目标如div元素在捕获阶段不会接受到事件，这也就意味在捕获阶段，事件从document到html元素再到body后就停止了。下一阶段是处于目标阶段，于是事件在div上发生，并在事件处理中被看成冒泡阶段的一部分，然后，冒泡阶段发生，事件有传播会文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        var oBox = document.querySelector('.box');
        var oInner = document.querySelector('.inner');
        oBox.addEventListener('click',function(event){
            console.log('点击了外部盒子');
        },false);
        oInner.addEventListener('click',function(event){
            console.log('点击了inner'); 
        },true);
        var box3 = document.querySelector('.box3');
        box3.addEventListener('click',function(event){    
            console.log('点击了box3');
        },true);  
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> oBox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
        <span class="hljs-keyword">var</span> oInner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.inner'</span>);
        oBox.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了外部盒子'</span>);
        },<span class="hljs-literal">false</span>);
        oInner.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了inner'</span>); 
        },<span class="hljs-literal">true</span>);
        <span class="hljs-keyword">var</span> box3 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box3'</span>);
        box3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{    
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击了box3'</span>);
        },<span class="hljs-literal">true</span>);  
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><p>分别点击绿色区域、蓝色区域、红色区域</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYDD7?w=330&amp;h=126" src="https://static.alili.tech/img/bVYDD7?w=330&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVYDGM?w=291&amp;h=135" src="https://static.alili.tech/img/bVYDGM?w=291&amp;h=135" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVYGPs?w=205&amp;h=107" src="https://static.alili.tech/img/bVYGPs?w=205&amp;h=107" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体原因就在过多的去解释了，这个就留给大家思考，清楚的的理解事件流机制就能很快的得出答案。<br><strong>何处调用事件处理程序，何时在冒泡阶段调用事件处理程序，何时在捕获阶段调用事件处理程序。</strong></p>
<h2 id="articleHeader3">结束</h2>
<ul><li><p>终于写完了！</p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的javascript事件

## 原文链接
[https://segmentfault.com/a/1190000012042145](https://segmentfault.com/a/1190000012042145)

