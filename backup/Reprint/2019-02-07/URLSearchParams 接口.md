---
title: 'URLSearchParams 接口' 
date: 2019-02-07 2:30:15
hidden: true
slug: jo2vzdu3h9
categories: [reprint]
---

{{< raw >}}

                    
<p><code>URLSearchParams</code> 接口定义了很多个用来处理 URL 参数串的方法。</p>
<hr>
<p>基本使用方法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var paramsString = &quot;q=URLUtils.searchParams&amp;topic=api&quot;  // location.search.slice(1)
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic') // true
searchParams.get('topic') // &quot;api&quot;
searchParams.getAll('topic') // [&quot;api&quot;]

searchParams.get('foo') // null，注意Firefox返回空字符串
searchParams.set('foo', 2);
searchParams.get('foo') // 2

searchParams.append('topic', 'webdev');
searchParams.toString() // &quot;q=URLUtils.searchParams&amp;topic=api&amp;foo=2&amp;topic=webdev&quot;

searchParams.append('foo', 3);
searchParams.getAll('foo') // [2, 3]

searchParams.delete('topic');
searchParams.toString() // &quot;q=URLUtils.searchParams&amp;foo=2&amp;foo=3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> paramsString = <span class="hljs-string">"q=URLUtils.searchParams&amp;topic=api"</span>  <span class="hljs-comment">// location.search.slice(1)</span>
<span class="hljs-keyword">var</span> searchParams = <span class="hljs-keyword">new</span> <span class="hljs-type">URLSearchParams</span>(paramsString);

searchParams.has(<span class="hljs-string">'topic'</span>) <span class="hljs-comment">// true</span>
searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'topic'</span>) <span class="hljs-comment">// "api"</span>
searchParams.getAll(<span class="hljs-string">'topic'</span>) <span class="hljs-comment">// ["api"]</span>

searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'foo'</span>) <span class="hljs-comment">// null，注意Firefox返回空字符串</span>
searchParams.<span class="hljs-keyword">set</span>(<span class="hljs-string">'foo'</span>, <span class="hljs-number">2</span>);
searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'foo'</span>) <span class="hljs-comment">// 2</span>

searchParams.append(<span class="hljs-string">'topic'</span>, <span class="hljs-string">'webdev'</span>);
searchParams.toString() <span class="hljs-comment">// "q=URLUtils.searchParams&amp;topic=api&amp;foo=2&amp;topic=webdev"</span>

searchParams.append(<span class="hljs-string">'foo'</span>, <span class="hljs-number">3</span>);
searchParams.getAll(<span class="hljs-string">'foo'</span>) <span class="hljs-comment">// [2, 3]</span>

searchParams.delete(<span class="hljs-string">'topic'</span>);
searchParams.toString() <span class="hljs-comment">// "q=URLUtils.searchParams&amp;foo=2&amp;foo=3"</span></code></pre>
<hr>
<p><code>URLSearchParams</code> 还有三个方法返回迭代器对象：<br><code>keys()</code> 遍历所有参数名<br><code>values()</code> 遍历所有参数值<br><code>entries()</code> 遍历所有参数的键值对</p>
<hr>
<p>URLSearchParams实例可以当作POST数据发送，所有数据都会URL编码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">fetch</span>(<span class="hljs-string">'https://example.com/api'</span>, {
  <span class="hljs-attribute">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attribute">body</span>: params
})<span class="hljs-selector-class">.then</span>(...)</code></pre>
<hr>
<p>DOM 的 a 元素节点的 <code>searchParams</code> 属性，就是一个 <code>URLSearchParams</code> 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // &quot;api&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
a.href = <span class="hljs-string">'https://example.com?filter=api'</span>;
a.searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'filter'</span>) <span class="hljs-comment">// "api"</span></code></pre>
<p><code>URLSearchParams</code> 还可以与 <code>URL</code> 接口结合使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> url = <span class="hljs-keyword">new</span> <span class="hljs-type">URL</span>(location);
<span class="hljs-keyword">var</span> foo = url.searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'foo'</span>) || <span class="hljs-string">'somedefault'</span>;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
URLSearchParams 接口

## 原文链接
[https://segmentfault.com/a/1190000005980048](https://segmentfault.com/a/1190000005980048)

