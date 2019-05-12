---
title: '如何安装 pandom ： 一个针对 Linux 的真随机数生成器' 
date: 2019-01-23 2:30:08
hidden: true
slug: a4ccruc7hsg
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何安装-pandom--一个针对-linux-的真随机数生成器"></a>如何安装 pandom ： 一个针对 Linux 的真随机数生成器</h1>
<p>本教程只针对 amd64/x86_64 架构 Linux 内核版本大于等于 2.6.9 的系统。本文将解释如何安装 <a href="http://ncomputers.org/pandom">pandom</a>，这是一个由 ncomputers.org 维护的定时抖动真随机数生成器。</p>
<h3><a href="#简介"></a>简介</h3>
<p>在现在的计算机状况下，比如说配置了固态硬盘（SSD）的个人电脑和虚拟专用服务器（VPS）的环境中，Linux 内核内置的真随机数发生器提供的吞吐量很低。</p>
<p>而出于各种不同的加密目的使得对真随机数的需求持续增长，从而使得这个低吞吐量问题在 Linux 实现中变得越来越严重。</p>
<p>在与上述相同的物理或者虚拟环境下，并假设没有其它进程以 root 身份向 <code>/dev/random</code> 进行写操作的话，64 <a href="http://ncomputers.org/ubit">ubits</a>/64 bits 的 pandom 可以以 8 KiB/s 的速率生成随机数。</p>
<h3><a href="#1-pandom-的安装"></a>1 pandom 的安装</h3>
<h4><a href="#11-获得-root-权限"></a>1.1 获得 root 权限</h4>
<p>Pandom 必须以 root 身份来安装，所以在必要的时候请运行如下命令：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">su</span> -

</code></pre><h4><a href="#12-安装编译所需的依赖"></a>1.2 安装编译所需的依赖</h4>
<p>为了下载并安装 pandom，你需要 GNU <code>as</code> 汇编器、GNU <code>make</code>、GNU <code>tar</code> 和 GNU <code>wget</code> (最后两个工具通常已被安装)。随后你可以按照你的意愿卸载它们。</p>
<p><strong>基于 Arch 的系统：</strong></p>
<pre><code class="hljs armasm"><span class="hljs-symbol">pacman</span> -S <span class="hljs-keyword">binutils </span>make

</code></pre><p><strong>基于 Debian 的系统：</strong></p>
<pre><code class="hljs armasm"><span class="hljs-symbol">apt</span>-<span class="hljs-meta">get</span> install <span class="hljs-keyword">binutils </span>make

</code></pre><p>基于 Red Hat 的系统：</p>
<pre><code class="hljs mipsasm">dnf <span class="hljs-keyword">install </span><span class="hljs-keyword">binutils </span>make
yum <span class="hljs-keyword">install </span><span class="hljs-keyword">binutils </span>make

</code></pre><p><strong>基于 SUSE 的系统：</strong></p>
<pre><code class="hljs mipsasm">zypper <span class="hljs-keyword">install </span><span class="hljs-keyword">binutils </span>make

</code></pre><h4><a href="#13-下载并析出源码"></a>1.3 下载并析出源码</h4>
<p>下面的命令将使用 <code>wget</code> 和 <code>tar</code> 从 ncomputers.org 下载 pandom 的源代码并将它们解压出来：</p>
<pre><code class="hljs stylus">wget http:<span class="hljs-comment">//ncomputers.org/pandom.tar.gz</span>
tar xf pandom<span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
cd pandom/amd64-linux

</code></pre><h4><a href="#14-在安装前进行测试-推荐"></a>1.4 在安装前进行测试 (推荐)</h4>
<p>这个被推荐的测试将花费大约 8 分钟的时间，它将检查内核支持情况并生成一个名为 <code>checkme</code> 的文件（在下一节中将被分析）。</p>
<pre><code class="hljs smali">make<span class="hljs-built_in"> check
</span>
</code></pre><h4><a href="#15-确定系统的初始化程序"></a>1.5 确定系统的初始化程序</h4>
<p>在安装 pandom 之前，你需要知道你的系统使用的是哪个初始化程序。假如下面命令的输出中包含 <code>running</code>，则意味着你的系统使用了 <code>systemd</code>，否则你的系统则可能使用了一个 <code>init.d</code> 的实现（例如 upstart、sysvinit）。</p>
<pre><code class="hljs applescript">systemctl <span class="hljs-keyword">is</span>-system-<span class="hljs-built_in">running</span>
<span class="hljs-built_in">running</span>

</code></pre><h4><a href="#16-安装-pandom"></a>1.6 安装 pandom</h4>
<p>一旦你知道了你的系统使用何种 Linux 实现，那么你就可以相应地安装 pandom 了。</p>
<p><strong>使用基于 init.d 作为初始化程序（如： upstart、sysvinit）的系统：</strong></p>
<p>假如你的系统使用了一个 init.d 的实现（如： upstart、sysvinit），请运行下面的命令来安装 pandom：</p>
<pre><code class="hljs stylus">make install-init<span class="hljs-selector-class">.d</span>

</code></pre><p><strong>以 systemd 作为初始化程序的系统：</strong></p>
<p>假如你的系统使用 <code>systemd</code>，则请运行以下命令来安装 pandom：</p>
<pre><code class="hljs cmake">make <span class="hljs-keyword">install</span>-systemd

</code></pre><h3><a href="#2-checkme-文件的分析"></a>2 checkme 文件的分析</h3>
<p>在使用 pandom 进行加密之前，强烈建议分析一下先前在安装过程中生成的 <code>checkme</code> 文件。通过分析我们便可以知道用 pandom 生成的数是否真的随机。本节将解释如何使用 ncomputers.org 的 shell 脚本 <code>entropyarray</code> 来测试由 pandom 产生的输出的熵及序列相关性。</p>
<p><strong>注</strong>：整个分析过程也可以在另一台电脑上完成，例如在一个笔记本电脑或台式机上。举个例子：假如你正在一个资源受到限制的 VPS 上安装 pandom 程序，或许你更倾向于将 <code>checkme</code> 复制到自己的个人电脑中，然后再进行分析。</p>
<h4><a href="#21-获取-root-权限"></a>2.1 获取 root 权限</h4>
<p><code>entropyarray</code> 程序也必须以 root 身份来安装，所以在必要时请运行如下命令：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">su</span> -

</code></pre><h4><a href="#22-安装编译所需的依赖"></a>2.2 安装编译所需的依赖</h4>
<p>为了下载并安装 <code>entropyarray</code>， 你需要 GNU g++ 编译器、GNU <code>make</code>、GNU <code>tar</code> 和 GNU <code>wget</code>。在随后你可以任意卸载这些依赖。</p>
<p><strong>基于 Arch 的系统：</strong></p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">pacman -S gcc make</span>

</code></pre><p><strong>基于 Debian 的系统：</strong></p>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install g++ make

</code></pre><p><strong>基于 Red Hat 的系统：</strong></p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">dnf</span> <span class="hljs-comment">install</span> <span class="hljs-comment">gcc</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span> <span class="hljs-comment">make</span>
<span class="hljs-comment">yum</span> <span class="hljs-comment">install</span> <span class="hljs-comment">gcc</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span> <span class="hljs-comment">make</span>

</code></pre><p><strong>基于 SUSE 的系统：</strong></p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">zypper</span> <span class="hljs-comment">install</span> <span class="hljs-comment">gcc</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span> <span class="hljs-comment">make</span>

</code></pre><h4><a href="#23-下载并析出源码"></a>2.3 下载并析出源码</h4>
<p>以下命令将使用 <code>wget</code> 和 <code>tar</code> 从 ncomputers.org 下载到 entropyarray 的源码并进行解压：</p>
<pre><code class="hljs stylus">wget http:<span class="hljs-comment">//ncomputers.org/rearray.tar.gz</span>
wget http:<span class="hljs-comment">//ncomputers.org/entropy.tar.gz</span>
wget http:<span class="hljs-comment">//ncomputers.org/entropyarray.tar.gz</span>

tar xf entropy<span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
tar xf rearray<span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
tar xf entropyarray<span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>

</code></pre><h4><a href="#24-安装-entropyarray"></a>2.4 安装 entropyarray</h4>
<p><strong>注</strong>：如果在编译过程中报有关 <code>-std=c++11</code> 的错误，则说明当前系统安装的 GNU g++ 版本不支持 ISO C++ 2011 标准，那么你可能需要在另一个支持该标准的系统中编译 ncomputers.org/entropy 和 ncomputers.org/rearray （例如在一个你喜爱的较新的 Linux 发行版本中来编译）。接着使用 <code>make install</code> 来安装编译好的二进制文件，再接着你可能想继续运行 <code>entropyarray</code> 程序，或者跳过运行该程序这一步骤，然而我还是建议在使用 pandom 来达到加密目地之前先分析一下 <code>checkme</code> 文件。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> rearray; make install; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
<span class="hljs-keyword">cd</span> entropy; make install; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
<span class="hljs-keyword">cd</span> entropyarray; make install; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>

</code></pre><h4><a href="#25-分析-checkme-文件"></a>2.5 分析 checkme 文件</h4>
<p><strong>注</strong>：64 <a href="http://ncomputers.org/ubit">ubits</a> / 64 bits 的 pandom 实现所生成的结果中熵应该高于 <code>15.977</code> 且 <code>max</code> 字段低于 <code>70</code>。假如你的结果与之相差巨大，或许你应该按照下面第 5 节介绍的那样增加你的 pandom 实现的不可预测性。假如你跳过了生成 <code>checkme</code> 文件的那一步，你也可以使用其他的工具来进行测试，例如 <a href="http://www.fourmilab.ch/random/">伪随机数序列测试</a>。</p>
<pre><code class="hljs groovy">entropyarray checkme

entropyarray <span class="hljs-keyword">in</span> <span class="hljs-regexp">/tmp/</span>tmp.mbCopmzqsg
<span class="hljs-number">15.977339</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">56</span>
<span class="hljs-number">15.977368</span>
<span class="hljs-string">min:</span><span class="hljs-number">11</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">58</span>
<span class="hljs-number">15.977489</span>
<span class="hljs-string">min:</span><span class="hljs-number">11</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">59</span>
<span class="hljs-number">15.977077</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">60</span>
<span class="hljs-number">15.977439</span>
<span class="hljs-string">min:</span><span class="hljs-number">8</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">59</span>
<span class="hljs-number">15.977374</span>
<span class="hljs-string">min:</span><span class="hljs-number">13</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">60</span>
<span class="hljs-number">15.977312</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">67</span>

</code></pre><h4><a href="#26-卸载-entropyarray-可选"></a>2.6 卸载 entropyarray (可选)</h4>
<p>假如你打算不再使用 <code>entropyarray</code>，那么你可以按照你自己的需求卸载它：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> entropyarray; make uninstall; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
<span class="hljs-keyword">cd</span> entropy; make uninstall; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
<span class="hljs-keyword">cd</span> rearray; make uninstall; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>

</code></pre><h3><a href="#3-使用-debian-的软件仓库来进行安装"></a>3 使用 debian 的软件仓库来进行安装</h3>
<p>假如你想在你基于 debian 的系统中让 pandom 保持更新，则你可以使用 ncomputers.org 的 debian 软件仓库来安装或者重新安装它。</p>
<h4><a href="#31-获取-root-权限"></a>3.1 获取 root 权限</h4>
<p>以下的 debian 软件包必须以 root 身份来安装，所以在必要时请运行下面这个命令：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">su</span> -

</code></pre><h4><a href="#32-安装密钥"></a>3.2 安装密钥</h4>
<p>下面的 debian 软件包中包含 ncomputers.org debian 软件仓库的公匙密钥：</p>
<pre><code class="hljs stylus">wget http:<span class="hljs-comment">//ncomputers.org/debian/keyring.deb</span>
dpkg -<span class="hljs-selector-tag">i</span> keyring<span class="hljs-selector-class">.deb</span>
rm keyring<span class="hljs-selector-class">.deb</span>

</code></pre><h4><a href="#33-安装软件源列表"></a>3.3 安装软件源列表</h4>
<p>下面这些 debian 软件包含有 ncomputers.org debian 软件仓库的软件源列表，这些软件源列表对应最新的 debian 发行版本(截至 2017 年)。</p>
<p><strong>注</strong>：你也可以将下面的以 <code>#</code> 注释的行加入 <code>/etc/apt/sources.list</code> 文件中，而不是为你的 debian 发行版本安装对应的 debian 软件包。但假如这些源在将来改变了，你就需要手动更新它们。</p>
<p><strong>Wheezy：</strong></p>
<pre><code class="hljs stylus"><span class="hljs-number">#deb</span> http:<span class="hljs-comment">//ncomputers.org/debian wheezy main</span>
wget http:<span class="hljs-comment">//ncomputers.org/debian/wheezy.deb</span>
dpkg -<span class="hljs-selector-tag">i</span> wheezy<span class="hljs-selector-class">.deb</span>
rm wheezy<span class="hljs-selector-class">.deb</span>

</code></pre><p>Jessie：</p>
<pre><code class="hljs stylus"><span class="hljs-number">#deb</span> http:<span class="hljs-comment">//ncomputers.org/debian jessie main</span>
wget http:<span class="hljs-comment">//ncomputers.org/debian/jessie.deb</span>
dpkg -<span class="hljs-selector-tag">i</span> jessie<span class="hljs-selector-class">.deb</span>
rm jessie<span class="hljs-selector-class">.deb</span>

</code></pre><p><strong>Stretch：</strong></p>
<pre><code class="hljs stylus"><span class="hljs-number">#deb</span> http:<span class="hljs-comment">//ncomputers.org/debian stretch main</span>
wget http:<span class="hljs-comment">//ncomputers.org/debian/stretch.deb</span>
dpkg -<span class="hljs-selector-tag">i</span> stretch<span class="hljs-selector-class">.deb</span>
rm stretch<span class="hljs-selector-class">.deb</span>

</code></pre><h4><a href="#34-升级软件源列表"></a>3.4 升级软件源列表</h4>
<p>一旦密钥和软件源列表安装完成，则可以使用下面的命令来更新：</p>
<pre><code class="hljs q">apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>

</code></pre><h4><a href="#35-测试-pandom"></a>3.5 测试 pandom</h4>
<p>测试完毕后，你可以随意卸载下面的软件包。</p>
<p><strong>注</strong>：假如你已经在你的 Linux 中测试了 pandom ， 则你可以跳过这一步。</p>
<pre><code class="hljs groovy">apt-get install pandom-test
pandom-test

generating checkme file, please wait around <span class="hljs-number">8</span> minutes ...
entropyarray <span class="hljs-keyword">in</span> <span class="hljs-regexp">/tmp/</span>tmp<span class="hljs-number">.5</span>SkiYsYG3h
<span class="hljs-number">15.977366</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">57</span>
<span class="hljs-number">15.977367</span>
<span class="hljs-string">min:</span><span class="hljs-number">13</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">57</span>
<span class="hljs-number">15.977328</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">61</span>
<span class="hljs-number">15.977431</span>
<span class="hljs-string">min:</span><span class="hljs-number">12</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">59</span>
<span class="hljs-number">15.977437</span>
<span class="hljs-string">min:</span><span class="hljs-number">11</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">57</span>
<span class="hljs-number">15.977298</span>
<span class="hljs-string">min:</span><span class="hljs-number">11</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">59</span>
<span class="hljs-number">15.977196</span>
<span class="hljs-string">min:</span><span class="hljs-number">10</span>
<span class="hljs-string">med:</span><span class="hljs-number">32</span>
<span class="hljs-string">max:</span><span class="hljs-number">57</span>

</code></pre><h4><a href="#36-安装-pandom"></a>3.6 安装 pandom</h4>
<pre><code class="hljs routeros">apt-<span class="hljs-builtin-name">get</span> install pandom

</code></pre><h3><a href="#4-管理-pandom"></a>4 管理 pandom</h3>
<p>在 pandom 安装完成后，你可能想对它进行管理。</p>
<h4><a href="#41-性能测试"></a>4.1 性能测试</h4>
<p>pandom 提供大约 8 kB/s 的随机数生成速率，但它的性能可能根据环境而有所差异。</p>
<pre><code class="hljs lsl">dd if=/dev/random of=/dev/null bs=<span class="hljs-number">8</span> count=<span class="hljs-number">512</span>

<span class="hljs-number">512</span>+<span class="hljs-number">0</span> records in
<span class="hljs-number">512</span>+<span class="hljs-number">0</span> records out
<span class="hljs-number">4096</span> bytes (<span class="hljs-number">4.1</span> kB, <span class="hljs-number">4.0</span> KiB) copied, <span class="hljs-number">0.451253</span> s, <span class="hljs-number">9.1</span> kB/s

</code></pre><h4><a href="#42-熵和序列相关性检验"></a>4.2 熵和序列相关性检验</h4>
<p>除了 ncomputers.org/entropyarray，还存在更多的测试，例如 <a href="https://gerhardt.ch/random.php">Ilja Gerhardt 的 NIST 测试套件</a>。</p>
<pre><code class="hljs arduino">entropyarray /dev/<span class="hljs-built_in">random</span> <span class="hljs-number">1</span>M

</code></pre><h4><a href="#43-系统服务"></a>4.3 系统服务</h4>
<p>pandom 还可以以系统服务的形式运行。</p>
<p><strong>基于 init.d 的初始化系统（如 upstart、sysvinit）：</strong></p>
<pre><code class="hljs livecodeserver">/etc/init.d/<span class="hljs-built_in">random</span> status
/etc/init.d/<span class="hljs-built_in">random</span> <span class="hljs-built_in">start</span>
/etc/init.d/<span class="hljs-built_in">random</span> <span class="hljs-built_in">stop</span>
/etc/init.d/<span class="hljs-built_in">random</span> restart

</code></pre><p><strong>以 systemd 作为初始化程序的系统：</strong></p>
<pre><code class="hljs livecodeserver">systemctl status <span class="hljs-built_in">random</span>
systemctl <span class="hljs-built_in">start</span> <span class="hljs-built_in">random</span>
systemctl <span class="hljs-built_in">stop</span> <span class="hljs-built_in">random</span>
systemctl restart <span class="hljs-built_in">random</span>

</code></pre><h3><a href="#5-增强不可预测性或者性能"></a>5 增强不可预测性或者性能</h3>
<p>假如你想增加你编译的 pandom 程序的不可预测性或者性能，你可以尝试增加或删减 CPU 时间测量选项。</p>
<h4><a href="#51-编辑源文件"></a>5.1 编辑源文件</h4>
<p>请按照自己的意愿，在源文件 <code>test.s</code> 和 <code>tRNG.s</code> 中增加或者移除 <code>measurement blocks</code> 字段。</p>
<pre><code class="hljs perl"><span class="hljs-comment">#measurement block</span>
mov $35,%rax
<span class="hljs-keyword">syscall</span>
rdtsc
[...]

<span class="hljs-comment">#measurement block</span>
mov $35,%rax
<span class="hljs-keyword">syscall</span>
rdtsc
[...]

</code></pre><h4><a href="#52-测试不可预测性"></a>5.2 测试不可预测性</h4>
<p>我们总是建议在使用个人定制的 pandom 实现来用于加密目地之前，先进行一些测试。</p>
<pre><code class="hljs smali">make<span class="hljs-built_in"> check
</span>
</code></pre><h4><a href="#53-安装定制的-pandom"></a>5.3 安装定制的 pandom</h4>
<p>假如你对测试的结果很满意，你就可以使用下面的命令来安装你的 pandom 实现。</p>
<pre><code class="hljs cmake">make <span class="hljs-keyword">install</span>

</code></pre><p>更多额外信息及更新详见 <a href="http://ncomputers.org/pandom">http://ncomputers.org/pandom</a></p>
<hr>
<p>via: <a href="https://www.howtoforge.com/tutorial/how-to-install-pandom-a-true-random-number-generator/">https://www.howtoforge.com/tutorial/how-to-install-pandom-a-true-random-number-generator/</a></p>
<p>作者：<a href="https://www.howtoforge.com/tutorial/how-to-install-pandom-a-true-random-number-generator/">Oliver</a> 译者：<a href="https://github.com/FSSlc">FSSlc</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何安装 pandom ： 一个针对 Linux 的真随机数生成器

## 原文链接
[https://www.zcfy.cc/article/how-to-install-pandom-a-true-random-number-generator-for-linux](https://www.zcfy.cc/article/how-to-install-pandom-a-true-random-number-generator-for-linux)

