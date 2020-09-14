---
title: 'JavaScript进阶学习（一）—— 基于正则表达式的简单js模板引擎实现' 
date: 2019-02-08 2:30:40
hidden: true
slug: puvs69e3swb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>文章来源：小青年原创</strong><br><strong>发布时间：2016-06-26</strong><br><strong>关键词：JavaScript，正则表达式，js模板引擎</strong><br><strong>转载需标注本文原始地址: <a href="http://zhaomenghuan.github.io/#!/blog/20160626" rel="nofollow noreferrer" target="_blank">http://zhaomenghuan.github.io...</a></strong></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>这年头MVC、MVVM框架泛滥，很多时候我们只是用了这些框架，有时候想深入去了解这些框架背后的原理实现时，阅读源码时发现无从下手，js基本功简直渣渣，所以想利用业余时间还是要补补基础。以前看JavaScript的一些书籍时总是把正则表达式这一章跳过了，遇到一些需要写正则的时候然后都是各种copy，js要进阶感觉还是要系统学习一下正则，虽然看起来像乱码一样的匹配规则，但是如果熟练使用会很有用，那么今天就先从正则开始吧！和大部分书籍一样，本文前篇也会是讲解基础，本文的很多内容都是摘自网络进行整理，有些内容需要各位自己进行实践验证。</p>
<h2 id="articleHeader1">正则表达式</h2>
<p>正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。搜索模式可用于文本搜索和文本替换。</p>
<h3 id="articleHeader2">基本语法</h3>
<p>RegExp 构造函数可创建一个正则表达式对象，用特定的模式匹配文本。创建一个正则对象的两种方法：字面量和构造函数。要表示字符串，字面量形式不使用引号，而传递给构造函数的参数使用引号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="字面量: /pattern/flags
构造函数: RegExp(pattern [, flags])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>字面量: /<span class="hljs-built_in">pattern</span>/flags
构造函数: RegExp(<span class="hljs-built_in">pattern</span> [, flags])</code></pre>
<ul>
<li><p>pattern 正则表达式文本</p></li>
<li>
<p>flags 该参数可以是下面单个值或者几个值的任意组合：</p>
<ul>
<li><p>g 全局匹配</p></li>
<li><p>i 忽略大小写</p></li>
<li><p>gi或ig 全局匹配、忽略大小写</p></li>
<li><p>m 多行查找，让开始和结束字符<code>（^ 和 $）</code>工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 n 或 r 分割的），而不只是整个输入字符串的最开始和最末尾处。</p></li>
<li><p>u Unicode。将模式视为Unicode码位（code points）序列。</p></li>
<li><p>y sticky。使用隐式的^锚点把正则锚定在了lastIndex所指定的偏移位置处，具体可以看看这篇文章：<a href="http://www.cnblogs.com/ziyunfei/archive/2012/12/07/2807313.html" rel="nofollow noreferrer" target="_blank">JavaScript:正则表达式的/y标识</a> 。</p></li>
</ul>
</li>
</ul>
<p>具体例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ab+c/i;
new RegExp('ab+c', 'i');
new RegExp(/ab+c/, 'i');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>/ab+c/i;
<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'ab+c'</span>, <span class="hljs-string">'i'</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/ab+c/</span>, <span class="hljs-string">'i'</span>);</code></pre>
<p>当表达式被赋值时，字面量形式提供正则表达式的编译（compilation）状态，当正则表达式保持为常量时使用字面量。例如当你在循环中使用字面量构造一个正则表达式时，正则表达式不会在每一次迭代中都被重新编译（recompiled）。</p>
<p>而正则表达式对象的构造函数，如 new RegExp('ab+c') 提供了正则表达式运行时编译（runtime compilation）。如果你知道正则表达式模式将会改变，或者你事先不知道什么模式，而是从另一个来源获取，如用户输入，这些情况都可以使用构造函数。</p>
<p>从ECMAScript 6开始，当第一个参数为正则表达式而第二个标志参数存在时，new RegExp(/ab+c/, 'i')不再抛出TypeError （“当从其他正则表达式进行构造时不支持标志”）的异常，取而代之，将使用这些参数创建一个新的正则表达式。</p>
<p>当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 ）。比如，以下是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var re = new RegExp(&quot;\\w+&quot;);
var re = /\w+/;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> re = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\\w+"</span>);
<span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/\w+/</span>;</code></pre>
<h3 id="articleHeader3">正则表达式中的特殊字符</h3>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-classes" rel="nofollow noreferrer" target="_blank">字符类别（Character Classes）</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-sets" rel="nofollow noreferrer" target="_blank">字符集合（Character Sets）</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#boundaries" rel="nofollow noreferrer" target="_blank">边界（Boundaries）</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references" rel="nofollow noreferrer" target="_blank">分组（grouping）与反向引用（back references）</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#quantifiers" rel="nofollow noreferrer" target="_blank">数量词（Quantifiers）</a></p></li>
</ul>
<blockquote><p><strong>^</strong>和<strong>$</strong> —— 作用是分别指出一个字符串的开始和结束。</p></blockquote>
<ul>
<li><p>"^The"：表示所有以"The"开始的字符串"There"，"The cat"等；</p></li>
<li><p>"of despair$"：表示所以以"of despair"结尾的字符串；</p></li>
<li><p>"^abc$"：表示开始和结尾都是"abc"的字符串——呵呵，只有"abc"自己了；</p></li>
<li><p>"notice"：表示任何包含"notice"的字符串。</p></li>
</ul>
<p>最后那个例子，如果你不使用两个特殊字符，你就在表示要查找的串在被查找串的任意部分——你并不把它定位在某一个顶端。</p>
<blockquote><p><strong>*</strong>，<strong>+</strong> ， <strong>?</strong> 和 <strong>{}</strong> —— 表示一个或一序列字符重复出现的次数。</p></blockquote>
<p>分别表示“没有或更多”，“一次或更多”，“没有或一次”和指定重复次数的范围。{}必须指定范围的下限，如："{0,2}"而不是"{,2}"。*、+和?相当于{0,}、{1,}和{0,1}。</p>
<ul>
<li><p>"ab*"：表示一个字符串有一个a后面跟着零个或若干个b。（"a", "ab", "abbb",……）；</p></li>
<li><p>"ab+"：表示一个字符串有一个a后面跟着至少一个b或者更多；</p></li>
<li><p>"ab?"：表示一个字符串有一个a后面跟着零个或者一个b；</p></li>
<li><p>"a?b+$"：表示在字符串的末尾有零个或一个a跟着一个或几个b。</p></li>
<li><p>"ab{2}"：表示一个字符串有一个a跟着2个b（"abb"）；</p></li>
<li><p>"ab{2,}"：表示一个字符串有一个a跟着至少2个b；</p></li>
<li><p>"ab{3,5}"：表示一个字符串有一个a跟着3到5个b。</p></li>
</ul>
<blockquote><p><strong>|</strong> —— 表示“或”操作</p></blockquote>
<ul>
<li><p>"hi|hello"：表示一个字符串里有"hi"或者"hello"；</p></li>
<li><p>"(b|cd)ef"：表示"bef"或"cdef"；</p></li>
<li><p>"(a|b)*c"：表示一串"a""b"混合的字符串后面跟一个"c"；</p></li>
</ul>
<blockquote><p><strong>.</strong> —— 可以替代任何字符</p></blockquote>
<ul>
<li><p>"a.[0-9]"：表示一个字符串有一个"a"后面跟着一个任意字符和一个数字；</p></li>
<li><p>"^.{3}$"：表示有任意三个字符的字符串（长度为3个字符）；</p></li>
</ul>
<blockquote><p>[] —— 表示某些字符允许在一个字符串中的某一特定位置出现</p></blockquote>
<ul>
<li><p>"[ab]"：表示一个字符串有一个"a"或"b"（相当于"a|b"）；</p></li>
<li><p>"[a-d]"：表示一个字符串包含小写的'a'到'd'中的一个（相当于"a|b|c|d"或者"[abcd]"）；</p></li>
<li><p>"^[a-zA-Z]"：表示一个以字母开头的字符串；</p></li>
<li><p>"[0-9]%"：表示一个百分号前有一位的数字；</p></li>
<li><p>",[a-zA-Z0-9]$"：表示一个字符串以一个逗号后面跟着一个字母或数字结束。</p></li>
</ul>
<p>可以在方括号里用'^'表示不希望出现的字符，<code>'^'</code>应在方括号里的第一位。（如：<code>%[^a-zA-Z]%</code>表示两个百分号中不应该出现字母）。为了逐字表达，你必须在<code>^.$()|*+?{\</code>这些字符前加上转移字符''。在方括号中，不需要转义字符。</p>
<h3 id="articleHeader4">RegExp对象的属性</h3>
<table>
<thead><tr>
<th align="center">属性</th>
<th align="center">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center">$1-$9</td>
<td align="center">如果它(们)存在，是匹配到的子串</td>
</tr>
<tr>
<td align="center">$_</td>
<td align="center">参见input</td>
</tr>
<tr>
<td align="center">$*</td>
<td align="center">参见multiline</td>
</tr>
<tr>
<td align="center">$&amp;</td>
<td align="center">参见lastMatch</td>
</tr>
<tr>
<td align="center">$+</td>
<td align="center">参见lastParen</td>
</tr>
<tr>
<td align="center">$`</td>
<td align="center">参见leftContext</td>
</tr>
<tr>
<td align="center">$''　　　　　　　　</td>
<td align="center">参见rightContext</td>
</tr>
<tr>
<td align="center">constructor　　　</td>
<td align="center">创建一个对象的一个特殊的函数原型</td>
</tr>
<tr>
<td align="center">global　　　　　　</td>
<td align="center">是否在整个串中匹配(bool型)</td>
</tr>
<tr>
<td align="center">ignoreCase　　　　</td>
<td align="center">匹配时是否忽略大小写(bool型)</td>
</tr>
<tr>
<td align="center">input　　　　　　　</td>
<td align="center">被匹配的串</td>
</tr>
<tr>
<td align="center">lastIndex　　　　</td>
<td align="center">最后一次匹配的索引</td>
</tr>
<tr>
<td align="center">lastParen　　　　</td>
<td align="center">最后一个括号括起来的子串</td>
</tr>
<tr>
<td align="center">leftContext　　　</td>
<td align="center">最近一次匹配以左的子串</td>
</tr>
<tr>
<td align="center">multiline　　　　</td>
<td align="center">是否进行多行匹配(bool型)</td>
</tr>
<tr>
<td align="center">prototype　　　　</td>
<td align="center">允许附加属性给对象</td>
</tr>
<tr>
<td align="center">rightContext　　　</td>
<td align="center">最近一次匹配以右的子串</td>
</tr>
<tr>
<td align="center">source　　　　　　</td>
<td align="center">正则表达式模式</td>
</tr>
<tr>
<td align="center">lastIndex　　　　</td>
<td align="center">最后一次匹配的索引</td>
</tr>
</tbody>
</table>
<p>详情大家可以查看这里：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp" rel="nofollow noreferrer" target="_blank">MDN  JavaScript 标准库 RegExp属性</a></p>
<h3 id="articleHeader5">RegExp对象的方法</h3>
<table>
<thead><tr>
<th align="center">方法</th>
<th align="center">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center">compile　　　</td>
<td align="center">正则表达式比较</td>
</tr>
<tr>
<td align="center">exec　　　　　　　</td>
<td align="center">执行查找</td>
</tr>
<tr>
<td align="center">test　　　　　　　</td>
<td align="center">进行匹配</td>
</tr>
<tr>
<td align="center">toSource　　　　</td>
<td align="center">返回特定对象的定义(literal representing)，其值可用来创建一个新的对象。重载Object.toSource方法得到的。</td>
</tr>
<tr>
<td align="center">toString　　　　    　</td>
<td align="center">返回特定对象的串。重载Object.toString方法得到的。</td>
</tr>
<tr>
<td align="center">valueOf　　　　</td>
<td align="center">返回特定对象的原始值。重载Object.valueOf方法得到</td>
</tr>
</tbody>
</table>
<p>详情大家可以查看这里：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp" rel="nofollow noreferrer" target="_blank">MDN  JavaScript 标准库 RegExp方法</a></p>
<p>不过在这里我们还是需要说明一下的是我们用得比较多的方法主要分为两类：</p>
<h4>RegExp 对象方法</h4>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile" rel="nofollow noreferrer" target="_blank">RegExp.prototype.compile()</a> ——编译正则表达式</p></blockquote>
<p>用法：regexObj.compile(pattern, flags)</p>
<p><strong>功能说明：</strong>compile() 方法用于在脚本执行过程中编译正则表达式，也可用于改变和重新编译正则表达式。该方法可以编译指定的正则表达式，编译之后的正则表达式执行速度将会提高，如果正则表达式多次被调用，那么调用compile方法可以有效的提高代码的执行速度，如果该正则表达式只能被使用一次，则不会有明显的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;Every man in the world! Every woman on earth!&quot;;
var patt=/man/g;
var str2=str.replace(patt,&quot;person&quot;);
document.write(str2+&quot;<br>&quot;);
patt=/(wo)?man/g;
patt.compile(patt); 
str2=str.replace(patt,&quot;person&quot;);
document.write(str2);
结果：
Every person in the world! Every woperson on earth!
Every person in the world! Every person on earth!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> str=<span class="hljs-string">"Every man in the world! Every woman on earth!"</span>;
<span class="hljs-keyword">var</span> patt=<span class="hljs-regexp">/man/g</span>;
<span class="hljs-keyword">var</span> str2=str.replace(patt,<span class="hljs-string">"person"</span>);
<span class="hljs-built_in">document</span>.write(str2+<span class="hljs-string">"&lt;br&gt;"</span>);
patt=<span class="hljs-regexp">/(wo)?man/g</span>;
patt.compile(patt); 
str2=str.replace(patt,<span class="hljs-string">"person"</span>);
<span class="hljs-built_in">document</span>.write(str2);
结果：
Every person <span class="hljs-keyword">in</span> the world! Every woperson <span class="hljs-literal">on</span> earth!
Every person <span class="hljs-keyword">in</span> the world! Every person <span class="hljs-literal">on</span> earth!</code></pre>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec" rel="nofollow noreferrer" target="_blank">RegExp.prototype.exec()</a> —— 检索字符串中指定的值。返回找到的值，并确定其位置。</p></blockquote>
<p>用法：regexObj.exec(str)</p>
<p><strong>功能说明：</strong>exec() 方法如果成功匹配，exec 方法返回一个数组，并且更新正则表达式对象的属性。返回的数组包括匹配的字符串作为第一个元素，紧接着一个元素对应一个成功匹配被捕获的字符串的捕获括号（capturing parenthesis）。（one item for each capturing parenthesis that matched containing the text that was captured.）如果匹配失败，exec 方法将返回  null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;Hello world,hello zhaomenghuan!&quot;;
// look for &quot;Hello&quot;或&quot;hello&quot;
var patt=/hello/gi;
while((result = patt.exec(str))!== null){
    document.write(&quot;result:&quot; + result +&quot;的位置为&quot;+ result.index + &quot;<br />&quot;); 
}
结果：
result:Hello的位置为0
result:hello的位置为12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> str=<span class="hljs-string">"Hello world,hello zhaomenghuan!"</span>;
// look <span class="hljs-keyword">for</span> <span class="hljs-string">"Hello"</span>或<span class="hljs-string">"hello"</span>
<span class="hljs-keyword">var</span> patt=/hello/gi;
<span class="hljs-keyword">while</span>((<span class="hljs-literal">result</span> = patt.exec(str))!== null){
    document.write(<span class="hljs-string">"result:"</span> + <span class="hljs-literal">result</span> +<span class="hljs-string">"的位置为"</span>+ <span class="hljs-literal">result</span>.index + <span class="hljs-string">"&lt;br /&gt;"</span>); 
}
结果：
<span class="hljs-literal">result</span>:<span class="hljs-type">Hello</span>的位置为<span class="hljs-number">0</span>
<span class="hljs-literal">result</span>:hello的位置为<span class="hljs-number">12</span></code></pre>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" rel="nofollow noreferrer" target="_blank">RegExp.prototype.test()</a>    —— 检索字符串中指定的值。返回 true 或 false。</p></blockquote>
<p>用法：regexObj.test(str)</p>
<p><strong>功能说明：</strong>test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中有匹配的值返回 true ，否则返回 false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = /hello/.test('This is a hello world!');
document.write(result);
结果：
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var <span class="hljs-literal">result</span> = /hello/.test('This <span class="hljs-keyword">is</span> a hello world!');
document.<span class="hljs-built_in">write</span>(<span class="hljs-literal">result</span>);
结果：
<span class="hljs-literal">true</span></code></pre>
<h4>支持正则表达式的 String 对象的方法</h4>
<blockquote><p>search —— 检索与正则表达式相匹配的值</p></blockquote>
<p>用法：string.search(searchvalue)</p>
<p>searchvalue    必须。查找的字符串或者正则表达式。</p>
<p><strong>功能说明：</strong>search()方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回 -1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;Mr. Blue has a blue house&quot;;
document.write(str.search(/blue/i));
结果：
4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str=<span class="hljs-string">"Mr. Blue has a blue house"</span>;
<span class="hljs-built_in">document</span>.write(str.search(<span class="hljs-regexp">/blue/i</span>));
结果：
<span class="hljs-number">4</span></code></pre>
<blockquote><p>match —— 找到一个或多个正则表达式的匹配。</p></blockquote>
<p>用法：string.match(regexp)</p>
<p>regexp    必需。规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。返回值类型为Array。</p>
<p><strong>功能说明：</strong>match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。match() 方法将检索字符串 String Object，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;The rain in SPAIN stays mainly in the plain&quot;; 
var match=str.match(/ain/gi);
document.getElementById(&quot;demo&quot;).innerHTML=match;
结果:
ain,AIN,ain,ain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs golo"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">"The rain in SPAIN stays mainly in the plain"</span>; 
<span class="hljs-keyword">var</span> <span class="hljs-keyword">match</span>=str.<span class="hljs-keyword">match</span>(/ain/gi);
document.getElementById(<span class="hljs-string">"demo"</span>).innerHTML=<span class="hljs-keyword">match</span>;
结果:
ain,AIN,ain,ain</code></pre>
<blockquote><p>replace    替换与正则表达式匹配的子串。</p></blockquote>
<p>用法：string.replace(searchvalue,newvalue)</p>
<p>searchvalue    必须。规定子字符串或要替换的模式的 RegExp 对象。<br>请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。<br>newvalue    必需。一个字符串值。规定了替换文本或生成替换文本的函数。<br>返回值为String类型，一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。</p>
<blockquote><p>split    把字符串分割为字符串数组。</p></blockquote>
<p>用法：string.split(separator,limit)</p>
<p>separator    可选。字符串或正则表达式，从该参数指定的地方分割 string Object。<br>limit    可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。<br>返回值为Array类型，一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 string Object 分割成子串创建的。返回的数组中的字串不包括 separator 自身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;How are you doing today?&quot;;
var match = str.split(/ /);
document.write(match);
结果：
How,are,you,doing,today?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> str=<span class="hljs-string">"How are you doing today?"</span>;
<span class="hljs-built_in">var</span> <span class="hljs-built_in">match</span> = str.split(/ /);
document.write(<span class="hljs-built_in">match</span>);
结果：
How,are,you,doing,<span class="hljs-built_in">today</span>?</code></pre>
<h3 id="articleHeader6">正则表达式的应用实例说明</h3>
<blockquote><p>校验是否全由数字组成 —— /^[0-9]{1,20}$/</p></blockquote>
<p>^ 表示打头的字符要匹配紧跟^后面的规则<br>&amp;dollar; 表示打头的字符要匹配紧靠$前面的规则<br>[ ] 中的内容是可选字符集<br>[0-9] 表示要求字符范围在0-9之间<br>{1,20}表示数字字符串长度合法为1到20，即为[0-9]中的字符出现次数的范围是1到20次。</p>
<p>/^ 和 $/成对使用应该是表示要求整个字符串完全匹配定义的规则，而不是只匹配字符串中的一个子串。</p>
<blockquote><p>校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串—— /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/</p></blockquote>
<p>^[a-zA-Z]{1} 表示第一个字符要求是字母。<br>([a-zA-Z0-9]|[._]){4,19} 表示从第二位开始（因为它紧跟在上个表达式后面）的一个长度为4到9位的字符串，它要求是由大小写字母、数字或者特殊字符集[._]组成。</p>
<blockquote><p>校验密码：只能输入6-20个字母、数字、下划线——/^(w){6,20}$/</p></blockquote>
<p>w：用于匹配字母，数字或下划线字符</p>
<blockquote><p>校验普通电话、传真号码：可以“+”或数字开头，可含有“-” 和 “ ”——/^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/</p></blockquote>
<p>d：用于匹配从0到9的数字；<br>“?”元字符规定其前导对象必须在目标对象中连续出现零次或一次<br>可以匹配的字符串如：+123 -999 999 ； +123-999 999 ；123 999 999 ；+123 999999等</p>
<blockquote><p>校验URL——/^http[s]{0,1}://.+&amp;dollar;/ 或 /^http[s]{0,1}://.{1,n}$/ (表示url串的长度为length(“<a>https://</a>”) + n )</p></blockquote>
<p>/ ：表示字符“/”。<br>. 表示所有字符的集<br>+ 等同于{1,}，就是1到正无穷吧。</p>
<blockquote><p>校验纯中文字符——/^[u4E00-u9FA5]+$/</p></blockquote>
<p>[u4E00-u9FA5] ：中文字符集的范围</p>
<p>以上表达式均在下面的javascript中测试通过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot;/>
    <title></title>
</head>
<body>
    <form>
        规则表达式 ： (填写/ /之间的表达式)<br />
        <input type=&quot;input&quot; name=&quot;regxStr&quot; value=&quot;&quot; ><br />
        校验字符串 ：<br />
        <input type=&quot;input&quot; name=&quot;str&quot; value=&quot;&quot; >
        <input type=&quot;button&quot; name=&quot;match&quot; value=&quot;匹配&quot; onClick=&quot;alert(regx(regxStr.value,str.value));&quot;>
    </form>
    <script type=&quot;text/javascript&quot;>
        function regx(r,s){
            if (r == null || r == &quot;&quot;){
               return;
            }
            var patrn= new RegExp(r);
            return patrn.test(s)
        }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
        规则表达式 ： (填写/ /之间的表达式)<span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"regxStr"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        校验字符串 ：<span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"str"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"match"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"匹配"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">"alert(regx(regxStr.value,str.value));"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">regx</span>(<span class="hljs-params">r,s</span>)</span>{
            <span class="hljs-keyword">if</span> (r == <span class="hljs-literal">null</span> || r == <span class="hljs-string">""</span>){
               <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">var</span> patrn= <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(r);
            <span class="hljs-keyword">return</span> patrn.test(s)
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader7">js模板引擎实现原理</h2>
<p>前面我们花了很长的篇幅讲解正则表达式是为了大家看这部分是时候能够有所理解，如果前面的内容一下子没有看懂也没有关系，大家可以先看看这部分的内容回过头去查看刚刚的内容。</p>
<p>我们首先会想到写一个模板，我们常见的是写成这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/html&quot; id=&quot;template&quot;>
    <p>name: "{{"name"}}"</p>
    <p>age: "{{"profile.age"}}"</p>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: </span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: </span><span class="hljs-template-variable">"{{"profile.age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当然也可以使用<code>&lt;template&gt;&lt;/template&gt;</code>标签，而且这个也是现在的流行趋势，拥抱模块化，不过本文不是讲这个标签和模块化，如果大家感兴趣可以看看这两篇文章：</p>
<ul>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2014/07/hello-html5-template-tag/" rel="nofollow noreferrer" target="_blank">HTML5 &lt;template&gt;标签元素简介</a></p></li>
<li><p><a href="http://sentsin.com/web/1089.html" rel="nofollow noreferrer" target="_blank">Web Components 是什么？它为什么对我们这么重要？</a></p></li>
</ul>
<p>大家也可以看下面这个基础例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content&quot;></div>    

<template id=&quot;template&quot;>
    <p>name: 小青年</p>
    <p>age: 22</p>
</template>    

<script type=&quot;text/javascript&quot;>    
    var isSupport='content' in document.createElement('template');
    if (isSupport) {    
        var tpl = document.querySelector('#template');
        var content = document.querySelector(&quot;.content&quot;);
        var clone = document.importNode(tpl.content, true);
        content.appendChild(clone); 
    } else {
        alert(&quot;is not support template&quot;);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: 小青年<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: 22<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>    

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">    
    <span class="hljs-keyword">var</span> isSupport=<span class="hljs-string">'content'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'template'</span>);
    <span class="hljs-keyword">if</span> (isSupport) {    
        <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#template'</span>);
        <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".content"</span>);
        <span class="hljs-keyword">var</span> clone = <span class="hljs-built_in">document</span>.importNode(tpl.content, <span class="hljs-literal">true</span>);
        content.appendChild(clone); 
    } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">"is not support template"</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>回归正题，我们继续说上面的模板，开始写模板引擎。</p>
<h3 id="articleHeader8">基础模板引擎原理讲解</h3>
<p>我们使用js模板引擎，可以认为是在做一个MVC结构的系统，模型(model)－视图(view)－控制器(controller)。控制器(controller)作为中间部分，首先要拿到模型，这里我们需要拿到模板里面与视图相关的内容，如上面的例子中"{{" "}}"中的内容，首先用正则查找：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var re = /"{{"(.+?)"}}"/g;
while((match = re.exec(tpl))!==null) {
     console.log(match);
}
结果：
&quot;"{{"name"}}",name&quot;
&quot;"{{"age"}}",age&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> re = /"{{"(.+?)"}}"/g;
<span class="hljs-keyword">while</span>((<span class="hljs-keyword">match</span> = re.exec(tpl))!==<span class="hljs-built_in">null</span>) {
     console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">match</span>);
}
结果：
<span class="hljs-string">""{{"name"}}",name"</span>
<span class="hljs-string">""{{"age"}}",age"</span></code></pre>
<p><code>/"{{"(.+?)"}}"/g</code>的意思是查找开头为<code>"{{"</code>和结尾为<code>"}}"</code>的子字符串。通过RegExp 对象<code>exec()</code>方法搜索匹配得到的是一个数组，我们可以通过match[0]表示匹配的原字符串，match[1]表示匹配的目标字符串，我们通过执行字符串替换方法就可以得到目标字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;content&quot;></div>
<!--HTML模板(类似MVC中的view)-->
<script type=&quot;text/html&quot; id=&quot;template&quot;>
    <p>name: "{{"name"}}"</p>
    <p>age: "{{"age"}}"</p>
</script>
        
<script type=&quot;text/javascript&quot;>
    // 模板引擎函数(类似MVC中的controller)
    var mtpl = function(tpl, data) {
        var re = /"{{"(.+?)"}}"/g;
        while((match = re.exec(tpl))!==null) {
            if(match[1]){
                tpl = tpl.replace(match[0], data[match[1]])
            }else{
                tpl = tpl.replace(match[0], '')
            }    
        }
        return tpl
    }
    
    // 模板数据(类似MVC中的model)
    var tpl = document.getElementById(&quot;template&quot;).innerHTML;
    document.getElementById(&quot;content&quot;).innerHTML = mtpl(tpl,{
        name: &quot;zhaomenghuan&quot;,
        age: 22
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--HTML模板(类似MVC中的view)--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: </span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: </span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 模板引擎函数(类似MVC中的controller)</span>
    <span class="hljs-keyword">var</span> mtpl = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tpl, data</span>) </span>{
        <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/"{{"(.+?)"}}"/g</span>;
        <span class="hljs-keyword">while</span>((match = re.exec(tpl))!==<span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">if</span>(match[<span class="hljs-number">1</span>]){
                tpl = tpl.replace(match[<span class="hljs-number">0</span>], data[match[<span class="hljs-number">1</span>]])
            }<span class="hljs-keyword">else</span>{
                tpl = tpl.replace(match[<span class="hljs-number">0</span>], <span class="hljs-string">''</span>)
            }    
        }
        <span class="hljs-keyword">return</span> tpl
    }
    
    <span class="hljs-comment">// 模板数据(类似MVC中的model)</span>
    <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"template"</span>).innerHTML;
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"content"</span>).innerHTML = mtpl(tpl,{
        <span class="hljs-attr">name</span>: <span class="hljs-string">"zhaomenghuan"</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里我们通过data['key']的形式取值然后替换模板中的"{{"..."}}"的内容实现了一个内容的替换。上述代码很简单，基本实现了一个字符替换而已，我们上面是通过字符串替换实现了模板和数据的匹配，但是如果我们上面那个<code>json</code>数据是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    base: {
        name: 'zhaomenghuan',
        age: 22    
    },
    skills: ['html5','javascript','android']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> data = {
    <span class="hljs-keyword">base</span>: {
        name: <span class="hljs-string">'zhaomenghuan'</span>,
        age: <span class="hljs-number">22</span>    
    },
    skills: [<span class="hljs-string">'html5'</span>,<span class="hljs-string">'javascript'</span>,<span class="hljs-string">'android'</span>]
}</code></pre>
<p>我们直接通过data[match[1]]进行显然会有问题，我们虽然可以通过data.base['name']获取，但是对于模板引擎函数封装来说是不够完善的，而且也不能执行JavaScript，好像并没有类似于一些有名的js模板引擎库中的语法功能，所以略显low。下面我们在这个基础上进行改造。</p>
<p>下面我们说一下一种最原始的方法，通过Function构造器实现，根据字符串创建一个函数。在一篇文章中看到说这种方法执行JavaScript性能低下，但是对于初学者来说，学习一下实现思路我觉得也是有意义的，毕竟对于新手来说谈性能是件奢侈的事。我们首先看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = new Function(&quot;arg&quot;, &quot;console.log(arg + 1);&quot;); 
fn(2); // outputs 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">"arg"</span>, <span class="hljs-string">"console.log(arg + 1);"</span>)</span></span>; 
fn(<span class="hljs-number">2</span>); <span class="hljs-comment">// outputs 3</span></code></pre>
<p>fn可是一个货真价实的函数，它接受一个参数，函数体是<code>console.log(arg + 1);</code>，上面那个例子等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = function(arg) {
    console.log(arg + 1);
}
fn(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(arg)</span> <span class="hljs-comment">{
    console.log(arg + 1);
}</span>
<span class="hljs-title">fn</span><span class="hljs-params">(2)</span>;</span></code></pre>
<p>我们通过new Function可以将字符串转成JavaScript执行，看起来是不是很すごい（厉害，'sigoyi'，好像还有个单词是‘daijobu’，女朋友每次问我，我每次都是回答‘daijo’，女朋友喜欢看动漫，今天她放假先回家了，舍不得，想想她平时萌萌哒的样子，越是想念，学几个简单单词，下次见面说说，哈哈。）</p>
<p>接着说，我们有时候参数是多个，我们虽然可以输入多个参数，但是这显然不是最好的办法，我们可以使用apply，这样我们不必显式地传参数给这个函数。比如我们前面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    name: 'zhaomenghuan',
    age: 22
}
new Function(&quot;console.log(this.name + ' is ' + this.age +' years old.');&quot;).apply(data);
结果：
&quot;zhaomenghuan is 22 years old.&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> data = {
    name: <span class="hljs-string">'zhaomenghuan'</span>,
    age: <span class="hljs-number">22</span>
}
<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">"console.log(this.name + ' is ' + this.age +' years old.');"</span>)</span>.<span class="hljs-title">apply</span><span class="hljs-params">(data)</span></span>;
结果：
<span class="hljs-string">"zhaomenghuan is 22 years old."</span></code></pre>
<p><code>apply()</code>会自动设定函数执行的上下文，这就是为什么我们能在函数里面使用this.name，这里this指向data对象。这里我们得到什么启示呢？我们考验通过给new Function传入模板字符串和数据生成我们的内容。</p>
<p>我们可以通过数组push()或者+=拼接方式将分隔的字符串连接起来，有文章中称，“在现代浏览器使用+=会比数组push方法快，在v8引擎中使用+=方法会比数组拼接快4.7倍，而在IE6-8下push比+=拼接快”。至于二者效率比较不在本文范围内，大家可以自行探究，但是我们为了简化问题，不考虑效率问题，我们可以将分隔的字符串用下列方法push拼接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var r=[];
r.push(&quot;<p>&quot;);
r.push(this.name);
r.push(&quot;</p><p>&quot;);
r.push(this.age);
r.push(&quot;</p>&quot;);
return r.join(&quot;&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var r=[];
r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;p&gt;"</span>);
r.<span class="hljs-keyword">push</span>(<span class="hljs-keyword">this</span>.name);
r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;/p&gt;&lt;p&gt;"</span>);
r.<span class="hljs-keyword">push</span>(<span class="hljs-keyword">this</span>.age);
r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;/p&gt;"</span>);
<span class="hljs-keyword">return</span> r.<span class="hljs-keyword">join</span>(<span class="hljs-string">""</span>);</code></pre>
<p>我们如果直接拼接成数组然后转成对象也可以，但是需要将<code>&lt;&gt;</code>转义，为了方便，我们有时候可以这样处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    name: 'zhaomenghuan',
    age: 22
}    
var code = 'var r=[];\n';
code += 'r.push(&quot;<p>&quot;);\n';
code += 'r.push(this.name);\n'
code += 'r.push(&quot;</p><p>&quot;);\n';
code += 'r.push(this.age);\n';
code += 'r.push(&quot;</p>&quot;);\n';
code += 'return r.join(&quot;&quot;);';
console.log(code)
var fn = new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
console.log(fn)
结果：
&quot;<p>zhaomenghuan</p><p>22</p>&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>var data = {
    name: 'zhaomenghuan',
    age: <span class="hljs-number">22</span>
}    
var <span class="hljs-built_in">code</span> = 'var r=[];\n';
<span class="hljs-built_in">code</span> += 'r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;p&gt;"</span>);\n';
<span class="hljs-built_in">code</span> += 'r.<span class="hljs-keyword">push</span>(this.name);\n'
<span class="hljs-built_in">code</span> += 'r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;/p&gt;&lt;p&gt;"</span>);\n';
<span class="hljs-built_in">code</span> += 'r.<span class="hljs-keyword">push</span>(this.age);\n';
<span class="hljs-built_in">code</span> += 'r.<span class="hljs-keyword">push</span>(<span class="hljs-string">"&lt;/p&gt;"</span>);\n';
<span class="hljs-built_in">code</span> += '<span class="hljs-keyword">return</span> r.join(<span class="hljs-string">""</span>);';
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">code</span>)
var <span class="hljs-function"><span class="hljs-keyword">fn</span> = <span class="hljs-keyword">new</span> Function<span class="hljs-params">(<span class="hljs-built_in">code</span>.replace(/[\r\t\n]/g, '')</span>).apply<span class="hljs-params">(data)</span></span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-function"><span class="hljs-keyword">fn</span>)
结果：
"&lt;p&gt;zhaomenghuan&lt;/p&gt;&lt;p&gt;<span class="hljs-number">22</span>&lt;/p&gt;"</span></code></pre>
<p>写到这里我相信聪明的人应该知道我接下来要做的事情了，主要是两个：如何根据我们自定义的分隔字符分隔模板字符串，然后就是动态生成字符串。不过我们可以看出来这里我们还有个没有提到的是让模板能够嵌入JavaScript的语法关键词，比如if，for等，这个处理方法和上面的略有不同，需要加以判断，不过我们可以划分为解析html和js两大类。</p>
<h3 id="articleHeader9">自定义分隔字符分隔模板字符</h3>
<p>在讲如何分割字符串前我们先看三个函数：<code>slice</code>|<code>splice</code>|<code>split</code>。</p>
<p>哈哈，是不是懵逼了？反正我经常是晕的，不行，还是要对比一下搞清楚。</p>
<h4>常用函数 slice | splice | split 对比</h4>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice" rel="nofollow noreferrer" target="_blank">String.prototype.slice()</a> —— 从一个字符串中提取字符串并返回新字符串</p></blockquote>
<p>语法：str.slice(beginSlice[, endSlice]) </p>
<p><strong>参数：</strong></p>
<ul>
<li><p>beginSlice：从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 sourceLength + beginSlice 看待，这里的sourceLength 是字符串的长度 (例如， 如果beginSlice 是 -3 则看作是: sourceLength - 3)</p></li>
<li><p>endSlice：可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice会一直提取到字符串末尾。如果该参数为负数，则被看作是 sourceLength + endSlice，这里的 sourceLength 就是字符串的长度(例如，如果 endSlice 是 -3，则是, sourceLength - 3)。</p></li>
</ul>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="nofollow noreferrer" target="_blank">Array.prototype.slice()</a>—— 把数组中一部分的浅复制（shallow copy）存入一个新的数组对象中，并返回这个新的数组。</p></blockquote>
<p>语法：arr.slice([begin[, end]])</p>
<p><strong>参数：</strong></p>
<ul>
<li><p>begin：从该索引处开始提取原数组中的元素（从0开始）。<br>如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果省略 begin，则 slice 从索引 0 开始。</p></li>
<li><p>end：在该索引处结束提取原数组元素（从0开始）。slice会提取原数组中索引从 begin 到 end 的所有元素（包含begin，但不包含end）。<br>slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。如果 end 被省略，则slice 会一直提取到原数组末尾。</p></li>
</ul>
<p><strong>描述：</strong><br>slice 不修改原数组，只会返回一个包含了原数组中提取的部分元素的一个新数组。原数组的元素会按照下述规则拷贝("一级深拷贝"[one level deep]规则)：</p>
<ul>
<li><p>如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则改变将反应到新的和原来的数组中。</p></li>
<li><p>对于字符串和数字来说（不是 String 和 Number 对象），slice 会拷贝字符串和数字到新的数组里。在一个数组里修改这些字符串或数字，不会影响另一个数组。</p></li>
</ul>
<p>如果向两个数组任一中添加了新元素，则另一个不会受到影响。</p>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" rel="nofollow noreferrer" target="_blank">Array.prototype.splice()</a> —— 用新元素替换旧元素，以此修改数组的内容</p></blockquote>
<p>语法：array.splice(start, deleteCount[, item1[, item2[, ...]]])</p>
<p><strong>参数：</strong></p>
<ul>
<li><p>start​<br>从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位。</p></li>
<li><p>deleteCount<br>整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。</p></li>
<li><p>itemN<br>要添加进数组的元素。如果不指定，则 splice() 只删除数组元素。</p></li>
</ul>
<p><strong>返回值：</strong><br>由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。<br><strong>描述：</strong><br>如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。请注意，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。</p>
<blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split" rel="nofollow noreferrer" target="_blank">String.prototype.split()</a> —— 通过把字符串分割成子字符串来把一个 String 对象分割成一个字符串数组</p></blockquote>
<p>语法：string.split(separator,limit)</p>
<p>我们在前面讲解【支持正则表达式的 String 对象的方法】时讲到这个方法了，这里不再赘述，列出来只为方便大家对比学习。</p>
<p>这里列出的方法中对于我们分隔字符串有用的是<code>String.prototype.slice()</code>和<code>String.prototype.split()</code>，另个方法的区别在于使用<code>slice()</code>方法们需要知道子字符串的索引值index，使用<code>split()</code>方法我们需要子字符串的内容或者符合的正则表达式。很明显我们的思路就出来了，接下来我们用代码实现。</p>
<h4>基于String.prototype.slice()方法分隔字符串</h4>
<p>我们这里参考前面的内容写一个基本函数，设置一个变量cursor作为索引值指针，每次执行完一个匹配操作，我们将指针移动一下。我们前面讲<code>RegExp.prototype.exec()</code>返回值时重点说到了三个参数。<br>若match = re.exec(str)，则有：<br>match.index：匹配的对象起始位置<br>match[0]：表示匹配的原字符串<br>match[1]：表示匹配的目标字符串<br>若我们明白了思路我们就可以写下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/html&quot; id=&quot;template&quot;>
    <p>name: "{{"this.name"}}"</p>
    <p>age: "{{"this.age"}}"</p>
</script>

<script type=&quot;text/javascript&quot;>    
    var mtpl = function(tpl,data) {
        var re = /"{{"(.+?)"}}"/g,cursor = 0;
                            
        while((match = re.exec(tpl))!== null) {
            // 开始标签  "{{" 前的内容和结束标签 "}}" 后的内容
            console.log(tpl.slice(cursor, match.index))
            // 开始标签  "{{" 和 结束标签 "}}" 之间的内容
            console.log(match[1])
            // 每一次匹配完成移动指针
            cursor = match.index + match[0].length;
        }
        // 最后一次匹配完的内容
        console.log(tpl.substr(cursor, tpl.length - cursor))
    }
    
    // 调用
    var tpl = document.getElementById(&quot;template&quot;).innerHTML;
    mtpl(tpl,null);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: </span></span></span><span class="hljs-template-variable">"{{"this.name"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: </span></span></span><span class="hljs-template-variable">"{{"this.age"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">    
    <span class="hljs-keyword">var</span> mtpl = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(tpl,data)</span> </span>{
        <span class="hljs-keyword">var</span> re = /</span></span><span class="hljs-template-variable">"{{"(.+?)"}}"</span><span class="xml"><span class="actionscript">/g,cursor = <span class="hljs-number">0</span>;
                            
        <span class="hljs-keyword">while</span>((match = re.exec(tpl))!== <span class="hljs-literal">null</span>) {
            <span class="hljs-comment">// 开始标签  </span></span></span><span class="hljs-template-variable">"{{" 前的内容和结束标签 "}}"</span><span class="xml"><span class="javascript"> 后的内容
            <span class="hljs-built_in">console</span>.log(tpl.slice(cursor, match.index))
            <span class="hljs-comment">// 开始标签  </span></span></span><span class="hljs-template-variable">"{{" 和 结束标签 "}}"</span><span class="xml"><span class="javascript"> 之间的内容
            <span class="hljs-built_in">console</span>.log(match[<span class="hljs-number">1</span>])
            <span class="hljs-comment">// 每一次匹配完成移动指针</span>
            cursor = match.index + match[<span class="hljs-number">0</span>].length;
        }
        <span class="hljs-comment">// 最后一次匹配完的内容</span>
        <span class="hljs-built_in">console</span>.log(tpl.substr(cursor, tpl.length - cursor))
    }
    
    <span class="hljs-comment">// 调用</span>
    <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"template"</span>).innerHTML;
    mtpl(tpl,<span class="hljs-literal">null</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>通过上面的代码我们已经实现了将模板字符串分隔成子字符串。</p>
<h4>基于String.prototype.split()方法分隔字符串</h4>
<p>使用字符串<code>split()</code>方法，下面我们不使用正则作为分隔符号，这里就使用自定义符号作为分隔标准，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sTag = '{%';//开始标签
var eTag = '%}';//结束标签" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> sTag = <span class="hljs-string">'{%'</span>;<span class="hljs-comment">//开始标签</span>
<span class="hljs-keyword">var</span> eTag = <span class="hljs-string">'%}'</span>;<span class="hljs-comment">//结束标签</span></code></pre>
<p>然后我们以<code>sTag</code>为分隔符执行split方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matchs = tpl.split(sTag);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var matchs</span> = tpl.split(sTag);</code></pre>
<p>返回值matchs 为一个子字符串数组，然后对数组每一个子字符串以<code>eTag</code>为分隔符执行split方法，进一步得到的子字符串数组分为两种类型，一种是于我们匹配子字符串参数有关的子串数组，一种是与匹配参数无关的子串数组（这种数组长度为1）。之所以要分得这么细是为了后面字符串连接时更方便的时候合适的方法连接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/html&quot; id=&quot;template&quot;>
    <p>name: {%this.name%}</p>
    <p>age: {%this.age%}</p>
</script>

<script type=&quot;text/javascript&quot;>
    var mtpl = function(tpl, data) {
        var sTag = '{%';//开始标签
        var eTag = '%}';//结束标签
        var matchs = tpl.split(sTag);
        for (var i = 0, len = matchs.length; i < len; i++) {
            var match = matchs[i].split(eTag);
            if (match.length === 1) {
                console.log(match[0]);
            } else {
                if(match[0]){
                    console.log(match[0]);
                }   
                if (match[1]) {
                    console.log(match[1]);
                }
            }
        }
    }
    
    // 调用
    var tpl = document.getElementById(&quot;template&quot;).innerHTML;
    mtpl(tpl,null);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: {%this.name%}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: {%this.age%}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> mtpl = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tpl, data</span>) </span>{
        <span class="hljs-keyword">var</span> sTag = <span class="hljs-string">'{%'</span>;<span class="hljs-comment">//开始标签</span>
        <span class="hljs-keyword">var</span> eTag = <span class="hljs-string">'%}'</span>;<span class="hljs-comment">//结束标签</span>
        <span class="hljs-keyword">var</span> matchs = tpl.split(sTag);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = matchs.length; i &lt; len; i++) {
            <span class="hljs-keyword">var</span> match = matchs[i].split(eTag);
            <span class="hljs-keyword">if</span> (match.length === <span class="hljs-number">1</span>) {
                <span class="hljs-built_in">console</span>.log(match[<span class="hljs-number">0</span>]);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">if</span>(match[<span class="hljs-number">0</span>]){
                    <span class="hljs-built_in">console</span>.log(match[<span class="hljs-number">0</span>]);
                }   
                <span class="hljs-keyword">if</span> (match[<span class="hljs-number">1</span>]) {
                    <span class="hljs-built_in">console</span>.log(match[<span class="hljs-number">1</span>]);
                }
            }
        }
    }
    
    <span class="hljs-comment">// 调用</span>
    <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"template"</span>).innerHTML;
    mtpl(tpl,<span class="hljs-literal">null</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader10">动态连接字符串</h3>
<p>我们上面使用了字符串分隔函数把字符串进行了分隔，并且提取了关键子字符串，下面我们讲解如何将这些字符串连接起来。<br>我们这里定义一个这样的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/tpl&quot; id=&quot;template&quot;>
    <p>name: "{{"this.name"}}"</p>
    <p>age: "{{"this.profile.age"}}"</p>
    "{{"if (this.sex) {"}}"
        <p>sex: "{{"this.sex"}}"</p>
    "{{""}}"}
    <ul>
        "{{"for(var i in this.skills){"}}"
        <li>"{{"this.skills[i]"}}"</li>
        "{{""}}"}
    </ul>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/tpl"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: </span><span class="hljs-template-variable">"{{"this.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: </span><span class="hljs-template-variable">"{{"this.profile.age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">if</span> (this.sex) {"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>sex: </span><span class="hljs-template-variable">"{{"this.sex"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{""}}"</span><span class="xml">}
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"for(var i <span class="hljs-builtin-name">in</span> this.skills){"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"this.skills[i]"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{""}}"</span><span class="xml">}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>很明显我们这个模板就相对前面的复杂得多了，但是基本思路是一样的，无非是提取"{{"..."}}"的内容，然后结合数据重新组合成新的html字符串。但是与前面不同的是我们分隔的子字符串中有三种类型：</p>
<ol>
<li><p>含普通html标签的子字符串（如：<code>&lt;p&gt;name:</code>）</p></li>
<li><p>含js对象值的子字符串（如：<code>this.name</code>）</p></li>
<li><p>含javascript关键字的代码片段（如：<code>if (this.sex) {</code>）</p></li>
</ol>
<p>我们刚刚前面一直只提到了第1、2两种，这两种直接可以使用数组push方法就可以连接起来，但是第3中不能使用数组push，而是应该直接连接。<br>所以这里我们分两种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,;

var code = 'var r=[];\n';
// 解析html
function parsehtml(line) {
    // 单双引号转义，换行符替换为空格,去掉前后的空格
    line = line.replace(/('|&quot;)/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
    code +='r.push(&quot;' + line + '&quot;);\n';
}

// 解析js代码        
function parsejs(line) {   
    // 去掉前后的空格
    line = line.replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
    code += line.match(reExp)? line + '\n' : 'r.push(' + line + ');\n';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reExp = <span class="hljs-regexp">/(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g</span>,;

<span class="hljs-keyword">var</span> code = <span class="hljs-string">'var r=[];\n'</span>;
<span class="hljs-comment">// 解析html</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsehtml</span>(<span class="hljs-params">line</span>) </span>{
    <span class="hljs-comment">// 单双引号转义，换行符替换为空格,去掉前后的空格</span>
    line = line.replace(<span class="hljs-regexp">/('|")/g</span>, <span class="hljs-string">'\\$1'</span>).replace(<span class="hljs-regexp">/\n/g</span>, <span class="hljs-string">' '</span>).replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
    code +=<span class="hljs-string">'r.push("'</span> + line + <span class="hljs-string">'");\n'</span>;
}

<span class="hljs-comment">// 解析js代码        </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsejs</span>(<span class="hljs-params">line</span>) </span>{   
    <span class="hljs-comment">// 去掉前后的空格</span>
    line = line.replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
    code += line.match(reExp)? line + <span class="hljs-string">'\n'</span> : <span class="hljs-string">'r.push('</span> + line + <span class="hljs-string">');\n'</span>;
}</code></pre>
<p>当我们写完这两个函数的时候，我们直接替换上面我们分隔字符串时候得到的字字符串时候打印的函数即可。当然我们会看到很多文章为了压缩代码，将这两个函数合并成一个函数，其实对于我们理解这个问题，还原问题本质并没有实际意义，这里建议还是很开写更清晰。</p>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
</head>
<body>
    <div id=&quot;content&quot;></div>        
    <script type=&quot;text/tpl&quot; id=&quot;template&quot;>
        <p>name: "{{"this.name"}}"</p>
        <p>age: "{{"this.profile.age"}}"</p>
        "{{"if (this.sex) {"}}"
            <p>sex: "{{"this.sex"}}"</p>
        "{{""}}"}
        <ul>
            "{{"for(var i in this.skills){"}}"
            <li>"{{"this.skills[i]"}}"</li>
            "{{""}}"}
        </ul>
    </script>
        
    <script type=&quot;text/javascript&quot;>    
        var mtpl = function(tpl, data) {
            var re = /"{{"(.+?)"}}"/g, 
                cursor = 0
                reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,    
                code = 'var r=[];\n';

            // 解析html
            function parsehtml(line) {
                // 单双引号转义，换行符替换为空格,去掉前后的空格
                line = line.replace(/('|&quot;)/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
                code +='r.push(&quot;' + line + '&quot;);\n';
            }
            
            // 解析js代码        
            function parsejs(line) {   
                // 去掉前后的空格
                line = line.replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
                code += line.match(reExp)? line + '\n' : 'r.push(' + line + ');\n';
            }    
            
            while((match = re.exec(tpl))!== null) {
                // 开始标签  "{{" 前的内容和结束标签 "}}" 后的内容
                parsehtml(tpl.slice(cursor, match.index))
                // 开始标签  "{{" 和 结束标签 "}}" 之间的内容
                parsejs(match[1])
                // 每一次匹配完成移动指针
                cursor = match.index + match[0].length;
            }
            // 最后一次匹配完的内容
            parsehtml(tpl.substr(cursor, tpl.length - cursor));
            code += 'return r.join(&quot;&quot;);';
            return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
        }
        
        var tpl = document.getElementById(&quot;template&quot;).innerHTML.toString();
        document.getElementById(&quot;content&quot;).innerHTML = mtpl(tpl,{
            name: &quot;zhaomenghuan&quot;,
            profile: { 
                age: 22 
            },
            sex: 'man',
            skills: ['html5','javascript','android']
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/tpl"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name: </span></span></span><span class="hljs-template-variable">"{{"this.name"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age: </span></span></span><span class="hljs-template-variable">"{{"this.profile.age"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        </span></span></span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">if</span> (this.sex) {"}}"</span><span class="xml"><span class="handlebars"><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>sex: </span></span></span><span class="hljs-template-variable">"{{"this.sex"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        </span></span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="handlebars"><span class="xml">}
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            </span></span></span><span class="hljs-template-variable">"{{"for(var i <span class="hljs-builtin-name">in</span> this.skills){"}}"</span><span class="xml"><span class="handlebars"><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span></span></span><span class="hljs-template-variable">"{{"this.skills[i]"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            </span></span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="handlebars"><span class="xml">}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">    
        <span class="hljs-keyword">var</span> mtpl = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(tpl, data)</span> </span>{
            <span class="hljs-keyword">var</span> re = /</span></span><span class="hljs-template-variable">"{{"(.+?)"}}"</span><span class="xml"><span class="javascript">/g, 
                cursor = <span class="hljs-number">0</span>
                reExp = <span class="hljs-regexp">/(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g</span>,    
                code = <span class="hljs-string">'var r=[];\n'</span>;

            <span class="hljs-comment">// 解析html</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsehtml</span>(<span class="hljs-params">line</span>) </span>{
                <span class="hljs-comment">// 单双引号转义，换行符替换为空格,去掉前后的空格</span>
                line = line.replace(<span class="hljs-regexp">/('|")/g</span>, <span class="hljs-string">'\\$1'</span>).replace(<span class="hljs-regexp">/\n/g</span>, <span class="hljs-string">' '</span>).replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
                code +=<span class="hljs-string">'r.push("'</span> + line + <span class="hljs-string">'");\n'</span>;
            }
            
            <span class="hljs-comment">// 解析js代码        </span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsejs</span>(<span class="hljs-params">line</span>) </span>{   
                <span class="hljs-comment">// 去掉前后的空格</span>
                line = line.replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
                code += line.match(reExp)? line + <span class="hljs-string">'\n'</span> : <span class="hljs-string">'r.push('</span> + line + <span class="hljs-string">');\n'</span>;
            }    
            
            <span class="hljs-keyword">while</span>((match = re.exec(tpl))!== <span class="hljs-literal">null</span>) {
                <span class="hljs-comment">// 开始标签  </span></span></span><span class="hljs-template-variable">"{{" 前的内容和结束标签 "}}"</span><span class="xml"><span class="actionscript"> 后的内容
                parsehtml(tpl.slice(cursor, match.index))
                <span class="hljs-comment">// 开始标签  </span></span></span><span class="hljs-template-variable">"{{" 和 结束标签 "}}"</span><span class="xml"><span class="javascript"> 之间的内容
                parsejs(match[<span class="hljs-number">1</span>])
                <span class="hljs-comment">// 每一次匹配完成移动指针</span>
                cursor = match.index + match[<span class="hljs-number">0</span>].length;
            }
            <span class="hljs-comment">// 最后一次匹配完的内容</span>
            parsehtml(tpl.substr(cursor, tpl.length - cursor));
            code += <span class="hljs-string">'return r.join("");'</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(code.replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">''</span>)).apply(data);
        }
        
        <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"template"</span>).innerHTML.toString();
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"content"</span>).innerHTML = mtpl(tpl,{
            <span class="hljs-attr">name</span>: <span class="hljs-string">"zhaomenghuan"</span>,
            <span class="hljs-attr">profile</span>: { 
                <span class="hljs-attr">age</span>: <span class="hljs-number">22</span> 
            },
            <span class="hljs-attr">sex</span>: <span class="hljs-string">'man'</span>,
            <span class="hljs-attr">skills</span>: [<span class="hljs-string">'html5'</span>,<span class="hljs-string">'javascript'</span>,<span class="hljs-string">'android'</span>]
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>另外一个自定义标签的和这个代码类似，大家可以自己试试，或者看本文所有的代码演示完整工程。</p>
<p>至此我们完成了一个基于正则表达式的简单js模板引擎，本文目的不在于造一个轮子，也不是为了重复制造文章，只是把相关问题进行梳理，在自己知识体系中形成一个更加清晰的思路，通过这个实际例子将正则表达式、数组和字符串相关知识点串起来，方面后面自己查阅，也方便初学者可以学习借鉴。</p>
<h2 id="articleHeader11">参考文章</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp" rel="nofollow noreferrer" target="_blank">MDN JavaScript 标准库 RegExp</a><br><a href="http://www.jb51.net/article/72044.htm" rel="nofollow noreferrer" target="_blank">js正则表达式基本语法(精粹)</a><br><a href="http://blog.jobbole.com/56689/" rel="nofollow noreferrer" target="_blank">只有20行Javascript代码！手把手教你写一个页面模板引擎</a><br><a href="https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js" rel="nofollow noreferrer" target="_blank">TemplateEngine.js源代码</a><br><a href="https://github.com/yanhaijing/template.js" rel="nofollow noreferrer" target="_blank">template.js源代码</a></p>
<p><span class="img-wrap"><img data-src="/img/bVyweE?w=612&amp;h=384" src="https://static.alili.tech/img/bVyweE?w=612&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript进阶学习（一）—— 基于正则表达式的简单js模板引擎实现

## 原文链接
[https://segmentfault.com/a/1190000005804719](https://segmentfault.com/a/1190000005804719)

