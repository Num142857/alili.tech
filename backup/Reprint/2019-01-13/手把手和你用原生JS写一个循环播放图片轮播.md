---
title: '手把手和你用原生JS写一个循环播放图片轮播' 
date: 2019-01-13 2:30:11
hidden: true
slug: 51k4yv5r5l4
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间学习了淘宝首页的静态页面，其中收获较大的的就是这个<strong>循环</strong>播放的图片轮播组件，本文就将相关制作经验分享给大家。</p>
<p>先看看在线DEMO：<a href="http://juniortour.net/demo/standard-js-carousel/standard-js-carousel.html" rel="nofollow noreferrer" target="_blank">原生JS循环播放图片轮播组件</a>&nbsp;（支持IE8+，<strong>本文中的在线demo均未经过压缩，可以直接在浏览器中调试</strong>）</p>
<p>以及GitHub仓库地址及完整代码：<a href="https://github.com/JuniorTour/simple-standard-js-carousel" rel="nofollow noreferrer" target="_blank">JuniorTour/simple-standard-js-carousel</a></p>
<h3 id="articleHeader0">一、思路讲解:</h3>
<h4>1.先说基本的非循环无过渡图片轮播：</h4>
<p>这个思路还是很简单的，通过观察一些图片轮播就可以发现，图片轮播一般是以一个尺寸较小的父元素作为窗口，包裹住一组较长的长条状的项目（item）子元素，再利用<code>&nbsp;overflow: hidden; </code>，将父元素作为“窗口”，只显示出的项目子元素的一部分，并通过改变项目子元素的定位或translate3d属性，实现多张图片项目动态播放。</p>
<p><strong>基本原理可以参考这个demo：<a href="http://juniortour.net/demo/standard-js-carousel/basic-theory-demonstration.html" rel="nofollow noreferrer" target="_blank">图片轮播基本原理演示</a></strong></p>
<h4>2.比较有意思的其实是<strong>循环</strong>的功能：</h4>
<p>但是这样简单的轮播是不会循环播放的，也就是说当一轮图片项目（item）播放到结尾；或者当在第一张图（第一个项目）继续向前时，就会超出内容子元素，出现空白部分，这一般不是我们想要的结果。</p>
<p>有多种思路可以实现循环播放，我观察到淘宝网首页的图片轮播是这样的思路：</p>
<blockquote><p>复制开头和结尾的项目，并分别放在开头和结尾，当播放到开头或结尾的项目，继续播放，需要循环时，临时取消transition属性，并立即用定位跳转至相应的真正的开头或结尾之后，再恢复原来的transition，继续正常滚动播放，从而利用视觉上的“欺骗”，实现带有过渡效果的循环播放。</p></blockquote>
<p><strong>相应的原理可以参考这个demo：<a href="http://juniortour.net/demo/standard-js-carousel/loop-theory-demonstration.html" rel="nofollow noreferrer" target="_blank">图片轮播循环原理演示</a></strong></p>
<h3 id="articleHeader1">二、HTML标记部分</h3>
<p>核心理念是简洁、语义化。这部分因为我学过bootstrap框架所以借鉴了<a href="http://v3.bootcss.com/javascript/#carousel" rel="nofollow noreferrer" target="_blank">bootstrap的HTML标记结构</a>。</p>
<p>整体结构为：</p>
<p>外层的<code>.carousel-wrapper</code>包裹着轮播的三个主要部分，分别是：</p>
<p><code>.carousel-item-wrapper</code>：项目内容部分（作为演示，本文中的demo使用a标签代替了图片，大家可以自行尝试替换为图片；同时添加了文字序号标记，以便于观察理解，<strong>尤其要注意两个复制的开头和结尾项目copy-1和copy-5）</strong>。</p>
<p><code>.carousel-control-wrapper</code>：控制按钮部分，即两个用于控制左右移动的按钮。</p>
<p><code>.carousel-index-wrapper</code>：索引按钮部分，即图片轮播中的那一排“小圆点”。为了便于用JS操控，我添加了id作为“钩子”。而bootstrap在这里用的是自定义的data属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;carousel-wrapper&quot;>
    <div class=&quot;carousel-item-wrapper&quot; style=&quot;left: -520px;&quot;>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--作为演示，用a标签代替了图片。-->
                <!--<img src=&quot;img/carousel-img-5&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                copy-5
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-1&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                1
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-2&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                2
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-3&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                3
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-4&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                4
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-5&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                5
            </div>
        </div>
        <div class=&quot;carousel-item&quot;>
            <a href=&quot;#&quot;>
                <!--<img src=&quot;img/carousel-img-1&quot; alt=&quot;&quot;>-->
            </a>
            <div class=&quot;carousel-index-mark&quot;>
                copy-1
            </div>
        </div>
    </div>
    <div class=&quot;carousel-control-wrapper&quot;>
        <button id=&quot;prev&quot;>
            <!--prev-->
            <i>&amp;lt;</i>
        </button>
        <button id=&quot;next&quot;>
            <!--next-->
            <i>&amp;gt;</i>
        </button>
    </div>
    <div class=&quot;carousel-index-wrapper&quot;>
        <ul>
            <li class=&quot;carousel-index-btn active-carousel-index-btn&quot; id=&quot;carousel-to-1&quot;>carousel-index-1</li>
            <li class=&quot;carousel-index-btn&quot; id=&quot;carousel-to-2&quot;>carousel-index-2</li>
            <li class=&quot;carousel-index-btn&quot; id=&quot;carousel-to-3&quot;>carousel-index-3</li>
            <li class=&quot;carousel-index-btn&quot; id=&quot;carousel-to-4&quot;>carousel-index-4</li>
            <li class=&quot;carousel-index-btn&quot; id=&quot;carousel-to-5&quot;>carousel-index-5</li>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item-wrapper"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"left: -520px;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--作为演示，用a标签代替了图片。--&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-5" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                copy-5
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-1" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                1
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-2" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                2
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-3" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                3
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-4" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                4
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-5" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                5
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--&lt;img src="img/carousel-img-1" alt=""&gt;--&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-mark"</span>&gt;</span>
                copy-1
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-control-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"prev"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--prev--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"next"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--next--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-btn active-carousel-index-btn"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"carousel-to-1"</span>&gt;</span>carousel-index-1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-btn"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"carousel-to-2"</span>&gt;</span>carousel-index-2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-btn"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"carousel-to-3"</span>&gt;</span>carousel-index-3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-btn"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"carousel-to-4"</span>&gt;</span>carousel-index-4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carousel-index-btn"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"carousel-to-5"</span>&gt;</span>carousel-index-5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader2">三、CSS样式部分</h3>
<p>总的来说比较简单，重要的地方我加上了注释，有存疑的地方，欢迎和我交流。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /*reset*/
    * {
        border: none;
        padding: 0;
        margin: 0;
    }
    button {
        outline: none;
    }
    li {
        list-style: none;
    }

    .carousel-wrapper {
        width:520px;
        height:280px;
        overflow: hidden;   /*关键*/
        position: relative;
        margin: 100px auto;
    }
    .carousel-item-wrapper {
        width:3640px;
        height:280px;
        position: absolute;
        top: 0;
        left: -520px;
        transition: left .2s ease-in;
    }
    .carousel-item a {
        display: block;
        background-color: red;
        width:520px;
        height: 280px;
    }

    /*使用不同背景色的a替代图片。*/
    .carousel-item:nth-child(1) a {
        background-color: rgb(129,194,214);
        /*第五张图片的复制*/
    }
    .carousel-item:nth-child(2) a {
        background-color: rgb(129,146,214);
    }
    .carousel-item:nth-child(3) a {
        background-color: rgb(217,179,230);
    }
    .carousel-item:nth-child(4) a {
        background-color: rgb(220,247,161);
    }
    .carousel-item:nth-child(5) a {
        background-color: rgb(131,252,216);
    }
    .carousel-item:nth-child(6) a {
        background-color: rgb(129,194,214);
    }
    .carousel-item:nth-child(7) a {
        background-color: rgb(129,146,214);
        /*第一张图片的复制*/
    }

    .carousel-item {
        float: left;
    }
    .carousel-index-mark {
        font-size:60px;
        color: black;
        position: absolute;
        top: 0;
    }
    .carousel-control-wrapper {
        transition: all .2s;
    }
    .carousel-wrapper:hover button {
        display: block;
    }
    .carousel-control-wrapper button {
        transition: all .2s linear;
        display: none;
        width:24px;
        height:36px;
        line-height:36px;
        background-color: rgba(0,0,0,.3);
        color: #fff;
        position: absolute;
        top: 50%;
        cursor: pointer;
    }
    button#prev {
        left:0;
    }
    button#next {
        right:0;
    }
    button i {
        font-size: 18px;
    }
    .carousel-index-wrapper {
        width:65px;
        height:13px;
        overflow: hidden;
        position: absolute;
        bottom:15px;
        left:50%;
        margin-left: -33px;
    }
    .carousel-index-btn {
        width:9px;
        height:9px;
        float: left;
        margin:2px;
        background-color: #b7b7b7;
        border-radius: 50%;
        text-indent: -999em;
        /*这个-999em的文字对齐声明有助于增强可访问性。*/
        cursor: pointer;
    }
    .active-carousel-index-btn {
        background-color: #f44103;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">    <span class="hljs-comment">/*reset*/</span>
    * {
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">outline</span>: none;
    }
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">list-style</span>: none;
    }

    <span class="hljs-selector-class">.carousel-wrapper</span> {
        <span class="hljs-attribute">width</span>:<span class="hljs-number">520px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">280px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;   <span class="hljs-comment">/*关键*/</span>
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    }
    <span class="hljs-selector-class">.carousel-item-wrapper</span> {
        <span class="hljs-attribute">width</span>:<span class="hljs-number">3640px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">280px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">520px</span>;
        <span class="hljs-attribute">transition</span>: left .<span class="hljs-number">2s</span> ease-in;
    }
    <span class="hljs-selector-class">.carousel-item</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">background-color</span>: red;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">520px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">280px</span>;
    }

    <span class="hljs-comment">/*使用不同背景色的a替代图片。*/</span>
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(1)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(129,194,214);
        <span class="hljs-comment">/*第五张图片的复制*/</span>
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(129,146,214);
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(3)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(217,179,230);
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(4)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(220,247,161);
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(5)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(131,252,216);
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(6)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(129,194,214);
    }
    <span class="hljs-selector-class">.carousel-item</span><span class="hljs-selector-pseudo">:nth-child(7)</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(129,146,214);
        <span class="hljs-comment">/*第一张图片的复制*/</span>
    }

    <span class="hljs-selector-class">.carousel-item</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-class">.carousel-index-mark</span> {
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">60px</span>;
        <span class="hljs-attribute">color</span>: black;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.carousel-control-wrapper</span> {
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">2s</span>;
    }
    <span class="hljs-selector-class">.carousel-wrapper</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    <span class="hljs-selector-class">.carousel-control-wrapper</span> <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">2s</span> linear;
        <span class="hljs-attribute">display</span>: none;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">24px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">36px</span>;
        <span class="hljs-attribute">line-height</span>:<span class="hljs-number">36px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.3);
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-id">#prev</span> {
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-id">#next</span> {
        <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">button</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
    }
    <span class="hljs-selector-class">.carousel-index-wrapper</span> {
        <span class="hljs-attribute">width</span>:<span class="hljs-number">65px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">13px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">15px</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">33px</span>;
    }
    <span class="hljs-selector-class">.carousel-index-btn</span> {
        <span class="hljs-attribute">width</span>:<span class="hljs-number">9px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">9px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">2px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#b7b7b7</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">999em</span>;
        <span class="hljs-comment">/*这个-999em的文字对齐声明有助于增强可访问性。*/</span>
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-class">.active-carousel-index-btn</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f44103</span>;
    }</code></pre>
<h3 id="articleHeader3">四、JS部分</h3>
<p>这一块是主要部分，内容较多，因此我们逐步来实现各部分功能以便于理解。</p>
<h4>0.功能和结构分析：</h4>
<p>根据最开始的思路讲解，我们把这个轮播的JavaScript功能大致分为以下4个部分：<br>1.左右滑动按钮功能<br>2.索引按钮跳转功能<br>3.自动播放功能<br>4.循环播放功能。</p>
<p>我们来分别逐步实现。</p>
<h4>1.实现左右滑动按钮功能：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addLoadEvent(func) {
    var oldLoad = window.onload;
    if (typeof oldLoad != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldLoad();
            func();
        }
    }
}
//给文档加载完成后的load事件绑定相应的处理函数：
addLoadEvent(preventDefaultAnchors);
addLoadEvent(carouselControl);

/*用一个对象把轮播组件的相关参数封装起来，优点是灵活便于扩展升级；缺点是同时也增加了文件的体积。*/
var carouselInfo = {
    itemWidth: 520,
    trueItemNum: 5,
    itemNum: 7,
    totalWidth: 7 * 520
};

//阻止a标签默认的点击跳转行为
function preventDefaultAnchors() {
    var allAnchors = document.querySelectorAll('a');

    for (var i = 0; i < allAnchors.length; i++) {
        allAnchors[i].addEventListener('click', function (e) {
            e.preventDefault();
        }, false);
    }
}

function carouselControl () {
    var prev = document.querySelector(&quot;#prev&quot;);
    var next = document.querySelector(&quot;#next&quot;);
    var carouselWrapper = document.querySelector(&quot;.carousel-wrapper&quot;);

    prev.onclick = function () {
        slide(-1);
    };
    next.onclick = function () {
        slide(1);
    };
}

function slide(slideItemNum) {
    var itemWrapper=document.querySelector(&quot;.carousel-item-wrapper&quot;);
    var currentLeftOffset=(itemWrapper.style.left)?parseInt(itemWrapper.style.left): 0,
        targetLeftOffset=currentLeftOffset-(slideItemNum*carouselInfo.itemWidth);

    itemWrapper.style.left=targetLeftOffset+'px';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addLoadEvent</span>(<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">var</span> oldLoad = <span class="hljs-built_in">window</span>.onload;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> oldLoad != <span class="hljs-string">'function'</span>) {
        <span class="hljs-built_in">window</span>.onload = func;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            oldLoad();
            func();
        }
    }
}
<span class="hljs-comment">//给文档加载完成后的load事件绑定相应的处理函数：</span>
addLoadEvent(preventDefaultAnchors);
addLoadEvent(carouselControl);

<span class="hljs-comment">/*用一个对象把轮播组件的相关参数封装起来，优点是灵活便于扩展升级；缺点是同时也增加了文件的体积。*/</span>
<span class="hljs-keyword">var</span> carouselInfo = {
    <span class="hljs-attr">itemWidth</span>: <span class="hljs-number">520</span>,
    <span class="hljs-attr">trueItemNum</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">itemNum</span>: <span class="hljs-number">7</span>,
    <span class="hljs-attr">totalWidth</span>: <span class="hljs-number">7</span> * <span class="hljs-number">520</span>
};

<span class="hljs-comment">//阻止a标签默认的点击跳转行为</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">preventDefaultAnchors</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> allAnchors = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'a'</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; allAnchors.length; i++) {
        allAnchors[i].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            e.preventDefault();
        }, <span class="hljs-literal">false</span>);
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carouselControl</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> prev = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#prev"</span>);
    <span class="hljs-keyword">var</span> next = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#next"</span>);
    <span class="hljs-keyword">var</span> carouselWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-wrapper"</span>);

    prev.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        slide(<span class="hljs-number">-1</span>);
    };
    next.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        slide(<span class="hljs-number">1</span>);
    };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slide</span>(<span class="hljs-params">slideItemNum</span>) </span>{
    <span class="hljs-keyword">var</span> itemWrapper=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-item-wrapper"</span>);
    <span class="hljs-keyword">var</span> currentLeftOffset=(itemWrapper.style.left)?<span class="hljs-built_in">parseInt</span>(itemWrapper.style.left): <span class="hljs-number">0</span>,
        targetLeftOffset=currentLeftOffset-(slideItemNum*carouselInfo.itemWidth);

    itemWrapper.style.left=targetLeftOffset+<span class="hljs-string">'px'</span>;
}</code></pre>
<p><strong>第1步的demo：<a href="http://juniortour.net/demo/standard-js-carousel/carousel-step-1.html" rel="nofollow noreferrer" target="_blank">carousel-step-1</a></strong></p>
<h4>2.实现索引按钮跳转功能：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function carouselControl() {
    var prev = document.querySelector(&quot;#prev&quot;);
    var next = document.querySelector(&quot;#next&quot;);
    var carouselWrapper = document.querySelector(&quot;.carousel-wrapper&quot;);
    //添加索引按钮的引用
    var indexBtns = document.querySelectorAll(&quot;.carousel-index-btn&quot;);

    //标记当前所在的图片编号，用于配合控制.index-btn。
    var currentItemNum = 1;
    prev.onclick = function () {
        //把滑动功能和切换索引按钮功能装入一个函数之中，以便于获取当前索引：
        currentItemNum=prevItem(currentItemNum);
    };
    next.onclick = function () {
        //把滑动功能和切换索引按钮功能装入一个函数之中，以便于获取当前索引：
        currentItemNum=nextItem(currentItemNum);
    };

    for (var i = 0; i < indexBtns.length; i++) {
        //利用立即调用函数，解决闭包的副作用，传入相应的index值
        (function (i) {
            indexBtns[i].onclick = function () {
                slideTo(i+1);
                currentItemNum=i+1;
            }
        })(i);
    }
}

function nextItem(currentItemNum) {
    slide(1);
    currentItemNum += 1;
    if (currentItemNum == 6) currentItemNum = 1;
    switchIndexBtn(currentItemNum);

    return currentItemNum;
}

function prevItem(currentItemNum) {
    slide(-1);
    currentItemNum -= 1;
    if (currentItemNum == 0) currentItemNum = 5;
    switchIndexBtn(currentItemNum);

    return currentItemNum;
}

//添加直接跳转函数：
function slideTo(targetNum) {
    var itemWrapper=document.querySelector(&quot;.carousel-item-wrapper&quot;);
    itemWrapper.style.left=-(targetNum*carouselInfo.itemWidth)+'px';
    switchIndexBtn(targetNum);
}

function slide(slideItemNum) {
    var itemWrapper = document.querySelector(&quot;.carousel-item-wrapper&quot;);
    var currentLeftOffset = (itemWrapper.style.left) ? parseInt(itemWrapper.style.left) : 0,
        targetLeftOffset = currentLeftOffset - (slideItemNum * carouselInfo.itemWidth);

    itemWrapper.style.left = targetLeftOffset + 'px';
}

function switchIndexBtn(targetNum) {
    //切换当前的索引按钮
    //删除过去激活的.active-carousel-index-btn
    var activeBtn=document.querySelector(&quot;.active-carousel-index-btn&quot;);
    activeBtn.className=activeBtn.className.replace(&quot; active-carousel-index-btn&quot;,&quot;&quot;);

    //添加新的激活索引按钮
    var targetBtn=document.querySelectorAll(&quot;.carousel-index-btn&quot;)[targetNum-1];
    targetBtn.className+=&quot; active-carousel-index-btn&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carouselControl</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> prev = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#prev"</span>);
    <span class="hljs-keyword">var</span> next = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#next"</span>);
    <span class="hljs-keyword">var</span> carouselWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-wrapper"</span>);
    <span class="hljs-comment">//添加索引按钮的引用</span>
    <span class="hljs-keyword">var</span> indexBtns = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">".carousel-index-btn"</span>);

    <span class="hljs-comment">//标记当前所在的图片编号，用于配合控制.index-btn。</span>
    <span class="hljs-keyword">var</span> currentItemNum = <span class="hljs-number">1</span>;
    prev.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//把滑动功能和切换索引按钮功能装入一个函数之中，以便于获取当前索引：</span>
        currentItemNum=prevItem(currentItemNum);
    };
    next.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//把滑动功能和切换索引按钮功能装入一个函数之中，以便于获取当前索引：</span>
        currentItemNum=nextItem(currentItemNum);
    };

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; indexBtns.length; i++) {
        <span class="hljs-comment">//利用立即调用函数，解决闭包的副作用，传入相应的index值</span>
        (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
            indexBtns[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                slideTo(i+<span class="hljs-number">1</span>);
                currentItemNum=i+<span class="hljs-number">1</span>;
            }
        })(i);
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextItem</span>(<span class="hljs-params">currentItemNum</span>) </span>{
    slide(<span class="hljs-number">1</span>);
    currentItemNum += <span class="hljs-number">1</span>;
    <span class="hljs-keyword">if</span> (currentItemNum == <span class="hljs-number">6</span>) currentItemNum = <span class="hljs-number">1</span>;
    switchIndexBtn(currentItemNum);

    <span class="hljs-keyword">return</span> currentItemNum;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prevItem</span>(<span class="hljs-params">currentItemNum</span>) </span>{
    slide(<span class="hljs-number">-1</span>);
    currentItemNum -= <span class="hljs-number">1</span>;
    <span class="hljs-keyword">if</span> (currentItemNum == <span class="hljs-number">0</span>) currentItemNum = <span class="hljs-number">5</span>;
    switchIndexBtn(currentItemNum);

    <span class="hljs-keyword">return</span> currentItemNum;
}

<span class="hljs-comment">//添加直接跳转函数：</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideTo</span>(<span class="hljs-params">targetNum</span>) </span>{
    <span class="hljs-keyword">var</span> itemWrapper=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-item-wrapper"</span>);
    itemWrapper.style.left=-(targetNum*carouselInfo.itemWidth)+<span class="hljs-string">'px'</span>;
    switchIndexBtn(targetNum);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slide</span>(<span class="hljs-params">slideItemNum</span>) </span>{
    <span class="hljs-keyword">var</span> itemWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-item-wrapper"</span>);
    <span class="hljs-keyword">var</span> currentLeftOffset = (itemWrapper.style.left) ? <span class="hljs-built_in">parseInt</span>(itemWrapper.style.left) : <span class="hljs-number">0</span>,
        targetLeftOffset = currentLeftOffset - (slideItemNum * carouselInfo.itemWidth);

    itemWrapper.style.left = targetLeftOffset + <span class="hljs-string">'px'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">switchIndexBtn</span>(<span class="hljs-params">targetNum</span>) </span>{
    <span class="hljs-comment">//切换当前的索引按钮</span>
    <span class="hljs-comment">//删除过去激活的.active-carousel-index-btn</span>
    <span class="hljs-keyword">var</span> activeBtn=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".active-carousel-index-btn"</span>);
    activeBtn.className=activeBtn.className.replace(<span class="hljs-string">" active-carousel-index-btn"</span>,<span class="hljs-string">""</span>);

    <span class="hljs-comment">//添加新的激活索引按钮</span>
    <span class="hljs-keyword">var</span> targetBtn=<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">".carousel-index-btn"</span>)[targetNum<span class="hljs-number">-1</span>];
    targetBtn.className+=<span class="hljs-string">" active-carousel-index-btn"</span>;
}</code></pre>
<p><strong>第2步的demo：<a href="http://juniortour.net/demo/standard-js-carousel/carousel-step-2.html" rel="nofollow noreferrer" target="_blank">carousel-step-2</a></strong></p>
<h4>3.实现自动播放功能：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function carouselControl() {
    //省略前面重复的代码......

    for (var i = 0; i < indexBtns.length; i++) {
        //利用立即调用函数，解决闭包的副作用，传入相应的index值
        (function (i) {
            indexBtns[i].onclick = function () {
                slideTo(i+1);
                currentItemNum=i+1;
            }
        })(i);
    }

    //添加定时器
    var scrollTimer;
    function play() {
        scrollTimer=setInterval(function () {
            currentItemNum=nextItem(currentItemNum);
        },2000);
    }
    play();

    function stop() {
        clearInterval(scrollTimer);
    }

    //绑定事件
    carouselWrapper.addEventListener('mouseover',stop);
    carouselWrapper.addEventListener('mouseout',play,false);

    /*DOM二级的addEventListener相对于on+sth的优点是：
     * 1.addEventListener可以先后添加多个事件，同时这些事件还不会相互覆盖。
     * 2.addEventListener可以控制事件触发阶段，通过第三个可选的useCapture参数选择冒泡还是捕获。
     * 3.addEventListener对任何DOM元素都有效，而不仅仅是HTML元素。*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">carouselControl</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//省略前面重复的代码......</span>

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; indexBtns.length; i++) {
        <span class="hljs-comment">//利用立即调用函数，解决闭包的副作用，传入相应的index值</span>
        (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
            indexBtns[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                slideTo(i+<span class="hljs-number">1</span>);
                currentItemNum=i+<span class="hljs-number">1</span>;
            }
        })(i);
    }

    <span class="hljs-comment">//添加定时器</span>
    <span class="hljs-keyword">var</span> scrollTimer;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">play</span>(<span class="hljs-params"></span>) </span>{
        scrollTimer=setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            currentItemNum=nextItem(currentItemNum);
        },<span class="hljs-number">2000</span>);
    }
    play();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
        clearInterval(scrollTimer);
    }

    <span class="hljs-comment">//绑定事件</span>
    carouselWrapper.addEventListener(<span class="hljs-string">'mouseover'</span>,stop);
    carouselWrapper.addEventListener(<span class="hljs-string">'mouseout'</span>,play,<span class="hljs-literal">false</span>);

    <span class="hljs-comment">/*DOM二级的addEventListener相对于on+sth的优点是：
     * 1.addEventListener可以先后添加多个事件，同时这些事件还不会相互覆盖。
     * 2.addEventListener可以控制事件触发阶段，通过第三个可选的useCapture参数选择冒泡还是捕获。
     * 3.addEventListener对任何DOM元素都有效，而不仅仅是HTML元素。*/</span>
}</code></pre>
<p><strong>第3步的demo：<a href="http://juniortour.net/demo/standard-js-carousel/carousel-step-3.html" rel="nofollow noreferrer" target="_blank">carousel-step-3</a></strong></p>
<h4>4.关键点：实现循环播放功能：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function slide(slideItemNum) {
    var itemWrapper = document.querySelector(&quot;.carousel-item-wrapper&quot;);
    var currentLeftOffset = (itemWrapper.style.left) ? parseInt(itemWrapper.style.left) : 0,
        targetLeftOffset = currentLeftOffset - (slideItemNum * carouselInfo.itemWidth);

    /*不在这里跳转了。先处理偏移值，实现循环，再跳转。*/
    //itemWrapper.style.left = targetLeftOffset + 'px';

    switch (true) {
            /*switch 的语法是：当case之中的表达式等于switch (val)的val时，执行后面的statement（语句）。*/
        case (targetLeftOffset>0):
            itemWrapper.style.transition=&quot;none&quot;;
            itemWrapper.style.left=-carouselInfo.trueItemNum*carouselInfo.itemWidth+'px';
            /*此处即相当于：itemWrapper.style.left='-2600px';*/
            targetLeftOffset=-(carouselInfo.trueItemNum-1)*carouselInfo.itemWidth;
            //相当于：targetLeftOffset=-2080;
            break;
        case (targetLeftOffset<-(carouselInfo.totalWidth-carouselInfo.itemWidth)):
            //此处即相当于：targetLeftOffset<-3120
            itemWrapper.style.transition=&quot;none&quot;;
            itemWrapper.style.left=-carouselInfo.itemWidth+'px';
            //相当于：itemWrapper.style.left='-520px';
            targetLeftOffset=-carouselInfo.itemWidth*2;
            //相当于：targetLeftOffset=-1040;
            break;
    }

    /*这里我使用了setTimeout(fn,0)的hack
     * 参考bootstrap的carousel.js源码，似乎也利用了setTimeout(fn,0)这一hack。
     *
     * stackoverflow上有对这一hack的讨论和解释：
     * http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
     * 根据第二个回答，我个人的理解是：setTimeout(fn,0)相当于异步执行内部的代码fn，
     * 具体到这个轮播，就是在上一轮非过渡定位的页面渲染工作（switch语句内部的case）结束之后，再执行setTimeout内部的过渡位移工作。
     * 从而避免了，非过渡的定位还未结束，就恢复了过渡属性，使得这一次非过渡的定位也带有过渡效果。
     **/

    //各位可以试一试，把setTimeout内部的代码放在外部，“循环”时会有什么样的错误效果。
    //itemWrapper.style.transition=&quot;left .2s ease-in&quot;;
    //itemWrapper.style.left=targetLeftOffset+'px';

    setTimeout(function () {
        itemWrapper.style.transition=&quot;left .2s ease-in&quot;;
        itemWrapper.style.left=targetLeftOffset+'px';
    },20);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slide</span>(<span class="hljs-params">slideItemNum</span>) </span>{
    <span class="hljs-keyword">var</span> itemWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".carousel-item-wrapper"</span>);
    <span class="hljs-keyword">var</span> currentLeftOffset = (itemWrapper.style.left) ? <span class="hljs-built_in">parseInt</span>(itemWrapper.style.left) : <span class="hljs-number">0</span>,
        targetLeftOffset = currentLeftOffset - (slideItemNum * carouselInfo.itemWidth);

    <span class="hljs-comment">/*不在这里跳转了。先处理偏移值，实现循环，再跳转。*/</span>
    <span class="hljs-comment">//itemWrapper.style.left = targetLeftOffset + 'px';</span>

    <span class="hljs-keyword">switch</span> (<span class="hljs-literal">true</span>) {
            <span class="hljs-comment">/*switch 的语法是：当case之中的表达式等于switch (val)的val时，执行后面的statement（语句）。*/</span>
        <span class="hljs-keyword">case</span> (targetLeftOffset&gt;<span class="hljs-number">0</span>):
            itemWrapper.style.transition=<span class="hljs-string">"none"</span>;
            itemWrapper.style.left=-carouselInfo.trueItemNum*carouselInfo.itemWidth+<span class="hljs-string">'px'</span>;
            <span class="hljs-comment">/*此处即相当于：itemWrapper.style.left='-2600px';*/</span>
            targetLeftOffset=-(carouselInfo.trueItemNum<span class="hljs-number">-1</span>)*carouselInfo.itemWidth;
            <span class="hljs-comment">//相当于：targetLeftOffset=-2080;</span>
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> (targetLeftOffset&lt;-(carouselInfo.totalWidth-carouselInfo.itemWidth)):
            <span class="hljs-comment">//此处即相当于：targetLeftOffset&lt;-3120</span>
            itemWrapper.style.transition=<span class="hljs-string">"none"</span>;
            itemWrapper.style.left=-carouselInfo.itemWidth+<span class="hljs-string">'px'</span>;
            <span class="hljs-comment">//相当于：itemWrapper.style.left='-520px';</span>
            targetLeftOffset=-carouselInfo.itemWidth*<span class="hljs-number">2</span>;
            <span class="hljs-comment">//相当于：targetLeftOffset=-1040;</span>
            <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-comment">/*这里我使用了setTimeout(fn,0)的hack
     * 参考bootstrap的carousel.js源码，似乎也利用了setTimeout(fn,0)这一hack。
     *
     * stackoverflow上有对这一hack的讨论和解释：
     * http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
     * 根据第二个回答，我个人的理解是：setTimeout(fn,0)相当于异步执行内部的代码fn，
     * 具体到这个轮播，就是在上一轮非过渡定位的页面渲染工作（switch语句内部的case）结束之后，再执行setTimeout内部的过渡位移工作。
     * 从而避免了，非过渡的定位还未结束，就恢复了过渡属性，使得这一次非过渡的定位也带有过渡效果。
     **/</span>

    <span class="hljs-comment">//各位可以试一试，把setTimeout内部的代码放在外部，“循环”时会有什么样的错误效果。</span>
    <span class="hljs-comment">//itemWrapper.style.transition="left .2s ease-in";</span>
    <span class="hljs-comment">//itemWrapper.style.left=targetLeftOffset+'px';</span>

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        itemWrapper.style.transition=<span class="hljs-string">"left .2s ease-in"</span>;
        itemWrapper.style.left=targetLeftOffset+<span class="hljs-string">'px'</span>;
    },<span class="hljs-number">20</span>);
}</code></pre>
<p><strong>第4步的demo：<a href="http://juniortour.net/demo/standard-js-carousel/carousel-step-4.html" rel="nofollow noreferrer" target="_blank">carousel-step-4</a></strong></p>
<p>至此，就完成了一个完整的循环播放图片轮播，欣赏一下自己的杰作吧~~~ヾ(✿ﾟ▽ﾟ)ノ</p>
<h3 id="articleHeader4">五、源码及示例：</h3>
<h4>1.GitHub仓库地址及完整代码：<a href="https://github.com/JuniorTour/simple-standard-js-carousel" rel="nofollow noreferrer" target="_blank">JuniorTour/simple-standard-js-carousel</a>
</h4>
<h4>2.在线demo：<a href="http://juniortour.net/demo/standard-js-carousel/standard-js-carousel.html" rel="nofollow noreferrer" target="_blank">原生JS循环播放图片轮播组件</a>&nbsp;</h4>
<p>很惭愧，只做了一点简单的工作。如果觉得本文不错的话，欢迎给<a href="https://github.com/JuniorTour/simple-standard-js-carousel" rel="nofollow noreferrer" target="_blank">我的GitHub</a>点赞！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手和你用原生JS写一个循环播放图片轮播

## 原文链接
[https://segmentfault.com/a/1190000009706391](https://segmentfault.com/a/1190000009706391)

