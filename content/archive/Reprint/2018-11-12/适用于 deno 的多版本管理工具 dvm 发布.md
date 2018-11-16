---
title: 适用于 deno 的多版本管理工具 dvm 发布
hidden: true
categories: [reprint]
slug: 6d84b7ab
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>&#x4E0D;&#x77E5;&#x4E0D;&#x89C9;&#x4E2D;&#xFF0C;deno &#x5DF2;&#x7ECF;&#x9ED8;&#x9ED8;&#x7684;&#x53D1;&#x5E03;&#x4E86; 3 &#x4E2A;&#x7248;&#x672C;&#x4E86;&#xFF1A;</p><ul><li>0.1.0</li><li>0.1.1</li><li>0.1.2</li></ul><p>&#x6628;&#x665A;&#x901A;&#x5BB5;&#x505A;&#x4E86;&#x4E00;&#x4E2A; deno &#x591A;&#x7248;&#x672C;&#x7684;&#x7BA1;&#x7406;&#x5DE5;&#x5177;: dvm&#x3002; github &#x5730;&#x5740;: <a href="https://github.com/justjavac/dvm" rel="nofollow noreferrer">https://github.com/justjavac/dvm</a></p><p>&#x529F;&#x80FD;&#x57FA;&#x672C;&#x53C2;&#x8003;&#x4E86; nvm&#x3002;</p><h2>&#x5B89;&#x88C5;</h2><pre><code class="bash">npm install -g dvm</code></pre><h2>&#x4F7F;&#x7528;</h2><pre><code class="bash">&#x279C;  ~  dvm --help

Usage: dvm [options] [command]

Options:

  -v, --version      output the version number
  -d, --debug        Print verbose infos for debug
  -h, --help         output usage information

Commands:

  arch               Show if deno is running in 32 or 64 bit mode
  list               List all installed versions
  install &lt;version&gt;  Install deno &lt;version&gt;
  use [version]      Switch to use the specified version</code></pre><p><strong>&#x5728; Windows &#x5E73;&#x53F0;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7BA1;&#x7406;&#x5458;&#x6743;&#x9650;&#x6253;&#x5F00;&#x547D;&#x4EE4;&#x884C;&#x6216;&#x8005; PowerShell</strong></p><h2>&#x793A;&#x4F8B;</h2><h3>&#x5217;&#x51FA;&#x6240;&#x6709;&#x5DF2;&#x5B89;&#x88C5;&#x7248;&#x672C;</h3><pre><code class="bash">&#x279C;  ~  dvm list
   0.1.0
*  0.1.1
   0.1.2</code></pre><p>&#x524D;&#x9762;&#x7684;&#x661F;&#x53F7;(<code>*</code>)&#x8868;&#x793A;&#x5F53;&#x524D;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x7248;&#x672C;&#x3002;</p><h3>&#x5207;&#x6362;&#x7248;&#x672C;</h3><pre><code class="bash">&#x279C;  ~  dvm use 0.1.2
now use 0.1.2
&#x279C;  ~  dvm use 0.0.2
deno v0.0.2 is not installed. Use `dvm install 0.0.2` to install it first.</code></pre><p>&#x76EE;&#x524D;&#x529F;&#x80FD;&#x6BD4;&#x8F83;&#x7B80;&#x964B;&#xFF0C;bug &#x4E5F;&#x4E0D;&#x5C11;&#xFF0C;&#x6B22;&#x8FCE; issue <a href="https://github.com/justjavac/dvm" rel="nofollow noreferrer">https://github.com/justjavac/dvm</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
适用于 deno 的多版本管理工具 dvm 发布

## 原文链接
[https://segmentfault.com/a/1190000016279599](https://segmentfault.com/a/1190000016279599)

