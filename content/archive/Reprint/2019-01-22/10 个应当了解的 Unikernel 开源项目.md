---
title: '10 个应当了解的 Unikernel 开源项目' 
date: 2019-01-22 2:30:08
hidden: true
slug: 6ba23a78y68
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#10-个应当了解的-unikernel-开源项目"></a>10 个应当了解的 Unikernel 开源项目</h1>
<blockquote>
<p>unikernel 实质上是一个缩减的操作系统，它可以与应用程序结合成为一个 unikernel 程序，它通常在虚拟机中运行。下载《开放云指南》了解更多。</p>
</blockquote>
<p>当涉及到操作系统、容器技术和 unikernel，趋势是朝着微型化发展。什么是 unikernel？unikernel 实质上是一个缩减的操作系统（特指 “unikernel”），它可以与应用程序结合成为一个 unikernel 程序, 它通常在虚拟机中运行。它们有时被称为库操作系统，因为它包含了使应用程序能够将硬件和网络协议与一组访问控制和网络层隔离的策略相结合使用的库。</p>
<p>在讨论云计算和 Linux 时容器常常会被提及，而 unikernel 也在做一些变革。容器和 unikernel 都不是新事物。在 20 世纪 90 年代就有类似 unikernel 的系统，如 Exokernel，而如今流行的 unikernel 系统则有 MirageOS 和 OSv。 Unikernel 程序可以独立使用并在异构环境中部署。它们可以促进专业化和隔离化服务，并被广泛用于在微服务架构中开发应用程序。</p>
<p>作为 unikernel 如何引起关注的一个例子，你可以看看 Docker 收购了<a href="http://www.infoworld.com/article/3024410/application-virtualization/docker-kicks-off-unikernel-revolution.html">基于 Cambridge 的 Unikernel 系统</a>，并且已在许多情况下在使用 unikernel。</p>
<p>unikernel，就像容器技术一样, 它剥离了非必需的的部分，因此它们对应用程序的稳定性、可用性以及安全性有非常积极的影响。在开源领域，它们也吸引了许多顶级，最具创造力的开发人员。</p>
<p>Linux 基金会最近<a href="https://www.linux.com/blog/linux-foundation-issues-2016-guide-open-source-cloud-projects">宣布</a>发布了其 2016 年度报告<a href="http://ctt.marketwire.com/?release=11G120876-001&amp;id=10172077&amp;type=0&amp;url=http%3A%2F%2Fgo.linuxfoundation.org%2Frd-open-cloud-report-2016-pr">开放云指南：当前趋势和开源项目指南</a>。这份第三年度的报告全面介绍了开放云计算的状况，并包含了一节关于 unikernel 的内容。你现在可以<a href="http://go.linuxfoundation.org/l/6342/2016-10-31/3krbjr">下载该报告</a>。它汇总并分析研究、描述了容器、unikernel 的发展趋势，已经它们如何重塑云计算的。该报告提供了对当今开放云环境中心的各类项目的描述和链接。</p>
<p>在本系列文章中，我们将按类别分析指南中提到的项目，为整体类别的演变提供了额外的见解。下面, 你将看到几个重要 unikernel 项目的列表及其影响，以及它们的 GitHub 仓库的链接, 这些都是从开放云指南中收集到的：</p>
<h3><a href="#clickos"></a><a href="http://cnp.neclab.eu/clickos/">ClickOS</a></h3>
<p>ClickOS 是 NEC 的高性能虚拟化软件中间件平台，用于构建于 MiniOS/MirageOS 之上网络功能虚拟化（NFV）</p>
<ul>
<li><a href="https://github.com/cnplab/clickos">ClickOS 的 GitHub</a></li>
</ul>
<h3><a href="#clive"></a><a href="http://lsub.org/ls/clive.html">Clive</a></h3>
<p>Clive 是用 Go 编写的一个操作系统，旨在工作于分布式和云计算环境中。</p>
<h3><a href="#halvm"></a><a href="https://galois.com/project/halvm/">HaLVM</a></h3>
<p>Haskell 轻量级虚拟机（HaLVM）是 Glasgow Haskell 编译器工具包的移植，它使开发人员能够编写可以直接在 Xen 虚拟机管理程序上运行的高级轻量级虚拟机。</p>
<ul>
<li><a href="https://github.com/GaloisInc/HaLVM">HaLVM 的 GitHub</a></li>
</ul>
<h3><a href="#includeos"></a><a href="http://www.includeos.org/">IncludeOS</a></h3>
<p>IncludeOS 是在云中运行 C++ 服务的 unikernel 操作系统。它提供了一个引导加载程序、标准库以及运行服务的构建和部署系统。在 VirtualBox 或 QEMU 中进行测试，并在 OpenStack 上部署服务。</p>
<ul>
<li><a href="https://github.com/hioa-cs/IncludeOS">IncludeOS 的 GitHub</a></li>
</ul>
<h3><a href="#ling"></a><a href="http://erlangonxen.org/">Ling</a></h3>
<p>Ling 是一个用于构建超级可扩展云的 Erlang 平台，可直接运行在 Xen 虚拟机管理程序之上。它只运行三个外部库 （没有 OpenSSL），并且文件系统是只读的，以避免大多数攻击。</p>
<ul>
<li><a href="https://github.com/cloudozer/ling">Ling 的 GitHub</a></li>
</ul>
<h3><a href="#mirageos"></a><a href="https://mirage.io/">MirageOS</a></h3>
<p>MirageOS 是在 Linux 基金会的 Xen 项目下孵化的库操作系统。它使用 OCaml 语言构建的 unikernel 可以用于各种云计算和移动平台上安全的高性能网络应用。代码可以在诸如 Linux 或 MacOS X 等普通的操作系统上开发，然后编译成在 Xen 虚拟机管理程序下运行的完全独立的专用 Unikernel。</p>
<ul>
<li><a href="https://github.com/mirage/mirage">MirageOS 的 GitHub</a></li>
</ul>
<h3><a href="#osv"></a><a href="http://osv.io/">OSv</a></h3>
<p>OSv 是 Cloudius Systems 为云设计的开源操作系统。它支持用 Java、Ruby（通过 JRuby）、JavaScript（通过 Rhino 和 Nashorn）、Scala 等编写程序。它运行在 VMware、VirtualBox、KVM 和 Xen 虚拟机管理程序上。</p>
<ul>
<li><a href="https://github.com/cloudius-systems/osv">OSV 的 GitHub</a></li>
</ul>
<h3><a href="#rumprun"></a><a href="http://rumpkernel.org/">Rumprun</a></h3>
<p>Rumprun 是一个可用于生产环境的 unikernel，它使用 rump 内核提供的驱动程序，添加了 libc 和应用程序环境，并提供了一个工具链，用于将现有的 POSIX-y 程序构建为 Rumprun unikernel。它适用于 KVM 和 Xen 虚拟机管理程序和裸机，并支持用 C、C ++、Erlang、Go、Java、JavaScript（Node.js）、Python、Ruby、Rust 等编写的程序。</p>
<ul>
<li><a href="https://github.com/rumpkernel/rumprun">Rumprun 的 GitHub</a></li>
</ul>
<h3><a href="#runtimejs"></a><a href="http://runtimejs.org/">Runtime.js</a></h3>
<p>Runtime.js 是用于在云上运行 JavaScript 的开源库操作系统（unikernel），它可以与应用程序捆绑在一起，并部署为轻量级和不可变的 VM 镜像。它基于 V8 JavaScript 引擎，并使用受 Node.js 启发的事件驱动和非阻塞 I/O 模型。KVM 是唯一支持的虚拟机管理程序。</p>
<ul>
<li>[Runtime.js 的 GitHub] <a href="https://github.com/runtimejs/runtime">23</a></li>
</ul>
<h3><a href="#unik"></a><a href="http://dojoblog.emc.com/unikernels/unik-build-run-unikernels-easy/">UNIK</a></h3>
<p>Unik 是 EMC 推出的工具，可以将应用程序源编译为 unikernel（轻量级可引导磁盘镜像）而不是二进制文件。它允许应用程序在各种云提供商、嵌入式设备（IoT） 以及开发人员的笔记本或工作站上安全地部署，资源占用很少。它支持多种 unikernel 类型、处理器架构、管理程序和编排工具，包括 Cloud Foundry、Docker 和 Kubernetes。[Unik 的 GitHub] <a href="https://github.com/emc-advanced-dev/unik">25</a></p>
<p>（题图：Pixabay）</p>
<hr>
<p>via: <a href="https://www.linux.com/news/open-cloud-report/2016/guide-open-cloud-age-unikernel">https://www.linux.com/news/open-cloud-report/2016/guide-open-cloud-age-unikernel</a></p>
<p>作者：<a href="https://www.linux.com/users/sam-dean">SAM DEAN</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
10 个应当了解的 Unikernel 开源项目

## 原文链接
[https://www.zcfy.cc/article/the-age-of-the-unikernel-10-projects-to-know](https://www.zcfy.cc/article/the-age-of-the-unikernel-10-projects-to-know)

