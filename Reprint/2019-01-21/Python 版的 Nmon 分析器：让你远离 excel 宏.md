---
title: 'Python 版的 Nmon 分析器：让你远离 excel 宏' 
date: 2019-01-21 2:30:06
hidden: true
slug: 6jdrdy0l53n
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#python-版的-nmon-分析器让你远离-excel-宏"></a>Python 版的 Nmon 分析器：让你远离 excel 宏</h1>
<p><a href="http://nmon.sourceforge.net/">Nigel's monitor</a>，也叫做 “Nmon”，是一个很好的监控、记录和分析 Linux/*nix 系统性能随时间变化的工具。Nmon 最初由 IBM 开发并于 2009 年夏天开源。时至今日 Nmon 已经在所有 Linux 平台和架构上都可用了。它提供了很棒的当前系统统计信息的基于命令行的实时可视化报告，这些统计信息包括 CPU、RAM、网络和磁盘 I/O。然而，Nmon 最棒的特性是可以随着时间的推移记录系统性能快照。</p>
<p>比如：<code>nmon -f -s 1</code>。</p>
<p><a href="https://camo.githubusercontent.com/258cde7588e7b17791f5f3a56e30cbbd1248dacc/68747470733a2f2f6d617474686961736c65652e636f6d2f2f636f6e74656e742f696d616765732f323031352f30362f6e6d6f6e5f6370756469736b2e706e67"><img src="https://p0.ssl.qhimg.com/t01a72328ca7ccf6e1b.png" alt="nmon CPU and Disk utilization"></a></p>
<p>会创建一个日志文件，该日志文件最开头是一些系统的元数据（AAA - BBBV 部分），后面是所监控的系统属性的定时快照，比如 CPU 和内存的使用情况。这个输出的文件很难直接由电子表格应用来处理，因此诞生了 <a href="http://www.ibm.com/developerworks/wikis/display/WikiPtype/nmonanalyser">Nmon_Analyzer</a> excel 宏。如果你用的是 Windows/Mac 并安装了 Microsoft Office，那么这个工具非常不错。如果没有这个环境那也可以使用 Nmon2rrd 工具，这个工具能将日志文件转换 RRD 输入文件，进而生成图形。这个过程很死板而且有点麻烦。现在出现了一个更灵活的工具，我向你们介绍一下 pyNmonAnalyzer，它提供了一个可定制化的解决方案来生成结构化的 CSV 文件和带有用 <a href="http://matplotlib.org/">matplotlib</a> 生成的图片的简单 HTML 报告。</p>
<h3><a href="#入门介绍"></a>入门介绍</h3>
<p>系统需求：</p>
<p>从名字中就能看出我们需要有 python。此外 pyNmonAnalyzer 还依赖于 matplotlib 和 numpy。若你使用的是 debian 衍生的系统，则你需要先安装这些包：</p>
<pre><code class="hljs vim">$ sudo apt-<span class="hljs-built_in">get</span> install <span class="hljs-keyword">python</span>-numpy <span class="hljs-keyword">python</span>-matplotlib

</code></pre><h4><a href="#获取-pynmonanalyzer"></a>获取 pyNmonAnalyzer：</h4>
<p>你可以克隆 git 仓库：</p>
<pre><code class="hljs stylus">$ git clone git@github<span class="hljs-selector-class">.com</span>:madmaze/pyNmonAnalyzer<span class="hljs-selector-class">.git</span>

</code></pre><p>或者，直接从这里下载：<a href="https://github.com/madmaze/pyNmonAnalyzer/blob/master/release/pyNmonAnalyzer-0.1.zip?raw=true">pyNmonAnalyzer-0.1.zip</a> 。</p>
<p>接下来我们需要一个 Nmon 文件，如果没有的话，可以使用发行版中提供的实例或者自己录制一个样本：<code>nmon -F test.nmon -s 1 -c 120</code>，会录制 120 个快照，每秒一个，存储到 test.nmon 文件中。</p>
<p>让我们来看看基本的帮助信息：</p>
<pre><code class="hljs routeros">$ ./pyNmonAnalyzer.py -h
usage: pyNmonAnalyzer.py [-h] [-x] [-d] [-o OUTDIR] [-c] [-b] [-r CONFFNAME]
 input_file

nmonParser converts Nmon monitor files into time-sorted
CSV/Spreadsheets <span class="hljs-keyword">for</span> easier analysis, without the use of the
MS Excel Macro. Also included is an option <span class="hljs-keyword">to</span> build an HTML
report with graphs, which is configured through report.config.

positional arguments:
 input_file Input NMON file

optional arguments:
 -h, --help show this help message <span class="hljs-keyword">and</span> exit
 -x, --overwrite overwrite existing results (Default: <span class="hljs-literal">False</span>)
 -d, --<span class="hljs-builtin-name">debug</span> debug? (Default: <span class="hljs-literal">False</span>)
 -o OUTDIR, --output OUTDIR
 Output dir <span class="hljs-keyword">for</span> CSV (Default: ./data/)
 -c, --csv CSV output? (Default: <span class="hljs-literal">False</span>)
 -b, --buildReport report output? (Default: <span class="hljs-literal">False</span>)
 -r CONFFNAME, --reportConfig CONFFNAME
 Report<span class="hljs-built_in"> config </span>file, <span class="hljs-keyword">if</span> none exists: we will write the
<span class="hljs-built_in"> default config </span>file out (Default: ./report.config)

</code></pre><p>该工具有两个主要的选项</p>
<ol>
<li>将 nmon 文件传唤成一系列独立的 CSV 文件</li>
<li>使用 matplotlib 生成带图形的 HTML 报告</li>
</ol>
<p>下面命令既会生成 CSV 文件，也会生成 HTML 报告：</p>
<pre><code class="hljs stylus">$ ./pyNmonAnalyzer<span class="hljs-selector-class">.py</span> -c -<span class="hljs-selector-tag">b</span> test<span class="hljs-selector-class">.nmon</span>

</code></pre><p>这会创建一个 <code>./data</code> 目录，其中有一个存放 CSV 文件的目录 (<code>./data/csv/</code>)，一个存放 PNG 图片的目录 (<code>./data/img/</code>) 以及一个 HTML 报告 (<code>./data/report.html</code>)。</p>
<p>默认情况下，HTML 报告中会用图片展示 CPU、磁盘繁忙程度、内存使用情况和网络传输情况。所有这些都定义在一个不言自明的配置文件中 (<code>report.config</code>)。目前这个工具还不是特别的灵活，因为 CPU 和 MEM 除了 <code>on</code> 和 <code>off</code> 外，无法做其他的配置。不过下一步将会改进作图的方法并允许用户灵活地指定针对哪些数据使用哪种作图方法。</p>
<h3><a href="#报告的例子"></a>报告的例子</h3>
<p><a href="https://camo.githubusercontent.com/5121ba3a8edc593e173b0e1d51fd8c1bfc0d8ef2/68747470733a2f2f6d617474686961736c65652e636f6d2f2f636f6e74656e742f696d616765732f323031372f30342f7465617365722d73686f72745f302e706e67"><img src="https://p0.ssl.qhimg.com/t01a322daa6bf891cd7.png" alt="pyNmonAnalyzer Graph output" title="pyNmonAnalyzer Graph output"></a></p>
<p><a href="http://matthiaslee.com/pub/pyNmonAnalyzer/data/report.html">点击查看完整报告</a></p>
<p>目前这些报告还十分的枯燥而且只能打印出基本的几种标记图表，不过它的功能还在不断的完善中。目前在开发的是一个向导来让配置调整变得更容易。如果有任何建议，找到任何 bug 或者有任何功能需求，欢迎与我交流。</p>
<hr>
<p>via: <a href="https://matthiaslee.com/python-nmon-analyzer-moving-away-from-excel-macros/">https://matthiaslee.com/python-nmon-analyzer-moving-away-from-excel-macros/</a></p>
<p>作者：<a href="https://matthiaslee.com/">Matthias Lee</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Python 版的 Nmon 分析器：让你远离 excel 宏

## 原文链接
[https://www.zcfy.cc/article/python-nmon-analyzer-moving-away-from-excel-macros](https://www.zcfy.cc/article/python-nmon-analyzer-moving-away-from-excel-macros)

