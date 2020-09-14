---
title: '如何在 Debian 和 Ubuntu 系统上自动安装安全更新' 
date: 2019-01-24 2:30:11
hidden: true
slug: 346wbzi9jkk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-debian-和-ubuntu-系统上自动安装安全更新"></a>如何在 Debian 和 Ubuntu 系统上自动安装安全更新</h1>
<p>之前已经说过，一些最优秀的系统管理员看上去（注意这里使用的词是 seem（看上去））总是很“懒”的，这句话我再同意不过了。</p>
<p>虽然这句话听起来有点荒谬，但我敢打赌在大多数情况下它是对的－不是因为他们不去做他们原本应该做的事情，而是因为他们已经让系统自动去完成这样的事情了。</p>
<p>对于 Linux 系统来说，一个最关键的需求是为相应的 Linux 版本保持更新最新的安全补丁。</p>
<p>在这篇文章中，我们将讨论如何在 Debian 和 Ubuntu 系统上进行设置，从而实现自动安装或更新重要的安装包或补丁。</p>
<p>其他的 Linux 版本：<a href="https://linux.cn/article-8015-1.html">CentOS/RHEL 配置自动安装安全更新</a></p>
<p>不必多说，为了执行这篇文章中所讲到的任务，你需要有超级用户特权。</p>
<h3><a href="#在-debianubuntu-上配置自动安全更新"></a>在 Debian/Ubuntu 上配置自动安全更新</h3>
<p>首先，安装下面这些安装包：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> aptitude update -y &amp;&amp; aptitude install unattended-upgrades apt-listchanges -y</span>

</code></pre><p><code>apt-listchanges</code> 将会通知你在升级过程中发生的改变。</p>
<p>接下来，用你最喜欢的文本编辑器打开 <code>/etc/apt/apt.conf.d/50unattended-upgrades</code>，然后在 <code>Unattended-Upgrade::Origins-Pattern</code> 块中间加入下面这行内容：</p>
<pre><code class="hljs cpp">Unattended-Upgrade::Mail <span class="hljs-string">"root"</span>;

</code></pre><p>最后，执行下面的命令来生成所需的配置文件（<code>/etc/apt/apt.conf.d/20auto-upgrades</code>），从而激活自动更新：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> dpkg-reconfigure -plow unattended-upgrades</span>

</code></pre><p>当提示安装自动升级时，选择 'Yes'：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Configure-Unattended-Security-Updates-on-Debian.png"><img src="https://p5.ssl.qhimg.com/t01f5768f3e7c379c02.png" alt="在 Debian 上配置自动安装更新"></a></p>
<p><em>在 Debian 上配置自动安装更新</em></p>
<p>然后检查下面这两行是否已经加入到文件 <code>/etc/apt/apt.conf.d/20auto-upgrades</code> 中了：</p>
<pre><code class="hljs elixir"><span class="hljs-symbol">APT:</span><span class="hljs-symbol">:Periodic</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:Update-Package-Lists</span> <span class="hljs-string">"1"</span>;
<span class="hljs-symbol">APT:</span><span class="hljs-symbol">:Periodic</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:Unattended-Upgrade</span> <span class="hljs-string">"1"</span>;

</code></pre><p>增加下面这行内容使通知更加详细：</p>
<pre><code class="hljs cpp">APT::Periodic::Verbose <span class="hljs-string">"2"</span>;

</code></pre><p>最后，检查 <code>/etc/apt/listchanges.conf</code> 来确保通知能被发送给 root 用户。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Notify-Security-Updates-on-Debian.png"><img src="https://p5.ssl.qhimg.com/t010853b49d256b5493.png" alt="Debian 系统上提示安全更新"></a></p>
<p><em>在 Debian 系统上提示安全更新</em></p>
<p>在这篇文章中，我们讨论了如何确保你的系统定期更新最新的安全补丁。另外，你也学习了如何设置提示，从而确保应用了新的补丁时你能够被通知到。</p>
<p>你有任何关于这篇文章的问题吗？你可以在下面的评论栏留下你的问题。我们期待收到你的回复。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/auto-install-security-updates-on-debian-and-ubuntu">http://www.tecmint.com/auto-install-security-updates-on-debian-and-ubuntu</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 组织编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Debian 和 Ubuntu 系统上自动安装安全更新

## 原文链接
[https://www.zcfy.cc/article/how-to-install-security-updates-automatically-on-debian-and-ubuntu](https://www.zcfy.cc/article/how-to-install-security-updates-automatically-on-debian-and-ubuntu)

