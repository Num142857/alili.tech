---
title: 'HTML5 VideoAPI，打造自己的Web视频播放器' 
date: 2019-02-06 2:30:09
hidden: true
slug: ojluazlkzee
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文将使用HTML5提供的VideoAPI做一个自定义的视频播放器，需要用到HTML5提供的video标签、以及HTML5提供的对JavascriptAPI的扩展。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVzYcu" src="https://static.alili.tech/img/bVzYcu" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、基础知识</h2>
<h3 id="articleHeader1">1.用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;./video/mv.mp4&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./video/mv.mp4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<p>注意：audio和video元素必须同时包含开始和结束标签，不能使用<code>&lt;audio /&gt;</code>这样的空元素语法形式。</p>
<h3 id="articleHeader2">2.重要HTML属性</h3>
<p><strong>controls</strong>：ontrol：如果出现该属性，则向用户显示控件，比如播放按钮。每个浏览器中的播放控件都不太一样，但用途都一样，都可以控制开始和结束，跳到新位置和调节音量<br><strong>autoplay</strong>：autoplay：如果出现该属性，则视频在就绪后马上播放。如果不设置autoplay属性，必须是用户单击播放按钮才会播放音频文件。<br><strong>loop</strong>：loop：(循环播放)告诉浏览器在音频到达末尾时，再从头开始重新播放<br><strong>preload</strong>：auto、mete、none：告诉浏览器如何下载音频</p>
<ul>
<li><p>auto：让浏览器下载整个文件，以便用户单击播放按钮时就能播放。当然，下载过程是后台进行的，网页访客不必等待下载完成，而且仍然可以随意查看网页。</p></li>
<li><p>meta：告诉浏览器先获取音频文件开头的数据块，从而足以确定一些基本信息（比如音频的总时长）</p></li>
<li><p>none：**告诉浏览器不必预先下载。恰当地利用这些值，可以节省带宽。</p></li>
</ul>
<p>如果没有设置preload属性，浏览器就自己决定是否预先下载了。对这一点，不同浏览器的处理方式也不一样。多数浏览器将auto作为默认值，但Firefox的默认值是metadata。不过，也请大家注意，这个preload属性也不是必须严格执行的规则，而只是你对浏览器的建议。根据具体情况，浏览器可以忽略你的设置。（有些旧版本浏览器根据不会在意preload属性。）</p>
<h3 id="articleHeader3">3.常用事件</h3>
<p>事件名称 ： 解释<br><strong>oncanplay</strong>：当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。<br><strong>ontimeupdate</strong>： 当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。    <br><strong>onended</strong>：当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。</p>
<h3 id="articleHeader4">4.常用方法</h3>
<p>方法名称 ：解释<br><strong>play()</strong>：开始播放音频/视频    <br><strong>pause()</strong>：暂停当前播放的音频/视频</p>
<h3 id="articleHeader5">5.常用API属性</h3>
<p>属性名称 ： 解释        <br><strong>duration</strong>：返回当前音频/视频的长度（以秒计）    <br><strong>paused</strong>：设置或返回音频/视频是否暂停    <br><strong>currentTime</strong>：设置或返回音频/视频中的当前播放位置（以秒计）<br><strong>ended</strong>：返回音频/视频的播放是否已结束    </p>
<p>更多属性、事件、方法请查看<a href="http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp" rel="nofollow noreferrer" target="_blank">w3school</a></p>
<h2 id="articleHeader6">二、打造自己的播放器</h2>
<p>我们使用JavaScript控制播放控件的行为（自定义播放控件），实现如下功能：</p>
<ul>
<li><p>利用HTML+CSS制作一个自己的播放控件条，然后定位到视频最下方</p></li>
<li><p>视频加载loading效果</p></li>
<li><p>播放、暂停</p></li>
<li><p>总时长和当前播放时长显示</p></li>
<li><p>播放进度条</p></li>
<li><p>全屏显示</p></li>
</ul>
<h3 id="articleHeader7">1.播放控件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<figure>
    <figcaption>视频播放器</figcaption>
    <div class=&quot;player&quot;>
        <video src=&quot;./video/mv.mp4&quot;></video>
        <div class=&quot;controls&quot;>
            <!-- 播放/暂停 -->
            <a href=&quot;javascript:;&quot; class=&quot;switch fa fa-play&quot;></a>
            <!-- 全屏 -->
            <a href=&quot;javascript:;&quot; class=&quot;expand fa fa-expand&quot;></a>
            <!-- 进度条 -->
            <div class=&quot;progress&quot;>
                <div class=&quot;loaded&quot;></div>
                <div class=&quot;line&quot;></div>
                <div class=&quot;bar&quot;></div>
            </div>
            <!-- 时间 -->
            <div class=&quot;timer&quot;>
                <span class=&quot;current&quot;>00:00:00</span> /
                <span class=&quot;total&quot;>00:00:00</span>
            </div>
            <!-- 声音 -->
        </div>
    </div>
</figure>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">figure</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">figcaption</span>&gt;</span>视频播放器<span class="hljs-tag">&lt;/<span class="hljs-name">figcaption</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"player"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./video/mv.mp4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"controls"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 播放/暂停 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch fa fa-play"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 全屏 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"expand fa fa-expand"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 进度条 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loaded"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 时间 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"timer"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current"</span>&gt;</span>00:00:00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> /
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"total"</span>&gt;</span>00:00:00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 声音 --&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre>
<p>上面是全部HTML代码，<code>.controls</code>类就是播放控件HTML，引用CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;./css/font-awesome.css&quot;>
<link rel=&quot;stylesheet&quot; href=&quot;./css/player.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./css/font-awesome.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./css/player.css"</span>&gt;</span></code></pre>
<p>为了显示播放按钮等图标我使用了字体图标</p>
<h3 id="articleHeader8">2.视频加载loading效果</h3>
<p>一开始先隐藏视频，用一个背景图片替代，等到视频加载完成可以播放时在显示视频<br>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".player {
    width: 720px;
    height: 360px;
    margin: 0 auto;
    background: #000 url(../images/loading.gif) center/300px no-repeat;
    position: relative;
}
 
video {
    display: none;
    height: 100%;
    margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.player</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">720px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">360px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span> <span class="hljs-built_in">url</span>(../images/loading.gif) center/<span class="hljs-number">300px</span> no-repeat;
    <span class="hljs-attribute">position</span>: relative;
}
 
<span class="hljs-selector-tag">video</span> {
    <span class="hljs-attribute">display</span>: none;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<h3 id="articleHeader9">3.播放功能</h3>
<p>让我们开始写javascript代码吧，首先我们先获取要用到的DOM元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var video = document.querySelector(&quot;video&quot;);
var isPlay = document.querySelector(&quot;.switch&quot;);
var expand = document.querySelector(&quot;.expand&quot;);
var progress = document.querySelector(&quot;.progress&quot;);
var loaded = document.querySelector(&quot;.progress > .loaded&quot;);
var currPlayTime = document.querySelector(&quot;.timer > .current&quot;);
var totalTime = document.querySelector(&quot;.timer > .total&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> video = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"video"</span>);
<span class="hljs-keyword">var</span> isPlay = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".switch"</span>);
<span class="hljs-keyword">var</span> expand = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".expand"</span>);
<span class="hljs-keyword">var</span> progress = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".progress"</span>);
<span class="hljs-keyword">var</span> loaded = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".progress &gt; .loaded"</span>);
<span class="hljs-keyword">var</span> currPlayTime = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".timer &gt; .current"</span>);
<span class="hljs-keyword">var</span> totalTime = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".timer &gt; .total"</span>);</code></pre>
<p>当视频可以播放时，显示视频</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当视频可播放的时候
video.oncanplay = function(){
      //显示视频
      this.style.display = &quot;block&quot;;
      //显示视频总时长
      totalTime.innerHTML = getFormatTime(this.duration);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//当视频可播放的时候</span>
video.oncanplay = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-comment">//显示视频</span>
      <span class="hljs-keyword">this</span>.style.display = <span class="hljs-string">"block"</span>;
      <span class="hljs-comment">//显示视频总时长</span>
      totalTime.innerHTML = getFormatTime(<span class="hljs-keyword">this</span>.duration);
};</code></pre>
<h3 id="articleHeader10">4.播放、暂停</h3>
<p>点击播放按钮时显示暂停图标，在播放和暂停状态之间切换图标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//播放按钮控制
isPlay.onclick = function(){
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        }
        this.classList.toggle(&quot;fa-pause&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//播放按钮控制</span>
isPlay.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(video.paused) {
            video.play();
        } <span class="hljs-keyword">else</span> {
            video.pause();
        }
        <span class="hljs-keyword">this</span>.classList.toggle(<span class="hljs-string">"fa-pause"</span>);
};</code></pre>
<h3 id="articleHeader11">5.总时长和当前播放时长显示</h3>
<p>前面代码中其实已经设置了相关代码，此时我们只需要把获取到的毫秒数转换成我们需要的时间格式即可，提供<code>getFormatTime()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getFormatTime(time) {
        var time = time  0;
 
        var h = parseInt(time/3600),
            m = parseInt(time%3600/60),
            s = parseInt(time%60);
        h = h < 10 ? &quot;0&quot;+h : h;
        m = m < 10 ? &quot;0&quot;+m : m;
        s = s < 10 ? &quot;0&quot;+s : s;
 
        return h+&quot;:&quot;+m+&quot;:&quot;+s;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFormatTime</span>(<span class="hljs-params">time</span>) </span>{
        <span class="hljs-keyword">var</span> time = time  <span class="hljs-number">0</span>;
 
        <span class="hljs-keyword">var</span> h = <span class="hljs-built_in">parseInt</span>(time/<span class="hljs-number">3600</span>),
            m = <span class="hljs-built_in">parseInt</span>(time%<span class="hljs-number">3600</span>/<span class="hljs-number">60</span>),
            s = <span class="hljs-built_in">parseInt</span>(time%<span class="hljs-number">60</span>);
        h = h &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">"0"</span>+h : h;
        m = m &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">"0"</span>+m : m;
        s = s &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">"0"</span>+s : s;
 
        <span class="hljs-keyword">return</span> h+<span class="hljs-string">":"</span>+m+<span class="hljs-string">":"</span>+s;
    }</code></pre>
<h3 id="articleHeader12">6.播放进度条</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//播放进度
video.ontimeupdate = function(){
    var currTime = this.currentTime,    //当前播放时间
    duration = this.duration;       // 视频总时长
    //百分比
    var pre = currTime / duration * 100 + &quot;%&quot;;
    //显示进度条
    loaded.style.width = pre;
 
     //显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//播放进度</span>
video.ontimeupdate = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> currTime = <span class="hljs-keyword">this</span>.currentTime,    <span class="hljs-comment">//当前播放时间</span>
    duration = <span class="hljs-keyword">this</span>.duration;       <span class="hljs-comment">// 视频总时长</span>
    <span class="hljs-comment">//百分比</span>
    <span class="hljs-keyword">var</span> pre = currTime / duration * <span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>;
    <span class="hljs-comment">//显示进度条</span>
    loaded.style.width = pre;
 
     <span class="hljs-comment">//显示当前播放进度时间</span>
    currPlayTime.innerHTML = getFormatTime(currTime);
};</code></pre>
<p>这样就可以实时显示进度条了，此时，我们还需要点击进度条进行跳跃播放，即我们点击任意时间点视频跳转到当前时间点播放：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跳跃播放
progress.onclick = function(e){
    var event = e  window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>//跳跃播放
<span class="hljs-keyword">progress</span>.onclick = function(e){
    var event = e  window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};</code></pre>
<h3 id="articleHeader13">7.全屏显示</h3>
<p>这个功能可以使用HTML5提供的全局API：<code>webkitRequestFullScreen</code>实现，跟<code>video</code>无关：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//全屏
expand.onclick = function(){
     video.webkitRequestFullScreen();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//全屏</span>
expand.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
     video.webkitRequestFullScreen();
};</code></pre>
<p><a href="http://duni.sinaapp.com/demo/html-css/HTML5%E8%A7%86%E9%A2%91API%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8/" rel="nofollow noreferrer" target="_blank">完整示例和源码请点这里</a><br><a href="https://github.com/dunizb/CodeTest/tree/master/HTML%26CSS/html5/%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>经测试在firefox、IE下全屏功能不可用，这样正常了，全屏API是针对webkit内核的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 VideoAPI，打造自己的Web视频播放器

## 原文链接
[https://segmentfault.com/a/1190000006150560](https://segmentfault.com/a/1190000006150560)

