---
title: 'OpenSSL 在 Apache 和 Dovecot 下的使用（一）' 
date: 2019-01-24 2:30:11
hidden: true
slug: hp2zdk34b78
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#openssl-在-apache-和-dovecot-下的使用一"></a>OpenSSL 在 Apache 和 Dovecot 下的使用（一）</h1>
<blockquote>
<p>在这有两部分的系列中，Carla Schroder 会向你展示如何创建自己的 OpenSSL 证书以及如何配置 Apache 和 Dovecot 来使用它们。</p>
</blockquote>
<p>这么长时间之后，我的读者们，这里是我给你们承诺的在 Apache 中使用 OpenSSL 的方法，下周你会看到在 Dovecot 中使用 SSL。 在这个分为两部分的系列中，我们将学习如何创建自己的 OpenSSL 证书，以及如何配置 Apache 和 Dovecot 来使用它们。</p>
<p>这些例子基于这些教程：</p>
<ul>
<li><a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners">给初学者看的在 Ubuntu Linux 上使用 Apache</a></li>
<li><a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners-part-2">给初学者看的在 Ubuntu Linux 上使用 Apache：第 2 部分</a></li>
<li><a href="https://www.linux.com/learn/apache-centos-linux-beginners">给初学者看的在 CentOS Linux 上使用 Apache</a></li>
</ul>
<h3><a href="#创建你的证书"></a>创建你的证书</h3>
<p>Debian/Ubuntu/Mint 会在 <code>/etc/ssl</code> 中存储私钥和证书的符号链接。系统自带的证书保存在 <code>/usr/share/ca-certificates</code> 中。你安装或创建的证书在 <code>/usr/local/share/ca-certificates/</code> 中。</p>
<p>这个例子是对 Debian 而言。创建私钥和公用证书，将证书转换为正确的格式，并将其符号链接到正确的目录：</p>
<pre><code class="hljs delphi">$ sudo openssl req -x509 -days <span class="hljs-number">365</span> -nodes -newkey rsa:<span class="hljs-number">2048</span> \
   -keyout /etc/ssl/<span class="hljs-keyword">private</span>/test-com.key -<span class="hljs-keyword">out</span> \
   /usr/<span class="hljs-keyword">local</span>/share/ca-certificates/test-com.crt
Generating a <span class="hljs-number">2048</span> bit RSA <span class="hljs-keyword">private</span> key
.......+++
......................................+++
writing new <span class="hljs-keyword">private</span> key <span class="hljs-keyword">to</span> <span class="hljs-string">'/etc/ssl/private/test-com.key'</span>
-----
You are about <span class="hljs-keyword">to</span> be asked <span class="hljs-keyword">to</span> enter information that will 
be incorporated into your certificate request.
What you are about <span class="hljs-keyword">to</span> enter <span class="hljs-keyword">is</span> what <span class="hljs-keyword">is</span> called a Distinguished 
<span class="hljs-keyword">Name</span> <span class="hljs-keyword">or</span> a DN. There are quite a few fields but you can leave some blank
<span class="hljs-keyword">For</span> some fields there will be a <span class="hljs-keyword">default</span> value,
<span class="hljs-keyword">If</span> you enter <span class="hljs-string">'.'</span>, the field will be left blank.
-----
Country <span class="hljs-keyword">Name</span> (<span class="hljs-number">2</span> letter code) [AU]:US
State <span class="hljs-keyword">or</span> Province <span class="hljs-keyword">Name</span> (full <span class="hljs-keyword">name</span>) [Some-State]:WA
Locality <span class="hljs-keyword">Name</span> (eg, city) []:Seattle
Organization <span class="hljs-keyword">Name</span> (eg, company) [Internet Widgits Pty Ltd]:Alrac Writing Sweatshop
Organizational <span class="hljs-keyword">Unit</span> <span class="hljs-keyword">Name</span> (eg, section) []:home dungeon
Common <span class="hljs-keyword">Name</span> (e.g. server FQDN <span class="hljs-keyword">or</span> YOUR <span class="hljs-keyword">name</span>) []:www.test.com
Email Address []:admin@test.com

$ sudo update-ca-certificates
Updating certificates <span class="hljs-keyword">in</span> /etc/ssl/certs...
<span class="hljs-number">1</span> added, <span class="hljs-number">0</span> removed; done.
Running hooks <span class="hljs-keyword">in</span> /etc/ca-certificates/update.d...

Adding debian:test-com.pem
done.
done.

</code></pre><p>CentOS/Fedora 使用不同的文件结构，并不使用 <code>update-ca-certificates</code>，使用这个命令：</p>
<pre><code class="hljs groovy">$ sudo openssl req -x509 -days <span class="hljs-number">365</span> -nodes -newkey <span class="hljs-string">rsa:</span><span class="hljs-number">2048</span> \
   -keyout <span class="hljs-regexp">/etc/</span>httpd<span class="hljs-regexp">/ssl/</span>test-com.key -out \
   <span class="hljs-regexp">/etc/</span>httpd<span class="hljs-regexp">/ssl/</span>test-com.crt

</code></pre><p>最重要的条目是 <code>Common Name</code>，它必须与你的完全限定域名（FQDN）完全匹配。此外其它信息都是任意的。<code>-nodes</code> 用于创建一个无密码的证书，这是 Apache 所必需的。<code>-days</code> 用于定义过期日期。更新证书是一个麻烦的事情，但这样应该能够额外提供一些安全保障。参见 <a href="https://community.letsencrypt.org/t/pros-and-cons-of-90-day-certificate-lifetimes/4621">90 天证书有效期的利弊</a>中的讨论。</p>
<h3><a href="#配置-apache"></a>配置 Apache</h3>
<p>现在配置 Apache 以使用你的新证书。如果你遵循<a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners-part-2">给初学者看的在 Ubuntu Linux 上使用 Apache：第 2 部分</a>，你所要做的就是修改虚拟主机配置中的 <code>SSLCertificateFile</code> 和 <code>SSLCertificateKeyFile</code>，以指向你的新私钥和公共证书。来自该教程中的 <code>test.com</code> 示例现在看起来像这样：</p>
<pre><code class="hljs awk">SSLCertificateFile <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/certs/</span>test-com.pem
SSLCertificateKeyFile <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>test-com.key

</code></pre><p>CentOS 用户，请参阅在 CentOS wiki 中的<a href="https://wiki.centos.org/HowTos/Https">在 CentOS 上设置 SSL 加密的 Web 服务器</a>一文。过程是类似的，wiki 会告诉如何处理 SELinux。</p>
<h3><a href="#测试-apache-ssl"></a>测试 Apache SSL</h3>
<p>一个简单的方法是用你的网络浏览器访问 <a href="https://yoursite.com%EF%BC%8C%E7%9C%8B%E7%9C%8B%E5%AE%83%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E6%AD%A3%E5%B8%B8%E5%B7%A5%E4%BD%9C%E3%80%82%E5%9C%A8%E7%AC%AC%E4%B8%80%E6%AC%A1%E8%BF%99%E6%A0%B7%E5%81%9A%E6%97%B6%EF%BC%8C%E4%BD%A0%E4%BC%9A%E5%9C%A8%E4%BD%A0%E8%BF%87%E5%BA%A6%E4%BF%9D%E6%8A%A4%E7%9A%84">https://yoursite.com，看看它是否可以正常工作。在第一次这样做时，你会在你过度保护的</a> web 浏览器中看到可怕的警告说网站是不安全的，因为它使用的是自签名证书。请忽略你这个敏感的浏览器，并单击屏幕创建永久性例外。 如果你遵循在<a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners-part-2">给初学者看的在 Ubuntu Linux 上使用 Apache：第 2 部分</a>上的示例虚拟主机配置，那么即使你的网站访问者尝试使用纯 HTTP，你的网站的所有流量都将强制通过 HTTPS。</p>
<p>一个很好测试方法是使用 OpenSSL。是的，有一个漂亮的命令来测试这些东西。试下这个：</p>
<pre><code class="hljs routeros">$ openssl s_client -connect www.test.com:443
CONNECTED(00000003)
<span class="hljs-attribute">depth</span>=0 C = US, ST = WA, L = Seattle, O = Alrac Writing Sweatshop, 
OU = home dungeon, CN = www.test.com, emailAddress = admin@test.com
verify return:1
---
Certificate chain
 0 s:/<span class="hljs-attribute">C</span>=US/ST=WA/L=Seattle/O=Alrac Writing Sweatshop/<span class="hljs-attribute">OU</span>=home 
     dungeon/<span class="hljs-attribute">CN</span>=www.test.com/emailAddress=admin@test.com
   i:/<span class="hljs-attribute">C</span>=US/ST=WA/L=Seattle/O=Alrac Writing Sweatshop/<span class="hljs-attribute">OU</span>=home 
     dungeon/<span class="hljs-attribute">CN</span>=www.test.com/emailAddress=admin@test.com
---<span class="hljs-built_in">
Server </span>certificate
-----BEGIN CERTIFICATE-----
[<span class="hljs-built_in">..</span>.]

</code></pre><p>这里输出了大量的信息。这里有很多关于 <code>openssl s_client</code> 的有趣信息; 现在足够我们知道我们的 web 服务器是否使用了正确的 SSL 证书。</p>
<h3><a href="#创建一个证书签名请求"></a>创建一个证书签名请求</h3>
<p>如果你决定使用第三方证书颁发机构（CA），那么就必须创建证书签名请求（CSR）。你将它发送给你的新 CA，他们将签署并将其发送给您。他们可能对创建你的 CSR 有自己的要求; 这是如何创建一个新的私钥和 CSR 的典型示例：</p>
<pre><code class="hljs stylus">$ openssl req -newkey rsa:<span class="hljs-number">2048</span> -nodes \
   -keyout yourdomain<span class="hljs-selector-class">.key</span> -out yourdomain<span class="hljs-selector-class">.csr</span>

</code></pre><p>你也可以从一个已经存在的 key 中创建一个 CSR：</p>
<pre><code class="hljs maxima">$ openssl req  -<span class="hljs-built_in">key</span> yourdomain.<span class="hljs-built_in">key</span> \
   -<span class="hljs-built_in">new</span> -out <span class="hljs-built_in">domain</span>.csr

</code></pre><p>今天就是这样了。下周我们将<a href="https://www.linux.com/learn/intro-to-linux/openssl-apache-and-dovecot-part-2">学习如何正确地在 Dovecot 中设置 OpenSSL</a>。</p>
<h3><a href="#额外的教程"></a>额外的教程</h3>
<ul>
<li><a href="https://www.linux.com/learn/quieting-scary-web-browser-ssl-alerts">消灭让人害怕的 web 浏览器 SSL 警告</a></li>
<li><a href="https://www.linux.com/learn/how-set-secure-remote-networking-openvpn-linux-part-1">如何在 Linux 上使用 OpenVPN 设置安全远程网络：第一部分</a></li>
<li><a href="https://www.linux.com/learn/how-set-secure-remote-networking-openvpn-linux-part-2">如何在 Linux 上使用 OpenVPN 设置安全远程网络：第一部分</a></li>
</ul>
<p>提高你的系统管理职业生涯吧！查看Linux基金会的<a href="https://training.linuxfoundation.org/linux-courses/system-administration-training/essentials-of-system-administration">系统管理的要点</a>课程。</p>
<hr>
<p>via: <a href="https://www.linux.com/learn/sysadmin/openssl-apache-and-dovecot">https://www.linux.com/learn/sysadmin/openssl-apache-and-dovecot</a></p>
<p>作者：<a href="https://www.linux.com/users/cschroder">CARLA SCHRODER</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
OpenSSL 在 Apache 和 Dovecot 下的使用（一）

## 原文链接
[https://www.zcfy.cc/article/openssl-for-apache-and-dovecot-part-1](https://www.zcfy.cc/article/openssl-for-apache-and-dovecot-part-1)

