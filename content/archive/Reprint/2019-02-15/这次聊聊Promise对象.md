---
title: '这次聊聊Promise对象' 
date: 2019-02-15 2:30:44
hidden: true
slug: bckojmhvd5c
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>欢迎大家前往<a href="https://cloud.tencent.com/developer/?fromSource=waitui" rel="nofollow noreferrer" target="_blank">腾讯云+社区</a>，获取更多腾讯海量技术实践干货哦~</strong></p>
<blockquote>本文由<a href="https://cloud.tencent.com/developer/user/2221081" rel="nofollow noreferrer" target="_blank">前端林子</a>发表于<a href="https://cloud.tencent.com/developer/column/5154?fromSource=waitui" rel="nofollow noreferrer" target="_blank">云+社区专栏</a>
</blockquote>
<p>Promise是CommonJS提出的一种规范，在ES6中已经原生支持Promise对象，非ES6环境可以用Bluebird等库来支持。</p>
<h1 id="articleHeader0">0.引入</h1>
<p>在js中任务的执行模型有两种：同步模式和异步模式。</p>
<p><strong>同步模式</strong>：后一个任务B等待前一个任务A结束后，再执行。任务的执行顺序和任务的排序顺序是一致的。</p>
<p><strong>异步模式</strong>：每一个任务有一个或多个回调函数，前一个任务A结束后，不是执行后一个任务B，而是执行任务A的回调函数。而后一个任务B是不等任务A结束就执行。任务的执行顺序，与任务的排序顺序不一致。</p>
<p>异步模式编程有四种方法：回调函数（最基本的方法，把B写成A的回调函数）、事件监听（为A绑定事件，当A发生某个事件，就执行B）、发布/订阅，以及本文要介绍的Promise对象。</p>
<p>Promise是<strong>一个用于处理异步操作的对象</strong>，可以将回调函数写成链式调用的写法，让代码更优雅、流程更加清晰，让我们可以更合理、更规范地进行异步处理操作。它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。</p>
<h1 id="articleHeader1">1.Promise的基本知识</h1>
<h2 id="articleHeader2">1.1 三种状态</h2>
<p>Pending：进行中，刚创建一个Promise实例时，表示初始状态；</p>
<p>resolved(fulfilled)：resolve方法调用的时候，表示操作成功，已经完成；</p>
<p>Rejected：reject方法调用的时候，表示操作失败；</p>
<h2 id="articleHeader3">1.2 两个过程</h2>
<p>这三种状态只能从pendeng--&gt;resolved(fulfilled)，或者pending--&gt;rejected，不能逆向转换，也不能在resolved(fulfilled)和rejected之间转换。并且一旦状态改变，就不会再改变，会一直保持这个结果。</p>
<p>汇总上述，创建一个Promise的实例是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建promise的实例
let promise = new Promise((resolve,reject)=>{
    //刚创建实例时的状态：pending

    if('异步操作成功'){
        //调用resolve方法，状态从pending变为fulfilled
        resolve();
    }else{
        //调用reject方法，状态从pending变为rejected
        reject();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//创建promise的实例</span>
<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    <span class="hljs-comment">//刚创建实例时的状态：pending</span>

    <span class="hljs-keyword">if</span>(<span class="hljs-string">'异步操作成功'</span>){
        <span class="hljs-comment">//调用resolve方法，状态从pending变为fulfilled</span>
        resolve();
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//调用reject方法，状态从pending变为rejected</span>
        reject();
    }
});</code></pre>
<h2 id="articleHeader4">1.3 then()</h2>
<p>用于绑定处理操作后的处理程序，分别指定fulfilled状态和rejected状态的回调函数，即它的参数是两个函数，第一个用于处理操作成功后的业务，第二个用于处理操作失败后的业务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//then()
promise.then((res)=> {
    //处理操作成功后的业务（即Promise对象的状态变为fullfilled时调用）
},(error)=> {
    //处理操作失败后的业务（即Promise对象的状态变为rejected时调用）
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//then()</span>
promise.then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span> {
    <span class="hljs-comment">//处理操作成功后的业务（即Promise对象的状态变为fullfilled时调用）</span>
},(error)=&gt; {
    <span class="hljs-comment">//处理操作失败后的业务（即Promise对象的状态变为rejected时调用）</span>
});</code></pre>
<h2 id="articleHeader5">1.4 catch()</h2>
<p>用于处理操作异常的程序，catch()只接受一个参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//catch()
promise.catch((error)=> {
    //处理操作失败后的业务
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//catch()</span>
promise.catch(<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span> {
    <span class="hljs-comment">//处理操作失败后的业务</span>
});</code></pre>
<p>一般来说，建议不要在then()里面定义rejected状态的回调函数，而是将then()用于处理操作成功，将catch()用于处理操作异常。因为这样做可以捕获then()执行中的错误，也更接近同步中try/catch的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//try-catch
// bad
promise.then((res)=> {
    //处理操作成功后的业务
  }, (error)=> {
    //处理操作失败后的业务
  });

// good
promise
  .then((res)=> { 
    //处理操作成功后的业务
  })
  .catch((error)=> {
    //处理操作失败后的业务
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//try-catch</span>
<span class="hljs-comment">// bad</span>
promise.then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span> {
    <span class="hljs-comment">//处理操作成功后的业务</span>
  }, (error)=&gt; {
    <span class="hljs-comment">//处理操作失败后的业务</span>
  });

<span class="hljs-comment">// good</span>
promise
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span> { 
    <span class="hljs-comment">//处理操作成功后的业务</span>
  })
  .catch(<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span> {
    <span class="hljs-comment">//处理操作失败后的业务</span>
  });</code></pre>
<h2 id="articleHeader6">1.5 all()</h2>
<p>接受一个数组作为参数，数组的元素是Promise实例对象。只有当参数中的实例对象的状态都为fulfilled时，Promise.all( )才会有返回。</p>
<p>实例代码（可直接在浏览器中打开）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Promise实例</title>
    <style type=&quot;text/css&quot;></style>
    <script type=&quot;text/javascript&quot;>
        window.onload = () => {
            //创建实例promise1
            let promise1 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve('promise1操作成功');
                    console.log('1')
                }, 3000);
            });

            //创建实例promise1
            let promise2 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve('promise1操作成功');
                    console.log('2')
                }, 1000);
            });


            Promise.all([promise1, promise2]).then((result) => {
                console.log(result);
            });
        }
    </script>
</head>

<body>
    <div></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Promise实例<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//创建实例promise1</span>
            <span class="hljs-keyword">let</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'promise1操作成功'</span>);
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>)
                }, <span class="hljs-number">3000</span>);
            });

            <span class="hljs-comment">//创建实例promise1</span>
            <span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'promise1操作成功'</span>);
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>)
                }, <span class="hljs-number">1000</span>);
            });


            <span class="hljs-built_in">Promise</span>.all([promise1, promise2]).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(result);
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>结果（注意看时间）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016938447?w=1196&amp;h=241" src="https://static.alili.tech/img/remote/1460000016938447?w=1196&amp;h=241" alt="img" title="img" style="cursor: pointer;"></span>Promise.all()</p>
<p>代码说明：</p>
<p>1s后，promise2进入fulfilled状态，间隔2s，也就是3s后，promise1也进入fulfilled状态。这时，由于两个实例都进入了fulfilled状态，所以Promise.all()才进入了then方法。</p>
<blockquote>使用场景：执行某个操作需要依赖多个接口请求回的数据，且这些接口之间不存在互相依赖的关系。这时使用Promise.all()，等到所有接口都请求成功了，它才会进行操作。</blockquote>
<h2 id="articleHeader7">1.6 race()</h2>
<p>和all()的参数一样，参数中的promise实例，只要有一个状态发生变化（不管是成功fulfilled还是异常rejected），它就会有返回，其他实例中再发生变化，它也不管了。</p>
<p>实例代码（可直接在浏览器中打开）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Promise实例</title>
    <style type=&quot;text/css&quot;></style>
    <script type=&quot;text/javascript&quot;>
        window.onload = () => {
            //创建实例promise1
            let promise1 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve('promise1操作成功');
                    console.log('1')
                }, 3000);
            });

            //创建实例promise1
            let promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('promise1操作失败');
                    console.log('2')
                }, 1000);
            });


            Promise.race([promise1, promise2])
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    </script>
</head>

<body>
    <div></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Promise实例<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//创建实例promise1</span>
            <span class="hljs-keyword">let</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'promise1操作成功'</span>);
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>)
                }, <span class="hljs-number">3000</span>);
            });

            <span class="hljs-comment">//创建实例promise1</span>
            <span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    reject(<span class="hljs-string">'promise1操作失败'</span>);
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>)
                }, <span class="hljs-number">1000</span>);
            });


            <span class="hljs-built_in">Promise</span>.race([promise1, promise2])
                .then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(result);
                })
                .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(error);
                })
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>结果（注意看时间）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016938448" src="https://static.alili.tech/img/remote/1460000016938448" alt="img" title="img" style="cursor: pointer;"></span>Promise.race()</p>
<p>代码说明：</p>
<p>1s后，promise2进入rejected状态，由于一个实例的状态发生了变化，所以Promise.race()就立刻执行了。</p>
<h1 id="articleHeader8">2 实例</h1>
<p>平时开发中可能经常会遇到的问题是，要用ajax进行多次请求。例如现在有三个请求，请求A、请求B、请求C。请求C要将请求B的请求回来的数据做为参数，请求B要将请求A的请求回来的数据做为参数。</p>
<p>按照这个思路，我们可能会直接写出这样的层层嵌套的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//------请求A 开始---------
    $.ajax({
        success:function(res1){


            //------请求B 开始----
            $.ajax({
                success:function(res2){


                    //----请求C 开始---
                    $.ajax({
                        success:function(res3){
                        }
                    });
                    //---请求C 结束---


                }    
            });
            //------请求B 结束-----


        }
    });
    //------请求A 结束---------" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//------请求A 开始---------</span>
    $.ajax({
        <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res1</span>)</span>{


            <span class="hljs-comment">//------请求B 开始----</span>
            $.ajax({
                <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res2</span>)</span>{


                    <span class="hljs-comment">//----请求C 开始---</span>
                    $.ajax({
                        <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res3</span>)</span>{
                        }
                    });
                    <span class="hljs-comment">//---请求C 结束---</span>


                }    
            });
            <span class="hljs-comment">//------请求B 结束-----</span>


        }
    });
    <span class="hljs-comment">//------请求A 结束---------</span></code></pre>
<p>在请求A的success后，请求B发送请求，在请求B 的success后，请求C发送请求。请求C结束后，再向上到请求B结束，请求B结束后，再向上到请求A结束。</p>
<p>这样虽然可以完成任务，但是代码层层嵌套，代码可读性差，也不便于调试和后续的代码维护。而如果用Promise，你可以这样写（示意代码，无ajax请求）：</p>
<p>此处附上完整可执行代码，可在浏览器的控制台中查看执行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Promise实例</title>
    <style type=&quot;text/css&quot;></style>
    <script type=&quot;text/javascript&quot;>
        window.onload = () => {
            let promise = new Promise((resolve, reject) => {

                if (true) {
                    //调用操作成功方法
                    resolve('操作成功');
                } else {
                    //调用操作异常方法
                    reject('操作异常');
                }
            });

            //then处理操作成功，catch处理操作异常
            promise.then(requestA)
                .then(requestB)
                .then(requestC)
                .catch(requestError);

            function requestA() {
                console.log('请求A成功');
                return '下一个是请求B';
            }
            function requestB(res) {
                console.log('上一步的结果：' + res);
                console.log('请求B成功');
                return '下一个是请求C';
            }
            function requestC(res) {
                console.log('上一步的结果：' + res);
                console.log('请求C成功');
            }
            function requestError() {
                console.log('请求失败');
            }
        }
    </script>
</head>

<body>
    <div></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Promise实例<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {

                <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
                    <span class="hljs-comment">//调用操作成功方法</span>
                    resolve(<span class="hljs-string">'操作成功'</span>);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">//调用操作异常方法</span>
                    reject(<span class="hljs-string">'操作异常'</span>);
                }
            });

            <span class="hljs-comment">//then处理操作成功，catch处理操作异常</span>
            promise.then(requestA)
                .then(requestB)
                .then(requestC)
                .catch(requestError);

            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestA</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求A成功'</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-string">'下一个是请求B'</span>;
            }
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestB</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'上一步的结果：'</span> + res);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求B成功'</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-string">'下一个是请求C'</span>;
            }
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestC</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'上一步的结果：'</span> + res);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求C成功'</span>);
            }
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestError</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求失败'</span>);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016938449" src="https://static.alili.tech/img/remote/1460000016938449" alt="img" title="img" style="cursor: pointer; display: inline;"></span>实例</p>
<p>可以看出请求C依赖请求B的结果，请求B依赖请求A的结果，在请求A中是使用了return将需要的数据返回，传递给下一个then()中的请求B，实现了参数的传递。同理，请求B中也是用了return，将参数传递给了请求C。</p>
<h1 id="articleHeader9">3.小结</h1>
<p>本文主要介绍了Promise对象的三个状态和两个过程。“三个状态”是：初始化、操作成功、操作异常，“两个过程”是初始化状态到操作成功状态，和初始化状态到操作异常状态。除此之前，还有两种实例方法：then()、catch()来绑定处理程序。类方法：Promise.all()、Promise.race()。如有问题，欢迎指正。</p>
<blockquote>
<strong>相关阅读</strong><br><a href="https://cloud.tencent.com/developer/edu/course-1128?fromSource=waitui" rel="nofollow noreferrer" target="_blank">【每日课程推荐】机器学习实战！快速入门在线广告业务及CTR相应知识</a>
</blockquote>
<p><strong>此文已由作者授权腾讯云+社区发布，更多原文请<a href="https://cloud.tencent.com/developer/article/1359152?fromSource=waitui" rel="nofollow noreferrer" target="_blank">点击</a></strong></p>
<p><strong>搜索关注公众号「云加社区」，第一时间获取技术干货，关注后回复1024 送你一份技术课程大礼包！</strong></p>
<p>海量技术实践经验，尽在<a href="https://cloud.tencent.com/developer?fromSource=waitui" rel="nofollow noreferrer" target="_blank">云加社区</a>！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
这次聊聊Promise对象

## 原文链接
[https://segmentfault.com/a/1190000016938444](https://segmentfault.com/a/1190000016938444)

