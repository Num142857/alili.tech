---
title: 'fetch，终于认识你' 
date: 2018-12-29 2:30:10
hidden: true
slug: sh4377sddis
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">fetch和XMLHttpRequest</h2>
<p>如果看网上的fetch教程，会首先对比XMLHttpRequest和fetch的优劣，然后引出一堆看了很快会忘记的内容(本人记性不好)。因此，我写一篇关于fetch的文章，为了自己看着方便，毕竟工作中用到的也就是一些很基础的点而已。</p>
<p>fetch，说白了，就是XMLHttpRequest的一种替代方案。如果有人问你，除了Ajax获取后台数据之外，还有没有其他的替代方案？</p>
<p>这是你就可以回答，<strong>除了XMLHttpRequest对象来获取后台的数据之外，还可以使用一种更优的解决方案fetch</strong>。</p>
<h2 id="articleHeader1">如何获取fetch</h2>
<p>到现在为止，fetch的支持性还不是很好，但是在谷歌浏览器中已经支持了fetch。fetch挂在在BOM中，可以直接在谷歌浏览器中使用。</p>
<p>查看fetch的支持情况：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API" rel="nofollow noreferrer" target="_blank">fetch的支持情况</a></p>
<p>当然，如果不支持fetch也没有问题，可以使用第三方的ployfill来实现只会fetch：<a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">whatwg-fetch</a></p>
<h2 id="articleHeader2">fetch的helloworld</h2>
<p>下面我们来写第一个fetch获取后端数据的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html') // 返回一个Promise对象
  .then((res)=>{
    return res.text() // res.text()是一个Promise对象
  })
  .then((res)=>{
    console.log(res) // res是最终的结果
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>) <span class="hljs-comment">// 返回一个Promise对象</span>
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text() <span class="hljs-comment">// res.text()是一个Promise对象</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// res是最终的结果</span>
  })</code></pre>
<p>是不是很简单？可能难的地方就是Promise的写法，这个可以看<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">阮一峰老师的ES6教程</a>来学习。</p>
<blockquote><p>说明一点，下面演示的GET请求或POST请求，都是采用百度中查询到的一些接口，可能传递的有些参数这个接口并不会解析，但不会影响这个接口的使用。</p></blockquote>
<h2 id="articleHeader3">GET请求</h2>
<h3 id="articleHeader4">GET请求初步</h3>
<p>完成了helloworld，这个时候就要来认识一下GET请求如何处理了。</p>
<p>上面的helloworld中这是使用了第一个参数，其实fetch还可以提供第二个参数，就是用来传递一些初始化的信息。</p>
<p>这里如果要特别指明是GET请求，就要写成下面的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'GET'
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<h3 id="articleHeader5">GET请求的参数传递</h3>
<p>GET请求中如果需要传递参数怎么办？这个时候，只能把参数写在URL上来进行传递了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html?a=1&amp;b=2', { // 在URL中写上传递的参数
    method: 'GET'
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html?a=1&amp;b=2'</span>, { <span class="hljs-comment">// 在URL中写上传递的参数</span>
    method: <span class="hljs-string">'GET'</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<h2 id="articleHeader6">POST请求</h2>
<h3 id="articleHeader7">POST请求初步</h3>
<p>与GET请求类似，POST请求的指定也是在fetch的第二个参数中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'POST' // 指定是POST请求
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span> <span class="hljs-comment">// 指定是POST请求</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<h3 id="articleHeader8">POST请求参数的传递</h3>
<p>众所周知，POST请求的参数，一定不能放在URL中，这样做的目的是防止信息泄露。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'POST',
    body: new URLSearchParams([[&quot;foo&quot;, 1],[&quot;bar&quot;, 2]]).toString() // 这里是请求对象
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-keyword">new</span> URLSearchParams([[<span class="hljs-string">"foo"</span>, <span class="hljs-number">1</span>],[<span class="hljs-string">"bar"</span>, <span class="hljs-number">2</span>]]).toString() <span class="hljs-comment">// 这里是请求对象</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<p>其实除了对象<code>URLSearchParams</code>外，还有几个其他的对象，可以参照：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Body" rel="nofollow noreferrer" target="_blank">常用的几个对象</a>来学习使用。</p>
<h3 id="articleHeader9">设置请求的头信息</h3>
<p>在POST提交的过程中，一般是表单提交，可是，经过查询，发现默认的提交方式是：<code>Content-Type:text/plain;charset=UTF-8</code>，这个显然是不合理的。下面咱们学习一下，指定头信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
    }),
    body: new URLSearchParams([[&quot;foo&quot;, 1],[&quot;bar&quot;, 2]]).toString()
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers({
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span> <span class="hljs-comment">// 指定提交方式为表单提交</span>
    }),
    <span class="hljs-attr">body</span>: <span class="hljs-keyword">new</span> URLSearchParams([[<span class="hljs-string">"foo"</span>, <span class="hljs-number">1</span>],[<span class="hljs-string">"bar"</span>, <span class="hljs-number">2</span>]]).toString()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<p>这个时候，在谷歌浏览器的Network中查询，会发现，请求方式已经变成了<code>content-type:application/x-www-form-urlencoded</code>。</p>
<h2 id="articleHeader10">通过接口得到JSON数据</h2>
<p>上面所有的例子中都是返回一个文本，那么除了文本，有没有其他的数据类型呢？肯定是有的，具体查询地址：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Body" rel="nofollow noreferrer" target="_blank">Body的类型</a></p>
<p>由于最常用的是JSON数据，那么下面就简单演示一下获取JSON数据的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/rec?platform=wise&amp;ms=1&amp;rset=rcmd&amp;word=123&amp;qid=11327900426705455986&amp;rq=123&amp;from=844b&amp;baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&amp;tn=&amp;clientWidth=375&amp;t=1506826017369&amp;r=8255', { // 在URL中写上传递的参数
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    })
  })
  .then((res)=>{
    return res.json() // 返回一个Promise，可以解析成JSON
  })
  .then((res)=>{
    console.log(res) // 获取JSON数据
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/rec?platform=wise&amp;ms=1&amp;rset=rcmd&amp;word=123&amp;qid=11327900426705455986&amp;rq=123&amp;from=844b&amp;baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&amp;tn=&amp;clientWidth=375&amp;t=1506826017369&amp;r=8255'</span>, { <span class="hljs-comment">// 在URL中写上传递的参数</span>
    method: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers({
      <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span> <span class="hljs-comment">// 通过头指定，获取的数据类型是JSON</span>
    })
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.json() <span class="hljs-comment">// 返回一个Promise，可以解析成JSON</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// 获取JSON数据</span>
  })</code></pre>
<h2 id="articleHeader11">强制带Cookie</h2>
<p>默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'GET',
    credentials: 'include' // 强制加入凭据头
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过fetch获取百度的错误提示页面</span>
fetch(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">credentials</span>: <span class="hljs-string">'include'</span> <span class="hljs-comment">// 强制加入凭据头</span>
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> res.text()
  })
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res)
  })</code></pre>
<h2 id="articleHeader12">简单封装一下fetch</h2>
<p>最后了，介绍了一大堆内容，有没有发现，在GET和POST传递参数的方式不同呢？下面咱们就来封装一个简单的fetch，来实现GET请求和POST请求参数的统一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 将对象转成 a=1&amp;b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 将对象转成 a=1&amp;b=2的形式
 * @param obj 对象
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">obj2String</span>(<span class="hljs-params">obj, arr = [], idx = <span class="hljs-number">0</span></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">in</span> obj) {
    arr[idx++] = [item, obj[item]]
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> URLSearchParams(arr).toString()
}

<span class="hljs-comment">/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commonFetcdh</span>(<span class="hljs-params">url, options, method = <span class="hljs-string">'GET'</span></span>) </span>{
  <span class="hljs-keyword">const</span> searchStr = obj2String(options)
  <span class="hljs-keyword">let</span> initObj = {}
  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">'GET'</span>) { <span class="hljs-comment">// 如果是GET请求，拼接url</span>
    url += <span class="hljs-string">'?'</span> + searchStr
    initObj = {
      <span class="hljs-attr">method</span>: method,
      <span class="hljs-attr">credentials</span>: <span class="hljs-string">'include'</span>
    }
  } <span class="hljs-keyword">else</span> {
    initObj = {
      <span class="hljs-attr">method</span>: method,
      <span class="hljs-attr">credentials</span>: <span class="hljs-string">'include'</span>,
      <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers({
        <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>
      }),
      <span class="hljs-attr">body</span>: searchStr
    }
  }
  fetch(url, initObj).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> res.json()
  }).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> res
  })
}

<span class="hljs-comment">/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GET</span>(<span class="hljs-params">url, options</span>) </span>{
  <span class="hljs-keyword">return</span> commonFetcdh(url, options, <span class="hljs-string">'GET'</span>)
}

<span class="hljs-comment">/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">POST</span>(<span class="hljs-params">url, options</span>) </span>{
  <span class="hljs-keyword">return</span> commonFetcdh(url, options, <span class="hljs-string">'POST'</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET('https://www.baidu.com/search/error.html', {a:1,b:2})
POST('https://www.baidu.com/search/error.html', {a:1,b:2})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">GET(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>})
POST(<span class="hljs-string">'https://www.baidu.com/search/error.html'</span>, {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
fetch，终于认识你

## 原文链接
[https://segmentfault.com/a/1190000011433064](https://segmentfault.com/a/1190000011433064)

