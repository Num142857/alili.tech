---
title: 'Root 是谁？为什么会有 Root 账户？' 
date: 2019-01-23 2:30:08
hidden: true
slug: fazi67p98s
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#root-是谁为什么会有-root-账户"></a>Root 是谁？为什么会有 Root 账户？</h1>
<p>在 Linux 中为什么会有一个名为 root 的特定账户？该怎么使用 root 账户？它在哪些场景下必须使用，哪些场景下不能使用？对于以上几个问题，如果您感兴趣的话，那么请继续阅读。</p>
<p>本文中，我们提供了一些关于 root 账户的参考资料，方便您了解。</p>
<h3><a href="#root-是什么"></a>root 是什么？</h3>
<p>首先，记住这一点，在 Unix 类操作系统中，目录的层级结构被设计为树状结构。起始目录是一个特殊目录，使用斜杠 <code>/</code> 表示，而其他目录都是由起始目录分支而来。由于这种结构很像现实中的树，所以 <code>/</code> 也被称为根（root）目录。</p>
<p>下图，我们可以看到以下命令的输出：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tree -d / | less</span>

</code></pre><p>该命令主要是演示一下 <code>/</code> 根目录和树<code>根</code>的类比。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Linux-root-Directory-Tree.png"><img src="https://p2.ssl.qhimg.com/t01d37ccd80137bba81.png" alt="Linux 的目录层级"></a></p>
<p><em>Linux 的目录层级</em></p>
<p>虽然 root 账户命名的原因还不是很清楚，可能是因为 root 账户是唯一一个在根目录 <code>/</code> 中有写权限的账号吧。</p>
<p>此外，由于 root 账户可以访问 Unix 类操作系统中的所有文件和命令，因此，它也常被称为超级用户。</p>
<p>另外，根目录 <code>/</code> 和 <code>/root</code> 目录不能混淆了，<code>/root</code> 目录是 <code>root</code> 账户的家目录。实际上，<code>/root</code> 目录是根目录 <code>/</code> 的子目录。</p>
<h3><a href="#获取-root-权限"></a>获取 root 权限</h3>
<p>当我们说到 root（或者超级用户）权限的时候，我们指的是这样一种账户的权限：其在系统上的权限包含（但不限于）修改系统并授权其他用户对系统资源的访问权限。</p>
<p>胡乱使用 root 账户，轻则系统崩溃重则系统完全故障。这就是为什么会说，以下准则是使用 root 账户的正确姿势：</p>
<p>首先，使用 root 账户运行 <code>visudo</code> 命令编辑 <code>/etc/sudoers</code> 文件，给指定账户（如：<code>supervisor</code>）授予最低的超级用户权限。</p>
<p>最低超级用户权限可以包含，例如：<a href="http://www.tecmint.com/add-users-in-linux/">添加用户 (<code>adduser</code>)</a>、<a href="http://www.tecmint.com/usermod-command-examples/">修改用户 (<code>usermod</code>)</a>等权限。</p>
<p>接着，使用 <code>supervisor</code> 账户登录并<a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">使用 <code>sudo</code> 执行用户管理任务</a>。此时，你可能会发现，当你执行需要超级用户权限（例如：删除软件包）的其它任务时，会失败。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Run-Commands-Without-sudo.png"><img src="https://p3.ssl.qhimg.com/t015ef329854454dd4f.png" alt="没有使用超级用户权限运行命令"></a></p>
<p><em>没有使用超级用户权限运行命令</em></p>
<p>在必须使用超级用户权限时，重复执行以上两个步骤，一旦执行完成，则立即使用 <code>exit</code> 命令退回到无特限的账户。</p>
<p>此时，你需要确定一下其他周期性的任务是否需要超级用户权限？如果需要，那么在 <code>/etc/sudoers</code> 中，给指定的账户或组授予必要的权限，尽量避免直接使用 <code>root</code> 账户操作。</p>
<h5><a href="#摘要"></a>摘要</h5>
<p>本文可以作为在 Unix 类操作系统中正确使用 root 账户的简单参考。收藏一下，你就可以随时翻阅！</p>
<p>还是一样，如果您对本文有什么疑问或建议，请使用以下的评论表单给我们评论留言，期待您的回音！</p>
<hr>
<p>作者简介：</p>
<p>Gabriel Cánepa 来自 Villa Mercedes, San Luis, Argentina。他是一名 GNU/Linux 系统管理员和 Web 开发员，现在一家全球领先的消费品公司就职。他很喜欢使用 FOSS 工具来提高自己的工作效率。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/who-is-root-why-does-root-exist-in-linux/">http://www.tecmint.com/who-is-root-why-does-root-exist-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/zhb127">zhb127</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Root 是谁？为什么会有 Root 账户？

## 原文链接
[https://www.zcfy.cc/article/who-is-root-why-does-root-exist](https://www.zcfy.cc/article/who-is-root-why-does-root-exist)

