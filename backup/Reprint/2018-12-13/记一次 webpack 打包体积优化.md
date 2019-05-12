---
title: '记一次 webpack 打包体积优化' 
date: 2018-12-13 2:30:07
hidden: true
slug: dwrdzon65ef
categories: [reprint]
---

{{< raw >}}

                    
<p>手头做的项目开发得差不多了，而打包配置是一开始粗略配置的，不大的项目打包出来得6MB+，所以现在必须进行优化。</p>
<h2 id="articleHeader0">打包结果分析</h2>
<p>执行命令 <code>webpack --profile --json &gt; stats.json</code> ，可以将打包过程的详细信息以 json 格式记录到文件中。依据该文件，<a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a>、<a href="http://alexkuz.github.io/webpack-chart/" rel="nofollow noreferrer" target="_blank">Webpack Chart</a> 等分析工具会以可视化的形式展示打包过程和结果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008837589?w=908&amp;h=547" src="https://static.alili.tech/img/remote/1460000008837589?w=908&amp;h=547" alt="webpack-bundle-analyzer" title="webpack-bundle-analyzer" style="cursor: pointer; display: inline;"></span></p>
<p>如果不想用这些额外工具，通过命令 <code>webpack --display-modules --sort-modules-by size</code> ，webpack 会在日志中按大小排序显示所有模块。</p>
<p>我在项目中，将第三方库基本都集中打包到一个 chunk (vendors)，业务逻辑单独一个 chunk (app)。打包总体积的大头来自 vendors，其中<code>antd</code>占据大头(3MB+)、<code>moment</code>占据约500KB、提取的 css 约300KB、<code>react-dom</code>也是500KB+，出乎意料的是 <code>lodash</code> 也是500KB+。</p>
<h2 id="articleHeader1">逐个击破</h2>
<h3 id="articleHeader2">设置环境变量 <code>NODE_ENV</code> 为 <code>production</code>
</h3>
<p>不少库会按开发环境(development)和生产环境(production)提供不同的文件，主要是为了开发模式下的调试，也会因此有文件体积上的差别。用于生产环境的打包，设置其为<code>production</code>后，这些库会提供最小体积的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
      }
    }),
    <span class="hljs-comment">// ...</span>
]</code></pre>
<h3 id="articleHeader3">css-loader</h3>
<p>css-loader 在 webpack 默认不开启压缩，需要设置 <code>css-loader?minimize</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    // ...
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize'
      })
    }
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
    <span class="hljs-comment">// ...</span>
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
      <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'style-loader'</span>,
        <span class="hljs-attr">use</span>: <span class="hljs-string">'css-loader?minimize'</span>
      })
    }
    <span class="hljs-comment">// ...</span>
}</code></pre>
<h3 id="articleHeader4">大头——antd (ant design)</h3>
<p>因为并没有使用 antd 的所有组件，所以按需加载是必需的。根据其文档（<a href="https://ant.design/docs/react/introduce-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD" rel="nofollow noreferrer" target="_blank">按需加载 - Ant Design</a>），需要安装 bable 插件 <code>babel-plugin-import </code>，并在 babel 配置中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // ...
    &quot;plugins&quot;: [
        [&quot;import&quot;, { &quot;libraryName&quot;: &quot;antd&quot;, &quot;libraryDirectory&quot;: &quot;es&quot;, &quot;style&quot;: &quot;css&quot; }],
        // ...
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-string">"plugins"</span>: [
        [<span class="hljs-string">"import"</span>, { <span class="hljs-string">"libraryName"</span>: <span class="hljs-string">"antd"</span>, <span class="hljs-string">"libraryDirectory"</span>: <span class="hljs-string">"es"</span>, <span class="hljs-string">"style"</span>: <span class="hljs-string">"css"</span> }],
        <span class="hljs-comment">// ...</span>
    ]
}</code></pre>
<p>在我配置过程中，<code>libraryDirectory</code> 配置的不同也会有较大影响，但按目前文档来看貌似没有影响，待我确认后再做记录。</p>
<p>=== 2018-02-23 更新 ===</p>
<p>看来<code>bable-plugin-import</code>这几天有更新，现在配置项 <code>libraryDirectory</code> 的默认值时 <code>lib</code>，即使用通过 <code>require</code> (commonjs) 引用模块的文件。而先前我在配置的时候并没有默认值，如果没有显示配置 <code>libraryDirectory</code>，打包结果会出现重复的内容。</p>
<p>采用了 es6 module 的项目建议配置 <code>libraryDirectory</code> 为 <code>es</code>，即使用通过 <code>import</code> (es6 module) 引用模块的文件。这种情况打包后的体积要更小一些。</p>
<p>=== end ===</p>
<p>这里还有很重要一点，<code>babel-plugin-import</code> 要求 <code>antd</code> 不能被提取为公共模块 vendors，否则就无法实现按需加载。尚不清楚是 babel 插件的原因，还是这个插件单独的原因。</p>
<h3 id="articleHeader5">moment</h3>
<p>moment 库的体积开销主要是 i18n 文件，配置 webpack 将用不到 i18n 文件不打包即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
    <span class="hljs-keyword">new</span> webpack.ContextReplacementPlugin(<span class="hljs-regexp">/moment[\/\\]locale$/</span>, /zh-cn/),
]</code></pre>
<h3 id="articleHeader6">看上去很轻量的 <code>lodash</code>
</h3>
<p><code>lodash</code>看上去就是一些工具函数，应该是很轻量的，然而一次全部加载下来要达到500KB，因此也需要按需加载。它的按需加载还比较麻烦。</p>
<p><code>lodash</code>为每个方法单独提供了库，但这种方式在实际使用中并不灵活，所以这种最「干净」的方法不建议使用。</p>
<p>像 antd 一样，<code>lodash</code> 也有 babel 插件用于按需加载——<a href="https://github.com/lodash/babel-plugin-lodash" rel="nofollow noreferrer" target="_blank">babel-plugin-lodash</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // ...
    &quot;plugins&quot;: [
        &quot;lodash&quot;,
        // ...
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"lodash"</span>,
        <span class="hljs-comment">// ...</span>
    ]
}</code></pre>
<p>同样，<code>lodash</code> 就不能提取到公共模块了。</p>
<h2 id="articleHeader7">最后</h2>
<p>打包结果的体积开销主要就是以上几项。经过优化后，体积下降至1.5MB以内，还是很客观的。不过 antd 依然占据大头，后续会考虑把 antd 替换掉，毕竟用到的组件不多。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次 webpack 打包体积优化

## 原文链接
[https://segmentfault.com/a/1190000013326506](https://segmentfault.com/a/1190000013326506)

