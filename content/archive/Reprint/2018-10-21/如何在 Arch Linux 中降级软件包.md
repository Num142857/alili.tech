---
title: 如何在 Arch Linux 中降级软件包
hidden: true
categories: [reprint]
slug: dd1d712b
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#如何在-arch-linux-中降级软件包"></a>如何在 Arch Linux 中降级软件包</h1>
<p>正如你了解的，Arch Linux 是一个滚动版本和 DIY（自己动手）发行版。因此，在经常更新时必须小心，特别是从 AUR 等第三方存储库安装或更新软件包。如果你不知道自己在做什么，那么最终很可能会破坏系统。你有责任使 Arch Linux 更加稳定。但是，我们都会犯错误，要时刻小心是很难的。有时候，你想更新到最新的版本，但你可能会被破损的包卡住。不要惊慌！在这种情况下，你可以简单地回滚到旧的稳定包。这个简短的教程描述了如何在 Arch Linux 中以及它的变体，如 Antergos，Manjaro Linux 中降级一个包，</p>
<h3><a href="#在-arch-linux-中降级一个包"></a>在 Arch Linux 中降级一个包</h3>
<p>在 Arch Linux 中，有一个名为 “downgrade” 的实用程序，可帮助你将安装的软件包降级为任何可用的旧版本。此实用程序将检查你的本地缓存和远程服务器（Arch Linux 仓库）以查找所需软件包的旧版本。你可以从该列表中选择任何一个旧的稳定的软件包并进行安装。</p>
<p>该软件包在官方仓库中不可用，你需要添加非官方的 <strong>archlinuxfr</strong> 仓库。</p>
<p>为此，请编辑 <code>/etc/pacman.conf</code> 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo nano /etc/pacman.conf</span>

</code></pre><p>添加以下行：</p>
<pre><code class="hljs ini"><span class="hljs-section">[archlinuxfr]</span>
<span class="hljs-attr">SigLevel</span> = Never
<span class="hljs-attr">Server</span> = http://repo.archlinux.fr/<span class="hljs-variable">$arch</span>

</code></pre><p>保存并关闭文件。</p>
<p>使用以下命令来更新仓库：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo pacman -Sy</span>

</code></pre><p>然后在终端中使用以下命令安装 “Downgrade” 实用程序：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo pacman -S downgrade</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">resolving</span> <span class="hljs-selector-tag">dependencies</span>...
 <span class="hljs-selector-tag">looking</span> <span class="hljs-selector-tag">for</span> <span class="hljs-selector-tag">conflicting</span> <span class="hljs-selector-tag">packages</span>...

<span class="hljs-selector-tag">Packages</span> (1) <span class="hljs-selector-tag">downgrade-5</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.3-1</span>

<span class="hljs-selector-tag">Total</span> <span class="hljs-selector-tag">Download</span> <span class="hljs-selector-tag">Size</span>: 0<span class="hljs-selector-class">.01</span> <span class="hljs-selector-tag">MiB</span>
 <span class="hljs-selector-tag">Total</span> <span class="hljs-selector-tag">Installed</span> <span class="hljs-selector-tag">Size</span>: 0<span class="hljs-selector-class">.10</span> <span class="hljs-selector-tag">MiB</span>

:: <span class="hljs-selector-tag">Proceed</span> <span class="hljs-selector-tag">with</span> <span class="hljs-selector-tag">installation</span>? <span class="hljs-selector-attr">[Y/n]</span>

</code></pre><p>“downgrade” 命令的典型用法是：</p>
<pre><code class="hljs inform7">$ sudo downgrade <span class="hljs-comment">[PACKAGE, ...]</span> <span class="hljs-comment">[-- <span class="hljs-comment">[PACMAN OPTIONS]</span>]</span>

</code></pre><p>让我们假设你想要将 opera web 浏览器 降级到任何可用的旧版本。</p>
<p>为此，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo downgrade opera</span>

</code></pre><p>此命令将从本地缓存和远程镜像列出所有可用的 opera 包（新旧两种版本）。</p>
<p>示例输出：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">Available</span> <span class="hljs-selector-tag">packages</span>:

 1) <span class="hljs-selector-tag">opera-37</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2178</span><span class="hljs-selector-class">.43-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">local</span>)
 2) <span class="hljs-selector-tag">opera-37</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2178</span><span class="hljs-selector-class">.43-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 3) <span class="hljs-selector-tag">opera-37</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2178</span><span class="hljs-selector-class">.32-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 4) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.65-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 5) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.65-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 6) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.46-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 7) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.46-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 8) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.32-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 9) <span class="hljs-selector-tag">opera-36</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2130</span><span class="hljs-selector-class">.32-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 10) <span class="hljs-selector-tag">opera-35</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2066</span><span class="hljs-selector-class">.92-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 11) <span class="hljs-selector-tag">opera-35</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2066</span><span class="hljs-selector-class">.82-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 12) <span class="hljs-selector-tag">opera-35</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2066</span><span class="hljs-selector-class">.68-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 13) <span class="hljs-selector-tag">opera-35</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2066</span><span class="hljs-selector-class">.37-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 14) <span class="hljs-selector-tag">opera-34</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2036</span><span class="hljs-selector-class">.50-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 15) <span class="hljs-selector-tag">opera-34</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2036</span><span class="hljs-selector-class">.47-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 16) <span class="hljs-selector-tag">opera-34</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2036</span><span class="hljs-selector-class">.25-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 17) <span class="hljs-selector-tag">opera-33</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1990</span><span class="hljs-selector-class">.115-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 18) <span class="hljs-selector-tag">opera-33</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1990</span><span class="hljs-selector-class">.115-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 19) <span class="hljs-selector-tag">opera-33</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1990</span><span class="hljs-selector-class">.58-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 20) <span class="hljs-selector-tag">opera-32</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1948</span><span class="hljs-selector-class">.69-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 21) <span class="hljs-selector-tag">opera-32</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1948</span><span class="hljs-selector-class">.25-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 22) <span class="hljs-selector-tag">opera-31</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1889</span><span class="hljs-selector-class">.174-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 23) <span class="hljs-selector-tag">opera-31</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1889</span><span class="hljs-selector-class">.99-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 24) <span class="hljs-selector-tag">opera-30</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1835</span><span class="hljs-selector-class">.125-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 25) <span class="hljs-selector-tag">opera-30</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1835</span><span class="hljs-selector-class">.88-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 26) <span class="hljs-selector-tag">opera-30</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1835</span><span class="hljs-selector-class">.59-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 27) <span class="hljs-selector-tag">opera-30</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1835</span><span class="hljs-selector-class">.52-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 28) <span class="hljs-selector-tag">opera-29</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1795</span><span class="hljs-selector-class">.60-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 29) <span class="hljs-selector-tag">opera-29</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1795</span><span class="hljs-selector-class">.47-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 30) <span class="hljs-selector-tag">opera-28</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1750</span><span class="hljs-selector-class">.51-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 31) <span class="hljs-selector-tag">opera-28</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1750</span><span class="hljs-selector-class">.48-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 32) <span class="hljs-selector-tag">opera-28</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1750</span><span class="hljs-selector-class">.40-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 33) <span class="hljs-selector-tag">opera-27</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1689</span><span class="hljs-selector-class">.76-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 34) <span class="hljs-selector-tag">opera-27</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1689</span><span class="hljs-selector-class">.69-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 35) <span class="hljs-selector-tag">opera-27</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1689</span><span class="hljs-selector-class">.66-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 36) <span class="hljs-selector-tag">opera-27</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1689</span><span class="hljs-selector-class">.54-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 37) <span class="hljs-selector-tag">opera-27</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1689</span><span class="hljs-selector-class">.54-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 38) <span class="hljs-selector-tag">opera-26</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1656</span><span class="hljs-selector-class">.60-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 39) <span class="hljs-selector-tag">opera-26</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1656</span><span class="hljs-selector-class">.32-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 40) <span class="hljs-selector-tag">opera-12</span><span class="hljs-selector-class">.16</span><span class="hljs-selector-class">.1860-2-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)
 41) <span class="hljs-selector-tag">opera-12</span><span class="hljs-selector-class">.16</span><span class="hljs-selector-class">.1860-1-x86_64</span><span class="hljs-selector-class">.pkg</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span> (<span class="hljs-selector-tag">remote</span>)

<span class="hljs-selector-tag">select</span> <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">package</span> <span class="hljs-selector-tag">by</span> <span class="hljs-selector-tag">number</span>:

</code></pre><p>只需输入你选择的包号码，然后按回车即可安装。</p>
<p>就这样。当前安装的软件包将被降级为旧版本。</p>
<p>另外阅读：<a href="https://www.ostechnix.com/downgrade-packages-specific-date-arch-linux/">在 Arch Linux 中如何将所有软件包降级到特定日期</a></p>
<h3><a href="#那么如何避免已损坏的软件包并使-arch-linux-更加稳定"></a>那么，如何避免已损坏的软件包并使 Arch Linux 更加稳定？</h3>
<p>在更新 Arch Linux 之前查看 <a href="https://www.archlinux.org/news/">Arch Linux 新闻</a>和<a href="https://bbs.archlinux.org/">论坛</a>，看看是否有任何已报告的问题。过去几周我一直在使用 Arch Linux 作为我的主要操作系统，以下是我在这段时间内发现的一些简单提示，以避免在 Arch Linux 中安装不稳定的软件包。</p>
<ol>
<li>避免部分升级。这意味着永远不要运行 <code>pacman -Sy &lt;软件包名称&gt;</code>。此命令将在安装软件包时部分升级你的系统。相反，优先使用 <code>pacman -Syu</code> 来更新系统，然后使用 <code>package -S &lt;软件包名称&gt;</code> 安装软件包。</li>
<li>避免使用 <code>pacman -Syu -force</code> 命令。<code>-force</code> 标志将忽略程序包和文件冲突，并且可能会以破损的程序包或损坏的系统结束。</li>
<li>不要跳过依赖性检查。这意味着不要使用 <code>pacman -Rdd &lt;软件包名称&gt;</code>。此命令将在删除软件包时避免依赖性检查。如果你运行这个命令，另一个重要的包所需的关键依赖也可以被删除。最终，它会损坏你的 Arch Linux。</li>
<li>定期备份重要数据和配置文件以避免数据丢失总是一个好习惯。</li>
<li>安装第三方软件包和 AUR 等非官方软件包时要小心。不要安装那些正在经历重大发展的软件包。</li>
</ol>
<p>有关更多详细信息，请查看 <a href="https://wiki.archlinux.org/index.php/System_maintenance">Arch Linux 维护指南</a>。</p>
<p>我不是 Arch Linux 专家，我仍然在学习如何使它更稳定。如果你有任何技巧让 Arch Linux 保持稳定和安全，请在下面的评论部分保持稳定和安全告诉我，我将洗耳恭听。</p>
<p>希望这可以有帮助。目前为止这就是全部了。我很快会再次在这里与另一篇有趣的文章。在此之前，请继续关注。</p>
<p>干杯！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/downgrade-package-arch-linux/">https://www.ostechnix.com/downgrade-package-arch-linux/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/how-to-downgrade-a-package-in-arch-linux)
原文标题: 如何在 Arch Linux 中降级软件包
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
