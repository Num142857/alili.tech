---
title: '如何使用 Apache 控制命令检查它的模块是否已经启用或加载' 
date: 2019-02-15 2:30:44
hidden: true
slug: be3fgjqarpn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-apache-控制命令检查它的模块是否已经启用或加载"></a>如何使用 Apache 控制命令检查它的模块是否已经启用或加载</h1>
<p>本篇中，我们会简要地讨论 Apache 服务器前端以及如何列出或查看已经启用的 Apache 模块。</p>
<p>Apache 基于模块化的理念而构建，这样就可以让 web 管理员添加不同的模块来扩展主要的功能及<a href="http://www.tecmint.com/apache-performance-tuning/">增强性能</a>。</p>
<p>常见的 Apache 模块有：</p>
<ol>
<li>mod_ssl – 提供了 <a href="http://www.tecmint.com/install-lets-encrypt-ssl-certificate-to-secure-apache-on-rhel-centos/">HTTPS 功能</a>。</li>
<li>mod_rewrite – 可以用正则表达式匹配 url 样式，并且使用 <a href="http://www.tecmint.com/apache-htaccess-tricks/">.htaccess 技巧</a>来进行透明转发，或者提供 HTTP 状态码回应。</li>
<li>mod_security – 用于<a href="http://www.tecmint.com/protect-apache-using-mod_security-and-mod_evasive-on-rhel-centos-fedora/">保护 Apache 免于暴力破解或者 DDoS 攻击</a>。</li>
<li>mod_status - 用于<a href="http://www.tecmint.com/monitor-apache-web-server-load-and-page-statistics/">监测 Apache 的负载及页面统计</a>。</li>
</ol>
<p>在 Linux 中 <code>apachectl</code> 或者 <code>apache2ctl</code>用于控制 Apache 服务器，是 Apache 的前端。</p>
<p>你可以用下面的命令显示 <code>apache2ctl</code> 的使用信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> apache2ctl <span class="hljs-built_in">help</span></span>
或者
<span class="hljs-meta">$</span><span class="bash"> apachectl <span class="hljs-built_in">help</span></span>

</code></pre><pre><code class="hljs routeros">Usage: /usr/sbin/httpd [-D name] [-d directory] [-f file]
                       [-C <span class="hljs-string">"directive"</span>] [-c <span class="hljs-string">"directive"</span>]
                       [-k start|restart|graceful|graceful-stop|stop]
                       [-v] [-V] [-h] [-l] [-L] [-t] [-S]
Options:
  -D name            : define a name <span class="hljs-keyword">for</span> use <span class="hljs-keyword">in</span>  directives
  -d directory       : specify an alternate initial ServerRoot
  -f file            : specify an alternate ServerConfigFile
  -C <span class="hljs-string">"directive"</span>     : process directive before reading<span class="hljs-built_in"> config </span>files
  -c <span class="hljs-string">"directive"</span>     : process directive after reading<span class="hljs-built_in"> config </span>files
  -e level           : show startup errors of level (see LogLevel)
  -E file            : log startup errors <span class="hljs-keyword">to</span> file
  -v                 : show version number
  -V                 : show compile<span class="hljs-built_in"> settings
</span>  -h                 : list available command line options (this page)
  -l                 : list compiled <span class="hljs-keyword">in</span> modules
  -L                 : list available configuration directives
  -t -D DUMP_VHOSTS  : show parsed<span class="hljs-built_in"> settings </span>(currently only vhost settings)
  -S                 : a synonym <span class="hljs-keyword">for</span> -t -D DUMP_VHOSTS
  -t -D DUMP_MODULES : show all loaded modules 
  -M                 : a synonym <span class="hljs-keyword">for</span> -t -D DUMP_MODULES
  -t                 : <span class="hljs-builtin-name">run</span> syntax check <span class="hljs-keyword">for</span><span class="hljs-built_in"> config </span>files

</code></pre><p><code>apache2ctl</code> 可以工作在两种模式下，SysV init 模式和直通模式。在 SysV init 模式下，<code>apache2ctl</code> 用如下的简单的单命令形式：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> apachectl <span class="hljs-built_in">command</span></span>
或者
<span class="hljs-meta">$</span><span class="bash"> apache2ctl <span class="hljs-built_in">command</span></span>

</code></pre><p>比如要启动并检查它的状态，运行这两个命令。如果你是普通用户，使用 <a href="http://www.tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux/">sudo 命令</a>来以 root 用户权限来运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apache2ctl start</span>
<span class="hljs-meta">$</span><span class="bash"> sudo apache2ctl status</span>

</code></pre><pre><code class="hljs vbscript">tecmint@TecMint ~ $ sudo apache2ctl start
AH00558: apache2: Could <span class="hljs-keyword">not</span> reliably determine the <span class="hljs-built_in">server</span><span class="hljs-comment">'s fully qualified domain name, using 127.0.1.1\. Set the 'ServerName' directive globally to suppress this message</span>
httpd (pid <span class="hljs-number">1456</span>) already running
tecmint@TecMint ~ $ sudo apache2ctl status
Apache <span class="hljs-built_in">Server</span> Status <span class="hljs-keyword">for</span> localhost (via <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>)

<span class="hljs-built_in">Server</span> Version: Apache/<span class="hljs-number">2.4</span><span class="hljs-number">.18</span> (Ubuntu)
<span class="hljs-built_in">Server</span> MPM: prefork
<span class="hljs-built_in">Server</span> Built: <span class="hljs-number">2016</span><span class="hljs-number">-07</span><span class="hljs-number">-14</span>T12:<span class="hljs-number">32</span>:<span class="hljs-number">26</span>

-------------------------------------------------------------------------------

Current <span class="hljs-built_in">Time</span>: Tuesday, <span class="hljs-number">15</span>-Nov<span class="hljs-number">-2016</span> <span class="hljs-number">11</span>:<span class="hljs-number">47</span>:<span class="hljs-number">28</span> IST
Restart <span class="hljs-built_in">Time</span>: Tuesday, <span class="hljs-number">15</span>-Nov<span class="hljs-number">-2016</span> <span class="hljs-number">10</span>:<span class="hljs-number">21</span>:<span class="hljs-number">46</span> IST
Parent <span class="hljs-built_in">Server</span> Config. Generation: <span class="hljs-number">2</span>
Parent <span class="hljs-built_in">Server</span> MPM Generation: <span class="hljs-number">1</span>
<span class="hljs-built_in">Server</span> uptime: <span class="hljs-number">1</span> <span class="hljs-built_in">hour</span> <span class="hljs-number">25</span> minutes <span class="hljs-number">41</span> seconds
<span class="hljs-built_in">Server</span> load: <span class="hljs-number">0.97</span> <span class="hljs-number">0.94</span> <span class="hljs-number">0.77</span>
Total accesses: <span class="hljs-number">2</span> - Total Traffic: <span class="hljs-number">3</span> kB
CPU Usage: u0 s0 cu0 cs0
<span class="hljs-number">.000389</span> requests/sec - <span class="hljs-number">0</span> B/<span class="hljs-built_in">second</span> - <span class="hljs-number">1536</span> B/<span class="hljs-built_in">request</span>
<span class="hljs-number">1</span> requests currently being processed, <span class="hljs-number">4</span> idle workers

__W__...........................................................
................................................................
......................

Scoreboard Key:
<span class="hljs-string">"_"</span> Waiting <span class="hljs-keyword">for</span> Connection, <span class="hljs-string">"S"</span> Starting up, <span class="hljs-string">"R"</span> Reading <span class="hljs-built_in">Request</span>,
<span class="hljs-string">"W"</span> Sending Reply, <span class="hljs-string">"K"</span> Keepalive (read), <span class="hljs-string">"D"</span> DNS Lookup,
<span class="hljs-string">"C"</span> Closing connection, <span class="hljs-string">"L"</span> Logging, <span class="hljs-string">"G"</span> Gracefully finishing,
<span class="hljs-string">"I"</span> Idle cleanup of worker, <span class="hljs-string">"."</span> Open slot <span class="hljs-keyword">with</span> no current process

</code></pre><p>当在直通模式下，<code>apache2ctl</code> 可以用下面的语法带上所有 Apache 的参数：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> apachectl [apache-argument]</span>
<span class="hljs-meta">$</span><span class="bash"> apache2ctl [apache-argument]</span>

</code></pre><p>可以用下面的命令列出所有的 Apache 参数：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> apache2 <span class="hljs-built_in">help</span>    [在基于Debian的系统中]</span>
<span class="hljs-meta">$</span><span class="bash"> httpd <span class="hljs-built_in">help</span>      [在RHEL的系统中]</span>

</code></pre><h3><a href="#检查启用的-apache-模块"></a>检查启用的 Apache 模块</h3>
<p>因此，为了检测你的 Apache 服务器启动了哪些模块，在你的发行版中运行适当的命令，<code>-t -D DUMP_MODULES</code> 是一个用于显示所有启用的模块的 Apache 参数：</p>
<pre><code class="hljs shell">---------------  在基于 Debian 的系统中 --------------- 
<span class="hljs-meta">$</span><span class="bash"> apache2ctl -t -D DUMP_MODULES   </span>
或者 
<span class="hljs-meta">$</span><span class="bash"> apache2ctl -M</span>

</code></pre><pre><code class="hljs shell">---------------  在 RHEL 的系统中 --------------- 
<span class="hljs-meta">$</span><span class="bash"> apachectl -t -D DUMP_MODULES   </span>
或者 
<span class="hljs-meta">$</span><span class="bash"> httpd -M</span>
<span class="hljs-meta">$</span><span class="bash"> apache2ctl -M</span>

</code></pre><pre><code class="hljs d">[root<span class="hljs-keyword">@tecmint</span> httpd]# apachectl -M
Loaded Modules:
 core_module (<span class="hljs-keyword">static</span>)
 mpm_prefork_module (<span class="hljs-keyword">static</span>)
 http_module (<span class="hljs-keyword">static</span>)
 so_module (<span class="hljs-keyword">static</span>)
 auth_basic_module (<span class="hljs-keyword">shared</span>)
 auth_digest_module (<span class="hljs-keyword">shared</span>)
 authn_file_module (<span class="hljs-keyword">shared</span>)
 authn_alias_module (<span class="hljs-keyword">shared</span>)
 authn_anon_module (<span class="hljs-keyword">shared</span>)
 authn_dbm_module (<span class="hljs-keyword">shared</span>)
 authn_default_module (<span class="hljs-keyword">shared</span>)
 authz_host_module (<span class="hljs-keyword">shared</span>)
 authz_user_module (<span class="hljs-keyword">shared</span>)
 authz_owner_module (<span class="hljs-keyword">shared</span>)
 authz_groupfile_module (<span class="hljs-keyword">shared</span>)
 authz_dbm_module (<span class="hljs-keyword">shared</span>)
 authz_default_module (<span class="hljs-keyword">shared</span>)
 ldap_module (<span class="hljs-keyword">shared</span>)
 authnz_ldap_module (<span class="hljs-keyword">shared</span>)
 include_module (<span class="hljs-keyword">shared</span>)
....

</code></pre><p>就是这样！在这篇简单的教程中，我们解释了如何使用 Apache 前端工具来列出启动的 apache 模块。记住你可以在下面的反馈表中给我们留下你的问题或者留言。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/check-apache-modules-enabled">http://www.tecmint.com/check-apache-modules-enabled</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 Apache 控制命令检查它的模块是否已经启用或加载

## 原文链接
[https://www.zcfy.cc/article/how-to-check-which-apache-modules-are-enabled-loaded-in-linux](https://www.zcfy.cc/article/how-to-check-which-apache-modules-are-enabled-loaded-in-linux)

