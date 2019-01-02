---
title: 'HTTP中GET与POST的区别 99%的错误认识' 
date: 2019-01-03 2:30:10
hidden: true
slug: cp8k96mo1to
categories: [reprint]
---

{{< raw >}}

                    
<p>本篇文章分两部分，第一部分可以列为初为新人的装逼失败模式，第二部分列为修炼低调模式。<br>装逼失败模式：99%的人对GET和POST的认识<br>修炼低调模式：1%不知道的进阶认识</p>
<p>GET和POST，在我们日常WEB开发中，是最常用的数据传输方式。面试中我们也经常会遇到。<br>一般我们在浏览器输入一个网址URL访问网站都是GET方式请求；<br>在HTML FROM表单中，可以通过设置method指定提交方式为GET或者POST方式，默认为GET提交方式</p>
<p>HTTP定义了与服务器交互的不同方法，其中最基本的四种：GET，POST，PUT，DELETE，HEAD；<br>其中GET和HEAD被称为安全方法，因为使用GET和HEAD的HTTP请求不会产生什么动作。不会产生动作意味着GET和HEAD的HTTP请求不会在服务器上产生任何结果。但是安全方法并不是什么动作都不产生，这里的安全方法仅指不会修改信息。</p>
<p>GET和POST我们比较常用，其它几种实际应用比较少用到，在此仅作了解。</p>
<hr>
<h3 id="articleHeader0">99%的人所认为的GET和POST</h3>
<h4>1. 传输方式（自我理解“显示方式”）</h4>
<p>GET请求的数据会附加在URL之后，以?分割URL和传输数据，多个参数之间以&amp;连接，<br>如<code>"http://www.xxx.com/product?type=shoe&amp;price=100&amp;sex=male"</code><br>数据格式有以下注意点：</p>
<ol>
<li>如果数据是英文字母/数字，原样发送；</li>
<li>如果是空格，转换为+；</li>
<li>如果是中文或其他字符，则把数据用Base64加密，<br>   如<code>"%E4%BD%A0%E5%A5%BD"</code>其中<code>％XX</code>中的<code>XX</code>为该符号以16进制表示的ASCII码。</li>
</ol>
<p>POST请求会把请求的数据放置在HTTP请求包的包体中，GET传输的数据会直接暴露在URL中，而POST请求则不会。</p>
<h4>2. 传输数据大小</h4>
<p>GET方式传输的数据最多只能是1024字节，<br>因为GET是通过URL提交数据，那么GET可提交的数据量就跟URL的长度有直接关系，URL本身不存在参数上限的问题，HTTP协议规范也没有对URL长度进行限制。<br>这个限制是特定的浏览器及服务器对它的限制。IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持。</p>
<p><em>注意：限制是针对整个URL长度，不单是传输的数据长度。</em></p>
<p>POST方式理论上没有限制，可传较大的数据。起限制作用的是服务器的处理程序的处理能力。Apache, Nigx, IIS服务器自身可配置限制传输大小。</p>
<h4>3. GET在浏览器回退是无害的，而POST会再次提交请求</h4>
<h4>4. GET产生的URL可以作为标签或存于历史记录中，而POST不可以</h4>
<h4>5. GET请求会被浏览器主动cahe，而POST不会，除非手动设置</h4>
<h4>6. 安全性</h4>
<p>GET传输的数据直接暴露在URL中，如果我们在做用户登录时，需要传输登录帐号及密码到后端做验证，如果用GET方式，那么账户密码直接暴露在URL里面，是极其危险的。<br>而且浏览器缓存的机制，访问过的网站URL会被保存在浏览器历史记录里，其他人可通过历史记录查看访问网站URL，直接获取到传输的数据。<br>很可能受到 "Cross-site request forgery"(中文名称：跨站请求伪造) 攻击。<br>不过POST的数据也是可以被拦截的。</p>
<p>总结：</p>
<ol>
<li>GET请求是用来向服务器发送索取数据的一种请求，实际应用中数据不涉及到安全性，可用GET方式来向后端请求数据，<br>   如分页或搜索关键词 <code>"http://www.xxx.com/product?keywords=xxx&amp;page=2"</code>;</li>
<li>POST请求是向服务器提交数据的一种请求，涉及到安全性的数据，用POST的方式来传输较GET更安全。</li>
</ol>
<hr>
<p>曾经的曾经，我也是那99%的一员，还把自己归纳的文章发给新人同事看，然后装逼失败，被老大引导练成最后的这1%。</p>
<hr>
<h3 id="articleHeader1">1%的人所拥有的</h3>
<p>GET和POST本质上是没有区别的，它们是HTTP协议中的两种发送请求的方式。<br>HTTP是基于TCP/IP的关于数据如何在万维网中通信的协议，即HTTP的底层是TCP/IP，所以GET和POST的底层也是TCP/IP，也就是说：GET/POST都是TCP链接。<br>给POST带上url参数，给GET加上request body，技术上是可以实现的。</p>
<p>为了更方便的管理，避免混乱，HTTP给这些请求定义GET，POST，PUT，DELETE。<br>而数据大小，则是因为浏览器的限制造成的。</p>
<p>所以GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同</p>
<h4>隐藏的Buff</h4>
<p>GET产生一个TCP数据包，而POST产生两个TCP数据包</p>
<p>GET的请求，浏览器会把http header和data一并发送出去，服务器返回200（返回数据）<br>POST的请求，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200（返回数据）</p>
<p>因为POST需要两步，时间上消耗的多一点，<br>不过网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。<br>网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点</p>
<p>并不是所有浏览器POST发送两次包，Fiefox就发送一次。</p>
<p>最后的最后，当你以后被别人问到的时候，你就可以。。。。。。请开始你的表演</p>
<p>参考文章：<a href="https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&amp;mid=100000054&amp;idx=1&amp;sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd" rel="nofollow noreferrer" target="_blank">《99%的人都理解错了HTTP中GET与POST的区别》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTTP中GET与POST的区别 99%的错误认识

## 原文链接
[https://segmentfault.com/a/1190000010872233](https://segmentfault.com/a/1190000010872233)

