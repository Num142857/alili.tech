---
title: '使用 chroot 监狱限制 SSH 用户访问指定目录' 
date: 2019-01-23 2:30:08
hidden: true
slug: yvq945u8sz
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-chroot-监狱限制-ssh-用户访问指定目录"></a>使用 chroot 监狱限制 SSH 用户访问指定目录</h1>
<p>将 <a href="http://www.tecmint.com/restrict-sftp-user-home-directories-using-chroot/">SSH 用户会话限制</a>访问到特定的目录内，特别是在 web 服务器上，这样做有多个原因，但最显而易见的是为了系统安全。为了锁定 SSH 用户在某个目录，我们可以使用 <strong>chroot</strong> 机制。</p>
<p>在诸如 Linux 之类的类 Unix 系统中更改 root（<strong>chroot</strong>）是将特定用户操作与其他 Linux 系统分离的一种手段；使用称为 <strong>chrooted 监狱</strong> 的新根目录更改当前运行的用户进程及其子进程的明显根目录。</p>
<p>在本教程中，我们将向你展示如何限制 SSH 用户访问 Linux 中指定的目录。注意，我们将以 root 用户身份运行所有命令，如果你以普通用户身份登录服务器，请使用 <a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">sudo 命令</a>。</p>
<h3><a href="#步骤-1创建-ssh-chroot-监狱"></a>步骤 1：创建 SSH chroot 监狱</h3>
<p>1、 使用 mkdir 命令开始创建 chroot 监狱：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir -p /home/<span class="hljs-built_in">test</span></span>

</code></pre><p>2、 接下来，根据 <code>sshd_config</code> 手册找到所需的文件，<code>ChrootDirectory</code> 选项指定在身份验证后要 chroot 到的目录的路径名。该目录必须包含支持用户会话所必需的文件和目录。</p>
<p>对于交互式会话，这需要至少一个 shell，通常为 <code>sh</code> 和基本的 <code>/dev</code> 节点，例如 <code>null</code>、<code>zero</code>、<code>stdin</code>、<code>stdout</code>、<code>stderr</code> 和 <code>tty</code> 设备：</p>
<pre><code class="hljs lua"># ls -l /dev/{null,zero,<span class="hljs-built_in">stdin</span>,<span class="hljs-built_in">stdout</span>,<span class="hljs-built_in">stderr</span>,<span class="hljs-built_in">random</span>,tty}

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Listing-Required-Files.png"><img src="https://p1.ssl.qhimg.com/t01ab36522a5eaf6824.png" alt="Listing Required Files"></a></p>
<p><em>列出所需文件</em></p>
<p>3、 现在，使用 <code>mknod</code> 命令创建 <code>/dev</code> 下的文件。在下面的命令中，<code>-m</code> 标志用来指定文件权限位，<code>c</code> 意思是字符文件，两个数字分别是文件指向的主要号和次要号。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir -p /home/<span class="hljs-built_in">test</span>/dev/        </span>
<span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">cd</span> /home/<span class="hljs-built_in">test</span>/dev/</span>
<span class="hljs-meta">#</span><span class="bash"> mknod -m 666 null c 1 3</span>
<span class="hljs-meta">#</span><span class="bash"> mknod -m 666 tty c 5 0</span>
<span class="hljs-meta">#</span><span class="bash"> mknod -m 666 zero c 1 5</span>
<span class="hljs-meta">#</span><span class="bash"> mknod -m 666 random c 1 8</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Create-Required-Files.png"><img src="https://p5.ssl.qhimg.com/t01ef74a85f98a42d15.png" alt="Create /dev and Required Files"></a></p>
<p><em>创建 /dev 和所需文件</em></p>
<p>4、 在此之后，在 chroot 监狱中设置合适的权限。注意 chroot 监狱和它的子目录以及子文件必须被 <code>root</code> 用户所有，并且对普通用户或用户组不可写：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chown root:root /home/<span class="hljs-built_in">test</span></span>
<span class="hljs-meta">#</span><span class="bash"> chmod 0755 /home/<span class="hljs-built_in">test</span></span>
<span class="hljs-meta">#</span><span class="bash"> ls -ld /home/<span class="hljs-built_in">test</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Set-Permission-on-Directory.png"><img src="https://p4.ssl.qhimg.com/t013413d9d812806248.png" alt="Set Permissions on Directory"></a></p>
<p><em>设置目录权限</em></p>
<h3><a href="#步骤-2为-ssh-chroot-监狱设置交互式-shell"></a>步骤 2：为 SSH chroot 监狱设置交互式 shell</h3>
<p>5、 首先，创建 <code>bin</code> 目录并复制 <code>/bin/bash</code> 到 <code>bin</code> 中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir -p /home/<span class="hljs-built_in">test</span>/bin</span>
<span class="hljs-meta">#</span><span class="bash"> cp -v /bin/bash /home/<span class="hljs-built_in">test</span>/bin/</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Copy-Bin-Files.png"><img src="https://p3.ssl.qhimg.com/t014484900c34cb8e1d.png" alt="Copy Files to bin Directory"></a></p>
<p><em>复制文件到 bin 目录中</em></p>
<p>6、 现在，识别 bash 所需的共享库，如下所示复制它们到 <code>lib64</code> 中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> ldd /bin/bash</span>
<span class="hljs-meta">#</span><span class="bash"> mkdir -p /home/<span class="hljs-built_in">test</span>/lib64</span>
<span class="hljs-meta">#</span><span class="bash"> cp -v /lib64/{libtinfo.so.5,libdl.so.2,libc.so.6,ld-linux-x86-64.so.2} /home/<span class="hljs-built_in">test</span>/lib64/</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Copy-Shared-Library-Files.png"><img src="https://p5.ssl.qhimg.com/t016fc22cb6f943b284.png" alt="Copy Shared Library Files"></a></p>
<p><em>复制共享库文件</em></p>
<h3><a href="#步骤-3创建并配置-ssh-用户"></a>步骤 3：创建并配置 SSH 用户</h3>
<p>7、 现在，使用 <a href="http://www.tecmint.com/add-users-in-linux/">useradd 命令</a>创建 SSH 用户，并设置安全密码：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd tecmint</span>
<span class="hljs-meta">#</span><span class="bash"> passwd tecmint</span>

</code></pre><p>8、 创建 chroot 监狱通用配置目录 <code>/home/test/etc</code> 并复制已更新的账号文件（<code>/etc/passwd</code> 和 <code>/etc/group</code>）到这个目录中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir /home/<span class="hljs-built_in">test</span>/etc</span>
<span class="hljs-meta">#</span><span class="bash"> cp -vf /etc/{passwd,group} /home/<span class="hljs-built_in">test</span>/etc/</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Copy-Password-Files.png"><img src="https://p2.ssl.qhimg.com/t01d37efb3ea2d96feb.png" alt="Copy Password Files"></a></p>
<p><em>复制密码文件</em></p>
<p>注意：每次向系统添加更多 SSH 用户时，都需要将更新的帐户文件复制到 <code>/home/test/etc</code> 目录中。</p>
<h3><a href="#步骤-4配置-ssh-来使用-chroot-监狱"></a>步骤 4：配置 SSH 来使用 chroot 监狱</h3>
<p>9、 现在打开 <code>sshd_config</code> 文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vi /etc/ssh/sshd_config</span>

</code></pre><p>在此文件中添加或修改下面这些行。</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># 定义要使用 chroot 监狱的用户</span>
Match<span class="hljs-built_in"> User </span>tecmint
<span class="hljs-comment"># 指定 chroot 监狱</span>
ChrootDirectory /home/test

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Configure-SSH-Chroot-Jail.png"><img src="https://p3.ssl.qhimg.com/t015d3a14d3a28e5a9e.png" alt="Configure SSH Chroot Jail"></a></p>
<p><em>配置 SSH chroot 监狱</em></p>
<p>保存文件并退出，重启 sshd 服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart sshd</span>
或者
<span class="hljs-meta">#</span><span class="bash"> service sshd restart</span>

</code></pre><h3><a href="#步骤-5测试-ssh-的-chroot-监狱"></a>步骤 5：测试 SSH 的 chroot 监狱</h3>
<p>10、 这次，测试 chroot 监狱的设置是否如希望的那样成功了：</p>
<pre><code class="hljs haml"># ssh tecmint@192.168.0.10
-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ ls
</span>-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ date
</span>-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ uname
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Testing-SSH-User-Chroot-Jail.png"><img src="https://p3.ssl.qhimg.com/t01697f701b9fef49c8.png" alt="Testing SSH User Chroot Jail"></a></p>
<p><em>测试 SSH 用户 chroot 监狱</em></p>
<p>从上面的截图上来看，我们可以看到 SSH 用户被锁定在了 chroot 监狱中，并且不能使用任何外部命令如（<code>ls</code>、<code>date</code>、<code>uname</code> 等等）。</p>
<p>用户只可以执行 <code>bash</code> 以及它内置的命令（比如：<code>pwd</code>、<code>history</code>、<code>echo</code> 等等）：</p>
<pre><code class="hljs haml"># ssh tecmint@192.168.0.10
-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ pwd
</span>-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ echo <span class="hljs-string">"Tecmint - Fastest Growing Linux Site"</span>
</span>-<span class="ruby">bash-<span class="hljs-number">4.1</span>$ history
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/SSH-Builtin-Commands.png"><img src="https://p4.ssl.qhimg.com/t01789761b5f55d577e.png" alt="SSH Built-in Commands"></a></p>
<p><em>SSH 内置命令</em></p>
<h3><a href="#步骤6-创建用户的主目录并添加-linux-命令"></a>步骤6： 创建用户的主目录并添加 Linux 命令</h3>
<p>11、 从前面的步骤中，我们可以看到用户被锁定在了 root 目录，我们可以为 SSH 用户创建一个主目录（以及为所有将来的用户这么做）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir -p /home/<span class="hljs-built_in">test</span>/home/tecmint</span>
<span class="hljs-meta">#</span><span class="bash"> chown -R tecmint:tecmint /home/<span class="hljs-built_in">test</span>/home/tecmint</span>
<span class="hljs-meta">#</span><span class="bash"> chmod -R 0700 /home/<span class="hljs-built_in">test</span>/home/tecmint</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Create-SSH-User-Home-Directory.png"><img src="https://p4.ssl.qhimg.com/t01857d768e870c4090.png" alt="Create SSH User Home Directory"></a></p>
<p><em>创建 SSH 用户主目录</em></p>
<p>12、 接下来，在 <code>bin</code> 目录中安装几个用户命令，如 <code>ls</code>、<code>date</code>、<code>mkdir</code>：</p>
<pre><code class="hljs armasm"># <span class="hljs-meta">cp</span> -v /<span class="hljs-keyword">bin/ls </span>/home/test/<span class="hljs-keyword">bin/
</span># <span class="hljs-meta">cp</span> -v /<span class="hljs-keyword">bin/date </span>/home/test/<span class="hljs-keyword">bin/
</span># <span class="hljs-meta">cp</span> -v /<span class="hljs-keyword">bin/mkdir </span>/home/test/<span class="hljs-keyword">bin/
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Add-Commands-to-SSH-User.png"><img src="https://p4.ssl.qhimg.com/t01630fa75af9e0e5c5.png" alt="Add Commands to SSH User"></a></p>
<p><em>向 SSH 用户添加命令</em></p>
<p>13、 接下来，检查上面命令的共享库并将它们移到 chroot 监狱的库目录中：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># ldd /bin/ls</span>
<span class="hljs-comment"># cp -v /lib64/{libselinux.so.1,libcap.so.2,libacl.so.1,libc.so.6,libpcre.so.1,libdl.so.2,ld-linux-x86-64.so.2,libattr.so.1,libpthread.so.0} /home/test/lib64/</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Copy-Shared-Libraries.png"><img src="https://p1.ssl.qhimg.com/t018184bead2d8766b7.png" alt="Copy Shared Libraries"></a></p>
<p><em>复制共享库</em></p>
<h3><a href="#步骤-7测试-sftp-的-用-chroot-监狱"></a>步骤 7：测试 sftp 的 用 chroot 监狱</h3>
<p>14、 最后用 sftp 做一个测试；测试你先前安装的命令是否可用。</p>
<p>在 <code>/etc/ssh/sshd_config</code> 中添加下面的行：</p>
<pre><code class="hljs vala"><span class="hljs-meta"># 启用 sftp 的 chrooted 监狱 </span>
ForceCommand <span class="hljs-keyword">internal</span>-sftp

</code></pre><p>保存并退出文件。接下来重启 sshd 服务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart sshd</span>
或者
<span class="hljs-meta">#</span><span class="bash"> service sshd restart</span>

</code></pre><p>15、 现在使用 ssh 测试，你会得到下面的错误：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">ssh</span> <span class="hljs-selector-tag">tecmint</span>@<span class="hljs-keyword">192</span>.<span class="hljs-keyword">168</span>.<span class="hljs-keyword">0</span>.<span class="hljs-keyword">10</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Test-SSH-Chroot-Jail.png"><img src="https://p3.ssl.qhimg.com/t013165228ea9214efb.png" alt="Test SSH Chroot Jail"></a></p>
<p><em>测试 SSH Chroot 监狱</em></p>
<p>试下使用 sftp：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">sftp</span> <span class="hljs-selector-tag">tecmint</span>@<span class="hljs-keyword">192</span>.<span class="hljs-keyword">168</span>.<span class="hljs-keyword">0</span>.<span class="hljs-keyword">10</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Testing-sFTP-SSH-User.png"><img src="https://p4.ssl.qhimg.com/t019b2c1b0eec6005de.png" alt="Testing sFTP SSH User"></a></p>
<p><em>测试 sFTP SSH 用户</em></p>
<p><strong>建议阅读：</strong> <a href="http://www.tecmint.com/restrict-sftp-user-home-directories-using-chroot/">使用 chroot 监狱将 sftp 用户限制在主目录中</a>。</p>
<p>就是这样了！在文本中，我们向你展示了如何在 Linux 中限制 ssh 用户到指定的目录中（ chroot 监狱）。请在评论栏中给我们提供你的想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一个 Linux 及 F.O.S.S 热衷者，即将成为 Linux 系统管理员、web 开发者，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/restrict-ssh-user-to-directory-using-chrooted-jail/">http://www.tecmint.com/restrict-ssh-user-to-directory-using-chrooted-jail/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 chroot 监狱限制 SSH 用户访问指定目录

## 原文链接
[https://www.zcfy.cc/article/restrict-ssh-user-access-to-certain-directory-using-chrooted-jail](https://www.zcfy.cc/article/restrict-ssh-user-access-to-certain-directory-using-chrooted-jail)

