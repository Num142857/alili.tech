---
title: 你所不了解的 Bash：关于 Bash 数组的介绍
hidden: true
categories: reprint
slug: 6df83367
date: 2018-10-20 00:00:00
---

{{< raw >}}

            <h1><a href="#你所不了解的-bash关于-bash-数组的介绍"></a>你所不了解的 Bash：关于 Bash 数组的介绍</h1>
<blockquote>
<p>进入这个古怪而神奇的 Bash 数组的世界。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/22df3da6f7f8565f8f39ba6538436f7514d2cf94/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f70726f6772616d6d696e672d636f64652d6b6579626f6172642d6c6170746f702e706e673f69746f6b3d7047664566753253"><img src="https://p0.ssl.qhimg.com/t017c72acc0ca464881.png" alt=""></a></p>
<p>尽管软件工程师常常使用命令行来进行各种开发，但命令行中的数组似乎总是一个模糊的东西（虽然不像正则操作符 <code>=~</code> 那么复杂隐晦）。除开隐晦和有疑问的语法，<a href="https://opensource.com/article/17/7/bash-prompt-tips-and-tricks">Bash</a> 数组其实是非常有用的。</p>
<h3><a href="#稍等这是为什么"></a>稍等，这是为什么？</h3>
<p>写 Bash 相关的东西很难，但如果是写一篇像手册那样注重怪异语法的文章，就会非常简单。不过请放心，这篇文章的目的就是让你不用去读该死的使用手册。</p>
<h4><a href="#真实通常是有用的示例"></a>真实（通常是有用的）示例</h4>
<p>为了这个目的，想象一下真实世界的场景以及 Bash 是怎么帮忙的：你正在公司里面主导一个新工作，评估并优化内部数据管线的运行时间。首先，你要做个参数扫描分析来评估管线使用线程的状况。简单起见，我们把这个管道当作一个编译好的 C++ 黑盒子，这里面我们能够调整的唯一的参数是用于处理数据的线程数量：<code>./pipeline --threads 4</code>。</p>
<h3><a href="#基础"></a>基础</h3>
<p>我们首先要做的事是定义一个数组，用来容纳我们想要测试的 <code>--threads</code> 参数：</p>
<pre><code class="hljs lsl">allThreads=(<span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">4</span> <span class="hljs-number">8</span> <span class="hljs-number">16</span> <span class="hljs-number">32</span> <span class="hljs-number">64</span> <span class="hljs-number">128</span>)

</code></pre><p>本例中，所有元素都是数字，但参数并不一定是数字，Bash 中的数组可以容纳数字和字符串，比如 <code>myArray=(1 2 "three" 4 "five")</code> 就是个有效的表达式。就像 Bash 中其它的变量一样，确保赋值符号两边没有空格。否则 Bash 将会把变量名当作程序来执行，把 <code>=</code> 当作程序的第一个参数。</p>
<p>现在我们初始化了数组，让我们解析它其中的一些元素。仅仅输入 <code>echo $allThreads</code> ，你能发现，它只会输出第一个元素。</p>
<p>要理解这个产生的原因，需要回到上一步，回顾我们一般是怎么在 Bash 中输出变量。考虑以下场景：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">type</span>=<span class="hljs-string">"article"</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"Found 42 <span class="hljs-variable">$type</span>"</span>

</code></pre><p>假如我们得到的变量 <code>$type</code> 是一个单词，我们想要添加在句子结尾一个 <code>s</code>。我们无法直接把 <code>s</code> 加到 <code>$type</code> 里面，因为这会把它变成另一个变量，<code>$types</code>。尽管我们可以利用像 <code>echo "Found 42 "$type"s"</code> 这样的代码形变，但解决这个问题的最好方法是用一个花括号：<code>echo "Found 42 ${type}s"</code>，这让我们能够告诉 Bash 变量名的起止位置（有趣的是，JavaScript/ES6 在 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">template literals</a> 中注入变量和表达式的语法和这里是一样的）</p>
<p>事实上，尽管 Bash 变量一般不用花括号，但在数组中需要用到花括号。这反而允许我们指定要访问的索引，例如 <code>echo ${allThreads[1]}</code> 返回的是数组中的第二个元素。如果不写花括号，比如 <code>echo $allThreads[1]</code>，会导致 Bash 把 <code>[1]</code> 当作字符串然后输出。</p>
<p>是的，Bash 数组的语法很怪，但是至少他们是从 0 开始索引的，不像有些语言（说的就是你，<code>R</code> 语言）。</p>
<h3><a href="#遍历数组"></a>遍历数组</h3>
<p>上面的例子中我们直接用整数作为数组的索引，我们现在考虑两种其他情况：第一，如果想要数组中的第 <code>$i</code> 个元素，这里 <code>$i</code> 是一个代表索引的变量，我们可以这样 <code>echo ${allThreads[$i]}</code> 解析这个元素。第二，要输出一个数组的所有元素，我们把数字索引换成 <code>@</code> 符号（你可以把 <code>@</code> 当作表示 <code>all</code> 的符号）：<code>echo ${allThreads[@]}</code>。</p>
<h4><a href="#遍历数组元素"></a>遍历数组元素</h4>
<p>记住上面讲过的，我们遍历 <code>$allThreads</code> 数组，把每个值当作 <code>--threads</code> 参数启动管线：</p>
<pre><code class="hljs bash"><span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> <span class="hljs-variable">${allThreads[@]}</span>; <span class="hljs-keyword">do</span>
  ./pipeline --threads <span class="hljs-variable">$t</span>
<span class="hljs-keyword">done</span>

</code></pre><h4><a href="#遍历数组索引"></a>遍历数组索引</h4>
<p>接下来，考虑一个稍稍不同的方法。不遍历所有的数组元素，我们可以遍历所有的索引：</p>
<pre><code class="hljs bash"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-variable">${!allThreads[@]}</span>; <span class="hljs-keyword">do</span>
  ./pipeline --threads <span class="hljs-variable">${allThreads[$i]}</span>
<span class="hljs-keyword">done</span>

</code></pre><p>一步一步看：如之前所见，<code>${allThreads[@]}</code> 表示数组中的所有元素。前面加了个感叹号，变成 <code>${!allThreads[@]}</code>，这会返回数组索引列表（这里是 0 到 7）。换句话说。<code>for</code> 循环就遍历所有的索引 <code>$i</code> 并从 <code>$allThreads</code> 中读取第 <code>$i</code> 个元素，当作 <code>--threads</code> 选项的参数。</p>
<p>这看上去很辣眼睛，你可能奇怪为什么我要一开始就讲这个。这是因为有时候在循环中需要同时获得索引和对应的值，例如，如果你想要忽视数组中的第一个元素，使用索引可以避免额外创建在循环中累加的变量。</p>
<h3><a href="#填充数组"></a>填充数组</h3>
<p>到目前为止，我们已经能够用给定的 <code>--threads</code> 选项启动管线了。现在假设按秒计时的运行时间输出到管线。我们想要捕捉每个迭代的输出，然后把它保存在另一个数组中，因此我们最终可以随心所欲的操作它。</p>
<h4><a href="#一些有用的语法"></a>一些有用的语法</h4>
<p>在深入代码前，我们要多介绍一些语法。首先，我们要能解析 Bash 命令的输出。用这个语法可以做到：<code>output=$( ./my_script.sh )</code>，这会把命令的输出存储到变量 <code>$output</code> 中。</p>
<p>我们需要的第二个语法是如何把我们刚刚解析的值添加到数组中。完成这个任务的语法看起来很熟悉：</p>
<pre><code class="hljs makefile">myArray+=( <span class="hljs-string">"newElement1"</span> <span class="hljs-string">"newElement2"</span> )

</code></pre><h4><a href="#参数扫描"></a>参数扫描</h4>
<p>万事具备，执行参数扫描的脚步如下：</p>
<pre><code class="hljs lsl">allThreads=(<span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">4</span> <span class="hljs-number">8</span> <span class="hljs-number">16</span> <span class="hljs-number">32</span> <span class="hljs-number">64</span> <span class="hljs-number">128</span>)
allRuntimes=()
for t in ${allThreads[@]}; do
  runtime=$(./pipeline --threads $t)
  allRuntimes+=( $runtime )
done

</code></pre><p>就是这个了！</p>
<h3><a href="#还有什么能做的"></a>还有什么能做的？</h3>
<p>这篇文章中，我们讲过使用数组进行参数扫描的场景。我敢保证有很多理由要使用 Bash 数组，这里就有两个例子：</p>
<h4><a href="#日志警告"></a>日志警告</h4>
<p>本场景中，把应用分成几个模块，每一个都有它自己的日志文件。我们可以编写一个 cron 任务脚本，当某个模块中出现问题标志时向特定的人发送邮件：</p>
<pre><code class="hljs perl"><span class="hljs-comment"># 日志列表，发生问题时应该通知的人</span>
logPaths=(<span class="hljs-string">"api.log"</span> <span class="hljs-string">"auth.log"</span> <span class="hljs-string">"jenkins.log"</span> <span class="hljs-string">"data.log"</span>)
logEmails=(<span class="hljs-string">"jay@email"</span> <span class="hljs-string">"emma@email"</span> <span class="hljs-string">"jon@email"</span> <span class="hljs-string">"sophia@email"</span>)

<span class="hljs-comment"># 在每个日志中查找问题标志</span>
<span class="hljs-keyword">for</span> i in ${!logPaths[@]};
<span class="hljs-keyword">do</span>
  <span class="hljs-keyword">log</span>=${logPaths[$i]}
  stakeholder=${logEmails[$i]}
  numErrors=$( tail -n <span class="hljs-number">100</span> <span class="hljs-string">"$log"</span> | <span class="hljs-keyword">grep</span> <span class="hljs-string">"ERROR"</span> | wc -l )

  <span class="hljs-comment"># 如果近期发现超过 5 个错误，就警告负责人</span>
  <span class="hljs-keyword">if</span> [[ <span class="hljs-string">"$numErrors"</span> -<span class="hljs-keyword">gt</span> <span class="hljs-number">5</span> ]];
  then
    emailRecipient=<span class="hljs-string">"$stakeholder"</span>
    emailSubject=<span class="hljs-string">"WARNING: <span class="hljs-subst">${<span class="hljs-keyword">log</span>}</span> showing unusual levels of errors"</span>
    emailBody=<span class="hljs-string">"<span class="hljs-subst">${numErrors}</span> errors found in log <span class="hljs-subst">${<span class="hljs-keyword">log</span>}</span>"</span>
    echo <span class="hljs-string">"$emailBody"</span> | mailx -<span class="hljs-keyword">s</span> <span class="hljs-string">"$emailSubject"</span> <span class="hljs-string">"$emailRecipient"</span>
  fi
done

</code></pre><h4><a href="#api-查询"></a>API 查询</h4>
<p>如果你想要生成一些分析数据，分析你的 Medium 帖子中用户评论最多的。由于我们无法直接访问数据库，SQL 不在我们考虑范围，但我们可以用 API！</p>
<p>为了避免陷入关于 API 授权和令牌的冗长讨论，我们将会使用 <a href="https://github.com/typicode/jsonplaceholder">JSONPlaceholder</a>，这是一个面向公众的测试服务 API。一旦我们查询每个帖子，解析出每个评论者的邮箱，我们就可以把这些邮箱添加到我们的结果数组里：</p>
<pre><code class="hljs bash">endpoint=<span class="hljs-string">"https://jsonplaceholder.typicode.com/comments"</span>
allEmails=()

<span class="hljs-comment"># 查询前 10 个帖子</span>
<span class="hljs-keyword">for</span> postId <span class="hljs-keyword">in</span> {1..10};
<span class="hljs-keyword">do</span>
  <span class="hljs-comment"># 执行 API 调用，获取该帖子评论者的邮箱</span>
  response=$(curl <span class="hljs-string">"<span class="hljs-variable">${endpoint}</span>?postId=<span class="hljs-variable">${postId}</span>"</span>)

  <span class="hljs-comment"># 使用 jq 把 JSON 响应解析成数组</span>
  allEmails+=( $( jq <span class="hljs-string">'.[].email'</span> &lt;&lt;&lt; <span class="hljs-string">"<span class="hljs-variable">$response</span>"</span> ) )
<span class="hljs-keyword">done</span>

</code></pre><p>注意这里我是用 <a href="https://stedolan.github.io/jq/">jq 工具</a> 从命令行里解析 JSON 数据。关于 <code>jq</code> 的语法超出了本文的范围，但我强烈建议你了解它。</p>
<p>你可能已经想到，使用 Bash 数组在数不胜数的场景中很有帮助，我希望这篇文章中的示例可以给你思维的启发。如果你从自己的工作中找到其它的例子想要分享出来，请在帖子下方评论。</p>
<h3><a href="#请等等还有很多东西"></a>请等等，还有很多东西！</h3>
<p>由于我们在本文讲了很多数组语法，这里是关于我们讲到内容的总结，包含一些还没讲到的高级技巧：</p>
<p>语法</p>
<p>效果</p>
<p><code>arr=()</code></p>
<p>创建一个空数组</p>
<p><code>arr=(1 2 3)</code></p>
<p>初始化数组</p>
<p><code>${arr[2]}</code></p>
<p>取得第三个元素</p>
<p><code>${arr[@]}</code></p>
<p>取得所有元素</p>
<p><code>${!arr[@]}</code></p>
<p>取得数组索引</p>
<p><code>${#arr[@]}</code></p>
<p>计算数组长度</p>
<p><code>arr[0]=3</code></p>
<p>覆盖第 1 个元素</p>
<p><code>arr+=(4)</code></p>
<p>添加值</p>
<p><code>str=$(ls)</code></p>
<p>把 <code>ls</code> 输出保存到字符串</p>
<p><code>arr=( $(ls) )</code></p>
<p>把 <code>ls</code> 输出的文件保存到数组里</p>
<p><code>${arr[@]:s:n}</code></p>
<p>取得从索引 <code>s</code> 开始的 <code>n</code> 个元素</p>
<h3><a href="#最后一点思考"></a>最后一点思考</h3>
<p>正如我们所见，Bash 数组的语法很奇怪，但我希望这篇文章让你相信它们很有用。只要你理解了这些语法，你会发现以后会经常使用 Bash 数组。</p>
<h4><a href="#bash-还是-python"></a>Bash 还是 Python？</h4>
<p>问题来了：什么时候该用 Bash 数组而不是其他的脚本语法，比如 Python？</p>
<p>对我而言，完全取决于需求——如果你可以只需要调用命令行工具就能立马解决问题，你也可以用 Bash。但有些时候，当你的脚本属于一个更大的 Python 项目时，你也可以用 Python。</p>
<p>比如，我们可以用 Python 来实现参数扫描，但我们只用编写一个 Bash 的包装：</p>
<pre><code class="hljs nix"><span class="hljs-built_in">import</span> subprocess

<span class="hljs-attr">all_threads</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">16</span>, <span class="hljs-number">32</span>, <span class="hljs-number">64</span>, <span class="hljs-number">128</span>]
<span class="hljs-attr">all_runtimes</span> = []

<span class="hljs-comment"># 用不同的线程数字启动管线</span>
for t <span class="hljs-keyword">in</span> all_threads:
  <span class="hljs-attr">cmd</span> = './pipeline --threads {}'.format(t)

  <span class="hljs-comment"># 使用子线程模块获得返回的输出</span>
  <span class="hljs-attr">p</span> = subprocess.Popen(cmd, <span class="hljs-attr">stdout=subprocess.PIPE,</span> <span class="hljs-attr">shell=True)</span>
  <span class="hljs-attr">output</span> = p.communicate()[<span class="hljs-number">0</span>]
  all_runtimes.append(output)

</code></pre><p>由于本例中没法避免使用命令行，所以可以优先使用 Bash。</p>
<h4><a href="#羞耻的宣传时间"></a>羞耻的宣传时间</h4>
<p>如果你喜欢这篇文章，这里还有很多类似的文章！ <a href="https://conferences.oreilly.com/oscon/oscon-or">在此注册，加入 OSCON</a>，2018 年 7 月 17 号我会在这做一个主题为 <a href="https://conferences.oreilly.com/oscon/oscon-or/public/schedule/detail/67166">你所不了解的 Bash</a> 的在线编码研讨会。没有幻灯片，不需要门票，只有你和我在命令行里面敲代码，探索 Bash 中的奇妙世界。</p>
<p>本文章由 [Medium] 首发，再发布时已获得授权。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays">https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays</a></p>
<p>作者：<a href="https://opensource.com/users/robertaboukhalil">Robert Aboukhalil</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/BriFuture">BriFuture</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/you-don-t-know-bash-an-introduction-to-bash-arrays](https://www.zcfy.cc/article/you-don-t-know-bash-an-introduction-to-bash-arrays)
原文标题: 你所不了解的 Bash：关于 Bash 数组的介绍
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
