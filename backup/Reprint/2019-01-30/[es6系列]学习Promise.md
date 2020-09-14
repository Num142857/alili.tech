---
title: '[es6系列]学习Promise' 
date: 2019-01-30 2:30:23
hidden: true
slug: ity45of6s7n
categories: [reprint]
---

{{< raw >}}

                    
<p>本文是基于对<a>阮一峰的Promise文章</a>的学习整理笔记，整理了文章的顺序、增加了更多的例子，使其更好理解。</p>
<h2 id="articleHeader0">1. 概述</h2>
<p>在Promise之前，在js中的异步编程都是采用回调函数和事件的方式，但是这种编程方式在处理复杂业务的情况下，很容易出现<code>callback hell(回调地狱)</code>，使得代码很难被理解和维护。</p>
<p>Promise就是改善这种情形的异步编程的解决方案，它由社区最早提出和实现，es6将其写进了语言标准，统一了用法，并且提供了一个原生的对象<code>Promise</code>。</p>
<h2 id="articleHeader1">2. 理解Promise</h2>
<p>我们通过一个简单例子先来感受一下Promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function (resolve, reject) {
    // ...
    if(/* 异步操作成功 */){
        resolve(ret);
    } else {
        reject(error);
    }
});

p.then(function (value) {
    // 完成态
}, function (error) {
    // 失败态
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-comment">/* 异步操作成功 */</span>){
        resolve(ret);
    } <span class="hljs-keyword">else</span> {
        reject(error);
    }
});

p.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">// 完成态</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 失败态</span>
});</code></pre>
<p>我们需要关注的是</p>
<ul>
<li><p>Promise的构造函数</p></li>
<li><p>resolve() ， reject()</p></li>
<li><p>then()</p></li>
</ul>
<h3 id="articleHeader2">2.1 Promise构造函数</h3>
<p>我们在通过Promise构造函数实例化一个对象时，会传递一个函数作为参数，那么这个函数有什么特点？</p>
<p>答案就是在新建一个Promise后，这个函数会立即执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise(function (reslove, reject) {
    console.log('Promise');
});

console.log('end');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reslove, reject</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Promise'</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);</code></pre>
<p>执行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpnR?w=475&amp;h=94" src="https://static.alili.tech/img/bVGpnR?w=475&amp;h=94" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到是先输出了<code>Promise</code>，再输出了<code>end</code>。</p>
<h3 id="articleHeader3">2.2 resolve/reject</h3>
<p>在Promise中，对一个异步操作做出了抽象的定义，Promise操作只会处在3种状态的一种，他们之间的转化如图所示</p>
<p><span class="img-wrap"><img data-src="/img/bVGpnS?w=457&amp;h=327" src="https://static.alili.tech/img/bVGpnS?w=457&amp;h=327" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>注意，这种状态的改变只会出现从未完成态向完成态或失败态转化，不能逆反。完成态和失败态不能互相转化，而且，状态一旦转化，将不能更改。</p>
<p>只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思是承诺，表示其他手段无法改变。</p>
<p>在声明一个Promise对象实例时，我们传入的匿名函数参数中：</p>
<ul>
<li><p><code>resolve</code>就对应着完成态之后的操作</p></li>
<li><p><code>reject</code>对应着失败态之后的操作</p></li>
</ul>
<h3 id="articleHeader4">2.3 then()</h3>
<p>那么问题来了，then()方法有什么作用？resolve和reject又是从哪里传递过来的？</p>
<p>其实这两个问题是一个问题，在实例化一个Promise对象之后，我们调用该对象实例的<code>then()</code>方法传递的两个参数中:</p>
<ul>
<li><p>第一个参数（函数）对应着完成态的操作，也就是<code>resolve</code></p></li>
<li><p>第二个参数（函数）对应着失败态的操作，也就是<code>reject</code></p></li>
</ul>
<p>那就是说，在Promise中是通过then()方法来指定处理异步操作结果的方法。</p>
<h3 id="articleHeader5">2.4 实际案例</h3>
<p>到这里我们明白了Promise的语法，也了解了Promise中函数是如何执行的，结合一个实际的案例，来加深对Promise的理解。</p>
<p>我们来实现一个异步加载图片的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadImageAsync(url) {
    return new Promise(function (reslove, reject) {
        var img = new Image();
        img.onload = function () {
            reslove();
        }
        img.onerror = function () {
            reject();
        }
        console.log(&quot;loading image&quot;);
        img.src = url;
    });
}
var loadImage1 = loadImageAsync(&quot;https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png&quot;);
loadImage1.then(function success() {
    console.log(&quot;success&quot;);
}, function fail() {
    console.log(&quot;fail&quot;);
});

var loadImage2 = loadImageAsync(&quot;1.png&quot;);
loadImage2.then(function success() {
    console.log(&quot;success&quot;);
}, function fail() {
    console.log(&quot;fail&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImageAsync</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reslove, reject</span>) </span>{
        <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reslove();
        }
        img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reject();
        }
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"loading image"</span>);
        img.src = url;
    });
}
<span class="hljs-keyword">var</span> loadImage1 = loadImageAsync(<span class="hljs-string">"https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"</span>);
loadImage1.then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"success"</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"fail"</span>);
});

<span class="hljs-keyword">var</span> loadImage2 = loadImageAsync(<span class="hljs-string">"1.png"</span>);
loadImage2.then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"success"</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"fail"</span>);
});</code></pre>
<p>我们在chrome中执行，先是传递一个有效的url，再传递一个无效的url，执行的效果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpnX?w=927&amp;h=530" src="https://static.alili.tech/img/bVGpnX?w=927&amp;h=530" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">3. Promise进阶</h2>
<h3 id="articleHeader7">3.1 resolve/reject的参数</h3>
<p><code>reject</code>函数的参数一般来说是Error对象的实例，而<code>resolve</code>函数的参数除了正常的值外，还可能是另一个<code>Promise实例</code>，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise( function(resolve, reject) {
    // ...
});

var p2 = new Promise( function(resolve, reject) {
    // ...
    resolve(p1);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// ...</span>
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// ...</span>
    resolve(p1);
});</code></pre>
<p>代码分析：p1和p2都是Promise的实例，p2中的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。</p>
<p>注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态，他们之间的关系是</p>
<p><span class="img-wrap"><img data-src="/img/bVGpn2?w=911&amp;h=569" src="https://static.alili.tech/img/bVGpn2?w=911&amp;h=569" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>举个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time('Promise example start')
var p1 = new Promise( (resolve, reject) => {
    setTimeout(() => resolve('hi'), 3000);
});

var p2 = new Promise( (resolve, reject) => {
    setTimeout(() => resolve(p1), 10);
});

p2.then( ret => {
    console.log(ret);
    console.timeEnd('Promise example end')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.time(<span class="hljs-string">'Promise example start'</span>)
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'hi'</span>), <span class="hljs-number">3000</span>);
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(p1), <span class="hljs-number">10</span>);
});

p2.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'Promise example end'</span>)
});</code></pre>
<p>我们在node环境下运行以上代码，执行结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpoe?w=512&amp;h=115" src="https://static.alili.tech/img/bVGpoe?w=512&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从执行时间可以看到，p2会等待p1的执行结果，然后再执行，从输出hi可以看到p1完成状态转变之后，传递给resolve(或者reject)的结果会传递给p2中的<code>resolve</code>。</p>
<h3 id="articleHeader8">3.2 then()</h3>
<p>从上面的例子，我们可以了解到then()方法是Promise实例的方法，即<code>Promise.prototype</code>上的，它的作用是为Promise实例添加状态改变时的回调函数，这个方法的第一个参数是<code>resolved</code>状态的回调函数，第二个参数（可选）是<code>rejected</code>状态的回调函数。</p>
<p>那么then()方法的返回值是什么？<code>then</code>方法会返回一个新的Promise实例（注意，不是原来那个Promise，原来那个Promise已经承诺过，此时继续then就需要新的承诺~~），这样的设计的好处就是可以使用链式写法。</p>
<p>还有一个点，就是链式中的<code>then</code>方法（第二个开始），它们的<code>resolve</code>中的参数是什么？答案就是前一个then()中resolve的<code>return</code>语句的返回值。</p>
<p>来一个示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise( (resolve, reject) => {
    setTimeout(() => resolve('p1'), 10);
});

p1.then( ret => {
    console.log(ret);
    return 'then1';
}).then( ret => {
    console.log(ret);
    return 'then2';
}).then( ret => {
    console.log(ret);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'p1'</span>), <span class="hljs-number">10</span>);
});

p1.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then1'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then2'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
});</code></pre>
<p>在node环境下执行，执行结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpof?w=477&amp;h=107" src="https://static.alili.tech/img/bVGpof?w=477&amp;h=107" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">3.3 catch()错误处理</h3>
<p>catch()方法是Promise实例的方法，即<code>Promise.prototype</code>上的属性，它其实是<code>.then(null, rejection)</code>的简写，用于指定发生错误时的回调。</p>
<p>这个方法其实很简单，在这里并不想讨论它的使用，而是想讨论的是Promise中的错误的捕抓和处理。</p>
<h4>3.3.1 Error对象的传递性</h4>
<p>Promise对象的Error对象具有<code>冒泡</code>性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获，示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise( (resolve, reject) => {
    setTimeout(() => resolve('p1'), 10);
});

p.then( ret => {
    console.log(ret);
    throw new Error('then1');
    return 'then1';
}).then( ret => {
    console.log(ret);
    throw new Error('then2');
    return 'then2';
}).catch( err => {
    // 可以捕抓到前面的出现的错误。
    console.log(err.toString());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'p1'</span>), <span class="hljs-number">10</span>);
});

p.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'then1'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then1'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'then2'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then2'</span>;
}).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-comment">// 可以捕抓到前面的出现的错误。</span>
    <span class="hljs-built_in">console</span>.log(err.toString());
});</code></pre>
<p>执行结果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVGpoh?w=510&amp;h=128" src="https://static.alili.tech/img/bVGpoh?w=510&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在第一个then中抛出了一个错误，在最后一个Promise对象中可以catch到这个错误。</p>
<p><em>因为有这种方便的错误处理机制，所以一般来说不要在then方法里面定义reject状态的回调函数， 而是使用catch方法</em></p>
<h4>3.3.2 vs try/catch</h4>
<blockquote><p>跟传统的<code>try/catch</code>不同的是，如果没有使用<code>catch</code>方法指定错误处理回调函数，则Promise对象抛出的错误不会传递到外层代码（在chrome会报错）</p></blockquote>
<p>Node.js有一个unhandledRejection事件，专门监听未捕获的reject错误。以下代码就是在node环境下运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise((resolve, reject) => {
    resolve(x + 2);
});
p.then( () => {
    console.log('nothing');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(x + <span class="hljs-number">2</span>);
});
p.then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nothing'</span>);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGpom?w=935&amp;h=91" src="https://static.alili.tech/img/bVGpom?w=935&amp;h=91" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>3.3.3 catch()的返回值</h4>
<p>没错，既然catch()是<code>.then(null, rejection)</code>的别名，那么catch()就会返回一个Promise对象，因此在后面还可以接着调用<code>then</code>方法，示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise((resolve, reject) => {
    resolve(x + 2);
});
p.then( () => {
    console.log('nothing');
}).catch( err => {
    console.log(err.toString());
    return 'catch';
}).then( ret => {
    console.log(ret);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(x + <span class="hljs-number">2</span>);
});
p.then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nothing'</span>);
}).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err.toString());
    <span class="hljs-keyword">return</span> <span class="hljs-string">'catch'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGpor?w=629&amp;h=103" src="https://static.alili.tech/img/bVGpor?w=629&amp;h=103" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当出错时，catch会先处理之前的错误，然后通过return语句，将值继续传递给后一个then方法中。</p>
<p>如果没有报错，则跳过catch，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise((resolve, reject) => {
    resolve('p');
});
p.then( ret => {
    console.log(ret);
    return 'then1';
}).catch( err => {
    console.log(err.toString());
    return 'catch';
}).then( ret => {
    console.log(ret);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'p'</span>);
});
p.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then1'</span>;
}).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err.toString());
    <span class="hljs-keyword">return</span> <span class="hljs-string">'catch'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGpov?w=489&amp;h=115" src="https://static.alili.tech/img/bVGpov?w=489&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">4. Promise对象方法</h2>
<h3 id="articleHeader11">4.1 Promise.all()</h3>
<p>Promise.all()方法用于将多个Promise实例，包装成一个新的Promise实例，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.all([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.all([p1, p2, p3]);</code></pre>
<p>新的Promise实例<code>p</code>的状态由<code>p1, p2, p3</code>决定：</p>
<ul>
<li><p>当<code>p1, p2, p3</code>的状态都为<code>完成态</code>时，p为完成态。</p></li>
<li><p><code>p1, p2, p3</code>中任一一个状态为<code>失败态</code>，则p为失败态。</p></li>
</ul>
<h3 id="articleHeader12">4.2 Promise.race()</h3>
<p>Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.race([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.race([p1, p2, p3]);</code></pre>
<p>不同的是，只要<code>p1, p2, p3</code>中任意一个实例率先改变状态，则<code>p</code>的状态就跟着改变，而且状态由率先改变的实例决定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.race([
    new Promise(resolve => {
        setTimeout(() => resolve('p1'), 10000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('time out')), 10);
    })
]);
p.then( ret => console.log(ret))
    .catch( err => console.log(err.toString()));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.race([
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'p1'</span>), <span class="hljs-number">10000</span>);
    }),
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'time out'</span>)), <span class="hljs-number">10</span>);
    })
]);
p.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(ret))
    .catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.toString()));</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGpoB?w=568&amp;h=72" src="https://static.alili.tech/img/bVGpoB?w=568&amp;h=72" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">4.3  Promise.resolve()</h3>
<p>Promise.resolve()可以将现有的对象转为Promise对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.resolve('p');

// 相当于
var p = new Promise(resolve => resolve('p'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'p'</span>);

<span class="hljs-comment">// 相当于</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-string">'p'</span>));</code></pre>
<p>比较有意思的是Promise.resolve()会根据参数类型进行相应的处理，分几种情况讨论。</p>
<h4>4.3.1 Promise实例</h4>
<p>参数是一个Promise实例，那么Promise.resolve将不做任何处理，直接返回这个实例。</p>
<h4>4.3.2 thenable对象</h4>
<p>参数是一个<code>thenable</code>对象，也就是说对象是具有<code>then</code>方法的对象，但不是一个Promise实例（就跟类数组和数组的关系一样），例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let thenable = {
    then : function (resolve, reject) {
        resolve(42);
    }
};

let p = Promise.resolve(thenable);
p.then( ret => console.log(ret)); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> thenable = {
    <span class="hljs-attr">then</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        resolve(<span class="hljs-number">42</span>);
    }
};

<span class="hljs-keyword">let</span> p = <span class="hljs-built_in">Promise</span>.resolve(thenable);
p.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(ret)); <span class="hljs-comment">// 42</span></code></pre>
<p>Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象中的then方法，因为例子中的thenable对象的then方法中执行了<code>resolve</code>，因此会输出结果<code>42</code>。</p>
<h4>4.3.3 其他参数</h4>
<p>如果参数是一个原始值，或者不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为<code>resolve</code>，然后直接将该参数传递给<code>resolve</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.resolve(&quot;p&quot;);
p.then( ret => console.log(ret)); // p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"p"</span>);
p.then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(ret)); <span class="hljs-comment">// p</span></code></pre>
<h4>4.3.4 不带任何参数</h4>
<p>Promise.resolve方法不带参数时，会直接返回一个<code>resolve</code>状态的Promise对象。</p>
<p>需要注意的立即<code>resolve</code>的Promise对象，是在本轮<code>事件循环</code>的结束时，而不是下一轮<code>事件循环</code>的开始执行。示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => console.log('3'), 0);
var p = Promise.resolve();
p.then(() => console.log('2'));
console.log('1');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>), <span class="hljs-number">0</span>);
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.resolve();
p.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);</code></pre>
<p>输出结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpoH?w=573&amp;h=126" src="https://static.alili.tech/img/bVGpoH?w=573&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">4.4 Promise.reject()</h3>
<p>Promise.reject()返回一个新的Promise实例，该实例的状态为<code>rejected</code>，对于传入的参数的处理跟Promise.resolve类似，就是状态都为<code>rejected</code>。</p>
<h2 id="articleHeader15">5. 两个实用的方法</h2>
<h3 id="articleHeader16">5.1 done()</h3>
<p>Promise对象的回调链，不管以then方法或者catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到，因为Promise内部的错误不会冒泡到全局，因此，我们可以提供一个done方法，总是处理回调链的尾端，保证抛出任何可能出现的错误。</p>
<p>这个代码的实现非常简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.done = function (resolve, reject) {
    this.then(resolve, reject)
        .catch( function (reason) {
            // 抛出一个全局错误
            setTimeout( () => { throw reason }, 0);
        });
}

// 使用示例
var p = new Promise( (resolve, reject) => {
    resolve('p');
});
p.then(ret => {
    console.log(ret);
    return 'then1';
}).catch( err => {
    console.log(err.toString());
}).then( ret => {
    console.log(ret);
    return 'then2';
}).then( ret => {
    console.log(ret);
    x + 2;
}).done();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.prototype.done = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">this</span>.then(resolve, reject)
        .catch( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reason</span>) </span>{
            <span class="hljs-comment">// 抛出一个全局错误</span>
            setTimeout( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">throw</span> reason }, <span class="hljs-number">0</span>);
        });
}

<span class="hljs-comment">// 使用示例</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'p'</span>);
});
p.then(<span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then1'</span>;
}).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err.toString());
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'then2'</span>;
}).then( <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(ret);
    x + <span class="hljs-number">2</span>;
}).done();</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGpoI?w=856&amp;h=372" src="https://static.alili.tech/img/bVGpoI?w=856&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里为什么可以在全局抛出一个错误？原因就是setTimeout中的回调函数是在<code>全局作用域中执行的</code>，因此抛出的错误就是在全局作用域上。</p>
<h3 id="articleHeader17">5.2 finally()</h3>
<p>finally方法用于指定不管Promise对象最后的状态如何，都会执行的操作，它与done方法最大的区别就是，它接受一个普通函数作为参数，该函数不管怎么样都必须执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        ret => P.resolve(callback()).then( () => ret),
        err => P.resolve(callback()).then( () => {throw reason })
    );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.prototype.finally = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">let</span> P = <span class="hljs-keyword">this</span>.constructor;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(
        <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> P.resolve(callback()).then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ret),
        err =&gt; P.resolve(callback()).then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-keyword">throw</span> reason })
    );
};</code></pre>
<h2 id="articleHeader18">5. Promise的优劣势</h2>
<p>从上面几个小节综合来看，可以看到Promise其实就是做了一件事情，那就是对异步操作进行了封装，然后可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数，同时提供统一的接口，使得控制异步操作更加容易。</p>
<p>但是，Promise也有一些缺点：</p>
<ul>
<li><p>无法取消Promise，一旦新建它就会立即执行，无法中途取消。</p></li>
<li><p>如果不设置回调函数，Promise内部的错误不会反应到外部。</p></li>
<li><p>当处于未完成态时，无法得知目前进展到哪一个阶段。</p></li>
</ul>
<h2 id="articleHeader19">6. Promise与generator的结合</h2>
<p>使用Generator函数来管理流程，遇到异步操作的时候，通常返回一个<code>Promise</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getFoo() {
    return new Promise( resolve => resolve('foo'));
}

var g = function * () {
    try {
        var foo = yield getFoo();
        console.log(foo);
    } catch(e){}
}

function run(generator) {
    var it = generator();

    function go(result) {
        if(result.done) return result.value;

        // 默认value是一个Promise，其实这里应该做判断的
        if(!(result.value instanceof Promise)){
            throw Error('yield must follow an instanceof Promise');
        }
        return result.value.then(
            ret => go(it.next(ret))
        ).catch(err => go(it.throw(err)));
    }

    go(it.next());
}

run(g);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFoo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-string">'foo'</span>));
}

<span class="hljs-keyword">var</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span> * (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">yield</span> getFoo();
        <span class="hljs-built_in">console</span>.log(foo);
    } <span class="hljs-keyword">catch</span>(e){}
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">generator</span>) </span>{
    <span class="hljs-keyword">var</span> it = generator();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">go</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">if</span>(result.done) <span class="hljs-keyword">return</span> result.value;

        <span class="hljs-comment">// 默认value是一个Promise，其实这里应该做判断的</span>
        <span class="hljs-keyword">if</span>(!(result.value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>)){
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'yield must follow an instanceof Promise'</span>);
        }
        <span class="hljs-keyword">return</span> result.value.then(
            <span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> go(it.next(ret))
        ).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> go(it.throw(err)));
    }

    go(it.next());
}

run(g);</code></pre>
<p>上面代码的Generator函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。</p>
<h2 id="articleHeader20">7. 来源</h2>
<p><a href="https://zhangguixu.github.io/2016/12/04/promise/" rel="nofollow noreferrer" target="_blank">个人博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[es6系列]学习Promise

## 原文链接
[https://segmentfault.com/a/1190000007685095](https://segmentfault.com/a/1190000007685095)

