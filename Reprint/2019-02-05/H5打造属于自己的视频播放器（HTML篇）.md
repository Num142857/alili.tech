---
title: 'H5打造属于自己的视频播放器（HTML篇）' 
date: 2019-02-05 2:30:09
hidden: true
slug: hvoqsx1kq15
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>众所周知，16年无疑是直播行业的春天，同时也是H5的一次高潮。<br>so，到现在用H5技术在移动端做网页直播也是见怪不怪了，但是！！！<br>今天我们的主角是webApp下播放视频<br>参考文献：<br>1)<a href="http://blog.csdn.net/nlxwzh/article/details/40541957" rel="nofollow noreferrer" target="_blank">HTML5+CSS3+JQuery打造自定义视频播放器</a><br>2)<a href="http://ask.dcloud.net.cn/article/569" rel="nofollow noreferrer" target="_blank">mui Html5 Video 实现方案</a><br>3)<a href="http://www.xuanfengge.com/html5-video-play.html" rel="nofollow noreferrer" target="_blank">移动端HTML5&lt;video&gt;视频播放优化实践</a></p>
<h2 id="articleHeader1">搬好凳子看HTML</h2>
<p>首先我们在HB下创建一个新的app项目，名称为 欠债</p>
<p><span class="img-wrap"><img data-src="/img/bVBe1P" src="https://static.alili.tech/img/bVBe1P" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>新建一个video.html</p>
<p><span class="img-wrap"><img data-src="/img/bVBfG0" src="https://static.alili.tech/img/bVBfG0" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>webkit-playsinline : 在ios中，加入此属性，可以关闭自动全屏播放<br>object-fit:fill : 视频充满video容器的大小<br>详细理由请看参考文献2or3</p>
<p>在此我们向项目里放置一个mp4格式的视频,视频内容不限,可以是小动画,也可以是<br><span class="img-wrap"><img data-src="/img/bVBfjr" src="https://static.alili.tech/img/bVBfjr" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>ps:要在meta中加上，否则视频会扩充变形哦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"</span> /&gt;</code></pre>
<p>OK,现在布局已经完成,一个视频已经在页面中了</p>
<p>旁白：尼玛，点了没反应，那这怎么播放？</p>
<p>楼主：你们这群家伙看别的小视频等个1小时都行。。。</p>
<p>旁白：一个简单的播放器，至少要有  暂停/播放，进度条，视频时长，全屏等控件吧</p>
<p>楼主：来来来，不要急，先来个播放按钮写在video标签后面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <div class=&quot;bad-video&quot;>
            <video class=&quot;&quot; webkit-playsinline style=&quot;object-fit:fill;&quot;>
                <source src='xx.mp4' type=&quot;video/mp4&quot;></source>
                <p>设备不支持</p>
            <video>
            <img src=&quot;img/play.png&quot;/>
        </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bad-video"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">webkit-playsinline</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"object-fit:fill;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'xx.mp4'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"video/mp4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">source</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>设备不支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">video</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"img/play.png"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>写好样式、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .bad-video {
            position: relative;
            overflow: hidden;
            background-color: #CCCCCC;
        }
        
        .bad-video .vplay{
            position: absolute;
            width: 15%;
            z-index: 99;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-class">.bad-video</span> {
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCCCCC</span>;
        }
        
        <span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.vplay</span>{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">15%</span>;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
        }</code></pre>
<p>楼主：当当当</p>
<p><span class="img-wrap"><img data-src="/img/bVBfLT" src="https://static.alili.tech/img/bVBfLT" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再在后面加一个控制条</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            <img src=&quot;img/play.png&quot; class=&quot;vplay&quot; />
            <div class=&quot;controls&quot;>
                <div>
                    <div class=&quot;progressBar&quot;>
                        <div class=&quot;timeBar&quot;></div>
                    </div>
                </div>
                <div><span class=&quot;current&quot;>00:00</span>/<span class=&quot;duration&quot;>00:00</span></div>
                <div><span class=&quot;fill&quot;>全屏</span></div>
            </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>            &lt;img src=<span class="hljs-string">"img/play.png"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"vplay"</span> /&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"controls"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progressBar"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"timeBar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current"</span>&gt;</span>00:00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>/<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"duration"</span>&gt;</span>00:00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fill"</span>&gt;</span>全屏<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bad-video .controls {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
    color: white;
    display: block;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, .55);
    display: -webkit-flex;
    display: flex;
}

.bad-video .controls>* {
    flex: 1;
}

.bad-video .controls>*:nth-child(1) {
    flex: 6;
}

.bad-video .controls>*:nth-child(2) {
    flex: 2;
    text-align: center;
}

.bad-video .controls .progressBar {
    margin: .75rem 5%;
    position: relative;
    width: 90%;
    height: .5rem;
    background-color: rgba(200, 200, 200, .55);
    border-radius: 10px;
}

.bad-video .controls .timeBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(99, 110, 225, .85);
    border-radius: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2rem</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2rem</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.8rem</span>;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, .55);
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: flex;
}

<span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span>&gt;* {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span>&gt;*<span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span>&gt;*<span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span> <span class="hljs-selector-class">.progressBar</span> {
    <span class="hljs-attribute">margin</span>: .<span class="hljs-number">75rem</span> <span class="hljs-number">5%</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
    <span class="hljs-attribute">height</span>: .<span class="hljs-number">5rem</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(200, 200, 200, .55);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.bad-video</span> <span class="hljs-selector-class">.controls</span> <span class="hljs-selector-class">.timeBar</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(99, 110, 225, .85);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>总算有个看起来像样的了<br><span class="img-wrap"><img data-src="/img/bVBgie" src="https://static.alili.tech/img/bVBgie" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>旁白：楼主，可是还是不能播放啊<br>楼主：叫你别急，要不你先去撸一把，我写好了文字@你<br>旁白：好啊，早说嘛，我先走了，记得@我<br>楼主：你走，省的我精神分裂码两个人的字</p>
<p>好，现在Html元素已经基本上弄好啦，看起来不是那么low了</p>
<p><a href="https://segmentfault.com/a/1190000006477658">H5打造属于自己的视频播放器（逻辑篇）</a><br><a href="https://segmentfault.com/a/1190000006569543" target="_blank">H5打造属于自己的视频播放器（JS篇1）</a><br><a href="https://segmentfault.com/a/1190000006604046">H5打造属于自己的视频播放器（JS篇2）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5打造属于自己的视频播放器（HTML篇）

## 原文链接
[https://segmentfault.com/a/1190000006461476](https://segmentfault.com/a/1190000006461476)

