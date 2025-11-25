---
title: '如何将 Linux 命令的输出赋值给变量' 
date: 2019-01-24 2:30:11
hidden: true
slug: 08duefggygt2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何将-linux-命令的输出赋值给变量"></a>如何将 Linux 命令的输出赋值给变量</h1>
<p>运行一条命令时，它都会产生某种输出：要么是该命令的期望结果，或者是该命令执行细节的状态/错误消息。有些时候，你可能想要将某个命令的输出内容存储在一个变量中，以待在后续操作中取出来使用。</p>
<p>本文将介绍将 shell 命令赋值给变量的不同方法，这对于 shell 脚本编程是特别有用的。</p>
<p>可以使用如下形式的 shell 命令置换特性，将命令的输出存储到变量中：</p>
<pre><code class="hljs clean">变量名=$(命令)
变量名=$(命令 [命令选项 ...] 参数<span class="hljs-number">1</span> 参数<span class="hljs-number">2</span> ...)
或者：
变量名=<span class="hljs-string">'命令'</span>
变量名=<span class="hljs-string">'命令 [命令选项 ...] 参数1 参数2 ...'</span>

</code></pre><p>以下是使用命令置换特性的示例：</p>
<p>本例，我们将 <code>who</code> (显示当前登录系统的用户) 的输出值存储到 <code>CURRENT_USERS</code> 变量中：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>CURRENT_USERS=<span class="hljs-variable">$(</span>who)

</code></pre><p>然后，我们可以使用 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a> 显示一个句子并使用上述变量，如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> -e <span class="hljs-string">"以下为登录到系统中的用户：\n\n <span class="hljs-variable">$CURRENT_USERS</span>"</span></span>

</code></pre><p>上面的命令中：<code>-e</code> 标记表示解释所有的转义序列 (如 <code>\n</code> 为换行)。为节约时间和内存，通常在 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a> 中直接使用命令置换特性，如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> -e <span class="hljs-string">"以下为登录到系统中的用户：\n\n <span class="hljs-variable">$(who)</span>"</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Shows-Current-Logged-Users-in-Linux.png"><img src="https://p3.ssl.qhimg.com/t01c545b488a416c1df.png" alt="显示当前登录系统的用户"></a></p>
<p><em>在 Linux 中显示当前登录系统的用户</em></p>
<p>接下来，为了演示上面提到的第二种形式，我们以把当前工作目录下文件数存储到变量 <code>FILES</code> ，然后使用 <strong>echo</strong> 来输出，如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> FILES=`sudo find . -<span class="hljs-built_in">type</span> f -<span class="hljs-built_in">print</span> | wc -l`</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"当前目录有 <span class="hljs-variable">$FILES</span> 个文件。"</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Show-Number-of-Files-in-Directory.png"><img src="https://p1.ssl.qhimg.com/t016494d872296d3e1d.png" alt="显示目中包含文件的数量"></a></p>
<p><em>显示目中包含文件的数量</em></p>
<p>就是这些了。我们展示了将 shell 命令的输出赋值给变量的方法。你可以在下边的评论反馈区留下你的想法。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是一名 Linux 和 F.O.S.S 忠实拥护者、未来的 Linux 系统管理员、Web 开发者，目前是 TecMint 的原创作者，热衷于计算机并乐于知识分享。 译者简介：</p>
<p><a href="https://camo.githubusercontent.com/ffb0f5b44d2d2e17b1d28718fd6fced89dcce38d/687474703a2f2f47484c616e64792e636f6d2f696d616765732f47484c616e64792e69636f"><img src="https://camo.githubusercontent.com/ffb0f5b44d2d2e17b1d28718fd6fced89dcce38d/687474703a2f2f47484c616e64792e636f6d2f696d616765732f47484c616e64792e69636f" alt="GHLandy"></a></p>
<p><a href="http://GHLandy.com">GHLandy</a> —— 欲得之，则为之奋斗 (If you want it, work for it.)。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/assign-linux-command-output-to-variable/">http://www.tecmint.com/assign-linux-command-output-to-variable/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/GHLandy">GHLandy</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何将 Linux 命令的输出赋值给变量

## 原文链接
[https://www.zcfy.cc/article/how-to-assign-output-of-a-linux-command-to-a-variable](https://www.zcfy.cc/article/how-to-assign-output-of-a-linux-command-to-a-variable)

