---
title: '前端每日实战：159# 视频演示如何用 CSS 和原生 JS 创作一个展示苹果设备的交互动画' 
date: 2019-02-15 2:30:44
hidden: true
slug: qav0d7qavut
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbirKY?w=400&amp;h=307" src="https://static.alili.tech/img/bVbirKY?w=400&amp;h=307" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/gBKWdW" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/gBKWdW</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/gBKWdW" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p>第 1 部分：<br><a href="https://scrimba.com/p/pEgDAM/cazRgcL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cazRgcL</a></p>
<p>第 2 部分：<br><a href="https://scrimba.com/p/pEgDAM/ceDK7cB" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/ceDK7cB</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，包含 5 个子元素，分别代表 iphone, mini, ipad, macbook, imac 这 5 种设备：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;device iphone&quot;></div>
    <div class=&quot;device mini&quot;></div>
    <div class=&quot;device ipad&quot;></div>
    <div class=&quot;device macbook&quot;></div>
    <div class=&quot;device imac&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device iphone"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device mini"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device ipad"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device macbook"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device imac"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #aaa;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#aaa</span>;
}</code></pre>
<p>设置容器中子元素的布局方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>设置设备的共有属性，线性渐变图案将作为屏幕的背景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".device {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    background: linear-gradient(120deg, #ddd 30%, #ccc 30%);
}

.device::before,
.device::after {
    content: '';
    position: absolute;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.device</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(120deg, #ddd 30%, #ccc 30%);
}

<span class="hljs-selector-class">.device</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.device</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
}</code></pre>
<p>iphone, mini, ipad 的造型相似，都有顶部摄像头、传感器开口和底部按钮，所以这些共有属性可以一起设置，用 <code>::before</code> 伪元素画出顶部细节，<code>::after</code> 伪元素画出底部按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".iphone::before,
.mini::before,
.ipad::before {
    width: 2px;
    height: 2px;
    border-style: solid;
    border-color: #a5adbe;
    border-width: 0 12px 0 2px;
}

.iphone::after,
.mini::after,
.ipad::after {
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.iphone</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.mini</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.ipad</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#a5adbe</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">12px</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span>;
}

<span class="hljs-selector-class">.iphone</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.mini</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.ipad</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>接下来逐个画出设备。先画出 iphone 的轮廓：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".iphone {
    width: 59px;
    height: 124px;
    border: #484f5e solid;
    border-width: 18px 4px;
    border-radius: 6px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.iphone</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">59px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">124px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">#484f5e</span> solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">18px</span> <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
}</code></pre>
<p>定位 iphone 的顶部和底部细节：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".iphone::before {
    top: -10px;
}

.iphone::after {
    bottom: -13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.iphone</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.iphone</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">13px</span>;
}</code></pre>
<p>类似地，画出 mini：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mini {
    width: 93px;
    height: 138px;
    border: #484f5e solid;
    border-width: 14px 5px;
    border-radius: 10px;
}

.mini::before {
    top: -8px;
}

.mini::after {
    bottom: -11px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.mini</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">93px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">138px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">#484f5e</span> solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">14px</span> <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.mini</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">8px</span>;
}

<span class="hljs-selector-class">.mini</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">11px</span>;
}</code></pre>
<p>再画出 ipad：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ipad {
    width: 134px;
    height: 176px;
    border: #484f5e solid;
    border-width: 18px 13px;
    border-radius: 12px;
}

.ipad::before {
    top: -10px;
}

.ipad::after {
    bottom: -13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ipad</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">134px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">176px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">#484f5e</span> solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">18px</span> <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">12px</span>;
}

<span class="hljs-selector-class">.ipad</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.ipad</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">13px</span>;
}</code></pre>
<p>接下来画 macbook，先画屏幕：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".macbook {
    width: 234px;
    height: 155px;
    border: 8px solid #484f5e;
    border-radius: 7px 7px 0 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.macbook</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">234px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">155px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">8px</span> solid <span class="hljs-number">#484f5e</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7px</span> <span class="hljs-number">7px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>用 <code>::before</code> 伪元素画出摄像头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".macbook::before {
    width: 294px;
    height: 14px;
    background-color: #e8ebf0;
    top: calc(100% + 8px);
    border-radius: 0 0 14px 14px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.macbook</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">294px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e8ebf0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(100% + 8px);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">14px</span> <span class="hljs-number">14px</span>;
}</code></pre>
<p>用 <code>::after</code> 伪元素画出主机：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".macbook::after {
    width: 3px;
    height: 3px;
    background-color: #a5adbe;
    top: -6px;
    border-radius: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.macbook</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#a5adbe</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">6px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>接下来画 imac，先画屏幕，屏幕的左、上、右的黑色边框没有用 <code>border</code> 属性画，是因为 <code>border</code> 会在端点处遗留一个斜角，所以改用 <code>box-shadow</code> 实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".imac {
    width: 360px;
    height: 215px;
    border-radius: 10px;
    box-shadow: 
        inset 0 14px #484f5e,
        inset 14px 0 #484f5e,
        inset -14px 0 #484f5e;
    border-bottom: 33px solid #e8ebf1;
    transform: translateY(14px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.imac</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">215px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        inset <span class="hljs-number">0</span> <span class="hljs-number">14px</span> <span class="hljs-number">#484f5e</span>,
        inset <span class="hljs-number">14px</span> <span class="hljs-number">0</span> <span class="hljs-number">#484f5e</span>,
        inset -<span class="hljs-number">14px</span> <span class="hljs-number">0</span> <span class="hljs-number">#484f5e</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">33px</span> solid <span class="hljs-number">#e8ebf1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(14px);
}</code></pre>
<p>用 <code>::before</code> 伪元素画出梯形的底座：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".imac::before {
    width: 90px;
    height: 0;
    top: calc(100% + 33px);
    border: solid transparent;
    border-bottom-color: #e2e4e8;
    border-width: 0 10px 47px 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.imac</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(100% + 33px);
    <span class="hljs-attribute">border</span>: solid transparent;
    <span class="hljs-attribute">border-bottom-color</span>: <span class="hljs-number">#e2e4e8</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">47px</span> <span class="hljs-number">10px</span>;
}</code></pre>
<p>用 <code>::after</code> 伪元素画出顶部的摄像头和屏幕底部的按钮，注意按钮是用 <code>box-shadow</code> 实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".imac::after {
    width: 4px;
    height: 4px;
    background-color: #a5adbe;
    top: 5px;
    border-radius: 50%;
    box-shadow: 0 191px 0 4px #464e5d;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.imac</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#a5adbe</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">191px</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">#464e5d</span>;
}</code></pre>
<p>至此，设备全部绘制完成。<br>删除除 iphone 之外的其他设备的 dom 元素，只保留 1 个 dom 元素，后面的动画效果都在这个 dom 元素上变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
        <div class=&quot;device iphone&quot;></div>
        <!-- <div class=&quot;device mini&quot;></div>
        <div class=&quot;device ipad&quot;></div>
        <div class=&quot;device macbook&quot;></div>
        <div class=&quot;device imac&quot;></div> -->
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device iphone"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;div class="device mini"&gt;&lt;/div&gt;
        &lt;div class="device ipad"&gt;&lt;/div&gt;
        &lt;div class="device macbook"&gt;&lt;/div&gt;
        &lt;div class="device imac"&gt;&lt;/div&gt; --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>设置容器尺寸，子元素垂直居中，设备的高度占容器高度的 75%：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 360px;
    height: 350px;
    justify-content: center;
}

.device {
    transform: translateY(-25%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.device</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-25%);
}</code></pre>
<p>在 dom 中增加 2 个按钮元素，分别用 <code>.left</code> 和 <code>.right</code> 表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;device iphone&quot;></div>
    <div class=&quot;buttons&quot;>
        <span class=&quot;left&quot;></span>
        <span class=&quot;right&quot;></span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"device iphone"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>定位按钮的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".buttons {
    position: absolute;
    width: inherit;
    font-size: 30px;
    height: 2em;
    bottom: 0;
    display: flex;
    justify-content: space-around;
}

.buttons > * {
    position: relative;
    width: 4em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.buttons</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-around;
}

<span class="hljs-selector-class">.buttons</span> &gt; * {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
}</code></pre>
<p>按钮为向左和向右的箭头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".buttons > *::before {
    position: absolute;
}

.buttons .left::before {
    content: '←';
    right: 0;
}

.buttons .right::before {
    content: '→';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.buttons</span> &gt; *<span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-class">.left</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'←'</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-class">.right</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'→'</span>;
}</code></pre>
<p>设置按钮样式为圆形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".buttons > *t::before {
    position: absolute;
    width: 2em;
    height: 2em;
    background-color: #484f5e;
    color: silver;
    text-align: center;
    line-height: 2em;
    border-radius: 1em;
    cursor: pointer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.buttons</span> &gt; *<span class="hljs-selector-tag">t</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#484f5e</span>;
    <span class="hljs-attribute">color</span>: silver;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}</code></pre>
<p>增加鼠标悬停效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".buttons > *::before {
    transition: 0.2s;
}

.buttons .left:hover::before {
    width: 4em;
    content: '⟵';
}

.buttons .right:hover::before {
    width: 4em;
    content: '⟶';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.buttons</span> &gt; *<span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.2s</span>;
}

<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-class">.left</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'⟵'</span>;
}

<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-class">.right</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'⟶'</span>;
}</code></pre>
<p>增加按钮点击效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".buttons > *:active {
    transform: scale(0.9);
    filter: brightness(0.8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.buttons</span> &gt; *<span class="hljs-selector-pseudo">:active</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.9);
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">brightness</span>(0.8);
}</code></pre>
<p>至此，按钮制作完毕，接下来创建交互脚本。</p>
<p>定义一个获取元素的函数 <code>$</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $ = (className) => document.getElementsByClassName(className)[0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> $ = <span class="hljs-function">(<span class="hljs-params">className</span>) =&gt;</span> <span class="hljs-built_in">document</span>.getElementsByClassName(className)[<span class="hljs-number">0</span>]</code></pre>
<p>定义一个存放设备名称的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let devices = ['iphone', 'mini', 'ipad', 'macbook', 'imac']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> devices = [<span class="hljs-string">'iphone'</span>, <span class="hljs-string">'mini'</span>, <span class="hljs-string">'ipad'</span>, <span class="hljs-string">'macbook'</span>, <span class="hljs-string">'imac'</span>]</code></pre>
<p>定义点击行为对数据的加工方法，当点击左侧按钮时，把数组最左边的 1 个元素移到最右边，相反地，当点击右侧按钮时，把数组最右边的 1 个元素移到最左边，这样就可以从 2 个方向循环遍历数组了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let loop = {
    'left': () => devices.unshift(devices.pop()),
    'right': () => devices.push(devices.shift())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> loop = {
    <span class="hljs-string">'left'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> devices.unshift(devices.pop()),
    <span class="hljs-string">'right'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> devices.push(devices.shift())
}</code></pre>
<p>定义点击事件，根据数组的变化切换设备：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from($('buttons').children).forEach(element =>
    element.addEventListener('click', function(e) {
        loop[e.target.className]()
        $('device').className = 'device ' + devices[0]
    })
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Array</span>.from($(<span class="hljs-string">'buttons'</span>).children).forEach(<span class="hljs-function"><span class="hljs-params">element</span> =&gt;</span>
    element.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        loop[e.target.className]()
        $(<span class="hljs-string">'device'</span>).className = <span class="hljs-string">'device '</span> + devices[<span class="hljs-number">0</span>]
    })
)</code></pre>
<p>最后，设置设备切换的缓动效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".device,
.device::before,
.device::after {
    transition: 0.4s cubic-bezier(0.5, 1.7, 0.5, 1.2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.device</span>,
<span class="hljs-selector-class">.device</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.device</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.4s</span> <span class="hljs-built_in">cubic-bezier</span>(0.5, 1.7, 0.5, 1.2);
}</code></pre>
<p>大功告成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：159# 视频演示如何用 CSS 和原生 JS 创作一个展示苹果设备的交互动画

## 原文链接
[https://segmentfault.com/a/1190000016750591](https://segmentfault.com/a/1190000016750591)

