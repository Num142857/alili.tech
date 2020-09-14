---
title: '还在为无缝滚动而烦恼？是时候彻底get到这个知识点了' 
date: 2019-02-10 2:30:42
hidden: true
slug: 0robckskwfx
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在忙公司炒股大赛的页面，终于在昨天把他给上线了。一个看似简单的页面，做起来才知道其中的艰辛，暗藏深坑。由于直接使用jquery来写页面逻辑，因此要比想象中复杂很多。无论是从布局，功能还是逻辑上来说，都有值得总结的地方。</p>
<p>这篇文章主要说说关于无缝滚动的实现。</p>
<p>刚开始学习js的时候，真心觉得无缝滚动是一个神奇的功能。背后到底是怎么回事？为什么明明只有几个方块就是滚不到头？后来明白了原理之后，发现原来是通过一些障眼法来实现。</p>
<h3 id="articleHeader0">原理</h3>
<p>假如需要无缝滚动的4个元素是一个<code>ul.items</code>中的6个<code>li.item</code>。我们将控制<code>ul.items</code>在容器<code>.wrap</code>中滚动。html代码如下:</p>
<blockquote><p><code>ul.items</code>表示className为items的ul元素，其他地方同理</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrap&quot;>
    <ul class=&quot;items&quot;><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner0.8a07a886.jpg&quot; alt=&quot;&quot;></li><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner1.56bcecb3.png&quot; alt=&quot;&quot;></li><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner2.9a7e8842.jpg&quot; alt=&quot;&quot;></li><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner3.47acdfbd.png&quot; alt=&quot;&quot;></li><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner5.e9205d49.jpg&quot; alt=&quot;&quot;></li><!--
    --><li class=&quot;item&quot;><img src=&quot;https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner6.83b14a71.png&quot; alt=&quot;&quot;></li><!--
    --></ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"items"</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner0.8a07a886.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner1.56bcecb3.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner2.9a7e8842.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner3.47acdfbd.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner5.e9205d49.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://static.tigerbrokers.com/portal/images/cooperation/stockGame/v2-partner6.83b14a71.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-comment">&lt;!--
    --&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们的目标是实现水平方向上的滚动，因此需要<code>li.item</code>水平排列。能够达到目标的方式常用的有使用<code>float: left</code>，或者使用<code>display: inline-block</code>。我们知道控制页面元素的移动无非就是控制元素的<code>left, top, translateX, translateY</code>，还有一种就是控制滚动距离<code>scrollTop, scrollLeft</code>。布局的选择，同时也会影响到js控制属性的选择。</p>
<p>本例选择使用<code>display: inline-block</code>布局，并控制<code>ul.items</code>的<code>scrollLeft</code>值，让整个ul滚动起来。布局上需要注意的有以下几点：</p>
<ol>
<li>
<p>超出容器的部分需要隐藏，注意，此处的隐藏是给<code>ul.items</code>的，注意与<code>float: left</code>布局的差别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".items { overflow: hidden; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.items</span> { <span class="hljs-attribute">overflow</span>: hidden; }</code></pre>
</li>
<li>
<p><code>ul.items</code>的内容不能折行，因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".items { white-space: nowrap; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.items</span> { <span class="hljs-attribute">white-space</span>: nowrap; }</code></pre>
</li>
<li>
<p>需要适配到移动端，因此<code>li.item</code>的宽度就必然会随着设配宽度的变小而变小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media (max-width: 780px) {
    .item {
        width: 190px;
    }
}

@media (max-width: 580px) {
    .item {
        width: 160px;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">780px</span>) {
    <span class="hljs-selector-class">.item</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
    }
}

@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">580px</span>) {
    <span class="hljs-selector-class">.item</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
    }
}</code></pre>
</li>
<li>html布局中的<code>&lt;!-- --&gt;</code>是为了消除<code>display: inline-block</code>元素之间带来的间隙。</li>
</ol>
<p>那么无缝滚动的障眼法到底是什么呢？本来用图片描述会更加直观一点，不过这里我想偷个懒，用文字给大家讲述一下，希望大家能看懂。</p>
<p>我们有子元素123456， 一个一个向左滚动，复制一份，就变成<code>123456123456</code>。如果我们在整体移动到第二个1的时候，将整体的位置拉回到第一个1来，也就是初始位置，由于有<code>div.items</code>的<code>overflow: hidden</code>在，中间发生的变化我们没办法用肉眼识别出来，就感觉是一直在向左移动，永远都停不下来。</p>
<blockquote><p>表达能力有限，如果没懂再结合代码理解一下吧，或者留言给我</p></blockquote>
<h3 id="articleHeader1">功能实现</h3>
<p>一说到运动，我们常常想到的方法可能是利用<code>setTimeout</code>或者<code>setInterval</code>, 不过呢，html5为我们提供了一个更加高性能的方法<code>requestAnimationFrame</code>。</p>
<p>在性能上，<code>requestAnimationFrame &gt; setTimeout &gt; setInterval</code>。具体原因大家可以找找相关的资料了解一下。而<code>setTimeout</code>的最小定时值为<code>100/60</code>，因此，我们在实现运动时，从性能与兼容性两方面考虑，常常会如下声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lastTime = 0,
    nextFrame = window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.msRequestAnimationFrame     ||
                function(callback) {
                    var currTime = + new Date,
                        delay = Math.max(1000/60, 1000/60 - (currTime - lastTime));
                    lastTime = currTime + delay;
                    return setTimeout(callback, delay);
                },
    cancelFrame = window.cancelAnimationFrame               ||
                  window.webkitCancelAnimationFrame         ||
                  window.webkitCancelRequestAnimationFrame  ||
                  window.mozCancelRequestAnimationFrame     ||
                  window.msCancelRequestAnimationFrame      ||
                  clearTimeout;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> lastTime = <span class="hljs-number">0</span>,
    nextFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame       ||
                <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame ||
                <span class="hljs-built_in">window</span>.mozRequestAnimationFrame    ||
                <span class="hljs-built_in">window</span>.msRequestAnimationFrame     ||
                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
                    <span class="hljs-keyword">var</span> currTime = + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>,
                        delay = <span class="hljs-built_in">Math</span>.max(<span class="hljs-number">1000</span>/<span class="hljs-number">60</span>, <span class="hljs-number">1000</span>/<span class="hljs-number">60</span> - (currTime - lastTime));
                    lastTime = currTime + delay;
                    <span class="hljs-keyword">return</span> setTimeout(callback, delay);
                },
    cancelFrame = <span class="hljs-built_in">window</span>.cancelAnimationFrame               ||
                  <span class="hljs-built_in">window</span>.webkitCancelAnimationFrame         ||
                  <span class="hljs-built_in">window</span>.webkitCancelRequestAnimationFrame  ||
                  <span class="hljs-built_in">window</span>.mozCancelRequestAnimationFrame     ||
                  <span class="hljs-built_in">window</span>.msCancelRequestAnimationFrame      ||
                  clearTimeout;</code></pre>
<p>我们需要知道滚动到什么位置回退到0，这个位置刚好就是复制之前所有子元素加一起的总长度。但是子元素的宽度会因为设备宽度的改变而改变，因此配合布局，我们需要作如下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 单个子元素的宽度
var itemW = 240;
if ($items.children().eq(0).width() == 190) {
    itemW = 190;
}
if ($items.children().eq(0).width() == 160) {
    itemW = 160;
}

// 目标位置
var target = itemW * $items.children().length;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 单个子元素的宽度</span>
<span class="hljs-keyword">var</span> itemW = <span class="hljs-number">240</span>;
<span class="hljs-keyword">if</span> ($items.children().eq(<span class="hljs-number">0</span>).width() == <span class="hljs-number">190</span>) {
    itemW = <span class="hljs-number">190</span>;
}
<span class="hljs-keyword">if</span> ($items.children().eq(<span class="hljs-number">0</span>).width() == <span class="hljs-number">160</span>) {
    itemW = <span class="hljs-number">160</span>;
}

<span class="hljs-comment">// 目标位置</span>
<span class="hljs-keyword">var</span> target = itemW * $items.children().length;</code></pre>
<p>为了实现障眼法，需要复制一份子元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$items.html( $items.html() + $items.html() );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$items.html( $items.html() + $items.html() );</code></pre>
<p>定义一个运动函数，这里的运动为匀速运动，因此比较简单，只需要一直+1即可。如果需要运动快一点，就多加一点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = null;

function adAni() {
    timer = nextFrame(function() {
        scrollX += 1;

        // 当递增到大于了目标距离，就直接变为0
        if (scrollX >= target) {
            scrollX = 0;
        }
        $items.scrollLeft(scrollX);
        adAni();
    });
}

// 运行这个函数就可以实现无缝滚动啦。
adAni();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">adAni</span>(<span class="hljs-params"></span>) </span>{
    timer = nextFrame(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        scrollX += <span class="hljs-number">1</span>;

        <span class="hljs-comment">// 当递增到大于了目标距离，就直接变为0</span>
        <span class="hljs-keyword">if</span> (scrollX &gt;= target) {
            scrollX = <span class="hljs-number">0</span>;
        }
        $items.scrollLeft(scrollX);
        adAni();
    });
}

<span class="hljs-comment">// 运行这个函数就可以实现无缝滚动啦。</span>
adAni();</code></pre>
<p>这样无缝滚动就已经实现了。不过还有一些其他的需求。比如，鼠标mouseover时，需要停止滚动，离开之后又要重新启动滚动。因为需求的变化，在移动端还需要能够滑动<code>items.ul</code>，手指松开之后继续滚动。因此我们需要一个区别pc于移动端的函数。通过UA的不同来区分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isMobile() {
    return /(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i.test(navigator.userAgent);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isMobile</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i</span>.test(navigator.userAgent);
}</code></pre>
<p>在pc端，鼠标移入时停止，鼠标移除时继续滚动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!isMobile()) {
    $items.on('mouseover', function() {
        cancelFrame(timer);
    }).on('mouseout', function() { adAni(); });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!isMobile()) {
    $items.on(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        cancelFrame(timer);
    }).on(<span class="hljs-string">'mouseout'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ adAni(); });
}</code></pre>
<p>在移动端，可以左右滑动，滑动时停止自动滚动，松开之后继续自动滚动。移动端的滑动事件，主要通过<code>touchstart, touchmove, touchend</code>来实现，与pc端的<code>mousedown, mousemove, mouseup</code>类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sX, sL;
$items.on('touchstart', function(e) {
    cancelFrame(timer);
    sX = e.originalEvent.changedTouches[0].pageX;
    sL = $items.scrollLeft();
}).on('touchmove', function(e) {
    var dis = e.originalEvent.changedTouches[0].pageX - sX;
    var nowX = sL - dis;
    if (nowX > target) {
        nowX = 0;
    }
    $items.scrollLeft(nowX);
}).on('touchend', function(e) {
    scrollX = $items.scrollLeft();
    if (scrollX >= target) {
        scrollX = 0;
    }
    adAni();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sX, sL;
$items.on(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    cancelFrame(timer);
    sX = e.originalEvent.changedTouches[<span class="hljs-number">0</span>].pageX;
    sL = $items.scrollLeft();
}).on(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> dis = e.originalEvent.changedTouches[<span class="hljs-number">0</span>].pageX - sX;
    <span class="hljs-keyword">var</span> nowX = sL - dis;
    <span class="hljs-keyword">if</span> (nowX &gt; target) {
        nowX = <span class="hljs-number">0</span>;
    }
    $items.scrollLeft(nowX);
}).on(<span class="hljs-string">'touchend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    scrollX = $items.scrollLeft();
    <span class="hljs-keyword">if</span> (scrollX &gt;= target) {
        scrollX = <span class="hljs-number">0</span>;
    }
    adAni();
})</code></pre>
<p>那么到这里，就已经基本搞定啦。虽然是一个比较简单的小例子，但是其中也包含了一些常用的功能，比如使用<code>requestAnimationFrame</code>来实现运动，移动端的滑动事件等。在这里总结一下分享给大家，有疑问欢迎探讨。</p>
<p>实例地址：<br><a href="http://codepen.io/yangbo5207/pen/reRJVe" rel="nofollow noreferrer" target="_blank">http://codepen.io/yangbo5207/...</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/reRJVe" data-typeid="3">点击预览</button></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
还在为无缝滚动而烦恼？是时候彻底get到这个知识点了

## 原文链接
[https://segmentfault.com/a/1190000005138317](https://segmentfault.com/a/1190000005138317)

