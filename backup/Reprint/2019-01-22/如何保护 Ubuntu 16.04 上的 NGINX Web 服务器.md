---
title: '如何保护 Ubuntu 16.04 上的 NGINX Web 服务器' 
date: 2019-01-22 2:30:08
hidden: true
slug: oinx8sne408
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何保护-ubuntu-1604-上的-nginx-web-服务器"></a>如何保护 Ubuntu 16.04 上的 NGINX Web 服务器</h1>
<h3><a href="#什么是-lets-encrypt"></a>什么是 Let’s Encrypt</h3>
<p><a href="https://letsencrypt.org/">Let’s Encrypt</a> 是互联网安全研究组织 （ISRG） 提供的免费证书认证机构。它提供了一种轻松自动的方式来获取免费的 SSL/TLS 证书 - 这是在 Web 服务器上启用加密和 HTTPS 流量的必要步骤。获取和安装证书的大多数步骤可以通过使用名为 <a href="https://certbot.eff.org/">Certbot</a> 的工具进行自动化。</p>
<p>特别地，该软件可在可以使用 shell 的服务器上使用：换句话说，它可以通过 SSH 连接使用。</p>
<p>在本教程中，我们将看到如何使用 <code>certbot</code> 获取免费的 SSL 证书，并在 Ubuntu 16.04 服务器上使用 Nginx。</p>
<h3><a href="#安装-certbot"></a>安装 Certbot</h3>
<p>第一步是安装 <code>certbot</code>，该软件客户端可以几乎自动化所有的过程。 Certbot 开发人员维护自己的 Ubuntu 仓库，其中包含比 Ubuntu 仓库中存在的软件更新的软件。</p>
<p>添加 Certbot 仓库：</p>
<pre><code class="hljs vim"># <span class="hljs-built_in">add</span>-apt-repository <span class="hljs-keyword">pp</span><span class="hljs-variable">a:certbot</span>/certbot

</code></pre><p>接下来，更新 APT 源列表：</p>
<pre><code class="hljs q"># apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><p>此时，可以使用以下 <code>apt</code> 命令安装 <code>certbot</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> apt-get install certbot</span>

</code></pre><p>Certbot 现已安装并可使用。</p>
<h3><a href="#获得证书"></a>获得证书</h3>
<p>有各种 Certbot 插件可用于获取 SSL 证书。这些插件有助于获取证书，而证书的安装和 Web 服务器配置都留给管理员。</p>
<p>我们使用一个名为 <strong>Webroot</strong> 的插件来获取 SSL 证书。</p>
<p>在有能力修改正在提供的内容的情况下，建议使用此插件。在证书颁发过程中不需要停止 Web 服务器。</p>
<h4><a href="#配置-nginx"></a>配置 NGINX</h4>
<p>Webroot 会在 Web 根目录下的 <code>.well-known</code> 目录中为每个域创建一个临时文件。在我们的例子中，Web 根目录是 <code>/var/www/html</code>。确保该目录在 Let’s Encrypt 验证时可访问。为此，请编辑 NGINX 配置。使用文本编辑器打开 <code>/etc/nginx/sites-available/default</code>：</p>
<pre><code class="hljs gradle"># $EDITOR <span class="hljs-regexp">/etc/</span>nginx<span class="hljs-regexp">/sites-available/</span><span class="hljs-keyword">default</span>

</code></pre><p>在该文件中，在 <code>server</code> 块内，输入以下内容：</p>
<pre><code class="hljs crmsh"> <span class="hljs-keyword">location</span> <span class="hljs-title">~ /.well-known</span> {
    allow all;
 }

</code></pre><p>保存，退出并检查 NGINX 配置：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> nginx -t</span>

</code></pre><p>没有错误的话应该会显示如下：</p>
<pre><code class="hljs vim">nginx: the configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> <span class="hljs-keyword">syntax</span> <span class="hljs-keyword">is</span> ok
nginx: configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> test <span class="hljs-keyword">is</span> successful

</code></pre><p>重启 NGINX：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart nginx</span>

</code></pre><h4><a href="#使用-certbot-获取证书"></a>使用 Certbot 获取证书</h4>
<p>下一步是使用 Certbot 的 Webroot 插件获取新证书。在本教程中，我们将保护示例域 <a href="http://www.example.com%E3%80%82%E9%9C%80%E8%A6%81%E6%8C%87%E5%AE%9A%E5%BA%94%E7%94%B1%E8%AF%81%E4%B9%A6%E4%BF%9D%E6%8A%A4%E7%9A%84%E6%AF%8F%E4%B8%AA%E5%9F%9F%E3%80%82%E6%89%A7%E8%A1%8C%E4%BB%A5%E4%B8%8B%E5%91%BD%E4%BB%A4%EF%BC%9A">www.example.com。需要指定应由证书保护的每个域。执行以下命令：</a></p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">#</span> <span class="hljs-comment">certbot</span> <span class="hljs-comment">certonly</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">webroot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">webroot</span><span class="hljs-literal">-</span><span class="hljs-comment">path=/var/www/html</span> <span class="hljs-literal">-</span><span class="hljs-comment">d</span> <span class="hljs-comment">www</span><span class="hljs-string">.</span><span class="hljs-comment">example</span><span class="hljs-string">.</span><span class="hljs-comment">com</span>

</code></pre><p>在此过程中，Cerbot 将询问有效的电子邮件地址，用于进行通知。还会要求与 EFF 分享，但这不是必需的。在同意服务条款之后，它将获得一个新的证书。</p>
<p>最后，目录 <code>/etc/letsencrypt/archive</code> 将包含以下文件：</p>
<ul>
<li><code>chain.pem</code>：Let’s Encrypt 加密链证书。</li>
<li><code>cert.pem</code>：域名证书。</li>
<li><code>fullchain.pem</code>：<code>cert.pem</code>和 <code>chain.pem</code> 的组合。</li>
<li><code>privkey.pem</code>：证书的私钥。</li>
</ul>
<p>Certbot 还将创建符号链接到 <code>/etc/letsencrypt/live/domain_name/</code> 中的最新证书文件。这是我们将在服务器配置中使用的路径。</p>
<h3><a href="#在-nginx-上配置-ssltls"></a>在 NGINX 上配置 SSL/TLS</h3>
<p>下一步是服务器配置。在 <code>/etc/nginx/snippets/</code> 中创建一个新的代码段。 <strong>snippet</strong> 是指一段配置，可以包含在虚拟主机配置文件中。如下创建一个新的文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-variable">$EDITOR</span> /etc/nginx/snippets/secure-example.conf</span>

</code></pre><p>该文件的内容将指定证书和密钥位置。粘贴以下内容：</p>
<pre><code class="hljs dts">ssl_certificate <span class="hljs-meta-keyword">/etc/</span>letsencrypt<span class="hljs-meta-keyword">/live/</span>domain_name/fullchain.pem;
ssl_certificate_key <span class="hljs-meta-keyword">/etc/</span>letsencrypt<span class="hljs-meta-keyword">/live/</span>domain_name/privkey.pem;

</code></pre><p>在我们的例子中，<code>domain_name</code> 是 <code>example.com</code>。</p>
<h4><a href="#编辑-nginx-配置"></a>编辑 NGINX 配置</h4>
<p>编辑默认虚拟主机文件：</p>
<pre><code class="hljs gradle"># $EDITOR <span class="hljs-regexp">/etc/</span>nginx<span class="hljs-regexp">/sites-available/</span><span class="hljs-keyword">default</span>

</code></pre><p>如下：</p>
<pre><code class="hljs nginx"><span class="hljs-section">server</span> {
 <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span> default_server;
 <span class="hljs-attribute">listen</span> [::]:<span class="hljs-number">80</span> default_server;
 <span class="hljs-attribute">server_name</span> www.example.com
 return <span class="hljs-number">301</span> https://<span class="hljs-variable">$server_name</span><span class="hljs-variable">$request_uri</span>;

 <span class="hljs-comment"># SSL configuration</span>
 <span class="hljs-comment">#</span>
 <span class="hljs-attribute">listen</span> <span class="hljs-number">443</span> ssl default_server;
 <span class="hljs-attribute">listen</span> [::]:<span class="hljs-number">443</span> ssl default_server;
 <span class="hljs-attribute">include</span> snippets/secure-example.conf
 <span class="hljs-comment">#</span>
 <span class="hljs-comment"># <span class="hljs-doctag">Note:</span> You should disable gzip for SSL traffic.</span>
 <span class="hljs-comment"># See: https://bugs.debian.org/773332</span>
...

</code></pre><p>这将启用 NGINX 加密功能。</p>
<p>保存、退出并检查 NGINX 配置文件：</p>
<pre><code class="hljs vim"># nginx -t

nginx: the configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> <span class="hljs-keyword">syntax</span> <span class="hljs-keyword">is</span> ok
nginx: configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> test <span class="hljs-keyword">is</span> successful

</code></pre><p>重启 NGINX：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> systemctl restart nginx</span>

</code></pre><h3><a href="#总结"></a>总结</h3>
<p>按照上述步骤，此时我们已经拥有了一个安全的基于 NGINX 的 Web 服务器，它由 Certbot 和 Let’s Encrypt 提供加密。这只是一个基本配置，当然你可以使用许多 NGINX 配置参数来个性化所有东西，但这取决于特定的 Web 服务器要求。</p>
<hr>
<p>via: <a href="https://www.unixmen.com/encryption-secure-nginx-web-server-ubuntu-16-04/">https://www.unixmen.com/encryption-secure-nginx-web-server-ubuntu-16-04/</a></p>
<p>作者：<a href="https://www.unixmen.com/author/tutan/">Giuseppe Molica</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何保护 Ubuntu 16.04 上的 NGINX Web 服务器

## 原文链接
[https://www.zcfy.cc/article/encryption-how-to-secure-an-nginx-web-server-on-ubuntu-16-04](https://www.zcfy.cc/article/encryption-how-to-secure-an-nginx-web-server-on-ubuntu-16-04)

