---
title: '带你玩转 JavaScript ES6 (七) - 异步' 
date: 2018-12-14 2:30:11
hidden: true
slug: agnyyyalbhc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">带你玩转 JavaScript ES6 (七) - 异步</h1>
<blockquote>本文同步<a href="http://blog.phpzendo.com/?p=183" rel="nofollow noreferrer" target="_blank">带你玩转 JavaScript ES6 (七) - 异步</a>，转载请注明出处。</blockquote>
<p>本章我们将学习 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="nofollow noreferrer" target="_blank">ES6 中的 Promise(异步)</a> 相关知识，了解如何使用 Promise 对象创建异步程序</p>
<h2 id="articleHeader1">一、介绍</h2>
<p>Promise 对象通过 <strong><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">new Promise(executor)</a></strong> 实例化创建，可以让程序进入一个异步的执行中，完成耗时的操作处理。</p>
<h2 id="articleHeader2">二、语法</h2>
<h3 id="articleHeader3">2.1 实例化</h3>
<p>语法：<strong>new Promise((resole, reject) =&gt; {})</strong></p>
<p>Promise 类接收带有两个匿名函数作为参数的匿名函数，其中 <strong>resolve</strong> 表示成功处理函数，<strong>reject</strong> 表示失败处理函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resole, reject) => {
    console.log('main')
    setTimeout(() => {
        resole('run async')
    }, 1500)
})
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resole, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'main'</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resole(<span class="hljs-string">'run async'</span>)
    }, <span class="hljs-number">1500</span>)
})
 </code></pre>
<h3 id="articleHeader4">2.2 异步成功执行处理方法</h3>
<p>通过 Promise 对象的 <strong>then</strong> 方法绑定 <strong>resolve</strong>处理方法，可以通过链式操作绑定多个用于 <strong>resolve</strong> 的处理方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let promise = new Promise((resole, reject) => {
    console.log('main')
    setTimeout(() => {
        resole('run async')
    }, 1500)
})

promise.then((msg) => {
    console.log(msg);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resole, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'main'</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resole(<span class="hljs-string">'run async'</span>)
    }, <span class="hljs-number">1500</span>)
})

promise.then(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg);
})</code></pre>
<p>上面示例会先打印输出 <strong>mian</strong>，之后过 1.5 s 会打印输出 <strong>run async</strong> 到控制台。为了演示异步执行，现在对上例稍作调整：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resole, reject) => {
    resole('run async')
    console.log('main')
})

promise.then((msg) => {
    console.log(msg);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resole, reject</span>) =&gt;</span> {
    resole(<span class="hljs-string">'run async'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'main'</span>)
})

promise.then(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg);
})</code></pre>
<p>我们首先将 <strong>resolve('run async')</strong> 调用移至 <strong>console.log('main')</strong> 之前。</p>
<p>如果是同步调用按照执行顺序，会先输出 <strong>run async</strong> 再输出 <strong>main</strong>，但情况相反。说明 <strong>resolve</strong> 处理方法被异步执行了。</p>
<h3 id="articleHeader5">2.3  异步失败执行处理方法</h3>
<p>通过使用 Promise 对象的 <strong>catch</strong> 方法绑定 <strong>reject</strong> 处理方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resole, reject) => {
    //resole('run async')
    reject('run async error')
    console.log('main')
})

promise.then((msg) => {
    throw new Error('error')
    console.log(msg);

}).catch(() => {
    console.log('error')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resole, reject</span>) =&gt;</span> {
    <span class="hljs-comment">//resole('run async')</span>
    reject(<span class="hljs-string">'run async error'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'main'</span>)
})

promise.then(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)
    <span class="hljs-built_in">console</span>.log(msg);

}).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>)
})</code></pre>
<h3 id="articleHeader6">三、 Promise 生命周期</h3>
<p>一个 Promise有以下几种状态:</p>
<ul>
<li>pending: 初始状态，既不是成功，也不是失败状态。</li>
<li>fulfilled: 意味着操作成功完成。</li>
<li>rejected: 意味着操作失败。</li>
</ul>
<p>pending 状态的 Promise 对象可能触发fulfilled 状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。</p>
<p>当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007576996" src="https://static.alili.tech/img/remote/1460000007576996" alt="Promise 生命周期" title="Promise 生命周期" style="cursor: pointer; display: inline;"></span></p>
<p>注: Promise 生命周期相关内容引用自 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#%E6%8F%8F%E8%BF%B0" rel="nofollow noreferrer" target="_blank">Promise </a></p>
<h3 id="articleHeader7">四、使用 Promise 和 XHR 异步加载图片</h3>
<p>这是 MDN 官方给出的<a href="https://mdn.github.io/js-examples/promises-test/" rel="nofollow noreferrer" target="_blank">示例</a>，JavaScript 部分的代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function imgLoad(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
      // When the request loads, check whether it was successful
      request.onload = function() {
        if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
          resolve(request.response);
        } else {
        // If it fails, reject the promise with a error message
          reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
          reject(Error('There was a network error.'));
      };
      // Send the request
      request.send();
    });
  }
  // Get a reference to the body element, and create a new image object
  var body = document.querySelector('body');
  var myImage = new Image();
  // Call the function with the URL we want to load, but then chain the
  // promise then() method on to the end of it. This contains two callbacks
  imgLoad('myLittleVader.jpg').then(function(response) {
    // The first runs when the promise resolves, with the request.response
    // specified within the resolve() method.
    var imageURL = window.URL.createObjectURL(response);
    myImage.src = imageURL;
    body.appendChild(myImage);
    // The second runs when the promise
    // is rejected, and logs the Error specified with the reject() method.
  }, function(Error) {
    console.log(Error);
  });
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">imgLoad</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-comment">// Create new promise with the Promise() constructor;</span>
    <span class="hljs-comment">// This has as its argument a function</span>
    <span class="hljs-comment">// with two parameters, resolve and reject</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      <span class="hljs-comment">// Standard XHR to load an image</span>
      <span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
      request.open(<span class="hljs-string">'GET'</span>, url);
      request.responseType = <span class="hljs-string">'blob'</span>;
      <span class="hljs-comment">// When the request loads, check whether it was successful</span>
      request.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (request.status === <span class="hljs-number">200</span>) {
        <span class="hljs-comment">// If successful, resolve the promise by passing back the request response</span>
          resolve(request.response);
        } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// If it fails, reject the promise with a error message</span>
          reject(<span class="hljs-built_in">Error</span>(<span class="hljs-string">'Image didn\'t load successfully; error code:'</span> + request.statusText));
        }
      };
      request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// Also deal with the case when the entire request fails to begin with</span>
      <span class="hljs-comment">// This is probably a network error, so reject the promise with an appropriate message</span>
          reject(<span class="hljs-built_in">Error</span>(<span class="hljs-string">'There was a network error.'</span>));
      };
      <span class="hljs-comment">// Send the request</span>
      request.send();
    });
  }
  <span class="hljs-comment">// Get a reference to the body element, and create a new image object</span>
  <span class="hljs-keyword">var</span> body = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>);
  <span class="hljs-keyword">var</span> myImage = <span class="hljs-keyword">new</span> Image();
  <span class="hljs-comment">// Call the function with the URL we want to load, but then chain the</span>
  <span class="hljs-comment">// promise then() method on to the end of it. This contains two callbacks</span>
  imgLoad(<span class="hljs-string">'myLittleVader.jpg'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// The first runs when the promise resolves, with the request.response</span>
    <span class="hljs-comment">// specified within the resolve() method.</span>
    <span class="hljs-keyword">var</span> imageURL = <span class="hljs-built_in">window</span>.URL.createObjectURL(response);
    myImage.src = imageURL;
    body.appendChild(myImage);
    <span class="hljs-comment">// The second runs when the promise</span>
    <span class="hljs-comment">// is rejected, and logs the Error specified with the reject() method.</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Error</span>);
  });
  </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你玩转 JavaScript ES6 (七) - 异步

## 原文链接
[https://segmentfault.com/a/1190000013171493](https://segmentfault.com/a/1190000013171493)

