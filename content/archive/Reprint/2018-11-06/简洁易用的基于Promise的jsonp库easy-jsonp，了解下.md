---
title: 简洁易用的基于Promise的jsonp库easy-jsonp，了解下
reprint: true
categories: reprint
abbrlink: 2ef87562
date: 2018-11-06 15:28:31
---

{{% raw %}}
<p>&#x73B0;&#x5728;&#x6D41;&#x884C;&#x7684;axios&#x5E93;&#x4E0D;&#x652F;&#x6301;jsonp&#xFF0C;&#x56E0;&#x6B64;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4E00;&#x4E2A;jsonp&#x5E93;&#xFF0C;&#x7B80;&#x5355;&#x6613;&#x7528;&#x3002;&#x4EE5;&#x4E0B;&#x662F;&#x4ECB;&#x7ECD;&#xFF1A;</p><h1 id="articleHeader0">Easy JSONP</h1><p>A minimal and lightweight JSONP implementation which is used to be a kind of cross domain solutions.</p><h2 id="articleHeader1">Features</h2><ul><li>Implement JSONP request from the browser</li><li>Combine URL query parameters by default behavior</li><li>Support the [Promise] API</li><li>Limit JSONP request period</li><li>Handle network error response</li></ul><h2 id="articleHeader2">Install</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# using npm
npm i easy-jsonp" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># using npm</span>
npm i easy-jsonp</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# using yarn
yarn add easy-jsonp" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># using yarn</span>
yarn add easy-jsonp</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# using script target
&lt;script src=&quot;jsonp.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"># using script target
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jsonp.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader3">Usage</h2><p>JSONP <strong><em>only</em></strong> support GET methods, same as <code>easy-JSONP</code>.</p><ul><li>The code below show you how to use package as a dependency</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// as a request dependency named jsonp
import jsonp from &apos;easy-jsonp&apos;
const jsonp = require(&apos;easy-jsonp&apos;).default" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// as a request dependency named jsonp</span>
<span class="hljs-keyword">import</span> jsonp <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;easy-jsonp&apos;</span>
<span class="hljs-keyword">const</span> jsonp = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;easy-jsonp&apos;</span>).default</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonp({
  url: &apos;http://localhost&apos;,
  // global function named `callback` will be invoked when JSONP response
  callback: &apos;callback&apos;, // any different name from request module
  timeout: 3000,
  params: {
    // eg. ?key0=0&amp;key1=1...
    key0: 0,
    key1: 1
  }
})
  .then(res =&gt; console.log(res))
  .catch(err =&gt; console.error(err))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">jsonp({
  <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost&apos;</span>,
  <span class="hljs-comment">// global function named `callback` will be invoked when JSONP response</span>
  callback: <span class="hljs-string">&apos;callback&apos;</span>, <span class="hljs-comment">// any different name from request module</span>
  timeout: <span class="hljs-number">3000</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-comment">// eg. ?key0=0&amp;key1=1...</span>
    key0: <span class="hljs-number">0</span>,
    <span class="hljs-attr">key1</span>: <span class="hljs-number">1</span>
  }
})
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(err))</code></pre><p>&#x26A0;&#xFE0F; <strong><em>Notice</em></strong>: Parameter <code>callback</code> value <strong><em>MUST NOT</em></strong> be same as request module name (eg. dependency named <code>jsonp</code> above code), otherwise request module only works once and function named value of parameter <code>callback</code> will be reset to <code>null</code> (internal implementation) which means the same name request module will be also reset unexpectedly.</p><blockquote>For more customization capability, This package wouldn&apos;t convert <code>callback</code> to a new name to prevent unexpected reset.</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonp({
  // custom configuration
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">jsonp({
  <span class="hljs-comment">// custom configuration</span>
})</code></pre><p>&#x26A0;&#xFE0F; <strong><em>Notice</em></strong>: For same reason, parameter <code>callback</code> value <strong><em>MUST NOT</em></strong> be <code>jsonp</code>.</p><h2 id="articleHeader4">Parameters</h2><table><thead><tr><th>options parameter</th><th>type</th><th>required</th><th>description</th></tr></thead><tbody><tr><td><code>url</code></td><td><code>String</code></td><td>true</td><td>JSONP request address</td></tr><tr><td><code>timeout</code></td><td><code>Number</code></td><td>false, default : <code>6000</code> milliseconds</td><td>how long after timeout error is emitted. <code>0</code> to disable</td></tr><tr><td><code>callback</code></td><td><code>String</code></td><td>false, default : <code>&apos;jsonpCallback&apos;+Date.now()</code></td><td>global callback function name which is used to handle JSONP response.</td></tr><tr><td><code>params</code></td><td><code>Object</code></td><td>false, default: <code>{}</code></td><td>other parameters in query string parameters</td></tr></tbody></table><h2 id="articleHeader5">Notice</h2><ul><li><code>Uncaught SyntaxError: Unexpected token :</code>error</li></ul><p>It mostly doesn&apos;t support JSONP request when you are calling a JSON api. The difference between JSON api and JSONP is that JSON api response with an object like <code>{ num: 1 }</code> (It will throw a error when client executed this response as a function. ). On the other hand, JSONP will respond with a function wrapped object like <code>callback({ num: 1 })</code> and we will get what we need when client executed this response as a function.</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简洁易用的基于Promise的jsonp库easy-jsonp，了解下

## 原文链接
[https://segmentfault.com/a/1190000016555183](https://segmentfault.com/a/1190000016555183)

