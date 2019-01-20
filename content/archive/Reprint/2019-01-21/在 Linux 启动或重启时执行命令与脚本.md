---
title: '在 Linux 启动或重启时执行命令与脚本' 
date: 2019-01-21 2:30:06
hidden: true
slug: 1a61knsqubo
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-启动或重启时执行命令与脚本"></a>在 Linux 启动或重启时执行命令与脚本</h1>
<p>有时可能会需要在重启时或者每次系统启动时运行某些命令或者脚本。我们要怎样做呢？本文中我们就对此进行讨论。 我们会用两种方法来描述如何在 CentOS/RHEL 以及 Ubuntu 系统上做到重启或者系统启动时执行命令和脚本。 两种方法都通过了测试。</p>
<h3><a href="#方法-1--使用-rclocal"></a>方法 1 – 使用 rc.local</h3>
<p>这种方法会利用 <code>/etc/</code> 中的 <code>rc.local</code> 文件来在启动时执行脚本与命令。我们在文件中加上一行来执行脚本，这样每次启动系统时，都会执行该脚本。</p>
<p>不过我们首先需要为 <code>/etc/rc.local</code> 添加执行权限，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo chmod +x /etc/rc.local</span>

</code></pre><p>然后将要执行的脚本加入其中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vi /etc/rc.local</span>

</code></pre><p>在文件最后加上：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">sh</span> /root/script.<span class="hljs-keyword">sh</span> &amp;

</code></pre><p>然后保存文件并退出。使用 <code>rc.local</code> 文件来执行命令也是一样的，但是一定要记得填写命令的完整路径。 想知道命令的完整路径可以运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">which</span> <span class="hljs-built_in">command</span></span>

</code></pre><p>比如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">which</span> shutter</span>
/usr/bin/shutter

</code></pre><p>如果是 CentOS，我们修改的是文件 <code>/etc/rc.d/rc.local</code> 而不是 <code>/etc/rc.local</code>。 不过我们也需要先为该文件添加可执行权限。</p>
<p>注意:- 启动时执行的脚本，请一定保证是以 <code>exit 0</code> 结尾的。</p>
<h3><a href="#方法-2--使用-crontab"></a>方法 2 – 使用 Crontab</h3>
<p>该方法最简单了。我们创建一个 cron 任务，这个任务在系统启动后等待 90 秒，然后执行命令和脚本。</p>
<p>要创建 cron 任务，打开终端并执行</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -e</span>

</code></pre><p>然后输入下行内容，</p>
<pre><code class="hljs css">@<span class="hljs-keyword">reboot</span> ( sleep <span class="hljs-number">90</span> ; <span class="hljs-selector-tag">sh</span> \<span class="hljs-selector-tag">location</span>\<span class="hljs-selector-tag">script</span><span class="hljs-selector-class">.sh</span> )

</code></pre><p>这里 <code>\location\script.sh</code> 就是待执行脚本的地址。</p>
<p>我们的文章至此就完了。如有疑问，欢迎留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/executing-commands-scripts-at-reboot/">http://linuxtechlab.com/executing-commands-scripts-at-reboot/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 启动或重启时执行命令与脚本

## 原文链接
[https://www.zcfy.cc/article/executing-commands-and-scripts-at-reboot-amp-startup-in-linux](https://www.zcfy.cc/article/executing-commands-and-scripts-at-reboot-amp-startup-in-linux)

