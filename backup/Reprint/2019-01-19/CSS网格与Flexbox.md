---
title: 'CSS网格与Flexbox' 
date: 2019-01-19 2:30:10
hidden: true
slug: bot7kfnns7
categories: [reprint]
---

{{< raw >}}

            <h1>CSS网格与Flexbox - 我应该使用哪一个？</h1>
<p>几天前，我阅读了一篇关于<strong><em>CSS网格系统的文章。</em></strong>但作为开发人员，你真的不知道在你真正尝试之前有什么用处。所以让我们来尝试一下。我将创建两个基本设计。一个使用<strong><em>Flexbox</em></strong>，另一个使用<strong><em>网格系统。</em></strong></p>
<p><img src="https://p0.ssl.qhimg.com/t01c708efcf4585a806.png" alt=""></p>
<p>使用Flexbox构建布局实际上只是帮助你将两个项目放在一起，这意味着它将所有子元素都变成了“伪内联元素”（刚刚提出）。这也意味着你必须考虑如何放置HTML元素。每个 <strong><em>div-Element</em></strong>，即将成为一排的使用<strong><em>Flexbox</em></strong>将变成一个容器。我最终得到了我的基本布局和代码：</p>
<pre><code class="hljs scss"><span class="hljs-comment">// HTML Structure     </span>
<span class="hljs-selector-tag">Header</span> <span class="hljs-attribute">Content</span>                                        
Main <span class="hljs-attribute">Content</span>               
Main <span class="hljs-attribute">Content</span>                        
<span class="hljs-selector-tag">Footer</span> <span class="hljs-attribute">Content</span>                
Sidebar <span class="hljs-attribute">Content</span>    <span class="hljs-comment">//</span>
</code></pre><pre><code class="hljs 1c"><span class="hljs-comment">// CSS</span>
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">html</span> {    <span class="hljs-attribute">background</span>: darkred;
<span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>}
</code></pre><pre><code class="hljs stylus"><span class="hljs-selector-tag">footer</span>, <span class="hljs-selector-tag">header</span> {    <span class="hljs-attribute">height</span>: <span class="hljs-number">26vh</span>;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.box</span> {    <span class="hljs-attribute">color</span>: darkred;
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(233, 233, 233);
<span class="hljs-attribute">text-align</span>: center;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">2em</span> <span class="hljs-number">1em</span>;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.mainContainer</span> {    <span class="hljs-attribute">height</span>: <span class="hljs-number">26vh</span>;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.flex</span> {    <span class="hljs-attribute">display</span>: flex;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.contentContainer</span> {    <span class="hljs-attribute">flex</span>: <span class="hljs-number">2</span>;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">sidebar</span> {    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">52vh</span>;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.flex</span> &gt; <span class="hljs-selector-tag">main</span>, <span class="hljs-selector-tag">section</span> {    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;}
</code></pre><p>现在让我们看看网格方法。</p>
<blockquote>
<p>CSS网格布局是CSS中最强大的布局系统。这是一个二维系统，这意味着它可以同时处理列和行，不像flexbox，它主要是一维系统。 --Chris House</p>
</blockquote>
<p>Chris House指出最重要的区别.<em>（全文：</em> <a href="https://css-tricks.com/snippets/css/complete-guide-grid/_)">https://css-tricks.com/snippets/css/complete-guide-grid/_)</a>_
我们可以使用Grid创建二维布局！我可以直接进入CSS并决定它应该是什么样子，放置HTML时可以少关注结构。一般来说，你可以设置模板行和模板列，并给它们一个宽度和高度。此外，您可以决定行元素中的哪一列应该开始和结束。但是我经历过在<strong><em>CSS-Grid</em></strong>中有一个超级强大的方法。它使用 <strong><em>Grid-Areas</em></strong>。命名每个CSS类，并直接与这些名称建立一个模板。看一下这个：</p>
<pre><code class="hljs scss"><span class="hljs-comment">// HTML Structure             </span>
<span class="hljs-selector-tag">Header</span> <span class="hljs-attribute">Content</span>        
Main <span class="hljs-attribute">Content</span>        
Main <span class="hljs-attribute">Content</span>        
Sidebar <span class="hljs-attribute">Content</span>       
<span class="hljs-selector-tag">Footer</span> <span class="hljs-attribute">Content</span>    
</code></pre><pre><code class="hljs 1c"><span class="hljs-comment">// CSS</span>
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">html</span> {    <span class="hljs-attribute">background</span>: darkred;
<span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.gridContainer</span> {    <span class="hljs-attribute">display</span>: grid;
<span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">5px</span>;
</code></pre><pre><code class="hljs vbnet">/* we <span class="hljs-keyword">set</span> up a <span class="hljs-built_in">string</span> <span class="hljs-keyword">for</span> <span class="hljs-keyword">each</span> row <span class="hljs-keyword">in</span> the Layout. Every row has <span class="hljs-keyword">to</span> have <span class="hljs-keyword">as</span> many values <span class="hljs-keyword">as</span> the row <span class="hljs-keyword">with</span> the most elements has - <span class="hljs-keyword">in</span> this <span class="hljs-keyword">case</span> row <span class="hljs-number">2</span> */
</code></pre><pre><code class="hljs sml">    grid-template-areas:         <span class="hljs-symbol">'header</span> header header'         <span class="hljs-symbol">'main</span> section sidebar'         <span class="hljs-symbol">'footer</span> footer sidebar';
grid-template-rows: <span class="hljs-number">32</span>vh <span class="hljs-number">32</span>vh <span class="hljs-number">32</span>vh;}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">header</span> { <span class="hljs-attribute">grid-area</span>: header;
}<span class="hljs-selector-tag">main</span> { <span class="hljs-attribute">grid-area</span>: main;
<span class="hljs-attribute">color</span>: white;}<span class="hljs-selector-tag">footer</span> { <span class="hljs-attribute">grid-area</span>: footer;
<span class="hljs-attribute">color</span>: white;}<span class="hljs-selector-tag">sidebar</span> { <span class="hljs-attribute">grid-area</span>: sidebar;
<span class="hljs-attribute">color</span>: white}<span class="hljs-selector-tag">section</span> { <span class="hljs-attribute">grid-area</span>: section;
<span class="hljs-attribute">color</span>: white}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.box</span> {    <span class="hljs-attribute">color</span>: darkred;
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(233, 233, 233);
<span class="hljs-attribute">text-align</span>: center;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">2em</span> <span class="hljs-number">1em</span>;}
</code></pre><p>我们必须为每一行声明占位符，并设置这些元素在这一行中相对于其他元素占用的空间大小。</p>
<h2>结论</h2>
<p>你应该使用什么？</p>
<p>这完全取决于你想要建立什么。我不会说网格系统正在代替Flexbox布局，但它们（如果您熟悉这个想法）可能会更快地使用并帮助您使用父元素强制布局，并且不依赖于HTML结构。当您使用动态数据时，这正在发挥作用。不过，两者都允许使用像<em>align-items</em>或<em>justify-content</em>这样的CSS属性，这些属性对于单个元素来说非常方便，对于这些想法来说，<em>Flexbox</em>可能是更好的选择。</p>
<p>两个演示：https：//github.com/mixbened/gridDemo/tree/master</p>
<p><a href="http://bit.ly/codeburst"><img src="https://p0.ssl.qhimg.com/t0108fea00b90528124.png" alt=""></a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS网格与Flexbox

## 原文链接
[https://www.zcfy.cc/article/css-grid-vs-flexbox](https://www.zcfy.cc/article/css-grid-vs-flexbox)

