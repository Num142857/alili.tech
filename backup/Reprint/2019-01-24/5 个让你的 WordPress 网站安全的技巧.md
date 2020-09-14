---
title: '5 个让你的 WordPress 网站安全的技巧' 
date: 2019-01-24 2:30:11
hidden: true
slug: v3l9lb7xhxc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#5-个让你的-wordpress-网站安全的技巧"></a>5 个让你的 WordPress 网站安全的技巧</h1>
<p>WordPress 是迄今为止最流行的博客平台。</p>
<p>正由于它的流行，也因此带来了正面和负面的影响。事实上，几乎每个人都使用它，使它更容易被发现漏洞。WordPress 的开发人员做了很多工作，一旦新的缺陷被发现，就会发布修复和补丁，但这并不意味着你可以安装完就置之脑后。</p>
<p>在这篇文章中，我们将提供一些最常见的保护和强化 WordPress 网站的方法。</p>
<h3><a href="#在登录后台时总是使用-ssl"></a>在登录后台时总是使用 SSL</h3>
<p>不用说的是，如果你并不打算只是做一个随意的博客，你应该总是使用 SSL。不使用加密连接登录到你的网站会暴露你的用户名和密码。任何人嗅探流量都可能会发现你的密码。如果你使用 WiFi 上网或者连接到一个公共热点，那么你被黑的几率更高，这是特别真实的。你可以从<a href="https://letsencrypt.org/">这里</a>获取受信任的免费 SSL 证书。</p>
<h3><a href="#精心挑选附加的插件"></a>精心挑选附加的插件</h3>
<p>由第三方开发人员所开发，每个插件的质量和安全性总是值得怀疑，并且它仅取决于其开发人员的经验。当安装任何额外的插件时，你应该仔细选择，并考虑其受欢迎程度以及插件的维护频率。应该避免维护不良的插件，因为它们更容易出现易于被利用的错误和漏洞。</p>
<p>此主题也是上一个关于 SSL 主题的补充，因为许多插件包含的脚本会发出不安全连接（HTTP）的请求。只要你的网站通过 HTTP 访问，一切似乎很好。但是，一旦你决定使用加密并强制使用 SSL 访问，则会立即导致网站的功能被破坏，因为当你使用 HTTPS 访问其他网站时，这些插件上的脚本将继续通过 HTTP 提供请求。</p>
<h3><a href="#安装-wordfence"></a>安装 Wordfence</h3>
<p>Wordfence 是由 Feedjit Inc. 开发的，Wordfence 是目前最流行的 WordPress 安全插件，并且是每个严肃的 WordPress 网站必备的，特别是那些使用 <a href="https://www.rosehosting.com/woocommerce-hosting.html">WooCommerce</a> 或其它的 WordPress 电子商务平台的网站。</p>
<p>Wordfence 不只是一个插件，因为它提供了一系列加强您的网站的安全功能。它具有 web 程序防火墙、恶意软件扫描、实时流量分析器和各种其它工具，它们可以提高你网站的安全性。防火墙将默认阻止恶意登录尝试，甚至可以配置为按照 IP 地址范围来阻止整个国家/地区的访问。我们真正喜欢 Wordfence 的原因是，即使你的网站因为某些原因被侵害，例如恶意脚本，Wordfence 可以在安装以后扫描和清理你的网站上被感染的文件。</p>
<p>该公司提供这个插件的免费和付费订阅计划，但即使是免费计划，你的网站仍将获得令人满意的水平。</p>
<h3><a href="#用额外的密码锁住-wp-admin-和-wp-loginphp"></a>用额外的密码锁住 /wp-admin 和 /wp-login.php</h3>
<p>保护你的 WordPress 后端的另一个步骤是使用额外的密码保护任何除了你以外不打算让任何人使用的目录（即URL）。 /wp-admin 目录属于此关键目录列表。 如果你不允许普通用户登录 WordPress，你应该使用密码限制对 wp.login.php 文件的访问。无论是使用 <a href="https://www.rosehosting.com/blog/password-protect-a-directory-using-htaccess/">Apache</a> 还是 <a href="https://www.rosehosting.com/blog/password-protecting-directories-with-nginx/">Nginx</a>，你都可以访问这两篇文章，了解如何额外保护 WordPress 安装。</p>
<h3><a href="#禁用停止用户枚举"></a>禁用/停止用户枚举</h3>
<p>这是攻击者发现你网站上的有效用户名的一种相当简单的方法（即找出管理员用户名）。那么它是如何工作的？这很简单。在任何 WordPress 站点上的主要 URL 后面跟上 <code>/?author=1</code> 即可。 例如：<code>wordpressexample.com/?author=1</code>。</p>
<p>要保护您的网站免受此影响，只需安装<a href="https://wordpress.org/plugins/stop-user-enumeration/">停止用户枚举</a>插件。</p>
<h3><a href="#禁用-xml-rpc"></a>禁用 XML-RPC</h3>
<p>RPC 代表远程过程调用，它可以用来从位于网络上另一台计算机上的程序请求服务的协议。对于 WordPress 来说，XML-RPC 允许你使用流行的网络博客客户端（如 Windows Live Writer）在你的 WordPress 博客上发布文章，如果你使用 WordPress 移动应用程序那么也需要它。 XML-RPC 在早期版本中被禁用，但是从 WordPress 3.5 时它被默认启用，这让你的网站面临更大的攻击可能。虽然各种安全研究人员建议这不是一个大问题，但如果你不打算使用网络博客客户端或 WP 的移动应用程序，你应该禁用 XML-RPC 服务。</p>
<p>有多种方法可以做到这一点，最简单的是安装<a href="https://wordpress.org/plugins/disable-xml-rpc/">禁用 XML-RPC</a>插件。</p>
<hr>
<p>via: <a href="https://www.rosehosting.com/blog/5-tips-for-securing-your-wordpress-sites/">https://www.rosehosting.com/blog/5-tips-for-securing-your-wordpress-sites/</a></p>
<p>作者：<a href="">rosehosting.com</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
5 个让你的 WordPress 网站安全的技巧

## 原文链接
[https://www.zcfy.cc/article/5-essential-tips-for-securing-your-wordpress-sites](https://www.zcfy.cc/article/5-essential-tips-for-securing-your-wordpress-sites)

