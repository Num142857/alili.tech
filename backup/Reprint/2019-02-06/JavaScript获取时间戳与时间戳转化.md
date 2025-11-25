---
title: 'JavaScript获取时间戳与时间戳转化' 
date: 2019-02-06 2:30:08
hidden: true
slug: nxf39czq8k
categories: [reprint]
---

{{< raw >}}

                    
<p>Javascript 获取当前时间戳（毫秒级别）：<br>第一种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp1 = Date.parse( new Date());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>var timestamp1 = <span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>( <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
</code></pre>
<p>结果：1470220594000</p>
<p>第二种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp2 = ( new Date()).valueOf();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> timestamp2 = ( <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>()).<span class="hljs-title">valueOf</span>();
</span></code></pre>
<p>结果：1470220608533</p>
<p>第三种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp3 = new Date().getTime();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> timestamp3 = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>().<span class="hljs-title">getTime</span>();
</span></code></pre>
<p>结果：1470220608533<br>第一种获取的时间戳是精确到秒，第二种和第三种是获取的时间戳精确到毫秒。</p>
<p>获取指定时间的时间戳：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date(&quot;2016-08-03 00:00:00&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2016-08-03 00:00:00"</span>);
</code></pre>
<p>时间戳转化成时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timetrans(date){
    var date = new Date(date*1000);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timetrans</span>(<span class="hljs-params">date</span>)</span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">date</span>*<span class="hljs-number">1000</span>);<span class="hljs-comment">//如果date为13位不需要乘1000</span>
    <span class="hljs-built_in">var</span> Y = <span class="hljs-built_in">date</span>.getFullYear() + <span class="hljs-string">'-'</span>;
    <span class="hljs-built_in">var</span> M = (<span class="hljs-built_in">date</span>.getMonth()+<span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span>+(<span class="hljs-built_in">date</span>.getMonth()+<span class="hljs-number">1</span>) : <span class="hljs-built_in">date</span>.getMonth()+<span class="hljs-number">1</span>) + <span class="hljs-string">'-'</span>;
    <span class="hljs-built_in">var</span> D = (<span class="hljs-built_in">date</span>.getDate() &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span> + (<span class="hljs-built_in">date</span>.getDate()) : <span class="hljs-built_in">date</span>.getDate()) + <span class="hljs-string">' '</span>;
    <span class="hljs-built_in">var</span> h = (<span class="hljs-built_in">date</span>.getHours() &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span> + <span class="hljs-built_in">date</span>.getHours() : <span class="hljs-built_in">date</span>.getHours()) + <span class="hljs-string">':'</span>;
    <span class="hljs-built_in">var</span> m = (<span class="hljs-built_in">date</span>.getMinutes() &lt;<span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span> + <span class="hljs-built_in">date</span>.getMinutes() : <span class="hljs-built_in">date</span>.getMinutes()) + <span class="hljs-string">':'</span>;
    <span class="hljs-built_in">var</span> s = (<span class="hljs-built_in">date</span>.getSeconds() &lt;<span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span> + <span class="hljs-built_in">date</span>.getSeconds() : <span class="hljs-built_in">date</span>.getSeconds());
    <span class="hljs-keyword">return</span> Y+M+D+h+m+s;
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript获取时间戳与时间戳转化

## 原文链接
[https://segmentfault.com/a/1190000006160703](https://segmentfault.com/a/1190000006160703)

