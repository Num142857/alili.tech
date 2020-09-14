---
title: 'OpenSSL 在 Apache 和 Dovecot 下的使用（二）' 
date: 2019-01-24 2:30:11
hidden: true
slug: nv6aah9wj4e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#openssl-在-apache-和-dovecot-下的使用二"></a>OpenSSL 在 Apache 和 Dovecot 下的使用（二）</h1>
<blockquote>
<p>本篇中，Carla Schroder 会解释如何使用 OpenSSL 保护你的 Postfix/Dovecot 邮件服务器</p>
</blockquote>
<p><a href="https://www.linux.com/licenses/category/creative-commons-zero">Creative Commons Zero</a>Pixabay</p>
<p>在<a href="https://linux.cn/article-8167-1.html">上周</a>，作为我们 OpenSSL 系列的一部分，我们学习了如何配置 Apache 以使用 OpenSSL 并强制所有会话使用 HTTPS。 今天，我们将使用 OpenSSL 保护我们的 Postfix/Dovecot 邮件服务器。这些示例基于前面的教程; 请参阅最后的参考资料部分，了解本系列中以前的所有教程的链接。</p>
<p>你需要配置 Postfix 以及 Dovecot 都使用 OpenSSL，我们将使用我们在<a href="https://linux.cn/article-8167-1.html">OpenSSL 在 Apache 和 Dovecot 下的使用（一）</a>中创建的密钥和证书。</p>
<h3><a href="#postfix-配置"></a>Postfix 配置</h3>
<p>你必须编辑 <code>/etc/postfix/main.cf</code> 以及 <code>/etc/postfix/master.cf</code>。实例的 <code>main.cf</code> 是完整的配置，基于我们先前的教程。替换成你自己的 OpenSSL 密钥和证书名以及本地网络地址。</p>
<pre><code class="hljs ini"><span class="hljs-attr">compatibility_level</span>=<span class="hljs-number">2</span>
<span class="hljs-attr">smtpd_banner</span> = <span class="hljs-variable">$myhostname</span> ESMTP <span class="hljs-variable">$mail_name</span> (Ubuntu/GNU)
<span class="hljs-attr">biff</span> = <span class="hljs-literal">no</span>
<span class="hljs-attr">append_dot_mydomain</span> = <span class="hljs-literal">no</span>

<span class="hljs-attr">myhostname</span> = localhost
<span class="hljs-attr">alias_maps</span> = hash:/etc/aliases
<span class="hljs-attr">alias_database</span> = hash:/etc/aliases
<span class="hljs-attr">myorigin</span> = <span class="hljs-variable">$myhostname</span>
<span class="hljs-attr">mynetworks</span> = <span class="hljs-number">127.0</span>.<span class="hljs-number">0.0</span>/<span class="hljs-number">8</span> [::ffff:<span class="hljs-number">127.0</span>.<span class="hljs-number">0.0</span>]/<span class="hljs-number">104</span> [::<span class="hljs-number">1</span>]/<span class="hljs-number">128</span> <span class="hljs-number">192.168</span>.<span class="hljs-number">0.0</span>/<span class="hljs-number">24</span>
<span class="hljs-attr">mailbox_size_limit</span> = <span class="hljs-number">0</span>
<span class="hljs-attr">recipient_delimiter</span> = +
<span class="hljs-attr">inet_interfaces</span> = all

<span class="hljs-attr">virtual_mailbox_domains</span> = /etc/postfix/vhosts.txt
<span class="hljs-attr">virtual_mailbox_base</span> = /home/vmail
<span class="hljs-attr">virtual_mailbox_maps</span> = hash:/etc/postfix/vmaps.txt
<span class="hljs-attr">virtual_minimum_uid</span> = <span class="hljs-number">1000</span>
<span class="hljs-attr">virtual_uid_maps</span> = static:<span class="hljs-number">5000</span>
<span class="hljs-attr">virtual_gid_maps</span> = static:<span class="hljs-number">5000</span>
<span class="hljs-attr">virtual_transport</span> = lmtp:unix:private/dovecot-lmtp

<span class="hljs-attr">smtpd_tls_cert_file</span>=/etc/ssl/certs/test-com.pem
<span class="hljs-attr">smtpd_tls_key_file</span>=/etc/ssl/private/test-com.key
<span class="hljs-attr">smtpd_use_tls</span>=<span class="hljs-literal">yes</span>

<span class="hljs-attr">smtpd_sasl_auth_enable</span> = <span class="hljs-literal">yes</span>
<span class="hljs-attr">smtpd_sasl_type</span> = dovecot
<span class="hljs-attr">smtpd_sasl_path</span> = private/auth
<span class="hljs-attr">smtpd_sasl_authenticated_header</span> = <span class="hljs-literal">yes</span>

</code></pre><p>在 <code>master.cf</code> 取消 <code>submission inet</code> 部分的注释，并编辑 <code>smtpd_recipient_restrictions</code>：</p>
<pre><code class="hljs routeros"><span class="hljs-comment">#submission inet n  -  y  -  - smtpd</span>
  -o <span class="hljs-attribute">syslog_name</span>=postfix/submission
  -o <span class="hljs-attribute">smtpd_tls_security_level</span>=encrypt
  -o <span class="hljs-attribute">smtpd_sasl_auth_enable</span>=<span class="hljs-literal">yes</span>
  -o <span class="hljs-attribute">milter_macro_daemon_name</span>=ORIGINATING
  -o <span class="hljs-attribute">smtpd_recipient_restrictions</span>=permit_mynetworks,permit_sasl_authenticated,reject
  -o <span class="hljs-attribute">smtpd_tls_wrappermode</span>=<span class="hljs-literal">no</span>

</code></pre><p>完成后重新加载 Postfix：</p>
<pre><code class="hljs routeros">$ sudo<span class="hljs-built_in"> service </span>postfix reload

</code></pre><h3><a href="#dovecot-配置"></a>Dovecot 配置</h3>
<p>在我们以前的教程中，我们为 Dovecot 创建了一个单一配置文件 <code>/etc/dovecot/dovecot.conf</code>，而不是使用多个默认配置文件。这是一个基于我们以前的教程的完整配置。再说一次，使用你自己的 OpenSSL 密钥和证书，以及你自己的 <code>userdb</code> 的 home 文件：</p>
<pre><code class="hljs nix"><span class="hljs-attr">protocols</span> = imap pop3 lmtp
<span class="hljs-attr">log_path</span> = /var/log/dovecot.log
<span class="hljs-attr">info_log_path</span> = /var/log/dovecot-info.log
<span class="hljs-attr">disable_plaintext_auth</span> = no
<span class="hljs-attr">mail_location</span> = maildir:~/.Mail
<span class="hljs-attr">pop3_uidl_format</span> = %g
<span class="hljs-attr">auth_mechanisms</span> = plain

passdb {
  <span class="hljs-attr">driver</span> = passwd-file
  <span class="hljs-attr">args</span> = /etc/dovecot/passwd
}

userdb {
  <span class="hljs-attr">driver</span> = static
  <span class="hljs-attr">args</span> = <span class="hljs-attr">uid=vmail</span> <span class="hljs-attr">gid=vmail</span> <span class="hljs-attr">home=/home/vmail/studio/%u</span>
}

service lmtp {
 unix_listener /var/spool/postfix/private/dovecot-lmtp {
   <span class="hljs-attr">group</span> = postfix
   <span class="hljs-attr">mode</span> = <span class="hljs-number">0600</span>
   <span class="hljs-attr">user</span> = postfix
  }
}

protocol lmtp {
  <span class="hljs-attr">postmaster_address</span> = postmaster@studio
}

service lmtp {
  <span class="hljs-attr">user</span> = vmail
}

service auth {
  unix_listener /var/spool/postfix/private/auth {
    <span class="hljs-attr">mode</span> = <span class="hljs-number">0660</span>
        <span class="hljs-attr">user=postfix</span>
        <span class="hljs-attr">group=postfix</span>
  }
 }

<span class="hljs-attr">ssl=required</span>
<span class="hljs-attr">ssl_cert</span> = &lt;/etc/ssl/certs/test-com.pem
<span class="hljs-attr">ssl_key</span> = &lt;/etc/ssl/private/test-com.key

</code></pre><p>重启 Dovecot:</p>
<pre><code class="hljs routeros">$ sudo<span class="hljs-built_in"> service </span>postfix reload

</code></pre><h3><a href="#用-telnet-测试"></a>用 telnet 测试</h3>
<p>就像我们以前一样，现在我们可以通过使用 telnet 发送消息来测试我们的设置。 但是等等，你说 telnet 不支持 TLS/SSL，那么这样怎么办呢？首先通过使用 <code>openssl s_client</code> 打开一个加密会话。<code>openssl s_client</code> 的输出将显示你的证书及其指纹和大量其它信息，以便你知道你的服务器正在使用正确的证书。会话建立后输入的命令都是不以数字开头的：</p>
<pre><code class="hljs yaml"><span class="hljs-string">$</span> <span class="hljs-string">openssl</span> <span class="hljs-string">s_client</span> <span class="hljs-bullet">-starttls</span> <span class="hljs-string">smtp</span> <span class="hljs-bullet">-connect</span> <span class="hljs-attr">studio:25</span>
<span class="hljs-string">CONNECTED(00000003)</span>
<span class="hljs-string">[masses</span> <span class="hljs-string">of</span> <span class="hljs-string">output</span> <span class="hljs-string">snipped]</span>
    <span class="hljs-string">Verify</span> <span class="hljs-string">return</span> <span class="hljs-attr">code:</span> <span class="hljs-number">0</span> <span class="hljs-string">(ok)</span>
<span class="hljs-meta">---</span>
<span class="hljs-number">250</span> <span class="hljs-string">SMTPUTF8</span>
<span class="hljs-string">EHLO</span> <span class="hljs-string">studio</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-localhost</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-PIPELINING</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-SIZE</span> <span class="hljs-number">10240000</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-VRFY</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-ETRN</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-AUTH</span> <span class="hljs-string">PLAIN</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-ENHANCEDSTATUSCODES</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-8</span><span class="hljs-string">BITMIME</span>
<span class="hljs-number">250</span><span class="hljs-bullet">-DSN</span>
<span class="hljs-number">250</span> <span class="hljs-string">SMTPUTF8</span>
<span class="hljs-string">mail</span> <span class="hljs-attr">from:</span> <span class="hljs-string">&lt;carla@domain.com&gt;</span>
<span class="hljs-number">250</span> <span class="hljs-number">2.1</span><span class="hljs-number">.0</span> <span class="hljs-string">Ok</span>
<span class="hljs-string">rcpt</span> <span class="hljs-attr">to:</span> <span class="hljs-string">&lt;alrac@studio&gt;</span>
<span class="hljs-number">250</span> <span class="hljs-number">2.1</span><span class="hljs-number">.5</span> <span class="hljs-string">Ok</span>
<span class="hljs-string">data</span>
<span class="hljs-number">354</span> <span class="hljs-string">End</span> <span class="hljs-string">data</span> <span class="hljs-string">with</span> <span class="hljs-string">.subject:</span> <span class="hljs-string">TLS/SSL</span> <span class="hljs-string">test</span>
<span class="hljs-string">Hello,</span> <span class="hljs-string">we</span> <span class="hljs-string">are</span> <span class="hljs-string">testing</span> <span class="hljs-string">TLS/SSL.</span> <span class="hljs-string">Looking</span> <span class="hljs-string">good</span> <span class="hljs-string">so</span> <span class="hljs-string">far.</span>
<span class="hljs-string">.</span>
<span class="hljs-number">250</span> <span class="hljs-number">2.0</span><span class="hljs-number">.0</span> <span class="hljs-attr">Ok:</span> <span class="hljs-string">queued</span> <span class="hljs-string">as</span> <span class="hljs-string">B9B529FE59</span>
<span class="hljs-string">quit</span>
<span class="hljs-number">221</span> <span class="hljs-number">2.0</span><span class="hljs-number">.0</span> <span class="hljs-string">Bye</span>

</code></pre><p>你应该可以在邮件客户端中看到一条新邮件，并在打开时要求你验证 SSL 证书。你也可以使用 <code>openssl s_client</code> 来测试 Dovecot 的 POP3 和 IMAP 服务。此示例测试加密的 POP3，第 5 号消息是我们在 telnet（如上）中创建的：</p>
<pre><code class="hljs routeros">$ openssl s_client -connect studio:995
CONNECTED(00000003)
[masses of output snipped]
    Verify return code: 0 (ok)
---
+OK Dovecot ready<span class="hljs-built_in">
user </span>alrac@studio 
+OK
pass password
+OK Logged <span class="hljs-keyword">in</span>.
list
+OK 5 messages:
1 499
2 504
3 514
4 513
5 565
.
retr 5
+OK 565 octets
Return-Path: &lt;carla@domain.com&gt;
Delivered-To: alrac@studio
Received: <span class="hljs-keyword">from</span> localhost
        by studio.alrac.net (Dovecot) with LMTP id y8G5C8aablgKIQAAYelYQA
        <span class="hljs-keyword">for</span> &lt;alrac@studio&gt;; Thu, 05 Jan 2017 11:13:10 -0800
Received: <span class="hljs-keyword">from</span> studio (localhost [127.0.0.1])
        by localhost (Postfix) with ESMTPS id B9B529FE59
        <span class="hljs-keyword">for</span> &lt;alrac@studio&gt;; Thu,  5 Jan 2017 11:12:13 -0800 (PST)
subject: TLS/SSL test
Message-Id: &lt;20170105191240.B9B529FE59@localhost&gt;
Date: Thu,  5 Jan 2017 11:12:13 -0800 (PST)
<span class="hljs-keyword">From</span>: carla@domain.com

Hello, we are testing TLS/SSL. Looking good so far.
.
quit
+OK<span class="hljs-built_in"> Logging </span>out.
closed

</code></pre><h3><a href="#现在做什么"></a>现在做什么？</h3>
<p>现在你有一个功能良好的，具有合适的 TLS/SSL 保护的邮件服务器了。我鼓励你深入学习 Postfix 以及 Dovecot； 这些教程中的示例尽可能地简单，不包括对安全性、防病毒扫描程序、垃圾邮件过滤器或任何其他高级功能的调整。我认为当你有一个基本工作系统时更容易学习高级功能。</p>
<p>下周回到 openSUSE 包管理备忘录上。</p>
<h3><a href="#资源"></a>资源</h3>
<ul>
<li><a href="https://linux.cn/article-8167-1.html">为 Apache 和 Dovecot 使用 OpenSSL</a></li>
<li><a href="https://linux.cn/article-8071-1.html">如何在 Ubuntu Linux 上构建电子邮件服务器</a></li>
<li><a href="https://linux.cn/article-8077-1.html">在 Ubuntu Linux 上构建电子邮件服务器：第2部分</a></li>
<li><a href="https://linux.cn/article-8088-1.html">在 Ubuntu Linux 上构建电子邮件服务器：第3部分</a></li>
<li><a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners">给初学者看的在 Ubuntu Linux 上使用 Apache</a></li>
<li><a href="https://www.linux.com/learn/apache-ubuntu-linux-beginners-part-2">给初学者看的在 Ubuntu Linux 上使用 Apache：第二部分</a></li>
<li><a href="https://www.linux.com/learn/apache-centos-linux-beginners">给初学者看的在 CentOS Linux 上使用 Apache</a></li>
<li><a href="https://www.linux.com/learn/quieting-scary-web-browser-ssl-alerts">消灭让人害怕的 web 浏览器 SSL 警告</a></li>
</ul>
<hr>
<p>via: <a href="https://www.linux.com/learn/intro-to-linux/openssl-apache-and-dovecot-part-2">https://www.linux.com/learn/intro-to-linux/openssl-apache-and-dovecot-part-2</a></p>
<p>作者：<a href="https://www.linux.com/users/cschroder">CARLA SCHRODER</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
OpenSSL 在 Apache 和 Dovecot 下的使用（二）

## 原文链接
[https://www.zcfy.cc/article/openssl-for-apache-and-dovecot-part-2](https://www.zcfy.cc/article/openssl-for-apache-and-dovecot-part-2)

