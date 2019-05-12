---
title: '没有了CommonsChunkPlugin，咱拿什么来分包（译）' 
date: 2018-12-12 2:30:10
hidden: true
slug: s7hlbwglzb
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="http://www.codedata.cn/hacknews/151994848372127661" rel="nofollow noreferrer" target="_blank">RIP CommonsChunkPlugin</a></p>
<p>webpack 4 移除 <code>CommonsChunkPlugin</code>，取而代之的是两个新的配置项（optimization.splitChunks 和 optimization.runtimeChunk），下面介绍一下用法和机制。</p>
<h2 id="articleHeader0">默认方式</h2>
<p>webpack模式模式现在已经做了一些通用性优化，适用于多数使用者。</p>
<p>需要注意的是：默认模式只影响按需(on-demand)加载的代码块(chunk)，因为改变初始代码块会影响声明在HTML的<code>script</code>标签。如果可以处理好这些（比如，从打包状态里面读取并动态生成script标签到HTML），你可以通过设置<code>optimization.splitChunks.chunks: "all"</code>，应用这些优化模式到初始代码块(initial chunk)。</p>
<p>webpack根据下述条件自动进行代码块分割：</p>
<ul>
<li>新代码块可以被共享引用，OR这些模块都是来自<code>node_modules</code>文件夹里面</li>
<li>新代码块大于30kb（min+gziped之前的体积）</li>
<li>按需加载的代码块，最大数量应该小于或者等于5</li>
<li>初始加载的代码块，最大数量应该小于或等于3</li>
</ul>
<p>为了满足后面两个条件，webpack有可能受限于包的最大数量值，生成的代码体积往上增加。</p>
<p>我们来看一下一些例子：</p>
<h3 id="articleHeader1">Example 1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
import(&quot;./a&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span>("./a");</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
import &quot;react-dom&quot;;
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> "react-dom";
<span class="hljs-comment">// ...</span></code></pre>
<p>结果：webpack会创建一个包含<code>react-dom</code>的分离代码块。当<code>import</code>调用时候，这个代码块就会与<code>./a</code>代码被并行加载。</p>
<p>为什么会这样打包：</p>
<ul>
<li>条件1：这个代码块是从<code>node_modules</code>来的</li>
<li>条件2：react-dom大于30kb</li>
<li>条件3：按需请求的数量是2（小于5）</li>
<li>条件4：不会影响初始代码请求数量</li>
</ul>
<p>这样打包有什么好处呢？</p>
<p>对比起你的应用代码，<code>react-dom</code>可能不会经常变动。通过将它分割至另外一个代码块，这个代码块可以被独立缓存起来（假设你在用的是长期缓存策略：chunkhash，records，Cache-Control）</p>
<h3 id="articleHeader2">Example 2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
import(&quot;./a&quot;);
import(&quot;./b&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span>("./a");
<span class="hljs-keyword">import</span>("./b");</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
import &quot;./helpers&quot;; // helpers is 40kb in size
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> "./helpers"; <span class="hljs-comment">// helpers is 40kb in size</span>
<span class="hljs-comment">// ...</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// b.js
import &quot;./helpers&quot;;
import &quot;./more-helpers&quot;; // more-helpers is also 40kb in size
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">import</span> "./helpers";
<span class="hljs-keyword">import</span> "./more-helpers"; <span class="hljs-comment">// more-helpers is also 40kb in size</span>
<span class="hljs-comment">// ...</span></code></pre>
<p>结果：webpack会创建一个包含<code>./helpers</code>的独立代码块，其他模块会依赖于它。在<code>import</code>被调用时候，这个代码块会跟原始的代码并行加载（译注：它会跟<code>a.js</code>和<code>b.js</code>并行加载）。</p>
<p>为什么会这样打包：</p>
<ul>
<li>条件1：这个代码块会被两个导入(<code>import</code>)调用依赖（指的是<code>a.js</code>和<code>b.js</code>）</li>
<li>条件2：<code>helpers</code>体积大于30kb</li>
<li>条件3：按需请求的数量是2（小于5）</li>
<li>条件4：不会影响初始代码请求数量</li>
</ul>
<p>这样打包有什么好处呢？</p>
<p>将<code>helpers</code>代码放在每一个依赖的块里，可能就意味着，用户重复会下载它两次。通过用一个独立的代码块分割，它只需要被下载一次。实际上，这只是一种折衷方案，因为我们为此需要付出额外的一次请求的代价。这就是为什么默认webpack将最小代码块分割体积设置成30kb（译注：太小体积的代码块被分割，可能还会因为额外的请求，拖慢加载性能）。</p>
<p>通过<code>optimizations.splitChunks.chunks: "all"</code>，上面的策略也可以应用到初始代码块上(inital chunks)。代码代码块也会被多个入口共享&amp;按需加载（译注：以往我们使用CommonsChunkPlugin最通常的目的）。</p>
<h2 id="articleHeader3">配置</h2>
<p>如果想要更深入控制这个按需分块的功能，这里提供很多选项来满足你的需求。</p>
<p>Disclaimer：不要在没有实践测量的情况下，尝试手动优化这些参数。默认模式是经过千挑万选的，可以用于满足最佳web性能的策略。</p>
<h3 id="articleHeader4">缓存组（Cache Group）</h3>
<p>这项优化可以用于将模块分配到对应的<code>Cache group</code>。</p>
<p>默认模式会将所有来自<code>node_modules</code>的模块分配到一个叫<code>vendors</code>的缓存组；所有重复引用至少两次的代码，会被分配到<code>default</code>的缓存组。</p>
<p>一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组，或者会分配至可以形成更大体积代码块的组里。</p>
<h3 id="articleHeader5">Conditions</h3>
<p>在满足下述所有条件时，那些从相同代码块和缓存组来的模块，会形成一个新的代码块（译注：比如，在满足条件下，一个vendoer可能会被分割成两个，以充分利用并行请求性能）。</p>
<p>有四个选项可以用于配置这些条件：</p>
<ul>
<li>
<code>minSize</code>(默认是30000)：形成一个新代码块最小的体积</li>
<li>
<code>minChunks</code>（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）</li>
<li>
<code>maxInitialRequests</code>（默认是3）：一个入口最大的并行请求数</li>
<li>
<code>maxAsyncRequests</code>（默认是5）：按需加载时候最大的并行请求数。</li>
</ul>
<h3 id="articleHeader6">Naming</h3>
<p>要控制代码块的命名，可以用<code>name</code>参数来配置。</p>
<p>注意：当不同分割代码块被赋予相同名称时候，他们会被合并在一起。这个可以用于在：比如将那些多个入口/分割点的共享模块(vendor)合并在一起，不过不推荐这样做。这可能会导致加载额外的代码。</p>
<p>如果赋予一个神奇的值<code>true</code>，webpack会基于代码块和缓存组的<code>key</code>自动选择一个名称。除此之外，可以使用字符串或者函数作为参数值。</p>
<p>当一个名称匹配到相应的入口名称，这个入口会被移除。</p>
<h3 id="articleHeader7">Select chunks</h3>
<p>通过<code>chunks</code>选项，可以配置控制webpack选择哪些代码块用于分割（译注：其他类型代码块按默认方式打包）。有3个可选的值：<code>initial</code>、<code>async</code>和<code>all</code>。webpack将会只对配置所对应的代码块应用这些策略。</p>
<p><code>reuseExistingChunk</code>选项允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。</p>
<p>这个选项可以在每个缓存组（Cache Group）里面做配置。</p>
<h3 id="articleHeader8">Select modules</h3>
<p><code>test</code>选项用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：<code>RegExp</code>、<code>String</code>和<code>Function</code></p>
<p>通过这个选项，可以通过绝对资源路径（absolute modules resource path）或者代码块名称(chunk names)来匹配对应模块。当一个代码块名称(chunk name)被匹配到，这个代码块的所有模块都会被选中。</p>
<h3 id="articleHeader9">配置缓存组(Configurate cache group)</h3>
<p>这是默认的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="splitChunks: {
    chunks: &quot;async&quot;,
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">splitChunks: {
    chunks: <span class="hljs-string">"async"</span>,
    minSize: <span class="hljs-number">30000</span>,
    minChunks: <span class="hljs-number">1</span>,
    maxAsyncRequests: <span class="hljs-number">5</span>,
    maxInitialRequests: <span class="hljs-number">3</span>,
    name: <span class="hljs-literal">true</span>,
    cacheGroups: {
        <span class="hljs-keyword">default</span>: {
            minChunks: <span class="hljs-number">2</span>,
            priority: -<span class="hljs-number">20</span>,
            reuseExistingChunk: <span class="hljs-literal">true</span>,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -<span class="hljs-number">10</span>
        }
    }
}</code></pre>
<p>默认来说，缓存组会继承<code>splitChunks</code>的配置，但是<code>test</code>、<code>priorty</code>和<code>reuseExistingChunk</code>只能用于配置缓存组。</p>
<p><code>cacheGroups</code>是一个对象，按上述介绍的键值对方式来配置即可，值代表对应的选项：</p>
<p>除此之外，所有上面列出的选择都是可以用在缓存组里的：<code>chunks</code>, <code>minSize</code>, <code>minChunks</code>, <code>maxAsyncRequests</code>, <code>maxInitialRequests</code>, <code>name</code>。</p>
<p>可以通过<code>optimization.splitChunks.cacheGroups.default: false</code>禁用<code>default</code>缓存组。</p>
<p><code>default</code>缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级（译注：更高优先级的缓存组可以优先打包所选择的模块）（默认自定义缓存组优先级为0）</p>
<p>可以用一些例子来说明：</p>
<h3 id="articleHeader10">Example 1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="splitChunks: {
    cacheGroups: {
        commons: {
            name: &quot;commons&quot;,
            chunks: &quot;initial&quot;,
            minChunks: 2
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">splitChunks: {
    cacheGroups: {
        commons: {
            name: <span class="hljs-string">"commons"</span>,
            chunks: <span class="hljs-string">"initial"</span>,
            minChunks: <span class="hljs-number">2</span>
        }
    }
}</code></pre>
<p>这会创建一个<code>commons</code>代码块，这个代码块包含所有被其他入口(entrypoints)共享的代码。</p>
<p><strong>注意</strong>：这可能会导致下载额外的代码。</p>
<h3 id="articleHeader11">Example 2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="splitChunks: {
    cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: &quot;vendors&quot;,
            chunks: &quot;all&quot;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">splitChunks: {
    cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: <span class="hljs-string">"vendors"</span>,
            chunks: <span class="hljs-string">"all"</span>
        }
    }
}</code></pre>
<p>这会创建一个名为<code>vendors</code>的代码块，它会包含整个应用所有来自<code>node_modules</code>的代码。</p>
<p><strong>注意</strong>：这可能会导致下载额外的代码。</p>
<h2 id="articleHeader12">optimization.runtimeChunk</h2>
<p>通过<code>optimization.runtimeChunk: true</code>选项，webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口。（译注：这个需要看场景使用，会导致每个入口都加载多一份运行时代码）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
没有了CommonsChunkPlugin，咱拿什么来分包（译）

## 原文链接
[https://segmentfault.com/a/1190000013476837](https://segmentfault.com/a/1190000013476837)

