---
title: '给初学者：JavaScript 的常见注意点' 
date: 2018-12-18 2:30:11
hidden: true
slug: jli1ciwuzmg
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000012463583">上篇</a>说了一些 JS 中数组操作的常见误区，这次来总结一下初学者常见的其他易错点。</p>
<h2 id="articleHeader0">写立即执行函数时前置 void</h2>
<p>立即执行函数（IIFE）在 JS 非常常用，作用就是构造一个函数级的变量作用域。常见的写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
  // code
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// code</span>
})();</code></pre>
<p>这样写可能会被 JS 理解成为一个函数调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
(function () { // Uncaught TypeError: 1 is not a function
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// Uncaught TypeError: 1 is not a function</span>
})()</code></pre>
<p>从今天改变习惯，这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void function () {
  // code
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// code</span>
}();</code></pre>
<p>有些人喜欢以 <code>!</code> 打头，个人习惯问题。</p>
<p>在 <a href="https://standardjs.com/readme-zhcn.html" rel="nofollow noreferrer" target="_blank">standardjs</a> 规范日益流行的今天，忽略行尾分号成为了主流（但是笔者不喜欢），更要改变这个习惯</p>
<p>注：standardjs 本身禁止行首括号（<a href="https://standardjs.com/readme-zhcn.html#user-content-%E7%BB%86%E5%88%99" rel="nofollow noreferrer" target="_blank">https://standardjs.com/readme...</a>）</p>
<h2 id="articleHeader1">检查一个变量是否为对象之前，首先判断其值是否为 null</h2>
<p>虽然不愿承认，JS 标准说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof null === 'object' // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span> === <span class="hljs-string">'object'</span> <span class="hljs-comment">// true</span></code></pre>
<p>毋庸置疑的，<code>null</code> 不具备作为对象类型的基本特征，是原始类型。这是一个广为人知的 JS 的 bug，，它从 JS 诞生开始就存在，从未、而且永远不会被修复</p>
<p>我们不必去探究它的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#null" rel="nofollow noreferrer" target="_blank">黑历史</a>，但是我们写代码时判断一个变量的类型时，首先需要判断它是否为 <code>null</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (someVal !== null &amp;&amp; typeof someVal === 'object') {
  // someVal 是一个对象
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (someVal !== <span class="hljs-literal">null</span> &amp;&amp; <span class="hljs-keyword">typeof</span> someVal === <span class="hljs-string">'object'</span>) {
  <span class="hljs-comment">// someVal 是一个对象</span>
}</code></pre>
<h2 id="articleHeader2">做数值计算时，注意 JS 数值类型的精度</h2>
<p>在 JS 里，所有的 number 原始值都是一个双精度浮点数，对应 Java 的 double 类型，对应标准 IEEE754。小心它的精度问题。</p>
<h3 id="articleHeader3">做整数处理时，注意数值的大小</h3>
<p>JS 最大可存储的安全整数（不存在精度问题）为 9007199254740991 (16位，Number.MAX_SAFE_INTEGER )，注意比 Java 的 long 类型最大整数 9223372036854775807 (19位) 小几个数量级，所以有时 JS 的 number 类型是不能精确存储 Java 的整数的（当然通常情况下不是问题）。</p>
<p>问题通常出在前后端数据传输上。数据库中的主键通常是一个自增长的长整型数，有可能会超出 JS 的安全整数范围，这时请考虑使用字符串传输。</p>
<h3 id="articleHeader4">做小数计算时，注意浮点数的精度问题</h3>
<p>例如：0.1+0.2 =&gt; 0.30000000000000004，0.4-0.3 =&gt; 0.10000000000000003</p>
<p>将小数转化为字符串时，永远记得使用 toFixed 取小数点后若干位数字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(0.1 + 0.2).toFixed(2) === '0.30'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>).toFixed(<span class="hljs-number">2</span>) === <span class="hljs-string">'0.30'</span></code></pre>
<p>比较小数相等时，切记不要直接使用 <code>===</code>，而要使用相减取绝对值的方式（表示两数相差在一定范围内即认为他们相等）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1+0.2 === 0.3 // false
Math.abs(0.1+0.2 - 0.3) <= 1e-10 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0.1</span>+<span class="hljs-number">0.2</span> === <span class="hljs-number">0.3</span> <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Math</span>.abs(<span class="hljs-number">0.1</span>+<span class="hljs-number">0.2</span> - <span class="hljs-number">0.3</span>) &lt;= <span class="hljs-number">1e-10</span> <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader5">NaN !== NaN</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN" rel="nofollow noreferrer" target="_blank">NaN</a> 之所以 NB，因为它有一个独一无二的特性。对！独一无二！那就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN // false
var a = NaN; a === a // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-literal">NaN</span>; a === a <span class="hljs-comment">// false</span></code></pre>
<p><code>NaN</code> 不等于它自己。你可以使用这个特性判断一个变量是否为 <code>NaN</code>，一个变量如果不等于它自己，这个变量一定是 <code>NaN</code>。</p>
<p>还有一个方式是使用 <code>Number.isNaN</code>。注意如果不已知这个变量的类型是数字时，不要使用 <code>isNaN</code> 做判断，因为 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN" rel="nofollow noreferrer" target="_blank">isNaN</a> 有个很诡异的特性：它会先将待判断的变量转换为数值类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN('abc') // true
isNaN('123') // false
isNaN('') // false
isNaN([]) // false
isNaN({}) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'abc'</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'123'</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">''</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">isNaN</span>([]) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">isNaN</span>({}) <span class="hljs-comment">// true</span></code></pre>
<p>永远不要写 <code>someVal === NaN</code></p>
<h2 id="articleHeader6">正确使用 parseInt</h2>
<p>首先parseInt接受两个参数，第一个参数为待parse的字符串（如果不是字符串则会首先转换为字符串）；第二个参数为使用的进制数。</p>
<p>如果不传第二个参数，则进制由第一个参数决定。什么意思呢？比如以 0x 开头的字符串，会被解析为16进制数。</p>
<p>我们知道以数字 <code>0</code> 开头的数字为8进制数（非严格模式），比如 011 === 9，0 本身也是8进制数。那么问题来了， parseInt('011') = ?</p>
<p>答案是看浏览器。目前绝大多数浏览器都会作为10进制数解析，结果为11。但是还有一些老旧的浏览器以8进制数解析（例如IE8和一批老Android浏览器）</p>
<p><span class="img-wrap"><img data-src="/img/bV1zJO?w=858&amp;h=250" src="https://static.alili.tech/img/bV1zJO?w=858&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以如果你非要用 parseInt：</p>
<h3 id="articleHeader7">
<code>parseInt</code> 使用规则一：请传入第二个参数</h3>
<p>回到 parseInt 本身的含义。顾名思义这个函数是在parse，被parse的一定是个字符串。如果第一个参数不是字符串，那么会首先被转换为字符串。</p>
<p>问：<code>parseInt(0.0000000008)</code> =?</p>
<p>答：</p>
<ol>
<li>String(0.0000000008) =&gt; '8e-10'</li>
<li>parseInt('8e-10') =&gt; 8</li>
</ol>
<p>自己打开调试器去试</p>
<h3 id="articleHeader8">parseInt使用规则二：永远不要使用parseInt给小数取整</h3>
<p>建议对于数值转换一概使用强制转换函数 Number，如果你JS用6了可以使用 <code>+</code>（正号）。<br>如果需要对某个数字取整，建议使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc" rel="nofollow noreferrer" target="_blank">Math.trunc</a>。如果你能确定数值在 32 位以内，可以使用 <code>x | 0</code> 或 <code>~~x</code> 等方式</p>
<p><span class="img-wrap"><img data-src="/img/bV1zTL?w=1920&amp;h=726" src="https://static.alili.tech/img/bV1zTL?w=1920&amp;h=726" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>parseInt的用处在于转换一些CSS里带单位的值：<code>parseInt('10px', 10)</code> =&gt; 10。但这里建议使用parseFloat，可以解析小数又没有进制问题。</p>
<h2 id="articleHeader9">除了用于比较 null 或 undefined，永远不要使用非严格相等 <code>==</code>
</h2>
<p>绝不要简单的把非严格相等 <code>==</code> 理解为两者表示的数字一样，它有一套非常复杂的转换规则：它会先将 <code>%%</code> 转换为 <code>@@</code>，然后把 <code>!!</code> 转换为 <code>**</code>，如果 <code>%%</code> 是 <code>??</code> 类型，还会 <code>xx</code> 一把……</p>
<p>看不懂对吧，我相信你就算看懂了也记不住的。不然请问：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'true' == true // => false
'true' == false // => false
[] == {} // => false
[] == [] // => false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'true'</span> == <span class="hljs-literal">true</span> <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-string">'true'</span> == <span class="hljs-literal">false</span> <span class="hljs-comment">// =&gt; false</span>
[] == {} <span class="hljs-comment">// =&gt; false</span>
[] == [] <span class="hljs-comment">// =&gt; false</span></code></pre>
<p>关于非严格相等，你只需要记住这个规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null == null // => true
undefined == undefined  // => true
null == undefined // => true
undefined == null // => true
x == null // => false (x 非 null 或 undefined）
x == undefined // => false (x 非 null 或 undefined）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">null</span> == <span class="hljs-literal">null</span> <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-literal">undefined</span> == <span class="hljs-literal">undefined</span>  <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-literal">undefined</span> == <span class="hljs-literal">null</span> <span class="hljs-comment">// =&gt; true</span>
x == <span class="hljs-literal">null</span> <span class="hljs-comment">// =&gt; false (x 非 null 或 undefined）</span>
x == <span class="hljs-literal">undefined</span> <span class="hljs-comment">// =&gt; false (x 非 null 或 undefined）</span></code></pre>
<p>简言之：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x == null // 或 x == undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">x == <span class="hljs-literal">null</span> <span class="hljs-comment">// 或 x == undefined</span></code></pre>
<p>是最简单的判断 x 为 null 或 undefined 的方式，相对应的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x != null // 或 x != undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">x != <span class="hljs-literal">null</span> <span class="hljs-comment">// 或 x != undefined</span></code></pre>
<p>是最简单的判断 x 非 null 和 undefined 的方式。这就是 <code>==</code> 存在的唯一意义。</p>
<h2 id="articleHeader10">日期处理</h2>
<h3 id="articleHeader11">new Date(year, month, day) 注意其参数的数值范围</h3>
<p>由于<a href="http://zh.cppreference.com/w/c/chrono/tm" rel="nofollow noreferrer" target="_blank">可能的历史传承原因</a>，JS 内置对象 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date" rel="nofollow noreferrer" target="_blank">Date</a> 的构造函数比较特殊。</p>
<ol>
<li>如果 <code>year</code> 是 0 ~ 99 之间，year 默认加 1900。比如 1 代表公元 1901 年，99 代表公元 1999 年，100 代表公元 100 年。（你问 -1 是几？公元前 1 年。。。）</li>
<li>
<code>month</code> 从 0 开始算。0 代表一月，1 代表二月，以此类推。12 代表下一年的一月（自动进位）</li>
</ol>
<p>第一点不知道也没什么，毕竟一般不会操作公元 99 年之前的时间。但第二点就很容易出错，切记它是以 0 开始的数字。</p>
<p>这样得到的日期对象是本地时间（采用客户端时区）</p>
<h3 id="articleHeader12">new Date(dateString) 注意浏览器时区问题以及浏览器兼容性</h3>
<p>时常有后端接口返回一个日期字符串的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date('2018-01-01') // => &quot;2018/1/1 08:00:00&quot; 新版浏览器，IE 11
new Date('2018-01-01') // => &quot;2018/1/1 00:00:00&quot; 某些旧版安卓
new Date('2018-01-01') // => &quot;Invalid Date&quot; IE 8（这个忽略。。。）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018-01-01'</span>) <span class="hljs-comment">// =&gt; "2018/1/1 08:00:00" 新版浏览器，IE 11</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018-01-01'</span>) <span class="hljs-comment">// =&gt; "2018/1/1 00:00:00" 某些旧版安卓</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018-01-01'</span>) <span class="hljs-comment">// =&gt; "Invalid Date" IE 8（这个忽略。。。）</span></code></pre>
<p>可以看到，浏览器基本都是把日期字符串当做 UTC 时间处理的。而</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date('2018/01/01') // => &quot;2018/1/1 00:00:00&quot; 包括 IE 8 在内所有浏览器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018/01/01'</span>) <span class="hljs-comment">// =&gt; "2018/1/1 00:00:00" 包括 IE 8 在内所有浏览器</span></code></pre>
<p>所以对于日期字符串，请注意字符串中是使用横杠还是斜杠。对于横杠可以考虑将 <code>-</code> 替换成 <code>/</code>，或者补全完整的带时区的 ISO8601 字符串。考虑到负数时区的问题，不推荐将小时数清零的做法。</p>
<p>PS：将日期对象取当天 0 点为 <code>date.setHours(0, 0, 0, 0)</code><br>PS2：取当前时间的 Unix 时间戳可以 <code>Date.now()</code></p>
<p><span class="img-wrap"><img data-src="/img/bV1z0d?w=1920&amp;h=726" src="https://static.alili.tech/img/bV1z0d?w=1920&amp;h=726" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">补：慎用 <code>||</code> 填充默认值</h2>
<p>这反而是 JS 老鸟更容易犯的错误。给用户传入的对象填充默认值是很常见的行为，他们总是随手就写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.prop1 = config.prop1 || 233;
config.prop2 = config.prop2 || 'balabala';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.prop1 = config.prop1 || <span class="hljs-number">233</span>;
config.prop2 = config.prop2 || <span class="hljs-string">'balabala'</span>;</code></pre>
<p><code>expr1 || expr2</code> 的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators" rel="nofollow noreferrer" target="_blank">意思</a>是：如果expr1能转换成true则返回expr1，否则返回expr2</p>
<p><code>expr1 || expr2 &lt;=&gt; Boolean(expr1) ? expr1 : expr2</code></p>
<p>哪些值不能转换为 true 呢？</p>
<ol>
<li>null</li>
<li>undefined</li>
<li>NaN</li>
<li>0 !!!</li>
<li>空字符串（''） !!!</li>
</ol>
<p>如果用户指定了传入参数的值为 0 或者是空字符串的配置项，它的值就会被强制替换为默认值，然而实际上只有 <code>undefined</code> 应该被认为是用户没有指定其值（语义上可以这样理解：<code>null</code> 表示 <code>用户让你给他把这个位置空着</code>；而 <code>undefined</code> 表示 <code>用户没发表意见</code>）</p>
<p>所以就应该是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.prop1 = config.prop1 !== undefined ? config.prop1 : 233;
config.prop2 = config.prop2 !== undefined ? config.prop2 : 'balabala';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.prop1 = config.prop1 !== <span class="hljs-literal">undefined</span> ? config.prop1 : <span class="hljs-number">233</span>;
config.prop2 = config.prop2 !== <span class="hljs-literal">undefined</span> ? config.prop2 : <span class="hljs-string">'balabala'</span>;</code></pre>
<p>很长。。。你可以搞个全局的函数简化这一操作，或者考虑使用 lodash 的 <a href="https://lodash.com/docs/4.17.4#defaults" rel="nofollow noreferrer" target="_blank">defaults</a> 方法</p>
<h2 id="articleHeader14">完</h2>
<p>欢迎补充</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给初学者：JavaScript 的常见注意点

## 原文链接
[https://segmentfault.com/a/1190000012730162](https://segmentfault.com/a/1190000012730162)

