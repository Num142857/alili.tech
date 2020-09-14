---
title: 'Xfce 桌面新增‘免打扰’模式以及单一应用通知设置的新特性' 
date: 2019-02-15 2:30:44
hidden: true
slug: u1ws2s4f4m
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#xfce-桌面新增免打扰模式以及单一应用通知设置的新特性"></a>Xfce 桌面新增‘免打扰’模式以及单一应用通知设置的新特性</h1>
<p>Xfce　的开发者们正忙于把 Xfce 的应用和部件<a href="https://wiki.xfce.org/releng/4.14/roadmap">转移</a>到 GTK3 上，在这个过程中，他们也增加了一些新的特性。</p>
<p><strong>“免打扰”</strong>，一个常被要求增加的特性，<a href="http://simon.shimmerproject.org/2016/11/09/xfce4-notifyd-0-3-4-released-do-not-disturb-and-per-application-settings/">最近</a>已登陆到了 xfce-notifyd 0.3.4 (Xfce 通知进程)上。</p>
<p>更近一步地，**最新的 xfce-notifyd 包括了一个可以在单一应用基础上开启或关闭通知的选项。</p>
<p>当一个应用发出一个通知以后，这个应用就被加入到到了通知设置的列表里。从通知列表里，你可以控制哪些应用能够显示通知。</p>
<p>”免打扰“模式和应用特定的通知设置均可在“设置” &gt; “通知” 中找到：</p>
<p><a href="https://camo.githubusercontent.com/2961885d360ef77d98ab0d40aa38b61c35a30336/68747470733a2f2f312e62702e626c6f6773706f742e636f6d2f2d66765365737031756b61512f574352384a5156676669492f4141414141414141596c382f494a314373685651697a7339614732436c66726156614e6a4b50334f7978764167434c63422f733430302f786663652d646f2d6e6f742d646973747572622e706e67"><img src="https://p2.ssl.qhimg.com/t01c60f8b0ca4ad7523.png" alt=""></a></p>
<p>现在为止，还没有方法可以访问由于启用”免打扰“模式而错过的消息。然而，可以预期将来会发布<strong>通知记录/维持的特性。</strong></p>
<p>最后， xfce-notifyd 0.3.4 的<strong>另一个特性</strong>是<strong>选择在主监视器显示通知</strong>（直到现在，通知都是显示在当前监视器）。这个特性目前在图形设置界面里是没有的，必须使用 <code>Xfconf</code>（设置编辑）在 xfce-notifyd 下增添一个叫做 <code>/primary-monitor</code>（没有引号）的布尔属性，并设置为 <code>True</code> 来启用该特性:</p>
<p><a href="https://camo.githubusercontent.com/c02c6d411ac81b59b47fb31c6a91beeb2074f948/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d4d38785a7045484d7271382f5743523945756676736e492f4141414141414141596d412f6e4c49354a5155746d45304a395467764e4d395a4b474842647777426852483351434c63422f733430302f786663652d7866636f6e662e706e67"><img src="https://p1.ssl.qhimg.com/t012e948ac61912d747.png" alt=""></a></p>
<p><strong>xfce4-notifyd 0.3.4 目前在 PPA 上还没有，但是不久它可能被增添到 <a href="https://launchpad.net/%7Exubuntu-dev/+archive/ubuntu/xfce4-gtk3">Xfce GTK3 PPA</a>中。</strong></p>
<p><strong>如果你想直接从源代码编译，从<a href="http://archive.xfce.org/src/apps/xfce4-notifyd/0.3/">这儿</a>下载。</strong></p>
<hr>
<p>via: <a href="http://www.webupd8.org/2016/11/xfce-gets-do-not-disturb-mode-and-per.html">http://www.webupd8.org/2016/11/xfce-gets-do-not-disturb-mode-and-per.html</a></p>
<p>作者：<a href="http://www.webupd8.org/p/about.html">Andrew</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Xfce 桌面新增‘免打扰’模式以及单一应用通知设置的新特性

## 原文链接
[https://www.zcfy.cc/article/xfce-gets-a-do-not-disturb-mode-and-per-application-notification-settings](https://www.zcfy.cc/article/xfce-gets-a-do-not-disturb-mode-and-per-application-notification-settings)

