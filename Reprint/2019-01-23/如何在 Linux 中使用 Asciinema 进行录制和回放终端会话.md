---
title: '如何在 Linux 中使用 Asciinema 进行录制和回放终端会话' 
date: 2019-01-23 2:30:08
hidden: true
slug: mr490zu99h
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中使用-asciinema-进行录制和回放终端会话"></a>如何在 Linux 中使用 Asciinema 进行录制和回放终端会话</h1>
<h3><a href="#简介"></a>简介</h3>
<p>Asciinema 是一个轻量并且非常高效的终端会话录制器。使用它可以录制、回放和分享 JSON 格式的终端会话记录。与一些桌面录制器，比如 Recordmydesktop、Simplescreenrecorder、Vokoscreen 或 Kazam 相比，Asciinema 最主要的优点是，它能够以通过 ASCII 文本以及 ANSI 转义码编码来录制所有的标准终端输入、输出和错误信息。</p>
<p>事实上，即使是很长的终端会话，录制出的 JSON 格式文件也非常小。另外，JSON 格式使得用户可以利用简单的文件转化器，将输出的 JSON 格式文件嵌入到 HTML 代码中，然后分享到公共网站或者使用 asciinema 账户分享到 Asciinema.org 。最后，如果你的终端会话中有一些错误，并且你还懂一些 ASCI 转义码语法，那么你可以使用任何编辑器来修改你的已录制终端会话。</p>
<p><strong>难易程度：</strong></p>
<p>很简单！</p>
<p><strong>标准终端：</strong></p>
<ul>
<li><strong>#</strong> - 给定命令需要以 root 用户权限运行或者使用 <code>sudo</code> 命令</li>
<li><strong>$</strong> - 给定命令以常规权限用户运行</li>
</ul>
<h3><a href="#从软件库安装"></a>从软件库安装</h3>
<p>通常， asciinema 可以使用你的发行版的软件库进行安装。但是，如果不可以使用系统的软件库进行安装或者你想安装最新的版本，那么，你可以像下面的“从源代码安装”部分所描述的那样，使用 Linuxbrew 包管理器来执行 Asciinema 安装。</p>
<p><strong>在 Arch Linux 上安装：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pacman -S asciinema</span>

</code></pre><p><strong>在 Debian 上安装：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> apt install asciinema</span>

</code></pre><p><strong>在 Ubuntu 上安装：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install asciinema</span>

</code></pre><p><strong>在 Fedora 上安装：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install asciinema</span>

</code></pre><h3><a href="#从源代码安装"></a>从源代码安装</h3>
<p>最简单并且值得推荐的方式是使用 Linuxbrew 包管理器，从源代码安装最新版本的 Asciinema 。</p>
<h4><a href="#前提条件"></a>前提条件</h4>
<p>下面列出的前提条件是安装 Linuxbrew 和 Asciinema 需要满足的依赖关系：</p>
<ul>
<li>git</li>
<li>gcc</li>
<li>make</li>
<li>ruby</li>
</ul>
<p>在安装 Linuxbrew 之前，请确保上面的这些包都已经安装在了你的 Linux 系统中。</p>
<p><strong>在 Arch Linux 上安装 ruby：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> pacman -S git gcc make ruby</span>

</code></pre><p><strong>在 Debian 上安装 ruby：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> apt install git gcc make ruby</span>

</code></pre><p><strong>在 Ubuntu 上安装 ruby：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install git gcc make ruby</span>

</code></pre><p><strong>在 Fedora 上安装 ruby：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install git gcc make ruby</span>

</code></pre><p><strong>在 CentOS 上安装 ruby：</strong></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum install git gcc make ruby</span>

</code></pre><h4><a href="#安装-linuxbrew"></a>安装 Linuxbrew</h4>
<p>Linuxbrew 包管理器是苹果的 MacOS 操作系统很受欢迎的 Homebrew 包管理器的一个复刻版本。还没发布多久，Homebrew 就以容易使用而著称。如果你想使用 Linuxbrew 来安装 Asciinema，那么，请运行下面命令在你的 Linux 版本上安装 Linuxbrew：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ruby -e <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install)</span>"</span></span>

</code></pre><p>现在，Linuxbrew 已经安装到了目录 <code>$HOME/.linuxbrew/</code> 下。剩下需要做的就是使它成为可执行 <code>PATH</code> 环境变量的一部分。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">'export PATH="$HOME/.linuxbrew/bin:$PATH"'</span> &gt;&gt;~/.bash_profile</span>
<span class="hljs-meta">$</span><span class="bash"> . ~/.bash_profile</span>

</code></pre><p>为了确认 Linuxbrew 是否已经安装好，你可以使用 <code>brew</code> 命令来查看它的版本：</p>
<pre><code class="hljs lsl">$ brew --version
Homebrew <span class="hljs-number">1.1</span><span class="hljs-number">.7</span>
Homebrew/homebrew-core (git revision <span class="hljs-number">5229</span>; last commit <span class="hljs-number">2017</span><span class="hljs-number">-02</span><span class="hljs-number">-02</span>)

</code></pre><h4><a href="#安装-asciinema"></a>安装 Asciinema</h4>
<p>安装好 Linuxbrew 以后，安装 Asciinema 就变得无比容易了：</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>asciinema

</code></pre><p>检查 Asciinema 是否安装正确：</p>
<pre><code class="hljs lsl">$ asciinema --version
asciinema <span class="hljs-number">1.3</span><span class="hljs-number">.0</span>

</code></pre><h3><a href="#录制终端会话"></a>录制终端会话</h3>
<p>经过一番辛苦的安装工作以后，是时候来干一些有趣的事情了。Asciinema 是一个非常容易使用的软件。事实上，目前的 1.3 版本只有很少的几个可用命令行选项，其中一个是 <code>--help</code> 。</p>
<p>我们首先使用 <code>rec</code> 选项来录制终端会话。下面的命令将会开始录制终端会话，之后，你将会有一个选项来丢弃已录制记录或者把它上传到 asciinema.org 网站以便将来参考。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> asciinema rec</span>

</code></pre><p>运行上面的命令以后，你会注意到， Asciinema 已经开始录制终端会话了，你可以按下 <code>CTRL+D</code> 快捷键或执行 <code>exit</code> 命令来停止录制。如果你使用的是 Debian/Ubuntu/Mint Linux 系统，你可以像下面这样尝试进行第一次 asciinema 录制：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> su</span>
Password:
<span class="hljs-meta">#</span><span class="bash"> apt install sl</span>
<span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">exit</span></span>
<span class="hljs-meta">$</span><span class="bash"> sl</span>

</code></pre><p>一旦输入最后一个 <code>exit</code> 命令以后，将会询问你：</p>
<pre><code class="hljs awk">$ <span class="hljs-keyword">exit</span>
~ Asciicast recording finished.
~ Press &lt;Enter&gt; to upload, &lt;Ctrl-C&gt; to cancel.

https:<span class="hljs-regexp">//</span>asciinema.org<span class="hljs-regexp">/a/</span><span class="hljs-number">7</span>lw94ys68gsgr1yzdtzwijxm4

</code></pre><p>如果你不想上传你的私密命令行技巧到 asciinema.org 网站，那么有一个选项可以把 Asciinema 记录以 JSON 格式保存为本地文件。比如，下面的 asciinema 记录将被存为 <code>/tmp/my_rec.json</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> asciinema rec /tmp/my_rec.json</span>

</code></pre><p>另一个非常有用的 asciinema 特性是时间微调。如果你的键盘输入速度很慢，或者你在进行多任务，输入命令和执行命令之间的时间会比较长。Asciinema 会记录你的实时按键时间，这意味着每一个停顿都将反映在最终视频的长度上。可以使用 <code>-w</code> 选项来缩短按键的时间间隔。比如，下面的命令将按键的时间间隔缩短为 0.2 秒：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> asciinema rec -w 0.2</span>

</code></pre><h3><a href="#回放已录制终端会话"></a>回放已录制终端会话</h3>
<p>有两种方式可以来回放已录制会话。第一种方式是直接从 asciinema.org 网站上播放终端会话。这意味着，你之前已经把录制会话上传到了 asciinema.org 网站，并且需要提供有效链接：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> asciinema play https:<span class="hljs-comment">//asciinema.org/a/7lw94ys68gsgr1yzdtzwijxm4</span>

</code></pre><p>另外，你也可以使用本地存储的 JSON 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> asciinema play /tmp/my_rec.json</span>

</code></pre><p>如果要使用 <code>wget</code> 命令来下载之前的上传记录，只需在链接的后面加上 <code>.json</code>：</p>
<pre><code class="hljs stylus">$ wget -<span class="hljs-selector-tag">q</span> -O steam_locomotive<span class="hljs-selector-class">.json</span> https:<span class="hljs-comment">//asciinema.org/a/7lw94ys68gsgr1yzdtzwijxm4.json</span>
$ asciinema play steam_locomotive<span class="hljs-selector-class">.json</span>

</code></pre><h3><a href="#将视频嵌入-html"></a>将视频嵌入 HTML</h3>
<p>最后，asciinema 还带有一个独立的 JavaScript 播放器。这意味者你可以很容易的在你的网站上分享终端会话记录。下面，使用一段简单的 <code>index.html</code> 代码来说明这个方法。首先，下载所有必要的东西：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> /tmp/</span>
<span class="hljs-meta">$</span><span class="bash"> mkdir steam_locomotive</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> steam_locomotive/</span>
<span class="hljs-meta">$</span><span class="bash"> wget -q -O steam_locomotive.json https://asciinema.org/a/7lw94ys68gsgr1yzdtzwijxm4.json</span>
<span class="hljs-meta">$</span><span class="bash"> wget -q https://github.com/asciinema/asciinema-player/releases/download/v2.4.0/asciinema-player.css</span>
<span class="hljs-meta">$</span><span class="bash"> wget -q https://github.com/asciinema/asciinema-player/releases/download/v2.4.0/asciinema-player.js</span>

</code></pre><p>之后，创建一个新的包含下面这些内容的 <code>/tmp/steam_locomotive/index.html</code> 文件：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./asciinema-player.css"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">asciinema-player</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./steam_locomotive.json"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"80"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"24"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">asciinema-player</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./asciinema-player.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>完成以后，打开你的网页浏览器，按下 <code>CTRL+O</code> 来打开新创建的 <code>/tmp/steam_locomotive/index.html</code> 文件。</p>
<h3><a href="#结论"></a>结论</h3>
<p>正如前面所说的，使用 asciinema 录制器来录制终端会话最主要的优点是它的输出文件非常小，这使得你的视频很容易分享出去。上面的例子产生了一个包含 58472 个字符的文件，它是一个只有 58 KB 大 小的 22 秒终端会话视频。如果我们查看输出的 JSON 文件，会发现甚至这个数字已经非常大了，这主要是因为一个 “蒸汽机车” 已经跑过了终端。这个长度的正常终端会话一般会产生一个更小的输出文件。</p>
<p>下次，当你想要在一个论坛上询问关于 Linux 配置的问题，并且很难描述你的问题的时候，只需运行下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> asciinema rec</span>

</code></pre><p>然后把最后的链接贴到论坛的帖子里。</p>
<h3><a href="#故障排除"></a>故障排除</h3>
<h4><a href="#在-utf-8-环境下运行-asciinema"></a>在 UTF-8 环境下运行 asciinema</h4>
<p>错误信息：</p>
<pre><code class="hljs livecodeserver">asciinema needs <span class="hljs-keyword">a</span> UTF<span class="hljs-number">-8</span> native locale <span class="hljs-built_in">to</span> run. Check <span class="hljs-keyword">the</span> output <span class="hljs-keyword">of</span> `locale` <span class="hljs-keyword">command</span>.

</code></pre><p>解决方法： 生成并导出 UTF-8 语言环境。例如：</p>
<pre><code class="hljs stylus">$ localedef -c -f UTF-<span class="hljs-number">8</span> -<span class="hljs-selector-tag">i</span> en_US en_US<span class="hljs-selector-class">.UTF-8</span>
$ export LC_ALL=en_US<span class="hljs-selector-class">.UTF-8</span>

</code></pre><hr>
<p>via: <a href="https://linuxconfig.org/record-and-replay-terminal-session-with-asciinema-on-linux">https://linuxconfig.org/record-and-replay-terminal-session-with-asciinema-on-linux</a></p>
<p>作者：<a href="https://linuxconfig.org/record-and-replay-terminal-session-with-asciinema-on-linux">Lubos Rendek</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中使用 Asciinema 进行录制和回放终端会话

## 原文链接
[https://www.zcfy.cc/article/record-and-replay-terminal-session-with-asciinema-on-linux](https://www.zcfy.cc/article/record-and-replay-terminal-session-with-asciinema-on-linux)

