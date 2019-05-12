---
title: '使用 Ganglia 对 linux 网格和集群服务器进行实时监控' 
date: 2019-01-24 2:30:11
hidden: true
slug: y0f50jwa5e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-ganglia-对-linux-网格和集群服务器进行实时监控"></a>使用 Ganglia 对 linux 网格和集群服务器进行实时监控</h1>
<p>从系统管理员接手服务器和主机管理以来，像应用监控这样的工具就成了他们的好帮手。其中比较有名的有 [Nagios][11]、 [Zabbix][10]、 [Icinga][9] 和 Centreon。以上这些是重量级的监控工具，让一个新手管理员来设置，并使用其中的高级特性是有些困难的。</p>
<p>本文将向你介绍 Ganglia，它是一个易于扩展的监控系统。使用它可以实时查看 Linux 服务器和集群（图形化展示）中的各项性能指标。</p>
<p><a href="https://camo.githubusercontent.com/8140782124c07e3243146c65aef35f21259ff3e8/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f30362f496e7374616c6c2d47616e67696c612d4d6f6e69746f72696e672d696e2d4c696e75782e706e67"><img src="https://p0.ssl.qhimg.com/t01b9a0b57a5ea6d811.png" alt="Install Gangila Monitoring in Linux"></a></p>
<p><em>在 Linux 上安装 Ganglia</em></p>
<p><strong>Ganglia</strong> 能够让你以<strong>集群</strong>（按服务器组）和<strong>网格</strong>（按地理位置）的方式更好地组织服务器。</p>
<p>这样，我们可以创建一个包含所有远程主机的网格，然后将那些机器按照其它标准分组成小的集合。</p>
<p>此外， Ganglia 的 web 页面对移动设备进行过优化，也允许你导出 <code>csv</code> 和 <code>.json</code> 格式的数据。</p>
<p>我们的测试环境包括一个安装 Ganglia 的主节点服务器 CentOS 7 （IP 地址 192.168.0.29），和一个作为被监控端的 Ubuntu 14.04 主机（192.168.0.32）。我们将通过 Ganglia 的 Web 页面来监控这台 Ubuntu 主机。</p>
<p>下面的例子可以给大家提供参考，CentOS7 作为主节点，Ubuntu 作为被监控对象。</p>
<h3><a href="#安装和配置-ganglia"></a>安装和配置 Ganglia</h3>
<p>请遵循以下步骤，在主节点服务器安装监控工具。</p>
<p>1、 启用 [EPEL 仓库][7] ，然后安装 Ganglia 和相关工具：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum update &amp;&amp; yum install epel-release</span>
<span class="hljs-meta">#</span><span class="bash"> yum install ganglia rrdtool ganglia-gmetad ganglia-gmond ganglia-web</span>

</code></pre><p>在上面这步随 Ganglia 将安装一些应用，它们的功能如下：</p>
<ul>
<li><code>rrdtool</code>，Round-Robin 数据库，它是一个储存并图形化显示随着时间变化的数据的工具；</li>
<li><code>ganglia-gmetad</code> 一个守护进程，用来收集被监控主机的数据。被监控主机与主节点主机都要安装 Ganglia-gmond（监控守护进程本身）；</li>
<li><code>ganglia-web</code> 提供 Web 前端，用于显示监控系统的历史数据和图形。   2、 使用 Apache 提供的基本认证功能，为 Ganglia Web 界面（<code>/usr/share/ganglia</code>）配置身份认证。</li>
</ul>
<p>如果你想了解更多高级安全机制，请参阅 Apache 文档的 [授权与认证][6]部分。</p>
<p>为完成这个目标，我们需要创建一个用户名并设定一个密码，以访问被 Apache 保护的资源。在本例中，我们先来创建一个叫 <code>adminganglia</code> 的用户名，然后给它分配一个密码，它将被储存在 <code>/etc/httpd/auth.basic</code>（可以随意选择另一个目录 和/或 文件名， 只要 Apache 对此有读取权限就可以。） </p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> htpasswd -c /etc/httpd/auth.basic adminganglia</span>

</code></pre><p>给 adminganglia 输入两次密码完成密码设置。</p>
<p>3、 修改配置文件 <code>/etc/httpd/conf.d/ganglia.conf</code>：</p>
<pre><code class="hljs jboss-cli">Alias <span class="hljs-string">/ganglia</span> <span class="hljs-string">/usr/share/ganglia</span>
&lt;Location <span class="hljs-string">/ganglia</span>&gt;
AuthType basic
AuthName <span class="hljs-string">"Ganglia web UI"</span>
AuthBasicProvider file
AuthUserFile <span class="hljs-string">"/etc/httpd/auth.basic"</span>
Require user adminganglia
&lt;<span class="hljs-string">/Location</span>&gt;

</code></pre><p>4、 编辑 <code>/etc/ganglia/gmetad.conf</code>：</p>
<p>首先，使用 <code>gridname</code> 指令来为网格设置一个描述性名称。</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">gridname</span> <span class="hljs-string">"Home office"</span>

</code></pre><p>然后，使用 <code>data_source</code> 指令，后面跟集群名（服务器组）、轮询时间间隔（秒）、主节点主机和被监控节点的 IP 地址：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">data_source</span> "<span class="hljs-selector-tag">Labs</span>" 60 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.29</span><span class="hljs-selector-pseudo">:8649</span> # 主节点
<span class="hljs-selector-tag">data_source</span> "<span class="hljs-selector-tag">Labs</span>" 60 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.32</span> # 被监控节点

</code></pre><p>5、 编辑 <code>/etc/ganglia/gmond.conf</code>。</p>
<p>a) 确保集群的配置类似下面。</p>
<pre><code class="hljs makefile">cluster {
name = <span class="hljs-string">"Labs"</span> <span class="hljs-comment"># gmetad.conf 中的  data_source 指令的名字</span>
owner = <span class="hljs-string">"unspecified"</span>
latlong = <span class="hljs-string">"unspecified"</span>
url = <span class="hljs-string">"unspecified"</span>
}

</code></pre><p>b) 在 <code>udp_send_chanel</code> 中，注释掉 <code>mcast_join</code>：</p>
<pre><code class="hljs routeros">udp_send_channel   {
<span class="hljs-comment"># mcast_join = 239.2.11.71</span>
host = localhost<span class="hljs-built_in">
port </span>= 8649
ttl = 1
}

</code></pre><p>c) 在 <code>udp_recv_channel</code> 中，注释掉 <code>mcast_join</code> 和 <code>bind</code> 部分：</p>
<pre><code class="hljs routeros">udp_recv_channel {
<span class="hljs-comment"># mcast_join = 239.2.11.71 ## comment out</span><span class="hljs-built_in">
port </span>= 8649
<span class="hljs-comment"># bind = 239.2.11.71 ## comment out</span>
}

</code></pre><p>保存并退出。</p>
<p>6、打开 8649/udp 端口，使用 SELinux 确保 php 脚本（通过 Apache 运行）能够连接到网络：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> firewall-cmd --add-port=8649/udp</span>
<span class="hljs-meta">#</span><span class="bash"> firewall-cmd --add-port=8649/udp --permanent</span>
<span class="hljs-meta">#</span><span class="bash"> setsebool -P httpd_can_network_connect 1</span>

</code></pre><p>7、重启 Apache、gmetad、gmond，并确保它们启用了“开机启动”。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart httpd gmetad gmond</span>
<span class="hljs-meta">#</span><span class="bash"> systemctl <span class="hljs-built_in">enable</span> httpd gmetad httpd</span>

</code></pre><p>至此，我们现在能够打开 Ganglia 的 Web 页面 <code>http://192.168.0.29/ganglia</code> 并用步骤 2 中设置的凭证登录。</p>
<p>[<a href="https://camo.githubusercontent.com/b048e3d717f35d1f1c08c121571ae4bd9f56b030/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f30362f47616e67696c612d5765622d496e746572666163652e706e67"><img src="https://p4.ssl.qhimg.com/t01ed7f3c2e16a37f67.png" alt="Gangila Web Interface"></a>][5]</p>
<p><em>Gangila Web 页面</em></p>
<p>8、 在 <strong>Ubuntu</strong> 主机上，只需安装 Ganglia-monitor，等同于 CentOS 上的 ganglia-gmond：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo aptitude update &amp;&amp; aptitude install ganglia-monitor</span>


</code></pre><p>9、 编辑被监控主机的 <code>/etc/ganglia/gmond.conf</code> 文件。与主节点主机上是相同的文件，除了被注释掉的 <code>cluster</code>, <code>udp_send_channel</code> ， <code>udp_recv_channel</code> 这里不应被注释：</p>
<pre><code class="hljs makefile">cluster {
name = <span class="hljs-string">"Labs"</span> <span class="hljs-comment"># The name in the data_source directive in gmetad.conf</span>
owner = <span class="hljs-string">"unspecified"</span>
latlong = <span class="hljs-string">"unspecified"</span>
url = <span class="hljs-string">"unspecified"</span>
}
udp_send_channel   {
mcast_join = 239.2.11.71
host = localhost
port = 8649
ttl = 1
}
udp_recv_channel {
mcast_join = 239.2.11.71 <span class="hljs-comment">## comment out</span>
port = 8649
bind = 239.2.11.71 <span class="hljs-comment">## comment out</span>
}

</code></pre><p>之后重启服务。</p>
<pre><code class="hljs routeros">$ sudo<span class="hljs-built_in"> service </span>ganglia-monitor restart

</code></pre><p>10、 刷新页面，你将在 Home office grid / Labs cluster 中看到两台主机的各种统计及图形化的展示（用下拉菜单选择集群，本例中为 Labs）：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/06/Ganglia-Home-Office-Grid-Report.png"><img src="https://p2.ssl.qhimg.com/t0107493eff58f6446b.png" alt="Ganglia Home Office Grid Report"></a></p>
<p><em>Ganglia 中 Home office 网格报告</em></p>
<p>使用菜单按钮（如上指出的），你可以获取到每台服务器和集群的信息。还可以使用 对比主机Compare Hosts选项卡来比较集群中所有服务器的状态。</p>
<p>可以使用正则表达式选择一组服务器，立刻就可以看到它们性能的对比：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/06/Ganglia-Server-Information.png"><img src="https://p0.ssl.qhimg.com/t0161fd491885e1a89c.png" alt="Ganglia Host Server Information"></a></p>
<p><em>Ganglia 服务器信息</em></p>
<p>我最喜欢的一个特点是对移动端有友好的总结界面，可以通过 Mobile 选项来访问。选择你感兴趣的集群，然后选中一个主机。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/06/Ganglia-Mobile-View.png"><img src="https://p3.ssl.qhimg.com/t017f080960956622f4.png" alt="Ganglia Mobile Friendly Summary View"></a></p>
<p><em>Ganglia 移动端总结截图</em></p>
<h3><a href="#总结"></a>总结</h3>
<p>本篇文章向大家介绍了 Ganglia，它是一个功能强大、扩展性很好的监控工具，主要用来监控集群和网格。它可以随意安装，便捷的组合各种功能（你甚至可以尝试一下<a href="http://ganglia.info/">官方网站</a> 提供的 Demo）。</p>
<p>此时，你可能会发现许多知名的 IT 或非 IT 的企业在使用 Ganglia。除了我们在文章中提及的之外，还有很多理由这样做，其中易用性，统计的图形化（在名字旁附上脸部照片更清晰，不是吗）可能是最重要的原因。</p>
<p>但是请不要拘泥于本篇文章，尝试一下自己去做。如果你有任何问题，欢迎给我留言。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/install-configure-ganglia-monitoring-centos-linux/">http://www.tecmint.com/install-configure-ganglia-monitoring-centos-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/ivo-wang">ivo-wang</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 组织编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>
<p>[5]:<a href="http://www.tecmint.co">http://www.tecmint.co</a> m/wp-content/uploads/2016/06/Gangila-Web-Interface.png [6]:<a href="http://httpd.apache.org/docs/current/howto/auth.html">http://httpd.apache.org/docs/current/howto/auth.html</a> [7]:<a href="https://linux.cn/article-2324-1.html">https://linux.cn/article-2324-1.html</a> [8]:<a href="http://www.tecmint.com/wp-content/uploads/2016/06/">http://www.tecmint.com/wp-content/uploads/2016/06/</a> Install-Gangila-Monitoring-in-Linux.png [9]:<a href="http://www.tecmint.com/install-icinga-in-centos-7/">http://www.tecmint.com/install-icinga-in-centos-7/</a> [10]:<a href="http://www.tecmint.com/install-and-configure-zabbix-monitoring-on-debian-centos-rhel/">http://www.tecmint.com/install-and-configure-zabbix-monitoring-on-debian-centos-rhel/</a> [11]:<a href="http://www.tecmint.com/install-nagios-in-linux/">http://www.tecmint.com/install-nagios-in-linux/</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Ganglia 对 linux 网格和集群服务器进行实时监控

## 原文链接
[https://www.zcfy.cc/article/setting-up-real-time-monitoring-with-ganglia](https://www.zcfy.cc/article/setting-up-real-time-monitoring-with-ganglia)

