---
title: '从0开始构建自己的前端知识体系-浏览器-Session与Cookie' 
date: 2018-12-08 2:30:30
hidden: true
slug: t4gz9s2pm29
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><code>Session</code>和<code>Cookie</code>作为web开发中两个重要的"工具"，对其进行一次全面的了解是非常有必要的。（以下所说的内容都是基于web开发条件下的，Cookie本身是一个概念，Web Cookie只是其中的一种实现）</p>
<h2 id="articleHeader1">why Cookie, why Session</h2>
<ul>
<li>
<p>why Cookie</p>
<p>为什么我们要使用Cookie呢？众所周知，http是一种无状态的协议，也就是说，每次的HTTP请求对于服务器来说都是一个全新的请求，如果我们想携带一些客户之前的信息，如果不做任何操作是不可能实现的。</p>
<p>Cookie就是用来解决这个问题的，由服务端通过HTTP响应头Set-Cookie字段设置，客户端来存储，每次请求的时候依存于HTTP请求头部的Cookie字段，发送给后端当做一种状态。</p>
<ul><li>举个栗子，你开了一家炸鸡店，一天来了一个长得很好看的小姐姐，跟你说她要一份A套餐。那么我们可以发现，为了优化客户体验，每次只要小姐姐一进店，我们就可以直接给他一份A套餐，免去她点餐说话的时间。这时候我们送给小姐姐一个精致的蝴蝶发卡，让她戴在头上，以后无论谁在点餐，只要看到发卡，就是给他一份A套餐，那么这个发卡就是Cookie，记录了小姐姐的爱好是A套餐。</li></ul>
</li>
<li>
<p>why Session</p>
<p>那么为什么还有Session呢？Session其实是Cookie的一种具体实现。每次客户登录网站的时候，后台生成一个Session并设置一个过期时间，并用一个hash存储，在响应的HTTP请求里设置一个<code>会话阶段的Cookie</code>。下次后台如果接收的HTTP请求里的Cookie在hash里有对应，那么我们就认为这是一个已经登录的用户，直接为他提供服务。</p>
<ul>
<li>why 会话阶段Cookie<p>Cookie是有过期时长的，如果不设置的话那么就认为是会话阶段的Cookie，是存储在浏览器进程中的，如果我们关闭了浏览器，存储在浏览器进程中的Cookie自然已经被删除了，下一次发送HTTP请求的时候自然就不会带有Cookie，服务器发现头部没有Cookie，就会在服务器端重新生成一个Session并存储在hash中，而之前的那个对应的Session则会在过期时间到了之后自动删除。如果想做记住登录这种操作，那么需要设置一个过期时间，就会存储在客户端的硬盘中了。</p>
</li>
<li>再举个栗子，还是这个小姐姐，但是她并不愿意接受我们的发卡。作为一个万能的程序员，我们只能用一下高科技手段了，每当这个小姐姐进屋，我们就在她头顶全息投影一个发卡，无论点餐员是谁，也都可以直接给她一份A套餐，她离开的时候就取消掉投影。这个仅在店里有效的就好比一个Session</li>
</ul>
</li>
</ul>
<h2 id="articleHeader2">知识点梳理</h2>
<ul>
<li>Cookie是存储在客户端的，如果不设置过期时长，则是存储在浏览器进程中的，彻底退出浏览器后就该Cookie就会消失;设置了过期时长，是存储在客户端硬盘中的，在过期时间之前有效。</li>
<li>Session只是会话期Cookie的一种实现方式，在服务器端会存储一份hash列表保存，在浏览器端作为Cookie保存。</li>
<li>一般来说Session都是Http Only的Cookie，用来简单防范XSS攻击，因为js使用document.cookie无法获取Http Only的Cookie</li>
<li>当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端</li>
<li>Cookie 可以设置key=value，可以设置domain,path,expires,Secure,HttpOnly 具体可见MDN</li>
<li>http的站点无法使用Secure的Cookie</li>
</ul>
<h2 id="articleHeader3">js操作Cookie</h2>
<ul>
<li>github 8.9k的库 <a href="https://github.com/js-cookie/js-cookie" rel="nofollow noreferrer" target="_blank">js-cookie</a>
</li>
<li>
<p>简单封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cookie () {
  function read (name) {
    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return (match ? decodeURIComponent(match[3]) : null);
  }

  function write ({ name, value, expires, path, domain, secure }) {
    var cookie = [];
    cookie.push(name + '=' + encodeURIComponent(value));

    if (typeof expires === 'number') {
      cookie.push('expires=' + new Date(expires).toGMTString());
    }

    if (typeof path === 'string') {
      cookie.push('path=' + path);
    }

    if (typeof domain === 'string') {
      cookie.push('domain=' + domain);
    }

    if (secure === true) {
      cookie.push('secure');
    }

    document.cookie = cookie.join('; ');
  }

  function remove (name) {
    write({
      name: name,
      value: '',
      expires: Date.now() - 86400000
    });
  }

  return {
    read: read,
    write: write,
    remove: remove
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cookie</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">read</span> (<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> match = <span class="hljs-built_in">document</span>.cookie.match(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(^|;\\s*)('</span> + name + <span class="hljs-string">')=([^;]*)'</span>));
    <span class="hljs-keyword">return</span> (match ? <span class="hljs-built_in">decodeURIComponent</span>(match[<span class="hljs-number">3</span>]) : <span class="hljs-literal">null</span>);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">write</span> (<span class="hljs-params">{ name, value, expires, path, domain, secure }</span>) </span>{
    <span class="hljs-keyword">var</span> cookie = [];
    cookie.push(name + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(value));

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> expires === <span class="hljs-string">'number'</span>) {
      cookie.push(<span class="hljs-string">'expires='</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(expires).toGMTString());
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> path === <span class="hljs-string">'string'</span>) {
      cookie.push(<span class="hljs-string">'path='</span> + path);
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> domain === <span class="hljs-string">'string'</span>) {
      cookie.push(<span class="hljs-string">'domain='</span> + domain);
    }

    <span class="hljs-keyword">if</span> (secure === <span class="hljs-literal">true</span>) {
      cookie.push(<span class="hljs-string">'secure'</span>);
    }

    <span class="hljs-built_in">document</span>.cookie = cookie.join(<span class="hljs-string">'; '</span>);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span> (<span class="hljs-params">name</span>) </span>{
    write({
      <span class="hljs-attr">name</span>: name,
      <span class="hljs-attr">value</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">expires</span>: <span class="hljs-built_in">Date</span>.now() - <span class="hljs-number">86400000</span>
    });
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">read</span>: read,
    <span class="hljs-attr">write</span>: write,
    <span class="hljs-attr">remove</span>: remove
  }
}
</code></pre>
</li>
</ul>
<h2 id="articleHeader4">参考</h2>
<ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies</a></li></ul>
<p>如果喜欢可以star一下，以后会不断更新<a href="https://github.com/KedAyAyA/frontend-knowledge-structure/blob/master/browser/Session%26Cookie.md" rel="nofollow noreferrer" target="_blank">github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0开始构建自己的前端知识体系-浏览器-Session与Cookie

## 原文链接
[https://segmentfault.com/a/1190000014075197](https://segmentfault.com/a/1190000014075197)

