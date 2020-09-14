---
title: '给你的mongodb设置密码吧！' 
date: 2018-12-28 2:30:11
hidden: true
slug: lb9efsjz2b8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">mongodb安装后是无需密码</h2>
<p>Mongodb安装后自身是没有密码的，用户连接只需填写id地址，端口号，数据库名称即可</p>
<h2 id="articleHeader1">安全问题</h2>
<p>只要你服务器的mongodb数据库端口开放，任何人的电脑都可以连接到你的数据库，操作修改你的mongodb数据，本人以前就遭受过入侵，深有感触。如图：黑客盗取你的数据库，然后留下一个邮箱和账号，要求你给比特币才肯归还数据库给你。。。<br><span class="img-wrap"><img data-src="/img/bVWDay?w=1247&amp;h=561" src="https://static.alili.tech/img/bVWDay?w=1247&amp;h=561" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">给mongodb加密</h2>
<p>如果需要给MongoDB数据库使用安全验证，则需要用--auth开启安全性检查，只有数据库认证的用户才能执行读写操作，开户安全性检查。<br>第一步：开机先：<code>mongod --dbpath 存放数据库文件夹路径</code><br><span class="img-wrap"><img data-src="/img/bVWC96?w=865&amp;h=199" src="https://static.alili.tech/img/bVWC96?w=865&amp;h=199" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第二步:打开命令行窗口输入<code>mongo</code>，进入mongo环境 <br><span class="img-wrap"><img data-src="/img/bVWDbz?w=1190&amp;h=245" src="https://static.alili.tech/img/bVWDbz?w=1190&amp;h=245" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第三步：切换到 'admin' 数据库   <code>use admin</code><br><span class="img-wrap"><img data-src="/img/bVWDdY?w=295&amp;h=86" src="https://static.alili.tech/img/bVWDdY?w=295&amp;h=86" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第四步：给admin设置用户密码:<br>user: 用户名, pwd: 用户密码,roles: 用来设置用户的权限，比如读，读写 等等<br><code>db.createUser({user: 'root', pwd: '123456', roles: ['root']})</code><br><span class="img-wrap"><img data-src="/img/bVWDeE?w=746&amp;h=101" src="https://static.alili.tech/img/bVWDeE?w=746&amp;h=101" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>验证是否添加成功，<code>'db.auth(用户名，用户密码)'</code> 这里用<code>db.auth('root', '123456')</code>     如果返回 '1'表示验证成功， 如果是 '0' 表示验证失败...</p>
<p>第5步：刚才是给root设置密码，现在要给特定的每个库设置权限，比如我这里有一个库，库名字叫做Article,这里以Article这个库为例<br><span class="img-wrap"><img data-src="/img/bVWDfT?w=230&amp;h=92" src="https://static.alili.tech/img/bVWDfT?w=230&amp;h=92" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>切换到Article数据库，<code>use Article</code><br><span class="img-wrap"><img data-src="/img/bVWDie?w=277&amp;h=77" src="https://static.alili.tech/img/bVWDie?w=277&amp;h=77" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来为这个库添加一个用户，并且赋予权限，<code>db.createUser({user:'zwVic',pwd:'adgjmp123',roles: [{role:'readWrite',db:'Article'}]})})</code><br>这行代码意思是 创建一个zwStar用户 给予读写权限 db表示该用户操作的数据库名<br><span class="img-wrap"><img data-src="/img/bVWDi6?w=908&amp;h=37" src="https://static.alili.tech/img/bVWDi6?w=908&amp;h=37" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVWDFX?w=488&amp;h=200" src="https://static.alili.tech/img/bVWDFX?w=488&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>OK，一切搞定，重新开机mongodb，MongoDB默认是没有开启访问控制，我们通过<code>--auth</code>参数重启mongod服务。<code>mongod --dbpath 存放数据库文件夹路径 --auth</code>一旦开启了，用户连接mongod必须指定用户名和密码。<br><span class="img-wrap"><img data-src="/img/bVWDGi?w=937&amp;h=34" src="https://static.alili.tech/img/bVWDGi?w=937&amp;h=34" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">连接加密数据库</h2>
<p><code>xxx.db('mongodb://your name: your pwd@ ip :27017/Article');</code><br><code>your name</code>：为用户名<br><code>your pwd</code>:为密码</p>
<h2 id="articleHeader4">总结</h2>
<p>通过加密后。连接数据库就需要账号，密码，同时阿里云或者腾讯云上也可以给服务器设置安全组增加安全性，比如27107这个端口只授权给自己访问等等....<br>文中有什么不对的，希望大家指正哈！<br>如果觉得本文对你有所帮助，就star一下吧～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给你的mongodb设置密码吧！

## 原文链接
[https://segmentfault.com/a/1190000011554055](https://segmentfault.com/a/1190000011554055)

