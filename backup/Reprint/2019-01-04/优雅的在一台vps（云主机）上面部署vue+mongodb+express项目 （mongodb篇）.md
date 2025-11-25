---
title: '优雅的在一台vps（云主机）上面部署vue+mongodb+express项目 （mongodb篇）' 
date: 2019-01-04 2:30:10
hidden: true
slug: 8jte0g0a1ta
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">优雅的在一台vps（云主机）上面部署mongodb</h1>
<blockquote><p>在本地开发：</p></blockquote>
<p>vue项目使用8080端口<br>  mongodb使用是27017端口<br>  express ：3000</p>
<p>在本地开发时使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在config/index.js 配置解决了vue本地开发跨域问题
proxyTable: {
      '/users' : {
        target: 'http://localhost:3000'
      },
      '/users/*' : {
        target: 'http://localhost:3000'
      },
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>在config/<span class="hljs-built_in">index</span>.js 配置解决了vue本地开发跨域问题
proxyTable: {
      <span class="hljs-string">'/users'</span> : {
        targe<span class="hljs-variable">t:</span> <span class="hljs-string">'http://localhost:3000'</span>
      },
      <span class="hljs-string">'/users/*'</span> : {
        targe<span class="hljs-variable">t:</span> <span class="hljs-string">'http://localhost:3000'</span>
      },
    },</code></pre>
<blockquote><p>然而上线部署的时候这些端口怎么配合调用呢，怎么配置代理？</p></blockquote>
<h3 id="articleHeader1">首先安装mongodb</h3>
<blockquote><p>在服务器上安装mongodb</p></blockquote>
<p>需要在服务器上面创建 规定的文件<br>创建文件夹的shell命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir -p mongodb/{mongo,mlog}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">mkdir</span> -p mongodb/{mongo,<span class="hljs-keyword">mlog</span>}
</code></pre>
<p>会创建对应的文件</p>
<h4>安装mongodb服务</h4>
<p>在centos系统上面：（需要分别按照客户端和服务端）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install mongodb -y
yum install mongodb-server -y
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>yum <span class="hljs-keyword">install</span> mongodb -y
yum <span class="hljs-keyword">install</span> mongodb-<span class="hljs-keyword">server</span> -y
</code></pre>
<h4>在Ubuntu上面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install mongodb -y
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>apt-<span class="hljs-keyword">get</span> install mongodb -y
</code></pre>
<h4>创建一个mongodb.conf</h4>
<p>我在 /root/config/mongodb.conf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="port=27017 #指定端口
fork=true #后台运行
dbpath=/root/mongodb/mongo #规定数据库的位置
logpath=/root/mongodb/mlog/mongodb.log #规定数据库的日志文件
#slave=true #声明从
#source=123.207.172.26:27018 #规定从属于哪个ip  注意：ip是主服务器的  最好用内网ip
# bind_ip=127.0.0.1,192.168.0.4 #允许的地址 为了安全
nohttpinterface=true #禁止http访问" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">port</span>=<span class="hljs-number">27017</span> #指定端口
<span class="hljs-attr">fork</span>=<span class="hljs-literal">true</span> #后台运行
<span class="hljs-attr">dbpath</span>=/root/mongodb/mongo #规定数据库的位置
<span class="hljs-attr">logpath</span>=/root/mongodb/mlog/mongodb.log #规定数据库的日志文件
<span class="hljs-comment">#slave=true #声明从</span>
<span class="hljs-comment">#source=123.207.172.26:27018 #规定从属于哪个ip  注意：ip是主服务器的  最好用内网ip</span>
<span class="hljs-comment"># bind_ip=127.0.0.1,192.168.0.4 #允许的地址 为了安全</span>
<span class="hljs-attr">nohttpinterface</span>=<span class="hljs-literal">true</span> #禁止http访问</code></pre>
<h4>启动方式：</h4>
<p>mongod -f  mongodb.conf<br>我的启动方式 mongod -f  /root/config/mongodb.conf</p>
<p>下面信息说明，mongodb正则启动写入初始化数据 需要等待一会，切记不要关掉窗口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="about to fork child process, waiting until server is ready for connections.
forked process: 12566
all output going to: /root/mongodb/mlog/mongodb.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>about <span class="hljs-keyword">to</span> fork child <span class="hljs-keyword">process</span>, waiting <span class="hljs-keyword">until</span> server <span class="hljs-keyword">is</span> ready <span class="hljs-keyword">for</span> connections.
forked <span class="hljs-keyword">process</span>: <span class="hljs-number">12566</span>
<span class="hljs-keyword">all</span> output going <span class="hljs-keyword">to</span>: /root/mongodb/mlog/mongodb.log</code></pre>
<p>出现这句话,表示mongodb安装成功</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="child process started successfully, parent exiting
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>child <span class="hljs-built_in">process</span> started successfully, parent exiting
</code></pre>
<p>更改防火墙配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/iptables.rules

> 添加以下配置
-A INPUT -p tcp -m tcp --dport 27017 -j DROP
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vim /etc/iptables<span class="hljs-selector-class">.rules</span>

&gt; 添加以下配置
-A INPUT -<span class="hljs-selector-tag">p</span> tcp -m tcp --dport <span class="hljs-number">27017</span> -j DROP
</code></pre>
<blockquote><p>如果是阿里云的专有网络请去添加安全组配置规则</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="允许    自定义 TCP    
27017/27017    地址段访问    
0.0.0.0/0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>允许    自定义 TCP    
<span class="hljs-number">27017</span>/<span class="hljs-number">27017</span>    地址段访问    
<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span>
</code></pre>
<h4>测试：</h4>
<p>服务器测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongo  
show dbs;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>mongo  
<span class="hljs-keyword">show </span>dbs<span class="hljs-comment">;</span>
</code></pre>
<p>使用远程测试<br>mongoBooster 桌面工具测试远程连接（没有禁止掉远程连接的情况）</p>
<p>在mongodb.conf配置文件添加可以禁止远程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# bind_ip=127.0.0.1,192.168.0.4 #允许的地址 为了安全
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code># bind_ip=<span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>,<span class="hljs-number">192.168</span><span class="hljs-number">.0</span><span class="hljs-number">.4</span> #允许的地址 为了安全
</code></pre>
<p>部署 vue express 稍后会写</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
优雅的在一台vps（云主机）上面部署vue+mongodb+express项目 （mongodb篇）

## 原文链接
[https://segmentfault.com/a/1190000010708221](https://segmentfault.com/a/1190000010708221)

