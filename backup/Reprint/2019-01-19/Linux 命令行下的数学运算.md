---
title: 'Linux 命令行下的数学运算' 
date: 2019-01-19 2:30:10
hidden: true
slug: 1sal2pa56z8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-命令行下的数学运算"></a>Linux 命令行下的数学运算</h1>
<blockquote>
<p>有几个有趣的命令可以在 Linux 系统下做数学运算： <code>expr</code>、<code>factor</code>、<code>jot</code> 和 <code>bc</code> 命令。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/57b480b4c1c54352bce7dd73b8b6ba55314fd660/68747470733a2f2f696d616765732e74656368686976652e636f6d2f696d616765732f61727469636c652f323031342f31322f6d6174685f626c61636b626f6172642d3130303533343536342d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t0104bdc4488279eae9.jpg" alt=""></a></p>
<p>可以在 Linux 命令行下做数学运算吗？当然可以！事实上，有不少命令可以轻松完成这些操作，其中一些甚至让你大吃一惊。让我们来学习这些有用的数学运算命令或命令语法吧。</p>
<h3><a href="#expr"></a>expr</h3>
<p>首先，对于在命令行使用命令进行数学运算，可能最容易想到、最常用的命令就是 <code>expr</code> （表达式expression。它可以完成四则运算，也可以用于比较大小。下面是几个例子：</p>
<h4><a href="#变量递增"></a>变量递增</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> count=0</span>
<span class="hljs-meta">$</span><span class="bash"> count=`expr <span class="hljs-variable">$count</span> + 1`</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$count</span></span>
1

</code></pre><h4><a href="#完成简单运算"></a>完成简单运算</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> expr 11 + 123</span>
134
<span class="hljs-meta">$</span><span class="bash"> expr 134 / 11</span>
12
<span class="hljs-meta">$</span><span class="bash"> expr 134 - 11</span>
123
<span class="hljs-meta">$</span><span class="bash"> expr 11 * 123</span>
expr: syntax error      &lt;== oops!
<span class="hljs-meta">$</span><span class="bash"> expr 11 \* 123</span>
1353
<span class="hljs-meta">$</span><span class="bash"> expr 20 % 3</span>
2

</code></pre><p>注意，你需要在 <code>*</code> 运算符之前增加 <code>\</code> 符号，避免语法错误。<code>%</code> 运算符用于取余运算。</p>
<p>下面是一个稍微复杂的例子：</p>
<pre><code class="hljs routeros"><span class="hljs-attribute">participants</span>=11
<span class="hljs-attribute">total</span>=156
<span class="hljs-attribute">share</span>=`expr <span class="hljs-variable">$total</span> / <span class="hljs-variable">$participants</span>`
<span class="hljs-attribute">remaining</span>=`expr <span class="hljs-variable">$total</span> - <span class="hljs-variable">$participants</span> \* <span class="hljs-variable">$share</span>`
echo <span class="hljs-variable">$share</span>
14
echo <span class="hljs-variable">$remaining</span>
2

</code></pre><p>假设某个活动中有 11 位参与者，需要颁发的奖项总数为 156，那么平均每个参与者获得 14 项奖项，额外剩余 2 个奖项。</p>
<h4><a href="#比较"></a>比较</h4>
<p>下面让我们看一下比较的操作。从第一印象来看，语句看似有些怪异；这里并不是<strong>设置</strong>数值，而是进行数字比较。在本例中 <code>expr</code> 判断表达式是否为真：如果结果是 1，那么表达式为真；反之，表达式为假。</p>
<pre><code class="hljs lsl">$ expr <span class="hljs-number">11</span> = <span class="hljs-number">11</span>
<span class="hljs-number">1</span>
$ expr <span class="hljs-number">11</span> = <span class="hljs-number">12</span>
<span class="hljs-number">0</span>

</code></pre><p>请读作“11 是否等于 11？”及“11 是否等于 12？”，你很快就会习惯这种写法。当然，我们不会在命令行上执行上述比较，可能的比较是 <code>$age</code> 是否等于 <code>11</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> age=11</span>
<span class="hljs-meta">$</span><span class="bash"> expr <span class="hljs-variable">$age</span> = 11</span>
1

</code></pre><p>如果将数字放到引号中间，那么你将进行字符串比较，而不是数值比较。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> expr <span class="hljs-string">"11"</span> = <span class="hljs-string">"11"</span></span>
1
<span class="hljs-meta">$</span><span class="bash"> expr <span class="hljs-string">"eleven"</span> = <span class="hljs-string">"11"</span></span>
0

</code></pre><p>在本例中，我们判断 10 是否大于 5，以及是否大于 99。</p>
<pre><code class="hljs lsl">$ expr <span class="hljs-number">10</span> \&gt; <span class="hljs-number">5</span>
<span class="hljs-number">1</span>
$ expr <span class="hljs-number">10</span> \&gt; <span class="hljs-number">99</span>
<span class="hljs-number">0</span>

</code></pre><p>的确，返回 1 和 0 分别代表比较的结果为真和假，我们一般预期在 Linux 上得到这个结果。在下面的例子中，按照上述逻辑使用 <code>expr</code> 并不正确，因为 <code>if</code> 的工作原理刚好相反，即 0 代表真。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash
</span>
<span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Cost to us&gt; "</span>
<span class="hljs-built_in">read</span> cost
<span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Price we're asking&gt; "</span>
<span class="hljs-built_in">read</span> price

<span class="hljs-keyword">if</span> [ `expr <span class="hljs-variable">$price</span> \&gt; <span class="hljs-variable">$cost</span>` ]; <span class="hljs-keyword">then</span>
 <span class="hljs-built_in">echo</span> <span class="hljs-string">"We make money"</span>
<span class="hljs-keyword">else</span>
 <span class="hljs-built_in">echo</span> <span class="hljs-string">"Don't sell it"</span>
<span class="hljs-keyword">fi</span>

</code></pre><p>下面，我们运行这个脚本：</p>
<pre><code class="hljs lsl">$ ./checkPrice
Cost to us&gt; <span class="hljs-number">11.50</span>
Price we're asking&gt; <span class="hljs-number">6</span>
We make <span class="hljs-section">money</span>

</code></pre><p>这显然与我们预期不符！我们稍微修改一下，以便使其按我们预期工作：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash
</span>
<span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Cost to us&gt; "</span>
<span class="hljs-built_in">read</span> cost
<span class="hljs-built_in">echo</span> -n <span class="hljs-string">"Price we're asking&gt; "</span>
<span class="hljs-built_in">read</span> price

<span class="hljs-keyword">if</span> [ `expr <span class="hljs-variable">$price</span> \&gt; <span class="hljs-variable">$cost</span>` == 1 ]; <span class="hljs-keyword">then</span>
 <span class="hljs-built_in">echo</span> <span class="hljs-string">"We make money"</span>
<span class="hljs-keyword">else</span>
 <span class="hljs-built_in">echo</span> <span class="hljs-string">"Don't sell it"</span>
<span class="hljs-keyword">fi</span>

</code></pre><h3><a href="#factor"></a>factor</h3>
<p><code>factor</code> 命令的功能基本与你预期相符。你给出一个数字，该命令会给出对应数字的因子。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> factor 111</span>
111: 3 37
<span class="hljs-meta">$</span><span class="bash"> factor 134</span>
134: 2 67
<span class="hljs-meta">$</span><span class="bash"> factor 17894</span>
17894: 2 23 389
<span class="hljs-meta">$</span><span class="bash"> factor 1987</span>
1987: 1987


</code></pre><p>注：<code>factor</code> 命令对于最后一个数字没有返回更多因子，这是因为 1987 是一个<strong>质数</strong>。</p>
<h3><a href="#jot"></a>jot</h3>
<p><code>jot</code> 命令可以创建一系列数字。给定数字总数及起始数字即可。</p>
<pre><code class="hljs lsl">$ jot <span class="hljs-number">8</span> <span class="hljs-number">10</span>
<span class="hljs-number">10</span>
<span class="hljs-number">11</span>
<span class="hljs-number">12</span>
<span class="hljs-number">13</span>
<span class="hljs-number">14</span>
<span class="hljs-number">15</span>
<span class="hljs-number">16</span>
<span class="hljs-number">17</span>

</code></pre><p>你也可以用如下方式使用 <code>jot</code>，这里我们要求递减至数字 2。</p>
<pre><code class="hljs lsl">$ jot <span class="hljs-number">8</span> <span class="hljs-number">10</span> <span class="hljs-number">2</span>
<span class="hljs-number">10</span>
<span class="hljs-number">9</span>
<span class="hljs-number">8</span>
<span class="hljs-number">7</span>
<span class="hljs-number">5</span>
<span class="hljs-number">4</span>
<span class="hljs-number">3</span>
<span class="hljs-number">2</span>

</code></pre><p><code>jot</code> 可以帮你构造一系列数字组成的列表，该列表可以用于其它任务。</p>
<pre><code class="hljs lsl">$ for i in `jot <span class="hljs-number">7</span> <span class="hljs-number">17</span>`; do echo April $i; done
April <span class="hljs-number">17</span>
April <span class="hljs-number">18</span>
April <span class="hljs-number">19</span>
April <span class="hljs-number">20</span>
April <span class="hljs-number">21</span>
April <span class="hljs-number">22</span>
April <span class="hljs-number">23</span>

</code></pre><h3><a href="#bc"></a>bc</h3>
<p><code>bc</code> 基本上是命令行数学运算最佳工具之一。输入你想执行的运算，使用管道发送至该命令即可：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"123.4+5/6-(7.89*1.234)"</span> | bc</span>
113.664

</code></pre><p>可见 <code>bc</code> 并没有忽略精度，而且输入的字符串也相当直截了当。它还可以进行大小比较、处理布尔值、计算平方根、正弦、余弦和正切等。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"sqrt(256)"</span> | bc</span>
16
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"s(90)"</span> | bc -l</span>
.89399666360055789051

</code></pre><p>事实上，<code>bc</code> 甚至可以计算 pi。你需要指定需要的精度。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"scale=5; 4*a(1)"</span> | bc -l</span>
3.14156
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"scale=10; 4*a(1)"</span> | bc -l</span>
3.1415926532
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"scale=20; 4*a(1)"</span> | bc -l</span>
3.14159265358979323844
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"scale=40; 4*a(1)"</span> | bc -l</span>
3.1415926535897932384626433832795028841968

</code></pre><p>除了通过管道接收数据并返回结果，<code>bc</code>还可以交互式运行，输入你想执行的运算即可。本例中提到的 <code>scale</code> 设置可以指定有效数字的个数。</p>
<pre><code class="hljs lsl">$ bc
bc <span class="hljs-number">1.06</span><span class="hljs-number">.95</span>
Copyright <span class="hljs-number">1991</span><span class="hljs-number">-1994</span>, <span class="hljs-number">1997</span>, <span class="hljs-number">1998</span>, <span class="hljs-number">2000</span>, <span class="hljs-number">2004</span>, <span class="hljs-number">2006</span> Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
scale=<span class="hljs-number">2</span>
<span class="hljs-number">3</span>/<span class="hljs-number">4</span>
<span class="hljs-number">.75</span>
<span class="hljs-number">2</span>/<span class="hljs-number">3</span>
<span class="hljs-number">.66</span>
quit

</code></pre><p>你还可以使用 <code>bc</code> 完成数字进制转换。<code>obase</code> 用于设置输出的数字进制。</p>
<pre><code class="hljs lsl">$ bc
bc <span class="hljs-number">1.06</span><span class="hljs-number">.95</span>
Copyright <span class="hljs-number">1991</span><span class="hljs-number">-1994</span>, <span class="hljs-number">1997</span>, <span class="hljs-number">1998</span>, <span class="hljs-number">2000</span>, <span class="hljs-number">2004</span>, <span class="hljs-number">2006</span> Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
obase=<span class="hljs-number">16</span>
<span class="hljs-number">16</span>      &lt;=== entered
<span class="hljs-number">10</span>      &lt;=== response
<span class="hljs-number">256</span>     &lt;=== entered
<span class="hljs-number">100</span>     &lt;=== response
quit

</code></pre><p>按如下方式使用 <code>bc</code> 也是完成十六进制与十进制转换的最简单方式之一：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"ibase=16; F2"</span> | bc</span>
242
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"obase=16; 242"</span> | bc</span>
F2

</code></pre><p>在上面第一个例子中，我们将输入进制（<code>ibase</code>）设置为十六进制（<code>hex</code>），完成十六进制到为十进制的转换。在第二个例子中，我们执行相反的操作，即将输出进制（<code>obase</code>）设置为十六进制。</p>
<h3><a href="#简单的-bash-数学运算"></a>简单的 bash 数学运算</h3>
<p>通过使用双括号，我们可以在 bash 中完成简单的数学运算。在下面的例子中，我们创建一个变量，为变量赋值，然后依次执行加法、自减和平方。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ((e=11))</span>
<span class="hljs-meta">$</span><span class="bash"> (( e = e + 7 ))</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$e</span></span>
18
<span class="hljs-meta">
$</span><span class="bash"> ((e--))</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$e</span></span>
17
<span class="hljs-meta">
$</span><span class="bash"> ((e=e**2))</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-variable">$e</span></span>
289

</code></pre><p>允许使用的运算符包括：</p>
<pre><code class="hljs brainfuck"><span class="hljs-literal">+</span> <span class="hljs-literal">-</span>     <span class="hljs-comment">加法及减法</span>
<span class="hljs-literal">+</span><span class="hljs-literal">+</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>   <span class="hljs-comment">自增与自减</span>
<span class="hljs-comment">*</span> <span class="hljs-comment">/</span> <span class="hljs-comment">%</span>   <span class="hljs-comment">乘法、除法及求余数</span>
<span class="hljs-comment">^</span>       <span class="hljs-comment">指数运算</span>

</code></pre><p>你还可以使用逻辑运算符和布尔运算符：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ((x=11)); ((y=7))</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">if</span> (( x &gt; y )); <span class="hljs-keyword">then</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"x &gt; y"</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-keyword">fi</span></span>
x &gt; y
<span class="hljs-meta">
$</span><span class="bash"> ((x=11)); ((y=7)); ((z=3))</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">if</span> (( x &gt; y )) &gt;&gt; (( y &gt; z )); <span class="hljs-keyword">then</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"letters roll downhill"</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-keyword">fi</span></span>
letters roll downhill

</code></pre><p>或者如下方式：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">if</span> [ x &gt; y ] &lt;&lt; [ y &gt; z ]; <span class="hljs-keyword">then</span> <span class="hljs-built_in">echo</span> <span class="hljs-string">"letters roll downhill"</span>; <span class="hljs-keyword">fi</span></span>
letters roll downhill

</code></pre><p>下面计算 2 的 3 次幂：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"2 ^ 3"</span></span>
2 ^ 3
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"2 ^ 3"</span> | bc</span>
8

</code></pre><h3><a href="#总结"></a>总结</h3>
<p>在 Linux 系统中，有很多不同的命令行工具可以完成数字运算。希望你在读完本文之后，能掌握一两个新工具。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3268964/linux/how-to-do-math-on-the-linux-command-line.html">https://www.networkworld.com/article/3268964/linux/how-to-do-math-on-the-linux-command-line.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 命令行下的数学运算

## 原文链接
[https://www.zcfy.cc/article/how-to-do-math-on-the-linux-command-line](https://www.zcfy.cc/article/how-to-do-math-on-the-linux-command-line)

