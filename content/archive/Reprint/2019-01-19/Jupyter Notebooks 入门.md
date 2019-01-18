---
title: 'Jupyter Notebooks 入门' 
date: 2019-01-19 2:30:10
hidden: true
slug: iux83s5fzrb
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#jupyter-notebooks-入门"></a>Jupyter Notebooks 入门</h1>
<blockquote>
<p>通过 Jupyter 使用实时代码、方程式和可视化及文本创建交互式的共享笔记本。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/abb6726664a7214f60be61719affd812c39a8c59/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f656d61696c5f70617065725f656e76656c6f70655f646f63756d656e742e706e673f69746f6b3d75506a5f6b6f754a"><img src="https://p0.ssl.qhimg.com/t01cb1a93b990b03345.png" alt=""></a></p>
<p>自从有了纸莎草纸以来，出版人们一直在努力以吸引读者的方式来格式化数据。尤其是在数学、科学、和编程领域，设计良好的图表、插图和方程式可以成为帮助人们理解技术信息的关键。</p>
<p><a href="http://jupyter.org/">Jupyter Notebook</a> 通过重新构想我们如何制作教学文本来解决这个问题。Jupyter （我在 2017 年 10 月在 <a href="https://allthingsopen.org/">All Things Open</a> 上首次了解到）是一款开源应用程序，它使用户能够创建包含实时代码、方程式、可视化和文本的交互式共享笔记本。</p>
<p>Jupyter 从 <a href="http://ipython.org/">IPython 项目</a>发展而来，它是个具有交互式 shell 和基于浏览器的笔记本，支持代码、文本和数学表达式。Jupyter 支持超过 40 种编程语言，包括 Python、R 和 Julia，其代码可以导出为 HTML、LaTeX、PDF、图像和视频，或者作为 <a href="https://en.wikipedia.org/wiki/IPython">IPyhton</a> 笔记本与其他用户共享。</p>
<blockquote>
<p>一个有趣的事实是：“Jupyter” 是 “Julia、Python 和 R” 的缩写。</p>
</blockquote>
<p>根据 Jupyter 项目网站介绍，它的一些用途包括“数据清理和转换，数值模拟，统计建模，数据可视化，机器学习等等”。科学机构正在使用 Jupyter Notebooks 来解释研究结果。代码可以来自实际数据，可以调整和重新调整以可视化成不同的结果和情景。通过这种方式，Jupyter Notebooks 变成了生动的文本和报告。</p>
<h3><a href="#安装并开始-jupyter"></a>安装并开始 Jupyter</h3>
<p>Jupyter 软件是开源的，其授权于<a href="https://opensource.org/licenses/BSD-3-Clause">修改过的 BSD 许可证</a>，它可以<a href="http://jupyter.org/install.html">安装在 Linux、MacOS 或 Windows 上</a>。有很多种方法可以安装 Jupyter；我在 Linux 和 MacOS 上试过 PIP 和 <a href="https://www.anaconda.com/download/#linux">Anaconda</a> 安装方式。PIP 安装要求你的计算机上已经安装了 Python；Jupyter 推荐 Python 3。</p>
<p>由于 Python 3 已经安装在我的电脑上，我通过在终端（在 Linux 或 Mac 上）运行以下命令来安装 Jupyter：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> python3 -m pip install --upgrade pip</span>
<span class="hljs-meta">$</span><span class="bash"> python3 -m pip install jupyter</span>

</code></pre><p>在终端提示符输入以下命令立即启动应用程序：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> jupyter notebook</span>

</code></pre><p>很快，我的浏览器打开并显示了我在 <code>http://localhost:8888</code> 的 Jupyter Notebook 服务器。（支持的浏览器有 Google Chrome、Firefox 和 Safari）</p>
<p><a href="https://camo.githubusercontent.com/ec08c7ede1402f4a639411560871c14872a5620e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f312e706e673f69746f6b3d55794d3147755647"><img src="https://p0.ssl.qhimg.com/t0154f1f4a086a632b4.png" alt=""></a></p>
<p>在右上角有一个标有 “New” 的下拉菜单，它使我能够根据自己的指示和代码快速创建新的笔记本。请注意，我的新笔记本默认为 Python 3，这是我目前的环境。</p>
<p><a href="https://camo.githubusercontent.com/1c7c727216f360399b44e9e116fa17dec78de709/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f322e706e673f69746f6b3d616c444934333271"><img src="https://p0.ssl.qhimg.com/t0147a19a1426945007.png" alt=""></a></p>
<p>一个带有一些默认值的新笔记本，它可以被改变（包括笔记本的名字），已打开。</p>
<p><a href="https://camo.githubusercontent.com/0c965d1a6008460fa1299c529d567ad80b7f8369/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f332e706e673f69746f6b3d397a6a472d354a43"><img src="https://p0.ssl.qhimg.com/t01c9d246beba37509f.png" alt=""></a></p>
<p>笔记本有两种不同的模式：“命令模式”和“编辑模式”。命令模式允许你添加或删除单元格。你可以通过按下 <code>Escape</code> 键进入命令模式，按 <code>Enter</code> 键或单击单元格进入编辑模式。</p>
<p>单元格周围的绿色高亮显示你处于编辑模式，蓝色高亮显示你处于命令模式。以下笔记本处于命令模式并准备好执行单元中的 Python 代码。注意，我已将笔记本的名称更改为 “First Notebook”。</p>
<p><a href="https://camo.githubusercontent.com/6db6e165cfc2ed6dbca45b39f9d24f70b6d87f61/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f342e706e673f69746f6b3d2d51507863754658"><img src="https://p0.ssl.qhimg.com/t019df4bc227502790f.png" alt=""></a></p>
<h3><a href="#使用-jupyter"></a>使用 Jupyter</h3>
<p>Jupyter Notebooks 的强大之处在于除了能够输入代码之外，你还可以用 Markdown 添加叙述性和解释性文本。我想添加一个标题，所以我在代码上面添加了一个单元格，并以 Markdown 输入了一个标题。当我按下 <code>Ctrl+Enter</code> 时，我的标题转换为 HTML。（LCTT 译注：或者可以按下 Run 按钮。）</p>
<p><a href="https://camo.githubusercontent.com/a838c4fd397b39a10f4875815385b22fae26d953/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f352e706e673f69746f6b3d2d73723941382d57"><img src="https://p0.ssl.qhimg.com/t01b36c4c4e761094b0.png" alt=""></a></p>
<p>我可以通过在命令前追加 <code>!</code> 来添加 Bash 命令或脚本的输出。</p>
<p><a href="https://camo.githubusercontent.com/26f020f9d77ea66d62454f1ae6ac322b2ec4ddb5/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f362e706e673f69746f6b3d6f5f673338454370"><img src="https://p0.ssl.qhimg.com/t01b1c0d25be0c8181d.png" alt=""></a></p>
<p>我也可以利用 IPython 的 <a href="http://ipython.readthedocs.io/en/stable/interactive/magics.html">line magic 和 cell magic</a> 命令。你可以通过在代码单元内附加 <code>%</code> 或 <code>%%</code> 符号来列出魔术命令。例如，<code>%lsmagic</code> 将输出所有可用于 Jupyter notebooks 的魔法命令。</p>
<p><a href="https://camo.githubusercontent.com/6c0b79cabb72642e0089fb1c1723c83787a7460e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6a7570797465725f372e706e673f69746f6b3d7569743050744e44"><img src="https://p0.ssl.qhimg.com/t012265de81922c54eb.png" alt=""></a></p>
<p>这些魔术命令的例子包括 <code>%pwd</code>——它输出当前工作目录（例如 <code>/Users/YourName</code>）和 <code>%ls</code>——它列出当前工作目录中的所有文件和子目录。另一个神奇命令显示从笔记本中的 <code>matplotlib</code> 生成的图表。<code>%%html</code> 将该单元格中的任何内容呈现为 HTML，这对嵌入视频和链接很有用，还有 JavaScript 和 Bash 的单元魔术命令。</p>
<p>如果你需要更多关于使用 Jupyter Notebooks 和它的特性的信息，它的帮助部分是非常完整的。</p>
<p>人们用许多有趣的方式使用 Jupyter Notebooks；你可以在这个<a href="https://github.com/jupyter/jupyter/wiki/a-gallery-of-interesting-jupyter-notebooks#mathematics">展示栏目</a>里找到一些很好的例子。你如何使用 Jupyter 笔记本？请在下面的评论中分享你的想法。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/3/getting-started-jupyter-notebooks">https://opensource.com/article/18/3/getting-started-jupyter-notebooks</a></p>
<p>作者：<a href="https://opensource.com/users/don-watkins">Don Watkins</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Jupyter Notebooks 入门

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-jupyter-notebooks](https://www.zcfy.cc/article/getting-started-with-jupyter-notebooks)

