---
title: 'parcel 错误：SyntaxError: Unexpected token function' 
date: 2018-12-22 2:30:11
hidden: true
slug: fjv2tymb335
categories: [reprint]
---

{{< raw >}}

                    
<p>在使用 parcel 的时候，很多人遇到了一个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function bundle(main, command) {
      ^^^^^^^^ 
SyntaxError: Unexpected token function
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bundle</span>(<span class="hljs-params">main, command</span>) </span>{
      ^^^^^^^^ 
<span class="hljs-built_in">SyntaxError</span>: Unexpected token <span class="hljs-function"><span class="hljs-keyword">function</span>
</span></code></pre>
<p>对于这个错误，很多人似曾相识，以为是 babel 配置的问题。</p>
<p>但是 parcel 号称是零配置，是不需要配置 babel 的。</p>
<p>如果使用全局安装 parcel，会发现这个是 parcel 自身的报错：</p>
<p><span class="img-wrap"><img data-src="/img/bVZ93u?w=502&amp;h=242" src="https://static.alili.tech/img/bVZ93u?w=502&amp;h=242" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在 parcel 的 package.json 文件写着</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;engines&quot;: {
    &quot;node&quot;: &quot;>= 6.0.0&quot;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"engines"</span>: {
    <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;= 6.0.0"</span>
},
</code></pre>
<p>所以 parcel 是支持 6.x 版本的。</p>
<p>而且在 parcel 的入口文件也有版本判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Node 8 supports native async functions - no need to use compiled code!
module.exports = parseInt(process.versions.node, 10) < 8
  ? require('./lib/Bundler')
  : require('./src/Bundler');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Node 8 supports native async functions - no need to use compiled code!</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">parseInt</span>(process.versions.node, <span class="hljs-number">10</span>) &lt; <span class="hljs-number">8</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/Bundler'</span>)
  : <span class="hljs-built_in">require</span>(<span class="hljs-string">'./src/Bundler'</span>);
</code></pre>
<p>但是在 parcel 的 bin/cli.js 文件中<strong>却使用了 async 函数</strong>。</p>
<p>所以，使用 parcel 时还是把 nodejs 版本升级到 8.x 吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
parcel 错误：SyntaxError: Unexpected token function

## 原文链接
[https://segmentfault.com/a/1190000012392912](https://segmentfault.com/a/1190000012392912)

