---
title: '如何在 Ubuntu 16.04 上安装 OTRS （开源问题单系统）' 
date: 2019-01-23 2:30:07
hidden: true
slug: wo0c31tyxmg
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-1604-上安装-otrs-开源问题单系统"></a>如何在 Ubuntu 16.04 上安装 OTRS （开源问题单系统）</h1>
<p>OTRS ，及开源问题单（ticket）申请系统是一个用于客户服务、帮助台和 IT 服务管理的开源问题单软件。该软件是用 Perl 和 javascript 编写的。对于那些需要管理票据、投诉、支持请求或其他类型的报告的公司和组织来说，这是一个问题单解决方案。OTRS 支持包括 MySQL、PostgreSQL、Oracle 和 SQL Server 在内的多个数据库系统，它是一个可以安装在 Windows 和 Linux 上的多平台软件。</p>
<p>在本教程中，我将介绍如何在 Ubuntu 16.04 上安装和配置 OTRS。我将使用 PostgreSQL 作为 OTRS 的数据库，将 Apache Web 服务器用作 Web 服务器。</p>
<p><strong>先决条件</strong></p>
<ul>
<li>Ubuntu 16.04。</li>
<li>最小 2GB 的内存。</li>
<li>root 权限</li>
</ul>
<h3><a href="#步骤-1---安装-apache-和-postgresql"></a>步骤 1 - 安装 Apache 和 PostgreSQL</h3>
<p>在第一步中，我们将安装 Apache Web 服务器以及 PostgreSQL。我们将从 ubuntu 仓库中使用最新的版本。</p>
<p>使用 SSH 登录到你的 Ubuntu 服务器中：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">ssh</span> <span class="hljs-selector-tag">root</span>@<span class="hljs-keyword">192</span>.<span class="hljs-keyword">168</span>.<span class="hljs-keyword">33</span>.<span class="hljs-keyword">14</span>

</code></pre><p>更新 Ubuntu 仓库。</p>
<pre><code class="hljs q">sudo apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><p>使用 apt 安装 Apache2 以及 PostgreSQL：</p>
<pre><code class="hljs applescript">sudo apt-<span class="hljs-keyword">get</span> install -y apache2 libapache2-<span class="hljs-keyword">mod</span>-perl2 postgresql

</code></pre><p>通过检查服务器端口确保 Apache 以及 PostgreSQL 运行了。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">netstat -plntu</span>

</code></pre><p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/1.png"><img src="https://p0.ssl.qhimg.com/t0118e57fe46365fd41.png" alt="Install Apache and PostgreSQL"></a></p>
<p>你可以看到 80 端口被 apache 使用了，5432 端口被 postgresql 数据库使用了。</p>
<h3><a href="#步骤-2---安装-perl-模块"></a>步骤 2 - 安装 Perl 模块</h3>
<p>OTRS 基于 Perl，因此我们需要安装一些 OTRS 需要的 Perl 模块。</p>
<p>使用这个 apt 命令安装 perl 模块：</p>
<pre><code class="hljs vim">sudo apt-<span class="hljs-built_in">get</span> install -<span class="hljs-keyword">y</span> libapache2-<span class="hljs-keyword">mod</span>-perl2 libdbd-pg-<span class="hljs-keyword">perl</span> libnet-dns-<span class="hljs-keyword">perl</span> libnet-ldap-<span class="hljs-keyword">perl</span> libio-socket-ssl-<span class="hljs-keyword">perl</span> libpdf-api2-<span class="hljs-keyword">perl</span> libsoap-lite-<span class="hljs-keyword">perl</span> libgd-text-<span class="hljs-keyword">perl</span> libgd-graph-<span class="hljs-keyword">perl</span> libapache-dbi-<span class="hljs-keyword">perl</span> libarchive-zip-<span class="hljs-keyword">perl</span> libcrypt-eksblowfish-<span class="hljs-keyword">perl</span> libcrypt-ssleay-<span class="hljs-keyword">perl</span> libencode-hanextra-<span class="hljs-keyword">perl</span> libjson-xs-<span class="hljs-keyword">perl</span> libmail-imapclient-<span class="hljs-keyword">perl</span> libtemplate-<span class="hljs-keyword">perl</span> libtemplate-<span class="hljs-keyword">perl</span> libtext-csv-xs-<span class="hljs-keyword">perl</span> libxml-libxml-<span class="hljs-keyword">perl</span> libxml-libxslt-<span class="hljs-keyword">perl</span> libpdf-api2-simple-<span class="hljs-keyword">perl</span> libyaml-libyaml-<span class="hljs-keyword">perl</span>

</code></pre><p>安装完成后，我们需要为 apache 激活 Perl 模块，接着重启 apache 服务。</p>
<pre><code class="hljs maxima">a2enmod perl
systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><p>接下来，使用下面的命令检查模块是否已经加载了：</p>
<pre><code class="hljs 1c">apachectl -M <span class="hljs-string">| sort</span>

</code></pre><p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/2.png"><img src="https://p0.ssl.qhimg.com/t013bac86c6f7af7928.png" alt="Enable Apache Perl Module"></a></p>
<p>你可以在 “Loaded Modules” 部分下看到 <strong>perl_module</strong>。</p>
<h3><a href="#步骤-3---为-otrs-创建新用户"></a>步骤 3 - 为 OTRS 创建新用户</h3>
<p>OTRS 是一个基于 web 的程序并且运行与 apache web 服务器下。为了安全，我们需要以普通用户运行它，而不是 root 用户。</p>
<p>使用 useradd 命令创建一个 <code>otrs</code> 新用户：</p>
<pre><code class="hljs awk">useradd -r -d <span class="hljs-regexp">/opt/</span>otrs -c <span class="hljs-string">'OTRS User'</span> otrs

</code></pre><ul>
<li><code>-r</code>：将用户作为系统用户。</li>
<li><code>-d /opt/otrs</code>：在 <code>/opt/otrs</code> 下放置新用户的主目录。</li>
<li><code>-c</code>：备注。</li>
</ul>
<p>接下来，将 <code>otrs</code> 用户加入到 <code>www-data</code> 用户组，因为 apache 运行于 <code>www-data</code> 用户及用户组。</p>
<pre><code class="hljs haskell"><span class="hljs-title">usermod</span> -a -<span class="hljs-type">G</span> www-<span class="hljs-class"><span class="hljs-keyword">data</span> otrs</span>

</code></pre><p>在 <code>/etc/passwd</code> 文件中已经有 <code>otrs</code> 用户了。</p>
<pre><code class="hljs gradle"><span class="hljs-keyword">grep</span> -rin otrs <span class="hljs-regexp">/etc/</span>passwd

</code></pre><p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/3.png"><img src="https://p0.ssl.qhimg.com/t013a18c5891213a55a.png" alt="Create new user for OTRS"></a></p>
<p>OTRS 的新用户已经创建了。</p>
<h3><a href="#步骤-4---创建和配置数据库"></a>步骤 4 - 创建和配置数据库</h3>
<p>在这节中，我们会为 OTRS 系统创建一个新 PostgreSQL 数据库，并对 PostgreSQL 数据库的配置做一些小的更改。</p>
<p>登录到 <code>postgres</code> 用户并访问 PostgreSQL shell。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">su - postgres
psql</span>

</code></pre><p>创建一个新的角色 <code>otrs</code>，密码是 <code>myotrspw</code>，并且是非特权用户。</p>
<pre><code class="hljs sql"><span class="hljs-keyword">create</span> <span class="hljs-keyword">user</span> otrs <span class="hljs-keyword">password</span> <span class="hljs-string">'myotrspw'</span> nosuperuser;

</code></pre><p>接着使用 <code>otrs</code> 用户权限创建一个新的 <code>otrs</code> 数据库：</p>
<pre><code class="hljs n1ql"><span class="hljs-keyword">create</span> <span class="hljs-keyword">database</span> otrs owner otrs;
\q

</code></pre><p>接下来为 <code>otrs</code> 角色验证编辑 PostgreSQL 配置文件。</p>
<pre><code class="hljs dts">vim <span class="hljs-meta-keyword">/etc/</span>postgresql/<span class="hljs-number">9.5</span><span class="hljs-meta-keyword">/main/</span>pg_hba.conf

</code></pre><p>在 84 行后粘贴下面的配置：</p>
<pre><code class="hljs lsl">local   otrs            otrs                                    password
host    otrs            otrs            <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>/<span class="hljs-number">32</span>            password

</code></pre><p>保存文件并退出 vim</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/4.png"><img src="https://p0.ssl.qhimg.com/t01fccd92f0f3b383cc.png" alt="Database Authentication OTRS"></a></p>
<p>使用 <code>exit</code> 回到 root 权限并重启 PostgreSQL：</p>
<pre><code class="hljs awk"><span class="hljs-keyword">exit</span>
systemctl restart postgresql

</code></pre><p>PostgreSQL 已经为 OTRS 的安装准备好了。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/5.png"><img src="https://p0.ssl.qhimg.com/t018af1d944b4fd7be6.png" alt="Configure PostgreSQL for OTRS"></a></p>
<h3><a href="#步骤-5---下载和配置-otrs"></a>步骤 5 - 下载和配置 OTRS</h3>
<p>在本教程中，我们会使用 OTRS 网站中最新的版本。</p>
<p>进入 <code>/opt</code> 目录并使用 <code>wget</code> 命令下载 OTRS 5.0：</p>
<pre><code class="hljs groovy">cd <span class="hljs-regexp">/opt/</span>
wget <span class="hljs-string">http:</span><span class="hljs-comment">//ftp.otrs.org/pub/otrs/otrs-5.0.16.tar.gz</span>

</code></pre><p>展开该 otrs 文件，重命名目录并更改所有 otrs 的文件和目录的所属人为 <code>otrs</code>。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">-xzvf</span> <span class="hljs-selector-tag">otrs-5</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.16</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
<span class="hljs-selector-tag">mv</span> <span class="hljs-selector-tag">otrs-5</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.16</span> <span class="hljs-selector-tag">otrs</span>
<span class="hljs-selector-tag">chown</span> <span class="hljs-selector-tag">-R</span> <span class="hljs-selector-tag">otrs</span><span class="hljs-selector-pseudo">:otrs</span> <span class="hljs-selector-tag">otrs</span>

</code></pre><p>接下来，我们需要检查系统并确保可以安装 OTRS 了。</p>
<p>使用下面的 otrs 脚本命令检查 OTRS 安装需要的系统软件包：</p>
<pre><code class="hljs stylus">/opt/otrs/bin/otrs<span class="hljs-selector-class">.CheckModules</span><span class="hljs-selector-class">.pl</span>

</code></pre><p>确保所有的结果是对的，这意味着我们的服务器可以安装 OTRS 了。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/6.png"><img src="https://p0.ssl.qhimg.com/t01aa7fbb09c6cf83aa.png" alt="OTRS Chek Module needed for Installation"></a></p>
<p>OTRS 已下载，并且我们的服务器可以安装 OTRS 了。</p>
<p>接下，进入 otrs 目录并复制配置文件。</p>
<pre><code class="hljs stylus">cd /opt/otrs/
cp Kernel/Config<span class="hljs-selector-class">.pm</span><span class="hljs-selector-class">.dist</span> Kernel/Config<span class="hljs-selector-class">.pm</span>

</code></pre><p>使用 vim 编辑 <code>Config.pm</code> 文件：</p>
<pre><code class="hljs stylus">vim Kernel/Config<span class="hljs-selector-class">.pm</span>

</code></pre><p>更改 42 行的数据库密码：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$Self</span>-&gt;{DatabasePw} = <span class="hljs-string">'myotrspw'</span>;

</code></pre><p>注释 45 行的 MySQL 数据库支持：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$Self</span>-&gt;{DatabaseDSN} = <span class="hljs-string">"DBI:mysql:database=<span class="hljs-variable">$Self</span>-&gt;{Database};host=<span class="hljs-variable">$Self</span>-&gt;{DatabaseHost};"</span>;</span>

</code></pre><p>取消注释 49 行的 PostgreSQL 数据库支持：</p>
<pre><code class="hljs perl">$Self-&gt;{DatabaseDSN} = <span class="hljs-string">"DBI:Pg:dbname=$Self-&gt;{Database};"</span>;

</code></pre><p>保存文件并退出 vim。</p>
<p>接着编辑 apache 启动文件来启用 PostgreSQL 支持。</p>
<pre><code class="hljs stylus">vim scripts/apache2-perl-startup<span class="hljs-selector-class">.pl</span>

</code></pre><p>取消注释 60 和 61 行：</p>
<pre><code class="hljs elixir"><span class="hljs-comment"># enable this if you use postgresql</span>
<span class="hljs-keyword">use</span> <span class="hljs-symbol">DBD:</span><span class="hljs-symbol">:Pg</span> ();
<span class="hljs-keyword">use</span> <span class="hljs-symbol">Kernel:</span><span class="hljs-symbol">:System</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:DB</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:postgresql</span>;

</code></pre><p>保存文件并退出编辑器。</p>
<p>最后，检查缺失的依赖和模块。</p>
<pre><code class="hljs vim"><span class="hljs-keyword">perl</span> -<span class="hljs-keyword">cw</span> /<span class="hljs-keyword">opt</span>/otrs/bin/cgi-bin/<span class="hljs-built_in">index</span>.pl
<span class="hljs-keyword">perl</span> -<span class="hljs-keyword">cw</span> /<span class="hljs-keyword">opt</span>/otrs/bin/cgi-bin/customer.pl
<span class="hljs-keyword">perl</span> -<span class="hljs-keyword">cw</span> /<span class="hljs-keyword">opt</span>/otrs/bin/otrs.Console.pl

</code></pre><p>你可以在下面的截图中看到结果是 “<strong>OK</strong>”：</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/7.png"><img src="https://p0.ssl.qhimg.com/t01f3f211a432db7366.png" alt="Check all modules again"></a></p>
<h3><a href="#步骤-6---导入样本数据库"></a>步骤 6 - 导入样本数据库</h3>
<p>在本教程中，我们会使用样本数据库，这可以在脚本目录中找到。因此我们只需要将所有的样本数据库以及表结构导入到第 4 步创建的数据库中。</p>
<p>登录到 <code>postgres</code> 用户并进入 otrs 目录中。</p>
<pre><code class="hljs jboss-cli">su - postgres
<span class="hljs-keyword">cd</span> <span class="hljs-string">/opt/otrs/</span>

</code></pre><p>作为 otrs 用户使用 <code>psql</code> 命令插入数据库以及表结构。</p>
<pre><code class="hljs stylus">psql -U otrs -W -f scripts/database/otrs-schema<span class="hljs-selector-class">.postgresql</span><span class="hljs-selector-class">.sql</span> otrs
psql -U otrs -W -f scripts/database/otrs-initial_insert<span class="hljs-selector-class">.postgresql</span><span class="hljs-selector-class">.sql</span> otrs
psql -U otrs -W -f scripts/database/otrs-schema-post<span class="hljs-selector-class">.postgresql</span><span class="hljs-selector-class">.sql</span> otrs

</code></pre><p>在需要的时候输入数据库密码 <code>myotrspw</code>。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/8.png"><img src="https://p0.ssl.qhimg.com/t01a70fe9cd7c38f83a.png" alt="Import OTRS Sample Database"></a></p>
<h3><a href="#步骤-7---启动-otrs"></a>步骤 7 - 启动 OTRS</h3>
<p>数据库以及 OTRS 已经配置了，现在我们可以启动 OTRS。</p>
<p>将 otrs 的文件及目录权限设置为 <code>www-data</code> 用户和用户组。</p>
<pre><code class="hljs armasm">/<span class="hljs-meta">opt</span>/otrs/<span class="hljs-keyword">bin/otrs.SetPermissions.pl </span>--otrs-user<span class="hljs-symbol">=www</span>-<span class="hljs-meta">data</span> --web-group<span class="hljs-symbol">=www</span>-<span class="hljs-meta">data</span>

</code></pre><p>通过创建一个新的链接文件到 apache 虚拟主机目录中启用 otrs apache 配置。</p>
<pre><code class="hljs gradle">ln -s <span class="hljs-regexp">/opt/</span>otrs<span class="hljs-regexp">/scripts/</span>apache2-httpd.<span class="hljs-keyword">include</span>.conf <span class="hljs-regexp">/etc/</span>apache2<span class="hljs-regexp">/sites-available/</span>otrs.conf

</code></pre><p>启用 otrs 虚拟主机并重启 apache。</p>
<pre><code class="hljs maxima">a2ensite otrs
systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><p>确保 apache 启动没有错误。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/9.png"><img src="https://p0.ssl.qhimg.com/t01b711e498e2cb588f.png" alt="Enable OTRS Apache Virtual Host"></a></p>
<h3><a href="#步骤-8---配置-otrs-计划任务"></a>步骤 8 - 配置 OTRS 计划任务</h3>
<p>OTRS 已经安装并运行在 Apache Web 服务器中了，但是我们仍然需要配置 OTRS 计划任务。</p>
<p>登录到 <code>otrs</code> 用户，接着以 otrs 用户进入 <code>var/cron</code> 目录。</p>
<pre><code class="hljs stata"><span class="hljs-keyword">su</span> - otrs
<span class="hljs-keyword">cd</span> <span class="hljs-keyword">var</span>/cron/
<span class="hljs-keyword">pwd</span>

</code></pre><p>使用下面的命令复制所有 <code>.dist</code> 计划任务脚本：</p>
<pre><code class="hljs bash"><span class="hljs-keyword">for</span> foo <span class="hljs-keyword">in</span> *.dist; <span class="hljs-keyword">do</span> cp <span class="hljs-variable">$foo</span> `basename <span class="hljs-variable">$foo</span> .dist`; <span class="hljs-keyword">done</span>

</code></pre><p>使用 <code>exit</code> 回到 root 权限，并使用 otrs 用户启动计划任务脚本。</p>
<pre><code class="hljs awk"><span class="hljs-keyword">exit</span>
<span class="hljs-regexp">/opt/</span>otrs<span class="hljs-regexp">/bin/</span>Cron.sh start otrs

</code></pre><p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/10.png"><img src="https://p0.ssl.qhimg.com/t0170c7e301b9b33c84.png" alt="Enable OTRS Cron"></a></p>
<p>接下来，手动收取电子邮件的 PostMaster 创建一个新的计划任务。我会配置为每 2 分钟收取一次邮件。</p>
<pre><code class="hljs stata"><span class="hljs-keyword">su</span> - otrs
crontab -<span class="hljs-built_in">e</span>

</code></pre><p>粘贴下面的配置：</p>
<pre><code class="hljs groovy">*<span class="hljs-regexp">/2 * * * *    $HOME/</span>bin<span class="hljs-regexp">/otrs.PostMasterMailbox.pl &gt;&gt; /</span>dev/<span class="hljs-literal">null</span>

</code></pre><p>保存并退出。</p>
<p>现在停止 otrs 守护进程并再次启动。</p>
<pre><code class="hljs stylus">bin/otrs<span class="hljs-selector-class">.Daemon</span><span class="hljs-selector-class">.pl</span> stop
bin/otrs<span class="hljs-selector-class">.Daemon</span><span class="hljs-selector-class">.pl</span> start

</code></pre><p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/11.png"><img src="https://p0.ssl.qhimg.com/t011d0fbf58314680cb.png" alt="Enable OTRS Fetching Email"></a></p>
<p>OTRS 安装以及配置完成了。</p>
<h3><a href="#步骤-9---测试-otrs"></a>步骤 9 - 测试 OTRS</h3>
<p>打开你的 web 浏览器并输入你的服务器 IP 地址： <a href="http://192.168.33.14/otrs/">http://192.168.33.14/otrs/</a></p>
<p>使用默认的用户 <code>root@localhost</code> 以及密码 <code>root</code> 登录。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/12.png"><img src="https://p0.ssl.qhimg.com/t0156323ef097d9800e.png" alt="Installation Successfully OTRS Home Page"></a></p>
<p>使用默认的 root 账户你会看到一个警告。点击警告信息来创建一个新的 admin root 用户。</p>
<p>下面是用另外的 admin root 用户登录后出现的 admin 页面，这里没有出现错误信息。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/13.png"><img src="https://p0.ssl.qhimg.com/t01cc6337988c2c55ee.png" alt="OTRS Admin Dashboard Without Error Messages"></a></p>
<p>如果你想作为客户登录，你可以使用 <code>customer.pl</code> ：<a href="http://192.168.33.14/otrs/customer.pl">http://192.168.33.14/otrs/customer.pl</a></p>
<p>你会看到客户登录界面，输入客户的用户名和密码。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/14.png"><img src="https://p0.ssl.qhimg.com/t012902a3134c47ec24.png" alt="OTRS Customer Login Page"></a></p>
<p>下面是一个创建新单据的客户页面。</p>
<p><a href="https://www.howtoforge.com/images/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/big/15.png"><img src="https://p0.ssl.qhimg.com/t01f8fa1f6095e9fe6b.png" alt="Customer Open Ticket"></a></p>
<h3><a href="#步骤-10---疑难排查"></a>步骤 10 - 疑难排查</h3>
<p>如果你仍旧看到 “OTRS Daemon is not running” 的错误，你可以像这样调试 OTRS 守护进程。</p>
<pre><code class="hljs jboss-cli">
su - otrs
<span class="hljs-keyword">cd</span> <span class="hljs-string">/opt/otrs/</span>

</code></pre><p>停止 OTRS 守护进程：</p>
<pre><code class="hljs stylus">bin/otrs<span class="hljs-selector-class">.Daemon</span><span class="hljs-selector-class">.pl</span> stop

</code></pre><p>使用 <code>--debug</code> 选项启动 OTRS 守护进程。</p>
<pre><code class="hljs stylus">bin/otrs<span class="hljs-selector-class">.Daemon</span><span class="hljs-selector-class">.pl</span> start --debug

</code></pre><h3><a href="#参考"></a>参考</h3>
<ul>
<li><a href="http://wiki.otterhub.org/index.php?title=Installation_on_Debian_6_with_Postgres">http://wiki.otterhub.org/index.php?title=Installation_on_Debian_6_with_Postgres</a><a href="http://wiki.otterhub.org/index.php?title=Installation_on_Debian_6_with_Postgres"></a></li>
<li><a href="http://www.geoffstratton.com/otrs-installation-5011-ubuntu-1604">http://www.geoffstratton.com/otrs-installation-5011-ubuntu-1604</a><a href="http://www.geoffstratton.com/otrs-installation-5011-ubuntu-1604"></a></li>
<li><a href="https://www.linkedin.com/pulse/ticketing-system-otrs-ubuntu-1404-muhammad-faiz-khan">https://www.linkedin.com/pulse/ticketing-system-otrs-ubuntu-1404-muhammad-faiz-khan</a></li>
</ul>
<hr>
<p>via: <a href="https://www.howtoforge.com/tutorial/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/">https://www.howtoforge.com/tutorial/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/</a></p>
<p>作者：<a href="https://www.howtoforge.com/tutorial/how-to-install-otrs-opensource-trouble-ticket-system-on-ubuntu-16-04/">Muhammad Arul</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 16.04 上安装 OTRS （开源问题单系统）

## 原文链接
[https://www.zcfy.cc/article/how-to-install-otrs-on-ubuntu-16-04](https://www.zcfy.cc/article/how-to-install-otrs-on-ubuntu-16-04)

