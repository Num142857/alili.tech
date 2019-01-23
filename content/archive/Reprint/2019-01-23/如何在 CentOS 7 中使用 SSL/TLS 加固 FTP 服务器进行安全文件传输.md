---
title: '如何在 CentOS 7 中使用 SSL/TLS 加固 FTP 服务器进行安全文件传输' 
date: 2019-01-23 2:30:08
hidden: true
slug: qzxlj7w9glc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-centos-7-中使用-ssltls-加固-ftp-服务器进行安全文件传输"></a>如何在 CentOS 7 中使用 SSL/TLS 加固 FTP 服务器进行安全文件传输</h1>
<p>在一开始的设计中，FTP（文件传输协议）就是不安全的，意味着它不会加密两台机器之间传输的数据以及用户的凭据。这使得数据和服务器安全面临很大威胁。</p>
<p>在这篇文章中，我们会介绍在 CentOS/RHEL 7 以及 Fedora 中如何在 FTP 服务器中手动启用数据加密服务；我们会介绍使用 SSL/TLS 证书保护 VSFTPD（Very Secure FTP Daemon）服务的各个步骤。</p>
<h4><a href="#前提条件"></a>前提条件：</h4>
<ul>
<li>你必须已经<a href="http://www.tecmint.com/install-ftp-server-in-centos-7/">在 CentOS 7 中安装和配置 FTP 服务</a> 。</li>
</ul>
<p>在我们开始之前，要注意本文中所有命令都以 root 用户运行，否则，如果现在你不是使用 root 用户控制服务器，你可以使用 <a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">sudo 命令</a> 去获取 root 权限。</p>
<h3><a href="#第一步生成-ssltls-证书和密钥"></a>第一步：生成 SSL/TLS 证书和密钥</h3>
<p>1、 我们首先要在 <code>/etc/ssl</code> 目录下创建用于保存 SSL/TLS 证书和密钥文件的子目录：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir /etc/ssl/private</span>

</code></pre><p>2、 然后运行下面的命令为 vsftpd 创建证书和密钥并保存到一个文件中，下面会解析使用的每个选项。</p>
<ol>
<li><code>req</code> - 是 X.509 Certificate Signing Request （CSR，证书签名请求）管理的一个命令。</li>
<li><code>x509</code> - X.509 证书数据管理。</li>
<li><code>days</code> - 定义证书的有效日期。</li>
<li><code>newkey</code> - 指定证书密钥处理器。</li>
<li><code>rsa:2048</code> - RSA 密钥处理器，会生成一个 2048 位的密钥。</li>
<li><code>keyout</code> - 设置密钥存储文件。</li>
<li><code>out</code> - 设置证书存储文件，注意证书和密钥都保存在一个相同的文件：/etc/ssl/private/vsftpd.pem。</li>
</ol>
<pre><code class="hljs gradle"># openssl req -x509 -nodes -keyout <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>vsftpd.pem -out <span class="hljs-regexp">/etc/</span>ssl<span class="hljs-regexp">/private/</span>vsftpd.pem -days <span class="hljs-number">365</span> -newkey rsa:<span class="hljs-number">2048</span>

</code></pre><p>上面的命令会让你回答以下的问题，记住使用你自己情况的值。</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">Country</span> <span class="hljs-selector-tag">Name</span> (<span class="hljs-number">2</span> letter code) <span class="hljs-selector-attr">[XX]</span><span class="hljs-selector-pseudo">:IN</span>
<span class="hljs-selector-tag">State</span> <span class="hljs-selector-tag">or</span> <span class="hljs-selector-tag">Province</span> <span class="hljs-selector-tag">Name</span> (full name) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:Lower</span> <span class="hljs-selector-tag">Parel</span>
<span class="hljs-selector-tag">Locality</span> <span class="hljs-selector-tag">Name</span> (eg, city) <span class="hljs-selector-attr">[Default City]</span><span class="hljs-selector-pseudo">:Mumbai</span>
<span class="hljs-selector-tag">Organization</span> <span class="hljs-selector-tag">Name</span> (eg, company) <span class="hljs-selector-attr">[Default Company Ltd]</span><span class="hljs-selector-pseudo">:TecMint.com</span>
<span class="hljs-selector-tag">Organizational</span> <span class="hljs-selector-tag">Unit</span> <span class="hljs-selector-tag">Name</span> (eg, section) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:Linux</span> <span class="hljs-selector-tag">and</span> <span class="hljs-selector-tag">Open</span> <span class="hljs-selector-tag">Source</span>
<span class="hljs-selector-tag">Common</span> <span class="hljs-selector-tag">Name</span> (eg, your name or your server's hostname) <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:tecmint</span>
<span class="hljs-selector-tag">Email</span> <span class="hljs-selector-tag">Address</span> <span class="hljs-selector-attr">[]</span><span class="hljs-selector-pseudo">:admin</span>@<span class="hljs-selector-tag">tecmint</span><span class="hljs-selector-class">.com</span>

</code></pre><h3><a href="#第二步配置-vsftpd-使用-ssltls"></a>第二步：配置 VSFTPD 使用 SSL/TLS</h3>
<p>3、 在我们进行任何 VSFTPD 配置之前，首先开放 990 和 40000-50000 端口，以便在 VSFTPD 配置文件中分别定义 TLS 连接的端口和被动端口的端口范围：</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=public</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">port=990/tcp</span>
<span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=public</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">port=40000</span><span class="hljs-literal">-</span><span class="hljs-comment">50000/tcp</span>
<span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">reload</span>

</code></pre><p>4、 现在，打开 VSFTPD 配置文件并在文件中指定 SSL 的详细信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vi /etc/vsftpd/vsftpd.conf</span>

</code></pre><p>找到 <code>ssl_enable</code> 选项把它的值设置为 <code>YES</code> 激活使用 SSL，另外，由于 TSL 比 SSL 更安全，我们会使用 <code>ssl_tlsv1_2</code> 选项让 VSFTPD 使用更严格的 TLS：</p>
<pre><code class="hljs ini"><span class="hljs-attr">ssl_enable</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">ssl_tlsv1_2</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">ssl_sslv2</span>=<span class="hljs-literal">NO</span>
<span class="hljs-attr">ssl_sslv3</span>=<span class="hljs-literal">NO</span>

</code></pre><p>5、 然后，添加下面的行来定义 SSL 证书和密钥文件的位置：</p>
<pre><code class="hljs makefile">rsa_cert_file=/etc/ssl/<span class="hljs-keyword">private</span>/vsftpd.pem
rsa_private_key_file=/etc/ssl/<span class="hljs-keyword">private</span>/vsftpd.pem

</code></pre><p>6、 下面，我们要阻止匿名用户使用 SSL，然后强制所有非匿名用户登录使用安全的 SSL 连接进行数据传输和登录过程中的密码发送：</p>
<pre><code class="hljs ini"><span class="hljs-attr">allow_anon_ssl</span>=<span class="hljs-literal">NO</span>
<span class="hljs-attr">force_local_data_ssl</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">force_local_logins_ssl</span>=<span class="hljs-literal">YES</span>

</code></pre><p>7、 另外，我们还可以添加下面的选项增强 FTP 服务器的安全性。当选项 <code>require_ssl_reuse</code> 被设置为 <code>YES</code> 时，要求所有 SSL 数据连接都会重用 SSL 会话；这样它们会知道控制通道的主密码。</p>
<p>因此，我们需要把它关闭。</p>
<pre><code class="hljs ini"><span class="hljs-attr">require_ssl_reuse</span>=<span class="hljs-literal">NO</span>

</code></pre><p>另外，我们还要用 <code>ssl_ciphers</code> 选项选择 VSFTPD 允许用于加密 SSL 连接的 SSL 算法。这可以极大地限制那些尝试发现使用存在缺陷的特定算法的攻击者：</p>
<pre><code class="hljs ini"><span class="hljs-attr">ssl_ciphers</span>=HIGH

</code></pre><p>8、 现在，设置被动端口的端口范围（最小和最大端口）。</p>
<pre><code class="hljs ini"><span class="hljs-attr">pasv_min_port</span>=<span class="hljs-number">40000</span>
<span class="hljs-attr">pasv_max_port</span>=<span class="hljs-number">50000</span>

</code></pre><p>9、 选择性启用 <code>debug_ssl</code> 选项以允许 SSL 调试，这意味着 OpenSSL 连接诊断会被记录到 VSFTPD 日志文件：</p>
<pre><code class="hljs ini"><span class="hljs-attr">debug_ssl</span>=<span class="hljs-literal">YES</span>

</code></pre><p>保存所有更改并关闭文件。然后让我们重启 VSFTPD 服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart vsftpd</span>

</code></pre><h3><a href="#第三步用-ssltls-连接测试-ftp-服务器"></a>第三步：用 SSL/TLS 连接测试 FTP 服务器</h3>
<p>10、 完成上面的所有配置之后，像下面这样通过在命令行中尝试使用 FTP 测试 VSFTPD 是否使用 SSL/TLS 连接：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># ftp 192.168.56.10</span>
Connected <span class="hljs-keyword">to</span> 192.168.56.10  (192.168.56.10).
220 Welcome <span class="hljs-keyword">to</span> TecMint.com FTP service.
Name (192.168.56.10:root) : ravi
530 Non-anonymous sessions must use encryption.
Login failed.
421<span class="hljs-built_in"> Service </span><span class="hljs-keyword">not</span> available, remote<span class="hljs-built_in"> server </span>has closed<span class="hljs-built_in"> connection
</span>ftp&gt;

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Verify-FTP-Secure-Connection.png"><img src="https://p0.ssl.qhimg.com/t017d7594cb8af23729.png" alt="验证 FTP SSL 安全连接"></a></p>
<p><em>验证 FTP SSL 安全连接</em></p>
<p>从上面的截图中，我们可以看到这里有个错误提示我们 VSFTPD 只允许用户从支持加密服务的客户端登录。</p>
<p>命令行并不会提供加密服务因此产生了这个错误。因此，为了安全地连接到服务器，我们需要一个支持 SSL/TLS 连接的 FTP 客户端，例如 FileZilla。</p>
<h3><a href="#第四步安装-filezilla-以便安全地连接到-ftp-服务器"></a>第四步：安装 FileZilla 以便安全地连接到 FTP 服务器</h3>
<p>11、 FileZilla 是一个现代化、流行且重要的跨平台的 FTP 客户端，它默认支持 SSL/TLS 连接。</p>
<p>要在 Linux 上安装 FileZilla，可以运行下面的命令：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">---------</span> On CentOS/RHEL/Fedora <span class="hljs-params">---------</span> 
<span class="hljs-comment"># yum install epel-release filezilla</span>
<span class="hljs-params">---------</span> On Debian/Ubuntu <span class="hljs-params">---------</span>
$ sudo apt-get install  filezilla   

</code></pre><p>12、 当安装完成后（或者你已经安装了该软件），打开它，选择 File =&gt; Sites Manager 或者按 <code>Ctrl + S</code> 打开 Site Manager 界面。</p>
<p>点击 New Site 按钮添加一个新的站点/主机连接详细信息。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-New-FTP-Site-in-Filezilla.png"><img src="https://p0.ssl.qhimg.com/t01f2bdfd810e799262.png" alt="在 FileZilla 中添加新 FTP 站点"></a></p>
<p><em>在 FileZilla 中添加新 FTP 站点</em></p>
<ol>
<li>下一步，像下面这样设置主机/站点名称、添加 IP 地址、定义使用的协议、加密和登录类型（使用你自己情况的值）：</li>
</ol>
<pre><code class="hljs yaml"><span class="hljs-attr">Host:</span>  <span class="hljs-number">192.168</span><span class="hljs-number">.56</span><span class="hljs-number">.10</span>
<span class="hljs-attr">Protocol:</span>  <span class="hljs-string">FTP</span> <span class="hljs-string">–</span> <span class="hljs-string">File</span> <span class="hljs-string">Transfer</span> <span class="hljs-string">Protocol</span>
<span class="hljs-attr">Encryption:</span>  <span class="hljs-string">Require</span> <span class="hljs-string">explicit</span> <span class="hljs-string">FTP</span> <span class="hljs-string">over</span>   <span class="hljs-comment">#recommended </span>
<span class="hljs-string">Logon</span> <span class="hljs-attr">Type:</span> <span class="hljs-string">Ask</span> <span class="hljs-string">for</span> <span class="hljs-string">password</span>            <span class="hljs-comment">#recommended </span>
<span class="hljs-attr">User:</span> <span class="hljs-string">username</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-FTP-Server-Details-in-Filezilla.png"><img src="https://p0.ssl.qhimg.com/t0138b3f942416d8387.png" alt="在 Filezilla 中添加 FTP 服务器详细信息"></a></p>
<p><em>在 Filezilla 中添加 FTP 服务器详细信息</em></p>
<p>14、 然后点击 Connect，再次输入密码，然后验证用于 SSL/TLS 连接的证书，再一次点击 <code>OK</code> 连接到 FTP 服务器：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Verify-FTP-SSL-Certificate.png"><img src="https://p0.ssl.qhimg.com/t013ca40b6b46dbef10.png" alt="验证 FTP SSL 证书"></a></p>
<p><em>验证 FTP SSL 证书</em></p>
<p>到了这里，我们应该使用 TLS 连接成功地登录到了 FTP 服务器，在下面的界面中检查连接状态部分获取更多信息。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/connected-to-ftp-server-with-tls.png"><img src="https://p0.ssl.qhimg.com/t01f159253d65819234.png" alt="通过 TLS/SSL 连接到 FTP 服务器"></a></p>
<p><em>通过 TLS/SSL 连接到 FTP 服务器</em></p>
<p>15、 最后，在文件目录尝试 <a href="http://www.tecmint.com/sftp-command-examples/">从本地传输文件到 FTP 服务器</a>，看 FileZilla 界面后面的部分查看文件传输相关的报告。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Transfer-Files-Securely-Using-FTP.png"><img src="https://p0.ssl.qhimg.com/t012417f24f426797da.png" alt="使用 FTP 安全地传输文件"></a></p>
<p><em>使用 FTP 安全地传输文件</em></p>
<p>就是这些。记住 FTP 默认是不安全的，除非我们像上面介绍的那样配置它使用 SSL/TLS 连接。在下面的评论框中和我们分享你关于这篇文章/主题的想法吧。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一个 Linux 和 F.O.S.S 的爱好者，Linux 系统管理员，网络开发员，目前也是 TecMint 的内容创作者，他喜欢和电脑一起工作，并且坚信共享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/secure-vsftpd-using-ssl-tls-on-centos/">http://www.tecmint.com/secure-vsftpd-using-ssl-tls-on-centos/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 CentOS 7 中使用 SSL/TLS 加固 FTP 服务器进行安全文件传输

## 原文链接
[https://www.zcfy.cc/article/how-to-secure-a-ftp-server-using-ssl-tls-for-secure-file-transfer-in-centos-7](https://www.zcfy.cc/article/how-to-secure-a-ftp-server-using-ssl-tls-for-secure-file-transfer-in-centos-7)

