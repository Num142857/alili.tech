---
title: '谈谈JavaScript异步代码优化' 
date: 2018-12-01 2:30:12
hidden: true
slug: cmoed8y3hh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于</h2>
<ul>
<li>微信公众号：前端呼啦圈（Love-FED）</li>
<li>我的博客：<a href="http://www.cnblogs.com/luozhihao" rel="nofollow noreferrer" target="_blank">劳卜的博客</a>
</li>
<li>知乎专栏：<a href="https://zhuanlan.zhihu.com/font-end" rel="nofollow noreferrer" target="_blank">前端呼啦圈</a>
</li>
</ul>
<h2 id="articleHeader1">前言</h2>
<p>在实际编码中，我们经常会遇到Javascript代码异步执行的场景，比如ajax的调用、定时器的使用等，在这样的场景下也经常会出现这样那样匪夷所思的bug或者糟糕的代码片段，那么处理好你的Javascript异步代码成为了异步编程至关重要的前提。下面我们从问题出发，一步步完善你的异步代码。</p>
<h2 id="articleHeader2">异步问题</h2>
<h3 id="articleHeader3">1. 回调地狱</h3>
<p>首先，我们来看下异步编程中最常见的一种问题，便是回调地狱。它的出现是由于异步代码执行时间的不确定性及代码间的依赖关系引发的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个动画结束后，执行下一个动画，下一个动画结束后再执行下一个动画
$('#box').animate({width: '100px'}, 1000, function(){
    $('#box').animate({height: '100px'}, 1000, function(){
        $('#box').animate({left: 100}, 1000);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一个动画结束后，执行下一个动画，下一个动画结束后再执行下一个动画</span>
$(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">width</span>: <span class="hljs-string">'100px'</span>}, <span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">height</span>: <span class="hljs-string">'100px'</span>}, <span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">left</span>: <span class="hljs-number">100</span>}, <span class="hljs-number">1000</span>);
    });
});</code></pre>
<p>由于我们不知道第一个动画什么时候开始或者什么时候结束，所以我们把第二个动画的执行内容放到了第一个动画的结束事件里，把第三个动画放到了第二个动画的结束事件里，这时候如果有很多这样的动画，那么就会形成回调地狱。</p>
<h3 id="articleHeader4">2. 捕获异常</h3>
<p>除了回调地狱，如果我们需要在异步代码中捕获异常也比较麻烦，可能需要手动配置捕获方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    throw new Error('fail');
} catch (e) {
    console.log(e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'fail'</span>);
} <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.log(e);
}</code></pre>
<p>这样的代码书写明显不是我们想要的，不仅不利于维护，而且也在一定程度上违背了良好的Javascript编码规范。</p>
<h2 id="articleHeader5">解决方案</h2>
<p>那么我们如何优雅的写好我们的异步代码呢？我主要列了以下5种常见方案：</p>
<h3 id="articleHeader6">1. callback</h3>
<p>callback顾名思义便是回调，但并不是将回调内容放在异步方法里，而是放到外部的回调函数中，比如问题1的代码我们通过callback可以变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#box').animate({width: '100px'}, 1000, autoHeight);

function autoHeight() {
    $('#box').animate({height: '100px'}, 1000, autoLeft);
}

function autoLeft() {
    $('#box').animate({left: 100}, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">width</span>: <span class="hljs-string">'100px'</span>}, <span class="hljs-number">1000</span>, autoHeight);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autoHeight</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">height</span>: <span class="hljs-string">'100px'</span>}, <span class="hljs-number">1000</span>, autoLeft);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autoLeft</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">left</span>: <span class="hljs-number">100</span>}, <span class="hljs-number">1000</span>);
}</code></pre>
<p>如此我们看似异步的代码变成了同步的写法，避免了层层嵌套的写法，看上去也流畅了很多。同时使用callback也是异步编程最基础和核心的一种解决思路。</p>
<h3 id="articleHeader7">2. Promise</h3>
<p>基于callback，Promise目前也被广泛运用，其是异步编程的一种解决方案，比传统的回调函数解决方案更合理和强大。相信了解ES6的同学肯定不会陌生。</p>
<p>比如我们现在有这样一个场景，我们需要异步加载一张图片，在图片加载成功后做一些操作，这里我不想用回调函数或者将逻辑写在图片的成功事件里，那么用Promise我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Promise((resolve, reject) => {
    let img = new Image(); // 创建图片对象
    
    // 图片加载成功事件
    img.onload = function() {
        resolve(img); // 输出图片对象
    };
    
    // 图片加载失败事件
    img.onerror = function() {
        reject(new Error('load error')); // 输出错误
    };
    
    img.src = 'xxx'; // 图片路径
});

// Promise then回调
p
.then(result => {
    $('#box').append(result); // 成功后我们把图片放到页面上
})
.catch(error => {
    console.log(error); // 打印错误
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> Image(); <span class="hljs-comment">// 创建图片对象</span>
    
    <span class="hljs-comment">// 图片加载成功事件</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        resolve(img); <span class="hljs-comment">// 输出图片对象</span>
    };
    
    <span class="hljs-comment">// 图片加载失败事件</span>
    img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'load error'</span>)); <span class="hljs-comment">// 输出错误</span>
    };
    
    img.src = <span class="hljs-string">'xxx'</span>; <span class="hljs-comment">// 图片路径</span>
});

<span class="hljs-comment">// Promise then回调</span>
p
.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    $(<span class="hljs-string">'#box'</span>).append(result); <span class="hljs-comment">// 成功后我们把图片放到页面上</span>
})
.catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(error); <span class="hljs-comment">// 打印错误</span>
})</code></pre>
<p>通过Promise我们把图片构建加载的逻辑和成功或失败后的处理逻辑拆分了开来，将回调函数的嵌套，改成链式调用，同时使用Promise的catch事件回调后异常捕获也变得十分方便。</p>
<p>当然如果要等待多个异步请求完成执行某些操作，可以使用Promise.all方法，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = Promise.all([p1, p2, p3]); // 其中p1、p2、p3都是Promise实例

p.then(result => console.log(result));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> p = <span class="hljs-built_in">Promise</span>.all([p1, p2, p3]); <span class="hljs-comment">// 其中p1、p2、p3都是Promise实例</span>

p.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(result));</code></pre>
<p>当然Promise也有其相应的缺点，比如下一个then回调只能获取上一个then返回的数据，不能跨层获取，同时大量的then回调也会使代码不容易维护。</p>
<h3 id="articleHeader8">3. Generator</h3>
<p>与Promise一样，Generator 函数也是 ES6 提供的一种异步编程解决方案，其会返回一个遍历器对象，异步任务需要暂停的地方我们可以使用yield语句，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* getData() {
    let result = yield fetch(&quot;xxx&quot;); // 调用ajax，yield命令后面只能是 Thunk 函数或 Promise 对象
    
    console.log(result);
}

// 执行
let g = getData();
let result = g.next(); // { value: [object Promise], done: false }

result.value.then(data => {
    return data.json();
}).then(data => {
    g.next(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getData</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">"xxx"</span>); <span class="hljs-comment">// 调用ajax，yield命令后面只能是 Thunk 函数或 Promise 对象</span>
    
    <span class="hljs-built_in">console</span>.log(result);
}

<span class="hljs-comment">// 执行</span>
<span class="hljs-keyword">let</span> g = getData();
<span class="hljs-keyword">let</span> result = g.next(); <span class="hljs-comment">// { value: [object Promise], done: false }</span>

result.value.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> data.json();
}).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    g.next(data);
});</code></pre>
<p>Generator中遇到yield的地方会进行暂停，所以我们需要手动调用next方法往下，next返回值的 value 属性便是我们需要的数据，这里是fetch方法返回的Promise对象，所以我们需要使用then回调，最后再调用g.next(data)结束并输出数据。</p>
<p>Generator 函数的缺点在于，我们每一次执行yield语句都需要手动进行next，不是很方便。</p>
<h3 id="articleHeader9">4. co</h3>
<p>为了解决上方Generator函数需手动执行next方法的问题，TJ Holowaychuk大神编写了一个co函数库，能够使Generator 函数可以自动执行，比如原来我们需要这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let files = function* (){
    var f1 = yield readFile('/xxx/xxx'); // 读取file1文件
    var f2 = yield readFile('/xxx/xxx'); // 读取file2文件
    
    console.log(f1.toString());
    console.log(f2.toString());
};

files.next(); // 执行yield
files.next(); // 执行yield" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> files = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'/xxx/xxx'</span>); <span class="hljs-comment">// 读取file1文件</span>
    <span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'/xxx/xxx'</span>); <span class="hljs-comment">// 读取file2文件</span>
    
    <span class="hljs-built_in">console</span>.log(f1.toString());
    <span class="hljs-built_in">console</span>.log(f2.toString());
};

files.next(); <span class="hljs-comment">// 执行yield</span>
files.next(); <span class="hljs-comment">// 执行yield</span></code></pre>
<p>使用co后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('co');

co(files);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

co(files);</code></pre>
<p>co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="co(files).then(() => {
  console.log('执行完成');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">co(files).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'执行完成'</span>);
});</code></pre>
<p>最后我们可以看到我们没有手动执行next方法，也会打印出所读取的文件。</p>
<p>co模块虽然很好的帮助了我们解决了Generator函数必须靠执行器的问题，但是使用起来我们都需要额外引入一个模块，那么有没有更加方便的方式来解决呢？继续往下看。</p>
<h3 id="articleHeader10">5. async and await</h3>
<p>除了以上4中方式可以解决Javascript异步编程的问题外，ES7还提供了更加方便的async 函数和await命令，了解一下？</p>
<p>其实async是 Generator 函数的语法糖，不同点在于其内置了执行器，也就是说async函数自带执行器。看一下下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2); 
    }, 1000);
});

async function waitFn() {
    let a = await p1; // await命令后面可以是 Promise 对象和原始类型的值，如果使原始类型最终也会返回为Promise对象
    let b = await p2;
    
    return a + b
}

// async函数的返回值是 Promise 对象， 可以用then方法指定下一步的操作
waitFn().then(result => {
    console.log(result);  // 2s后输出3
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">1</span>);
    }, <span class="hljs-number">1000</span>);
});

<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">2</span>); 
    }, <span class="hljs-number">1000</span>);
});

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waitFn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">await</span> p1; <span class="hljs-comment">// await命令后面可以是 Promise 对象和原始类型的值，如果使原始类型最终也会返回为Promise对象</span>
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">await</span> p2;
    
    <span class="hljs-keyword">return</span> a + b
}

<span class="hljs-comment">// async函数的返回值是 Promise 对象， 可以用then方法指定下一步的操作</span>
waitFn().then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(result);  <span class="hljs-comment">// 2s后输出3</span>
});</code></pre>
<p>async函数内部return语句返回的值，会成为then方法回调函数的参数。因此这就像极了利用co包裹起来的Generator函数，只是把*替换成了async，把yield替换成了await。</p>
<p>可以说async and await 是ES7中最重要的一个特性，虽然其也存在一些弊端，但是相比较而言用其处理异步代码来说还是比较得心应手的。</p>
<h2 id="articleHeader11">结语</h2>
<p>本文简单介绍了处理好Javascript异步代码的五种常见方式，每一种方式都有其使用和存在的条件和必要性，有兴趣的同学可以对其进行单独的拓展和探究，只有了解并掌握每一种方式各自的优点并加以运用，才能享受异步编程带来的快感。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈JavaScript异步代码优化

## 原文链接
[https://segmentfault.com/a/1190000014819809](https://segmentfault.com/a/1190000014819809)

