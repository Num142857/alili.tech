---
title: '如何在 Shell 脚本中执行语法检查调试模式' 
date: 2019-01-24 2:30:11
hidden: true
slug: cto47zpaoit
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-shell-脚本中执行语法检查调试模式"></a>如何在 Shell 脚本中执行语法检查调试模式</h1>
<p>我们开启了 Shell 脚本调试系列文章，先是解释了不同的调试选项，下面介绍<a href="https://linux.cn/article-8028-1.html">如何启用 Shell 调试模式</a>。</p>
<p>写完脚本后，建议在运行脚本之前先检查脚本中的语法，而不是查看它们的输出以确认它们是否正常工作。</p>
<p>在本系列的这一部分，我们将了解如何使用语法检查调试模式。记住我们之前在本系列的<a href="https://linux.cn/article-8028-1.html">第一部分</a>中解释了不同的调试选项，在这里，我们将使用它们来执行脚本调试。</p>
<h3><a href="#启用-verbose-调试模式"></a>启用 verbose 调试模式</h3>
<p>在进入本指导的重点之前，让我们简要地探索下 <strong>verbose 模式</strong>。它可以用 <code>-v</code> 调试选项来启用，它会告诉 shell 在读取时显示每行。</p>
<p>要展示这个如何工作，下面是一个示例脚本来<a href="https://linux.cn/article-8014-1.html">批量将 PNG 图片转换成 JPG 格式</a>。</p>
<p>将下面内容输入（或者复制粘贴）到一个文件中。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#convert</span>
<span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span>
convert  <span class="hljs-string">"<span class="hljs-variable">$image</span>"</span>  <span class="hljs-string">"<span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"image <span class="hljs-variable">$image</span> converted to <span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-keyword">done</span>
<span class="hljs-built_in">exit</span> 0

</code></pre><p>接着保存文件，并用下面的命令使脚本可执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x script.sh</span>

</code></pre><p>我们可以执行脚本并显示它被 Shell 读取到的每一行：</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">bash </span>-v <span class="hljs-keyword">script.sh
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Show-Shell-Script-Lines.png"><img src="https://p4.ssl.qhimg.com/t01bba7569b18ad2c4c.png" alt="Display All Lines in Shell Script"></a></p>
<p><em>显示shell脚本中的所有行</em></p>
<h3><a href="#在-shell-脚本中启用语法检查调试模式"></a>在 Shell 脚本中启用语法检查调试模式</h3>
<p>回到我们主题的重点，<code>-n</code> 激活语法检查模式。它会让 shell 读取所有的命令，但是不会执行它们，它（shell）只会检查语法。</p>
<p>一旦 shell 脚本中发现有错误，shell 会在终端中输出错误，不然就不会显示任何东西。</p>
<p>激活语法检查的命令如下：</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">bash </span>-n <span class="hljs-keyword">script.sh
</span>
</code></pre><p>因为脚本中的语法是正确的，上面的命令不会显示任何东西。所以，让我们尝试删除结束 for 循环的 <code>done</code> 来看下是否会显示错误：</p>
<p>下面是修改过的含有 bug 的批量将 png 图片转换成 jpg 格式的脚本。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#script with a bug</span>
<span class="hljs-comment">#convert</span>
<span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span>
convert  <span class="hljs-string">"<span class="hljs-variable">$image</span>"</span>  <span class="hljs-string">"<span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"image <span class="hljs-variable">$image</span> converted to <span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-built_in">exit</span> 0

</code></pre><p>保存文件，接着运行该脚本并执行语法检查：</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">bash </span>-n <span class="hljs-keyword">script.sh
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Check-Syntax-in-Shell-Script.png"><img src="https://p4.ssl.qhimg.com/t01616553efcc6e5b40.png" alt="Check Syntax in Shell Script"></a></p>
<p><em>检查 shell 脚本语法</em></p>
<p>从上面的输出中，我们看到我们的脚本中有一个错误，for 循环缺少了一个结束的 <code>done</code> 关键字。shell 脚本从头到尾检查文件，一旦没有找到它（<code>done</code>），shell 会打印出一个语法错误：</p>
<pre><code class="hljs applescript"><span class="hljs-keyword">script</span>.sh: line <span class="hljs-number">11</span>: syntax <span class="hljs-keyword">error</span>: unexpected <span class="hljs-keyword">end</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">file</span>

</code></pre><p>我们可以同时结合 verbose 模式和语法检查模式：</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">bash </span>-vn <span class="hljs-keyword">script.sh
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Enable-Verbose-and-Syntax-Checking-in-Script.png"><img src="https://p0.ssl.qhimg.com/t01d184952f500f725a.png" alt="Enable Verbose and Syntax Checking in Script"></a></p>
<p><em>在脚本中同时启用 verbose 检查和语法检查</em></p>
<p>另外，我们可以通过修改脚本的首行来启用脚本检查，如下面的例子：</p>
<pre><code class="hljs awk"><span class="hljs-comment">#!/bin/bash -n</span>
<span class="hljs-comment">#altering the first line of a script to enable syntax checking</span>
<span class="hljs-comment">#convert</span>
<span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span>
convert  <span class="hljs-string">"$image"</span>  <span class="hljs-string">"${image%.png}.jpg"</span>
echo <span class="hljs-string">"image $image converted to ${image%.png}.jpg"</span>
<span class="hljs-keyword">exit</span> <span class="hljs-number">0</span>

</code></pre><p>如上所示，保存文件并在运行中检查语法：</p>
<pre><code class="hljs applescript">$ ./<span class="hljs-keyword">script</span>.sh
<span class="hljs-keyword">script</span>.sh: line <span class="hljs-number">12</span>: syntax <span class="hljs-keyword">error</span>: unexpected <span class="hljs-keyword">end</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">file</span>

</code></pre><p>此外，我们可以用内置的 set 命令来在脚本中启用调试模式。</p>
<p>下面的例子中，我们只检查脚本中的 for 循环语法。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#using set shell built-in command to enable debugging</span>
<span class="hljs-comment">#convert</span>
<span class="hljs-comment">#enable debugging</span>
<span class="hljs-built_in">set</span> -n
<span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span>
convert  <span class="hljs-string">"<span class="hljs-variable">$image</span>"</span>  <span class="hljs-string">"<span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"image <span class="hljs-variable">$image</span> converted to <span class="hljs-variable">${image%.png}</span>.jpg"</span>
<span class="hljs-comment">#disable debugging</span>
<span class="hljs-built_in">set</span> +n
<span class="hljs-built_in">exit</span> 0

</code></pre><p>再一次保存并执行脚本：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ./script.sh </span>

</code></pre><p>总的来说，我们应该保证在执行 Shell 脚本之前先检查脚本语法以捕捉错误。</p>
<p>请在下面的反馈栏中，给我们发送关于这篇指导的任何问题或反馈。在这个系列的第三部分中，我们会解释并使用 shell 追踪调试模式。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是一个 Linux 及 F.O.S.S 热衷者，即将是 Linux 系统管理员、web 开发者，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并热心分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/check-syntax-in-shell-script/">http://www.tecmint.com/check-syntax-in-shell-script/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Shell 脚本中执行语法检查调试模式

## 原文链接
[https://www.zcfy.cc/article/how-to-perform-syntax-checking-debugging-mode-in-shell-scripts](https://www.zcfy.cc/article/how-to-perform-syntax-checking-debugging-mode-in-shell-scripts)

