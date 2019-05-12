---
title: '如何让 H5 体验接近 APP：（一）触摸反馈' 
date: 2019-02-04 2:30:58
hidden: true
slug: rfrak5l8pzg
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVCXXT" src="https://static.alili.tech/img/bVCXXT" alt="触摸反馈" title="触摸反馈" style="cursor: pointer; display: inline;"></span></p>
<p>要说互联网发展趋势，必然会提及一个词汇：H5。从H5游戏，H5站点，H5营销等等。H5跨平台的特性极大地降低了开发成本和推广难度，同时也带来了一个问题： 如何让h5的体验能达到app一样呢？让我们先来看一组对比(京东APP对比京东H5)：</p>
<p><span class="img-wrap"><img data-src="/img/bVCXYM" src="https://static.alili.tech/img/bVCXYM" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVCXYY" src="https://static.alili.tech/img/bVCXYY" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在h5页中，手指接触到列表项时，列表项没有任何反应。而在app中，手指刚接触到列表项时，列表项则从白色背景变为灰色背景。这种交互反馈几乎可以在所有移动端APP中看见，甚至可以说，交互反馈已经成为一种用户习惯。相较之下，h5页虽然有着跨平台的优势，但在细节处理上就差了很多，并且这种交互反馈h5并没有原生支持。react native官方文档有这么一段介绍：</p>
<blockquote><p><strong><a href="http://facebook.github.io/react-native/docs/handling-touches.html#tappable-components" rel="nofollow noreferrer" target="_blank">Tappable Components</a></strong><br>Tappable components should provide feedback that show the user what is handling their touch, and what will happen when they lift their finger. The user should also be able to cancel a tap by dragging their finger away.</p></blockquote>
<p>这段介绍主要是说，原生APP组件中，“可点击组件”就应该对用户的操作做出及时反馈。下面一段话更是直接指出了为什么"web" app doesn't feel 'native'。</p>
<blockquote><p><strong><a href="http://facebook.github.io/react-native/docs/touchablewithoutfeedback.html" rel="nofollow noreferrer" target="_blank">TouchableWithoutFeedback</a></strong><br>Do not use unless you have a very good reason. All the elements that respond to press should have a visual feedback when touched. This is one of the primary reason a "web" app doesn't feel "native".</p></blockquote>
<p>综上所述，我们在开发h5页面的时候，很有必要给页面一些可点击元素加上一些触摸反馈，这样可以大幅度提升页面的整体体验，使h5页体验更为接近APP。去哪网的h5首页便是这么做的:</p>
<p><span class="img-wrap"><img data-src="/img/bVCXZP" src="https://static.alili.tech/img/bVCXZP" alt="去哪网h5首页截图" title="去哪网h5首页截图" style="cursor: pointer; display: inline;"></span></p>
<p>那么，如何在页面上加入这样的反馈呢？目前了解到的有三种方案，总结如下：</p>
<h3 id="articleHeader0">active 伪类</h3>
<p>这种方式大多数前端童鞋都能联想到，因为PC web就是这样定义这种反馈的，那么在移动端，这个方案如何呢？我们先来看看w3c对:active的定义：</p>
<blockquote><p><strong><a href="https://www.w3.org/TR/css3-selectors/#the-user-action-pseudo-classes-hover-act" rel="nofollow noreferrer" target="_blank">the-user-action-pseudo-classes-hover-act</a></strong><br>The <code>:active</code> pseudo-class applies while an element is being activated by the user. For example, between the times the user presses the mouse button and releases it. On systems with more than one mouse button, <code>:active</code> applies only to the primary or primary activation button (typically the "left" mouse button), and any aliases thereof.</p></blockquote>
<p>可以看到，w3c标准里对它的描述都是基于mouse事件的，完全没有说明如何支持touch事件。而正是由于标准对此并没有一个准确定义，浏览器对此的理解和实际支持也是参差不齐。</p>
<p>在实际应用中，active伪类在移动端的表现也不是太好，在ios系统中甚至需要"hack"才能正常使用。若仔细看MDN对active伪类介绍，会发现下面这一段话：</p>
<blockquote><p><strong><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:active" rel="nofollow noreferrer" target="_blank">MDN :active</a></strong><br>[1] By default, Safari Mobile does not use the <code>:active</code> state unless there is a <code>touchstart</code> event handler on the relevant element or on the <code>&lt;body&gt;</code>.</p></blockquote>
<p>也就是说，在iOS中，我们需要绑定一个touchstart事件来激活这一行为。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchstart', function(){});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});</code></pre>
<p>经过反复测试，得出结论如下:</p>
<ol>
<li><p>安卓机型上触发反馈会有延迟。和click的300ms延迟一样。</p></li>
<li><p>ios上按住反馈元素后再将手指移出元素，反馈效果依然还在。(正常情况，手指移出元素应当取消反馈效果)</p></li>
</ol>
<p>测试demo: <a href="http://www.dearhaoge.com/touchFeedback/demo/delay-test.html" rel="nofollow noreferrer" target="_blank">http://www.dearhaoge.com/touchFeedback/demo/delay-test.html</a></p>
<h3 id="articleHeader1">a 标签包裹</h3>
<p>在移动端，有个还在草案中的属性-webkit-tap-highlight-color，定义了点击一个超链接显示的颜色。MDN上描述如下：</p>
<blockquote><p><strong><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-tap-highlight-color" rel="nofollow noreferrer" target="_blank">-webkit-tap-highlight-color</a></strong><br><code>-webkit-tap-highlight-color</code> is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on.</p></blockquote>
<p>所以，我们可以在需要反馈的元素上包裹一层a标签，然后设置这个属性。缺点是只能设置颜色和透明图(rgba)。如果想要设置一些动画效果(比如去哪网首页的缩放效果)，这个方案也是不适用的。</p>
<h3 id="articleHeader2">自定义添加 class</h3>
<p>第三个方法通过自定义touch事件来触发反馈，具体方法如下文所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVCX1A" src="https://static.alili.tech/img/bVCX1A" alt="press and hold" title="press and hold" style="cursor: pointer;"></span></p>
<p>在touchstart触发的时候，给元素加上class(比如图中是波纹效果)并且在手指持续放在元素上的时候保持class不被移除。</p>
<p><span class="img-wrap"><img data-src="/img/bVCX1M" src="https://static.alili.tech/img/bVCX1M" alt="Moving out or leave" title="Moving out or leave" style="cursor: pointer;"></span></p>
<p>touchmove移出元素或者触发滚动条时移除class。当然,touchend和touchcancel也必须移除反馈class。</p>
<h3 id="articleHeader3">总结</h3>
<p>如果只是想要简单实现的话，可以选择前两种方案，配置相对简单。追求良好体验的童鞋推荐第三种方案，第三种方案整体思想不是很复杂，但也不能对所有的交互元素都单独配置一次，这样也有失代码的优雅。</p>
<p>经过思考和折腾，本人提出了一个方案--&gt;touchFeedback.js，在用户体验和开发体验之间取了一个平衡，这里是一些使用touchFeedback.js做的反馈效果(PC需要模拟手机查看)：一些<a href="http://www.dearhaoge.com/touchFeedback/demo/cool-feedbacks.html" rel="nofollow noreferrer" target="_blank">有趣的反馈效果</a></p>
<p>项目地址： <a href="https://github.com/backToNature/touchFeedback" rel="nofollow noreferrer" target="_blank">https://github.com/backToNature/touchFeedback</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何让 H5 体验接近 APP：（一）触摸反馈

## 原文链接
[https://segmentfault.com/a/1190000006864910](https://segmentfault.com/a/1190000006864910)

