---
title: '前后端分离架构下CSRF防御机制' 
date: 2019-02-03 2:30:40
hidden: true
slug: i56wzh57lq
categories: [reprint]
---

{{< raw >}}

                    
<p>原文： <a href="http://feclub.cn/post/content/koa-grace-csrf" rel="nofollow noreferrer" target="_blank">http://feclub.cn/post/content...</a></p>
<h2 id="articleHeader0">背景</h2>
<h3 id="articleHeader1">1、什么是CSRF攻击？</h3>
<p>这里不再介绍CSRF，已经了解CSRF原理的同学可以直接跳到：“3、前后端分离下有何不同？”。</p>
<p>不太了解的同学可以看这两篇对CSRF介绍比较详细的参考文章：</p>
<ul>
<li><p><a href="https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/" rel="nofollow noreferrer" target="_blank">CSRF 攻击的应对之道</a></p></li>
<li><p><a href="http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html" rel="nofollow noreferrer" target="_blank">浅谈CSRF攻击方式</a></p></li>
</ul>
<p>如果来不及了解CSRF的原理，可以这么理解：<strong>有一个人发给你一个搞(mei)笑(nv)图片链接，你打开这个链接之后，便立刻收到了短信：你的银行里的钱已经转移到这个人的帐户了</strong>。</p>
<h3 id="articleHeader2">2、有哪些防御方案？</h3>
<p>上面这个例子当然有点危言耸听，当然可以确定的是确实会有这样的漏洞：你打开了一个未知域名的链接，然后你就自动发了条广告帖子、你的Gmail的邮件内容就泄露了、你的百度登录状态就没了……</p>
<p>防御方案在上面的两篇文章里也有提到，总结下，无外乎三种：</p>
<ol>
<li><p>用户操作限制，比如验证码；</p></li>
<li><p>请求来源限制，比如限制HTTP Referer才能完成操作；</p></li>
<li><p>token验证机制，比如请求数据字段中添加一个token，响应请求时校验其有效性；</p></li>
</ol>
<p>第一种方案明显严重影响了用户体验，而且还有额外的开发成本；第二种方案成本最低，但是并不能保证100%安全，而且很有可能会埋坑；第三种方案，可取！</p>
<p><strong>token验证的CSRF防御机制</strong>是公认最合适的方案，也是本文讨论的重点。</p>
<h3 id="articleHeader3">3、前后端分离下有何不同？</h3>
<p>《CSRF 攻击的应对之道》这篇文章里有提到：</p>
<blockquote><p>要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的</p></blockquote>
<p>我们前端架构早已经告别了服务端语言（PHP/JAVA等）绑定路由、携带数据渲染模板引擎的方式（毕竟是2011年的文章了，我们笑而不语）。</p>
<p>当然， 前端不要高兴的太早：前后端分离之后，Nodejs不具备完善的服务端SESSION、数据库等功能。</p>
<p>总结一下，在“更先进”的前端架构下，与以往的架构会有一些区别：</p>
<ul>
<li><p>Nodejs层不处理SESSION，无法直接实现会话状态数据保存；</p></li>
<li><p>所有的数据通过Ajax异步获取，可以灵活实现token方案；</p></li>
</ul>
<h2 id="articleHeader4">实现思路</h2>
<p>如上文提到，这里仅仅讨论在“更先进”的前端后端架构背景下的token防御方案的实现。</p>
<h3 id="articleHeader5">1、可行性方案</h3>
<p>token防御的整体思路是：</p>
<ul>
<li><p>第一步：后端随机产生一个token，把这个token保存在SESSION状态中；同时，后端把这个token交给前端页面；</p></li>
<li><p>第二步：下次前端需要发起请求（比如发帖）的时候把这个token加入到请求数据或者头信息中，一起传给后端；</p></li>
<li><p>第三步：后端校验前端请求带过来的token和SESSION里的token是否一致；</p></li>
</ul>
<p>上文提到过，前后端分离状态下，Nodejs是不具备SESSION功能的。那这种token防御机制是不是就无法实现了呢？</p>
<p>肯定不是。我们可以借助cookie把这个流程升级下：</p>
<ul>
<li><p>第一步：后端随机产生一个token，基于这个token通过SHA-56等散列算法生成一个密文；</p></li>
<li><p>第二步：后端将这个token和生成的密文都设置为cookie，返回给前端；</p></li>
<li><p>第三步：前端需要发起请求的时候，从cookie中获取token，把这个token加入到请求数据或者头信息中，一起传给后端；</p></li>
<li><p>第四步：后端校验cookie中的密文，以及前端请求带过来的token，进行正向散列验证；</p></li>
</ul>
<p>当然这样实现也有需要注意的：</p>
<ul>
<li><p>散列算法都是需要计算的，这里会有性能风险；</p></li>
<li><p>token参数必须由前端处理之后交给后端，而不能直接通过cookie；</p></li>
<li><p>cookie更臃肿，会不可避免地让头信息更重；</p></li>
</ul>
<p>现在方案确定了，具体该如何实现呢？</p>
<h3 id="articleHeader6">2、具体实现</h3>
<p>我们的技术栈是 <code>koa(服务端)</code> + <code>Vue.js(前端)</code> 。有兴趣可以看这些资料：</p>
<ul>
<li><p><a href="http://feclub.cn/post/content/qudian_koa" rel="nofollow noreferrer" target="_blank">趣店前端团队基于koajs的前后端分离实践</a></p></li>
<li><p><a href="https://github.com/xiongwilee/koa-grace" rel="nofollow noreferrer" target="_blank">koa-grace——基于koa的标准前后端分离框架</a></p></li>
<li><p><a href="https://github.com/Thunf/grace-vue-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">grace-vue-webpack-boilerplate</a></p></li>
</ul>
<p>在服务端，实现了一个token生成的中间件，<a href="https://github.com/koa-grace/koa-grace-csrf" rel="nofollow noreferrer" target="_blank">koa-grace-csrf</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 注意：代码有做精简
  
  const tokens = require('./lib/tokens');
  return function* csrf(next) {
    let curSecret = this.cookies.get('密文的cookie');
    // 其他如果要获取参数，则为配置参数值
    let curToken = '请求http头信息中的token';
    
    // token不存在
    if (!curToken || !curSecret) {
      return this.throw('CSRF Token Not Found!',403)
    }

    // token校验失败
    if (!tokens.verify(curSecret, curToken)) {
      return this.throw('CSRF token Invalid!',403)
    }

    yield next;

    // 无论何种情况都种两个cookie
    // cookie_key: 当前token的cookie_key,httpOnly
    let secret = tokens.secretSync();
    this.cookies.set(options.cookie_key, secret);
    // cookie_token: 当前token的的content，不需要httpOnly
    let newToken = tokens.create(secret);
    this.cookies.set(options.cookie_token, newToken)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-comment">// 注意：代码有做精简</span>
  
  const tokens = require(<span class="hljs-string">'./lib/tokens'</span>);
  <span class="hljs-keyword">return</span> function* csrf(next) {
    let curSecret = <span class="hljs-keyword">this</span>.cookies.<span class="hljs-keyword">get</span>(<span class="hljs-string">'密文的cookie'</span>);
    <span class="hljs-comment">// 其他如果要获取参数，则为配置参数值</span>
    let curToken = <span class="hljs-string">'请求http头信息中的token'</span>;
    
    <span class="hljs-comment">// token不存在</span>
    <span class="hljs-keyword">if</span> (!curToken || !curSecret) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">throw</span>(<span class="hljs-string">'CSRF Token Not Found!'</span>,<span class="hljs-number">403</span>)
    }

    <span class="hljs-comment">// token校验失败</span>
    <span class="hljs-keyword">if</span> (!tokens.verify(curSecret, curToken)) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">throw</span>(<span class="hljs-string">'CSRF token Invalid!'</span>,<span class="hljs-number">403</span>)
    }

    yield next;

    <span class="hljs-comment">// 无论何种情况都种两个cookie</span>
    <span class="hljs-comment">// cookie_key: 当前token的cookie_key,httpOnly</span>
    let secret = tokens.secretSync();
    <span class="hljs-keyword">this</span>.cookies.<span class="hljs-keyword">set</span>(options.cookie_key, secret);
    <span class="hljs-comment">// cookie_token: 当前token的的content，不需要httpOnly</span>
    let newToken = tokens.create(secret);
    <span class="hljs-keyword">this</span>.cookies.<span class="hljs-keyword">set</span>(options.cookie_token, newToken)
  }</code></pre>
<p>在前端代码中，对发送ajax请求的封装稍作优化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.$http.post(url, data, {
      headers: {
          'http请求头信息字段名': 'cookie中的token'
      }
  }).then((res) => {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-keyword">this</span>.$http.post(url, data, {
      headers: {
          <span class="hljs-string">'http请求头信息字段名'</span>: <span class="hljs-string">'cookie中的token'</span>
      }
  }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(res)</span> =&gt;</span> {})</code></pre>
<p>总结一下：</p>
<ul>
<li><p>Nodejs生成一个随机数，通过随机数生成散列密文；并将随机数和密文存到cookie；</p></li>
<li><p>客户端JS获取cookie中的随机数，通过http头信息交给Nodejs；</p></li>
<li><p>Nodejs响应请求，校验cookie中的密文和头信息中的随机数是否匹配；</p></li>
</ul>
<p>这里依旧有个细节值得提一下：<strong>Nodejs的上层一般是nginx，而nginx默认会过滤头信息中不合法的字段（比如头信息字段名包含“_”的），这里在写头信息的时候需要注意。</strong></p>
<h2 id="articleHeader7">"One more thing..."</h2>
<p>上文也提到，通过cookie及http头信息传递加密token会有很多弊端；有没有更优雅的实现方案呢？</p>
<h3 id="articleHeader8">1、cookie中samesite属性</h3>
<p>回溯下CSRF产生的根本原因：cookie会被第三方发起的跨站请求携带，这本质上是HTTP协议设计的漏洞。</p>
<p>那么，我们能不能通过cookie的某个属性禁止cookie的这个特性呢？</p>
<p>好消息是，<strong>在最新的RFC规范中已经加入了“samesite”属性</strong>。细节这里不再赘述，可以参考：</p>
<ol>
<li><p><a href="http://www.cnblogs.com/ziyunfei/p/5637945.html" rel="nofollow noreferrer" target="_blank">SameSite Cookie，防止 CSRF 攻击</a></p></li>
<li><p><a href="https://tools.ietf.org/html/draft-west-first-party-cookies-07#page-8" rel="nofollow noreferrer" target="_blank"> Same-site Cookies </a></p></li>
</ol>
<h3 id="articleHeader9">2、更优雅的架构</h3>
<p>当然，目前为止，客户端对samesite属性的支持并不是特别好；回到前后端分离架构下，我们明确下前后端分离框架的基本原则：</p>
<p><strong>后端（Java / PHP ）职责：</strong></p>
<ul>
<li><p>服务层颗粒化接口，以便前端Nodejs层异步并发调用；</p></li>
<li><p>用户状态保存，实现用户权限等各种功能；</p></li>
</ul>
<p><strong>前端（Nodejs + Javascript）职责：</strong></p>
<ul>
<li><p>Nodejs层完成路由托管及模板引擎渲染功能</p></li>
<li><p>Nodejs层不负责实现任何SESSION和数据库功能</p></li>
</ul>
<p>我们提到，<code>前端Nodejs层不负责实现任何SESSION和数据库功能</code>，但有没有可能把后端缓存系统做成公共服务提供给Nodejs层使用呢？想想感觉前端整条路都亮了有木有？！这里先挖一个坑，后续慢慢填。</p>
<h3 id="articleHeader10">3、延伸</h3>
<p>这里再顺便提一下，<strong>新架构下的XSS防御</strong>。</p>
<p>犹记得，在狼厂使用PHP的年代，经常被安全部门曝出各类XSS漏洞，然后就在smaty里添加各种<code>escape</code>滤镜，但是添加之后发现竟然把原始数据也给转义了。</p>
<p>当然，现在更多要归功于各种<code>MVVM</code>单页面应用：使得前端完全不需要通过读取URL中的参数来控制VIEW。</p>
<p>不过，还有一点值得一提：前后端分离框架下，路由由Nodejs控制；我自己要获取的后端参数和需要用在业务逻辑的参数，在主观上前端同学更好把握一些。</p>
<p>所以， 在<code>koa(服务端)</code> + <code>Vue.js(前端)</code>架构下基本不用顾虑XSS问题（至少不会被全安组追着问XSS漏洞啥时候修复）。</p>
<h2 id="articleHeader11">总结</h2>
<p>要不学PHP、看Java、玩Python做全栈好了？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前后端分离架构下CSRF防御机制

## 原文链接
[https://segmentfault.com/a/1190000006944760](https://segmentfault.com/a/1190000006944760)

