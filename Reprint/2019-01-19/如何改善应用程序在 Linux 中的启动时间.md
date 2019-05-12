---
title: '如何改善应用程序在 Linux 中的启动时间' 
date: 2019-01-19 2:30:10
hidden: true
slug: racs9q35k7
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何改善应用程序在-linux-中的启动时间"></a>如何改善应用程序在 Linux 中的启动时间</h1>
<p>大多数 Linux 发行版在默认配置下已经足够快了。但是，我们仍然可以借助一些额外的应用程序和方法让它们启动更快一点。其中一个可用的这种应用程序就是 Preload。它监视用户使用频率比较高的应用程序，并将它们添加到内存中，这样就比一般的方式加载更快一点。因为，正如你所知道的，内存的读取速度远远快于硬盘。Preload 以守护进程的方式在后台中运行，并记录用户使用较为频繁的程序的文件使用相关的统计数据。然后，它将这些二进制文件及它们的依赖项加载进内存，以改善应用程序的加载时间。简而言之，一旦安装了 Preload，你使用较为频繁的应用程序将可能加载的更快。</p>
<p>在这篇详细的教程中，我们将去了解如何安装和使用 Preload，以改善应用程序在 Linux 中的启动时间。</p>
<h3><a href="#在-linux-中使用-preload-改善应用程序启动时间"></a>在 Linux 中使用 Preload 改善应用程序启动时间</h3>
<p>Preload 可以在 <a href="https://aur.archlinux.org/packages/preload/">AUR</a> 上找到。因此，你可以使用 AUR 助理程序在任何基于 Arch 的系统上去安装它，比如，Antergos、Manjaro Linux。</p>
<p>使用 <a href="https://www.ostechnix.com/install-pacaur-arch-linux/">Pacaur</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pacaur -S preload</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-packer-arch-linux-2/">Packer</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> packer -S preload</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/trizen-lightweight-aur-package-manager-arch-based-systems/">Trizen</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> trizen -S preload</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/yay-found-yet-another-reliable-aur-helper/">Yay</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yay -S preload</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-yaourt-arch-linux/">Yaourt</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yaourt -S preload</span>

</code></pre><p>在 Debian、Ubuntu、Linux Mint 上，Preload 可以在默认仓库中找到。因此，你可以像下面一样，使用 APT 包管理器去安装它。</p>
<pre><code class="hljs routeros">$ sudo apt-<span class="hljs-builtin-name">get</span> install preload

</code></pre><p>Preload 安装完成后，重新启动你的系统。从现在开始，Preload 将监视频繁使用的应用程序，并将它们的二进制文件和库添加到内存中，以使它的启动速度更快。比如，如果你经常使用 Firefox、Chrome 以及 LibreOffice，Preload 将添加这些二进制文件和库到内存中，因此，这些应用程序将启动的更快。而且更好的是，它不需要做任何配置。它是开箱即用的。但是，如果你想去对它进行微调，你可以通过编辑缺省的配置文件 <code>/etc/preload.conf</code> 来实现。</p>
<h3><a href="#preload-并不一定适合每个人"></a>Preload 并不一定适合每个人！</h3>
<p>以下是 Preload 的一些缺点，它并不是对每个人都有帮助，在这个 <a href="https://askubuntu.com/questions/110335/drawbacks-of-using-preload-why-isnt-it-included-by-default">跟贴</a> 中有讨论到。</p>
<ol>
<li>我使用的是一个有 8GB 内存的现代系统。因此，我的系统总体上来说很快。我每天只打开狂吃内存的应用程序（比如，Firefox、Chrome、VirtualBox、Gimp 等等）一到两次，并且它们始终处于打开状态，因此，它们的二进制文件和库被预读到内存中，并始终整天在内存中。我一般很少去关闭和打开这些应用程序，因此，内存使用纯属浪费。</li>
<li>如果你使用的是带有 SSD 的现代系统，Preload 是绝对没用的。因为 SSD 的访问时间比起一般的硬盘来要快的多，因此，使用 Preload 是没有意义的。</li>
<li>Preload 显著影响启动时间。因为更多的应用程序要被预读到内存中，这将让你的系统启动运行时间更长。</li>
</ol>
<p>你只有在每天都在大量的重新加载应用程序时，才能看到真正的差别。因此，Preload 最适合开发人员和测试人员，他们每天都打开和关闭应用程序好多次。</p>
<p>关于 Preload 更多的信息和它是如何工作的，请阅读它的作者写的完整版的 <a href="https://cs.uwaterloo.ca/%7Ebrecht/courses/702/Possible-Readings/prefetching-to-memory/preload-thesis.pdf">Preload 论文</a>。</p>
<p>教程到此为止，希望能帮到你。后面还有更精彩的内容，请继续关注！</p>
<p>再见！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/how-to-improve-application-startup-time-in-linux/">https://www.ostechnix.com/how-to-improve-application-startup-time-in-linux/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何改善应用程序在 Linux 中的启动时间

## 原文链接
[https://www.zcfy.cc/article/how-to-improve-application-startup-time-in-linux](https://www.zcfy.cc/article/how-to-improve-application-startup-time-in-linux)

