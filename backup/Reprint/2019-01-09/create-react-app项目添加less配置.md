---
title: 'create-react-app项目添加less配置' 
date: 2019-01-09 2:30:11
hidden: true
slug: hs7j1l6kbp
categories: [reprint]
---

{{< raw >}}

                    
<p>使用<code>create-react-app</code> 创建的项目默认不支持<code>less</code>，以下增加<code>less</code>配置的步骤</p>
<h3 id="articleHeader0">暴露配置文件</h3>
<p><code>create-react-app</code>生成的项目文，看不到webpack相关的配置文件，需要先暴露出来，使用如下命令即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> eject</span></code></pre>
<h3 id="articleHeader1">安装<code>less-loader</code> 和 <code>less</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less-loader less --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-keyword">less</span> <span class="hljs-comment">--save-dev</span></code></pre>
<h3 id="articleHeader2">修改<code>webpack</code>配置</h3>
<p>修改 <code>webpack.config.dev.js</code> 和 <code>webpack.config-prod.js</code> 配置文件</p>
<p><strong><em>改动1：</em></strong></p>
<p><code>/\.css$/</code> 改为 <code>/\.(css|less)$/,</code>, 修改后如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exclude: [
  /\.html$/,
  /\.(js|jsx)$/,
  /\.(css|less)$/,
  /\.json$/,
  /\.bmp$/,
  /\.gif$/,
  /\.jpe?g$/,
  /\.png$/,
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">exclude</span>: [
  <span class="hljs-regexp">/\.html$/</span>,
  <span class="hljs-regexp">/\.(js|jsx)$/</span>,
  <span class="hljs-regexp">/\.(css|less)$/</span>,
  <span class="hljs-regexp">/\.json$/</span>,
  <span class="hljs-regexp">/\.bmp$/</span>,
  <span class="hljs-regexp">/\.gif$/</span>,
  <span class="hljs-regexp">/\.jpe?g$/</span>,
  <span class="hljs-regexp">/\.png$/</span>,
],</code></pre>
<p><strong><em>改动2：</em></strong></p>
<ul>
<li>
<code>test: /\.css$/</code> 改为 <code>/\.(css|less)$/</code>
</li>
<li>
<code>test: /\.css$/</code> 的 <code>use</code> 数组配置增加 <code>less-loader</code>
</li>
</ul>
<p>修改后如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(css|less)$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('less-loader') // compiles Less to CSS
    }
  ],
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(css|less)$/</span>,
  <span class="hljs-attr">use</span>: [
    <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'style-loader'</span>),
    {
      <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'css-loader'</span>),
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,
      },
    },
    {
      <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'postcss-loader'</span>),
      <span class="hljs-attr">options</span>: {
        <span class="hljs-comment">// Necessary for external CSS imports to work</span>
        <span class="hljs-comment">// https://github.com/facebookincubator/create-react-app/issues/2677</span>
        ident: <span class="hljs-string">'postcss'</span>,
        <span class="hljs-attr">plugins</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> [
          <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-flexbugs-fixes'</span>),
          autoprefixer({
            <span class="hljs-attr">browsers</span>: [
              <span class="hljs-string">'&gt;1%'</span>,
              <span class="hljs-string">'last 4 versions'</span>,
              <span class="hljs-string">'Firefox ESR'</span>,
              <span class="hljs-string">'not ie &lt; 9'</span>, <span class="hljs-comment">// React doesn't support IE8 anyway</span>
            ],
            <span class="hljs-attr">flexbox</span>: <span class="hljs-string">'no-2009'</span>,
          }),
        ],
      },
    },
    {
      <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'less-loader'</span>) <span class="hljs-comment">// compiles Less to CSS</span>
    }
  ],
},
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
create-react-app项目添加less配置

## 原文链接
[https://segmentfault.com/a/1190000010162614](https://segmentfault.com/a/1190000010162614)

