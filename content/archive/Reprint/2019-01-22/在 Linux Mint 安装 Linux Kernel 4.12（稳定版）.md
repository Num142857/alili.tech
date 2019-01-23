---
title: '在 Linux Mint 安装 Linux Kernel 4.12（稳定版）' 
date: 2019-01-22 2:30:08
hidden: true
slug: btjo0j37yj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-mint-安装-linux-kernel-412稳定版"></a>在 Linux Mint 安装 Linux Kernel 4.12（稳定版）</h1>
<p><strong>Linus Torvalds</strong> 发布了 <strong>Linux 内核 4.12</strong>。你可以从<strong><a href="https://mintguide.org/engine/dude/index/leech_out.php?a%3AaHR0cDovL2tlcm5lbC51YnVudHUuY29tL35rZXJuZWwtcHBhL21haW5saW5lL3Y0LjEyLw%3D%3D">这里</a></strong>直接下载相关的 <strong>deb</strong> 包来安装。或者，继续阅读本文，按下面的步骤安装新内核。</p>
<p><strong>警告：Linux 内核 是系统的关键元素。在某个硬件设备不正常工作时，可以尝试执行升级，新的内核可能会解决此问题。 但同样的，非必须地更新一个新的内核也可能导致不必要的回滚，例如，无网络连接， 没有声音，甚至是无法正常启动系统，所以安装一个新的内核，请正确认识风险。</strong></p>
<p>最简单的安装任意内核方法 - 在<strong>Linux Mint</strong> 使用 <a href="https://mintguide.org/tools/691-ukuu-ubuntu-kernel-upgrade-utility.html">UKUU</a>。</p>
<pre><code class="hljs vim">TerminalShekin@mylinuxmintpc~$sudo apt-<span class="hljs-built_in">add</span>-repository -<span class="hljs-keyword">y</span> <span class="hljs-keyword">pp</span><span class="hljs-variable">a:teejee2008</span>/ppa 
sudo apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>
sudo apt-<span class="hljs-built_in">get</span> install ukuu

</code></pre><p><strong>提醒：所有的 Nvidia/AMD 电脑用户， 在安装内核之前，建议切换到 free 版本的驱动。</strong></p>
<p><strong>如果决定删除内核 4.12，</strong></p>
<ol>
<li>首先，重启计算机，选择 GRUB 菜单中的旧内核启动。系统引导完成之后，通过以下命令删除新的内核：</li>
<li>然后，使用 <a href="https://mintguide.org/tools/691-ukuu-ubuntu-kernel-upgrade-utility.html">UKUU</a> 程序，或者命令：<code>sudo apt purge linux-image-4.12-*</code></li>
<li>最后，更新 <strong>GRUB</strong> 或者 <strong><a href="https://mintguide.org/effects/716-burg-graphical-bootloader-install-to-linux-mint.html">BURG</a></strong>：<code>sudo update-grub</code></li>
</ol>
<p>在启动 <strong>GRUB</strong> 的时候，选择<strong>以前的 Linux 版本</strong>即可回到以前版本的内核。</p>
<p>Good Luck!!!</p>
<hr>
<p>via: <a href="https://mintguide.org/system/798-install-linux-kernel-4-12-stable-on-linux-mint.html">https://mintguide.org/system/798-install-linux-kernel-4-12-stable-on-linux-mint.html</a></p>
<p>作者：<a href="https://mintguide.org/user/Shekin/">Shekin</a> 译者：<a href="https://vicyu.com">VicYu</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux Mint 安装 Linux Kernel 4.12（稳定版）

## 原文链接
[https://www.zcfy.cc/article/install-linux-kernel-4-12-stable-on-linux-mint](https://www.zcfy.cc/article/install-linux-kernel-4-12-stable-on-linux-mint)

