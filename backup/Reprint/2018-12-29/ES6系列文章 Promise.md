---
title: 'ES6系列文章 Promise' 
date: 2018-12-29 2:30:10
hidden: true
slug: 6c0w5hka4rh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://segmentfault.com/l/1500000012462730?utm_source=banner">视频讲解</a></blockquote>
<p>ES6的 Promise 是个啥哩？，是个承诺。为了解决 js 回调地狱。Promise 给我的体会是: 开始云里雾里，然后越用越好用。今天才明白承诺是什么意思？比如我自己的承诺，如果减肥成功就买个iphone,如果减肥失败就去死~,哈哈然而我并不会。</p>
<h2 id="articleHeader0">基本语法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
    // ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
});</code></pre>
<p>resolve, reject 方法由 js 引擎提供，不需要个人编写。</p>
<h2 id="articleHeader1">Promise 的三种状态</h2>
<ol>
<li>pending (进行中)， 执行了 new Promise() 命令后，promise实例就处于 pending 的状态。</li>
<li>fullfilled(已成功)，promise 内部执行了 resolve 方法，promise实例处于fullfilled状态，状态不可改变了。</li>
<li>rejected(已失败), promise 内部执行了reject 方法，promise 实例处于rejected状态，同样不可更改。</li>
</ol>
<h2 id="articleHeader2">Promise.prototype 方法 then和catch</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello resolve');
    }, 500);
})
.then(val => {
    console.log(val);// hello resolve
}, err => {
    console.error(err);// 该条语句不被执行
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-string">'hello resolve'</span>);
    }, <span class="hljs-number">500</span>);
})
.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val);<span class="hljs-comment">// hello resolve</span>
}, err =&gt; {
    <span class="hljs-built_in">console</span>.error(err);<span class="hljs-comment">// 该条语句不被执行</span>
});</code></pre>
<p>then最多有两个参数，参数一为 resolve 后回调的函数，参数二为 reject 后的回调函数。then也可以只接收参数一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
   setTimeout(() => {
       reject('hello reject');
   }, 500);
})
.then(val => {
   console.log(val);
}, err => {
   console.error(err);// hello reject
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
   setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       reject(<span class="hljs-string">'hello reject'</span>);
   }, <span class="hljs-number">500</span>);
})
.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
   <span class="hljs-built_in">console</span>.log(val);
}, err =&gt; {
   <span class="hljs-built_in">console</span>.error(err);<span class="hljs-comment">// hello reject</span>
});</code></pre>
<p>catch实际上是 then 函数的一种简写形式，当执行 reject 后，可以被catch 的回调函数接收处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('hello reject');
    }, 500);
})
.catch(err => {
    console.log(err); // hello reject
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        reject(<span class="hljs-string">'hello reject'</span>);
    }, <span class="hljs-number">500</span>);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// hello reject</span>
});</code></pre>
<h2 id="articleHeader3">再谈谈 Promise 对象的异常处理</h2>
<p>在 promise 内部发生错误后不会被外层环境捕捉到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    new Promise((resolve, reject) => {
        console.log(e);
    });
} catch(e) {
    console.log('error is catched? ', e);// 该语句并未执行
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e);
    });
} <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error is catched? '</span>, e);<span class="hljs-comment">// 该语句并未执行</span>
}</code></pre>
<p>若 promise 内部发生错误，会被自动的执行reject。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
    console.log(e);
})
.catch(err => {
    console.log('error be rejected?', err);// error be rejected? ReferenceError: e is not defined
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(e);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error be rejected?'</span>, err);<span class="hljs-comment">// error be rejected? ReferenceError: e is not defined</span>
});</code></pre>
<h2 id="articleHeader4">再来看看promise的链式调用吧</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Promise((resolve, reject) => {
    resolve('i am resolved');
})
.then(val => {
    return val;
});
console.log(p);// Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'i am resolved'</span>);
})
.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> val;
});
<span class="hljs-built_in">console</span>.log(p);<span class="hljs-comment">// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}</span></code></pre>
<p>在 then 中 return 的值又变成了 promise对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.then(val => {
    console.log(val);// i am resolved
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">p.then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(val);<span class="hljs-comment">// i am resolved</span>
});</code></pre>
<p>这个也为链式调用提供了基础。</p>
<h2 id="articleHeader5">Promise 的静态方法 all race resolve reject</h2>
<h3 id="articleHeader6">all</h3>
<p>all静态方法接收promise 对象的数组，并返回一个 promise 对象。当数组中的所有元素都 resolve 时，结果promise被 resolve。若数组中有一个对象被 reject 了，结果promise对象被reject。本人经常使用 all方法来处理多个 ajax 请求获取数据的界面loading 效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isLoading = true;
let p1 = fetch(url1).then(json => {
    // ....
});
let p2 = fetch(url2).then(json => {
    // ...
});
let p3 = fetch(url3).then(json => {
    // ...
});
Promise.all([p1, p2, p3]).then(() => {
    isLoading = false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> isLoading = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">let</span> p1 = fetch(url1).then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
    <span class="hljs-comment">// ....</span>
});
<span class="hljs-keyword">let</span> p2 = fetch(url2).then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
});
<span class="hljs-keyword">let</span> p3 = fetch(url3).then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
});
<span class="hljs-built_in">Promise</span>.all([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    isLoading = <span class="hljs-literal">false</span>;
});</code></pre>
<h3 id="articleHeader7">race</h3>
<p>同样接收一个数组,结果也是一个 promise 对象，当数组中的promise 对象有一个的状态改变时，race方法的结果promise对象变为相同的状态。具体应用场景笔者还没有遇到过。若有人遇到过，请在下面留言告知一下，感激不尽。</p>
<h3 id="articleHeader8">resolve、reject</h3>
<p>静态函数Promise.resolve返回一个成功的promise对象，静态函数Promise.reject返回一个拒绝状态的 promise 对象。</p>
<h2 id="articleHeader9">refs</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject" rel="nofollow noreferrer" target="_blank">MDN Promise</a></p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6系列文章 Promise

## 原文链接
[https://segmentfault.com/a/1190000011430550](https://segmentfault.com/a/1190000011430550)

