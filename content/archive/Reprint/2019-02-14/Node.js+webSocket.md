---
title: 'Node.js+webSocket' 
date: 2019-02-14 2:30:37
hidden: true
slug: 8oxqb9cqcw8
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入WebSocket模块
var ws = require('nodejs-websocket')
var PORT = 3030

var server = ws.createServer(function(conn){
    console.log('新连接')
    conn.on(&quot;text&quot;,function(str){
        console.log(&quot;接受数据&quot;+str)
        conn.sendText(&quot;返回数据：&quot;+str)
    })
    conn.on(&quot;close&quot;,function(code,reason){
        console.log(&quot;关闭连接&quot;)
    })
    conn.on(&quot;error&quot;,function(err){
        console.log(err)
    })
}).listen(PORT)

console.log('websocket 监听端口： ' + PORT)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入WebSocket模块</span>
<span class="hljs-keyword">var</span> ws = <span class="hljs-built_in">require</span>(<span class="hljs-string">'nodejs-websocket'</span>)
<span class="hljs-keyword">var</span> PORT = <span class="hljs-number">3030</span>

<span class="hljs-keyword">var</span> server = ws.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">conn</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'新连接'</span>)
    conn.on(<span class="hljs-string">"text"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"接受数据"</span>+str)
        conn.sendText(<span class="hljs-string">"返回数据："</span>+str)
    })
    conn.on(<span class="hljs-string">"close"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code,reason</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"关闭连接"</span>)
    })
    conn.on(<span class="hljs-string">"error"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
        <span class="hljs-built_in">console</span>.log(err)
    })
}).listen(PORT)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'websocket 监听端口： '</span> + PORT)</code></pre>
<p>github地址：<a href="https://github.com/Rossy11/node" rel="nofollow noreferrer" target="_blank">https://github.com/Rossy11/node</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js+webSocket

## 原文链接
[https://segmentfault.com/a/1190000016850510](https://segmentfault.com/a/1190000016850510)

