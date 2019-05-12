---
title: 'fetch和ajax的区别' 
date: 2019-01-01 2:30:07
hidden: true
slug: lbz1rb5f5t8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Ajax</h2>
<p>利用的是XMLHttpRequest对象来请求数据的。<br>关于ajax  <a href="https://segmentfault.com/a/1190000010913587">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader1">fetch</h2>
<p>window的一个方法  主要特点是<br>1、第一个参数是URL<br>2、第二个参数可选参数 可以控制不同的init对象<br>3、使用了js 中的promise对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(function (response) {
    return response.json()   //执行成功第一步
}).then(function (returnedValue) {
    //执行成功的第二步
}).catch(function (err) {
    //中途的任何地方出错  都会在这里被捕获到
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>fetch(url).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
    <span class="hljs-keyword">return</span> response.json()   <span class="hljs-comment">//执行成功第一步</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(returnedValue)</span> {</span>
    <span class="hljs-comment">//执行成功的第二步</span>
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
    <span class="hljs-comment">//中途的任何地方出错  都会在这里被捕获到</span>
})</code></pre>
<p>注意：<br>fetch  的第二参数中<br>1、默认的请求为get请求  可以使用method:post  来进行配置  <br>2、第一步中的  response有许多方法  json()  text()  formData()<br>3、Fetch跨域的时候默认不会带cookie   需要手动的指定 credentials:'include'</p>
<p>使用fetch之后得到的是一个promise对象  在这个promise对象里边再定义执行成功的时候是什么。下面是正确的fetch的使用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var promise=fetch('http://localhost:3000/news', {
        method: 'get'
    }).then(function(response) {
             return  response.json()
    }).catch(function(err) {
        // Error :(
    });
    promise.then(function (data) {
          console.log(data)
    }).catch(function (error) {
        console.log(error)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code> var promise=fetch(<span class="hljs-string">'http://localhost:3000/news'</span>, {
        method: <span class="hljs-string">'get'</span>
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
             <span class="hljs-keyword">return</span>  response.json()
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> {</span>
        <span class="hljs-comment">// Error :(</span>
    });
    promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
          console.<span class="hljs-built_in">log</span>(data)
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>)
    })</code></pre>
<h2 id="articleHeader2">fetch和ajax 的主要区别</h2>
<p>1、fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500  <br>2、在默认情况下   fetch不会接受或者发送cookies</p>
<h2 id="articleHeader3">使用fetch开发项目的时候的问题</h2>
<p>1、所有的IE浏览器都不会支持  fetch()方法<br>2、服务器端返回 状态码  400  500的时候 不会reject</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
fetch和ajax的区别

## 原文链接
[https://segmentfault.com/a/1190000011019618](https://segmentfault.com/a/1190000011019618)

