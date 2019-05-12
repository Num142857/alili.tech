---
title: '从小小题目逐步走进 JavaScript 异步调用' 
date: 2018-12-28 2:30:10
hidden: true
slug: czezi6jzu5n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题</h2>
<blockquote><p>原题来自 <a href="/u/wangwenlin">@若泽</a> 的<a href="https://segmentfault.com/q/1010000011707211">提问</a>。</p></blockquote>
<p>可修改下面的 <code>aa()</code> 函数，目的是在一秒后用 <code>console.log()</code> 输出 <code>want-value</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aa() {
    setTimeout(function() {
        return &quot;want-value&quot;;
    }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"want-value"</span>;
    }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>但是，有额外要求：</p>
<ol>
<li>
<code>aa()</code> 函数可以随意修改，但是不能有 <code>console.log()</code>
</li>
<li>执行 <code>console.log()</code> 语句里不能有 <code>setTimeout</code> 包裹</li>
</ol>
<h2 id="articleHeader1">解答</h2>
<p>也许这是个面试题，管它呢。问题的主要目的是考察对异步调用执行结果的处理，既然是异步调用，那么<strong>不可能同步等待异步结果，结果一定是异步的</strong></p>
<p><code>setTimeout()</code> 经常用来模拟异步操作。最早，异步是通过回调来通知（调用）处理程序处理结果的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aa(callback) {
    setTimeout(function() {
        if (typeof callback === &quot;function&quot;) {
            callback(&quot;want-value&quot;);
        }
    }, 1000);
}

aa(function(v) {
    console.log(v);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params">callback</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">"function"</span>) {
            callback(<span class="hljs-string">"want-value"</span>);
        }
    }, <span class="hljs-number">1000</span>);
}

aa(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
    <span class="hljs-built_in">console</span>.log(v);
});</code></pre>
<p>不过回调在用于稍大型一点的异步应用时，容易出现多层嵌套，所以之后提出了一些对其进行“扁平”化，这一部分可以参考<a href="https://segmentfault.com/a/1190000003742890" target="_blank">闲谈异步调用“扁平”化</a>。当然 Promise 是非常流行的一种方法，并最终被 ES6 采纳。用 <a href="https://segmentfault.com/a/1190000003691961">Promise</a> 实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aa() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(&quot;want-value&quot;);
        }, 1000);
    });
}

aa().then(v => console.log(v));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve(<span class="hljs-string">"want-value"</span>);
        }, <span class="hljs-number">1000</span>);
    });
}

aa().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v));</code></pre>
<p>就这个例子来说，它和前面回调的例子大同小异。不过它会引出目前更推荐的一种方法——<a href="https://segmentfault.com/a/1190000007535316" target="_blank">async/await</a>，从 ES2017 开始支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aa() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(&quot;want-value&quot;);
        }, 1000);
    });
}

async function main() {
    const v = await aa();
    console.log(v);
}

main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve(<span class="hljs-string">"want-value"</span>);
        }, <span class="hljs-number">1000</span>);
    });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> v = <span class="hljs-keyword">await</span> aa();
    <span class="hljs-built_in">console</span>.log(v);
}

main();</code></pre>
<p><code>aa()</code> 的定义与 Promise 方法中的定义是一样的，但是在调用的时候，使用了 <code>await</code>，异步等待，等待到异步的结果之后，再使用 <code>console.log()</code> 对其进行处理。</p>
<p>这里需要注意的是 <code>await</code> 只能在 <code>async</code> 方法中使用，所以为了使用 <code>await</code> 必须定义一个 <code>async</code> 的 main 方法，并在全局作用域中调用。由于 main 方法是异步的（申明为 async)，所以如果 <code>main()</code> 调用之后还有其它语句，比如 <code>console.log("hello")</code>，那么这一句话会先执行。</p>
<p>async/await 语法让异步调用写起来像写同步代码，在编写代码的时候，可以避免逻辑跳跃，写起来会更轻松。（参考：<a href="https://segmentfault.com/a/1190000007987187">从地狱到天堂，Node 回调向 async/await 转变</a>）</p>
<p>当然，定义 <code>main()</code> 再调用 <code>main()</code> 这部分可以用 IIFE 封装一下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
    const v = await aa();
    console.log(v);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> v = <span class="hljs-keyword">await</span> aa();
    <span class="hljs-built_in">console</span>.log(v);
})();</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从小小题目逐步走进 JavaScript 异步调用

## 原文链接
[https://segmentfault.com/a/1190000011709671](https://segmentfault.com/a/1190000011709671)

