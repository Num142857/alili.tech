---
title: '不仅仅是前端er——折腾服务器武装自己' 
date: 2018-12-14 2:30:11
hidden: true
slug: e90bnxu6bmu
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV3JbS?w=940&amp;h=626" src="https://static.alili.tech/img/bV3JbS?w=940&amp;h=626" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">前言</h1>
<p>作为一个前端开发工程师，每天和浏览器、业务代码打交道，对于“前端”的概念算是比较熟悉了，主流的框架、工具等都能玩得转，但总觉得自己一直都被禁锢在小小的所谓“前端”的圈子中——因为除此之外的知识点还是比较薄弱的。</p>
<p>后来在公司里面获得了一个轮岗的机会，进入到了运维团队去学习，眼界也开阔了很多，对于自身水平的认识也更加深入，迫不及待想要提升自己“前端知识”以外的技能树。</p>
<p>由于运维团队经常会跟服务器打交道，那么我何不干脆就从服务器开始，好好折腾一遍呢？</p>
<h1 id="articleHeader1">一、购买服务器</h1>
<p>曾经考虑过购买腾讯云或者阿里云等国内服务器，但是由于国内总所周知的原因，许多资源的下载要么特别慢，要么干脆直接跪了，动不动就要切换源。同时如果域名绑定了国内的服务器，都需要进行备案，实在是无比麻烦。毫无疑问，我最终选择了国外的服务器，世界瞬间就清净了……</p>
<p>关于国外的服务器选购，是见仁见智的事情，我选购的是一台搬瓦工20G KVM服务器，5美元/月，买了不吃亏买了不上当，然后安装了Centos 7 x86_64 bbr系统，接下来就可以愉快地玩耍了。</p>
<p><span class="img-wrap"><img data-src="/img/bV3HWh?w=650&amp;h=461" src="https://static.alili.tech/img/bV3HWh?w=650&amp;h=461" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">二、购买域名</h1>
<p>搭个什么服务都好，总不能让别人背自己的ip，如果能够拥到一个拉风的域名还是很赞的。于是我就去<a href="https://wanwang.aliyun.com/" rel="nofollow noreferrer" target="_blank">万网</a>，直接以自己的英文名字<code>jrainlau</code>申请了一个<code>jrainlau.com</code>域名，一年才55块RMB，真的超值哦~</p>
<p>很简单的下单、支付，然后我就拥有了自己的专属域名，接下来就是进行DNS解析了。</p>
<p>进入阿里云的控制台，找到<code>云解析DNS</code>，点进去就能看到我们的域名解析信息了。添加两条类型为<code>A</code>的记录，统统指向服务器的ip地址即可：</p>
<p><span class="img-wrap"><img data-src="/img/bV3HX6?w=1383&amp;h=575" src="https://static.alili.tech/img/bV3HX6?w=1383&amp;h=575" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">三、安装Nginx</h1>
<p>在域名解析生效前的10分钟里面，足够我们在服务器上配置好Nginx了。</p>
<p>首先ssh登录服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh root@xxx.xxx.xxx.xxx -p yyyy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">ssh root@xxx<span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.xxx</span> -<span class="hljs-selector-tag">p</span> yyyy</code></pre>
<p>输入搬瓦工提供的登录密码之后，顺利登入。</p>
<p>但是如果每次登录服务器都要输入一遍那乱码般的密码，是很痛苦的一件事，所以果断使用ssh-key来实现免密登录。</p>
<ul>
<li>
<p>第一步，生成秘钥（如果本机已存在可省略这一步）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh-keygen -t rsa" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">ssh-keygen -t rsa</span></code></pre>
<p>按照提示选择秘钥所存放的目录（<code>~/.ssh/</code>），<strong>密码留空</strong>，最后可以在设定的目录里找到生成的秘钥：</p>
<p><span class="img-wrap"><img data-src="/img/bV3H67?w=368&amp;h=90" src="https://static.alili.tech/img/bV3H67?w=368&amp;h=90" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
</li>
<li>
<p>第二步，上传秘钥到服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh-copy-id root@xxx.xxx.xxx -p yyyy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">ssh-copy-id root@xxx<span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.xxx</span> -<span class="hljs-selector-tag">p</span> yyyy</code></pre>
<p>然后按照提示输入一遍密码就可以了。以后想要登录服务器就可以直接免密登录啦！</p>
</li>
</ul>
<p>做完刚才的“分支任务”，回到我们配置Nginx的主线。</p>
<p>按照Nginx官网的文档，在CentOS中安装Nginx是非常简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install -y nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">yum <span class="hljs-keyword">install</span> -y nginx</code></pre>
<p>但是在实际操作中，却发现一直提示<code>No package nginx available</code>。搜了一圈，Stack Overflow里面的回答都是因为可能没有安装<code>epel</code>，于是马上尝试之：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install -y epel-release" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">yum <span class="hljs-keyword">install</span> -y epel-<span class="hljs-keyword">release</span></code></pre>
<p>奇怪的是，运行结果提示epel已经存在，为nothing to do。然后当我尝试安装nginx的时候，发现还是no package nginx available。尝试列出yum所有的源，发现<strong>根本没有epel</strong>源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum repolist

源标识                          源名称                                                                      状态
base/7/x86_64                   CentOS-7 - Base                                                             9,590+1
extras/7/x86_64                 CentOS-7 - Extras                                                               388
updates/7/x86_64                CentOS-7 - Updates                                                          1,922+7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>yum repolist

源标识                          源名称                                                                      状态
base/<span class="hljs-number">7</span>/x86_64                   CentOS<span class="hljs-number">-7</span> - Base                                                             <span class="hljs-number">9</span>,<span class="hljs-number">590</span>+<span class="hljs-number">1</span>
extras/<span class="hljs-number">7</span>/x86_64                 CentOS<span class="hljs-number">-7</span> - Extras                                                               <span class="hljs-number">388</span>
updates/<span class="hljs-number">7</span>/x86_64                CentOS<span class="hljs-number">-7</span> - Updates                                                          <span class="hljs-number">1</span>,<span class="hljs-number">922</span>+<span class="hljs-number">7</span></code></pre>
<p>后来经过一番折腾，才找到解决办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 首先进入/yum.repos.d目录
cd /etc/yum.repos.d

# 然后编辑epel.repo文件
vi epel.repo

[epel]
name=Extra Packages for Enterprise Linux 7 - $basearch
#baseurl=http://download.fedoraproject.org/pub/epel/7/$basearch
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-7&amp;arch=$basearch
failovermethod=priority
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7

[epel-debuginfo]
name=Extra Packages for Enterprise Linux 7 - $basearch - Debug
#baseurl=http://download.fedoraproject.org/pub/epel/7/$basearch/debug
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-debug-7&amp;arch=$basearch
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
gpgcheck=1

[epel-source]
name=Extra Packages for Enterprise Linux 7 - $basearch - Source
#baseurl=http://download.fedoraproject.org/pub/epel/7/SRPMS
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-source-7&amp;arch=$basearch
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
gpgcheck=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 首先进入/yum.repos.d目录</span>
cd /etc/yum.repos.d

<span class="hljs-comment"># 然后编辑epel.repo文件</span>
vi epel.repo

[epel]
name=Extra Packages <span class="hljs-keyword">for</span> Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-variable">$basearch</span>
<span class="hljs-comment">#baseurl=http://download.fedoraproject.org/pub/epel/7/$basearch</span>
mirrorlist=<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/mirrors.fedoraproject.org/metalink</span>?repo=epel-<span class="hljs-number">7</span>&amp;arch=<span class="hljs-variable">$basearch</span>
failovermethod=priority
enabled=<span class="hljs-number">0</span>
gpgcheck=<span class="hljs-number">1</span>
gpgkey=<span class="hljs-symbol">file:</span>/<span class="hljs-regexp">//etc</span><span class="hljs-regexp">/pki/rpm</span>-gpg/RPM-GPG-KEY-EPEL-<span class="hljs-number">7</span>

[epel-debuginfo]
name=Extra Packages <span class="hljs-keyword">for</span> Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-variable">$basearch</span> - Debug
<span class="hljs-comment">#baseurl=http://download.fedoraproject.org/pub/epel/7/$basearch/debug</span>
mirrorlist=<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/mirrors.fedoraproject.org/metalink</span>?repo=epel-debug-<span class="hljs-number">7</span>&amp;arch=<span class="hljs-variable">$basearch</span>
failovermethod=priority
enabled=<span class="hljs-number">0</span>
gpgkey=<span class="hljs-symbol">file:</span>/<span class="hljs-regexp">//etc</span><span class="hljs-regexp">/pki/rpm</span>-gpg/RPM-GPG-KEY-EPEL-<span class="hljs-number">7</span>
gpgcheck=<span class="hljs-number">1</span>

[epel-source]
name=Extra Packages <span class="hljs-keyword">for</span> Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-variable">$basearch</span> - Source
<span class="hljs-comment">#baseurl=http://download.fedoraproject.org/pub/epel/7/SRPMS</span>
mirrorlist=<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/mirrors.fedoraproject.org/metalink</span>?repo=epel-source-<span class="hljs-number">7</span>&amp;arch=<span class="hljs-variable">$basearch</span>
failovermethod=priority
enabled=<span class="hljs-number">0</span>
gpgkey=<span class="hljs-symbol">file:</span>/<span class="hljs-regexp">//etc</span><span class="hljs-regexp">/pki/rpm</span>-gpg/RPM-GPG-KEY-EPEL-<span class="hljs-number">7</span>
gpgcheck=<span class="hljs-number">1</span></code></pre>
<p>可以看到，<code>[epel]</code>和<code>[epel-source]</code>里面的<code>enabled</code>都是0，解决办法就在这里，只要把0改成1，保存退出后即可。</p>
<p>现在我们重新运行<code>yum repolist</code>，会发现epel源已经被加上了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="源标识                          源名称                                                                      状态
base/7/x86_64                   CentOS-7 - Base                                                             9,590+1
elrepo-kernel                   ELRepo.org Community Enterprise Linux Kernel Repository - el7                    37
epel/x86_64                     Extra Packages for Enterprise Linux 7 - x86_64                               12,277
epel-source/x86_64              Extra Packages for Enterprise Linux 7 - x86_64 - Source                           0
extras/7/x86_64                 CentOS-7 - Extras                                                               388
nodesource/x86_64               Node.js Packages for Enterprise Linux 7 - x86_64                                 22
updates/7/x86_64                CentOS-7 - Updates                                                          1,922+7
repolist: 24,236" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>源标识                          源名称                                                                      状态
base/<span class="hljs-number">7</span>/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                   CentOS<span class="hljs-number">-7</span> - Base                                                             <span class="hljs-number">9</span>,<span class="hljs-number">590</span>+<span class="hljs-number">1</span>
elrepo-kernel                   ELRepo.org Community Enterprise Linux Kernel Repository - el<span class="hljs-number">7</span>                    <span class="hljs-number">37</span>
epel/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                     Extra Packages for Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                               <span class="hljs-number">12</span>,<span class="hljs-number">277</span>
epel-source/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>              Extra Packages for Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> - Source                           <span class="hljs-number">0</span>
extras/<span class="hljs-number">7</span>/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                 CentOS<span class="hljs-number">-7</span> - Extras                                                               <span class="hljs-number">388</span>
nodesource/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>               Node.js Packages for Enterprise Linux <span class="hljs-number">7</span> - <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                                 <span class="hljs-number">22</span>
updates/<span class="hljs-number">7</span>/<span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span>                CentOS<span class="hljs-number">-7</span> - Updates                                                          <span class="hljs-number">1</span>,<span class="hljs-number">922</span>+<span class="hljs-number">7</span>
repolist: <span class="hljs-number">24</span>,<span class="hljs-number">236</span></code></pre>
<p>再执行<code>yum install -y nginx</code>，发现终于能够成功安装了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx version: nginx/1.12.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">nginx <span class="hljs-built_in">version</span>: nginx/<span class="hljs-number">1.12</span><span class="hljs-number">.2</span></code></pre>
<p>接下来只要用一条指令即可开启nginx：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">nginx</span></code></pre>
<p>经过上面的一番折腾，域名的DNS解析早已生效了，此时输入域名并回车，就能看到nginx的欢迎页啦~</p>
<p><span class="img-wrap"><img data-src="/img/bV3Ilj?w=1754&amp;h=978" src="https://static.alili.tech/img/bV3Ilj?w=1754&amp;h=978" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">四、使用HTTPS</h1>
<p>看到左上角“不安全”三个字，心里是非常不爽的，于是马上进行下一步工作，上HTTPS。</p>
<p>由于是个人服务器，所以免费证书已经足够了，另外为了方便起见，所以我使用了<code>certbot</code>这个工具来帮我把服务器升级成HTTPS。</p>
<p>首先通过yum下载安装<code>certbot</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install certbot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">yum <span class="hljs-keyword">install</span> certbot</code></pre>
<p>由于certbot服务器在验证域名的时候，会通过HTTP的方式访问一个由certbot生成的静态文件，所以我们首先要在nginx里面进行配置：</p>
<p>进入<code>/etc/nginx</code>，然后编辑<code>nginx.conf</code>，在<code>server</code>里面添加下列两个location规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location ^~ /.well-known/acme-challenge/ {
   default_type &quot;text/plain&quot;;
   root     /usr/share/nginx/html;
}

location = /.well-known/acme-challenge/ {
   return 404;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">location</span> <span class="hljs-title">^~ /.well-known</span>/acme-challenge/ {
   default_type <span class="hljs-string">"text/plain"</span>;
   root     /usr/share/nginx/html;
}

<span class="hljs-keyword">location</span> <span class="hljs-title">= /.well-known</span>/acme-challenge/ {
   return <span class="hljs-number">404</span>;
}</code></pre>
<p>可以看到，上面的<code>root</code>我是指向了<code>/usr/share/nginx/htm</code>，这个目录是可以随便指定的，我这么写完全是为了偷懒。</p>
<p>nginx配置好了以后，就可以使用certbot生成证书了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# certbot certonly --webroot -w <root url> -d <hostname>

certbot certonly --webroot -w /usr/share/nginx/html/ -d xxxx.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-comment"># certbot certonly --webroot -w &lt;root url&gt; -d &lt;hostname&gt;</span>

certbot certonly --webroot -w <span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/nginx/</span>html<span class="hljs-regexp">/ -d xxxx.com</span></code></pre>
<p>如果看到下列的输出，就证明证书已经生成成功了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/xxxx.com/fullchain.pem. Your cert
   will expire on 20XX-09-23. To obtain a new or tweaked version of
   this certificate in the future, simply run certbot again. To
   non-interactively renew *all* of your certificates, run &quot;certbot
   renew&quot;
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>IMPORTANT NOTES:
 - Congratulations! Your certificate <span class="hljs-literal">and</span> chain have been saved at
   /etc/letsencrypt/live/xxxx.com/fullchain.pem. Your cert
   will expire <span class="hljs-keyword">on</span> <span class="hljs-number">20</span>XX<span class="hljs-number">-09</span><span class="hljs-number">-23.</span> <span class="hljs-keyword">To</span> obtain a <span class="hljs-literal">new</span> <span class="hljs-literal">or</span> tweaked version of
   this certificate <span class="hljs-keyword">in</span> the future, simply run certbot again. <span class="hljs-keyword">To</span>
   non<span class="hljs-params">-interactively</span> renew *<span class="hljs-literal">all</span>* of your certificates, run <span class="hljs-string">"certbot
   renew"</span>
 - <span class="hljs-keyword">If</span> you like Certbot, please consider supporting our work <span class="hljs-keyword">by</span>:

   Donating <span class="hljs-keyword">to</span> ISRG / <span class="hljs-keyword">Let</span><span class="hljs-string">'s Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le</span></code></pre>
<p>证书已经准备好了，我们还需要nginx的支持。重新打开<code>/etc/nginx/nginx.conf</code>，然后把注释掉的https server给注释回来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen       443 ssl http2 default_server;
    listen       [::]:443 ssl http2 default_server;
    server_name  xxxx.com;
    root         /home/www;

    ssl_certificate &quot;/etc/letsencrypt/live/xxxx.com/fullchain.pem&quot;;
    ssl_certificate_key &quot;/etc/letsencrypt/live/xxxx.com/privkey.pem&quot;;
    ssl_trusted_certificate /etc/letsencrypt/live/xxxx.com/chain.pem;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span>       <span class="hljs-number">443</span> ssl http2 default_server;
    <span class="hljs-attribute">listen</span>       [::]:<span class="hljs-number">443</span> ssl http2 default_server;
    <span class="hljs-attribute">server_name</span>  xxxx.com;
    <span class="hljs-attribute">root</span>         /home/www;

    <span class="hljs-attribute">ssl_certificate</span> <span class="hljs-string">"/etc/letsencrypt/live/xxxx.com/fullchain.pem"</span>;
    <span class="hljs-attribute">ssl_certificate_key</span> <span class="hljs-string">"/etc/letsencrypt/live/xxxx.com/privkey.pem"</span>;
    <span class="hljs-attribute">ssl_trusted_certificate</span> /etc/letsencrypt/live/xxxx.com/chain.pem;

    <span class="hljs-comment"># Load configuration files for the default server block.</span>
    <span class="hljs-attribute">include</span> /etc/nginx/default.d/<span class="hljs-regexp">*.conf</span>;

    <span class="hljs-attribute">location</span> / {
    }

    <span class="hljs-attribute">error_page</span> <span class="hljs-number">404</span> /<span class="hljs-number">404</span>.html;
        <span class="hljs-attribute">location</span> = /40x.html {
    }

    <span class="hljs-attribute">error_page</span> <span class="hljs-number">500</span> <span class="hljs-number">502</span> <span class="hljs-number">503</span> <span class="hljs-number">504</span> /50x.html;
        <span class="hljs-attribute">location</span> = /50x.html {
    }
}</code></pre>
<blockquote>ps: 上面的root我给配置了<code>/home/www</code>目录，意味着以后只要是放在该目录下的静态资源文件夹，我都可以通过<code>https://xxx.com/文件夹名</code>直接进行访问，更多关于nginx的配置请参考官方文档。</blockquote>
<p>最后重启一下nginx，就可以检验我们的页面是否已经打上小绿标了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx -s reload" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">nginx <span class="hljs-_">-s</span> reload</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3IHo?w=432&amp;h=60" src="https://static.alili.tech/img/bV3IHo?w=432&amp;h=60" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>由于certbot所使用的letsencrypt证书只有90天的有效期，所以我们需要对它定期自动更新。</p>
<p>首先模拟更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo certbot renew --dry-run

# 看到如下输出证明模拟更新成功
-------------------------------------------------------------------------------
Processing /etc/letsencrypt/renewal/your.domain.com.conf
-------------------------------------------------------------------------------
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates below have not been saved.)

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/xxxx.com/fullchain.pem (success)
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates above have not been saved.)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>sudo certbot renew --dry-run

<span class="hljs-section"># 看到如下输出证明模拟更新成功
-------------------------------------------------------------------------------</span>
<span class="hljs-section">Processing /etc/letsencrypt/renewal/your.domain.com.conf
-------------------------------------------------------------------------------</span>
<span class="hljs-bullet">** </span>DRY RUN: simulating <span class="hljs-emphasis">'certbot renew'</span> close to cert expiry
<span class="hljs-bullet">**          </span>(The test certificates below have not been saved.)

Congratulations, all renewals succeeded. The following certs have been renewed:
<span class="hljs-code">  /etc/letsencrypt/live/xxxx.com/fullchain.pem (success)</span>
<span class="hljs-bullet">** </span>DRY RUN: simulating <span class="hljs-emphasis">'certbot renew'</span> close to cert expiry
<span class="hljs-bullet">**          </span>(The test certificates above have not been saved.)</code></pre>
<p>然后就可以使用<code>crontab -e</code>命令来实现自动化了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo crontab -e

#添加配置，每周一半夜3点00分执行renew：

00 3 * * 1 /usr/bin/certbot renew  >> /var/log/le-renew.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>sudo crontab -e

#添加配置，每周一半夜<span class="hljs-number">3</span>点<span class="hljs-number">00</span>分执行renew：

<span class="hljs-number">00</span> <span class="hljs-number">3</span> * * <span class="hljs-number">1</span> /usr/bin/certbot renew  &gt;&gt; /var/log/le-renew.log</code></pre>
<h1 id="articleHeader5">五、部署静态页面与Node.js项目</h1>
<p>服务器已经准备了，HTTPS也弄好了，那么接下来就可以部署我们的静态页面与nodejs项目了。</p>
<p>从前面的nginx配置可以知道，nginx对于域名为<code>xxxx.com</code>的请求，都会请求到<code>/home/www</code>目录下，所以我们通过git或者scp等方式把静态资源目放置在<code>/home/www</code>目录下即可。比方说我的<a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank">markcook</a>项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/www

git clone https://github.com/jrainlau/markcook -b gh-pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>cd <span class="hljs-regexp">/home/</span>www

git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/jrainlau/m</span>arkcook -b gh-pages</code></pre>
<p>此时访问 <a href="https://jrainlau.com/markcook" rel="nofollow noreferrer" target="_blank">https://jrainlau.com/markcook</a> 即可访问到项目的页面。</p>
<p>对于nodejs项目，我们使用<code>pm2</code>来守护进程，让项目在后台运行。首先需要安装nodejs，然后再安装pm2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -sL https://rpm.nodesource.com/setup_9.x | bash -
yum install nodejs

npm i pm2 -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>curl -sL https:<span class="hljs-comment">//rpm.nodesource.com/setup_9.x | bash -</span>
yum install nodejs

npm <span class="hljs-selector-tag">i</span> pm2 -g</code></pre>
<p>接下来依然把nodejs项目通过git放置在<code>/home/www</code>目录下，进入目录，执行下列命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i

pm2 start index.js --name my-server

┌─────────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name    │ id │ mode │ pid  │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├─────────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│  my-server  │ 0  │ fork │ 2306 │ online │ 22      │ 7h     │ 0%  │ 46.2 MB   │ root │ disabled │
└─────────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm i

pm2 <span class="hljs-keyword">start</span> index.js <span class="hljs-comment">--name my-server</span>

┌─────────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App <span class="hljs-keyword">name</span>    │ <span class="hljs-keyword">id</span> │ <span class="hljs-keyword">mode</span> │ pid  │ <span class="hljs-keyword">status</span> │ restart │ uptime │ cpu │ mem       │ <span class="hljs-keyword">user</span> │ watching │
├─────────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│  my-<span class="hljs-keyword">server</span>  │ <span class="hljs-number">0</span>  │ fork │ <span class="hljs-number">2306</span> │ <span class="hljs-keyword">online</span> │ <span class="hljs-number">22</span>      │ <span class="hljs-number">7</span>h     │ <span class="hljs-number">0</span>%  │ <span class="hljs-number">46.2</span> MB   │ root │ disabled │
└─────────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
 <span class="hljs-keyword">Use</span> <span class="hljs-string">`pm2 show &lt;id|name&gt;`</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">get</span> more details about an app</code></pre>
<p>最后在<code>nginx.conf</code>里面添加一条代理规则（假设node服务端口为3000）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location /my-server/ {
  proxy_pass  http://localhost:3000
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span> /my-server/ {
  <span class="hljs-attribute">proxy_pass</span>  http://localhost:3000
}</code></pre>
<p>这样，就能够通过<code>https://xxxx.com/my-server/</code>访问到nodejs项目了。</p>
<h1 id="articleHeader6">六、使用travis-ci实现持续部署</h1>
<p>刚才的操作仅仅是作为初次部署，如果以后代码有改动，还需要我们登录服务器，进入到对应的项目目录，手动执行<code>git pull</code>，然后手动重启服务器（如果pm2启动了watch模式可以省略这一步），相当麻烦。能不能有一种办法，能够在我提交代码的时候就自动更新服务器的代码，并自动重启服务器呢？<code>travis-ci</code>就是来实现这个目的的。</p>
<p>travis-ci支持<strong>公开项目</strong>和<strong>私有项目</strong>，是通过<code>.org</code>和<code>.com</code>后缀来区分的。以我的一个公开项目为例，首先进入<a href="https://travis-ci.org/" rel="nofollow noreferrer" target="_blank">https://travis-ci.org/</a> 官网，登录我的github账号，然后会看到如下页面：</p>
<p><span class="img-wrap"><img data-src="/img/bV3IVL?w=1076&amp;h=999" src="https://static.alili.tech/img/bV3IVL?w=1076&amp;h=999" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>找到需要集成travis-ci的项目，点击它前面的开关即可。</p>
<p><span class="img-wrap"><img data-src="/img/bV3IWz?w=285&amp;h=45" src="https://static.alili.tech/img/bV3IWz?w=285&amp;h=45" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时在travis-ci上的操作暂时告一段落，但是页面先别关掉，先放在一边。</p>
<p>接下来，我们回到本地开发机器，通过<code>git clone</code>命令把这个项目克隆到本地，然后在项目根目录下添加一个<code>.travis.yml</code>文件。这个文件是travis-ci持续集成的关键，它定义了你所有持续集成的操作。为了简单起见，我们仅仅使用它进行<strong>自动化部署</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
node_js:
- 9.3.0
after_success:
- ssh root@xxx.xxx.xxx.xxx -p yyy 'cd /home/www/taxi-server &amp;&amp; git pull &amp;&amp; pm2 restart taxi-server'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">language:</span> <span class="hljs-string">node_js</span>
<span class="hljs-attr">node_js:</span>
<span class="hljs-bullet">-</span> <span class="hljs-number">9.3</span><span class="hljs-number">.0</span>
<span class="hljs-attr">after_success:</span>
<span class="hljs-bullet">-</span> <span class="hljs-string">ssh</span> <span class="hljs-string">root@xxx.xxx.xxx.xxx</span> <span class="hljs-bullet">-p</span> <span class="hljs-string">yyy</span> <span class="hljs-string">'cd /home/www/taxi-server &amp;&amp; git pull &amp;&amp; pm2 restart taxi-server'</span>
</code></pre>
<p>可以看到，我给她定义了运行环境为<code>node.js 9.3.0</code>，在构建成功（其实啥也没构建）之后，自动登录服务器，拉取最新代码，重启pm2。</p>
<p>大家都知道，登录服务器是要输入密码的，即使是travis-ci帮我们自动化进行，这一步也免不了。但是由于输入密码的步骤是交互的，自动化处理不了，所以我们也要为travis-ci搞一套“免密登录”。经过上文ssh-key的配置，其实我们已经具备了这一条件，之不过还需要多几步的操作。</p>
<ol>
<li>
<p>在<strong>本地</strong>通过<code>gem</code>安装<code>travis</code>命令行工具（macOS默认支持ruby）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gem install travis" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">gem <span class="hljs-keyword">install</span> travis</code></pre>
</li>
<li>
<p>使用travis登录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="travis login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">travis login</span></code></pre>
<p>然后输入github的账号密码即可。</p>
</li>
<li>
<p>加密本地ssh-key并自动写入<code>.travis.yml</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# --add参数表示自动添加脚本到.travis.yml文件中
travis encrypt-file ~/.ssh/id_rsa --add" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-comment"># --add参数表示自动添加脚本到.travis.yml文件中</span>
travis <span class="hljs-built_in">encrypt</span>-<span class="hljs-built_in">file</span> ~/.ssh/id_rsa <span class="hljs-comment">--add</span></code></pre>
</li>
</ol>
<p>这时会看到<code>.travis.yml</code>多了一段<code>before_install</code>的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before_install:
- openssl aes-256-cbc -K $encrypted_e65149523857_key -iv $encrypted_e65149523857_iv
  -in id_rsa.enc -out ~\/.ssh/id_rsa -d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>before_install:
-<span class="ruby"> openssl aes-<span class="hljs-number">256</span>-cbc -K $encrypted_e65149523857_key -iv $encrypted_e65149523857_iv
</span>  -<span class="ruby"><span class="hljs-keyword">in</span> id_rsa.enc -out ~\/.ssh/id_rsa -d</span></code></pre>
<p>然后把最后一行的“<code>\</code>”转义符删掉，并换行顶格添加如下两条内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- chmod 600 ~/.ssh/id_rsa
- echo -e &quot;Host xxx.xxx.xxx.xxx\n\tStrictHostKeyChecking no\n&quot; >> ~/.ssh/config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> chmod <span class="hljs-number">600</span> ~<span class="hljs-regexp">/.ssh/id</span>_rsa
</span>-<span class="ruby"> echo -e <span class="hljs-string">"Host xxx.xxx.xxx.xxx\n\tStrictHostKeyChecking no\n"</span> <span class="hljs-meta">&gt;&gt; </span>~<span class="hljs-regexp">/.ssh/config</span></span></code></pre>
<p>切记把<code>xxx.xxx.xxx.xxx</code>换成你服务器的IP。</p>
<p>最后把添加<code>.travis.yml</code>的项目push到github即可。</p>
<p>重新回到travis-ci.org的页面，进入项目，就能够看到持续集成的效果了：</p>
<p><span class="img-wrap"><img data-src="/img/bV3I6c?w=1494&amp;h=1309" src="https://static.alili.tech/img/bV3I6c?w=1494&amp;h=1309" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3I6m?w=1799&amp;h=463" src="https://static.alili.tech/img/bV3I6m?w=1799&amp;h=463" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这时候回到服务器，运行<code>pm2 logs</code>，会看到服务已经被自动重启的日志记录，至此持续集成及部署功能完美成功！</p>
<h1 id="articleHeader7">尾声</h1>
<p>这一番折腾下来，总算把服务器、建站、持续部署等知识囫囵摸了一遍，对这些技术栈也算有了一些粗浅的见解。接下来还有更多好玩的东西需要进行探索，毕竟这只是一个开始，大家一起共勉吧~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不仅仅是前端er——折腾服务器武装自己

## 原文链接
[https://segmentfault.com/a/1190000013242438](https://segmentfault.com/a/1190000013242438)

