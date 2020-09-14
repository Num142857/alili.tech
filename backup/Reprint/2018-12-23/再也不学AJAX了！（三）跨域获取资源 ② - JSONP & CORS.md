---
title: '再也不学AJAX了！（三）跨域获取资源 ② - JSONP & CORS' 
date: 2018-12-23 2:30:07
hidden: true
slug: gqjdcqch97o
categories: [reprint]
---

{{< raw >}}

                    
<p>浏览器的“同源策略”固然保障了互联网世界的数据隐私与数据安全，但是如果当我们需要使用AJAX跨域请求资源时，“同源策略”又会成为开发者的阻碍。在本文中，我们会简单介绍需要跨域请求资源的两种情景，然后，详细解释目前主流的四种跨域请求资源方案。</p>
<p>让我们开始吧！</p>
<h2 id="articleHeader0">一、何时需要跨域</h2>
<p>试想，当我们拥有多个站点，并且这些站点又经常共享相同的数据，那么为每个站点存储一份数据看起来就蠢透了。更好的方案是，我们建设一台静态资源存储服务器，然后让我们的所有站点都从这一台服务器上获取资源。很理想的方案，但是现实中，我们首要解决的问题便是浏览器的“同源策略”，别忘了，不同域之间无法通过AJAX技术获取资源。这是需要跨域获取资源的主要情景。</p>
<p>另外，站在互联网“开放，平等，自由”精神的角度上讲，如果所有人的数据都被设置为只有同域才能访问，那么互联网世界未免也太无聊了，如果我就是想要与更多的人分享我的数据，难道不应该有办法让我做到这一点吗？</p>
<p>当然有办法，下面我们就将一一解释当下主流的跨域请求资源方式。</p>
<hr>
<h2 id="articleHeader1">二、跨域请求资源方案</h2>
<p>我们将主要介绍以下四种跨域请求资源的方案，并逐一解释他们的原理，实用方式以及优缺点，希望你和我一样有耐心，耐心总是能带来回报：</p>
<ol>
<li>野路子出身却好用的方式：JSONP；</li>
<li>官方推荐的跨域资源共享方案：CORS；</li>
<li>使用HTML5 API：postMessage；</li>
<li>抛弃HTTP，使用：Web Sockets；</li>
</ol>
<p>在开始下面的内容之前，我们首先需要强调一点，<strong>无论是怎样的跨域资源获取方案，本质上都需要服务器端的支持</strong>。跨域获取资源之所以能够成功，本质是服务器默许了你有权限获取相应资源。下面我们所运用的种种方式，实际上是客户端和服务端互相配合，绕过同源策略进行数据交互的工作，千万不要误以为掌握了下述技术后，我们就能成为一个黑客 ??‍♂️。</p>
<h3 id="articleHeader2">（一）野路子出身却异常好用的方式：JSONP</h3>
<p>正如标题所描述的那样，JSONP技术是早期某个(些?)聪明的程序员发明的跨域资源获取方式，由于该技术的简单易用，逐渐变得越来越流行，最终成为经典的跨域获取资源方案。</p>
<p>JSONP是“JSON with padding”的简写，我将其翻译为“被包裹的JSON”，当你看完这个章节，你一定会觉得这个名字相当贴切。</p>
<p>让我们模拟一下当初想到JSONP技术的高手程序员是如何推理的：</p>
<p>首先，我们应该清楚的认识到，浏览器的“同源策略”<strong>只是阻止了通过AJAX技术跨域获取资源，而并没有禁止跨域获取资源这件事本身</strong>，正因如此，我们可以通过<code>&lt;link&gt;</code>标签，<code>&lt;img&gt;</code>标签以及<code>&lt;script&gt;</code>标签中的<code>href</code>属性或<code>src</code>属性获取异域的CSS，JS资源和图片（虽然我们其实并不能读取这些资源的内容）。</p>
<p>其次，我们知道（也许你不知道，但是，还记得吗，我在模拟那个高手程序员？）<code>&lt;script&gt;</code>标签通过<code>src</code>属性加载的JS资源，实际上只是将JS文件内容原封不动的放置在<code>&lt;scritp&gt;</code>的标签内，并没有什么神奇之处！</p>
<p>也就是说，如果我们的sayHi.js文件只有这样一段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sayHi.js
alert('Hi')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// sayHi.js</span>
<span class="hljs-function"><span class="hljs-title">alert</span><span class="hljs-params">(<span class="hljs-string">'Hi'</span>)</span></span>
</code></pre>
<p>当我们在HTML文件中，成功加载sayHi.js文件时，浏览器只不过是做了如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 加载前 -->
<script src=&quot;sayHi.js&quot;></script>

<!-- 加载后 （为了方便阅读，我格式化了代码）-->
<script src=&quot;sayHi.js&quot;>
    alert('Hi')
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 加载前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"sayHi.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 加载后 （为了方便阅读，我格式化了代码）--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"sayHi.js"</span>&gt;</span><span class="actionscript">
    alert(<span class="hljs-string">'Hi'</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这意味着什么呢？这意味着被加载的文件与HTML文件下的其他JS文件共享一个全局作用域。也就是说，<code>&lt;scritp&gt;</code>标签加载到的资源是可以被全局作用域下的函数所使用的！</p>
<p>但是慢着！如果<code>&lt;script&gt;</code>标签加载到的一些数据并不符合JavaScript语法规定的<strong>数据类型</strong>，JavaScript就无法处理这些错误不是吗？而且就算数据类型正常了，我们还应该将数据存储于一个<strong>变量</strong>内，然后调用这个变量...</p>
<p>说的没错！不过我们其实已经离正确答案很近了。</p>
<p>还记的我们这一方案的名称吗？JSONP！，也就是说我们已经约定好了数据的格式为JSON，这是JavaScript可以处理的数据类型，并且JSON格式的数据可以承载大量信息。那么有关<strong>变量</strong>的问题呢？这个回答则更巧妙些，因为我们会通过向服务器传入一个函数的方式，将数据变为函数的参数，让我们直接看看JSONP的使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    function handleResponse(response) {
2.        alert(`You get the data : ${response}`)
3.    }
4.    const script = document.createElement('script')
5.    script.src = 'http://somesite.com/json/?callback=handleResponse'
6.    document.body.insertBefore(script, document.body.firstChild)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleResponse</span>(<span class="hljs-params">response</span>) </span>{
<span class="hljs-number">2.</span>        alert(<span class="hljs-string">`You get the data : <span class="hljs-subst">${response}</span>`</span>)
<span class="hljs-number">3.</span>    }
<span class="hljs-number">4.</span>    <span class="hljs-keyword">const</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>)
<span class="hljs-number">5.</span>    script.src = <span class="hljs-string">'http://somesite.com/json/?callback=handleResponse'</span>
<span class="hljs-number">6.</span>    <span class="hljs-built_in">document</span>.body.insertBefore(script, <span class="hljs-built_in">document</span>.body.firstChild)
</code></pre>
<p>很容易看到，我们在1-3行中创建了一个函数，该函数用来处理我们将要获得的数据，该函数的参数<code>response</code>即是服务器响应的数据。在4-6行中我们所做的是利用JavaScript动态生成一个script标签，并将其插入HTML文档。但是注意第5行我们制定的src值，在URL末尾，我们有这样一段查询参数<code>callback=handleResponse</code>，callback的值正是我们先前创建的函数。</p>
<p>事情开始变得有些令人困惑了，究竟发生了什么呢？我们如何通过上述代码最终实现跨域获取资源？</p>
<p>答案就藏在服务端的代码中，当服务端支持JSONP技术时，会做如下一些设置：</p>
<ol>
<li>识别请求的URL，提取callback参数的值，并动态生成一个执行该参数值（一个函数）的JavaScript语句；</li>
<li>将需要返回的数据放入动态生成的函数中，等待其加在到页面时被执行；</li>
</ol>
<p>此时该文件内容看起来就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleResponse(response) // response为被请求的JSON格式的数据
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">handleResponse</span><span class="hljs-params">(response)</span></span> <span class="hljs-comment">// response为被请求的JSON格式的数据</span>
</code></pre>
<p>因此，当资源加载到位，内容显示在script标签内时，浏览器引擎会执行这条语句，我们想要的数据就可以被我们以任何想要的方式处理了。真不可思议！</p>
<p>你现在知道为什么这项技术被命名为JSONP了吧？那个“padding”指的就是我们的“callback”函数，真是恰如其名。</p>
<p>最后，我们还要对JSONP技术再强调两点：</p>
<ol>
<li>JSONP技术与AJAX技术无关：虽然同样牵扯到跨域获取资源这个主题，但我们应该已经清楚的看到，JSONP的本质是绕过AJAX获取资源的机制，使用原始的<code>src</code>属性获取异域资源；</li>
<li>
<p>JSONP技术存在一下三点缺陷：</p>
<ul>
<li>无法发送POST请求，也就是说JSONP技术只能用于请求异域资源，无法上传数据或修改异域数据；</li>
<li>无法监测JSONP请求是否失败；</li>
<li>可能存在安全隐患：别忘了，JSONP之所以能成功获取异域服务器资源，靠的是服务器动态生成了回调函数，并在页面中执行，那么如果服务器在原有的回调函数下再添加些别的恶意JavaScript代码会怎样？当然也会被执行！所以在使用JSONP技术时，一定要确保请求资源的服务器是值得信赖的；</li>
</ul>
</li>
</ol>
<p>虽然存在一些缺陷，但JSONP的浏览器兼容性却是非常好的，可以说是一种非常小巧高效的跨域资源获取技术。</p>
<hr>
<h3 id="articleHeader3">（二）官方推荐的跨域资源共享方案：CORS</h3>
<p>CORS是W3C颁布的一个浏览器技术规范，其全称为“跨域资源共享”（Cross-origin resource sharing），它的意义在于，它是由W3C官方推广的允许通过AJAX技术跨域获取资源的规范，因此相较于JSONP而言，功能更加强大，使用起来也没有了hack的味道。</p>
<p>关于CORS的具体细节，我建议你可以移步阮一峰的<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">同主题博客</a>阅读，我认为该文章已经将这个主题讲解的十分透彻了。</p>
<p>你当然也可以选择继续向下阅读，看看我是怎样理解CORS技术并重新梳理CORS技术相关知识的，希望也能给你带来帮助。</p>
<p>我们之前提到过，如果想要绕过浏览器“同源策略”，实现使用AJAX技术跨域获取资源，需要服务端和客户端的协同合作。而对于CORS标准而言，实现AJAX跨域获取资源，重点还在于服务器端返回的响应是否清楚的告知了浏览器此次跨域AJAX请求的合法性。</p>
<p>那么？服务器端该如何向浏览器传达这一信息呢？答案是要看AJAX请求的复杂程度，也就是说，对于简单的AJAX请求，服务器要向浏览器做出的“说明”就少，而如果是复杂的AJAX，服务器则要向浏览器多“解释”几句。</p>
<p>那么，如何区分AJAX请求的复杂度呢，标准在于简单的AJAX请求<strong>只符合</strong>下面两个条件：</p>
<ol>
<li>请求方法只属于<strong>HEAD</strong>，<strong>GET</strong>，<strong>POST</strong>请求的其中一种；</li>
<li>
<p>HTTP的头信息只限于以下字段：</p>
<ul>
<li>Accept</li>
<li>Accept-Language</li>
<li>Content-Language</li>
<li>Last-Event-ID</li>
<li>Content-Type（只能为<code>application/x-www-form-urlencoded</code>，<code>multipart/form-data</code>和<code>text/plain</code>其中一种）</li>
</ul>
</li>
</ol>
<p>而当浏览器检测到一个简单的跨域AJAX请求，浏览器会首先为我们添加一个头部信息：<code>Origin</code>它的值为请求发送代码所在的源（希望你还记得，一个<strong>源</strong>由“<strong>协议</strong>”，“<strong>域名</strong>和<strong>端口</strong>”组成）。类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0 ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/cors</span> HTTP/1.1
<span class="hljs-attribute">Origin</span>: http://api.bob.com
<span class="hljs-attribute">Host</span>: api.alice.com
<span class="hljs-attribute">Accept-Language</span>: en-US
<span class="hljs-attribute">Connection</span>: keep-alive
<span class="hljs-attribute">User-Agent</span>: Mozilla/5.0 ...
</code></pre>
<p>而当这样的一条HTTP请求发送到服务端时，服务端会检测该请求报头中的<code>Origin</code>字段的值是否在许可范围内，如果的确是服务端认可的域，那么服务端会在响应报文中添加如下字段：</p>
<ul>
<li>
<code>Access-Control-Allow-Origin</code>（必须）：该字段用来告知浏览器服务端接受的能够发送跨域AJAX请求的域，它的值要么是该次AJAX请求报头中由浏览器自动添加的<code>Origin</code>值，要么还可以是一个<code>*</code>号，表示可以接受任意的域名请求；</li>
<li>
<code>Access-Control-Allow-Credentials</code>（可选）：该字段用来告知浏览器是否允许客户端向服务端发送Cookie。默认情况下，CORS规范会阻止跨域AJAX向服务端发送Cookie，因此该字段默认值为<code>false</code>，当你显式的将该字段值设置为<code>true</code>时，则表示允许此次跨域AJAX向服务端发送Cookie。</li>
<li>
<code>Access-Control-Expose-Headers</code>（可选）：该字段用来向客户端暴露可获取的响应头；</li>
</ul>
<p>CORS规范规定，客户端<code>XMLHttpRequest</code>对象的<code>getResponseHeader()</code>方法只能拿到6个基本的字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* `Cache-Control`：表示响应遵循的缓存机制；
* `Content-Language`：表示响应体的语言；
* `Content-Type`：表示响应体的MIME类型；
* `Expires`：表示文档的过期时间，到期不再缓存；
* `Last-Modified`：表示文档的最后改动时间；
* `Pragma`：用来包含特定的指令；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>* `Cache-Control`：表示响应遵循的缓存机制；
* `Content-Language`：表示响应体的语言；
* `Content-Type`：表示响应体的MIME类型；
* `Expires`：表示文档的过期时间，到期不再缓存；
* `Last-Modified`：表示文档的最后改动时间；
* `Pragma`：用来包含特定的指令；</code></pre>
<p>但是当客户端想要获取额外的响应头字段时，就需要服务端通过在该字段后定义相应的客户端可获取的响应头字段名称。</p>
<hr>
<p>以上就是简单跨域AJAX请求，客户端与服务端的交互，在继续介绍复杂的跨域AJAX请求前，让我们先停一停，回过头来看看响应报头的<code>Access-Control-Allow-Origin</code>字段，谈一谈CORS规范中为什么默认不允许跨域AJAX请求携带Cookie，以及如果客户端需要传送Cookie时，客户端与服务端又该如何交互的问题。</p>
<p>首先，我们要知道，在客户端与服务端数据传输的过程中，Cookie一直是以明文的形式伴随着数据的传输，只要客户端发送了Cookie至服务端，服务端就会至少返回该段Cookie。而我们又提到过，大多数网站都使用Cookie短暂存储用户会话中的身份信息，因此将Cookie暴露在外是存在安全隐患的，CSRF攻击的目的便是获取用户的Cookie信息，因此在跨域AJAX请求中，为了减少Cookie泄露的风险，CORS规范默认禁止跨域AJAX请求携带Cookie。</p>
<p>那么如果客户端实在需要携带Cookie信息怎么办呢？正如上文提到过的，需要客户端与服务端一起配合，让我们看看具体细节：</p>
<ul><li>首先是客户端：</li></ul>
<p>开发者需要在创建XMLHttpRequest对象实例时，手动配置<code>withCredentials</code>属性，将其值设置为<code>true</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest()
xhr.withCredentials = true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>()
xhr.withCredentials = <span class="hljs-literal">true</span>
</code></pre>
<p>某些浏览器会默认允许在跨域AJAX请求中发送Cookie，此时如果不想要发送Cookie，你只需要将其值设置为<code>false</code>。</p>
<ul><li>其次是服务端：</li></ul>
<p>对于服务端而言，除了像之前提到的要在响应报头设置<code>Access-Control-Allow-Credential</code>字段的值为<code>true</code>之外，还需要为<code>Access-Control-Allow-Origin</code>字段设置一个明确的域，不可以再使用<code>*</code>号。</p>
<p>相信你也能明白，这一切都是为了保护客户端与服务端Cookie的隐私和安全。</p>
<hr>
<p>现在我们可以继续我们的主题，一起看一看如果我们的跨域AJAX请求超出了“简单”的标准，客户端与服务端又应该如何相互配合，实现跨域的资源共享。</p>
<p>与简单AJAX跨域请求不同，“复杂“的AJAX跨域请求一共会发送两次HTTP请求，其中第一次为”<strong>查询请求</strong>“，第二次才是我们正式的”<strong>AJAX跨域请求</strong>“。为什么多出了一次”查询请求“呢？道理其实很简单，我们想象一下当发送”复杂“的AJAX跨域请求时，浏览器最先拿到请求开始识别，然后发现这个请求并不“单纯”（不满足简单跨域AJAX请求标准），于是感到十分疑惑的浏览器会试探的沿着请求的地址向服务端发问，询问服务端是否允许异域的客户端向它发送额外的请求信息，这一次“发问”，即是第一次HTTP请求，即“查询请求”。而服务端当然也会这次“发问”给出相应的回答，然后浏览器就会根据回答的结果决定是否继续发送该跨域AJAX请求。</p>
<p>让我们看看具体的实现细节：</p>
<p>首先，让我们创造出一个“复杂”的AJAX跨域请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'http://another.com/cors'
var xhr = new XMLHttpRequest()
xhr.open('put', url, true) // 这里我们设置请求的方式为'put'
xhr.setRequestHeader('X-Custom-Header', 'Value') // 这里我们自定义了一个请求头字段
xhr.send()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://another.com/cors'</span>
<span class="hljs-built_in">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.open(<span class="hljs-string">'put'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>) <span class="hljs-comment">// 这里我们设置请求的方式为'put'</span>
xhr.setRequestHeader(<span class="hljs-string">'X-Custom-Header'</span>, <span class="hljs-string">'Value'</span>) <span class="hljs-comment">// 这里我们自定义了一个请求头字段</span>
xhr.send()
</code></pre>
<p>当浏览器识别到该请求“并不简单”时，就会自动向服务其发送一个“查询请求”，其报头信息大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OPTIONS /cors HTTP/1.1
Origin: http://thisOne.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: another.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>OPTIONS /cors HTTP/<span class="hljs-number">1.1</span>
Origin: http:<span class="hljs-comment">//thisOne.com</span>
Access-Control-Request-<span class="hljs-function"><span class="hljs-keyword">Method</span>:</span> PUT
Access-Control-Request-Headers: X-Custom-Header
Host: another.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/<span class="hljs-number">5.0</span>...
</code></pre>
<p>注意这次“查询请求”使用了“OPTIONS”的请求方法，表明了这是一个查询请求。请求头部的信息说明了<strong>请求来源的域</strong>，<strong>请求使用的HTTP方法</strong>以及<strong>请求额外发送的头部字段</strong>。</p>
<p>让我们再转换至服务器视角，当服务端接收到浏览器发来的这样一个查询请求后，就可以判断出是否应该接收该请求。如果想要向浏览器表示允许该请求，则会返回这样的响应报文：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61（Unix）
Access-Control-Allow-Origin: http://thisOne.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header // 该字段值为以“,”号分割的字符串
Content-type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
<span class="hljs-string">Date:</span> Mon, <span class="hljs-number">01</span> Dec <span class="hljs-number">2008</span> <span class="hljs-number">01</span>:<span class="hljs-number">15</span>:<span class="hljs-number">39</span> GMT
<span class="hljs-string">Server:</span> Apache/<span class="hljs-number">2.0</span><span class="hljs-number">.61</span>（Unix）
Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//thisOne.com</span>
Access-Control-Allow-<span class="hljs-string">Methods:</span> GET, POST, PUT
Access-Control-Allow-<span class="hljs-string">Headers:</span> X-Custom-Header <span class="hljs-comment">// 该字段值为以“,”号分割的字符串</span>
Content-<span class="hljs-string">type:</span> text/html; charset=utf<span class="hljs-number">-8</span>
Content-<span class="hljs-string">Encoding:</span> gzip
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">0</span>
Keep-<span class="hljs-string">Alive:</span> timeout=<span class="hljs-number">2</span>, max=<span class="hljs-number">100</span>
<span class="hljs-string">Connection:</span> Keep-Alive
Content-<span class="hljs-string">Type:</span> text/plain
</code></pre>
<p>读到这里我们已经大概猜的出服务端向浏览器传递的信息了：</p>
<ul>
<li>首先，<code>Access-Control-Allow-Origin</code>字段向浏览器说明了发起AJAX请求的域是被服务器认可的（注意这个字段的值也可以为一个“*”号）；</li>
<li>其次，<code>Access-Control-Allow-Methods</code>字段向浏览器说明了服务器接收跨域AJAX的请求方式；</li>
<li>最后，<code>Access-Control-Allow-Headers</code>字段向浏览器说明了服务器允许跨域AJAX额外发送的报头信息；</li>
</ul>
<p>当浏览器收到服务端这样的表示同意请求的响应后，就会正常发送接下来的跨域AJAX请求，而服务器也会正常的回应。值的一提的是，在服务端与客户端整个跨域AJAX请求的交互中，<code>Access-Control-Allow-Origin</code>头信息自始至终都是必须携带的。</p>
<p>而当服务器在检查“查询请求”后，如果不同该请求，则会返回一个正常的HTTP响应，报文中包含任何与CORS规范有关的报头字段，此时，浏览器就会心领神会的明白服务器拒绝接收发出的跨域AJAX请求，因此会返回一个错误状态（可以被XML对象实例使用onerror回调函数捕获）并在控制台打印一条错误信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="XMLHttpRequest cannot load http://another.com
Origin http://thisOne.com is not allowed by Access-Control-Allow-Origin
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>XMLHttpRequest cannot <span class="hljs-keyword">load</span> <span class="hljs-keyword">http</span>://another.com
Origin <span class="hljs-keyword">http</span>://thisOne.com <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> allowed <span class="hljs-keyword">by</span> <span class="hljs-keyword">Access</span>-Control-<span class="hljs-keyword">Allow</span>-Origin
</code></pre>
<p>至此，无论是“简单”的跨域AJAX请求还是“复杂”的跨域AJAX请求，我们都已经清楚的知晓了他们的运作原理，这真是件了不起的事情。但是先别着急庆祝，我们刚才还遗漏了一个话题没有谈到：“节约复杂AJAX跨域请求的HTTP请求数”。</p>
<p>相信你还记的，对于“复杂”的跨域AJAX请求，浏览器会向服务器发送两次HTTP请求，虽然实际上两次HTTP请求与一次HTTP请求所耗费的时间几乎难以感知，但是如果我们有办法一次搞定，又为什么还要重复做两次呢？</p>
<p>对于服务器而言，“一次搞定”的方法就在于，在浏览器第一次发送复杂的跨域AJAX查询请求时，在响应报头中添加<code>Access-Control-Max-Age</code>字段，这是一个可选的字段，它用来指定本次查询请求的有效期，单位为秒。也就是说，通过该字段，服务器拥有了告知浏览器“这个请求我批准了，X秒以内不需要再向我确认”的能力。至此，我们成功的将接下来的跨域请求数由两次节约为一次！</p>
<h2 id="articleHeader4">三、小结</h2>
<p>一口气看到这里？真不容易！ 希望这是值得的，让我们总结一下我们在本文中都谈到了些什么。首先，我们谈到了我们何时需要发起跨域AJAX请求的问题，做到了“知其然”。其次，我们深入探讨了使用JSONP技术和CORS规范实现发送跨域AJAX请求的细节，成功达到了我们“知其所以然”的目标。相信现在的你已经对向他人谈论“跨域”这个主题充满自信。真的很棒对吧？</p>
<p>如果你依然觉得意犹未尽，不妨接着和我继续深入这个主题，看看实现跨域共享资源的另外两种“时髦”的方式：使用 postMessage 和 webSocket。</p>
<p>感兴趣吗？休息一下，然后再回来，目前为止你表现的都非常出色！? 。</p>
<p><br><br><br><br><br><br>?  Hey！喜欢这篇文章吗？别忘了在下方? 点赞让我知道。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再也不学AJAX了！（三）跨域获取资源 ② - JSONP & CORS

## 原文链接
[https://segmentfault.com/a/1190000012302319](https://segmentfault.com/a/1190000012302319)

