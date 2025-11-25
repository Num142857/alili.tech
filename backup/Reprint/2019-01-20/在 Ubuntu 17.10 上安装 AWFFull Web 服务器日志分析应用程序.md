---
title: '在 Ubuntu 17.10 上安装 AWFFull Web 服务器日志分析应用程序' 
date: 2019-01-20 2:30:11
hidden: true
slug: 77njp2pi3it
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-ubuntu-1710-上安装-awffull-web-服务器日志分析应用程序"></a>在 Ubuntu 17.10 上安装 AWFFull Web 服务器日志分析应用程序</h1>
<p>AWFFull 是基于 “Webalizer” 的 Web 服务器日志分析程序。AWFFull 以 HTML 格式生成使用统计信息以便用浏览器查看。结果以柱状和图形两种格式显示，这有利于解释数据。它提供每年、每月、每日和每小时的使用统计数据，并显示网站、URL、referrer、user agent（浏览器）、用户名、搜索字符串、进入/退出页面和国家（如果一些信息不存在于处理后日志中那么就没有）。AWFFull 支持 CLF（通用日志格式）日志文件，以及由 NCSA 等定义的组合日志格式，它还能只能地处理这些格式的变体。另外，AWFFull 还支持 wu-ftpd xferlog 格式的日志文件，它能够分析 ftp 服务器和 squid 代理日志。日志也可以通过 gzip 压缩。</p>
<p>如果检测到压缩日志文件，它将在读取时自动解压缩。压缩日志必须是 .gz 扩展名的标准 gzip 压缩。</p>
<h3><a href="#对于-webalizer-的修改"></a>对于 Webalizer 的修改</h3>
<p>AWFFull 基于 Webalizer 的代码，并有许多或大或小的变化。包括：</p>
<ul>
<li>不止原始统计数据：利用已发布的公式，提供额外的网站使用情况。</li>
<li>GeoIP IP 地址能更准确地检测国家。</li>
<li>可缩放的图形</li>
<li>与 GNU gettext 集成，能够轻松翻译。目前支持 32 种语言。</li>
<li>在首页显示超过 12 个月的网站历史记录。</li>
<li>额外的页面计数跟踪和排序。</li>
<li>一些小的可视化调整，包括 Geolizer 用量中使用 Kb、Mb。</li>
<li>额外的用于 URL 计数、进入和退出页面、站点的饼图</li>
<li>图形上的水平线更有意义，更易于阅读。</li>
<li>User Agent 和 Referral 跟踪现在通过 PAGES 而非 HITS 进行计算。</li>
<li>现在支持 GNU 风格的长命令行选项（例如 --help）。</li>
<li>可以通过排除“什么不是”以及原始的“什么是”来选择页面。</li>
<li>对被分析站点的请求以匹配的引用 URL 显示。</li>
<li>404 错误表，并且可以生成引用 URL。</li>
<li>生成的 html 可以使用外部 CSS 文件。</li>
<li>POST 分析总结使得手动优化配置文件性能更简单。</li>
<li>可以将指定的 IP 和地址分配给指定的国家。</li>
<li>便于使用其他工具详细分析的转储选项。</li>
<li>支持检测并处理 Lotus Domin- v6 日志。</li>
</ul>
<h3><a href="#在-ubuntu-1710-上安装-awffull"></a>在 Ubuntu 17.10 上安装 AWFFull</h3>
<pre><code class="hljs routeros">sud- apt-<span class="hljs-builtin-name">get</span> install awffull

</code></pre><h3><a href="#配置-awffull"></a>配置 AWFFull</h3>
<p>你必须在 <code>/etc/awffull/awffull.conf</code> 中编辑 AWFFull 配置文件。如果你在同一台计算机上运行多个虚拟站点，​​则可以制作多个默认配置文件的副本。</p>
<pre><code class="hljs stylus">sud- vi /etc/awffull/awffull<span class="hljs-selector-class">.conf</span>

</code></pre><p>确保有下面这几行：</p>
<pre><code class="hljs awk">LogFile <span class="hljs-regexp">/var/</span>log<span class="hljs-regexp">/apache2/</span>access.log.<span class="hljs-number">1</span>
OutputDir <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/html/</span>awffull

</code></pre><p>保存并退出文件。</p>
<p>你可以使用以下命令运行 awffull。</p>
<pre><code class="hljs routeros">awffull -c [your<span class="hljs-built_in"> config </span>file name]

</code></pre><p>这将在 <code>/var/www/html/awffull</code> 目录下创建所有必需的文件，以便你可以使用 <a href="http://serverip/awffull/">http://serverip/awffull/</a> 。</p>
<p>你应该看到类似于下面的页面：</p>
<p><a href="https://camo.githubusercontent.com/657cc3559f0a0115422855cd6d94bada5cbb3d46/687474703a2f2f7777772e7562756e74756765656b2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031352f31322f31312e706e67"><img src="https://p0.ssl.qhimg.com/t01771d6cde2c5129a5.png" alt=""></a></p>
<p>如果你有更多站点，你可以使用 shell 和计划任务自动化这个过程。</p>
<hr>
<p>via: <a href="http://www.ubuntugeek.com/install-awffull-web-server-log-analysis-application-on-ubuntu-17-10.html">http://www.ubuntugeek.com/install-awffull-web-server-log-analysis-application-on-ubuntu-17-10.html</a></p>
<p>作者：<a href="http://www.ubuntugeek.com/author/ubuntufix">ruchi</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Ubuntu 17.10 上安装 AWFFull Web 服务器日志分析应用程序

## 原文链接
[https://www.zcfy.cc/article/install-awffull-web-server-log-analysis-application-on-ubuntu-17-10](https://www.zcfy.cc/article/install-awffull-web-server-log-analysis-application-on-ubuntu-17-10)

