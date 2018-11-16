---
title: JavaScript 日期权威指南
hidden: true
categories: [reprint]
slug: fc1b6dd6
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h2>简介</h2>
<p>使用日期可以<em>complicated</em>。无论技术如何，开发人员都会感受到痛苦。</p>
<p><img src="https://p0.ssl.qhimg.com/t01f54972ca98db5b5e.png" alt=""></p>
<p>JavaScript通过强大的对象为我们提供日期处理功能：日期。</p>
<blockquote>
<p>本文确实_不是_谈论 <a href="http://momentjs.com"><strong>Moment.js</strong></a> ，我认为它是处理日期的最佳库，你应该在处理日期时几乎总是使用它。</p>
</blockquote>
<h2>Date对象</h2>
<p>Date对象实例表示单个时间点。</p>
<p>尽管被命名为Date，它也处理<strong>时间</strong>。</p>
<h2>初始化Date对象</h2>
<p>我们使用初始化Date对象</p>
<pre><code class="hljs gauss"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()


</code></pre><p>这将创建一个指向当前时刻的Date对象。</p>
<p>在内部，日期以1970年1月1日（UTC）以来的毫秒数表示。这个日期很重要，因为就计算机而言，这就是一切开始的地方。</p>
<p>您可能熟悉UNIX时间戳：它表示自该着名日期以来经过的<em>seconds</em>数。</p>
<blockquote>
<p>重要：UNIX时间戳的原因以秒为单位。JavaScript以毫秒为单位记录原因。</p>
</blockquote>
<p>如果我们有UNIX时间戳，我们可以使用实例化JavaScript Date对象</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> timestamp = <span class="hljs-number">1530826365</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timestamp * <span class="hljs-number">1000</span>)


</code></pre><p>如果我们传递0，我们将得到一个Date对象，表示1970年1月1日（UTC）的时间：</p>
<pre><code class="hljs gauss"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>)


</code></pre><p>如果我们传递一个字符串而不是一个数字，那么Date对象使用parse方法来确定您传递的日期。例子：</p>
<pre><code class="hljs haxe"><span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018-07-22'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018-07'</span>) <span class="hljs-comment">//July 1st 2018, 00:00:00</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018'</span>) <span class="hljs-comment">//Jan 1st 2018, 00:00:00</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'07/22/2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018/07/22'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018/7/22'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018-07-22 07:22:13'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018-07-22T07:22:13'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'25 March 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'25 Mar 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'25 March, 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'March 25, 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'March 25 2018'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'March 2018'</span>) <span class="hljs-comment">//Mar 1st 2018, 00:00:00</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018 March'</span>) <span class="hljs-comment">//Mar 1st 2018, 00:00:00</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018 MARCH'</span>) <span class="hljs-comment">//Mar 1st 2018, 00:00:00</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2018 march'</span>) <span class="hljs-comment">//Mar 1st 2018, 00:00:00</span>


</code></pre><p>这里有很多灵活性。您可以在几个月或几天内添加或省略前导零。</p>
<p>小心月/日的位置，或者你可能最终将月份误解为当天。</p>
<p>你也可以使用Date.parse：</p>
<pre><code class="hljs 1c">Date.parse('<span class="hljs-number">2018-07-22</span>')
Date.parse('<span class="hljs-number">2018-07</span>') <span class="hljs-comment">//July 1st 2018, 00:00:00</span>
Date.parse('<span class="hljs-number">2018</span>') <span class="hljs-comment">//Jan 1st 2018, 00:00:00</span>
Date.parse('07/22/<span class="hljs-number">2018</span>')
Date.parse('<span class="hljs-number">2018/07/22</span>')
Date.parse('<span class="hljs-number">2018</span>/7/22')
Date.parse('July 22, <span class="hljs-number">2018</span>')
Date.parse('July 22, <span class="hljs-number">2018</span> 07:22:13')
Date.parse('<span class="hljs-number">2018-07-22</span> 07:22:13')
Date.parse('<span class="hljs-number">2018-07-22</span>T07:22:13')


</code></pre><p>Date.parse将返回一个时间戳（以毫秒为单位）而不是Date对象。</p>
<p>您还可以传递一组代表日期各部分的有序值：年，月（从0开始），日，小时，分钟，秒和毫秒：</p>
<pre><code class="hljs lsl">new Date(<span class="hljs-number">2018</span>, <span class="hljs-number">6</span>, <span class="hljs-number">22</span>, <span class="hljs-number">7</span>, <span class="hljs-number">22</span>, <span class="hljs-number">13</span>, <span class="hljs-number">0</span>)
new Date(<span class="hljs-number">2018</span>, <span class="hljs-number">6</span>, <span class="hljs-number">22</span>)


</code></pre><p>最小值应该是3个参数，但是大多数JavaScript引擎的解释都比这些少：</p>
<pre><code class="hljs gauss"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2018</span>, <span class="hljs-number">6</span>) <span class="hljs-comment">//Sun Jul 01 2018 00:00:00 GMT+0200 (Central European Summer Time)</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2018</span>) <span class="hljs-comment">//Thu Jan 01 1970 01:00:02 GMT+0100 (Central European Standard Time)</span>


</code></pre><p>在任何这些情况下，生成的日期都相对于计算机的时区。这意味着<strong>两台不同的计算机可能会为同一日期对象</strong>输出不同的值。</p>
<p>JavaScript没有任何关于时区的信息，会将日期视为UTC，并自动执行到当前计算机时区的转换。</p>
<p>因此，总结一下，您可以通过4种方式创建新的Date对象</p>
<ul>
<li><p><strong>不传参数</strong>，创建一个表示“现在”的Date对象</p>
</li>
<li><p>传递<strong>number</strong>，表示从格林威治标准时间1970年1月1日00:00开始的毫秒数</p>
</li>
<li><p>传递一个<strong>字符串</strong>，代表一个日期</p>
</li>
<li><p>传递一组<strong>参数</strong>，它们代表日期的不同部分</p>
</li>
</ul>
<h2>时区</h2>
<p>初始化日期时，您可以传递时区，因此日期不会被假定为UTC，然后转换为您当地的时区。</p>
<p>您可以通过以+ HOURS格式添加时区来指定时区，或者通过添加括在括号中的时区名称来指定时区：</p>
<pre><code class="hljs haxe"><span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13 +0700'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13 (CET)'</span>)


</code></pre><p>如果在括号中指定了错误的时区名称，则JavaScript将默认为UTC而不会报错。</p>
<p>如果您指定了错误的数字格式，JavaScript将报“无效日期”的错误。</p>
<h2>日期转换和格式设置</h2>
<p>给定Date对象，有很多方法将从该日期生成一个字符串：</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)

<span class="hljs-built_in">date</span>.toString() <span class="hljs-comment">// "Sun Jul 22 2018 07:22:13 GMT+0200 (Central European Summer Time)"</span>
<span class="hljs-built_in">date</span>.toTimeString() <span class="hljs-comment">//"07:22:13 GMT+0200 (Central European Summer Time)"</span>
<span class="hljs-built_in">date</span>.toUTCString() <span class="hljs-comment">//"Sun, 22 Jul 2018 05:22:13 GMT"</span>
<span class="hljs-built_in">date</span>.toDateString() <span class="hljs-comment">//"Sun Jul 22 2018"</span>
<span class="hljs-built_in">date</span>.toISOString() <span class="hljs-comment">//"2018-07-22T05:22:13.000Z" (ISO 8601 format)</span>
<span class="hljs-built_in">date</span>.toLocaleString() <span class="hljs-comment">//"22/07/2018, 07:22:13"</span>
<span class="hljs-built_in">date</span>.toLocaleTimeString()    <span class="hljs-comment">//"07:22:13"</span>
<span class="hljs-built_in">date</span>.getTime() <span class="hljs-comment">//1532236933000</span>
<span class="hljs-built_in">date</span>.getTime() <span class="hljs-comment">//1532236933000</span>


</code></pre><h2>Date对象的getter方法</h2>
<p>Date对象提供了几种检查其值的方法。这些都取决于计算机的当前时区：</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)

<span class="hljs-built_in">date</span>.getDate() <span class="hljs-comment">//22</span>
<span class="hljs-built_in">date</span>.getDay() <span class="hljs-comment">//0 (0 means sunday, 1 means monday..)</span>
<span class="hljs-built_in">date</span>.getFullYear() <span class="hljs-comment">//2018</span>
<span class="hljs-built_in">date</span>.getMonth() <span class="hljs-comment">//6 (starts from 0)</span>
<span class="hljs-built_in">date</span>.getHours() <span class="hljs-comment">//7</span>
<span class="hljs-built_in">date</span>.getMinutes() <span class="hljs-comment">//22</span>
<span class="hljs-built_in">date</span>.getSeconds() <span class="hljs-comment">//13</span>
<span class="hljs-built_in">date</span>.getMilliseconds() <span class="hljs-comment">//0 (not specified)</span>
<span class="hljs-built_in">date</span>.getTime() <span class="hljs-comment">//1532236933000</span>
<span class="hljs-built_in">date</span>.getTimezoneOffset() <span class="hljs-comment">//-120 (will vary depending on where you are and when you check - this is CET during the summer). Returns the timezone difference expressed in minutes</span>


</code></pre><p>这些方法有等效的UTC版本，它们返回UTC值而不是适合您当前时区的值：</p>
<pre><code class="hljs axapta"><span class="hljs-keyword">date</span>.getUTCDate() <span class="hljs-comment">//22</span>
<span class="hljs-keyword">date</span>.getUTCDay() <span class="hljs-comment">//0 (0 means sunday, 1 means monday..)</span>
<span class="hljs-keyword">date</span>.getUTCFullYear() <span class="hljs-comment">//2018</span>
<span class="hljs-keyword">date</span>.getUTCMonth() <span class="hljs-comment">//6 (starts from 0)</span>
<span class="hljs-keyword">date</span>.getUTCHours() <span class="hljs-comment">//5 (not 7 like above)</span>
<span class="hljs-keyword">date</span>.getUTCMinutes() <span class="hljs-comment">//22</span>
<span class="hljs-keyword">date</span>.getUTCSeconds() <span class="hljs-comment">//13</span>
<span class="hljs-keyword">date</span>.getUTCMilliseconds() <span class="hljs-comment">//0 (not specified)</span>


</code></pre><h2>编辑日期</h2>
<p>Date对象提供了几种编辑日期值的方法：</p>
<pre><code class="hljs haxe">const date = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)

date.setDate(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setDay(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setFullYear(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>) <span class="hljs-comment">//note: avoid setYear(), it's deprecated</span>
date.setMonth(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setHours(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setMinutes(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setSeconds(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setMilliseconds(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setTime(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setTimezoneOffset(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)


</code></pre><blockquote>
<p>setDay和setMonth从0开始编号，因此例如March是2月。</p>
</blockquote>
<p>有趣的事实：那些方法“重叠”，所以如果你，例如，设置date.setHours（48），它也会增加一天。</p>
<p>你可以在setHours（）中添加多个参数来设置分钟，秒和毫秒：setHours（0,0,0,0） - 这同样适用于setMinutes和setSeconds。</p>
<p>至于get_，set_方法也有UTC等价物：</p>
<pre><code class="hljs haxe">const date = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)

date.setUTCDate(<span class="hljs-keyword">new</span><span class="hljs-type">alue</span>)
date.setUTCDay(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCFullYear(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCMonth(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCHours(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCMinutes(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCSeconds(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)
date.setUTCMilliseconds(<span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)


</code></pre><h2>获取当前时间戳</h2>
<p>如果要以毫秒为单位获取当前时间戳，可以使用速记</p>
<pre><code class="hljs vbscript"><span class="hljs-built_in">Date</span>.<span class="hljs-built_in">now</span>()


</code></pre><p>代替：</p>
<pre><code class="hljs pony"><span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>().<span class="hljs-title">getTime</span>()


</span></code></pre><h2>JavaScript 关于日期的容错处理</h2>
<p>请注意。如果您使用天数计算超过一个月，则不会出现错误，日期将转到下个月：</p>
<pre><code class="hljs lsl">new Date(<span class="hljs-number">2018</span>, <span class="hljs-number">6</span>, <span class="hljs-number">40</span>) <span class="hljs-comment">//Thu Aug 09 2018 00:00:00 GMT+0200 (Central European Summer Time)</span>


</code></pre><p>数月，小时，分钟，秒和毫秒都是如此。</p>
<h2>根据区域设置格式化日期</h2>
<p>现代浏览器中的<a href="https://caniuse.com/internationalization">支持良好</a>国际化API（值得注意的例外：UC浏览器）允许您翻译日期。</p>
<p>它是由Intl Object 暴露出来的，这也有助于本地化数字，字符串。</p>
<p>我来看看Intl.DateTimeFormat（）。</p>
<p>以下是如何使用它。</p>
<p>根据计算机默认区域设置格式化日期：</p>
<pre><code class="hljs qml"><span class="hljs-comment">// "12/22/2017"</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.DateTimeFormat().format(<span class="hljs-built_in">date</span>) <span class="hljs-comment">//"22/07/2018" in my locale</span>


</code></pre><p>根据不同的区域设置格式化日期：</p>
<pre><code class="hljs livecodeserver"><span class="hljs-built_in">new</span> Intl.DateTimeFormat(<span class="hljs-string">'en-US'</span>).<span class="hljs-built_in">format</span>(<span class="hljs-built_in">date</span>)<span class="hljs-comment"> //"7/22/2018"</span>


</code></pre><p>Intl.DateTimeFormat方法采用可选参数，允许您自定义输出显示小时，分钟和秒：</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> options = {
  <span class="hljs-built_in">year</span>: <span class="hljs-string">'numeric'</span>,
  <span class="hljs-built_in">month</span>: <span class="hljs-string">'numeric'</span>,
  <span class="hljs-built_in">day</span>: <span class="hljs-string">'numeric'</span>,
  <span class="hljs-built_in">hour</span>: <span class="hljs-string">'numeric'</span>,
  <span class="hljs-built_in">minute</span>: <span class="hljs-string">'numeric'</span>,
  <span class="hljs-built_in">second</span>: <span class="hljs-string">'numeric'</span>
}

<span class="hljs-keyword">new</span> Intl.DateTimeFormat(<span class="hljs-string">'en-US'</span>, options).format(date) <span class="hljs-comment">//"7/22/2018, 7:22:13 AM"</span>
<span class="hljs-keyword">new</span> Intl.DateTimeFormat(<span class="hljs-string">'it-IT'</span>, options2).format(date) <span class="hljs-comment">//"22/7/2018, 07:22:13"</span>


</code></pre><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat">这里是您可以使用的所有属性的参考</a>。</p>
<h2>比较两个日期</h2>
<p>您可以使用Date.getTime（）计算两个日期之间的差异：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> date1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 10, 2018 07:22:13'</span>)
<span class="hljs-keyword">const</span> date2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 22, 2018 07:22:13'</span>)
<span class="hljs-keyword">const</span> diff = date2.getTime() - date1.getTime() <span class="hljs-comment">//difference in milliseconds</span>


</code></pre><p>以同样的方式，您可以检查两个日期是否相等：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> date1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 10, 2018 07:22:13'</span>)
<span class="hljs-keyword">const</span> date2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'July 10, 2018 07:22:13'</span>)
<span class="hljs-keyword">if</span> (date2.getTime() === date1.getTime()) {
  <span class="hljs-comment">//dates are equal</span>
}


</code></pre><p>请记住，getTime（）返回的毫秒数，因此您需要在比较中考虑时间因素。2018年7月10日07:22:13 不等于2018年7月10日。在这种情况下，您可以使用setHours（0,0,0,0）重置时间。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/the-definitive-guide-to-javascript-dates](https://www.zcfy.cc/article/the-definitive-guide-to-javascript-dates)
原文标题: JavaScript 日期权威指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
