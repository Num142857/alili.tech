---
title: 'FTPS（基于 SSL 的FTP）与 SFTP（SSH 文件传输协议）对比' 
date: 2019-01-23 2:30:08
hidden: true
slug: ipmuov0a5f9
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ftps基于-ssl-的ftp与-sftpssh-文件传输协议对比"></a>FTPS（基于 SSL 的FTP）与 SFTP（SSH 文件传输协议）对比</h1>
<p>SSH 文件传输协议SSH File transfer protocol（SFTP）也称为通过安全套接层的文件传输协议File Transfer protocol via Secure Socket Layer， 以及 FTPS 都是最常见的安全 FTP 通信技术，用于通过 TCP 协议将计算机文件从一个主机传输到另一个主机。SFTP 和 FTPS 都提供高级别文件传输安全保护，通过强大的算法（如 AES 和 Triple DES）来加密传输的数据。</p>
<p>但是 SFTP 和 FTPS 之间最显着的区别是如何验证和管理连接。</p>
<h3><a href="#ftps"></a>FTPS</h3>
<p>FTPS 是使用安全套接层（SSL）证书的 FTP 安全技术。整个安全 FTP 连接使用用户 ID、密码和 SSL 证书进行身份验证。一旦建立 FTPS 连接，<a href="http://www.techmixer.com/free-ftp-file-transfer-protocol-softwares/">FTP 客户端软件</a>将检查目标 <a href="http://www.techmixer.com/free-ftp-server-best-windows-ftp-server-download/">FTP 服务器</a>证书是否可信的。</p>
<p>如果证书由已知的证书颁发机构（CA）签发，或者证书由您的合作伙伴自己签发，并且您的信任密钥存储区中有其公开证书的副本，则 SSL 证书将被视为受信任的证书。FTPS 所有的用户名和密码信息将通过安全的 FTP 连接加密。</p>
<p>以下是 FTPS 的优点和缺点：</p>
<p>优点：</p>
<ul>
<li>通信可以被人们读取和理解</li>
<li>提供服务器到服务器文件传输的服务</li>
<li>SSL/TLS 具有良好的身份验证机制（X.509 证书功能）</li>
<li>FTP 和 SSL 支持内置于许多互联网通信框架中</li>
</ul>
<p>缺点：</p>
<ul>
<li>没有统一的目录列表格式</li>
<li>需要辅助数据通道（DATA），这使得难以通过防火墙使用</li>
<li>没有定义文件名字符集（编码）的标准</li>
<li>并非所有 FTP 服务器都支持 SSL/TLS</li>
<li>没有获取和更改文件或目录属性的标准方式</li>
</ul>
<h3><a href="#sftp"></a>SFTP</h3>
<p>SFTP 或 SSH 文件传输协议是另一种安全的安全文件传输协议，设计为 SSH 扩展以提供文件传输功能，因此它通常仅使用 SSH 端口用于数据传输和控制。当 <a href="http://www.techmixer.com/best-free-mac-ftp-client-connect-ftp-server/">FTP 客户端</a>软件连接到 SFTP 服务器时，它会将公钥传输到服务器进行认证。如果密钥匹配，提供任何用户/密码，身份验证就会成功。</p>
<p>以下是 SFTP 优点和缺点：</p>
<p>优点：</p>
<ul>
<li>只有一个连接（不需要 DATA 连接）。</li>
<li>FTP 连接始终保持安全</li>
<li>FTP 目录列表是一致的和机器可读的</li>
<li>FTP 协议包括操作权限和属性操作，文件锁定和更多的功能。</li>
</ul>
<p>缺点：</p>
<ul>
<li>通信是二进制的，不能“按原样”记录下来用于人类阅读，</li>
<li>SSH 密钥更难以管理和验证。</li>
<li>这些标准定义了某些可选或推荐的选项，这会导致不同供应商的不同软件之间存在某些兼容性问题。</li>
<li>没有服务器到服务器的复制和递归目录删除操作</li>
<li>在 VCL 和 .NET 框架中没有内置的 SSH/SFTP 支持。</li>
</ul>
<h3><a href="#对比"></a>对比</h3>
<p>大多数 FTP 服务器软件这两种安全 FTP 技术都支持，以及强大的身份验证选项。</p>
<p>但 SFTP 显然是赢家，因为它适合防火墙。SFTP 只需要通过防火墙打开一个端口（默认为 22）。此端口将用于所有 SFTP 通信，包括初始认证、发出的任何命令以及传输的任何数据。</p>
<p>FTPS 通过严格安全的防火墙相对难以实现，因为 FTPS 使用多个网络端口号。每次进行文件传输请求（get，put）或目录列表请求时，需要打开另一个端口号。因此，必须在您的防火墙中打开一系列端口以允许 FTPS 连接，这可能是您的网络的安全风险。</p>
<p>支持 FTPS 和 SFTP 的 FTP 服务器软件：</p>
<ol>
<li><a href="http://www.cerberusftp.com/">Cerberus FTP 服务器</a></li>
<li><a href="http://www.techmixer.com/free-ftp-server-best-windows-ftp-server-download/">FileZilla - 最著名的免费 FTP 和 FTPS 服务器软件</a></li>
<li><a href="http://www.serv-u.com/">Serv-U FTP 服务器</a></li>
</ol>
<hr>
<p>via: <a href="http://www.techmixer.com/ftps-sftp/">http://www.techmixer.com/ftps-sftp/</a></p>
<p>作者：<a href="http://www.techmixer.com/">Techmixer.com</a> 译者：<a href="https://github.com/Yuan0302">Yuan0302</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
FTPS（基于 SSL 的FTP）与 SFTP（SSH 文件传输协议）对比

## 原文链接
[https://www.zcfy.cc/article/ftps-vs-sftp](https://www.zcfy.cc/article/ftps-vs-sftp)

