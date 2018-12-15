---
title: 'Node中间层实践（一）——基于NodeJS的全栈式开发' 
date: 2018-12-16 2:30:10
hidden: true
slug: gpzfy8zgkm9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>版权声明：更多文章请访问我的个人站<a href="http://xilan.me" rel="nofollow noreferrer" target="_blank">Keyon Y</a>，转载请注明出处。</blockquote>
<h3 id="articleHeader0">前言</h3>
<p>近期公司有个新项目，由于后端人手不足，我果断的提议用node中间层的方案，得到了老大的支持，所以一次大单尝试就来了。<br>Node中间层允许前端来做<strong>网站路由</strong>、<strong>页面渲染</strong>、<strong>SEO优化</strong>，对以往从来不接触这些内容的前端选手来说，正是锻炼我们网站架构的好机会。<br>另外，这也是一次深入了解Node的好机会，准备好迎接即将到来的前端工程化时代。</p>
<h2 id="articleHeader1"><strong>为什么选择node中间层</strong></h2>
<p>在说这个话题之前，先给大家分享一篇文章(<a href="http://blog.csdn.net/u011413061/article/details/50294263" rel="nofollow noreferrer" target="_blank">【探索】NodeJS中间层搭建</a>)，它让我对node中间层的理解更加深刻，特别是最后的来自淘宝的PPT。</p>
<h3 id="articleHeader2"><strong>现有开发模式的适用场景</strong></h3>
<p>玉伯提到的几种开发模式，各有各的适用场景，没有哪一种完全取代另外一种。</p>
<ul>
<li>比如后端为主的MVC，做一些同步展现的业务效率很高，但是遇到同步异步结合的页面，与后端开发沟通起来就会比较麻烦。</li>
<li>Ajax为主SPA型开发模式，比较适合开发APP类型的场景，但是只适合做APP，因为SEO等问题不好解决，对于很多类型的系统，这种开发方式也过重。</li>
</ul>
<h3 id="articleHeader3"><strong>前后端分离</strong></h3>
<p>从职责上划分，node中间层实现了前后端分离:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012953345?w=555&amp;h=263" src="https://static.alili.tech/img/remote/1460000012953345?w=555&amp;h=263" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>前端：负责View和Controller层</li>
<li>后端：只负责Model层，业务处理/数据等</li>
</ul>
<p>拿我们公司来说，之前的网站前台的项目，是基于后端的MVC，在遇到同步和异步结合的页面时候，和后端频繁沟通，对前后端来说都是很痛苦的。</p>
<p>对前端来说，发挥的空间十分的有限，例如：性能优化，只在前端做是很有限的，是需要和后端配合才能实现的，比如 随后的部分我会写道的<strong>无刷新加载</strong>。</p>
<p>前端掌握了Controller，就可以做路由设计、网站目录结构、网站前端架构。<br>掌握了View，就可以通过后端模板引擎(jade/pug,Ejs,swig等)，边写边绑数据。更别提，pug之流 还有mixin，让我们对 html进行函数化，大大提高效率。  </p>
<p>NodeJS让前端无需学习一门新的语言，就能做到这些事情。</p>
<h3 id="articleHeader4"><strong>基于NodeJS“全栈”式开发</strong></h3>
<p>下面的这张图很简单形象的说明了Node中间层</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012953346?w=590&amp;h=611" src="https://static.alili.tech/img/remote/1460000012953346?w=590&amp;h=611" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5"><strong>中间层的性能问题</strong></h3>
<p>多加了一层通讯，肯定会有一定的性能损耗。但分层带来的损失，一定能在其他方面的收益弥补回来，而且合理的分层能让职责清晰、方便协作，大大提升开发效率。也可以通过优化通讯方式和协议，尽可能把损耗降到最低。</p>
<blockquote>拿我公司的网站举例：一个静态化的详情页面上有很多(动态)的数据，用户资料、评论信息、订单等等，需要5、6个异步请求，node中间层可以代理这些请求，轻松实现Bigpipe。<br>在PC上你觉得发5,6个异步请求也没什么，但是在无线端，在客户手机上建立一个HTTP请求开销很大，有了这个优化，性能一下提升好几倍。</blockquote>
<h3 id="articleHeader6"><strong>Node什么都能做，为什么还要JAVA/PHP？</strong></h3>
<p>我们的初衷是做前后端分离，如果考虑这个问题就有点违背我们的初衷了。即使用Node替代Java/PHP，我们也没办法保证不出现今天遇到的种种问题，比如职责不清。我们的目的是分层开发，专业的人，专注做专业的事。基于JAVA/PHP的基础架构已经非常强大而且稳定，而且更适合做现在架构的事情。</p>
<h3 id="articleHeader7"><strong>前端的任务更重要了</strong></h3>
<p>常见的前后端分离的开发模式中，后端为前端提供了路由结构和页面的数据绑定，前端只需要切页面和少量的逻辑。</p>
<p>在node中间层中，前端不仅仅要切页面和做页面逻辑，还要做url design、页面数据绑定、联调与沟通，还要考虑SEO的问题，伪静态页面、title/keyword设置、网站地图，甚至包括错误日志等等。</p>
<p>虽然前端的工作量增加了不少，但是基于模块化的开发，让总体的效率提升了。<br>对于后端程序员，接口整合的工作交给了前端服务器进行处理，同时和前端耦合度大大降低，工作量和工作效率都减少了。</p>
<p>另外，由于前后端分离，测试都可以分开来了，专门测试接口的和专门测试ui层。</p>
<h2 id="articleHeader8"><strong>总结</strong></h2>
<p>我觉得，以后基于NodeJs的全栈式开发的模式将会越来越流行，这也会引领前端步入工程化时代。但是要把Node全栈开发变成一个稳定的、方便的开发工具，还有很多路要走。这次公司的交易平台项目就是一个很好的实践，接下来，请继续关注我对这个项目的总结，希望能给各位带来灵感。</p>
<p>欢迎继续关注本博的更新  <br><a href="https://segmentfault.com/a/1190000012950302">Node中间层实践（一）——基于NodeJS的全栈式开发</a>  <br><a href="https://segmentfault.com/a/1190000012950331" target="_blank">Node中间层实践（二）——搭建项目框架</a> <br><a href="https://segmentfault.com/a/1190000013349546">Node中间层实践（三）——webpack配置</a><br><a href="http://xilan.me/Node%E4%B8%AD%E9%97%B4%E5%B1%82%E5%AE%9E%E8%B7%B5%EF%BC%88%E5%9B%9B%EF%BC%89%E2%80%94%E2%80%94%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8Epug/" rel="nofollow noreferrer" target="_blank">Node中间层实践（四）——模板引擎pug</a>  <br><a href="http://xilan.me/Node%E4%B8%AD%E9%97%B4%E5%B1%82%E5%AE%9E%E8%B7%B5%EF%BC%88%E4%BA%94%EF%BC%89%E2%80%94%E2%80%94express-%E4%B8%AD%E9%97%B4%E5%B1%82%E7%9A%84%E9%80%BB%E8%BE%91%E5%A4%84%E7%90%86/" rel="nofollow noreferrer" target="_blank">Node中间层实践（五）——express-中间层的逻辑处理</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node中间层实践（一）——基于NodeJS的全栈式开发

## 原文链接
[https://segmentfault.com/a/1190000012950302](https://segmentfault.com/a/1190000012950302)

