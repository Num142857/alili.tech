---
title: 'Promise 的四种常用方法。' 
date: 2019-02-07 2:30:16
hidden: true
slug: ocaiqa2gvl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>看到项目里不少人用了<code>Promise</code> 的库类，比如 bluebird、q 、jQuery.Deffered 等 <code>polyfill promise </code> 方式，使用的时候翻看长长的文档，真心累觉不爱。<br>es5 发展到现在，node 在<code>0.12</code>版本就已经支持了<code>promise</code>， 在客户端，大部分浏览器也支持了<code>Promise</code>， 如果要兼容低版本的浏览器，可以加上<code>es5-shim</code>等 <code>polyfill promise</code>。</p>
<h2 id="articleHeader1">用法</h2>
<p>Promise 常用三个场景。</p>
<ul>
<li><p>处理异步回调</p></li>
<li><p>多个异步函数同步处理</p></li>
<li><p>异步依赖异步回调</p></li>
<li><p>封装统一的入口办法或者错误处理</p></li>
</ul>
<h3 id="articleHeader2"><strong>处理异步回调</strong></h3>
<p><code>Promise</code> 的基本用法， 处理异步回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pro1(){
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve('pro1')
        }, 300)
    })
}
//调用
Pro1()
.then(function(data){
    console.log(data) //pro1
})
.catch(function(err){
    throw new Error(err)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pro1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(<span class="hljs-string">'pro1'</span>)
        }, <span class="hljs-number">300</span>)
    })
}
<span class="hljs-comment">//调用</span>
Pro1()
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">//pro1</span>
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
})</code></pre>
<h3 id="articleHeader3"><strong>多个异步函数同步处理</strong></h3>
<p>有时候我们需要发送两个<code>ajax</code>，希望他们能一起把数据返回，就可以采用下面的办法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pro1(){
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve('pro1')
        }, 300)
    })
}
function Pro2(){
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve('pro2')
        }, 300)
    })
}
//调用
var Pro = Promise.all([Pro1(), Pro2()]);
Pro
.then(function(data){
    console.log(data[0], data[1]) //Pro1 Pro2
})
.catch(function(err){
    throw new Error(err)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pro1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(<span class="hljs-string">'pro1'</span>)
        }, <span class="hljs-number">300</span>)
    })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pro2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(<span class="hljs-string">'pro2'</span>)
        }, <span class="hljs-number">300</span>)
    })
}
<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">var</span> Pro = <span class="hljs-built_in">Promise</span>.all([Pro1(), Pro2()]);
Pro
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data[<span class="hljs-number">0</span>], data[<span class="hljs-number">1</span>]) <span class="hljs-comment">//Pro1 Pro2</span>
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
})
</code></pre>
<h3 id="articleHeader4"><strong>异步依赖异步回调</strong></h3>
<p>有些场景是一个异步依赖另一个异步的返回值的，就可以采用下面的用法。<br>比如： 用一个订单号异步取到订单详情，再用订单详情里的商品<code>Id</code>获取到商品详情。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pro1(orderId){
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            var orderInfo = {
                orderId: orderId,
                productIds: ['123', '456']
            }
            resolve(orderInfo.productIds)
        }, 300)
    })
}
function Pro2(productIds){
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            var products = productIds.map(function(productId){
                return {
                    productId: productId,
                    name: '衣服'
                }
            })
            resolve(products)
        }, 300)
    })
}
//调用

Pro1('abc123')
.then(function(productIds){
    console.log('商品id',productIds) 
    return Pro2(productIds)
})
.then(function(products){
    console.log('商品详情',products) 
})
.catch(function(err){
    throw new Error(err)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pro1</span>(<span class="hljs-params">orderId</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> orderInfo = {
                <span class="hljs-attr">orderId</span>: orderId,
                <span class="hljs-attr">productIds</span>: [<span class="hljs-string">'123'</span>, <span class="hljs-string">'456'</span>]
            }
            resolve(orderInfo.productIds)
        }, <span class="hljs-number">300</span>)
    })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pro2</span>(<span class="hljs-params">productIds</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> products = productIds.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">productId</span>)</span>{
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">productId</span>: productId,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'衣服'</span>
                }
            })
            resolve(products)
        }, <span class="hljs-number">300</span>)
    })
}
<span class="hljs-comment">//调用</span>

Pro1(<span class="hljs-string">'abc123'</span>)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">productIds</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'商品id'</span>,productIds) 
    <span class="hljs-keyword">return</span> Pro2(productIds)
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">products</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'商品详情'</span>,products) 
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
})
</code></pre>
<h3 id="articleHeader5"><strong>封装统一的入口办法或者错误处理</strong></h3>
<h4>错误处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ErrorHandler(promiseObj, rejectOrResOrCallback){
    return promiseObj.then(null, function(err){
    if(!err)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ErrorHandler</span><span class="hljs-params">(promiseObj, rejectOrResOrCallback)</span></span>{
    <span class="hljs-keyword">return</span> promiseObj.then(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{
    <span class="hljs-keyword">if</span>(!err)
    })
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise 的四种常用方法。

## 原文链接
[https://segmentfault.com/a/1190000005894077](https://segmentfault.com/a/1190000005894077)

