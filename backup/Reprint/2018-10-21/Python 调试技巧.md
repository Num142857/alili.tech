---
title: Python 调试技巧
hidden: true
categories: [reprint]
slug: c317b289
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#python-调试技巧"></a>Python 调试技巧</h1>
<p>当进行调试时，你有很多选择，但是很难给出一直有效的通用建议（除了“你试过关闭再打开么？”以外）。</p>
<p>这里有一些我最喜欢的 Python 调试技巧。</p>
<h3><a href="#建立一个分支"></a>建立一个分支</h3>
<p>请相信我。即使你从来没有打算将修改提交回上游，你也会很乐意将你的实验被包含在它们自己的分支中。</p>
<p>不说别的，它会使清理更容易！</p>
<h3><a href="#安装-pdb"></a>安装 pdb++</h3>
<p>认真地说，如果你使用命令行，它会让你的生活更轻松。</p>
<p>pdb++ 所做的一切就是用更好的模块替换标准的 pdb 模块。以下是你在 <code>pip install pdbpp</code> 会看到的：</p>
<ul>
<li>彩色提示！</li>
<li>制表符补全！（非常适合探索！）</li>
<li>支持切分！</li>
</ul>
<p>好的，也许最后一个是有点多余……但是非常认真地说，安装 pdb++ 非常值得。</p>
<h3><a href="#探索"></a>探索</h3>
<p>有时候最好的办法就是胡乱试试，然后看看会发生什么。在“明显”的位置放置一个断点并确保它被命中。在代码中加入 <code>print()</code> 和/或 <code>logging.debug()</code> 语句，并查看代码执行的位置。</p>
<p>检查传递给你的函数的参数，检查库的版本（如果你已经非常绝望了）。</p>
<h3><a href="#一次只能改变一件事"></a>一次只能改变一件事</h3>
<p>在你在探索了一下后，你将会对你可以做的事情有所了解。但在你开始摆弄代码之前，先退一步，考虑一下你可以改变什么，然后只改变一件事。</p>
<p>做出改变后，然后测试一下，看看你是否接近解决问题。如果没有，请将它改回来，然后尝试其他方法。</p>
<p>只更改一件事就可以让你知道什可以工作，哪些不工作。另外，一旦可以工作后，你的新提交将会小得多（因为将有更少的变化）。</p>
<p>这几乎是科学过程Scientific Process中所做的事情：一次只更改一个变量。通过让自己看到并衡量一次更改的结果，你可以节省你的理智，并更快地找到解决方案。</p>
<h3><a href="#不要假设提出问题"></a>不要假设，提出问题</h3>
<p>偶尔一个开发人员（当然不是你咯！）会匆忙提交一些有问题的代码。当你去调试这段代码时，你需要停下来，并确保你明白它想要完成什么。</p>
<p>不要做任何假设。仅仅因为代码在 <code>model.py</code> 文件中并不意味着它不会尝试渲染一些 HTML。</p>
<p>同样，在做任何破坏性的事情之前，仔细检查你的所有外部关联。要删除一些配置数据？<strong>请确保你没有连接到你的生产系统。</strong></p>
<h3><a href="#聪明但不要聪明过头"></a>聪明，但不要聪明过头</h3>
<p>有时候我们编写的代码神奇般地奏效，不知道它是如何做的。</p>
<p>当我们发布代码时，我们可能会觉得自己很聪明，但当代码崩溃时，我们往往会感到愚蠢，我们必须记住它是如何工作的，以便弄清楚它为什么不起作用。</p>
<p>留意任何看起来过于复杂、冗长或极短的代码段。这些可能是隐藏复杂并导致错误的地方。</p>
<hr>
<p>via: <a href="https://pythondebugging.com/articles/python-debugging-tips">https://pythondebugging.com/articles/python-debugging-tips</a></p>
<p>作者：<a href="https://pythondebugging.com">PythonDebugging.com</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [Python 调试技巧](https://www.zcfy.cc/article/python-debugging-tips)
原文标题: Python 调试技巧
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
