---
title: '如何使用 CGI 脚本生成网页' 
date: 2019-01-20 2:30:11
hidden: true
slug: pxbew2hunf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-cgi-脚本生成网页"></a>如何使用 CGI 脚本生成网页</h1>
<blockquote>
<p>通用网关接口（CGI）提供了使用任何语言生成动态网站的简易方法。</p>
</blockquote>
<p>回到互联网的开端，当我第一次创建了我的第一个商业网站，生活是如此的美好。</p>
<p>我安装 Apache 并写了一些简单的 HTML 网页，网页上列出了一些关于我的业务的重要信息，比如产品概览以及如何联系我。这是一个静态网站，因为内容很少改变。由于网站的内容很少发生改变这一性质，因此维护起来也很简单。</p>
<h3><a href="#静态内容"></a>静态内容</h3>
<p>静态内容很简单，同时也很常见。让我们快速的浏览一些静态网页的例子。你不需要一个可运行网站来执行这些小实验，只需要把这些文件放到家目录，然后使用浏览器打开。你所看到的内容将和通过 Web 服务器提供这一文件看到的内容一样。</p>
<p>对于一个静态网站，你需要的第一件东西就是 <code>index.html</code> 文件，该文件通常放置在 <code>/var/www/html</code> 目录下。这个文件的内容可以非常简单，比如可以是像 “Hello, world” 这样一句短文本，没有任何 HTML 标记。它将简单的展示文本串内容。在你的家目录创建 <code>index.html</code> 文件，并添加 “hello, world” 作为内容（不需要引号）。在浏览器中通过下面的链接来打开这一文件：</p>
<pre><code class="hljs cs">file:<span class="hljs-comment"><span class="hljs-doctag">///</span>home/<span class="hljs-doctag">&lt;你的家目录&gt;</span>/index.html</span>

</code></pre><p>所以 HTML 不是必须的，但是，如果你有大量需要格式化的文本，那么，不用 HTML 编码的网页的结果将会令人难以理解。</p>
<p>所以，下一步就是通过使用一些 HTML 编码来提供格式化，从而使内容更加可读。下面这一命令创建了一个具有 HTML 静态网页所需要的绝对最小标记的页面。你也可以使用你最喜欢的编辑器来创建这一内容。</p>
<pre><code class="hljs stylus">echo <span class="hljs-string">"&lt;h1&gt;Hello World&lt;/h1&gt;"</span> &gt; test1<span class="hljs-selector-class">.html</span>

</code></pre><p>现在，再次查看 <code>index.html</code> 文件，将会看到和刚才有些不同。</p>
<p>当然，你可以在实际的内容行上添加大量的 HTML 标记，以形成更加完整和标准的网页。下面展示的是更加完整的版本，尽管在浏览器中会看到同样的内容，但这也为更加标准化的网站奠定了基础。继续在 <code>index.html</code> 中写入这些内容并通过浏览器查看。</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE HTML PUBLIC "-//w3c//DD HTML 4.0//EN"&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>My Web Page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>我使用这些技术搭建了一些静态网站，但我的生活正在改变。</p>
<h3><a href="#动态网页"></a>动态网页</h3>
<p>我找了一份新工作，这份工作的主要任务就是创建并维护用于一个动态网站的 CGI（<a href="https://en.wikipedia.org/wiki/Common_Gateway_Interface">公共网关接口</a>Common Gateway InterfaceM）代码。字面意思来看，动态意味着在浏览器中生成的网页所需要的 HTML 是由每次访问页面时不同的数据所生成的。这些数据包括网页表单中的用户输入，以用来在数据库中进行数据查找，结果数据被一些恰当的 HTML 包围着并展示在所请求的浏览器中。但是这不需要非常复杂。</p>
<p>通过使用 CGI 脚本，你可以创建一些简单或复杂的交互式程序，通过运行这些程序能够生成基于输入、计算、服务器的当前条件等改变的动态页面。有许多种语言可以用来写 CGI 脚本，在这篇文章中，我将谈到的是 Perl 和 Bash ，其他非常受欢迎的 CGI 语言包括 PHP 和 Python 。</p>
<p>这篇文章不会介绍 Apache 或其他任何 web 服务器的安装和配置。如果你能够访问一个你可以进行实验的 Web 服务器，那么你可以直接查看它们在浏览器中出现的结果。否则，你可以在命令行中运行程序来查看它们所创建的 HTML 文本。你也可以重定向 HTML 输出到一个文件中，然后通过浏览器查看结果文件。</p>
<h3><a href="#使用-perl"></a>使用 Perl</h3>
<p>Perl 是一门非常受欢迎的 CGI 脚本语言，它的优势是强大的文本操作能力。</p>
<p>为了使 CGI 脚本可执行，你需要在你的网站的 <code>httpd.conf</code> 中添加下面这行内容。这会告诉服务器可执行 CGI 文件的位置。在这次实验中，不必担心这个问题。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">ScriptAlias</span> /cgi-<span class="hljs-keyword">bin/ </span><span class="hljs-string">"/var/www/cgi-bin/"</span>

</code></pre><p>把下面的 Perl 代码添加到文件 <code>index.cgi</code>，在这次实验中，这个文件应该放在你的家目录下。如果你使用 Web 服务器，那么应把文件的所有者更改为 <code>apache.apache</code>，同时将文件权限设置为 755，因为无论位于哪，它必须是可执行的。</p>
<pre><code class="hljs routeros"><span class="hljs-comment">#!/usr/bin/perl</span>
<span class="hljs-builtin-name">print</span> <span class="hljs-string">"Content-type: text/html\n\n"</span>;
<span class="hljs-builtin-name">print</span> <span class="hljs-string">"&lt;html&gt;&lt;body&gt;\n"</span>;
<span class="hljs-builtin-name">print</span> <span class="hljs-string">"&lt;h1&gt;Hello World&lt;/h1&gt;\n"</span>;
<span class="hljs-builtin-name">print</span> <span class="hljs-string">"Using Perl&lt;p&gt;\n"</span>;
<span class="hljs-builtin-name">print</span> <span class="hljs-string">"&lt;/body&gt;&lt;/html&gt;\n"</span>;

</code></pre><p>在命令行中运行这个程序并查看结果，它将会展示出它所生成的 HTML 内容</p>
<p>现在，在浏览器中查看 <code>index.cgi</code> 文件，你所看到的只是文件的内容。浏览器需要将它看做 CGI 内容，但是，Apache 不知道需要将这个文件作为 CGI 程序运行，除非 Apache 的配置中包括上面所展示的 <code>ScriptAlias</code> 定义。没有这一配置，Apache 只会简单地将文件中的数据发送给浏览器。如果你能够访问 Web 服务器，那么你可以将可执行文件放到 <code>/var/www/cgi-bin</code> 目录下。</p>
<p>如果想知道这个脚本的运行结果在浏览器中长什么样，那么，重新运行程序并把输出重定向到一个新文件，名字可以是任何你想要的。然后使用浏览器来查看这一文件，它包含了脚本所生成的内容。</p>
<p>上面这个 CGI 程序依旧生成静态内容，因为它总是生成相同的输出。把下面这行内容添加到 CGI 程序中 “Hello, world” 这一行后面。Perl 的 <code>system</code> 命令将会执行跟在它后面的 shell 命令，并把结果返回给程序。此时，我们将会通过 <code>free</code> 命令获得当前的内存使用量。</p>
<pre><code class="hljs abnf">system <span class="hljs-string">"free | grep Mem\n"</span><span class="hljs-comment">;</span>

</code></pre><p>现在，重新运行这个程序，并把结果重定向到一个文件，在浏览器中重新加载这个文件。你将会看到额外的一行，它展示了系统的内存统计数据。多次运行程序并刷新浏览器，你将会发现，内存使用量应该是不断变化的。</p>
<h3><a href="#使用-bash"></a>使用 Bash</h3>
<p>Bash 可能是用于 CGI 脚本中最简单的语言。用 Bash 来进行 CGI 编程的最大优势是它能够直接访问所有的标准 GNU 工具和系统程序。</p>
<p>把已经存在的 <code>index.cgi</code> 文件重命名为 <code>Perl.index.cgi</code>，然后创建一个新的 `index.cgi 文件并添加下面这些内容。记得设置权限使它可执行。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"Content-type: text/html"</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">""</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;html&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;head&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;title&gt;Hello World&lt;/title&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;/head&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;body&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;&lt;p&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'Using Bash&lt;p&gt;'</span>
free | grep Mem
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;/body&gt;'</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'&lt;/html&gt;'</span>
<span class="hljs-built_in">exit</span> 0

</code></pre><p>在命令行中执行这个文件并查看输出，然后再次运行并把结果重定向到一个临时结果文件中。然后，刷新浏览器查看它所展示的网页是什么样子。</p>
<h3><a href="#结论"></a>结论</h3>
<p>创建能够生成许多种动态网页的 CGI 程序实际上非常简单。尽管这是一个很简单的例子，但是现在你应该看到一些可能性了。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/12/cgi-scripts">https://opensource.com/article/17/12/cgi-scripts</a></p>
<p>作者：<a href="https://opensource.com/users/dboth">David Both</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 CGI 脚本生成网页

## 原文链接
[https://www.zcfy.cc/article/how-to-generate-webpages-using-cgi-scripts](https://www.zcfy.cc/article/how-to-generate-webpages-using-cgi-scripts)

