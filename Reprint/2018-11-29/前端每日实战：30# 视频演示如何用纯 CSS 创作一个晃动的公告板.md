---
title: '前端每日实战：30# 视频演示如何用纯 CSS 创作一个晃动的公告板' 
date: 2018-11-29 9:34:56
hidden: true
slug: a2wdfxrh6we
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbys8?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbys8?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/wjZoGV" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/wjZoGV</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/wjZoGV" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cD8yKHb" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cD8yKHb</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，容器中包含公告牌、挂公告牌的细绳和固定绳子的 3 个图钉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;signboard&quot;>
    <div class=&quot;sign&quot;>THANKS</div>
    <div class=&quot;strings&quot;></div>
    <div class=&quot;pin top&quot;></div>
    <div class=&quot;pin left&quot;></div>
    <div class=&quot;pin right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"signboard"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sign"</span>&gt;</span>THANKS<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"strings"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pin top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pin left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pin right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center 60%, white, sandybrown);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center 60%, white, sandybrown);
}</code></pre>
<p>定义公告牌的整体尺寸：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".signboard {
    width: 400px;
    height: 300px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.signboard</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
}</code></pre>
<p>设置木板的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".signboard {
    position: relative;
}

.sign {
    width: 100%;
    height: 200px;
    background: burlywood;
    border-radius: 15px;
    position: absolute;
    bottom: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.signboard</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.sign</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: burlywood;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>设置有雕刻效果的文字样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sign {
    color: saddlebrown;
    font-family: sans-serif;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
    text-shadow: 0 2px 0 rgba(255, 255, 255, 0.3),
                0 -2px 0 rgba(0, 0, 0, 0.7);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sign</span> {
    <span class="hljs-attribute">color</span>: saddlebrown;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.3),
                <span class="hljs-number">0</span> -<span class="hljs-number">2px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.7);
}</code></pre>
<p>画出细绳：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".strings {
    width: 150px;
    height: 150px;
    border: 5px solid brown;
    position: absolute;
    border-right: none;
    border-bottom: none;
    transform: rotate(45deg);
    top: 38px;
    left: 122px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.strings</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid brown;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">border-right</span>: none;
    <span class="hljs-attribute">border-bottom</span>: none;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">38px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">122px</span>;
}</code></pre>
<p>画出细绳顶部的图钉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pin {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
}

.pin.top {
    background: gray;
    left: 187px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pin</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.pin</span><span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">background</span>: gray;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">187px</span>;
}</code></pre>
<p>画出木板上左右两侧的图钉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pin.left,
.pin.right {
    background: brown;
    top: 110px;
    box-shadow: 0 2px 0 rgba(255, 255, 255, 0.3);
}

.pin.left {
    left: 80px;
}

.pin.right {
    right: 80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pin</span><span class="hljs-selector-class">.left</span>,
<span class="hljs-selector-class">.pin</span><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">background</span>: brown;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">110px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.3);
}

<span class="hljs-selector-class">.pin</span><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">80px</span>;
}

<span class="hljs-selector-class">.pin</span><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">80px</span>;
}</code></pre>
<p>最后，让告示牌晃动起来：<br>（此处已按 小蕾蕾 的建议修改为以顶部图钉作为旋转轴，比最初的效果要好）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".signboard {
    animation: swing 1.5s ease-in-out infinite alternate;
    transform-origin: 200px 13px;
}

@keyframes swing {
    from {
        transform: rotate(10deg);
    }

    to {
        transform: rotate(-10deg);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.signboard</span> {
    <span class="hljs-attribute">animation</span>: swing <span class="hljs-number">1.5s</span> ease-in-out infinite alternate;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">200px</span> <span class="hljs-number">13px</span>;
}

@<span class="hljs-keyword">keyframes</span> swing {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(10deg);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-10deg);
    }
}</code></pre>
<p>大功告成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：30# 视频演示如何用纯 CSS 创作一个晃动的公告板

## 原文链接
[https://segmentfault.com/a/1190000014983030](https://segmentfault.com/a/1190000014983030)

