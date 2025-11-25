---
title: '基于NODEJS的SSO登录方案' 
date: 2019-02-06 2:30:09
hidden: true
slug: rvrdvm3qjj
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、前言</h3>
<p>注册、登录是服务端常做的功能，主要涉及用户信息表单提交、会员信息保存、登录状态维护，前端除了表单提交外也没有什么可参与的，能发挥的作用很少。</p>
<p>如果通过nodejs介入开发，则可参与更多，这也是为什么建议大家学习下nodejs，通过服务端语言来增强自己的技术栈，技术研发是一个综合类的能力，相比较Java，单纯依靠前端是难以支撑技术的体量，这也是前端人员发展后期所面临的尴尬，若以前端为主体，知晓服务端、数据库、运维、测试等技术栈，则能支撑更宽更深的技术体量。</p>
<p>前段时间为公司项目提供了sso解决方案，这里分享下。</p>
<h3 id="articleHeader1">二、误区</h3>
<p>登录重点在于会员状态的维护、保持，初级者有两个误区</p>
<ul><li><p>使用数据库保持登录状态</p></li></ul>
<p>即收到用户登录信息后，将状态维护在数据库，这样是可行的，但效率是非常低，因为后续每次涉及到用户权限的页面、数据获取都需要先验证状态，通过数据库操作耗时</p>
<ul><li><p>单纯使用session</p></li></ul>
<p>这算不上一个误区，也是教程常用的方式，不过session通常是保存在当前服务的缓存里的，单台服务可行，但多台服务器集群时，session无法共享</p>
<p>基于上面两种情况，我们需要一个可被多台服务器快速访问的独立服务 -- redis。memcache也可达到，不过相比之下，redis功能、稳定性都更好。</p>
<h3 id="articleHeader2">登录实现</h3>
<p>前后端分离时我采用了下图的架构，可参考 <a href="http://www.upopen.cn/blog/info?id=575534339f414f2e4a15581b" rel="nofollow noreferrer" target="_blank">全栈技术栈</a></p>
<p><span class="img-wrap"><img data-src="http://www.upopen.cn/assets/upload/article/frame.png" src="https://static.alili.techhttp://www.upopen.cn/assets/upload/article/frame.png" alt="全栈架构图" title="全栈架构图" style="cursor: pointer;"></span></p>
<h4>前后端分离架构中登录流程</h4>
<p>分离架构中流程如下</p>
<p><span class="img-wrap"><img data-src="http://www.upopen.cn/assets/upload/article/login.png" src="https://static.alili.techhttp://www.upopen.cn/assets/upload/article/login.png" alt="前后端分享时的登录流程" title="前后端分享时的登录流程" style="cursor: pointer;"></span></p>
<p>用户在client输入username + password，提交到Node服务，Node对数据做规则有效性验证，错误则返回，通过则发给java到DB做信息验证，会员信息有效，由java端生成sessionId，通过http-header-cookie，由nodejs保存到客户端的cookie里，同时由java将sessionId保存到独立的缓存服务器redis里，以sessionId为key，可以多保存一些不适合保存在客户端的信息，如权限。</p>
<p>当客户端请求用户数据时，http会自动带上cookie，nodejs检查是否有sessionId，如无，或在redis里不存在，则返回错误或redirect到login.html，若有，则继续请求java，通常任何一个涉及到用户信息的请求，无论是renderView，还是fetchData，都需要验证，所以需要频繁的获取验证，此时redis的缓存读取效率更高。</p>
<p>用户退出时，由nodejs清空cookie，及redis里的sessionId，即可。</p>
<h3 id="articleHeader3">SSO实现</h3>
<p>浏览器出于安全考虑，实现了同源策略，对于跨站请求可以使用jsonp或设置http的Access-Control-Allow-Origin实现跨域。</p>
<p>同源策略对cookie的访问限制，造成不同域无法相互访问（二级域名可以访问主域）。所以若A/B两个不同域名的站点，使用同一套会员体系，也无法同时登录（如baidu.com / hao123.com），而实际项目中我们需要处理这样的问题，即会员A站登录后，打开B站也要保持该会员的登录状态，我的实现见下图</p>
<p><span class="img-wrap"><img data-src="http://www.upopen.cn/assets/upload/article/sso.png" src="https://static.alili.techhttp://www.upopen.cn/assets/upload/article/sso.png" alt="SSO实现" title="SSO实现" style="cursor: pointer;"></span></p>
<p>A/B两站，分别有客户端和服务端，单站登录的客户端与服务端的通信见前图，此处不在描述，涉及跨站的流程大致如下</p>
<p>会员在A站登录，A站服务端生成sessionId外，再额外生成一个ticket，设置3s时效，以请求返回值的形式返回给客户端，如下，同时，将ticket以{ticket: sid}形式保存在redis里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#返回值
{
   code: 0,
   message: 'signin success',
   data: {ticket:'ffqwoij1230340lklfdf123fklk'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">#返回值
{
   <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
   <span class="hljs-attr">message</span>: <span class="hljs-string">'signin success'</span>,
   <span class="hljs-attr">data</span>: {<span class="hljs-attr">ticket</span>:<span class="hljs-string">'ffqwoij1230340lklfdf123fklk'</span>
}</code></pre>
<p>A站客户端收到返回后，请求B站的链接，如</p>
<p>B.com/api/auth.gif?ticket=ffqwoij1230340lklfdf123fklk</p>
<p>B站服务端收到该请求后，获取该ticket，到redis内验证该ticket存在，且取到sessionid，再将sessionid，通过http-header-cookie输出到B站客户端的cookie里，即为B添加的会员状态的标识。同时删除redis里的ticket。</p>
<p>A/B站都使用了同一个sid，且保存在同一个redis里，所以任何一方因退出而清空redis.sessionid的操作，都会引起其它站点的退出。</p>
<p>注意以下几点:</p>
<ul>
<li><p>A站收到ticket后，马上发出B站的请求做登录验证，间隔时间很短，3S通常是够了，设置时效性，也更安全</p></li>
<li><p>ticket的生成需要加入请求的客户端信息，以便数据被拦截后在其它环境非法登录，如IP等信息</p></li>
<li><p>发向B站的请求，通常有图片、iframe两种形式，后者过重，图片形式较轻。</p></li>
</ul>
<p>思考该方案时参考了百度的实现，也只是参考了其发图片请求这一点，其内部的机制并不了解，加上自己的思考实现这一套方案，且用于公司的项目上。</p>
<p>若需要两个以上的域名登录，处理相同。</p>
<p><span class="img-wrap"><img data-src="http://www.upopen.cn/assets/upload/article/baidu.png" src="https://static.alili.techhttp://www.upopen.cn/assets/upload/article/baidu.png" alt="百度登录" title="百度登录" style="cursor: pointer;"></span></p>
<p>参见百度的实现，可以看到其发出了多个crossdomain请求，每个都是向不同的域发出的请求，如hao123.com、anquanbao.com等</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于NODEJS的SSO登录方案

## 原文链接
[https://segmentfault.com/a/1190000006103655](https://segmentfault.com/a/1190000006103655)

