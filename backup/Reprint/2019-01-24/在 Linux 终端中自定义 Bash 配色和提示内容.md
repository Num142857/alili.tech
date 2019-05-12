---
title: '在 Linux 终端中自定义 Bash 配色和提示内容' 
date: 2019-01-24 2:30:11
hidden: true
slug: 3iueqsohn2p
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-终端中自定义-bash-配色和提示内容"></a>在 Linux 终端中自定义 Bash 配色和提示内容</h1>
<p>现今，大多数（如果不是全部的话）现代 Linux 发行版的默认 shell 都是 Bash。然而，你可能已经注意到这样一个现象，在各个发行版中，其终端配色和提示内容都各不相同。</p>
<p>如果你一直都在考虑，或者只是一时好奇，如何定制可以使 Bash 更好用。不管怎样，请继续读下去 —— 本文将告诉你怎么做。</p>
<h3><a href="#ps1-bash-环境变量"></a>PS1 Bash 环境变量</h3>
<p>命令提示符和终端外观是通过一个叫 <code>PS1</code> 的变量来进行管理的。根据 <strong>Bash</strong> 手册页说明，<strong>PS1</strong> 代表了 shell 准备好读取命令时显示的主体的提示字符串。</p>
<p><strong>PS1</strong> 所允许的内容包括一些反斜杠转义的特殊字符，可以查看手册页中 <strong>PRMPTING</strong> 部分的内容来了解它们的含义。</p>
<p>为了演示，让我们先来显示下我们系统中 <code>PS1</code> 的当前内容吧（这或许看上去和你们的有那么点不同）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$PS1</span></span>
[\u@\h \W]\$

</code></pre><p>现在，让我们来了解一下怎样自定义 PS1 吧，以满足我们各自的需求。</p>
<h4><a href="#自定义-ps1-格式"></a>自定义 PS1 格式</h4>
<p>根据手册页 PROMPTING 章节的描述，下面对各个特殊字符的含义作如下说明：</p>
<ul>
<li><code>\u:</code> 显示当前用户的 <strong>用户名</strong>。</li>
<li><code>\h:</code> 完全限定域名 Fully-Qualified Domain Name（FQDN）中第一个点（.）之前的<strong>主机名</strong>。</li>
<li><code>\W:</code> 当前工作目录的<strong>基本名</strong>，如果是位于 <code>$HOME</code> （家目录）通常使用波浪符号简化表示（<code>~</code>）。</li>
<li><code>\$:</code> 如果当前用户是 root，显示为 <code>#</code>，否则为 <code>$</code>。</li>
</ul>
<p>例如，如果我们想要显示当前命令的历史数量，可以考虑添加 <code>\!</code>；如果我们想要显示 FQDN 全称而不是短服务器名，那么可以考虑添加 <code>\H</code>。</p>
<p>在下面的例子中，我们同时将这两个特殊字符引入我们当前的环境中，命令如下：</p>
<pre><code class="hljs taggerscript">PS1="[<span class="hljs-symbol">\u</span>@<span class="hljs-symbol">\H</span> <span class="hljs-symbol">\W</span> <span class="hljs-symbol">\!</span>]<span class="hljs-symbol">\$</span>"

</code></pre><p>当按下回车键后，你将会看到提示内容会变成下面这样。可以对比执行命令修改前和修改后的提示内容：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Customize-Linux-Terminal-Prompt.png"><img src="https://p1.ssl.qhimg.com/t0119424b4413241965.png" alt="Customize Linux Terminal Prompt PS1"></a></p>
<p><em>自定义 Linux 终端提示符 PS1</em></p>
<p>现在，让我们再深入一点，修改命令提示符中的用户名和主机名 —— 同时修改文本和环境背景。</p>
<p>实际上，我们可以对提示符进行 3 个方面的自定义：</p>
<p>文本格式</p>
<p>前景色（文本）</p>
<p>背景色</p>
<p>0: 常规文本</p>
<p>30: 黑色</p>
<p>40: 黑色</p>
<p>1: 加粗</p>
<p>31: 红色</p>
<p>41: 红色</p>
<p>4: 下划线文本</p>
<p>32: 绿色</p>
<p>42: 绿色</p>
<p>33: 黄色</p>
<p>43: 黄色</p>
<p>34: 蓝色</p>
<p>44: 蓝色</p>
<p>35: 紫色</p>
<p>45: 紫色</p>
<p>36: 青色</p>
<p>46: 青色</p>
<p>37: 白色</p>
<p>47: 白色</p>
<p>我们将在开头使用 <code>\e</code> 特殊字符，跟着颜色序列，在结尾使用 <code>m</code> 来表示结束。</p>
<p>在该序列中，三个值（<strong>背景</strong>，<strong>格式</strong>和<strong>前景</strong>）由分号分隔（如果不赋值，则假定为默认值）。</p>
<p><strong>建议阅读：</strong> <a href="http://www.tecmint.com/category/bash-shell/">在 Linux 中学习 Bash shell 脚本</a>。</p>
<p>此外，由于值的范围不同，指定背景，格式，或者前景的先后顺序没有关系。</p>
<p>例如，下面的 <code>PS1</code> 将导致提示符为黄色带下划线文本，并且背景为红色：</p>
<pre><code class="hljs taggerscript">PS1="<span class="hljs-symbol">\e</span>[41;4;33m[<span class="hljs-symbol">\u</span>@<span class="hljs-symbol">\h</span> <span class="hljs-symbol">\W</span>]$ "

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Change-Linux-Terminal-Color-Prompt.png"><img src="https://p2.ssl.qhimg.com/t014363375b6ac8ae9d.png" alt="Change Linux Terminal Color Prompt PS1"></a></p>
<p><em>修改 Linux 终端提示符配色 PS1</em></p>
<p>虽然它看起来那么漂亮，但是这个自定义将只会持续到当前用户会话结束。如果你关闭终端，或者退出本次会话，所有修改都会丢失。</p>
<p>为了让修改永久生效，你必须将下面这行添加到 <code>~/.bashrc</code>或者 <code>~/.bash_profile</code>，这取决于你的版本。</p>
<pre><code class="hljs taggerscript">PS1="<span class="hljs-symbol">\e</span>[41;4;33m[<span class="hljs-symbol">\u</span>@<span class="hljs-symbol">\h</span> <span class="hljs-symbol">\W</span>]$ "

</code></pre><p>尽情去玩耍吧，你可以尝试任何色彩，直到找出最适合你的。</p>
<h5><a href="#小结"></a>小结</h5>
<p>在本文中，我们讲述了如何来自定义 Bash 提示符的配色和提示内容。如果你对本文还有什么问题或者建议，请在下面评论框中写下来吧。我们期待你们的声音。</p>
<hr>
<p>作者简介：Aaron Kili 是一位 Linux 及 F.O.S.S 的狂热爱好者，一位未来的 Linux 系统管理员，web 开发者，而当前是 TechMint 的原创作者，他热爱计算机工作，并且信奉知识分享。</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<hr>
<p>via: <a href="http://www.tecmint.com/customize-bash-colors-terminal-prompt-linux/">http://www.tecmint.com/customize-bash-colors-terminal-prompt-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/GOLinux">GOLinux</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 终端中自定义 Bash 配色和提示内容

## 原文链接
[https://www.zcfy.cc/article/how-to-customize-bash-colors-and-content-in-linux-terminal-prompt-copy](https://www.zcfy.cc/article/how-to-customize-bash-colors-and-content-in-linux-terminal-prompt-copy)

