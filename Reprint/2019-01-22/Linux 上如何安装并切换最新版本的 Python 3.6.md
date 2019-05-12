---
title: 'Linux 上如何安装并切换最新版本的 Python 3.6' 
date: 2019-01-22 2:30:08
hidden: true
slug: u6edagr7kcq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-上如何安装并切换最新版本的-python-36"></a>Linux 上如何安装并切换最新版本的 Python 3.6</h1>
<p><strong>Python</strong> 是 <a href="https://mintguide.org/">Linux</a> 中一种最流行的编程语言。它被写成了各种工具和库。除此之外，Python 在开发者之间很流行因为它非常简单，并且实际很容易掌握。如果你安装了 <a href="https://mintguide.org/">Linux mint</a> 系统，正在学习 <strong>Python</strong> 并想要使用最新的版本的话，那么这篇文章就是为你而写的。现在我已经安装好了 <a href="https://mintguide.org/">Linux Mint 18</a>。默认安装的版本是 2.7 和 3.5。你可以用这个命令检查：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> python -V</span>
<span class="hljs-meta">$</span><span class="bash"> python2 -V</span>
<span class="hljs-meta">$</span><span class="bash"> python3 -V</span>

</code></pre><p><strong>安装最新的 Python 3.6 到 Linux 中</strong>：</p>
<pre><code class="hljs smali">$ sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:jonathonf/python-3.6
$ sudo apt update
$ sudo apt install python3.6

</code></pre><p>检查已安装的 Python 3.6 版本</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> python3.6 -V</span>

</code></pre><p><strong>请注意</strong>旧版本仍然还在，它仍然可以通过 <code>python3</code> 可用，新的版本可以通过命令 <code>python3.6</code>。如果你想要默认使用这个版本而不是 3.5 运行所有的程序，这有个工具叫 <code>update-alternatives</code>。但是如果你尝试获取可能的列表，我们会得到错误：</p>
<p><a href="https://mintguide.org/uploads/posts/2017-06/1496871711_linux_mint_001.png"><img src="https://p0.ssl.qhimg.com/t01801152090f253898.png" alt="Python 3.6  - install latest version into Linux Mint"></a></p>
<p>这是正常的，你首先需要为那个问题设置文件，因为维护者没有设置这个：</p>
<pre><code class="hljs vim">$ sudo <span class="hljs-keyword">update</span>-alternatives --install /usr/bin/<span class="hljs-keyword">python3</span> <span class="hljs-keyword">python3</span> /usr/bin/<span class="hljs-keyword">python3</span>.<span class="hljs-number">5</span> <span class="hljs-number">1</span>
$ sudo <span class="hljs-keyword">update</span>-alternatives --install /usr/bin/<span class="hljs-keyword">python3</span> <span class="hljs-keyword">python3</span> /usr/bin/<span class="hljs-keyword">python3</span>.<span class="hljs-number">6</span> <span class="hljs-number">2</span>

</code></pre><p>现在再次查看：</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">update</span>-alternatives --<span class="hljs-keyword">list</span> <span class="hljs-keyword">python3</span>

</code></pre><p><a href="https://mintguide.org/uploads/posts/2017-06/1496871720_linux_mint_002.png"><img src="https://p0.ssl.qhimg.com/t01e51f577588a9191b.png" alt="Python 3.6  - install latest version into Linux Mint"></a></p>
<p>现在我们选择需要的版本并按需切换。对于设置使用配置命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo update-alternatives --config python3</span>

</code></pre><p><a href="https://mintguide.org/uploads/posts/2017-06/1496871722_linux_mint_003.png"><img src="https://p0.ssl.qhimg.com/t0108e708914010ac00.png" alt="Python 3.6  - install latest version into Linux Mint"></a></p>
<p>在提示符中，你需要指定默认使用的编号。</p>
<blockquote>
<p>选择版本时要小心，不要去动 python（python2），只使用我说的 python3，Python 2.7 编写了各种系统工具，如果你尝试用错误的解释器版本运行它们，可能就不会工作。</p>
</blockquote>
<p>愿原力与你同在，好运！！！</p>
<hr>
<p>via: <a href="https://mintguide.org/other/794-python-3-6-install-latest-version-into-linux-mint.html">https://mintguide.org/other/794-python-3-6-install-latest-version-into-linux-mint.html</a></p>
<p>作者：<a href="https://mintguide.org/user/Shekin/">Shekin</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 上如何安装并切换最新版本的 Python 3.6

## 原文链接
[https://www.zcfy.cc/article/python-3-6-install-latest-version-into-linux-mint](https://www.zcfy.cc/article/python-3-6-install-latest-version-into-linux-mint)

