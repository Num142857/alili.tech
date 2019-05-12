---
title: '使用 Chrome Timeline 来优化页面性能' 
date: 2019-02-06 2:30:08
hidden: true
slug: y2zembbxyip
categories: [reprint]
---

{{< raw >}}

                    
<p>有时候，我们就是会不由自主地写出一些低效的代码，严重影响页面运行的效率。或者我们接手的项目中，前人写出来的代码千奇百怪，比如为了一个 Canvas 特效需要同时绘制 600 个三角形，又比如 <a href="https://coding.net" rel="nofollow noreferrer" target="_blank">Coding.net</a> 的任务中心需要同时 watch 上万个变量的变化等等。那么，如果我们遇到了一个比较低效的页面，应该如何去优化它呢？</p>
<h3 id="articleHeader0">优化前的准备：知己知彼</h3>
<p>在一切开始之前，我们先打开 F12 面板，熟悉一下我们接下来要用到的工具：Timeline：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/2.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/2.png" alt="2" title="2" style="cursor: pointer;"></span></p>
<p>嗯没错就是它。下面逐一介绍一下吧。区域 1 是一个缩略图，可以看到除了时间轴以外被上下分成了四块，分别代表 FPS、CPU 时间、网络通信时间、堆栈占用；这个缩略图可以横向缩放，白色区域是下面可以看到的时间段（灰色当然是不可见的啦）。区域 2 可以看一些交互事件，例如你滚动了一下页面，那么这里会出现一个 scroll 的线段，线段覆盖的范围就是滚动经过的时间。区域 3 则是具体的事件列表了。</p>
<p>一开始没有记录的时候，所有的区域都是空的。开始统计和结束统计都很简单，左上角那坨黑色的圆圈就是。它右边那个长得像“禁止通行”的按钮是用来清除现有记录的。当有数据的时候，我们把鼠标滚轮向上滚，可以看到区域被放大了：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/3.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/3.png" alt="3" title="3" style="cursor: pointer;"></span></p>
<p>短短的时间里，浏览器做了这么多事情。对于一般的屏幕，原则上来说一秒要往屏幕上绘制 60 帧，所以理论上讲我们一帧内的计算时间不能超过 16 毫秒，然而浏览器除了执行我们的代码以外，还要干点别的（例如计算 CSS，播放音频……），所以其实我们能用的只有 10~12 毫秒左右。</p>
<p>差不多熟悉操作了，那么就来一下实战吧！假如有一天，你接手了这样一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 一段小动画：点击按钮之后会有一个爆炸的粒子效果 -->
<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>Test</title>
    <style>
        .main {
            position: relative;
            width: 500px;
            height: 500px;
            background: #000;
            overflow: hidden;
        }
        .circle {
            position: absolute;
            border-radius: 50%;
            border: 1px solid #FFF;
            width: 8px;
            height: 8px;
        }
    </style>
</head>
<body>
    <div class=&quot;main&quot;></div>
    <hr>
    <button onclick=&quot;showAnimation()&quot;>点我</button>
    <script src=&quot;jquery.min.js&quot;></script>
    <script src=&quot;animation.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 一段小动画：点击按钮之后会有一个爆炸的粒子效果 --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.main</span> {
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
        }
        <span class="hljs-selector-class">.circle</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"showAnimation()"</span>&gt;</span>点我<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"animation.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// animation.js

// 粒子总数
var COUNT = 500;
// 重力
var G = -0.1;
// 摩擦力
var F = -0.04;

function init() {
    for (var i = 0; i < COUNT; i++) {
        var d = Math.random() * 2 * Math.PI;
        var v = Math.random() * 5;
        var circle = $('<div id=&quot;circle-' + i + '&quot; class=&quot;circle&quot; data-x=&quot;250&quot; data-y=&quot;250&quot; data-d=&quot;' + d + '&quot; data-v=&quot;' + v + '&quot;></div>');
        circle.appendTo($('.main'));
    }
}

function updateCircle() {
    for (var i = 0; i < COUNT; i++) {
        var x = parseFloat($('#circle-' + i).attr('data-x'));
        var y = parseFloat($('#circle-' + i).attr('data-y'));
        var d = parseFloat($('#circle-' + i).attr('data-d'));
        var v = parseFloat($('#circle-' + i).attr('data-v'));
        var vx = v * Math.cos(d);
        var vy = v * Math.sin(d);
        if (Math.abs(vx) < 1e-9) vx = 0;
        // 速度分量改变
        vx += F * Math.cos(d);
        vy += F * Math.sin(d) + G;
        // 计算新速度
        v = Math.sqrt(vx * vx + vy * vy);
        if (vy > 0) d = Math.acos(vx / v);
        else d = -Math.acos(vx / v);
        // 位移分量改变
        x += vx;
        y += vy;
        $('#circle-' + i).attr('data-x', x);
        $('#circle-' + i).attr('data-y', y);
        $('#circle-' + i).attr('data-d', d);
        $('#circle-' + i).attr('data-v', v);
        $('#circle-' + i).css({'top': 400 - y, 'left': x});
    }
}

var interval = null;

function showAnimation() {
    if (interval) clearInterval(interval);
    $('.main').html('');
    init();
    interval = setInterval(updateCircle, 1000 / 60);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// animation.js</span>

<span class="hljs-comment">// 粒子总数</span>
<span class="hljs-keyword">var</span> COUNT = <span class="hljs-number">500</span>;
<span class="hljs-comment">// 重力</span>
<span class="hljs-keyword">var</span> G = <span class="hljs-number">-0.1</span>;
<span class="hljs-comment">// 摩擦力</span>
<span class="hljs-keyword">var</span> F = <span class="hljs-number">-0.04</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; COUNT; i++) {
        <span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI;
        <span class="hljs-keyword">var</span> v = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5</span>;
        <span class="hljs-keyword">var</span> circle = $(<span class="hljs-string">'&lt;div id="circle-'</span> + i + <span class="hljs-string">'" class="circle" data-x="250" data-y="250" data-d="'</span> + d + <span class="hljs-string">'" data-v="'</span> + v + <span class="hljs-string">'"&gt;&lt;/div&gt;'</span>);
        circle.appendTo($(<span class="hljs-string">'.main'</span>));
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateCircle</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; COUNT; i++) {
        <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-x'</span>));
        <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-y'</span>));
        <span class="hljs-keyword">var</span> d = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-d'</span>));
        <span class="hljs-keyword">var</span> v = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-v'</span>));
        <span class="hljs-keyword">var</span> vx = v * <span class="hljs-built_in">Math</span>.cos(d);
        <span class="hljs-keyword">var</span> vy = v * <span class="hljs-built_in">Math</span>.sin(d);
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(vx) &lt; <span class="hljs-number">1e-9</span>) vx = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// 速度分量改变</span>
        vx += F * <span class="hljs-built_in">Math</span>.cos(d);
        vy += F * <span class="hljs-built_in">Math</span>.sin(d) + G;
        <span class="hljs-comment">// 计算新速度</span>
        v = <span class="hljs-built_in">Math</span>.sqrt(vx * vx + vy * vy);
        <span class="hljs-keyword">if</span> (vy &gt; <span class="hljs-number">0</span>) d = <span class="hljs-built_in">Math</span>.acos(vx / v);
        <span class="hljs-keyword">else</span> d = -<span class="hljs-built_in">Math</span>.acos(vx / v);
        <span class="hljs-comment">// 位移分量改变</span>
        x += vx;
        y += vy;
        $(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-x'</span>, x);
        $(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-y'</span>, y);
        $(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-d'</span>, d);
        $(<span class="hljs-string">'#circle-'</span> + i).attr(<span class="hljs-string">'data-v'</span>, v);
        $(<span class="hljs-string">'#circle-'</span> + i).css({<span class="hljs-string">'top'</span>: <span class="hljs-number">400</span> - y, <span class="hljs-string">'left'</span>: x});
    }
}

<span class="hljs-keyword">var</span> interval = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showAnimation</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (interval) clearInterval(interval);
    $(<span class="hljs-string">'.main'</span>).html(<span class="hljs-string">''</span>);
    init();
    interval = setInterval(updateCircle, <span class="hljs-number">1000</span> / <span class="hljs-number">60</span>);
}</code></pre>
<p>效果如下（右上角的 FPS 计数器是 Chrome 调试工具自带的）：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/1.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/1.png" alt="1" title="1" style="cursor: pointer;"></span></p>
<p>只有 10 FPS……10 FPS……坑爹呢这是！</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/4.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/4.png" alt="4" title="4" style="cursor: pointer;"></span></p>
<p>好吧，打开 Timeline，按下记录按钮，点一下页面中的“点我”，稍微过一会儿停止记录，就会得到一些数据。放大一些，对 jQuery 比较熟悉的同学可以看出来，这些大部分是 jQuery 的函数。我们点一下那个 <code>updateCircle</code> 的区块，然后看下面：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/5.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/5.png" alt="5" title="5" style="cursor: pointer;"></span></p>
<p>这里告诉我们，这个函数运行了多久、函数代码在哪儿。我们点一下那个链接，于是就跳到了 Source 页：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/6.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/6.png" alt="6" title="6" style="cursor: pointer;"></span></p>
<p>是不是很震撼，之前这个页面只是用来 Debug 的，没想到现在居然带了精确到行的运行时间统计。当然，这个时间是当前这一行在“刚才我们点击的区块对应的执行时间段”中运行的时间。所以我们就拿最慢的几句话来下手吧！</p>
<h3 id="articleHeader1">优化一：减少 DOM 操作</h3>
<p>看到这几行代码，第一反应是：mdzz。本来 DOM 操作就慢，还要在字符串和 float 之间转来转去。果断改掉！于是用一个单独的数组来存 <code>x</code>、<code>y</code>、<code>d</code>、<code>v</code> 这些属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objects = [];
// 在 init 函数中
objects.push({
    x: 250,
    y: 250,
    d: d,
    v: v
});
// 在 updateCircle 函数中
var x = objects[i].x;
var y = objects[i].y;
var d = objects[i].d;
var v = objects[i].v;
// ….
objects[i].x = x;
objects[i].y = y;
objects[i].d = d;
objects[i].v = v;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> objects = [];
<span class="hljs-comment">// 在 init 函数中</span>
objects.push({
    <span class="hljs-attr">x</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">y</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">d</span>: d,
    <span class="hljs-attr">v</span>: v
});
<span class="hljs-comment">// 在 updateCircle 函数中</span>
<span class="hljs-keyword">var</span> x = objects[i].x;
<span class="hljs-keyword">var</span> y = objects[i].y;
<span class="hljs-keyword">var</span> d = objects[i].d;
<span class="hljs-keyword">var</span> v = objects[i].v;
<span class="hljs-comment">// ….</span>
objects[i].x = x;
objects[i].y = y;
objects[i].d = d;
objects[i].v = v;</code></pre>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/7.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/7.png" alt="7" title="7" style="cursor: pointer;"></span></p>
<p>效果显著！我们再来看一下精确到行的数据：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/8.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/8.png" alt="8" title="8" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">优化二：减少不必要的运算</h3>
<p>所以最耗时的那句话已经变成了计算 <code>vx</code> 和 <code>vy</code>，毕竟三角函数算法比较复杂嘛，可以理解。至于后面的三角函数为什么那么快，我猜可能是 Chrome 的 V8 引擎将其缓存了（这句话不保证正确性）。然而不知道大家有没有发现，其实计算 <code>d</code> 完全没必要！我们只需要存 <code>vx</code> 和 <code>vy</code> 即可，不需要存 <code>v</code> 和 <code>d</code>！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// init
var vx = v * Math.cos(d);
var vy = v * Math.sin(d);
objects.push({
    x: 250,
    y: 250,
    vx: vx,
    vy: vy
});
// updateCircle
var vx = objects[i].vx;
var vy = objects[i].vy;
// 计算新速度
var v = Math.sqrt(vx * vx + vy * vy);
if (Math.abs(vx) < 1e-9) vx = 0;
// 速度分量改变
vx += F * vx / v;
vy += F * vy / v + G;
// ….
objects[i].vx = vx;
objects[i].vy = vy;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// init</span>
<span class="hljs-keyword">var</span> vx = v * <span class="hljs-built_in">Math</span>.cos(d);
<span class="hljs-keyword">var</span> vy = v * <span class="hljs-built_in">Math</span>.sin(d);
objects.push({
    <span class="hljs-attr">x</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">y</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">vx</span>: vx,
    <span class="hljs-attr">vy</span>: vy
});
<span class="hljs-comment">// updateCircle</span>
<span class="hljs-keyword">var</span> vx = objects[i].vx;
<span class="hljs-keyword">var</span> vy = objects[i].vy;
<span class="hljs-comment">// 计算新速度</span>
<span class="hljs-keyword">var</span> v = <span class="hljs-built_in">Math</span>.sqrt(vx * vx + vy * vy);
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(vx) &lt; <span class="hljs-number">1e-9</span>) vx = <span class="hljs-number">0</span>;
<span class="hljs-comment">// 速度分量改变</span>
vx += F * vx / v;
vy += F * vy / v + G;
<span class="hljs-comment">// ….</span>
objects[i].vx = vx;
objects[i].vy = vy;</code></pre>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/9.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/9.png" alt="9" title="9" style="cursor: pointer;"></span></p>
<p>只有加减乘除和开平方运算，每次比原来的时间又少了两毫秒。从流畅的角度来说其实已经可以满帧运行了，然而为什么我还是觉得偶尔会有点卡呢？</p>
<h3 id="articleHeader3">优化三：替换 setInterval</h3>
<p>既然偶尔会掉帧，那么就看看是怎么掉的呗~原则上来说，在每一次浏览器进行绘制之前，Timeline 里面应该有一个叫 Paint 的事件，就像这样：</p>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/10.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/10.png" alt="10" title="10" style="cursor: pointer;"></span></p>
<p>看到这些绿色的东西了没？就是它们！看上面的时间轴，虽然代码中 setInterval 的长度是 1000/16 毫秒，但是其实根本不能保证！所以我们需要使用 <code>requestAnimationFrame</code> 来代替它。这是浏览器自带的专门为动画服务的函数，浏览器会自动优化这个函数的调用时机。并且如果页面被隐藏，浏览器还会自动暂停调用，有效地减少了 CPU 的开销。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在 updateCircle 最后加一句
requestAnimationFrame(updateCircle);
// 去掉全部跟 setInterval 有关的句子，把 showAnimation 最后一句直接改成这个
updateCircle();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在 updateCircle 最后加一句</span>
requestAnimationFrame(updateCircle);
<span class="hljs-comment">// 去掉全部跟 setInterval 有关的句子，把 showAnimation 最后一句直接改成这个</span>
updateCircle();</code></pre>
<p>我们至少可以保证，我们每算一次，屏幕上就会显示一次，因此不会掉帧（前提是每计算一次的时间小于 12ms）。但是虽然计算时间少了，浏览器重计算样式、绘制图像的时间可是一点都没变。能不能再做优化呢？</p>
<h3 id="articleHeader4">优化四：使用硬件加速、避免反复查找元素</h3>
<p>如果我们用 <code>transform</code> 来代替 <code>left</code> 和 <code>top</code> 来对元素进行定位，那么浏览器会为这个元素单独创立一个合成层，专门使用 GPU 进行渲染，这样可以把重计算的代价降到最低。有兴趣的同学可以研究一下“CSS 硬件加速”的机制。同时，我们可以缓存一下 jQuery 的元素（或者 DOM 元素），这样不用每次都重新查找，也能稍微提高一点效率。如果把元素缓存在 <code>objects</code> 数组中，那么连 id 都不用写了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// init
var circle = $('<div class=&quot;circle&quot;></div>');
objects.push({
    x: 250,
    y: 250,
    vx: vx,
    vy: vy,
    // 其实可以只存 DOM，不存 jQuery 对象
    circle: circle[0]
});
// updateCircle 里面 for 循环的最后一句话替换掉
objects[i].circle.style.transform = 'translate(' + x + 'px, ' + (400 - y) + 'px)';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// init</span>
<span class="hljs-keyword">var</span> circle = $(<span class="hljs-string">'&lt;div class="circle"&gt;&lt;/div&gt;'</span>);
objects.push({
    <span class="hljs-attr">x</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">y</span>: <span class="hljs-number">250</span>,
    <span class="hljs-attr">vx</span>: vx,
    <span class="hljs-attr">vy</span>: vy,
    <span class="hljs-comment">// 其实可以只存 DOM，不存 jQuery 对象</span>
    circle: circle[<span class="hljs-number">0</span>]
});
<span class="hljs-comment">// updateCircle 里面 for 循环的最后一句话替换掉</span>
objects[i].circle.style.transform = <span class="hljs-string">'translate('</span> + x + <span class="hljs-string">'px, '</span> + (<span class="hljs-number">400</span> - y) + <span class="hljs-string">'px)'</span>;</code></pre>
<p><span class="img-wrap"><img data-src="https://dn-rexskz.qbox.me/blog/article/timeline/11.png" src="https://static.alili.techhttps://dn-rexskz.qbox.me/blog/article/timeline/11.png" alt="11" title="11" style="cursor: pointer;"></span></p>
<p>看起来是不是很爽了？</p>
<p>其实，优化是无止境的，例如我在 <code>init</code> 函数中完全可以不用 jQuery，改用 <code>createDocumentFragment</code> 来拼接元素，这样初始化的时间就可以急剧缩短；调换 <code>updateCircle</code> 中的几个语句的顺序，在 V8 引擎下效率可能会有一定的提升；甚至还可以结合 Profile 面板来分析内存占用，查看浏览器绘图的细节……然而个人感觉并用不到这么极限的优化。对于一个项目来说，如果单纯为了优化而写一些奇怪的代码，是很不合算的。</p>
<p>—</p>
<p>P.S. 全部的代码在这里，欢迎吐槽：</p>
<p><a href="http://www.rexskz.info/demos/animation/animation.html" rel="nofollow noreferrer" target="_blank">未优化版</a> | <a href="http://www.rexskz.info/demos/animation/optimize.html" rel="nofollow noreferrer" target="_blank">优化版</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Chrome Timeline 来优化页面性能

## 原文链接
[https://segmentfault.com/a/1190000006224653](https://segmentfault.com/a/1190000006224653)

