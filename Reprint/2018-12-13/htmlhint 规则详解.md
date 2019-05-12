---
title: 'htmlhint 规则详解' 
date: 2018-12-13 2:30:07
hidden: true
slug: 40i69nnd3ar
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">HTML 静态检查规则</h1>
<p>HTMLHint 工具内置 23 条规则，可以对 HTML 代码文件进行静态代码检查，从而提高 HTML 代码编写的规范和质量。现在把 23 条规则翻译如下。</p>
<h2 id="articleHeader1">一、规则列表</h2>
<ol>
<li>标签名<strong>必须</strong>小写</li>
<li>属性名<strong>必须</strong>小写</li>
<li>属性值<strong>必须</strong>放在双引号中</li>
<li>属性值<strong>一定不可</strong>为空</li>
<li>属性值<strong>一定不可</strong>重复</li>
<li>Doctype<strong>必须</strong>是 HTML 文档的第一行</li>
<li>标签<strong>必须</strong>成对</li>
<li>标签<strong>必须</strong>自封闭</li>
<li>特殊字符<strong>必须</strong>
</li>
<li>ID 属性<strong>必须</strong>唯一</li>
<li>src 属性<strong>一定不可</strong>为空</li>
<li>title 属性<strong>必须</strong>出现在标签中</li>
<li>img 标签<strong>必须</strong>包含 alt 属性</li>
<li>Doctype <strong>必须</strong>是 HTML5</li>
<li>ID 和 Class 的命名规则<strong>必须</strong>统一</li>
<li>
<strong>不该</strong>使用样式标签</li>
<li>
<strong>不该</strong>使用行内样式</li>
<li>
<strong>不该</strong>使用行内脚本</li>
<li>空格和制表符<strong>一定不可</strong>混合在行前</li>
<li>ID 和 Class <strong>一定不可</strong>使用广告关键词</li>
<li>href <strong>必须</strong>是绝对路径或者相对路径</li>
<li>属性值<strong>一定不可</strong>使用不安全字符</li>
<li>script 标签<strong>不该</strong>使用在头部</li>
</ol>
<h2 id="articleHeader2">二、规则解读</h2>
<p><code>1.</code> 标签名<strong>必须</strong>小写</p>
<ul>
<li>规则 ID: <code>tagname-lowercase</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span><div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<SPAN><BR>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">SPAN</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">BR</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>2.</code> 属性名<strong>必须</strong>小写</p>
<ul>
<li>规则 ID: <code>attr-lowercase</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;test.png&quot; alt=&quot;test&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"test"</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img SRC=&quot;test.png&quot; ALT=&quot;test&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">SRC</span>=<span class="hljs-string">"test.png"</span> <span class="hljs-attr">ALT</span>=<span class="hljs-string">"test"</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
<li>
<code>['viewBox', 'test']</code>: 忽略一些属性名</li>
</ol>
</li>
</ul>
<p><code>3.</code> 属性值<strong>必须</strong>放在双引号中</p>
<ul>
<li>规则 ID: <code>attr-value-double-quotes</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;&quot; title=&quot;abc&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"abc"</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href='' title=abc>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">''</span> <span class="hljs-attr">title</span>=<span class="hljs-string">abc</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>4.</code> 属性值<strong>一定不可</strong>为空<br>标签中使用的属性<strong>必须</strong>设置值，<strong>一定不可</strong>为空。</p>
<ul>
<li>规则 ID: <code>attr-value-not-empty</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; disabled=&quot;disabled&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"disabled"</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; disabled>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">disabled</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>5.</code> 属性值<strong>一定不可</strong>重复</p>
<ul>
<li>同一个标签中，同一个属性<strong>一定不可</strong>多次赋值。</li>
<li>规则 ID: <code>attr-no-duplication</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;a.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"a.png"</span> /&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;a.png&quot; src=&quot;b.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"a.png"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"b.png"</span> /&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>6.</code> Doctype <strong>必须</strong>是 HTML 文档的第一行</p>
<ul>
<li>规则 ID: <code>doctype-first</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML><html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--comment--><!DOCTYPE HTML><html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">&lt;!--comment--&gt;</span><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>7.</code> 标签<strong>必须</strong>成对</p>
<ul>
<li>规则 ID: <code>tag-pair</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul><li></li></ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul><li></ul>
<ul></li></ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>8.</code> 标签<strong>必须</strong>自封闭</p>
<ul>
<li>空标签<strong>必须</strong>自封闭</li>
<li>规则 ID: <code>tag-self-close</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<br />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<br>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>9.</code> 特殊字符<strong>必须</strong>转义</p>
<ul>
<li>规则 ID: <code>spec-char-escape</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>aaa&amp;gt;bbb&amp;lt;ccc</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>aaa&amp;gt;bbb&amp;lt;ccc<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>aaa>bbb<ccc</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>aaa&gt;bbb<span class="hljs-tag">&lt;<span class="hljs-name">ccc</span>&lt;/<span class="hljs-attr">span</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>10.</code> ID 属性<strong>必须</strong>唯一</p>
<ul>
<li>同一个 HTML 文档中 ID 属性<strong>必须</strong>唯一。</li>
<li>规则 ID: <code>id-unique</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;id1&quot;></div><div id=&quot;id2&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"id1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"id2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;id1&quot;></div><div id=&quot;id1&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"id1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"id1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>11.</code> src 属性<strong>一定不可</strong>为空</p>
<ul>
<li>img、script 或 link 标签的 src 属性<strong>一定不可</strong>为空，因为空的 src 属性会导致当前页面被访问两次。</li>
<li>规则 ID: <code>src-not-empty</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;test.png&quot; />
<script src=&quot;test.js&quot;></script>
<link href=&quot;test.css&quot; type=&quot;text/css&quot; />
<embed src=&quot;test.swf&quot;>
<bgsound src=&quot;test.mid&quot; />
<iframe src=&quot;test.html&quot;>
<object data=&quot;test.swf&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.png"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"test.css"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">embed</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.swf"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">bgsound</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.mid"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.html"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">object</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"test.swf"</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src />
<script src=&quot;&quot;></script>
<script src></script>
<link href=&quot;&quot; type=&quot;text/css&quot; />
<link href type=&quot;text/css&quot; />
<embed src=&quot;&quot;>
<embed src>
<bgsound src=&quot;&quot; />
<bgsound src />
<iframe src=&quot;&quot;>
<iframe src>
<object data=&quot;&quot;>
<object data>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">embed</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">embed</span> <span class="hljs-attr">src</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">bgsound</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">bgsound</span> <span class="hljs-attr">src</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">object</span> <span class="hljs-attr">data</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">object</span> <span class="hljs-attr">data</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>12.</code> title 标签<strong>必须</strong>出现</p>
<ul>
<li>title 标签必须出现在 head 标签中。</li>
<li>规则 ID: <code>title-require</code>
</li>
<li>级别: <code>error</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html><head><title>test</title></head></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html><head></head></html>
<html><head><title></title></head></html>
<html><title></title><head></head></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>13.</code> alt 属性<strong>必须</strong>有值</p>
<ul>
<li>img 标签<strong>必须</strong>有 alt 属性值，并且 area[href] 标签和 input[type="image"] 标签的 alt 属性也<strong>必须</strong>赋值。</li>
<li>规则 ID: <code>alt-require</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;test.png&quot; alt=&quot;test&quot;>
<input type=&quot;image&quot; alt=&quot;test&quot;>
<area shape=&quot;circle&quot; coords=&quot;180,139,14&quot; href=&quot;test.html&quot; alt=&quot;test&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"test"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"test"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">area</span> <span class="hljs-attr">shape</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">coords</span>=<span class="hljs-string">"180,139,14"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"test.html"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"test"</span> /&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;test.png&quot;>
<input type=&quot;image&quot;>
<area shape=&quot;circle&quot; coords=&quot;180,139,14&quot; href=&quot;test.html&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.png"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">area</span> <span class="hljs-attr">shape</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">coords</span>=<span class="hljs-string">"180,139,14"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"test.html"</span> /&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>14.</code> Doctype <strong>必须</strong>是 HTML5</p>
<ul>
<li>规则 ID: <code>doctype-html5</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>15.</code> ID 和 Class 的命名规则<strong>必须</strong>统一</p>
<ul>
<li>可以是单词加下划线、单词加连字符或者驼峰方式，但是<strong>必须</strong>采用一种规则，整个 HTML 文档，甚至整个项目<strong>必须</strong>统一。</li>
<li>规则 ID: <code>id-class-value</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="underline: <div id=&quot;aaa_bbb&quot;>
dash: <div id=&quot;aaa-bbb&quot;>
hump: <div id=&quot;aaaBbb&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">underline: <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aaa_bbb"</span>&gt;</span>
dash: <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aaa-bbb"</span>&gt;</span>
hump: <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aaaBbb"</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>underline: 下划线方式（aaa_bb）</li>
<li>dash: 启用规则（aaa-bb）</li>
<li>hump: 启用规则（aaBbb）</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>16.</code> <strong>不该</strong>使用样式标签</p>
<ul>
<li>规则 ID: <code>style-disabled</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head><style type=&quot;text/css&quot;></style></head>
<body><style type=&quot;text/css&quot;></style></body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>17.</code> <strong>不该</strong>使用行内样式</p>
<ul>
<li>规则 ID: <code>inline-style-disabled</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;color:red&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:red"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>18.</code> <strong>不该</strong>使用行内脚本</p>
<ul>
<li>规则 ID: <code>inline-script-disabled</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;test.gif&quot; onclick=&quot;alert(1);&quot;>
<img src=&quot;javascript:alert(1)&quot;>
<a href=&quot;javascript:alert(1)&quot;>test1</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.gif"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert(1);"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"javascript:alert(1)"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:alert(1)"</span>&gt;</span>test1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>19.</code> 空格和制表符<strong>一定不可</strong>混合在行前</p>
<ul>
<li>
<strong>必须</strong>使用空格做为代码缩进的前导字符，缩进的数量<strong>必须</strong>整个 HTML 文档统一，甚至整个项目<strong>必须</strong>统一。</li>
<li>规则 ID: <code>space-tab-mixed-disabled</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="→→<img src=&quot;tab.png&quot; />
········<img src=&quot;space.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">→→<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"tab.png"</span> /&gt;</span>
········<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"space.png"</span> /&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="→····<img src=&quot;tab_before_space.png&quot; />
····→<img src=&quot;space_before_tab.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">→····<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"tab_before_space.png"</span> /&gt;</span>
····→<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"space_before_tab.png"</span> /&gt;</span></code></pre>
</li>
<li>说明：上面的实例代码，·表示空格，→表示制表符</li>
<li>
<p>配置值：</p>
<ol>
<li>space: 空格方式（只有空格缩进）</li>
<li>space4: 空格方式并且要求缩进空格个数</li>
<li>tab: 制表符方式（只有制表符缩进）</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>20.</code> ID 和 Class <strong>一定不可</strong>使用 ad 关键词</p>
<ul>
<li>使用 ad 关键词的 ID 或 Class，会被广告拦截软件屏蔽</li>
<li>规则 ID: <code>id-class-ad-disabled</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;adcontainer&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"adcontainer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;ad-container&quot;></div>
<div id=&quot;ad_container&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ad-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ad_container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>21.</code> href <strong>必须</strong>是绝对路径或者相对路径</p>
<ul>
<li>规则 ID: <code>href-abs-or-rel</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="abs: <a href=&quot;http://www.alibaba.com/&quot;>test1</a`<a href=&quot;https://www.alipay.com/&quot;>test2</a>
rel: <a href=&quot;test.html&quot;>test1</a`<a href=&quot;../test.html&quot;>test2</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">abs: <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.alibaba.com/"</span>&gt;</span>test1<span class="hljs-tag">&lt;/<span class="hljs-name">a`</span>&lt;<span class="hljs-attr">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.alipay.com/"</span>&gt;</span>test2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
rel: <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"test.html"</span>&gt;</span>test1<span class="hljs-tag">&lt;/<span class="hljs-name">a`</span>&lt;<span class="hljs-attr">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../test.html"</span>&gt;</span>test2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>abs: 绝对路径方式</li>
<li>rel: 相对路径方式</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>22.</code> 属性值<strong>一定不可</strong>使用不安全字符</p>
<ul>
<li>规则 ID: <code>attr-unsafe-chars</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li><a href=&quot;https://vimeo.com/album/1951235/video/56931059&quot;>Sud Web 2012</a></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://vimeo.com/album/1951235/video/56931059"</span>&gt;</span>Sud Web 2012<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li><a href=&quot;https://vimeo.com/album/1951235/video/56931059‎\u0009‎&quot;>Sud Web 2012</a></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://vimeo.com/album/1951235/video/56931059‎\u0009‎"</span>&gt;</span>Sud Web 2012<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
</li>
<li>说明：通常不安全字符都在 href 属性值的尾部</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>
<p><code>23.</code> script 标签<strong>不该</strong>使用在头部</p>
<ul>
<li>规则 ID: <code>attr-unsafe-chars</code>
</li>
<li>级别: <code>warning</code>
</li>
<li>
<p>符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body><script type=&quot;text/javascript&quot; src=&quot;test.js&quot;></script></body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
</li>
<li>
<p>不符合规范的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head><script type=&quot;text/javascript&quot; src=&quot;test.js&quot;></script></head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
</li>
<li>
<p>配置值：</p>
<ol>
<li>true: 启用规则</li>
<li>false: 禁用规则</li>
</ol>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
htmlhint 规则详解

## 原文链接
[https://segmentfault.com/a/1190000013276858](https://segmentfault.com/a/1190000013276858)

