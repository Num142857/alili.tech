---
title: '温故js系列（3）-cookie优缺点&设置获取删除cookie' 
date: 2019-02-07 2:30:16
hidden: true
slug: 6o933yjejgp
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/4" rel="nofollow noreferrer" target="_blank">cookie</a></p>
<h2 id="articleHeader0">JavaScript--cookie</h2>
<p>cookie可以像身份证一样在客户端请求服务器的时候确定信息。也可以在客户端分担服务端的压力，做很多判断和存储信息。</p>
<h3 id="articleHeader1">cookie 优缺点</h3>
<p>优点：<br>1.只在cookie中存放不敏感数据，即使被盗也不会有重大损失。<br>2.控制cookie的生命期，使之不会永远有效。就算被盗了偷盗者很可能拿到的是一个过期的cookie。<br>3.cookie帮助服务端承担了很大的压力，可以利用cookie在和客户端做很多判断而不应经过服务端。<br>4.极高的扩展性和可用性，使用简单，操作方法方便<br>缺点：<br>1.cookie数量和长度的限制。每个cookie长度不能超过4KB，否则会被截掉。IE下每个domain最多只能有50条cookie（IE6是20条），Firefox最多50个cookie，chrome和Safari没有做硬性限制，IE和Opera 会清理近期最少使用的cookie，Firefox会随机清理cookie。<br>2.安全性问题。这是cookie一个隐患，如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。<br>3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。所以还是有一定的局限性。</p>
<h3 id="articleHeader2">设置cookie</h3>
<p>一般主要设置cookie名字和值、cookie有效期、路径、域名、是否安全传输。<br>原生方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie=&quot;key=&quot;+value;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;">document.cookie=<span class="hljs-string">"key="</span>+<span class="hljs-keyword">value</span>;</code></pre>
<p>封装方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(key, value, expires, path, domain, secure) {     
    var cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value);     
    if (expires instanceof Date) {         
        cookieText += '; expires=' + expires;     
    }     
    if (path) {         
        cookieText += '; expires=' + expires;     
    }     
    if (domain) {         
        cookieText += '; domain=' + domain;     
    }     
    if (secure) {         
        cookieText += '; secure';     
    }     
    document.cookie = cookieText; 
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">key, value, expires, path, domain, secure</span>) </span>{     
    <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(value);     
    <span class="hljs-keyword">if</span> (expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {         
        cookieText += <span class="hljs-string">'; expires='</span> + expires;     
    }     
    <span class="hljs-keyword">if</span> (path) {         
        cookieText += <span class="hljs-string">'; expires='</span> + expires;     
    }     
    <span class="hljs-keyword">if</span> (domain) {         
        cookieText += <span class="hljs-string">'; domain='</span> + domain;     
    }     
    <span class="hljs-keyword">if</span> (secure) {         
        cookieText += <span class="hljs-string">'; secure'</span>;     
    }     
    <span class="hljs-built_in">document</span>.cookie = cookieText; 
} 
</code></pre>
<p>JQuery方法（JQuery没有封装cookie方法，需要下载基于JQuery的插件jquery.cookie.js）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.cookie('key','value',{
    expires：7,
    path：'/',
    domain: 'xxx.com',
    secure: false
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$.</span>cookie(<span class="hljs-string">'key'</span>,<span class="hljs-string">'value'</span>,{
    expires：<span class="hljs-number">7</span>,
    path：<span class="hljs-string">'/'</span>,
    <span class="hljs-symbol">domain:</span> <span class="hljs-string">'xxx.com'</span>,
    <span class="hljs-symbol">secure:</span> <span class="hljs-keyword">false</span>
});
</code></pre>
<h3 id="articleHeader3">获取cookie</h3>
<p>原生方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cookieStr = document.cookie;  //cookieStr=='username=Xzavier;password=123456;sex=man'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> cookieStr = <span class="hljs-built_in">document</span>.cookie;  <span class="hljs-comment">//cookieStr=='username=Xzavier;password=123456;sex=man'</span></code></pre>
<p>这样获得了所有的cookie，是一个字符串。根据需要选取，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var username=document.cookie.split(&quot;;&quot;)[0].split(&quot;=&quot;)[1];
var password=document.cookie.split(&quot;;&quot;)[1].split(&quot;=&quot;)[1];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> username=document.cookie.<span class="hljs-built_in">split</span>(<span class="hljs-string">";"</span>)[<span class="hljs-number">0</span>].<span class="hljs-built_in">split</span>(<span class="hljs-string">"="</span>)[<span class="hljs-number">1</span>];
<span class="hljs-built_in">var</span> password=document.cookie.<span class="hljs-built_in">split</span>(<span class="hljs-string">";"</span>)[<span class="hljs-number">1</span>].<span class="hljs-built_in">split</span>(<span class="hljs-string">"="</span>)[<span class="hljs-number">1</span>];
</code></pre>
<p>封装方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCookie(key) {     
    var cookieName = encodeURIComponent(key) + '=';     
    var cookieStart = document.cookie.indexOf(cookieName);     
    var cookieValue = null;     
    if (cookieStart > -1) {         
        var cookieEnd = document.cookie.indexOf(';', cookieStart);         
        if (cookieEnd == -1) {             
            cookieEnd = document.cookie.length;         
        }         
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));     
    }     
    return cookieValue; 
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">key</span>) </span>{     
    <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">'='</span>;     
    <span class="hljs-keyword">var</span> cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName);     
    <span class="hljs-keyword">var</span> cookieValue = <span class="hljs-literal">null</span>;     
    <span class="hljs-keyword">if</span> (cookieStart &gt; <span class="hljs-number">-1</span>) {         
        <span class="hljs-keyword">var</span> cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">';'</span>, cookieStart);         
        <span class="hljs-keyword">if</span> (cookieEnd == <span class="hljs-number">-1</span>) {             
            cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;         
        }         
        cookieValue = <span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-built_in">document</span>.cookie.substring(cookieStart + cookieName.length, cookieEnd));     
    }     
    <span class="hljs-keyword">return</span> cookieValue; 
} 
</code></pre>
<p>JQuery方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.cookie(‘key’); //value?value:null
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$.</span>cookie(‘key’); <span class="hljs-regexp">//value</span>?<span class="hljs-symbol">value:</span>null
</code></pre>
<h3 id="articleHeader4">删除cookie</h3>
<p>原生方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;key=value;expires=&quot; + new Date(0); //时间可以是现在以及现在之前" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">"key=value;expires="</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">//时间可以是现在以及现在之前</span></code></pre>
<p>封装方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unsetCookie(key) {     
    document.cookie = key + &quot;= ; expires=&quot; + new Date(0); 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsetCookie</span>(<span class="hljs-params">key</span>) </span>{     
    <span class="hljs-built_in">document</span>.cookie = key + <span class="hljs-string">"= ; expires="</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>); 
} </code></pre>
<p>JQuery方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.cookie(‘key’,null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">$.cookie(‘<span class="hljs-built_in">key</span>’,<span class="hljs-built_in">null</span>);</code></pre>
<p>其他参数设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.cookie(&quot;key&quot;, value, {
    expires: new Date(0),
    path: '/',
    domain: 'xxx.com'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.cookie(<span class="hljs-string">"key"</span>, value, {
    <span class="hljs-attr">expires</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>),
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">domain</span>: <span class="hljs-string">'xxx.com'</span>
});
</code></pre>
<p>cookie在持久保存客户端数据提供了方便，分担了服务器存储的负担，虽然有局限性，但是不可替代的。使用的方法也非常简单，但平时使用cookie的时候也需要多多注意安全性。</p>
<p>jquery.cookie.js下载：<a href="http://plugins.jquery.com/cookie/" rel="nofollow noreferrer" target="_blank">jquery.cookie.js</a><br>cookie弊端参考：<a href="http://blog.csdn.net/sinat_30915447/article/details/50270171" rel="nofollow noreferrer" target="_blank">cookie弊端</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（3）-cookie优缺点&设置获取删除cookie

## 原文链接
[https://segmentfault.com/a/1190000005894851](https://segmentfault.com/a/1190000005894851)

