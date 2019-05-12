---
title: 'CSS Animations vs Web Animations API' 
date: 2019-01-11 2:30:07
hidden: true
slug: h8n08h4r0ng
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>作者：Ollie Williams</p>
<p>原文：<a href="https://css-tricks.com/css-animations-vs-web-animations-api/" rel="nofollow noreferrer" target="_blank">CSS Animations vs Web Animations API</a></p>
</blockquote>
<p>在  JavaScript 有一个原生动画 API 叫 Web Animations API，在这篇文章中简称为 WAAPI。MDN 上已经有 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API" rel="nofollow noreferrer" target="_blank">很好的文档</a>，而且，Dan Wilson 为此写了 <a href="http://danielcwilson.com/blog/2015/07/animations-part-1/" rel="nofollow noreferrer" target="_blank">一个很棒的文章系列</a>。</p>
<p>在本文中，我们一起来对比一下 WAAPI 和 CSS 动画。</p>
<h2 id="articleHeader0">关于浏览器支持</h2>
<p>尽管浏览器原生支持仍然有限，但 WAAPI 有一个全面和强大的 <a href="https://github.com/web-animations/web-animations-js" rel="nofollow noreferrer" target="_blank">polyfill</a>，使得现在就能在生产环境使用。</p>
<p>同样地，可以在 <a href="https://github.com/web-animations/web-animations-js" rel="nofollow noreferrer" target="_blank">Can I Use</a> 查看浏览器兼容性数据。然而，这并没有提供很好的信息来支持 WAAPI 的所有子功能。这里有一个检查工具：</p>
<p>See the Pen <a href="https://codepen.io/danwilson/pen/xGBKVq/" rel="nofollow noreferrer" target="_blank">WAAPI Browser Support Test</a><button class="btn btn-xs btn-default ml10 preview" data-url="danwilson/pen/xGBKVq/" data-typeid="3">点击预览</button> by Dan Wilson (<a href="https://codepen.io/danwilson" rel="nofollow noreferrer" target="_blank">@danwilson</a><button class="btn btn-xs btn-default ml10 preview" data-url="danwilson" data-typeid="3">点击预览</button>) on <a href="https://codepen.io/" rel="nofollow noreferrer" target="_blank">CodePen</a>.</p>
<p>要想再没有 polyfill 的情况下体验所有功能，请使用 Firefox Nightly。</p>
<h2 id="articleHeader1">WAAPI 的基础知识</h2>
<p>如果你曾经使用 jQuery  的 <code>.animate()</code>，那么应该会觉得 WAAPI 的基本语法看起来很熟悉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector('.animate-me');
element.animate(keyframes, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.animate-me'</span>);
element.animate(keyframes, <span class="hljs-number">1000</span>);</code></pre>
<p><code>animate</code> 方法接受两个参数：关键帧和持续时间。与 jQuery 相比的优势是，不仅是浏览器内置，而且性能也更好。</p>
<p>第一个参数，关键帧，是一个对象数组，每个对象都是动画中的一个关键帧。看这个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keyframes = [
  { opacity: 0 },
  { opacity: 1 }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> keyframes = [
  { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span> },
  { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span> }
];</code></pre>
<p>第二个参数，持续时间，指的是想要动画持续多久，在上面的例子中是 1000 毫秒。接下来看一个更令人兴奋的例子。</p>
<h2 id="articleHeader2">用 WAAPI 重新创建一个 animista 的 CSS 动画</h2>
<p>这里有一些从 <a href="http://animista.net/" rel="nofollow noreferrer" target="_blank">animista</a> 拉取的 CSS 代码，被称为 slide-in-blurred-top 的入场动画。看起来很漂亮</p>
<p>在 <a href="http://animista.net/play/entrances/slide-in-blurred/slide-in-blurred-top" rel="nofollow noreferrer" target="_blank">实际PERF</a> 比这个 GIF 效果好很多。</p>
<p>以下是 CSS 中的关键帧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0% {
  transform: translateY(-1000px) scaleY(2.5) scaleX(.2);
  transform-origin: 50% 0;
  filter: blur(40px);
  opacity: 0;
}
100% {
  transform: translateY(0) scaleY(1) scaleX(1);
  transform-origin: 50% 50%;
  filter: blur(0);
  opacity: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">0% {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-1000px) <span class="hljs-built_in">scaleY</span>(2.5) <span class="hljs-built_in">scaleX</span>(.2);
  <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(40px);
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
100% {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0) <span class="hljs-built_in">scaleY</span>(1) <span class="hljs-built_in">scaleX</span>(1);
  <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(0);
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>在 WAAPI 中代码基本相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keyframes = [
  { 
    transform: 'translateY(-1000px) scaleY(2.5) scaleX(.2)', 
    transformOrigin: '50% 0',
    filter: 'blur(40px)',
    opacity: 0 
  },
  { 
    transform: 'translateY(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1 
  }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> keyframes = [
  { 
    <span class="hljs-attr">transform</span>: <span class="hljs-string">'translateY(-1000px) scaleY(2.5) scaleX(.2)'</span>, 
    <span class="hljs-attr">transformOrigin</span>: <span class="hljs-string">'50% 0'</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">'blur(40px)'</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span> 
  },
  { 
    <span class="hljs-attr">transform</span>: <span class="hljs-string">'translateY(0) scaleY(1) scaleX(1)'</span>,
    <span class="hljs-attr">transformOrigin</span>: <span class="hljs-string">'50% 50%'</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">'blur(0)'</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span> 
  }
];</code></pre>
<p>可以看出，将关键帧应用到需要动画的元素上是多么容易：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.animate(keyframes, 700);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">element.animate(keyframes, <span class="hljs-number">700</span>);</code></pre>
<p>为了简单起见，只指定了持续时间。但是，我们可以使用这个第二个参数来传递更多的选项，至少也应该指定一个缓动效果。以下是所有可用选项的完整列表，其中包含一些示例值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var options = {
  iterations: Infinity,
  iterationStart: 0,
  delay: 0,
  endDelay: 0,
  direction: 'alternate',
  duration: 700,
  fill: 'forwards',
  easing: 'ease-out',
}
element.animate(keyframes, options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> options = {
  <span class="hljs-attr">iterations</span>: <span class="hljs-literal">Infinity</span>,
  <span class="hljs-attr">iterationStart</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">delay</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">endDelay</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">direction</span>: <span class="hljs-string">'alternate'</span>,
  <span class="hljs-attr">duration</span>: <span class="hljs-number">700</span>,
  <span class="hljs-attr">fill</span>: <span class="hljs-string">'forwards'</span>,
  <span class="hljs-attr">easing</span>: <span class="hljs-string">'ease-out'</span>,
}
element.animate(keyframes, options);</code></pre>
<p>加上这些选项，我们的动画将从头开始，没有任何延迟，在动画完成后往返循环播放。</p>
<p>不爽的是，对于熟悉 CSS 动画的人来说，一些术语跟我们习惯的有所不同。好处是打字会更快一些！</p>
<ul>
<li>使用 <code>easing</code> 而不是 <code>animation-timing-function</code>
</li>
<li>不是 <code>animation-iteration-count</code>，而是 <code>iterations</code>。如果我们希望动画永远重复，使用 <code>Infinity</code> 而不是 <code>infinite</code>。有点混乱， <code>Infinity</code> 不带引号。<code>Infinity</code> 是一个 JavaScript 关键字，而其他值都是字符串。</li>
<li>我们使用毫秒而不是秒，对于之前写过许多 JavaScript 的人来说，这应该是一样的。（你也可以在 CSS 动画中使用毫秒数，但很少有人使用。）</li>
</ul>
<p>我们来仔细看看一个选项：<code>iterationStart</code>。 </p>
<p>当我第一次碰到 <code>iterationStart</code> 有点困惑。为什么要从指定的迭代开始，而不是只要减少迭代次数？当使用十进制数时，此选项非常有用。例如，可以将其设置为  <code>.5</code>，动画将开始一半。要做一个完整的动画需要两个一半，所以如果迭代次数设置为 1，并且将 <code>iterationStart</code> 设置为  <code>.5</code>，动画将从一半到动画结束播放，然后从动画开头开始，结束于中间！ </p>
<p>值得注意的是，也可以将迭代次数设置为小于 1。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var option = {
  iterations: .5,
  iterationStart: .5
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> option = {
  <span class="hljs-attr">iterations</span>: <span class="hljs-number">.5</span>,
  <span class="hljs-attr">iterationStart</span>: <span class="hljs-number">.5</span>
}</code></pre>
<p>这样，动画会从中间开始，一直播放到最后。 </p>
<p>endDelay：如果要将多个动画串在一起，但是希望在一个动画的结尾和后续动画的开始之间存在差距，这时 endDelay 就很有用。这是一个有用的视频，由 Patrick Brosset 来解释。</p>
<p><a href="https://www.youtube.com/embed/hWe-qukNrN8" rel="nofollow noreferrer" target="_blank">一个 YouTube 的视频</a></p>
<h2 id="articleHeader3">缓动（easing）</h2>
<p>在任何动画中，缓动都是最重要的元素之一。WAAPI 为我们提供了两种不同的方式设置缓动 - 在我们的关键帧数组或我们的选项对象内。</p>
<p>在 CSS 中，如果使用 <code>animation-timing-function: ease-in-out</code> 你可能会认为动画会缓慢开始，然后缓慢结束。实际上，这些缓动应用在关键帧之间，而不是整个动画。这可以对动画的感觉进行细粒度的控制。WAAPI 也提供这种功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keyframes = [
  { opacity: 0, easing: 'ease-in' }, 
  { opacity: 0.5, easing: 'ease-out' }, 
  { opacity: 1 }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> keyframes = [
  { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">easing</span>: <span class="hljs-string">'ease-in'</span> }, 
  { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.5</span>, <span class="hljs-attr">easing</span>: <span class="hljs-string">'ease-out'</span> }, 
  { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span> }
]</code></pre>
<p>值得注意的是，在 CSS 和 WAAPI 中，不应该传入最后一帧的缓动值，因为这将不起作用。可是很多人会犯这种错误。</p>
<p>有时候，在整个动画中添加缓动效果更为直观。这在 CSS 是不可能的，但现在可以在 WAAPI 中实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var options = {
  duration: 1000,
  easing: 'ease-in-out',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> options = {
  <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>,
  <span class="hljs-attr">easing</span>: <span class="hljs-string">'ease-in-out'</span>,
}</code></pre>
<p>可以看到这两种缓动在 CodePen 上的区别：</p>
<p><a href="https://codepen.io/cssgrid/pen/OmrVeQ" rel="nofollow noreferrer" target="_blank">点我查看</a><button class="btn btn-xs btn-default ml10 preview" data-url="cssgrid/pen/OmrVeQ" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader4">缓动 vs 线性</h2>
<p>值得注意的是 CSS 动画和 WAAPI 之间的另一个区别：<strong>在 CSS 中 默认值是 ease，而在 WAAPI 默认是 linear。</strong> ease 实际上是 <code>ease-in-out</code> 的一个版本，当你想偷懒时这是一个非常好的选择。同时，线性代表致命的沉闷和无生命 - 一致的速度看起来机械和不自然。它被选为默认值，可能因为它是最中立的选项。然而，在使用 WAAPI 时，更好是使用缓动，以免动画看起来很乏味和机械。</p>
<h2 id="articleHeader5">性能</h2>
<p>WAAPI 提供与 CSS 动画相同的性能改进，尽管这并不意味着一定就是平滑的动画。 </p>
<p>希望这个 API 的性能优化做到，使我们可以避免使用 <code>will-change</code>和 <code>translateZ</code> 成为可能。但是，至少在目前的浏览器实现中，这些属性在处理性能问题方面仍然是有帮助，有必要的。</p>
<p>但是，如果你的动画有延迟，则无需担心使用 <code>will-change</code>。web animations 规范的主要作者对 <a href="https://damp-lake-50659.herokuapp.com/" rel="nofollow noreferrer" target="_blank">Animation for Work Slack community</a> 提出了一些有趣的建议，希望他不介意我在这里重复：</p>
<blockquote><p>如果有一个正向的延迟，不需要使用 <code>will-change</code>，因为浏览器将在延迟开始时进行分层，当动画启动时，它将准备就绪。</p></blockquote>
<h2 id="articleHeader6">WAAPI 对战 CSS 动画？</h2>
<p>WAAPI 为我们提供了一套已经在 CSS 中实现的 JavaScript 语法。然而，它们不应该被视为对手。如果我们坚持使用 CSS 完成动画和转换，那么我们可以在 WAAPI 进行动画交互。</p>
<h2 id="articleHeader7">动画对象</h2>
<p><code>.animate()</code> 方法不仅处理元素的动画，它也返回一些东西。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myAnimation = element.animate(keyframes, options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> myAnimation = element.animate(keyframes, options);</code></pre>
<p>在控制台中查看的动画对象</p>
<p>如果我们在控制台中查看返回值，会发现这是一个动画对象。这为我们提供了各种各样的功能，其中一些是不言自明，比如 <code>myAnimation.pause()</code>。通过更改 <code>animation-play-state</code> 属性，我们可以通过 CSS 动画实现类似的结果，但 WAAPI 语法比 <code>element.style.animationPlayState = "paused"</code> 更简洁。我们也可以通过 <code>myAnimation.reverse()</code> 轻松反转动画，同样地，跟我们使用脚本更改 CSS 的 <code>animation-direction</code> 属性相比，稍微有点进步。</p>
<p>然而，到目前为止，使用 JavaScript 操作 <code>@keyframe</code> 并不是件容易的的事。即使是重新启动动画这样简单的事，也是需要一些技巧的，就像 Chris Coyier <a href="https://css-tricks.com/restart-css-animation/" rel="nofollow noreferrer" target="_blank">先前写过的那样</a>。使用 WAAPI，我们可以简单地使用 <code>myAnimation.play()</code> ，如果动画已经完成，将从一开始就重播动画，或者如果我们暂停播放，则从中间迭代播放动画。</p>
<p>我们甚至可以轻松地改变动画的速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myAnimation.playbackRate = 2; // speed it up
myAnimation.playbackRate = .4; // use a number less than one to slow it down" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myAnimation.playbackRate = <span class="hljs-number">2</span>; <span class="hljs-comment">// speed it up</span>
myAnimation.playbackRate = <span class="hljs-number">.4</span>; <span class="hljs-comment">// use a number less than one to slow it down</span></code></pre>
<h2 id="articleHeader8">getAnimations()</h2>
<p>这个方法将返回所有动画对象的数组，包含使用 WAAPI 定义的动画和 CSS 转换或动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.getAnimations() // returns any animations or transitions applied to our element using  CSS or WAAPI" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">element.getAnimations() <span class="hljs-comment">// returns any animations or transitions applied to our element using  CSS or WAAPI</span></code></pre>
<p>如果你喜欢使用 CSS 来定义和使用动画，<code>getAnimations()</code>  允许 API​​ 与 <code>@keyframes</code> 结合使用。你可以继续使用 CSS 进行大部分动画工作，然后在需要 API 时获得使用 API 的优势。</p>
<p>即使一个 DOM 元素只使用到一个动画，<code>getAnimations()</code> 也将始终返回一个数组。我们使用那个单一的动画对象来处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var h2 = document.querySelector(&quot;h2&quot;);
var myCSSAnimation = h2.getAnimations()[0];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> h2 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"h2"</span>);
<span class="hljs-keyword">var</span> myCSSAnimation = h2.getAnimations()[<span class="hljs-number">0</span>];</code></pre>
<p>我们也可以在 CSS 动画中使用 web animation API :)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myCSSAnimation.playbackRate = 4;
myCSSAnimation.reverse();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myCSSAnimation.playbackRate = <span class="hljs-number">4</span>;
myCSSAnimation.reverse();</code></pre>
<h2 id="articleHeader9">Promise 和 Event</h2>
<p>很多通过 CSS 触发的事件，现在我们已经可以使用 JavaScript 代码来完成：   <code>animationstart</code>，<code>animationend</code>，<code>animationiteration</code> 和 <code>transitionend</code>。之前经常需要监听动画或转换的结束，以便从 DOM 中删除应用的元素。</p>
<p>在动画对象可以使用 WAAPI 来完成 <code>animationend</code> 或 <code>transitionend</code> 做的事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myAnimation.onfinish = function() {
  element.remove();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myAnimation.onfinish = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  element.remove();
}</code></pre>
<p>WAAPI 为我们提供了两个选择：event 和 promise。动画对象的 <code>.finished</code> 方法会返回一个在动画结束时的 promise。下面这段代码是上面例子的 promise 版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myAnimation.finished.then(() =>
  element.remove())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myAnimation.finished.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  element.remove())</code></pre>
<p>我们来看看来自 Mozilla 开发者网络中的一个稍微复杂点的例子。<code>Promise.all</code> 接受一个 promise 的数组，一旦所有 promise 完成才会运行回调函数。可以看出，<code>element.getAnimations()</code> 返回的是一个动画对象数组。我们可以将数组中的所有动画对象 map 到每个动画对象的 <code>.finished</code>上，这样就获得需要的 promise 数组。</p>
<p>在这个例子中，只有在页面上的所有动画完成后，我们的函数才能运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all(document.getAnimations().map(animation => 
  animation.finished)).then(function() {           
    // do something cool 
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.all(<span class="hljs-built_in">document</span>.getAnimations().map(<span class="hljs-function"><span class="hljs-params">animation</span> =&gt;</span> 
  animation.finished)).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{           
    <span class="hljs-comment">// do something cool </span>
  })</code></pre>
<h2 id="articleHeader10">未来</h2>
<p>本文中提到的功能只是一个开始。从目前的规范和实施来看，未来会有一个很强大动画 API。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS Animations vs Web Animations API

## 原文链接
[https://segmentfault.com/a/1190000009938846](https://segmentfault.com/a/1190000009938846)

