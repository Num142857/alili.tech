---
title: '前端每日实战：15# 视频演示如何用纯 CSS 创作条形图，不用任何图表库' 
date: 2018-12-01 2:30:12
hidden: true
slug: z7g39qy9z1e
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbb1VX?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb1VX?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/XqzGLp" rel="nofollow noreferrer" target="_blank">https://codepen.io/zhang-ou/pen/XqzGLp</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhang-ou/pen/XqzGLp" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cJdEgc9" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cJdEgc9</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/015-development-skills-card" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/015-development-skills-card</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，最外层的容器是卡片，内含一个标题，和一个技能说明，分别描述技能的名称和级别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;card&quot;>
    <h2>Development Skills</h2>
    <p class=&quot;skill html&quot;>
        <span>HTML5</span>
        <span class=&quot;level&quot;>90%</span>
    </p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Development Skills<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>HTML5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>90%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(dimgray, silver, silver, dimgray);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(dimgray, silver, silver, dimgray);
}</code></pre>
<p>技能卡片布局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card {
    width: 400px;
    background: linear-gradient(#333, dimgray);
    box-sizing: border-box;
    padding: 20px;
    font-family: sans-serif;
    color: white;
    letter-spacing: 0.1em;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.card</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#333, dimgray);
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.1em</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">50px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
}</code></pre>
<p>文字布局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card h2 {
    text-transform: uppercase;
    text-align: center;
}

.card .skill {
    height: 50px;
}

.card .skill span {
    display: block;
}

.card .skill .level {
    transform: translateY(-1em);
    text-align: right;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.card</span> <span class="hljs-selector-tag">h2</span> {
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-1em);
    <span class="hljs-attribute">text-align</span>: right;
}</code></pre>
<p>用伪元素画出条形图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card .skill .level {
    position: relative;
}

.card .skill .level::before,
.card .skill .level::after {
    content: '';
    position: absolute;
    top: 1.2em;
    left: 0;
    width: 100%;
    height: 100%;
}

.card .skill .level::before {
    border: 1px solid mediumspringgreen;
    border-radius: 0.2em;
    height: 105%;
}

.card .skill .level::after {
    background-image: linear-gradient(to right, mediumspringgreen, mediumspringgreen);
    background-repeat: no-repeat;
    background-position: top 0.1em left 0.1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1.2em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid mediumspringgreen;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">105%</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to right, mediumspringgreen, mediumspringgreen);
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-position</span>: top <span class="hljs-number">0.1em</span> left <span class="hljs-number">0.1em</span>;
}</code></pre>
<p>设置条形图的填充比例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card .skill.html .level::after {
    background-size: 90% 1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-class">.html</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">90%</span> <span class="hljs-number">1em</span>;
}</code></pre>
<p>dom 增加多个技能，每个技能用命名不同的样式类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;card&quot;>
    <h2>Development Skills</h2>
    <p class=&quot;skill html&quot;>
        <span>HTML</span>
        <span class=&quot;level&quot;>90%</span>
    </p>
    <p class=&quot;skill css&quot;>
        <span>CSS</span>
        <span class=&quot;level&quot;>95%</span>
    </p>
    <p class=&quot;skill javascript&quot;>
        <span>JavaScript</span>
        <span class=&quot;level&quot;>80%</span>
    </p>
    <p class=&quot;skill svg&quot;>
        <span>SVG</span>
        <span class=&quot;level&quot;>60%</span>
    </p>
    <p class=&quot;skill canvas&quot;>
        <span>Canvas</span>
        <span class=&quot;level&quot;>75%</span>
    </p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Development Skills<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>HTML<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>90%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill css"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>CSS<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>95%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill javascript"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>JavaScript<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>80%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill svg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>SVG<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>60%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skill canvas"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Canvas<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"level"</span>&gt;</span>75%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>分别定义每个技能的条形图宽度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card .skill.css .level::after {
    background-size: 95% 1em;
}

.card .skill.js .level::after {
    background-size: 80% 1em;
}

.card .skill.svg .level::after {
    background-size: 60% 1em;
}

.card .skill.vue .level::after {
    background-size: 75% 1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-class">.css</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">95%</span> <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-class">.js</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">80%</span> <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-class">.svg</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">60%</span> <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-class">.vue</span> <span class="hljs-selector-class">.level</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">75%</span> <span class="hljs-number">1em</span>;
}</code></pre>
<p>最后，增加一点交互效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card .skill:hover {
    background-color: #333;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.card</span> <span class="hljs-selector-class">.skill</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>linear-gradient() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient</a>
</li>
<li>translateY() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY</a>
</li>
<li>background-image <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-image" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-image</a>
</li>
<li>background-repeat <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat</a>
</li>
<li>background-position <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-position" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-position</a>
</li>
<li>background-size <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-size</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：15# 视频演示如何用纯 CSS 创作条形图，不用任何图表库

## 原文链接
[https://segmentfault.com/a/1190000014768534](https://segmentfault.com/a/1190000014768534)

