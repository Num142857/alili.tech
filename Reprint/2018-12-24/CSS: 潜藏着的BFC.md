---
title: 'CSS: 潜藏着的BFC' 
date: 2018-12-24 2:30:07
hidden: true
slug: 081j1hr3178e
categories: [reprint]
---

{{< raw >}}

                    
<p>在写样式时，往往是添加了一个样式，又或者是修改了某个属性，就达到了我们的预期。<br>而BFC就潜藏在其中，当你修改样式时，一不小心就能触发它而毫无察觉，因此没有意识到BFC的神奇之处。</p>
<h2 id="articleHeader0">一、什么是BFC（Block Formatting Context）</h2>
<p>写CSS样式时，对一个元素设置css,我们首先要知道这个元素是块级元素还是行内元素，而BFC就是用来格式化块级盒子的。</p>
<p>Formatting Context：指页面中一个渲染区域，并且拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用。</p>
<p>BFC定义：块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level Box参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。</p>
<h2 id="articleHeader1">二、BFC的生成</h2>
<p>我们说到BFC是一块渲染区域，那么这块渲染区域到底在哪里呢，具体大小又是多少？这些都是由生成BFC的元素来决定的。</p>
<p>满足下列CSS声明之一的元素便会生成BFC：</p>
<h4>1、根元素或其它包含它的元素</h4>
<h4>2、float的值不为none；</h4>
<h4>3、overflow的值不为visible；</h4>
<h4>4、position的值不为static；</h4>
<h4>5、display的值为inline-block、table-cell、table-caption；</h4>
<h4>6、flex boxes (元素的display: flex或inline-flex)；</h4>
<p>注：也有人认为display: table能生成BFC，我认为最主要原因是table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC。</p>
<h2 id="articleHeader2">三、BFC的布局规则</h2>
<p>简单归纳如下：<br>1、内部的元素会在垂直方向一个接一个地排列，可以理解为是BFC中的一个常规流<br>2、元素垂直方向的距离由margin决定，即属于同一个BFC的两个相邻盒子的margin可能会发生重叠<br>3、每个元素的左外边距与包含块的左边界相接触(从左往右，否则相反)，即使存在浮动也是如此，这说明BFC中的子元素不会超出它的包含块<br>4、BFC的区域不会与float元素区域重叠<br>5、计算BFC的高度时，浮动子元素也参与计算<br>6、BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然</p>
<h2 id="articleHeader3">四、BFC的应用</h2>
<p>说了这么多，那么我们BFC到底有什么用呢？下面我们通过几个实例来解决一些问题：</p>
<h3 id="articleHeader4">实例1、解决margin重叠问题</h3>
<p>玩css的朋友都知道margin collapse，也就是相邻的垂直元素同时设置了margin后，实际margin值会塌陷到其中较大的那个值。<br>其根本原理就是它们处于同一个BFC，符合“属于同一个BFC的两个相邻元素的margin会发生重叠”的规则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin重叠现象：
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>margin重叠现象</title>
    <style type=&quot;text/css&quot;>
        *{margin: 0;padding: 0;}
        .box p {
            margin: 20px 0px;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class=&quot;box&quot; >
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit.</p>
    </div>
</body>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>margin重叠现象：
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>margin重叠现象<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        *{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;}
        <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">background-color</span>: skyblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrvb?w=355&amp;h=266" src="https://static.alili.tech/img/bVZrvb?w=355&amp;h=266" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrvw?w=357&amp;h=149" src="https://static.alili.tech/img/bVZrvw?w=357&amp;h=149" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrwm?w=173&amp;h=175" src="https://static.alili.tech/img/bVZrwm?w=173&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrvJ?w=374&amp;h=172" src="https://static.alili.tech/img/bVZrvJ?w=374&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>通过实验结果我们发现，上下margin重叠了。</p>
<p>我们可以在其中一个元素外面包裹一层容器，并触发该容器生成一个BFC。那么两个元素便属于不同的BFC，就不会发生margin重叠了。<br>我们做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <p>Lorem ipsum dolor sit.</p>
    <div style=&quot;overflow:hidden;&quot;>
        <p>Lorem ipsum dolor sit.</p>
    </div>
    <p>Lorem ipsum dolor sit.</p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"overflow:hidden;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrxw?w=354&amp;h=183" src="https://static.alili.tech/img/bVZrxw?w=354&amp;h=183" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrxH?w=363&amp;h=200" src="https://static.alili.tech/img/bVZrxH?w=363&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrxJ?w=363&amp;h=202" src="https://static.alili.tech/img/bVZrxJ?w=363&amp;h=202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们使用overflow:hidden；生成了一个BFC，成功解决了margin重叠问题。</p>
<h3 id="articleHeader5">实例2、解决浮动问题</h3>
<p>我们知道给父元素设置overflow:hidden可以清除子元素的浮动，但往往都不知道原理是什么。<br>其实这就是应用了BFC的原理：当在父元素中设置overflow:hidden时就会触发BFC，所以他内部的元素就不会影响外面的布局，BFC就把浮动的子元素高度当做了自己内部的高度去处理溢出，所以外面看起来是清除了浮动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>BFC浮动问题</title>
    <style>
        .one {
            /* 文档流 里面的文字标签将父元素撑起来 */
            background-color: pink;
        }
        .two {
            float: left;
        }
    </style>
</head>
<body>
    <!-- 文档流 从上到下,当遇到float、position：absolute时，会离开文档流 -->
    <div class=&quot;one&quot;>
    <div class=&quot;two&quot;>Hello World!</div>
    </div>
    你好世界！
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>BFC浮动问题<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.one</span> {
            <span class="hljs-comment">/* 文档流 里面的文字标签将父元素撑起来 */</span>
            <span class="hljs-attribute">background-color</span>: pink;
        }
        <span class="hljs-selector-class">.two</span> {
            <span class="hljs-attribute">float</span>: left;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 文档流 从上到下,当遇到float、position：absolute时，会离开文档流 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    你好世界！
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrzx?w=299&amp;h=106" src="https://static.alili.tech/img/bVZrzx?w=299&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrz6?w=193&amp;h=195" src="https://static.alili.tech/img/bVZrz6?w=193&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".one {
        background-color: pink;
        overflow: hidden;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.one</span> {
        <span class="hljs-attribute">background-color</span>: pink;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrzC?w=323&amp;h=97" src="https://static.alili.tech/img/bVZrzC?w=323&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZrz1?w=188&amp;h=186" src="https://static.alili.tech/img/bVZrz1?w=188&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>对比发现，当我们一个元素设置成为BFC之后，计算BFC元素高度的时候，浮动元素也参与了计算。</p>
<h3 id="articleHeader6">实例3、解决侵占浮动元素的问题</h3>
<p>我们知道浮动元素会脱离文档流，然后浮盖在文档流元素上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>BFC侵占浮动元素的问题</title>
    <style>
        .box1 {
            float: left;
            width: 100px;
            height: 100px;
            background-color: pink;
        }
        .box2 {
            width: 200px;
            height: 200px;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class=&quot;box1&quot;>box1</div>
    <div class=&quot;box2&quot;>box2</div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>BFC侵占浮动元素的问题<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.box1</span> {
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: pink;
        }
        <span class="hljs-selector-class">.box2</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: skyblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span>box1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span>box2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrA7?w=218&amp;h=224" src="https://static.alili.tech/img/bVZrA7?w=218&amp;h=224" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当一个元素浮动，另一个元素不浮动时，浮动元素因为脱离文档流就会盖在不浮动的元素上。</p>
<p>我们做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box2 {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        overflow: hidden;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: skyblue;
        <span class="hljs-attribute">overflow</span>: hidden;
    }</code></pre>
<p>或如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box2 {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        /* overflow: hidden; */
        float: left;
    }
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: skyblue;
        <span class="hljs-comment">/* overflow: hidden; */</span>
        <span class="hljs-attribute">float</span>: left;
    }
  </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrBi?w=326&amp;h=226" src="https://static.alili.tech/img/bVZrBi?w=326&amp;h=226" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们为非浮动元素建立BFC环境，根据BFC的不与float box重叠的规则，解决了侵占元素问题。</p>
<p>这一特性，我认为还是很有用的，特别是应用在两栏布局上，对比我们常规为非浮动元素或非定位元素设置margin来挤开的方法，其优点在于不需要去知道浮动或定位元素的宽度。</p>
<h2 id="articleHeader7">总结</h2>
<p>以上就是关于BFC的一些分析，BFC 是一种概念，是对前端布局技术的一种理论上的总结，掌握它可以让我们在使用CSS +DIV进行布局时，知道一些特殊操作以及规避问题的原理。BFC的概念比较抽象，但通过实例分析，有助于我们对BFC的理解。</p>
<p>在此仅列举了几个例子，欢迎大家一起探索更多^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS: 潜藏着的BFC

## 原文链接
[https://segmentfault.com/a/1190000012221820](https://segmentfault.com/a/1190000012221820)

