---
title: 'eval 之源' 
date: 2019-01-23 2:30:08
hidden: true
slug: 7mk1ed6l1b3
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#eval-之源"></a>eval 之源</h1>
<p>（LCTT 译注：本文标题 “The root of all eval” 影射著名歌曲“The root of all evil”（万恶之源））</p>
<p>唉，<code>eval</code> 这个函数让我爱恨交织，而且多半是后者居多。</p>
<pre><code class="hljs maxima">$ perl -E'my $<span class="hljs-built_in">program</span> = q[say <span class="hljs-string">"OH HAI"</span>]; <span class="hljs-built_in">eval</span> $<span class="hljs-built_in">program</span>'
OH HAI

</code></pre><p>当 <code>eval</code> 函数在 Perl 6 中被重命名为 <code>EVAL</code> 时，我感到有点震惊（这要追溯到 2013 年，<a href="https://github.com/perl6/specs/issues/50">在这里</a>讨论规范之后）。我一直没有从内心接受这样这样的做法。虽然这是个很好的意见，但是在这个意见上我似乎或多或少是孤独的。</p>
<p>理由是“这个函数真的很奇怪，所以我们应该用大写标记”。就像我们用 <code>BEGIN</code> 和其他 phaser 一样。使用 <code>BEGIN</code> 和其他 phaser，鼓励使用大写，这点我是同意的。phaser 能将程序“脱离正常控制流”。 但是 <code>eval</code> 函数并不能。（LCTT 译注： 在 Perl 6 当中，<a href="https://docs.perl6.org/language/phasers">phaser</a> 是在一个特定的执行阶段中调用的代码块。）</p>
<p>其他大写的地方像是 .WHAT 这样的东西，它看起来像属性，但是会在编译时将代码变成完全不同的东西。因为这发生在常规情况之外，因此大写甚至是被鼓励的。</p>
<p><code>eval</code> 归根到底是另一个函数。是的，这是一个潜在存在大量副作用的函数。但是那么多的标准函数都有大量的副作用。（举几个例子：<code>shell</code>、 <code>die</code>、 <code>exit</code>）你没看到有人呼吁将它们大写。</p>
<p>我猜有人会争论说 <code>eval</code> 是非常特别的，因为它以正常函数所没有的方式钩到编译器和运行时里面。（这也是 TimToady 在将该函数重命名的提交中的<a href="https://github.com/perl6/specs/commit/0b7df09ecc096eed5dc30f3dbdf568bbfd9de8f6">提交消息</a>中解释的。）这是一个来自实现细节的争论，然而这并不令人满意。这也同样适用与刚才提到的那些小写函数。</p>
<p>雪上加霜的是，更名后 <code>EVAL</code> 也更难于使用：</p>
<pre><code class="hljs stata">$ perl6 -<span class="hljs-keyword">e</span>'my <span class="hljs-variable">$program</span> = q[say <span class="hljs-string">"OH HAI"</span>]; EVAL <span class="hljs-variable">$program</span>'
===SORRY!=== <span class="hljs-keyword">Error</span> <span class="hljs-keyword">while</span> compiling -<span class="hljs-built_in">e</span>
EVAL is a very dangerous function!!! (<span class="hljs-keyword">use</span> the MONKEY-SEE-<span class="hljs-keyword">NO</span>-EVAL pragma to override this <span class="hljs-keyword">error</span>,
but only <span class="hljs-keyword">if</span> you're VERY sure your data contains <span class="hljs-keyword">no</span> injection attacks)
at -<span class="hljs-keyword">e</span>:1
------&gt; <span class="hljs-keyword">program</span> = q[say <span class="hljs-string">"OH HAI"</span>]; EVAL <span class="hljs-variable">$program</span>⏏&lt;EOL&gt;

$ perl6 -<span class="hljs-keyword">e</span>'<span class="hljs-keyword">use</span> MONKEY-SEE-<span class="hljs-keyword">NO</span>-EVAL; my <span class="hljs-variable">$program</span> = q[say <span class="hljs-string">"OH HAI"</span>]; EVAL <span class="hljs-variable">$program</span>'
OH HAI

</code></pre><p>首先，注入攻击是一个真实的问题，并不是一个笑话。我们应该互相教育对方和新手。</p>
<p>其次，这个错误消息（<code>"EVAL is a very dangerous function!!!"</code>）完全是恐吓多于帮助。我觉得当我们向人们解释代码注入的危险时，我们需要冷静并且切合实际，而不是用三个感叹号。这个错误信息对<a href="http://bobby-tables.com/">已经知道什么是注入攻击的人</a>来说是有意义的，对于那些不了解这种风险的人员，它没有提供任何提示或线索。</p>
<p>（Perl 6 社区并不是唯一对 <code>eval</code> 歇斯底里的，昨天我偶然发现了一个 StackOverflow 主题，关于如何将一个有类型名称的字符串转换为 JavaScript 中的相应构造函数，一些人不幸地提出了用 <code>eval</code>，而其他人立即集结起来指出这是多么不负责任，就像膝跳反射那样——“因为 eval 是坏的”）。</p>
<p>第三，“MOKNEY-SEE-NO-EVAL”。拜托，我们能不能不要这样……汗，启用一个核弹级的函数时，就像是猴子般的随机引用和轻率的尝试，我奇怪地发现_启用_ <code>EVAL</code> 函数的是一个称为 <code>NO-EVAL</code> 的东西。这并不符合“最少惊喜Least Surprise”原则。</p>
<p>不管怎样，有一天，我意识到我可以同时解决全大写名字问题和该指令的必要问题：</p>
<pre><code class="hljs maxima">$ perl6 -e'my &amp;<span class="hljs-built_in">eval</span> = &amp;EVAL; my $<span class="hljs-built_in">program</span> = q[say <span class="hljs-string">"OH HAI"</span>]; <span class="hljs-built_in">eval</span> $<span class="hljs-built_in">program</span>'
OH HAI

</code></pre><p>我很高兴我能想到这点子并记录下来。显然我们把它改回了旧名字，这个非常危险的功能（<code>!!!</code>）就又好了。 耶！</p>
<hr>
<p>via: <a href="http://strangelyconsistent.org/blog/the-root-of-all-eval">http://strangelyconsistent.org/blog/the-root-of-all-eval</a></p>
<p>作者：<a href="http://strangelyconsistent.org/about">Carl Mäsak</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
eval 之源

## 原文链接
[https://www.zcfy.cc/article/the-root-of-all-eval](https://www.zcfy.cc/article/the-root-of-all-eval)

