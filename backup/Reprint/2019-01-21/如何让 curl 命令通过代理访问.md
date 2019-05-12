---
title: '如何让 curl 命令通过代理访问' 
date: 2019-01-21 2:30:06
hidden: true
slug: gv8m5as8t2i
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何让-curl-命令通过代理访问"></a>如何让 curl 命令通过代理访问</h1>
<p>我的系统管理员给我提供了如下代理信息：</p>
<pre><code class="hljs http"><span class="hljs-attribute">IP</span>: 202.54.1.1
<span class="hljs-attribute">Port</span>: 3128
<span class="hljs-attribute">Username</span>: foo
<span class="hljs-attribute">Password</span>: bar

<span class="undefined"></span></code></pre><p>该设置在 Google Chrome 和 Firefox 浏览器上很容易设置。但是我要怎么把它应用到 <code>curl</code> 命令上呢？我要如何让 curl 命令使用我在 Google Chrome 浏览器上的代理设置呢？</p>
<p>很多 Linux 和 Unix 命令行工具（比如 <code>curl</code> 命令，<code>wget</code> 命令，<code>lynx</code> 命令等)使用名为 <code>http_proxy</code>，<code>https_proxy</code>，<code>ftp_proxy</code> 的环境变量来获取代理信息。它允许你通过代理服务器（使用或不使用用户名/密码都行）来连接那些基于文本的会话和应用。</p>
<p>本文就会演示一下如何让 <code>curl</code> 通过代理服务器发送 HTTP/HTTPS 请求。</p>
<h3><a href="#让-curl-命令使用代理的语法"></a>让 curl 命令使用代理的语法</h3>
<p>语法为：</p>
<pre><code class="hljs clean">## Set the proxy address <span class="hljs-keyword">of</span> your uni/company/vpn network ## 
<span class="hljs-keyword">export</span> http_proxy=http:<span class="hljs-comment">//your-ip-address:port/</span>

## http_proxy <span class="hljs-keyword">with</span> username and password 
<span class="hljs-keyword">export</span> http_proxy=http:<span class="hljs-comment">//user:password@your-proxy-ip-address:port/</span>

## HTTPS version ##
<span class="hljs-keyword">export</span> https_proxy=https:<span class="hljs-comment">//your-ip-address:port/</span>
<span class="hljs-keyword">export</span> https_proxy=https:<span class="hljs-comment">//user:password@your-proxy-ip-address:port/</span>

</code></pre><p>另一种方法是使用 <code>curl</code> 命令的 <code>-x</code> 选项：</p>
<pre><code class="hljs groovy">curl -x &lt;[<span class="hljs-string">protocol:</span><span class="hljs-comment">//][user:password@]proxyhost[:port]&gt; url</span>
--proxy &lt;[<span class="hljs-string">protocol:</span><span class="hljs-comment">//][user:password@]proxyhost[:port]&gt; url</span>
--proxy <span class="hljs-string">http:</span><span class="hljs-comment">//user:password@Your-Ip-Here:Port url</span>
-x <span class="hljs-string">http:</span><span class="hljs-comment">//user:password@Your-Ip-Here:Port url</span>

</code></pre><h3><a href="#在-linux-上的一个例子"></a>在 Linux 上的一个例子</h3>
<p>首先设置 <code>http_proxy</code>：</p>
<pre><code class="hljs clean">## proxy server, <span class="hljs-number">202.54</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>, port: <span class="hljs-number">3128</span>, user: foo, password: bar ##
<span class="hljs-keyword">export</span> http_proxy=http:<span class="hljs-comment">//foo:bar@202.54.1.1:3128/</span>
<span class="hljs-keyword">export</span> https_proxy=$http_proxy
## Use the curl command ##
curl -I https:<span class="hljs-comment">//www.cyberciti.biz</span>
curl -v -I https:<span class="hljs-comment">//www.cyberciti.biz</span>

</code></pre><p>输出为：</p>
<pre><code class="hljs yaml"><span class="hljs-string">*</span> <span class="hljs-string">Rebuilt</span> <span class="hljs-string">URL</span> <span class="hljs-attr">to:</span> <span class="hljs-string">www.cyberciti.biz/</span>
<span class="hljs-string">*</span>   <span class="hljs-string">Trying</span> <span class="hljs-number">202.54</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">...</span>
<span class="hljs-string">*</span> <span class="hljs-string">Connected</span> <span class="hljs-string">to</span> <span class="hljs-number">1202.54</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span> <span class="hljs-string">(202.54.1.1)</span> <span class="hljs-string">port</span> <span class="hljs-number">3128</span> <span class="hljs-string">(#0)</span>
<span class="hljs-string">*</span> <span class="hljs-string">Proxy</span> <span class="hljs-string">auth</span> <span class="hljs-string">using</span> <span class="hljs-string">Basic</span> <span class="hljs-string">with</span> <span class="hljs-string">user</span> <span class="hljs-string">'foo'</span>
<span class="hljs-string">&gt; HEAD HTTP://www.cyberciti.biz/ HTTP/1.1
&gt; Host: www.cyberciti.biz
&gt; Proxy-Authorization: Basic x9VuUml2xm0vdg93MtIz
&gt; User-Agent: curl/7.43.0
&gt; Accept: */*
&gt; Proxy-Connection: Keep-Alive
&gt; 
&lt; HTTP/1.1 200 OK
HTTP/1.1 200 OK
&lt; Server: nginx
</span><span class="hljs-attr">Server:</span> <span class="hljs-string">nginx</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Date:</span> <span class="hljs-string">Sun,</span> <span class="hljs-number">17</span> <span class="hljs-string">Jan</span> <span class="hljs-number">2016</span> <span class="hljs-number">11</span><span class="hljs-string">:49:21</span> <span class="hljs-string">GMT</span>
<span class="hljs-attr">Date:</span> <span class="hljs-string">Sun,</span> <span class="hljs-number">17</span> <span class="hljs-string">Jan</span> <span class="hljs-number">2016</span> <span class="hljs-number">11</span><span class="hljs-string">:49:21</span> <span class="hljs-string">GMT</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Content-Type:</span> <span class="hljs-string">text/html;</span> <span class="hljs-string">charset=UTF-8</span>
<span class="hljs-attr">Content-Type:</span> <span class="hljs-string">text/html;</span> <span class="hljs-string">charset=UTF-8</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Vary:</span> <span class="hljs-string">Accept-Encoding</span>
<span class="hljs-attr">Vary:</span> <span class="hljs-string">Accept-Encoding</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-Whom:</span> <span class="hljs-string">Dyno-l1-com-cyber</span>
<span class="hljs-attr">X-Whom:</span> <span class="hljs-string">Dyno-l1-com-cyber</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Vary:</span> <span class="hljs-string">Cookie</span>
<span class="hljs-attr">Vary:</span> <span class="hljs-string">Cookie</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Link:</span> <span class="hljs-string">&lt;http://www.cyberciti.biz/wp-json/&gt;;</span> <span class="hljs-string">rel="https://api.w.org/"</span>
<span class="hljs-attr">Link:</span> <span class="hljs-string">&lt;http://www.cyberciti.biz/wp-json/&gt;;</span> <span class="hljs-string">rel="https://api.w.org/"</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-Frame-Options:</span> <span class="hljs-string">SAMEORIGIN</span>
<span class="hljs-attr">X-Frame-Options:</span> <span class="hljs-string">SAMEORIGIN</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-Content-Type-Options:</span> <span class="hljs-string">nosniff</span>
<span class="hljs-attr">X-Content-Type-Options:</span> <span class="hljs-string">nosniff</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-XSS-Protection:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span> <span class="hljs-string">mode=block</span>
<span class="hljs-attr">X-XSS-Protection:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span> <span class="hljs-string">mode=block</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-Cache:</span> <span class="hljs-string">MISS</span> <span class="hljs-string">from</span> <span class="hljs-string">server1</span>
<span class="hljs-attr">X-Cache:</span> <span class="hljs-string">MISS</span> <span class="hljs-string">from</span> <span class="hljs-string">server1</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">X-Cache-Lookup:</span> <span class="hljs-string">MISS</span> <span class="hljs-string">from</span> <span class="hljs-attr">server1:3128</span>
<span class="hljs-attr">X-Cache-Lookup:</span> <span class="hljs-string">MISS</span> <span class="hljs-string">from</span> <span class="hljs-attr">server1:3128</span>
<span class="hljs-string">&lt;</span> <span class="hljs-attr">Connection:</span> <span class="hljs-string">keep-alive</span>
<span class="hljs-attr">Connection:</span> <span class="hljs-string">keep-alive</span>

<span class="hljs-string">&lt;</span> 
<span class="hljs-string">*</span> <span class="hljs-string">Connection</span> <span class="hljs-comment">#0 to host 10.12.249.194 left intact</span>

</code></pre><p>本例中，我来下载一个 pdf 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">export</span> http_proxy=<span class="hljs-string">"vivek:myPasswordHere@10.12.249.194:3128/"</span></span>
<span class="hljs-meta">$</span><span class="bash"> curl -v -O http://dl.cyberciti.biz/pdfdownloads/b8bf71be9da19d3feeee27a0a6960cb3/569b7f08/cms/631.pdf</span>

</code></pre><p>也可以使用 <code>-x</code> 选项：</p>
<pre><code class="hljs 1c">curl -x 'http://vivek:myPasswordHere@10.12.249.194:<span class="hljs-number">3128</span>' -v -O https:<span class="hljs-comment">//dl.cyberciti.biz/pdfdownloads/b8bf71be9da19d3feeee27a0a6960cb3/569b7f08/cms/631.pdf</span>

</code></pre><p>输出为：</p>
<p><a href="https://camo.githubusercontent.com/c7443433ad1e3b608e97b49c2ddb25729d3f6d7c/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f6661712f323031362f30312f6375726c2d646f776e6c6f61642d6f75747075742e6a7067"><img src="https://p0.ssl.qhimg.com/t016f6cad55a49fea26.jpg" alt="Fig.01：curl in action (click to enlarge)"></a></p>
<h3><a href="#unix-上的一个例子"></a>Unix 上的一个例子</h3>
<pre><code class="hljs awk">$ curl -x http:<span class="hljs-regexp">//</span>prox_server_vpn:<span class="hljs-number">3128</span><span class="hljs-regexp">/ -I https:/</span><span class="hljs-regexp">/www.cyberciti.biz/</span>faq<span class="hljs-regexp">/howto-nginx-customizing-404-403-error-page/</span>

</code></pre><h3><a href="#socks-协议怎么办呢"></a>socks 协议怎么办呢？</h3>
<p>语法也是一样的：</p>
<pre><code class="hljs groovy">curl -x <span class="hljs-string">socks5:</span><span class="hljs-comment">//[user:password@]proxyhost[:port]/ url</span>
curl --socks5 <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.254</span>:<span class="hljs-number">3099</span> <span class="hljs-string">https:</span><span class="hljs-comment">//www.cyberciti.biz/</span>

</code></pre><h3><a href="#如何让代理设置永久生效"></a>如何让代理设置永久生效？</h3>
<p>编辑 <code>~/.curlrc</code> 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi ~/.curlrc</span>

</code></pre><p>添加下面内容：</p>
<pre><code class="hljs ini"><span class="hljs-attr">proxy</span> = server1.cyberciti.biz:<span class="hljs-number">3128</span>
<span class="hljs-attr">proxy-user</span> = <span class="hljs-string">"foo:bar"</span>

</code></pre><p>保存并关闭该文件。另一种方法是在你的 <code>~/.bashrc</code> 文件中创建一个别名：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment"># alias for curl command</span></span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment"># set proxy-server and port, the syntax is</span></span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment"># alias curl="curl -x {your_proxy_host}:{proxy_port}"</span></span>
alias curl = "curl -x server1.cyberciti.biz:3128"

</code></pre><p>记住，代理字符串中可以使用 <code>protocol://</code> 前缀来指定不同的代理协议。使用 <code>socks4://</code>，<code>socks4a://</code>，<code>socks5://</code>或者 <code>socks5h://</code> 来指定使用的 SOCKS 版本。若没有指定协议或者使用 <code>http://</code> 表示 HTTP 协议。若没有指定端口号则默认为 <code>1080</code>。<code>-x</code> 选项的值要优先于环境变量设置的值。若不想走代理，而环境变量总设置了代理，那么可以通过设置代理为空值（<code>""</code>）来覆盖环境变量的值。<a href="https://curl.haxx.se/docs/manpage.html">详细信息请参阅 <code>curl</code> 的 man 页</a> 。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/faq/linux-unix-curl-command-with-proxy-username-password-http-options/">https://www.cyberciti.biz/faq/linux-unix-curl-command-with-proxy-username-password-http-options/</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何让 curl 命令通过代理访问

## 原文链接
[https://www.zcfy.cc/article/how-to-use-curl-command-with-proxy-username-password-on-linux-unix](https://www.zcfy.cc/article/how-to-use-curl-command-with-proxy-username-password-on-linux-unix)

