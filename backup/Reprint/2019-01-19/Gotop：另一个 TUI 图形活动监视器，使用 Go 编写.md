---
title: 'Gotop：另一个 TUI 图形活动监视器，使用 Go 编写' 
date: 2019-01-19 2:30:10
hidden: true
slug: 2a7tvybsscs
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#gotop另一个-tui-图形活动监视器使用-go-编写"></a>Gotop：另一个 TUI 图形活动监视器，使用 Go 编写</h1>
<p>你已经知道 <code>top</code> 命令，对么？是的，它提供类 Unix 操作系统中运行中的进程的动态实时信息。一些开发人员为 <code>top</code> 命令构建了图形前端，因此用户可以在图形窗口中轻松找到他们系统的活动。其中之一是 <strong>Gotop</strong>。顾名思义，Gotop 是一个 TUI 图形活动监视器，使用 <strong>Go</strong> 语言编写。它是完全免费、开源的，受到了 <a href="https://github.com/aksakalli/gtop">gtop</a> 和 <a href="https://github.com/MrRio/vtop">vtop</a> 的启发。</p>
<p>在此简要的指南中，我们将讨论如何安装和使用 Gotop 来监视 Linux 系统的活动。</p>
<h3><a href="#安装-gotop"></a>安装 Gotop</h3>
<p>Gotop 是用 Go 编写的，所以我们需要先安装它。要在 Linux 中安装 Go 语言，请参阅以下指南。</p>
<p>安装 Go 之后，使用以下命令下载最新的 Gotop 二进制文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sh -c <span class="hljs-string">"<span class="hljs-variable">$(curl https://raw.githubusercontent.com/cjbassi/gotop/master/download.sh)</span>"</span></span>

</code></pre><p>然后，将下载的二进制文件移动到您的 <code>$PATH</code> 中，例如 <code>/usr/local/bin/</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cp gotop /usr/<span class="hljs-built_in">local</span>/bin</span>

</code></pre><p>最后，用下面的命令使其可执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x /usr/<span class="hljs-built_in">local</span>/bin/gotop</span>

</code></pre><p>如果你使用的是基于 Arch 的系统，Gotop 存在于 <strong>AUR</strong> 中，所以你可以使用任何 AUR 助手程序进行安装。</p>
<p>使用 <a href="https://www.ostechnix.com/cower-simple-aur-helper-arch-linux/"><strong>Cower</strong></a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cower -S gotop</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-pacaur-arch-linux/"><strong>Pacaur</strong></a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pacaur -S gotop</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-packer-arch-linux-2/"><strong>Packer</strong></a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> packer -S gotop</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/trizen-lightweight-aur-package-manager-arch-based-systems/"><strong>Trizen</strong></a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> trizen -S gotop</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/yay-found-yet-another-reliable-aur-helper/"><strong>Yay</strong></a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yay -S gotop</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-yaourt-arch-linux/">yaourt</a>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yaourt -S gotop</span>

</code></pre><h3><a href="#用法"></a>用法</h3>
<p>Gotop 的使用非常简单！你所要做的就是从终端运行以下命令。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> gotop</span>

</code></pre><p>这样就行了！你将在简单的 TUI 窗口中看到系统 CPU、磁盘、内存、网络、CPU温度和进程列表的使用情况。</p>
<p><a href="https://camo.githubusercontent.com/46b79dec546a592063874e223366aa0c08489dc8/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30342f476f746f702d312e706e67"><img src="https://p0.ssl.qhimg.com/t01548e4df895b31801.png" alt=""></a></p>
<p>要仅显示CPU、内存和进程组件，请使用下面的 <code>-m</code> 标志：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> gotop -m</span>

</code></pre><p><a href="https://camo.githubusercontent.com/3188db035c98562a524af801b29c9bc753e35eb2/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30342f476f746f702d322e706e67"><img src="https://p0.ssl.qhimg.com/t01e416f0f48d048589.png" alt=""></a></p>
<p>你可以使用以下键盘快捷键对进程表进行排序。</p>
<ul>
<li><code>c</code> – CPU</li>
<li><code>m</code> – 内存</li>
<li><code>p</code> – PID</li>
</ul>
<p>对于进程浏览，请使用以下键。</p>
<ul>
<li><code>上/下</code> 箭头或者 <code>j/k</code> 键用于上移下移。</li>
<li><code>Ctrl-d</code> 和 <code>Ctrl-u</code> – 上移和下移半页。</li>
<li><code>Ctrl-f</code> 和 <code>Ctrl-b</code> – 上移和下移整页。</li>
<li><code>gg</code> 和 <code>G</code> – 跳转顶部和底部。</li>
</ul>
<p>按下 <code>TAB</code> 切换进程分组。要杀死选定的进程或进程组，请输入 <code>dd</code>。要选择一个进程，只需点击它。要向下/向上滚动，请使用鼠标滚动按钮。要放大和缩小 CPU 和内存的图形，请使用 <code>h</code> 和 <code>l</code>。要显示帮助菜单，只需按 <code>?</code>。</p>
<p>就是这些了。希望这有帮助。还有更多好东西。敬请关注！</p>
<h3><a href="#资源"></a>资源</h3>
<ul>
<li><a href="https://github.com/cjbassi/gotop">Gotop GitHub Repository</a></li>
</ul>
<hr>
<p>via: <a href="https://www.ostechnix.com/gotop-yet-another-tui-graphical-activity-monitor-written-in-go/">https://www.ostechnix.com/gotop-yet-another-tui-graphical-activity-monitor-written-in-go/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Gotop：另一个 TUI 图形活动监视器，使用 Go 编写

## 原文链接
[https://www.zcfy.cc/article/yet-another-tui-graphical-activity-monitor-written-in-go](https://www.zcfy.cc/article/yet-another-tui-graphical-activity-monitor-written-in-go)

