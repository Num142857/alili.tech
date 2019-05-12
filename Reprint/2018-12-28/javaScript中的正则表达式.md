---
title: 'javaScript中的正则表达式' 
date: 2018-12-28 2:30:11
hidden: true
slug: r8czd3beg7m
categories: [reprint]
---

{{< raw >}}

                    
<p>文章同步到<a href="https://github.com/sunzhaoye/blog/issues/11" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>正则在平时工作中用的非常多, 最开始接触正则的时候感觉这个东东好难记啊,最近把正则的内容整理了一下,写成以下文章。</p>
<p>先给大家介绍一个在线解析正则的网站,来帮助我们理解正则,特别是复杂的正则表达式,非常好用</p>
<p><a href="http://www.regexper.com" rel="nofollow noreferrer" target="_blank">http://www.regexper.com</a></p>
<p>比如/^@[a-zA-Z]d+@$/,解析之后图形帮助理解如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011569995?w=914&amp;h=190" src="https://static.alili.tech/img/remote/1460000011569995?w=914&amp;h=190" alt="reg解析" title="reg解析" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">什么是正则</h1>
<p>正则表达式是用于匹配字符串中字符组合的模式。主要应用于正则对象的test和esec方法,以及字符串的search、split、match、replace中。</p>
<h1 id="articleHeader1">创建正则</h1>
<h2 id="articleHeader2">字面量创建</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /pattern/flag;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var reg</span> = /pattern/flag;</code></pre>
<p>每个正则表达式都可以带有一个或多个(也可以不带)表明正则表达式行为的标志</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011569996?w=1204&amp;h=206" src="https://static.alili.tech/img/remote/1460000011569996?w=1204&amp;h=206" alt="正则flag" title="正则flag" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">构造函数创建</h2>
<p>在js中提供了一个内置构造函数RegExp来创建一个正则对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg =  new RegExp(pattern [, flags]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> reg =  <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(pattern [, flags]);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[ab]c/g;
// 等价于
var reg = new RegExp(&quot;[ab]c&quot;, &quot;g&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[ab]c/g</span>;
<span class="hljs-comment">// 等价于</span>
<span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"[ab]c"</span>, <span class="hljs-string">"g"</span>);</code></pre>
<h1 id="articleHeader4">正则表达式中的特殊字符</h1>
<h2 id="articleHeader5">元字符</h2>
<blockquote>元字符是在正则表达式中有特殊含义的非字母字符,js中正则表达式元字符包括:</blockquote>
<p>? + *  ^ $ . |  ( ) [ ] { }</p>
<p>因为这些字符在正则表达式中具有特殊含义,所以如果要想在字符串中匹配这些字符,就必须对它们进行转义.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 匹配字符串中的ac或者bc
var reg = /[ab]c/;

// 如果要匹配字符串的&quot;[ab]c&quot;, 需要对[]进行转义
var reg = /\[ab\]c/;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 匹配字符串中的ac或者bc</span>
<span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[ab]c/</span>;

<span class="hljs-comment">// 如果要匹配字符串的"[ab]c", 需要对[]进行转义</span>
<span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\[ab\]c/</span>;
</code></pre>
<p><strong>注意:</strong><br>另外需要注意的是,由于使用构造函数创建正则,pattern参数必须为字符串,所有元字符如果需要在字符串中匹配这个字符,需要进行双重转义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\[ab\]c/g;

如果使用构造函数创建正则表达式,应该写成:

var reg = new RegExp(&quot;\\[ab\\]c&quot;, &quot;g&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\[ab\]c/g</span>;

如果使用构造函数创建正则表达式,应该写成:

<span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\\[ab\\]c"</span>, <span class="hljs-string">"g"</span>);</code></pre>
<h2 id="articleHeader6">字符集合</h2>
<p>我们可以使用[]来构建一个简单的类[xyz],类指符合某些特性的对象,是一个泛指,并不是指某个字符,表示匹配方括号的中任意字符,对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。</p>
<table>
<thead><tr>
<th>字符</th>
<th>含义</th>
</tr></thead>
<tbody><tr>
<td>[xyz]</td>
<td>匹配方括号的中任意字符</td>
</tr></tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[abc]/g;
var reg2 = /[abc.]/g;  // 字符集合中的.
var reg3 = /[abc\.]/g;  // 字符集合中转义的.

var str = 'a1b2c3';
var str2 = 'a1b2c3d.';

var res = str.replace(reg, 'X');
var res2 = str2.replace(reg2, 'X');
var res3 = str3.replace(reg3, 'X');

console.log(res);  //  X1X2X3
console.log(res2);  //  X1X2X3dX
console.log(res3);  //  X1X2X3dX
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[abc]/g</span>;
<span class="hljs-keyword">var</span> reg2 = <span class="hljs-regexp">/[abc.]/g</span>;  <span class="hljs-comment">// 字符集合中的.</span>
<span class="hljs-keyword">var</span> reg3 = <span class="hljs-regexp">/[abc\.]/g</span>;  <span class="hljs-comment">// 字符集合中转义的.</span>

<span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3'</span>;
<span class="hljs-keyword">var</span> str2 = <span class="hljs-string">'a1b2c3d.'</span>;

<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-keyword">var</span> res2 = str2.replace(reg2, <span class="hljs-string">'X'</span>);
<span class="hljs-keyword">var</span> res3 = str3.replace(reg3, <span class="hljs-string">'X'</span>);

<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  X1X2X3</span>
<span class="hljs-built_in">console</span>.log(res2);  <span class="hljs-comment">//  X1X2X3dX</span>
<span class="hljs-built_in">console</span>.log(res3);  <span class="hljs-comment">//  X1X2X3dX</span>
</code></pre>
<h2 id="articleHeader7">字符集合取反</h2>
<table>
<thead><tr>
<th>字符</th>
<th>含义</th>
</tr></thead>
<tbody><tr>
<td>[^xyz]</td>
<td>匹配任何没有包含在方括号中的字符</td>
</tr></tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[^abc]/g;
var str = 'abcdefg';
var res = str.replace(reg, 'X');
console.log(res);  //  abcXXXX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[^abc]/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'abcdefg'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  abcXXXX</span></code></pre>
<h2 id="articleHeader8">范围类</h2>
<p>在字符集合中可以使用(-)来指定一个字符范围, 如[a-z],表示匹配从a到z的任意字符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[a-z]/g;
var str = 'a1b2c3d4e5F6';
var res = str.replace(reg, 'X');
console.log(res); //  X1X2X3X4X5F6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[a-z]/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3d4e5F6'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res); <span class="hljs-comment">//  X1X2X3X4X5F6</span></code></pre>
<p>在范围类[]中可以连写,如同时匹配大小写,[a-zA-Z]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[a-zA-Z]/g;
var str = 'a1b2c3d4e5F6';
var res = str.replace(reg, 'X');
console.log(res); //  X1X2X3X4X5X6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/[a-zA-Z]/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3d4e5F6'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res); <span class="hljs-comment">//  X1X2X3X4X5X6</span></code></pre>
<h2 id="articleHeader9">预定义类</h2>
<p>正则表达式提供了预定义类,来匹配常见的字符类,不需要都通过字符集合去定义正则表达式</p>
<table>
<thead><tr>
<th>字符</th>
<th>等价类</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>.</td>
<td>[^\n\r]</td>
<td>匹配除回车符合换行符之外的任何单个字符</td>
</tr>
<tr>
<td>\d</td>
<td>[0-9]</td>
<td>数字字符</td>
</tr>
<tr>
<td>\D</td>
<td>[^0-9]</td>
<td>非数字字符</td>
</tr>
<tr>
<td>\s</td>
<td>[\t\n\x0B\f\r]</td>
<td>空白符</td>
</tr>
<tr>
<td>\S</td>
<td>[^\t\n\x0B\f\r]</td>
<td>非空白符</td>
</tr>
<tr>
<td>\w</td>
<td>[a-zA-Z_]</td>
<td>单词字符(字母、数字、下划线)</td>
</tr>
<tr>
<td>\W</td>
<td>[^a-zA-Z_]</td>
<td>非单词字符</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader10">边界</h2>
<p>正则还提供了边界匹配符</p>
<table>
<thead><tr>
<th>字符</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>^</td>
<td>匹配输入的开始</td>
</tr>
<tr>
<td>$</td>
<td>匹配输入的结尾</td>
</tr>
<tr>
<td>\b</td>
<td>单词边界</td>
</tr>
<tr>
<td>\B</td>
<td>非单词边界</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ^的应用
var reg = /^@./g
var str = '@123abc@';
var res = str.replace(reg, 'X');
console.log(res);  // X23abc

// $的应用
var reg2 = /^.@$/g;
var str2 = '@123abc@';
var res2 = str2.replace(reg2, 'X');
console.log(res2);  // 123abX

// \b的应用
var reg3 = /\bis\b/g;
var str3 = 'this is javaScript';
var res3 = str3.replace(reg3, 'X');
console.log(res3); // this X javaScript" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ^的应用</span>
<span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^@./g</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'@123abc@'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// X23abc</span>

<span class="hljs-comment">// $的应用</span>
<span class="hljs-keyword">var</span> reg2 = <span class="hljs-regexp">/^.@$/g</span>;
<span class="hljs-keyword">var</span> str2 = <span class="hljs-string">'@123abc@'</span>;
<span class="hljs-keyword">var</span> res2 = str2.replace(reg2, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res2);  <span class="hljs-comment">// 123abX</span>

<span class="hljs-comment">// \b的应用</span>
<span class="hljs-keyword">var</span> reg3 = <span class="hljs-regexp">/\bis\b/g</span>;
<span class="hljs-keyword">var</span> str3 = <span class="hljs-string">'this is javaScript'</span>;
<span class="hljs-keyword">var</span> res3 = str3.replace(reg3, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res3); <span class="hljs-comment">// this X javaScript</span></code></pre>
<h3 id="articleHeader11">正则的m标志应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /^@./g;
var str = `@abc
@123
@XYZ
`
var res = str.replace(reg, 'X');
// 因为即使字符串看上去换行,本质上还是一些换行符,只有结尾和结束
console.log(res);  //  Xbc
                       @123
                       @XYZ" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^@./g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">`@abc
@123
@XYZ
`</span>
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-comment">// 因为即使字符串看上去换行,本质上还是一些换行符,只有结尾和结束</span>
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  Xbc</span>
                       @<span class="hljs-number">123</span>
                       <span class="hljs-meta">@XYZ</span></code></pre>
<p>当正则表达式使用m标志的时候,在一行文本末尾结束的时候,还会去匹配下一行是否存在与模式匹配的项,例子如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /^@./gm;
var str = `@abc
@123
@XYZ
`
var res = str.replace(reg, 'X');
console.log(res);  //  Xbc
                       X23
                       XYZ" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^@./gm</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">`@abc
@123
@XYZ
`</span>
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">//  Xbc</span>
                       X23
                       XYZ</code></pre>
<h2 id="articleHeader12">量词</h2>
<table>
<thead><tr>
<th>字符</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>?</td>
<td>匹配前面一个表达式0次或者1次(至多出现一次)</td>
</tr>
<tr>
<td>+</td>
<td>匹配前面一个表达式1次或者多次(至少出现一次)</td>
</tr>
<tr>
<td>*</td>
<td>匹配前一个表达式0次或多次(任意次)</td>
</tr>
<tr>
<td>{n}</td>
<td>n是一个正整数，匹配了前面一个字符刚好发生了n次</td>
</tr>
<tr>
<td>{n,m}</td>
<td>n 和 m 都是整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略。</td>
</tr>
<tr>
<td>{n,}</td>
<td>匹配前面字符n此或者更多次(至少出现n次</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader13">贪婪模式</h3>
<p>贪婪模式是让正则表达式尽可能多的匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d{2,5}/;
var str = '12345678';
var res = str.replace(reg, 'X');
console.log(res); // X678" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\d{2,5}/</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'12345678'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res); <span class="hljs-comment">// X678</span></code></pre>
<h3 id="articleHeader14">非贪婪模</h3>
<p>非贪婪模式是让正则表达式尽可能少的匹配,一旦匹配成功不在继续匹配,做法是在量词后面加上?即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d{2,5}?/
var str = '12345678';
var res = str.replace(reg, 'X');
console.log(res);  // X345678   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\d{2,5}?/</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'12345678'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// X345678   </span></code></pre>
<h2 id="articleHeader15">分组</h2>
<h3 id="articleHeader16">使用括号()进行分组</h3>
<p>量词不作用于紧挨着的某个字符,使用/(x)/匹配 'x',并且记住匹配项,括号被称为补货括号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /([a-zA-Z]\d)/g;
var str = 'a1bbc3D4efg';
var res = str.replace(reg, 'X');
console.log(res);  // XbbXXefg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/([a-zA-Z]\d)/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1bbc3D4efg'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// XbbXXefg</span></code></pre>
<p>使用在线解析正则工具如下图:<br><span class="img-wrap"><img data-src="/img/remote/1460000011569997?w=452&amp;h=296" src="https://static.alili.tech/img/remote/1460000011569997?w=452&amp;h=296" alt="res正则解析" title="res正则解析" style="cursor: pointer;"></span></p>
<p>另外可以添加量词</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /(abc){3}/g;
var str = 'abcabcabcabc';
var res = str.replace(reg, 'X');
console.log(res);  // Xabc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/(abc){3}/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'abcabcabcabc'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// Xabc</span></code></pre>
<h3 id="articleHeader17">使用或' | '进行分组</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /apple|pear/g
var str = 'appleappleHpearpear';
var res = str.replace(reg, 'X');
console.log(res);  // XXHXX

var reg2 = /appl(e|p)ear/g;
var str2 = 'appleearHapplpear'
var res2 = str2.replace(reg2, 'X');
console.log(res2);  // XHX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/apple|pear/g</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'appleappleHpearpear'</span>;
<span class="hljs-keyword">var</span> res = str.replace(reg, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// XXHXX</span>

<span class="hljs-keyword">var</span> reg2 = <span class="hljs-regexp">/appl(e|p)ear/g</span>;
<span class="hljs-keyword">var</span> str2 = <span class="hljs-string">'appleearHapplpear'</span>
<span class="hljs-keyword">var</span> res2 = str2.replace(reg2, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(res2);  <span class="hljs-comment">// XHX</span></code></pre>
<p>在线解析上面代码的reg和reg2如下:<br>reg:<br><span class="img-wrap"><img data-src="/img/remote/1460000011569998?w=344&amp;h=192" src="https://static.alili.tech/img/remote/1460000011569998?w=344&amp;h=192" alt="reg" title="reg" style="cursor: pointer;"></span></p>
<p>reg2:<br><span class="img-wrap"><img data-src="/img/remote/1460000011569999?w=474&amp;h=258" src="https://static.alili.tech/img/remote/1460000011569999?w=474&amp;h=258" alt="reg2" title="reg2" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">捕获匹配到的分组内容</h3>
<p>在replace替换环节,可以使用$1、$2、$3...$n等捕获分匹配到的分组</p>
<p>比如想把'25/12/2016'转换成'2016-12-25':</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /(\d{2})\/(\d{2})\/(\d{4})/;
var str = '25/12/2016';
var res = str.replace(reg, '$3-$2-$1');
console.log(res);  // 2016-12-25" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /(\<span class="hljs-keyword">d</span>{2})\/(\<span class="hljs-keyword">d</span>{2})\/(\<span class="hljs-keyword">d</span>{4})/;
<span class="hljs-keyword">var</span> str = '25/12/2016';
<span class="hljs-keyword">var</span> res = str.<span class="hljs-keyword">replace</span>(<span class="hljs-keyword">reg</span>, '<span class="hljs-variable">$3</span>-<span class="hljs-variable">$2</span>-<span class="hljs-variable">$1</span>');
console.<span class="hljs-built_in">log</span>(res);  <span class="hljs-comment">// 2016-12-25</span></code></pre>
<h3 id="articleHeader19">忽略分组</h3>
<p>如果不希望捕获分组,只需要在分组内加上(?:)就可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /(?:\d{2})\/(\d{2})\/(\d{4})/;
var str = '25/12/2016';
var res = str.replace(reg, '$3-$2-$1');

此时$2为2016,$1为12,而$3捕获不到,按普通字符串显示
console.log(res);  // $3-2016-12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /(?:\<span class="hljs-keyword">d</span>{2})\/(\<span class="hljs-keyword">d</span>{2})\/(\<span class="hljs-keyword">d</span>{4})/;
<span class="hljs-keyword">var</span> str = '25/12/2016';
<span class="hljs-keyword">var</span> res = str.<span class="hljs-keyword">replace</span>(<span class="hljs-keyword">reg</span>, '<span class="hljs-variable">$3</span>-<span class="hljs-variable">$2</span>-<span class="hljs-variable">$1</span>');

此时<span class="hljs-variable">$2</span>为2016,<span class="hljs-variable">$1</span>为12,而<span class="hljs-variable">$3</span>捕获不到,按普通字符串显示
console.<span class="hljs-built_in">log</span>(res);  <span class="hljs-comment">// $3-2016-12</span></code></pre>
<h2 id="articleHeader20">正向肯定查找</h2>
<p>x(?=y)<br>匹配x,并且x后必须跟着y,这就是正向肯定查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\w(?=\d)/g;
var str = 'a1b2ccd4';
var res = str.replace(reg, 'X');
console.log(res); // X1X2ccX4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\<span class="hljs-built_in">w</span>(?=\<span class="hljs-keyword">d</span>)/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">var</span> str = 'a1b2ccd4';
<span class="hljs-keyword">var</span> res = str.<span class="hljs-keyword">replace</span>(<span class="hljs-keyword">reg</span>, 'X');
console.<span class="hljs-built_in">log</span>(res); <span class="hljs-comment">// X1X2ccX4</span></code></pre>
<h2 id="articleHeader21">正向否定查找</h2>
<p>匹配x,并且x后必须不跟着y,这就是正向否定查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[a-z](?!\d)/g;
var str = 'a1b2ccd4';
var res = str.replace(reg, 'X');
console.log(res); // a1b2XXd4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>var reg = /[<span class="hljs-string">a-z</span>](<span class="hljs-link">?!\d</span>)/g;
var str = 'a1b2ccd4';
var res = str.replace(reg, 'X');
console.log(res); // a1b2XXd4</code></pre>
<h1 id="articleHeader22">正则对象属性和方法</h1>
<h2 id="articleHeader23">属性</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011570000?w=1224&amp;h=262" src="https://static.alili.tech/img/remote/1460000011570000?w=1224&amp;h=262" alt="正则对象属性" title="正则对象属性" style="cursor: pointer;"></span></p>
<p>属性皆为只读,不可修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\[abc\]/;
console.log(reg.ignoreCase) // false;
console.log(reg.global) // false;
console.log(reg.multiline) // false;

reg.ignoreCase = true;
reg.global = true;
reg.multiline = true;

console.log(reg.ignoreCase) // false;
console.log(reg.global) // false;
console.log(reg.multiline) // false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\[abc\]/;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.ignoreCase) <span class="hljs-comment">// false;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">global</span>) <span class="hljs-comment">// false;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.multiline) <span class="hljs-comment">// false;</span>

<span class="hljs-keyword">reg</span>.ignoreCase = true;
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">global</span> = true;
<span class="hljs-keyword">reg</span>.multiline = true;

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.ignoreCase) <span class="hljs-comment">// false;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">global</span>) <span class="hljs-comment">// false;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.multiline) <span class="hljs-comment">// false;</span></code></pre>
<p>还是以上代码看一下source属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(reg.source) //  \[abc\]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">source</span>) //  \[<span class="hljs-keyword">abc</span>\]</code></pre>
<p>如果使用构造函数创建正则对象,再来看一下source属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = new RegExp(&quot;\\[abc\\]&quot;);  //需要对元字符进行双重转义
console.log(reg.source);   // \[abc\]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\\[abc\\]"</span>);  <span class="hljs-comment">//需要对元字符进行双重转义</span>
<span class="hljs-built_in">console</span>.log(reg.source);   <span class="hljs-comment">// \[abc\]</span></code></pre>
<p>通过以上对比可知,source属性是字面量形式创建正则对象所有的字符串</p>
<h2 id="articleHeader24">方法</h2>
<h3 id="articleHeader25">RegExp.prototype.test()</h3>
<p>test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。匹配到返回 true,否则返回false。</p>
<p><strong>语法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="regexObj.test(str)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">regexObj.test(<span class="hljs-keyword">str</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\w/;
var str = 'ab';
console.log(reg.test(str));  // true
console.log(reg.test(str));  // true
console.log(reg.test(str));  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\w/;
<span class="hljs-keyword">var</span> str = 'ab';
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span></code></pre>
<p><strong>注意</strong><br>当正则表达式使用全局模式时,lastIndex属性会影响test()方法的返回值,看下面例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\w/g;
var str = 'ab';
console.log(reg.test(str));  // true
console.log(reg.test(str));  // true
console.log(reg.test(str));  // false
console.log(reg.test(str));  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\w/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">var</span> str = 'ab';
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// false</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str));  <span class="hljs-comment">// true</span></code></pre>
<p>为什么会出现这种现象呢,是因为正则表达式执行test方法时,每次都会把结果作用到操作的正则实例上,由于是全局匹配,第一次匹配到之后reg的lastIndex属性为1,继续匹配,此时从lastIndex的位置开始匹配,即从b开始,结果又匹配到,此时lastIndex属性为2，当继续匹配时,从2开始匹配,没有匹配到,此时返回false,lastIndex被重置为0,所以第4次执行console.log(reg.test(str))就会从新从0开始,所以返回值为true。结合while循环来说明一下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\w/g;
var str = 'ab';
while(reg.test(str)){
    console.log(reg.lastIndex);  // 循环执行两次,分别打印出1, 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\w/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">var</span> str = 'ab';
<span class="hljs-keyword">while</span>(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str)){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.lastIndex);  <span class="hljs-comment">// 循环执行两次,分别打印出1, 2</span>
}</code></pre>
<h3 id="articleHeader26">RegExp.prototype.exec()</h3>
<p>exec() 方法在一个指定字符串中执行一个搜索匹配.</p>
<p><strong>语法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="regexObj.exec(str)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;">regexObj.<span class="hljs-built_in">exec</span>(<span class="hljs-built_in">str</span>)</code></pre>
<p><strong>返回值:</strong></p>
<p>1.如果匹配失败，返回 null。<br>2.如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性,一般来说主要是lastIndex属性值的更新。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面,返回值虽然是Array实例,但是包含了index和input属性</p>
<p>index: 表示匹配项在字符串中的位置,也就是匹配项第一个字符的位置<br>input: 表示应用正则表达式的字符串</p>
<h4>非全局调用</h4>
<p>返回数组内容包括:</p>
<ol>
<li>第一个元素是与正则表达式相匹配的文本</li>
<li>第二个元素是与正则对象第一个子表达式相匹配的文本,也就是第一个分组(如果有的话)</li>
<li>第三个元素是与正则对象第二个子表达式相匹配的文本,也就是第而个分组(如果有的话),以此类推</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d(\w)(\w)\d/;
var str = '@1bb2c3dd4f';
var res = reg.exec(str);
console.log(reg.lastIndex);  // 0  非全局模式忽略lastIndex属性
console.log(res.index);  // 1
console.log(res.input);  // @1ab2c3dd4f
console.log(res);  // [&quot;1ab2&quot;, &quot;a&quot;, &quot;b&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\<span class="hljs-built_in">d</span>(\w)(\w)\<span class="hljs-keyword">d</span>/;
<span class="hljs-keyword">var</span> str = '@1bb2c3dd4f';
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">reg</span>.exec(str);
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.lastIndex);  <span class="hljs-comment">// 0  非全局模式忽略lastIndex属性</span>
console.<span class="hljs-built_in">log</span>(res.index);  <span class="hljs-comment">// 1</span>
console.<span class="hljs-built_in">log</span>(res.<span class="hljs-keyword">input</span>);  <span class="hljs-comment">// @1ab2c3dd4f</span>
console.<span class="hljs-built_in">log</span>(res);  <span class="hljs-comment">// ["1ab2", "a", "b"]</span></code></pre>
<h4>全局调用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d(\w)(\w)\d/g;
var str = '@1bb2c3dd4f';
var res = reg.exec(str);
console.log(reg.lastIndex);  // 5  非全局模式忽略lastIndex属性
console.log(res.index);  // 1
console.log(res.input);  // @1ab2c3dd4f
console.log(res);  // [&quot;1ab2&quot;, &quot;a&quot;, &quot;b&quot;]
console.log(reg.lastIndex); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\<span class="hljs-built_in">d</span>(\w)(\w)\<span class="hljs-keyword">d</span>/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">var</span> str = '@1bb2c3dd4f';
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">reg</span>.exec(str);
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.lastIndex);  <span class="hljs-comment">// 5  非全局模式忽略lastIndex属性</span>
console.<span class="hljs-built_in">log</span>(res.index);  <span class="hljs-comment">// 1</span>
console.<span class="hljs-built_in">log</span>(res.<span class="hljs-keyword">input</span>);  <span class="hljs-comment">// @1ab2c3dd4f</span>
console.<span class="hljs-built_in">log</span>(res);  <span class="hljs-comment">// ["1ab2", "a", "b"]</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span>.lastIndex); </code></pre>
<p>使用while循环加深一下理解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d(\w)(\w)\d/g;
var str = '@1bb2c3dd4f';
while(reg.exec(str)) {
    console.log(reg.lastIndex, res.index, res);
    // 打印两次结果分别为
    // 5, 1, [&quot;1bb2&quot;, &quot;b&quot;, &quot;b&quot;]
    // 10, 6, [&quot;3dd4&quot;, &quot;d&quot;, &quot;d&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var reg = <span class="hljs-regexp">/\d(\w)(\w)\d/g</span>;
var str = <span class="hljs-string">'@1bb2c3dd4f'</span>;
<span class="hljs-keyword">while</span>(reg.exec(str)) {
    console.log(reg.lastIndex, res.index, res);
    <span class="hljs-regexp">//</span> 打印两次结果分别为
    <span class="hljs-regexp">//</span> <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, [<span class="hljs-string">"1bb2"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"b"</span>]
    <span class="hljs-regexp">//</span> <span class="hljs-number">10</span>, <span class="hljs-number">6</span>, [<span class="hljs-string">"3dd4"</span>, <span class="hljs-string">"d"</span>, <span class="hljs-string">"d"</span>]
}</code></pre>
<h1 id="articleHeader27">字符串对象方法</h1>
<h2 id="articleHeader28">String.prototype.search()</h2>
<p>方法执行正则表达式和 String对象之间的一个搜索匹配,如果匹配成功,返回正则表达式在字符串中首次匹配项的索引,否则返回-1。</p>
<p><strong>语法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.search(regexp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">str</span>.<span class="hljs-built_in">search</span>(regexp)</code></pre>
<p>如果传入一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。</p>
<h2 id="articleHeader29">String.prototype.match()</h2>
<p>用于搜索字符串,找到一个或多个与regexp匹配的文本<br><strong>语法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.match(regexp);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">str</span>.<span class="hljs-built_in">match</span>(regexp);</code></pre>
<p><strong>返回值:</strong></p>
<p>一个包含了整个匹配结果以及任何括号捕获的匹配结果的 Array ；如果没有匹配项，则返回 null。regexp是否有g标志对返回值有很大影响。</p>
<h3 id="articleHeader30">非全局调用(不包含g标志)</h3>
<p>返回值和RegExp.prototype.exec()方法一样,就不细说了。</p>
<h3 id="articleHeader31">全局调用(包含g标志)</h3>
<ol>
<li>没有找到任何匹配的字符串,返回null</li>
<li>如果找到了一个或多个匹配的字符串,则返回一个数组,存放字符串中所有匹配的字符串,不包含捕获内容,也不具有index和input属性。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /\d(\w)\d/g;
var str = '1a2b3c4d';
var res = str.match(reg);
console.log(res);  // [&quot;1a2&quot;, &quot;3c4&quot;]
console.log(res.index);  // undefined
console.log(res.input);  // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /\<span class="hljs-built_in">d</span>(\w)\<span class="hljs-keyword">d</span>/<span class="hljs-keyword">g</span>;
<span class="hljs-keyword">var</span> str = '1a2b3c4d';
<span class="hljs-keyword">var</span> res = str.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>);
console.<span class="hljs-built_in">log</span>(res);  <span class="hljs-comment">// ["1a2", "3c4"]</span>
console.<span class="hljs-built_in">log</span>(res.index);  <span class="hljs-comment">// undefined</span>
console.<span class="hljs-built_in">log</span>(res.<span class="hljs-keyword">input</span>);  <span class="hljs-comment">// undefined</span></code></pre>
<h2 id="articleHeader32">String.prototype.split()</h2>
<p>split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组</p>
<p><strong>语法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.split([separator[, limit]]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">str</span><span class="hljs-selector-class">.split</span>(<span class="hljs-selector-attr">[separator[, limit]</span>]);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011570001?w=1444&amp;h=540" src="https://static.alili.tech/img/remote/1460000011570001?w=1444&amp;h=540" alt="split" title="split" style="cursor: pointer;"></span></p>
<h3 id="articleHeader33">separator 参数</h3>
<p>当separator为字符串时,其实也是默认转成正则去执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a, b, c, d';
var arr = str.split(',');
var arr2 = str.split(/,/);
console.log(arr);  // [&quot;a&quot;, &quot; b&quot;, &quot; c&quot;, &quot; d&quot;]
console.log(arr2);  // [&quot;a&quot;, &quot; b&quot;, &quot; c&quot;, &quot; d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> str = 'a, b, c, d';
<span class="hljs-built_in">var</span> arr = str.<span class="hljs-built_in">split</span>(',');
<span class="hljs-built_in">var</span> arr2 = str.<span class="hljs-built_in">split</span>(/,/);
console.<span class="hljs-built_in">log</span>(arr);  // [<span class="hljs-string">"a"</span>, <span class="hljs-string">" b"</span>, <span class="hljs-string">" c"</span>, <span class="hljs-string">" d"</span>]
console.<span class="hljs-built_in">log</span>(arr2);  // [<span class="hljs-string">"a"</span>, <span class="hljs-string">" b"</span>, <span class="hljs-string">" c"</span>, <span class="hljs-string">" d"</span>]</code></pre>
<h3 id="articleHeader34">separator带捕获括号</h3>
<p>如果 separator 包含捕获括号（capturing parentheses），则其匹配结果将会包含在返回的数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a1b2c3d';
var arr = str.split(/(\d)/);
console.log(arr); // [&quot;a&quot;, &quot;1&quot;, &quot;b&quot;, &quot;2&quot;, &quot;c&quot;, &quot;3&quot;, &quot;d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> str = 'a1b2c3d';
<span class="hljs-built_in">var</span> arr = str.<span class="hljs-built_in">split</span>(/(\d)/);
console.<span class="hljs-built_in">log</span>(arr); // [<span class="hljs-string">"a"</span>, <span class="hljs-string">"1"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"3"</span>, <span class="hljs-string">"d"</span>]</code></pre>
<h3 id="articleHeader35">limit参数</h3>
<p>限制返回值中分割元素数量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a b c d e';
var arr = str.split(' ', 3);
console.log(arr); //  [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var <span class="hljs-built_in">str</span> = <span class="hljs-string">'a b c d e'</span>;
var arr = <span class="hljs-built_in">str</span>.<span class="hljs-built_in">split</span>(<span class="hljs-string">' '</span>, <span class="hljs-number">3</span>);
console.<span class="hljs-built_in">log</span>(arr); <span class="hljs-comment">//  ["a", "b", "c"]</span></code></pre>
<h2 id="articleHeader36">String.prototype.replace()</h2>
<p>replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。</p>
<p><strong>注意:</strong> 原字符串不会改变。</p>
<p><strong>语法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.replace(regexp|substr, newSubStr|function)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">str.<span class="hljs-built_in">replace</span>(regexp|<span class="hljs-type">substr</span>, newSubStr|<span class="hljs-type">function</span>)</code></pre>
<h3 id="articleHeader37">String.prototype.replace(substr, newSubStr)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a1b2c3d';
var resStr = str.replace('1', 'X');
console.log(resStr); //  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3d'</span>;
<span class="hljs-keyword">var</span> resStr = str.replace(<span class="hljs-string">'1'</span>, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(resStr); <span class="hljs-comment">//  </span></code></pre>
<h3 id="articleHeader38">String.prototype.replace(regexp, newSubStr)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a1b2c3d';
var resStr = str.replace(/\d/g, 'X');
console.log(resStr); //  aXbXcXd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3d'</span>;
<span class="hljs-keyword">var</span> resStr = str.replace(<span class="hljs-regexp">/\d/g</span>, <span class="hljs-string">'X'</span>);
<span class="hljs-built_in">console</span>.log(resStr); <span class="hljs-comment">//  aXbXcXd</span></code></pre>
<h3 id="articleHeader39">String.prototype.replace(regexp, function)</h3>
<p>function会在每次匹配替换的时候调用,包含四个可选参数</p>
<ol>
<li>匹配到的字符串</li>
<li>正则表达式分组内容,没有分组就没有该参数</li>
<li>匹配项在字符串中的index</li>
<li>原字符串</li>
</ol>
<p><strong>例子:</strong></p>
<p>比如要把'a1b2c3'替换后的结果为'a2b3c4'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a1b2c3';
var resStr = str.replace(/\d/g, function(matchStr, index, originStr) {
    // 此时正则表达式中无捕获,function中则无分组参数
    return parseInt(matchStr) + 1;
});
console.log(resStr); // a2b3c4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">'a1b2c3'</span>;
<span class="hljs-keyword">var</span> resStr = str.replace(<span class="hljs-regexp">/\d/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">matchStr, index, originStr</span>) </span>{
    <span class="hljs-comment">// 此时正则表达式中无捕获,function中则无分组参数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(matchStr) + <span class="hljs-number">1</span>;
});
<span class="hljs-built_in">console</span>.log(resStr); <span class="hljs-comment">// a2b3c4</span></code></pre>
<p>当正则表达式中有捕获时,再看一下另外一个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'a1b2c3d4e';
var resStr = str.replace(/(\d)(\w)(\d)/g, function(matchStr, group1, group2, group3, index, originStr) {
    // 会执行两次回调,打印结果分别如下
    console.log(matchStr)  // 1b2   3d4
    console.log(group1);   // 1     3
    console.log(group2);   // b     d
    console.log(group3);   // 2     4
    return group1 + group3; //把匹配到的文本替换成group1 + group3字符串拼接后的值
});
// 把匹配到的1b2替换成group1 + group3(12), 3d4替换成(34)
console.log(resStr); // a12c34e  把匹配到的1b2替换成group1 + group3(12)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> str = 'a1b2c3d4e';
<span class="hljs-built_in">var</span> resStr = str.replace(/(\d)(\w)(\d)/g, function(matchStr, group1, group2, group3, index, originStr) {
    // 会执行两次回调,打印结果分别如下
    console.<span class="hljs-built_in">log</span>(matchStr)  // <span class="hljs-number">1b2</span>   3d4
    console.<span class="hljs-built_in">log</span>(group1);   // <span class="hljs-number">1</span>     <span class="hljs-number">3</span>
    console.<span class="hljs-built_in">log</span>(group2);   // b     d
    console.<span class="hljs-built_in">log</span>(group3);   // <span class="hljs-number">2</span>     <span class="hljs-number">4</span>
    <span class="hljs-built_in">return</span> group1 + group3; //把匹配到的文本替换成group1 + group3字符串拼接后的值
});
// 把匹配到的<span class="hljs-number">1b2</span>替换成group1 + group3(<span class="hljs-number">12</span>), 3d4替换成(<span class="hljs-number">34</span>)
console.<span class="hljs-built_in">log</span>(resStr); // a12c34e  把匹配到的<span class="hljs-number">1b2</span>替换成group1 + group3(<span class="hljs-number">12</span>)</code></pre>
<p>以上就是我总结的正则表达式相关知识, 感觉把正则搞清楚还是很爽滴, 如发现有问题请多多指教。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript中的正则表达式

## 原文链接
[https://segmentfault.com/a/1190000011569990](https://segmentfault.com/a/1190000011569990)

