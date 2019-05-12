---
title: '如何在 Ubuntu 上使用 pm2 和 Nginx 部署 Node.js 应用' 
date: 2019-01-23 2:30:08
hidden: true
slug: 87w739bgfa8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-ubuntu-上使用-pm2-和-nginx-部署-nodejs-应用"></a>如何在 Ubuntu 上使用 pm2 和 Nginx 部署 Node.js 应用</h1>
<p>pm2 是一个 Node.js 应用的进程管理器，它可以让你的应用程序保持运行，还有一个内建的负载均衡器。它非常简单而且强大，你可以零间断重启或重新加载你的 node 应用，它也允许你为你的 node 应用创建集群。</p>
<p>在这篇博文中，我会向你展示如何安装和配置 pm2 用于这个简单的 'Express' 应用，然后配置 Nginx 作为运行在 pm2 下的 node 应用的反向代理。</p>
<p>前提：</p>
<ul>
<li>Ubuntu 16.04 - 64bit</li>
<li>Root 权限</li>
</ul>
<h3><a href="#第一步---安装-nodejs-lts"></a>第一步 - 安装 Node.js LTS</h3>
<p>在这篇指南中，我们会从零开始我们的实验。首先，我们需要在服务器上安装 Node.js。我会使用 Nodejs LTS 6.x 版本，它能从 nodesource 仓库中安装。</p>
<p>从 Ubuntu 仓库安装 <code>python-software-properties</code> 软件包并添加 “nodesource” Nodejs 仓库。</p>
<pre><code class="hljs vim">sudo apt-<span class="hljs-built_in">get</span> install -<span class="hljs-keyword">y</span> <span class="hljs-keyword">python</span>-software-properties 
curl -sL http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">deb</span>.nodesource.<span class="hljs-keyword">com</span>/setup_6.<span class="hljs-keyword">x</span> | sudo -E bash -

</code></pre><p>安装最新版本的 Nodejs LTS：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install -y nodejs

</code></pre><p>安装完成后，查看 node 和 npm 版本。</p>
<pre><code class="hljs crmsh"><span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
npm -v

</code></pre><p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/1.png"><img src="https://p0.ssl.qhimg.com/t01f2317fb7fe9dd24f.png" alt="检查 node.js 版本"></a></p>
<h3><a href="#第二步---生成-express-示例-app"></a>第二步 - 生成 Express 示例 App</h3>
<p>我会使用 <code>express-generator</code> 软件包生成的简单 web 应用框架进行示例安装。<code>express-generator</code> 可以使用 <code>npm</code> 命令安装。</p>
<p>用 <code>npm</code>安装 <code>express-generator</code>：</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> express-generator -g

</code></pre><ul>
<li><code>-g</code> ： 在系统内部安装软件包。</li>
</ul>
<p>我会以普通用户运行应用程序，而不是 root 或者超级用户。我们首先需要创建一个新的用户。</p>
<p>创建一个名为 <code>yume</code> 的用户：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">useradd</span> -m -s /<span class="hljs-keyword">bin/bash </span>yume
<span class="hljs-symbol">passwd</span> yume

</code></pre><p>使用 <code>su</code> 命令登录到新用户：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">su - yume</span>

</code></pre><p>下一步，用 <code>express</code> 命令生成一个新的简单 web 应用程序：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">express hakase-app</span>

</code></pre><p>命令会创建新项目目录 <code>hakase-app</code>。</p>
<p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/2.png"><img src="https://p0.ssl.qhimg.com/t01f0d46baa8f7400d3.png" alt="用 express-generator 生成应用框架"></a></p>
<p>进入到项目目录并安装应用需要的所有依赖。</p>
<pre><code class="hljs stata"><span class="hljs-keyword">cd</span> hakase-<span class="hljs-keyword">app</span>
npm install

</code></pre><p>然后用下面的命令测试并启动一个新的简单应用程序：</p>
<pre><code class="hljs ini"><span class="hljs-attr">DEBUG</span>=myapp:* npm start

</code></pre><p>默认情况下，我们的 express 应用会运行在 <code>3000</code> 端口。现在访问服务器的 IP 地址：192.168.33.10:3000 ：</p>
<p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/3.png"><img src="https://p0.ssl.qhimg.com/t011ff773f126cf2a7e.png" alt="express nodejs 运行在 3000 端口"></a></p>
<p>这个简单 web 应用框架现在以 'yume' 用户运行在 3000 端口。</p>
<h3><a href="#第三步---安装-pm2"></a>第三步 - 安装 pm2</h3>
<p>pm2 是一个 node 软件包，可以使用 <code>npm</code> 命令安装。（用 root 权限，如果你仍然以 yume 用户登录，那么运行命令 <code>exit</code> 再次成为 root 用户）：</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> pm2 -g

</code></pre><p>现在我们可以为我们的 web 应用使用 pm2 了。</p>
<p>进入应用目录 <code>hakase-app</code>：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">su</span> - yume
<span class="hljs-keyword">cd</span> ~/hakase-<span class="hljs-keyword">app</span>/

</code></pre><p>这里你可以看到一个名为 <code>package.json</code> 的文件，用 <code>cat</code> 命令显示它的内容。</p>
<pre><code class="hljs stylus">cat package<span class="hljs-selector-class">.json</span>

</code></pre><p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/4.png"><img src="https://p0.ssl.qhimg.com/t01fa60484729c3b080.png" alt="配置 express nodejs 服务"></a></p>
<p>你可以看到 <code>start</code> 行有一个 nodejs 用于启动 express 应用的命令。我们会和 pm2 进程管理器一起使用这个命令。</p>
<p>像下面这样使用 <code>pm2</code> 命令运行 express 应用：</p>
<pre><code class="hljs sql">pm2 <span class="hljs-keyword">start</span> ./<span class="hljs-keyword">bin</span>/www

</code></pre><p>现在你可以看到像下面这样的结果：</p>
<p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/5.png"><img src="https://p0.ssl.qhimg.com/t0174b034612805c7c3.png" alt="使用 pm2 运行 nodejs app"></a></p>
<p>我们的 express 应用正在 <code>pm2</code> 中运行，名称为 <code>www</code>，id 为 <code>0</code>。你可以用 show 选项 <code>show nodeid|name</code> 获取更多 pm2 下运行的应用的信息。</p>
<pre><code class="hljs gauss">pm2 <span class="hljs-keyword">show</span> www

</code></pre><p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/6.png"><img src="https://p0.ssl.qhimg.com/t019bc6038e02d869bd.png" alt="pm2 服务状态"></a></p>
<p>如果你想看我们应用的日志，你可以使用 logs 选项。它包括访问和错误日志，你还可以看到应用程序的 HTTP 状态。</p>
<pre><code class="hljs gcode">p<span class="hljs-name">m2</span> logs www

</code></pre><p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/7.png"><img src="https://p0.ssl.qhimg.com/t014b414cf67d7cc5c6.png" alt="pm2 服务日志"></a></p>
<p>你可以看到我们的程序正在运行。现在，让我们来让它开机自启动。</p>
<pre><code class="hljs gcode">p<span class="hljs-name">m2</span> startup systemd

</code></pre><ul>
<li><code>systemd</code>： Ubuntu 16 使用的是 systemd。</li>
</ul>
<p>你会看到要用 root 用户运行命令的信息。使用 <code>exit</code> 命令回到 root 用户然后运行命令。</p>
<pre><code class="hljs crystal">sudo env PATH=$<span class="hljs-symbol">PATH:</span>/usr/bin /usr/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node_modules</span>/<span class="hljs-title">pm2</span>/<span class="hljs-title">bin</span>/<span class="hljs-title">pm2</span> <span class="hljs-title">startup</span> <span class="hljs-title">systemd</span> -<span class="hljs-title">u</span> <span class="hljs-title">yume</span> --<span class="hljs-title">hp</span> /<span class="hljs-title">home</span>/<span class="hljs-title">yume</span></span>

</code></pre><p>它会为启动应用程序生成 systemd 配置文件。当你重启服务器的时候，应用程序就会自动运行。</p>
<p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/8.png"><img src="https://p0.ssl.qhimg.com/t01435a85040cbd64bf.png" alt="pm2 添加服务到开机自启动"></a></p>
<h3><a href="#第四步---安装和配置-nginx-作为反向代理"></a>第四步 - 安装和配置 Nginx 作为反向代理</h3>
<p>在这篇指南中，我们会使用 Nginx 作为 node 应用的反向代理。Ubuntu 仓库中有 Nginx，用 <code>apt</code> 命令安装它：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install -y nginx

</code></pre><p>下一步，进入到 <code>sites-available</code> 目录并创建新的虚拟主机配置文件。</p>
<pre><code class="hljs awk">cd <span class="hljs-regexp">/etc/</span>nginx<span class="hljs-regexp">/sites-available/</span>
vim hakase-app

</code></pre><p>粘贴下面的配置：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">upstream</span> hakase-app {
    <span class="hljs-comment"># Nodejs app upstream</span>
    <span class="hljs-attribute">server</span> <span class="hljs-number">127.0.0.1:3000</span>;
    <span class="hljs-attribute">keepalive</span> <span class="hljs-number">64</span>;
}

<span class="hljs-comment"># Server on port 80</span>
<span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> hakase-node.co;
    <span class="hljs-attribute">root</span> /home/yume/hakase-app;

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-comment"># Proxy_pass configuration</span>
        <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span> Host <span class="hljs-variable">$http_host</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-NginX-Proxy <span class="hljs-literal">true</span>;
        <span class="hljs-attribute">proxy_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">1</span>;
        <span class="hljs-attribute">proxy_set_header</span> Upgrade <span class="hljs-variable">$http_upgrade</span>;
        <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">"upgrade"</span>;
        <span class="hljs-attribute">proxy_max_temp_file_size</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">proxy_pass</span> http://hakase-app/;
        <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
        <span class="hljs-attribute">proxy_read_timeout</span> <span class="hljs-number">240s</span>;
    }
}

</code></pre><p>保存文件并退出 vim。</p>
<p>在配置中：</p>
<ul>
<li>node 应用使用域名 <code>hakase-node.co</code> 运行。</li>
<li>所有来自 nginx 的流量都会被转发到运行在 <code>3000</code> 端口的 node app。</li>
</ul>
<p>测试 Nginx 配置确保没有错误。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">nginx -t</span>

</code></pre><p>启用 Nginx 并使其开机自启动。</p>
<pre><code class="hljs routeros">systemctl start nginx
systemctl <span class="hljs-builtin-name">enable</span> nginx

</code></pre><h3><a href="#第五步---测试"></a>第五步 - 测试</h3>
<p>打开你的 web 浏览器并访问域名（我的是）：<a href="http://hakase-app.co/">http://hakase-app.co</a></p>
<p>你可以看到 express 应用正在 Nginx web 服务器中运行。</p>
<p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/9.png"><img src="https://p0.ssl.qhimg.com/t01ef3d66840cafbbb0.png" alt="Nodejs app 在 pm2 和 Nginx 中运行"></a></p>
<p>下一步，重启你的服务器，确保你的 node app 能开机自启动：</p>
<pre><code class="hljs fortran">pm2 <span class="hljs-keyword">save</span>
sudo reboot

</code></pre><p>如果你再次登录到了你的服务器，检查 node app 进程。以 <code>yume</code> 用户运行下面的命令。</p>
<pre><code class="hljs fortran">su - yume
pm2 <span class="hljs-keyword">status</span> www

</code></pre><p><a href="https://www.howtoforge.com/images/how_to_deploy_nodejs_applications_with_pm2_and_nginx_on_ubuntu/big/10.png"><img src="https://p0.ssl.qhimg.com/t01baf42c3b88e8abb2.png" alt="nodejs 在 pm2 下开机自启动"></a></p>
<p>Node 应用在 pm2 中运行并使用 Nginx 作为反向代理。</p>
<h3><a href="#链接"></a>链接</h3>
<ul>
<li><a href="https://www.ubuntu.com/">Ubuntu</a></li>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://www.nginx.com/">Nginx</a></li>
</ul>
<hr>
<p>via: <a href="https://www.howtoforge.com/tutorial/how-to-deploy-nodejs-applications-with-pm2-and-nginx-on-ubuntu/">https://www.howtoforge.com/tutorial/how-to-deploy-nodejs-applications-with-pm2-and-nginx-on-ubuntu/</a></p>
<p>作者：<a href="https://www.howtoforge.com/tutorial/how-to-deploy-nodejs-applications-with-pm2-and-nginx-on-ubuntu/">Muhammad Arul</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Ubuntu 上使用 pm2 和 Nginx 部署 Node.js 应用

## 原文链接
[https://www.zcfy.cc/article/how-to-deploy-node-js-applications-with-pm2-and-nginx-on-ubuntu](https://www.zcfy.cc/article/how-to-deploy-node-js-applications-with-pm2-and-nginx-on-ubuntu)

