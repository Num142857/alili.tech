---
title: '为你在 Bash 历史中执行过的每一项命令设置时间和日期' 
date: 2019-01-24 2:30:11
hidden: true
slug: aspmydtljqn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为你在-bash-历史中执行过的每一项命令设置时间和日期"></a>为你在 Bash 历史中执行过的每一项命令设置时间和日期</h1>
<p>在默认情况下，所有通过 Bash 在命令行中执行过的命令都被存储在历史缓存区或者一个叫做 <code>~/.bash_history</code> 的文件里。这意味着系统管理员可以看到系统上用户执行过的命令清单，或者用户可以通过像 <a href="http://www.tecmint.com/history-command-examples/">history 命令</a>这样的选项来看他或她自己的命令历史。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">history</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Linux-History-Command.png"><img src="https://p5.ssl.qhimg.com/t01e06e6469e940e11e.png" alt="Linux History Command"></a></p>
<p><em>Linux 历史命令</em></p>
<p>从上面 <a href="http://www.tecmint.com/history-command-examples/">history 命令</a>的输出可知，命令被执行的日期和时间并没有显示出来。基本上所有的 Linux 发行版的默认设置都是这样的。</p>
<p>在这篇文章里，我们将解释当在 Bash 中执行 <code>history</code> 命令显示每个命令时，如何配置显示时间戳信息。</p>
<p>每个命令相关的日期和时间可以记录到历史文件中，用 <code>HISTTIMEFORMAT</code> 环境变量的设置作为命令历史的备注记录。</p>
<p>这里有两种可行的方式来达到目的：一种是暂时的效果，一种是永久的效果。</p>
<p>要临时设置 <code>HISTTIMEFORMAT</code> 环境变量，在命令行这样输出它：</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">export</span> <span class="hljs-attribute">HISTTIMEFORMAT</span>=<span class="hljs-string">'%F %T'</span>

</code></pre><p>在上面的输出命令当中，时间戳格式如下：</p>
<p>1、<code>％F</code>－展开为完整日期，即 <code>％Y-％m-％d</code>（年-月-日）。</p>
<p>2、<code>％T</code>－展开为时间，即 <code>％H:％M:％S</code>（时:分:秒）。</p>
<p>通读 <a href="http://www.tecmint.com/sort-ls-output-by-last-modified-date-and-time/">date 命令</a>的 man 手册来获得更多使用说明：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man date</span>

</code></pre><p>然后如下检查你的命令历史：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">history</span> </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Set-Date-and-Time-on-Linux-Commands-History.png"><img src="https://p3.ssl.qhimg.com/t010bfab9d8a35cc3af.png" alt="Display Linux Command History with Date and Time"></a></p>
<p><em>显示带有日期和时间的 Linux 命令历史。</em></p>
<p>（LCTT 译注：注意：这个功能只能用在当 HISTTIMEFORMAT 这个环境变量被设置之后，之后的那些新执行的 bash 命令才会被打上正确的时间戳。在此之前的所有命令，都将会显示成设置 HISTTIMEFORMAT 变量的时间。）</p>
<p>然而，如果你想永久地配置该变量，用你最喜欢的编辑器打开文件 <code>~/.bashrc</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi ~/.bashrc</span>

</code></pre><p>然后在下方添加（用注释将其标记为你自己的配置）：</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># 我的配置</span>
<span class="hljs-builtin-name">export</span> <span class="hljs-attribute">HISTTIMEFORMAT</span>=<span class="hljs-string">'%F %T'</span>

</code></pre><p>保存文件并退出，然后，运行下面的命令以便改动当即生效：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">source</span> ~/.bashrc</span>

</code></pre><p>就是这些！请通过下方的评论区来与我们分享一些有趣的历史命令的小技巧以及你对这篇文章的想法。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/9bda718a074a10a458a4f2a719822c3e32d74ff1/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f37626164646462633533323937623265386564373031316366343564663063303f733d31323826643d626c616e6b26723d67"><img src="https://p5.ssl.qhimg.com/t01ed9dfa925baac48b.jpg" alt=""></a></p>
<p>我是 Ravi Saive，TecMint 的创建者。一个爱在网上分享的技巧和提示的电脑极客和 Linux 专家。我的大多数服务器运行在名为 Linux 的开源平台上。请在 Twitter、 Facebook 和 Google 等上关注我。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/display-linux-command-history-with-date-and-time/">http://www.tecmint.com/display-linux-command-history-with-date-and-time/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/admin/">Ravi Saive</a> 译者：<a href="https://github.com/Hymantin">Hymantin</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为你在 Bash 历史中执行过的每一项命令设置时间和日期

## 原文链接
[https://www.zcfy.cc/article/set-date-and-time-for-each-command-you-execute-in-bash-history](https://www.zcfy.cc/article/set-date-and-time-for-each-command-you-execute-in-bash-history)

