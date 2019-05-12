---
title: '【EASYDOM系列教程】之DOM 树结构' 
date: 2019-01-09 2:30:12
hidden: true
slug: mf2fgedjoe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">DOM 树结构</h2>
<p>DOM 之所以可以访问和更新 HTML 页面中的内容、结构和样式，是因为 DOM 将 HTML 页面解析为一个 <strong>树结构</strong>。</p>
<p>例如下面这段代码是一个简单的 HTML 页面源代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>示例页面</title>
</head>
<body>
<h2>这是一个示例页面</h2>
<p id=&quot;p&quot; title=&quot;this is p.&quot;>这是一个段落内容.</p>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>示例页面<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>这是一个示例页面<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"this is p."</span>&gt;</span>这是一个段落内容.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>将上面的 HTML 页面绘制成 DOM 树结构，如下效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVQyWD?w=928&amp;h=413" src="https://static.alili.tech/img/bVQyWD?w=928&amp;h=413" alt="DOM 树结构" title="DOM 树结构" style="cursor: pointer; display: inline;"></span></p>
<p>通过上面的 DOM 树结构，我们可以看到，<code>Document</code> 对象是作为 DOM 树结构的入口。再根据 DOM 树结构的特点，我们就可以定位到 HTML 页面中任意一个元素、属性或文本内容。</p>
<p>浏览器加载并运行 HTML 页面时，会创建 DOM 树结构这个模型。并且 DOM 树结构模型会被存储在浏览器的内存中。</p>
<blockquote><p>当 HTML 页面内容过于庞大和复杂时，生成的 DOM 树结构就越复杂。进而，浏览器加载 HTML 页面的耗时就越长。</p></blockquote>
<h2 id="articleHeader1">什么是节点</h2>
<p>节点（Node）原本是网络术语，表示网络中的连接点。一个网络是由一些节点构成的集合。</p>
<p>在 DOM 树结构中，节点也是很重要的一个概念。简单来说，节点作为 DOM 树结构中的连接点，最终构成了完整的 DOM 树结构。</p>
<h3 id="articleHeader2">DOM 树结构中的节点</h3>
<p>在 DOM 树结构中，主要由以下 4 种节点组成:</p>
<table>
<thead><tr>
<th>节点名称</th>
<th>含义</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>文档节点</td>
<td>表示整个 HTML 页面（相当于 document 对象）</td>
<td>当需要访问任何标签、属性或文本时，都可以通过文档节点进行导航</td>
</tr>
<tr>
<td>元素节点</td>
<td>表示 HTML 页面中的标签（即 HTML 页面的结构）</td>
<td>当访问 DOM 树时，需要从查找元素节点开始</td>
</tr>
<tr>
<td>属性节点</td>
<td>表示 HTML 页面中的开始标签包含的属性</td>
<td> </td>
</tr>
<tr>
<td>文本节点</td>
<td>表示 HTML 页面中的标签所包含的文本内容</td>
<td> </td>
</tr>
</tbody>
</table>
<blockquote><p>除了上面 4 种常见的节点类型以外，DOM 树结构中还具有很多节点类型。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQyWE?w=1282&amp;h=444" src="https://static.alili.tech/img/bVQyWE?w=1282&amp;h=444" alt="节点类型" title="节点类型" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>还有一些节点类型，目前已被废弃（不再使用）。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQyWJ?w=1098&amp;h=317" src="https://static.alili.tech/img/bVQyWJ?w=1098&amp;h=317" alt="废弃的节点类型" title="废弃的节点类型" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">DOM 节点树结构</h2>
<p>通过<strong>节点</strong>概念，我们可以将原本的 DOM 树结构改成 DOM 节点树结构进行表示。</p>
<p><span class="img-wrap"><img data-src="/img/bVQyY7?w=1314&amp;h=587" src="https://static.alili.tech/img/bVQyY7?w=1314&amp;h=587" alt="DOM 节点树结构" title="DOM 节点树结构" style="cursor: pointer; display: inline;"></span></p>
<p>在 DOM 的标准规范中，提供了 <code>Node</code> 对象。该对象主要依靠 DOM 节点树结构中的常见 4 种节点类型，来访问和更新 HTML 页面中的内容。</p>
<blockquote><p>关于 <code>Node</code> 对象，我们会在后面的章节中学习。</p></blockquote>
<h2 id="articleHeader4">节点之间的关系</h2>
<p>DOM 中的 <strong>M</strong> 表示 <strong>Model（模型）</strong>，也可以用来表示 DOM 节点树结构中节点之间的关系。</p>
<p>在 DOM 节点树结构中，主要具有以下三层关系。</p>
<h3 id="articleHeader5">父级与子级</h3>
<p>如果我们将 HTML 页面中某一个元素作为父级的话，那包含在该元素内的第一层所有元素都可以称为该元素的子级。</p>
<p>例如，我们来看一下下面这个 DOM 节点树结构:</p>
<p><span class="img-wrap"><img data-src="/img/bVQyZd?w=1273&amp;h=526" src="https://static.alili.tech/img/bVQyZd?w=1273&amp;h=526" alt="父级与子级的关系" title="父级与子级的关系" style="cursor: pointer; display: inline;"></span></p>
<p>在上面的 DOM 节点树结构中，<code>&lt;html&gt;</code> 元素作为父级，<code>&lt;head&gt;</code> 和 <code>&lt;body&gt;</code> 元素作为子级。</p>
<h3 id="articleHeader6">祖先与后代</h3>
<p>如果我们将 HTML 页面中某一个元素作为祖先的话，那包含在该元素内的所有元素（除子级之外的）都可以称为该元素的后代。</p>
<p>例如，我们来看一下下面这个 DOM 节点树结构:</p>
<p><span class="img-wrap"><img data-src="/img/bVQzLS?w=1274&amp;h=547" src="https://static.alili.tech/img/bVQzLS?w=1274&amp;h=547" alt="祖先与后代的关系" title="祖先与后代的关系" style="cursor: pointer; display: inline;"></span></p>
<p>在上面的 DOM 节点树结构中，<code>&lt;html&gt;</code> 元素作为祖先，<code>&lt;meta&gt;</code>、<code>&lt;title&gt;</code>、<code>&lt;h2&gt;</code> 和 <code>&lt;p&gt;</code> 元素作为后代。</p>
<h3 id="articleHeader7">兄弟关系</h3>
<p>具有相同父级元素的两个或几个元素之间就是兄弟关系。例如，我们来看一下下面这个 DOM 节点树结构:</p>
<p><span class="img-wrap"><img data-src="/img/bVQzLQ?w=1214&amp;h=528" src="https://static.alili.tech/img/bVQzLQ?w=1214&amp;h=528" alt="兄弟关系" title="兄弟关系" style="cursor: pointer; display: inline;"></span></p>
<p>在上面的 DOM 节点树结构中，<code>&lt;meta&gt;</code> 和 <code>&lt;title&gt;</code> 元素就是兄弟关系。因为它们具有相同的父级元素 <code>&lt;head&gt;</code>。</p>
<blockquote><p><strong>值得注意的是:</strong> <code>&lt;title&gt;</code> 和 <code>&lt;h2&gt;</code> 元素并不是兄弟关系。因为它们的父级元素并不是相同元素。</p></blockquote>
<p>DOM 访问和更新 HTML 页面中的内容，主要依靠 DOM 节点树结构中这三种节点关系完成。</p>
<hr>
<p>本教程免费开源，任何人都可以免费学习、分享，甚至可以进行修改。但需要注明作者及来源，并且不能用于商业。</p>
<p>本教程采用<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【EASYDOM系列教程】之DOM 树结构

## 原文链接
[https://segmentfault.com/a/1190000010108217](https://segmentfault.com/a/1190000010108217)

