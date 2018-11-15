---
title: 容器化，原子化发行版以及 Linux 的未来
hidden: true
categories: reprint
slug: 45f223e6
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#容器化原子化发行版以及-linux-的未来"></a>容器化，原子化发行版以及 Linux 的未来</h1>
<blockquote>
<p>容器支持者说未来属于容器化操作系统，而其他人或许有不同看法。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/ff7d08fb5d5174148d685e97e4ca88e1dc4d4442/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f61746f6d69632d64697374726f2e6a70673f69746f6b3d536a426543447471"><img src="https://p0.ssl.qhimg.com/t018f3fc394ad21904f.jpg" alt=""></a></p>
<p>自从 Linus Torvalds 在 1991 年发布 Linux 以来，Linux 已历经漫长的岁月。它已经成为企业级领域的主流操作系统。同时，我们看到桌面级领域出现了很多改进和调整，但在过去的 25 年来，主流 Linux 发行版的模式很大程度上没有变化。基于软件包管理的传统模式依然统治着桌面级和服务器级市场。</p>
<p>但随着 Google 发布了基于 Linux 的 Chrome OS，情况出现了微妙的转变，Chrome OS 采用镜像模式。Core OS (目前归属于 Red Hat) 受 Google 启发推出了一款操作系统 Container Linux，主要面向企业级用户。</p>
<p>Container Linux 改变了操作系统更新的方式，也改变了应用分发和更新的方式。这会是 Linux 发行版的未来吗？这是否会取代基于软件包的传统发行版模式呢？</p>
<h3><a href="#三种模式"></a>三种模式</h3>
<p>SLE (SUSE Linux Enterprise) 的产品管理总监 Matthias Eckermann 认为目前存在 3 种模式，而不是 2 种。Eckermann 提到：“除了传统模式（RHEL/SLE）和镜像模式（RedHat 的 Atomic Host），还存在第三种模型：事务模式。<a href="https://www.suse.com/products/caas-platform/">SUSE CaaS 平台</a> 及 SUSE MicroOS 就采用这种模式。”</p>
<h3><a href="#差异有哪些"></a>差异有哪些</h3>
<p>Linux 用户对传统模式非常熟悉，它由独立的软件包和共享库组成。这种模式有独特的优势，让应用开发者无需将共享库捆绑在应用中。由于库不会多次引入，使得系统简洁和轻便。这也让用户无需下载很多软件包，节省了带宽。发行版对软件包全权负责，通过推送系统级别的更新，可以轻松地解决安全隐患。</p>
<p>RHEL （Red Hat Enterprise Linux）的产品管理总监 Ron Pacheco 表示，“传统的打包方式继续为我们提供精心构建和优化操作系统的机会，以便支持需要经过时间考验的任务关键型工作负载。”</p>
<p>但传统模式也有一些弊端。应用开发者受限使用发行版包含的库，使其无法从发行版不支持的新软件中获益。这也可能导致不同版本之间相互冲突。最终，传统模式给管理员增加了挑战，使其难以让软件包一直处于最新版本状态。</p>
<h3><a href="#镜像模式"></a>镜像模式</h3>
<p>镜像模式应运而生。Eckermann 表示，“镜像模式解决了传统模式遇到的问题，它在每次迭代更新时替换整个操作系统，而不是单个的软件包”。</p>
<p>Pacheco 表示，“当我们用镜像作为操作系统的代名词进行讨论时，我们真正关心的是可编程式的开发和部署以及更好的集成式生命周期管理”，基于 RHEL 搭建的 OpenShift 被他用作示例。</p>
<p>Pacheco 认为基于镜像的操作系统是一种延续，从手工打造并部署镜像，到可大规模管理的高度自动化基础设施；无论客户使用哪种类型，都需要运行同样的应用。他说，“你肯定不希望使用一个完全不同的部署模式，这需要重做很多工作”。</p>
<p>镜像模式用新的库和软件包替代来整个操作系统，但也面临一系列问题。在镜像模式中，需要重建镜像才能适应特殊环境的需求。例如，用户有特殊需求，需要安装特定硬件的驱动或安装底层监控功能，镜像模式无法满足，需要重新设计功能以实现细粒度操作。</p>
<h3><a href="#事务模式"></a>事务模式</h3>
<p>第三种模式采用事务更新，基于传统的软件包更新，但将全部的软件包视为一个镜像，就像镜像那样在一次操作中更新全部软件包。</p>
<p>Eckermann 表示，“由于安装或回滚时操作对象是打包在一起的单一软件包，用户在需要时能够做相应的调整，这就是差别所在。结合传统模式和镜像模式的优点，避免两种模式的缺点，事务模式给用户提供了额外的灵活性。”</p>
<p>Pacheco 表示，将精心构造的工作负载部署成镜像的做法越来越成为主流，因为这种部署方式具有一致性和可靠性，而且可以弹性部署。“这正是我们用户目前的做法，部署环境包括在预置设备或公有/私有云上创建并部署的虚拟机，或在传统的裸机上。”</p>
<p>Pacheco 建议我们将这几种模式视为操作系统角色的进化和扩展，而不是仅仅“使用场景的比较和对比”。</p>
<h3><a href="#原子化更新的问世"></a>原子化更新的问世</h3>
<p>Google 的 Chrome OS 和 Core OS 为我们普及了事务更新的概念，该模型也被 Red Hat 和 SUSE 采用。</p>
<p>Eckermann 表示，“我们必须认识到，用于容器主机的操作系统已经不再是关注点 —— 至少不是管理员的关注点。RedHat Atomic 主机和 SUSE CaaS 平台都解决了该问题，实现方式在用户看来很相似。”</p>
<p>SUSE CaaS 平台、Red Hat Atomic Host和 Container Linux （前身是 Core OS）提供的<a href="https://www.digitalocean.com/community/tutorials/what-is-immutable-infrastructure">不可变基础设施Immutable infrastructure</a> 推广了事务更新的使用。Red Hat 高级技术产品经理 Ben Breard 表示，“在事务模式中，主机总是会变更到已确认正确的新状态，这让我们更有信心执行更新，进而实现更快速的功能流、安全优势以及易于采用的操作模式。”</p>
<p>这些新型操作系统使用 Linux 容器将应用与底层系统隔离，解除了传统模式中基础设施更新的诸多限制。</p>
<p>Breard 补充道，“当编排层可以智能处理更新、部署，甚至最终实现无缝操作时，我们才会真正意识到该模式的威力和好处”。</p>
<h3><a href="#展望未来"></a>展望未来</h3>
<p>Linux 的未来会是什么样子？不同的人会给出不同的回答。容器支持者认为未来属于容器化的操作系统，但依然拥有庞大市场的 Linux 供应商显然不这么认为。</p>
<p>当被问到原子化发行版是否会在很久以后将替换传统发行版时，Eckermann 表示，“如果我回答肯定的，那么表示我顺应潮流；如果回答是否定的，意味着我还是站在传统阵营。然而，我的回答是否定的，即 atomic 发行版在很久以后也不会替换传统发行版，传统负载和容器化负载将在数据中心、私有云以及公有云环境中共存。”</p>
<p>Pacheco 认为，从 Linux 的部署增长情况来看，一般情况下很难想象一种模式替换另一种模式。与其将多种模式视为相互竞争的关系，不如将原子化发行版视为操作系统进化和部署的一部分。</p>
<p>此外，在一些使用案例中，我们需要同时使用多种 Linux 发行版。Eckermann 表示，“想一想银行和保险公司中大量的 PL/1 和 Cobol 系统。再想一想内存数据库和核心数据总线系统。”</p>
<p>这些应用大多数无法进行容器化。就我们目前来看，容器化不是解决所有问题的万金油。总是会同时存在多种不同的技术。</p>
<p>Eckermann 相信，随着时间的推移，大量新的开发和部署将采用容器化，但仍然有不错的理由，促使我们在企业级环境中保留传统的部署方式和应用。</p>
<p>Pacheco 认为，“用户需要经历业务、设计和文化的转型，才能最大化基于容器的部署带来的优势。好消息是业界已经认识到并开始大规模转变，就像历史上大型机转变成 UNIX，UNIX 转变成 x86，x86 转变成虚拟化那样”。</p>
<h3><a href="#结论"></a>结论</h3>
<p>很明显，未来容器化负载的使用量会持续增长，也就意味着原子化发行版的需求量持续增长。与此同时，仍会有不少工作负载运行在传统发行版中。重要的是，这两类用户都在新模式上大规模投入，以便市场改变时可以做相应的策略改变。从外部观察者的视角来看，未来属于事务/原子化模式。我们已经见证了数据中心的发展，我们花了很长时间完成了从每个服务器一个应用到“函数即服务”模型的转变。Linux 发行版进入原子化时代的日子也不会太远了。</p>
<hr>
<p>via: <a href="https://www.linux.com/blog/2018/4/containerization-atomic-distributions-and-future-linux">https://www.linux.com/blog/2018/4/containerization-atomic-distributions-and-future-linux</a></p>
<p>作者：<a href="https://www.linux.com/users/arnieswap">SWAPNIL BHARTIYA</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/containerization-atomic-distributions-and-the-future-of-linux](https://www.zcfy.cc/article/containerization-atomic-distributions-and-the-future-of-linux)

## 原文标题
容器化，原子化发行版以及 Linux 的未来
