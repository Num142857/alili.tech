---
title: 'fetch使用的常见问题及其解决办法' 
date: 2019-01-26 2:30:18
hidden: true
slug: het77a8r625
categories: [reprint]
---

{{< raw >}}

                    
<p>首先声明一下，本文不是要讲解fetch的具体用法，不清楚的可以参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch" rel="nofollow noreferrer" target="_blank">MDN fetch教程</a>。</p>
<h2 id="articleHeader0">引言</h2>
<p>说道fetch就不得不提XMLHttpRequest了，XHR在发送web请求时需要开发者配置相关请求信息和成功后的回调，尽管开发者只关心请求成功后的业务处理，但是也要配置其他繁琐内容，导致配置和调用比较混乱，也不符合关注分离的原则；fetch的出现正是为了解决XHR存在的这些问题。例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log(&quot;Oops, error&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript">fetch(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">return</span> response.json();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Oops, error"</span>);
});</code></pre>
<p>上面这段代码让开发者只关注请求成功后的业务逻辑处理，其他的不用关心，相当简单；也比较符合现代Promise形式，比较友好。</p>
<p><strong>fetch是基于Promise设计的</strong>，从上面代码也能看得出来，这就要求fetch要配合Promise一起使用。正是这种设计，fetch所带来的优点正如<a href="https://segmentfault.com/a/1190000003810652">传统 Ajax 已死，Fetch 永生</a>总结的一样：</p>
<ul>
<li><p>语法简单，更加语义化</p></li>
<li><p>基于标准的Promise实现，支持async/await</p></li>
<li><p>使用<a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank"><code>isomorphic-fetch</code></a>可以方便同构</p></li>
</ul>
<p>不过话说回来，fetch虽然有很多优点，但是使用fetch来进行项目开发时，也是有一些常见问题的，下面就来说说fetch使用的常见问题。</p>
<h2 id="articleHeader1">fetch兼容性</h2>
<p>fetch是相对较新的技术，当然就会存在浏览器兼容性的问题，借用上面应用文章的一幅图加以说明fetch在各种浏览器的原生支持情况：<br><span class="img-wrap"><img data-src="/img/remote/1460000008484073?w=756&amp;h=411" src="https://static.alili.tech/img/remote/1460000008484073?w=756&amp;h=411" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看出，在各个浏览器低版本的情况下都是不被支持的。</p>
<p>那么问题来了，如何在所有浏览器中通用fetch呢，当然就要考虑fetch的polyfill了。</p>
<p>上面说过，fetch是基于Promise来实现的，所以在低版本浏览器中Promise可能也未被原生支持，所以还需要Promise的polyfill；<strong>大多数情况下</strong>，实现fetch的polyfill需要涉及到的：</p>
<ul>
<li><p><strong>promise的polyfill</strong>，例如es6-promise、babel-polyfill提供的promise实现。</p></li>
<li><p><strong>fetch的polyfill实现</strong>，例如isomorphic-fetch和whatwg-fetch</p></li>
</ul>
<p>这样是否就可以安全的使用fetch来进行前后端通信了？上面说了在大多数情况下是这样，但是IE8/9则比较特殊：IE8它使用的是ES3，而IE9则对ES5部分支持。这种情况下还需要<strong>ES5的polyfill</strong> <a href="https://github.com/es-shims/es5-shim" rel="nofollow noreferrer" target="_blank"><code>es5-shim</code></a>支持了。</p>
<p>上述有关promise的polyfill实现，需要说明的是：</p>
<blockquote><p>babel-runtime是不能作为Promise的polyfill的实现的，否则在IE8/9下使用fetch会报<code>Promise未定义</code>。为什么？我想大家猜到了，因为babel-runtime实现的polyfill是局部实现而不是全局实现，fetch底层实现用到Promise就是从全局中去取的，拿不到这报上述错误。</p></blockquote>
<p>另外，顺便补充一下fetch的polyfill实现思路是：</p>
<blockquote><p>首先判断浏览器是否原生支持fetch，否则结合Promise使用XMLHttpRequest的方式来实现；这正是<a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank"><code>whatwg-fetch</code></a>的实现思路，而同构应用中使用的<a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank"><code>isomorphic-fetch</code></a>，其客户端fetch的实现是直接require whatwg-fetch来实现的。</p></blockquote>
<h2 id="articleHeader2">fetch默认不携带cookie</h2>
<p>fetch发送请求默认是不发送cookie的，不管是同域还是跨域；那么问题就来了，对于那些需要权限验证的请求就可能无法正常获取数据，这时可以配置其<code>credentials</code>项，其有3个值：</p>
<ul>
<li><p><code>omit</code>: 默认值，忽略cookie的发送</p></li>
<li><p><code>same-origin</code>: 表示cookie只能同域发送，不能跨域发送</p></li>
<li><p><code>include</code>:  cookie既可以同域发送，也可以跨域发送</p></li>
</ul>
<p><code>credentials</code>所表达的含义，其实与XHR2中的<code>withCredentials</code>属性类似，表示请求是否携带cookie；具体可以参考阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解</a>中withCredentials一节的介绍；</p>
<p>这样，若要fetch请求携带cookie信息，只需设置一下credentials选项即可，例如<code>fetch(url, {credentials: 'include'})</code>;</p>
<p>另外补充一点：</p>
<blockquote><p>fetch默认对服务端通过<code>Set-Cookie</code>头设置的cookie也会忽略，若想选择接受来自服务端的cookie信息，也必须要配置credentials选项；</p></blockquote>
<h2 id="articleHeader3">fetch请求对某些错误http状态不会reject</h2>
<p>这主要是由fetch返回promise导致的，因为fetch返回的promise在某些错误的http状态下如400、500等不会reject，相反它会被resolve；只有网络错误会导致请求不能完成时，fetch 才会被 reject；所以一般会对fetch请求做一层封装，例如下面代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(response) {
  if (response.status >= 200 &amp;&amp; response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function parseJSON(response) {
  return response.json();
}
export default function request(url, options) {
  let opt = options||{};
  return fetch(url, {credentials: 'include', ...opt})
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ( data ))
    .catch((err) => ( err ));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">if</span> (response.status &gt;= <span class="hljs-number">200</span> &amp;&amp; response.status &lt; <span class="hljs-number">300</span>) {
    <span class="hljs-keyword">return</span> response;
  }
  <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(response.statusText);
  error.response = response;
  <span class="hljs-keyword">throw</span> error;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseJSON</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">return</span> response.json();
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url, options</span>) </span>{
  <span class="hljs-keyword">let</span> opt = options||{};
  <span class="hljs-keyword">return</span> fetch(url, {<span class="hljs-attr">credentials</span>: <span class="hljs-string">'include'</span>, ...opt})
    .then(checkStatus)
    .then(parseJSON)
    .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> ( data ))
    .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> ( err ));
}</code></pre>
<h2 id="articleHeader4">fetch不支持超时timeout处理</h2>
<p>用过fetch的都知道，fetch不像大多数ajax库那样对请求设置超时timeout，它没有有关请求超时的feature，这一点比较蛋疼。所以在fetch标准添加超时feature之前，都需要polyfill该特性。</p>
<p>实际上，我们真正需要的是<code>abort()</code>， timeout可以通过<code>timeout+abort</code>方式来实现，起到真正超时丢弃当前的请求。</p>
<p>而在目前的fetch指导规范中，fetch并不是一个具体实例，而只是一个方法；其返回的promise实例根据Promise指导规范标准是不能abort的，也不能手动改变promise实例的状态，只能由内部来根据请求结果来改变promise的状态。</p>
<p><strong>既然不能手动控制fetch方法执行后返回的promise实例状态，那么是不是可以创建一个可以手动控制状态的新Promise实例呢</strong>。所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="实现fetch的timeout功能，其思想就是新创建一个可以手动控制promise状态的实例，根据不同情况来对新promise实例进行resolve或者reject，从而达到实现timeout的功能；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>实现fetch的<span class="hljs-keyword">timeout</span>功能，其思想就是新创建一个可以手动控制promise状态的实例，根据不同情况来对新promise实例进行resolve或者reject，从而达到实现<span class="hljs-keyword">timeout</span>的功能；
</code></pre>
<p>根据github上<a href="https://github.com/github/fetch/issues/175" rel="nofollow noreferrer" target="_blank">timeout handling</a>上的讨论，目前可以有两种不同的解决方法：</p>
<h4>方法一：单纯setTimeout方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oldFetchfn = fetch; //拦截原始的fetch方法
window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
    return new Promise(function(resolve, reject){
        var timeoutId = setTimeout(function(){
            reject(new Error(&quot;fetch timeout&quot;))
        }, opts.timeout);
        oldFetchfn(input, opts).then(
            res=>{
                clearTimeout(timeoutId);
                resolve(res)
            },
            err=>{
                clearTimeout(timeoutId);
                reject(err)
            }
        )
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> oldFetchfn = fetch; <span class="hljs-comment">//拦截原始的fetch方法</span>
<span class="hljs-built_in">window</span>.fetch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, opts</span>)</span>{<span class="hljs-comment">//定义新的fetch方法，封装原有的fetch方法</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        <span class="hljs-keyword">var</span> timeoutId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"fetch timeout"</span>))
        }, opts.timeout);
        oldFetchfn(input, opts).then(
            <span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
                clearTimeout(timeoutId);
                resolve(res)
            },
            err=&gt;{
                clearTimeout(timeoutId);
                reject(err)
            }
        )
    })
}</code></pre>
<p>当然在上面基础上可以模拟类似XHR的<code>abort</code>功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oldFetchfn = fetch; 
window.fetch = function(input, opts){
    return new Promise(function(resolve, reject){
        var abort_promise = function(){
            reject(new Error(&quot;fetch abort&quot;))
        };
        var p = oldFetchfn(input, opts).then(resolve, reject);
        p.abort = abort_promise;
        return p;
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> oldFetchfn = fetch; 
<span class="hljs-built_in">window</span>.fetch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, opts</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        <span class="hljs-keyword">var</span> abort_promise = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"fetch abort"</span>))
        };
        <span class="hljs-keyword">var</span> p = oldFetchfn(input, opts).then(resolve, reject);
        p.abort = abort_promise;
        <span class="hljs-keyword">return</span> p;
    })
}</code></pre>
<h4>方法二：利用Promise.race方法</h4>
<p>Promise.race方法接受一个promise实例数组参数，表示多个promise实例中任何一个最先改变状态，那么race方法返回的promise实例状态就跟着改变，具体可以参考<a href="http://es6.ruanyifeng.com/#docs/promise#Promise-race" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oldFetchfn = fetch; //拦截原始的fetch方法
window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
    var fetchPromise = oldFetchfn(input, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
             reject(new Error(&quot;fetch timeout&quot;))
        }, opts.timeout)
    });
    retrun Promise.race([fetchPromise, timeoutPromise])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> oldFetchfn = fetch; <span class="hljs-comment">//拦截原始的fetch方法</span>
<span class="hljs-built_in">window</span>.fetch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, opts</span>)</span>{<span class="hljs-comment">//定义新的fetch方法，封装原有的fetch方法</span>
    <span class="hljs-keyword">var</span> fetchPromise = oldFetchfn(input, opts);
    <span class="hljs-keyword">var</span> timeoutPromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
             reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"fetch timeout"</span>))
        }, opts.timeout)
    });
    retrun <span class="hljs-built_in">Promise</span>.race([fetchPromise, timeoutPromise])
}</code></pre>
<p>最后，对fetch的timeout的上述实现方式补充几点：</p>
<blockquote>
<p>timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间；</p>
<p>fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已；</p>
</blockquote>
<h2 id="articleHeader5">fetch不支持JSONP</h2>
<p>fetch是与服务器端进行异步交互的，而<strong>JSONP是外链一个javascript资源，并不是真正ajax</strong>，所以fetch与JSONP没有什么直接关联，当然至少目前是不支持JSONP的。</p>
<p>这里我们把JSONP与fetch关联在一起有点差强人意，fetch只是一个ajax库，我们不可能使fetch支持JSONP；只是我们要实现一个JSONP，只不过这个JSONP的实现要与fetch的实现类似，<code>即基于Promise来实现一个JSONP</code>；而其外在表现给人感觉是fetch支持JSONP一样；</p>
<p>目前比较成熟的开源JSONP实现<a href="https://github.com/camsong/fetch-jsonp" rel="nofollow noreferrer" target="_blank">fetch-jsonp</a>给我们提供了解决方案，想了解可以自行前往。不过再次想唠叨一下其JSONP的实现步骤，因为在本人面试的前端候选人中大部分人对JSONP的实现语焉不详；</p>
<p>使用它非常简单，首先需要用npm安装fetch-jsonp</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install fetch-jsonp --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"> npm install fetch-jsonp --save-dev</code></pre>
<p>然后在像下面一样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetchJsonp('/users.jsonp', {
    timeout: 3000,
    jsonpCallback: 'custom_callback'
  })
  .then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetchJsonp(<span class="hljs-string">'/users.jsonp'</span>, {
    <span class="hljs-attr">timeout</span>: <span class="hljs-number">3000</span>,
    <span class="hljs-attr">jsonpCallback</span>: <span class="hljs-string">'custom_callback'</span>
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">return</span> response.json()
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ex</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'parsing failed'</span>, ex)
  })</code></pre>
<h2 id="articleHeader6">fetch不支持progress事件</h2>
<p>XHR是原生支持progress事件的，例如下面代码这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest()
xhr.open('POST', '/uploads')
xhr.onload = function() {}
xhr.onerror = function() {}
function updateProgress (event) {
  if (event.lengthComputable) {
    var percent = Math.round((event.loaded / event.total) * 100)
    console.log(percent)
  }
xhr.upload.onprogress =updateProgress; //上传的progress事件
xhr.onprogress = updateProgress; //下载的progress事件
}
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/uploads'</span>)
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateProgress</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span> (event.lengthComputable) {
    <span class="hljs-keyword">var</span> percent = <span class="hljs-built_in">Math</span>.round((event.loaded / event.total) * <span class="hljs-number">100</span>)
    <span class="hljs-built_in">console</span>.log(percent)
  }
xhr.upload.onprogress =updateProgress; <span class="hljs-comment">//上传的progress事件</span>
xhr.onprogress = updateProgress; <span class="hljs-comment">//下载的progress事件</span>
}
xhr.send();</code></pre>
<p>但是<strong>fetch是不支持有关<code>progress</code>事件的</strong>；不过可喜的是，根据fetch的指导规范标准，其内部设计实现了<code>Request</code>和<code>Response</code>类；其中Response封装一些方法和属性，通过Response实例可以访问这些方法和属性，例如<code>response.json()</code>、<code>response.body</code>等等；</p>
<p>值得关注的地方是，<code>response.body</code>是一个可读字节流对象，其实现了一个<code>getRender()</code>方法，其具体作用是：</p>
<blockquote><p><code>getRender()</code>方法用于读取响应的原始字节流，该字节流是可以循环读取的，直至body内容传输完成；</p></blockquote>
<p>因此，利用到这点可以模拟出fetch的progress，具体可以参考这篇文章<a href="https://jakearchibald.com/2016/streams-ftw/" rel="nofollow noreferrer" target="_blank">2016 - the year of web streams</a>。</p>
<p>代码实现如下，在线demo请参考<a href="https://labs.jxck.io/fetch/progress.html" rel="nofollow noreferrer" target="_blank">fetch progress demo</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fetch() returns a promise that resolves once headers have been received
fetch(url).then(response => {
  // response.body is a readable stream.
  // Calling getReader() gives us exclusive access to the stream's content
  var reader = response.body.getReader();
  var bytesReceived = 0;

  // read() returns a promise that resolves when a value has been received
  reader.read().then(function processResult(result) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (result.done) {
      console.log(&quot;Fetch complete&quot;);
      return;
    }

    // result.value for fetch streams is a Uint8Array
    bytesReceived += result.value.length;
    console.log('Received', bytesReceived, 'bytes of data so far');

    // Read some more, and call this function again
    return reader.read().then(processResult);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// fetch() returns a promise that resolves once headers have been received</span>
fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-comment">// response.body is a readable stream.</span>
  <span class="hljs-comment">// Calling getReader() gives us exclusive access to the stream's content</span>
  <span class="hljs-keyword">var</span> reader = response.body.getReader();
  <span class="hljs-keyword">var</span> bytesReceived = <span class="hljs-number">0</span>;

  <span class="hljs-comment">// read() returns a promise that resolves when a value has been received</span>
  reader.read().then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processResult</span>(<span class="hljs-params">result</span>) </span>{
    <span class="hljs-comment">// Result objects contain two properties:</span>
    <span class="hljs-comment">// done  - true if the stream has already given you all its data.</span>
    <span class="hljs-comment">// value - some data. Always undefined when done is true.</span>
    <span class="hljs-keyword">if</span> (result.done) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Fetch complete"</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// result.value for fetch streams is a Uint8Array</span>
    bytesReceived += result.value.length;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Received'</span>, bytesReceived, <span class="hljs-string">'bytes of data so far'</span>);

    <span class="hljs-comment">// Read some more, and call this function again</span>
    <span class="hljs-keyword">return</span> reader.read().then(processResult);
  });
});</code></pre>
<p>另外，github上也有使用<code>Promise+XHR</code>结合的方式实现类fetch的progress效果(当然这跟fetch完全不搭边）可以参考<a href="https://github.com/github/fetch/issues/89#issuecomment-256610849" rel="nofollow noreferrer" target="_blank">这里</a>，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchProgress(url, opts={}, onProgress){
    return new Promise(funciton(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for(var key in opts.headers || {}){
            xhr.setRequestHeader(key, opts.headers[key]);
        }

        xhr.onload = e => resolve(e.target.responseText)
        xhr.onerror = reject;
        if (xhr.upload &amp;&amp; onProgress){
            xhr.upload.onprogress = onProgress; //上传
        }
        if ('onprogerss' in xhr &amp;&amp; onProgress){
            xhr.onprogress = onProgress; //下载
        }
        xhr.send(opts.body)
    })
}
fetchProgress('/upload').then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchProgress</span>(<span class="hljs-params">url, opts={}, onProgress</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(funciton(resolve, reject){
        <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
        xhr.open(opts.method || <span class="hljs-string">'get'</span>, url);
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> opts.headers || {}){
            xhr.setRequestHeader(key, opts.headers[key]);
        }

        xhr.onload = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> resolve(e.target.responseText)
        xhr.onerror = reject;
        <span class="hljs-keyword">if</span> (xhr.upload &amp;&amp; onProgress){
            xhr.upload.onprogress = onProgress; <span class="hljs-comment">//上传</span>
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-string">'onprogerss'</span> <span class="hljs-keyword">in</span> xhr &amp;&amp; onProgress){
            xhr.onprogress = onProgress; <span class="hljs-comment">//下载</span>
        }
        xhr.send(opts.body)
    })
}
fetchProgress(<span class="hljs-string">'/upload'</span>).then(<span class="hljs-built_in">console</span>.log)</code></pre>
<h2 id="articleHeader7">fetch跨域问题</h2>
<p>既然是ajax库，就不可避免与<strong>跨域</strong>扯上关系；XHR2是支持跨域请求的，只不过要<strong>满足浏览器端支持<code>CORS</code>，服务器通过<code>Access-Control-Allow-Origin</code>来允许指定的源进行跨域</strong>，仅此一种方式。</p>
<p>与XHR2一样，fetch也是支持跨域请求的，只不过其跨域请求做法与XHR2一样，需要客户端与服务端支持；另外，fetch还支持一种跨域，不需要服务器支持的形式，具体可以通过其<code>mode</code>的配置项来说明。</p>
<p>fetch的<code>mode</code>配置项有3个值，如下：</p>
<ul>
<li><p><code>same-origin</code>：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为<code>basic</code>。</p></li>
<li><p><code>cors</code>: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为<code>cors</code>。</p></li>
<li><p><code>no-cors</code>: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response type为<code>opaque</code>。</p></li>
</ul>
<p>针对跨域请求，cors模式是常见跨域请求实现，但是fetch自带的<code>no-cors</code>跨域请求模式则较为陌生，该模式有一个比较明显的特点：</p>
<blockquote><p><strong>该模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其response type为opaque透明的原因。</strong></p></blockquote>
<p>这与<code>&lt;img/&gt;</code>发送的请求类似，只是该模式不能访问响应的内容信息；但是它可以被其他APIs进行处理，例如ServiceWorker。另外，该模式返回的repsonse可以在Cache API中被存储起来以便后续的对它的使用，这点对script、css和图片的CDN资源是非常合适的，因为这些资源响应头中都没有CORS头。</p>
<p>总的来说，fetch的跨域请求是使用CORS方式，需要浏览器和服务端的支持。</p>
<h3 id="articleHeader8">参考文献</h3>
<ul>
<li><p><a href="https://jakearchibald.com/2015/thats-so-fetch/" rel="nofollow noreferrer" target="_blank">thats-so-fetch</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003810652">传统 Ajax 已死，Fetch 永生</a></p></li>
<li><p><a href="http://louiszhai.github.io/2016/11/02/fetch/#u5C1D_u8BD5_u4E00_u4E2Afetch" rel="nofollow noreferrer" target="_blank">Fetch进阶指南</a></p></li>
<li><p><a href="https://jakearchibald.com/2016/streams-ftw/" rel="nofollow noreferrer" target="_blank">2016 - the year of web streams</a></p></li>
<li><p><a href="http://bubkoo.com/2015/05/08/introduction-to-fetch/" rel="nofollow noreferrer" target="_blank">fetch API 简介</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
fetch使用的常见问题及其解决办法

## 原文链接
[https://segmentfault.com/a/1190000008484070](https://segmentfault.com/a/1190000008484070)

