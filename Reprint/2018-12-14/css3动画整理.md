---
title: 'css3动画整理' 
date: 2018-12-14 2:30:11
hidden: true
slug: vc4ovdikie8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">趁逢年味，整理一些小东西，希望大家能够喜欢；</h3>
<p>列举以下7个小demo来抛砖引玉</p>
<h3 id="articleHeader1">1、多彩圆环</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Bcd?w=413&amp;h=292" src="https://static.alili.tech/img/bV3Bcd?w=413&amp;h=292" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>利用 CSS3 的  background-image 和 border-radius 组合成的动画</p>
<p>直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    html 
 
    <div id=&quot;item1&quot;>
        <div class=&quot;colorcircle shadow&quot;>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div class=&quot;centerWrap&quot;></div>
        </div>
        <div id=&quot;colorCenter&quot;>
            do something
        </div>
    </div>
    
    CSS
    #item1 {
        margin: 2em;
        height: 240px;
        position: relative;
        overflow: hidden;
    }
    .colorcircle {
        width: 240px;
        height: 240px;
        margin: auto;
        position: relative;
        overflow: hidden;
        animation: colorcircleAni 3s linear infinite;
    }

    @keyframes colorcircleAni {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .colorcircle > div.centerWrap {
        width: 100%;
        height: 100%;
        border-radius: 120px;
        box-shadow: 0 0 0 50px #fff;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.4), 0 0 0 50px #fff;
    }
    .colorcircle > div.centerWrap:before {
        content: &quot;&quot;;
        position: absolute;
        display: block;
        width: 84%;
        height: 84%;
        top: 8%;
        left: 8%;
        border-radius: 120px;
        background: #fff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    }
    .colorcircle > div {
        position: absolute;
        width: 50%;
        height: 50%;
    }
    .colorcircle > div:first-child,
    .colorcircle > div:nth-child(4) {
        left: 50%;
        width: 57.74%;
        margin-left: -28.87%;
    }
    .colorcircle > div:first-child {
        background-color: #ff0000;
        background-image: linear-gradient(90deg, #ff0000 12%, #ffff00 88%);
    }
    .colorcircle > div:nth-child(2) {
        left: 50%;
        transform-origin: bottom;
        transform: skewX(150deg);
        background-color: #ffff00;
        background-image: linear-gradient(150deg, #ffff00 12%, #00ff00 88%);
    }
    .colorcircle > div:nth-child(3) {
        transform-origin: bottom;
        transform: skewX(30deg);
        background-color: #ff00ff;
        background-image: linear-gradient(30deg, #ff00ff 12%, #ff0000 88%);
    }
    .colorcircle > div:nth-child(4) {
        top: 50%;
        background-color: #0000ff;
        background-image: linear-gradient(90deg, #0000ff 12%, #00ffff 88%);
    }
    .colorcircle > div:nth-child(5) {
        left: 50%;
        top: 50%;
        transform-origin: top;
        transform: skewX(30deg);
        background-color: #00ffff;
        background-image: linear-gradient(30deg, #00ffff 12%, #00ff00 88%);
    }
    .colorcircle > div:nth-child(6) {
        top: 50%;
        transform-origin: top;
        transform: skewX(150deg);
        background-color: #ff00ff;
        background-image: linear-gradient(150deg, #ff00ff 12%, #0000ff 88%);
    }
    #colorCenter {
        color: #888888;
        letter-spacing: 2px;
        font-size: 90%;
        line-height: 1.8em;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
    }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-tag">html</span> 
 
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"item1"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"colorcircle shadow"</span>&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;div&gt;&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"centerWrap"</span>&gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"colorCenter"</span>&gt;
            do something
        &lt;/div&gt;
    &lt;/div&gt;
    
    CSS
    <span class="hljs-selector-id">#item1</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-class">.colorcircle</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">margin</span>: auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">animation</span>: colorcircleAni <span class="hljs-number">3s</span> linear infinite;
    }

    @keyframes colorcircleAni {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">0deg</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">360deg</span>);
        }
    }

    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.centerWrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span> <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.4</span>), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span> <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.centerWrap</span>:before {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">84%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">84%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">8%</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">8%</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.4</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:first-child,
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">4</span>) {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">57.74%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">28.87%</span>;
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:first-child {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff0000</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">90deg</span>, <span class="hljs-number">#ff0000</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#ffff00</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">2</span>) {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform-origin</span>: bottom;
        <span class="hljs-attribute">transform</span>: skewX(<span class="hljs-number">150deg</span>);
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffff00</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">150deg</span>, <span class="hljs-number">#ffff00</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#00ff00</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">3</span>) {
        <span class="hljs-attribute">transform-origin</span>: bottom;
        <span class="hljs-attribute">transform</span>: skewX(<span class="hljs-number">30deg</span>);
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff00ff</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">30deg</span>, <span class="hljs-number">#ff00ff</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#ff0000</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">4</span>) {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0000ff</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">90deg</span>, <span class="hljs-number">#0000ff</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#00ffff</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">5</span>) {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform-origin</span>: top;
        <span class="hljs-attribute">transform</span>: skewX(<span class="hljs-number">30deg</span>);
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00ffff</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">30deg</span>, <span class="hljs-number">#00ffff</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#00ff00</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-class">.colorcircle</span> &gt; <span class="hljs-selector-tag">div</span>:nth-child(<span class="hljs-number">6</span>) {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform-origin</span>: top;
        <span class="hljs-attribute">transform</span>: skewX(<span class="hljs-number">150deg</span>);
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff00ff</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">150deg</span>, <span class="hljs-number">#ff00ff</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#0000ff</span> <span class="hljs-number">88%</span>);
    }
    <span class="hljs-selector-id">#colorCenter</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">90%</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.8em</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">50%</span>,-<span class="hljs-number">50%</span>,<span class="hljs-number">0</span>);
    }

</code></pre>
<p>demo 地址  <a href="http://wwlin.cn/cssAnima.html" rel="nofollow noreferrer" target="_blank">http://wwlin.cn/cssAnima.html</a> (包含以下所以demo)</p>
<h3 id="articleHeader2">2、sun-earth-moon</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Bhr?w=470&amp;h=415" src="https://static.alili.tech/img/bV3Bhr?w=470&amp;h=415" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>有同事说这是鸡蛋饼......<br>利用CSS  background-image、 box-shadow、 linear-gradient 等；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    html 
    
    <div id=&quot;item2&quot;>
        <div class=&quot;title&quot;>sun-earth-moon</div>
        <div class=&quot;pathway&quot;>
            <div class=&quot;earth&quot;>
                <div class=&quot;moon&quot;></div>
            </div>
        </div>
        <div class=&quot;sun&quot;></div>
    </div>
 
     CSS 
     
     #item2 {
        width: 270px;
        height: 240px;
        margin: 100px auto 200px;
        position: relative;
    }

    #item2  .title {
        height: 120px;
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 80px;
    }

    #item2 .pathway {
        width: 270px;
        height: 240px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.3);
        animation: pathwayAni 10s linear infinite;
    }  

    @keyframes pathwayAni {
        0% {
            transform:  rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes pathwayAni2 {
        0% {
            perspective:800;
            transform: translate3d(-50% ,-50%,0) rotate( 0deg);
        }
        100% {
            perspective:800;
            transform: translate3d(-50% ,-50%,0) rotate(360deg);
        }
    }

    #item2 .pathway  .earth{
        content: &quot;&quot;;
        width: 40px;
        height: 40px;
        background-image: linear-gradient(150deg, #00ff00 12%, #0000ff 88%);
        border-radius: 50%;
        position: absolute;
        top: 100px;
        left: -20px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        animation: pathwayAni 10s linear infinite;
    } 
    #item2 .pathway  .earth .moon {
        width: 15px;
        height: 15px;
        background-image: linear-gradient(150deg, #0000ff 12%,#ffd900  88%);
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
        top: 13px;
        left: -25px;
        animation: pathwayAni 10s linear infinite;
    }

    #item2 .sun {
        width: 80px;
        height: 80px;
        background-image:  linear-gradient(90deg, #ff0000 12%, #ffff00 88%);
        box-shadow: 0  0  20px rgba(245, 84, 84 , 0.7);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: 120px;
        animation: pathwayAni2 30s linear infinite;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
    <span class="hljs-selector-tag">html</span> 
    
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"item2"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"title"</span>&gt;sun-earth-moon&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"pathway"</span>&gt;
            &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"earth"</span>&gt;
                &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"moon"</span>&gt;&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"sun"</span>&gt;&lt;/div&gt;
    &lt;/div&gt;
 
     CSS 
     
     <span class="hljs-selector-id">#item2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">270px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-id">#item2</span>  <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
    }

    <span class="hljs-selector-id">#item2</span> <span class="hljs-selector-class">.pathway</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">270px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.3</span>);
        <span class="hljs-attribute">animation</span>: pathwayAni <span class="hljs-number">10s</span> linear infinite;
    }  

    @keyframes pathwayAni {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>:  rotate(<span class="hljs-number">0deg</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">360deg</span>);
        }
    }

    @keyframes pathwayAni2 {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">perspective</span>:<span class="hljs-number">800</span>;
            <span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">50%</span> ,-<span class="hljs-number">50%</span>,<span class="hljs-number">0</span>) rotate( <span class="hljs-number">0deg</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">perspective</span>:<span class="hljs-number">800</span>;
            <span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">50%</span> ,-<span class="hljs-number">50%</span>,<span class="hljs-number">0</span>) rotate(<span class="hljs-number">360deg</span>);
        }
    }

    <span class="hljs-selector-id">#item2</span> <span class="hljs-selector-class">.pathway</span>  .earth{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">150deg</span>, <span class="hljs-number">#00ff00</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#0000ff</span> <span class="hljs-number">88%</span>);
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.4</span>);
        <span class="hljs-attribute">animation</span>: pathwayAni <span class="hljs-number">10s</span> linear infinite;
    } 
    <span class="hljs-selector-id">#item2</span> <span class="hljs-selector-class">.pathway</span>  <span class="hljs-selector-class">.earth</span> <span class="hljs-selector-class">.moon</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">background-image</span>: linear-gradient(<span class="hljs-number">150deg</span>, <span class="hljs-number">#0000ff</span> <span class="hljs-number">12%</span>,<span class="hljs-number">#ffd900</span>  <span class="hljs-number">88%</span>);
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.4</span>);
        <span class="hljs-attribute">top</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">25px</span>;
        <span class="hljs-attribute">animation</span>: pathwayAni <span class="hljs-number">10s</span> linear infinite;
    }

    <span class="hljs-selector-id">#item2</span> <span class="hljs-selector-class">.sun</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">background-image</span>:  linear-gradient(<span class="hljs-number">90deg</span>, <span class="hljs-number">#ff0000</span> <span class="hljs-number">12%</span>, <span class="hljs-number">#ffff00</span> <span class="hljs-number">88%</span>);
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span>  <span class="hljs-number">0</span>  <span class="hljs-number">20px</span> rgba(<span class="hljs-number">245</span>, <span class="hljs-number">84</span>, <span class="hljs-number">84</span> , <span class="hljs-number">0.7</span>);
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">animation</span>: pathwayAni2 <span class="hljs-number">30s</span> linear infinite;
    }
</code></pre>
<h3 id="articleHeader3">3、snail</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Bjy?w=476&amp;h=260" src="https://static.alili.tech/img/bV3Bjy?w=476&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我将这个动画发给女同事，然而被骂！！！<br>   利用一张图片，两个盒子拼凑效果；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html 
 
 <div id=&quot;item3&quot;>
    <div class=&quot;title&quot;>snail (one picture)</div>
    <div class=&quot;snailOpction&quot;>
        <div class=&quot;snail_box1 active fl&quot;>
            <img class=&quot;snail_1&quot; src=&quot;http://wwlin.cn/images/77.png&quot; alt=&quot;&quot;>
        </div>
        <div class=&quot;snail_box2 active fl&quot;>
            <img class=&quot;snail_2&quot; src=&quot;http://wwlin.cn/images/77.png&quot; alt=&quot;&quot;>
        </div>
    </div>
</div>

CSS

 #item3 {
        height: 300px;
        width: 240px;
        position: relative;
        margin: 0 auto;
    }

    #item3 .title {
        height: 120px;
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 80px;
    }
    
    .snailOpction {
        position: absolute;
        left: 0;
        top: 100px;
        z-index: 19;
        animation: snailOpction 150s linear infinite;
        -webkit-animation: snailOpction 150s linear infinite;
    }

    @keyframes  snailOpction {
        0% {
            transform: translateX(-50%);
        }
        100% {
            transform: translateX(340px);
        }
    }
    @-webkit-keyframes  snailOpction {
        0% {
            -webkit-transform: translateX(-50%);
        }
        100% {
            -webkit-transform: translateX(340px);
        }
    }


    .snail_box1 {
        width: 65px;
        height: 64px;
        overflow: hidden;
        position: relative;
        z-index: 22;
    }
    .snail_box2 {
        width: 55px;
        height: 64px;
        overflow: hidden;
        position: relative;
        z-index: 19;
    }
    .snail_box1.active {
        animation: snail_box1 3S linear infinite;
        -webkit-animation: snail_box1 3S linear infinite;
    }

    @keyframes snail_box1 {
        0% {
            transform: translate3d(0,0,0);
        }
        50% {
            transform: translate3d(3px,-5px,0);
        }
        100% {
            transform: translate3d(0,0,0);
        }
    }
    @-webkit-keyframes snail_box1 {
        0% {
            -webkit-transform: translate3d(0,0,0);
        }
        50% {
            -webkit-transform: translate3d(3px,-5px,0);
        }
        100% {
            -webkit-transform: translate3d(0,0,0);
        }
    }

    .snail_box2.active {
        animation: snail_box2 3S linear infinite;
        -webkit-animation: snail_box2 3S linear infinite;
    }

    @keyframes snail_box2 {
        0% {
            transform: translate3d(0,0,0);
        }
        50% {
            transform: translate3d(-5px,-3px,0);
        }
        100% {
            transform: translate3d(0,0,0);
        }
    }
    @-webkit-keyframes snail_box2 {
        0% {
            -webkit-transform: translate3d(0,0,0);
        }
        50% {
            -webkit-transform: translate3d(-5px,-3px,0);
        }
        100% {
            -webkit-transform: translate3d(0,0,0);
        }
    }

    .snail_1 {
        width: 120px;
        height: 64px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .snail_2 {
        width: 120px;
        height: 64px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">html</span> 
 
 &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"item3"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"title"</span>&gt;snail (one picture)&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"snailOpction"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"snail_box1 active fl"</span>&gt;
            &lt;<span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"snail_1"</span> src=<span class="hljs-string">"http://wwlin.cn/images/77.png"</span> alt=<span class="hljs-string">""</span>&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"snail_box2 active fl"</span>&gt;
            &lt;<span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"snail_2"</span> src=<span class="hljs-string">"http://wwlin.cn/images/77.png"</span> alt=<span class="hljs-string">""</span>&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

CSS

 <span class="hljs-selector-id">#item3</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }

    <span class="hljs-selector-id">#item3</span> <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
    }
    
    <span class="hljs-selector-class">.snailOpction</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">19</span>;
        <span class="hljs-attribute">animation</span>: snailOpction <span class="hljs-number">150s</span> linear infinite;
        -webkit-<span class="hljs-attribute">animation</span>: snailOpction <span class="hljs-number">150s</span> linear infinite;
    }

    @keyframes  snailOpction {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: translateX(-<span class="hljs-number">50%</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">340px</span>);
        }
    }
    @-webkit-keyframes  snailOpction {
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translateX(-<span class="hljs-number">50%</span>);
        }
        <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">340px</span>);
        }
    }


    <span class="hljs-selector-class">.snail_box1</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">65px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">22</span>;
    }
    <span class="hljs-selector-class">.snail_box2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">55px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">19</span>;
    }
    <span class="hljs-selector-class">.snail_box1</span><span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">animation</span>: snail_box1 <span class="hljs-number">3</span>S linear infinite;
        -webkit-<span class="hljs-attribute">animation</span>: snail_box1 <span class="hljs-number">3</span>S linear infinite;
    }

    @keyframes snail_box1 {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">50%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">3px</span>,-<span class="hljs-number">5px</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
    }
    @-webkit-keyframes snail_box1 {
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">50%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">3px</span>,-<span class="hljs-number">5px</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
    }

    <span class="hljs-selector-class">.snail_box2</span><span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">animation</span>: snail_box2 <span class="hljs-number">3</span>S linear infinite;
        -webkit-<span class="hljs-attribute">animation</span>: snail_box2 <span class="hljs-number">3</span>S linear infinite;
    }

    @keyframes snail_box2 {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">50%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">5px</span>,-<span class="hljs-number">3px</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
    }
    @-webkit-keyframes snail_box2 {
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">50%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">5px</span>,-<span class="hljs-number">3px</span>,<span class="hljs-number">0</span>);
        }
        <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        }
    }

    <span class="hljs-selector-class">.snail_1</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.snail_2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.fl</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-class">.fr</span> {
        <span class="hljs-attribute">float</span>: right;
    }
</code></pre>
<h3 id="articleHeader4">4、 #item3 {</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        height: 300px;
        width: 240px;
        position: relative;
        margin: 0 auto;
    }

    #item3 .title {
        height: 120px;
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 80px;
    }
    
    .snailOpction {
        position: absolute;
        left: 0;
        top: 100px;
        z-index: 19;
        animation: snailOpction 150s linear infinite;
        -webkit-animation: snailOpction 150s linear infinite;
    }

    @keyframes  snailOpction {
        0% {
            transform: translateX(-50%);
        }
        100% {
            transform: translateX(340px);
        }
    }
    @-webkit-keyframes  snailOpction {
        0% {
            -webkit-transform: translateX(-50%);
        }
        100% {
            -webkit-transform: translateX(340px);
        }
    }


    .snail_box1 {
        width: 65px;
        height: 64px;
        overflow: hidden;
        position: relative;
        z-index: 22;
    }
    .snail_box2 {
        width: 55px;
        height: 64px;
        overflow: hidden;
        position: relative;
        z-index: 19;
    }
    .snail_box1.active {
        animation: snail_box1 3S linear infinite;
        -webkit-animation: snail_box1 3S linear infinite;
    }

    @keyframes snail_box1 {
        0% {
            transform: translate3d(0,0,0);
        }
        50% {
            transform: translate3d(3px,-5px,0);
        }
        100% {
            transform: translate3d(0,0,0);
        }
    }
    @-webkit-keyframes snail_box1 {
        0% {
            -webkit-transform: translate3d(0,0,0);
        }
        50% {
            -webkit-transform: translate3d(3px,-5px,0);
        }
        100% {
            -webkit-transform: translate3d(0,0,0);
        }
    }

    .snail_box2.active {
        animation: snail_box2 3S linear infinite;
        -webkit-animation: snail_box2 3S linear infinite;
    }

    @keyframes snail_box2 {
        0% {
            transform: translate3d(0,0,0);
        }
        50% {
            transform: translate3d(-5px,-3px,0);
        }
        100% {
            transform: translate3d(0,0,0);
        }
    }
    @-webkit-keyframes snail_box2 {
        0% {
            -webkit-transform: translate3d(0,0,0);
        }
        50% {
            -webkit-transform: translate3d(-5px,-3px,0);
        }
        100% {
            -webkit-transform: translate3d(0,0,0);
        }
    }

    .snail_1 {
        width: 120px;
        height: 64px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .snail_2 {
        width: 120px;
        height: 64px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .fl {
        float: left;
    }
    .fr {
        float: right;
    }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-tag">height</span>: 300<span class="hljs-selector-tag">px</span>;
        <span class="hljs-selector-tag">width</span>: 240<span class="hljs-selector-tag">px</span>;
        <span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">relative</span>;
        <span class="hljs-selector-tag">margin</span>: 0 <span class="hljs-selector-tag">auto</span>;
    }

    <span class="hljs-selector-id">#item3</span> <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
    }
    
    <span class="hljs-selector-class">.snailOpction</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">19</span>;
        <span class="hljs-attribute">animation</span>: snailOpction <span class="hljs-number">150s</span> linear infinite;
        <span class="hljs-attribute">-webkit-animation</span>: snailOpction <span class="hljs-number">150s</span> linear infinite;
    }

    @<span class="hljs-keyword">keyframes</span>  snailOpction {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
        }
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(340px);
        }
    }
    @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span>  snailOpction {
        0% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
        }
        100% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(340px);
        }
    }


    <span class="hljs-selector-class">.snail_box1</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">65px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">22</span>;
    }
    <span class="hljs-selector-class">.snail_box2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">55px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">19</span>;
    }
    <span class="hljs-selector-class">.snail_box1</span><span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">animation</span>: snail_box1 <span class="hljs-number">3S</span> linear infinite;
        <span class="hljs-attribute">-webkit-animation</span>: snail_box1 <span class="hljs-number">3S</span> linear infinite;
    }

    @<span class="hljs-keyword">keyframes</span> snail_box1 {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(3px,-5px,0);
        }
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
    }
    @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> snail_box1 {
        0% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
        50% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(3px,-5px,0);
        }
        100% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
    }

    <span class="hljs-selector-class">.snail_box2</span><span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">animation</span>: snail_box2 <span class="hljs-number">3S</span> linear infinite;
        <span class="hljs-attribute">-webkit-animation</span>: snail_box2 <span class="hljs-number">3S</span> linear infinite;
    }

    @<span class="hljs-keyword">keyframes</span> snail_box2 {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-5px,-3px,0);
        }
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
    }
    @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> snail_box2 {
        0% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
        50% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(-5px,-3px,0);
        }
        100% {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0);
        }
    }

    <span class="hljs-selector-class">.snail_1</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.snail_2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.fl</span> {
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-class">.fr</span> {
        <span class="hljs-attribute">float</span>: right;
    }

</code></pre>
<h3 id="articleHeader5">4、border-radius</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Bmi?w=347&amp;h=348" src="https://static.alili.tech/img/bV3Bmi?w=347&amp;h=348" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>利用 CSS 的 border-radius</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    html 
    
    <div id=&quot;item4&quot;>
        <div class=&quot;title&quot;>border-radius</div>
        <div class=&quot;menuBtn&quot;>
            <div class=&quot;menuBtn_2&quot;>*</div>
            <ul class=&quot;menuBtn_3&quot;>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <ul class=&quot;menu&quot;>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
    
    css
     #item4 {
        height: 300px;
        width: 64px;
        margin:  0 auto 100px;
    }

    #item4 .title {
        width: 150px;
        height: 120px;
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 80px;
        transform: translate(-50%);
    }
    
    #item4  .menuBtn {
        width: 60px;
        height: 60px;
        border: 2px solid #333333;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
    }
    
    #item4  .menuBtn .menuBtn_2 {
        width: 16px;
        height: 16px;
        color: #333333;
        font-size: 18px;
        text-align: center;
        line-height: 16px;
        border-left: 2px solid #333333;
        border-right: 2px solid #333333;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
    }
    
    #item4  .menuBtn .menuBtn_2::before {
        content: &quot;&quot;;
        width: 16px;
        height: 8px;
        position: absolute;
        top: -8px;
        left: -2px;
        border-top: 2px solid #333333;
        border-left: 2px solid #333333;
        border-right: 2px solid #333333;
        border-radius:8px 8px 0 0;
    }
    
    #item4  .menuBtn .menuBtn_2::after {
        content: &quot;&quot;;
        width: 16px;
        height: 8px;
        position: absolute;
        top: 16px;
        left: -2px;
        border-bottom: 2px solid #333333;
        border-left: 2px solid #333333;
        border-right: 2px solid #333333;
        border-radius:0 0 8px 8px;
    }
    
    .menuBtn_3 {
        width: 60px;
        height: 40px;
        position: absolute;
        top: 60px;
        padding-top: 10px; 
        animation: topToBottom 2s linear infinite;
    }
    
    .menuBtn_3 li {
        width: 4px;
        height: 4px;
        border: 1px solid #333333;
        border-radius: 50%;
        margin-bottom: 20px;
        transform: translateX(26px);
        opacity: 0;
    }
    
    .menuBtn_3 li:nth-child(1) {
        animation: menuBtn_3Li 2s linear infinite;
        -webkit-animation: menuBtn_3Li 2s linear infinite;
    }
    .menuBtn_3 li:nth-child(2) {
        animation: menuBtn_3Li 2s linear 0.5s infinite;
        -webkit-animation: menuBtn_3Li 2s linear 0.5s infinite;
    }
    .menuBtn_3 li:nth-child(3) {
        animation: menuBtn_3Li 2s linear 1s infinite;
        -webkit-animation: menuBtn_3Li 2s linear 1s infinite;
    }
    
    @keyframes menuBtn_3Li {
        0% {
            transform: translateX(26px) scale(1);
            box-shadow: 0 0 0 #333333;  
            opacity: 0;
        }
        50% {
            transform: translateX(26px) scale(1.3);
            box-shadow: 0 0 3px #333333;  
            opacity: 1;
        }
        100% {
            transform:translateX(26px) scale(1.6);
            box-shadow: 0 0 5px #333333;  
            opacity: 0;
        }
    }
    @-webkit-keyframes menuBtn_3Li {
        0% {
            -webkit-transform: translateX(26px) scale(1);
            -webkit-box-shadow: 0 0 0 #333333;  
            opacity: 0;
        }
        50% {
            -webkit-transform: translateX(26px) scale(1.3);
            -webkit-box-shadow: 0 0 3px #333333;  
            opacity: 1;
        }
        100% {
            -webkit-transform:translateX(26px) scale(1.6);
            -webkit-box-shadow: 0 0 5px #333333;  
            opacity: 0;
        }
    }
    
    @keyframes topToBottom{
        0% {
            transform: translateY(0) scale(1);
        }
        100%{
            transform: translateY(80%) scale(1.2);
        }
    }
    @-webkit-keyframes topToBottom{
        0% {
            -webkit-transform: translateY(0) scale(1);
        }
        100%{
            -webkit-transform: translateY(80%) scale(1.2);
        }
    }
    
    #item4 .menu {
        color: #333333;
        font-size: 16px;
        line-height: 30px;
        position: absolute;
        top: 90px;
        z-index: 29;
        display: none;
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-tag">html</span> 
    
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"item4"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"title"</span>&gt;<span class="hljs-attribute">border-radius</span>&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"menuBtn"</span>&gt;
            &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"menuBtn_2"</span>&gt;*&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">ul</span> class=<span class="hljs-string">"menuBtn_3"</span>&gt;
                &lt;li&gt;&lt;/li&gt;
                &lt;li&gt;&lt;/li&gt;
                &lt;li&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">ul</span> class=<span class="hljs-string">"menu"</span>&gt;
            &lt;li&gt;<span class="hljs-number">1</span>&lt;/li&gt;
            &lt;li&gt;<span class="hljs-number">2</span>&lt;/li&gt;
            &lt;li&gt;<span class="hljs-number">3</span>&lt;/li&gt;
            &lt;li&gt;<span class="hljs-number">4</span>&lt;/li&gt;
            &lt;li&gt;<span class="hljs-number">5</span>&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    
    css
     <span class="hljs-selector-id">#item4</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">64px</span>;
        <span class="hljs-attribute">margin</span>:  <span class="hljs-number">0</span> auto <span class="hljs-number">100px</span>;
    }

    <span class="hljs-selector-id">#item4</span> <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">transform</span>: translate(-<span class="hljs-number">50%</span>);
    }
    
    <span class="hljs-selector-id">#item4</span>  <span class="hljs-selector-class">.menuBtn</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    
    <span class="hljs-selector-id">#item4</span>  <span class="hljs-selector-class">.menuBtn</span> <span class="hljs-selector-class">.menuBtn_2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform</span>: translate3d(-<span class="hljs-number">50%</span>,-<span class="hljs-number">50%</span>,<span class="hljs-number">0</span>);
    }
    
    <span class="hljs-selector-id">#item4</span>  <span class="hljs-selector-class">.menuBtn</span> <span class="hljs-selector-class">.menuBtn_2</span>::before {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">8px</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">2px</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">8px</span> <span class="hljs-number">8px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#item4</span>  <span class="hljs-selector-class">.menuBtn</span> <span class="hljs-selector-class">.menuBtn_2</span>::after {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">2px</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">8px</span>;
    }
    
    <span class="hljs-selector-class">.menuBtn_3</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">10px</span>; 
        <span class="hljs-attribute">animation</span>: topToBottom <span class="hljs-number">2s</span> linear infinite;
    }
    
    <span class="hljs-selector-class">.menuBtn_3</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">26px</span>);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-class">.menuBtn_3</span> <span class="hljs-selector-tag">li</span>:nth-child(<span class="hljs-number">1</span>) {
        <span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear infinite;
        -webkit-<span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear infinite;
    }
    <span class="hljs-selector-class">.menuBtn_3</span> <span class="hljs-selector-tag">li</span>:nth-child(<span class="hljs-number">2</span>) {
        <span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear <span class="hljs-number">0.5s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear <span class="hljs-number">0.5s</span> infinite;
    }
    <span class="hljs-selector-class">.menuBtn_3</span> <span class="hljs-selector-tag">li</span>:nth-child(<span class="hljs-number">3</span>) {
        <span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear <span class="hljs-number">1s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: menuBtn_3Li <span class="hljs-number">2s</span> linear <span class="hljs-number">1s</span> infinite;
    }
    
    @keyframes menuBtn_3Li {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1</span>);
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-number">50%</span> {
            <span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1.3</span>);
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3px</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>:translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1.6</span>);
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }
    }
    @-webkit-keyframes menuBtn_3Li {
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1</span>);
            -webkit-<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-number">50%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1.3</span>);
            -webkit-<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">3px</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        }
        <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>:translateX(<span class="hljs-number">26px</span>) scale(<span class="hljs-number">1.6</span>);
            -webkit-<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">#333333</span>;  
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }
    }
    
    @keyframes topToBottom{
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: translateY(<span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
        }
        <span class="hljs-number">100%</span>{
            <span class="hljs-attribute">transform</span>: translateY(<span class="hljs-number">80%</span>) scale(<span class="hljs-number">1.2</span>);
        }
    }
    @-webkit-keyframes topToBottom{
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: translateY(<span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
        }
        <span class="hljs-number">100%</span>{
            -webkit-<span class="hljs-attribute">transform</span>: translateY(<span class="hljs-number">80%</span>) scale(<span class="hljs-number">1.2</span>);
        }
    }
    
    <span class="hljs-selector-id">#item4</span> <span class="hljs-selector-class">.menu</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333333</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">90px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">29</span>;
        <span class="hljs-attribute">display</span>: none;
    }
    </code></pre>
<h3 id="articleHeader6">5、flower</h3>
<p><span class="img-wrap"><img data-src="/img/bV3BnB?w=466&amp;h=445" src="https://static.alili.tech/img/bV3BnB?w=466&amp;h=445" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>利用 css radial-gradient 等;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html 

<div id=&quot;item5&quot;>
    <div class=&quot;title&quot;>radial-gradient</div>
    <ul>
        <li class=&quot;leaf1&quot;></li>
        <li class=&quot;leaf2&quot;></li>
        <li class=&quot;leaf3&quot;></li>
        <li class=&quot;leaf4&quot;></li>
        <li class=&quot;leaf5&quot;></li>
        <li class=&quot;leaf6&quot;></li>
        <li class=&quot;leaf7&quot;></li>
        <li class=&quot;leaf8&quot;></li>
        <li class=&quot;leaf9&quot;></li>
    </ul>
</div>


css 
#item5 {
        width: 400px;
        height: 600px;
        margin: 0 auto 100px;
        position: relative;
    }

    #item5 .leaf1,
    #item5 .leaf2,
    #item5 .leaf3,
    #item5 .leaf4,
    #item5 .leaf5,
    #item5 .leaf6,
    #item5 .leaf7,
    #item5 .leaf8,
    #item5 .leaf9 {
        width: 50px;
        height: 100px;
        border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
        position: absolute;
        top: 50px;
        left: 170px;
        transform-origin: 50% 145%;
        -webkit-transform-origin: 50% 145%;
    }

    #item5 .title {
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 40px;
    }

    #item5 .leaf1 {
        background-image:radial-gradient( rgba(66, 230, 139, 1),rgba(124, 187, 152, 0.6));
        border: 1px solid rgba(116, 233, 167, 0.8);
        animation: leafAni 2.25s linear 2s infinite;
        -webkit-animation: leafAni 2.25s linear 2s infinite;
    }
    #item5 .leaf2 {
        background-image:radial-gradient( rgba(63, 187, 179, 1),rgba(83, 156, 151, 0.6));
        border: 1px solid rgba(90, 194, 187, 0.8);
        animation: leafAni 2.25s linear 1.75s infinite;
        -webkit-animation: leafAni 2.25s linear 1.75s infinite;
    }

    #item5 .leaf3 {
        background-image:radial-gradient( rgba(60, 213, 49,1),rgba(60, 213, 49, 0.6));
        border: 1px solid rgba(60, 213, 49,0.8);
        animation: leafAni 2.25s linear 1.5s infinite;
        -webkit-animation: leafAni 2.25s linear 1.5s infinite;
    }
    #item5 .leaf4 {
        background-image:radial-gradient( rgba(191,181,29,1),rgba(191,181,29, 0.6));
        border: 1px solid rgba(191,181,29,0.8);
        animation: leafAni 2.25s linear 1.25s infinite;
        -webkit-animation: leafAni 2.25s linear 1.25s infinite;
    }
    #item5 .leaf5 {
        background-image:radial-gradient( rgba(196,125,20,1),rgba(196,125,20, 0.6));
        border: 1px solid rgba(196,125,20,0.8);
        animation: leafAni 2.25s linear 1s infinite;
        -webkit-animation: leafAni 2.25s linear 1s infinite;
    }
    #item5 .leaf6 {
        background-image:radial-gradient( rgba(231,98,40,1),rgba(231,98,40, 0.8));
        border: 1px solid rgba(231,98,40,0.8);
        animation: leafAni 2.25s linear 0.75s infinite;
        -webkit-animation: leafAni 2.25s linear 0.75s infinite;
    }
    #item5 .leaf7 {
        background-image:radial-gradient( rgba(249,11,55,1),rgba(249,11,55, 0.8));
        border: 1px solid rgba(249,11,55,0.8);
        animation: leafAni 2.25s linear 0.5s infinite;
        -webkit-animation: leafAni 2.25s linear 0.5s infinite;
    }

    #item5 .leaf8 {
        background-image:radial-gradient( rgba(241,0,145,1),rgba(241,0,145,0.6));
        border: 1px solid rgba(241,0,145,0.8);
        animation: leafAni 2.25s linear 0.25s infinite;
        -webkit-animation: leafAni 2.25s linear 0.25s infinite;
    }

    #item5 .leaf9 {
        background-image:radial-gradient( rgba(151,11,84,1),rgba(151,11,84,0.6));
        border: 1px solid rgba(151,11,84,0.8);
        animation: leafAni 2.25s linear infinite;
        -webkit-animation: leafAni 2.25s linear infinite;
    }

    @keyframes leafAni {
        0% {
            transform: rotate(0) scale(1);
        }
        25% {
            transform:rotate(-90deg) scale(1.1);
        }
        50% {
            transform:  rotate(-180deg) scale(1.2);
        }
        75% {
            transform: rotate(-270deg) scale(1.1);
        }
        100% {
            transform: rotate(-360deg) scale(1);
        }
    }
    @-webkit-keyframes leafAni {
        0% {
            -webkit-transform: rotate(0) scale(1);
        }
        25% {
            -webkit-transform:rotate(-90deg) scale(1.1);
        }
        50% {
            -webkit-transform:  rotate(-180deg) scale(1.2);
        }
        75% {
            -webkit-transform: rotate(-270deg) scale(1.1);
        }
        100% {
            -webkit-transform: rotate(-360deg) scale(1);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">html</span> 

&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"item5"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"title"</span>&gt;radial-gradient&lt;/div&gt;
    &lt;ul&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf1"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf2"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf3"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf4"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf5"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf6"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf7"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf8"</span>&gt;&lt;/li&gt;
        &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"leaf9"</span>&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;


css 
<span class="hljs-selector-id">#item5</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf1</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf2</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf3</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf4</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf5</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf6</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf7</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf8</span>,
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf9</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">45%</span> <span class="hljs-number">45%</span> / <span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">40%</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">170px</span>;
        <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">145%</span>;
        -webkit-<span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">145%</span>;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#888888</span>;
        <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf1</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">66</span>, <span class="hljs-number">230</span>, <span class="hljs-number">139</span>, <span class="hljs-number">1</span>),rgba(<span class="hljs-number">124</span>, <span class="hljs-number">187</span>, <span class="hljs-number">152</span>, <span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">116</span>, <span class="hljs-number">233</span>, <span class="hljs-number">167</span>, <span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">2s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">2s</span> infinite;
    }
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf2</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">63</span>, <span class="hljs-number">187</span>, <span class="hljs-number">179</span>, <span class="hljs-number">1</span>),rgba(<span class="hljs-number">83</span>, <span class="hljs-number">156</span>, <span class="hljs-number">151</span>, <span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">90</span>, <span class="hljs-number">194</span>, <span class="hljs-number">187</span>, <span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.75s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.75s</span> infinite;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf3</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">60</span>, <span class="hljs-number">213</span>, <span class="hljs-number">49</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">60</span>, <span class="hljs-number">213</span>, <span class="hljs-number">49</span>, <span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">60</span>, <span class="hljs-number">213</span>, <span class="hljs-number">49</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.5s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.5s</span> infinite;
    }
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf4</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">191</span>,<span class="hljs-number">181</span>,<span class="hljs-number">29</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">191</span>,<span class="hljs-number">181</span>,<span class="hljs-number">29</span>, <span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">191</span>,<span class="hljs-number">181</span>,<span class="hljs-number">29</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.25s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1.25s</span> infinite;
    }
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf5</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">196</span>,<span class="hljs-number">125</span>,<span class="hljs-number">20</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">196</span>,<span class="hljs-number">125</span>,<span class="hljs-number">20</span>, <span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">196</span>,<span class="hljs-number">125</span>,<span class="hljs-number">20</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">1s</span> infinite;
    }
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf6</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">231</span>,<span class="hljs-number">98</span>,<span class="hljs-number">40</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">231</span>,<span class="hljs-number">98</span>,<span class="hljs-number">40</span>, <span class="hljs-number">0.8</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">231</span>,<span class="hljs-number">98</span>,<span class="hljs-number">40</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.75s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.75s</span> infinite;
    }
    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf7</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">249</span>,<span class="hljs-number">11</span>,<span class="hljs-number">55</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">249</span>,<span class="hljs-number">11</span>,<span class="hljs-number">55</span>, <span class="hljs-number">0.8</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">249</span>,<span class="hljs-number">11</span>,<span class="hljs-number">55</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.5s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.5s</span> infinite;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf8</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">241</span>,<span class="hljs-number">0</span>,<span class="hljs-number">145</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">241</span>,<span class="hljs-number">0</span>,<span class="hljs-number">145</span>,<span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">241</span>,<span class="hljs-number">0</span>,<span class="hljs-number">145</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.25s</span> infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear <span class="hljs-number">0.25s</span> infinite;
    }

    <span class="hljs-selector-id">#item5</span> <span class="hljs-selector-class">.leaf9</span> {
        <span class="hljs-attribute">background-image</span>:radial-gradient( rgba(<span class="hljs-number">151</span>,<span class="hljs-number">11</span>,<span class="hljs-number">84</span>,<span class="hljs-number">1</span>),rgba(<span class="hljs-number">151</span>,<span class="hljs-number">11</span>,<span class="hljs-number">84</span>,<span class="hljs-number">0.6</span>));
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">151</span>,<span class="hljs-number">11</span>,<span class="hljs-number">84</span>,<span class="hljs-number">0.8</span>);
        <span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear infinite;
        -webkit-<span class="hljs-attribute">animation</span>: leafAni <span class="hljs-number">2.25s</span> linear infinite;
    }

    @keyframes leafAni {
        <span class="hljs-number">0%</span> {
            <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
        }
        <span class="hljs-number">25%</span> {
            <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">90deg</span>) scale(<span class="hljs-number">1.1</span>);
        }
        <span class="hljs-number">50%</span> {
            <span class="hljs-attribute">transform</span>:  rotate(-<span class="hljs-number">180deg</span>) scale(<span class="hljs-number">1.2</span>);
        }
        <span class="hljs-number">75%</span> {
            <span class="hljs-attribute">transform</span>: rotate(-<span class="hljs-number">270deg</span>) scale(<span class="hljs-number">1.1</span>);
        }
        <span class="hljs-number">100%</span> {
            <span class="hljs-attribute">transform</span>: rotate(-<span class="hljs-number">360deg</span>) scale(<span class="hljs-number">1</span>);
        }
    }
    @-webkit-keyframes leafAni {
        <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
        }
        <span class="hljs-number">25%</span> {
            -webkit-<span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">90deg</span>) scale(<span class="hljs-number">1.1</span>);
        }
        <span class="hljs-number">50%</span> {
            -webkit-<span class="hljs-attribute">transform</span>:  rotate(-<span class="hljs-number">180deg</span>) scale(<span class="hljs-number">1.2</span>);
        }
        <span class="hljs-number">75%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotate(-<span class="hljs-number">270deg</span>) scale(<span class="hljs-number">1.1</span>);
        }
        <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotate(-<span class="hljs-number">360deg</span>) scale(<span class="hljs-number">1</span>);
        }
    }</code></pre>
<h3 id="articleHeader7">6、3D 照片盒子</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Bpg?w=583&amp;h=452" src="https://static.alili.tech/img/bV3Bpg?w=583&amp;h=452" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>利用CSS  preserve-3d、rotate等；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html 

<div id=&quot;item6&quot;>
        <div class=&quot;title&quot;>preserve-3d</div>
        <div class=&quot;d3box&quot;>
            <div class=&quot;d3Img1&quot;><img src=&quot;http://wwlin.cn/images/boxImg1.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img2&quot;><img src=&quot;http://wwlin.cn/images/boxImg2.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img3&quot;><img src=&quot;http://wwlin.cn/images/boxImg3.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img4&quot;><img src=&quot;http://wwlin.cn/images/boxImg4.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img5&quot;><img src=&quot;http://wwlin.cn/images/boxImg5.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img6&quot;><img src=&quot;http://wwlin.cn/images/boxImg6.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img11&quot;><img src=&quot;http://wwlin.cn/images/boxImg7.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img12&quot;><img src=&quot;http://wwlin.cn/images/boxImg8.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img13&quot;><img src=&quot;http://wwlin.cn/images/boxImg9.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img14&quot;><img src=&quot;http://wwlin.cn/images/boxImg10.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img15&quot;><img src=&quot;http://wwlin.cn/images/boxImg1.png&quot; alt=&quot;&quot;></div>
            <div class=&quot;d3Img16&quot;><img src=&quot;http://wwlin.cn/images/boxImg2.png&quot; alt=&quot;&quot;></div>
        </div>
    </div>
    
    
    CSS 
    
    #item6 {
        margin: 100px auto;
    }
    #item6 .title {
        color: #888888;
        letter-spacing: 2px;
        text-align: center;
        line-height: 40px;
    }

    #item6 .d3box{
        width: 600px;
        height: 600px;
        margin: 0 auto;
        position: relative;
        transform-style: preserve-3d;
        animation: d3boxAni 20s linear infinite;
        -webkit-animation: d3boxAni 20s linear infinite;
    }

    @keyframes  d3boxAni{
        0% {
            transform: rotateX(0deg) rotateY(0deg);
        }
        100% {
            transform: rotateX(360deg) rotateY(360deg);
        }
    }
    @-webkit-keyframes  d3boxAni{
        0% {
            -webkit-transform: rotateX(0deg) rotateY(0deg);
        }
        100% {
            -webkit-transform: rotateX(360deg) rotateY(360deg);
        }
    }

    #item6 .d3box .d3Img1,
    #item6 .d3box .d3Img2,
    #item6 .d3box .d3Img3,
    #item6 .d3box .d3Img4,
    #item6 .d3box .d3Img5,
    #item6 .d3box .d3Img6{
        position: absolute;
        width: 200px;
        height: 200px;
        transition: all .4s;
        opacity: 0.7;
    }
    #item6 .d3box .d3Img11,
    #item6 .d3box .d3Img12,
    #item6 .d3box .d3Img13,
    #item6 .d3box .d3Img14,
    #item6 .d3box .d3Img15,
    #item6 .d3box .d3Img16{
        display: bloack;
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50px;
        left: 50px;
    }
    #item6 .d3box img {
        width: 100%;
        height: 100%;
    }

    #item6 .d3box .d3Img1 {
        transform: rotateY(0deg) translateZ(100px);
    }

    #item6 .d3box .d3Img2 {
        transform: translateZ(-100px) rotateY(180deg);
    }
    #item6 .d3box .d3Img3 {
        transform: rotateY(90deg) translateZ(100px);
    }
    #item6 .d3box .d3Img4 {
        transform: rotateY(-90deg) translateZ(100px);
    }
    #item6 .d3box .d3Img5 {
        transform: rotateX(90deg) translateZ(100px);
    }
    #item6 .d3box .d3Img6 {
        transform: rotateX(-90deg) translateZ(100px);
    }

    #item6 .d3box:hover .d3Img1 {
        transform: rotateY(0deg) translateZ(200px);
    }
    #item6 .d3box:hover .d3Img2 {
        transform: translateZ(-200px) rotateY(180deg);
    }
    #item6 .d3box:hover .d3Img3 {
        transform: rotateY(90deg) translateZ(200px);
    }
    #item6 .d3box:hover .d3Img4 {
        transform: rotateY(-90deg) translateZ(200px);
    }
    #item6 .d3box:hover .d3Img5 {
        transform: rotateX(90deg) translateZ(200px);
    }
    #item6 .d3box:hover .d3Img6 {
        transform: rotateX(-90deg) translateZ(200px);
    }


    #item6 .d3box .d3Img11 {
        transform: rotateY(0deg) translateZ(50px);
    }
    #item6 .d3box .d3Img12 {
        transform: translateZ(-50px) rotateY(180deg);
    }
    #item6 .d3box .d3Img13 {
        transform: rotateY(90deg) translateZ(50px);
    }
    #item6 .d3box .d3Img14 {
        transform: rotateY(-90deg) translateZ(50px);
    }
    #item6 .d3box .d3Img15 {
        transform: rotateX(90deg) translateZ(50px);
    }
    #item6 .d3box .d3Img16 {
        transform: rotateX(-90deg) translateZ(50px);
    }
    
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>html 

&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"item6"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"title"</span>&gt;preserve<span class="hljs-number">-3</span>d&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3box"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img1"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg1.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img2"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg2.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img3"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg3.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img4"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg4.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img5"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg5.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img6"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg6.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img11"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg7.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img12"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg8.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img13"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg9.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img14"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg10.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img15"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg1.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"d3Img16"</span>&gt;&lt;img src=<span class="hljs-string">"http://wwlin.cn/images/boxImg2.png"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    
    
    CSS 
    
    <span class="hljs-comment">#item6 {</span>
        margin: <span class="hljs-number">100</span>px auto;
    }
    <span class="hljs-comment">#item6 .title {</span>
        color: <span class="hljs-comment">#888888;</span>
        letter-spacing: <span class="hljs-number">2</span>px;
        <span class="hljs-built_in">text</span>-align: center;
        line-height: <span class="hljs-number">40</span>px;
    }

    <span class="hljs-comment">#item6 .d3box{</span>
        width: <span class="hljs-number">600</span>px;
        height: <span class="hljs-number">600</span>px;
        margin: <span class="hljs-number">0</span> auto;
        position: relative;
        transform-style: preserve<span class="hljs-number">-3</span>d;
        animation: d3boxAni <span class="hljs-number">20</span>s linear infinite;
        -webkit-animation: d3boxAni <span class="hljs-number">20</span>s linear infinite;
    }

    @keyframes  d3boxAni{
        <span class="hljs-number">0</span>% {
            transform: rotateX(<span class="hljs-number">0</span>deg) rotateY(<span class="hljs-number">0</span>deg);
        }
        <span class="hljs-number">100</span>% {
            transform: rotateX(<span class="hljs-number">360</span>deg) rotateY(<span class="hljs-number">360</span>deg);
        }
    }
    @-webkit-keyframes  d3boxAni{
        <span class="hljs-number">0</span>% {
            -webkit-transform: rotateX(<span class="hljs-number">0</span>deg) rotateY(<span class="hljs-number">0</span>deg);
        }
        <span class="hljs-number">100</span>% {
            -webkit-transform: rotateX(<span class="hljs-number">360</span>deg) rotateY(<span class="hljs-number">360</span>deg);
        }
    }

    <span class="hljs-comment">#item6 .d3box .d3Img1,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img2,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img3,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img4,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img5,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img6{</span>
        position: absolute;
        width: <span class="hljs-number">200</span>px;
        height: <span class="hljs-number">200</span>px;
        transition: all <span class="hljs-number">.4</span>s;
        opacity: <span class="hljs-number">0.7</span>;
    }
    <span class="hljs-comment">#item6 .d3box .d3Img11,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img12,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img13,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img14,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img15,</span>
    <span class="hljs-comment">#item6 .d3box .d3Img16{</span>
        display: bloack;
        width: <span class="hljs-number">100</span>px;
        height: <span class="hljs-number">100</span>px;
        position: absolute;
        top: <span class="hljs-number">50</span>px;
        left: <span class="hljs-number">50</span>px;
    }
    <span class="hljs-comment">#item6 .d3box img {</span>
        width: <span class="hljs-number">100</span>%;
        height: <span class="hljs-number">100</span>%;
    }

    <span class="hljs-comment">#item6 .d3box .d3Img1 {</span>
        transform: rotateY(<span class="hljs-number">0</span>deg) translateZ(<span class="hljs-number">100</span>px);
    }

    <span class="hljs-comment">#item6 .d3box .d3Img2 {</span>
        transform: translateZ(<span class="hljs-number">-100</span>px) rotateY(<span class="hljs-number">180</span>deg);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img3 {</span>
        transform: rotateY(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">100</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img4 {</span>
        transform: rotateY(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">100</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img5 {</span>
        transform: rotateX(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">100</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img6 {</span>
        transform: rotateX(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">100</span>px);
    }

    <span class="hljs-comment">#item6 .d3box:hover .d3Img1 {</span>
        transform: rotateY(<span class="hljs-number">0</span>deg) translateZ(<span class="hljs-number">200</span>px);
    }
    <span class="hljs-comment">#item6 .d3box:hover .d3Img2 {</span>
        transform: translateZ(<span class="hljs-number">-200</span>px) rotateY(<span class="hljs-number">180</span>deg);
    }
    <span class="hljs-comment">#item6 .d3box:hover .d3Img3 {</span>
        transform: rotateY(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">200</span>px);
    }
    <span class="hljs-comment">#item6 .d3box:hover .d3Img4 {</span>
        transform: rotateY(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">200</span>px);
    }
    <span class="hljs-comment">#item6 .d3box:hover .d3Img5 {</span>
        transform: rotateX(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">200</span>px);
    }
    <span class="hljs-comment">#item6 .d3box:hover .d3Img6 {</span>
        transform: rotateX(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">200</span>px);
    }


    <span class="hljs-comment">#item6 .d3box .d3Img11 {</span>
        transform: rotateY(<span class="hljs-number">0</span>deg) translateZ(<span class="hljs-number">50</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img12 {</span>
        transform: translateZ(<span class="hljs-number">-50</span>px) rotateY(<span class="hljs-number">180</span>deg);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img13 {</span>
        transform: rotateY(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">50</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img14 {</span>
        transform: rotateY(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">50</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img15 {</span>
        transform: rotateX(<span class="hljs-number">90</span>deg) translateZ(<span class="hljs-number">50</span>px);
    }
    <span class="hljs-comment">#item6 .d3box .d3Img16 {</span>
        transform: rotateX(<span class="hljs-number">-90</span>deg) translateZ(<span class="hljs-number">50</span>px);
    }
    
    
</code></pre>
<h3 id="articleHeader8">7、文字多样效果</h3>
<p><span class="img-wrap"><img data-src="/img/bV3BpQ?w=618&amp;h=310" src="https://static.alili.tech/img/bV3BpQ?w=618&amp;h=310" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>利用：CSS text-shadow</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;item7&quot;>
    <div class=&quot;title&quot;>text-shadow</div>
    <div class=&quot;content1&quot;>“离开就是离开，分手就是分手，</div>
    <div class=&quot;content2&quot;>错对没有意义，不再合适的两人，</div>
    <div class=&quot;content3&quot;>与其耗尽对方养分，不如坦然聚散，各自相安”</div>
</div>

CSS 
#item7 {
        width: 400px;
        color: #fff;
        letter-spacing: 2px;
        text-align: center;
        line-height: 60px;
        font-weight: 700px;
        margin:  100px auto 200px;
    }
    #item7 .title{
        color: #888888;
        font-size: 26px;
    }

    #item7 .content1 {
        background-color: rgba(0,0,0,0.3);
        text-shadow: 0 0 2px #333333;
    }
    #item7 .content2 {
        color: #fff;
        background-color: #ED1C24;
        font-size: 24px;
        text-shadow: 0 0 2px #fff , 0 0 4px #fff;
    }
    #item7 .content3 {
        background-color: #009A61;
        text-shadow:    0 1px rgba(255, 0, 255, 0.9),
                        0 2px rgba(255, 0, 255, 0.8),
                        0 3px rgba(255, 0, 255, 0.7),
                        0 4px rgba(255, 0, 255, 0.6),
                        0 5px rgba(255, 0, 255, 0.5),
                        0 5px 10px black;
    }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"item7"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"title"</span>&gt;<span class="hljs-built_in">text</span>-shadow&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"content1"</span>&gt;“离开就是离开，分手就是分手，&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"content2"</span>&gt;错对没有意义，不再合适的两人，&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"content3"</span>&gt;与其耗尽对方养分，不如坦然聚散，各自相安”&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

CSS 
<span class="hljs-comment">#item7 {</span>
        width: <span class="hljs-number">400</span>px;
        color: <span class="hljs-comment">#fff;</span>
        letter-spacing: <span class="hljs-number">2</span>px;
        <span class="hljs-built_in">text</span>-align: center;
        line-height: <span class="hljs-number">60</span>px;
        font-weight: <span class="hljs-number">700</span>px;
        margin:  <span class="hljs-number">100</span>px auto <span class="hljs-number">200</span>px;
    }
    <span class="hljs-comment">#item7 .title{</span>
        color: <span class="hljs-comment">#888888;</span>
        font-size: <span class="hljs-number">26</span>px;
    }

    <span class="hljs-comment">#item7 .content1 {</span>
        background-color: rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.3</span>);
        <span class="hljs-built_in">text</span>-shadow: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2</span>px <span class="hljs-comment">#333333;</span>
    }
    <span class="hljs-comment">#item7 .content2 {</span>
        color: <span class="hljs-comment">#fff;</span>
        background-color: <span class="hljs-comment">#ED1C24;</span>
        font-size: <span class="hljs-number">24</span>px;
        <span class="hljs-built_in">text</span>-shadow: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2</span>px <span class="hljs-comment">#fff , 0 0 4px #fff;</span>
    }
    <span class="hljs-comment">#item7 .content3 {</span>
        background-color: <span class="hljs-comment">#009A61;</span>
        <span class="hljs-built_in">text</span>-shadow:    <span class="hljs-number">0</span> <span class="hljs-number">1</span>px rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.9</span>),
                        <span class="hljs-number">0</span> <span class="hljs-number">2</span>px rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.8</span>),
                        <span class="hljs-number">0</span> <span class="hljs-number">3</span>px rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.7</span>),
                        <span class="hljs-number">0</span> <span class="hljs-number">4</span>px rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.6</span>),
                        <span class="hljs-number">0</span> <span class="hljs-number">5</span>px rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.5</span>),
                        <span class="hljs-number">0</span> <span class="hljs-number">5</span>px <span class="hljs-number">10</span>px black;
    }
    
</code></pre>
<p>总结来说：CSS3的新特性并不多， 缺乏的是创意创新灵感，将他们组合起来运用。年尾了，祝大家开开心心回家过大年、工作顺顺利利、合家美满。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css3动画整理

## 原文链接
[https://segmentfault.com/a/1190000013212917](https://segmentfault.com/a/1190000013212917)

