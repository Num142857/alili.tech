---
title: 'Bash 脚本：正则表达式基础篇' 
date: 2019-01-21 2:30:06
hidden: true
slug: lxcn150vbf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#bash-脚本正则表达式基础篇"></a>Bash 脚本：正则表达式基础篇</h1>
<p>正则表达式Regular expressions（简写为 regex 或者 regexp）基本上是定义一种搜索模式的字符串，可以被用来执行“搜索”或者“搜索并替换”操作，也可以被用来验证像密码策略等条件。</p>
<p>正则表达式是一个我们可利用的非常强大的工具，并且使用正则表达式的优点是它能在几乎所有计算机语言中被使用。所以如果你使用 Bash 脚本或者创建一个 python 程序时，我们可以使用正则表达式，或者也可以写一个单行搜索查询。</p>
<p>在这篇教程中，我们将会学习一些正则表达式的基本概念，并且学习如何在 Bash 中通过 <code>grep</code> 使用它们，但是如果你希望在其他语言如 python 或者 C 中使用它们，你只能使用正则表达式部分。那么让我们通过正则表达式的一个例子开始吧，</p>
<p>正则表达式看起来像 <code>/t[aeiou]l/</code> 这个样子。</p>
<p>但这是什么意思呢？它意味着所提到的正则表达式将寻找一个词，它以 <code>t</code> 开始，在中间包含字母 <code>a e i o u</code> 中任意一个，并且字母 <code>l</code> 最为最后一个字符。它可以是 <code>tel</code>，<code>tal</code> 或者 <code>til</code>，可以匹配一个单独的词或者其它单词像 <code>tilt</code>，<code>brutal</code> 或者 <code>telephone</code> 的一部分。</p>
<p>grep 使用正则表达式的语法是 <code>$ grep "regex_search_term" file_location</code></p>
<p>如果不理解，不要担心，这只是一个例子，来展示可以利用正则表达式获取什么，相信我，这是最简单的例子。我们可以从正则表达式中获取更多。现在我们将从正则表达式基础的开始。</p>
<ul>
<li>推荐阅读: <a href="http://linuxtechlab.com/useful-linux-commands-you-should-know/">你应该知道的有用的 linux 命令</a></li>
</ul>
<h3><a href="#基础的正则表示式"></a>基础的正则表示式</h3>
<p>现在我们开始学习一些被称为元字符MetaCharacters的特殊字符。它们可以帮助我们创建更复杂的正则表达式搜索项。下面提到的是基本元字符的列表，</p>
<ul>
<li><code>.</code> 点将匹配任意字符</li>
<li><code>[ ]</code> 将匹配一个字符范围</li>
<li><code>[^ ]</code> 将匹配除了括号中提到的那个之外的所有字符</li>
<li><code>*</code> 将匹配零个或多个前面的项</li>
<li><code>+</code> 将匹配一个或多个前面的项</li>
<li><code>?</code> 将匹配零个或一个前面的项</li>
<li><code>{n}</code> 将匹配 n 次前面的项</li>
<li><code>{n,}</code> 将匹配 n 次或更多前面的项</li>
<li><code>{n,m}</code> 将匹配在 n 和 m 次之间的项</li>
<li><code>{,m}</code> 将匹配少于或等于 m 次的项</li>
<li><code>\</code> 是一个转义字符，当我们需要在我们的搜索中包含一个元字符时使用</li>
</ul>
<p>现在我们将用例子讨论所有这些元字符。</p>
<h4><a href="#-点"></a><code>.</code> （点）</h4>
<p>它用于匹配出现在我们搜索项中的任意字符。举个例子，我们可以使用点如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"d.g"</span> file1</span>

</code></pre><p>这个正则表达式意味着我们在名为 ‘file1’ 的文件中查找的词以 <code>d</code> 开始，以 <code>g</code>结尾，中间可以有 1 个字符的字符串。同样，我们可以使用任意数量的点作为我们的搜索模式，如 <code>T......h</code>，这个查询项将查找一个词，以 <code>T</code> 开始，以 <code>h</code> 结尾，并且中间可以有任意 6 个字符。</p>
<h4><a href="#-"></a><code>[ ]</code></h4>
<p>方括号用于定义字符范围。例如，我们需要搜索一些特别的单词而不是匹配任何字符，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"N[oen]n"</span> file2</span>

</code></pre><p>这里，我们正寻找一个单词，以 <code>N</code>开头，以 <code>n</code> 结尾，并且中间只能有 <code>o</code>、<code>e</code> 或者 <code>n</code> 中的一个。 在方括号中我们可以提到单个到任意数量的字符。</p>
<p>我们在方括号中也可以定义像 <code>a-e</code>或者 <code>1-18</code> 作为匹配字符的列表。</p>
<h4><a href="#--1"></a><code>[^ ]</code></h4>
<p>这就像正则表达式的 not 操作。当使用 <code>[^ ]</code> 时，它意味着我们的搜索将包括除了方括号内提到的所有字符。例如，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"St[^1-9]d"</span> file3</span>

</code></pre><p>这意味着我们可以拥有所有这样的单词，它们以 <code>St</code> 开始，以字母 <code>d</code> 结尾，并且不得包含从 <code>1</code> 到 <code>9</code> 的任何数字。</p>
<p>到现在为止，我们只使用了仅需要在中间查找单个字符的正则表达式的例子，但是如果我们需要更多字符该怎么办呢。假设我们需要找到以一个字符开头和结尾的所有单词，并且在中间可以有任意数量的字符。这就是我们使用乘数元字符如 <code>+</code> <code>*</code> 与 <code>?</code> 的地方。</p>
<p><code>{n}</code>、<code>{n,m}</code>、<code>{n,}</code> 或者 <code>{,m}</code> 也是可以在我们的正则表达式项中使用的其他乘数元字符。</p>
<h4><a href="#-星号"></a><code>*</code> (星号)</h4>
<p>以下示例匹配字母 <code>k</code> 的任意出现次数，包括一次没有：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"lak*"</span> file4</span>

</code></pre><p>它意味着我们可以匹配到 <code>lake</code>、<code>la</code> 或者 <code>lakkkk</code>。</p>
<h4><a href="#"></a><code>+</code></h4>
<p>以下模式要求字符串中的字母 <code>k</code> 至少被匹配到一次：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"lak+"</span> file5</span>

</code></pre><p>这里 <code>k</code> 在我们的搜索中至少需要发生一次，所以我们的结果可以为 <code>lake</code> 或者 <code>lakkkk</code>，但不能是 <code>la</code>。</p>
<h4><a href="#-1"></a><code>?</code></h4>
<p>在以下模式匹配中</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"ba?b"</span> file6</span>

</code></pre><p>匹配字符串 <code>bb</code> 或 <code>bab</code>，使用 <code>?</code> 乘数，我们可以有一个或零个字符的出现。</p>
<h4><a href="#非常重要的提示"></a>非常重要的提示</h4>
<p>当使用乘数时这是非常重要的，假设我们有一个正则表达式</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"S.*l"</span> file7</span>

</code></pre><p>我们得到的结果是 <code>small</code>、<code>silly</code>，并且我们也得到了 <code>Shane is a little to play ball</code>。但是为什么我们得到了 <code>Shane is a little to play ball</code>？我们只是在搜索中寻找单词，为什么我们得到了整个句子作为我们的输出。</p>
<p>这是因为它满足我们的搜索标准，它以字母 <code>s</code> 开头，中间有任意数量的字符并以字母 <code>l</code> 结尾。那么，我们可以做些什么来纠正我们的正则表达式来只是得到单词而不是整个句子作为我们的输出。</p>
<p>我们在正则表达式中需要增加 <code>?</code> 元字符，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"S.*?l"</span> file7</span>

</code></pre><p>这将会纠正我们正则表达式的行为。</p>
<h4><a href="#-2"></a><code>\</code></h4>
<p><code>\</code> 是当我们需要包含一个元字符或者对正则表达式有特殊含义的字符的时候来使用。例如，我们需要找到所有以点结尾的单词，所以我们可以使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> grep <span class="hljs-string">"S.*\\."</span> file8</span>

</code></pre><p>这将会查找和匹配所有以一个点字符结尾的词。</p>
<p>通过这篇基本正则表达式教程，我们现在有一些关于正则表达式如何工作的基本概念。在我们的下一篇教程中，我们将学习一些高级的正则表达式的概念。同时尽可能多地练习，创建正则表达式并试着尽可能多的在你的工作中加入它们。如果有任何疑问或问题，您可以在下面的评论区留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/bash-scripting-learn-use-regex-basics/">http://linuxtechlab.com/bash-scripting-learn-use-regex-basics/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">SHUSAIN</a> 译者：<a href="https://github.com/kimii">kimii</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Bash 脚本：正则表达式基础篇

## 原文链接
[https://www.zcfy.cc/article/bash-scripting-learn-to-use-regex-basics](https://www.zcfy.cc/article/bash-scripting-learn-to-use-regex-basics)

