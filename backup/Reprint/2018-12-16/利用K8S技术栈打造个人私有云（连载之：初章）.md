---
title: '利用K8S技术栈打造个人私有云（连载之：初章）' 
date: 2018-12-16 2:30:10
hidden: true
slug: z0e1pzfpa9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012978616" src="https://static.alili.tech/img/remote/1460000012978616" alt="iMac Pro" title="iMac Pro" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader0">我的想法是什么</h2>
<p>最近在学习Docker技术，相信Docker技术大家都有所了解，Docker类似于虚拟机（但与虚拟机又有本质不同），提供进程级别的隔离。我们可以利用Docker来方便地来做很多事情，比如搭建一个翻墙VPN、搞一个爬虫、弄一个私人博客，部署一个裸机上比较难以安装的环境等等……可以说几乎没有什么目的办不到，这简直是宅男老铁们的福利啊！</p>
<p>但话又说回来，单个Docker所能发挥的作用毕竟有限，也不便于批量管理，更满足不了各种量比较大的业务场景所需的高可用、弹性伸缩等特性，所以Docker得组集群来并赋予各种完善的调度机制才能发挥强大的技术优势。既然要组集群那就涉及诸如Docker的资源调度、管理等等一系列问题。Docker集群技术发展得很火热， 目前涉及Docker集群的三个主要的技术无外乎Docker Swarm、Kubernetes、Mesos三种主流方案。</p>
<p>Docker Swarm是Docker提供的原生集群技术，我只做过一些初步实践（<a href="https://www.jianshu.com/p/3f3c9e0e3db5" rel="nofollow noreferrer" target="_blank">Docker Swarm集群初探</a>），发现还比较容易上手，大家也可以自行去深入学习一下，我就不多说了。</p>
<p>Kubernetes（以下简称K8S）源自于Google，是一个为容器化应用提供自动部署、扩容和管理的开源项目，社区非常活跃，也是用得更加广泛的Docker集群技术。我最近也是花了一些时间在这上面进行学习，但由于缺少实际实践经验，总有点不痛不痒的感觉，所以没办法只能自己来创造一些实践，就想着用它来做出点什么出来。</p>
<p>好，背景介绍完了。那我到底想用我刚自学的Docker和Kubernetes来做一件什么事情呢？听我慢慢道来...</p>
<blockquote>
<strong>注：</strong> 本文首发于 My 公众号 <strong>CodeSheep</strong> ，可 <strong>长按</strong> 或 <strong>扫描</strong> 下面的 <strong>小心心</strong> 来订阅 ↓ ↓ ↓</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015723456" src="https://static.alili.tech/img/remote/1460000015723456" alt="CodeSheep · 程序羊" title="CodeSheep · 程序羊" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>当下云主机可以说非常火热了，不知道大家是否用过BAT等一系列厂商旗下XX云所提供的云主机服务。我们只需要买一个云主机，然后就可以尽情地去上面干各种事情了，常见的比如建站、搭博客、部署服务甚至直接买一个windows云主机直接用于办公。</p>
<p>以某个云服务为例，来张图看看：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012978617" src="https://static.alili.tech/img/remote/1460000012978617" alt="某个云服务的控制台" title="某个云服务的控制台" style="cursor: pointer; display: inline;"></span></p>
<p>然后我们就可以进去付费创建一个云主机自己使用，就像下面这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012978618" src="https://static.alili.tech/img/remote/1460000012978618" alt="实例化（创建）云主机" title="实例化（创建）云主机" style="cursor: pointer; display: inline;"></span></p>
<p>这种服务如今如此地火热，我想这背后肯定少不了的就是容器技术和集群技术的加持，想到这里我想大家应该明白我这篇文章的主题了。是的，本篇文章及接下来的连载系列文章将详细讲述如何用k8s技术栈打造一个属于自己的私有云服务（取名为 <strong>SheepCloud</strong>，怎么样是不是很时髦...）。这样的话，我自己在家就可以申请创建很多云主机节点，然后自己想做啥就做啥，什么云计算、分布式实验统统不都可以免费进行了！</p>
<p>嗯，理想是好的，接下来还有一大堆事情要做呢...</p>
<hr>
<h2 id="articleHeader1">我准备打造什么样形式的个人私有云</h2>
<p>其实上面已经说过了，准备模仿那些云服务提供商的云主机功能，先在网页上申请创建云主机，创建成功后分配 <strong>IP地址/子网号 + 用户名 + 密码</strong> 给用户，这样用户就可以用用ssh方式连入分配到的具有独立IP的云主机中进行工作，这样就和那些服务商提供的云主机服务没有什么不同了。</p>
<p>所以首先得有前端页面，我自己用Vue.js写了一个Demo（目前还未跟后端联调），让大家有个感性的认识：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012978619" src="https://static.alili.tech/img/remote/1460000012978619" alt="SheepCloud控制台界面" title="SheepCloud控制台界面" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader2">我准备如何来入手这个小项目</h2>
<p>本来我的初衷就是想深入实践一下Docker和Kubernetes（以下简称K8S）是怎么玩的，但东西还真不少，总结了一下涉及的技术，可能还不止这些：</p>
<ul>
<li>Docker：不用多说，毕竟负责容器的落地，云主机本质上就是一个win或linux容器</li>
<li>Kubernetes：管理Docker的集群技术，这里面是有很多kube的组件</li>
<li>flannel：负责节点中容器间的通信以及私有云各个实例的IP地址规划</li>
<li>etcd：分布式数据库，kubernetes和flannel都需要它</li>
<li>SpringBt：驱动后端服务</li>
<li>Vue.js：编写私有云前端WEB页面</li>
</ul>
<p>…</p>
<p>我自己规划了一个基本路线来入手：</p>
<ul>
<li>熟悉Docker</li>
<li>熟悉Kubernetes基本概念并搭建K8S集群</li>
<li>K8S集群理解与练手实验</li>
<li>基础镜像制作与实验，能完成单个操作系统容器的手动管理</li>
<li>K8S资源控制代码编写，能实现集群对容器资源的自动控制</li>
<li>私有云客户端WEB前端页面编写</li>
<li>前后端联调</li>
<li>总结输出</li>
</ul>
<hr>
<h2 id="articleHeader3">我准备输出哪些东西</h2>
<p>准备输出系列连载文章，本篇文章是连载系列的第一篇</p>
<ul>
<li><a href="https://www.jianshu.com/p/9bc87b5380e8" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：初章） </a></li>
<li><a href="https://www.jianshu.com/p/7d1fb03b8925" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：K8S集群搭建）</a></li>
<li><a href="https://www.jianshu.com/p/5b0cd99e0332" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：K8S环境理解和练手）</a></li>
<li><a href="https://www.jianshu.com/p/e38c05cf076a" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：基础镜像制作与实验）</a></li>
<li><a href="https://www.jianshu.com/p/58a98e65074c" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：资源控制研究）</a></li>
<li><a href="https://www.jianshu.com/p/a7cdb3ab4e11" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云（连载之：私有云客户端打造）</a></li>
</ul>
<hr>
<h2 id="articleHeader4">总结</h2>
<p>学以致用这个词我近来感触颇深，学一门技术，如果不辅之以实践，真的很难深入其中。浮在表面不痛不痒地学习真心很不爽，没有实践，自己制造实践也要上！大家共勉</p>
<hr>
<h2 id="articleHeader5">后记</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/mp/homepage?__biz=MzU4ODI1MjA3NQ%3D%3D&amp;hid=1&amp;sn=38adcd22c57a36e95b32bf818fcf03b2" rel="nofollow noreferrer" target="_blank">作者更多的原创文章在此，欢迎观赏</a></li>
<li><a href="http://www.codesheep.cn" rel="nofollow noreferrer" target="_blank">My Personal Blog</a></li>
</ul>
<p>作者更多的SpringBt实践文章在此：</p>
<ul>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483771&amp;idx=1&amp;sn=7c5f103a816c16e453e04141d7433bf9&amp;chksm=fdded7bfcaa95ea9a5dbe81114d32c1908bf8da0b3366bfbfcbe2473445cdba73c5e2060d5f3#rd" rel="nofollow noreferrer" target="_blank">Spring Boot应用监控实战</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483792&amp;idx=1&amp;sn=fde72633b86c7f951cd2a25f0c270121&amp;chksm=fdded754caa95e420516178ff70b67b42271c4c68bc4644b4671925bf3c0b8383242432318a5#rd" rel="nofollow noreferrer" target="_blank">SpringBoot应用部署于外置Tomcat容器</a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=100000076&amp;idx=1&amp;sn=321d1d6c6a71c2eedd36e6380893843e&amp;scene=19#wechat_redirect" rel="nofollow noreferrer" target="_blank">ElasticSearch搜索引擎在SpringBt中的实践</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=100000082&amp;idx=1&amp;sn=8b9325d37d2373a9963191983c7cce51&amp;scene=19#wechat_redirect" rel="nofollow noreferrer" target="_blank">初探Kotlin+SpringBoot联合编程</a></li>
<li><a href="https://www.jianshu.com/p/780a1bf46a1f" rel="nofollow noreferrer" target="_blank">Spring Boot日志框架实践</a></li>
<li><a href="https://www.jianshu.com/p/c88b0f17f62a" rel="nofollow noreferrer" target="_blank">SpringBoot优雅编码之：Lombok加持</a></li>
</ul>
<hr>
<p>如果有兴趣，也可以抽点时间看看作者一些关于容器化、微服务化方面的文章：</p>
<ul>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483699&amp;idx=1&amp;sn=57b84f4ec72c8a578934cdb4225e6fe7&amp;chksm=fdded7f7caa95ee198652c295b48b74565fd244afc4dccc0551b036c8216caab0397a1342d99#rd" rel="nofollow noreferrer" target="_blank">利用K8S技术栈打造个人私有云 连载文章</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483807&amp;idx=1&amp;sn=e3a164701c2f6e0f3cf91bd25d595479&amp;chksm=fdded75bcaa95e4d857e5f4e040f37b7c3d8f3b301856493419498b6e54d8a43addfc25e7505#rd" rel="nofollow noreferrer" target="_blank">从一份配置清单详解Nginx服务器配置</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483810&amp;idx=1&amp;sn=51a4cdb03e54348e7736ea47fae04a96&amp;chksm=fdded766caa95e70e14dba33a51224c319219852e1618bbefb380f1b9406b1d19f8563a66bf8#rd" rel="nofollow noreferrer" target="_blank">Docker容器可视化监控中心搭建</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483768&amp;idx=1&amp;sn=df06fd3fc033ef8120a14677db388d9a&amp;chksm=fdded7bccaa95eaaac9ff046c1c7fad0d3489ec7af546d829175af6106340e053f570e8c927c#rd" rel="nofollow noreferrer" target="_blank">利用ELK搭建Docker容器化应用日志中心</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483777&amp;idx=1&amp;sn=f15f86fd0cde1855fec1f6ad2098b331&amp;chksm=fdded745caa95e53bbcc8ccaf495dc1a4abb64412cc6ea60989c8cafd138d475fae073b87011#rd" rel="nofollow noreferrer" target="_blank">RPC框架实践之：Apache Thrift</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483780&amp;idx=1&amp;sn=e04264df80209244f8e263ef0931d134&amp;chksm=fdded740caa95e56190918108985795439a277a88e054c119b3cb63a92a8e0899943d9f3e02b#rd" rel="nofollow noreferrer" target="_blank">RPC框架实践之：Google gRPC</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483764&amp;idx=1&amp;sn=964629a4e1d42d84047986529376eb28&amp;chksm=fdded7b0caa95ea6a038c623f8813c239e3c6cf87a6cd3818277369f6c287a6833d7826b9bdd#rd" rel="nofollow noreferrer" target="_blank">微服务调用链追踪中心搭建</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483798&amp;idx=1&amp;sn=fd8f78d60d1dc6e4da3359dbf6a14753&amp;chksm=fdded752caa95e44e1cf62f5dc373a49d93426c9800a5343b1959a12a5b1fdb4958b2ee746c1#rd" rel="nofollow noreferrer" target="_blank">Docker容器跨主机通信</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=100000047&amp;idx=1&amp;sn=aae83c856942ae2c792658384421677c&amp;scene=19#wechat_redirect" rel="nofollow noreferrer" target="_blank">Docker Swarm集群初探</a></li>
<li><a href="http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&amp;mid=2247483813&amp;idx=1&amp;sn=b0b87a7ec8816f53fd19142424682de0&amp;scene=19#wechat_redirect" rel="nofollow noreferrer" target="_blank">高效编写Dockerfile的几条准则</a></li>
</ul>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014055513" src="https://static.alili.tech/img/remote/1460000014055513" alt="CodeSheep · 程序羊" title="CodeSheep · 程序羊" style="cursor: pointer; display: inline;"></span></p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用K8S技术栈打造个人私有云（连载之：初章）

## 原文链接
[https://segmentfault.com/a/1190000012978613](https://segmentfault.com/a/1190000012978613)

