---
title: '异步和promise' 
date: 2018-12-17 2:30:07
hidden: true
slug: fvp0ivdz1b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">引言</h1>
<p>16年时在公司分享过一次promise,犹记得当时是第一次分享,还蛮紧张的,当时分享的主要是promise的使用和基本原理,后来又给无线部门同学分享了一次。<br>现在回顾想想,其实讲的不是很完美,因为我当时的实现方式类似于简化版q库的实现,考虑的也不全面,也没有完全遵循promise/a+规范。经过这么长一段时间的学习和积累,阐述一下自己新的理解。</p>
<h2 id="articleHeader1">Promise出现的起因</h2>
<p>在没有promise以前,多个有依赖的异步操作一般写出来会出现嵌套,所谓的回调地域,这种写法在需要协作的项目中不方便维护,异步操作也不能直接捕获异常,需要回调中进行处理,缺点挺多的,然后就开始漫长的优化,出现了q, bluebird,jq中的defer等这些库,后来ES6标准实现了Promise,但是其链式写法还是不美观,为了代码更优雅,可以视觉上同步命令式的书写代码有了TJ大神的co再结合generator似乎完美了,但是为了优雅还要额外引入co库,成本有点大,后来ES7标准干脆直接实现了,就是所谓的async和await语法糖</p>
<h2 id="articleHeader2">Promise定义</h2>
<p>现在开始切入正题,什么是Promise呢? 简而言之promise代表承诺,专业术语就是代表一个异步操作的最终结果。<br>代码层面来看的话Promise是一个类，可以用来创建实例,每个实例内部封装一些方法,且维护了一些状态和值,通过使用这些状态、值和方法来将现实流程中的承诺具体代码化表示。</p>
<h2 id="articleHeader3">Promise使用</h2>
<p>promise主要提供了then,catch,all,race,resolve,reject这几个方法,关于这几个方法怎么使用不在赘述,因为占据文章篇幅长,且很多其它blog重复描述过。推荐阮一峰es6入门中相关api用法解释,详细且全面。<br>关于具体应用的话,由于在工作中项目基于vue技术栈,所以结合axios时会使用到promise来操作异步,还有就是m站基于pwa,其中Service worker声明周期事件处理中会涉及promise,还有一些就是平时写node工具的时候会用到,用promise封装异步api操作回调,从而将异步api回调逻辑直接放到then方法中进行处理。</p>
<h2 id="articleHeader4">Promise的实现</h2>
<p>基于Promise/a+规范实现的代码能互相统一,虽然代码形式会有不同,但原理都差不多。<br>首先Promise构造函数中需要有一些状态和方法,因为执行实例then逻辑的时候需要这些维护好的状态和值,其中着重提醒的就是promise的状态机是单向的,且状态单向不可逆。<br>状态转变只能是 pending -&gt; fulfilled 或者 pending -&gt; rejected。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      //构造函数初始化逻辑
     let that = this; //缓存this
    //默认状态为pending
    that.status = 'pending';
    //此变量里放着此promise的结果
    that.value = undefined;
    //存放的着所有成功的回调函数
    that.onResolvedCallbacks = [];
    //存放着所有的失败的回调函数
    that.onRejectedCallbacks = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>      <span class="hljs-comment">//构造函数初始化逻辑</span>
     <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>; <span class="hljs-comment">//缓存this</span>
    <span class="hljs-comment">//默认状态为pending</span>
    that.status = <span class="hljs-string">'pending'</span>;
    <span class="hljs-comment">//此变量里放着此promise的结果</span>
    that.<span class="hljs-keyword">value</span> = undefined;
    <span class="hljs-comment">//存放的着所有成功的回调函数</span>
    that.onResolvedCallbacks = [];
    <span class="hljs-comment">//存放着所有的失败的回调函数</span>
    that.onRejectedCallbacks = [];</code></pre>
<p>其中内部resolve和reject逻辑如下,更改状态机状态,触发承诺逻辑执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function resolve(value) {
        //更改状态 执行then注册的成功回调逻辑
        if (that.status == 'pending') {
            //解决resolve 新Promise这种情况
            if(value!=null &amp;&amp;value.then&amp;&amp;typeof value.then == 'function'){
              return value.then(resolve,reject);
            }
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach(item=>item(that.value));
        }
    }
     function reject(reason) {
            //更改状态 执行then注册的失败回调逻辑或者catch中注册的失败逻辑
            if (that.status == 'pending') {
                that.status = 'rejected';
                that.value = reason;
                that.onRejectedCallbacks.forEach(item=>item(that.value));
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>  <span class="hljs-keyword">function</span> resolve(<span class="hljs-keyword">value</span>) {
        <span class="hljs-comment">//更改状态 执行then注册的成功回调逻辑</span>
        <span class="hljs-keyword">if</span> (that.status == <span class="hljs-string">'pending'</span>) {
            <span class="hljs-comment">//解决resolve 新Promise这种情况</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">value</span>!=null &amp;&amp;<span class="hljs-keyword">value</span>.<span class="hljs-keyword">then</span>&amp;&amp;typeof <span class="hljs-keyword">value</span>.<span class="hljs-keyword">then</span> == <span class="hljs-string">'function'</span>){
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>.<span class="hljs-keyword">then</span>(resolve,reject);
            }
            that.status = <span class="hljs-string">'fulfilled'</span>;
            that.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
            that.onResolvedCallbacks.forEach(item=&gt;item(that.<span class="hljs-keyword">value</span>));
        }
    }
     <span class="hljs-keyword">function</span> reject(reason) {
            <span class="hljs-comment">//更改状态 执行then注册的失败回调逻辑或者catch中注册的失败逻辑</span>
            <span class="hljs-keyword">if</span> (that.status == <span class="hljs-string">'pending'</span>) {
                that.status = <span class="hljs-string">'rejected'</span>;
                that.<span class="hljs-keyword">value</span> = reason;
                that.onRejectedCallbacks.forEach(item=&gt;item(that.<span class="hljs-keyword">value</span>));
            }
        }</code></pre>
<p>上面已经介绍了大致初始化逻辑了,下面着重介绍使用频率最高的then方法,简洁版实现如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PPromise.prototype.then = function (onFulfilled, onReject) {
    //成功和失败的逻辑没有传递 会进行值的穿透 传递给下一个then方法
     onFulfilled = isFunction(onFulfilled) ?onFulfilled:val =>val;
     onReject = isFunction(onReject) ?onReject:reason => {throw reason;}
     let self = this,promise2;
     switch (self.status){
         case 'fulfilled':
             promise2 = new Promise((resolve,reject) =>{
                 let x = onFulfilled(self.value);
                 if(x instanceof Promise){
                    //递归执行then逻辑 直到内部then执行,外部promise2被resolve
                     x.then(resolve,reject)
                 }else{
                     resolve(x);
                 }
             });
             break
         case 'rejected':
             promise2 = new Promise((resolve,reject) =>{
                 let x = onReject(self.value);
                 if(x instanceof Promise){
                     x.then(resolve,reject)
                 }else{
                     resolve(x);
                 }
             })
             break
         case 'pending':
             promise2 = new Promise((resolve,reject) =>{
                 self.onResolvedCallbacks.push(function(){
                     let x = onFulfilled(self.value);
                     if(x instanceof Promise){
                         x.then(resolve,reject)
                     }else{
                         resolve(x);
                     }
                 });
                 self.onRejectedCallbacks.push(function(){
                     let x = onReject(self.value);
                     if(x instanceof Promise){
                         x.then(resolve,reject)
                     }else{
                         resolve(x);
                     }
                 });
             });
     }
     return promise2;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>PPromise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled, onReject</span>) </span>{
    <span class="hljs-comment">//成功和失败的逻辑没有传递 会进行值的穿透 传递给下一个then方法</span>
     onFulfilled = isFunction(onFulfilled) ?onFulfilled:<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span>val;
     onReject = isFunction(onReject) ?onReject:<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {<span class="hljs-keyword">throw</span> reason;}
     <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>,promise2;
     <span class="hljs-keyword">switch</span> (self.status){
         <span class="hljs-keyword">case</span> <span class="hljs-string">'fulfilled'</span>:
             promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span>{
                 <span class="hljs-keyword">let</span> x = onFulfilled(self.value);
                 <span class="hljs-keyword">if</span>(x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>){
                    <span class="hljs-comment">//递归执行then逻辑 直到内部then执行,外部promise2被resolve</span>
                     x.then(resolve,reject)
                 }<span class="hljs-keyword">else</span>{
                     resolve(x);
                 }
             });
             <span class="hljs-keyword">break</span>
         <span class="hljs-keyword">case</span> <span class="hljs-string">'rejected'</span>:
             promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span>{
                 <span class="hljs-keyword">let</span> x = onReject(self.value);
                 <span class="hljs-keyword">if</span>(x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>){
                     x.then(resolve,reject)
                 }<span class="hljs-keyword">else</span>{
                     resolve(x);
                 }
             })
             <span class="hljs-keyword">break</span>
         <span class="hljs-keyword">case</span> <span class="hljs-string">'pending'</span>:
             promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span>{
                 self.onResolvedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                     <span class="hljs-keyword">let</span> x = onFulfilled(self.value);
                     <span class="hljs-keyword">if</span>(x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>){
                         x.then(resolve,reject)
                     }<span class="hljs-keyword">else</span>{
                         resolve(x);
                     }
                 });
                 self.onRejectedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                     <span class="hljs-keyword">let</span> x = onReject(self.value);
                     <span class="hljs-keyword">if</span>(x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>){
                         x.then(resolve,reject)
                     }<span class="hljs-keyword">else</span>{
                         resolve(x);
                     }
                 });
             });
     }
     <span class="hljs-keyword">return</span> promise2;
 }</code></pre>
<p>all方法实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sentry(times,cb){
  let result = [],count=0;
  return function(i,data){
    result[i] = data;
    if(++count==times){
      cb(result);
    }
  }
}
Promise.all = function(promises){
 return new Promise((resolve,reject) => {
   //利用闭包机制,目的是为了判断promises是否都执行完
   let done = sentry(promises.length,resolve);
   for(let i=0;i<promises.length;i++){
     promises[i].then(data =>{
       done(i,data);
     },reject);
   }
 });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sentry</span>(<span class="hljs-params">times,cb</span>)</span>{
  <span class="hljs-keyword">let</span> result = [],count=<span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,data</span>)</span>{
    result[i] = data;
    <span class="hljs-keyword">if</span>(++count==times){
      cb(result);
    }
  }
}
<span class="hljs-built_in">Promise</span>.all = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promises</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
   <span class="hljs-comment">//利用闭包机制,目的是为了判断promises是否都执行完</span>
   <span class="hljs-keyword">let</span> done = sentry(promises.length,resolve);
   <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;promises.length;i++){
     promises[i].then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span>{
       done(i,data);
     },reject);
   }
 });
}</code></pre>
<p>resolve实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve = function(value){
  return new Promise(function(resolve){
    resolve(value);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    resolve(value);
  });
}</code></pre>
<p>race实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race = function(promises){
  return new Promise((resolve,reject) =>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject);
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promises</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;promises.length;i++){
      promises[i].then(resolve,reject);
    }
  });
}</code></pre>
<p>自己实现的<a href="https://github.com/gcyStar/High-Performance-JS/blob/master/promise/Promise.js" rel="nofollow noreferrer" target="_blank">promise</a>源码</p>
<h2 id="articleHeader5">异步优雅写法</h2>
<p>异步操作经过promisify转化成promise,在结合async实现优雅的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
async function read() {
  let a = await readFile('./1.txt','utf8');
  let b = await readFile('./2.txt','utf8');
  let c = await readFile('./3.txt','utf8');
  console.log(c);
  return 'ok';
}

read().then(data => {
  console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bluebird'</span>);
<span class="hljs-keyword">let</span> readFile = <span class="hljs-built_in">Promise</span>.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).readFile);
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">read</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>);
  <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'./2.txt'</span>,<span class="hljs-string">'utf8'</span>);
  <span class="hljs-keyword">let</span> c = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'./3.txt'</span>,<span class="hljs-string">'utf8'</span>);
  <span class="hljs-built_in">console</span>.log(c);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'ok'</span>;
}

read().then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<h2 id="articleHeader6">总结</h2>
<p>任何事物都不是一蹴而就的,都有一个发展过程才逐步变得完美,将自己的学习坐下记录,并加一些个人思考,如果对于本文有任何疑问或错误，欢迎斧正交流。</p>
<p>参考链接<br><a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">https://promisesaplus.com/</a><br><a href="https://segmentfault.com/a/1190000002452115">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
异步和promise

## 原文链接
[https://segmentfault.com/a/1190000012830991](https://segmentfault.com/a/1190000012830991)

