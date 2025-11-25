---
title: '客户端数据存储----Cookie From 《高程3》' 
date: 2019-02-02 2:30:10
hidden: true
slug: 1d3w6av0i92
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本篇主要介绍Cookie技术的读书总结，但是我认为逻辑上最好会和Web Storage技术放在一起进行对比，因此后续会再总结一篇关于WEB存储的姊妹总结，敬请期待。</p>
<p>首先先来一段<strong>总结</strong>：Cookie用于本地数据存储，出现在服务器和浏览器交互的响应Set-Cookie头部和请求Cookie头部中，受到单域名下Cookie的数量、单个Cookie大小、性能、安全限制。子Cookie技术的出现缓解了单域名下Cookie的数量限制，关于子Cookie有一整套工具函数可以使用。</p>
<h2 id="articleHeader1">HTTP Cookie 简介</h2>
<p>用户的信息最好存储在客户端上，这就对客户端数据存储提出了要求。最早的解决方式就是Cookie。HTTP Cookie，通常直接叫做 cookie，最初是在客户端用于存储会话信息的。该标准要求服务器对任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。</p>
<p>一个典型的响应头部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">Content-type</span>: text/html
<span class="hljs-attribute">Set-Cookie</span>: name=value
<span class="hljs-attribute">Other-header</span>: other-header-value
</code></pre>
<p>这个 HTTP 响应设置以 name 为名称、以 value 为值的一个 cookie，名称和值在传送时都必须是URL 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 Cookie 头将信息发送回服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/index.html</span> HTTP/1.1
<span class="hljs-attribute">Cookie</span>: name=value
<span class="hljs-attribute">Other-header</span>: other-header-value
</code></pre>
<h2 id="articleHeader2">Cookie的访问、数量和大小限制</h2>
<p>cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时，都会包含这个 cookie。这个限制确保了储存在 cookie 中的信息只能让批准的接受者访问，而无法被其他域访问。</p>
<p>由于 cookie 是存在客户端计算机上的，还加入了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间。每个域的 cookie 总数是有限的，不过浏览器之间各有不同：<br>1）IE6 以及更低版本限制每个域名最多 20 个 cookie。<br>2）IE7 和之后版本每个域名最多 50 个。 IE7 最初是支持每个域名最大 20 个 cookie，之后被微软的一个补丁所更新。<br>3）Firefox 限制每个域最多 50 个 cookie。<br>4）Opera 限制每个域最多 30 个 cookie。<br>5）Safari 和 Chrome 对于每个域的 cookie 数量限制没有硬性规定。</p>
<p>当超过单个域名限制之后还要再设置 cookie，浏览器就会清除以前设置的 cookie。 IE 和 Opera 会删除最近最少使用过的（LRU， Least Recently Used） cookie，腾出空间给新设置的 cookie。 Firefox 看上去好像是随机决定要清除哪个 cookie，所以考虑 cookie 限制非常重要，以免出现不可预期的后果。</p>
<p>浏览器中对于 cookie 的尺寸也有限制。大多数浏览器都有大约 4096B（加减 1）的长度限制。为了最佳的浏览器兼容性，最好将整个 cookie 长度限制在 4095B（含 4095）以内。尺寸限制影响到一个域下所有的 cookie，而并非每个 cookie 单独限制。如果你尝试创建超过最大尺寸限制的 cookie，那么该 cookie 会被悄无声息地丢掉。</p>
<h2 id="articleHeader3">cookie 的构成</h2>
<p>1）名称：一个唯一确定 cookie 的名称。cookie 名称是不区分大小写的。cookie 的名称必须是经过 URL 编码的。<br>2）值：储存在 cookie 中的字符串值。值必须被 URL 编码。<br>3）域： cookie 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 cookie 信息。<br>4）路径：对于指定域中的那个路径，应该向服务器发送 cookie。<br>5）失效时间：表示 cookie 何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个cookie）。默认情况下，浏览器会话结束时即将所有 cookie 删除；不过也可以自己设置删除时间。这个值是个 GMT 格式的日期（Wdy, DD-Mon-YYYY HH:MM:SS GMT），用于指定应该删除cookie 的准确时间。因此， cookie 可在浏览器关闭后依然保存在用户的机器上。如果你设置的失效日期是个以前的时间，则 cookie 会被立刻删除。<br>6）安全标志：指定后， cookie 只有在使用 SSL 连接的时候才发送到服务器。例如， cookie 信息只能发送给 <a href="https://www.wrox.com" rel="nofollow noreferrer" target="_blank">https://www.wrox.com</a>，而 <a href="http://www.wrox.com" rel="nofollow noreferrer" target="_blank">http://www.wrox.com</a> 的请求则不能发送 cookie。</p>
<p>每一段信息都作为 Set-Cookie 头的一部分，使用分号加空格分隔每一段。secure 标志是 cookie 中唯一一个非名值对儿的部分，直接包含一个 secure 单词。尤其要注意，域、路径、失效时间和 secure 标志都是服务器给浏览器的指示（是从服务器发回的响应），以指定何时应该发送 cookie。这些参数并不会作为发送到服务器的 cookie 信息的一部分，只有名值对儿才会被发送到服务器。</p>
<p>设置 cookie 的格式如下，和 Set-Cookie 头中使用的格式一样，如下：<br>name=value; expires=expiration_time; path=domain_path;<br>domain=domain_name; secure</p>
<h2 id="articleHeader4">创建、删除和访问Cookie的工具函数</h2>
<p>由于 JavaScript 中读写 cookie 不是非常直观，常常需要写一些函数来简化 cookie 的功能。基本的cookie 操作有三种：读取、写入和删除。创建cookie的工具函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var CookieUtil = {
    get: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
    cookieStart = document.cookie.indexOf(cookieName),
    cookieValue = null;
    if (cookieStart > - 1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == - 1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
      + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' +
    encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) { //secure在这里是布尔值
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }

};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> CookieUtil = {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span>,
    cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName),
    cookieValue = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">if</span> (cookieStart &gt; - <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">var</span> cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">';'</span>, cookieStart);
      <span class="hljs-keyword">if</span> (cookieEnd == - <span class="hljs-number">1</span>) {
        cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;
      }
      cookieValue = <span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-built_in">document</span>.cookie.substring(cookieStart
      + cookieName.length, cookieEnd));
    }
    <span class="hljs-keyword">return</span> cookieValue;
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, value, expires, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span> +
    <span class="hljs-built_in">encodeURIComponent</span>(value);
    <span class="hljs-keyword">if</span> (expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
      cookieText += <span class="hljs-string">'; expires='</span> + expires.toGMTString();
    }
    <span class="hljs-keyword">if</span> (path) {
      cookieText += <span class="hljs-string">'; path='</span> + path;
    }
    <span class="hljs-keyword">if</span> (domain) {
      cookieText += <span class="hljs-string">'; domain='</span> + domain;
    }
    <span class="hljs-keyword">if</span> (secure) { <span class="hljs-comment">//secure在这里是布尔值</span>
      cookieText += <span class="hljs-string">'; secure'</span>;
    }
    <span class="hljs-built_in">document</span>.cookie = cookieText;
  },
  <span class="hljs-attr">unset</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">this</span>.set(name, <span class="hljs-string">''</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>), path, domain, secure);
  }

};
</code></pre>
<p><strong>CookieUtil.get()</strong>方法根据 cookie 的名字获取相应的值。它会在 document.cookie 字符串中查找 cookie 名加上等于号的位置。如果找到了，那么使用 indexOf()查找该位置之后的第一个分号（表示了该 cookie 的结束位置）。如果没有找到分号，则表示该 cookie 是字符串中的最后一个，则余下的字符串都是 cookie 的值。该值使用 decodeURIComponent()进行解码并最后返回。如果没有发现 cookie，则返回 null。<br><strong>CookieUtil.set()</strong>方法在页面上设置一个 cookie，接收如下几个参数： cookie 的名称， cookie 的值，可选的用于指定 cookie 何时应被删除的 Date 对象， cookie 的可选的 URL 路径，可选的域，以及可选的表示是否要添加 secure 标志的布尔值。参数是按照它们的使用频率排列的，只有头两个是必需的。在这个方法中，名称和值都使用encodeURIComponent()进行了URL编码，并检查其他选项。如果expires参数是 Date 对象，那么会使用 Date 对象的 toGMTString()方法正确格式化 Date 对象，并添加到expires 选项上。方法的其他部分就是构造 cookie 字符串并将其设置到 document.cookie 中。<br>没有删除已有 cookie 的直接方法。所以，需要使用相同的路径、域和安全选项再次设置 cookie，并将失效时间设置为过去的时间。 <strong>CookieUtil.unset()</strong>方法可以处理这种事情。它接收 4 个参数：要删除的 cookie 的名称、可选的路径参数、可选的域参数和可选的安全参数。这些参数加上空字符串并设置失效时间为 1970 年 1 月 1 日（初始化为 0ms 的 Date 对象的值），传给 CookieUtil.set()。这样就能确保删除 cookie。</p>
<h2 id="articleHeader5">FireBug测试结果</h2>
<p>FireBug对应哪个页面，设置的cookie就存储在那个页面对应的域。打开本地apache服务器的/localhost/alien/页面，在其中打开firebug。<br>测试实例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    CookieUtil.set(&quot;name&quot;, &quot;Nicholas&quot;);
    CookieUtil.set(&quot;book&quot;, &quot;Professional JavaScript&quot;);
    //读取 cookie 的值
    console.log(CookieUtil.get(&quot;name&quot;)); //&quot;Nicholas&quot;
    console.log(CookieUtil.get(&quot;book&quot;)); //&quot;Professional JavaScript&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>    CookieUtil.<span class="hljs-built_in">set</span>(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Nicholas"</span>);
    CookieUtil.<span class="hljs-built_in">set</span>(<span class="hljs-string">"book"</span>, <span class="hljs-string">"Professional JavaScript"</span>);
    <span class="hljs-comment">//读取 cookie 的值</span>
    console.<span class="hljs-built_in">log</span>(CookieUtil.<span class="hljs-built_in">get</span>(<span class="hljs-string">"name"</span>)); <span class="hljs-comment">//"Nicholas"</span>
    console.<span class="hljs-built_in">log</span>(CookieUtil.<span class="hljs-built_in">get</span>(<span class="hljs-string">"book"</span>)); <span class="hljs-comment">//"Professional JavaScript"</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEm7H?w=791&amp;h=110" src="https://static.alili.tech/img/bVEm7H?w=791&amp;h=110" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>测试实例2 删除cookie：<br>CookieUtil.unset("name");<br>CookieUtil.unset("book");<br>此时FireBug中不显示任何Cookie。</p>
<p>测试实例3 打开本地服务器localhost主页，设置安全的cookie。<br>CookieUtil.set("name","Nicholas", null, null, null, true);<br>console.log(CookieUtil.get("name"));<br>设置secure为true时，前面缺少的参数都定义为null。这是因为JavaScript会按照顺序对应参数。<br><span class="img-wrap"><img data-src="/img/bVEm8b?w=790&amp;h=99" src="https://static.alili.tech/img/bVEm8b?w=790&amp;h=99" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>测试结果：安全项显示“安全”。</p>
<h2 id="articleHeader6">子Cookie</h2>
<p>子Cookie的目的是为了突破单域名下的Cookie数量限制，也就是在一个Cookie中存储多个名值对，常见格式如下：<br>name=name1=value1&amp;name2=value2&amp;name3=value3&amp;name4=value4&amp;name5=value5</p>
<p>关于子Cookie的设置、获取和删除有以下工具函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SubCookieUtil = {
  get: function (name, subName) {
    var subCookies = this.getAll(name);
    if (subCookies) {
      return subCookies[subName];
    } else {
      return null;
    }
  },
  getAll: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
    cookieStart = document.cookie.indexOf(cookieName),
    cookieValue = null,
    cookieEnd,
    subCookies,
    i,
    parts,
    result = {
    };
    if (cookieStart > - 1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == - 1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = document.cookie.substring(cookieStart +
      cookieName.length, cookieEnd);
      if (cookieValue.length > 0) {
        subCookies = cookieValue.split('&amp;');
        for (i = 0, len = subCookies.length; i < len; i++) {
          parts = subCookies[i].split('=');
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return result;
      }
    }
    return null;
  },
  set: function (name, subName, value, expires, path, domain, secure) {
    var subcookies = this.getAll(name) || {
    };
    subcookies[subName] = value;
    this.setAll(name, subcookies, expires, path, domain, secure);
  },
  setAll: function (name, subcookies, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=',
    subcookieParts = new Array(),
    subName;
    for (subName in subcookies) {
      //由于采用push方法，新的子Cookie被延续到原来的Cookie中
      if (subName.length > 0 &amp;&amp; subcookies.hasOwnProperty(subName)) {
        subcookieParts.push(encodeURIComponent(subName) + '=' +
        encodeURIComponent(subcookies[subName]));
      }
    }
    if (subcookieParts.length > 0) {
      cookieText += subcookieParts.join('&amp;');
      if (expires instanceof Date) {
        cookieText += '; expires=' + expires.toGMTString();
      }
      if (path) {
        cookieText += '; path=' + path;
      }
      if (domain) {
        cookieText += '; domain=' + domain;
      }
      if (secure) {
        cookieText += '; secure';
      }
    } else {
      cookieText += '; expires=' + (new Date(0)).toGMTString();
    }
    document.cookie = cookieText;
  },
  unset: function (name, subName, path, domain, secure) {
    var subcookies = this.getAll(name);
    if (subcookies) {
      delete subcookies[subName];
      this.setAll(name, subcookies, null, path, domain, secure);
    }
  },
  unsetAll: function (name, path, domain, secure) {
    this.setAll(name, null, new Date(0), path, domain, secure);
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> SubCookieUtil = {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, subName</span>) </span>{
    <span class="hljs-keyword">var</span> subCookies = <span class="hljs-keyword">this</span>.getAll(name);
    <span class="hljs-keyword">if</span> (subCookies) {
      <span class="hljs-keyword">return</span> subCookies[subName];
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
  },
  <span class="hljs-attr">getAll</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span>,
    cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName),
    cookieValue = <span class="hljs-literal">null</span>,
    cookieEnd,
    subCookies,
    i,
    parts,
    result = {
    };
    <span class="hljs-keyword">if</span> (cookieStart &gt; - <span class="hljs-number">1</span>) {
      cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">';'</span>, cookieStart);
      <span class="hljs-keyword">if</span> (cookieEnd == - <span class="hljs-number">1</span>) {
        cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;
      }
      cookieValue = <span class="hljs-built_in">document</span>.cookie.substring(cookieStart +
      cookieName.length, cookieEnd);
      <span class="hljs-keyword">if</span> (cookieValue.length &gt; <span class="hljs-number">0</span>) {
        subCookies = cookieValue.split(<span class="hljs-string">'&amp;'</span>);
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, len = subCookies.length; i &lt; len; i++) {
          parts = subCookies[i].split(<span class="hljs-string">'='</span>);
          result[<span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">0</span>])] = <span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">1</span>]);
        }
        <span class="hljs-keyword">return</span> result;
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, subName, value, expires, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">var</span> subcookies = <span class="hljs-keyword">this</span>.getAll(name) || {
    };
    subcookies[subName] = value;
    <span class="hljs-keyword">this</span>.setAll(name, subcookies, expires, path, domain, secure);
  },
  <span class="hljs-attr">setAll</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, subcookies, expires, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span>,
    subcookieParts = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(),
    subName;
    <span class="hljs-keyword">for</span> (subName <span class="hljs-keyword">in</span> subcookies) {
      <span class="hljs-comment">//由于采用push方法，新的子Cookie被延续到原来的Cookie中</span>
      <span class="hljs-keyword">if</span> (subName.length &gt; <span class="hljs-number">0</span> &amp;&amp; subcookies.hasOwnProperty(subName)) {
        subcookieParts.push(<span class="hljs-built_in">encodeURIComponent</span>(subName) + <span class="hljs-string">'='</span> +
        <span class="hljs-built_in">encodeURIComponent</span>(subcookies[subName]));
      }
    }
    <span class="hljs-keyword">if</span> (subcookieParts.length &gt; <span class="hljs-number">0</span>) {
      cookieText += subcookieParts.join(<span class="hljs-string">'&amp;'</span>);
      <span class="hljs-keyword">if</span> (expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
        cookieText += <span class="hljs-string">'; expires='</span> + expires.toGMTString();
      }
      <span class="hljs-keyword">if</span> (path) {
        cookieText += <span class="hljs-string">'; path='</span> + path;
      }
      <span class="hljs-keyword">if</span> (domain) {
        cookieText += <span class="hljs-string">'; domain='</span> + domain;
      }
      <span class="hljs-keyword">if</span> (secure) {
        cookieText += <span class="hljs-string">'; secure'</span>;
      }
    } <span class="hljs-keyword">else</span> {
      cookieText += <span class="hljs-string">'; expires='</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>)).toGMTString();
    }
    <span class="hljs-built_in">document</span>.cookie = cookieText;
  },
  <span class="hljs-attr">unset</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, subName, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">var</span> subcookies = <span class="hljs-keyword">this</span>.getAll(name);
    <span class="hljs-keyword">if</span> (subcookies) {
      <span class="hljs-keyword">delete</span> subcookies[subName];
      <span class="hljs-keyword">this</span>.setAll(name, subcookies, <span class="hljs-literal">null</span>, path, domain, secure);
    }
  },
  <span class="hljs-attr">unsetAll</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, domain, secure</span>) </span>{
    <span class="hljs-keyword">this</span>.setAll(name, <span class="hljs-literal">null</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>), path, domain, secure);
  }
};
</code></pre>
<p>以下是对上述方法的解析：<br>获取子 cookie 的方法有两个： <strong>get()和 getAll()</strong>。其中 get()获取单个子 cookie 的值， getAll()获取所有子 cookie 并将它们放入一个对象中返回，对象的属性为子 cookie 的名称，对应值为子 cookie对应的值。 get()方法接收两个参数： cookie 的名字和子 cookie 的名字。它其实就是调用 getAll()获取所有的子 cookie，然后只返回所需的那一个（如果 cookie 不存在则返回 null）。</p>
<p><strong>SubCookieUtil.getAll()方法和 CookieUtil.get()</strong>在解析 cookie 值的方式上非常相似。区别在于 cookie 的值并非立即解码，而是先根据&amp;字符将子 cookie 分割出来放在一个数组中，每一个子 cookie再根据等于号分割，这样在 parts 数组中的前一部分便是子 cookie 名，后一部分则是子 cookie 的值。这两个项目都要使用 decodeURIComponent()来解码，然后放入 result 对象中，最后作为方法的返回值。如果 cookie 不存在，则返回 null。</p>
<p><strong>set()方法</strong>接收 7 个参数： cookie 名称、子 cookie 名称、子 cookie 值、可选的 cookie 失效日期或时间的 Date 对象、可选的 cookie 路径、可选的 cookie 域和可选的布尔 secure 标志。所有的可选参数都是作用于 cookie本身而非子 cookie。为了在同一个 cookie中存储多个子 cookie，路径、域和 secure标志必须一致；针对整个 cookie 的失效日期则可以在任何一个单独的子 cookie 写入的时候同时设置。在这个方法中，第一步是获取指定 cookie 名称对应的所有子 cookie。逻辑或操作符“ ||”用于当 getAll()返回 null 时将 subcookies 设置为一个新对象。然后，在 subcookies 对象上设置好子 cookie 值并传给setAll()。</p>
<p><strong>setAll()方法</strong>接收 6 个参数： cookie 名称、包含所有子 cookie 的对象以及和 set()中一样的 4个可选参数。这个方法使用 for-in 循环遍历第二个参数中的属性。为了确保确实是要保存的数据，使用了 hasOwnProperty()方法，来确保只有实例属性被序列化到子 cookie 中。由于可能会存在属性名为空字符串的情况，所以在把属性名加入结果对象之前还要检查一下属性名的长度。将每个子 cookie的名值对儿都存入 subcookieParts 数组中，以便稍后可以使用 join()方法以&amp;号组合起来。</p>
<p>普通 cookie 可以通过将失效时间设置为过去的时间的方法来删除，但是子 cookie 不能这样做。为了删除一个子 cookie，首先必须获取包含在某个 cookie中的所有子 cookie，然后仅删除需要删除的那个子 cookie，然后再将余下的子 cookie 的值保存为 cookie的值。<strong>unset()</strong>方法用于删除某个 cookie 中的单个子 cookie而不影响其他的；而 <strong>unsetAll()</strong>方法则等同于 CookieUtil.unset()，用于删除整个 cookie。和 set()及 setAll()一样，路径、域和 secure 标志必须和之前创建的 cookie 包含的内容一致。</p>
<h2 id="articleHeader7">firebug测试实例</h2>
<p>//设置两个 cookie<br>SubCookieUtil.set("data", "name", "Nicholas");<br>SubCookieUtil.set("data", "book", "Professional JavaScript");<br><span class="img-wrap"><img data-src="/img/bVEm8R?w=785&amp;h=95" src="https://static.alili.tech/img/bVEm8R?w=785&amp;h=95" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>//设置全部子 cookie 和失效日期<br>SubCookieUtil.setAll("data", { name: "Nicholas", book: "Professional JavaScript" },new Date("January 1, 2018"));<br><span class="img-wrap"><img data-src="/img/bVEm8S?w=785&amp;h=97" src="https://static.alili.tech/img/bVEm8S?w=785&amp;h=97" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>//修改名字的值，并修改 cookie 的失效日期<br>SubCookieUtil.set("data", "name", "Michael", new Date("February 1, 2010"));<br><span class="img-wrap"><img data-src="/img/bVEm8Y?w=979&amp;h=99" src="https://static.alili.tech/img/bVEm8Y?w=979&amp;h=99" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>//删除所有子Cookie<br>SubCookieUtil.unsetAll('data');</p>
<h2 id="articleHeader8">Cookie的限制</h2>
<p>1）单域名下数目限制和大小限制：子Cookie只是突破了单个域名下Cookie数目限制，但是Cookie的大小依旧受限，因此要注意子Cookie的大小不能使单个Cookie超出大小限制。<br>2）性能限制：由于所有的 cookie 都会由浏览器作为请求头发送，所以在 cookie 中存储大量信息会影响到特定域的请求性能。 cookie 信息越大，完成对服务器请求的时间也就越长。尽管浏览器对 cookie 进行了大小限制，不过最好还是尽可能在 cookie 中少存储信息，以避免影响性能。<br>3）安全限制：cookie 数据并非存储在一个安全环境中，其中包含的任何数据都可以被他人访问。所以不要在 cookie 中存储诸如信用卡号或者个人地址之类的数据。<br>cookie 的性质和它的局限使得其并不能作为存储大量信息的理想手段，所以又出现了其他方法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
客户端数据存储----Cookie From 《高程3》

## 原文链接
[https://segmentfault.com/a/1190000007199753](https://segmentfault.com/a/1190000007199753)

