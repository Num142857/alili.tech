---
title: '如何只用 CSS 完成漂亮的加载' 
date: 2019-01-04 2:30:11
hidden: true
slug: g8by6kv9q8t
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVSJ0b?w=1920&amp;h=600" src="https://static.alili.tech/img/bVSJ0b?w=1920&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">为什么要做加载</h2>
<p>只想说, 本文最重要的是对 <code>CSS</code>, <code>伪元素</code>, <code>keyframe</code>的分享, 以及读者对这些东西的<code>真正掌握</code>, 我并<code>不是怂恿</code>大家在每一个页面的前面都去加一个酷炫的加载</p>
<h2 id="articleHeader1">我是如何做的</h2>
<p>不同的页面, 对加载的<code>设计</code>也就可能不同. 本文设计的加载适合大多数页面.</p>
<p>并且, 本文假设读者已经非常熟悉<code>伪元素</code>, <code>CSS 动画属性</code>和<code>keyframe</code>, 如果读者想重温, 下面两篇文章可做参考</p>
<ul>
<li><a href="http://t.cn/R98iMag" rel="nofollow noreferrer" target="_blank">学会使用 CSS 中的 :after 和 :before</a></li>
<li><a href="http://t.cn/R98iW8V" rel="nofollow noreferrer" target="_blank">keyframe 动画直通车</a></li>
</ul>
<h3 id="articleHeader2">开始入门</h3>
<p>在开始一起构建它前, 我们先看看它<code>最后的效果</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSJ0o?w=45&amp;h=45" src="https://static.alili.tech/img/bVSJ0o?w=45&amp;h=45" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>正如你所看到的, 我们将经历 <code>4 个步骤</code></p>
<ul>
<li>边框一个接一个地<code>出现</code>
</li>
<li>红/橙/白色方块向里<code>滑入</code>
</li>
<li>方块向外<code>划出</code>
</li>
<li>边框<code>消失</code>
</li>
</ul>
<p>我们只需要 <code>animation-direction: alternate</code> 来完成步骤 1 和 2, 步骤 3 和 步骤 4 我们可以使用 <code>reverse</code>, 另外, 我们可以使用 <code>animation-iteration-count: infinite</code> 重复动画</p>
<p>首先, 我们先书写好基本的 <code>HTML</code> 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
  <head>
    <!-- <link rel=&quot;preload&quot;> for CSS, JS, and font files  -->
    <style type=&quot;text/css&quot;>
      /*
       *  All the CSS for the loader
       *  Minified and vendor prefixed
       */
    </style>
  </head>
  <body>
    <div class=&quot;loader&quot;>
      <!-- HTML for the loader -->
    </div>
    <header />
    <main />
    <footer />
    <!-- Tags for CSS and JS files -->
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;link rel="preload"&gt; for CSS, JS, and font files  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
      <span class="hljs-comment">/*
       *  All the CSS for the loader
       *  Minified and vendor prefixed
       */</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loader"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- HTML for the loader --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> /&gt;</span>
    <span class="hljs-comment">&lt;!-- Tags for CSS and JS files --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader3">构建 logo 本身</h3>
<p><span class="img-wrap"><img data-src="/img/bVSJ0f?w=166&amp;h=166" src="https://static.alili.tech/img/bVSJ0f?w=166&amp;h=166" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>一开始我们先实现 <code>logo</code> 本身, 而不是最终版本的效果</p>
<p>父级元素 <code>logo</code>, 不同颜色的方块都是它的子元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;logo&quot;>
  <div class=&quot;white&quot;></div>
  <div class=&quot;orange&quot;></div>
  <div class=&quot;red&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"white"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"orange"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"red"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们用 <code>less</code> 来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo {
  position: relative;
  width: 100px;
  height: 100px;
  border: 4px solid black;
  box-sizing: border-box;
  background-color: white;

  &amp; > div {
    position: absolute;
  }

  .red {
    top: 0;
    bottom: 0;
    left: 0;
    width: 27%;
    border-right: 4px solid black;
    background-color: #EA5664;
  }
  /* Similar code for div.orange and div.white */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid black;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background-color</span>: white;

  &amp; &gt; div {
    <span class="hljs-attribute">position</span>: absolute;
  }

  <span class="hljs-selector-class">.red</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">27%</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">4px</span> solid black;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EA5664</span>;
  }
  <span class="hljs-comment">/* Similar code for div.orange and div.white */</span>
}</code></pre>
<p><code>logo</code> 的效果图如下</p>
<p><span class="img-wrap"><img data-src="/img/bVSJ0p?w=697&amp;h=524" src="https://static.alili.tech/img/bVSJ0p?w=697&amp;h=524" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">边框动画</h3>
<p>接下来, 我们将进入棘手(<code>有趣</code>)的部分</p>
<p>CSS 不允许我们直接对 <code>div.logo</code> 的边框进行设置达到我们想要的效果, 所以我们必须<code>去除</code>原有的边框, 采用其他的办法来实现</p>
<p>我们要把<code>四个边框</code>分割开来, 然后让它们<code>有序</code>地出现, 所以, 我们可以使用覆盖整个 <code>div</code> 的两个透明的<code>伪元素</code></p>
<p>废话少说, 就让我们开始吧, 我们先做出它最初始的样子. 我们让 <code>div.logo :: before</code> 绝对位于 <code>div.logo</code> 的左上角，代表方块的上边框和右边框, 让 <code>div.logo::after</code> 绝对定位 <code>div.logo</code> 的右下角, 代表方块的下边框和左边框</p>
<p>现在, less 代码变成了这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo {
  position: relative;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: white;

  &amp;::before,
  &amp;::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 4px solid transparent;
  }

  &amp;::before {
    top: 0;
    left: 0;
    border-top-color: black;
    border-right-color: black;
  }

  &amp;::after {
    bottom: 0;
    right: 0;
    border-bottom-color: red; // Red for demo purposes only
    border-left-color: red;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background-color</span>: white;

  &amp;::before,
  &amp;::after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid transparent;
  }

  &amp;<span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top-color</span>: black;
    <span class="hljs-attribute">border-right-color</span>: black;
  }

  &amp;<span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom-color</span>: red; // Red for demo purposes only
    <span class="hljs-attribute">border-left-color</span>: red;
  }
}</code></pre>
<p>现在<code>效果</code>长这样</p>
<p><span class="img-wrap"><img data-src="/img/bVSJ0q?w=698&amp;h=522" src="https://static.alili.tech/img/bVSJ0q?w=698&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来, 我们就用 <code>keyframe</code> 做 <code>div.logo::before</code> 的第一个动画</p>
<p>我们将 <code>width</code> 和 <code>height</code> 初始都为 <code>0</code>, 然后用 <code>keyframe</code> 将 <code>width</code> 和<br><code>height</code> 调整到 <code>100%</code></p>
<p>随着我们在相应的时间把边框从<code>透明</code>变为<code>黑色</code>, 我们想要的最开始的效果就出来了</p>
<p>该代码展示了伪元素的<code>初始动画</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div.logo {
  &amp;::before,
  &amp;::after {
    /* ... */
    animation-timing-function: linear;
  }
  &amp;::before {
    /* ... */
    animation: border-before 1.5s infinite;
    animation-direction: alternate;
  }
}
@keyframes border-before {
  0% {
    width: 0;
    height: 0;
    border-right-color: transparent;
  }
  24.99% {
    border-right-color: transparent;
  }
  25% {
    height: 0;
    width: 100%;
    border-right-color: black;
  }
  50%,
  100% {
    width: 100%;
    height: 100%;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.logo</span> {
  &amp;::before,
  &amp;::after {
    <span class="hljs-comment">/* ... */</span>
    <span class="hljs-attribute">animation-timing-function</span>: linear;
  }
  &amp;<span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-comment">/* ... */</span>
    <span class="hljs-attribute">animation</span>: border-before <span class="hljs-number">1.5s</span> infinite;
    <span class="hljs-attribute">animation-direction</span>: alternate;
  }
}
@<span class="hljs-keyword">keyframes</span> border-before {
  0% {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right-color</span>: transparent;
  }
  24<span class="hljs-selector-class">.99</span>% {
    <span class="hljs-attribute">border-right-color</span>: transparent;
  }
  25% {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-right-color</span>: black;
  }
  50%,
  100% {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }
}</code></pre>
<p>我们对 <code>div.logo::after</code> 重复相同的操作, 不要忘了调整时间和反转 <code>width</code> 和 <code>height</code>. 现在, 我们就有了最外层边框的整个动画.</p>
<h3 id="articleHeader5">方块动画</h3>
<p>最后，我们一起来设置<code>方块</code>的动画</p>
<p>我们最大的挑战是无法连接 <code>keyframes</code>。因为，我们最终想要的动画中每个小方框都有一定的<code>顺序</code>， 为此， 我们作如下改变</p>
<ul>
<li>
<code>0 to 25%</code>：上边框和右边框显现</li>
<li>
<code>25 to 50%</code>：下边框和左边框显现</li>
<li>
<code>50 to 65%</code>：红色小方块显现</li>
<li>
<code>65 to 80%</code>：橙色小方块显现</li>
<li>
<code>75 to 90%</code>：白色小方块显现</li>
</ul>
<p>红色小方框 <code>keyframe</code> 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes red {
  0%,
  50% {
    width: 0;
    opacity: 0;
  }
  50.01% {
    opacity: 1;
  }
  65%,
  100% {
    width: 27%;
    opacity: 1;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> red {
  0%,
  50% {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  }
  50<span class="hljs-selector-class">.01</span>% {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  }
  65%,
  100% {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">27%</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  }
}</code></pre>
<p><code>重复</code>上面的代码，就可完成我们整个动画， 是不是很完美</p>
<h2 id="articleHeader6">总结</h2>
<p>感谢你的阅读，最后附上 <a href="http://t.cn/R93jmwe" rel="nofollow noreferrer" target="_blank">所有的源码</a>，但个人建议，不要直接阅读源码，根据上面的提示在 <code>codepen</code> 中自己来一遍才是最佳实践</p>
<p><code>原文链接</code>: <a href="http://t.cn/R93jB7z" rel="nofollow noreferrer" target="_blank">How to create a beautiful animated loader with nothing but CSS (Julien Benchetrit)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何只用 CSS 完成漂亮的加载

## 原文链接
[https://segmentfault.com/a/1190000010624216](https://segmentfault.com/a/1190000010624216)

