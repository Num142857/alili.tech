---
title: 'TLP 帮助我们的 Linux 机器节能省电' 
date: 2019-01-20 2:30:11
hidden: true
slug: 0jsptvufyk3
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#tlp-帮助我们的-linux-机器节能省电"></a>TLP 帮助我们的 Linux 机器节能省电</h1>
<p>我发现 Linux 下电池的寿命普遍要比 Windows 下要短。尽管如此，这可是 Linux，我们总会有有办法的。</p>
<p>现在来讲一下这个名叫 TLP 的小工具，它能帮你的设备省点电。</p>
<p><strong>TLP - Linux 高级电源管理</strong> 是一个小巧的命令行工具，它通过对 Linux 系统执行一些调整来真正帮助延长电池的寿命。</p>
<pre><code class="hljs cmake">sudo apt <span class="hljs-keyword">install</span> tlp

</code></pre><p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/install-tlp-in-linux.jpeg"><img src="http://p0.qhimg.com/t01ae4b3f273ef04947.jpg" alt="install tlp in linux"></a></p>
<p>对于其他的发行版，你可以阅读其<a href="http://linrunner.de/en/tlp/docs/tlp-linux-advanced-power-management.html">官方网站</a>上的指南。</p>
<p>安装完成之后，你只有在第一次的时候需要运行下面命令来启动 tlp。TLP 会在下次启动系统时自动运行。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/edited/start-tlp-on-linux.jpeg"><img src="http://p0.qhimg.com/t0140eb8a63bc18abb3.jpg" alt="start tlp on linux"></a></p>
<p>​现在 TLP 已经被启动起来了，而且已经设置好了节省电池所需要的默认配置。我们可以查看该配置文件。文件路径为 <code>/etc/default/tlp</code>。我们需要编辑该文件来修改各项配置。</p>
<p>配置文件中有很多选项，要启用某个选项的话之胥敖删除行首的 <code>#</code> 就行了。每个选项能够赋予什么值都有说明。下面是你可能会用到的选项：</p>
<ul>
<li>自动休眠 USB 设备</li>
<li>设定启动时启用/禁用无线设备</li>
<li>降低硬盘转速</li>
<li>关闭无线设备</li>
<li>设置 CPU 以性能优先还是节能优先</li>
</ul>
<h3><a href="#结论"></a>结论</h3>
<p>​TLP 是一个超棒的工具，可以延长 Linux 系统的电池使用寿命。我个人的经验是使用 TLP 能延长至少 30-40% 的电池使用寿命。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/save-some-battery-on-our-linux-machines-with-tlp">http://www.linuxandubuntu.com/home/save-some-battery-on-our-linux-machines-with-tlp</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LinuxAndUbuntu</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TLP 帮助我们的 Linux 机器节能省电

## 原文链接
[https://www.zcfy.cc/article/save-some-battery-on-our-linux-machines-with-tlp](https://www.zcfy.cc/article/save-some-battery-on-our-linux-machines-with-tlp)

