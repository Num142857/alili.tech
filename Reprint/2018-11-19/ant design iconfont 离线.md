---
title: 'ant design iconfont 离线' 
date: 2018-11-19 2:30:10
hidden: true
slug: gbj08g0sn9r
categories: [reprint]
---

{{< raw >}}
<p>ant design &#x7684;iconfont &#x5B57;&#x4F53;&#x662F;&#x8C03;&#x7528;&#x7684;&#x963F;&#x91CC;&#x7684;CDN&#x5730;&#x5740;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x5185;&#x7F51;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x6216;&#x8005;&#x88AB;&#x5C4F;&#x853D;&#x7684;&#x7AD9;&#x70B9;&#xFF0C;&#x4E0B;&#x8F7D;&#x7684;&#x5B57;&#x4F53;&#x5730;&#x5740;&#x5C31;&#x4E0D;&#x751F;&#x6548;&#x4E86;&#x3002;&#x5B98;&#x7F51;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x66FF;&#x6362;less&#x53D8;&#x91CF; @icon-url&#xFF0C; &#x8BE6;&#x89C1;&#xFF1A; <a href="https://github.com/Joannamo/antd-init/tree/master/examples/local-iconfont" rel="nofollow noreferrer" target="_blank">https://github.com/Joannamo/a...</a></p><p><strong>&#x9664;&#x4E86;&#x8FD9;&#x79CD;&#x65B9;&#x6848;&#xFF0C;&#x73B0;&#x63D0;&#x4F9B;&#x4E00;&#x79CD;&#x4FEE;&#x6539;&#x901A;&#x8FC7;webpack&#x7684;&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4FEE;&#x6539;&#x3002;</strong></p><h2 id="articleHeader0">step 1: &#x4E0B;&#x8F7D;&#x76F8;&#x5E94;&#x7684;&#x5B57;&#x4F53;&#x5230;&#x672C;&#x5730;</h2><p>&#x4E0B;&#x8F7D;&#x5730;&#x5740;&#xFF1A;<a href="https://ant.design/docs/spec/download-cn" rel="nofollow noreferrer" target="_blank">https://ant.design/docs/spec/...</a></p><p>&#x53EF;&#x4EE5;&#x628A;&#x4E0B;&#x8F7D;&#x7684;&#x6587;&#x4EF6;&#x653E;&#x5165;&#x5230;public&#x76EE;&#x5F55;&#x4E2D;&#x3002;</p><h2 id="articleHeader1">step 2: webpack &#x914D;&#x7F6E;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
        test: /\.less$/,
        use: [
          require.resolve(&apos;style-loader&apos;),
          require.resolve(&apos;css-loader&apos;),
          {
            loader: require.resolve(&apos;postcss-loader&apos;),
            options: {
              ident: &apos;postcss&apos;, // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () =&gt; [
                require(&apos;postcss-flexbugs-fixes&apos;),
                autoprefixer({
                  browsers: [
                    &apos;&gt;1%&apos;,
                    &apos;last 4 versions&apos;,
                    &apos;Firefox ESR&apos;,
                    &apos;not ie &lt; 9&apos;, // React doesn&apos;t support IE8 anyway
                  ],
                  flexbox: &apos;no-2009&apos;,
                }),
              ],
            },
          },
          {
            loader: require.resolve(&apos;less-loader&apos;),
            options: {
                modifyVars: {
                    &apos;@font-size-base&apos;: &apos;13px&apos;,
                    &apos;@text-color&apos;: &apos;fade(#000, 75%)&apos;,
                    &quot;@icon-url&quot;: &apos;&quot;/iconfont/iconfont&quot;&apos;
                }
            },
          },
        ],
      }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>{
        test: <span class="hljs-regexp">/\.less$/</span>,
        use: [
          <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;style-loader&apos;</span>),
          <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;css-loader&apos;</span>),
          {
            loader: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;postcss-loader&apos;</span>),
            options: {
              ident: <span class="hljs-string">&apos;postcss&apos;</span>, <span class="hljs-regexp">//</span> https:<span class="hljs-regexp">//</span>webpack.js.org<span class="hljs-regexp">/guides/migrating/</span><span class="hljs-comment">#complex-options</span>
              plugins: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> [
                <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;postcss-flexbugs-fixes&apos;</span>),
                autoprefixer({
                  browsers: [
                    <span class="hljs-string">&apos;&gt;1%&apos;</span>,
                    <span class="hljs-string">&apos;last 4 versions&apos;</span>,
                    <span class="hljs-string">&apos;Firefox ESR&apos;</span>,
                    <span class="hljs-string">&apos;not ie &lt; 9&apos;</span>, <span class="hljs-regexp">//</span> React doesn<span class="hljs-string">&apos;t support IE8 anyway
                  ],
                  flexbox: &apos;</span><span class="hljs-literal">no</span><span class="hljs-number">-2009</span><span class="hljs-string">&apos;,
                }),
              ],
            },
          },
          {
            loader: require.resolve(&apos;</span>less-loader<span class="hljs-string">&apos;),
            options: {
                modifyVars: {
                    &apos;</span>@font-size-base<span class="hljs-string">&apos;: &apos;</span><span class="hljs-number">13</span>px<span class="hljs-string">&apos;,
                    &apos;</span>@text-color<span class="hljs-string">&apos;: &apos;</span>fade(<span class="hljs-comment">#000, 75%)&apos;,</span>
                    <span class="hljs-string">&quot;@icon-url&quot;</span>: <span class="hljs-string">&apos;&quot;/iconfont/iconfont&quot;&apos;</span>
                }
            },
          },
        ],
      }
</code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x8DDF;&#x5B98;&#x65B9;&#x7684;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x5F0F;&#x76F8;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x8FD9;&#x91CC;&#x662F;&#x91C7;&#x7528;webpack&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;webpack&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#x66F4;&#x7075;&#x6D3B;&#x3002;</p><p>&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x66F4;&#x7C97;&#x66B4;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x76F4;&#x63A5;&#x53BB;ant design&#x91CC;&#x9762;&#x4FEE;&#x6539;&#x6587;&#x4EF6;&#x4E2D;&#x7684; @icon-url&#x7684;&#x5730;&#x5740;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ant design iconfont 离线

## 原文链接
[https://segmentfault.com/a/1190000015848859](https://segmentfault.com/a/1190000015848859)

