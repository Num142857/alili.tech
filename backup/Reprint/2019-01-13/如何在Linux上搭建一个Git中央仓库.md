---
title: '如何在Linux上搭建一个Git中央仓库' 
date: 2019-01-13 2:30:11
hidden: true
slug: bv7383l7i7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前言：本教程只面向那些个人开发者，想要自己在<code>linux</code>上搭建一个<code>git</code>中央仓库用来上传发布自己的项目。但是对于团队来说可能有更高的要求，可以使用<a href="https://about.gitlab.com/downloads/#centos7" rel="nofollow noreferrer" target="_blank"><code>gitlab</code></a>搭建一个可视化的类似<code>github</code>的版本管理系统</p></blockquote>
<h3 id="articleHeader0">测试环境</h3>
<p>我使用的<code>linux</code>版本是<code>Centos7</code>，如果大家使用的是其他发行版本，步骤也都是一样的</p>
<h3 id="articleHeader1">安装Git</h3>
<p><code>Centos</code>上使用的是<code>yum</code>的安装方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install -y git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yum install -y git</code></pre>
<h3 id="articleHeader2">创建一个Git用户来运行Git服务</h3>
<p>1.创建<code>git</code>用户</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="adduser git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">adduser git</code></pre>
<p>2.设置用户密码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="passwd git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">passwd git</code></pre>
<p>3.禁止<code>shell</code>登录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/passwd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vim /etc/passwd</code></pre>
<p>找到<code>git</code>用户的那一行并进行修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="将
git:x:1001:1001:,,,:/home/git:/bin/bash
修改为
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">将
git:x:1001:1001:,,,:/home/git:/bin/bash
修改为
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell</code></pre>
<p>这样一来刚创建<code>git</code>用户可以正常通过<code>ssh</code>使用<code>git</code>，但是无法登录<code>shell</code>，会更加的安全</p>
<h3 id="articleHeader3">创建客户端登录证书</h3>
<p>1.客户端创建私钥和公钥</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh-keygen -t rsa -C &quot;12345678@qq.com&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ssh-keygen -t rsa -C <span class="hljs-string">"12345678@qq.com"</span></code></pre>
<p>创建后你的用户主目录下面就有个<code>.ssh</code>文件夹，里面的<code>id.rsa</code>就是私钥，<code>id.rsa_pub</code>就是公钥。公钥里面的内容待会要用到</p>
<p>2.<code>git</code> 服务器打开RSA验证</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/ssh/sshd_config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vim /etc/ssh/sshd_config</code></pre>
<p>找到并去掉前面的<code>#</code>号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/authorized_keys" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/authorized_keys</code></pre>
<p>最后效果如图所示</p>
<p><span class="img-wrap"><img data-src="/img/bVOKGR?w=709&amp;h=173" src="https://static.alili.tech/img/bVOKGR?w=709&amp;h=173" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3.在<code>git</code>用户的主目录里新建<code>.ssh</code>文件夹，然后在文件夹里面新建文件<code>authorized_keys</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/git
mkdir .ssh
cd .ssh
vim authorized_keys" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> /home/git
mkdir .ssh
<span class="hljs-built_in">cd</span> .ssh
vim authorized_keys</code></pre>
<p>4.将客户端的<code>id.rsa_pub</code>公钥写进文件<code>authorized_keys</code>，一行一个。<em>添加了这个以后你连接中央仓库就不需要输入密码了，直接使用公钥和私钥的验证方式</em></p>
<h3 id="articleHeader4">创建git中央仓库</h3>
<p>1.进入<code>git</code>用户主目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> /home/git</code></pre>
<p>2.创建一个裸仓库 (一般以<code>.git</code>结尾)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git init --bare test.git     #以test.git为例子,当然你可以叫任意名字" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">git init --bare test.git     <span class="hljs-comment">#以test.git为例子,当然你可以叫任意名字</span></code></pre>
<p>裸仓库是没有工作区的，纯粹为了共享</p>
<p>3.修改仓库用户属主</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chown -R git:git test.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">chown -R git:git test.git</code></pre>
<h3 id="articleHeader5">使用<code>git hook</code>
</h3>
<blockquote><p>中央仓库其实只是一个中介，如果你想要把中央仓库的代码关联到你域名挂载下的文件夹时候，就需要使用到<code>git</code>的钩子来实现，当客户端提交代码到中央仓库，中央仓库能将代码也推送到另外的一个文件夹下面</p></blockquote>
<p>1.在服务器初始化一个本地仓库</p>
<p><strong>这个仓库就是你虚拟主机指定的文件夹，也就是你输入域名后会访问到的那个文件夹</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /var/www     #进入你虚拟主机的挂载目录

git init         #初始化git
git remote add origin /home/git/test.git     #添加远程仓库到隔壁的中央仓库(滑稽)

chown -R git:git /var/www     #修改服务器本地仓库的用户属组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> /var/www     <span class="hljs-comment">#进入你虚拟主机的挂载目录</span>

git init         <span class="hljs-comment">#初始化git</span>
git remote add origin /home/git/test.git     <span class="hljs-comment">#添加远程仓库到隔壁的中央仓库(滑稽)</span>

chown -R git:git /var/www     <span class="hljs-comment">#修改服务器本地仓库的用户属组</span></code></pre>
<p>2.在中央仓库中设置钩子</p>
<p>进入远程仓库的钩子目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/git/test.git/hooks" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> /home/git/test.git/hooks</code></pre>
<p>新建一个文件<code>post-receive</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim post-receive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vim post-receive</code></pre>
<p>编写<code>shell</code>脚本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/bin/sh
unset GIT_DIR
DeployPath=/var/www         #这里的目录是你自己虚拟主机的目录

cd $DeployPath
git add . -A &amp;&amp; git stash
git pull origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-meta">#!/bin/sh</span>
<span class="hljs-built_in">unset</span> GIT_DIR
DeployPath=/var/www         <span class="hljs-comment">#这里的目录是你自己虚拟主机的目录</span>

<span class="hljs-built_in">cd</span> <span class="hljs-variable">$DeployPath</span>
git add . -A &amp;&amp; git stash
git pull origin master</code></pre>
<p>当然你也可以视情况而定，将这个脚本编写得更加强大</p>
<p>给文件<code>post-receive</code>添加可执行权限</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chmod +x post-receive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">chmod +x post-receive</code></pre>
<h3 id="articleHeader6">客户端远程git服务器</h3>
<blockquote><p>这应该也是大家最期待的步骤了，实现本地提交代码上服务器，通过钩子实现项目的自动部署<br>其实到了这一步，就和你以前使用<code>git</code>上传代码到<code>github</code>上面没有什么区别了</p></blockquote>
<p>1.克隆中央仓库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方法一
git clone git@192.168.229.130:test.git        #把ip换成你自己服务器的ip

方法二
git init
git remote add origin git@118.89.28.249:test.git    #把ip换成你自己服务器的ip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">方法一
git <span class="hljs-built_in">clone</span> git@192.168.229.130:test.git        <span class="hljs-comment">#把ip换成你自己服务器的ip</span>

方法二
git init
git remote add origin git@118.89.28.249:test.git    <span class="hljs-comment">#把ip换成你自己服务器的ip</span></code></pre>
<p>2.推送远程服务器 (第一次加上-u参数)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push -u origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">git push -u origin master</code></pre>
<h3 id="articleHeader7">结尾</h3>
<p>通过上面的这些步骤其实就可以实现一个简易的<code>git</code>服务器了，是不是很简单呢?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在Linux上搭建一个Git中央仓库

## 原文链接
[https://segmentfault.com/a/1190000009673544](https://segmentfault.com/a/1190000009673544)

