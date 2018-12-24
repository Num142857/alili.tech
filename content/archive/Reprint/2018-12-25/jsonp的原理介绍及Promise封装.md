---
title: 'jsonp的原理介绍及Promise封装' 
date: 2018-12-25 2:30:11
hidden: true
slug: d9tux4vso74
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么叫jsonp?</h2>
<p>jsonp是json with padding（填充式json或参数式json）的简写，是通过ajax请求跨域接口，获取数据的新实现方式</p>
<h2 id="articleHeader1">jsonp的实现原理：</h2>
<p>动态创建script标签，因为script标签是没有同源策略限制，可以跨域的。 把script标签的src指向正式服务端地址，这个地址跟个参数callback=xxx, 服务端在返回数据时，在xxx里包裹一个方法（里面是返回的数据），相当于在前端执行xxx这个方法，但是浏览器并没有这个方法，所以在发送请求之前在window注册这个方法，这样的话相当于在前端执行window.xxx()这个方法去获取数据。 具体看接下来的实现！</p>
<p><a href="https://github.com/webmodules/jsonp" rel="nofollow noreferrer" target="_blank">https://github.com/webmodules...</a> <br>这个是jsonp库的具体实现，建议下载来研究一下，最好自己动手写一遍。本文主要是Promise封装，所以就不具体介绍jsonp的具体实现</p>
<h2 id="articleHeader2">步骤一：</h2>
<p>首先安装这个库，因为我是在node npm环境下开发，所以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install jsonp
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jsonp
</span></code></pre>
<p><strong>参数介绍</strong><br>jsonp(url, opts, fn)<br>url (String) 服务器端数据接口地址<br>opts (Object) 一般只需关注param即可</p>
<ul>
<li><p>param (String) 默认是callback,这是与后端约定的参数名称，也可以随便定义，只要前后端统一</p></li>
<li><p>timeout (Number) 请求超时时间，默认是6000ms</p></li>
<li><p>prefix (String) callback值的前缀，默认是__jp</p></li>
<li><p>name (String) 指定全局注册的回调方法名，一般不会用到，因为默认是prefix+自增数字</p></li>
</ul>
<p>fn  回调方法，用es6 Promise</p>
<h2 id="articleHeader3">步骤二：</h2>
<p><strong>下面是具体用法：</strong><br>建一个名叫jsonp.js的文件<br>先引入jsonp库文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import originJSONP from 'jsonp'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> originJSONP <span class="hljs-keyword">from</span> <span class="hljs-string">'jsonp'</span>
</code></pre>
<p>对外暴露方法 url:请求服务器地址，data:参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function jsonp(url,data,option) {
    url += (url.indexOf('?')<0?'?':'&amp;')+param(data)
    return new Promise(function(resolve,reject) {
        originJSONP(url,option, function(err,data) {
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span>(<span class="hljs-params">url,data,option</span>) </span>{
    <span class="hljs-built_in">url</span> += (<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">'?'</span>)&lt;<span class="hljs-number">0</span>?<span class="hljs-string">'?'</span>:<span class="hljs-string">'&amp;'</span>)+param(data)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>) </span>{
        originJSONP(<span class="hljs-built_in">url</span>,option, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>) </span>{
            <span class="hljs-keyword">if</span>(!err){
                resolve(data)
            }<span class="hljs-title">else</span>{
                reject(err)
            }
        })
    })
}
</code></pre>
<p>定义一个将Object的参数处理成为 url挂载参数的形式 的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&amp;' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">param</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">''</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> k <span class="hljs-keyword">in</span> data) {
    <span class="hljs-keyword">let</span> value = data[k] !== <span class="hljs-literal">undefined</span> ? data[k] : <span class="hljs-string">''</span>
    <span class="hljs-built_in">url</span> += <span class="hljs-string">'&amp;'</span> + k + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(value)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">url</span> ? <span class="hljs-built_in">url</span>.substring(<span class="hljs-number">1</span>) : <span class="hljs-string">''</span>
}
</code></pre>
<p>到这里  这个Promise 就封装好了，接下来就具体调用来获取数据</p>
<h2 id="articleHeader4">步骤三：</h2>
<p>建一个js文件，名字自己定义<br>引入前面封装的jsonp.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import jsonp from '../common/js/jsonp.js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> jsonp <span class="hljs-keyword">from</span> <span class="hljs-string">'../common/js/jsonp.js'</span>
</code></pre>
<p>定义参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const commonParams = {
    g_tk:1319877694,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    format:'jsonp'
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const commonParams</span> = {
    g_tk:1319877694,
    inCharset:<span class="hljs-string">'utf-8'</span>,
    outCharset:<span class="hljs-string">'utf-8'</span>,
    notice:0,
    format:<span class="hljs-string">'jsonp'</span>
};
</code></pre>
<p>定义前后端统一参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const options = {
    param:'jsonpCallback'
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const options</span> = {
    param:<span class="hljs-string">'jsonpCallback'</span>
};
</code></pre>
<p>定义获取数据函数  这里我是拿QQ音乐的数据<a href="https://m.y.qq.com/" rel="nofollow noreferrer" target="_blank">https://m.y.qq.com/</a>（感谢QQ音乐的接口支持）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getDataFunc() { 
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({},commonParams,{
        platform:'h5',
        uin:0,
        needNewCode:1,
    })
    return jsonp(url,data,options)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDataFunc</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">Object</span>.assign({},commonParams,{
        <span class="hljs-attribute">platform</span>:<span class="hljs-string">'h5'</span>,
        <span class="hljs-attribute">uin</span>:<span class="hljs-number">0</span>,
        <span class="hljs-attribute">needNewCode</span>:<span class="hljs-number">1</span>,
    })
    <span class="hljs-keyword">return</span> jsonp(<span class="hljs-built_in">url</span>,data,options)
}
</code></pre>
<p>到此，咱们就完成用jsonp库进行Promise封装，并获取数据的过程！ 感谢阅读！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsonp的原理介绍及Promise封装

## 原文链接
[https://segmentfault.com/a/1190000012096966](https://segmentfault.com/a/1190000012096966)

