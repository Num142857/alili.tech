---
title: 'JavaScript填坑史' 
date: 2019-02-09 2:30:58
hidden: true
slug: i5768emb2i
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>说明：</strong>&nbsp;&nbsp;这是笔者平时积累的一些觉得比较有意思或是比较有难度的JavaScript题目理解和心得，会保持长期更新。</p>
<h3 id="articleHeader0">1.setTimeout和setInterval深入理解</h3>
<p>在<a href="https://segmentfault.com/a/1190000004034739">setTimeout和setInterval深入理解</a>这篇博客里笔者曾做过总结，我们知道JavaScript试单线程的产物，两个函数就是利用了插入代码的方式实现了伪异步，和AJAX的原理实际上是一样的。下面来看下这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;1&quot;);
setTimeout(function(){
        console.log(&quot;3&quot;)
    },0);
    console.log(&quot;2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1"</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3"</span>)
    },<span class="hljs-number">0</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2"</span>);</code></pre>
<p>结果：控制台依次输出1,2,3;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
function fn() { 
setTimeout(function(){alert('can you see me?');},1000); 
while(true) {} 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span> </span>{ 
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{alert(<span class="hljs-string">'can you see me?'</span>);},<span class="hljs-number">1000</span>); 
<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {} 
} </code></pre>
<p>你觉得这段代码的执行结果是什么呢？答案是，alert永远不会出现。 <br>&nbsp;&nbsp;&nbsp;&nbsp;这是为什么呢？因为，while这段代码没有执行完，所以插入在后面的代码便永远不会执行。 <br>综上所述，其实JS终归是单线程产物。无论如何“异步”都不可能突破单线程这个障碍。所以许多的“异步调用”（包括Ajax）事实上也只是“伪异步”而已。只要理解了这么一个概念，也许理解setTimeout和setInterval也就不难了。</p>
<h3 id="articleHeader1">2. 闭包初探小题</h3>
<p>在<a href="https://segmentfault.com/a/1190000004093058" target="_blank">JavaScript闭包初探</a>这篇博客里面进行了初步探讨，有几个小题个人觉得还是比较有意思的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　　var name = &quot;The Window&quot;;
　　var object = {
　　　　name : &quot;My Object&quot;,
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//The Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>　　<span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;
　　<span class="hljs-keyword">var</span> object = {
　　　　name : <span class="hljs-string">"My Object"</span>,
　　　　getNameFunc : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　　　<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());<span class="hljs-comment">//The Window</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　  var name = &quot;The Window&quot;;
　　var object = {
　　　　name : &quot;My Object&quot;,
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//My Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>　  <span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;
　　<span class="hljs-keyword">var</span> object = {
　　　　name : <span class="hljs-string">"My Object"</span>,
　　　　getNameFunc : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
　　　　　　<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　　　<span class="hljs-keyword">return</span> that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());<span class="hljs-comment">//My Object</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(n,o)</span></span> {
  console.log(o)
  <span class="hljs-keyword">return</span> {
    <span class="hljs-function"><span class="hljs-keyword">fun</span>:<span class="hljs-title">function</span><span class="hljs-params">(m)</span></span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(m,n)</span></span>;
    }
  };
}
<span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>;  a.<span class="hljs-keyword">fun</span>(<span class="hljs-number">1</span>);  a.<span class="hljs-keyword">fun</span>(<span class="hljs-number">2</span>);  a.<span class="hljs-keyword">fun</span>(<span class="hljs-number">3</span>);<span class="hljs-comment">//undefined,?,?,?</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>.<span class="hljs-keyword">fun</span>(<span class="hljs-number">1</span>).<span class="hljs-keyword">fun</span>(<span class="hljs-number">2</span>).<span class="hljs-keyword">fun</span>(<span class="hljs-number">3</span>);<span class="hljs-comment">//undefined,?,?,?</span>
<span class="hljs-keyword">var</span> c = <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>.<span class="hljs-keyword">fun</span>(<span class="hljs-number">1</span>);  c.<span class="hljs-keyword">fun</span>(<span class="hljs-number">2</span>);  c.<span class="hljs-keyword">fun</span>(<span class="hljs-number">3</span>);<span class="hljs-comment">//undefined,?,?,?</span></code></pre>
<blockquote><p>//问:三行a,b,c的输出分别是什么？</p></blockquote>
<p><strong>这是一道非常典型的JS闭包问题。其中嵌套了三层fun函数，搞清楚每层fun的函数是那个fun函数尤为重要。</strong></p>
<blockquote><p>//答案：<br>//a: undefined,0,0,0<br>//b: undefined,0,1,2<br>//c: undefined,0,1,1</p></blockquote>
<h3 id="articleHeader2">3. Array/map,Number/parseInt</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;].map(parseInt)//求输出结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>].<span class="hljs-built_in">map</span>(<span class="hljs-built_in">parseInt</span>)<span class="hljs-comment">//求输出结果</span></code></pre>
<p>&nbsp;&nbsp;首先, map接受两个参数, 一个回调函数 callback, 一个回调函数的this值<br>其中回调函数接受三个参数 currentValue, index, arrary;而题目中, map只传入了回调函数--parseInt.其次, parseInt 只接受两个两个参数 string, radix(基数). radix的合法区间是2-36. 0或是默认是10.所以本题即问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1'</span>, <span class="hljs-number">0</span>);
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>);
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'3'</span>, <span class="hljs-number">2</span>);</code></pre>
<p>后两者参数不合法.所以答案是：[1, NaN, NaN]；</p>
<h3 id="articleHeader3">4.&nbsp;0.1+0.2!=0.3和9999999999999999 == 10000000000000000;</h3>
<blockquote><p>根据语言规范，JavaScript 采用“IEEE 754 标准定义的双精度64位格式”（"double-precision 64-bit format IEEE 754 values"）表示数字。据此我们能得到一个有趣的结论，和其他编程语言（如 C 和 Java）不同，JavaScript 不区分整数值和浮点数值，所有数字在 JavaScript 中均用浮点数值表示，所以在进行数字运算的时候要特别注意。<a href="http://demon.tw/copy-paste/javascript-precision.html" rel="nofollow noreferrer" target="_blank">精度丢失</a>看看下面的例子:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 + 0.2 = 0.30000000000000004" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> = <span class="hljs-number">0.30000000000000004</span></code></pre>
<blockquote><p>在具体实现时，整数值通常被视为32位整型变量，在个别实现（如某些浏览器）中也以32位整型变量的形式进行存储，直到它被用于执行某些32位整型不支持的操作，这是为了便于进行位操作。大整数精度在2的53次方以内是不会丢失的，也就是说浏览器能精确计算Math.pow(2,53)以内所有的数，小数精度，当十进制小数的二进制表示的有限数字不超过 52 位时，在 JavaScript 里也是可以精确存储的。\</p></blockquote>
<p>解决办法：Math.round( (.1+.2)*100)/100;</p>
<h3 id="articleHeader4">5. [1&gt;2&gt;3,3&gt;2&gt;1]</h3>
<p>&nbsp;&nbsp;此题会让人误以为是2&gt;1&amp;&amp;2&lt;3,其实不是的，这个题等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1<2=>true;
true<3=>1<3=>true;
3<2=>true;
false<1=>0<1=>true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-number">1</span>&lt;<span class="hljs-number">2</span>=&gt;<span class="hljs-keyword">true</span>;
<span class="hljs-keyword">true</span>&lt;<span class="hljs-number">3</span>=&gt;<span class="hljs-number">1</span>&lt;<span class="hljs-number">3</span>=&gt;<span class="hljs-keyword">true</span>;
<span class="hljs-number">3</span>&lt;<span class="hljs-number">2</span>=&gt;<span class="hljs-keyword">true</span>;
<span class="hljs-keyword">false</span>&lt;<span class="hljs-number">1</span>=&gt;<span class="hljs-number">0</span>&lt;<span class="hljs-number">1</span>=&gt;<span class="hljs-keyword">true</span>;</code></pre>
<p><strong>答案：[true,true]</strong><br>&nbsp;&nbsp;这个题的重点是对于运算符的理解，一是javascript对于不同类型数值的比较规则，详见<a href="http://dorey.github.io/JavaScript-Equality-Table/" rel="nofollow noreferrer" target="_blank">js比较表</a>,<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness" rel="nofollow noreferrer" target="_blank">javascript相等性判断</a>；二是对于<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than_operator" rel="nofollow noreferrer" target="_blank">比较操作符</a>和<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators" rel="nofollow noreferrer" target="_blank">赋值运算符</a>的理解，即一个自左向右一个自右向左~</p>
<h3 id="articleHeader5">6. 浏览器懵逼史（1）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.tostring;
3..toString;
3...toString;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-number">3</span>.tostring<span class="hljs-comment">;</span>
<span class="hljs-number">3</span>..toString<span class="hljs-comment">;</span>
<span class="hljs-number">3</span>...toString<span class="hljs-comment">;</span></code></pre>
<p>这个题感觉脑洞很大啊~先说答案：error,'3',error;<br>可如果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=3;
a.toString;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var a=<span class="hljs-number">3</span><span class="hljs-comment">;</span>
a.toString<span class="hljs-comment">;</span></code></pre>
<p>却又合法了答案就是'3';<br>为啥呢？<br>因为在JS中1.1,1.,.1都是合法数字啊！那么在解析3.toString的时候到底是这是个数字呢，还是方法调用呢？浏览器就懵逼了呗，只能抛出一个error,所以说感觉此题就是在戏耍浏览器......</p>
<h3 id="articleHeader6">7. 声明提升</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">'World!'</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> name === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">var</span> name = <span class="hljs-string">'Jack'</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Goodbye '</span> + name);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello '</span> + name);
    }
})();</code></pre>
<p>答案是什么呢...笔者第一次做的时候傻傻的觉得是Hello,world...实则不然，正确答案是:Goodbye Jack;<br>为什么呢，声明提升...上述代码相当于下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'World!';
(function () {
    var name;
    if (typeof name === 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var <span class="hljs-built_in">name</span> = <span class="hljs-string">'World!'</span>;
(function () {
    var <span class="hljs-built_in">name</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">typeof</span> <span class="hljs-built_in">name</span> === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-built_in">name</span> = <span class="hljs-string">'Jack'</span>;
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Goodbye '</span> + <span class="hljs-built_in">name</span>);
    } <span class="hljs-keyword">else</span> {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Hello '</span> + <span class="hljs-built_in">name</span>);
    }
})();</code></pre>
<h3 id="articleHeader7">8. 坑爹史（1）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log(&quot;wut&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-number">0</span>];
<span class="hljs-keyword">if</span> ([<span class="hljs-number">0</span>]) {
  <span class="hljs-built_in">console</span>.log(a == <span class="hljs-literal">true</span>);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"wut"</span>);
}</code></pre>
<p>读者们你们觉得此题答案是什么呢？true?因为[0]被看做Boolean是被认为是true，理所当然的推出来[0]==true,控制台输出true...看似没错，然而并不是这样滴~[0]这个玩意儿在单独使用的时候是被认为是true的，但用作比较的时候它是false...所以正确答案是false；不信的话，F12控制台输出[0]==false；看是不是true......</p>
<h3 id="articleHeader8">9. 坑爹史（2）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + - + + + - + 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">1 </span>+ - + + + - + <span class="hljs-number">1</span></code></pre>
<p>这题应该是等同于：（倒着看）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + (a)  => 2
a = - (b) => 1
b = + (c) => -1
c = + (d) => -1
d = + (e) => -1
e = + (f) => -1
f = - (g) => -1
g = + 1   => 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1</span> + <span class="hljs-function">(<span class="hljs-params">a</span>)  =&gt;</span> <span class="hljs-number">2</span>
a = - <span class="hljs-function">(<span class="hljs-params">b</span>) =&gt;</span> <span class="hljs-number">1</span>
b = + <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> <span class="hljs-number">-1</span>
c = + <span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> <span class="hljs-number">-1</span>
d = + <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> <span class="hljs-number">-1</span>
e = + <span class="hljs-function">(<span class="hljs-params">f</span>) =&gt;</span> <span class="hljs-number">-1</span>
f = - <span class="hljs-function">(<span class="hljs-params">g</span>) =&gt;</span> <span class="hljs-number">-1</span>
g = + <span class="hljs-number">1</span>   =&gt; <span class="hljs-number">1</span></code></pre>
<p>答案是2</p>
<h3 id="articleHeader9">10. 坑爹史（3）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sidEffecting</span>(<span class="hljs-params">ary</span>) </span>{
  ary[<span class="hljs-number">0</span>] = ary[<span class="hljs-number">2</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a,b,c</span>) </span>{
  c = <span class="hljs-number">10</span>
  sidEffecting(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">return</span> a + b + c;
}
bar(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)</code></pre>
<p>此题涉及ES6语法，实在坑的不行...<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">arguments</a><br>首先 The arguments object is an Array-like object corresponding to the arguments passed to a function.也就是说 arguments 是一个 object, c 就是 arguments[2], 所以对于 c 的修改就是对 arguments[2] 的修改.<br>所以答案是 21.<br>然而!!!!!!<br>当函数参数涉及到 any rest parameters, any default parameters or any destructured parameters 的时候, 这个 arguments 就不在是一个 mapped arguments object 了.....请看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c=3) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sidEffecting</span>(<span class="hljs-params">ary</span>) </span>{
  ary[<span class="hljs-number">0</span>] = ary[<span class="hljs-number">2</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a,b,c=<span class="hljs-number">3</span></span>) </span>{
  c = <span class="hljs-number">10</span>
  sidEffecting(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">return</span> a + b + c;
}
bar(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)</code></pre>
<p>答案是12...<br>请读者细细体会!!</p>
<h3 id="articleHeader10">11. 坑爹史（4）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[,,,].join(&quot;, &quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-attr">[,,,]</span><span class="hljs-selector-class">.join</span>(<span class="hljs-string">", "</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[,,,] => [undefined × 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">[,,,]</span> =&gt; <span class="hljs-string">[undefined × 3]</span></code></pre>
<p>因为javascript 在定义数组的时候允许最后一个元素后跟一个,, 所以这是个长度为三的稀疏数组(这是长度为三, 并没有 0, 1, 2三个属性哦)<br>答案: ", , "</p>
<h3 id="articleHeader11">12. 浏览器懵逼史(2)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {class: &quot;Animal&quot;, name: 'Fido'};
a.class" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-class"><span class="hljs-keyword">class</span>: <span class="hljs-type">"Animal"</span>, <span class="hljs-type">name: 'Fido'};</span></span>
a.<span class="hljs-keyword">class</span></code></pre>
<p>这个题比较流氓.. 因为是浏览器相关, class是个保留字(现在是个关键字了);Fuck!<br>所以答案不重要, 重要的是自己在取属性名称的时候尽量避免保留字. 如果使用的话请加引号 a['class']</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript填坑史

## 原文链接
[https://segmentfault.com/a/1190000005710817](https://segmentfault.com/a/1190000005710817)

