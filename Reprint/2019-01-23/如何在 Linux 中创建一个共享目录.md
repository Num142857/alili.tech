---
title: '如何在 Linux 中创建一个共享目录' 
date: 2019-01-23 2:30:08
hidden: true
slug: 7wcou6kkyq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中创建一个共享目录"></a>如何在 Linux 中创建一个共享目录</h1>
<p>作为系统管理员，你可能有一个特定目录，你希望为 Linux 服务器上的每个用户授予读/写访问权限。在本指南中，我们将回顾如何在 Linux 中对特定目录（共享目录）上的所有用户启用写访问。</p>
<p>这要求设置适当的访问权限，而最有效、可靠的方法是为所有要共享或对特定目录的写访问权的用户分配一个公共组。</p>
<p>如果你系统中还没有存在这个目录和公众组，用下面的命令创建：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo mkdir -p /var/www/reports/</span>
<span class="hljs-meta">$</span><span class="bash"> sudo groupadd project </span>

</code></pre><p>接着将对目录 <code>/var/www/reports/</code> 有写权限的用户添加到 <code>project</code> 组中。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo usermod -a -G project tecmint </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Create-Common-Directory-Group.png"><img src="https://p5.ssl.qhimg.com/t018260a85214e7eafc.png" alt="Create Common Directory Group"></a></p>
<p><em>创建公共目录组</em></p>
<p>上面命令使用到的标志和参数是：</p>
<ol>
<li><code>-a</code> – 将用户添加到增补组中。</li>
<li><code>-G</code> – 指定组名。</li>
<li><code>project</code> – 组名。</li>
<li><code>tecmint</code> – 已有的用户名。</li>
</ol>
<p>在这之后，给目录配置适当的权限，<code>-R</code> 会让操作递归进入子目录中： </p>
<pre><code class="hljs gradle">$ sudo chgrp -R <span class="hljs-keyword">project</span> <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/reports/</span>
$ sudo chmod -R <span class="hljs-number">2775</span> <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/reports/</span>

</code></pre><p>解释下上面 <code>chmod</code> 命令中的 <code>2775</code>：</p>
<ol>
<li><code>2</code> - 打开 setGID 位，意味着新创建的子文件继承与目录相同的组，新创建的子目录继承父目录的 setGID 位。</li>
<li><code>7</code> - 为所有者提供 rwx 权限。</li>
<li><code>7</code> - 给组 rwx 权限。</li>
<li><code>5</code> - 为其他人提供 rx 权限。</li>
</ol>
<p>你可以使用下面的命令创建更多的系统用户并将它们添加到目录组中：</p>
<pre><code class="hljs perl">$ sudo useradd -<span class="hljs-keyword">m</span> -c <span class="hljs-string">"Aaron Kili"</span> -<span class="hljs-regexp">s/bin/bash -G project aaronkilik
$ sudo useradd -m -c "John Doo" -s/bin</span><span class="hljs-regexp">/bash -G project john
$ sudo useradd -m -c "Ravi Saive" -s/bin</span><span class="hljs-regexp">/bash -G project ravi

</span></code></pre><p>接着创建每个用户存储他们项目报告的子目录：</p>
<pre><code class="hljs awk">$ sudo mkdir -p <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/reports/</span>aaronkilik_reports
$ sudo mkdir -p <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/reports/</span>johndoo_reports
$ sudo mkdir -p <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/reports/</span>ravi_reports

</code></pre><p>现在你可以创建文件/文件，并分享给该组的其他用户了。</p>
<p>就是这样了！在本篇中，我们回顾了如何启用所有用户对特定目录的写权限。要了解更多关于 Linux 中的用户/组，阅读<a href="http://www.tecmint.com/manage-users-and-groups-in-linux/">如何管理用户/组和属性</a>。</p>
<p>记得在评论栏中留下你对这篇文章的想法。</p>
<hr>
<p>译者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin 和 web 开发人员，目前是 TecMint 的内容创建者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/create-a-shared-directory-in-linux/">http://www.tecmint.com/create-a-shared-directory-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中创建一个共享目录

## 原文链接
[https://www.zcfy.cc/article/how-to-create-a-shared-directory-for-all-users-in-linux](https://www.zcfy.cc/article/how-to-create-a-shared-directory-for-all-users-in-linux)

