---
title: 'Webpack小技巧-公共组件引用路径简化' 
date: 2018-11-28 2:30:10
hidden: true
slug: o0ghlqmglu
categories: [reprint]
---

{{< raw >}}
<p>&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5E38;&#x5E38;&#x628A;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x5305;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x6A21;&#x5757;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F9B;&#x4E0D;&#x540C;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x968F;&#x7740;&#x9879;&#x76EE;&#x4E0D;&#x65AD;&#x53D8;&#x5927;&#xFF0C;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0D;&#x65AD;&#x53D8;&#x6DF1;&#xFF0C;&#x6211;&#x4EEC;&#x5F15;&#x7528;&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#x8D8A;&#x6765;&#x8D8A;&#x957F;&#xFF01;</p><p>&#x4F8B;&#x5982;&#xFF1A;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Menu from &apos;../../../../../components/Menu&apos;; // &#x8FD9;&#x91CC;&#x8DEF;&#x5F84;&#x592A;&#x6DF1;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x5199;&#x9519;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> Menu <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../../../../components/Menu&apos;</span>; <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8DEF;&#x5F84;&#x592A;&#x6DF1;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x5199;&#x9519;</span></code></pre><p><strong>&#x6211;&#x4EEC;&#x8BE5;&#x600E;&#x4E48;&#x4F18;&#x5316;&#x5C3C;&#xFF1F;</strong></p><h4>&#x89E3;&#x51B3;&#x65B9;&#x6848;1&#xFF1A;&#x4F7F;&#x7528;webpack&#x7684;<a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">resolve.alias</a>&#x5C5E;&#x6027;</h4><p>&#x5148;&#x914D;&#x7F6E;webpack</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    ...
    resolve: {
        alias: {
            &quot;@commModule&quot;: path.resolve(__dirname, &quot;src/components/&quot;)
        }
    }
    ...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    ...
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-string">&quot;@commModule&quot;</span>: path.resolve(__dirname, <span class="hljs-string">&quot;src/components/&quot;</span>)
        }
    }
    ...
};</code></pre><p>&#x5F15;&#x7528;Menu&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Menu from &apos;@commModule/Menu&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> Menu <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@commModule/Menu&apos;</span>;</code></pre><h4>&#x89E3;&#x51B3;&#x65B9;&#x6848;2&#xFF1A;<a href="https://github.com/tleunen/babel-plugin-module-resolver" rel="nofollow noreferrer" target="_blank">babel-plugin-module-resolver</a></h4><p>&#x914D;&#x7F6E;.babelrc</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
        [&quot;module-resolver&quot;, {
            &quot;alias&quot;: {
                &quot;@commMdule&quot;: &quot;./src/components&quot;
            }
        }]
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">&quot;plugins&quot;</span>: [
        [<span class="hljs-string">&quot;module-resolver&quot;</span>, {
            <span class="hljs-string">&quot;alias&quot;</span>: {
                <span class="hljs-string">&quot;@commMdule&quot;</span>: <span class="hljs-string">&quot;./src/components&quot;</span>
            }
        }]
    ]
}</code></pre><p>&#x5F15;&#x7528;Menu&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Menu from &apos;@commModule/Menu&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> Menu <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@commModule/Menu&apos;</span>;</code></pre><h4>&#x603B;&#x7ED3;</h4><p>&#x6216;&#x8BB8;&#x8FD9;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5C0F;&#x4F18;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x80FD;&#x591F;&#x5927;&#x5927;&#x7684;&#x964D;&#x4F4E;&#x6211;&#x4EEC;&#x7684;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#xFF0C;&#x63D0;&#x9AD8;&#x6211;&#x4EEC;&#x7684;&#x751F;&#x4EA7;&#x6548;&#x7387;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack小技巧-公共组件引用路径简化

## 原文链接
[https://segmentfault.com/a/1190000015293381](https://segmentfault.com/a/1190000015293381)

