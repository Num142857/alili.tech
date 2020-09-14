---
title: '回复：块层介绍第一部分 - 块 I/O 层' 
date: 2019-01-21 2:30:06
hidden: true
slug: lpi442o0wne
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#回复块层介绍第一部分---块-io-层"></a>回复：块层介绍第一部分 - 块 I/O 层</h1>
<h3><a href="#块层介绍第一部分块-io-层"></a>块层介绍第一部分：块 I/O 层</h3>
<p>回复：amarao 在<a href="https://lwn.net/Articles/737588/">块层介绍第一部分：块 I/O 层</a> 中提的问题 先前的文章：<a href="https://lwn.net/Articles/736534/">块层介绍第一部分：块 I/O 层</a></p>
<p><a href="https://camo.githubusercontent.com/c05f188f14b3fb4d757271b8e568c3bf470a4216/68747470733a2f2f7374617469632e6c776e2e6e65742f696d616765732f323031372f6e65696c2d626c6f636b6c617965722e706e67"><img src="https://p0.ssl.qhimg.com/t01e981b3c31ea1c967.png" alt=""></a></p>
<p>嗨，</p>
<p>你在这里描述的问题与块层不直接相关。这可能是一个驱动错误、可能是一个 SCSI 层错误，但绝对不是一个块层的问题。</p>
<p>不幸的是，报告针对 Linux 的错误是一件难事。有些开发者拒绝去看 bugzilla，有些开发者喜欢它，有些（像我这样）只能勉强地使用它。</p>
<p>另一种方法是发送电子邮件。为此，你需要选择正确的邮件列表，还有也许是正确的开发人员，当他们心情愉快，或者不是太忙或者不是假期时找到它们。有些人会努力回复所有，有些是完全不可预知的 - 这对我来说通常会发送一个补丁，包含一些错误报告。如果你只是有一个你自己几乎都不了解的 bug，那么你的预期响应率可能会更低。很遗憾，但这是是真的。</p>
<p>许多 bug 都会得到回应和处理，但很多 bug 都没有。</p>
<p>我不认为说没有人关心是公平的，但是没有人认为它如你想的那样重要是有可能的。如果你想要一个解决方案，那么你需要驱动它。一个驱动它的方法是花钱请顾问或者与经销商签订支持合同。我怀疑你的情况没有上面的可能。另一种方法是了解代码如何工作，并自己找到解决方案。很多人都这么做，但是这对你来说可能不是一种选择。另一种方法是在不同的相关论坛上不断提出问题，直到得到回复。坚持可以见效。你需要做好准备去执行任何你所要求的测试，可能包括建立一个新的内核来测试。</p>
<p>如果你能在最近的内核(4.12 或者更新)上复现这个 bug，我建议你邮件报告给 <a href="mailto:linux-kernel@vger.kernel.org">linux-kernel@vger.kernel.org</a>、<a href="mailto:linux-scsi@vger.kernel.org">linux-scsi@vger.kernel.org</a> 和我（<a href="mailto:neilb@suse.com">neilb@suse.com</a>）（注意你不必订阅这些列表来发送邮件，只需要发送就行）。描述你的硬件以及如何触发问题的。</p>
<p>包含所有进程状态是 “D” 的栈追踪。你可以用 “cat /proc/$PID/stack” 来得到它，这里的 “$PID” 是进程的 pid。</p>
<p>确保避免抱怨或者说这个已经坏了好几年了以及这是多么严重不足。没有人关心这个。我们关心的是 bug 以及如何修复它。因此只要报告相关的事实就行。</p>
<p>尝试在邮件中而不是链接到其他地方的链接中包含所有事实。有时链接是需要的，但是对于你的脚本，它只有 8 行，所以把它包含在邮件中就行（并避免像 “fuckup” 之类的描述。只需称它为“坏的”（broken）或者类似的）。同样确保你的邮件发送的不是 HTML 格式。我们喜欢纯文本。HTML 被所有的 @vger.kernel.org 邮件列表拒绝。你或许需要配置你的邮箱程序不发送 HTML。</p>
<hr>
<p>via: <a href="https://lwn.net/Articles/737655/">https://lwn.net/Articles/737655/</a></p>
<p>作者：<a href="https://lwn.net/Articles/737655/">neilbrown</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
回复：块层介绍第一部分 - 块 I/O 层

## 原文链接
[https://www.zcfy.cc/article/a-block-layer-introduction-part-1-the-bio-layer](https://www.zcfy.cc/article/a-block-layer-introduction-part-1-the-bio-layer)

