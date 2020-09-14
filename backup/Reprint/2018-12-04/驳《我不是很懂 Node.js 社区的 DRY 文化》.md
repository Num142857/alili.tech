---
title: '驳《我不是很懂 Node.js 社区的 DRY 文化》' 
date: 2018-12-04 2:30:05
hidden: true
slug: 9owegk001xd
categories: [reprint]
---

{{< raw >}}

                    
<p>今天在群里有人讨论方老师的文章<a href="https://zhuanlan.zhihu.com/p/35848291" rel="nofollow noreferrer">《我不是很懂 Node.js 社区的 DRY 文化》</a>，我也看了一遍，槽点太多，不知道如何下笔。</p>
<p>方老师分析了几个依赖最多的 npm 包，每个都只有不到百行代码。</p>
<p>比如 <a href="https://www.npmjs.com/package/is-odd" rel="nofollow noreferrer">is-odd</a>，每周下载 300 万次，但是只有核心 5 行代码。而且依赖了每周下载 1000 万次的 <a href="https://github.com/jonschlinkert/is-number" rel="nofollow noreferrer">is-number</a> 库。</p>
<p>得出了一个结论：</p>
<blockquote><ol>
<li>原来有这么多 JS 程序员不会判断奇数</li>
<li>只要 markdown 写得漂亮，就能迷倒 JS 程序员</li>
<li>
<code>1 + '1'</code> 的问题一直在困扰 JS 程序员，我要不要写一个 <code>add()</code> 库解决这个问题呢</li>
</ol></blockquote>
<p>首先第一条:</p>
<blockquote>原来有这么多 JS 程序员不会判断奇数。</blockquote>
<p>其实不仅仅是 JS 程序员，大部分程序员都不会准确的判断奇数。</p>
<p>你写</p>
<pre><code class="js">const isOdd = x =&gt; x % 2 === 1;</code></pre>
<p>这是小学的知识，除以 2，如果除不尽（有余数）那么就是奇数。正因为知识点很简单，所以给人一种随便一个程序员都会判断的错觉。</p>
<p>现在我们假设用户传入的参数一定是数字。</p>
<p>即便如此，这个函数依然不能正确判断奇数。因为<code> -3 % 2</code> 的结果是 <code>-1</code>。</p>
<p>有人说那就这么写：</p>
<pre><code class="js">const isOdd = x =&gt; x % 2 !== 0;</code></pre>
<p>随便一个小数就被判断为奇数了。更不用说浮点数中的妖怪 <code>NaN</code> 和 <code>Infinity</code> 了。</p>
<p>那么是不是对 <code>NaN</code> 和 <code>Infinity</code> 直接返回 falst，然后把 <code>-1</code> 的判断也加上去就行了：</p>
<pre><code class="js">const isOdd = x =&gt; x % 2 === 1 || x % 2 === -1;</code></pre>
<p>也是图样</p>
<pre><code class="js">9007199254740991 % 2 === 1
9007199254740992 % 2 === 0
9007199254740993 % 2 === 0
9007199254740994 % 2 === 0
9007199254740995 % 2 === 0
// 后面的都是 0</code></pre>
<p>为什么从 <code>9007199254740991</code> 开始呢？因为这个值是 <code>Number.MAX_SAFE_INTEGER</code>，是 <code>2 ** 53 - 1</code>。</p>
<p>那回过头来看看 is-odd 库是怎么实现的呢？</p>
<pre><code class="js">!!(~~i &amp; 1)</code></pre>
<p><code>~~i</code> 用于把字符串转换为整数，和 <code>1</code> 进行<strong>按位与</strong>运算判断最后一位是 <code>1</code> 还是 <code>0</code>。</p>
<p>很遗憾，也有问题。😔 因为在字符串转整数的时候精度就丢失了。</p>
<p>如果有谁想造轮子，可以写一个 better-is-odd，可以把字符串 <code>'9007199254740995'</code> 判断为奇数，但是对于数字 <code>9007199254740995</code> 也是无能为力。等着 <a href="https://github.com/tc39/proposal-bigint" rel="nofollow noreferrer">proposal-bigint</a> 提案吧。</p>
<p>不仅仅是判断奇数，单纯的判断一个字符串是不是数字就可以难倒一大片 JS 程序员（其它语言程序员也一样）。</p>
<p><a href="https://github.com/jonschlinkert/is-number" rel="nofollow noreferrer">is-number</a> 库核心代码不到 10 行。方老师只关注了库的源代码，但是我们如果看一看他的 <a href="https://github.com/jonschlinkert/is-number/blob/master/test.js" rel="nofollow noreferrer">test case</a>，就决定要使用这个库了。</p>
<p>作者为这 10 行代码写了 108 行的测试用例，来保证这个函数的功能是正确的。</p>
<p>我在之前的文章<strong>百行代码，千行测试</strong>里面曾写过：</p>
<blockquote>
<p>不要重复发明轮子。</p>
<p>很多大牛推荐我们“造轮子”，但是造轮子的目的是为了学习，而不是使用，尤其不要用在生产环境。</p>
<p>造个轮子很简单，但是你非要把自己的轮子安在汽车上，开上路，那肯定是一个安全隐患。</p>
<p>有很多人会说，“既然自己可以写一个，为什么非要用别人的？” 还有人觉得，有些非常小的功能不需要使用别人的。</p>
<p>很多人还会借此吐槽 leftpad 模块，但是平心而论，你自己能徒手这一个没有 bug 且高性能的 leftpad 函数吗？</p>
<p>前几天我们项目组就遇到了一次，其实功能很简单，一个页面分享出去，并使用 url 携带参数。比如：</p>
<p>aaa.html?id=123456</p>
<p>看似很简单的一个需求，但是真正自己写一个却不简单。</p>
<ol>
<li>查找“=”字符，然后截取后面的？</li>
<li>split("=")，然后去第二个</li>
<li>……</li>
</ol>
<p>不到 10 行代码就写完了。</p>
<p>第一次分享到微信是正常，把分享出去的页面再次转发分享，页面错误。</p>
<p>因为微信会在 URL 后面添加一些额外的参数，同样，不同的平台都会有不同形式的添加参数方式，有的加 <code>&amp;</code>，有的加 <code>#</code>，不论加什么都会导致解析的失败。</p>
<p>归根结底是我们写的解析函数有 bug，我们重新造了一个有 bug 的轮子。</p>
<p>解决方式就是:</p>
<p><code>npm i qs</code></p>
<p>麻雀虽小，五脏俱全。看看 github 源码，“<strong>百行代码，千行测试</strong>”。绝对比自己写的代码靠谱。</p>
<p>我写这篇文章不是为了推荐这个 qs 库，而是告诉大家不要重复造轮子用在生产环境，平时大家多造轮子用来学习。</p>
</blockquote>
<p>在回过头来看看 is-number 库，不仅仅有 100 多行的 test case，还有一个目录 benchmark。这里面的代码我没有数，但是光看文件数量就有 10 个以上。也就是说作者不仅仅保证了这个函数的运行结果没有问题，更保证了这个函数的性能。</p>
<p>我们为什么要使用这个库，因为作者为了他的 10 行代码，写了几百行的其它代码来保证质量。</p>
<p>作者 9 天前还发布了新版，20 天前还优化了字符串转数字的性能。</p>
<p>再看看方老师说的第二条：</p>
<blockquote>只要 markdown 写得漂亮，就能迷倒 JS 程序员。<br>这些包的 markdown 代码远远多于 JS 代码，可能它们的 markdown 更值得我们学习</blockquote>
<p>Redux 号称<strong>百行代码，千行文档</strong>，一共就导出了 5 个函数。</p>
<p>而且 markdown 写的漂亮也是很有必要的，否则你不知道下面的代码到底输出什么</p>
<pre><code class="js">isOdd(' 12')
isOdd('一')
isOdd('①')
isOdd('Odd')</code></pre>
<p>第三条：</p>
<blockquote>
<code>1 + '1'</code> 的问题一直在困扰 JS 程序员，我要不要写一个 <code>add()</code> 库解决这个问题呢</blockquote>
<p>不能。</p>
<p>我是认真的！因为 npm 已经有一个 <code>add</code> 库了，名字被别人占用了，所以你只能叫别的名字了。</p>
<p>虽然是一个小众的库，但是每周也有近一万的下载量。这个库实现了 JavaScript 中的浮点数加法的 Rump-Ogita-Oishi 算法。</p>
<p>比如有如下浮点数：</p>
<pre><code class="js">const nums = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7]</code></pre>
<p>把这些数累加</p>
<pre><code class="js">nums.reduce((a,b) =&gt; a+b);</code></pre>
<p>结果是：</p>
<pre><code>15.299999999999999</code></pre>
<p>而使用 Rump-Ogita-Oishi 算法：</p>
<pre><code class="js">add(nums) === 15.3</code></pre>
<p>再看看 benchmark (OS X 10.9.4, 2 GHz Core i7, 8GB DDR3 1600Mhz RAM)：</p>
<pre><code>add-precise x 1,400,712 ops/sec ±3.31% (89 runs sampled)
add-dumb x 24,268,034 ops/sec ±3.96% (80 runs sampled)
native x 94,957,251 ops/sec ±2.94% (85 runs sampled)
native is ~67.8 times faster than add-precise</code></pre>
<p>最后再重申一般：<strong>Don't Repeat Yourself</strong>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
驳《我不是很懂 Node.js 社区的 DRY 文化》

## 原文链接
[https://segmentfault.com/a/1190000014480379](https://segmentfault.com/a/1190000014480379)

