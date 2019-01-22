---
title: '在 Linux 中使用 pushd 和 popd 命令来进行高效的目录导航' 
date: 2019-01-23 2:30:08
hidden: true
slug: r059zivfw
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-中使用-pushd-和-popd-命令来进行高效的目录导航"></a>在 Linux 中使用 pushd 和 popd 命令来进行高效的目录导航</h1>
<p>有时候，通过命令来在 Linux 文件系统导航是一件非常痛苦的事情，特别是对于一些新手。通常情况下，我们主要使用 <a href="https://www.tecmint.com/cd-command-in-linux/">cd（改变目录）命令</a>在 Linux 文件系统之间移动。</p>
<p>在之前的文章中，我们回顾了一个非常简单但很有用的 Linux 上的 CLI 工具，文章叫做 <a href="https://linux.cn/article-8491-1.html">bd：快速返回某级父目录而不用冗余地输入 “cd ../../..”</a></p>
<p>在这个教程中，我们将讨论两个相关的命令：<code>pushd</code> 和 <code>popd</code> ，使用它们可以高效的浏览 Linux 目录结构。这两个命令在大多数 shell ，比如 bash、tcsh 中都存在。</p>
<p><strong>推荐阅读：</strong><a href="https://linux.cn/article-5983-1.html">Autojump：快速浏览 Linux 文件系统的一个高级 <code>cd</code> 命令</a></p>
<h3><a href="#pushd-和-popd-命令在-linux-系统中如何工作"></a>pushd 和 popd 命令在 Linux 系统中如何工作</h3>
<p><code>pushd</code> 和 <code>popd</code> 命令根据 ‘LIFO’（后进先出）原则工作。在这个原则之下，只有两个操作是允许的：把一个目录压入栈，以及把一个目录弹出栈。</p>
<p><code>pushd</code> 命令会增加一个目录到栈顶，而 <code>popd</code> 命令会从栈顶移除一个目录。</p>
<p>为了显示目录栈中（或历史）的目录，我们可以使用下面展示的 <code>dirs</code> 命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">dirs</span></span>
或
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">dirs</span> -v</span>

</code></pre><p><a href="https://camo.githubusercontent.com/fc10bde816fb498d9fef3934956fd6465bc970f4/68747470733a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30352f646972732d636f6d6d616e642e706e67"><img src="https://p0.ssl.qhimg.com/t01772736e726a1fcb2.png" alt="Dirs - Display Directories in Directory"></a></p>
<p><em><code>dirs</code> - 显示位于目录栈中的目录</em></p>
<p><code>pushd</code> 命令：将一个目录路径添加到／放入目录栈（历史）中，之后，你可以浏览位于目录栈（历史）中的任意目录。当把一个新的目录入栈时，会打印出当前位于栈中的所有目录。</p>
<p>下面这些命令会展示这个命令是如何工作的：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span>  /var/www/html/</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span> ~/Documents/</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span> ~/Desktop/</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span> /var/<span class="hljs-built_in">log</span>/</span>

</code></pre><p><a href="https://camo.githubusercontent.com/f228a1f4256b34aef8063bdcea6457c256333d4a/68747470733a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30352f70757368642d6578616d706c65732e706e67"><img src="https://p0.ssl.qhimg.com/t01dc99370f8c3d30dd.png" alt="pushd - Add Directories to Stack"></a></p>
<p><em><code>pushd</code> - 添加新目录入栈</em></p>
<p>根据上面输出的目录栈可知（目录索引按倒序排列）：</p>
<ul>
<li><code>/var/log</code> 是目录栈中的第五个目录，索引为 0</li>
<li><code>~/Desktop/</code> 是第四个，索引为 1</li>
<li><code>~/Document/</code> 是第三个，索引为 2</li>
<li><code>/var/www/html</code> 是第二个，索引为 3</li>
<li><code>~</code> 是第一个，索引为 4</li>
</ul>
<p>另外，我们也可以使用目录索引的形式 <code>pushd +#</code> 或 <code>pushd -#</code> 来添加目录入栈。为了进入目录 <code>~/Documents</code> ，我们可以输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span> +2</span>

</code></pre><p><a href="https://camo.githubusercontent.com/d205599a9dcc27e6829120d5b3881bd28b4183e6/68747470733a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30352f70757368642d4469726563746f72792d4e617669676174696f6e2d776974682d4e756d6265722e706e67"><img src="https://p0.ssl.qhimg.com/t010b4716db9d676881.png" alt="pushd - Directory Navigation with Number"></a></p>
<p><em><code>pushd</code> －通过数字浏览目录</em></p>
<p>注意，经过上一步操作以后，栈的内容便发生了改变。所以，要从上面的例子中进入目录 <code>/var/www/html</code> ，我们应该使用下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pushd</span> +1</span>

</code></pre><p><a href="https://camo.githubusercontent.com/7b1afe65d258c78c208e3baed5c86c9d100cd709/68747470733a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30352f70757368642d4e617669676174652d4469726563746f72792d776974682d4e756d6265722e706e67"><img src="https://p0.ssl.qhimg.com/t0136a8383a572060a5.png" alt="pushd - Navigate Directory with Number"></a></p>
<p><em><code>pushd</code> －通过数字浏览目录</em></p>
<p><code>popd</code> 命令－从栈顶或历史中移除一个目录。为了列出目录栈中的所有目录，只需输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">popd</span></span>

</code></pre><p>为了从目录栈中移除一个目录，我们可以使用 <code>popd +#</code> 或 <code>popd -#</code> 命令，在这时，我们需要输入下面的命令来移除目录 <code>~/Documents</code> ：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">popd</span> +1</span>

</code></pre><p><a href="https://camo.githubusercontent.com/5d9fecebf85b02553228bbbd96c53bd2f941cf24/68747470733a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30352f706f70642d65786d706c65732e706e67"><img src="https://p0.ssl.qhimg.com/t012d31d4f3561645a9.png" alt="popd - Remove Directory from Stack"></a></p>
<p><em><code>popd</code>－从栈中以移除目录</em></p>
<p>也可以阅读：<a href="https://linux.cn/article-5983-1.html">Fasd－一个提供快速访问文件和目录功能的命令行工具</a></p>
<p>在这篇文章中，我们阐述了 <code>pushd</code> 和 <code>popd</code> 命令，使用它们可以高效的访问目录结构。你可以通过下面的反馈表和我们分享你关于这篇文章的想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux 系统管理员和网络开发人员，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="https://www.tecmint.com/pushd-and-popd-linux-filesystem-navigation/">https://www.tecmint.com/pushd-and-popd-linux-filesystem-navigation/</a></p>
<p>作者：<a href="https://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 中使用 pushd 和 popd 命令来进行高效的目录导航

## 原文链接
[https://www.zcfy.cc/article/use-pushd-and-popd-for-efficient-filesystem-navigation-in-linux](https://www.zcfy.cc/article/use-pushd-and-popd-for-efficient-filesystem-navigation-in-linux)

