---
title: '如何配置 Apache Web 服务器' 
date: 2019-01-20 2:30:11
hidden: true
slug: dv06sy5dpbk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何配置-apache-web-服务器"></a>如何配置 Apache Web 服务器</h1>
<blockquote>
<p>学习如何在 Apache 上托管你自己的网站，这是一个可靠、流行且易于配置的 Web 服务器。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/c0782b04d902073738c77dd24fb8bbdc50a3fdec/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6f70656e7765622d6f7364632d6c6561642e706e673f69746f6b3d796a55344b6c6947"><img src="https://p0.ssl.qhimg.com/t019e8d0d977f5a2bc2.png" alt=""></a></p>
<p>我托管自己的网站已经有很多年了。自从 20 多年前从 OS/2 切换到 Linux 以来，我一直将 <a href="https://httpd.apache.org/">Apache</a> 作为我的服务器软件。Apache 是可靠、流行的，且基本的安装配置也很容易。对于更复杂的设置（比如多个网站）也并不是那么困难。</p>
<p>Apache Web 服务器的安装和配置必须以 root 身份执行。 防火墙的配置也需要以 root 身份执行。 使用浏览器查看安装配置的结果应该以非 root 用户的身份完成。 (我在我的虚拟主机上使用 <code>student</code> 这个用户。)</p>
<h3><a href="#安装"></a>安装</h3>
<p>注意：我使用的实验环境是安装有 Fedora 27 的虚拟机，Apache 版本为 2.4.29。 如果您使用的是不同的发行版或不同版本的 Fedora，您的命令以及配置文件的位置和内容可能会有所不同。 但是，您需要修改的配置行是相同的。</p>
<p>Apache Web 服务器非常容易安装。 在我的 CentOS 6.x 服务器上，它只需要一个简单的 <code>yum</code> 命令。 它会安装所有必要的依赖（如果需要的话）。 我在我的 Fedora 虚拟机上使用了下面的 <code>dnf</code> 命令。 除了命令本身的名称之外， <code>dnf</code> 和 <code>yum</code> 的语法是相同的。</p>
<pre><code class="hljs cmake">dnf -y <span class="hljs-keyword">install</span> httpd

</code></pre><p>这个虚拟机是个非常基础的桌面环境，我正在使用它作为编写书籍的测试平台。 即使在这个系统上，也只安装了六个依赖项，用了一分钟。</p>
<p>Apache 的所有配置文件都位于 <code>/etc/httpd/conf</code> 和 <code>/etc/httpd/conf.d</code> 。网站的数据默认位于 <code>/var/www</code>，但如果你愿意，你可以改变它。</p>
<h3><a href="#配置"></a>配置</h3>
<p>Apache 主要的配置文件是 <code>/etc/httpd/conf/httpd.conf</code> 。 它包含许多在基本安装中不需要更改的配置。 实际上，只需对此文件进行一些更改即可启动并运行一个简单的网站。 该文件非常大，因此，我不会将这篇文章与大量不必要的东西混淆起来，而只会显示那些需要更改的指令。</p>
<p>首先，花点时间熟悉一下 <code>httpd.conf</code> 文件。我喜欢 Red Hat 的一个原因是它的配置文件注释非常的详细。 <code>httpd.conf</code> 文件也不例外，因为它有很好的注释。可以使用这些注释来了解文件的配置。</p>
<p>第一个要修改的是 <code>Listen</code> 配置项，它定义了 Apache 要监听页面请求的 IP 地址和端口。 现在，你只需要使这个网站可以从本地访问，所以使用 <code>localhost</code> 地址。 完成后，该行应该看起来像这样：( LCTT 译注：<code>localhost</code> 的 IP 地址是 <code>127.0.0.1</code>，<code>80</code> 是端口)</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">Listen</span> 127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-pseudo">:80</span>

</code></pre><p>通过将此配置项设置为 <code>localhost</code>的 IP 地址，Apache 将只侦听来自本地主机的连接。 如果您希望 Web 服务器侦听来自远程主机的连接，则可以使用主机的外部 IP 地址。</p>
<p><code>DocumentRoot</code> 配置项指定组成网站页面的 HTML 文件的位置。 该配置项不需要更改，因为它已经指向标准位置。 该行应该看起来像这样：</p>
<pre><code class="hljs apache"><span class="hljs-attribute"><span class="hljs-nomarkup">DocumentRoot</span></span> <span class="hljs-string">"/var/www/html"</span>

</code></pre><p>Apache 安装包会创建 <code>/var/www</code> 目录。 如果您想更改存储网站文件的位置，则使用此配置项来完成此操作。 例如，您可能想要为 <code>www</code> 目录使用不同的名称，以更明确地识别网站。 这可以是这样的：</p>
<pre><code class="hljs apache"><span class="hljs-attribute"><span class="hljs-nomarkup">DocumentRoot</span></span> <span class="hljs-string">"/var/mywebsite/html"</span>

</code></pre><p>这些是创建一个简单网站需要唯一修改的 Apache 配置项。 对于这个小练习，只对 <code>httpd.conf</code> 文件（<code>Listen</code> 配置项）进行了一些修改。 其它的配置项对于一个简单的 Web 服务器暂时无需配置。</p>
<p>另一个需要改变的地方是：在我们的防火墙中打开端口 80。 我使用 <a href="https://en.wikipedia.org/wiki/Iptables">iptables</a> 作为我的防火墙，因此我更改 <code>/etc/sysconfig/iptables</code> 文件以添加允许使用 HTTP 协议。 整个文件看起来像这样：</p>
<pre><code class="hljs pf"><span class="hljs-comment"># sample configuration for iptables service</span>
<span class="hljs-comment"># you can edit this manually or use system-config-firewall</span>
<span class="hljs-comment"># please do not ask us to add additional ports/services to this default configuration</span>
*filter
:INPUT ACCEPT [<span class="hljs-number">0</span>:<span class="hljs-number">0</span>]
:FORWARD ACCEPT [<span class="hljs-number">0</span>:<span class="hljs-number">0</span>]
:OUTPUT ACCEPT [<span class="hljs-number">0</span>:<span class="hljs-number">0</span>]
-A INPUT -m <span class="hljs-keyword">state</span> --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m <span class="hljs-keyword">state</span> --state NEW -m tcp --dport <span class="hljs-number">22</span> -j ACCEPT
-A INPUT -p tcp -m <span class="hljs-keyword">state</span> --state NEW -m tcp --dport <span class="hljs-number">80</span> -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT

</code></pre><p>我在文件的倒数第三行上添加了一个新行，它允许在端口 <code>80</code> 上输入流量。现在我重新加载 iptables 配置文件。</p>
<pre><code class="hljs autoit">[root<span class="hljs-symbol">@testvm1</span> ~]<span class="hljs-meta"># cd /etc/sysconfig/ <span class="hljs-comment">; iptables-restore iptables</span></span>

</code></pre><h3><a href="#创建-indexhtml-文件"></a>创建 index.html 文件</h3>
<p><code>index.html</code> 文件是你使用域名访问网站而不是访问特定网页时的默认文件。在 <code>/var/www/html</code>中，创建一个名字为 <code>index.html</code> 的文件，在其中添加字符串 <code>Hello World</code> 。你不需要添加任何的 HTML 标志去完成这项工作。web 服务器的唯一任务是提供文本数据流，服务器不知道数据是什么，也不知道如何呈现它。它只是将数据流传输给请求主机。</p>
<p>保存文件后，将所有权设置为 <code>apache.apache</code> 。</p>
<pre><code class="hljs css"><span class="hljs-selector-attr">[root@testvm1 html]</span># <span class="hljs-selector-tag">chown</span> <span class="hljs-selector-tag">apache</span><span class="hljs-selector-class">.apache</span> <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>

</code></pre><h3><a href="#启动-apache"></a>启动 Apache</h3>
<p>Apache 很容易启动。 当前版本的 Fedora 使用 systemd 。 运行以下命令启动它，然后检查服务器的状态：（LCTT 译注：<code>systemctl</code> 是一个 systemd 工具）</p>
<pre><code class="hljs dts">[root@testvm1 ~]<span class="hljs-meta"># systemctl start httpd</span>
[root@testvm1 ~]<span class="hljs-meta"># systemctl status httpd</span>
● httpd.service - The Apache HTTP Server
<span class="hljs-symbol">   Loaded:</span> loaded (<span class="hljs-meta-keyword">/usr/</span>lib<span class="hljs-meta-keyword">/systemd/</span>system/httpd.service; disabled; vendor preset: disabled)
<span class="hljs-symbol">   Active:</span> active (running) since Thu <span class="hljs-number">2018</span><span class="hljs-number">-02</span><span class="hljs-number">-08</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">54</span> EST; <span class="hljs-number">5</span>s ago
<span class="hljs-symbol">     Docs:</span> man:httpd.service(<span class="hljs-number">8</span>)
 Main PID: <span class="hljs-number">27107</span> (httpd)
<span class="hljs-symbol">   Status:</span> <span class="hljs-string">"Processing requests..."</span>
<span class="hljs-symbol">    Tasks:</span> <span class="hljs-number">213</span> (limit: <span class="hljs-number">4915</span>)
<span class="hljs-symbol">   CGroup:</span> /system.slice/httpd.service
           ├─<span class="hljs-number">27107</span> <span class="hljs-meta-keyword">/usr/</span>sbin/httpd -DFOREGROUND
           ├─<span class="hljs-number">27108</span> <span class="hljs-meta-keyword">/usr/</span>sbin/httpd -DFOREGROUND
           ├─<span class="hljs-number">27109</span> <span class="hljs-meta-keyword">/usr/</span>sbin/httpd -DFOREGROUND
           ├─<span class="hljs-number">27110</span> <span class="hljs-meta-keyword">/usr/</span>sbin/httpd -DFOREGROUND
           └─<span class="hljs-number">27111</span> <span class="hljs-meta-keyword">/usr/</span>sbin/httpd -DFOREGROUND

Feb <span class="hljs-number">08</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">54</span> testvm1 systemd[<span class="hljs-number">1</span>]: Starting The Apache HTTP Server...
Feb <span class="hljs-number">08</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">54</span> testvm1 systemd[<span class="hljs-number">1</span>]: Started The Apache HTTP Server.

</code></pre><p>您的服务器上的命令可能不同。在使用 SystemV 启动脚本的 Linux 系统上，命令如下：</p>
<pre><code class="hljs routeros">[root@testvm1 ~]#<span class="hljs-built_in"> service </span>httpd start
Starting httpd: [Fri Feb 09 08:18:07 2018]          [  OK  ]
[root@testvm1 ~]#<span class="hljs-built_in"> service </span>httpd status
httpd (pid  14649) is running<span class="hljs-built_in">..</span>.

</code></pre><p>如果您的主机上有像 Firefox 或 Chrome 这样的浏览器，您可以在浏览器的 URL 行上使用 URL <code>localhost</code> 来显示您的 web 页面，尽管看起来很简单。您还可以使用像 <a href="http://lynx.browser.org/">Lynx</a> 这样的文本模式 web 浏览器来查看 web 页面。首先，安装 Lynx (如果它还没有被安装)。</p>
<pre><code class="hljs autoit">[root<span class="hljs-symbol">@testvm1</span> ~]<span class="hljs-meta"># dnf -y install lynx</span>

</code></pre><p>然后使用下面的命令来显示网页。</p>
<pre><code class="hljs autoit">[root<span class="hljs-symbol">@testvm1</span> ~]<span class="hljs-meta"># lynx localhost</span>

</code></pre><p>结果在我的终端中是这样的。我已经删除了页面上的很多空白。</p>
<pre><code class="hljs livecodeserver">  Hello World

&lt;snip&gt;


Commands: Use arrow <span class="hljs-built_in">keys</span> <span class="hljs-built_in">to</span> move, <span class="hljs-string">'?'</span> <span class="hljs-keyword">for</span> help, <span class="hljs-string">'q'</span> <span class="hljs-built_in">to</span> quit, <span class="hljs-string">'&lt;-'</span> <span class="hljs-built_in">to</span> go back.
  Arrow <span class="hljs-built_in">keys</span>: Up <span class="hljs-keyword">and</span> Down <span class="hljs-built_in">to</span> move.  Right <span class="hljs-built_in">to</span> follow <span class="hljs-keyword">a</span> link; Left <span class="hljs-built_in">to</span> go back.
 H)elp O)ptions P)rint G)o M)ain screen Q)uit /=search [<span class="hljs-built_in">delete</span>]=history list
</code></pre><pre><code class="hljs autohotkey">
接下来，编辑您的 `index.html` 文件并添加一些 HTML 标记，使其看起来像这样：

</code></pre><h1>Hello World</h1>

<pre><code class="hljs autohotkey">
现在刷新浏览器。对于 Lynx，使用组合键 `Ctrl + R` 。 结果看起来有点不同。如果你的终端支持彩色的话文本是彩色显示的，Lynx 会显示标题，现在它处于居中状态。 在 GUI 浏览器中，文本将以大字体显示。

</code></pre><pre><code class="hljs ebnf"><span class="hljs-attribute">                               Hello World</span>
</code></pre>&lt;snip&gt;


<p>Commands: Use arrow keys to move, '?' for help, 'q' to quit, '&lt;-' to go back.
  Arrow keys: Up and Down to move.  Right to follow a link; Left to go back.
 H)elp O)ptions P)rint G)o M)ain screen Q)uit /=search [delete]=history list</p>
<p><code>`</code></p>
<h3><a href="#后记"></a>后记</h3>
<p>从这个小练习中可以看到，建立一个 Apache Web 服务器很容易。 具体情况取决于您的发行版和该发行版提供的 Apache 版本。 在我的环境中，这是一个非常简单的练习。</p>
<p>但不仅仅如此，因为 Apache 非常灵活强大。下个月，我将讨论使用单个 Apache 托管多个网站。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/2/how-configure-apache-web-server">https://opensource.com/article/18/2/how-configure-apache-web-server</a></p>
<p>作者：<a href="https://opensource.com/users/dboth">David Both</a> 译者：<a href="https://github.com/amwps290">amwps290</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何配置 Apache Web 服务器

## 原文链接
[https://www.zcfy.cc/article/how-to-configure-an-apache-web-server](https://www.zcfy.cc/article/how-to-configure-an-apache-web-server)

