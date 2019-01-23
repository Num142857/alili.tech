---
title: '再见，CommonsChunkPlugin！' 
date: 2019-01-20 2:30:11
hidden: true
slug: d1vi9lhxeat
categories: [reprint]
---

{{< raw >}}

            <p>webpack 4用两个新的配置选项(<code>optimization.splitChunks</code> and <code>optimization.runtimeChunk</code>)替代了CommonsChunkPlugin。本文介绍这两个新选项的用法。</p>
<h2><a href="https://gist.github.com/#defaults"></a>默认值</h2>
<p>默认情况下会做一些优化，对多数用户都是合适的。</p>
<p>注意，默认值只会影响按需加载的块，因为要修改初始（initial）块会影响HTML中的<code>script</code>标签。如果你可以自己处理（比如根据入口配置生成<code>script</code>标签的时候），那可以对初始化也应用这些默认的优化：<code>optimization.splitChunks.chunks: "all"</code>。</p>
<p>webpack根据如下条件自动拆分块：</p>
<ul>
<li>新块可以共享或者模块来自<code>node_modules</code>文件夹</li>
<li>新块会大于30kb（min+gz以前）</li>
<li>按需加载块之时最大的并行请求数小于等于5</li>
<li>页面初次加载时最大的并行请求数小于等于3</li>
</ul>
<p>为尽力满足后两个条件，块的体积可以更大。</p>
<p>下面看几个例子。</p>
<h3><a href="https://gist.github.com/#example-1"></a>例1</h3>
<pre><code class="hljs xl"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span>(<span class="hljs-string">"./a"</span>);
</code></pre><pre><code class="hljs xl"><span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"react"</span>;
<span class="hljs-comment">// ...</span>
</code></pre><p><strong>结果</strong>：会创建一个独立的包含React的块。在执行<code>import</code>调用时，这个块会随着包含<code>./a</code>的块并行加载。</p>
<p><strong>为什么：</strong></p>
<ul>
<li>条件1：这个块包含的模块来自<code>node_modules</code></li>
<li>条件2：react大于30kb</li>
<li>条件3：在执行<code>import</code>调用时，并行请求数是2</li>
<li>条件4：不影响页面初次加载</li>
</ul>
<p><strong>为什么应该这样拆分？</strong></p>
<p>react可能不会像应用代码那样经常变更。把它挪到一个独立的块，浏览器就可以缓存它（假设你使用了长期缓存配置：chunkhash、records、Cache-Control）。</p>
<h3><a href="https://gist.github.com/#example-2"></a>例2</h3>
<pre><code class="hljs xl"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span>(<span class="hljs-string">"./a"</span>);
<span class="hljs-keyword">import</span>(<span class="hljs-string">"./b"</span>);
</code></pre><pre><code class="hljs xl"><span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"./helpers"</span>;
<span class="hljs-comment">// helpers有40kb</span>
<span class="hljs-comment">// ...</span>
</code></pre><pre><code class="hljs xl"><span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"./helpers"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"./more-helpers"</span>;
<span class="hljs-comment">// more-helpers也有40kb</span>
<span class="hljs-comment">// ...</span>
</code></pre><p><strong>结果</strong>：会创建一个独立的包含<code>./helpers</code>的块。在执行<code>import</code>调用时，这个块会与原始的块并行加载。</p>
<p><strong>为什么：</strong></p>
<ul>
<li>条件1：这个块由两个<code>import</code>调用共享</li>
<li>条件2：helpers大于30kb</li>
<li>条件3：在执行<code>import</code>调用时的并行请求数为2</li>
<li>条件4：不影响页面初次加载</li>
</ul>
<p><strong>为什么应该这样拆分？</strong></p>
<p>让helpers代码保留在每个块中意味着用户要下载它两次，而独立出来以后，则只需下载一次。实际上这也是有代价的，因为会多一次请求。这也是为什么有最小30kb的限制的原因。</p>
<hr>
<p>With <code>optimizations.splitChunks.chunks: "all"</code> the same would happend for initial chunks. Chunks can even be shared between entrypoints and on-demand loading.</p>
<h2><a href="https://gist.github.com/#configuration"></a>配置</h2>
<p>对于喜欢折腾的用户，还有很多选项可供使用。</p>
<p>声明：不要在没有度量的情况下手工优化。默认值考虑了最佳实践和Web性能。</p>
<h3><a href="https://gist.github.com/#cache-groups"></a>缓存组</h3>
<p>这个选项将模块分配到缓存组（<code>cacheGroups</code>）。</p>
<p>默认是将<code>node_modules</code>中的所有模块都分配到一个叫<code>vendors</code>的缓存组，将至少在2个块中重复出现的模块分配到另一个叫<code>default</code>的缓存组。</p>
<p>一个模块可以被分配到多个缓存组。这个优化通过<code>priority</code>选项或构成较大块的模块来优先选择缓存组。</p>
<h3><a href="https://gist.github.com/#conditions"></a>条件</h3>
<p>在满足所有条件的情况下，来自相同块和缓存组的模块会构成一个新块。</p>
<p>有4个选项可以用于配置条件：</p>
<ul>
<li><code>minSize</code> (default: 30000) 块的最小大小</li>
<li><code>minChunks</code> (default: 1) 拆分前共享一个模块的最小块数</li>
<li><code>maxInitialRequests</code> (default 3) 一个入口最大并行请求数</li>
<li><code>maxAsyncRequests</code> (default 5) 按需加载时最大行行请求数</li>
</ul>
<h3><a href="https://gist.github.com/#naming"></a>命名</h3>
<p>要控制拆分后新块的名字，可以使用<code>name</code>选项。</p>
<p>注意：如果给不同的块指定了相同的名字，结果就是这些块会被合并成一个。这样配置可以把所有<code>vendor</code>模块拆分为一个由所有入口点/拆分点共享的块，但我不建议这样用。因为这会导致下载的代码变多。</p>
<p>魔术值<code>true</code>会自动根据块和缓存组的键选择一个名字。另外，除给这个选项传一个字符串，也可以传一个函数。</p>
<p>如果名字与入口点名字相同，则删除入口点。</p>
<h3><a href="https://gist.github.com/#select-chunks"></a>选择块</h3>
<p>通过<code>chunks</code>选项可以选择块，有3个值：<code>"initial"</code>、<code>"async"</code>和<code>"all"</code>。分别用于选择初始块、按需加载的块和所有块。</p>
<p><code>reuseExistingChunk</code>选项用于配置在模块完全匹配时重用已有的块，而不是创建新块。</p>
<p>选择块可以针对每个缓存组分别设置。</p>
<h3><a href="https://gist.github.com/#select-modules"></a>选择模块</h3>
<p><code>test</code>选项控制当前缓存组选择哪个模块。省略表示选择所有模块。值可以是RegExp、字符串或函数。</p>
<p>可以匹配绝对模块资源的路径或块名字。如果匹配的是块名字，则会选择该块中的所有模块。</p>
<h3><a href="https://gist.github.com/#configurate-cache-groups"></a>配置缓存组</h3>
<p>以下是默认配置：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">splitChunks:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    chunks:</span> <span class="hljs-string">"async"</span><span class="hljs-string">,</span>
<span class="hljs-attr">    minSize:</span> <span class="hljs-number">30000</span><span class="hljs-string">,</span>
<span class="hljs-attr">    minChunks:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    maxAsyncRequests:</span> <span class="hljs-number">5</span><span class="hljs-string">,</span>
<span class="hljs-attr">    maxInitialRequests:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">    name:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    cacheGroups:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        default:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            minChunks:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">            priority:</span> <span class="hljs-bullet">-20</span>
<span class="hljs-attr">            reuseExistingChunk:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        vendors:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            test:</span> <span class="hljs-string">/[\\/]node_modules[\\/]/,</span>
<span class="hljs-attr">            priority:</span> <span class="hljs-bullet">-10</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
</code></pre><p>默认情况下，缓存组会从<code>splitChunks.*</code>中继承相应的选项值，而<code>test</code>、<code>priority</code>和<code>reuseExistingChunk</code>则只能在缓存组层次上配置。</p>
<p><code>cacheGroups</code>是一个对象，其中键是缓存组的键，而值是选项（这是全部）： <code>chunks</code>、 <code>minSize</code>、<code>minChunks</code>、<code>maxAsyncRequests</code>、<code>maxInitialRequests</code>, <code>name</code>。</p>
<p>要禁用默认组，传入<code>false</code>：<code>optimization.splitChunks.cacheGroups.default: false</code>。</p>
<p>这里默认缓存组（<code>default</code>）的优先级（<code>priority</code>）是负数，以便任意自定义的缓存组都优先级（默认为0）都会更高。</p>
<p>以下是一些配置的实例：</p>
<pre><code class="hljs dts"><span class="hljs-symbol">splitChunks:</span> {
<span class="hljs-symbol">    cacheGroups:</span> {
<span class="hljs-symbol">        commons:</span> {
<span class="hljs-symbol">            name:</span> <span class="hljs-string">"commons"</span>,
<span class="hljs-symbol">            chunks:</span> <span class="hljs-string">"initial"</span>,
<span class="hljs-symbol">            minChunks:</span> <span class="hljs-number">2</span>
        }
    }
}
</code></pre><p>这样就创建了一个<code>commons</code>块，包含入口点共享的所有代码。</p>
<p>注意：这会导致用户不必要地下载更多代码。</p>
<pre><code class="hljs dts"><span class="hljs-symbol">splitChunks:</span> {
<span class="hljs-symbol">    cacheGroups:</span> {
<span class="hljs-symbol">        commons:</span> {
<span class="hljs-symbol">            test:</span> /[\\/]node_modules[\\/]
<span class="hljs-symbol">            name:</span> <span class="hljs-string">"vendors"</span>,
<span class="hljs-symbol">            chunks:</span> <span class="hljs-string">"all"</span>
        }
    }
}
</code></pre><p>这样就创建了一个<code>vendors</code>块，包含整个应用中来自node_modules的所有代码。</p>
<p>注意：这会导致用户不必要地下载更多代码。</p>
<h2><a href="https://gist.github.com/#optimizationruntimechunk"></a><code>optimization.runtimeChunk</code></h2>
<p><code>optimization.runtimeChunk: true</code>会给每个入口文件的输出再添加一个块，其中只包含运行时。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再见，CommonsChunkPlugin！

## 原文链接
[https://www.zcfy.cc/article/rip-commonschunkplugin-md-github](https://www.zcfy.cc/article/rip-commonschunkplugin-md-github)

