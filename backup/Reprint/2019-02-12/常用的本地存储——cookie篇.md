---
title: '常用的本地存储——cookie篇' 
date: 2019-02-12 2:30:12
hidden: true
slug: i9tadb0j0h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、引言</h2>
<p>随着浏览器的处理能力不断增强，越来越多的网站开始考虑将数据存储在「客户端」，那就不得不谈谈本地存储了。本地存储的好处显而易见，一是<strong>避免取回数据前页面一片空白</strong>，如果不需要最新数据也可以减少向服务端请求的次数，从而减少用户等待从服务器获取数据的时间，二是网络状态不佳时仍可以<strong>显示离线数据</strong>。</p>
<p>下面来看看常用的本地存储。</p>
<p>用<code>chrome</code>浏览器打开一个网页，进入开发者模式，点击<code>Resources</code>，我们可以看到：</p>
<p><span class="img-wrap"><img data-src="/img/bVt0sv?w=1310&amp;h=446" src="https://static.alili.tech/img/bVt0sv?w=1310&amp;h=446" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上的 <code>indexedDB</code>、<code>Local Storage</code>、<code>Session Storage</code>、<code>Cookies</code>，就是常用的本地存储其中几种。下面我们一一了解。</p>
<h2 id="articleHeader1">二、常用的本地存储</h2>
<p>1、cookie</p>
<p><code>HTTP cookie</code>，通常直接叫做cookie，是客户端用来存储数据的一种选项，它既可以在客户端设置也可以在服务器端设置。cookie会跟随任意HTTP请求一起发送。</p>
<p>优点：兼容性好</p>
<p>缺点：一是增加了网络流量；二则是它的数据容量有限，最多只能存储<code>4KB</code>的数据，浏览器之间各有不同；三是不安全。    </p>
<p>2、userData</p>
<p><code>userData</code>是微软通过一个自定义行为引入的持久化用户数据的概念。用户数据允许每个文档最多<code>128KB</code>数据，每个域名最多<code>1MB</code>数据。</p>
<p>缺点：<code>userData</code>不是 web 标准的一部分，<code>只有IE支持</code>。</p>
<p>3、web存储机制</p>
<p>web storage，包括两种：<code>sessionStorage</code> 和 <code>localStorage</code>，前者严格用于一个浏览器会话中存储数据，因为数据在浏览器关闭后会立即删除；后者则用于跨会话持久化地存储数据。</p>
<p>缺点：IE不支持 SessionStorage，低版本IE ( IE6, IE7 ) 不支持 LocalStorage，并且不支持查询语言</p>
<p>4、indexedDB</p>
<p>indexed Database API，简称为<code>indexedDB</code>，是在浏览器中保存结构化数据的一种「数据库」。它类似SQL数据库的结构化数据存储机制，代替了废弃已久的<code>web SQL Database API</code>，它能够在客户端存储大量的结构化数据，并且使用索引高效检索的API。</p>
<p>缺点：兼容性不好，未得到大部分浏览器的支持。</p>
<p>5、Flash cookie</p>
<p><code>Flash本地存储</code>，类似于HTTP cookie，它是利用 <code>SharedObject</code>类来实现本地存储信息。它默认允许每个站点存储不超过100K的数据，远大于cookie，而且能够跨浏览器。</p>
<p>缺点：浏览器需安装 Flash 控件，毕竟它是通过Flash的类来存储。所幸的是，没有安装Flash的用户极少。</p>
<p>6、Google Gears</p>
<p><code>Google Gears</code>是Google在07年发布的一个开源浏览器插件，Gears 内置了一个基于<code>SQLite</code>的嵌入式 SQL数据库，并提供了统一API 对 数据库进行访问，在取得用户授权之后，每个站点可以在SQL数据库中存储「不限大小」的数据。</p>
<p>缺点：需要安装 Google Gears 组件</p>
<p>下面将对 cookie 进行详细的介绍。</p>
<h2 id="articleHeader2">三、cookie的用途</h2>
<h3 id="articleHeader3">3.1 概述</h3>
<p>下面来详细谈谈cookie。</p>
<p><strong>Cookie是一小段文本信息，伴随着用户请求在 Web 服务器和浏览器之间传递。</strong>它存储于访问者的计算机中，每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。</p>
<p>首先声明，它是「浏览器」提供的一种机制，它将 ﻿document 对象的 cookie 属性提供给 JavaScript。可以使用JavaScript来创建和取回 cookie 的值，因此我们可以通过<code>document.cookie</code>访问它。</p>
<p>cookie是存于用户硬盘的一个文件，这个文件通常对应于一个域名，也就是说，<strong>cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。</strong></p>
<h3 id="articleHeader4">3.2 cookie的用途及工作原理</h3>
<p>那cookie具体能干什么呢？</p>
<p>cookie 将信息存储于用户硬盘，因此可以作为全局变量，这是它最大的一个优点。它最根本的用途是 Cookie 能够帮助 Web 站点<strong>保存有关访问者的信息</strong>，以下列举cookie的几种小用途。</p>
<ul>
<li>保存用户登录信息。这应该是最常用的了。当您访问一个需要登录的界面，例如微博、百度及一些论坛，在登录过后一般都会有类似"下次自动登录"的选项，勾选过后下次就不需要重复验证。这种就可以通过cookie保存用户的id。</li>
<li>创建购物车。购物网站通常把已选物品保存在cookie中，这样可以实现不同页面之间数据的同步(同一个域名下是可以共享cookie的)，同时在提交订单的时候又会把这些cookie传到后台。</li>
<li>跟踪用户行为。例如百度联盟会通过cookie记录用户的偏好信息，然后向用户推荐个性化推广信息，所以浏览其他网页的时候经常会发现旁边的小广告都是自己最近百度搜过的东西。这是可以禁用的，这也是cookie的缺点之一。</li>
</ul>
<p>那么，cookie是怎么起作用的呢？</p>
<p>在上一节中我们知道 cookie 是存在用户硬盘中，用户每次访问站点时，Web应用程序都可以读取 Cookie 包含的信息。当用户再次访问这个站点时，浏览器就会在本地硬盘上查找与该 URL 相关联的 <code>Cookie</code>。如果该 Cookie 存在，浏览器就将它添加到<code>request header</code>的<code>Cookie</code>字段中，与<code>http请求</code>一起发送到该站点。</p>
<p><span class="img-wrap"><img data-src="/img/bVt3CG?w=1684&amp;h=470" src="https://static.alili.tech/img/bVt3CG?w=1684&amp;h=470" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>要注意的是，添加到 <code>request header</code> 中是「浏览器的行为」，存储在<code>cookie</code>的数据「每次」都会被浏览器「自动」放在<code>http</code>请求中。因此，如果这些数据不是每次都要发给服务器的话，这样做无疑会增加网络流量，这也是cookie的缺点之一。为了避免这点，我们必须考虑什么样的数据才应该放在<code>cookie</code>中，而不是滥用cookie。每次请求都需要携带的信息，最典型的就是身份验证了，其他的大多信息都不适合放在cookie中。</p>
<h2 id="articleHeader5">四、cookie的格式</h2>
<p>明白了工作原理后，接着我们来看看cookie长什么样，然后再一步步深入了解该怎么去用它。</p>
<p>那么，如何获取 cookie 呢？从第1小节了解到，浏览器提供了 <code>cookie 属性</code>给 JavaScript，因此可以通过 <code>document.cookie</code> 来访问这个页面中的cookie。   </p>
<p><span class="img-wrap"><img data-src="/img/bVt3CQ?w=1658&amp;h=186" src="https://static.alili.tech/img/bVt3CQ?w=1658&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这是一串字符串，仔细观察，我们可以发现规律。每个 cookie 都以名/值对的形式，即 <code>name=value</code>，名称和值都必须是<code>URL</code>编码的，且两对<code>cookie</code>间以<code>分号和空格</code>隔开。（ps：千万不要忘了空格，特别是在获取某个 cookie 时）</p>
<p>依旧是进入开发者模式，我们来看下Resources下的Cookies</p>
<p><span class="img-wrap"><img data-src="/img/bVt3Dg?w=1970&amp;h=494" src="https://static.alili.tech/img/bVt3Dg?w=1970&amp;h=494" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>红色标注的那行，稍微猜想一下，也可以知道它是与cookie相关的值和属性。name、value 不必多说，自然是 cookie 的名和值。<code>domain</code>、<code>Path</code>、<code>Expries/Max-age</code>、<code>httponly</code>(即HTTP选项）、<code>Secure</code> 等均是 <code>cookie</code> 的属性，我们一一了解下。</p>
<p>我们先手动添加几个cookie，然后再来一一看下属性（具体设置cookie的方法在下一小节详解）。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;test1=myCookie1;&quot;
document.cookie = &quot;test2=myCookie2; domain=.google.com.hk; path=/webhp&quot;
document.cookie = &quot;test3=myCookie3; domain=.google.com.hk; expires=Sat, 04 Nov 2017 16:00:00 GMT; secure&quot;
document.cookie = &quot;test4=myCookie4; domain=.google.com.hk; max-age=10800;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=myCookie1;"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test2=myCookie2; domain=.google.com.hk; path=/webhp"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test3=myCookie3; domain=.google.com.hk; expires=Sat, 04 Nov 2017 16:00:00 GMT; secure"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test4=myCookie4; domain=.google.com.hk; max-age=10800;"</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVt3EV?w=1462&amp;h=244" src="https://static.alili.tech/img/bVt3EV?w=1462&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">4.1 domain和path</h3>
<p>domain 和 path 这两个选项共同决定了cookie能被哪些页面共享。</p>
<p><span class="img-wrap"><img data-src="/img/bVt3FE?w=402&amp;h=198" src="https://static.alili.tech/img/bVt3FE?w=402&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>标红区域是默认情况，正如例1中未设置domain和path最终显示的情况。</p>
<p><code>domain</code> 参数是用来控制 cookie对「哪个域」有效，默认为设置 cookie的那个域。这个值可以包含子域，也可以不包含它。如上图的例子，Domain选项中，可以是"<code>.google.com.hk</code>"(不包含子域,表示它对<code>google.com.hk</code>的所有子域都有效)，也可以是"<code>www.google.com.hk</code>"(包含子域)。</p>
<p><code>path</code>用来控制cookie发送的指定域的「路径」，默认为"/"，表示指定域下的所有路径都能访问。它是在域名的基础下，指定可以访问的路径。例如cookie设置为"<code>domain=.google.com.hk; path=/webhp</code>"，那么只有"<code>.google.com.hk/webhp</code>"及"<code>/webhp</code>"下的任一子目录如"<code>/webhp/aaa</code>"或"<code>/webhp/bbb</code>"会发送cookie信息，而"<code>.google.com.hk</code>"就不会发送，即使它们来自同一个域。</p>
<h3 id="articleHeader7">4.2 expries/max-age失效时间</h3>
<p>expries 和 max-age 是用来决定cookie的生命周期的，也就是cookie何时会被删除。 </p>
<p><span class="img-wrap"><img data-src="/img/bVt3L6?w=376&amp;h=190" src="https://static.alili.tech/img/bVt3L6?w=376&amp;h=190" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>标红区域为默认情况，即<code>Session</code>，表示浏览器会话结束时(即关闭浏览器)就会删除cookie。</p>
<p>当然，用户也可以通过<code>expries</code>设置删除时间。这个值是个<code>GMT</code>格式的日期，类似例三中的<code>Sat, 04 Nov 2017 16:00:00 GMT</code>，这表明这个 cookie 将在2017-11-04的16时整失效，在此期间浏览器关闭后此cookie仍会保存在用户的机器中。GMT格式可以通过 <code>toGMTString()</code> 和 <code>toUTCString()</code> 获得。如果设置的失效时间是个以前的时间，则 cookie 会被立即删除，这也是用来删除 cookie 的方法。</p>
<p>在新的http协议中已经使用 <code>max-age</code> 属性来取代 expries。expries 表示的是失效时间，准确讲是「时刻」，max-age表示的是生效的「时间段」，以「秒」为单位。若 <code>max-age</code> 为正值，则表示 cookie 会在 max-age 秒后失效。如例四中设置"max-age=10800;"，也就是生效时间是3个小时，那么 cookie 将在三小时后失效。若 <code>max-age</code> 为负值，则cookie将在浏览器会话结束后失效，即 session，max-age的默认值为-1。若 <code>max-age</code> 为0，则表示删除cookie。</p>
<h3 id="articleHeader8">4.3 secure</h3>
<p><code>secure</code>是 cookie 的安全标志，通过cookie直接包含一个secure单词来指定，也是cookie中唯一一个非名值对儿的部分。指定后，cookie只有在使用<code>SSL</code>连接（如<code>HTTPS</code>请求）时才会发送到服务器。</p>
<p>默认情况为空，不指定 secure 选项，即不论是 http 请求还是 https 请求，均会发送cookie。</p>
<p><span class="img-wrap"><img data-src="/img/bVt3U6?w=122&amp;h=214" src="https://static.alili.tech/img/bVt3U6?w=122&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>标红区域为指定 <code>secure</code> 后的情况，同时也说明指定 secure 后 cookie 仍可见。</p>
<p>注意：只有保证网页是<code>https协议</code>(或其他安全协议)请求的，才能客户端在客户端通过 js 去设置secure 类型的 cookie。</p>
<h3 id="articleHeader9">4.4 httponly</h3>
<p><code>httponly</code>属性是用来限制客户端脚本对cookie的访问。将 cookie 设置成 httponly 可以减轻xss攻击的危害，防止cookie被窃取，以增强cookie的安全性。（由于cookie中可能存放身份验证信息，放在cookie中容易泄露）</p>
<p>HTTP那列用来表示是否设置了httponly属性，若设置了httponly，则会打勾（即标红区域）</p>
<p><span class="img-wrap"><img data-src="/img/bVt0zi?w=1444&amp;h=298" src="https://static.alili.tech/img/bVt0zi?w=1444&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVt0ze?w=1652&amp;h=106" src="https://static.alili.tech/img/bVt0ze?w=1652&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们用 js 获取下cookie，可以发现访问不到 <code>NID</code> 这个cookie，说明js是无法读取和修改 httponly cookies，当然也不能设置 cookie 为 httponly，这只能通过服务器端去设置。</p>
<p>默认情况是不指定 httponly，即可以通过 js 去访问。</p>
<h2 id="articleHeader10">五、设置cookie</h2>
<p>将 cookie 的属性介绍后，下一步就该谈谈如何利用这些属性去设置 cookie 了~</p>
<h3 id="articleHeader11">5.1 服务器端设置</h3>
<p>服务器通过发送一个名为 <code>Set-Cookie</code> 的HTTP头来创建一个cookie，作为 Response Headers 的一部分。如下图所示，每个Set-Cookie 表示一个 cookie（<strong>如果有多个cookie,需写多个Set-Cookie</strong>），每个属性也是以名/值对的形式（除了<code>secure</code>），属性间以<code>分号加空格</code>隔开。格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Set-Cookie: name=value[; expires=GMTDate][; domain=domain][; path=path][; secure]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>Set-Cookie: name=value[<span class="hljs-string">; expires=GMTDate</span>][<span class="hljs-symbol">; domain=domain</span>][<span class="hljs-string">; path=path</span>][<span class="hljs-symbol">; secure</span>]
</code></pre>
<p>只有<code>cookie</code>的名字和值是必需的。</p>
<p><span class="img-wrap"><img data-src="/img/bVt0y1?w=1668&amp;h=340" src="https://static.alili.tech/img/bVt0y1?w=1668&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>注意，通过 Set-Cookie 指定的可选项(域、路径、失效时间、secure标志)只会在「浏览器端」使用，它们都是服务器给浏览器的指示，以指定何时应该发送cookie。<strong>这些参数不会被发送至服务器端</strong>，只有name和value才会被发送。</p>
<h3 id="articleHeader12">5.2 客户端设置</h3>
<p>客户端设置<code>cookie</code>的格式和<code>Set-Cookie</code>头中使用的格式一样。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;name=value[; expires=GMTDate][; domain=domain][; path=path][; secure]&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>document.cookie = "name=value[<span class="hljs-string">; expires=GMTDate</span>][<span class="hljs-symbol">; domain=domain</span>][<span class="hljs-string">; path=path</span>][<span class="hljs-symbol">; secure</span>]"
</code></pre>
<p>可以参照第3小节的四个例子测试下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;test1=myCookie1;&quot;
document.cookie = &quot;test2=myCookie2; domain=.google.com.hk; path=/webhp&quot;
document.cookie = &quot;test3=myCookie3; domain=.google.com.hk; expires=Sat, 04 Nov 2017 16:00:00 GMT; secure&quot;
document.cookie = &quot;test4=myCookie4; domain=.google.com.hk; max-age=10800;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=myCookie1;"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test2=myCookie2; domain=.google.com.hk; path=/webhp"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test3=myCookie3; domain=.google.com.hk; expires=Sat, 04 Nov 2017 16:00:00 GMT; secure"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test4=myCookie4; domain=.google.com.hk; max-age=10800;"</span>
</code></pre>
<p>若想要添加多个cookie，只能重复执行 <code>document.cookie</code>（如上）。这可能和平时写的 js 不太一样，一般重复赋值是会覆盖的，但对于cookie，重复执行 document.cookie 并「不覆盖」，而是「添加」（针对「不同名」的）。</p>
<h3 id="articleHeader13">5.3 cookie的修改</h3>
<p>上一节的最后是否有些疑惑？针对不同名的cookie，执行document.cookie是添加，那「同名」的呢？实地演练一下~</p>
<p>如下图，我们以test1作为实例试验下。</p>
<p><span class="img-wrap"><img data-src="/img/bVt0wB?w=1600&amp;h=90" src="https://static.alili.tech/img/bVt0wB?w=1600&amp;h=90" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="再执行次 document.cookie = &quot;test1=newCookie;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>再执行次 document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=newCookie;"</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVt0wI?w=1608&amp;h=70" src="https://static.alili.tech/img/bVt0wI?w=1608&amp;h=70" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们发现，原来值为myCookie1的cookie不见了，<code>test1</code>原来的值<code>myCookie1</code>被<code>newCookie</code>覆盖了，这也是这章要讲解的，修改<code>cookie</code>的方法。还没结束哦，我们再试下能不能修改参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;test1=newCookie; max-age=3600; secure&quot;  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=newCookie; max-age=3600; secure"</span>  
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVt0wJ?w=1618&amp;h=78" src="https://static.alili.tech/img/bVt0wJ?w=1618&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如上图，我们成功更改了名为test1的cookie的过期时间及安全标志。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;test1=newCookie; domain=.google.com.hk; max-age=3600; secure&quot;
document.cookie = &quot;test1=newCookie; path=/webhp; max-age=3600; secure&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=newCookie; domain=.google.com.hk; max-age=3600; secure"</span>
document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">"test1=newCookie; path=/webhp; max-age=3600; secure"</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVt0xO?w=1636&amp;h=146" src="https://static.alili.tech/img/bVt0xO?w=1636&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们发现没有覆盖原来的cookie，而是<strong>新增</strong>了cookie。这也是修改cookie时需要注意的地方，可以修改原cookie的expries、secure属性，但<strong>不能修改domain、path属性</strong>。修改cookie时domain、path必须与原cookie保持一致。</p>
<h3 id="articleHeader14">5.4 cookie的删除</h3>
<p>cookie的删除其实特别简单，也是对此cookie重新赋值，上面介绍<code>expries</code>和<code>max-age</code>时也有提到，将<code>expries</code>设为一个过去的时间或将<code>max-age</code>设为<code>0</code>，都可以删除cookie。同时也要特别注意此cookie的<code>domain、path</code>要与原来保持一致。</p>
<h2 id="articleHeader15">六、cookie编码</h2>
<p>若 cookie 的名或值中包含<strong>分号、逗号和空格</strong>这三个特殊字符，那么它需要经过<code>URL</code>编码。一般可以使用<code>encodeURIComponent</code>进行编码，它对应的解码函数是<code>decodeURIComponent</code>。若要给 cookie 指定额外的信息，只要将参数追加到该字符串（如下例）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = encodeURIComponent(&quot;test&quot;) + &quot;=&quot; + encodeURIComponent(&quot;myCookie&quot;) + &quot;; max-age=3600&quot;;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.cookie = <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">"test"</span>) + <span class="hljs-string">"="</span> + <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">"myCookie"</span>) + <span class="hljs-string">"; max-age=3600"</span>;

</code></pre>
<h2 id="articleHeader16">七、cookie的缺点</h2>
<ul>
<li>安全性：由于cookie在HTTP中是明文传递的，其中包含的数据都可以被他人访问，可能会被篡改、盗用。</li>
<li>大小限制：cookie的大小限制在4KB左右，若要做大量存储显然不是理想的选择。</li>
<li>增加流量：cookie每次请求都会被自动添加到Request Header中，无形中增加了流量。cookie信息越大，对服务器请求的时间也越长。</li>
</ul>
<p>﻿因此要<strong>慎用</strong>cookie，不要在cookie中存储重要和敏感的数据。</p>
<h2 id="articleHeader17">八、结语</h2>
<p>﻿关于 cookie 的部分就先聊到这啦~有不对的地方欢迎指正~</p>
<p>参考资料：</p>
<ul>
<li>《JavaScript高级程序设计》</li>
<li><a href="http://www.quirksmode.org/js/cookies.html" rel="nofollow noreferrer" target="_blank">http://www.quirksmode.org/js/...</a></li>
<li><a href="https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/" rel="nofollow noreferrer" target="_blank">https://www.nczonline.net/blo...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常用的本地存储——cookie篇

## 原文链接
[https://segmentfault.com/a/1190000004743454](https://segmentfault.com/a/1190000004743454)

