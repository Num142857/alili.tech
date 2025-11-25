---
title: 'CSS：区别 px、em、rem' 
date: 2019-02-07 2:30:15
hidden: true
slug: wng1f74svxq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">有何区别</h2>
<ul>
<li><p><code>px</code> 在缩放页面时无法调整那些使用它作为单位的字体、按钮等的大小；</p></li>
<li><p><code>em</code> 的值并不是固定的，会继承父级元素的字体大小，代表倍数；</p></li>
<li><p><code>rem</code> 的值并不是固定的，始终是基于根元素 <code>&lt;html&gt;</code> 的，也代表倍数。</p></li>
</ul>
<h3 id="articleHeader1">em</h3>
<p>em 的使用是相对于其父级的字体大小的，即倍数。浏览器的默认字体高都是 16px，未经调整的浏览器显示 1em = 16px。但是有一个问题，如果设置 1.2em 则变成 19.2px，问题是 px 表示大小时数值会忽略掉小数位的（你想像不出来半个像素吧）。而且 1em = 16px 的关系不好转换，因此，常常人为地使&nbsp;1em = 10px。这里要借助字体的 <code>%</code> 来作为桥梁。</p>
<p>因为默认时字体 16px =&nbsp;100%，则有 10px =&nbsp;62.5%。所以首先在&nbsp;body 中全局声明 font-size=62.5%=10px，也就是定义了网页 body 默认字体大小为 10px，由于 em 有继承父级元素字体大小的特性，如果某元素的父级没有设定字体大小，那么它就继续了 body 默认字体大小&nbsp;1em = 10px。</p>
<p>但是由于 em 是相对于其父级字体的倍数的，当出现有多重嵌套内容时，使用 em 分别给它们设置字体的大小往往要重新计算。比如说你在父级中声明了字体大小为 1.2em，那么在声明子元素的字体大小时设置 1em 才能和父级元素内容字体大小一致，而不是1.2em（避免 1.2*1.2=1.44em）, 因为此 em 非彼 em。再举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>Outer <span>inner</span> outer</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Outer <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>inner<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> outer<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body { font-size: 62.5%; }
span { font-size: 1.6em; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>; }
<span class="hljs-selector-tag">span</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.6em</span>; }</code></pre>
<p>结果：外层 <code>&lt;span&gt;</code> 为 body 字体 10px 的 1.6倍 = 16px，内层 <code>&lt;span&gt;</code> 为外层内容字体 16px 的 1.6倍 = 25px（或26px，不同浏览器取舍小数不同）。</p>
<p>明显地，内部 <code>&lt;span&gt;</code> 内的文字受到了父级 <code>&lt;span&gt;</code> 的影响。基于这点，在实际使用中给我们的计算带来了很大的不便。</p>
<h3 id="articleHeader2">rem</h3>
<p>引述 MDN:</p>
<blockquote><p><strong>rem</strong>&nbsp;values are relative to the root&nbsp;html&nbsp;element, not the parent element.</p></blockquote>
<p>rem 的出现再也不用担心还要根据父级元素的 font-size 计算 em 值了，因为它始终是基于根元素（<code>&lt;html&gt;</code>）的。<br>比如默认的 html font-size=16px，那么想设置 12px 的文字就是：12÷16=0.75(rem)<br>仍然是上面的例子，CSS改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html { font-size: 62.5%; }
span { font-size: 16px; font-size: 1.6rem; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>; }
<span class="hljs-selector-tag">span</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.6rem</span>; }</code></pre>
<p>结果：内外 <code>&lt;span&gt;</code> 的内容均为 16px。</p>
<p>需要注意的是，为了兼容不支持 rem 的浏览器，我们需要在各个使用了 rem 地方前面写上对应的 px 值，这样不支持的浏览器可以优雅降级。<a href="http://caniuse.com/#feat=rem" rel="nofollow noreferrer" target="_blank">兼容性详情</a>。</p>
<p>选择使用什么字体单位主要由你的项目来决定，如果你的用户群都使用最新版的浏览器，那推荐使用 rem，如果要考虑兼容性，那就使用 px，或者两者同时使用。</p>
<p>完。</p>
<h2 id="articleHeader3">参考</h2>
<ul>
<li><p><a href="http://ued.taobao.org/blog/2013/05/rem-font-size/" rel="nofollow noreferrer" target="_blank">淘宝UED：响应式十日谈第一日：使用 rem 设置文字大小</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size" rel="nofollow noreferrer" target="_blank">MDN: font-size</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS：区别 px、em、rem

## 原文链接
[https://segmentfault.com/a/1190000005936910](https://segmentfault.com/a/1190000005936910)

