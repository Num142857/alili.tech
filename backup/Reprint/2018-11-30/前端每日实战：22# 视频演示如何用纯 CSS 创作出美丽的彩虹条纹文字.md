---
title: '前端每日实战：22# 视频演示如何用纯 CSS 创作出美丽的彩虹条纹文字' 
date: 2018-11-30 2:30:12
hidden: true
slug: ab5k7a08iov
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbyt5?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbyt5?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/ELpRxj" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/ELpRxj</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/ELpRxj" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/czrWDfZ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/czrWDfZ</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，容器中包含文本，并且包含4个 &lt;span&gt; 用于特效，&lt;span&gt; 的 data-text 属性值为与文本相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;rainbow&quot;>
    web
    <span data-text=&quot;web&quot;></span>
    <span data-text=&quot;web&quot;></span>
    <span data-text=&quot;web&quot;></span>
    <span data-text=&quot;web&quot;></span>
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rainbow"</span>&gt;</span>
    web
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-text</span>=<span class="hljs-string">"web"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-text</span>=<span class="hljs-string">"web"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-text</span>=<span class="hljs-string">"web"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-text</span>=<span class="hljs-string">"web"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: black;
}</code></pre>
<p>定义文本样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow {
    color: white;
    font-size: 300px;
    text-transform: uppercase;
    font-family: sans-serif;
    font-weight: bold;
    line-height: 1em;
    position: relative;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">position</span>: relative;
}</code></pre>
<p>用伪元素增加图层，形成彩虹效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow span::before,
.rainbow span::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}

.rainbow span:nth-child(1)::before {
    color: orchid;
    z-index: 1;
    height: calc(100% - 10% * 1);
}

.rainbow span:nth-child(1)::after {
    color: mediumpurple;
    z-index: 2;
    height: calc(100% - 10% * 2);
}

.rainbow span:nth-child(2)::before {
    color: deepskyblue;
    z-index: 3;
    height: calc(100% - 10% * 3);
}

.rainbow span:nth-child(2)::after {
    color: cyan;
    z-index: 4;
    height: calc(100% - 10% * 4);
}

.rainbow span:nth-child(3)::before {
    color: mediumspringgreen;
    z-index: 5;
    height: calc(100% - 10% * 5);
}

.rainbow span:nth-child(3)::after {
    color: yellow;
    z-index: 6;
    height: calc(100% - 10% * 6);
}

.rainbow span:nth-child(4)::before {
    color: gold;
    z-index: 7;
    height: calc(100% - 10% * 7);
}

.rainbow span:nth-child(4)::after {
    color: tomato;
    z-index: 8;
    height: calc(100% - 10% * 8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-text);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: orchid;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 1);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: mediumpurple;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 2);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: deepskyblue;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 3);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: cyan;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 4);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: mediumspringgreen;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 5);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: yellow;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">6</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 6);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: gold;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">7</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 7);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: tomato;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">8</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 10% * 8);
}</code></pre>
<p>增加动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow span::before,
.rainbow span::after {
    animation: animate 0.8s infinite alternate;
    filter: opacity(0);
}

@keyframes animate {
    from {
        filter: opacity(0);
    }

    to {
        filter: opacity(1);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">0.8s</span> infinite alternate;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
}

@<span class="hljs-keyword">keyframes</span> animate {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }
}</code></pre>
<p>为图层设置延时，增强动感：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow span:nth-child(1)::before {
    animation-delay: calc(0.8s - 0.1s * 1);
}

.rainbow span:nth-child(1)::after {
    animation-delay: calc(0.8s - 0.1s * 2);
}

.rainbow span:nth-child(2)::before {
    animation-delay: calc(0.8s - 0.1s * 3);
}

.rainbow span:nth-child(2)::after {
    animation-delay: calc(0.8s - 0.1s * 4);
}

.rainbow span:nth-child(3)::before {
    animation-delay: calc(0.8s - 0.1s * 5);
}

.rainbow span:nth-child(3)::after {
    animation-delay: calc(0.8s - 0.1s * 6);
}

.rainbow span:nth-child(4)::before {
    animation-delay: calc(0.8s - 0.1s * 7);
}

.rainbow span:nth-child(4)::after {
    animation-delay: calc(0.8s - 0.1s * 8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 1);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 2);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 3);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 4);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 5);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 6);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 7);
}

<span class="hljs-selector-class">.rainbow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.8s - 0.1s * 8);
}</code></pre>
<p>最后，把原始文本设置为透明色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow {
    color: transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> {
    <span class="hljs-attribute">color</span>: transparent;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>content <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/content</a>
</li>
<li>attr() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/attr" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/attr</a>
</li>
<li>calc() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
<li>z-index <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/z-index</a>
</li>
<li>:nth-child() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：22# 视频演示如何用纯 CSS 创作出美丽的彩虹条纹文字

## 原文链接
[https://segmentfault.com/a/1190000014858628](https://segmentfault.com/a/1190000014858628)

