---
title: 'Linux 下如何修改用户名（同时修改用户组名和家目录）' 
date: 2019-01-21 2:30:06
hidden: true
slug: 5uh7scbq9g
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-下如何修改用户名同时修改用户组名和家目录"></a>Linux 下如何修改用户名（同时修改用户组名和家目录）</h1>
<p>有时候，由于某些原因，我们可能会需要重命名用户名。我们可以很容易地修改用户名以及对应的家目录和 UID。</p>
<p>本教程将会讨论这些东西。让我们先从修改用户名开始。</p>
<h3><a href="#修改用户名"></a>修改用户名</h3>
<p>我们使用 <code>usermod</code> 来修改用户名。其语法为，</p>
<pre><code class="hljs haxe">$ usermod -l <span class="hljs-keyword">new</span><span class="hljs-type">_username</span> old_username

</code></pre><p>举个例子，假设我们有一个名叫 <code>dan</code> 的用户想要重命名为 <code>susan</code>，那么在终端下执行下面命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo usermod -l susan dan</span>

</code></pre><p>这只会更改用户名，而其他的东西，比如用户组，家目录，UID 等都保持不变。</p>
<p><strong>注意：-</strong> 你需要从要改名的帐号中登出并杀掉该用户的所有进程，要杀掉该用户的所有进程可以执行下面命令，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo pkill -u dan</span>
<span class="hljs-meta">$</span><span class="bash"> sudo pkill -9 -u dan</span>

</code></pre><h3><a href="#修改家目录"></a>修改家目录</h3>
<p>要同时更改家目录，我们需要在执行 <code>usermod</code> 命令的同时加上 <code>-d</code> 选项，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo usermod -d /home/susan -m susan</span>

</code></pre><h3><a href="#更改用户-uid"></a>更改用户 UID</h3>
<p>执行下面命令修改用户 UID，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo usermod -u 2000 susan</span>

</code></pre><p>这里 <code>2000</code> 就是用户的新 UID。</p>
<h3><a href="#修改用户组名"></a>修改用户组名</h3>
<p>要把用户组名从 <code>dan</code> 修改为 <code>susan</code>，我们需要使用 <code>groupmod</code> 命令。使用下面命令来修改用户组名，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> groupmod -n susan dan</span>

</code></pre><p>做完修改后，可以使用 <code>id</code> 命令来检查，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> id susan</span>

</code></pre><p>这篇教导如何修改用户名的指南就此结束了。有任何疑问或建议，欢迎给我们留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/rename-user-in-linux-rename-home-directory/">http://linuxtechlab.com/rename-user-in-linux-rename-home-directory/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 下如何修改用户名（同时修改用户组名和家目录）

## 原文链接
[https://www.zcfy.cc/article/how-to-rename-user-in-linux-also-rename-group-home-directory](https://www.zcfy.cc/article/how-to-rename-user-in-linux-also-rename-group-home-directory)

