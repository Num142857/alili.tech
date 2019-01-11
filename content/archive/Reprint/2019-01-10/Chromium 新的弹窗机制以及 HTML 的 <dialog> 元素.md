---
title: 'Chromium 新的弹窗机制以及 HTML 的 <dialog> 元素' 
date: 2019-01-10 2:30:08
hidden: true
slug: ved5wxurdj
categories: [reprint]
---

{{< raw >}}

                    
<p>自 1995 年 JavaScript 诞生之初，就包含了 3 个方法 <code>alert()</code>、<code>confirm()</code> 和 <code>prompt()</code>。在随后的 Chrome 版本中，Chrome 团队一直在修改原生弹窗的表现。</p>
<p>但是这种阻断式的弹窗总被各种广告网站恶意使用，因为只要弹窗出现，JavaScript 引擎就会一直等待，知道用户操作。所以这种原生弹窗的最大用处不是用来提示用户信息，而是<a href="https://twitter.com/fugueish/status/702684718303588352" rel="nofollow noreferrer" target="_blank">伤害用户(Tech support scammers use subdomain trick to defeat blocking)</a>。</p>
<p>因此 Chromium 团队强烈建议你不要使用这类弹窗。</p>
<p>而弹窗和 <code>onbeforeunload</code> 事件相结合之后那简直就是大杀器，而此类弹窗经常被用来提示浏览者xxxx。</p>
<p>Chromium 团队在 Chrome 51 中移除了对 <code>onbeforeunload</code> 弹窗的支持。在此之前 Safari 9.1 和 Firefox 4 早就已经移除了。当我们在 <code>onbeforeunload</code> 事件中调用 <code>alert</code> 时，会在 devtools 中产生警告：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Blocked alert('before unload') during beforeunload.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">Blocked </span>alert(<span class="hljs-string">'before unload'</span>) during <span class="hljs-keyword">beforeunload.
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPVBw?w=374&amp;h=25" src="https://static.alili.tech/img/bVPVBw?w=374&amp;h=25" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>除此之外，<code>alert()</code>、<code>confirm()</code>、<code>prompt()</code> 的行为也做了改变，不再作为顶级的原生弹窗而存在，当弹窗所在的浏览器标签被切走后，它们会自动消失。(Safari 9.1 说：“你怎么到现在才来学啊！”) </p>
<p>Chromium 在官方博客中说到：</p>
<blockquote><p>对于 <code>alert()/confirm()/prompt()</code> 我们有很多替代的选择。 譬如需要弹个通知消息时（日历应用）可以用Notifications API。 获取用户输入可以用 HTML 中的 <code>&lt;dialog&gt;</code> 元素。 对于 XSS proofs-of-concept 则可用 <code>console.log(document.origin)</code>。</p></blockquote>
<p><code>&lt;dialog&gt;</code> 作为 <a href="http://w3c.github.io/html/interactive-elements.html#the-dialog-element" rel="nofollow noreferrer" target="_blank">HTML 5.2</a> 的元素，目前除了 Chrome 和 Opara 以外，其它浏览器均未支持。但是 Google 提供了一个 <a href="https://github.com/GoogleChrome/dialog-polyfill" rel="nofollow noreferrer" target="_blank">dialog-polyfill</a>。</p>
<p>一个最简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dialog>This is da dialog!</dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>&gt;</span>This is da dialog!<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></code></pre>
<p>这段 html 什么也不显示，开发者需要使用 javascript 的 API <code>.show()</code> 和 <code>.close()</code> 来控制 dialog 的显示和隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dialog>
  <p>This is da dialog!</p>
  <button id=&quot;close&quot;>Close</button>
</dialog>

<button id=&quot;show&quot;>Open Dialog!</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is da dialog!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"close"</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span>&gt;</span>Open Dialog!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dialog = document.querySelector('dialog');

document.querySelector('#show').onclick = function() {
  dialog.show();
};

document.querySelector('#close').onclick = function() {
  dialog.close();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dialog = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'dialog'</span>);

<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#show'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  dialog.show();
};

<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#close'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  dialog.close();
};</code></pre>
<p><a href="https://jsfiddle.net/m1dzstxo/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/m1dzstxo/</a><button class="btn btn-xs btn-default ml10 preview" data-url="m1dzstxo/" data-typeid="0">点击预览</button></p>
<p>点击按钮会出现一个弹窗（非常丑）</p>
<p><span class="img-wrap"><img data-src="/img/bVPVD3?w=206&amp;h=135" src="https://static.alili.tech/img/bVPVD3?w=206&amp;h=135" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>不过 dialog 作为一个 html 标签，是可以使用 css 的。我们给它加一段 css 样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dialog {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">dialog</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">3px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
}</code></pre>
<p><a href="https://jsfiddle.net/m1dzstxo/1/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/m1dzstxo/1/</a><button class="btn btn-xs btn-default ml10 preview" data-url="m1dzstxo/1/" data-typeid="0">点击预览</button></p>
<p>再点击按钮，弹窗了一个稍微漂亮点的弹窗：</p>
<p><span class="img-wrap"><img data-src="/img/bVPVEy?w=206&amp;h=134" src="https://static.alili.tech/img/bVPVEy?w=206&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们还可以使用 <code>.showModal()</code> 弹窗一个模态对话框，当我们关闭弹窗时触发 <code>close</code> 事件。我们还可以使用 ESC 键关闭一个弹窗，此时会触发 <code>cancel</code> 事件。和其它所有事件一样，我们可以通过调用 <code>event.preventDefault()</code> 来阻止默认行为。</p>
<p>直接弹窗一个模态窗口是不够友好的，有时我们需要把背景虚化：</p>
<p><span class="img-wrap"><img data-src="/img/bVPVFw?w=640&amp;h=499" src="https://static.alili.tech/img/bVPVFw?w=640&amp;h=499" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过使用 CSS 的伪元素 <code>::backdrop</code> 很容易就可以做到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dialog::backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">dialog</span><span class="hljs-selector-pseudo">::backdrop</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
}</code></pre>
<p>为什么使用 <code>&lt;dialog&gt;</code> 元素而不是第三方的 javascript 库？</p>
<p>我觉得两者并不冲突，目前大部分 javascript 库都是使用 <code>&lt;div&gt;</code> 来模拟弹窗，当更多的浏览器开始支持 <code>&lt;dialog&gt;</code> 时，第三方的 javascript 库也会考虑使用 <code>&lt;dialog&gt;</code> 作为首先的弹窗方式的，毕竟 <code>&lt;dialog&gt;</code> 是 HTML 5.2 规范中的。</p>
<p>相比 <code>&lt;div&gt;</code> 而言，<code>&lt;dialog&gt;</code> 更大强大，也更加符合规范。比如 <code>&lt;dialog&gt;</code> 的模态弹窗可以保证即使全屏的情况下，弹窗可以保持在最顶层(top-layer)。top-layer 定义在 whatwg 的 Fullscreen API 中，可以配合伪元素 <code>::backdrop</code> 以及伪类 <code>:fullscreen</code> 一起使用。</p>
<p>开发面向未来的前端，当有 polyfill 方案时，我们应该总是使用最新标准。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chromium 新的弹窗机制以及 HTML 的 <dialog> 元素

## 原文链接
[https://segmentfault.com/a/1190000009954183](https://segmentfault.com/a/1190000009954183)

