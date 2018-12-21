---
title: '【前端Talkking】CSS系列-一步一步带你认识transition过渡效果' 
date: 2018-12-21 2:30:11
hidden: true
slug: 17fv931w1mci
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、前言</h2>
<p>  transition从网页效果上来看是一种平滑过渡的动画，本质上是在一定的时间内将属性的状态从初始值过渡到结束值。如果不添加transition过渡，在网页中点击鼠标、获得焦点等操作将导致css的值在瞬间完成，看起来比较生硬，而添加了过渡效果，可以实现平滑的过渡，增加用户体验。  </p>
<p>  在使用的使用需要加浏览器前缀：</p>
<ul>
<li>-webkit-transition</li>
<li>-moz-transition</li>
<li>-o-transition</li>
</ul>
<p>  过渡transition是一个复合属性，包括：</p>
<blockquote>transition: &lt;transition-property&gt; || &lt;transition-duration&gt; || &lt;transition-timing-function&gt; || &lt;transition-delay&gt;</blockquote>
<ul>
<li>transition-property：过渡属性（默认值为all）</li>
<li>transition-duration：过渡持续时间（默认值为0s）</li>
<li>transition-timing-function：过渡函数（默认值为ease函数）</li>
<li>transition-delay过渡延迟时间（默认值为0s）</li>
</ul>
<h2 id="articleHeader1">2、transition属性介绍</h2>
<h4>2.1 过渡属性transition-property</h4>
<blockquote>transition-property: none | all | &lt;transition-property&gt;[,&lt;transition-property&gt;]*  <br>默认值：all</blockquote>
<p>*表示0次或多次，也就是说transition-property后面可以跟多个属性，属性之间以逗号分隔。如果有多个属性过渡，可以使用all代替所有的属性名，表示所有的属性都将获得过渡效果。&lt;span style="font-weight:bold"&gt;这里需要指出并不是所有的属性都能过渡，只有能够数字量化的CSS属性才能过渡，比如颜色系列（color、background-color、border-color）、数字系列（width、height、line-height）、01系列(opacity、visibility)&lt;/span&gt;。W3C上列出了<a href="https://www.w3.org/TR/css-transitions-1/#animatable-css" rel="nofollow noreferrer" target="_blank">所有的过渡属性列表</a></p>
<h4>2.2 过渡持续时间transition-duration</h4>
<blockquote>transition-duration:&lt;time&gt;[,&lt;time&gt;]*  <br>默认值:0s，表示立刻变化。</blockquote>
<p>  整个过渡状态完成需要的时间。单位可以指定秒，也可以指定毫秒。</p>
<p>  有了transition-property和transition-duration的介绍，我们来看一个简单的例子：该实例使用的hover的时候，背景颜色由#69c编程red，并且过渡时间为3s。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>transition过渡效果</title>
    <style>
        #block{
            width: 400px;
            height: 400px;
            background-color: #69c;
            margin: 0 auto;
            -webkit-transition: background-color 3s;
        }
        #block:hover{
            background-color: red;
        }
    </style>
</head>
<body>
    <div id=&quot;block&quot;></div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>transition过渡效果<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#block</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#69c</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">-webkit-transition</span>: background-color <span class="hljs-number">3s</span>;
        }
        <span class="hljs-selector-id">#block</span><span class="hljs-selector-pseudo">:hover</span>{
            <span class="hljs-attribute">background-color</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"block"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>网页的过渡效果如下所示：  </p>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/8387BB06E6014E06B2662583AC56EB94/2368" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/8387BB06E6014E06B2662583AC56EB94/2368" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>2.3 过渡延迟时间transition-delay</h4>
<blockquote>transition-delay:&lt;time&gt;[,&lt;time&gt;]*  <br>默认值:0s，表示不延迟</blockquote>
<p>  延迟过渡开始的时间。可以为正数，也可以为负数。如果为正数秒，则表示正数秒后才开始过渡。负数的情况可以参考<a href="https://www.cnblogs.com/xiaohuochai/p/5347930.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>。  </p>
<p>  下面的例子中，将过渡时间设置为1s，过渡延迟时间设置的3s，可以看到当鼠标挪上去与离开过了3秒后背景颜色才开始过渡，并且过渡的时间为1s。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>transition过渡效果</title>
    <style>
        #block{
            width: 200px;
            height: 200px;
            background-color: #69c;
            margin: 0 auto;
            -webkit-transition: background-color 1s 3s;
        }
        #block:hover{
            background-color: red;
        }
    </style>
</head>
<body>
    <div id=&quot;block&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>transition过渡效果<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#block</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#69c</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">-webkit-transition</span>: background-color <span class="hljs-number">1s</span> <span class="hljs-number">3s</span>;
        }
        <span class="hljs-selector-id">#block</span><span class="hljs-selector-pseudo">:hover</span>{
            <span class="hljs-attribute">background-color</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"block"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/EE804A4D00DB454597344BCA77065107/2370" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/EE804A4D00DB454597344BCA77065107/2370" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>  当hover时过渡完成时，默认会恢复到最初的状态。  这里有一个小技巧，如果不想恢复到最初的状态，可以将transition-delay的值设定为很大，示例中将该值设置为999999s，大概为12天，对于用户浏览器窗口来讲，已经是足够长，这个时间范围内不会恢复到最初的状态，因此可以认为这种过渡是不可逆的，即是永久的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
    <div class=&quot;forever&quot;></div>
</body>
</html>

<style>
    .forever{
        width: 100px;
        height: 100px;
        margin: 0 auto;
        background-color: deeppink;
        transition: all 1s linear 999999s;
    }
    .forever:hover{
        transform: scale(2);
        transition: all 1s ease-in-out;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"forever"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.forever</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">background-color</span>: deeppink;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear <span class="hljs-number">999999s</span>;
    }
    <span class="hljs-selector-class">.forever</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease-in-out;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/61FECD37396F444EA62EDBF9CC91E4D2/2378" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/61FECD37396F444EA62EDBF9CC91E4D2/2378" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>  从上面的示例可以得到最终的效果，当鼠标hover结束的时候，图片仍然保持在放大后的尺寸。具体原因是：回到原尺寸的过渡延迟时间设置的很大，用户的浏览器窗口不可能一直保持不关，现实的情况等于永久性过渡。</p>
<h4>2.4 过渡时间函数transition-timing-function</h4>
<blockquote>transition-timing-function:&lt;timing-function&gt;[,&lt;timing-function&gt;]*  <br>默认值:ease  <br>可选值:ease/linear/ease-in/ease-out/ease-in-out</blockquote>
<ul>
<li>ease 缓慢开始，缓慢结束（默认）</li>
<li>ease-in 缓慢开始</li>
<li>ease-out 缓慢结束</li>
<li>ease-in-out 缓慢开始，缓慢结束（和ease稍有区别，差别并不大）</li>
<li>linear 匀速</li>
</ul>
<p>以上四个参数的变化曲线可以用下图表示：</p>
<p><span class="img-wrap"><img data-src="/img/bV0RmU" src="https://static.alili.tech/img/bV0RmU" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>  实际的效果如下图所示，动画依次对应ease、ease-in、ease-out、ease-in-out以及linear的动画效果：</p>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/89C8C3EC490741E7B1D0E7A3380DDD3F/2384" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/89C8C3EC490741E7B1D0E7A3380DDD3F/2384" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>cubic-bezier <a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve" rel="nofollow noreferrer" target="_blank">贝塞尔曲线</a>。（x1,y1,x2,y2）四个值对应于曲线上的P1和P2点，并且必须在[0,1]区域内，否则无效。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV0RmR" src="https://static.alili.tech/img/bV0RmR" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>steps 支持两个参数，第一个是分割的数量，第二个参数可选关键字start、end（默认）。例如，steps(4, start)等价于step-start(4)、steps(4,end)等价于step-end(4)</li></ul>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/C60D4646F47049839FFAAB98E108FCB1/2353" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/C60D4646F47049839FFAAB98E108FCB1/2353" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote>关于cubic-bezier和steps两个过渡时间函数，后面写相关的文章详细讨论。</blockquote>
<h2 id="articleHeader2">3、 过渡触发的方式</h2>
<p>  一般地，过渡transition的触发方式有三种，分别是伪类触发、媒体查询触发@media和Javascript事件触发。其中，常见的伪类触发有:hover、:focus、:active、:checked等。  </p>
<p><strong>1.hover:鼠标悬停触发。在文章的上面有例子讲解。</strong><br><strong>2.active:用户点击元素并按住鼠标时触发</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;active-demo&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active-demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .active-demo{
        display: block;
        width: 100px;
        height: 100px;
        margin-top: 10px;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
        background-color: deeppink;
        transition: all 3s ease;
    }
.active-demo:active{
    background-color: blue;
    width: 500px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"> <span class="hljs-selector-class">.active-demo</span>{
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: deeppink;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">3s</span> ease;
    }
<span class="hljs-selector-class">.active-demo</span><span class="hljs-selector-pseudo">:active</span>{
    <span class="hljs-attribute">background-color</span>: blue;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
}</code></pre>
<p>     网页中的效果如下所示：<br><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/E0F2307201434B25917985DA1EEF6215/2426" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/E0F2307201434B25917985DA1EEF6215/2426" alt="image" title="image" style="cursor: pointer;"></span><br><strong>3.focus(获得焦点时触发)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
    <input type=&quot;text&quot; class=&quot;input-demo&quot; placeholder=&quot;我有焦点时，将边长&quot;>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-demo"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"我有焦点时，将边长"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input{
    outline: none;
}
.wrapper{
    position: relative;
    width: 500px;
    height: 50px;
    padding: 5px;
    background-color: #f0f3f9;
}
.input-demo{
    position: absolute;
    right: 0;
    width: 200px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.4;
    color: #555;
    background-color: #fff;
    border-image: none;
    border: 2px solid blue;
    border-radius: 4px;
    transition: width 3s linear;
}
.input-demo:focus{
    width: 400px;
    border-image: none;
    border: 2px solid gold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span>{
    <span class="hljs-attribute">outline</span>: none;
}
<span class="hljs-selector-class">.wrapper</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f3f9</span>;
}
<span class="hljs-selector-class">.input-demo</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.4</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#555</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-image</span>: none;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid blue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">transition</span>: width <span class="hljs-number">3s</span> linear;
}
<span class="hljs-selector-class">.input-demo</span><span class="hljs-selector-pseudo">:focus</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">border-image</span>: none;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid gold;
}</code></pre>
<p>  我们对input进行绝对定位，并改变focus时它的宽度，就可以模拟出segmentfault顶部搜索框的效果。效果如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV0TB4" src="https://static.alili.tech/img/bV0TB4" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4.checked:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;wrapper&quot;>
    <input type=&quot;checkbox&quot; class=&quot;checkbox&quot; id=&quot;checkbox&quot;>
    <label class=&quot;label&quot; for=&quot;checkbox&quot;>复选框</label>
</div>

.checkbox{
    transition: all 3s ease;
}
.label{
    color: #1b1b1b;
    transition: all 3s ease;
}
.checkbox:checked + .label{
    color: deeppink;
    font-size: 20px;
    font-weight: 700;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"label"</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox"</span>&gt;</span>复选框<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

.checkbox{
    transition: all 3s ease;
}
.label{
    color: #1b1b1b;
    transition: all 3s ease;
}
.checkbox:checked + .label{
    color: deeppink;
    font-size: 20px;
    font-weight: 700;
}</code></pre>
<p>  在这个例子中通过checked的时候，改变label标签字体的大小和颜色。效果如下：</p>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/746A75B581F44563B0E87715E5AA1EB9/2437" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/746A75B581F44563B0E87715E5AA1EB9/2437" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5.点击事件，例如添加删除等操作</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;box&quot;>click</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>click<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    color: #fff;
    text-align: center;
    margin-top: 10px;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-color: deeppink;
    transition: all 3s ease;
}
.box.clicked{
    width: 200px;
    height: 200px;
    background-color: blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background-color</span>: deeppink;
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">3s</span> ease;
}
<span class="hljs-selector-class">.box</span><span class="hljs-selector-class">.clicked</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background-color</span>: blue;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;.box&quot;).click(function () {
    $(this).toggleClass('clicked');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">".box"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).toggleClass(<span class="hljs-string">'clicked'</span>);
})</code></pre>
<p>  这个例子中，当点击鼠标的时候，改变容器的背景颜色和大小。效果图如下：<br><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/5609C806946C478BB5BE18881641F6EA/2443" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/5609C806946C478BB5BE18881641F6EA/2443" alt="image" title="image" style="cursor: pointer;"></span></p>
<h6>6.改变浏览器窗口大小触发@media</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;media&quot;>media</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"media"</span>&gt;</span>media<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".media {
    margin-top: 10px;
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background: deeppink;
    color: white;
    text-align: center;
    transition: all 1s ease;
}

@media only screen and (max-width : 960px) {
    .media {
        width: 100px;
        height: 100px;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.media</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background</span>: deeppink;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease;
}

@<span class="hljs-keyword">media</span> only screen and (max-width : <span class="hljs-number">960px</span>) {
    <span class="hljs-selector-class">.media</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    }
}</code></pre>
<p>   这个例子中通过改变浏览器窗口的大小，来实现media容器的宽度和高度的渐变。<br><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/DEA9DE72317B43C7B24334DB9D6E87B1/2440" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/DEA9DE72317B43C7B24334DB9D6E87B1/2440" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">4、过渡transition结束事件</h2>
<p>  由于过渡涉及到一个过渡时间，在过渡完成的时候会触发transitionend事件，。兼容Chrome、Firefox、Safari、IE10+。具体用法如下：</p>
<blockquote>element.addEventListener('transitionend', callback, false);</blockquote>
<p><strong>html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;end&quot; class=&quot;end&quot;>transitionEnd</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"end"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"end"</span>&gt;</span>transitionEnd<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>css</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .end{
        width: 120px;
        height: 120px;
        background-color: deeppink;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        transition: all 3s ease;
    }
    .end:hover{
        width: 200px;
        height: 200px;
        background-color: blue;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"> <span class="hljs-selector-class">.end</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">background-color</span>: deeppink;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">3s</span> ease;
    }
    <span class="hljs-selector-class">.end</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: blue;
    }</code></pre>
<p><strong>javacript</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  document.getElementById('end').addEventListener(&quot;transitionend&quot;, function (e) {
        e = e || event;
        document.getElementById('end').innerHTML = 'propertyName:'  + e.propertyName
            + '; elapsedTime:' + e.elapsedTime + '; pseudoElement:' + e.pseudoElement;
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'end'</span>).addEventListener(<span class="hljs-string">"transitionend"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        e = e || event;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'end'</span>).innerHTML = <span class="hljs-string">'propertyName:'</span>  + e.propertyName
            + <span class="hljs-string">'; elapsedTime:'</span> + e.elapsedTime + <span class="hljs-string">'; pseudoElement:'</span> + e.pseudoElement;
    });</code></pre>
<p>效果如下：  </p>
<p><span class="img-wrap"><img data-src="https://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/0578726CEE30444F80AD9C8BB37EBF81/2450" src="https://static.alili.techhttps://note.youdao.com/yws/public/resource/a6f869b40473e51734257b382fd62fdd/xmlnote/0578726CEE30444F80AD9C8BB37EBF81/2450" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>  但是transitionend事件比较坑，通过<strong>e.propertyName</strong>获取到的过渡属性不完整，比如文中示例，过渡的属性有width、height以及background-color，但是通过<strong>e.propertyName</strong>获得过渡属性只有height。</p>
<h2 id="articleHeader4">5、写在最后</h2>
<p>  关于transition过渡属性就介绍到这里，还有很多细节问题没有介绍到，大家可以再看看W3C上的介绍。相信到这里，你可以写一个用户友好的过渡效果了。  <br>     感谢您的阅读！在这样的一个浮躁的年代里，能够认真看到这里已经是对作者最大的肯定。欢迎大家关注我的微信公众号。<br>  圣诞节了，祝福您和您的家人一切都好！</p>
<p><span class="img-wrap"><img data-src="/img/bV0T77" src="https://static.alili.tech/img/bV0T77" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端Talkking】CSS系列-一步一步带你认识transition过渡效果

## 原文链接
[https://segmentfault.com/a/1190000012559862](https://segmentfault.com/a/1190000012559862)

