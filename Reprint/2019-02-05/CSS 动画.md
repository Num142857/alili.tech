---
title: 'CSS 动画' 
date: 2019-02-05 2:30:09
hidden: true
slug: raxto2r86rr
categories: [reprint]
---

{{< raw >}}

                    
<p>CSS 中的 <code>transform</code>，<code>transition</code> 和 <code>animation</code> 是分开的三部分内容，其中 <code>transfrom</code> 主要是控制元素变形，并没有一个时间控制的概念，而 <code>transition</code> 和 <code>animation</code> 才是动画的部分，它们可以控制在一个时间段里，元素在两个或以上的状态切换的效果。</p>
<p>基本上我们会有这样的一个简单的概念，CSS 的动画效果由浏览器控制和渲染，理论上比 JavaScript 的动画效果性能好，但是控制上没有 JavaScript 那么灵活方便。</p>
<p>迪士尼出版的一本书中提及了动画效果的十二个原则，这篇文章讲解得比较详细，并且将其结合到页面动画中：<a href="http://www.w3cplus.com/css3/animation-principles-for-the-web.html" rel="nofollow noreferrer" target="_blank">网页动画的十二原则</a>。</p>
<h2 id="articleHeader0">transition</h2>
<p><code>transition</code> 允许我们在 CSS 属性变化时给它添加一个过度的动画效果。通常情况下，CSS 属性变化是立即生效的，新的属性值在超级短的时间内替换掉旧的属性值，然后浏览器重新绘制样式内容（可能是 reflow 或者 repaint）。大部分情况下会感觉样式变化突兀，而 <code>transition</code> 则可以添加顺滑的一个变化效果。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content {
  background: magenta;
  transition: background 200ms ease-in 50ms;
}

.content:hover {
  background: yellow;
  transition: background 200ms ease-out 50ms;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">background</span>: magenta;
  <span class="hljs-attribute">transition</span>: background <span class="hljs-number">200ms</span> ease-in <span class="hljs-number">50ms</span>;
}

<span class="hljs-selector-class">.content</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">background</span>: yellow;
  <span class="hljs-attribute">transition</span>: background <span class="hljs-number">200ms</span> ease-out <span class="hljs-number">50ms</span>;
}</code></pre>
<p><a href="http://caniuse.com/#search=transition" rel="nofollow noreferrer" target="_blank"><code>transition</code> 的兼容性</a>，不算差，基本上移动设备都可以使用了，并且能做到渐进增强，支持的便有过渡效果，不支持的便是直接切换，所以可以放心使用。</p>
<h3 id="articleHeader1">transition 属性</h3>
<p>CSS 的 <code>transition</code> 有四个属性：</p>
<ul>
<li><p><code>transition-delay</code> 延迟多久后开始动画</p></li>
<li><p><code>transition-duration</code> 过渡动画的一个持续时间</p></li>
<li><p><code>transition-property</code> 执行动画对应的属性，例如 <code>color</code>，<code>background</code> 等，可以使用 <code>all</code> 来指定所有的属性</p></li>
<li><p><code>transition-timing-function</code> 随着时间推进，动画变化轨迹的计算方式，常见的有：linear，ease，ease-in，ease-out，cubic-bezier(...) 等。详细参考：<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function" rel="nofollow noreferrer" target="_blank">transition-timing-function</a>，里边有各个效果的简单例子。</p></li>
</ul>
<p>这四个属性可以简写成为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".class {
  transition: <property> <duration> <timing-function> <delay>  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.class</span> {
  <span class="hljs-attribute">transition</span>: &lt;property&gt; &lt;duration&gt; &lt;timing-function&gt; &lt;delay&gt;  
}</code></pre>
<p>例如前边的那个例子，当 <code>.content</code> 元素 hover 时，50 毫秒后背景颜色从 magenta 渐变到 yellow，持续时间 200 毫秒，使用的是 ease-out 的算法。留意下：<code>transition</code> 生效的是对应的选择器的属性，例如 <code>.content:hover</code> 中的 <code>transition</code> 便是从 <code>.content</code> 的 magenta 到 yellow 过渡效果的控制，而 <code>.content</code> 中的 <code>transition</code> 则是控制不 hover 时，背景颜色从 yellow 到 magenta 的变化过程。</p>
<p><code>all</code> 这个属性值是这样的，它对应选择器下的元素的所有 CSS 属性生效，无论在哪里声明的 CSS 规则，并不局限于在同个代码块下。</p>
<p>如果需要不同属性对应不同的效果，可以这么来写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo {
  transition-property: all, border-radius, opacity;
  transition-duration: 1s, 2s, 3s;
  /* 当这样使用时，确保 all 在第一个，因为如果 all 在后边的话，它的规则会覆盖掉前边的属性 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.demo</span> {
  <span class="hljs-attribute">transition-property</span>: all, border-radius, opacity;
  <span class="hljs-attribute">transition-duration</span>: <span class="hljs-number">1s</span>, <span class="hljs-number">2s</span>, <span class="hljs-number">3s</span>;
  <span class="hljs-comment">/* 当这样使用时，确保 all 在第一个，因为如果 all 在后边的话，它的规则会覆盖掉前边的属性 */</span>
}</code></pre>
<p><code>transition</code> 的 <code>none</code> 属性较少用到，一般用于移除原本有的动画效果。<code>none</code> 没法和逗号一起使用来移除特定属性的动画效果，只能直接干掉 <code>transition</code>，如果要移除特定的属性效果，可以重写 <code>transition</code> 而不把要移除的属性写进去，或者比较 trick 的做法是设置 <code>duration</code> 为 0。</p>
<p>并不是所有的 CSS 属性都是可以添加 <code>transition</code> 效果的。详细可以参考文档：<a href="https://drafts.csswg.org/css-transitions/#animatable-properties" rel="nofollow noreferrer" target="_blank">animatable properties</a>。可能经常遇到的就是 <code>display</code> 这个属性并不能添加 <code>transition</code> 效果，你可以考虑使用 <code>visibility</code> 或者后边会提及的 <code>animation</code>。</p>
<p>关于 <code>transition-timing-function</code> 的各个算法的一个变化曲线是怎么样的，我们可以使用 chrome 的开发者工具来看一下，CSS 中你编写了对应的 <code>transition</code> 后，把鼠标移到 <code>transition-timing-function</code> 的那个值前边，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760816" src="https://static.alili.tech/img/remote/1460000006760816" alt="Timing function" title="Timing function" style="cursor: pointer; display: inline;"></span></p>
<p>这样你便可以很清晰地看到这个算法的一个变化轨迹是怎么用的，然后选择符合自己需要的一个算法。</p>
<h3 id="articleHeader2">transition 相关的事件</h3>
<p><code>transitionend</code> 事件会在 <code>transition</code> 动画结束的时候触发。通常我们会在动画结束后执行一些方法，例如继续下一个动画效果或者其他。Zepto.js 中的动画方法都是使用 CSS 动画属性来处理，而其中动画运行后的回调便应该是使用这个事件来处理。</p>
<p><code>transitionend</code> 事件触发时会传入一些动画相关的参数，例如：<code>propertyName</code>，<code>elapsedTime</code>，详细内容可以参考：<a href="https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/TransitionEvent" rel="nofollow noreferrer" target="_blank">transitionend</a>。</p>
<h3 id="articleHeader3">transition 应用</h3>
<p><code>transition</code> 在很多 UI 框架中是很常见的属性，当我们开发一个交互效果的时候，从某个状态到达另外一个状态时，<code>transition</code> 可以使得这个过程变得更加舒适和顺滑。例如上边的 <code>hover</code> 时的背景颜色的切换，控制元素的显示和隐藏时使用 <code>opacity</code> 来实现渐隐渐现。</p>
<p>当 <code>transition</code> 配合上 <code>transform</code> 提供的多样化的元素变化能力后，便可以绘制出很多有趣的交互渐变效果了。最近使用过程中做的一个简单效果的例子，<a href="http://jsbin.com/vuwaril/5/edit?html,css,output" rel="nofollow noreferrer" target="_blank">点击查看</a>。</p>
<p>很常见还有表单 input 报错时边框变红，按钮 hover 时背景渐变等，很多的 CSS 交互效果会因为 <code>transition</code> 变得更加自然。</p>
<h2 id="articleHeader4">animation</h2>
<p>虽然 <code>transition</code> 已经提供了很棒的动画效果了，但是我们只能够控制从一个状态到达另外一个状态，没法来控制多个状态的不断变化，而 <code>animation</code> 而帮助我们实现了这一点。使用 <code>animation</code> 的前提是我们需要先使用 <code>@keyframes</code> 来定义一个动画效果，<code>@keyframes</code> 定义的规则可以用来控制动画过程中的各个状态的情况，语法大抵是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes W {
  from { left: 0; top: 0; }
  to { left: 100%; top: 100%; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> W {
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; }
  <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>; }
}</code></pre>
<p><code>@keyframes</code> 关键词后跟动画的名字，然后是一个块，块中有动画进度的各个选择器，选择器后的块则依旧是我们常见的各个 CSS 样式属性。</p>
<p>在这里，控制动画的整个过程的选择器很重要，语法相对简单，你可以使用 <code>from</code> 或者 <code>0%</code> 来表示起始状态，而 <code>to</code> 或 <code>100%</code> 来表示结束状态。中间的部分你都可以使用百分比来进行表示。选择器后的块则是在到达这个进度状态时元素的样式应该是怎么样的，整个的过渡动画在这个的控制基础上由浏览器去绘制。</p>
<p>同样地，不是所有的属性都可以有动画效果，MDN 维护了一份 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties" rel="nofollow noreferrer" target="_blank">CSS 动画的属性列表</a> 可供参考。</p>
<blockquote><p>通常来说，多个状态下的相同属性的值应该是可以取到它们的中间值的，例如 left 从 0% 到 100%，如果没法取到中间值，如 height 从 auto 到 100px，有可能出现奇怪的一些状况，并且不同浏览器对此的处理也不尽相同，所以请尽量避免这种情况。</p></blockquote>
<h3 id="articleHeader5">animation 属性</h3>
<p><code>animation</code> 的属性比 <code>transition</code> 多，如下：</p>
<ul>
<li><p><code>animation-name</code> 你需要的动画效果的 <code>@keyframes</code> 的名字。</p></li>
<li><p><code>animation-delay</code> 和 <code>transition-delay</code> 一样，动画延迟的时间。</p></li>
<li><p><code>animtaion-duration</code> 和 <code>transition-duration</code> 一样，动画持续的时间。</p></li>
<li><p><code>animation-direction</code> 动画的一个方向控制。<br>  默认是 <code>normal</code>，如果是上述的 left 从 0% 到 100%，那么默认是从左到右。如果这个值是 <code>reverse</code>，那么便是从右到左。</p></li>
</ul>
<p>由于 <code>animation</code> 提供了循环的控制，所以还有两个值是 <code>alternate</code> 和 <code>alternate-reverse</code>，这两个值会在每次循环开始的时候调转动画方向，只不过是起始的方向不同。</p>
<p>例如还是 left 的例子，假设设置了 <code>animation-direction: alternate; animation-iteration-count: infinite;</code>，那么这个元素从左到右移动后，便调转方向，从右到左，如此循环。</p>
<ul><li><p><code>animation-fill-mode</code> 这个属性用来控制动画前后，<code>@keyframes</code> 中提供的 CSS 属性如何应用到元素上。<br>  默认值是 <code>none</code>，还有其他三个选择：<code>forwards</code>，<code>backwards</code>，<code>both</code>。</p></li></ul>
<p>假设是 <code>none</code>，那么动画前后，动画中声明的 CSS 属性都不会应用到元素上。即动画效果执行后，元素便恢复正常状态。</p>
<p>如果是 <code>forwards</code>，那么动画结束后，会把最后状态的 CSS 属性应用到元素上，即保持动画最后的样子。而 <code>backwards</code> 则相反，<code>both</code> 则都会，计算得出最后的一个结果。</p>
<ul>
<li><p><code>animation-timing-function</code> 和 <code>transition-timing-function</code> 一样，动画变化轨迹的算法。</p></li>
<li><p><code>animation-iteration-count</code> 动画循环次数，如果是 <code>infinite</code> 则无限次。有趣的是，支持小数，即 0.5 表示动画执行到一半。</p></li>
<li><p><code>animation-play-state</code> 动画执行的状态，两个值 <code>running</code> 或者 <code>paused</code>，可以用来控制动画是否执行。</p></li>
</ul>
<p>上述这些属性可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".class {
  animation: <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode> <play-state> <name>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.class</span> {
  <span class="hljs-attribute">animation</span>: &lt;duration&gt; &lt;timing-function&gt; &lt;delay&gt; &lt;iteration-count&gt; &lt;direction&gt; &lt;fill-mode&gt; &lt;play-state&gt; &lt;name&gt;
}</code></pre>
<p>略长，当然，平时使用中可能是省略部分参数的。</p>
<h3 id="articleHeader6">animation 需要留意的东西</h3>
<h4>优先级</h4>
<p>记得 CSS 中的层叠概念么，优先级高的属性会覆盖优先级低的属性，当 animation 应用到元素中时，动画运行过程中，<code>@keyframes</code> 声明的 CSS 属性优先级最高，比行内声明 <code>!important</code> 的样式还要高。现在浏览器的实现是这样子的，但是标准文档中的说法应该是可以被 <code>!important</code> 声明的属性所覆盖。</p>
<h4>多个动画的顺序</h4>
<p>由于 <code>animation-name</code> 是可以指定多个动画效果的，所以这里便会出现动画的一个顺序问题。后指定的动画会覆盖掉前边的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#colors {
  animation-name: red, green, blue; /* 假设这些 keyframe 都是修改 color 这个属性 */
  animation-duration: 5s, 4s, 3s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#colors</span> {
  <span class="hljs-attribute">animation-name</span>: red, green, blue; <span class="hljs-comment">/* 假设这些 keyframe 都是修改 color 这个属性 */</span>
  <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">5s</span>, <span class="hljs-number">4s</span>, <span class="hljs-number">3s</span>;
}</code></pre>
<p>上述代码的动画效果会是这样：前 3 秒是 blue，然后接着 1 秒是 green，最后 1 秒是 red。整个覆盖的规则是比较简单的。</p>
<h4>display 的影响</h4>
<p>如果一个元素的 <code>display</code> 设置为 <code>none</code>，那么在它或者它的子元素上的动画效果便会停止，而重新设置 <code>display</code> 为可见后，动画效果会重新重头开始执行。</p>
<h3 id="articleHeader7">animation 相关事件</h3>
<p>我们可以通过绑定事件来监听 animation 的几个状态，这些事件分别是：</p>
<ul>
<li><p>animationstart 动画开始事件，如果有 delay 属性的话，那么等到动画真正开始再触发，如果是没有 delay，那么当动画效果应用到元素时，这个事件会被触发。</p></li>
<li><p>animationend 动画结束的事件，和 transitionend 类似。如果有多个动画，那么这个事件会触发多次，像上边的例子，这个事件会触发三次。如果 <code>animation-iteration-count</code> 设置为 <code>infinite</code>，那么这个事件则不会被触发。</p></li>
<li><p>animationiteration 动画循环一个生命周期结束的事件，和上一个事件不一样的是，这个在每次循环结束一段动画时会触发，而不是整个动画结束时触发。无限循环时，除非 duration 为 0，否则这个事件会无限触发。</p></li>
</ul>
<p>animation event 相关的属性可以参考：<a href="https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent" rel="nofollow noreferrer" target="_blank">animationEvent</a>。</p>
<h3 id="articleHeader8">animation 应用</h3>
<p><code>animation</code> 可以实现控制在多个状态下进行动画切换，所以应用的场景比 <code>transition</code> 要广泛得多，可以使用 animation 实现大量的动效，具体可以查看下 <a href="https://daneden.github.io/animate.css/" rel="nofollow noreferrer" target="_blank">animate.css</a> 这个库。</p>
<p>我上边提到的 <a href="http://jsbin.com/vuwaril/edit?html,css,output" rel="nofollow noreferrer" target="_blank">简单例子</a> 中也包括了一个简单地使用 <code>animation</code> 来缩放字体，和一个简单进度条的例子。</p>
<h2 id="articleHeader9">CSS 动画的性能</h2>
<p>现在越来越多的页面开发是面向移动端，所以我们会更加关注性能方面的问题。浏览器绘制动画的过程中，涉及的主要是 Layout，Paint，Composite 的处理，当一个动画触发的浏览器处理越少，影响的区域越少，那么便消耗越低，性能上越好。</p>
<p>我们可以参考这个 <a href="https://csstriggers.com/" rel="nofollow noreferrer" target="_blank">CSS Triggers</a> 网站提供的列表，这里展示了修改属性时对应的浏览器内核所需要做的处理。简单概括来说，动画尽量少涉及布局相关的调整，因为布局上一旦变化，会涉及外部元素和内部元素的位置调整，对浏览器的消耗相当大，而在现代浏览器中，拥有比较好动画性能的属性就是 <code>transform</code> 和 <code>opacity</code>，建议需要动画的时候多往这两个属性考虑，例如字体要放大，避免使用 <code>font-size</code>，而是用 <code>transform: scale()</code> 等。</p>
<p>我们可以使用 <code>will-change</code> 来声明即将变化的属性，这可以让浏览器提前做一些优化工作，关于这个属性，更多内容可以参考: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change" rel="nofollow noreferrer" target="_blank">will-change</a>。值得留意的是，别滥用 <code>will-change</code>，在太多的元素上使用或者应用太多的属性都会导致浏览器资源浪费。</p>
<p>Chrome 浏览器的开发者工具提供的 Timeline 工具可以帮助我们来查看页面渲染的一个性能表现情况，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006699028" src="https://static.alili.tech/img/remote/1460000006699028" alt="Chrome Timeline" title="Chrome Timeline" style="cursor: pointer;"></span></p>
<p>Timeline 可以用来获取脚本执行性能，网络请求性能等的表现数据，但是这里我们只是关于动画渲染，所以只是勾选了 paint。我们可以看到渲染可以保持在 60 FPS，便不会感觉到卡顿。当渲染 FPS 过低的时候，图示那里会出现红色的提示，通过这个工具可以帮助我们在需要的时候做针对性的优化。</p>
<p>对于 CSS 动画性能上的东西，本人还比较缺乏实践经验，最近 <a href="http://www.w3cplus.com/" rel="nofollow noreferrer" target="_blank">w3cplus</a> 上出现了大量的关于 CSS 动画性能相关的文章，有兴趣可以查阅。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 动画

## 原文链接
[https://segmentfault.com/a/1190000006699023](https://segmentfault.com/a/1190000006699023)

