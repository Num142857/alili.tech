---
title: 'nodejs服务器部署教程一' 
date: 2019-01-09 2:30:12
hidden: true
slug: 83d2wd11x66
categories: [reprint]
---

{{< raw >}}

                    
<p>第一篇教程紧紧让你输出一个<a href="http://hello.86886.wang" rel="nofollow noreferrer" target="_blank">hello world</a></p>
<h3 id="articleHeader0">环境介绍</h3>
<p>服务器环境：ubuntu（16.04）64位<br>本地环境：windows10 64位<br>连接工具：<a href="http://mobaxterm.mobatek.net/" rel="nofollow noreferrer" target="_blank">mobaxterm</a></p>
<h3 id="articleHeader1">ubuntu安装和基本配置</h3>
<p>我的ecs是在阿里云买的，购买的时候镜像选择ubuntu16.04，现在在搞活动比较便宜，我买的香港地区的不用备案，购买后本地打开mobaxterm，点击session，输入ip确定，输入root，然后输入密码，会看到下面的界面：<br><span class="img-wrap"><img data-src="/img/remote/1460000010098129" src="https://static.alili.tech/img/remote/1460000010098129" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>连接远程服务器，接下来我参考了阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2014/03/server_setup.html" rel="nofollow noreferrer" target="_blank">这篇文章</a><br><code>addgroup wmui</code>添加用户组<br><code>useradd -d /home/wmui -s /bin/bash -m wmui</code>创建wmui用户<br><code>passwd wmui</code>设置密码，如果忘记密码，也可用此命令重置密码<br><code>usermod -a -G wmui wmui</code> 添加用户到组<br><code>visudo </code>设置sudo权限<br>然后会跳转到下面页面<span class="img-wrap"><img data-src="/img/remote/1460000010098130" src="https://static.alili.tech/img/remote/1460000010098130" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>root ALL=(ALL:ALL) ALL</code>下面添加<code>wmui ALL=(ALL) NOPASSWD: ALL</code><br><code>ctrl+x</code>保存退出<br>接下来打开一个新的窗口，测试是否登陆成功<span class="img-wrap"><img data-src="/img/remote/1460000010098131" src="https://static.alili.tech/img/remote/1460000010098131" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">ssh无密码登陆配置</h3>
<p>首先你需要在本地安装git并生成<code>id_rsa.pub</code>，打开命令行<br>在本地生成公钥和私钥:<br><code>ssh-keygen -t rsa -b 4096 -C "1719442545@qq.com"</code><br>在服务器生成公钥和私钥:<br><code>ssh-keygen -t rsa -b 4096 -C "1719442545@qq.com"</code><br>在服务器窗口输入：<br><code>echo "[your public key]" &gt; ~/.ssh/authorized_keys</code>将本机的公钥拷贝到服务器的authorized_keys文件<br><span class="img-wrap"><img data-src="/img/remote/1460000010098132" src="https://static.alili.tech/img/remote/1460000010098132" alt="" title="" style="cursor: pointer; display: inline;"></span><br>完成以上操作，测试是否生效，重启服务：<code>sudo service ssh restart</code>新打开一个窗口，输入用户名回车，登陆成功</p>
<h3 id="articleHeader3">安全项配置：</h3>
<p>我在搭建时候没有设置这一项，所以没有测试这项<br>编辑SSH配置文件/etc/ssh/sshd_config:修改port为1025到65536之间的任意一个整数<br>在末尾添加: AllowUsers [username]<br>此时登陆时需要端口号: -p [25000] [username]<br>fail2ban系统监控软件安装：<br>sudo apt-get update<br>sudo apt-get upgrade<br>sudo apt-get install fail2ban<br>sudo service fail2ban status 查看fail2ban运行状态<br>sudo service fail2ban stop 关闭fail2ban<br>sudo service fail2ban start 开启fail2ban</p>
<h3 id="articleHeader4">nodejs环境搭建</h3>
<p>安装常用软件<br><code>sudo apt-get install vim openssl build-essential libssl-dev wget curl git</code><br>nvm安装<br><code>wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash</code><br>打开新的窗口<br><code>nvm install v8.9.1</code><br><code>nvm use 8.9.1</code><br><code>nvm alias default 8.9.1</code> 默认版本<br>安装常用node包<br><code>npm i pm2 webpack vue-cli -g</code></p>
<h4>nginx服务器代理设置</h4>
<p><code>sudo apt-get install nginx</code>  通过nginx -v查看版本号<br>打开/etc/nginx/conf.d/文件夹，创建配置文件test-8081.conf，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upstream hello {
    server 127.0.0.1:8081;
}

server {
    listen 80;
    server_name hello.86886.wang;

    location / {
        proxy_set_header Host  $http_host;
        proxy_set_header X-Real-IP  $remote_addr;  
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-Nginx-proxy true;
        proxy_pass http://hello;
        proxy_redirect off;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">upstream</span> hello {
    <span class="hljs-attribute">server</span> <span class="hljs-number">127.0.0.1:8081</span>;
}

<span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> hello.<span class="hljs-number">86886</span>.wang;

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">proxy_set_header</span> Host  <span class="hljs-variable">$http_host</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Real-IP  <span class="hljs-variable">$remote_addr</span>;  
        <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Nginx-proxy <span class="hljs-literal">true</span>;
        <span class="hljs-attribute">proxy_pass</span> http://hello;
        <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
    }
}</code></pre>
<p>解析你的域名到你的服务器ip,例如解析hello.86886.wang<br><code>sudo nginx -t</code> 查看是否配置成功<br><span class="img-wrap"><img data-src="/img/remote/1460000010098133" src="https://static.alili.tech/img/remote/1460000010098133" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>sudo nginx -s reload</code> 重启服务器<br>注意：我在第一次配置的时候遇到了黄色警告，但是不影响使用，如果你也遇到了，向下面一样解决<br>打来etc/hosts，在<code>127.0.0.1   localhost</code>下面添加<code>127.0.1.1   iZj6cas9txr6crspqecn4zZ</code>其中 iZj6cas9txr6crspqecn4zZ是你的ecs实例名称<br><span class="img-wrap"><img data-src="/img/remote/1460000010098134" src="https://static.alili.tech/img/remote/1460000010098134" alt="" title="" style="cursor: pointer; display: inline;"></span><br>ok完成以上操作，接下来开始写hello world</p>
<h3 id="articleHeader5">创建和部署hello world</h3>
<p>以root用户身份在根目录下创建www目录,www目录下创建hello文件夹,里面就一个文件，hello.js,内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http')
http.createServer(function(req,res) {
res.writeHead(200,{'Content-Type':'text/plain'})
res.end('hello world')
}).listen(8081)

console.log('server test')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
res.writeHead(<span class="hljs-number">200</span>,{<span class="hljs-string">'Content-Type'</span>:<span class="hljs-string">'text/plain'</span>})
res.end(<span class="hljs-string">'hello world'</span>)
}).listen(<span class="hljs-number">8081</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server test'</span>)</code></pre>
<p>进入到www下hello文件夹下<br>hello world测试：<br>pm2 start hello.js<br>pm2 list 查看启动的应用<br>pm2 show hello 查看详细信息<br>pm2 logs 查看当前信息<br>pm2 stop hello 停止hello<br>pm2 delete hello 删除hello<br><span class="img-wrap"><img data-src="/img/remote/1460000010098135" src="https://static.alili.tech/img/remote/1460000010098135" alt="" title="" style="cursor: pointer;"></span><br>如图所示表示启动成功，输入hello.86886.wang就可以看到hello world了<br>接下来计划：<br>nodejs服务器部署教程二：部署一个基于vue的项目到线上<br>nodejs服务器部署教程三：部署基于nodejs+vue+mongodb的项目<br>nodejs服务器部署教程四：实现https</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs服务器部署教程一

## 原文链接
[https://segmentfault.com/a/1190000010098126](https://segmentfault.com/a/1190000010098126)

