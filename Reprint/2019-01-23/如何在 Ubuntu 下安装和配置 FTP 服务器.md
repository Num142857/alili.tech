---
title: '如何在 Ubuntu 下安装和配置 FTP 服务器' 
date: 2019-01-23 2:30:08
hidden: true
slug: s7uyz9tj15c
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-下安装和配置-ftp-服务器"></a>如何在 Ubuntu 下安装和配置 FTP 服务器</h1>
<p>FTP（文件传输协议）是一个较老且最常用的标准网络协议，用于在两台计算机之间通过网络上传/下载文件。然而， FTP 最初的时候并不安全，因为它仅通过用户凭证（用户名和密码）传输数据，没有进行加密。</p>
<p>警告：如果你打算使用 FTP， 需要考虑通过 SSL/TLS（将在下篇文章中讨论）配置 FTP 连接。否则，使用安全 FTP，比如 <a href="http://www.tecmint.com/sftp-command-examples/">SFTP</a> 会更好一些。</p>
<p><strong>推荐阅读：</strong><a href="http://www.tecmint.com/install-ftp-server-in-centos-7/">如何在 CentOS 7 中安装并保护 FTP 服务器</a></p>
<p>在这个教程中，我将向你们展示如何在 Ubuntu 中安装、配置并保护 FTP 服务器（VSFTPD 的全称是 “Very Secure FTP Deamon”），从而拥有强大的安全性，能够防范 FTP 漏洞。</p>
<h3><a href="#第一步在-ubuntu-中安装-vsftpd-服务器"></a>第一步：在 Ubuntu 中安装 VSFTPD 服务器</h3>
<p>1、首先，我们需要更新系统安装包列表，然后像下面这样安装 VSFTPD 二进制包：</p>
<pre><code class="hljs routeros">$ sudo apt-<span class="hljs-builtin-name">get</span> update
$ sudo apt-<span class="hljs-builtin-name">get</span> install vsftpd

</code></pre><p>2、一旦安装完成，初始情况下服务被禁用。因此，我们需要手动开启服务，同时，启动它使得在下次开机时能够自动开启服务：</p>
<pre><code class="hljs shell">------------- On SystemD -------------
<span class="hljs-meta">#</span><span class="bash"> systemctl start vsftpd</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> vsftpd</span>
------------- On SysVInit -------------
<span class="hljs-meta">#</span><span class="bash"> service vsftpd start</span>
<span class="hljs-meta">#</span><span class="bash"> chkconfig --level 35 vsftpd on</span>

</code></pre><p>3、接下来，如果你在服务器上启用了 <a href="http://www.tecmint.com/how-to-install-and-configure-ufw-firewall/">UFW 防火墙</a>（默认情况下不启用），那么需要打开端口 20 和 21 —— FTP 守护进程正在监听它们——从而才能允许从远程机器访问 FTP 服务，然后，像下面这样添加新的防火墙规则：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo ufw allow 20/tcp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo ufw allow 21/tcp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo ufw status</span>

</code></pre><h3><a href="#第二步在-ubuntu-中配置并保护-vsftpd-服务器"></a>第二步：在 Ubuntu 中配置并保护 VSFTPD 服务器</h3>
<p>4、让我们进行一些配置来设置和保护 FTP 服务器。首先，我们像下面这样创建一个原始配置文件 <code>/etc/vsftpd/vsftpd.conf</code> 的备份文件：</p>
<pre><code class="hljs stylus">$ sudo cp /etc/vsftpd<span class="hljs-selector-class">.conf</span> /etc/vsftpd<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.orig</span>

</code></pre><p>接下来，打开 vsftpd 配置文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/vsftpd.conf</span>
OR
<span class="hljs-meta">$</span><span class="bash"> sudo nano /etc/vsftpd.conf</span>

</code></pre><p>把下面的这些选项添加/改成所展示的值：</p>
<pre><code class="hljs routeros"><span class="hljs-attribute">anonymous_enable</span>=<span class="hljs-literal">NO</span>             # 关闭匿名登录
<span class="hljs-attribute">local_enable</span>=<span class="hljs-literal">YES</span>        # 允许本地用户登录
<span class="hljs-attribute">write_enable</span>=<span class="hljs-literal">YES</span>        # 启用可以修改文件的 FTP 命令
<span class="hljs-attribute">local_umask</span>=022                # 本地用户创建文件的 umask 值
<span class="hljs-attribute">dirmessage_enable</span>=<span class="hljs-literal">YES</span>            # 当用户第一次进入新目录时显示提示消息
<span class="hljs-attribute">xferlog_enable</span>=<span class="hljs-literal">YES</span>        # 一个存有详细的上传和下载信息的日志文件
<span class="hljs-attribute">connect_from_port_20</span>=<span class="hljs-literal">YES</span>        # 在服务器上针对<span class="hljs-built_in"> PORT </span>类型的连接使用端口 20（FTP 数据）
<span class="hljs-attribute">xferlog_std_format</span>=<span class="hljs-literal">YES</span>          # 保持标准日志文件格式
<span class="hljs-attribute">listen</span>=<span class="hljs-literal">NO</span>               # 阻止 vsftpd 在独立模式下运行
<span class="hljs-attribute">listen_ipv6</span>=<span class="hljs-literal">YES</span>                # vsftpd 将监听<span class="hljs-built_in"> ipv6 </span>而不是 IPv4，你可以根据你的网络情况设置
<span class="hljs-attribute">pam_service_name</span>=vsftpd         # vsftpd 将使用的 PAM 验证设备的名字
<span class="hljs-attribute">userlist_enable</span>=<span class="hljs-literal">YES</span>              # 允许 vsftpd 加载用户名字列表
<span class="hljs-attribute">tcp_wrappers</span>=<span class="hljs-literal">YES</span>          # 打开 tcp 包装器

</code></pre><p>5、现在，配置 VSFTPD ，基于用户列表文件 <code>/etc/vsftpd.userlist</code> 来允许或拒绝用户访问 FTP。</p>
<p>注意，在默认情况下，如果通过 <code>userlist_enable=YES</code> 启用了用户列表，且设置 <code>userlist_deny=YES</code> 时，那么，用户列表文件 <code>/etc/vsftpd.userlist</code> 中的用户是不能登录访问的。</p>
<p>但是，选项 <code>userlist_deny=NO</code> 则反转了默认设置，这种情况下只有用户名被明确列出在 <code>/etc/vsftpd.userlist</code> 中的用户才允许登录到 FTP 服务器。</p>
<pre><code class="hljs ini"><span class="hljs-attr">userlist_enable</span>=<span class="hljs-literal">YES</span>                   # vsftpd 将会从所给的用户列表文件中加载用户名字列表
<span class="hljs-attr">userlist_file</span>=/etc/vsftpd.userlist    # 存储用户名字的列表
<span class="hljs-attr">userlist_deny</span>=<span class="hljs-literal">NO</span>

</code></pre><p>重要的是，当用户登录 FTP 服务器以后，他们将进入 chrooted 环境，即当在 FTP 会话时，其 root 目录将是其 home 目录。</p>
<p>接下来，我们来看一看两种可能的途径来设置 chrooted（本地 root）目录，正如下面所展示的。</p>
<p>6、这时，让我们添加/修改/取消这两个选项来<a href="http://www.tecmint.com/restrict-sftp-user-home-directories-using-chroot/">将 FTP 用户限制在其 home 目录</a></p>
<pre><code class="hljs ini"><span class="hljs-attr">chroot_local_user</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">allow_writeable_chroot</span>=<span class="hljs-literal">YES</span>

</code></pre><p>选项 <code>chroot_local_user=YES</code> 意味着本地用户将进入 chroot 环境，当登录以后默认情况下是其 home 目录。</p>
<p>并且我们要知道，默认情况下，出于安全原因，VSFTPD 不允许 chroot 目录具有可写权限。然而，我们可以通过选项 <code>allow_writeable_chroot=YES</code> 来改变这个设置</p>
<p>保存文件然后关闭。现在我们需要重启 VSFTPD 服务从而使上面的这些更改生效：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">-------------</span> On SystemD <span class="hljs-params">-------------</span>
<span class="hljs-comment"># systemctl restart vsftpd</span>
<span class="hljs-params">-------------</span> On SysVInit <span class="hljs-params">-------------</span>
<span class="hljs-comment"># service vsftpd restart</span>

</code></pre><h3><a href="#第三步在-ubuntu-上测试-vsftp-服务器"></a>第三步：在 Ubuntu 上测试 VsFTP 服务器</h3>
<p>7、现在，我们通过使用下面展示的 <a href="http://www.tecmint.com/add-users-in-linux/">useradd 命令</a>创建一个 FTP 用户来测试 FTP 服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo useradd -m -c <span class="hljs-string">"Aaron Kili, Contributor"</span> -s /bin/bash aaronkilik</span>
<span class="hljs-meta">$</span><span class="bash"> sudo passwd aaronkilik</span>

</code></pre><p>然后，我们需要像下面这样使用 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a>和 tee 命令来明确地列出文件 <code>/etc/vsftpd.userlist</code> 中的用户 aaronkilik：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"aaronkilik"</span> | sudo tee -a /etc/vsftpd.userlist</span>
<span class="hljs-meta">$</span><span class="bash"> cat /etc/vsftpd.userlist</span>

</code></pre><p>8、现在，是时候来测试上面的配置是否具有我们想要的功能了。我们首先测试匿名登录；我们可以从下面的输出中很清楚的看到，在这个 FTP 服务器中是不允许匿名登录的：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span><span class="hljs-selector-pseudo">:aaronkilik)</span> : <span class="hljs-selector-tag">anonymous</span>
530 <span class="hljs-selector-tag">Permission</span> <span class="hljs-selector-tag">denied</span>.
<span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">failed</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">bye</span>
221 <span class="hljs-selector-tag">Goodbye</span>.

</code></pre><p>9、接下来，我们将测试，如果用户的名字没有在文件 <code>/etc/vsftpd.userlist</code> 中，是否能够登录。从下面的输出中，我们看到，这是不可以的：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:root)</span> : <span class="hljs-selector-tag">user1</span>
530 <span class="hljs-selector-tag">Permission</span> <span class="hljs-selector-tag">denied</span>.
<span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">failed</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">bye</span>
221 <span class="hljs-selector-tag">Goodbye</span>.

</code></pre><p>10、现在，我们将进行最后一项测试，来确定列在文件 <code>/etc/vsftpd.userlist</code> 文件中的用户登录以后，是否实际处于 home 目录。从下面的输出中可知，是这样的：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span><span class="hljs-selector-pseudo">:aaronkilik)</span> : <span class="hljs-selector-tag">aaronkilik</span>
331 <span class="hljs-selector-tag">Please</span> <span class="hljs-selector-tag">specify</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">password</span>.
<span class="hljs-selector-tag">Password</span>:
230 <span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">successful</span>.
<span class="hljs-selector-tag">Remote</span> <span class="hljs-selector-tag">system</span> <span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">UNIX</span>.
<span class="hljs-selector-tag">Using</span> <span class="hljs-selector-tag">binary</span> <span class="hljs-selector-tag">mode</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">transfer</span> <span class="hljs-selector-tag">files</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">ls</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Verify-FTP-Login-in-Ubuntu.png"><img src="https://p1.ssl.qhimg.com/t0109d37ea0b10a60e2.png" alt="Verify FTP Login in Ubuntu"></a></p>
<p><em>在 Ubuntu 中确认 FTP 登录</em></p>
<p>警告：设置选项 <code>allow_writeable_chroot=YES</code> 是很危险的，特别是如果用户具有上传权限，或者可以 shell 访问的时候，很可能会出现安全问题。只有当你确切的知道你在做什么的时候，才可以使用这个选项。</p>
<p>我们需要注意，这些安全问题不仅会影响到 VSFTPD，也会影响让本地用户进入 chroot 环境的 FTP daemon。</p>
<p>因为这些原因，在下一步中，我将阐述一个更安全的方法，来帮助用户设置一个非可写本地 root 目录。</p>
<h3><a href="#第四步在-ubuntu-中配置-ftp-用户的-home-目录"></a>第四步：在 Ubuntu 中配置 FTP 用户的 Home 目录</h3>
<p>11、现在，再次打开 VSFTPD 配置文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/vsftpd.conf</span>
OR
<span class="hljs-meta">$</span><span class="bash"> sudo nano /etc/vsftpd.conf</span>

</code></pre><p>然后像下面这样用 <code>#</code> 把不安全选项注释了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash">allow_writeable_chroot=YES</span>

</code></pre><p>接下来，为用户创建一个替代的本地 root 目录（aaronkilik，你的可能和这不一样），然后设置目录权限，取消其他所有用户对此目录的写入权限：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo mkdir /home/aaronkilik/ftp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo chown nobody:nogroup /home/aaronkilik/ftp</span>
<span class="hljs-meta">$</span><span class="bash"> sudo chmod a-w /home/aaronkilik/ftp</span>

</code></pre><p>12、然后，在本地 root 目录下创建一个具有合适权限的目录，用户将在这儿存储文件：</p>
<pre><code class="hljs groovy">$ sudo mkdir <span class="hljs-regexp">/home/</span>aaronkilik<span class="hljs-regexp">/ftp/</span>files
$ sudo chown -R <span class="hljs-string">aaronkilk:</span>aaronkilik <span class="hljs-regexp">/home/</span>aaronkilik<span class="hljs-regexp">/ftp/</span>files
$ sudo chmod -R <span class="hljs-number">0770</span> <span class="hljs-regexp">/home/</span>aaronkilik<span class="hljs-regexp">/ftp/</span>files/

</code></pre><p>之后，将 VSFTPD 配置文件中的下面这些选项添加/修改为相应的值：</p>
<pre><code class="hljs ini"><span class="hljs-attr">user_sub_token</span>=<span class="hljs-variable">$USER</span>          # 在本地 root 目录中插入用户名
<span class="hljs-attr">local_root</span>=/home/<span class="hljs-variable">$USER</span>/ftp    # 定义各个用户的本地 root 目录

</code></pre><p>保存文件并关闭。然后重启 VSFTPD 服务来使上面的设置生效：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">-------------</span> On SystemD <span class="hljs-params">-------------</span>
<span class="hljs-comment"># systemctl restart vsftpd</span>
<span class="hljs-params">-------------</span> On SysVInit <span class="hljs-params">-------------</span>
<span class="hljs-comment"># service vsftpd restart</span>

</code></pre><p>13、现在，让我们来最后检查一下，确保用户的本地 root 目录是我们在他的 Home 目录中创建的 FTP 目录。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.102</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:aaronkilik)</span> : <span class="hljs-selector-tag">aaronkilik</span>
331 <span class="hljs-selector-tag">Please</span> <span class="hljs-selector-tag">specify</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">password</span>.
<span class="hljs-selector-tag">Password</span>:
230 <span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">successful</span>.
<span class="hljs-selector-tag">Remote</span> <span class="hljs-selector-tag">system</span> <span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">UNIX</span>.
<span class="hljs-selector-tag">Using</span> <span class="hljs-selector-tag">binary</span> <span class="hljs-selector-tag">mode</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">transfer</span> <span class="hljs-selector-tag">files</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">ls</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/FTP-User-Home-Directory-Login.png"><img src="https://p2.ssl.qhimg.com/t010396e80145df8514.png" alt="FTP User Home Directory Login"></a></p>
<p><em>FTP 用户 Home 目录登录</em></p>
<p>就是这样的！记得通过下面的评论栏来分享你关于这篇指导的想法，或者你也可以提供关于这一话题的任何重要信息。</p>
<p>最后但不是不重要，请不要错过我的下一篇文章，在下一篇文章中，我将阐述如何<a href="http://www.tecmint.com/secure-ftp-server-using-ssl-tls-on-ubuntu/">使用 SSL/TLS 来保护连接到 Ubuntu 16.04/16.10 的 FTP 服务器</a>，在那之前，请始终关注我们。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，即将成为 Linux SysAdmin 和网络开发人员，目前是 TecMint 的内容创作者，他喜欢在电脑上工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/install-ftp-server-in-ubuntu/">http://www.tecmint.com/install-ftp-server-in-ubuntu/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 下安装和配置 FTP 服务器

## 原文链接
[https://www.zcfy.cc/article/how-to-install-and-configure-ftp-server-in-ubuntu](https://www.zcfy.cc/article/how-to-install-and-configure-ftp-server-in-ubuntu)

