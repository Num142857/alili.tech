---
title: '去掉了 chrome-gnome-shell 的 Gnome' 
date: 2019-01-20 2:30:11
hidden: true
slug: slsyhak7pi
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#去掉了-chrome-gnome-shell-的-gnome"></a>去掉了 chrome-gnome-shell 的 Gnome</h1>
<p>新的笔记本有触摸屏，它可以折叠成平板电脑，我听说 gnome-shell 将是桌面环境的一个很好的选择，我设法调整它以按照现有的习惯使用。</p>
<p>然而，我发现一个很大的问题，它怎么会鼓励人们从互联网上下载随机扩展，并将它们作为整个桌面环境的一部分运行呢？ 一个更大的问题是，<a href="https://packages.debian.org/gnome-core">gnome-core</a> 对 [chrome-gnome-shell] <a href="https://packages.debian.org/chrome-gnome-shell">2</a> 有强制依赖，这个插件如果不用 root 用户编辑 <code>/etc</code> 下的文件则无法禁用，这会给将我的桌面环境暴露给网站。</p>
<p>访问<a href="https://extensions.gnome.org/">这个网站</a>，它会知道你已经安装了哪些扩展，并且能够安装更多。我不信任它，我不需要那样，我不想那样。我为此感到震惊。</p>
<p><a href="https://salsa.debian.org/enrico/contain-gnome-shell">我想出了一个临时解决方法</a>。（LCTT 译注：作者做了一个空的依赖包来满足依赖，而不会做任何可能危害你的隐私和安全的操作。）</p>
<p>人们会在 firefox 中如何做呢？</p>
<h3><a href="#描述"></a>描述</h3>
<p>chrome-gnome-shell 是 gnome-core 的一个强制依赖项，它安装了一个你可能不需要的浏览器插件，并强制它使用系统级的 chrome 策略。</p>
<p>我认为使用 chrome-gnome-shell 会不必要地增加系统的攻击面，我作为主要用户，它会获取下载和执行随机未经审查代码的可疑特权。</p>
<p>（我做的）这个包满足了 chrome-gnome-shell 的依赖，但不会安装任何东西。</p>
<p>请注意，在安装此包之后，如果先前安装了 chrome-gnome-shell，则需要清除 chrome-gnome-shell，以使其在 <code>/etc/chromium</code> 中删除 chromium 策略文件。</p>
<h3><a href="#说明"></a>说明</h3>
<pre><code class="hljs dockerfile">apt install equivs
equivs-build contain-gnome-<span class="hljs-keyword">shell</span><span class="bash">
sudo dpkg -i contain-gnome-shell_1.0_all.deb
</span>sudo dpkg --purge chrome-gnome-<span class="hljs-keyword">shell</span><span class="bash">

</span></code></pre><hr>
<p>via: <a href="http://www.enricozini.org/blog/2018/debian/gnome-without-chrome-gnome-shell/">http://www.enricozini.org/blog/2018/debian/gnome-without-chrome-gnome-shell/</a></p>
<p>作者：<a href="http://www.enricozini.org/">Enrico Zini</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
去掉了 chrome-gnome-shell 的 Gnome

## 原文链接
[https://www.zcfy.cc/article/gnome-without-chrome-gnome-shell](https://www.zcfy.cc/article/gnome-without-chrome-gnome-shell)

