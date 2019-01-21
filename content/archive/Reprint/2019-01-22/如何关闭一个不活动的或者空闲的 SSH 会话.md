---
title: '如何关闭一个不活动的或者空闲的 SSH 会话' 
date: 2019-01-22 2:30:08
hidden: true
slug: 7u880rdu4ib
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何关闭一个不活动的或者空闲的-ssh-会话"></a>如何关闭一个不活动的或者空闲的 SSH 会话</h1>
<p>让我们来假设一下，当你通过 ssh 在服务器上工作时，由于网络、电源或者是本地 PC 重启等原因会导致你的会话连接断开。</p>
<p>你可能会再次登录服务器继续工作也可能不会，但是你始终会留下之前没有关闭的 ssh 会话。</p>
<p>如何关闭一个不活动的 ssh 会话？首先使用 <code>w</code> 命令来识别出不活动或者是空闲的 ssh 会话，接着使用 <code>pstree</code> 命令来获取空闲会话的 PID，最后就是使用 <code>kill</code> 命令来关闭会话了。</p>
<p>建议阅读：<a href="https://linux.cn/article-6262-1.html">Mosh（Mobile Shell）- 最好的SSH 远程连接替代选项</a></p>
<h3><a href="#如何识别不活动的或者是空闲的-ssh-会话"></a>如何识别不活动的或者是空闲的 SSH 会话</h3>
<p>登录系统通过 <code>w</code> 命令来查看当前有多少用户登录着。如果你识别出了自己的会话连接就可以记下其它不活动或者是空闲的 ssh 会话去关闭。</p>
<p>在我当前的例子中，能看见两个用户登录着，其中一个是我当前在执行 <code>w</code> 命令的 ssh 会话另一个就是之前的空闲会话了。</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># w</span>
 10:36:39 up 26 days, 20:29,  2 users,  load average: 0.00, 0.02, 0.00<span class="hljs-built_in">
USER </span>    TTY      <span class="hljs-keyword">FROM</span>              LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    219.91.219.14    10:34   28.00s  0.00s  0.00s -bash
root     pts/2    219.91.219.14    10:36    0.00s  0.00s  0.00s w

</code></pre><h3><a href="#如何获取-ssh-会话的-pid"></a>如何获取 SSH 会话的 PID</h3>
<p>为了关闭空闲的 ssh 会话，我们需要空闲会话进程的父进程的 PID。我们可以执行 <code>pstree</code> 命令来查看包括了所有进程的树状图，以便获取父进程的 pid。</p>
<p>你会获得与下方示例中相似的输出。<code>pstree</code> 命令的输出会比这个多得多，为了更好的理解我删去了许多不相关的内容。</p>
<pre><code class="hljs erlang"># pstree -p
<span class="hljs-function"><span class="hljs-title">init</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span>-+-<span class="hljs-title">abrtd</span><span class="hljs-params">(<span class="hljs-number">2131</span>)</span>
        |-<span class="hljs-title">acpid</span><span class="hljs-params">(<span class="hljs-number">1958</span>)</span>
        |-<span class="hljs-title">httpd</span><span class="hljs-params">(<span class="hljs-number">32413</span>)</span>-+-<span class="hljs-title">httpd</span><span class="hljs-params">(<span class="hljs-number">32442</span>)</span>
        |
    |-<span class="hljs-title">mingetty</span><span class="hljs-params">(<span class="hljs-number">2198</span>)</span>
        |-<span class="hljs-title">mysqld_safe</span><span class="hljs-params">(<span class="hljs-number">24298</span>)</span>---<span class="hljs-title">mysqld</span><span class="hljs-params">(<span class="hljs-number">24376</span>)</span>-+-{<span class="hljs-title">mysqld</span>}<span class="hljs-params">(<span class="hljs-number">24378</span>)</span>
        |
        |-<span class="hljs-title">php</span><span class="hljs-params">(<span class="hljs-number">32456</span>)</span>-+-<span class="hljs-title">php</span><span class="hljs-params">(<span class="hljs-number">32457</span>)</span>
        |
        |-<span class="hljs-title">sshd</span><span class="hljs-params">(<span class="hljs-number">2023</span>)</span>-+-<span class="hljs-title">sshd</span><span class="hljs-params">(<span class="hljs-number">10132</span>)</span>---<span class="hljs-title">bash</span><span class="hljs-params">(<span class="hljs-number">10136</span>)</span>
        |            `-<span class="hljs-title">sshd</span><span class="hljs-params">(<span class="hljs-number">10199</span>)</span>---<span class="hljs-title">bash</span><span class="hljs-params">(<span class="hljs-number">10208</span>)</span>---<span class="hljs-title">pstree</span><span class="hljs-params">(<span class="hljs-number">10226</span>)</span>
        |-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">774</span>)</span>-+-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">2191</span>)</span>
                     `-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">27282</span>)</span>

</span></code></pre><p>从上方的输出中，你可以看到 <code>sshd</code> 进程与分支的树形图。<code>sshd</code> 的主进程是 <code>sshd（2023）</code>，另两个分支分别为 <code>sshd（10132）</code> 和 <code>sshd（10199）</code>。</p>
<p>跟我在文章开始讲的相同，其中一个是我新的会话连接 <code>sshd（10199）</code> 它展示了我正在执行的 <code>pstree</code> 命令，因此空闲会话是另一个进程为 <code>sshd（10132）</code>。</p>
<ul>
<li>建议阅读：<a href="http://www.2daygeek.com/shellinabox-web-based-ssh-terminal-to-access-remote-linux-servers/">如何通过标准的网页浏览器来接入 Secure Shell (SSH) 服务器</a></li>
<li>建议阅读：<a href="http://www.2daygeek.com/pssh-parallel-ssh-run-execute-commands-on-multiple-linux-servers/">PSSH - 在多台 Linux 服务器上并行的执行命令</a></li>
</ul>
<h3><a href="#如何关闭空闲-ssh-会话"></a>如何关闭空闲 SSH 会话</h3>
<p>我们已经获得了有关空闲会话的所有信息。那么，就让我们来使用 <code>kill</code> 命令来关闭空闲会话。请确认你将下方的 PID 替换成了你服务器上的空闲会话 PID。</p>
<pre><code class="hljs shell"><span class="hljs-meta">
#</span><span class="bash"> <span class="hljs-built_in">kill</span> -9 10132</span>

</code></pre><p>（LCTT 译注：这里介绍另一个工具 <code>pkill</code>，使用 <code>pkill -t pts/0 -kill</code> 就可以关闭会话, debian 8 下可用，有些版本似乎需要更改 <code>-kill</code> 的位置）</p>
<h3><a href="#再次查看空闲会话是否已经被关闭"></a>再次查看空闲会话是否已经被关闭</h3>
<p>再次使用 <code>w</code> 命令来查看空闲会话是否已经被关闭。没错，只有那个我自己的当前会话还在，因此那个空闲会话已经被关闭了。</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># w</span>
 10:40:18 up 26 days, 20:33,  1 user,  load average: 0.11, 0.04, 0.01<span class="hljs-built_in">
USER </span>    TTY      <span class="hljs-keyword">FROM</span>              LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/2    219.91.219.14    10:36    0.00s  0.00s  0.00s w

</code></pre><ul>
<li>建议阅读：<a href="https://linux.cn/article-8199-1.html">rtop - 一个好用的通过 SSH 来监控远程服务器的工具</a></li>
<li>建议阅读：<a href="http://www.2daygeek.com/dsh-run-execute-shell-commands-on-multiple-linux-servers-at-once/">DSH - 同时在多台 Linux 服务器上执行命令</a></li>
</ul>
<h3><a href="#再次使用-pstree-命令检查"></a>再次使用 pstree 命令检查</h3>
<p>再次使用 <code>pstree</code> 命令确认。是的，只有那个我自己的 ssh 会话还在。</p>
<pre><code class="hljs erlang"># pstree -p
<span class="hljs-function"><span class="hljs-title">init</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span>-+-<span class="hljs-title">abrtd</span><span class="hljs-params">(<span class="hljs-number">2131</span>)</span>
        |-<span class="hljs-title">acpid</span><span class="hljs-params">(<span class="hljs-number">1958</span>)</span>
        |
        |-<span class="hljs-title">httpd</span><span class="hljs-params">(<span class="hljs-number">32413</span>)</span>-+-<span class="hljs-title">httpd</span><span class="hljs-params">(<span class="hljs-number">32442</span>)</span>
        |
        |-<span class="hljs-title">mingetty</span><span class="hljs-params">(<span class="hljs-number">2198</span>)</span>
        |-<span class="hljs-title">mysqld_safe</span><span class="hljs-params">(<span class="hljs-number">24298</span>)</span>---<span class="hljs-title">mysqld</span><span class="hljs-params">(<span class="hljs-number">24376</span>)</span>-+-{<span class="hljs-title">mysqld</span>}<span class="hljs-params">(<span class="hljs-number">24378</span>)</span>
        |
        |-<span class="hljs-title">php</span><span class="hljs-params">(<span class="hljs-number">32456</span>)</span>-+-<span class="hljs-title">php</span><span class="hljs-params">(<span class="hljs-number">32457</span>)</span>
        |
        |-<span class="hljs-title">sshd</span><span class="hljs-params">(<span class="hljs-number">2023</span>)</span>---<span class="hljs-title">sshd</span><span class="hljs-params">(<span class="hljs-number">10199</span>)</span>---<span class="hljs-title">bash</span><span class="hljs-params">(<span class="hljs-number">10208</span>)</span>---<span class="hljs-title">pstree</span><span class="hljs-params">(<span class="hljs-number">10431</span>)</span>
        |-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">774</span>)</span>-+-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">2191</span>)</span>
                     `-<span class="hljs-title">udevd</span><span class="hljs-params">(<span class="hljs-number">27282</span>)</span>

</span></code></pre><hr>
<p>via: <a href="http://www.2daygeek.com/kill-inactive-idle-ssh-sessions/">http://www.2daygeek.com/kill-inactive-idle-ssh-sessions/</a></p>
<p>作者：<a href="http://www.2daygeek.com/author/magesh/">Magesh Maruthamuthu</a> 译者：<a href="https://github.com/wcnnbdk1">wcnnbdk1</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何关闭一个不活动的或者空闲的 SSH 会话

## 原文链接
[https://www.zcfy.cc/article/how-to-kill-an-inactive-or-idle-ssh-sessions](https://www.zcfy.cc/article/how-to-kill-an-inactive-or-idle-ssh-sessions)

