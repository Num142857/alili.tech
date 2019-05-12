---
title: '[译]谷歌 HTML/CSS 规范' 
date: 2019-02-03 2:30:39
hidden: true
slug: 20gt9wspour
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文 <a href="https://google.github.io/styleguide/htmlcssguide.xml" rel="nofollow noreferrer" target="_blank">Google HTML/CSS Style Guide</a></p></blockquote>
<h2 id="articleHeader0">背景</h2>
<p>这篇文章定义了 HTML 和 CSS 的格式和代码规范，旨在提高代码质量和协作效率。</p>
<h2 id="articleHeader1">通用样式规范</h2>
<h3 id="articleHeader2">协议</h3>
<p>图片，样式表，脚本及其他媒体文件尽量使用 HTTPS 协议，除非该文件不支持 HTTPS。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended: omits the protocol -->
<script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js&quot;></script>

<!-- Not recommended: uses the HTTP protocol -->
<script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended: omits the protocol --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Not recommended: uses the HTTP protocol --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<script src=&quot;https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended: omits the protocol */
@import '//fonts.googleapis.com/css?family=Open+Sans';

/* Not recommended: uses the HTTP protocol */
@import 'http://fonts.googleapis.com/css?family=Open+Sans';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended: omits the protocol */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">'//fonts.googleapis.com/css?family=Open+Sans'</span>;

<span class="hljs-comment">/* Not recommended: uses the HTTP protocol */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">'http://fonts.googleapis.com/css?family=Open+Sans'</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
@import 'https://fonts.googleapis.com/css?family=Open+Sans';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">'https://fonts.googleapis.com/css?family=Open+Sans'</span>;</code></pre>
<h2 id="articleHeader3">通用格式规范</h2>
<h3 id="articleHeader4">缩进</h3>
<p>一次缩进2个空格，不要使用 tab 或者混合 tab 和空格的缩进。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Fantastic
  <li>Great
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;ul&gt;</span>
  <span class="hljs-section">&lt;li&gt;</span><span class="hljs-attribute">Fantastic</span>
  <span class="hljs-section">&lt;li&gt;</span><span class="hljs-attribute">Great</span>
<span class="hljs-section">&lt;/ul&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".example {
  color: blue;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.example</span> {
  <span class="hljs-attribute">color</span>: blue;
}
</code></pre>
<h3 id="articleHeader5">大小写</h3>
<p>以下都应该用小写：<br>HTML 元素名称，属性，属性值（除非 text/CDATA），CSS 选择器，属性，属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<A HREF=&quot;/&quot;>Home</A>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">A</span> <span class="hljs-attr">HREF</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<img src=&quot;google.png&quot; alt=&quot;Google&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"google.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"Google"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
color: #E5E5E5;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-attribute">color</span>: <span class="hljs-number">#E5E5E5</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
color: #e5e5e5;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-attribute">color</span>: <span class="hljs-number">#e5e5e5</span>;</code></pre>
<h3 id="articleHeader6">结尾空格</h3>
<p>结尾空格不仅多余，而且在比较代码时会更麻烦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<p>What?_" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>What?_</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<p>Yes please." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Yes please.</code></pre>
<h2 id="articleHeader7">通用元规范</h2>
<h3 id="articleHeader8">编码</h3>
<p>在 HTML 中通过 &lt;meta charset="utf-8"&gt; 指定编码方式，CSS 中不需要指定，因为默认是 UTF-8。</p>
<h3 id="articleHeader9">注释</h3>
<p>使用注释来解释代码：包含的模块，功能以及优点。</p>
<h3 id="articleHeader10">任务项</h3>
<p>用 TODO 来标记待办事项，而不是用一些其他的标记，像 @@。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- <span class="hljs-doctag">TODO:</span> remove optional tags --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Apples<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Oranges<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h2 id="articleHeader11">HTML 风格规范</h2>
<h3 id="articleHeader12">文档类型</h3>
<p>HTML 文档应使用 HTML5 的文档类型：&lt;!DOCTYPE html&gt;。<br>孤立标签无需封闭自身，<code>&lt;br&gt;</code> 不要写成 <code>&lt;br /&gt;。</code></p>
<h3 id="articleHeader13">HTML 正确性</h3>
<p>尽可能使用正确的 HTML。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<title>Test</title>
<article>This is only a test." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>This is only a test.</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<!DOCTYPE html>
<meta charset=&quot;utf-8&quot;>
<title>Test</title>
<article>This is only a test.</article>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>This is only a test.<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre>
<h3 id="articleHeader14">语义化</h3>
<p>根据使用场景选择正确的 HTML 元素（有时被错误的称为“标签”）。例如，使用  h1 元素创建标题，p 元素创建段落，a 元素创建链接等等。正确的使用 HTML 元素对于可访问性、可重用性以及编码效率都很重要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<div onclick=&quot;goToRecommendations();&quot;>All recommendations</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"goToRecommendations();"</span>&gt;</span>All recommendations<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<a href=&quot;recommendations/&quot;>All recommendations</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"recommendations/"</span>&gt;</span>All recommendations<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader15">多媒体元素降级</h3>
<p>对于像图片、视频、canvas 动画等多媒体元素，确保提供其他可访问的内容。图片可以使用替代文本（alt），视频和音频可以使用文字版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<img src=&quot;spreadsheet.png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"spreadsheet.png"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<img src=&quot;spreadsheet.png&quot; alt=&quot;Spreadsheet screenshot.&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"spreadsheet.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"Spreadsheet screenshot."</span>&gt;</span></code></pre>
<h3 id="articleHeader16">关注分离</h3>
<p>标记、样式和脚本分离，确保相互耦合最小化。</p>
<h3 id="articleHeader17">实体引用</h3>
<p>如果团队中文件和编辑器使用同样的编码方式，就没必要使用实体引用，如 <code>&amp;mdash;</code>， <code>&amp;rdquo;</code>，<code>&amp;#x263a;</code>，除了一些在 HTML 中有特殊含义的字符（如 &lt; 和 &amp;）以及不可见的字符（如空格）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
The currency symbol for the Euro is &amp;ldquo;&amp;eur;&amp;rdquo;." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
The currency symbol for the Euro is &amp;ldquo;&amp;eur;&amp;rdquo;.</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
The currency symbol for the Euro is “€”." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
The currency symbol for the Euro is “€”.</code></pre>
<h3 id="articleHeader18">type 属性</h3>
<p>在引用样式表和脚本时，不要指定 type 属性，除非不是 CSS 或 JavaScript。<br>因为 HTML5 中已经默认指定样式变的 type 是 text/css，脚本的type 是 text/javascript。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<link rel=&quot;stylesheet&quot; href=&quot;//www.google.com/css/maia.css&quot;
  type=&quot;text/css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//www.google.com/css/maia.css"</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<link rel=&quot;stylesheet&quot; href=&quot;//www.google.com/css/maia.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//www.google.com/css/maia.css"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<script src=&quot;//www.google.com/js/gweb/analytics/autotrack.js&quot;
  type=&quot;text/javascript&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//www.google.com/js/gweb/analytics/autotrack.js"</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<script src=&quot;//www.google.com/js/gweb/analytics/autotrack.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//www.google.com/js/gweb/analytics/autotrack.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader19">HTML 格式规范</h2>
<h3 id="articleHeader20">HTML 引号</h3>
<p>属性值用双引号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Not recommended -->
<a class='maia-button maia-button-secondary'>Sign in</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Not recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'maia-button maia-button-secondary'</span>&gt;</span>Sign in<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Recommended -->
<a class=&quot;maia-button maia-button-secondary&quot;>Sign in</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Recommended --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"maia-button maia-button-secondary"</span>&gt;</span>Sign in<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h2 id="articleHeader21">CSS 风格规范</h2>
<h3 id="articleHeader22">ID 和 Class 命名</h3>
<p>使用有含义的 id 和 class 名称。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended: meaningless */
#yee-1901 {}

/* Not recommended: presentational */
.button-green {}
.clear {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended: meaningless */</span>
<span class="hljs-selector-id">#yee-1901</span> {}

<span class="hljs-comment">/* Not recommended: presentational */</span>
<span class="hljs-selector-class">.button-green</span> {}
<span class="hljs-selector-class">.clear</span> {}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended: specific */
#gallery {}
#login {}
.video {}

/* Recommended: generic */
.aux {}
.alt {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended: specific */</span>
<span class="hljs-selector-id">#gallery</span> {}
<span class="hljs-selector-id">#login</span> {}
<span class="hljs-selector-class">.video</span> {}

<span class="hljs-comment">/* Recommended: generic */</span>
<span class="hljs-selector-class">.aux</span> {}
<span class="hljs-selector-class">.alt</span> {}</code></pre>
<h3 id="articleHeader23">ID 和 Class 命名风格</h3>
<p>id 和 class 应该尽量简短，同时要容易理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
#navigation {}
.atr {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-selector-id">#navigation</span> {}
<span class="hljs-selector-class">.atr</span> {}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
#nav {}
.author {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-id">#nav</span> {}
<span class="hljs-selector-class">.author</span> {}</code></pre>
<h3 id="articleHeader24">选择器</h3>
<p>除非需要，否则不要在 id 或 class 前加元素名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
ul#example {}
div.error {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/* Not recommended */</span>
ul<span class="hljs-selector-id">#example</span> {}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.error</span> {}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
#example {}
.error {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-id">#example</span> {}
<span class="hljs-selector-class">.error</span> {}</code></pre>
<h3 id="articleHeader25">属性简写</h3>
<p>尽量使用 CSS 中可以简写的属性 (如 font)，可以提高编码效率以及代码可读性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-attribute">border-top-style</span>: none;
<span class="hljs-attribute">font-family</span>: palatino, georgia, serif;
<span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
<span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.6</span>;
<span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">2em</span>;
<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">1em</span>;
<span class="hljs-attribute">padding-right</span>: <span class="hljs-number">1em</span>;
<span class="hljs-attribute">padding-top</span>: <span class="hljs-number">0</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-attribute">border-top</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">font</span>: <span class="hljs-number">100%</span>/<span class="hljs-number">1.6</span> palatino, georgia, serif;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">1em</span> <span class="hljs-number">2em</span>;</code></pre>
<h3 id="articleHeader26">0 和单位</h3>
<p>值为 0 时不用添加单位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin: 0;
padding: 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;</code></pre>
<h3 id="articleHeader27">开头的 0</h3>
<p>值在 -1 和 1 之间时，不需要加 0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-size: .8em;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">font-size</span>: .<span class="hljs-number">8em</span>;</code></pre>
<h3 id="articleHeader28">16进制表示法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
color: #eebbcc;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-attribute">color</span>: <span class="hljs-number">#eebbcc</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
color: #ebc;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-attribute">color</span>: <span class="hljs-number">#ebc</span>;</code></pre>
<h3 id="articleHeader29">前缀</h3>
<p>使用带前缀的命名空间可以防止命名冲突，同时提高代码可维护性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".adw-help {} /* AdWords */
#maia-note {} /* Maia */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.adw-help</span> {} <span class="hljs-comment">/* AdWords */</span>
<span class="hljs-selector-id">#maia-note</span> {} <span class="hljs-comment">/* Maia */</span></code></pre>
<h3 id="articleHeader30">ID 和 Class 命名分隔符</h3>
<p>选择器中使用连字符可以提高可读性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended: does not separate the words “demo” and “image” */
.demoimage {}

/* Not recommended: uses underscore instead of hyphen */
.error_status {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended: does not separate the words “demo” and “image” */</span>
<span class="hljs-selector-class">.demoimage</span> {}

<span class="hljs-comment">/* Not recommended: uses underscore instead of hyphen */</span>
<span class="hljs-selector-class">.error_status</span> {}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
#video-id {}
.ads-sample {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-id">#video-id</span> {}
<span class="hljs-selector-class">.ads-sample</span> {}</code></pre>
<h2 id="articleHeader31">CSS 格式规范</h2>
<h3 id="articleHeader32">书写顺序</h3>
<p>按照属性首字母顺序书写 CSS 易于阅读和维护，排序时忽略带有浏览器前缀的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">background</span>: fuchsia;
<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid;
-moz-<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
-webkit-<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
<span class="hljs-attribute">color</span>: black;
<span class="hljs-attribute">text-align</span>: center;
<span class="hljs-attribute">text-indent</span>: <span class="hljs-number">2em</span>;</code></pre>
<h3 id="articleHeader33">块级内容缩进</h3>
<p>为了反映层级关系和提高可读性，块级内容都应缩进。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> screen, projection {

  <span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#444</span>;
  }

}</code></pre>
<h3 id="articleHeader34">声明结束</h3>
<p>每行 CSS 都应以分号结尾。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
.test {
  display: block;
  height: 100px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-selector-class">.test</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
.test {
  display: block;
  height: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-class">.test</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<h3 id="articleHeader35">属性名结尾</h3>
<p>属性名和值之间都应有一个空格。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
h3 {
  font-weight:bold;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-weight</span>:bold;
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
h3 {
  font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<h3 id="articleHeader36">声明样式块的分隔</h3>
<p>在选择器和 {} 之间用空格隔开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended: missing space */
#video{
  margin-top: 1em;
}

/* Not recommended: unnecessary line break */
#video
{
  margin-top: 1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended: missing space */</span>
<span class="hljs-selector-id">#video</span>{
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-comment">/* Not recommended: unnecessary line break */</span>
<span class="hljs-selector-id">#video</span>
{
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1em</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
#video {
  margin-top: 1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-id">#video</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1em</span>;
}</code></pre>
<h3 id="articleHeader37">选择器分隔</h3>
<p>每个选择器都另起一行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
a:focus, a:active {
  position: relative; top: 1px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended */</span>
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:focus</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span> {
  <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">top</span>: <span class="hljs-number">1px</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/* Recommended */</span>
<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.2</span>;
}</code></pre>
<h3 id="articleHeader38">规则分隔</h3>
<p>规则之间都用空行隔开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<h3 id="articleHeader39">CSS 引号</h3>
<p>属性选择器和属性值用单引号，URI 的值不需要引号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Not recommended */
@import url(&quot;//www.google.com/css/maia.css&quot;);

html {
  font-family: &quot;open sans&quot;, arial, sans-serif;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Not recommended */</span>
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">"//www.google.com/css/maia.css"</span>);

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"open sans"</span>, arial, sans-serif;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Recommended */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Recommended */</span>
@<span class="hljs-keyword">import</span> url(//www.google.com/css/maia.css);

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'open sans'</span>, arial, sans-serif;
}</code></pre>
<h2 id="articleHeader40">CSS 元规则</h2>
<h3 id="articleHeader41">分段注释</h3>
<p>用注释把 CSS 分成各个部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

/* Gallery */

.adw-gallery {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* Header */</span>

<span class="hljs-selector-id">#adw-header</span> {}

<span class="hljs-comment">/* Footer */</span>

<span class="hljs-selector-id">#adw-footer</span> {}

<span class="hljs-comment">/* Gallery */</span>

<span class="hljs-selector-class">.adw-gallery</span> {}</code></pre>
<h2 id="articleHeader42">结语</h2>
<p>坚持遵循代码规范。<br>写代码前先看看周围同事的代码，然后决定代码风格。<br>代码规范的意义在于提供一个参照物。这里提供了一份全局的规范，但是你也得参照公司内部的规范，否则阅读你代码的人会很痛苦。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]谷歌 HTML/CSS 规范

## 原文链接
[https://segmentfault.com/a/1190000007023192](https://segmentfault.com/a/1190000007023192)

