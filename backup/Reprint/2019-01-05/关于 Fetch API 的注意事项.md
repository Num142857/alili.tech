---
title: '关于 Fetch API 的注意事项' 
date: 2019-01-05 2:30:11
hidden: true
slug: t92k4k6jkvd
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, {
    // 'GET', 'POST', 'PUT', 'DELETE'等
    method: 'GET', 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>fetch(<span class="hljs-name">url</span>, {
    // 'GET', 'POST', 'PUT', 'DELETE'等
    method: 'GET', 
})</code></pre>
<h2 id="articleHeader0">关于 GET 参数</h2>
<p>发送<code>GET</code>请求时的<code>query</code>参数不能放到对象中（如：<code>{a:1, b:2}</code>） 必须在 <code>url</code> 字符串中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url = 'http://api.example.com/search?a=1&amp;b=2'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> url = <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//api.example.com/search?a=1&amp;b=2'</span></code></pre>
<p>可通过如下函数处理<code>url</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeURL(url, params = {}) {
    let _URL = new URL(url, window.location.origin);
    Object.keys(params).forEach(key => _URL.searchParams.append(key, params[key]));
    return _URL
}
const url = makeURL('http://api.example.com/search',{
    a: 1,
    b: 2,
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeURL</span>(<span class="hljs-params">url, params = {}</span>) </span>{
    <span class="hljs-keyword">let</span> _URL = <span class="hljs-keyword">new</span> URL(url, <span class="hljs-built_in">window</span>.location.origin);
    <span class="hljs-built_in">Object</span>.keys(params).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> _URL.searchParams.append(key, params[key]));
    <span class="hljs-keyword">return</span> _URL
}
<span class="hljs-keyword">const</span> url = makeURL(<span class="hljs-string">'http://api.example.com/search'</span>,{
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
})</code></pre>
<p>然后发起请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, {
    method: 'GET'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">fetch</span>(<span class="hljs-selector-tag">url</span>, {
    <span class="hljs-attribute">method</span>: <span class="hljs-string">'GET'</span>
})</code></pre>
<h2 id="articleHeader1">关于 POST 请求体 body</h2>
<p>如需通过<code>POST</code>请求的发送<code>json</code>，需要做字符串化处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
    body: JSON.stringify({a: 1, b: 2})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">fetch</span>(<span class="hljs-selector-tag">url</span>, {
    <span class="hljs-attribute">method</span>: <span class="hljs-string">'POST'</span>,
    headers: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
    }
    <span class="hljs-selector-tag">body</span>: <span class="hljs-selector-tag">JSON</span><span class="hljs-selector-class">.stringify</span>({<span class="hljs-attribute">a</span>: <span class="hljs-number">1</span>, b: <span class="hljs-number">2</span>})
})</code></pre>
<h2 id="articleHeader2">关于 cookies</h2>
<p>Fetch 发送请求默认不携带 <code>cookies</code>，如需携带，需要添加<code>credentials: 'include'</code> 参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url,{
    method: 'GET', // 'POST'等
    credentials: 'include',
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">fetch</span>(<span class="hljs-selector-tag">url</span>,{
    <span class="hljs-attribute">method</span>: <span class="hljs-string">'GET'</span>, // <span class="hljs-string">'POST'</span>等
    credentials: <span class="hljs-string">'include'</span>,
})</code></pre>
<h2 id="articleHeader3">关于 Headers</h2>
<p>定义<code>headers</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const headers = {
    &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;
    &quot;Authorization&quot;: &quot;Token uynn887989afs989s8df9afa08&amp;^&amp;huh&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> headers = {
    <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/x-www-form-urlencoded"</span>
    <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">"Token uynn887989afs989s8df9afa08&amp;^&amp;huh"</span>
}</code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const headers = new Headers({
    &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;
    &quot;Authorization&quot;: &quot;Token uynn887989afs989s8df9afa08&amp;^&amp;huh&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> headers = <span class="hljs-keyword">new</span> Headers({
    <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/x-www-form-urlencoded"</span>
    <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">"Token uynn887989afs989s8df9afa08&amp;^&amp;huh"</span>
})</code></pre>
<p>发送请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, {
  method: &quot;POST&quot;,
  headers: headers,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>fetch(url, {
  method: <span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>,
  headers: headers,
}</code></pre>
<p>自定义的 <code>headers</code>中的键会经过 <code>Headers</code> 对象包装，会自动转换为小写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Create a test Headers object
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Vary', 'Accept-Language');

// Display the key/value pairs
for (var [key,value] of myHeaders.entries()) {
    console.log(`${key}: ${value}`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Create a test Headers object</span>
<span class="hljs-keyword">var</span> myHeaders = <span class="hljs-keyword">new</span> Headers();
myHeaders.append(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/xml'</span>);
myHeaders.append(<span class="hljs-string">'Vary'</span>, <span class="hljs-string">'Accept-Language'</span>);

<span class="hljs-comment">// Display the key/value pairs</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> [key,value] <span class="hljs-keyword">of</span> myHeaders.entries()) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${key}</span>: <span class="hljs-subst">${value}</span>`</span>);
}</code></pre>
<p>输出为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="content-type: text/xml
VM141:8 vary: Accept-Language" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>content-<span class="hljs-keyword">type</span>: text/<span class="hljs-keyword">xml</span>
<span class="hljs-title">VM141</span>:<span class="hljs-number">8</span> vary: Accept-Language</code></pre>
<p>因此当我们发送 <code>Authorization</code> 令牌时，在服务端接收到的是 <code>authorization</code>，如果仍用 <code>Authorization</code> 处理，将发生错误。</p>
<h2 id="articleHeader4">文件上传失败解决</h2>
<p><strong>删除你的自定义<code>Content-Type</code>请求头设置</strong></p>
<p>参见：<a href="https://segmentfault.com/a/1190000010205162">fetch实（cai）践（keng）补充篇，文件上传Content-type multipart/form-data怎么设置</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 Fetch API 的注意事项

## 原文链接
[https://segmentfault.com/a/1190000010520266](https://segmentfault.com/a/1190000010520266)

