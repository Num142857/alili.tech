---
title: '通过玩命令行游戏来测试你的 BASH 技能' 
date: 2019-01-20 2:30:11
hidden: true
slug: ihpeuk5vfhc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#通过玩命令行游戏来测试你的-bash-技能"></a>通过玩命令行游戏来测试你的 BASH 技能</h1>
<p>如果我们经常在实际场景中使用 Linux 命令，我们就会更有效的学习和记忆它们。除非你经常使用 Linux 命令，否则你可能会在一段时间内忘记它们。无论你是新手还是老手，总会有一些趣味的方法来测试你的 BASH 技能。在本教程中，我将解释如何通过玩命令行游戏来测试你的 BASH 技能。其实从技术上讲，这些并不是像 Super TuxKart、极品飞车或 CS 等真正的游戏。这些只是 Linux 命令培训课程的游戏化版本。你将需要根据游戏本身的某些指示来完成一个任务。</p>
<p>现在，我们来看看几款能帮助你实时学习和练习 Linux 命令的游戏。这些游戏不是消磨时间或者令人惊诧的，这些游戏将帮助你获得终端命令的真实体验。请继续阅读：</p>
<h3><a href="#使用-wargames-来测试-bash-技能"></a>使用 “Wargames” 来测试 BASH 技能</h3>
<p>这是一个在线游戏，所以你必须联网。这些游戏可以帮助你以充满乐趣的游戏形式学习和练习 Linux 命令。Wargames 是一个 shell 游戏的集合，每款游戏有很多关卡。只有通过解决先前的关卡才能访问下一个关卡。不要担心！每个游戏都提供了有关如何进入下一关的清晰简洁说明。</p>
<p>要玩 Wargames，请点击以下链接：<a href="http://overthewire.org/wargames/">Wargames</a> 。</p>
<p><a href="https://camo.githubusercontent.com/cb030cf2cb35af8d92ac160205f9f2a7bf0ba11e/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30332f57617267616d65732d312e706e67"><img src="https://p0.ssl.qhimg.com/t01d8ea88c0b619d29a.png" alt=""></a></p>
<p>如你所见，左边列出了许多 shell 游戏。每个 shell 游戏都有自己的 SSH 端口。所以，你必须通过本地系统配置 SSH 连接到游戏，你可以在 Wargames 网站的左上角找到关于如何使用 SSH 连接到每个游戏的信息。</p>
<p>例如，让我们来玩 Bandit 游戏吧。为此，单击 Wargames 主页上的 Bandit 链接。在左上角，你会看到 Bandit 游戏的 SSH 信息。</p>
<p><a href="https://camo.githubusercontent.com/e291d035ed4ff352e37394b51f784c1c9a538d6b/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30332f42616e6469742d67616d652e706e67"><img src="https://p0.ssl.qhimg.com/t015147cae78edd5fa7.png" alt=""></a></p>
<p>正如你在上面的屏幕截图中看到的，有很多关卡。要进入每个关卡，请单机左侧列中的相应链接。此外，右侧还有适合初学者的说明。如果你对如何玩此游戏有任何疑问，请阅读它们。</p>
<p>现在，让我们点击它进入关卡 0。在下一个屏幕中，你将获得该关卡的 SSH 信息。</p>
<p><a href="https://camo.githubusercontent.com/4784dddd9e0e4eb7c527c0a080d2d10f7bf030e4/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30332f42616e6469742d6c6576656c2d302e706e67"><img src="https://p0.ssl.qhimg.com/t017306259ffbb55e5e.png" alt=""></a></p>
<p>正如你在上面的屏幕截图中看到的，你需要配置 SSH 端口 2220 连接 <code>bandit.labs.overthewire.org</code>，用户名是 <code>bandit0</code>，密码是 <code>bandit0</code>。</p>
<p>让我们连接到 Bandit 游戏关卡 0。</p>
<pre><code class="hljs stylus">$ ssh bandit0@bandit<span class="hljs-selector-class">.labs</span><span class="hljs-selector-class">.overthewire</span><span class="hljs-selector-class">.org</span> -<span class="hljs-selector-tag">p</span> <span class="hljs-number">2220</span>

</code></pre><p>输入密码 <code>bandit0</code>。</p>
<p>示例输出将是：</p>
<p><a href="https://camo.githubusercontent.com/f5246a43f3f78b2cecc468365cebdea750d3d6f9/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30332f42616e6469742d6c6576656c2d302d7373682d312e706e67"><img src="https://p0.ssl.qhimg.com/t014261f18b82d002f7.png" alt=""></a></p>
<p>登录后，输入 <code>ls</code> 命令查看内容或者进入关卡 1 页面，了解如何通过关卡 1 等等。建议的命令列表已在每个关卡提供。所以，你可以选择和使用任何合适的命令来解决每个关卡。</p>
<p>我必须承认，Wargames 是令人上瘾的，并且解决每个关卡是非常有趣的。 尽管有些关卡确实很具挑战性，你可能需要谷歌才能知道如何解决问题。 试一试，你会很喜欢它。</p>
<h3><a href="#使用-terminus-来测试-bash-技能"></a>使用 “Terminus” 来测试 BASH 技能</h3>
<p>这是另一个基于浏览器的在线 CLI 游戏，可用于改进或测试你的 Linux 命令技能。要玩这个游戏，请打开你的 web 浏览器并导航到以下 URL：<a href="http://web.mit.edu/mprat/Public/web/Terminus/Web/main.html">Play Terminus Game</a></p>
<p>一旦你进入游戏，你会看到有关如何玩游戏的说明。与 Wargames 不同，你不需要连接到它们的游戏服务器来玩游戏。Terminus 有一个内置的 CLI，你可以在其中找到有关如何使用它的说明。</p>
<p>你可以使用命令 <code>ls</code> 查看周围的环境，使用命令 <code>cd 位置</code> 移动到新的位置，返回使用命令 <code>cd ..</code>，与这个世界进行交互使用命令 <code>less 项目</code> 等等。要知道你当前的位置，只需输入 <code>pwd</code>。</p>
<p><a href="https://camo.githubusercontent.com/404fbc15b8ae8391afb0388f6975301528009acf/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30332f5465726d696e75732e706e67"><img src="https://p0.ssl.qhimg.com/t0199c4818aa6796811.png" alt=""></a></p>
<h3><a href="#使用-clmystery-来测试-bash-技能"></a>使用 “clmystery” 来测试 BASH 技能</h3>
<p>与上述游戏不同，你可以在本地玩这款游戏。你不需要连接任何远程系统，这是完全离线的游戏。</p>
<p>相信我，这家伙是一个有趣的游戏。按照给定的说明，你将扮演一个侦探角色来解决一个神秘案件。</p>
<p>首先，克隆仓库：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/veltman/clmystery.git

</code></pre><p>或者，从 <a href="https://github.com/veltman/clmystery/archive/master.zip">这里</a> 将其作为 zip 文件下载。解压缩并切换到下载文件的地方。最后，通过阅读 <code>instructions</code> 文件来开启宝箱。</p>
<pre><code class="hljs stylus">[sk@sk]: clmystery-master&gt;$ ls
cheatsheet<span class="hljs-selector-class">.md</span> cheatsheet<span class="hljs-selector-class">.pdf</span> encoded hint1 hint2 hint3 hint4 hint5 hint6 hint7 hint8 instructions LICENSE<span class="hljs-selector-class">.md</span> mystery README<span class="hljs-selector-class">.md</span> solution

</code></pre><p>这里是玩这个游戏的说明：</p>
<p>终端城发生了一起谋杀案，TCPD 需要你的帮助。你需要帮助它们弄清楚是谁犯罪了。</p>
<p>为了查明是谁干的，你需要到 <code>mystery</code> 子目录并从那里开始工作。你可能需要查看犯罪现场的所有线索（ <code>crimescene</code> 文件）。现场的警官相当谨慎，所以他们在警官报告中写下了一切。幸运的是，警官以全部大写的 “CLUE” 一词把真正的线索标记了出来。</p>
<p>如果里遇到任何问题，请打开其中一个提示文件，例如 “hint1”，“hint2” 等。你可以使用下面的 <code>cat</code> 命令打开提示文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cat hint1</span>
<span class="hljs-meta">$</span><span class="bash"> cat hint2</span>

</code></pre><p>要检查你的答案或找出解决方案，请在 <code>clmystery</code> 目录中打开文件 <code>solution</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cat solution</span>

</code></pre><p>要了解如何使用命令行，请参阅 <code>cheatsheet.md</code> 或 <code>cheatsheet.pdf</code> （在命令行中，你可以输入 ‘nano cheatsheet.md’）。请勿使用文本编辑器查看除 <code>instructions</code>、<code>cheatsheet</code> 和 <code>hint</code> 以外的任何文件。</p>
<p>有关更多详细信息，请参阅 <a href="https://github.com/veltman/clmystery">clmystery GitHub</a> 页面。</p>
<p>推荐阅读：</p>
<p>而这就是我现在所知道的。如果将来遇到任何问题，我会继续添加更多游戏。将此链接加入书签并不时访问。如果你知道其他类似的游戏，请在下面的评论部分告诉我，我将测试和更新本指南。</p>
<p>还有更多好东西，敬请关注！</p>
<p>干杯！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/test-your-bash-skills-by-playing-command-line-games/">https://www.ostechnix.com/test-your-bash-skills-by-playing-command-line-games/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过玩命令行游戏来测试你的 BASH 技能

## 原文链接
[https://www.zcfy.cc/article/test-your-bash-skills-by-playing-command-line-games](https://www.zcfy.cc/article/test-your-bash-skills-by-playing-command-line-games)

