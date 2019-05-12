---
title: 'JavaScript 进阶知识 - 特效篇(二)' 
date: 2018-12-20 2:30:10
hidden: true
slug: 9x3k49on2u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">9. 三大系列</h2>
<blockquote>本篇一开始我们已经学了三大系列中的<code>offset系列</code>，三大系列分别是<code>offset</code>系列、<code>scroll</code>系列、<code>client</code>系列。学习这些有什么用呢？在后面的特效案例中，会大量的使用到获取元素的宽度、获取元素内部的宽度、获取元素距离顶部的距离等。这时候就需要用到三大系列，下面为大家一一讲解三大系列的用法。</blockquote>
<h3 id="articleHeader1">9.1 offset 系列</h3>
<blockquote>第一章已经讲过了，详见第一章。</blockquote>
<h3 id="articleHeader2">9.2 scroll 系列</h3>
<blockquote>
<code>scroll</code> 是用来获取盒子内容的大小和位置。<code>scroll</code>家族有：<code>scrollWidth</code>、<code>scrollHeight</code>、<code>scrollLeft</code>、<code>scrollTop</code>。</blockquote>
<p><strong>1、onscroll 事件</strong></p>
<blockquote>前面DOM的时候，我们知道了触发事件，这里讲下onscroll事件。</blockquote>
<p><em>对于有滚动条的盒子，可以使用<code>onscroll</code>注册滚动事件，每滚动一像素，就会触发该事件。</em></p>
<p><strong>示例代码：</strong> <em>[31-scroll系列-onscroll事件.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 300px;
        height: 300px;
        border: 2px solid salmon;
        margin: 100px auto;
        /* 当内容超出盒子大小的时候 自动生成滚动条 */
        overflow: auto;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                            ...
                            ...
                            ...
    我是内容我是内容我是内容我是内容我是内容我是内容我是内容
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    box.onscroll = function() {
        console.log(&quot;滚了！滚了&quot;);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid salmon;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-comment">/* 当内容超出盒子大小的时候 自动生成滚动条 */</span>
        <span class="hljs-attribute">overflow</span>: auto;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                            ...
                            ...
                            ...
    我是内容我是内容我是内容我是内容我是内容我是内容我是内容
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    box.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"滚了！滚了"</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmo615g2o6g20fs08wn3d.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmo615g2o6g20fs08wn3d.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2、scrollWidth 和 scrollHeight</strong></p>
<blockquote>
<code>scrollWidth</code>与<code>scrollHeight</code>是盒子内容的真实的宽度和高度。与和盒子大小无关，仅仅与盒子的内容有关系，不包括<code>border</code>、<code>margin</code>，包括<code>padding</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollWidth = padding + width;

// 如果盒子里面的内容超出盒子高度的时候，这里的scrollHeight获取的就是内容的高度了
scrollHeight = padding + height;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">scrollWidth = padding + width;

<span class="hljs-comment">// 如果盒子里面的内容超出盒子高度的时候，这里的scrollHeight获取的就是内容的高度了</span>
scrollHeight = padding + height;</code></pre>
<p><strong>示例代码：</strong> <em>[32-scroll系列-scrollWidth&amp;scrollHeight.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 100px;
        height: 100px;
        border: 10px solid salmon;
        margin: 50px;
        padding: 10px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    杨柳青青江水平，闻郎江上踏歌声。东边日出西边雨，道是无晴却有晴。
    杨柳青青江水平，闻郎江上踏歌声。东边日出西边雨，道是无晴却有晴。
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    console.log(box.scrollWidth);    // 120
    console.log(box.scrollHeight);   // 241 获取的是内容的高度
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid salmon;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    杨柳青青江水平，闻郎江上踏歌声。东边日出西边雨，道是无晴却有晴。
    杨柳青青江水平，闻郎江上踏歌声。东边日出西边雨，道是无晴却有晴。
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-built_in">console</span>.log(box.scrollWidth);    <span class="hljs-comment">// 120</span>
    <span class="hljs-built_in">console</span>.log(box.scrollHeight);   <span class="hljs-comment">// 241 获取的是内容的高度</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong> </p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmo7a2kc7yj20a908uwep.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmo7a2kc7yj20a908uwep.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>如果盒子里面的内容超出盒子高度的时候，这里的<code>scrollHeight</code>获取的就是内容的高度了</em></p>
<p><strong>注意：</strong></p>
<ul>
<li>在现代高版本浏览器中，<code>scrollHeight</code>，在内容没有超度盒子的情况下，获取到的高度是<code>height+padding</code>
</li>
<li>但是在<code>IE8</code>以下的时候，即使内容没有超出盒子，获取到的高度也是内容的高度。这里就不演示了，<code>scrollHeight</code>很少用到。</li>
</ul>
<p><strong>3、scrollTop 和 scrollLeft</strong></p>
<blockquote>
<code>scrollTop</code>是盒子内容被滚动条卷去的头部的高度。<code>scrollLeft</code>是盒子内容被滚动条卷去的左侧的宽度。通常来说，<code>scroll</code>系列用的最多的地方就是用来获取页面被卷去的宽度和高度，非常的常用。</blockquote>
<p><em><code>scrollTop</code> 和 <code>scrollLeft</code>存在兼容性</em></p>
<p><strong>示例代码：</strong> <em>[33-scroll系列-scrollTop&amp;scrollLeft.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        height: 5000px;
    }
</style>

<!-- js 部分 -->
<script>
    // 给页面注册滚动事件
    window.onscroll = function() {
        // 滚动条滚动一次，浏览器就会获取一次被卷去的头部的高度
        // 将高度赋值给title  
        // 获取scrollTop的时候是有兼容性的：现代浏览器用的是 window.pageYOffset
        // IE678 用的是 document.documentElement.scrollTop
        document.title = window.pageYOffset || document.documentElement.scrollTop;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5000px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 给页面注册滚动事件</span>
    <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 滚动条滚动一次，浏览器就会获取一次被卷去的头部的高度</span>
        <span class="hljs-comment">// 将高度赋值给title  </span>
        <span class="hljs-comment">// 获取scrollTop的时候是有兼容性的：现代浏览器用的是 window.pageYOffset</span>
        <span class="hljs-comment">// IE678 用的是 document.documentElement.scrollTop</span>
        <span class="hljs-built_in">document</span>.title = <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmo92fumzyg20az0dcabx.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmo92fumzyg20az0dcabx.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>完整版封装函数：</strong> <em>[34-scroll系列-scrollTop&amp;scrollLeft兼容性封装.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getScroll() {
    // 返回的是一个对象，调用的时候 getScroll().top 获取页面被卷去的头部的距离
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScroll</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 返回的是一个对象，调用的时候 getScroll().top 获取页面被卷去的头部的距离</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">left</span>: <span class="hljs-built_in">window</span>.pageXOffset || <span class="hljs-built_in">document</span>.documentElement.scrollLeft || <span class="hljs-built_in">document</span>.body.scrollLeft || <span class="hljs-number">0</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-number">0</span>
    }
}</code></pre>
<p><em>返回值是一个对象，需要获得卷去头部的距离，只需要调用<code>getScroll.top</code>即可。</em></p>
<p><strong>scroll 系列图解：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmoet4wmhsj20fh09eq30.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmoet4wmhsj20fh09eq30.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：固定导航栏</strong> <em>[ 35-scroll系列-固定导航栏.html ]</em></p>
<ul>
<li>通过<code>offsetHeight</code>获取导航栏上部元素自身的高度，判断<code>scrollTop</code>的高度大于等于上部元素高度的时候，说明<code>scrollTop</code>到导航栏的位置了；</li>
<li>到达导航栏位置，给导航栏绝对定位在页面顶部，同时因为固定定位，导航栏脱标，所以要获得导航栏下部的元素，将其<code>margin-top</code>设置为导航栏的高度，将位置空出来；</li>
<li>当<code>scrollTop</code>小于上部元素高度的时候，导航栏去掉固定定位，同时将下部元素的<code>margin-top</code>设置为<code>0</code>。</li>
</ul>
<p><em>为什么一开始不直接拿导航栏到顶部的距离跟 <code>scrollTop</code> 比较呢？，因为导航栏固定定位之后位置就变了，恢复原来位置时的判断就不生效了</em></p>
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
    html,
    body {
        width: 100%;
    }
    .header {
        height: 130px;
        background: #FBFBFB;
        font: 700 28px/130px serif;
        color: #666;
        text-align: center;
    }
    .nav {
        height: 60px;
        width: 100%;
        background: #B9E1DC;
        font: 700 24px/60px serif;
        color: #52524E;
        text-align: center;
    }
    ul {
        display: inline-block;
    }
    li {
        float: left;
        margin-left: 60px;
    }
    .content1,
    .content2,
    .content3 {
        height: 800px;
        background: #DFFCB5;
        font: 700 60px/800px serif;
        color: #52524E;
        text-align: center;
    }
    .content2 {
        background: #FFE1B6;
    }
    .content3 {
        background: #CDE3EB;
    }
    .fixed {
        position: fixed;
        top: 0;
        left: 0;
    }
</style>

<!-- html 部分 -->
<div class=&quot;header&quot; id=&quot;header&quot;>
    顶部广告栏
</div>
<div class=&quot;nav&quot; id=&quot;nav&quot;>
    <ul>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>SERVICES</li>
        <li>TEAM</li>
        <li>CONTACT</li>
    </ul>
</div>
<div class=&quot;content1&quot; id=&quot;con&quot;>
    内容1
</div>
<div class=&quot;content2&quot;>
    内容2
</div>
<div class=&quot;content3&quot;>
    内容3
</div>

<!-- js 部分 -->
<script>
    var header = document.getElementById('header');
    var nav = document.getElementById('nav');
    var content = document.getElementById('con');

    // 封装一个scrollTop兼容性函数
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    // 给页面注册滚动事件
    window.onscroll = function() {
        // 判断广告栏header 与 滚动的scrollTop的值
        // 当scrollTop > header高度的时候 让导航栏 nav 固定定位
        var scrollTop = getScrollTop();
        if (scrollTop >= header.offsetHeight) {
            // 样式中有的类名这里一定不要忘了加上去，否则就会被替换掉
            nav.className = &quot;nav fixed&quot;;
            // 一旦标题栏设置了固定定位之后，就脱离标准流了，下面的内容就会顶上来，
            // 所以要手动给下面的内容添加一个margin-top，将导航栏的位置留下来
            content.style.marginTop = nav.offsetHeight + &quot;px&quot;;
        } else {
            // 当scrollTop < header高度的时候 让导航栏 nav 恢复到原来的位置
            // nav 取消固定定位，恢复到原来的位置，所以下面内容的margin-top也要去掉
            nav.className = &quot;nav&quot;; // 去掉固定定位的样式，保留之前的样式
            content.style.marginTop = 0;
        }
    };
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
    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.header</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FBFBFB</span>;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">28px</span>/<span class="hljs-number">130px</span> serif;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.nav</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#B9E1DC</span>;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">24px</span>/<span class="hljs-number">60px</span> serif;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#52524E</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">display</span>: inline-block;
    }
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">60px</span>;
    }
    <span class="hljs-selector-class">.content1</span>,
    <span class="hljs-selector-class">.content2</span>,
    <span class="hljs-selector-class">.content3</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#DFFCB5</span>;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">60px</span>/<span class="hljs-number">800px</span> serif;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#52524E</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.content2</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFE1B6</span>;
    }
    <span class="hljs-selector-class">.content3</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#CDE3EB</span>;
    }
    <span class="hljs-selector-class">.fixed</span> {
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"header"</span>&gt;</span>
    顶部广告栏
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>HOME<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ABOUT<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>SERVICES<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>TEAM<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>CONTACT<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content1"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"con"</span>&gt;</span>
    内容1
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content2"</span>&gt;</span>
    内容2
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content3"</span>&gt;</span>
    内容3
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> header = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'header'</span>);
    <span class="hljs-keyword">var</span> nav = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'nav'</span>);
    <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'con'</span>);

    <span class="hljs-comment">// 封装一个scrollTop兼容性函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">// 给页面注册滚动事件</span>
    <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 判断广告栏header 与 滚动的scrollTop的值</span>
        <span class="hljs-comment">// 当scrollTop &gt; header高度的时候 让导航栏 nav 固定定位</span>
        <span class="hljs-keyword">var</span> scrollTop = getScrollTop();
        <span class="hljs-keyword">if</span> (scrollTop &gt;= header.offsetHeight) {
            <span class="hljs-comment">// 样式中有的类名这里一定不要忘了加上去，否则就会被替换掉</span>
            nav.className = <span class="hljs-string">"nav fixed"</span>;
            <span class="hljs-comment">// 一旦标题栏设置了固定定位之后，就脱离标准流了，下面的内容就会顶上来，</span>
            <span class="hljs-comment">// 所以要手动给下面的内容添加一个margin-top，将导航栏的位置留下来</span>
            content.style.marginTop = nav.offsetHeight + <span class="hljs-string">"px"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 当scrollTop &lt; header高度的时候 让导航栏 nav 恢复到原来的位置</span>
            <span class="hljs-comment">// nav 取消固定定位，恢复到原来的位置，所以下面内容的margin-top也要去掉</span>
            nav.className = <span class="hljs-string">"nav"</span>; <span class="hljs-comment">// 去掉固定定位的样式，保留之前的样式</span>
            content.style.marginTop = <span class="hljs-number">0</span>;
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmodi5j3dlg20ge0lu79w.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmodi5j3dlg20ge0lu79w.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：两侧跟随小广告</strong> <em>[ 36-offset系列-两侧跟随小广告.html ]</em></p>
<ul>
<li>需求：屏幕滚动多少，两侧广告缓动等距离</li>
<li>将两张图片绝对定位在屏幕两侧的中间</li>
<li>通过滚动事件，实时获取<code>scrollTop</code>的值</li>
<li>将获取到的<code>scrollTop</code>的值，通过缓动动画设置给两侧图片(需要将之前<code>top</code>的高度加上去)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<img src=&quot;../image/两侧固定小广告/advert.jpg&quot; alt=&quot;&quot; id=&quot;img1&quot;>
<img src=&quot;../image/两侧固定小广告/advert.jpg&quot; alt=&quot;&quot; id=&quot;img2&quot;>
<div>
    内 容
    . . .
    . . .
    
</div>

<!-- js 部分-->
<script>
    window.onload = function() {
        var imgs = document.getElementsByTagName('img');
        window.onscroll = function() {
            // 获取滚动条滚动距顶部的距离距离
            var scrollTop = getScrollTop();
            // 缓动跟随
            animate(imgs[0], scrollTop + 300);
            animate(imgs[1], scrollTop + 300);

        };
        // scrollTop兼容性处理
        function getScrollTop() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }
        // 缓动动画
        function animate(element, target) {
            clearInterval(element.timer);
            element.timer = setInterval(function() {
                var leader = element.offsetTop;
                var step = (target - leader) / 20;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                element.style.top = leader + 'px';
                if (Math.abs(target - leader) < Math.abs(step)) {
                    element.style.top = target + &quot;px&quot;;
                    clearInterval(element.timer);
                }
            }, 15);
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/两侧固定小广告/advert.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/两侧固定小广告/advert.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img2"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    内 容
    . . .
    . . .
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> imgs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'img'</span>);
        <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取滚动条滚动距顶部的距离距离</span>
            <span class="hljs-keyword">var</span> scrollTop = getScrollTop();
            <span class="hljs-comment">// 缓动跟随</span>
            animate(imgs[<span class="hljs-number">0</span>], scrollTop + <span class="hljs-number">300</span>);
            animate(imgs[<span class="hljs-number">1</span>], scrollTop + <span class="hljs-number">300</span>);

        };
        <span class="hljs-comment">// scrollTop兼容性处理</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-number">0</span>;
        }
        <span class="hljs-comment">// 缓动动画</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">element, target</span>) </span>{
            clearInterval(element.timer);
            element.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> leader = element.offsetTop;
                <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">20</span>;
                step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
                leader += step;
                element.style.top = leader + <span class="hljs-string">'px'</span>;
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(target - leader) &lt; <span class="hljs-built_in">Math</span>.abs(step)) {
                    element.style.top = target + <span class="hljs-string">"px"</span>;
                    clearInterval(element.timer);
                }
            }, <span class="hljs-number">15</span>);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmoi25hhkqg20ma0kktqp.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmoi25hhkqg20ma0kktqp.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>示例代码：返回顶部</strong> <em>[ 37-offset系列-返回顶部.html ]</em></p>
<blockquote>
<code>window.scrollTo(0, 0);</code>让滚动条回到<code>(0,0)</code>位置。这是回到顶部的主要原理</blockquote>
<ul>
<li>注册滚动条滚动事件，实时获取<code>scrollTop</code>的位置，判断当它距离大于等于<code>800</code>的时候，让回到顶部的按钮，缓动的显示出来。当<code>scrollTop</code>位置小于<code>800</code>的时候，让回到顶部的按钮，缓动的隐藏起来。</li>
<li>给回到顶部按钮注册点击事件，当点击的时候，页面缓动的回到顶部。这里就要用到刚刚提到的知识点：<code>window.scrollTo()</code>
</li>
<li>重新创建一个缓动动画框架，目标位置<code>target</code>就是<code>scrollTo(0,target)</code>，所以，<code>target</code>的值为<code>0</code>；</li>
<li>实现原理与最基本的缓动框架基本一样，只是将设置的值改为：<code>window.scrollTo(0,leader)</code>；此时的<code>leader</code>还是一个未知数，<code>leader</code>其实就是当前滚动条的位置，所以，在滚动事件里，只要将<code>leader</code>实时获取滚动条位置即可。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        background: #FDFCE0
    }
    div {
        margin: 200px auto;
        text-align: center;
    }
    img {
        width: 50px;
        height: 50px;
        background: url(../image/返回顶部/top.png);
        cursor: pointer;
        position: fixed;
        right: 50px;
        opacity: 0;
        bottom: 50px;
    }
</style>

<!-- html 部分 -->
<div>
    ...
    内容
    ...
</div>

<img src=&quot;../image/返回顶部/top.png&quot; alt=&quot;&quot; id=&quot;top&quot;>

<!-- js 部分 -->
<script src=&quot;../js/slow-animate-styles.js&quot;></script>
<script>
    var img = document.getElementsByTagName('img')[0];
    var scrollTop;
    window.onscroll = function() {
        scrollTop = getScrollTop();
        // 当滚动条位置大于等于800 的时候，让回到顶部图标缓动的显示出来
        if (scrollTop >= 800) {
            slowAnimateStyles(img, {
                opacity: 100,

            });
            img.style.display = &quot;block&quot;;
        } else {
            // 当位置小于800 的时候，回到顶部图标缓动的隐藏起来
            slowAnimateStyles(img, {
                opacity: 0,
            }, function() {
                img.style.display = &quot;none&quot;;
            });

            // 在这里获取leader的位置
            leader = getScrollTop();
        }
    };
    // 点击img的时候，让滚动条回到顶部，这里有个知识点：window.scrollTo(0,0); 滚动条回到顶部
    // 需要单独创建一个缓动动画
    var timer = null;
    var target = 0; // 目标位置为0 即：window.scrollTo(0,target)
    var leader = 0; // 初始化leader
    img.onclick = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            // 此时的leader还是一个未知数，我们需要获取到当前滚动条的位置，然后赋值给leader，
            // 并且这个位置应该是实时变化的，我们只需要在上面的滚动事件里设置下leader即可
            window.scrollTo(0, leader);
            if (leader === 0) {
                clearInterval(timer);
            }
        }, 15);
    }

    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FDFCE0</span>
    }
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span> auto;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/返回顶部/top.png);
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">50px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    ...
    内容
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/返回顶部/top.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"top"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/slow-animate-styles.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'img'</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> scrollTop;
    <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        scrollTop = getScrollTop();
        <span class="hljs-comment">// 当滚动条位置大于等于800 的时候，让回到顶部图标缓动的显示出来</span>
        <span class="hljs-keyword">if</span> (scrollTop &gt;= <span class="hljs-number">800</span>) {
            slowAnimateStyles(img, {
                <span class="hljs-attr">opacity</span>: <span class="hljs-number">100</span>,

            });
            img.style.display = <span class="hljs-string">"block"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 当位置小于800 的时候，回到顶部图标缓动的隐藏起来</span>
            slowAnimateStyles(img, {
                <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>,
            }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                img.style.display = <span class="hljs-string">"none"</span>;
            });

            <span class="hljs-comment">// 在这里获取leader的位置</span>
            leader = getScrollTop();
        }
    };
    <span class="hljs-comment">// 点击img的时候，让滚动条回到顶部，这里有个知识点：window.scrollTo(0,0); 滚动条回到顶部</span>
    <span class="hljs-comment">// 需要单独创建一个缓动动画</span>
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> target = <span class="hljs-number">0</span>; <span class="hljs-comment">// 目标位置为0 即：window.scrollTo(0,target)</span>
    <span class="hljs-keyword">var</span> leader = <span class="hljs-number">0</span>; <span class="hljs-comment">// 初始化leader</span>
    img.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        clearInterval(timer);
        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
            step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
            leader += step;
            <span class="hljs-comment">// 此时的leader还是一个未知数，我们需要获取到当前滚动条的位置，然后赋值给leader，</span>
            <span class="hljs-comment">// 并且这个位置应该是实时变化的，我们只需要在上面的滚动事件里设置下leader即可</span>
            <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, leader);
            <span class="hljs-keyword">if</span> (leader === <span class="hljs-number">0</span>) {
                clearInterval(timer);
            }
        }, <span class="hljs-number">15</span>);
    }

    <span class="hljs-comment">// scrollTop兼容性处理</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpa0wf98sg20dy0cpq6n.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpa0wf98sg20dy0cpq6n.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：楼层跳跃</strong> <em>[ 38-offset系列-楼层跳跃.html ]</em></p>
<ul>
<li>其实这里的案例跟上面的返回顶部很类似，同样的运用到的是<code>window.scrollTo()</code>
</li>
<li>页面布局，背景继承<code>body</code>，和<code>html</code>的<code>100%</code>，将背景的索引与左边导航栏绑定</li>
<li>创建一个缓动动画框架，目标距离<code>target</code>，就是当前索引背景距离顶部的距离，<code>leader</code>就是滚动条此时的位置</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul>
    <li>鞋子区域</li>
    <li>袜子区域</li>
    <li>裤子区域</li>
    <li>裙子区域</li>
    <li>帽子区域</li>
</ul>
<ol>
    <li>鞋子</li>
    <li>袜子</li>
    <li>裤子</li>
    <li>裙子</li>
    <li>帽子</li>
</ol>

<!-- js 部分 -->
<script>
    var colorArr = [&quot;#B7F5DE&quot;, &quot;#FFE9E3&quot;, &quot;#CBF078&quot;, &quot;#7CDFFF&quot;, &quot;#F59292&quot;];
    var ul = document.getElementsByTagName('ul')[0];
    var ol = document.getElementsByTagName('ol')[0];
    var ulLis = ul.getElementsByTagName('li');
    var olLis = ol.getElementsByTagName('li');
    var target = 0,
        leader = 0,
        timer = null;

    for (var i = 0; i < colorArr.length; i++) {
        // 动态设置背景颜色
        ulLis[i].style.background = colorArr[i];
        olLis[i].style.background = colorArr[i];
        // 将olLis属性绑定索引值
        olLis[i].index = i;
        olLis[i].onclick = function() {
            // 点击索引，获取ul下的当前li距离顶部的距离
            target = ulLis[this.index].offsetTop;
            clearInterval(timer);
            timer = setInterval(function() {
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                // 滚动条y方向到达leader位置
                window.scrollTo(0, leader);
                // 判断，清除定时器
                if (Math.abs(target - leader) <= Math.abs(step)) {
                    window.scrollTo(0, target);
                    clearInterval(timer);
                }
            }, 15);
        }
    }
    // 滚动事件，实时获取滚动条的位置
    window.onscroll = function() {
        // 实时获取leader的值
        leader = getScrollTop();
    }


    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>鞋子区域<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>袜子区域<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>裤子区域<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>裙子区域<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>帽子区域<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>鞋子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>袜子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>裤子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>裙子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>帽子<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> colorArr = [<span class="hljs-string">"#B7F5DE"</span>, <span class="hljs-string">"#FFE9E3"</span>, <span class="hljs-string">"#CBF078"</span>, <span class="hljs-string">"#7CDFFF"</span>, <span class="hljs-string">"#F59292"</span>];
    <span class="hljs-keyword">var</span> ul = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'ul'</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> ol = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'ol'</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> ulLis = ul.getElementsByTagName(<span class="hljs-string">'li'</span>);
    <span class="hljs-keyword">var</span> olLis = ol.getElementsByTagName(<span class="hljs-string">'li'</span>);
    <span class="hljs-keyword">var</span> target = <span class="hljs-number">0</span>,
        leader = <span class="hljs-number">0</span>,
        timer = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; colorArr.length; i++) {
        <span class="hljs-comment">// 动态设置背景颜色</span>
        ulLis[i].style.background = colorArr[i];
        olLis[i].style.background = colorArr[i];
        <span class="hljs-comment">// 将olLis属性绑定索引值</span>
        olLis[i].index = i;
        olLis[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击索引，获取ul下的当前li距离顶部的距离</span>
            target = ulLis[<span class="hljs-keyword">this</span>.index].offsetTop;
            clearInterval(timer);
            timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> step = (target - leader) / <span class="hljs-number">10</span>;
                step = step &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil(step) : <span class="hljs-built_in">Math</span>.floor(step);
                leader += step;
                <span class="hljs-comment">// 滚动条y方向到达leader位置</span>
                <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, leader);
                <span class="hljs-comment">// 判断，清除定时器</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(target - leader) &lt;= <span class="hljs-built_in">Math</span>.abs(step)) {
                    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, target);
                    clearInterval(timer);
                }
            }, <span class="hljs-number">15</span>);
        }
    }
    <span class="hljs-comment">// 滚动事件，实时获取滚动条的位置</span>
    <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 实时获取leader的值</span>
        leader = getScrollTop();
    }


    <span class="hljs-comment">// scrollTop兼容性处理</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpdb334gdg20jt0daad9.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpdb334gdg20jt0daad9.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">9.3 client 系列</h3>
<blockquote>
<code>client</code>家族用于获取盒子可视区的大小。<code>client</code>家族有<code>clientWidth</code>、<code>clientHeight</code>、<code>clientLeft</code>、<code>clientTop</code>。</blockquote>
<p><strong>1、clientWidth 和 clientHeight</strong></p>
<ul>
<li>
<code>clientWidth</code> ：获取网页可视区域宽度 ；<code>clientHeight</code> ：获取网页可视区域高度；</li>
<li>
<p>调用者不同，意义不同：</p>
<ul>
<li>盒子调用，指盒子本身；</li>
<li>
<code>html/body</code>调用：可视区域大小</li>
</ul>
</li>
<li>不包括<code>border</code>和<code>margin</code>
</li>
</ul>
<p><strong>图解clientWidth和clientHeight：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpepz6ylpj20ct083jrd.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpepz6ylpj20ct083jrd.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>clientWidth 和 clientHeight 兼容性封装：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClient</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">width</span>: <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-number">0</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-built_in">window</span>.innerHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight || <span class="hljs-number">0</span>
    };
}</code></pre>
<p><strong>onresize事件：</strong></p>
<blockquote>
<code>onresize</code>事件会在窗口被调整大小的时候发生。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = function(){
    //事件处理程序
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//事件处理程序</span>
}</code></pre>
<p><strong>示例代码：模仿响应式布局</strong> <em>[ 39-client系列-模拟响应式.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 页面一进来的时候就执行一次，确定浏览器可视区域的宽度
responsive();
// 浏览器窗口调整触发事件
window.onresize = function() {
    responsive();
};

// 获取浏览器宽度
function responsive() {
    var pageWidth = getClientWidth();
    if (pageWidth >= 960) {
        //说明是pc
        document.body.style.backgroundColor = &quot;#B7F5DE&quot;;
    } else if (pageWidth >= 640) {
        //说明是平板
        document.body.style.backgroundColor = &quot;#CBF078&quot;;
    } else {
        // 说明是手机
        document.body.style.backgroundColor = &quot;#F59292&quot;;
    }

}

// clientWidth 兼容性处理
function getClientWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 页面一进来的时候就执行一次，确定浏览器可视区域的宽度</span>
responsive();
<span class="hljs-comment">// 浏览器窗口调整触发事件</span>
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    responsive();
};

<span class="hljs-comment">// 获取浏览器宽度</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">responsive</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pageWidth = getClientWidth();
    <span class="hljs-keyword">if</span> (pageWidth &gt;= <span class="hljs-number">960</span>) {
        <span class="hljs-comment">//说明是pc</span>
        <span class="hljs-built_in">document</span>.body.style.backgroundColor = <span class="hljs-string">"#B7F5DE"</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (pageWidth &gt;= <span class="hljs-number">640</span>) {
        <span class="hljs-comment">//说明是平板</span>
        <span class="hljs-built_in">document</span>.body.style.backgroundColor = <span class="hljs-string">"#CBF078"</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 说明是手机</span>
        <span class="hljs-built_in">document</span>.body.style.backgroundColor = <span class="hljs-string">"#F59292"</span>;
    }

}

<span class="hljs-comment">// clientWidth 兼容性处理</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClientWidth</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-number">0</span>;
}</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmphwjwo8sg20r80cln1s.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmphwjwo8sg20r80cln1s.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、clientX 和 clientY</strong></p>
<ul>
<li>
<code>clientX</code>：鼠标距离可视区域左侧距离(<code>event</code>调用) <em><code>event</code>：事件对象，下面会讲</em>
</li>
<li>
<code>clientY</code>：鼠标距离可视区域上侧距离(<code>event</code>调用)</li>
</ul>
<p><em>事件对象的时候，单独讲解</em></p>
<p><strong>3、clientTop 和 clientLeft</strong></p>
<ul>
<li>
<code>clientTop</code>：盒子的上部<code>border</code>的宽度</li>
<li>
<code>clientleft</code>：盒子的左部<code>border</code>的宽度</li>
</ul>
<p><em>用的很少很少，基本不会用到</em></p>
<h3 id="articleHeader4">9.4 screen 系列</h3>
<p><em><code>clientWidth</code> 获取的其实是浏览器窗口的宽度，想要获取用户显示的分辨率怎么办呢？</em></p>
<blockquote>获取用户显示器分辨率有专门的方法：<code>window.screen.width</code>和<code>window.screen.Height</code>
</blockquote>
<p><strong>示例代码：获取显示器分辨率</strong> <em>[ 40-screen系列-获取显示器分辨率.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write(&quot;屏幕分辨率为：&quot; + window.screen.width + &quot;*&quot; + window.screen.height);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.write(<span class="hljs-string">"屏幕分辨率为："</span> + <span class="hljs-built_in">window</span>.screen.width + <span class="hljs-string">"*"</span> + <span class="hljs-built_in">window</span>.screen.height);</code></pre>
<p><strong>效果图：</strong></p>
<p>1280*720 分辨率的情况下：</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpik1um09j20qj0710t5.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpik1um09j20qj0710t5.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>1920*1080 分辨率的情况下：</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpik1v52oj20qj071aas.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpik1v52oj20qj071aas.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">9.5 三大系列的区别</h3>
<p><strong>图解三大系列区别：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpep43o5rj20hg0bwaa7.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpep43o5rj20hg0bwaa7.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>width 和 height：</strong></p>
<ul>
<li>
<p><code>clientWidth</code>/<code>clientHeight</code>：</p>
<ul>
<li>clientWidth = <code>width</code> + <code>padding</code>;</li>
<li>clientHeight = <code>height</code> + <code>padding</code>;</li>
</ul>
</li>
<li>
<p><code>offsetWidth</code>/<code>offsetHeight</code>：</p>
<ul>
<li>offsetWidth = <code>width</code> + <code>padding</code> + <code>border</code>;</li>
<li>offsetHeight = <code>heigth</code> + <code>padding</code> + <code>border</code>;</li>
</ul>
</li>
<li>
<p><code>scrollWidth</code>/<code>scrollHeight</code>：</p>
<ul>
<li>scrollWidth = 内容宽度(不包含<code>border</code>);</li>
<li>scrollHeight = 内容高度(不包含<code>border</code>);</li>
</ul>
</li>
</ul>
<p><strong>top 和 left：</strong></p>
<ul>
<li>
<p><code>offsetTop</code>/<code>offsetLeft</code> ：</p>
<ul>
<li>调用者：任意元素。(盒子为主)</li>
<li>作用 ：获取距离父系盒子中带有定位的距离。</li>
</ul>
</li>
<li>
<p><code>scrollTop</code>/<code>scrollLeft</code>:(盒子也可以调用，必须有滚动条)</p>
<ul>
<li>调用者：<code>document.body.scrollTop/.....(window)</code>
</li>
<li>作用：浏览器无法显示的部分（被卷去的部分）。</li>
</ul>
</li>
<li>
<p><code>clientY</code>/<code>clientX</code>:(<code>clientTop</code>/<code>clientLeft</code> 值是<code>border</code>)</p>
<ul>
<li>调用者：<code>event.clientX(event)</code>
</li>
<li>作用：鼠标距离浏览器可视区域的距离（左、上）。</li>
</ul>
</li>
</ul>
<h2 id="articleHeader6">10. 事件对象</h2>
<h3 id="articleHeader7">10.1 事件对象的概述</h3>
<blockquote>在触发某个事件的时候，都会产生一个事件对象<code>Event</code>，这个对象中包含所有与事件相关的一些信息，包括触发事件的元素，事件的类型以及其他与事件相关的信息。</blockquote>
<p><strong>比如：</strong></p>
<ul>
<li>鼠标事件触发时，事件对象中会包含鼠标的位置信息。</li>
<li>键盘事件触发时，事件对象中会包含按下的键相关的信息。</li>
</ul>
<h3 id="articleHeader8">10.2 获取事件对象</h3>
<blockquote>既然事件对象中存储了这么多的信息，我们首先需要做的就是获取到这个事件对象。获取事件对象的时候，存在浏览器的兼容问题。</blockquote>
<p><strong>现代浏览器：</strong></p>
<p>获取事件对象非常的简单，只需要在注册事件的时候，指定一个形参即可。这个形参就是我们想要获取到的事件对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function(event){
    // event就是事件对象，里面包含了事件触发时的一些信息。
    // 触发事件的时候，事件是由浏览器调用，生成一个事件对象，里面包含了一些信息，当成实参传递进来了。
    console.log(event);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-comment">// event就是事件对象，里面包含了事件触发时的一些信息。</span>
    <span class="hljs-comment">// 触发事件的时候，事件是由浏览器调用，生成一个事件对象，里面包含了一些信息，当成实参传递进来了。</span>
    <span class="hljs-built_in">console</span>.log(event);
}</code></pre>
<p><strong>IE678：</strong></p>
<p>获取事件对象则是另一种方式，在事件里面，通过<code>window.event</code>来获取事件对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function(){
    // IE678通过window.event获取事件对象
    // IE678浏览器在触发的事件的时候，生成一个事件对象，但是呢，并没有当成实参传过来。会给window.event这个属性。
    var event = window.event;
    console.log(event);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// IE678通过window.event获取事件对象</span>
    <span class="hljs-comment">// IE678浏览器在触发的事件的时候，生成一个事件对象，但是呢，并没有当成实参传过来。会给window.event这个属性。</span>
    <span class="hljs-keyword">var</span> event = <span class="hljs-built_in">window</span>.event;
    <span class="hljs-built_in">console</span>.log(event);
}</code></pre>
<p><strong>兼容性封装：</strong> <em>[ 41-事件对象Event兼容性.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function(event){
    //只要用到了事件对象，就要记得处理浏览器兼容性
    event = event || window.event;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-comment">//只要用到了事件对象，就要记得处理浏览器兼容性</span>
    event = event || <span class="hljs-built_in">window</span>.event;
}</code></pre>
<h3 id="articleHeader9">10.3 事件对象的常用属性</h3>
<blockquote>事件对象中有很多很多的属性，但是很多属性并不常用。我们经常用到的是鼠标位置信息 和键盘码 相关的信息。</blockquote>
<p><strong>打印event对象我们可以看到如下信息：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpjyrb7a6j20ko0hpmyc.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpjyrb7a6j20ko0hpmyc.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到一个鼠标按下的时候，它的事件对象里面有这么多属性，但是最常用的也就是鼠标位置信息和键盘码相关的信息。</em></p>
<p><strong>记录了鼠标位置信息的相关属性：</strong></p>
<ul>
<li>
<code>screenX</code>与<code>screenY</code>：光标相对于屏幕左上角的水平位置与垂直位置。</li>
<li>
<code>clientX</code>与<code>clientY</code>：光标相对于可视区左上角的水平位置和垂直位置。</li>
<li>
<code>pageX</code>与<code>pageY</code>：光标相对于网页（文档<code>document</code>）左上角的水平位置与垂直位置（推荐使用）</li>
</ul>
<p><em>[ 42-事件对象-鼠标三种获取位置的属性.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.onclick = function(e) {
    var e = e || window.event;
    //获取鼠标的位置，相对的是可视区最左上角的点。（忽略滚动的距离）
    console.log(&quot;client(&quot; + e.clientX + &quot;,&quot; + e.clientY + &quot;)&quot;);

    //获取鼠标的位置，相对的页面最左上角的位置 （计算滚动的距离）
    console.log(&quot;page(&quot; + e.pageX + &quot;,&quot; + e.pageY + &quot;)&quot;);

    //获取鼠标的位置，相对的是屏幕最左上角的那个点
    console.log(&quot;screen(&quot; + e.screenX + &quot;,&quot; + e.screenY + &quot;)&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> e = e || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-comment">//获取鼠标的位置，相对的是可视区最左上角的点。（忽略滚动的距离）</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"client("</span> + e.clientX + <span class="hljs-string">","</span> + e.clientY + <span class="hljs-string">")"</span>);

    <span class="hljs-comment">//获取鼠标的位置，相对的页面最左上角的位置 （计算滚动的距离）</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"page("</span> + e.pageX + <span class="hljs-string">","</span> + e.pageY + <span class="hljs-string">")"</span>);

    <span class="hljs-comment">//获取鼠标的位置，相对的是屏幕最左上角的那个点</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"screen("</span> + e.screenX + <span class="hljs-string">","</span> + e.screenY + <span class="hljs-string">")"</span>);
}</code></pre>
<p><strong>图解：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpkz1skj9j21770iudzm.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpkz1skj9j21770iudzm.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>记录了键盘码的属性：</strong></p>
<ul><li>
<code>event.keyCode</code>:键盘按下的那个键的键盘码</li></ul>
<h3 id="articleHeader10">10.4 pageX与pageY的兼容性</h3>
<blockquote>在鼠标事件中，记录鼠标位置信息的属性有很多，使用最多的还是<code>pageX</code>与<code>pageY</code>这两个属性，但是<code>pageX</code>和<code>pageY</code>存在浏览器兼容性问题。</blockquote>
<p><strong>在现代浏览器中：</strong> 直接通过事件对象就可以获得<code>pageX</code>与<code>pageY</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.onclick = function (event) {
    event = event || window.event;
    console.log(event.pageX+&quot;,&quot;+event.pageY);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    event = event || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-built_in">console</span>.log(event.pageX+<span class="hljs-string">","</span>+event.pageY);
}</code></pre>
<p><strong>在IE678中：</strong> 并没有<code>pageX</code>与<code>pageY</code>，但是我们可以通过<code>scrollTop + clientY</code>的方式进行计算来获得<code>pageY</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.onclick = function (event) {
    event = event || window.event;
    // 在IE678中使用document.documentElement.scrollTop就可以获取到scrollTop的值
    alert(event.clientY + document.documentElement.scrollTop);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    event = event || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-comment">// 在IE678中使用document.documentElement.scrollTop就可以获取到scrollTop的值</span>
    alert(event.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop);
}</code></pre>
<p><strong>pageX与pageY的兼容性封装：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPage(event) {
    return {
        //在IE678中使用document.documentElement.scrollLeft就可以获取到scrollLeft的值
        x:event.pageX || event.clientX + document.documentElement.scrollLeft,
        y:event.pageY || event.clientY + document.documentElement.scrollTop
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">//在IE678中使用document.documentElement.scrollLeft就可以获取到scrollLeft的值</span>
        x:event.pageX || event.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
        <span class="hljs-attr">y</span>:event.pageY || event.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop
    }
}</code></pre>
<p><strong>调用时：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getPage(event).x;
getPage(event).y;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getPage(event).x;
getPage(event).y;</code></pre>
<p><strong>示例代码：兼容性封装测试</strong> <em>[ 43-事件对象-pageX&amp;PageY兼容性处理.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        height: 5000px;
    }
</style>

<!-- js 部分 -->
<script>
    document.onclick = function(event) {
        event = event || window.event;
        alert(&quot;当前坐标为(&quot; + getPage(event).x + &quot;,&quot; + getPage(event).y + &quot;)&quot;);
    }

    function getPage(e) {
        return {
            x: e.pageX || e.clientX + document.documentElement.scrollLeft,
            y: e.pageY || e.clientY + document.documentElement.scrollTop
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5000px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        event = event || <span class="hljs-built_in">window</span>.event;
        alert(<span class="hljs-string">"当前坐标为("</span> + getPage(event).x + <span class="hljs-string">","</span> + getPage(event).y + <span class="hljs-string">")"</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">x</span>: e.pageX || e.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
            <span class="hljs-attr">y</span>: e.pageY || e.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader11">10.5 案例：鼠标跟随</h3>
<ul>
<li>鼠标跟随，指的就是，鼠标后面有一张图片，会在页面中一直跟随鼠标</li>
<li>通过事件对象的属性，我们知道了有三种方法获取鼠标的位置信息，我们只要把鼠标的位置，赋值给后面跟随图片的位置，就可以实现图片一直跟随鼠标移动了</li>
<li>我们知道<code>clientX/Y</code>、<code>screenX/Y</code>、<code>pageX/Y</code>，都可以获取鼠标的位置，但是各有优劣，我们先使用<code>pageX/Y</code>获取，上面我们已经处理<code>pageX/Y</code>的兼容性了，所以这里直接使用</li>
<li>我们只需将获得的鼠标位置，赋值给定位后的图片，将图片绝对定位，再给页面注册鼠标移动事件，图片就会一直跟着鼠标移动。</li>
</ul>
<p><em>[ 44-事件对象-跟随鼠标移动.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 5000px;
    }
    #follow {
        position: absolute;
        width: 160px;
    }
</style>

<!-- html 部分 -->
<img src=&quot;../image/鼠标跟随/2.gif&quot; alt=&quot;&quot; id=&quot;follow&quot;>

<!-- js 部分 -->
<script>
var follow = document.getElementById(&quot;follow&quot;);
//给document注册一个鼠标移动事件
document.onmousemove = function(e) {
    e = e || window.event;
    console.log(e.clientX + &quot;   &quot; + e.clientY);
    follow.style.left = getPage(e).x + &quot;px&quot;;
    follow.style.top = getPage(e).y + &quot;px&quot;;
}

function getPage(e) {
    return {
        x: e.pageX || e.clientX + document.documentElement.scrollLeft,
        y: e.pageY || e.clientY + document.documentElement.scrollTop,
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5000px</span>;
    }
    <span class="hljs-selector-id">#follow</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/鼠标跟随/2.gif"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"follow"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> follow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"follow"</span>);
<span class="hljs-comment">//给document注册一个鼠标移动事件</span>
<span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    e = e || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-built_in">console</span>.log(e.clientX + <span class="hljs-string">"   "</span> + e.clientY);
    follow.style.left = getPage(e).x + <span class="hljs-string">"px"</span>;
    follow.style.top = getPage(e).y + <span class="hljs-string">"px"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: e.pageX || e.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
        <span class="hljs-attr">y</span>: e.pageY || e.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop,
    }
}</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpos6imlpg20gn07daan.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpos6imlpg20gn07daan.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>通过效果图我们可以发现，绝对定位时，当鼠标移到最右边的时候，图片会撑大浏览器自动生成滚动条，那怎么办呢？</em></p>
<p><strong>鼠标跟随优化版</strong> <em>[ 45-事件对象-跟随鼠标移动优化版.html ]</em><br>只要将图片固定定位，然后通过<code>clientX/Y</code>,获取可视区的位置，将它的值赋值给图片就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 5000px;
    }
    #follow {
        position: fixed;
        width: 160px;
    }
</style>

<!-- html 部分 -->
<img src=&quot;../image/鼠标跟随/2.gif&quot; alt=&quot;&quot; id=&quot;follow&quot;>

<!-- js 部分 -->
<script>
    var follow = document.getElementById(&quot;follow&quot;);
    //给document注册一个鼠标移动事件
    document.onmousemove = function(e) {
        e = e || window.event;
        console.log(e.clientX + &quot;   &quot; + e.clientY);
        follow.style.left = e.clientX + &quot;px&quot;;
        follow.style.top = e.clientY + &quot;px&quot;;
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
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5000px</span>;
    }
    <span class="hljs-selector-id">#follow</span> {
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/鼠标跟随/2.gif"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"follow"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> follow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"follow"</span>);
    <span class="hljs-comment">//给document注册一个鼠标移动事件</span>
    <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-built_in">console</span>.log(e.clientX + <span class="hljs-string">"   "</span> + e.clientY);
        follow.style.left = e.clientX + <span class="hljs-string">"px"</span>;
        follow.style.top = e.clientY + <span class="hljs-string">"px"</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmpp74y0rmg20gn07dt97.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmpp74y0rmg20gn07dt97.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">10.6 案例：拖拽效果</h3>
<p><strong>1、获取鼠标在盒子中的位置</strong></p>
<blockquote>当在盒子里面点击鼠标的时候，怎么获得这个鼠标在盒子中的位置呢？</blockquote>
<p>没有直接的方法能够获取，但是我们可以通过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="获取鼠标的位置 - 盒子距离顶部和左边的距离 = 鼠标在盒子里面的距离" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">获取鼠标的位置 - 盒子距离顶部和左边的距离 </span>=<span class="hljs-string"> 鼠标在盒子里面的距离</span></code></pre>
<p><em>[ 46-事件对象-获取鼠标在盒子中的位置.html ]</em></p>
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
        width: 150px;
        height: 150px;
        background: #b7f5de;
        margin: 200px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');

    box.onclick = function(e) {
        var e = e || window.event;
        // 没有直接的方法能够获取，但是我们可以通过：
        // 获取鼠标的位置 - 盒子距离顶部和左边的距离 = 鼠标在盒子里面的距离
        var x = getPage(e).x - box.offsetLeft;
        var y = getPage(e).y - box.offsetTop;
        console.log(&quot;当前位置坐标：(&quot; + x + &quot;,&quot; + y + &quot;)&quot;);
    }

    function getPage(e) {
        return {
            x: e.pageX || e.clientX + document.documentElement.scrollLeft,
            y: e.pageY || e.clientY + document.documentElement.scrollTop
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
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#b7f5de</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-comment">// 没有直接的方法能够获取，但是我们可以通过：</span>
        <span class="hljs-comment">// 获取鼠标的位置 - 盒子距离顶部和左边的距离 = 鼠标在盒子里面的距离</span>
        <span class="hljs-keyword">var</span> x = getPage(e).x - box.offsetLeft;
        <span class="hljs-keyword">var</span> y = getPage(e).y - box.offsetTop;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"当前位置坐标：("</span> + x + <span class="hljs-string">","</span> + y + <span class="hljs-string">")"</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">x</span>: e.pageX || e.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
            <span class="hljs-attr">y</span>: e.pageY || e.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmqkhjpwogj20fv0a0wei.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmqkhjpwogj20fv0a0wei.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、拖拽效果</strong></p>
<blockquote>拖拽效果在网页很常见，比如一个注册框，弹出来的时候，你可以拖动它的位置。</blockquote>
<p><strong>新事件：</strong></p>
<ul>
<li>
<code>onmousedown</code> ：当鼠标按下的时候触发</li>
<li>
<code>onmouseup</code> ：当鼠标弹起的时候触发</li>
</ul>
<p><strong>实现思路：</strong></p>
<ul>
<li>给盒子注册按下鼠标(<code>onmousedown</code>)事件，获取鼠标在盒子里的位置；</li>
<li>然后在里面注册页面移动鼠标(<code>onmousemove</code>)事件，鼠标移动时，将此时的鼠标距浏览器的距离减去鼠标在盒子中的距离后，赋值给盒子的<code>top/left</code>
</li>
<li>给页面注册松开鼠标(<code>onmouseup</code>)事件，盒子应该停在那个位置，所以清除移动事件。</li>
</ul>
<p><em>[ 47-事件对象-拖拽效果.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 4000px;
    }
    #box {
        width: 150px;
        height: 150px;
        background: #B7F5DE;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');

    // 鼠标按下
    box.onmousedown = function(event) {
        event = event || window.event;
        // 记录按下的鼠标的位置
        var x = getPage(event).x - box.offsetLeft;
        var y = getPage(event).y - box.offsetTop;
        // 按下的时候才触发鼠标移动事件
        document.onmousemove = function(e) {
            // 鼠标点击的时候应该减去鼠标按下时在盒子中的位置
            box.style.left = getPage(e).x - x + &quot;px&quot;;
            box.style.top = getPage(e).y - y + &quot;px&quot;;
        }
    }

    // 鼠标松开
    // 这里为什么不给盒子注册鼠标松开事件呢？ 因为一旦有延迟，鼠标不在盒子上松开的时候，move事件就清除不掉了
    // 所以直接给页面注册鼠标松开事件，只要鼠标松开，就清除move事件
    document.onmouseup = function() {
        // 上面注册的移动事件会一直触发，所以在鼠标松开的时候，我们应该将移动事件移除掉
        document.onmousemove = null;
    }

    // 获取事件对象里的pageX/Y属性
    function getPage(e) {
        return {
            x: e.pageX || e.clientX + document.documentElement.scrollLeft,
            y: e.pageY || e.clientY + document.documentElement.scrollTop
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
    }
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4000px</span>;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#B7F5DE</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-comment">// 鼠标按下</span>
    box.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        event = event || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-comment">// 记录按下的鼠标的位置</span>
        <span class="hljs-keyword">var</span> x = getPage(event).x - box.offsetLeft;
        <span class="hljs-keyword">var</span> y = getPage(event).y - box.offsetTop;
        <span class="hljs-comment">// 按下的时候才触发鼠标移动事件</span>
        <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-comment">// 鼠标点击的时候应该减去鼠标按下时在盒子中的位置</span>
            box.style.left = getPage(e).x - x + <span class="hljs-string">"px"</span>;
            box.style.top = getPage(e).y - y + <span class="hljs-string">"px"</span>;
        }
    }

    <span class="hljs-comment">// 鼠标松开</span>
    <span class="hljs-comment">// 这里为什么不给盒子注册鼠标松开事件呢？ 因为一旦有延迟，鼠标不在盒子上松开的时候，move事件就清除不掉了</span>
    <span class="hljs-comment">// 所以直接给页面注册鼠标松开事件，只要鼠标松开，就清除move事件</span>
    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 上面注册的移动事件会一直触发，所以在鼠标松开的时候，我们应该将移动事件移除掉</span>
        <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// 获取事件对象里的pageX/Y属性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">x</span>: e.pageX || e.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
            <span class="hljs-attr">y</span>: e.pageY || e.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmqndhz8aqg209j05bt97.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmqndhz8aqg209j05bt97.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<ul><li>拖拽的时候，可能里面会有文字，当移动的时候，不小心获取文字焦点的时候，就不能清除鼠标移动事件了。</li></ul>
<p><strong>解决方法：</strong><br>清除选中的文字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.getSelection ? <span class="hljs-built_in">window</span>.getSelection().removeAllRanges() : <span class="hljs-built_in">document</span>.selection.empty();</code></pre>
<h3 id="articleHeader13">10.7 案例：放大镜</h3>
<blockquote>放大镜在开发中是一个很常见的特效，但是所有的放大镜的实现效果都是一样。</blockquote>
<p><strong>图解放大镜原理：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmqq6pj068j20ol0hpqag.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmqq6pj068j20ol0hpqag.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>实现思路：</strong></p>
<ul>
<li>当鼠标经过 <code>smallBox</code> 的时候，显示 <code>mask</code> 和 <code>bigBox</code>；</li>
<li>当鼠标离开 <code>smallBox</code> 的时候，隐藏 <code>mask</code> 和 <code>bigBox</code>；</li>
<li>获取鼠标在 <code>smallBox</code> 里面的位置；</li>
<li>获得鼠标在 <code>smallBox</code> 里面的位置后，要减去 mask 一半的宽高，否则鼠标不在 <code>mask</code> 中间显示；</li>
<li>
<p>判断x的值限定 <code>mask</code> 的位置 ：</p>
<ul>
<li>
<code>mask</code> 在小盒子里面能够移动最大的宽度和高度 <code>0</code> ；</li>
<li>
<code>mask</code> 在小盒子里面能够移动最大的宽度 = <code>smallBox</code>的宽度 - <code>mask</code>的宽度</li>
</ul>
</li>
<li>设定 mask 的位置；</li>
<li>
<p>让大图片等比例的跟着动 ：</p>
<ul><li>
<code>bigImg</code> 能够移动的距离 / <code>mask</code> 能移动的距离 = 大图片移动的距离 / <code>mask</code>移动的距离</li></ul>
</li>
</ul>
<p><strong>思路图解：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmqucut4uuj21ei0mcwn5.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmqucut4uuj21ei0mcwn5.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：</strong> <em>[ 48-事件对象-放大镜效果.html ]</em></p>
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
        width: 350px;
        height: 350px;
        margin: 100px;
        border: 1px solid #ccc;
        position: relative;
    }
    #bigBox {
        width: 400px;
        height: 400px;
        position: absolute;
        top: 0;
        left: 360px;
        border: 1px solid #ccc;
        overflow: hidden;
        display: none;
    }
    .mask {
        width: 175px;
        height: 175px;
        background-image: url(../image/放大镜/1.png);
        position: absolute;
        top: 1px;
        left: 1px;
        cursor: move;
        display: none;
    }
    #smallBox {
        position: relative;
    }
    #box img {
        vertical-align: top;
    }
    #bigBox img {
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div id=&quot;smallBox&quot;>
        <img src=&quot;../image/放大镜/img.jpg&quot; width=&quot;350&quot; alt=&quot;&quot;>
        <div id=&quot;mask&quot; class=&quot;mask&quot;></div>
    </div>
    <div id=&quot;bigBox&quot;>
        <img src=&quot;../image/放大镜/img.jpg&quot; width=&quot;800&quot; id=&quot;bigImg&quot; alt=&quot;&quot; />
    </div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var smallBox = document.getElementById('smallBox');
    var bigBox = document.getElementById('bigBox');
    var mask = document.getElementById('mask');
    var bigImg = document.getElementById('bigImg');

    // 当鼠标 经过smallBox的时候，显示 mask 和 bigBox
    smallBox.onmouseover = function() {
        mask.style.display = &quot;block&quot;;
        bigBox.style.display = &quot;block&quot;;
    };
    // 当鼠标 离开smallBox的时候，隐藏 mask 和 bigBox
    smallBox.onmouseout = function() {
        mask.style.display = &quot;none&quot;;
        bigBox.style.display = &quot;none&quot;;
    };
    // 鼠标在smallBox里面移动，移动 mask 和 bigImg
    smallBox.onmousemove = function(e) {
        var e = e || window.event;
        // mask 跟着鼠标移动
        // 1- 获取鼠标在smallBox里面的位置
        var spaceX = getPage(e).x - box.offsetLeft;
        var spaceY = getPage(e).y - box.offsetTop;

        // 2- 获得鼠标在smallBox里面的位置后，要减去mask一半的宽高，否则鼠标不在mask中间显示
        var x = spaceX - mask.offsetWidth / 2;
        var y = spaceY - mask.offsetHeight / 2;

        // 3- 判断x的值 限定 mask的位置 
        // mask 在小盒子里面能够移动最大的宽度和高度 0 
        if (x <= 0) {
            x = 0;
        }
        if (y <= 0) {
            y = 0;
        }
        // mask 在小盒子里面能够移动最大的宽度 = smallBox的宽度 - mask的宽度
        var maskMaxX = smallBox.offsetWidth - mask.offsetWidth;
        var maskMaxY = smallBox.offsetHeight - mask.offsetHeight;
        if (x >= maskMaxX) {
            x = maskMaxX;
        }
        if (y >= maskMaxY) {
            y = maskMaxY;
        }

        // 4- 设定mask的位置
        mask.style.left = x + &quot;px&quot;;
        mask.style.top = y + &quot;px&quot;;

        // 5- 让大图片等比例的跟着动   
        // bigImg 能够移动的距离 / mask 能移动的距离 = 大图片移动的距离 / mask移动的距离
        // rate ：比例
        var xRate = (bigImg.offsetWidth - bigBox.offsetWidth) / maskMaxX;
        bigImg.style.left = -xRate * x + &quot;px&quot;;
        var yRate = (bigImg.offsetHeight - bigBox.offsetHeight) / maskMaxY;
        bigImg.style.top = -yRate * y + &quot;px&quot;;
    };

    // pageX/Y 兼容性处理
    function getPage(e) {
        return {
            x: e.pageX || e.clientX + document.documentElement.scrollLeft,
            y: e.pageY || e.clientY + document.documentElement.scrollTop
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
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#bigBox</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">360px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">display</span>: none;
    }
    <span class="hljs-selector-class">.mask</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">175px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">175px</span>;
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/放大镜/1.png);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">1px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">1px</span>;
        <span class="hljs-attribute">cursor</span>: move;
        <span class="hljs-attribute">display</span>: none;
    }
    <span class="hljs-selector-id">#smallBox</span> {
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#box</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">vertical-align</span>: top;
    }
    <span class="hljs-selector-id">#bigBox</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"smallBox"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/放大镜/img.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mask"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bigBox"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/放大镜/img.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bigImg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> smallBox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'smallBox'</span>);
    <span class="hljs-keyword">var</span> bigBox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'bigBox'</span>);
    <span class="hljs-keyword">var</span> mask = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mask'</span>);
    <span class="hljs-keyword">var</span> bigImg = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'bigImg'</span>);

    <span class="hljs-comment">// 当鼠标 经过smallBox的时候，显示 mask 和 bigBox</span>
    smallBox.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        mask.style.display = <span class="hljs-string">"block"</span>;
        bigBox.style.display = <span class="hljs-string">"block"</span>;
    };
    <span class="hljs-comment">// 当鼠标 离开smallBox的时候，隐藏 mask 和 bigBox</span>
    smallBox.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        mask.style.display = <span class="hljs-string">"none"</span>;
        bigBox.style.display = <span class="hljs-string">"none"</span>;
    };
    <span class="hljs-comment">// 鼠标在smallBox里面移动，移动 mask 和 bigImg</span>
    smallBox.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-comment">// mask 跟着鼠标移动</span>
        <span class="hljs-comment">// 1- 获取鼠标在smallBox里面的位置</span>
        <span class="hljs-keyword">var</span> spaceX = getPage(e).x - box.offsetLeft;
        <span class="hljs-keyword">var</span> spaceY = getPage(e).y - box.offsetTop;

        <span class="hljs-comment">// 2- 获得鼠标在smallBox里面的位置后，要减去mask一半的宽高，否则鼠标不在mask中间显示</span>
        <span class="hljs-keyword">var</span> x = spaceX - mask.offsetWidth / <span class="hljs-number">2</span>;
        <span class="hljs-keyword">var</span> y = spaceY - mask.offsetHeight / <span class="hljs-number">2</span>;

        <span class="hljs-comment">// 3- 判断x的值 限定 mask的位置 </span>
        <span class="hljs-comment">// mask 在小盒子里面能够移动最大的宽度和高度 0 </span>
        <span class="hljs-keyword">if</span> (x &lt;= <span class="hljs-number">0</span>) {
            x = <span class="hljs-number">0</span>;
        }
        <span class="hljs-keyword">if</span> (y &lt;= <span class="hljs-number">0</span>) {
            y = <span class="hljs-number">0</span>;
        }
        <span class="hljs-comment">// mask 在小盒子里面能够移动最大的宽度 = smallBox的宽度 - mask的宽度</span>
        <span class="hljs-keyword">var</span> maskMaxX = smallBox.offsetWidth - mask.offsetWidth;
        <span class="hljs-keyword">var</span> maskMaxY = smallBox.offsetHeight - mask.offsetHeight;
        <span class="hljs-keyword">if</span> (x &gt;= maskMaxX) {
            x = maskMaxX;
        }
        <span class="hljs-keyword">if</span> (y &gt;= maskMaxY) {
            y = maskMaxY;
        }

        <span class="hljs-comment">// 4- 设定mask的位置</span>
        mask.style.left = x + <span class="hljs-string">"px"</span>;
        mask.style.top = y + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// 5- 让大图片等比例的跟着动   </span>
        <span class="hljs-comment">// bigImg 能够移动的距离 / mask 能移动的距离 = 大图片移动的距离 / mask移动的距离</span>
        <span class="hljs-comment">// rate ：比例</span>
        <span class="hljs-keyword">var</span> xRate = (bigImg.offsetWidth - bigBox.offsetWidth) / maskMaxX;
        bigImg.style.left = -xRate * x + <span class="hljs-string">"px"</span>;
        <span class="hljs-keyword">var</span> yRate = (bigImg.offsetHeight - bigBox.offsetHeight) / maskMaxY;
        bigImg.style.top = -yRate * y + <span class="hljs-string">"px"</span>;
    };

    <span class="hljs-comment">// pageX/Y 兼容性处理</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPage</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">x</span>: e.pageX || e.clientX + <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
            <span class="hljs-attr">y</span>: e.pageY || e.clientY + <span class="hljs-built_in">document</span>.documentElement.scrollTop
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmqsh0k5ang20kc0au1kx.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmqsh0k5ang20kc0au1kx.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">11. 注册事件</h2>
<blockquote>前面我们已经知道了许多触发事件的名称，但是我们只知道了一种注册事件的方式，就是"<code>on</code> + 事件名称"，下面会为大家再介绍一种注册事件的方式：<code>addEventListener</code>。</blockquote>
<h3 id="articleHeader15">11.1 on + 事件名称 方式</h3>
<blockquote>
<code>onclick</code>、<code>onmouseover</code>这种<code>on</code>+ 事件名称的方式注册事件几乎所有的浏览器都支持。</blockquote>
<p><strong>注册事件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box.onclick = function(){
    //事件处理程序    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//事件处理程序    </span>
}</code></pre>
<p><strong>移除事件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box.onclick = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">box.onclick = <span class="hljs-literal">null</span>;</code></pre>
<p><strong>on + 事件名称注册事件的缺点：</strong></p>
<p><em>同一个元素同一类型的事件，只能注册一个，如果注册了多个，会出现覆盖问题。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.onclick = function(){
    console.log(&quot;呵呵&quot;);
}

document.onclick = function(){
    console.log(&quot;哈哈&quot;);   // 最后打印的是 &quot;哈哈&quot;，呵呵会被覆盖掉
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"呵呵"</span>);
}

<span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈"</span>);   <span class="hljs-comment">// 最后打印的是 "哈哈"，呵呵会被覆盖掉</span>
}</code></pre>
<h3 id="articleHeader16">11.2 addEventListener 方式</h3>
<blockquote>现代浏览器支持的注册事件的新方式，这种方式注册的事件不会出现覆盖问题。以后在手机端就用这种注册事件的方式。</blockquote>
<p><strong>1、addEventListener 注册事件的语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// add：添加   Event：事件   Listener：监听器
// 三个参数：
//      1. type：事件类型  &quot;click&quot;,&quot;mouseover&quot;... 不要再加 on了
//      2. 函数：事件触发的时候要执行的程序
//      3. useCapture(是否使用事件捕获) ：true &amp; false 默认是false
document.addEventListener(type,function(){
    // 事件处理程序
},useCapture);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// add：添加   Event：事件   Listener：监听器</span>
<span class="hljs-comment">// 三个参数：</span>
<span class="hljs-comment">//      1. type：事件类型  "click","mouseover"... 不要再加 on了</span>
<span class="hljs-comment">//      2. 函数：事件触发的时候要执行的程序</span>
<span class="hljs-comment">//      3. useCapture(是否使用事件捕获) ：true &amp; false 默认是false</span>
<span class="hljs-built_in">document</span>.addEventListener(type,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 事件处理程序</span>
},useCapture);</code></pre>
<p><em>之前我们说过<code>window.onload</code>，只能注册一个就是这个原因，因为"<code>on +</code>"注册方式会覆盖。所以如果真的需要执行两个<code>window.onload</code>事件的时候，我们就可以使用<code>addEventListener</code>注册：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;load&quot;,function(){
    // 预加载函数 1
});

window.addEventListener(&quot;load&quot;,function(){
    // 预加载函数 2
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"load"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 预加载函数 1</span>
});

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"load"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 预加载函数 2</span>
});</code></pre>
<p><strong>示例代码：</strong> <em>[ 49-注册事件-addEventListener.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给页面注册点击事件后，会同时打印 &quot;呵呵呵&quot;，&quot;哈哈哈&quot;
document.addEventListener(&quot;click&quot;, function() {
    console.log(&quot;呵呵呵&quot;);
});
document.addEventListener(&quot;click&quot;, function() {
    console.log(&quot;哈哈哈&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 给页面注册点击事件后，会同时打印 "呵呵呵"，"哈哈哈"</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"呵呵呵"</span>);
});
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈哈"</span>);
});</code></pre>
<p><strong>2、removeEventListener 移除事件的语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// remove：移除   Event：事件   Listener：监听器
// 三个参数：
//      1. type：事件类型  &quot;click&quot;,&quot;mouseover&quot;
//      2. 函数名：要移除的那个函数
//      3. useCapture(是否使用事件捕获) ：true &amp; false 默认是false
document.addEventListener(type,fn,useCapture);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// remove：移除   Event：事件   Listener：监听器</span>
<span class="hljs-comment">// 三个参数：</span>
<span class="hljs-comment">//      1. type：事件类型  "click","mouseover"</span>
<span class="hljs-comment">//      2. 函数名：要移除的那个函数</span>
<span class="hljs-comment">//      3. useCapture(是否使用事件捕获) ：true &amp; false 默认是false</span>
<span class="hljs-built_in">document</span>.addEventListener(type,fn,useCapture);</code></pre>
<p><strong>注意：</strong></p>
<p>要想一个事件能够被移除，在它注册事件的时候，执行函数必须要有函数名，不能是匿名函数。因为移除事件的时候，就是移除的这个函数名。</p>
<p><strong>示例代码：</strong> <em>[ 50-移除事件-removeEventListener.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二个点击事件就被移除了
document.addEventListener(&quot;click&quot;, fn1);
document.addEventListener(&quot;click&quot;, fn2);

function fn1() {
    console.log(&quot;呵呵呵&quot;);
};

function fn2() {
    console.log(&quot;哈哈哈&quot;);
}

// 移除第二个点击事件
document.removeEventListener(&quot;click&quot;, fn2); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二个点击事件就被移除了</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>, fn1);
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>, fn2);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"呵呵呵"</span>);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈哈"</span>);
}

<span class="hljs-comment">// 移除第二个点击事件</span>
<span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">"click"</span>, fn2); </code></pre>
<p><strong>3、IE678兼容性问题：</strong></p>
<blockquote>
<code>IE678</code>不支持<code>addEventListener</code>与<code>removeEventListen</code>两个方法，但是支持<code>attachEvent</code>与<code>detachEvnet</code>。</blockquote>
<p><strong>attachEvent注册事件的语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// attach ：附上；系上；贴上 
// 参数：
//     1. type:事件类型   需要加上on &quot;onclick&quot;,&quot;onmouseenter&quot;...
//     2. 函数fn:需要执行的那个事件函数
attachEvent(type, function(){
    // 事件处理程序
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// attach ：附上；系上；贴上 </span>
<span class="hljs-comment">// 参数：</span>
<span class="hljs-comment">//     1. type:事件类型   需要加上on "onclick","onmouseenter"...</span>
<span class="hljs-comment">//     2. 函数fn:需要执行的那个事件函数</span>
attachEvent(type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 事件处理程序</span>
});</code></pre>
<p><em>attach注册时间的时候，事件类型要加上<code>on</code>，没有为什么，IE就这样</em></p>
<p><strong>detachEvent的用法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// detach ：脱离
// 参数：
//     1. type:事件类型   需要加上on &quot;onclick&quot;,&quot;onmouseenter&quot;...
//     2. 函数名: 需要执行的那个事件函数名
detachEvent(type, fn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// detach ：脱离</span>
<span class="hljs-comment">// 参数：</span>
<span class="hljs-comment">//     1. type:事件类型   需要加上on "onclick","onmouseenter"...</span>
<span class="hljs-comment">//     2. 函数名: 需要执行的那个事件函数名</span>
detachEvent(type, fn);</code></pre>
<p><strong>示例代码：</strong> <em>[ 51-注册事件-IE678方法.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// IE678 下运行
document.attachEvent(&quot;onclick&quot;, fn1);
document.attachEvent(&quot;onclick&quot;, fn2);

function fn1() {
    alert(&quot;123&quot;);
};

function fn2() {
    alert(&quot;456&quot;);
};

// 移除第一个注册事件
document.detachEvent(&quot;onclick&quot;, fn1);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// IE678 下运行</span>
<span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"onclick"</span>, fn1);
<span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"onclick"</span>, fn2);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"123"</span>);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"456"</span>);
};

<span class="hljs-comment">// 移除第一个注册事件</span>
<span class="hljs-built_in">document</span>.detachEvent(<span class="hljs-string">"onclick"</span>, fn1);  </code></pre>
<p><strong>4、兼容性处理：</strong></p>
<blockquote>注册事件的新方式的解决了事件覆盖的问题，但是存在浏览器兼容性问题，因此可以进行兼容性封装。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加事件兼容性封装
function addEvent(element, type, fn) {
    // 能力检测
    if (element.addEventListener) {
        element.addEventListener(type, fn);
    } else if (element.attachEvent) {
        element.attachEvent(&quot;on&quot; + type, fn);
    } else {
        //如果都不行，那就用on方式
        element[&quot;on&quot; + type] = fn;
    }
};

//移除事件兼容性封装
function removeEvent(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn);
    } else if (element.detachEvent) {
        element.detachEvent(&quot;on&quot; + type, fn);
    } else {
        element[&quot;on&quot; + type] = null;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 添加事件兼容性封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, type, fn</span>) </span>{
    <span class="hljs-comment">// 能力检测</span>
    <span class="hljs-keyword">if</span> (element.addEventListener) {
        element.addEventListener(type, fn);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
        element.attachEvent(<span class="hljs-string">"on"</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//如果都不行，那就用on方式</span>
        element[<span class="hljs-string">"on"</span> + type] = fn;
    }
};

<span class="hljs-comment">//移除事件兼容性封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeEvent</span>(<span class="hljs-params">element, type, fn</span>) </span>{
    <span class="hljs-keyword">if</span> (element.removeEventListener) {
        element.removeEventListener(type, fn);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.detachEvent) {
        element.detachEvent(<span class="hljs-string">"on"</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        element[<span class="hljs-string">"on"</span> + type] = <span class="hljs-literal">null</span>;
    }
}</code></pre>
<p><strong>示例代码：</strong> <em>[ 52-注册事件-封装兼容性.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加事件兼容性封装
function addEvent(element, type, fn) {
    // 能力检测
    if (element.addEventListener) {
        element.addEventListener(type, fn);
    } else if (element.attachEvent) {
        element.attachEvent(&quot;on&quot; + type, fn);
    } else {
        //如果都不行，那就用on方式
        element[&quot;on&quot; + type] = fn;
    }
};

//移除事件兼容性封装
function removeEvent(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn);
    } else if (element.detachEvent) {
        element.detachEvent(&quot;on&quot; + type, fn);
    } else {
        element[&quot;on&quot; + type] = null;
    }
}

function fn1() {
    alert(&quot;呵呵&quot;);
}

function fn2() {
    alert(&quot;哈哈&quot;);
}

addEvent(document, &quot;click&quot;, fn1);
addEvent(document, &quot;click&quot;, fn2);
removeEvent(document, &quot;click&quot;, fn1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 添加事件兼容性封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, type, fn</span>) </span>{
    <span class="hljs-comment">// 能力检测</span>
    <span class="hljs-keyword">if</span> (element.addEventListener) {
        element.addEventListener(type, fn);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
        element.attachEvent(<span class="hljs-string">"on"</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//如果都不行，那就用on方式</span>
        element[<span class="hljs-string">"on"</span> + type] = fn;
    }
};

<span class="hljs-comment">//移除事件兼容性封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeEvent</span>(<span class="hljs-params">element, type, fn</span>) </span>{
    <span class="hljs-keyword">if</span> (element.removeEventListener) {
        element.removeEventListener(type, fn);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.detachEvent) {
        element.detachEvent(<span class="hljs-string">"on"</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        element[<span class="hljs-string">"on"</span> + type] = <span class="hljs-literal">null</span>;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"呵呵"</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"哈哈"</span>);
}

addEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">"click"</span>, fn1);
addEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">"click"</span>, fn2);
removeEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">"click"</span>, fn1);</code></pre>
<h2 id="articleHeader17">12. 事件冒泡和事件捕获</h2>
<blockquote>事件冒泡和事件捕获其实可以理解成一样东西，就是当父级元素和子元素都具有点击事件的时候，点击触发子级元素的时候父级元素也会被触发。事件冒泡是<code>IE678</code>在处理事件间机制的一种说法，它执行的顺序是由内向外的，就是从子元素一直到<code>window</code>。 事件捕获是火狐在处理机制时的一种说法，它执行的顺序是由外向内的，就是<code>window</code>一直到子元素。</blockquote>
<p><strong>图解事件冒泡和事件捕获：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt0t991q2j212u0d9q3j.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt0t991q2j212u0d9q3j.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">12.1 事件冒泡</h3>
<blockquote>当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡。<p>说白了就是：当父元素和子元素都设置了点击事件的时候，触发子盒子点击事件的时候，父盒子的点击事件也会被执行。</p>
</blockquote>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmsynx1r7lj20cq0akgng.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmsynx1r7lj20cq0akgng.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：</strong> <em>[ 53-事件冒泡.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
        #big-box {
            width: 500px;
            height: 500px;
            margin: 100px auto;
            vertical-align: middle;
            text-align: center;
            border: 1px solid transparent;
            background-color: aquamarine;
        }
        
        #box {
            width: 300px;
            height: 300px;
            margin-top: 100px;
            display: inline-block;
            background-color: darkorange;
        }
</style>

<!-- html 部分 -->
<div id=&quot;big-box&quot;>
    <div id=&quot;box&quot;></div>
</div>

<!-- js 部分 -->
<script>
    var bigBox = document.getElementById('big-box');
    var box = document.getElementById('box'); 
    document.onclick = function() {
        document.body.style.background = &quot;#000&quot;;
    }
    bigBox.onclick = function() {
        bigBox.style.background = &quot;fuchsia&quot;;
    }
    box.onclick = function() {
        // 当我们点击box的时候，bigBox、body的点击事件 也会被触发
        box.style.background = &quot;lightgreen&quot;;
    }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#big-box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
            <span class="hljs-attribute">vertical-align</span>: middle;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
            <span class="hljs-attribute">background-color</span>: aquamarine;
        }
        
        <span class="hljs-selector-id">#box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">background-color</span>: darkorange;
        }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"big-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> bigBox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'big-box'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>); 
    <span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.body.style.background = <span class="hljs-string">"#000"</span>;
    }
    bigBox.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        bigBox.style.background = <span class="hljs-string">"fuchsia"</span>;
    }
    box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 当我们点击box的时候，bigBox、body的点击事件 也会被触发</span>
        box.style.background = <span class="hljs-string">"lightgreen"</span>;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmsziiil10g20kc097wep.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmsziiil10g20kc097wep.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们会发现，当点击中间小盒子的时候，他的父级元素，只要有点击事件的，都被触发了，这就是事件冒泡。</em></p>
<h3 id="articleHeader19">12.2 阻止事件冒泡</h3>
<blockquote>正常情况下，我们肯定不想，点击子元素触发事件的时候，父元素事件也跟着触发，所以我们就要知道一个知识点：阻止事件冒泡。在阻止事件冒泡中是存在兼容性的：</blockquote>
<p><strong>正常浏览器：</strong></p>
<p><em>前面我们知道了事件触发的时候，会有一个事件对象，我们只要给事件对象加上：<code>stopPropagation</code>方法即可。<code>stopPropagation</code>方法不仅可以阻止事件冒泡，还可以阻止事件委托</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.onclick = function (e) {
    e = event || window.event;
    //stop :停止  propagation：传播
    e.stopPropagation();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e = event || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-comment">//stop :停止  propagation：传播</span>
    e.stopPropagation();
}</code></pre>
<p><strong>IE678浏览器：</strong></p>
<p><em>ie是给事件对象的属性<code>cancelBubble</code>赋值</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.onclick = function (e) {
    e = event || window.event;   
    e.cancelBubble = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e = event || <span class="hljs-built_in">window</span>.event;   
    e.cancelBubble = <span class="hljs-literal">true</span>;
}</code></pre>
<p><strong>兼容性处理：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 能力检测
element.onclick = function (e) {
    e = event || window.event;
    if(e.stopPropagation){
          e.stopPropagation();
    }else {
          e.cancelBubble = true;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 能力检测</span>
element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e = event || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-keyword">if</span>(e.stopPropagation){
          e.stopPropagation();
    }<span class="hljs-keyword">else</span> {
          e.cancelBubble = <span class="hljs-literal">true</span>;
    }
}</code></pre>
<h3 id="articleHeader20">12.3 事件捕获</h3>
<blockquote>事件捕获(<code>capture</code>)是火狐浏览器提出来的，<code>IE678</code>不支持事件捕获（基本上，我们都是用事件冒泡）。事件的处理将从<code>DOM</code>层次的根开始，而不是从触发事件的目标元素开始，事件被从目标元素的所有祖先元素依次往下传递。</blockquote>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt22c80mij20ca0a040c.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt22c80mij20ca0a040c.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>当<code>addEventListener</code>第三个参数为true时，表示事件捕获：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.addEventListener(&quot;click&quot;, function () {
    console.log(&quot;哈哈哈&quot;);
},true);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">element.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈哈"</span>);
},<span class="hljs-literal">true</span>);  </code></pre>
<h3 id="articleHeader21">12.4 事件流</h3>
<blockquote>事件流就是事件的三个阶段，首先发生的是捕获阶段，然后是目标阶段，最后才是冒泡阶段，对于捕获和冒泡，我们只能干预其中的一个，通常来说，我们可能会干预事件冒泡阶段，而不去干预事件捕获阶段。</blockquote>
<ul>
<li>事件的捕获阶段</li>
<li>事件的目标阶段</li>
<li>事件的冒泡阶段</li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt2ju5togj20h20ag74k.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt2ju5togj20h20ag74k.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<p><em>其实这三个阶段在执行是都会发生，但是冒泡和捕获只能执行一个，所以通过<code>usecaptrue = false</code>可以让捕获阶段执行但是不触发。</em></p>
<h3 id="articleHeader22">12.5 键盘事件</h3>
<blockquote>对于鼠标事件，事件对象中有一系列的<code>XY</code>记录了鼠标的位置信息。而键盘事件中，事件对象有一个<code>event.keyCode</code>属性，记录了按下去的键的键盘码。<em>[ 54-键盘事件-键盘码.html ]</em>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.onkeydown = function (e) {
    // 键盘按下的时候触发的事件对象 
    console.log(e);
    // keyCode: 键盘码
    console.log(e.keyCode);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.onkeydown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">// 键盘按下的时候触发的事件对象 </span>
    <span class="hljs-built_in">console</span>.log(e);
    <span class="hljs-comment">// keyCode: 键盘码</span>
    <span class="hljs-built_in">console</span>.log(e.keyCode);
}</code></pre>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt32skx48j20hv0cfwfb.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt32skx48j20hv0cfwfb.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>键盘码对应值：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt35fmrwuj20sf09cn28.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt35fmrwuj20sf09cn28.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>常见的键盘事件：</strong></p>
<ul>
<li>
<code>onkeydown</code>:键盘按下时触发</li>
<li>
<code>onkeyup</code>:键盘弹起时触发</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 55-键盘事件-ESC键关闭遮罩层弹出框.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 点击登陆按钮
var btn = document.getElementById('btn');
// 登陆框
var login = document.getElementById('login');
// 遮罩层
var bg = document.getElementById('bg');
btn.addEventListener(&quot;click&quot;, function() {
    login.style.display = &quot;block&quot;;
    bg.style.display = &quot;block&quot;;
});
document.addEventListener(&quot;keyup&quot;, function(e) {
    e = e || window.event;
    // ESC 键的键盘码是27
    if (e.keyCode == 27) {
        login.style.display = &quot;none&quot;;
        bg.style.display = &quot;none&quot;;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 点击登陆按钮</span>
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-comment">// 登陆框</span>
<span class="hljs-keyword">var</span> login = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'login'</span>);
<span class="hljs-comment">// 遮罩层</span>
<span class="hljs-keyword">var</span> bg = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'bg'</span>);
btn.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    login.style.display = <span class="hljs-string">"block"</span>;
    bg.style.display = <span class="hljs-string">"block"</span>;
});
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"keyup"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    e = e || <span class="hljs-built_in">window</span>.event;
    <span class="hljs-comment">// ESC 键的键盘码是27</span>
    <span class="hljs-keyword">if</span> (e.keyCode == <span class="hljs-number">27</span>) {
        login.style.display = <span class="hljs-string">"none"</span>;
        bg.style.display = <span class="hljs-string">"none"</span>;
    }
});</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmt4ejmzf1g20ly0dpaaq.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmt4ejmzf1g20ly0dpaaq.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader23">12.6 案例：弹幕效果</h3>
<blockquote>我们都看过直播，都知道弹幕的效果，下面我们就模拟直播中的弹幕做个小案例。</blockquote>
<p><strong>实现步骤：</strong></p>
<ul>
<li>获取输入框的的 <code>value</code> 值；并生成 <code>span</code> 标签</li>
<li>将 <code>span</code> 标签添加到 页面中，随机颜色 随机高度 <code>span</code>动画从右向左</li>
<li>到达最左边的时候删除 <code>span</code> 标签(不删除会随着输入的内容越来越多影响性能)</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    html,
    body {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        font-family: &quot;微软雅黑&quot;;
        font-size: 62.5%;
        background: #ccc;
    }
    #page {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    #import {
        width: 100%;
        height: 60px;
        background: #666;
        position: fixed;
        bottom: 0px;
    }
    #content {
        display: inline-block;
        width: 430px;
        height: 40px;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
    }
    .title {
        display: inline;
        font-size: 25px;
        vertical-align: bottom;
        color: #fff;
    }
    #text {
        border: none;
        width: 300px;
        height: 30px;
        border-radius: 5px;
        font-size: 15px;
        padding-left: 10px;
    }
    #btn {
        width: 60px;
        height: 30px;
        background: #f90000;
        border: none;
        color: #fff;
        font-size: 15px;
    }
    span {
        width: 300px;
        height: 40px;
        position: absolute;
        overflow: hidden;
        color: #000;
        font-size: 25px;
        line-height: 37.5px;
        cursor: pointer;
        white-space: nowrap;
    }
</style>

<!-- html 部分-->
<div id=&quot;page&quot;>
    <div id=&quot;import&quot;>
        <div id=&quot;content&quot;>
            <p class=&quot;title&quot;>吐槽</p>
            <input type=&quot;text&quot; name=&quot;&quot; id=&quot;text&quot; placeholder=&quot;发送弹幕，与小伙伴一起互动！&quot;>
            <button id=&quot;btn&quot;>发射</button>
        </div>
    </div>
</div>

<!-- js 部分 -->
<script src=&quot;../js/animate-callback.js&quot;></script>
<script>
    var page = document.getElementById('page');
    var text = document.getElementById('text');
    var btn = document.getElementById('btn');

    // 定义一个颜色数组
    var colorArr = ['#FF895D', '#78BBE6', '#FF4273', '#00BBF0', '#7C73E6', '#EE2B47', '#F60C86', '#9870FC', '#F96D00', '#303481'];

    btn.onclick = function() {
        // 点击发射按钮的时候，要做的事情：
        // 1- 获取 input 的 value 值；并生成 span 标签
        // 2- 将 span 标签添加到 page中，随机颜色 随机高度 span动画从右向左
        // 3- 到达最左边的时候删除 span 标签(不删除会随着输入的内容越来越多影响性能)
        // a. 获取input的值，并清空
        var content = text.value;
        // b. 生成span标签 添加到 page中
        if (content != &quot;&quot; &amp;&amp; content.trim()) {
            text.value = '';
            var span = document.createElement('span');
            page.appendChild(span);
            span.innerText = content;
            // c. 随机颜色
            var randomColor = parseInt(Math.random() * colorArr.length);
            span.style.color = colorArr[randomColor];
            // d. 随机高度  随机位置
            var randomHeight = parseInt(Math.random() * 201);
            span.style.top = randomHeight + &quot;px&quot;;
            span.style.left = getClient().width + &quot;px&quot;;
            // e. 动画效果
            animate(span, -300, function() {
                // f. 动画执行完成之后，回调函数中移除执行完的 span
                page.removeChild(span);
            });
        }
    };

    // text 注册键盘按下事件 当为回车按键的时候，执行发射操作
    text.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            btn.click();
        }
    }

    // 获取可视区域宽高
    function getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"微软雅黑"</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
    <span class="hljs-selector-id">#page</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-id">#import</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#666</span>;
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
    }
    <span class="hljs-selector-id">#content</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">430px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">margin</span>: auto;
    }
    <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">display</span>: inline;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">vertical-align</span>: bottom;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-id">#text</span> {
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-id">#btn</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90000</span>;
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
    }
    <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">37.5px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">white-space</span>: nowrap;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"import"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>吐槽<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"发送弹幕，与小伙伴一起互动！"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>发射<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/animate-callback.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> page = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'page'</span>);
    <span class="hljs-keyword">var</span> text = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'text'</span>);
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);

    <span class="hljs-comment">// 定义一个颜色数组</span>
    <span class="hljs-keyword">var</span> colorArr = [<span class="hljs-string">'#FF895D'</span>, <span class="hljs-string">'#78BBE6'</span>, <span class="hljs-string">'#FF4273'</span>, <span class="hljs-string">'#00BBF0'</span>, <span class="hljs-string">'#7C73E6'</span>, <span class="hljs-string">'#EE2B47'</span>, <span class="hljs-string">'#F60C86'</span>, <span class="hljs-string">'#9870FC'</span>, <span class="hljs-string">'#F96D00'</span>, <span class="hljs-string">'#303481'</span>];

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击发射按钮的时候，要做的事情：</span>
        <span class="hljs-comment">// 1- 获取 input 的 value 值；并生成 span 标签</span>
        <span class="hljs-comment">// 2- 将 span 标签添加到 page中，随机颜色 随机高度 span动画从右向左</span>
        <span class="hljs-comment">// 3- 到达最左边的时候删除 span 标签(不删除会随着输入的内容越来越多影响性能)</span>
        <span class="hljs-comment">// a. 获取input的值，并清空</span>
        <span class="hljs-keyword">var</span> content = text.value;
        <span class="hljs-comment">// b. 生成span标签 添加到 page中</span>
        <span class="hljs-keyword">if</span> (content != <span class="hljs-string">""</span> &amp;&amp; content.trim()) {
            text.value = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">var</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
            page.appendChild(span);
            span.innerText = content;
            <span class="hljs-comment">// c. 随机颜色</span>
            <span class="hljs-keyword">var</span> randomColor = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * colorArr.length);
            span.style.color = colorArr[randomColor];
            <span class="hljs-comment">// d. 随机高度  随机位置</span>
            <span class="hljs-keyword">var</span> randomHeight = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">201</span>);
            span.style.top = randomHeight + <span class="hljs-string">"px"</span>;
            span.style.left = getClient().width + <span class="hljs-string">"px"</span>;
            <span class="hljs-comment">// e. 动画效果</span>
            animate(span, <span class="hljs-number">-300</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// f. 动画执行完成之后，回调函数中移除执行完的 span</span>
                page.removeChild(span);
            });
        }
    };

    <span class="hljs-comment">// text 注册键盘按下事件 当为回车按键的时候，执行发射操作</span>
    text.onkeydown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">if</span> (e.keyCode == <span class="hljs-number">13</span>) {
            btn.click();
        }
    }

    <span class="hljs-comment">// 获取可视区域宽高</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClient</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">width</span>: <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-number">0</span>,
            <span class="hljs-attr">height</span>: <span class="hljs-built_in">window</span>.innerHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight || <span class="hljs-number">0</span>
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmu2jx2p6fg20qy0gwgxc.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmu2jx2p6fg20qy0gwgxc.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader24">13. 瀑布流</h2>
<blockquote>瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。</blockquote>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmv77m6zupj20l40d9ack.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmv77m6zupj20l40d9ack.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>1、首先瀑布流所有的图片应该保持宽度一致，高度是由内容决定。</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmw9rfqfxaj20hl0kmweh.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmw9rfqfxaj20hl0kmweh.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>左浮动的话，我们可以看到第<code>6</code>个盒子直接就在第<code>4</code>个盒子旁边停下了，因为第<code>4</code>个高度最高，挡住了它左浮动的去路。第<code>6</code>个盒子是第<code>2</code>行的最后一个，所以第<code>7</code>个盒子只能在第<code>3</code>行排列了。当排到第<code>12</code>个盒子的时候，盒子会以第<code>11</code>个盒子的位置为基础左浮动(这就是第<code>12</code>个盒子为什么没有‘跳到’第<code>9</code>个盒子下面的原因)，碰到第<code>8</code>个盒子后又被挡住了。</em></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmw9z2fsyoj20hp0cimx0.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmw9z2fsyoj20hp0cimx0.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>通过定位的方式是我们实现瀑布流的最基本的原理，只要我们动态的设置它的<code>top</code>值、<code>left</code>值，就能让它排列。</em></p>
<p><strong>2、定位后确定浏览器显示区域内，一行能放多少列图片盒子。</strong></p>
<ul>
<li>获取页面的宽度</li>
<li>获取图片盒子的宽度</li>
<li>显示的列数 = 页面宽度/图片盒子宽度</li>
<li><code>column = pageWidth / itemWidth</code></li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwa3kbr47j20hr0b4jrc.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwa3kbr47j20hr0b4jrc.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、为了美观我们可以加上一个空隙</strong></p>
<ul>
<li>显示的列数 = 页面宽度/(图片盒子宽度+间隙);</li>
<li><code>column = pageWidth / (itemWidth + gap);</code></li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwa7ips8sj20hq09rq2x.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwa7ips8sj20hq09rq2x.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、 确定列数之后，排列第一行</strong></p>
<ul>
<li>下面还有很多图片盒子，我们先要排列第<code>1</code>行，所以在<code>for</code>循环里就要判断一下，当<code>i</code>(所有图片盒子的索引) &lt; <code>column</code>(显示列数)的时候，说明在第<code>1</code>行；</li>
<li>知道在第<code>1</code>行之后，动态设置每个图片盒子的<code>left</code>值就能排好第<code>1</code>行。</li>
<li><code>left = i * ( itemWidth + gap );</code></li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwaocf297j20hr08x747.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwaocf297j20hr08x747.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、第1行排列好之后，获取第1行所有图片盒子的高度</strong></p>
<ul>
<li>需要定义一个数组<code>arr</code>，将获取到的高度存在数组中，因为第<code>2</code>行排列的时候需要考虑<code>top</code>值，此时只能根据第<code>1</code>行图片盒子的高度来设置；</li>
<li>获取图片高度的时候要注意，程序必须写在入口函数<code>onload</code>里面，因为图片的加载特性是：等页面都加载完之后才去请求加载，所以不写在入口函数里可能会出现高度获取不到的情况。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwbjql79xj20hx0a3wej.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwbjql79xj20hx0a3wej.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>6、排列第2行</strong></p>
<ul>
<li>获取到刚刚数组中，高度最小的那一列，将第<code>2</code>行的第<code>1</code>个图片盒子放置在它的下方；</li>
<li>此时的<code>left</code>值就是高度最小列的<code>offsetLeft</code>；<code>top</code>值就是：第<code>1</code>行高度最小列的高度(为了布局美观可以加上上下间隙<code>gap</code>)。</li>
<li>记录下高度最小列的索引<code>index</code>，后面计算会用到；</li>
<li>设置完成之后，会发现后面所有的图片都叠在这个高度最小列的下面，原因就是此时的最小列高度没有改变，应该加上下面图片的高度，得出一个新高度。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwbw3zguzj20hy0f0jre.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwbw3zguzj20hy0f0jre.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>7、改变最小列当前高度</strong></p>
<ul>
<li>此时的这一列高度其实已经发生改变了，所以需要将新高度赋值给数组</li>
<li>当前高度最小列的高度 = 当前高度最小列的高度 + 间隙 + 下面图片盒子的高度</li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwc576icxj20hr0f0jri.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwc576icxj20hr0f0jri.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>8、触发resize事件</strong></p>
<ul>
<li>将整个设置样式的部分封装成一个函数，在<code>onload</code>里面注册一个<code>resize</code>事件，只要页面一发生改变，就触发样式部分的代码。</li>
<li>实时改变<code>pageWidth</code>的宽度，这样瀑布流就会是一个响应式的效果了</li>
</ul>
<p><strong>9、懒加载效果</strong></p>
<ul>
<li>目前我们用的是<code>30</code>张图片，假如一个页面中有几百张图片的时候，我们不可能等到它都加载完再显示，所有这里引入一个懒加载的概念，我们规定第<code>30</code>张为显示的最后一张图片，当滚动条滚动到<code>30</code>张的时候，应该加载下一批图片。</li>
<li>即页面可视区高度+滚动条卷去的高度 = 第<code>30</code>图片的<code>offsetTop</code>；的时候加载下面的图片。</li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwcgmicj8j20i00n5q2y.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwcgmicj8j20i00n5q2y.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>完整代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        position: relative;
    }
    
    img {
        width: 220px;
        display: block;
    }
    
    .item {
        box-shadow: 2px 2px 2px #999;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div class=&quot;item&quot;><img src=&quot;../image/瀑布流/001.jpg&quot; alt=&quot;&quot;></div>
                                .
                                .
                                .
    <div class=&quot;item&quot;><img src=&quot;../image/瀑布流/030.jpg&quot; alt=&quot;&quot;></div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var items = box.children;
    // 定义每一列之间的间隙 为10像素
    var gap = 10;

    window.onload = function() {
        // 一进来就调用一次
        waterFall();
        // 封装成一个函数
        function waterFall() {
            // 1- 确定列数  = 页面的宽度 / 图片的宽度
            var pageWidth = getClient().width;
            var itemWidth = items[0].offsetWidth;
            var columns = parseInt(pageWidth / (itemWidth + gap));
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                if (i < columns) {
                    // 2- 确定第一行
                    items[i].style.top = 0;
                    items[i].style.left = (itemWidth + gap) * i + 'px';
                    arr.push(items[i].offsetHeight);

                } else {
                    // 其他行
                    // 3- 找到数组中最小高度  和 它的索引
                    var minHeight = arr[0];
                    var index = 0;
                    for (var j = 0; j < arr.length; j++) {
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    // 4- 设置下一行的第一个盒子位置
                    // top值就是最小列的高度 + gap
                    items[i].style.top = arr[index] + gap + 'px';
                    // left值就是最小列距离左边的距离
                    items[i].style.left = items[index].offsetLeft + 'px';

                    // 5- 修改最小列的高度 
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
        }
        // 页面尺寸改变时实时触发
        window.onresize = function() {
            waterFall();
        };
        // 当加载到第30张的时候
        window.onscroll = function() {
            if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
                // 模拟 ajax 获取数据    
                var datas = [
                    &quot;../image/瀑布流/001.jpg&quot;,
                            ...
                    &quot;../image/瀑布流/030.jpg&quot;
                ];
                for (var i = 0; i < datas.length; i++) {
                    var div = document.createElement(&quot;div&quot;);
                    div.className = &quot;item&quot;;
                    div.innerHTML = '<img src=&quot;' + datas[i] + '&quot; alt=&quot;&quot;>';
                    box.appendChild(div);
                }
                waterFall();
            }

        };
    };

    // clientWidth 处理兼容性
    function getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }
    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-class">.item</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/瀑布流/001.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                                .
                                .
                                .
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/瀑布流/030.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> items = box.children;
    <span class="hljs-comment">// 定义每一列之间的间隙 为10像素</span>
    <span class="hljs-keyword">var</span> gap = <span class="hljs-number">10</span>;

    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 一进来就调用一次</span>
        waterFall();
        <span class="hljs-comment">// 封装成一个函数</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waterFall</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 1- 确定列数  = 页面的宽度 / 图片的宽度</span>
            <span class="hljs-keyword">var</span> pageWidth = getClient().width;
            <span class="hljs-keyword">var</span> itemWidth = items[<span class="hljs-number">0</span>].offsetWidth;
            <span class="hljs-keyword">var</span> columns = <span class="hljs-built_in">parseInt</span>(pageWidth / (itemWidth + gap));
            <span class="hljs-keyword">var</span> arr = [];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; items.length; i++) {
                <span class="hljs-keyword">if</span> (i &lt; columns) {
                    <span class="hljs-comment">// 2- 确定第一行</span>
                    items[i].style.top = <span class="hljs-number">0</span>;
                    items[i].style.left = (itemWidth + gap) * i + <span class="hljs-string">'px'</span>;
                    arr.push(items[i].offsetHeight);

                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 其他行</span>
                    <span class="hljs-comment">// 3- 找到数组中最小高度  和 它的索引</span>
                    <span class="hljs-keyword">var</span> minHeight = arr[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
                        <span class="hljs-keyword">if</span> (minHeight &gt; arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    <span class="hljs-comment">// 4- 设置下一行的第一个盒子位置</span>
                    <span class="hljs-comment">// top值就是最小列的高度 + gap</span>
                    items[i].style.top = arr[index] + gap + <span class="hljs-string">'px'</span>;
                    <span class="hljs-comment">// left值就是最小列距离左边的距离</span>
                    items[i].style.left = items[index].offsetLeft + <span class="hljs-string">'px'</span>;

                    <span class="hljs-comment">// 5- 修改最小列的高度 </span>
                    <span class="hljs-comment">// 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度</span>
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
        }
        <span class="hljs-comment">// 页面尺寸改变时实时触发</span>
        <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            waterFall();
        };
        <span class="hljs-comment">// 当加载到第30张的时候</span>
        <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (getClient().height + getScrollTop() &gt;= items[items.length - <span class="hljs-number">1</span>].offsetTop) {
                <span class="hljs-comment">// 模拟 ajax 获取数据    </span>
                <span class="hljs-keyword">var</span> datas = [
                    <span class="hljs-string">"../image/瀑布流/001.jpg"</span>,
                            ...
                    <span class="hljs-string">"../image/瀑布流/030.jpg"</span>
                ];
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
                    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
                    div.className = <span class="hljs-string">"item"</span>;
                    div.innerHTML = <span class="hljs-string">'&lt;img src="'</span> + datas[i] + <span class="hljs-string">'" alt=""&gt;'</span>;
                    box.appendChild(div);
                }
                waterFall();
            }

        };
    };

    <span class="hljs-comment">// clientWidth 处理兼容性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClient</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">width</span>: <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth,
            <span class="hljs-attr">height</span>: <span class="hljs-built_in">window</span>.innerHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight
        }
    }
    <span class="hljs-comment">// scrollTop兼容性处理</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmwdk1v2hmg20ka0bfqv6.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmwdk1v2hmg20ka0bfqv6.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader25">14. 正则表达式</h2>
<blockquote>正则表达式：用于匹配规律规则的表达式，正则表达式最初是科学家对人类神经系统的工作原理的早起研究，现在在编程语言中有广泛的应用，经常用于表单校验，高级搜索等。</blockquote>
<h3 id="articleHeader26">14.1 创建正则表达式</h3>
<blockquote>js中的正则表达式用RegExp对象表示，可以通过RegExp()构造函数来创建RegExp对象，不过更多的是通过字面量语法来创建。</blockquote>
<p><em><code>/.../</code>正则表达式必须要有斜杠，它表示的是正则构成</em></p>
<p><strong>构造函数的方式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var regExp = new RegExp(/abc/); // 判断是否包含字符abc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> regExp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/abc/</span>); <span class="hljs-comment">// 判断是否包含字符abc</span></code></pre>
<p><strong>正则字面量：<code>/.../</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var regExp = /abc/;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> regExp = <span class="hljs-regexp">/abc/</span>;</code></pre>
<p><strong>正则的使用：</strong></p>
<p><em>正则表达式有一个方法：<code>test();</code> 有一个返回值，是布尔类型。决定参数是否符合正则表达式</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/abc/.test(&quot;abc&quot;)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/abc/</span>.test(<span class="hljs-string">"abc"</span>)); <span class="hljs-comment">// true</span></code></pre>
<p><strong>示例代码：</strong> <em>[ 57-正则表达式-创建正则表达式.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = new RegExp(/abc/);
console.log(reg.test(&quot;abc&quot;));   // ture
console.log(reg.test(&quot;efg&quot;));   // false
console.log(reg.test(&quot;abcd&quot;));  // true   只要包含abc就正确 后面会细讲
console.log(/123/.test(123));   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/abc/</span>);
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">"abc"</span>));   <span class="hljs-comment">// ture</span>
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">"efg"</span>));   <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">"abcd"</span>));  <span class="hljs-comment">// true   只要包含abc就正确 后面会细讲</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/123/</span>.test(<span class="hljs-number">123</span>));   <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader27">14.2 元字符</h3>
<blockquote>正则表达式由一些<code>普通字符</code>和<code>元字符</code>组成，普通字符包括大小写字母、数字等，而元字符则具有特殊的意义。元字符：<code>^</code>...</blockquote>
<h3 id="articleHeader28">14.3 正则内部类</h3>
<p><strong>1、预定义类</strong></p>
<blockquote>正则表达式中具有特殊意义的字符。</blockquote>
<table>
<thead><tr>
<th>预定义类</th>
<th>正则形式</th>
<th>释义</th>
</tr></thead>
<tbody>
<tr>
<td><code>.</code></td>
<td><code>[^\n\r]</code></td>
<td>除了换行和回车之外的任意字符</td>
</tr>
<tr>
<td><code>\d</code></td>
<td><code>[0-9]</code></td>
<td>数字字符</td>
</tr>
<tr>
<td><code>\D</code></td>
<td><code>[^0-9]</code></td>
<td>非数字字符</td>
</tr>
<tr>
<td><code>\w</code></td>
<td><code>[a-zA-Z0-9_]</code></td>
<td>单词字符(所有的字母数字和'_')</td>
</tr>
<tr>
<td><code>\W</code></td>
<td><code>[^a-zA-Z0-9_]</code></td>
<td>非单词字符</td>
</tr>
<tr>
<td><code>\s</code></td>
<td><code>[\f\r\n\t\v]</code></td>
<td>不可见字符，包含空格</td>
</tr>
<tr>
<td><code>\S</code></td>
<td><code>[^\f\r\n\t\v]</code></td>
<td>可见字符</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong> <em>[ 59-正则表达式-预定义类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;----------------'.'---------------&quot;);
console.log(/./.test('\n'));        // false
console.log(/./.test('2s#2'))       // true

console.log(&quot;----------------'\\d'---------------&quot;);
console.log(/\d/.test(123));        // true
console.log(/\d/.test('123abc'));   // true
console.log(/\d/.test('abc'));      // false

console.log(&quot;----------------'\\D'---------------&quot;);
console.log(/\D/.test(123));        // false
console.log(/\D/.test('123abc'));   // true
console.log(/\D/.test('abc'));      // true

console.log(&quot;----------------'\\w'---------------&quot;);
console.log(/\w/.test(123));        // true
console.log(/\w/.test('123abc_'));  // true
console.log(/\w/.test(' '));        // false

console.log(&quot;----------------'\\W'---------------&quot;);
console.log(/\W/.test(123));        // false
console.log(/\W/.test('123abc_'));  // false
console.log(/\W/.test(' '));        // true

console.log(&quot;----------------'\\s'---------------&quot;);
console.log(/\s/.test(123));        // false
console.log(/\s/.test('123abc_'));  // false
console.log(/\s/.test(' '));        // true

console.log(&quot;----------------'\\S'---------------&quot;);
console.log(/\S/.test(123));        // true
console.log(/\S/.test('123abc_'));  // true
console.log(/\S/.test(' '));        // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'.'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/./</span>.test(<span class="hljs-string">'\n'</span>));        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/./</span>.test(<span class="hljs-string">'2s#2'</span>))       <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\d'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\d/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\d/</span>.test(<span class="hljs-string">'123abc'</span>));   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\d/</span>.test(<span class="hljs-string">'abc'</span>));      <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\D'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\D/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\D/</span>.test(<span class="hljs-string">'123abc'</span>));   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\D/</span>.test(<span class="hljs-string">'abc'</span>));      <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\w'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\w/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\w/</span>.test(<span class="hljs-string">'123abc_'</span>));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\w/</span>.test(<span class="hljs-string">' '</span>));        <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\W'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\W/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\W/</span>.test(<span class="hljs-string">'123abc_'</span>));  <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\W/</span>.test(<span class="hljs-string">' '</span>));        <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\s'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\s/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\s/</span>.test(<span class="hljs-string">'123abc_'</span>));  <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\s/</span>.test(<span class="hljs-string">' '</span>));        <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----------------'\\S'---------------"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\S/</span>.test(<span class="hljs-number">123</span>));        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\S/</span>.test(<span class="hljs-string">'123abc_'</span>));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\S/</span>.test(<span class="hljs-string">' '</span>));        <span class="hljs-comment">// false</span>
</code></pre>
<p><strong>2、简单类</strong>  <em>[ 60-正则表达式-简单类.html ]</em></p>
<blockquote>
<code>/ /</code>中什么特殊符号也不写，就是简单类</blockquote>
<p><strong>直接字符：</strong> 必须是完整的包含正则选项，只能多不能少</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/levi/.test('levi'));       // true
console.log(/levi/.test('le'));         // false
console.log(/levi/.test('levi_lxh'));   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi/</span>.test(<span class="hljs-string">'levi'</span>));       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi/</span>.test(<span class="hljs-string">'le'</span>));         <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi/</span>.test(<span class="hljs-string">'levi_lxh'</span>));   <span class="hljs-comment">// true</span></code></pre>
<p><em>只要完整的包含了“levi”即可(有他就行)</em></p>
<p><strong>加上<code>[]</code>：</strong> 只要包含里面任何一个即可 比如<code>/[abcd]/</code> =&gt; <code>a,b,c,d</code>只要匹配项的里面有任意一项符合就返回<code>true</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/[levi]/.test(&quot;le&quot;));       // true
console.log(/[levi]/.test(&quot;less&quot;));     // true
console.log(/[levi]/.test(&quot;kill&quot;));     // true
console.log(/[levi]/.test(&quot;ss&quot;));       // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[levi]/</span>.test(<span class="hljs-string">"le"</span>));       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[levi]/</span>.test(<span class="hljs-string">"less"</span>));     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[levi]/</span>.test(<span class="hljs-string">"kill"</span>));     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[levi]/</span>.test(<span class="hljs-string">"ss"</span>));       <span class="hljs-comment">// false</span></code></pre>
<p><strong>3、负向类</strong></p>
<blockquote>元字符<code>^</code>必须出现在中括号内，表示非、取反的意思<code>[^]</code>。</blockquote>
<p><strong>示例代码：</strong> <em>[ 61-正则表达式-负向类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/[^levi]/.test(&quot;l&quot;));           // false
console.log(/[^levi]/.test(&quot;le&quot;));          // false
console.log(/[^levi]/.test(&quot;ec&quot;));          // true
console.log(/[^levi]/.test(&quot;levi&quot;));        // false
console.log(/[^levi]/.test(&quot;levi-lxh&quot;));    // true
console.log(/[^levi]/.test(&quot;lxh&quot;));         // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"l"</span>));           <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"le"</span>));          <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"ec"</span>));          <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"levi"</span>));        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"levi-lxh"</span>));    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[^levi]/</span>.test(<span class="hljs-string">"lxh"</span>));         <span class="hljs-comment">// true</span></code></pre>
<p><em>条件项<code>[^levi]</code>，表示不能有l，e，v, i任意组合，当匹配项小于等于条件项并且包含条件项的时候，返回<code>false</code>，当返回项不完全包含条件项的时候，返回<code>true</code></em></p>
<p><strong>4、范围类：</strong></p>
<blockquote>有时候匹配的东西过多，而且类型又相同，全部输入太麻烦，我们可以在中间加个横线<code>-</code>。</blockquote>
<p><strong>示例代码：</strong> <em>[ 62-正则表达式-范围类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/[a-d]/.test(&quot;a&quot;));     // true
console.log(/[a-d]/.test(&quot;ac123&quot;)); // true
console.log(/[a-d]/.test(&quot;efg&quot;))    // false
console.log(/[a-d]/.test(&quot;123&quot;))    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-d]/</span>.test(<span class="hljs-string">"a"</span>));     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-d]/</span>.test(<span class="hljs-string">"ac123"</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-d]/</span>.test(<span class="hljs-string">"efg"</span>))    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-d]/</span>.test(<span class="hljs-string">"123"</span>))    <span class="hljs-comment">// false</span></code></pre>
<p><strong>5、组合类</strong></p>
<blockquote>用中括号匹配不同类型的单个字符串</blockquote>
<p><strong>示例代码：</strong> <em>[ 63-正则表达式-组合类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/[a-f1-6]/.test('abs'));    // true
console.log(/[a-f1-6]/.test('12'));     // true
console.log(/[a-f1-6]/.test('sg8'));    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-f1-6]/</span>.test(<span class="hljs-string">'abs'</span>));    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-f1-6]/</span>.test(<span class="hljs-string">'12'</span>));     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/[a-f1-6]/</span>.test(<span class="hljs-string">'sg8'</span>));    <span class="hljs-comment">// false</span></code></pre>
<h3 id="articleHeader29">14.4 正则边界</h3>
<blockquote>我们前面学习的正则只要有满足的条件的就会返回true，并不能做到精确的匹配。正则边界就是以什么开始，以什么结束，进行精确匹配。</blockquote>
<p><strong>1、以什么开始：</strong></p>
<blockquote>
<code>^</code>元字符在<code>//</code>里面的时候，表示的是必须<code>以...开始</code>，<code>^</code>在中括号<code>[]</code>内才表示取反、非的意思。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/^levi/.test('lxhlevi'));       // false
console.log(/^levi/.test('levilxh'));       // true
console.log(/^levi/.test('lxhlevilxh'));    // false
console.log(/^levi/.test('levilevi'));      // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi/</span>.test(<span class="hljs-string">'lxhlevi'</span>));       <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi/</span>.test(<span class="hljs-string">'levilxh'</span>));       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi/</span>.test(<span class="hljs-string">'lxhlevilxh'</span>));    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi/</span>.test(<span class="hljs-string">'levilevi'</span>));      <span class="hljs-comment">// true</span></code></pre>
<p><strong>2、以什么结尾：</strong></p>
<blockquote>$ 元字符表示的是必须以...结尾</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/levi$/.test('lxhlevi'));       // true
console.log(/levi$/.test('levilxh'));       // false
console.log(/levi$/.test('lxhlevilxh'));    // false
console.log(/levi$/.test('levilevi'));      // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi$/</span>.test(<span class="hljs-string">'lxhlevi'</span>));       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi$/</span>.test(<span class="hljs-string">'levilxh'</span>));       <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi$/</span>.test(<span class="hljs-string">'lxhlevilxh'</span>));    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/levi$/</span>.test(<span class="hljs-string">'levilevi'</span>));      <span class="hljs-comment">// true</span></code></pre>
<p><strong>3、精确匹配：</strong></p>
<blockquote>
<code>^...$</code>表示的是精确匹配，匹配项必须是<code>^、$</code>之间的内容</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/^levi$/.test('lxhlevi'));      // false
console.log(/^levi$/.test('levilxh'));      // false
console.log(/^levi$/.test('lxhlevilxh'));   // false
console.log(/^levi$/.test('levilevi'));     // false
console.log(/^levi$/.test('levi'));         // true
console.log(/^\d$/.test('111'));            // false  \d表示的是0-9当中的一位数
console.log(/^\d$/.test('1'));              // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi$/</span>.test(<span class="hljs-string">'lxhlevi'</span>));      <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi$/</span>.test(<span class="hljs-string">'levilxh'</span>));      <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi$/</span>.test(<span class="hljs-string">'lxhlevilxh'</span>));   <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi$/</span>.test(<span class="hljs-string">'levilevi'</span>));     <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^levi$/</span>.test(<span class="hljs-string">'levi'</span>));         <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^\d$/</span>.test(<span class="hljs-string">'111'</span>));            <span class="hljs-comment">// false  \d表示的是0-9当中的一位数</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^\d$/</span>.test(<span class="hljs-string">'1'</span>));              <span class="hljs-comment">// true</span></code></pre>
<p><em>[ 64-正则表达式-正则边界.html ]</em></p>
<h3 id="articleHeader30">14.5 量词</h3>
<blockquote>量词用来控制出现的次数，一般来说量词和边界会一起使用</blockquote>
<p><strong>1、量词 <code>*</code>：</strong></p>
<blockquote>表示能够出现<code>0</code>次，或者跟多的次数，<code>x &gt;= 0</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以出现0次或者多次  要么不出现 要么只能出现 a
console.log(/^a*$/.test('abc'));    // false
console.log(/^a*$/.test('bbb'));    // false
console.log(/^a*$/.test('aab'));    // false
console.log(/^a*$/.test('aaa'));    // true
console.log(/^a*$/.test('a'));      // true
console.log(/^a*$/.test(''));       // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 可以出现0次或者多次  要么不出现 要么只能出现 a</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">'abc'</span>));    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">'bbb'</span>));    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">'aab'</span>));    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">'aaa'</span>));    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">'a'</span>));      <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a*$/</span>.test(<span class="hljs-string">''</span>));       <span class="hljs-comment">// true</span></code></pre>
<p><strong>2、量词 <code>+</code> ：</strong></p>
<blockquote>表示能够出现<code>1</code>次或者多次，<code>x &gt;= 1</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// +表示 可以出现1次或者1次以上
console.log(/^a+$/.test(&quot;a&quot;));      //true
console.log(/^a+$/.test(&quot;&quot;));       //false
console.log(/^a+$/.test(&quot;b&quot;));      //false
console.log(/^a+$/.test(&quot;aa&quot;));     //true
console.log(/^a+$/.test(&quot;aab&quot;));    //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// +表示 可以出现1次或者1次以上</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a+$/</span>.test(<span class="hljs-string">"a"</span>));      <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a+$/</span>.test(<span class="hljs-string">""</span>));       <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a+$/</span>.test(<span class="hljs-string">"b"</span>));      <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a+$/</span>.test(<span class="hljs-string">"aa"</span>));     <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a+$/</span>.test(<span class="hljs-string">"aab"</span>));    <span class="hljs-comment">//false</span></code></pre>
<p><strong>3、量词 <code>?</code> ：</strong></p>
<blockquote>表示能够出现<code>0</code>次或者<code>1</code>次，<code>x=0</code>或者<code>x=1</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ? 表示可以出现0次或者1次
console.log(/^a?$/.test(&quot;a&quot;));      //true
console.log(/^a?$/.test(&quot;&quot;));       //true
console.log(/^a?$/.test(&quot;b&quot;));      //false
console.log(/^a?$/.test(&quot;aa&quot;));     //false
console.log(/^a?$/.test(&quot;aab&quot;));    //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ? 表示可以出现0次或者1次</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a?$/</span>.test(<span class="hljs-string">"a"</span>));      <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a?$/</span>.test(<span class="hljs-string">""</span>));       <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a?$/</span>.test(<span class="hljs-string">"b"</span>));      <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a?$/</span>.test(<span class="hljs-string">"aa"</span>));     <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a?$/</span>.test(<span class="hljs-string">"aab"</span>));    <span class="hljs-comment">//false</span></code></pre>
<p><strong>4、量词 <code>{n}</code> ：</strong></p>
<blockquote>表示能够出现<code>n</code>次</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// * ==> {0,}
console.log(/^a{0,}$/.test('a'));    // true
console.log(/^a{0,}$/.test('aa'));   // true
console.log(/^a{0,}$/.test(''));     // true
console.log(/^a{0,}$/.test('abc'));  // fasle
console.log(/^a{0,}$/.test('aaab')); // fasle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// * ==&gt; {0,}</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,}$/</span>.test(<span class="hljs-string">'a'</span>));    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,}$/</span>.test(<span class="hljs-string">'aa'</span>));   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,}$/</span>.test(<span class="hljs-string">''</span>));     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,}$/</span>.test(<span class="hljs-string">'abc'</span>));  <span class="hljs-comment">// fasle</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,}$/</span>.test(<span class="hljs-string">'aaab'</span>)); <span class="hljs-comment">// fasle</span></code></pre>
<p><strong>5、量词 <code>{n,}</code> ：</strong></p>
<blockquote>表示能够出现<code>n</code>次或者<code>n</code>次以上</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// + ==> {1,}
console.log(/^a{1,}$/.test('a'));    // true
console.log(/^a{1,}$/.test('aa'));   // true
console.log(/^a{1,}$/.test(''));     // fasle
console.log(/^a{1,}$/.test('abc'));  // fasle
console.log(/^a{1,}$/.test('aaab')); // fasle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// + ==&gt; {1,}</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{1,}$/</span>.test(<span class="hljs-string">'a'</span>));    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{1,}$/</span>.test(<span class="hljs-string">'aa'</span>));   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{1,}$/</span>.test(<span class="hljs-string">''</span>));     <span class="hljs-comment">// fasle</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{1,}$/</span>.test(<span class="hljs-string">'abc'</span>));  <span class="hljs-comment">// fasle</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{1,}$/</span>.test(<span class="hljs-string">'aaab'</span>)); <span class="hljs-comment">// fasle</span></code></pre>
<p><strong>6、量词 <code>{n,m}</code> ：</strong></p>
<blockquote>表示能够出现n-m次</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ? ==> {0,1}
console.log(/^a{0,1}$/.test(&quot;a&quot;));   //true
console.log(/^a{0,1}$/.test(&quot;&quot;));    //true
console.log(/^a{0,1}$/.test(&quot;b&quot;));   //false
console.log(/^a{0,1}$/.test(&quot;aa&quot;));  //false
console.log(/^a{0,1}$/.test(&quot;aab&quot;)); //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ? ==&gt; {0,1}</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,1}$/</span>.test(<span class="hljs-string">"a"</span>));   <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,1}$/</span>.test(<span class="hljs-string">""</span>));    <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,1}$/</span>.test(<span class="hljs-string">"b"</span>));   <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,1}$/</span>.test(<span class="hljs-string">"aa"</span>));  <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^a{0,1}$/</span>.test(<span class="hljs-string">"aab"</span>)); <span class="hljs-comment">//false</span></code></pre>
<p><em>[ 65-正则表达式-量词.html ]</em></p>
<h3 id="articleHeader31">14.6 括号总结</h3>
<p><strong>1、<code>{}</code> 大括号限定出现的次数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 表示的是 n 重复两次
console.log(/chuan{2}/.test(&quot;chuanchuan&quot;));     // false 
console.log(/chuan{2}/.test(&quot;chuann&quot;));         // true
console.log(/chuan{2}/.test(&quot;chuann123123&quot;));   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 表示的是 n 重复两次</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/chuan{2}/</span>.test(<span class="hljs-string">"chuanchuan"</span>));     <span class="hljs-comment">// false </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/chuan{2}/</span>.test(<span class="hljs-string">"chuann"</span>));         <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/chuan{2}/</span>.test(<span class="hljs-string">"chuann123123"</span>));   <span class="hljs-comment">// true</span></code></pre>
<p><strong>2、<code>[]</code> 表示一个字符出现的位置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/^[fb]oot$/.test(&quot;foot&quot;));  // true
console.log(/^[fb]oot$/.test(&quot;boot&quot;));  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^[fb]oot$/</span>.test(<span class="hljs-string">"foot"</span>));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^[fb]oot$/</span>.test(<span class="hljs-string">"boot"</span>));  <span class="hljs-comment">// true</span></code></pre>
<p><strong>3、<code>()</code> 用来提升优先级</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(/^(chuan){2}$/.test(&quot;chuanchuan&quot;)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/^(chuan){2}$/</span>.test(<span class="hljs-string">"chuanchuan"</span>)); <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader32">14.7 正则表达式综合案例</h3>
<p><strong>1、验证座机号码：</strong> <em>[ 67-正则案例-验证座机号码.html ]</em></p>
<ul>
<li>直辖市座机号码：<code>021-88888888</code>；</li>
<li>普通地区做急哦号码：<code>0515-12345678</code>；</li>
<li>前区可以是三位也可以是四位，第一位必须是<code>0</code>，后区必须是<code>8</code>位；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /^0\d{2,3}-\d{8}$/;
console.log(reg.test('021-12345678'));   // true
console.log(reg.test('0515-88888888'));  // true
console.log(reg.test('0515-888880888')); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^0\d{2,3}-\d{8}$/</span>;
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">'021-12345678'</span>));   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">'0515-88888888'</span>));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(reg.test(<span class="hljs-string">'0515-888880888'</span>)); <span class="hljs-comment">// false</span></code></pre>
<p><strong>2、验证中文姓名</strong> <em>[ 68-正则案例-验证中文姓名.html ]</em></p>
<ul>
<li>只能是汉字</li>
<li>长度<code>2-6</code>位之间</li>
<li>汉字范围<code>[\u4e00-\u9fa5]</code>
</li>
<li>
<code>unicode</code>编码：万国码，其中<code>\u4e00-\u9fa5</code>表示的就是包含所有汉字的<code>unicode</code>编码</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nameReg = /^[\u4e00-\u9fa5]{2,6}$/;
console.log(nameReg.test('莫'));         // false
console.log(nameReg.test('小泽玛利亚')); // true
console.log(nameReg.test('柯南'));       // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> nameReg = <span class="hljs-regexp">/^[\u4e00-\u9fa5]{2,6}$/</span>;
<span class="hljs-built_in">console</span>.log(nameReg.test(<span class="hljs-string">'莫'</span>));         <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(nameReg.test(<span class="hljs-string">'小泽玛利亚'</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(nameReg.test(<span class="hljs-string">'柯南'</span>));       <span class="hljs-comment">// true</span></code></pre>
<p><strong>3、验证邮箱</strong> <em>[ 69-正则案例-验证邮箱.html ]</em></p>
<ul>
<li>前面是字母或者数字</li>
<li>必须有<code>@</code>
</li>
<li>
<code>@</code>后面是字母或者数字</li>
<li>必须有<code>.</code>
</li>
<li>
<code>.</code>后面是字母或者数字</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mailBoxReg = /^\w+@\w+(\.\w+)+$/;
console.log(mailBoxReg.test('18888888@qq.com')); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mailBoxReg = <span class="hljs-regexp">/^\w+@\w+(\.\w+)+$/</span>;
<span class="hljs-built_in">console</span>.log(mailBoxReg.test(<span class="hljs-string">'18888888@qq.com'</span>)); <span class="hljs-comment">// true</span></code></pre>
<p><strong>4、验证手机号码</strong> <em>[ 70-正则案例-验证手机号码.html ]</em></p>
<ul>
<li>
<code>11</code>位数字组成</li>
<li>号段<code>13[0-9]</code> <code>147</code> <code>15[0-9]</code> <code>177[0178]</code> <code>18[0-9]</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mobileReg = /^(13[0-9]|147|15[0-9]|17[0178]|18[0-9])\d{8}$/;
console.log(mobileReg.test(15812345678));  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mobileReg = <span class="hljs-regexp">/^(13[0-9]|147|15[0-9]|17[0178]|18[0-9])\d{8}$/</span>;
<span class="hljs-built_in">console</span>.log(mobileReg.test(<span class="hljs-number">15812345678</span>));  <span class="hljs-comment">// true</span></code></pre>
<p><strong>5、验证QQ</strong> <em>[ 71-正则案例-验证qq.html ]</em></p>
<ul>
<li>只能是数字</li>
<li>开头不能是<code>0</code>
</li>
<li>长度为<code>5-11</code>位</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var qqReg = /^[1-9]\d{4,10}$/;
console.log(qqReg.test(18888888)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> qqReg = <span class="hljs-regexp">/^[1-9]\d{4,10}$/</span>;
<span class="hljs-built_in">console</span>.log(qqReg.test(<span class="hljs-number">18888888</span>)); <span class="hljs-comment">// true</span></code></pre>
<p><strong>6、完整版表单验证</strong> <em>[ 72-正则案例-表单验证综合案例.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        background: #ccc;
    }
    .container {
        margin: 100px auto;
        width: 400px;
        padding: 50px;
        line-height: 40px;
        border: 1px solid #999;
        background: #efefef;
    }
    label {
        width: 40px;
        display: inline-block;
    }
    span {
        color: red;
    }
    span {
        margin-left: 30px;
        font-size: 12px;
    }
</style>

<!-- html 部分 -->
<div class=&quot;container&quot;>
    <label>Q Q</label><input type=&quot;text&quot; id=&quot;inp1&quot;><span></span><br/>
    <label>手机</label><input type=&quot;text&quot; id=&quot;inp2&quot;><span></span><br/>
    <label>邮箱</label><input type=&quot;text&quot; id=&quot;inp3&quot;><span></span><br/>
    <label>座机</label><input type=&quot;text&quot; id=&quot;inp4&quot;><span></span><br/>
    <label>姓名</label><input type=&quot;text&quot; id=&quot;inp5&quot;><span></span><br/>
</div>

<!-- js 部分 -->
<script>
    function checkReg(element, reg) {
        element.onblur = function() {
            var content = this.value;
            if (reg.test(content)) {
                this.nextElementSibling.innerHTML = &quot;合法&quot;;
                this.nextElementSibling.style.color = &quot;green&quot;;
            } else {
                this.nextElementSibling.innerHTML = &quot;不合法&quot;;
                this.nextElementSibling.style.color = &quot;red&quot;;
            }
        }
    }
    checkReg(document.getElementById(&quot;inp1&quot;), /^[1-9]\d{4,11}$/);
    checkReg(document.getElementById(&quot;inp2&quot;), /^(13[0-9]|14[57]|15[0-25-9]|17[0137]|18[0-9])\d{8}$/);
    checkReg(document.getElementById(&quot;inp3&quot;), /^\w+@\w+(\.\w+)+$/);
    checkReg(document.getElementById(&quot;inp4&quot;), /^0\d{2,3}-\d{7,8}$/);
    checkReg(document.getElementById(&quot;inp5&quot;), /^[\u4e00-\u9fa5]{2,4}$/);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
    <span class="hljs-selector-class">.container</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#efefef</span>;
    }
    <span class="hljs-selector-tag">label</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">display</span>: inline-block;
    }
    <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">color</span>: red;
    }
    <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Q Q<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>手机<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>邮箱<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp3"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>座机<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp5"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkReg</span>(<span class="hljs-params">element, reg</span>) </span>{
        element.onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> content = <span class="hljs-keyword">this</span>.value;
            <span class="hljs-keyword">if</span> (reg.test(content)) {
                <span class="hljs-keyword">this</span>.nextElementSibling.innerHTML = <span class="hljs-string">"合法"</span>;
                <span class="hljs-keyword">this</span>.nextElementSibling.style.color = <span class="hljs-string">"green"</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.nextElementSibling.innerHTML = <span class="hljs-string">"不合法"</span>;
                <span class="hljs-keyword">this</span>.nextElementSibling.style.color = <span class="hljs-string">"red"</span>;
            }
        }
    }
    checkReg(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp1"</span>), /^[<span class="hljs-number">1</span><span class="hljs-number">-9</span>]\d{<span class="hljs-number">4</span>,<span class="hljs-number">11</span>}$/);
    checkReg(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp2"</span>), /^(<span class="hljs-number">13</span>[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]|<span class="hljs-number">14</span>[<span class="hljs-number">57</span>]|<span class="hljs-number">15</span>[<span class="hljs-number">0</span><span class="hljs-number">-25</span><span class="hljs-number">-9</span>]|<span class="hljs-number">17</span>[<span class="hljs-number">0137</span>]|<span class="hljs-number">18</span>[<span class="hljs-number">0</span><span class="hljs-number">-9</span>])\d{<span class="hljs-number">8</span>}$/);
    checkReg(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp3"</span>), /^\w+@\w+(\.\w+)+$/);
    checkReg(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp4"</span>), /^<span class="hljs-number">0</span>\d{<span class="hljs-number">2</span>,<span class="hljs-number">3</span>}-\d{<span class="hljs-number">7</span>,<span class="hljs-number">8</span>}$/);
    checkReg(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp5"</span>), /^[\u4e00-\u9fa5]{<span class="hljs-number">2</span>,<span class="hljs-number">4</span>}$/);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmv4cg3l4dg20f509nab8.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmv4cg3l4dg20f509nab8.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader33">14.8 正则补充知识点</h3>
<blockquote>这里要补充几个正则的小知识点，比如在正则里‘<code>|</code>’，表示的是或。‘<code>g</code>’，表示的是<code>global</code>：全局，全部。‘<code>i</code>’，表示的是<code>ignore</code>：忽视大小写。</blockquote>
<p><strong>1、或‘|’ ：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mobileReg = /^(13[0-9]|14[57]|15[0-25-9]|17[0137]|18[0-9])\d{8}$/;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> mobileReg = <span class="hljs-regexp">/^(13[0-9]|14[57]|15[0-25-9]|17[0137]|18[0-9])\d{8}$/</span>;</code></pre>
<p><em>我们可以看到在判断手机号码前三位的时候，我们就用到了或：“|”</em></p>
<p><strong>2、全部‘<code>g</code>’：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = '123123123123';
// 找到所有的1  替换成3
var newStr = str.replace(/1/g, 3);
console.log(newStr);  // 323323323" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'123123123123'</span>;
<span class="hljs-comment">// 找到所有的1  替换成3</span>
<span class="hljs-keyword">var</span> newStr = str.replace(<span class="hljs-regexp">/1/g</span>, <span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(newStr);  <span class="hljs-comment">// 323323323</span></code></pre>
<p><strong>3、忽略大小写‘<code>i</code>’：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str2 = 'abcdAAAA';
var newStr2 = str2.replace(/a/gi, 'e');
console.log(newStr2);  // ebcdeeee" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str2 = <span class="hljs-string">'abcdAAAA'</span>;
<span class="hljs-keyword">var</span> newStr2 = str2.replace(<span class="hljs-regexp">/a/gi</span>, <span class="hljs-string">'e'</span>);
<span class="hljs-built_in">console</span>.log(newStr2);  <span class="hljs-comment">// ebcdeeee</span></code></pre>
<p><a href="https://segmentfault.com/a/1190000012623407">上一篇：JavaScript 进阶知识 - 特效篇(一)</a><br><a href="https://segmentfault.com/a/1190000013696278" target="_blank">下一篇：JavaScript 进阶知识 - Ajax篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 进阶知识 - 特效篇(二)

## 原文链接
[https://segmentfault.com/a/1190000012623554](https://segmentfault.com/a/1190000012623554)

