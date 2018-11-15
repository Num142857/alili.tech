---
title: 如何在 Fedora 上安装 Pipenv
reprint: true
categories: reprint
abbrlink: 6b2dd12d
date: 2018-10-21 00:00:00
---

{{% raw %}}

            <h1><a href="#如何在-fedora-上安装-pipenv"></a>如何在 Fedora 上安装 Pipenv</h1>
<p>Pipenv 的目标是将打包界（bundler、composer、npm、cargo、yarn 等）最好的东西带到 Python 世界来。它试图解决一些问题，并简化整个管理过程。</p>
<p>目前，Python 程序依赖项的管理有时似乎是一个挑战。开发人员通常为每个新项目创建一个<a href="https://packaging.python.org/tutorials/installing-packages/#creating-virtual-environments">虚拟环境</a>，并使用 <a href="https://developer.fedoraproject.org/tech/languages/python/pypi-installation.html">pip</a> 将依赖项安装到其中。此外，他们必须将已安装的软件包的集合保存到 <code>requirements.txt</code> 文件中。我们看到过许多旨在自动化此工作流程的工具和包装程序。但是，仍然需要结合多个程序，并且 <code>requirements.txt</code> 格式本身并不适用于更复杂的场景。</p>
<h3><a href="#一个统治它们的工具"></a>一个统治它们的工具</h3>
<p>Pipenv 可以正确地管理复杂的相互依赖关系，它还提供已安装包的手动记录。例如，开发、测试和生产环境通常需要一组不同的包。过去，每个项目需要维护多个 <code>requirements.txt</code>。Pipenv 使用 <a href="https://github.com/toml-lang/toml">TOML</a> 语法引入了新的 <a href="https://github.com/pypa/pipfile">Pipfile</a> 格式。多亏这种格式，你终于可以在单个文件中维护不同环境的多组需求。</p>
<p>在将第一行代码提交到项目中仅一年后，Pipenv 已成为管理 Python 程序依赖关系的官方推荐工具。现在它终于在 Fedora 仓库中提供。</p>
<h3><a href="#在-fedora-上安装-pipenv"></a>在 Fedora 上安装 Pipenv</h3>
<p>在全新安装 Fedora 28 及更高版本后，你只需在终端上运行此命令即可安装 Pipenv：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo dnf install pipenv</span>

</code></pre><p>现在，你的系统已准备好在 Pipenv 的帮助下开始使用新的 Python 3 程序。</p>
<p>重要的是，虽然这个工具为程序提供了很好的解决方案，但它并不是为处理库需求而设计的。编写 Python 库时，不需要固定依赖项。你应该在 <code>setup.py</code> 文件中指定 <code>install_requires</code>。</p>
<h3><a href="#基本依赖管理"></a>基本依赖管理</h3>
<p>首先为项目创建一个目录：</p>
<pre><code class="hljs smali">$ mkdir<span class="hljs-built_in"> new-project </span>&amp;&amp; cd<span class="hljs-built_in"> new-project
</span>
</code></pre><p>接下来是为此项目创建虚拟环境：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pipenv --three</span>

</code></pre><p>这里的 <code>-three</code> 选项将虚拟环境的 Python 版本设置为 Python 3。</p>
<p>安装依赖项：</p>
<pre><code class="hljs accesslog">$ pipenv install requests
Installing requests…
Adding requests to Pipfile's <span class="hljs-string">[packages]</span>…
Pipfile.lock not found, creating…
Locking <span class="hljs-string">[dev-packages]</span> dependencies…
Locking <span class="hljs-string">[packages]</span> dependencies…

</code></pre><p>最后生成 lockfile：</p>
<pre><code class="hljs accesslog">$ pipenv lock
Locking <span class="hljs-string">[dev-packages]</span> dependencies…
Locking <span class="hljs-string">[packages]</span> dependencies…
Updated Pipfile.lock (b14837)

</code></pre><p>你还可以检查依赖关系图：</p>
<pre><code class="hljs groovy">$ pipenv graph
- certifi [<span class="hljs-string">required:</span> &gt;=<span class="hljs-number">2017.4</span><span class="hljs-number">.17</span>, <span class="hljs-string">installed:</span> <span class="hljs-number">2018.4</span><span class="hljs-number">.16</span>]
- chardet [<span class="hljs-string">required:</span> &lt;<span class="hljs-number">3.1</span><span class="hljs-number">.0</span>,&gt;=<span class="hljs-number">3.0</span><span class="hljs-number">.2</span>, <span class="hljs-string">installed:</span> <span class="hljs-number">3.0</span><span class="hljs-number">.4</span>]
- idna [<span class="hljs-string">required:</span> &lt;<span class="hljs-number">2.8</span>,&gt;=<span class="hljs-number">2.5</span>, <span class="hljs-string">installed:</span> <span class="hljs-number">2.7</span>]
- urllib3 [<span class="hljs-string">required:</span> &gt;=<span class="hljs-number">1.21</span><span class="hljs-number">.1</span>,&lt;<span class="hljs-number">1.24</span>, <span class="hljs-string">installed:</span> <span class="hljs-number">1.23</span>]

</code></pre><p>有关 Pipenv 及其命令的更多详细信息，请参见<a href="https://docs.pipenv.org/">文档</a>。</p>
<hr>
<p>via: <a href="https://fedoramagazine.org/install-pipenv-fedora/">https://fedoramagazine.org/install-pipenv-fedora/</a></p>
<p>作者：<a href="https://fedoramagazine.org/author/mcyprian/">Michal Cyprian</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-to-install-pipenv-on-fedora](https://www.zcfy.cc/article/how-to-install-pipenv-on-fedora)
原文标题: 如何在 Fedora 上安装 Pipenv
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
