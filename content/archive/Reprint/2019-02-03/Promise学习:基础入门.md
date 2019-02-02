---
title: 'Promise学习:基础入门' 
date: 2019-02-03 2:30:40
hidden: true
slug: n8bk54lyrf
categories: [reprint]
---

{{< raw >}}

                    
<p>今天来学习下Promise吧,其实这在笔试上也是一个考点.</p>
<h2 id="articleHeader0">基本介绍</h2>
<p>Promise对象是CommonJS(熟悉的名字吧- -)工作组提出的规范.Promise原本只是社区提出的构想,一些外部函数库率先实现了该功能,ES6中将其写入了语言标准.<br><strong>目的:</strong>为异步操作提供统一接口</p>
<p>Promise是啥,它就是一个javascript中一个对象,起着代理作用,充当异步操作与回调函数之间的中介.<br>避免类似于<br><span class="img-wrap"><img data-src="/img/bVDaCg?w=351&amp;h=210" src="https://static.alili.tech/img/bVDaCg?w=351&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这种嵌套地狱的产生.让我们的代码变得更加简单易读<br>使用了Promise,大家都说好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(new Promise(f1).then(f2));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-name"><span class="hljs-builtin-name">new</span></span> Promise(<span class="hljs-name">f1</span>).then(<span class="hljs-name">f2</span>))<span class="hljs-comment">;</span></code></pre>
<p>总结:Promise使得异步操作的向下发展变成横向发展,程序流程变得清晰,易于阅读.</p>
<h2 id="articleHeader1">基本思想</h2>
<ul>
<li>
<p>异步任务返回一个Promise对象,它有三种状态</p>
<ul>
<li><p>pending(未完成)</p></li>
<li><p>resolved,fulfilled(已完成)</p></li>
<li><p>rejected(失败)</p></li>
</ul>
</li>
<li>
<p>它有两种变化途径</p>
<ul>
<li><p>pending --&gt; resolved/fulfilled</p></li>
<li><p>pending --&gt; rejected</p></li>
</ul>
</li>
<li>
<p>它有两种结果</p>
<ul>
<li><p>异步操作成功,返回一个值,状态变为resolved</p></li>
<li><p>异步操作失败,抛出一个错误,状态变为rejected</p></li>
</ul>
</li>
</ul>
<p>Promise使用.then()方法添加回调函数,then接收两个回调函数,第一个为成功时的回调函数,另一个为失败时的回调函数.主要为<em>状态改变</em>时调用相对的回调函数.<br>而且then可以链式调用.</p>
<h2 id="articleHeader2">基本使用</h2>
<p><strong>Promise构造函数</strong>接受<strong>一个函数</strong>作为<strong>参数</strong>,而该<em>函数两个参数</em>分别是<em>resolve</em>和<em>reject</em>.它们由JS引擎提供,不需要自己部署.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise(function(resolve,reject){})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{})</code></pre>
<p><strong>resolve</strong>函数作用为:将Promise对象<em>从未完成变为成功(Pending-&gt;Resolved)</em>,<strong>异步操作成功</strong>时调用,并将异步操作的<strong>结果</strong>作为参数传递出去.<br><strong>reject</strong>函数作用为:将Promise对象<em>从未完成变为失败(Pending-&gt;Rejected)</em>,<strong>异步操作失败</strong>时调用,并将异步操作<strong>报出的错误</strong>作为参数传递出去.</p>
<hr>
<p>Promise.then()方法可以用于<em>指定Resolved状态和Reject状态的回调函数</em>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(function(value){//成功+_+!},function(value){//失败Q_Q});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{//成功+_+!},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{//失败Q_Q});</code></pre>
<p>我们只想对异常进行处理时可以采用promise.<em>then</em>(undefined, onRejected)这种方式,或者promise.<em>catch</em>(onRejected)<br><strong>!注意!</strong>此处有坑,接下来在深入节会进行讲解</p>
<hr>
<p><strong>Promise.all()</strong>方法接收一个<strong>promise对象的数组</strong>为参数,当这个数组中所有的Promise对象<strong>全部变成resolve/reject状态</strong>的时候,才会调用.then方法,其中传入的promise是同时开始,并行执行的.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.all([promise1,promise2,.....]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>promise.all([promise1,promise2,.....]);
</code></pre>
<hr>
<p>Promise.race()方法和Promise.all()方法一样接收<strong>一个promise对象的数组</strong>作为参数,但是数组中<strong>有一个</strong>promise对象<strong>进入fulfilled或rejected状态</strong>,就会开始后续处理.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.race([promise1,promise2,.....]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>promise.race([promise1,promise2,.....]);
</code></pre>
<hr>
<h3 id="articleHeader3">相关的语法糖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(42);
//等价于
new Promise(function(resolve){
    resolve(42);
});

Promise.reject(new Error(&quot;出错了&quot;));
//等价于
new Promise(function(resolve,reject){
    reject(new Error(&quot;出错了&quot;));
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">42</span>);
<span class="hljs-comment">//等价于</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    resolve(<span class="hljs-number">42</span>);
});

<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"出错了"</span>));
<span class="hljs-comment">//等价于</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"出错了"</span>));
});
</code></pre>
<hr>
<h2 id="articleHeader4">深入</h2>
<h4>关于Thenable对象</h4>
<p>这是非常类似于Promise的东西,<em>拥有.then方法</em>.<br>其中比较经典的例子就是jQuery.ajax()返回的值就是thenable的.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = Promise.resolve($.ajax('/json/comment.json'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve($.ajax(<span class="hljs-string">'/json/comment.json'</span>));</code></pre>
<p>这样就可以将thenable对象转化为promise对象<br>传送门:<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve" rel="nofollow noreferrer" target="_blank">Promise.resolve()</a></p>
<h4>关于promise设计:总是异步操作</h4>
<p>看代码就能明白这个地方的问题了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function (resolve){
    console.log(&quot;inner promise&quot;); // 1
    resolve(42);
});
promise.then(function(value){
    console.log(value); // 3
});
console.log(&quot;outer promise&quot;); // 2
//结果是
/*
inner promise // 1
outer promise // 2
42            // 3
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"inner promise"</span>); <span class="hljs-comment">// 1</span>
    resolve(<span class="hljs-number">42</span>);
});
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// 3</span>
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"outer promise"</span>); <span class="hljs-comment">// 2</span>
<span class="hljs-comment">//结果是</span>
<span class="hljs-comment">/*
inner promise // 1
outer promise // 2
42            // 3
*/</span></code></pre>
<p>可以看出,即使我们调用promise.then时promise对象已经确定状态,Promise也会以异步的方式调用回调函数,这就是Promise设计上的规定方针.</p>
<h4>关于调用then/catch</h4>
<p>每次调用then/catch,都会返回一个promise对象,这一点上我们通过使用===就可以判断出来每次promise对象其实都是不一样的</p>
<h4>then和catch的错误处理区别</h4>
<p>这点和上一点联合起来很容易理解<br>直接上图吧,来自于<a href="http://liubin.org/promises-book/#then-return-new-promise" rel="nofollow noreferrer" target="_blank">JavaScript Promise迷你书（中文版）</a></p>
<p><span class="img-wrap"><img data-src="/img/bVDaEt?w=718&amp;h=268" src="https://static.alili.tech/img/bVDaEt?w=718&amp;h=268" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在结合我们的代码吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// <1> onRejected不会被调用
function badMain(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected);
}
// <2> 有异常发生时onRejected会被调用
function goodMain(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// &lt;1&gt; onRejected不会被调用</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">badMain</span><span class="hljs-params">(onRejected)</span> {</span>
    <span class="hljs-keyword">return</span> Promise.resolve(<span class="hljs-number">42</span>).<span class="hljs-keyword">then</span>(throwError, onRejected);
}
<span class="hljs-comment">// &lt;2&gt; 有异常发生时onRejected会被调用</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">goodMain</span><span class="hljs-params">(onRejected)</span> {</span>
    <span class="hljs-keyword">return</span> Promise.resolve(<span class="hljs-number">42</span>).<span class="hljs-keyword">then</span>(throwError).<span class="hljs-keyword">catch</span>(onRejected);
}</code></pre>
<p>onFullfilled中发生的错误,如在&lt;1&gt;里面throwError中的错误,是不会导致onRejected的执行(捕获异常)的,我们只能通过后面的catch方法才能捕获.</p>
<h2 id="articleHeader5">基本应用</h2>
<h4>不兼容方面</h4>
<ol>
<li><p>不兼容就是用<strong>polyfill</strong>吧</p></li>
<li><p>关于IE8以及以下版本中,catch会由于在ES3中为保留字,导致identifier not found错误,对此我们可以通过<em>["catch"]</em>或者<em>then(undefined,function(){})</em>来进行catch,而某些类库中,采用了<em>caught</em>作为函数名来规避该问题.值得注意的是,<em>有很多压缩工具中自带了.catch转["catch"]</em></p></li>
</ol>
<p><strong>应用示例:</strong><br>加载图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var preloadImage = function(path){
  return new Promise(function(resolve,reject){
    var image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}
preloadImage(&quot;https://dn-anything-about-doc.qbox.me/teacher/QianDuan.png&quot;).then(function(){
  alert(&quot;图片加载成功&quot;);
},function(){
  alert(&quot;图片加载失败&quot;);
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> preloadImage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
    <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}
preloadImage(<span class="hljs-string">"https://dn-anything-about-doc.qbox.me/teacher/QianDuan.png"</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-string">"图片加载成功"</span>);
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-string">"图片加载失败"</span>);
})
</code></pre>
<p>Ajax操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function search(term) {
    var url = 'http://example.com/search?q=' + term;
    var xhr = new XMLHttpRequest();
    var result;
    var p = new Promise(function(resolve, reject) {
        xhr.open('GET', url, true);
        xhr.onload = function(e) {
            if (this.status === 200) {
                result = JSON.parse(this.responseText);
                resolve(result);
            }
        };
        xhr.onerror = function(e) {
            reject(e);
        };
        xhr.send();
    });
    return p;
}
search(&quot;Hello World&quot;).then(console.log, console.error);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">search</span>(<span class="hljs-params">term</span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://example.com/search?q='</span> + term;
    <span class="hljs-built_in">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    <span class="hljs-built_in">var</span> result;
    <span class="hljs-built_in">var</span> p = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
        xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>) {
                result = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-keyword">this</span>.responseText);
                resolve(result);
            }
        };
        xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            reject(e);
        };
        xhr.send();
    });
    <span class="hljs-keyword">return</span> p;
}
search(<span class="hljs-string">"Hello World"</span>).then(<span class="hljs-built_in">console</span>.log, <span class="hljs-built_in">console</span>.error);
</code></pre>
<hr>
<p>回到最初吧,其实Promise对象优点还是在于规范的链式调用,可以清晰看出程序流程.并且对于错误还能定义统一的处理方法.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise学习:基础入门

## 原文链接
[https://segmentfault.com/a/1190000006913459](https://segmentfault.com/a/1190000006913459)

