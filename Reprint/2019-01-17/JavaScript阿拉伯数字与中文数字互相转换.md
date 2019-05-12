---
title: 'JavaScript阿拉伯数字与中文数字互相转换' 
date: 2019-01-17 2:30:25
hidden: true
slug: ecqxq2aa4oa
categories: [reprint]
---

{{< raw >}}

                    
<p>有一次在上海前端交流群看见有人在群里发了一个求助信息：</p>
<blockquote><p>请用JavaScript语言编写一个函数，要求入口参数为数字， 取值范围是一位数整数，返回值是字符串，该函数的功能为：返回该数字对应的汉字，例如：输入数字6，返回汉字“六”；输入数字9，返回汉字“九”。</p></blockquote>
<p>然后我立马丢了一个以前我写的一个转中文数字的angular过滤器代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //- 小写数字转换成大写, 只处理到[0 ~ 99]
  function numberConvertToUppercase() {
    return function(num) {
      num = Number(num);
      var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
      var length = String(num).length;
      if (length == 1) {
        return upperCaseNumber[num];
      } else if (length == 2) {
        if (num == 10) {
          return upperCaseNumber[num];
        } else if (num > 10 &amp;&amp; num < 20) {
          return '十' + upperCaseNumber[String(num).charAt(1)];
        } else {
          return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
        }
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>  <span class="hljs-comment">//- 小写数字转换成大写, 只处理到[0 ~ 99]</span>
  function numberConvertToUppercase() {
    <span class="hljs-keyword">return</span> function(<span class="hljs-built_in">num</span>) {
      <span class="hljs-built_in">num</span> = Number(<span class="hljs-built_in">num</span>);
      <span class="hljs-keyword">var</span> upperCaseNumber = [<span class="hljs-string">'零'</span>, <span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>, <span class="hljs-string">'四'</span>, <span class="hljs-string">'五'</span>, <span class="hljs-string">'六'</span>, <span class="hljs-string">'七'</span>, <span class="hljs-string">'八'</span>, <span class="hljs-string">'九'</span>, <span class="hljs-string">'十'</span>, <span class="hljs-string">'百'</span>, <span class="hljs-string">'千'</span>, <span class="hljs-string">'万'</span>, <span class="hljs-string">'亿'</span>];
      <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">String</span>(<span class="hljs-built_in">num</span>).length;
      <span class="hljs-keyword">if</span> (length == <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> upperCaseNumber[<span class="hljs-built_in">num</span>];
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (length == <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">num</span> == <span class="hljs-number">10</span>) {
          <span class="hljs-keyword">return</span> upperCaseNumber[<span class="hljs-built_in">num</span>];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">num</span> &gt; <span class="hljs-number">10</span> &amp;&amp; <span class="hljs-built_in">num</span> &lt; <span class="hljs-number">20</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-string">'十'</span> + upperCaseNumber[<span class="hljs-built_in">String</span>(<span class="hljs-built_in">num</span>).charAt(<span class="hljs-number">1</span>)];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> upperCaseNumber[<span class="hljs-built_in">String</span>(<span class="hljs-built_in">num</span>).charAt(<span class="hljs-number">0</span>)] + <span class="hljs-string">'十'</span> + upperCaseNumber[<span class="hljs-built_in">String</span>(<span class="hljs-built_in">num</span>).charAt(<span class="hljs-number">1</span>)].replace(<span class="hljs-string">'零'</span>, <span class="hljs-string">''</span>);
        }
      }
    }
  }</code></pre>
<p>接下来就有人回应：</p>
<ul>
<li><p>wolf 你这种写法要命了</p></li>
<li><p>才99 就这么长， 如果 99999呢</p></li>
</ul>
<p>然后我以项目当时需求就只到2位为由回应。后来自己去尝试写一个完整的转换方法。尝试了很多次总是有一些细节没有考虑全。</p>
<p>经过多次测试后下面给出一个我最终写出的一个完整版本，供参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */
function toZhDigit(digit) {
  digit = typeof digit === 'number' ? String(digit) : digit;
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['千', '百', '十', ''];
  const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

  let breakLen = Math.ceil(digit.length / 4);
  let notBreakSegment = digit.length % 4 || 4;
  let segment;
  let zeroFlag = [], allZeroFlag = [];
  let result = '';

  while (breakLen > 0) {
    if (!result) { // 第一次执行
      segment = digit.slice(0, notBreakSegment);
      let segmentLen = segment.length;
      for (let i = 0; i < segmentLen; i++) {
        if (segment[i] != 0) {
          if (zeroFlag.length > 0) {
            result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
            // 判断是否需要加上 quot 单位
            if (i === segmentLen - 1 &amp;&amp; breakLen > 1) {
              result += quot[breakLen - 2];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[i]] + unit[4 - segmentLen + i];
            if (i === segmentLen - 1 &amp;&amp; breakLen > 1) {
              result += quot[breakLen - 2];
            }
          }
        } else {
          // 处理为 0 的情形
          if (segmentLen == 1) {
            result += zh[segment[i]];
            break;
          }
          zeroFlag.push(segment[i]);
          continue;
        }
      }
    } else {
      segment = digit.slice(notBreakSegment, notBreakSegment + 4);
      notBreakSegment += 4;

      for (let j = 0; j < segment.length; j++) {
        if (segment[j] != 0) {
          if (zeroFlag.length > 0) {
            // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
            if (j === 0) {
              result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
            } else {
              result += '零' + zh[segment[j]] + unit[j];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[j]] + unit[j];
          }
          // 判断是否需要加上 quot 单位
          if (j === segment.length - 1 &amp;&amp; breakLen > 1) {
            result += quot[breakLen - 2];
          }
        } else {
          // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
          if (j === 0 &amp;&amp; zeroFlag.length > 0 &amp;&amp; allZeroFlag.length === 0) {
            result += quot[breakLen - 1];
            zeroFlag.length = 0;
            zeroFlag.push(segment[j]);
          } else if (allZeroFlag.length > 0) {
            // 执行到最后
            if (breakLen == 1) {
              result += '';
            } else {
              zeroFlag.length = 0;
            }
          } else {
            zeroFlag.push(segment[j]);
          }

          if (j === segment.length - 1 &amp;&amp; zeroFlag.length === 4 &amp;&amp; breakLen !== 1) {
            // 如果执行到末尾
            if (breakLen === 1) {
              allZeroFlag.length = 0;
              zeroFlag.length = 0;
              result += quot[breakLen - 1];
            } else {
              allZeroFlag.push(segment[j]);
            }
          }
          continue;
        }
      }
   

    --breakLen;
  }

  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rsl"><code><span class="hljs-comment">/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */</span>
function toZhDigit(digit) {
  digit = typeof digit === <span class="hljs-string">'number'</span> ? String(digit) : digit;
  const zh = [<span class="hljs-string">'零'</span>, <span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>, <span class="hljs-string">'四'</span>, <span class="hljs-string">'五'</span>, <span class="hljs-string">'六'</span>, <span class="hljs-string">'七'</span>, <span class="hljs-string">'八'</span>, <span class="hljs-string">'九'</span>];
  const unit = [<span class="hljs-string">'千'</span>, <span class="hljs-string">'百'</span>, <span class="hljs-string">'十'</span>, <span class="hljs-string">''</span>];
  const quot = [<span class="hljs-string">'万'</span>, <span class="hljs-string">'亿'</span>, <span class="hljs-string">'兆'</span>, <span class="hljs-string">'京'</span>, <span class="hljs-string">'垓'</span>, <span class="hljs-string">'秭'</span>, <span class="hljs-string">'穰'</span>, <span class="hljs-string">'沟'</span>, <span class="hljs-string">'涧'</span>, <span class="hljs-string">'正'</span>, <span class="hljs-string">'载'</span>, <span class="hljs-string">'极'</span>, <span class="hljs-string">'恒河沙'</span>, <span class="hljs-string">'阿僧祗'</span>, <span class="hljs-string">'那由他'</span>, <span class="hljs-string">'不可思议'</span>, <span class="hljs-string">'无量'</span>, <span class="hljs-string">'大数'</span>];

  let breakLen = Math.<span class="hljs-built_in">ceil</span>(digit.<span class="hljs-built_in">length</span> / <span class="hljs-number">4</span>);
  let notBreakSegment = digit.<span class="hljs-built_in">length</span> % <span class="hljs-number">4</span> || <span class="hljs-number">4</span>;
  let segment;
  let zeroFlag = [], allZeroFlag = [];
  let result = <span class="hljs-string">''</span>;

  <span class="hljs-keyword">while</span> (breakLen &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">if</span> (!result) { <span class="hljs-comment">// 第一次执行</span>
      segment = digit.slice(<span class="hljs-number">0</span>, notBreakSegment);
      let segmentLen = segment.<span class="hljs-built_in">length</span>;
      <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; segmentLen; i++) {
        <span class="hljs-keyword">if</span> (segment[i] != <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">if</span> (zeroFlag.<span class="hljs-built_in">length</span> &gt; <span class="hljs-number">0</span>) {
            result += <span class="hljs-string">'零'</span> + zh[segment[i]] + unit[<span class="hljs-number">4</span> - segmentLen + i];
            <span class="hljs-comment">// 判断是否需要加上 quot 单位</span>
            <span class="hljs-keyword">if</span> (i === segmentLen - <span class="hljs-number">1</span> &amp;&amp; breakLen &gt; <span class="hljs-number">1</span>) {
              result += quot[breakLen - <span class="hljs-number">2</span>];
            }
            zeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
          } <span class="hljs-keyword">else</span> {
            result += zh[segment[i]] + unit[<span class="hljs-number">4</span> - segmentLen + i];
            <span class="hljs-keyword">if</span> (i === segmentLen - <span class="hljs-number">1</span> &amp;&amp; breakLen &gt; <span class="hljs-number">1</span>) {
              result += quot[breakLen - <span class="hljs-number">2</span>];
            }
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 处理为 0 的情形</span>
          <span class="hljs-keyword">if</span> (segmentLen == <span class="hljs-number">1</span>) {
            result += zh[segment[i]];
            <span class="hljs-keyword">break</span>;
          }
          zeroFlag.push(segment[i]);
          <span class="hljs-keyword">continue</span>;
        }
      }
    } <span class="hljs-keyword">else</span> {
      segment = digit.slice(notBreakSegment, notBreakSegment + <span class="hljs-number">4</span>);
      notBreakSegment += <span class="hljs-number">4</span>;

      <span class="hljs-keyword">for</span> (let j = <span class="hljs-number">0</span>; j &lt; segment.<span class="hljs-built_in">length</span>; j++) {
        <span class="hljs-keyword">if</span> (segment[j] != <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">if</span> (zeroFlag.<span class="hljs-built_in">length</span> &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理</span>
            <span class="hljs-keyword">if</span> (j === <span class="hljs-number">0</span>) {
              result += quot[breakLen - <span class="hljs-number">1</span>] + zh[segment[j]] + unit[j];
            } <span class="hljs-keyword">else</span> {
              result += <span class="hljs-string">'零'</span> + zh[segment[j]] + unit[j];
            }
            zeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
          } <span class="hljs-keyword">else</span> {
            result += zh[segment[j]] + unit[j];
          }
          <span class="hljs-comment">// 判断是否需要加上 quot 单位</span>
          <span class="hljs-keyword">if</span> (j === segment.<span class="hljs-built_in">length</span> - <span class="hljs-number">1</span> &amp;&amp; breakLen &gt; <span class="hljs-number">1</span>) {
            result += quot[breakLen - <span class="hljs-number">2</span>];
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0</span>
          <span class="hljs-keyword">if</span> (j === <span class="hljs-number">0</span> &amp;&amp; zeroFlag.<span class="hljs-built_in">length</span> &gt; <span class="hljs-number">0</span> &amp;&amp; allZeroFlag.<span class="hljs-built_in">length</span> === <span class="hljs-number">0</span>) {
            result += quot[breakLen - <span class="hljs-number">1</span>];
            zeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
            zeroFlag.push(segment[j]);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (allZeroFlag.<span class="hljs-built_in">length</span> &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// 执行到最后</span>
            <span class="hljs-keyword">if</span> (breakLen == <span class="hljs-number">1</span>) {
              result += <span class="hljs-string">''</span>;
            } <span class="hljs-keyword">else</span> {
              zeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
            }
          } <span class="hljs-keyword">else</span> {
            zeroFlag.push(segment[j]);
          }

          <span class="hljs-keyword">if</span> (j === segment.<span class="hljs-built_in">length</span> - <span class="hljs-number">1</span> &amp;&amp; zeroFlag.<span class="hljs-built_in">length</span> === <span class="hljs-number">4</span> &amp;&amp; breakLen !== <span class="hljs-number">1</span>) {
            <span class="hljs-comment">// 如果执行到末尾</span>
            <span class="hljs-keyword">if</span> (breakLen === <span class="hljs-number">1</span>) {
              allZeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
              zeroFlag.<span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
              result += quot[breakLen - <span class="hljs-number">1</span>];
            } <span class="hljs-keyword">else</span> {
              allZeroFlag.push(segment[j]);
            }
          }
          <span class="hljs-keyword">continue</span>;
        }
      }
   

    --breakLen;
  }

  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>关于中文计数单位可以网上自行搜索。</p>
<p>上面的代码大体思路是：</p>
<p>从左至右，先把数字按万分位分组，每组加上对应的单位(万，亿, ...), 然后每个分组进行迭代。<code>breakLen</code>表示能够分成多少个分组，<code>notBreakSegment</code>表示当前已处理过的分组长度。<code>while</code>循环中有一个<code>if</code>判断，如果不存在<code>result</code>，则说明是第一次处理，那么在处理上是有些不同的。首先，在<code>segment</code>的赋值上，第一次是从<code>0</code>开始，取<code>notBreakSegment</code>的长度，后面每迭代一次<code>notBreakSegment</code>都要在上一个值上加<code>4</code>；其次，第一次处理不用判断上一个分组是否全为<code>0</code>的情形，这里<code>zeroFlag</code>表示每一个分组内存在<code>0</code>的个数，<code>allZeroFalg</code>表示当前分组前面出现的全为<code>0</code>的分组的个数。此外，在第一次执行时，还处理了只传入为<code>0</code>的情形。</p>
<p>每次处理<code>segment[i]</code>时，都要先判断当前值是否为<code>0</code>，为<code>0</code>时则直接记录到<code>zeroFlag</code>，然后进入下一次迭代，如果不为<code>0</code>，首先得判断上一个数字是否为<code>0</code>, 然后还得根据上一个<code>0</code>是否位于上一个分组的末位，来添加<strong>quot</strong>，最后还需要清空标志位。如果当前分组全为<code>0</code>，则标记<code>allZeroFlag</code>，所以在下一个分组处理时，还需要判断上一个分组是否全为<code>0</code><br>。</p>
<p>更多细节直接看代码，这里就不多作解释了。</p>
<p>接下来是中文转阿拉伯数字，这个处理起来比较简单，这里采用从右至左的方式对每一位进行迭代，直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function zhDigitToArabic(digit) {
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['千', '百', '十'];
  const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
  let result = 0, quotFlag;

  for (let i = digit.length - 1; i >= 0; i--) {
    if (zh.indexOf(digit[i]) > -1) { // 数字
      if (quotFlag) {
        result += quotFlag * getNumber(digit[i]);
      } else {
        result += getNumber(digit[i]);
      }
    } else if (unit.indexOf(digit[i]) > -1) { // 十分位
      if (quotFlag) {
        result += quotFlag * getUnit(digit[i]) * getNumber(digit[i - 1]);
      } else {
        result += getUnit(digit[i]) * getNumber(digit[i - 1]);
      }
      --i;
    } else if (quot.indexOf(digit[i]) > -1) { // 万分位
      if (unit.indexOf(digit[i - 1]) > -1) {
        if (getNumber(digit[i - 1])) {
          result += getQuot(digit[i]) * getNumber(digit[i - 1]);
        } else {
          result += getQuot(digit[i]) * getUnit(digit[i - 1]) * getNumber(digit[i - 2]);
          quotFlag = getQuot(digit[i]);
          --i;
        }
      } else {
        result += getQuot(digit[i]) * getNumber(digit[i - 1]);
        quotFlag = getQuot(digit[i]);
      }
      --i;
    }
  }

  return result;

  // 返回中文大写数字对应的阿拉伯数字
  function getNumber(num) {
    for (let i = 0; i < zh.length; i++) {
      if (zh[i] == num) {
        return i;
      }
    }
  }

  // 取单位
  function getUnit(num) {
    for (let i = unit.length; i > 0; i--) {
      if (num == unit[i - 1]) {
        return Math.pow(10, 4 - i);
      }
    }
  }

  // 取分段
  function getQuot(q) {
    for (var i = 0; i < quot.length; i++) {
      if (q == quot[i]) {
        return Math.pow(10, (i + 1) * 4);
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zhDigitToArabic</span>(<span class="hljs-params">digit</span>) </span>{
  <span class="hljs-keyword">const</span> zh = [<span class="hljs-string">'零'</span>, <span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>, <span class="hljs-string">'四'</span>, <span class="hljs-string">'五'</span>, <span class="hljs-string">'六'</span>, <span class="hljs-string">'七'</span>, <span class="hljs-string">'八'</span>, <span class="hljs-string">'九'</span>];
  <span class="hljs-keyword">const</span> unit = [<span class="hljs-string">'千'</span>, <span class="hljs-string">'百'</span>, <span class="hljs-string">'十'</span>];
  <span class="hljs-keyword">const</span> quot = [<span class="hljs-string">'万'</span>, <span class="hljs-string">'亿'</span>, <span class="hljs-string">'兆'</span>, <span class="hljs-string">'京'</span>, <span class="hljs-string">'垓'</span>, <span class="hljs-string">'秭'</span>, <span class="hljs-string">'穰'</span>, <span class="hljs-string">'沟'</span>, <span class="hljs-string">'涧'</span>, <span class="hljs-string">'正'</span>, <span class="hljs-string">'载'</span>, <span class="hljs-string">'极'</span>, <span class="hljs-string">'恒河沙'</span>, <span class="hljs-string">'阿僧祗'</span>, <span class="hljs-string">'那由他'</span>, <span class="hljs-string">'不可思议'</span>, <span class="hljs-string">'无量'</span>, <span class="hljs-string">'大数'</span>];
  <span class="hljs-keyword">let</span> result = <span class="hljs-number">0</span>, quotFlag;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = digit.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
    <span class="hljs-keyword">if</span> (zh.indexOf(digit[i]) &gt; <span class="hljs-number">-1</span>) { <span class="hljs-comment">// 数字</span>
      <span class="hljs-keyword">if</span> (quotFlag) {
        result += quotFlag * getNumber(digit[i]);
      } <span class="hljs-keyword">else</span> {
        result += getNumber(digit[i]);
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (unit.indexOf(digit[i]) &gt; <span class="hljs-number">-1</span>) { <span class="hljs-comment">// 十分位</span>
      <span class="hljs-keyword">if</span> (quotFlag) {
        result += quotFlag * getUnit(digit[i]) * getNumber(digit[i - <span class="hljs-number">1</span>]);
      } <span class="hljs-keyword">else</span> {
        result += getUnit(digit[i]) * getNumber(digit[i - <span class="hljs-number">1</span>]);
      }
      --i;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (quot.indexOf(digit[i]) &gt; <span class="hljs-number">-1</span>) { <span class="hljs-comment">// 万分位</span>
      <span class="hljs-keyword">if</span> (unit.indexOf(digit[i - <span class="hljs-number">1</span>]) &gt; <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">if</span> (getNumber(digit[i - <span class="hljs-number">1</span>])) {
          result += getQuot(digit[i]) * getNumber(digit[i - <span class="hljs-number">1</span>]);
        } <span class="hljs-keyword">else</span> {
          result += getQuot(digit[i]) * getUnit(digit[i - <span class="hljs-number">1</span>]) * getNumber(digit[i - <span class="hljs-number">2</span>]);
          quotFlag = getQuot(digit[i]);
          --i;
        }
      } <span class="hljs-keyword">else</span> {
        result += getQuot(digit[i]) * getNumber(digit[i - <span class="hljs-number">1</span>]);
        quotFlag = getQuot(digit[i]);
      }
      --i;
    }
  }

  <span class="hljs-keyword">return</span> result;

  <span class="hljs-comment">// 返回中文大写数字对应的阿拉伯数字</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNumber</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; zh.length; i++) {
      <span class="hljs-keyword">if</span> (zh[i] == num) {
        <span class="hljs-keyword">return</span> i;
      }
    }
  }

  <span class="hljs-comment">// 取单位</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUnit</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = unit.length; i &gt; <span class="hljs-number">0</span>; i--) {
      <span class="hljs-keyword">if</span> (num == unit[i - <span class="hljs-number">1</span>]) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">4</span> - i);
      }
    }
  }

  <span class="hljs-comment">// 取分段</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQuot</span>(<span class="hljs-params">q</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; quot.length; i++) {
      <span class="hljs-keyword">if</span> (q == quot[i]) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, (i + <span class="hljs-number">1</span>) * <span class="hljs-number">4</span>);
      }
    }
  }
}</code></pre>
<p>说明：代码仅供参考，作者只写了一些特殊数字和随机数字进行测试，不能保证百分百准确，如果有问题请留言反馈。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript阿拉伯数字与中文数字互相转换

## 原文链接
[https://segmentfault.com/a/1190000008962568](https://segmentfault.com/a/1190000008962568)

