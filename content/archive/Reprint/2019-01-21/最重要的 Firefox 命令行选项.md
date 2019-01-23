---
title: '最重要的 Firefox 命令行选项' 
date: 2019-01-21 2:30:06
hidden: true
slug: 5lu62ehvxk6
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#最重要的-firefox-命令行选项"></a>最重要的 Firefox 命令行选项</h1>
<p>Firefox web 浏览器支持很多命令行选项，可以定制它启动的方式。</p>
<p>你可能已经接触过一些了，比如 <code>-P "配置文件名"</code> 指定浏览器启动加载时的配置文件，<code>-private</code> 开启一个私有会话。</p>
<p>本指南会列出对 FIrefox 来说比较重要的那些命令行选项。它并不包含所有的可选项，因为很多选项只用于特定的目的，对一般用户来说没什么价值。</p>
<p>你可以在 Firefox 开发者网站上看到<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options">完整</a> 的命令行选项列表。需要注意的是，很多命令行选项对其它基于 Mozilla 的产品一样有效，甚至对某些第三方的程序也有效。</p>
<h3><a href="#重要的-firefox-命令行选项"></a>重要的 Firefox 命令行选项</h3>
<p><a href="https://camo.githubusercontent.com/34d5f585866ee21bfb4948b599c92265ad7c5060/68747470733a2f2f63646e2e676861636b732e6e65742f77702d636f6e74656e742f75706c6f6164732f323031372f31302f66697265666f782d636f6d6d616e642d6c696e652e706e67"><img src="https://p0.ssl.qhimg.com/t01eec9de6dc1d4ebcc.png" alt="firefox command line"></a></p>
<h4><a href="#配置文件相关选项"></a>配置文件相关选项</h4>
<ul>
<li><code>-CreateProfile 配置文件名</code> -- 创建新的用户配置信息，但并不立即使用它。</li>
<li><code>-CreateProfile "配置文件名 存放配置文件的目录"</code> -- 跟上面一样，只是指定了存放配置文件的目录。</li>
<li><code>-ProfileManager</code>，或 <code>-P</code> -- 打开内置的配置文件管理器。</li>
<li><code>-P "配置文件名"</code> -- 使用指定的配置文件启动 Firefox。若指定的配置文件不存在则会打开配置文件管理器。只有在没有其他 Firefox 实例运行时才有用。</li>
<li><code>-no-remote</code> -- 与 <code>-P</code> 连用来创建新的浏览器实例。它允许你在同一时间运行多个配置文件。</li>
</ul>
<h4><a href="#浏览器相关选项"></a>浏览器相关选项</h4>
<ul>
<li><code>-headless</code> -- 以无头模式（LCTT 译注：无显示界面）启动 Firefox。Linux 上需要 Firefox 55 才支持，Windows 和 Mac OS X 上需要 Firefox 56 才支持。</li>
<li><code>-new-tab URL</code> -- 在 Firefox 的新标签页中加载指定 URL。</li>
<li><code>-new-window URL</code> -- 在 Firefox 的新窗口中加载指定 URL。</li>
<li><code>-private</code> -- 以隐私浏览模式启动 Firefox。可以用来让 Firefox 始终运行在隐私浏览模式下。</li>
<li><code>-private-window</code> -- 打开一个隐私窗口。</li>
<li><code>-private-window URL</code> -- 在新的隐私窗口中打开 URL。若已经打开了一个隐私浏览窗口，则在那个窗口中打开 URL。</li>
<li><code>-search 单词</code> -- 使用 FIrefox 默认的搜索引擎进行搜索。</li>
<li><ul>
<li><code>url URL</code> -- 在新的标签页或窗口中加载 URL。可以省略这里的 <code>-url</code>，而且支持打开多个 URL，每个 URL 之间用空格分离。</li>
</ul>
</li>
</ul>
<h4><a href="#其他选项"></a>其他选项</h4>
<ul>
<li><code>-safe-mode</code> -- 在安全模式下启动 Firefox。在启动 Firefox 时一直按住 Shift 键也能进入安全模式。</li>
<li><code>-devtools</code> -- 启动 Firefox，同时加载并打开开发者工具。</li>
<li><code>-inspector URL</code> -- 使用 DOM Inspector 查看指定的 URL</li>
<li><code>-jsconsole</code> -- 启动 Firefox，同时打开浏览器终端。</li>
<li><code>-tray</code> -- 启动 Firefox，但保持最小化。</li>
</ul>
<hr>
<p>via: <a href="https://www.ghacks.net/2017/10/08/the-most-important-firefox-command-line-options/">https://www.ghacks.net/2017/10/08/the-most-important-firefox-command-line-options/</a></p>
<p>作者：<a href="https://www.ghacks.net/author/martin/">Martin Brinkmann</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最重要的 Firefox 命令行选项

## 原文链接
[https://www.zcfy.cc/article/the-most-important-firefox-command-line-options](https://www.zcfy.cc/article/the-most-important-firefox-command-line-options)

