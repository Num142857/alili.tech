---
title: '漫谈传统的 Linux 初始化系统的运行级别' 
date: 2019-01-22 2:30:07
hidden: true
slug: 2uixz9s7bq2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#漫谈传统的-linux-初始化系统的运行级别"></a>漫谈传统的 Linux 初始化系统的运行级别</h1>
<blockquote>
<p>了解运行级别是如何配置的，如何改变系统运行级别以及修改对应状态下运行的服务。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/ec2818e32d00e80a6ffd61ee720aef9ab344e07f/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031372f30392f72756e2d6c6576656c732d76696e63656e745f6465736a617264696e732d3130303733343638352d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01cf570bda77c5ac02.jpg" alt="操作 Linux 的运行级别"></a></p>
<p>在 Linux 系统中，运行级别run level是指运维的级别，用于描述一种表明什么服务是可用的系统运行状态。</p>
<p>运行级别 1 是严格限制的，仅仅用于系统维护；该级别下，网络连接将不可操作，但是管理员可以通过控制台连接登录系统。</p>
<p>其他运行级别的系统允许任何人登录和使用，但是不同级别中可使用的服务不同。本文将探索如何配置运行级别，如何交互式改变系统运行级别以及修改该状态下可用的服务。</p>
<p>Linux 系统的默认运行状态是一个在系统开机时使用的运行级别（除非有其他的指示），它通常是在 <code>/etc/inittab</code> 文件中进行配置的，该文件内容通常如下：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">id</span><span class="hljs-selector-pseudo">:3</span><span class="hljs-selector-pseudo">:initdefault</span>

</code></pre><p>包括 Debian 系统在内的一些系统，默认运行级别为 2，而不是上述文件中的 3，甚至都没有 <code>/etc/inittab</code> 文件。</p>
<p>运行级别在默认情况下是如何被配置，其配置依赖于你所运行的 Linux 操作系统的具体发行版本。 例如，在某些系统中， 运行级别 2 是多用户模式，运行级别 3 是多用户模式并支持 NFS （网络文件系统）。 在另外一些系统，运行级别 2 - 5 基本相同，运行级别 1 是单用户模式。例如，Debian 系统的所用运行级别如下：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span>= 停机
<span class="hljs-symbol">1 </span>= 单用户（维护模式）
<span class="hljs-symbol">2 </span>= 多用户模式
<span class="hljs-number">3</span>-<span class="hljs-number">5</span> = 同 <span class="hljs-number">2</span> 一样
<span class="hljs-symbol">6 </span>= 重启

</code></pre><p>在 Linux 系统上，运行级别 3 用于共享文件系统给其它系统，可以方便地只通过改变系统的运行级别来启动和停止文件系统共享。系统从运行级别 2 改变到 3 系统将允许文件系统共享，反之从运行级别 3 改变到 2 则系统不支持文件系统共享。</p>
<p>在某个运行级别中，系统运行哪些进程依赖于目录 <code>/etc/rc?.d</code> 目录的内容，其中 <code>?</code> 可以是 2、 3、 4 或 5 （对应于相应的运行级别）。</p>
<p>在以下示例中（Ubuntu 系统），由于这些目录的配置是相同的，我们将看见上述 4 个级别对应的目录中的内容是一致的。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-string">/etc/rc2.d</span>$ <span class="hljs-keyword">ls</span>
README         S20smartmontools      S50saned      S99grub-common
S20kerneloops  S20speech-dispatcher  S70dns-clean  S99ondemand
S20rsync       S20sysstat            S70pppd-dns   S99rc.local
<span class="hljs-string">/etc/rc2.d</span>$ <span class="hljs-keyword">cd</span> <span class="hljs-string">../rc3.d</span>
<span class="hljs-string">/etc/rc3.d</span>$ <span class="hljs-keyword">ls</span>
README         S20smartmontools      S50saned      S99grub-common
S20kerneloops  S20speech-dispatcher  S70dns-clean  S99ondemand
S20rsync       S20sysstat            S70pppd-dns   S99rc.local
<span class="hljs-string">/etc/rc3.d</span>$ <span class="hljs-keyword">cd</span> <span class="hljs-string">../rc4.d</span>
<span class="hljs-string">/etc/rc4.d</span>$ <span class="hljs-keyword">ls</span>
README         S20smartmontools      S50saned      S99grub-common
S20kerneloops  S20speech-dispatcher  S70dns-clean  S99ondemand
S20rsync       S20sysstat            S70pppd-dns   S99rc.local
<span class="hljs-string">/etc/rc4.d</span>$ <span class="hljs-keyword">cd</span> <span class="hljs-string">../rc5.d</span>
<span class="hljs-string">/etc/rc5.d</span>$ <span class="hljs-keyword">ls</span>
README         S20smartmontools      S50saned      S99grub-common
S20kerneloops  S20speech-dispatcher  S70dns-clean  S99ondemand
S20rsync       S20sysstat            S70pppd-dns   S99rc.local

</code></pre><p>这些都是什么文件？它们都是指向 <code>/etc/init.d</code> 目录下用于启动服务的脚本符号连接。 这些文件的文件名是至关重要的， 因为它们决定了这些脚本文件的执行顺序，例如, S20 脚本是在 S50 脚本前面运行的。</p>
<pre><code class="hljs tap">$ ls -l
total 4
-rw-r--r--<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 677 </span>Feb<span class="hljs-number"> 16 </span><span class="hljs-number"> 2016 </span>README
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 20 </span>Aug<span class="hljs-number"> 30 </span>14:40 S20kerneloops -&gt; ../init.d/kerneloops
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 15 </span>Aug<span class="hljs-number"> 30 </span>14:40 S20rsync -&gt; ../init.d/rsync
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 23 </span>Aug<span class="hljs-number"> 30 </span>16:10 S20smartmontools -&gt; ../init.d/smartmontools
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 27 </span>Aug<span class="hljs-number"> 30 </span>14:40 S20speech-dispatcher -&gt; ../init.d/speech-dispatcher
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 17 </span>Aug<span class="hljs-number"> 31 </span>14:12 S20sysstat -&gt; ../init.d/sysstat
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 15 </span>Aug<span class="hljs-number"> 30 </span>14:40 S50saned -&gt; ../init.d/saned
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 19 </span>Aug<span class="hljs-number"> 30 </span>14:40 S70dns-clean -&gt; ../init.d/dns-clean
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 18 </span>Aug<span class="hljs-number"> 30 </span>14:40 S70pppd-dns -&gt; ../init.d/pppd-dns
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 21 </span>Aug<span class="hljs-number"> 30 </span>14:40 S99grub-common -&gt; ../init.d/grub-common
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 18 </span>Aug<span class="hljs-number"> 30 </span>14:40 S99ondemand -&gt; ../init.d/ondemand
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 18 </span>Aug<span class="hljs-number"> 30 </span>14:40 S99rc.local -&gt; ../init.d/rc.local

</code></pre><p>如你所想，目录 <code>/etc/rc1.d</code> 因运行级别 1 的特殊而不同。它包含的符号链接指向非常不同的一套脚本。 同样也要注意到其中一些脚本以 <code>K</code> 开头命名，而另一些与其它运行级别脚本一样以 <code>S</code> 开头命名。这是因为当系统进入单用户模式时， 一些服务需要<strong>停止</strong>。 然而这些 K 开头的符号链接指向了其它级别 S 开头的符号链接的同一文件时， K（kill）表示这个脚本将以指示其停止的参数执行，而不是以启动的参数执行。</p>
<pre><code class="hljs tap">/etc/rc1.d$ ls -l
total 4
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 20 </span>Aug<span class="hljs-number"> 30 </span>14:40 K20kerneloops -&gt; ../init.d/kerneloops
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 15 </span>Aug<span class="hljs-number"> 30 </span>14:40 K20rsync -&gt; ../init.d/rsync
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 15 </span>Aug<span class="hljs-number"> 30 </span>14:40 K20saned -&gt; ../init.d/saned
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 23 </span>Aug<span class="hljs-number"> 30 </span>16:10 K20smartmontools -&gt; ../init.d/smartmontools
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 27 </span>Aug<span class="hljs-number"> 30 </span>14:40 K20speech-dispatcher -&gt; ../init.d/speech-dispatcher
-rw-r--r--<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 369 </span>Mar<span class="hljs-number"> 12 </span><span class="hljs-number"> 2014 </span>README
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 19 </span>Aug<span class="hljs-number"> 30 </span>14:40 S30killprocs -&gt; ../init.d/killprocs
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 19 </span>Aug<span class="hljs-number"> 30 </span>14:40 S70dns-clean -&gt; ../init.d/dns-clean
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 18 </span>Aug<span class="hljs-number"> 30 </span>14:40 S70pppd-dns -&gt; ../init.d/pppd-dns
lrwxrwxrwx<span class="hljs-number"> 1 </span>root root <span class="hljs-number"> 16 </span>Aug<span class="hljs-number"> 30 </span>14:40 S90single -&gt; ../init.d/single

</code></pre><p>你可以改变系统的默认运行级别，尽管这很少被用到。例如，通过修改前文中提到的 <code>/etc/inittab</code> 文件，你能够配置 Debian 系统的默认运行级别为 3 （而不是 2），以下是该文件示例：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">id</span><span class="hljs-selector-pseudo">:3</span><span class="hljs-selector-pseudo">:initdefault</span>:

</code></pre><p>一旦你修改完成并重启系统， <code>runlevel</code> 命令将显示如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> runlevel</span>
N 3

</code></pre><p>另外一种可选方式，使用 <code>init 3</code> 命令，你也能改变系统运行级别（且无需重启立即生效）， <code>runlevel</code> 命令的输出为：</p>
<pre><code class="hljs lsl">$ runlevel
<span class="hljs-number">2</span> <span class="hljs-number">3</span>

</code></pre><p>当然，除非你修改了系统默认级别的 <code>/etc/rc?.d</code> 目录下的符号链接，使得系统默认运行在一个修改的运行级别之下，否则很少需要通过创建或修改 <code>/etc/inittab</code> 文件改变系统的运行级别。</p>
<h3><a href="#在-linux-系统中如何使用运行级别"></a>在 Linux 系统中如何使用运行级别？</h3>
<p>为了扼要重述在系统中如何使用运行级别，下面有几个关于运行级别的快速问答问题：</p>
<p><strong>如何查询系统当前的运行级别？</strong></p>
<p>使用 <code>runlevel</code> 命令。</p>
<p><strong>如何查看特定运行级别所关联的服务进程？</strong></p>
<p>查看与该运行级别关联的运行级别开始目录（例如， <code>/etc/rc2.d</code> 对应于运行级别 2）。</p>
<p><strong>如何查看系统的默认运行级别？</strong></p>
<p>首先，查看 <code>/etc/inittab</code> 文件是否存在。如果不存在，就执行 <code>runlevel</code> 命令查询，你一般就已经处在该运行级别。</p>
<p><strong>如何改变系统运行级别？</strong></p>
<p>用 <code>init</code> 命令（例如 <code>init 3</code>）临时改变运行级别，通过修改或创建 <code>/etc/inittab</code> 文件永久改变其运行级别。</p>
<p><strong>能改变特定运行级别下运行的服务么？</strong></p>
<p>当然，通过改变对应的 <code>/etc/rc?.d</code> 目录下的符号连接即可。</p>
<p><strong>还有一些其他的什么需要考虑？</strong></p>
<p>当改变系统运行级别时，你应该特别小心，确保不影响到系统上正在运行的服务或者正在使用的用户。</p>
<p>（题图：<a href="https://www.flickr.com/photos/endymion120/4824696883/in/photolist-8mkQi2-8vtyRx-8vvYZS-i31xQj-4TXTS2-S7VRNC-azimYK-dW8cYu-Sb5b7S-S7VRES-fpSVvo-61Zpn8-WxFwGi-UKKq3x-q6NSnC-8vsBLr-S3CPxn-qJUrLr-nDnpNu-8d7a6Q-T7mGpN-RE26wj-SeEXRa-5mZ7LG-Vp7t83-fEG5HS-Vp7sU7-6JpNBi-RCuR8P-qLzCL5-6WsfZx-5nU1tF-6ieGFi-3P5xwh-8mnxpo-hBXwSj-i3iCur-9dmrST-6bXk8d-8vtDb4-i2KLwU-5jhfU6-8vwbrN-ShAtNm-XgzXmb-8rad18-VfXm4L-8tQTrh-Vp7tcb-UceVDB">Vincent Desjardins</a> <a href="https://creativecommons.org/licenses/by/2.0/legalcode">(CC BY 2.0)</a>）</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3222070/linux/maneuvering-around-run-levels-on-linux.html">https://www.networkworld.com/article/3222070/linux/maneuvering-around-run-levels-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/penghuster">penghuster</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
漫谈传统的 Linux 初始化系统的运行级别

## 原文链接
[https://www.zcfy.cc/article/maneuvering-around-run-levels-on-linux](https://www.zcfy.cc/article/maneuvering-around-run-levels-on-linux)

