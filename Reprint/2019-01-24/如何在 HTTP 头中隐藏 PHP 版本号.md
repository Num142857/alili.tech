---
title: '如何在 HTTP 头中隐藏 PHP 版本号' 
date: 2019-01-24 2:30:11
hidden: true
slug: ue5tin0yqgp
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-http-头中隐藏-php-版本号"></a>如何在 HTTP 头中隐藏 PHP 版本号</h1>
<p>PHP 配置默认允许服务器在 HTTP 响应头 <code>X-Powered-By</code> 中显示安装在服务器上的 PHP 版本。</p>
<p>出于服务器安全原因（虽然不是主要的要担心的威胁），建议你禁用或隐藏此信息，避免那些针对你的服务器的攻击者知道你是否运行了 PHP。</p>
<p>假设你服务器上安装的特定版本的 PHP 具有安全漏洞，另一方面，攻击者可以了解这一点，他们将更容易利用漏洞并通过脚本访问服务器。</p>
<p>在我以前的文章中，我已经展示了<a href="http://www.tecmint.com/hide-apache-web-server-version-information/">如何隐藏 apache 版本号</a>，你已经看到如何不再显示 apache 的安装版本。但是如果你在你的 apache 服务器上运行 PHP，你还需要隐藏 PHP 的安装版本，这我们将在本文中展示。</p>
<p>因此，在本文中，我们将解释如何隐藏或关闭服务器 HTTP 响应头中的 PHP 版本号。</p>
<p>此设置可以在加载的 PHP 配置文件中配置。如果你不知道此配置文件在服务器上的位置，请运行以下命令找到它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> php -i | grep <span class="hljs-string">"Loaded Configuration File"</span></span>

</code></pre><p>PHP 配置文件位置</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">----------------</span> 在 CentOS/RHEL/Fedora 上<span class="hljs-params">----------------</span> 
Loaded Configuration File =&gt; <span class="hljs-string">/etc/php.ini</span>
<span class="hljs-params">----------------</span> 在 Debian/Ubuntu/Linux Mint 上<span class="hljs-params">----------------</span> 
Loaded Configuration File =&gt; <span class="hljs-string">/etc/php/7.0/cli/php.ini</span>

</code></pre><p>在对 PHP 配置文件进行任何更改之前，我建议您首先备份您的 PHP 配置文件，如下所示：</p>
<pre><code class="hljs stylus">----------------在 CentOS/RHEL/Fedora 上---------------- 
$ sudo cp /etc/php<span class="hljs-selector-class">.ini</span> /etc/php<span class="hljs-selector-class">.ini</span><span class="hljs-selector-class">.orig</span>
---------------- 在 Debian/Ubuntu/Linux Mint 上---------------- 
$ sudo cp /etc/php/<span class="hljs-number">7.0</span>/cli/php<span class="hljs-selector-class">.ini</span>  /etc/php/<span class="hljs-number">7.0</span>/cli/php<span class="hljs-selector-class">.ini</span><span class="hljs-selector-class">.orig</span>  

</code></pre><p><a href="http://www.tecmint.com/linux-command-line-editors/">用你最喜欢的编辑器</a>，使用超级用户权限打开文件：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">----------------</span> 在 CentOS/RHEL/Fedora 上<span class="hljs-params">----------------</span> 
$ sudo vi <span class="hljs-string">/etc/php.ini</span>
<span class="hljs-params">----------------</span>在 Debian/Ubuntu/Linux Mint 上<span class="hljs-params">----------------</span> 
$ sudo vi <span class="hljs-string">/etc/php/7.0/cli/php.ini</span>

</code></pre><p>定位到关键词 <code>expose_php</code>，并将值设置成 <code>Off</code>：</p>
<pre><code class="hljs ini"><span class="hljs-attr">expose_php</span> = <span class="hljs-literal">Off</span>

</code></pre><p>保存并退出文件。之后，重启 web 服务器：</p>
<pre><code class="hljs routeros">---------------- 使用 SystemD ---------------- 
$ sudo systemctl restart httpd
$ sudo systemctl restart apache2 
---------------- 使用 SysVInit ---------------- 
$ sudo<span class="hljs-built_in"> service </span>httpd restart
$ sudo<span class="hljs-built_in"> service </span>apache2 restart

</code></pre><p>最后，不过同样重要，使用下面的命令检查服务器 HTTP 响应头是否仍然显示你的 PHP 版本号。</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> lynx -head -mime_header http:<span class="hljs-comment">//localhost </span>
或者
<span class="hljs-symbol">$</span> lynx -head -mime_header http:<span class="hljs-comment">//server-address</span>

</code></pre><p>这里的标志含义是：</p>
<ul>
<li><code>-head</code> – 发送一个请求 mime 报头的 HEAD 请求。</li>
<li><code>-mime_header</code> – 打印所提取文档的 MIME 标头及其源代码。</li>
</ul>
<p><strong>注意</strong>: 确保你系统中已经安装了<a href="http://www.tecmint.com/command-line-web-browsers/">命令行 web 浏览器 lynx</a>。</p>
<p>就是这样了！在本文中，我们解释了如何隐藏服务器 HTTP 响应头中的 PHP 版本号以保护 web 服务器免受可能的攻击。你可以在下面的评论栏中留下你的想法或者相关的问题。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin 及 web 开发者，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/hide-php-version-http-header/">http://www.tecmint.com/hide-php-version-http-header/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 HTTP 头中隐藏 PHP 版本号

## 原文链接
[https://www.zcfy.cc/article/how-to-hide-php-version-number-in-http-header](https://www.zcfy.cc/article/how-to-hide-php-version-number-in-http-header)

