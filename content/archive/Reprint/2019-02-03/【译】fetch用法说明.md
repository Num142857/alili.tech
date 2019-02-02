---
title: '【译】fetch用法说明' 
date: 2019-02-03 2:30:39
hidden: true
slug: jsn0n6wcsy
categories: [reprint]
---

{{< raw >}}

                    
<p>由于 <code>Fetch</code>API 是基于 <code>Promise</code> 设计，有必要先学习一下 <code>Promise</code>，推荐阅读<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank"> MDN Promise 教程 </a><br>本文章内容推荐阅读<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch" rel="nofollow noreferrer" target="_blank"> MDN Fetch 教程</a></p>
<h2 id="articleHeader0">语法说明</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, options).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript">fetch(url, options).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-comment">// handle HTTP response</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// handle network error</span>
})</code></pre>
<p>具体参数案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//兼容包
require('babel-polyfill')
require('es6-promise').polyfill()

import 'whatwg-fetch'

fetch(url, {
  method: &quot;POST&quot;,
  body: JSON.stringify(data),
  headers: {
    &quot;Content-Type&quot;: &quot;application/json&quot;
  },
  credentials: &quot;same-origin&quot;
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  response.text().then(function(responseText) { ... })
}, function(error) {
  error.message //=> String
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-comment">//兼容包</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-polyfill'</span>)
<span class="hljs-built_in">require</span>(<span class="hljs-string">'es6-promise'</span>).polyfill()

<span class="hljs-keyword">import</span> <span class="hljs-string">'whatwg-fetch'</span>

fetch(url, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">"POST"</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify(data),
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/json"</span>
  },
  <span class="hljs-attr">credentials</span>: <span class="hljs-string">"same-origin"</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  response.status     <span class="hljs-comment">//=&gt; number 100–599</span>
  response.statusText <span class="hljs-comment">//=&gt; String</span>
  response.headers    <span class="hljs-comment">//=&gt; Headers</span>
  response.url        <span class="hljs-comment">//=&gt; String</span>

  response.text().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseText</span>) </span>{ ... })
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  error.message <span class="hljs-comment">//=&gt; String</span>
})
</code></pre>
<h4>url</h4>
<p>定义要获取的资源。这可能是：</p>
<ul>
<li><p>一个 <code>USVString</code> 字符串，包含要获取资源的 <code>URL</code>。</p></li>
<li><p>一个 <code>Request</code> 对象。</p></li>
</ul>
<h4>options（可选）</h4>
<p>一个配置项对象，包括所有对请求的设置。可选的参数有：</p>
<ul>
<li><p><code>method</code>: 请求使用的方法，如 <code>GET</code>、<code>POST</code>。</p></li>
<li><p><code>headers</code>: 请求的头信息，形式为 <code>Headers</code> 对象或 <code>ByteString</code>。</p></li>
<li><p><code>body</code>: 请求的 <code>body</code> 信息：可能是一个 <code>Blob</code>、<code>BufferSource</code>、<code>FormData</code>、<code>URLSearchParams</code> 或者 <code>USVString</code> 对象。注意 <code>GET</code> 或 <code>HEAD</code> 方法的请求不能包含 <code>body</code> 信息。</p></li>
<li><p><code>mode</code>: 请求的模式，如 <code>cors</code>、 <code>no-cors</code> 或者 <code>same-origin</code>。</p></li>
<li><p><code>credentials</code>: 请求的 <code>credentials</code>，如 <code>omit</code>、<code>same-origin</code> 或者 <code>include</code>。</p></li>
<li><p><code>cache</code>:  请求的 <code>cache</code> 模式: <code>default</code>, <code>no-store</code>, <code>reload</code>, <code>no-cache</code>, <code>force-cache</code>, 或者 <code>only-if-cached</code>。</p></li>
</ul>
<h4>response</h4>
<p>一个 <code>Promise</code>，<code>resolve</code> 时回传 <code>Response</code> 对象：</p>
<ul>
<li>
<p>属性：</p>
<ul>
<li><p><code>status (number)</code> - HTTP请求结果参数，在100–599 范围</p></li>
<li><p><code>statusText (String)</code> - 服务器返回的状态报告</p></li>
<li><p><code>ok (boolean)</code> - 如果返回200表示请求成功则为true</p></li>
<li><p><code>headers (Headers)</code> - 返回头部信息，下面详细介绍</p></li>
<li><p><code>url (String)</code> - 请求的地址</p></li>
</ul>
</li>
<li>
<p>方法：</p>
<ul>
<li><p><code>text()</code> - 以<code>string</code>的形式生成请求text</p></li>
<li><p><code>json()</code> - 生成<code>JSON.parse(responseText)</code>的结果</p></li>
<li><p><code>blob()</code> - 生成一个<code>Blob</code></p></li>
<li><p><code>arrayBuffer()</code> - 生成一个<code>ArrayBuffer</code></p></li>
<li><p><code>formData()</code> - 生成格式化的数据，可用于其他的请求</p></li>
</ul>
</li>
<li>
<p>其他方法：</p>
<ul>
<li><p><code>clone()</code></p></li>
<li><p><code>Response.error()</code></p></li>
<li><p><code>Response.redirect()</code></p></li>
</ul>
</li>
</ul>
<h4>response.headers</h4>
<ul>
<li><p><code>has(name) (boolean)</code> - 判断是否存在该信息头</p></li>
<li><p><code>get(name) (String)</code> - 获取信息头的数据</p></li>
<li><p><code>getAll(name) (Array)</code> - 获取所有头部数据</p></li>
<li><p><code>set(name, value)</code> - 设置信息头的参数</p></li>
<li><p><code>append(name, value)</code> - 添加header的内容</p></li>
<li><p><code>delete(name)</code> - 删除header的信息</p></li>
<li><p><code>forEach(function(value, name){ ... }, [thisContext])</code> - 循环读取header的信息</p></li>
</ul>
<h2 id="articleHeader1">使用案例</h2>
<h4>GET请求</h4>
<ul>
<li>
<p>HTML</p>
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
      </div><pre class="javascript hljs"><code class="javaScript">fetch(<span class="hljs-string">'/users.html'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.text()
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
    <span class="hljs-built_in">document</span>.body.innerHTML = body
  })</code></pre>
</li>
<li>
<p>IMAGE</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myImage = document.querySelector('img');

fetch('flowers.jpg')
  .then(function(response) {
    return response.blob();
  })
  .then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-keyword">var</span> myImage = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'img'</span>);

fetch(<span class="hljs-string">'flowers.jpg'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.blob();
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">myBlob</span>) </span>{
    <span class="hljs-keyword">var</span> objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });</code></pre>
</li>
<li>
<p>JSON</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch(function(e) {
    console.log(&quot;Oops, error&quot;);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript">fetch(url)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.json();
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Oops, error"</span>);
  });</code></pre>
</li>
</ul>
<p>使用 ES6 的 箭头函数 后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log(&quot;Oops, error&quot;, e))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript">fetch(url)
  .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
  .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Oops, error"</span>, e))</code></pre>
<p>response的数据</p>
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
      </div><pre class="javascript hljs"><code class="javaScript">fetch(<span class="hljs-string">'/users.json'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(response.headers.get(<span class="hljs-string">'Content-Type'</span>))
  <span class="hljs-built_in">console</span>.log(response.headers.get(<span class="hljs-string">'Date'</span>))
  <span class="hljs-built_in">console</span>.log(response.status)
  <span class="hljs-built_in">console</span>.log(response.statusText)
})</code></pre>
<h4>POST请求</h4>
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
      </div><pre class="javascript hljs"><code class="javaScript">fetch(<span class="hljs-string">'/users'</span>, {
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
<p>检查请求状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(response) {
  if (response.status >= 200 &amp;&amp; response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">if</span> (response.status &gt;= <span class="hljs-number">200</span> &amp;&amp; response.status &lt; <span class="hljs-number">300</span>) {
    <span class="hljs-keyword">return</span> response
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(response.statusText)
    error.response = response
    <span class="hljs-keyword">throw</span> error
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseJSON</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">return</span> response.json()
}

fetch(<span class="hljs-string">'/users'</span>)
  .then(checkStatus)
  .then(parseJSON)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request succeeded with JSON response'</span>, data)
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request failed'</span>, error)
  })</code></pre>
<h2 id="articleHeader2">采用promise形式</h2>
<p>Promise 对象是一个返回值的代理，这个返回值在promise对象创建时未必已知。它允许你为异步操作的成功或失败指定处理方法。 这使得异步方法可以像同步方法那样返回值：异步方法会返回一个包含了原返回值的 promise 对象来替代原返回值。</p>
<p>Promise构造函数接受一个函数作为参数，该函数的两个参数分别是<code>resolve</code>方法和<code>reject</code>方法。如果异步操作成功，则用<code>resolve</code>方法将<code>Promise</code>对象的状态变为“成功”（即从pending变为resolved）；如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）。</p>
<p>promise实例生成以后，可以用then方法分别指定resolve方法和reject方法的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建一个promise对象
var promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
//then方法可以接受两个回调函数作为参数。
//第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。
//其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
promise.then(function(value) {
  // success
}, function(value) {
  // failure
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-comment">//创建一个promise对象</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>){
    resolve(value);
  } <span class="hljs-keyword">else</span> {
    reject(error);
  }
});
<span class="hljs-comment">//then方法可以接受两个回调函数作为参数。</span>
<span class="hljs-comment">//第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。</span>
<span class="hljs-comment">//其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// failure</span>
});</code></pre>
<p>那么结合promise后fetch的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Fetch.js
export function Fetch(url, options) {
  options.body = JSON.stringify(options.body)

  const defer = new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.code === 0) {
          resolve(data) //返回成功数据
        } else {
            if (data.code === 401) {
            //失败后的一种状态
            } else {
            //失败的另一种状态
            }
          reject(data) //返回失败数据
        }
      })
      .catch(error => {
        //捕获异常
        console.log(error.msg)
        reject() 
      })
  })

  return defer
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-comment">//Fetch.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fetch</span>(<span class="hljs-params">url, options</span>) </span>{
  options.body = <span class="hljs-built_in">JSON</span>.stringify(options.body)

  <span class="hljs-keyword">const</span> defer = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    fetch(url, options)
      .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> response.json()
      })
      .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (data.code === <span class="hljs-number">0</span>) {
          resolve(data) <span class="hljs-comment">//返回成功数据</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span> (data.code === <span class="hljs-number">401</span>) {
            <span class="hljs-comment">//失败后的一种状态</span>
            } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//失败的另一种状态</span>
            }
          reject(data) <span class="hljs-comment">//返回失败数据</span>
        }
      })
      .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        <span class="hljs-comment">//捕获异常</span>
        <span class="hljs-built_in">console</span>.log(error.msg)
        reject() 
      })
  })

  <span class="hljs-keyword">return</span> defer
}</code></pre>
<p>调用Fech方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Fetch } from './Fetch'

Fetch(getAPI('search'), {
  method: 'POST',
  options
})
.then(data => {
  console.log(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-keyword">import</span> { Fetch } <span class="hljs-keyword">from</span> <span class="hljs-string">'./Fetch'</span>

Fetch(getAPI(<span class="hljs-string">'search'</span>), {
  <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
  options
})
.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data)
})</code></pre>
<h2 id="articleHeader3">支持状况及解决方案</h2>
<p>原生支持率并不高，幸运的是，引入下面这些 <code>polyfill</code> 后可以完美支持 IE8+ ：</p>
<ul>
<li><p>由于 IE8 是 ES3，需要引入 ES5 的 <code>polyfill</code>: <code>es5-shim</code>, <code>es5-sham</code></p></li>
<li><p>引入 <code>Promise</code> 的 <code>polyfill</code>: <code>es6-promise</code></p></li>
<li><p>引入 <code>fetch</code> 探测库：<code>fetch-detector</code></p></li>
<li><p>引入 <code>fetch</code> 的 <code>polyfill</code>: <code>fetch-ie8</code></p></li>
<li><p>可选：如果你还使用了 <code>jsonp</code>，引入 <code>fetch-jsonp</code></p></li>
<li><p>可选：开启 <code>Babel</code> 的 <code>runtime</code> 模式，现在就使用 <code>async</code>/<code>await</code></p></li>
</ul>
<p>翻译自 <a href="https://github.github.io/fetch/" rel="nofollow noreferrer" target="_blank">Fetch</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】fetch用法说明

## 原文链接
[https://segmentfault.com/a/1190000007019545](https://segmentfault.com/a/1190000007019545)

