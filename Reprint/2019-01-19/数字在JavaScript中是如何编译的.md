---
title: '数字在JavaScript中是如何编译的' 
date: 2019-01-19 2:30:10
hidden: true
slug: xqtob2j5qp
categories: [reprint]
---

{{< raw >}}

            <p>JavaScript中的所有数字都是浮点数。这篇博客文章解释了这些浮点数如何在64位二进制内部表示。由于特别考虑，本文中的数字将用整数表示，以便在阅读本文后，您将了解在以下交互中会发生什么：</p>
<p><em>（译者注：浮点数并不一定等于小数，定点数也并不一定就是整数。所谓浮点数就是小数点在逻辑上是不固定的，而定点数只能表示小数点固定的数值，具用浮点数或定点数表示某哪一种数要看用户赋予了这个数的意义是什么。）</em></p>
<pre><code class="hljs lsl">    &gt; <span class="hljs-number">9007199254740992</span> + <span class="hljs-number">1</span>
    <span class="hljs-number">9007199254740992</span>

    &gt; <span class="hljs-number">9007199254740992</span> + <span class="hljs-number">2</span>
    <span class="hljs-number">9007199254740994</span>

</code></pre><h2>JavaScript数字</h2>
<p>JavaScript数字都是浮点数，按照<a href="http://en.wikipedia.org/wiki/IEEE_754">IEEE 754 standard</a>标准进行存储。该标准有几种格式。 JavaScript使用binary64或双精度。正如前面的名称所表示的，数字以二进制格式存储在64位中。这些比特分配如下：分数占据比特0到51，指数占据比特52到62，符号占用比特63。</p>
<p>| <strong>sign</strong> (1 bit)
63</p>
<p> | <strong>exponent</strong> (11 bit)</p>
<p>62</p>
<p>52</p>
<p> | <strong>fraction</strong> (52 bit)</p>
<p>51</p>
<p>0</p>
<p> |</p>
<p>这些组件的工作原理如下：如果符号位为0，则数字为正数，否则为负数。粗略地说，分数包含数字的值，而指数表示该点的位置。在下面，我们经常使用二进制数字，这在浮点数方面有点不寻常。二进制数字将以前缀​​百分比符号（％）标记。虽然JavaScript数字以二进制格式存储，但默认输出为十进制[1]。在示例中，我们通常会使用该默认值。</p>
<h2>分数</h2>
<p>以下是表示非负浮点数的一种方法：有效数（或尾数）包含数字，作为自然数，指数指定点的左边（负指数）或右边（正指数）的点数应该转移。 JavaScript数字使用有理数作为有效数：1._f_其中_f_是52位小数。忽略符号，数字是有效数字乘以2_p_，其中_p_是指数（在稍后将解释的转换之后）。</p>
<p>比如:</p>
<p>| _f_ = %101, _p_ = 2 | Number: %1.101 × 22 = %110.1 |
| _f_ = %101, _p_ = −2 | Number: %1.101 × 2−2 = %0.01101 |
| _f_ = 0, _p_ = 0 | Number: %1.0 × 20 = %1 |</p>
<h3>表示整数</h3>
<p>整数的编码有多少位？有效数字有53个数字，一个在点之前，52个点。用_p_ = 52，我们有一个53位的自然数。唯一的问题是最高位始终为1.也就是说，我们没有全部位可供我们随意使用。分两步去除这个限制。首先，如果你需要一个最高位为0的53位数，然后是1，那么你设置_p_ = 51.分数的最低位成为该点之后的第一个数字，整数为0。依此类推，直到你处于编码数字1的_p_ = 0和_f_ = 0。</p>
<p>|  | 52 | 51 | 50 | ... | 1 | 0 | (bits) |
| p=52 | 1 | f51 | f50 | ... | f1 | f0 |  |
| p=51 | 0 | 1 | f51 | ... | f2 | f1 | f0=0 |
|  | ... |
| p=0 | 0 | 0 | 0 | ... | 0 | 1 | f51=0, etc. |</p>
<p>其次，对于全部53位，我们仍然需要表示零。如何做到这一点在下一节中解释。请注意，由于符号是单独存储的，因此整数的幅度（绝对值）为53位。</p>
<h2>指数</h2>
<p>指数的长度是11位，这意味着它的最低值是0，最高值是2047（211-1）。为了支持负指数，使用所谓的<a href="http://en.wikipedia.org/wiki/Offset-binary">偏移二进制</a>编码：1023是零，所有较低数字都是负数，所有较高数字都是正数。这意味着你从指数中减去1023将其转换为正常数字。因此，我们以前使用的变量_p_等于_e_-1023，并且有效数字乘以2_e_-1023。</p>
<p>偏移量二进制编码中的一些数字：</p>
<pre><code class="hljs lsl">    %<span class="hljs-number">00000000000</span>     <span class="hljs-number">0</span>  →  −<span class="hljs-number">1023</span>  (lowest number)
    %<span class="hljs-number">01111111111</span>  <span class="hljs-number">1023</span>  →      <span class="hljs-number">0</span>
    %<span class="hljs-number">11111111111</span>  <span class="hljs-number">2047</span>  →   <span class="hljs-number">1024</span>  (highest number)

    %<span class="hljs-number">10000000000</span>  <span class="hljs-number">1024</span>  →      <span class="hljs-number">1</span>
    %<span class="hljs-number">01111111110</span>  <span class="hljs-number">1022</span>  →     −<span class="hljs-number">1</span> 

</code></pre><p>你倒置它的位并减1就能将一个数变为负数了。</p>
<h3>特殊的指数</h3>
<p>两个指数值是保留的：最低的一个（0）和最高的一个（2047）。 2047的指数用于无穷大和NaN（非数字）值[2]。 IEEE 754标准有许多NaN值，但JavaScript都将它们表示为单个值NaN。指数0用于两种能力。首先，如果分数也是0，那么整数就是0.由于符号是分开存储的，我们同时具有-0和+0（详见[3]）。</p>
<p>其次，0的指数也用于表示非常小的数字（接近零）。然后该分数必须是非零的，如果是正数，则通过计算该数字</p>
<blockquote>
<p>%0._f_ × 2−1022</p>
</blockquote>
<p>这种表示是<em>非规范化</em>。先前讨论的表示被称为<em>标准化</em>。可以以规范化方式表示的最小的正数（非零）数是</p>
<blockquote>
<p>%1.0 × 2−1022</p>
</blockquote>
<p>最大的非正规化数字是</p>
<blockquote>
<p>%0.1 × 2−1022</p>
</blockquote>
<p>因此，在标准化和非标准化数字之间切换时没有漏洞。</p>
<h3>总结：指数</h3>
<p>| (−1)_s_ × %1._f_ × 2_e_−1023 | normalized, 0 &lt; _e_ &lt; 2047 |
| (−1)_s_ × %0._f_ × 2_e_−1022 | denormalized, _e_ = 0, _f_ &gt; 0 |
| (−1)_s_ × 0 | _e_ = 0, _f_ = 0 |
| NaN | _e_ = 2047, _f_ &gt; 0 |
| (−1)_s_ × ∞ (infinity) | _e_ = 2047, _f_ = 0 |</p>
<p>用_p_ = _e_ - 1023，指数的范围是</p>
<blockquote>
<p>−1023 &lt; _p_ &lt; 1024</p>
</blockquote>
<h2>小数部分</h2>
<p>并非所有小数都可以用JavaScript精确表示，如下所示：</p>
<pre><code class="hljs css">    &gt; 0<span class="hljs-selector-class">.1</span> + 0<span class="hljs-selector-class">.2</span>
    0<span class="hljs-selector-class">.30000000000000004</span>

</code></pre><p>小数部分0.1和0.2都不能精确地表示为二进制浮点数。但是，与实际值的偏差通常太小而不能显示。加法导致偏差变得可见。另一个例子：</p>
<pre><code class="hljs lsl">    &gt; <span class="hljs-number">0.1</span> + <span class="hljs-number">1</span> - <span class="hljs-number">1</span>
    <span class="hljs-number">0.10000000000000009</span>

</code></pre><p>表示0.1对于表示分数110来说是个挑战。困难的部分是分母10，其分母的因子分解是2×5.指数只允许你用2的幂除整数，所以没有办法得到5英寸。比较：13不能精确地表示为小数部分。它近似于0.333333 ...</p>
<p>相反，将二进制小数表示为小数部分总是可能的，您只需要收集足够多的二进制数（其中每十个都有一个）。例如：</p>
<blockquote>
<p>%0.001 = 18 = 12 × 2 × 2 = 5 × 5 × 5(2×5) × (2×5) × (2×5) = 12510 × 10 × 10 = 0.125</p>
</blockquote>
<h3>比较小数部分</h3>
<p>因此，当您使用具有小数值的小数输入时，不应直接比较它们。相反，考虑舍入误差的上限。这样的上限称为<a href="http://en.wikipedia.org/wiki/Machine_epsilon"><em>machine epsilon</em></a>。双精度的标准epsilon值是2-53。</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> epsEqu = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// IIFE, keeps EPSILON private</span>
        <span class="hljs-keyword">var</span> EPSILON = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">-53</span>);
<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">epsEqu</span>(<span class="hljs-params">x, y</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.abs(x - y) &lt; EPSILON;
};
}();

</code></pre><p>上述功能可确保在正常比较不充分的情况下获得正确结果：</p>
<pre><code class="hljs lsl">    &gt; <span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> === <span class="hljs-number">0.3</span>
    false
    &gt; epsEqu(<span class="hljs-number">0.1</span>+<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>)
    true

</code></pre><h2>最大整数</h2>
<p>如果有人说“_x_是最大整数”，这意味着什么？这意味着可以表示范围为0≤_n_≤_x_的每个整数_n_，并且对于大于_x_的任何整数都不能成立。 253符合该法案。以前的所有数字都可以表示：</p>
<pre><code class="hljs lsl">    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>)
    <span class="hljs-number">9007199254740992</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span>
    <span class="hljs-number">9007199254740991</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">2</span>
    <span class="hljs-number">9007199254740990</span>

</code></pre><p>但是下一个整数不能被表示：</p>
<pre><code class="hljs lsl">    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) + <span class="hljs-number">1</span>
    <span class="hljs-number">9007199254740992</span>

</code></pre><p>253的一些方面是上限可能是令人惊讶的。我们将通过一系列问题来看待他们。要记住的一件事是整数范围的高端限制资源是分数;指数仍有增长空间。</p>
<p><strong>为什么是53位？</strong>您有53位可用于幅度（不包括符号），但分数只包含52位。这怎么可能？正如您在上面看到的那样，指数提供了第53位：它移动了分数，因此除零之外的所有53位数都可以表示，并且它有一个特殊值来表示零（连同零的一部分）。</p>
<p><strong>为什么最高的整数不是253-1？</strong>通常，_x_位表示最低的数字是0，最高的数字是2_x_-1。例如，最高的8位数字是255.在JavaScript中，最高分数确实用于数字253-1，但可以表示253，这要归功于指数的帮助 - 它仅仅是一个分数_f_ = 0并且指数_p_ = 53（转换后）：</p>
<blockquote>
<p>%1._f_ × 2_p_ = %1.0 × 253 = 253</p>
</blockquote>
<p><strong>为什么高于253的数字可以代表？</strong></p>
<p>示例：</p>
<pre><code class="hljs lsl">    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>)
    <span class="hljs-number">9007199254740992</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) + <span class="hljs-number">1</span>  <span class="hljs-comment">// not OK</span>
    <span class="hljs-number">9007199254740992</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) + <span class="hljs-number">2</span>  <span class="hljs-comment">// OK</span>
    <span class="hljs-number">9007199254740994</span>

    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) * <span class="hljs-number">2</span>  <span class="hljs-comment">// OK</span>
    <span class="hljs-number">18014398509481984</span>

</code></pre><p>253×2的作品，因为指数可以使用。每乘以2只是将指数递增1并且不影响分数。因此，就最大分数而言，乘以2的幂不是问题。为了明白为什么可以加2到253，而不是1，我们用前面的表扩展53和54的附加位，以及_p_ = 53和_p_ = 54的行：</p>
<p>|  | 54 | 53 | 52 | 51 | 50 | ... | 2 | 1 | 0 | (bits) |
| p=54 | 1 | f51 | f50 | f49 | f48 | ... | f0 | 0 | 0 |  |
| p=53 |  | 1 | f51 | f50 | f49 | ... | f1 | f0 | 0 |  |
| p=52 |  |  | 1 | f51 | f50 | ... | f2 | f1 | f0 |  |</p>
<p>查看行（_p_ = 53），应该很明显，JavaScript数字可以将位53设置为1.但是，因为分数_f_只有52位，所以位0必须为零。因此，只有偶数_x_可以在253≤_x_ &lt;254范围内表示。在行（_p_ = 54）中，该间距增加到4的倍数，范围在254≤_x_ &lt;255：</p>
<pre><code class="hljs lsl">    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">54</span>)
    <span class="hljs-number">18014398509481984</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">54</span>) + <span class="hljs-number">1</span>
    <span class="hljs-number">18014398509481984</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">54</span>) + <span class="hljs-number">2</span>
    <span class="hljs-number">18014398509481984</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">54</span>) + <span class="hljs-number">3</span>
    <span class="hljs-number">18014398509481988</span>
    &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">54</span>) + <span class="hljs-number">4</span>
    <span class="hljs-number">18014398509481988</span>

</code></pre><p>等等...</p>
<h2>IEEE 754例外</h2>
<p>IEEE 754标准描述了五个例外，其中一个不能计算精确的值：</p>
<ol>
<li><p>无效：执行了无效操作。例如，计算负数的平方根。返回NaN [2]。</p>
<pre><code class="hljs javascript">    &gt; <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">-1</span>)
    <span class="hljs-literal">NaN</span>

</code></pre></li>
<li><p>除以零：返回正负无穷[2]。</p>
<pre><code class="hljs lsl">    &gt; <span class="hljs-number">3</span> / <span class="hljs-number">0</span>
    Infinity
    &gt; <span class="hljs-number">-5</span> / <span class="hljs-number">0</span>
    -Infinity

</code></pre></li>
<li><p>溢出：结果太大而无法表示。这意味着指数太高（_p_≥1024）。根据符号，有正面和负面溢出。返回正负无穷。</p>
<pre><code class="hljs javascript">    &gt; <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">2048</span>)
    <span class="hljs-literal">Infinity</span>
    &gt; -<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">2048</span>)
    -<span class="hljs-literal">Infinity</span>

</code></pre></li>
<li><p>下溢：结果太接近零来表示。这意味着指数太低（_p_≤-1023）。返回非规格化的值或零。</p>
<pre><code class="hljs lsl">     &gt; Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">-2048</span>)
     <span class="hljs-number">0</span>

</code></pre></li>
<li><p>不精确：操作产生了不准确的结果 - 要保留的分数有太多有效数字。返回一个舍入结果。</p>
<pre><code class="hljs lsl">    &gt; <span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>
    <span class="hljs-number">0.30000000000000004</span>

    &gt; <span class="hljs-number">9007199254740992</span> + <span class="hljs-number">1</span>
    <span class="hljs-number">9007199254740992</span>

</code></pre></li>
</ol>
<p>＃3和＃4是关于指数，＃5是关于分数。 ＃3和＃5之间的区别非常微妙：在第五个例子中，我们超过了分数的上限（这将是整数计算中的溢出）。但只有超过指数的上限才称为IEEE 754中的溢出。</p>
<h2>结论</h2>
<p>在这篇博文中，我们研究了JavaScript如何将其浮点数转换为64位。它根据IEEE 754标准中的双精度进行。由于数字的显示方式，人们往往会忘记JavaScript不能精确地表示分母的因子分解包含2以外的数字的小数部分。例如，可以表示0.5（12），而0.6（35）不能表示。人们也往往忘记了三个组件符号，指数，一个数字的小数部分一起工作来表示一个整数。但是，当Math.pow（2，53）+ 2可以表示时，会遇到这种情况，但Math.pow（2，53）+ 1不能。</p>
<p>网页“<a href="http://babbage.cs.qc.edu/IEEE-754/">IEEE-754 Analysis</a>”允许您输入一个数字并查看其内部表示。</p>
<h2>来源和相关阅读</h2>
<p>这篇文章的来源：</p>
<ul>
<li>“<a href="http://steve.hollasch.net/cgindex/coding/ieeefloat.html">IEEE Standard 754 Floating-Point</a>” by Steve Hollasch.</li>
<li>“<a href="http://radio.feld.cvut.cz/matlab/toolbox/fixpoint/c3_bev12.html">Data Types and Scaling (Fixed-Point Blockset)</a>” in the MATLAB documentation.</li>
<li>“<a href="http://en.wikipedia.org/wiki/IEEE_754">IEEE 754-2008</a>” on Wikipedia.</li>
</ul>
<p>This post is part of a <a href="http://2ality.com/archive.html?tag=numbers">series</a> on JavaScript numbers, which includes:</p>
<ol>
<li><a href="http://2ality.com/2012/03/displaying-numbers.html">Displaying numbers in JavaScript</a></li>
<li><a href="http://2ality.com/2012/02/nan-infinity.html">NaN and Infinity in JavaScript</a></li>
<li><a href="http://2ality.com/2012/03/signedzero.html">JavaScript’s two zeros</a></li>
</ol>
<p><img src="https://p0.ssl.qhimg.com/t01ea0b34a56851f579.gif" alt=""></p>
<hr>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数字在JavaScript中是如何编译的

## 原文链接
[https://www.zcfy.cc/article/how-numbers-are-encoded-in-javascript](https://www.zcfy.cc/article/how-numbers-are-encoded-in-javascript)

