---
title: '从输入URL到页面加载到底发生了什么' 
date: 2018-12-05 2:30:09
hidden: true
slug: b11qugbj8jk
categories: [reprint]
---

{{< raw >}}

                    
<p>很多初学网络或者前端的初学者大多会有这样一个疑问：从输入URL到页面加载完成到底发生了什么？<br>总的来说，这个过程分为下面几个步骤：<br><strong>1.DNS解析</strong><br><strong>2.与服务器建立连接</strong><br><strong>3.服务器处理并返回http报文</strong><br><strong>4.浏览器解析渲染页面</strong></p>
<h3 id="articleHeader0">过程</h3>
<h4>DNS解析</h4>
<p>DNS解析的过程就是寻找哪台机器上有你需要资源的过程。当你在浏览器中输入一个地址时，例如www.baidu.com，其实不是百度网站真正意义上的地址。互联网上每一台计算机的唯一标识是它的IP地址，但是IP地址并不方便记忆。用户更喜欢用方便记忆的网址去寻找互联网上的其它计算机，也就是上面提到的百度的网址。所以DNS解析实际上充当了一个翻译的角色，实现了网址到IP地址的转换。</p>
<p>而DNS解析通常会经过以下这几个过程：<br><strong>1.浏览器缓存 - 浏览器缓存DNS记录一段时间</strong> <br><strong>2.系统缓存 - 从Hosts文件查找是否有该域名和对应IP</strong><br><strong>3.路由器缓存 - 一般路由器也会缓存域名信息</strong> <br><strong>4.ISP DNS缓存 - 到电信的DNS查找缓存</strong> <br><strong>5.都没有找到，则向根域名服务器查找域名对应IP，根域名服务器把请求转发到下一级查找IP</strong></p>
<p>www.baidu.com查找顺序是：<br>根域名服务器（.）-&gt; .com -&gt; .baidu.com -&gt; www.baidu.com</p>
<h4>建立连接</h4>
<p>知道了服务器的IP地址后，就可以与服务器建立连接。<br>建立连接需要三个过程（三次握手）：<br><strong>1.主机向服务器发送一个建立连接的请求</strong></p>
<p><strong>2.服务器接到请求后发送同意连接的信号</strong></p>
<p><strong>3.主机接到同意连接的信号后，再次向服务器发送了确认信号</strong></p>
<h4>服务器处理请求</h4>
<p><strong>1.浏览器根据 URL 内容生成 HTTP 请求，请求中包含请求文件的位置、请求文件的方式等等</strong></p>
<p><strong>2.服务器接到请求后，会根据 HTTP 请求中的内容来决定如何获取相应的 HTML 文件</strong></p>
<p><strong>3.服务器将得到的 HTML 文件发送给浏览器</strong></p>
<h4>浏览器解析渲染页面</h4>
<p>在执行 HTML 中代码时，根据需要，浏览器会继续请求图片、CSS、JavsScript等文件，过程同请求 HTML 。</p>
<h4>结语</h4>
<p>以上就是我对输入URL到页面加载的过程的一个简单理解。如有不对或有更好的理解，可以留言评论，不胜感激。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从输入URL到页面加载到底发生了什么

## 原文链接
[https://segmentfault.com/a/1190000014421480](https://segmentfault.com/a/1190000014421480)

