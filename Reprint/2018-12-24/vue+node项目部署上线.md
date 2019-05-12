---
title: 'vue+node项目部署上线' 
date: 2018-12-24 2:30:07
hidden: true
slug: lqil8f9t43e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在线地址: <a>cl8023.com</a> <a href="https://github.com/Moon-Future/Vue-Node-Blog" rel="nofollow noreferrer" target="_blank">github</a>
</blockquote>
<h1 id="articleHeader0">云服务器</h1>
<h2 id="articleHeader1">阿里云 or 腾讯云</h2>
<ul>
<li>阿里云服务器品牌：ECS（Elastic Compute Service）</li>
<li>腾讯云服务器品牌：VCM（Cloud Virtual Machine）</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012186568?w=1532&amp;h=902" src="https://static.alili.tech/img/remote/1460000012186568?w=1532&amp;h=902" alt="腾讯云or阿里云" title="腾讯云or阿里云" style="cursor: pointer; display: inline;"></span></p>
<p>两者都可以，具体可以根据自己的需求，都说阿里云稳定，腾讯云便宜，我自己买时发现两者入门级的价格都差不多，就买了阿里云的，以下即以阿里云的服务器操作。（腾讯云服务器操作应该也类似）</p>
<h2 id="articleHeader2">购买阿里云服务器ECS</h2>
<p>入门级最低配即可，一年300多，每月几十块钱，也可以月付，那样就贵点。<br><span class="img-wrap"><img data-src="/img/remote/1460000012186569?w=1167&amp;h=599" src="https://static.alili.tech/img/remote/1460000012186569?w=1167&amp;h=599" alt="" title="" style="cursor: pointer; display: inline;"></span><br>中间有些选项默认就可，镜像选择 公共镜像-CentOS-7.4 64位（最新的）<br>图中密码用来之后远程登陆服务器使用。</p>
<h2 id="articleHeader3">登陆服务器</h2>
<h3 id="articleHeader4">阿里网页登陆</h3>
<p>在 管理控制台-实例 中可以看到刚刚购买的服务器<br><span class="img-wrap"><img data-src="/img/remote/1460000012186570?w=1745&amp;h=859" src="https://static.alili.tech/img/remote/1460000012186570?w=1745&amp;h=859" alt="" title="" style="cursor: pointer;"></span><br>点击远程连接，出现登陆界面，第一次进入会弹出一个密码，记住这个密码（只会出现一次），之后登陆输入这个密码即可进入阿里云服务器ECS系统。</p>
<h3 id="articleHeader5">客户端工具远程登陆</h3>
<ol><li>Mac</li></ol>
<p>终端中输入：<code>SSH root@服务器IP地址(公)</code> (SSH root@192.18.222.12)<br>回车<br>输入购买服务器时设置的实例密码即可</p>
<ol><li>Windows</li></ol>
<ul>
<li>下载工具 Xshell</li>
<li>打开Xshell - 文件 - 新建，终端选项选择编码：Unicode(UTF-8)</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012186571?w=2549&amp;h=957" src="https://static.alili.tech/img/remote/1460000012186571?w=2549&amp;h=957" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>连接成功</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012186572?w=997&amp;h=972" src="https://static.alili.tech/img/remote/1460000012186572?w=997&amp;h=972" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">配置环境</h1>
<p>Linux 常用命令：</p>
<ol>
<li>wget：一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理。"wget" 这个名称来源于 “World Wide Web” 与 “get” 的结合。</li>
<li>
<p>tar：压缩解压命令</p>
<ul>
<li>-c：建立压缩档案</li>
<li>-x：解压</li>
<li>-t：查看内容</li>
<li>-r：向压缩归档文件末尾追加文件</li>
<li>-u：更新原压缩包中的文件</li>
</ul>
</li>
</ol>
<p>这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- -z：有gzip属性的
- -j：有bz2属性的
- -Z：有compress属性的
- -v：显示所有过程
- -O：将文件解开到标准输出
下面的参数 -f 是必须的
- -f：使用档案名称，最后一个参数，后面只能接档案名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> -z：有gzip属性的
</span>-<span class="ruby"> -j：有bz2属性的
</span>-<span class="ruby"> -Z：有compress属性的
</span>-<span class="ruby"> -v：显示所有过程
</span>-<span class="ruby"> -O：将文件解开到标准输出
</span>下面的参数 -f 是必须的
-<span class="ruby"> -f：使用档案名称，最后一个参数，后面只能接档案名</span></code></pre>
<ol>
<li>ln：为某一个文件或目录在另一个位置建立一个同步的链接 常用：<code>ln -s 源文件 目标文件</code>
</li>
<li>makdir：创建目录</li>
<li>mv：为文件或目录改名、或将文件或目录移入其它位置</li>
<li>
<p>rm：删除文件</p>
<ul>
<li>-f：忽略不存在的文件，从不给出提示</li>
<li>-r：将参数中列出的全部目录和子目录均递归的删除</li>
</ul>
</li>
<li>yum：提供了查找、安装、删除某一个、一组甚至全部软件包的命令</li>
<li>ls：显示当前目录下文件， ls -f 隐藏文件也显示</li>
<li>netstat -tpln：查看进程端口</li>
<li>kill -9 PID号：关闭进程</li>
<li>cp：拷贝</li>
</ol>
<p>Linux 目录：<br>前面进入Linux系统后，一般会在 root(~) 目录下 <code>[root@xxxxxxxxxxx ~]# </code>, <code>cd ..</code>可以即回到根目录，<code>ls</code>查看当前目录下文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx ~]#
[root@xxxxxxxxxxx ~]# cd ..
[root@xxxxxxxxxxx /]#
[root@xxxxxxxxxxx /]# ls
bin  boot  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@xxxxxxxxxxx /]# cd root
[root@xxxxxxxxxxx ~]#" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>[root@xxxxxxxxxxx ~]<span class="hljs-comment">#</span>
[root@xxxxxxxxxxx ~]<span class="hljs-comment"># cd ..</span>
[root@xxxxxxxxxxx /]<span class="hljs-comment">#</span>
[root@xxxxxxxxxxx /]<span class="hljs-comment"># ls</span>
bin  boot  dev  etc  home  <span class="hljs-class"><span class="hljs-keyword">lib</span>  <span class="hljs-title">lib64</span>  <span class="hljs-title">lost</span>+<span class="hljs-title">found</span>  <span class="hljs-title">media</span>  <span class="hljs-title">mnt</span>  <span class="hljs-title">opt</span>  <span class="hljs-title">proc</span>  <span class="hljs-title">root</span>  <span class="hljs-title">run</span>  <span class="hljs-title">sbin</span>  <span class="hljs-title">srv</span>  <span class="hljs-title">sys</span>  <span class="hljs-title">tmp</span>  <span class="hljs-title">usr</span>  <span class="hljs-title">var</span></span>
[root@xxxxxxxxxxx /]<span class="hljs-comment"># cd root</span>
[root@xxxxxxxxxxx ~]<span class="hljs-comment">#</span></code></pre>
<h2 id="articleHeader7">安装NodeJs</h2>
<p><a href="https://help.aliyun.com/document_detail/50775.html" rel="nofollow noreferrer" target="_blank">阿里云帮助文档：部署Node.js项目（CentOS）</a></p>
<h2 id="articleHeader8">安装MySQL</h2>
<p><a href="http://blog.csdn.net/zhou920786312/article/details/77750604" rel="nofollow noreferrer" target="_blank">主要参考</a></p>
<h4>1. 下载安装包</h4>
<p>为了下载到最新的版本，先到官网上找到下载链接<br><a href="https://dev.mysql.com/downloads/mysql/" rel="nofollow noreferrer" target="_blank">MySQL下载地址</a><br><span class="img-wrap"><img data-src="/img/remote/1460000012186573?w=1414&amp;h=923" src="https://static.alili.tech/img/remote/1460000012186573?w=1414&amp;h=923" alt="" title="" style="cursor: pointer;"></span><br>先用浏览器或其他下载工具创建下载任务（如x86,64-bit），然后在下载中找到下载链接复制下来就可以把它删了。</p>
<ul>
<li>进入root目录：<code>cd /root</code> （也可以其他目录）</li>
<li>下载安装包：</li>
</ul>
<p><code>wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.20-linux-glibc2.12-x86_64.tar.gz</code></p>
<ul><li>下载完成后 ls 可以看到下载的安装包</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx ~]# ls
mysql-5.7.20-linux-glibc2.12-x86_64.tar.gz ......" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[root@xxxxxxxxxxx ~]</span># <span class="hljs-selector-tag">ls</span>
<span class="hljs-selector-tag">mysql-5</span><span class="hljs-selector-class">.7</span><span class="hljs-selector-class">.20-linux-glibc2</span><span class="hljs-selector-class">.12-x86_64</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span> ......</code></pre>
<h4>2. 解压文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tar -xzvf mysql-5.7.19-linux-glibc2.12-x86_64.tar.gz -C /usr/local/

[root@xxxxxxxxxxx ~]# ls
mysql-5.7.20-linux-glibc2.12-x86_64 (解压得到的目录)
mysql-5.7.20-linux-glibc2.12-x86_64.tar.gz

// 拷贝解压到目录到 /usr/local 目录下，并改名为 mysql
[root@xxxxxxxxxxx ~]# cp mysql-5.7.20-linux-glibc2.12-x86_64 /usr/local/mysql -r
[root@xxxxxxxxxxx ~]# cd /usr/local/mysql
[root@xxxxxxxxxxx mysql]# ls
bin  COPYING  docs  include  lib  man  README  share  support-files" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>tar -xzvf mysql-<span class="hljs-number">5.7</span>.<span class="hljs-number">19</span>-linux-glibc2.<span class="hljs-number">12</span>-x86_64.tar.gz -C /usr/local/

[root@xxxxxxxxxxx ~]<span class="hljs-comment"># ls</span>
mysql-<span class="hljs-number">5.7</span>.<span class="hljs-number">20</span>-linux-glibc2.<span class="hljs-number">12</span>-x86_64 (解压得到的目录)
mysql-<span class="hljs-number">5.7</span>.<span class="hljs-number">20</span>-linux-glibc2.<span class="hljs-number">12</span>-x86_64.tar.gz

/<span class="hljs-regexp">/ 拷贝解压到目录到 /usr</span><span class="hljs-regexp">/local 目录下，并改名为 mysql
[root@xxxxxxxxxxx ~]# cp mysql-5.7.20-linux-glibc2.12-x86_64 /usr</span><span class="hljs-regexp">/local/mysql</span> -r
[root@xxxxxxxxxxx ~]<span class="hljs-comment"># cd /usr/local/mysql</span>
[root@xxxxxxxxxxx mysql]<span class="hljs-comment"># ls</span>
bin  COPYING  docs  <span class="hljs-keyword">include</span>  <span class="hljs-class"><span class="hljs-keyword">lib</span>  <span class="hljs-title">man</span>  <span class="hljs-title">README</span>  <span class="hljs-title">share</span>  <span class="hljs-title">support</span>-<span class="hljs-title">files</span></span></code></pre>
<h4>3. 添加系统mysql组和mysql用户</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx ~]# groupadd mysql #建立一个mysql的组
[root@xxxxxxxxxxx ~]# useradd -r -g mysql mysql #建立mysql用户，并且把用户放到mysql组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> ~]<span class="hljs-meta"># groupadd mysql #建立一个mysql的组</span>
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> ~]<span class="hljs-meta"># useradd -r -g mysql mysql #建立mysql用户，并且把用户放到mysql组</span></code></pre>
<h4>4. 在 mysql 下添加 data 目录</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# mkdir data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@xxxxxxxxxxx</span> mysql]<span class="hljs-meta"># mkdir data</span></code></pre>
<h4>5. 更改mysql目录下所有的目录及文件夹所属组合用户</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# cd /usr/local/
[root@xxxxxxxxxxx local]# chown -R mysql mysql/
[root@xxxxxxxxxxx local]# chgrp -R mysql mysql/
[root@xxxxxxxxxxx local]# cd mysql/
[root@xxxxxxxxxxx mysql]# ls -l
total 56
drwxr-xr-x  2 mysql mysql  4096 Nov  9 16:00 bin
-rw-r--r--  1 mysql mysql 17987 Nov  9 16:00 COPYING
drwxr-xr-x  6 mysql mysql  4096 Nov  9 18:41 data
drwxr-xr-x  2 mysql mysql  4096 Nov  9 16:00 docs
drwxr-xr-x  3 mysql mysql  4096 Nov  9 16:01 include
drwxr-xr-x  5 mysql mysql  4096 Nov  9 16:01 lib
drwxr-xr-x  4 mysql mysql  4096 Nov  9 16:00 man
-rw-r--r--  1 mysql mysql  2478 Nov  9 16:00 README
drwxr-xr-x 28 mysql mysql  4096 Nov  9 16:00 share
drwxr-xr-x  2 mysql mysql  4096 Nov  9 18:06 support-files" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>[root@xxxxxxxxxxx mysql]<span class="hljs-comment"># cd /usr/local/</span>
[root@xxxxxxxxxxx local]<span class="hljs-comment"># chown -R mysql mysql/</span>
[root@xxxxxxxxxxx local]<span class="hljs-comment"># chgrp -R mysql mysql/</span>
[root@xxxxxxxxxxx local]<span class="hljs-comment"># cd mysql/</span>
[root@xxxxxxxxxxx mysql]<span class="hljs-comment"># ls -l</span>
total 56
drwxr-xr-x <span class="hljs-number"> 2 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:00 bin
-rw-r--r-- <span class="hljs-number"> 1 </span>mysql mysql<span class="hljs-number"> 17987 </span>Nov <span class="hljs-number"> 9 </span>16:00 COPYING
drwxr-xr-x <span class="hljs-number"> 6 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>18:41 data
drwxr-xr-x <span class="hljs-number"> 2 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:00 docs
drwxr-xr-x <span class="hljs-number"> 3 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:01 include
drwxr-xr-x <span class="hljs-number"> 5 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:01 lib
drwxr-xr-x <span class="hljs-number"> 4 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:00 man
-rw-r--r-- <span class="hljs-number"> 1 </span>mysql mysql <span class="hljs-number"> 2478 </span>Nov <span class="hljs-number"> 9 </span>16:00 README
drwxr-xr-x<span class="hljs-number"> 28 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>16:00 share
drwxr-xr-x <span class="hljs-number"> 2 </span>mysql mysql <span class="hljs-number"> 4096 </span>Nov <span class="hljs-number"> 9 </span>18:06 support-files</code></pre>
<h4>6. 安装和初始化数据库</h4>
<p>很多老的教程中都是运行 <code>./scripts/mysql_install_db --user=mysql</code> 进行安装，但在新版本的mysql中已经没了 scripts 目录，<br>mysql_install_db 放在了 bin 目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# cd bin
[root@xxxxxxxxxxx bin]# ./mysqld --initialize --user=mysql --basedir=/usr/local/mysql/--datadir=/usr/local/mysql/data/


2017-11-09T09:09:52.826209Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2017-11-09T09:09:54.885578Z 0 [ERROR] Can't find error-message file '/usr/local/mysql/--datadir=/usr/local/mysql/data/share/errmsg.sys'. Check error-message file location and 'lc-messages-dir' con
figuration directive.2017-08-31T08:50:24.709286Z 0 [Warning] InnoDB: New log files created, LSN=45790
2017-11-09T09:09:55.105938Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
2017-11-09T09:09:55.218562Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: c0844cc4-c52d-11e7-b74f-00163e0ae84e.
2017-11-09T09:09:55.221300Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.
2017-11-09T09:09:55.221784Z 1 [Note] A temporary password is generated for root@localhost: uf)qP3+C?jpJ" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>[root@xxxxxxxxxxx mysql]# cd bin
[root@xxxxxxxxxxx bin]# ./mysqld <span class="hljs-comment">--initialize --user=mysql --basedir=/usr/local/mysql/--datadir=/usr/local/mysql/data/</span>


<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">52.826209</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">Warning</span>] TIMESTAMP <span class="hljs-keyword">with</span> implicit <span class="hljs-keyword">DEFAULT</span> value <span class="hljs-keyword">is</span> deprecated. Please <span class="hljs-keyword">use</span> <span class="hljs-comment">--explicit_defaults_for_timestamp server option (see documentation for more details).</span>
<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">54.885578</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">ERROR</span>] Can<span class="hljs-symbol">'t</span> find <span class="hljs-literal">error</span>-message <span class="hljs-keyword">file</span> '/usr/local/mysql/<span class="hljs-comment">--datadir=/usr/local/mysql/data/share/errmsg.sys'. Check error-message file location and 'lc-messages-dir' con</span>
figuration directive.<span class="hljs-number">2017</span>-<span class="hljs-number">08</span>-<span class="hljs-number">31</span>T08:<span class="hljs-number">50</span>:<span class="hljs-number">24.709286</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">Warning</span>] InnoDB: <span class="hljs-keyword">New</span> log files created, LSN=<span class="hljs-number">45790</span>
<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">55.105938</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">Warning</span>] InnoDB: Creating foreign key constraint system tables.
<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">55.218562</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">Warning</span>] No existing UUID has been found, so we <span class="hljs-keyword">assume</span> that this <span class="hljs-keyword">is</span> the first <span class="hljs-built_in">time</span> that this server has been started. Generating a <span class="hljs-keyword">new</span> UUID: c0844cc4-c52d-<span class="hljs-number">11e7</span>-b74f-<span class="hljs-number">00163e0</span>ae84e.
<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">55.221300</span>Z <span class="hljs-number">0</span> [<span class="hljs-literal">Warning</span>] Gtid table <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> ready <span class="hljs-keyword">to</span> be used. Table <span class="hljs-symbol">'mysql</span>.gtid_executed' cannot be opened.
<span class="hljs-number">2017</span>-<span class="hljs-number">11</span>-<span class="hljs-number">09</span>T09:<span class="hljs-number">09</span>:<span class="hljs-number">55.221784</span>Z <span class="hljs-number">1</span> [<span class="hljs-literal">Note</span>] A temporary password <span class="hljs-keyword">is</span> generated <span class="hljs-keyword">for</span> root@localhost: uf)qP3+C?jpJ</code></pre>
<p>解决：（无视警告）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# ./mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/ --lc_messages_dir=/usr/local/mysql/share --lc_messages=en_US" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">[root@xxxxxxxxxxx bin]# .<span class="hljs-regexp">/mysqld --initialize --user=mysql --basedir=/u</span>sr<span class="hljs-regexp">/local/my</span>sql<span class="hljs-regexp">/ --datadir=/u</span>sr<span class="hljs-regexp">/local/my</span>sql<span class="hljs-regexp">/data/</span> --lc_messages_dir=<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/mysql/</span>share --lc_messages=en_US</code></pre>
<h4>7. 配置my.cnf</h4>
<p>进入 /usr/local/mysql/support-files/ 目录下，查看是否存在my-default.cnf 文件，如果存在直接 copy 到 /etc/my.cnf 文件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# cp -a ./support-files/my-default.cnf /etc/my.cnf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">[root@xxxxxxxxxxx mysql]# <span class="hljs-keyword">cp</span> -<span class="hljs-keyword">a</span> ./support-<span class="hljs-keyword">files</span>/my-default.<span class="hljs-keyword">cnf</span> /etc/my.<span class="hljs-keyword">cnf</span></code></pre>
<p>如果不存在 my-default.cnf 文件, 则在 /etc/ 目录下创建 my.cnf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# cd /etc
[root@xxxxxxxxxxx etc]# vim my.cnf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> bin]<span class="hljs-meta"># cd /etc</span>
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> etc]<span class="hljs-meta"># vim my.cnf</span></code></pre>
<p>写入内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#[mysql]
#basedir=/usr/local/mysql/
#datadir=/usr/local/mysql/data/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta">#[mysql]</span>
<span class="hljs-meta">#basedir=/usr/local/mysql/</span>
<span class="hljs-meta">#datadir=/usr/local/mysql/data/</span></code></pre>
<h4>8. 启动服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# cd bin/
[root@xxxxxxxxxxx bin]# ./mysqld_safe --user=mysql &amp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> mysql]<span class="hljs-meta"># cd bin/</span>
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> bin]<span class="hljs-meta"># ./mysqld_safe --user=mysql &amp;</span></code></pre>
<h4>9. 将mysqld服务加入开机自启动项</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# cd ../support-files
[root@xxxxxxxxxxx support-files]# cp mysql.server /etc/init.d/mysql
[root@xxxxxxxxxxx support-files]# chmod +x /etc/init.d/mysql
-- 把mysql注册为开机启动的服务
[root@xxxxxxxxxxx support-files]# chkconfig --add mysql" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> bin]<span class="hljs-meta"># cd ../support-files</span>
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> support-files]<span class="hljs-meta"># cp mysql.server /etc/init.d/mysql</span>
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> support-files]<span class="hljs-meta"># chmod +x /etc/init.d/mysql</span>
-- 把mysql注册为开机启动的服务
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> support-files]<span class="hljs-meta"># chkconfig --add mysql</span></code></pre>
<h4>10. 启动服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# service mysql start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@xxxxxxxxxxx</span> bin]<span class="hljs-meta"># service mysql start</span></code></pre>
<p>若报错 ERROR! The server quit without updating PID file</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx mysql]# rm  /etc/my.cnf
rm: remove regular file '/etc/my.cnf'? y
[root@xxxxxxxxxxx mysql]# /etc/init.d/mysql start
Starting MySQL.Logging to '/usr/local/mysql/data/dbserver.err'.
 SUCCESS!
[root@xxxxxxxxxxx mysql]# service mysql start
Starting MySQL SUCCESS!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> mysql]<span class="hljs-meta"># rm  /etc/my.cnf</span>
rm: remove regular file <span class="hljs-string">'/etc/my.cnf'</span>? y
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> mysql]<span class="hljs-meta"># /etc/init.d/mysql start</span>
Starting MySQL.Logging <span class="hljs-keyword">to</span> <span class="hljs-string">'/usr/local/mysql/data/dbserver.err'</span>.
 SUCCESS!
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> mysql]<span class="hljs-meta"># service mysql start</span>
Starting MySQL SUCCESS!</code></pre>
<h4>11. 登录mysql</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# ./mysql -u root -p
密码是第6步产生的密码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> bin]<span class="hljs-meta"># ./mysql -u root -p</span>
密码是第<span class="hljs-number">6</span>步产生的密码</code></pre>
<p>如果出现错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">ERROR </span>1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)</code></pre>
<p>重改密码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx bin]# /etc/init.d/mysql stop
[root@xxxxxxxxxxx bin]# mysqld_safe --user=mysql --skip-grant-tables --skip-networking &amp;
[root@xxxxxxxxxxx bin]# mysql -u root mysql
mysql> UPDATE user SET Password=PASSWORD('newpassword') where USER='root';

// 上面语句若出错，换为
update mysql.user set authentication_string=password('newpassword') where user='root'

mysql> FLUSH PRIVILEGES;
mysql> quit

[root@xxxxxxxxxxx bin]# /etc/init.d/mysqld restart
[root@xxxxxxxxxxx bin]# mysql -uroot -p
Enter password:

mysql>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>[root<span class="hljs-variable">@xxxxxxxxxxx</span> bin]<span class="hljs-comment"># /etc/init.d/mysql stop</span>
[root<span class="hljs-variable">@xxxxxxxxxxx</span> bin]<span class="hljs-comment"># mysqld_safe --user=mysql --skip-grant-tables --skip-networking &amp;</span>
[root<span class="hljs-variable">@xxxxxxxxxxx</span> bin]<span class="hljs-comment"># mysql -u root mysql</span>
mysql&gt; UPDATE user SET Password=PASSWORD(<span class="hljs-string">'newpassword'</span>) where USER=<span class="hljs-string">'root'</span>;

<span class="hljs-regexp">//</span> 上面语句若出错，换为
update mysql.user set authentication_string=password(<span class="hljs-string">'newpassword'</span>) where user=<span class="hljs-string">'root'</span>

mysql&gt; FLUSH PRIVILEGES;
mysql&gt; quit

[root<span class="hljs-variable">@xxxxxxxxxxx</span> bin]<span class="hljs-comment"># /etc/init.d/mysqld restart</span>
[root<span class="hljs-variable">@xxxxxxxxxxx</span> bin]<span class="hljs-comment"># mysql -uroot -p</span>
Enter <span class="hljs-symbol">password:</span>

mysql&gt;</code></pre>
<h4>12. 设置远程登录权限</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mysql>  grant all privileges on *.* to'root' @'%' identified by 'root';
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.06 sec)

mysql> quit
Bye" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>mysql&gt;  grant <span class="hljs-literal">all</span> privileges <span class="hljs-keyword">on</span> *.* <span class="hljs-keyword">to</span><span class="hljs-string">'root'</span> @<span class="hljs-string">'%'</span> identified <span class="hljs-keyword">by</span> <span class="hljs-string">'root'</span>;
Query OK, <span class="hljs-number">0</span> <span class="hljs-keyword">rows</span> affected, <span class="hljs-number">1</span> warning (<span class="hljs-number">0.00</span> sec)

mysql&gt; flush privileges;
Query OK, <span class="hljs-number">0</span> <span class="hljs-keyword">rows</span> affected (<span class="hljs-number">0.06</span> sec)

mysql&gt; quit
Bye</code></pre>
<h4>13. 进程关闭</h4>
<p>若以上步骤中出现其他错误，可以看看 mysql 是否关闭了，先关闭端口，然后在试试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@xxxxxxxxxxx ~]# netstat -tpln
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1105/sshd
tcp6       0      0 :::3306                 :::*                    LISTEN      25599/mysqld
[root@xxxxxxxxxxx ~]# kill -9 25599" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@xxxxxxxxxxx</span> ~]<span class="hljs-meta"># netstat -tpln</span>
Active Internet connections (only servers)
Proto Recv-Q <span class="hljs-built_in">Send</span>-Q <span class="hljs-keyword">Local</span> Address           Foreign Address         State       PID/Program name
tcp        <span class="hljs-number">0</span>      <span class="hljs-number">0</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">22</span>              <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:*               LISTEN      <span class="hljs-number">1105</span>/sshd
tcp6       <span class="hljs-number">0</span>      <span class="hljs-number">0</span> :::<span class="hljs-number">3306</span>                 :::*                    LISTEN      <span class="hljs-number">25599</span>/mysqld
[root<span class="hljs-symbol">@xxxxxxxxxxx</span> ~]<span class="hljs-meta"># kill -9 25599</span></code></pre>
<h4>14. 本地连接数据库</h4>
<p>我本地使用的是 Navicat for MySQL<br><span class="img-wrap"><img data-src="/img/remote/1460000012186574?w=1566&amp;h=1077" src="https://static.alili.tech/img/remote/1460000012186574?w=1566&amp;h=1077" alt="远程连接数据库" title="远程连接数据库" style="cursor: pointer;"></span><br>远程连接数据库后，创建数据表（可以导出本地数据表，然后Navicat中导入到服务器MySQL中）</p>
<h1 id="articleHeader9">上传文件</h1>
<h2 id="articleHeader10">打包文件</h2>
<p>项目根目录下运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>等待命令运行结束后，会发现目录下多了 dist 文件夹，这个文件夹就是我们等下要放到服务器中的。</p>
<h2 id="articleHeader11">文件传输</h2>
<ol>
<li>下载文件传输工具 Xftp</li>
<li>打开 Xftp 新建连接，类似Xshell，选项中勾选 “使用UTF-8编码(E)”</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012235753?w=1893&amp;h=873" src="https://static.alili.tech/img/remote/1460000012235753?w=1893&amp;h=873" alt="Xftp连接" title="Xftp连接" style="cursor: pointer;"></span><br>连接成功后可以看到左侧是本地文件目录，右侧是服务器文件目录，可以很方便的来回拖放文件。</p>
<ol>
<li>创建目录文件 /root/projec/myblog (目录层级、名称随意，这里我以次为项目目录)</li>
<li>将刚刚的 dist 文件夹复制到 /root/project/myblog 目录下，前端资源就OK了</li>
<li>将 server 文件夹也复制到 /root/project/myblog 目录下</li>
</ol>
<h2 id="articleHeader12">初始化项目</h2>
<p>Xshell 连接服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 进入项目目录
[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /root/project/myblog
[root@izwz9e9bjg74ljcpzr7stvz myblog]# ls
dist server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>// 进入项目目录
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># cd /root/project/myblog</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> myblog]<span class="hljs-meta"># ls</span>
dist server</code></pre>
<p>初始化创建 package.json，这一步也可以在本地创建编辑好后上传到服务器目录即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz myblog]# npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (myblog) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /root/project/test/myblog/package.json:

{
  &quot;name&quot;: &quot;myblog&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}


Is this ok? (yes) yes

// 全部回车即可
[root@izwz9e9bjg74ljcpzr7stvz myblog]# ls
dist  package.json  server

// 打开 package.json 编辑（也可在 Xftp 中右键文件编辑）
[root@izwz9e9bjg74ljcpzr7stvz myblog]# vim package.json

    {
        &quot;name&quot;: &quot;my-blog&quot;,
        &quot;version&quot;: &quot;1.0.0&quot;,
        &quot;description&quot;: &quot;A Vue.js project&quot;,
        &quot;author&quot;: &quot;ChenLiang <236338364@qq.com>&quot;,
        &quot;private&quot;: true,
        &quot;scripts&quot;: {
            &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
            &quot;start&quot;: &quot;node build/dev-server.js&quot;,
            &quot;build&quot;: &quot;node build/build.js&quot;
        },
        &quot;dependencies&quot;: {
            &quot;body-parser&quot;: &quot;^1.17.2&quot;,
            &quot;cookie-parser&quot;: &quot;^1.4.3&quot;,
            &quot;express&quot;: &quot;^4.16.2&quot;,
            &quot;express-session&quot;: &quot;^1.15.5&quot;,
            &quot;formidable&quot;: &quot;^1.1.1&quot;,
            &quot;highlight.js&quot;: &quot;^9.12.0&quot;,
            &quot;marked&quot;: &quot;^0.3.6&quot;,
            &quot;mysql&quot;: &quot;^2.14.0&quot;,
            &quot;node-sass&quot;: &quot;^4.5.3&quot;,
            &quot;node-uuid&quot;: &quot;^1.4.8&quot;
        },
        &quot;engines&quot;: {
            &quot;node&quot;: &quot;>= 4.0.0&quot;,
            &quot;npm&quot;: &quot;>= 3.0.0&quot;
        },
        &quot;browserslist&quot;: [
            &quot;> 1%&quot;,
            &quot;last 2 versions&quot;,
            &quot;not ie <= 8&quot;
        ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>[root@izwz9e9bjg74ljcpzr7stvz myblog]# npm init
This utility will walk you through creating <span class="hljs-keyword">a</span> package.json <span class="hljs-keyword">file</span>.
It <span class="hljs-keyword">only</span> covers the most common <span class="hljs-built_in">items</span>, <span class="hljs-built_in">and</span> tries <span class="hljs-keyword">to</span> guess sensible defaults.

See `npm <span class="hljs-keyword">help</span> json` <span class="hljs-keyword">for</span> definitive documentation <span class="hljs-keyword">on</span> these fields
<span class="hljs-built_in">and</span> exactly what they <span class="hljs-keyword">do</span>.

Use `npm install <span class="hljs-symbol">&lt;pkg&gt;</span>` afterwards <span class="hljs-keyword">to</span> install <span class="hljs-keyword">a</span> package <span class="hljs-built_in">and</span>
save it <span class="hljs-keyword">as</span> <span class="hljs-keyword">a</span> dependency in the package.json <span class="hljs-keyword">file</span>.

Press ^C at any time <span class="hljs-keyword">to</span> <span class="hljs-keyword">quit</span>.
package name: (myblog) 
<span class="hljs-keyword">version</span>: (<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>) 
description: 
entry poin<span class="hljs-variable">t:</span> (<span class="hljs-built_in">index</span>.js) 
test <span class="hljs-keyword">command</span>: 
git repository: 
keyword<span class="hljs-variable">s:</span> 
author: 
license: (ISC) 
About <span class="hljs-keyword">to</span> <span class="hljs-keyword">write</span> <span class="hljs-keyword">to</span> /root/project/test/myblog/package.json:

{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"myblog"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>
}


Is this ok? (yes) yes

// 全部回车即可
[root@izwz9e9bjg74ljcpzr7stvz myblog]# <span class="hljs-keyword">ls</span>
dist  package.json  server

// 打开 package.json 编辑（也可在 Xftp 中右键文件编辑）
[root@izwz9e9bjg74ljcpzr7stvz myblog]# <span class="hljs-keyword">vim</span> package.json

    {
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"my-blog"</span>,
        <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
        <span class="hljs-string">"description"</span>: <span class="hljs-string">"A Vue.js project"</span>,
        <span class="hljs-string">"author"</span>: <span class="hljs-string">"ChenLiang &lt;236338364@qq.com&gt;"</span>,
        <span class="hljs-string">"private"</span>: true,
        <span class="hljs-string">"scripts"</span>: {
            <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
            <span class="hljs-string">"start"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
            <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
        },
        <span class="hljs-string">"dependencies"</span>: {
            <span class="hljs-string">"body-parser"</span>: <span class="hljs-string">"^1.17.2"</span>,
            <span class="hljs-string">"cookie-parser"</span>: <span class="hljs-string">"^1.4.3"</span>,
            <span class="hljs-string">"express"</span>: <span class="hljs-string">"^4.16.2"</span>,
            <span class="hljs-string">"express-session"</span>: <span class="hljs-string">"^1.15.5"</span>,
            <span class="hljs-string">"formidable"</span>: <span class="hljs-string">"^1.1.1"</span>,
            <span class="hljs-string">"highlight.js"</span>: <span class="hljs-string">"^9.12.0"</span>,
            <span class="hljs-string">"marked"</span>: <span class="hljs-string">"^0.3.6"</span>,
            <span class="hljs-string">"mysql"</span>: <span class="hljs-string">"^2.14.0"</span>,
            <span class="hljs-string">"node-sass"</span>: <span class="hljs-string">"^4.5.3"</span>,
            <span class="hljs-string">"node-uuid"</span>: <span class="hljs-string">"^1.4.8"</span>
        },
        <span class="hljs-string">"engines"</span>: {
            <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;= 4.0.0"</span>,
            <span class="hljs-string">"npm"</span>: <span class="hljs-string">"&gt;= 3.0.0"</span>
        },
        <span class="hljs-string">"browserslist"</span>: [
            <span class="hljs-string">"&gt; 1%"</span>,
            <span class="hljs-string">"last 2 versions"</span>,
            <span class="hljs-string">"not ie &lt;= 8"</span>
        ]
    }</code></pre>
<p>保存退出，运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz myblog]# npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> myblog]<span class="hljs-meta"># npm install</span></code></pre>
<p>安装"dependencies"中项目运行需要的所有依赖</p>
<h2 id="articleHeader13">修改资源路径</h2>
<p>进入文件夹 server，打开 index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz server]# vim index.js

const routerApi = require('./router');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '8023',
    // cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));

// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, '../dist')));

// 后端api路由
app.use('/api', routerApi);

// 监听端口
app.listen(80);
console.log('success listen at port:80......');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>[root@izwz9e9bjg74ljcpzr7stvz server]<span class="hljs-comment"># vim index.js</span>

<span class="hljs-keyword">const</span> routerApi = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./router'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-keyword">const</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">'cookie-parser'</span>);
<span class="hljs-keyword">const</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express-session'</span>);

app.<span class="hljs-keyword">use</span>(bodyParser.json());
app.<span class="hljs-keyword">use</span>(bodyParser.urlencoded({extended: <span class="hljs-keyword">false</span>}));
app.<span class="hljs-keyword">use</span>(cookieParser());
app.<span class="hljs-keyword">use</span>(session({
    secret: <span class="hljs-string">'8023'</span>,
    <span class="hljs-comment">// cookie: {maxAge: 60000},</span>
    resave: <span class="hljs-keyword">false</span>,
    saveUninitialized: <span class="hljs-keyword">true</span>
}));

<span class="hljs-comment">// 部署上线时读取静态文件</span>
app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(path.join(__dirname, <span class="hljs-string">'../dist'</span>)));

<span class="hljs-comment">// 后端api路由</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/api'</span>, routerApi);

<span class="hljs-comment">// 监听端口</span>
app.listen(<span class="hljs-number">80</span>);
console.log(<span class="hljs-string">'success listen at port:80......'</span>);
</code></pre>
<p>设置静态资源路径，并修改监听端口为80（HTTP端口），api.js 中文件路径相关的也要更改为 ../dist/static.....，嫌麻烦的也可以直接将 server 文件夹移到 dist 下就不用这么麻烦改了。</p>
<h2 id="articleHeader14">开放 80 端口</h2>
<p>登陆阿里云，进入控制管理台 -&gt; 云服务器 ECS -&gt; 安全组 -&gt; 配置规则 -&gt; 快速创建规则<br><span class="img-wrap"><img data-src="/img/remote/1460000012235754?w=1170&amp;h=993" src="https://static.alili.tech/img/remote/1460000012235754?w=1170&amp;h=993" alt="开放80端口" title="开放80端口" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">启动服务</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz server]# node index.js
success listen at port:80......" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>[root@izwz9e9bjg74ljcpzr7stvz server]# node index.js
<span class="hljs-keyword">success </span>listen at port:80......</code></pre>
<p>浏览器打开 服务器IP:80（如：263.182.35.68:80），如无意外，即正常运行访问啦。</p>
<h2 id="articleHeader16">绑定域名</h2>
<p>进入域名管理后台，解析域名，添加解析  <br><span class="img-wrap"><img data-src="/img/remote/1460000012235755?w=731&amp;h=844" src="https://static.alili.tech/img/remote/1460000012235755?w=731&amp;h=844" alt="域名绑定" title="域名绑定" style="cursor: pointer;"></span><br>添加主机 @.xxx.com 可以通过 xxx.com 直接访问<br>绑定成功后，直接输入域名即可访问。</p>
<h2 id="articleHeader17">安装 pm2</h2>
<blockquote>pm2 是一个带有负载均衡功能的Node应用的进程管理器.</blockquote>
<p>上面我们以 node index.js 启动了项目，当我们退出 Xshell 时，进程就会关闭，无法在访问到项目，而 pm2 就是<br>解决这种问题的，以 pm2 启动项目后，退出 Xshell 后依然可以正常访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装 pm2
[root@izwz9e9bjg74ljcpzr7stvz /]# npm install -g pm2

// 以 -g 全局安装的插件都在 node 安装目录 bin 文件下，
[root@izwz9e9bjg74ljcpzr7stvz bin]# ls
cnpm  node  npm  npx  pm2  pm2-dev  pm2-docker  pm2-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>// 安装 pm2
[root@izwz9e9bjg74ljcpzr7stvz /]<span class="hljs-comment"># npm install -g pm2</span>

// 以 -g 全局安装的插件都在 <span class="hljs-keyword">node</span> <span class="hljs-title">安装目录 bin</span> 文件下，
[root@izwz9e9bjg74ljcpzr7stvz bin]<span class="hljs-comment"># ls</span>
cnpm  <span class="hljs-keyword">node</span>  <span class="hljs-title">npm</span>  npx  pm2  pm2-dev  pm2-docker  pm2-runtime</code></pre>
<p>bin 下都是命令语句，为了可以在任何目录都可以使用命令，我们将此文件夹加入环境变量</p>
<ol>
<li>查看环境变量 [root@izwz9e9bjg74ljcpzr7stvz ~]# echo $PATH</li>
<li>永久添加环境变量（影响所有用户）</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# vim /etc/profile
// 在文档最后，添加:
# node
export NODE_HOME=/root/node-v8.9.1-linux-x64
export PATH=$PATH:$NODE_HOME/bin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>[root@izwz9e9bjg74ljcpzr7stvz ~]<span class="hljs-comment"># vim /etc/profile</span>
<span class="hljs-regexp">//</span> 在文档最后，添加:
<span class="hljs-comment"># node</span>
export NODE_HOME=<span class="hljs-regexp">/root/</span>node-v8.<span class="hljs-number">9.1</span>-linux-x64
export PATH=<span class="hljs-variable">$PATH</span>:<span class="hljs-variable">$NODE_HOME</span><span class="hljs-regexp">/bin</span></code></pre>
<p>保存，退出，然后运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# source /etc/profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># source /etc/profile</span></code></pre>
<p>pm2 启动项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /root/project/myblog/server
// 启动进程
[root@izwz9e9bjg74ljcpzr7stvz server]# pm2 start index.js
// 停止进程
[root@izwz9e9bjg74ljcpzr7stvz server]# pm2 stop index.js
// 查看进程
[root@izwz9e9bjg74ljcpzr7stvz server]# pm2 list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>[root@izwz9e9bjg74ljcpzr7stvz ~]<span class="hljs-meta"># cd /root/project/myblog/server</span>
<span class="hljs-comment">// 启动进程</span>
[root@izwz9e9bjg74ljcpzr7stvz <span class="hljs-keyword">server</span>]<span class="hljs-meta"># pm2 start index.js</span>
<span class="hljs-comment">// 停止进程</span>
[root@izwz9e9bjg74ljcpzr7stvz <span class="hljs-keyword">server</span>]<span class="hljs-meta"># pm2 stop index.js</span>
<span class="hljs-comment">// 查看进程</span>
[root@izwz9e9bjg74ljcpzr7stvz <span class="hljs-keyword">server</span>]<span class="hljs-meta"># pm2 list</span></code></pre>
<h2 id="articleHeader18">刷新页面404</h2>
<p><a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">HTML5 History 模式</a>，最后有nginx的配置。</p>
<h1 id="articleHeader19">Linux中文乱码 （修改默认编码）</h1>
<p>如文件或文件夹含有中文字符时，可能会读取乱码，读取不到文章，需要修改系统默认编码<br><a href="http://www.linuxidc.com/Linux/2017-07/145572.htm" rel="nofollow noreferrer" target="_blank">修改默认编码</a></p>
<h1 id="articleHeader20">Nginx 服务器</h1>
<blockquote>上面我们是直接以 node 启动一个服务器，监听 80 端口，这样我们就可以直接以 IP 地址或域名的方式访问，也可以监听其他端口如3000，这样我们就得在地址后加上 : 端口号，显然这样很麻烦，且一般 node 程序基本不监听 80 端口，还可能同时运行几个 node 项目，监听不同的端口，通过二级域名来分别访问。 这里就用到 Nginx 来实现反向代理。（node 利用 node-http-proxy 包也可以实现反向代理，有兴趣自己了解）</blockquote>
<h2 id="articleHeader21">Nginx安装</h2>
<p>Nginx依赖下面3个包:</p>
<ol>
<li>SSL功能需要openssl库，下载地址 <a href="http://www.openssl.org/" rel="nofollow noreferrer" target="_blank">http://www.openssl.org/</a>
</li>
<li>rewrite模块需要pcre库，下载地址 <a href="http://www.pcre.org/" rel="nofollow noreferrer" target="_blank">http://www.pcre.org/</a>
</li>
<li>gzip模块需要zlib库，下载地址 <a href="http://www.zlib.net/" rel="nofollow noreferrer" target="_blank">http://www.zlib.net/</a>
</li>
<li>Nginx安装包</li>
</ol>
<p>进入任意目录下载以上压缩包(版本号改为最新即可)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz download]# wget http://www.zlib.net/zlib-1.2.11.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# wget https://ftp.pcre.org/pub/pcre/pcre-8.41.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# wget https://www.openssl.org/source/openssl-fips-2.0.16.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# wget http://nginx.org/download/nginx-1.13.7.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# ls
pcre-8.41.tar.gz   zlib-1.2.11.tar.gz
nginx-1.13.7.tar.gz  openssl-fips-2.0.16.tar.gz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> download]<span class="hljs-meta"># wget http://www.zlib.net/zlib-1.2.11.tar.gz</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> download]<span class="hljs-meta"># wget https://ftp.pcre.org/pub/pcre/pcre-8.41.tar.gz</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> download]<span class="hljs-meta"># wget https://www.openssl.org/source/openssl-fips-2.0.16.tar.gz</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> download]<span class="hljs-meta"># wget http://nginx.org/download/nginx-1.13.7.tar.gz</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> download]<span class="hljs-meta"># ls</span>
pcre<span class="hljs-number">-8.41</span>.tar.gz   zlib<span class="hljs-number">-1.2</span><span class="hljs-number">.11</span>.tar.gz
nginx<span class="hljs-number">-1.13</span><span class="hljs-number">.7</span>.tar.gz  openssl-fips<span class="hljs-number">-2.0</span><span class="hljs-number">.16</span>.tar.gz</code></pre>
<p>解压压缩包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz download]# tar zxvf zlib-1.2.11.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# tar tar zxvf pcre-8.41.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# tar zxvf openssl-fips-2.0.16.tar.gz
[root@izwz9e9bjg74ljcpzr7stvz download]# tar zxvf nginx-1.13.7.tar.gz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[root@izwz9e9bjg74ljcpzr7stvz download]</span># <span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">zxvf</span> <span class="hljs-selector-tag">zlib-1</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.11</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
<span class="hljs-selector-attr">[root@izwz9e9bjg74ljcpzr7stvz download]</span># <span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">zxvf</span> <span class="hljs-selector-tag">pcre-8</span><span class="hljs-selector-class">.41</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
<span class="hljs-selector-attr">[root@izwz9e9bjg74ljcpzr7stvz download]</span># <span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">zxvf</span> <span class="hljs-selector-tag">openssl-fips-2</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.16</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
<span class="hljs-selector-attr">[root@izwz9e9bjg74ljcpzr7stvz download]</span># <span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">zxvf</span> <span class="hljs-selector-tag">nginx-1</span><span class="hljs-selector-class">.13</span><span class="hljs-selector-class">.7</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span></code></pre>
<p>先安装3个依赖包，分别进入各自解压目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 看清各个目录下的是 configure 还是 config
[root@izwz9e9bjg74ljcpzr7stvz zlib-1.2.11]# ./configuer &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz pcre-8.41]# ./configuer &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz openssl-fips-2.0.16]# ./config &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz nginx-1.13.7]# ./configure --with-pcre=../pcre-8.41/ --with-zlib=../zlib-1.2.11/ --with-openssl=../openssl-fips-2.0.16/
[root@izwz9e9bjg74ljcpzr7stvz nginx-1.13.7]# make &amp;&amp; make install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 看清各个目录下的是 configure 还是 config</span>
[root@izwz9e9bjg74ljcpzr7stvz zlib<span class="hljs-number">-1.2</span><span class="hljs-number">.11</span>]# ./configuer &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz pcre<span class="hljs-number">-8.41</span>]# ./configuer &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz openssl-fips<span class="hljs-number">-2.0</span><span class="hljs-number">.16</span>]# ./config &amp;&amp; make &amp;&amp; make install
[root@izwz9e9bjg74ljcpzr7stvz nginx<span class="hljs-number">-1.13</span><span class="hljs-number">.7</span>]# ./configure --with-pcre=../pcre<span class="hljs-number">-8.41</span>/ --with-zlib=../zlib<span class="hljs-number">-1.2</span><span class="hljs-number">.11</span>/ --with-openssl=../openssl-fips<span class="hljs-number">-2.0</span><span class="hljs-number">.16</span>/
[root@izwz9e9bjg74ljcpzr7stvz nginx<span class="hljs-number">-1.13</span><span class="hljs-number">.7</span>]# make &amp;&amp; make install</code></pre>
<p>安装 C++ 编译环境 （上面安装过程中如若有报错，可以看看是不是因为没有安装这个，可提前安装）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install gcc-c++" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">yum</span> <span class="hljs-comment">install</span> <span class="hljs-comment">gcc</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span></code></pre>
<h2 id="articleHeader22">运行Nginx</h2>
<p>安装好的Nginx路径在 /usr/local/nginx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /usr/local/nginx
[root@izwz9e9bjg74ljcpzr7stvz nginx]# ls
client_body_temp  conf  fastcgi_temp  html  logs  nginx.conf  proxy_temp  sbin  scgi_temp  uwsgi_temp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>[root@izwz9e9bjg74ljcpzr7stvz ~]# <span class="hljs-keyword">cd</span> /usr/<span class="hljs-keyword">local</span>/nginx
[root@izwz9e9bjg74ljcpzr7stvz nginx]# <span class="hljs-keyword">ls</span>
client_body_temp  <span class="hljs-keyword">conf</span>  fastcgi_temp  html  logs  nginx.<span class="hljs-keyword">conf</span>  proxy_temp  sbin  scgi_temp  uwsgi_temp</code></pre>
<p>配置文件路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/usr/local/nginx/conf/nginx.conf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">/usr/<span class="hljs-keyword">local</span>/nginx/<span class="hljs-keyword">conf</span>/nginx.<span class="hljs-keyword">conf</span></code></pre>
<p>运行Nginx：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /usr/local/nginx/sbin
[root@izwz9e9bjg74ljcpzr7stvz sbin]# ./nginx
// 查看是否运行成功
[root@izwz9e9bjg74ljcpzr7stvz sbin]# netstat -ntlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      3525/nginx: master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># cd /usr/local/nginx/sbin</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> sbin]<span class="hljs-meta"># ./nginx</span>
// 查看是否运行成功
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> sbin]<span class="hljs-meta"># netstat -ntlp</span>
Active Internet connections (only servers)
Proto Recv-Q <span class="hljs-built_in">Send</span>-Q <span class="hljs-keyword">Local</span> Address           Foreign Address         State       PID/Program name
tcp        <span class="hljs-number">0</span>      <span class="hljs-number">0</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">80</span>              <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:*               LISTEN      <span class="hljs-number">3525</span>/nginx: master</code></pre>
<p>浏览器输入 IP 地址或域名即可见到欢迎页面。</p>
<h2 id="articleHeader23">使用server命令启动nginx服务</h2>
<p>现在nginx启动、关闭比较麻烦，关闭要找到PID号，然后杀死进程，启动要进入到 /usr/local/nginx/sbin 目录下使用命令，为此我们通过设置System V脚本来使用server命令启动、关闭、重启nginx服务。</p>
<ol>
<li>
<p>在 /etc/init.d 目录下创建nginx启动脚本文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /etc/init.d
[root@izwz9e9bjg74ljcpzr7stvz init.d]# vim nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># cd /etc/init.d</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> init.d]<span class="hljs-meta"># vim nginx</span></code></pre>
</li>
<li>
<p>将以下代码复制粘贴进去，然后保存。 注意 NGINX_BIN、CONFIGFILE、PIDFILE 三个目录要对应好，默认是对应好的。在网上找了好多相关脚本代码，都有很多问题，好像是和 CentOS 版本有关，下面脚本我在 CentOS 7 下使用正常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#! /bin/sh
# chkconfig: 2345 55 25
# Description: Startup script for nginx webserver on Debian. Place in /etc/init.d and
# run 'update-rc.d -f nginx defaults', or use the appropriate command on your
# distro. For CentOS/Redhat run: 'chkconfig --add nginx'

### BEGIN INIT INFO
# Provides:          nginx
# Required-Start:    $all
# Required-Stop:     $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts the nginx web server
# Description:       starts nginx using start-stop-daemon
### END INIT INFO

# Author:   licess
# website:  http://lnmp.org

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
NAME=nginx
NGINX_BIN=/usr/local/nginx/sbin/$NAME
CONFIGFILE=/usr/local/nginx/conf/$NAME.conf
PIDFILE=/usr/local/nginx/logs/$NAME.pid

case &quot;$1&quot; in
    start)
        echo -n &quot;Starting $NAME... &quot;

        if netstat -tnpl | grep -q nginx;then
            echo &quot;$NAME (pid `pidof $NAME`) already running.&quot;
            exit 1
        fi

        $NGINX_BIN -c $CONFIGFILE

        if [ &quot;$?&quot; != 0 ] ; then
            echo &quot; failed&quot;
            exit 1
        else
            echo &quot; done&quot;
        fi
        ;;

    stop)
        echo -n &quot;Stoping $NAME... &quot;

        if ! netstat -tnpl | grep -q nginx; then
            echo &quot;$NAME is not running.&quot;
            exit 1
        fi

        $NGINX_BIN -s stop

        if [ &quot;$?&quot; != 0 ] ; then
            echo &quot; failed. Use force-quit&quot;
            exit 1
        else
            echo &quot; done&quot;
        fi
        ;;

    status)
        if netstat -tnpl | grep -q nginx; then
            PID=`pidof nginx`
            echo &quot;$NAME (pid $PID) is running...&quot;
        else
            echo &quot;$NAME is stopped&quot;
            exit 0
        fi
        ;;

    force-quit)
        echo -n &quot;Terminating $NAME... &quot;

        if ! netstat -tnpl | grep -q nginx; then
            echo &quot;$NAME is not running.&quot;
            exit 1
        fi

        kill `pidof $NAME`

        if [ &quot;$?&quot; != 0 ] ; then
            echo &quot; failed&quot;
            exit 1
        else
            echo &quot; done&quot;
        fi
        ;;

    restart)
        $0 stop
        sleep 1
        $0 start
        ;;

    reload)
        echo -n &quot;Reload service $NAME... &quot;

        if netstat -tnpl | grep -q nginx; then
            $NGINX_BIN -s reload
            echo &quot; done&quot;
        else
            echo &quot;$NAME is not running, can't reload.&quot;
            exit 1
        fi
        ;;

    configtest)
        echo -n &quot;Test $NAME configure files... &quot;

        $NGINX_BIN -t
        ;;

    *)
        echo &quot;Usage: $0 {start|stop|force-quit|restart|reload|status|configtest}&quot;
        exit 1
        ;;

esac" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-meta">#! /bin/sh</span>
<span class="hljs-comment"># chkconfig: 2345 55 25</span>
<span class="hljs-comment"># Description: Startup script for nginx webserver on Debian. Place in /etc/init.d and</span>
<span class="hljs-comment"># run 'update-rc.d -f nginx defaults', or use the appropriate command on your</span>
<span class="hljs-comment"># distro. For CentOS/Redhat run: 'chkconfig --add nginx'</span>

<span class="hljs-comment">### BEGIN INIT INFO</span>
<span class="hljs-comment"># Provides:          nginx</span>
<span class="hljs-comment"># Required-Start:    $all</span>
<span class="hljs-comment"># Required-Stop:     $all</span>
<span class="hljs-comment"># Default-Start:     2 3 4 5</span>
<span class="hljs-comment"># Default-Stop:      0 1 6</span>
<span class="hljs-comment"># Short-Description: starts the nginx web server</span>
<span class="hljs-comment"># Description:       starts nginx using start-stop-daemon</span>
<span class="hljs-comment">### END INIT INFO</span>

<span class="hljs-comment"># Author:   licess</span>
<span class="hljs-comment"># website:  http://lnmp.org</span>

PATH=/usr/<span class="hljs-built_in">local</span>/sbin:/usr/<span class="hljs-built_in">local</span>/bin:/sbin:/bin:/usr/sbin:/usr/bin
NAME=nginx
NGINX_BIN=/usr/<span class="hljs-built_in">local</span>/nginx/sbin/<span class="hljs-variable">$NAME</span>
CONFIGFILE=/usr/<span class="hljs-built_in">local</span>/nginx/conf/<span class="hljs-variable">$NAME</span>.conf
PIDFILE=/usr/<span class="hljs-built_in">local</span>/nginx/logs/<span class="hljs-variable">$NAME</span>.pid

<span class="hljs-keyword">case</span> <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> <span class="hljs-keyword">in</span>
    start)
        <span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Starting <span class="hljs-variable">$NAME</span>... "</span>

        <span class="hljs-keyword">if</span> netstat -tnpl | grep -q nginx;<span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> (pid `pidof <span class="hljs-variable">$NAME</span>`) already running."</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">fi</span>

        <span class="hljs-variable">$NGINX_BIN</span> -c <span class="hljs-variable">$CONFIGFILE</span>

        <span class="hljs-keyword">if</span> [ <span class="hljs-string">"$?"</span> != 0 ] ; <span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" failed"</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">else</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" done"</span>
        <span class="hljs-keyword">fi</span>
        ;;

    stop)
        <span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Stoping <span class="hljs-variable">$NAME</span>... "</span>

        <span class="hljs-keyword">if</span> ! netstat -tnpl | grep -q nginx; <span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> is not running."</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">fi</span>

        <span class="hljs-variable">$NGINX_BIN</span> <span class="hljs-_">-s</span> stop

        <span class="hljs-keyword">if</span> [ <span class="hljs-string">"$?"</span> != 0 ] ; <span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" failed. Use force-quit"</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">else</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" done"</span>
        <span class="hljs-keyword">fi</span>
        ;;

    status)
        <span class="hljs-keyword">if</span> netstat -tnpl | grep -q nginx; <span class="hljs-keyword">then</span>
            PID=`pidof nginx`
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> (pid <span class="hljs-variable">$PID</span>) is running..."</span>
        <span class="hljs-keyword">else</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> is stopped"</span>
            <span class="hljs-built_in">exit</span> 0
        <span class="hljs-keyword">fi</span>
        ;;

    force-quit)
        <span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Terminating <span class="hljs-variable">$NAME</span>... "</span>

        <span class="hljs-keyword">if</span> ! netstat -tnpl | grep -q nginx; <span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> is not running."</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">fi</span>

        <span class="hljs-built_in">kill</span> `pidof <span class="hljs-variable">$NAME</span>`

        <span class="hljs-keyword">if</span> [ <span class="hljs-string">"$?"</span> != 0 ] ; <span class="hljs-keyword">then</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" failed"</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">else</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" done"</span>
        <span class="hljs-keyword">fi</span>
        ;;

    restart)
        <span class="hljs-variable">$0</span> stop
        sleep 1
        <span class="hljs-variable">$0</span> start
        ;;

    reload)
        <span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Reload service <span class="hljs-variable">$NAME</span>... "</span>

        <span class="hljs-keyword">if</span> netstat -tnpl | grep -q nginx; <span class="hljs-keyword">then</span>
            <span class="hljs-variable">$NGINX_BIN</span> <span class="hljs-_">-s</span> reload
            <span class="hljs-built_in">echo</span> <span class="hljs-string">" done"</span>
        <span class="hljs-keyword">else</span>
            <span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$NAME</span> is not running, can't reload."</span>
            <span class="hljs-built_in">exit</span> 1
        <span class="hljs-keyword">fi</span>
        ;;

    configtest)
        <span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Test <span class="hljs-variable">$NAME</span> configure files... "</span>

        <span class="hljs-variable">$NGINX_BIN</span> -t
        ;;

    *)
        <span class="hljs-built_in">echo</span> <span class="hljs-string">"Usage: <span class="hljs-variable">$0</span> {start|stop|force-quit|restart|reload|status|configtest}"</span>
        <span class="hljs-built_in">exit</span> 1
        ;;

<span class="hljs-keyword">esac</span></code></pre>
</li>
<li>
<p>修改脚本权限</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chmod a+x /etc/init.d/nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">chmod a+x <span class="hljs-regexp">/etc/i</span>nit.d<span class="hljs-regexp">/nginx</span></code></pre>
</li>
<li>
<p>注册成服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chkconfig --add nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">chkconfig --<span class="hljs-keyword">add</span><span class="bash"> nginx</span></code></pre>
</li>
<li>
<p>设置开机启动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chkconfig nginx on" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">chkconfig nginx <span class="hljs-keyword">on</span></code></pre>
</li>
</ol>
<p>这样就可以在任意目录通过service启动、关闭nginx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# service nginx start
[root@izwz9e9bjg74ljcpzr7stvz ~]# service nginx stop
[root@izwz9e9bjg74ljcpzr7stvz ~]# service nginx restart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># service nginx start</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># service nginx stop</span>
[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># service nginx restart</span></code></pre>
<h2 id="articleHeader24">配置nginx.conf反向代理多个node项目</h2>
<ol>
<li>
<p>启动多个node项目，分别监听不同端口，如</p>
<ul>
<li>项目1，监听端口3000，为博客项目，域名访问 www.cl8023.com 或 cl8023.com</li>
<li>项目2，监听端口8023，为游戏项目，域名访问 game.cl8023.com</li>
</ul>
</li>
<li>在阿里云服务区控制台开放端口3000和8023，（80端口是必须的，nginx监听）</li>
<li>
<p>绑定二级域名 game.cl8023.com，添加域名解析</p>
<ul>
<li>记录类型：A</li>
<li>主机记录：game</li>
<li>解析线路：默认</li>
<li>记录纸：IP地址</li>
<li>TTL至：10分钟（默认）</li>
</ul>
</li>
<li>
<p>修改nginx配置  <br>进入目录 /usr/local/nginx/conf 修改配置文件nginx.conf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# cd /usr/local/nginx/conf
[root@izwz9e9bjg74ljcpzr7stvz conf]# ls
fastcgi.conf          fastcgi_params          koi-utf  mime.types          nginx.conf          scgi_params          uwsgi_params          win-utf
fastcgi.conf.default  fastcgi_params.default  koi-win  mime.types.default  nginx.conf.default  scgi_params.default  uwsgi_params.default
[root@izwz9e9bjg74ljcpzr7stvz conf]# vim nginx.conf
// server 内容替换为
    server {
        listen 80;
        server_name game.cl8023.com;
        location / {
            proxy_set_header   Host      $http_host;
            proxy_pass         http://127.0.0.1:8023;
            proxy_redirect     off;
            proxy_set_header   X-Real-IP       $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }

    server {
        listen 80;
        server_name cl8023.com www.cl8023.com;
        # 解决刷新404的问题
        location /blog {
            try_files $uri $uri/ /index.html;
        }
        location / {
            proxy_set_header   Host      $http_host;
            proxy_pass         http://127.0.0.1:3000;
            proxy_redirect     off;
            proxy_set_header   X-Real-IP       $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>[root@izwz9e9bjg74ljcpzr7stvz ~]# <span class="hljs-keyword">cd</span> /usr/<span class="hljs-keyword">local</span>/nginx/<span class="hljs-keyword">conf</span>
[root@izwz9e9bjg74ljcpzr7stvz <span class="hljs-keyword">conf</span>]# <span class="hljs-keyword">ls</span>
fastcgi.<span class="hljs-keyword">conf</span>          fastcgi_params          koi-utf  mime.types          nginx.<span class="hljs-keyword">conf</span>          scgi_params          uwsgi_params          <span class="hljs-keyword">win</span>-utf
fastcgi.<span class="hljs-keyword">conf</span>.default  fastcgi_params.default  koi-<span class="hljs-keyword">win</span>  mime.types.default  nginx.<span class="hljs-keyword">conf</span>.default  scgi_params.default  uwsgi_params.default
[root@izwz9e9bjg74ljcpzr7stvz <span class="hljs-keyword">conf</span>]# vim nginx.<span class="hljs-keyword">conf</span>
<span class="hljs-comment">// server 内容替换为</span>
    server {
        listen 80;
        server_name game.cl8023.com;
        location / {
            proxy_set_header   Host      <span class="hljs-variable">$http_host</span>;
            proxy_pass         http:<span class="hljs-comment">//127.0.0.1:8023;</span>
            proxy_redirect     off;
            proxy_set_header   X-Real-IP       <span class="hljs-variable">$remote_addr</span>;
            proxy_set_header   X-Forwarded-<span class="hljs-keyword">For</span> <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        }
    }

    server {
        listen 80;
        server_name cl8023.com www.cl8023.com;
        # 解决刷新404的问题
        location /blog {
            try_files <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
        }
        location / {
            proxy_set_header   Host      <span class="hljs-variable">$http_host</span>;
            proxy_pass         http:<span class="hljs-comment">//127.0.0.1:3000;</span>
            proxy_redirect     off;
            proxy_set_header   X-Real-IP       <span class="hljs-variable">$remote_addr</span>;
            proxy_set_header   X-Forwarded-<span class="hljs-keyword">For</span> <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        }
    }</code></pre>
<p>若只配置一个server，game.cl8023.com、cl8023.com、www.cl8023.com 都将可以访问到这个端口。想要反响代理更多端口，可再增加server，也可以将server单独出来为一个文件，如game-8023.conf，blog-3000.conf，然后在nginx.conf中引入文件地址即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http {
    ......
    include ./vhost/game-8023.conf; 
    include ./vhost/blog-3000.conf;
    ......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>http {
    ......
    include ./vhost/game<span class="hljs-number">-8023.</span>conf; 
    include ./vhost/blog<span class="hljs-number">-3000.</span>conf;
    ......
}</code></pre>
</li>
<li>
<p>重启nginx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@izwz9e9bjg74ljcpzr7stvz ~]# service nginx restart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@izwz9e9bjg74ljcpzr7stvz</span> ~]<span class="hljs-meta"># service nginx restart</span></code></pre>
</li>
</ol>
<p>无误的话便可以使用不同的域名访问不同的项目。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+node项目部署上线

## 原文链接
[https://segmentfault.com/a/1190000012186563](https://segmentfault.com/a/1190000012186563)

