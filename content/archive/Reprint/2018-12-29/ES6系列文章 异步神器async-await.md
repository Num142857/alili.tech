---
title: 'ES6系列文章 异步神器async-await' 
date: 2018-12-29 2:30:10
hidden: true
slug: p5gujknqrh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://segmentfault.com/l/1500000012462730?utm_source=banner">视频讲解</a></blockquote>
<p>关于异步处理，ES5的回调使我们陷入地狱，ES6的Promise使我们脱离魔障，终于、ES7的async-await带我们走向光明。今天就来学习一下 async-await。</p>
<h2 id="articleHeader0">async-await和Promise的关系</h2>
<p>经常会看到<code>有了 async-await、promise 还有必要学习吗</code>、<code>async await优于promise的几个特点</code>，接收了这些信息后，就蒙圈了。现在才知道，<code>async-await</code>是<code>promise</code>和<code>generator</code>的语法糖。只是为了让我们书写代码时更加流畅，当然也增强了代码的可读性。简单来说：async-await 是建立在 promise机制之上的，并不能取代其地位。</p>
<h2 id="articleHeader1">基本语法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function basicDemo() {
    let result = await Math.random();
    console.log(result);
}

basicDemo();
// 0.6484863241051226
//Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">basicDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Math</span>.random();
    <span class="hljs-built_in">console</span>.log(result);
}

basicDemo();
<span class="hljs-comment">// 0.6484863241051226</span>
<span class="hljs-comment">//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}</span></code></pre>
<p>上述代码就是async-await的基本使用形式。有两个陌生的关键字<code>async</code>、<code>await</code>，同时函数执行结果似乎返回了一个promise对象。</p>
<h2 id="articleHeader2">async</h2>
<p>async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function demo01() {
    return 123;
}

demo01().then(val => {
    console.log(val);// 123
});
若 async 定义的函数有返回值，return 123;相当于Promise.resolve(123),没有声明式的 return则相当于执行了Promise.resolve();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo01</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>;
}

demo01().then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val);<span class="hljs-comment">// 123</span>
});
若 <span class="hljs-keyword">async</span> 定义的函数有返回值，<span class="hljs-keyword">return</span> <span class="hljs-number">123</span>;相当于<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>),没有声明式的 <span class="hljs-keyword">return</span>则相当于执行了<span class="hljs-built_in">Promise</span>.resolve();</code></pre>
<h2 id="articleHeader3">await</h2>
<p>await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function notAsyncFunc() {
    await Math.random();
}
notAsyncFunc();//Uncaught SyntaxError: Unexpected identifier" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notAsyncFunc</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> <span class="hljs-built_in">Math</span>.random();
}
notAsyncFunc();<span class="hljs-comment">//Uncaught SyntaxError: Unexpected identifier</span></code></pre>
<p>await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，<strong>但是它最主要的意图是用来等待 Promise 对象的状态被 resolved</strong>。如果await的是 promise对象会<strong>造成异步函数<code>停止</code>执行并且<code>等待</code> promise 的解决</strong>,如果等的是正常的表达式则立即执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(' enough sleep~');
        }, second);
    })
}
function normalFunc() {
    console.log('normalFunc');
}
async function awaitDemo() {
    await normalFunc();
    console.log('something, ~~');
    let result = await sleep(2000);
    console.log(result);// 两秒之后会被打印出来
}
awaitDemo();
// normalFunc
// VM4036:13 something, ~~
// VM4036:15  enough sleep~" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">second</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(<span class="hljs-string">' enough sleep~'</span>);
        }, second);
    })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalFunc</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'normalFunc'</span>);
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">awaitDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> normalFunc();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'something, ~~'</span>);
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">2000</span>);
    <span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">// 两秒之后会被打印出来</span>
}
awaitDemo();
<span class="hljs-comment">// normalFunc</span>
<span class="hljs-comment">// VM4036:13 something, ~~</span>
<span class="hljs-comment">// VM4036:15  enough sleep~</span></code></pre>
<p>希望通过上面的 demo，大家可以理解我上面的话。</p>
<h2 id="articleHeader4">实例</h2>
<p>举例说明啊，你有三个请求需要发生，第三个请求是依赖于第二个请求的解构第二个请求依赖于第一个请求的结果。若用 ES5实现会有3层的回调，若用Promise 实现至少需要3个then。一个是代码横向发展，另一个是纵向发展。今天指给出 async-await 的实现哈~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//我们仍然使用 setTimeout 来模拟异步请求
function sleep(second, param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(param);
        }, second);
    })
}

async function test() {
    let result1 = await sleep(2000, 'req01');
    let result2 = await sleep(1000, 'req02' + result1);
    let result3 = await sleep(500, 'req03' + result2);
    console.log(`
        ${result3}
        ${result2}
        ${result1}
    `);
}

test();
//req03req02req01
//req02req01
//req01" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//我们仍然使用 setTimeout 来模拟异步请求</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">second, param</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(param);
        }, second);
    })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result1 = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">2000</span>, <span class="hljs-string">'req01'</span>);
    <span class="hljs-keyword">let</span> result2 = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>, <span class="hljs-string">'req02'</span> + result1);
    <span class="hljs-keyword">let</span> result3 = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">500</span>, <span class="hljs-string">'req03'</span> + result2);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`
        <span class="hljs-subst">${result3}</span>
        <span class="hljs-subst">${result2}</span>
        <span class="hljs-subst">${result1}</span>
    `</span>);
}

test();
<span class="hljs-comment">//req03req02req01</span>
<span class="hljs-comment">//req02req01</span>
<span class="hljs-comment">//req01</span></code></pre>
<h2 id="articleHeader5">错误处理</h2>
<p>上述的代码好像给的都是resolve的情况，那么reject的时候我们该如何处理呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('want to sleep~');
        }, second);
    })
}

async function errorDemo() {
    let result = await sleep(1000);
    console.log(result);
}
errorDemo();// VM706:11 Uncaught (in promise) want to sleep~

// 为了处理Promise.reject 的情况我们应该将代码块用 try catch 包裹一下
async function errorDemoSuper() {
    try {
        let result = await sleep(1000);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

errorDemoSuper();// want to sleep~
// 有了 try catch 之后我们就能够拿到 Promise.reject 回来的数据了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">second</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            reject(<span class="hljs-string">'want to sleep~'</span>);
        }, second);
    })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">errorDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-built_in">console</span>.log(result);
}
errorDemo();<span class="hljs-comment">// VM706:11 Uncaught (in promise) want to sleep~</span>

<span class="hljs-comment">// 为了处理Promise.reject 的情况我们应该将代码块用 try catch 包裹一下</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">errorDemoSuper</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>);
        <span class="hljs-built_in">console</span>.log(result);
    } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-built_in">console</span>.log(err);
    }
}

errorDemoSuper();<span class="hljs-comment">// want to sleep~</span>
<span class="hljs-comment">// 有了 try catch 之后我们就能够拿到 Promise.reject 回来的数据了。</span></code></pre>
<h2 id="articleHeader6">小心你的并行处理!!!</h2>
<p>我这里为啥加了三个感叹号呢~，因为对于初学者来说一不小心就将 ajax 的并发请求发成了阻塞式同步的操作了，我就真真切切的在工作中写了这样的代码。<code>await 若等待的是 promise 就会停止下来</code>。业务是这样的，我有三个异步请求需要发送，相互没有关联，只是需要当请求都结束后将界面的 loading 清除掉即可。<br>刚学完 async await 开心啊，到处乱用~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request done! ' + Math.random());
        }, second);
    })
}

async function bugDemo() {
    await sleep(1000);
    await sleep(1000);
    await sleep(1000);
    console.log('clear the loading~');
}

bugDemo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">second</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(<span class="hljs-string">'request done! '</span> + <span class="hljs-built_in">Math</span>.random());
        }, second);
    })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bugDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clear the loading~'</span>);
}

bugDemo();</code></pre>
<p>loading 确实是等待请求都结束完才清除的。但是你认真的观察下浏览器的 timeline 请求是一个结束后再发另一个的（若观察效果请发真实的 ajax 请求）<br>那么，正常的处理是怎样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function correctDemo() {
    let p1 = sleep(1000);
    let p2 = sleep(1000);
    let p3 = sleep(1000);
    await Promise.all([p1, p2, p3]);
    console.log('clear the loading~');
}
correctDemo();// clear the loading~" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">correctDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> p1 = sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">let</span> p2 = sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">let</span> p3 = sleep(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([p1, p2, p3]);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clear the loading~'</span>);
}
correctDemo();<span class="hljs-comment">// clear the loading~</span></code></pre>
<p>恩， 完美。看吧~ async-await并不能取代promise.</p>
<h2 id="articleHeader7">await in for 循环</h2>
<p>最后一点了，await必须在async函数的上下文中的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常 for 循环
async function forDemo() {
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i ++) {
        await arr[i];
    }
}
forDemo();//正常输出
// 因为想要炫技把 for循环写成下面这样
async function forBugDemo() {
    let arr = [1, 2, 3, 4, 5];
    arr.forEach(item => {
        await item;
    });
}
forBugDemo();// Uncaught SyntaxError: Unexpected identifier" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 正常 for 循环</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i ++) {
        <span class="hljs-keyword">await</span> arr[i];
    }
}
forDemo();<span class="hljs-comment">//正常输出</span>
<span class="hljs-comment">// 因为想要炫技把 for循环写成下面这样</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forBugDemo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
    arr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">await</span> item;
    });
}
forBugDemo();<span class="hljs-comment">// Uncaught SyntaxError: Unexpected identifier</span></code></pre>
<h2 id="articleHeader8">refs</h2>
<p>不知道，我的意思有没有传递给大家。下面推荐几篇优秀的文章。<br><a href="http://www.ruanyifeng.com/blog/2015/05/async.html" rel="nofollow noreferrer" target="_blank">async 函数的含义和用法</a><br><a href="https://medium.com/@peterchang_82818/javascript-es7-async-await-%E6%95%99%E5%AD%B8-703473854f29-tutorial-example-703473854f29" rel="nofollow noreferrer" target="_blank">ES7 Async Await 聖經</a><br><a href="https://ponyfoo.com/articles/understanding-javascript-async-await" rel="nofollow noreferrer" target="_blank">Understanding JavaScript’s async await</a></p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6系列文章 异步神器async-await

## 原文链接
[https://segmentfault.com/a/1190000011526612](https://segmentfault.com/a/1190000011526612)

