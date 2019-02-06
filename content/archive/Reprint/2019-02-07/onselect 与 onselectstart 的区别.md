---
title: 'onselect 与 onselectstart 的区别' 
date: 2019-02-07 2:30:16
hidden: true
slug: nwi6w40spue
categories: [reprint]
---

{{< raw >}}

                    
<p>onselect 与 onselectstart 都属于 JavaScript 当中的 DOM 事件，由于它们二者的拼写比较相似，所以最初使用时弄混了两个事件的效果，在此做一个简单的记录。</p>
<h2 id="articleHeader0">背景</h2>
<p>之前在公司的前端项目中，自己写了一个基于 jquery 的分页器，在测试的时候发现了一个问题：当鼠标连续快速点击【下一页】按钮的时候，会将按钮上的文字选中，变成蓝色，体验不是很好。因为当时知道有一个事件是可以控制元素文字是否允许被选中的，但是忘记了怎么用的，于是上网搜索了一番。第一次错将 onselect 事件当成了实现这个效果的事件，试过之后发现不管用，继续研究发现其实应该是用 onselectstart 事件来进行控制。</p>
<h2 id="articleHeader1">二者的区别</h2>
<ul>
<li><p><strong>onselect 事件会在文本框中的文本被选中时发生</strong></p></li>
<li><p><strong>支持该事件的 HTML 标签：</strong><code>&lt;input type="text"&gt;</code>，<code>&lt;textarea&gt;</code></p></li>
<li><p><strong>支持该事件的 JavaScript 对象：</strong><code>window</code></p></li>
<li><p><strong>使用举例：</strong></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; value=&quot;Hello world!&quot; onselect=&quot;alert('你已经选中了文字！')&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"Hello world!"</span> onselect=<span class="hljs-string">"alert('你已经选中了文字！')"</span> /&gt;</code></pre>
<p>即当鼠标的左键划过并选中了 input 输入框中的内容时，就会触发 onselect 事件。</p>
<ul>
<li><p><strong>onselectstart 触发时间为目标对象被开始选中时（即选中动作刚开始，尚未实质性被选中）</strong></p></li>
<li><p><strong>onselectstart 几乎可以用于所有对象</strong></p></li>
<li><p><strong>注意：onselectstart 事件不被 input 和 textarea 标签支持</strong></p></li>
<li><p><strong>使用举例（非 Firefox 浏览器下）：</strong></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div onselectstart=&quot;return false;&quot;>我不能被鼠标选中哦</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> onselectstart=<span class="hljs-string">"return false;"</span>&gt;我不能被鼠标选中哦&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<ul><li><p><strong>Firefox 不支持上面这样的使用方式，在 Firefox 浏览器下可以通过设置 CSS 样式来达到相同的效果</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div { -moz-user-select: none; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">-moz-user-select</span>: none; }</code></pre>
<p>即 onselectstart 事件才是用来实现元素内文本不被选中的正确方法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
onselect 与 onselectstart 的区别

## 原文链接
[https://segmentfault.com/a/1190000005875000](https://segmentfault.com/a/1190000005875000)

