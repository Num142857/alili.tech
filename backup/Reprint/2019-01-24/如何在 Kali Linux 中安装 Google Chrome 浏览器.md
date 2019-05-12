---
title: '如何在 Kali Linux 中安装 Google Chrome 浏览器' 
date: 2019-01-24 2:30:11
hidden: true
slug: fzx5dbcvwcq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-kali-linux-中安装-google-chrome-浏览器"></a>如何在 Kali Linux 中安装 Google Chrome 浏览器</h1>
<h3><a href="#介绍"></a>介绍</h3>
<p><strong>目的</strong></p>
<p>我们的目标就是在 Kali Linux 上安装好 Google Chrome Web 浏览器。同时，请参阅附录为可能出现的问题进行排查。</p>
<p><strong>要求</strong></p>
<p>需要获得已安装 Kali Linux 或者 Live 系统的特权。</p>
<p><strong>困难程度</strong></p>
<p>容易。</p>
<p><strong>惯例</strong></p>
<ul>
<li><code>#</code> - 给定命令需要以 root 用户权限运行或者使用 <code>sudo</code> 命令</li>
<li><code>$</code> - 给定命令以常规权限用户运行</li>
</ul>
<h3><a href="#步骤说明"></a>步骤说明</h3>
<p><strong>下载 Google Chrome</strong></p>
<p>首先，使用 <code>wget</code> 命令来下载最新版本的 Google Chrome 的 debian 安装包。</p>
<pre><code class="hljs vim"># wget http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">dl</span>.google.<span class="hljs-keyword">com</span>/linux/direct/google-chrome-stable_current_amd64.<span class="hljs-keyword">deb</span>

</code></pre><p><strong>安装 Google Chrome</strong></p>
<p>在 Kali Linux 安装 Google Chrome 最容易的方法就是使用 <code>gdebi</code>，它会自动帮你下载所有的依赖包。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> gdebi google-chrome-stable_current_amd64.deb</span>

</code></pre><p><strong>启动 Google Chrome</strong></p>
<p>开启一个终端（terminal），执行 <code>google-chrome</code> 命令来启动 Google Chrome 浏览器。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> google-chrome</span>

</code></pre><h3><a href="#附录"></a>附录</h3>
<p><strong>非法指令 (Illegal Instruction)</strong></p>
<p>当以 root 用户特权来运行 <code>google-chrome</code> 命令是，会出现 非法指令 (Illegal Instruction) 错误信息。因为通常情况下，Kali Linux 默认情况下的默认用户是 root 用户，我们需要创建一个虚的非特权用户，比如 <code>linuxconfig</code>，然后使用这个用户来启动 Google Chrome 浏览器。如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> useradd -m -d /home/linuxconfig linuxconfig</span>
<span class="hljs-meta">#</span><span class="bash"> su linuxconfig -c google-chrome</span>

</code></pre><p><strong>libappindicator1 包未安装</strong></p>
<pre><code class="hljs vhdl">dpkg: dependency problems prevent <span class="hljs-keyword">configuration</span> <span class="hljs-keyword">of</span> google-chrome-stable:
 google-chrome-stable depends <span class="hljs-keyword">on</span> libappindicator1; however:
  <span class="hljs-keyword">Package</span> libappindicator1 <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> installed.

</code></pre><p>使用 <code>gdebi</code> 命令来安装 Google Chrome 的 debian 包可以解决依赖问题。参阅上文。 </p>
<p><a href="https://camo.githubusercontent.com/090c8bf9b343e0f8bd9902f63359365c5e6ae013/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f6b616c692d6c696e75782d676f6f676c652d63686f6d652d62726f777365722d73746172742e6a7067"><img src="https://p2.ssl.qhimg.com/t01736a077edcedb3cb.jpg" alt="在 Kali Linux 中以普通用户启动 google chrome"></a></p>
<hr>
<p>译者简介：</p>
<p><a href="http://GHLandy.com">GHLandy</a> —— 生活中所有欢乐与苦闷都应藏在心中，有些事儿注定无人知晓，自己也无从说起。</p>
<hr>
<p>via: <a href="https://linuxconfig.org/how-to-install-google-chrome-browser-on-kali-linux">https://linuxconfig.org/how-to-install-google-chrome-browser-on-kali-linux</a></p>
<p>作者：<a href="https://linuxconfig.org/how-to-install-google-chrome-browser-on-kali-linux">Lubos Rendek</a> 译者：<a href="https://github.com/GHLandy">GHLandy</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Kali Linux 中安装 Google Chrome 浏览器

## 原文链接
[https://www.zcfy.cc/article/how-to-install-google-chrome-browser-on-kali-linux](https://www.zcfy.cc/article/how-to-install-google-chrome-browser-on-kali-linux)

