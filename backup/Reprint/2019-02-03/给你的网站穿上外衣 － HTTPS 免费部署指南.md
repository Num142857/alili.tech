---
title: '给你的网站穿上外衣 － HTTPS 免费部署指南' 
date: 2019-02-03 2:30:39
hidden: true
slug: eq3kff3zi9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>随着国内各大网站纷纷开启全站 HTTPS 时代，HTTPS 已不再是支付等敏感操作过程的专属，开启 HTTPS 对于个人网站或者小型网站也不再遥不可及。 今天博主就以自己的网站 www.rapospectre.com 为例叙述一下为自己网站点亮 HTTPS 小绿锁的过程。</p>
<h3 id="articleHeader1">HTTP 和 HTTPS</h3>
<p>HTTPS（ Hypertext Transfer Protocol over Secure Socket Layer ），是以安全为目标的 HTTP 通道，简单讲是 HTTP 的安全版。即 HTTP 下加入 SSL 层，HTTPS 的安全基础是 SSL ，因此加密的详细内容就需要 SSL 。 它是一个 URI scheme（ 抽象标识符体系 ），句法类同 http :体系。用于安全的 HTTP 数据传输。 <a href="https:URL">https:URL</a> 表明它使用了 HTTP，但 HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP 与 TCP 之间）。这个系统的最初研发由网景公司进行，提供了身份验证与加密通讯方法，现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。</p>
<p>HTTP 超文本传输协议 ( HTTP-Hypertext transfer protocol ) 是一种详细规定了浏览器和万维网服务器之间互相通信的规则，通过因特网传送万维网文档的数据传送协议。</p>
<p>从概念里可以看到，要开启 HTTPS  至关重要的一点就是 ssl 层的身份验证，而身份验证需要用到 ssl 证书，以前少有免费 ssl 证书，所以小站基本不会选择 https ，而现在网上提供个人免费 ssl 证书的机构越来越多，这使得免费升级站点为 https 成为可能。</p>
<h3 id="articleHeader2">1. 申请 SSL 证书</h3>
<p>网上已经有不少机构提供个人免费 ssl 证书，有效期几个月到几年不等，博主使用的是 <a href="https://www.startssl.com/" rel="nofollow noreferrer" target="_blank">StartSSL</a>, 申请成功后有效期 3 年，到期后可免费续租。 具体申请过程不复杂，注册后根据提示验证网站 + 生成证书即可，如果不清楚可以 <a href="https://www.google.com/search" rel="nofollow noreferrer" target="_blank">Google 一下</a>。</p>
<p>要注意 StartSSL 验证网站拥有者时是给域名所有者的邮箱发验证邮件，如果域名开启了隐私保护请暂时关闭。</p>
<p>然后在自己服务器中生成 SSL 证书的 csr ，记住生成输入的秘密，之后要用到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl req -new -sha256 -key rapospectre.com_secure.key -out rapospectre.com.csr" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">openssl req -new -sha256 -key rapospectre<span class="hljs-selector-class">.com_secure</span><span class="hljs-selector-class">.key</span> -out rapospectre<span class="hljs-selector-class">.com</span><span class="hljs-selector-class">.csr</span></code></pre>
<p>假设以上文件生成在 <code>/var/tmp</code> 文件夹下</p>
<p>在 StartSSL 填写 csr 文件内容，生成 SSL 证书并下载， 生成成果后如图：</p>
<p><span class="img-wrap"><img data-src="http://ocwt4ikj4.bkt.clouddn.com/2BFB5197.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" src="https://static.alili.techhttp://ocwt4ikj4.bkt.clouddn.com/2BFB5197.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>点击 Retrieve 下载证书，解压缩后包含各种服务器的 crt ，博主使用 nginx 做反代，所以选择 nginxserver 解压缩后得到 <code>www.rapospectre.com_bundle.crt</code> 将此文件上传到服务器，假设传到 <code>/var/tmp/</code> 文件夹</p>
<h3 id="articleHeader3">2. 配置服务器</h3>
<p>以 nginx 为例，打开 <code>/etc/nginx/nginx.conf</code>，加入配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" server {
        listen       443 ssl;
        ssl_certificate /var/tmp/www.rapospectre.com_bundle.crt;
        ssl_certificate_key /var/tmp/rapospectre.com_secure.key;
        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        #选择特定的加密方式, 避免已知的漏洞
        ssl_ciphers 'kEECDH+ECDSA+AES128 kEECDH+ECDSA+AES256 kEECDH+AES128 kEECDH+AES256 kEDH+AES128 kEDH+AES256 DES-CBC3-SHA +SHA !aNULL !eNULL !LOW !MD5 !EXP !DSS !PSK !SRP !kECDH !CAMELLIA !RC4 !SEED';
        #让浏览器记住直接访问 https 的网址, 不再去 http 重定向。
        add_header Strict-Transport-Security 'max-age=31536000; preload';
        add_header X-Frame-Options DENY;
        ssl_session_cache   shared:SSL:10m;
        ssl_session_timeout 10m;
        keepalive_timeout 70;
        ssl_dhparam /var/tmp/dhparam2048.pem;
        #禁止服务器自动解析资源类型
        add_header X-Content-Type-Options nosniff;
        #防XSS攻擊
        add_header X-Xss-Protection 1;
        server_name  www.rapospectre.com rapospectre.com;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="shell"> <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">443</span> ssl;
        <span class="hljs-attribute">ssl_certificate</span> /var/tmp/www.rapospectre.com_bundle.crt;
        <span class="hljs-attribute">ssl_certificate_key</span> /var/tmp/rapospectre.com_secure.key;
        <span class="hljs-attribute">ssl_prefer_server_ciphers</span> <span class="hljs-literal">on</span>;
        <span class="hljs-attribute">ssl_protocols</span> TLSv1 TLSv1.<span class="hljs-number">1</span> TLSv1.<span class="hljs-number">2</span>;
        <span class="hljs-comment">#选择特定的加密方式, 避免已知的漏洞</span>
        <span class="hljs-attribute">ssl_ciphers</span> <span class="hljs-string">'kEECDH+ECDSA+AES128 kEECDH+ECDSA+AES256 kEECDH+AES128 kEECDH+AES256 kEDH+AES128 kEDH+AES256 DES-CBC3-SHA +SHA !aNULL !eNULL !LOW !MD5 !EXP !DSS !PSK !SRP !kECDH !CAMELLIA !RC4 !SEED'</span>;
        <span class="hljs-comment">#让浏览器记住直接访问 https 的网址, 不再去 http 重定向。</span>
        <span class="hljs-attribute">add_header</span> Strict-Transport-Security <span class="hljs-string">'max-age=31536000; preload'</span>;
        <span class="hljs-attribute">add_header</span> X-Frame-Options DENY;
        <span class="hljs-attribute">ssl_session_cache</span>   shared:SSL:<span class="hljs-number">10m</span>;
        <span class="hljs-attribute">ssl_session_timeout</span> <span class="hljs-number">10m</span>;
        <span class="hljs-attribute">keepalive_timeout</span> <span class="hljs-number">70</span>;
        <span class="hljs-attribute">ssl_dhparam</span> /var/tmp/dhparam2048.pem;
        <span class="hljs-comment">#禁止服务器自动解析资源类型</span>
        <span class="hljs-attribute">add_header</span> X-Content-Type-Options nosniff;
        <span class="hljs-comment">#防XSS攻擊</span>
        <span class="hljs-attribute">add_header</span> X-Xss-Protection <span class="hljs-number">1</span>;
        <span class="hljs-attribute">server_name</span>  www.rapospectre.com rapospectre.com;</code></pre>
<p>在之前的 80 端口进行重定向配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name rapospectre.com www.rapospectre.com;
    return 301 https://www.rapospectre.com$request_uri;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="shell"><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> rapospectre.com www.rapospectre.com;
    <span class="hljs-attribute">return</span> <span class="hljs-number">301</span> https://www.rapospectre.com<span class="hljs-variable">$request_uri</span>;
}</code></pre>
<h3 id="articleHeader4">3. HTTP 替换</h3>
<p>将网站所有以 http 方式获取的资源全部改为 https 方式或自动方式获取, eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://xx.cdn.com/jquery.js&quot;></script>
改为
<script src=&quot;https://xx.cdn.com/jquery.js&quot;></script>
或
<script src=&quot;//xx.cdn.com/jquery.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="shell"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://xx.cdn.com/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
改为
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://xx.cdn.com/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
或
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xx.cdn.com/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>重启服务器，提示输入之前生成 csr 的密码，输入密码，重启成功，访问 <a href="https://www.rapospectre.com" rel="nofollow noreferrer" target="_blank">https://www.rapospectre.com</a> 可以看到 HTTPS 已经正常工作！</p>
<p>顺手来一发 <a href="https://www.ssllabs.com/ssltest/index.html" rel="nofollow noreferrer" target="_blank">SSLLABS</a>测试，wtf 只有 F？</p>
<p><span class="img-wrap"><img data-src="http://ocwt4ikj4.bkt.clouddn.com/60FBAB7C.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" src="https://static.alili.techhttp://ocwt4ikj4.bkt.clouddn.com/60FBAB7C.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" alt="" title="" style="cursor: pointer;"></span></p>
<p>看图发现因为</p>
<blockquote><p>This server is vulnerable to the OpenSSL Padding Oracle vulunerability ( CVE-2016-2107 )</p></blockquote>
<p>原来是 OpenSSL 漏洞的锅，升级 OpenSSL 到 1.0.2h 版 （ 后续版本应该也可以，博主一开始升级到了最新的 1.1.0a 结果服务器挂了 ） 即可修复漏洞：</p>
<p><a href="https://gist.github.com/ArturT/bc8836d3bedff801dc324ac959050d12" rel="nofollow noreferrer" target="_blank">Fix OpenSSL Padding Oracle vulnerability (CVE-2016-2107) - Ubuntu 14.04</a><button class="btn btn-xs btn-default ml10 preview" data-url="ArturT/bc8836d3bedff801dc324ac959050d12" data-typeid="1">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Based on http://fearby.com/article/update-openssl-on-a-digital-ocean-vm/

$ apt-get update
$ apt-get dist-upgrade

$ wget ftp://ftp.openssl.org/source/old/1.0.2/openssl-1.0.2h.tar.gz
$ tar -xvzf openssl-1.0.2h.tar.gz
$ cd openssl-1.0.2h
$ ./config --prefix=/usr/
$ make depend
$ sudo make install
$ openssl version
# OpenSSL 1.0.2h  3 May 2016

# now restart your nginx or other server
$ nginx -s reload
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell"><span class="hljs-comment"># Based on http://fearby.com/article/update-openssl-on-a-digital-ocean-vm/</span>

<span class="hljs-variable">$ </span>apt-get update
<span class="hljs-variable">$ </span>apt-get dist-upgrade

<span class="hljs-variable">$ </span>wget <span class="hljs-symbol">ftp:</span>/<span class="hljs-regexp">/ftp.openssl.org/source</span><span class="hljs-regexp">/old/</span><span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>/openssl-<span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>h.tar.gz
<span class="hljs-variable">$ </span>tar -xvzf openssl-<span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>h.tar.gz
<span class="hljs-variable">$ </span>cd openssl-<span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>h
<span class="hljs-variable">$ </span>./config --prefix=<span class="hljs-regexp">/usr/</span>
<span class="hljs-variable">$ </span>make depend
<span class="hljs-variable">$ </span>sudo make install
<span class="hljs-variable">$ </span>openssl version
<span class="hljs-comment"># OpenSSL 1.0.2h  3 May 2016</span>

<span class="hljs-comment"># now restart your nginx or other server</span>
<span class="hljs-variable">$ </span>nginx -s reload
</code></pre>
<h3 id="articleHeader5">4. HTTP2</h3>
<p>开启 http2 ，nginx 在 1.9.5 以后的版本才开始支持 http2 ，之前一直使用的是 spdy 而 ubuntu 自带的 nginx 是 1.4.6 的古董， 所以需要重新编译安装新版的 nginx ，博主选择了安装最新的 nginx 1.11.4:</p>
<p><strong>1. 下载 nginx 到 <code>/var/tmp/nginx</code>:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget http://nginx.org/download/nginx-1.11.4.tar.gz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="shell" style="word-break: break-word; white-space: initial;">wget http:<span class="hljs-regexp">//</span>nginx.org<span class="hljs-regexp">/download/</span>nginx-<span class="hljs-number">1.11</span>.<span class="hljs-number">4</span>.tar.gz</code></pre>
<p><strong>2. 解压nginx-1.11.4.tar.gz文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tar zxvf nginx-1.11.4.tar.gz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">tar</span> <span class="hljs-selector-tag">zxvf</span> <span class="hljs-selector-tag">nginx-1</span><span class="hljs-selector-class">.11</span><span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span></code></pre>
<p><strong>3. 进入ngixn-1.11.4文件夹</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd nginx-1.2.5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">cd</span> <span class="hljs-selector-tag">nginx-1</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.5</span></code></pre>
<p><strong>4. 查看nginx原来的配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx -V" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">nginx -V</span></code></pre>
<p>上面的命令将输出类似如下信息:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--with-cc-opt='-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code class="shell" style="word-break: break-word; white-space: initial;">--<span class="hljs-keyword">with</span>-cc-opt=<span class="hljs-string">'-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2'</span> --<span class="hljs-keyword">with</span>-ld-opt=<span class="hljs-string">'-Wl,-Bsymbolic-functions -Wl,-z,relro'</span> --<span class="hljs-keyword">prefix</span>=/usr/share/nginx --conf-<span class="hljs-built_in">path</span>=/etc/nginx/nginx.conf --http-<span class="hljs-built_in">log</span>-<span class="hljs-built_in">path</span>=/var/<span class="hljs-built_in">log</span>/nginx/access.<span class="hljs-built_in">log</span> --error-<span class="hljs-built_in">log</span>-<span class="hljs-built_in">path</span>=/var/<span class="hljs-built_in">log</span>/nginx/error.<span class="hljs-built_in">log</span> --lock-<span class="hljs-built_in">path</span>=/var/lock/nginx.lock --pid-<span class="hljs-built_in">path</span>=/run/nginx.pid --http-client-body-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/body --http-fastcgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/fastcgi --http-proxy-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/proxy --http-scgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/scgi --http-uwsgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/uwsgi --<span class="hljs-keyword">with</span>-debug --<span class="hljs-keyword">with</span>-pcre-jit --<span class="hljs-keyword">with</span>-ipv6 --<span class="hljs-keyword">with</span>-http_ssl_module --<span class="hljs-keyword">with</span>-http_stub_status_module --<span class="hljs-keyword">with</span>-http_realip_module --<span class="hljs-keyword">with</span>-http_addition_module --<span class="hljs-keyword">with</span>-http_dav_module --<span class="hljs-keyword">with</span>-http_geoip_module --<span class="hljs-keyword">with</span>-http_gzip_static_module --<span class="hljs-keyword">with</span>-http_image_filter_module --<span class="hljs-keyword">with</span>-http_sub_module --<span class="hljs-keyword">with</span>-http_xslt_module --<span class="hljs-keyword">with</span>-mail --<span class="hljs-keyword">with</span>-mail_ssl_module</code></pre>
<p>我们在后面加上 http2 模块与 上一步中 openssl 源码（ 是源码路径不是安装 ）路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--with-http_v2_module --with-openssl=/var/tmp/ssl/openssl-1.0.2h" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">--<span class="hljs-keyword">with</span>-http_v2_module --<span class="hljs-keyword">with</span>-openssl=<span class="hljs-regexp">/var/tmp</span><span class="hljs-regexp">/ssl/openssl</span>-<span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>h</code></pre>
<p>注意，如果以上信息内包含 <code>--with-spdy_module</code> 请去除，nginx 1.9.5 之后已弃用 spdy</p>
<p><strong>5. 执行configure命令，后面跟上原来nginx的配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./configure --with-cc-opt='-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module --with-http_v2_module --with-openssl=/var/tmp/ssl/openssl-1.0.2h" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code class="shell" style="word-break: break-word; white-space: initial;">./configure --<span class="hljs-keyword">with</span>-cc-opt=<span class="hljs-string">'-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2'</span> --<span class="hljs-keyword">with</span>-ld-opt=<span class="hljs-string">'-Wl,-Bsymbolic-functions -Wl,-z,relro'</span> --<span class="hljs-keyword">prefix</span>=/usr/share/nginx --conf-<span class="hljs-built_in">path</span>=/etc/nginx/nginx.conf --http-<span class="hljs-built_in">log</span>-<span class="hljs-built_in">path</span>=/var/<span class="hljs-built_in">log</span>/nginx/access.<span class="hljs-built_in">log</span> --error-<span class="hljs-built_in">log</span>-<span class="hljs-built_in">path</span>=/var/<span class="hljs-built_in">log</span>/nginx/error.<span class="hljs-built_in">log</span> --lock-<span class="hljs-built_in">path</span>=/var/lock/nginx.lock --pid-<span class="hljs-built_in">path</span>=/run/nginx.pid --http-client-body-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/body --http-fastcgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/fastcgi --http-proxy-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/proxy --http-scgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/scgi --http-uwsgi-temp-<span class="hljs-built_in">path</span>=/var/lib/nginx/uwsgi --<span class="hljs-keyword">with</span>-debug --<span class="hljs-keyword">with</span>-pcre-jit --<span class="hljs-keyword">with</span>-ipv6 --<span class="hljs-keyword">with</span>-http_ssl_module --<span class="hljs-keyword">with</span>-http_stub_status_module --<span class="hljs-keyword">with</span>-http_realip_module --<span class="hljs-keyword">with</span>-http_addition_module --<span class="hljs-keyword">with</span>-http_dav_module --<span class="hljs-keyword">with</span>-http_geoip_module --<span class="hljs-keyword">with</span>-http_gzip_static_module --<span class="hljs-keyword">with</span>-http_image_filter_module --<span class="hljs-keyword">with</span>-http_sub_module --<span class="hljs-keyword">with</span>-http_xslt_module --<span class="hljs-keyword">with</span>-mail --<span class="hljs-keyword">with</span>-mail_ssl_module --<span class="hljs-keyword">with</span>-http_v2_module --<span class="hljs-keyword">with</span>-openssl=/var/tmp/ssl/openssl-<span class="hljs-number">1.0</span>.<span class="hljs-number">2</span>h</code></pre>
<p>configure时可能遇到的几个错误:</p>
<ol>
<li>
<p>--with-http_xslt_module 时提示 the HTTP XSLT module requires the libxml2/libxslt libraries</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install libxml2 libxml2-dev libxslt-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-built_in">get</span> install libxml2 libxml2-<span class="hljs-built_in">dev</span> libxslt-<span class="hljs-built_in">dev</span></code></pre>
</li>
<li>
<p>--with-http_image_filter_module 时提示 the HTTP image filter module requires the GD library.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install libgd2-xpm-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-built_in">get</span> install libgd2-xpm-<span class="hljs-built_in">dev</span></code></pre>
</li>
<li>
<p>--with-http_geoip_module 时提示 the GeoIP module requires the GeoIP library.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install geoip-database libgeoip-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-built_in">get</span> install geoip-database libgeoip-<span class="hljs-built_in">dev</span></code></pre>
</li>
<li>
<p>./configure: error: the HTTP rewrite module requires the PCRE library.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install libpcre3 libpcre3-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-built_in">get</span> install libpcre3 libpcre3-<span class="hljs-built_in">dev</span></code></pre>
</li>
</ol>
<p>再次执行 configure 命令， 然后<code>make &amp;&amp; make install</code>。 编译好以后objs目录下多出一个nginx文件，用它替换旧的 nginx 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mv /usr/sbin/nginx /usr/sbin/nginx-backup
cp objs/nginx /usr/sbin/nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>mv <span class="hljs-regexp">/usr/</span>sbin<span class="hljs-regexp">/nginx /u</span>sr<span class="hljs-regexp">/sbin/</span>nginx-backup
cp objs<span class="hljs-regexp">/nginx /u</span>sr<span class="hljs-regexp">/sbin/</span>nginx</code></pre>
<p>执行/usr/sbin/nginx -t 命令检查配置文件返回下面的信息:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>nginx: the configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> <span class="hljs-keyword">syntax</span> <span class="hljs-keyword">is</span> ok
nginx: configuration <span class="hljs-keyword">file</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span> test <span class="hljs-keyword">is</span> successful</code></pre>
<p>表示 nginx 升级成功，修改 nginx 配置，加入 http2 支持:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen       443 ssl http2 fastopen=3 reuseport;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">listen</span>       <span class="hljs-number">443</span> ssl http2 fastopen=<span class="hljs-number">3</span> reuseport;</code></pre>
<p>重启 nginx 访问正常后再测一发：</p>
<p><span class="img-wrap"><img data-src="http://ocwt4ikj4.bkt.clouddn.com/9A062216.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" src="https://static.alili.techhttp://ocwt4ikj4.bkt.clouddn.com/9A062216.jpg?watermark/2/text/cmFwb3NwZWN0cmU=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>搞定，个人网站加入 HTTPS 并且 SSLABS 评分 A+ 。 快来试试吧～</p>
<p>( 博主网站图片上传到七牛，而七牛免费似乎账户不支持 https 链接，所以有些文章比如说这篇会提示网页内有不安全的内容 )</p>
<p>原文地址：<a href="https://www.rapospectre.com/blog/https-deploy-guide" rel="nofollow noreferrer" target="_blank">https://www.rapospectre.com/b...</a></p>
<p>作者：<a href="https://www.rapospectre.com" rel="nofollow noreferrer" target="_blank">rapospectre</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给你的网站穿上外衣 － HTTPS 免费部署指南

## 原文链接
[https://segmentfault.com/a/1190000007024673](https://segmentfault.com/a/1190000007024673)

