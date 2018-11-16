---
title: 3 个 Python 模板库比较
hidden: true
categories: [reprint]
slug: c2e956a5
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#3-个-python-模板库比较"></a>3 个 Python 模板库比较</h1>
<blockquote>
<p>你的下一个 Python 项目需要一个模板引擎来自动生成 HTML 吗？这有几种选择。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/9216bb5360366eb06d00409adc5e1a2a306e6c56/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6c6962726172792d6c69627261726965732d7365617263682e706e673f69746f6b3d7848387853555f47"><img src="https://p0.ssl.qhimg.com/t01cb9f8965e0ce5ccd.png" alt=""></a></p>
<p>在我的日常工作中，我花费大量的时间将各种来源的数据转化为可读的信息。虽然很多时候这只是电子表格或某种类型的图表或其他数据可视化的形式，但也有其他时候，将数据以书面形式呈现是有意义的。</p>
<p>但我的头疼地方就是复制和粘贴。如果你要将数据从源头移动到标准化模板，则不应该复制和粘贴。这很容易出错，说实话，这会浪费你的时间。</p>
<p>因此，对于我定期发送的任何遵循一个共同的模式的信息，我倾向于找到某种方法来自动化至少一部分信息。也许这涉及到在电子表格中创建一些公式，一个快速 shell 脚本或其他解决方案，以便使用从外部源提取的信息自动填充模板。</p>
<p>但最近，我一直在探索 Python 模板来完成从其他数据集创建报告和图表的大部分工作。</p>
<p>Python 模板引擎非常强大。我的简化报告创建的使用案例仅仅触及了它的皮毛。许多开发人员正在利用这些工具来构建完整的 web 应用程序和内容管理系统。但是，你并不需要有一个复杂的 web 应用程序才能使用 Python 模板工具。</p>
<h3><a href="#为什么选择模板"></a>为什么选择模板？</h3>
<p>每个模板工具都不甚相同，你应该阅读文档以了解其确切的用法。但让我们创建一个假设的例子。假设我想创建一个简短的页面，列出我最近编写的所有 Python 主题。就像这样：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>My Python articles<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>These are some of the things I have written about Python:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Python GUIs<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Python IDEs<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Python web scrapers<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>当它仅仅是这三个项目时，维护它是很简单的。但是当我想添加第四个、第五个或第六十七个时会发生什么？我可以从包含我所有页面列表的 CSV 文件或其他数据文件生成它，而不是手动编码此页面吗？我可以轻松地为我写的每个主题创建重复内容吗？我可以以编程方式更改每个页面上的文本标题吗？这就是模板引擎可以发挥作用的地方。</p>
<p>有许多不同的选择，今天我将与你其中分享三个，顺序不分先后：<a href="http://www.makotemplates.org/">Mako</a>、 <a href="http://jinja.pocoo.org/">Jinja2</a> 和 <a href="https://genshi.edgewall.org/">Genshi</a>。</p>
<h3><a href="#mako"></a>Mako</h3>
<p><a href="http://www.makotemplates.org/">Mako</a> 是以 MIT 许可证发布的 Python 模板工具，专为快速展现而设计的（与 Jinja2 不同）。Reddit 已经使用 Mako 来展现他们的网页，它同时也是 Pyramid 和 Pylons 等 web 框架的默认模板语言。它相当简单且易于使用。你可以使用几行代码来设计模板；支持 Python 2.x 和 3.x，它是一个功能强大且功能丰富的工具，具有<a href="http://docs.makotemplates.org/en/latest/">良好的文档</a>，这一点我认为是必须的。其功能包括过滤器、继承、可调用块和内置缓存系统，这些系统可以被大型或复杂的 web 项目导入。</p>
<h3><a href="#jinja2"></a>Jinja2</h3>
<p>Jinja2 是另一个快速且功能全面的选项，可用于 Python 2.x 和 3.x，遵循 BSD 许可证。Jinja2 从功能角度与 Mako 有很多重叠，因此对于新手来说，你在两者之间的选择可能会归结为你喜欢的格式化风格。Jinja2 还将模板编译为字节码，并具有 HTML 转义、沙盒、模板继承和模板沙盒部分的功能。其用户包括 Mozilla、 SourceForge、 NPR、 Instagram 等，并且还具有<a href="http://jinja.pocoo.org/docs/2.10/">强大的文档</a>。与 Mako 在模板内部使用 Python 逻辑不同的是，Jinja2 使用自己的语法。</p>
<h3><a href="#genshi"></a>Genshi</h3>
<p><a href="https://genshi.edgewall.org/">Genshi</a> 是我会提到的第三个选择。它是一个 XML 工具，具有强大的模板组件，所以如果你使用的数据已经是 XML 格式，或者你需要使用网页以外的格式，Genshi 可能成为你的一个很好的解决方案。HTML 基本上是一种 XML（好吧，不是精确的，但这超出了本文的范围，有点卖弄学问了），因此格式化它们非常相似。由于我通常使用的很多数据都是 XML 或其他类型的数据，因此我非常喜欢使用我可以用于多种事物的工具。</p>
<p>发行版目前仅支持 Python 2.x，尽管 Python 3 支持存在于主干中，但我提醒你，它看起来并没有得到有效的开发。Genshi 遵循 BSD 许可证提供。</p>
<h3><a href="#示例"></a>示例</h3>
<p>因此，在上面的假设示例中，我不会每次写新主题时都更新 HTML 文件，而是通过编程方式对其进行更新。我可以创建一个模板，如下所示：</p>
<pre><code class="hljs mojolicious"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>My Python articles<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>These are some of the things I have written about Python:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
</span><span class="perl">      %for topic in topics:</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>${topic}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
</span><span class="perl">      %endfor</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</span></code></pre><p>然后我可以使用我的模板库来迭代每个主题，比如使用 Mako，像这样：</p>
<pre><code class="hljs routeros"><span class="hljs-keyword">from</span> mako.template import Template

mytemplate = Template(<span class="hljs-attribute">filename</span>=<span class="hljs-string">'template.txt'</span>)
<span class="hljs-builtin-name">print</span>(mytemplate.render(topics=(<span class="hljs-string">"Python GUIs"</span>,<span class="hljs-string">"Python IDEs"</span>,<span class="hljs-string">"Python web scrapers"</span>)))

</code></pre><p>当然，在现实世界的用法中，我不会将这些内容手动地列在变量中，而是将它们从外部数据源（如数据库或 API）中提取出来。</p>
<p>这些不是仅有的 Python 模板引擎。如果你正在开始创建一个将大量使用模板的新项目，那么你考虑的可能不仅仅是这三种选择。在 <a href="https://wiki.python.org/moin/Templating">Python 维基</a>上查看更全面的列表，以获得更多值得考虑的项目。</p>
<hr>
<p>via: <a href="https://opensource.com/resources/python/template-libraries">https://opensource.com/resources/python/template-libraries</a></p>
<p>作者：<a href="https://opensource.com/users/jason-baker">Jason Baker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/3-python-template-libraries-compared)
原文标题: 3 个 Python 模板库比较
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
