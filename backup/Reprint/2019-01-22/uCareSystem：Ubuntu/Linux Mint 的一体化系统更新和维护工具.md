---
title: 'uCareSystem：Ubuntu/Linux Mint 的一体化系统更新和维护工具' 
date: 2019-01-22 2:30:08
hidden: true
slug: x20okkmzizo
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ucaresystemubuntulinux-mint-的一体化系统更新和维护工具"></a>uCareSystem：Ubuntu/Linux Mint 的一体化系统更新和维护工具</h1>
<p><a href="https://github.com/cerebrux/uCareSystem">uCareSystem Core</a> 是一种能够自动执行基本的系统维护活动的轻型实用程序，另一方面它可以通过多种方式减少系统管理员的任务，节省大量时间。它没有任何 GUI，并提供纯粹的命令行界面来执行活动。</p>
<p>Ubuntu 中有几种实用程序来执行系统维护活动。每种工具有它们相应的独特功能和设计。你可以添加一个 cron 任务来自动化这些任务。</p>
<p>uCareSystem Core 会自动刷新发行版仓库、更新可用包列表、卸载包（过期包、孤儿包和旧的 Linux 内核）以及清理取回的包来节省系统磁盘空间。</p>
<ul>
<li>建议阅读：<a href="http://www.2daygeek.com/stacer-linux-system-optimizer-and-monitoring-tool/">Stacer - Linux 系统优化器及监控工具</a></li>
<li>建议阅读：<a href="http://www.2daygeek.com/bleachbit-system-cleaner-on-ubuntu-debian-fedora-opensuse-arch-linux-mint/">BleachBit – 快速及最佳的方式清理你的 Linux 系统</a></li>
<li>建议阅读：<a href="https://linux.cn/article-8642-1.html">用 Ubuntu Cleaner 在 Ubuntu/LinuxMint 中释放一些空间</a></li>
</ul>
<h3><a href="#ucaresystem-core-功能"></a>uCareSystem Core 功能</h3>
<ul>
<li>更新包列表（它将刷新包索引）</li>
<li>下载及安装更新</li>
<li>更新包及系统库到最新版本</li>
<li>移除不需要的、过期的和孤儿包。</li>
<li>移除旧内核（它为了安全保留当前和之前一个内核）</li>
<li>移除不需要的配置文件</li>
<li>清理已下载的临时包</li>
</ul>
<h3><a href="#在-ubuntulinuxmint-中安装-ucaresystem-core"></a>在 Ubuntu/LinuxMint 中安装 uCareSystem Core</h3>
<p>因为开发者提供了自己的 PPA，因此我们可以轻易地通过 PPA 在 Ubuntu/LinuxMint 中安装 uCareSystem Core。</p>
<pre><code class="hljs smali">$ sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:utappia/stable
$ sudo apt update
$ sudo apt install ucaresystem-core

</code></pre><p>我们已经成功安装了 <code>uCareSystem Core</code> 包，并且在执行 CareSystem Core 命令之前要了解它是否会节省磁盘空间，使用 <code>df -h</code> 命令检查当前磁盘利用率。</p>
<pre><code class="hljs lsl">$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            <span class="hljs-number">979</span>M     <span class="hljs-number">0</span>  <span class="hljs-number">979</span>M   <span class="hljs-number">0</span>% /dev
tmpfs           <span class="hljs-number">200</span>M  <span class="hljs-number">6.4</span>M  <span class="hljs-number">194</span>M   <span class="hljs-number">4</span>% /run
/dev/sda1        <span class="hljs-number">38</span>G   <span class="hljs-number">19</span>G   <span class="hljs-number">17</span>G  <span class="hljs-number">54</span>% /
tmpfs           <span class="hljs-number">999</span>M  <span class="hljs-number">216</span>K  <span class="hljs-number">999</span>M   <span class="hljs-number">1</span>% /dev/shm
tmpfs           <span class="hljs-number">5.0</span>M  <span class="hljs-number">4.0</span>K  <span class="hljs-number">5.0</span>M   <span class="hljs-number">1</span>% /run/lock
tmpfs           <span class="hljs-number">999</span>M     <span class="hljs-number">0</span>  <span class="hljs-number">999</span>M   <span class="hljs-number">0</span>% /sys/fs/cgroup
tmpfs           <span class="hljs-number">200</span>M  <span class="hljs-number">112</span>K  <span class="hljs-number">200</span>M   <span class="hljs-number">1</span>% /run/user/<span class="hljs-number">1000</span>

</code></pre><p>只需在终端中运行 <code>ucaresystem-core</code> 命令，在结束之前它会自动执行而不需要人类交互。</p>
<pre><code class="hljs clean">$ sudo ucaresystem-core

_______________________________________________________

            uCareSystem Core v3<span class="hljs-number">.0</span>                      
                 ~  <span class="hljs-string">''</span>  ~                              

 Welcome to all-<span class="hljs-keyword">in</span>-one System Update and maintenance   
 assistant app.                                        

 This simple script will automatically                  
 refresh your packagelist, download and                
 install updates (<span class="hljs-keyword">if</span> there are any), remove any old    
 kernels, obsolete packages and configuration files    
 to free up disk space, without any need <span class="hljs-keyword">of</span> user       
 interference.                                         
_______________________________________________________

 uCareSystem Core will start <span class="hljs-keyword">in</span> <span class="hljs-number">5</span> seconds... 
#########################
          Started
#########################

Ign:<span class="hljs-number">1</span> https:<span class="hljs-comment">//wire-app.wire.com/linux/debian stable InRelease</span>
Hit:<span class="hljs-number">2</span> https:<span class="hljs-comment">//wire-app.wire.com/linux/debian stable Release</span>
Hit:<span class="hljs-number">4</span> https:<span class="hljs-comment">//deb.nodesource.com/node_6.x yakkety InRelease</span>
Hit:<span class="hljs-number">5</span> https:<span class="hljs-comment">//repo.skype.com/deb stable InRelease</span>
Hit:<span class="hljs-number">6</span> http:<span class="hljs-comment">//in.archive.ubuntu.com/ubuntu yakkety InRelease</span>
Hit:<span class="hljs-number">7</span> http:<span class="hljs-comment">//archive.canonical.com/ubuntu yakkety InRelease</span>
.
.
.
Removing linux-image-extra<span class="hljs-number">-4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-34</span>-<span class="hljs-keyword">generic</span> (<span class="hljs-number">4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-34.36</span>) ...
Purging configuration files for linux-image-extra<span class="hljs-number">-4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-34</span>-<span class="hljs-keyword">generic</span> (<span class="hljs-number">4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-34.36</span>) ...
Removing linux-image-extra<span class="hljs-number">-4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-32</span>-<span class="hljs-keyword">generic</span> (<span class="hljs-number">4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-32.34</span>) ...
Purging configuration files for linux-image-extra<span class="hljs-number">-4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-32</span>-<span class="hljs-keyword">generic</span> (<span class="hljs-number">4.8</span><span class="hljs-number">.0</span><span class="hljs-number">-32.34</span>) ...

#####################################
Finished removing unused config files
#####################################

Reading package lists... Done
Building dependency tree       
Reading state information... Done
Del tilix <span class="hljs-number">1.5</span><span class="hljs-number">.6</span><span class="hljs-number">-1</span>~webupd8~yakkety1 [<span class="hljs-number">449</span> kB]
Del tilix-common <span class="hljs-number">1.5</span><span class="hljs-number">.6</span><span class="hljs-number">-1</span>~webupd8~yakkety1 [<span class="hljs-number">174</span> kB]
Del libfreetype6 <span class="hljs-number">2.6</span><span class="hljs-number">.3</span><span class="hljs-number">-3</span>ubuntu1<span class="hljs-number">.2</span> [<span class="hljs-number">336</span> kB]
Del terminix <span class="hljs-number">1.5</span><span class="hljs-number">.6</span><span class="hljs-number">-1</span>~webupd8~yakkety1 [<span class="hljs-number">13.7</span> kB]

######################################
 Cleaned downloaded temporary packages
######################################

#########################
          Done
#########################

</code></pre><p>我可以看见它如预期那样工作。同样也可以发现大概在<code>/</code> 分区节省了 <code>2GB</code>。</p>
<pre><code class="hljs lsl">$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            <span class="hljs-number">979</span>M     <span class="hljs-number">0</span>  <span class="hljs-number">979</span>M   <span class="hljs-number">0</span>% /dev
tmpfs           <span class="hljs-number">200</span>M  <span class="hljs-number">6.4</span>M  <span class="hljs-number">194</span>M   <span class="hljs-number">4</span>% /run
/dev/sda1        <span class="hljs-number">38</span>G   <span class="hljs-number">18</span>G   <span class="hljs-number">19</span>G  <span class="hljs-number">49</span>% /
tmpfs           <span class="hljs-number">999</span>M  <span class="hljs-number">216</span>K  <span class="hljs-number">999</span>M   <span class="hljs-number">1</span>% /dev/shm
tmpfs           <span class="hljs-number">5.0</span>M  <span class="hljs-number">4.0</span>K  <span class="hljs-number">5.0</span>M   <span class="hljs-number">1</span>% /run/lock
tmpfs           <span class="hljs-number">999</span>M     <span class="hljs-number">0</span>  <span class="hljs-number">999</span>M   <span class="hljs-number">0</span>% /sys/fs/cgroup
tmpfs           <span class="hljs-number">200</span>M  <span class="hljs-number">112</span>K  <span class="hljs-number">200</span>M   <span class="hljs-number">1</span>% /run/user/<span class="hljs-number">1000</span>

</code></pre><hr>
<p>via: <a href="http://www.2daygeek.com/ucaresystem-system-update-and-maintenance-tool-for-ubuntu-linuxmint/">http://www.2daygeek.com/ucaresystem-system-update-and-maintenance-tool-for-ubuntu-linuxmint/</a></p>
<p>作者：<a href="http://www.2daygeek.com/author/2daygeek/">2DAYGEEK</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
uCareSystem：Ubuntu/Linux Mint 的一体化系统更新和维护工具

## 原文链接
[https://www.zcfy.cc/article/ucaresystem-all-in-one-system-update-and-maintenance-tool-for-ubuntulinuxmint](https://www.zcfy.cc/article/ucaresystem-all-in-one-system-update-and-maintenance-tool-for-ubuntulinuxmint)

