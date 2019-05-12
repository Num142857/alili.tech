---
title: 'JavaScript 进阶知识 - 特效篇(一)' 
date: 2018-12-20 2:30:10
hidden: true
slug: nnoquk8qzy
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623412?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000012623412?w=1920&amp;h=1080" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">JS特效</h1>
<h2 id="articleHeader1">前言</h2>
<p>经过前面几篇文章的讲解，相信大家已经会操作<code>DOM</code>和<code>BOM</code>了。为什么前面要花那么多精力去讲<code>DOM</code>呢？因为在后面的学习、工作中，会大量的使用<code>DOM</code>操作，一个表格需要增、删、改、查，一个图片需要改变大小..等，如果你想要动态的改变这些，必须要学会使用<code>DOM</code>。</p>
<p>为了巩固前面的知识点，并且能够熟练地使用它们，这里单独写了一篇《JavaScript 进阶知识 - 特效篇》。本篇文章作为进阶篇很重要，不单单是对前面知识点的运用，期间也会有大量的新知识点注入，所以希望小伙伴们继续加油，认真阅读。</p>
<p>在本篇文章中主要会讲解一些案例，比如我们平时在页面中碰到的一些特效，一些动画效果。</p>
<p><strong>注意：</strong> 所有的案例都在这里<a href="https://pan.baidu.com/s/1dFHDhp3" rel="nofollow noreferrer" target="_blank">链接: </a> 提取密码密码: <code>70ny</code>，文章中的每个案例后面都有对应的序号。</p>
<h2 id="articleHeader2">1. offset 系列</h2>
<blockquote>
<code>offset</code>系列用于用于获取元素自身的大小和位置，在网页特效中有广泛应用。<code>offset</code>系列主要有：<code>offsetHeight</code>、<code>offsetWidth</code>、<code>offsetParent</code>、<code>offsetLeft</code>、<code>offsetTop</code>。</blockquote>
<h3 id="articleHeader3">1.1 offsetWidth 和 offsetHeight</h3>
<blockquote>
<code>offsetWidth</code> 和 <code>offsetHeight</code>获取的是元素的真实宽高</blockquote>
<ul>
<li>获取的是元素真实的高度和宽度</li>
<li>获取到的是数值类型，方便计算</li>
<li>
<code>offsetHeight</code>与<code>offsetWidth</code>是只读属性，不能设置。</li>
</ul>
<p><strong>示例代码：获取一个盒子的真实宽高</strong> <em>[01-offset系列-offsetWidth&amp;Height.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    div {
        width: 200px;
        height: 100px;
        background-color: pink;
        padding: 10px;
        border: 10px solid salmon;
        margin: 10px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    // offsetWidth是一个通过计算后得到的值， padding + border + width
    console.log(box.offsetWidth);   // 240
    console.log(box.offsetHeight);  // 140
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: pink;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid salmon;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// offsetWidth是一个通过计算后得到的值， padding + border + width</span>
    <span class="hljs-built_in">console</span>.log(box.offsetWidth);   <span class="hljs-comment">// 240</span>
    <span class="hljs-built_in">console</span>.log(box.offsetHeight);  <span class="hljs-comment">// 140</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em><code>offsetWidth</code>是一个通过计算后得到的值， <code>padding</code> + <code>border</code> + <code>width</code></em></p>
<p><strong>思考：</strong> 之前我们不是也可以通过<code>style</code>来获取样式吗？他们有什么不同</p>
<blockquote>
<code>style.height</code>与<code>style.width</code>只能获取到行内样式里的<code>width</code>和<code>height</code>
</blockquote>
<ul>
<li>获取的是字符串类型，还需要转换成数值类型</li>
<li>写在css样式里的宽高是获取不到的，只能获取行内样式</li>
</ul>
<p><strong>总结：</strong></p>
<ul>
<li>设置宽度高度使用<code>style.width</code>与<code>style.height</code>
</li>
<li>获取宽度和高度<code>offsetWidth</code>与<code>offsetHeight</code>
</li>
<li>
<code>offset</code>获取的宽高包括<code>padding</code>、<code>border</code>
</li>
</ul>
<h3 id="articleHeader4">1.2 offsetParent</h3>
<blockquote>
<code>parentNode</code>和<code>offsetParent</code>
</blockquote>
<ul>
<li>
<code>parentNode</code>始终是父元素</li>
<li>
<code>offsetParent</code>是离当前元素最近的定位元素(<code>absolute</code>、<code>relative</code>)，如果没有，那就找<code>body</code>
</li>
</ul>
<p><strong>示例代码：</strong> <em>[02-offset系列-offsetParent.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #father {
        width: 500px;
        height: 500px;
        background-color: #FF9F68;
    }
    
    #son {
        width: 300px;
        height: 300px;
        background-color: #FEFF89;
    }
    
    #grandson {
        width: 100px;
        height: 100px;
        background-color: #AC005D;
        position: absolute;
        left: 100px;
        right: 100px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;father&quot;>
    <div id=&quot;son&quot;>
        <div id=&quot;grandson&quot;></div>
    </div>
</div>

<!-- js 部分 -->
<script>
    var grandSon = document.getElementById(&quot;grandson&quot;);
    // 找父节点  亲爹
    console.log(grandSon.parentNode);           // 返回<div id=&quot;son&quot;></div>
    // 找最近有定位的爹,如果找不到，会找body
    console.log(grandSon.offsetParent);         // 返回<body></body>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#father</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FF9F68</span>;
    }
    
    <span class="hljs-selector-id">#son</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FEFF89</span>;
    }
    
    <span class="hljs-selector-id">#grandson</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#AC005D</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"son"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"grandson"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> grandSon = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"grandson"</span>);
    <span class="hljs-comment">// 找父节点  亲爹</span>
    <span class="hljs-built_in">console</span>.log(grandSon.parentNode);           <span class="hljs-comment">// 返回&lt;div id="son"&gt;&lt;/div&gt;</span>
    <span class="hljs-comment">// 找最近有定位的爹,如果找不到，会找body</span>
    <span class="hljs-built_in">console</span>.log(grandSon.offsetParent);         <span class="hljs-comment">// 返回&lt;body&gt;&lt;/body&gt;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader5">1.3 offsetLeft与offsetTop</h3>
<blockquote>
<code>offsetLeft</code>: 自身左侧到<code>offsetParent</code>左侧的距离：<code>left + margin</code><p><code>offsetTop</code>: 自身顶部到<code>offsetParent</code>顶部的距离 : <code>top + margin</code></p>
</blockquote>
<ul>
<li>元素自身与<code>offsetParent</code>真实的距离</li>
<li>获取到的是数值类型，方便计算</li>
<li>只读属性，只能获取，不能设置</li>
</ul>
<p><strong>示例代码：获取一个盒子距父盒子的距离</strong> <em>[03-offset系列-offsetTop&amp;Left.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #father {
        width: 400px;
        height: 400px;
        background-color: pink;
        position: relative;
        margin-left: 100px;
    }
    
    #son {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        position: absolute;
        left: 100px;
        margin: 20px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;father&quot;>
    <div id=&quot;son&quot;></div>
</div>

<!-- js 部分 -->
<script>
    //offsetLeft与offsetTop
    var son = document.getElementById(&quot;son&quot;);
    console.log(son.offsetLeft);    // 120
    console.log(son.offsetTop);     // 20
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#father</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">background-color</span>: pink;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>;
    }
    
    <span class="hljs-selector-id">#son</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: skyblue;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"son"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//offsetLeft与offsetTop</span>
    <span class="hljs-keyword">var</span> son = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"son"</span>);
    <span class="hljs-built_in">console</span>.log(son.offsetLeft);    <span class="hljs-comment">// 120</span>
    <span class="hljs-built_in">console</span>.log(son.offsetTop);     <span class="hljs-comment">// 20</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>思考：</strong> 之前我们不是也可以通过<code>style</code>来获取样式吗？他们有什么不同</p>
<blockquote>
<code>style.top</code>与<code>style.left</code>只能获取到行内样式里的<code>top</code>和<code>left</code>
</blockquote>
<ul>
<li>获取的是字符串类型，还需要转换成数值类型</li>
<li>写在css样式里的宽高是获取不到的，只能获取行内样式</li>
</ul>
<p><strong>总结：</strong></p>
<ul>
<li>设置定位<code>left/top</code>使用<code>style.left</code>与<code>style.top</code>
</li>
<li>获取定位<code>left/top</code>使用<code>offsetLeft</code>与<code>offsetTop</code>
</li>
<li>
<code>offset</code>获取的位置包括<code>margin</code>
</li>
<li>如果父元素没有定位，获取的就是相对<code>body</code>的</li>
</ul>
<p><strong>一张图看清offset系列</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623413" src="https://static.alili.tech/img/remote/1460000012623413" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">2. 匀速动画框架</h2>
<h3 id="articleHeader7">2.1 匀速动画初体验</h3>
<blockquote>如何让一个物体动起来？动画函数的实现原理其实就是利用间歇定时器每隔一段时间执行一次的原理实现的。</blockquote>
<p><strong>1、让一个物体动起来</strong></p>
<p>点击按钮让一个盒子匀速往右执行一段距离：<em>[04-匀速动画初体验(一).html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    #box {
        width: 100px;
        height: 100px;
        background-color: hotpink;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<button id=&quot;btn&quot;>奔跑吧</button>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var box = document.getElementById('box');

    btn.onclick = function() {
        setInterval(function() {
            // 定义一个距离 相当于每一次要跑的距离 step
            var step = 5;
            // 定义一个当前位置 leader
            var leader = box.offsetLeft;
            // 每次执行的时候 让leader都走step距离
            leader = leader + step;
            // 将距离赋值给box
            box.style.left = leader + &quot;px&quot;;
        // 每15ms 就执行一次 人眼视觉停留 就有动画效果了
        }, 15);
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: hotpink;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>奔跑吧<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 定义一个距离 相当于每一次要跑的距离 step</span>
            <span class="hljs-keyword">var</span> step = <span class="hljs-number">5</span>;
            <span class="hljs-comment">// 定义一个当前位置 leader</span>
            <span class="hljs-keyword">var</span> leader = box.offsetLeft;
            <span class="hljs-comment">// 每次执行的时候 让leader都走step距离</span>
            leader = leader + step;
            <span class="hljs-comment">// 将距离赋值给box</span>
            box.style.left = leader + <span class="hljs-string">"px"</span>;
        <span class="hljs-comment">// 每15ms 就执行一次 人眼视觉停留 就有动画效果了</span>
        }, <span class="hljs-number">15</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623414?w=1298&amp;h=121" src="https://static.alili.tech/img/remote/1460000012623414?w=1298&amp;h=121" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>BUG：</strong> 不知道细心的小伙伴有没有发现两个问题</p>
<ul>
<li>现在执行的时候是不会停下来的，一直往右跑</li>
<li>点击按钮之后再去点击，会发现，按钮点击次数越多，盒子速度越快</li>
</ul>
<p><strong>2、让一个物体动起来，解决bug</strong></p>
<p>我们让盒子运动到<code>500px</code>的位置停下来 <em>[05-匀速动画初体验(二).html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('btn');
var box = document.getElementById('box');
var timer = null;
/**
    为什么会越点越快？
    点击一次就会调用一次定时器，点击的次数越多，调用的就越多
    距离叠加的就会越来越大 视觉效果上看起来就跑的越来越快
    只要在每次点击后，定时器执行前清除上一次定时器，就不会出现越点越快的效果了
*/
btn.onclick = function() {
    // 一进来就清除定时器
    clearInterval(timer);
    timer = setInterval(function() {
        // 定义一个距离 相当于每一次要跑的距离 step
        var step = 5;
        // 定义一个当前位置 leader
        var leader = box.offsetLeft;
        /**
            当移动的位置在500px内的时候，执行动画函数
            否则就清除定时器，让盒子停下来
        */
        if (leader < 500) {
            // 每次执行的时候 让leader都走step距离
            leader = leader + step;
            // 将距离赋值给box
            box.style.left = leader + &quot;px&quot;;
        } else {
            clearInterval(timer);
        }
    }, 15);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
<span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
<span class="hljs-comment">/**
    为什么会越点越快？
    点击一次就会调用一次定时器，点击的次数越多，调用的就越多
    距离叠加的就会越来越大 视觉效果上看起来就跑的越来越快
    只要在每次点击后，定时器执行前清除上一次定时器，就不会出现越点越快的效果了
*/</span>
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 一进来就清除定时器</span>
    clearInterval(timer);
    timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 定义一个距离 相当于每一次要跑的距离 step</span>
        <span class="hljs-keyword">var</span> step = <span class="hljs-number">5</span>;
        <span class="hljs-comment">// 定义一个当前位置 leader</span>
        <span class="hljs-keyword">var</span> leader = box.offsetLeft;
        <span class="hljs-comment">/**
            当移动的位置在500px内的时候，执行动画函数
            否则就清除定时器，让盒子停下来
        */</span>
        <span class="hljs-keyword">if</span> (leader &lt; <span class="hljs-number">500</span>) {
            <span class="hljs-comment">// 每次执行的时候 让leader都走step距离</span>
            leader = leader + step;
            <span class="hljs-comment">// 将距离赋值给box</span>
            box.style.left = leader + <span class="hljs-string">"px"</span>;
        } <span class="hljs-keyword">else</span> {
            clearInterval(timer);
        }
    }, <span class="hljs-number">15</span>);
}</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623415?w=616&amp;h=129" src="https://static.alili.tech/img/remote/1460000012623415?w=616&amp;h=129" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>总结：</strong></p>
<ul>
<li>
<code>setInterval</code>间歇定时器，如果不手动清除，它就会一直运行下去</li>
<li>点击事件触发定时器一定要注意，一进来就清除一次，否则会越点越快</li>
</ul>
<h3 id="articleHeader8">2.2 匀速动画函数封装</h3>
<blockquote>函数需要独立，就不能使用全局变量。<code>timer</code>之前是一个全局变量，如果不独立，页面只有一个定时器在运作。封装的函数里将<code>timer</code>绑定给调用定时器的元素，这样就独立了。</blockquote>
<p><strong>1、封装一个动画函数</strong> <em>[06-封装一个匀速动画函数.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn&quot;>奔跑吧,500</button>
<button id=&quot;btn2&quot;>奔跑吧,1000</button>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var btn2 = document.getElementById('btn2');
    var box = document.getElementById('box');

    /**
        既然是封装的函数，有些不确定的，经常变的元素就要提出来
        比如:  1.每一次改变的距离 num
               2.调用动画的对象 box ==> element  
               3.运动的目标距离 500 ==> target
    */
    // 封装一个动画函数
    function animate(element, target,num) {
        // 一进来就清除定时器
        // 函数需要独立，就不能使用全局变量 所以将timer绑定在element上
        clearInterval(element.timer);
        element.timer = setInterval(function() {
            // 定义一个距离 相当于每一次要跑的距离 step
            var step = num;
            // 定义一个当前位置 leader
            var leader = element.offsetLeft;
            if (leader < target) {
                // 每次执行的时候 让leader都走step距离
                leader = leader + step;
                // 将距离赋值给box
                element.style.left = leader + &quot;px&quot;;
            } else {
                clearInterval(element.timer);
            }
        }, 15);

    }
    // 点击按钮1 移动到500px的位置
    btn.onclick = function() {
        animate(box, 500, 9);
    }

    // 点击按钮2 移动到1000px的位置
    btn2.onclick = function() {
        animate(box, 1000, 5);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>奔跑吧,500<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>奔跑吧,1000<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn2'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-comment">/**
        既然是封装的函数，有些不确定的，经常变的元素就要提出来
        比如:  1.每一次改变的距离 num
               2.调用动画的对象 box ==&gt; element  
               3.运动的目标距离 500 ==&gt; target
    */</span>
    <span class="hljs-comment">// 封装一个动画函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, target,num</span>) </span>{
        <span class="hljs-comment">// 一进来就清除定时器</span>
        <span class="hljs-comment">// 函数需要独立，就不能使用全局变量 所以将timer绑定在element上</span>
        clearInterval(element.timer);
        element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 定义一个距离 相当于每一次要跑的距离 step</span>
            <span class="hljs-keyword">var</span> step = num;
            <span class="hljs-comment">// 定义一个当前位置 leader</span>
            <span class="hljs-keyword">var</span> leader = element.offsetLeft;
            <span class="hljs-keyword">if</span> (leader &lt; target) {
                <span class="hljs-comment">// 每次执行的时候 让leader都走step距离</span>
                leader = leader + step;
                <span class="hljs-comment">// 将距离赋值给box</span>
                element.style.left = leader + <span class="hljs-string">"px"</span>;
            } <span class="hljs-keyword">else</span> {
                clearInterval(element.timer);
            }
        }, <span class="hljs-number">15</span>);

    }
    <span class="hljs-comment">// 点击按钮1 移动到500px的位置</span>
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        animate(box, <span class="hljs-number">500</span>, <span class="hljs-number">9</span>);
    }

    <span class="hljs-comment">// 点击按钮2 移动到1000px的位置</span>
    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        animate(box, <span class="hljs-number">1000</span>, <span class="hljs-number">5</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>注意：</strong> <em>上面的案例我们只是简单的实现了一个动画的封装效果，但是作为一个以后会经常用的函数，上面的代码还有很多需要优化的地方</em></p>
<ul>
<li>1、上面的函数只能往正方向跑，也就是说去到<code>1000</code>，想让它回到<code>500</code>是不好实现的；</li>
<li>2、如果每次走的距离是<code>5</code>，目标距离是<code>500</code>，正好能整除。假如每次走的是<code>9</code>呢？每次走<code>9</code>，是不能被<code>500</code>整除的，所以最后停下里的距离会偏多一点。<span class="img-wrap"><img data-src="/img/remote/1460000012623416" src="https://static.alili.tech/img/remote/1460000012623416" alt="image" title="image" style="cursor: pointer;"></span>
</li>
</ul>
<p><strong>2、封装一个动画函数完整版</strong> <em>[07-封装一个匀速动画函数完整版.html]</em></p>
<ul><li>先说说第二个问题，距离的问题。如果走的距离不能被目标距离整除的话，最后会多出来一点距离，我们可以不用管这个距离，直接在清除定时器，停下里的时候让它的距离等于目标距离。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clearInterval(element.timer);        // 清除前位置在504，直接在下面设置让它位置等于500
element.style.left = target + &quot;px&quot;;  // 500" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">clearInterval(element.timer);        <span class="hljs-comment">// 清除前位置在504，直接在下面设置让它位置等于500</span>
element.style.left = target + <span class="hljs-string">"px"</span>;  <span class="hljs-comment">// 500</span></code></pre>
<ul><li>现在说说第一个问题，盒子到<code>1000</code>的时候不能回到<code>500</code>。假设现在盒子在<code>1000</code>，我们点击<code>按钮1</code>的时候想要让他回到<code>500</code>，这个时候我们可以发现时的<code>leader = 1000</code>，目标距离<code>target为500</code>，就是说当<code>leader&gt;target</code>的时候，盒子是可以往回走的,这时候只要将步数设置为<code>负数</code> ，盒子就是往回跑的。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var leader = element.offsetLeft;
// 当目标距离大于当前位置 说明往正方向走 step的值就是正的
var step = target > leader? 9 : -9;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> leader = element.offsetLeft;
<span class="hljs-comment">// 当目标距离大于当前位置 说明往正方向走 step的值就是正的</span>
<span class="hljs-keyword">var</span> step = target &gt; leader? <span class="hljs-number">9</span> : <span class="hljs-number">-9</span>;</code></pre>
<ul><li>此时就不能再根据 <code>if (leader &lt; target){}, else { clearInterval(element.timer); }</code>去判断，让盒子运动了。这时的判断条件应该是目标距离<code>target</code> 与盒子目前距离<code>leader</code>之间差的绝对值大于等于一步距离<code>step</code>绝对值的时候，让他们执行<code>leader = leader + step;</code>否则的话清除清除定时器，并将最后的距离直接设置为<code>target</code>的距离。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var distance = Math.abs(target - leader);
// 通过判断此时的差如果大于或者等于一步的距离step的时候，就应该执行动画
if (distance >= Math.abs(step)) {
    leader = leader + step;
    element.style.left = leader + &quot;px&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> distance = <span class="hljs-built_in">Math</span>.abs(target - leader);
<span class="hljs-comment">// 通过判断此时的差如果大于或者等于一步的距离step的时候，就应该执行动画</span>
<span class="hljs-keyword">if</span> (distance &gt;= <span class="hljs-built_in">Math</span>.abs(step)) {
    leader = leader + step;
    element.style.left = leader + <span class="hljs-string">"px"</span>;
}</code></pre>
<p><strong>完整代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn&quot;>奔跑吧,500</button>
<button id=&quot;btn2&quot;>奔跑吧,1000</button>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var btn2 = document.getElementById('btn2');
    var box = document.getElementById('box');

    function animate(element, target, num) {
        clearInterval(element.timer);
        element.timer = setInterval(function() {
            var leader = element.offsetLeft;
            // 判断此时每次走的距离，当目标距离大于当前位置 说明往正方向走 step的值就是正的
            var step = target > leader ? num : -num;
            // 获得此时的距离 与目标距离的差的绝对值
            var distance = Math.abs(target - leader);
            // 通过判断此时的差如果大于或者等于一步的距离step的时候，就应该执行动画
            if (distance >= Math.abs(step)) {
                leader = leader + step;
                element.style.left = leader + &quot;px&quot;;
            } else {
                // 否则清除动画，并且将最后的距离设置为target的距离
                clearInterval(element.timer);
                element.style.left = target + &quot;px&quot;;
            }
        }, 15);

    }
    btn.onclick = function() {
        animate(box, 500, 9);
    }

    btn2.onclick = function() {
        animate(box, 1000, 5);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>奔跑吧,500<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>奔跑吧,1000<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn2'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, target, num</span>) </span>{
        clearInterval(element.timer);
        element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> leader = element.offsetLeft;
            <span class="hljs-comment">// 判断此时每次走的距离，当目标距离大于当前位置 说明往正方向走 step的值就是正的</span>
            <span class="hljs-keyword">var</span> step = target &gt; leader ? num : -num;
            <span class="hljs-comment">// 获得此时的距离 与目标距离的差的绝对值</span>
            <span class="hljs-keyword">var</span> distance = <span class="hljs-built_in">Math</span>.abs(target - leader);
            <span class="hljs-comment">// 通过判断此时的差如果大于或者等于一步的距离step的时候，就应该执行动画</span>
            <span class="hljs-keyword">if</span> (distance &gt;= <span class="hljs-built_in">Math</span>.abs(step)) {
                leader = leader + step;
                element.style.left = leader + <span class="hljs-string">"px"</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 否则清除动画，并且将最后的距离设置为target的距离</span>
                clearInterval(element.timer);
                element.style.left = target + <span class="hljs-string">"px"</span>;
            }
        }, <span class="hljs-number">15</span>);

    }
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        animate(box, <span class="hljs-number">500</span>, <span class="hljs-number">9</span>);
    }

    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        animate(box, <span class="hljs-number">1000</span>, <span class="hljs-number">5</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623417?w=1105&amp;h=129" src="https://static.alili.tech/img/remote/1460000012623417?w=1105&amp;h=129" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em>如上，这就是封装的一个完美的动画函数了，下次有需要用到动画的地方，直接引用即可——[ js/animate.js ]</em></p>
<h2 id="articleHeader9">3. 轮播图</h2>
<blockquote>基本上每个网站都会用到轮播图，轮播图的使用可以说是必不可少的。以后我们用的最多的可能是插件，原生的可能并不常用，但是轮播图的原理我们必须知道，并且能够写出来。(之前一次面试就是让我讲出轮播图的具体实现步骤)</blockquote>
<h3 id="articleHeader10">3.1 简单轮播图</h3>
<blockquote>现在我们先来学习下简单的轮播图实现原理。</blockquote>
<p><strong>轮播图样式的特点：</strong></p>
<ul>
<li>
<code>ul</code>要足够的宽，要求能够一行放下所有的<code>li</code>
</li>
<li>父盒子的宽高和图片的宽高一样</li>
<li>父盒子要有一个<code>overflow:hidden</code> ,仅显示一张图片，不多不少</li>
</ul>
<p><em>要求<code>ul</code>很宽很宽，因为所有的<code>li</code>要左浮动，要保证所有的<code>li</code>在一行上显示，定义一个盒子，盒子的宽高要和显示的单张图片宽高一样，然后设置<code>overflow:hidden</code>这样其他的<code>li</code>就会被隐藏在下面，通过改变ul的位置就能实现图片的切换了</em></p>
<p><strong>示例代码：</strong> <em>[08-实现简单的轮播图.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #slide {
        width: 560px;
        height: 315px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
    }
    #slide ul {
        width: 600%;
        position: absolute;
    }
    #slide ul li {
        float: left;
    }
    #slide ul img {
        display: block;
    }
    #slide ol {
        width: 100px;
        height: 14px;
        background-color: rgba(255, 255, 255, .6);
        /* background-color: pink; */
        position: absolute;
        bottom: 14px;
        left: 50%;
        margin-left: -50px;
        border-radius: 7px;
    }
    #slide ol li {
        width: 10px;
        height: 10px;
        float: left;
        background-color: #fff;
        border-radius: 50%;
        margin-top: 2px;
        margin-left: 8.5px;
        cursor: pointer;
    }
    #slide ol li.current {
        background-color: #DF654A;
    }
</style>

<!-- html 部分 -->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>

    <ol>
        <li class=&quot;current&quot;></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ol>
</div>

<!-- js 部分 -->
<script src=&quot;../js/animate.js&quot;></script>
<script>
    var slide = document.getElementById('slide');
    var ul = slide.children[0];
    var ol = slide.children[1];
    // ol 下的 li 小圆点
    var lis = ol.children;
    var imgWidth = slide.offsetWidth;
    // 给所有的小圆点注册点击事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            // 小圆点高亮排他
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = &quot;&quot;;
            }
            this.className = &quot;current&quot;;
            // 点击小圆点，让对应的图片轮播 获取ul要改变的距离
            // 负的表示ul 向左运动 此时小圆点对应的索引乘以盒子的宽度 就是ul要移动的宽度
            var target = -this.index * imgWidth;
            // ul.style.left = target + 'px';
            // 让图片像动画一样慢慢的移过去
            animate(ul, target, 50);
        }

    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600%</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, .6);
        <span class="hljs-comment">/* background-color: pink; */</span>
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7px</span>;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">8.5px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.current</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#DF654A</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/animate.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
    <span class="hljs-keyword">var</span> ul = slide.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> ol = slide.children[<span class="hljs-number">1</span>];
    <span class="hljs-comment">// ol 下的 li 小圆点</span>
    <span class="hljs-keyword">var</span> lis = ol.children;
    <span class="hljs-keyword">var</span> imgWidth = slide.offsetWidth;
    <span class="hljs-comment">// 给所有的小圆点注册点击事件</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 小圆点高亮排他</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                lis[i].className = <span class="hljs-string">""</span>;
            }
            <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"current"</span>;
            <span class="hljs-comment">// 点击小圆点，让对应的图片轮播 获取ul要改变的距离</span>
            <span class="hljs-comment">// 负的表示ul 向左运动 此时小圆点对应的索引乘以盒子的宽度 就是ul要移动的宽度</span>
            <span class="hljs-keyword">var</span> target = -<span class="hljs-keyword">this</span>.index * imgWidth;
            <span class="hljs-comment">// ul.style.left = target + 'px';</span>
            <span class="hljs-comment">// 让图片像动画一样慢慢的移过去</span>
            animate(ul, target, <span class="hljs-number">50</span>);
        }

    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623418?w=579&amp;h=333" src="https://static.alili.tech/img/remote/1460000012623418?w=579&amp;h=333" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>从上面效果图中，我们可以看到，一个最简单的轮播图已经成型了，但是需要去用手点击，而且如果跨点数去点击，会发现图片要一张张滑过去，这里后面我们会优化。</em></p>
<h3 id="articleHeader11">3.2 左右焦点轮播图</h3>
<blockquote>左右焦点轮播图，就是在显示图片的两端添加两个按钮，一个向左，一个向右，点击的时候图片会根据点击的方向滑动。并且当鼠标悬停在显示区域的时候，两个按钮显示。鼠标离开显示区域，，两个按钮隐藏。</blockquote>
<p><strong>示例代码：</strong> <em>[09-左右焦点轮播图.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #slide {
        width: 560px;
        height: 315px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
    }
    
    #slide ul {
        width: 600%;
        position: absolute;
    }
    
    #slide ul li {
        float: left;
    }
    
    #slide ul img {
        display: block;
    }
    
    #slide #arrow {
        display: none;
    }
    
    #slide #arrow #leftArr,
    #slide #arrow #rightArr {
        width: 30px;
        height: 60px;
        background-color: rgba(255, 255, 2550, 0.3);
        position: absolute;
        top: 50%;
        margin-top: -30px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        font: 700 24px/60px &quot;宋体&quot;;
    }
    
    #slide #arrow #leftArr {
        left: 0;
    }
    
    #slide #arrow #rightArr {
        right: 0;
    }
</style>

<!-- html 部分 -->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>

    <div id=&quot;arrow&quot;>
        <a href=&quot;javascript:void(0);&quot; id=&quot;leftArr&quot;>&amp;lt;</a>
        <a href=&quot;javascript:void(0);&quot; id=&quot;rightArr&quot;>&amp;gt;</a>
    </div>
</div>

<!-- js 部分 -->
<script src=&quot;../js/animate.js&quot;></script>
<script>
    var slide = document.getElementById('slide');
    var ul = slide.children[0];
    var lis = ul.children;
    var arrow = document.getElementById('arrow');
    var leftArr = document.getElementById(&quot;leftArr&quot;);
    var rightArr = document.getElementById(&quot;rightArr&quot;);

    var imgWidth = slide.offsetWidth;

    // 给slide注册鼠标经过事件，鼠标经过时 显示arrow
    slide.onmouseover = function() {
        arrow.style.display = &quot;block&quot;;
    };
    // 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow
    slide.onmouseout = function() {
        arrow.style.display = &quot;none&quot;;
    };
    // 点击右箭头
    var count = 0; // 跑出去的张数
    rightArr.onclick = function() {
        // 当这个张数不等于最后一张的时候 执行动画
        if (count < lis.length - 1) {
            count++;
            var target = -count * imgWidth;
            animate(ul, target, 40);
        }
    }
    leftArr.onclick = function() {
        // 当这个张数不等于最后一张的时候 执行动画
        if (count > 0) {
            count--;
            var target = -count * imgWidth;
            animate(ul, target, 40);
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600%</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> {
        <span class="hljs-attribute">display</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span>,
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 2550, 0.3);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">24px</span>/<span class="hljs-number">60px</span> <span class="hljs-string">"宋体"</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"leftArr"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"rightArr"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/animate.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
    <span class="hljs-keyword">var</span> ul = slide.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> lis = ul.children;
    <span class="hljs-keyword">var</span> arrow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'arrow'</span>);
    <span class="hljs-keyword">var</span> leftArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"leftArr"</span>);
    <span class="hljs-keyword">var</span> rightArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"rightArr"</span>);

    <span class="hljs-keyword">var</span> imgWidth = slide.offsetWidth;

    <span class="hljs-comment">// 给slide注册鼠标经过事件，鼠标经过时 显示arrow</span>
    slide.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        arrow.style.display = <span class="hljs-string">"block"</span>;
    };
    <span class="hljs-comment">// 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow</span>
    slide.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        arrow.style.display = <span class="hljs-string">"none"</span>;
    };
    <span class="hljs-comment">// 点击右箭头</span>
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; <span class="hljs-comment">// 跑出去的张数</span>
    rightArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 当这个张数不等于最后一张的时候 执行动画</span>
        <span class="hljs-keyword">if</span> (count &lt; lis.length - <span class="hljs-number">1</span>) {
            count++;
            <span class="hljs-keyword">var</span> target = -count * imgWidth;
            animate(ul, target, <span class="hljs-number">40</span>);
        }
    }
    leftArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 当这个张数不等于最后一张的时候 执行动画</span>
        <span class="hljs-keyword">if</span> (count &gt; <span class="hljs-number">0</span>) {
            count--;
            <span class="hljs-keyword">var</span> target = -count * imgWidth;
            animate(ul, target, <span class="hljs-number">40</span>);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong> </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623419?w=579&amp;h=333" src="https://static.alili.tech/img/remote/1460000012623419?w=579&amp;h=333" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">3.3 无缝轮播图</h3>
<p><em>上图可以看到，当滑到最左边或者最右边的时候，再点击就没有用了，正常的轮播图肯定不是这样的，点击到最后一张后再点击肯定是接着滑动的。下面我们接着看，如何实现一个无缝轮播图</em></p>
<p><strong>示例代码：无缝轮播(可以一直点击)</strong> <em>[10-左右焦点轮播图-无缝滚动.html]</em></p>
<blockquote>何谓无缝滚动？</blockquote>
<p><em>无缝滚动就是图片能够循环切换，就算是最后一张，点击之后也会跳到第一张</em></p>
<p><strong>原理：</strong></p>
<ul>
<li>效果就像上面所说的一样，主要实现原理就是，在最后面一张图片，再加上一张图片，这张图片就是第一张图片</li>
<li>当滑动到最后一张图片的时候(看下图)，此时的视觉效果就是停在第一张图片上</li>
<li>这时只需要在程序上判断，当在最后一张的时候，直接跳到第一张图片即可</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623420" src="https://static.alili.tech/img/remote/1460000012623420" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：无缝滚动的简单原理</strong> <em>[10-无缝滚动原理.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #slide {
        position: relative;
        width: 560px;
        height: 315px;
        border: 6px dashed #CBF078;
        margin: 100px auto;
        overflow: hidden;
    }
    
    #slide ul {
        width: 3360px;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    #slide ul li {
        float: left;
    }
    
    #slide ul li img {
        display: block;
        vertical-align: top;
    }
</style>

<!-- html 部分 -->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;>
        </li>
        <li>
            <img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;>
        </li>
        <li>
            <img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;>
        </li>
        <li>
            <img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;>
        </li>
        <li>
            <img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;>
        </li>
        <!-- 添加一张与第一张一模一样的图片 障眼法 -->
        <li>
            <img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;>
        </li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    var slide = document.getElementById('slide');
    var ul = slide.children[0];
    setInterval(function() {
        // 每次向左移动的距离
        var step = -3;
        // 获取 ul的left的值 是个负值
        var leader = ul.offsetLeft;
        // 定义一个目标距离，这里的目标距离指的是最后一张图片距离左边的left值
        // 图片宽度560 在最后一张距离左边left的位置：-560*5 = -2800
        // 就是说当到达这张图片的时候就应该让  ul.style.left = &quot;0px&quot;;
        var target = -2800;
        // 为什么不直接判断 leader = -2800的时候让ul.style.left = &quot;0px&quot;;？
        // 因为每次走3步 3不能被2800整除，所以leader永远不会等于-2800的
        // 这里直接判断leader此时距左边的距离减去目标距离当这个绝对值大于等于 一步距离的绝对值3的时候让它执行往左运动
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            ul.style.left = leader + &quot;px&quot;;
        // 当不足一步距离的时候说明就是最后一张了，就应该跳到第一张图片了
        } else {
            ul.style.left = &quot;0px&quot;;
        }
    }, 15);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">6px</span> dashed <span class="hljs-number">#CBF078</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">3360px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">vertical-align</span>: top;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 添加一张与第一张一模一样的图片 障眼法 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
    <span class="hljs-keyword">var</span> ul = slide.children[<span class="hljs-number">0</span>];
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 每次向左移动的距离</span>
        <span class="hljs-keyword">var</span> step = <span class="hljs-number">-3</span>;
        <span class="hljs-comment">// 获取 ul的left的值 是个负值</span>
        <span class="hljs-keyword">var</span> leader = ul.offsetLeft;
        <span class="hljs-comment">// 定义一个目标距离，这里的目标距离指的是最后一张图片距离左边的left值</span>
        <span class="hljs-comment">// 图片宽度560 在最后一张距离左边left的位置：-560*5 = -2800</span>
        <span class="hljs-comment">// 就是说当到达这张图片的时候就应该让  ul.style.left = "0px";</span>
        <span class="hljs-keyword">var</span> target = <span class="hljs-number">-2800</span>;
        <span class="hljs-comment">// 为什么不直接判断 leader = -2800的时候让ul.style.left = "0px";？</span>
        <span class="hljs-comment">// 因为每次走3步 3不能被2800整除，所以leader永远不会等于-2800的</span>
        <span class="hljs-comment">// 这里直接判断leader此时距左边的距离减去目标距离当这个绝对值大于等于 一步距离的绝对值3的时候让它执行往左运动</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(leader - target) &gt;= <span class="hljs-built_in">Math</span>.abs(step)) {
            leader = leader + step;
            ul.style.left = leader + <span class="hljs-string">"px"</span>;
        <span class="hljs-comment">// 当不足一步距离的时候说明就是最后一张了，就应该跳到第一张图片了</span>
        } <span class="hljs-keyword">else</span> {
            ul.style.left = <span class="hljs-string">"0px"</span>;
        }
    }, <span class="hljs-number">15</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623421?w=297&amp;h=177" src="https://static.alili.tech/img/remote/1460000012623421?w=297&amp;h=177" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>左右焦点无缝轮播图：</strong> <em>[11-左右焦点无缝轮播图.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #slide {
        width: 560px;
        height: 315px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
    }
    
    #slide ul {
        width: 600%;
        position: absolute;
    }
    
    #slide ul li {
        float: left;
    }
    
    #slide ul img {
        display: block;
    }
    
    #slide #arrow {
        display: none;
    }
    
    #slide #arrow #leftArr,
    #slide #arrow #rightArr {
        width: 30px;
        height: 60px;
        background-color: rgba(255, 255, 2550, 0.3);
        position: absolute;
        top: 50%;
        margin-top: -30px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        font: 700 24px/60px &quot;宋体&quot;;
    }
    
    #slide #arrow #leftArr {
        left: 0;
    }
    
    #slide #arrow #rightArr {
        right: 0;
    }
</style>

<!-- html 部分-->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <!-- 添加一张图片 障眼法 -->
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>

    <div id=&quot;arrow&quot;>
        <a href=&quot;javascript:void(0);&quot; id=&quot;leftArr&quot;>&amp;lt;</a>
        <a href=&quot;javascript:void(0);&quot; id=&quot;rightArr&quot;>&amp;gt;</a>
    </div>
</div>

<!-- js 部分 -->
<script src=&quot;../js/animate.js&quot;></script>
<script>
    var slide = document.getElementById('slide');
    var ul = slide.children[0];
    var lis = ul.children;
    var arrow = document.getElementById('arrow');
    var leftArr = document.getElementById(&quot;leftArr&quot;);
    var rightArr = document.getElementById(&quot;rightArr&quot;);

    var imgWidth = slide.offsetWidth;

    // 给slide注册鼠标经过事件，鼠标经过时 显示arrow
    slide.onmouseover = function() {
        arrow.style.display = &quot;block&quot;;
    };
    // 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow
    slide.onmouseout = function() {
        arrow.style.display = &quot;none&quot;;
    };
    // 点击右箭头
    var count = 0; // 跑出去的张数
    rightArr.onclick = function() {
        // 当这个张数等于最后一张的时候,偷偷摸摸的把最后一张图片换成第一张
        if (count == lis.length - 1) {
            count = 0;
            ul.style.left = 0;
        }
        count++;
        var target = -count * imgWidth;
        animate(ul, target, 40);
    }
    leftArr.onclick = function() {
        // 判断是第一张的时候，偷偷摸摸的把第一张换成最后一张
        if (count == 0) {
            count = lis.length - 1;
            ul.style.left = -count * imgWidth + &quot;px&quot;;
        }
        count--;
        var target = -count * imgWidth;
        animate(ul, target, 40);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600%</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> {
        <span class="hljs-attribute">display</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span>,
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 2550, 0.3);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">24px</span>/<span class="hljs-number">60px</span> <span class="hljs-string">"宋体"</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 添加一张图片 障眼法 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"leftArr"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"rightArr"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/animate.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
    <span class="hljs-keyword">var</span> ul = slide.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> lis = ul.children;
    <span class="hljs-keyword">var</span> arrow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'arrow'</span>);
    <span class="hljs-keyword">var</span> leftArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"leftArr"</span>);
    <span class="hljs-keyword">var</span> rightArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"rightArr"</span>);

    <span class="hljs-keyword">var</span> imgWidth = slide.offsetWidth;

    <span class="hljs-comment">// 给slide注册鼠标经过事件，鼠标经过时 显示arrow</span>
    slide.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        arrow.style.display = <span class="hljs-string">"block"</span>;
    };
    <span class="hljs-comment">// 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow</span>
    slide.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        arrow.style.display = <span class="hljs-string">"none"</span>;
    };
    <span class="hljs-comment">// 点击右箭头</span>
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; <span class="hljs-comment">// 跑出去的张数</span>
    rightArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 当这个张数等于最后一张的时候,偷偷摸摸的把最后一张图片换成第一张</span>
        <span class="hljs-keyword">if</span> (count == lis.length - <span class="hljs-number">1</span>) {
            count = <span class="hljs-number">0</span>;
            ul.style.left = <span class="hljs-number">0</span>;
        }
        count++;
        <span class="hljs-keyword">var</span> target = -count * imgWidth;
        animate(ul, target, <span class="hljs-number">40</span>);
    }
    leftArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 判断是第一张的时候，偷偷摸摸的把第一张换成最后一张</span>
        <span class="hljs-keyword">if</span> (count == <span class="hljs-number">0</span>) {
            count = lis.length - <span class="hljs-number">1</span>;
            ul.style.left = -count * imgWidth + <span class="hljs-string">"px"</span>;
        }
        count--;
        <span class="hljs-keyword">var</span> target = -count * imgWidth;
        animate(ul, target, <span class="hljs-number">40</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623422?w=567&amp;h=333" src="https://static.alili.tech/img/remote/1460000012623422?w=567&amp;h=333" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">3.4 完整版轮播图</h3>
<blockquote>前面我们已经可以通过点击对应的小点、左右焦点和无缝滚动来实现轮播图了，不过都是单独分开来的，现在我们做个整合，实现一个完整的轮播图。</blockquote>
<p><strong>功能概述：</strong></p>
<ul>
<li>
<p>简单轮播功能</p>
<ul>
<li>给<code>circle</code>下的所有的li注册点击事件</li>
<li>排他</li>
<li>移动<code>Ul</code>
</li>
</ul>
</li>
<li>
<p>左右焦点功能</p>
<ul><li>需要定义一个变量<code>count</code>来记录移动的图片的张数。</li></ul>
</li>
<li>
<p>点击右箭头功能</p>
<ul>
<li>如果当前图片是最后一张（假图片），需要瞬间变成真图片</li>
<li>点击一次，需要让图片往右移动一张</li>
<li>同步小圆点，干掉所有小圆点，复活对应<code>count</code>的小圆点。</li>
<li>最后一张假图片对应的小圆点是第一个，需要做特殊处理</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="点击左箭头的功能和右箭头基本一致。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>点击左箭头的功能和右箭头基本一致。
</code></pre>
<ul>
<li>
<p>自动轮播的功能</p>
<ul>
<li>开启定时器，每隔两秒点击一次右箭头</li>
<li>鼠标经过盒子，停止定时器(箭头乱闪的问题解释)<em>触发事件的一定要是外面的大盒子，不能是<code>ul</code>，如果给<code>ul</code>注册事件，就会出现乱闪的问题</em>
</li>
<li>鼠标离开盒子，开启定时器</li>
</ul>
</li>
<li>
<p>同步功能</p>
<ul>
<li>点击小圆点时需要同步</li>
<li>淘宝<code>bug</code>解决方法(当一圈过后回到第一个小圆点的时候，再点击它会发现他会再跑一圈)</li>
</ul>
</li>
<li>淘宝bug图：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623423?w=567&amp;h=333" src="https://static.alili.tech/img/remote/1460000012623423?w=567&amp;h=333" alt="淘宝bug" title="淘宝bug" style="cursor: pointer;"></span></p>
<p><strong>完整代码：</strong> <em>[12-完整版轮播图.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #slide {
        width: 560px;
        height: 315px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
    }
    
    #slide ul {
        width: 600%;
        position: absolute;
    }
    
    #slide ul li {
        float: left;
    }
    
    #slide ul img {
        display: block;
    }
    
    #slide #arrow {
        display: none;
    }
    
    #slide #arrow #leftArr,
    #slide #arrow #rightArr {
        width: 30px;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 50%;
        margin-top: -30px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        font: 700 24px/60px &quot;宋体&quot;;
    }
    
    #slide #arrow #leftArr {
        left: 0;
    }
    
    #slide #arrow #rightArr {
        right: 0;
    }
    
    #slide ol {
        width: 100px;
        height: 14px;
        background-color: rgba(255, 255, 255, .6);
        /* background-color: pink; */
        position: absolute;
        bottom: 14px;
        left: 50%;
        margin-left: -50px;
        border-radius: 7px;
    }
    
    #slide ol li {
        width: 10px;
        height: 10px;
        float: left;
        background-color: #fff;
        border-radius: 50%;
        margin-top: 2px;
        margin-left: 8.5px;
        cursor: pointer;
    }
    
    #slide ol li.current {
        background-color: #DF654A;
    }
</style>

<!--html 部分-->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>
    <!-- 左右箭头 -->
    <div id=&quot;arrow&quot;>
        <a href=&quot;javascript:void(0);&quot; id=&quot;leftArr&quot;>&amp;lt;</a>
        <a href=&quot;javascript:void(0);&quot; id=&quot;rightArr&quot;>&amp;gt;</a>
    </div>
    <!-- 小圆点 -->
    <ol id=&quot;circleOl&quot;>
        <li class=&quot;current&quot;></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ol>
</div>


<script src=&quot;../js/animate.js&quot;></script>
<script>
    // 自执行函数，防止页面其他定时器会受影响
    (function() {
        var slide = document.getElementById('slide');
        var imgUl = slide.children[0];
        var imgLis = imgUl.children;
        var arrow = document.getElementById('arrow');
        var leftArr = document.getElementById(&quot;leftArr&quot;);
        var rightArr = document.getElementById(&quot;rightArr&quot;);
        var circleOl = document.getElementById('circleOl');
        var circleLis = circleOl.children;
        // 获取图片的宽度
        var imgWidth = slide.offsetWidth;
        var timer = null;

        // 点击小圆点改变对应图片
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].index = i;
            circleLis[i].onclick = function() {
                // 小圆点点击的时候高亮排他
                for (var i = 0; i < circleLis.length; i++) {
                    circleLis[i].className = &quot;&quot;;
                }
                this.className = &quot;current&quot;;
                // 淘宝bug：这时还需要判断一下 就是当图片在最后一张假图片的时候，
                // 再去点击第一个小圆点的时候，会出现一个bug，就是图片会轮播一圈再回到这张图片上
                if (count == imgLis.length - 1) {
                    count = 0;
                    imgUl.style.left = 0;
                }
                // 点击小圆点图片要移动
                var target = -this.index * imgWidth;
                // 如果这里不记录一下，当点击小圆点跳到某张图片的时候，再自动播放的时候，
                // 不会接着当前小圆点的位置往后播放，而是接着之前count不变的情况下 继续播放的
                count = this.index;
                animate(imgUl, target, 40);
            }
        }

        // 左右焦点轮播图
        var count = 0; // 跑出去的张数
        rightArr.onclick = function() {
            // 当这个张数等于最后一张（假图片）的时候,偷偷摸摸的把最后一张图片换成第一张
            if (count == imgLis.length - 1) {
                count = 0;
                imgUl.style.left = 0;
            }
            // 点击一次图片向右划动一次
            count++;
            var target = -count * imgWidth;
            animate(imgUl, target, 40);

            //让小圆点跟着动 只要将 count 与小圆点绑定即可
            for (var i = 0; i < circleLis.length; i++) {
                circleLis[i].className = &quot;&quot;;
            }
            // 这里需要判断一下 因为此时最后一张是假图片 小圆点是不能正常跳转到第一个的
            // 当count == 最后一张图片的下标的时候，直接让第一个小圆点亮
            if (count == imgLis.length - 1) {
                circleLis[0].className = &quot;current&quot;;
            } else {
                // 否则其他的下标对应的小圆点高亮
                circleLis[count].className = &quot;current&quot;;
            }
        }
        leftArr.onclick = function() {
            // 判断是第一张的时候，偷偷摸摸的把第一张换成最后一张
            if (count == 0) {
                count = imgLis.length - 1;
                imgUl.style.left = -count * imgWidth + &quot;px&quot;;
            }
            count--;
            var target = -count * imgWidth;
            animate(imgUl, target, 40);

            // 小圆点同步 往左的时候不会出现小圆点不同步的问题
            for (var i = 0; i < circleLis.length; i++) {
                circleLis[i].className = &quot;&quot;;
            }
            circleLis[count].className = &quot;current&quot;;
        }

        timer = setInterval(function() {
            rightArr.onclick();
        }, 2000);
        // 给slide注册鼠标经过事件，鼠标经过时 显示arrow
        slide.onmouseover = function() {
            arrow.style.display = &quot;block&quot;;
            // 鼠标经过图片的时候清除定时器，停止轮播
            clearInterval(timer);
        };
        // 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow
        slide.onmouseout = function() {
            arrow.style.display = &quot;none&quot;;
            // 鼠标离开图片的时候开启定时器，自动轮播
            timer = setInterval(function() {
                rightArr.onclick();
            }, 2000);
        };

    })()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600%</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> {
        <span class="hljs-attribute">display</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span>,
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">24px</span>/<span class="hljs-number">60px</span> <span class="hljs-string">"宋体"</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, .6);
        <span class="hljs-comment">/* background-color: pink; */</span>
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7px</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">8.5px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.current</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#DF654A</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!--html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 左右箭头 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"leftArr"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"rightArr"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 小圆点 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circleOl"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/animate.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 自执行函数，防止页面其他定时器会受影响</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
        <span class="hljs-keyword">var</span> imgUl = slide.children[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">var</span> imgLis = imgUl.children;
        <span class="hljs-keyword">var</span> arrow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'arrow'</span>);
        <span class="hljs-keyword">var</span> leftArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"leftArr"</span>);
        <span class="hljs-keyword">var</span> rightArr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"rightArr"</span>);
        <span class="hljs-keyword">var</span> circleOl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'circleOl'</span>);
        <span class="hljs-keyword">var</span> circleLis = circleOl.children;
        <span class="hljs-comment">// 获取图片的宽度</span>
        <span class="hljs-keyword">var</span> imgWidth = slide.offsetWidth;
        <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

        <span class="hljs-comment">// 点击小圆点改变对应图片</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; circleLis.length; i++) {
            circleLis[i].index = i;
            circleLis[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 小圆点点击的时候高亮排他</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; circleLis.length; i++) {
                    circleLis[i].className = <span class="hljs-string">""</span>;
                }
                <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"current"</span>;
                <span class="hljs-comment">// 淘宝bug：这时还需要判断一下 就是当图片在最后一张假图片的时候，</span>
                <span class="hljs-comment">// 再去点击第一个小圆点的时候，会出现一个bug，就是图片会轮播一圈再回到这张图片上</span>
                <span class="hljs-keyword">if</span> (count == imgLis.length - <span class="hljs-number">1</span>) {
                    count = <span class="hljs-number">0</span>;
                    imgUl.style.left = <span class="hljs-number">0</span>;
                }
                <span class="hljs-comment">// 点击小圆点图片要移动</span>
                <span class="hljs-keyword">var</span> target = -<span class="hljs-keyword">this</span>.index * imgWidth;
                <span class="hljs-comment">// 如果这里不记录一下，当点击小圆点跳到某张图片的时候，再自动播放的时候，</span>
                <span class="hljs-comment">// 不会接着当前小圆点的位置往后播放，而是接着之前count不变的情况下 继续播放的</span>
                count = <span class="hljs-keyword">this</span>.index;
                animate(imgUl, target, <span class="hljs-number">40</span>);
            }
        }

        <span class="hljs-comment">// 左右焦点轮播图</span>
        <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; <span class="hljs-comment">// 跑出去的张数</span>
        rightArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当这个张数等于最后一张（假图片）的时候,偷偷摸摸的把最后一张图片换成第一张</span>
            <span class="hljs-keyword">if</span> (count == imgLis.length - <span class="hljs-number">1</span>) {
                count = <span class="hljs-number">0</span>;
                imgUl.style.left = <span class="hljs-number">0</span>;
            }
            <span class="hljs-comment">// 点击一次图片向右划动一次</span>
            count++;
            <span class="hljs-keyword">var</span> target = -count * imgWidth;
            animate(imgUl, target, <span class="hljs-number">40</span>);

            <span class="hljs-comment">//让小圆点跟着动 只要将 count 与小圆点绑定即可</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; circleLis.length; i++) {
                circleLis[i].className = <span class="hljs-string">""</span>;
            }
            <span class="hljs-comment">// 这里需要判断一下 因为此时最后一张是假图片 小圆点是不能正常跳转到第一个的</span>
            <span class="hljs-comment">// 当count == 最后一张图片的下标的时候，直接让第一个小圆点亮</span>
            <span class="hljs-keyword">if</span> (count == imgLis.length - <span class="hljs-number">1</span>) {
                circleLis[<span class="hljs-number">0</span>].className = <span class="hljs-string">"current"</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 否则其他的下标对应的小圆点高亮</span>
                circleLis[count].className = <span class="hljs-string">"current"</span>;
            }
        }
        leftArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 判断是第一张的时候，偷偷摸摸的把第一张换成最后一张</span>
            <span class="hljs-keyword">if</span> (count == <span class="hljs-number">0</span>) {
                count = imgLis.length - <span class="hljs-number">1</span>;
                imgUl.style.left = -count * imgWidth + <span class="hljs-string">"px"</span>;
            }
            count--;
            <span class="hljs-keyword">var</span> target = -count * imgWidth;
            animate(imgUl, target, <span class="hljs-number">40</span>);

            <span class="hljs-comment">// 小圆点同步 往左的时候不会出现小圆点不同步的问题</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; circleLis.length; i++) {
                circleLis[i].className = <span class="hljs-string">""</span>;
            }
            circleLis[count].className = <span class="hljs-string">"current"</span>;
        }

        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            rightArr.onclick();
        }, <span class="hljs-number">2000</span>);
        <span class="hljs-comment">// 给slide注册鼠标经过事件，鼠标经过时 显示arrow</span>
        slide.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            arrow.style.display = <span class="hljs-string">"block"</span>;
            <span class="hljs-comment">// 鼠标经过图片的时候清除定时器，停止轮播</span>
            clearInterval(timer);
        };
        <span class="hljs-comment">// 给slide注册鼠标离开事件，鼠标离开时 隐藏arrow</span>
        slide.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            arrow.style.display = <span class="hljs-string">"none"</span>;
            <span class="hljs-comment">// 鼠标离开图片的时候开启定时器，自动轮播</span>
            timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                rightArr.onclick();
            }, <span class="hljs-number">2000</span>);
        };

    })()</span></code></pre>
<p><em>轮播图的一些功能可能有点绕，写的有可能不太看得懂，有疑惑的小伙伴直接私信我，我会一步步解释给你听的，有什么<code>bug</code>也可以将代码发给我。</em></p>
<p><em>想为后面打下扎实的基础的话，这里一定要多敲几遍，主要要搞明白的是实现的思路，以及一些小<code>bug</code>的解决。这对后面的学习是非常重要的。代码备注可能读起来有些拗口，不懂得小伙伴直接私信给我。</em></p>
<h2 id="articleHeader14">4. 缓动动画框架</h2>
<h3 id="articleHeader15">4.1 缓动动画初体验</h3>
<blockquote>缓动动画，顾名思义，就是越来越慢的运动。</blockquote>
<p>我们先来回顾一下上面匀速动画运动的原理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
    step : 一步的距离
    leader ：当前的距离
    我们可以看到 step在这里一直等于5  不曾改变 所以就是匀速运动
*/
var step = 5;
leader = leader + step;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
    step : 一步的距离
    leader ：当前的距离
    我们可以看到 step在这里一直等于5  不曾改变 所以就是匀速运动
*/</span>
<span class="hljs-keyword">var</span> step = <span class="hljs-number">5</span>;
leader = leader + step;</code></pre>
<p>现在我们再来看下缓动动画的原理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 
    target： 目标距离，盒子运动到什么地方
    step  ： 同样的，还是指每次运动的距离，但是这里的步数是一个变化的量了，
             我们可以看到它会随着leader的增加变得越来越小，这就是缓动动画的原理
    leader： 当前的距离
*/
var step = (target - leader)/10;
leader = leader + step;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 
    target： 目标距离，盒子运动到什么地方
    step  ： 同样的，还是指每次运动的距离，但是这里的步数是一个变化的量了，
             我们可以看到它会随着leader的增加变得越来越小，这就是缓动动画的原理
    leader： 当前的距离
*/</span>
<span class="hljs-keyword">var</span> step = (target - leader)/<span class="hljs-number">10</span>;
leader = leader + step;</code></pre>
<p><strong>示例代码：</strong> <em>[13-缓动动画初体验(一).html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    #box {
        width: 100px;
        height: 100px;
        position: absolute;
        background: orange;
    }
</style>

<!-- html 部分-->
<input type=&quot;button&quot; value=&quot;奔跑吧&quot; id=&quot;btn&quot;>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var btn = document.getElementById('btn');
    var timer = null;

    btn.onclick = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            // 定义一个目标距离
            var target = 600;
            // 获得当前盒子的位置
            var leader = box.offsetLeft;
            // 每次运动的距离
            var step = (target - leader) / 10;
            // leader = leader + step  动起来
            leader += step;
            // 将距离给盒子
            box.style.left = leader + &quot;px&quot;;
            // 当当前距离等于目标距离的时候清除定时器
            if (leader == target) {
                clearInterval(timer);
            }
        }, 15);
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">background</span>: orange;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"奔跑吧"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        clearInterval(timer);
        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 定义一个目标距离</span>
            <span class="hljs-keyword">var</span> target = <span class="hljs-number">600</span>;
            <span class="hljs-comment">// 获得当前盒子的位置</span>
            <span class="hljs-keyword">var</span> leader = box.offsetLeft;
            <span class="hljs-comment">// 每次运动的距离</span>
            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            <span class="hljs-comment">// leader = leader + step  动起来</span>
            leader += step;
            <span class="hljs-comment">// 将距离给盒子</span>
            box.style.left = leader + <span class="hljs-string">"px"</span>;
            <span class="hljs-comment">// 当当前距离等于目标距离的时候清除定时器</span>
            <span class="hljs-keyword">if</span> (leader == target) {
                clearInterval(timer);
            }
        }, <span class="hljs-number">15</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623424?w=702&amp;h=132" src="https://static.alili.tech/img/remote/1460000012623424?w=702&amp;h=132" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>完美了吗？并没有，这里有个小bug：</strong></p>
<p><em>可能会有小伙伴不理解，有问题你上面直接讲一下不就得了，还特地卖关子在下面重新写一遍。我想跟大家说的一点就是，如果在上面我直接告诉你这里有个问题有个bug的话，你一眼看过，可能都不当回事，我在这里拿出来讲一下，相信这个知识点你会记得更深。</em></p>
<p><strong>小bug</strong>：明明设置的是<code>600</code>，怎么会是<code>596.4px</code>呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623425" src="https://static.alili.tech/img/remote/1460000012623425" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>原因：</strong></p>
<ul><li>
<code>offsetLeft</code>获取值的时候，只会获取整数，会对小数部分会四舍五入处理，比如<code>step = (target - leader)/10</code>当<code>step</code>的值出现小数的时候，<code>leader+= step</code>之后，<code>offsetLeft</code>在获取<code>leader</code>位置的时候就会把小数部分四舍五入，这样就会造成最后距离的误差。</li></ul>
<p><strong>解决方法：</strong></p>
<ul><li>对<code>step</code>向上取整处理(<code>Math.ceil()</code>)，保证每一次都至少跑<code>1px</code>的距离,只要不出现小数<code>offsetLeft</code>就不会出现四舍五入。</li></ul>
<p><strong>完整代码：</strong> <em>[14-缓动动画初体验(二).html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = document.getElementById('box');
var btn = document.getElementById('btn');
var timer = null;

btn.onclick = function() {
    clearInterval(timer);
    timer = setInterval(function() {
        // 定义一个目标距离
        var target = 600;
        // 获得当前盒子的位置
        var leader = box.offsetLeft;
        // 每次运动的距离
        var step = (target - leader) / 10;
        // 对step进行向上取整
        step = Math.ceil(step);
        // leader = leader + step  动起来
        leader += step;
        // 将距离给盒子
        box.style.left = leader + &quot;px&quot;;
        // 当当前距离等于目标距离的时候清除定时器
        if (leader == target) {
            clearInterval(timer);
        }
    }, 15);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    clearInterval(timer);
    timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 定义一个目标距离</span>
        <span class="hljs-keyword">var</span> target = <span class="hljs-number">600</span>;
        <span class="hljs-comment">// 获得当前盒子的位置</span>
        <span class="hljs-keyword">var</span> leader = box.offsetLeft;
        <span class="hljs-comment">// 每次运动的距离</span>
        <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
        <span class="hljs-comment">// 对step进行向上取整</span>
        step = <span class="hljs-built_in">Math</span>.ceil(step);
        <span class="hljs-comment">// leader = leader + step  动起来</span>
        leader += step;
        <span class="hljs-comment">// 将距离给盒子</span>
        box.style.left = leader + <span class="hljs-string">"px"</span>;
        <span class="hljs-comment">// 当当前距离等于目标距离的时候清除定时器</span>
        <span class="hljs-keyword">if</span> (leader == target) {
            clearInterval(timer);
        }
    }, <span class="hljs-number">15</span>);
}</code></pre>
<h3 id="articleHeader16">4.2 缓动动画函数封装</h3>
<blockquote>前面匀速动画那里已经讲过封装一个函数的好处与重要性，现在我们将缓动动画也封装成一个函数。</blockquote>
<p><strong>示例代码：</strong> <em>[15-缓动动画函数封装.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    #box {
        width: 100px;
        height: 100px;
        background: orange;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<input type=&quot;button&quot; value=&quot;奔跑吧500&quot; id=&quot;btn1&quot;>
<input type=&quot;button&quot; value=&quot;奔跑吧1000&quot; id=&quot;btn2&quot;>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    var box = document.getElementById('box');
    
    // 缓动动画函数
    /**
        element ： 执行动画元素
        target  ： 目标距离
        num     ： 用来控制动画执行的速度 越大动画执行越慢
    */
    function slowAnimate(element, target, num) {
        // 一进来就要清除定时器，防止越点越快
        clearInterval(element.timer);
        element.timer = setInterval(function() {
            // 获得元素当前位置
            var leader = element.offsetLeft;
            // 定义每次运动的距离
            var step = (target - leader) / num;
            // step可能是小数 所以要取整
            step = Math.ceil(step);
            leader += step;
            // 设置元素的位置
            element.style.left = leader + 'px';
            // 当元素的位置 等于 目标位置的时候 清除定时器
            if (leader == target) {
                clearInterval(element.timer);
            }
        }, 15);
    }
    // 调用缓动动画函数
    btn1.onclick = function() {
        slowAnimate(box, 500, 10);
    }
    // 同样是运动500的距离，我们可以发现从500到1000，明显执行的比从0-500执行的慢
    btn2.onclick = function() {
        slowAnimate(box, 1000, 30);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: orange;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"奔跑吧500"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"奔跑吧1000"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn1'</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn2'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    
    <span class="hljs-comment">// 缓动动画函数</span>
    <span class="hljs-comment">/**
        element ： 执行动画元素
        target  ： 目标距离
        num     ： 用来控制动画执行的速度 越大动画执行越慢
    */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slowAnimate</span>(<span class="hljs-params">element, target, num</span>) </span>{
        <span class="hljs-comment">// 一进来就要清除定时器，防止越点越快</span>
        clearInterval(element.timer);
        element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获得元素当前位置</span>
            <span class="hljs-keyword">var</span> leader = element.offsetLeft;
            <span class="hljs-comment">// 定义每次运动的距离</span>
            <span class="hljs-keyword">var</span> step = (target - leader) / num;
            <span class="hljs-comment">// step可能是小数 所以要取整</span>
            step = <span class="hljs-built_in">Math</span>.ceil(step);
            leader += step;
            <span class="hljs-comment">// 设置元素的位置</span>
            element.style.left = leader + <span class="hljs-string">'px'</span>;
            <span class="hljs-comment">// 当元素的位置 等于 目标位置的时候 清除定时器</span>
            <span class="hljs-keyword">if</span> (leader == target) {
                clearInterval(element.timer);
            }
        }, <span class="hljs-number">15</span>);
    }
    <span class="hljs-comment">// 调用缓动动画函数</span>
    btn1.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        slowAnimate(box, <span class="hljs-number">500</span>, <span class="hljs-number">10</span>);
    }
    <span class="hljs-comment">// 同样是运动500的距离，我们可以发现从500到1000，明显执行的比从0-500执行的慢</span>
    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        slowAnimate(box, <span class="hljs-number">1000</span>, <span class="hljs-number">30</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623426?w=1104&amp;h=132" src="https://static.alili.tech/img/remote/1460000012623426?w=1104&amp;h=132" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>又到了找bug的时候了：</strong></p>
<p><em>上面的代码从<code>0-500</code>，从<code>500-1000</code>都没有问题，经过向上取整后都能到达目标距离：<code>500</code>和<code>1000</code>。但是小伙伴可以看下，当从<code>1000</code>回到<code>500</code>的时候，是正好回到<code>500</code>的吗？答案肯定不是的，为什么呢？</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623427" src="https://static.alili.tech/img/remote/1460000012623427" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><code>step</code>为正数的时候，向上取整是完全没有问题的，但是当从<code>1000</code>到<code>500</code>的时候，<code>step</code>就是负数了，负数向上取整后就会变得更大，比如原本是<code>-33.3</code>，向上取整后就是<code>-33</code>了，<code>-0.3</code>就会舍去，所有就不会到<code>500</code>的位置。</p>
<p><strong>解决方法：</strong> 判断step的正负，为正的时候，向上取整。为负的时候，向下取整。</p>
<p><strong>缓动函数封装完整版：</strong> <em>[16-缓动动画函数封装完整版.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function slowAnimate(element, target, num) {
    // 一进来就要清除定时器，防止越点越快
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // 获得元素当前位置
        var leader = element.offsetLeft;
        // 定义每次运动的距离
        var step = (target - leader) / num;
        //如果step是正数，对step向上取整，
        //如果step是负数，对step向下取整
        // 保证每一次最少都走1px
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        // 设置元素的位置
        element.style.left = leader + 'px';
        // 当元素的位置 等于 目标位置的时候 清除定时器
        if (leader == target) {
            clearInterval(element.timer);
        }
    }, 15);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slowAnimate</span>(<span class="hljs-params">element, target, num</span>) </span>{
    <span class="hljs-comment">// 一进来就要清除定时器，防止越点越快</span>
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获得元素当前位置</span>
        <span class="hljs-keyword">var</span> leader = element.offsetLeft;
        <span class="hljs-comment">// 定义每次运动的距离</span>
        <span class="hljs-keyword">var</span> step = (target - leader) / num;
        <span class="hljs-comment">//如果step是正数，对step向上取整，</span>
        <span class="hljs-comment">//如果step是负数，对step向下取整</span>
        <span class="hljs-comment">// 保证每一次最少都走1px</span>
        step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
        leader += step;
        <span class="hljs-comment">// 设置元素的位置</span>
        element.style.left = leader + <span class="hljs-string">'px'</span>;
        <span class="hljs-comment">// 当元素的位置 等于 目标位置的时候 清除定时器</span>
        <span class="hljs-keyword">if</span> (leader == target) {
            clearInterval(element.timer);
        }
    }, <span class="hljs-number">15</span>);
};</code></pre>
<h3 id="articleHeader17">4.3 获取元素计算后的样式</h3>
<blockquote>获取元素计算后的样式指的是元素经过层叠后真正生效的样式，不管样式写在哪，计算后的样式指的就是最终的样式。</blockquote>
<p>通过<code>style</code>只能获取到写在行内的样式，那么想要获取其他的样式怎么办呢？</p>
<ul><li>js提供了一个方法：<code>window.getComputedStyle(element, null)[attr];</code>，它返回的是一个对象<code>CSSStyleDeclaration</code>，<code>[attr]</code>就是这个对象里面就是计算后的所有的样式的属性名(关联数组取对象的值)。<code>element</code>指的是当前参数，<code>null</code>
</li></ul>
<p>这里可以不用深究-<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle" rel="nofollow noreferrer" target="_blank">官方解释</a>。这个方法需要<code>window</code>调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
    element ：获取样式的当前元素
    null    ：这里可以传一个伪元素，如果不是伪元素的话必须是null
    attr    ：后面可以写具体的属性，比如boderRadius  就会获取这个元素的border-radius样式信息
*/
window.getComputedStyle(element,null)[attr];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
    element ：获取样式的当前元素
    null    ：这里可以传一个伪元素，如果不是伪元素的话必须是null
    attr    ：后面可以写具体的属性，比如boderRadius  就会获取这个元素的border-radius样式信息
*/</span>
<span class="hljs-built_in">window</span>.getComputedStyle(element,<span class="hljs-literal">null</span>)[attr];</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623428?w=484&amp;h=390" src="https://static.alili.tech/img/remote/1460000012623428?w=484&amp;h=390" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：</strong> <em>[17-获取元素计算后的样式.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    div {
        width: 100px;
        height: 100px;
        background: pink;
    }
    #box {
        width: 200px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot; style=&quot;width:300px;&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    console.log(window.getComputedStyle(box, null)); // 打印获得box的各种属性的样式
    // 其中行内样式权重最高，所以最后获得的宽应该是300px
    console.log(window.getComputedStyle(box, null).width); // 300px
    console.log(window.getComputedStyle(box, null).background);
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: pink;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:300px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.getComputedStyle(box, <span class="hljs-literal">null</span>)); <span class="hljs-comment">// 打印获得box的各种属性的样式</span>
    <span class="hljs-comment">// 其中行内样式权重最高，所以最后获得的宽应该是300px</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.getComputedStyle(box, <span class="hljs-literal">null</span>).width); <span class="hljs-comment">// 300px</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.getComputedStyle(box, <span class="hljs-literal">null</span>).background);
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623429" src="https://static.alili.tech/img/remote/1460000012623429" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>兼容性处理：</strong></p>
<ul>
<li>
<code>window.getComputedStyle(element, null)[attr];</code>只适用于现代浏览器中</li>
<li>
<code>IE678</code>有自己的方法：<code>element.currentStyle[attr];</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取元素计算后的样式
function getStyle(element,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(element, null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}

// 注意：调用函数的时候 获取的属性名是一个字符串
alert(getStyle(box, &quot;width&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取元素计算后的样式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">element,attr</span>)</span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.getComputedStyle){
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(element, <span class="hljs-literal">null</span>)[attr];
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> element.currentStyle[attr];
    }
}

<span class="hljs-comment">// 注意：调用函数的时候 获取的属性名是一个字符串</span>
alert(getStyle(box, <span class="hljs-string">"width"</span>));</code></pre>
<p><em>[18-获取元素计算后的样式兼容性处理.html]</em></p>
<p><strong>注意：</strong> 上面的封装函数中，调用的时候，属性名是一个字符串类型。</p>
<h3 id="articleHeader18">4.4 缓动动画修改多个样式</h3>
<blockquote>不管是上面的匀速动画函数，还是这里的缓动动画函数，都只能左右运动，但是一个真正完整的动画函数，只改变左右位置肯定是不够的，我们可能需要改变它的宽高等。在上面一节中，我们知道了如何获取到元素计算后的样式，而且只要是元素有的样式都能获取到，有了这个方法我们就可以让动画去执行更多的事情了。</blockquote>
<p><strong>1、对获取到的样式返回值进行处理：</strong></p>
<blockquote>在上面的一节中，我们可以看到，获取的返回值都是字符串格式，比如获取宽度的时候，返回的是一个<code>"300px"</code>的字符串，因为缓动动画函数里面是需要计算的，这里是个字符串肯定不行，所以我们需要对其进行<code>parseInt</code>取整处理。</blockquote>
<p><em>[19-缓动动画修改多个样式-处理返回值.html]：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}

function animate(element, attr, target) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // getStyle 返回的是样式属性的值 我们用一个变量将它储存起来
        var leader = getStyle(element, attr);
    
        // 因为返回值是一个字符串，并且带有字符px，所以我们对返回值进行取整转换
        leader = parseInt(leader) || 0;  // 这里或 0的目的就是，当parseInt取整失败的话，给一个默认值0
        
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
    
        // 设置指定样式
        element.style[attr] = leader + &quot;px&quot;;
    
        if (leader == target) {
            clearInterval(element.timer);
        }
    }, 15);
}

animate(box, &quot;left&quot;, 800);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">element, attr</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getComputedStyle) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(element, <span class="hljs-literal">null</span>)[attr];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> element.currentStyle[attr];
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, attr, target</span>) </span>{
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// getStyle 返回的是样式属性的值 我们用一个变量将它储存起来</span>
        <span class="hljs-keyword">var</span> leader = getStyle(element, attr);
    
        <span class="hljs-comment">// 因为返回值是一个字符串，并且带有字符px，所以我们对返回值进行取整转换</span>
        leader = <span class="hljs-built_in">parseInt</span>(leader) || <span class="hljs-number">0</span>;  <span class="hljs-comment">// 这里或 0的目的就是，当parseInt取整失败的话，给一个默认值0</span>
        
        <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
        step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
        leader += step;
    
        <span class="hljs-comment">// 设置指定样式</span>
        element.style[attr] = leader + <span class="hljs-string">"px"</span>;
    
        <span class="hljs-keyword">if</span> (leader == target) {
            clearInterval(element.timer);
        }
    }, <span class="hljs-number">15</span>);
}

animate(box, <span class="hljs-string">"left"</span>, <span class="hljs-number">800</span>);</code></pre>
<p><em>上面的代码我们对它的返回值进行了处理，而且还可以对它设置其他的样式，只要单位是<code>px</code>的属性都可以设置。但是这里每次还是只能设置一个样式，下面我们来实现修改多个样式。</em></p>
<p><strong>注意：</strong> <code>leader = parseInt(leader) || 0;</code> "或"上<code>0</code>的目的就是：当有些属性设置的值不是数字的时候，比如：<code>auto</code>，这时候<code>parseInt</code>转换的结果是<code>NaN</code>。当"或"上<code>0</code>之后，转换失败后，<code>leader</code>，就会默认是<code>0</code>。     </p>
<p><strong>2、遍历一个对象：</strong></p>
<blockquote>让我们来复习一下，js基础的时候，我们接触到了对象，并且知道了可以用<code>for..in</code>的方法来遍历对象。我们知道<code>getComputedStyle</code>方法，获取计算后样式的时候，返回的是一个名叫<code>CSSStyleDeclaration</code>的对象，这个对象里面是所有的样式属性，我们想要对这些属性进行多个操作的时候，就可以通过遍历的方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(k in obj){
    // k    ：就是相当于对象的键
    // obj  ：就是需要遍历的对象
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(k <span class="hljs-keyword">in</span> obj){
    <span class="hljs-comment">// k    ：就是相当于对象的键</span>
    <span class="hljs-comment">// obj  ：就是需要遍历的对象</span>
}</code></pre>
<p><strong>3、同时修改多个样式：</strong></p>
<blockquote>同时修改多个样式，就是将要修改的多个属性以对象的形式作为参数传进函数中。</blockquote>
<p><em>[20-缓动动画修改多个样式.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = document.getElementById('box');
var btn = document.getElementById('btn');

// 封装一个函数，element 表示执行动画的元素  obj传的是一个对象，里面可以设置多个属性和值
function animate(element, obj) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // 遍历外部传进来的对象
        for (k in obj) {
            //attr   :  要做动画的样式
            //target :  目标值
            var attr = k;
            var target = obj[k];
            // 获取元素开始时计算后的样式
            var leader = getStyle(element, attr);
            leader = parseInt(leader) || 0;
            // 缓动动画函数原理
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;

            // 给元素设置以样式属性名为attr的值  
            // 这个封装的动画函数只能改值是px单位的样式
            element.style[attr] = leader + &quot;px&quot;;
            if (leader == target) {
                clearInterval(element.timer);
            }
        }
    }, 15);
}

// 处理兼容性
function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}
// 调用函数 设置了五个样式属性
btn.onclick = function() {
    animate(box, {
        width: 200,
        height: 200,
        left: 300,
        top: 300,
        // bprder-radius 应该转为驼峰命名法 并且值只能是100px的格式  不能是百分比
        borderRadius: 100
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);

<span class="hljs-comment">// 封装一个函数，element 表示执行动画的元素  obj传的是一个对象，里面可以设置多个属性和值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, obj</span>) </span>{
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 遍历外部传进来的对象</span>
        <span class="hljs-keyword">for</span> (k <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-comment">//attr   :  要做动画的样式</span>
            <span class="hljs-comment">//target :  目标值</span>
            <span class="hljs-keyword">var</span> attr = k;
            <span class="hljs-keyword">var</span> target = obj[k];
            <span class="hljs-comment">// 获取元素开始时计算后的样式</span>
            <span class="hljs-keyword">var</span> leader = getStyle(element, attr);
            leader = <span class="hljs-built_in">parseInt</span>(leader) || <span class="hljs-number">0</span>;
            <span class="hljs-comment">// 缓动动画函数原理</span>
            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;

            <span class="hljs-comment">// 给元素设置以样式属性名为attr的值  </span>
            <span class="hljs-comment">// 这个封装的动画函数只能改值是px单位的样式</span>
            element.style[attr] = leader + <span class="hljs-string">"px"</span>;
            <span class="hljs-keyword">if</span> (leader == target) {
                clearInterval(element.timer);
            }
        }
    }, <span class="hljs-number">15</span>);
}

<span class="hljs-comment">// 处理兼容性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">element, attr</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getComputedStyle) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(element, <span class="hljs-literal">null</span>)[attr];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> element.currentStyle[attr];
    }
}
<span class="hljs-comment">// 调用函数 设置了五个样式属性</span>
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    animate(box, {
        <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">300</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">300</span>,
        <span class="hljs-comment">// bprder-radius 应该转为驼峰命名法 并且值只能是100px的格式  不能是百分比</span>
        borderRadius: <span class="hljs-number">100</span>
    });
}
</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623430?w=300&amp;h=288" src="https://static.alili.tech/img/remote/1460000012623430?w=300&amp;h=288" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>通过上面封装的函数我们可以改变多个样式，但是效果图中我们可以看到一个问题，就是当到达设定值后，点击按钮还会慢慢的抖动。原因是修改多个样式的时候，所有的样式并不能都到同时达终点。</em></p>
<h3 id="articleHeader19">4.5 缓动动画修复定时器bug</h3>
<blockquote>出现这个bug的原因：在for循环中判断是否到达目标值，到达后就清除定时器，但是我们同时修改了5个样式，可能有的样式到达目标值后就清楚定时器了，但是有的样式还没到达目标值，所以就出现了上面的<code>bug</code>。</blockquote>
<p><strong>解决方法：假设成立法</strong></p>
<ul>
<li>假设成立</li>
<li>想办法推翻假设</li>
<li>如果推翻不了，说明假设成立</li>
</ul>
<p><strong>示例代码：</strong> <em>[21-缓动动画修改多个样式-修复定时器bug.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animate(element, obj) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // 1-假设都到达了终点
        var flag = true;
        for (k in obj) {
            var attr = k;
            var target = obj[k];
            var leader = getStyle(element, attr);
            leader = parseInt(leader) || 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            element.style[attr] = leader + &quot;px&quot;;

            // 2- 必须要等到所有的样式都到达终点才清除定时器
            //    只要有一个样式没有到达设定值，说明假设失败
            if (leader != target) {
                flag = false;
            }
        }
        // 所有的样式都到达终点后 清除定时器
        if (flag) {
            clearInterval(element.timer);
        }
    }, 15);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, obj</span>) </span>{
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 1-假设都到达了终点</span>
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">for</span> (k <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">var</span> attr = k;
            <span class="hljs-keyword">var</span> target = obj[k];
            <span class="hljs-keyword">var</span> leader = getStyle(element, attr);
            leader = <span class="hljs-built_in">parseInt</span>(leader) || <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;
            element.style[attr] = leader + <span class="hljs-string">"px"</span>;

            <span class="hljs-comment">// 2- 必须要等到所有的样式都到达终点才清除定时器</span>
            <span class="hljs-comment">//    只要有一个样式没有到达设定值，说明假设失败</span>
            <span class="hljs-keyword">if</span> (leader != target) {
                flag = <span class="hljs-literal">false</span>;
            }
        }
        <span class="hljs-comment">// 所有的样式都到达终点后 清除定时器</span>
        <span class="hljs-keyword">if</span> (flag) {
            clearInterval(element.timer);
        }
    }, <span class="hljs-number">15</span>);
}</code></pre>
<h3 id="articleHeader20">4.6 缓动动画兼容其它样式属性</h3>
<blockquote>经过前面几小节的学习，我们已经可以实现同时修改多个样式的缓动动画了。但是细心的小伙伴不知道有没有发现，目前只能设置跟<code>px</code>有关系的样式，包括设置<code>border-radiu</code>也不算完善。这是因为我们缓动动画封装的时后，设置的<code>element.style[attr] = leader + "px";</code>，所以只能实现跟<code>px</code>有关的样式。</blockquote>
<p><em>设置兼容其他属性的时候，要注意两点，第一获取的时候要进行判断，设置的时候也要进行判断</em></p>
<p><strong>1、兼容opacity属性：</strong>  <em>[22-缓动动画修改多个样式-兼容opacity.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animate(element, obj) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        var flag = true;
        for (k in obj) {
            var attr = k;
            var target = obj[k];
            // 判断获得的属性是不是“opacity”，是的话单独处理
            var leader;
            // 获得当前值
            if (attr === &quot;opacity&quot;) {
                // 获取的时候是个小数，将它乘以100 运算时不会出现精度丢失
                leader = getStyle(element, attr) * 100 || 1;
            } else {
                leader = getStyle(element, attr);
                leader = parseInt(leader) || 0;
            }

            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            // 赋值
            // 判断是不是opacity属性 是的话 单独赋值
            if (attr === &quot;opacity&quot;) {
                // 因为开始的时候leader扩大了100倍 设置的时候 opacity只能是0-1
                element.style[attr] = leader / 100;
                // opacity 还需要单独处理，因为IE678 不支持opacity 
                element.style.filter = &quot;alpha(opacity=&quot; + leader + &quot;)&quot;;
            } else {
                element.style[attr] = leader + &quot;px&quot;;
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timer);
        }
    }, 15);
}

// 处理获取样式兼容性
function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}

// 调用这个函数
btn.onclick = function() {
    animate(box, {
        width: 200,
        height: 200,
        left: 300,
        top: 300,
        // 这里是按照 0-100 设置不透明度的，因为小数计算的时候会出现精度丢失
        opacity: 50
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, obj</span>) </span>{
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">for</span> (k <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">var</span> attr = k;
            <span class="hljs-keyword">var</span> target = obj[k];
            <span class="hljs-comment">// 判断获得的属性是不是“opacity”，是的话单独处理</span>
            <span class="hljs-keyword">var</span> leader;
            <span class="hljs-comment">// 获得当前值</span>
            <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">"opacity"</span>) {
                <span class="hljs-comment">// 获取的时候是个小数，将它乘以100 运算时不会出现精度丢失</span>
                leader = getStyle(element, attr) * <span class="hljs-number">100</span> || <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                leader = getStyle(element, attr);
                leader = <span class="hljs-built_in">parseInt</span>(leader) || <span class="hljs-number">0</span>;
            }

            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;
            <span class="hljs-comment">// 赋值</span>
            <span class="hljs-comment">// 判断是不是opacity属性 是的话 单独赋值</span>
            <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">"opacity"</span>) {
                <span class="hljs-comment">// 因为开始的时候leader扩大了100倍 设置的时候 opacity只能是0-1</span>
                element.style[attr] = leader / <span class="hljs-number">100</span>;
                <span class="hljs-comment">// opacity 还需要单独处理，因为IE678 不支持opacity </span>
                element.style.filter = <span class="hljs-string">"alpha(opacity="</span> + leader + <span class="hljs-string">")"</span>;
            } <span class="hljs-keyword">else</span> {
                element.style[attr] = leader + <span class="hljs-string">"px"</span>;
            }
            <span class="hljs-keyword">if</span> (leader != target) {
                flag = <span class="hljs-literal">false</span>;
            }
        }
        <span class="hljs-keyword">if</span> (flag) {
            clearInterval(element.timer);
        }
    }, <span class="hljs-number">15</span>);
}

<span class="hljs-comment">// 处理获取样式兼容性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">element, attr</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getComputedStyle) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(element, <span class="hljs-literal">null</span>)[attr];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> element.currentStyle[attr];
    }
}

<span class="hljs-comment">// 调用这个函数</span>
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    animate(box, {
        <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">300</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">300</span>,
        <span class="hljs-comment">// 这里是按照 0-100 设置不透明度的，因为小数计算的时候会出现精度丢失</span>
        opacity: <span class="hljs-number">50</span>
    });
}</code></pre>
<p><strong>2、兼容zIndex属性：</strong> <em>[23-缓动动画修改多个样式-兼容zIndex.html]</em></p>
<blockquote>zIndex这个属性不需要缓动的执行改变层级，直接获得传进来的值设置即可</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 赋值
if (attr === &quot;opacity&quot;) {
    element.style[attr] = leader / 100;
    element.style.filter = &quot;alpha(opacity=&quot; + leader + &quot;)&quot;;
// 判断设置的时候是否是Zindex属性
} else if (attr === &quot;zIndex&quot;) {
    element.style.attr = leader;
} else {
    element.style[attr] = leader + &quot;px&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 赋值</span>
<span class="hljs-keyword">if</span> (attr === <span class="hljs-string">"opacity"</span>) {
    element.style[attr] = leader / <span class="hljs-number">100</span>;
    element.style.filter = <span class="hljs-string">"alpha(opacity="</span> + leader + <span class="hljs-string">")"</span>;
<span class="hljs-comment">// 判断设置的时候是否是Zindex属性</span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">"zIndex"</span>) {
    element.style.attr = leader;
} <span class="hljs-keyword">else</span> {
    element.style[attr] = leader + <span class="hljs-string">"px"</span>;
}</code></pre>
<p><strong>示例代码：</strong> <em>[24-缓动动画淡入淡出效果.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn1.onclick = function() {
    animate(box, {
        opacity: 100
    })
}
btn2.onclick = function() {
    animate(box, {
        opacity: 0
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">btn1.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    animate(box, {
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">100</span>
    })
}
btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    animate(box, {
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>
    })
}</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623431?w=234&amp;h=172" src="https://static.alili.tech/img/remote/1460000012623431?w=234&amp;h=172" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader21">4.7 缓动动画添加回调函数</h3>
<blockquote>程序执行完毕，再次执行的函数。</blockquote>
<p><strong>示例代码：</strong> <em>[25-缓动动画添加回调函数.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = document.getElementById('box');
var btn = document.getElementById('btn');

function animate(element, obj, fn) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        var flag = true;
        for (k in obj) {
            var attr = k;
            var target = obj[k];
            var leader = getStyle(element, attr);
            leader = parseInt(leader) || 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            element.style[attr] = leader + &quot;px&quot;;
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timer);
            // 所有程序执行完毕了，现在可以执行回调函数了
            // 只有传递了回调函数，才能执行，所以这里要判断一下
            if (fn) {
                fn();
            }
            /* fn&amp;&amp;fn(); */
        }
    }, 15);
}

// 处理兼容性
function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}
// 调用函数 
btn.onclick = function() {
    animate(box, {
        left: 600
    }, function() {
        animate(box, {
            top: 500,
            borderRadius: 50
        }, function() {
            animate(box, {
                width: 400,
                borderRadius: 50
            });
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, obj, fn</span>) </span>{
    clearInterval(element.timer);
    element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">for</span> (k <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">var</span> attr = k;
            <span class="hljs-keyword">var</span> target = obj[k];
            <span class="hljs-keyword">var</span> leader = getStyle(element, attr);
            leader = <span class="hljs-built_in">parseInt</span>(leader) || <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;
            element.style[attr] = leader + <span class="hljs-string">"px"</span>;
            <span class="hljs-keyword">if</span> (leader != target) {
                flag = <span class="hljs-literal">false</span>;
            }
        }
        <span class="hljs-keyword">if</span> (flag) {
            clearInterval(element.timer);
            <span class="hljs-comment">// 所有程序执行完毕了，现在可以执行回调函数了</span>
            <span class="hljs-comment">// 只有传递了回调函数，才能执行，所以这里要判断一下</span>
            <span class="hljs-keyword">if</span> (fn) {
                fn();
            }
            <span class="hljs-comment">/* fn&amp;&amp;fn(); */</span>
        }
    }, <span class="hljs-number">15</span>);
}

<span class="hljs-comment">// 处理兼容性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">element, attr</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getComputedStyle) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(element, <span class="hljs-literal">null</span>)[attr];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> element.currentStyle[attr];
    }
}
<span class="hljs-comment">// 调用函数 </span>
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    animate(box, {
        <span class="hljs-attr">left</span>: <span class="hljs-number">600</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        animate(box, {
            <span class="hljs-attr">top</span>: <span class="hljs-number">500</span>,
            <span class="hljs-attr">borderRadius</span>: <span class="hljs-number">50</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            animate(box, {
                <span class="hljs-attr">width</span>: <span class="hljs-number">400</span>,
                <span class="hljs-attr">borderRadius</span>: <span class="hljs-number">50</span>
            });
        });
    });
}</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623432?w=371&amp;h=210" src="https://static.alili.tech/img/remote/1460000012623432?w=371&amp;h=210" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader22">5. 筋斗云案例</h2>
<blockquote>直接看效果图：</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623433?w=840&amp;h=96" src="https://static.alili.tech/img/remote/1460000012623433?w=840&amp;h=96" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em>效果如上图，当我们鼠标经过某一项时，小方块会缓动移过去，当离开列表栏时，小方块会回到最初的位置。当点击某一项时小方块的初始位置就会停留在该项上。</em></p>
<p><strong>示例代码：</strong> <em>[26-筋斗云案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        padding: 0;
        margin: 0;
        background: #333;
    }
    #box {
        width: 800px;
        height: 34px;
        margin: 100px auto;
        background: orange;
        position: relative;
    }
    ul {
        padding: 0 50px;
        height: 34px;
        position: relative;
    }
    #box ul li {
        float: left;
        width: 100px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        list-style: none;
        font-size: 18px;
        font-family: '方正';
        color: #fff;
        cursor: pointer;
    }
    #over {
        position: absolute;
        top: -3px;
        left: 51px;
        width: 100px;
        height: 38px;
        background: orangered;
    }
</style>

<!-- html 部分 -->
<div id='box'>
    <span id='over'></span>
    <ul id='nav'>
        <li>首页</li>
        <li>社区服务</li>
        <li>智慧超市</li>
        <li>便民</li>
        <li>圈子</li>
        <li>活动</li>
        <li>聚优惠</li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    var over = document.getElementById('over');
    var nav = document.getElementById('nav');
    var lis = nav.children;

    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
                // 鼠标经过时移动的距离就是它距离左边的距离
                slowAnimate(over, this.offsetLeft);
            }
            // 设定默认位置，因为第一个选项距离左边为51px距离所以，默认值设置为51
        var staticLeft = 51;
        lis[i].onmouseout = function() {
            // 鼠标离开的时候，要让它回到默认位置
            slowAnimate(over, staticLeft);
        }

        lis[i].onclick = function() {
            // 当点击某一选项的时候，将默认位置设置为此时的位置
            staticLeft = this.offsetLeft;
        }
    }
    // 缓动动画
    function slowAnimate(element, target, num) {
        clearInterval(element.timer);
        element.timer = setInterval(function() {
            var leader = element.offsetLeft;
            // num 不传的话，默认是10
            var step = (target - leader) / (num || 10);
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            element.style.left = leader + 'px';
    
            if (leader == target) {
                clearInterval(element.timer);
            }
        }, 15);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">background</span>: orange;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#box</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">list-style</span>: none;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
        <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'方正'</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-id">#over</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">3px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">51px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">38px</span>;
        <span class="hljs-attribute">background</span>: orangered;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'box'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'over'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'nav'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>社区服务<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>智慧超市<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>便民<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>圈子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>活动<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>聚优惠<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> over = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'over'</span>);
    <span class="hljs-keyword">var</span> nav = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'nav'</span>);
    <span class="hljs-keyword">var</span> lis = nav.children;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        lis[i].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 鼠标经过时移动的距离就是它距离左边的距离</span>
                slowAnimate(over, <span class="hljs-keyword">this</span>.offsetLeft);
            }
            <span class="hljs-comment">// 设定默认位置，因为第一个选项距离左边为51px距离所以，默认值设置为51</span>
        <span class="hljs-keyword">var</span> staticLeft = <span class="hljs-number">51</span>;
        lis[i].onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 鼠标离开的时候，要让它回到默认位置</span>
            slowAnimate(over, staticLeft);
        }

        lis[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当点击某一选项的时候，将默认位置设置为此时的位置</span>
            staticLeft = <span class="hljs-keyword">this</span>.offsetLeft;
        }
    }
    <span class="hljs-comment">// 缓动动画</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slowAnimate</span>(<span class="hljs-params">element, target, num</span>) </span>{
        clearInterval(element.timer);
        element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> leader = element.offsetLeft;
            <span class="hljs-comment">// num 不传的话，默认是10</span>
            <span class="hljs-keyword">var</span> step = (target - leader) / (num || <span class="hljs-number">10</span>);
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;
            element.style.left = leader + <span class="hljs-string">'px'</span>;
    
            <span class="hljs-keyword">if</span> (leader == target) {
                clearInterval(element.timer);
            }
        }, <span class="hljs-number">15</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader23">6. 右下角关闭广告案例</h2>
<blockquote>在网页中经常会出现广告，我们举个例子让关闭广告的时候有一个动画效果。</blockquote>
<p><strong>实现原理：</strong></p>
<ul>
<li>图片其实被切成了两个部分，看到的效果是一张图片，其实是两张。</li>
<li>点击关闭按钮的时候，调用缓动动画函数，将下半部分的盒子高度等于<code>0</code>，所以会出现一个向下的效果</li>
<li>在刚刚的动画函数的回调函数里面继续调用缓动动画，将整个大盒子的宽度等于<code>0</code>，所以出现一个向右的效果</li>
</ul>
<p><strong>示例代码：</strong> <em>[27-右下角关闭广告案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 213px;
        position: fixed;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    
    #close {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: #FFFFFF;
        text-align: center;
    }
    
    .img {
        display: block;
        width: 212px;
        z-index: 99;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div id=&quot;hd&quot;>
        <span id=&quot;close&quot;> x </span>
        <img src=&quot;../image/关闭广告/banna_up.png&quot; class=&quot;img&quot; alt=&quot;&quot; />
    </div>
    <div id=&quot;bt&quot;>
        <img src=&quot;../image/关闭广告/banner_down.png&quot; class=&quot;img&quot; alt=&quot;&quot; />
    </div>
</div>

<!-- js 部分 -->
<script src=&quot;../js/slow-animate-styles.js&quot;></script>
<script>
    var close = document.getElementById('close');
    var box = document.getElementById('box');
    var bt = document.getElementById('bt');

    close.onclick = function() {
        slowAnimateStyles(bt, {
            height: 0
        }, function() {
            slowAnimateStyles(box, {
                width: 0
            });
        });
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">213px</span>;
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    
    <span class="hljs-selector-id">#close</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    
    <span class="hljs-selector-class">.img</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">212px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"hd"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"close"</span>&gt;</span> x <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/关闭广告/banna_up.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bt"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/关闭广告/banner_down.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/slow-animate-styles.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> close = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'close'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> bt = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'bt'</span>);

    close.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        slowAnimateStyles(bt, {
            <span class="hljs-attr">height</span>: <span class="hljs-number">0</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            slowAnimateStyles(box, {
                <span class="hljs-attr">width</span>: <span class="hljs-number">0</span>
            });
        });
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623434?w=229&amp;h=228" src="https://static.alili.tech/img/remote/1460000012623434?w=229&amp;h=228" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader24">7. 手风琴案例</h2>
<blockquote>手风琴效果在网页中用的也特别的多，下面我们会介绍两种实现的方法，当然个人比较偏好第二种。</blockquote>
<p><strong>1、浮动版手风琴</strong></p>
<p><strong>实现原理：</strong></p>
<ul>
<li>用<code>ul，li</code>进行布局，<code>li</code>左浮动，并且设置等分的宽度；</li>
<li>给每个<code>li</code>注册鼠标经过事件，当鼠标经过的时候利用排他原理，将所有的<code>li</code>宽度设置成最小宽度，将当前经过的<code>li</code>宽度设置一个最大宽度；</li>
<li>然后再去设置鼠标离开事件，当鼠标离开时让所有的<code>li</code>再恢复到等分的宽度。</li>
</ul>
<p><strong>示例代码：</strong> <em>[28-手风琴-浮动版.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #box {
        width: 900px;
        height: 441px;
        margin: 100px auto;
        overflow: hidden;
        border-radius: 30px;
    }
    ul {
        /* ul的宽要比外面的盒子大一点，否则在添加动画效果的时候，最后一个li会出现闪动 */
        width: 120%;
        height: 100%;
        overflow: hidden;
    }
    li {
        width: 180px;
        height: 100%;
        float: left;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

<!-- js 部分 -->
<script src=&quot;../js/slow-animate-styles.js&quot;></script>
<script>
    var box = document.getElementById('box');
    var lis = box.getElementsByTagName(&quot;li&quot;);

    for (var i = 0; i < lis.length; i++) {
        // 动态创建img标签
        var img = document.createElement(&quot;img&quot;);
        img.src = &quot;../image/手风琴/&quot; + (i + 1) + &quot;.png&quot;;
        lis[i].appendChild(img);
        // 给所有li注册鼠标经过事件，让当前的li宽度变成 500，其余的li宽度变成100
        lis[i].onmouseover = function() {
            for (var i = 0; i < lis.length; i++) {
                // 先让所有的li宽度变成100
                slowAnimateStyles(lis[i], {
                    width: 100
                });
                // 鼠标当前经过的宽度为500
                slowAnimateStyles(this, {
                    width: 500
                })
            }
        };
        // 当鼠标离开的时候，所以的li 宽度恢复到180px
        lis[i].onmouseout = function() {
            for (var i = 0; i < lis.length; i++) {
                slowAnimateStyles(lis[i], {
                    width: 180
                })
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">900px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">441px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-comment">/* ul的宽要比外面的盒子大一点，否则在添加动画效果的时候，最后一个li会出现闪动 */</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">float</span>: left;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/slow-animate-styles.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> lis = box.getElementsByTagName(<span class="hljs-string">"li"</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        <span class="hljs-comment">// 动态创建img标签</span>
        <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
        img.src = <span class="hljs-string">"../image/手风琴/"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">".png"</span>;
        lis[i].appendChild(img);
        <span class="hljs-comment">// 给所有li注册鼠标经过事件，让当前的li宽度变成 500，其余的li宽度变成100</span>
        lis[i].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                <span class="hljs-comment">// 先让所有的li宽度变成100</span>
                slowAnimateStyles(lis[i], {
                    <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>
                });
                <span class="hljs-comment">// 鼠标当前经过的宽度为500</span>
                slowAnimateStyles(<span class="hljs-keyword">this</span>, {
                    <span class="hljs-attr">width</span>: <span class="hljs-number">500</span>
                })
            }
        };
        <span class="hljs-comment">// 当鼠标离开的时候，所以的li 宽度恢复到180px</span>
        lis[i].onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                slowAnimateStyles(lis[i], {
                    <span class="hljs-attr">width</span>: <span class="hljs-number">180</span>
                })
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623435?w=463&amp;h=227" src="https://static.alili.tech/img/remote/1460000012623435?w=463&amp;h=227" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、定位版手风琴</strong></p>
<p><strong>实现原理：</strong></p>
<ul>
<li>给外部大盒子设置一个与图片大小一致的宽高，并且设置相对定位</li>
<li>还是采用<code>ul，li</code>结构，<code>li</code>设置宽高，与图片大小一致，设置绝对定</li>
<li>动态的给<code>li</code>添加背景图片，因为<code>li</code>绝对定位的原因，此时所有的<code>li</code>都叠在一起</li>
<li>动态的给每个<code>li</code>设置<code>left</code>值(<code>left*i</code>)，这时候<code>li</code>就会依次排开</li>
<li>大盒子还要设置一个<code>overflow-hidden</code>属性，将多余的隐藏掉</li>
<li>给每个<code>li</code>注册鼠标鼠标经过事件，然后根据下面推算出的规律(当前鼠标经过的索引<code>index</code>，他之前包括他自己的<code>left</code>值都是，设定的最小值乘以对应的索引。而他后面的会将设定的最小值乘以对应的索引后再加上<code>450</code>，这里的<code>450</code>不是一个固定值，根据规律找出来的)进行判断，设置各自的<code>left</code>值；</li>
<li>鼠标离开的时候再让所有的盒子恢复到一开始的位置，每个li显示等分的宽度</li>
</ul>
<p>大盒子没有<code>overflow-hidden</code>的时候：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623436" src="https://static.alili.tech/img/remote/1460000012623436" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>画个图，理解一下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623437" src="https://static.alili.tech/img/remote/1460000012623437" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>找规律：</strong></p>
<blockquote>结合上面的图片，我们可以找到一个规律</blockquote>
<ul>
<li>
<p>当鼠标在第1个li上的时候，li下标index为0：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：500px</li>
<li>index：2  left：550px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
<li>
<p>当鼠标在第2个li上的时候，li下标index为1：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：50px</li>
<li>index：2  left：550px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
<li>
<p>当鼠标在第3个li上的时候，li下标index为2：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：50px</li>
<li>index：2  left：100px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
</ul>
<p><em>看出规律了吗？</em></p>
<ul>
<li>当对应li的下标<code>&lt;=</code>鼠标悬停的的下标上的时候<code>left</code>值 是<code>50*i</code>
</li>
<li>当对应li的下标<code>&gt;</code>鼠标悬停的的下标上的时候<code>left</code>值 是<code>50*i + ,450</code>(450不是固定的值，是经过计算出来的)</li>
</ul>
<p><strong>示例代码：</strong> <em>29-手风琴-定位版.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #box {
        width: 700px;
        height: 440px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 30px;
    }
    
    li {
        width: 700px;
        height: 440px;
        position: absolute;
        /* background: yellow; */
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

<!-- js 部分 -->
<script src=&quot;../js/slow-animate-styles.js&quot;></script>
<script>
    var box = document.getElementById('box');
    var lis = box.getElementsByTagName('li');


    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        // 动态添加li的背景图片 因为i下标从0开始，但是图片序号是从1开始 所以jia1
        lis[i].style.backgroundImage = &quot;url(../image/手风琴/&quot; + (i + 1) + &quot;.png)&quot;;
        // 现在都叠在一起，设置left 让他们分开来 700/5 ==> 140px
        lis[i].style.left = 140 * i + &quot;px&quot;;

        // 注册鼠标经过事件，让当前的显示宽度为500，其余的为50
        lis[i].onmouseover = function() {
            for (var i = 0; i < lis.length; i++) {
                // 判断当i小于等于当前鼠标停留的下标的时候，给li的left设置 50*i
                if (i <= this.index) {
                    slowAnimateStyles(lis[i], {
                        left: 50 * i
                    });
                    // 当i大于当前鼠标停留的索引的时候，给后边的li的left设置 50*i + 450 
                } else {
                    slowAnimateStyles(lis[i], {
                        left: 50 * i + 450
                    });
                }
            }
        }

        // 注册鼠标离开事件，让所有的li都恢复到最初的样式
        lis[i].onmouseout = function() {
            for (var i = 0; i < lis.length; i++) {
                slowAnimateStyles(lis[i], {
                    left: 140 * i
                });
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">700px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">440px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">box-sizing</span>: border-box;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
    }
    
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">700px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">440px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-comment">/* background: yellow; */</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/slow-animate-styles.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> lis = box.getElementsByTagName(<span class="hljs-string">'li'</span>);


    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        lis[i].index = i;
        <span class="hljs-comment">// 动态添加li的背景图片 因为i下标从0开始，但是图片序号是从1开始 所以jia1</span>
        lis[i].style.backgroundImage = <span class="hljs-string">"url(../image/手风琴/"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">".png)"</span>;
        <span class="hljs-comment">// 现在都叠在一起，设置left 让他们分开来 700/5 ==&gt; 140px</span>
        lis[i].style.left = <span class="hljs-number">140</span> * i + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// 注册鼠标经过事件，让当前的显示宽度为500，其余的为50</span>
        lis[i].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                <span class="hljs-comment">// 判断当i小于等于当前鼠标停留的下标的时候，给li的left设置 50*i</span>
                <span class="hljs-keyword">if</span> (i &lt;= <span class="hljs-keyword">this</span>.index) {
                    slowAnimateStyles(lis[i], {
                        <span class="hljs-attr">left</span>: <span class="hljs-number">50</span> * i
                    });
                    <span class="hljs-comment">// 当i大于当前鼠标停留的索引的时候，给后边的li的left设置 50*i + 450 </span>
                } <span class="hljs-keyword">else</span> {
                    slowAnimateStyles(lis[i], {
                        <span class="hljs-attr">left</span>: <span class="hljs-number">50</span> * i + <span class="hljs-number">450</span>
                    });
                }
            }
        }

        <span class="hljs-comment">// 注册鼠标离开事件，让所有的li都恢复到最初的样式</span>
        lis[i].onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                slowAnimateStyles(lis[i], {
                    <span class="hljs-attr">left</span>: <span class="hljs-number">140</span> * i
                });
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623438?w=390&amp;h=249" src="https://static.alili.tech/img/remote/1460000012623438?w=390&amp;h=249" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader25">8.旋转木马案例</h2>
<blockquote>旋转木马也叫旋转轮播图，在效果上它就是旋转版的轮播图，但是在实现原理上却一点一不一样</blockquote>
<p><strong>旋转木马原理：</strong></p>
<ul>
<li>利用<code>ul</code>、<code>li</code>方式将图片包裹在<code>li</code>里，并且对每个<code>li</code>的大小、层级、不透明度以及定位的位置设置好</li>
<li>样式上可能比较繁琐，我们将上面的每个参数再以对象的方式存到数组<code>datas</code>中</li>
<li>之前封装过一个缓动动画函数，可以改变层级和不透明度，这里正好用得到</li>
<li>其实抛开上面样式上的细节，旋转木马最核心的就是运用到几个数组常用的方法 <code>pop</code>、<code>unshift</code>、<code>shift</code>、<code>push</code>
</li>
<li>点击右按钮的时候，将<code>datas</code>里的最后一项利用<code>pop</code>删除掉，并且返回这个删除的数据，再将这个数据<code>unshift</code>到数组的最前面。重新遍历数组，执行一遍动画</li>
<li>点击左箭头的时候，将<code>datas</code>里的最前面一项利用<code>shift</code>删除掉，并且返回这个删除的数据，再将这个数据<code>push</code>到数组的最后面。重新遍历数组，执行一遍动画</li>
<li>再给按钮添加一个节流阀，没加之前不停地点击按钮，图片就会不停切换，加上之后，点一次执行完才可以再次点击。</li>
</ul>
<p><strong>示例代码：</strong> <em>[30-旋转木马轮播图案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    body {
        background: #666;
    }
    .wrap {
        width: 1200px;
        margin: 200px auto;
    }
    .slide {
        height: 340px;
        position: relative;
    }
    .slide li {
        position: absolute;
        left: 300px;
        top: 0;
    }
    img {
        width: 100%;
    }
    .arrow {
        opacity: 0;
        position: relative;
        z-index: 99;
        top: 50%;
    }
    .arrow #left,
    .arrow #right {
        width: 40px;
        height: 90px;
        position: absolute;
        top: 50%;
        margin-top: -45px;
        background: url(../image/旋转木马/left.png);
        background-size: cover;
        z-index: 99;
    }
    .arrow #right {
        right: 0;
        background: url(../image/旋转木马/right.png);
        background-size: cover;
    }
</style>

<!-- html 部分 -->
<div class=&quot;wrap&quot; id=&quot;wrap&quot;>
    <div class=&quot;slide&quot; id=&quot;slide&quot;>
        <ul>
            <li><img src=&quot;../image/1.jpg&quot; alt=&quot;&quot;></li>
            <li><img src=&quot;../image/2.jpg&quot; alt=&quot;&quot;></li>
            <li><img src=&quot;../image/3.jpg&quot; alt=&quot;&quot;></li>
            <li><img src=&quot;../image/4.jpg&quot; alt=&quot;&quot;></li>
            <li><img src=&quot;../image/5.jpg&quot; alt=&quot;&quot;></li>
        </ul>
        <div class=&quot;arrow&quot; id=&quot;arrow&quot;>
            <a href=&quot;javascript:;&quot;><span id=&quot;left&quot;></span></a>
            <a href=&quot;javascript:;&quot;><span id=&quot;right&quot;></span></a>
        </div>
    </div>
</div>

<!-- js 部分 -->
<script src=&quot;../js/slow-animate-styles.js&quot;>
</script>
<script>
    // 将其余四张位置与透明度等信息，存放在一个数组中
    var datas = [{
            &quot;width&quot;: 300,
            &quot;top&quot;: -20,
            &quot;left&quot;: 150,
            &quot;opacity&quot;: 20,
            &quot;zIndex&quot;: 2
        }, //0
        {
            &quot;width&quot;: 500,
            &quot;top&quot;: 30,
            &quot;left&quot;: 50,
            &quot;opacity&quot;: 80,
            &quot;zIndex&quot;: 3
        }, //1
        {
            &quot;width&quot;: 600,
            &quot;top&quot;: 100,
            &quot;left&quot;: 300,
            &quot;opacity&quot;: 100,
            &quot;zIndex&quot;: 4
        }, //2
        {
            &quot;width&quot;: 500,
            &quot;top&quot;: 30,
            &quot;left&quot;: 650,
            &quot;opacity&quot;: 80,
            &quot;zIndex&quot;: 3
        }, //3
        {
            &quot;width&quot;: 300,
            &quot;top&quot;: -20,
            &quot;left&quot;: 750,
            &quot;opacity&quot;: 20,
            &quot;zIndex&quot;: 2
        } //4
    ];

    var slide = document.getElementById('slide');
    var lis = slide.getElementsByTagName('li');
    var arrow = document.getElementById('arrow');
    var left = document.getElementById('left');
    var right = document.getElementById('right');

    // 定义一个节流阀
    var flag = true;

    // 一开始页面刷新的时候，将datas里的数据 动态添加进去
    for (var i = 0; i < lis.length; i++) {
        slowAnimateStyles(lis[i], datas[i]);
    };

    // 鼠标经过的时候 箭头显示
    slide.onmouseover = function() {
        slowAnimateStyles(arrow, {
            opacity: 100
        })
    };

    // 鼠标离开的时候 箭头隐藏
    slide.onmouseout = function() {
        slowAnimateStyles(arrow, {
            opacity: 0
        })
    };

    // 点击右箭头的时候
    // 利用数组的pop 和 unshift方法对数组datas进行操作
    // pop 会删除数组的最后一项，并且返回这一项。 unshift 会在数组的最前添加
    right.onclick = function() {
        // 只有节流阀为true的时候 点击才会执行里面的代码
        if (flag) {
            // 电击后一进来就将节流阀关上，再次点击的时候就不会进来
            flag = false;
            datas.unshift(datas.pop());
            for (var i = 0; i < lis.length; i++) {
                // 点击一次就要动画渲染一次，datas[i]  其实是一个对象
                /*
                    {
                        &quot;width&quot;: 300,
                        &quot;top&quot;: -20,
                        &quot;left&quot;: 150,
                        &quot;opacity&quot;: 20,
                        &quot;zIndex&quot;: 2
                    }
                */
                slowAnimateStyles(lis[i], datas[i], function() {
                    // 当动画执行完，也就是回调函数触发的时候，再将节流阀打开，这样就可以继续点击了
                    flag = true;
                });
            }
        }
    }

    // 点击左箭头
    // 利用数组的 shift 和 push方法对数组datas进行操作
    // shift 会删除数组的第一项，并且返回这一项。 push 会在数组的最后添加
    left.onclick = function() {
        if (flag) {
            flag = false;
            datas.push(datas.shift());
            for (var i = 0; i < lis.length; i++) {
                slowAnimateStyles(lis[i], datas[i], function() {
                    flag = true;
                });
            }
        }

    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#666</span>;
    }
    <span class="hljs-selector-class">.wrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span> auto;
    }
    <span class="hljs-selector-class">.slide</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">340px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.slide</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.arrow</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    }
    <span class="hljs-selector-class">.arrow</span> <span class="hljs-selector-id">#left</span>,
    <span class="hljs-selector-class">.arrow</span> <span class="hljs-selector-id">#right</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">90px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">45px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/旋转木马/left.png);
        <span class="hljs-attribute">background-size</span>: cover;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
    }
    <span class="hljs-selector-class">.arrow</span> <span class="hljs-selector-id">#right</span> {
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/旋转木马/right.png);
        <span class="hljs-attribute">background-size</span>: cover;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/slow-animate-styles.js"</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 将其余四张位置与透明度等信息，存放在一个数组中</span>
    <span class="hljs-keyword">var</span> datas = [{
            <span class="hljs-string">"width"</span>: <span class="hljs-number">300</span>,
            <span class="hljs-string">"top"</span>: <span class="hljs-number">-20</span>,
            <span class="hljs-string">"left"</span>: <span class="hljs-number">150</span>,
            <span class="hljs-string">"opacity"</span>: <span class="hljs-number">20</span>,
            <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">2</span>
        }, <span class="hljs-comment">//0</span>
        {
            <span class="hljs-string">"width"</span>: <span class="hljs-number">500</span>,
            <span class="hljs-string">"top"</span>: <span class="hljs-number">30</span>,
            <span class="hljs-string">"left"</span>: <span class="hljs-number">50</span>,
            <span class="hljs-string">"opacity"</span>: <span class="hljs-number">80</span>,
            <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">3</span>
        }, <span class="hljs-comment">//1</span>
        {
            <span class="hljs-string">"width"</span>: <span class="hljs-number">600</span>,
            <span class="hljs-string">"top"</span>: <span class="hljs-number">100</span>,
            <span class="hljs-string">"left"</span>: <span class="hljs-number">300</span>,
            <span class="hljs-string">"opacity"</span>: <span class="hljs-number">100</span>,
            <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">4</span>
        }, <span class="hljs-comment">//2</span>
        {
            <span class="hljs-string">"width"</span>: <span class="hljs-number">500</span>,
            <span class="hljs-string">"top"</span>: <span class="hljs-number">30</span>,
            <span class="hljs-string">"left"</span>: <span class="hljs-number">650</span>,
            <span class="hljs-string">"opacity"</span>: <span class="hljs-number">80</span>,
            <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">3</span>
        }, <span class="hljs-comment">//3</span>
        {
            <span class="hljs-string">"width"</span>: <span class="hljs-number">300</span>,
            <span class="hljs-string">"top"</span>: <span class="hljs-number">-20</span>,
            <span class="hljs-string">"left"</span>: <span class="hljs-number">750</span>,
            <span class="hljs-string">"opacity"</span>: <span class="hljs-number">20</span>,
            <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">2</span>
        } <span class="hljs-comment">//4</span>
    ];

    <span class="hljs-keyword">var</span> slide = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slide'</span>);
    <span class="hljs-keyword">var</span> lis = slide.getElementsByTagName(<span class="hljs-string">'li'</span>);
    <span class="hljs-keyword">var</span> arrow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'arrow'</span>);
    <span class="hljs-keyword">var</span> left = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'left'</span>);
    <span class="hljs-keyword">var</span> right = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'right'</span>);

    <span class="hljs-comment">// 定义一个节流阀</span>
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// 一开始页面刷新的时候，将datas里的数据 动态添加进去</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        slowAnimateStyles(lis[i], datas[i]);
    };

    <span class="hljs-comment">// 鼠标经过的时候 箭头显示</span>
    slide.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        slowAnimateStyles(arrow, {
            <span class="hljs-attr">opacity</span>: <span class="hljs-number">100</span>
        })
    };

    <span class="hljs-comment">// 鼠标离开的时候 箭头隐藏</span>
    slide.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        slowAnimateStyles(arrow, {
            <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>
        })
    };

    <span class="hljs-comment">// 点击右箭头的时候</span>
    <span class="hljs-comment">// 利用数组的pop 和 unshift方法对数组datas进行操作</span>
    <span class="hljs-comment">// pop 会删除数组的最后一项，并且返回这一项。 unshift 会在数组的最前添加</span>
    right.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 只有节流阀为true的时候 点击才会执行里面的代码</span>
        <span class="hljs-keyword">if</span> (flag) {
            <span class="hljs-comment">// 电击后一进来就将节流阀关上，再次点击的时候就不会进来</span>
            flag = <span class="hljs-literal">false</span>;
            datas.unshift(datas.pop());
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                <span class="hljs-comment">// 点击一次就要动画渲染一次，datas[i]  其实是一个对象</span>
                <span class="hljs-comment">/*
                    {
                        "width": 300,
                        "top": -20,
                        "left": 150,
                        "opacity": 20,
                        "zIndex": 2
                    }
                */</span>
                slowAnimateStyles(lis[i], datas[i], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 当动画执行完，也就是回调函数触发的时候，再将节流阀打开，这样就可以继续点击了</span>
                    flag = <span class="hljs-literal">true</span>;
                });
            }
        }
    }

    <span class="hljs-comment">// 点击左箭头</span>
    <span class="hljs-comment">// 利用数组的 shift 和 push方法对数组datas进行操作</span>
    <span class="hljs-comment">// shift 会删除数组的第一项，并且返回这一项。 push 会在数组的最后添加</span>
    left.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (flag) {
            flag = <span class="hljs-literal">false</span>;
            datas.push(datas.shift());
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                slowAnimateStyles(lis[i], datas[i], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    flag = <span class="hljs-literal">true</span>;
                });
            }
        }

    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623439?w=626&amp;h=293" src="https://static.alili.tech/img/remote/1460000012623439?w=626&amp;h=293" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000012575816">上一篇：JavaScript 基础知识 - BOM篇</a><br><a href="https://segmentfault.com/a/1190000012623554" target="_blank">下一篇：JavaScript 进阶知识 - 特效篇(二)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 进阶知识 - 特效篇(一)

## 原文链接
[https://segmentfault.com/a/1190000012623407](https://segmentfault.com/a/1190000012623407)

