---
title: '如何使用 cloud-init 来预配置 LXD 容器' 
date: 2019-01-20 2:30:11
hidden: true
slug: 4p9bf27ghdq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-cloud-init-来预配置-lxd-容器"></a>如何使用 cloud-init 来预配置 LXD 容器</h1>
<p>当你正在创建 LXD 容器的时候，你希望它们能被预先配置好。例如在容器一启动就自动执行 <code>apt update</code>来安装一些软件包，或者运行一些命令。</p>
<p>这篇文章将讲述如何用 <a href="http://cloudinit.readthedocs.io/en/latest/index.html">cloud-init</a> 来对 <a href="https://github.com/lxc/lxd/blob/master/doc/cloud-init.md">LXD 容器进行进行早期初始化</a>。</p>
<p>接下来，我们将创建一个包含cloud-init指令的LXD profile，然后启动一个新的容器来使用这个profile。</p>
<h3><a href="#如何创建一个新的-lxd-profile"></a>如何创建一个新的 LXD profile</h3>
<p>查看已经存在的 profile：</p>
<p>$ lxc profile list
+---------|---------+
| NAME    | USED BY |
+---------|---------+
| default | 11      |
+---------|---------+</p>
<p>我们把名叫 <code>default</code> 的 profile 复制一份，然后在其内添加新的指令：</p>
<p>$ lxc profile copy default devprofile</p>
<p>$ lxc profile list
+------------|---------+
| NAME       | USED BY |
+------------|---------+
| default    | 11      |
+------------|---------+
| devprofile | 0       |
+------------|---------+</p>
<p>我们就得到了一个新的 profile： <code>devprofile</code>。下面是它的详情：</p>
<p>$ lxc profile show devprofile
config:
 environment.TZ: ""
description: Default LXD profile
devices:
 eth0:
 nictype: bridged
 parent: lxdbr0
 type: nic
 root:
 path: /
 pool: default
 type: disk
name: devprofile
used_by: []</p>
<p>注意这几个部分： <code>config:</code> 、 <code>description:</code> 、 <code>devices:</code> 、 <code>name:</code> 和 <code>used_by:</code>，当你修改这些内容的时候注意不要搞错缩进。（LCTT 译注：因为这些内容是 YAML 格式的，缩进是语法的一部分）</p>
<h3><a href="#如何把-cloud-init-添加到-lxd-profile-里"></a>如何把 cloud-init 添加到 LXD profile 里</h3>
<p><a href="http://cloudinit.readthedocs.io/en/latest/index.html">cloud-init</a> 可以添加到 LXD profile 的 <code>config</code> 里。当这些指令将被传递给容器后，会在容器第一次启动的时候执行。</p>
<p>下面是用在示例中的指令：</p>
<p> package_upgrade: true
 packages:
 - build-essential
 locale: es_ES.UTF-8
 timezone: Europe/Madrid
 runcmd:
 - [touch, /tmp/simos_was_here]</p>
<p><code>package_upgrade: true</code> 是指当容器第一次被启动时，我们想要 <code>cloud-init</code> 运行 <code>sudo apt upgrade</code>。<code>packages:</code> 列出了我们想要自动安装的软件。然后我们设置了 <code>locale</code> 和 <code>timezone</code>。在 Ubuntu 容器的镜像里，root 用户默认的 <code>locale</code> 是 <code>C.UTF-8</code>，而 <code>ubuntu</code> 用户则是 <code>en_US.UTF-8</code>。此外，我们把时区设置为 <code>Etc/UTC</code>。最后，我们展示了<a href="http://cloudinit.readthedocs.io/en/latest/topics/modules.html#runcmd">如何使用 runcmd 来运行一个 Unix 命令</a>。</p>
<p>我们需要关注如何将 <code>cloud-init</code> 指令插入 LXD profile。</p>
<p>我首选的方法是：</p>
<pre><code class="hljs routeros">$ lxc<span class="hljs-built_in"> profile </span><span class="hljs-builtin-name">edit</span> devprofile

</code></pre><p>它会打开一个文本编辑器，以便你将指令粘贴进去。<a href="https://paste.ubuntu.com/26313399/">结果应该是这样的</a>：</p>
<p>$ lxc profile show devprofile
config:
  environment.TZ: ""
  user.user-data: |</p>
<p> #cloud-config
 package_upgrade: true
 packages:
 - build-essential
 locale: es_ES.UTF-8
 timezone: Europe/Madrid
 runcmd:
 - [touch, /tmp/simos_was_here]
description: Default LXD profile
devices:
  eth0:
    nictype: bridged
    parent: lxdbr0
    type: nic
  root:
    path: /
    pool: default
    type: disk
name: devprofile
used_by: []</p>
<h3><a href="#如何使用-lxd-profile-启动一个容器"></a>如何使用 LXD profile 启动一个容器</h3>
<p>使用 profile <code>devprofile</code> 来启动一个新容器：</p>
<pre><code class="hljs applescript">$ lxc <span class="hljs-built_in">launch</span> <span class="hljs-comment">--profile devprofile ubuntu:x mydev</span>

</code></pre><p>然后访问该容器来查看我们的指令是否生效：</p>
<p>$ lxc exec mydev bash
root@mydev:~# ps ax
 PID TTY STAT TIME COMMAND
 1 ? Ss 0:00 /sbin/init
 ...
 427 ? Ss 0:00 /usr/bin/python3 /usr/bin/cloud-init modules --mode=f
 430 ? S 0:00 /bin/sh -c tee -a /var/log/cloud-init-output.log
 431 ? S 0:00 tee -a /var/log/cloud-init-output.log
 432 ? S 0:00 /usr/bin/apt-get --option=Dpkg::Options::=--force-con
 437 ? S 0:00 /usr/lib/apt/methods/http
 438 ? S 0:00 /usr/lib/apt/methods/http
 440 ? S 0:00 /usr/lib/apt/methods/gpgv
 570 ? Ss 0:00 bash
 624 ? S 0:00 /usr/lib/apt/methods/store
 625 ? R+ 0:00 ps ax
root@mydev:~#</p>
<p>如果我们连接得够快，通过 <code>ps ax</code> 将能够看到系统正在更新软件。我们可以从 <code>/var/log/cloud-init-output.log</code> 看到完整的日志：</p>
<pre><code class="hljs stylus">Generating locales (this might take <span class="hljs-selector-tag">a</span> while)...
 es_ES<span class="hljs-selector-class">.UTF-8</span>... done
Generation complete.

</code></pre><p>以上可以看出 <code>locale</code> 已经被更改了。root 用户还是保持默认的 <code>C.UTF-8</code>，只有非 root 用户 <code>ubuntu</code> 使用了新的<code>locale</code> 设置。</p>
<pre><code class="hljs groovy"><span class="hljs-string">Hit:</span><span class="hljs-number">1</span> <span class="hljs-string">http:</span><span class="hljs-comment">//archive.ubuntu.com/ubuntu xenial InRelease</span>
<span class="hljs-string">Get:</span><span class="hljs-number">2</span> <span class="hljs-string">http:</span><span class="hljs-comment">//archive.ubuntu.com/ubuntu xenial-updates InRelease [102 kB]</span>
<span class="hljs-string">Get:</span><span class="hljs-number">3</span> <span class="hljs-string">http:</span><span class="hljs-comment">//security.ubuntu.com/ubuntu xenial-security InRelease [102 kB]</span>

</code></pre><p>以上是安装软件包之前执行的 <code>apt update</code>。</p>
<pre><code class="hljs routeros">The following packages will be upgraded:
 libdrm2 libseccomp2 squashfs-tools unattended-upgrades
4 upgraded, 1 newly installed, 0 <span class="hljs-keyword">to</span> <span class="hljs-builtin-name">remove</span> <span class="hljs-keyword">and</span> 0 <span class="hljs-keyword">not</span> upgraded.
Need <span class="hljs-keyword">to</span> <span class="hljs-builtin-name">get</span> 211 kB of archives.

</code></pre><p>以上是在执行 <code>package_upgrade: true</code> 和安装软件包。</p>
<pre><code class="hljs mipsasm">The following NEW packages will <span class="hljs-keyword">be </span><span class="hljs-keyword">installed:
</span> <span class="hljs-keyword">binutils </span><span class="hljs-keyword">build-essential </span>cpp cpp-5 dpkg-dev fakeroot g++ g++-<span class="hljs-number">5</span> gcc gcc-5
 libalgorithm-<span class="hljs-keyword">diff-perl </span>libalgorithm-<span class="hljs-keyword">diff-xs-perl </span>libalgorithm-merge-perl

</code></pre><p>以上是我们安装 <code>build-essential</code> 软件包的指令。</p>
<p><code>runcmd</code> 执行的结果如何？</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@mydev</span><span class="hljs-symbol">:~</span><span class="hljs-comment"># ls -l /tmp/</span>
total <span class="hljs-number">1</span>
-rw-r--r-- <span class="hljs-number">1</span> root root <span class="hljs-number">0</span> Jan <span class="hljs-number">3</span> <span class="hljs-number">15</span><span class="hljs-symbol">:</span><span class="hljs-number">23</span> simos_was_here
root<span class="hljs-variable">@mydev</span><span class="hljs-symbol">:~</span><span class="hljs-comment">#</span>

</code></pre><p>可见它已经生效了！</p>
<h3><a href="#结论"></a>结论</h3>
<p>当我们启动 LXD 容器的时候，我们常常需要默认启用一些配置，并且希望能够避免重复工作。通常解决这个问题的方法是创建 LXD profile，然后把需要的配置添加进去。最后，当我们启动新的容器时，只需要应用该 LXD profile 即可。</p>
<hr>
<p>via: <a href="https://blog.simos.info/how-to-preconfigure-lxd-containers-with-cloud-init/">https://blog.simos.info/how-to-preconfigure-lxd-containers-with-cloud-init/</a></p>
<p>作者：<a href="https://blog.simos.info/author/simos/">Simos Xenitellis</a> 译者：<a href="https://github.com/kaneg">kaneg</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 cloud-init 来预配置 LXD 容器

## 原文链接
[https://www.zcfy.cc/article/how-to-preconfigure-lxd-containers-with-cloud-init](https://www.zcfy.cc/article/how-to-preconfigure-lxd-containers-with-cloud-init)

