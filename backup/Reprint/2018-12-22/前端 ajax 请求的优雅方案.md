---
title: '前端 ajax 请求的优雅方案' 
date: 2018-12-22 2:30:10
hidden: true
slug: yd5103fmo6i
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文<code>http</code>客户端为<code>axios</code>
</blockquote>
<h3 id="articleHeader0">先讲个故事</h3>
<p>类似<code>axios</code>这种支持<code>Promise</code>的<code>API</code>已经很友好了，请求成功后我们可以从<code>then</code>的<code>Response</code>中拿到后端返回的数据。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user/12345')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(<span class="hljs-string">'/user/12345'</span>)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
    })
    .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(error);
    });</code></pre>
<p>数据在<code>response.data</code>中，这意味着我们每个请求都需要多做一次处理才能拿到实际的数据。<br>然后，实际场景后端基本不会直接把数据给我们，他会做一层封装，比如<code>response.data</code>的结构会是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;date&quot;: &quot;2017-12-14 15:21:38&quot;,
    &quot;success&quot;: true,
    &quot;obj&quot;: {
        ...
    },
    &quot;version&quot;: &quot;V1.0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"date"</span>: <span class="hljs-string">"2017-12-14 15:21:38"</span>,
    <span class="hljs-attr">"success"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"obj"</span>: {
        ...
    },
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"V1.0"</span>
}</code></pre>
<p>所以，<code>response.data.obj</code>才是我们真正要的数据啊喂，所以我们每个请求都需要再多做一次处理=_=</p>
<p>突然有一天，后端说，“<code>response.data</code>不再是对象，改成了<code>JSON</code>字符串，你做一下处理~”。<br>然后是的，每个接口，是<strong>每一个</strong>，我们都需要改成<code>JSON.parse(response.data).obj</code>，半条命哦！</p>
<p>如果，后端再说，“我又改回对象了，你撤销之前的处理吧~”。。。<br>如果，后端又说，“不是所有的都是对象，有一些还是<code>JSON</code>字符串，具体你看下更新的接口文档~”。。。<br>如果，我们不曾相遇。。。</p>
<h3 id="articleHeader1">后来的我们</h3>
<blockquote>
<code>ES6 Proxy</code>用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（<code>meta programming</code>），即对编程语言进行编程。<br><code>Proxy</code>可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。</blockquote>
<p>要解除上述苦恼，我们需要对所有的接口请求做统一的封装。如此一来，就算后端改来改去，我们只需修改一个地方甚至不用修改！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const apiService = new Proxy(axios, {
  get (target, propKey, receiver) {
    return function (...args) {
      return target[propKey](...args)
        .then((res) => {
          const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          return typeof resData.obj === 'string' ? JSON.parse(resData.obj) : resData.obj;
        })
        .catch((err) => {
          throw err;
        });
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> apiService = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(axios, {
  get (target, propKey, receiver) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) </span>{
      <span class="hljs-keyword">return</span> target[propKey](...args)
        .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> resData = <span class="hljs-keyword">typeof</span> res.data === <span class="hljs-string">'string'</span> ? <span class="hljs-built_in">JSON</span>.parse(res.data) : res.data;
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> resData.obj === <span class="hljs-string">'string'</span> ? <span class="hljs-built_in">JSON</span>.parse(resData.obj) : resData.obj;
        })
        .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          <span class="hljs-keyword">throw</span> err;
        });
    }
  }
});</code></pre>
<p>对应的接口请求部分改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apiService.get('/user/12345')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">apiService.get(<span class="hljs-string">'/user/12345'</span>)
    .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(data);
    })
    .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(error);
    });</code></pre>
<p>“你随便改，我改一下算我输！”</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端 ajax 请求的优雅方案

## 原文链接
[https://segmentfault.com/a/1190000012428346](https://segmentfault.com/a/1190000012428346)

