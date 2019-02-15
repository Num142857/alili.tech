---
title: 'Node.js+koa2' 
date: 2019-02-14 2:30:37
hidden: true
slug: zm1sfj5bkhd
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async (ctx) => {
    if (ctx.url === '/' &amp;&amp; ctx.method === 'GET') {
        let html = `
        <h2>This is demo</h2>
        <form method=&quot;POST&quot; action=&quot;/&quot;>
            <p>username:</p>
            <input name=&quot;username&quot;>
            <p>age:</p>
            <input name=&quot;age&quot;>
            <p>website</p>
            <input name=&quot;website&quot;>
            <button type=&quot;submit&quot;>submit</button>                 
        </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' &amp;&amp; ctx.method === 'POST') {
        let postData = ctx.request.body;
        ctx.body = postData
    } else {
        ctx.body = '<h2>Not find</h2>'
    }
})


app.listen(3000, () => {
    console.log('demo is run')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa-bodyparser'</span>)

app.<span class="hljs-keyword">use</span>(bodyParser())

app.<span class="hljs-keyword">use</span>(async (ctx) =&gt; {
    <span class="hljs-keyword">if</span> (ctx.url === <span class="hljs-string">'/'</span> &amp;&amp; ctx.method === <span class="hljs-string">'GET'</span>) {
        <span class="hljs-keyword">let</span> html = `
        &lt;h2&gt;This is demo&lt;/h2&gt;
        &lt;form method=<span class="hljs-string">"POST"</span> action=<span class="hljs-string">"/"</span>&gt;
            &lt;p&gt;username:&lt;/p&gt;
            &lt;input name=<span class="hljs-string">"username"</span>&gt;
            &lt;p&gt;age:&lt;/p&gt;
            &lt;input name=<span class="hljs-string">"age"</span>&gt;
            &lt;p&gt;website&lt;/p&gt;
            &lt;input name=<span class="hljs-string">"website"</span>&gt;
            &lt;button type=<span class="hljs-string">"submit"</span>&gt;submit&lt;/button&gt;                 
        &lt;/form&gt;
        `
        ctx.body = html
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ctx.url === <span class="hljs-string">'/'</span> &amp;&amp; ctx.method === <span class="hljs-string">'POST'</span>) {
        <span class="hljs-keyword">let</span> postData = ctx.request.body;
        ctx.body = postData
    } <span class="hljs-keyword">else</span> {
        ctx.body = <span class="hljs-string">'&lt;h2&gt;Not find&lt;/h2&gt;'</span>
    }
})


app.listen(<span class="hljs-number">3000</span>, () =&gt; {
    console.log(<span class="hljs-string">'demo is run'</span>)
})</code></pre>
<p>github地址：<a href="https://github.com/Rossy11/node" rel="nofollow noreferrer" target="_blank">https://github.com/Rossy11/node</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js+koa2

## 原文链接
[https://segmentfault.com/a/1190000016850448](https://segmentfault.com/a/1190000016850448)

