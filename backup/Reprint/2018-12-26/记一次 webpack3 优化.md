---
title: '记一次 webpack3 优化' 
date: 2018-12-26 2:30:14
hidden: true
slug: h5vj150pfgw
categories: [reprint]
---

{{< raw >}}

                    
<p>项目中有 500 多个 ts 文件。每次 <code>webpack</code> 启动 <code>watch</code> 都要 40 多秒。修改代码后编译也要 12-16 秒。实在是太慢了，所以尝试优化一下。</p>
<p>总构建时间( run build): 45672ms<br>watch 时，修改代码后构建： 12秒</p>
<h1 id="articleHeader0">使用 <code>webpack-visualizer</code> 分析 webpack 都打包了什么。</h1>
<p><code>webpack-visualizer</code> 可将<code>webpack</code>打包的文件大小可视化，并展现依赖关系。<br><a href="http://chrisbateman.github.io/webpack-visualizer/" rel="nofollow noreferrer" target="_blank"> <code>webpack-visualizer</code> 使用方法</a>。<br>分析生成的文件可见。文件总大小 <code>1.42M</code> 中，其中 vue 占用了 <code>500K+</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVYe2I?w=569&amp;h=618" src="https://static.alili.tech/img/bVYe2I?w=569&amp;h=618" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>但是 webpack 中已排除 vue ,打包中不应包含 vue 模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter'
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">externals</span>: {
    <span class="hljs-string">'vue'</span>: <span class="hljs-string">'Vue'</span>,
    <span class="hljs-string">'vuex'</span>: <span class="hljs-string">'Vuex'</span>,
    <span class="hljs-string">'vue-router'</span>: <span class="hljs-string">'VueRouter'</span>
  }</code></pre>
<p>猜测是 import 时 使用了大写的 <code>import Vue from Vue</code><br>应该改为 <code>import Vue from vue </code>,改为 小写后，果然好了。。。<br>打包的文件变为<code> 838 kB</code>,打包时间为<code> 41351ms</code><br>关于 <code>externals</code>的更多信息，可以参照<a href="http://www.tangshuang.net/3343.html" rel="nofollow noreferrer" target="_blank">webpack externals详解</a></p>
<h1 id="articleHeader1">优化 ts 构建</h1>
<p>项目中使用的<code>ts-loader</code>来处理<code>TypeScript</code>,但是速度比较慢。<br>可以采用两种方式来优化:<code>awesome-typescript-loader</code> 或 <code>thread-loader\Harrypack</code>+<code>cache-loader\hard-source-webpack-plugin</code>+<code>tsloader</code>。<br>这两种方式都使用到了<code>多核+ 缓存</code>来加快构建。<br>下面分别对比了两种优化方式。</p>
<h3 id="articleHeader2">使用 <code>thread-loader</code> + <code>cache-loader</code> + <code>ts-loader</code>
</h3>
<p>总构建时间( run build): 27秒<br>watch 时，修改代码后构建：8 秒</p>
<p><a href="https://github.com/TypeStrong/ts-loader/tree/013bac995a7372f1f7c4ec8b796a5c86b64f636a/examples/thread-loader" rel="nofollow noreferrer" target="_blank">这里有个官方的例子</a><br>webpack.config.js 中修改 loader 和添加插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,

                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true,
                        }
                    }
                ]
            },
            //...
        ],

    },
    // ...
    plugins: [
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">    module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        rules:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.ts$/,</span>
<span class="hljs-attr">                exclude:</span> <span class="hljs-string">/node_modules|vue\/src/,</span>

<span class="hljs-attr">                use:</span> <span class="hljs-string">[</span>
                    <span class="hljs-string">{</span> <span class="hljs-attr">loader:</span> <span class="hljs-string">'cache-loader'</span> <span class="hljs-string">},</span>
                    <span class="hljs-string">{</span>
<span class="hljs-attr">                        loader:</span> <span class="hljs-string">'thread-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                        options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                            workers:</span> <span class="hljs-string">require('os').cpus().length</span> <span class="hljs-bullet">-</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
                        <span class="hljs-string">},</span>
                    <span class="hljs-string">},</span>
                    <span class="hljs-string">{</span>
<span class="hljs-attr">                        loader:</span> <span class="hljs-string">'ts-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                        options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                            happyPackMode:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">IMPORTANT!</span> <span class="hljs-string">use</span> <span class="hljs-string">happyPackMode</span> <span class="hljs-string">mode</span> <span class="hljs-string">to</span> <span class="hljs-string">speed-up</span> <span class="hljs-string">compilation</span> <span class="hljs-string">and</span> <span class="hljs-string">reduce</span> <span class="hljs-string">errors</span> <span class="hljs-string">reported</span> <span class="hljs-string">to</span> <span class="hljs-string">webpack</span>
<span class="hljs-attr">                            appendTsSuffixTo:</span> <span class="hljs-string">[/\.vue$/],</span>
<span class="hljs-attr">                            transpileOnly:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
                        <span class="hljs-string">}</span>
                    <span class="hljs-string">}</span>
                <span class="hljs-string">]</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">//...</span>
        <span class="hljs-string">],</span>

    <span class="hljs-string">},</span>
    <span class="hljs-string">//</span> <span class="hljs-string">...</span>
<span class="hljs-attr">    plugins:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">new</span> <span class="hljs-string">ForkTsCheckerWebpackPlugin({</span> <span class="hljs-attr">checkSyntacticErrors:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}),</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">}</span>
</code></pre>
<h3 id="articleHeader3">使用 <code>awesome-typescript-loader</code>
</h3>
<p>总构建时间( run build): 27秒<br>watch 时，修改代码后构建：6.5 秒</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'awesome-typescript-loader',
            },
            //...
        ],

    },
    // ...
    plugins: [
    ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>{
    <span class="hljs-keyword">module</span>: {
        rules: [
            {
                test: <span class="hljs-regexp">/\.ts$/</span>,
                exclude: <span class="hljs-regexp">/node_modules|vue\/src/</span>,
                loader: <span class="hljs-string">'awesome-typescript-loader'</span>,
            },
            <span class="hljs-comment">//...</span>
        ],

    },
    <span class="hljs-comment">// ...</span>
    plugins: [
    ]
}
</code></pre>
<p>注： 这两种方式都采用独立线程来检查 ts 语法错误。实际编译速度可能更快。比如 <code>awesome-typescript-loader</code> watch 状态，修改后编译为 2 秒。但是加上语法检查要6秒。其实第二秒时已经编译好了。</p>
<h1 id="articleHeader4">参考文章</h1>
<ol>
<li>
<a href="https://segmentfault.com/a/1190000007891318">[webpack 构建性能优化策略小结</a>](<a href="https://segmentfault.com/a/1190000007891318)" target="_blank">https://segmentfault.com/a/11...</a>
</li>
<li><a href="https://www.npmjs.com/package/awesome-typescript-loader" rel="nofollow noreferrer" target="_blank">awesome-typescript-loader</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次 webpack3 优化

## 原文链接
[https://segmentfault.com/a/1190000011935407](https://segmentfault.com/a/1190000011935407)

