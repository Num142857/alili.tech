---
title: Promise.prototype.finally() • 探索 ES2018 和 ES2019
hidden: true
categories: [reprint]
slug: 99750d9b
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1>Promise.prototype.finally()</h1>
<p>本章主要解释由Jordan Harband提出的"<a href="https://github.com/tc39/proposal-promise-finally">Promise.prototype.finally</a>"提案。</p>
<h2>它是如何工作的？</h2>
<p>.finally()工作如下：</p>
<pre><code class="hljs nimrod">promise
.then(<span class="hljs-literal">result</span> =&gt; <span class="hljs-meta">{...}</span>)
.catch(error =&gt; <span class="hljs-meta">{...}</span>)
.<span class="hljs-keyword">finally</span>(() =&gt; <span class="hljs-meta">{...}</span>);
</code></pre>
<p>finally的回调总是被执行的。比较：</p>
<ul>
<li>只有promise成功完成时，才会执行then回调</li>
<li>只有promise被拒绝，才会执行catch回调。如then的回调抛出异常或返回被拒绝的promise。</li>
</ul>
<p>比如下面这段代码</p>
<pre><code class="hljs coffeescript">promise
.<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
     «statements»
});
</code></pre>
<p>上面这段代码相当于：</p>
<pre><code class="hljs typescript">promise
.then(
    <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        «statements»
        <span class="hljs-keyword">return</span> result;
    },
    <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        «statements»
        <span class="hljs-keyword">throw</span> error;
    }
);
</code></pre>
<h2>用例</h2>
<p>常见的用例与同步finally子句中常见的用例类似：在完成资源处理后进行清理。无论一切进展顺利还是出现错误，总会发生这种情况。</p>
<p>例如：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> connection;
db.open()
    .then(<span class="hljs-function"><span class="hljs-params">conn</span> =&gt;</span> {
    connection = conn;
    <span class="hljs-keyword">return</span> connection.select({<span class="hljs-attr">name</span>:<span class="hljs-string">'Jane'</span>});
})
.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Process result</span>
    <span class="hljs-comment">// Use `connection` to make more queries</span>
})
...
.catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
     <span class="hljs-comment">// handle errors</span>
}).finally(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    connection.close();
});
</code></pre>
<h2>finally()在同步代码中与finally {}类似</h2>
<p>在同步代码中，try语句由三部分组成：try子句，catch子句和finally子句。</p>
<p>在promise中：</p>
<ul>
<li>try子句大概相当于调用基于Promise的函数或调用.then()。</li>
<li>catch子句对应于Promises的.catch()方法。</li>
<li>finally子句对应于提案引入的新的Promise方法.finally()。</li>
</ul>
<h2>可用性</h2>
<ul>
<li>.finally()的polyfill <a href="https://github.com/es-shims/Promise.prototype.finally">promise.prototype.finally npm包</a></li>
<li>V8 5.8+（例如在Node.js 8.1.4+中）：可用的标记 --harmony-promise-finally（<a href="https://chromium.googlesource.com/v8/v8.git/+/18ad0f13afeaabff4e035fddd9edc3d319152160">详情</a>）</li>
</ul>
<h2>进一步阅读</h2>
<p>探索ES6 - 《<a href="http://exploringjs.com/es6/ch_promises.html">用于异步编程的Promises</a>》(译者注：翻译版《<a href="https://es6-org.github.io/exploring-es6/">探索ES6</a>》)</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/promise-prototype-finally-exploring-es2018-and-es2019](https://www.zcfy.cc/article/promise-prototype-finally-exploring-es2018-and-es2019)

## 原文标题
Promise.prototype.finally() • 探索 ES2018 和 ES2019
