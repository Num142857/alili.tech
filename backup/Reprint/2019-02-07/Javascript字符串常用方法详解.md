---
title: 'Javascript字符串常用方法详解' 
date: 2019-02-07 2:30:15
hidden: true
slug: a0xwc6kfr5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">字符串</h2>
<ul>
<li>
<p>字符串就是一个或多个排列在一起的字符，放在单引号或双引号之中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'abc'
&quot;abc&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'abc'</span>
<span class="hljs-string">"abc"</span></code></pre>
</li>
<li>
<p><code>length</code>属性<br>js里的字符串类似于数组，都是一个一个字符拼凑在一起组成的，因此可以用<code>length</code>属性取得字符串的长度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;hello&quot;
str.length;  // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"hello"</span>
str.length;  <span class="hljs-comment">// 5</span></code></pre>
</li>
</ul>
<h2 id="articleHeader1">字符串常用的一些方法</h2>
<h3 id="articleHeader2">1. charAt()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.charAt(n)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">str.charAt(n)</code></pre>
<p>＝&gt; 返回字符串的第 n 个字符，如果不在 0~str.length-1之间，则返回一个空字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;javascript&quot;;
str.charAt(2); //'v'
str.charAt(12); //''" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"javascript"</span>;
str.charAt(<span class="hljs-number">2</span>); <span class="hljs-comment">//'v'</span>
str.charAt(<span class="hljs-number">12</span>); <span class="hljs-comment">//''</span></code></pre>
<h3 id="articleHeader3">2. indexOf()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="indexOf(substr[,start])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">indexOf(substr[,start])</code></pre>
<p>＝&gt; 返回 substr 在字符串 str 中首次出现的位置,从 start 位置开始查找，如果不存在，则返回 -1。  <br>start可以是任意整数，默认值为 0。如果 start &lt; 0 则查找整个字符串（如同传进了 0）。如果 start &gt;= str.length，则该方法返回 -1，除非被查找的字符串是一个空字符串，此时返回 str.length.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;javascript&quot;;
str.indexOf('s');   // 1
str.indexOf('s',6); // -1
str.indexOf('',11);  // 10
str.indexOf('',8);   // 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"javascript"</span>;
str.indexOf(<span class="hljs-string">'s'</span>);   <span class="hljs-comment">// 1</span>
str.indexOf(<span class="hljs-string">'s'</span>,<span class="hljs-number">6</span>); <span class="hljs-comment">// -1</span>
str.indexOf(<span class="hljs-string">''</span>,<span class="hljs-number">11</span>);  <span class="hljs-comment">// 10</span>
str.indexOf(<span class="hljs-string">''</span>,<span class="hljs-number">8</span>);   <span class="hljs-comment">// 8</span></code></pre>
<h3 id="articleHeader4">3. lastIndexOf()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lastIndexOf(substr[,start])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">lastIndexOf(substr[,start])</code></pre>
<p>= &gt; 返回 substr 在字符串 str 中最后出现的位置,从 start 位置 向前开始查找，如果不存在，则返回 -1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'lastindex'.lastIndexOf('a');  // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'lastindex'</span>.lastIndexOf(<span class="hljs-string">'a'</span>);  <span class="hljs-comment">// 1</span></code></pre>
<h3 id="articleHeader5">4. substring()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.substring(start[, end])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">str.substring(start[, end])</code></pre>
<p>= &gt; 返回从 start 到 end（不包括）之间的字符，start、end均为 非负整数。若结束参数(end)省略，则表示从start位置一直截取到最后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'abcdefg';
str.substring(1, 4); //&quot;bcd&quot;
str.substring(1);  // &quot;bcdefg&quot;
str.substring(-1); //&quot;abcdefg&quot;   传入负值时会视为0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'abcdefg'</span>;
str.substring(<span class="hljs-number">1</span>, <span class="hljs-number">4</span>); <span class="hljs-comment">//"bcd"</span>
str.substring(<span class="hljs-number">1</span>);  <span class="hljs-comment">// "bcdefg"</span>
str.substring(<span class="hljs-number">-1</span>); <span class="hljs-comment">//"abcdefg"   传入负值时会视为0</span></code></pre>
<h3 id="articleHeader6">5. slice()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.slice(start[,end])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">str.slice(start[,end])</code></pre>
<p>= &gt; 返回从 start 到 end （不包括）之间的字符，可传负值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'this is awesome';
str.slice(4, -1);  //&quot; is awesom&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'this is awesome'</span>;
str.slice(<span class="hljs-number">4</span>, <span class="hljs-number">-1</span>);  <span class="hljs-comment">//" is awesom"</span></code></pre>
<h3 id="articleHeader7">6. substr()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.slice(start[,end])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">str.slice(start[,end])</code></pre>
<p>= &gt; 返回 str 中从指定位置开始到指定长度的子字符串，start可为负值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;Just give me a reason&quot;;
str.substr(5, 10);  // &quot;give me a &quot;
str.substr(-4, 2);  // &quot;as&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"Just give me a reason"</span>;
str.substr(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>);  <span class="hljs-comment">// "give me a "</span>
str.substr(<span class="hljs-number">-4</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">// "as"</span></code></pre>
<h3 id="articleHeader8">7. replace()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.replace(regexp|substr, newSubStr|function)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.replace(regexp|substr, newSubStr|<span class="hljs-function"><span class="hljs-keyword">function</span>)</span></code></pre>
<p>= &gt; 替换 str 的子字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;do you love me&quot;;
str.replace('love','hate');  // &quot;do you hate me&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"do you love me"</span>;
str.replace(<span class="hljs-string">'love'</span>,<span class="hljs-string">'hate'</span>);  <span class="hljs-comment">// "do you hate me"</span></code></pre>
<h3 id="articleHeader9">8. search()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.search(regexp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.search(regexp)</code></pre>
<p>= &gt;  查找 str 与一个正则表达式是否匹配。如果匹配成功，则返回正则表达式在字符串中首次匹配项的索引；否则，返回 -1。如果参数传入的是一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'I love JavaScript!';
str.search(/java/); // -1
str.search(/Java/); // 7
str.search(/java/i); // 7
str.search('Java'); // 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'I love JavaScript!'</span>;
str.search(<span class="hljs-regexp">/java/</span>); <span class="hljs-comment">// -1</span>
str.search(<span class="hljs-regexp">/Java/</span>); <span class="hljs-comment">// 7</span>
str.search(<span class="hljs-regexp">/java/i</span>); <span class="hljs-comment">// 7</span>
str.search(<span class="hljs-string">'Java'</span>); <span class="hljs-comment">// 7</span></code></pre>
<h3 id="articleHeader10">9. match()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.match(regexp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.match(regexp)</code></pre>
<p>= &gt; 返回一个包含匹配结果的数组，如果没有匹配项，则返回 null。如果参数传入的是一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'Javascript java';
str.match(/Java/); // [&quot;Java&quot;]
str.match(/Java/gi); // [&quot;java&quot;, &quot;Java&quot;]
str.match(/ab/g); // null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'Javascript java'</span>;
str.match(<span class="hljs-regexp">/Java/</span>); <span class="hljs-comment">// ["Java"]</span>
str.match(<span class="hljs-regexp">/Java/gi</span>); <span class="hljs-comment">// ["java", "Java"]</span>
str.match(<span class="hljs-regexp">/ab/g</span>); <span class="hljs-comment">// null</span></code></pre>
<h3 id="articleHeader11">10. split()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.split([separator][, limit])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.split([separator][, limit])</code></pre>
<p>= &gt;返回一个数组，分隔符 separator 可以是一个字符串或正则表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;Hello?World!&quot;;
str.split(); // [&quot;Hello?World!&quot;]
str.split(''); // [&quot;H&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot;, &quot;?&quot;, &quot;W&quot;, &quot;o&quot;, &quot;r&quot;, &quot;l&quot;, &quot;d&quot;, &quot;!&quot;]
str.split('?'); // [&quot;Hello&quot;, &quot;World!&quot;]
str.split('',5); // [&quot;H&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"Hello?World!"</span>;
str.split(); <span class="hljs-comment">// ["Hello?World!"]</span>
str.split(<span class="hljs-string">''</span>); <span class="hljs-comment">// ["H", "e", "l", "l", "o", "?", "W", "o", "r", "l", "d", "!"]</span>
str.split(<span class="hljs-string">'?'</span>); <span class="hljs-comment">// ["Hello", "World!"]</span>
str.split(<span class="hljs-string">''</span>,<span class="hljs-number">5</span>); <span class="hljs-comment">// ["H", "e", "l", "l", "o"]</span></code></pre>
<h3 id="articleHeader12">11. trim()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.trim()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.trim()</code></pre>
<p>= &gt; 去除 str 开头和结尾处的空白字符，返回 str 的一个副本，不影响字符串本身的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = '   abc  ';
str.trim();       // 'abc'
console.log(str); // '   abc  '" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'   abc  '</span>;
str.trim();       <span class="hljs-comment">// 'abc'</span>
<span class="hljs-built_in">console</span>.log(str); <span class="hljs-comment">// '   abc  '</span></code></pre>
<h3 id="articleHeader13">12. toLowerCase()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.toLowerCase()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.toLowerCase()</code></pre>
<p>= &gt; 将 str 转换为小写，并返回 str 的一个副本，不影响字符串本身的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'JavaScript';
str.toLowerCase(); // 'javascript'
console.log(str);  // 'JavaScript'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'JavaScript'</span>;
str.toLowerCase(); <span class="hljs-comment">// 'javascript'</span>
<span class="hljs-built_in">console</span>.log(str);  <span class="hljs-comment">// 'JavaScript'</span></code></pre>
<h3 id="articleHeader14">13. toUpperCase()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.toUpperCase()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">str.toUpperCase()</code></pre>
<p>= &gt; 将 str 转换为大写，并返回 str 的一个副本，不影响字符串本身的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'JavaScript';
str.toUpperCase(); // 'JAVASCRIPT'
console.log(str);  // 'JavaScript'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'JavaScript'</span>;
str.toUpperCase(); <span class="hljs-comment">// 'JAVASCRIPT'</span>
<span class="hljs-built_in">console</span>.log(str);  <span class="hljs-comment">// 'JavaScript'</span></code></pre>
<h2 id="articleHeader15">参考资料</h2>
<p><a href="http://hao.jser.com/archive/10601/?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">js字符串常用的一些方法</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript字符串常用方法详解

## 原文链接
[https://segmentfault.com/a/1190000006027014](https://segmentfault.com/a/1190000006027014)

