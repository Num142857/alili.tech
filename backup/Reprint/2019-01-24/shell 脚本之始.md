---
title: 'shell 脚本之始' 
date: 2019-01-24 2:30:11
hidden: true
slug: vsanezs6nk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#shell-脚本之始"></a>shell 脚本之始</h1>
<p>图片引用自：<a href="https://www.flickr.com/photos/15587432@N02/3281139507/">ajmexico</a>，<a href="https://opensource.com/users/jason-baker">Jason Baker</a> 修改。 <a href="https://creativecommons.org/licenses/by/2.0/">CC BY-SA 2.0</a>。</p>
<p>世界上对 shell 脚本最好的概念性介绍来自一个老的 <a href="https://youtu.be/XvDZLjaCJuw">AT＆T 培训视频</a> 。在视频中，Brian W. Kernighan（<strong>awk</strong> 中的“K”），Lorinda L. Cherry（<strong>bc</strong> 作者之一）论证了 UNIX 的基础原则之一是让用户利用现有的实用程序来定制和创建复杂的工具。</p>
<p>用 <a href="https://youtu.be/tc4ROCJYbm0">Kernighan</a> 的话来说：“UNIX 系统程序基本上是 …… 你可以用来创造东西的构件。…… 管道的概念是 [UNIX] 系统的基础；你可以拿一堆程序 …… 并将它们端到端连接到一起，使数据从左边的一个流到右边的一个，由系统本身管着所有的连接。程序本身不知道任何关于连接的事情；对它们而言，它们只是在与终端对话。”</p>
<p>他说的是给普通用户以编程的能力。</p>
<p>POSIX 操作系统本身就像是一个 API。如果你能弄清楚如何在 POSIX 的 shell 中完成一个任务，那么你可以自动化这个任务。这就是编程，这种日常 POSIX 编程方法的主要方式就是 shell 脚本。</p>
<p>像它的名字那样，shell _脚本_ 是一行一行你想让你的计算机执行的语句，就像你手动的一样。</p>
<p>因为 shell 脚本包含常见的日常命令，所以熟悉 UNIX 或 Linux（通常称为 <strong>POSIX</strong> 系统）对 shell 是有帮助的。你使用 shell 的经验越多，就越容易编写新的脚本。这就像学习外语：你心里的词汇越多，组织复杂的句子就越容易。</p>
<p>当您打开终端窗口时，就是打开了 <em>shell</em> 。shell 有好几种，本教程适用于 <strong>bash</strong>、<strong>tcsh</strong>、<strong>ksh</strong>、<strong>zsh</strong> 和其它几个。在下面几个部分，我提供一些 bash 特定的例子，但最终的脚本不会用那些，所以你可以切换到 bash 中学习设置变量的课程，或做一些简单的<a href="http://hyperpolyglot.org/unix-shells">语法调整</a>。</p>
<p>如果你是新手，只需使用 <strong>bash</strong> 。它是一个很好的 shell，有许多友好的功能，它是 Linux、Cygwin、WSL、Mac 默认的 shell，并且在 BSD 上也支持。</p>
<h3><a href="#hello-world"></a>Hello world</h3>
<p>您可以从终端窗口生成您自己的 <strong>hello world</strong> 脚本 。注意你的引号；单和双都会有不同的效果（LCTT 译注：想必你不会在这里使用中文引号吧）。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"#\!/bin/sh"</span> &gt; hello.sh</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"echo 'hello world' "</span> &gt;&gt; hello.sh</span>

</code></pre><p>正如你所看到的，编写 shell 脚本就是这样，除了第一行之外，就是把命令“回显”或粘贴到文本文件中而已。</p>
<p>像应用程序一样运行脚本：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x hello.sh</span>
<span class="hljs-meta">$</span><span class="bash"> ./hello.sh</span>
hello world

</code></pre><p>不管多少，这就是一个 shell 脚本了。</p>
<p>现在让我们处理一些有用的东西。</p>
<h3><a href="#去除空格"></a>去除空格</h3>
<p>如果有一件事情会干扰计算机和人类的交互，那就是文件名中的空格。您在互联网上看到过：http：//example.com/omg%2ccutest%20cat%20photophoto%21%211.jpg** 等网址。或者，当你不管不顾地运行一个简单的命令时，文件名中的空格会让你掉到坑里：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> cp llama pic.jpg ~/photos
cp: cannot stat <span class="hljs-string">'llama'</span>: <span class="hljs-keyword">No</span> such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory
cp: cannot stat <span class="hljs-string">'pic.jpg'</span>: <span class="hljs-keyword">No</span> such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory

</code></pre><p>解决方案是用反斜杠来“转义”空格，或使用引号：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> touch foo\ bar.txt</span>
<span class="hljs-meta">$</span><span class="bash"> ls <span class="hljs-string">"foo bar.txt"</span></span>
foo bar.txt

</code></pre><p>这些都是要知道的重要的技巧，但是它并不方便，为什么不写一个脚本从文件名中删除这些烦人的空格？</p>
<p>创建一个文件来保存脚本，以释伴（shebang）（<strong>#!</strong>） 开头，让系统知道文件应该在 shell 中运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">'#!/bin/sh'</span> &gt; despace</span>

</code></pre><p>好的代码要从文档开始。定义好目的让我们知道要做什么。这里有一个很好的 README：</p>
<pre><code class="hljs routeros">despace is a shell<span class="hljs-built_in"> script </span><span class="hljs-keyword">for</span> removing spaces <span class="hljs-keyword">from</span> file names.

Usage:
$ despace <span class="hljs-string">"foo bar.txt"</span>

</code></pre><p>现在让我们弄明白如何手动做，并且如何去构建脚本。</p>
<p>假设你有个只有一个 "foo bar.txt" 文件的目录，比如：</p>
<pre><code class="hljs stylus">$ ls
hello<span class="hljs-selector-class">.sh</span>
foo bar<span class="hljs-selector-class">.txt</span>

</code></pre><p>计算机无非就是输入和输出而已。在这种情况下，输入是 <code>ls</code> 特定目录的请求。输出是您所期望的结果：该目录文件的名称。</p>
<p>在 UNIX 中，可以通过“管道”将输出作为另一个命令的输入，无论在管道的另一侧是什么过滤器。 <code>tr</code> 程序恰好设计为专门修改传输给它的字符串；对于这个例子，可以使用 <code>--delete</code> 选项删除引号中定义的字符。</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">ls</span> <span class="hljs-string">"foo bar.txt"</span> | <span class="hljs-keyword">tr</span> --<span class="hljs-keyword">delete</span> <span class="hljs-string">' '</span>
foobar.txt

</code></pre><p>现在你得到了所需的输出了。</p>
<p>在 BASH shell 中，您可以将输出存储为<strong>变量</strong> 。变量可以视为将信息存储到其中的空位：</p>
<pre><code class="hljs routeros">$ <span class="hljs-attribute">NAME</span>=foo

</code></pre><p>当您需要返回信息时，可以通过在变量名称前面缀上美元符号（<strong>$</strong> ）来引用该位置。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span></span>
foo

</code></pre><p>要获得您的这个去除空格后的输出并将其放在一边供以后使用，请使用一个变量。将命令的_结果_放入变量，使用反引号（`）来完成：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> NAME=`ls <span class="hljs-string">"foo bar.txt"</span> | tr -d <span class="hljs-string">' '</span>`</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span></span>
foobar.txt

</code></pre><p>我们完成了一半的目标，现在可以从源文件名确定目标文件名了。</p>
<p>到目前为止，脚本看起来像这样：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
NAME=`ls <span class="hljs-string">"foo bar.txt"</span> | tr -d <span class="hljs-string">' '</span>`
<span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span>

</code></pre><p>第二部分必须执行重命名操作。现在你可能已经知道这个命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mv <span class="hljs-string">"foo bar.txt"</span> foobar.txt</span>

</code></pre><p>但是，请记住在脚本中，您正在使用一个变量来保存目标名称。你已经知道如何引用变量：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
NAME=`ls <span class="hljs-string">"foo bar.txt"</span> | tr -d <span class="hljs-string">' '</span>`
<span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span>
mv <span class="hljs-string">"foo bar.txt"</span> <span class="hljs-variable">$NAME</span>

</code></pre><p>您可以将其标记为可执行文件并在测试目录中运行它。确保您有一个名为 foo bar.txt（或您在脚本中使用的其它名字）的测试文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> touch <span class="hljs-string">"foo bar.txt"</span></span>
<span class="hljs-meta">$</span><span class="bash"> chmod +x despace</span>
<span class="hljs-meta">$</span><span class="bash"> ./despace</span>
foobar.txt
<span class="hljs-meta">$</span><span class="bash"> ls</span>
foobar.txt

</code></pre><h3><a href="#去除空格-v20"></a>去除空格 v2.0</h3>
<p>脚本可以正常工作，但不完全如您的文档所述。它目前非常具体，只适用于一个名为 <code>foo\ bar.txt</code> 的文件，其它都不适用。</p>
<p>POSIX 命令会将其命令自身称为 <code>$0</code>，并将其后键入的任何内容依次命名为 <code>$1</code>，<code>$2</code>，<code>$3</code> 等。您的 shell 脚本作为 POSIX 命令也可以这样计数，因此请尝试用 <code>$1</code> 来替换 <code>foo\ bar.txt</code> 。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
NAME=`ls <span class="hljs-variable">$1</span> | tr -d <span class="hljs-string">' '</span>`
<span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span>
mv <span class="hljs-variable">$1</span> <span class="hljs-variable">$NAME</span>

</code></pre><p>创建几个新的测试文件，在名称中包含空格：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> touch <span class="hljs-string">"one two.txt"</span></span>
<span class="hljs-meta">$</span><span class="bash"> touch <span class="hljs-string">"cat dog.txt"</span></span>

</code></pre><p>然后测试你的新脚本：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> ./despace <span class="hljs-string">"one two.txt"</span>
ls: cannot access <span class="hljs-string">'one'</span>: <span class="hljs-keyword">No</span> such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory
ls: cannot access <span class="hljs-string">'two.txt'</span>: <span class="hljs-keyword">No</span> such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory

</code></pre><p>看起来您发现了一个 bug！</p>
<p>这实际上不是一个 bug，一切都按设计工作，但不是你想要的。你的脚本将 <code>$1</code> 变量真真切切地 “扩展” 成了：“one two.txt”，捣乱的就是你试图消除的那个麻烦的空格。</p>
<p>解决办法是将变量用以引号封装文件名的方式封装变量：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
NAME=`ls <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> | tr -d <span class="hljs-string">' '</span>`
<span class="hljs-built_in">echo</span> <span class="hljs-variable">$NAME</span>
mv <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> <span class="hljs-variable">$NAME</span>

</code></pre><p>再做个测试：</p>
<pre><code class="hljs stylus">$ ./despace <span class="hljs-string">"one two.txt"</span>
onetwo<span class="hljs-selector-class">.txt</span>
$ ./despace c*g<span class="hljs-selector-class">.txt</span>
catdog<span class="hljs-selector-class">.txt</span>

</code></pre><p>此脚本的行为与任何其它 POSIX 命令相同。您可以将其与其他命令结合使用，就像您希望的使用的任何 POSIX 程序一样。您可以将其与命令结合使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> find ~/test0 -<span class="hljs-built_in">type</span> f -<span class="hljs-built_in">exec</span> /path/to/despace {} \;</span>

</code></pre><p>或者你可以使用它作为循环的一部分：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">for</span> FILE <span class="hljs-keyword">in</span> ~/test1/* ; <span class="hljs-keyword">do</span> /path/to/despace <span class="hljs-variable">$FILE</span> ; <span class="hljs-keyword">done</span></span>

</code></pre><p>等等。</p>
<h3><a href="#去除空格-v25"></a>去除空格 v2.5</h3>
<p>这个去除脚本已经可以发挥功用了，但在技术上它可以优化，它可以做一些可用性改进。</p>
<p>首先，变量实际上并不需要。 shell 可以一次计算所需的信息。</p>
<p>POSIX shell 有一个操作顺序。在数学中使用同样的方式来首先处理括号中的语句，shell 在执行命令之前会先解析反引号或 Bash 中的 <code>$()</code> 。因此，下列语句：</p>
<pre><code class="hljs clean">$ mv foo\ bar.txt `ls foo\ bar.txt | tr -d <span class="hljs-string">' '</span>`

</code></pre><p>会变换成：</p>
<pre><code class="hljs stylus">$ mv foo\ bar<span class="hljs-selector-class">.txt</span> foobar<span class="hljs-selector-class">.txt</span>

</code></pre><p>然后实际的 <code>mv</code> 命令执行，就得到了 <strong>foobar.txt</strong> 文件。</p>
<p>知道这一点，你可以将该 shell 脚本压缩成：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
mv <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> `ls <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> | tr -d <span class="hljs-string">' '</span>`

</code></pre><p>这看起来简单的令人失望。你可能认为它使脚本减少为一个单行并没有必要，但没有几行的 shell 脚本是有意义的。即使一个用简单的命令写的紧缩的脚本仍然可以防止你发生致命的打字错误，这在涉及移动文件时尤其重要。</p>
<p>此外，你的脚本仍然可以改进。更多的测试发现了一些弱点。例如，运行没有参数的 <code>despace</code> 会产生一个没有意义的错误：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> ./despace
ls: cannot access <span class="hljs-string">''</span>: <span class="hljs-keyword">No</span> such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory

mv: missing destination <span class="hljs-keyword">file</span> operand after <span class="hljs-string">''</span>
Try <span class="hljs-string">'mv --help'</span> <span class="hljs-keyword">for</span> more information.

</code></pre><p>这些错误是让人迷惑的，因为它们是针对 <code>ls</code> 和 <code>mv</code> 发出的，但就用户所知，它运行的不是 <code>ls</code> 或 <code>mv</code>，而是 <code>despace</code> 。</p>
<p>如果你想一想，如果它没有得到一个文件作为命令的一部分，这个小脚本甚至不应该尝试去重命名文件，请尝试使用你知道的变量以及 <code>test</code> 功能来解决。</p>
<h3><a href="#if-和-test"></a>if 和 test</h3>
<p><code>if</code> 语句将把你的小 despace 实用程序从脚本蜕变成程序。这里面涉及到代码领域，但不要担心，它也很容易理解和使用。</p>
<p><code>if</code> 语句是一种开关；如果某件事情是真的，那么你会做一件事，如果它是假的，你会做不同的事情。这个 <code>if-then</code> 指令的二分决策正好是计算机是擅长的；你需要做的就是为计算机定义什么是真或假以及并最终执行什么。</p>
<p>测试真或假的最简单的方法是 <code>test</code> 实用程序。你不用直接调用它，使用它的语法即可。在终端试试：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">if</span> [ 1 == 1 ]; <span class="hljs-keyword">then</span> <span class="hljs-built_in">echo</span> <span class="hljs-string">"yes, true, affirmative"</span>; <span class="hljs-keyword">fi</span></span>
yes, true, affirmative
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">if</span> [ 1 == 123 ]; <span class="hljs-keyword">then</span> <span class="hljs-built_in">echo</span> <span class="hljs-string">"yes, true, affirmative"</span>; <span class="hljs-keyword">fi</span></span>
<span class="hljs-meta">$</span><span class="bash"></span>

</code></pre><p>这就是 <code>test</code> 的工作方式。你有各种方式的简写可供选择，这里使用的是 <code>-z</code> 选项，它检测字符串的长度是否为零（0）。将这个想法翻译到你的 despace 脚本中就是：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
<span class="hljs-keyword">if</span> [ -z <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> ]; <span class="hljs-keyword">then</span>
   <span class="hljs-built_in">echo</span> <span class="hljs-string">"Provide a \"file name\", using quotes to nullify the space."</span>
   <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>

mv <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> `ls <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> | tr -d <span class="hljs-string">' '</span>`

</code></pre><p>为了提高可读性，<code>if</code> 语句被放到单独的行，但是其概念仍然是：如果 <code>$1</code> 变量中的数据为空（零个字符存在），则打印一个错误语句。</p>
<p>尝试一下：</p>
<pre><code class="hljs livecodeserver">$ ./despace
Provide <span class="hljs-keyword">a</span> <span class="hljs-string">"file name"</span>, <span class="hljs-keyword">using</span> quotes <span class="hljs-built_in">to</span> nullify <span class="hljs-keyword">the</span> <span class="hljs-literal">space</span>.
$

</code></pre><p>成功！</p>
<p>好吧，其实这是一个失败，但它是一个<em>漂亮的</em>失败，更重要的是，一个<em>有意义</em>的失败。</p>
<p>注意语句 <code>exit 1</code> 。这是 POSIX 应用程序遇到错误时向系统发送警报的一种方法。这个功能对于需要在脚本中使用 despace ，并依赖于它成功执行才能顺利运行的你或其它人来说很重要。</p>
<p>最后的改进是添加一些东西，以保护用户不会意外覆盖文件。理想情况下，您可以将此选项传递给脚本，所以它是可选的；但为了简单起见，这里对其进行了硬编码。 <code>-i</code> 选项告诉 <code>mv</code> 在覆盖已存在的文件之前请求许可：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh
</span>
<span class="hljs-keyword">if</span> [ -z <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> ]; <span class="hljs-keyword">then</span>
   <span class="hljs-built_in">echo</span> <span class="hljs-string">"Provide a \"file name\", using quotes to nullify the space."</span>
   <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>

mv -i <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> `ls <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> | tr -d <span class="hljs-string">' '</span>`

</code></pre><p>现在你的 shell 脚本是有意义的、有用的、友好的 - 你是一个程序员了，所以不要停。学习新命令，在终端中使用它们，记下您的操作，然后编写脚本。最终，你会把自己从工作中解脱出来，当你的机器仆人运行 shell 脚本，接下来的生活将会轻松。</p>
<p>Happy hacking！</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/103cc830a68e5d2e028870667c66caa962020c4c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70726f66696c655f70696374757265732f7075626c69632f70656e6775696e6d6564616c6c696f6e323030783230302e706e673f69746f6b3d524f51535235304a"><img src="https://p5.ssl.qhimg.com/t01fe9553b18a6b1876.png" alt=""></a></p>
<p>Seth Kenlon 是一位独立的多媒体艺术家，自由文化倡导者和 UNIX 极客。他是基于 Slackware 的多媒体制作项目（<a href="http://slackermedia.ml%EF%BC%89%E7%9A%84%E7%BB%B4%E6%8A%A4%E8%80%85%E4%B9%8B%E4%B8%80">http://slackermedia.ml）的维护者之一</a></p>
<hr>
<p>via: <a href="https://opensource.com/article/17/1/getting-started-shell-scripting">https://opensource.com/article/17/1/getting-started-shell-scripting</a></p>
<p>作者：<a href="https://opensource.com/users/seth">Seth Kenlon</a> 译者：<a href="https://github.com/hkurj">hkurj</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
shell 脚本之始

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-shell-scripting](https://www.zcfy.cc/article/getting-started-with-shell-scripting)

