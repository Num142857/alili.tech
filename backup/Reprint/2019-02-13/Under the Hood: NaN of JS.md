---
title: 'Under the Hood: NaN of JS' 
date: 2019-02-13 2:31:23
hidden: true
slug: v3dxks3larh
categories: [reprint]
---

{{< raw >}}

                    
<p>在查看本文之前，请先思考两个问题。</p>
<ol>
<li>
<code>typeof (1 / undefined)</code> 是多少</li>
<li>
<code>[1,2,NaN].indexOf(NaN)</code> 输出什么</li>
</ol>
<p>如果你还不确定这两题的答案的话，请仔细阅读本文。<br>这两题的答案不会直接解释，请从文章中寻找答案。</p>
<h1 id="articleHeader0">NaN 的本质</h1>
<p>我们知道 NaN(Not A Number) 会出现在<strong>任何不符合实数领域内计算规则</strong>的场景下。比如 <code>Math.sqrt(-1)</code> 就是 NaN，而 <code>1 / 0</code> 就不是 NaN。前者属于复数的范畴，而后者属于实数的范围。</p>
<p>同时需要注意的是，NaN 只会出现在浮点类型中，而不会出现在 int 类型里（当然 JS 并没有这个概念）</p>
<p>什么意思？用你熟悉的任何支持 int 和 double 两种类型的语言（比如 C）。在保证它不会偷偷做隐式类型转换的情况下，分别用 int 和 double 打印出 <code>sqrt(-1)</code>， 你就能发现只有在 double 的类型下才能看到 NaN 出现，而 int 呢？编译器甚至会给你一个 <strong>Warning。</strong></p>
<p>那么在浮点数下是如何表示一个 NaN 的呢？为了方便，下面用单精度 float 来表示，请看下图。<br><span class="img-wrap"><img data-src="/img/remote/1460000016802120" src="https://static.alili.tech/img/remote/1460000016802120" alt="" title="" style="cursor: pointer;"></span><br>在 3b 情况中，NaN 得满足：<strong>从左到右，以 1 开始，不关心第 1 位的值，第 2 位到第 9 位都是 1，剩下的位不全 为 0。</strong> 关于 <a href="https://en.wikipedia.org/wiki/IEEE_754" rel="nofollow noreferrer" target="_blank">浮点数内部的组成</a>，这里不做具体的介绍，我们只需要了解到浮点数分为 3 个部分就可以：</p>
<ol>
<li>符号位</li>
<li>指数位</li>
<li>精度位</li>
</ol>
<p>其中 float 的指数位有 8 位，精度位有 32 - 1 - 8 = 23 位<br>double 的指数位有 11 位，精度位有 64 - 1 - 11 = 52 位<br>所以上面 NaN 的满足条件，可以看成：<strong>精度位不全为 0，指数位全 1</strong> 就可以了。</p>
<p>所以按上面的说法，<code>0x7f81111, 0x7fcccccc</code> 等等这些都符合 NaN 的要求了。我们可以尝试一下，自己写一个函数，用来往 <strong>8</strong> 个字节的内存的前两个字节写入全 1. 也就是连续 16 个 1，这就符合 NaN 的定义了。看下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="double createNaN() {
  unsigned char *bits = calloc(sizeof(double), 1);
  // 大部分人的电脑是小端，所以要从 6 和 7 开始，而不是 0 和 1
  // 不清楚概念的可以参考阮老师：
  // [理解字节序 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/11/byte-order.html)
  bits[6] = 255;
  bits[7] = 255;
  unsigned char *start = bits;

  double nan = *(double *)(bits);
  output(nan);
  free(bits);
  return nan;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="c"><span class="hljs-function"><span class="hljs-keyword">double</span> <span class="hljs-title">createNaN</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">char</span> *bits = <span class="hljs-built_in">calloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">double</span>), <span class="hljs-number">1</span>);
  <span class="hljs-comment">// 大部分人的电脑是小端，所以要从 6 和 7 开始，而不是 0 和 1</span>
  <span class="hljs-comment">// 不清楚概念的可以参考阮老师：</span>
  <span class="hljs-comment">// [理解字节序 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/11/byte-order.html)</span>
  bits[<span class="hljs-number">6</span>] = <span class="hljs-number">255</span>;
  bits[<span class="hljs-number">7</span>] = <span class="hljs-number">255</span>;
  <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">char</span> *start = bits;

  <span class="hljs-keyword">double</span> nan = *(<span class="hljs-keyword">double</span> *)(bits);
  output(nan);
  <span class="hljs-built_in">free</span>(bits);
  <span class="hljs-keyword">return</span> nan;
}</code></pre>
<p>其中 output 是一个封装，用来输出任意一个 double 的内部二进制表示。详细代码查看 <a href="https://gist.github.com/thoamsy/28b278a098d0daeb495c8dbeca40cc1a" rel="nofollow noreferrer" target="_blank">gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="thoamsy/28b278a098d0daeb495c8dbeca40cc1a" data-typeid="1">点击预览</button>。<br>最后我们得到了：<br><span class="img-wrap"><img data-src="/img/remote/1460000016802121" src="https://static.alili.tech/img/remote/1460000016802121" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看来创造一个 NaN 不是很难，对吧？<br>同样的，为了证明上面的图的正确性，再看看 <code>Infinity</code> 的内部结构是否符合<br><span class="img-wrap"><img data-src="/img/remote/1460000016802122" src="https://static.alili.tech/img/remote/1460000016802122" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1">两种 NaN</h2>
<p>如果再细分的话，NaN 还可分为两种：</p>
<ol>
<li>Quiet NaN</li>
<li>Signaling NaN</li>
</ol>
<p>从性质上，可以认为第一种 NaN 属于“脾气比较好”，比较“文静”的一种，你甚至可以直接定义它，并使用它。<br>比如我们在 JS 中可以使用类似于 <code>NaN + 1, NaN + '123'</code> 的操作，还不会报错。</p>
<p>而 Signaling NaN 就是一个“爆脾气”。如果你想直接操作它的话，会抛出一个异常（或者称为 Trap）。也就不允许 NaN + 1 这种操作了。像这种不好惹的 NaN，根据 WiKi 中的介绍，它可以被用来：</p>
<blockquote>Filling uninitialized memory with signaling NaNs would produce the invalid operation exception if the data is used before it is initialized<br>Using an sNaN as a placeholder for a more complicated <a>object</a> , such as:<br>A representation of a number that has <a href="https://en.wikipedia.org/wiki/Arithmetic_underflow" rel="nofollow noreferrer" target="_blank">underflowed</a><br>A representation of a number that has <a href="https://en.wikipedia.org/wiki/Arithmetic_overflow" rel="nofollow noreferrer" target="_blank">overflowed</a><br>Number in a higher precision format<br>A <a href="https://en.wikipedia.org/wiki/Complex_number" rel="nofollow noreferrer" target="_blank">complex number</a>
</blockquote>
<h1 id="articleHeader2">NaN != NaN</h1>
<p>如果换个角度理解，因为 NaN 的表示方式实在太多，仅仅在 float 类型中，就有 <em>2^(32-8)</em> 中情况，所以 NaN 碰到一个和它二进制表示一模一样的概率实在太低了，所以我们可以认为 <strong>NaN 不等于 NaN</strong> 😏</p>
<p>嗯。看上去似乎问题不大，但是我们都知道计算机在大多数情况下，都是按规矩办事，这种玄学问题肯定不是内部的本质吧？要是真这样，世界上每一个程序员同时输出 <code>NaN === NaN</code>，总有一个人会得到 true，然后他就到 stackoverflow 上发了一个帖：<strong>你看 NaN 其实是会等于 NaN 的！</strong> 但我们从来没有见过这样的帖子，所以计算机内部肯定不是用这种颇为靠运气的方式在处理这个问题。</p>
<p>考虑换一种方式，假设计算机内部是通过<strong>位运算</strong>来判断的。如果某一个数的内部结构满足<strong>第 2 位到第 9 位全 1，剩下的 22 位不为 0</strong>，那它就是 NaN。我们可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_Bool isnan(double whatever) {
  long long num = *(long long *)(&amp;whatever); // 浮点数不能进行位运算，所以要改成整数类型，同时保留内部的二进制组成
  long long fmask = 0xfffffffffffff; // 不要数了，13 个 f，52 个 1
  long long emask = 0x7ff; // 11 个 1
  num <<= 1;
  num >>= 1; // 清除符号位
  return ((num &amp; fmask) != 0) &amp;&amp; (((num >> 53) &amp; emask) == emask);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="c">_<span class="hljs-function">Bool <span class="hljs-title">isnan</span><span class="hljs-params">(<span class="hljs-keyword">double</span> whatever)</span> </span>{
  <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> num = *(<span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> *)(&amp;whatever); <span class="hljs-comment">// 浮点数不能进行位运算，所以要改成整数类型，同时保留内部的二进制组成</span>
  <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> fmask = <span class="hljs-number">0xfffffffffffff</span>; <span class="hljs-comment">// 不要数了，13 个 f，52 个 1</span>
  <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> emask = <span class="hljs-number">0x7ff</span>; <span class="hljs-comment">// 11 个 1</span>
  num &lt;&lt;= <span class="hljs-number">1</span>;
  num &gt;&gt;= <span class="hljs-number">1</span>; <span class="hljs-comment">// 清除符号位</span>
  <span class="hljs-keyword">return</span> ((num &amp; fmask) != <span class="hljs-number">0</span>) &amp;&amp; (((num &gt;&gt; <span class="hljs-number">53</span>) &amp; emask) == emask);
}</code></pre>
<p>你可以试着把这段 C 代码运行一下，配合上面的 <code>createNaN</code> 可以试一下，他是真的可行的！</p>
<p>接着要实现 NaN != NaN 的特性，只需要在每次 == 的时候进行检测：只要有一个操作数是 NaN，那么就返回 false。</p>
<h1 id="articleHeader3">实际情况下的 NaN != NaN 的实现</h1>
<p>那么实际情况到底是怎样的呢？不同的系统会有不同的实现。</p>
<p>在 Apple 实现的 <a href="https://opensource.apple.com//source/Libm/Libm-315/Source/PowerPC/math.h" rel="nofollow noreferrer" target="_blank">C 库的头文件中</a>，可以看到，nan 在 float 下，仅仅就是一个数，它等于 <strong>0x7fc00000</strong>，也就是 <strong>0b0111 1111 1100 0000 0000 0000 0000 0000</strong>，符合上面的 NaN 的定义。<br><code>#define NAN __builtin_nanf("0x7fc00000")</code><br>而它们的 <code>isnan</code> 的实现也相当简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#define isnan(x)    \
    (sizeof (x) == sizeof(float)    ?  __inline_isnanf((float)(x))    \
  :  sizeof (x) == sizeof(double)  ?      __inline_isnand((double)(x))    \
    :    __inline_isnan ((long double)(x)))

static __inline__ int __inline_isnanf( float __x ) {
    return __x != __x;
}
static __inline__ int __inline_isnand( double __x ) {
    return __x != __x;
}
static __inline__ int __inline_isnan( long double __x ) {
  return __x != __x;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code class="c"><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> isnan(x)    \</span>
    (<span class="hljs-keyword">sizeof</span> (x) == <span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">float</span>)    ?  __inline_isnanf((<span class="hljs-keyword">float</span>)(x))    \
  :  <span class="hljs-keyword">sizeof</span> (x) == <span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">double</span>)  ?      __inline_isnand((<span class="hljs-keyword">double</span>)(x))    \
    :    __inline_isnan ((<span class="hljs-keyword">long</span> <span class="hljs-keyword">double</span>)(x)))

<span class="hljs-keyword">static</span> __inline__ <span class="hljs-keyword">int</span> __inline_isnanf( <span class="hljs-keyword">float</span> __x ) {
    <span class="hljs-keyword">return</span> __x != __x;
}
<span class="hljs-keyword">static</span> __inline__ <span class="hljs-keyword">int</span> __inline_isnand( <span class="hljs-keyword">double</span> __x ) {
    <span class="hljs-keyword">return</span> __x != __x;
}
<span class="hljs-keyword">static</span> __inline__ <span class="hljs-keyword">int</span> __inline_isnan( <span class="hljs-keyword">long</span> <span class="hljs-keyword">double</span> __x ) {
  <span class="hljs-keyword">return</span> __x != __x;
}</code></pre>
<p>仅仅只是简单的判断自己是否等于自己 🌚。在 C 中具体如何实现 <code>x !== x</code>，有两种可能：</p>
<ol>
<li>硬件支持 NaN 异常，所以永远都是 false</li>
<li>像下文中提到的 V8 的实现方式</li>
</ol>
<p>而在 V8 中，分为两个阶段：/Compile Time and Runtime/。</p>
<p>在 Compile Time，编译器如果在代码中碰到了 NaN 常量，就会自动将替换成 NaN 对应的那个常量，比如上文提到的 <strong>0x7fc00000</strong>。因为编译器已经明确知道了谁是 NaN，所以在写出形如 <code>NaN === NaN</code> 这种代码的时候，就能直接得到 false。</p>
<p>而在 Runtime 阶段，不是用户直接定义的 NaN，比如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { a: 1, b: 2 };
let { c, d } = obj;
c *= 100;
d *= 100;
console.log(c === d);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">let</span> { c, d } = obj;
c *= <span class="hljs-number">100</span>;
d *= <span class="hljs-number">100</span>;
<span class="hljs-built_in">console</span>.log(c === d);</code></pre>
<p>这种情况下，我们虽然一眼可以看出最后的 c 和 d 都是 undefined，但是编译器刚开始不知道，所以它只能在最后判等的时候，才能得到结果。而具体判断的逻辑如下图所示：<strong>我们先检查，操作数是否有 NaN，如果有？那就返回 false 吧</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016802123" src="https://static.alili.tech/img/remote/1460000016802123" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以 <code>Number.isNaN</code> 的 polyfill 可以怎么实现呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isNaN = function(value) {
  return value !== value;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">Number</span>.isNaN = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> <span class="hljs-comment">!== value;</span>
}</code></pre>
<p>就是这么简单 😎</p>
<h2 id="articleHeader4">参考文献</h2>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2016/11/byte-order.html" rel="nofollow noreferrer" target="_blank">理解字节序 - 阮一峰的网络日志</a></li>
<li><a href="https://medium.com/engineering-housing/nan-is-not-equal-to-nan-771321379694" rel="nofollow noreferrer" target="_blank">NaN is not equal to NaN</a></li>
<li><a href="https://en.wikipedia.org/wiki/NaN#Quiet_NaN" rel="nofollow noreferrer" target="_blank">Quiet NaN</a></li>
<li><a href="https://book.douban.com/subject/26912767/" rel="nofollow noreferrer" target="_blank">深入理解计算机系统（原书第 3 版） (豆瓣)</a></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV50Mk?w=640&amp;h=400" src="https://static.alili.tech/img/bV50Mk?w=640&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Under the Hood: NaN of JS

## 原文链接
[https://segmentfault.com/a/1190000016802117](https://segmentfault.com/a/1190000016802117)

