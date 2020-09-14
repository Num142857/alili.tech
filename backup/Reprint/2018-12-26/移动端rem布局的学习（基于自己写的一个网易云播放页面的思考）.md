---
title: '移动端rem布局的学习（基于自己写的一个网易云播放页面的思考）' 
date: 2018-12-26 2:30:14
hidden: true
slug: nyy120srg5r
categories: [reprint]
---

{{< raw >}}

                    
<p>对于一个前端的初学者来说，首先要做好的事就是切页面了，切页面不得不说的就是布局了，布局的重要性不言而喻，为了良好的用户体验，提出了许多不一样的布局：响应式布局，弹性布局，流动布局等等，也流入出了许多的框架。最近在看关于移动端的响应式布局，其中涉及到比较多的就是大小属性的设置：px、vw、vh、%、em、rem等等，今天自己就捋一捋rem的用法。</p>
<h2 id="articleHeader0">说在前面</h2>
<p>一想到写移动端的页面，就要考虑自己写的页面能够适应各种不同的移动设备，起初想想要做到感觉好难啊，最初想到的就是用第三方的框架，用别人写的东西应该会很方便。然而万一不能用该怎么办啊，所以还是要学会自己写原生的页面布局，也就会有今天的这篇文章了。先看看自己用普通百分比、像素来写的页面和后来改用rem写的页面的对比：</p>
<h2 id="articleHeader1">普通百分百布局与rem布局的比较</h2>
<ul><li><p>小分辨率（375*667）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYoZx?w=302&amp;h=641" src="https://static.alili.tech/img/bVYoZx?w=302&amp;h=641" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYo0a?w=332&amp;h=660" src="https://static.alili.tech/img/bVYo0a?w=332&amp;h=660" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>小分辨率（414*736）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYo1s?w=329&amp;h=666" src="https://static.alili.tech/img/bVYo1s?w=329&amp;h=666" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYo1w?w=343&amp;h=664" src="https://static.alili.tech/img/bVYo1w?w=343&amp;h=664" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面是两种小的分辨率，最后得到的效果不会很差，感觉差不多，现在还成大一点的分辨率，效果就不一样了：</p>
<ul><li><p>大分辨率</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYo3l?w=398&amp;h=645" src="https://static.alili.tech/img/bVYo3l?w=398&amp;h=645" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVYo3y?w=454&amp;h=645" src="https://static.alili.tech/img/bVYo3y?w=454&amp;h=645" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>简单的对比下就看出了效果。当不用别人的框架，该怎么去写。最容易想到的就是用百分比来写，这种写法对设备的宽度有用，宽度是固定的，对高度不起什么作用，大部分人的做法就是宽度用百分来设置，高度用px来设置，但这种的做法体验并不是很好，用分辨率小的设备感觉不是很差，一旦换成了分辨率比较大的设备效果就差很多了，大部分的标签元素都会被拉伸。高度固定，换成了大的分辨率各种元素效果还是原来的，各种元素固定了大小，体验并不是很好。</p>
<h2 id="articleHeader2">rem的使用</h2>
<p>rem是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位，通过根元素进行适配的。</p>
<ul><li><p>普通使用</p></li></ul>
<p>大部分是通过设置html的字体大小就可以控制rem的大小，例如：html的字体大小为20px，那么就说20px为1rem，接下来的所有元素的大小都基于这个比例来换算。这种的算法是存在问题的，当我们计算页面的宽度rem值得时候都是使用某一款移动设备的分辨率来计算的，下面的例子我用的是iphone6的分辨率375*667，它的宽度为375px，20px为1rem，那么375px就是18.75rem。看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width&quot;>
        <!--<script type=&quot;text/javascript&quot; src=&quot;js/rem.js&quot; ></script>-->
        <title></title>
        <style>
            html{
                font-size:20px;
            }
            *{
                border: 0;
                padding: 0;
                margin: 0;
            }
            #box1{
                width: 18.75rem;
                height: 7.5rem;
                float: left;
                background-color: red;
            
            }
            #box2{
                width: 18.75rem;
                height: 7.5rem;
                float: left;
                background-color: #00FFFF;
                font-size: 0.6rem;
            }
            #box3{
                width: 18.75rem;
                height: 17rem;
                float: left;
                background-color: #B22222;
            }
            #box4{
                width: 18.75rem;
                height: 20rem;
                float: left;
                background-color: #BFBFBF;
            }
            #box5{
                width: 18.75rem;
                height: 22rem;
                float: left;
                background-color: cadetblue;
            }
            #input1{
                width: 80%;
                height: 2rem;
                float: left;
                border-radius: 2rem;
                margin-left: 1.5rem;
                margin-top: 0.6rem;
            }
        </style>
    </head>
    <body>
        <div id=&quot;box1&quot;>
            <input type=&quot;text&quot; id=&quot;input1&quot; />
        </div>
        <div id=&quot;box2&quot;>手手手手手手手手手手手手手手手手手手手手手手手</div>
        <div id=&quot;box3&quot;>段段段段段段段段段段段段段段段段段段段段段段段</div>
        <div id=&quot;box4&quot;>方方方方方方方方方方方方方方方方方方方方方方方方</div>
        <div id=&quot;box5&quot;>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦</div>
    </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&lt;script type="text/javascript" src="js/rem.js" &gt;&lt;/script&gt;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">html</span>{
                <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
            }
            *{
                <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            }
            <span class="hljs-selector-id">#box1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">18.75rem</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: red;
            
            }
            <span class="hljs-selector-id">#box2</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">18.75rem</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00FFFF</span>;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.6rem</span>;
            }
            <span class="hljs-selector-id">#box3</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">18.75rem</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">17rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#B22222</span>;
            }
            <span class="hljs-selector-id">#box4</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">18.75rem</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">20rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BFBFBF</span>;
            }
            <span class="hljs-selector-id">#box5</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">18.75rem</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">22rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: cadetblue;
            }
            <span class="hljs-selector-id">#input1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">1.5rem</span>;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.6rem</span>;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box1"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input1"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box2"</span>&gt;</span>手手手手手手手手手手手手手手手手手手手手手手手<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box3"</span>&gt;</span>段段段段段段段段段段段段段段段段段段段段段段段<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box4"</span>&gt;</span>方方方方方方方方方方方方方方方方方方方方方方方方<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box5"</span>&gt;</span>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>上面的代码在375<em>667的分辨率下刚好能够占满宽度，当你切换到其他的分辨率（如414</em>736）时问题就来了，看图：<br><span class="img-wrap"><img data-src="/img/bVYpvs?w=305&amp;h=646" src="https://static.alili.tech/img/bVYpvs?w=305&amp;h=646" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYpvx?w=350&amp;h=665" src="https://static.alili.tech/img/bVYpvx?w=350&amp;h=665" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个问题的原因很简单，这种写法即使用的是rem也起不来作用，宽度和高度都是固定的，width为18.75rem就是375px，切换成其它分辨率（如414*736），它的宽度还是375px，空白处还是显示出来了，很多人会认为可以把宽度设置成百分比的形式，或者用媒介查询@media,或是viewport设置中的那个deviceWidth（&lt;meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"&gt;）的方式来解决问题，当然这些方式均能解决宽度的问题，然而高度的问题又该怎么办呢？看下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width&quot;>
        <script type=&quot;text/javascript&quot; src=&quot;js/jquery-3.1.1.min.js&quot; ></script>
        <script type=&quot;text/javascript&quot; src=&quot;js/jquery-1.8.3.min.js&quot; ></script>
        <!--<script type=&quot;text/javascript&quot; src=&quot;js/rem.js&quot; ></script>-->
        <title></title>
        <style>
            html{
                font-size:20px;
            }
            *{
                border: 0;
                padding: 0;
                margin: 0;
            }
            #box1{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: red;
            
            }
            #box2{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: #00FFFF;
                font-size: 0.6rem;
            }
            #box3{
                width: 100%;
                height: 17rem;
                float: left;
                background-color: #B22222;
            }
            #box4{
                width: 100%;
                height: 20rem;
                float: left;
                background-color: #BFBFBF;
            }
            #box5{
                width: 100%;
                height: 22rem;
                float: left;
                background-color: cadetblue;
            }
            #input1{
                width: 80%;
                height: 2rem;
                float: left;
                border-radius: 2rem;
                margin-left: 1.5rem;
                margin-top: 0.6rem;
            }
        </style>
    </head>
    <body>
        <div id=&quot;box1&quot;>
            <input type=&quot;text&quot; id=&quot;input1&quot; />
        </div>
        <div id=&quot;box2&quot;>手手手手手手手手手手手手手手手手手手手手手手手</div>
        <div id=&quot;box3&quot;>段段段段段段段段段段段段段段段段段段段段段段段</div>
        <div id=&quot;box4&quot;>方方方方方方方方方方方方方方方方方方方方方方方方</div>
        <div id=&quot;box5&quot;>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦</div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-3.1.1.min.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.8.3.min.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&lt;script type="text/javascript" src="js/rem.js" &gt;&lt;/script&gt;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">html</span>{
                <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
            }
            *{
                <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            }
            <span class="hljs-selector-id">#box1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: red;
            
            }
            <span class="hljs-selector-id">#box2</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00FFFF</span>;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.6rem</span>;
            }
            <span class="hljs-selector-id">#box3</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">17rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#B22222</span>;
            }
            <span class="hljs-selector-id">#box4</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">20rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BFBFBF</span>;
            }
            <span class="hljs-selector-id">#box5</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">22rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: cadetblue;
            }
            <span class="hljs-selector-id">#input1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">1.5rem</span>;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.6rem</span>;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box1"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input1"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box2"</span>&gt;</span>手手手手手手手手手手手手手手手手手手手手手手手<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box3"</span>&gt;</span>段段段段段段段段段段段段段段段段段段段段段段段<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box4"</span>&gt;</span>方方方方方方方方方方方方方方方方方方方方方方方方<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box5"</span>&gt;</span>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>看效果：<br><span class="img-wrap"><img data-src="/img/bVYpzq?w=626&amp;h=471" src="https://static.alili.tech/img/bVYpzq?w=626&amp;h=471" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYpzB?w=918&amp;h=399" src="https://static.alili.tech/img/bVYpzB?w=918&amp;h=399" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>看图就知道了，宽度可以适应不同的移动设备，然而高度一直都没有发生变化，一直都是150px，页面效果并不好看，分辨率大了，页面被拉伸，高度显得变小了。</p>
<ul><li><p>正确使用</p></li></ul>
<p>动态计算html的font-size，核心是切换不同移动设备通过js获取设备宽度，然后按比例计算html的font-size的值，动态变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = document.documentElement;//获取html元素
var cw = d.clientWidth || 750;
d.style.fontSize = (20 * (cw / 375)) > 40 ? 40 + 'px' : (20 * (cw / 375)) + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> d = <span class="hljs-built_in">document</span>.documentElement;<span class="hljs-comment">//获取html元素</span>
<span class="hljs-keyword">var</span> cw = d.clientWidth || <span class="hljs-number">750</span>;
d.style.fontSize = (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) &gt; <span class="hljs-number">40</span> ? <span class="hljs-number">40</span> + <span class="hljs-string">'px'</span> : (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) + <span class="hljs-string">'px'</span>;</code></pre>
<p>上述代码解释：</p>
<ol>
<li><p>设计稿横向分辨率为375（iphone6），计划20px为1rem；</p></li>
<li><p>布局的时候，各元素的css尺寸= 20 * （设备宽度/设计稿竖向分辨率）。</p></li>
</ol>
<p>完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function() {//判断是屏幕旋转还是resize
                function c() {
                    var d = document.documentElement;//获取html元素
                    var cw = d.clientWidth || 750;
                    d.style.fontSize = (20 * (cw / 375)) > 40 ? 40 + 'px' : (20 * (cw / 375)) + 'px';
                }
                c();
                return c;
            })(), false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener((<span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>), (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-comment">//判断是屏幕旋转还是resize</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> d = <span class="hljs-built_in">document</span>.documentElement;<span class="hljs-comment">//获取html元素</span>
                    <span class="hljs-keyword">var</span> cw = d.clientWidth || <span class="hljs-number">750</span>;
                    d.style.fontSize = (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) &gt; <span class="hljs-number">40</span> ? <span class="hljs-number">40</span> + <span class="hljs-string">'px'</span> : (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) + <span class="hljs-string">'px'</span>;
                }
                c();
                <span class="hljs-keyword">return</span> c;
            })(), <span class="hljs-literal">false</span>);</code></pre>
<p>上面的做法就可以动态的设置各种标签元素的宽和高，按比例的调试适应不同的移动设备。例如下：<br>上面的代码中是以iphone6为设计稿的，box1的height为7.5rem(150px)，如果切换成iphone6 plus的大小，box1的height=(414/375)<em>7.5=8.28rem,也就是8.28</em>20=165.6px，与iphone6时的高度是不一样的，写页面时会更加的美观。看效果：<br><span class="img-wrap"><img data-src="/img/bVYpFy?w=608&amp;h=418" src="https://static.alili.tech/img/bVYpFy?w=608&amp;h=418" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYpFB?w=599&amp;h=369" src="https://static.alili.tech/img/bVYpFB?w=599&amp;h=369" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看上面显示的效果就可以看出来，和计算出的结果是一样的，方法正确。以后可以用了。看看整体效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVYpFL?w=340&amp;h=667" src="https://static.alili.tech/img/bVYpFL?w=340&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYpFO?w=822&amp;h=565" src="https://static.alili.tech/img/bVYpFO?w=822&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>页面元素完全没有被拉伸的效果，按照一定的比例缩放，保持页面效果美观。</p>
<h2 id="articleHeader3">源码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width&quot;>
        <script type=&quot;text/javascript&quot; src=&quot;js/jquery-3.1.1.min.js&quot; ></script>
        <script type=&quot;text/javascript&quot; src=&quot;js/jquery-1.8.3.min.js&quot; ></script>
        <script type=&quot;text/javascript&quot; src=&quot;js/rem.js&quot; ></script>
        <title></title>
        <style>
            html{
                font-size:20px;
            }
            *{
                border: 0;
                padding: 0;
                margin: 0;
            }
            #box1{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: red;
            
            }
            #box2{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: #00FFFF;
                font-size: 0.6rem;
            }
            #box3{
                width: 100%;
                height: 17rem;
                float: left;
                background-color: #B22222;
            }
            #box4{
                width: 100%;
                height: 20rem;
                float: left;
                background-color: #BFBFBF;
            }
            #box5{
                width: 100%;
                height: 22rem;
                float: left;
                background-color: cadetblue;
            }
            #input1{
                width: 80%;
                height: 2rem;
                float: left;
                border-radius: 2rem;
                margin-left: 1.5rem;
                margin-top: 0.6rem;
            }
        </style>
        <script>
            window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function() {//判断是屏幕旋转还是resize
                function c() {
                    var d = document.documentElement;//获取html元素
                    var cw = d.clientWidth || 750;
                    d.style.fontSize = (20 * (cw / 375)) > 40 ? 40 + 'px' : (20 * (cw / 375)) + 'px';
                }
                c();
                return c;
            })(), false);
        </script>
    </head>
    <body>
        <div id=&quot;box1&quot;>
            <input type=&quot;text&quot; id=&quot;input1&quot; />
        </div>
        <div id=&quot;box2&quot;>手手手手手手手手手手手手手手手手手手手手手手手</div>
        <div id=&quot;box3&quot;>段段段段段段段段段段段段段段段段段段段段段段段</div>
        <div id=&quot;box4&quot;>方方方方方方方方方方方方方方方方方方方方方方方方</div>
        <div id=&quot;box5&quot;>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦</div>
    </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-3.1.1.min.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.8.3.min.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/rem.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">html</span>{
                <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
            }
            *{
                <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            }
            <span class="hljs-selector-id">#box1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: red;
            
            }
            <span class="hljs-selector-id">#box2</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">7.5rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00FFFF</span>;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.6rem</span>;
            }
            <span class="hljs-selector-id">#box3</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">17rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#B22222</span>;
            }
            <span class="hljs-selector-id">#box4</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">20rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BFBFBF</span>;
            }
            <span class="hljs-selector-id">#box5</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">22rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">background-color</span>: cadetblue;
            }
            <span class="hljs-selector-id">#input1</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2rem</span>;
                <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">1.5rem</span>;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.6rem</span>;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-built_in">window</span>.addEventListener((<span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>), (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-comment">//判断是屏幕旋转还是resize</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> d = <span class="hljs-built_in">document</span>.documentElement;<span class="hljs-comment">//获取html元素</span>
                    <span class="hljs-keyword">var</span> cw = d.clientWidth || <span class="hljs-number">750</span>;
                    d.style.fontSize = (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) &gt; <span class="hljs-number">40</span> ? <span class="hljs-number">40</span> + <span class="hljs-string">'px'</span> : (<span class="hljs-number">20</span> * (cw / <span class="hljs-number">375</span>)) + <span class="hljs-string">'px'</span>;
                }
                c();
                <span class="hljs-keyword">return</span> c;
            })(), <span class="hljs-literal">false</span>);
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box1"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input1"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box2"</span>&gt;</span>手手手手手手手手手手手手手手手手手手手手手手手<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box3"</span>&gt;</span>段段段段段段段段段段段段段段段段段段段段段段段<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box4"</span>&gt;</span>方方方方方方方方方方方方方方方方方方方方方方方方<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box5"</span>&gt;</span>哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h2 id="articleHeader4">写在最后</h2>
<ul>
<li><p>终于写完了这篇文章，感觉写文章的过程就是再学习的过程，可以多做做；</p></li>
<li><p>最近在学习写写网易云的播放页面，一做页面就要考虑布局的事情，就思考了这方面的问题，记录下来。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端rem布局的学习（基于自己写的一个网易云播放页面的思考）

## 原文链接
[https://segmentfault.com/a/1190000011976048](https://segmentfault.com/a/1190000011976048)

