---
title: '详解REST架构风格' 
date: 2018-12-01 2:30:12
hidden: true
slug: 6k01smuoi37
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">引言</h1>
<p>作为Web开发者，你可能或多或少了解一些REST的知识，甚至已经非常习惯于它，以至于在正式地学习REST的时候，你可能心里会想：“本来就是这样做的啊，不然还能怎么做呢？”<br>确实是这样，<a href="https://stackoverflow.com/a/671132/8175856" rel="nofollow noreferrer" target="_blank">REST已经成为Web世界的一种内在架构原则</a>。这主要是因为<strong>REST的产生确实与HTTP有着密不可分的联系</strong>。REST的提出者Roy Fielding在Web界是一位举足轻重的人物，他是HTTP协议（1.0版和1.1版）的主要设计者、Apache服务器软件的作者之一、Apache基金会的第一任主席……Fielding在几年以后<a href="https://en.wikipedia.org/wiki/Representational_state_transfer#History" rel="nofollow noreferrer" target="_blank">回顾起REST的设计过程</a>时，他说道：</p>
<blockquote>Throughout the HTTP standardization process, I was called on to defend the design choices of the Web. That is an extremely difficult thing to do within a process that accepts proposals from anyone on a topic that was rapidly becoming the center of an entire industry. I had comments from well over 500 developers, many of whom were distinguished engineers with decades of experience, and I had to explain everything from the most abstract notions of Web interaction to the finest details of HTTP syntax. <strong>That process honed my model down to a core set of principles, properties, and constraints that are now called REST.</strong>
</blockquote>
<p>在HTTP标准化的过程中，Fielding作为作者之一，负责向外界对HTTP的设计作出解释和辩护。在这个过程中，他的思维模型受到不断地锤炼，一套准则从中沉淀了下来，这就是REST。</p>
<p>本篇文章的写作目的是，与读者一起了解REST的内在，认识REST的优势，而不再将它当作是“理所当然”。</p>
<h1 id="articleHeader1">REST</h1>
<p>REST是<em>Representational State Transfer</em>(在表示层上的状态传输)的缩写，这个词的字面意思要在文章的后面才能解释清楚。REST是一种WEB应用的<strong>架构风格</strong>，<a href="https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints" rel="nofollow noreferrer" target="_blank">它被定义为6个限制</a>，满足这6个限制，能够获得诸多优势（详细优点在文章最后总结）。</p>
<p>先用一句话来概括RESTful <strong>API</strong>(具有REST风格的API): <strong>用URL定位资源，用HTTP动词（GET,HEAD,POST,PUT,PATCH,DELETE）描述操作，用响应状态码表示操作结果。</strong></p>
<p>但是<strong>REST远远不仅是指API的风格</strong>，它是一种网络应用的架构风格。我们到后面会有所体会。<br>另外，需要注意的是，REST的原则不仅仅适用于HTTP协议。但是，由于REST的应用场景绝大部分是WEB应用，本篇文章将基于HTTP来讨论REST。</p>
<h2 id="articleHeader2">引入：从另一个角度看待前后端分离</h2>
<p>我们浏览一个网站，说到底就是与这个网站中的资源进行互动（获取、提交、更新、删除）。前端的工作，就是为用户从服务端获取资源、展示资源、请求服务端改变资源。</p>
<p>RESTful API有助于客户端和服务端的功能分离，服务器完全扮演着一个“资源服务商”的角色。各种不同的客户端都可以通过一致的API与这个“资源服务商”交流，从而与资源进行互动。<br><span class="img-wrap"><img data-src="http://static.zybuluo.com/csr/gvta25oob10kqwx1xsk0kqls/4888929-b3c72a5abb3ce4db.jpg" src="https://static.alili.techhttp://static.zybuluo.com/csr/gvta25oob10kqwx1xsk0kqls/4888929-b3c72a5abb3ce4db.jpg" alt="RESTful API" title="RESTful API" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">资源</h2>
<p>在REST架构中，“资源”扮演者主要角色。它具有以下特点：</p>
<ul>
<li>
<p>资源是任何<strong>可以操作</strong>（获取、提交、更新、删除）的数据，比如一个文档（document）、一张图片……</p>
<blockquote>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer" rel="nofollow noreferrer" target="_blank">wikipedia</a>: "Web resources" were first defined on the World Wide Web as documents or files identified by their URLs. However, today they have a much more <strong>generic and abstract</strong> definition that encompasses <strong>every thing or entity that can be identified, named, addressed, or handled, in any way whatsoever, on the web</strong>. “资源”包括Web中任何可以被标识、命名、定位、处理的事物。</blockquote>
</li>
<li>资源的集合也是一种资源，比如<code>blogs</code>表示博客（资源）的集合。</li>
<li>进行资源操作的时候，<strong>用URI来指定被操作的资源</strong>。如果一个URI不仅能标识一个网络上的资源，还能够<strong>定位</strong>这个资源，那么这个URI也叫URL。</li>
<li>资源是一个抽象的概念，资源无法被传输，只能传输<strong>资源的表示</strong>（representation）。一个资源可以有多种表示，比如，一个资源可以用HTML、XML、JSON来表示。具体传输哪种表示取决于服务端的能力和客户端的要求。传输的表示未必就是服务器存储时使用的表示，比如，这个资源在服务器不是以HTML或XML或JSON来存储的，可能是一种更加利于压缩的表示。<strong>总的来说，“表示”是“资源”的存储和传输形式，“资源”是“表示”的内容（抽象概念）。不管用什么形式来表示，始终描述的是这个资源。</strong>
</li>
<li>举一个例子，当我们讨论“文章列表”这个<strong>资源</strong>时，我们并不在乎它是json格式还是xml格式，我们指的是它的含义：某个用户的所有文章。但是当我们真的要在服务器与客户端之间传输数据的时候，不能直接“传输资源”，因为资源太抽象了，发送方必须要以某一种表示（representation）来传递它（比如json），接收方才能很好地解析和处理。</li>
<li>表示（representation）包括数据（data，表示资源本身）和元数据（metadata，用于描述这个representation）。在<a href="http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" rel="nofollow noreferrer" target="_blank">Roy Fielding的论文</a>中有这个定义：<em>A representation is a sequence of bytes, plus representation metadata to describe those bytes.</em>
</li>
<li>在前面的例子中，严格来说，“json字符串”并不是完整的representation，<strong>整个HTTP响应才是representation</strong>。HTTP body中的是数据，HTTP header中的是元数据（尤其是<code>Content-Type</code>这种字段）。</li>
</ul>
<blockquote>参考 <a href="https://restfulapi.net/" rel="nofollow noreferrer" target="_blank">https://restfulapi.net/</a>
</blockquote>
<h2 id="articleHeader4">用URL定位资源</h2>
<p>在RESTful架构风格中，URL用来指定一个资源。资源就是服务器上可操作的实体（可以理解为数据）。比如说URL<code>/api/users</code>表示的是该网站的所有用户，这是一种资源，可以与之互动（获取、提交、更新、删除）。另外，资源地址具有层次结构，比如<code>/api/users/csr</code>表示用户名为'csr'的用户，<code>/api/users/csr/blogs</code>表示'csr'的所有博客，<code>/api/users/csr/blogs/1234567</code>表示其中的某一篇博客。这些都是资源，后者嵌套在前者之中。</p>
<p>既然URL表示一个资源，自然就不应该包含动词，它应该由名词组成。一个 not RESTful 的例子是通过向<code>api/delete/resource</code>发送GET请求来删除一个资源。</p>
<blockquote>更详细的URL设计可以查看<a href="http://www.ruanyifeng.com/blog/2014/05/restful_api.html" rel="nofollow noreferrer" target="_blank">阮一峰的"RESTful API 设计指南"</a>或者<a href="https://www.zhihu.com/question/28557115/answer/48094438" rel="nofollow noreferrer" target="_blank">知乎高票回答</a>。URL风格只是REST的外表，不是本文的重点。</blockquote>
<h2 id="articleHeader5">操作资源</h2>
<p>既然通过URL能够指定一个服务器上的资源。那么我们应该如何与这个资源进行互动呢？我们对这个资源(URL)使用不同的HTTP方法，就代表对这个资源的不同操作：</p>
<ul>
<li>GET（SELECT）：从服务器获取资源（一个资源或资源集合）。</li>
<li>POST（CREATE）：在服务器新建一个资源（也可以用于更新资源）。</li>
<li>PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。</li>
<li>PATCH（UPDATE）：在服务器更新资源（客户端提供改变的部分）。</li>
<li>DELETE（DELETE）：从服务器删除资源。</li>
<li>HEAD：获取资源的元数据。</li>
<li>OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。</li>
</ul>
<p>GET、HEAD、PUT、DELETE方法是<strong>幂等方法</strong>(对于同一个内容的请求，发出n次的效果与发出1次的效果相同)。<br>GET、HEAD方法是<strong>安全方法</strong>(不会造成服务器上资源的改变)。</p>
<blockquote>PATCH不一定是幂等的。PATCH的实现方式有可能是"提供一个用来替换的数据"，也有可能是"提供一个更新数据的方法"(比如<code>data++</code>)。如果是后者，那么PATCH不是幂等的。</blockquote>
<table>
<thead><tr>
<th>Method</th>
<th align="center">安全性</th>
<th align="center">幂等性</th>
</tr></thead>
<tbody>
<tr>
<td>GET</td>
<td align="center">√</td>
<td align="center">√</td>
</tr>
<tr>
<td>HEAD</td>
<td align="center">√</td>
<td align="center">√</td>
</tr>
<tr>
<td>POST</td>
<td align="center">×</td>
<td align="center">×</td>
</tr>
<tr>
<td>PUT</td>
<td align="center">×</td>
<td align="center">√</td>
</tr>
<tr>
<td>PATCH</td>
<td align="center">×</td>
<td align="center">×</td>
</tr>
<tr>
<td>DELETE</td>
<td align="center">×</td>
<td align="center">√</td>
</tr>
</tbody>
</table>
<blockquote>参考：<a href="http://www.restapitutorial.com/lessons/httpmethods.html" rel="nofollow noreferrer" target="_blank">HTTP Methods for RESTful Services</a>
</blockquote>
<h2 id="articleHeader6">通过HTTP状态码表示操作的结果</h2>
<p>虽然HTTP状态码设计的本意就是表示操作结果，但是有时候人们往往没有很好的利用它，RESTful API要求充分利用HTTP状态码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">200 </span>OK - [<span class="hljs-keyword">GET</span>]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
<span class="hljs-symbol">201 </span>CREATED - [POST/<span class="hljs-keyword">PUT</span>/PATCH]：用户新建或修改数据成功。
<span class="hljs-symbol">202 </span>Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
<span class="hljs-symbol">204 </span>NO CONTENT - [<span class="hljs-keyword">DELETE</span>]：用户删除数据成功。
<span class="hljs-symbol">400 </span>INVALID REQUEST - [POST/<span class="hljs-keyword">PUT</span>/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
<span class="hljs-symbol">401 </span>Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
<span class="hljs-symbol">403 </span>Forbidden - [*] 表示用户得到授权（与<span class="hljs-number">401</span>错误相对），但是访问是被禁止的。
<span class="hljs-symbol">404 </span><span class="hljs-keyword">NOT</span> FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
<span class="hljs-symbol">406 </span><span class="hljs-keyword">Not</span> Acceptable - [<span class="hljs-keyword">GET</span>]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
<span class="hljs-symbol">410 </span>Gone -[<span class="hljs-keyword">GET</span>]：用户请求的资源被永久删除，且不会再得到的。
<span class="hljs-symbol">422 </span>Unprocesable entity - [POST/<span class="hljs-keyword">PUT</span>/PATCH] 当创建一个对象时，发生一个验证错误。
<span class="hljs-symbol">500 </span>INTERNAL SERVER <span class="hljs-keyword">ERROR</span> - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。</code></pre>
<blockquote><a href="http://www.restapitutorial.com/httpstatuscodes.html" rel="nofollow noreferrer" target="_blank">完整状态码列表</a></blockquote>
<h2 id="articleHeader7">如何设计RESTful API</h2>
<p>在过去不使用RESTful架构风格的时候，如果我们要设计一个系统，会以“操作”为出发点，然后围绕它去建设其他需要的东西。<br>举个例子，我们要向系统中增加一个用户登陆的功能：</p>
<ol>
<li>需要一个用户登陆的功能(操作)</li>
<li>约定一个用于登录的API(也就是URL)</li>
<li>约定这个API的使用方式(发送响应什么数据、格式是什么)</li>
<li>前后端针对这个API进行开发</li>
</ol>
<p>这种设计方式有如下缺点：</p>
<ol>
<li>当我们不断为这个系统增加操作，每增加一个操作都要按照上面的流程设计一次，第2和3点的工作实际是可以大大削减的(通过REST)。</li>
<li>操作之间可能是有依赖的，依赖多起来，系统会变得很复杂。</li>
<li>我们的API缺乏一致性(需要一份庞大的文档来记录api的地址、使用方式)。</li>
<li>操作通常被认为是有副作用（Side Effect）的，很难使用缓存技术。</li>
</ol>
<p>而如果我们设计REST风格的系统，资源是第一位的考虑，首先从资源的角度进行系统的拆分、设计，而不是像以往一样以操作为角度来进行设计。</p>
<p>用两个例子来说明：银行的转账API，即时通讯软件中发送消息的API。</p>
<p>这两个功能非常具有“动作性”，看起来和“资源”联系不大，很容易就会设计成not RESTful的API：<code>POST /transfer/${amount}/to/${toUserID}</code>、<code>POST /api/sendMessage</code>。<br>一旦在URL中引入了动词，这个URL的功能就定死了，无法用于别的用途（比如，<code>GET /transfer/${amount}/to/${toUserID}</code>或<code>GET /api/sendMessage</code>的语义很奇怪，不好使用）。并且，不同功能的API有各自的结构，一致性很差，需要一份详细的API文档才能使用。</p>
<p>这种情况下，要如何通过RESTful架构风格，设计一套一致、多用途的URL呢？<br><strong>简单地说，就是将一个“动作”理解为“操作一个资源”。这里的“操作”是指HTTP的方法。</strong></p>
<p>对于转账动作，就可以理解为“新建一个转账事务”（转账事务是资源），因此API就可以设置成这样: <code>POST /transactions</code>，请求体为：<code>to=632&amp;amount=500</code>。这样的设计不但简洁明了，而且我们可以将这个URL用于别的用途：通过<code>GET /transactions</code>来获取该用户的所有转账事务。还可以将<code>GET /transactions/456828</code>定义为“获取某一次转账记录”。</p>
<p>即时通讯软件中发送消息的动作，我们可以理解为“操作聊天记录（聊天记录是资源，它是由“消息”组成的集合，消息也是资源）”，所以API设计为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST /messages # 创建新的聊天记录（body传输消息的内容）
GET /messages # 获取聊天记录（返回一个数组，其中每个项是一个消息）
GET /messages/${messageID} # 获取某个消息的详细信息
PUT /messages/${messageID} # 更新某个消息（body传输消息的内容）
DELETE /messages/${messageID} # 删除某个消息的记录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">POST</span> /messages <span class="hljs-comment"># 创建新的聊天记录（body传输消息的内容）</span>
GET /messages <span class="hljs-comment"># 获取聊天记录（返回一个数组，其中每个项是一个消息）</span>
GET /messages/<span class="hljs-variable">${messageID}</span> <span class="hljs-comment"># 获取某个消息的详细信息</span>
PUT /messages/<span class="hljs-variable">${messageID}</span> <span class="hljs-comment"># 更新某个消息（body传输消息的内容）</span>
DELETE /messages/<span class="hljs-variable">${messageID}</span> <span class="hljs-comment"># 删除某个消息的记录</span></code></pre>
<blockquote>同理，论坛类应用发帖、回帖的API也可以这样设计。</blockquote>
<p>从以上的两个例子我们可以看出，使用RESTful风格可以克服传统架构风格的那4个缺陷：</p>
<ol>
<li>设计API工作量减少，因为功能需求一旦出来，需要操作的资源、操作的方式立刻就能分析出来，因此资源URL和API的使用方式(GET, POST...)都很容易得到。</li>
<li>没有了操作之间的依赖。资源之间虽然可能有关联，但是小得多。</li>
<li>对资源的操作也就那么几种(获取、新建、修改、删除)，API的一致性、自我描述性很强，不需要过多解释。</li>
<li>对于GET请求，我们都可以考虑使用缓存，因为在RESTful的架构中，GET请求代表获取数据，必须是安全、幂等的。</li>
</ol>
<h2 id="articleHeader8">服务器无状态</h2>
<p>根据<a href="https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints" rel="nofollow noreferrer" target="_blank">REST的架构限制</a>，RESTful的服务器必须是无状态的，这意味着来自客户的每一个请求必须包含<strong>服务器处理该请求所需的所有信息</strong>， 服务器不能利用任何已经存储的“上下文(context，在这里表示用户的会话状态)”来处理新到来的请求，会话状态只能由客户端来保存，并且在请求时一并提供。</p>
<blockquote>这里注意两点。1. 服务器不能存储“上下文”不代表连数据库都不能有，“上下文”指那些在服务器内存中的、非持久化的数据。2. 无状态不代表不能有会话(sessions)，无状态仅仅指<strong>服务器无状态</strong>。服务器不记录、维护会话，但是会话状态可以由<strong>客户端</strong>在每次请求的时候提供。</blockquote>
<p>我一开始以为无状态与用户登陆是冲突的，后来在<a href="https://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness" rel="nofollow noreferrer" target="_blank">Do sessions really violate RESTfulness? - StackOverflow</a>上找到了一个令我满意的解答。以下两幅图摘录自这个答案。<br>无状态的认证机制：<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4888929-fc26b6ac220fa85d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4888929-fc26b6ac220fa85d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="无状态的认证机制" title="无状态的认证机制" style="cursor: pointer; display: inline;"></span></p>
<blockquote>What you need is storing username and password on the client and send it with every request. You don't need more to do this than HTTP basic auth and an encrypted connection.<br>只需要将用户名和密码存储在客户端，然后客户端每次发送请求都附带上用户名和密码。要做到这点你只需要<a href="https://en.wikipedia.org/wiki/Basic_access_authentication" rel="nofollow noreferrer" target="_blank">HTTP基本认证</a>（简单来说就是将用户名和密码放在HTTP头部）和一个加密的连接(HTTPS)。<br>如果每次认证，都要去数据库查询用户的信息来核对，那么响应会非常慢，而且服务器也会有很大的性能损失。为了加快认证的速度，最好在内存中使用认证缓存。这并不违背“无状态”的限制，因为缓存的作用仅仅起加速的作用，没有缓存照样能工作。</blockquote>
<p>无状态的第三方鉴权机制：<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4888929-ed5a07c637d467b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4888929-ed5a07c637d467b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="无状态的第三方鉴权机制" title="无状态的第三方鉴权机制" style="cursor: pointer;"></span></p>
<blockquote>What about 3rd party clients? They cannot have the username and password and all the permissions of the users. So you have to store separately what permissions a 3rd party client can have by a specific user. So the client developers can register they 3rd party clients, and get an unique API key and the users can allow 3rd party clients to access some part of their permissions. Like reading the name and email address, or listing their friends, etc... After allowing a 3rd party client the server will generate an access token. These access token can be used by the 3rd party client to access the permissions granted by the user.<br>通过这个方式，用户可以给第三方应用授权，让第三方应用拿着用户的“令牌”访问网站的一些服务。<p>以上两幅图讲的是RESTful风格的身份认证机制。在实践中最好使用<a href="http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" rel="nofollow noreferrer" target="_blank">OAuth 2.0框架</a>。</p>
</blockquote>
<p>无状态增强了系统的故障恢复能力，因为在服务器上没有保存session的状态，所以恢复起来更容易。<br>更重要的是，无状态意味着分布式系统能够更好地工作，负载均衡器可以自由地将请求分发到任意的服务器。因为请求中都已经包含了服务器所需的所有信息，任何服务器都可以处理。<br>不仅仅是服务器，代理、网关、防火墙也可以理解消息，从而可以在不修改接口的情况下，增加更多强大的功能（比如代理缓存）。<br>并且，无状态让系统的横向拓展能力强大。因为不需要在不同的服务器之间同步session状态，所以服务器之间的沟通开销很低。增加服务器的数量不会带来明显的性能损失（“1+1”更接近于“2”了）。</p>
<blockquote>需要注意的是，REST不是一个“宗教”。在你自己的应用中，遵循REST的同时应该保持合适的尺度。通过权衡利弊，选择总体效益最大的方案，即使这个方案有可能“稍微违反REST的原则”。详见<a href="https://stackoverflow.com/a/6068298/8175856" rel="nofollow noreferrer" target="_blank">"REST is not a religion..." - stackoverflow</a>
</blockquote>
<h2 id="articleHeader9">HATEOAS</h2>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/csr/sh7lm7jhlj7icvxjydhi2mq6/4888929-981aaac89332aac9.png" src="https://static.alili.techhttp://static.zybuluo.com/csr/sh7lm7jhlj7icvxjydhi2mq6/4888929-981aaac89332aac9.png" alt="REST的4个层次" title="REST的4个层次" style="cursor: pointer;"></span></p>
<blockquote>图片来自<a href="https://martinfowler.com/articles/richardsonMaturityModel.html" rel="nofollow noreferrer" target="_blank">steps toward the glory of REST</a>。</blockquote>
<p>前面已经讨论了level 1和level 2，实际上REST还有一个更高的层次：HATEOAS(Hypermedia As The Engine Of Application State)。</p>
<p>对于客户端的资源请求，服务器不仅要返回所请求的资源，而且要返回客户端所处的状态和可转移的状态。（<strong>客户端</strong>有状态）</p>
<blockquote>状态可以简单地理解为客户端展示的数据。可以把客户端比喻成一个状态机，那么这个状态机跳转到一个新的状态，就会显示新的内容。“首页”“文章列表”“某篇文章”就是三种客户端状态。</blockquote>
<p>客户端不需要提前知道应用有哪些状态，而是根据服务端响应的“可转移的状态”，提供给用户选择，从而发生状态转移。</p>
<p>用简单的话来说，在严格的RESTful架构中，客户端不需要提前知道服务端的API有哪些、怎么调用，在客户端与服务器通信的过程中，服务端会告诉客户端：在你当前所处的状态下，有哪些API可以使用、可以转移到哪些状态。</p>
<blockquote>既然服务器是无状态的，那么它要如何知道发起请求的用户处于什么状态呢？这就要求客户端在发送请求的时候要携带上足够的信息，让服务器能够判断客户端所处的状态。</blockquote>
<p>这就很像10086的“电话自动语音应答服务”：你想要查询你的手机流量，只需要会拨打“10086”，对方会提示你按下哪些按键就能进入哪些状态。进入下一个状态以后，又会有语音提示你接下来能够按哪些按键……最终，你能进入到你想要的那个状态（流量查询服务）。你需要记住的仅仅是“10086”这个号码而已！</p>
<blockquote>10086的语音提示相当于Hypermedia，是驱动应用状态转换的“引擎”。</blockquote>
<p>再进一步想想，在RESTful架构中，所有的状态其实就组成了一颗树(更准确地说是网)：根节点就是网站的基地址。在你获取一个节点中的资源的同时，服务器还会返回给你这个节点的边：Hypermedia(超链接就是一种Hypermedia)。通过Hypermedia，你能够知道相邻节点的基本信息、地址。<br>结果就是：你能够访问到这颗树的所有节点，而你所需要提前知道的只是“如何到达根节点”而已！</p>
<blockquote>每个节点就是一个状态。用户可以在这个状态网中不断跳转。<p><a href="https://www.zhihu.com/question/28557115/answer/48120528" rel="nofollow noreferrer" target="_blank">这个例子（知乎）</a>和<a href="https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming/671132#671132" rel="nofollow noreferrer" target="_blank">这个例子（stackoverflow）</a>也是不错的解释。</p>
<p><a href="https://en.wikipedia.org/wiki/Representational_state_transfer" rel="nofollow noreferrer" target="_blank">wikipedia</a>的解释：a REST client should then be able to use server-provided links dynamically to discover all the available actions and resources it needs. As access proceeds, the server responds with text that includes hyperlinks to other actions that are currently available. <strong>There is no need for the client to be hard-coded with information regarding the structure or dynamics of the REST service.</strong></p>
</blockquote>
<p>这种架构的优势非常明显：前后端之间的耦合更加微弱。<br>随着应用功能的升级改变，“树”的样子会大大改变，但是只需要让后端修改返回的资源内容和Hypermedia，前端几乎不用改动。功能的演化更加灵活了。</p>
<h2 id="articleHeader10">“资源”和“状态”的关系</h2>
<p>现在你应该明白Representational State Transfer中的State Transfer(状态传输)是什么意思了：在HATEOAS中，服务端将<strong>客户端所处的状态和可以达到的状态</strong>传输给客户端。</p>
<p>等一下，在前面的<strong>资源</strong>小节，我们不是说过传输的是资源表示（representation）吗？怎么这里又说传输的是状态？</p>
<p>其实在REST架构风格中，“传输状态”和“传输资源表示”是同一个意思。客户端所处的状态，是由它接收到的资源表示来决定的。比如，客户端接收到<code>/user/csr/blogs</code>资源，那么客户端的状态就变成<code>/user/csr/blogs</code>(显示csr的文章列表)。<br>等一下，为什么客户端会收到“/user/csr/blogs”资源？因为客户端请求的就是“/user/csr/blogs”资源。<br>继续追溯，为什么客户端会请求这个资源？因为用户点击了“查看文章列表”的链接（这个链接其实就是一个Hypermedia）。<br>继续追溯，为什么有一个“查看文章列表”的链接显示给用户点击？因为HATEOAS：服务端在返回上一个状态（资源）的时候，会返回所有相邻状态的Hypermedia，其中就包括“查看文章列表”这个Hypermedia。客户端会展示所有相邻状态的Hypermedia供用户选择。</p>
<p>按照从前往后的顺序梳理一遍：</p>
<p>客户端请求根资源<br>=&gt; 服务器<strong>返回根资源的表示</strong>，以及相邻资源的Hypermedia<br>=&gt; 客户端<strong>进入“根资源”状态</strong>（比如说，展示首页）<br>=&gt; 客户端显示所有相邻状态的Hypermedia供用户选择（比如，在首页有一个导航栏，里面有几个链接）<br>=&gt; 用户选择了某个Hypermedia（比如，点击了“查看文章列表”的链接）<br>=&gt; 客户端请求“文章列表”资源<br>=&gt; 服务器返回“文章列表”资源的表示，以及相邻资源的Hypermedia<br>=&gt; 客户端进入“文章列表”状态<br>=&gt; 客户端显示所有相邻状态的Hypermedia供用户选择（比如，在文章列表里，显示所有文章的链接）<br>……</p>
<p>不难发现，客户端接收到一个新的资源表示，就会跳转到新的状态，这个过程称为<strong>状态传输</strong>（服务器给客户端传输新状态）。因此<strong>状态传输</strong>是通过<strong>传输资源表示</strong>来完成的。</p>
<h2 id="articleHeader11">REST的字面意思</h2>
<p>Representational State Transfer的语法结构是(Representational (State Transfer))，在这里我们用的是representation的形容词形式，意思是<strong>在表示层上的</strong>状态传输。这个词的字面意思是<strong>通过传输资源表示来传输客户端状态</strong>。</p>
<blockquote>REST的字面意思在网络上有很多种理解，我参考了某位答主的两个回答：<a href="https://stackoverflow.com/a/10421579/8175856" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/a/1...</a> 和 <a href="https://stackoverflow.com/a/4610675/8175856" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/a/4...</a> ，因为这位答主的回答最符合<a href="https://en.wikipedia.org/wiki/Representational_state_transfer" rel="nofollow noreferrer" target="_blank">wikipedia</a>的解释："The term is intended to evoke an image of how a well-designed Web application behaves: it is a network of Web resources (a virtual state-machine) where the user progresses through the application by selecting links, such as /user/tom, and operations such as GET or DELETE (state transitions), resulting in <strong>the next resource (representing the next state of the application) being transferred to the user for their use</strong>."</blockquote>
<hr>
<h2 id="articleHeader12">总结</h2>
<p>至此，我们应该能够体会到REST已经不仅仅是一种API风格了，它是一种软件架构<strong>风格</strong>(REST本身不是一种架构)。REST风格的软件架构具有很强的演化、拓展能力：</p>
<ol>
<li>一致的URL和HTTP动词使用：确保系统能够接纳多样而又标准的客户端，保证客户端的演化能力。</li>
<li>无状态：保证了系统的横向拓展能力、服务端的演化能力。</li>
<li>HATEOAS：保证了应用本身的演化能力(功能增加、改变)。</li>
</ol>
<p>这3点是单单对演化拓展优势的说明，<a href="https://zhihu.com/question/28557115/answer/79275672" rel="nofollow noreferrer" target="_blank">这个回答</a>总结了REST的6个约束分别对应的优点。</p>
<hr>
<h1 id="articleHeader13">参考资料</h1>
<p><a href="https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" rel="nofollow noreferrer" target="_blank">Roy Fielding 提出REST的论文</a><br><a href="https://en.wikipedia.org/wiki/Representational_state_transfer" rel="nofollow noreferrer" target="_blank">Representational state transfer - wikipedia</a><br><a href="https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming" rel="nofollow noreferrer" target="_blank">What exactly is RESTful programming? - stackoverflow</a><br><a href="https://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness" rel="nofollow noreferrer" target="_blank">Do sessions really violate RESTfulness? - stackoverflow</a><br><a href="https://martinfowler.com/articles/richardsonMaturityModel.html" rel="nofollow noreferrer" target="_blank">steps toward the glory of REST - Martin Fowler(软件开发“教父”)</a></p>
<p><a href="https://www.zhihu.com/question/28557115" rel="nofollow noreferrer" target="_blank">怎样用通俗的语言解释REST，以及RESTful？ - 知乎</a><br><a href="https://www.zhihu.com/question/33959971" rel="nofollow noreferrer" target="_blank">REST风格的优势是什么？ - 知乎</a><br><a href="http://www.ruanyifeng.com/blog/2014/05/restful_api.html" rel="nofollow noreferrer" target="_blank">RESTful API 设计指南</a><br><a href="https://stackoverflow.com/a/10421579/8175856" rel="nofollow noreferrer" target="_blank">What does Representational State mean in REST? - stackoverflow</a><br><a href="http://web.archive.org/web/20160404062313/http://kellabyte.com:80/2011/09/04/clarifying-rest" rel="nofollow noreferrer" target="_blank">Clarifying REST</a><br><a href="http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven" rel="nofollow noreferrer" target="_blank">REST APIs must be hypertext-driven - Roy Fielding</a></p>
<p><a href="https://restfulapi.net/" rel="nofollow noreferrer" target="_blank">REST tutorial 1</a><br><a href="http://www.restapitutorial.com/" rel="nofollow noreferrer" target="_blank">REST tutorial 2</a></p>
<p><a href="https://www.v2ex.com/t/118049" rel="nofollow noreferrer" target="_blank">用户注册、登陆、登出的RESTful API设计</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解REST架构风格

## 原文链接
[https://segmentfault.com/a/1190000014768057](https://segmentfault.com/a/1190000014768057)

