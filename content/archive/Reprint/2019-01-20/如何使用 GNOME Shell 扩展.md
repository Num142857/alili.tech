---
title: '如何使用 GNOME Shell 扩展' 
date: 2019-01-20 2:30:11
hidden: true
slug: 6ddok6uvxfg
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-gnome-shell-扩展"></a>如何使用 GNOME Shell 扩展</h1>
<blockquote>
<p>简介：这是一份详细指南，我将会向你展示如何手动或通过浏览器轻松安装 GNOME Shell 扩展Extension。</p>
</blockquote>
<p>在讨论 <a href="https://itsfoss.com/install-themes-ubuntu/">如何在 Ubuntu 17.10 上安装主题</a> 一文时，我简要地提到了 GNOME Shell 扩展，它用来安装用户主题。今天，我们将详细介绍 Ubuntu 17.10 中的 GNOME Shell 扩展。</p>
<p>我可能会使用术语 GNOME 扩展而不是 GNOME Shell 扩展，但是这两者在这里具有相同的含义。</p>
<p>什么是 GNOME Shell 扩展？如何安装 GNOME Shell 扩展，以及如何管理和删除 GNOME Shell 扩展？我会一一解释所有的问题。</p>
<p>在此之前，如果你喜欢视频，我已经在 <a href="https://www.youtube.com/c/itsfoss?sub_confirmation=1">FOSS 的 YouTube 频道</a> 上展示了所有的这些操作。我强烈建议你订阅它来获得更多有关 Linux 的视频。</p>
<h3><a href="#什么是-gnome-shell-扩展"></a>什么是 GNOME Shell 扩展？</h3>
<p><a href="https://extensions.gnome.org/">GNOME Shell 扩展</a> 根本上来说是增强 GNOME 桌面功能的一小段代码。</p>
<p>把它看作是你的浏览器的一个附加组件。例如，你可以在浏览器中安装附加组件来禁用广告。这个附加组件是由第三方开发者开发的。虽然你的 Web 浏览器默认不提供此项功能，但安装此附加组件可增强你 Web 浏览器的功能。</p>
<p>同样， GNOME Shell 扩展就像那些可以安装在 GNOME 之上的第三方附加组件和插件。这些扩展程序是为执行特定任务而创建的，例如显示天气状况、网速等。大多数情况下，你可以在顶部面板中访问它们。</p>
<p><a href="https://camo.githubusercontent.com/74c64db6be49edfa2c6a7d28882b17b7d23a360f/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d776561746865722e6a706567"><img src="https://p0.ssl.qhimg.com/t01d145beb314b6b839.jpg" alt="GNOME Shell 扩展显示天气信息"></a></p>
<p>也有一些 GNOME 扩展在顶部面板上不可见，但它们仍然可以调整 GNOME 的行为。例如，有一个这样的扩展可以让鼠标中键来关闭应用程序。</p>
<h3><a href="#安装-gnome-shell-扩展"></a>安装 GNOME Shell 扩展</h3>
<p>现在你知道了什么是 GNOME Shell 扩展，那么让我们来看看如何安装它吧。有三种方式可以使用 GNOME 扩展：</p>
<ul>
<li>使用来自 Ubuntu （或你的 Linux 发行版）的最小扩展集</li>
<li>在 Web 浏览器中查找并安装扩展程序</li>
<li>下载并手动安装扩展</li>
</ul>
<p>在你学习如何使用 GNOME Shell 扩展之前，你应该安装 GNOME Tweak Tool。你可以在软件中心找到它，或者你可以使用以下命令：</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> gnome-tweak-tool

</code></pre><p>有时候，你需要知道你正在使用的 GNOME Shell 的版本，这有助于你确定扩展是否与系统兼容。你可以使用下面的命令来找到它：</p>
<pre><code class="hljs dockerfile">gnome-<span class="hljs-keyword">shell</span><span class="bash"> --version
</span>
</code></pre><h4><a href="#1-使用-gnome-shell-extensions-包-最简单最安全的方式"></a>1. 使用 gnome-shell-extensions 包 [最简单最安全的方式]</h4>
<p>Ubuntu（以及其他几个 Linux 发行版，如 Fedora ）提供了一个包，这个包有最小集合的 GNOME 扩展。由于 Linux 发行版经过测试，所以你不必担心兼容性问题。</p>
<p>如果你不想费神，你只需获得这个包，你就可以安装 8-10 个 GNOME 扩展。</p>
<pre><code class="hljs dockerfile">sudo apt install gnome-<span class="hljs-keyword">shell</span><span class="bash">-extensions
</span>
</code></pre><p>你将需要重新启动系统（或者重新启动 GNOME Shell，我具体忘了是哪个）。之后，启动 GNOME Tweaks，你会发现一些扩展自动安装了，你只需切换按钮即可开始使用已安装的扩展程序。</p>
<p><a href="https://camo.githubusercontent.com/0eb71554b0e1ba894d06810a926a0bc2717e2492/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f656e61626c65757365722d7468656d65732d657874656e73696f6e2d676e6f6d652e6a706567"><img src="https://p0.ssl.qhimg.com/t01c98a0c5295953982.jpg" alt="Change GNOME Shell theme in Ubuntu 17.1"></a></p>
<h4><a href="#2-从-web-浏览器安装-gnome-shell-扩展"></a>2. 从 Web 浏览器安装 GNOME Shell 扩展</h4>
<p>GNOME 项目有一个专门用于扩展的网站，不干别的，你可以在这里找到并安装扩展，并管理它们，甚至不需要 GNOME Tweaks Tool。</p>
<ul>
<li><a href="https://extensions.gnome.org/">GNOME Shell Extensions Website</a></li>
</ul>
<p>但是为了安装 Web 浏览器扩展，你需要两件东西：浏览器附加组件和本地主机连接器。</p>
<p><strong>步骤 1： 安装 浏览器附加组件</strong></p>
<p>当你访问 GNOME Shell 扩展网站时，你会看到如下消息：</p>
<blockquote>
<p>“要使用此站点控制 GNOME Shell 扩展，你必须安装由两部分组成的 GNOME Shell 集成：浏览器扩展和本地主机消息应用。”</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/8f954c341ab772922187354e94c6ce78a3d31b39/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d312e6a706567"><img src="https://p0.ssl.qhimg.com/t0112ec0ff593f7e1d4.jpg" alt="Installing GNOME Shell Extensions"></a></p>
<p>你只需在你的 Web 浏览器上点击建议的附加组件链接即可。你也可以从下面的链接安装它们：</p>
<ul>
<li>对于 Google Chrome、Chromium 和 Vivaldi： <a href="https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep">Chrome Web 商店</a></li>
<li>对于 Firefox： <a href="https://addons.mozilla.org/en/firefox/addon/gnome-shell-integration/">Mozilla Addons</a></li>
<li>对于 Opera： <a href="https://addons.opera.com/en/extensions/details/gnome-shell-integration/">Opera Addons</a></li>
</ul>
<p><strong>步骤 2： 安装本地连接器</strong></p>
<p>仅仅安装浏览器附加组件并没有帮助。你仍然会看到如下错误：</p>
<blockquote>
<p>“尽管 GNOME Shell 集成扩展正在运行，但未检测到本地主机连接器。请参阅文档以获取有关安装连接器的信息。”</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/53d28ddca8d26ebc2d8ef021157329ee91e4adaa/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d322e6a706567"><img src="https://p0.ssl.qhimg.com/t01f62811cc5583d19d.jpg" alt="How to install GNOME Shell Extensions"></a></p>
<p>这是因为你尚未安装主机连接器。要做到这一点，请使用以下命令：</p>
<pre><code class="hljs dockerfile">sudo apt install chrome-gnome-<span class="hljs-keyword">shell</span><span class="bash">

</span></code></pre><p>不要担心包名中的 “chrome” 前缀，它与 Chrome 无关，你无需再次安装 Firefox 或 Opera 的单独软件包。</p>
<p><strong>步骤 3： 在 Web 浏览器中安装 GNOME Shell 扩展</strong></p>
<p>一旦你完成了这两个要求，你就可以开始了。现在，你将看不到任何错误消息。</p>
<p><a href="https://camo.githubusercontent.com/4dbfbdc6363f392e6889a5249a155acb880d0e80/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d332e6a706567"><img src="https://p0.ssl.qhimg.com/t013c8b4fca703e1aa6.jpg" alt="GNOME Shell Extension"></a></p>
<p>一件好的做法是按照 GNOME Shell 版本对扩展进行排序，但这不是强制性的。这是因为开发人员是为其当前的 GNOME 版本创建的扩展。而在一年之内，会发布两个或更多 GNOME 发行版本，但开发人员没有时间（在新的 GNOME 版本上）测试或更新他/她的扩展。</p>
<p>因此，你不知道该扩展是否与你的系统兼容。尽管扩展已经存在很长一段时间了，但是有可能在最新的 GNOME Shell 版本中，它也能正常工作。同样它也有可能不工作。</p>
<p>你也可以去搜索扩展程序。假设你想要安装有关天气的扩展，只要搜索它并选择一个搜索结果即可。</p>
<p>当你访问扩展页面时，你会看到一个切换按钮。</p>
<p><a href="https://camo.githubusercontent.com/0be6442417684fe9ecded6ab64e79714632ee913/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d342e6a706567"><img src="https://p0.ssl.qhimg.com/t0173aaa74b0a79fa98.jpg" alt="Installing GNOME Shell Extension"></a></p>
<p>点击它，你会被提示是否要安装这个扩展：</p>
<p><a href="https://camo.githubusercontent.com/b06dbc4792e211a0fe2abeae8072666b0817f330/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d352e6a706567"><img src="https://p0.ssl.qhimg.com/t01363431621fd23334.jpg" alt="Install GNOME Shell Extensions via web browser"></a></p>
<p>显然，直接安装就好。安装完成后，你会看到切换按钮已打开，旁边有一个设置选项。你也可以使用设置选项配置扩展，也可以禁用扩展。</p>
<p><a href="https://camo.githubusercontent.com/bb9293388451747e5e22e9e2d92e1f29bc884556/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d362e6a706567"><img src="https://p0.ssl.qhimg.com/t019009ddfbf1040364.jpg" alt="Configuring installed GNOME Shell Extensions"></a></p>
<p>你也可以在 GNOME Tweaks Tool 中配置通过 Web 浏览器安装的扩展：</p>
<p><a href="https://camo.githubusercontent.com/7eb7b4fc7f39843160baa6051d943b870f19fedc/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d372d383030783537322e6a706567"><img src="https://p0.ssl.qhimg.com/t0172a3d5a271d5d6d4.jpg" alt="GNOME Tweaks to handle GNOME Shell Extensions"></a></p>
<p>你可以在 GNOME 网站中 <a href="https://extensions.gnome.org/local/">已安装的扩展部分</a> 下查看所有已安装的扩展。</p>
<p><a href="https://camo.githubusercontent.com/cd711a3d544b9c4b915ee3b59601533561296caa/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d382e6a706567"><img src="https://p0.ssl.qhimg.com/t01a540767450450a17.jpg" alt="Manage your installed GNOME Shell Extensions"></a></p>
<p>使用 GNOME 扩展网站的一个主要优点是你可以查看扩展是否有可用的更新，你不会在 GNOME Tweaks 或系统更新中得到更新（和提示）。</p>
<h4><a href="#3-手动安装-gnome-shell-扩展"></a>3. 手动安装 GNOME Shell 扩展</h4>
<p>你不需要始终在线才能安装 GNOME Shell 扩展，你可以下载文件并稍后安装，这样就不必使用互联网了。</p>
<p>去 GNOME 扩展网站下载最新版本的扩展。</p>
<p><a href="https://camo.githubusercontent.com/354dfb96e39162cea54ec38ad49c17ac16d23b07/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d392d383030783435362e6a706567"><img src="https://p0.ssl.qhimg.com/t011226f67a8d51dd12.jpg" alt="Download GNOME Shell Extension"></a></p>
<p>解压下载的文件，将该文件夹复制到 <code>~/.local/share/gnome-shell/extensions</code> 目录。到主目录下并按 <code>Ctrl+H</code> 显示隐藏的文件夹，在这里找到 <code>.local</code> 文件夹，你可以找到你的路径，直至 <code>extensions</code> 目录。</p>
<p>一旦你将文件复制到正确的目录后，进入它并打开 <code>metadata.json</code> 文件，寻找 <code>uuid</code> 的值。</p>
<p>确保该扩展的文件夹名称与 <code>metadata.json</code> 中的 <code>uuid</code> 值相同。如果不相同，请将目录重命名为 <code>uuid</code> 的值。</p>
<p><a href="https://camo.githubusercontent.com/546b6ef877233ead88245ee0a3b0a2dabae9854f/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f676e6f6d652d7368656c6c2d657874656e73696f6e2d696e7374616c6c6174696f6e2d31302d383030783435302e6a7067"><img src="https://p0.ssl.qhimg.com/t010bc3c3166a41985a.jpg" alt="Manually install GNOME Shell extension"></a></p>
<p>差不多了！现在重新启动 GNOME Shell。 按 <code>Alt+F2</code> 并输入 <code>r</code> 重新启动 GNOME Shell。</p>
<p><a href="https://camo.githubusercontent.com/9fcffd0d3178320f9f6bf4609c67f1085a1c37db/68747470733a2f2f346264733668657267632d666c79776865656c2e6e6574646e612d73736c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31312f726573746172742d676e6f6d652d7368656c6c2d383030783239392e6a706567"><img src="https://p0.ssl.qhimg.com/t01bb0f7b47714366ca.jpg" alt="Restart GNOME Shell"></a></p>
<p>同样重新启动 GNOME Tweaks Tool。你现在应该可以在 Tweaks Tool 中看到手动安装的 GNOME 扩展，你可以在此处配置或启用新安装的扩展。</p>
<p>这就是安装 GNOME Shell 扩展你需要知道的所有内容。</p>
<h3><a href="#移除-gnome-shell-扩展"></a>移除 GNOME Shell 扩展</h3>
<p>你可能想要删除一个已安装的 GNOME Shell 扩展，这是完全可以理解的。</p>
<p>如果你是通过 Web 浏览器安装的，你可以到 <a href="https://extensions.gnome.org/local/">GNOME 网站的以安装的扩展部分</a> 那移除它（如前面的图片所示）。</p>
<p>如果你是手动安装的，可以从 <code>~/.local/share/gnome-shell/extensions</code> 目录中删除扩展文件来删除它。</p>
<h3><a href="#特别提示获得-gnome-shell-扩展更新的通知"></a>特别提示：获得 GNOME Shell 扩展更新的通知</h3>
<p>到目前为止，你已经意识到除了访问 GNOME 扩展网站之外，无法知道更新是否可用于 GNOME Shell 扩展。</p>
<p>幸运的是，有一个 GNOME Shell 扩展可以通知你是否有可用于已安装扩展的更新。你可以从下面的链接中获得它：</p>
<ul>
<li><a href="https://extensions.gnome.org/extension/1166/extension-update-notifier/">Extension Update Notifier</a></li>
</ul>
<h3><a href="#你如何管理-gnome-shell-扩展"></a>你如何管理 GNOME Shell 扩展？</h3>
<p>我觉得很奇怪不能通过系统更新来更新扩展，就好像 GNOME Shell 扩展不是系统的一部分。</p>
<p>如果你正在寻找一些建议，请阅读这篇文章： <a href="https://itsfoss.com/best-gnome-extensions/">关于最佳 GNOME 扩展</a>。同时，你可以分享有关 GNOME Shell 扩展的经验。你经常使用它们吗？如果是，哪些是你最喜欢的？</p>
<hr>
<p>via: <a href="https://itsfoss.com/gnome-shell-extensions/">https://itsfoss.com/gnome-shell-extensions/</a></p>
<p>作者：<a href="https://itsfoss.com/author/abhishek/">Abhishek Prakash</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 GNOME Shell 扩展

## 原文链接
[https://www.zcfy.cc/article/how-to-use-gnome-shell-extensions-complete-guide](https://www.zcfy.cc/article/how-to-use-gnome-shell-extensions-complete-guide)

