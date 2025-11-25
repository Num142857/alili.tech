---
title: '用 Apache 服务器模块保护您的网站免受应用层 DOS 攻击' 
date: 2019-01-21 2:30:06
hidden: true
slug: rch68e1crso
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#用-apache-服务器模块保护您的网站免受应用层-dos-攻击"></a>用 Apache 服务器模块保护您的网站免受应用层 DOS 攻击</h1>
<p>有多种可以导致网站下线的攻击方法，比较复杂的方法要涉及数据库和编程方面的技术知识。一个更简单的方法被称为“拒绝服务Denial Of Service”（DOS）攻击。这个攻击方法的名字来源于它的意图：使普通客户或网站访问者的正常服务请求被拒绝。</p>
<p>一般来说，有两种形式的 DOS 攻击：</p>
<ol>
<li>OSI 模型的三、四层，即网络层攻击</li>
<li>OSI 模型的七层，即应用层攻击</li>
</ol>
<p>第一种类型的 DOS 攻击——网络层，发生于当大量的垃圾流量流向网页服务器时。当垃圾流量超过网络的处理能力时，网站就会宕机。</p>
<p>第二种类型的 DOS 攻击是在应用层，是利用合法的服务请求，而不是垃圾流量。当页面请求数量超过网页服务器能承受的容量时，即使是合法访问者也将无法使用该网站。</p>
<p>本文将着眼于缓解应用层攻击，因为减轻网络层攻击需要大量的可用带宽和上游提供商的合作，这通常不是通过配置网络服务器就可以做到的。</p>
<p>通过配置普通的网页服务器，可以保护网页免受应用层攻击，至少是适度的防护。防止这种形式的攻击是非常重要的，因为 <a href="https://www.cloudflare.com">Cloudflare</a> 最近 <a href="https://blog.cloudflare.com/the-new-ddos-landscape/">报告称</a> 网络层攻击的数量正在减少，而应用层攻击的数量则在增加。</p>
<p>本文将介绍如何使用 <a href="https://www.zdziarski.com/blog/">zdziarski</a> 开发的 Apache2 的模块 <a href="https://github.com/jzdziarski/mod_evasive">mod_evasive</a>。</p>
<p>另外，mod_evasive 会阻止攻击者通过尝试数百个用户名和密码的组合来进行猜测（即暴力攻击）的企图。</p>
<p>mod_evasive 会记录来自每个 IP 地址的请求的数量。当这个数字超过相应 IP 地址的几个阈值之一时，会出现一个错误页面。错误页面所需的资源要比一个能够响应合法访问的在线网站少得多。</p>
<h3><a href="#在-ubuntu-1604-上安装-mod_evasive"></a>在 Ubuntu 16.04 上安装 mod_evasive</h3>
<p>Ubuntu 16.04 默认的软件库中包含了 mod_evasive，名称为 “libapache2-mod-evasive”。您可以使用 <code>apt-get</code> 来完成安装：</p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> update
apt-<span class="hljs-builtin-name">get</span><span class="hljs-built_in"> upgrade
</span>apt-<span class="hljs-builtin-name">get</span> install libapache2-mod-evasive

</code></pre><p>现在我们需要配置 mod_evasive。</p>
<p>它的配置文件位于 <code>/etc/apache2/mods-available/evasive.conf</code>。默认情况下，所有模块的设置在安装后都会被注释掉。因此，在修改配置文件之前，模块不会干扰到网站流量。</p>
<pre><code class="hljs stylus">&lt;IfModule mod_evasive20.c&gt;
   <span class="hljs-selector-id">#DOSHashTableSize</span>    <span class="hljs-number">3097</span>
   <span class="hljs-selector-id">#DOSPageCount</span>        <span class="hljs-number">2</span>
   <span class="hljs-selector-id">#DOSSiteCount</span>        <span class="hljs-number">50</span>
   <span class="hljs-selector-id">#DOSPageInterval</span>     <span class="hljs-number">1</span>
   <span class="hljs-selector-id">#DOSSiteInterval</span>     <span class="hljs-number">1</span>
   <span class="hljs-selector-id">#DOSBlockingPeriod</span>   <span class="hljs-number">10</span>

   <span class="hljs-selector-id">#DOSEmailNotify</span>      you@yourdomain<span class="hljs-selector-class">.com</span>
   <span class="hljs-selector-id">#DOSSystemCommand</span>    <span class="hljs-string">"su - someuser -c '/sbin/... %s ...'"</span>
   <span class="hljs-selector-id">#DOSLogDir</span>           <span class="hljs-string">"/var/log/mod_evasive"</span>
&lt;/IfModule&gt;

</code></pre><p>第一部分的参数的含义如下：</p>
<ul>
<li><code>DOSHashTableSize</code> - 正在访问网站的 IP 地址列表及其请求数的当前列表。</li>
<li><code>DOSPageCount</code> - 在一定的时间间隔内，每个页面的请求次数。时间间隔由 DOSPageInterval 定义。</li>
<li><code>DOSPageInterval</code> - mod_evasive 统计页面请求次数的时间间隔。</li>
<li><code>DOSSiteCount</code> - 与 <code>DOSPageCount</code> 相同，但统计的是来自相同 IP 地址对网站内任何页面的请求数量。</li>
<li><code>DOSSiteInterval</code> - mod_evasive 统计网站请求次数的时间间隔。</li>
<li><code>DOSBlockingPeriod</code> - 某个 IP 地址被加入黑名单的时长（以秒为单位）。</li>
</ul>
<p>如果使用上面显示的默认配置，则在如下情况下，一个 IP 地址会被加入黑名单：</p>
<ul>
<li>每秒请求同一页面超过两次。</li>
<li>每秒请求 50 个以上不同页面。</li>
</ul>
<p>如果某个 IP 地址超过了这些阈值，则被加入黑名单 10 秒钟。</p>
<p>这看起来可能不算久，但是，mod_evasive 将一直监视页面请求，包括在黑名单中的 IP 地址，并重置其加入黑名单的起始时间。只要一个 IP 地址一直尝试使用 DOS 攻击该网站，它将始终在黑名单中。</p>
<p>其余的参数是：</p>
<ul>
<li><code>DOSEmailNotify</code> - 用于接收 DOS 攻击信息和 IP 地址黑名单的电子邮件地址。</li>
<li><code>DOSSystemCommand</code> - 检测到 DOS 攻击时运行的命令。</li>
<li><code>DOSLogDir</code> - 用于存放 mod_evasive 的临时文件的目录。</li>
</ul>
<h3><a href="#配置-mod_evasive"></a>配置 mod_evasive</h3>
<p>默认的配置是一个很好的开始，因为它不会阻塞任何合法的用户。取消配置文件中的所有参数（<code>DOSSystemCommand</code> 除外）的注释，如下所示：</p>
<pre><code class="hljs lsl">&lt;IfModule mod_evasive20.c&gt;
   DOSHashTableSize   <span class="hljs-number">3097</span>
   DOSPageCount       <span class="hljs-number">2</span>
   DOSSiteCount       <span class="hljs-number">50</span>
   DOSPageInterval    <span class="hljs-number">1</span>
   DOSSiteInterval    <span class="hljs-number">1</span>
   DOSBlockingPeriod  <span class="hljs-number">10</span>

   DOSEmailNotify       JohnW@example.com
   #DOSSystemCommand    <span class="hljs-string">"su - someuser -c '/sbin/... %s ...'"</span>
   DOSLogDir            <span class="hljs-string">"/var/log/mod_evasive"</span>
&lt;/IfModule&gt;

</code></pre><p>必须要创建日志目录并且要赋予其与 apache 进程相同的所有者。这里创建的目录是 <code>/var/log/mod_evasive</code> ，并且在 Ubuntu 上将该目录的所有者和组设置为 <code>www-data</code> ，与 Apache 服务器相同：</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">mkdir</span> /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/mod_evasive
chown www-data:www-data /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/mod_evasive

</code></pre><p>在编辑了 Apache 的配置之后，特别是在正在运行的网站上，在重新启动或重新加载之前，最好检查一下语法，因为语法错误将影响 Apache 的启动从而使网站宕机。</p>
<p>Apache 包含一个辅助命令，是一个配置语法检查器。只需运行以下命令来检查您的语法：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">apachectl configtest</span>

</code></pre><p>如果您的配置是正确的，会得到如下结果：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">Syntax OK</span>

</code></pre><p>但是，如果出现问题，您会被告知在哪部分发生了什么错误，例如：</p>
<pre><code class="hljs stata">AH00526: <span class="hljs-keyword">Syntax</span> <span class="hljs-keyword">error</span> <span class="hljs-keyword">on</span> <span class="hljs-keyword">line</span> 6 of /etc/apache2/mods-enabled/evasive.<span class="hljs-keyword">conf</span>:
DOSSiteInterval takes <span class="hljs-keyword">one</span> argument, <span class="hljs-keyword">Set</span> site interval
Action 'configtest' failed.
The Apache <span class="hljs-keyword">error</span> <span class="hljs-keyword">log</span> may have <span class="hljs-keyword">more</span> information.

</code></pre><p>如果您的配置通过了 configtest 的测试，那么这个模块可以安全地被启用并且 Apache 可以重新加载：</p>
<pre><code class="hljs stylus">a2enmod evasive
systemctl reload apache2<span class="hljs-selector-class">.service</span>

</code></pre><p>mod_evasive 现在已配置好并正在运行了。</p>
<h3><a href="#测试"></a>测试</h3>
<p>为了测试 mod_evasive，我们只需要向服务器提出足够的网页访问请求，以使其超出阈值，并记录来自 Apache 的响应代码。</p>
<p>一个正常并成功的页面请求将收到如下响应：</p>
<pre><code class="hljs http">HTTP/1.1 <span class="hljs-number">200</span> OK

<span class="undefined"></span></code></pre><p>但是，被 mod_evasive 拒绝的将返回以下内容：</p>
<pre><code class="hljs http">HTTP/1.1 <span class="hljs-number">403</span> Forbidden

<span class="undefined"></span></code></pre><p>以下脚本会尽可能迅速地向本地主机（127.0.0.1，localhost）的 80 端口发送 HTTP 请求，并打印出每个请求的响应代码。</p>
<p>你所要做的就是把下面的 bash 脚本复制到一个文件中，例如 <code>mod_evasive_test.sh</code>：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-built_in">set</span> -e

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> {1..50}; <span class="hljs-keyword">do</span>
        curl -s -I 127.0.0.1 | head -n 1
<span class="hljs-keyword">done</span>

</code></pre><p>这个脚本的部分含义如下：</p>
<ul>
<li><code>curl</code> - 这是一个发出网络请求的命令。<ul>
<li><code>-s</code> - 隐藏进度表。</li>
<li><code>-I</code> - 仅显示响应头部信息。</li>
</ul>
</li>
<li><code>head</code> - 打印文件的第一部分。<ul>
<li><code>-n 1</code> - 只显示第一行。</li>
</ul>
</li>
</ul>
<p>然后赋予其执行权限：</p>
<pre><code class="hljs stylus">chmod <span class="hljs-number">755</span> mod_evasive_test<span class="hljs-selector-class">.sh</span>

</code></pre><p>在启用 mod_evasive <strong>之前</strong>，脚本运行时，将会看到 50 行 “HTTP / 1.1 200 OK” 的返回值。</p>
<p>但是，启用 mod_evasive 后，您将看到以下内容：</p>
<pre><code class="hljs lsl">HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">403</span> Forbidden
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">403</span> Forbidden
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">403</span> Forbidden
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">403</span> Forbidden
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">403</span> Forbidden
...

</code></pre><p>前两个请求被允许，但是在同一秒内第三个请求发出时，mod_evasive 拒绝了任何进一步的请求。您还将收到一封电子邮件（邮件地址在选项 <code>DOSEmailNotify</code> 中设置），通知您有 DOS 攻击被检测到。</p>
<p>mod_evasive 现在已经在保护您的网站啦！</p>
<hr>
<p>via: <a href="https://bash-prompt.net/guides/mod_proxy/">https://bash-prompt.net/guides/mod_proxy/</a></p>
<p>作者：<a href="https://bash-prompt.net/about/">Elliot Cooper</a> 译者：<a href="https://github.com/jessie-pang">jessie-pang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Apache 服务器模块保护您的网站免受应用层 DOS 攻击

## 原文链接
[https://www.zcfy.cc/article/protecting-your-website-from-application-layer-dos-attacks-with-mod](https://www.zcfy.cc/article/protecting-your-website-from-application-layer-dos-attacks-with-mod)

