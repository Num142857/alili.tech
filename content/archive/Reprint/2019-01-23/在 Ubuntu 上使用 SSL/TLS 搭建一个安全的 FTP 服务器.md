---
title: '在 Ubuntu 上使用 SSL/TLS 搭建一个安全的 FTP 服务器' 
date: 2019-01-23 2:30:08
hidden: true
slug: u18hjdq1lr
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-上使用-ssltls-搭建一个安全的-ftp-服务器"></a>在 Ubuntu 上使用 SSL/TLS 搭建一个安全的 FTP 服务器</h1>
<p>在本教程中，我们将介绍如何使用 Ubuntu 16.04 / 16.10 中的 SSL / TLS 保护 FTP 服务器（FTPS）。</p>
<p>如果你想为基于 CentOS 的发行版安装一个安全的 FTP 服务器，你可以阅读 – <a href="http://www.tecmint.com/axel-commandline-download-accelerator-for-linux/">在 CentOS 上使用 SSL / TLS 保护 FTP 服务器</a>。</p>
<p>在遵循本指南中的各个步骤之后，我们将了解在 FTP 服务器中启用加密服务的基本原理，以确保安全的数据传输至关重要。</p>
<h3><a href="#要求"></a>要求</h3>
<ul>
<li>你必须已经<a href="http://www.tecmint.com/install-ftp-server-in-ubuntu/">在 Ubuntu 上安装和配置好一个 FTP 服务器</a></li>
</ul>
<p>在我们进行下一步之前，确保本文中的所有命令都将以root身份或者 <a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">sudo 特权账号</a>运行。</p>
<h3><a href="#第一步在-ubuntu-上为-ftp-生成-ssltls-证书"></a>第一步：在 Ubuntu 上为 FTP 生成 SSL/TLS 证书</h3>
<p>1、我们将首先在 <code>/etc/ssl/</code> 下创建一个子目录来存储 SSL/TLS 证书和密钥文件，如果它不存在的话这样做：</p>
<pre><code class="hljs arduino">$ sudo <span class="hljs-built_in">mkdir</span> /etc/ssl/<span class="hljs-keyword">private</span>

</code></pre><p>2、 现在我们在一个单一文件中生成证书和密钥，运行下面的命令：</p>
<pre><code class="hljs groovy">$ sudo openssl req -x509 -nodes -keyout <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>vsftpd.pem -out <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>vsftpd.pem -days <span class="hljs-number">365</span> -newkey <span class="hljs-string">rsa:</span><span class="hljs-number">2048</span>

</code></pre><p>上面的命令将提示你回答以下问题，不要忘了输入合适于你情况的值：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">Country</span> <span class="hljs-selector-tag">Name</span> (<span class="hljs-number">2</span> letter code) <span class="hljs-selector-attr">[XX]</span><span class="hljs-selector-pseudo">:IN</span>
<span class="hljs-selector-tag">State</span> <span class="hljs-selector-tag">or</span> <span class="hljs-selector-tag">Province</span> <span class="hljs-selector-tag">Name</span> (full name) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:Lower</span> <span class="hljs-selector-tag">Parel</span>
<span class="hljs-selector-tag">Locality</span> <span class="hljs-selector-tag">Name</span> (eg, city) <span class="hljs-selector-attr">[Default City]</span><span class="hljs-selector-pseudo">:Mumbai</span>
<span class="hljs-selector-tag">Organization</span> <span class="hljs-selector-tag">Name</span> (eg, company) <span class="hljs-selector-attr">[Default Company Ltd]</span><span class="hljs-selector-pseudo">:TecMint.com</span>
<span class="hljs-selector-tag">Organizational</span> <span class="hljs-selector-tag">Unit</span> <span class="hljs-selector-tag">Name</span> (eg, section) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:Linux</span> <span class="hljs-selector-tag">and</span> <span class="hljs-selector-tag">Open</span> <span class="hljs-selector-tag">Source</span>
<span class="hljs-selector-tag">Common</span> <span class="hljs-selector-tag">Name</span> (eg, your name or your server's hostname) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:tecmint</span>
<span class="hljs-selector-tag">Email</span> <span class="hljs-selector-tag">Address</span> <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:admin</span>@<span class="hljs-selector-tag">tecmint</span><span class="hljs-selector-class">.com</span>

</code></pre><h3><a href="#第二步在-ubuntu-上配置-vsftpd-来使用-ssltls"></a>第二步：在 Ubuntu 上配置 vsftpd 来使用 SSL/TLS</h3>
<p>3、在我们进行 vsftpd 配置之前，对于那些<a href="http://www.tecmint.com/how-to-install-and-configure-ufw-firewall/">已启用 UFW 防火墙</a>的用户，你们必须打开端口 <code>990</code> 和 <code>40000</code> - <code>50000</code>，来在 vsftpd 配置文件中分别启用 TLS 连接端口和被动端口的端口范围：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo ufw allow 990/tcp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo ufw allow 40000:50000/tcp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo ufw status</span>

</code></pre><p>4、现在，打开 vsftpd 配置文件并定义 SSL 详细信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/vsftpd/vsftpd.conf</span>
或
<span class="hljs-meta">$</span><span class="bash"> sudo nano /etc/vsftpd/vsftpd.conf</span>

</code></pre><p>然后，添加或找到选项 <code>ssl_enable</code>，并将它的值设置为 <code>YES</code> 来激活使用 SSL ，同样，因为 TLS 比 SSL 更安全，我们将通过启用 <code>ssl_tlsv1</code> 选项限制 vsftpd 只使用 TLS：</p>
<pre><code class="hljs ini"><span class="hljs-attr">ssl_enable</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">ssl_tlsv1</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">ssl_sslv2</span>=<span class="hljs-literal">NO</span>
<span class="hljs-attr">ssl_sslv3</span>=<span class="hljs-literal">NO</span>

</code></pre><p>5、 接下来，使用 <code>＃</code> 字符注释掉下面的行，如下所示：</p>
<pre><code class="hljs gradle">#rsa_cert_file=<span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>ssl-cert-snakeoil.pem
#rsa_private_key_file=<span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>ssl-cert-snakeoil.key

</code></pre><p>然后，添加以下行以定义 SSL 证书和密钥文件的位置（LCTT 译注：或径直修改也可）：</p>
<pre><code class="hljs makefile">rsa_cert_file=/etc/ssl/<span class="hljs-keyword">private</span>/vsftpd.pem
rsa_private_key_file=/etc/ssl/<span class="hljs-keyword">private</span>/vsftpd.pem

</code></pre><p>6、现在，我们也可以阻止匿名用户使用 SSL 登录，并且迫使所有的非匿名登录使用安全的 SSL 链接来传输数据和在登录期间发送密码：</p>
<pre><code class="hljs ini"><span class="hljs-attr">allow_anon_ssl</span>=<span class="hljs-literal">NO</span>
<span class="hljs-attr">force_local_data_ssl</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">force_local_logins_ssl</span>=<span class="hljs-literal">YES</span>

</code></pre><p>7、此外，我们可以使用以下选项在 FTP 服务器中添加更多的安全功能 。对于选项 <code>require_ssl_reuse=YES</code>，它表示所有的 SSL 数据链接都需重用已经建立的 SSL 会话�（需要证明客户端拥有 FTP 控制通道的主密钥），但是一些客户端不支持它，如果没有客户端问题，出于安全原因不应该关闭（默认开启）。（LCTT 译注：原文此处理解有误，译者修改。）</p>
<pre><code class="hljs ini"><span class="hljs-attr">require_ssl_reuse</span>=<span class="hljs-literal">NO</span>

</code></pre><p>此外，我们可以通过 <code>ssl_ciphers</code> 选项来设置 vsftpd 允许使用那些加密算法。 这将有助于挫败攻击者使用那些已经发现缺陷的加密算法的尝试：</p>
<pre><code class="hljs ini"><span class="hljs-attr">ssl_ciphers</span>=HIGH

</code></pre><p>8、 然后，我们定义被动端口的端口范围（最小和最大端口）。</p>
<pre><code class="hljs ini"><span class="hljs-attr">pasv_min_port</span>=<span class="hljs-number">40000</span>
<span class="hljs-attr">pasv_max_port</span>=<span class="hljs-number">50000</span>

</code></pre><p>9、 要启用 SSL 调试，把 openSSL 连接诊断记录到 vsftpd 日志文件中，我们可以使用 <code>debug_ssl</code> 选项：</p>
<pre><code class="hljs ini"><span class="hljs-attr">debug_ssl</span>=<span class="hljs-literal">YES</span>

</code></pre><p>最后，保存配置文件并且关闭它。然后重启 vsftpd 服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> systemctl restart vsftpd</span>

</code></pre><h3><a href="#第三步在-ubuntu-上使用-ssl--tls-连接验证-ftp"></a>第三步：在 Ubuntu 上使用 SSL / TLS 连接验证 FTP</h3>
<p>10、 执行所有上述配置后，通过尝试[在命令行中使用 FTP] <a href="http://www.tecmint.com/sftp-command-examples/">5</a> 来测试 vsftpd 是否现在使用了 SSL / TLS 连接，如下所示。</p>
<p>从下面的输出来看，这里有一个错误的信息告诉我们 vsftpd 仅允许用户（非匿名用户）从支持加密服务的安全客户端登录。</p>
<pre><code class="hljs routeros">$ ftp 192.168.56.10
Connected <span class="hljs-keyword">to</span> 192.168.56.10  (192.168.56.10).
220 Welcome <span class="hljs-keyword">to</span> TecMint.com FTP service.
Name (192.168.56.10:root) : ravi
530 Non-anonymous sessions must use encryption.
Login failed.
421<span class="hljs-built_in"> Service </span><span class="hljs-keyword">not</span> available, remote<span class="hljs-built_in"> server </span>has closed<span class="hljs-built_in"> connection
</span>ftp&gt;

</code></pre><p>该命令不支持加密服务从而导致了上述错误。因此，要安全连接到启用了加密服务的 FTP 服务器，我们需要一个默认支持 SSL/TLS 连接的 FTP 客户端，例如 FileZilla。</p>
<h3><a href="#第四步在客户端上安装filezillastep来安全地连接ftp"></a>第四步：在客户端上安装FileZillaStep来安全地连接FTP</h3>
<p>11、FileZilla 是一个强大的，广泛使用的跨平台 FTP 客户端，支持在 SSL/TLS 上的 FTP。为了在 Linux 客户端机器上安装 FileZilla，使用下面的命令。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">---------</span> On Debian/Ubuntu <span class="hljs-params">---------</span>
$ sudo apt-get install filezilla   
<span class="hljs-params">---------</span> On CentOS/RHEL/Fedora <span class="hljs-params">---------</span> 
<span class="hljs-comment"># yum install epel-release filezilla</span>
<span class="hljs-params">---------</span> On Fedora 22+ <span class="hljs-params">---------</span> 
$ sudo dnf install filezilla

</code></pre><p>12、 一旦安装完成，打开它然后点击File=&gt;Sites Manager或者（按Ctrl+S）来获取下面的Site Manager。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Filezilla-Site-Manager.png"><img src="https://p1.ssl.qhimg.com/t01cd74c5b1a2a6a21c.png" alt="Filezilla Site Manager"></a></p>
<p><em>Filezilla Site Manager</em></p>
<p>13、 现在，定义主机/站点名字，添加 IP 地址，定义使用的协议，加密和登录类型，如下面的屏幕（使用适用于你方案的值）：</p>
<p>点击 New Site 按钮来配置一个新的站点/主机连接。</p>
<ul>
<li>Host: 192.168.56.10</li>
<li>Protocol: FTP – File Transfer Protocol</li>
<li>Encryption: Require explicit FTP over #推荐</li>
<li>Logon Type: Ask for password #推荐</li>
<li>User: 用户名</li>
</ul>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Configure-New-FTP-Site-on-Filezilla.png"><img src="https://p0.ssl.qhimg.com/t016aa1f72566dcba7e.png" alt="在Filezilla上配置新的FTP站点"></a></p>
<p><em>在 Filezilla 上配置新的 FTP 站点</em></p>
<p>14、 然后从上面的界面单击连接以输入密码，然后验证用于 SSL / TLS 连接的证书，并再次单击确定以连接到 FTP 服务器：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Verify-FTP-SSL-Certificate-1.png"><img src="https://p4.ssl.qhimg.com/t01913f1dc2c8fd9b2b.png" alt="验证FTP的SSL证书"></a></p>
<p><em>验证 FTP 的 SSL 证书</em></p>
<p>15、现在，你应该通过 TLS 连接成功地登录到了 FTP 服务器，检查连接状态部分，来获取有关下面接口的更多信息。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Connected-Ubuntu-FTP-Server.png"><img src="https://p4.ssl.qhimg.com/t01591e8374d15af757.png" alt="连接Ubuntu的FTP服务器"></a></p>
<p><em>连接 Ubuntu 的 FTP 服务器</em></p>
<p>16、 最后，让我们在文件夹中<a href="http://www.tecmint.com/sftp-command-examples/">从本地的机器传送文件到 FTP 服务器</a>, 查看 FileZilla 界面的下端来查看有关文件传输的报告。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Transfer-Files-Securely-using-FTP.png"><img src="https://p0.ssl.qhimg.com/t01370cee582cd9091c.png" alt="使用Filezilla安全的传输FTP文件"></a></p>
<p><em>使用 Filezilla 安全的传输 FTP 文件</em></p>
<p>就这样！ 始终记住，安装 FTP 服务器而不启用加密服务具有某些安全隐患。 正如我们在本教程中解释的，您可以在 Ubuntu 16.04 / 16.10 中配置 FTP 服务器使用 SSL / TLS 连接来实现安全性。</p>
<p>如果你在 FTP 服务器上设置 SSL/TLS 遇到任何问题，请使用以下评论表单来分享您对本教程/主题的问题或想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，即将成为 Linux SysAdmin 和网络开发人员，目前是 TecMint 的内容创作者，他喜欢在电脑上工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/secure-ftp-server-using-ssl-tls-on-ubuntu/">http://www.tecmint.com/secure-ftp-server-using-ssl-tls-on-ubuntu/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/DockerChen">DockerChen</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 上使用 SSL/TLS 搭建一个安全的 FTP 服务器

## 原文链接
[https://www.zcfy.cc/article/setting-up-a-secure-ftp-server-using-ssl-tls-on-ubuntu](https://www.zcfy.cc/article/setting-up-a-secure-ftp-server-using-ssl-tls-on-ubuntu)

