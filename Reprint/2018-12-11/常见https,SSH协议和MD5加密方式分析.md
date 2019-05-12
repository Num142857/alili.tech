---
title: '常见https,SSH协议和MD5加密方式分析' 
date: 2018-12-11 2:30:10
hidden: true
slug: 7h2bdpw56a5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>https,SSH协议和MD5加密是前端可能会接触到的加密,所以我就将他们进行了一个归纳.</p>
<h2 id="articleHeader1">1.https</h2>
<h3 id="articleHeader2">1.1原理</h3>
<p>A.就是在http加入SSL层,是http安全的基础;<br>B.htts协议是在http基础上加了SSL协议;<br>C.使用443端口,http是80端口;<br>D.由网景公司开发并内置在浏览器中;</p>
<h3 id="articleHeader3">1.2作用</h3>
<p>A.建立一个信息安全通道,来保证数据传输的安全;<br>B.确认网站的真实性,可以查看网站认证的真实性;</p>
<h3 id="articleHeader4">1.3核心是SSL层</h3>
<p>A.位置:是一个安全套层,是介于TCP?IP之间;<br>B.分类:<br>SSL记录协议:建立在TCP之上,为数据提供数据封装、压缩、加密;<br>SSL握手协议:建立在记录之上,数据传输之前双方的身份验证、协商加密算法、交换密钥;<br>C.SSL服务器认证过程:<br>客户端发送请求<br>服务器判断是否需要生成新主密钥,需要则返回<br>客户端收到信息,产生一个主密钥,并用公钥加密传输<br>服务器恢复该主密钥,并返回一个认证信息</p>
<h3 id="articleHeader5">1.4 SSL协议</h3>
<p>A.SSL协议包括:握手(凭证交换和验证)和记录协议(数据进行加密);<br>B.SSL握手协议过程:<br>1.客服端发送SSL的版本号,算法种类,产生的随机数等;<br>2.服务器发送服务器的SSL协议的版本号,算法种类和证书(里面有公钥);<br>3.客服端验证;<br>4.验证通过随机产生对称密码,公钥加密产生预主密码,传输给服务器;<br>5.服务器可以要求验证身份,包括客户证书和签名随机数;<br>6.验证通过:服务器用私钥解开密码,对称密钥产生;<br>7.客服端发信息确认后面数据采用该通讯;<br>8.服务器端回应<br>C.整个过程涉及到3次请求,3次响应</p>
<h3 id="articleHeader6">1.5 搭建https网站</h3>
<p>这个可能更多是后台技术,所以我在这里贴一个链接,如果想了解的可以进去看:<br><a href="https://www.cnblogs.com/taomylife/p/4778006.html" rel="nofollow noreferrer" target="_blank">如何申请https证书、搭建https网站</a></p>
<h2 id="articleHeader7">2.SSH</h2>
<h3 id="articleHeader8">2.1 概念</h3>
<p>非对称性加密,包括传输层,用户认证和连接协议</p>
<h3 id="articleHeader9">2.2 原理</h3>
<p>A,在a计算机中产生一对公钥和私钥<br>B,私钥不动,把公钥发送给计算机b,公钥很复杂,就算过程被窃取,第三方不懂什么意思<br>C,a和b首次进行尝试通讯,a发送的内容通过a存放的私钥进行加密,在网络中进行密文件传输<br>D,b也会对该端内容使用公钥解密,如果能两台计算机就结成亲密关系<br>E,以后a和b发送消息用私钥和公钥进行数据加密解密操作</p>
<h3 id="articleHeader10">2.3 应用</h3>
<p>比较常见一个应用是和github建立一个友好关系<br>A.本地生成密钥:ssh-keygen -t rsa<br>B.密钥生成再c盘,将公钥方法github中,然后下次通讯就可以用SSH通讯<br><a href="https://www.cnblogs.com/yzg1/p/5773362.html" rel="nofollow noreferrer" target="_blank">使用ssh连接gitHub</a></p>
<h2 id="articleHeader11">3.MD5</h2>
<h3 id="articleHeader12">3.1.概念</h3>
<p>信息摘要算法</p>
<h3 id="articleHeader13">3.2.特性</h3>
<p>A.MD5加密输出是32位字符串;<br>B.相同的内容使用MD5加密后,得到的内容一样的;<br>C.MD5无法反向解密,唯一就是暴力碰撞破解(就是试32位密码);<br>D.为了防止暴力破解,可以加盐处理;<br>E.这个应该就是前端用的比较多的对数据加密的方式;</p>
<h3 id="articleHeader14">3.3.使用方法:</h3>
<p>A.下载 npm i -S blueimp-md5;<br>B.引包<br>C.加密方式:<br>  普通加密:var val=md5('value');<br>  加盐:var val=md5('value','这是第一次加盐处理');</p>
<h2 id="articleHeader15">4.SSL,SSH和md5的对比</h2>
<p>1.SSL是一个独立的安全套层加密协议;<br>  位于TCP(应用层)和IP(网络层)之间;<br>  只是起到将数据加密和验证作用;<br>2.SSH有加密,连接和认证功能,也是一种协议;<br>3.md5只是简单讲数据加密传输或者被存贮到数据库;<br>4.最本质的区别:SSL,SSH是一个协议,而md5是一种数据加密方式;</p>
<h2 id="articleHeader16">5.结语</h2>
<p>刚开始由于自己题目定义有错误,在这里感谢@暮尘Pluto @Nitron @cevin提出的建议,现在已经对文章标题进行了修改.<br>很开心你还能看到这里,欢迎交流,这种一般面试会问到,可以先收藏着.</p>
<p>参考文章:<a href="https://www.cnblogs.com/yzg1/p/5773362.html" rel="nofollow noreferrer" target="_blank">使用ssh连接gitHub</a><br><a href="https://www.cnblogs.com/taomylife/p/4778006.html" rel="nofollow noreferrer" target="_blank">如何申请https证书、搭建https网站</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见https,SSH协议和MD5加密方式分析

## 原文链接
[https://segmentfault.com/a/1190000013543215](https://segmentfault.com/a/1190000013543215)

