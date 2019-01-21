---
title: '免费学习 Docker 的最佳方法：Play-with-docker（PWD）' 
date: 2019-01-22 2:30:08
hidden: true
slug: 21vvfxirc99
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#免费学习-docker-的最佳方法play-with-dockerpwd"></a>免费学习 Docker 的最佳方法：Play-with-docker（PWD）</h1>
<p>去年在柏林的分布式系统峰会上，Docker 的负责人 <a href="https://www.twitter.com/marcosnils">Marcos Nils</a> 和 <a href="https://www.twitter.com/xetorthio">Jonathan Leibiusky</a> 宣称已经开始研究浏览器内置 Docker 的方案，帮助人们学习 Docker。 几天后，<a href="http://play-with-docker.com/">Play-with-docker</a>（PWD）就诞生了。</p>
<p>PWD 像是一个 Docker 游乐场，用户在几秒钟内就可以运行 Docker 命令。 还可以在浏览器中安装免费的 Alpine Linux 虚拟机，然后在虚拟机里面构建和运行 Docker 容器，甚至可以使用 <a href="https://docs.docker.com/engine/swarm/">Docker 集群模式</a>创建集群。 有了 Docker-in-Docker（DinD）引擎，甚至可以体验到多个虚拟机/个人电脑的效果。 除了 Docker 游乐场外，PWD 还包括一个培训站点 <a href="http://training.play-with-docker.com/">training.play-with-docker.com</a>，该站点提供大量的难度各异的 Docker 实验和测验。</p>
<p>如果你错过了峰会，Marcos 和 Jonathan 在最后一场 DockerCon Moby Cool Hack 会议中展示了 PWD。 观看下面的视频，深入了解其基础结构和发展路线图。</p>
<p>在过去几个月里，Docker 团队与 Marcos、Jonathan，还有 Docker 社区的其他活跃成员展开了密切合作，为项目添加了新功能，为培训部分增加了 Docker 实验室。</p>
<h3><a href="#pwd-游乐场"></a>PWD: 游乐场</h3>
<p>以下快速的概括了游乐场的新功能：</p>
<h4><a href="#1-pwd-docker-machine-驱动和-ssh"></a>1、 PWD Docker Machine 驱动和 SSH</h4>
<p>随着 PWD 成功的成长，社区开始问他们是否可以使用 PWD 来运行自己的 Docker 研讨会和培训。 因此，对项目进行的第一次改进之一就是创建 <a href="https://github.com/play-with-docker/docker-machine-driver-pwd/releases/tag/v0.0.5">PWD Docker Machine 驱动</a>，从而用户可以通过自己喜爱的终端轻松创建管理 PWD 主机，包括使用 SSH 相关命令的选项。 下面是它的工作原理：</p>
<p><a href="https://camo.githubusercontent.com/4b8c82dbd4b437997f542ae7ebe05107963306bd/68747470733a2f2f69322e77702e636f6d2f626c6f672e646f636b65722e636f6d2f77702d636f6e74656e742f75706c6f6164732f7373682e6769663f7a6f6f6d3d312e3536323526726573697a653d3731302532433434362673736c3d31"><img src="https://p0.ssl.qhimg.com/t016278690ff4cb027e.gif" alt="Play With Docker"></a></p>
<h4><a href="#2-支持文件上传"></a>2、 支持文件上传</h4>
<p>Marcos 和 Jonathan 还带来了另一个炫酷的功能就是可以在 PWD 实例中通过拖放文件的方式将 Dockerfile 直接上传到 PWD 窗口。</p>
<p><a href="https://camo.githubusercontent.com/baa076e8639ad2b37603654bf8ade8a5778720ed/68747470733a2f2f69302e77702e636f6d2f626c6f672e646f636b65722e636f6d2f77702d636f6e74656e742f75706c6f6164732f7077645f75706c6f61642d312e6769663f7a6f6f6d3d312e3536323526726573697a653d3731302532433430362673736c3d31"><img src="https://p0.ssl.qhimg.com/t01b4b2cfcc7c2286c6.gif" alt=""></a></p>
<h4><a href="#3-模板会话"></a>3、  模板会话</h4>
<p>除了文件上传之外，PWD 还有一个功能，可以使用预定义的模板在几秒钟内启动 5 个节点的群集。</p>
<p><a href="https://camo.githubusercontent.com/1e9e03aa4d3bcd8427cda5eac68ebf8e3b090d62/68747470733a2f2f69312e77702e636f6d2f626c6f672e646f636b65722e636f6d2f77702d636f6e74656e742f75706c6f6164732f74656d706c617465642d73657373696f6e2d312e6769663f7a6f6f6d3d312e3536323526726573697a653d3731302532433431322673736c3d31"><img src="https://p0.ssl.qhimg.com/t017ad854750f03079d.gif" alt="Play with Docker"></a></p>
<h4><a href="#4-一键使用-docker-展示你的应用程序"></a>4、  一键使用 Docker 展示你的应用程序</h4>
<p>PWD 附带的另一个很酷的功能是它的内嵌按钮，你可以在你的站点中使用它来设置 PWD 环境，并快速部署一个构建好的堆栈，另外还有一个 <a href="https://chrome.google.com/webstore/detail/play-with-docker/kibbhpioncdhmamhflnnmfonadknnoan">chrome 扩展</a> ，可以将 “Try in PWD” 按钮添加 DockerHub 最流行的镜像中。 以下是扩展程序的一个简短演示：</p>
<p><a href="https://camo.githubusercontent.com/d33798097152f4ec1589fc43d4b19ed9237f1037/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f46714948664553384b644e435937595439665a623544624c3757597136517762333052677562586978327832496d4a6b6148727345425a626234724178696c6878674e6d7535366351575a486941626674336f785f543755586e356f5152745275786a7246687152536953587746524a634c71366357694179672d70466464694a495673307259"><img src="https://p0.ssl.qhimg.com/t016bed05d3a1f2f082.gif" alt="Play with Docker"></a></p>
<h3><a href="#pwd-培训站点"></a>PWD 培训站点</h3>
<p><a href="http://training.play-with-docker.com/">training.play-with-docker.com</a> 站点提供了大量新的实验。有一些值得注意的两点，包括两个来源于奥斯丁召开的 DockerCon 中的动手实践的实验，还有两个是 Docker 17.06CE 版本中亮眼的新功能：</p>
<ul>
<li><a href="http://training.play-with-docker.com/docker-networking-hol/">可以动手实践的 Docker 网络实验</a></li>
<li><a href="http://training.play-with-docker.com/orchestration-hol/">可以动手实践的 Docker 编排实验</a></li>
<li><a href="http://training.play-with-docker.com/multi-stage/">多阶段构建</a></li>
<li><a href="http://training.play-with-docker.com/swarm-config/">Docker 集群配置文件</a></li>
</ul>
<p>总而言之，现在有 36 个实验，而且一直在增加。 如果你想贡献实验，请从查看 <a href="https://github.com/play-with-docker/play-with-docker.github.io">GitHub 仓库</a>开始。</p>
<h3><a href="#pwd-用例"></a>PWD 用例</h3>
<p>根据网站访问量和我们收到的反馈，很可观的说，PWD 现在有很大的吸引力。下面是一些最常见的用例：</p>
<ul>
<li>紧跟最新开发版本，尝试新功能。</li>
<li>快速建立集群并启动复制服务。</li>
<li>通过互动教程学习： <a href="http://training.play-with-docker.com/">training.play-with-docker.com</a>。</li>
<li>在会议和集会上做演讲。</li>
<li>召开需要复杂配置的高级研讨会，例如 Jérôme’的 <a href="https://github.com/docker/labs/tree/master/Docker-Orchestration">Docker 编排高级研讨会</a>。</li>
<li>和社区成员协作诊断问题检测问题。</li>
</ul>
<p>参与 PWD：</p>
<ul>
<li>通过<a href="https://github.com/play-with-docker/">向 PWD 提交 PR</a> 做贡献</li>
<li>向 <a href="https://github.com/play-with-docker/training">PWD 培训站点</a>贡献</li>
</ul>
<hr>
<p>作者简介：</p>
<p>Victor 是 Docker, Inc. 的高级社区营销经理。他喜欢优质的葡萄酒、象棋和足球，上述爱好不分先后顺序。 Victor 的 tweet：@vcoisne 推特。</p>
<hr>
<p>via: <a href="https://blog.docker.com/2017/07/best-way-learn-docker-free-play-docker-pwd/">https://blog.docker.com/2017/07/best-way-learn-docker-free-play-docker-pwd/</a></p>
<p>作者：<a href="https://blog.docker.com/author/victor_c/">Victor</a> 译者：<a href="https://github.com/Flowsnow">Flowsnow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
免费学习 Docker 的最佳方法：Play-with-docker（PWD）

## 原文链接
[https://www.zcfy.cc/article/the-best-way-to-learn-docker-for-free-play-with-docker](https://www.zcfy.cc/article/the-best-way-to-learn-docker-for-free-play-with-docker)

