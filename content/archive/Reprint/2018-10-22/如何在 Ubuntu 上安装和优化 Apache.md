---
title: 如何在 Ubuntu 上安装和优化 Apache
hidden: true
categories: [reprint]
slug: 49bec1d6
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-上安装和优化-apache"></a>如何在 Ubuntu 上安装和优化 Apache</h1>
<p>这是我们的 LAMP 系列教程的开始：如何在 Ubuntu 上安装 Apache web 服务器。</p>
<p>这些说明适用于任何基于 Ubuntu 的发行版，包括 Ubuntu 14.04、 Ubuntu 16.04、 <a href="https://thishosting.rocks/ubuntu-18-04-new-features-release-date/">Ubuntu 18.04</a>，甚至非 LTS 的 Ubuntu 发行版，例如 Ubuntu 17.10。这些说明经过测试并为 Ubuntu 16.04 编写。</p>
<p>Apache (又名 httpd) 是最受欢迎和使用最广泛的 web 服务器，所以这应该对每个人都有用。</p>
<h3><a href="#开始安装-apache-之前"></a>开始安装 Apache 之前</h3>
<p>在我们开始之前，这里有一些要求和说明：</p>
<ul>
<li>Apache 可能已经在你的服务器上安装了，所以开始之前首先检查一下。你可以使用 <code>apachectl -V</code> 命令来显示你正在使用的 Apache 的版本和一些其他信息。</li>
<li>你需要一个 Ubuntu 服务器。你可以从 <a href="https://thishosting.rocks/go/vultr/">Vultr</a> 购买一个，它们是<a href="https://thishosting.rocks/cheap-cloud-hosting-providers-comparison/">最便宜的云托管服务商</a>之一。它们的服务器价格每月 2.5 美元起。（LCTT 译注：广告 ≤_≤ ）</li>
<li>你需要有 root 用户或具有 sudo 访问权限的用户。下面的所有命令都由 root 用户执行，所以我们不必为每个命令都添加 <code>sudo</code>。</li>
<li>如果你使用 Ubuntu，则需要<a href="https://thishosting.rocks/how-to-enable-ssh-on-ubuntu/">启用 SSH</a>，如果你使用 Windows，则应该使用类似 <a href="https://mobaxterm.mobatek.net/">MobaXterm</a> 的 SSH 客户端。</li>
</ul>
<p>这就是全部要求和注释了，让我们进入安装过程。</p>
<h3><a href="#在-ubuntu-上安装-apache"></a>在 Ubuntu 上安装 Apache</h3>
<p>你需要做的第一件事就是更新 Ubuntu，这是在你做任何事情之前都应该做的。你可以运行：</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> update &amp;&amp; apt-<span class="hljs-builtin-name">get</span><span class="hljs-built_in"> upgrade
</span>
</code></pre><p>接下来，安装 Apache，运行以下命令：</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install apache2

</code></pre><p>如果你愿意，你也可以安装 Apache 文档和一些 Apache 实用程序。对于我们稍后将要安装的一些模块，你将需要一些 Apache 实用程序。</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install apache2-doc apache2-utils

</code></pre><p><strong>就是这样。你已经成功安装了 Apache </strong></p>
<p>你仍然需要配置它。</p>
<h3><a href="#在-ubuntu-上配置和优化-apache"></a>在 Ubuntu 上配置和优化 Apache</h3>
<p>你可以在 Apache 上做各种各样的配置，但是主要的和最常见的配置将在下面做出解释。</p>
<h4><a href="#检查-apache-是否正在运行"></a>检查 Apache 是否正在运行</h4>
<p>默认情况下，Apache 设置为在机器启动时自动启动，因此你不必手动启用它。你可以使用以下命令检查它是否正在运行以及其他相关信息：</p>
<pre><code class="hljs fortran">systemctl <span class="hljs-keyword">status</span> apache2

</code></pre><p><a href="https://thishosting.rocks/wp-content/uploads/2018/01/apache-running.jpg"><img src="https://p0.ssl.qhimg.com/t010f92c9fc14ab1452.jpg" alt="check if apache is running"></a></p>
<p>并且你可以检查你正在使用的版本：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">apachectl -V</span>

</code></pre><p>一种更简单的检查方法时访问服务器的 IP 地址，如果你得到默认的 Apache 页面，那么一切都正常。</p>
<h4><a href="#更新你的防火墙"></a>更新你的防火墙</h4>
<p>如果你使用防火墙（你应该使用它），则可能需要更新防火墙规则并允许访问默认端口。Ubuntu 上最常用的防火墙是 UFW，因此以下说明使用于 UFW。</p>
<p>要允许通过 80（http）和 443（https）端口的流量，运行以下命令：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">ufw</span> allow <span class="hljs-string">'Apache Full'</span>

</code></pre><h4><a href="#安装常见的-apache-模块"></a>安装常见的 Apache 模块</h4>
<p>一些模块经常被建议使用，所以你应该安装它们。我们将包含最常见模块的说明：</p>
<h5><a href="#使用-pagespeed--加速你的网站"></a>使用 PageSpeed 加速你的网站</h5>
<p>PageSpeed 模块将自动优化并加速你的 Apache 服务器。</p>
<p>首先，进入 <a href="https://www.modpagespeed.com/doc/download">PageSpeed 下载页</a>并选择你需要的的文件。我们使用的是 64 位 Ubuntu 服务器，所以我们安装最新的稳定版本。使用 <code>wget</code> 下载它：</p>
<pre><code class="hljs vim">wget http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">dl</span>-ssl.google.<span class="hljs-keyword">com</span>/<span class="hljs-keyword">dl</span>/linux/direct/<span class="hljs-keyword">mod</span>-pagespeed-stable_current_amd64.<span class="hljs-keyword">deb</span>

</code></pre><p>然后，使用以下命令安装它：</p>
<pre><code class="hljs stylus">dpkg -<span class="hljs-selector-tag">i</span> mod-pagespeed-stable_current_amd64<span class="hljs-selector-class">.deb</span>
apt-get -f install

</code></pre><p>重启 Apache 以使更改生效：</p>
<pre><code class="hljs maxima">systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><h5><a href="#使用-mod_rewrite-模块启动重写重定向"></a>使用 mod_rewrite 模块启动重写/重定向</h5>
<p>顾名思义，该模块用于重写（重定向）。如果你使用 WordPress 或任何其他 CMS 来处理此问题，你就需要它。要安装它，只需运行：</p>
<pre><code class="hljs coq">a2enmod <span class="hljs-built_in">rewrite</span>

</code></pre><p>然后再次重新启动 Apache。你可能需要一些额外的配置，具体取决于你使用的 CMS，如果有的话。为你的设置 Google 一下得到它的具体说明。</p>
<h5><a href="#使用-modsecurity-模块保护你的-apache"></a>使用 ModSecurity 模块保护你的 Apache</h5>
<p>顾名思义，ModSecurity 是一个用于安全性的模块，它基本上起着防火墙的作用，它可以监控你的流量。要安装它，运行以下命令：</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install libapache2-modsecurity

</code></pre><p>再次重启 Apache：</p>
<pre><code class="hljs maxima">systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><p>ModSecurity 自带了一个默认的设置，但如果你想扩展它，你可以使用 <a href="https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project">OWASP 规则集</a>。</p>
<h5><a href="#使用-mod_evasive-模块抵御-ddos-攻击"></a>使用 mod_evasive 模块抵御 DDoS 攻击</h5>
<p>尽管 mod_evasive 在防止攻击方面有多大用处值得商榷，但是你可以使用它来阻止和防止服务器上的 DDoS 攻击。要安装它，使用以下命令：</p>
<pre><code class="hljs applescript">apt-<span class="hljs-keyword">get</span> install libapache2-<span class="hljs-keyword">mod</span>-evasive

</code></pre><p>默认情况下，mod_evasive 是禁用的，要启用它，编辑以下文件：</p>
<pre><code class="hljs awk">nano <span class="hljs-regexp">/etc/</span>apache2<span class="hljs-regexp">/mods-enabled/</span>evasive.conf

</code></pre><p>取消注释所有行（即删除 <code>#</code>），根据你的要求进行配置。如果你不知道要编辑什么，你可以保持原样。</p>
<p><a href="https://thishosting.rocks/wp-content/uploads/2018/01/mod_evasive.jpg"><img src="https://p0.ssl.qhimg.com/t017e4d6c7d8edded59.jpg" alt="mod_evasive"></a></p>
<p>创建一个日志文件：</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">mkdir</span> /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/mod_evasive
chown -R www-data:www-data /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/mod_evasive

</code></pre><p>就是这样。现在重启 Apache 以使更改生效。</p>
<pre><code class="hljs maxima">systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><p>你可以安装和配置<a href="https://httpd.apache.org/docs/2.4/mod/">附加模块</a>，但完全取决于你和你使用的软件。它们通常不是必需的。甚至我们上面包含的 4 个模块也不是必需的。如果特定应用需要模块，那么它们可能会注意到这一点。</p>
<h4><a href="#用-apache2buddy-脚本优化-apache"></a>用 Apache2Buddy 脚本优化 Apache</h4>
<p>Apache2Buddy 是一个可以自动调整 Apache 配置的脚本。你唯一需要做的就是运行下面的命令，脚本会自动完成剩下的工作：</p>
<pre><code class="hljs awk">curl -sL https:<span class="hljs-regexp">//</span>raw.githubusercontent.com<span class="hljs-regexp">/richardforth/</span>apache2buddy<span class="hljs-regexp">/master/</span>apache2buddy.pl | perl

</code></pre><p>如果你没有安装 <code>curl</code>，那么你可能需要安装它。使用以下命令来安装 <code>curl</code>：</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install curl

</code></pre><h4><a href="#额外配置"></a>额外配置</h4>
<p>用 Apache 还可以做一些额外的东西，但我们会留下它们作为另一个教程。像启用 http/2 支持，关闭（或打开） KeepAlive，调整你的 Apache 甚至更多。这些东西你现在不需要做，但是如果你在网上找到了教程，并且如果你等不及我们的教程，那就去做吧。</p>
<h3><a href="#使用-apache-创建你的第一个网站"></a>使用 Apache 创建你的第一个网站</h3>
<p>现在我们已经完成了所有的调优工作，让我们开始创建一个实际的网站。按照我们的指示创建一个简单的 HTML 页面和一个在 Apache 上运行的虚拟主机。</p>
<p>你需要做的第一件事是为你的网站创建一个新的目录。运行以下命令来执行此操作：</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">mkdir</span> -p /<span class="hljs-built_in">var</span>/www/<span class="hljs-built_in">example</span>.com/public_html

</code></pre><p>当然，将 <code>example.com</code> 替换为你所需的域名。你可以从 <a href="https://thishosting.rocks/neamcheap-review-cheap-domains-cool-names">Namecheap</a> 获得一个便宜的域名。</p>
<p>不要忘记在下面的所有命令中替换 <code>example.com</code>。</p>
<p>接下来，创建一个简单的静态网页。创建 HTML 文件：</p>
<pre><code class="hljs delphi">nano /<span class="hljs-keyword">var</span>/www/example.com/public_html/<span class="hljs-keyword">index</span>.html

</code></pre><p>粘贴这些：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Simple Page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>If you're seeing this in your browser then everything works.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>保存并关闭文件。</p>
<p>配置目录的权限：</p>
<pre><code class="hljs kotlin">chown -R www-<span class="hljs-keyword">data</span>:www-<span class="hljs-keyword">data</span> /<span class="hljs-keyword">var</span>/www/example.com
chmod -R og-r /<span class="hljs-keyword">var</span>/www/example.com

</code></pre><p>为你的网站创建一个新的虚拟主机：</p>
<pre><code class="hljs stylus">nano /etc/apache2/sites-available/example<span class="hljs-selector-class">.com</span><span class="hljs-selector-class">.conf</span>

</code></pre><p>粘贴以下内容：</p>
<pre><code class="hljs stylus">&lt;VirtualHost *:<span class="hljs-number">80</span>&gt;
     ServerAdmin admin@example<span class="hljs-selector-class">.com</span>
     ServerName example<span class="hljs-selector-class">.com</span>
     ServerAlias www<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span>

     DocumentRoot /var/www/example.com/public_html

     ErrorLog ${APACHE_LOG_DIR}/error<span class="hljs-selector-class">.log</span>
     CustomLog ${APACHE_LOG_DIR}/access<span class="hljs-selector-class">.log</span> combined
&lt;/VirtualHost&gt;

</code></pre><p>这是一个基础的虚拟主机。根据你的设置，你可能需要更高级的 <code>.conf</code> 文件。</p>
<p>在更新所有内容后保存并关闭文件。</p>
<p>现在，使用以下命令启用虚拟主机：</p>
<pre><code class="hljs stylus">a2ensite example<span class="hljs-selector-class">.com</span><span class="hljs-selector-class">.conf</span>

</code></pre><p>最后，重启 Apache 以使更改生效：</p>
<pre><code class="hljs maxima">systemctl <span class="hljs-built_in">restart</span> apache2

</code></pre><p>这就是全部了，你做完了。现在你可以访问 example.com 并查看你的页面。</p>
<hr>
<p>via: <a href="https://thishosting.rocks/how-to-install-optimize-apache-ubuntu/">https://thishosting.rocks/how-to-install-optimize-apache-ubuntu/</a></p>
<p>作者：<a href="https://thishosting.rocks">ThisHosting</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/how-to-install-and-optimize-apache-on-ubuntu-thishosting-rocks](https://www.zcfy.cc/article/how-to-install-and-optimize-apache-on-ubuntu-thishosting-rocks)

## 原文标题
如何在 Ubuntu 上安装和优化 Apache
