---
title: 'react eject里面集成antd（或antd-mobile）' 
date: 2018-11-28 2:30:11
hidden: true
slug: o7updxahahh
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x6587;&#x9002;&#x5408;&#x9605;&#x8BFB;&#x5BF9;&#x8C61;&#xFF1A;</p><h1 id="articleHeader0">&#x4F7F;&#x7528;create-react-app&#x751F;&#x6210;&#x9879;&#x76EE;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x8FD0;&#x884C;npm run eject&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x60F3;&#x96C6;&#x6210;antd&#xFF08;antd-mobile&#xFF09;</h1><p>1.&#x5B89;&#x88C5;babel-plugin-import&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-import --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">import</span> <span class="hljs-comment">--save-dev</span></code></pre><p>2.&#x4FEE;&#x6539;<code>config/webpack.config.dev.js</code>&#x548C;<code>config/webpack.config.prod.js</code>:<br>&#x627E;&#x5230;&#x8FD9;2&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x8FD9;2&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x627E;&#x5230;&#x4EE5;&#x4E0B;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve(&apos;babel-loader&apos;),
            options: {
              // &#x52A0;&#x4E0A;&#x4E0B;&#x9762;&#x7684;plugins
              plugins: [
                [&apos;import&apos;, { libraryName: &apos;antd-mobile&apos;, style: &apos;css&apos; }]// antd&#x6216;antd-mobile
              ],
              
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">          <span class="hljs-comment">// Process JS with Babel.</span>
          {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx|mjs)$/</span>,
            <span class="hljs-attr">include</span>: paths.appSrc,
            <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;babel-loader&apos;</span>),
            <span class="hljs-attr">options</span>: {
              <span class="hljs-comment">// &#x52A0;&#x4E0A;&#x4E0B;&#x9762;&#x7684;plugins</span>
              plugins: [
                [<span class="hljs-string">&apos;import&apos;</span>, { <span class="hljs-attr">libraryName</span>: <span class="hljs-string">&apos;antd-mobile&apos;</span>, <span class="hljs-attr">style</span>: <span class="hljs-string">&apos;css&apos;</span> }]<span class="hljs-comment">// antd&#x6216;antd-mobile</span>
              ],
              
              <span class="hljs-comment">// This is a feature of `babel-loader` for webpack (not Babel itself).</span>
              <span class="hljs-comment">// It enables caching results in ./node_modules/.cache/babel-loader/</span>
              <span class="hljs-comment">// directory for faster rebuilds.</span>
              cacheDirectory: <span class="hljs-literal">true</span>,
            },
          },</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react eject里面集成antd（或antd-mobile）

## 原文链接
[https://segmentfault.com/a/1190000015275863](https://segmentfault.com/a/1190000015275863)

