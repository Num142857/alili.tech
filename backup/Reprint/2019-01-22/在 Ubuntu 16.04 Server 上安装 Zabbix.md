---
title: '在 Ubuntu 16.04 Server 上安装 Zabbix' 
date: 2019-01-22 2:30:08
hidden: true
slug: 3btyii14ejy
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-1604-server-上安装-zabbix"></a>在 Ubuntu 16.04 Server 上安装 Zabbix</h1>
<h3><a href="#监控服务器---什么是-zabbix"></a>监控服务器 - 什么是 Zabbix</h3>
<p><a href="http://www.zabbix.com/">Zabbix</a> 是企业级开源分布式监控服务器解决方案。该软件能监控网络的不同参数以及服务器的完整性，还允许为任何事件配置基于电子邮件的警报。Zabbix 根据存储在数据库（例如 MySQL）中的数据提供报告和数据可视化功能。软件收集的每个测量指标都可以通过基于 Web 的界面访问。</p>
<p>Zabbix 根据 GNU 通用公共许可证版本 2（GPLv2）的条款发布，完全免费。</p>
<p>在本教程中，我们将在运行 MySQL、Apache 和 PHP 的 Ubuntu 16.04 server 上安装 Zabbix。</p>
<h3><a href="#安装-zabbix-服务器"></a>安装 Zabbix 服务器</h3>
<p>首先，我们需要安装 Zabbix 所需的几个 PHP 模块：</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">apt-get</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-bcmath</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-xml</span> <span class="hljs-selector-tag">php7</span><span class="hljs-selector-class">.0-mbstring</span>

</code></pre><p>Ubuntu 仓库中提供的 Zabbix 软件包已经过时了。使用官方 Zabbix 仓库安装最新的稳定版本。</p>
<p>通过执行以下命令来安装仓库软件包：</p>
<pre><code class="hljs awk">$ wget http:<span class="hljs-regexp">//</span>repo.zabbix.com<span class="hljs-regexp">/zabbix/</span><span class="hljs-number">3.2</span><span class="hljs-regexp">/ubuntu/</span>pool<span class="hljs-regexp">/main/</span>z<span class="hljs-regexp">/zabbix-release/</span>zabbix-release_3.<span class="hljs-number">2</span>-<span class="hljs-number">1</span>+xenial_all.deb
<span class="hljs-comment"># dpkg -i zabbix-release_3.2-1+xenial_all.deb</span>

</code></pre><p>然后更新 <code>apt</code> 包源：</p>
<pre><code class="hljs q"># apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><p>现在可以安装带有 MySQL 支持和 PHP 前端的 Zabbix 服务器。执行命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> apt-get install zabbix-server-mysql zabbix-frontend-php</span>

</code></pre><p>安装 Zabbix 代理：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> apt-get install zabbix-agent</span>

</code></pre><p>Zabbix 现已安装。下一步是配置数据库来存储数据。</p>
<h3><a href="#为-zabbix-配置-mysql"></a>为 Zabbix 配置 MySQL</h3>
<p>我们需要创建一个新的 MySQL 数据库，Zabbix 将用来存储收集的数据。</p>
<p>启动 MySQL shell：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -uroot -p</span>

</code></pre><p>接下来：</p>
<pre><code class="hljs lasso">mysql&gt; CREATE DATABASE zabbix CHARACTER <span class="hljs-built_in">SET</span> utf8 COLLATE utf8_bin;
Query OK, <span class="hljs-number">1</span> row affected (<span class="hljs-number">0.00</span> sec)

mysql&gt; GRANT <span class="hljs-literal">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> zabbix.* <span class="hljs-keyword">TO</span> zabbix@localhost IDENTIFIED <span class="hljs-keyword">BY</span> <span class="hljs-string">'usr_strong_pwd'</span>;
Query OK, <span class="hljs-number">0</span> <span class="hljs-keyword">rows</span> affected, <span class="hljs-number">1</span> warning (<span class="hljs-number">0.00</span> sec)

mysql&gt; EXIT;
Bye

</code></pre><p>接下来，导入初始表和数据。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> zcat /usr/share/doc/zabbix-server-mysql/create.sql.gz | mysql -uzabbix -p zabbix</span>

</code></pre><p>输入在 MySQL shell 中创建的 <strong>zabbix</strong> 用户的密码。</p>
<p>接下来，我们需要编辑 Zabbix 服务器配置文件，它是 <code>/etc/zabbix/zabbis_server.conf</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /etc/zabbix/zabbix_server.conf</span>

</code></pre><p>搜索文件的 <code>DBPassword</code> 部分：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment">## Option: DBPassword                           </span></span>
<span class="hljs-meta">#</span><span class="bash">       Database password. Ignored <span class="hljs-keyword">for</span> SQLite.   </span>
<span class="hljs-meta">#</span><span class="bash">       Comment this line <span class="hljs-keyword">if</span> no password is used.</span>
<span class="hljs-meta">#</span><span class="bash">                                                </span>
<span class="hljs-meta">#</span><span class="bash"> Mandatory: no                                  </span>
<span class="hljs-meta">#</span><span class="bash"> Default:                                       </span>
<span class="hljs-meta">#</span><span class="bash"> DBPassword=</span>


</code></pre><p>取消注释 <code>DBPassword=</code> 这行，并添加在 MySQL 中创建的密码：</p>
<pre><code class="hljs ini"><span class="hljs-attr">DBPassword</span>=usr_strong_pwd


</code></pre><p>接下来，查找 <code>DBHost=</code> 这行并取消注释。</p>
<p>保存并退出。</p>
<h3><a href="#配置-php"></a>配置 PHP</h3>
<p>我们需要配置 PHP 来使用 Zabbix。在安装过程中，安装程序在 <code>/etc/zabbix</code> 中创建了一个名为 <code>apache.conf</code> 的配置文件。打开此文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /etc/zabbix/apache.conf</span>

</code></pre><p>此时，只需要取消注释 <code>date.timezone</code> 并设置正确的时区：</p>
<pre><code class="hljs ceylon">
&lt;IfModule mod<span class="hljs-number">_p</span>hp<span class="hljs-number">7</span>.c&gt;
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> max<span class="hljs-number">_</span>execution<span class="hljs-number">_</span>time <span class="hljs-number">300</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> memory<span class="hljs-number">_</span>limit <span class="hljs-number">128M</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> post<span class="hljs-number">_m</span>ax<span class="hljs-number">_</span>size <span class="hljs-number">16M</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> upload<span class="hljs-number">_m</span>ax<span class="hljs-number">_f</span>ilesize <span class="hljs-number">2M</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> max<span class="hljs-number">_</span>input<span class="hljs-number">_</span>time <span class="hljs-number">300</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> always<span class="hljs-number">_p</span>opulate<span class="hljs-number">_</span>raw<span class="hljs-number">_p</span>ost<span class="hljs-number">_</span>data -<span class="hljs-number">1</span>
    php<span class="hljs-number">_</span><span class="hljs-keyword">value</span> date.timezone Europe/Rome
&lt;/IfModule&gt;


</code></pre><p>保存并退出。</p>
<p>此时，重启 Apache 并启动 Zabbix Server 服务，使其能够在开机时启动：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart apache2</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl start zabbix-server</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> zabbix-server</span>

</code></pre><p>用 <code>systemctl</code> 检查 Zabbix 状态：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl status zabbix-server</span>

</code></pre><p>这个命令应该输出：</p>
<pre><code class="hljs routeros">â zabbix-server.service - Zabbix<span class="hljs-built_in"> Server
</span> Loaded: loaded (/lib/systemd/system/zabbix-server.service; enabled; vendor pr
 Active: active (running) <span class="hljs-built_in">..</span>.

</code></pre><p>此时，Zabbix 的服务器端已经正确安装和配置了。</p>
<h3><a href="#配置-zabbix-web-前端"></a>配置 Zabbix Web 前端</h3>
<p>如介绍中所述，Zabbix 有一个基于 Web 的前端，我们将用于可视化收集的数据。但是，必须配置此接口。</p>
<p>使用 Web 浏览器，进入 URL <code>http://localhost/zabbix</code>。</p>
<p><a href="https://camo.githubusercontent.com/712f046e32449ecc52be7ac7a48fabed78293af5/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74312e706e67"><img src="https://p0.ssl.qhimg.com/t01c07f302862a64666.png" alt="Zabbix monitoring server Frontend Setup"></a></p>
<p>点击  <strong>Next step</strong></p>
<p><a href="https://camo.githubusercontent.com/f07b639436eaa10c06ae982a7cea443cd44792f5/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74322e706e67"><img src="https://p0.ssl.qhimg.com/t0174c2adcde0c1eabb.png" alt="snapshot2"></a></p>
<p>确保所有的值都是 <strong>Ok</strong>，然后再次单击 <strong>Next step</strong> 。</p>
<p><a href="https://camo.githubusercontent.com/a5101924627d7edd9d46507d5da483be97b0cb3b/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74332e706e67"><img src="https://p0.ssl.qhimg.com/t01063f8dcdeab019d3.png" alt="Zabbix MySQL configuration"></a></p>
<p>输入 MySQL <strong>zabbix</strong> 的用户密码，然后点击 <strong>Next step</strong>。</p>
<p><a href="https://camo.githubusercontent.com/37cbafd53b2327473259283039b058e5124e7ec5/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74342e706e67"><img src="https://p0.ssl.qhimg.com/t0118115fd16cafed11.png" alt="Zabbix server details"></a></p>
<p>单击 <strong>Next step</strong> ，安装程序将显示具有所有配置参数的页面。再次检查以确保一切正确。</p>
<p><a href="https://camo.githubusercontent.com/83780d26f2f032c3923bd295c0b06533cf3e7aaf/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74352e706e67"><img src="https://p0.ssl.qhimg.com/t01fa63b1f273267de5.png" alt="Zabbix pre-installation details"></a></p>
<p><a href="https://camo.githubusercontent.com/630109c410b4e9a136c832114395e523075aad39/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74362e706e67"><img src="https://p0.ssl.qhimg.com/t01f11de18d8b0b2d67.png" alt="Zabbix installation finished"></a></p>
<p>点击 <strong>Next step</strong> 进入最后一页。</p>
<p>点击完成以完成前端安装。默认用户名为 <strong>Admin</strong>，密码是 <strong>zabbix</strong>。</p>
<h3><a href="#zabbix-服务器入门"></a>Zabbix 服务器入门</h3>
<p><a href="https://camo.githubusercontent.com/8b75ad92c73b9e6ccf6aed88df0dae8ac6402e9a/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74372e706e67"><img src="https://p0.ssl.qhimg.com/t01d99339940a36ba2b.png" alt="Zabbix login interface"></a></p>
<p>使用上述凭证登录后，我们将看到 Zabbix 面板：</p>
<p><a href="https://camo.githubusercontent.com/7d0d92fdf440289372ec5b98f85cd7790353330d/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74382e706e67"><img src="https://p0.ssl.qhimg.com/t01b2f3d45bf2d2d22f.png" alt="zabbix dashboard"></a></p>
<p>前往 <strong>Administration -&gt; Users</strong>，了解已启用帐户的概况：</p>
<p><a href="https://camo.githubusercontent.com/b2f93b6a4d02d93df1254a27763b51a59ac15703/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f74392e706e67"><img src="https://p0.ssl.qhimg.com/t017156509aebaa96f0.png" alt="Zabbix users"></a></p>
<p>通过点击 <strong>Create user</strong> 创建一个新帐户。</p>
<p><a href="https://camo.githubusercontent.com/df6cc0ab714140d556d8433233561357de17e2ca/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f7431302e706e67"><img src="https://p0.ssl.qhimg.com/t017bdd5a992ca013d6.png" alt="Zabbix User Creation"></a></p>
<p>点击 <strong>Groups</strong> 中的 <strong>Add</strong>，然后选择一个组：</p>
<p><a href="https://camo.githubusercontent.com/fed92258a2e8bab5d7a0e8d18d8000ccc2f6dd97/68747470733a2f2f7777772e756e69786d656e2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f736e617073686f7431312e706e67"><img src="https://p0.ssl.qhimg.com/t014033d345fe439777.png" alt="snapshot11"></a></p>
<p>保存新用户凭证，它将显示在 <strong>Administration -&gt; Users</strong> 面板中。</p>
<p><strong>请注意，在 Zabbix 中，主机的访问权限分配给用户组，而不是单个用户。</strong></p>
<h3><a href="#总结"></a>总结</h3>
<p>我们结束了 Zabbix Server 安装的教程。现在，监控基础设施已准备好完成其工作并收集有关需要在 Zabbix 配置中添加的服务器的数据。</p>
<hr>
<p>via: <a href="https://www.unixmen.com/monitoring-server-install-zabbix-ubuntu-16-04/">https://www.unixmen.com/monitoring-server-install-zabbix-ubuntu-16-04/</a></p>
<p>作者：<a href="https://www.unixmen.com/author/tutan/">Giuseppe Molica</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 16.04 Server 上安装 Zabbix

## 原文链接
[https://www.zcfy.cc/article/monitoring-server-install-zabbix-on-an-ubuntu-16-04-server](https://www.zcfy.cc/article/monitoring-server-install-zabbix-on-an-ubuntu-16-04-server)

