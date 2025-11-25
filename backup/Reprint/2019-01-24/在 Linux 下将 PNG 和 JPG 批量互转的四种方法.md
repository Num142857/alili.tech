---
title: '在 Linux 下将 PNG 和 JPG 批量互转的四种方法' 
date: 2019-01-24 2:30:11
hidden: true
slug: qymmps0msd
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-下将-png-和-jpg-批量互转的四种方法"></a>在 Linux 下将 PNG 和 JPG 批量互转的四种方法</h1>
<p>计算机术语中，批处理指的是用一个非交互式的程序来<a href="http://www.tecmint.com/using-shell-script-to-automate-linux-system-maintenance-tasks/">执行一序列的任务</a>的方法。这篇教程里，我们会使用 Linux 命令行工具，并提供 4 种简单的处理方式来把一些 <code>.PNG</code> 格式的图像批量转换成 <code>.JPG</code> 格式的，以及转换回来。</p>
<p>虽然所有示例中我们使用的都是 <code>convert</code> 命令行工具，但是您也可以使用 <code>mogrify</code> 命令来达到同样的效果。</p>
<p>convert 命令的语法如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> convert 输入选项 输入文件 输出选项 输出文件</span>


</code></pre><p>而 mogrify 的为：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mogrify 选项 输入文件</span>


</code></pre><p>注意：在使用 <code>mogrify</code> 命令时，默认情况下源图像文件会被转换后的新文件覆盖掉，您可以使用明确的操作选项来禁止覆盖，具体的选项可以在手册页中查询得到。</p>
<p>下面是把所有 <code>.PNG</code> 格式图像批量转换为 <code>.JPG</code> 格式的各种实现方式。如果想把 <code>.JPG</code> 转换为 <code>.PNG</code> 格式，也可使用这些命令，按需修改。</p>
<h3><a href="#1-使用-ls-和-xargs-命令来转换-png-和-jpg"></a>1、 使用 <code>ls</code> 和 <code>xargs</code> 命令来转换 PNG 和 JPG</h3>
<p><a href="">ls 命令</a> 可以列出所有的 png 图像文件， <code>xargs</code> 使得可以从标准输入构建和执行 <code>convert</code> 命令，从而将所有 <code>.png</code> 图像转换为 <code>.jpg</code> 图像。</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">-----------</span> 从 PNG 转换到 JPG <span class="hljs-params">-----------</span> 
$ <span class="hljs-keyword">ls</span> -1 *<span class="hljs-string">.png</span> | xargs -n 1 bash -c 'convert <span class="hljs-string">"$0"</span> <span class="hljs-string">"${0%.png}.jpg"</span>'

<span class="hljs-params">-----------</span> 从 JPG 转换到 PNG <span class="hljs-params">-----------</span> 
$ <span class="hljs-keyword">ls</span> -1 *<span class="hljs-string">.jpg</span> | xargs -n 1 bash -c 'convert <span class="hljs-string">"$0"</span> <span class="hljs-string">"${0%.jpg}.png"</span>'


</code></pre><p>关于上面命令选项的说明：</p>
<ol>
<li><code>-1</code> – 告诉 ls 每行列出一个图像名称的选项标识</li>
<li><code>-n</code> – 指定最多参数个数，例子中为 1</li>
<li><code>-c</code> – 指示 bash 运行给定的命令</li>
<li><code>${0%.png}.jpg</code> – 设置新转换的图像文件的名字，<code>%</code> 符号用来删除源文件的扩展名</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Convert-PNG-to-JPG-in-Linux.png"><img src="https://p2.ssl.qhimg.com/t0104408af44f6d42e3.png" alt="Convert PNG to JPG Format in Linux"></a></p>
<p><em>Linux 中 PNG 格式转为 JPG 格式</em></p>
<p>我使用  <code>ls -ltr</code> 命令按<a href="http://www.tecmint.com/sort-ls-output-by-last-modified-date-and-time/">修改的日期和时间列出所有文件</a>。</p>
<p>类似的，也可以使用上面的命令要把 <code>.jpg</code> 图像转换为 <code>.png</code> 格式，只需稍微调整就行。</p>
<h3><a href="#2-使用-gnu-的-parallel-命令来转换-png-和-jpg"></a>2、 使用 GNU 的 <code>parallel</code> 命令来转换 PNG 和 JPG</h3>
<p>GNU 的 parallel 使用户能够从标准输入并行构建和执行 shell 命令。确保您的系统上安装了 GNU Parallel，否则请使用以下适当的命令进行安装：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt-get install parallel     [在 Debian/Ubuntu 系统中]</span>
<span class="hljs-meta">$</span><span class="bash"> sudo yum install parallel         [在 RHEL/CentOS 和 Fedora 系统中]</span>


</code></pre><p>安装好 <code>parallel</code> 工具后，您就可以运行下面的命令来把所有从标准输入的 <code>.png</code> 图像转换成 <code>.jpg</code> 格式的图像。</p>
<pre><code class="hljs nimrod">----------- 从 <span class="hljs-type">PNG</span> 转换到 <span class="hljs-type">JPG</span> ----------- 
$ parallel convert '{}' '<span class="hljs-meta">{.}.jpg' ::: *.png

----------- 从 JPG 转换到 PNG -----------
$ parallel convert '{}' '{.}</span>.png' ::: *.jpg


</code></pre><p>其中：</p>
<ol>
<li><code>{}</code> – 输入行替代符，代替了从输入源读取的完整行。</li>
<li><code>{.}</code> – 去除扩展名的输入行。</li>
<li><code>:::</code> – 指定输入源的符号，即上面示例的命令行，在这里 <em>png 或 jpg</em> 是命令参数。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Convert-PNG-to-JPG-Using-Parallel-Command.png"><img src="https://p3.ssl.qhimg.com/t0164c2101a72ccabd5.png" alt="Parallel Command - Converts All PNG Images to JPG Format"></a></p>
<p><em>Parallel 命令 – 把所有 PNG 图像转换为 JPG 格式</em></p>
<p>或者，您也可以结合 <a href="http://www.tecmint.com/tag/linux-ls-command/">ls</a> 和 <code>parallel</code> 命令来批量转换所有图像，如图所示：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-params">-----------</span> 从 PNG 转换到 JPG <span class="hljs-params">-----------</span> 
$ <span class="hljs-keyword">ls</span> -1 *<span class="hljs-string">.png</span> | parallel convert '{}' '{.}<span class="hljs-string">.jpg</span>'

<span class="hljs-params">-----------</span> 从 JPG 转换到 PNG <span class="hljs-params">-----------</span>
$ <span class="hljs-keyword">ls</span> -1 *<span class="hljs-string">.jpg</span> | parallel convert '{}' '{.}<span class="hljs-string">.png</span>'


</code></pre><h3><a href="#3-使用-for-循环命令来转换-png-和-jpg"></a>3、 使用 <code>for</code> 循环命令来转换 PNG 和 JPG</h3>
<p>为了避免编写 shell 脚本的繁琐，你可以从命令行执行 <code>for</code> 循环语句，如下所示：</p>
<pre><code class="hljs maxima">----------- 从 PNG 转换到 JPG ----------- 
$ bash -c '<span class="hljs-keyword">for</span> <span class="hljs-built_in">image</span> <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span> <span class="hljs-built_in">convert</span> <span class="hljs-string">"$image"</span> <span class="hljs-string">"${image%.png}.jpg"</span>; echo “<span class="hljs-built_in">image</span> $<span class="hljs-built_in">image</span> converted to ${image%.png}.jpg ”; done'

----------- 从 JPG 转换到 PNG -----------
$ bash -c '<span class="hljs-keyword">for</span> <span class="hljs-built_in">image</span> <span class="hljs-keyword">in</span> *.jpg; <span class="hljs-keyword">do</span> <span class="hljs-built_in">convert</span> <span class="hljs-string">"$image"</span> <span class="hljs-string">"${image%.jpg}.png"</span>; echo “<span class="hljs-built_in">image</span> $<span class="hljs-built_in">image</span> converted to ${image%.jpg}.png ”; done'


</code></pre><p>对上面的命令所使用的选项参数的描述：</p>
<ol>
<li><code>-c</code> 允许执行包括在单引号中的循环语句。</li>
<li><code>image</code> 变量是目录中的图像名的数量记数器。</li>
<li>对于每个转换操作，在 <code>$image</code> 转换为 <code>${image%.png}.jpg</code> 这行中，<a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a>通知用户 png 图像已经转换为 jpg 格式，反之亦然。</li>
<li><code>${image%.png}.jpg</code> 语句创建了转换后的图像名字，其中 <code>%</code> 表示去除源图像文件的扩展名。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Convert-PNG-to-JPG-Using-for-loop-Command.png"><img src="https://p1.ssl.qhimg.com/t0172200c977075c110.png" alt="for loop - Convert PNG to JPG Format"></a></p>
<p><em>for 循环语句 – 从 PNG 转换到 JPG 格式</em></p>
<h3><a href="#4-使用-shell-脚本来转换-png-和-jpg"></a>4、 使用 Shell 脚本来转换 PNG 和 JPG</h3>
<p>如果你不想像前面的例子那样让你的命令行变得邋遢的话，可以写一个小脚本，如下所示：</p>
<p>注意：适当地交换 <code>.png</code> 和 <code>.jpg</code> 扩展名，如下面的例子所示，从一种格式转换到另一种格式：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#convert</span>
<span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> *.png; <span class="hljs-keyword">do</span>
        convert  <span class="hljs-string">"<span class="hljs-variable">$image</span>"</span>  <span class="hljs-string">"<span class="hljs-variable">${image%.png}</span>.jpg"</span>
        <span class="hljs-built_in">echo</span> “image <span class="hljs-variable">$image</span> converted to <span class="hljs-variable">${image%.png}</span>.jpg ”
<span class="hljs-keyword">done</span>
<span class="hljs-built_in">exit</span> 0 


</code></pre><p>把上面的脚本保存为 <code>convert.sh</code> 文件，然后使此脚本文件可执行，接着从存有图像文件的目录下执行。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x convert.sh</span>
<span class="hljs-meta">$</span><span class="bash"> ./convert.sh</span>


</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/11/Batch-Image-Convert-Using-Shell-Script.png"><img src="https://p5.ssl.qhimg.com/t0174ee615377f0a81c.png" alt="Batch Image Convert Using Shell Script"></a></p>
<p><em>使用 Shell 脚本来批量图像转换</em></p>
<p>总之，我们介绍了一些重要的将 .png 图像批量转换为 .jpg 格式的方法，以及再转回来。如果还想对图像进行一些优化的话, 您可以移步到 <a href="http://www.tecmint.com/optimize-and-compress-jpeg-or-png-batch-images-linux-commandline/">Linux 系统中如何压缩 png 和 jpg 图像</a>这篇指导文章。</p>
<p>您可以给我们分享一些包括 Linux 命令行工具在内的把图像从一种格式转成另一种格式的方式方法，或者在下面的评论部分畅所欲言。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/linux-image-conversion-tools/">http://www.tecmint.com/linux-image-conversion-tools/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/runningwater">runningwater</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 下将 PNG 和 JPG 批量互转的四种方法

## 原文链接
[https://www.zcfy.cc/article/4-ways-to-batch-convert-your-png-to-jpg-and-vice-versa](https://www.zcfy.cc/article/4-ways-to-batch-convert-your-png-to-jpg-and-vice-versa)

