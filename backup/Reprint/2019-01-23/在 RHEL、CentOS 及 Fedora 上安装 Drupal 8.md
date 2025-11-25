---
title: '在 RHEL、CentOS 及 Fedora 上安装 Drupal 8' 
date: 2019-01-23 2:30:08
hidden: true
slug: 1pzzfeqcwcii
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-rhelcentos-及-fedora-上安装-drupal-8"></a>在 RHEL、CentOS 及 Fedora 上安装 Drupal 8</h1>
<p><strong>Drupal</strong> 是一个开源，灵活，高度可拓展和安全的内容管理系统Content Management System（CMS），使用户轻松的创建网站。</p>
<p>它可以使用模块拓展，使用户将内容管理转换为强大的数字解决方案。</p>
<p><strong>Drupal</strong> 运行在诸如 Apache、IIS、Lighttpd、Cherokee、Nginx 的 Web 服务器上，后端数据库可以使用 MySQL、MongoDB、MariaDB、PostgreSQL、MSSQL Server。</p>
<p>在这篇文章中， 我们会展示在 RHEL 7/6、CentOS 7/6 和 Fedora 20-25 发行版上使用 LAMP 架构，如何手动安装和配置 Drupal 8。</p>
<h4><a href="#drupal-需求"></a>Drupal 需求：</h4>
<ol>
<li><strong>Apache 2.x</strong> （推荐）</li>
<li><strong>PHP 5.5.9</strong> 或 更高 （推荐 PHP 5.5）</li>
<li><strong>MySQL 5.5.3</strong> 或 <strong>MariaDB 5.5.20</strong> 与 PHP 数据对象（PDO） 支持</li>
</ol>
<p>安装过程中，我使用 <code>drupal.tecmint.com</code> 作为网站主机名，IP 地址为 <code>192.168.0.104</code>。你的环境也许与这些设置不同，因此请适当做出更改。</p>
<h3><a href="#步骤-1安装-apache-web-服务器"></a>步骤 1：安装 Apache Web 服务器</h3>
<p>1、 首先我们从官方仓库开始安装 Apache Web 服务器。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install httpd</span>

</code></pre><p>2、 安装完成后，服务开始是被禁用的，因此我们需要手动启动它，同时让它下次系统启动时自动启动，如下：</p>
<pre><code class="hljs shell">-------------  通过 SystemD - CentOS/RHEL 7 和 Fedora 22+ -------------------
<span class="hljs-meta">#</span><span class="bash"> systemctl start httpd </span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> httpd</span>

-------------  通过 SysVInit - CentOS/RHEL 6 和 Fedora ----------------------
<span class="hljs-meta">#</span><span class="bash"> service httpd start</span>
<span class="hljs-meta">#</span><span class="bash"> chkconfig --level 35 httpd on</span>

</code></pre><p>3、 接下来，为了允许通过 <strong>HTTP</strong> 和 <strong>HTTPS</strong> 访问 Apache 服务，我们必须打开 <strong>HTTPD</strong> 守护进程正在监听的 <strong>80</strong> 和 <strong>443</strong> 端口，如下所示：</p>
<pre><code class="hljs shell">------------ 通过 Firewalld - CentOS/RHEL 7 and Fedora 22+ ------------- 
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --permanent --zone=public --add-service=http</span>
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --permanent --zone=public --add-service=https</span>
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --reload</span>

------------ 通过 IPtables - CentOS/RHEL 6 and Fedora 22+ ------------- 
<span class="hljs-meta">#</span><span class="bash"> iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT</span>
<span class="hljs-meta">#</span><span class="bash"> iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT</span>
<span class="hljs-meta">#</span><span class="bash"> service iptables save</span>
<span class="hljs-meta">#</span><span class="bash"> service iptables restart</span>

</code></pre><p>4、 现在验证 Apache 是否正常工作， 打开浏览器在地址栏中输入 <code>http://server_IP</code>， 输入你的服务器 IP 地址， 默认 Apache2 页面应出现，如下面截图所示：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Apache-Default-Page.png"><img src="https://p5.ssl.qhimg.com/t01d06c34ee5dc96952.png" alt="Apache 默认页面"></a></p>
<p><em>Apache 默认页面</em></p>
<h3><a href="#步骤-2-安装-apache-php-支持"></a>步骤 2： 安装 Apache PHP 支持</h3>
<p>5、 接下来，安装 PHP 和 PHP 所需模块。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install php php-mbstring php-gd php-xml php-pear php-fpm php-mysql php-pdo php-opcache</span>

</code></pre><p><strong>重要</strong>: 假如你想要安装 <strong>PHP7</strong>， 你需要增加以下仓库：<strong>EPEL</strong> 和 <strong>Webtactic</strong> 才可以使用 yum 安装 PHP7.0：</p>
<pre><code class="hljs sqf">------------- Install PHP <span class="hljs-number">7</span> <span class="hljs-built_in">in</span> CentOS/RHEL <span class="hljs-built_in">and</span> Fedora ------------- 
<span class="hljs-meta"># rpm -Uvh https:<span class="hljs-comment">//dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="hljs-meta"># rpm -Uvh https:<span class="hljs-comment">//mirror.webtatic.com/yum/el7/webtatic-release.rpm</span></span>
<span class="hljs-meta"># yum install php70w php70w-opcache php70w-mbstring php70w-gd php70w-xml php70w-pear php70w-fpm php70w-mysql php70w-pdo</span>

</code></pre><p>6、 接下来，要从浏览器得到关于 PHP 安装和配置完整信息，使用下面命令在 Apache 文档根目录 （<code>/var/www/html</code>） 创建一个 <code>info.php</code> 文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"&lt;?php  phpinfo(); ?&gt;"</span> &gt; /var/www/html/info.php</span>

</code></pre><p>然后重启 HTTPD 服务器 ，在浏览器地址栏输入 <code>http://server_IP/info.php</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart httpd</span>
或
<span class="hljs-meta">#</span><span class="bash"> service httpd restart</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/PHP-Information.png"><img src="https://p0.ssl.qhimg.com/t011eeba0074df81ef8.png" alt="验证 PHP 信息"></a></p>
<p><em>验证 PHP 信息</em></p>
<h3><a href="#步骤-3-安装和配置-mariadb-数据库"></a>步骤 3: 安装和配置 MariaDB 数据库</h3>
<p>7、 请知晓， <strong>Red Hat Enterprise Linux/CentOS 7.0</strong> 从支持 <strong>MySQL</strong> 转为了 <strong>MariaDB</strong> 作为默认数据库管理系统。</p>
<p>要安装 <strong>MariaDB</strong> 数据库， 你需要添加 <a href="https://downloads.mariadb.org/mariadb/repositories/#mirror=Fibergrid&amp;distro=CentOS">官方 MariaDB 库</a> 到 <code>/etc/yum.repos.d/MariaDB.repo</code> 中，如下所示。</p>
<pre><code class="hljs ini"><span class="hljs-section">[mariadb]</span>
<span class="hljs-attr">name</span> = MariaDB
<span class="hljs-attr">baseurl</span> = http://yum.mariadb.org/<span class="hljs-number">10.1</span>/centos7-amd64
<span class="hljs-attr">gpgkey</span>=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
<span class="hljs-attr">gpgcheck</span>=<span class="hljs-number">1</span>

</code></pre><p>当仓库文件准备好后，你可以像这样安装 MariaDB：</p>
<pre><code class="hljs armasm"># yum install <span class="hljs-keyword">mariadb-server </span><span class="hljs-keyword">mariadb
</span>
</code></pre><p>8、 当 MariaDB 数据库安装完成，启动数据库的守护进程，同时使它能够在下次启动后自动启动。</p>
<pre><code class="hljs shell">------------- 通过 SystemD - CentOS/RHEL 7 and Fedora 22+ ------------- 
<span class="hljs-meta">#</span><span class="bash"> systemctl start mariadb</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> mariadb</span>
------------- 通过 SysVInit - CentOS/RHEL 6 and Fedora ------------- 
<span class="hljs-meta">#</span><span class="bash"> service mysqld start</span>
<span class="hljs-meta">#</span><span class="bash"> chkconfig --level 35 mysqld on</span>

</code></pre><p>9、 然后运行 <code>mysql_secure_installation</code> 脚本去保护数据库（设置 root 密码， 禁用远程登录，移除测试数据库并移除匿名用户），如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> mysql_secure_installation</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Mysql-Secure-Installation.png"><img src="https://p2.ssl.qhimg.com/t0151f8b32a562f63d1.png" alt="Mysql安全安装"></a></p>
<p><em>MySQL 安全安装</em></p>
<h3><a href="#步骤-4-在-centos-中安装和配置-drupal-8"></a>步骤 4： 在 CentOS 中安装和配置 Drupal 8</h3>
<p>10、 这里我们使用 <a href="http://www.tecmint.com/10-wget-command-examples-in-linux/">wget 命令</a> <a href="https://www.drupal.org/download">下载最新版本 Drupal</a>（例如 8.2.6），如果你没有安装 wget 和 gzip 包 ，请使用下面命令安装它们：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install wget gzip</span>
<span class="hljs-meta">#</span><span class="bash"> wget -c https://ftp.drupal.org/files/projects/drupal-8.2.6.tar.gz</span>

</code></pre><p>11、 之后，<a href="http://www.tecmint.com/extract-tar-files-to-specific-or-different-directory-in-linux/">解压 tar 文件</a> 并移动 Drupal 目录到 Apache 文档根目录（<code>/var/www/html</code>）。</p>
<pre><code class="hljs lsl"># tar -zxvf drupal<span class="hljs-number">-8.2</span><span class="hljs-number">.6</span>.tar.gz
# mv drupal<span class="hljs-number">-8.2</span><span class="hljs-number">.6</span> /var/www/html/drupal

</code></pre><p>12、 然后，依据 <code>/var/www/html/drupal/sites/default</code> 目录下的示例设置文件 <code>default.settings.php</code>，创建设置文件 <code>settings.php</code>，然后给 Drupal 站点目录设置适当权限，包括子目录和文件，如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">cd</span> /var/www/html/drupal/sites/default/</span>
<span class="hljs-meta">#</span><span class="bash"> cp default.settings.php settings.php</span>
<span class="hljs-meta">#</span><span class="bash"> chown -R apache:apache /var/www/html/drupal/</span>

</code></pre><p>13、 更重要的是在 <code>/var/www/html/drupal/sites/</code> 目录设置 <strong>SElinux</strong> 规则，如下:</p>
<pre><code class="hljs gradle"># chcon -R -t httpd_sys_content_rw_t <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/html/</span>drupal<span class="hljs-regexp">/sites/</span>

</code></pre><p>14、 现在我们必须为 Drupal 站点去创建一个用于管理的数据库和用户。</p>
<pre><code class="hljs livecodeserver"><span class="hljs-comment"># mysql -u root -p</span>
Enter password: 
MySQL Shell
Welcome <span class="hljs-built_in">to</span> <span class="hljs-keyword">the</span> MariaDB monitor.  Commands <span class="hljs-function"><span class="hljs-keyword">end</span> <span class="hljs-title">with</span> ; <span class="hljs-title">or</span> \<span class="hljs-title">g</span>.</span>
Your MySQL connection id is <span class="hljs-number">12</span>
Server <span class="hljs-built_in">version</span>: <span class="hljs-number">5.1</span><span class="hljs-number">.73</span> Source distribution
Copyright (c) <span class="hljs-number">2000</span>, <span class="hljs-number">2016</span>, Oracle, MariaDB Corporation Ab <span class="hljs-keyword">and</span> others.
Type <span class="hljs-string">'help;'</span> <span class="hljs-keyword">or</span> <span class="hljs-string">'\h'</span> <span class="hljs-keyword">for</span> help. Type <span class="hljs-string">'\c'</span> <span class="hljs-built_in">to</span> <span class="hljs-built_in">clear</span> <span class="hljs-keyword">the</span> current input statement.
**MySQL [(<span class="hljs-literal">none</span>)]&gt; <span class="hljs-built_in">create</span> database drupal;**
Query OK, <span class="hljs-number">1</span> row affected (<span class="hljs-number">0.00</span> <span class="hljs-built_in">sec</span>)
**MySQL [(<span class="hljs-literal">none</span>)]&gt; <span class="hljs-built_in">create</span> user ravi@localhost identified <span class="hljs-keyword">by</span> <span class="hljs-string">'tecmint123'</span>;**
Query OK, <span class="hljs-number">0</span> rows affected (<span class="hljs-number">0.00</span> <span class="hljs-built_in">sec</span>)
**MySQL [(<span class="hljs-literal">none</span>)]&gt; grant all <span class="hljs-keyword">on</span> <span class="hljs-title">drupal</span>.* <span class="hljs-title">to</span> <span class="hljs-title">ravi</span>@<span class="hljs-title">localhost</span>;**
Query OK, <span class="hljs-number">0</span> rows affected (<span class="hljs-number">0.00</span> <span class="hljs-built_in">sec</span>)
**MySQL [(<span class="hljs-literal">none</span>)]&gt; flush privileges;**
Query OK, <span class="hljs-number">0</span> rows affected (<span class="hljs-number">0.00</span> <span class="hljs-built_in">sec</span>)
**MySQL [(<span class="hljs-literal">none</span>)]&gt; exit**
Bye

</code></pre><p>15、 最后，打开地址: <code>http://server_IP/drupal/</code> 开始网站的安装，选择你首选的安装语言然后点击保存以继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Installation-Language.png"><img src="https://p4.ssl.qhimg.com/t01816e9ed82d1e863c.png" alt="Drupal 安装语言"></a></p>
<p><em>Drupal 安装语言</em></p>
<p>16、 下一步，选择安装配置文件，选择 Standard（标准），点击保存继续。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Installation-Profile.png"><img src="https://p0.ssl.qhimg.com/t012568472aaa653cd6.png" alt="Drupal 安装配置文件"></a></p>
<p><em>Drupal 安装配置文件</em></p>
<p>17、 在进行下一步之前查看并通过需求审查并启用 <code>Clean URL</code>。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Verify-Drupal-Requirements.png"><img src="https://p3.ssl.qhimg.com/t01f479cab3313aad95.png" alt="验证 Drupal 需求"></a></p>
<p><em>验证 Drupal 需求</em></p>
<p>现在在你的 Apache 配置下启用 Clean URL 的 Drupal。</p>
<pre><code class="hljs vim"># <span class="hljs-keyword">vi</span> /etc/httpd/<span class="hljs-keyword">conf</span>/httpd.<span class="hljs-keyword">conf</span>

</code></pre><p>确保为默认根文档目录 <code>/var/www/html</code> 设置 <code>AllowOverride All</code>，如下图所示：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Enable-Clean-URL-in-Drupal.png"><img src="https://p5.ssl.qhimg.com/t013645ad8321c0f814.png" alt="在 Drupal 中启用 Clean URL"></a></p>
<p><em>在 Drupal 中启用 Clean URL</em></p>
<p>18、 当你为 Drupal 启用 Clean URL，刷新页面从下面界面执行数据库配置，输入 Drupal 站点数据库名，数据库用户和数据库密码。</p>
<p>当填写完所有信息点击<strong>保存并继续</strong>。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Database-Configuration.png"><img src="https://p4.ssl.qhimg.com/t0195c95fac912b0388.png" alt="Drupal 数据库配置"></a></p>
<p><em>Drupal 数据库配置</em></p>
<p>若上述设置正确，Drupal 站点安装应该完成了，如下图界面。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Installation.png"><img src="https://p5.ssl.qhimg.com/t012c41f5f23a86c3f0.png" alt="Drupal 安装"></a></p>
<p><em>Drupal 安装</em></p>
<p>19、 接下来配置站点为下面的设置(使用适用你的情况的值):</p>
<ul>
<li><strong>站点名称</strong>  – TecMint Drupal Site</li>
<li><strong>站点邮箱地址</strong>  – <a href="mailto:admin@tecmint.com">admin@tecmint.com</a></li>
<li><strong>用户名</strong>  – admin</li>
<li><strong>密码</strong>  – ##########</li>
<li><strong>用户的邮箱地址</strong>  – <a href="mailto:admin@tecmint.com">admin@tecmint.com</a></li>
<li><strong>默认国家</strong>  – India</li>
<li><strong>默认时区</strong>  – UTC</li>
</ul>
<p>设置适当的值后，点击<strong>保存并继续</strong>完成站点安装过程。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Site-Configuration.png"><img src="https://p3.ssl.qhimg.com/t0104921894e8e4260f.png" alt="Drupal 站点配置"></a></p>
<p><em>Drupal 站点配置</em></p>
<ol>
<li>下图显示的是通过 LAMP 成功安装的 Drupal 8 站点。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2013/07/Drupal-Site-Dashboard.png"><img src="https://p4.ssl.qhimg.com/t01b1c0ddff1c6470c1.png" alt="Drupal站点面板"></a></p>
<p><em>Drupal 站点面板</em></p>
<p>现在你可以点击<strong>增加内容</strong>，创建示例网页内容。</p>
<p>选项: 有些人<a href="http://www.tecmint.com/mysqladmin-commands-for-database-administration-in-linux/">使用 MySQL 命令行管理数据库</a>不舒服，可以从浏览器界面 <a href="http://www.tecmint.com/install-phpmyadmin-rhel-centos-fedora-linux/">安装 PHPMYAdmin 管理数据库</a></p>
<p>浏览 Drupal 文档 : <a href="https://www.drupal.org/docs/8">https://www.drupal.org/docs/8</a></p>
<p>就这样！ 在这个文章， 我们展示了在 CentOS 7 上如何去下载、安装和使用基本配置来设置 LAMP 以及 Drupal 8。 欢迎就这个教程提供反馈，或提供给我们一些相关信息。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 linux 和 F.O.S.S 爱好者，将成为 Linux 系统管理员，Web 开发者，目前是 TecMint 的原创作者，热爱计算机工作，并且坚信知识共享。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/install-drupal-in-centos-rhel-fedora/">http://www.tecmint.com/install-drupal-in-centos-rhel-fedora/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/imxieke">imxieke</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 RHEL、CentOS 及 Fedora 上安装 Drupal 8

## 原文链接
[https://www.zcfy.cc/article/install-drupal-8-in-rhel-centos-fedora](https://www.zcfy.cc/article/install-drupal-8-in-rhel-centos-fedora)

