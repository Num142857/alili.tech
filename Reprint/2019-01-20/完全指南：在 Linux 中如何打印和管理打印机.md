---
title: '完全指南：在 Linux 中如何打印和管理打印机' 
date: 2019-01-20 2:30:11
hidden: true
slug: z5iyklksser
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#完全指南在-linux-中如何打印和管理打印机"></a>完全指南：在 Linux 中如何打印和管理打印机</h1>
<h3><a href="#linux-中的打印"></a>Linux 中的打印</h3>
<p>虽然现在大量的沟通都是电子化和无纸化的，但是在我们的公司中还有大量的材料需要打印。银行结算单、公用事业帐单、财务和其它报告、以及收益结算单等一些东西还是需要打印的。本教程将介绍在 Linux 中如何使用 CUPS 去打印。</p>
<p>CUPS，是通用 Unix 打印系统Common UNIX Printing System的首字母缩写，它是 Linux 中的打印机和打印任务的管理者。早期计算机上的打印机一般是在特定的字符集和字体大小下打印文本文件行。现在的图形打印机可以打印各种字体和大小的文本和图形。尽管如此，现在你所使用的一些命令，在古老的行式打印守护进程（LPD）技术的历史中仍能找到它们。</p>
<p>本教程将帮你了解 Linux 服务器专业考试（LPIC-1）的第 108 号主题的 108.4 目标。这个目标的权重为 2。</p>
<h4><a href="#前提条件"></a>前提条件</h4>
<p>为了更好地学习本系列教程，你需要具备基本的 Linux 知识，和使用 Linux 系统实践本教程中的命令的能力，你应该熟悉 GNU 和 UNIX® 命令的使用。有时不同版本的程序输出可能会不同，因此，你的结果可能与本教程中的示例有所不同。</p>
<p>本教程中的示例使用的是 Fedora 27 的系统。</p>
<h3><a href="#有关打印的一些历史"></a>有关打印的一些历史</h3>
<p>这一小部分历史并不是 LPI 目标的，但它有助于你理解这个目标的相关环境。</p>
<p>早期的计算机大都使用行式打印机。这些都是击打式打印机，那时，它们使用固定间距的字符和单一的字体来打印文本行。为提升整个系统性能，早期的主机要与慢速的外围设备（如读卡器、卡片穿孔机、和运行其它工作的行式打印机）交叉进行工作。因此就产生了在线的或者假脱机的同步外围操作，这一术语目前在谈到计算机打印时仍然在使用。</p>
<p>在 UNIX 和 Linux 系统上，打印初始化使用的是 BSD（伯克利软件分发版Berkeley Software Distribution）打印子系统，它是由一个作为服务器运行的行式打印守护程序（LPD）组成，而客户端命令如 <code>lpr</code> 是用于提交打印作业。这个协议后来被 IETF 标准化为 RFC 1179 —— <strong>行式打印机守护进程协议</strong>。</p>
<p>System V 也有一个打印守护程序。它的功能与BSD 的 LPD 守护程序类似，但是它们的命令集不一样。你在后面会经常看到完成相同的任务使用不同选项的两个命令。例如，对于打印文件的命令，伯克利实现版本是 <code>lpr</code>，而 System V 实现版本是 <code>lp</code>。</p>
<p>随着打印机技术的进步，在一个页面上混合出现不同字体成为可能，并且可以将图片像文字一样打印。可变间距字体，以及更多先进的打印技术，比如间距和连字符，现在都已经标准化。出现了几种对基本的 lpd/lpr 方法等改进设计，比如 LPRng，下一代的 LPR，以及 CUPS。</p>
<p>许多可以打印图形的打印机，使用 Adobe PostScript 语言进行初始化。一个 PostScript 打印机有一个解释器引擎，它可以解释打印任务中的命令并从这些命令中生成最终的页面。PostScript 经常被用做原始文件（比如一个文本文件或者一个图像文件）和最终格式没有适合的 PostScript 功能的特定打印机之间的中间层。转换这些特定的打印任务，比如将一个 ASCII 文本文件或者一个 JPEG 图像转换为 PostScript，然后再使用过滤器转换 PostScript 到非 PostScript 打印机所需要的最终光栅格式。</p>
<p>现在的便携式文档格式Portable Document Format（PDF），它就是基于 PostScript 的，已经替换了传统的原始 PostScript。PDF 设计为与硬件和软件无关，它封装了要打印的页面的完整描述。你可以查看 以及打印 PDF 文件。</p>
<h3><a href="#管理打印队列"></a>管理打印队列</h3>
<p>用户直接打印作业到一个名为打印队列print queue的逻辑实体。在单用户系统中，打印队列和打印机通常是几乎相同的意思。但是，CUPS 允许系统不用连接到一个打印机上，而最终在一个远程系统上的排队打印作业，并且通过使用分类，允许将定向到一个分类的打印作业在该分类第一个可用的打印机上打印。</p>
<p>你可以检查和管理打印队列。对于 CUPS 来说，其中一些命令实现了一些新操作。另外的一些是源于 LPD 的兼容命令，不过现在的一些选项通常是最初的 LPD 打印系统选项的有限子集。</p>
<p>你可以使用 CUPS 的 <code>lpstat</code> 命令去检查队列，以了解打印系统。一些常见选项如下表 1。</p>
<p>选项</p>
<p>作用</p>
<p><code>-a</code></p>
<p>显示打印机状态</p>
<p><code>-c</code></p>
<p>显示打印分类</p>
<p><code>-p</code></p>
<p>显示打印状态：<code>enabled</code> 或者 <code>disabled</code></p>
<p><code>-s</code></p>
<p>显示默认打印机、打印机和类。相当于 <code>-d -c -v</code>。<strong>注意：要指定多个选项，这些选项必须像值一样分隔开。</strong></p>
<p><code>-v</code></p>
<p>显示打印机和它们的设备。</p>
<p><em>表 1. lpstat 命令的选项</em></p>
<p>你也可以使用 LPD 的 <code>lpc</code> 命令（它可以在 <code>/usr/sbin</code> 中找到）使用它的 <code>status</code> 选项。如果你不想指定打印机名字，将列出所有的队列。列表 1 展示了命令的一些示例。</p>
<pre><code class="hljs kotlin">[<span class="hljs-symbol">ian@</span>atticf27 ~]$ lpstat -d
system <span class="hljs-keyword">default</span> destination: HL<span class="hljs-number">-2280</span>DW
[<span class="hljs-symbol">ian@</span>atticf27 ~]$ lpstat -v HL<span class="hljs-number">-2280</span>DW
device <span class="hljs-keyword">for</span> HL<span class="hljs-number">-2280</span>DW: dnssd:<span class="hljs-comment">//Brother%20HL-2280DW._pdl-datastream._tcp.local/</span>
[<span class="hljs-symbol">ian@</span>atticf27 ~]$ lpstat -s
system <span class="hljs-keyword">default</span> destination: HL<span class="hljs-number">-2280</span>DW
members of <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">anyprint</span>:
    <span class="hljs-type">HL-2280DW</span></span>
    XP<span class="hljs-number">-610</span>
device <span class="hljs-keyword">for</span> anyprint: <span class="hljs-comment">///dev/null</span>
device <span class="hljs-keyword">for</span> HL<span class="hljs-number">-2280</span>DW: dnssd:<span class="hljs-comment">//Brother%20HL-2280DW._pdl-datastream._tcp.local/</span>
device <span class="hljs-keyword">for</span> XP<span class="hljs-number">-610</span>: dnssd:<span class="hljs-comment">//EPSON%20XP-610%20Series._ipp._tcp.local/?uuid=cfe92100-67c4-11d4-a45f-ac18266c48aa</span>
[<span class="hljs-symbol">ian@</span>atticf27 ~]$ lpstat -a XP<span class="hljs-number">-610</span>
XP<span class="hljs-number">-610</span> accepting requests since Thu <span class="hljs-number">27</span> Apr <span class="hljs-number">2017</span> <span class="hljs-number">05</span>:<span class="hljs-number">53</span>:<span class="hljs-number">59</span> PM EDT
[<span class="hljs-symbol">ian@</span>atticf27 ~]$ /usr/sbin/lpc status HL<span class="hljs-number">-2280</span>DW
HL<span class="hljs-number">-2280</span>DW:
    printer <span class="hljs-keyword">is</span> on device <span class="hljs-string">'dnssd'</span> speed <span class="hljs-number">-1</span>
    queuing <span class="hljs-keyword">is</span> disabled
    printing <span class="hljs-keyword">is</span> enabled
    no entries
    daemon present


</code></pre><p><em>列表 1. 显示可用打印队列</em></p>
<p>这个示例展示了两台打印机 —— HL-2280DW 和 XP-610，和一个分类 <code>anyprint</code>，它允许打印作业定向到这两台打印机中的第一个可用打印机。</p>
<p>在这个示例中，已经禁用了打印到 HL-2280DW 队列，但是打印功能是启用的，这样便于将打印机脱机维护之前可以完成打印队列中的任务。启用还是禁用队列，可以使用 <code>cupsaccept</code> 和 <code>cupsreject</code> 命令来管理。以前它们叫做 <code>accept</code> 和 <code>reject</code>，你或许可能在 <code>/usr/sbin</code> 中找到这些命令，但它们现在都是符号链接到新的命令上了。同样，启用还是禁用打印，你可以使用 <code>cupsenable</code> 和 <code>cupsdisable</code> 命令来管理。在早期版本的 CUPS 中，这些被称为 <code>enable</code> 和 <code>disable</code>，它也许会与 bash shell 内置的 <code>enable</code> 混淆。列表 2 展示了如何去启用打印机 HL-2280DW 上的队列，而禁止它的打印。CUPS 的几个命令支持使用 <code>-r</code> 选项去提供一个该操作的理由。这个理由会在你使用 <code>lpstat</code> 时显示，但是如果你使用的是 <code>lpc</code> 命令则不会显示它。</p>
<pre><code class="hljs tap">[ian@atticf27 ~]$ lpstat -a -p HL-2280DW
anyprint accepting requests since Mon<span class="hljs-number"> 29 </span>Jan<span class="hljs-number"> 2018 </span>01:17:09 PM EST
HL-2280DW not accepting requests since Thu<span class="hljs-number"> 27 </span>Apr<span class="hljs-number"> 2017 </span>05:52:27 PM EDT -
    Maintenance scheduled
XP-610 accepting requests since Thu<span class="hljs-number"> 27 </span>Apr<span class="hljs-number"> 2017 </span>05:53:59 PM EDT
printer HL-2280DW is idle. enabled since Thu<span class="hljs-number"> 27 </span>Apr<span class="hljs-number"> 2017 </span>05:52:27 PM EDT
    Maintenance scheduled
[ian@atticf27 ~]$ accept HL-2280DW
[ian@atticf27 ~]$ cupsdisable -r "waiting for toner delivery" HL-2280DW
[ian@atticf27 ~]$ lpstat -p -a
printer anyprint is idle. enabled since Mon<span class="hljs-number"> 29 </span>Jan<span class="hljs-number"> 2018 </span>01:17:09 PM EST
printer HL-2280DW disabled since Mon<span class="hljs-number"> 29 </span>Jan<span class="hljs-number"> 2018 </span>04:03:50 PM EST -
    waiting for toner delivery
printer XP-610 is idle. enabled since Thu<span class="hljs-number"> 27 </span>Apr<span class="hljs-number"> 2017 </span>05:53:59 PM EDT
anyprint accepting requests since Mon<span class="hljs-number"> 29 </span>Jan<span class="hljs-number"> 2018 </span>01:17:09 PM EST
HL-2280DW accepting requests since Mon<span class="hljs-number"> 29 </span>Jan<span class="hljs-number"> 2018 </span>04:03:50 PM EST
XP-610 accepting requests since Thu<span class="hljs-number"> 27 </span>Apr<span class="hljs-number"> 2017 </span>05:53:59 PM EDT

</code></pre><p><em>列表 2. 启用队列和禁用打印</em></p>
<p>注意：用户执行这些任务必须经过授权。它可能要求是 root 用户或者其它的授权用户。在 <code>/etc/cups/cups-files.conf</code> 中可以看到 <code>SystemGroup</code> 的条目，<code>cups-files.conf</code> 的 man 页面有更多授权用户组的信息。</p>
<h3><a href="#管理用户打印作业"></a>管理用户打印作业</h3>
<p>现在，你已经知道了一些如何去检查打印队列和类的方法，我将给你展示如何管理打印队列上的作业。你要做的第一件事是，如何找到一个特定打印机或者全部打印机上排队的任意作业。完成上述工作要使用 <code>lpq</code> 命令。如果没有指定任何选项，<code>lpq</code> 将显示默认打印机上的队列。使用 <code>-P</code> 选项和一个打印机名字将指定打印机，或者使用 <code>-a</code> 选项去指定所有的打印机，如下面的列表 3 所示。</p>
<pre><code class="hljs lsl">[pat@atticf27 ~]$ # As user pat (non-administrator)
[pat@atticf27 ~]$ lpq
HL<span class="hljs-number">-2280</span>DW is not ready
Rank Owner Job File(s) Total Size
<span class="hljs-number">1</span>st unknown <span class="hljs-number">4</span> unknown <span class="hljs-number">6144</span> bytes
<span class="hljs-number">2</span>nd pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">3</span>rd pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">4</span>th unknown <span class="hljs-number">8</span> unknown <span class="hljs-number">1024</span> bytes
<span class="hljs-number">5</span>th unknown <span class="hljs-number">9</span> unknown <span class="hljs-number">1024</span> bytes

[ian@atticf27 ~]$ # As user ian (administrator)
[ian@atticf27 ~]$ lpq -P xp<span class="hljs-number">-610</span>
xp<span class="hljs-number">-610</span> is ready
no entries
[ian@atticf27 ~]$ lpq -a
Rank Owner Job File(s) Total Size
<span class="hljs-number">1</span>st ian <span class="hljs-number">4</span> permutation.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">2</span>nd pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">3</span>rd pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">4</span>th ian <span class="hljs-number">8</span> .bashrc <span class="hljs-number">1024</span> bytes
<span class="hljs-number">5</span>th ian <span class="hljs-number">9</span> .bashrc <span class="hljs-number">1024</span> bytes

</code></pre><p><em>列表 3. 使用 lpq 检查打印队列</em></p>
<p>在这个示例中，共有五个作业，它们是 4、6、7、8、和 9，并且它是名为 HL-2280DW 的打印机的队列，而不是 XP-610 的。在这个示例中使用 <code>-P</code> 选项，可简单地显示哪个打印机已经准备好，但是没有队列任务。注意，CUPS 的打印机命名，是大小写不敏感的。还要注意的是，用户 ian 提交了同样的作业两次，当一个作业没有第一时间打印时，经常能看到用户的这种动作。</p>
<p>一般情况下，你可能会查看或者维护你自己的打印作业，但是，root 用户或者其它授权的用户通常会去管理其它打印作业。大多数 CUPS 命令都可以使用一个 <code>-E</code> 选项，对 CUPS 服务器与客户端之间的通讯进行加密。</p>
<p>使用 <code>lprm</code> 命令从队列中去删除一个 <code>.bashrc</code> 作业。如果不使用选项，将删除当前的作业。使用 <code>-</code> 选项，将删除全部的作业。要么就如列表 4 那样，指定一个要删除的作业列表。</p>
<pre><code class="hljs routeros">[[pat@atticf27 ~]$ # As<span class="hljs-built_in"> user </span>pat (non-administrator)
[pat@atticf27 ~]$ lprm
lprm: Forbidden

[ian@atticf27 ~]$ # As<span class="hljs-built_in"> user </span>ian (administrator)
[ian@atticf27 ~]$ lprm 8
[ian@atticf27 ~]$ lpq
HL-2280DW is <span class="hljs-keyword">not</span> ready
Rank Owner Job File(s) Total Size
1st ian 4 permutation.C 6144 bytes
2nd pat 6 bitlib.h 6144 bytes
3rd pat 7 bitlib.C 6144 bytes
4th ian 9 .bashrc 1024 bytes

</code></pre><p><em>列表 4. 使用 lprm 删除打印作业</em></p>
<p>注意，用户 pat 不能删除队列中的第一个作业，因为它是用户 ian 的。但是，ian 可以删除他自己的 8 号作业。</p>
<p>另外的可以帮你操作打印队列中的作业的命令是 <code>lp</code>。使用它可以去修改作业属性，比如打印数量或者优先级。我们假设用户 ian 希望他的作业 9 在用户 pat 的作业之前打印，并且希望打印两份。作业优先级的默认值是 50，它的优先级范围从最低的 1 到最高的 100 之间。用户 ian 可以使用 <code>-i</code>、<code>-n</code>、以及 <code>-q</code> 选项去指定一个要修改的作业，而新的打印数量和优先级可以如下面的列表 5 所示的那样去修改。注意，使用 <code>-l</code> 选项的 <code>lpq</code> 命令可以提供更详细的输出。</p>
<pre><code class="hljs lsl">[ian@atticf27 ~]$ lpq
HL<span class="hljs-number">-2280</span>DW is not ready
Rank Owner Job File(s) Total Size
<span class="hljs-number">1</span>st ian <span class="hljs-number">4</span> permutation.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">2</span>nd pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">3</span>rd pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">4</span>th ian <span class="hljs-number">9</span> .bashrc <span class="hljs-number">1024</span> bytes
[ian@atticf27 ~]$ lp -i <span class="hljs-number">9</span> -q <span class="hljs-number">60</span> -n <span class="hljs-number">2</span>
[ian@atticf27 ~]$ lpq
HL<span class="hljs-number">-2280</span>DW is not ready
Rank Owner Job File(s) Total Size
<span class="hljs-number">1</span>st ian <span class="hljs-number">9</span> .bashrc <span class="hljs-number">1024</span> bytes
<span class="hljs-number">2</span>nd ian <span class="hljs-number">4</span> permutation.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">3</span>rd pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">4</span>th pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes

</code></pre><p><em>列表 5. 使用 lp 去改变打印数量和优先级</em></p>
<p>最后，<code>lpmove</code> 命令可以允许一个作业从一个队列移动到另一个队列。例如，我们可能因为打印机 HL-2280DW 现在不能使用，而想去移动一个作业到另外的队列上。你可以指定一个作业编号，比如 9，或者你可以用一个队列名加一个连字符去限定它，比如，HL-2280DW-0。<code>lpmove</code> 命令的操作要求是授权用户。列表 6 展示了如何去从一个队列移动作业到另外的队列，先是指定打印机和作业 ID 移动，然后是移动指定打印机的所有作业。稍后我们可以去再次检查队列，其中一个作业已经在打印中了。</p>
<pre><code class="hljs lsl">[ian@atticf27 ~]$ lpmove HL<span class="hljs-number">-2280</span>DW<span class="hljs-number">-9</span> anyprint
[ian@atticf27 ~]$ lpmove HL<span class="hljs-number">-2280</span>DW xp<span class="hljs-number">-610</span>
[ian@atticf27 ~]$ lpq -a
Rank Owner Job File(s) Total Size
active ian <span class="hljs-number">9</span> .bashrc <span class="hljs-number">1024</span> bytes
<span class="hljs-number">1</span>st ian <span class="hljs-number">4</span> permutation.C <span class="hljs-number">6144</span> bytes
<span class="hljs-number">2</span>nd pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">3</span>rd pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes
[ian@atticf27 ~]$ # A few minutes later
[ian@atticf27 ~]$ lpq -a
Rank Owner Job File(s) Total Size
active pat <span class="hljs-number">6</span> bitlib.h <span class="hljs-number">6144</span> bytes
<span class="hljs-number">1</span>st pat <span class="hljs-number">7</span> bitlib.C <span class="hljs-number">6144</span> bytes

</code></pre><p><em>列表 6. 使用 lpmove 移动作业到另外一个打印队列</em></p>
<p>如果你使用的是 CUPS 之外的打印服务器，比如 LPD 或者 LPRng，大多数的队列管理功能是由 <code>lpc</code> 命令的子命令来处理的。例如，你可以使用 <code>lpc topq</code> 去移动一个作业到队列的顶端。其它的 <code>lpc</code> 子命令包括 <code>disable</code>、<code>down</code>、<code>enable</code>、<code>hold</code>、<code>move</code>、<code>redirect</code>、<code>release</code>、和 <code>start</code>。这些子命令在 CUPS 的兼容命令中没有实现。</p>
<h4><a href="#打印文件"></a>打印文件</h4>
<p>如何去打印创建的作业？大多数图形界面程序都提供了一个打印方法，通常是 <strong>文件</strong> 菜单下面的选项。这些程序为选择打印机、设置页边距、彩色或者黑白打印、打印数量、选择每张纸打印的页面数（每张纸打印两个页面，通常用于讲义）等等，都提供了图形化的工具。现在，我将为你展示如何使用命令行工具去管理这些功能，然后和图形化实现进行比较。</p>
<p>打印文件最简单的方法是使用 <code>lpr</code> 命令，然后提供一个文件名字。这将在默认打印机上打印这个文件。而 <code>lp</code> 命令不仅可以打印文件，也可以修改打印作业。列表 7 展示了使用这个命令的一个简单示例。注意，<code>lpr</code> 会静默处理这个作业，但是 <code>lp</code> 会显示处理后的作业的 ID。</p>
<pre><code class="hljs elixir">[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>echo <span class="hljs-string">"Print this text"</span> &gt; printexample.txt
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpr printexample.txt
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lp printexample.txt
request id is HL-<span class="hljs-number">2280</span>DW-<span class="hljs-number">12</span> (<span class="hljs-number">1</span> file(s))

</code></pre><p><em>列表 7. 使用 lpr 和 lp 打印</em></p>
<p>表 2 展示了 <code>lpr</code> 上你可以使用的一些选项。注意， <code>lp</code> 的选项和 <code>lpr</code> 的很类似，但是名字可能不一样；例如，<code>-#</code> 在 <code>lpr</code> 上是相当于 <code>lp</code> 的 <code>-n</code> 选项。查看 man 页面了解更多的信息。</p>
<p>选项</p>
<p>作用</p>
<p><code>-C</code>， <code>-J</code> 或 <code>-T</code></p>
<p>设置一个作业名字。</p>
<p><code>-P</code></p>
<p>选择一个指定的打印机。</p>
<p><code>-#</code></p>
<p>指定打印数量。注意这不同于 <code>lp</code> 命令的 <code>-n</code> 选项。</p>
<p><code>-m</code></p>
<p>在作业完成时发送电子邮件。</p>
<p><code>-l</code></p>
<p>表示打印文件已经为打印做好格式准备。相当于 <code>-o raw</code>。</p>
<p><code>-o</code></p>
<p>设置一个作业选项。</p>
<p><code>-p</code></p>
<p>格式化一个带有阴影标题的文本文件。相关于 <code>-o prettyprint</code>。</p>
<p><code>-q</code></p>
<p>暂缓（或排队）后面的打印作业。</p>
<p><code>-r</code></p>
<p>在文件进入打印池之后，删除文件。</p>
<p><em>表 2. lpr 的选项</em></p>
<p>列表 8 展示了一些选项。我要求打印之后给我发确认电子邮件，那个作业被暂缓执行，并且在打印之后删除文件。</p>
<pre><code class="hljs vhdl">[ian@atticf27 ~]$ lpr -P HL-<span class="hljs-number">2280</span>DW -J <span class="hljs-string">"Ian's text file"</span> -#<span class="hljs-number">2</span> -m -p -q -r printexample.txt
[[ian@atticf27 ~]$ lpq -l
HL-<span class="hljs-number">2280</span>DW <span class="hljs-keyword">is</span> ready


ian: <span class="hljs-number">1</span>st [job <span class="hljs-number">13</span> localhost]
 <span class="hljs-number">2</span> copies <span class="hljs-keyword">of</span> Ian<span class="hljs-symbol">'s</span> <span class="hljs-literal">text</span> <span class="hljs-keyword">file</span> <span class="hljs-number">1024</span> bytes
[ian@atticf27 ~]$ ls printexample.txt
ls: cannot <span class="hljs-keyword">access</span> <span class="hljs-symbol">'printexample</span>.txt': No such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory

</code></pre><p><em>列表 8. 使用 lpr 打印</em></p>
<p>我现在有一个在 HL-2280DW 打印队列上暂缓执行的作业。然后怎么做？<code>lp</code> 命令可以通过使用 <code>-H</code> 的各种选项来暂缓或者投放作业。列表 9 展示了如何投放被暂缓的作业。查看 <code>lp</code> 命令的 man 页面了解其它选项的信息。</p>
<pre><code class="hljs elixir">[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lp -i <span class="hljs-number">13</span> -H resume

</code></pre><p><em>列表 9. 重启一个暂缓的打印作业</em></p>
<p>并不是所有的可用打印机都支持相同的选项集。使用 <code>lpoptions</code> 命令去查看一个打印机的常用选项。添加 <code>-l</code> 选项去显示打印机专用的选项。列表 10 展示了两个示例。许多常见的选项涉及到人像/风景打印、页面大小和输出在纸张上的布局。详细信息查看 man 页面。</p>
<pre><code class="hljs routeros">[ian@atticf27 ~]$ lpoptions -p HL-2280DW
<span class="hljs-attribute">copies</span>=1 <span class="hljs-attribute">device-uri</span>=dnssd://Brother%20HL-2280DW._pdl-datastream._tcp.local/
<span class="hljs-attribute">finishings</span>=3 <span class="hljs-attribute">job-cancel-after</span>=10800 <span class="hljs-attribute">job-hold-until</span>=<span class="hljs-literal">no</span>-hold <span class="hljs-attribute">job-priority</span>=50
<span class="hljs-attribute">job-sheets</span>=none,none <span class="hljs-attribute">marker-change-time</span>=1517325288 <span class="hljs-attribute">marker-colors</span>=#000000,#000000
<span class="hljs-attribute">marker-levels</span>=-1,92 <span class="hljs-attribute">marker-names</span>=<span class="hljs-string">'Black\ Toner\ Cartridge,Drum\ Unit'</span>
<span class="hljs-attribute">marker-types</span>=toner,opc <span class="hljs-attribute">number-up</span>=1 <span class="hljs-attribute">printer-commands</span>=none
<span class="hljs-attribute">printer-info</span>=<span class="hljs-string">'Brother HL-2280DW'</span> <span class="hljs-attribute">printer-is-accepting-jobs</span>=<span class="hljs-literal">true</span>
<span class="hljs-attribute">printer-is-shared</span>=<span class="hljs-literal">true</span> <span class="hljs-attribute">printer-is-temporary</span>=<span class="hljs-literal">false</span> printer-location
<span class="hljs-attribute">printer-make-and-model</span>=<span class="hljs-string">'Brother HL-2250DN - CUPS+Gutenprint v5.2.13 Simplified'</span>
<span class="hljs-attribute">printer-state</span>=3 <span class="hljs-attribute">printer-state-change-time</span>=1517325288 <span class="hljs-attribute">printer-state-reasons</span>=none
<span class="hljs-attribute">printer-type</span>=135188 <span class="hljs-attribute">printer-uri-supported</span>=ipp://localhost/printers/HL-2280DW
<span class="hljs-attribute">sides</span>=one-sided

[ian@atticf27 ~]$ lpoptions -l -p xp-610
PageSize/Media Size: *Letter Legal Executive Statement A4
ColorModel/Color Model: *Gray Black
InputSlot/Media Source: *Standard ManualAdj<span class="hljs-built_in"> Manual </span>MultiPurposeAdj MultiPurpose
UpperAdj Upper LowerAdj Lower LargeCapacityAdj LargeCapacity
StpQuality/<span class="hljs-builtin-name">Print</span> Quality: None Draft *Standard High
Resolution/Resolution: <span class="hljs-number">*301</span>x300dpi 150dpi 300dpi 600dpi
Duplex/2-Sided Printing: *None DuplexNoTumble DuplexTumble
StpiShrinkOutput/Shrink<span class="hljs-built_in"> Page </span><span class="hljs-keyword">If</span> Necessary <span class="hljs-keyword">to</span> Fit Borders: *Shrink Crop Expand
StpColorCorrection/Color Correction: *None Accurate Bright Hue Uncorrected
Desaturated Threshold Density<span class="hljs-built_in"> Raw </span>Predithered
StpBrightness/Brightness: 0 100 200 300 400 500 600 700 800 900 *None 1100
1200 1300 1400 1500 1600 1700 1800 1900 2000 Custom.REAL
StpContrast/Contrast: 0 100 200 300 400 500 600 700 800 900 *None 1100 1200
1300 1400 1500 1600 1700 1800 1900 2000 2100 2200 2300 2400 2500 2600 2700
2800 2900 3000 3100 3200 3300 3400 3500 3600 3700 3800 3900 4000 Custom.REAL
StpImageType/Image Type: None Text Graphics *TextGraphics Photo LineArt


</code></pre><p><em>列表 10. 检查打印机选项</em></p>
<p>大多数的 GUI 应用程序有一个打印对话框，通常你可以使用 <strong>文件 &gt;打印</strong> 菜单去选择它。图 1 展示了在 GIMP 中的一个示例，GIMP 是一个图像处理程序。</p>
<p><a href="https://camo.githubusercontent.com/6e4fe2cf21f4fd5ac2d0c7bb8d625af1f54026de/68747470733a2f2f7777772e69626d2e636f6d2f646576656c6f706572776f726b732f6c6962726172792f6c2d6c706963312d3130382d342f67696d702d7072696e742e6a7067"><img src="https://p0.ssl.qhimg.com/t01077b1b37baba903c.jpg" alt="Printing from the GIMP"></a></p>
<p><em>图 1. 在 GIMP 中打印</em></p>
<p>到目前为止，我们所有的命令都是隐式指向到本地的 CUPS 打印服务器上。你也可以通过指定 <code>-h</code> 选项和一个端口号（如果不是 CUPS 的默认端口号 631 的话）将打印转向到另外一个系统上的服务器。</p>
<h3><a href="#cups-和-cups-服务器"></a>CUPS 和 CUPS 服务器</h3>
<p>CUPS 打印系统的核心是 <code>cupsd</code> 打印服务器，它是一个运行的守护进程。CUPS 配置文件一般位于 <code>/etc/cups/cupsd.conf</code>。<code>/etc/cups</code> 目录也有与 CUPS 相关的其它的配置文件。CUPS 一般在系统初始化期间启动，根据你的发行版不同，它也可能通过位于 <code>/etc/rc.d/init.d</code> 或者 <code>/etc/init.d</code> 目录中的 CUPS 脚本来控制。对于 最新使用 systemd 来初始化的系统，CUPS 服务脚本可能在 <code>/usr/lib/systemd/system/cups.service</code> 中。和大多数使用脚本的服务一样，你可以停止、启动、或者重启守护程序。查看我们的教程：<a href="https://www.ibm.com/developerworks/library/l-lpic1-101-3/">学习 Linux，101：运行级别、引导目标、关闭、和重启动</a>，了解使用初始化脚本的更多信息。</p>
<p>配置文件 <code>/etc/cups/cupsd.conf</code> 包含一些管理参数，比如访问打印系统、是否允许远程打印、本地打印池文件等等。在一些系统上，第二部分单独描述了打印队列，它一般是由配置工具自动生成的。列表 11 展示了一个默认的 <code>cupsd.conf</code> 文件中的一些条目。注意，注释是以 <code>#</code> 字符开头的。默认值通常以注释的方式显示，并且可以通过删除前面的 <code>#</code> 字符去改变默认值。</p>
<pre><code class="hljs php"><span class="hljs-comment"># Only listen for connections from the local machine.</span>
Listen localhost:<span class="hljs-number">631</span>
Listen /<span class="hljs-keyword">var</span>/run/cups/cups.sock

<span class="hljs-comment"># Show shared printers on the local network.</span>
Browsing On
BrowseLocalProtocols dnssd

<span class="hljs-comment"># Default authentication type, when authentication is required...</span>
DefaultAuthType Basic

<span class="hljs-comment"># Web interface setting...</span>
WebInterface Yes

<span class="hljs-comment"># Set the default printer/job policies...</span>
&lt;Policy <span class="hljs-keyword">default</span>&gt;
 <span class="hljs-comment"># Job/subscription privacy...</span>
 JobPrivateAccess <span class="hljs-keyword">default</span>
 JobPrivateValues <span class="hljs-keyword">default</span>
 SubscriptionPrivateAccess <span class="hljs-keyword">default</span>
 SubscriptionPrivateValues <span class="hljs-keyword">default</span>

 <span class="hljs-comment"># Job-related operations must be done by the owner or an administrator...</span>
 &lt;Limit Create-Job <span class="hljs-keyword">Print</span>-Job <span class="hljs-keyword">Print</span>-URI Validate-Job&gt;
 Order deny,allow
 &lt;/Limit&gt;

</code></pre><p><em>列表 11. 默认的 /etc/cups/cupsd.conf 文件的部分内容</em></p>
<p>可以用在 <code>cupsd.conf</code> 中使用的文件、目录、和用户配置命令，现在都存储在作为替代的 <code>cups-files.conf</code> 中。这是为了防范某些类型的提权攻击。列表 12 展示了 <code>cups-files.conf</code> 文件中的一些条目。注意，正如在文件层次结构标准（FHS）中所期望的那样，打印池文件默认保存在文件系统的 <code>/var/spool</code> 目录中。查看 man 页面了解 <code>cupsd.conf</code> 和 <code>cups-files.conf</code> 配置文件的更多信息。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> Location of the file listing all of the <span class="hljs-built_in">local</span> printers...</span>
<span class="hljs-meta">#</span><span class="bash">Printcap /etc/printcap</span>
<span class="hljs-meta">
#</span><span class="bash"> Format of the Printcap file...</span>
<span class="hljs-meta">#</span><span class="bash">PrintcapFormat bsd</span>
<span class="hljs-meta">#</span><span class="bash">PrintcapFormat plist</span>
<span class="hljs-meta">#</span><span class="bash">PrintcapFormat solaris</span>
<span class="hljs-meta">
#</span><span class="bash"> Location of all spool files...</span>
<span class="hljs-meta">#</span><span class="bash">RequestRoot /var/spool/cups</span>
<span class="hljs-meta">
#</span><span class="bash"> Location of helper programs...</span>
<span class="hljs-meta">#</span><span class="bash">ServerBin /usr/lib/cups</span>
<span class="hljs-meta">
#</span><span class="bash"> SSL/TLS keychain <span class="hljs-keyword">for</span> the scheduler...</span>
<span class="hljs-meta">#</span><span class="bash">ServerKeychain ssl</span>
<span class="hljs-meta">
#</span><span class="bash"> Location of other configuration files...</span>
<span class="hljs-meta">#</span><span class="bash">ServerRoot /etc/cups</span>

</code></pre><p><em>列表 12. 默认的 /etc/cups/cups-files.conf 配置文件的部分内容</em></p>
<p>列表 12 提及了 <code>/etc/printcap</code> 文件。这是 LPD 打印服务器的配置文件的名字，并且一些应用程序仍然使用它去确定可用的打印机和它们的属性。它通常是在 CUPS 系统上自动生成的，因此，你可能没有必要去修改它。但是，如果你在诊断用户打印问题，你可能需要去检查它。列表 13 展示了一个示例。</p>
<pre><code class="hljs routeros"><span class="hljs-comment"># This file was automatically generated by cupsd(8) from the</span>
<span class="hljs-comment"># /etc/cups/printers.conf file. All changes to this file</span>
<span class="hljs-comment"># will be lost.</span>
HL-2280DW|Brother HL-2280DW:<span class="hljs-attribute">rm</span>=atticf27:rp=HL-2280DW:
anyprint|Any available printer:<span class="hljs-attribute">rm</span>=atticf27:rp=anyprint:
XP-610|EPSON XP-610 Series:<span class="hljs-attribute">rm</span>=atticf27:rp=XP-610:

</code></pre><p><em>列表 13. 自动生成的 /etc/printcap</em></p>
<p>这个文件中的每一行都有一个打印机名字、打印机描述，远程机器（<code>rm</code>）的名字、以及那个远程机器上的远程打印机（<code>rp</code>）。老的 <code>/etc/printcap</code> 文件也描述了打印机的能力。</p>
<h4><a href="#文件转换过滤器"></a>文件转换过滤器</h4>
<p>你可以使用 CUPS 打印许多类型的文件，包括明文的文本文件、PDF、PostScript、和各种格式的图像文件，你只需要提供要打印的文件名，除此之外你再无需向 <code>lpr</code> 或 <code>lp</code> 命令提供更多的信息。这个神奇的壮举是通过使用过滤器来实现的。实际上，这些年来最流行的过滤器就就叫做 magicfilter（神奇的过滤器）。</p>
<p>当打印一个文件时，CUPS 使用多用途因特网邮件扩展（MIME）类型去决定合适的转换过滤器。其它的打印数据包可能使用由 <code>file</code> 命令使用的神奇数字机制。关于 <code>file</code> 或者神奇数的更多信息可以查看它们的 man 页面。</p>
<p>输入文件被过滤器转换成中间层的光栅格式或者 PostScript 格式。一些作业信息，比如打印数量也会被添加进去。数据最终通过一个后端发送到目标打印机。还有一些可以用手动过滤的输入文件的过滤器（如 a2ps 或 dvips）。你可以通过这些过滤器获得特殊格式的结果，或者去处理一些 CUPS 原生并不支持的文件格式。</p>
<h4><a href="#添加打印机"></a>添加打印机</h4>
<p>CUPS 支持多种打印机，包括：</p>
<ul>
<li>本地连接的并行口和 USB 口打印机</li>
<li>因特网打印协议（IPP）打印机</li>
<li>远程 LPD 打印机</li>
<li>使用 SAMBA 的 Microsoft® Windows® 打印机</li>
<li>使用 NCP 的 Novell 打印机</li>
<li>HP Jetdirect 打印机</li>
</ul>
<p>当系统启动或者设备连接时，现在的大多数系统都会尝试自动检测和自动配置本地硬件。同样，许多网络打印机也可以被自动检测到。使用 CUPS 的 web 管理工具（<a href="http://localhost:631">http://localhost:631</a> 或者 <a href="http://127.0.0.1:631">http://127.0.0.1:631</a>）去搜索或添加打印机。许多发行版都包含它们自己的配置工具，比如，在 SUSE 系统上的 YaST。图 2 展示了使用 localhost:631 的 CUPS 界面，图 3 展示了 Fedora 27 上的 GNOME 打印机设置对话框。</p>
<p><a href="https://camo.githubusercontent.com/3c12d5f970864e177c715f04124f63e9c39cc044/68747470733a2f2f7777772e69626d2e636f6d2f646576656c6f706572776f726b732f6c6962726172792f6c2d6c706963312d3130382d342f6669672d637570732d7765622e6a7067"><img src="https://p0.ssl.qhimg.com/t01fb75282c8654e356.jpg" alt="Using the CUPS web interface"></a></p>
<p><em>图 2. 使用 CUPS 的 web 界面</em></p>
<p><a href="https://camo.githubusercontent.com/52b0298bcba1592fad90a7c5f8d5969c5cfc87cd/68747470733a2f2f7777772e69626d2e636f6d2f646576656c6f706572776f726b732f6c6962726172792f6c2d6c706963312d3130382d342f6669672d73657474696e67732e6a7067"><img src="https://p0.ssl.qhimg.com/t01c586e57c99944328.jpg" alt="Using printer settings on Fedora 27"></a></p>
<p><em>图 3. Fedora 27 上的打印机设置</em></p>
<p>你也可以从命令行配置打印机。在配置打印机之前，你需要一些关于打印机和它的连接方式的基本信息。如果是一个远程系统，你还需要一个用户 ID 和密码。</p>
<p>你需要去知道你的打印机使用什么样的驱动程序。不是所有的打印机都支持 Linux，有些打印机在 Linux 上压根就不能使用，或者功能受限。你可以去 OpenPrinting.org 去查看是否有你的特定的打印机的驱动程序。<code>lpinfo</code> 命令也可以帮你识别有效的设备类型和驱动程序。使用 <code>-v</code> 选项去列出支持的设备，使用 <code>-m</code> 选项去列出驱动程序，如列表 14 所示。</p>
<pre><code class="hljs groovy">[ian<span class="hljs-meta">@atticf</span>27 ~]$ lpinfo -m | grep -i xp<span class="hljs-number">-610</span>
lsb<span class="hljs-regexp">/usr/</span>Epson<span class="hljs-regexp">/epson-inkjet-printer-escpr/</span>Epson-XP<span class="hljs-number">-610</span>_Series-epson-escpr-en.ppd.gz
EPSON XP<span class="hljs-number">-610</span> Series, Epson Inkjet Printer Driver (ESC/P-R) <span class="hljs-keyword">for</span> Linux
[ian<span class="hljs-meta">@atticf</span>27 ~]$ locate <span class="hljs-string">"Epson-XP-610_Series-epson-escpr-en.ppd.gz"</span>
<span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/ppd/</span>Epson<span class="hljs-regexp">/epson-inkjet-printer-escpr/</span>Epson-XP<span class="hljs-number">-610</span>_Series-epson-escpr-en.ppd.gz
[ian<span class="hljs-meta">@atticf</span>27 ~]$ lpinfo -v
network socket
network ipps
network lpd
network beh
network ipp
network http
network https
direct hp
serial <span class="hljs-string">serial:</span><span class="hljs-regexp">/dev/</span>ttyS0?baud=115200
direct parallel:<span class="hljs-regexp">/dev/</span>lp0
network smb
direct hpfax
network <span class="hljs-string">dnssd:</span><span class="hljs-comment">//Brother%20HL-2280DW._pdl-datastream._tcp.local/</span>
network <span class="hljs-string">dnssd:</span><span class="hljs-comment">//EPSON%20XP-610%20Series._ipp._tcp.local/?uuid=cfe92100-67c4-11d4-a45f-ac18266c48aa</span>
network <span class="hljs-string">lpd:</span><span class="hljs-comment">//BRN001BA98A1891/BINARY_P1</span>
network <span class="hljs-string">lpd:</span><span class="hljs-comment">//192.168.1.38:515/PASSTHRU</span>

</code></pre><p><em>列表 14. 可用的打印机驱动程序</em></p>
<p>这个 Epson-XP-610_Series-epson-escpr-en.ppd.gz 驱动程序在我的系统上位于 <code>/usr/share/ppd/Epson/epson-inkjet-printer-escpr/</code> 目录中。</p>
<p>如果你找不到驱动程序，你可以到打印机生产商的网站看看，说不定会有专用的驱动程序。例如，在写这篇文章的时候，Brother 就有一个我的 HL-2280DW 打印机的驱动程序，但是，这个驱动程序在 OpenPrinting.org 上还没有列出来。</p>
<p>如果你收集齐了基本信息，你可以如列表 15 所示的那样，使用 <code>lpadmin</code> 命令去配置打印机。为此，我将为我的 HL-2280DW 打印机创建另外一个实例，以便于双面打印。</p>
<pre><code class="hljs elixir">[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpinfo -m | grep -i <span class="hljs-string">"hl.*2280"</span>
HL2280DW.ppd Brother HL2280DW <span class="hljs-keyword">for</span> CUPS
lsb/usr/HL2280DW.ppd Brother HL2280DW <span class="hljs-keyword">for</span> CUPS
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpadmin -p HL-<span class="hljs-number">2280</span>DW-duplex -E -m HL2280DW.ppd \
&gt; -v <span class="hljs-symbol">dnssd:</span>/<span class="hljs-regexp">/Brother%20HL-2280DW._pdl-datastream._tcp.local/</span> \
&gt; -D <span class="hljs-string">"Brother 1"</span> -o sides=two-sided-long-edge
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpstat -a
anyprint accepting requests since Mon <span class="hljs-number">29</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">01</span><span class="hljs-symbol">:</span><span class="hljs-number">17</span><span class="hljs-symbol">:</span>09 PM EST
HL-<span class="hljs-number">2280</span>DW accepting requests since Tue <span class="hljs-number">30</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">10</span><span class="hljs-symbol">:</span><span class="hljs-number">56</span><span class="hljs-symbol">:</span><span class="hljs-number">10</span> AM EST
HL-<span class="hljs-number">2280</span>DW-duplex accepting requests since Wed <span class="hljs-number">31</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">11</span><span class="hljs-symbol">:</span><span class="hljs-number">41</span><span class="hljs-symbol">:</span><span class="hljs-number">16</span> AM EST
HXP-<span class="hljs-number">610</span> accepting requests since Mon <span class="hljs-number">29</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">10</span><span class="hljs-symbol">:</span><span class="hljs-number">34</span><span class="hljs-symbol">:</span><span class="hljs-number">49</span> PM EST

</code></pre><p><em>列表 15. 配置一台打印机</em></p>
<p>你可以使用带 <code>-c</code> 选项的 <code>lpadmin</code> 命令去创建一个仅用于双面打印的新分类，而不用为了双面打印去创建一个打印机的副本。</p>
<p>如果你需要删除一台打印机，使用带 <code>-x</code> 选项的 <code>lpadmin</code> 命令。</p>
<p>列表 16 展示了如何去删除打印机和创建一个替代类。</p>
<pre><code class="hljs elixir">[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpadmin -x HL-<span class="hljs-number">2280</span>DW-duplex
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpadmin -p HL-<span class="hljs-number">2280</span>DW -c duplex -E -D <span class="hljs-string">"Duplex printing"</span> -o sides=two-sided-long-edge
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>cupsenable duplex
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>cupsaccept duplex
[ian<span class="hljs-variable">@atticf27</span> ~]<span class="hljs-variable">$ </span>lpstat -a
anyprint accepting requests since Mon <span class="hljs-number">29</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">01</span><span class="hljs-symbol">:</span><span class="hljs-number">17</span><span class="hljs-symbol">:</span>09 PM EST
duplex accepting requests since Wed <span class="hljs-number">31</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">12</span><span class="hljs-symbol">:</span><span class="hljs-number">12</span><span class="hljs-symbol">:</span><span class="hljs-number">05</span> PM EST
HL-<span class="hljs-number">2280</span>DW accepting requests since Wed <span class="hljs-number">31</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">11</span><span class="hljs-symbol">:</span><span class="hljs-number">51</span><span class="hljs-symbol">:</span><span class="hljs-number">16</span> AM EST
XP-<span class="hljs-number">610</span> accepting requests since Mon <span class="hljs-number">29</span> Jan <span class="hljs-number">2018</span> <span class="hljs-number">10</span><span class="hljs-symbol">:</span><span class="hljs-number">34</span><span class="hljs-symbol">:</span><span class="hljs-number">49</span> PM EST

</code></pre><p><em>列表 16. 删除一个打印机和创建一个类</em></p>
<p>你也可以使用 <code>lpadmin</code> 或者 <code>lpoptions</code> 命令去设置各种打印机选项。详细信息请查看 man 页面。</p>
<h3><a href="#排错"></a>排错</h3>
<p>如果你有打印问题，尝试下列的提示：</p>
<ul>
<li>确保 CUPS 服务器正在运行。你可以使用 <code>lpstat</code> 命令，如果它不能连接到 cupsd 守护程序，它将会报告一个错误。或者，你可以使用 <code>ps -ef</code> 命令在输出中去检查是否有 cupsd。</li>
<li>如果你试着排队一个打印作业而得到一个错误信息，指示打印机不接受这个作业，你可以使用 <code>lpstat -a</code> 或者 <code>lpc status</code> 去检查那个打印机是否接受作业。</li>
<li>如果一个队列中的作业没有打印，使用 <code>lpstat -p</code> 或 <code>lpc status</code> 去检查那个打印机是否接受作业。如前面所讨论的那样，你可能需要将这个作业移动到其它的打印机。</li>
<li>如果这个打印机是远程的，检查它在远程系统上是否存在，并且是可操作的。</li>
<li>检查配置文件，确保特定的用户或者远程系统允许在这个打印机上打印。</li>
<li>确保防火墙允许远程打印请求，是否允许从其它系统到你的系统，或者从你的系统到其它系统的数据包通讯。</li>
<li>验证是否有正确的驱动程序。</li>
</ul>
<p>正如你所见，打印涉及到你的系统中的几个组件，甚至还有网络。在本教程中，基于篇幅的考虑，我们仅能给你的诊断提供了几个着手点。大多数的 CUPS 系统也有实现我们所讨论的命令行功能的图形界面。一般情况下，这个界面是从本地主机使用浏览器指向 631 端口（<a href="http://localhost:631">http://localhost:631</a> 或 <a href="http://127.0.0.1:631">http://127.0.0.1:631</a>）来访问的，如前面的图 2 所示。</p>
<p>你可以通过将 CUPS 运行在前台而不是做为一个守护进程来诊断它的问题。如果有需要，你也可以通过这种方式去测试替代的配置文件。运行 <code>cupsd -h</code> 获得更多信息，或者查看 man 页面。</p>
<p>CUPS 也带有一个访问日志和错误日志。你可以在 <code>cupsd.conf</code> 中使用 <code>LogLevel</code> 语句来改变日志级别。默认情况下，日志是保存在 <code>/var/log/cups</code> 目录。它们可以在浏览器界面（<a href="http://localhost:631">http://localhost:631</a>）下，从 <strong>Administration</strong> 选项卡中查看。使用不带任何选项的 <code>cupsctl</code> 命令可以显示日志选项。也可以编辑 <code>cupsd.conf</code> 或者使用 <code>cupsctl</code> 去调整各种日志参数。查看 <code>cupsctl</code> 命令的 man 页面了解更多信息。</p>
<p>在 Ubuntu 的 Wiki 页面上的 <a href="https://wiki.ubuntu.com/DebuggingPrintingProblems">调试打印问题</a> 页面也是一个非常好的学习的地方。</p>
<p>这就是关于打印和 CUPS 的介绍。</p>
<hr>
<p>via: <a href="https://www.ibm.com/developerworks/library/l-lpic1-108-4/index.html">https://www.ibm.com/developerworks/library/l-lpic1-108-4/index.html</a></p>
<p>作者：<a href="https://www.ibm.com">Ian Shields</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
完全指南：在 Linux 中如何打印和管理打印机

## 原文链接
[https://www.zcfy.cc/article/manage-printers-and-printing](https://www.zcfy.cc/article/manage-printers-and-printing)

