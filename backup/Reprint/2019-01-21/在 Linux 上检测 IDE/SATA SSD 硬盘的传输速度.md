---
title: '在 Linux 上检测 IDE/SATA SSD 硬盘的传输速度' 
date: 2019-01-21 2:30:06
hidden: true
slug: 7c6vqqylux2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上检测-idesata-ssd-硬盘的传输速度"></a>在 Linux 上检测 IDE/SATA SSD 硬盘的传输速度</h1>
<p>你知道你的硬盘在 Linux 下传输有多快吗？不打开电脑的机箱或者机柜，你知道它运行在 SATA I (150 MB/s) 、 SATA II (300 MB/s) 还是 SATA III (6.0Gb/s) 呢？</p>
<p>你能够使用 <code>hdparm</code> 和 <code>dd</code> 命令来检测你的硬盘速度。它为各种硬盘的 ioctls 提供了命令行界面，这是由 Linux 系统的 ATA / IDE / SATA 设备驱动程序子系统所支持的。有些选项只能用最新的内核才能正常工作（请确保安装了最新的内核）。我也推荐使用最新的内核源代码的包含头文件来编译 <code>hdparm</code> 命令。</p>
<h3><a href="#如何使用-hdparm-命令来检测硬盘的传输速度"></a>如何使用 hdparm 命令来检测硬盘的传输速度</h3>
<p>以 root 管理员权限登录并执行命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo hdparm -tT /dev/sda</span>

</code></pre><p>或者，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo hdparm -tT /dev/hda</span>

</code></pre><p>输出：</p>
<pre><code class="hljs groovy"><span class="hljs-regexp">/dev/</span><span class="hljs-string">sda:</span>
 Timing cached <span class="hljs-string">reads:</span> <span class="hljs-number">7864</span> MB <span class="hljs-keyword">in</span> <span class="hljs-number">2.00</span> seconds = <span class="hljs-number">3935.41</span> MB/sec
 Timing buffered disk <span class="hljs-string">reads:</span> <span class="hljs-number">204</span> MB <span class="hljs-keyword">in</span> <span class="hljs-number">3.00</span> seconds = <span class="hljs-number">67.98</span> MB/sec

</code></pre><p>为了检测更精准，这个操作应该<strong>重复2-3次</strong> 。这显示了无需访问磁盘，直接从 Linux 缓冲区缓存中读取的速度。这个测量实际上是被测系统的处理器、高速缓存和存储器的吞吐量的指标。这是一个 <a href="https://www.cyberciti.biz/faq/bash-for-loop/">for 循环的例子</a>，连续运行测试 3 次：</p>
<pre><code class="hljs awk"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span>; <span class="hljs-keyword">do</span> hdparm -tT <span class="hljs-regexp">/dev/</span>hda; done

</code></pre><p>这里，</p>
<ul>
<li><code>-t</code> ：执行设备读取时序</li>
<li><code>-T</code> ：执行缓存读取时间</li>
<li><code>/dev/sda</code> ：硬盘设备文件</li>
</ul>
<p>要 <a href="https://www.cyberciti.biz/faq/linux-command-to-find-sata-harddisk-link-speed/">找出 SATA 硬盘的连接速度</a> ，请输入：</p>
<pre><code class="hljs gradle">sudo hdparm -I <span class="hljs-regexp">/dev/</span>sda | <span class="hljs-keyword">grep</span> -i speed

</code></pre><p>输出：</p>
<pre><code class="hljs less">     *    <span class="hljs-selector-tag">Gen1</span> <span class="hljs-selector-tag">signaling</span> <span class="hljs-selector-tag">speed</span> (<span class="hljs-number">1.5</span>Gb/s)
     *    <span class="hljs-selector-tag">Gen2</span> <span class="hljs-selector-tag">signaling</span> <span class="hljs-selector-tag">speed</span> (<span class="hljs-number">3.0</span>Gb/s)
     *    <span class="hljs-selector-tag">Gen3</span> <span class="hljs-selector-tag">signaling</span> <span class="hljs-selector-tag">speed</span> (<span class="hljs-number">6.0</span>Gb/s)


</code></pre><p>以上输出表明我的硬盘可以使用 1.5Gb/s、3.0Gb/s 或 6.0Gb/s 的速度。请注意，您的 BIOS/主板必须支持 SATA-II/III 才行：</p>
<pre><code class="hljs ruby">$ dmesg <span class="hljs-params">| grep -i sata |</span> grep <span class="hljs-string">'link up'</span>

</code></pre><p><a href="https://www.cyberciti.biz/tips/wp-content/uploads/2007/10/Linux-Check-IDE-SATA-SSD-Hard-Disk-Transfer-Speed.jpg"><img src="https://p0.ssl.qhimg.com/t01af52ac4cefeff262.jpg" alt="Linux Check IDE SATA SSD Hard Disk Transfer Speed"></a></p>
<h3><a href="#dd-命令"></a>dd 命令</h3>
<p>你使用 <code>dd</code> 命令也可以获取到相应的速度信息：</p>
<pre><code class="hljs routeros">dd <span class="hljs-attribute">if</span>=/dev/zero <span class="hljs-attribute">of</span>=/tmp/output.img <span class="hljs-attribute">bs</span>=8k <span class="hljs-attribute">count</span>=256k
rm /tmp/output.img

</code></pre><p>输出：</p>
<pre><code class="hljs basic"><span class="hljs-number">262144</span>+<span class="hljs-number">0</span> records in
<span class="hljs-number">262144</span>+<span class="hljs-number">0</span> records <span class="hljs-keyword">out</span>
<span class="hljs-symbol">2147483648 </span>bytes (<span class="hljs-number">2.1</span> GB) copied, <span class="hljs-number">23.6472</span> seconds, `<span class="hljs-number">90.8</span> MB/s`

</code></pre><p>下面是 <a href="https://www.cyberciti.biz/faq/howto-linux-unix-test-disk-performance-with-dd-command/">推荐的 dd 命令参数</a>：</p>
<pre><code class="hljs routeros">dd <span class="hljs-attribute">if</span>=/dev/input.file  <span class="hljs-attribute">of</span>=/path/to/output.file  <span class="hljs-attribute">bs</span>=block-size  <span class="hljs-attribute">count</span>=number-of-blocks  <span class="hljs-attribute">oflag</span>=dsync

<span class="hljs-comment">## GNU dd syntax ##</span>
dd <span class="hljs-attribute">if</span>=/dev/zero <span class="hljs-attribute">of</span>=/tmp/test1.img <span class="hljs-attribute">bs</span>=1G <span class="hljs-attribute">count</span>=1 <span class="hljs-attribute">oflag</span>=dsync

<span class="hljs-comment">## OR alternate syntax for GNU/dd ##</span>
dd <span class="hljs-attribute">if</span>=/dev/zero <span class="hljs-attribute">of</span>=/tmp/testALT.img <span class="hljs-attribute">bs</span>=1G <span class="hljs-attribute">count</span>=1 <span class="hljs-attribute">conv</span>=fdatasync

</code></pre><p>这是上面命令的第三个命令的输出结果：</p>
<pre><code class="hljs basic"><span class="hljs-number">1</span>+<span class="hljs-number">0</span> records in
<span class="hljs-number">1</span>+<span class="hljs-number">0</span> records <span class="hljs-keyword">out</span>
<span class="hljs-symbol">1073741824 </span>bytes (<span class="hljs-number">1.1</span> GB, <span class="hljs-number">1.0</span> GiB) copied, <span class="hljs-number">4.23889</span> s, <span class="hljs-number">253</span> MB/s

</code></pre><h3><a href="#磁盘与存储---gui-工具"></a>“磁盘与存储” - GUI 工具</h3>
<p>您还可以使用位于“系统&gt;管理&gt;磁盘实用程序”菜单中的磁盘实用程序。请注意，在最新版本的 Gnome 中，它简称为“磁盘”。</p>
<h4><a href="#如何使用-linux-上的磁盘测试我的硬盘的性能"></a>如何使用 Linux 上的“磁盘”测试我的硬盘的性能？</h4>
<p>要测试硬盘的速度：</p>
<ol>
<li>从“活动概览”中打开“磁盘”（按键盘上的 super 键并键入“disks”）</li>
<li>从“左侧窗格”的列表中选择“磁盘”</li>
<li>选择菜单按钮并从菜单中选择“测试磁盘性能……”</li>
<li>单击“开始性能测试……”并根据需要调整传输速率和访问时间参数。</li>
<li>选择“开始性能测试”来测试从磁盘读取数据的速度。需要管理权限请输入密码。</li>
</ol>
<p>以上操作的快速视频演示：</p>
<p><a href="https://www.cyberciti.biz/tips/wp-content/uploads/2007/10/disks-performance.mp4">https://www.cyberciti.biz/tips/wp-content/uploads/2007/10/disks-performance.mp4</a></p>
<h4><a href="#只读-benchmark-安全模式下"></a>只读 Benchmark (安全模式下)</h4>
<p>然后，选择 &gt; 只读:</p>
<p><a href="https://camo.githubusercontent.com/dee4aec5b8ebc136ff2ae61463ae6adb830e93dd/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030372f31302f4c696e75782d486172642d4469736b2d53706565642d42656e63686d61726b2e706e67"><img src="https://p0.ssl.qhimg.com/t012de2c8c484d9bf95.png" alt="Fig.01: Linux Benchmarking Hard Disk Read Only Test Speed" title="Linux Benchmark Hard Disk Speed"></a></p>
<p>上述选项不会销毁任何数据。</p>
<h4><a href="#读写的-benchmark所有数据将丢失所以要小心"></a>读写的 Benchmark（所有数据将丢失，所以要小心）</h4>
<p>访问“系统&gt;管理&gt;磁盘实用程序菜单&gt;单击性能测试&gt;单击开始读/写性能测试按钮：</p>
<p><a href="https://camo.githubusercontent.com/9b480eb6e01d751ab1486ed84abd785462d70e3f/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030372f31302f4c696e75782d486172642d4469736b2d526561642d57726974652d42656e63686d61726b2e706e67"><img src="https://p0.ssl.qhimg.com/t011747f7132f576f1d.png" alt="Fig.02:Linux Measuring read rate, write rate and access time" title="Linux Hard Disk Benchmark Read / Write Rate and Access Time"></a></p>
<h3><a href="#作者"></a>作者</h3>
<p>作者是 nixCraft 的创造者，是经验丰富的系统管理员，也是 Linux 操作系统/ Unix shell 脚本的培训师。他曾与全球客户以及 IT，教育，国防和空间研究以及非营利部门等多个行业合作。在Twitter，Facebook和Google+上关注他。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/how-fast-is-linux-sata-hard-disk.html">https://www.cyberciti.biz/tips/how-fast-is-linux-sata-hard-disk.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz/">Vivek Gite</a> 译者：<a href="https://github.com/MonkeyDEcho">MonkeyDEcho</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上检测 IDE/SATA SSD 硬盘的传输速度

## 原文链接
[https://www.zcfy.cc/article/linux-check-ide-sata-ssd-hard-disk-transfer-speed](https://www.zcfy.cc/article/linux-check-ide-sata-ssd-hard-disk-transfer-speed)

