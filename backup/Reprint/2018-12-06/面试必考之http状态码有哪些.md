---
title: '面试必考之http状态码有哪些' 
date: 2018-12-06 2:30:09
hidden: true
slug: zafm5kybtqp
categories: [reprint]
---

{{< raw >}}

                    
<h4>背景</h4>
<p>http状态码有哪些，这也是一个很高频的面试问题。<br>一般大家都知道404页面不存在，500服务器错误，301重定向，302临时重定向，200ok，401未授权啥的。</p>
<p>如果只是简单的这样答，可能只能让面试官给你的答案打个五六十分，不足以给面试官留下良好的印象，为了展现自己良好的http知识，你或许可以重点介绍三个状态码及相关的知识，他们分别是304协商缓存，101协议升级，以及307hsts跳转。</p>
<h4>304协商缓存</h4>
<p>先从304协商缓存开始吧。这是比较基础的知识。相信我，只要你提起304协商缓存，面试官一定会忍不住问你，什么是协商缓存？</p>
<p>这时就到了你展示一下自己丰富的浏览器缓存知识的时候了。我一般会这么答：浏览器缓存分为强制缓存和协商缓存，优先读取强制缓存。</p>
<p>强制缓存分为expires和cache-control，而expires是一个特定的时间，是比较旧的标准和cache-control通常是一个具体的时间长度，比较新，优先级也比较高。</p>
<p>而协商缓存包括etag和last-modified，last-modified的设置标准是资源的上次修改时间，而etag是为了应对资源修改时间可能很频繁的情况出现的，是基于资源的内容计算出来的值，因此优先级也较高。</p>
<p>协商缓存与强制缓存的区别在于强制缓存不需要访问服务器，返回结果是200，协商缓存需要访问服务器，如果命中缓存的话，返回结果是304。</p>
<h4>101协议升级</h4>
<p>主要用于websocket，也可以用于http2的升级。</p>
<p>websocket的特点和功效不细说，大家都很熟了。</p>
<p>http2好处多多，一般说出支持单个连接多次请求，二进制，压缩头部，服务器推送等特征面试官就比较满足了。具体了解也是自行谷歌百度，这里也是不细说。</p>
<p>当然这时候我们可能要应对一下面试官接下来的追问：到底https,http,http2以及它的原形spdy有什么区别，又分别有什么优点和不足，他们的建立连接分别又有着什么环节，这些知识就需要读者自己去充分搜索查询了。</p>
<h4>307 hsts跳转</h4>
<p>这个比较高端，原本的用法是用于让post请求的跳转去新的post请求，但也用于hsts跳转。</p>
<p>hsts全称HTTP严格传输安全（HTTP Strict Transport Security，縮寫：HSTS），功能是要求浏览器下次访问该站点时使用https来访问，而不再需要先是http再转https。这样可以避免ssl剥离攻击，即攻击者在用户使用http访问的过程中进行攻击，对服务器冒充自己是用户，在攻击者和服务器中使用https访问，在用户和服务器中使用http访问。</p>
<p>具体使用方法是在服务器响应头中添加 Strict-Transport-Security，可以设置 max-age</p>
<p>当然，提到了ssl剥离攻击，你一定很感兴趣还有什么方法可以对号称安全的https进行攻击呢？我这里了解到的有ssl劫持攻击，大概就是信任第三方的安全证书，这点被利用于代理软件监听https。如果还有更多的，欢迎补充。</p>
<h4>总结</h4>
<p>仅仅三个状态码，都可以牵涉到如此丰富的知识，对于状态码，我们不能只是片面的去背诵状态码及对应的含义，要去主动挖掘，深入，借助http状态码来建立自己的网络体系。</p>
<p>留一个课后作业：301和302有什么区别？分别适用于什么场景？你还会只去记一个是永久重定向，一个是临时重定向吗？</p>
<p>本文章为<a href="http://hpoenixf.com/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6%E7%B3%BB%E5%88%97-%E7%9B%AE%E5%BD%95.html" rel="nofollow noreferrer" target="_blank">前端进阶系列</a>的一部分,<br>欢迎关注和<a href="https://github.com/hpoenixf/hpoenixf.github.io" rel="nofollow noreferrer" target="_blank">star</a>本博客或是关注我的<a href="https://github.com/hpoenixf" rel="nofollow noreferrer" target="_blank">github</a></p>
<h4>参考</h4>
<p>知道你们很懒，帮你们搜索好了相关资料</p>
<p>[浅谈浏览器http的缓存机制<br>](<a href="http://www.cnblogs.com/vajoy/p/5341664.html)" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/vajoy/...</a></p>
<p><a href="https://ye11ow.gitbooks.io/http2-explained/content/" rel="nofollow noreferrer" target="_blank">http2讲解</a></p>
<p><a href="http://www.alloyteam.com/2016/07/httphttp2-0spdyhttps-reading-this-is-enough/" rel="nofollow noreferrer" target="_blank">HTTP,HTTP2.0,SPDY,HTTPS你应该知道的一些事</a><br><a href="https://www.barretlee.com/blog/2015/10/22/hsts-intro/" rel="nofollow noreferrer" target="_blank">你所不知道的 HSTS</a></p>
<p><a href="https://imququ.com/post/sth-about-switch-to-https.html" rel="nofollow noreferrer" target="_blank">关于启用 HTTPS 的一些经验分享（一）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试必考之http状态码有哪些

## 原文链接
[https://segmentfault.com/a/1190000014286686](https://segmentfault.com/a/1190000014286686)

