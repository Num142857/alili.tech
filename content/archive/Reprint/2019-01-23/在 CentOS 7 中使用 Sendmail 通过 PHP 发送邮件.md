---
title: '在 CentOS 7 中使用 Sendmail 通过 PHP 发送邮件' 
date: 2019-01-23 2:30:08
hidden: true
slug: sctve1vc9s
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-centos-7-中使用-sendmail-通过-php-发送邮件"></a>在 CentOS 7 中使用 Sendmail 通过 PHP 发送邮件</h1>
<p>如果你运行了一个 web 服务器或者一台 VPS ，你可能需要在你的 PHP 程序中发送邮件。</p>
<p>同样，如果你正在运行一个 WordPress 博客，或者你正在使用任何类型的 CMS ，你允许你的访问者通过联系表单向你发送电子邮件（例如使用 WordPress 的*<a href="https://wordpress.org/plugins/contact-form-7/">Contact Form 7</a> 插件），你可能需要安装一个名为 <a href="http://www.sendmail.com/sm/open_source/">sendmail</a> 的简单的程序到你的 web 服务器上。</p>
<blockquote>
<p>Sendmail 是一个通用的互联网电子邮件投递工具，支持多种邮件传输和传递方法，包括用于通过 Internet 进行电子邮件传输的简单邮件传输协议（SMTP）。<a href="https://en.wikipedia.org/wiki/Sendmail">来自 Wikipedia</a>。</p>
</blockquote>
<p>Sendmail 可以通过你的发行版的软件包管理器安装。</p>
<p>以下是在 CentOS 7 上安装 Sendmail 的说明。</p>
<h3><a href="#安装"></a>安装</h3>
<p>要在 CentOS 7 中安装 CentOS 7 ，运行下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install sendmail</span>

</code></pre><h3><a href="#允许服务器可以发送邮件"></a>允许服务器可以发送邮件</h3>
<p>如果在 CentOS 7 中使用了 SELinux， 你需要使用下面的命令允许 sendmail 发送邮件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> setsebool -P httpd_can_sendmail=on</span>

</code></pre><h3><a href="#使用-php-发送一封测试邮件"></a>使用 PHP 发送一封测试邮件</h3>
<p>使用这个命令进入 php 交互 shell 中：</p>
<pre><code class="hljs stylus">php -<span class="hljs-selector-tag">a</span>

</code></pre><p>在交互 shell 中，粘贴下面的代码：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">mail</span> (<span class="hljs-string">'user<span class="hljs-variable">@receiver</span>.com'</span>, <span class="hljs-string">"Test email"</span>, <span class="hljs-string">"Test email from the Internet"</span>, null, <span class="hljs-string">"-f user<span class="hljs-variable">@sender</span>.com"</span>);

</code></pre><p>不要忘记将 <a href="mailto:`user@receiver.com">`user@receiver.com</a><code>和</code><a href="mailto:user@sender.com">user@sender.com</a>` 分别替换为你的收件地址和发件地址。</p>
<h3><a href="#浏览-sendmail-日志"></a>浏览 sendmail 日志</h3>
<p>要监控邮件日志，你可以使用这个命令：</p>
<pre><code class="hljs excel">tail /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/maillog

</code></pre><p>在服务器上安装 sendmail 完成后，你可以允许你的用户通过联系栏通过邮件联系你了。</p>
<hr>
<p>via: <a href="http://fasterland.net/sending-email-via-php-centos-7-using-sendmail.html">http://fasterland.net/sending-email-via-php-centos-7-using-sendmail.html</a></p>
<p>作者：<a href="http://fasterland.net/">Francesco Mondello</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 CentOS 7 中使用 Sendmail 通过 PHP 发送邮件

## 原文链接
[https://www.zcfy.cc/article/sending-email-via-php-in-centos-7-using-sendmail](https://www.zcfy.cc/article/sending-email-via-php-in-centos-7-using-sendmail)

