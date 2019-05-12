---
title: '如何在 Apache 中重定向 URL 到另外一台服务器' 
date: 2019-01-24 2:30:11
hidden: true
slug: 2zkyd6zxw6c
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-apache-中重定向-url-到另外一台服务器"></a>如何在 Apache 中重定向 URL 到另外一台服务器</h1>
<p>如我们前面两篇文章（<a href="http://www.tecmint.com/redirection-with-mod_rewrite-in-apache/">使用 mod_rewrite 执行内部重定向</a>和<a href="http://www.tecmint.com/mod_rewrite-redirect-requests-based-on-browser/">基于浏览器来显示自定义内容</a>）中提到的，在本文中，我们将解释如何在 Apache 中使用 mod_rewrite 模块重定向对已移动到另外一台服务器上的资源的访问。</p>
<p>假设你正在重新设计公司的网站。你已决定将内容和样式（HTML文件、JavaScript 和 CSS）存储在一个服务器上，将文档存储在另一个服务器上 - 这样可能会更稳健。</p>
<p><strong>建议阅读：</strong> <a href="http://www.tecmint.com/apache-performance-tuning/">5 个提高 Apache Web 服务器性能的提示</a> 。</p>
<p>但是，你希望这个更改对用户是透明的，以便他们仍然能够通过之前的网址访问文档。</p>
<p>在下面的例子中，名为 <code>assets.pdf</code> 的文件已从 <code>192.168.0.100</code>（主机名：<code>web</code>）中的 <code>/var/www/html</code> 移动到<code>192.168.0.101</code>（主机名：<code>web2</code>）中的相同位置。</p>
<p>为了让用户在浏览到 <code>192.168.0.100/assets.pdf</code> 时可以访问到此文件，请打开 <code>192.168.0.100</code> 上的 Apache 配置文件并添加以下重写规则（或者也可以将以下规则添加到 <a href="http://www.tecmint.com/tag/htaccess/">.htaccess 文件</a>）中：</p>
<pre><code class="hljs apache"><span class="hljs-attribute"><span class="hljs-nomarkup">RewriteRule</span></span> <span class="hljs-string">"^(/assets\.pdf$)"</span> <span class="hljs-string">"http://192.168.0.101$1"</span> <span class="hljs-meta"> [R,L]</span>

</code></pre><p>其中 <code>$1</code> 占位符，代表与括号中的正则表达式匹配的任何内容。</p>
<p>现在保存更改，不要忘记重新启动 Apache，让我们看看当我们打开 <code>192.168.0.100/assets.pdf</code>，尝试访问 <code>assets.pdf</code> 时会发生什么：</p>
<p><strong>建议阅读：</strong> [25 个有用的网站 .htaccess 技巧] <a href="http://www.tecmint.com/apache-htaccess-tricks/">5</a></p>
<p>在下面我们就可以看到，为 <code>192.168.0.100</code> 上的 <code>assets.pdf</code> 所做的请求实际上是由 <code>192.168.0.101</code> 处理的。</p>
<pre><code class="hljs excel"># tail -<span class="hljs-built_in">n</span> <span class="hljs-number">1</span> /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/apache2/access.log

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Check-Apache-Logs.png"><img src="https://p3.ssl.qhimg.com/t01e358a057898a0553.png" alt="Check Apache Logs"></a></p>
<p><em>检查 Apache 日志</em></p>
<p>在本文中，我们讨论了如何对已移动到其他服务器的资源进行重定向。 总而言之，我强烈建议你看看 <a href="http://mod-rewrite-cheatsheet.com/">mod_rewrite</a> 指南和 <a href="https://httpd.apache.org/docs/2.4/rewrite/remapping.html">Apache 重定向指南</a>，以供将来参考。</p>
<p>一如既往那样，如果您对本文有任何疑虑，请随时使用下面的评论栏回复。 我们期待你的回音！</p>
<hr>
<p>作者简介：Gabriel Cánepa 是来自阿根廷圣路易斯 Villa Mercedes 的 GNU/Linux 系统管理员和 Web 开发人员。 他在一家全球领先的消费品公司工作，非常高兴使用 FOSS 工具来提高他日常工作领域的生产力。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/redirect-website-url-from-one-server-to-different-server/">http://www.tecmint.com/redirect-website-url-from-one-server-to-different-server/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Apache 中重定向 URL 到另外一台服务器

## 原文链接
[https://www.zcfy.cc/article/redirect-a-website-url-from-one-server-to-different-server-in-apache](https://www.zcfy.cc/article/redirect-a-website-url-from-one-server-to-different-server-in-apache)

