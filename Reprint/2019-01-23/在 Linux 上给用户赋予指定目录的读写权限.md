---
title: '在 Linux 上给用户赋予指定目录的读写权限' 
date: 2019-01-23 2:30:08
hidden: true
slug: xsbpzfk6wui
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上给用户赋予指定目录的读写权限"></a>在 Linux 上给用户赋予指定目录的读写权限</h1>
<p>在上篇文章中我们向您展示了如何在 Linux 上<a href="https://linux.cn/article-8187-1.html">创建一个共享目录</a>。这次，我们会为您介绍如何将 Linux 上指定目录的读写权限赋予用户。</p>
<p>有两种方法可以实现这个目标：第一种是 <a href="http://www.tecmint.com/secure-files-using-acls-in-linux/">使用 ACL (访问控制列表)</a> ，第二种是<a href="http://www.tecmint.com/manage-users-and-groups-in-linux/">创建用户组来管理文件权限</a>，下面会一一介绍。</p>
<p>为了完成这个教程，我们将使用以下设置。</p>
<ul>
<li>操作系统：CentOS 7</li>
<li>测试目录：<code>/shares/project1/reports</code></li>
<li>测试用户：tecmint</li>
<li>文件系统类型：ext4</li>
</ul>
<p>请确认所有的命令都是使用 root 用户执行的，或者使用 <a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">sudo 命令</a> 来享受与之同样的权限。</p>
<p>让我们开始吧！下面，先使用 <code>mkdir</code> 命令来创建一个名为 <code>reports</code> 的目录。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mkdir -p /shares/project1/reports                   </span>

</code></pre><h3><a href="#使用-acl-来为用户赋予目录的读写权限"></a>使用 ACL 来为用户赋予目录的读写权限</h3>
<p>重要提示：打算使用此方法的话，您需要确认您的 Linux 文件系统类型（如 ext3 和 ext4, NTFS, BTRFS）支持 ACL。</p>
<p>1、 首先， 依照以下命令在您的系统中<a href="http://www.tecmint.com/find-linux-filesystem-type/">检查当前文件系统类型</a>，并且查看内核是否支持 ACL：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> df -T | awk <span class="hljs-string">'{print $1,$2,$NF}'</span> | grep <span class="hljs-string">"^/dev"</span></span>
<span class="hljs-meta">#</span><span class="bash"> grep -i acl /boot/config*</span>

</code></pre><p>从下方的截屏可以看到，文件系统类型是 <code>ext4</code>，并且从 <code>CONFIG_EXT4_FS_POSIX_ACL=y</code> 选项可以发现内核是支持 <strong>POSIX ACLs</strong> 的。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Check-Filesystem-Type-and-Kernel-ACL-Support.png"><img src="https://p0.ssl.qhimg.com/t0192382bf7ae7580c5.png" alt="Check Filesystem Type and Kernel ACL Support"></a></p>
<p><em>查看文件系统类型和内核的 ACL 支持。</em></p>
<p>2、 接下来，查看文件系统（分区）挂载时是否使用了 ACL 选项。</p>
<pre><code class="hljs gradle"># tune2fs -l <span class="hljs-regexp">/dev/</span>sda1 | <span class="hljs-keyword">grep</span> acl

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Check-Partition-ACL-Support.png"><img src="https://p0.ssl.qhimg.com/t017f8a5c6880db441f.png" alt="Check Partition ACL Support"></a></p>
<p><em>查看分区是否支持 ACL</em></p>
<p>通过上边的输出可以发现，默认的挂载项目中已经对 <strong>ACL</strong> 进行了支持。如果发现结果不如所愿，你可以通过以下命令对指定分区（此例中使用 <code>/dev/sda3</code>）开启 ACL 的支持。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mount -o remount,acl /</span>
<span class="hljs-meta">#</span><span class="bash"> tune2fs -o acl /dev/sda3</span>

</code></pre><p>3、 现在是时候指定目录 <code>reports</code> 的读写权限分配给名为 <code>tecmint</code> 的用户了，依照以下命令执行即可。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> getfacl /shares/project1/reports                 <span class="hljs-comment"># Check the default ACL settings for the directory </span></span>
<span class="hljs-meta">#</span><span class="bash"> setfacl -m user:tecmint:rw /shares/project1/reports     <span class="hljs-comment"># Give rw access to user tecmint </span></span>
<span class="hljs-meta">#</span><span class="bash"> getfacl /shares/project1/reports                  <span class="hljs-comment"># Check new ACL settings for the directory</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Give-Read-Write-Access-to-Directory-Using-ACL.png"><img src="https://p0.ssl.qhimg.com/t01d1e40599ddf4a666.png" alt="Give Read/Write Access to Directory Using ACL"></a></p>
<p><em>通过 ACL 对指定目录赋予读写权限</em></p>
<p>在上方的截屏中，通过输出结果的第二行 <code>getfacl</code> 命令可以发现，用户 <code>tecmint</code> 已经成功的被赋予了 <code>/shares/project1/reports</code> 目录的读写权限。</p>
<p>如果想要获取 ACL 列表的更多信息。可以在下方查看我们的其他指南。</p>
<ol>
<li><a href="http://www.tecmint.com/set-access-control-lists-acls-and-disk-quotas-for-users-groups/">如何使用访问控制列表（ACL）为用户/组设置磁盘配额</a></li>
<li><a href="http://www.tecmint.com/rhcsa-exam-configure-acls-and-mount-nfs-samba-shares/">如何使用访问控制列表（ACL）挂载网络共享</a></li>
</ol>
<p>现在我们来看看如何使用第二种方法来为目录赋予读写权限。</p>
<h3><a href="#使用用户组来为用户赋予指定目录的读写权限"></a>使用用户组来为用户赋予指定目录的读写权限</h3>
<p>1、 如果用户已经拥有了默认的用户组（通常组名与用户名相同），就可以简单的通过变更文件夹的所属用户组来完成。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chgrp tecmint /shares/project1/reports</span>

</code></pre><p>另外，我们也可以通过以下方法为多个用户（需要赋予指定目录读写权限的）新建一个用户组。如此一来，也就<a href="http://www.tecmint.com/create-a-shared-directory-in-linux/">创建了一个共享目录</a>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> groupadd projects</span>

</code></pre><p>2、 接下来将用户 <code>tecmint</code> 添加到 <code>projects</code> 组中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> usermod -aG projects tecmint        <span class="hljs-comment"># add user to projects</span></span>
<span class="hljs-meta">#</span><span class="bash"> groups tecmint                <span class="hljs-comment"># check users groups</span></span>

</code></pre><p>3、 将目录的所属用户组变更为 projects：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chgrp    projects /shares/project1/reports</span>

</code></pre><p>4、 现在，给组成员设置读写权限。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chmod -R 0760 /shares/projects/reports</span>
<span class="hljs-meta">#</span><span class="bash"> ls  -l /shares/projects/        <span class="hljs-comment">#check new permissions</span></span>

</code></pre><p>好了！这篇教程中，我们向您展示了如何在 Linux 中将指定目录的读写权限赋予用户。若有疑问，请在留言区中提问。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，未来的 Linux 系统管理员和网络开发人员，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/give-read-write-access-to-directory-in-linux/">http://www.tecmint.com/give-read-write-access-to-directory-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="http://www.mr-ping.com">Mr-Ping</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上给用户赋予指定目录的读写权限

## 原文链接
[https://www.zcfy.cc/article/assign-read-write-access-to-a-user-on-specific-directory-in-linux](https://www.zcfy.cc/article/assign-read-write-access-to-a-user-on-specific-directory-in-linux)

