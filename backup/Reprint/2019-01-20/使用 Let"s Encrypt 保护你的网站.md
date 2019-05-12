---
title: '使用 Let"s Encrypt 保护你的网站' 
date: 2019-01-20 2:30:11
hidden: true
slug: h173kqtljnn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-lets-encrypt-保护你的网站"></a>使用 Let's Encrypt 保护你的网站</h1>
<blockquote>
<p>未加密的 HTTP 会话暴露于滥用之中，用 Let's Encrypt 把它们保护起来。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/de4246a05872a1fbcfef7046d85973040678528d/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f6c6f636b2d313932302e6a70673f69746f6b3d37736a624f596b55"><img src="https://p0.ssl.qhimg.com/t01b4c5b2432df7c241.jpg" alt=""></a></p>
<p>曾几何时，通过证书授权机构搭建基本的 HTTPS 网站需要每年花费数百美元，而且搭建的过程复杂且容易出错。现在我们免费使用 <a href="https://letsencrypt.org">Let's Encrypt</a>，而且搭建过程也只需要几分钟。</p>
<h3><a href="#为何进行加密"></a>为何进行加密？</h3>
<p>为什么要加密网站呢？这是因为未经加密的 HTTP 会话可以被多种方式滥用：</p>
<ul>
<li>窃听用户数据包</li>
<li>捕捉用户登录</li>
<li>注入<a href="https://www.thesslstore.com/blog/third-party-content-injection/">广告</a>和<a href="https://blog.ryankearney.com/2013/01/comcast-caught-intercepting-and-altering-your-web-traffic/">“重要”消息</a></li>
<li>注入<a href="https://www.eff.org/deeplinks/2018/03/we-still-need-more-https-government-middleboxes-caught-injecting-spyware-ads-and">木马</a></li>
<li>注入 <a href="https://techglimpse.com/wordpress-injected-with-spam-security/">SEO 垃圾邮件和链接</a></li>
<li>注入<a href="https://thehackernews.com/2018/03/cryptocurrency-spyware-malware.html">挖矿脚本</a></li>
</ul>
<p>网络服务提供商就是最大的代码注入者。那么如何挫败它们的非法行径呢？你最好的防御手段就是 HTTPS。让我们回顾一下 HTTPS 的工作原理。</p>
<h3><a href="#信任链"></a>信任链</h3>
<p>你可以在你的网站和每个授权访问用户之间建立非对称加密。这是一种非常强的保护：GPG（GNU Privacy Guard， 参考<a href="https://www.linux.com/learn/how-encrypt-email-linux">如何在 Linux 中加密邮件</a>)和 OpenSSH 就是非对称加密的通用工具。它们依赖于公钥-私钥对，其中公钥可以任意分享，但私钥必须受到保护且不能分享。公钥用于加密，私钥用于解密。</p>
<p>但上述方法无法适用于随机的网页浏览，因为建立会话之前需要交换公钥，你需要生成并管理密钥对。HTTPS 会话可以自动完成公钥分发，而且购物或银行之类的敏感网站还会使用第三方证书颁发机构（CA）验证证书，例如 Comodo、 Verisign 和 Thawte。</p>
<p>当你访问一个 HTTPS 网站时，网站给你的网页浏览器返回了一个数字证书。这个证书说明你的会话被强加密，而且提供了该网站信息，包括组织名称、颁发证书的组织和证书颁发机构名称等。你可以点击网页浏览器地址栏的小锁头来查看这些信息（图 1），也包括了证书本身。</p>
<p><a href="https://camo.githubusercontent.com/668d554adcd45d95365c4a2d517c13f64e86a172/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f6669672d315f315f312e706e673f69746f6b3d5f505069534e7836"><img src="https://p0.ssl.qhimg.com/t015c822eb716fadb86.png" alt="" title="页面信息"></a></p>
<p><em>图1: 点击网页浏览器地址栏上的锁头标记查看信息</em></p>
<p>包括 Opera、 Chromium 和 Chrome 在内的主流浏览器，验证网站数字证书的合法性都依赖于证书颁发机构。小锁头标记可以让你一眼看出证书状态；绿色意味着使用强 SSL 加密且运营实体经过验证。网页浏览器还会对恶意网站、SSL 证书配置有误的网站和不被信任的自签名证书网站给出警告。</p>
<p>那么网页浏览器如何判断网站是否可信呢？浏览器自带根证书库，包含了一系列根证书，存储在 <code>/usr/share/ca-certificates/mozilla/</code> 之类的地方。网站证书是否可信可以通过根证书库进行检查。就像你 Linux 系统上其它软件那样，根证书库也由包管理器维护。对于 Ubuntu，对应的包是 <code>ca-certificates</code>，这个 Linux 根证书库本身是<a href="https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/">由 Mozilla 维护</a>的。</p>
<p>可见，整个工作流程需要复杂的基础设施才能完成。在你进行购物或金融等敏感在线操作时，你信任了无数陌生人对你的保护。</p>
<h3><a href="#无处不加密"></a>无处不加密</h3>
<p>Let's Encrypt 是一家全球证书颁发机构，类似于其它商业根证书颁发机构。Let's Encrpt 由非营利性组织因特网安全研究小组Internet Security Research Group（ISRG）创立，目标是简化网站的安全加密。在我看来，出于后面我会提到的原因，该证书不足以胜任购物及银行网站的安全加密，但很适合加密博客、新闻和信息门户这类不涉及金融操作的网站。</p>
<p>使用 Let's Encrypt 有三种方式。推荐使用电子前沿基金会Electronic Frontier Foundation（EFF）开发的 <a href="https://certbot.eff.org/">Cerbot 客户端</a>。使用该客户端需要在网站服务器上执行 shell 操作。</p>
<p>如果你使用的是共享托管主机，你很可能无法执行 shell 操作。这种情况下，最简单的方法是使用<a href="https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920">支持 Let's Encrpt 的托管主机</a>。</p>
<p>如果你的托管主机不支持 Let's Encrypt，但支持自定义证书，那么你可以使用 Certbot <a href="https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920">手动创建并上传你的证书</a>。这是一个复杂的过程，你需要彻底地研究文档。</p>
<p>安装证书后，使用 <a href="https://www.ssllabs.com/ssltest/">SSL 服务器测试</a>来测试你的服务器。</p>
<p>Let's Encrypt 的电子证书有效期为 90 天。Certbot 安装过程中添加了一个证书自动续期的计划任务，也提供了测试证书自动续期是否成功的命令。允许使用已有的私钥或证书签名请求certificate signing request（CSR），允许创建通配符证书。</p>
<h3><a href="#限制"></a>限制</h3>
<p>Let's Encrypt 有如下限制：它只执行域名验证，即只要有域名控制权就可以获得证书。这是比较基础的 SSL。它不支持组织验证Organization Validation（OV）或扩展验证Extended Validation（EV），因为运营实体验证无法自动完成。我不会信任使用 Let's Encrypt 证书的购物或银行网站，它们应该购买支持运营实体验证的完整版本。</p>
<p>作为非营利性组织提供的免费服务，不提供商业支持，只提供不错的文档和社区支持。</p>
<p>因特网中恶意无处不在，一切数据都应该加密。从使用 <a href="https://letsencrypt.org/">Let's Encrypt</a> 保护你的网站用户开始吧。</p>
<p>想要学习更多 Linux 知识，请参考 Linux 基金会和 edX 提供的免费课程 <a href="https://training.linuxfoundation.org/linux-courses/system-administration-training/introduction-to-linux">“Linux 入门”</a>。</p>
<hr>
<p>via: <a href="https://www.linux.com/learn/intro-to-linux/2018/3/protect-your-websites-lets-encrypt">https://www.linux.com/learn/intro-to-linux/2018/3/protect-your-websites-lets-encrypt</a></p>
<p>作者：<a href="https://www.linux.com/users/cschroder">CARLA SCHRODER</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Let's Encrypt 保护你的网站

## 原文链接
[https://www.zcfy.cc/article/protect-your-websites-with-let-s-encrypt](https://www.zcfy.cc/article/protect-your-websites-with-let-s-encrypt)

