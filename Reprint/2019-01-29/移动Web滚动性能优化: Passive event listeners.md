---
title: '移动Web滚动性能优化: Passive event listeners' 
date: 2019-01-29 2:30:10
hidden: true
slug: er8jsfm14jc
categories: [reprint]
---

{{< raw >}}

                    
<p>今年的 Google I/O 已经过去一段时间了，大部分人都关注了一些新产品的发布，比如 Allo 和 Duo、Android N、Daydream、Android Studio、Firebase……还有 PWA。</p>
<p>网上关于 PWA 相关的文章和技术讨论已经很多了，但是关注 Passive event listeners 的文章却很少。那么 Passive event listeners 到底有多神奇呢？</p>
<p>如果用简单一句话来解释就是：提升页面滑动的流畅度。</p>
<p><code>addEventListener</code> 用来在页面中监听事件，它的参数签名是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.addEventListener(type, listener[, useCapture]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">target</span><span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-selector-tag">type</span>, <span class="hljs-selector-tag">listener</span><span class="hljs-selector-attr">[, useCapture]</span>);
</code></pre>
<p>但是如果你现在去查询 MDN 的文档却发现是这样写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">target</span><span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-selector-tag">type</span>, <span class="hljs-selector-tag">listener</span><span class="hljs-selector-attr">[, options]</span>);
<span class="hljs-selector-tag">target</span><span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-selector-tag">type</span>, <span class="hljs-selector-tag">listener</span><span class="hljs-selector-attr">[, useCapture]</span>);
</code></pre>
<p>最后一个参数 <code>useCapture</code> 在很久之前是必填的，后来的规范将 <code>useCapture</code> 变成了选填。<code>useCapture</code> 参数用来控制监听器是在捕获阶段执行还是在冒泡阶段执行，<code>true</code> 为捕获阶段，<code>false</code> 为冒泡阶段，变成选填后默认值为 <code>false</code>（冒泡阶段），因为传 <code>true</code> 的情况太少了。</p>
<p><span class="img-wrap"><img data-src="/img/bVHmNa?w=640&amp;h=343" src="https://static.alili.tech/img/bVHmNa?w=640&amp;h=343" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此过程被称为事件传播。如果我们为每个元素都绑定事件，那么在事件冒泡过程中，子元素最先响应事件，然后依次向父元素冒泡。</p>
<p>在事件处理函数中，会传递 Event 对象作为参数，而这个参数最常用的 2 个方法就是 <code>event.preventDefault()</code> 和 <code>event.stopPropagation()</code>。</p>
<ul>
<li><p><code>stopPropagation()</code> 阻止事件传播</p></li>
<li><p><code>preventDefault()</code> 阻止事件的默认行为</p></li>
</ul>
<p>在移动网页中，我们经常使用的就是 touch 系列的事件，如：</p>
<ul>
<li><p>touchstart</p></li>
<li><p>touchmove</p></li>
<li><p>touchend</p></li>
<li><p>touchcancel</p></li>
</ul>
<p>我们可以使用如下方式绑定 <code>touchstart</code> 事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div.addEventListener(&quot;touchstart&quot;, function(e){
    // do sth.
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>div.addEventListener(<span class="hljs-string">"touchstart"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-comment">// do sth.</span>
})
</code></pre>
<p>由于第三个参数没有传值，那么默认就是 <code>false</code>，也就是这个事件在冒泡阶段被处理，如果调用了 <code>stopPropagation()</code> 则 <code>div</code> 的父元素就无法接收这个事件。</p>
<p>那么如果我们调用了 <code>preventDefault()</code> 呢？如果你曾经给超链接 <code>a</code> 标签绑定过 <code>click</code> 事件应该就知道会发生什么了。当 <code>a</code> 标签点击时，它的默认行为是跳转到 <code>href</code> 指定的链接，如果我们调用了 <code>preventDefault</code> 就阻止了 <code>a</code> 标签点击事件的默认行为。（如果你使用 jQuery 通过 <code>return false</code> 可以阻止事件默认行为，但是深记 You Might Not Need jQuery ）</p>
<p>如果我们在 <code>touchstart</code> 事件调用 <code>preventDefault</code> 会怎样呢？这时页面会禁止，不会滚动或缩放。那么问题来了：浏览器无法预先知道一个监听器会不会调用 <code>preventDefault()</code>，它需要等监听器执行完后，再去执行默认行为，而监听器执行是要耗时的，这样就会导致页面卡顿。</p>
<p>这段翻译的太专业了，你可以这么理解：当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 <code>touchstart</code> 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 <code>preventDefault</code>，那么页面就不应该滚动，如果你没有调用 <code>preventDefault</code>，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。</p>
<p>而且 Chrome 做了统计：</p>
<blockquote><p>For instance, in Chrome for Android 80% of the touch events that block<br>scrolling never actually prevent it. 10% of these events add more than<br>100ms of delay to the start of scrolling, and a catastrophic delay of<br>at least 500ms occurs in 1% of scrolls.</p></blockquote>
<p>在 Android 版 Chrome 浏览器的 touch 事件监听器的页面中，80% 的页面都不会调用 <code>preventDefault</code> 函数来阻止事件的默认行为。在滑动流畅度上，有 10% 的页面增加至少 100ms 的延迟，1% 的页面甚至增加 500ms 以上的延迟。</p>
<p>也就是说，当浏览器等待执行事件的默认行为时，大部分情况是白等了。如果 Web 开发者能够提前告诉浏览器：“我不调用 <code>preventDefault</code> 函数来阻止事件事件行为”，那么浏览器就能快速生成事件，从而提升页面性能。</p>
<p>Chrome官方有个视频测试：<a href="https://www.youtube.com/watch?v=NPM6172J22g" rel="nofollow noreferrer" target="_blank">https://www.youtube.com/watch...</a> （需科学上网）</p>
<p>而 <code>passive</code> 就是为此而生的。在 WICG 的 demo 中提到，即使滚动事件里面写一个死循环，浏览器也能够正常处理页面的滑动。</p>
<p>在最新的 DOM 规范中，事件绑定函数的第三个参数变成了对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.addEventListener(type, listener[, options]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">target</span><span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-selector-tag">type</span>, <span class="hljs-selector-tag">listener</span><span class="hljs-selector-attr">[, options]</span>);
</code></pre>
<p>我们可以通过传递 <code>passive</code> 为 <code>true</code> 来明确告诉浏览器，事件处理程序不会调用 <code>preventDefault</code> 来阻止默认滑动行为。</p>
<p>在 Chrome 浏览器中，如果发现耗时超过 100 毫秒的非 <code>passive</code> 的监听器，会在 DevTools 里面警告你加上 <code>{passive: true}</code>。</p>
<p>Chrome 51 和 Firefox 49 已经支持 passive 属性。如果浏览器不支持，已经有人做了非常巧妙地 polyfill：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Test via a getter in the options object to see 
// if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener(&quot;test&quot;, null, opts);
} catch (e) {}

// Use our detect's results. 
// passive applied if supported, capture will be false either way.
elem.addEventListener(
  'touchstart',
  fn,
  supportsPassive ? { passive: true } : false
); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Test via a getter in the options object to see </span>
<span class="hljs-comment">// if the passive property is accessed</span>
<span class="hljs-keyword">var</span> supportsPassive = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">var</span> opts = <span class="hljs-built_in">Object</span>.defineProperty({}, <span class="hljs-string">'passive'</span>, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      supportsPassive = <span class="hljs-literal">true</span>;
    }
  });
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"test"</span>, <span class="hljs-literal">null</span>, opts);
} <span class="hljs-keyword">catch</span> (e) {}

<span class="hljs-comment">// Use our detect's results. </span>
<span class="hljs-comment">// passive applied if supported, capture will be false either way.</span>
elem.addEventListener(
  <span class="hljs-string">'touchstart'</span>,
  fn,
  supportsPassive ? { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> } : <span class="hljs-literal">false</span>
); 
</code></pre>
<p>这段代码值得细读，用的太巧妙了，简直炫酷到没朋友。</p>
<p>不过，遗憾的是各大主流框架都还未提供对 <code>passive</code> 的原生支持：</p>
<p>React 框架番号为 #6436 的 issue 从今年 4 月 8 号就开始讨论，官方家加的 label 是 “big picture”。</p>
<p><a href="https://github.com/facebook/react/issues/6436" rel="nofollow noreferrer" target="_blank">Support Passive Event Listeners · Issue #6436 · facebook/react</a></p>
<p>本来我觉得 Angular 应该会提供对 passive 的原生支持，但是我去搜了 issue。编号为 #8866 的 issue 残忍的告诉我 Angular 也正在讨论此事，而且时间比 React 还晚，5月27号。而 label 是 “state: Needs Design”。</p>
<p><a href="https://github.com/angular/angular/issues/8866" rel="nofollow noreferrer" target="_blank">[feat] Take advantage of passive event listeners · Issue #8866 · angular/angular</a></p>
<p>最不应该报什么希望的就是 jQuery 了，毕竟对于一个连事件捕获都不支持的框架来说，很难想象它会支持 passive。</p>
<p>去看了它的 issue，果然是前端最流行的框架，在今年1月17号就有开发者提了相关 issue 了。和 React Angular 不同，这个 issue 并不是 jQuery 开发成员提的。label 是 “Event”、 “Feature”、 “Web Standards”。</p>
<p>从 label 可以看出来对这个特性的重视，但是再看看 milestone 就未免有些心寒——4.0.0。</p>
<p>如果没觉得心寒，可以继续点击进去看看 4.0.0 的开发进度和发布计划：</p>
<p>什么时候发布呢？No due date</p>
<p>开发进度如何呢？0% complete</p>
<p>我之前开发过一个 Chrome 插件 <a href="https://github.com/justjavac/ChromeSnifferPlus" rel="nofollow noreferrer" target="_blank">ChromeSnifferPlus</a>，可以检测当前页面使用了哪些框架，以及框架的版本号等信息。年初的时候我曾分析了一次统计情况，jQuery 版本使用最多的网站是 1.4.<em> 和 1.7.</em>。</p>
<p>最后，也不要悲观，上面只是说了这些框架并没有提供对 passive 的原生支持，并不代表我们就不可以使用了。比如 React 的很多 scroll 组件，都使用了 passive 来提升滚动性能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动Web滚动性能优化: Passive event listeners

## 原文链接
[https://segmentfault.com/a/1190000007913386](https://segmentfault.com/a/1190000007913386)

