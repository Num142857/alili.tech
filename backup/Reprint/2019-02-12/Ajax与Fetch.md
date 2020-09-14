---
title: 'Ajax与Fetch' 
date: 2019-02-12 2:30:12
hidden: true
slug: nm8y6eq88rr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">介绍</h1>
<p>页面中需要向服务器请求数据时，基本上都会使用Ajax来实现。Ajax的本质是使用XMLHttpRequest对象来请求数据。XMLHttpRequest的使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onload = function() {
  console.log(xhr.response);
};
xhr.onerror = function() {
  console.error('error');
};
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="JavaScript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'GET'</span>, url, <span class="hljs-literal">true</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(xhr.response);
};
xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error'</span>);
};
xhr.send();</code></pre>
<p>可以看出，XMLHttpRequest对象是通过事件的模式来实现返回数据的处理的。目前还有一个是采用Promise方式来处理数据的，这个技术叫做Fetch。</p>
<h1 id="articleHeader1">Fetch的使用</h1>
<p>使用Fetch实现请求的最基本代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(function (response) {
  return response.json();  // json返回数据
}).then(function (data) {
  console.log(data);  // 业务逻辑
}).catch(function (e) {
  console.error('error');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="JavaScript">fetch(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">return</span> response.json();  <span class="hljs-comment">// json返回数据</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data);  <span class="hljs-comment">// 业务逻辑</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error'</span>);
})</code></pre>
<p>使用ES6的箭头函数后，可以更加简洁：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(response => response.json())
.then(data => console.log(data))
.catch(e => console.error('error'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="JavaScript">fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
.catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error'</span>));</code></pre>
<p>还可以使用ES7的async/await进一步简化代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log('error');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="JavaScript"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(url);
  <span class="hljs-keyword">let</span> data = response.json();
  <span class="hljs-built_in">console</span>.log(data);
} <span class="hljs-keyword">catch</span>(e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>);
}</code></pre>
<p>这样，异步的请求可以按照同步的写法来写了。</p>
<h1 id="articleHeader2">Fetch修改head信息</h1>
<p>fetch方法中还有第二个参数，第二个参数是用于修改请求的Head信息的。可以在里面指定method是GET还是POST；如果是跨域的话，可以指定mode为cors来解决跨域问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var headers = new Headers({
  &quot;Origin&quot;: &quot;http://taobao.com&quot;
});
headers.append(&quot;Content-Type&quot;, &quot;text/plain&quot;);

var init = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

fetch(url, init).then(response => response.json())
.then(data => console.log(data))
.catch(e => console.error('error'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="JavaScript"><span class="hljs-keyword">var</span> headers = <span class="hljs-keyword">new</span> Headers({
  <span class="hljs-string">"Origin"</span>: <span class="hljs-string">"http://taobao.com"</span>
});
headers.append(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"text/plain"</span>);

<span class="hljs-keyword">var</span> init = {
  <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
  <span class="hljs-attr">headers</span>: headers,
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'cors'</span>,
  <span class="hljs-attr">cache</span>: <span class="hljs-string">'default'</span>
};

fetch(url, init).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
.catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error'</span>));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax与Fetch

## 原文链接
[https://segmentfault.com/a/1190000004871100](https://segmentfault.com/a/1190000004871100)

