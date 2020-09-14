---
title: 'HTTP验证大法(Basic Auth,Session, JWT, Oauth, Openid)' 
date: 2019-01-26 2:30:18
hidden: true
slug: 14vf08gpmnw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">成为一个"认证”老司机</h1>
<blockquote><p>本文翻译自<a href="https://github.com/teesloane/Auth-Boss" rel="nofollow noreferrer" target="_blank">Auth-Boss</a>。 如果有翻译的不恰当或不对的地方， 欢迎指出。</p></blockquote>
<p>成为一个认证老司机， 了解网络上不同的身份认证方法。</p>
<p>本文档的目的是记录和编目Web上的身份验证方法。<br>认证指的是创建一个系统的过程，用户可以通过该系统“登录”在线服务，并授予对受保护资源的访问权限。<br>以下引用可能更好地总结我想要解释的内容：</p>
<blockquote><p>客户端认证涉及向Web上的服务器证明客户端（或用户）的身份。[1]</p></blockquote>
<h2 id="articleHeader1">Who</h2>
<p>我是一个自学成才的开发人员，热爱开源技术，学习，指导和知识共享。</p>
<h2 id="articleHeader2">Why</h2>
<p>我写这篇指南，因为关于验证这方面的信息很难直接找到。我决定戴上我的“研究帽“，做一些跑腿的工作。</p>
<h2 id="articleHeader3">How</h2>
<p>我写作风格简洁，会用到一些技术词。</p>
<p><strong>免责声明：</strong>本文档不作为包含所有认证方法的网络的目录;<br>本文档也不旨在提供“最佳”认证方法。<br>没人给钱贿赂我。<br>如果你想赞助我那更棒， 可以用一些其它方式， 比如领养一只小狗，或者帮助正在辛劳的人们。</p>
<p><strong>引文：</strong>这些引文表示我引用的来源。<br>如果你想让我收下链接/更好地引用我的来源（不仅仅是一个链接到原始发布），我可以这样做。<br>如果你想让我更好的引用引文， 我当然愿意，不过请先让我知道&lt;3。</p>
<p><strong>遗漏，错误：</strong><br>犯错并不罕见，我并不是安全方面的专家<br>如果你看到一些可以改进的东西请PR，告诉我哪里弄错了，我可以改进。<br>有关PR更多的信息，请查看CONTRIBUTIONS.md。</p>
<h2 id="articleHeader4">假想案例</h2>
<p>我将使用本文档中的一个常见示例来说明在“客户端”（用户在其计算机前面）和“服务器”（后台）上发生的情况的登录流程。</p>
<p>我们的例子将会有一个想象的朋友：Beorn。<br>Beorn喜欢针织，经常去<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a>购买用品。<br>Beorn在knittingworld有一个帐号，我们将看到他登陆的例子。</p>
<h2 id="articleHeader5">一般最佳做法</h2>
<p>在讨论用于管理身份验证的技术之前，以下是你不应该做的。</p>
<p>以下某些项目可能不直接与登录/身份验证/用户注册有关，但通常有用。</p>
<ul>
<li><p>切勿将密码存储为数据库中的纯文本。</p></li>
<li><p>不要写自己的哈希算法（除非你真的很聪明）</p></li>
<li><p>不要写自己的认证技术（再次，除非你真的很聪明）。</p></li>
<li><p>使用HTTPS。</p></li>
</ul>
<p><strong>一些忠告</strong></p>
<p>我们还发现许多网站设计自己的身份验证机制，以提供更好的用户体验。<br>不幸的是，设计师和实现者通常没有安全背景，因此不能很好地理解他们可以使用的工具[2]</p>
<h2 id="articleHeader6">术语</h2>
<p>web验证开发领域中有相当多的术语。<br>下面是一个术语列表，您将在下面看到。</p>
<h3 id="articleHeader7">HTTP 超文本传输协议。</h3>
<p>这是一个大的概念。我只能简单的解释一下它的含义。<br>Web是围绕HTTP构建的 - 它是用于在Web服务器和用户之间通信的协议。</p>
<p>您的浏览器被视为HTTP客户端，因为它向HTTP服务器发送请求。<br>你的客户可以做很多不同类型的请求， - 你可能听说过一些最流行的请求 - POST POST PUT和DELETE。</p>
<p>HTTP服务器向您的浏览器 - 客户端发送响应。<br>这些响应就是资源。<br>资源可以是（但不限于）：HTML文件，图像，文本，JSON等。<br>你可以认为资源是从服务器返回的“文件”。</p>
<p>关于此主题的其他链接：</p>
<ul>
<li><p><a href="http://www.jmarshall.com/easy/http/#whatis" rel="nofollow noreferrer" target="_blank">HTTP Made Really Easy</a></p></li>
<li><p><a href="https://tools.ietf.org/html/rfc2616" rel="nofollow noreferrer" target="_blank">RFC2616</a> - 这是一个关于HTTP的文档规范。<br>它被列为过期，但也列出了取代它的文档。</p></li>
</ul>
<h3 id="articleHeader8">HTTPS</h3>
<p>HTTPS是安全的HTTP。<br>它与SSL / TLS密切相关。<br>最初在互联网上的支付交易很受欢迎，最近变得越来越普遍。<br>您可能会认为https是“在浏览器中显示在我的网址左侧的绿色文本”;<br>经常伴随着锁的图标或类似的东西。</p>
<p>HTTPS是用TLS（或在过去的日子里，SSL）封装的HTTP，以保护浏览器和服务器之间的流量。</p>
<p>HTTPS会对与您的HTTP请求一起发送的信息和发回的响应进行加密。<br>这在我们开始谈论身份验证时尤其重要！</p>
<p>来自维基百科：</p>
<blockquote><p>HTTPS在不安全的网络创建安全通道。</p></blockquote>
<p>这确保了合理的保护免受窃听者和中间人攻击，只要使用足够的密码套件并且服务器证书被验证和信任。</p>
<h3 id="articleHeader9">TLS / SSL</h3>
<p>TLS和SSL是加密协议。<br>TLS和SSL加密您通过网络发送的数据 - 它旨在防止人们“窃听”或篡改您要发送的数据。<br>SSLv2和v3今天被视为不安全（请参阅<a href="https://en.wikipedia.org/wiki/POODLE" rel="nofollow noreferrer" target="_blank">POODLE</a>），因此大多数HTTPS是使用TLS 1.2完成的。<br>YouTube上有一些有用的视频，有助于解释这些复杂的问题，<br>这个视频<a href="https://www.youtube.com/watch?v=S2iBR2ZlZf0" rel="nofollow noreferrer" target="_blank">MIT opencourseware</a>挺不错的！</p>
<h3 id="articleHeader10">State</h3>
<p><code>state</code>，<code>stateful</code>，<code>stateless</code>和<code>piece of state</code>。<br>这些是术语，它们的定义不同。<br>在本文里，“piece of state”或“stateful”描述了一块存储在内存中的数据。</p>
<p>HTTP请求通常被描述为“stateless”。<br>当您访问网站和登录时，您正在传递一些信息以及您的HTTP请求， 用来标识您的身份。<br>无论你需要使用什么身份验证方法来识别自己，都必须“附加”到某个或另一个HTTP请求，因为你不能简单地将该状态放在HTTP协议本身中 - 必须采取另一种形式，可以凌驾于HTTP协议之上（正如你会看到在本文档的其余部分。）。<br>可能有点夸张... 我认为这篇来自苏格兰的文章解释的很不错<a href="https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication" rel="nofollow noreferrer" target="_blank">The Ins and Outs of Token Based Authentication</a>。</p>
<p>由于HTTP协议是无状态的，这意味着如果我们使用用户名和密码验证用户，那么在下一个请求，我们的应用程序将不知道我们是谁。<br>我们必须再次验证。</p>
<h3 id="articleHeader11">Cookies</h3>
<p>Cookie是存储在用户浏览器上的小数据。<br>Cookie与HTTP相反，是有状态的 - 这意味着尽管HTTP不能存储用户信息，但是cookie可以。</p>
<p>网络Cookie的常见示例：</p>
<p>Beorn访问<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a>为他的下一个针织项目购买一些不错的纱线和材料。<br>他登录后向他的购物车添加了三件商品。突然他听到一声砰！<br>并意识到他的微波炉里还有一罐金枪鱼。不好！<br>Beorn关闭了浏览器，立即忘记了他购物车里的东西，跑去检查微波炉。<br>罐头金枪鱼的酱汁已经洒在他家的地板上，Beorn回到他的电脑前，并重新访问<a href="https://knittingworld.com" rel="nofollow noreferrer" target="_blank">https://knittingworld.com</a> ...想看看他之前加入购物车的商品还在不在。<br>Cookies。</p>
<p>有不同种类的Cookies。<br>有些Cookie会在您的浏览器中停留多天，而其他Cookie会在您关闭浏览器后立即消失。</p>
<p>Cookie在过去（仍然是）认证中起到了很大的作用。<br>Web服务器通常使用认证cookie来确定用户是否登录以及他们有权访问哪些资源。</p>
<p><a href="https://en.wikipedia.org/wiki/HTTP_cookie#Persistent_cookie" rel="nofollow noreferrer" target="_blank">持久性cookie</a>有时会带来麻烦，因为它们可以被广告商用来记录关于用户的web习惯的信息。<br>另一方面，它们通常用于保存用户每次访问站点时不必重新输入其登录凭证。</p>
<p>您可以通过导航到您的（使用Chrome）开发者工具并打开网络标签查看与请求一起发送的Cookie。<br>刷新页面将显示传入资源的列表，您可以选择其中的一个。<br>滚动列表， 看看找得到cookie不！<br>您也可以在开发人员工具的[Application]标签中查看Cookie 的相关信息。</p>
<h3 id="articleHeader12">Sessions / Session Management</h3>
<p>我并不会一开始就去尝试简单的描绘出sessions，我会引用OWASP：</p>
<blockquote><p>网络会话是与同一用户相关联的网络HTTP请求和响应事务的序列。</p></blockquote>
<p>现代和复杂的web应用程序需要在多个请求期间保留关于每个用户的信息或状态。<br>因此，会话提供了建立变量的能力，例如访问权限和本地化设置，这将适用于在会话期间用户与webApp的每一次交互。</p>
<p>您可以在下面的“Methodologies”部分找到基于会话身份验证的示例。<br>关于Sessions的更多链接：</p>
<ul>
<li><p><a href="http://machinesaredigging.com/2013/10/29/how-does-a-web-session-work/" rel="nofollow noreferrer" target="_blank">How does a web session work</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work" rel="nofollow noreferrer" target="_blank">What are web sessions?</a></p></li>
</ul>
<h2 id="articleHeader13">Methodologies</h2>
<p>以下是用于建立认证的技术方案列表。这不是一个完整的列表！</p>
<h3 id="articleHeader14">HTTP基本认证</h3>
<p>HTTP基本身份验证（或“基本身份验证”）已经存在了很长时间。看起来人们倾向于使用它，因为它的简单性，它支持跨浏览器。这是一个空白页面，要求基本的验证。这里将演示如何确保webApp正常运行当Beorn关闭游览器重新再打开后：</p>
<ul>
<li><p>Beorn去<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a> 买纱线。</p></li>
<li><p>在挑选出纱线后，他点击“购买”按钮购买。</p></li>
<li><p>他的浏览器发出一个GET请求，服务器响应401告诉他需要验证。</p></li>
<li><p>Beorn在他的用户名和密码中输入登录表单。</p></li>
<li><p>在他点击登陆后，他的浏览器会发起GET(POST)请求， 并在请求头里带着Authorization。Authorization请求头类似于这样<code>Authorization:QWxhZGRpbjpvcGVuIHNlc2FtZQ==</code></p></li>
<li><p>服务器继续验证身份验证头并确定Beorn是否可以可以提交购买操作。浏览器会记住Authorization，之后的每一次游览器提交的请求，都会在请求头里加上<code>Authorization:QWxhZGRpbjpvcGVuIHNlc2FtZQ==</code>， 直到游览器关闭。</p></li>
</ul>
<h4>关于HTTP基本身份验证的一些重要注意事项：</h4>
<ul>
<li><p>上面的示例授权头部看起来不像用户名和密码，但是这是因为它是base64编码。它没有加密。</p></li>
<li><p>如果使用HTTP基本认证，请使用HTTPS。如果使用HTTP，身份验证凭据将作为明文发送到服务器。这不好。用户的用户名和密码通过线路仅作为base64编码文本发送 - 这对于解码来说很简单。通过使用HTTPS / TLS，您确保从客户端发送到服务器的数据被加密。</p></li>
<li><p>HTTP基本验证由游览器实现，今天很少使用。</p></li>
<li><p>基本验证使用API​​的基本认证，当与令牌组合时，（稍后讨论）只是一个授权报头，是完全合理的。它有额外的好处，不需要API客户端维护一个额外的会话cookie，并且，因为大多数系统日志查询参数而不是标题，将不会被默认记录。</p></li>
<li><p>基本验证与Token组合的时候， 好处很多，比如不需要客户端单独维护一个cookie， 并且也不会被客户端记录。</p></li>
</ul>
<h4>链接</h4>
<ul>
<li><p><a href="https://www.owasp.org/index.php/Basic_Authentication" rel="nofollow noreferrer" target="_blank">Basic Authentication on OWASP</a></p></li>
<li><p><a href="https://www.owasp.org/index.php/Basic_Authentication" rel="nofollow noreferrer" target="_blank">Why does stripe use HTTP basic auth with a token instead of the header</a></p></li>
</ul>
<h3 id="articleHeader15">基于Session的认证</h3>
<p>Session认证已经存在了一段时间，并且平常用的比较多。基于session的身份验证的关键是，用户的登录与服务器上的内存的一段状态或key-value存储（如Redis中）相关联。</p>
<p>让我们看看我们的朋友Beorn使用基于session的身份验证的示例。</p>
<ul>
<li><p>Beorn去<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a> 买一些东西。</p></li>
<li><p>当Beorn登录时，他将他的凭据发送到服务器。</p></li>
<li><p>当凭据到达服务器时，服务器以这种方式或另一种方式需要检查Beorn是否是其数据库中的用户。在这一点上，Beorn还没有登录。</p></li>
<li><p>Beorn的凭据匹配成功，所以他可以登录。</p></li>
<li><p>Beorn需要一些东西来识别他对服务器的未来请求 - 特别是如果他想要购买东西(必须登陆才能买)。这就是认证session的思想。</p></li>
<li><p>现在服务器知道Beorn是谁，并且已经将他识别为数据库中的用户，服务器将向他（或“返回”）发送一个cookie，这可以将Beorn列为在以后的请求中是已经登陆的用户。</p></li>
<li><p>现在，Beorn已经验证，并在他的浏览器上有一个session cookie(cookie的一种)。</p></li>
<li><p>当Beorn转到页面<a href="http://knittingworld.com/great_deals.html" rel="nofollow noreferrer" target="_blank">http://knittingworld.com/great_deals.html</a> 他正在做另一个HTTP请求 - 但这次，他的session cookie将放在HTTP请求头里发送到服务器。</p></li>
<li><p>服务器将根据与内存中Session信息匹配的cookie进行身份验证(可以用redis，memcache等数据库来保存)</p></li>
<li><p>当Beorn从<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a> 退出时，他在服务器（或Redis等）上的会话实例将过期，他的会话cookie也会过期。</p></li>
</ul>
<h3 id="articleHeader16">基于Token的认证</h3>
<p>基于令牌的认证已经变得更加普遍最近随着RESTful API的应用，单页应用程序和微服务的兴起。</p>
<h5>什么是token？</h5>
<p>token是一小块数据。</p>
<p>利用基于Token的认证的认证系统意味着用户向服务器发出的请求携带token以执行认证逻辑。当发出HTTP请求时， token是验证用户是否有资格访问资源的凭证。</p>
<h4>这与基于Cookie的身份验证有何不同？</h4>
<p>token认证是无状态的，而基于session的认证意味着在您的服务器（或在Redis等）中的某个地方保存着状态用以识别用户。</p>
<p>Auth0的博客文章<a href="https://auth0.com/blog/cookies-vs-tokens-definitive-guide/" rel="nofollow noreferrer" target="_blank">Cookies vs Tokens：The Definitive</a> 描述了cookie和令牌之间的身份验证流程的差别的：</p>
<h4>基于session的认证流程：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 用户输入其登录信息
2. 服务器验证信息是否正确，并创建一个session，然后将其存储在数据库中
3. 具有sessionID的Cookie将放置在用户浏览器中
4. 在后续请求中，会根据数据库验证sessionID，如果有效，则接受请求
5. 一旦用户注销应用程序，会话将在客户端和服务器端都被销毁
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>用户输入其登录信息
<span class="hljs-bullet">2. </span>服务器验证信息是否正确，并创建一个session，然后将其存储在数据库中
<span class="hljs-bullet">3. </span>具有sessionID的Cookie将放置在用户浏览器中
<span class="hljs-bullet">4. </span>在后续请求中，会根据数据库验证sessionID，如果有效，则接受请求
<span class="hljs-bullet">5. </span>一旦用户注销应用程序，会话将在客户端和服务器端都被销毁
</code></pre>
<h4>基于令牌的认证流程：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 用户输入其登录信息
2. 服务器验证信息是否正确，并返回已签名的token
3. token储在客户端，最常见的是存储在`local storage`中，但也可以存储在session存储或cookie中
4. 之后的HTTP请求都将token添加到请求头里
5. 服务器解码JWT，并且如果令牌有效，则接受请求
6. 一旦用户注销，令牌将在客户端被销毁，不需要与服务器进行交互一个关键是，令牌是无状态的。后端服务器不需要保存令牌或当前session的记录。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>用户输入其登录信息
<span class="hljs-bullet">2. </span>服务器验证信息是否正确，并返回已签名的token
<span class="hljs-bullet">3. </span>token储在客户端，最常见的是存储在<span class="hljs-code">`local storage`</span>中，但也可以存储在session存储或cookie中
<span class="hljs-bullet">4. </span>之后的HTTP请求都将token添加到请求头里
<span class="hljs-bullet">5. </span>服务器解码JWT，并且如果令牌有效，则接受请求
<span class="hljs-bullet">6. </span>一旦用户注销，令牌将在客户端被销毁，不需要与服务器进行交互一个关键是，令牌是无状态的。后端服务器不需要保存令牌或当前session的记录。</code></pre>
<h4>哇标记听起来很酷。他们比基于session的身份验证更好吗？</h4>
<p>问错人了，伙计。我只是告诉你存在这个验证方式。我不会比较没有意义的比较，我尽最大努力做到这一点。有关更多有趣的免责声明，请访问上面的免责声明部分。令牌的类型一些常见的令牌包括JWT（下面讨论），SWT（简单网络令牌）和SAML（安全断言标记语言）</p>
<h4>链接</h4>
<ul>
<li><p><a href="https://www.w3.org/2001/sw/Europe/events/foaf-galway/papers/fp/token_based_authentication/" rel="nofollow noreferrer" target="_blank">Token Based Authentication - Implemenation Demonstration - W3</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/1592534/what-is-token-based-authentication" rel="nofollow noreferrer" target="_blank">What is token based Authentication - SO</a></p></li>
<li><p><a href="https://auth0.com/learn/token-based-authentication-made-easy/#!" rel="nofollow noreferrer" target="_blank">Token Based Authentication Made Easy</a></p></li>
<li><p><a href="https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication" rel="nofollow noreferrer" target="_blank">The Ins and Outs of Token Based Authentication</a></p></li>
<li><p><a href="https://auth0.com/blog/cookies-vs-tokens-definitive-guide/" rel="nofollow noreferrer" target="_blank">Cookies vs Tokens: The Definitive Guide (opinionated)</a></p></li>
</ul>
<h3 id="articleHeader17">JWT</h3>
<p>JWT代表“JSON Web Token”。 JWT是一种基于Token的认证。 JWT基于Web标准。现在JWT用的越来越多;JWT是Token认证的一种，所以说JWT基于Token的认证。再次，基于Token的认证的不同方法具有不同的优点和缺点。因此，上面的基于令牌的认证部分中的很多信息适用于此。</p>
<p>来自JWT RFC 7519标准化的摘要说明：JSON Web Token（JWT）是一种紧凑的，URL安全的方式，表示要在双方之间传输的声明。</p>
<p>JSON Web令牌是一个字符串。它可能看起来像这样：</p>
<blockquote><p>eyJhbGciOIJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ</p></blockquote>
<p>上面的字符串是你在使用JWT执行身份验证时可能看到的;它是在认证时从服务器返回的凭证。JWT经过验证并且安全，因为它们使用私钥进行“数字签名”，并使用密钥进行身份验证。</p>
<h4>JWT的结构？</h4>
<p>JWT是一个自包含的数据块。每个JWT由<code>payload</code>和<code>signature</code>组成。当您的服务器创建token时，您还可以为token分配唯一的数据，可以在前端使用。这可以用于保存稍后进行其他数据库调用的需要。你仍然应该警惕在发送给客户的令牌中发布机密信息(比如说用户密码等等)。</p>
<h4>在Python中创建JWT令牌的示例函数：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="def create_token(user):
    &quot;&quot;&quot;Create a JWT token, set expiry, iat, etc&quot;&quot;&quot;
    payload = {
        'sub': user.id,
        'name': user.first_name,
        'role_id': user.role_id,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    token = jwt.encode(payload, MY_SECRET_KEY_SHHH_DONT_TELL_ANYONE, algorithm='HS256')
    return token.decode('unicode_escape')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">create_token</span><span class="hljs-params">(user)</span>:</span>
    <span class="hljs-string">"""Create a JWT token, set expiry, iat, etc"""</span>
    payload = {
        <span class="hljs-string">'sub'</span>: user.id,
        <span class="hljs-string">'name'</span>: user.first_name,
        <span class="hljs-string">'role_id'</span>: user.role_id,
        <span class="hljs-string">'iat'</span>: datetime.utcnow(),
        <span class="hljs-string">'exp'</span>: datetime.utcnow() + timedelta(days=<span class="hljs-number">1</span>)
    }
    token = jwt.encode(payload, MY_SECRET_KEY_SHHH_DONT_TELL_ANYONE, algorithm=<span class="hljs-string">'HS256'</span>)
    <span class="hljs-keyword">return</span> token.decode(<span class="hljs-string">'unicode_escape'</span>)</code></pre>
<p>上面的键sub，iat和exp跟随保留的JWT键，但我也添加了用户的名称和role_id。你将需要一个库来编码/解码JWT令牌。 <a>JWT.io</a>列出了许多语言的库。</p>
<h4>链接</h4>
<ul>
<li><p><a href="https://jwt.io/introduction/" rel="nofollow noreferrer" target="_blank">Introduction to JSON web tokens</a></p></li>
<li><p><a href="https://jwt.io/" rel="nofollow noreferrer" target="_blank">JWT Debugger</a></p></li>
</ul>
<h3 id="articleHeader18">OAuth</h3>
<p>OAuth是一种认证协议，允许用户对没有密码的服务器执行认证。 OAuth存在很多版本 -  OAuth 1.0，OAuth 1.0a和OAuth 2.0。</p>
<p>如果您曾使用Twitter，Google或Facebook帐户登录了某项服务，那么您已使用OAuth。<br>、<br> OAuth提供商（Facebook，Google等）通过提供您的服务（“OAuth客户端”）身份验证方式的私有，唯一的访问令牌，允许登录。</p>
<p>如果您要使用OAuth让用户登录您的服务，则需要将您的服务器注册为OAuth客户端。这通常会设置一个客户端ID和客户端密钥。登录到您的服务的用户将重定位到OAuth提供程序，用户可以在其中确认他们确实想要“登录”（即允许他们登录的服务器）访问OAuth提供程序的任何必需的信息。 ）在我们的朋友Beorn的情况下...</p>
<p>在我们的朋友Beorn的情况下...</p>
<ul>
<li><p>Beorn去<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a> 买东西。</p></li>
<li><p>Beorn决定使用他的Google帐户登录。</p></li>
<li><p>提示Beorn输入他的google帐户信息（如果他还没有登录</p></li>
<li><p>输入信息后，Google（或者其它的OAuth提供商）将提示他是否要使用他的Google帐户登录<a href="http://knittinggworld.com" rel="nofollow noreferrer" target="_blank">http://knittinggworld.com</a> 。</p></li>
<li><p>接受后，Beorn被重定向到<a href="http://knittingworld.com" rel="nofollow noreferrer" target="_blank">http://knittingworld.com</a> 。</p></li>
<li><p>如果knittingworld需要访问关于Beorn信息的资源，它可以向资源服务器（通过OAuth提供者）请求访问它们，只要它的token是有效的。</p></li>
</ul>
<p>OWASP说：</p>
<blockquote><p>建议使用OAuth 1.0a或OAuth 2.0，因为已发现第一个版本（OAuth1.0）容易受到session固定的影响。OAuth 2.0依靠HTTPS进行安全保障，目前OAuth的API（如Facebook，Google，Twitter和Microsoft）已经实现了。 OAuth1.0a很难使用，因为它需要使用用于数字签名的加密库。然而，由于OAuth1.0a不依赖HTTPS来实现安全性，因此它更适合于更高风险的事务。</p></blockquote>
<h4>链接</h4>
<ul><li><p><a href="http://stackoverflow.com/a/32534239" rel="nofollow noreferrer" target="_blank">A Fun explanation of OAuth involving Donuts</a></p></li></ul>
<h3 id="articleHeader19">OpenId</h3>
<p>OpenId是另一种不需要密码的身份验证协议（类似于OAuth）。 OpenId网站有一个非常简洁明了的描述，在我看来：</p>
<blockquote><p>OpenID允许您使用现有帐户登录多个网站，而无需创建新密码。您可以选择将信息与您的OpenID相关联，以便与您访问的网站（例如姓名或电子邮件地址）共享。使用OpenID，您可以控制与您访问的网站共享的信息量。使用OpenID，您的密码仅提供给您的身份提供商，然后该提供商会确认您访问的网站的身份。除了您的提供商，没有网站曾经看到您的密码，因此您不需要担心一个不道德或不安全的网站危害您的身份。</p></blockquote>
<p>虽然从2005年开始，最近（2014年-h），OpenId发布了OpenId Connect，这是一种“基于OAuth 2.0系列规范的可互操作身份验证协议”（源）</p>
<h4>OpenId和OAuth有什么区别？</h4>
<p>OpenId类似于OAuth，但有一些差异。类似地，OpenId依赖于与第三方（依赖方（您登录的站点））交互以提供认证凭证的身份提供商。</p>
<p>不同的是，您可以使用OAuth允许您登录的网站能够访问来自提供程序的数据。这听起来可怕和混乱，但这里有一个简单的例子：</p>
<ul>
<li><p>Beorn注册为twitter。他要推销他编织的帽子</p></li>
<li><p>Beorn不知道follow谁，没有人follow他。 Beorn悲伤的感觉不重要。</p></li>
<li><p>Twitter提示Beorn使用OAuth连接他的Google帐户，以便他可以导入他的联系人到Twiiter。</p></li>
<li><p>Beorn follow了一群人，包括来自他多年没有见过的高中的老朋友</p></li>
<li><p>Beorn这样做了，现在他正在不停地tweeting。</p></li>
</ul>
<h4>链接</h4>
<ul>
<li><p><a href="http://openid.net/get-an-openid/what-is-openid/" rel="nofollow noreferrer" target="_blank">What is OpenId?</a></p></li>
<li><p><a href="http://openid.net/connect/faq/" rel="nofollow noreferrer" target="_blank">OpenId Connect FAQ</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=Kb56GzQ2pSk" rel="nofollow noreferrer" target="_blank">OpenId Connect Video</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/3376141/openid-vs-oauth?rq=1" rel="nofollow noreferrer" target="_blank">What's the differene between OpenId vs OAuth?</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/1087031/whats-the-difference-between-openid-and-oauth" rel="nofollow noreferrer" target="_blank">What's the differene between OpenId vs OAuth? (different thread)</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=xcmY8Pk-qEk" rel="nofollow noreferrer" target="_blank">OpenId according to Dave -- I like this one, albeit dated</a></p></li>
</ul>
<p>这里是Stack Overflow的登录页面的图片，它提供了许多不同的身份验证方法：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008481741?w=1189&amp;h=880" src="https://static.alili.tech/img/remote/1460000008481741?w=1189&amp;h=880" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader20">资源和脚注</h2>
<ul>
<li><p><a href="https://pdos.csail.mit.edu/papers/webauth:sec10.pdf" rel="nofollow noreferrer" target="_blank">1 - Dos and Don’ts of Client Authentication on the Web. Page 2.</a></p></li>
<li><p><a href="https://pdos.csail.mit.edu/papers/webauth:sec10.pdf" rel="nofollow noreferrer" target="_blank">2 - Dos and Don’ts of Client Authentication on the Web. Page 1.</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication</a></p></li>
<li><p><a href="https://blog.codinghorror.com/youre-probably-storing-passwords-incorrectly/" rel="nofollow noreferrer" target="_blank">https://blog.codinghorror.com/youre-probably-storing-passwords-incorrectly/</a></p></li>
<li><p><a href="https://pdos.csail.mit.edu/papers/webauth:sec10.pdf" rel="nofollow noreferrer" target="_blank">https://pdos.csail.mit.edu/papers/webauth:sec10.pdf</a></p></li>
<li><p><a href="https://www.owasp.org/index.php/Authentication_Cheat_Sheet" rel="nofollow noreferrer" target="_blank">OWASP Authentication Cheat Sheet</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTTP验证大法(Basic Auth,Session, JWT, Oauth, Openid)

## 原文链接
[https://segmentfault.com/a/1190000008481722](https://segmentfault.com/a/1190000008481722)

