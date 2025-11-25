---
title: 'JavaScript 精度丢失问题' 
date: 2019-01-30 2:30:23
hidden: true
slug: u2la0cn9do
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 两数相加
// 0.1 + 0.2 = 0.30000000000000004
// 0.7 + 0.1 = 0.7999999999999999
// 0.2 + 0.4 = 0.6000000000000001
// 2.22 + 0.1 = 2.3200000000000003

// 2. 两数相减
// 1.5 - 1.2 = 0.30000000000000004
// 0.3 - 0.2 = 0.09999999999999998

// 3. 两数相乘
// 19.9 * 100 = 1989.9999999999998
// 19.9 * 10 * 10 = 1990
// 1306377.64 * 100 = 130637763.99999999
// 1306377.64 * 10 * 10 = 130637763.99999999
// 0.7 * 180 = 125.99999999999999

// 4. 不一样的数却相等
// 1000000000000000128 === 1000000000000000129" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1. 两数相加</span>
<span class="hljs-comment">// 0.1 + 0.2 = 0.30000000000000004</span>
<span class="hljs-comment">// 0.7 + 0.1 = 0.7999999999999999</span>
<span class="hljs-comment">// 0.2 + 0.4 = 0.6000000000000001</span>
<span class="hljs-comment">// 2.22 + 0.1 = 2.3200000000000003</span>

<span class="hljs-comment">// 2. 两数相减</span>
<span class="hljs-comment">// 1.5 - 1.2 = 0.30000000000000004</span>
<span class="hljs-comment">// 0.3 - 0.2 = 0.09999999999999998</span>

<span class="hljs-comment">// 3. 两数相乘</span>
<span class="hljs-comment">// 19.9 * 100 = 1989.9999999999998</span>
<span class="hljs-comment">// 19.9 * 10 * 10 = 1990</span>
<span class="hljs-comment">// 1306377.64 * 100 = 130637763.99999999</span>
<span class="hljs-comment">// 1306377.64 * 10 * 10 = 130637763.99999999</span>
<span class="hljs-comment">// 0.7 * 180 = 125.99999999999999</span>

<span class="hljs-comment">// 4. 不一样的数却相等</span>
<span class="hljs-comment">// 1000000000000000128 === 1000000000000000129</span></code></pre>
<p>计算机的底层实现就无法完全精确表示一个无限循环的数，而且能够存储的位数也是有限制的，所以在计算过程中只能舍去多余的部分，得到一个尽可能接近真实值的数字表示，于是造成了这种计算误差。</p>
<p>比如在 JavaScript 中计算<code>0.1 + 0.2</code>时，十进制的0.1和0.2都会被转换成二进制，但二进制并不能完全精确表示转换结果，因为结果是无限循环的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 百度进制转换工具
0.1 -> 0.0001100110011001...
0.2 -> 0.0011001100110011..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 百度进制转换工具</span>
<span class="hljs-number">0.1</span> -&gt; <span class="hljs-number">0.0001100110011001</span>...
<span class="hljs-number">0.2</span> -&gt; <span class="hljs-number">0.0011001100110011</span>...</code></pre>
<blockquote><p>In JavaScript, Number is a numeric data type in the <a href="https://zh.wikipedia.org/wiki/IEEE_754" rel="nofollow noreferrer" target="_blank">double-precision 64-bit floating point format (IEEE 754)</a>. In other programming languages different numeric types can exist, for examples: Integers, Floats, Doubles, or Bignums.</p></blockquote>
<p>根据 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Number" rel="nofollow noreferrer" target="_blank">MDN这段关于Number的描述</a> 可以得知，JavaScript 里的数字是采用 <a href="https://zh.wikipedia.org/wiki/IEEE_754" rel="nofollow noreferrer" target="_blank">IEEE 754 标准</a>的 64 位双精度浮点数。该规范定义了浮点数的格式，最大最小范围，以及超过范围的舍入方式等规范。所以只要不超过这个范围，就不会存在舍去，也就不会存在精度问题了。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Number.MAX_SAFE_INTEGER 是 JavaScript 里能表示的最大的数了，超出了这个范围就不能保证计算的准确性了
var num = Number.MAX_SAFE_INTEGER;
num + 1 === num +2 // = true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Number.MAX_SAFE_INTEGER 是 JavaScript 里能表示的最大的数了，超出了这个范围就不能保证计算的准确性了</span>
<span class="hljs-keyword">var</span> num = <span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER;
num + <span class="hljs-number">1</span> === num +<span class="hljs-number">2</span> <span class="hljs-comment">// = true</span></code></pre>
<p>实际工作中我们也用不到这么大的数或者是很小的数，也应该尽量把这种对精度要求高的计算交给后端去计算，因为后端有成熟的库来解决这个计算问题。前端虽然也有类似的库，但是前端引入一个这样的库代价太大了。</p>
<ul>
<li><a href="https://github.com/josdejong/mathjs" rel="nofollow noreferrer" target="_blank">mathjs</a></li>
<li><a href="https://github.com/MikeMcl/decimal.js" rel="nofollow noreferrer" target="_blank">decimal.js</a></li>
</ul>
<p>排除直接使用的数太大或太小超出范围，出现这种问题的情况基本是浮点数的小数部分在转成二进制时丢失了精度，所以我们可以将小数部分也转换成整数后再计算。网上很多帖子贴出的解决方案就是这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = 0.1
var num2 = 0.2
(num1 * 10 + num2 * 10) / 10 // = 0.3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num1 = <span class="hljs-number">0.1</span>
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">0.2</span>
(num1 * <span class="hljs-number">10</span> + num2 * <span class="hljs-number">10</span>) / <span class="hljs-number">10</span> <span class="hljs-comment">// = 0.3</span></code></pre>
<p>但是这样转换整数的方式也是一种浮点数计算，在转换的过程中就可能存在精度问题，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1306377.64 * 10 // = 13063776.399999999
1306377.64 * 100 // = 130637763.99999999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1306377.64</span> * <span class="hljs-number">10</span> <span class="hljs-comment">// = 13063776.399999999</span>
<span class="hljs-number">1306377.64</span> * <span class="hljs-number">100</span> <span class="hljs-comment">// = 130637763.99999999</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = 2.22;
var num2 = 0.1;
(num1 * 10 + num2 * 10) / 10 // = 2.3200000000000003" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num1 = <span class="hljs-number">2.22</span>;
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">0.1</span>;
(num1 * <span class="hljs-number">10</span> + num2 * <span class="hljs-number">10</span>) / <span class="hljs-number">10</span> <span class="hljs-comment">// = 2.3200000000000003</span></code></pre>
<p>所以不要直接通过计算将小数转换成整数，我们可以通过字符串操作，移动小数点的位置来转换成整数，最后再同样通过字符串操作转换回小数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 通过字符串操作将一个数放大或缩小指定倍数
 * @num 被转换的数
 * @m   放大或缩小的倍数，为正表示小数点向右移动，表示放大；为负反之
 */
function numScale(num, m) {
  // 拆分整数、小数部分
  var parts = num.toString().split('.');
  // 原始值的整数位数
  const integerLen = parts[0].length;
  // 原始值的小数位数
  const decimalLen = parts[1] ? parts[1].length : 0;
  
  // 放大，当放大的倍数比原来的小数位大时，需要在数字后面补零
  if (m > 0) {
    // 补多少个零：m - 原始值的小数位数
    let zeros = m - decimalLen;
    while (zeros > 0) {
      zeros -= 1;
      parts.push(0);
    }
  // 缩小，当缩小的倍数比原来的整数位大时，需要在数字前面补零
  } else {
    // 补多少个零：m - 原始值的整数位数
    let zeros = Math.abs(m) - integerLen;
    while (zeros > 0) {
      zeros -= 1;
      parts.unshift(0);
    }
  }

  // 小数点位置，也是整数的位数: 
  //    放大：原始值的整数位数 + 放大的倍数
  //    缩小：原始值的整数位数 - 缩小的倍数
  var index = integerLen + m;
  // 将每一位都拆到数组里，方便插入小数点
  parts = parts.join('').split('');
  // 当为缩小时，因为可能会补零，所以使用原始值的整数位数
  // 计算出的小数点位置可能为负，这个负数应该正好是补零的
  // 个数，所以小数点位置应该为 0
  parts.splice(index > 0 ? index : 0, 0, '.');

  return parseFloat(parts.join(''));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 通过字符串操作将一个数放大或缩小指定倍数
 * @num 被转换的数
 * @m   放大或缩小的倍数，为正表示小数点向右移动，表示放大；为负反之
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numScale</span>(<span class="hljs-params">num, m</span>) </span>{
  <span class="hljs-comment">// 拆分整数、小数部分</span>
  <span class="hljs-keyword">var</span> parts = num.toString().split(<span class="hljs-string">'.'</span>);
  <span class="hljs-comment">// 原始值的整数位数</span>
  <span class="hljs-keyword">const</span> integerLen = parts[<span class="hljs-number">0</span>].length;
  <span class="hljs-comment">// 原始值的小数位数</span>
  <span class="hljs-keyword">const</span> decimalLen = parts[<span class="hljs-number">1</span>] ? parts[<span class="hljs-number">1</span>].length : <span class="hljs-number">0</span>;
  
  <span class="hljs-comment">// 放大，当放大的倍数比原来的小数位大时，需要在数字后面补零</span>
  <span class="hljs-keyword">if</span> (m &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 补多少个零：m - 原始值的小数位数</span>
    <span class="hljs-keyword">let</span> zeros = m - decimalLen;
    <span class="hljs-keyword">while</span> (zeros &gt; <span class="hljs-number">0</span>) {
      zeros -= <span class="hljs-number">1</span>;
      parts.push(<span class="hljs-number">0</span>);
    }
  <span class="hljs-comment">// 缩小，当缩小的倍数比原来的整数位大时，需要在数字前面补零</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 补多少个零：m - 原始值的整数位数</span>
    <span class="hljs-keyword">let</span> zeros = <span class="hljs-built_in">Math</span>.abs(m) - integerLen;
    <span class="hljs-keyword">while</span> (zeros &gt; <span class="hljs-number">0</span>) {
      zeros -= <span class="hljs-number">1</span>;
      parts.unshift(<span class="hljs-number">0</span>);
    }
  }

  <span class="hljs-comment">// 小数点位置，也是整数的位数: </span>
  <span class="hljs-comment">//    放大：原始值的整数位数 + 放大的倍数</span>
  <span class="hljs-comment">//    缩小：原始值的整数位数 - 缩小的倍数</span>
  <span class="hljs-keyword">var</span> index = integerLen + m;
  <span class="hljs-comment">// 将每一位都拆到数组里，方便插入小数点</span>
  parts = parts.join(<span class="hljs-string">''</span>).split(<span class="hljs-string">''</span>);
  <span class="hljs-comment">// 当为缩小时，因为可能会补零，所以使用原始值的整数位数</span>
  <span class="hljs-comment">// 计算出的小数点位置可能为负，这个负数应该正好是补零的</span>
  <span class="hljs-comment">// 个数，所以小数点位置应该为 0</span>
  parts.splice(index &gt; <span class="hljs-number">0</span> ? index : <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'.'</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseFloat</span>(parts.join(<span class="hljs-string">''</span>));
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 获取小数位数
 */
function getExponent(num) {
  return Math.floor(num) === num ?
    0 : num.toString().split('.')[1].length;
}

/**
 * 两数相加
 */
function accAdd(num1, num2) {
  const multiple = Math.max(getExponent(num1), getExponent(num2));
  return numScale(numScale(num1, multiple) + numScale(num2, multiple), multiple * -1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 获取小数位数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getExponent</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(num) === num ?
    <span class="hljs-number">0</span> : num.toString().split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">1</span>].length;
}

<span class="hljs-comment">/**
 * 两数相加
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">accAdd</span>(<span class="hljs-params">num1, num2</span>) </span>{
  <span class="hljs-keyword">const</span> multiple = <span class="hljs-built_in">Math</span>.max(getExponent(num1), getExponent(num2));
  <span class="hljs-keyword">return</span> numScale(numScale(num1, multiple) + numScale(num2, multiple), multiple * <span class="hljs-number">-1</span>);
}</code></pre>
<p>测试用例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('accAdd', function() {
  it('(0.1, 0.2) = 0.3', function() {
    assert.strictEqual(0.3, _.accAdd(0.1, 0.2))
  })
  it('(2.22, 0.1) = 2.32', function() {
    assert.strictEqual(2.32, _.accAdd(2.22, 0.1))
  })
  it('(11, 11) = 22', function() {
    assert.strictEqual(22, _.accAdd(11, 11))
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">describe(<span class="hljs-string">'accAdd'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  it(<span class="hljs-string">'(0.1, 0.2) = 0.3'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    assert.strictEqual(<span class="hljs-number">0.3</span>, _.accAdd(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>))
  })
  it(<span class="hljs-string">'(2.22, 0.1) = 2.32'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    assert.strictEqual(<span class="hljs-number">2.32</span>, _.accAdd(<span class="hljs-number">2.22</span>, <span class="hljs-number">0.1</span>))
  })
  it(<span class="hljs-string">'(11, 11) = 22'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    assert.strictEqual(<span class="hljs-number">22</span>, _.accAdd(<span class="hljs-number">11</span>, <span class="hljs-number">11</span>))
  })
})
</code></pre>
<ul>
<li>代码地址：<a href="https://github.com/xiaoyann/bali.js/blob/master/src/bali.js#L164-L216" rel="nofollow noreferrer" target="_blank">https://github.com/xiaoyann/b...</a>
</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li>
<li><a href="https://lifesinger.wordpress.com/2011/03/07/js-precision/" rel="nofollow noreferrer" target="_blank">JavaScript 中小数和大整数的精度丢失</a></li>
<li><a href="http://web.jobbole.com/74199/" rel="nofollow noreferrer" target="_blank">JavaScript 中的数字</a></li>
<li><a href="http://www.jianshu.com/p/d52a542bb363" rel="nofollow noreferrer" target="_blank">计算机是怎么存储数字的</a></li>
<li><a href="http://www.cnblogs.com/Nobel/archive/2013/04/08/3009162.html" rel="nofollow noreferrer" target="_blank">为什么0.1无法被二进制小数精确表示？</a></li>
<li><a href="https://www.zhihu.com/question/28551135" rel="nofollow noreferrer" target="_blank">为什么0.1+0.2=0.30000000000000004而1.1+2.2=3.3000000000000003？</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 精度丢失问题

## 原文链接
[https://segmentfault.com/a/1190000007649282](https://segmentfault.com/a/1190000007649282)

