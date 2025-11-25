---
title: '如何在 Ubuntu 16.04 LTS 上用 Tomb 加密文件' 
date: 2019-01-20 2:30:11
hidden: true
slug: 7upezaqez6g
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-1604-lts-上用-tomb-加密文件"></a>如何在 Ubuntu 16.04 LTS 上用 Tomb 加密文件</h1>
<p>如今，大多数人都认为文件加密是必要的，甚至在 Linux 系统上也是如此。 如果你和我一样, 最初被 Ubuntu 所吸引是因为 Linux 系统强化的安全性，恐怕我有个坏消息要告诉你：Linux 已经成为它自身“成功”的受害者。 近年来，用户数量的大幅度增加导致了这类系统的攻击和盗窃活动呈指数级增长。</p>
<p>曾经有一个非常简单的解决方案来在像 Ubuntu 这样的 Linux 系统上加密文件：它叫做 <a href="https://www.fossmint.com/secure-encrypt-files-folders-with-truecrypt-in-linux/">Truecrypt</a>。 直到 2015 年，它提供了不同程度的军事级别的加密，并且在大多数 Linux 系统中运行良好。不幸的是, 它已经停止开发了, 因此变得相当不安全。</p>
<h3><a href="#替代品"></a>替代品</h3>
<p>幸运的是，除了 Truecrypt，还有一些选择。 Truecrypt 的直接继承者是 <a href="https://www.fossmint.com/veracrypt-is-a-secure-alternative-encryption-tool-to-truecrypt-for-linux/">Veracrypt</a> ，它由一群开发者从 Truecrypt 获取源代码并保持更新的。</p>
<p>该项目已经发展成为令人印象深刻的独立系统，但现在渐已老迈。旧系统，尤其是那些处理安全问题的系统，只能更新多次而才不会引入漏洞。</p>
<p>出于这个原因，在其他许多方面，应该寻找一个更外围一些的加密软件。我选择的是 Tomb。</p>
<h3><a href="#为什么是-tomb"></a>为什么是 Tomb</h3>
<p>在某些方面，Tomb 与其他加密软件非常相似。它将加密文件存储在专用的“Tomb 文件夹”中，可以让你快速查看您已加密的文件。</p>
<p>它还使用与 Veracrypt 类似的 <a href="https://www.dyne.org/software/tomb/">AES-256</a> 加密标准。这个标准适用于 NSA 、微软和 Apple，并被认为是最安全的加密算法之一。如果你不熟悉加密技术，则应该阅读一点<a href="https://thebestvpn.com/advanced-encryption-standard-aes/">技术背景知识</a>，但如果你只想快速、安全地加密，请不要担心， Tomb 将不负所望。</p>
<p>Tomb 也有一些很大的不同之处。首先，它是专门为 GNU/Linux 系统开发的，可以解决一些更广泛的加密软件的兼容性问题。</p>
<p>第二，尽管 Tomb 是开源的，但它使用的是静态链接库，以至于其源代码难以审计。 这意味着一些操作系统发行版开发者并不认为它是自由的，但是当涉及到安全软件时，这实际上是一件好事：这意味着与完全“自由”软件相比, Tomb 被黑客攻击的可能性更小。</p>
<p>最后，它有几个先进的功能，如隐写术steganography，这使你可以将你的关键文件隐藏在其他文件中。 尽管 Tomb 主要是一个命令行工具，它也带有 GUI 界面—— gtomb，它允许初学者用图形化的方式使用它。</p>
<p>这是推销么? 好吧，在我告诉你如何使用 Tomb 之前，值得注意的是，没有一个加密软件能提供完全的保护。 Tomb 不会让你的计算机隐藏于你 ISP，也不会保护存储在云中的文件。如果你想对云存储进行完全加密，您需要使用 Tor 浏览器和零日志 VPN 登录到你喜欢的存储服务中。 这里有很多选项，但是 <a href="https://privacyaustralia.org/trust-zone-vpn-review/">Trust Zone</a> 是一个很好的浏览器，而 <a href="https://www.howtoforge.com/tutorial/how-to-properly-set-up-tinc-vpn-on-ubuntu-linux/">Tinc</a> 是一个很好的 VPN 工具。</p>
<p>说了这么多，如果你正在寻找 Ubuntu 16.04 上的快速、简单、安全的加密，Tomb 无疑是一条可行的路。让我们开始吧。</p>
<h3><a href="#在-ubuntu-1604-上安装-tomb"></a>在 Ubuntu 16.04 上安装 Tomb</h3>
<p>因为 Tomb 是专门为 Linux 设计的, 所以安装非常简单。</p>
<p>几年前，SparkyLinux （它本身就是一个非常好的 Debian 衍生产品）的开发者们将 “Tomb” 添加到他们的官方存储库中。 你可以通过在 Ubuntu 系统上添加这些存储库来安装它。</p>
<p>要做到这一点， 打开一个终端并添加一个存储库文件：</p>
<pre><code class="hljs stylus">sudo vi /etc/apt/sources<span class="hljs-selector-class">.list</span><span class="hljs-selector-class">.d</span>/sparky-repo<span class="hljs-selector-class">.list</span>

</code></pre><p>然后在文件中添加以下行：</p>
<pre><code class="hljs groovy">deb <span class="hljs-string">https:</span><span class="hljs-comment">//sparkylinux.org/repo stable main</span>
deb-src <span class="hljs-string">https:</span><span class="hljs-comment">//sparkylinux.org/repo stable main</span>
deb <span class="hljs-string">https:</span><span class="hljs-comment">//sparkylinux.org/repo testing main</span>
deb-src <span class="hljs-string">https:</span><span class="hljs-comment">//sparkylinux.org/repo testing main</span>

</code></pre><p>保存并关闭该文件。</p>
<p>你现在需要安装 Sparky 公钥，使用下列步骤：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install sparky-keyring

</code></pre><p>或者：</p>
<pre><code class="hljs dockerfile">wget -O - https://sparkylinux.org/repo/sparkylinux.gpg.key | sudo apt-key <span class="hljs-keyword">add</span><span class="bash"> -
</span>
</code></pre><p>然后你需要使用标准的命令来更新你的存储库：</p>
<pre><code class="hljs q">sudo apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><p>然后简单地使用 <code>apt</code> 安装 Tomb：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install tomb

</code></pre><p>如果你想要带有 GUI 的 Tomb，安装同样简单。只需使用 <code>apt</code> 来安装 gtomb：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install gtomb

</code></pre><p>就是这样，你现在应该安装好了一个可以工作的 Tomb。 让我们看看如何使用它。</p>
<h3><a href="#使用-tomb"></a>使用 Tomb</h3>
<h4><a href="#通过命令行使用-tomb"></a>通过命令行使用 Tomb</h4>
<p>Tomb 主要是一个命令行工具，所以我将首先介绍这个用法。 如果你不喜欢使用终端，你可以跳过这节并查看下一部分。</p>
<p>实际上，不用说了。 如果你以前从来没有使用过命令行，那么 Tomb 是一个很好的开始，因为它使用简单的命令，只要你小心，那么你很少有机会把事情搞砸。</p>
<p>Tomb 实际上使用了一组以墓地为主题的非常有趣的命令集。 每个加密文件夹都被称为“tomb”（墓碑） ，而且（我很快就会讲到) ，它们可以使用类似的哥特式命令。</p>
<p>首先，让我们创造（挖）一个新的 tomb。你可以指定你的新 tomb 的名称和大小，所以让我们使用 “Tomb1”这个名称并指定大小为 100 MB。</p>
<p>你需要 root 权限，所以打开终端并键入（或复制） ：</p>
<pre><code class="hljs stylus">sudo tomb dig -s <span class="hljs-number">100</span> Tomb1<span class="hljs-selector-class">.tomb</span>

</code></pre><p>你应该会得到类似这样的输出：</p>
<pre><code class="hljs stylus">tomb . Commanded to dig tomb Tomb1<span class="hljs-selector-class">.tomb</span>
tomb (*) Creating <span class="hljs-selector-tag">a</span> new tomb <span class="hljs-keyword">in</span> Tomb1<span class="hljs-selector-class">.tomb</span>
tomb . Generating Tomb1<span class="hljs-selector-class">.tomb</span> of <span class="hljs-number">100</span>MiB
<span class="hljs-number">100</span> blocks (<span class="hljs-number">100</span>Mb) written.
<span class="hljs-number">100</span>+<span class="hljs-number">0</span> records <span class="hljs-keyword">in</span>
<span class="hljs-number">100</span>+<span class="hljs-number">0</span> records out
-rw------- <span class="hljs-number">1</span> Tomb1 Tomb1 <span class="hljs-number">100</span>M Jul <span class="hljs-number">4</span> <span class="hljs-number">18</span>:<span class="hljs-number">53</span> Tomb1<span class="hljs-selector-class">.tomb</span>
tomb (*) Done digging  Tomb1
tomb . Your tomb is not yet ready, you need to forge <span class="hljs-selector-tag">a</span> key and lock it:
tomb . tomb forge Tomb1<span class="hljs-selector-class">.tomb</span><span class="hljs-selector-class">.key</span>
tomb . tomb lock Tomb1<span class="hljs-selector-class">.tomb</span> -k Tomb1<span class="hljs-selector-class">.tomb</span><span class="hljs-selector-class">.key</span>

</code></pre><p>正如输出的帮助说明，你现在需要创建（打造）一个密钥文件来锁定你的 tomb：</p>
<pre><code class="hljs stylus">sudo tomb forge Tomb1<span class="hljs-selector-class">.tomb</span><span class="hljs-selector-class">.key</span>

</code></pre><p>如果在此时出现提及“活动交换分区”的错误，则需要停用所有活动交换分区:</p>
<pre><code class="hljs stylus">sudo swapoff -<span class="hljs-selector-tag">a</span>

</code></pre><p>然后再运行上面的 keyfile 命令。</p>
<p>生成密钥文件可能需要几分钟时间，这具体取决于系统的速度。然而，在完成后系统会要求你输入新密码以确保密钥的安全：</p>
<p><a href="https://www.howtoforge.com/images/how_to_setup_and_install_tomb_on_ubuntu_1604/big/tomb1.png"><img src="http://p0.qhimg.com/t01145f901b8ed8b021.png" alt=""></a></p>
<p>输入两次，然后你的新密钥文件就会被制作出来。</p>
<p>你现在需要用你的新密钥来锁定你的 tomb。你可以这样做：</p>
<pre><code class="hljs stylus">sudo tomb lock Tomb1<span class="hljs-selector-class">.tomb</span> -k Tomb1<span class="hljs-selector-class">.tomb</span><span class="hljs-selector-class">.key</span>

</code></pre><p>你将被要求输入你的密码。 这样做, 你应该会得到如下的输出：</p>
<pre><code class="hljs vbnet">tomb . Commanded <span class="hljs-keyword">to</span> lock tomb Tomb1.tomb

[sudo] Enter password <span class="hljs-keyword">for</span> user Tomb1 <span class="hljs-keyword">to</span> gain superuser privileges

tomb . Checking <span class="hljs-keyword">if</span> the tomb <span class="hljs-keyword">is</span> empty (we never <span class="hljs-keyword">step</span> <span class="hljs-keyword">on</span> somebody <span class="hljs-keyword">else</span><span class="hljs-comment">'s bones).</span>
tomb . Fine, this tomb seems empty.
tomb . <span class="hljs-keyword">Key</span> <span class="hljs-keyword">is</span> valid.
tomb . Locking <span class="hljs-keyword">using</span> cipher: aes-xts-plain64:sha256
tomb . A password <span class="hljs-keyword">is</span> required <span class="hljs-keyword">to</span> use <span class="hljs-keyword">key</span> Tomb1.tomb.<span class="hljs-keyword">key</span>
tomb . Password OK.
tomb (*) Locking Tomb1.tomb <span class="hljs-keyword">with</span> Tomb1.tomb.<span class="hljs-keyword">key</span>
tomb . Formatting Luks mapped device.
tomb . Formatting your Tomb <span class="hljs-keyword">with</span> Ext3/Ext4 filesystem.
tomb . Done locking Tomb1 <span class="hljs-keyword">using</span> Luks dm-crypt aes-xts-plain64:sha256
tomb (*) Your tomb <span class="hljs-keyword">is</span> ready <span class="hljs-keyword">in</span> Tomb1.tomb <span class="hljs-keyword">and</span> secured <span class="hljs-keyword">with</span> <span class="hljs-keyword">key</span> Tomb1.tomb.<span class="hljs-keyword">key</span>

</code></pre><p>现在一切都安排好了，你可以开始使用你的新 tomb 了。</p>
<p>这里有一个注意事项：因为我只是在告诉你该怎么做，所以我把我的密钥文件和 tomb 存放在同一个目录中（在这里是 <code>$HOME</code>）。 你不应该这样做——把你的密钥存放在别的地方，最好是在除了你之外没有人能找到的地方。</p>
<p>然而，你需要记住你把它放在哪里，因为你需要用它来打开你的 tomb。 要做到这一点, 请输入：</p>
<pre><code class="hljs stylus">sudo tomb open Tomb1<span class="hljs-selector-class">.tomb</span> -k path/to/your/Tomb1<span class="hljs-selector-class">.tomb</span><span class="hljs-selector-class">.key</span>

</code></pre><p>输入你的密码，然后你就可以进去了。 tomb 会输出一些类似以下的内容:</p>
<pre><code class="hljs delphi">tomb <span class="hljs-comment">(*) Success unlocking tomb Tomb1
tomb . Checking filesystem via /dev/loop0
fsck from util-linux 2.27.1
Tomb1: clean, 11/25168 files, 8831/100352 blocks
tomb (*)</span> Success opening Tomb1.tomb <span class="hljs-keyword">on</span> /media/Tomb1

</code></pre><p>然后你应该看到你的新 tomb 挂载在了 finder 窗口。</p>
<p>你现在可以从 tomb 中保存和打开文件，但是请注意，你需要 root权限才能这样做。</p>
<p>在你使用完之后需要用以下方法卸载你的 tomb：</p>
<pre><code class="hljs arduino">sudo tomb <span class="hljs-built_in">close</span>

</code></pre><p>或者，如果你想强制关闭所有的打开的 tomb, 你可以使用：</p>
<p>sudo tomb slam all</p>
<h4><a href="#使用带-gui-的-tomb"></a>使用带 GUI 的 Tomb</h4>
<p>如果你不喜欢使用命令行，或者只是想要一个图形界面，你可以使用 gtomb。与许多图形用户界面包装器不同， gtomb 使用起来很容易。</p>
<p>让我们来看看如何使用 gtomb 建立一个新的 tomb。 首先，从菜单中启动 gtomb。 它可能会是这 样的：</p>
<p><a href="https://www.howtoforge.com/images/how_to_setup_and_install_tomb_on_ubuntu_1604/big/tomb2.png"><img src="http://p0.qhimg.com/t01f00851b43b3fb8a9.png" alt=""></a></p>
<p>所有的事情都是一目了然的，但为了完整起见，我将详细介绍如何建立你的第一个 tomb。</p>
<p>首先，点击第一个选项“dig”。 点击确定，然后选择一个位置。</p>
<p>接下来，输入你的 tomb 的大小：</p>
<p><a href="https://www.howtoforge.com/images/how_to_setup_and_install_tomb_on_ubuntu_1604/big/tomb3.png"><img src="http://p0.qhimg.com/t01c3facf0ca6545e6e.png" alt=""></a></p>
<p>你现在有了一个新的 tomb，但是你需要在使用它之前做一把钥匙。 要做到这一点, 请在主菜单中 单击“forge”：</p>
<p><a href="https://www.howtoforge.com/images/how_to_setup_and_install_tomb_on_ubuntu_1604/big/tomb4.png"><img src="http://p0.qhimg.com/t012acc22181f4e6304.png" alt=""></a></p>
<p>Tomb 会要求你输入两次密码，那就这样做。</p>
<p>然后通过点击来使用密钥锁定你的 tomb，你已经猜到了，“lock”。 要打开它, 请单击“open”并再次输入您的密码。</p>
<p>从上面的截图中你可以看到，使用 gtomb 是非常容易的，你不应该遇到任何问题。 大多数常见的任务都可以通过点击来完成，对于任何更复杂的事情，你可以使用命令行。</p>
<h3><a href="#最后的想法"></a>最后的想法</h3>
<p>就是这样！你现在应该准备好你的第一个 tomb 了，并存储任何你想在 tomb 中保密和安全的信息，这些信息会更加安全。</p>
<p>你可以同时使用多个 tomb，并将它们中的文件绑定到你的 <code>$HOME</code> 目录，这样你的程序就不会感到困惑。</p>
<p>我希望这本指南能帮助你开始。 就像使用一个标准的文件夹一样使用你的 Tomb，但是对于更复杂的命令，你总是可以查看 <a href="https://www.dyne.org/software/tomb/">Tomb 官方指南</a>。</p>
<hr>
<p>via: <a href="https://www.howtoforge.com/tutorial/how-to-install-and-use-tomb-file-encryption-on-ubuntu-1604/">https://www.howtoforge.com/tutorial/how-to-install-and-use-tomb-file-encryption-on-ubuntu-1604/</a></p>
<p>作者： <a href="https://www.howtoforge.com/">Dan Fries</a> 选题： <a href="https://github.com/lujun9972">lujun9972</a> 译者： <a href="https://github.com/Auk7F7">Auk7F7</a> 校对： <a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 16.04 LTS 上用 Tomb 加密文件

## 原文链接
[https://www.zcfy.cc/article/how-to-encrypt-files-with-tomb-on-ubuntu-16-04-lts](https://www.zcfy.cc/article/how-to-encrypt-files-with-tomb-on-ubuntu-16-04-lts)

