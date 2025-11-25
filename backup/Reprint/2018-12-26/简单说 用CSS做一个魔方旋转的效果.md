---
title: '简单说 用CSS做一个魔方旋转的效果' 
date: 2018-12-26 2:30:14
hidden: true
slug: 09q4rliygdmt
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>魔方大家应该是不会陌生的，这次我们来一起用CSS实现一个魔方旋转的特效，先来看看效果图！   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPUI?w=519&amp;h=469" src="https://static.alili.tech/img/bVXPUI?w=519&amp;h=469" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">解释</h3>
<p>我们要做这样的效果，重点在于怎么把6张图片，摆放成魔方的样子，而把它们摆放成魔方的样子，重点在于用好CSS的transform，这是非常重要的，好的，我们先拼出一个魔方的样子。   <br><strong>效果图</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXPUH?w=521&amp;h=471" src="https://static.alili.tech/img/bVXPUH?w=521&amp;h=471" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>代码</strong>（代码比较长，朋友们可以直接粘贴复制到电脑看效果）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot; />
    <style>
        /*最外层容器样式*/
        .wrap {
            width: 200px;
            height: 200px;
            margin: 200px;
            position: relative;
        }

        /*包裹所有容器样式*/
        .cube {
            width: 200px;
            height: 200px;
            margin: 0 auto;
            transform-style: preserve-3d;
            /* 为了方便观察，将整个魔方进行旋转 */
            transform: rotateX(-30deg) rotateY(-80deg);
        }

        .cube div {
            position: absolute;
            width: 200px;
            height: 200px;
            opacity: 0.8;
            transition: .4s;
        }

        /*定义所有图片样式*/
        .pic {
            width: 200px;
            height: 200px;
        }

        .cube .out_front {
            transform: rotateY(0deg) translateZ(100px);
        }

        .cube .out_back {
            transform: translateZ(-100px) rotateY(180deg);
        }

        .cube .out_left {
            transform: rotateY(-90deg) translateZ(100px);
        }

        .cube .out_right {
            transform: rotateY(90deg) translateZ(100px);
        }

        .cube .out_top {
            transform: rotateX(90deg) translateZ(100px);
        }

        .cube .out_bottom {
            transform: rotateX(-90deg) translateZ(100px);
        }

        /*鼠标移入后样式*/
        .cube:hover .out_front {
            transform: rotateY(0deg) translateZ(200px);
        }

        .cube:hover .out_back {
            transform: translateZ(-200px) rotateY(180deg);
        }

        .cube:hover .out_left {
            transform: rotateY(-90deg) translateZ(200px);
        }

        .cube:hover .out_right {
            transform: rotateY(90deg) translateZ(200px);
        }

        .cube:hover .out_top {
            transform: rotateX(90deg) translateZ(200px);
        }

        .cube:hover .out_bottom {
            transform: rotateX(-90deg) translateZ(200px);
        }
    </style>
</head>

<body>
    <!--外层最大容器-->
    <div class=&quot;wrap&quot;>
        <!--包裹所有元素的容器-->
        <div class=&quot;cube&quot;>
            <!--前面图片 -->
            <div class=&quot;out_front&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094246620&quot; class=&quot;pic&quot; />
            </div>
            <!--后面图片 -->
            <div class=&quot;out_back&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094334594&quot; class=&quot;pic&quot; />
            </div>
            <!--左面图片 -->
            <div class=&quot;out_left&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094400013&quot; class=&quot;pic&quot; />
            </div>
            <!--右面图片 -->
            <div class=&quot;out_right&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094422331&quot; class=&quot;pic&quot; />
            </div>
            <!--上面图片 -->
            <div class=&quot;out_top&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094444434&quot; class=&quot;pic&quot; />
            </div>
            <!--下面图片 -->
            <div class=&quot;out_bottom&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094504432&quot; class=&quot;pic&quot; />
            </div>
        </div>
    </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-comment">/*最外层容器样式*/</span>
        <span class="hljs-selector-class">.wrap</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-comment">/*包裹所有容器样式*/</span>
        <span class="hljs-selector-class">.cube</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
            <span class="hljs-comment">/* 为了方便观察，将整个魔方进行旋转 */</span>
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-30deg) <span class="hljs-built_in">rotateY</span>(-80deg);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.8</span>;
            <span class="hljs-attribute">transition</span>: .<span class="hljs-number">4s</span>;
        }

        <span class="hljs-comment">/*定义所有图片样式*/</span>
        <span class="hljs-selector-class">.pic</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_front</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_back</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-100px) <span class="hljs-built_in">rotateY</span>(180deg);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_left</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_top</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_bottom</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-comment">/*鼠标移入后样式*/</span>
        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_front</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_back</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-200px) <span class="hljs-built_in">rotateY</span>(180deg);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_left</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_top</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_bottom</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!--外层最大容器--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--包裹所有元素的容器--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--前面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_front"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094246620"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--后面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_back"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094334594"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--左面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_left"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094400013"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--右面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094422331"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--上面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_top"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094444434"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--下面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_bottom"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094504432"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们来分析一下上面的代码  <br>先说结构部分，看图   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPUG?w=536&amp;h=307" src="https://static.alili.tech/img/bVXPUG?w=536&amp;h=307" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们继续说CSS部分，主要是下面这4部分，我们说说每个部分中比较重要的         <br>1、最外层容器样式<br><code>position: relative;</code> ，主要是因为后面会用到<code>position: absolute;</code></p>
<blockquote>absolute，生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。</blockquote>
<p>2、包裹所有容器样式<br><code>transform-style: preserve-3d;</code><br>使被转换的子元素保留其 3D 转换：<br>参考链接  <a href="http://www.runoob.com/cssref/css3-pr-transform-style.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/cssref/...</a></p>
<p>3、定义所有图片样式<br><code>position: absolute;</code><br>让每个面先在同一个位置，方便后面转换位置  <br><strong>效果图</strong>  </p>
<p><span class="img-wrap"><img data-src="/img/bVXPUF?w=376&amp;h=360" src="https://static.alili.tech/img/bVXPUF?w=376&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>Transform字面上就是变形，改变的意思。在CSS3中transform主要包括以下几种：旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。</blockquote>
<p>上下两个面  沿X轴旋转一定角度，沿Z轴位移一定像素。<br>前后左右四个面  沿Y轴旋转一定角度，沿Z轴位移一定像素。<br>注意，后面是 先位移，再旋转，其他面是先旋转，再位移，千万别弄错顺序。  </p>
<p>4、鼠标移入后样式<br>只是改变translateZ的值，将位移的距离再增加100px  </p>
<p>到此，我们就弄出一个魔方了，至于最开始我们看到的魔方中还有嵌套一个小魔方，就很容易了，把这个魔方的六个面复制一下，然后粘贴到cube中，然后改变大小，和位移的距离就可以了，要让整个魔方动起来 ，就在最外面的容器（cube）上，加上动画就可以了。</p>
<h3 id="articleHeader2">总结</h3>
<p>做这样的一个效果，主要是为了练习，transform，这个效果重点就是搞明白每个面要旋转多少度，然后位移的距离是一样的（不是说取值是一样的），明白了之后，做这个效果就很简单了，下方有完整的代码！需要的朋友就CV吧！</p>
<h3 id="articleHeader3">完整示例代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot; />
    <style>
        /*最外层容器样式*/
        .wrap {
            width: 200px;
            height: 200px;
            margin: 200px;
            position: relative;
        }

        /*包裹所有容器样式*/
        .cube {
            width: 200px;
            height: 200px;
            margin: 0 auto;
            transform-style: preserve-3d;
            transform: rotateX(-30deg) rotateY(-80deg);
            animation: rotate linear 20s infinite;
        }

        @-webkit-keyframes rotate {
            from {
                transform: rotateX(0deg) rotateY(0deg);
            }
            to {
                transform: rotateX(360deg) rotateY(360deg);
            }
        }

        .cube div {
            position: absolute;
            width: 200px;
            height: 200px;
            opacity: 0.8;
            transition: all .4s;
        }

        /*定义所有图片样式*/
        .pic {
            width: 200px;
            height: 200px;
        }

        .cube .out_front {
            transform: rotateY(0deg) translateZ(100px);
        }

        .cube .out_back {
            transform: translateZ(-100px) rotateY(180deg);
        }

        .cube .out_left {
            transform: rotateY(-90deg) translateZ(100px);
        }

        .cube .out_right {
            transform: rotateY(90deg) translateZ(100px);
        }

        .cube .out_top {
            transform: rotateX(90deg) translateZ(100px);
        }

        .cube .out_bottom {
            transform: rotateX(-90deg) translateZ(100px);
        }

        /*定义小正方体样式*/
        .cube span {
            display: block;
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50px;
            left: 50px;
        }

        .cube .in_pic {
            width: 100px;
            height: 100px;
        }

        .cube .in_front {
            transform: rotateY(0deg) translateZ(50px);
        }

        .cube .in_back {
            transform: translateZ(-50px) rotateY(180deg);
        }

        .cube .in_left {
            transform: rotateY(-90deg) translateZ(50px);
        }

        .cube .in_right {
            transform: rotateY(90deg) translateZ(50px);
        }

        .cube .in_top {
            transform: rotateX(90deg) translateZ(50px);
        }

        .cube .in_bottom {
            transform: rotateX(-90deg) translateZ(50px);
        }

        /*鼠标移入后样式*/
        .cube:hover .out_front {
            transform: rotateY(0deg) translateZ(200px);
        }

        .cube:hover .out_back {
            transform: translateZ(-200px) rotateY(180deg);
        }

        .cube:hover .out_left {
            transform: rotateY(-90deg) translateZ(200px);
        }

        .cube:hover .out_right {
            transform: rotateY(90deg) translateZ(200px);
        }

        .cube:hover .out_top {
            transform: rotateX(90deg) translateZ(200px);
        }

        .cube:hover .out_bottom {
            transform: rotateX(-90deg) translateZ(200px);
        }
    </style>
</head>

<body>
    <!-- 外层最大容器 -->
    <div class=&quot;wrap&quot;>
        <!--包裹所有元素的容器-->
        <div class=&quot;cube&quot;>
            <!--前面图片 -->
            <div class=&quot;out_front&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094246620&quot; class=&quot;pic&quot; />
            </div>
            <!--后面图片 -->
            <div class=&quot;out_back&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094334594&quot; class=&quot;pic&quot; />
            </div>
            <!--左面图片 -->
            <div class=&quot;out_left&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094400013&quot; class=&quot;pic&quot; />
            </div>
            <!--右面图片 -->
            <div class=&quot;out_right&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094422331&quot; class=&quot;pic&quot; />
            </div>
            <!--上面图片 -->
            <div class=&quot;out_top&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094444434&quot; class=&quot;pic&quot; />
            </div>
            <!--下面图片 -->
            <div class=&quot;out_bottom&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716094504432&quot; class=&quot;pic&quot; />
            </div>

            <!--小正方体 -->
            <span class=&quot;in_front&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
            <span class=&quot;in_back&quot;>
                 <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
            <span class=&quot;in_left&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
            <span class=&quot;in_right&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
            <span class=&quot;in_top&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
            <span class=&quot;in_bottom&quot;>
                <img src=&quot;http://img.blog.csdn.net/20170716120759718&quot; class=&quot;in_pic&quot; />
            </span>
        </div>

    </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-comment">/*最外层容器样式*/</span>
        <span class="hljs-selector-class">.wrap</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-comment">/*包裹所有容器样式*/</span>
        <span class="hljs-selector-class">.cube</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-30deg) <span class="hljs-built_in">rotateY</span>(-80deg);
            <span class="hljs-attribute">animation</span>: rotate linear <span class="hljs-number">20s</span> infinite;
        }

        @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> rotate {
            <span class="hljs-selector-tag">from</span> {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(0deg) <span class="hljs-built_in">rotateY</span>(0deg);
            }
            <span class="hljs-selector-tag">to</span> {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(360deg) <span class="hljs-built_in">rotateY</span>(360deg);
            }
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.8</span>;
            <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span>;
        }

        <span class="hljs-comment">/*定义所有图片样式*/</span>
        <span class="hljs-selector-class">.pic</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_front</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_back</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-100px) <span class="hljs-built_in">rotateY</span>(180deg);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_left</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_top</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.out_bottom</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
        }

        <span class="hljs-comment">/*定义小正方体样式*/</span>
        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-tag">span</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50px</span>;
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_pic</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_front</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg) <span class="hljs-built_in">translateZ</span>(50px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_back</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-50px) <span class="hljs-built_in">rotateY</span>(180deg);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_left</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(50px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(50px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_top</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(50px);
        }

        <span class="hljs-selector-class">.cube</span> <span class="hljs-selector-class">.in_bottom</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(50px);
        }

        <span class="hljs-comment">/*鼠标移入后样式*/</span>
        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_front</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_back</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-200px) <span class="hljs-built_in">rotateY</span>(180deg);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_left</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_top</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }

        <span class="hljs-selector-class">.cube</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.out_bottom</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(200px);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 外层最大容器 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--包裹所有元素的容器--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--前面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_front"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094246620"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--后面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_back"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094334594"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--左面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_left"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094400013"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--右面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094422331"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--上面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_top"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094444434"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--下面图片 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out_bottom"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716094504432"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            <span class="hljs-comment">&lt;!--小正方体 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_front"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_back"</span>&gt;</span>
                 <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_left"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_top"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_bottom"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.blog.csdn.net/20170716120759718"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in_pic"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说 用CSS做一个魔方旋转的效果

## 原文链接
[https://segmentfault.com/a/1190000011838500](https://segmentfault.com/a/1190000011838500)

