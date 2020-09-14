---
title: '六个优雅的 Linux 命令行技巧' 
date: 2019-01-22 2:30:08
hidden: true
slug: ghipwaoytzq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#六个优雅的-linux-命令行技巧"></a>六个优雅的 Linux 命令行技巧</h1>
<blockquote>
<p>一些非常有用的命令能让命令行的生活更满足</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/5bbf3916cfcc59140b0bb5200f9f39c89a66e287/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031372f30382f636f6d6d616e64732d6d696361685f656c697a61626574685f73636f74742d63726f707065642d3130303733333433392d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01c38bc99f2824a887.jpg" alt="command key keyboard"></a></p>
<p>使用 Linux 命令工作可以获得许多乐趣，但是如果您使用一些命令，它们可以减少您的工作或以有趣的方式显示信息时，您将获得更多的乐趣。在今天的文章中，我们将介绍六个命令，它们可能会使你用在命令行上的时间更加值当。</p>
<h3><a href="#watch"></a>watch</h3>
<p><code>watch</code> 命令会重复运行您给出的任何命令，并显示输出。默认情况下，它每两秒运行一次命令。命令的每次运行都将覆盖上一次运行时显示的内容，因此您始终可以看到最新的数据。</p>
<p>您可能会在等待某人登录时使用它。在这种情况下，您可以使用 <code>watch who</code> 命令或者 <code>watch -n 15 who</code> 命令使每 15 秒运行一次，而不是两秒一次。另外终端窗口的右上角会显示日期和时间。</p>
<pre><code class="hljs dns">$ watch -n <span class="hljs-number">5</span> who
Every <span class="hljs-number">5</span>.<span class="hljs-number">0</span>s: who                               stinkbug: Wed Aug <span class="hljs-number">23 14:52:15</span> <span class="hljs-number">2017</span>

shs      pts/<span class="hljs-number">0</span>        <span class="hljs-number">2017-08-23</span> <span class="hljs-number">14</span>:<span class="hljs-number">45</span> (<span class="hljs-number">192.168.0.11</span>)
zoe      pts/<span class="hljs-number">1</span>        <span class="hljs-number">2017-08-23</span> <span class="hljs-number">08</span>:<span class="hljs-number">15</span> (<span class="hljs-number">192.168.0.19</span>)

</code></pre><p>您也可以使用它来查看日志文件。如果您显示的数据没有任何变化，则只有窗口角落里的日期和时间会发生变化。</p>
<pre><code class="hljs routeros">$ watch tail /var/log/syslog
Every 2.0s: tail /var/log/syslog              stinkbug: Wed Aug 23 15:16:37 2017

Aug 23 14:45:01 stinkbug CRON[7214]: (root) CMD (command -v debian-sa1 &gt; /dev/nu
ll &amp;&amp; debian-sa1 1 1)
Aug 23 14:45:17 stinkbug systemd[1]: Started Session 179 of<span class="hljs-built_in"> user </span>shs.
Aug 23 14:55:01 stinkbug CRON[7577]: (root) CMD (command -v debian-sa1 &gt; /dev/nu
ll &amp;&amp; debian-sa1 1 1)
Aug 23 15:05:01 stinkbug CRON[7582]: (root) CMD (command -v debian-sa1 &gt; /dev/nu
ll &amp;&amp; debian-sa1 1 1)
Aug 23 15:08:48 stinkbug systemd[1]: Starting Cleanup of Temporary Directories<span class="hljs-built_in">..</span>.
Aug 23 15:08:48 stinkbug systemd-tmpfiles[7584]: [/usr/lib/tmpfiles.d/var.conf:1
4] Duplicate line <span class="hljs-keyword">for</span> path <span class="hljs-string">"/var/log"</span>, ignoring.
Aug 23 15:08:48 stinkbug systemd[1]: Started Cleanup of Temporary Directories.
Aug 23 15:13:41 stinkbug systemd[1]: Started Session 182 of<span class="hljs-built_in"> user </span>shs.
Aug 23 15:14:29 stinkbug systemd[1]: Started Session 183 of<span class="hljs-built_in"> user </span>shs.
Aug 23 15:15:01 stinkbug CRON[7828]: (root) CMD (command -v debian-sa1 &gt; /dev/nu
ll &amp;&amp; debian-sa1 1 1)

</code></pre><p>这里的输出和使用命令 <code>tail -f /var/log/syslog</code> 的输出相似。</p>
<h3><a href="#look"></a>look</h3>
<p>这个命令的名字 <code>look</code> 可能会让我们以为它和 <code>watch</code> 做类似的事情，但其实是不同的。<code>look</code> 命令用于搜索以某个特定字符串开头的单词。</p>
<pre><code class="hljs ada">$ look ecl
eclectic
eclectic<span class="hljs-symbol">'s</span>
eclectically
eclecticism
eclecticism<span class="hljs-symbol">'s</span>
eclectics
eclipse
eclipse<span class="hljs-symbol">'s</span>
eclipsed
eclipses
eclipsing
ecliptic
ecliptic<span class="hljs-symbol">'s</span>

</code></pre><p><code>look</code> 命令通常有助于单词的拼写，它使用 <code>/usr/share/dict/words</code> 文件，除非你使用如下的命令指定了文件名：</p>
<pre><code class="hljs bash">$ look <span class="hljs-keyword">esac</span> .bashrc
<span class="hljs-keyword">esac</span>
<span class="hljs-keyword">esac</span>
<span class="hljs-keyword">esac</span>

</code></pre><p>在这种情况下，它的作用就像跟在一个 <code>awk</code> 命令后面的 <code>grep</code> ，只打印匹配行上的第一个单词。</p>
<h3><a href="#man--k"></a>man -k</h3>
<p><code>man -k</code> 命令列出包含指定单词的手册页。它的工作基本上和 <code>apropos</code> 命令一样。</p>
<pre><code class="hljs routeros">$ man -k logrotate
dh_installlogrotate (1) - install logrotate<span class="hljs-built_in"> config </span>files
logrotate (8)        - rotates, compresses, <span class="hljs-keyword">and</span> mails<span class="hljs-built_in"> system </span>logs
logrotate.conf (5)   - rotates, compresses, <span class="hljs-keyword">and</span> mails<span class="hljs-built_in"> system </span>logs

</code></pre><h3><a href="#help"></a>help</h3>
<p>当你完全绝望的时候，您可能会试图使用此命令，<code>help</code> 命令实际上是显示一个 shell 内置命令的列表。最令人惊讶的是它有相当多的参数变量。你可能会看到这样的东西，然后开始想知道这些内置功能可以为你做些什么：</p>
<pre><code class="hljs prolog">$ help
<span class="hljs-symbol">GNU</span> bash, version <span class="hljs-number">4.4</span><span class="hljs-number">.7</span>(<span class="hljs-number">1</span>)-release (i686-pc-linux-gnu)
<span class="hljs-symbol">These</span> shell commands are defined internally.  <span class="hljs-symbol">Type</span> <span class="hljs-string">`help' to see this list.
Type `</span>help name<span class="hljs-string">' to find out more about the function `name'</span>.
<span class="hljs-symbol">Use</span> <span class="hljs-string">`info bash' to find out more about the shell in general.
Use `</span>man -k<span class="hljs-string">' or `info'</span> to find out more about commands not in this list.

<span class="hljs-symbol">A</span> star (*) next to a name means that the command is disabled.

 job_spec [&amp;]                            history [-c] [-d offset] [n] or hist&gt;
 (( expression ))                        if <span class="hljs-symbol">COMMANDS</span>; then <span class="hljs-symbol">COMMANDS</span>; [ elif <span class="hljs-symbol">C</span>&gt;
 . filename [arguments]                  jobs [-lnprs] [jobspec ...] or jobs &gt;
 :                                       kill [-s sigspec | -n signum | -sigs&gt;
 [ arg... ]                              let arg [arg ...]
 [[ expression ]]                        local [option] name[=value] ...
 alias [-p] [name[=value] ... ]          logout [n]
 bg [job_spec ...]                       mapfile [-d delim] [-n count] [-<span class="hljs-symbol">O</span> or&gt;
 bind [-lpsvPSVX] [-m keymap] [-f file&gt;  popd [-n] [+<span class="hljs-symbol">N</span> | -<span class="hljs-symbol">N</span>]
 break [n]                               printf [-v var] format [arguments]
 builtin [shell-builtin [arg ...]]       pushd [-n] [+<span class="hljs-symbol">N</span> | -<span class="hljs-symbol">N</span> | dir]
 caller [expr]                           pwd [-<span class="hljs-symbol">LP</span>]
 case <span class="hljs-symbol">WORD</span> in [<span class="hljs-symbol">PATTERN</span> [| <span class="hljs-symbol">PATTERN</span>]...)&gt;  read [-ers] [-a array] [-d delim] [-&gt;
 cd [-<span class="hljs-symbol">L</span>|[-<span class="hljs-symbol">P</span> [-e]] [-@]] [dir]            readarray [-n count] [-<span class="hljs-symbol">O</span> origin] [-s&gt;
 command [-pVv] command [arg ...]        readonly [-aAf] [name[=value] ...] o&gt;
 compgen [-abcdefgjksuv] [-o option] [&gt;  return [n]
 complete [-abcdefgjksuv] [-pr] [-<span class="hljs-symbol">DE</span>] &gt;  select <span class="hljs-symbol">NAME</span> [in <span class="hljs-symbol">WORDS</span> ... ;] do <span class="hljs-symbol">COMM</span>&gt;
 compopt [-o|+o option] [-<span class="hljs-symbol">DE</span>] [name ..&gt;  set [-abefhkmnptuvxBCHP] [-o option-&gt;
 continue [n]                            shift [n]
 coproc [<span class="hljs-symbol">NAME</span>] command [redirections]    shopt [-pqsu] [-o] [optname ...]
 declare [-aAfFgilnrtux] [-p] [name[=v&gt;  source filename [arguments]
 dirs [-clpv] [+<span class="hljs-symbol">N</span>] [-<span class="hljs-symbol">N</span>]                  suspend [-f]
 disown [-h] [-ar] [jobspec ... | pid &gt;  test [expr]
 echo [-neE] [arg ...]                   time [-p] pipeline
 enable [-a] [-dnps] [-f filename] [na&gt;  times
 eval [arg ...]                          trap [-lp] [[arg] signal_spec ...]
 exec [-cl] [-a name] [command [argume&gt;  true
 exit [n]                                type [-afptP] name [name ...]
 export [-fn] [name[=value] ...] or ex&gt;  typeset [-aAfFgilnrtux] [-p] name[=v&gt;
 false                                   ulimit [-<span class="hljs-symbol">SHabcdefiklmnpqrstuvxPT</span>] [l&gt;
 fc [-e ename] [-lnr] [first] [last] o&gt;  umask [-p] [-<span class="hljs-symbol">S</span>] [mode]
 fg [job_spec]                           unalias [-a] name [name ...]
 for <span class="hljs-symbol">NAME</span> [in <span class="hljs-symbol">WORDS</span> ... ] ; do <span class="hljs-symbol">COMMAND</span>&gt;  unset [-f] [-v] [-n] [name ...]
 for (( exp1; exp2; exp3 )); do <span class="hljs-symbol">COMMAN</span>&gt;  until <span class="hljs-symbol">COMMANDS</span>; do <span class="hljs-symbol">COMMANDS</span>; done
 function name { <span class="hljs-symbol">COMMANDS</span> ; } or name &gt;  variables - <span class="hljs-symbol">Names</span> and meanings of so&gt;
 getopts optstring name [arg]            wait [-n] [id ...]
 hash [-lr] [-p pathname] [-dt] [name &gt;  while <span class="hljs-symbol">COMMANDS</span>; do <span class="hljs-symbol">COMMANDS</span>; done
 help [-dms] [pattern ...]               { <span class="hljs-symbol">COMMANDS</span> ; }

</code></pre><h3><a href="#stat--c"></a>stat -c</h3>
<p><code>stat</code> 命令用于显示文件的大小、所有者、用户组、索引节点号、权限、修改和访问时间等重要的统计信息。这是一个非常有用的命令，可以显示比 <code>ls -l</code> 更多的细节。</p>
<pre><code class="hljs yaml"><span class="hljs-string">$</span> <span class="hljs-string">stat</span> <span class="hljs-string">.bashrc</span>
<span class="hljs-attr">  File:</span> <span class="hljs-string">.bashrc</span>
<span class="hljs-attr">  Size:</span> <span class="hljs-number">4048</span>            <span class="hljs-attr">Blocks:</span> <span class="hljs-number">8</span>          <span class="hljs-string">IO</span> <span class="hljs-attr">Block:</span> <span class="hljs-number">4096</span>   <span class="hljs-string">regular</span> <span class="hljs-string">file</span>
<span class="hljs-attr">Device:</span> <span class="hljs-number">806</span><span class="hljs-string">h/2054d</span>      <span class="hljs-attr">Inode:</span> <span class="hljs-number">421481</span>      <span class="hljs-attr">Links:</span> <span class="hljs-number">1</span>
<span class="hljs-attr">Access:</span> <span class="hljs-string">(0644/-rw-r--r--)</span>  <span class="hljs-attr">Uid:</span> <span class="hljs-string">(</span> <span class="hljs-number">1000</span><span class="hljs-string">/</span>     <span class="hljs-string">shs)</span>   <span class="hljs-attr">Gid:</span> <span class="hljs-string">(</span> <span class="hljs-number">1000</span><span class="hljs-string">/</span>     <span class="hljs-string">shs)</span>
<span class="hljs-attr">Access:</span> <span class="hljs-number">2017</span><span class="hljs-bullet">-08</span><span class="hljs-bullet">-23</span> <span class="hljs-number">15</span><span class="hljs-string">:13:41.781809933</span> <span class="hljs-bullet">-0400</span>
<span class="hljs-attr">Modify:</span> <span class="hljs-number">2017</span><span class="hljs-bullet">-06</span><span class="hljs-bullet">-21</span> <span class="hljs-number">17</span><span class="hljs-string">:37:11.875157790</span> <span class="hljs-bullet">-0400</span>
<span class="hljs-attr">Change:</span> <span class="hljs-number">2017</span><span class="hljs-bullet">-06</span><span class="hljs-bullet">-21</span> <span class="hljs-number">17</span><span class="hljs-string">:37:11.899157791</span> <span class="hljs-bullet">-0400</span>
<span class="hljs-attr"> Birth:</span> <span class="hljs-bullet">-</span>

</code></pre><p>使用 <code>-c</code> 选项，您可以指定要查看的字段。例如，如果您只想查看一个文件或一系列文件的文件名和访问权限，则可以这样做：</p>
<pre><code class="hljs stylus">$ stat -c <span class="hljs-string">'%n %a'</span> <span class="hljs-selector-class">.bashrc</span>
<span class="hljs-selector-class">.bashrc</span> <span class="hljs-number">644</span>

</code></pre><p>在此命令中， <code>%n</code> 表示每个文件的名称，而 <code>%a</code> 表示访问权限。<code>%u</code> 表示数字类型的 UID，而 <code>%U</code> 表示用户名。</p>
<pre><code class="hljs mipsasm">$ stat -c <span class="hljs-string">'%n %a'</span> <span class="hljs-keyword">bin/*
</span><span class="hljs-keyword">bin/loop </span><span class="hljs-number">700</span>
<span class="hljs-keyword">bin/move2nohup </span><span class="hljs-number">700</span>
<span class="hljs-keyword">bin/nohup.out </span><span class="hljs-number">600</span>
<span class="hljs-keyword">bin/show_release </span><span class="hljs-number">700</span>

$ stat -c <span class="hljs-string">'%n %a %U'</span> <span class="hljs-keyword">bin/*
</span><span class="hljs-keyword">bin/loop </span><span class="hljs-number">700</span> <span class="hljs-keyword">shs
</span><span class="hljs-keyword">bin/move2nohup </span><span class="hljs-number">700</span> <span class="hljs-keyword">shs
</span><span class="hljs-keyword">bin/nohup.out </span><span class="hljs-number">600</span> root
<span class="hljs-keyword">bin/show_release </span><span class="hljs-number">700</span> <span class="hljs-keyword">shs
</span>
</code></pre><h3><a href="#tab"></a>TAB</h3>
<p>如果你没有使用过 tab 键来补全文件名，你真的错过了一个非常有用的命令行技巧。tab 键提供文件名补全功能（包括使用 <code>cd</code> 时的目录）。它在出现歧义之前尽可能多的填充文件名（多个文件以相同的字母开头。如果您有一个名为 <code>bigplans</code> 的文件，另一个名为 <code>bigplans2017</code> 的文件会发生歧义，你将听到一个声音，然后需要决定是按下回车键还是输入 <code>2</code> 之后再按下 tab 键选择第二个文件。</p>
<p>（题图：<a href="https://www.flickr.com/photos/micahdowty/4630801442/in/photolist-84d4Wb-p29iHU-dscgLx-pXKT7a-pXKT7v-azMz3V-azMz7M-4Amp2h-6iyQ51-4nf4VF-5C1gt6-6P4PwG-po6JEA-p6C5Wg-6RcRbH-7GAmbK-dCkRnT-7ETcBp-4Xbhrw-dXrN8w-dXm83Z-dXrNvQ-dXrMZC-dXrMPN-pY4GdS-azMz8X-bfNoF4-azQe61-p1iUtm-87i3vj-7enNsv-6sqvJy-dXm8aD-6smkyX-5CFfGm-dXm8dD-6sqviw-6sqvVU-dXrMVd-6smkXc-dXm7Ug-deuxUg-6smker-Hd15p-6squyf-aGtnxn-6smjRX-5YtTUN-nynqYm-ea5o3c">Micah Elizabeth Scott</a> <a href="https://creativecommons.org/licenses/by/2.0/legalcode">(CC BY 2.0)</a>）</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3219684/linux/half-a-dozen-clever-linux-command-line-tricks.html">https://www.networkworld.com/article/3219684/linux/half-a-dozen-clever-linux-command-line-tricks.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
六个优雅的 Linux 命令行技巧

## 原文链接
[https://www.zcfy.cc/article/half-a-dozen-clever-linux-command-line-tricks](https://www.zcfy.cc/article/half-a-dozen-clever-linux-command-line-tricks)

