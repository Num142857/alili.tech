---
title: 'Vuejs之axios获取Http响应头' 
date: 2019-01-16 2:30:08
hidden: true
slug: k10x1ckd7fn
categories: [reprint]
---

{{< raw >}}

                    
<p>今天在开始接入后端Api 就遇到了一个问题了 </p>
<p>在用 axios 获取 respose headers 时候获取到的只有的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {
    cache-control:&quot;private, must-revalidate&quot;,
    content-type:&quot;application/json&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span> {
    <span class="hljs-attribute">cache-control</span>:<span class="hljs-string">"private, must-revalidate"</span>,
    content-type:<span class="hljs-string">"application/json"</span>
}</code></pre>
<p>下面是服务器返回的响应头， 我需要拿到的是 Authorization <br><span class="img-wrap"><img data-src="/img/bVMr25?w=721&amp;h=380" src="https://static.alili.tech/img/bVMr25?w=721&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>使用 respose.headers 拿到的只用两个默认的headers,  尝试了使用捕获响应头的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   axios.interceptors.response.use(function (response) {
        // Do something with response data
        console.log(response);
        return response;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
        <span class="hljs-comment">// Do something with response data</span>
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">return</span> response;
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
        <span class="hljs-comment">// Do something with response error</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
    });
</code></pre>
<p>结果打印出来的还是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {
    cache-control:&quot;private, must-revalidate&quot;,
    content-type:&quot;application/json&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span> {
    <span class="hljs-attribute">cache-control</span>:<span class="hljs-string">"private, must-revalidate"</span>,
    content-type:<span class="hljs-string">"application/json"</span>
}</code></pre>
<p>找了半天问题， 后面的在一个论坛找到了解决方法 </p>
<p>原来在默认的请求上， 浏览器只能访问以下默认的 响应头</p>
<ul>
<li><p>Cache-Control</p></li>
<li><p>Content-Language</p></li>
<li><p>Content-Type</p></li>
<li><p>Expires</p></li>
<li><p>Last-Modified</p></li>
<li><p>Pragma</p></li>
</ul>
<p>如果想让浏览器能访问到其他的 响应头的话 需要在服务器上设置 <code> Access-Control-Expose-Headers </code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Expose-Headers : 'Authorization'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Access</span>-Control-Expose-Headers : '<span class="hljs-type">Authorization</span>'</code></pre>
<p>前端成功获取Authorization</p>
<p><span class="img-wrap"><img data-src="/img/bVMr4S?w=878&amp;h=95" src="https://static.alili.tech/img/bVMr4S?w=878&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields" rel="nofollow noreferrer" target="_blank">原文地址 ：</a><a href="http://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/ques...</a> </p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuejs之axios获取Http响应头

## 原文链接
[https://segmentfault.com/a/1190000009125333](https://segmentfault.com/a/1190000009125333)

