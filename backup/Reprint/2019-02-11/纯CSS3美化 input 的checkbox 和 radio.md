---
title: '纯CSS3美化 input 的checkbox 和 radio' 
date: 2019-02-11 2:30:49
hidden: true
slug: jhh6brg6h2
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">magic-input</h1>
<p>CSS3样式复选框和单选按钮看起来更漂亮。只有一个input元素。<a href="https://jaywcjlove.github.io/magic-input" rel="nofollow noreferrer" target="_blank">在线demo</a><br>源码：<a href="https://github.com/jaywcjlove/magic-input" rel="nofollow noreferrer" target="_blank">https://github.com/jaywcjlove/magic-input</a></p>
<h1 id="articleHeader1">使用</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install magic-input" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install magic-input</code></pre>
<p>你需要引入 <code>dist/magic-input.css</code>或者<code>dist/magic-input.min.css</code> 文件到你的工程或者HTML中。如果你使用<a href="https://github.com/stylus/stylus" rel="nofollow noreferrer" target="_blank">Stylus</a> 你就可以使用 <code>magic-input.styl</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;dist/magic-input.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"dist/magic-input.min.css"</span>&gt;</span></code></pre>
<h2 id="articleHeader2">Checkbox iPhone 的样式</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012965932" src="https://static.alili.tech/img/remote/1460000012965932" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;checkbox&quot; class=&quot;mgc-switch mgc-sm&quot; checked />
<input type=&quot;checkbox&quot; class=&quot;mgc-switch&quot;  />
<input type=&quot;checkbox&quot; class=&quot;mgc-switch mgc-lg&quot; checked />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc-switch mgc-sm"</span> <span class="hljs-attr">checked</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc-switch"</span>  /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc-switch mgc-lg"</span> <span class="hljs-attr">checked</span> /&gt;</span></code></pre>
<h2 id="articleHeader3">Checkbox</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012965933" src="https://static.alili.tech/img/remote/1460000012965933" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;checkbox&quot; class=&quot;mgc&quot; checked/> Default
<input type=&quot;checkbox&quot; class=&quot;mgc mgc-primary&quot; checked /> Primary
<input type=&quot;checkbox&quot; class=&quot;mgc mgc-success&quot; /> Success
<input type=&quot;checkbox&quot; class=&quot;mgc mgc-info&quot; checked /> Info
<input type=&quot;checkbox&quot; class=&quot;mgc mgc-warning&quot; checked /> Warning
<input type=&quot;checkbox&quot; class=&quot;mgc mgc-danger&quot; checked /> Danger" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc"</span> <span class="hljs-attr">checked</span>/&gt;</span> Default
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc mgc-primary"</span> <span class="hljs-attr">checked</span> /&gt;</span> Primary
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc mgc-success"</span> /&gt;</span> Success
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc mgc-info"</span> <span class="hljs-attr">checked</span> /&gt;</span> Info
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc mgc-warning"</span> <span class="hljs-attr">checked</span> /&gt;</span> Warning
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgc mgc-danger"</span> <span class="hljs-attr">checked</span> /&gt;</span> Danger</code></pre>
<h2 id="articleHeader4">Radios</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012965934?w=444&amp;h=209" src="https://static.alili.tech/img/remote/1460000012965934?w=444&amp;h=209" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-sm&quot;/> Default
<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-primary&quot; /> Primary
<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-success mgr-lg&quot; checked/> Success
<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-info mgr-sm&quot; /> Info
<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-warning&quot; /> Warning
<input type=&quot;radio&quot; name=&quot;radio3&quot; class=&quot;mgr mgr-danger mgr-lg&quot; /> Danger" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-sm"</span>/&gt;</span> Default
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-primary"</span> /&gt;</span> Primary
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-success mgr-lg"</span> <span class="hljs-attr">checked</span>/&gt;</span> Success
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-info mgr-sm"</span> /&gt;</span> Info
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-warning"</span> /&gt;</span> Warning
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"radio3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgr mgr-danger mgr-lg"</span> /&gt;</span> Danger</code></pre>
<h2 id="articleHeader5">设置input大小的class</h2>
<p><code>sm</code> 是 <code>small</code>的缩写 , <code>lg</code> 是 <code>large</code>缩写</p>
<p><strong>在 Checkbox中设置下面class</strong></p>
<p><code>mgc-sm</code> <code>mgc-lg</code></p>
<p><strong>在 Radio Button中设置下面</strong></p>
<p><code>mgr-sm</code> <code>mgr-lg</code></p>
<h2 id="articleHeader6">改变颜色的 Class</h2>
<p><strong>在 Checkbox中设置下面class</strong></p>
<p><code>mgc-primary</code> <code>mgc-info</code> <code>mgc-success</code> <code>mgc-warning</code> <code>mgc-danger</code></p>
<p><strong>在 Radio Button中设置下面</strong><br><code>mgr-primary</code> <code>mgr-info</code> <code>mgr-success</code> <code>mgr-warning</code> <code>mgr-danger</code></p>
<p><strong>关注公众号</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVyfa7?w=258&amp;h=258" src="https://static.alili.tech/img/bVyfa7?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯CSS3美化 input 的checkbox 和 radio

## 原文链接
[https://segmentfault.com/a/1190000005024388](https://segmentfault.com/a/1190000005024388)

