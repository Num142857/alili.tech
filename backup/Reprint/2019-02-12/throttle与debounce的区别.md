---
title: 'throttle与debounce的区别' 
date: 2019-02-12 2:30:12
hidden: true
slug: bxt83zp42h6
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天看到一篇文章，我的公众号里也分享了《一次发现underscore源码bug的经历以及对学术界拿来主义的思考》具体文章详见，微信公众号：<br><span class="img-wrap"><img data-src="/img/bVuLiV?w=258&amp;h=258" src="https://static.alili.tech/img/bVuLiV?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>文中讲了大家对throttle和debounce存在误解，同时提到了《高程3》中实现节流方法存在一些问题，为了更好的理解这两个概念，搜了很多相关文章，详见文章底部。</p>
<p>throttle与debounce是两个类似的概念，目的都是随着时间的推移控制执行函数的次数，但是有些细微的差别。</p>
<p>当我们为DOM事件关联方法时，若我们有一个debounced和throttled函数将会很方便，为何？因为这样我们可以在事件和执行函数之间添加一层控制，注意我们并没有去控制DOM事件触发的次数。</p>
<p>例如，我们谈一下scroll事件，看下面的例子：</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="xVpoOe" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/xVpoOe/" rel="nofollow noreferrer" target="_blank">Scroll events counter</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/xVpoOe/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>当你在触控板或者鼠标滚动时，每次最少会达到30次，在手机上更多。可是你的滚动事件处理函数对这个频率是否应付的过来？</p>
<p>在2011年，Twitter网站曾爆出一个问题：当你在主页往下滚动时，页面会变得缓慢以致没有响应。John Resig发表了一篇文章<a href="http://ejohn.org/blog/learning-from-twitter/" rel="nofollow noreferrer" target="_blank">《 a blog post about the problem》</a>指出直接在scroll事件上面绑定高消耗的事件是一个多么愚蠢的想法。</p>
<p>在那个时候John建议使用一个独立于scroll事件且每250ms执行的轮询方法。这样的话处理方法就不会耦合于事件。通过这个简单的技术，我们可以提高用户体验。</p>
<p>现在有一些更先进的事件处理方法，让我来给你介绍：__Debounce，Throttle和requestAnimationFrame__，同时会介绍一些适用的场景。</p>
<p><strong>Debounce</strong></p>
<p>Debounce技术使我们可以将一个连续的调用归为一个。</p>
<p><span class="img-wrap"><img data-src="/img/bVuLjf?w=661&amp;h=133" src="https://static.alili.tech/img/bVuLjf?w=661&amp;h=133" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>想象你在电梯的场景，当电梯门开始要关闭的时候，突然一个人进来，此时电梯并不会关闭并且也不会执行改变楼层的方法，如果还有人进来同样的事情会发生：电梯延迟执行它的方法（改变楼层），优化了它的资源。</p>
<p>自己尝试一下，在按钮上点击或者移动鼠标：</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="vGpqLO" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/vGpqLO/" rel="nofollow noreferrer" target="_blank">Debounce. Trailing</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/vGpqLO/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>你可以看到快速连续的事件是如何通过一个debounce事件来表示的。</p>
<p><strong>Leading edge (or "immediate")</strong></p>
<p>你可以发现事件结束的时候，debounce的事件并没有立即执行而是等待了一些时间才触发。为何不立即触发，就像开始没有使用debounce事件处理？直到在连续执行的事件中有一个暂停，才会再次触发。</p>
<p>你可以通过一个__leading__的参数做到：</p>
<p><span class="img-wrap"><img data-src="/img/bVuLjg?w=710&amp;h=195" src="https://static.alili.tech/img/bVuLjg?w=710&amp;h=195" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在underscore.js中，这个参数叫immediate。</p>
<p>自己尝试一下：</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="VaQwRm" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/VaQwRm/" rel="nofollow noreferrer" target="_blank">Debounce. Leading</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/VaQwRm/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p><strong>Debounce Implementations</strong></p>
<p>2009年在<a href="http://unscriptable.com/2009/03/20/debouncing-javascript-methods/" rel="nofollow noreferrer" target="_blank">John Hann的文章</a>中第一次看到debounce的实现方法。</p>
<p>在那之后不久，Ben Alman写了一个<a href="http://benalman.com/projects/jquery-throttle-debounce-plugin/" rel="nofollow noreferrer" target="_blank">jQuery插件</a>(现在不在维护)，一年以后Jeremy Ashkenas把此方法添加到<a href="https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe" rel="nofollow noreferrer" target="_blank">underscore.js</a>中，不久又被添加到lodash中。</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="GZQRLv" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/GZQRLv/" rel="nofollow noreferrer" target="_blank">debounce-click</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/GZQRLv/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>这三种实现方法内部不同，但是接口几乎一致。</p>
<p>有段时间underscore采用了Lodash的实现方法，但是在我发现了一个<a href="http://drupalmotion.com/article/debounce-and-throttle-visual-explanation" rel="nofollow noreferrer" target="_blank">bug</a>之后，自此两个库的实现开始分道扬镳。</p>
<p>Lodash在_.debounce和_.throttle中添加了许多特性。immediate标示替代了leading和trailing。你可以二选一或者都选，默认情况下，只有trailing是开启的。</p>
<p><strong>Debounce Examples</strong></p>
<p>当改变浏览器窗口时，resize事件会触发多次。</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="PNQorE" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/PNQorE/" rel="nofollow noreferrer" target="_blank">Debounce Resize Event Example</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/PNQorE/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>如你所见，我们使用了__trailing__参数，因为我们只对用户停止改变浏览器大小时最后一次事件感兴趣。</p>
<p><strong>AutoComplete中的Ajax请求使用的keypress</strong></p>
<p>当用户仍旧在输入的时候，为何每隔50ms发送Ajax请求？__ _.debounce __可以帮助我们避免额外的工作，只在用户停止输入的时候发送请求。</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="wGyvVj" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/wGyvVj/" rel="nofollow noreferrer" target="_blank">Debouncing keystrokes Example</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/wGyvVj/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>另一个使用场景是在进行input校验的时候，“你的密码太短”等类似的信息。</p>
<p><strong>如何使用debounce和throttle以及常见的陷阱？</strong></p>
<p>可以自己实现这两个方法或者随便复制别人blog中的实现方法，我的建议是直接使用underscore和lodash中的方法。如果你只需要这两个方法，可以定制输出lodash方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g lodash-cli
lodash-cli include=debounce,throttle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>npm i -<span class="hljs-keyword">g</span> lodash-<span class="hljs-keyword">cli</span>
lodash-<span class="hljs-keyword">cli</span> <span class="hljs-keyword">include</span>=debounce,throttle</code></pre>
<p>一个常见的陷阱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// WRONG
$(window).on('scroll', function() {
   _.debounce(doSomething, 300); 
});

// RIGHT
$(window).on('scroll', _.debounce(doSomething, 200));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// WRONG</span>
$(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   _.debounce(doSomething, <span class="hljs-number">300</span>); 
});

<span class="hljs-comment">// RIGHT</span>
$(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, _.debounce(doSomething, <span class="hljs-number">200</span>));</code></pre>
<p>debounce方法赋值给一个变量之后允许我们调用一个私有方法：__debounced_version.cancel()__：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var debounced_version = _.debounce(doSomething, 200);
$(window).on('scroll', debounced_version);

// If you need it
debounced_version.cancel();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> debounced_version = _.debounce(doSomething, <span class="hljs-number">200</span>);
$(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, debounced_version);

<span class="hljs-comment">// If you need it</span>
debounced_version.cancel();</code></pre>
<p><strong>Throttle</strong></p>
<p>使用__ _.throttle __，我们不允许方法在每Xms间执行超过一次。</p>
<p>和debounce的主要区别是throttle保证方法每Xms有规律的执行。</p>
<p><strong>Throttling Examples</strong></p>
<p>一个相当常见的例子，用户在你无限滚动的页面上向下拖动，你需要判断现在距离页面底部多少。如果用户快接近底部时，我们应该发送请求来加载更多内容到页面。</p>
<p>在此__ _.debounce <strong>没有用，因为它只会在用户停止滚动时触发，但我们需要用户快到达底部时去请求。通过</strong> _.throttle __我们可以不间断的监测距离底部多远。</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="xVYbGZ" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/xVYbGZ/" rel="nofollow noreferrer" target="_blank">Infinite scrolling throttled</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/xVYbGZ/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p><strong>requestAnimationFrame (rAF)</strong></p>
<p>requestAnimationFrame是另一个频率限制的方法。</p>
<p>它可以通过__ _.throttle(dosomething, 16)__实现，但为了更加精准浏览器提供了内置API。</p>
<p>我们可以使用rAF API作为throttle方法的替代，考虑一下利弊：</p>
<p>利：</p>
<ul>
<li>目标60fps（16ms每贞），但是内部使用最优的时间间隔来渲染</li>
<li>使用简单并且是标准API，以后不会变动，不需要维护</li>
</ul>
<p>弊：</p>
<ul>
<li>rAF的开始或者取消需要我们自己处理，不像.debounce和.throttle内部实现</li>
<li>浏览器Tag没有激活，它就不会执行</li>
<li>即使多数现代浏览器支持，但是IE9，Opera Mini以及老版本Android依旧不支持。<a href="http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/" rel="nofollow noreferrer" target="_blank">A polyfill</a>到现在依旧<a href="http://caniuse.com/#feat=requestanimationframe" rel="nofollow noreferrer" target="_blank">需要</a>
</li>
<li>rAF在node.js中不支持</li>
</ul>
<p>根据经验，我建议在JS执行"painting"或"animating"中直接操作属性和重新计算元素位置时使用rAF。</p>
<p>发送Ajax请求或者是否添加／删除class（触发一个CSS动画）时，我会考虑debounce和throttle，此时你可以降低执行频率（200ms而不是16ms）。</p>
<p><strong>rAF的例子</strong></p>
<p>在<a href="http://www.html5rocks.com/en/tutorials/speed/animations/" rel="nofollow noreferrer" target="_blank">Paul Lewis的文章</a>激发下，我只在scroll事件中提供例子。</p>
<p>我一步步的调throttle到16ms，希望给一个类似的体验，但是rAF在复杂场景下或许会提供更好的结果。</p>
<p>&lt;p data-height="268" data-theme-id="0" data-slug-hash="qZxEaq" data-default-tab="result" data-user="ghostcode" class="codepen"&gt;See the Pen <a href="http://codepen.io/ghostcode/pen/qZxEaq/" rel="nofollow noreferrer" target="_blank">Scroll comparison requestAnimationFrame vs throttle</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode/pen/qZxEaq/" data-typeid="3">点击预览</button> by ghostcode (<a href="http://codepen.io/ghostcode" rel="nofollow noreferrer" target="_blank">@ghostcode</a><button class="btn btn-xs btn-default ml10 preview" data-url="ghostcode" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;</p>
<p>一个更好的例子我是在headroom.js中看到的，这里通过一个对象封装，进行了<a href="https://github.com/WickyNilliams/headroom.js/blob/3282c23bc69b14f21bfbaf66704fa37b58e3241d/src/Debouncer.js" rel="nofollow noreferrer" target="_blank">逻辑解藕</a>。</p>
<p><strong>总结：</strong><br>使用debounce，throttle和requestAnimationFrame优化你的事件处理函数。每一个方法有一些细微的差别，三个都很有用而且互相弥补。</p>
<ul>
<li>__debounce:__把突然涌进的事件（键盘事件）归位一个</li>
<li>__throttle:__保证持续执行方法分隔为每Xms执行一次。就像每200ms监测滚动位置来触发css动画。</li>
<li>__requestAnimationFrame:__throttle的替代方案，当你的方法需要重新计算和渲染元素同时你需要更平滑的变动或动画。注意：IE9- 不支持。</li>
</ul>
<ol>
<li><a href="https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs" rel="nofollow noreferrer" target="_blank">https://blog.coding.net/blog/...</a></li>
<li><a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/" rel="nofollow noreferrer" target="_blank">https://css-tricks.com/the-di...</a></li>
<li><a href="http://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/ques...</a></li>
<li><a href="http://demo.nimius.net/debounce_throttle/" rel="nofollow noreferrer" target="_blank">http://demo.nimius.net/deboun...</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
throttle与debounce的区别

## 原文链接
[https://segmentfault.com/a/1190000004909376](https://segmentfault.com/a/1190000004909376)

