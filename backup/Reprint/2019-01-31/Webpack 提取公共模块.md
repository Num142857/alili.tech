---
title: 'Webpack 提取公共模块' 
date: 2019-01-31 2:31:16
hidden: true
slug: t8h3abzd8
categories: [reprint]
---

{{< raw >}}

                    
<p>较早之前总结过一篇【前端构建】WebPack实例与前端性能优化。</p>
<p>这次打算写几篇对几个重要的知识点进行更详细的总结。本篇是这次 Webpack 相关的第三篇总结，之前的两篇是：<br><a href="https://segmentfault.com/a/1190000007498296">[译]为什么要 Webpack</a><br><a href="https://segmentfault.com/a/1190000007364512" target="_blank">Webpack 构建后文件变得很大？</a></p>
<p>啃先生(MrKenniu) | 文</p>
<p>上一篇文章提到我主要从四个方面解决 Webpack 构建后文件太大的问题，总结了 Code Split，即按需加载的技能点。这篇总结<strong>提取公共代码</strong>。它要解决的问题是冗余代码过多，即同一个模块在多个地方被引用，显然是解决上<a href="https://segmentfault.com/a/1190000007364512">一篇文章</a>最后遗留的问题。</p>
<p>Webpack 的 CommonsChunkPlugin 插件，负责将多次被使用的 JS 模块打包在一起。</p>
<h2 id="articleHeader0">使用&amp;配置项</h2>
<p>使用方法：在 webpack config 的 plugins 属性里添加 CommonsChunkPlugin 实例即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVFCPp?w=481&amp;h=144" src="https://static.alili.tech/img/bVFCPp?w=481&amp;h=144" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>实例化的配置项「options」如下：</p>
<p><strong>name 或者 names：</strong>chunk的名称，如果是 names 数组，则相当于为数组里的每个name 实例化插件。如果缺省，而且 children 或者 asyn 为 true，那么，所有的 chunks 都会被使用。</p>
<p><strong>filename：</strong>此 common chunk 的文件名模板，可以与 output.filename 一样</p>
<p><strong>minChunks：</strong>通常情况下这是一个整数，表示至少有 minChunks 个 chunk 使用了该模块，该模块才会被挪到公共代码「common chunk」里。minChunks 还可以是 Infinity，意味着将没有任何模块被移入进来，只是创建当前这个 chunk，这通常用来生成 jquery 等第三方代码库。minChunks还可以是一个返回布尔值的函数，返回 true 该模块会被移入 common chunk，否则不会。默认值是 chunks 的长度。</p>
<p><strong>chunks：</strong>这是一个元素为 chunk 名称的数组，插件将会从这些 chunks 里提取 common chunks。可见，minChunks 如果是整数，那么它应该小于 chunks 的长度，且大于1。如果缺省，所有的入口 chunks 会被选中。</p>
<p><strong>children：</strong>默认false。如果为 true ，相当于上一项 chunks 配置为当前 chunk 的子 chunk，用于 code split。</p>
<p><strong>async：</strong>默认false。如果为 true，生成的 common chunk 将会是异步加载的。这个异步的 common chunk 是 name 这个 chunk 的子 chunk，而且跟 chunks 一起并行加载</p>
<p><strong>minSize：</strong>如果有指定大小，那么 common chunk 的文件大小至少有 minSize 才会被创建。非必填项。</p>
<p><strong>提示：以上配置项理解起来有些复杂，应结合实际案例运行的结果来理解</strong></p>
<h2 id="articleHeader1">CommonsChunkPlugin 能解决的问题</h2>
<p>在使用插件前，考虑几个问题：</p>
<ul>
<li><p>对哪些 chunk 进行提取，这决定了 chunks ，children 和 name 要怎么配置</p></li>
<li><p>common chunk 是否异步，这决定了 async 怎么配置</p></li>
<li><p>common chunk 的粒度，这决定了 minChunks 和 minSize 怎么配置</p></li>
</ul>
<p>以下是官方给出的常用的场景：</p>
<ul>
<li><p>提取两个及两个以上 Chunk 的公共代码</p></li>
<li><p>将 Code Split 切割出来的 Chunk「就是子 Chunk」，提取到父 Chunk</p></li>
<li><p>将 Code Split 切割出来的 Chunk，提取到一个新的异步加载的 Chunk</p></li>
<li><p>提取某个类似 jquery 或 react 的代码库「但是这个用得很少，使用用 dll 插件来打包会更好一些，一下篇介绍」</p></li>
</ul>
<p><strong>例1：chunks 的公共代码，生成 page-comm</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVFCPF?w=487&amp;h=260" src="https://static.alili.tech/img/bVFCPF?w=487&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>例2：将 code split 的公共子 chunk 提取到父 chunk</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVFCPG?w=600&amp;h=261" src="https://static.alili.tech/img/bVFCPG?w=600&amp;h=261" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>topic.js 使用了 code split</p>
<p><span class="img-wrap"><img data-src="/img/bVFCPH?w=583&amp;h=240" src="https://static.alili.tech/img/bVFCPH?w=583&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>例3：将 Code Split 切割出来的 Chunk，提取到一个新的异步加载的 Chunk</strong><br>async 设置为true，与例2一样，不同的是例2提取到父 chunk，这样会增加父 chunk 的文件大小，而例3提到一个新的 chunk 里，这个 chunk 是异步加载的。</p>
<p><span class="img-wrap"><img data-src="/img/bVFCPQ?w=607&amp;h=254" src="https://static.alili.tech/img/bVFCPQ?w=607&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>多跑实例，理解各配置项产生的影响</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 提取公共模块

## 原文链接
[https://segmentfault.com/a/1190000007498385](https://segmentfault.com/a/1190000007498385)

