---
title: '如何使用 lftp 来加速 Linux/UNIX 上的 ftp/https 下载速度' 
date: 2019-01-21 2:30:06
hidden: true
slug: hkmb0199m1
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-lftp-来加速-linuxunix-上的-ftphttps-下载速度"></a>如何使用 lftp 来加速 Linux/UNIX 上的 ftp/https 下载速度</h1>
<p><code>lftp</code> 是一个文件传输程序。它可以用于复杂的 FTP、 HTTP/HTTPS 和其他连接。如果指定了站点 URL，那么 <code>lftp</code> 将连接到该站点，否则会使用 <code>open</code> 命令建立连接。它是所有 Linux/Unix 命令行用户的必备工具。我目前写了一些关于 <a href="https://www.cyberciti.biz/tips/download-accelerator-for-linux-command-line-tools.html">Linux 下超快命令行下载加速器</a>，比如 Axel 和 prozilla。<code>lftp</code> 是另一个能做相同的事，但有更多功能的工具。<code>lftp</code> 可以处理七种文件访问方式：</p>
<ol>
<li>ftp</li>
<li>ftps</li>
<li>http</li>
<li>https</li>
<li>hftp</li>
<li>fish</li>
<li>sftp</li>
<li>file</li>
</ol>
<h3><a href="#那么-lftp-的独特之处是什么"></a>那么 lftp 的独特之处是什么？</h3>
<ul>
<li><code>lftp</code> 中的每个操作都是可靠的，即任何非致命错误都被忽略，并且重复进行操作。所以如果下载中断，它会自动重新启动。即使 FTP 服务器不支持 <code>REST</code> 命令，lftp 也会尝试从开头检索文件，直到文件传输完成。</li>
<li><code>lftp</code> 具有类似 shell 的命令语法，允许你在后台并行启动多个命令。</li>
<li><code>lftp</code> 有一个内置的镜像功能，可以下载或更新整个目录树。还有一个反向镜像功能（<code>mirror -R</code>），它可以上传或更新服务器上的目录树。镜像也可以在两个远程服务器之间同步目录，如果可用的话会使用 FXP。</li>
</ul>
<h3><a href="#如何使用-lftp-作为下载加速器"></a>如何使用 lftp 作为下载加速器</h3>
<p><code>lftp</code> 有 <code>pget</code> 命令。它能让你并行下载。语法是：</p>
<pre><code class="hljs ada">lftp -e <span class="hljs-symbol">'pget</span> -n NUM -c url; <span class="hljs-keyword">exit</span>'

</code></pre><p>例如，使用 <code>pget</code> 分 5个部分下载 <a href="http://kernel.org/pub/linux/kernel/v2.6/linux-2.6.22.2.tar.bz2">http://kernel.org/pub/linux/kernel/v2.6/linux-2.6.22.2.tar.bz2</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> /tmp </span>
<span class="hljs-meta">$</span><span class="bash"> lftp -e <span class="hljs-string">'pget -n 5 -c http://kernel.org/pub/linux/kernel/v2.6/linux-2.6.22.2.tar.bz2'</span></span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs elixir"><span class="hljs-number">45108964</span> bytes transferred <span class="hljs-keyword">in</span> <span class="hljs-number">57</span> seconds (<span class="hljs-number">775.3</span>K/s)
lftp <span class="hljs-symbol">:~&gt;quit</span>

</code></pre><p>这里：</p>
<ol>
<li><code>pget</code> - 并行下载文件</li>
<li><code>-n 5</code> - 将最大连接数设置为 5</li>
<li><code>-c</code> - 如果当前目录存在 <code>lfile.lftp-pget-status</code>，则继续中断的传输</li>
</ol>
<h3><a href="#如何在-linuxunix-中使用-lftp-来加速-ftphttps下载"></a>如何在 Linux/Unix 中使用 lftp 来加速 ftp/https下载</h3>
<p>再尝试添加 <code>exit</code> 命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> lftp -e <span class="hljs-string">'pget -n 10 -c https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.15.tar.xz; exit'</span></span>

</code></pre><p><a href="https://www.cyberciti.biz/tips/wp-content/uploads/2007/08/Linux-lftp-command-demo.mp4">Linux-lftp-command-demo</a></p>
<h3><a href="#关于并行下载的说明"></a>关于并行下载的说明</h3>
<p>请注意，通过使用下载加速器，你将增加远程服务器负载。另请注意，<code>lftp</code> 可能无法在不支持多点下载的站点上工作，或者防火墙阻止了此类请求。</p>
<p>其它的命令提供了更多功能。有关更多信息，请参考 <a href="https://lftp.yar.ru/">lftp</a> 的 man 页面：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">man lftp</span>

</code></pre><h3><a href="#关于作者"></a>关于作者</h3>
<p>作者是 nixCraft 的创建者，经验丰富的系统管理员，也是 Linux 操作系统/Unix shell 脚本的培训师。他曾与全球客户以及IT、教育、国防和太空研究以及非营利部门等多个行业合作。在 [Twitter][9]、[Facebook][10]、[Google +][11] 上关注他。通过 <a href="https://plus.google.com/+CybercitiBiz">RSS/XML 订阅</a>获取最新的系统管理、Linux/Unix 以及开源主题教程。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/linux-unix-download-accelerator.html">https://www.cyberciti.biz/tips/linux-unix-download-accelerator.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 lftp 来加速 Linux/UNIX 上的 ftp/https 下载速度

## 原文链接
[https://www.zcfy.cc/article/how-to-use-lftp-to-accelerate-ftp-https-download-speed-on-linux-unix](https://www.zcfy.cc/article/how-to-use-lftp-to-accelerate-ftp-https-download-speed-on-linux-unix)

