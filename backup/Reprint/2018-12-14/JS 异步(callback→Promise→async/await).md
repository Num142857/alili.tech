---
title: 'JS 异步(callback→Promise→async/await)' 
date: 2018-12-14 2:30:11
hidden: true
slug: rbri4ga20wd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JS异步编程</h2>
<p>JS三座大山：原型原型链、作用域闭包、同步异步。<br>之前有写过自己对闭包的理解，今天来总结一下JS中的异步。</p>
<p><strong>思考（案例来自stackoverflow）：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    var result;
    $ajax({
        url:'...',
        success:function(response){
            result=response;
            //return response;//tried this one as well
        }
    });
    return result;
}
var result=foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> result;
    $ajax({
        url:<span class="hljs-string">'...'</span>,
        success:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span></span>{
            result=response;
            <span class="hljs-comment">//return response;//tried this one as well</span>
        }
    });
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-keyword">var</span> result=foo();</code></pre>
<p>初学异步的时候，这里是很容易错的地方，你想要获取从服务器端返回的数据，结果却一直undefined。<br><strong>分析：</strong><br>JavaScript是单线程语言，但是js中有很多任务耗时比较长，比如ajax请求，如果都按照顺序进行，往往会出现浏览器无响应的情况，所以就需要异步的形式。JS中所有的任务可以分为两种：同步任务和异步任务。</p>
<p>同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；</p>
<p>异步任务：不进入主线程，而进入任务队列中的任务，只有任务队列通知主线程，某个异步任务可以执行了，这个任务才会进入主线程执行。</p>
<p>事件循环（Event Loop）：只有执行栈中的所有同步任务都执行完毕，系统才会读取任务队列，看看里面的异步任务哪些可以执行，然后那些对应的异步任务，结束等待状态，进入执行栈，开始执行。</p>
<hr>
<p><strong>异步的解决方案：</strong></p>
<p>下面我们尝试将上面代码改正一下，几种方法如下：<br><strong>1.callback</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(callback){//定义函数的时候将另一个函数（回调函数）作为参数传入定义的函数中。
    $ajax({
        //...
        success:callback//异步操作执行完毕后，再执行该回调函数，确保回调在异步操作之后执行。
    });
}
function myCallback(result){
    //...
}
foo(myCallback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(callback)</span></span>{<span class="hljs-comment">//定义函数的时候将另一个函数（回调函数）作为参数传入定义的函数中。</span>
    $ajax({
        <span class="hljs-comment">//...</span>
        success:callback<span class="hljs-comment">//异步操作执行完毕后，再执行该回调函数，确保回调在异步操作之后执行。</span>
    });
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myCallback</span><span class="hljs-params">(result)</span></span>{
    <span class="hljs-comment">//...</span>
}
foo(myCallback);</code></pre>
<p>回调函数本身是我们约定俗成的一种叫法，我们定义它，但是并不会自己去执行它，它最终被其他人执行了。</p>
<p>优点：比较容易理解；<br>缺点：1.高耦合，维护困难，回调地狱;2.每个任务只能指定一个回调函数;3.如果几个异步操作之间并没有顺序之分，同样也要等待上一个操作执行结束再进行下一个操作。下图回调地狱（图片来自于新浪微博(@ruanyf)）：</p>
<p><span class="img-wrap"><img data-src="/img/bV3hhv?w=480&amp;h=386" src="https://static.alili.tech/img/bV3hhv?w=480&amp;h=386" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2.Promise</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url){
    return new Promise(function(resolve,reject){
        var xhr=new XMLHttpRequest();
        xhr.onload=function(){
            resolve(this.responseText);
        };
        xhr.onerror=reject;
        xhr.open('GET',url);
        xhr.send();
    });
}
ajax('/echo/json')
    .then(function(result){...})
    .then(function(){...})
    .catch(function(){...});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function ajax(url){
    <span class="hljs-keyword">return</span> new <span class="hljs-type">Promise</span>(function(resolve,reject){
        <span class="hljs-keyword">var</span> xhr=new <span class="hljs-type">XMLHttpRequest</span>();
        xhr.onload=function(){
            resolve(this.responseText);
        };
        xhr.onerror=reject;
        xhr.open('<span class="hljs-type">GET</span>',url);
        xhr.send();
    });
}
ajax('/echo/json')
    .then(function(<span class="hljs-literal">result</span>)<span class="hljs-meta">{...}</span>)
    .then(function()<span class="hljs-meta">{...}</span>)
    .catch(function()<span class="hljs-meta">{...}</span>);</code></pre>
<p>ES6给我们提供了一个原生的构造函数Promise，Promise代表了一个异步操作，可以将异步对象和回调函数脱离开来，通过.then方法在这个异步操作上绑定回调函数，Promise可以让我们通过链式调用的方法去解决回调嵌套的问题，而且由于promise.all这样的方法存在，可以让同时执行多个操作变得简单。</p>
<p><strong>promise对象存在三种状态：</strong><br>1)Fulfilled:成功状态<br>2)Rejected：失败状态<br>3)Pending：既不是成功也不是失败状态，可以理解为进行中状态</p>
<p><strong>promise对象的两个重要方法：resolve/reject</strong><br>1）resolve方法可以使Promise对象的状态改变为成功，同时传递一个参数用于后续成功后的操作。<br>2）reject方法可以将Promise对象的状态改变为失败，同时将错误信息传递到后续错误处理的操作。</p>
<p>.then可以使用链式调用，原因在于：每一次执行该方法时总会返回一个Promise对象。<br>另外，在then的函数当中的返回值，可以作为后续操作的参数（例如：.then(return a).then(console.log(a+b))）<br><span class="img-wrap"><img data-src="/img/bV3hSC?w=480&amp;h=386" src="https://static.alili.tech/img/bV3hSC?w=480&amp;h=386" alt="537f5932gy1fewdufq1twj20dc0aqglz.jpg" title="537f5932gy1fewdufq1twj20dc0aqglz.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>那么问题来了，如果上面代码异步操作抛出错误，会怎么样？会调用catch方法指定的回调函数，处理这个错误，而且then方法指定的回调函数，如果运行中抛出错误，也会被catch捕获。Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止，也就是说，错误总是会被下一个catch语句捕获。</p>
<p><strong>理解Promise用法的关键点：</strong><br>1.then方法是Promise实例的方法，即Promise.prototype上的，它的作用是为Promise实例添加状态改变时的回调函数，这个方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。<br>2.链式中的第二个then开始，它们的resolve中的参数，是前一个then中resolve的return语句的返回值。<br>3.关于执行顺序：Promise在实例化的时候就会执行，也就是如果Promise的实例化语句中函数console.log输出语句，它会比then中的先执行。Promise.all中传入的Promise对象的数组（假设为p1、p2），即使p2的运行速度比p1快，Promise.all方法仍然会按照数组中的顺序将结果返回。<br>理解了上面这些方便写原生的Promise，利用观察者模式。后面补充。</p>
<p>Promise的缺点：<br>1.当处于未完成状态时，无法确定目前处于哪一阶段。<br>2.如果不设置回调函数，Promise内部的错误不会反映到外部。<br>3.无法取消Promise，一旦新建它就会立即执行，无法中途取消。</p>
<p><strong>3.async/await:</strong></p>
<p>很多人说async/await是异步编程的终极解决方案、<br>JavaScript 的 async/await 实现，离不开 Promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var superagent=require('superagent')
function delay(){
    return new Promise(function(resolve,reject){
        setTimeout({
            resolve(42);
        },3000);
    })
}
async function getAllBooks(){
    var bookIDs=await superagent.get('/user/books');
    await delay(1000);
    return await superagent.get('/books/ids='JSON.stringify(bookIDs))；
}
getAllBooks()
    .then(function(){});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> superagent=<span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delay</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        setTimeout({
            resolve(<span class="hljs-number">42</span>);
        },<span class="hljs-number">3000</span>);
    })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAllBooks</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> bookIDs=<span class="hljs-keyword">await</span> superagent.get(<span class="hljs-string">'/user/books'</span>);
    <span class="hljs-keyword">await</span> delay(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> superagent.get(<span class="hljs-string">'/books/ids='</span><span class="hljs-built_in">JSON</span>.stringify(bookIDs))；
}
getAllBooks()
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});</code></pre>
<p>上面的 delay() 没有申明为 async。实际上，delay() 本身就是返回的 Promise 对象，加不加 async 结果都一样。</p>
<p><strong>只要在函数名之前加上async关键字，就表明这个函数内部有异步操作。这个异步操作返回一个Promise对象，前面用await关键字注明。函数执行的时候，一旦遇到await，就会先执行await后面的表达式中的内容（异步），不再执行函数体后面的语句。等到异步操作执行完毕后，再自动返回到函数体内，继续执行函数体后面的语句。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3ikh?w=480&amp;h=386" src="https://static.alili.tech/img/bV3ikh?w=480&amp;h=386" alt="537f5932gy1fewduf8jlhj20dc0aq74s.jpg" title="537f5932gy1fewduf8jlhj20dc0aq74s.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>下面这段来自：<a href="https://segmentfault.com/a/1190000011813934">https://segmentfault.com/a/11...</a></p>
<p><strong>async：定义异步函数</strong><br>1）自动把函数转换为Promise<br>2）当调用异步函数时，函数返回值会被resolve处理<br>3）异步函数内部可以使用await</p>
<p><strong>await:暂停异步函数的执行</strong><br>1）当使用在Promise前面时，await等待Promise完成，并返回Promise的结果<br>2）await只能和Promise一起使用，不能和callback一起使用<br>3）await只能用在async函数中</p>
<p>async/await并不会取代promise，因为async/await底层依然使用promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getABC(){
    let A = await getValueA(); // getValueA 花费 2 秒
    let B = await getValueB(); // getValueA 花费 4 秒
    let C = await getValueC(); // getValueA 花费 3 秒
    return A*B*C
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getABC</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> A = <span class="hljs-keyword">await</span> getValueA(); <span class="hljs-comment">// getValueA 花费 2 秒</span>
    <span class="hljs-keyword">let</span> B = <span class="hljs-keyword">await</span> getValueB(); <span class="hljs-comment">// getValueA 花费 4 秒</span>
    <span class="hljs-keyword">let</span> C = <span class="hljs-keyword">await</span> getValueC(); <span class="hljs-comment">// getValueA 花费 3 秒</span>
    <span class="hljs-keyword">return</span> A*B*C
}</code></pre>
<p>每次遇到&nbsp;await&nbsp;关键字时，Promise 都会停下在，一直到运行结束，所以总共花费是 2+4+3 = 9 秒。await&nbsp;把异步变成了同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getABC() {
    // Promise.all() 允许同时执行所有的异步函数
    let results = await Promise.all([ getValueA, getValueB, getValueC ]); 
    return results.reduce((total,value) => total * value);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getABC</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Promise.all() 允许同时执行所有的异步函数</span>
    <span class="hljs-keyword">let</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([ getValueA, getValueB, getValueC ]); 
    <span class="hljs-keyword">return</span> results.reduce(<span class="hljs-function">(<span class="hljs-params">total,value</span>) =&gt;</span> total * value);
}
</code></pre>
<p>函数总耗时为 4 秒（getValueB&nbsp;的耗时）。</p>
<p>Async 的价值在于用写同步的方式写异步，1避免了阻塞，2必免写回调</p>
<hr>
<p><strong>async/await详细了解，推荐：<a href="https://segmentfault.com/a/1190000007535316" target="_blank">https://segmentfault.com/a/11...</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 异步(callback→Promise→async/await)

## 原文链接
[https://segmentfault.com/a/1190000013141641](https://segmentfault.com/a/1190000013141641)

