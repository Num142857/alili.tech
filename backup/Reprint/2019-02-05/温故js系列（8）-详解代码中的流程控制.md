---
title: '温故js系列（8）-详解代码中的流程控制' 
date: 2019-02-05 2:30:09
hidden: true
slug: skczyez87k
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/9" rel="nofollow noreferrer" target="_blank">流程控制</a></p>
<h2 id="articleHeader0">JavaScript-流程控制</h2>
<p>JavaScript是单线程的，一个语句一个语句的执行。语句是执行过程中的流程、限定与约定，形式上可以是单行语句，或者由一对大括号"{}"括起来的复合语句，复合语句整体可以作为一个单行语句处理。那么，代码中，流程控制就显得格外重要了。JavaScript也规定了一些语句和一些关键字用于流程控制。</p>
<h2 id="articleHeader1">if语句</h2>
<h3 id="articleHeader2">if (条件表达式) {语句}</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(2 > 1){
    console.log('xzavier win');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span>(<span class="hljs-number">2</span> &gt; <span class="hljs-number">1</span>){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win'</span>)<span class="hljs-comment">;</span>
}</code></pre>
<p>javascript会判断括号里的条件表达式的值。如果值为truthy类型的值，也就是真，则执行后面的一条语句，否则不执行。这个语句无可厚非，使用率也是极高的，有时候会使用短连接来替代：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 > 1 &amp;&amp; console.log('xzavier win');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">2 </span>&gt; <span class="hljs-number">1</span> &amp;&amp; console.<span class="hljs-keyword">log</span>(<span class="hljs-comment">'xzavier win');</span>
</code></pre>
<p>想了解此运算符以及更多运算符参考： <a href="https://segmentfault.com/a/1190000005927342">运算符详解</a></p>
<p>关于判断参见本系列文章：<a href="https://segmentfault.com/a/1190000006672446" target="_blank">代码中的那些判断</a></p>
<h3 id="articleHeader3">if (条件表达式) {语句;} else {语句;}</h3>
<p>if为真值（Boolean转换），则执行if里的代码，否则执行else里的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (2 > 1) {
    console.log('xzavier win'); 
} else {
    console.log('xzavier fail'); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (<span class="hljs-number">2</span> &gt; <span class="hljs-number">1</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win'</span>)<span class="hljs-comment">; </span>
} <span class="hljs-keyword">else</span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier fail'</span>)<span class="hljs-comment">; </span>
}</code></pre>
<p>这个语句的使用也无需多说，有时候会使用三目运算符代替：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 > 3 ? console.log('xzavier win') : console.log('xzavier fail');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">2 </span>&gt; <span class="hljs-number">3</span> ? console.<span class="hljs-keyword">log</span>(<span class="hljs-comment">'xzavier win') : console.log('xzavier fail');</span>
</code></pre>
<p>有时候设计到赋值的if...else，也可以使用短连接。同参考上面一篇文章。</p>
<h3 id="articleHeader4">if (条件表达式) {语句;} else if (条件表达式) {语句;} ... else {语句;}</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (1 > 2) {
    console.log('xzavier win'); 
} else if(3 > 2){
    console.log('xzavier win2'); 
} else {
    console.log('xzavier fail'); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> &gt; <span class="hljs-number">2</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win'</span>)<span class="hljs-comment">; </span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-number">3</span> &gt; <span class="hljs-number">2</span>){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win2'</span>)<span class="hljs-comment">; </span>
} <span class="hljs-keyword">else</span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier fail'</span>)<span class="hljs-comment">; </span>
}</code></pre>
<p>JavaScript其实是没有else if的，else if算是一种封装。看这里的js判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 3, b = 2;
a > b // true
a > b // false
a = b // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>var <span class="hljs-attr">a</span> = <span class="hljs-number">3</span>, <span class="hljs-attr">b</span> = <span class="hljs-number">2</span>;
a &gt; b // <span class="hljs-literal">true</span>
a &gt; b // <span class="hljs-literal">false</span>
<span class="hljs-attr">a</span> = b // <span class="hljs-literal">false</span></code></pre>
<p>额(⊙o⊙)…这不是在逗我吗？不，我只是用最简单的判断说一下js的判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a >= b // true  
//其实它是先判断了 a < b 为false 再用“非正即反” 来返回 a >= b 的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span> &gt;= <span class="hljs-selector-tag">b</span> <span class="hljs-comment">// true  </span>
<span class="hljs-comment">//其实它是先判断了 a &lt; b 为false 再用“非正即反” 来返回 a &gt;= b 的值</span></code></pre>
<p>不信？看这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {};  // 你可以添加任意属性 {x:3};
var b = {};  // 你可以添加任意属性 {z:2};;
a < b;    // false
a == b;   // false
a > b;    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var a = {};  <span class="hljs-regexp">//</span> 你可以添加任意属性 {<span class="hljs-symbol">x:</span><span class="hljs-number">3</span>};
var b = {};  <span class="hljs-regexp">//</span> 你可以添加任意属性 {<span class="hljs-symbol">z:</span><span class="hljs-number">2</span>};;
a &lt; b;    <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
a == b;   <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
a &gt; b;    <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span></code></pre>
<p>对象的比较，可以参见本系列判断相关的文章。<br>看上面没问题是吧，但是用 &gt;= 就不一样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a <= b;    // true
a >= b;    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>a &lt;= b;    <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
a &gt;= b;    <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span></code></pre>
<p>我...所以，也根据语言规范，先对 &lt;= 的另一面求值，再“非正即反”。</p>
<p>那么回到else if呢，上面的代码其实最终是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (1 > 2) {
    console.log('xzavier win'); 
} else {
     if(3 > 2){
        console.log('xzavier win2'); 
    } else {
        console.log('xzavier fail'); 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> &gt; <span class="hljs-number">2</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win'</span>)<span class="hljs-comment">; </span>
} <span class="hljs-keyword">else</span> {
     <span class="hljs-keyword">if</span>(<span class="hljs-number">3</span> &gt; <span class="hljs-number">2</span>){
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier win2'</span>)<span class="hljs-comment">; </span>
    } <span class="hljs-keyword">else</span> {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier fail'</span>)<span class="hljs-comment">; </span>
    }
}</code></pre>
<p>把它拆分为多个if...else... 这只是个探究，因为else if司空见惯，代码又少，语义很好，所以使用得多。所以，尽情的使用吧，我的意思是别避开写else...if...，不是写一大堆else...if...，如果有一堆else...if...，那还是用下面的switch吧</p>
<h2 id="articleHeader5">switch语句</h2>
<p>switch 语句是多重条件判断，用于多个值相等的比较。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 'boy';
switch (xzavier) {
    case 'girl' :
        console.log('xzavier is a girl');
        break;
    case 'boy' :
        console.log('xzavier is a boy');
        break;
    case 'man' :
        console.log('xzavier is a man');
        break;
    default : 
        console.log('time error');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-string">'boy'</span>;
<span class="hljs-keyword">switch</span> (xzavier) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'girl'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a girl'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'boy'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a boy'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'man'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a man'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span> : 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'time error'</span>);
}</code></pre>
<p>if和switch之间可以转换，当条件过多时，使用switch可以让代码更清晰，更好看。</p>
<p>这里说一下switch，它对括号里的语句求值一次，然后将返回值与每个case表达式进行匹配。如果找到一个匹配，就会开始执行那个匹配的case里的代码，直到遇到一个break或者直到switch块末尾。<br>所以，写好<code>break</code>，很重要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 'boy';
switch (xzavier) {
    case 'girl' :
        console.log('xzavier is a girl');
        break;
    case 'boy' :
        console.log('xzavier is a boy');
    case 'man' :
        console.log('xzavier is a man');
        break;
    default : 
        console.log('time error');
}
VM293:7 xzavier is a boy
VM293:9 xzavier is a man" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-string">'boy'</span>;
<span class="hljs-keyword">switch</span> (xzavier) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'girl'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a girl'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'boy'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a boy'</span>);
    <span class="hljs-keyword">case</span> <span class="hljs-string">'man'</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a man'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span> : 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'time error'</span>);
}
VM293:<span class="hljs-number">7</span> xzavier <span class="hljs-keyword">is</span> a boy
VM293:<span class="hljs-number">9</span> xzavier <span class="hljs-keyword">is</span> a man</code></pre>
<p>没有break掉，你的业务代码可能就出现bug.使用switch就需要好好的考虑业务场景，该break的地方切勿忘记。</p>
<p>另外，表达式的返回值和每一个case表达式之间的匹配判断使用的是全等运算符<code>===</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = '1';
switch (xzavier) {
    case 1 :
        console.log('xzavier is a girl');
        break;
    case 2 :
        console.log('xzavier is a boy');
    case 3 :
        console.log('xzavier is a man');
        break;
    default : 
        console.log('type error');
}
// type error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-string">'1'</span>;
<span class="hljs-keyword">switch</span> (xzavier) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a girl'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a boy'</span>);
    <span class="hljs-keyword">case</span> <span class="hljs-number">3</span> :
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is a man'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span> : 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'type error'</span>);
}
<span class="hljs-comment">// type error</span></code></pre>
<p>还有一点就是 <code>default</code> 非必需，位置也可以不固定。因为js总是先去匹配表达式的返回值和每一个case表达式，最终没有找到匹配的case，就会寻找default，找到了则执行default里的语句。没找到则执行到switch块末尾。</p>
<h2 id="articleHeader6">do...while语句</h2>
<p>do...while 语句是一种先运行，后判断的循环语句。也就是说，不管条件是否满足，至少先运行一次循环体。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 1; 
do {
    console.log(xzavier);
    xzavier++;
} while (xzavier <= 10); 
// 1 2 3 4 5 6 7 8 9 10

var xzavier = 1; 
do {
    console.log(xzavier);
    xzavier++;
} while (xzavier <= 0);//先运行一次，再判断
// 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span>; 
<span class="hljs-keyword">do</span> {
    <span class="hljs-built_in">console</span>.log(xzavier);
    xzavier++;
} <span class="hljs-keyword">while</span> (xzavier &lt;= <span class="hljs-number">10</span>); 
<span class="hljs-comment">// 1 2 3 4 5 6 7 8 9 10</span>

<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span>; 
<span class="hljs-keyword">do</span> {
    <span class="hljs-built_in">console</span>.log(xzavier);
    xzavier++;
} <span class="hljs-keyword">while</span> (xzavier &lt;= <span class="hljs-number">0</span>);<span class="hljs-comment">//先运行一次，再判断</span>
<span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader7">while语句</h2>
<p>while 语句是一种先判断，后运行的循环语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 1; 
while (xzavier <= 10) {  //先判断，再运行
    console.log(xzavier);
    xzavier++;
}
// 1 2 3 4 5 6 7 8 9 10

var xzavier = 1; 
while (xzavier <= 0) {  //先判断，再运行
    console.log(xzavier); // 不会执行
    xzavier++;
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span>; 
<span class="hljs-keyword">while</span> (xzavier &lt;= <span class="hljs-number">10</span>) {  <span class="hljs-comment">//先判断，再运行</span>
    <span class="hljs-built_in">console</span>.log(xzavier);
    xzavier++;
}
<span class="hljs-comment">// 1 2 3 4 5 6 7 8 9 10</span>

<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span>; 
<span class="hljs-keyword">while</span> (xzavier &lt;= <span class="hljs-number">0</span>) {  <span class="hljs-comment">//先判断，再运行</span>
    <span class="hljs-built_in">console</span>.log(xzavier); <span class="hljs-comment">// 不会执行</span>
    xzavier++;
} </code></pre>
<h2 id="articleHeader8">for语句</h2>
<p>for 语句也是一种先判断，后运行的循环语句。但它具有在执行循环之前初始变量和定义循环后要执行代码的能力。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i <= 10 ; i++) { 
    console.log(i); 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt;= <span class="hljs-number">10</span> ; <span class="hljs-built_in">i</span>++) { 
    console.log(i); 
} </code></pre>
<p>第1步: 声明变量var i = 1; <br>第2步: 判断i &lt;= 10<br>第3步: console.log(i);<br>第4步: i++<br>第5步: 重复2-5，直到判断为false</p>
<p>这里我们经常会遇到这样的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i <= data.length ; i++) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt;= data.<span class="hljs-built_in">length</span> ; <span class="hljs-built_in">i</span>++) {</code></pre>
<p>建议先缓存data.length 为一个变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0, l = data.length; i <= l ; i++) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>, l = data.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span> &lt;= l ; <span class="hljs-built_in">i</span>++) {</code></pre>
<p>这样做的目的并不是一定能提升程序的性能，因为length属性是一个字典属性，读取它和读取变量的复杂度都为<code>O(1)</code>。<br>这样做主要是为了防止在for循环中改变了data.length，具体使用还应视具体代码而定。</p>
<p>当然，如果涉及到DOM，那么缓存变量就一定能提升代码性能了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i <= $('.item').length ; i++) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt;= $(<span class="hljs-string">'.item'</span>).<span class="hljs-built_in">length</span> ; <span class="hljs-built_in">i</span>++) {</code></pre>
<p>每循环一次都<code>$('.item')</code> 就相对耗费性能了，与DOM有关的读取大多情况都应先用变量缓存，特殊业务视情况而定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ietm_l = $('.item').length;
for (var i = 0; i <= ietm_l ; i++) {
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>var ietm_l = $(<span class="hljs-string">'.item'</span>).<span class="hljs-built_in">length</span>;
<span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt;= ietm_l ; <span class="hljs-built_in">i</span>++) {
</code></pre>
<h2 id="articleHeader9">for...in语句</h2>
<p>for...in 语句可以用来枚举对象的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = { 
    'name' : 'xzavier', 
    'age' : 23,
    'job' : 'Jser',
    'width' : 100,
    'height' : 100,
    'border' : 10
};
for (var i in xzavier) { 
    console.log(i);
}
//name age job width height border
for (var i in xzavier) { 
    console.log(xzavier[i]);
}
//xzavier 23 Jser 100 100 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = { 
    <span class="hljs-string">'name'</span> : <span class="hljs-string">'xzavier'</span>, 
    <span class="hljs-string">'age'</span> : <span class="hljs-number">23</span>,
    <span class="hljs-string">'job'</span> : <span class="hljs-string">'Jser'</span>,
    <span class="hljs-string">'width'</span> : <span class="hljs-number">100</span>,
    <span class="hljs-string">'height'</span> : <span class="hljs-number">100</span>,
    <span class="hljs-string">'border'</span> : <span class="hljs-number">10</span>
};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> xzavier) { 
    <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">//name age job width height border</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> xzavier) { 
    <span class="hljs-built_in">console</span>.log(xzavier[i]);
}
<span class="hljs-comment">//xzavier 23 Jser 100 100 10</span></code></pre>
<p>for...in是为遍历对象属性设计的，但是它可以遍历数组，我去，因为数组也是对象啊。 不过，for...in 循环遍历的是对象的属性，而不是数组的索引。我们看一下打印的结果就知道了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
for(var i in arr) {
    console.log(typeof(i));
}
// string string string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i <span class="hljs-keyword">in</span> arr) {
    console.<span class="hljs-built_in">log</span>(typeof(i));
}
// <span class="hljs-built_in">string</span> <span class="hljs-built_in">string</span> <span class="hljs-built_in">string</span></code></pre>
<p>而经典的for语句遍历是数组的索引：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
for(var i = 0; i < arr.length; i++) {
    console.log(typeof(i));
}
// number number number" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(i));
}
<span class="hljs-comment">// number number number</span></code></pre>
<p>我们用for...in遍历数组时，取arr[i]时是我们期望得到的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
for(var i in arr) {
    console.log(i + '--' + arr[i]);
}
// 0--1 1--2 2--3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-built_in">console</span>.log(i + <span class="hljs-string">'--'</span> + arr[i]);
}
<span class="hljs-comment">// 0--1 1--2 2--3</span></code></pre>
<p>但是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
arr.name = 'xzavier';
for(var i in arr) {
    console.log(i + '--' + arr[i]);
}
VM230:4 0--1
VM230:4 1--2
VM230:4 2--3
VM230:4 name--xzavier" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr.<span class="hljs-built_in">name</span> = 'xzavier';
<span class="hljs-keyword">for</span>(var i <span class="hljs-keyword">in</span> arr) {
    console.<span class="hljs-built_in">log</span>(i + '<span class="hljs-comment">--' + arr[i]);</span>
}
VM230:<span class="hljs-number">4</span> <span class="hljs-number">0</span><span class="hljs-comment">--1</span>
VM230:<span class="hljs-number">4</span> <span class="hljs-number">1</span><span class="hljs-comment">--2</span>
VM230:<span class="hljs-number">4</span> <span class="hljs-number">2</span><span class="hljs-comment">--3</span>
VM230:<span class="hljs-number">4</span> <span class="hljs-built_in">name</span><span class="hljs-comment">--xzavier</span></code></pre>
<p>它访问了数组新增的 "name" 属性，因为 for-in 遍历了对象的所有属性。</p>
<p>甚至包括原型链上的所有可枚举的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
    arr.name = 'xzavier';Array.prototype.oname = 'xzavier.chris'
    for(var i in arr) {
        console.log(i + '--' + arr[i]);
    }
VM236:4 0--1
VM236:4 1--2
VM236:4 2--3
VM236:4 name--xzavier
VM236:4 oname--xzavier.chris" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    arr.name = <span class="hljs-symbol">'xzavier</span>';<span class="hljs-keyword">Array</span>.prototype.oname = <span class="hljs-symbol">'xzavier.chris</span>'
    <span class="hljs-keyword">for</span>(var i <span class="hljs-keyword">in</span> arr) {
        console.log(i + '<span class="hljs-comment">--' + arr[i]);</span>
    }
VM236:<span class="hljs-number">4</span> <span class="hljs-number">0</span><span class="hljs-comment">--1</span>
VM236:<span class="hljs-number">4</span> <span class="hljs-number">1</span><span class="hljs-comment">--2</span>
VM236:<span class="hljs-number">4</span> <span class="hljs-number">2</span><span class="hljs-comment">--3</span>
VM236:<span class="hljs-number">4</span> name<span class="hljs-comment">--xzavier</span>
VM236:<span class="hljs-number">4</span> oname<span class="hljs-comment">--xzavier.chris</span></code></pre>
<p>显然，我们习惯的数组遍历的结果是只有1,2,3 这样的结果的。</p>
<p>所以，综合来说：<br>for...in 循环遍历的是对象的属性，而不是数组的索引。正如例子，输出的索引值 "0"、 "1"、 "2"不是 Number 类型的，而是 String 类型的，因为是对象的属性都是string类型。</p>
<p>这样看来，for...in是不适合遍历数组的。确实，for...in本来就是为遍历对象属性设计的。</p>
<p>不过，在对于比较特殊的数组，for...in或许有用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = Array(1000), count = 0;
arr[100] = 100;
arr[200] = 200;
arr[300] = 300;
for(var i in arr) {
    count += 1;
    console.log(i + '--' + arr[i]);
}
console.log(count);
VM242:7 100--100
VM242:7 200--200
VM242:7 300--300
VM242:9 3   // 只循环了3次额
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> arr = Array(1000), <span class="hljs-keyword">count</span> = 0;
arr[100] = 100;
arr[200] = 200;
arr[300] = 300;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-keyword">count</span> += 1;
    console.<span class="hljs-built_in">log</span>(i + '--' + arr[i]);
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">count</span>);
VM242:7 100--100
VM242:7 200--200
VM242:7 300--300
VM242:9 3   <span class="hljs-comment">// 只循环了3次额</span>
</code></pre>
<p>而for循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = Array(1000), count = 0;
arr[100] = 100;
arr[200] = 200;
arr[300] = 300;
for(var i = 0; i < arr.length; i++) {
    count += 1;
    console.log(i + '--' + arr[i]);
}
console.log(count);
// count 1000  循环了这么多次
// 打印出100 200 300 和一堆的undefined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = Array(<span class="hljs-number">1000</span>), count = <span class="hljs-number">0</span>;
arr[<span class="hljs-number">100</span>] = <span class="hljs-number">100</span>;
arr[<span class="hljs-number">200</span>] = <span class="hljs-number">200</span>;
arr[<span class="hljs-number">300</span>] = <span class="hljs-number">300</span>;
for(var i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    count += <span class="hljs-number">1</span>;
    console.log(i + '--' + arr[i]);
}
console.log(count);
<span class="hljs-comment">// count 1000  循环了这么多次</span>
<span class="hljs-comment">// 打印出100 200 300 和一堆的undefined</span>
</code></pre>
<p>so :<br>for...in 只会遍历对象中存在的实体，而for 循环则会遍历 1000 次。如果你的业务刚好有这样的需要，那么合适的使用for..in遍历数组将会发挥更奇妙的作用。<br>但是一般来看，这样用到的机会很少，上面的指定索引是一种，另外你使用了delete去删除数组元素之后（非特殊，不要用delete去删除），也是可以这样遍历的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3];
delete arr[1]
for(var i in arr) {
    console.log(i + '--' + arr[i]);
}
VM246:4 0--1
VM246:4 2--3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">delete</span> arr[<span class="hljs-number">1</span>]
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-built_in">console</span>.log(i + <span class="hljs-string">'--'</span> + arr[i]);
}
VM246:<span class="hljs-number">4</span> <span class="hljs-number">0</span>-<span class="hljs-number">-1</span>
VM246:<span class="hljs-number">4</span> <span class="hljs-number">2</span>-<span class="hljs-number">-3</span></code></pre>
<p>但是，一般情况谁允许你用delete去删除数组元素呢。关于数组可以参考我的另一篇对数组详解的文章。</p>
<h2 id="articleHeader10">forEach循环</h2>
<p>for...in是为遍历对象属性设计的，当然也可以遍历数组。后来，ES5也为素组设计了一个forEach方法来遍历。<br>forEach方法为数组中含有有效值的每一项执行一次 callback。callback有三个参数：<br>callback（数组当前项的值，数组当前项的索引，数组对象本身）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    console.log(value);
});
// 1 2 3 4 5 xzavier 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-string">'xzavier'</span>,<span class="hljs-number">7</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, <span class="hljs-keyword">index</span>, arr)</span> <span class="hljs-comment">{
    console.log(value);
}</span>);</span>
<span class="hljs-comment">// 1 2 3 4 5 xzavier 7</span></code></pre>
<p>注意：</p>
<p>1.使用forEach循环的时候，需要注意，forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项不会被 callback 访问到。</p>
<p>在数组后面添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    if (value == 3) {
        arr.push(8);
    }
    console.log(value);
});
// 1 2 3 4 5 xzavier 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,'xzavier',<span class="hljs-number">7</span>];
arr.forEach(function (value, index, arr) {
    if (value == <span class="hljs-number">3</span>) {
        arr.push(<span class="hljs-number">8</span>);
    }
    console.log(value);
});
<span class="hljs-comment">// 1 2 3 4 5 xzavier 7</span></code></pre>
<p>在数组前面添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    if (value == 3) {
        arr.unshift(0);
    }
    console.log(index + '--' +value);
});
VM316:6 0--1
VM316:6 1--2
VM316:6 2--3
VM316:6 3--3
VM316:6 4--3
VM316:6 5--3
VM316:6 6--3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-string">'xzavier'</span>,<span class="hljs-number">7</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, index, arr)</span></span> {
    <span class="hljs-keyword">if</span> (value == <span class="hljs-number">3</span>) {
        arr.unshift(<span class="hljs-number">0</span>);
    }
    console.log(index + <span class="hljs-string">'--'</span> +value);
});
VM316:<span class="hljs-number">6</span> <span class="hljs-number">0</span><span class="hljs-comment">--1</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">1</span><span class="hljs-comment">--2</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">2</span><span class="hljs-comment">--3</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">3</span><span class="hljs-comment">--3</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">4</span><span class="hljs-comment">--3</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">5</span><span class="hljs-comment">--3</span>
VM316:<span class="hljs-number">6</span> <span class="hljs-number">6</span><span class="hljs-comment">--3</span></code></pre>
<p>什么情况？因为你在数组前添加1项后，遍历下一项的值，发现值还是3，所以后面的遍历一直都走到if语句里了。<br>但是数组的遍历范围是不可变的。</p>
<p>2.如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    arr[5] = 'xx';
    console.log(value);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-string">'xzavier'</span>,<span class="hljs-number">7</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, arr</span>) </span>{
    arr[<span class="hljs-number">5</span>] = <span class="hljs-string">'xx'</span>;
    <span class="hljs-built_in">console</span>.log(value);
});</code></pre>
<p>3.已删除的项不会被遍历到（使用delete方法等情况，或者直接置为undefined）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    if (value == 3) {
        delete arr[5];;
    }
    console.log(value);
});
// 1 2 3 4 5 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-string">'xzavier'</span>,<span class="hljs-number">7</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, arr</span>) </span>{
    <span class="hljs-keyword">if</span> (value == <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">delete</span> arr[<span class="hljs-number">5</span>];;
    }
    <span class="hljs-built_in">console</span>.log(value);
});
<span class="hljs-comment">// 1 2 3 4 5 7</span></code></pre>
<p>但是使用别的方法删除就就会出错哦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    if (value == 3) {
        arr.shift(0);
    }
    console.log(value);
});
// 1 2 3 5 xzavier 7   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,'xzavier',<span class="hljs-number">7</span>];
arr.forEach(function (value, index, arr) {
    if (value == <span class="hljs-number">3</span>) {
        arr.shift(<span class="hljs-number">0</span>);
    }
    console.log(value);
});
<span class="hljs-comment">// 1 2 3 5 xzavier 7   </span>
</code></pre>
<p>第四个值不在了，因为forEach记住了最开始的length，但是shift却改变了length。其他的方法同理。<br>而delete并没有把数组项删掉，只是把值置为了undefined，所以length未变。</p>
<p>4.不能使用break或continue中断或跳出循环，报错。不过可以return false 跳出当前循环，达到一定效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,'xzavier',7];
arr.forEach(function (value, index, arr) {
    if (value == 3) {
        return false;
    }
    console.log(value);
});
// 1 2 4 5 xzavier 7
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-string">'xzavier'</span>,<span class="hljs-number">7</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, arr</span>) </span>{
    <span class="hljs-keyword">if</span> (value == <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-built_in">console</span>.log(value);
});
<span class="hljs-comment">// 1 2 4 5 xzavier 7</span>
</code></pre>
<h2 id="articleHeader11">for...of语句</h2>
<p>for...in循环，只能获得对象的键名，不能直接获取键值，并且遍历数组不友好。<br>forEach中又不能使用break语句中断循环，也不能使用return语句返回到外层函数。</p>
<p>ES6提供for...of循环，允许遍历获得键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法。它还可以正确响应break、continue和return语句。for-of 还可以遍历 Map 和 Set （ES6 中新增数据集合类型），以及其他可迭代对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a', 'b', 'c', 'd'];   
for (let i in arr) {
      console.log(i); // 0 1 2 3
}
for (let i of arr) {
      console.log(i); // a b c d
}
for (var i of arr) {
    if(i == 'c'){
        break;
    }
      console.log(i); // a b
}

let str = 'xzavier';
for (let i of str) {
      console.log(i); // x z a v i e r
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>];   
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> arr) {
      <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 0 1 2 3</span>
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> arr) {
      <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// a b c d</span>
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">of</span> arr) {
    <span class="hljs-keyword">if</span>(i == <span class="hljs-string">'c'</span>){
        <span class="hljs-keyword">break</span>;
    }
      <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// a b</span>
}

<span class="hljs-keyword">let</span> str = <span class="hljs-string">'xzavier'</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> str) {
      <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// x z a v i e r</span>
}</code></pre>
<h2 id="articleHeader12">break和continue语句</h2>
<p>break 和continue 语句用于在循环中精确地控制代码的执行。其中，break 语句会立即退出循环，强制继续执行循环体后面的语句。而continue 语句退出当前循环，继续后面的循环。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 1; i <= 10; i++) {
    if (i == 5) break; //如果i等于5，就退出循环
    console.log(i); //1 2 3 4
}
for (var i = 1; i <= 10; i++) {
    if (i == 5) continue; //如果i等于5，就退出当前循环
    console.log(i); // 1 2 3 4 6 7 8 9 10
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span> (i == <span class="hljs-number">5</span>) <span class="hljs-keyword">break</span>; <span class="hljs-comment">//如果i等于5，就退出循环</span>
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//1 2 3 4</span>
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span> (i == <span class="hljs-number">5</span>) <span class="hljs-keyword">continue</span>; <span class="hljs-comment">//如果i等于5，就退出当前循环</span>
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 1 2 3 4 6 7 8 9 10</span>
}
</code></pre>
<h2 id="articleHeader13">标记跳转</h2>
<p>我们程序员应该都知道有个字段叫：<code>goto</code>，可以让你的程序跳到指定的地方执行。由于goto遭到非议太多，使用这类编码形式会使你的代码难以理解和维护，基本不建议使用，如果JavaScript也有goto语句，那么在上面continue的基础上我们还可以让程序的执行跳转到指定的代码中的那个位置。不过，幸好，JavaScript没有这个标识，所以，我们的世界很欢畅。不过，你要是想这样做，我们还是有类似的实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier: for (var i = 1; i <= 10; i++) {
    if (i == 5) {
        continue xzavier; // 一层循环，与continue无异
    }
    console.log(i);
}
// 1 2 3 4 6 7 8 9 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>xzavier: <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span> (i == <span class="hljs-number">5</span>) {
        <span class="hljs-keyword">continue</span> xzavier; <span class="hljs-comment">// 一层循环，与continue无异</span>
    }
    <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">// 1 2 3 4 6 7 8 9 10</span></code></pre>
<p>在多层循环的时候作用就区别出来了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier: for (var i = 1; i <= 10; i++) {
    for( var j = 1; j <= 10; j++) {
        if (i == j) {
            continue xzavier;
        }
        console.log(i + '>' + j);
    }
}
VM123:6 2>1
VM123:6 3>1
VM123:6 3>2
VM123:6 4>1
VM123:6 4>2
VM123:6 4>3
VM123:6 5>1
VM123:6 5>2
VM123:6 5>3
VM123:6 5>4
VM123:6 6>1
VM123:6 6>2
VM123:6 6>3
VM123:6 6>4
VM123:6 6>5
VM123:6 7>1
VM123:6 7>2
VM123:6 7>3
VM123:6 7>4
VM123:6 7>5
VM123:6 7>6
VM123:6 8>1
VM123:6 8>2
VM123:6 8>3
VM123:6 8>4
VM123:6 8>5
VM123:6 8>6
VM123:6 8>7
VM123:6 9>1
VM123:6 9>2
VM123:6 9>3
VM123:6 9>4
VM123:6 9>5
VM123:6 9>6
VM123:6 9>7
VM123:6 9>8
VM123:6 10>1
VM123:6 10>2
VM123:6 10>3
VM123:6 10>4
VM123:6 10>5
VM123:6 10>6
VM123:6 10>7
VM123:6 10>8
VM123:6 10>9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">xzavier:</span> <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">for</span>( var j = <span class="hljs-number">1</span>; j &lt;= <span class="hljs-number">10</span>; j++) {
        <span class="hljs-keyword">if</span> (i == j) {
            <span class="hljs-keyword">continue</span> xzavier;
        }
        console.log(i + <span class="hljs-string">'&gt;'</span> + j);
    }
}
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">2</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">3</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">3</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">4</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">4</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">4</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">5</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">5</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">5</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">5</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">6</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">6</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">6</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">6</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">6</span>&gt;<span class="hljs-number">5</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">5</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">7</span>&gt;<span class="hljs-number">6</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">5</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">6</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">8</span>&gt;<span class="hljs-number">7</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">5</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">6</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">7</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">9</span>&gt;<span class="hljs-number">8</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">1</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">2</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">3</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">4</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">5</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">6</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">7</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">8</span>
<span class="hljs-string">VM123:</span><span class="hljs-number">6</span> <span class="hljs-number">10</span>&gt;<span class="hljs-number">9</span></code></pre>
<p><code>continue xzavier</code>表示跳到标记为<code>xzavier</code>的循环，并继续下一次迭代。如果不使用这个标识符的话只会在内层循环中跳出当次循环并继续下一次循环。</p>
<p>当然，我们也不建议使用这样的写法，并没有那么好用。举例很随意，并非要实现一个这样的业务。如果要实现类似的功能，用continue换个写法就OK了。这里主要说明下我们还是有这样的写法存在的，用不用看你心情，看你的场景，以及你的团队同不同意。</p>
<h2 id="articleHeader14">with语句</h2>
<p>with语句的作用是将代码的作用域设置到一个特定的对象中。当代码运行到with语句时，执行上下文的作用域链临时被改变了。一个新的可变对象被创建，它包含了参数指定的对象的所有属性。这个对象将被推入作用域链的头部，这意味着函数的所有局部变量现在处于第二个作用域链对象中，因此访问代价更高了。如果，再挖深一点，JavaScript 引擎在编译阶段遇到with字段都不能好好的干活儿了，因为它不知道这个with最后会怎么改变作用域，本想把变量作用域都安置好都不行了。所以，一般不建议使用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（8）-详解代码中的流程控制

## 原文链接
[https://segmentfault.com/a/1190000006669505](https://segmentfault.com/a/1190000006669505)

