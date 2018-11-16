---
title: 底层 Linux 容器运行时之发展史
hidden: true
categories: [reprint]
slug: 7e3006e1
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#底层-linux-容器运行时之发展史"></a>底层 Linux 容器运行时之发展史</h1>
<blockquote>
<p>“容器运行时”是一个被过度使用的名词。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/01236235216d3e4cbe8ebc3484878866f01ef589/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f72756e6e696e672d636f6e7461696e6572732d74776f2d736869702d636f6e7461696e65722d62656163682e706e673f69746f6b3d7772347a4a433670"><img src="https://p0.ssl.qhimg.com/t01c7bc092abe080598.png" alt=""></a></p>
<p>在 Red Hat，我们乐意这么说，“容器即 Linux，Linux 即容器”。下面解释一下这种说法。传统的容器是操作系统中的进程，通常具有如下 3 个特性：</p>
<ol>
<li><p>资源限制</p>
<p>当你在系统中运行多个容器时，你肯定不希望某个容器独占系统资源，所以我们需要使用资源约束来控制 CPU、内存和网络带宽等资源。Linux 内核提供了 cgroup 特性，可以通过配置控制容器进程的资源使用。</p>
</li>
<li><p>安全性配置</p>
<p>一般而言，你不希望你的容器可以攻击其它容器或甚至攻击宿主机系统。我们使用了 Linux 内核的若干特性建立安全隔离，相关特性包括 SELinux、seccomp 和 capabilities。</p>
<p>（LCTT 译注：从 2.2 版本内核开始，Linux 将特权从超级用户中分离，产生了一系列可以单独启用或关闭的 capabilities）</p>
</li>
<li><p>虚拟隔离</p>
<p>容器外的任何进程对于容器而言都应该不可见。容器应该使用独立的网络。不同的容器对应的进程应该都可以绑定 80 端口。每个容器的内核映像image、根文件系统rootfs（rootfs）都应该相互独立。在 Linux 中，我们使用内核的名字空间namespace特性提供虚拟隔离virtual separation。</p>
</li>
</ol>
<p>那么，具有安全性配置并且在 cgroup 和名字空间下运行的进程都可以称为容器。查看一下 Red Hat Enterprise Linux 7 操作系统中的 PID 1 的进程 systemd，你会发现 systemd 运行在一个 cgroup 下。</p>
<pre><code class="hljs elixir"><span class="hljs-comment"># tail -1 /proc/1/cgroup</span>
<span class="hljs-number">1</span><span class="hljs-symbol">:name=systemd</span><span class="hljs-symbol">:/</span>

</code></pre><p><code>ps</code> 命令让我们看到 systemd 进程具有 SELinux 标签：</p>
<pre><code class="hljs less"># <span class="hljs-selector-tag">ps</span> <span class="hljs-selector-tag">-eZ</span> | <span class="hljs-selector-tag">grep</span> <span class="hljs-selector-tag">systemd</span>
<span class="hljs-selector-tag">system_u</span><span class="hljs-selector-pseudo">:system_r</span><span class="hljs-selector-pseudo">:init_t</span><span class="hljs-selector-pseudo">:s0</span>             <span class="hljs-selector-tag">1</span> ?     <span class="hljs-selector-tag">00</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:48</span> <span class="hljs-selector-tag">systemd</span>

</code></pre><p>以及 capabilities：</p>
<pre><code class="hljs avrasm"><span class="hljs-meta"># grep Cap /proc/1/status</span>
...
<span class="hljs-symbol">CapEff:</span> <span class="hljs-number">0000001</span>fffffffff
<span class="hljs-symbol">CapBnd:</span> <span class="hljs-number">0000001</span>fffffffff
<span class="hljs-symbol">CapBnd:</span>    <span class="hljs-number">0000003</span>fffffffff

</code></pre><p>最后，查看 <code>/proc/1/ns</code> 子目录，你会发现 systemd 运行所在的名字空间。</p>
<pre><code class="hljs tcl">ls -l /<span class="hljs-keyword">proc</span>/1/ns<span class="hljs-title">
lrwxrwxrwx.</span> 1<span class="hljs-title"> root</span> root 0<span class="hljs-title"> Jan</span> 11 11:46<span class="hljs-title"> mnt</span> -&gt;<span class="hljs-title"> mnt:[4026531840]</span>
lrwxrwxrwx. 1<span class="hljs-title"> root</span> root 0<span class="hljs-title"> Jan</span> 11 11:46<span class="hljs-title"> net</span> -&gt;<span class="hljs-title"> net:[4026532009]</span>
lrwxrwxrwx. 1<span class="hljs-title"> root</span> root 0<span class="hljs-title"> Jan</span> 11 11:46<span class="hljs-title"> pid</span> -&gt;<span class="hljs-title"> pid:[4026531836]</span>
...

</code></pre><p>如果 PID 1 进程（实际上每个系统进程）具有资源约束、安全性配置和名字空间，那么我可以说系统上的每一个进程都运行在容器中。</p>
<p>容器运行时工具也不过是修改了资源约束、安全性配置和名字空间，然后 Linux 内核运行起进程。容器启动后，容器运行时可以在容器内监控 PID 1 进程，也可以监控容器的标准输入/输出，从而进行容器进程的生命周期管理。</p>
<h3><a href="#容器运行时"></a>容器运行时</h3>
<p>你可能自言自语道，“哦，systemd 看起来很像一个容器运行时”。经过若干次关于“为何容器运行时不使用 <code>systemd-nspawn</code> 工具来启动容器”的邮件讨论后，我认为值得讨论一下容器运行时及其发展史。</p>
<p><a href="https://github.com/docker">Docker</a> 通常被称为容器运行时，但“容器运行时container runtime”是一个被过度使用的词语。当用户提到“容器运行时”，他们其实提到的是为开发人员提供便利的上层high-level工具，包括 Docker，<a href="https://github.com/kubernetes-incubator/cri-o">CRI-O</a> 和 <a href="https://github.com/rkt/rkt">RKT</a>。这些工具都是基于 API 的，涉及操作包括从容器仓库拉取容器镜像、配置存储和启动容器等。启动容器通常涉及一个特殊工具，用于配置内核如何运行容器，这类工具也被称为“容器运行时”，下文中我将称其为“底层容器运行时”以作区分。像 Docker、CRI-O 这样的守护进程及形如 <a href="https://github.com/projectatomic/libpod/tree/master/cmd/podman">Podman</a>、<a href="https://github.com/projectatomic/buildah">Buildah</a> 的命令行工具，似乎更应该被称为“容器管理器”。</p>
<p>早期版本的 Docker 使用 <code>lxc</code> 工具集启动容器，该工具出现在 <code>systemd-nspawn</code> 之前。Red Hat 最初试图将 <a href="https://libvirt.org/">libvirt</a> （<code>libvirt-lxc</code>）集成到 Docker 中替代 <code>lxc</code> 工具，因为 RHEL 并不支持 <code>lxc</code>。<code>libvirt-lxc</code> 也没有使用 <code>systemd-nspawn</code>，在那时 systemd 团队仅将 <code>systemd-nspawn</code> 视为测试工具，不适用于生产环境。</p>
<p>与此同时，包括我的 Red Hat 团队部分成员在内的上游upstream Docker 开发者，认为应该采用 golang 原生的方式启动容器，而不是调用外部应用。他们的工作促成了 libcontainer 这个 golang 原生库，用于启动容器。Red Hat 工程师更看好该库的发展前景，放弃了 <code>libvirt-lxc</code>。</p>
<p>后来成立 <a href="https://www.opencontainers.org/">开放容器组织</a>Open Container Initiative（OCI）的部分原因就是人们希望用其它方式启动容器。传统的基于名字空间隔离的容器已经家喻户晓，但人们也有虚拟机级别隔离virtual machine-level isolation的需求。Intel 和 <a href="https://www.hyper.sh/">Hyper.sh</a> 正致力于开发基于 KVM 隔离的容器，Microsoft 致力于开发基于 Windows 的容器。OCI 希望有一份定义容器的标准规范，因而产生了 <a href="https://github.com/opencontainers/runtime-spec">OCI 运行时规范Runtime Specification</a>。</p>
<p>OCI 运行时规范定义了一个 JSON 文件格式，用于描述要运行的二进制，如何容器化以及容器根文件系统的位置。一些工具用于生成符合标准规范的 JSON 文件，另外的工具用于解析 JSON 文件并在该根文件系统（rootfs）上运行容器。Docker 的部分代码被抽取出来构成了 libcontainer 项目，该项目被贡献给 OCI。上游 Docker 工程师及我们自己的工程师创建了一个新的前端工具，用于解析符合 OCI 运行时规范的 JSON 文件，然后与 libcontainer 交互以便启动容器。这个前端工具就是 <a href="https://github.com/opencontainers/runc">runc</a>，也被贡献给 OCI。虽然 <code>runc</code> 可以解析 OCI JSON 文件，但用户需要自行生成这些文件。此后，<code>runc</code> 也成为了最流行的底层容器运行时，基本所有的容器管理工具都支持 <code>runc</code>，包括 CRI-O、Docker、Buildah、Podman 和 <a href="https://github.com/cloudfoundry/garden">Cloud Foundry Garden</a> 等。此后，其它工具的实现也参照 OCI 运行时规范，以便可以运行 OCI 兼容的容器。</p>
<p><a href="https://clearlinux.org/containers">Clear Containers</a> 和 Hyper.sh 的 <code>runV</code> 工具都是参照 OCI 运行时规范运行基于 KVM 的容器，二者将其各自工作合并到一个名为 <a href="https://clearlinux.org/containers">Kata</a> 的新项目中。在去年，Oracle 创建了一个示例版本的 OCI 运行时工具，名为 <a href="https://github.com/oracle/railcar">RailCar</a>，使用 Rust 语言编写。但该 GitHub 项目已经两个月没有更新了，故无法判断是否仍在开发。几年前，Vincent Batts 试图创建一个名为 <a href="https://github.com/vbatts/nspawn-oci">nspawn-oci</a> 的工具，用于解析 OCI 运行时规范文件并启动 <code>systemd-nspawn</code>；但似乎没有引起大家的注意，而且也不是原生的实现。</p>
<p>如果有开发者希望实现一个原生的 <code>systemd-nspawn --oci OCI-SPEC.json</code> 并让 systemd 团队认可和提供支持，那么CRI-O、Docker 和 Podman 等容器管理工具将可以像使用 <code>runc</code> 和 Clear Container/runV （<a href="https://github.com/kata-containers">Kata</a>） 那样使用这个新的底层运行时。（目前我的团队没有人参与这方面的工作。）</p>
<p>总结如下，在 3-4 年前，上游开发者打算编写一个底层的 golang 工具用于启动容器，最终这个工具就是 <code>runc</code>。那时开发者有一个使用 C 编写的 <code>lxc</code> 工具，在 <code>runc</code> 开发后，他们很快转向 <code>runc</code>。我很确信，当决定构建 libcontainer 时，他们对 <code>systemd-nspawn</code> 或其它非原生（即不使用 golang）的运行 namespaces 隔离的容器的方式都不感兴趣。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/1/history-low-level-container-runtimes">https://opensource.com/article/18/1/history-low-level-container-runtimes</a></p>
<p>作者：<a href="https://opensource.com/users/rhatdan">Daniel Walsh</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [底层 Linux 容器运行时之发展史](https://www.zcfy.cc/article/a-history-of-low-level-linux-container-runtimes)
原文标题: 底层 Linux 容器运行时之发展史
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
