---
title: '我是被 “root@notty” 黑了吗？' 
date: 2019-01-21 2:30:06
hidden: true
slug: 2nimwxftsvr
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#我是被-rootnotty-黑了吗"></a>我是被 “root@notty” 黑了吗？</h1>
<p>当你在 <code>ps aux</code> 的输出中看到 <code>sshd：root@notty</code> 时会觉得很奇怪吧，<code>notty</code> 算是哪门子的主机，是不是黑客计算机的名字啊。不过不用担心；<code>notty</code> 仅仅是表示 没有 tty 而已。</p>
<p>当你在本地登录 Linux 机器时，登录终端会在进程列表中显示为 <code>tty</code>（ 比如，tty7）。若你通过 ssh 登录一台远程服务器，则会看到类似 <code>root@pts/0</code> 这样的东西。</p>
<p>而若某个连接是由 sftp 或者是由 scp 拷贝文件而创建的，则该连接会会显示成没有 tty （notty）。</p>
<p>如果你仍然想知道服务器上发生了什么事情，可以检查 <code>ps auxf</code> 的输出来查看进程树，或者运行 <code>netstat -vatn</code> 来检查所有的 TCP 连接。</p>
<hr>
<p>via: <a href="http://www.sysadminworld.com/2011/ps-aux-shows-sshd-rootnotty/">http://www.sysadminworld.com/2011/ps-aux-shows-sshd-rootnotty/</a></p>
<p>作者：<a href="http://www.sysadminworld.com">sysadminworld</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我是被 “root@notty” 黑了吗？

## 原文链接
[https://www.zcfy.cc/article/have-i-been-hacked-by-root-notty-sysadmin-world](https://www.zcfy.cc/article/have-i-been-hacked-by-root-notty-sysadmin-world)

