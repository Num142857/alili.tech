---
title: '兼容IE6的fetch polyfill' 
date: 2019-02-06 2:30:08
hidden: true
slug: o3p6n8rz76
categories: [reprint]
---

{{< raw >}}

                    
<p>react社区起来后，不满足现在的AJAX方案，搞了一个fetch。fetch只有在一些非常新的浏览器才支持，而github上的fetch却最多兼容到IE8，并且麻烦得要死，需要安装一大堆polyfill才能运行起来。</p>
<p>于是我搞了一个兼容IE6的<a href="https://github.com/RubyLouvre/fetch-polyfill" rel="nofollow noreferrer" target="_blank">polyfill</a>。用法与原生的一模一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install fetch-polyfill2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">fetch</span>-polyfill2
</code></pre>
<p>当然想要在IE6运行起来，还需要Promise与JSON3。</p>
<p>推荐使用性能最好的bluebird与JSON3</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install bluebird -- save
$ npm install json3 -- save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">bluebird </span>-- save
$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">json3 </span>-- save
</code></pre>
<p>它内部是使用4种通信手段与后端交换数据</p>
<p><span class="img-wrap"><img data-src="/img/bVAgmF" src="https://static.alili.tech/img/bVAgmF" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">HTML</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/users.html'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.text()
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
    <span class="hljs-built_in">document</span>.body.innerHTML = body
  })</code></pre>
<h3 id="articleHeader1">JSON</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/users.json'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.json()
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'parsed json'</span>, json)
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ex</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'parsing failed'</span>, ex)
  })</code></pre>
<h3 id="articleHeader2">Response metadata</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/users.json'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(response.headers.get(<span class="hljs-string">'Content-Type'</span>))
  <span class="hljs-built_in">console</span>.log(response.headers.get(<span class="hljs-string">'Date'</span>))
  <span class="hljs-built_in">console</span>.log(response.status)
  <span class="hljs-built_in">console</span>.log(response.statusText)
})</code></pre>
<h3 id="articleHeader3">Post form</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var form = document.querySelector('form')

fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> form = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'form'</span>)

fetch(<span class="hljs-string">'/users'</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-keyword">new</span> FormData(form)
})</code></pre>
<h3 id="articleHeader4">Post JSON</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/users'</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
  },
  <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Hubot'</span>,
    <span class="hljs-attr">login</span>: <span class="hljs-string">'hubot'</span>,
  })
})</code></pre>
<h3 id="articleHeader5">File upload</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var input = document.querySelector('input[type=&quot;file&quot;]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'POST',
  body: data
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type="file"]'</span>)

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData()
data.append(<span class="hljs-string">'file'</span>, input.files[<span class="hljs-number">0</span>])
data.append(<span class="hljs-string">'user'</span>, <span class="hljs-string">'hubot'</span>)

fetch(<span class="hljs-string">'/avatars'</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">body</span>: data
})</code></pre>
<h3 id="articleHeader6">IE6-7 cors</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users', { //jsonp!!!
  credentials: 'include',
}).then(function(response){
   return response.json()
}).then(function(){

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/users'</span>, { <span class="hljs-comment">//jsonp!!!</span>
  credentials: <span class="hljs-string">'include'</span>,
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
   <span class="hljs-keyword">return</span> response.json()
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

})</code></pre>
<p>欢迎star与pull request  <a href="https://github.com/RubyLouvre/fetch-polyfill" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
兼容IE6的fetch polyfill

## 原文链接
[https://segmentfault.com/a/1190000006220369](https://segmentfault.com/a/1190000006220369)

