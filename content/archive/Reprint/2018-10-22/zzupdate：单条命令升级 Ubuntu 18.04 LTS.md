---
title: zzupdate：单条命令升级 Ubuntu 18.04 LTS
hidden: true
categories: reprint
slug: 8bc4dcb0
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#zzupdate单条命令升级-ubuntu-1804-lts"></a>zzupdate：单条命令升级 Ubuntu 18.04 LTS</h1>
<p>Ubuntu 18.04 版本已经发布，并得到各个社区的一致好评，因为 Ubuntu 18.04 可能是 Ubuntu 多年来最令人兴奋的版本。</p>
<p>通常情况下，Ubuntu 及其衍生版可以使用命令从一个版本升级到最新版本或者其它版本，这也是官方推荐的升级方式。</p>
<h3><a href="#ubuntu-1804-特性亮点"></a>Ubuntu 18.04 特性/亮点</h3>
<p>这次更新包含大量改进和新功能，这里只列举的几个主要的。如果您想要更详细的更新信息，请访问 <a href="https://wiki.ubuntu.com/BionicBeaver/ReleaseNotes">Ubuntu 18.04 官方</a> 页面。</p>
<ul>
<li>使用 Linux 4.15 内核，提供了从上游继承的新功能</li>
<li>它具有最新版本的 GNOME 3.28</li>
<li>它提供了与 RHEL 相似的最简安装选项，该选项可安装只包含一个 web 浏览器和核心系统程序的基本桌面环境</li>
<li>对于新安装，交换文件将取代默认的交换分区</li>
<li>您可以启用 Livepatch 安装内核更新而无需重新启动</li>
<li>笔记本电脑在使用电池供电时会在无操作 20 分钟后自动待机</li>
<li>不再提供 32 位的 Ubuntu 桌面安装程序映像</li>
</ul>
<p>注意：</p>
<ol>
<li>不要忘记备份重要数据。如果升级出现问题，我们将重新安装并恢复数据。</li>
<li>安装所需时间取决于您的网络状况和安装的程序。</li>
</ol>
<h3><a href="#zzupdate-是什么"></a>zzupdate 是什么？</h3>
<p>我们可以只通过一条命令使用 <a href="https://github.com/TurboLabIt/zzupdate">zzupdate</a> 工具中将 Ubuntu PC/Server 从一个版本升级到另一个版本。它是一个自由开源工具，使用它不需要任何脚本知识，因为它只需要配置文件即可运行。</p>
<p>工具中提供两个默认 shell 文件。<code>setup.sh</code> 自动安装、更新代码，将脚本转换为一个简单的 zzupdate shell 命令。<code>zzupdate.sh</code> 将执行版本间的升级。</p>
<h3><a href="#如何安装-zzupdate"></a>如何安装 zzupdate？</h3>
<p>要安装 <code>zzupdate</code>，只需执行以下命令：</p>
<pre><code class="hljs asciidoc">$ curl -s https://raw.githubusercontent.com/TurboLabIt/zzupdate/master/setup.sh | sudo sh
<span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span><span class="hljs-section">Installing...
-------------</span>
Cloning into <span class="hljs-emphasis">'zzupdate'</span>...
remote: Counting objects: 57, done.
remote: Total 57 (delta 0), reused 0 (delta 0), pack-reused 57
Unpacking objects: 100% (57/57), done.
Checking connectivity... done.
Already up-to-date.

<span class="hljs-section">Setup completed!
----------------</span>
See https://github.com/TurboLabIt/zzupdate for the quickstart guide.

</code></pre><p>将 Ubuntu 系统从一个版本升级到另一个版本，您不需要输入很多命令，也不需要重新启动，只需要运行下面的 <code>zzupdate</code> 命令并坐下喝杯咖啡就可以了。</p>
<p>请注意，当您远程升级系统时，建议您使用以下的工具来帮助您在任何断开连接时重新连接会话。</p>
<p>建议阅读： <a href="https://www.2daygeek.com/how-to-keep-a-process-command-running-after-disconnecting-ssh-session/">如何让一个进程/命令在 SSH 连接断开后继续运行</a></p>
<h3><a href="#如何配置-zzupdate可选"></a>如何配置 zzupdate（可选）</h3>
<p>默认情况下，<code>zzupdate</code> 可以开箱即用，不需要配置任何东西。当然，如果您想要自己配置一些内容也是可以的。复制提供的示例配置文件 <code>zzupdate.default.conf</code> 到 <code>zzupdate.conf</code>，并在 <code>zzupdate.conf</code> 中配置您的首选项。</p>
<pre><code class="hljs stylus">$ sudo cp /usr/local/turbolab.it/zzupdate/zzupdate<span class="hljs-selector-class">.default</span><span class="hljs-selector-class">.conf</span> /etc/turbolab.it/zzupdate<span class="hljs-selector-class">.conf</span>

</code></pre><p>打开文件，默认配置如下。</p>
<pre><code class="hljs makefile">$ sudo nano /etc/turbolab.it/zzupdate.conf

REBOOT=1
REBOOT_TIMEOUT=15
VERSION_UPGRADE=1
VERSION_UPGRADE_SILENT=0
COMPOSER_UPGRADE=1
SWITCH_PROMPT_TO_NORMAL=0

</code></pre><ul>
<li><code>REBOOT=1</code>：系统在更新完成后自动重启</li>
<li><code>REBOOT_TIMEOUT=15</code>：重启的默认超时值</li>
<li><code>VERSION_UPGRADE=1</code>：执行从一个版本到另一个版本的版本升级</li>
<li><code>VERSION_UPGRADE_SILENT=0</code>：禁用自动升级</li>
<li><code>COMPOSER_UPGRADE=1</code>：自动升级</li>
<li><code>SWITCH_PROMPT_TO_NORMAL=0</code>：如果值为 <code>0</code>，将寻找相同种类的版本升级。例如您正在运行 LTS 的版本，那么将寻找 LTS 的版本升级，而不是用于正常版本升级。如果值为 <code>1</code>，那么无论您是运行 LTS 还是正常版本，都会查找最新版本</li>
</ul>
<p>我现在正在使用 Ubuntu 17.10 ，查看一下详细信息。</p>
<pre><code class="hljs makefile">$ cat /etc/*-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=17.10
DISTRIB_CODENAME=artful
DISTRIB_DESCRIPTION=<span class="hljs-string">"Ubuntu 17.10"</span>
NAME=<span class="hljs-string">"Ubuntu"</span>
VERSION=<span class="hljs-string">"17.10 (Artful Aardvark)"</span>
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME=<span class="hljs-string">"Ubuntu 17.10"</span>
VERSION_ID=<span class="hljs-string">"17.10"</span>
HOME_URL=<span class="hljs-string">"https://www.ubuntu.com/"</span>
SUPPORT_URL=<span class="hljs-string">"https://help.ubuntu.com/"</span>
BUG_REPORT_URL=<span class="hljs-string">"https://bugs.launchpad.net/ubuntu/"</span>
PRIVACY_POLICY_URL=<span class="hljs-string">"https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"</span>
VERSION_CODENAME=artful
UBUNTU_CODENAME=artful


</code></pre><p>要升级 Ubuntu 到最新版本，只需要执行以下命令：</p>
<pre><code class="hljs asciidoc">$ sudo zzupdate

O===========================================================O
<span class="hljs-code"> zzupdate - Wed May 2 17:31:16 IST 2018</span>
O===========================================================O

<span class="hljs-section">Self-update and update of other zzScript
----------------------------------------</span>
<span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span>0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.

<span class="hljs-section">Updating...
----------</span>
Already up-to-date.

<span class="hljs-section">Setup completed!
----------------</span>
See https://github.com/TurboLabIt/zzupdate for the quickstart guide.

<span class="hljs-section">Channel switching is disabled: using pre-existing setting
---------------------------------------------------------</span>

<span class="hljs-section">Cleanup local cache
-------------------</span>

<span class="hljs-section">Update available packages informations
--------------------------------------</span>
Hit:1 https://download.docker.com/linux/ubuntu artful InRelease
Ign:2 http://dl.google.com/linux/chrome/deb stable InRelease
Hit:3 http://security.ubuntu.com/ubuntu artful-security InRelease
Hit:4 http://in.archive.ubuntu.com/ubuntu artful InRelease
Hit:5 http://dl.google.com/linux/chrome/deb stable Release
Hit:6 http://in.archive.ubuntu.com/ubuntu artful-updates InRelease
Hit:7 http://in.archive.ubuntu.com/ubuntu artful-backports InRelease
Hit:9 http://ppa.launchpad.net/notepadqq-team/notepadqq/ubuntu artful InRelease
Hit:10 http://ppa.launchpad.net/papirus/papirus/ubuntu artful InRelease
Hit:11 http://ppa.launchpad.net/twodopeshaggy/jarun/ubuntu artful InRelease
<span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span><span class="hljs-section">UPGRADE PACKAGES
----------------</span>
Reading package lists...
Building dependency tree...
Reading state information...
Calculating upgrade...
The following packages were automatically installed and are no longer required:
<span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span><span class="hljs-section">Interactively upgrade to a new release, if any
----------------------------------------------</span>

Reading cache

Checking package manager
Reading package lists... Done
Building dependency tree
Reading state information... Done
Ign http://dl.google.com/linux/chrome/deb stable InRelease
Hit https://download.docker.com/linux/ubuntu artful InRelease
Hit http://security.ubuntu.com/ubuntu artful-security InRelease
Hit http://dl.google.com/linux/chrome/deb stable Release
Hit http://in.archive.ubuntu.com/ubuntu artful InRelease
Hit http://in.archive.ubuntu.com/ubuntu artful-updates InRelease
Hit http://in.archive.ubuntu.com/ubuntu artful-backports InRelease
Hit http://ppa.launchpad.net/notepadqq-team/notepadqq/ubuntu artful InRelease
Hit http://ppa.launchpad.net/papirus/papirus/ubuntu artful InRelease
Hit http://ppa.launchpad.net/twodopeshaggy/jarun/ubuntu artful InRelease
Fetched 0 B in 6s (0 B/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done

</code></pre><p>我们需要按下回车键禁用第三方仓库以继续升级。</p>
<pre><code class="hljs livecodeserver">Updating repository information

Third party sources disabled

Some <span class="hljs-keyword">third</span> party entries <span class="hljs-keyword">in</span> your sources.list were disabled. You can
re-enable them <span class="hljs-keyword">after</span> <span class="hljs-keyword">the</span> upgrade <span class="hljs-keyword">with</span> <span class="hljs-keyword">the</span> <span class="hljs-string">'software-properties'</span> tool
<span class="hljs-keyword">or</span> your package manager.

To continue please press [ENTER]
.
.
Get:<span class="hljs-number">35</span> <span class="hljs-keyword">http</span>://<span class="hljs-keyword">in</span>.archive.ubuntu.com/ubuntu bionic-updates/universe i386 Packages [<span class="hljs-number">2</span>,<span class="hljs-number">180</span> B]
Get:<span class="hljs-number">36</span> <span class="hljs-keyword">http</span>://<span class="hljs-keyword">in</span>.archive.ubuntu.com/ubuntu bionic-updates/universe Translation-en [<span class="hljs-number">1</span>,<span class="hljs-number">644</span> B]
Fetched <span class="hljs-number">38.2</span> MB <span class="hljs-keyword">in</span> <span class="hljs-number">6</span>s (<span class="hljs-number">1</span>,<span class="hljs-number">276</span> kB/s)

Checking package manager
Reading package lists... Done
Building dependency tree
Reading state information... Done

Calculating <span class="hljs-keyword">the</span> changes

Calculating <span class="hljs-keyword">the</span> changes

</code></pre><p>开始下载 <code>Ubuntu 18.04 LTS</code> 软件包，所需时间取决于您的网络状况，一般情况下这将需要几分钟。</p>
<pre><code class="hljs sql"><span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">start</span> the <span class="hljs-keyword">upgrade</span>?


<span class="hljs-number">63</span> installed packages <span class="hljs-keyword">are</span> <span class="hljs-keyword">no</span> longer supported <span class="hljs-keyword">by</span> Canonical. You can
still <span class="hljs-keyword">get</span> support <span class="hljs-keyword">from</span> the community.

<span class="hljs-number">4</span> packages <span class="hljs-keyword">are</span> going <span class="hljs-keyword">to</span> be removed. <span class="hljs-number">175</span> <span class="hljs-keyword">new</span> packages <span class="hljs-keyword">are</span> going <span class="hljs-keyword">to</span> be
installed. <span class="hljs-number">1307</span> packages <span class="hljs-keyword">are</span> going <span class="hljs-keyword">to</span> be upgraded.

You have <span class="hljs-keyword">to</span> download a total <span class="hljs-keyword">of</span> <span class="hljs-number">999</span> M. This download will take about
<span class="hljs-number">12</span> minutes <span class="hljs-keyword">with</span> your connection.

Installing the <span class="hljs-keyword">upgrade</span> can take several hours. Once the download has
finished, the process cannot be canceled.

Continue [yN] Details [d]y
Fetching
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 base-files amd64 <span class="hljs-number">10.1</span>ubuntu2 [<span class="hljs-number">58.2</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">2</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 debianutils amd64 <span class="hljs-number">4.8</span><span class="hljs-number">.4</span> [<span class="hljs-number">85.7</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">3</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 bash amd64 <span class="hljs-number">4.4</span><span class="hljs-number">.18</span><span class="hljs-number">-2</span>ubuntu1 [<span class="hljs-number">614</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">4</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 locales all <span class="hljs-number">2.27</span><span class="hljs-number">-3</span>ubuntu1 [<span class="hljs-number">3</span>,<span class="hljs-number">612</span> kB]
.
.
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1477</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 liblouisutdml-<span class="hljs-keyword">bin</span> amd64 <span class="hljs-number">2.7</span><span class="hljs-number">.0</span><span class="hljs-number">-1</span> [<span class="hljs-number">9</span>,<span class="hljs-number">588</span> B]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1478</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/universe amd64 libtbb2 amd64 <span class="hljs-number">2017</span>~U7<span class="hljs-number">-8</span> [<span class="hljs-number">110</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1479</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 libyajl2 amd64 <span class="hljs-number">2.1</span><span class="hljs-number">.0</span><span class="hljs-number">-2</span>build1 [<span class="hljs-number">20.0</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1480</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 usb-modeswitch amd64 <span class="hljs-number">2.5</span><span class="hljs-number">.2</span>+repack0<span class="hljs-number">-2</span>ubuntu1 [<span class="hljs-number">53.6</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1481</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 usb-modeswitch-<span class="hljs-keyword">data</span> all <span class="hljs-number">20170806</span><span class="hljs-number">-2</span> [<span class="hljs-number">30.7</span> kB]
<span class="hljs-keyword">Get</span>:<span class="hljs-number">1482</span> <span class="hljs-keyword">http</span>://in.archive.ubuntu.com/ubuntu bionic/<span class="hljs-keyword">main</span> amd64 xbrlapi amd64 <span class="hljs-number">5.5</span><span class="hljs-number">-4</span>ubuntu2 [<span class="hljs-number">61.8</span> kB]
Fetched <span class="hljs-number">999</span> MB <span class="hljs-keyword">in</span> <span class="hljs-number">6</span>s (<span class="hljs-number">721</span> kB/s)

</code></pre><p>安装新软件包时，很少有服务需要重新启动。 点击 <code>Yes</code> 按钮，它会自动重启所需的服务。</p>
<pre><code class="hljs routeros">Upgrading
Inhibiting until Ctrl+C is pressed<span class="hljs-built_in">..</span>.
Preconfiguring packages <span class="hljs-built_in">..</span>.
Preconfiguring packages <span class="hljs-built_in">..</span>.
Preconfiguring packages <span class="hljs-built_in">..</span>.
Preconfiguring packages <span class="hljs-built_in">..</span>.
(Reading database <span class="hljs-built_in">..</span>. 441375 files <span class="hljs-keyword">and</span> directories currently installed.)
Preparing <span class="hljs-keyword">to</span> unpack <span class="hljs-built_in">..</span>./base-files_10.1ubuntu2_amd64.deb <span class="hljs-built_in">..</span>.
Warning: Stopping motd-news.service, but it can still be activated by:
 motd-news.timer
Unpacking base-files (10.1ubuntu2) over (9.6ubuntu102) <span class="hljs-built_in">..</span>.
Setting up base-files (10.1ubuntu2) <span class="hljs-built_in">..</span>.
Installing new version of<span class="hljs-built_in"> config </span>file /etc/debian_version <span class="hljs-built_in">..</span>.
Installing new version of<span class="hljs-built_in"> config </span>file /etc/issue <span class="hljs-built_in">..</span>.
Installing new version of<span class="hljs-built_in"> config </span>file /etc/issue.net <span class="hljs-built_in">..</span>.
Installing new version of<span class="hljs-built_in"> config </span>file /etc/lsb-release <span class="hljs-built_in">..</span>.
motd-news.service is a disabled <span class="hljs-keyword">or</span> a static unit, <span class="hljs-keyword">not</span> starting it.
(Reading database <span class="hljs-built_in">..</span>. 441376 files <span class="hljs-keyword">and</span> directories currently installed.)
.
.
Progress: [ 80%]

Progress: [ 85%]

Progress: [ 90%]

Progress: [ 95%]


</code></pre><p>现在删除旧版的、系统不再需要的包。点击 <code>y</code> 以删除。</p>
<pre><code class="hljs pf">Searching <span class="hljs-keyword">for</span> obsolete software
 ing package lists... <span class="hljs-number">97</span>%
 ding package lists... <span class="hljs-number">98</span>%
Reading package lists... Done
Building dependency tree
Reading <span class="hljs-keyword">state</span> information... Done
Reading <span class="hljs-keyword">state</span> information... <span class="hljs-number">23</span>%
Reading <span class="hljs-keyword">state</span> information... <span class="hljs-number">47</span>%
Reading <span class="hljs-keyword">state</span> information... <span class="hljs-number">71</span>%
Reading <span class="hljs-keyword">state</span> information... <span class="hljs-number">94</span>%
Reading <span class="hljs-keyword">state</span> information... Done

Remove obsolete packages?


<span class="hljs-number">88</span> packages are going <span class="hljs-keyword">to</span> be removed.

Continue [yN] Details [d]y
.
.
.
done
Removing perlmagick (<span class="hljs-number">8</span>:<span class="hljs-number">6.9</span>.<span class="hljs-number">7.4</span>+dfsg-<span class="hljs-number">16</span>ubuntu6) ...
Removing snapd-login-service (<span class="hljs-number">1.23</span>-<span class="hljs-number">0</span>ubuntu1) ...
Processing triggers <span class="hljs-keyword">for</span> libc-bin (<span class="hljs-number">2.27</span>-<span class="hljs-number">3</span>ubuntu1) ...
Processing triggers <span class="hljs-keyword">for</span> man-db (<span class="hljs-number">2.8</span>.<span class="hljs-number">3</span>-<span class="hljs-number">2</span>) ...
Processing triggers <span class="hljs-keyword">for</span> dbus (<span class="hljs-number">1.12</span>.<span class="hljs-number">2</span>-<span class="hljs-number">1</span>ubuntu1) ...
Fetched <span class="hljs-number">0</span> B <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>s (<span class="hljs-number">0</span> B/s)


</code></pre><p>升级成功，需要重启系统。点击 <code>y</code> 以重启系统。</p>
<pre><code class="hljs vbnet">System upgrade <span class="hljs-keyword">is</span> complete.

Restart required

<span class="hljs-keyword">To</span> finish the upgrade, a restart <span class="hljs-keyword">is</span> required.
<span class="hljs-keyword">If</span> you <span class="hljs-keyword">select</span> <span class="hljs-comment">'y' the system will be restarted.</span>

<span class="hljs-keyword">Continue</span> [yN]y


</code></pre><p>注意： 少数情况下，会要求您确认配置文件替换以继续安装。</p>
<p>查看升级后的系统详情：</p>
<pre><code class="hljs makefile">$ cat /etc/*-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=18.04
DISTRIB_CODENAME=bionic
DISTRIB_DESCRIPTION=<span class="hljs-string">"Ubuntu 18.04 LTS"</span>
NAME=<span class="hljs-string">"Ubuntu"</span>
VERSION=<span class="hljs-string">"18.04 LTS (Bionic Beaver)"</span>
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME=<span class="hljs-string">"Ubuntu 18.04 LTS"</span>
VERSION_ID=<span class="hljs-string">"18.04"</span>
HOME_URL=<span class="hljs-string">"https://www.ubuntu.com/"</span>
SUPPORT_URL=<span class="hljs-string">"https://help.ubuntu.com/"</span>
BUG_REPORT_URL=<span class="hljs-string">"https://bugs.launchpad.net/ubuntu/"</span>
PRIVACY_POLICY_URL=<span class="hljs-string">"https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"</span>
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic

</code></pre><hr>
<p>via: <a href="https://www.2daygeek.com/zzupdate-single-command-to-upgrade-ubuntu-18-04/">https://www.2daygeek.com/zzupdate-single-command-to-upgrade-ubuntu-18-04/</a></p>
<p>作者：<a href="https://www.2daygeek.com/author/prakash/">PRAKASH SUBRAMANIAN</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/XiatianSummer">XiatianSummer</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/zzupdate-single-command-to-upgrade-ubuntu](https://www.zcfy.cc/article/zzupdate-single-command-to-upgrade-ubuntu)

## 原文标题
zzupdate：单条命令升级 Ubuntu 18.04 LTS
