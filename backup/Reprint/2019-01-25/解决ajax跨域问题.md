---
title: '解决ajax跨域问题' 
date: 2019-01-25 2:30:23
hidden: true
slug: h3w3n3g139v
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、什么是跨域？</h2>
<p>是两个不同的域互相请求，这个称之为跨域。<br>具体哪些算是跨域如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9Em?w=869&amp;h=525" src="https://static.alili.tech/img/bVJ9Em?w=869&amp;h=525" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>那么为什么需要解决跨域问题？</strong><br>由于浏览器的同源策略的限制，必须要求ajax请求为同一域。<br><strong>什么是同源呢？？</strong></p>
<blockquote><p>同源策略（Same originpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现<br>所谓同源是指，域名，协议，端口相同。</p></blockquote>
<h2 id="articleHeader1">2、模拟跨域请求</h2>
<p><span class="img-wrap"><img data-src="/img/bVJ9EO?w=898&amp;h=271" src="https://static.alili.tech/img/bVJ9EO?w=898&amp;h=271" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>跨域的体现：</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9EU?w=897&amp;h=57" src="https://static.alili.tech/img/bVJ9EU?w=897&amp;h=57" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3、跨域问题的解决【重点&amp;难点】</h2>
<p>现在是通过一个技术“jsonp技术”。<br>问：jsonp和json是什么关系？<br>答：这2者没有一毛钱关系。Jsonp非官方协议主要是用于解决跨域问题，json是一个数据传输的格式。</p>
<p><strong>3.1、前辈是如何解决跨域问题</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVJ9Fk?w=895&amp;h=413" src="https://static.alili.tech/img/bVJ9Fk?w=895&amp;h=413" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上述的方法就是现在jsonp的原型。<br><strong>3.2、目前主流的跨域问题的解决方法</strong><br>3.2.1、XHR2解决跨域问题<br>XHR2：XMLHttpRequest Level2<br>核心：在被请求的文件中添加一个header头。<br>缺点：在IE10以下的浏览器不支持。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9FN?w=638&amp;h=73" src="https://static.alili.tech/img/bVJ9FN?w=638&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是：这个解决方案是符合W3C标准的，也是其提倡的解决方案，这个方法在移动端也是支持的。</p>
<p>3.2.2、代理方式<br>核心：代理</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9FT?w=625&amp;h=282" src="https://static.alili.tech/img/bVJ9FT?w=625&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>让ajax请求本地服务器  服务器处理请求问题</p>
<p>3.2.3、jQuery中的ajax方法<br>例如：$.get方法、$.getJSON方法<br>Get方法：<br><span class="img-wrap"><img data-src="/img/bVJ9F7?w=689&amp;h=127" src="https://static.alili.tech/img/bVJ9F7?w=689&amp;h=127" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>要求1：请求期望返回数据类型必须是jsonp；<br>要求2：必须在请求地址上带一个参数名；</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9Gc?w=695&amp;h=308" src="https://static.alili.tech/img/bVJ9Gc?w=695&amp;h=308" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>GetJSON方法：<br>该方法和get方法基本一致，只是在发送请求的时候略有差异</p>
<p><span class="img-wrap"><img data-src="/img/bVJ9Gq?w=691&amp;h=227" src="https://static.alili.tech/img/bVJ9Gq?w=691&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>要求1：参数callback后面的“=?”不能省略，必须要写；<br>要求2：和get方法不一样，jsonp作为期望的返回数据类型，可以不写；</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决ajax跨域问题

## 原文链接
[https://segmentfault.com/a/1190000008577973](https://segmentfault.com/a/1190000008577973)

