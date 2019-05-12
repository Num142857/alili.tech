---
title: 'H5打造属于自己的视频播放器（JS篇2）' 
date: 2019-02-05 2:30:09
hidden: true
slug: eizezdfg2ep
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">回顾</h2>
<p>算了不回顾了 <span class="img-wrap"><img data-src="/img/bVBQyx" src="https://static.alili.tech/img/bVBQyx" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>直接搞起，打开JS1中写的bvd.js</p>
<h2 id="articleHeader1">播放视频</h2>
<ol>
<li><p>播放按钮隐藏</p></li>
<li>
<p>视频开始播放<br>   当点击播放按钮的时候，播放按钮将会隐藏，播放视频，这个不难，在JS1中我们就已经实现。但我们改变一下思维，给视频添加点击tap事件，使视频播放，再触发播放事件，从而让播放按钮隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.initEvent = function(){
    var that = this;

    //给播放按钮图片添加事件
    this.vimg.addEventListener('tap',function(){
        that.video.play();
    })

    //视频点击暂停或播放事件
    this.video.addEventListener('tap',function(){
        if(this.paused || this.ended) {
            //暂停时点击就播放
            if(this.ended) {//如果播放完毕，就重头开始播放
                this.currentTime = 0;
            }
            this.play();
        } else {
            //播放时点击就暂停
            this.pause();
        }
    })
    
    //视频播放事件
    this.video.addEventListener('play',function(){
        that.vimg.style.display = 'none';
    })
    
    
    //获取到元数据
    this.video.addEventListener('loadedmetadata',function(){
        that.vC.querySelector('.duration').innerHTML = stom(this.duration);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>pro.initEvent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;

    <span class="hljs-comment">//给播放按钮图片添加事件</span>
    <span class="hljs-keyword">this</span>.vimg.addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        that.video.play();
    })

    <span class="hljs-comment">//视频点击暂停或播放事件</span>
    <span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.paused || <span class="hljs-keyword">this</span>.ended) {
            <span class="hljs-comment">//暂停时点击就播放</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.ended) {<span class="hljs-comment">//如果播放完毕，就重头开始播放</span>
                <span class="hljs-keyword">this</span>.currentTime = <span class="hljs-number">0</span>;
            }
            <span class="hljs-keyword">this</span>.play();
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//播放时点击就暂停</span>
            <span class="hljs-keyword">this</span>.pause();
        }
    })
    
    <span class="hljs-comment">//视频播放事件</span>
    <span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'play'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        that.vimg.style.display = <span class="hljs-string">'none'</span>;
    })
    
    
    <span class="hljs-comment">//获取到元数据</span>
    <span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'loadedmetadata'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        that.vC.querySelector(<span class="hljs-string">'.duration'</span>).innerHTML = stom(<span class="hljs-keyword">this</span>.duration);
    });
}</code></pre>
</li>
<li>
<p>下方控制条渐渐隐藏<br>   隐藏并不是难点，重要的是渐渐的隐藏，在这里我们有这么几种解决方案：</p>
<ol>
<li><p>定时器</p></li>
<li><p>css3 动画帧</p></li>
</ol>
</li>
</ol>
<p>在这里我们2种结合起来使用<span class="img-wrap"><img data-src="/img/bVBQGQ" src="https://static.alili.tech/img/bVBQGQ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>首先我们先定义好一组动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes vhide {0% {opacity: 1;}100% {opacity: 0;"}}"

@-webkit-keyframes vhide {0% {opacity: 1;}100% {opacity: 0;"}}"

.vhidden {
    animation: vhide 3.5s ease-in;
    -webkit-animation: vhide 3.5s ease-in;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> vhide {0% {<span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;}100% {<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;"}}"

@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> vhide {0% {<span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;}100% {<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;"}}"

<span class="hljs-selector-class">.vhidden</span> {
    <span class="hljs-attribute">animation</span>: vhide <span class="hljs-number">3.5s</span> ease-in;
    <span class="hljs-attribute">-webkit-animation</span>: vhide <span class="hljs-number">3.5s</span> ease-in;
}</code></pre>
<p>其作用就是透明度3.5秒内1=&gt;0，ease-in 就是 由慢到快 的过度效果。有不懂css动画可以问问度娘哦<br>然后我们给视频开始播放事件的时候给<strong>控制条</strong>添加vhidden样式类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//视频播放事件
this.video.addEventListener('play',function(){
    that.vC.classList.add('vhidden');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//视频播放事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'play'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vC.classList.add(<span class="hljs-string">'vhidden'</span>);
})</code></pre>
<p>测试效果，果然3.5s内，控制条 慢慢透明，问题是3.5s后，透明度又回到了1，这里我讲解一下，是因为动画帧默认是回弹的，我们可以加个样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vhidden {
    animation: vhide 3.5s ease-in;
    -webkit-animation: vhide 3.5s ease-in;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode: forwards;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.vhidden</span> {
    <span class="hljs-attribute">animation</span>: vhide <span class="hljs-number">3.5s</span> ease-in;
    <span class="hljs-attribute">-webkit-animation</span>: vhide <span class="hljs-number">3.5s</span> ease-in;
    <span class="hljs-attribute">animation-fill-mode</span>:forwards;
    <span class="hljs-attribute">-webkit-animation-fill-mode</span>: forwards;
}</code></pre>
<p>CSS3 属性 animation-fill-mode 用来定义元素在动画结束后的样子。</p>
<p>animation-fill-mode 的默认值是 none，也就是在动画结束之后不做任何改动，如果把animation-fill-mode 改成 forwards 则动画结束后元素的样式会变成动画最后一个关键帧所规定的样式。</p>
<p>加上这个样式后，果然3.5s后，动画不再回弹了，但是这里要留意一下，控制条并不是不在了而是透明了，如果这时我们有写控制条的点击时间，那么在控制条位置点击，还是会触发事件，所以呢，我们还可以写上一段setTimeout来，让控制条3.5s后隐藏，这个大家可以自行取舍</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//视频播放事件
this.video.addEventListener('play',function(){
    that.vimg.style.display = 'none';
    that.vC.classList.add('vhidden');
    that.vCt = setTimeout(function(){
        that.vC.style.visibility = 'hidden';
    },3400);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//视频播放事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'play'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vimg.style.display = <span class="hljs-string">'none'</span>;
    that.vC.classList.add(<span class="hljs-string">'vhidden'</span>);
    that.vCt = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        that.vC.style.visibility = <span class="hljs-string">'hidden'</span>;
    },<span class="hljs-number">3400</span>);
})</code></pre>
<p>为什么动画过程是3.5s，然而js是是3.4s后执行，这里只是在未写animation-fill-mode:forwards的情况下做个保险</p>
<p><span class="img-wrap"><img data-src="/img/bVBQUI" src="https://static.alili.tech/img/bVBQUI" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">正在播放中</h2>
<p>嘿嘿，视频可以播放啦！那么现在我们该考虑一下播放中有哪些事要做呢？</p>
<p><strong>1. 控制条进度条慢慢增长</strong></p>
<p>我们需要给视频添加一条<strong>timeupdate</strong>音视频播放位置发生改变时的事件</p>
<p>我们先在获取视频元数据事件中，把视频的长度给拿下来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取到元数据
this.video.addEventListener('loadedmetadata',function(){
    that.vDuration = this.duration;
    that.vC.querySelector('.duration').innerHTML = stom(that.vDuration);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//获取到元数据</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'loadedmetadata'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vDuration = <span class="hljs-keyword">this</span>.duration;
    that.vC.querySelector(<span class="hljs-string">'.duration'</span>).innerHTML = stom(that.vDuration);
});</code></pre>
<p>再从视频播放进度更新事件中计算比例，设置进度条的宽度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//视频播放中事件
this.video.addEventListener('timeupdate', function() {
    var currentPos = this.currentTime;//获取当前播放的位置
    //更新进度条
    var percentage = 100 * currentPos / that.vDuration; 
    //设置宽度
    that.vC.querySelector('.timeBar').style.width = percentage + '%';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//视频播放中事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'timeupdate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> currentPos = <span class="hljs-keyword">this</span>.currentTime;<span class="hljs-comment">//获取当前播放的位置</span>
    <span class="hljs-comment">//更新进度条</span>
    <span class="hljs-keyword">var</span> percentage = <span class="hljs-number">100</span> * currentPos / that.vDuration; 
    <span class="hljs-comment">//设置宽度</span>
    that.vC.querySelector(<span class="hljs-string">'.timeBar'</span>).style.width = percentage + <span class="hljs-string">'%'</span>;
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVBRgG" src="https://static.alili.tech/img/bVBRgG" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看到我们的进度条君越来越膨胀了。</p>
<p><strong>2. 当前播放时间变化</strong></p>
<p>同时，我们的当前播放时间显示也在<strong>timeupdate</strong>事件中设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//视频播放中事件
this.video.addEventListener('timeupdate', function() {
    var currentPos = this.currentTime;//获取当前播放的位置
    //更新进度条
    var percentage = 100 * currentPos / that.vDuration; 
    that.vC.querySelector('.timeBar').style.width = percentage + '%';
    //更新当前播放时间
    that.vC.querySelector('.current').innerHTML = stom(currentPos);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//视频播放中事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'timeupdate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> currentPos = <span class="hljs-keyword">this</span>.currentTime;<span class="hljs-comment">//获取当前播放的位置</span>
    <span class="hljs-comment">//更新进度条</span>
    <span class="hljs-keyword">var</span> percentage = <span class="hljs-number">100</span> * currentPos / that.vDuration; 
    that.vC.querySelector(<span class="hljs-string">'.timeBar'</span>).style.width = percentage + <span class="hljs-string">'%'</span>;
    <span class="hljs-comment">//更新当前播放时间</span>
    that.vC.querySelector(<span class="hljs-string">'.current'</span>).innerHTML = stom(currentPos);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVBRiq" src="https://static.alili.tech/img/bVBRiq" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">暂停 or 停止</h2>
<p>当我们点击视频时，如果是暂停，那就开始播放，并触发播放事件，反之视频在播放中，点击视频就会暂停，并触发暂停事件。</p>
<p><strong>0. 时间定格</strong></p>
<p>啦啦啦，暂停播放，<strong>timeupdate</strong>事件自然就不触发啦，所以进度条和当前播放时间就不会变啦。</p>
<p><strong>1. 播放按钮显示</strong></p>
<p>在暂停的时候，显示出按钮就行啦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//暂停or停止
this.video.addEventListener('pause',function(){
    that.vimg.style.display = 'block';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//暂停or停止</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'pause'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vimg.style.display = <span class="hljs-string">'block'</span>;
});</code></pre>
<p><strong>2. 下方控制条显示</strong></p>
<p>控制条显示，直接去除那个vhidden样式类就好啦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//暂停or停止
this.video.addEventListener('pause',function(){
    that.vimg.style.display = 'block';
    that.vC.classList.remove('vhidden');
    that.vC.style.visibility = 'visible';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//暂停or停止</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'pause'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vimg.style.display = <span class="hljs-string">'block'</span>;
    that.vC.classList.remove(<span class="hljs-string">'vhidden'</span>);
    that.vC.style.visibility = <span class="hljs-string">'visible'</span>;
});</code></pre>
<p>这样写看样子是没错啦，但是，如果大家在之前隐藏控制条的时候写了setTimeout的话，这个时候就要清除掉哦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//暂停or停止
this.video.addEventListener('pause',function(){
    that.vimg.style.display = 'block';
    that.vC.classList.remove('vhidden');
    that.vC.style.visibility = 'visible'; 
    that.vCt &amp;&amp; clearTimeout(that.vCt);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//暂停or停止</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'pause'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.vimg.style.display = <span class="hljs-string">'block'</span>;
    that.vC.classList.remove(<span class="hljs-string">'vhidden'</span>);
    that.vC.style.visibility = <span class="hljs-string">'visible'</span>; 
    that.vCt &amp;&amp; clearTimeout(that.vCt);
});</code></pre>
<h2 id="articleHeader4">快进快退</h2>
<p>一个叼叼哒的小视频播放器怎么可能少的了可进可退能屈能伸呢？</p>
<p>来，我们先为video添加左滑右滑事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//视频手势右滑动事件
this.video.addEventListener('swiperight',function(e){
    this.currentTime += 5;
});
//视频手势左滑动事件
this.video.addEventListener('swipeleft',function(e){
    this.currentTime -= 5;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//视频手势右滑动事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'swiperight'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">this</span>.currentTime += <span class="hljs-number">5</span>;
});
<span class="hljs-comment">//视频手势左滑动事件</span>
<span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'swipeleft'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">this</span>.currentTime -= <span class="hljs-number">5</span>;
});</code></pre>
<p>可能在电脑上调试会直接进度变0，一开始我也纳闷呢，后来发现手机上webview中好像是可行的。</p>
<p>关于<strong> 进度条拖动改变视频进度 </strong> 我暂时不打算写，因为我还没写。<span class="img-wrap"><img data-src="/img/bVBRMQ" src="https://static.alili.tech/img/bVBRMQ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">全屏播放</h2>
<p>可能大家会比较关注这个吧：</p>
<p>ios端：去除video标签webkit-playsinline属性即可，因为ios对h5的video标签支持还是比较不错的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//调用原生方式 全屏播放
pro.nativeMax = function(){
    if(!window.plus){
        //非html5+环境
        return;
    }
    if($.os.ios){
        console.log('ios')
        this.video.removeAttribute('webkit-playsinline');
    }else if($.os.android){
        console.log('android');
        var url = this.video.querySelector('source').src;
        var Intent = plus.android.importClass(&quot;android.content.Intent&quot;);
        var Uri = plus.android.importClass(&quot;android.net.Uri&quot;);
        var main = plus.android.runtimeMainActivity();
        var intent = new Intent(Intent.ACTION_VIEW);
        var uri = Uri.parse(url);
        intent.setDataAndType(uri, &quot;video/*&quot;);
        main.startActivity(intent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//调用原生方式 全屏播放</span>
pro.nativeMax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">window</span>.plus){
        <span class="hljs-comment">//非html5+环境</span>
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span>($.os.ios){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ios'</span>)
        <span class="hljs-keyword">this</span>.video.removeAttribute(<span class="hljs-string">'webkit-playsinline'</span>);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>($.os.android){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'android'</span>);
        <span class="hljs-keyword">var</span> url = <span class="hljs-keyword">this</span>.video.querySelector(<span class="hljs-string">'source'</span>).src;
        <span class="hljs-keyword">var</span> Intent = plus.android.importClass(<span class="hljs-string">"android.content.Intent"</span>);
        <span class="hljs-keyword">var</span> Uri = plus.android.importClass(<span class="hljs-string">"android.net.Uri"</span>);
        <span class="hljs-keyword">var</span> main = plus.android.runtimeMainActivity();
        <span class="hljs-keyword">var</span> intent = <span class="hljs-keyword">new</span> Intent(Intent.ACTION_VIEW);
        <span class="hljs-keyword">var</span> uri = Uri.parse(url);
        intent.setDataAndType(uri, <span class="hljs-string">"video/*"</span>);
        main.startActivity(intent);
    }
}</code></pre>
<p>在initEvent中添加点击 全屏 事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.vC.querySelector('.fill').addEventListener('tap',function(){
    that.nativeMax();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.vC.querySelector(<span class="hljs-string">'.fill'</span>).addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    that.nativeMax();
});</code></pre>
<p>这样做有点鸡肋啊，就不能来点通用的？</p>
<p>确实这个问题我想了一晚上，决定再拿点干货来。</p>
<p>先给个状态，默认为mini播放</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bvd = function(dom) {
    var that = this;
    $.ready(function() {
        //获取视频元素
        that.video = document.querySelector(dom || 'video');
        //获取视频父元素
        that.vRoom = that.video.parentNode;
        //元素初始化
        that.initEm();
        //事件初始化
        that.initEvent();
        //记录信息
        that.initInfo();
        //当前播放模式 false 为 mini播放
        that.isMax = false;
    })
}

//记录信息
pro.initInfo = function() {
    var that = this;
    //在onload状态下，offsetHeight才会获取到正确的值
    window.onload = function(){
        that.miniInfo = {//mini状态时的样式
            width: that.video.offsetWidth + 'px',
            height: that.video.offsetHeight + 'px',
            position: that.vRoom.style.position,
            transform: 'translate(0,0) rotate(0deg)'
        }

        var info = [
                document.documentElement.clientWidth || document.body.clientWidth,
                document.documentElement.clientHeight || document.body.clientHeigth
            ],
            w = info[0],
            h = info[1],
            cha = Math.abs(h - w) / 2;
            
        that.maxInfo = {//max状态时的样式
            width: h + 'px',
            height: w + 'px',
            position: 'fixed',
            transform: 'translate(-' + cha + 'px,' + cha + 'px) rotate(90deg)'
        }
    }
    
    
}

//全屏 mini 两种模式切换
pro.switch = function() {
    var vR = this.vRoom;
    //获取需要转换的样式信息
    var info = this.isMax ? this.miniInfo : this.maxInfo;
    for(var i in info) {
        vR.style[i] = info[i];
    }
    this.isMax = !this.isMax;
}

//全屏按钮
this.vC.querySelector('.fill').addEventListener('tap', function() {
    //that.nativeMax();
    that.switch();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> bvd = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    $.ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//获取视频元素</span>
        that.video = <span class="hljs-built_in">document</span>.querySelector(dom || <span class="hljs-string">'video'</span>);
        <span class="hljs-comment">//获取视频父元素</span>
        that.vRoom = that.video.parentNode;
        <span class="hljs-comment">//元素初始化</span>
        that.initEm();
        <span class="hljs-comment">//事件初始化</span>
        that.initEvent();
        <span class="hljs-comment">//记录信息</span>
        that.initInfo();
        <span class="hljs-comment">//当前播放模式 false 为 mini播放</span>
        that.isMax = <span class="hljs-literal">false</span>;
    })
}

<span class="hljs-comment">//记录信息</span>
pro.initInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//在onload状态下，offsetHeight才会获取到正确的值</span>
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        that.miniInfo = {<span class="hljs-comment">//mini状态时的样式</span>
            width: that.video.offsetWidth + <span class="hljs-string">'px'</span>,
            <span class="hljs-attr">height</span>: that.video.offsetHeight + <span class="hljs-string">'px'</span>,
            <span class="hljs-attr">position</span>: that.vRoom.style.position,
            <span class="hljs-attr">transform</span>: <span class="hljs-string">'translate(0,0) rotate(0deg)'</span>
        }

        <span class="hljs-keyword">var</span> info = [
                <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth,
                <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeigth
            ],
            w = info[<span class="hljs-number">0</span>],
            h = info[<span class="hljs-number">1</span>],
            cha = <span class="hljs-built_in">Math</span>.abs(h - w) / <span class="hljs-number">2</span>;
            
        that.maxInfo = {<span class="hljs-comment">//max状态时的样式</span>
            width: h + <span class="hljs-string">'px'</span>,
            <span class="hljs-attr">height</span>: w + <span class="hljs-string">'px'</span>,
            <span class="hljs-attr">position</span>: <span class="hljs-string">'fixed'</span>,
            <span class="hljs-attr">transform</span>: <span class="hljs-string">'translate(-'</span> + cha + <span class="hljs-string">'px,'</span> + cha + <span class="hljs-string">'px) rotate(90deg)'</span>
        }
    }
    
    
}

<span class="hljs-comment">//全屏 mini 两种模式切换</span>
pro.switch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> vR = <span class="hljs-keyword">this</span>.vRoom;
    <span class="hljs-comment">//获取需要转换的样式信息</span>
    <span class="hljs-keyword">var</span> info = <span class="hljs-keyword">this</span>.isMax ? <span class="hljs-keyword">this</span>.miniInfo : <span class="hljs-keyword">this</span>.maxInfo;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> info) {
        vR.style[i] = info[i];
    }
    <span class="hljs-keyword">this</span>.isMax = !<span class="hljs-keyword">this</span>.isMax;
}

<span class="hljs-comment">//全屏按钮</span>
<span class="hljs-keyword">this</span>.vC.querySelector(<span class="hljs-string">'.fill'</span>).addEventListener(<span class="hljs-string">'tap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//that.nativeMax();</span>
    that.switch();
});</code></pre>
<p>瞧一瞧拉，看一看拉</p>
<p><span class="img-wrap"><img data-src="/img/bVBR8W" src="https://static.alili.tech/img/bVBR8W" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>看起来感觉很不错呢，利用css3的位移和旋转，让视频全屏在了屏幕前，但是问题也随之而来了</p>
<ul><li><p>播放按钮 以及 控制条 在全屏下 似乎隐藏了，其实是video标签盖在了父元素之上，我们作出相应的调整</p></li></ul>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bad-video {
    position: relative;
    /*overflow: hidden;*/
    background-color: #CCCCCC;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.bad-video</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-comment">/*overflow: hidden;*/</span>
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCCCCC</span>;
}</code></pre>
<p>js<br>max配置当中，设置zIndex值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            that.maxInfo = {//max状态时的样式
                zIndex:99,
                width: h + 'px',
                height: w + 'px',
                position: 'fixed',
                transform: 'translate(-' + cha + 'px,' + cha + 'px) rotate(90deg)'
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>            that<span class="hljs-selector-class">.maxInfo</span> = {<span class="hljs-comment">//max状态时的样式</span>
                zIndex:<span class="hljs-number">99</span>,
                <span class="hljs-attribute">width</span>: h + <span class="hljs-string">'px'</span>,
                <span class="hljs-attribute">height</span>: w + <span class="hljs-string">'px'</span>,
                <span class="hljs-attribute">position</span>: <span class="hljs-string">'fixed'</span>,
                <span class="hljs-attribute">transform</span>: <span class="hljs-string">'translate(-'</span> + cha + <span class="hljs-string">'px,'</span> + cha + <span class="hljs-string">'px) rotate(90deg)'</span>
            }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVBXPj" src="https://static.alili.tech/img/bVBXPj" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p>横向全屏后，左右滑动事件没有跟着方向改变</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //视频手势右滑动事件
        this.video.addEventListener('swiperight', function(e) {
            console.log('right');
            this.currentTime += 5;
        });
        //视频手势左滑动事件
        this.video.addEventListener('swipeleft', function(e) {
            console.log('left');
            this.currentTime -= 5;

        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">//视频手势右滑动事件</span>
        <span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'swiperight'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'right'</span>);
            <span class="hljs-keyword">this</span>.currentTime += <span class="hljs-number">5</span>;
        });
        <span class="hljs-comment">//视频手势左滑动事件</span>
        <span class="hljs-keyword">this</span>.video.addEventListener(<span class="hljs-string">'swipeleft'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'left'</span>);
            <span class="hljs-keyword">this</span>.currentTime -= <span class="hljs-number">5</span>;

        });</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVBXQH" src="https://static.alili.tech/img/bVBXQH" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这TM就很尴尬了，难道我全屏后，手机横放，还去上下快进快退？</p>
<p>这时候怎么办呢，不要方</p>
<h2 id="articleHeader6">手势滑动事件</h2>
<p>我们先给video注册一个事件列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var events = {};
    
    //增加 或者删除事件
    pro.eve = function(ename, callback, isF) {
        if(callback &amp;&amp; typeof(callback) == 'function') {
            isF &amp;&amp; arguments.callee(ename);
            events[ename] = callback;
            this.video.addEventListener(ename, events[ename]);
            console.log('添加事件：' + ename);
            return;
        }
        var fun = events[ename] || function(){};
        this.video.removeEventListener(ename, fun);
        console.log('删除事件：' + ename);
        return fun;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-keyword">var</span> events = {};
    
    <span class="hljs-comment">//增加 或者删除事件</span>
    pro.eve = function(ename, callback, isF) {
        <span class="hljs-keyword">if</span>(callback &amp;&amp; typeof(callback) == <span class="hljs-string">'function'</span>) {
            isF &amp;&amp; arguments.callee(ename);
            events[ename] = callback;
            <span class="hljs-keyword">this</span>.video.addEventListener(ename, events[ename]);
            console.log(<span class="hljs-string">'添加事件：'</span> + ename);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = events[ename] || <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{};
        <span class="hljs-keyword">this</span>.video.removeEventListener(ename, <span class="hljs-function"><span class="hljs-keyword">fun</span>);</span>
        console.log(<span class="hljs-string">'删除事件：'</span> + ename);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">fun</span>;</span>
    }</code></pre>
<p>给video事件添加一个代理来删除添加事件，isF就是在新增这个事件是否删除之前的这个相同的事件，因为添加事件用匿名函数的话，是不能删除的，这样设置一个代理就可以把动态添加的事件记录在events里面，便于操作</p>
<p>这时我们补上修改当前播放进度和音量的功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //跳转视频进度 单位 秒
    pro.setCurrentTime = function(t){
        this.video.currentTime += t;
    }
    //设置音量大小 单位 百分比 如 0.1
    pro.setVolume = function(v){
        this.video.volume+= v;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-comment">//跳转视频进度 单位 秒</span>
    pro.setCurrentTime = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(t)</span></span>{
        <span class="hljs-keyword">this</span>.video.currentTime += t;
    }
    <span class="hljs-comment">//设置音量大小 单位 百分比 如 0.1</span>
    pro.setVolume = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(v)</span></span>{
        <span class="hljs-keyword">this</span>.video.volume+= v;
    }</code></pre>
<p>再通过代理给video添加左右上下滑动的事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //视频手势右滑动事件
        this.eve('swiperight',function(){
            that.setCurrentTime(5);
        });
        
        //视频手势左滑动事件
        this.eve('swipeleft', function(e) {
            that.setCurrentTime(-5);
        });
        
        //视频手势上滑动事件
        this.eve('swipeup',function(){
            that.setVolume(0.2);
        });
        
        //视频手势下滑动事件
        this.eve('swipedown', function(e) {
            that.setCurrentTime(-0.2);
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>        <span class="hljs-comment">//视频手势右滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swiperight'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            that.setCurrentTime(<span class="hljs-number">5</span>);
        });
        
        <span class="hljs-comment">//视频手势左滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipeleft'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
            that.setCurrentTime(<span class="hljs-number">-5</span>);
        });
        
        <span class="hljs-comment">//视频手势上滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipeup'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            that.setVolume(<span class="hljs-number">0.2</span>);
        });
        
        <span class="hljs-comment">//视频手势下滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
            that.setCurrentTime(<span class="hljs-number">-0.2</span>);
        });</code></pre>
<p>ok，四个方向的滑动事件已经添加过去了，但这是mini模式播放时的事件，在全屏播放下，四个方向事件并没有跟着video元素方向的改变而改变，这下需要再通过最最最笨的方式判断是否全屏从而触发的事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //视频手势右滑动事件
        this.eve('swiperight',function(){
            if(that.isMax){
                return that.setVolume(0.2);
            }
            that.setCurrentTime(5);
        });
        
        //视频手势左滑动事件
        this.eve('swipeleft', function() {
            if(that.isMax){
                return that.setVolume(-0.2);
            }
            that.setCurrentTime(-5);
        });
        
        //视频手势上滑动事件
        this.eve('swipeup',function(){
            if(that.isMax){
                return that.setCurrentTime(-5);    
            }
            that.setVolume(0.2);
        });
        
        //视频手势下滑动事件
        this.eve('swipedown', function() {
            if(that.isMax){
                return that.setCurrentTime(5);    
            }
            that.setVolume(-0.2);
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>        <span class="hljs-comment">//视频手势右滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swiperight'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">if</span>(that.isMax){
                <span class="hljs-keyword">return</span> that.setVolume(<span class="hljs-number">0.2</span>);
            }
            that.setCurrentTime(<span class="hljs-number">5</span>);
        });
        
        <span class="hljs-comment">//视频手势左滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipeleft'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">if</span>(that.isMax){
                <span class="hljs-keyword">return</span> that.setVolume(<span class="hljs-number">-0.2</span>);
            }
            that.setCurrentTime(<span class="hljs-number">-5</span>);
        });
        
        <span class="hljs-comment">//视频手势上滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipeup'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">if</span>(that.isMax){
                <span class="hljs-keyword">return</span> that.setCurrentTime(<span class="hljs-number">-5</span>);    
            }
            that.setVolume(<span class="hljs-number">0.2</span>);
        });
        
        <span class="hljs-comment">//视频手势下滑动事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'swipedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">if</span>(that.isMax){
                <span class="hljs-keyword">return</span> that.setCurrentTime(<span class="hljs-number">5</span>);    
            }
            that.setVolume(<span class="hljs-number">-0.2</span>);
        });</code></pre>
<p>怎么样，虽然看起来有点stupid，但是很实用呢</p>
<h2 id="articleHeader7">5+客户端全屏解决方案</h2>
<p>虽说在5+客户端，android可以调用原生的方式播放，但还是差强人意，我们可以再来看一套解决方案</p>
<p><strong>初始化时，记录mini时的样式，全屏时，通过修改视频宽度为屏幕高度，视频高度修改为视频宽度，再利用5+的屏幕旋转，设置全屏，隐藏状态栏</strong></p>
<p>0)去除手势事件判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="因为现在是准备改变移动设备的方向，所以，手势方向会跟着设备方向改变
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>因为现在是准备改变移动设备的方向，所以，手势方向会跟着设备方向改变
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB8qs" src="https://static.alili.tech/img/bVB8qs" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>1)去除 css3 旋转以及位移</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    //记录信息
    pro.initInfo = function() {
        var that = this;
        //在onload状态下，offsetHeight才会获取到正确的值
        window.onload = function() {
            that.miniInfo = { //mini状态时的样式
                zIndex: 1,
                width: that.video.offsetWidth + 'px',
                height: that.video.offsetHeight + 'px',
                position: that.vRoom.style.position
            }

            that.maxInfo = { //max状态时的样式
                zIndex: 99,
                width: '100%',
                height: that.sw + 'px',
                position: 'fixed'
            }

        }

    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-comment">//记录信息</span>
    pro.initInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-comment">//在onload状态下，offsetHeight才会获取到正确的值</span>
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            that.miniInfo = { <span class="hljs-comment">//mini状态时的样式</span>
                zIndex: <span class="hljs-number">1</span>,
                <span class="hljs-attr">width</span>: that.video.offsetWidth + <span class="hljs-string">'px'</span>,
                <span class="hljs-attr">height</span>: that.video.offsetHeight + <span class="hljs-string">'px'</span>,
                <span class="hljs-attr">position</span>: that.vRoom.style.position
            }

            that.maxInfo = { <span class="hljs-comment">//max状态时的样式</span>
                zIndex: <span class="hljs-number">99</span>,
                <span class="hljs-attr">width</span>: <span class="hljs-string">'100%'</span>,
                <span class="hljs-attr">height</span>: that.sw + <span class="hljs-string">'px'</span>,
                <span class="hljs-attr">position</span>: <span class="hljs-string">'fixed'</span>
            }

        }

    }
</code></pre>
<p>2）该用5+的设置全屏以及隐藏状态栏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //全屏 mini 两种模式切换
    pro.switch = function() {
        var vR = this.vRoom;
        //获取需要转换的样式信息
        var info = this.isMax ? this.miniInfo : this.maxInfo;

        for(var i in info) {
            vR.style[i] = info[i];
        }
        this.isMax = !this.isMax;

        plus.navigator.setFullscreen(this.isMax);
        if(this.isMax) {
            //横屏
            plus.screen.lockOrientation(&quot;landscape-primary&quot;);
        } else {
            //竖屏
            plus.screen.lockOrientation(&quot;portrait-primary&quot;);
        }

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-comment">//全屏 mini 两种模式切换</span>
    pro.switch = function() {
        <span class="hljs-keyword">var</span> vR = <span class="hljs-keyword">this</span>.vRoom;
        <span class="hljs-comment">//获取需要转换的样式信息</span>
        <span class="hljs-keyword">var</span> info = <span class="hljs-keyword">this</span>.isMax ? <span class="hljs-keyword">this</span>.miniInfo : <span class="hljs-keyword">this</span>.maxInfo;

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> info) {
            vR.style[i] = info[i];
        }
        <span class="hljs-keyword">this</span>.isMax = !<span class="hljs-keyword">this</span>.isMax;

        plus.navigator.setFullscreen(<span class="hljs-keyword">this</span>.isMax);
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isMax) {
            <span class="hljs-comment">//横屏</span>
            plus.screen.lockOrientation(<span class="hljs-string">"landscape-primary"</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//竖屏</span>
            plus.screen.lockOrientation(<span class="hljs-string">"portrait-primary"</span>);
        }

    }</code></pre>
<p>3）全屏状态下，android端返回键，触发退出全屏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.initEvent = function() {
    //.......省略其他代码
    
    this.oback = $.back;
        //监听安卓返回键
        $.back = function() {
            if(that.isMax) {
                that.switch();
                return;
            }
            that.oback();
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>pro.initEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//.......省略其他代码</span>
    
    <span class="hljs-keyword">this</span>.oback = $.back;
        <span class="hljs-comment">//监听安卓返回键</span>
        $.back = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(that.isMax) {
                that.switch();
                <span class="hljs-keyword">return</span>;
            }
            that.oback();
        }
}</code></pre>
<p>效果图<br><span class="img-wrap"><img data-src="/img/bVB320" src="https://static.alili.tech/img/bVB320" alt="1.gif" title="1.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">5+重力感应切换全屏</h2>
<p>嘿嘿，一个在移动端的播放器怎么能少得了 自动切换 横竖屏呢？<br>在个小节当中就讲了如何手动切换全屏，接下来重力感应切换横屏，需要用到5+的API <a href="http://www.html5plus.org/doc/zh_cn/accelerometer.html" rel="nofollow noreferrer" target="_blank"><strong>Accelerometer</strong></a> 加速度感应</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="简单说：重力加速度感应可以想象成一个小球在坐标系中
三个方向上的加速度。永远以手机屏幕为准" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>简单说：重力加速度感应可以想象成一个小球在坐标系中
三个方向上的加速度。永远以手机屏幕为准</code></pre>
<p>啥是加速度？额，就是物理书上的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="手机水平放置向上是y轴正向
向右是x轴正向，向外是z轴正向" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>手机水平放置向上是y轴正向
向右是<span class="hljs-keyword">x</span>轴正向，向外是z轴正向</code></pre>
<p>啥是xyz轴？额，就是高数书上的</p>
<p>哎呀，你把手机竖屏正直的放在地上，你人正直走上去，现在你站在你的手机的屏幕上，然后你的右手打开伸直，这就是x轴，你现在看着前面，这就是y轴，你的头顶就是z轴。这样讲明白了不，但是并不是真的要你踩手机，23333</p>
<p>您也可以选择查看其他讲解：<a href="http://blog.163.com/sunshine_linting/blog/static/448933232012111102041393/" rel="nofollow noreferrer" target="_blank">Android-传感器开发-方向判断  </a></p>
<ol>
<li>
<p>x,y轴变化：</p>
<p>手机屏幕向上水平放置时： (x,y,z) = (0, 0, -9.81)<br>   当手机顶部抬起时： y减小，且为负值<br>   当手机底部抬起时： y增加，且为正值<br>   当手机右侧抬起时： x减小，且为负值<br>   当手机左侧抬起时： x增加，且为正值</p>
</li>
<li><p>z轴的变化：<br>   手机屏幕向上水平放置时，z= -9.81<br>   手机屏幕竖直放置时，      z=  0<br>   手机屏幕向下水平放置时，z=  9.81</p></li>
<li><p>屏幕横竖切换条件<br>   y&lt;=-5时， 切换为竖向<br>   x&lt;=-5时， 换为横向</p></li>
</ol>
<p>ok，我们新增2个方法，用于打开和关闭设备监控</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //开启方向感应
    pro.startWatchAcc = function(){
        var that = this;
        this.watchAccFun = plus.accelerometer.watchAcceleration(function(a) {
                if(that.getIsMax()){
                    //当前为全屏状态
                    //判断是否满足竖屏Mini状态
                    a.yAxis>=5 &amp;&amp; that.setIsMax(false);
                }else{
                    //当前为Mini状态
                    //判断是否满足全屏Max状态
                    Math.abs(a.xAxis) >=5 &amp;&amp; that.setIsMax(true); 
                }
            }, function(e) {
                //出错了大不了 不自动旋转呗  让它手动 切换
                console.log(&quot;Acceleration error: &quot; + e.message);
                that.clearWatchAcc();
            },{
                frequency:1200
            });
    }
    //关闭方向感应
    pro.clearWatchAcc = function(){
        this.watchAccFun &amp;&amp; plus.accelerometer.clearWatch(this.watchAccFun);
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//开启方向感应</span>
    pro.startWatchAcc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.watchAccFun = plus.accelerometer.watchAcceleration(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
                <span class="hljs-keyword">if</span>(that.getIsMax()){
                    <span class="hljs-comment">//当前为全屏状态</span>
                    <span class="hljs-comment">//判断是否满足竖屏Mini状态</span>
                    a.yAxis&gt;=<span class="hljs-number">5</span> &amp;&amp; that.setIsMax(<span class="hljs-literal">false</span>);
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">//当前为Mini状态</span>
                    <span class="hljs-comment">//判断是否满足全屏Max状态</span>
                    <span class="hljs-built_in">Math</span>.abs(a.xAxis) &gt;=<span class="hljs-number">5</span> &amp;&amp; that.setIsMax(<span class="hljs-literal">true</span>); 
                }
            }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                <span class="hljs-comment">//出错了大不了 不自动旋转呗  让它手动 切换</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Acceleration error: "</span> + e.message);
                that.clearWatchAcc();
            },{
                <span class="hljs-attr">frequency</span>:<span class="hljs-number">1200</span>
            });
    }
    <span class="hljs-comment">//关闭方向感应</span>
    pro.clearWatchAcc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.watchAccFun &amp;&amp; plus.accelerometer.clearWatch(<span class="hljs-keyword">this</span>.watchAccFun);
    }
</code></pre>
<p>然后在初始化的时候默认打开方向监控</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var bvd = function(dom) {
        var that = this;
        $.ready(function() {
            //...
        })

        $.plusReady(function() {
            that.startWatchAcc();
        })

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> bvd = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        $.ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//...</span>
        })

        $.plusReady(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            that.startWatchAcc();
        })

    }</code></pre>
<p>再把横向全屏改为，可双向横屏</p>
<p><span class="img-wrap"><img data-src="/img/bVB8oQ" src="https://static.alili.tech/img/bVB8oQ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>真机调试看看</p>
<p><span class="img-wrap"><img data-src="/img/bVB8qi" src="https://static.alili.tech/img/bVB8qi" alt="ziong.gif" title="ziong.gif" style="cursor: pointer;"></span></p>
<p>嘿嘿，我们再给全屏播放时添加一个锁定按钮，让设备不监控 重力感应，也不响应视频的点击播放暂停事件</p>
<p>先做一个锁定按钮</p>
<p><span class="img-wrap"><img data-src="/img/bVB8JJ" src="https://static.alili.tech/img/bVB8JJ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当然，锁定图片，地址也改成用base64，最好也用js动态生成标签</p>
<p><span class="img-wrap"><img data-src="/img/bVB8JT" src="https://static.alili.tech/img/bVB8JT" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>设置它的基本样式，靠右，上下垂直居中，默认隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .lock {
            padding: .3rem;
            width: 3rem;
            height: 3rem;
            position: absolute;
            right: .5rem;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            visibility: hidden;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-class">.lock</span> {
            <span class="hljs-attribute">padding</span>: .<span class="hljs-number">3rem</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">3rem</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">3rem</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">right</span>: .<span class="hljs-number">5rem</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
            <span class="hljs-attribute">visibility</span>: hidden;
        }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB8J0" src="https://static.alili.tech/img/bVB8J0" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>好，我们来整理一下逻辑，</p>
<p>1）默认在mini播放时，lock隐藏<br>2）全屏播放时，lock显示，但是也会跟着控制条 在4s内向右隐藏<br>3）全屏暂停时，lock也跟着控制条 一直显示<br>4）点击lock锁定时，提示已锁定，控制条立即隐藏，lock4s内向右隐藏，视频点击事件更换为显示lock图标，android返回键事件改为不做任何，关闭重力监控<br>5）点击lock解锁时，提示已解锁，android返回键改为 切换为mini状态，开启重力监控</p>
<p>我擦，其实做起来还是挺郁闷的，主要是逻辑处理比较痛苦</p>
<p>0）添加一个向右移动的动画，3s延迟后 1s内 执行完动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes lockhide {0% {transform: translate(0%,-50%);}100% {transform: translate(120%,-50%);"}}"

webkit-keyframes lockhide {0% {transform: translate(0%,-50%);}100% {transform: translate(120%,-50%);"}}"

.lockhidden {
    animation: lockhide 1s 3s linear;
    -webkit-animation: lockhide 1s 3s linear;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode: forwards;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>@keyframes lockhide {0% {<span class="hljs-attribute">transform</span>: translate(<span class="hljs-number">0%</span>,-<span class="hljs-number">50%</span>);}100% {<span class="hljs-attribute">transform</span>: translate(<span class="hljs-number">120%</span>,-<span class="hljs-number">50%</span>);"}}"

webkit-keyframes lockhide {0% {<span class="hljs-attribute">transform</span>: translate(<span class="hljs-number">0%</span>,-<span class="hljs-number">50%</span>);}100% {<span class="hljs-attribute">transform</span>: translate(<span class="hljs-number">120%</span>,-<span class="hljs-number">50%</span>);"}}"

<span class="hljs-selector-class">.lockhidden</span> {
    <span class="hljs-attribute">animation</span>: lockhide <span class="hljs-number">1s</span> <span class="hljs-number">3s</span> linear;
    -webkit-<span class="hljs-attribute">animation</span>: lockhide <span class="hljs-number">1s</span> <span class="hljs-number">3s</span> linear;
    <span class="hljs-attribute">animation-fill-mode</span>:forwards;
    -webkit-<span class="hljs-attribute">animation-fill-mode</span>: forwards;
}
</code></pre>
<p>1）全屏时显示lock</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    pro.switch = function() {
        //...
        //全屏时 显示锁定 图标
        this.vlock.style.visibility = this.isMax ? 'visible' : 'hidden';

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    pro.switch = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">//...</span>
        <span class="hljs-comment">//全屏时 显示锁定 图标</span>
        <span class="hljs-keyword">this</span>.vlock.style.visibility = <span class="hljs-keyword">this</span>.isMax ? <span class="hljs-string">'visible'</span> : <span class="hljs-string">'hidden'</span>;

    }</code></pre>
<p>2)全屏播放时，lock显示，但是也会跟着控制条 在4s内向右隐藏<br>我们在播放时添加lock的隐藏动画，</p>
<p><span class="img-wrap"><img data-src="/img/bVB8LC" src="https://static.alili.tech/img/bVB8LC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>3）全屏暂停时，lock也跟着控制条 一直显示</p>
<p><span class="img-wrap"><img data-src="/img/bVB8LE" src="https://static.alili.tech/img/bVB8LE" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>4）点击lock锁定时，提示已锁定，控制条立即隐藏，lock4s内向右隐藏，视频点击事件更换为显示lock图标，android返回键事件改为不做任何，关闭重力监控<br>5）点击lock解锁时，提示已解锁，android返回键改为 切换为mini状态，开启重力监控</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //锁定屏幕
    pro.lockScreen = function() {
        $.toast('锁定屏幕');
        var that = this;
        //更换video点击事件为 显示 lock图标，并保存 video之前的事件 
        this.videoTapFn = this.eve('tap', function() {
            that.lockT = setTimeout(function(){
                that.vlock.classList.add('lockhidden');
            },500);
                //重新开始播放样式
            that.vlock.classList.remove('lockhidden');
            that.vlock.style.visibility = 'visible';
        }, true);
        //隐藏控制条
        this.vC.style.visibility = 'hidden';
        //给Lock图标增加 隐藏样式类
        this.vlock.classList.add('lockhidden');
        //锁定屏幕时，不监控重力感应
        this.clearWatchAcc();
        //标识当前更改的Lock状态
        this.isLock = true;

    }

    //解锁屏幕
    pro.unlockScreen = function() {
        $.toast('解锁屏幕');
        //替换回video之前的点击事件
        this.eve('tap', this.videoTapFn, true);
        //给Lock图标清楚 隐藏样式类
        this.vlock.classList.remove('lockhidden');
        //不锁定屏幕时，监控重力感应
        this.startWatchAcc();
        //标识当前更改的Lock状态
        this.isLock = false;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//锁定屏幕</span>
    pro.lockScreen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $.toast(<span class="hljs-string">'锁定屏幕'</span>);
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-comment">//更换video点击事件为 显示 lock图标，并保存 video之前的事件 </span>
        <span class="hljs-keyword">this</span>.videoTapFn = <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'tap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            that.lockT = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                that.vlock.classList.add(<span class="hljs-string">'lockhidden'</span>);
            },<span class="hljs-number">500</span>);
                <span class="hljs-comment">//重新开始播放样式</span>
            that.vlock.classList.remove(<span class="hljs-string">'lockhidden'</span>);
            that.vlock.style.visibility = <span class="hljs-string">'visible'</span>;
        }, <span class="hljs-literal">true</span>);
        <span class="hljs-comment">//隐藏控制条</span>
        <span class="hljs-keyword">this</span>.vC.style.visibility = <span class="hljs-string">'hidden'</span>;
        <span class="hljs-comment">//给Lock图标增加 隐藏样式类</span>
        <span class="hljs-keyword">this</span>.vlock.classList.add(<span class="hljs-string">'lockhidden'</span>);
        <span class="hljs-comment">//锁定屏幕时，不监控重力感应</span>
        <span class="hljs-keyword">this</span>.clearWatchAcc();
        <span class="hljs-comment">//标识当前更改的Lock状态</span>
        <span class="hljs-keyword">this</span>.isLock = <span class="hljs-literal">true</span>;

    }

    <span class="hljs-comment">//解锁屏幕</span>
    pro.unlockScreen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $.toast(<span class="hljs-string">'解锁屏幕'</span>);
        <span class="hljs-comment">//替换回video之前的点击事件</span>
        <span class="hljs-keyword">this</span>.eve(<span class="hljs-string">'tap'</span>, <span class="hljs-keyword">this</span>.videoTapFn, <span class="hljs-literal">true</span>);
        <span class="hljs-comment">//给Lock图标清楚 隐藏样式类</span>
        <span class="hljs-keyword">this</span>.vlock.classList.remove(<span class="hljs-string">'lockhidden'</span>);
        <span class="hljs-comment">//不锁定屏幕时，监控重力感应</span>
        <span class="hljs-keyword">this</span>.startWatchAcc();
        <span class="hljs-comment">//标识当前更改的Lock状态</span>
        <span class="hljs-keyword">this</span>.isLock = <span class="hljs-literal">false</span>;
    }
</code></pre>
<p>666）最后给我们亲爱的lock图标增加一枚抚摸事件，以及android返回键的事件更改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //全屏 时 锁定点击事件
        this.vlock.addEventListener('tap', function() {
            if(that.isLock) {
                that.unlockScreen();
                return;
            }
            that.lockScreen();
        });

        this.oback = $.back;
        //监听安卓返回键
        $.back = function(){
            if(that.isMax){
                if(!that.isLock){
                    //全屏状态下 按下返回键 时，1s内不监控重力，防止返回Mini状态时和重力感应并发事件
                    setTimeout(function(){
                        that.startWatchAcc();
                    },1000);
                    that.clearWatchAcc();
                    that.switch();
                }
                return;
            }
            that.oback();
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">//全屏 时 锁定点击事件</span>
        <span class="hljs-keyword">this</span>.vlock.addEventListener(<span class="hljs-string">'tap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(that.isLock) {
                that.unlockScreen();
                <span class="hljs-keyword">return</span>;
            }
            that.lockScreen();
        });

        <span class="hljs-keyword">this</span>.oback = $.back;
        <span class="hljs-comment">//监听安卓返回键</span>
        $.back = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(that.isMax){
                <span class="hljs-keyword">if</span>(!that.isLock){
                    <span class="hljs-comment">//全屏状态下 按下返回键 时，1s内不监控重力，防止返回Mini状态时和重力感应并发事件</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        that.startWatchAcc();
                    },<span class="hljs-number">1000</span>);
                    that.clearWatchAcc();
                    that.switch();
                }
                <span class="hljs-keyword">return</span>;
            }
            that.oback();
        }
    }</code></pre>
<p>好了！本文5+全屏demo <a href="http://git.oschina.net/newsning/BvdVideo" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<p>写博客不易，但是那种分享的心情是很不错的，何尝不是另一种温习和进步呢？</p>
<p>谢谢各位。</p>
<p>本文相关文章：<a href="https://segmentfault.com/blog/248">H5打造属于自己的视频播放器 专栏</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5打造属于自己的视频播放器（JS篇2）

## 原文链接
[https://segmentfault.com/a/1190000006604046](https://segmentfault.com/a/1190000006604046)

