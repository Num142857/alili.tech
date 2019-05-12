---
title: '使用 vuetron 调试 mpvue 项目' 
date: 2018-11-26 2:30:10
hidden: true
slug: yqxqx8es6tc
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x7B80;&#x4ECB;</h2><p>&#x7531;&#x4E8E;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x7684;&#x5C01;&#x95ED;&#xFF0C;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x5B89;&#x88C5; chrome &#x63D2;&#x4EF6;&#x6765;&#x65B9;&#x4FBF;&#x5730;&#x4F7F;&#x7528; vue-devtools &#x8C03;&#x8BD5;&#x6211;&#x4EEC;&#x7684; mpvue &#x9879;&#x76EE;&#x3002;<a href="https://github.com/vuetwo/vuetron" rel="nofollow noreferrer" target="_blank">vuetron</a> &#x662F;&#x4E00;&#x4E2A; vue.js &#x7684;&#x9879;&#x76EE;&#x8C03;&#x8BD5;&#x5DE5;&#x5177;, &#x540C;&#x65F6;&#x652F;&#x6301;&#x5BF9; vuex &#x53CA; vue-router &#x7684;&#x8C03;&#x8BD5;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x4F7F;&#x7528;&#x5176;&#x5BF9; vuex &#x7684;&#x8C03;&#x8BD5;&#x529F;&#x80FD;&#x3002;</p><h2 id="articleHeader1">&#x5B89;&#x88C5;</h2><h3 id="articleHeader2">npm &#x6A21;&#x5757;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuetron weapp.socket.io --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install vuetron weapp.socket.io --save-dev</code></pre><h3 id="articleHeader3">&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;</h3><p>windows &#x5E73;&#x53F0;&#x63D0;&#x4F9B;&#x7684;&#x662F;&#x538B;&#x7F29;&#x5305;&#xFF0C;&#x4E0B;&#x8F7D;&#x89E3;&#x538B;&#x540E;&#xFF0C;&#x53CC;&#x51FB; Vuetron.exe &#x5373;&#x53EF;&#x8FD0;&#x884C;&#xFF0C;&#x53E6;&#x5916;&#x4E24;&#x4E2A;&#x5E73;&#x53F0;&#x63D0;&#x4F9B;&#x7684;&#x5E94;&#x8BE5;&#x90FD;&#x662F;&#x5B89;&#x88C5;&#x5305;&#x3002;</p><ul><li><a href="https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-win32-ia32.zip" rel="nofollow noreferrer" target="_blank">windows</a></li><li><a href="https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-osx.dmg" rel="nofollow noreferrer" target="_blank">mac</a></li><li><a href="https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-amd64.deb" rel="nofollow noreferrer" target="_blank">linux</a></li></ul><h2 id="articleHeader4">&#x4F7F;&#x7528;</h2><ul><li>&#x914D;&#x7F6E; webpack &#x7684; alias</li></ul><blockquote>&#x9700;&#x4F7F;&#x7528; <a href="https://github.com/weapp-socketio/weapp.socket.io" rel="nofollow noreferrer" target="_blank">weapp.socket.io</a> &#x66FF;&#x4EE3; socket.io-client</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
  alias: {
    &apos;@&apos;: resolve(&apos;src&apos;),
    &apos;socket.io-client&apos;: &apos;weapp.socket.io&apos;,
    &apos;vue&apos;: &apos;mpvue&apos;,
  },
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">resolve: {
  <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>),
    <span class="hljs-string">&apos;socket.io-client&apos;</span>: <span class="hljs-string">&apos;weapp.socket.io&apos;</span>,
    <span class="hljs-string">&apos;vue&apos;</span>: <span class="hljs-string">&apos;mpvue&apos;</span>,
  },
},</code></pre><ul><li>&#x4F5C;&#x4E3A; vuex &#x7684;&#x63D2;&#x4EF6;&#x5F15;&#x5165;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;
import vuetron from &apos;vuetron&apos;;

Vue.use(Vuex);

const store = new Vuex.Store({
  // ...
  plugins: [vuetron.VuetronVuex()],
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;
<span class="hljs-keyword">import</span> vuetron <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuetron&apos;</span>;

Vue.use(Vuex);

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// ...</span>
  plugins: [vuetron.VuetronVuex()],
});</code></pre><h2 id="articleHeader5">&#x529F;&#x80FD;</h2><ul><li>&#x67E5;&#x770B;&#x5E76;&#x4E0E;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x5F53;&#x524D;&#x7684;&#x6570;&#x636E;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015378599?w=614&amp;h=772" src="https://static.alili.tech/img/remote/1460000015378599?w=614&amp;h=772" alt="state" title="state" style="cursor:pointer;display:inline"></span></p><ul><li>&#x5728;&#x4E0D;&#x540C;&#x65F6;&#x523B;&#x7684;&#x6570;&#x636E;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x5207;&#x6362;&#xFF0C;&#x6216;&#x8005;&#x7ACB;&#x5373;&#x6062;&#x590D;&#x4E00;&#x7EC4;&#x5B8C;&#x6574;&#x7684;&#x9879;&#x76EE;&#x6570;&#x636E;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015378600" src="https://static.alili.tech/img/remote/1460000015378600" alt="eventstream" title="eventstream" style="cursor:pointer"></span></p><ul><li>&#x8BA2;&#x9605;&#x7279;&#x5B9A;&#x6570;&#x636E;&#x6765;&#x8FDB;&#x884C;&#x8C03;&#x8BD5;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015378601" src="https://static.alili.tech/img/remote/1460000015378601" alt="Subscribe" title="Subscribe" style="cursor:pointer"></span></p><h2 id="articleHeader6">vue-devtools</h2><p>&#x4E8B;&#x5B9E;&#x4E0A; vue-devtools &#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x8FDC;&#x7A0B;&#x8C03;&#x8BD5;&#x5DE5;&#x5177; <a href="https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md" rel="nofollow noreferrer" target="_blank">vue-remote-devtools</a>&#xFF0C;&#x5F00;&#x53D1;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x65F6;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x811A;&#x672C;&#x5373;&#x53EF;&#xFF0C;&#x4F46;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#x76EE;&#x524D;&#x8FD8;&#x65E0;&#x6CD5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x5BF9;&#x5B98;&#x65B9;&#x7684;&#x811A;&#x672C;&#x505A;&#x4E9B;&#x4FEE;&#x6539;&#xFF0C;&#x540E;&#x9762;&#x6709;&#x7A7A;&#x5B8C;&#x5584;&#x540E;&#x4F1A;&#x518D;&#x505A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</p><h2 id="articleHeader7">&#x6CE8;</h2><p>&#x622A;&#x56FE;&#x6765;&#x81EA; vuetron &#x7684;<a href="http://vuetron.io/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 vuetron 调试 mpvue 项目

## 原文链接
[https://segmentfault.com/a/1190000015378596](https://segmentfault.com/a/1190000015378596)

