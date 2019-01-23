---
title: '如何解决 check_mk 出现 “Cannot fetch deployment URL via curl” 的错误' 
date: 2019-01-21 2:30:06
hidden: true
slug: u1xucgfz69
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何解决-check_mk-出现-cannot-fetch-deployment-url-via-curl-的错误"></a>如何解决 check_mk 出现 “Cannot fetch deployment URL via curl” 的错误</h1>
<p>本文解释了 “ERROR Cannot fetch deployment URL via curl：Couldn't resolve host。The given remote host was not resolved。” 的原因及其解决方案。</p>
<p><a href="https://camo.githubusercontent.com/d04abc4624e97bc75111aff0e47cfc0d54b254d2/68747470733a2f2f61342e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f7265736f6c76652d636865636b5f6d6b2d6572726f722e706e67"><img src="https://p0.ssl.qhimg.com/t019ae46937c189ddf0.png" alt="ERROR Cannot fetch deployment URL via curl：Couldn't resolve host。The given remote host was not resolved。"></a></p>
<p><code>check_mk</code> 是一个帮你配置 <a href="https://www.nagios.org/">nagios</a> 监控服务器的工具。然后在配置其中一台机器时，我遇到了下面的错误：</p>
<pre><code class="hljs subunit"><span class="hljs-keyword">ERROR </span>Cannot fetch deployment URL via curl：Couldn't resolve host。The given remote host was not resolved。

</code></pre><p>该错误是在我使用下面命令尝试将该机器注册到监控服务器时发生的：</p>
<pre><code class="hljs clean">root@kerneltalks# /usr/bin/cmk-update-agent register -s monitor.kerneltalks.com -i master -H `hostname` -p http -U omdadmin -S ASFKWEFUNSHEFKG -v 

</code></pre><p>其中：</p>
<ul>
<li><code>-s</code> 指明监控服务器</li>
<li><code>-i</code> 指定服务器上 Check_MK 站点的名称</li>
<li><code>-H</code> 指定 agent 所在的主机名</li>
<li><code>-p</code> 为协议，可以是 http 或 https （默认为 https）</li>
<li><code>-U</code> 允许下载 agent 的用户 ID</li>
<li><code>-S</code> 为密码。用户的自动操作密码（当是自动用户时）</li>
</ul>
<p>从错误中可以看出，命令无法解析监控服务器的 DNS 名称 <code>monitor.kerneltalks.com</code>。</p>
<h3><a href="#解决方案"></a>解决方案：</h3>
<p>超级简单。检查 <code>/etc/resolv.conf</code>，确保你的 DNS 配置正确。如果还解决不了这个问题那么你可以直接在 <a href="https://kerneltalks.com/linux/understanding-etc-hosts-file/">/etc/hosts</a> 中指明它的 IP。</p>
<pre><code class="hljs lsl">root@kerneltalks# cat /etc/hosts
<span class="hljs-number">10.0</span><span class="hljs-number">.10</span><span class="hljs-number">.9</span> monitor.kerneltalks.com

</code></pre><p>这就搞定了。你现在可以成功注册了。</p>
<pre><code class="hljs n1ql">root@kerneltalks # /usr/bin/cmk-<span class="hljs-keyword">update</span>-agent register -s monitor.kerneltalks.com -i master -H <span class="hljs-symbol">`hostname`</span> -p http -U omdadmin -S ASFKWEFUNSHEFKG -v
Going <span class="hljs-keyword">to</span> register agent at deployment server
Successfully registered agent <span class="hljs-keyword">for</span> deployment.
You can now <span class="hljs-keyword">update</span> your agent <span class="hljs-keyword">by</span> running <span class="hljs-string">'cmk-update-agent -v'</span>
Saved your registration settings <span class="hljs-keyword">to</span> /etc/cmk-<span class="hljs-keyword">update</span>-agent.state.

</code></pre><p>另外，你也可以为 <code>-s</code> 直接指定 IP 地址，就没那么多事了！</p>
<hr>
<p>via: <a href="https://kerneltalks.com/troubleshooting/check_mk-register-cannot-fetch-deployment-url-via-curl-error/">https://kerneltalks.com/troubleshooting/check_mk-register-cannot-fetch-deployment-url-via-curl-error/</a></p>
<p>作者：<a href="https://kerneltalks.com">kerneltalks</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何解决 check_mk 出现 “Cannot fetch deployment URL via curl” 的错误

## 原文链接
[https://www.zcfy.cc/article/check-mk-error-cannot-fetch-deployment-url-via-curl-error](https://www.zcfy.cc/article/check-mk-error-cannot-fetch-deployment-url-via-curl-error)

