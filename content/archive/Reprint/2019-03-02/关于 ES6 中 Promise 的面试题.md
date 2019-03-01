---
title: '关于 ES6 中 Promise 的面试题' 
date: 2019-03-02 2:30:07
hidden: true
slug: yheesma5d9q
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>最近在复习 Promise 的知识，所以就做了一些题，这里挑出几道题，大家一起看看吧。</p>
<h3 id="articleHeader1">题目一</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    resolve();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
})

promise.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);</code></pre>
<h3 id="articleHeader2">解析</h3>
<p>首先 Promise 新建后立即执行，所以会先输出 1，2，而 <code>Promise.then() </code> 内部的代码在 当次 事件循环的 结尾 立刻执行 ，所以会继续输出4，最后输出3。</p>
<h3 id="articleHeader3">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
2
4
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">4</span>
<span class="hljs-number">3</span></code></pre>
<h3 id="articleHeader4">题目二</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});

promise.then((res) => {
    console.log('then:', res);
}).catch((err) => {
    console.log('catch:', err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'success1'</span>);
    reject(<span class="hljs-string">'error'</span>);
    resolve(<span class="hljs-string">'success2'</span>);
});

promise.then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'then:'</span>, res);
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'catch:'</span>, err);
})</code></pre>
<h3 id="articleHeader5">解析</h3>
<p><code>resolve 函数</code>将 Promise 对象的状态从<code>“未完成”变为“成功”</code>（即从 <code>pending 变为 resolved</code>），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；</p>
<p><code>reject 函数</code>将 Promise 对象的状态从<code>“未完成”变为“失败”</code>（即从 <code>pending 变为 rejected</code>），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。</p>
<p>而一旦状态改变，就不会再变。<br>所以 代码中的<code>reject('error');</code> 不会有作用。</p>
<p>Promise 只能 resolve 一次，剩下的调用都会被忽略。<br>所以 第二次的 <code>resolve('success2');</code> 也不会有作用。</p>
<h3 id="articleHeader6">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="then: success1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">then</span>: success1</code></pre>
<h3 id="articleHeader7">题目三</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>))
  .then(<span class="hljs-built_in">console</span>.log)</code></pre>
<h3 id="articleHeader8">解析</h3>
<p><code>Promise.resolve</code> 方法的参数如果是一个原始值，或者是一个不具有 <code>then</code> 方法的对象，则 <code>Promise.resolve</code> 方法返回一个新的 <code>Promise</code> 对象，状态为<code>resolved</code>，<code>Promise.resolve</code> 方法的参数，会同时传给回调函数。</p>
<p><code>then</code> 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 <code>then(null)</code>，这就会导致前一个 <code>Promise</code> 的结果会穿透下面。</p>
<h3 id="articleHeader9">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span></code></pre>
<h3 id="articleHeader10">题目四</h3>
<p>红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">red</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'red'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">green</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'green'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">yellow</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yellow'</span>);
}</code></pre>
<h3 id="articleHeader11">解析</h3>
<p>红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次，意思就是3秒，执行一次 red 函数，2秒执行一次 green 函数，1秒执行一次 yellow 函数，不断交替重复亮灯，意思就是按照这个顺序一直执行这3个函数，这步可以就利用递归来实现。</p>
<h3 id="articleHeader12">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb();
            resolve();
        }, timmer);
    });
};

var step = function () {
    Promise.resolve().then(function () {
        return light(3000, red);
    }).then(function () {
        return light(2000, green);
    }).then(function () {
        return light(1000, yellow);
    }).then(function () {
        step();
    });
}

step();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">red</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'red'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">green</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'green'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">yellow</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yellow'</span>);
}

<span class="hljs-keyword">var</span> light = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">timmer, cb</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            cb();
            resolve();
        }, timmer);
    });
};

<span class="hljs-keyword">var</span> step = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">3000</span>, red);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">2000</span>, green);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">1000</span>, yellow);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        step();
    });
}

step();</code></pre>
<h3 id="articleHeader13">题目五</h3>
<p>实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码

};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> timeout = <span class="hljs-function"><span class="hljs-params">ms</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve();
    }, ms);
});

<span class="hljs-keyword">const</span> ajax1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> timeout(<span class="hljs-number">2000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
});

<span class="hljs-keyword">const</span> ajax2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> timeout(<span class="hljs-number">1000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
});

<span class="hljs-keyword">const</span> ajax3 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> timeout(<span class="hljs-number">2000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
});

<span class="hljs-keyword">const</span> mergePromise = <span class="hljs-function"><span class="hljs-params">ajaxArray</span> =&gt;</span> {
    <span class="hljs-comment">// 在这里实现你的代码</span>

};

mergePromise([ajax1, ajax2, ajax3]).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done'</span>);
    <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// data 为 [1, 2, 3]</span>
});

<span class="hljs-comment">// 要求分别输出</span>
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// done</span>
<span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<h3 id="articleHeader14">解析</h3>
<p>首先 <code>ajax1 、ajax2、ajax3</code> 都是函数，只是这些函数执行后会返回一个 <code>Promise</code>，按题目的要求我们只要顺序执行这三个函数就好了，然后把结果放到 <code>data</code> 中，但是这些函数里都是异步操作，想要按顺序执行，然后输出 1，2，3并没有那么简单，看个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A() {
    setTimeout(function () {
        console.log('a');
    }, 3000);
}

function B() {
    setTimeout(function () {
        console.log('b');
    }, 1000);
}

A();
B();

// b
// a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>);
    }, <span class="hljs-number">3000</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b'</span>);
    }, <span class="hljs-number">1000</span>);
}

A();
B();

<span class="hljs-comment">// b</span>
<span class="hljs-comment">// a</span></code></pre>
<p>例子中我们是按顺序执行的 <code>A</code>，<code>B</code> 但是输出的结果却是 <code>b</code>，<code>a</code> 对于这些异步函数来说，并不会按顺序执行完一个，再执行后一个。<br>这道题就是考用 <code>Promise</code> 控制异步流程，我们要想办法，让这些函数，一个执行完之后，再执行下一个，看答案吧。</p>
<h3 id="articleHeader15">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 保存数组中的函数执行后的结果
var data = [];

// Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
var sequence = Promise.resolve();

ajaxArray.forEach(function (item) {
    // 第一次的 then 方法用来执行数组中的每个函数，
    // 第二次的 then 方法接受数组中的函数执行后返回的结果，
    // 并把结果添加到 data 中，然后把 data 返回。
    sequence = sequence.then(item).then(function (res) {
        data.push(res);
        return data;
    });
})

// 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
// 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
return sequence;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 保存数组中的函数执行后的结果</span>
<span class="hljs-keyword">var</span> data = [];

<span class="hljs-comment">// Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。</span>
<span class="hljs-keyword">var</span> sequence = <span class="hljs-built_in">Promise</span>.resolve();

ajaxArray.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-comment">// 第一次的 then 方法用来执行数组中的每个函数，</span>
    <span class="hljs-comment">// 第二次的 then 方法接受数组中的函数执行后返回的结果，</span>
    <span class="hljs-comment">// 并把结果添加到 data 中，然后把 data 返回。</span>
    sequence = sequence.then(item).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        data.push(res);
        <span class="hljs-keyword">return</span> data;
    });
})

<span class="hljs-comment">// 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，</span>
<span class="hljs-comment">// 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。</span>
<span class="hljs-keyword">return</span> sequence;</code></pre>
<h3 id="articleHeader16">题目六</h3>
<p>以下代码最后输出什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> first = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>);
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
            resolve(<span class="hljs-number">6</span>);
        }, <span class="hljs-number">0</span>)
        resolve(<span class="hljs-number">1</span>);
    });
    resolve(<span class="hljs-number">2</span>);
    p.then(<span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(arg);
    });

}));

first().then(<span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(arg);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);</code></pre>
<h3 id="articleHeader17">解析</h3>
<p>这道题就其实和 <code>Promise</code> 的关系不太大，主要是需要理解 JS执行机制，才能很好的解决这道题，对于 JS 执行机制不了解的朋友推荐看看这篇文章 </p>
<p><a href="https://juejin.im/post/59e85eebf265da430d571f89" rel="nofollow noreferrer" target="_blank">这一次，彻底弄懂 JavaScript 执行机制</a></p>
<h4>第一轮事件循环</h4>
<p>先执行宏任务，主script ，new Promise立即执行，输出【3】，<br>执行 p 这个new Promise 操作，输出【7】，<br>发现 setTimeout，将回调放入下一轮任务队列（Event Queue），p 的 then，姑且叫做 then1，放入微任务队列，发现 first 的 then，叫 then2，放入微任务队列。执行<code>console.log(4)</code>，输出【4】，宏任务执行结束。<br>再执行微任务，执行 then1，输出【1】，<br>执行 then2，输出【2】。<br>到此为止，第一轮事件循环结束。开始执行第二轮。</p>
<h4>第二轮事件循环</h4>
<p>先执行宏任务里面的，也就是 setTimeout 的回调，输出【5】。<br><code>resolve(6)</code> 不会生效，因为 p 这个 Promise 的状态一旦改变就不会在改变了。</p>
<h3 id="articleHeader18">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
7
4
1
2
5 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">3</span>
<span class="hljs-number">7</span>
<span class="hljs-number">4</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">5</span> </code></pre>
<h3 id="articleHeader19">题目七</h3>
<p>有 8 个图片资源的 url，已经存储在数组 <code>urls</code> 中（即<code>urls = ['http://example.com/1.jpg', ...., 'http://example.com/8.jpg']）</code>，而且已经有一个函数 <code>function loadImg</code>，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。<br>但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。<br>请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> urls = [<span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/gray.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/Particle.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic.png'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/wxQrCode2.png'</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> Image()
        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'一张图片加载完成'</span>);
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};</code></pre>
<h3 id="articleHeader20">解析</h3>
<p>题目的意思是需要我们这么做，先并发请求 3 张图片，当一张图片加载完成后，又会继续发起一张图片的请求，让并发数保持在 3 个，直到需要加载的图片都全部发起请求。</p>
<p>用 Promise 来实现就是，先并发请求3个图片资源，这样可以得到 3 个 Promise，组成一个数组，就叫<code>promises </code> 吧，然后不断的调用 <a href="http://es6.ruanyifeng.com/#docs/promise#Promise-race" rel="nofollow noreferrer" target="_blank">Promise.race</a> 来返回最快改变状态的 Promise，然后从数组（<code>promises </code>）中删掉这个 Promise 对象，再加入一个新的 Promise，直到全部的 url 被取完，最后再使用 <a href="http://es6.ruanyifeng.com/#docs/promise#Promise-all" rel="nofollow noreferrer" target="_blank">Promise.all</a> 来处理一遍数组（<code>promises </code>）中没有改变状态的 Promise。</p>
<h3 id="articleHeader21">答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};

function limitLoad(urls, handler, limit) {
    // 对数组做一个拷贝
    const sequence = [].concat(urls)
    let promises = [];

    //并发请求到最大数
    promises = sequence.splice(0, limit).map((url, index) => {
        // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
        return handler(url).then(() => {
            return index
        }); 
    });

    // 利用数组的 reduce 方法来以队列的形式执行
    return sequence.reduce((last, url, currentIndex) => {
        return last.then(() => {
            // 返回最快改变状态的 Promise
            return Promise.race(promises)
        }).catch(err => {
            // 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误
            // 更重要的是防止中断整个链式调用
            console.error(err)
        }).then((res) => {
            // 用新的 Promise 替换掉最快改变状态的 Promise
            promises[res] = handler(sequence[currentIndex]).then(() => { return res });
        })
    }, Promise.resolve()).then(() => {
        return Promise.all(promises)
    })

}
limitLoad(urls, loadImg, 3)

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() => {
    console.log('所有图片加载完成');
}).catch(err => {
    console.error(err);
})
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> urls = [<span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/gray.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/Particle.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic.png'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/getImgData/arithmetic.gif'</span>, <span class="hljs-string">'https://www.kkkk1000.com/images/wxQrCode2.png'</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> Image()
        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'一张图片加载完成'</span>);
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">limitLoad</span>(<span class="hljs-params">urls, handler, limit</span>) </span>{
    <span class="hljs-comment">// 对数组做一个拷贝</span>
    <span class="hljs-keyword">const</span> sequence = [].concat(urls)
    <span class="hljs-keyword">let</span> promises = [];

    <span class="hljs-comment">//并发请求到最大数</span>
    promises = sequence.splice(<span class="hljs-number">0</span>, limit).map(<span class="hljs-function">(<span class="hljs-params">url, index</span>) =&gt;</span> {
        <span class="hljs-comment">// 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标</span>
        <span class="hljs-keyword">return</span> handler(url).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> index
        }); 
    });

    <span class="hljs-comment">// 利用数组的 reduce 方法来以队列的形式执行</span>
    <span class="hljs-keyword">return</span> sequence.reduce(<span class="hljs-function">(<span class="hljs-params">last, url, currentIndex</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> last.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// 返回最快改变状态的 Promise</span>
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.race(promises)
        }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            <span class="hljs-comment">// 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误</span>
            <span class="hljs-comment">// 更重要的是防止中断整个链式调用</span>
            <span class="hljs-built_in">console</span>.error(err)
        }).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
            <span class="hljs-comment">// 用新的 Promise 替换掉最快改变状态的 Promise</span>
            promises[res] = handler(sequence[currentIndex]).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">return</span> res });
        })
    }, <span class="hljs-built_in">Promise</span>.resolve()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(promises)
    })

}
limitLoad(urls, loadImg, <span class="hljs-number">3</span>)

<span class="hljs-comment">/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() =&gt; {
    console.log('所有图片加载完成');
}).catch(err =&gt; {
    console.error(err);
})
*/</span></code></pre>
<h3 id="articleHeader22">总结</h3>
<p>这几道题，有考查 Promise 基础知识的，也有考对 Promise 灵活运用的，如果这些题你都做的很好的话，那你对 Promise 的理解应该是不错的了。</p>
<p>最后，如果文中有不足或者错误的地方，还请小伙伴们指出，万分感谢。<br>如果觉得文章说的内容不够，最后有与题目相关的文章，可以看看。</p>
<h3 id="articleHeader23">参考</h3>
<p><a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门 —— 阮一峰</a></p>
<p><a href="https://juejin.im/post/5bc5e114e51d450e632277aa" rel="nofollow noreferrer" target="_blank">ES6 系列之我们来聊聊 Promise</a></p>
<p><a href="http://www.cnblogs.com/dojo-lzz/p/5495671.html" rel="nofollow noreferrer" target="_blank">一道关于Promise应用的面试题</a></p>
<p><a href="http://www.cnblogs.com/amingxiansen/p/9351415.html" rel="nofollow noreferrer" target="_blank">阿里前端测试题--关于ES6中Promise函数的理解与应用</a></p>
<p><a href="https://juejin.im/post/59e85eebf265da430d571f89" rel="nofollow noreferrer" target="_blank">这一次，彻底弄懂 JavaScript 执行机制</a></p>
<p><a href="https://github.com/lzlu/Blog/issues/7" rel="nofollow noreferrer" target="_blank">一个Promise面试题</a></p>
<p><a href="http://www.cnblogs.com/xuning/p/8045946.html" rel="nofollow noreferrer" target="_blank">ES6原生Promise的所有方法介绍（附一道应用场景题目）</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/29792886" rel="nofollow noreferrer" target="_blank">Promise 异步流程控制</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 ES6 中 Promise 的面试题

## 原文链接
[https://segmentfault.com/a/1190000016848192](https://segmentfault.com/a/1190000016848192)

