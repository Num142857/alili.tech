---
title: '温故js系列（5）-正则表达式&常用代码' 
date: 2019-02-07 2:30:15
hidden: true
slug: tj4l15ti9d
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/6" rel="nofollow noreferrer" target="_blank">正则表达式</a></p>
<h2 id="articleHeader0">JavaScript-正则表达式</h2>
<h3 id="articleHeader1">正则表达式简述</h3>
<p>正则表达式(regular expression)描述了一种字符串匹配模式，可以用来检查一个字符串是否含有某类字符串、将匹配的字符串做替换或者从某个字符串中取出符合某个条件的字符串等。ECMAScript的RegExp对象表示正则表达式，而String 和RegExp 都定义了使用正则表达式进行强大的模式匹配和文本检索与替换的函数。</p>
<h3 id="articleHeader2">正则表达式修饰符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参数       含义                           备注
i       忽略大小写
g       全局匹配
m       多行匹配
u       正确处理四个字节的UTF-16编码       ES6新增
y       确保匹配必须从剩余的第一个位置开始   ES6新增
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>参数       含义                           备注
<span class="hljs-selector-tag">i</span>       忽略大小写
g       全局匹配
m       多行匹配
u       正确处理四个字节的UTF-<span class="hljs-number">16</span>编码       ES6新增
y       确保匹配必须从剩余的第一个位置开始   ES6新增
</code></pre>
<h3 id="articleHeader3">正则表达式创建</h3>
<p>创建正则表达式和创建字符串类似，创建正则表达式提供了两种方法，一种是采用new<br>运算符，另一个是采用字面量方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = new RegExp('xzavier');       //第一个参数字符串
var xzavier = new RegExp('xzavier', 'ig'); //第二个参数可选修饰符
var xzavier = /xzavier/;                   //直接用两个反斜杠
var xzavier = /xzavier/ig;                 //第二个斜杠后面加上的是修饰符" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xzavier'</span>);       <span class="hljs-comment">//第一个参数字符串</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xzavier'</span>, <span class="hljs-string">'ig'</span>); <span class="hljs-comment">//第二个参数可选修饰符</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-regexp">/xzavier/</span>;                   <span class="hljs-comment">//直接用两个反斜杠</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-regexp">/xzavier/ig</span>;                 <span class="hljs-comment">//第二个斜杠后面加上的是修饰符</span></code></pre>
<p>和对象数组等一样，我们一致推崇使用字面量的方式。简便快捷。但是也有必须使用new的方式，<br>当你的正则表达式中含有变量的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = 'v';
var pattern = new RegExp('xza' + reg + 'ier'); // 这时候就不能使用字面量的方式了
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> reg = <span class="hljs-string">'v'</span>;
<span class="hljs-keyword">var</span> pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xza'</span> + reg + <span class="hljs-string">'ier'</span>); <span class="hljs-comment">// 这时候就不能使用字面量的方式了</span>
</code></pre>
<h3 id="articleHeader4">正则表达式方法</h3>
<p>RegExp 对象的test() 方法在字符串中查找是否存在指定的正则表达式并返回布尔值，如果存在则返回true，不存在则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = new RegExp('xzavier', 'i');  //正则模式，不区分大小写
var pattern1 = /xzavier/i; //创建正则模式，不区分大小写
var str = 'This is Xzavier!'; 
console.log(pattern.test(str));  //true
console.log(pattern1.test(str));  //true
console.log(/xzavier/i.test(str));  //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xzavier'</span>, <span class="hljs-string">'i'</span>);  <span class="hljs-comment">//正则模式，不区分大小写</span>
<span class="hljs-keyword">var</span> pattern1 = <span class="hljs-regexp">/xzavier/i</span>; <span class="hljs-comment">//创建正则模式，不区分大小写</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'This is Xzavier!'</span>; 
<span class="hljs-built_in">console</span>.log(pattern.test(str));  <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(pattern1.test(str));  <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/xzavier/i</span>.test(str));  <span class="hljs-comment">//true</span>
</code></pre>
<p>RegExp 对象的exec()方法也用于在字符串中查找指定正则表达式，如果exec()方法执行成<br>功，则返回包含该查找字符串的相关信息数组。如果执行失败，则返回null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = new RegExp('xzavier', 'i'); 
var pattern1 = /xzavier/i; 
var str = 'This is Xzavier!'; 
console.log(pattern.exec(str));  //[&quot;Xzavier&quot;]
console.log(pattern1.exec(str));  //[&quot;Xzavier&quot;]
console.log(/xzavier1/i.exec(str));  //null
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xzavier'</span>, <span class="hljs-string">'i'</span>); 
<span class="hljs-keyword">var</span> pattern1 = <span class="hljs-regexp">/xzavier/i</span>; 
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'This is Xzavier!'</span>; 
<span class="hljs-built_in">console</span>.log(pattern.exec(str));  <span class="hljs-comment">//["Xzavier"]</span>
<span class="hljs-built_in">console</span>.log(pattern1.exec(str));  <span class="hljs-comment">//["Xzavier"]</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/xzavier1/i</span>.exec(str));  <span class="hljs-comment">//null</span>
</code></pre>
<p>String 对象也提供了4 个使用正则表达式的方法。<br>match(pattern) 返回pattern中的匹配的字符串或null:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /xzavier/ig;   //全局匹配
var str = 'This is Xzavier, this is Xzavier too.'; 
console.log(str.match(pattern));  //[&quot;Xzavier&quot;, &quot;Xzavier&quot;]
console.log(str.match(pattern).length);  //2
console.log('javascript'.match(/xzavier/ig));  //null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var pattern = /xzavier/ig;   <span class="hljs-comment">//全局匹配</span>
var <span class="hljs-built_in">str</span> = <span class="hljs-string">'This is Xzavier, this is Xzavier too.'</span>; 
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.<span class="hljs-built_in">match</span>(pattern));  <span class="hljs-comment">//["Xzavier", "Xzavier"]</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.<span class="hljs-built_in">match</span>(pattern).length);  <span class="hljs-comment">//2</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'javascript'</span>.<span class="hljs-built_in">match</span>(/xzavier/ig));  <span class="hljs-comment">//null</span></code></pre>
<p>replace(pattern, replacement) 用replacement替换pattern:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /xzavier/ig;  
var str = 'This is Xzavier, this is Xzavier too.'; 
console.log(str.replace(pattern, 'JavaScript'));  //This is JavaScript, this is JavaScript too." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var pattern = <span class="hljs-regexp">/xzavier/ig</span>;  
var str = <span class="hljs-string">'This is Xzavier, this is Xzavier too.'</span>; 
<span class="hljs-built_in">console</span>.log(str.replace(pattern, <span class="hljs-string">'JavaScript'</span>));  <span class="hljs-regexp">//</span>This <span class="hljs-keyword">is</span> JavaScript, <span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> JavaScript too.</code></pre>
<p>search(pattern) 返回字符串中pattern开始位置,查找到返回位置，否则返回-1:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /xzavier/i;  
var str = 'This is Xzavier, this is Xzavier too.'; 
var str1 = 'This is JavaScript, this is JavaScript too.'; 
console.log(str.search(pattern));   //8
console.log(str1.search(pattern));   //-1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/xzavier/i</span>;  
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'This is Xzavier, this is Xzavier too.'</span>; 
<span class="hljs-keyword">var</span> str1 = <span class="hljs-string">'This is JavaScript, this is JavaScript too.'</span>; 
<span class="hljs-built_in">console</span>.log(str.search(pattern));   <span class="hljs-comment">//8</span>
<span class="hljs-built_in">console</span>.log(str1.search(pattern));   <span class="hljs-comment">//-1</span></code></pre>
<p>split(pattern) 返回字符串按指定pattern 拆分的数组:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = / /ig;  
var str = 'This is Xzavier, this is Xzavier too.'; 
console.log(str.split(pattern));   //[&quot;This&quot;, &quot;is&quot;, &quot;Xzavier,&quot;, &quot;this&quot;, &quot;is&quot;, &quot;Xzavier&quot;, &quot;too.&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> pattern = / /ig;  
<span class="hljs-built_in">var</span> str = 'This <span class="hljs-built_in">is</span> Xzavier, this <span class="hljs-built_in">is</span> Xzavier too.'; 
console.<span class="hljs-built_in">log</span>(str.<span class="hljs-built_in">split</span>(pattern));   //[<span class="hljs-string">"This"</span>, <span class="hljs-string">"is"</span>, <span class="hljs-string">"Xzavier,"</span>, <span class="hljs-string">"this"</span>, <span class="hljs-string">"is"</span>, <span class="hljs-string">"Xzavier"</span>, <span class="hljs-string">"too."</span>]</code></pre>
<h3 id="articleHeader5">RegExp对象的静态属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性              短名      含义
input             $_    当前被匹配的字符串
lastMatch         $&amp;    最后一个匹配字符串
lastParen         $+    最后一对圆括号内的匹配子串
leftContext       $`    最后一次匹配前的子串
rightContext      $'    在上次匹配之后的子串

var pattern = /(x)zavier/;
var str = 'This is xzavier！';
pattern.test(str); 
console.log(RegExp.input); //This is xzavier！
console.log(RegExp.leftContext); //This is 
console.log(RegExp.rightContext); //！
console.log(RegExp.lastMatch); //xzavier
console.log(RegExp.lastParen); //x
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>属性              短名      含义
input             $_    当前被匹配的字符串
lastMatch         $&amp;    最后一个匹配字符串
lastParen         $+    最后一对圆括号内的匹配子串
leftContext       $`    最后一次匹配前的子串
rightContext      $'    在上次匹配之后的子串

var pattern = /(x)zavier/;
var str = <span class="hljs-string">'This is xzavier！'</span>;
pattern.test(str); 
console.<span class="hljs-keyword">log</span>(RegExp.input); <span class="hljs-comment">//This is xzavier！</span>
console.<span class="hljs-keyword">log</span>(RegExp.leftContext); <span class="hljs-comment">//This is </span>
console.<span class="hljs-keyword">log</span>(RegExp.rightContext); <span class="hljs-comment">//！</span>
console.<span class="hljs-keyword">log</span>(RegExp.lastMatch); <span class="hljs-comment">//xzavier</span>
console.<span class="hljs-keyword">log</span>(RegExp.lastParen); <span class="hljs-comment">//x</span>
</code></pre>
<h3 id="articleHeader6">RegExp对象的实例属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性                   含义
global       Boolean值，表示g是否已设置
ignoreCase   Boolean 值，表示i 是否已设置
lastIndex    整数，代表下次匹配将从哪里字符位置开始
multiline    Boolean值，表示m是否已设置
Source       正则表达式的源字符串形式

var pattern = /xzavier/ig;
console.log(pattern.global); //true，是否设置了全局
console.log(pattern.ignoreCase); //true，是否设置了忽略大小写
console.log(pattern.multiline); //false，是否设置了换行
console.log(pattern.lastIndex); //0，下次匹配位置
console.log(pattern.source); //xzavier，正则表达式的源字符串
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>属性                   含义
<span class="hljs-built_in">global</span>       <span class="hljs-built_in">Boolean</span>值，表示g是否已设置
ignoreCase   <span class="hljs-built_in">Boolean</span> 值，表示i 是否已设置
lastIndex    整数，代表下次匹配将从哪里字符位置开始
multiline    <span class="hljs-built_in">Boolean</span>值，表示m是否已设置
Source       正则表达式的源字符串形式

<span class="hljs-built_in">var</span> pattern = /xzavier/ig;
console.<span class="hljs-keyword">log</span>(pattern.<span class="hljs-built_in">global</span>); <span class="hljs-comment">//true，是否设置了全局</span>
console.<span class="hljs-keyword">log</span>(pattern.ignoreCase); <span class="hljs-comment">//true，是否设置了忽略大小写</span>
console.<span class="hljs-keyword">log</span>(pattern.multiline); <span class="hljs-comment">//false，是否设置了换行</span>
console.<span class="hljs-keyword">log</span>(pattern.lastIndex); <span class="hljs-comment">//0，下次匹配位置</span>
console.<span class="hljs-keyword">log</span>(pattern.source); <span class="hljs-comment">//xzavier，正则表达式的源字符串</span>
</code></pre>
<h3 id="articleHeader7">正则表达式元字符</h3>
<h4>字符类：单个字符和数字</h4>
<p><span class="img-wrap"><img data-src="/img/bVzioH?w=417&amp;h=134" src="https://static.alili.tech/img/bVzioH?w=417&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>说一下/\./ 和 /[.]/ 只能匹配'.',不匹配通配符</p>
<p><code>\\</code> 引用符，用来将这里列出的这些元字符当作普通的字符来进行匹配。如.用来匹配点字符，而不是任何字符的通配符。</p>
<p><code>[ ]</code>,<code>[c1-c2]</code>,<code>[^c1-c2]</code><br>　　字符组，匹配括号中的任何一个字符,并不是要全部匹配。如/x[zav]e/匹配xze、xae和xve，但是不匹配xxe。如/[0-9]/可以匹配任何数字字符；如/[A-Za-z]/可以匹配任何大小写字母。如正则表达式<code>[^269A-Z]</code> 将匹配除了2、6、9和所有大写字母之外的任何字符。</p>
<p>对于这两个操作符，特殊符号没有绝对规律，倒是特殊字母匹配符还是有规律的，见下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'love.'.replace(/./, '');  //&quot;ove.&quot;  通配
'love.'.replace(/\./, '');  //&quot;love&quot;  点
'love.'.replace(/[.]/, ''); //&quot;love&quot;  点
'love.'.replace(/[\.]/, ''); //&quot;love&quot;  点

但是：

'lo v^se.'.replace(/\^/, ''); //&quot;lo vse.&quot;  匹配^
'lo v^se.'.replace(/[^]/, '');  //&quot;o v^se.&quot; 匹配开始去了，并没有匹配^
'lo v^se.'.replace(/[\^]/, ''); //&quot;lo vse.&quot; 要加一个这样才匹配^


'lo vse.'.replace(/\s/, '');  //&quot;lovse.&quot; 匹配空格
'lo vse.'.replace(/[s]/, ''); //&quot;lo ve.&quot;  匹配字母
'lo vse.'.replace(/[\s]/, '');  //&quot;lovse.&quot;  要加一个\才匹配空格

'    lovte.'.replace(/\t/, '');  //&quot;lovte. 匹配制表符
'    lovte.'.replace(/[t]/, ''); //&quot;    love.&quot;  匹配字母
'    lovte.'.replace(/[\t]/, '');  //&quot;lovte.&quot;  要加一个\才匹配制表符
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-string">'love.'</span>.replace(<span class="hljs-regexp">/./</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"ove."</span>  通配
<span class="hljs-string">'love.'</span>.replace(<span class="hljs-regexp">/\./</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"love"</span>  点
<span class="hljs-string">'love.'</span>.replace(<span class="hljs-regexp">/[.]/</span>, <span class="hljs-string">''</span>); <span class="hljs-regexp">//</span><span class="hljs-string">"love"</span>  点
<span class="hljs-string">'love.'</span>.replace(<span class="hljs-regexp">/[\.]/</span>, <span class="hljs-string">''</span>); <span class="hljs-regexp">//</span><span class="hljs-string">"love"</span>  点

但是：

<span class="hljs-string">'lo v^se.'</span>.replace(<span class="hljs-regexp">/\^/</span>, <span class="hljs-string">''</span>); <span class="hljs-regexp">//</span><span class="hljs-string">"lo vse."</span>  匹配^
<span class="hljs-string">'lo v^se.'</span>.replace(<span class="hljs-regexp">/[^]/</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"o v^se."</span> 匹配开始去了，并没有匹配^
<span class="hljs-string">'lo v^se.'</span>.replace(<span class="hljs-regexp">/[\^]/</span>, <span class="hljs-string">''</span>); <span class="hljs-regexp">//</span><span class="hljs-string">"lo vse."</span> 要加一个这样才匹配^


<span class="hljs-string">'lo vse.'</span>.replace(<span class="hljs-regexp">/\s/</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"lovse."</span> 匹配空格
<span class="hljs-string">'lo vse.'</span>.replace(<span class="hljs-regexp">/[s]/</span>, <span class="hljs-string">''</span>); <span class="hljs-regexp">//</span><span class="hljs-string">"lo ve."</span>  匹配字母
<span class="hljs-string">'lo vse.'</span>.replace(<span class="hljs-regexp">/[\s]/</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"lovse."</span>  要加一个\才匹配空格

<span class="hljs-string">'    lovte.'</span>.replace(<span class="hljs-regexp">/\t/</span>, <span class="hljs-string">''</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"lovte. 匹配制表符
'    lovte.'.replace(/[t]/, ''); //"</span>    love.<span class="hljs-string">"  匹配字母
'    lovte.'.replace(/[\t]/, '');  //"</span>lovte.<span class="hljs-string">"  要加一个\才匹配制表符
</span></code></pre>
<h4>字符类：空白字符</h4>
<p><span class="img-wrap"><img data-src="/img/bVzirU?w=417&amp;h=153" src="https://static.alili.tech/img/bVzirU?w=417&amp;h=153" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>\b是匹配字符串开头结尾及空格回车等的位置,单词边界, 不会匹配空格符本身。\s则是匹配空白字符本身、空格符本身、换行符本身。</p>
<h4>字符类：锚字符</h4>
<p><span class="img-wrap"><img data-src="/img/bVzir0?w=417&amp;h=153" src="https://static.alili.tech/img/bVzir0?w=417&amp;h=153" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>字符类：重复字符</h4>
<p><span class="img-wrap"><img data-src="/img/bVzir2?w=417&amp;h=96" src="https://static.alili.tech/img/bVzir2?w=417&amp;h=96" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>字符类：替代字符</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a|b|c    匹配a或b或c中的任意一个
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>a|<span class="hljs-type">b</span>|<span class="hljs-type">c</span>    匹配a或b或c中的任意一个
</code></pre>
<h4>字符类：记录字符</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$n     与 regexp 中的第 n(1~99) 个子表达式相匹配的文本
$&amp;     表示与 regexp 相匹配的子串
$`     位于匹配子串左侧的文本
$'     位于匹配子串右侧的文本
$$     直接量符号

'you are beautiful'.replace(/beautiful/g, 'so $&amp;');  //&quot;you are so beautiful&quot;
'leftright'.replace(/right/, '$`');  //&quot;leftleft&quot;
'leftright'.replace(/left/, &quot;$'&quot;);  //&quot;rightright&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$n</span>     与 regexp 中的第 n(<span class="hljs-number">1</span>~<span class="hljs-number">99</span>) 个子表达式相匹配的文本
<span class="hljs-variable">$&amp;</span>     表示与 regexp 相匹配的子串
<span class="hljs-variable">$`</span>     位于匹配子串左侧的文本
<span class="hljs-variable">$'</span>     位于匹配子串右侧的文本
<span class="hljs-variable">$$</span>     直接量符号

<span class="hljs-string">'you are beautiful'</span>.replace(<span class="hljs-regexp">/beautiful/g</span>, <span class="hljs-string">'so $&amp;'</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"you are so beautiful"</span>
<span class="hljs-string">'leftright'</span>.replace(<span class="hljs-regexp">/right/</span>, <span class="hljs-string">'$`'</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"leftleft"</span>
<span class="hljs-string">'leftright'</span>.replace(<span class="hljs-regexp">/left/</span>, <span class="hljs-string">"$'"</span>);  <span class="hljs-regexp">//</span><span class="hljs-string">"rightright"</span>
</code></pre>
<h3 id="articleHeader8">贪婪模式和惰性模式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="贪婪  惰性
'+'   +?
?     ??
\*    *?
{n}   {n}?
{n,}  {n,}?
{n,m} {n,m}?

var pattern = /[a-z]+/; //贪婪匹配，全部替换
var str = 'qqqwwweee';
var result = str.replace(pattern, 'xxx');
console.log(result);  //xxx

var pattern = /[a-z]+?/; //?号关闭了贪婪匹配，只替换了第一个
var str = 'qqqwwweee';
var result = str.replace(pattern, 'xxx');
console.log(result);  //xxxqqwwweee
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>贪婪  惰性
<span class="hljs-string">'+'</span>   +?
?     ??
\*    *?
{n}   {n}?
{n,}  {n,}?
{n,m} {n,m}?

<span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/[a-z]+/</span>; <span class="hljs-comment">//贪婪匹配，全部替换</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'qqqwwweee'</span>;
<span class="hljs-keyword">var</span> result = str.replace(pattern, <span class="hljs-string">'xxx'</span>);
<span class="hljs-built_in">console</span>.log(result);  <span class="hljs-comment">//xxx</span>

<span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/[a-z]+?/</span>; <span class="hljs-comment">//?号关闭了贪婪匹配，只替换了第一个</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'qqqwwweee'</span>;
<span class="hljs-keyword">var</span> result = str.replace(pattern, <span class="hljs-string">'xxx'</span>);
<span class="hljs-built_in">console</span>.log(result);  <span class="hljs-comment">//xxxqqwwweee</span>
</code></pre>
<h3 id="articleHeader9">断言</h3>
<p>先行断言： x(?=y)，找到x后面紧跟着y的位置，如果找到则匹配这个位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /(xza(?=vier))/; //xza后面必须跟着vier才能捕获
var str = 'hello,xzavier';
console.log(pattern.test(str));  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(xza(?=vier))/</span>; <span class="hljs-comment">//xza后面必须跟着vier才能捕获</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello,xzavier'</span>;
<span class="hljs-built_in">console</span>.log(pattern.test(str));  <span class="hljs-comment">//true</span></code></pre>
<p>先行否定断言 x(?!y)，找到x后面不是y的位置，如果找到则匹配这个位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /(xza(?!vier))/; //xza后面必须跟着的不是vier才能捕获
var str = 'hello,xzaqqqvier';
console.log(pattern.test(str));  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(xza(?!vier))/</span>; <span class="hljs-comment">//xza后面必须跟着的不是vier才能捕获</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello,xzaqqqvier'</span>;
<span class="hljs-built_in">console</span>.log(pattern.test(str));  <span class="hljs-comment">//true</span></code></pre>
<p>可惜，JavaScript不支持 后行断言 和 后行否定断言。<br>当然，现在不支持，不代表未来不支持。虽然外面最新的ES6也没有推出正式的标准，但是已经有了<a href="https://github.com/goyakin/es-regexp-lookbehind" rel="nofollow noreferrer" target="_blank">提案</a>，ES7中应该会推出标准实现 后行断言 和 后行否定断言。<br>届时我们可能就能用到这两个功能，这样的代码了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /(?=xza)vier/; //vier前面必须是xza才能捕获
var str = 'hello,xzavier';
console.log(pattern.test(str));  //true

var pattern = /(?!xza)vier)/; //vier前面必须不是xza才能捕获
var str = 'hello,xzaqqqvier';
console.log(pattern.test(str));  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(?=xza)vier/</span>; <span class="hljs-comment">//vier前面必须是xza才能捕获</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello,xzavier'</span>;
<span class="hljs-built_in">console</span>.log(pattern.test(str));  <span class="hljs-comment">//true</span>

<span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(?!xza)vier)/</span>; <span class="hljs-comment">//vier前面必须不是xza才能捕获</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello,xzaqqqvier'</span>;
<span class="hljs-built_in">console</span>.log(pattern.test(str));  <span class="hljs-comment">//true</span></code></pre>
<p>这代码现在是不能使用的，但是我们想要实现类似的功能，用别的方式，多写两行代码也就实现了。</p>
<h3 id="articleHeader10">捕获性分组和非捕获性分组</h3>
<p>捕获性分组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /(\d+)([a-z])/; //捕获性分组
var str = '123abc';
console.log(pattern.exec(str));  //[&quot;123a&quot;, &quot;123&quot;, &quot;a&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(\d+)([a-z])/</span>; <span class="hljs-comment">//捕获性分组</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'123abc'</span>;
<span class="hljs-built_in">console</span>.log(pattern.exec(str));  <span class="hljs-comment">//["123a", "123", "a"]</span>
</code></pre>
<p>非捕获性分组  格式: (?:x)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /(\d+)(?:[a-z])/; //非捕获性分组
var str = '123abc';
console.log(pattern.exec(str));  //[&quot;123a&quot;, &quot;123&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/(\d+)(?:[a-z])/</span>; <span class="hljs-comment">//非捕获性分组</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'123abc'</span>;
<span class="hljs-built_in">console</span>.log(pattern.exec(str));  <span class="hljs-comment">//["123a", "123"]</span>
</code></pre>
<h3 id="articleHeader11">常用正则表达式</h3>
<p>亲测有效：</p>
<p>匹配中文字符： <code>[\u4e00-\u9fa5]</code><br>匹配Email地址：<code>\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/</code><br>去除首尾空白：<code>/(^\s*)|(\s*$)/g</code><br>去除多余空格：<code>/\s/g</code><br>身份证：<code>\d{17}[\d|x]|\d{15}</code><br>ip地址：<code>\d+\.\d+\.\d+\.\d+</code><br>网址URL： <code>^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+</code><br>QQ号：<code>[1-9]{4,}</code><br>数字串千分法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function commafy(num){
      return num &amp;&amp; num
          .toString()
          .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
              return $2 + ',';
          });
  }
  commafy(1234567.002);
  // 1,234,567.002&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commafy</span>(<span class="hljs-params">num</span>)</span>{
      <span class="hljs-keyword">return</span> num &amp;&amp; num
          .toString()
          .replace(<span class="hljs-regexp">/(\d)(?=(\d{3})+\.)/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$<span class="hljs-number">1</span>, $<span class="hljs-number">2</span></span>)</span>{
              <span class="hljs-keyword">return</span> $<span class="hljs-number">2</span> + <span class="hljs-string">','</span>;
          });
  }
  commafy(<span class="hljs-number">1234567.002</span>);
  <span class="hljs-comment">// 1,234,567.002"</span></code></pre>
<p>判断手机app内置浏览器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ua = navigator.userAgent.toLowerCase(),
    isWx = /microMessenger/i.test(ua),
    isQQ = /\s+qq\//ig.test(ua),
    isQZone = /qzone/i.test(ua),
    isWeibo = /weibo/i.test(ua);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase(),
    isWx = <span class="hljs-regexp">/microMessenger/i</span>.test(ua),
    isQQ = <span class="hljs-regexp">/\s+qq\//ig</span>.test(ua),
    isQZone = <span class="hljs-regexp">/qzone/i</span>.test(ua),
    isWeibo = <span class="hljs-regexp">/weibo/i</span>.test(ua);</code></pre>
<p>首字母大写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str = &quot;hello woRld&quot;;
String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (s) {
      return s.toUpperCase();
   });
};
console.log(str.initCap());  //Hello World" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>str = <span class="hljs-string">"hello woRld"</span>;
<span class="hljs-built_in">String</span>.prototype.initCap = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.toLowerCase().replace(<span class="hljs-regexp">/(?:^|\s)[a-z]/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">s</span>) </span>{
      <span class="hljs-keyword">return</span> s.toUpperCase();
   });
};
<span class="hljs-built_in">console</span>.log(str.initCap());  <span class="hljs-comment">//Hello World</span></code></pre>
<p>"yyyy-mm-dd" 格式的日期校验(平闰年)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testDate(str) {
    var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
    return reg.test(str);
}
testDate('2016-03-12'); //true
testDate('2016-23-12'); //false
testDate('2016-02-29'); //true
testDate('2017-02-29'); //false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>function testDate(str) {
    var reg = /^(?:(?!<span class="hljs-number">0000</span>)[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]{<span class="hljs-number">4</span>}-(?:(?:<span class="hljs-number">0</span>[<span class="hljs-number">1</span><span class="hljs-number">-9</span>]|<span class="hljs-number">1</span>[<span class="hljs-number">0</span><span class="hljs-number">-2</span>])-(?:<span class="hljs-number">0</span>[<span class="hljs-number">1</span><span class="hljs-number">-9</span>]|<span class="hljs-number">1</span>[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]|<span class="hljs-number">2</span>[<span class="hljs-number">0</span><span class="hljs-number">-8</span>])|(?:<span class="hljs-number">0</span>[<span class="hljs-number">13</span><span class="hljs-number">-9</span>]|<span class="hljs-number">1</span>[<span class="hljs-number">0</span><span class="hljs-number">-2</span>])-(?:<span class="hljs-number">29</span>|<span class="hljs-number">30</span>)|(?:<span class="hljs-number">0</span>[<span class="hljs-number">13578</span>]|<span class="hljs-number">1</span>[<span class="hljs-number">02</span>])<span class="hljs-number">-31</span>)|(?:[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]{<span class="hljs-number">2</span>}(?:<span class="hljs-number">0</span>[<span class="hljs-number">48</span>]|[<span class="hljs-number">2468</span>][<span class="hljs-number">048</span>]|[<span class="hljs-number">13579</span>][<span class="hljs-number">26</span>])|(?:<span class="hljs-number">0</span>[<span class="hljs-number">48</span>]|[<span class="hljs-number">2468</span>][<span class="hljs-number">048</span>]|[<span class="hljs-number">13579</span>][<span class="hljs-number">26</span>])<span class="hljs-number">00</span>)<span class="hljs-number">-02</span><span class="hljs-number">-29</span>)$/;
    return reg.test(str);
}
testDate(<span class="hljs-string">'2016-03-12'</span>); //true
testDate(<span class="hljs-string">'2016-23-12'</span>); //false
testDate(<span class="hljs-string">'2016-02-29'</span>); //true
testDate(<span class="hljs-string">'2017-02-29'</span>); //false
</code></pre>
<p>延伸阅读：<a href="http://es6.ruanyifeng.com/#docs/regex" rel="nofollow noreferrer" target="_blank">正则表达式的扩展</a><br>测试：<a href="http://tool.oschina.net/regex/" rel="nofollow noreferrer" target="_blank">在线正则表达式测试</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（5）-正则表达式&常用代码

## 原文链接
[https://segmentfault.com/a/1190000005990323](https://segmentfault.com/a/1190000005990323)

