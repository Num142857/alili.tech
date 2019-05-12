---
title: '在 CentOS 和 RHEL 系统上安装安全补丁或自动更新' 
date: 2019-01-24 2:30:11
hidden: true
slug: tet7qxtzsaq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-centos-和-rhel-系统上安装安全补丁或自动更新"></a>在 CentOS 和 RHEL 系统上安装安全补丁或自动更新</h1>
<p>在 Linux 系统上，一个最重要的需求就是为相应的 Linux 版本定期安装最新的安全补丁，或者更新。</p>
<p>在之前的文章中，我们分享了<a href="http://www.tecmint.com/auto-install-security-updates-on-debian-and-ubuntu/">如何在 Debian/Ubuntu 上配置自动安全更新</a>，在这篇文章中，我们将分享如何在 CentOS/RHEL 7/6 版本中设置在需要时自动更新重要的安全补丁。</p>
<p>和它同一家族的其它 Linux 版本（Fedora 或 Scientific Linux）中可以用类似的方法进行配置。</p>
<h3><a href="#在-centosrhel-系统上配置自动安全更新"></a>在 CentOS/RHEL 系统上配置自动安全更新</h3>
<p>在 CentOS/RHEL 7/6 系统上，你需要安装下面的安装包：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum update -y &amp;&amp; yum install yum-cron -y</span>

</code></pre><h3><a href="#在-centosrhel-7系统上启用自动安全更新"></a>在 CentOS/RHEL 7　系统上启用自动安全更新</h3>
<p>安装完成以后，打开 <code>/etc/yum/yum-cron.conf</code>，然后找到下面这些行内容，你必须确保它们的值和下面展示的一样</p>
<pre><code class="hljs ini"><span class="hljs-attr">update_cmd</span> = security
<span class="hljs-attr">update_messages</span> = <span class="hljs-literal">yes</span>
<span class="hljs-attr">download_updates</span> = <span class="hljs-literal">yes</span>
<span class="hljs-attr">apply_updates</span> = <span class="hljs-literal">yes</span>

</code></pre><p>第一行表明自动更新命令行应该像这样：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum --security upgrade</span>

</code></pre><p>而其它的行保证了能够通知并自动下载、安装安全升级。</p>
<p>为了使来自 root@localhost 的通知能够通过邮件发送给同一账户（再次说明，你可以选择其他账户，如果你想这样的话），下面这些行也是必须的。</p>
<pre><code class="hljs ini"><span class="hljs-attr">emit_via</span> = email
<span class="hljs-attr">email_from</span> = root@localhost
<span class="hljs-attr">email_to</span> = root

</code></pre><h3><a href="#在-centosrhel-6-上启用自动安全更新"></a>在 CentOS/RHEL 6 上启用自动安全更新</h3>
<p>默认情况下， cron 任务被配置成了立即下载并安装所有更新，但是我们可以通过在 <code>/etc/sysconfig/yum-cron</code> 配置文件中把下面两个参数改为 <code>yes</code>，从而改变这种行为。</p>
<pre><code class="hljs ini"><span class="hljs-comment"># 不要安装，只做检查（有效值： yes|no）</span>
<span class="hljs-attr">CHECK_ONLY</span>=<span class="hljs-literal">yes</span>
<span class="hljs-comment"># 不要安装，只做检查和下载（有效值： yes|no）</span>
<span class="hljs-comment"># 要求 CHECK_ONLY=yes（先要检查后才可以知道要下载什么）</span>
<span class="hljs-attr">DOWNLOAD_ONLY</span>=<span class="hljs-literal">yes</span>

</code></pre><p>为了启用关于安装包更新的邮件通知，你需要把 <code>MAILTO</code> 参数设置为一个有效的邮件地址。</p>
<pre><code class="hljs ini"><span class="hljs-comment"># 默认情况下 MAILTO 是没有设置的，crond 会将输出发送邮件给自己（LCTT 译注：执行 cron 的用户，这里是 root）</span>
<span class="hljs-comment"># 例子： MAILTO=root</span>
<span class="hljs-attr">MAILTO</span>=admin@tecmint.com

</code></pre><p>最后，打开并启用 <code>yum-cron</code> 服务：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">-------------</span> On CentOS/RHEL 7 <span class="hljs-params">-------------</span> 
systemctl start yum-cron
systemctl enable yum-cron
<span class="hljs-params">-------------</span> On CentOS/RHEL 6 <span class="hljs-params">-------------</span>  
<span class="hljs-comment"># service yum-cron start</span>
<span class="hljs-comment"># chkconfig --level 35 yum-cron on</span>

</code></pre><p>恭喜你，你已经成功的在 CentOS/RHEL 7/6 系统上设置了自动升级。</p>
<h3><a href="#总结"></a>总结</h3>
<p>在这篇文章中，我们讨论了如何保持你的服务器定期更新或升级最新的安全补丁。另外，为了保证当新的补丁被应用时你自己能够知道，你也学习了如何配置邮件通知。</p>
<p>如果你有任何关于这篇文章的疑问，请在下面的评论区留下你的问题。我们期待收到你的回复。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/auto-install-security-patches-updates-on-centos-rhel/">http://www.tecmint.com/auto-install-security-patches-updates-on-centos-rhel/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 CentOS 和 RHEL 系统上安装安全补丁或自动更新

## 原文链接
[https://www.zcfy.cc/article/install-security-patches-or-updates-automatically-on-centos-and-rhel](https://www.zcfy.cc/article/install-security-patches-or-updates-automatically-on-centos-and-rhel)

