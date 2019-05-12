---
title: '解决 Linux 和 Windows 双启动带来的时间同步问题' 
date: 2019-01-21 2:30:06
hidden: true
slug: rlr3v3ughtf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#解决-linux-和-windows-双启动带来的时间同步问题"></a>解决 Linux 和 Windows 双启动带来的时间同步问题</h1>
<p>想在保留 Windows 系统的前提下尝试其他 Linux 发行版，双启动是个常用的做法。这种方法如此风行是因为实现双启动是一件很容易的事情。然而这也带来了一个大问题，那就是 <strong>时间</strong>。</p>
<p>是的，你没有看错。若你只是用一个操作系统，时间同步不会有什么问题。但若有 Windows 和 Linux 两个系统，则可能出现时间同步上的问题。Linux 使用的是格林威治时间而 Windows 使用的是本地时间。当你从 Linux 切换到 Windows 或者从 Windows 切换到 Linux 时，就可能显示错误的时间了。</p>
<p>不过不要担心，这个问题很好解决。</p>
<p>点击 Windows 系统中的开始菜单，然后搜索 regedit。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/syncdualbootime1-e1512732558530.jpg"><img src="https://p0.ssl.qhimg.com/t014e53ed4fc240cdfc.jpg" alt="open regedit in windows 10"></a></p>
<p>点击打开，然后你会看到类型下面的内容。这就是注册表编辑器。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/syncdualbootime2.jpg"><img src="https://p0.ssl.qhimg.com/t0174d79ab5ebceb316.jpg" alt="windows 10 registry editor"></a></p>
<p>在左边的导航菜单，导航到 <code>HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation</code>。</p>
<p>在右边窗口，右键点击空白位置，然后选择 <code>New &gt;&gt; DWORD(32 bit) Value</code>。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/syncdualbootime3.jpg"><img src="https://p0.ssl.qhimg.com/t013d07d1308373623d.jpg" alt="change time format utc from windows registry"></a></p>
<p>之后，你会新生成一个条目，而且这个条目默认是高亮的。将这个条目重命名为 <code>RealTimeIsUniversal</code> 并设置值为 <code>1</code>。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/12/syncdualbootime4.jpg"><img src="https://p0.ssl.qhimg.com/t0186b7ba1ac50f4010.jpg" alt="set universal time utc in windows"></a></p>
<p>所有的配置就完成了，下次重启，就不会再有时间同步问题了。</p>
<hr>
<p>via: <a href="http://www.theitstuff.com/how-to-sync-time-between-linux-and-windows-dual-boot-2">http://www.theitstuff.com/how-to-sync-time-between-linux-and-windows-dual-boot-2</a></p>
<p>作者：<a href="http://www.theitstuff.com">Rishabh Kandari</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决 Linux 和 Windows 双启动带来的时间同步问题

## 原文链接
[https://www.zcfy.cc/article/how-to-sync-time-between-linux-and-windows-dual-boot](https://www.zcfy.cc/article/how-to-sync-time-between-linux-and-windows-dual-boot)

