---
title: Sosreport：收集系统日志和诊断信息的工具
hidden: true
categories: [reprint]
slug: 7e362e1c
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#sosreport收集系统日志和诊断信息的工具"></a>Sosreport：收集系统日志和诊断信息的工具</h1>
<p>如果你是 RHEL 管理员，你可能肯定听说过 <strong>Sosreport</strong> ：一个可扩展、可移植的支持数据收集工具。它是一个从类 Unix 操作系统中收集系统配置详细信息和诊断信息的工具。当用户提出支持服务单时，他/她必须运行此工具并将由 Sosreport 工具生成的结果报告发送给 Red Hat 支持人员。然后，执行人员将根据报告进行初步分析，并尝试找出系统中的问题。不仅在 RHEL 系统上，你可以在任何类 Unix 操作系统上使用它来收集系统日志和其他调试信息。</p>
<h3><a href="#安装-sosreport"></a>安装 Sosreport</h3>
<p>Sosreport 在 Red Hat 官方系统仓库中，因此你可以使用 Yum 或 DNF 包管理器安装它，如下所示。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo yum install sos</span>

</code></pre><p>要么，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install sos</span>

</code></pre><p>在 Debian、Ubuntu 和 Linux Mint 上运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install sosreport</span>

</code></pre><h3><a href="#用法"></a>用法</h3>
<p>安装后，运行以下命令以收集系统配置详细信息和其他诊断信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo sosreport</span>

</code></pre><p>系统将要求你输入系统的一些详细信息，例如系统名称、案例 ID 等。相应地输入详细信息，然后按回车键生成报告。如果你不想更改任何内容并使用默认值，只需按回车键即可。</p>
<p>我的 CentOS 7 服务器的示例输出：</p>
<pre><code class="hljs livecodeserver">sosreport (<span class="hljs-built_in">version</span> <span class="hljs-number">3.5</span>)

This <span class="hljs-keyword">command</span> <span class="hljs-title">will</span> <span class="hljs-title">collect</span> <span class="hljs-title">diagnostic</span> <span class="hljs-title">and</span> <span class="hljs-title">configuration</span> <span class="hljs-title">information</span> <span class="hljs-title">from</span>
this CentOS Linux <span class="hljs-keyword">system</span> <span class="hljs-keyword">and</span> installed applications.

An archive containing <span class="hljs-keyword">the</span> collected information will be generated <span class="hljs-keyword">in</span>
/var/tmp/sos.DiJXi7 <span class="hljs-keyword">and</span> may be provided <span class="hljs-built_in">to</span> <span class="hljs-keyword">a</span> CentOS support
representative.

Any information provided <span class="hljs-built_in">to</span> CentOS will be treated <span class="hljs-keyword">in</span> accordance <span class="hljs-keyword">with</span>
<span class="hljs-keyword">the</span> published support policies <span class="hljs-keyword">at</span>:

<span class="hljs-keyword">https</span>://wiki.centos.org/

The generated archive may contain data considered sensitive <span class="hljs-keyword">and</span> its
content should be reviewed <span class="hljs-keyword">by</span> <span class="hljs-keyword">the</span> originating organization <span class="hljs-keyword">before</span> being
passed <span class="hljs-built_in">to</span> <span class="hljs-keyword">any</span> <span class="hljs-keyword">third</span> party.

No changes will be made <span class="hljs-built_in">to</span> <span class="hljs-keyword">system</span> configuration.

Press ENTER <span class="hljs-built_in">to</span> continue, <span class="hljs-keyword">or</span> CTRL-C <span class="hljs-built_in">to</span> quit.

Please enter your <span class="hljs-keyword">first</span> initial <span class="hljs-keyword">and</span> <span class="hljs-keyword">last</span> name [server.ostechnix.<span class="hljs-built_in">local</span>]:
Please enter <span class="hljs-keyword">the</span> <span class="hljs-keyword">case</span> id that you are generating this report <span class="hljs-keyword">for</span> []:

Setting up archive ...
Setting up plugins ...
Running plugins. Please <span class="hljs-built_in">wait</span> ...

Running <span class="hljs-number">73</span>/<span class="hljs-number">73</span>: yum...
Creating compressed archive...

Your sosreport has been generated <span class="hljs-keyword">and</span> saved <span class="hljs-keyword">in</span>:
/var/tmp/sosreport-server.ostechnix.<span class="hljs-built_in">local</span><span class="hljs-number">-20180628171844.</span>tar.xz

The checksum is: <span class="hljs-number">8</span>f08f99a1702184ec13a497eff5ce334

Please <span class="hljs-built_in">send</span> this <span class="hljs-built_in">file</span> <span class="hljs-built_in">to</span> your support representative.


</code></pre><p>如果你不希望系统提示你输入此类详细信息，请如下使用批处理模式。</p>
<pre><code class="hljs elm">$ sudo sosre<span class="hljs-keyword">port</span> <span class="hljs-comment">--batch</span>

</code></pre><p>正如你在上面的输出中所看到的，生成了一个归档报告并保存在 <code>/var/tmp/sos.DiJXi7</code> 中。在 RHEL 6/CentOS 6 中，报告将在 <code>/tmp</code> 中生成。你现在可以将此报告发送给你的支持人员，以便他可以进行初步分析并找出问题所在。</p>
<p>你可能会担心或想知道报告中的内容。如果是这样，你可以通过运行以下命令来查看它：</p>
<pre><code class="hljs stylus">$ sudo tar -tf /var/tmp/sosreport-server<span class="hljs-selector-class">.ostechnix</span><span class="hljs-selector-class">.local-20180628171844</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span>

</code></pre><p>要么，</p>
<pre><code class="hljs stylus">$ sudo vim /var/tmp/sosreport-server<span class="hljs-selector-class">.ostechnix</span><span class="hljs-selector-class">.local-20180628171844</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span>

</code></pre><p>请注意，上述命令不会解压存档，而只显示存档中的文件和文件夹列表。如果要查看存档中文件的实际内容，请首先使用以下命令解压存档：</p>
<pre><code class="hljs stylus">$ sudo tar -xf /var/tmp/sosreport-server<span class="hljs-selector-class">.ostechnix</span><span class="hljs-selector-class">.local-20180628171844</span><span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.xz</span>

</code></pre><p>存档的所有内容都将解压当前工作目录中 <code>ssosreport-server.ostechnix.local-20180628171844/</code> 目录中。进入目录并使用 <code>cat</code> 命令或任何其他文本浏览器查看文件内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> sosreport-server.ostechnix.local-20180628171844/</span>
<span class="hljs-meta">
$</span><span class="bash"> cat uptime</span>
17:19:02 up 1:03, 2 users, load average: 0.50, 0.17, 0.10

</code></pre><p>有关 Sosreport 的更多详细信息，请参阅手册页。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man sosreport</span>

</code></pre><p>就是这些了。希望这些有用。还有更多好东西。敬请关注！</p>
<p>干杯！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/sosreport-a-tool-to-collect-system-logs-and-diagnostic-information/">https://www.ostechnix.com/sosreport-a-tool-to-collect-system-logs-and-diagnostic-information/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/sosreport-a-tool-to-collect-system-logs-and-diagnostic-information](https://www.zcfy.cc/article/sosreport-a-tool-to-collect-system-logs-and-diagnostic-information)
原文标题: Sosreport：收集系统日志和诊断信息的工具
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
