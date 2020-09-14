---
title: '基于RESTful API 怎么设计用户权限控制？' 
date: 2019-02-12 2:30:12
hidden: true
slug: ogayat8vhek
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="http://huang-jerryc.com/2015/03/29/%E5%9F%BA%E4%BA%8ERESTful-API-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6/" rel="nofollow noreferrer" target="_blank">BlueSun | 基于RESTful API 怎么设计用户权限控制？</a></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>有人说，每个人都是平等的；<br>也有人说，人生来就是不平等的；<br>在人类社会中，并没有绝对的公平，<br>一件事，并不是所有人都能去做；<br>一样物，并不是所有人都能够拥有。<br>每个人都有自己的角色，每种角色都有对某种资源的一定权利，或许是拥有，或许只能是远观而不可亵玩。<br>把这种人类社会中如此抽象的事实，提取出来，然后写成程序，还原本质的工作，就是我们程序员该做的事了。<br>有了一个这么有范儿的开头，下面便来谈谈基于RESTful，如何实现不同的人不同的角色对于不同的资源不同的操作的权限控制。</p>
<h2 id="articleHeader1">RESTful简述</h2>
<p>本文是基于RESTful描述的，需要你对这个有初步的了解。<br>RESTful是什么？<br><strong>Representational State Transfer</strong>，简称<strong>REST</strong>，是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。<br>REST比较重要的点是<strong>资源</strong>和<strong>状态转换</strong>，<br>所谓"<strong>资源</strong>"，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。<br>而 "<strong>状态转换</strong>"，则是把对应的HTTP协议里面，四个表示操作方式的动词分别对应四种基本操作：</p>
<ol>
<li><p>GET，用来浏览(browse)资源</p></li>
<li><p>POST，用来新建(create)资源</p></li>
<li><p>PUT，用来更新(update)资源</p></li>
<li><p>DELETE，用来删除(delete)资源</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842045" src="https://static.alili.tech/img/remote/1460000004842045" alt="RESTful CURD" title="RESTful CURD" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">资源的分类及操作</h2>
<p>清楚了资源的概念，然后再来对资源进行一下分类，我把资源分为下面三类：</p>
<ol>
<li><p>私人资源 (Personal Source)</p></li>
<li><p>角色资源 (Roles Source)</p></li>
<li><p>公共资源 (Public Source)</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842054" src="https://static.alili.tech/img/remote/1460000004842054" alt="Sources" title="Sources" style="cursor: pointer; display: inline;"></span></p>
<p><strong>"私人资源"</strong>：是属于某一个用户所有的资源，只有用户本人才能操作，其他用户不能操作。例如用户的个人信息、订单、收货地址等等。 <br><strong>"角色资源"</strong>：与私人资源不同，角色资源范畴更大，一个角色可以对应多个人，也就是一群人。如果给某角色分配了权限，那么只有身为该角色的用户才能拥有这些权限。例如系统资源只能够管理员操作，一般用户不能操作。 <br><strong>"公共资源"</strong>：所有人无论角色都能够访问并操作的资源。 </p>
<p>而对资源的操作，无非就是分为四种：</p>
<ol>
<li><p>浏览 (browse)</p></li>
<li><p>新增 (create)</p></li>
<li><p>更新 (update)</p></li>
<li><p>删除 (delete)</p></li>
</ol>
<h2 id="articleHeader3">角色、用户、权限之间的关系</h2>
<p>角色和用户的概念，自不用多说，大家都懂，但是权限的概念需要提一提。    <br><strong>"权限"</strong>，就是资源与操作的一套组合，例如"增加用户"是一种权限，"删除用户"是一种权限，所以对于一种资源所对应的权限有且只有四种。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842063" src="https://static.alili.tech/img/remote/1460000004842063" alt="Permissions" title="Permissions" style="cursor: pointer;"></span></p>
<p><strong>角色</strong>与<strong>用户</strong>的关系：一个角色对应一群用户，一个用户也可以扮演多个角色，所以它们是多对多的关系。    <br><strong>角色</strong>与<strong>权限</strong>的关系：一个角色拥有一堆权限，一个权限却只能属于一个角色，所以它们是一(角色)对多(权限)的关系    <br><strong>权限</strong>与<strong>用户</strong>的关系：由于一个用户可以扮演多个角色，一个角色拥有多个权限，所以用户与权限是间接的多对多关系。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842067" src="https://static.alili.tech/img/remote/1460000004842067" alt="Relations" title="Relations" style="cursor: pointer;"></span></p>
<p>需要注意两种特别情况：</p>
<ol>
<li><p>私人资源与用户的关系，一种私人资源对应的四种权限只能属于一个用户，所以这种情况下，用户和权限是一(用户)对多(权限)的关系。</p></li>
<li><p>超级管理员的角色，这个角色是神一般的存在，能无视一切阻碍，对所有资源拥有绝对权限，甭管你是私人资源还是角色资源。</p></li>
</ol>
<h2 id="articleHeader4">数据库表的设计</h2>
<p>角色、用户、权限的模型应该怎么样设计，才能满足它们之间的关系？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842072" src="https://static.alili.tech/img/remote/1460000004842072" alt="Models" title="Models" style="cursor: pointer;"></span></p>
<p>对上图的一些关键字段进行说明：</p>
<h6>Source</h6>
<ul>
<li><p>name: 资源的名称，也就是其他模型的名称，例如：user、role等等。</p></li>
<li><p>identity: 资源的唯一标识，可以像uuid，shortid这些字符串，也可以是model的名称。</p></li>
<li><p>permissions : 一种资源对应有四种权限，分别对这种资源的browse、create、update、delete</p></li>
</ul>
<h6>Permission</h6>
<ul>
<li><p>source : 该权限对应的资源，也就是Source的某一条记录的唯一标识</p></li>
<li><p>action ：对应资源的操作，只能是browse、create、update、delete四个之一</p></li>
<li><p>relation：用来标记该权限是属于私人的，还是角色的，用于OwnerPolicy检测</p></li>
<li><p>roles: 拥有该权限的角色</p></li>
</ul>
<h6>Role</h6>
<ul>
<li><p>users : 角色所对应的用户群，一个角色可以对应多个用户</p></li>
<li><p>permissions: 权限列表，一个角色拥有多项权利</p></li>
</ul>
<h6>User</h6>
<ul>
<li><p>createBy : 该记录的拥有者，在user标里，一般等于该记录的唯一标识，这一属性用于OwnerPolicy的检测，其他私有资源的模型设计，也需要加上这一字段来标识资源的拥有者。</p></li>
<li><p>roles : 用户所拥有的角色</p></li>
</ul>
<h2 id="articleHeader5">策略/过滤器</h2>
<p>在sails下称为策略(Policy)，在java SSH下称为过滤器(Filter)，无论名称如何，他们工作原理是大同小异的，主要是在一条HTTP请求访问一个Controller下的action之前进行检测。所以在这一层，我们可以自定义一些策略/过滤器来实现权限控制。    <br>为行文方便，下面姑且允许我使用策略这一词。</p>
<p><strong> 策略 (Policy) </strong></p>
<blockquote><p>下面排版顺序对应Policy的运行顺序</p></blockquote>
<ol>
<li><p><strong>SessionAuthPolicy</strong>：    <br>检测用户是否已经登录，用户登录是进行下面检测的前提。</p></li>
<li><p><strong>SourcePolicy</strong>：    <br>检测访问的资源是否存在，主要检测Source表的记录</p></li>
<li><p><strong>PermissionPolicy</strong>：    <br>检测该用户所属的角色，是否有对所访问资源进行对应操作的权限。</p></li>
<li><p><strong>OwnerPolicy</strong>：    <br>如果所访问的资源属于私人资源，则检测当前用户是否该资源的拥有者。</p></li>
</ol>
<p>如果通过所有policy的检测，则把请求转发到目标action。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004842075" src="https://static.alili.tech/img/remote/1460000004842075" alt="Policies" title="Policies" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">Sails下的权限控制实现</h2>
<p>在Sails下，有一个很方便的套件<a href="https://github.com/tjwebb/sails-permissions" rel="nofollow noreferrer" target="_blank">sails-permissions</a>，集成了一套权限管理的方案，本文也是基于该套件的源码所引出来的权限管理解决方案。</p>
<h2 id="articleHeader7">结语</h2>
<p>对程序员最大的挑战，并不是能否掌握了哪些编程语言，哪些软件框架，而是对业务和需求的理解，然后在此基础上，把要点抽象出来，写成计算机能理解的语言。    <br>最后，希望这篇文章，能够帮助你对权限管理这一课题增加多一点点理解。</p>
<h2 id="articleHeader8">写作参考</h2>
<ul>
<li><p><a href="http://www.ruanyifeng.com/blog/2011/09/restful.html" rel="nofollow noreferrer" target="_blank">理解RESTful架构</a></p></li>
<li><p><a href="http://zh.wikipedia.org/wiki/REST" rel="nofollow noreferrer" target="_blank">REST wiki</a></p></li>
<li><p><a href="https://github.com/tjwebb/sails-permissions" rel="nofollow noreferrer" target="_blank">sails-permissions 源码</a></p></li>
</ul>
<hr>
<p>如果本文对您有用<br>请不要吝啬你们的Follow与Start<br>这会大大支持我们继续创作</p>
<p><strong>「Github」</strong><br>MZMonster ：<a href="https://github.com/MZMonster/" rel="nofollow noreferrer" target="_blank">@MZMonster</a><br>JC_Huang ：<a href="https://github.com/JerryC8080" rel="nofollow noreferrer" target="_blank">@JerryC8080</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于RESTful API 怎么设计用户权限控制？

## 原文链接
[https://segmentfault.com/a/1190000004627946](https://segmentfault.com/a/1190000004627946)

