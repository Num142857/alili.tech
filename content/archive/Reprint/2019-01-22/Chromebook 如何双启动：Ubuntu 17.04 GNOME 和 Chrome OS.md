---
title: 'Chromebook 如何双启动：Ubuntu 17.04 GNOME 和 Chrome OS' 
date: 2019-01-22 2:30:08
hidden: true
slug: q0nz1rq0a2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#chromebook-如何双启动ubuntu-1704-gnome-和-chrome-os"></a>Chromebook 如何双启动：Ubuntu 17.04 GNOME 和 Chrome OS</h1>
<blockquote>
<p>本教程使用著名的 Crouton 安装器</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/65fc03e46b7fb912275977d5b7b5659eb45acf11/687474703a2f2f69312d6e6577732e736f667470656469612d7374617469632e636f6d2f696d616765732f6e657773322f686f772d746f2d696e7374616c6c2d7562756e74752d31372d30342d776974682d676e6f6d652d6f6e2d796f75722d6368726f6d65626f6f6b2d616c6f6e67736964652d6368726f6d652d6f732d3531363632342d322e6a7067"><img src="https://p0.ssl.qhimg.com/t012edb71c4db599ffc.jpg" alt="Ubuntu 17.04 with GNOME 3.24 running on Acer Chromebook 11 (C740)"></a></p>
<p>在去年我拿到我的 Acer Chromebook 11 (C740) 时，我写了一篇教程教你们如何<a href="http://news.softpedia.com/news/here-s-how-to-install-any-linux-operating-system-on-your-chromebook-506212.shtml">如何移除 Google Chrome OS 并根据你的选择安装一个 GNU/Linux 发行版</a>，但是很快我觉得没意思了。</p>
<p>因此几个月之后，我使用了 Google 在网站上提供的恢复镜像重新安装了 Chrome OS，我写入了 USB 并从 Chromebook 启动。最近，我又感到无聊了，因此我决定使用 Crouton 在我的 Acer Chromebook 11 (C740) 上安装 Ubuntu。</p>
<p>为什么？因为在一次会议中来的一位朋友带了他的笔记本，一台 Dell Chromebook 13，在上面他运行了 Ubuntu Linux 还有 Chrome OS。看他用快捷键在两个操作系统之间切换很酷，这让我也想这么做。</p>
<p>现在有很多教程解释如何安装不同的发行版 Ubuntu、Debian 或者 Kali Linux（这些是当前 Crouton 安装器支持的 GNU/Linux 发行版），但是我想要运行最新的 Ubuntu，当前是 Ubuntu 17.04 (Zesty Zapus)，它有 GNOME 3.24 桌面环境。</p>
<h3><a href="#如何启用开发者模式并下载-crouton"></a>如何启用开发者模式并下载 Crouton</h3>
<p>当我询问我的朋友他在他的 Chromebook 上运行的是什么 Ubuntu 时，回答是 Ubuntu 14.04 LTS (Trusty Tahr)，我不得不承认这让我有点失望。我回家后立刻拿出我的 Chromebook 并尝试看看我是否能运行带有桌面环境的 Ubuntu 17.04。</p>
<p>我做的第一件事情是将我的 Chromebook 变成开发者模式。为此，你需要关闭你的 Chromebook 但不关闭翻盖，接着同时按住 <code>ESC</code>、<code>Refresh</code> 和 <code>Power</code> 键几秒直到进入恢复模式，这会擦除 Chromebook 上的所有数据。</p>
<p>进入开发者模式会花费你几分钟，所以耐心点。当准备完成后，你需要登录你的 Google 账户，并设置各种东西，比如壁纸或者头像之类。现在你进入开发者模式了，在你的 Chromebook 中访问这篇教程并<a href="https://goo.gl/fd3zc">下载 Crouton</a>，它会保存在下载文件夹中。</p>
<h3><a href="#如何使用-crouton-安装带有-gnome-324-的-ubuntu-1704"></a>如何使用 Crouton 安装带有 GNOME 3.24 的 Ubuntu 17.04</h3>
<p>现在打开 Google Chrome 并按下 <code>CTRL+ALT+T</code> 打开 Chrome OS 的终端模拟器，它叫做 crosh。在命令提示符中，输入 <code>shell</code> 命令，按下回车进入 Linux shell。让我们看看 Crouton 能为我们做什么。</p>
<p>这有两个命令（下面列出的），你可以运行它们查看 Crouton 支持的 GNU/Linux 发行版和桌面环境，并且我可以告诉你这可以安装 Debian 7 “Wheezy”、Debian 8 “Jessie”、Debian 9 “Stretch” 和 Debian Sid、Kali Linux 滚动版还有 Ubuntu 12.04 LTS、Ubuntu 14.04 LTS 和 Ubuntu 16.04 LTS 等等。</p>
<pre><code class="hljs clean">sh -e /Downloads/crouton -r list -  ### 会列出支持的发行版 
sh -e /Downloads/crouton -t list -  ### 会列出支持的桌面 

</code></pre><p>Crouton 也会列出一系列 Debian、Kali 和 Ubuntu 的旧发行版，但它们在上游被中止支持了（这些的名字后面都被标记了感叹号），并且因为安全风险你不应该安装它们，还有两个尚未支持的 Ubuntu 版本，Ubuntu 16.10 和 Ubuntu 17.04。</p>
<p>Crouton 开发者说这些“不支持”的 Ubuntu 版本用一些方法可能也可以使用，但是我试了一下并使用下面的命令安装了带有 GNOME 3.24 桌面环境（没有额外的应用）的 Ubuntu 17.04 (Zesty Zapus)。我使用 <code>-e</code> 参数来加密安装。</p>
<pre><code class="hljs awk">sh -e <span class="hljs-regexp">/Downloads/</span>crouton -e -r zesty -t gnome

</code></pre><p>将所有的都下载下来并安装在 Crouton 在你的 Chromebook 中创建的 chroot 环境中会花费一些时间，因此再说一次，请耐心。当一切完成后，你会知道，并且你能通过在 shell 中运行下面的命令启动 Ubuntu 17.04。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo startgnome</span>

</code></pre><p>瞧！我在我的旧 Acer Chromebook 11 (C740) 上运行着带有 GNOME 3.24 桌面环境的 Ubuntu 17.04 (Zesty Zapus)，这笔记本 Google 还尚未支持 Android 程序。最棒的部分是我能够使用 <code>CTRL+ALT+Shift</code>+<code>Back</code>/<code>Forward</code> 键盘快捷键快速在 Chrome OS 和 Ubuntu 17.04 之间切换。</p>
<p><a href="https://camo.githubusercontent.com/4ed9c6e9288123dca9ff63bf83399e73758cfa7c/687474703a2f2f69312d6e6577732e736f667470656469612d7374617469632e636f6d2f696d616765732f6e657773322f686f772d746f2d696e7374616c6c2d7562756e74752d31372d30342d776974682d676e6f6d652d6f6e2d796f75722d6368726f6d65626f6f6b2d616c6f6e67736964652d6368726f6d652d6f732d3531363632342d332e6a7067"><img src="https://p0.ssl.qhimg.com/t014e1fc8877cce85ec.jpg" alt="GNOME 3.24 desktop - System menu"></a></p>
<p>作为这篇笔记的结尾，我想提醒你注意，由于 Chromebook 现在始终处于开发人员模式，所以当电池电量耗尽、打开或关闭设备时，你会一直看到一个警告，显示 “OS verification is OFF - Press SPACE to re-enable”，当你看到它时，请按 <code>CTRL+D</code>。玩得开心！</p>
<p><a href="https://camo.githubusercontent.com/20a69092516da18b621ded7a3d5b535d5acb789f/687474703a2f2f69312d6e6577732e736f667470656469612d7374617469632e636f6d2f696d616765732f6e657773322f686f772d746f2d696e7374616c6c2d7562756e74752d31372d30342d776974682d676e6f6d652d6f6e2d796f75722d6368726f6d65626f6f6b2d616c6f6e67736964652d6368726f6d652d6f732d3531363632342d342e6a7067"><img src="https://p0.ssl.qhimg.com/t01c9563f4de306d76e.jpg" alt="GNOME 3.24 desktop - Calendar applet"></a></p>
<p><a href="https://camo.githubusercontent.com/2b5d61cae6828c77042145020cecc94384c85776/687474703a2f2f69312d6e6577732e736f667470656469612d7374617469632e636f6d2f696d616765732f6e657773322f686f772d746f2d696e7374616c6c2d7562756e74752d31372d30342d776974682d676e6f6d652d6f6e2d796f75722d6368726f6d65626f6f6b2d616c6f6e67736964652d6368726f6d652d6f732d3531363632342d352e6a7067"><img src="https://p0.ssl.qhimg.com/t019333c9b8fed15ce3.jpg" alt="GNOME 3.24 desktop - Overview mode"></a></p>
<hr>
<p>via: <a href="http://news.softpedia.com/news/how-to-install-ubuntu-17-04-with-gnome-on-your-chromebook-alongside-chrome-os-516624.shtml">http://news.softpedia.com/news/how-to-install-ubuntu-17-04-with-gnome-on-your-chromebook-alongside-chrome-os-516624.shtml</a></p>
<p>作者：<a href="http://news.softpedia.com/editors/browse/marius-nestor">Marius Nestor</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chromebook 如何双启动：Ubuntu 17.04 GNOME 和 Chrome OS

## 原文链接
[https://www.zcfy.cc/article/chromebook-dual-boot-how-to-ubuntu-17-04-gnome-and-chrome-os](https://www.zcfy.cc/article/chromebook-dual-boot-how-to-ubuntu-17-04-gnome-and-chrome-os)

