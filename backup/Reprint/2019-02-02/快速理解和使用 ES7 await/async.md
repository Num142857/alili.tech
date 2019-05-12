---
title: '快速理解和使用 ES7 await/async' 
date: 2019-02-02 2:30:11
hidden: true
slug: hpmvw6o7jbp
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>await/async</strong> 是 ES7 最重要特性之一，它是目前为止 JS 最佳的异步解决方案了。虽然没有在 ES2016 中录入，但很快就到来，目前已经在 ES-Next <a href="https://github.com/hemanth/es-next#async-functions" rel="nofollow noreferrer" target="_blank">Stage 4</a> 阶段。</p>
<p>直接上例子，比如我们需要按顺序获取：产品数据=&gt;用户数据=&gt;评论数据</p>
<h3 id="articleHeader0">老朋友 Ajax</h3>
<p>传统的写法，无需解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取产品数据
ajax('products.json', (products) => {
    console.log('AJAX/products >>>', JSON.parse(products));

    // 获取用户数据
    ajax('users.json', (users) => {
        console.log('AJAX/users >>>', JSON.parse(users));

        // 获取评论数据
        ajax('products.json', (comments) => {
            console.log('AJAX/comments >>>', JSON.parse(comments));
        });
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取产品数据</span>
ajax(<span class="hljs-string">'products.json'</span>, (products) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'AJAX/products &gt;&gt;&gt;'</span>, <span class="hljs-built_in">JSON</span>.parse(products));

    <span class="hljs-comment">// 获取用户数据</span>
    ajax(<span class="hljs-string">'users.json'</span>, (users) =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'AJAX/users &gt;&gt;&gt;'</span>, <span class="hljs-built_in">JSON</span>.parse(users));

        <span class="hljs-comment">// 获取评论数据</span>
        ajax(<span class="hljs-string">'products.json'</span>, (comments) =&gt; {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'AJAX/comments &gt;&gt;&gt;'</span>, <span class="hljs-built_in">JSON</span>.parse(comments));
        });
    });
});</code></pre>
<h3 id="articleHeader1">不算新的朋友 Promise</h3>
<p><strong>Promise</strong> 已经被提及已久了，也是 ES6 的一部分。<strong>Promise</strong> 能消除 callback hell 带来的厄运金字塔，相比起来代码更清晰了，但还是达不到编写同步代码的直观程度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Promise
// 封装 Ajax，返回一个 Promise
function requestP(url) {
    return new Promise(function(resolve, reject) {
        ajax(url, (response) => {
            resolve(JSON.parse(response));
        });
    });
}

// 获取产品数据
requestP('products.json').then((products) => {
    console.log('Promises/products >>>', products);
    // 获取用户数据
    return requestP('users.json');
}).then((users) => {
    console.log('Promises/users >>>', users);
    // 获取评论数据
    return requestP('comments.json');
}).then((comments) => {
    console.log('Promises/comments >>>', comments);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Promise</span>
<span class="hljs-comment">// 封装 Ajax，返回一个 Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestP</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        ajax(url, (response) =&gt; {
            resolve(<span class="hljs-built_in">JSON</span>.parse(response));
        });
    });
}

<span class="hljs-comment">// 获取产品数据</span>
requestP(<span class="hljs-string">'products.json'</span>).then(<span class="hljs-function">(<span class="hljs-params">products</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Promises/products &gt;&gt;&gt;'</span>, products);
    <span class="hljs-comment">// 获取用户数据</span>
    <span class="hljs-keyword">return</span> requestP(<span class="hljs-string">'users.json'</span>);
}).then(<span class="hljs-function">(<span class="hljs-params">users</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Promises/users &gt;&gt;&gt;'</span>, users);
    <span class="hljs-comment">// 获取评论数据</span>
    <span class="hljs-keyword">return</span> requestP(<span class="hljs-string">'comments.json'</span>);
}).then(<span class="hljs-function">(<span class="hljs-params">comments</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Promises/comments &gt;&gt;&gt;'</span>, comments);
});</code></pre>
<h3 id="articleHeader2">强劲的新朋友 Generators</h3>
<p><strong>Generators</strong> 也是 ES6 一个新的特性，能够 暂停/执行 代码。yield 表示暂停，iterator.next 表示执行下一步，如果你不了解 <strong>Generators</strong> 也没关系，可以忽略它直接学习 <strong>await/async</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Generators
function request(url) {
    ajax(url, (response) => {
        iterator.next(JSON.parse(response));
    });
}

function *main() {
    // 获取产品数据
    let data = yield request('products.json');

    // 获取用户数据
    let users = yield request('users.json');

    // 获取评论数据
    let products = yield request('comments.json');

    console.log('Generator/products >>>', products);
    console.log('Generator/users >>>', users);
    console.log('Generator/comments >>>', comments);
}

var iterator = main();
iterator.next();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Generators</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    ajax(url, (response) =&gt; {
        iterator.next(<span class="hljs-built_in">JSON</span>.parse(response));
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 获取产品数据</span>
    <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'products.json'</span>);

    <span class="hljs-comment">// 获取用户数据</span>
    <span class="hljs-keyword">let</span> users = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'users.json'</span>);

    <span class="hljs-comment">// 获取评论数据</span>
    <span class="hljs-keyword">let</span> products = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'comments.json'</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Generator/products &gt;&gt;&gt;'</span>, products);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Generator/users &gt;&gt;&gt;'</span>, users);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Generator/comments &gt;&gt;&gt;'</span>, comments);
}

<span class="hljs-keyword">var</span> iterator = main();
iterator.next();</code></pre>
<h3 id="articleHeader3">碉堡的朋友 await/async</h3>
<p>与 Promise 结合使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装 Ajax，返回一个 Promise
function requestP(url) {
    return new Promise(function(resolve, reject) {
        ajax(url, (response) => {
            resolve(JSON.parse(response));
        });
    });
}

(async () => {
    // 获取产品数据
    let data = await requestP('products.json');

     // 获取用户数据
    let users = await requestP('users.json');

     // 获取评论数据
    let products = await requestP('comments.json');

    console.log('ES7 Async/products >>>', products);
    console.log('ES7 Async/users >>>', users);
    console.log('ES7 Async/comments >>>', comments);
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 封装 Ajax，返回一个 Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestP</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        ajax(url, (response) =&gt; {
            resolve(<span class="hljs-built_in">JSON</span>.parse(response));
        });
    });
}

(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-comment">// 获取产品数据</span>
    <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> requestP(<span class="hljs-string">'products.json'</span>);

     <span class="hljs-comment">// 获取用户数据</span>
    <span class="hljs-keyword">let</span> users = <span class="hljs-keyword">await</span> requestP(<span class="hljs-string">'users.json'</span>);

     <span class="hljs-comment">// 获取评论数据</span>
    <span class="hljs-keyword">let</span> products = <span class="hljs-keyword">await</span> requestP(<span class="hljs-string">'comments.json'</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async/products &gt;&gt;&gt;'</span>, products);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async/users &gt;&gt;&gt;'</span>, users);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async/comments &gt;&gt;&gt;'</span>, comments);
}());</code></pre>
<p>与 Fetch API 结合使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
// Async/await using the fetch API
    try {

         // 获取产品数据
        let products = await fetch('products.json');

        // Parsing products
        let parsedProducts = await products.json();

        // 获取用户数据
        let users = await fetch('users.json');

        // Parsing users
        let parsedUsers = await users.json();

        // 获取评论数据
        let comments = await fetch('comments.json');

        // Parsing comments
        let parsedComments = await comments.json();


        console.log('ES7 Async+fetch/products >>>', parsedProducts);
        console.log('ES7 Async+fetch/users >>>', parsedUsers);
        console.log('ES7 Async+fetch/comments >>>', parsedComments);


    } catch (error) {
        console.log(error);
    }
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> () =&gt; {
<span class="hljs-comment">// Async/await using the fetch API</span>
    <span class="hljs-keyword">try</span> {

         <span class="hljs-comment">// 获取产品数据</span>
        <span class="hljs-keyword">let</span> products = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'products.json'</span>);

        <span class="hljs-comment">// Parsing products</span>
        <span class="hljs-keyword">let</span> parsedProducts = <span class="hljs-keyword">await</span> products.json();

        <span class="hljs-comment">// 获取用户数据</span>
        <span class="hljs-keyword">let</span> users = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'users.json'</span>);

        <span class="hljs-comment">// Parsing users</span>
        <span class="hljs-keyword">let</span> parsedUsers = <span class="hljs-keyword">await</span> users.json();

        <span class="hljs-comment">// 获取评论数据</span>
        <span class="hljs-keyword">let</span> comments = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'comments.json'</span>);

        <span class="hljs-comment">// Parsing comments</span>
        <span class="hljs-keyword">let</span> parsedComments = <span class="hljs-keyword">await</span> comments.json();


        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async+fetch/products &gt;&gt;&gt;'</span>, parsedProducts);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async+fetch/users &gt;&gt;&gt;'</span>, parsedUsers);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ES7 Async+fetch/comments &gt;&gt;&gt;'</span>, parsedComments);


    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(error);
    }
}());</code></pre>
<p>再次结合 Fetch</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
    let parallelDataFetch = await* [
        (await fetch('products.json')).json(),
        (await fetch('users.json')).json(),
        (await fetch('comments.json')).json()
    ];
    console.log('Async parallel+fetch >>>', parallelDataFetch);
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">let</span> parallelDataFetch = <span class="hljs-keyword">await</span>* [
        (<span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'products.json'</span>)).json(),
        (<span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'users.json'</span>)).json(),
        (<span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'comments.json'</span>)).json()
    ];
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Async parallel+fetch &gt;&gt;&gt;'</span>, parallelDataFetch);
}());</code></pre>
<p>使用 await/async  用同步的思维去解决异步的代码，感觉非常酷非常爽！</p>
<p>参考文献[原文]：<a href="https://github.com/jaydson/es7-async" rel="nofollow noreferrer" target="_blank">https://github.com/jaydson/es...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速理解和使用 ES7 await/async

## 原文链接
[https://segmentfault.com/a/1190000007116715](https://segmentfault.com/a/1190000007116715)

