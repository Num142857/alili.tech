---
title: 'webpack 4: Code Splitting, chunk graph and the splitChunks optimization' 
date: 2019-01-24 2:30:11
hidden: true
slug: pj1ezrefhjf
categories: [reprint]
---

{{< raw >}}

            <hr>
<p>webpack 4对块图进行了一些重大改进，并增加了对 chunk 拆分的新优化（这是对 <code>CommonsChunkPlugin</code> 的一种改进）。</p>
<p>让我们看看之前的块图存在的缺点。</p>
<p>之前的块图通过父子关系连接到其他块，<code>chunk</code> 包含模块。</p>
<p>当一个块有父母时，可以假定在加载时至少有一个父母已经加载了。这些信息可以被优化步骤所使用。当 <code>chunk</code> 中的模块在所有父母中都使用时，就可以把这个模块提取出来，因为它在任何情况下都需要使用。</p>
<p>在入口或者异步分割点引用这些 <code>chunk</code> 。这些 <code>chunk</code> 是并行加载的。</p>
<p>这种图形很难理解 <code>chunks</code> 的分割。例如在使用 <code>CommonChunkPlugin</code> 的时候，从一个或多个 <code>chunks</code> 删除模块并放入一个新模块，这个新模块需要连接到块图中。但是应该怎么定位这个新模块？作为之前 <code>chunk</code> 的父母？作为孩子？ 在 <code>CommonChunkPlugin</code> 中将其添加为父母，但是从技术角度上这是错误的，也会造成对优化产生很多负作用。</p>
<p>新的块图引入了一个新对象：<code>ChunkGroup</code>. 一个<code>ChunkGroup</code>包含一个<code>Chunks</code>.</p>
<p>在入口点或异步分割点处引用一个<code>ChunkGroup</code>，这就意味着包含所有并行的<code>Chunks</code>。一个<code>Chunk</code>可以被引用在多个<code>ChunkGroup</code>中。</p>
<p><code>Chunk</code>之间不再存在父子关系，<code>ChunkGroups</code> 之间也不存在这种关系。</p>
<p>现在 <code>Chunks</code> 的分割可以被理解了，因为新的<code>Chunks</code>被添加到所有包含原始 <code>Chunk</code> 的 <code>ChunkGroups</code> 中，这并不会影响父母关系。</p>
<hr>
<p>现在解决了这个问题，我们可以开始更多的使用<code>Chunk</code>分割。我们可以拆分任何 <code>chunk</code>，而不用担心破坏块图。
<code>CommonsChunkPlugin</code>存在很多问题:</p>
<ul>
<li>它可能导致下载更多的超过我们使用的代码</li>
<li>它在异步<code>chunks</code>中是低效的。</li>
<li>配置繁琐，很难使用</li>
<li>难以被理解</li>
</ul>
<p>所以一个新的插件诞生了: <code>SplitChunksPlugin</code></p>
<p>它使用模块重复计数和模块类别(如 node_modules )，通过 <code>heuristics</code> 自动识别应该被分块的模块，并分割 <code>chunks</code>。</p>
<p>这有个两者的比喻，<code>CommonsChunkPlugin</code>就好像: 创建一个所有模块中都共同存在的模块。 而<code>SplitChunksPlugin</code>就像是：“Here are the heuristics, make sure you fullfil them”</p>
<p> <code>SplitChunksPlugin</code>  也有着不错的特点：</p>
<ul>
<li>不会下载不需要的代码</li>
<li>对异步<code>chunks</code>也很高效</li>
<li>被默认用于异步<code>chunks</code></li>
<li>可以通过多个<code>vendor chunks</code>来进行<code>vender</code>的分割</li>
<li>使用简单</li>
<li>不依赖块图</li>
<li>基本上是自动的</li>
</ul>
<hr>
<p>这里有一些SplitChunksPlugin会为你做的例子。这些示例仅显示默认行为。有更多的可能性与额外的配置。</p>
<p>您可以通过optimization.splitChunks进行配置。这些示例提到了有关块的内容，默认情况下，它仅适用于异步块，但对于optimization.splitChunks.chunks：“all”对于初始块也是如此。</p>
<p>我们假设这里使用的每个外部库都大于30kb，因为优化仅在该阈值之后进行。</p>
<h4>Vendors</h4>
<p><code>chunk-a</code>: react, react-dom, some components</p>
<p><code>chunk-b</code>: react, react-dom, some other components</p>
<p><code>chunk-c</code>: angular, some components</p>
<p><code>chunk-d</code>: angular, some other components</p>
<p>webpack 会自动创建两个 vendors chunks, 结果如下:</p>
<p><code>vendors~chunk-a~chunk-b</code>: react, react-dom</p>
<p><code>vendors~chunk-c~chunk-d</code>: angular</p>
<p><code>chunk-a</code> to <code>chunk-d</code>: Only the components</p>
<h4>Vendors 重叠</h4>
<p><code>chunk-a</code>: react, react-dom, some components</p>
<p><code>chunk-b</code>: react, react-dom, lodash, some other components</p>
<p><code>chunk-c</code>: react, react-dom, lodash, some components</p>
<p>webpack 会自动创建两个 vendors chunks, 结果如下:</p>
<p><code>vendors~chunk-a~chunk-b~chunk-c</code>: react, react-dom</p>
<p><code>vendors~chunk-b~chunk-c</code>: lodash</p>
<p><code>chunk-a</code> to <code>chunk-c</code>: Only the components</p>
<h4>共享模块</h4>
<p><code>chunk-a</code>: vue, some components, some shared components</p>
<p><code>chunk-b</code>: vue, some other components, some shared components</p>
<p><code>chunk-c</code>: vue, some more components, some shared components</p>
<p>假设共享组件的大小大于30kb，webpack将创建vendors chunk 和一个a commons chunk，结果如下：</p>
<p><code>vendors~chunk-a~chunk-b~chunk-c</code>: vue</p>
<p><code>commons~chunk-a~chunk-b~chunk-c</code>: some shared components</p>
<p><code>chunk-a</code> to <code>chunk-c</code>: Only the components</p>
<p>When the size of the shared components is smaller than 30kb, webpack intentionally duplicates the modules in <code>chunk-a</code> to <code>chunk-c</code>. We think reduces download size is not worth the extra request needed for a separate chunk load.</p>
<h4>多个共享模块</h4>
<p><code>chunk-a</code>: react, react-dom, some components, some shared react components</p>
<p><code>chunk-b</code>: react, react-dom, angular, some other components</p>
<p><code>chunk-c</code>: react, react-dom, angular, some components, some shared react components, some shared angular components</p>
<p><code>chunk-d</code>: angular, some other components, some shared angular components
webpack将创建两个vendors chunks和两个commons chunks</p>
<p><code>vendors~chunk-a~chunk-b~chunk-c</code>: react, react-dom</p>
<p><code>vendors~chunk-b~chunk-c~chunk-d</code>: angular</p>
<p><code>commons~chunk-a~chunk-c</code>: some shared react components</p>
<p><code>commons~chunk-c~chunk-d</code>: some shared angular components</p>
<p><code>chunk-a</code> to <code>chunk-d</code>: Only the components</p>
<hr>
<p>Note: Since the chunk name includes all origin chunk names it’s recommended for production builds with long term caching to NOT include <code>[name]</code> in the filenames, or switch off name generation via <code>optimization.splitChunks.name: false</code>. Elsewise files will invalidate i. e. when more chunks with the same vendors are added.</p>
<h2>由于块名称包含所有源块名称，因此建议在生产环境下使用来达到长期缓存，以避免在文件名中包含[name].或者通过optimization.splitChunks.name关闭名称生成：false。其他文件将使我无效。即当添加更多与同一vendors的块时。</h2>
<p>via: <a href="https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366">https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366</a></p>
<p>作者: <a href=""></a> 选题者: <a href="https://github.com/undefined">@SpawN</a> 译者: <a href="https://github.com/译者ID">SpawN</a> 校对: <a href="https://github.com/校对者ID">校对者ID</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 4: Code Splitting, chunk graph and the splitChunks optimization

## 原文链接
[https://www.zcfy.cc/article/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization](https://www.zcfy.cc/article/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization)

