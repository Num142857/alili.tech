---
title: '[面试专题]前端需要知道的web安全知识' 
date: 2019-01-02 2:30:09
hidden: true
slug: u2ol9eld6u
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前端需要知道的web安全知识</h1>
<p>标签（空格分隔）： 未分类</p>
<hr>
<h1 id="articleHeader1">安全</h1>
<ul>
<li><p><code>[Doc]</code> Crypto (加密)</p></li>
<li><p><code>[Doc]</code> TLS/SSL</p></li>
<li><p><code>[Doc]</code> HTTPS</p></li>
<li><p><code>[Point]</code> XSS</p></li>
<li><p><code>[Point]</code> CSRF</p></li>
<li><p><code>[Point]</code> 中间人攻击</p></li>
<li><p><code>[Point]</code> Sql/Nosql 注入攻击</p></li>
</ul>
<h2 id="articleHeader2">Crypto</h2>
<p>Node.js 的 <code>crypto</code> 模块封装了诸多的加密功能, 包括 OpenSSL 的哈希、HMAC、加密、解密、签名和验证函数等.</p>
<blockquote><p>加密是如何保证用户密码的安全性?</p></blockquote>
<p>在客户端加密, 是增加传输的过程中被第三方嗅探到密码后破解的成本. 对于游戏, 在客户端加密是防止外挂/破解等. 在服务端加密 (如 md5) 是避免管理数据库的 DBA 或者攻击者攻击数据库之后直接拿到明文密码, 从而提高安全性.</p>
<h2 id="articleHeader3">TLS/SSL</h2>
<p>早期的网络传输协议由于只在大学内使用, 所以是默认互相信任的. 所以传统的网络通信可以说是没有考虑网络安全的. 早年的浏览器大厂网景公司为了应对这个情况设计了 SSL (Secure Socket Layer), SSL 的主要用途是:</p>
<ol>
<li><p>认证用户和服务器, 确保数据发送到正确的客户机和服务器;</p></li>
<li><p>加密数据以防止数据中途被窃取;</p></li>
<li><p>维护数据的完整性, 确保数据在传输过程中不被改变.</p></li>
</ol>
<p>存在三个特性:</p>
<ul>
<li><p>机密性：SSL协议使用密钥加密通信数据</p></li>
<li><p>可靠性：服务器和客户都会被认证, 客户的认证是可选的</p></li>
<li><p>完整性：SSL协议会对传送的数据进行完整性检查</p></li>
</ul>
<p>1999年, SSL 因为应用广泛, 已经成为互联网上的事实标准. IETF 就在那年把 SSL 标准化/强化. 标准化之后的名称改为传输层安全协议 (Transport Layer Security, TLS). 很多相关的文章都把这两者并列称呼 (TLS/SSL), 因为这两者可以视作同一个东西的不同阶段.</p>
<h2 id="articleHeader4">HTTPS</h2>
<p>在网络上, 每个网站都在各自的服务器上, 想要确保你访问的是一个正确的网站, 并且访问到这个网站正确的数据 (没有被劫持/篡改), 除了需要传输安全之外, 还需要安全的认证, 认证不能由目标网站进行, 否则恶意/钓鱼网站也可以自己说自己是对的, 所以为了能在网络上维护网络之间的基本信任, 早期的大厂们合力推动了一项名为 PKI 的基础设施, 通过第三方来认证网站.</p>
<p>公钥基础设施 (Public Key Infrastructure, PKI) 是一种遵循标准的, 利用公钥加密技术为电子商务的开展提供一套安全基础平台的技术和规范. 其基础建置包含认证中心 (Certification Authority, CA) 、注册中心 (Register Authority, RA) 、目录服务 (Directory Service, DS) 服务器. </p>
<p>由 RA 统筹、审核用户的证书申请, 将证书申请送至 CA 处理后发出证书, 并将证书公告至 DS 中. 在使用证书的过程中, 除了对证书的信任关系与证书本身的正确性做检查外, 并透过产生和发布证书废止列表 (Certificate Revocation List, CRL) 对证书的状态做确认检查, 了解证书是否因某种原因而遭废弃. 证书就像是个人的身分证, 其内容包括证书序号、用户名称、公开金钥 (Public Key) 、证书有效期限等.</p>
<p>在 TLS/SLL 中你可以使用 OpenSSL 来生成 TLS/SSL 传输时用来认证的 public/private key. 不过这个 public/private key 是自己生成的, 而通过 PKI 基础设施可以获得权威的第三方证书 (key) 从而加密 HTTP 传输安全. 目前博客圈子里比较流行的是 <a href="https://imququ.com/post/letsencrypt-certificate.html" rel="nofollow noreferrer" target="_blank">Let's Encrypt 签发免费的 HTTPS 证书</a>.</p>
<p>需要注意的是, 如果 PKI 受到攻击, 那么 HTTPS 也一样不安全. 可以参见 <a href="https://www.zhihu.com/question/22795329" rel="nofollow noreferrer" target="_blank">HTTPS 劫持 - 知乎讨论</a> 中的情况, 证书由 CA 机构签发, 一般浏览器遇到非权威的 CA 机构是会告警的 (参见 <a href="https://kyfw.12306.cn/otn/" rel="nofollow noreferrer" target="_blank">12306</a>), 但是如果你在某些特殊的情况下信任了某个未知机构/证书, 那么也可能被劫持.</p>
<p>此外有的 CA 机构以邮件方式认证, 那么当某个网站的邮件服务收到攻击/渗透, 那么攻击者也可能以此从 CA 机构获取权威的正确的证书.</p>
<h2 id="articleHeader5">XSS</h2>
<p>跨站脚本 (Cross-Site Scripting, XSS) 是一种代码注入方式, 为了与 CSS 区分所以被称作 XSS. 早期常见于网络论坛, 起因是网站没有对用户的输入进行严格的限制, 使得攻击者可以将脚本上传到帖子让其他人浏览到有恶意脚本的页面, 其注入方式很简单包括但不限于 JavaScript / VBScript / CSS / Flash 等.</p>
<p>当其他用户浏览到这些网页时, 就会执行这些恶意脚本, 对用户进行 Cookie 窃取/会话劫持/钓鱼欺骗等各种攻击. 其原理, 如使用 js 脚本收集当前用户环境的信息 (Cookie 等), 然后通过 img.src, Ajax, onclick/onload/onerror 事件等方式将用户数据传递到攻击者的服务器上. 钓鱼欺骗则常见于使用脚本进行视觉欺骗, 构建假的恶意的 Button 覆盖/替换真实的场景等情况 (该情况在用户上传 CSS 的时候也可能出现, 如早起淘宝网店装修, 使用 CSS 拼接假的评分数据等覆盖在真的评分数据上误导用户).</p>
<ul>
<li><p>反射型XSS:非持久化，欺骗用户去点击链接,攻击代码包含在url中,被用户点击之后执行攻击代码.</p></li>
<li><p>存储型XSS:持久型,攻击提交恶意代码到服务器，服务器存储该段代码,这样当其他用户请求后，服务器返回gai'go'n并发给用户，用户浏览此类页面时就可能受到攻击。例如:恶意用户的HTML或JS输入服务器-&gt;进入数据库-&gt;服务器响应时查询数据库-&gt;用户浏览器。</p></li>
<li>
<p>防范与过滤</p>
<ul>
<li><p>输入编码过滤:对于每一个输入，在客户端和服务器端验证是否合法字符，长度是否合法，格式是否正确,对字符进行转义.非法字符过滤.</p></li>
<li><p>输出编码过滤:对所有要动态输出到页面的内容，进行相关的编码和转义.主要有HTML字符过滤和转义,JS脚本转义过滤.url转义过滤.</p></li>
<li><p>设置http-only,避免攻击脚本读取cookie.</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader6">CPS 策略</h3>
<p>在百般无奈, 没有统一解决方案的情况下, 厂商们推出了 CPS 策略. </p>
<p>以 Node.js 为例, 计算脚本的 hashes 值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const crypto = require('crypto');

function getHashByCode(code, algorithm = 'sha256') {
  return algorithm + '-' + crypto.createHash(algorithm).update(code, 'utf8').digest(&quot;base64&quot;);
}

getHashByCode('console.log(&quot;hello world&quot;);'); // 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHashByCode</span>(<span class="hljs-params">code, algorithm = <span class="hljs-string">'sha256'</span></span>) </span>{
  <span class="hljs-keyword">return</span> algorithm + <span class="hljs-string">'-'</span> + crypto.createHash(algorithm).update(code, <span class="hljs-string">'utf8'</span>).digest(<span class="hljs-string">"base64"</span>);
}

getHashByCode(<span class="hljs-string">'console.log("hello world");'</span>); <span class="hljs-comment">// 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='</span></code></pre>
<p>设置 CSP 头:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="content-security-policy: script-src 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs csp"><code style="word-break: break-word; white-space: initial;">content-security-policy: <span class="hljs-keyword">script-src</span> <span class="hljs-string">'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>console.log('hello geemo')</script> <!-- 不执行 -->
<script>console.log('hello world');</script> <!-- 执行 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello geemo'</span>)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 不执行 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello world'</span>);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 执行 --&gt;</span></code></pre>
<p>策略指令可以参见 <a href="https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives" rel="nofollow noreferrer" target="_blank">CSP Policy Directives</a>以及<a href="http://www.ruanyifeng.com/blog/2016/09/csp.html" rel="nofollow noreferrer" target="_blank">阮一峰的博文</a>, <a href="https://imququ.com/post/content-security-policy-reference.html" rel="nofollow noreferrer" target="_blank">屈大神的博文</a></p>
<h2 id="articleHeader7">CSRF</h2>
<p>跨站请求伪造 (Cross-Site Request Forgery) 是一种伪造跨站请求的攻击方式. 例如利用你在 A 站 (攻击目标) 的 cookie / 权限等, 在 B 站 (恶意/钓鱼网站) 拼装 A 站的请求.</p>
<p>已知某站点 A 删除的接口是 get 到某个地址, 并指定一个帖子的 id.  在网站 B 上组织一个删除A站某文章的get请求. 然后A站用户访问B站,触发该请求. 就可以不知情的情况下删除某个帖子.</p>
<p>同源策略是最早用于防止 CSRF 的一种方式, 即关于跨站请求 (Cross-Site Request) 只有在同源/信任的情况下才可以请求. 但是如果一个网站群, 在互相信任的情况下, 某个网站出现了问题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.public.com
b.public.com
c.public.com
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.public</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.public</span><span class="hljs-selector-class">.com</span>
c<span class="hljs-selector-class">.public</span><span class="hljs-selector-class">.com</span>
...</code></pre>
<p>以上情况下, 如果 c.public.com 上没有预防 xss 等情况, 使得攻击者可以基于此站对其他信任的网站发起 CSRF 攻击.</p>
<p>另外同源策略主要是浏览器来进行验证的, 并且不同浏览器的实现又各自不同, 所以在某些浏览器上可以直接绕过, 而且也可以直接通过短信等方式直接绕过浏览器.</p>
<p>预防:</p>
<ol>
<li><p>在 HTTP 头中自定义属性并验证</p></li>
<li><p>检查 CSRF token.</p></li>
<li><p>cookie中加入hash随机数.</p></li>
<li><p>通过检查来过滤简单的 CSRF 攻击, 主要检查一下两个 header:</p></li>
</ol>
<ul>
<li><p>Origin Header</p></li>
<li><p>Referer Header</p></li>
</ul>
<h2 id="articleHeader8">中间人攻击</h2>
<p>中间人 (Man-in-the-middle attack, MITM) 是指攻击者与通讯的两端分别创建独立的联系, 并交换其所收到的数据, 使通讯的两端认为他们正在通过一个私密的连接与对方直接对话, 但事实上整个会话都被攻击者完全控制. 在中间人攻击中, 攻击者可以拦截通讯双方的通话并插入新的内容.</p>
<p>目前比较常见的是在公共场所放置精心准备的免费 wifi, 劫持/监控通过该 wifi 的流量. 或者攻击路由器, 连上你家 wifi 攻破你家 wifi 之后在上面劫持流量等.</p>
<p>对于通信过程中的 MITM, 常见的方案是通过 PKI / TLS 预防, 及时是通过存在第三方中间人的 wifi 你通过 HTTPS 访问的页面依旧是安全的. 而 HTTP 协议是明文传输, 则没有任何防护可言.</p>
<p>不常见的还有强力的互相认证, 你确认他之后, 他也确认你一下; 延迟测试, 统计传输时间, 如果通讯延迟过高则认为可能存在第三方中间人; 等等.</p>
<h2 id="articleHeader9">SQL/NoSQL 注入</h2>
<p>注入攻击是指当所执行的一些操作中有部分由用户传入时, 用户可以将其恶意逻辑注入到操作中. 当你使用 eval, new Function 等方式执行的字符串中有用户输入的部分时, 就可能被注入攻击. 上文中的 XSS 就属于一种注入攻击. 前面的章节中也提到过 Node.js 的 child_process.exec 由于调用 bash 解析, 如果执行的命令中有部分属于用户输入, 也可能被注入攻击.</p>
<h3 id="articleHeader10">SQL</h3>
<p>Sql 注入是网站常见的一种注入攻击方式. 其原因主要是由于登录时需要验证用户名/密码, 其执行 sql 类似:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SELECT * FROM users WHERE usernae = 'myName' AND password = 'mySecret';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="sql hljs"><code class="sql" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">users</span> <span class="hljs-keyword">WHERE</span> usernae = <span class="hljs-string">'myName'</span> <span class="hljs-keyword">AND</span> <span class="hljs-keyword">password</span> = <span class="hljs-string">'mySecret'</span>;</code></pre>
<p>其中的用户名和密码属于用户输入的部分, 那么在未做检查的情况下, 用户可能拼接恶意的字符串来达到其某种目的, 例如上传密码为 <code>'; DROP TABLE users; --</code> 使得最终执行的内容为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SELECT * FROM users WHERE usernae = 'myName' AND password = ''; DROP TABLE users; --';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="sql hljs"><code class="sql" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">users</span> <span class="hljs-keyword">WHERE</span> usernae = <span class="hljs-string">'myName'</span> <span class="hljs-keyword">AND</span> <span class="hljs-keyword">password</span> = <span class="hljs-string">''</span>; <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">users</span>; <span class="hljs-comment">--';</span></code></pre>
<p>其能实现的功能, 包括但不限于删除数据 (经济损失), 篡改数据 (密码等), 窃取数据 (网站管理权限, 用户数据) 等. 防治手段常见于:</p>
<ul>
<li><p>给表名/字段名加前缀 (避免被猜到)</p></li>
<li><p>报错隐藏表信息 (避免被看到, 12306 早起就出现过的问题)</p></li>
<li><p>过滤可以拼接 SQL 的关键字符</p></li>
<li><p>对用户输入进行转义</p></li>
<li><p>验证用户输入的类型 (避免 limit, order by 等注入)</p></li>
<li><p>等...</p></li>
</ul>
<h3 id="articleHeader11">NoSQL</h3>
<p>看个简单的情况:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {user, pass, age} = ctx.query;

db.collection.find({
  user, pass,
  $where: `this.age >= ${age}`
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> {user, pass, age} = ctx.query;

db.collection.find({
  user, pass,
  <span class="hljs-attr">$where</span>: <span class="hljs-string">`this.age &gt;= <span class="hljs-subst">${age}</span>`</span>
})</code></pre>
<p>那么这里的 age 就可以注入了. 另外 GET/POST 还可以传递深层结构 (比如 ?name[0]=alan 传递上来), 通过 qs 之类的模块解析后导致注入, 如 <a href="https://github.com/cnodejs/nodeclub/commit/0f6cc14f6bcbbe6b4de3199c6896efaec637693e" rel="nofollow noreferrer" target="_blank">cnodejs 遭遇 mongodb 注入</a>.</p>
<h3 id="articleHeader12">DDOS</h3>
<blockquote><p>DDoS即Distributed Denial of Service，分布式拒绝服务。也就是攻击者借助或者利用服务器技术，将多个计算机（肉鸡或僵尸机）联合起来作为攻击平台，对一个或者多个目标服务器，同一时间发送大量垃圾信息，或利用某种干扰信息的方式，导致目标服务器无法及时响应正常用户正常请求，或者直接导致目标服务器宕机，从而无法为正常用户提供服务的一种攻击行为。</p></blockquote>
<p>攻击方式:</p>
<ul>
<li><p>端口扫描攻击</p></li>
<li><p>ping洪水（flooding）攻击</p></li>
<li><p>SYN洪水（flooding）攻击</p></li>
<li><p>FTP跳转攻击</p></li>
</ul>
<p>防范手段:</p>
<ul>
<li><p>保证服务器系统的安全,确保服务器软件没有任何漏洞，防止攻击者入侵。</p></li>
<li><p>确保服务器采用最新系统，并打上安全补丁。</p></li>
<li><p>在服务器上删除未使用的服务，关闭未使用的端口。</p></li>
<li><p>对于服务器上运行的网站，确保其打了最新的补丁，没有安全漏洞。</p></li>
<li><p>隐藏服务器的真实IP地址</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[面试专题]前端需要知道的web安全知识

## 原文链接
[https://segmentfault.com/a/1190000010913697](https://segmentfault.com/a/1190000010913697)

