---
title: 如何在 Windows 10 上开启 WSL 之旅
reprint: true
categories: reprint
abbrlink: 6216c0b2
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <h1><a href="#如何在-windows-10-上开启-wsl-之旅"></a>如何在 Windows 10 上开启 WSL 之旅</h1>
<blockquote>
<p>WSL 可以让你访问 Windows 上的 Linux Bash shell。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/6b499fe8299b48642b4ef4fa842077f2e64c9304/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f77736c2d6d61696e2e706e673f69746f6b3d774a355772553955"><img src="https://p0.ssl.qhimg.com/t01b474f86b7867d26f.png" alt=""></a></p>
<p>在 <a href="https://www.linux.com/blog/learn/2018/2/windows-subsystem-linux-bridge-between-two-platforms">上一篇文章</a> 中，我们讨论过关于 Windows 的子系统 LinuxWindows Subsystem for Linux（WSL）的目标用户。本文，我们将在 Windows 10 的设备上，开启 WSL 的旅程。</p>
<h3><a href="#为-wsl-做准备"></a>为 WSL 做准备</h3>
<p>您必须使用最新版本的 Windows 10 Fall Creator Update。之后，通过在开始菜单栏搜索 “About”，检查 Windows 10 的版本。为了使用 WSL，您的版本应当为 1709 或者最新版。</p>
<p>这里有一张关于我的操作系统的截图。</p>
<p><a href="https://camo.githubusercontent.com/52a299091be3d708a3413cc2b0485251e17a87ac/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f6b48464b4f767262473167586442396c736254715843344e3477304c62737a3142756c356579396d725f453235354769694278663863526c6174727465367a323379766f386c484a47386e515f57654868554e59715070376b48755154544d7565714d7368435437314a73624d7232576968394b46487548674e673142636c577a2d69754274344f"><img src="https://p0.ssl.qhimg.com/t0193e11169f98868fa.png" alt=""></a></p>
<p>如果您安装了之前的版本，您需要在 <a href="https://www.microsoft.com/en-us/software-download/windows10">这里</a> 下载并且安装 Windows 10 Fall Creator Update (FCU)。安装完毕后，安装可用的更新（在开始菜单的搜索框中搜索 “updates”）。</p>
<p>前往 “启用或关闭 Windows 功能” ，然后滚动至底部，如截图所示，勾选 “适用于 Linux 的 Windows 子系统”，点击确定。它将会下载安装需要的包。</p>
<p><a href="https://camo.githubusercontent.com/b6e860a3a19116d33b8a1c98098bb741e64383ac/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f6f56316d44714765337a7751674c304e33724461734848365a7748747861486c79724c7a6a77377846394d395f416348504e53784d31384b44574b325a705663554f66785656704e48394c77554a543545745245377a55724a435f6757563566333435535a52416758634a7a4f452d38724d382d524350544e746e73367656503337563545666c70"><img src="https://p0.ssl.qhimg.com/t0111f89643ea9440ba.png" alt=""></a></p>
<p>安装完成之后，系统将会询问是否重启。是的，重启设备吧。WSL 在系统重启之前不会启动，如下所示：</p>
<p><a href="https://camo.githubusercontent.com/5620a0c144f2495cbadd80b88a40bb546b09c47a/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f47734e4f514c4a6c48655a626b61437372444968665676456f79637533443075706f54647436614e456f7a4163514135395a336844755f5378543649344b346777784c505830596e6d5573434b6a615161614732506f416755594d634e305a7630744246616f554c33735a727964644d346d64526a31453274452d494b5f474c4b34504461347a66"><img src="https://p0.ssl.qhimg.com/t0184a5cc0c293d86a9.png" alt=""></a></p>
<p>一旦您的系统重启，返回 “启用或关闭 Windows 功能” 页面，确认 “适用于 Linux 的 Windows 子系统” 已经被勾选。</p>
<h3><a href="#在-windows-中安装-linux"></a>在 Windows 中安装 Linux</h3>
<p>在 Windows 中安装 Linux，有很多方式，这里我们选择一种最简单的方式。打开 Microsoft Store，搜索 Linux。您将看到下面的选项：</p>
<p><a href="https://camo.githubusercontent.com/f2de7fc773f49166b3ee99446cdc42cbbea77bde/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f5941523455675a694641793263646b473455376a51375f6d38316c727852366148534d4f644544374d4b456f59784573585f794c77794d6a394e3265647433474a324a4c78366d557346455a46494c434353425532734d4f7176654656575a5448634358684669355032586b2d39496b63334e4b397365757035434a4f624963594a504f52645057"><img src="https://p0.ssl.qhimg.com/t01d318cc61ea5269dc.png" alt=""></a></p>
<p>点击 “获取”，之后 Windows 商店将会提供三个选项：Ubuntu、openSUSE Leap 42 和 SUSE Linux Enterprise Server。您可以一并安装上述三个发行版，并且它们可以同时运行。为了能使用 SLE，您需要一份订阅。</p>
<p>在此，我将安装 openSUSE Leap 42 和 Ubuntu。选中您想要的发行版，点击“获得”按钮并安装。一旦安装完毕，您就可以在 Windows 中启动 openSUSE。为了方便访问，可以将其固定到开始菜单中。</p>
<p><a href="https://camo.githubusercontent.com/3c6eb16362f3cb568e4c8c06ea16bb4e41ce2db9/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f344c55366552727a4467427072447545625346697a527550314a5f7a533372426e6f4a6255324f414f48334d78376e664f524f66796638316b3173345951794c426375307153584f6f617162596b584c3557707039674e43644b485f5773456371577a6a473675587a5976435951343270734f7a36497a334e4637456c7350726469464930635976"><img src="https://p0.ssl.qhimg.com/t013653304829f83cf5.png" alt=""></a></p>
<h3><a href="#在-windwods-中使用-linux"></a>在 Windwods 中使用 Linux</h3>
<p>当您启动该发行版，它将会打开一个 Bash Shell 并且安装此发行版。安装完毕之后，您就可以开始使用了。您需要留意，openSUSE 中并没有（普通）用户，它直接运行在 <code>root</code> 用户下，但是 Ubuntu 会询问您是否创建用户。在 Ubuntu，您可以以 <code>sudo</code> 用户执行管理任务。</p>
<p>在 openSUSE 上，您可以很轻松的创建一个用户：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd [username]</span>
<span class="hljs-meta">#</span><span class="bash"> passwd [username]</span>

</code></pre><p>为此用户创建一个新的密码。例如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd swapnil</span>
<span class="hljs-meta">#</span><span class="bash"> passwd swapnil</span>

</code></pre><p>您可以通过 <code>su</code> 命令从 root 用户切换过来。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">su swapnil</span>

</code></pre><p>您需要非根用户来执行许多任务，比如使用 <code>rsync</code> 移动文件到本地设备。</p>
<p>而首要任务是更新发行版。对于 openSUSE 来说，您应该：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">zypper up</span>

</code></pre><p>而对于 Ubuntu：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> update
sudo apt-<span class="hljs-builtin-name">get</span> dist-upgrade

</code></pre><p><a href="https://camo.githubusercontent.com/f4cbc04d350756d4b02c5228cd0eb6b230aa429f/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f376352676a314f364a3879664f334c346f6c3573502d5a4355375f75774f75456f547a7375565739635535786942577a5f63705a31494269644e543043317767397a524f496e635669557a58443076506f4835636767517475776b616e526652644456584f49343841634b464c742d497132434246346d47527771715776534f6862304846706a6d"><img src="https://p0.ssl.qhimg.com/t01b6f761dad4f854f9.png" alt=""></a></p>
<p>现在，您就在 Windows 上拥有了原生的 Linux Bash shell。想在 Windows 10 上通过 <code>ssh</code> 连接您的服务器？不需要安装 puTTY 或是 Cygwin。打开 Bash 之后，就可以通过 <code>ssh</code> 进入您的服务器。简单之至。</p>
<p>想通过 <code>rsync</code> 同步文件到您的服务器？直接使用 <code>rsync</code>。它切实的将我们的 Windows 设备转变得更为实用，帮助那些需要使用原生 Linux 命令和 Linux 工具的用户避开虚拟机，大开方便之门。</p>
<h3><a href="#fedora-在哪里"></a>Fedora 在哪里？</h3>
<p>您可能奇怪为什么没有 Fedora。可惜，商城里并没有 Fedora。Fedora 项目发布负责人在 Twitter 上表示，“我们正在解决一些非技术性问题。现在可能提供不了更多了。”</p>
<p>我们并不确定这些非技术性问题是什么。当一些用户询问 WSL 团队为何不发布 Fedora，毕竟它也是一个开源项目。项目负责人 Rich Turner 在 Microsoft <a href="https://github.com/Microsoft/WSL/issues/2584">回应</a>，“我们有一个不发布其他知识产权到应用商店的政策。我们相信，相较于被微软或是其他非权威人士，社区更希望看到发行版由发行版所有者发布。”</p>
<p>因此，微软不方便在 Windows 商店中直接发布 Debian 或是 Arch 系统。这些任务应该落在他们的官方团队中，应该由他们将发行版带给 Windows 10 的用户。</p>
<h3><a href="#欲知后事下回分解"></a>欲知后事，下回分解</h3>
<p>下一篇文章，我们会讨论关于将 Windows 10 作为 Linux 设备，并且向您展示，您可能会在 Linux 系统上使用的命令行工具。</p>
<hr>
<p>via: <a href="https://www.linux.com/blog/learn/2018/2/how-get-started-using-wsl-windows-10">https://www.linux.com/blog/learn/2018/2/how-get-started-using-wsl-windows-10</a></p>
<p>作者：<a href="https://www.linux.com/users/arnieswap">SWAPNIL BHARTIYA</a> 译者：<a href="https://github.com/CYLeft">CYLeft</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-to-get-started-using-wsl-in-windows-10](https://www.zcfy.cc/article/how-to-get-started-using-wsl-in-windows-10)
原文标题: 如何在 Windows 10 上开启 WSL 之旅
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
