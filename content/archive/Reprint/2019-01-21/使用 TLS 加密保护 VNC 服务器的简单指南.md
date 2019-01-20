---
title: '使用 TLS 加密保护 VNC 服务器的简单指南' 
date: 2019-01-21 2:30:06
hidden: true
slug: itmonshhhea
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-tls-加密保护-vnc-服务器的简单指南"></a>使用 TLS 加密保护 VNC 服务器的简单指南</h1>
<p>在本教程中，我们将学习安装 VNC 服务器并使用 TLS 加密保护 VNC 会话。</p>
<p>此方法已经在 CentOS 6＆7 上测试过了，但是也可以在其它的版本/操作系统上运行（RHEL、Scientific Linux 等）。</p>
<p><strong>（推荐阅读：<a href="http://linuxtechlab.com/ultimate-guide-to-securing-ssh-sessions/">保护 SSH 会话终极指南</a>）</strong></p>
<h3><a href="#安装-vnc-服务器"></a>安装 VNC 服务器</h3>
<p>在机器上安装 VNC 服务器之前，请确保我们有一个可用的 GUI（图形用户界面）。如果机器上还没有安装 GUI，我们可以通过执行以下命令来安装：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">yum</span> groupinstall <span class="hljs-string">"GNOME Desktop"</span>

</code></pre><p>现在我们将 tigervnc 作为我们的 VNC 服务器，运行下面的命令运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install tigervnc-server</span>

</code></pre><p>安装完成后，我们将创建一个新的用户访问服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd vncuser</span>

</code></pre><p>并使用以下命令为其分配访问 VNC 的密码：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vncpasswd vncuser</span>

</code></pre><p>我们在 CentOS 6&amp;7 上配置会有一点改变，我们首先看 CentOS 6 的配置。</p>
<h4><a href="#centos-6"></a>CentOS 6</h4>
<p>现在我们需要编辑 VNC 配置文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vim /etc/sysconfig/vncservers</span>

</code></pre><p>并添加下面这几行：</p>
<pre><code class="hljs ini"><span class="hljs-section">[ …]</span>
<span class="hljs-attr">VNCSERVERS</span>= <span class="hljs-string">"1:vncuser"</span>
<span class="hljs-attr">VNCSERVERARGS[1]</span>= <span class="hljs-string">"-geometry 1024×768″

</span></code></pre><p>保存文件并退出。接下来重启 vnc 服务使改动生效：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> service vncserver restart</span>

</code></pre><p>并在启动时启用它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chkconfig vncserver on</span>

</code></pre><h4><a href="#centos-7"></a>CentOS 7</h4>
<p>在 CentOS 7 上，<code>/etc/sysconfig/vncservers</code> 已经改为 <code>/lib/systemd/system/vncserver@.service</code>。我们将使用这个配置文件作为参考，所以创建一个文件的副本，</p>
<pre><code class="hljs gradle"># cp <span class="hljs-regexp">/lib/</span>systemd<span class="hljs-regexp">/system/</span>vncserver@.service <span class="hljs-regexp">/etc/</span>systemd<span class="hljs-regexp">/system/</span>vncserver@:<span class="hljs-number">1</span>.service

</code></pre><p>接下来，我们将编辑文件以包含我们创建的用户：</p>
<pre><code class="hljs clean"># vim /etc/systemd/<span class="hljs-keyword">system</span>/vncserver@:<span class="hljs-number">1.</span>service

</code></pre><p>编辑下面 2 行中的用户：</p>
<pre><code class="hljs ini"><span class="hljs-attr">ExecStart</span>=/sbin/runuser -l vncuser -c <span class="hljs-string">"/usr/bin/vncserver %i"</span>
<span class="hljs-attr">PIDFile</span>=/home/vncuser/.vnc/%H%i.pid

</code></pre><p>保存文件并退出。接下来重启服务并在启动时启用它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart vncserver@:1.service</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> vncserver@:1.service</span>

</code></pre><p>现在我们已经设置好了 VNC 服务器，并且可以使用 VNC 服务器的 IP 地址从客户机连接到它。但是，在此之前，我们将使用 TLS 加密保护我们的连接。</p>
<h3><a href="#保护-vnc-会话"></a>保护 VNC 会话</h3>
<p>要保护 VNC 会话，我们将首先配置加密方法。我们将使用 TLS 加密，但也可以使用 SSL 加密。执行以下命令在 VNC 服务器上使用 TLS 加密：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vncserver -SecurityTypes=VeNCrypt,TLSVnc</span>

</code></pre><p>你将被要求输入密码来访问 VNC（如果使用其他用户，而不是上述用户）。</p>
<p><a href="https://camo.githubusercontent.com/0b1f081ade950b6d7f158fa6a78c3530851436f0/68747470733a2f2f69312e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f7365637572655f766e632d312e706e673f726573697a653d363432253243323431"><img src="https://p0.ssl.qhimg.com/t0179da9b5117134a0d.png" alt="secure vnc server"></a></p>
<p>现在，我们可以使用客户机上的 VNC 浏览器访问服务器，使用以下命令以安全连接启动 vnc 浏览器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vncviewer -SecurityTypes=VeNCrypt,TLSVnc 192.168.1.45:1</span>

</code></pre><p>这里，192.168.1.45 是 VNC 服务器的 IP 地址。</p>
<p><a href="https://camo.githubusercontent.com/39b9854355c5cea462c06f17f93d98f370d960ce/68747470733a2f2f69322e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f7365637572655f766e632d322e706e673f726573697a653d363635253243343139"><img src="https://p0.ssl.qhimg.com/t01300e6c72fcec208b.png" alt="secure vnc server"></a></p>
<p>输入密码，我们可以远程访问服务器，并且也是 TLS 加密的。</p>
<p>这篇教程就完了，欢迎随时使用下面的评论栏提交你的建议或疑问。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/secure-vnc-server-tls-encryption/">http://linuxtechlab.com/secure-vnc-server-tls-encryption/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 TLS 加密保护 VNC 服务器的简单指南

## 原文链接
[https://www.zcfy.cc/article/easy-guide-to-secure-vnc-server-with-tls-encryption](https://www.zcfy.cc/article/easy-guide-to-secure-vnc-server-with-tls-encryption)

