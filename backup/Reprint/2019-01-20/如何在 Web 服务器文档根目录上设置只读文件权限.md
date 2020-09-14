---
title: '如何在 Web 服务器文档根目录上设置只读文件权限' 
date: 2019-01-20 2:30:11
hidden: true
slug: go2lf5b98r7
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-web-服务器文档根目录上设置只读文件权限"></a>如何在 Web 服务器文档根目录上设置只读文件权限</h1>
<p><strong>Q：如何对我存放在 <code>/var/www/html/</code> 目录中的所有文件设置只读权限？</strong></p>
<p>你可以使用 <code>chmod</code> 命令对 Linux/Unix/macOS/OS X/*BSD 操作系统上的所有文件来设置只读权限。这篇文章介绍如何在 Linux/Unix 的 web 服务器（如 Nginx、 Lighttpd、 Apache 等）上来设置只读文件权限。</p>
<p><a href="https://www.cyberciti.biz/media/new/faq/2012/04/linux-unix-set-read-only-file-system-permission-for-apache-nginx.jpg"><img src="http://p0.qhimg.com/t0178f57b5c2822901a.jpg" alt="Proper read-only permissions for Linux/Unix Nginx/Apache web server's directory"></a></p>
<h3><a href="#如何设置文件为只读模式"></a>如何设置文件为只读模式</h3>
<p>语法为:</p>
<pre><code class="hljs clean">### 仅针对文件 ###
chmod <span class="hljs-number">0444</span> /var/www/html<span class="hljs-comment">/*
chmod 0444 /var/www/html/*.php

</span></code></pre><h3><a href="#如何设置目录为只读模式"></a>如何设置目录为只读模式</h3>
<p>语法为：</p>
<pre><code class="hljs dts"><span class="hljs-meta">### 仅针对目录 ###</span>
chmod <span class="hljs-number">0444</span> <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span>
chmod <span class="hljs-number">0444</span> <span class="hljs-meta-keyword">/path/</span>to<span class="hljs-meta-keyword">/your/</span>dir/
<span class="hljs-meta"># ***************************************************************************</span>
<span class="hljs-meta"># 假如 web 服务器的用户/用户组是 www-data，文件拥有者是 ftp-data 用户/用户组</span>
<span class="hljs-meta"># ***************************************************************************</span>
<span class="hljs-meta"># 设置目录所有文件为只读</span>
chmod -R <span class="hljs-number">0444</span> <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span>
<span class="hljs-meta"># 设置文件/目录拥有者为 ftp-data</span>
chown -R ftp-data:ftp-data <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span>
<span class="hljs-meta"># 所有目录和子目录的权限为 0445 （这样 web 服务器的用户或用户组就可以读取我们的文件）</span>
find <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span> -type d -print0 | xargs <span class="hljs-number">-0</span> -<span class="hljs-class">I </span>{} chmod <span class="hljs-number">0445</span> <span class="hljs-string">"{}"</span>

</code></pre><p>找到所有 <code>/var/www/html</code> 下的所有文件（包括子目录），键入：</p>
<pre><code class="hljs clean">### 仅对文件有效 ###
find /var/www/html -type f -iname <span class="hljs-string">"*"</span> -print0 | xargs -I {} <span class="hljs-number">-0</span> chmod <span class="hljs-number">0444</span> {}

</code></pre><p>然而，你需要在 <code>/var/www/html</code> 目录及其子目录上设置只读和执行权限，如此才能让 web 服务器能够访问根目录，键入：</p>
<pre><code class="hljs clean">### 仅对目录有效 ###
find /var/www/html -type d -iname <span class="hljs-string">"*"</span> -print0 | xargs -I {} <span class="hljs-number">-0</span> chmod <span class="hljs-number">0544</span> {}

</code></pre><h3><a href="#警惕写权限"></a>警惕写权限</h3>
<p>请注意在 <code>/var/www/html/</code> 目录上的写权限会允许任何人删除文件或添加新文件。也就是说，你可能需要设置一个只读权限给 <code>/var/www/html/</code> 目录本身。</p>
<pre><code class="hljs clean">### web根目录只读 ###
chmod <span class="hljs-number">0555</span> /var/www/html

</code></pre><p>在某些情况下，根据你的设置要求，你可以改变文件的属主和属组来设置严格的权限。</p>
<pre><code class="hljs clean">### 如果 /var/www/html 目录的拥有人是普通用户，你可以设置拥有人为：root:root 或 httpd:httpd (推荐) ###
chown -R root:root /var/www/html/

### 确保 apache 拥有 /var/www/html/ ###
chown -R apache:apache /var/www/html/

</code></pre><h3><a href="#关于-nfs-导出目录"></a>关于 NFS 导出目录</h3>
<p>你可以在 <code>/etc/exports</code> 文件中指定哪个目录应该拥有<a href="https://www.cyberciti.biz//www.cyberciti.biz/faq/centos-fedora-rhel-nfs-v4-configuration/">只读或者读写权限</a> 。这个文件定义各种各样的共享在 NFS 服务器和他们的权限。如：</p>
<pre><code class="hljs lsl"># 对任何人只读权限
/var/www/html *(ro,sync) 

# 对<span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.10</span>(upload.example.com)客户端读写权限访问
/var/www/html <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.10</span>(rw,sync)

</code></pre><h3><a href="#关于用于-ms-windows客户端的-sambacifs只读共享"></a>关于用于 MS-Windows客户端的 Samba（CIFS）只读共享</h3>
<p>要以只读共享 <code>sales</code>，更新 <code>smb.conf</code>，如下：</p>
<pre><code class="hljs sql">[sales]
<span class="hljs-keyword">comment</span> = Sales <span class="hljs-keyword">Data</span>
<span class="hljs-keyword">path</span> = /<span class="hljs-keyword">export</span>/cifs/sales
<span class="hljs-keyword">read</span> <span class="hljs-keyword">only</span> = Yes
guest ok = Yes

</code></pre><h3><a href="#关于文件系统表fstab"></a>关于文件系统表（fstab）</h3>
<p>你可以在 Unix/Linux 上的 <code>/etc/fstab</code> 文件中配置挂载某些文件为只读模式。</p>
<p>你需要有专用分区，不要设置其他系统分区为只读模式。</p>
<p>如下在 <code>/etc/fstab</code> 文件中设置 <code>/srv/html</code> 为只读模式。</p>
<pre><code class="hljs awk"><span class="hljs-regexp">/dev/</span>sda6 <span class="hljs-regexp">/srv/</span>html ext4 ro <span class="hljs-number">1</span> <span class="hljs-number">1</span>

</code></pre><p>你可以使用 <code>mount</code> 命令<a href="https://www.cyberciti.biz/faq/howto-freebsd-remount-partition/">重新挂载分区为只读模式</a>（使用 root 用户）</p>
<pre><code class="hljs gradle"># mount -o remount,ro <span class="hljs-regexp">/dev/</span>sda6 <span class="hljs-regexp">/srv/</span>html

</code></pre><p>或者</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mount -o remount,ro /srv/html</span>

</code></pre><p>上面的命令会尝试重新挂载已挂载的文件系统到 <code>/srv/html</code>上。这是改变文件系统挂载标志的常用方法，特别是让只读文件改为可写的。这种方式不会改变设备或者挂载点。让文件变得再次可写,键入：</p>
<pre><code class="hljs gradle"># mount -o remount,rw <span class="hljs-regexp">/dev/</span>sda6 <span class="hljs-regexp">/srv/</span>html

</code></pre><p>或</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mount -o remount,rw /srv/html</span>

</code></pre><h3><a href="#linuxchattr-命令"></a>Linux：chattr 命令</h3>
<p>你可以在 Linux 文件系统上使用 <code>chattr</code> 命令<a href="https://www.cyberciti.biz/tips/linux-password-trick.html">改变文件属性为只读</a>，如：</p>
<pre><code class="hljs dts">chattr +i <span class="hljs-meta-keyword">/path/</span>to/file.php
chattr +i <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span>

<span class="hljs-meta"># 查找任何在/var/www/html下的文件并设置为只读#</span>
find <span class="hljs-meta-keyword">/var/</span>www/html -iname <span class="hljs-string">"*"</span> -print0 | xargs -<span class="hljs-class">I </span>{} <span class="hljs-number">-0</span> chattr +<span class="hljs-class">i </span>{}

</code></pre><p>通过提供 <code>-i</code> 选项可删除只读属性：</p>
<pre><code class="hljs stylus">chattr -<span class="hljs-selector-tag">i</span> /path/to/file<span class="hljs-selector-class">.php</span>

</code></pre><p>FreeBSD、Mac OS X 和其他 BSD Unix 用户可使用<a href="https://www.cyberciti.biz/tips/howto-write-protect-file-with-immutable-bit.html"><code>chflags</code>命令</a>：</p>
<pre><code class="hljs clean">### 设置只读 ##
chflags schg /path/to/file.php

### 删除只读 ##
chflags noschg /path/to/file.php

</code></pre><hr>
<p>via: <a href="https://www.cyberciti.biz/faq/howto-set-readonly-file-permission-in-linux-unix/">https://www.cyberciti.biz/faq/howto-set-readonly-file-permission-in-linux-unix/</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/yizhuoyan">yizhuoyan</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Web 服务器文档根目录上设置只读文件权限

## 原文链接
[https://www.zcfy.cc/article/how-to-set-readonly-file-permissions-on-linux-unix-web-server-documentroot](https://www.zcfy.cc/article/how-to-set-readonly-file-permissions-on-linux-unix-web-server-documentroot)

