---
title: 'co.js - 让异步代码同步化' 
date: 2019-02-02 2:30:11
hidden: true
slug: l6tt5znfp4r
categories: [reprint]
---

{{< raw >}}

                    
<p>近期在全力开发个人网站，并且又沉淀了一些前后端的技术。近期会频繁更新。</p>
<p>这篇文章首发于我的个人网站：<a href="https://tasaid.com/blog/20161001004211.html?sgs=sf" rel="nofollow noreferrer" target="_blank">听说 - https://tasaid.com</a>，建议在我的个人网站阅读，拥有更好的阅读体验。</p>
<p>这篇文章与 博客园 和 Segmentfault 共享。</p>
<blockquote><p>前端开发QQ群：377786580</p></blockquote>
<p><a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co</a> 是 <a href="https://github.com/tj" rel="nofollow noreferrer" target="_blank">TJ</a> 大神所编写的 JavaScript 异步解决方案的库，用于让异步的代码 "同步化"。</p>
<p>它构建在以下两个基础上，这篇文章不会详细讲解这 2 个知识点：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators" rel="nofollow noreferrer" target="_blank">ES6 - generator</a></p></li>
<li><p><a href="https://github.com/linkFly6/Promise" rel="nofollow noreferrer" target="_blank">ES6 - Promise</a></p></li>
</ul>
<h2 id="articleHeader0">Generator 和 co</h2>
<p>首先我们简单了解下 <code>generator</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个 generators
function* foo(){
    yield console.log(&quot;bar&quot;);
    yield console.log(&quot;baz&quot;);
}

var g = foo();
g.next(); // prints &quot;bar&quot;
g.next(); // prints &quot;baz&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义一个 generators</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"bar"</span>);
    <span class="hljs-keyword">yield</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"baz"</span>);
}

<span class="hljs-keyword">var</span> g = foo();
g.next(); <span class="hljs-comment">// prints "bar"</span>
g.next(); <span class="hljs-comment">// prints "baz"</span></code></pre>
<p>简单来说，<code>generator</code> 实现了状态暂停/函数暂停 —— 通过 <code>yield</code> 关键字暂停函数，并返回当前函数的状态。</p>
<p><code>co</code> 实现了 <code>generator</code> 的 <strong>自动执行</strong>，我们使用 <code>co</code> 和 <code>Promise</code> 修改上面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('co');

function* foo() {
    yield Promise.resolve(console.log(&quot;bar&quot;));
    yield Promise.resolve(console.log(&quot;baz&quot;));
}

var co = require('co');
co(foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"bar"</span>));
    <span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"baz"</span>));
}

<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);
co(foo);</code></pre>
<p>有人可能要说 "我自己写个循环执行 next 不也可以么？ 为什么一个循环还要依赖一个库？"</p>
<p><code>co</code> 有个使用条件：<code>generator</code> 函数的 <code>yield</code> 命令后面，只能是 <a href="http://www.ruanyifeng.com/blog/2015/05/thunk.html" rel="nofollow noreferrer" target="_blank">Thunk</a> 函数或 <code>Promise</code> 对象。</p>
<p>正是这个条件，让 <code>co</code> 强悍无比。</p>
<h2 id="articleHeader1">Callback</h2>
<p>我们一步一步来看异步，首先使用 <code>回调函数/Callback</code> 的方式封装一个常见的 <code>ajax</code> 异步任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(q, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
            callback(xhr.responseText);
        }
    }
    xhr.open(&quot;GET&quot;, &quot;query?q=&quot; + q);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">q, callback</span>) </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
            callback(xhr.responseText);
        }
    }
    xhr.open(<span class="hljs-string">"GET"</span>, <span class="hljs-string">"query?q="</span> + q);
}</code></pre>
<p>我们使用 <code>回调函数</code> 的方式连续发  2 条请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax('foo', function (foo) {
    console.log(foo);
    ajax('bar', function (bar) {
        console.log(bar);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ajax(<span class="hljs-string">'foo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">foo</span>) </span>{
    <span class="hljs-built_in">console</span>.log(foo);
    ajax(<span class="hljs-string">'bar'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">bar</span>) </span>{
        <span class="hljs-built_in">console</span>.log(bar);
    });
});</code></pre>
<p>这是 js 中最典型的异步处理方案。</p>
<h2 id="articleHeader2">Promise</h2>
<p>再使用 Promise 封装异步 ajax，让回调函数扁平化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(q, callback) {
    // 使用 Promise 封装
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open(&quot;GET&quot;, &quot;query?q=&quot; + q);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">q, callback</span>) </span>{
    <span class="hljs-comment">// 使用 Promise 封装</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
        xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
                resolve(xhr.responseText);
            }
        }
        xhr.open(<span class="hljs-string">"GET"</span>, <span class="hljs-string">"query?q="</span> + q);
    });
}</code></pre>
<p>然后修改请求代码，扁平化异步代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax('foo')
    .then(function (foo) {
        console.log(foo);
        return ajax('bar')
    })
    .then(function (bar) {
        console.log(bar);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ajax(<span class="hljs-string">'foo'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">foo</span>) </span>{
        <span class="hljs-built_in">console</span>.log(foo);
        <span class="hljs-keyword">return</span> ajax(<span class="hljs-string">'bar'</span>)
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">bar</span>) </span>{
        <span class="hljs-built_in">console</span>.log(bar);
    });</code></pre>
<h2 id="articleHeader3">co</h2>
<p>最后，让我们见一下 <code>co</code> 的强悍之处吧。我们使用 <code>co.js</code> 来修改请求代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('co');

co(function* () {
    var foo = yield ajax('foo');
    console.log(foo);

    var bar = yield ajax('bar');
    console.log(bar);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'foo'</span>);
    <span class="hljs-built_in">console</span>.log(foo);

    <span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">yield</span> ajax(<span class="hljs-string">'bar'</span>);
    <span class="hljs-built_in">console</span>.log(bar);
});
</code></pre>
<p>最终我们的异步任务，在代码中同步化了。</p>
<p>对于异步代码来说，回调函数是最基础的方案，带来的弊端也显而易见。<code>Promise</code> 让代码扁平化，而 <code>co</code> 让代码同步化。</p>
<p>这篇文章首发于我的个人网站：<a href="https://tasaid.com/blog/20161001004211.html?sgs=sf" rel="nofollow noreferrer" target="_blank">听说 - https://tasaid.com</a>，建议在我的个人网站阅读，拥有更好的阅读体验。</p>
<p>这篇文章与 博客园 和 Segmentfault 共享。</p>
<blockquote><p>前端开发QQ群：377786580</p></blockquote>
<h2 id="articleHeader4">参考和引用</h2>
<ul>
<li><p><a href="https://github.com/linkFly6/Promise" rel="nofollow noreferrer" target="_blank">Promise.js</a></p></li>
<li><p><a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">Github - TJ Holowaychuk - co.js</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/05/co.html" rel="nofollow noreferrer" target="_blank">co 函数库的含义和用法</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/05/thunk.html" rel="nofollow noreferrer" target="_blank">Thunk 函数的含义和用法</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators" rel="nofollow noreferrer" target="_blank">MDN - 迭代器和生成器</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
co.js - 让异步代码同步化

## 原文链接
[https://segmentfault.com/a/1190000007057045](https://segmentfault.com/a/1190000007057045)

