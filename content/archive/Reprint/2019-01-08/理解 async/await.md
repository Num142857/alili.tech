---
title: '理解 async/await' 
date: 2019-01-08 2:30:11
hidden: true
slug: o1mtr8pxv4s
categories: [reprint]
---

{{< raw >}}

                    
<p>ES7 提出的<code>async</code> 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。<br><code>async</code> 函数是 <code>Generator</code> 函数的语法糖。使用 关键字 <code>async</code> 来表示，在函数内部使用 <code>await</code> 来表示异步。<br>想较于 Generator，<code>Async</code> 函数的改进在于下面四点：</p>
<ul>
<li><p><strong>内置执行器</strong>。Generator 函数的执行必须依靠执行器，而 <code>Aysnc</code> 函数自带执行器，调用方式跟普通函数的调用一样</p></li>
<li><p><strong>更好的语义</strong>。<code>async</code> 和 <code>await</code> 相较于 <code>*</code> 和 <code>yield</code> 更加语义化</p></li>
<li><p><strong>更广的适用性</strong>。<code>co</code> 模块约定，<code>yield</code> 命令后面只能是 Thunk 函数或 Promise对象。而 <code>async</code> 函数的 <code>await</code> 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）</p></li>
<li><p><strong>返回值是 Promise</strong>。<code>async</code> 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 <code>then()</code> 方法进行调用</p></li>
</ul>
<h2 id="articleHeader0">Async 与其他异步操作的对比</h2>
<p>先定义一个 Fetch 方法用于获取 github user 的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchUser() { 
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/users/superman66')
        .then((data) => {
            resolve(data.json());
        }, (error) => {
            reject(error);
        })
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchUser</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fetch(<span class="hljs-string">'https://api.github.com/users/superman66'</span>)
        .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
            resolve(data.json());
        }, (error) =&gt; {
            reject(error);
        })
    });
}</code></pre>
<p><strong>Promise 方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Promise 方式
 */
function getUserByPromise() {
    fetchUser()
        .then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        })
}
getUserByPromise();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Promise 方式
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserByPromise</span>(<span class="hljs-params"></span>) </span>{
    fetchUser()
        .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(data);
        }, (error) =&gt; {
            <span class="hljs-built_in">console</span>.log(error);
        })
}
getUserByPromise();</code></pre>
<p>Promise 的方式虽然解决了 callback hell，但是这种方式充满了 Promise的 <code>then()</code> 方法，如果处理流程复杂的话，整段代码将充满 <code>then</code>。语义化不明显，代码流程不能很好的表示执行流程。<br><strong>Generator 方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Generator 方式
 */
function* fetchUserByGenerator() {
    const user = yield fetchUser();
    return user;
}

const g = fetchUserByGenerator();
const result = g.next().value;
result.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Generator 方式
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchUserByGenerator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">yield</span> fetchUser();
    <span class="hljs-keyword">return</span> user;
}

<span class="hljs-keyword">const</span> g = fetchUserByGenerator();
<span class="hljs-keyword">const</span> result = g.next().value;
result.then(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(v);
}, (error) =&gt; {
    <span class="hljs-built_in">console</span>.log(error);
})</code></pre>
<p>Generator 的方式解决了 Promise 的一些问题，流程更加直观、语义化。但是 Generator 的问题在于，函数的执行需要依靠执行器，每次都需要通过 <code>g.next()</code> 的方式去执行。<br><strong>async 方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * async 方式
 */
 async function getUserByAsync(){
     let user = await fetchUser();
     return user;
 }
getUserByAsync()
.then(v => console.log(v));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * async 方式
 */</span>
 <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserByAsync</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">let</span> user = <span class="hljs-keyword">await</span> fetchUser();
     <span class="hljs-keyword">return</span> user;
 }
getUserByAsync()
.then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v));</code></pre>
<p><code>async</code> 函数完美的解决了上面两种方式的问题。流程清晰，直观、语义明显。操作异步流程就如同操作同步流程。同时 <code>async</code> 函数自带执行器，执行的时候无需手动加载。</p>
<h2 id="articleHeader1">语法</h2>
<p><strong>async 函数返回一个 Promise 对象</strong></p>
<p><code>async</code> 函数内部 return 返回的值。会成为 <code>then</code> 方法回调函数的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function  f() {
    return 'hello world'
};
f().then( (v) => console.log(v)) // hello world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'hello world'</span>
};
f().then( <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// hello world</span></code></pre>
<p>如果 <code>async</code> 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 <code>reject</code> 状态。抛出的错误而会被 <code>catch</code> 方法回调函数接收到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function e(){
    throw new Error('error');
}
e().then(v => console.log(v))
.catch( e => console.log(e));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">e</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>);
}
e().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
.catch( <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e));</code></pre>
<p><strong>async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变</strong></p>
<p>也就是说，只有当 <code>async</code> 函数内部的异步操作都执行完，才会执行 <code>then</code> 方法的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> delay = <span class="hljs-function"><span class="hljs-params">timeout</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span> setTimeout(resolve, timeout));
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">await</span> delay(<span class="hljs-number">1000</span>);
    <span class="hljs-keyword">await</span> delay(<span class="hljs-number">2000</span>);
    <span class="hljs-keyword">await</span> delay(<span class="hljs-number">3000</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'done'</span>;
}

f().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v)); <span class="hljs-comment">// 等待6s后才输出 'done'</span></code></pre>
<p><strong>正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise</strong><br>如下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function  f() {
    return await 1
};
f().then( (v) => console.log(v)) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-number">1</span>
};
f().then( <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(v)) <span class="hljs-comment">// 1</span></code></pre>
<p>如果返回的是 reject 的状态，则会被 <code>catch</code> 方法捕获。</p>
<h2 id="articleHeader2">Async 函数的错误处理</h2>
<p><code>async</code> 函数的语法不难，难在错误处理上。<br>先来看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a;
async function f() {
    await Promise.reject('error');
    a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'error'</span>);
    a = <span class="hljs-keyword">await</span> <span class="hljs-number">1</span>; <span class="hljs-comment">// 这段 await 并没有执行</span>
}
f().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a));</code></pre>
<p>如上面所示，当 <code>async</code> 函数中只要一个 <code>await</code> 出现 reject 状态，则后面的 <code>await</code> 都不会被执行。<br><strong>解决办法</strong>：可以添加 <code>try/catch</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确的写法
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}

correct().then(v => console.log(a)); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 正确的写法</span>
<span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">correct</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'error'</span>)
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(error);
    }
    a = <span class="hljs-keyword">await</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> a;
}

correct().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a)); <span class="hljs-comment">// 1</span></code></pre>
<p>如果有多个 <code>await</code> 则可以将其都放在 <code>try/catch</code> 中。</p>
<h2 id="articleHeader3">如何在项目中使用</h2>
<p>依然是通过 <code>babel</code> 来使用。<br>只需要设置 <code>presets</code> 为 <code>stage-3</code> 即可。<br>安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-preset-es2015 babel-preset-stage-3 babel-runtime babel-plugin-transform-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install babel-preset-es2015 babel-preset-stage-3 babel-runtime babel-plugin-transform-runtime</code></pre>
<p>修改<code>.babelrc</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-3&quot;],
&quot;plugins&quot;: [&quot;transform-runtime&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-3"</span>],
<span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]</code></pre>
<p>这样就可以在项目中使用 <code>async</code> 函数了。</p>
<h2 id="articleHeader4">Further Reading</h2>
<ul>
<li><p><a href="https://ponyfoo.com/articles/understanding-javascript-async-await" rel="nofollow noreferrer" target="_blank">Understanding JavaScript’s async await</a></p></li>
<li><p><a href="https://msdn.microsoft.com/en-us/magazine/jj991977.aspx" rel="nofollow noreferrer" target="_blank">Async/Await - Best Practices in Asynchronous Programming</a></p></li>
<li><p><a href="http://localhost:8083/es6tutorial-gh-pages/#docs/async" rel="nofollow noreferrer" target="_blank">异步操作和 Async 函数</a></p></li>
</ul>
<p>文章首发于我的博客：<a href="https://chenhuichao.com" rel="nofollow noreferrer" target="_blank">chenhuichao.com</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解 async/await

## 原文链接
[https://segmentfault.com/a/1190000010244279](https://segmentfault.com/a/1190000010244279)

