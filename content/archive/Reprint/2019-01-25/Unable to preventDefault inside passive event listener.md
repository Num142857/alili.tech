---
title: 'Unable to preventDefault inside passive event listener' 
date: 2019-01-25 2:30:24
hidden: true
slug: ffpl5ftnw2u
categories: [reprint]
---

{{< raw >}}

                    
<p>最近做项目经常在 chrome 的控制台看到如下提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code style="word-break: break-word; white-space: initial;">Unable <span class="hljs-keyword">to</span> preventDefault inside passive <span class="hljs-keyword">event</span> listener due <span class="hljs-keyword">to</span> target being treated <span class="hljs-keyword">as</span> passive. See https:<span class="hljs-comment">//www.chromestatus.com/features/5093566007214080</span></code></pre>
<p>于是 Google 了一番，找到这篇文章，有了详细解释。<a href="https://developers.google.com/web/updates/2017/01/scrolling-intervention" rel="nofollow noreferrer" target="_blank">Making touch scrolling fast by default</a></p>
<p>简而言之：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="由于浏览器必须要在执行事件处理函数之后，才能知道有没有掉用过 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟。

所以为了让页面滚动的效果如丝般顺滑，从 chrome56 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove 事件处理函数，会默认为是 passive: true。浏览器忽略 preventDefault() 就可以第一时间滚动了。

举例：
wnidow.addEventListener('touchmove', func) 效果和下面一句一样
wnidow.addEventListener('touchmove', func, { passive: true })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>由于浏览器必须要在执行事件处理函数之后，才能知道有没有掉用过 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟。

所以为了让页面滚动的效果如丝般顺滑，从 chrome56 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove 事件处理函数，会默认为是 passive: <span class="hljs-literal">true</span>。浏览器忽略 preventDefault() 就可以第一时间滚动了。

举例：
wnidow.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">func</span>) 效果和下面一句一样</span>
wnidow.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">func</span>, { <span class="hljs-title">passive</span>: <span class="hljs-title">true</span> })</span></code></pre>
<p>这就导致了一个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果在以上这 3 个元素的 touchstart 和 touchmove 事件处理函数中调用 e.preventDefault() ，会被浏览器忽略掉，并不会阻止默认行为。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">如果在以上这 3 个元素的 <span class="hljs-selector-tag">touchstart</span> 和 <span class="hljs-selector-tag">touchmove</span> 事件处理函数中调用 <span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.preventDefault</span>() ，会被浏览器忽略掉，并不会阻止默认行为。</code></pre>
<p>测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  margin: 0;
  height: 2000px;
  background: linear-gradient(to bottom, red, green);
}

// 在 chrome56 中，照样滚动，而且控制台会有提示，blablabla
window.addEventListener('touchmove', e => e.preventDefault())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">2000px</span>;
  <span class="hljs-attribute">background</span>: linear-gradient(to bottom, red, green);
}

<span class="hljs-comment">// 在 chrome56 中，照样滚动，而且控制台会有提示，blablabla</span>
window.addEventListener(<span class="hljs-string">'touchmove'</span>, e =&gt; e.preventDefault())</code></pre>
<p>那么如何解决这个问题呢？不让控制台提示，而且 preventDefault() 有效果呢？<br>两个方案：<br>1、注册处理函数时，用如下方式，明确声明为不是被动的<br>window.addEventListener('touchmove', func, { passive: false })</p>
<p>2、应用 CSS 属性 <code>touch-action: none;</code> 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。<br>touch-action 还有很多选项，详细请参考<a href="https://w3c.github.io/pointerevents/#the-touch-action-css-property" rel="nofollow noreferrer" target="_blank">touch-action</a></p>
<p>[注]未来可能所有的元素的 touchstart touchmove 事件处理函数都会默认为 passive: true</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Unable to preventDefault inside passive event listener

## 原文链接
[https://segmentfault.com/a/1190000008512184](https://segmentfault.com/a/1190000008512184)

