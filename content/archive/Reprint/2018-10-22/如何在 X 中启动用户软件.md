---
title: 如何在 X 中启动用户软件
hidden: true
categories: [reprint]
slug: 3643cbd8
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#如何在-x-中启动用户软件"></a>如何在 X 中启动用户软件</h1>
<p>目前有很多方法可以在开启用户会话时启动软件。</p>
<p>这是一篇试图将所有方法聚集在一起的文章。某些部分可能不精确或不正确，但这是一个开始，如果我收到更正，我很乐意保持更新。</p>
<h3><a href="#x11-common"></a>x11-common</h3>
<pre><code class="hljs ebnf"><span class="hljs-attribute">man xsession</span>

</code></pre><ul>
<li>由显示管理器启动，如 <code>/usr/share/lightdm/lightdm.conf.d/01_debian.conf</code> 或 <code>/etc/gdm3/Xsession</code>。</li>
<li>Debian 特定。</li>
<li>在 <code>/etc/X11/Xsession.d/</code> 中运行脚本。</li>
<li><code>/etc/X11/Xsession.d/40x11-common_xsessionrc</code> 引用 <code>~/.xsessionrc</code> ，它能比设置环境变量能做的多一点，因为它在 X 会话启动时运行。</li>
<li>最后，它启动会话管理器（<code>gnome-session</code>、<code>xfce4-session</code> 等等）。</li>
</ul>
<h3><a href="#systemd---user"></a>systemd --user</h3>
<ul>
<li><a href="https://wiki.archlinux.org/index.php/Systemd/User">https://wiki.archlinux.org/index.php/Systemd/User</a></li>
<li>由 <code>pam_systemd</code> 启动，所以在环境变量中可能没有设置 <code>DISPLAY</code> 变量。</li>
<li>管理单元：<ul>
<li><code>/usr/lib/systemd/user/</code> 由已安装的软件包提供的单元。</li>
<li><code>~/.local/share/systemd/user/</code> 由安装在家目录的软件包提供的单元。</li>
<li><code>/etc/systemd/user/</code> 由系统管理员提供的系统范围的用户的单元。</li>
<li><code>~/.config/systemd/user/</code> ，用户自己放置的单元。</li>
</ul>
</li>
<li>当设置 X 会话和 <code>DISPLAY</code> 变量时，启动 systemd 用户单元的技巧是从 <code>.desktop</code> 自启动文件调用 <code>systemctl start</code>。</li>
</ul>
<h3><a href="#dbus--激活"></a>dbus 激活</h3>
<ul>
<li><a href="https://dbus.freedesktop.org/doc/system-activation.txt">https://dbus.freedesktop.org/doc/system-activation.txt</a></li>
<li>进行 dbus 请求的用户进程可以触发启动服务器程序。</li>
<li>对于系统调试，有没有一种方法可以监控哪些服务正在启动 dbus ？</li>
</ul>
<h3><a href="#x-会话管理器"></a>X 会话管理器</h3>
<ul>
<li><a href="https://en.wikipedia.org/wiki/X_session_manager">https://en.wikipedia.org/wiki/X_session_manager</a></li>
<li>由 <code>x11-common</code> 的 <code>Xsession.d</code> 运行。</li>
<li>运行 freedesktop 自动启动的 <code>.desktop</code> 文件。</li>
<li>运行桌面环境特定的软件。</li>
</ul>
<h3><a href="#xdg-自动启动"></a>xdg 自动启动</h3>
<ul>
<li><a href="https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html">https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html</a></li>
<li>由会话管理器运行。</li>
<li>如果存在 <code>/etc/xdg/autostart/foo.desktop</code> 和 <code>~/.config/autostart/foo.desktop</code> ，那么只会使用 <code>~/.config/autostart/foo.desktop</code>，因为 <code>~/.config/autostart/</code> 比 <code>/etc/xdg/autostart/</code> 更重要。</li>
<li>是顺序的还是并行？</li>
</ul>
<h3><a href="#其他启动注意事项"></a>其他启动注意事项</h3>
<h4><a href="#xauthority"></a>~/.Xauthority</h4>
<p>要连接到 X 服务器，客户端需要从 <code>~/.Xauthority</code> 发送一个令牌，这证明他们可以读取用户的隐私数据。</p>
<p><code>~/.Xauthority</code> 包含显示管理器生成的一个令牌，并在启动时传递给 X。</p>
<p>要查看它的内容，请使用 <code>xauth -i -f ~/.Xauthority list</code>。</p>
<hr>
<p>via: <a href="http://www.enricozini.org/blog/2018/debian/starting-user-software/">http://www.enricozini.org/blog/2018/debian/starting-user-software/</a></p>
<p>作者：<a href="http://www.enricozini.org/">Enrico Zini</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/starting-user-software-in-x](https://www.zcfy.cc/article/starting-user-software-in-x)

## 原文标题
如何在 X 中启动用户软件
