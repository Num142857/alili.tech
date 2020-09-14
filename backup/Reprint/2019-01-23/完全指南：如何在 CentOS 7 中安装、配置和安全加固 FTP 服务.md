---
title: '完全指南：如何在 CentOS 7 中安装、配置和安全加固 FTP 服务' 
date: 2019-01-23 2:30:08
hidden: true
slug: imxawbafod
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#完全指南如何在-centos-7-中安装配置和安全加固-ftp-服务"></a>完全指南：如何在 CentOS 7 中安装、配置和安全加固 FTP 服务</h1>
<p>FTP（文件传输协议）是一种用于通过网络<a href="http://www.tecmint.com/scp-commands-examples/">在服务器和客户端之间传输文件</a>的传统并广泛使用的标准工具，特别是在不需要身份验证的情况下（允许匿名用户连接到服务器）。我们必须明白，默认情况下 FTP 是不安全的，因为它不加密传输用户凭据和数据。</p>
<p>在本指南中，我们将介绍在 CentOS/RHEL7 和 Fedora 发行版中安装、配置和保护 FTP 服务器（ VSFTPD 代表 “Very Secure FTP Daemon”）的步骤。</p>
<p>请注意，本指南中的所有命令将以 root 身份运行，如果你不使用 root 帐户操作服务器，请使用 <a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">sudo命令</a> 获取 root 权限。</p>
<h3><a href="#步骤-1安装-ftp-服务器"></a>步骤 1：安装 FTP 服务器</h3>
<p>1、 安装 vsftpd 服务器很直接，只要在终端运行下面的命令。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install vsftpd</span>

</code></pre><p>2、 安装完成后，服务先是被禁用的，因此我们需要手动启动，并设置在下次启动时自动启用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl start vsftpd</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> vsftpd</span>

</code></pre><p>3、 接下来，为了允许从外部系统访问 FTP 服务，我们需要打开 FTP 守护进程监听的 21 端口：</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=public</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">port=21/tcp</span>
<span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">zone=public</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">permanent</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">add</span><span class="hljs-literal">-</span><span class="hljs-comment">service=ftp</span>
<span class="hljs-comment">#</span> <span class="hljs-comment">firewall</span><span class="hljs-literal">-</span><span class="hljs-comment">cmd</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">reload</span>

</code></pre><h3><a href="#步骤-2-配置-ftp-服务器"></a>步骤 2： 配置 FTP 服务器</h3>
<p>4、 现在，我们会进行一些配置来设置并加密我们的 FTP 服务器，让我们先备份一下原始配置文件 <code>/etc/vsftpd/vsftpd.conf</code>：</p>
<pre><code class="hljs gradle"># cp <span class="hljs-regexp">/etc/</span>vsftpd<span class="hljs-regexp">/vsftpd.conf /</span>etc<span class="hljs-regexp">/vsftpd/</span>vsftpd.conf.orig

</code></pre><p>接下来，打开上面的文件，并将下面的选项设置相关的值：</p>
<pre><code class="hljs routeros"><span class="hljs-attribute">anonymous_enable</span>=<span class="hljs-literal">NO</span>             ### 禁用匿名登录
<span class="hljs-attribute">local_enable</span>=<span class="hljs-literal">YES</span>        ### 允许本地用户登录
<span class="hljs-attribute">write_enable</span>=<span class="hljs-literal">YES</span>        ### 允许对文件系统做改动的 FTP 命令
<span class="hljs-attribute">local_umask</span>=022                ### 本地用户创建文件所用的 umask 值
<span class="hljs-attribute">dirmessage_enable</span>=<span class="hljs-literal">YES</span>            ### 当用户首次进入一个新目录时显示一个消息
<span class="hljs-attribute">xferlog_enable</span>=<span class="hljs-literal">YES</span>        ### 用于记录上传、下载细节的日志文件
<span class="hljs-attribute">connect_from_port_20</span>=<span class="hljs-literal">YES</span>        ### 使用端口 20 （ftp-data）用于<span class="hljs-built_in"> PORT </span>风格的连接
<span class="hljs-attribute">xferlog_std_format</span>=<span class="hljs-literal">YES</span>          ### 使用标准的日志格式
<span class="hljs-attribute">listen</span>=<span class="hljs-literal">NO</span>               ### 不要让 vsftpd 运行在独立模式
<span class="hljs-attribute">listen_ipv6</span>=<span class="hljs-literal">YES</span>                ### vsftpd 将监听<span class="hljs-built_in"> IPv6 </span>而不是 IPv4
<span class="hljs-attribute">pam_service_name</span>=vsftpd         ###  vsftpd 使用的 PAM 服务名
<span class="hljs-attribute">userlist_enable</span>=<span class="hljs-literal">YES</span>              ### vsftpd 支持载入用户列表
<span class="hljs-attribute">tcp_wrappers</span>=<span class="hljs-literal">YES</span>          ### 使用 tcp wrappers

</code></pre><p>5、 现在基于用户列表文件 <code>/etc/vsftpd.userlist</code> 来配置 FTP 来允许/拒绝用户的访问。</p>
<p>默认情况下，如果设置了 <code>userlist_enable=YES</code>，当 <code>userlist_deny</code> 选项设置为 <code>YES</code> 的时候，<code>userlist_file=/etc/vsftpd.userlist</code> 中列出的用户被拒绝登录。</p>
<p>然而， 更改配置为 <code>userlist_deny=NO</code>，意味着只有在 <code>userlist_file=/etc/vsftpd.userlist</code> 显式指定的用户才允许登录。</p>
<pre><code class="hljs ini"><span class="hljs-attr">userlist_enable</span>=<span class="hljs-literal">YES</span>                   ### vsftpd 将从 userlist_file 给出的文件中载入用户名列表
<span class="hljs-attr">userlist_file</span>=/etc/vsftpd.userlist    ### 存储用户名的文件
<span class="hljs-attr">userlist_deny</span>=<span class="hljs-literal">NO</span>   

</code></pre><p>这并不是全部，当用户登录到 FTP 服务器时，它们会进入 chroot jail 中，这是仅作为 FTP 会话主目录的本地根目录。</p>
<p>接下来，我们将介绍如何将 FTP 用户 chroot 到 FTP 用户的家目录（本地 root）中的两种可能情况，如下所述。</p>
<p>6、 接下来添加下面的选项来限制 FTP 用户到它们自己的家目录。</p>
<pre><code class="hljs ini"><span class="hljs-attr">chroot_local_user</span>=<span class="hljs-literal">YES</span>
<span class="hljs-attr">allow_writeable_chroot</span>=<span class="hljs-literal">YES</span>

</code></pre><p><code>chroot_local_user=YES</code> 意味着用户可以设置 chroot jail，默认是登录后的家目录。</p>
<p>同样默认的是，出于安全原因，vsftpd 不会允许 chroot jail 目录可写，然而，我们可以添加 <code>allow_writeable_chroot=YES</code> 来覆盖这个设置。</p>
<p>保存并关闭文件。</p>
<h3><a href="#步骤-3-用-selinux-加密-ftp-服务器"></a>步骤 3： 用 SELinux 加密 FTP 服务器</h3>
<p>7、现在，让我们设置下面的 SELinux 布尔值来允许 FTP 能读取用户家目录下的文件。请注意，这原本是使用以下命令完成的：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> setsebool -P ftp_home_dir on</span>

</code></pre><p>然而，由于这个 bug 报告：<a href="https://bugzilla.redhat.com/show_bug.cgi?id=1097775">https://bugzilla.redhat.com/show_bug.cgi?id=1097775</a>，<code>ftp_home_dir</code> 指令默认是禁用的。</p>
<p>现在，我们会使用 <code>semanage</code> 命令来设置 SELinux 规则来允许 FTP 读取/写入用户的家目录。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> semanage boolean -m ftpd_full_access --on</span>

</code></pre><p>这时，我们需要重启 vsftpd 来使目前的设置生效：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart vsftpd</span>

</code></pre><h3><a href="#步骤-4-测试-ftp-服务器"></a>步骤 4： 测试 FTP 服务器</h3>
<p>8、 现在我们会用 <a href="http://www.tecmint.com/add-users-in-linux/">useradd 命令</a>创建一个 FTP 用户来测试 FTP 服务器。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd -m -c “Ravi Saive, CEO” -s /bin/bash ravi</span>
<span class="hljs-meta">#</span><span class="bash"> passwd ravi</span>

</code></pre><p>之后，我们如下使用 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a>添加用户 ravi 到文件 <code>/etc/vsftpd.userlist</code> 中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"ravi"</span> | tee -a /etc/vsftpd.userlist</span>
<span class="hljs-meta">#</span><span class="bash"> cat /etc/vsftpd.userlist</span>

</code></pre><p>9、 现在是时候测试我们上面的设置是否可以工作了。让我们使用匿名登录测试，我们可以从下面的截图看到匿名登录没有被允许。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:root)</span> : <span class="hljs-selector-tag">anonymous</span>
530 <span class="hljs-selector-tag">Permission</span> <span class="hljs-selector-tag">denied</span>.
<span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">failed</span>.
<span class="hljs-selector-tag">ftp</span>&gt;

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Test-Anonymous-FTP-Login.png"><img src="https://p0.ssl.qhimg.com/t01ed68699f8e01ebd1.png" alt="Test Anonymous FTP Login"></a></p>
<p><em>测试 FTP 匿名登录</em></p>
<p>10、 让我们也测试一下没有列在 <code>/etc/vsftpd.userlist</code> 中的用户是否有权限登录，下面截图是没有列入的情况：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:root)</span> : <span class="hljs-selector-tag">aaronkilik</span>
530 <span class="hljs-selector-tag">Permission</span> <span class="hljs-selector-tag">denied</span>.
<span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">failed</span>.
<span class="hljs-selector-tag">ftp</span>&gt;

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/FTP-User-Login-Failed.png"><img src="https://p0.ssl.qhimg.com/t01d4ac94c52611834f.png" alt="FTP User Login Failed"></a></p>
<p><em>FTP 用户登录失败</em></p>
<p>11、 现在最后测试一下列在 <code>/etc/vsftpd.userlist</code> 中的用户是否在登录后真的进入了他/她的家目录：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:root)</span> : <span class="hljs-selector-tag">ravi</span>
331 <span class="hljs-selector-tag">Please</span> <span class="hljs-selector-tag">specify</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">password</span>.
<span class="hljs-selector-tag">Password</span>:
230 <span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">successful</span>.
<span class="hljs-selector-tag">Remote</span> <span class="hljs-selector-tag">system</span> <span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">UNIX</span>.
<span class="hljs-selector-tag">Using</span> <span class="hljs-selector-tag">binary</span> <span class="hljs-selector-tag">mode</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">transfer</span> <span class="hljs-selector-tag">files</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">ls</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/FTP-User-Login.png"><img src="https://p0.ssl.qhimg.com/t01d7f09b1fba729859.png" alt="FTP User Login Successful"></a></p>
<p><em>用户成功登录</em></p>
<p>警告：使用 <code>allow_writeable_chroot=YES</code> 有一定的安全隐患，特别是用户具有上传权限或 shell 访问权限时。</p>
<p>只有当你完全知道你正做什么时才激活此选项。重要的是要注意，这些安全性影响并不是 vsftpd 特定的，它们适用于所有提供了将本地用户置于 chroot jail 中的 FTP 守护进程。</p>
<p>因此，我们将在下一节中看到一种更安全的方法来设置不同的不可写本地根目录。</p>
<h3><a href="#步骤-5-配置不同的-ftp-家目录"></a>步骤 5： 配置不同的 FTP 家目录</h3>
<p>12、 再次打开 vsftpd 配置文件，并将下面不安全的选项注释掉：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash">allow_writeable_chroot=YES</span>

</code></pre><p>接着为用户（<code>ravi</code>，你的可能不同）创建另外一个替代根目录，并将所有用户对该目录的可写权限移除：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir /home/ravi/ftp</span>
<span class="hljs-meta">#</span><span class="bash"> chown nobody:nobody /home/ravi/ftp</span>
<span class="hljs-meta">#</span><span class="bash"> chmod a-w /home/ravi/ftp</span>

</code></pre><p>13、 接下来，在用户存储他/她的文件的本地根目录下创建一个文件夹：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir /home/ravi/ftp/files</span>
<span class="hljs-meta">#</span><span class="bash"> chown ravi:ravi  /home/ravi/ftp/files</span>
<span class="hljs-meta">#</span><span class="bash"> chmod 0700 /home/ravi/ftp/files/</span>

</code></pre><p>接着在 vsftpd 配置文件中添加/修改这些选项：</p>
<pre><code class="hljs clean">user_sub_token=$USER         ### 在本地根目录下插入用户名
local_root=/home/$USER/ftp   ### 定义任何用户的本地根目录

</code></pre><p>保存并关闭文件。再说一次，有新的设置后，让我们重启服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart vsftpd</span>

</code></pre><p>14、 现在最后在测试一次查看用户本地根目录就是我们在他的家目录创建的 FTP 目录。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ftp</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>
<span class="hljs-selector-tag">Connected</span> <span class="hljs-selector-tag">to</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>  (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span>).
220 <span class="hljs-selector-tag">Welcome</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">TecMint</span><span class="hljs-selector-class">.com</span> <span class="hljs-selector-tag">FTP</span> <span class="hljs-selector-tag">service</span>.
<span class="hljs-selector-tag">Name</span> (192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-pseudo">:root)</span> : <span class="hljs-selector-tag">ravi</span>
331 <span class="hljs-selector-tag">Please</span> <span class="hljs-selector-tag">specify</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">password</span>.
<span class="hljs-selector-tag">Password</span>:
230 <span class="hljs-selector-tag">Login</span> <span class="hljs-selector-tag">successful</span>.
<span class="hljs-selector-tag">Remote</span> <span class="hljs-selector-tag">system</span> <span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">UNIX</span>.
<span class="hljs-selector-tag">Using</span> <span class="hljs-selector-tag">binary</span> <span class="hljs-selector-tag">mode</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">transfer</span> <span class="hljs-selector-tag">files</span>.
<span class="hljs-selector-tag">ftp</span>&gt; <span class="hljs-selector-tag">ls</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/FTP-User-Home-Directory-Login-Successful.png"><img src="https://p0.ssl.qhimg.com/t0153748da6c4de4e6a.png" alt="FTP User Home Directory Login Successful"></a></p>
<p><em>FTP 用户家目录登录成功</em></p>
<p>就是这样了！在本文中，我们介绍了如何在 CentOS 7 中安装、配置以及加密的 FTP 服务器，使用下面的评论栏给我们回复，或者分享关于这个主题的任何有用信息。</p>
<p><strong>建议阅读：</strong> [在 RHEL/CentOS 7 上安装 ProFTPD 服务器] <a href="https://linux.cn/article-8504-1.html">10</a></p>
<p>在下一篇文章中，我们还将向你介绍如何在 CentOS 7 中<a href="http://www.tecmint.com/secure-vsftpd-using-ssl-tls-on-centos/">保护使用 SSL/TLS</a>连接的 FTP 服务器，再此之前，请继续关注 TecMint。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一名 Linux 和 F.O.S.S 爱好者，即将从事 Linux 系统管理员和网页开发工作，他日前是 TecMint 技术网站的原创作者，非常喜欢使用电脑工作，坚信分享知识是一种美德。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/install-ftp-server-in-centos-7/">http://www.tecmint.com/install-ftp-server-in-centos-7/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
完全指南：如何在 CentOS 7 中安装、配置和安全加固 FTP 服务

## 原文链接
[https://www.zcfy.cc/article/how-to-install-configure-and-secure-ftp-server-in-centos-7-comprehensive-guide](https://www.zcfy.cc/article/how-to-install-configure-and-secure-ftp-server-in-centos-7-comprehensive-guide)

